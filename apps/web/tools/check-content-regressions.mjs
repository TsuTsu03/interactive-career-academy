import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Mutate only the child process's in-memory course object, never source files.
const loader = new URL("./content-loader.mjs", import.meta.url).href;
const curriculum = new URL("../content/curriculum.ts", import.meta.url).href;
const gate = fileURLToPath(new URL("./check-content.mjs", import.meta.url));
const cases = [
  ["source-only", 's.tests=[{id:"text",label:"Target appears",kind:"source-matches",file:"query.json",pattern:"target",because:"Use target"}];s.solution={"query.json":"invalid JSON target"};', "database steps need a result assertion"],
  ["granularity", 's.solution["query.json"] += "\\n \\n \\n \\n \\n ";', "granularity"],
  ["unknown-kind", 's.tests[0].kind="nosql-eval";', "unknown TestSpec kind"],
  ["bad-project", 's.projectId="missing";', "unknown project"],
  ["bad-regex", 's.tests.push({id:"regex",label:"Syntax",kind:"source-matches",file:"query.json",pattern:"[",because:"Check syntax"});', "invalid source-matches regex"],
  ["no-solution", 'delete s.solution;', "missing solution"],
  ["kind-mismatch", 's.kind="web";', "database step kind must match"],
  ["teaches-nothing", 's.files={...s.solution};', "teaches-nothing"],
  ["bad-seed", 's.nosqlSeed={products:[null]};', "seed-error"],
];
for (const [name, mutation, expected] of cases) {
  const preload = `import ${JSON.stringify(loader)};const {curriculum}=await import(${JSON.stringify(curriculum)});const s=curriculum.courses.find(c=>c.id==="nosql-basics").steps[0];${mutation}`;
  const result = spawnSync(process.execPath, ["--import", `data:text/javascript,${encodeURIComponent(preload)}`, gate, "--course=nosql-basics"], { encoding: "utf8", timeout: 30000, windowsHide: true });
  assert.equal(result.status, 1, `${name}: gate must reject\n${result.stdout}\n${result.stderr}`);
  assert.ok(`${result.stdout}${result.stderr}`.includes(expected), `${name}: expected ${expected}`);
}
console.log(`Content gate: ${cases.length} negative controls rejected; source files untouched.`);
