import { NextResponse } from "next/server";
import { noStoreHeaders, restRequest } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(_: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  if (!uuid.test(code)) return NextResponse.json({ error: "Certificate not found." }, { status: 404, headers: noStoreHeaders() });
  const response = await restRequest(`certificates?code=eq.${encodeURIComponent(code)}&select=code,display_name,credential_name,portfolio_url,repository_url,issued_at`, {}, undefined, true);
  if (!response?.ok) return NextResponse.json({ error: "Certificate lookup is unavailable." }, { status: 503, headers: noStoreHeaders() });
  const rows = await response.json() as unknown[];
  if (!rows[0]) return NextResponse.json({ error: "Certificate not found." }, { status: 404, headers: noStoreHeaders() });
  return NextResponse.json({ certificate: rows[0] }, { headers: { ...noStoreHeaders(), "X-Robots-Tag": "noindex, nofollow" } });
}
