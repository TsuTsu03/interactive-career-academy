import type { Copy, Step, TestSpec } from "./lesson-ir";
import { runLearnerScript, type JsRunResult } from "./js-runner";
import {
  runLearnerReact,
  type ReactRunResult,
  type ReactTestSpec,
} from "./react-runner";
import { runLearnerPage, type PageRunResult, type PageTestSpec } from "./page-runner";

export type TestStatus = "waiting" | "passed" | "failed";

export interface TestResult {
  id: string;
  label: Copy;
  status: TestStatus;
  /**
   * Plain-language statement of what is wrong in the product's one patient
   * teaching voice. Never "Test 3 failed"; tell the learner what to inspect.
   */
  message?: Copy;
  expected?: string;
  actual?: string;
}

/**
 * Builds the document the learner's code produces.
 *
 * Document grading runs in a hidden iframe with `sandbox="allow-same-origin"`
 * and deliberately WITHOUT `allow-scripts`. With script execution disabled the
 * same-origin grant cannot be used to escape, so the parent can safely read
 * computed styles. The visible preview is a separate iframe that DOES run
 * scripts and therefore never gets same-origin.
 */
export function buildDocument(files: Record<string, string>): string {
  const html = files["index.html"] ?? "";
  const css = files["styles.css"] ?? "";
  const js = files["script.js"];
  const script = js ? `<script>${js}<\/script>` : "";
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    body { font-family: system-ui, sans-serif; margin: 24px; color: #111; }
    img { max-width: 100%; }
  </style><style>${css}</style></head><body>${html}${script}</body></html>`;
}

/** A console-style page for script lessons, so the learner sees their output. */
export function buildConsoleDocument(js: string): string {
  const safe = JSON.stringify(js ?? "");
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    body { margin:0; font-family: ui-monospace, Menlo, monospace; font-size: 13px;
           background: #fff; color: #111; }
    .row { padding: 6px 12px; border-bottom: 1px solid #eee; white-space: pre-wrap; }
    .err { color: #b91c1c; }
    .empty { padding: 12px; color: #888; font-family: system-ui, sans-serif; }
  </style></head><body><div id="out"></div><script>
  (function(){
    var out = document.getElementById("out");
    function put(text, cls) {
      var d = document.createElement("div");
      d.className = "row" + (cls ? " " + cls : "");
      d.textContent = text;
      out.appendChild(d);
    }
    function show(v){
      if (typeof v === "string") return v;
      if (v === undefined) return "undefined";
      if (v === null) return "null";
      try { return JSON.stringify(v); } catch(e){ return String(v); }
    }
    console.log = function(){
      var p = [];
      for (var i=0;i<arguments.length;i++) p.push(show(arguments[i]));
      put(p.join(" "));
    };
    try { new Function(${safe})(); }
    catch (e) { put(String(e && e.message ? e.message : e), "err"); }
    if (!out.children.length) {
      var d = document.createElement("div");
      d.className = "empty";
      d.textContent = "Nothing printed yet. Use console.log to show something here.";
      out.appendChild(d);
    }
  })();
  <\/script></body></html>`;
}

/**
 * Both sides of a comparison must be phrased the same way. Showing
 * "it is 24px, it should be 40 pixels" makes a beginner wonder whether px
 * and pixels are different things.
 */
function readable(prop: string, value: string): string {
  if (prop === "color" || prop === "background-color") return colorName(value);
  const px = value.match(/^(\d+(?:\.\d+)?)px$/);
  if (px) {
    const n = Number(px[1]);
    return `${n} ${n === 1 ? "pixel" : "pixels"}`;
  }
  return value;
}

/** Turns rgb() back into something a beginner can read. */
function colorName(value: string): string {
  const m = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return value;
  const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const known: Record<string, [number, number, number]> = {
    blue: [0, 0, 255],
    red: [255, 0, 0],
    green: [0, 128, 0],
    black: [0, 0, 0],
    white: [255, 255, 255],
    orange: [255, 165, 0],
    purple: [128, 0, 128],
    teal: [0, 128, 128],
  };
  for (const [name, [kr, kg, kb]] of Object.entries(known)) {
    if (r === kr && g === kg && b === kb) return name;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

function show(v: unknown): string {
  if (typeof v === "string") return `"${v}"`;
  if (v === undefined) return "undefined";
  if (v === null) return "null";
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

function same(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

function normalise(v: string): string {
  return v.toLowerCase().replace(/\s+/g, "");
}

/** Turns a CSS selector into words a beginner recognises. */
function describe(selector: string): string {
  const map: Record<string, string> = {
    h1: "big heading",
    h2: "heading",
    h3: "small heading",
    p: "paragraph",
    img: "picture",
    body: "page",
    ul: "list",
    li: "list item",
    a: "link",
    button: "button",
    form: "form",
    input: "input box",
    label: "label",
    section: "section",
    footer: "footer",
    header: "header",
  };
  return map[selector] ?? `\`${selector}\``;
}

/* ------------------------------------------------------------------ */
/* Document assertions                                                 */
/* ------------------------------------------------------------------ */

function runDomTest(doc: Document, win: Window, spec: TestSpec): TestResult | null {
  const label = spec.label;
  const missing = (selector: string): TestResult => ({
    id: spec.id,
    label,
    status: "failed",
    message: `We could not find a ${describe(selector)} on the page yet. Go back to the file named in the step, add that element once, then press Run again so we can check the result together.`,
  });

  switch (spec.kind) {
    case "exists": {
      const el = doc.querySelector(spec.selector);
      return el ? { id: spec.id, label, status: "passed" } : missing(spec.selector);
    }

    case "count": {
      const n = doc.querySelectorAll(spec.selector).length;
      if (n >= spec.atLeast) return { id: spec.id, label, status: "passed" };
      return {
        id: spec.id,
        label,
        status: "failed",
        expected: String(spec.atLeast),
        actual: String(n),
        message: `This step needs at least ${spec.atLeast} of those elements, and the page has ${n} right now. Count the matching elements in your HTML, add the missing one if needed, then press Run again.`,
      };
    }

    case "text-not-empty": {
      const el = doc.querySelector(spec.selector);
      if (!el) return missing(spec.selector);
      if ((el.textContent ?? "").trim().length > 0) {
        return { id: spec.id, label, status: "passed" };
      }
      return {
        id: spec.id,
        label,
        status: "failed",
        message: `The ${describe(spec.selector)} is on the page, which is a good start, but it does not contain text yet. Put the requested words between its opening and closing tags, then run the check again.`,
      };
    }

    case "text-equals": {
      const el = doc.querySelector(spec.selector);
      if (!el) return missing(spec.selector);
      const text = (el.textContent ?? "").trim();
      if (text === spec.value) return { id: spec.id, label, status: "passed" };
      return {
        id: spec.id,
        label,
        status: "failed",
        expected: spec.value,
        actual: text || "(empty)",
        message: `Look closely at the text inside this element. For this step, it should read "${spec.value}". Update only that text, then press Run again to confirm it.`,
      };
    }

    case "text-contains": {
      const el = doc.querySelector(spec.selector);
      if (!el) return missing(spec.selector);
      const text = (el.textContent ?? "").trim();
      if (text.toLowerCase().includes(spec.value.toLowerCase())) {
        return { id: spec.id, label, status: "passed" };
      }
      return {
        id: spec.id,
        label,
        status: "failed",
        expected: `contains "${spec.value}"`,
        actual: text || "(empty)",
        message: `This text needs to include "${spec.value}". Compare the wording in your file with the instruction, add the missing words without changing unrelated code, then run the check again.`,
      };
    }

    case "attr": {
      const el = doc.querySelector(spec.selector);
      if (!el) return missing(spec.selector);
      const v = el.getAttribute(spec.attr);
      if (v && v.trim().length > 0) return { id: spec.id, label, status: "passed" };
      return {
        id: spec.id,
        label,
        status: "failed",
        message: `The ${describe(spec.selector)} needs a ${spec.attr} value before the browser can use it correctly. Find that attribute in your markup, fill in the value requested by the step, then press Run again.`,
      };
    }

    case "attr-equals": {
      const el = doc.querySelector(spec.selector);
      if (!el) return missing(spec.selector);
      const v = el.getAttribute(spec.attr) ?? "";
      if (v.trim() === spec.value) return { id: spec.id, label, status: "passed" };
      return {
        id: spec.id,
        label,
        status: "failed",
        expected: spec.value,
        actual: v || "(nothing)",
        message: `Check the ${spec.attr} value on this element. This step expects "${spec.value}". Replace only that value, then press Run again to see whether the browser now receives the right instruction.`,
      };
    }

    case "style": {
      const el = doc.querySelector(spec.selector);
      if (!el) return missing(spec.selector);
      const actual = win.getComputedStyle(el).getPropertyValue(spec.prop).trim();
      if (normalise(actual) === normalise(spec.equals)) {
        return { id: spec.id, label, status: "passed" };
      }
      const want = spec.readable ?? readable(spec.prop, spec.equals);
      const got = readable(spec.prop, actual);
      return {
        id: spec.id,
        label,
        status: "failed",
        expected: want,
        actual: got,
        message: `The browser is currently reading this as ${got}, but this step is asking for ${want}. Find the related CSS rule, adjust the value carefully, then press Run again to compare the new result.`,
      };
    }

    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* Source assertions                                                   */
/* ------------------------------------------------------------------ */

function runSourceTest(files: Record<string, string>, spec: TestSpec): TestResult | null {
  if (spec.kind !== "source-matches") return null;
  const src = files[spec.file] ?? "";
  let re: RegExp;
  try {
    re = new RegExp(spec.pattern, spec.flags ?? "");
  } catch {
    // A broken pattern is an authoring bug, not a learner mistake. Never fail
    // the learner for it.
    return { id: spec.id, label: spec.label, status: "passed" };
  }
  if (re.test(src)) return { id: spec.id, label: spec.label, status: "passed" };
  return { id: spec.id, label: spec.label, status: "failed", message: spec.because };
}

/* ------------------------------------------------------------------ */
/* Script assertions                                                   */
/* ------------------------------------------------------------------ */

function runJsTest(spec: TestSpec, run: JsRunResult, idx: { expr: number; call: number }): TestResult | null {
  const label = spec.label;

  const crashed = (): TestResult => ({
    id: spec.id,
    label,
    status: "failed",
    message: run.timedOut
        ? "Your code kept running and the checker had to stop it. Look for a loop whose condition never becomes false or whose counter never changes, fix that one loop, then press Run again."
        : `Your code stopped before the check could finish: ${run.error ?? "unknown"}. Read the error from left to right, find the named line or variable in your file, make one correction, then try Run again.`,
  });

  switch (spec.kind) {
    case "js-runs":
      return run.ok
        ? { id: spec.id, label, status: "passed" }
        : crashed();

    case "js-logs": {
      if (!run.ok) return crashed();
      const want = spec.values;
      const got = run.logs;
      const ok =
        got.length >= want.length &&
        want.every((w, i) => (got[i] ?? "").trim() === w.trim());
      if (ok) return { id: spec.id, label, status: "passed" };
      return {
        id: spec.id,
        label,
        status: "failed",
        expected: want.join(" ⏎ "),
        actual: got.length ? got.join(" ⏎ ") : "(nothing printed)",
        message: got.length === 0
              ? "Your code ran, but it did not print anything for the checker to read. Add a console.log for the value named in the instruction, then press Run again and look for that output in the preview."
              : `Your first printed value is ${got[0]}, while this step expects ${want[0]}. Trace the value back to the line that creates it, correct that one line, then press Run again.`,
      };
    }

    case "js-value": {
      if (!run.ok) return crashed();
      const got = run.values[idx.expr];
      if (same(got, spec.equals)) return { id: spec.id, label, status: "passed" };
      return {
        id: spec.id,
        label,
        status: "failed",
        expected: show(spec.equals),
        actual: show(got),
        message: `The checker read \`${spec.expression}\` as ${show(got)}, but this step expects ${show(spec.equals)}. Inspect the variable or expression that produces that value, make one focused correction, then press Run again.`,
      };
    }

    case "js-returns": {
      if (!run.ok) return crashed();
      const got = run.returns[idx.call];
      if (same(got, spec.equals)) return { id: spec.id, label, status: "passed" };
      const call = `${spec.fn}(${spec.args.map((a) => show(a)).join(", ")})`;
      return {
        id: spec.id,
        label,
        status: "failed",
        expected: show(spec.equals),
        actual: show(got),
        message: `${call} returned ${show(got)}, but this step expects ${show(spec.equals)}. Read the function body and its input carefully, adjust the part that produces the wrong value, then press Run again.`,
      };
    }

    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* Entry point                                                         */
/* ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ */
/* Grading frame                                                       */
/* ------------------------------------------------------------------ */

/**
 * One reusable frame instead of one per call.
 *
 * Creating and attaching an iframe is not free, and the authoring harness
 * grades every step in the curriculum in a loop. At a few hundred steps that
 * is a thousand frame creations, which is slow enough to matter. The document
 * is rewritten each time, so reuse is safe.
 */
let gradingFrame: HTMLIFrameElement | null = null;

function acquireGradingFrame(): HTMLIFrameElement {
  if (gradingFrame?.isConnected) return gradingFrame;
  const frame = document.createElement("iframe");
  // No allow-scripts: nothing in the learner's markup can execute here.
  frame.setAttribute("sandbox", "allow-same-origin");
  frame.setAttribute("aria-hidden", "true");
  frame.style.cssText =
    "position:fixed;left:-9999px;top:0;width:1024px;height:768px;border:0;";
  document.body.appendChild(frame);
  gradingFrame = frame;
  return frame;
}

/** Blanks the frame so nothing leaks between grades, but keeps it attached. */
function releaseGradingFrame(): void {
  const doc = gradingFrame?.contentDocument;
  if (!doc) return;
  doc.open();
  doc.write("<!doctype html><html><body></body></html>");
  doc.close();
}

/** Resolves on the next painted frame, or after 60ms if frames are not coming. */
function settle(): Promise<void> {
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    const timer = setTimeout(finish, 60);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        clearTimeout(timer);
        finish();
      }),
    );
  });
}

const JS_KINDS = new Set(["js-runs", "js-logs", "js-value", "js-returns"]);
const REACT_KINDS = new Set([
  "react-exists",
  "react-text-equals",
  "react-attr-equals",
  "react-click-text-equals",
  "react-click-attr-equals",
  "react-input-text-equals",
  "react-document-title-equals",
  "react-click-focus-equals",
]);
const PAGE_KINDS = new Set([
  "page-exists",
  "page-text-equals",
  "page-attr-equals",
  "page-class-contains",
  "page-class-not-contains",
  "page-click-text-equals",
  "page-click-attr-equals",
  "page-click-class-contains",
  "page-input-text-equals",
]);
const DOM_KINDS = new Set([
  "exists",
  "count",
  "text-not-empty",
  "text-equals",
  "text-contains",
  "attr",
  "attr-equals",
  "style",
]);

/**
 * Reports one page assertion - a check made after the learner's script ran.
 *
 * The failure messages name the click or the typing where there was one,
 * because "the heading still says Hello" is confusing on its own when the
 * point of the step was that clicking should have changed it.
 */
function runPageTest(spec: PageTestSpec, run: PageRunResult): TestResult {
  if (!run.ok) {
    return {
      id: spec.id,
      label: spec.label,
      status: "failed",
      message: run.timedOut
        ? "Your script kept running and the checker had to stop it. Check for a loop that never ends, fix that one part, then press Run again."
        : `Your script stopped with an error: ${run.error ?? "unknown error"}. Read the message, look at the line it names, and make one correction before running the check again.`,
    };
  }

  const result = run.checks.find((candidate) => candidate.id === spec.id);
  if (result?.passed) return { id: spec.id, label: spec.label, status: "passed" };

  const actual = result?.actual ?? "nothing";

  if (spec.kind === "page-exists") {
    return {
      id: spec.id,
      label: spec.label,
      status: "failed",
      actual,
      message: `The page does not have a ${describe(spec.selector)} after your script ran. Check that the element is in the HTML, or that your script adds it, then press Run again.`,
    };
  }

  const after =
    spec.kind === "page-click-text-equals" ||
    spec.kind === "page-click-attr-equals" ||
    spec.kind === "page-click-class-contains"
      ? ` after the ${describe(spec.clickSelector)} was clicked`
      : spec.kind === "page-input-text-equals"
        ? ` after ${spec.type} was typed into it`
        : "";

  if (spec.kind === "page-class-contains" || spec.kind === "page-click-class-contains") {
    return {
      id: spec.id,
      label: spec.label,
      status: "failed",
      actual,
      message: `The ${describe(spec.selector)} does not carry the class ${spec.value}${after}. Its classes are ${actual}. Check the line that changes them, then press Run again.`,
    };
  }

  if (spec.kind === "page-class-not-contains") {
    return {
      id: spec.id,
      label: spec.label,
      status: "failed",
      actual,
      message: `The ${describe(spec.selector)} still carries the class ${spec.value}. Its classes are ${actual}. Check the line that removes it, then press Run again.`,
    };
  }

  if (spec.kind === "page-attr-equals" || spec.kind === "page-click-attr-equals") {
    return {
      id: spec.id,
      label: spec.label,
      status: "failed",
      actual,
      message: `The ${describe(spec.selector)} has ${spec.attr} set to ${actual}${after}, and the check is looking for ${spec.value}. Compare the two and change the line that sets it.`,
    };
  }

  return {
    id: spec.id,
    label: spec.label,
    status: "failed",
    actual,
    message: `The ${describe(spec.selector)} reads ${actual}${after}, and the check is looking for ${spec.value}. Compare the two, then change the line that sets the text and press Run again.`,
  };
}

function runReactTest(spec: ReactTestSpec, run: ReactRunResult): TestResult {
  if (!run.ok) {
    return {
      id: spec.id,
      label: spec.label,
      status: "failed",
      message: run.timedOut
        ? "Your component kept working and the checker had to stop it. Check for a loop or a state update that repeats during render, fix that one part, then press Run again."
        : `React could not show your component yet: ${run.error ?? "unknown error"}. Read the message, inspect the App function, and make one correction before running the check again.`,
    };
  }

  const result = run.checks.find((candidate) => candidate.id === spec.id);
  if (result?.passed) return { id: spec.id, label: spec.label, status: "passed" };

  if (spec.kind === "react-exists") {
    return {
      id: spec.id,
      label: spec.label,
      status: "failed",
      actual: result?.actual ?? "not found",
      message: `React rendered the App component, but it does not show a ${describe(spec.selector)} yet. Check the element returned by App, then press Run again.`,
    };
  }

  if (spec.kind === "react-document-title-equals") {
    return {
      id: spec.id,
      label: spec.label,
      status: "failed",
      expected: spec.value,
      actual: result?.actual || "(empty)",
      message: `The document title should read "${spec.value}". Check the effect that updates document.title, then run the check again.`,
    };
  }

  if (spec.kind === "react-click-focus-equals") {
    return {
      id: spec.id,
      label: spec.label,
      status: "failed",
      actual: result?.actual ?? "not focused",
      message: `Clicking the ${describe(spec.clickSelector)} should move focus to the ${describe(spec.selector)}. Check the ref and click handler, then run the check again.`,
    };
  }

  const expected = spec.value;
  return {
    id: spec.id,
    label: spec.label,
    status: "failed",
    expected,
    actual: result?.actual || "(empty)",
    message:
      spec.kind === "react-text-equals" ||
      spec.kind === "react-click-text-equals" ||
      spec.kind === "react-input-text-equals"
        ? `The ${describe(spec.selector)} is present, but its text should read "${expected}". Update only that text, then run the check again.`
        : `The ${describe(spec.selector)} needs ${spec.attr}="${expected}". Check the props object passed to React.createElement, then run the check again.`,
  };
}

/**
 * Runs every assertion for a step. Returns results in authored order so the UI
 * can resolve them one at a time.
 */
export async function gradeStep(
  step: Step,
  files: Record<string, string>,
): Promise<TestResult[]> {
  const needsJs = step.tests.some((t) => JS_KINDS.has(t.kind));
  const reactTests = step.tests.filter((test): test is ReactTestSpec =>
    REACT_KINDS.has(test.kind),
  );
  const needsDom = step.tests.some((t) => DOM_KINDS.has(t.kind));

  let jsRun: JsRunResult | null = null;
  if (needsJs) {
    const expressions: string[] = [];
    const calls: { fn: string; args: unknown[] }[] = [];
    for (const t of step.tests) {
      if (t.kind === "js-value") expressions.push(t.expression);
      if (t.kind === "js-returns") calls.push({ fn: t.fn, args: t.args });
    }
    jsRun = await runLearnerScript(files["script.js"] ?? "", {
      expressions,
      calls,
      fetch: step.runtimeFixtures?.fetch,
      storage: step.runtimeFixtures?.storage,
    });
  }

  const reactRun =
    reactTests.length > 0
      ? await runLearnerReact(files["app.tsx"] ?? files["app.js"] ?? "", reactTests, {
          typescript: files["app.tsx"] !== undefined,
        })
      : null;

  const pageTests = step.tests.filter((test): test is PageTestSpec =>
    PAGE_KINDS.has(test.kind),
  );
  const pageRun: PageRunResult | null =
    pageTests.length > 0 ? await runLearnerPage(files, pageTests) : null;

  let doc: Document | null = null;
  let win: Window | null = null;
  let frame: HTMLIFrameElement | null = null;

  if (needsDom) {
    frame = acquireGradingFrame();

    doc = frame.contentDocument;
    win = frame.contentWindow;
    if (!doc || !win) {
      releaseGradingFrame();
      throw new Error("grading frame unavailable");
    }

    doc.open();
    // Scripts are stripped for grading: the DOM assertions describe the markup
    // the learner wrote, not whatever a script did to it afterwards.
    doc.write(buildDocument({ ...files, "script.js": "" }));
    doc.close();

    // requestAnimationFrame alone is not safe here: a backgrounded or
    // non-compositing tab never fires it, which would hang grading forever if
    // the learner switched tabs mid-run. Race it against a timer so the frame
    // is a fast path, not a dependency.
    await settle();
  }

  try {
    const idx = { expr: 0, call: 0 };
    return step.tests.map((spec) => {
      const fromSource = runSourceTest(files, spec);
      if (fromSource) return fromSource;

      if (JS_KINDS.has(spec.kind) && jsRun) {
        const here = { expr: idx.expr, call: idx.call };
        if (spec.kind === "js-value") idx.expr++;
        if (spec.kind === "js-returns") idx.call++;
        const r = runJsTest(spec, jsRun, here);
        if (r) return r;
      }

      if (REACT_KINDS.has(spec.kind) && reactRun) {
        return runReactTest(spec as ReactTestSpec, reactRun);
      }

      if (PAGE_KINDS.has(spec.kind) && pageRun) {
        return runPageTest(spec as PageTestSpec, pageRun);
      }

      if (doc && win) {
        const r = runDomTest(doc, win, spec);
        if (r) return r;
      }

      // An assertion the grader does not understand must never silently pass.
      return {
        id: spec.id,
        label: spec.label,
        status: "failed" as const,
        message: "This particular check could not finish. Your work is still here. Press Run again; if it happens again, review the instruction and make sure the required file still has valid code.",
      };
    });
  } finally {
    if (frame) releaseGradingFrame();
  }
}
