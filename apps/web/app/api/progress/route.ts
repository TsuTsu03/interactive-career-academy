import { NextResponse } from "next/server";
import { curriculum } from "@/content/curriculum";
import { courseSessionSnapshotFromStorage, withoutLearnerFiles } from "@/lib/progress";
import { freshPracticeState, validatePracticeState } from "@/lib/practice-progress";
import { authenticatedUser, noStoreHeaders, restRequest } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
const MAX_BODY_BYTES = 4_000_000;

function unauthorized() {
  return NextResponse.json({ error: "Sign in to sync progress." }, { status: 401, headers: noStoreHeaders() });
}

export async function GET() {
  const auth = await authenticatedUser();
  if (!auth) return unauthorized();
  const [coursesResponse, practiceResponse] = await Promise.all([
    restRequest("course_progress?select=course_id,session,updated_at", {}, auth.accessToken),
    restRequest("practice_progress?select=state,updated_at", {}, auth.accessToken),
  ]);
  if (!coursesResponse?.ok || !practiceResponse?.ok) {
    return NextResponse.json({ error: "Account progress could not be loaded." }, { status: 502, headers: noStoreHeaders() });
  }
  const courseRows = await coursesResponse.json() as { course_id: string; session: unknown; updated_at: string }[];
  const practiceRows = await practiceResponse.json() as { state: unknown; updated_at: string }[];
  return NextResponse.json({
    courses: Object.fromEntries(courseRows.map((row) => [row.course_id, row.session])),
    practice: practiceRows[0]?.state ?? freshPracticeState(),
  }, { headers: noStoreHeaders() });
}

export async function PUT(request: Request) {
  const auth = await authenticatedUser();
  if (!auth) return unauthorized();
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return NextResponse.json({ error: "Progress data is too large." }, { status: 413, headers: noStoreHeaders() });
  const body = await request.json().catch(() => null) as { courses?: unknown; practice?: unknown } | null;
  if (!body?.courses || typeof body.courses !== "object" || Array.isArray(body.courses)) {
    return NextResponse.json({ error: "Course progress is invalid." }, { status: 400, headers: noStoreHeaders() });
  }
  const known = new Map(curriculum.courses.map((course) => [course.id, course]));
  const courses: Record<string, unknown> = {};
  for (const [id, raw] of Object.entries(body.courses)) {
    const course = known.get(id);
    const snapshot = course ? courseSessionSnapshotFromStorage(course, JSON.stringify(raw)) : null;
    if (!snapshot) return NextResponse.json({ error: `Progress for ${id} is invalid.` }, { status: 400, headers: noStoreHeaders() });
    courses[id] = withoutLearnerFiles(snapshot.record);
  }
  const practice = validatePracticeState(body.practice);
  if (!practice) return NextResponse.json({ error: "Independent project progress is invalid." }, { status: 400, headers: noStoreHeaders() });
  const response = await restRequest("rpc/sync_learning_state", {
    method: "POST",
    body: JSON.stringify({ p_courses: courses, p_practice: practice }),
  }, auth.accessToken);
  if (!response?.ok) return NextResponse.json({ error: "Progress was not saved to the account." }, { status: 502, headers: noStoreHeaders() });
  return NextResponse.json({ saved: true }, { headers: noStoreHeaders() });
}
