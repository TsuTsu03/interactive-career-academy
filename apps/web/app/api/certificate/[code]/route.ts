import { NextResponse } from "next/server";
import { noStoreHeaders } from "@/lib/auth-server";
import { database, type CertificateDoc } from "@/lib/mongo";

export const dynamic = "force-dynamic";
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(_: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  if (!uuid.test(code)) return NextResponse.json({ error: "Certificate not found." }, { status: 404, headers: noStoreHeaders() });
  let certificate;
  try {
    const db = await database();
    if (!db) throw new Error("not configured");
    certificate = await db.collection<CertificateDoc>("certificates").findOne(
      { code: code.toLowerCase() },
      { projection: { _id: 0, code: 1, display_name: 1, credential_name: 1, portfolio_url: 1, repository_url: 1, issued_at: 1 } },
    );
  } catch {
    return NextResponse.json({ error: "Certificate lookup is unavailable." }, { status: 503, headers: noStoreHeaders() });
  }
  if (!certificate) return NextResponse.json({ error: "Certificate not found." }, { status: 404, headers: noStoreHeaders() });
  return NextResponse.json({ certificate }, { headers: { ...noStoreHeaders(), "X-Robots-Tag": "noindex, nofollow" } });
}
