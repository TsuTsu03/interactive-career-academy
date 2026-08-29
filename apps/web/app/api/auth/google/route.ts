import { startOAuth } from "@/lib/oauth-start";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return startOAuth(request, "google");
}
