import { NextResponse } from "next/server";
import { authRequest, clearSession, noStoreHeaders, authenticatedUser } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function POST() {
  const auth = await authenticatedUser();
  if (auth) await authRequest("/logout", { method: "POST", headers: { Authorization: `Bearer ${auth.accessToken}` } });
  await clearSession();
  return NextResponse.json({ signedOut: true }, { headers: noStoreHeaders() });
}
