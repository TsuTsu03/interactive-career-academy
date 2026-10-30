import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { backendConfig } from "@/lib/backend-config";
import { clientAddress, cookieOptions, EMAIL_VERIFIER_COOKIE, noStoreHeaders, randomToken, sha256 } from "@/lib/auth-server";
import { sendSignInEmail } from "@/lib/auth-email";
import { claimThrottle, database, type EmailLinkDoc } from "@/lib/mongo";

export const dynamic = "force-dynamic";

const LINK_MINUTES = 15;

export async function POST(request: Request) {
  const config = backendConfig();
  if (!config) return NextResponse.json({ error: "Account connection is not configured yet." }, { status: 503, headers: noStoreHeaders() });
  if (!config.email) return NextResponse.json({ error: "Email sign-in is not set up yet. Use GitHub or Google." }, { status: 503, headers: noStoreHeaders() });
  const body = await request.json().catch(() => null) as { email?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400, headers: noStoreHeaders() });
  }

  const token = randomToken();
  const verifier = randomBytes(32).toString("base64url");
  let db;
  try {
    db = (await database())!;
    // One script can otherwise drain the whole email quota and get the sending
    // domain flagged, which locks out every learner using the one sign-in method
    // that needs no third-party account. Only digests are stored, so the
    // throttle collection never holds an address or a client address. Both
    // buckets count every attempt, as the Postgres version did.
    const [byEmail, byClient] = await Promise.all([
      claimThrottle(db, `email:${sha256(email)}`, 5),
      claimThrottle(db, `client:${sha256(clientAddress(request))}`, 20),
    ]);
    if (!byEmail || !byClient) {
      return NextResponse.json(
        { error: "Too many sign-in links were requested. Try again in an hour." },
        { status: 429, headers: noStoreHeaders() },
      );
    }
    await db.collection<EmailLinkDoc>("email_links").insertOne({
      _id: sha256(token),
      email,
      verifier_hash: sha256(verifier),
      expires_at: new Date(Date.now() + LINK_MINUTES * 60 * 1000),
    });
  } catch {
    return NextResponse.json({ error: "The sign-in email could not be sent." }, { status: 502, headers: noStoreHeaders() });
  }

  const link = `${config.siteUrl}/auth/callback?token=${encodeURIComponent(token)}`;
  const sent = await sendSignInEmail(config.email, email, link, LINK_MINUTES);
  if (!sent.ok) {
    await db.collection<EmailLinkDoc>("email_links").deleteOne({ _id: sha256(token) }).catch(() => undefined);
    return NextResponse.json({ error: sent.error }, { status: 502, headers: noStoreHeaders() });
  }
  (await cookies()).set(EMAIL_VERIFIER_COOKIE, verifier, cookieOptions(LINK_MINUTES * 60));
  return NextResponse.json({ sent: true }, { headers: noStoreHeaders() });
}
