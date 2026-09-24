import "./content-loader.mjs";
import { createRequire } from "node:module";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";
import ts from "typescript";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
const { curriculum } = await import("../content/curriculum.ts");
const { checkShape } = await import("../lib/content-shape.ts");
const { executeNosql } = await import("../lib/nosql-store.ts");
const { runNosqlTest } = await import("../lib/nosql-assertions.ts");
const { runSqlTest } = await import("../lib/sql-assertions.ts");
const localChecker = await import("./local-checker.mjs");
const { runCommand, tokenize, gateEnv } = await import("./local-commands.mjs");
const localReport = await import("../lib/local-report.ts");
const { lineDiffCount } = await import("../lib/content-shape.ts");

// Execute only the vendored engine as code. Queries remain SQL data.
async function sqlEngine() {
  const require = createRequire(import.meta.url);
  const engineModule = { exports: {} };
  const glue = readFileSync(new URL("../public/sql/sql-wasm.txt", import.meta.url), "utf8");
  new Function("module", "exports", "require", "__dirname", glue)(engineModule, engineModule.exports, require, ".");
  return engineModule.exports({ wasmBinary: readFileSync(new URL("../public/sql/sql-wasm.wasm", import.meta.url)) });
}

function executeSql(SQL, seed, sql) {
  const db = new SQL.Database();
  const result = { ok: true, results: [], tables: [], schema: {} };
  try {
    try { db.run(seed); } catch (error) { return { ...result, ok: false, seedError: String(error) }; }
    try {
      result.results = db.exec(sql).map(({ columns, values }) => ({
        columns, rows: values.map(row => row.map(value => value instanceof Uint8Array ? Array.from(value) : value)),
      }));
    } catch (error) { result.ok = false; result.error = String(error); }
    result.tables = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")[0]?.values.map(row => String(row[0])) ?? [];
    // Column order per table, so schema-shaping steps have evidence to assert on.
    for (const table of result.tables) {
      result.schema[table] = db.exec("SELECT name FROM pragma_table_info(?)", [table])[0]?.values.map(row => String(row[0])) ?? [];
    }
    return result;
  } finally { db.close(); }
}

function literalKinds() {
  const file = ts.createSourceFile("lesson-ir.ts", readFileSync(new URL("../lib/lesson-ir.ts", import.meta.url), "utf8"), ts.ScriptTarget.Latest, true);
  const union = file.statements.find(node => ts.isTypeAliasDeclaration(node) && node.name.text === "TestSpec");
  const kinds = new Set();
  function visit(node) {
    if (ts.isPropertySignature(node) && node.name.getText(file) === "kind" && ts.isLiteralTypeNode(node.type) && ts.isStringLiteral(node.type.literal)) kinds.add(node.type.literal.text);
    ts.forEachChild(node, visit);
  }
  visit(union);
  return kinds;
}

function sourceTest(test, files) {
  return new RegExp(test.pattern, test.flags).test(files[test.file] ?? "");
}

async function behaviour(steps) {
  const SQL = await sqlEngine();
  const errors = [];
  for (const step of steps) {
    for (const [phase, files] of [["start", step.files], ["solution", step.solution]]) {
      if (!files) continue;
      const run = step.kind === "nosql" ? executeNosql(step.nosqlSeed ?? {}, files["query.json"] ?? "") : executeSql(SQL, step.sqlSeed ?? "", files["query.sql"] ?? "");
      if (run.seedError) { errors.push(`${step.id}: seed-error: ${run.seedError}`); continue; }
      if (phase === "solution" && (!run.ok || run.error)) {
        errors.push(`${step.id}: solution-runtime-error: ${run.error ?? "Execution failed"}`);
        continue;
      }
      const results = step.tests.map(test => test.kind === "source-matches" ? sourceTest(test, files) : (step.kind === "nosql" ? test.kind.startsWith("nosql-") && runNosqlTest(test, run).status === "passed" : test.kind.startsWith("sql-") && runSqlTest(test, run).status === "passed"));
      if (phase === "start" && results.every(Boolean)) errors.push(`${step.id}: teaches-nothing: every test passes on start`);
      if (phase === "solution" && !results.every(Boolean)) {
        const failed = step.tests.filter((_, i) => !results[i]);
        const actual = step.kind === "nosql" ? { documents: run.documents, collections: run.collections } : { results: run.results, tables: run.tables, schema: run.schema };
        errors.push(`${step.id}: solution-fails: ${failed.map(test => test.id).join(", ")}; expected ${JSON.stringify(failed).slice(0, 1200)}; received ${JSON.stringify(actual).slice(0, 1200)}`);
      }
    }
    parentPort?.postMessage({ progress: step.id });
  }
  return errors;
}

// --- Local-computer steps (V2_RUNNER_DESIGN.md option B) ---

function localShape(step) {
  const errors = [];
  const safe = localChecker.safeRelative;
  if (JSON.stringify(step.files) !== JSON.stringify({ "report.txt": "" }) || step.activeFile !== "report.txt") errors.push("local steps start with an empty report.txt only");
  const commands = step.solution?.["commands.txt"];
  if (!step.solution || Object.keys(step.solution).join() !== "commands.txt" || typeof commands !== "string") errors.push("local solution must be { commands.txt }");
  else {
    const lines = commands.split("\n").filter(line => line.trim());
    const edits = step.localFiles && Object.keys(step.localFiles).length;
    if ((!edits && lines.length < 1) || lines.length > 3) errors.push("local solution needs 1-3 commands, or file edits with at most 3 commands");
    for (const line of lines) { try { tokenize(line.trim()); } catch (error) { errors.push(String(error.message)); } }
  }
  const seed = step.localSeed;
  if (!seed || typeof seed !== "object" || Array.isArray(seed)) errors.push("local steps need a localSeed object");
  else {
    let bytes = 0;
    for (const [file, text] of Object.entries(seed)) {
      if (!safe(file) || file.split("/")[0] === ".git") errors.push(`unsafe localSeed path ${file}`);
      if (typeof text !== "string") errors.push(`localSeed ${file} must be text`);
      else bytes += text.length;
    }
    if (bytes > 20000) errors.push("localSeed is larger than 20,000 characters");
  }
  if (step.sqlSeed !== undefined || step.nosqlSeed !== undefined || step.runtimeFixtures !== undefined) errors.push("local steps carry no browser runtime data");
  if (step.localFiles !== undefined) {
    if (!step.localFiles || typeof step.localFiles !== "object" || Array.isArray(step.localFiles)) errors.push("localFiles must be an object");
    else for (const [file, text] of Object.entries(step.localFiles)) {
      if (!safe(file) || file.split("/")[0] === ".git") errors.push(`unsafe localFiles path ${file}`);
      if (typeof text !== "string" || text.length > 20000) errors.push(`localFiles ${file} must be text under 20,000 characters`);
    }
  }
  for (const test of step.tests) {
    if (!test.kind.startsWith("local-")) errors.push(`local steps use local checks only, not ${test.kind}`);
    if ("path" in test && !safe(test.path)) errors.push(`unsafe check path ${test.path}`);
    if ("branch" in test && !localChecker.safeBranch(test.branch)) errors.push(`unsafe branch ${test.branch}`);
    if (test.kind === "local-git-branch" && !localChecker.safeBranch(test.value)) errors.push(`unsafe branch ${test.value}`);
    if (test.kind === "local-git-config" && !localChecker.safeConfigKey(test.key)) errors.push(`unsafe config key ${test.key}`);
    if (test.kind === "local-git-commit-count" && (!Number.isInteger(test.count) || test.count < 0)) errors.push("commit count must be a whole number");
    if (["local-file-contains", "local-file-lacks", "local-git-head-message", "local-git-config", "local-node-prints", "local-node-stderr"].includes(test.kind) && (typeof test.value !== "string" || !test.value.trim())) errors.push(`${test.kind} needs a value`);
    if (test.kind === "local-npm-script") {
      if (typeof test.script !== "string" || !/^[a-z][a-z0-9:-]{0,30}$/.test(test.script)) errors.push("npm checks run one named script");
      if (test.env !== undefined && (typeof test.env !== "object" || Object.entries(test.env).some(([key, value]) => !localChecker.safeEnvName(key) || typeof value !== "string"))) errors.push("npm check env must map UPPER_CASE names to strings");
    }
    if (test.kind === "local-react-render") {
      if (!safe(test.file) || !/\.(jsx|tsx|js)$/.test(test.file)) errors.push(`render checks read a .jsx, .tsx, or .js file inside the project, not ${test.file}`);
      if (test.contains === undefined && test.lacks === undefined) errors.push("render checks need contains or lacks");
      try { JSON.stringify(test.props ?? {}); } catch { errors.push("render props must be plain data"); }
      if (test.exportName !== undefined && !/^[A-Za-z_][A-Za-z0-9_]{0,40}$/.test(test.exportName)) errors.push("exportName must be a plain name");
    }
    if (test.kind === "local-http") {
      if (!safe(test.file) || !/\.m?js$/.test(test.file)) errors.push(`http checks start a .js or .mjs file inside the project, not ${test.file}`);
      if (!Array.isArray(test.requests) || test.requests.length < 1 || test.requests.length > 10) errors.push("http checks send 1 to 10 requests");
      else for (const request of test.requests) {
        if (!["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"].includes(request.method)) errors.push(`unsupported http method ${request.method}`);
        if (typeof request.path !== "string" || !request.path.startsWith("/") || request.path.startsWith("//") || request.path.length > 300) errors.push(`http path must start with one / : ${request.path}`);
        if (request.body !== undefined && (typeof request.body !== "string" || request.body.length > 5000)) errors.push("http body must be a string under 5,000 characters");
        if (request.headers !== undefined && (typeof request.headers !== "object" || Object.entries(request.headers).some(([name, value]) => !/^[A-Za-z0-9-]{1,40}$/.test(name) || typeof value !== "string" || value.length > 200))) errors.push("http headers must be short name/value strings");
        if (request.fromPrevious !== undefined && (!/^[A-Za-z0-9-]{1,40}$/.test(request.fromPrevious.header ?? "") || !/^[A-Za-z0-9_]{1,40}$/.test(request.fromPrevious.field ?? "") || (request.fromPrevious.prefix !== undefined && (typeof request.fromPrevious.prefix !== "string" || request.fromPrevious.prefix.length > 20)))) errors.push("fromPrevious needs a header name, a field name, and an optional short prefix");
      }
      if (test.status === undefined && test.bodyContains === undefined && test.bodyLacks === undefined && test.header === undefined) errors.push("http checks need a status, bodyContains, bodyLacks, or header expectation");
      if (test.cookies !== undefined && typeof test.cookies !== "boolean") errors.push("http cookies must be true or false");
      if (test.bodyLacks !== undefined && (typeof test.bodyLacks !== "string" || !test.bodyLacks)) errors.push("bodyLacks must be non-empty text");
      if (test.status !== undefined && (!Number.isInteger(test.status) || test.status < 100 || test.status > 599)) errors.push("http status must be 100-599");
      if (test.header !== undefined && (typeof test.header?.name !== "string" || typeof test.header?.value !== "string")) errors.push("http header expectation needs a name and value");
      if (test.env !== undefined && (typeof test.env !== "object" || Object.entries(test.env).some(([key, value]) => !localChecker.safeEnvName(key) || key === "PORT" || typeof value !== "string"))) errors.push("http check env must map UPPER_CASE names other than PORT to strings");
    }
    if (test.kind.startsWith("local-node-")) {
      if (!safe(test.file) || !/\.(m?js)$/.test(test.file)) errors.push(`node checks run a .js or .mjs file inside the project, not ${test.file}`);
      if (test.args !== undefined && (!Array.isArray(test.args) || test.args.length > 10 || test.args.some(arg => typeof arg !== "string" || arg.length > 200))) errors.push("node check args must be up to 10 short strings");
      if (test.env !== undefined && (typeof test.env !== "object" || Object.entries(test.env).some(([key, value]) => !localChecker.safeEnvName(key) || typeof value !== "string" || value.length > 200))) errors.push("node check env must map UPPER_CASE names to short strings");
      if (test.stdin !== undefined && (typeof test.stdin !== "string" || test.stdin.length > 2000)) errors.push("node check stdin must be a short string");
      if (test.kind === "local-node-exit-code" && (!Number.isInteger(test.code) || test.code < 0 || test.code > 255)) errors.push("exit code must be 0-255");
    }
  }
  return errors;
}

/** The checker and the page must agree on the report format, and a malformed or forged report must be refused. */
function localReportSelfTest(step, courseId) {
  const errors = [];
  if (localChecker.CHECKER_VERSION !== localReport.LOCAL_CHECKER_VERSION || localChecker.REPORT_START !== localReport.LOCAL_REPORT_START || localChecker.REPORT_END !== localReport.LOCAL_REPORT_END) errors.push("tools/local-checker.mjs and lib/local-report.ts disagree on the report format");
  const all = step.tests.map(test => ({ id: test.id, pass: true }));
  const good = localChecker.formatReport(courseId, step.id, all);
  if (!localReport.parseLocalReport(`noise\n${good}\nmore`, courseId, step).ok) errors.push("a well-formed checker report did not parse");
  const forged = [
    good.replace(`"step":"${step.id}"`, '"step":"some-other-step"'),
    good.replace(`"course":"${courseId}"`, '"course":"sql-basics"'),
    good.replace('"checks":', '"xp":50,"checks":'),
    good.replace('"v":1', '"v":2'),
    localChecker.formatReport(courseId, step.id, [...all, all[0]]),
    `${good}\n${good}`,
  ];
  for (const text of forged) if (localReport.parseLocalReport(text, courseId, step).ok) errors.push(`a malformed report was accepted: ${text.slice(0, 120)}`);
  return errors;
}

async function localBehaviour(entries) {
  const errors = [];
  // Two courses may reuse a project id (files-sari-sari), so a project is
  // always identified by its course as well.
  const projects = new Map();
  for (const { step, courseId } of entries) {
    const key = `${courseId}/${step.projectId}`;
    projects.set(key, [...(projects.get(key) ?? []), step]);
  }
  async function proveProject(projectSteps) {
    const scratch = mkdtempSync(join(tmpdir(), "codedaddy-local-gate-"));
    try {
      const home = join(scratch, "home");
      const root = join(scratch, "project");
      mkdirSync(home);
      mkdirSync(root);
      writeFileSync(join(home, "empty-gitconfig"), "");
      const env = gateEnv(home);
      const seed = projectSteps[0].localSeed ?? {};
      for (const [file, text] of Object.entries(seed)) {
        const full = join(root, ...file.split("/"));
        mkdirSync(dirname(full), { recursive: true });
        writeFileSync(full, text);
      }
      for (const step of projectSteps) {
        if (JSON.stringify(step.localSeed) !== JSON.stringify(seed)) { errors.push(`${step.id}: localSeed differs within project ${step.projectId}`); return; }
        const before = await localChecker.runChecks(root, step.tests, { env });
        if (before.every(result => result.pass)) errors.push(`${step.id}: teaches-nothing: every local check passes before the solution`);
        let changedLines = 0;
        for (const [file, text] of Object.entries(step.localFiles ?? {})) {
          const full = join(root, ...file.split("/"));
          let previous = "";
          try { previous = readFileSync(full, "utf8"); } catch { previous = ""; }
          changedLines += previous ? lineDiffCount(previous, text) : text.split("\n").filter(line => line.trim()).length;
          mkdirSync(dirname(full), { recursive: true });
          writeFileSync(full, text);
        }
        if (changedLines > 3) errors.push(`${step.id}: granularity: the file edits change ${changedLines} lines; one step changes at most 3`);
        for (const line of step.solution["commands.txt"].split("\n").filter(item => item.trim())) {
          try { await runCommand(root, line, env); } catch (error) { errors.push(`${step.id}: solution-command: ${error.message}`); return; }
        }
        const after = await localChecker.runChecks(root, step.tests, { env });
        const failed = after.filter(result => !result.pass);
        if (failed.length) { errors.push(`${step.id}: solution-fails: ${failed.map(result => `${result.id} (${result.reason})`).join(", ")}`); return; }
      }
    } finally {
      // Windows can hold a just-used folder open for a moment (a server that is
      // still exiting, or a virus scan). Leaving one temp folder behind must
      // never fail the gate.
      try { rmSync(scratch, { recursive: true, force: true, maxRetries: 25, retryDelay: 200 }); } catch { /* left in the temp folder */ }
    }
  }
  const queue = [...projects.values()];
  await Promise.all(Array.from({ length: Math.min(4, queue.length) }, async () => {
    while (queue.length) await proveProject(queue.shift());
  }));
  return errors;
}

if (!isMainThread) {
  parentPort.postMessage({ errors: await behaviour(workerData) });
} else {
  const kinds = literalKinds();
  const errors = [];
  let warnings = 0;
  let count = 0;
  const databaseSteps = [];
  const localSteps = [];
  let executed = 0;
  const selected = process.argv.find(arg => arg.startsWith("--course="))?.slice(9);
  const courses = curriculum.courses.filter(course => !selected || course.id === selected);
  if (!courses.length) errors.push(`Unknown course: ${selected}`);
  for (const course of courses) {
    for (const step of course.steps) {
      count++;
      const database = ["sql", "nosql"].includes(course.kind);
      if ((course.kind === "local") !== (step.kind === "local")) errors.push(`${step.id}: local step kind must match its course`);
      if (step.kind === "local") for (const message of localShape(step)) errors.push(`${course.id}/${step.id}: local: ${message}`);
      if (database && step.kind !== course.kind) errors.push(`${step.id}: database step kind must match its course`);
      if (database && !step.tests.some(test => test.kind.startsWith(`${course.kind}-`))) errors.push(`${step.id}: database steps need a result assertion, not source checks alone`);
      for (const finding of checkShape(step)) {
        if (finding.severity === "error" || (database && finding.rule === "granularity")) errors.push(`${course.id}/${step.id}: ${finding.rule}: ${finding.message}`);
        else warnings++;
      }
      if (!course.projects.some(project => project.id === step.projectId)) errors.push(`${step.id}: unknown project ${step.projectId}`);
      if (!Number.isFinite(step.estimatedMinutes) || step.estimatedMinutes <= 0) errors.push(`${step.id}: estimatedMinutes must be positive`);
      if (!step.solution) errors.push(`${step.id}: missing solution`);
      for (const test of step.tests) {
        if (!kinds.has(test.kind)) errors.push(`${step.id}: unknown TestSpec kind ${test.kind}`);
        if ((test.kind.startsWith("sql-") && step.kind !== "sql") || (test.kind.startsWith("nosql-") && step.kind !== "nosql")) errors.push(`${step.id}: database assertion and step kind disagree`);
        if (test.kind === "source-matches") {
          try { new RegExp(test.pattern, test.flags); } catch { errors.push(`${step.id}: invalid source-matches regex`); }
        }
      }
      if (step.kind === "sql" || step.kind === "nosql") databaseSteps.push(step);
      if (step.kind === "local") localSteps.push({ step, courseId: course.id });
    }
  }
  if (!errors.length && databaseSteps.length) {
    // A real worker can be terminated even while SQLite is stuck in a query.
    executed = databaseSteps.length;
    errors.push(...await new Promise((resolve) => {
      const worker = new Worker(new URL(import.meta.url), { workerData: databaseSteps });
      let timer;
      const arm = () => { clearTimeout(timer); timer = setTimeout(() => { void worker.terminate(); resolve(["Database gate timed out; inspect the last batch for a nonterminating query."]); }, 15000); };
      arm();
      worker.on("message", message => { if (message.errors) { clearTimeout(timer); resolve(message.errors); } else arm(); });
      worker.on("error", error => { clearTimeout(timer); resolve([String(error)]); });
      worker.on("exit", code => { clearTimeout(timer); if (code !== 0) resolve([`Database worker exited ${code}`]); });
    }));
  }
  let localExecuted = 0;
  if (!errors.length && localSteps.length) {
    localExecuted = localSteps.length;
    errors.push(...localReportSelfTest(localSteps[0].step, localSteps[0].courseId));
    errors.push(...await localBehaviour(localSteps));
  }
  for (const error of errors) console.error(`ERROR ${error}`);
  console.log(`Content gate: ${count} steps, ${executed} database steps executed, ${localExecuted} local steps replayed, ${errors.length} errors, ${warnings} structural warnings. Browser behaviour still requires /harness.`);
  process.exitCode = errors.length ? 1 : 0;
}
