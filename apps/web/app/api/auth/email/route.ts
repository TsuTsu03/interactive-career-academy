import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { backendConfig } from "@/lib/backend-config";
import { authRequest, noStoreHeaders, PKCE_COOKIE, restRequest } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const config = backendConfig();
  if (!config) return NextResponse.json({ error: "Account connection is not configured yet." }, { status: 503, headers: noStoreHeaders() });
  const body = await request.json().catch(() => null) as { email?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400, headers: noStoreHeaders() });
  }
  // One script can otherwise drain the whole email quota and get the sending
  // domain flagged, which locks out every learner using the one sign-in method
  // that needs no third-party account. Only digests leave this process, so the
  // throttle table never holds an address or a client address.
  const clientAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const digest = (value: string) => createHash("sha256").update(value).digest("hex");
  // Called with the secret key, so the function no longer has to be reachable
  // by `anon`. The caller here is anonymous, but this route is not: it runs on
  // the server, and leaving the grant open let anyone holding the publishable
  // key burn the throttle for an address they do not own and lock its owner
  // out of the only sign-in method that needs no third-party account.
  const throttle = await restRequest(
    "rpc/claim_email_link",
    {
      method: "POST",
      body: JSON.stringify({
        p_email_hash: digest(email),
        p_client_hash: digest(clientAddress),
      }),
    },
    undefined,
    true,
  );
  if (!throttle?.ok) {
    return NextResponse.json({ error: "The sign-in email could not be sent." }, { status: 502, headers: noStoreHeaders() });
  }
  if ((await throttle.json()) !== true) {
    return NextResponse.json(
      { error: "Too many sign-in links were requested. Try again in an hour." },
      { status: 429, headers: noStoreHeaders() },
    );
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
