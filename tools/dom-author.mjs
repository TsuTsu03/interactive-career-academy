/**
 * dom-author.mjs - authoring loop for JavaScript on a Page.
 *
 * Fifth harness, same split as the other four. What is new here is not the
 * generator but what it can assert against: steps use the `page-*` test family,
 * which is checked after the learner's script has run, in the frame built by
 * `lib/page-runner.ts`. The plain `exists` and `text-equals` family could not
 * grade this course at all - it runs where nothing executes, so it would
 * describe the starting markup and say nothing about what the script did.
 *
 * As everywhere else, expectations and code come from the same slot values in
 * tools/dom-topics.mjs, so a step's check cannot disagree with the step. The
 * model writes only the words on the page.
 *
 * USAGE
 *
 *   node tools/dom-author.mjs                # run until covered or STOP_LOOP
 *   node tools/dom-author.mjs --passes 1     # one pass
 *   node tools/dom-author.mjs --dry-run      # generate and print, write nothing
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { DOM_TOPICS, DOM_FIXTURES } from "./dom-topics.mjs";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const WEB = join(REPO, "apps", "web");
const COURSE = join(WEB, "content", "dom-course.ts");
const STOP = join(REPO, "STOP_LOOP");
const LOG = join(WEB, "content", "AUTHORING_LOG.md");

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const next = args[i + 1];
  return next && !next.startsWith("--") ? next : true;
};

const MAX_PASSES = Number(flag("passes", Infinity));
const DRY_RUN = flag("dry-run", false) === true;
const ENDPOINT = String(flag("endpoint", "http://localhost:1234"));
const MODEL = String(flag("model", "qwen2.5-coder-7b-instruct"));
const RETRIES = Number(flag("retries", 3));
const ROUNDS = Number(flag("rounds", 3));

const SETTINGS = [
  "a barangay help desk", "a sari-sari store counter", "a palengke stall",
  "a jeepney terminal", "a turo-turo kitchen", "a barangay health centre",
  "a school registration table", "a tricycle queue", "a bakery counter",
  "a water refill station", "a barangay clean-up drive", "a computer shop",
  "a fiesta committee", "a rice retailer", "a laundry shop",
  "a pharmacy counter", "a barangay ID desk", "a relief goods centre",
];

const TAGALOG = /\b(?:ang|mga|nang|ito|iyan|dito|kayo|kami|tayo|natin|namin|ako|ikaw|siya|hindi|wala|meron|marami|importante|mahalaga|paalala|babala|bayad|presyo|halaga|libre|bagong|maganda|salamat|paki|kailangan|puwede|pwede|dapat|gusto|tulong|bahay|umaga|hapon|gabi|araw|bukas|ngayon)\b/i;

/* ------------------------------------------------------------------ */

function readCourseState() {
  const src = readFileSync(COURSE, "utf8");
  const projectIds = [...src.matchAll(/const PROJECT_(\d+)_ID = "([^"]+)"/g)];
  const lastNum = projectIds.length ? Math.max(...projectIds.map((m) => Number(m[1]))) : 0;

  const topicCounts = new Map(DOM_TOPICS.map((t) => [t.id, 0]));
  for (const m of src.matchAll(/dom-topic: ([a-z-]+)/g)) {
    if (topicCounts.has(m[1])) topicCounts.set(m[1], topicCounts.get(m[1]) + 1);
  }

  return { src, nextNum: lastNum + 1, usedProjectIds: new Set(projectIds.map((m) => m[2])), topicCounts };
}

function buildPrompt(topic, fixture, setting) {
  const slots = fixture.slots.map((s, i) => `  "s${i}": "${s}"`).join(",\n");
  return {
    topic, fixture, setting,
    system: "You write the words for one small JavaScript lesson for beginners in the Philippines. You reply with one JSON object and nothing else. No markdown fence, no explanation.",
    user: `A small screen is being built for ${setting}, teaching ${topic.label}.

Write the words that appear on it. Reply with exactly this shape, replacing
each description with real words for that setting:

{
${slots}
}

Rules:
- Write what a real screen at ${setting} would say. Never mention JavaScript,
  HTML, code, or lessons.
- Keep every value short. English only, no Tagalog.
- No HTML tags, no angle brackets, no code.
- Do not use a double quote, a single quote, or a backslash anywhere.`,
  };
}

async function askModel(prompt, note) {
  const res = await fetch(`${ENDPOINT}/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: prompt.system },
        { role: "user", content: note ? `${prompt.user}\n\nYour last reply was rejected: ${note}\nTry again.` : prompt.user },
      ],
      temperature: 0.7, max_tokens: 400, stream: false,
    }),
  });
  if (!res.ok) throw new Error(`LM Studio returned ${res.status}`);
  return (await res.json()).choices?.[0]?.message?.content ?? "";
}

function extractJson(text) {
  const start = text.indexOf("{");
  if (start === -1) throw new Error("no JSON object in reply");
  let depth = 0, inStr = false, esc = false;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (esc) { esc = false; continue; }
    if (c === "\\") { esc = true; continue; }
    if (c === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (c === "{") depth++;
    else if (c === "}" && --depth === 0) return JSON.parse(text.slice(start, i + 1));
  }
  throw new Error("unterminated JSON object");
}

function deriveIds(setting, topicId, used, src) {
  const words = setting.toLowerCase().replace(/^(a|an|the) /, "").split(/[^a-z]+/).filter(Boolean);
  const candidates = [];
  for (let take = 2; take <= words.length; take++) candidates.push(words.slice(0, take).join("-"));
  candidates.push(`${words.join("-")}-${topicId}`);
  for (let i = 2; i <= 20; i++) candidates.push(`${words.join("-")}-${topicId}-${i}`);

  for (const c of candidates) {
    const slug = c.split("-").slice(-2).join("-");
    if (used.has(c) || src.includes(`id: "${slug}-`)) continue;
    const projectTitle = c.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return { projectId: c, slug, projectTitle };
  }
  throw new Error(`could not derive a free id from "${setting}"`);
}

function validate(raw, state, prompt) {
  const { topic, fixture, setting } = prompt;
  const ids = deriveIds(setting, topic.id, state.usedProjectIds, state.src);

  const slots = [];
  for (let i = 0; i < fixture.slots.length; i++) {
    let v = raw[`s${i}`];
    if (typeof v === "number") v = String(v);
    if (typeof v !== "string" || !v.trim()) throw new Error(`missing "s${i}" (${fixture.slots[i]})`);

    v = v.replace(/<\/?[a-z][a-z0-9]*\s*\/?>/gi, "").replace(/[<>{}]/g, "").trim();

    // The value lands in markup, in a script, and in an expected result. A
    // quote of either kind would end one of those literals, so both are
    // refused rather than escaped differently in three places.
    if (/["'\\`\n]/.test(v)) throw new Error(`"s${i}" contains a quote, backslash, or newline`);
    const hit = v.match(TAGALOG);
    if (hit) throw new Error(`"s${i}" contains Tagalog ("${hit[0]}"); write in English`);
    if (v.split(/\s+/).length > 10) throw new Error(`"s${i}" is over ten words`);
    slots.push(v);
  }

  return { ...ids, slots };
}

/* ------------------------------------------------------------------ */

const q = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
const call = (x, v) => (typeof x === "function" ? x(v) : x);

function lineText(line, v) {
  if (line.raw) return call(line.raw, v);
  return `const ${line.name} = ${call(line.expr, v)};`;
}

function blankText(line, v) {
  if (line.raw) return call(line.blank, v);
  return `const ${line.name} = ${line.blankExpr ?? ""};`;
}

function tokenFor(line, v) {
  if (line.token) return line.token;
  return blankText(line, v);
}

function script(lines, upTo, v, blankNext) {
  const out = lines.slice(0, upTo).map((l) => lineText(l, v));
  if (blankNext && upTo < lines.length) out.push(blankText(lines[upTo], v));
  return out.join("\n") + "\n";
}

/**
 * Builds the check and the sentence beside it. The label is derived from the
 * check rather than authored separately, so it stays true when a slot value
 * changes - the same rule the JavaScript harness settled on.
 */
function testSpec(line, id, v) {
  const t = call(line.test, v);
  const where = t.selector;
  let label;
  switch (t.kind) {
    case "page-exists": label = `${where} is on the page`; break;
    case "page-text-equals": label = `${where} reads ${t.value}`; break;
    case "page-attr-equals": label = `${where} has ${t.attr} set to ${t.value}`; break;
    case "page-class-contains": label = `${where} carries the class ${t.value}`; break;
    case "page-click-text-equals": label = `${where} reads ${t.value} after the click`; break;
    case "page-click-attr-equals": label = `${where} has ${t.attr} set to ${t.value} after the click`; break;
    case "page-click-class-contains": label = `${where} carries the class ${t.value} after the click`; break;
    case "page-input-text-equals": label = `${where} reads ${t.value} once ${t.type} is typed`; break;
    default: throw new Error(`unknown test kind: ${t.kind}`);
  }

  const parts = [`id: "${id}-check"`, `label: "${q(label)}"`, `kind: "${t.kind}"`];
  if (t.clickSelector) parts.push(`clickSelector: ${JSON.stringify(t.clickSelector)}`);
  parts.push(`selector: ${JSON.stringify(t.selector)}`);
  if (t.attr) parts.push(`attr: ${JSON.stringify(t.attr)}`);
  if (t.type) parts.push(`type: ${JSON.stringify(t.type)}`);
  if (t.value !== undefined) parts.push(`value: ${JSON.stringify(t.value)}`);
  return `{ ${parts.join(", ")} }`;
}

function generate(spec, num, topic, fixture) {
  const { slug, slots: v } = spec;
  const P = `PROJECT_${num}_ID`;
  const S = `s${num}`;
  const HTML = `${slug.toUpperCase().replace(/-/g, "_")}_HTML`;

  const html = fixture.html(v);
  const bodies = `\n/* dom-topic: ${topic.id} */\nconst ${HTML} = "${q(html)}";\n`;

  const stepLines = [];
  const refLines = [];

  topic.lines.forEach((line, i) => {
    const id = `${slug}-${i + 1}`;
    const start = script(topic.lines, i, v, true);
    const done = script(topic.lines, i + 1, v, false);

    stepLines.push(`    ${S}({ id: "${id}", task: "${q(call(line.task, v))}", inputMode: "guided", files: page(${HTML}, "${q(start)}"), activeFile: "script.js", highlightToken: "${q(tokenFor(line, v))}", tests: [${testSpec(line, id, v)}], hints: [{ level: 1, text: "${q(line.hint1)}" }, { level: 2, text: "${q(call(line.hint2, v))}" }], xp: 50 }),`);
    refLines.push(`  "${id}": { estimatedMinutes: 4, solution: page(${HTML}, "${q(done)}") },`);
  });

  return {
    bodies,
    steps: stepLines.join("\n") + "\n",
    references: refLines.join("\n") + "\n",
    factory: `const ${S} = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(\`Missing reference data for DOM step: \${step.id}\`); return { ...step, ...reference, index: ++n, kind: "web", projectId: ${P} }; };\n`,
    projectConst: `const ${P} = "${spec.projectId}";\n`,
    projectEntry: `{ id: ${P}, title: "${spec.projectTitle}" }, `,
    num, spec, topic,
  };
}

/* ------------------------------------------------------------------ */

function insertBefore(src, anchor, text) {
  const first = src.indexOf(anchor);
  if (first === -1) throw new Error(`anchor not found: ${anchor}`);
  if (src.indexOf(anchor, first + 1) !== -1) throw new Error(`anchor is not unique: ${anchor}`);
  return src.slice(0, first) + text + src.slice(first);
}

function apply(gen) {
  let src = readFileSync(COURSE, "utf8");

  src = insertBefore(src, "\n/** Authored proof for every step.", gen.bodies);
  src = insertBefore(src, "} satisfies Record<string, StepReference>;", gen.references);
  src = insertBefore(src, "\nexport const domCourse:", gen.projectConst + gen.factory + "\n");

  const projAt = src.indexOf("  projects: [");
  if (projAt === -1) throw new Error("projects array not found");
  const projEnd = src.indexOf("]", projAt);
  const before = src.slice(0, projEnd).replace(/\s+$/, "");
  src = before + (before.endsWith("}") ? ", " : " ") + gen.projectEntry.replace(/,\s*$/, "") + " " + src.slice(projEnd);

  const stepsAt = src.indexOf("  steps: [");
  if (stepsAt === -1) throw new Error("steps array not found");
  const stepsEnd = src.indexOf("\n  ],", stepsAt);
  if (stepsEnd === -1) throw new Error("steps array close not found");
  src = src.slice(0, stepsEnd + 1) + gen.steps + src.slice(stepsEnd + 1);

  writeFileSync(COURSE, src, "utf8");
}

/* ------------------------------------------------------------------ */

const run = (cmd, a, cwd = REPO) =>
  execFileSync(cmd, a, { cwd, stdio: "pipe", encoding: "utf8", shell: true });

function gatesPass() {
  try { run("npx", ["tsc", "--noEmit"], WEB); }
  catch (e) { return { ok: false, where: "tsc", out: String(e.stdout || e.message).slice(0, 1200) }; }
  try { run("npx", ["eslint", "."], WEB); }
  catch (e) { return { ok: false, where: "eslint", out: String(e.stdout || e.message).slice(0, 1200) }; }
  return { ok: true };
}

const revert = () => { try { run("git", ["checkout", "--", "apps/web/content"]); } catch { /* nothing to undo */ } };
const stepCount = () => (readFileSync(COURSE, "utf8").match(/xp: \d+/g) || []).length;

function commit(gen, steps) {
  run("git", ["add", "apps/web/content"]);
  const msg = `Add JavaScript on a Page project ${gen.num}: ${gen.spec.projectTitle}

Teaches ${gen.topic.label} across five steps, each adding one line to the same
script. Checked with the page-* family, which runs the script before asserting
- the only way a lesson about the DOM can be graded at all.

Generated by tools/dom-author.mjs from a locally served model: every selector,
expression, and expected result comes from tools/dom-topics.mjs and is built
from the same values, so the code and its check cannot disagree.

Course is now at ${steps} steps.

Co-Authored-By: Den Jansen Flores <floresjansen28@gmail.com>
`;
  const f = join(REPO, ".git", "DOM_AUTHOR_MSG");
  writeFileSync(f, msg, "utf8");
  run("git", ["commit", "-F", JSON.stringify(f)]);
}

function logPass(gen, steps) {
  const entry = `\n---\n\n## ${new Date().toISOString().slice(0, 10)} - JavaScript on a Page, project ${gen.num} (local model)\n\n**What got made:** ${gen.spec.projectTitle}, five steps teaching ${gen.topic.label}.\n\n**How:** \`tools/dom-author.mjs\` with \`${MODEL}\` served locally, asserting through the \`page-*\` family so the script actually runs before the check. Selectors, expressions, and expected results all come from \`tools/dom-topics.mjs\`. The model supplied only the words on the screen.\n\n**Verification performed:** TypeScript and ESLint both clean. Course is at ${steps} steps.\n`;
  writeFileSync(LOG, readFileSync(LOG, "utf8") + entry, "utf8");
}

/* ------------------------------------------------------------------ */

async function onePass(passNo) {
  const state = readCourseState();

  const [leastId, leastCount] = [...state.topicCounts.entries()].sort((a, b) => a[1] - b[1])[0];
  if (leastCount >= ROUNDS) {
    return { done: true, reason: `every topic has ${ROUNDS} projects; the course is covered` };
  }
  const topic = DOM_TOPICS.find((t) => t.id === leastId);
  const fixture = DOM_FIXTURES[topic.fixture];
  const setting = SETTINGS[state.usedProjectIds.size % SETTINGS.length];
  const prompt = buildPrompt(topic, fixture, setting);

  let spec = null, note = null;
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      spec = validate(extractJson(await askModel(prompt, note)), state, prompt);
      break;
    } catch (e) {
      note = e.message;
      console.log(`  attempt ${attempt}/${RETRIES} rejected: ${e.message}`);
      spec = null;
    }
  }
  if (!spec) return { ok: false, reason: "the model did not produce usable words" };

  const gen = generate(spec, state.nextNum, topic, fixture);
  console.log(`  project ${gen.num}: ${spec.projectTitle} (${topic.label})`);

  if (DRY_RUN) { console.log(gen.steps); return { ok: true, dry: true }; }

  apply(gen);

  const gates = gatesPass();
  if (!gates.ok) {
    console.log(`  ${gates.where} failed, reverting pass ${passNo}:`);
    console.log(gates.out.split("\n").slice(0, 5).map((l) => `    ${l}`).join("\n"));
    revert();
    return { ok: false, reason: `${gates.where} failed` };
  }

  const steps = stepCount();
  logPass(gen, steps);
  commit(gen, steps);
  return { ok: true, steps };
}

async function main() {
  if (existsSync(STOP)) { console.log("STOP_LOOP exists. Remove it to start."); process.exit(0); }

  console.log("CodeDaddy JavaScript-on-a-Page authoring loop");
  console.log(`Model:    ${MODEL} at ${ENDPOINT}`);
  console.log(`Starting: ${stepCount()} steps\n`);

  let fails = 0;
  for (let pass = 1; pass <= MAX_PASSES; pass++) {
    if (existsSync(STOP)) { console.log(`\nSTOP_LOOP found. Stopping after ${pass - 1} passes.`); break; }

    console.log(`--- pass ${pass} ---`);
    let r;
    try { r = await onePass(pass); }
    catch (e) { r = { ok: false, reason: e.message }; revert(); }

    if (r.done) { console.log(`\n${r.reason}. Stopping.`); break; }

    if (r.ok) {
      fails = 0;
      if (!r.dry) console.log(`  committed. ${r.steps} steps.\n`);
    } else {
      fails++;
      console.log(`  pass failed: ${r.reason} (${fails} in a row)\n`);
      if (fails >= 5) { console.log("Five failed passes in a row. Stopping so the cause can be looked at."); break; }
    }
  }

  console.log(`\nFinished at ${stepCount()} steps.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
