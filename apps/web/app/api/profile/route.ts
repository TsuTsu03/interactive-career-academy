import { NextResponse } from "next/server";
import { authenticatedUser, noStoreHeaders, restRequest } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await authenticatedUser();
  if (!auth) return NextResponse.json({ error: "Sign in to view your profile." }, { status: 401, headers: noStoreHeaders() });
  const response = await restRequest("profiles?select=display_name", {}, auth.accessToken);
  if (!response?.ok) return NextResponse.json({ error: "Profile could not be loaded." }, { status: 502, headers: noStoreHeaders() });
  const rows = await response.json() as { display_name: string }[];
  const metadataName = [auth.user.user_metadata?.full_name, auth.user.user_metadata?.name].find((value) => typeof value === "string") as string | undefined;
  return NextResponse.json({ displayName: rows[0]?.display_name ?? metadataName ?? "" }, { headers: noStoreHeaders() });
}

export async function PUT(request: Request) {
  const auth = await authenticatedUser();
  if (!auth) return NextResponse.json({ error: "Sign in to save your profile." }, { status: 401, headers: noStoreHeaders() });
  const body = await request.json().catch(() => null) as { displayName?: unknown } | null;
  const displayName = typeof body?.displayName === "string" ? body.displayName.replace(/\s+/g, " ").trim() : "";
  if (displayName.length < 2 || displayName.length > 80) return NextResponse.json({ error: "Use a name between 2 and 80 characters." }, { status: 400, headers: noStoreHeaders() });
  const response = await restRequest("profiles?on_conflict=user_id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ user_id: auth.user.id, display_name: displayName }),
  }, auth.accessToken);
  if (!response?.ok) return NextResponse.json({ error: "Profile could not be saved." }, { status: 502, headers: noStoreHeaders() });
  return NextResponse.json({ displayName }, { headers: noStoreHeaders() });
}
