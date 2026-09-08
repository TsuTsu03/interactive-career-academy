import { executeNosql, type NosqlDocument, type NosqlRunResult, type NosqlSeed } from "./nosql-store";
export type { NosqlDocument, NosqlRunResult, NosqlSeed } from "./nosql-store";

/** Only repository-owned interpreter code is embedded; input arrives as data. */
function runnerDocument(): string {
  return `<!doctype html><html><head><meta charset="utf-8"></head><body><script>
  (() => {
    const execute = ${executeNosql.toString()};
    let ran = false;
    window.addEventListener("message", (event) => {
      if (event.source !== parent || ran) return;
      const data = event.data;
      if (!data || typeof data !== "object" || data.__academy !== "nosql-run" || typeof data.query !== "string") return;
      ran = true;
      parent.postMessage({ __academy: "nosql-result", result: execute(data.seed, data.query) }, "*");
    });
    parent.postMessage({ __academy: "nosql-ready" }, "*");
  })();
  <\/script></body></html>`;
}

/** Validate the frame's output before any of its values reach the learner UI. */
function validResult(value: unknown): value is NosqlRunResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const result = value as Record<string, unknown>;
  if (typeof result.ok !== "boolean" || !Array.isArray(result.documents) || result.documents.length > 2000 || !Array.isArray(result.collections)) return false;
  if (!result.collections.every((item) => typeof item === "string" && item.length <= 100 && !["__proto__", "constructor", "prototype"].includes(item))) return false;
  if (["seedError", "error"].some((key) => result[key] !== undefined && typeof result[key] !== "string")) return false;
  if (result.timedOut !== undefined && typeof result.timedOut !== "boolean") return false;
  if (result.ok && (result.seedError || result.error || result.timedOut)) return false;
  // The shared validator rejects non-JSON values, unsafe keys and excess depth.
  const checked = executeNosql({ output: result.documents as NosqlDocument[] }, '{"collection":"output","operation":"find"}');
  return checked.ok;
}

/** A fresh opaque frame per run, destroyed on completion or timeout. */
export function runLearnerNosql(seed: NosqlSeed, query: string): Promise<NosqlRunResult> {
  return new Promise((resolve) => {
    const frame = document.createElement("iframe");
    frame.setAttribute("sandbox", "allow-scripts");
    frame.setAttribute("aria-hidden", "true");
    frame.style.cssText = "position:fixed;left:-9999px;top:0;width:10px;height:10px;border:0;";
    let settled = false;
    let sent = false;
    const finish = (result: NosqlRunResult) => {
      if (settled) return;
      settled = true;
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
      frame.remove();
      resolve(result);
    };
    function onMessage(event: MessageEvent) {
      if (event.source !== frame.contentWindow) return;
      const data = event.data;
      if (!data || typeof data !== "object") return;
      if (data.__academy === "nosql-ready" && !sent) {
        sent = true;
        try { frame.contentWindow?.postMessage({ __academy: "nosql-run", seed, query }, "*"); }
        catch { finish({ ok: false, documents: [], collections: [], seedError: "Starting data could not be sent to the checker." }); }
      } else if (data.__academy === "nosql-result" && sent) {
        finish(validResult(data.result) ? data.result : { ok: false, documents: [], collections: [], error: "The document checker returned an invalid result." });
      }
    }
    const timer = window.setTimeout(() => finish({ ok: false, documents: [], collections: [], timedOut: true, error: "Your query did not finish. Reduce the amount of data and try again." }), 3000);
    window.addEventListener("message", onMessage);
    try {
      frame.srcdoc = runnerDocument();
      document.body.appendChild(frame);
    } catch {
      finish({ ok: false, documents: [], collections: [], error: "The document checker could not start. Your work is still here." });
    }
  });
}
