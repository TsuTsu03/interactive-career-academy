/**
 * Copies the installed sql.js browser build into `public/` so the SQL runner
 * can fetch it at run time.
 *
 * Same shape as `build-react-runtime.mjs`: the package is a devDependency, and
 * only the two files the browser actually needs are published. Nothing here
 * ends up in the app bundle — the database lessons fetch these on demand, and
 * every other page never pays for them.
 */

import { copyFile, mkdir, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const from = resolve(appDir, "node_modules", "sql.js", "dist");
const to = resolve(appDir, "public", "sql");

/**
 * The emscripten glue is published as `.txt`, not `.js`, on purpose. The
 * platform never loads it as a script: `lib/sql-runner.ts` fetches it as text
 * and hands it to the sandboxed frame over postMessage, where it is evaluated
 * against an opaque origin. Calling it `.txt` describes what it is here —
 * data — and keeps a vendored, minified file out of the project's own lint.
 */
const files = [
  ["sql-wasm.js", "sql-wasm.txt"],
  ["sql-wasm.wasm", "sql-wasm.wasm"],
];

await mkdir(to, { recursive: true });

for (const [source, published] of files) {
  await copyFile(resolve(from, source), resolve(to, published));
  const { size } = await stat(resolve(to, published));
  process.stdout.write(`Copied public/sql/${published} (${Math.round(size / 1024)} KB).\n`);
}
