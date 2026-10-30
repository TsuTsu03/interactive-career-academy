import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { notifyFeedback } from "@/lib/feedback-email";
import { authenticatedUser, clientAddress, noStoreHeaders, sha256 } from "@/lib/auth-server";
import { claimThrottle, database, type FeedbackDoc } from "@/lib/mongo";

export const dynamic = "force-dynamic";

const MOODS = new Set(["working", "unsure", "stuck", "idea"]);

/**
 * Records one piece of learner feedback.
 *
 * Anonymous is the normal case. Only this server route can write the feedback
 * collection; the browser never holds database credentials, so nothing can skip
 * the validation and the throttle below. The client address is hashed before it
 * is stored; the throttle needs to tell senders apart, not know who they are.
 * A signed-in sender's account id is kept with the row, as before.
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

  try {
    const db = await database();
    if (!db) throw new Error("not configured");
    // Reuses the auth_throttle buckets so one open form cannot fill the database.
    if (!(await claimThrottle(db, `feedback:${sha256(clientAddress(request))}`, 10))) {
      return NextResponse.json({ error: "That is a lot of feedback in one hour. Try again later." }, { status: 429, headers: noStoreHeaders() });
    }
    const auth = await authenticatedUser();
    await db.collection<FeedbackDoc>("feedback").insertOne({
      _id: randomUUID(),
      created_at: new Date(),
      mood,
      message: message || null,
      page: page || null,
      contact: contact || null,
      user_id: auth?.user.id ?? null,
    });
  } catch {
    return NextResponse.json({ error: "Feedback could not be sent right now." }, { status: 502, headers: noStoreHeaders() });
  }
  // The row is already saved. A mail outage costs a notification, never the
  // feedback, so the result of this is not allowed to change the answer.
  await notifyFeedback({ mood, message, page, contact });
  return NextResponse.json({ sent: true }, { headers: noStoreHeaders() });
}
