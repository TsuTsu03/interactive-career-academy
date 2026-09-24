<#
  ASCII ONLY: compatible with Windows PowerShell 5.1.
  Bounded local-model authoring, adapted from run-qwen-loop.ps1.
  The stock agent CLI preamble exceeded the small model's useful context in
  prior trials. The verified handoff uses Qwen3 VL 8B with a concrete brief.
  Use LM Studio's constrained JSON chat endpoint instead. The model receives
  no tools and cannot edit files. A fixed adapter validates data and appends
  only the selected database course plus its authoring-log entry.
  No new dependencies, global configuration, remote writes, or Git push.
  STOP_LOOP ends after the current pass. Existing STOP_LOOP is respected.
#>
param(
  [ValidateRange(1, 500)][int]$MaxIterations = 1,
  [ValidateRange(0, 60)][int]$PauseSeconds = 5,
  [ValidateRange(1, 100)][int]$CommitEvery = 1,
  [string]$Model = "qwen/qwen3-vl-8b",
  [string]$LmsUrl = "http://localhost:1234",
  [ValidateSet("sql-basics", "nosql-basics", "cli-git", "node-basics", "api-basics", "auth-security")][string]$CourseId = "sql-basics",
  [string]$ProjectId = "",
  [ValidateRange(5, 10)][int]$BatchSize = 5,
  [ValidateLength(0, 12000)][string]$BatchBrief = "",
  [ValidateLength(0, 260)][string]$BatchBriefFile = ""
)

$ErrorActionPreference = "Stop"
$repo = $PSScriptRoot
$webDir = Join-Path $repo "apps\web"
$promptFile = if ($CourseId -eq "cli-git") { Join-Path $repo "QWEN_CLI_GIT_AUTHORING_PROMPT.md" } elseif ($CourseId -eq "node-basics") { Join-Path $repo "QWEN_NODE_AUTHORING_PROMPT.md" } elseif ($CourseId -eq "api-basics") { Join-Path $repo "QWEN_API_AUTHORING_PROMPT.md" } elseif ($CourseId -eq "auth-security") { Join-Path $repo "QWEN_AUTH_AUTHORING_PROMPT.md" } else { Join-Path $repo "QWEN_V2_AUTHORING_PROMPT.md" }
$stopFile = Join-Path $repo "STOP_LOOP"
$courseFile = if ($CourseId -eq "sql-basics") { "apps/web/content/sql-course.ts" } elseif ($CourseId -eq "nosql-basics") { "apps/web/content/nosql-course.ts" } else { "apps/web/content/$CourseId-course.ts" }
$allowed = @($courseFile, "apps/web/content/AUTHORING_LOG.md")
$briefRoot = [System.IO.Path]::GetFullPath((Join-Path $repo ".qwen-v2-campaign"))
if ($BatchBriefFile) {
  if ($BatchBrief) { throw "Use BatchBrief or BatchBriefFile, not both." }
  $resolvedBriefFile = [System.IO.Path]::GetFullPath($BatchBriefFile)
  if (-not $resolvedBriefFile.StartsWith($briefRoot + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) { throw "BatchBriefFile must stay inside .qwen-v2-campaign." }
  if (-not (Test-Path -LiteralPath $resolvedBriefFile -PathType Leaf)) { throw "BatchBriefFile does not exist." }
  $BatchBrief = Get-Content -LiteralPath $resolvedBriefFile -Raw
  if ($BatchBrief.Length -gt 12000) { throw "BatchBriefFile exceeds 12,000 characters." }
}
$projectArgument = if ($ProjectId) { $ProjectId } else { "__last_project__" }
$briefArgument = if ($BatchBrief) { [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($BatchBrief)) } else { "__no_batch_brief__" }
$logDir = Join-Path ([System.IO.Path]::GetTempPath()) ("codedaddy-qwen-v2-" + [guid]::NewGuid().ToString("N"))

# All model input/output processing lives here, not in a third helper file.
# The only source writes are two fixed destinations chosen above by CourseId.
$adapter = @'
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
const [mode, root, courseId, projectArgument, batchText, endpoint, model, promptPath, receiptPath, briefArgument] = process.argv.slice(2);
const requestedProject = projectArgument === "__last_project__" ? "" : projectArgument;
const ownerBatchBrief = briefArgument && briefArgument !== "__no_batch_brief__" ? Buffer.from(briefArgument, "base64").toString("utf8") : undefined;
if (ownerBatchBrief && ownerBatchBrief.length > 12000) throw Error("BatchBrief exceeds 12,000 characters.");
const count = Number(batchText);
const isSql = courseId === "sql-basics";
const isLocal = ["cli-git", "node-basics", "api-basics", "auth-security"].includes(courseId);
if (!["sql-basics", "nosql-basics", "cli-git", "node-basics", "api-basics", "auth-security"].includes(courseId)) throw Error("Unknown course.");
const relative = `apps/web/content/${isLocal ? courseId : isSql ? "sql" : "nosql"}-course.ts`;
const allowed = [relative, "apps/web/content/AUTHORING_LOG.md"];
const resolve = file => path.join(root, file);
const git = (...args) => execFileSync("git", ["-c", `safe.directory=${root}`, ...args], { cwd: root, encoding: "utf8", maxBuffer: 20e6 });
const digest = file => {
  if (!fs.existsSync(resolve(file))) return "missing";
  const stat = fs.lstatSync(resolve(file));
  return createHash("sha256").update(stat.isSymbolicLink() ? fs.readlinkSync(resolve(file)) : fs.readFileSync(resolve(file))).digest("hex");
};
function guarded() {
  const files = [...new Set((git("ls-files", "-z") + git("ls-files", "--others", "--exclude-standard", "-z")).split("\0").filter(Boolean))].sort();
  return files.filter(file => !allowed.includes(file) && file !== "STOP_LOOP").map(file => [file, digest(file)]);
}
if (mode === "snapshot") {
  const data = { guarded: guarded(), staged: git("diff", "--cached", "--name-only"), allowed: allowed.map(file => ({ file, exists: fs.existsSync(resolve(file)), bytes: fs.existsSync(resolve(file)) ? fs.readFileSync(resolve(file)).toString("base64") : "" })) };
  fs.writeFileSync(receiptPath, JSON.stringify(data));
} else if (mode === "restore") {
  const saved = JSON.parse(fs.readFileSync(receiptPath, "utf8"));
  for (const record of saved.allowed) {
    if (!allowed.includes(record.file)) throw Error("Invalid rollback destination.");
    if (record.exists) fs.writeFileSync(resolve(record.file), Buffer.from(record.bytes, "base64"));
    else if (fs.existsSync(resolve(record.file))) fs.unlinkSync(resolve(record.file));
  }
  console.log("Restored the exact allowed-file bytes from before this attempt.");
} else if (mode === "guard") {
  const saved = JSON.parse(fs.readFileSync(receiptPath, "utf8"));
  if (JSON.stringify(saved.guarded) !== JSON.stringify(guarded()) || saved.staged !== git("diff", "--cached", "--name-only")) throw Error("Guarded paths or index changed. Stop and preserve those external edits.");
} else {
  await import(pathToFileURL(resolve("apps/web/tools/content-loader.mjs")));
  const { curriculum } = await import(pathToFileURL(resolve("apps/web/content/curriculum.ts")));
  const course = curriculum.courses.find(item => item.id === courseId);
  if (!course) throw Error("Course is not registered.");
  if (mode === "count") {
    console.log(JSON.stringify({ selected: course.steps.length, total: curriculum.courses.reduce((n, item) => n + item.steps.length, 0) }));
  } else if (mode === "author" && isLocal) {
    // Command Line and Git: commands and checks come from the fixed plan; the
    // model writes only the lesson text. See apps/web/tools/qwen-local-author.mjs.
    const { authorLocalBatch } = await import(pathToFileURL(resolve("apps/web/tools/qwen-local-author.mjs")));
    await authorLocalBatch({ root, courseId, courseFile: relative, logFile: allowed[1], projectId: requestedProject, endpoint, model, promptPath, receiptPath });
  } else if (mode === "author") {
    const { concepts } = await import(pathToFileURL(resolve("apps/web/content/concepts.ts")));
    const last = course.steps.at(-1);
    const projectId = requestedProject || last?.projectId;
    if (!projectId || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(projectId) || projectId.length > 80) throw Error("Choose a stable lowercase project id.");
    const project = course.projects.find(item => item.id === projectId);
    const isNew = !project;
    if (project && last?.projectId !== projectId) throw Error("Only the final existing project can be extended.");
    const seed = isNew ? undefined : isSql ? last.sqlSeed ?? "" : last.nosqlSeed ?? {};
    const registered = Object.values(concepts).filter(item => item.id.startsWith(isSql ? "sql-" : "nosql-")).map(({ id, term }) => ({ id, term }));
    const scalarText = { type: "string" };
    const index = { type: "integer", minimum: 0 };
    const boolean = { type: "boolean" };
    const cell = { anyOf: [{ type: "null" }, { type: "number" }, { type: "string" }, { type: "array", items: { type: "integer", minimum: 0, maximum: 255 } }] };
    // A field assertion compares one field against one value. Left open, the
    // model wrapped the value in the field again - value {"note":"Community
    // order"} for the field note - which reads as a field holding an object and
    // fails against the plain string the document actually holds. The IR still
    // allows an object there, and the grader still compares it structurally;
    // this narrows only what a generated batch may ask for. No authored step
    // uses an object-valued field assertion, or any field assertion at all.
    const fieldValue = { anyOf: [{ type: "null" }, { type: "number" }, { type: "string" }, { type: "boolean" }] };
    const row = { type: "array", items: cell };
    const document = { type: "object" };
    const assertionSpecs = {
      "sql-runs": {}, "sql-rows-equal": { rows: { type: "array", items: row }, resultIndex: index, ignoreOrder: boolean },
      "sql-row-contains": { row, resultIndex: index }, "sql-row-count": { count: index, resultIndex: index },
      "sql-columns-equal": { columns: { type: "array", items: scalarText }, resultIndex: index },
      "sql-value-equals": { row: index, column: index, value: cell, resultIndex: index }, "sql-table-exists": { table: scalarText },
      "sql-table-columns": { table: scalarText, columns: { type: "array", items: scalarText } },
      "nosql-runs": {}, "nosql-doc-count": { count: index },
      "nosql-docs-equal": { documents: { type: "array", items: document }, ignoreOrder: boolean },
      "nosql-doc-contains": { document }, "nosql-field-equals": { document: index, field: scalarText, value: fieldValue },
      "nosql-collection-exists": { collection: scalarText },
    };
    const family = Object.entries(assertionSpecs).filter(([kind]) => kind.startsWith(isSql ? "sql-" : "nosql-"));
    const testSchema = { oneOf: family.map(([kind, properties]) => ({ type: "object", additionalProperties: false,
      required: ["id", "label", "kind", ...Object.keys(properties).filter(key => !["resultIndex", "ignoreOrder"].includes(key))],
      properties: { id: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$", maxLength: 100 }, label: { type: "string", minLength: 1, maxLength: 500 }, kind: { const: kind }, ...properties },
    })) };
    const idPrefix = `${isSql ? "sql" : "nosql"}-${projectId}-`;
    const exampleStep = course.steps.find(step => step.projectId === last?.projectId && step.tests.some(test => !test.kind.endsWith("runs"))) ?? last;
    const exemplar = isNew ? {
      shapeOnly: true, instruction: "This example demonstrates JSON shape only. Do not reuse its id, example table, or subject. Build the requested project.",
      id: "example-only-do-not-copy", task: "Read the required fields from the example data.",
      solution: isSql ? "SELECT name FROM example_item;" : '{"collection":"example_item","operation":"find"}',
      tests: isSql ? [{ id: "result", label: "The example result contains its name", kind: "sql-rows-equal", rows: [["Example"]], ignoreOrder: true }] : [{ id: "result", label: "The example document is returned", kind: "nosql-docs-equal", documents: [{ name: "Example", quantity: 3 }] }],
      hints: ["Choose the fields the requested report needs.", "Read the named fields from the example data."], estimatedMinutes: 4,
    } : exampleStep;
    const context = {
      courseId, projectId, projectTitle: project?.title, newProject: isNew, batchSize: count,
      requestedTopic: projectId.replaceAll("-", " "), requiredStepIdPrefix: idPrefix || undefined,
      currentStepCount: course.steps.length, nextIndex: course.steps.length + 1,
      // Every id in the course used to be sent here, which grew with the
      // course itself: at 310 steps it was about 12,000 characters, and
      // together with a batch brief it pushed the context past the 30,000
      // budget before the model was contacted at all. Every attempt on
      // cooperative-daily-record batch 2 died that way on 2026-09-17, and it
      // would only have worsened on the way to 750. The list was never what
      // enforced uniqueness anyway - the validator below rejects a duplicate
      // or reused id regardless of what the model was shown - so a recent
      // window is enough to convey the naming pattern, and it stays bounded.
      existingStepIds: isNew ? undefined : course.steps.slice(-40).map(step => step.id),
      recentOutline: isNew ? course.steps.slice(-12).map(({ id }) => id) : course.steps.slice(-12).map(({ id, task }) => ({ id, task })),
      lastStep: isNew ? null : last, seed, registeredConcepts: registered, exemplar,
      allowedAssertions: testSchema.oneOf.map(spec => ({ required: spec.required, fields: spec.properties })),
      constraint: "One requested project, exactly the requested number of useful cumulative steps. Do not copy previous project ids, tasks, or subject matter. Every solution is the COMPLETE query file, retaining all previous statements needed for the project; not just the changed statement. Use only the exact allowed assertion fields; table is legal only for sql-table-exists and sql-table-columns. resultIndex is a 0-based index over ONLY the statements that returned rows; a solution containing one SELECT has a single result at index 0, so omit resultIndex there, and never name an index past the last row-returning statement. A CREATE TABLE or ALTER TABLE returns no rows, and a SELECT over an empty table returns no result set either, so a step whose solution only creates or reshapes a table must be asserted with sql-table-columns listing that table's columns in declaration order; sql-columns-equal and every row assertion are unsatisfiable there. Expected cell values carry the column's own type: an INTEGER column compares as the JSON number 8, never a quoted numeral, and a quoted number always fails. A goal that only changes row order must be asserted with an order-sensitive sql-rows-equal listing every row in its new order; never set ignoreOrder on a sorting step, because the same rows in any order already pass on the starting code and the gate then rejects the step as teaching nothing. For a scalar COUNT, SUM, or AVG answer use sql-value-equals at row 0 column 0; sql-row-count measures output rows and is normally 1 for a scalar aggregate. Returning no batch is correct only when no ownerBatchBrief was supplied and the project is finished or needs a new concept. When ownerBatchBrief is present it names exactly five goals that are not yet authored, so author exactly five steps for them; an empty batch is always wrong there and simply stops the campaign. When ownerBatchBrief is present, follow its supplied facts and step goals exactly; do not replace them with a different project. Reproduce each supplied solution string character for character, including every statement carried over from earlier steps and their order. Do not add, drop, reorder, or reword a statement. A step is rejected when its solution differs from the starting code by more than three lines, and the supplied strings already satisfy that rule, so any rewriting of your own is what breaks it. Write every solution on as few lines as the supplied string uses: a document-store command is one line, never pretty-printed across several, because the same three-line rule counts its lines too.",
    };
    const priorReceipt = receiptPath.replace(/-attempt-2\.json$/, "-attempt-1.json");
    if (priorReceipt !== receiptPath) context.retryFeedback = [".log", ".gates.log"].filter(suffix => fs.existsSync(priorReceipt + suffix)).map(suffix => fs.readFileSync(priorReceipt + suffix, "utf8").slice(-1800)).join("\n");
    // Keep the bounded owner brief last, close to where generation begins.
    if (ownerBatchBrief) context.ownerBatchBrief = ownerBatchBrief;
    const prompt = fs.readFileSync(promptPath, "utf8");
    let user = JSON.stringify(context);
    // The budget is a real limit and stays. But a retry adds up to 3,600
    // characters of the previous rejection to a context that already carries a
    // brief, and aborting on that meant attempts 2, 3 and 4 never reached the
    // model at all - the batch failed once on its own merits and three more
    // times on arithmetic. The rejection is the most compressible thing here
    // and its tail carries the message, so shorten it until it fits.
    for (const size of [1200, 600, 300, 0]) {
      if (prompt.length + user.length <= 30000 || !context.retryFeedback) break;
      context.retryFeedback = size ? context.retryFeedback.slice(-size) : undefined;
      user = JSON.stringify(context);
    }
    if (prompt.length + user.length > 30000) throw Error("Compact context exceeds 30,000 characters; stop before requesting more tokens.");
    const string = { type: "string" };
    const stepSchema = { type: "object", additionalProperties: false, required: ["id", "task", "solution", "tests", "hints", "estimatedMinutes"], properties: {
      id: { type: "string", pattern: `^${idPrefix}[a-z0-9]+(?:-[a-z0-9]+)*$`, maxLength: 100 }, task: string, solution: string, tests: { type: "array", minItems: 1, maxItems: 2, items: testSchema },
      // The validator below rejects any concept id the repo does not define, and
      // rightly so: a new concept needs the four authored representations, which
      // is owner work. The model does not learn that from the error. It tagged a
      // step "sql-and", a concept that has never existed here, on four attempts
      // in a row, two of them at a loosened temperature, with the rejection text
      // fed back each time. Naming the registered ids in the grammar removes the
      // option instead of arguing about it. The list is the same one the
      // validator checks, so the two cannot drift apart.
      hints: { type: "array", minItems: 2, maxItems: 2, items: string }, conceptIds: { type: "array", maxItems: 1, items: { type: "string", enum: registered.map(item => item.id) } }, estimatedMinutes: { type: "integer", minimum: 1, maximum: 10 },
    } };
    // Without a brief, an empty list stays expressible so the model can stop
    // instead of padding a finished project.
    // With a brief it may not. Asking in prose did not work: an 8B model reads
    // five named goals and still answers {"steps": []}, which the driver can
    // only reject, so the campaign spent six hours re-asking the same question.
    // The floor in the grammar makes an empty array unrepresentable instead.
    const schema = { type: "object", additionalProperties: false, required: isNew ? ["steps", "projectTitle", "seed"] : ["steps"], properties: { steps: { type: "array", minItems: ownerBatchBrief ? count : 0, maxItems: count, items: stepSchema }, ...(isNew ? { projectTitle: string, seed: isSql ? string : { type: "object" } } : {}) } };
    // Streamed, and not for the tokens. A non-streamed reply sends no headers
    // until generation finishes, and undici gives up waiting for headers after
    // five minutes - a limit AbortSignal.timeout cannot raise and this Node
    // exposes no way to configure. A slow model then fails every attempt with
    // HeadersTimeoutError. Streaming makes the headers arrive at once.
    // A retry at the same temperature reproduces the same rejected batch, which
    // is how two batches burned four hours of attempts. Loosen it on the retry.
    const retrying = /-attempt-[2-9]\.json$/.test(receiptPath);
    const body = { model, messages: [{ role: "system", content: prompt }, { role: "user", content: user }], temperature: retrying ? 0.5 : 0.2, max_tokens: 6500, stream: true, stream_options: { include_usage: true }, response_format: { type: "json_schema", json_schema: { name: "curriculum_batch", strict: true, schema } } };
    const response = await fetch(`${endpoint.replace(/\/$/, "")}/v1/chat/completions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: AbortSignal.timeout(1800000) });
    if (!response.ok) throw Error(`LM Studio returned HTTP ${response.status}: ${(await response.text()).slice(0, 500)}`);
    let raw = "";
    let finishReason = null;
    let usage = null;
    let pending = "";
    const decoder = new TextDecoder();
    for await (const chunk of response.body) {
      pending += decoder.decode(chunk, { stream: true });
      const lines = pending.split(String.fromCharCode(10));
      pending = lines.pop() ?? "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (payload === "[DONE]") continue;
        let parsed;
        try { parsed = JSON.parse(payload); } catch { throw Error("LM Studio sent a stream chunk that is not JSON."); }
        if (parsed.usage) usage = parsed.usage;
        const choice = parsed.choices?.[0];
        if (!choice) continue;
        if (typeof choice.delta?.content === "string") raw += choice.delta.content;
        if (choice.finish_reason) finishReason = choice.finish_reason;
        if (raw.length > 200000) throw Error("Missing or oversized model result.");
      }
    }
    if (!raw) throw Error("Missing or oversized model result.");
    fs.writeFileSync(receiptPath + ".model.txt", raw);
    if (finishReason === "length") throw Error("Model output was truncated; no changes applied.");
    const candidate = raw.trim().replace(/\nNEXT:[^\n]*\s*$/, "");
    let data;
    try { data = JSON.parse(candidate); } catch { throw Error("Expected one JSON batch, optionally followed by NEXT. No batch applied."); }
    let nodes = 0;
    function plain(value, depth = 0) {
      if (++nodes > 30000 || depth > 12) throw Error("JSON exceeds size/depth limits.");
      if (value === null || typeof value === "boolean" || (typeof value === "number" && Number.isFinite(value))) return;
      if (typeof value === "string") { if (value.length > 30000) throw Error("JSON string too long."); return; }
      if (Array.isArray(value)) { for (const item of value) plain(item, depth + 1); return; }
      if (!value || typeof value !== "object") throw Error("Use JSON values only.");
      for (const [key, item] of Object.entries(value)) { if (["__proto__", "constructor", "prototype"].includes(key)) throw Error("Unsafe JSON key."); plain(item, depth + 1); }
    }
    plain(data);
    const object = value => value !== null && typeof value === "object" && !Array.isArray(value);
    const only = (value, keys) => { if (!object(value) || Object.keys(value).some(key => !keys.includes(key))) throw Error("Unknown data fields."); };
    const text = (value, max = 5000) => typeof value === "string" && value.trim().length > 0 && value.length <= max;
    const integer = value => Number.isInteger(value) && value >= 0;
    only(data, isNew ? ["steps", "projectTitle", "seed"] : ["steps"]);
    if (Array.isArray(data.steps) && data.steps.length === 0) {
      console.error("No batch returned. Stop: the project may be complete or need a new registered concept. No retry or source change.");
      process.exit(3);
    }
    if (!Array.isArray(data.steps) || data.steps.length !== count) throw Error(`A pass needs exactly ${count} steps; empty or padded batches are not accepted.`);
    const projectSeed = isNew ? data.seed : seed;
    if (isNew && !text(data.projectTitle, 150)) throw Error("A new project needs a short title.");
    if (isSql ? typeof projectSeed !== "string" : !object(projectSeed) || Object.values(projectSeed).some(rows => !Array.isArray(rows) || !rows.every(object))) throw Error("Invalid project seed.");
    const fields = Object.fromEntries(Object.entries(assertionSpecs).map(([kind, properties]) => [kind, Object.keys(properties)]));
    const ids = new Set(course.steps.map(step => step.id));
    const file = isSql ? "query.sql" : "query.json";
    let start = isNew ? "" : last.solution?.[file];
    if (typeof start !== "string") throw Error("The previous step needs a reference solution.");
    // The brief already dictates every solution string character for character,
    // and the cumulative chain it supplies passes the granularity gate on its
    // own. An 8B model will not reliably copy it: it keeps emitting only the
    // changed statements and dropping the ones carried over from earlier steps,
    // which then reads as a five-line rewrite and is rejected every attempt.
    // Prose cannot fix that, so the supplied strings are applied here instead
    // of being asked for. The model still authors the task, the checks, the
    // hints, and the estimate. Anything unexpected about the brief leaves the
    // previous behaviour in place.
    const suppliedSolutions = (() => {
      if (!ownerBatchBrief) return null;
      const marker = "Copy these five complete solution strings unchanged and in order: ";
      const at = ownerBatchBrief.indexOf(marker);
      if (at < 0) return null;
      const rest = ownerBatchBrief.slice(at + marker.length);
      const end = rest.indexOf("]. Required result facts");
      if (end < 0) return null;
      try {
        const parsed = JSON.parse(rest.slice(0, end + 1));
        if (!Array.isArray(parsed) || parsed.length !== count) return null;
        return parsed.every(entry => typeof entry === "string" && entry.trim()) ? parsed : null;
      } catch { return null; }
    })();
    const generated = data.steps.map((draft, i) => {
      only(draft, ["id", "task", "solution", "tests", "hints", "conceptIds", "estimatedMinutes"]);
      if (suppliedSolutions) draft.solution = suppliedSolutions[i];
      // A document-store command is one line in every authored step, but the
      // model keeps pretty-printing it across nine or twelve, which the shape
      // check reads as twelve ideas in one step and rejects. Collapsing the
      // whitespace changes the formatting and nothing else: same command, same
      // documents, same assertions. Only a solution that is already valid JSON
      // is touched, so an unparseable one still fails the way it should.
      if (!isSql && typeof draft.solution === "string" && draft.solution.includes("\n")) {
        try { draft.solution = JSON.stringify(JSON.parse(draft.solution), null, 1).replace(/\n\s*/g, " "); } catch { /* leave it to fail the checks below */ }
      }
      if (!text(draft.id, 100) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.id) || ids.has(draft.id)) throw Error("Step ids must be new and unique.");
      if (!draft.id.startsWith(idPrefix)) throw Error(`Step ids must start with ${idPrefix}. Do not copy exemplar ids.`);
      ids.add(draft.id);
      if (!text(draft.task) || !text(draft.solution, 20000) || draft.solution === start || !Number.isInteger(draft.estimatedMinutes) || draft.estimatedMinutes < 1 || draft.estimatedMinutes > 10) throw Error("Invalid instruction, solution, or estimate.");
      if (!Array.isArray(draft.hints) || draft.hints.length !== 2 || !draft.hints.every(hint => text(hint, 2000))) throw Error("Two nonempty hints are required.");
      if (draft.conceptIds !== undefined && (!Array.isArray(draft.conceptIds) || draft.conceptIds.length > 1 || draft.conceptIds.some(id => typeof id !== "string" || !Object.hasOwn(concepts, id)))) throw Error("Use at most one existing registered concept; new concepts require owner authoring.");
      if (!Array.isArray(draft.tests) || draft.tests.length < 1 || draft.tests.length > 2) throw Error("Use one or two behavioral checks.");
      const scalarAggregate = isSql && /\bSELECT\s+(?:COUNT|SUM|AVG)\s*\(/i.test(draft.solution) && !/\bGROUP\s+BY\b/i.test(draft.solution);
      if (scalarAggregate) {
        draft.tests = draft.tests.map((test) => {
          if (test?.kind !== "sql-row-count" || test.count === 1) return test;
          const { count: value, ...rest } = test;
          return { ...rest, kind: "sql-value-equals", row: 0, column: 0, value };
        });
      }
      const aliasMatch = scalarAggregate ? draft.solution.match(/\s+AS\s+([A-Za-z_][A-Za-z0-9_]*)\s+FROM\b/i) : null;
      const withoutAlias = aliasMatch ? draft.solution.replace(/\s+AS\s+[A-Za-z_][A-Za-z0-9_]*(?=\s+FROM\b)/i, "") : "";
      const compactSql = (value) => value.replace(/\s+/g, " ").trim().toLowerCase();
      if (aliasMatch && compactSql(withoutAlias) === compactSql(start) && !draft.tests.some((test) => test?.kind === "sql-columns-equal")) {
        draft.tests = draft.tests.filter((test) => test?.kind !== "sql-row-count").slice(0, 1);
        const usedIds = new Set(draft.tests.map((test) => test?.id));
        const id = usedIds.has("alias-heading") ? "result-heading" : "alias-heading";
        draft.tests.push({ id, label: `The result column is named ${aliasMatch[1]}`, kind: "sql-columns-equal", columns: [aliasMatch[1]] });
      }
      const testIds = new Set();
      for (const test of draft.tests) {
        if (!object(test) || typeof test.kind !== "string" || !test.kind.startsWith(isSql ? "sql-" : "nosql-") || !Object.hasOwn(fields, test.kind)) throw Error("Unsupported assertion family.");
        only(test, ["id", "label", "kind", ...fields[test.kind]]);
        if (!text(test.id, 100) || testIds.has(test.id) || !text(test.label, 500)) throw Error("Invalid test label or duplicate id.");
        testIds.add(test.id);
        for (const key of ["count", "column", "resultIndex"]) if (test[key] !== undefined && !integer(test[key])) throw Error("Invalid assertion index/count.");
        if (test.ignoreOrder !== undefined && typeof test.ignoreOrder !== "boolean") throw Error("ignoreOrder must be boolean.");
        if (test.kind === "sql-row-count" || test.kind === "nosql-doc-count") { if (!integer(test.count)) throw Error("Missing count."); }
        if (test.kind === "sql-rows-equal" && (!Array.isArray(test.rows) || !test.rows.every(Array.isArray))) throw Error("rows must be row arrays.");
        if (test.kind === "sql-row-contains" && !Array.isArray(test.row)) throw Error("row must be an array.");
        if (test.kind === "sql-columns-equal" && (!Array.isArray(test.columns) || !test.columns.every(column => text(column, 100)))) throw Error("Invalid column list.");
        if (test.kind === "sql-value-equals" && (!integer(test.row) || !integer(test.column) || !Object.hasOwn(test, "value"))) throw Error("Invalid cell assertion.");
        if (test.kind === "sql-table-exists" && !text(test.table, 100)) throw Error("Missing table.");
        if (test.kind === "sql-table-columns" && (!text(test.table, 100) || !Array.isArray(test.columns) || !test.columns.every(column => text(column, 100)))) throw Error("Invalid table column list.");
        if (test.kind === "nosql-docs-equal" && (!Array.isArray(test.documents) || !test.documents.every(object))) throw Error("documents must be objects.");
        if (test.kind === "nosql-doc-contains" && !object(test.document)) throw Error("document must be an object.");
        if (test.kind === "nosql-field-equals" && (!integer(test.document) || !text(test.field, 100) || !Object.hasOwn(test, "value"))) throw Error("Invalid field assertion.");
        if (test.kind === "nosql-collection-exists" && !text(test.collection, 100)) throw Error("Missing collection.");
      }
      const step = { id: draft.id, index: course.steps.length + i + 1, task: draft.task, kind: isSql ? "sql" : "nosql", inputMode: "free", files: { [file]: start }, activeFile: file,
        [isSql ? "sqlSeed" : "nosqlSeed"]: projectSeed, tests: draft.tests, hints: draft.hints.map((hint, index) => ({ level: index + 1, text: hint })), xp: 10,
        solution: { [file]: draft.solution }, estimatedMinutes: draft.estimatedMinutes, projectId, ...(draft.conceptIds ? { conceptIds: draft.conceptIds } : {}) };
      start = draft.solution;
      return step;
    });
    // The model can reproduce a supplied solution, but it cannot predict what
    // that solution returns. SQL row order after an update or a delete is not
    // derivable from the brief's facts, and neither is the document set a
    // store query comes back with. Four rounds of prose instruction did not
    // move it, and on 2026-09-17 it stalled both courses at once: every batch
    // on both tracks failed with solution-fails, four attempts each, for two
    // hours. Owner decision, same day: derive the expected values by running
    // the solution instead of asking the model to guess them.
    //
    // The model still chooses which assertion each step makes and what it is
    // called. Only the values compared against come from the run, and the
    // model's own value is kept wherever it is actually present, so a wrong
    // row index is corrected without silently changing what the step asserts.
    // A step that asserts nothing new is still caught by the content gate's
    // teaches-nothing check, which runs the tests against the starting code
    // and is untouched here.
    const canonical = (value) => JSON.stringify(value, (_, inner) => inner && typeof inner === "object" && !Array.isArray(inner)
      ? Object.fromEntries(Object.keys(inner).sort().map(key => [key, inner[key]])) : inner);
    const same = (left, right) => canonical(left) === canonical(right);
    const deriveSql = (test, run) => {
      if (test.kind === "sql-runs") return test;
      if (test.kind === "sql-table-exists") return run.tables.includes(test.table) || !run.tables.length ? test : { ...test, table: run.tables[0] };
      if (test.kind === "sql-table-columns") { const columns = run.schema[test.table]; return columns?.length ? { ...test, columns } : test; }
      const result = run.results[test.resultIndex ?? 0];
      if (!result) return test;
      const { rows, columns } = result;
      if (test.kind === "sql-row-count") return { ...test, count: rows.length };
      if (test.kind === "sql-columns-equal") return columns?.length ? { ...test, columns } : test;
      if (test.kind === "sql-rows-equal") return { ...test, rows };
      if (test.kind === "sql-row-contains") return rows.some(row => same(row, test.row)) || !rows.length ? test : { ...test, row: rows[0] };
      if (test.kind === "sql-value-equals") {
        const column = Number.isInteger(test.column) && test.column < (columns?.length ?? 0) ? test.column : 0;
        // Prefer the row that actually carries the value the brief supplied:
        // the value is right and the index is what the model gets wrong.
        const found = rows.findIndex(row => same(row[column], test.value));
        const row = found >= 0 ? found : (Number.isInteger(test.row) && rows[test.row] ? test.row : 0);
        return rows[row] === undefined ? test : { ...test, row, column, value: rows[row][column] };
      }
      return test;
    };
    const deriveNosql = (test, run) => {
      if (test.kind === "nosql-runs") return test;
      if (test.kind === "nosql-collection-exists") return run.collections.includes(test.collection) || !run.collections.length ? test : { ...test, collection: run.collections[0] };
      if (test.kind === "nosql-doc-count") return { ...test, count: run.documents.length };
      if (test.kind === "nosql-docs-equal") return { ...test, documents: run.documents };
      if (test.kind === "nosql-doc-contains") return run.documents.some(doc => same(doc, test.document)) || !run.documents.length ? test : { ...test, document: run.documents[0] };
      if (test.kind === "nosql-field-equals") {
        const found = run.documents.findIndex(doc => doc && Object.hasOwn(doc, test.field) && same(doc[test.field], test.value));
        const index = found >= 0 ? found : (Number.isInteger(test.document) && run.documents[test.document] ? test.document : 0);
        const doc = run.documents[index];
        return doc && Object.hasOwn(doc, test.field) ? { ...test, document: index, value: doc[test.field] } : test;
      }
      return test;
    };
    let sqlEngine = null;
    if (isSql) {
      // Only the vendored engine is executed as code. The queries stay data.
      const engineModule = { exports: {} };
      const glue = fs.readFileSync(resolve("apps/web/public/sql/sql-wasm.txt"), "utf8");
      new Function("module", "exports", "require", "__dirname", glue)(engineModule, engineModule.exports, createRequire(pathToFileURL(resolve("apps/web/tools/check-content.mjs"))), ".");
      sqlEngine = await engineModule.exports({ wasmBinary: fs.readFileSync(resolve("apps/web/public/sql/sql-wasm.wasm")) });
    }
    const { executeNosql } = isSql ? {} : await import(pathToFileURL(resolve("apps/web/lib/nosql-store.ts")));
    const runSolution = (step) => {
      if (!isSql) return executeNosql(step.nosqlSeed ?? {}, step.solution[file] ?? "");
      const db = new sqlEngine.Database();
      const run = { ok: true, results: [], tables: [], schema: {} };
      try {
        try { db.run(step.sqlSeed ?? ""); } catch (error) { return { ...run, ok: false, seedError: String(error) }; }
        try {
          run.results = db.exec(step.solution[file] ?? "").map(({ columns, values }) => ({
            columns, rows: values.map(row => row.map(value => value instanceof Uint8Array ? Array.from(value) : value)),
          }));
        } catch (error) { run.ok = false; run.error = String(error); }
        run.tables = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")[0]?.values.map(row => String(row[0])) ?? [];
        for (const table of run.tables) run.schema[table] = db.exec("SELECT name FROM pragma_table_info(?)", [table])[0]?.values.map(row => String(row[0])) ?? [];
        return run;
      } finally { db.close(); }
    };
    for (const step of generated) {
      const run = runSolution(step);
      // A solution that does not execute is a real failure. Leave its tests
      // alone so the gates reject the batch rather than paper over it.
      if (!run.ok || run.error || run.seedError) continue;
      step.tests = step.tests.map(test => isSql ? deriveSql(test, run) : deriveNosql(test, run));
    }
    const { checkShape } = await import(pathToFileURL(resolve("apps/web/lib/content-shape.ts")));
    for (const step of generated) { const findings = checkShape(step); if (findings.length) throw Error(`${step.id}: ${findings.map(finding => finding.message).join("; ")}`); }
    const symbol = isSql ? "sqlCourse" : "nosqlCourse";
    // JSON serialization is the only route from model data into TypeScript.
    // No model-authored JavaScript, template fragments, or arbitrary file paths.
    const addition = `\n// Validated local authoring batch: ${projectId}.\n` + (isNew ? `${symbol}.projects.push(${JSON.stringify({ id: projectId, title: data.projectTitle })});\n` : "") + `${symbol}.steps.push(...(${JSON.stringify(generated, null, 2)} satisfies typeof ${symbol}.steps));\n`;
    const current = fs.readFileSync(resolve(relative), "utf8");
    fs.writeFileSync(resolve(relative), current + addition);
    const date = new Date().toISOString().slice(0, 10);
    fs.appendFileSync(resolve(allowed[1]), `\n- ${date}: Local Qwen authored ${courseId}/${projectId}, steps ${generated[0].index}-${generated.at(-1).index}; accepted only after tsc, zero-warning eslint, and check:content; browser harness remains a delivery check.\n`);
    console.log(`NEXT: ${courseId}, ${projectId}, steps ${generated.at(-1).index + 1}-${generated.at(-1).index + count}; stop if this project is complete.`);
    console.log(JSON.stringify({ added: generated.length, selected: course.steps.length + generated.length, usage: usage ?? null }));
  } else throw Error("Unknown adapter mode.");
}
'@

function Invoke-Adapter([string]$Mode, [string]$Receipt) {
  $oldPreference = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  try {
    $output = $adapter | & node --no-warnings --input-type=module - $Mode $repo $CourseId $projectArgument $BatchSize $LmsUrl $Model $promptFile $Receipt $briefArgument 2>&1
    $code = $LASTEXITCODE
    foreach ($line in $output) { Write-Host $line }
    if ($Receipt) { $output | Out-File -LiteralPath ($Receipt + ".log") -Append -Encoding utf8 }
    return $code
  } finally { $ErrorActionPreference = $oldPreference }
}

function Get-StepCount {
  $result = $adapter | & node --no-warnings --input-type=module - count $repo $CourseId $projectArgument $BatchSize $LmsUrl $Model $promptFile "unused" $briefArgument
  if ($LASTEXITCODE -ne 0) { throw "Could not read runtime course counts." }
  return ($result | ConvertFrom-Json)
}

function Test-StaticGates([string]$Log) {
  Push-Location $webDir
  $oldPreference = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  try {
    foreach ($gate in @("tsc", "eslint", "content")) {
      if ($gate -eq "tsc") { $output = & ".\node_modules\.bin\tsc.cmd" --noEmit 2>&1 }
      elseif ($gate -eq "eslint") { $output = & ".\node_modules\.bin\eslint.cmd" . --max-warnings 0 2>&1 }
      else { $output = & npm.cmd run check:content 2>&1 }
      $code = $LASTEXITCODE
      $output | Out-File -LiteralPath $Log -Append -Encoding utf8
      if ($code -ne 0) { Write-Host "GATE FAILED: $gate. See $Log" -ForegroundColor Red; return $false }
      Write-Host "GATE PASSED: $gate"
    }
    return $true
  } finally { $ErrorActionPreference = $oldPreference; Pop-Location }
}

function Confirm-HumanIdentity {
  $name = (& git -c "safe.directory=$repo" config user.name)
  $email = (& git -c "safe.directory=$repo" config user.email)
  if (-not $name -or -not $email -or $name -match '(?i)codex|openai|claude|anthropic|assistant|\bbot\b' -or $email -match '(?i)codex|openai|claude|anthropic|\[bot\]|bot@') { throw "A verified human Git identity is required." }
  $lastName = & git -c "safe.directory=$repo" log -1 --format=%an
  $lastEmail = & git -c "safe.directory=$repo" log -1 --format=%ae
  if ($name -ne $lastName -or $email -ne $lastEmail) { throw "Configured identity differs from the latest verified author. Confirm the human identity before using this driver." }
  foreach ($pair in @(@("GIT_AUTHOR_NAME", $name), @("GIT_COMMITTER_NAME", $name), @("GIT_AUTHOR_EMAIL", $email), @("GIT_COMMITTER_EMAIL", $email))) {
    $override = [Environment]::GetEnvironmentVariable($pair[0])
    if ($override -and $override -ne $pair[1]) { throw "Git identity environment override does not match the configured human." }
  }
}

function Commit-Checkpoint([int]$Steps, [string]$Label) {
  Confirm-HumanIdentity
  & git -c "safe.directory=$repo" check-ignore --quiet -- .claude/probe
  if ($LASTEXITCODE -ne 0) { throw ".claude must be ignored before a checkpoint." }
  $trackedClaude = & git -c "safe.directory=$repo" ls-files -- '.claude/*' ':(glob)**/.claude/**'
  if ($trackedClaude) { throw "Tracked .claude files block a checkpoint." }
  $staged = & git -c "safe.directory=$repo" diff --cached --name-only
  if ($staged) { throw "An unexpected staged change blocks the checkpoint." }
  & git -c "safe.directory=$repo" add -- $allowed
  if ($LASTEXITCODE -ne 0) { throw "Could not stage the two allowed files." }
  $staged = @(& git -c "safe.directory=$repo" diff --cached --name-only)
  if ($staged.Count -ne 2 -or @($staged | Where-Object { $allowed -notcontains $_ }).Count -gt 0) {
    & git -c "safe.directory=$repo" reset --quiet HEAD -- $allowed
    throw "Checkpoint staging did not match the two allowed files."
  }
  & git -c "safe.directory=$repo" diff --cached --check
  if ($LASTEXITCODE -ne 0) { & git -c "safe.directory=$repo" reset --quiet HEAD -- $allowed; throw "Checkpoint whitespace check failed." }
  & git -c "safe.directory=$repo" commit -m "Extend $CourseId curriculum to $Steps steps ($Label)"
  if ($LASTEXITCODE -ne 0) { & git -c "safe.directory=$repo" reset --quiet HEAD -- $allowed; throw "Checkpoint commit failed; validated files remain uncommitted." }
  Write-Host "Committed validated checkpoint; no push performed." -ForegroundColor DarkGreen
}

# Preflight refuses dirty state rather than guessing which edits belong to whom.
Push-Location $repo
$pending = 0
$pendingSnapshot = $null
$failed = $false
$activeSnapshot = $null
try {
  if (-not (Test-Path -LiteralPath $promptFile)) { throw "Missing QWEN_V2_AUTHORING_PROMPT.md." }
  if (Test-Path -LiteralPath $stopFile) { Write-Host "STOP_LOOP already exists. No pass started."; exit 0 }
  $url = [uri]$LmsUrl
  if ($url.Scheme -ne "http" -or $url.Host -notin @("localhost", "127.0.0.1", "[::1]", "::1") -or $url.UserInfo -or $url.Query -or $url.AbsolutePath -ne "/") { throw "LM Studio must be a local HTTP origin, without credentials or a path." }
  foreach ($command in @("node", "git", "npm.cmd")) { if (-not (Get-Command $command -ErrorAction SilentlyContinue)) { throw "Missing $command. Install dependencies outside this driver." } }
  $nodeMajor = (& node -p "process.versions.node.split('.')[0]")
  if ([int]$nodeMajor -lt 24) { throw "Node 24 or newer is required for the existing content loader." }
  foreach ($tool in @("node_modules\.bin\tsc.cmd", "node_modules\.bin\eslint.cmd")) { if (-not (Test-Path -LiteralPath (Join-Path $webDir $tool))) { throw "Missing installed checker $tool. No installation will be attempted." } }
  $dirty = & git -c "safe.directory=$repo" status --porcelain --untracked-files=all
  if ($LASTEXITCODE -ne 0 -or $dirty) { throw "Working tree must be clean, including untracked source files. Preserve your current work before running the driver." }
  Confirm-HumanIdentity
  $models = Invoke-RestMethod -Uri ($LmsUrl.TrimEnd('/') + "/v1/models") -TimeoutSec 10
  if (@($models.data | ForEach-Object { $_.id }) -notcontains $Model) { throw "The requested model is not loaded in LM Studio: $Model" }
  New-Item -ItemType Directory -Path $logDir | Out-Null
  $start = Get-StepCount
  Write-Host "Qwen V2: $CourseId, $($start.selected) steps; at most $MaxIterations passes of $BatchSize. Logs: $logDir" -ForegroundColor Cyan
  if (-not (Test-StaticGates (Join-Path $logDir "preflight.log"))) { throw "Baseline gates must pass before contacting the model." }
  for ($iteration = 1; $iteration -le $MaxIterations; $iteration++) {
    if (Test-Path -LiteralPath $stopFile) { break }
    $accepted = $false
    $attemptStarted = $false
    # At most one retry. Each failed attempt rolls back before retry or exit.
    for ($attempt = 1; $attempt -le 2; $attempt++) {
      if (Test-Path -LiteralPath $stopFile) { break }
      $attemptStarted = $true
      $receipt = Join-Path $logDir ("pass-{0:d3}-attempt-{1}.json" -f $iteration, $attempt)
      if ((Invoke-Adapter "snapshot" $receipt) -ne 0) { throw "Could not snapshot the pass." }
      $activeSnapshot = $receipt
      $before = Get-StepCount
      $modelCode = Invoke-Adapter "author" $receipt
      $modelOk = $modelCode -eq 0
      $guardOk = (Invoke-Adapter "guard" $receipt) -eq 0
      $gatesOk = $false
      if ($modelOk -and $guardOk) { $gatesOk = Test-StaticGates ($receipt + ".gates.log") }
      $guardAfter = (Invoke-Adapter "guard" $receipt) -eq 0
      if ($modelOk -and $guardOk -and $gatesOk -and $guardAfter) {
        $after = Get-StepCount
        if ($after.selected -ne $before.selected + $BatchSize) { throw "Runtime count does not match the requested batch." }
        if ($pending -eq 0) { $pendingSnapshot = $receipt }
        $activeSnapshot = $null
        $accepted = $true
        $pending++
        Write-Host "Validated pass ${iteration}: $($after.selected) course steps, $($after.total) total." -ForegroundColor Green
        break
      }
      if ((Invoke-Adapter "restore" $receipt) -ne 0) { throw "Rollback failed. Stop and inspect $receipt." }
      $activeSnapshot = $null
      if (-not $guardOk -or -not $guardAfter) { throw "Guarded state changed; preserved external edits and stopped." }
      Write-Host "Attempt $attempt rejected and restored. See $receipt" -ForegroundColor Yellow
      if ($modelCode -eq 3) { break }
    }
    if (-not $accepted) {
      if (-not $attemptStarted -and (Test-Path -LiteralPath $stopFile)) { break }
      $failed = $true
      break
    }
    if ($pending -ge $CommitEvery) {
      Commit-Checkpoint (Get-StepCount).selected "local authoring pass $iteration"
      $pending = 0
      $pendingSnapshot = $null
    }
    if ((Test-Path -LiteralPath $stopFile) -or $iteration -eq $MaxIterations) { break }
    Start-Sleep -Seconds $PauseSeconds
  }
  # Pending files are only previously validated batches; rejected attempts have
  # already been restored, including when the final iteration failed.
  if ($pending -gt 0) {
    $activeSnapshot = $pendingSnapshot
    if (-not (Test-StaticGates (Join-Path $logDir "final.log"))) { throw "Final validation failed; do not commit." }
    if ((Invoke-Adapter "guard" $pendingSnapshot) -ne 0) { throw "Guard changed before final checkpoint." }
    $activeSnapshot = $null
    Commit-Checkpoint (Get-StepCount).selected "final local authoring checkpoint"
    $pending = 0
    $pendingSnapshot = $null
  }
} catch {
  $failed = $true
  if ($activeSnapshot) { [void](Invoke-Adapter "restore" $activeSnapshot); $activeSnapshot = $null }
  Write-Host $_.Exception.Message -ForegroundColor Red
} finally { Pop-Location }
Write-Host "Loop ended. Logs: $logDir"
if ($failed) { exit 1 }
exit 0
