import { NextResponse } from "next/server";
import { capstoneIds } from "@/content/capstones";
import { validateSecureLiveUrl, validateSecureRepositoryUrl } from "@/lib/submission";
import { authenticatedUser, noStoreHeaders, restRequest } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await authenticatedUser();
  if (!auth) return NextResponse.json({ error: "Sign in to load submissions." }, { status: 401, headers: noStoreHeaders() });
  const response = await restRequest("project_submissions?select=project_id,repository_url,live_url,verification_status,updated_at", {}, auth.accessToken);
  if (!response?.ok) return NextResponse.json({ error: "Submissions could not be loaded." }, { status: 502, headers: noStoreHeaders() });
  return NextResponse.json({ submissions: await response.json() }, { headers: noStoreHeaders() });
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
  const response = await restRequest("project_submissions?on_conflict=user_id,project_id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify({ user_id: auth.user.id, project_id: projectId, repository_url: repositoryUrl, live_url: liveUrl, verification_status: "recorded" }),
  }, auth.accessToken);
  if (!response?.ok) return NextResponse.json({ error: "Project links could not be saved." }, { status: 502, headers: noStoreHeaders() });
  return NextResponse.json({ submission: (await response.json())[0] }, { headers: noStoreHeaders() });
}
