import type { Course, Step } from "@/lib/lesson-ir";

/**
 * Course — JavaScript on a Page.
 *
 * The JavaScript course teaches the language. This one teaches the browser:
 * finding an element, changing what it says, and answering a click. Decision
 * 39 exists because that gap was total — across 655 JavaScript steps there was
 * not one `document.`, `querySelector`, `addEventListener`, or `fetch`, so a
 * learner could finish the course having never made a page do anything.
 *
 * Steps here assert with the `page-*` family, which is checked after the
 * learner's script has run (`lib/page-runner.ts`). The plain `exists` and
 * `text-equals` family cannot be used: it runs in a frame where nothing
 * executes, so it would describe the starting markup and say nothing about
 * what the script did. See AGENTS.md rule 1.1.
 */

let n = 0;

/** A page step ships markup and a script. Styles stay out of the way here. */
const page = (html: string, js: string): Record<string, string> => ({
  "index.html": html,
  "script.js": js,
  "styles.css": "",
});

interface StepReference {
  estimatedMinutes: number;
  solution: Record<string, string>;
}

/* dom-topic: find-element */
const BARANGAY_HELP_HTML = "<h1 id=\"notice-title\">Find Your Item</h1>\n<p id=\"notice-body\">Click element to view</p>";

/** Authored proof for every step. Missing entries stop the course from loading. */
const references = {
  "barangay-help-1": { estimatedMinutes: 4, solution: page(BARANGAY_HELP_HTML, "const title = document.querySelector(\"#notice-title\");\n") },
  "barangay-help-2": { estimatedMinutes: 4, solution: page(BARANGAY_HELP_HTML, "const title = document.querySelector(\"#notice-title\");\nconst words = title.textContent;\n") },
  "barangay-help-3": { estimatedMinutes: 4, solution: page(BARANGAY_HELP_HTML, "const title = document.querySelector(\"#notice-title\");\nconst words = title.textContent;\ntitle.textContent = words + \" (updated)\";\n") },
  "barangay-help-4": { estimatedMinutes: 4, solution: page(BARANGAY_HELP_HTML, "const title = document.querySelector(\"#notice-title\");\nconst words = title.textContent;\ntitle.textContent = words + \" (updated)\";\nconst body = document.querySelector(\"#notice-body\");\n") },
  "barangay-help-5": { estimatedMinutes: 4, solution: page(BARANGAY_HELP_HTML, "const title = document.querySelector(\"#notice-title\");\nconst words = title.textContent;\ntitle.textContent = words + \" (updated)\";\nconst body = document.querySelector(\"#notice-body\");\nbody.textContent = \"Please read the notice above.\";\n") },
} satisfies Record<string, StepReference>;
const PROJECT_1_ID = "barangay-help";
const s1 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for DOM step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_1_ID }; };


export const domCourse: Course = {
  id: "dom-basics",
  order: 5,
  title: "Learn JavaScript on a Page by Building Barangay Screens",
  project: "Barangay Notice",
  projects: [ { id: PROJECT_1_ID, title: "Barangay Help" } ],
  kind: "web",
  requires: ["js-basics"],
  summary:
    "Make a real page answer back. Find the parts of a page from your script, change what they say, and run your own code when somebody clicks.",
  steps: [
    s1({ id: "barangay-help-1", task: "Find the heading so the script can work with it.", inputMode: "guided", files: page(BARANGAY_HELP_HTML, "const title = document.querySelector();;\n"), activeFile: "script.js", highlightToken: "const title = document.querySelector();;", tests: [{ id: "barangay-help-1-check", label: "#notice-title reads Find Your Item", kind: "page-text-equals", selector: "#notice-title", value: "Find Your Item" }], hints: [{ level: 1, text: "Ask the document for the element with that id." }, { level: 2, text: "Write document.querySelector(\"#notice-title\") after the equals sign." }], xp: 50 }),
    s1({ id: "barangay-help-2", task: "Read the words that are already in the heading.", inputMode: "guided", files: page(BARANGAY_HELP_HTML, "const title = document.querySelector(\"#notice-title\");\nconst words = ;\n"), activeFile: "script.js", highlightToken: "const words = ;", tests: [{ id: "barangay-help-2-check", label: "#notice-title reads Find Your Item", kind: "page-text-equals", selector: "#notice-title", value: "Find Your Item" }], hints: [{ level: 1, text: "An element keeps its words in a property." }, { level: 2, text: "Write title.textContent after the equals sign." }], xp: 50 }),
    s1({ id: "barangay-help-3", task: "Add the word updated to the end of the heading.", inputMode: "guided", files: page(BARANGAY_HELP_HTML, "const title = document.querySelector(\"#notice-title\");\nconst words = title.textContent;\ntitle.textContent = ;\n"), activeFile: "script.js", highlightToken: "title.textContent = ;", tests: [{ id: "barangay-help-3-check", label: "#notice-title reads Find Your Item (updated)", kind: "page-text-equals", selector: "#notice-title", value: "Find Your Item (updated)" }], hints: [{ level: 1, text: "Join the words you read to the new part." }, { level: 2, text: "Write words + \" (updated)\" after the equals sign." }], xp: 50 }),
    s1({ id: "barangay-help-4", task: "Find the message below the heading.", inputMode: "guided", files: page(BARANGAY_HELP_HTML, "const title = document.querySelector(\"#notice-title\");\nconst words = title.textContent;\ntitle.textContent = words + \" (updated)\";\nconst body = ;\n"), activeFile: "script.js", highlightToken: "const body = ;", tests: [{ id: "barangay-help-4-check", label: "#notice-body reads Click element to view", kind: "page-text-equals", selector: "#notice-body", value: "Click element to view" }], hints: [{ level: 1, text: "Ask the document for the element with that id." }, { level: 2, text: "Write document.querySelector(\"#notice-body\") after the equals sign." }], xp: 50 }),
    s1({ id: "barangay-help-5", task: "Replace the message with a line pointing at the heading.", inputMode: "guided", files: page(BARANGAY_HELP_HTML, "const title = document.querySelector(\"#notice-title\");\nconst words = title.textContent;\ntitle.textContent = words + \" (updated)\";\nconst body = document.querySelector(\"#notice-body\");\nbody.textContent = ;\n"), activeFile: "script.js", highlightToken: "body.textContent = ;", tests: [{ id: "barangay-help-5-check", label: "#notice-body reads Please read the notice above.", kind: "page-text-equals", selector: "#notice-body", value: "Please read the notice above." }], hints: [{ level: 1, text: "Put the new words in quotes." }, { level: 2, text: "Write \"Please read the notice above.\" after the equals sign." }], xp: 50 }),
  ],
};

// Referenced so the scaffold type-checks while the course is still empty.
// Every generated project brings its own step factory and uses these.
void page;
void n;
