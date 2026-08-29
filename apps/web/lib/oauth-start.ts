import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { backendConfig } from "@/lib/backend-config";
import { PKCE_COOKIE } from "@/lib/supabase-server";

/**
 * Starts a PKCE authorization redirect for one Supabase OAuth provider.
 *
 * Shared by every provider route so the verifier, the challenge, the cookie
 * flags, and the callback URL can only be written once. A provider the project
 * has not enabled in Supabase returns the learner to the account screen with
 * an honest message rather than a provider error page.
 */
export async function startOAuth(
  request: Request,
  provider: "github" | "google"
): Promise<NextResponse> {
  const config = backendConfig();
  if (!config) {
    return NextResponse.redirect(new URL("/account?auth=not-configured", request.url));
  }

  const verifier = randomBytes(48).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  const store = await cookies();
  store.set(PKCE_COOKIE, verifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  const authorize = new URL(`${config.url}/auth/v1/authorize`);
  authorize.searchParams.set("provider", provider);
  authorize.searchParams.set("redirect_to", `${config.siteUrl}/auth/callback`);
  authorize.searchParams.set("code_challenge", challenge);
  authorize.searchParams.set("code_challenge_method", "s256");
  return NextResponse.redirect(authorize);
}
