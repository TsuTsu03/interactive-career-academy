import { NextResponse } from "next/server";
import { authenticatedUser, noStoreHeaders } from "@/lib/auth-server";
import { database, type ProfileDoc } from "@/lib/mongo";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await authenticatedUser();
  if (!auth) return NextResponse.json({ error: "Sign in to view your profile." }, { status: 401, headers: noStoreHeaders() });
  try {
    const row = await (await database())!.collection<ProfileDoc>("profiles").findOne({ user_id: auth.user.id });
    return NextResponse.json({ displayName: row?.display_name ?? auth.user.name ?? "" }, { headers: noStoreHeaders() });
  } catch {
    return NextResponse.json({ error: "Profile could not be loaded." }, { status: 502, headers: noStoreHeaders() });
  }
}

export async function PUT(request: Request) {
  const auth = await authenticatedUser();
  if (!auth) return NextResponse.json({ error: "Sign in to save your profile." }, { status: 401, headers: noStoreHeaders() });
  const body = await request.json().catch(() => null) as { displayName?: unknown } | null;
  const displayName = typeof body?.displayName === "string" ? body.displayName.replace(/\s+/g, " ").trim() : "";
  if (displayName.length < 2 || displayName.length > 80) return NextResponse.json({ error: "Use a name between 2 and 80 characters." }, { status: 400, headers: noStoreHeaders() });
  try {
    const now = new Date();
    await (await database())!.collection<ProfileDoc>("profiles").updateOne(
      { user_id: auth.user.id },
      { $set: { display_name: displayName, updated_at: now }, $setOnInsert: { created_at: now } },
      { upsert: true },
    );
  } catch {
    return NextResponse.json({ error: "Profile could not be saved." }, { status: 502, headers: noStoreHeaders() });
  }
  return NextResponse.json({ displayName }, { headers: noStoreHeaders() });
}
