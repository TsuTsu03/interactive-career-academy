import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { backendConfig } from "@/lib/backend-config";
import { authRequest, noStoreHeaders, PKCE_COOKIE } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const config = backendConfig();
  if (!config) return NextResponse.json({ error: "Account connection is not configured yet." }, { status: 503, headers: noStoreHeaders() });
  const body = await request.json().catch(() => null) as { email?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400, headers: noStoreHeaders() });
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
  const redirectTo = `${config.siteUrl}/auth/callback`;
  const response = await authRequest(`/otp?redirect_to=${encodeURIComponent(redirectTo)}`, {
    method: "POST",
    body: JSON.stringify({
      email,
      create_user: true,
      data: {},
      code_challenge: challenge,
      code_challenge_method: "s256",
    }),
  });
  if (!response?.ok) {
    const detail = await response?.json().catch(() => null) as { msg?: string; message?: string } | null;
    return NextResponse.json({ error: detail?.msg ?? detail?.message ?? "The sign-in email could not be sent." }, { status: response?.status ?? 502, headers: noStoreHeaders() });
  }
  return NextResponse.json({ sent: true }, { headers: noStoreHeaders() });
}
