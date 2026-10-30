import { NextResponse } from "next/server";
import { capstoneIds } from "@/content/capstones";
import { validateSecureLiveUrl, validateSecureRepositoryUrl } from "@/lib/submission";
import { authenticatedUser, noStoreHeaders } from "@/lib/auth-server";
import { database, type SubmissionDoc } from "@/lib/mongo";

export const dynamic = "force-dynamic";

const PUBLIC_FIELDS = { _id: 0, project_id: 1, repository_url: 1, live_url: 1, verification_status: 1, updated_at: 1 } as const;

export async function GET() {
  const auth = await authenticatedUser();
  if (!auth) return NextResponse.json({ error: "Sign in to load submissions." }, { status: 401, headers: noStoreHeaders() });
  try {
    const submissions = await (await database())!.collection<SubmissionDoc>("project_submissions")
      .find({ user_id: auth.user.id }, { projection: PUBLIC_FIELDS })
      .toArray();
    return NextResponse.json({ submissions }, { headers: noStoreHeaders() });
  } catch {
    return NextResponse.json({ error: "Submissions could not be loaded." }, { status: 502, headers: noStoreHeaders() });
  }
}

export async function PUT(request: Request) {
  const auth = await authenticatedUser();
  if (!auth) return NextResponse.json({ error: "Sign in to submit project links." }, { status: 401, headers: noStoreHeaders() });
  const body = await request.json().catch(() => null) as { projectId?: unknown; repositoryUrl?: unknown; liveUrl?: unknown } | null;
  const projectId = typeof body?.projectId === "string" ? body.projectId : "";
  const repositoryUrl = typeof body?.repositoryUrl === "string" ? body.repositoryUrl.trim() : "";
  const liveUrl = typeof body?.liveUrl === "string" ? body.liveUrl.trim() : "";
  if (!capstoneIds.includes(projectId)) return NextResponse.json({ error: "Choose a valid capstone." }, { status: 400, headers: noStoreHeaders() });
  if (validateSecureRepositoryUrl(repositoryUrl) || validateSecureLiveUrl(liveUrl)) return NextResponse.json({ error: "Use one GitHub repository link and one full HTTPS live-project link." }, { status: 400, headers: noStoreHeaders() });
  try {
    const now = new Date();
    const submission = await (await database())!.collection<SubmissionDoc>("project_submissions").findOneAndUpdate(
      { user_id: auth.user.id, project_id: projectId },
      {
        $set: { repository_url: repositoryUrl, live_url: liveUrl, verification_status: "recorded", updated_at: now },
        $setOnInsert: { created_at: now },
      },
      { upsert: true, returnDocument: "after", projection: PUBLIC_FIELDS },
    );
    return NextResponse.json({ submission }, { headers: noStoreHeaders() });
  } catch {
    return NextResponse.json({ error: "Project links could not be saved." }, { status: 502, headers: noStoreHeaders() });
  }
}
