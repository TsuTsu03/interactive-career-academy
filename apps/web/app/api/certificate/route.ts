import { NextResponse } from "next/server";
import { capstones } from "@/content/capstones";
import { frontEndCourses } from "@/content/curriculum";
import { backendAvailability } from "@/lib/backend-config";
import { courseSessionSnapshotFromStorage } from "@/lib/progress";
import { validatePracticeState } from "@/lib/practice-progress";
import { authenticatedUser, noStoreHeaders, restRequest, type AuthUser } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

interface CertificateRecord {
  code: string;
  display_name: string;
  credential_name: string;
  portfolio_url: string;
  repository_url: string;
  issued_at: string;
}

async function readiness(user: AuthUser, accessToken: string) {
  const responses = await Promise.all([
    restRequest("course_progress?select=course_id,session", {}, accessToken),
    restRequest("practice_progress?select=state", {}, accessToken),
    restRequest("project_submissions?select=project_id,repository_url,live_url,verification_status", {}, accessToken),
    restRequest("profiles?select=display_name", {}, accessToken),
    restRequest("certificates?select=code,display_name,credential_name,portfolio_url,repository_url,issued_at", {}, accessToken),
  ]);
  if (responses.some((response) => !response?.ok)) return null;
  const courseRows = await responses[0]!.json() as { course_id: string; session: unknown }[];
  const practiceRows = await responses[1]!.json() as { state: unknown }[];
  const submissions = await responses[2]!.json() as { project_id: string; repository_url: string; live_url: string; verification_status: string }[];
  const profiles = await responses[3]!.json() as { display_name: string }[];
  const certificates = await responses[4]!.json() as CertificateRecord[];
  const completedCourses = frontEndCourses.filter((course) => {
    const row = courseRows.find((item) => item.course_id === course.id);
    const snapshot = row ? courseSessionSnapshotFromStorage(course, JSON.stringify(row.session)) : null;
    return snapshot?.completedStepIds.length === course.steps.length;
  }).map((course) => course.id);
  const practice = validatePracticeState(practiceRows[0]?.state);
  const completedCapstones = capstones.filter((capstone) => {
    const completion = practice?.completions.find((item) => item.activityId === capstone.id);
    return completion && capstone.tests.every((test) => completion.passedTestIds.includes(test.id));
  }).map((capstone) => capstone.id);
  const submittedCapstones = capstones.filter((capstone) => submissions.some((item) => item.project_id === capstone.id && item.verification_status !== "rejected")).map((capstone) => capstone.id);
  const displayName = profiles[0]?.display_name ?? "";
  return {
    ready: completedCourses.length === frontEndCourses.length && completedCapstones.length === capstones.length && submittedCapstones.length === capstones.length && displayName.length >= 2,
    completedCourses,
    completedCapstones,
    submittedCapstones,
    displayName,
    submissions,
    certificate: certificates[0] ?? null,
    userId: user.id,
  };
}

export async function GET() {
  const auth = await authenticatedUser();
  if (!auth) return NextResponse.json({ ...backendAvailability(), signedIn: false }, { status: 401, headers: noStoreHeaders() });
  const status = await readiness(auth.user, auth.accessToken);
  if (!status) return NextResponse.json({ error: "Certificate status could not be loaded." }, { status: 502, headers: noStoreHeaders() });
  return NextResponse.json({ ...backendAvailability(), signedIn: true, ...status, userId: undefined, submissions: undefined }, { headers: noStoreHeaders() });
}

export async function POST() {
  const auth = await authenticatedUser();
  if (!auth) return NextResponse.json({ error: "Sign in before issuing a certificate." }, { status: 401, headers: noStoreHeaders() });
  if (!backendAvailability().certificateIssuance) return NextResponse.json({ error: "Server-side certificate issuance is not configured." }, { status: 503, headers: noStoreHeaders() });
  const status = await readiness(auth.user, auth.accessToken);
  if (!status) return NextResponse.json({ error: "Certificate status could not be loaded." }, { status: 502, headers: noStoreHeaders() });
  if (status.certificate) return NextResponse.json({ certificate: status.certificate }, { headers: noStoreHeaders() });
  if (!status.ready) return NextResponse.json({ error: "Finish all courses, all five capstones, the five project-link records, and your certificate name first." }, { status: 409, headers: noStoreHeaders() });
  const portfolio = status.submissions.find((item) => item.project_id === "capstone-portfolio")!;
  const response = await restRequest("certificates?on_conflict=user_id", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=representation" },
    body: JSON.stringify({
      user_id: status.userId,
      display_name: status.displayName,
      portfolio_url: portfolio.live_url,
      repository_url: portfolio.repository_url,
      evidence: {
        course_ids: status.completedCourses,
        capstone_ids: status.completedCapstones,
        submitted_project_ids: status.submittedCapstones,
        disclosure: "Authenticated persistence of browser-checked completion; not accreditation or independent competency verification.",
      },
    }),
  }, undefined, true);
  if (!response?.ok) return NextResponse.json({ error: "Certificate could not be issued." }, { status: 502, headers: noStoreHeaders() });
  const inserted = await response.json() as CertificateRecord[];
  if (inserted[0]) return NextResponse.json({ certificate: inserted[0] }, { headers: noStoreHeaders() });
  const existing = await restRequest("certificates?select=code,display_name,credential_name,portfolio_url,repository_url,issued_at", {}, auth.accessToken);
  const rows = existing?.ok ? await existing.json() as CertificateRecord[] : [];
  return rows[0]
    ? NextResponse.json({ certificate: rows[0] }, { headers: noStoreHeaders() })
    : NextResponse.json({ error: "Certificate could not be loaded after issuance." }, { status: 502, headers: noStoreHeaders() });
}
