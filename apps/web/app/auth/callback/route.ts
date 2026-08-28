import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { backendConfig } from "@/lib/backend-config";
import { authRequest, PKCE_COOKIE, saveSession } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

interface SessionPayload {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  user?: { id?: string };
  session?: SessionPayload;
}

export async function GET(request: Request) {
  const config = backendConfig();
  if (!config) return NextResponse.redirect(new URL("/account?auth=not-configured", request.url));
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const verifier = (await cookies()).get(PKCE_COOKIE)?.value;
  let response: Response | null = null;
  if (code && verifier) {
    response = await authRequest("/token?grant_type=pkce", {
      method: "POST",
      body: JSON.stringify({ auth_code: code, code_verifier: verifier }),
    });
  } else if (tokenHash && type === "email") {
    response = await authRequest("/verify", {
      method: "POST",
      body: JSON.stringify({ token_hash: tokenHash, type }),
    });
  }
  if (!response?.ok) return NextResponse.redirect(new URL("/account?auth=failed", request.url));
  const raw = await response.json() as SessionPayload;
  const session = raw.session ?? raw;
  if (!session.access_token || !session.refresh_token || !session.expires_in || !session.user?.id) {
    return NextResponse.redirect(new URL("/account?auth=failed", request.url));
  }
  await saveSession(session as Parameters<typeof saveSession>[0]);
  (await cookies()).delete(PKCE_COOKIE);
  return NextResponse.redirect(new URL("/account?auth=connected", request.url));
}
