import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { capstones } from "@/content/capstones";
import { frontEndCourses } from "@/content/curriculum";
import { backendAvailability } from "@/lib/backend-config";
import { courseSessionSnapshotFromStorage } from "@/lib/progress";
import { validatePracticeState } from "@/lib/practice-progress";
import { authenticatedUser, noStoreHeaders, type AuthUser } from "@/lib/auth-server";
import { database, isDuplicateKey, type CertificateDoc, type CourseProgressDoc, type PracticeProgressDoc, type ProfileDoc, type SubmissionDoc } from "@/lib/mongo";

export const dynamic = "force-dynamic";

interface CertificateRecord {
  code: string;
  display_name: string;
  credential_name: string;
  portfolio_url: string;
  repository_url: string;
  issued_at: string;
}

const CERTIFICATE_FIELDS = { _id: 0, code: 1, display_name: 1, credential_name: 1, portfolio_url: 1, repository_url: 1, issued_at: 1 } as const;

async function readiness(user: AuthUser) {
  const db = await database().catch(() => null);
  if (!db) return null;
  const owner = { user_id: user.id };
  const rows = await Promise.all([
    db.collection<CourseProgressDoc>("course_progress").find(owner, { projection: { _id: 0, course_id: 1, session: 1 } }).toArray(),
    db.collection<PracticeProgressDoc>("practice_progress").find(owner, { projection: { _id: 0, state: 1 } }).toArray(),
    db.collection<SubmissionDoc>("project_submissions").find(owner, { projection: { _id: 0, project_id: 1, repository_url: 1, live_url: 1, verification_status: 1 } }).toArray(),
    db.collection<ProfileDoc>("profiles").find(owner, { projection: { _id: 0, display_name: 1 } }).toArray(),
    db.collection<CertificateDoc>("certificates").find(owner, { projection: CERTIFICATE_FIELDS }).toArray(),
  ]).catch(() => null);
  if (!rows) return null;
  const [courseRows, practiceRows, submissions, profiles, certificates] = rows as unknown as [
    { course_id: string; session: unknown }[],
    { state: unknown }[],
    { project_id: string; repository_url: string; live_url: string; verification_status: string }[],
    { display_name: string }[],
    CertificateRecord[],
  ];
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
  const status = await readiness(auth.user);
  if (!status) return NextResponse.json({ error: "Certificate status could not be loaded." }, { status: 502, headers: noStoreHeaders() });
  return NextResponse.json({ ...backendAvailability(), signedIn: true, ...status, userId: undefined, submissions: undefined }, { headers: noStoreHeaders() });
}

export async function POST() {
  const auth = await authenticatedUser();
  if (!auth) return NextResponse.json({ error: "Sign in before issuing a certificate." }, { status: 401, headers: noStoreHeaders() });
  if (!backendAvailability().certificateIssuance) return NextResponse.json({ error: "Server-side certificate issuance is not configured." }, { status: 503, headers: noStoreHeaders() });
  const status = await readiness(auth.user);
  if (!status) return NextResponse.json({ error: "Certificate status could not be loaded." }, { status: 502, headers: noStoreHeaders() });
  if (status.certificate) return NextResponse.json({ certificate: status.certificate }, { headers: noStoreHeaders() });
  if (!status.ready) return NextResponse.json({ error: "Finish all courses, all five capstones, the five project-link records, and your certificate name first." }, { status: 409, headers: noStoreHeaders() });
  const portfolio = status.submissions.find((item) => item.project_id === "capstone-portfolio")!;
  // The insert only happens when this user has no certificate yet, so a double
  // click or two tabs can never mint a second code. The unique index on
  // user_id is the final guard, and losing that race just reads the winner.
  try {
    const certificates = (await database())!.collection<CertificateDoc>("certificates");
    const now = new Date();
    await certificates.updateOne(
      { user_id: status.userId },
      {
        $setOnInsert: {
          user_id: status.userId,
          code: randomUUID(),
          display_name: status.displayName,
          credential_name: "Front-End Development Certificate of Completion",
          portfolio_url: portfolio.live_url,
          repository_url: portfolio.repository_url,
          evidence: {
            course_ids: status.completedCourses,
            capstone_ids: status.completedCapstones,
            submitted_project_ids: status.submittedCapstones,
            disclosure: "Authenticated persistence of browser-checked completion; not accreditation or independent competency verification.",
          },
          issued_at: now,
        },
      },
      { upsert: true },
    ).catch((error) => {
      if (!isDuplicateKey(error)) throw error;
    });
    const certificate = await certificates.findOne({ user_id: status.userId }, { projection: CERTIFICATE_FIELDS });
    return certificate
      ? NextResponse.json({ certificate }, { headers: noStoreHeaders() })
      : NextResponse.json({ error: "Certificate could not be loaded after issuance." }, { status: 502, headers: noStoreHeaders() });
  } catch {
    return NextResponse.json({ error: "Certificate could not be issued." }, { status: 502, headers: noStoreHeaders() });
  }
}
