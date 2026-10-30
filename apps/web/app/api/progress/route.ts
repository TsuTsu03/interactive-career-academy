import { NextResponse } from "next/server";
import { curriculum } from "@/content/curriculum";
import { courseSessionSnapshotFromStorage, withoutLearnerFiles } from "@/lib/progress";
import { freshPracticeState, validatePracticeState } from "@/lib/practice-progress";
import { authenticatedUser, noStoreHeaders } from "@/lib/auth-server";
import { database, type CourseProgressDoc, type PracticeProgressDoc } from "@/lib/mongo";

export const dynamic = "force-dynamic";
const MAX_BODY_BYTES = 4_000_000;

function unauthorized() {
  return NextResponse.json({ error: "Sign in to sync progress." }, { status: 401, headers: noStoreHeaders() });
}

export async function GET() {
  const auth = await authenticatedUser();
  if (!auth) return unauthorized();
  try {
    const db = (await database())!;
    const [courseRows, practiceRow] = await Promise.all([
      db.collection<CourseProgressDoc>("course_progress").find({ user_id: auth.user.id }, { projection: { _id: 0, course_id: 1, session: 1 } }).toArray(),
      db.collection<PracticeProgressDoc>("practice_progress").findOne({ user_id: auth.user.id }, { projection: { _id: 0, state: 1 } }),
    ]);
    return NextResponse.json({
      courses: Object.fromEntries(courseRows.map((row) => [row.course_id, row.session])),
      practice: practiceRow?.state ?? freshPracticeState(),
    }, { headers: noStoreHeaders() });
  } catch {
    return NextResponse.json({ error: "Account progress could not be loaded." }, { status: 502, headers: noStoreHeaders() });
  }
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
  try {
    const db = (await database())!;
    const now = new Date();
    const userId = auth.user.id;
    const courseWrites = Object.entries(courses).map(([courseId, session]) => ({
      updateOne: {
        filter: { user_id: userId, course_id: courseId },
        update: { $set: { session: session as Record<string, unknown>, updated_at: now }, $setOnInsert: { created_at: now } },
        upsert: true,
      },
    }));
    await Promise.all([
      courseWrites.length ? db.collection<CourseProgressDoc>("course_progress").bulkWrite(courseWrites, { ordered: false }) : null,
      db.collection<PracticeProgressDoc>("practice_progress").updateOne(
        { user_id: userId },
        { $set: { state: practice as unknown as Record<string, unknown>, updated_at: now }, $setOnInsert: { created_at: now } },
        { upsert: true },
      ),
    ]);
  } catch {
    return NextResponse.json({ error: "Progress was not saved to the account." }, { status: 502, headers: noStoreHeaders() });
  }
  return NextResponse.json({ saved: true }, { headers: noStoreHeaders() });
}
