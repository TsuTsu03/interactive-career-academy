import type { TestSpec } from "./lesson-ir";

const RUN_TIMEOUT_MS = 4000;

/**
 * Assertions about a page *after* the learner's script has run on it.
 *
 * These are deliberately separate from the plain `exists` / `text-equals`
 * family in `grading.ts`. Those describe the markup the learner wrote, and are
 * checked in the `allow-same-origin` frame where **nothing executes**. A
 * lesson about `addEventListener` cannot be graded there: the script never
 * runs, so the assertion would describe the starting HTML and pass or fail for
 * reasons unrelated to what the learner did.
 *
 * So this is the third runner, alongside `js-runner` and `react-runner`, and
 * it follows their shape exactly: a disposable frame with `allow-scripts` and
 * no `allow-same-origin`, an opaque origin, learner content delivered as
 * postMessage data rather than assembled into the frame's HTML, identity
 * proven by `event.source`, and a hard timeout that destroys the frame.
 */
export type PageTestSpec = Extract<
  TestSpec,
  {
    kind:
      | "page-exists"
      | "page-text-equals"
      | "page-attr-equals"
      | "page-class-contains"
      | "page-class-not-contains"
      | "page-click-text-equals"
      | "page-click-attr-equals"
      | "page-click-class-contains"
      | "page-input-text-equals";
  }
>;

export interface PageCheckResult {
  id: string;
  passed: boolean;
  /** What was found instead, shown to the learner when a check fails. */
  actual?: string;
}

export interface PageRunResult {
  ok: boolean;
  checks: PageCheckResult[];
  error?: string;
  timedOut?: boolean;
}

/**
 * The runner document. A fixed string, exactly as in `js-runner`: the
 * learner's markup, styles, and script all arrive later as message data, so
 * there is nothing here for a lesson or a learner to inject into.
 *
 * The markup is assigned with `innerHTML`, which does not execute `<script>`
 * elements. The learner's script is run separately through `new Function`, so
 * the only code that runs is the code the step is actually grading.
 */
function runnerDocument(): string {
  return `<!doctype html><html><head><meta charset="utf-8"></head><body><script>
(function () {
  "use strict";

  function reply(payload) {
    parent.postMessage(Object.assign({ __academy: "result" }, payload), "*");
  }

  function textOf(el) {
    return (el.textContent || "").replace(/\\s+/g, " ").trim();
  }

  function fire(el, type) {
    el.dispatchEvent(new Event(type, { bubbles: true }));
  }

  function check(spec) {
    var el = document.querySelector(spec.selector);
    if (!el) return { id: spec.id, passed: false, actual: "nothing matched " + spec.selector };

    // A click or an input has to happen before the value is read, because the
    // whole point of these kinds is what the learner's handler did in response.
    if (spec.click) {
      var target = spec.clickSelector ? document.querySelector(spec.clickSelector) : el;
      if (!target) {
        return { id: spec.id, passed: false, actual: "nothing matched " + spec.clickSelector };
      }
      target.click();
      el = document.querySelector(spec.selector);
      if (!el) return { id: spec.id, passed: false, actual: "the element disappeared after the click" };
    }

    if (spec.type) {
      var input = spec.inputSelector ? document.querySelector(spec.inputSelector) : el;
      if (!input) {
        return { id: spec.id, passed: false, actual: "nothing matched " + spec.inputSelector };
      }
      input.value = spec.type;
      fire(input, "input");
      fire(input, "change");
      el = document.querySelector(spec.selector);
      if (!el) return { id: spec.id, passed: false, actual: "the element disappeared after typing" };
    }

    var actual;
    if (spec.want === "exists") return { id: spec.id, passed: true };
    if (spec.want === "text") actual = textOf(el);
    else if (spec.want === "attr") actual = el.getAttribute(spec.attr);
    else if (spec.want === "class") {
      var has = el.classList.contains(spec.value);
      return { id: spec.id, passed: has, actual: el.className || "no classes" };
    }
    else if (spec.want === "not-class") {
      var absent = !el.classList.contains(spec.value);
      return { id: spec.id, passed: absent, actual: el.className || "no classes" };
    }

    if (actual === null || actual === undefined) actual = "nothing";
    return { id: spec.id, passed: String(actual) === String(spec.value), actual: String(actual) };
  }

  window.addEventListener("message", function (event) {
    var msg = event.data;
    if (!msg || msg.__academy !== "run") return;

    try {
      // innerHTML does not run script elements, so the only code executed here
      // is the learner's script.js, below, which is what the step grades.
      document.body.innerHTML = msg.html || "";

      if (msg.css) {
        var style = document.createElement("style");
        style.textContent = msg.css;
        document.head.appendChild(style);
      }

      var fn = new Function(msg.code || "");
      fn();

      var results = [];
      var specs = msg.checks || [];
      for (var i = 0; i < specs.length; i++) {
        try {
          results.push(check(specs[i]));
        } catch (inner) {
          results.push({
            id: specs[i].id,
            passed: false,
            actual: (inner && inner.message) ? String(inner.message) : String(inner)
          });
        }
      }

      reply({ ok: true, checks: results });
    } catch (err) {
      reply({
        ok: false,
        checks: [],
        error: (err && err.message) ? String(err.message) : String(err)
      });
    }
  });

  parent.postMessage({ __academy: "ready" }, "*");
})();
<\/script></body></html>`;
}

/** Flattens a spec into the plain data the frame knows how to check. */
function toWireSpec(spec: PageTestSpec) {
  switch (spec.kind) {
    case "page-exists":
      return { id: spec.id, selector: spec.selector, want: "exists" };
    case "page-text-equals":
      return { id: spec.id, selector: spec.selector, want: "text", value: spec.value };
    case "page-attr-equals":
      return { id: spec.id, selector: spec.selector, want: "attr", attr: spec.attr, value: spec.value };
    case "page-class-contains":
      return { id: spec.id, selector: spec.selector, want: "class", value: spec.value };
    case "page-class-not-contains":
      return { id: spec.id, selector: spec.selector, want: "not-class", value: spec.value };
    case "page-click-text-equals":
      return { id: spec.id, selector: spec.selector, want: "text", value: spec.value, click: true, clickSelector: spec.clickSelector };
    case "page-click-attr-equals":
      return { id: spec.id, selector: spec.selector, want: "attr", attr: spec.attr, value: spec.value, click: true, clickSelector: spec.clickSelector };
    case "page-click-class-contains":
      return { id: spec.id, selector: spec.selector, want: "class", value: spec.value, click: true, clickSelector: spec.clickSelector };
    case "page-input-text-equals":
      return { id: spec.id, selector: spec.selector, inputSelector: spec.inputSelector, want: "text", value: spec.value, type: spec.type };
  }
}

/**
 * Runs the learner's page and script, then reports each assertion.
 *
 * One frame per run, destroyed on the way out. Destroying it is what stops a
 * runaway loop; the timeout is not advisory.
 */
export function runLearnerPage(
  files: Record<string, string>,
  specs: PageTestSpec[],
): Promise<PageRunResult> {
  return new Promise((resolve) => {
    const frame = document.createElement("iframe");
    // Never `allow-same-origin`. With both, sandboxed content can remove its
    // own sandbox and reach this page. See AGENTS.md rule 1.1.
    frame.setAttribute("sandbox", "allow-scripts");
    frame.setAttribute("aria-hidden", "true");
    frame.style.cssText = "position:fixed;left:-9999px;top:0;width:400px;height:400px;border:0;";

    let settled = false;

    const cleanup = () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
      frame.remove();
    };

    const finish = (result: PageRunResult) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(result);
    };

    function onMessage(event: MessageEvent) {
      // The frame has an opaque origin, so identity is proven by the source
      // window rather than by the origin string.
      if (event.source !== frame.contentWindow) return;
      const data = event.data as Record<string, unknown> | null;
      if (!data || typeof data !== "object") return;

      if (data.__academy === "ready") {
        frame.contentWindow?.postMessage(
          {
            __academy: "run",
            html: files["index.html"] ?? "",
            css: files["styles.css"] ?? "",
            code: files["script.js"] ?? "",
            checks: specs.map(toWireSpec),
          },
          "*",
        );
        return;
      }

      if (data.__academy === "result") {
        finish({
          ok: Boolean(data.ok),
          checks: Array.isArray(data.checks) ? (data.checks as PageCheckResult[]) : [],
          error: typeof data.error === "string" ? data.error : undefined,
        });
      }
    }

    window.addEventListener("message", onMessage);

    const timer = window.setTimeout(() => {
      finish({
        ok: false,
        checks: [],
        timedOut: true,
        error: "Your code did not finish. Check for a loop that never stops.",
      });
    }, RUN_TIMEOUT_MS);

    frame.srcdoc = runnerDocument();
    document.body.appendChild(frame);
  });
}
