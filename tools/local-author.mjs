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

  const usedProjectIds = new Set(projectIds.map((m) => m[2]));

  // Which combination structures have already been built, so the loop moves
  // through them in order instead of repeating the easiest one.
  const usedCompositions = new Set();
  for (const c of COMPOSITIONS) {
    if (src.includes(`composition: ${c.id}`)) usedCompositions.add(c.id);
  }

  return { src, conceptSrc, nextNum: lastNum + 1, taughtTags, conceptIds, conceptWords, usedProjectIds, usedCompositions };
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
/**
 * Each element ships with the definition the lesson must teach, because the
 * model cannot be trusted to supply it. Left to invent one, a 7B wrote that
 * `<b>` means "bold for emphasis" and compared it to shouting - which is the
 * definition of `<strong>`, and precisely the confusion `<b>` exists to avoid.
 * Wrong content is worse than no content in a course, so the fact is fixed
 * here and the model only writes the scene and the analogy around it.
 *
 * `what` is the definition, near enough to ship after the model rephrases
 * nothing about it. `name` is what the lesson calls it in plain words.
 */
const TEACHABLE = [
  { tag: "em", name: "stressed word", what: "The em element marks a word said with stress, changing the meaning of the sentence." },
  { tag: "span", name: "small piece of text", what: "The span element marks a small piece of text so it can be styled, without giving it any meaning." },
  { tag: "pre", name: "preformatted text", what: "The pre element keeps the spaces and line breaks exactly as they were typed." },
  { tag: "output", name: "calculated result", what: "The output element shows a result the page worked out." },
  { tag: "section", name: "section of a page", what: "The section element groups a part of a page that has its own heading." },
  { tag: "thead", name: "table head", what: "The thead element groups the header rows of a table." },
  { tag: "tbody", name: "table body", what: "The tbody element groups the main rows of a table." },
  { tag: "tfoot", name: "table footer", what: "The tfoot element groups the summary rows of a table, such as a total." },
  { tag: "b", name: "keyword", what: "The b element draws attention to words without saying they are more important." },
  { tag: "u", name: "marked word", what: "The u element marks a word that is spelled wrong or needs attention, shown underlined." },
  { tag: "s", name: "no longer true", what: "The s element marks text that is no longer true or no longer available." },
  { tag: "sub", name: "subscript", what: "The sub element lowers text below the line, used in chemical formulas like H2O." },
  { tag: "sup", name: "superscript", what: "The sup element raises text above the line, used in things like 1st and footnote marks." },
  { tag: "dfn", name: "term being defined", what: "The dfn element marks the word a sentence is defining." },
  { tag: "var", name: "variable name", what: "The var element marks the name of a value that can change." },
  { tag: "menu", name: "list of commands", what: "The menu element holds a list of buttons or commands." },
  { tag: "bdi", name: "isolated name", what: "The bdi element keeps a name written in another writing direction from disturbing the text around it." },
];

/**
 * Settings to rotate through. Left to choose freely, the model proposed
 * "barangay-water-bill" and "sari-sari-store" on nearly every pass and burned
 * its retries colliding with ids it had already used.
 */
const SETTINGS = [
  "a sari-sari store price list", "a barangay health centre notice",
  "a jeepney route board", "a palengke fish stall sign", "a turo-turo menu",
  "a barangay basketball league schedule", "a school supply list",
  "a tricycle fare table", "a bakery order slip", "a water refill station notice",
  "a barangay clean-up announcement", "a computer shop rate card",
  "a fiesta programme", "a rice retailer price board", "a laundry shop receipt",
  "a pharmacy stock list", "a barangay ID application notice",
];

/**
 * Asks the model for the text a combination project needs, and nothing else.
 * The structure comes from COMPOSITIONS; only the words are open.
 */
function buildCombinationPrompt(comp, setting, usedCompositions) {
  const slots = comp.nodes
    .map((n, i) => (n.text ? `  "t${i}": "${n.text}"` : null))
    .filter(Boolean)
    .join(",\n");

  const system = [
    "You write the words for one small HTML lesson for beginners in the Philippines.",
    "You reply with one JSON object and nothing else. No markdown fence, no explanation.",
  ].join(" ");

  const user = `A page is being built: a ${comp.label}, set in ${setting}.

Write the words that go in it. Reply with exactly this shape, replacing each
description with real words for that setting:

{
${slots}
}

Rules:
- Every value is short. A heading is a few words; a sentence is under 15 words.
- Plain English only. No Tagalog. No HTML tags, no angle brackets.
- Make the words fit ${setting} specifically, not a generic page.
- Do not use a double quote or a backslash anywhere.`;

  return { system, user, comp, setting, mode: "combination", usedCompositions };
}

function buildPrompt(state) {
  const { taughtTags, conceptWords, usedProjectIds } = state;
  const open = TEACHABLE.filter((e) => !taughtTags.has(e.tag) && !conceptWords.has(e.tag));

  // Rotate the setting by how many projects exist, so consecutive passes are
  // pushed apart rather than left to the model's own narrow preferences.
  const setting = SETTINGS[usedProjectIds.size % SETTINGS.length];
  const takenNote = [...usedProjectIds].slice(-14).join(", ");

  // Elements run out; combinations do not, because the same structure taught
  // in a different setting is still practice. Once every element in TEACHABLE
  // is covered the loop switches to assembling them, cycling the compositions
  // from simplest to hardest and starting the cycle again in a new setting.
  if (open.length === 0) {
    const done = state.usedCompositions;
    const next = COMPOSITIONS.find((c) => !done.has(c.id))
      ?? COMPOSITIONS[done.size % COMPOSITIONS.length];
    return buildCombinationPrompt(next, setting, done);
  }

  // One element per pass rather than a menu. Choosing is a decision the list's
  // order already made, and a model given twelve options spends its attention
  // on picking instead of on writing.
  const target = open[0];

  const system = [
    "You write one small HTML lesson for absolute beginners in the Philippines.",
    "You reply with one JSON object and nothing else. No markdown fence, no explanation.",
  ].join(" ");

  const user = `Write a lesson that teaches the HTML element named ${target.tag}.

What it means: ${target.what}

Do not change what the element means. That sentence is the truth you are
teaching. Your job is to put it in a Filipino setting and explain it warmly.

Set it here: ${setting}. Show ${target.tag} being genuinely useful there.

These names are already used. Do not reuse any of them: ${takenNote}

Reply with exactly this JSON shape:

{
  "projectId": "barangay-water-bill",
  "projectTitle": "Barangay Water Bill",
  "slug": "water-bill",
  "heading": "Barangay Water Bill",
  "intro": "One short sentence about what this page shows.",
  "elementText": "The exact short words that go inside <${target.tag}>.",
  "distractors": ["<p></p>", "<div></div>", "<note></note>"],
  "conceptAnalogy": "Something from ordinary Filipino life that works the same way.",
  "conceptProof": "You will mark the words ... on the ... .",
  "diagramAlt": "One sentence describing the picture for a screen reader."
}

Rules:
- "projectId" and "slug" are lowercase words joined by hyphens, and must be about
  your chosen setting, not about the element.
- "distractors" are three WRONG tag options shown beside the right one. Write each
  as a full tag pair. None may be the ${target.tag} tag.
- "conceptAnalogy" must be a real thing from ordinary life, not a restatement.
  Do not repeat the sentence above in other words. Do not write any HTML in it.
  Do not compare it to shouting or importance unless that is what it means.
- "elementText" is short and is exactly what a beginner types inside the element.
- Every sentence is plain English, under 20 words, no jargon.
- Never write < or > in any sentence. Write ${target.tag} as a plain word.
- Write in English only.`;

  return { system, user, target, setting, mode: "element" };
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
 * Tagalog words that must not appear in learner copy. Deliberately excludes
 * the Filipino nouns the curriculum is built on - barangay, sari-sari,
 * palengke, jeepney, turo-turo, adobo, sinigang - which are the subject matter
 * decision 25 asks for, not a second language.
 */
const TAGALOG = /\b(?:ang|mga|nang|iyong|ito|iyan|iyon|dito|diyan|doon|kayo|kami|tayo|natin|namin|ninyo|nila|niya|ako|ikaw|siya|hindi|wala|meron|mayroon|marami|konti|importante|mahalaga|paalala|babala|bayad|bayaran|presyo|halaga|libre|bagong|luma|maganda|mabuti|masama|malaki|maliit|mabilis|mabagal|salamat|paki|pakiusap|kailangan|puwede|pwede|dapat|gusto|ayaw|alam|kilala|tanong|sagot|tulong|trabaho|bahay|paaralan|simbahan|palengke_|umaga|hapon|gabi|araw|bukas|kahapon|ngayon|linggo|buwan|taon)\b/i;

/**
 * Rejects a spec before anything is written. Every check here is one the
 * authoring harness or the type checker would catch later, moved earlier so a
 * bad reply costs a retry rather than a reverted pass.
 */
/**
 * Builds a free project id and slug from the setting it was given.
 *
 * The model was asked for these and told which were taken, and still proposed
 * "barangay-water-bill" on pass after pass until the loop gave up. Identifiers
 * are computable, so they are computed: nothing is gained by asking an
 * unreliable component for something deterministic code can settle.
 */
function deriveIds(setting, element, used, src) {
  const words = setting.toLowerCase().replace(/^(a|an|the) /, "").split(/[^a-z]+/).filter(Boolean);
  // Try progressively more of the setting's own words before falling back to
  // a number. Appending the tag name instead produced "Sari Sari Store Tfoot"
  // as a project title, which puts jargon in front of the learner in the one
  // place the course has to stay plain.
  const candidates = [];
  for (let take = 3; take <= words.length; take++) candidates.push(words.slice(0, take).join("-"));
  for (let i = 2; i <= 20; i++) candidates.push(`${words.slice(0, 3).join("-")}-${i}`);

  for (const candidate of candidates) {
    const slug = candidate.split("-").slice(-2).join("-");
    if (!used.has(candidate) && !src.includes(`id: "${slug}-title"`)) {
      // The title comes from the setting too. Left to the model it kept
      // answering "Barangay Water Bill" whatever setting it was handed, which
      // produced a project called that under the id "pharmacy-stock-list".
      const projectTitle = candidate.split("-").map((w) =>
        w === "id" ? "ID" : w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      return { projectId: candidate, slug, projectTitle, heading: projectTitle };
    }
  }
  throw new Error(`could not derive a free id from "${setting}"`);
}

/**
 * Checks the text a combination project needs. Only the words come from the
 * model here - the structure, ids, and title are all computed - so this is
 * shorter than validateSpec and mostly guards the strings themselves.
 */
function validateCombination(raw, state, prompt) {
  const { comp, setting } = prompt;
  const ids = deriveIds(`${setting} ${comp.id}`, comp.id, state.usedProjectIds, state.src);

  const texts = [];
  for (let i = 0; i < comp.nodes.length; i++) {
    if (!comp.nodes[i].text) { texts.push(null); continue; }

    let v = raw[`t${i}`];
    if (typeof v !== "string" || !v.trim()) throw new Error(`missing text for "t${i}" (${comp.nodes[i].text})`);

    // Same cleanup as the element path: strip markup rather than reject it.
    v = v.replace(/<\/?([a-z][a-z0-9]*)\s*\/?>/gi, "$1").replace(/[<>]/g, "").trim();

    if (/["\\`\n]/.test(v)) throw new Error(`"t${i}" contains a quote, backslash, or newline`);
    const hit = v.match(TAGALOG);
    if (hit) throw new Error(`"t${i}" contains Tagalog ("${hit[0]}"); write in English`);
    if (v.split(/\s+/).length > 15) throw new Error(`"t${i}" is over 15 words`);

    texts.push(v);
  }

  return { ...ids, texts, element: comp.nodes[0].tag };
}

function validateSpec(raw, state, target, setting) {
  // The element, its name, its definition, the concept term, and the
  // identifiers all come from code, never from the reply. The model is trusted
  // only with the wording and the analogy.
  const ids = deriveIds(setting, target.tag, state.usedProjectIds, state.src);
  const spec = {
    ...raw,
    ...ids,
    element: target.tag,
    elementName: target.name,
    conceptTerm: `${target.tag} element`,
    conceptDefinition: target.what,
  };

  const need = ["intro",
    "elementText", "distractors", "conceptAnalogy", "conceptProof", "diagramAlt"];
  for (const k of need) {
    if (typeof spec[k] === "undefined" || spec[k] === null) throw new Error(`missing "${k}"`);
  }

  if (!/^[a-z][a-z0-9-]*$/.test(spec.projectId)) throw new Error('"projectId" must be lowercase-hyphenated');
  if (VOID_ELEMENTS.has(spec.element)) throw new Error(`"${spec.element}" is a void element and has no text content`);

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

  // Learner-facing copy is prose, not markup. A raw tag here renders as
  // literal text in the concept card, and the model reaches for one whenever
  // it is asked to talk about an element.
  const learnerCopy = ["conceptAnalogy", "conceptProof", "intro", "elementText",
    "heading", "projectTitle"];

  // The model writes `<em>` into prose no matter how the prompt is worded, and
  // the JSON example it is shown has to contain tags for the distractor field,
  // so it always has one in view. Rejecting this burned every retry on a
  // mistake code can simply undo: strip the brackets and keep the sentence.
  for (const k of learnerCopy) {
    if (typeof spec[k] === "string") {
      spec[k] = spec[k].replace(/<\/?([a-z][a-z0-9]*)\s*\/?>/gi, "$1").replace(/[<>]/g, "").trim();
    }
  }

  // PLAN.md decision 10: English only. The Filipino setting is the subject
  // matter, not the language - place names and glossed nouns like barangay,
  // palengke, and turo-turo are the point, but Tagalog sentences are not.
  // Asked to write about Filipino life, the model slips into Tagalog on its
  // own: one early draft told the learner to mark the word "importante".
  for (const k of learnerCopy) {
    const hit = String(spec[k]).match(TAGALOG);
    if (hit) throw new Error(`"${k}" contains Tagalog ("${hit[0]}"); write in English`);
  }

  // An analogy that restates the definition teaches nothing twice. Compare on
  // content words: heavy overlap means the model paraphrased instead of
  // reaching for something from ordinary life.
  const contentWords = (s) => new Set(String(s).toLowerCase().match(/[a-z]{4,}/g) || []);
  const defWords = contentWords(spec.conceptDefinition);
  const anaWords = contentWords(spec.conceptAnalogy);
  if (anaWords.size === 0) throw new Error('"conceptAnalogy" has no content');
  const shared = [...anaWords].filter((w) => defWords.has(w)).length;
  if (shared / anaWords.size > 0.5) {
    throw new Error('"conceptAnalogy" restates the definition; compare it to something in ordinary life instead');
  }

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
/* ------------------------------------------------------------------ */
/* Combination projects                                                */
/* ------------------------------------------------------------------ */

/**
 * Structures built from elements the course has already taught, ordered by how
 * much the learner has to hold in their head at once.
 *
 * These exist because teaching one new element per project has an end: HTML has
 * a finite number of elements and this course reached it at 79. Knowing what a
 * `ul` is and being able to nest one inside a `section` under its own heading
 * are different skills, and only the first was ever practised. Decision 38 sizes
 * a course by coverage, and combination is the part of HTML coverage that the
 * element-per-project shape could not reach.
 *
 * `parent` is an index into the same array, or -1 for the outermost node. Steps
 * are generated in this order, one node each, so the order is also the
 * difficulty curve.
 */
const COMPOSITIONS = [
  {
    id: "notice-card", label: "notice card",
    nodes: [
      { tag: "section", parent: -1 },
      { tag: "h2", parent: 0, text: "the card heading" },
      { tag: "p", parent: 0, text: "one sentence of detail" },
    ],
  },
  {
    id: "dated-notice", label: "dated notice",
    nodes: [
      { tag: "article", parent: -1 },
      { tag: "h2", parent: 0, text: "the notice heading" },
      { tag: "p", parent: 0, text: "one sentence of detail" },
      { tag: "footer", parent: 0 },
      { tag: "small", parent: 3, text: "who posted the notice" },
    ],
  },
  {
    id: "checklist", label: "checklist",
    nodes: [
      { tag: "section", parent: -1 },
      { tag: "h2", parent: 0, text: "the list heading" },
      { tag: "ul", parent: 0 },
      { tag: "li", parent: 2, text: "the first item" },
      { tag: "li", parent: 2, text: "the second item" },
      { tag: "li", parent: 2, text: "the third item" },
    ],
  },
  {
    id: "captioned-figure", label: "captioned figure",
    nodes: [
      { tag: "section", parent: -1 },
      { tag: "h2", parent: 0, text: "the section heading" },
      { tag: "figure", parent: 0 },
      { tag: "blockquote", parent: 2, text: "something a person said" },
      { tag: "figcaption", parent: 2, text: "who said it" },
    ],
  },
  {
    id: "summary-table", label: "table with a summary row",
    nodes: [
      { tag: "table", parent: -1 },
      { tag: "caption", parent: 0, text: "what the table lists" },
      { tag: "thead", parent: 0 },
      { tag: "tr", parent: 2 },
      { tag: "th", parent: 3, text: "the first column name" },
      { tag: "th", parent: 3, text: "the second column name" },
      { tag: "tbody", parent: 0 },
      { tag: "tr", parent: 6 },
      { tag: "td", parent: 7, text: "the first value" },
      { tag: "td", parent: 7, text: "the second value" },
    ],
  },
  {
    id: "nested-sections", label: "page with two sections",
    nodes: [
      { tag: "main", parent: -1 },
      { tag: "h1", parent: 0, text: "the page name" },
      { tag: "section", parent: 0 },
      { tag: "h2", parent: 2, text: "the first section heading" },
      { tag: "p", parent: 2, text: "one sentence for the first section" },
      { tag: "section", parent: 0 },
      { tag: "h2", parent: 5, text: "the second section heading" },
      { tag: "p", parent: 5, text: "one sentence for the second section" },
    ],
  },
  {
    id: "described-list", label: "list of terms and meanings",
    nodes: [
      { tag: "section", parent: -1 },
      { tag: "h2", parent: 0, text: "the list heading" },
      { tag: "dl", parent: 0 },
      { tag: "dt", parent: 2, text: "the first term" },
      { tag: "dd", parent: 2, text: "what the first term means" },
      { tag: "dt", parent: 2, text: "the second term" },
      { tag: "dd", parent: 2, text: "what the second term means" },
    ],
  },
];

/**
 * Plain words for the tags a combination project uses. The first draft wrote
 * "Add a h2 inside the section", which is both ungrammatical and jargon in the
 * one place the course promises not to use any - the hand-authored steps say
 * "heading", not "h2". The tag name still appears in the level-2 hint, where
 * the learner has already been told what to look for.
 */
const TAG_NAMES = {
  section: "section", article: "notice", main: "page body", footer: "footer",
  h1: "page title", h2: "heading", h3: "smaller heading",
  p: "paragraph", small: "small print", ul: "list", ol: "numbered list",
  li: "list item", dl: "list of terms", dt: "term", dd: "meaning",
  table: "table", caption: "table title", thead: "header rows",
  tbody: "main rows", tr: "row", th: "column name", td: "value",
  figure: "figure", figcaption: "figure caption", blockquote: "quotation",
};

const plain = (tag) => TAG_NAMES[tag] ?? tag;

/** Depth of a node, used only to indent the generated markup readably. */
function depthOf(nodes, i) {
  let d = 0;
  for (let p = nodes[i].parent; p !== -1; p = nodes[p].parent) d++;
  return d;
}

/**
 * A CSS selector that reaches exactly one node. Siblings sharing a tag get an
 * `:nth-of-type`, so the second `li` in a list is assertable on its own - the
 * whole point of a combination step is that position carries meaning.
 */
function selectorFor(nodes, i) {
  const chain = [];
  for (let k = i; k !== -1; k = nodes[k].parent) {
    const twins = nodes.filter((n, j) => j <= i && n.parent === nodes[k].parent && n.tag === nodes[k].tag);
    const part = twins.length > 1 ? `${nodes[k].tag}:nth-of-type(${twins.indexOf(nodes[k]) + 1})` : nodes[k].tag;
    chain.unshift(part);
  }
  return chain.join(" ");
}

/** Renders the markup with the first `upTo` nodes present. */
function renderBody(nodes, upTo, texts, indent = "    ") {
  const lines = [];
  const emit = (i) => {
    const pad = indent + "  ".repeat(depthOf(nodes, i));
    const kids = nodes.map((n, j) => (n.parent === i && j < upTo ? j : -1)).filter((j) => j !== -1);
    const text = nodes[i].text ? (texts[i] ?? "") : "";
    if (kids.length === 0) {
      lines.push(`${pad}<${nodes[i].tag}>${text}</${nodes[i].tag}>`);
      return;
    }
    lines.push(`${pad}<${nodes[i].tag}>`);
    if (text) lines.push(`${pad}  ${text}`);
    for (const k of kids) emit(k);
    lines.push(`${pad}</${nodes[i].tag}>`);
  };
  for (let i = 0; i < upTo; i++) if (nodes[i].parent === -1) emit(i);
  return lines.join("\\n") + "\\n";
}

/**
 * Builds a project that assembles a structure out of elements already taught.
 *
 * One step per node. The first is tap-to-build so the learner picks the
 * container; the rest are guided, because by this point the question is not
 * which tag to use but where it belongs.
 */
function generateCombination(spec, num, comp) {
  const { slug } = spec;
  const P = `PROJECT_${num}_ID`;
  const S = `s${num}`;
  const nodes = comp.nodes;
  const texts = spec.texts;

  const B = (i) => CONST(slug, `B${i}`);
  const ROOT_SLOT = CONST(slug, "ROOT_SLOT");

  // One body constant per node, each the page as it stands after that step.
  // The marker is how readCourseState knows this structure has been built, so
  // the next pass moves on to a harder one instead of repeating this.
  const bodyLines = [
    `/* composition: ${comp.id} */`,
    `const ${ROOT_SLOT} = slotPage("    @@SLOT@@\\n", "@@SLOT@@");`,
  ];
  for (let i = 1; i <= nodes.length; i++) {
    bodyLines.push(`const ${B(i)} = \`${renderBody(nodes, i, texts)}\`;`);
  }
  const bodies = "\n" + bodyLines.join("\n") + "\n";

  const root = nodes[0].tag;
  const distractors = ["<div></div>", "<p></p>", "<span></span>"].filter((d) => !d.includes(`<${root}>`));
  const blocks = JSON.stringify([`<${root}></${root}>`, ...distractors.slice(0, 3)]);

  const stepLines = [];
  const refLines = [];

  stepLines.push(`    ${S}({ id: "${slug}-root", task: "Start the ${comp.label}. Add the box that holds everything else.", inputMode: "tap-to-build", files: { "index.html": ${ROOT_SLOT}.page, "styles.css": "" }, activeFile: "index.html", slotLine: ${ROOT_SLOT}.slotLine, blocks: ${blocks}, correctBlock: "<${root}></${root}>", tests: [{ id: "${slug}-root-exists", kind: "exists", selector: "${root}", label: "The ${comp.label} has its outer box" }], hints: [{ level: 1, text: "Add the element that groups everything else in this ${comp.label}." }, { level: 2, text: "Use ${root} tags for the outer box." }], xp: 40 }),`);
  refLines.push(`  "${slug}-root": { estimatedMinutes: 4, solution: solvedSlot(${ROOT_SLOT}, "<${root}></${root}>") },`);

  for (let i = 1; i < nodes.length; i++) {
    const n = nodes[i];
    const sel = selectorFor(nodes, i);
    const parentTag = nodes[n.parent].tag;
    const id = `${slug}-${n.tag}-${i}`;
    const me = plain(n.tag);
    const parent = plain(parentTag);
    const where = `inside the ${parent}`;

    const tests = n.text
      ? `[{ id: "${id}-text", kind: "text-equals", selector: "${sel}", value: "${texts[i]}", label: "The ${me} shows ${n.text}" }]`
      : `[{ id: "${id}-exists", kind: "exists", selector: "${sel}", label: "The ${me} sits ${where}" }]`;

    const task = n.text
      ? `Add the ${me} ${where}, and write ${texts[i]} in it.`
      : `Add the ${me} ${where}.`;

    const hint2 = n.text
      ? `Use ${n.tag} tags, and write ${texts[i]} between them.`
      : `Use ${n.tag} tags, and put them ${where} rather than beside it.`;

    stepLines.push(`    ${S}({ id: "${id}", task: "${task}", inputMode: "guided", files: solved(${B(i)}), activeFile: "index.html", highlightToken: "<${parentTag}>", tests: ${tests}, hints: [{ level: 1, text: "Find the ${parent} you already added, and work ${where}." }, { level: 2, text: "${hint2}" }], xp: ${n.text ? 45 : 40} }),`);
    refLines.push(`  "${id}": { estimatedMinutes: 4, solution: solved(${B(i + 1)}) },`);
  }

  const factory = `const ${S} = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: ${P} };
};
`;

  return {
    bodies,
    steps: stepLines.join("\n") + "\n",
    references: refLines.join("\n") + "\n",
    factory,
    projectConst: `const ${P} = "${spec.projectId}";\n`,
    projectEntry: `    { id: ${P}, title: "${spec.projectTitle}" },\n`,
    concept: "",
    num,
    spec,
  };
}

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

/**
 * Appends `entry` to the end of the named array inside the course object.
 * Finds the array's own closing `],` rather than the first one after it, so a
 * nested array in the last element cannot capture the insertion point.
 */
function appendToArray(src, name, entry) {
  const open = new RegExp(`^  ${name}: \\[\\r?$`, "m").exec(src);
  if (!open) throw new Error(`${name} array not found`);
  const close = new RegExp(`^  \\],\\r?$`, "m");
  close.lastIndex = 0;
  const rest = src.slice(open.index + open[0].length);
  const m = close.exec(rest);
  if (!m) throw new Error(`${name} array close not found`);
  // `entry` already ends with a newline, and `at` sits at the start of the
  // closing line. Stripping that newline once ran the last entry and the `],`
  // onto one line, which still compiled but left the closing anchor
  // unmatchable, so the following pass could not find the array at all.
  const at = open.index + open[0].length + m.index;
  if (!entry.endsWith("\n")) throw new Error("array entry must end with a newline");
  return src.slice(0, at) + entry + src.slice(at);
}

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

  // Project entry, then steps, each at the end of its own array.
  //
  // These two anchors are matched with a regex rather than indexOf because the
  // newline follows the text here instead of preceding it, and the file is
  // checked out with CRLF endings on Windows. `"  projects: [\n"` does not
  // occur in a file that actually contains `  projects: [\r\n`.
  src = appendToArray(src, "projects", gen.projectEntry);
  src = appendToArray(src, "steps", gen.steps);

  writeFileSync(COURSE, src, "utf8");

  // Combination projects introduce no new word, so they add no concept. The
  // registry is left untouched rather than given an empty entry.
  if (!gen.concept) return;

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

${gen.concept
    ? `Teaches the ${gen.spec.element} element across five steps, with a concept
entry carrying all four representations.`
    : `Assembles a structure from elements already taught, one node per step.
No new element and no new concept: the skill practised is where things go.`}
Generated by tools/local-author.mjs from a locally served model; structure is
templated, wording is not.

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
  const entry = `\n---\n\n## ${new Date().toISOString().slice(0, 10)} - HTML course, project ${gen.num} (local model)\n\n**What got made:** ${gen.spec.projectTitle}. ${gen.concept ? `Five steps teaching the \`${gen.spec.element}\` element, plus the \`${gen.spec.conceptId}\` concept with all four representations.` : `A combination project: it assembles a structure out of elements already taught, one node per step, and adds no new concept.`}\n\n**How:** \`tools/local-author.mjs\` with \`${MODEL}\` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.\n\n**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in \`PENDING_QA.md\` per the owner ruling of 2026-08-25. Course is at ${steps} steps.\n`;
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
      spec = prompt.mode === "combination"
        ? validateCombination(extractJson(reply), state, prompt)
        : validateSpec(extractJson(reply), state, prompt.target, prompt.setting);
      break;
    } catch (e) {
      note = e.message;
      console.log(`  attempt ${attempt}/${RETRIES} rejected: ${e.message}`);
      spec = null;
    }
  }
  if (!spec) return { ok: false, reason: "the model did not produce a usable lesson" };

  const gen = prompt.mode === "combination"
    ? generateCombination(spec, state.nextNum, prompt.comp)
    : generate(spec, state.nextNum);
  const what = prompt.mode === "combination" ? prompt.comp.label : `<${spec.element}>`;
  console.log(`  project ${gen.num}: ${spec.projectTitle} (${what})`);

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
