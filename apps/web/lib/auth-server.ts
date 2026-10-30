import { createHash, randomBytes, randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { database, isDuplicateKey, type SessionDoc, type UserDoc } from "@/lib/mongo";

export const SESSION_COOKIE = "codedaddy-session";
export const OAUTH_COOKIE = "codedaddy-oauth-state";
export const EMAIL_VERIFIER_COOKIE = "codedaddy-email-verifier";
// Cookies the Supabase version set. Cleared on sign-out so they do not linger.
const LEGACY_COOKIES = ["codedaddy-access-token", "codedaddy-refresh-token", "codedaddy-pkce-verifier"];

const SESSION_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
}

export interface Identity {
  provider: "github" | "google" | "email";
  providerId: string;
  /** Only an address the provider says is verified. Unverified addresses never link accounts. */
  email: string | null;
  name: string | null;
}

export const cookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge,
});

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function randomToken(): string {
  return randomBytes(32).toString("base64url");
}

function publicUser(user: UserDoc): AuthUser {
  return { id: user._id, email: user.email ?? undefined, name: user.name ?? undefined };
}

/**
 * Finds the account an identity belongs to, or creates one.
 *
 * The same identity always returns the same account. A new identity whose
 * verified email matches an existing account joins that account, so a learner
 * who signed up with an email link and later uses GitHub with the same address
 * keeps one set of progress. An unverified address never links anything.
 */
export async function userForIdentity(identity: Identity): Promise<AuthUser | null> {
  const db = await database();
  if (!db) return null;
  const users = db.collection<UserDoc>("users");
  const now = new Date();
  const email = identity.email?.trim().toLowerCase() || null;
  const entry = { provider: identity.provider, provider_id: identity.providerId, email };

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const known = await users.findOneAndUpdate(
      { identities: { $elemMatch: { provider: identity.provider, provider_id: identity.providerId } } },
      { $set: { last_sign_in_at: now, updated_at: now } },
      { returnDocument: "after" },
    );
    if (known) return publicUser(known);

    if (email) {
      const linked = await users.findOneAndUpdate(
        { email },
        { $push: { identities: entry }, $set: { last_sign_in_at: now, updated_at: now } },
        { returnDocument: "after" },
      );
      if (linked) return publicUser(linked);
    }

    const user: UserDoc = {
      _id: randomUUID(),
      email,
      name: identity.name?.trim().slice(0, 80) || null,
      identities: [entry],
      created_at: now,
      updated_at: now,
      last_sign_in_at: now,
    };
    try {
      await users.insertOne(user);
      return publicUser(user);
    } catch (error) {
      // Another request created this account a moment ago. Look it up again.
      if (!isDuplicateKey(error)) throw error;
    }
  }
  return null;
}

/** Starts a session for the user and sets its cookie. Only a digest of the token is stored. */
export async function createSession(userId: string) {
  const db = await database();
  if (!db) throw new Error("Backend is not configured.");
  const token = randomToken();
  const now = new Date();
  await db.collection<SessionDoc>("sessions").insertOne({
    _id: sha256(token),
    user_id: userId,
    created_at: now,
    expires_at: new Date(now.getTime() + SESSION_DAYS * DAY_MS),
  });
  (await cookies()).set(SESSION_COOKIE, token, cookieOptions(SESSION_DAYS * DAY_MS / 1000));
}

export async function clearSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    const db = await database().catch(() => null);
    await db?.collection<SessionDoc>("sessions").deleteOne({ _id: sha256(token) }).catch(() => undefined);
  }
  for (const name of [SESSION_COOKIE, OAUTH_COOKIE, EMAIL_VERIFIER_COOKIE, ...LEGACY_COOKIES]) store.delete(name);
}

/**
 * The signed-in user, or null.
 *
 * A session lasts thirty days from its last renewal. It is renewed at most once
 * a day, so an active learner stays signed in without a write on every request.
 * An unreachable database reads as signed out rather than crashing the route.
 */
export async function authenticatedUser(): Promise<{ user: AuthUser } | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const db = await database().catch(() => null);
  if (!db) return null;
  const sessions = db.collection<SessionDoc>("sessions");
  const id = sha256(token);
  const now = Date.now();
  const session = await sessions.findOne({ _id: id, expires_at: { $gt: new Date(now) } });
  if (!session) {
    store.delete(SESSION_COOKIE);
    return null;
  }
  const user = await db.collection<UserDoc>("users").findOne({ _id: session.user_id });
  if (!user) {
    await sessions.deleteOne({ _id: id });
    store.delete(SESSION_COOKIE);
    return null;
  }
  if (session.expires_at.getTime() - now < (SESSION_DAYS - 1) * DAY_MS) {
    await sessions.updateOne({ _id: id }, { $set: { expires_at: new Date(now + SESSION_DAYS * DAY_MS) } });
    store.set(SESSION_COOKIE, token, cookieOptions(SESSION_DAYS * DAY_MS / 1000));
  }
  return { user: publicUser(user) };
}

export function clientAddress(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function noStoreHeaders() {
  return { "Cache-Control": "private, no-store", Pragma: "no-cache", Expires: "0" };
}
