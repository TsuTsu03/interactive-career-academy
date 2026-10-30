import { NextResponse } from "next/server";
import { backendAvailability } from "@/lib/backend-config";
import { authenticatedUser, noStoreHeaders } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await authenticatedUser();
  return NextResponse.json({ ...backendAvailability(), user: auth?.user ?? null }, { headers: noStoreHeaders() });
}
