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

interface ReactRunOptions {
  runtimeSource?: string;
  timeoutMs?: number;
  typescript?: boolean;
}

/**
 * The runtime, fetched once and shared by every frame.
 *
 * It cannot be loaded with `<script src="/react-runtime.js">` from inside the
 * frame. A `srcdoc` frame sandboxed to `allow-scripts` has an **opaque
 * origin**, and a relative URL has nothing to resolve against there, so the
 * request 404s, React never arrives, and the frame never sends its ready
 * signal. Every React check then fails for a reason that has nothing to do
 * with the learner - 39 of 60 steps, until the authoring harness caught it.
 *
 * So the parent fetches it on its own origin, where the URL resolves, and the
 * source is inlined into the frame instead.
 */
let runtimeSource: Promise<string> | null = null;

function loadRuntime(): Promise<string> {
  if (!runtimeSource) {
    runtimeSource = fetch("/react-runtime.js")
      .then((res) => {
        if (!res.ok) throw new Error(`react-runtime.js returned ${res.status}`);
        return res.text();
      })
      .catch((err) => {
        // Do not cache a failure: a later run should try again rather than
        // inherit a transient network error forever.
        runtimeSource = null;
        throw err;
      });
  }
  return runtimeSource;
}

/**
 * Fixed shell. Learner code arrives later as message data, never HTML.
 *
 * `source` is the runtime, inlined. Its closing script tags are broken up
 * because the whole document is itself parsed as HTML: an unescaped
 * `</script>` inside would end the block early and leave the rest as text.
 */
export function reactRunnerDocument(source = ""): string {
  const runtime = source.replace(/<\/script/gi, "<\\/script");
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    body { margin: 0; padding: 24px; font-family: system-ui, sans-serif; color: #0f172a; }
    #react-status { color: #475569; font-size: 14px; }
  </style></head><body>
    <p id="react-status" role="status">Waiting for your component…</p>
    <div id="react-root"></div>
    <script>${runtime}<\/script>
  </body></html>`;
}

/** Resolves to a runner document with the runtime already inlined. */
export async function reactRunnerDocumentAsync(): Promise<string> {
  return reactRunnerDocument(await loadRuntime());
}

/**
 * Runs a learner React component in the same opaque-origin runtime used by the
 * visible preview. The frame owns React and the learner code; the platform
 * receives only plain assertion results over postMessage.
 */
export function runLearnerReact(
  code: string,
  checks: ReactTestSpec[],
  options: ReactRunOptions = {},
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
          { __academy: "react-run", requestId, code, checks, typescript: options.typescript === true },
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
    }, options.timeoutMs ?? RUN_TIMEOUT_MS);

    (options.runtimeSource === undefined ? loadRuntime() : Promise.resolve(options.runtimeSource))
      .then((source) => {
        frame.srcdoc = reactRunnerDocument(source);
        document.body.appendChild(frame);
      })
      .catch((err) => {
        finish({ ok: false, checks: [], error: `React could not be loaded: ${String(err.message ?? err)}` });
      });
  });
}
