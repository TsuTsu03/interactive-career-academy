import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { noStoreHeaders, restRequest } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const MOODS = new Set(["working", "unsure", "stuck", "idea"]);

/**
 * Records one piece of learner feedback.
 *
 * Anonymous is the normal case, so this route uses the publishable key and a
 * function that can insert but never read. The client address is hashed before
 * it leaves this process; the throttle needs to tell senders apart, not know
 * who they are.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    mood?: unknown;
    message?: unknown;
    page?: unknown;
    contact?: unknown;
  } | null;

  const mood = typeof body?.mood === "string" ? body.mood : "";
  if (!MOODS.has(mood)) {
    return NextResponse.json({ error: "Choose one of the four answers." }, { status: 400, headers: noStoreHeaders() });
  }

  const message = typeof body?.message === "string" ? body.message.trim().slice(0, 2000) : "";
  const page = typeof body?.page === "string" ? body.page.trim().slice(0, 200) : "";
  const contact = typeof body?.contact === "string" ? body.contact.trim().toLowerCase().slice(0, 254) : "";
  if (message && message.length < 4) {
    return NextResponse.json({ error: "Write a little more, or send it without a note." }, { status: 400, headers: noStoreHeaders() });
  }
  if (contact && !/^\S+@\S+\.\S+$/.test(contact)) {
    return NextResponse.json({ error: "That email address does not look right." }, { status: 400, headers: noStoreHeaders() });
  }

  const clientAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const response = await restRequest("rpc/submit_feedback", {
    method: "POST",
    body: JSON.stringify({
      p_mood: mood,
      p_message: message || null,
      p_page: page || null,
      p_contact: contact || null,
      p_client_hash: createHash("sha256").update(clientAddress).digest("hex"),
    }),
  });

  if (!response?.ok) {
    return NextResponse.json({ error: "Feedback could not be sent right now." }, { status: 502, headers: noStoreHeaders() });
  }
  if ((await response.json()) !== true) {
    return NextResponse.json({ error: "That is a lot of feedback in one hour. Try again later." }, { status: 429, headers: noStoreHeaders() });
  }
  return NextResponse.json({ sent: true }, { headers: noStoreHeaders() });
}
