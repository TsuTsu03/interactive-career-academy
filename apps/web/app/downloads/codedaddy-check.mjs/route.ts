import { readFileSync } from "node:fs";
import { join } from "node:path";
import { curriculum } from "@/content/curriculum";
import { buildLocalManifest } from "@/lib/local-manifest";

// Built once at deploy time. The learner downloads one self-contained file:
// the checker source from tools/local-checker.mjs with the lesson checks
// filled in as plain JSON data.
export const dynamic = "force-static";

const MARKER = "/*__CODEDADDY_MANIFEST__*/ null";

export function GET() {
  const source = readFileSync(join(process.cwd(), "tools", "local-checker.mjs"), "utf8");
  if (!source.includes(MARKER)) throw new Error("The checker source lost its manifest marker.");
  const body = source.replace(MARKER, () => JSON.stringify(buildLocalManifest(curriculum)));
  return new Response(body, {
    headers: {
      "Content-Type": "text/javascript; charset=utf-8",
      "Content-Disposition": 'attachment; filename="codedaddy-check.mjs"',
      "X-Content-Type-Options": "nosniff",
    },
  });
}
