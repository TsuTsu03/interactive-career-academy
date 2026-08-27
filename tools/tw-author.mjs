/**
 * tw-author.mjs - authoring loop for the Tailwind course.
 *
 * Fourth harness, same split. The wrinkle here is that this course does not
 * run Tailwind: each step ships the one hand-written CSS rule the utility it
 * teaches would compile to, and the grading frame reads that back like any
 * other stylesheet. So a utility is teachable only if its real output is known
 * exactly, and a model that guesses a plausible rule produces a lesson that
 * teaches the wrong CSS under the right class name.
 *
 * Every class, rule, and expected value therefore lives in tools/tw-topics.mjs.
 * The model writes the words on the page and nothing else.
 *
 * WHAT IT PRODUCES
 *
 * One project per pass: an element whose class list grows by one utility per
 * step, matching the shape the hand-authored projects use.
 *
 * USAGE
 *
 *   node tools/tw-author.mjs                # run until covered or STOP_LOOP
 *   node tools/tw-author.mjs --passes 1     # one pass
 *   node tools/tw-author.mjs --dry-run      # generate and print, write nothing
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { TW_TOPICS, TW_FIXTURES } from "./tw-topics.mjs";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const WEB = join(REPO, "apps", "web");
const COURSE = join(WEB, "content", "tailwind-course.ts");
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
  "a sari-sari store shelf", "a barangay health centre board", "a jeepney route sign",
  "a palengke stall board", "a turo-turo counter", "a school notice board",
  "a tricycle terminal sign", "a bakery display", "a water refill station",
  "a barangay clean-up notice", "a computer shop rate board", "a fiesta programme",
  "a rice retailer board", "a laundry shop counter", "a pharmacy shelf",
];

const TAGALOG = /\b(?:ang|mga|nang|ito|iyan|dito|kayo|kami|tayo|natin|namin|ako|ikaw|siya|hindi|wala|meron|marami|importante|mahalaga|paalala|babala|bayad|presyo|halaga|libre|bagong|maganda|salamat|paki|kailangan|puwede|pwede|dapat|gusto|tulong|bahay|umaga|hapon|gabi|araw|bukas|ngayon)\b/i;

/* ------------------------------------------------------------------ */

function readCourseState() {
  const src = readFileSync(COURSE, "utf8");
  const projectIds = [...src.matchAll(/const PROJECT_(\d+)_ID = "([^"]+)"/g)];
  if (projectIds.length === 0) throw new Error("No PROJECT_N_ID constants found.");
  const lastNum = Math.max(...projectIds.map((m) => Number(m[1])));

  const topicCounts = new Map(TW_TOPICS.map((t) => [t.id, 0]));
  for (const m of src.matchAll(/tw-topic: ([a-z-]+)/g)) {
    if (topicCounts.has(m[1])) topicCounts.set(m[1], topicCounts.get(m[1]) + 1);
  }

  return { src, nextNum: lastNum + 1, usedProjectIds: new Set(projectIds.map((m) => m[2])), topicCounts };
}

function buildPrompt(topic, fixture, setting) {
  const slots = fixture.slots.map((s, i) => `  "s${i}": "${s}"`).join(",\n");
  return {
    topic, fixture, setting,
    system: "You write the words for one small Tailwind lesson for beginners in the Philippines. You reply with one JSON object and nothing else. No markdown fence, no explanation.",
    user: `A page element is being styled for ${setting}, teaching ${topic.label}.

Write the words that go on it. Reply with exactly this shape, replacing each
description with real words for that setting:

{
${slots}
}

Rules:
- Write what a real sign at ${setting} would actually say. Never mention
  Tailwind, CSS, HTML, code, or lessons - the learner is styling a real notice,
  not a tutorial about styling.
- Keep every value short and plain. English only, no Tagalog.
- No HTML tags, no angle brackets, no class names, no CSS.
- Prices are written like PHP 85.
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

    // The text lands inside a single-quoted TypeScript string that itself
    // holds double-quoted HTML attributes, so neither quote can survive.
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

/** The element with its class list as it stands after `upTo` utilities. */
function markup(fixture, topic, upTo, slots) {
  const classes = topic.steps.slice(0, upTo).map((s) => s.cls).join(" ");
  const attr = classes ? ` class="${classes}"` : "";
  return `<${fixture.tag}${attr}>${fixture.text(slots)}</${fixture.tag}>`;
}

function generate(spec, num, topic, fixture) {
  const { slug, slots } = spec;
  const P = `PROJECT_${num}_ID`;
  const S = `s${num}`;

  const stepLines = [];
  const refLines = [];

  topic.steps.forEach((st, i) => {
    const id = `${slug}-${st.cls.replace(/[^a-z0-9]/g, "-")}`;
    const start = markup(fixture, topic, i, slots);
    const done = markup(fixture, topic, i + 1, slots);
    const prev = i === 0 ? fixture.tag : topic.steps[i - 1].cls;
    const label = `The ${topic.fixture} has ${st.readable}`;
    const stylesheet = topic.steps.slice(0, i + 1).map((step) => step.rule).join("\n\n");

    // A utility whose effect the static frame cannot read back - one that
    // expands to several properties, or a state variant - is matched against
    // the class list instead. Same escape hatch the hand-authored steps use.
    const test = st.check === "source"
      ? `{ id: "${id}-class", kind: "source-matches", file: "index.html", pattern: "class=\\\\\\"[^\\\\\\"]*\\\\b${st.cls}\\\\b", flags: "i", because: "Add ${st.cls} to the class list.", label: "${label}" }`
      : `{ id: "${id}-style", kind: "style", selector: ".${st.cls}", prop: "${st.prop}", equals: "${st.computed}", readable: "${st.readable}", label: "${label}" }`;

    const hint = i === 0 ? st.hint : `${st.hint} Add it at the end of the class list.`;

    stepLines.push(`    ${S}({ id: "${id}", task: "${q(st.task)}", inputMode: "guided", files: { "index.html": "${q(start)}", "styles.css": "${q(stylesheet)}" }, activeFile: "index.html", highlightToken: "${q(prev)}", tests: [${test}], hints: [{ level: 1, text: "${q(hint)}" }, { level: 2, text: "Add ${st.cls} to the class list." }], xp: 40 }),`);
    refLines.push(`  "${id}": { estimatedMinutes: 4, solution: { "index.html": "${q(done)}", "styles.css": "${q(stylesheet)}" } },`);
  });

  return {
    steps: stepLines.join("\n") + "\n",
    references: refLines.join("\n") + "\n",
    factory: `const ${S} = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(\`Missing reference data for Tailwind step: \${step.id}\`); return { ...step, ...reference, index: ++n, kind: "web", projectId: ${P} }; };\n`,
    projectConst: `/* tw-topic: ${topic.id} */\nconst ${P} = "${spec.projectId}";\n`,
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

  src = insertBefore(src, "} satisfies Record<string, { estimatedMinutes: number;", gen.references);
  src = insertBefore(src, "\nconst s = (step:", gen.projectConst);
  src = insertBefore(src, "export const tailwindCourse: Course = {", gen.factory + "\n");

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
  const msg = `Add Learn Tailwind project ${gen.num}: ${gen.spec.projectTitle}

Teaches ${gen.topic.label} across five steps, each adding one utility to the
class list. Generated by tools/tw-author.mjs from a locally served model: the
class, the CSS rule it compiles to, and the expected computed value all come
from tools/tw-topics.mjs, since this course ships the rule by hand rather than
running Tailwind. The model supplied only the words on the page.

Course is now at ${steps} steps.

Co-Authored-By: Den Jansen Flores <floresjansen28@gmail.com>
`;
  const f = join(REPO, ".git", "TW_AUTHOR_MSG");
  writeFileSync(f, msg, "utf8");
  run("git", ["commit", "-F", JSON.stringify(f)]);
}

function logPass(gen, steps) {
  const entry = `\n---\n\n## ${new Date().toISOString().slice(0, 10)} - Tailwind course, project ${gen.num} (local model)\n\n**What got made:** ${gen.spec.projectTitle}, five steps teaching ${gen.topic.label}.\n\n**How:** \`tools/tw-author.mjs\` with \`${MODEL}\` served locally. This course ships the hand-written CSS rule each utility compiles to, so the class, the rule, and the expected computed value are all curated in \`tools/tw-topics.mjs\`. A guessed rule would teach the wrong CSS under the right class name. The model supplied only the words on the page.\n\n**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in \`PENDING_QA.md\` per the owner ruling of 2026-08-25. Course is at ${steps} steps.\n`;
  writeFileSync(LOG, readFileSync(LOG, "utf8") + entry, "utf8");
}

/* ------------------------------------------------------------------ */

async function onePass(passNo) {
  const state = readCourseState();

  const [leastId, leastCount] = [...state.topicCounts.entries()].sort((a, b) => a[1] - b[1])[0];
  if (leastCount >= ROUNDS) {
    return { done: true, reason: `every topic has ${ROUNDS} projects; the course is covered` };
  }
  const topic = TW_TOPICS.find((t) => t.id === leastId);
  const fixture = TW_FIXTURES[topic.fixture];
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

  console.log("CodeDaddy Tailwind authoring loop");
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
