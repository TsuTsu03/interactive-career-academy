import { NextResponse } from "next/server";
import { backendAvailability } from "@/lib/backend-config";
import { noStoreHeaders } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(backendAvailability(), { headers: noStoreHeaders() });
}
