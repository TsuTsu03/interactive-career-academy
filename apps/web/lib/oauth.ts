import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { backendConfig, type OAuthClient } from "@/lib/backend-config";
import { cookieOptions, OAUTH_COOKIE, type Identity } from "@/lib/auth-server";

export type Provider = "github" | "google";

const PROVIDERS = {
  github: {
    authorize: "https://github.com/login/oauth/authorize",
    token: "https://github.com/login/oauth/access_token",
    scope: "read:user user:email",
  },
  google: {
    authorize: "https://accounts.google.com/o/oauth2/v2/auth",
    token: "https://oauth2.googleapis.com/token",
    scope: "openid email profile",
  },
} as const;

const REQUEST_TIMEOUT_MS = 8000;

export function isProvider(value: string): value is Provider {
  return value === "github" || value === "google";
}

function redirectUri(siteUrl: string, provider: Provider) {
  return `${siteUrl}/auth/callback/${provider}`;
}

/**
 * Starts an authorization-code redirect with PKCE and a state value.
 *
 * Shared by both provider routes so the verifier, the state check, the cookie
 * flags, and the callback URL are written once. A provider without client
 * credentials sends the learner back to the account screen with an honest
 * message rather than a provider error page.
 */
export async function startOAuth(request: Request, provider: Provider): Promise<NextResponse> {
  const config = backendConfig();
  if (!config) return NextResponse.redirect(new URL("/account?auth=not-configured", request.url));
  const client = config[provider];
  if (!client) return NextResponse.redirect(new URL("/account?auth=provider-unavailable", request.url));

  const state = randomBytes(24).toString("base64url");
  const verifier = randomBytes(48).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  (await cookies()).set(OAUTH_COOKIE, `${provider}.${state}.${verifier}`, cookieOptions(600));

  const authorize = new URL(PROVIDERS[provider].authorize);
  authorize.searchParams.set("client_id", client.clientId);
  authorize.searchParams.set("redirect_uri", redirectUri(config.siteUrl, provider));
  authorize.searchParams.set("scope", PROVIDERS[provider].scope);
  authorize.searchParams.set("state", state);
  authorize.searchParams.set("code_challenge", challenge);
  authorize.searchParams.set("code_challenge_method", "S256");
  if (provider === "google") {
    authorize.searchParams.set("response_type", "code");
    authorize.searchParams.set("prompt", "select_account");
  } else {
    authorize.searchParams.set("allow_signup", "true");
  }
  return NextResponse.redirect(authorize);
}

async function getJson<T>(url: string, init: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(url, { ...init, cache: "no-store", signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
    return response.ok ? await response.json() as T : null;
  } catch {
    return null;
  }
}

async function githubIdentity(client: OAuthClient, code: string, verifier: string, redirect: string): Promise<Identity | null> {
  const token = await getJson<{ access_token?: string }>(PROVIDERS.github.token, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: client.clientId, client_secret: client.clientSecret, code, redirect_uri: redirect, code_verifier: verifier }),
  });
  if (!token?.access_token) return null;
  const headers = { Authorization: `Bearer ${token.access_token}`, Accept: "application/vnd.github+json", "User-Agent": "CodeDaddy" };
  const [profile, emails] = await Promise.all([
    getJson<{ id?: number; name?: string | null; login?: string }>("https://api.github.com/user", { headers }),
    getJson<{ email: string; primary: boolean; verified: boolean }[]>("https://api.github.com/user/emails", { headers }),
  ]);
  if (typeof profile?.id !== "number") return null;
  const verified = (emails ?? []).filter((item) => item.verified);
  const email = (verified.find((item) => item.primary) ?? verified[0])?.email ?? null;
  return { provider: "github", providerId: String(profile.id), email, name: profile.name || profile.login || null };
}

async function googleIdentity(client: OAuthClient, code: string, verifier: string, redirect: string): Promise<Identity | null> {
  const token = await getJson<{ access_token?: string }>(PROVIDERS.google.token, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: client.clientId,
      client_secret: client.clientSecret,
      redirect_uri: redirect,
      grant_type: "authorization_code",
      code_verifier: verifier,
    }),
  });
  if (!token?.access_token) return null;
  const profile = await getJson<{ sub?: string; email?: string; email_verified?: boolean; name?: string }>(
    "https://openidconnect.googleapis.com/v1/userinfo",
    { headers: { Authorization: `Bearer ${token.access_token}` } },
  );
  if (!profile?.sub) return null;
  return { provider: "google", providerId: profile.sub, email: profile.email_verified ? profile.email ?? null : null, name: profile.name ?? null };
}

/**
 * Finishes the redirect: checks the state against this browser's cookie, then
 * trades the code for the provider's account details. Returns null for any
 * mismatch or provider failure, which the callback reports as a failed sign-in.
 */
export async function finishOAuth(request: Request, provider: Provider): Promise<Identity | null> {
  const config = backendConfig();
  const client = config?.[provider];
  if (!config || !client) return null;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const store = await cookies();
  const [savedProvider, savedState, verifier] = store.get(OAUTH_COOKIE)?.value.split(".") ?? [];
  store.delete(OAUTH_COOKIE);
  if (!code || !state || savedProvider !== provider || savedState !== state || !verifier) return null;
  const redirect = redirectUri(config.siteUrl, provider);
  return provider === "github"
    ? githubIdentity(client, code, verifier, redirect)
    : googleIdentity(client, code, verifier, redirect);
}
