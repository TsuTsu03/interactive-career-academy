/**
 * css-author.mjs - authoring loop for the CSS course.
 *
 * Same split as tools/local-author.mjs, and the same reason for it: the model
 * writes the words, code writes the structure. CSS raises the stakes on that
 * division rather than changing it. A wrong HTML element produces a lesson
 * that teaches the wrong thing; a wrong CSS value produces a lesson whose test
 * can never pass, because the grading frame compares against exactly what
 * `getComputedStyle` returns and a model has no way to know that `padding:
 * 16px` reads back through `padding-top`, or that `#fff` comes back as
 * `rgb(255, 255, 255)`.
 *
 * So every property, value, and assertion lives in tools/css-topics.mjs. The
 * model supplies a Filipino setting and the words inside the fixture. It never
 * sees a selector.
 *
 * WHAT IT PRODUCES
 *
 * One project per pass: a small HTML fixture and five steps, each adding one
 * declaration to the same rule, in the shape the hand-authored CSS projects
 * already use.
 *
 * USAGE
 *
 *   node tools/css-author.mjs                # run until STOP_LOOP appears
 *   node tools/css-author.mjs --passes 1     # one pass
 *   node tools/css-author.mjs --dry-run      # generate and print, write nothing
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { CSS_TOPICS, CSS_FIXTURES } from "./css-topics.mjs";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const WEB = join(REPO, "apps", "web");
const COURSE = join(WEB, "content", "css-course.ts");
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
// Projects per topic before the course counts as covered. Three is varied
// practice; twenty, which an earlier unbounded loop produced, is the same
// lesson with different nouns.
const ROUNDS = Number(flag("rounds", 3));
// Leaves a failed pass on disk instead of reverting it, so the generated
// source can be read. Debugging only - never use it in a running loop.
const KEEP_FAILED = flag("keep-failed", false) === true;

const SETTINGS = [
  "a sari-sari store price list", "a barangay health centre notice",
  "a jeepney route board", "a palengke fish stall sign", "a turo-turo menu",
  "a barangay basketball league schedule", "a school supply list",
  "a tricycle fare table", "a bakery order slip", "a water refill station notice",
  "a barangay clean-up announcement", "a computer shop rate card",
  "a fiesta programme", "a rice retailer price board", "a laundry shop receipt",
  "a pharmacy stock list", "a barangay ID application notice",
  "a sari-sari store credit reminder", "a barangay curfew notice",
  "a jeepney terminal timetable",
];

const TAGALOG = /\b(?:ang|mga|nang|ito|iyan|dito|kayo|kami|tayo|natin|namin|ako|ikaw|siya|hindi|wala|meron|marami|importante|mahalaga|paalala|babala|bayad|presyo|halaga|libre|bagong|maganda|mabuti|malaki|maliit|salamat|paki|kailangan|puwede|pwede|dapat|gusto|ayaw|tulong|bahay|umaga|hapon|gabi|araw|bukas|kahapon|ngayon)\b/i;

/* ------------------------------------------------------------------ */
/* Reading the course                                                  */
/* ------------------------------------------------------------------ */

function readCourseState() {
  const src = readFileSync(COURSE, "utf8");

  const projectIds = [...src.matchAll(/const PROJECT_(\d+)_ID = "([^"]+)"/g)];
  if (projectIds.length === 0) throw new Error("No PROJECT_N_ID constants found.");
  const lastNum = Math.max(...projectIds.map((m) => Number(m[1])));

  const usedProjectIds = new Set(projectIds.map((m) => m[2]));

  // How many times each topic has been built. Counted rather than merely
  // flagged: the loop has to know when a topic has had enough practice. An
  // earlier version only asked "used at all", so once every topic was used
  // once it cycled forever, and produced twelve lessons repeated twenty times
  // each before anybody looked.
  const topicCounts = new Map(CSS_TOPICS.map((t) => [t.id, 0]));
  for (const m of src.matchAll(/css-topic: ([a-z-]+)/g)) {
    if (topicCounts.has(m[1])) topicCounts.set(m[1], topicCounts.get(m[1]) + 1);
  }

  return { src, nextNum: lastNum + 1, usedProjectIds, topicCounts };
}

/* ------------------------------------------------------------------ */
/* Asking the model                                                    */
/* ------------------------------------------------------------------ */

function buildPrompt(topic, fixture, setting) {
  const slots = fixture.slots.map((s, i) => `  "s${i}": "${s}"`).join(",\n");

  const system = [
    "You write the words for one small CSS lesson for beginners in the Philippines.",
    "You reply with one JSON object and nothing else. No markdown fence, no explanation.",
  ].join(" ");

  const user = `A page is being styled: ${topic.label}, set in ${setting}.

Write the words that go on it. Reply with exactly this shape, replacing each
description with real words for that setting:

{
${slots}
}

Rules:
- Every value is short. A heading is a few words; a line is under 12 words.
- Plain English only. No Tagalog. No HTML tags, no angle brackets, no CSS.
- Make the words fit ${setting} specifically, not a generic page.
- Prices are written like PHP 85.
- Do not use a double quote or a backslash anywhere.`;

  return { system, user, topic, fixture, setting };
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
      max_tokens: 700,
      stream: false,
    }),
  });
  if (!res.ok) throw new Error(`LM Studio returned ${res.status}`);
  const body = await res.json();
  return body.choices?.[0]?.message?.content ?? "";
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

/** Identifiers are computed, never asked for. See local-author.mjs for why. */
function deriveIds(setting, topicId, used, src) {
  const words = setting.toLowerCase().replace(/^(a|an|the) /, "").split(/[^a-z]+/).filter(Boolean);
  const candidates = [];
  for (let take = 3; take <= words.length; take++) candidates.push(words.slice(0, take).join("-"));
  candidates.push(`${words.slice(0, 3).join("-")}-${topicId}`);
  for (let i = 2; i <= 20; i++) candidates.push(`${words.slice(0, 3).join("-")}-${i}`);

  for (const c of candidates) {
    const slug = c.split("-").slice(-2).join("-");
    if (used.has(c)) continue;
    if (src.includes(`id: "${slug}-`)) continue;
    const projectTitle = c.split("-").map((w) => (w === "id" ? "ID" : w.charAt(0).toUpperCase() + w.slice(1))).join(" ");
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
    if (typeof v !== "string" || !v.trim()) throw new Error(`missing "s${i}" (${fixture.slots[i]})`);

    // Markup and stray brackets are stripped rather than rejected: the model
    // has tags in view whenever it writes about a page, and a retry spent on
    // something code can undo is a retry wasted.
    v = v.replace(/<\/?[a-z][a-z0-9]*\s*\/?>/gi, "").replace(/[<>{}]/g, "").trim();

    if (/["\\`\n]/.test(v)) throw new Error(`"s${i}" contains a quote, backslash, or newline`);
    const hit = v.match(TAGALOG);
    if (hit) throw new Error(`"s${i}" contains Tagalog ("${hit[0]}"); write in English`);
    if (v.split(/\s+/).length > 12) throw new Error(`"s${i}" is over 12 words`);
    slots.push(v);
  }

  return { ...ids, slots };
}

/* ------------------------------------------------------------------ */
/* Generating                                                          */
/* ------------------------------------------------------------------ */

/**
 * How each property reads in a result sentence. "The card is set to 16 pixels"
 * is true but tells the learner nothing; "The card has 16 pixels of room
 * inside" names what they will see.
 */
const VERBS = {
  padding: "has room inside of", "padding-left": "keeps its words clear by",
  "padding-top": "has room above of", "margin-bottom": "leaves a gap below of",
  "margin-left": "has its left margin", "margin-right": "has its right margin",
  "max-width": "stops growing past", "min-height": "stays at least",
  width: "takes up", "background-color": "has a background of",
  "border-radius": "has corners curved by", "border-left-width": "has a left stripe of",
  "border-left-style": "draws its stripe as", "border-left-color": "has a stripe coloured",
  border: "has an edge of", "box-shadow": "carries", "box-sizing": "measures itself as",
  color: "shows its words in", "font-size": "sets its text at",
  "font-weight": "sets its weight to", "line-height": "spaces its lines by",
  "letter-spacing": "spaces its letters by", "text-align": "aligns its words",
  display: "is laid out as", "flex-direction": "runs", gap: "keeps a gap of",
  "justify-content": "spaces its children", "align-items": "lines its children up",
  "grid-template-columns": "is divided into", position: "is",
  overflow: "has its overflow", "white-space": "has its text",
  "text-overflow": "shows clipped text that", "--card-ink": "stores its ink colour as",
  "--card-pad": "stores its spacing as",
};

const CONST = (slug, suffix) => `${slug.toUpperCase().replace(/-/g, "_")}_${suffix}`;

/** The rule as it stands after `upTo` declarations, with the last one blank. */
/**
 * The stylesheet as it stands after `upTo` steps, with the last value blank
 * when the learner is about to fill it in.
 *
 * A step may name a `sel` - a suffix such as `::before` or `:hover` - and its
 * declaration then goes in its own rule rather than the main one. Without
 * this, a pseudo-element step emitted `.notice { ::before-content: "x"; }`,
 * which is not CSS at all: the harness would have shipped a step whose check
 * could never pass and whose starting code was invalid.
 */
function ruleText(root, steps, upTo, blankLast) {
  const blocks = new Map([["", []]]);

  steps.slice(0, upTo).forEach((s, i) => {
    const value = blankLast && i === upTo - 1 ? "" : s.decl;
    const key = s.sel ?? "";
    if (!blocks.has(key)) blocks.set(key, []);
    blocks.get(key).push(`  ${s.prop}: ${value};`);
  });

  const out = [];
  for (const [sel, lines] of blocks) {
    if (lines.length === 0) continue;
    out.push(`.${root}${sel} {\n${lines.join("\n")}\n}`);
  }
  return out.join("\n\n");
}

/** Escapes a CSS block for embedding in a double-quoted TypeScript string. */
const q = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");

function generate(spec, num, topic, fixture) {
  const { slug } = spec;
  const P = `PROJECT_${num}_ID`;
  const S = `s${num}`;
  const root = fixture.root;
  const HTML = CONST(slug, "HTML");
  const SOLVED = `solved${slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")}`;

  const fixtureHtml = fixture.html(spec.slots);

  const bodies = `
/* css-topic: ${topic.id} */
const ${HTML} = \`${fixtureHtml}\`;
const ${SOLVED} = (styles: string): Record<string, string> => ({ "index.html": ${HTML}, "styles.css": css(styles) });
`;

  const stepLines = [];
  const refLines = [];

  topic.steps.forEach((st, i) => {
    // The selector suffix is part of the id, because a topic can legitimately
    // set the same property on the element and on its `::before`.
    const selPart = st.sel ? `-${st.sel.replace(/[^a-z]/g, "")}` : "";
    const id = `${slug}-${st.prop.replace(/^--/, "var-")}${selPart}`;
    const start = ruleText(root, topic.steps, i + 1, true);
    const done = ruleText(root, topic.steps, i + 1, false);

    // A property the grading frame cannot read back is asserted against the
    // stylesheet text instead. That proves the rule was written, not that it
    // took effect - the same limit the hand-authored steps accept.
    // The label is what the learner reads beside a passing or failing check,
    // so it names the thing on screen and what changed about it. Built from
    // the topic's noun rather than its label, which describes the lesson
    // ("spacing inside a card") and reads wrong in a sentence about a result.
    const label = `The ${topic.noun} ${VERBS[st.prop] ?? "is set to"} ${st.readable}`;

    const test = st.check === "source"
      ? `{ id: "${id}-set", kind: "source-matches", file: "styles.css", pattern: "${st.pattern}", flags: "i", because: "${st.because}", label: "${label}" }`
      : `{ id: "${id}-set", kind: "style", selector: ".${root}", prop: "${st.readProp ?? st.prop}", equals: "${st.computed}", readable: "${st.readable}", label: "${label}" }`;

    stepLines.push(`    ${S}({ id: "${id}", task: "${st.task}", inputMode: "guided", files: ${SOLVED}("${q(start)}"), activeFile: "styles.css", highlightToken: "${st.prop}: ;", tests: [${test}], hints: [{ level: 1, text: "${st.hint1}" }, { level: 2, text: "${st.hint2}" }], xp: ${st.check === "source" ? 55 : 45} }),`);
    refLines.push(`  "${id}": { estimatedMinutes: 4, solution: ${SOLVED}("${q(done)}") },`);
  });

  return {
    bodies,
    steps: stepLines.join("\n") + "\n",
    references: refLines.join("\n") + "\n",
    factory: `const ${S} = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(\`Missing reference data for CSS step: \${step.id}\`); return { ...step, ...reference, index: ++n, kind: "web", projectId: ${P} }; };\n`,
    projectConst: `const ${P} = "${spec.projectId}";\n`,
    projectEntry: `{ id: ${P}, title: "${spec.projectTitle}" }, `,
    num,
    spec,
    topic,
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

  src = insertBefore(src, "\n/** Authored proof for every step.", gen.bodies);
  src = insertBefore(src, "} satisfies Record<string, StepReference>;", gen.references);
  src = insertBefore(src, "\nconst s = (step:", gen.projectConst);
  src = insertBefore(src, "export const cssCourse: Course = {", gen.factory + "\n");

  // This course writes its projects array on one line, so the entry goes in
  // before the closing bracket rather than on a line of its own. The last
  // existing entry has no trailing comma, so one is added here - without it
  // the two entries run together as `}{` and the file stops parsing.
  const projAt = src.indexOf("  projects: [");
  if (projAt === -1) throw new Error("projects array not found");
  const projEnd = src.indexOf("],", projAt);
  if (projEnd === -1) throw new Error("projects array close not found");
  const before = src.slice(0, projEnd).replace(/\s+$/, "");
  const sep = before.endsWith("}") ? ", " : " ";
  src = before + sep + gen.projectEntry.replace(/,\s*$/, "") + src.slice(projEnd);

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
  const msg = `Add Learn CSS project ${gen.num}: ${gen.spec.projectTitle}

Teaches ${gen.topic.label} across five steps, each adding one declaration to
the same rule. Generated by tools/css-author.mjs from a locally served model:
every property, value, and assertion comes from tools/css-topics.mjs, and the
model supplied only the words inside the fixture.

Course is now at ${steps} steps.

Co-Authored-By: Den Jansen Flores <floresjansen28@gmail.com>
`;
  const f = join(REPO, ".git", "CSS_AUTHOR_MSG");
  writeFileSync(f, msg, "utf8");
  run("git", ["commit", "-F", JSON.stringify(f)]);
}

function logPass(gen, steps) {
  const entry = `\n---\n\n## ${new Date().toISOString().slice(0, 10)} - CSS course, project ${gen.num} (local model)\n\n**What got made:** ${gen.spec.projectTitle}, five steps teaching ${gen.topic.label}.\n\n**How:** \`tools/css-author.mjs\` with \`${MODEL}\` served locally. Properties, values, and assertions are curated in \`tools/css-topics.mjs\`; the model wrote only the words in the fixture. CSS is stricter than HTML about this because the tests compare against exactly what \`getComputedStyle\` returns, so an invented value produces a step whose test can never pass.\n\n**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in \`PENDING_QA.md\` per the owner ruling of 2026-08-25. Course is at ${steps} steps.\n`;
  writeFileSync(LOG, readFileSync(LOG, "utf8") + entry, "utf8");
}

/* ------------------------------------------------------------------ */
/* The loop                                                            */
/* ------------------------------------------------------------------ */

async function onePass(passNo) {
  const state = readCourseState();

  // Always the least-practised topic, and nothing at all once every topic has
  // had ROUNDS turns. Repeating a lesson in a new setting past that point is
  // padding, which PLAN.md decision 38 exists to refuse.
  const [leastId, leastCount] = [...state.topicCounts.entries()].sort((a, b) => a[1] - b[1])[0];
  if (leastCount >= ROUNDS) {
    return { done: true, reason: `every topic has ${ROUNDS} projects; the course is covered` };
  }
  const topic = CSS_TOPICS.find((t) => t.id === leastId);
  const fixture = CSS_FIXTURES[topic.fixture];
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
    if (!KEEP_FAILED) revert();
    return { ok: false, reason: `${gates.where} failed` };
  }

  const steps = stepCount();
  logPass(gen, steps);
  commit(gen, steps);
  return { ok: true, steps };
}

async function main() {
  if (existsSync(STOP)) { console.log("STOP_LOOP exists. Remove it to start."); process.exit(0); }

  console.log("CodeDaddy CSS authoring loop");
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
