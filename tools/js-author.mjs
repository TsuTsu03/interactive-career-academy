/**
 * js-author.mjs - authoring loop for the JavaScript course.
 *
 * Third harness, same split, third set of reasons for it.
 *
 * HTML punished a wrong element with a lesson that taught the wrong thing.
 * CSS punished a wrong value with a check that could never pass. JavaScript
 * punishes both at once and adds a third: the expected result and the code
 * that produces it are two separate things, and a model asked for both will
 * eventually hand back a pair that disagree. `"Ana".toUpperCase()` is `ANA`
 * and not `Ana`; `[1,2,3].length - 2` is `1` and not `2`. A step whose
 * expectation is off by one is not a smaller version of a correct step - it is
 * an unpassable one.
 *
 * So in tools/js-topics.mjs every line's expectation is a function of the same
 * slot values the code is built from. The two are generated together and
 * cannot drift. The model writes only the strings that go inside quotes.
 *
 * WHAT IT PRODUCES
 *
 * One project per pass: a short script built one line per step, in the shape
 * the hand-authored steps use. The step before each line is the same script
 * with that line's expression blanked.
 *
 * USAGE
 *
 *   node tools/js-author.mjs                # run until covered or STOP_LOOP
 *   node tools/js-author.mjs --passes 1     # one pass
 *   node tools/js-author.mjs --dry-run      # generate and print, write nothing
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { JS_TOPICS } from "./js-topics.mjs";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const WEB = join(REPO, "apps", "web");
const COURSE = join(WEB, "content", "js-course.ts");
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

const TAGALOG = /\b(?:ang|mga|nang|ito|iyan|dito|kayo|kami|tayo|natin|namin|ako|ikaw|siya|hindi|wala|meron|marami|importante|mahalaga|paalala|babala|bayad|presyo|halaga|libre|bagong|maganda|mabuti|salamat|paki|kailangan|puwede|pwede|dapat|gusto|ayaw|tulong|bahay|umaga|hapon|gabi|araw|bukas|kahapon|ngayon)\b/i;

/* ------------------------------------------------------------------ */
/* Reading the course                                                  */
/* ------------------------------------------------------------------ */

function readCourseState() {
  const src = readFileSync(COURSE, "utf8");

  const projectIds = [...src.matchAll(/const PROJECT_(\d+)_ID = "([^"]+)"/g)];
  if (projectIds.length === 0) throw new Error("No PROJECT_N_ID constants found.");
  const lastNum = Math.max(...projectIds.map((m) => Number(m[1])));

  const topicCounts = new Map(JS_TOPICS.map((t) => [t.id, 0]));
  for (const m of src.matchAll(/js-topic: ([a-z-]+)/g)) {
    if (topicCounts.has(m[1])) topicCounts.set(m[1], topicCounts.get(m[1]) + 1);
  }

  return { src, nextNum: lastNum + 1, usedProjectIds: new Set(projectIds.map((m) => m[2])), topicCounts };
}

/* ------------------------------------------------------------------ */
/* Asking the model                                                    */
/* ------------------------------------------------------------------ */

function buildPrompt(topic, setting) {
  const slots = topic.slots.map((s, i) => `  "s${i}": "${s}"`).join(",\n");

  const system = [
    "You supply the words for one small JavaScript lesson for beginners in the Philippines.",
    "You reply with one JSON object and nothing else. No markdown fence, no explanation.",
  ].join(" ");

  const user = `A short script is being written for ${setting}, teaching ${topic.label}.

Supply the values it uses. Reply with exactly this shape, replacing each
description with a real value for that setting:

{
${slots}
}

Rules:
- Keep every value very short. A name is one word; a label is two or three.
- Plain English only. No Tagalog.
- Where a number is asked for, give digits only, no words and no currency.
- No quotes, no backslashes, no backticks, no code of any kind.
- Make the values fit ${setting} specifically.`;

  return { system, user, topic, setting };
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
      temperature: 0.7,
      max_tokens: 500,
      stream: false,
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

/* ------------------------------------------------------------------ */
/* Validating                                                          */
/* ------------------------------------------------------------------ */

function deriveIds(setting, topicId, used, src) {
  const words = setting.toLowerCase().replace(/^(a|an|the) /, "").split(/[^a-z]+/).filter(Boolean);
  const candidates = [];
  for (let take = 2; take <= words.length; take++) candidates.push(words.slice(0, take).join("-"));
  candidates.push(`${words.join("-")}-${topicId}`);
  for (let i = 2; i <= 20; i++) candidates.push(`${words.join("-")}-${topicId}-${i}`);

  for (const c of candidates) {
    const slug = c.split("-").slice(-2).join("-");
    if (used.has(c) || src.includes(`id: "${slug}-`)) continue;
    const projectTitle = c.split("-").map((w) => (w === "id" ? "ID" : w.charAt(0).toUpperCase() + w.slice(1))).join(" ");
    return { projectId: c, slug, projectTitle };
  }
  throw new Error(`could not derive a free id from "${setting}"`);
}

function validate(raw, state, prompt) {
  const { topic, setting } = prompt;
  const ids = deriveIds(setting, topic.id, state.usedProjectIds, state.src);

  const slots = [];
  for (let i = 0; i < topic.slots.length; i++) {
    let v = raw[`s${i}`];
    if (typeof v === "number") v = String(v);
    if (typeof v !== "string" || !v.trim()) throw new Error(`missing "s${i}" (${topic.slots[i]})`);

    v = v.replace(/[<>{}$]/g, "").trim();

    // The value lands inside a JavaScript string literal and inside an
    // expected result, so anything that could end the literal is refused
    // rather than escaped - an escape that works in one place and not the
    // other produces a step whose check cannot pass.
    if (/["'\\`\n]/.test(v)) throw new Error(`"s${i}" contains a quote, backslash, or newline`);

    const wantsNumber = /number/i.test(topic.slots[i]);
    if (wantsNumber) {
      if (!/^\d+$/.test(v)) throw new Error(`"s${i}" must be digits only, got "${v}"`);
    } else {
      const hit = v.match(TAGALOG);
      if (hit) throw new Error(`"s${i}" contains Tagalog ("${hit[0]}"); write in English`);
      if (v.split(/\s+/).length > 4) throw new Error(`"s${i}" is over four words`);
    }
    slots.push(v);
  }

  return { ...ids, slots };
}

/* ------------------------------------------------------------------ */
/* Generating                                                          */
/* ------------------------------------------------------------------ */

/** Escapes a script for embedding in a double-quoted TypeScript string. */
const q = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");

const call = (x, v) => (typeof x === "function" ? x(v) : x);

/** The finished text of one line of the script. */
function lineText(line, v) {
  if (line.raw) return call(line.raw, v);
  if (line.log) return `console.log(${line.log});`;
  return `const ${line.name} = ${call(line.expr, v)};`;
}

/** The same line with the part the learner supplies taken out. */
function blankText(line, v) {
  if (line.raw) return call(line.blank, v);
  if (line.log) return "// Print it below";
  return `const ${line.name} = ${line.blankExpr ?? ""};`;
}

/** What the learner is asked to look at. */
function tokenFor(line) {
  if (line.token) return line.token;
  if (line.log) return "// Print it below";
  return `const ${line.name} = ${line.blankExpr ?? ""};`;
}

/** The script as it stands, with the first `upTo` lines complete. */
function script(lines, upTo, v, blankNext) {
  const out = lines.slice(0, upTo).map((l) => lineText(l, v));
  if (blankNext && upTo < lines.length) out.push(blankText(lines[upTo], v));
  return out.join("\n") + "\n";
}

/**
 * A short readable form of an expected value, for the check's label.
 * Arrays read as their items rather than as JSON, since the label is a
 * sentence the learner reads and not a data dump.
 */
function readable(x) {
  if (Array.isArray(x)) return x.join(", ");
  if (typeof x === "string") return x;
  return String(x);
}

/**
 * Builds the check, and the sentence beside it.
 *
 * The label is derived from the check itself rather than authored per line.
 * `greeting is Welcome to our store` is exactly how the hand-authored steps
 * read, and it stays true automatically when a slot value changes - a label
 * written out separately would be one more thing that can disagree with the
 * code, which is the failure this whole harness is arranged to prevent.
 */
function testSpec(line, id, v, topicLabel) {
  const t = call(line.test, v);
  let label;
  switch (t.kind) {
    case "js-logs": label = `It prints ${readable(t.values[0])}`; break;
    case "js-value": label = `${t.expression} is ${readable(t.equals)}`; break;
    case "js-returns": label = `${t.fn}() gives back ${readable(t.equals)}`; break;
    case "js-runs": label = `The script runs without stopping`; break;
    default: throw new Error(`unknown test kind: ${t.kind}`);
  }
  const base = `id: "${id}-check", label: "${q(label)}"`;

  switch (t.kind) {
    case "js-logs":
      return `{ ${base}, kind: "js-logs", values: ${JSON.stringify(t.values)} }`;
    case "js-value":
      return `{ ${base}, kind: "js-value", expression: ${JSON.stringify(t.expression)}, equals: ${JSON.stringify(t.equals)} }`;
    case "js-returns":
      return `{ ${base}, kind: "js-returns", fn: ${JSON.stringify(t.fn)}, args: ${JSON.stringify(t.args)}, equals: ${JSON.stringify(t.equals)} }`;
    case "js-runs":
      return `{ ${base}, kind: "js-runs" }`;
    default:
      throw new Error(`unknown test kind: ${t.kind}`);
  }
}

function generate(spec, num, topic) {
  const { slug, slots: v } = spec;
  const P = `PROJECT_${num}_ID`;
  const S = `s${num}`;

  const stepLines = [];
  const refLines = [];

  topic.lines.forEach((line, i) => {
    const id = `${slug}-${i + 1}`;
    const start = script(topic.lines, i, v, true);
    const done = script(topic.lines, i + 1, v, false);
    const task = call(line.task, v);
    const hint2 = call(line.hint2, v);

    stepLines.push(`    ${S}({ id: "${id}", task: "${q(task)}", inputMode: "guided", files: js("${q(start)}"), activeFile: "script.js", highlightToken: "${q(tokenFor(line))}", tests: [${testSpec(line, id, v, topic.label)}], hints: [{ level: 1, text: "${q(line.hint1)}" }, { level: 2, text: "${q(hint2)}" }], xp: ${line.log ? 40 : 50} }),`);
    refLines.push(`  "${id}": { estimatedMinutes: 4, solution: js("${q(done)}") },`);
  });

  return {
    marker: `/* js-topic: ${topic.id} */\n`,
    steps: stepLines.join("\n") + "\n",
    references: refLines.join("\n") + "\n",
    factory: `const ${S} = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(\`Missing reference data for JS step: \${step.id}\`); return { ...step, ...reference, index: ++n, kind: "js", projectId: ${P} }; };\n`,
    projectConst: `${`/* js-topic: ${topic.id} */\n`}const ${P} = "${spec.projectId}";\n`,
    projectEntry: `{ id: ${P}, title: "${spec.projectTitle}" }, `,
    num, spec, topic,
  };
}

/* ------------------------------------------------------------------ */
/* Applying                                                            */
/* ------------------------------------------------------------------ */

function insertBefore(src, anchor, text) {
  const first = src.indexOf(anchor);
  if (first === -1) throw new Error(`anchor not found: ${anchor}`);
  if (src.indexOf(anchor, first + 1) !== -1) throw new Error(`anchor is not unique: ${anchor}`);
  return src.slice(0, first) + text + src.slice(first);
}

function apply(gen) {
  let src = readFileSync(COURSE, "utf8");

  src = insertBefore(src, "} satisfies Record<string, StepReference>;", gen.references);
  src = insertBefore(src, "\nconst s = (step:", gen.projectConst);
  src = insertBefore(src, "export const jsCourse: Course = {", gen.factory + "\n");

  // The projects array is written on one line here, and its last entry has no
  // trailing comma, so one is added before appending.
  const projAt = src.indexOf("  projects: [");
  if (projAt === -1) throw new Error("projects array not found");
  const projEnd = src.indexOf("],", projAt);
  if (projEnd === -1) throw new Error("projects array close not found");
  const before = src.slice(0, projEnd).replace(/\s+$/, "");
  src = before + (before.endsWith("}") ? ", " : " ") + gen.projectEntry.replace(/,\s*$/, "") + src.slice(projEnd);

  const stepsAt = src.indexOf("  steps: [");
  if (stepsAt === -1) throw new Error("steps array not found");
  const stepsEnd = src.indexOf("\n  ],", stepsAt);
  if (stepsEnd === -1) throw new Error("steps array close not found");
  src = src.slice(0, stepsEnd + 1) + gen.steps + src.slice(stepsEnd + 1);

  writeFileSync(COURSE, src, "utf8");
}

/* ------------------------------------------------------------------ */
/* Verifying and committing                                            */
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
  const msg = `Add Learn JavaScript project ${gen.num}: ${gen.spec.projectTitle}

Teaches ${gen.topic.label} across five steps, each adding one line to the same
script. Generated by tools/js-author.mjs from a locally served model: every
expression and every expected result comes from tools/js-topics.mjs and is
built from the same values, so the code and its check cannot disagree. The
model supplied only the words inside the string literals.

Course is now at ${steps} steps.

Co-Authored-By: Den Jansen Flores <floresjansen28@gmail.com>
`;
  const f = join(REPO, ".git", "JS_AUTHOR_MSG");
  writeFileSync(f, msg, "utf8");
  run("git", ["commit", "-F", JSON.stringify(f)]);
}

function logPass(gen, steps) {
  const entry = `\n---\n\n## ${new Date().toISOString().slice(0, 10)} - JavaScript course, project ${gen.num} (local model)\n\n**What got made:** ${gen.spec.projectTitle}, five steps teaching ${gen.topic.label}.\n\n**How:** \`tools/js-author.mjs\` with \`${MODEL}\` served locally. Expressions and expected results are generated together from the same values in \`tools/js-topics.mjs\`, so a step's code and its check cannot disagree - the failure mode JavaScript adds over HTML and CSS. The model supplied only the strings inside quotes.\n\n**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in \`PENDING_QA.md\` per the owner ruling of 2026-08-25. Course is at ${steps} steps.\n`;
  writeFileSync(LOG, readFileSync(LOG, "utf8") + entry, "utf8");
}

/* ------------------------------------------------------------------ */
/* The loop                                                            */
/* ------------------------------------------------------------------ */

async function onePass(passNo) {
  const state = readCourseState();

  const [leastId, leastCount] = [...state.topicCounts.entries()].sort((a, b) => a[1] - b[1])[0];
  if (leastCount >= ROUNDS) {
    return { done: true, reason: `every topic has ${ROUNDS} projects; the course is covered` };
  }
  const topic = JS_TOPICS.find((t) => t.id === leastId);
  const setting = SETTINGS[state.usedProjectIds.size % SETTINGS.length];
  const prompt = buildPrompt(topic, setting);

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
  if (!spec) return { ok: false, reason: "the model did not produce usable values" };

  const gen = generate(spec, state.nextNum, topic);
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

  console.log("CodeDaddy JavaScript authoring loop");
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
