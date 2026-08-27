import type { TestSpec } from "./lesson-ir";

const RUN_TIMEOUT_MS = 4000;

export type ReactTestSpec = Extract<
  TestSpec,
  {
    kind:
      | "react-exists"
      | "react-text-equals"
      | "react-attr-equals"
      | "react-click-text-equals"
      | "react-click-attr-equals"
      | "react-input-text-equals"
      | "react-document-title-equals"
      | "react-click-focus-equals";
  }
>;

export interface ReactCheckResult {
  id: string;
  passed: boolean;
  actual?: string;
}

export interface ReactRunResult {
  ok: boolean;
  checks: ReactCheckResult[];
  error?: string;
  timedOut?: boolean;
}

/** Fixed shell. Learner code arrives later as message data, never HTML. */
export function reactRunnerDocument(): string {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    body { margin: 0; padding: 24px; font-family: system-ui, sans-serif; color: #0f172a; }
    #react-status { color: #475569; font-size: 14px; }
  </style></head><body>
    <p id="react-status" role="status">Waiting for your component…</p>
    <div id="react-root"></div>
    <script src="/react-runtime.js"><\/script>
  </body></html>`;
}

/**
 * Runs a learner React component in the same opaque-origin runtime used by the
 * visible preview. The frame owns React and the learner code; the platform
 * receives only plain assertion results over postMessage.
 */
export function runLearnerReact(
  code: string,
  checks: ReactTestSpec[],
): Promise<ReactRunResult> {
  return new Promise((resolve) => {
    const frame = document.createElement("iframe");
    frame.setAttribute("sandbox", "allow-scripts");
    frame.setAttribute("aria-hidden", "true");
    frame.style.cssText = "position:fixed;left:-9999px;top:0;width:10px;height:10px;border:0;";

    const requestId = crypto.randomUUID();
    let settled = false;

    const cleanup = () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
      frame.remove();
    };

    const finish = (result: ReactRunResult) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(result);
    };

    function onMessage(event: MessageEvent) {
      if (event.source !== frame.contentWindow) return;
      const data = event.data as Record<string, unknown> | null;
      if (!data || typeof data !== "object") return;

      if (data.__academy === "react-ready") {
        frame.contentWindow?.postMessage(
          { __academy: "react-run", requestId, code, checks },
          "*",
        );
        return;
      }

      if (data.__academy !== "react-result" || data.requestId !== requestId) return;
      finish({
        ok: Boolean(data.ok),
        checks: Array.isArray(data.checks) ? (data.checks as ReactCheckResult[]) : [],
        error: typeof data.error === "string" ? data.error : undefined,
      });
    }

    window.addEventListener("message", onMessage);
    const timer = window.setTimeout(() => {
      finish({
        ok: false,
        checks: [],
        timedOut: true,
        error: "Your component did not finish rendering.",
      });
    }, RUN_TIMEOUT_MS);

    frame.srcdoc = reactRunnerDocument();
    document.body.appendChild(frame);
  });
}
