import { NextResponse } from "next/server";
import { backendConfig } from "@/lib/backend-config";
import { createSession, userForIdentity } from "@/lib/auth-server";
import { finishOAuth, isProvider } from "@/lib/oauth";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ provider: string }> }) {
  if (!backendConfig()) return NextResponse.redirect(new URL("/account?auth=not-configured", request.url));
  const { provider } = await params;
  if (!isProvider(provider)) return NextResponse.redirect(new URL("/account?auth=failed", request.url));
  try {
    const identity = await finishOAuth(request, provider);
    const user = identity ? await userForIdentity(identity) : null;
    if (!user) return NextResponse.redirect(new URL("/account?auth=failed", request.url));
    await createSession(user.id);
    return NextResponse.redirect(new URL("/account?auth=connected", request.url));
  } catch {
    return NextResponse.redirect(new URL("/account?auth=failed", request.url));
  }
}
