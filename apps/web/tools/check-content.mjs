import "./content-loader.mjs";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";
import ts from "typescript";
const { curriculum } = await import("../content/curriculum.ts");
const { checkShape } = await import("../lib/content-shape.ts");
const { executeNosql } = await import("../lib/nosql-store.ts");
const { runNosqlTest } = await import("../lib/nosql-assertions.ts");
const { runSqlTest } = await import("../lib/sql-assertions.ts");

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
  const result = { ok: true, results: [], tables: [] };
  try {
    try { db.run(seed); } catch (error) { return { ...result, ok: false, seedError: String(error) }; }
    try {
      result.results = db.exec(sql).map(({ columns, values }) => ({
        columns, rows: values.map(row => row.map(value => value instanceof Uint8Array ? Array.from(value) : value)),
      }));
    } catch (error) { result.ok = false; result.error = String(error); }
    result.tables = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")[0]?.values.map(row => String(row[0])) ?? [];
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
        const actual = step.kind === "nosql" ? { documents: run.documents, collections: run.collections } : { results: run.results, tables: run.tables };
        errors.push(`${step.id}: solution-fails: ${failed.map(test => test.id).join(", ")}; expected ${JSON.stringify(failed).slice(0, 1200)}; received ${JSON.stringify(actual).slice(0, 1200)}`);
      }
    }
    parentPort?.postMessage({ progress: step.id });
  }
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
  let executed = 0;
  const selected = process.argv.find(arg => arg.startsWith("--course="))?.slice(9);
  const courses = curriculum.courses.filter(course => !selected || course.id === selected);
  if (!courses.length) errors.push(`Unknown course: ${selected}`);
  for (const course of courses) {
    for (const step of course.steps) {
      count++;
      const database = ["sql", "nosql"].includes(course.kind);
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
  for (const error of errors) console.error(`ERROR ${error}`);
  console.log(`Content gate: ${count} steps, ${executed} database steps executed, ${errors.length} errors, ${warnings} structural warnings. Non-database behaviour still requires /harness.`);
  process.exitCode = errors.length ? 1 : 0;
}
