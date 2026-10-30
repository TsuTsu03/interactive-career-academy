import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { backendConfig } from "@/lib/backend-config";
import { createSession, EMAIL_VERIFIER_COOKIE, sha256, userForIdentity } from "@/lib/auth-server";
import { database, type EmailLinkDoc } from "@/lib/mongo";

export const dynamic = "force-dynamic";

/**
 * Finishes an email sign-in link.
 *
 * The link only works in the browser that asked for it: the lookup needs both
 * the token from the email and the verifier cookie set when the link was
 * requested, so a forwarded or intercepted email cannot sign anyone in. A
 * matching link is deleted as it is used, so it works once.
 */
export async function GET(request: Request) {
  if (!backendConfig()) return NextResponse.redirect(new URL("/account?auth=not-configured", request.url));
  const token = new URL(request.url).searchParams.get("token");
  const store = await cookies();
  const verifier = store.get(EMAIL_VERIFIER_COOKIE)?.value;
  if (!token || !verifier) return NextResponse.redirect(new URL("/account?auth=failed", request.url));
  try {
    const db = await database();
    const link = await db?.collection<EmailLinkDoc>("email_links").findOneAndDelete({
      _id: sha256(token),
      verifier_hash: sha256(verifier),
      expires_at: { $gt: new Date() },
    });
    if (!link) return NextResponse.redirect(new URL("/account?auth=failed", request.url));
    const user = await userForIdentity({ provider: "email", providerId: link.email, email: link.email, name: null });
    if (!user) return NextResponse.redirect(new URL("/account?auth=failed", request.url));
    await createSession(user.id);
    store.delete(EMAIL_VERIFIER_COOKIE);
    return NextResponse.redirect(new URL("/account?auth=connected", request.url));
  } catch {
    return NextResponse.redirect(new URL("/account?auth=failed", request.url));
  }
}
