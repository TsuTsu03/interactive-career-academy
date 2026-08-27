/**
 * local-author.mjs - authoring loop driven by a locally served model.
 *
 * WHY THIS EXISTS, AND WHY IT IS NOT A GENERAL AGENT
 *
 * The first attempt pointed `codex exec` at LM Studio. It failed for a reason
 * no better prompt fixes: codex's own system prompt is ~24,000 tokens before
 * the task is added, and it expects a model that can drive a full tool-calling
 * agent loop. A 4B-7B model on a 6 GB card has neither the context to hold
 * that nor the reliability to sustain it. The 7B narrated its intentions and
 * made zero tool calls; the 4B never got past reconnecting.
 *
 * So this script inverts the split. The model is never asked to write
 * TypeScript, edit files, or decide what to do next. It is asked for one small
 * JSON object describing one lesson: which Filipino scene, which HTML element,
 * what wording. Everything structural - the step factory, the slot constants,
 * the body chain, the test specs, the concept entry, the insertion points - is
 * generated deterministically by the code below, which cannot drift.
 *
 * That is the whole trick. The model does the part where being slightly
 * different every time is the point, and never touches the part where being
 * exactly right every time is the point.
 *
 * WHAT IT PRODUCES
 *
 * One five-step HTML project per pass, in the shape projects 25 through 27
 * already use: heading slot, heading text, intro sentence, the new element,
 * the new element's text. Plus one concept entry carrying all four
 * representations PLAN.md section 5 requires.
 *
 * SAFETY
 *
 * Every pass is verified before it is kept. tsc and eslint must both pass, and
 * a generated project whose element or concept already exists is rejected
 * before it is ever written. A failed pass is reverted whole - never left
 * half-applied for the next pass to build on.
 *
 * USAGE
 *
 *   node tools/local-author.mjs                 # run until STOP_LOOP appears
 *   node tools/local-author.mjs --passes 1      # one pass, for inspection
 *   node tools/local-author.mjs --dry-run       # generate and print, write nothing
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const WEB = join(REPO, "apps", "web");
const COURSE = join(WEB, "content", "html-course.ts");
const CONCEPTS = join(WEB, "content", "concepts.ts");
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

/* ------------------------------------------------------------------ */
/* Reading the current state of the course                             */
/* ------------------------------------------------------------------ */

/**
 * Everything the generator needs to know about where the course currently is.
 * Derived from the file itself rather than tracked separately, so the loop
 * cannot lose its place when it is interrupted.
 */
function readCourseState() {
  const src = readFileSync(COURSE, "utf8");

  const projectIds = [...src.matchAll(/const PROJECT_(\d+)_ID = "([^"]+)"/g)];
  if (projectIds.length === 0) throw new Error("No PROJECT_N_ID constants found.");
  const lastNum = Math.max(...projectIds.map((m) => Number(m[1])));

  // What the course TEACHES, which is narrower than what appears in it. An
  // earlier version matched every `<tag` anywhere in the file, which excluded
  // `<p>` and `<span>` for merely being present in body markup and pushed the
  // model down the list into elements no beginner needs. A tag counts as
  // taught when a step makes the learner produce it or asserts against it.
  const taughtTags = new Set();
  for (const m of src.matchAll(/correctBlock: "<([a-z][a-z0-9]*)>/g)) taughtTags.add(m[1]);
  for (const m of src.matchAll(/selector: "([^"]+)"/g)) {
    for (const part of m[1].split(/[\s>+~,]+/)) {
      const tag = part.match(/^([a-z][a-z0-9]*)/);
      if (tag) taughtTags.add(tag[1]);
    }
  }

  const conceptSrc = readFileSync(CONCEPTS, "utf8");
  const conceptIds = new Set([...conceptSrc.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map((m) => m[1]));

  // Concept ids do not reliably contain the tag name, so also index the words
  // used in each concept's term and definition.
  const conceptWords = new Set();
  for (const m of conceptSrc.matchAll(/^\s+(?:term|definition): "([^"]+)"/gm)) {
    for (const w of m[1].toLowerCase().split(/[^a-z0-9]+/)) if (w) conceptWords.add(w);
  }

  return { src, conceptSrc, nextNum: lastNum + 1, taughtTags, conceptIds, conceptWords };
}

/* ------------------------------------------------------------------ */
/* Asking the model                                                    */
/* ------------------------------------------------------------------ */

/**
 * The prompt is deliberately tiny. Every token spent explaining the repo is a
 * token the model does not have left for the answer, and none of the repo's
 * structure is the model's problem - the generator handles all of it.
 */
/**
 * Text-bearing HTML elements a beginner course can teach, ordered by how much
 * a beginner actually needs them. Only the first dozen are offered per pass,
 * so this order decides what gets taught next - an alphabetical list put `bdo`
 * near the front and the model duly proposed a lesson on bidirectional text
 * override, which is both useless this early and unglossable jargon.
 *
 * Handing the model a list to pick from works far better than asking it to
 * think of an unused tag: a 7B asked for "an element you have not seen"
 * reaches for the same half-dozen every time.
 */
const TEACHABLE = [
  // Everyday meaning a beginner can see the point of immediately.
  "em", "span", "pre", "output", "section", "hgroup",
  // Table structure, once plain tables are familiar.
  "thead", "tbody", "tfoot", "colgroup",
  // Emphasis and correction with narrower meaning than strong or em.
  "b", "u", "s", "sub", "sup", "dfn", "var",
  // Grouping and fallbacks.
  "menu", "noscript",
  // Narrow meaning; correct to teach, but only once the rest are done.
  "bdi", "bdo", "ruby", "rt", "rp",
];

function buildPrompt({ taughtTags, conceptWords }) {
  const open = TEACHABLE.filter((t) => !taughtTags.has(t) && !conceptWords.has(t));
  if (open.length === 0) {
    throw new Error("every teachable element in the list is already covered; extend TEACHABLE");
  }
  const offered = open.slice(0, 12);
  const avoid = offered.join(", ");

  const system = [
    "You design one small HTML lesson for absolute beginners in the Philippines.",
    "You reply with one JSON object and nothing else. No markdown fence, no explanation.",
  ].join(" ");

  const user = `Design a lesson that teaches ONE HTML element.

Pick the element from this list, and only this list: ${avoid}

The lesson is set in everyday Filipino life: a barangay notice, a sari-sari store,
a palengke stall, a jeepney route, a turo-turo menu, a health centre, a school.

Reply with exactly this JSON shape:

{
  "projectId": "barangay-something",
  "projectTitle": "Barangay Something",
  "slug": "something",
  "heading": "Barangay Something",
  "intro": "One short sentence about the page.",
  "element": "kbd",
  "elementName": "keyboard key",
  "elementText": "The words that go inside the element.",
  "distractors": ["<p></p>", "<span></span>", "<key></key>"],
  "conceptTerm": "kbd element",
  "conceptDefinition": "One sentence saying what the element does.",
  "conceptAnalogy": "One sentence comparing it to something in ordinary life.",
  "conceptProof": "You will mark ... .",
  "diagramAlt": "One sentence describing the picture for a screen reader."
}

Rules:
- "projectId" is lowercase words joined by hyphens, and must not be one already taught.
- "element" must be one of: ${avoid}
- "element" is written lowercase with no angle brackets.
- "distractors" are three WRONG options shown beside the right one. Each is a full
  tag pair like "<p></p>". None may be the correct element.
- Every sentence is plain English, under 20 words, no jargon.
- "elementText" is short, and is what a beginner will type inside the element.`;

  return { system, user, offered };
}

async function askModel(prompt, extraNote) {
  const messages = [
    { role: "system", content: prompt.system },
    { role: "user", content: extraNote ? `${prompt.user}\n\nYour last reply was rejected: ${extraNote}\nTry again.` : prompt.user },
  ];

  const res = await fetch(`${ENDPOINT}/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 1200,
      stream: false,
    }),
  });

  if (!res.ok) throw new Error(`LM Studio returned ${res.status}: ${await res.text()}`);
  const body = await res.json();
  return body.choices?.[0]?.message?.content ?? "";
}

/**
 * Small models wrap JSON in prose or a fence no matter how firmly they are
 * told not to, so pull the first balanced object out rather than trusting the
 * whole reply to parse.
 */
function extractJson(text) {
  const start = text.indexOf("{");
  if (start === -1) throw new Error("no JSON object in reply");
  let depth = 0;
  let inStr = false;
  let esc = false;
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
/* Validating what came back                                           */
/* ------------------------------------------------------------------ */

const VOID_ELEMENTS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr"]);

/**
 * Rejects a spec before anything is written. Every check here is one the
 * authoring harness or the type checker would catch later, moved earlier so a
 * bad reply costs a retry rather than a reverted pass.
 */
function validateSpec(spec, state, offered) {
  const need = ["projectId", "projectTitle", "slug", "heading", "intro", "element",
    "elementName", "elementText", "distractors", "conceptTerm", "conceptDefinition",
    "conceptAnalogy", "conceptProof", "diagramAlt"];
  for (const k of need) {
    if (typeof spec[k] === "undefined" || spec[k] === null) throw new Error(`missing "${k}"`);
  }

  if (!/^[a-z][a-z0-9-]*$/.test(spec.projectId)) throw new Error('"projectId" must be lowercase-hyphenated');
  if (!/^[a-z][a-z0-9]*$/.test(spec.element)) throw new Error('"element" must be a bare lowercase tag name');
  if (VOID_ELEMENTS.has(spec.element)) throw new Error(`"${spec.element}" is a void element and has no text content`);
  if (offered && !offered.includes(spec.element)) {
    throw new Error(`"${spec.element}" was not on the offered list: ${offered.join(", ")}`);
  }
  if (state.taughtTags.has(spec.element)) throw new Error(`"${spec.element}" already appears in the course`);
  if (state.conceptWords.has(spec.element)) throw new Error(`"${spec.element}" is already explained by an existing concept`);

  const conceptId = `${spec.element}-element`;
  if (state.conceptIds.has(conceptId)) throw new Error(`concept "${conceptId}" already exists`);
  if (state.src.includes(`"${spec.projectId}"`)) throw new Error(`project id "${spec.projectId}" is taken`);

  if (!Array.isArray(spec.distractors) || spec.distractors.length !== 3) {
    throw new Error('"distractors" must be exactly three options');
  }
  const correct = `<${spec.element}></${spec.element}>`;
  for (const d of spec.distractors) {
    if (typeof d !== "string" || !d.startsWith("<")) throw new Error(`bad distractor: ${d}`);
    if (d === correct) throw new Error("a distractor repeats the correct answer");
  }

  // The generated tests assert on exact strings, so anything that would need
  // escaping inside a TypeScript literal is refused rather than escaped.
  for (const k of ["projectTitle", "heading", "intro", "elementText", "conceptTerm",
    "conceptDefinition", "conceptAnalogy", "conceptProof", "diagramAlt"]) {
    const v = String(spec[k]);
    if (v.includes('"') || v.includes("\\") || v.includes("\n") || v.includes("`")) {
      throw new Error(`"${k}" contains a quote, backslash, or newline`);
    }
    if (!v.trim()) throw new Error(`"${k}" is empty`);
  }

  if (!/^[a-z][a-z0-9-]*$/.test(spec.slug)) throw new Error('"slug" must be lowercase-hyphenated');
  if (state.src.includes(`id: "${spec.slug}-title"`)) throw new Error(`slug "${spec.slug}" is taken`);

  const words = String(spec.intro).trim().split(/\s+/).length;
  if (words > 20) throw new Error(`"intro" is ${words} words; keep it under 20`);

  return { ...spec, conceptId };
}

/* ------------------------------------------------------------------ */
/* Generating the TypeScript                                           */
/* ------------------------------------------------------------------ */

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const CONST = (slug, suffix) => `${slug.toUpperCase().replace(/-/g, "_")}_${suffix}`;

/**
 * Builds every fragment the course file needs, in the exact shape projects 25
 * through 27 use. Written as one function so the pieces cannot drift out of
 * agreement with each other.
 */
function generate(spec, num) {
  const { slug, element } = spec;
  const P = `PROJECT_${num}_ID`;
  const S = `s${num}`;

  const TITLE_SLOT = CONST(slug, "TITLE_SLOT");
  const TITLE_BODY = CONST(slug, "TITLE_BODY");
  const HEADING_BODY = CONST(slug, "HEADING_BODY");
  const INTRO_BODY = CONST(slug, "INTRO_BODY");
  const ELEM_SLOT = CONST(slug, "ELEMENT_SLOT");
  const ELEM_BODY = CONST(slug, "ELEMENT_BODY");

  const bodies = `
const ${TITLE_SLOT} = slotPage("    @@SLOT@@\\n", "@@SLOT@@");
const ${TITLE_BODY} = \`    <h2></h2>\\n\`;
const ${HEADING_BODY} = \`    <h2>${spec.heading}</h2>\\n\`;
const ${INTRO_BODY} = \`    <h2>${spec.heading}</h2>
    <p>${spec.intro}</p>\\n\`;
const ${ELEM_SLOT} = slotPage(\`\${${INTRO_BODY}}    @@SLOT@@\\n\`, "@@SLOT@@");
const ${ELEM_BODY} = \`\${${INTRO_BODY}}    <${element}></${element}>\\n\`;
`;

  const blocks = JSON.stringify([`<${element}></${element}>`, ...spec.distractors]);

  const steps = `    ${S}({ id: "${slug}-title", task: "Start the ${spec.projectTitle.toLowerCase()} with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": ${TITLE_SLOT}.page, "styles.css": "" }, activeFile: "index.html", slotLine: ${TITLE_SLOT}.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<${element}></${element}>"], correctBlock: "<h2></h2>", tests: [{ id: "${slug}-title-exists", kind: "exists", selector: "h2", label: "The page has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    ${S}({ id: "${slug}-heading", task: "Name the heading ${spec.heading}.", inputMode: "guided", files: solved(${TITLE_BODY}), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "${slug}-heading-text", kind: "text-equals", selector: "h2", value: "${spec.heading}", label: "The page has its name" }], hints: [{ level: 1, text: "Write the page name between the heading tags." }, { level: 2, text: "Use ${spec.heading} exactly." }], xp: 40 }),
    ${S}({ id: "${slug}-copy", task: "Add the opening sentence below the heading.", inputMode: "guided", files: solved(${HEADING_BODY}), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "${slug}-copy-text", kind: "text-equals", selector: "p", value: "${spec.intro}", label: "The opening sentence is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write ${spec.intro}" }], xp: 40 }),
    ${S}({ id: "${slug}-${element}", task: "Add a place for the ${spec.elementName}.", inputMode: "tap-to-build", files: { "index.html": ${ELEM_SLOT}.page, "styles.css": "" }, activeFile: "index.html", slotLine: ${ELEM_SLOT}.slotLine, blocks: ${blocks}, correctBlock: "<${element}></${element}>", conceptIds: ["${spec.conceptId}"], tests: [{ id: "${slug}-${element}-exists", kind: "exists", selector: "${element}", label: "The ${spec.elementName} has a place" }], hints: [{ level: 1, text: "Add the element that marks a ${spec.elementName}." }, { level: 2, text: "Use ${element} for the ${spec.elementName}." }], xp: 50 }),
    ${S}({ id: "${slug}-${element}-text", task: "Write ${spec.elementText} inside it.", inputMode: "guided", files: solved(${ELEM_BODY}), activeFile: "index.html", highlightToken: "<${element}></${element}>", tests: [{ id: "${slug}-${element}-text-set", kind: "text-equals", selector: "${element}", value: "${spec.elementText}", label: "The ${spec.elementName} shows its words" }], hints: [{ level: 1, text: "Write the words inside the ${element} tags." }, { level: 2, text: "Use ${spec.elementText} exactly." }], xp: 40 }),
`;

  // Tap-to-build steps use solvedSlot so the reference solution is the slot
  // page with the block already dropped in, which is what the learner produces
  // by tapping. Using solved() here would assert a differently indented file.
  const references = `  "${slug}-title": { estimatedMinutes: 4, solution: solvedSlot(${TITLE_SLOT}, "<h2></h2>") },
  "${slug}-heading": { estimatedMinutes: 4, solution: solved(${HEADING_BODY}) },
  "${slug}-copy": { estimatedMinutes: 4, solution: solved(${INTRO_BODY}) },
  "${slug}-${element}": { estimatedMinutes: 5, solution: solvedSlot(${ELEM_SLOT}, "<${element}></${element}>") },
  "${slug}-${element}-text": { estimatedMinutes: 4, solution: solved(\`\${${INTRO_BODY}}    <${element}>${spec.elementText}</${element}>\\n\`) },
`;

  const factory = `const ${S} = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: ${P} };
};
`;

  const projectConst = `const ${P} = "${spec.projectId}";\n`;
  const projectEntry = `    { id: ${P}, title: "${spec.projectTitle}" },\n`;

  const concept = `  "${spec.conceptId}": {
    id: "${spec.conceptId}",
    term: "${spec.conceptTerm}",
    definition: "${spec.conceptDefinition}",
    analogy: "${spec.conceptAnalogy}",
    visual: { kind: "diagram", diagram: { alt: "${spec.diagramAlt}", columns: 3, nodes: [{ id: "words", label: "${spec.elementText}", note: "plain words", tone: "ghost" }, { id: "tag", label: "${element}", note: "${spec.elementName}", tone: "accent" }, { id: "result", label: "${cap(spec.elementName)}", note: "shown to readers", tone: "box" }], arrows: [{ from: "words", to: "tag" }, { from: "tag", to: "result" }] } },
    proof: "${spec.conceptProof}",
  },
`;

  return { bodies, steps, references, factory, projectConst, projectEntry, concept, num, spec };
}

/* ------------------------------------------------------------------ */
/* Applying it                                                         */
/* ------------------------------------------------------------------ */

/**
 * Inserts `text` immediately before `anchor`, which must appear exactly once.
 * Requiring uniqueness is the point: a silently wrong insertion point produces
 * a file that still compiles but teaches the wrong thing, which the gates
 * would not catch.
 */
function insertBefore(src, anchor, text) {
  const first = src.indexOf(anchor);
  if (first === -1) throw new Error(`anchor not found: ${anchor}`);
  if (src.indexOf(anchor, first + 1) !== -1) throw new Error(`anchor is not unique: ${anchor}`);
  return src.slice(0, first) + text + src.slice(first);
}

const REFERENCES_CLOSE = "} satisfies Record<string, StepReference>;";
const COURSE_EXPORT = "export const htmlCourse: Course = {";

function apply(gen) {
  let src = readFileSync(COURSE, "utf8");

  // Bodies and slots first, immediately above the reference table, because the
  // reference entries below refer to them.
  src = insertBefore(src, "\nconst references = {", gen.bodies);

  // Reference entries, at the end of the reference table.
  src = insertBefore(src, REFERENCES_CLOSE, gen.references);

  // Project id constant, beside the others. PROJECT_ID has no number and is
  // always last in the block, so anchor on the blank line before the factories.
  src = insertBefore(src, "\nconst s = (step:", `${gen.projectConst}`);

  // Step factory, after the last one and before the course export.
  src = insertBefore(src, COURSE_EXPORT, gen.factory + "\n");

  // Project entry, at the end of the projects array. The array is the only
  // thing between `projects: [` and the next `  ],`.
  const projOpen = src.indexOf("  projects: [\n");
  if (projOpen === -1) throw new Error("projects array not found");
  const projClose = src.indexOf("\n  ],", projOpen);
  if (projClose === -1) throw new Error("projects array close not found");
  src = src.slice(0, projClose + 1) + gen.projectEntry + src.slice(projClose + 1);

  // Steps, at the end of the steps array, which is the last array in the file.
  const stepsOpen = src.indexOf("  steps: [\n");
  if (stepsOpen === -1) throw new Error("steps array not found");
  const stepsClose = src.indexOf("\n  ],", stepsOpen);
  if (stepsClose === -1) throw new Error("steps array close not found");
  src = src.slice(0, stepsClose + 1) + gen.steps + src.slice(stepsClose + 1);

  writeFileSync(COURSE, src, "utf8");

  // The concept registry closes with the only `\n};\n` that is followed by the
  // helper functions, so anchor on the registry's own closing brace.
  let cs = readFileSync(CONCEPTS, "utf8");
  const csOpen = cs.indexOf("export const concepts: Record<string, Concept> = {");
  if (csOpen === -1) throw new Error("concept registry not found");
  const csClose = cs.indexOf("\n};", csOpen);
  if (csClose === -1) throw new Error("concept registry close not found");
  cs = cs.slice(0, csClose + 1) + gen.concept + cs.slice(csClose + 1);
  writeFileSync(CONCEPTS, cs, "utf8");
}

/* ------------------------------------------------------------------ */
/* Verifying and committing                                            */
/* ------------------------------------------------------------------ */

function run(cmd, cmdArgs, cwd = REPO) {
  return execFileSync(cmd, cmdArgs, { cwd, stdio: "pipe", encoding: "utf8", shell: true });
}

function gatesPass() {
  try {
    run("npx", ["tsc", "--noEmit"], WEB);
  } catch (e) {
    return { ok: false, where: "tsc", out: String(e.stdout || e.message).slice(0, 1500) };
  }
  try {
    run("npx", ["eslint", "."], WEB);
  } catch (e) {
    return { ok: false, where: "eslint", out: String(e.stdout || e.message).slice(0, 1500) };
  }
  return { ok: true };
}

function revert() {
  try { run("git", ["checkout", "--", "apps/web/content"]); } catch { /* nothing staged */ }
}

function commit(gen, steps) {
  run("git", ["add", "apps/web/content"]);
  const msg = `Add Learn HTML project ${gen.num}: ${gen.spec.projectTitle}

Teaches the ${gen.spec.element} element across five steps, with a concept
entry carrying all four representations. Generated by tools/local-author.mjs
from a locally served model; structure is templated, wording is not.

Course is now at ${steps} steps.

Co-Authored-By: Den Jansen Flores <floresjansen28@gmail.com>
`;
  // Written to a file rather than passed with -m: the message is multi-line,
  // and going through a shell turns its newlines into a literal backslash-n.
  const msgFile = join(REPO, ".git", "LOCAL_AUTHOR_MSG");
  writeFileSync(msgFile, msg, "utf8");
  run("git", ["commit", "-F", JSON.stringify(msgFile)]);
}

function stepCount() {
  const src = readFileSync(COURSE, "utf8");
  return (src.match(/xp: \d+/g) || []).length;
}

function logPass(gen, steps) {
  const entry = `\n---\n\n## ${new Date().toISOString().slice(0, 10)} - HTML course, project ${gen.num} (local model)\n\n**What got made:** ${gen.spec.projectTitle}, five steps teaching the \`${gen.spec.element}\` element, plus the \`${gen.spec.conceptId}\` concept with all four representations.\n\n**How:** \`tools/local-author.mjs\` with \`${MODEL}\` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.\n\n**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in \`PENDING_QA.md\` per the owner ruling of 2026-08-25. Course is at ${steps} steps.\n`;
  writeFileSync(LOG, readFileSync(LOG, "utf8") + entry, "utf8");
}

/* ------------------------------------------------------------------ */
/* The loop                                                            */
/* ------------------------------------------------------------------ */

async function onePass(passNo) {
  const state = readCourseState();
  const prompt = buildPrompt(state);

  let spec = null;
  let note = null;
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const reply = await askModel(prompt, note);
      spec = validateSpec(extractJson(reply), state, prompt.offered);
      break;
    } catch (e) {
      note = e.message;
      console.log(`  attempt ${attempt}/${RETRIES} rejected: ${e.message}`);
      spec = null;
    }
  }
  if (!spec) return { ok: false, reason: "the model did not produce a usable lesson" };

  const gen = generate(spec, state.nextNum);
  console.log(`  project ${gen.num}: ${spec.projectTitle} (<${spec.element}>)`);

  if (DRY_RUN) {
    console.log(gen.steps);
    return { ok: true, dry: true };
  }

  apply(gen);

  const gates = gatesPass();
  if (!gates.ok) {
    console.log(`  ${gates.where} failed, reverting pass ${passNo}:`);
    console.log(gates.out.split("\n").slice(0, 6).map((l) => `    ${l}`).join("\n"));
    revert();
    return { ok: false, reason: `${gates.where} failed` };
  }

  const steps = stepCount();
  logPass(gen, steps);
  commit(gen, steps);
  return { ok: true, steps, title: spec.projectTitle };
}

async function main() {
  if (existsSync(STOP)) {
    console.log("STOP_LOOP exists. Remove it to start.");
    process.exit(0);
  }

  console.log(`CodeDaddy local authoring loop`);
  console.log(`Model:    ${MODEL} at ${ENDPOINT}`);
  console.log(`Passes:   ${MAX_PASSES === Infinity ? "until STOP_LOOP" : MAX_PASSES}`);
  console.log(`Starting: ${stepCount()} steps\n`);

  let consecutiveFailures = 0;

  for (let pass = 1; pass <= MAX_PASSES; pass++) {
    if (existsSync(STOP)) {
      console.log(`\nSTOP_LOOP found. Stopping after ${pass - 1} passes.`);
      break;
    }

    console.log(`--- pass ${pass} ---`);
    let result;
    try {
      result = await onePass(pass);
    } catch (e) {
      result = { ok: false, reason: e.message };
      revert();
    }

    if (result.ok) {
      consecutiveFailures = 0;
      if (!result.dry) console.log(`  committed. ${result.steps} steps.\n`);
    } else {
      consecutiveFailures++;
      console.log(`  pass failed: ${result.reason} (${consecutiveFailures} in a row)\n`);
      // Five failures in a row means the model, the server, or the template is
      // broken. Grinding through 500 of them helps nobody.
      if (consecutiveFailures >= 5) {
        console.log("Five failed passes in a row. Stopping so the cause can be looked at.");
        break;
      }
    }
  }

  console.log(`\nFinished at ${stepCount()} steps.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
