/**
 * Executes learner JavaScript in an isolated frame and reports what it did.
 *
 * Trust model, matching ARCHITECTURE_PLAN_V2.md section 6.3:
 *
 *   sandbox="allow-scripts"   — the script runs
 *   NO allow-same-origin      — its origin is opaque, so it can reach nothing
 *                               of the platform: no cookies, no storage, no DOM
 *   postMessage only          — a typed, validated boundary in both directions
 *
 * Never add allow-same-origin here. Together the two flags let sandboxed
 * content remove its own sandbox.
 *
 * A beginner will eventually write `while (true) {}`. The frame is therefore
 * disposable and the parent owns a hard timeout: if the runner does not answer
 * in time, the frame is destroyed and the learner is told their code did not
 * finish. Nothing on the platform side can be blocked by learner code.
 */

const RUN_TIMEOUT_MS = 2500;

export interface JsProbe {
  /** Expressions to evaluate inside the learner's scope. */
  expressions: string[];
  /** Function calls to make: [name, args]. */
  calls: { fn: string; args: unknown[] }[];
}

export interface JsRunResult {
  ok: boolean;
  /** Everything the script printed with console.log, stringified. */
  logs: string[];
  /** Result of each probe expression, by index. `undefined` if it threw. */
  values: unknown[];
  /** Result of each probe call, by index. */
  returns: unknown[];
  /** Set when the script threw or never finished. */
  error?: string;
  timedOut?: boolean;
}

/**
 * The runner document. This is a fixed string, never assembled from learner
 * input, so there is nothing for a lesson or a learner to inject into.
 * The learner's code arrives later, over postMessage, as data.
 */
function runnerDocument(): string {
  return `<!doctype html><html><head><meta charset="utf-8"></head><body><script>
(function () {
  "use strict";

  function show(v) {
    if (typeof v === "string") return v;
    if (v === undefined) return "undefined";
    if (v === null) return "null";
    if (typeof v === "number" || typeof v === "boolean") return String(v);
    try { return JSON.stringify(v); } catch (e) { return String(v); }
  }

  function reply(payload) {
    parent.postMessage(Object.assign({ __academy: "result" }, payload), "*");
  }

  window.addEventListener("message", function (event) {
    var msg = event.data;
    if (!msg || msg.__academy !== "run") return;

    var logs = [];
    var originalLog = console.log;
    console.log = function () {
      var parts = [];
      for (var i = 0; i < arguments.length; i++) parts.push(show(arguments[i]));
      logs.push(parts.join(" "));
      if (logs.length > 500) throw new Error("Too much output.");
    };

    var values = [];
    var returns = [];

    try {
      var probeSrc = "\\n;return {" +
        "__values: [" + (msg.expressions || []).map(function (e) {
          return "(function(){ try { return (" + e + "); } catch (err) { return undefined; } })()";
        }).join(",") + "]," +
        "__returns: [" + (msg.calls || []).map(function (c) {
          return "(function(){ try { return (" + c.fn + ").apply(null, " +
            JSON.stringify(c.args) + "); } catch (err) { return undefined; } })()";
        }).join(",") + "]};";

      var fn = new Function(msg.code + probeSrc);
      var out = fn();
      values = (out && out.__values) || [];
      returns = (out && out.__returns) || [];
      console.log = originalLog;
      reply({ ok: true, logs: logs, values: values, returns: returns });
    } catch (err) {
      console.log = originalLog;
      reply({
        ok: false,
        logs: logs,
        values: [],
        returns: [],
        error: (err && err.message) ? String(err.message) : String(err)
      });
    }
  });

  parent.postMessage({ __academy: "ready" }, "*");
})();
<\/script></body></html>`;
}

export function runLearnerScript(code: string, probe: JsProbe): Promise<JsRunResult> {
  return new Promise((resolve) => {
    const frame = document.createElement("iframe");
    frame.setAttribute("sandbox", "allow-scripts");
    frame.setAttribute("aria-hidden", "true");
    frame.style.cssText = "position:fixed;left:-9999px;top:0;width:10px;height:10px;border:0;";

    let settled = false;

    const cleanup = () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
      // Destroying the frame is what stops a runaway loop.
      frame.remove();
    };

    const finish = (result: JsRunResult) => {
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
          { __academy: "run", code, expressions: probe.expressions, calls: probe.calls },
          "*",
        );
        return;
      }

      if (data.__academy === "result") {
        finish({
          ok: Boolean(data.ok),
          logs: Array.isArray(data.logs) ? (data.logs as string[]) : [],
          values: Array.isArray(data.values) ? (data.values as unknown[]) : [],
          returns: Array.isArray(data.returns) ? (data.returns as unknown[]) : [],
          error: typeof data.error === "string" ? data.error : undefined,
        });
      }
    }

    window.addEventListener("message", onMessage);

    const timer = window.setTimeout(() => {
      finish({
        ok: false,
        logs: [],
        values: [],
        returns: [],
        timedOut: true,
        error: "Your code did not finish. Check for a loop that never stops.",
      });
    }, RUN_TIMEOUT_MS);

    frame.srcdoc = runnerDocument();
    document.body.appendChild(frame);
  });
}
