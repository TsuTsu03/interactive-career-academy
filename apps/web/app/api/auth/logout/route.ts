import { NextResponse } from "next/server";
import { clearSession, noStoreHeaders } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

export async function POST() {
  await clearSession();
  return NextResponse.json({ signedOut: true }, { headers: noStoreHeaders() });
}
