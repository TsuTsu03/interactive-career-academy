"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { buildConsoleDocument, buildDocument } from "@/lib/grading";
import type { StepKind } from "@/lib/lesson-ir";
import { reactRunnerDocumentAsync } from "@/lib/react-runner";
import { runLearnerSql, type SqlRunResult } from "@/lib/sql-runner";

const REACT_PREVIEW_TIMEOUT_MS = 4000;

function previewRing(flash: "none" | "pass" | "fail") {
  return flash === "pass"
    ? "ring-2 ring-secondary"
    : flash === "fail"
      ? "ring-2 ring-error/60"
      : "ring-1 ring-outline-variant";
}

/**
 * The learner's real output, updated as they type.
 *
 * `sandbox="allow-scripts"` WITHOUT `allow-same-origin`. That combination is
 * the whole point: learner code can run, and it can reach nothing belonging to
 * the platform. Never add allow-same-origin here — together the two flags let
 * sandboxed content remove its own sandbox.
 *
 * For script steps the pane becomes a console rather than disappearing, so the
 * layout never shifts under the learner between lesson kinds.
 */
export function Preview({
  files,
  kind,
  flash,
  sqlSeed,
}: {
  files: Record<string, string>;
  kind: StepKind;
  flash: "none" | "pass" | "fail";
  sqlSeed?: string;
}) {
  if (kind === "react") return <ReactPreview files={files} flash={flash} />;
  if (kind === "sql") return <SqlPreview files={files} seed={sqlSeed ?? ""} flash={flash} />;
  return <DocumentPreview files={files} kind={kind} flash={flash} />;
}

function DocumentPreview({
  files,
  kind,
  flash,
}: {
  files: Record<string, string>;
  kind: Exclude<StepKind, "react" | "sql">;
  flash: "none" | "pass" | "fail";
}) {
  const build = () =>
    kind === "js" ? buildConsoleDocument(files["script.js"] ?? "") : buildDocument(files);

  const [srcDoc, setSrcDoc] = useState(build);

  // Debounced so a fast typist does not re-render the frame on every keystroke.
  useEffect(() => {
    const t = setTimeout(
      () =>
        setSrcDoc(
          kind === "js" ? buildConsoleDocument(files["script.js"] ?? "") : buildDocument(files),
        ),
      260,
    );
    return () => clearTimeout(t);
  }, [files, kind]);

  const ring = previewRing(flash);

  return (
    <section
      className="flex min-h-0 flex-1 flex-col bg-surface"
      aria-label={kind === "js" ? "Console output" : "Live preview"}
    >
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-outline-variant bg-surface-container px-2">
        <span className="px-2 text-label-caps uppercase tracking-widest text-on-surface-variant">
          {kind === "js" ? "Console output" : "Live Preview"}
        </span>
        <button
          type="button"
          onClick={() => openInNewTab(srcDoc)}
          title="Open this preview in a new tab"
          aria-label="Open this preview in a new tab"
          className="ml-auto flex h-8 w-8 items-center justify-center rounded text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary"
        >
          <Icon name="open_in_new" size={16} />
        </button>
      </div>
      <div className="min-h-0 flex-1 bg-surface p-3 sm:p-5">
        <iframe
          title={kind === "js" ? "Console output" : "Your page preview"}
          sandbox="allow-scripts"
          srcDoc={srcDoc}
          className={`h-full w-full bg-white transition-shadow duration-300 ${ring}`}
        />
      </div>
    </section>
  );
}

/**
 * The rows the learner's query returned, updated as they type.
 *
 * A SQL learner needs to see the result, not a rendered page — the result set
 * *is* the output. The query runs in the disposable opaque-origin frame of
 * `lib/sql-runner.ts` against a database rebuilt from the step's seed every
 * time, so nothing carries over between runs.
 *
 * A half-typed query is a syntax error most of the time, so an error while
 * typing is reported plainly and without alarm: it is the normal state of
 * writing SQL, not a failure worth shouting about.
 */
function SqlPreview({
  files,
  seed,
  flash,
}: {
  files: Record<string, string>;
  seed: string;
  flash: "none" | "pass" | "fail";
}) {
  const sql = files["query.sql"] ?? "";
  // The query that produced this result is stored beside it, so a result from
  // an earlier keystroke is never shown against the text now on screen.
  const [answered, setAnswered] = useState<{ sql: string; result: SqlRunResult } | null>(null);

  useEffect(() => {
    if (!sql.trim()) return;
    // Debounced so a fast typist does not spawn a frame per keystroke.
    const timer = window.setTimeout(() => {
      runLearnerSql(seed, sql).then((result) => setAnswered({ sql, result }));
    }, 400);
    return () => window.clearTimeout(timer);
  }, [sql, seed]);

  const run = answered && answered.sql === sql ? answered.result : null;
  const pending = Boolean(sql.trim()) && !run;
  const result = run?.results[0];

  return (
    <section className="flex min-h-0 flex-1 flex-col bg-surface" aria-label="Query results">
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-outline-variant bg-surface-container px-4">
        <span className="text-label-caps uppercase tracking-widest text-on-surface-variant">
          Results
        </span>
        {run && result ? (
          <span className="text-label-caps text-on-surface-variant">
            {result.rows.length} {result.rows.length === 1 ? "row" : "rows"}
          </span>
        ) : null}
      </div>

      <div
        className={`min-h-0 flex-1 overflow-auto bg-surface p-3 transition-shadow duration-300 sm:p-5 ${previewRing(flash)}`}
        aria-live="polite"
        aria-busy={pending}
      >
        {!sql.trim() ? (
          <p className="text-body-sm text-on-surface-variant">
            Write a query and the rows it returns will appear here.
          </p>
        ) : run?.seedError ? (
          <p className="flex items-start gap-2 text-body-sm text-error">
            <Icon name="close" size={16} />
            <span>
              <strong>Lesson problem:</strong> this step&rsquo;s starting data could not be built.
              {" "}
              {run.seedError}
            </span>
          </p>
        ) : run?.error ? (
          <p className="flex items-start gap-2 text-body-sm text-on-surface-variant">
            <Icon name="help" size={16} />
            <span>
              <strong>Not valid SQL yet:</strong> {run.error}
            </span>
          </p>
        ) : !result ? (
          <p className="text-body-sm text-on-surface-variant">
            {run
              ? "That ran, but it did not return any rows. A SELECT is what produces rows."
              : "Running…"}
          </p>
        ) : result.rows.length === 0 ? (
          <p className="flex items-start gap-2 text-body-sm text-on-surface-variant">
            <Icon name="help" size={16} />
            <span>No rows matched. The query is valid — nothing in the table fits it.</span>
          </p>
        ) : (
          <table className="w-full border-collapse text-body-sm">
            <thead>
              <tr>
                {result.columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="border-b border-outline-variant px-3 py-2 text-left font-medium text-on-surface-variant"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className="border-b border-outline-variant/50 px-3 py-2 text-on-surface"
                    >
                      {cell === null ? (
                        <span className="text-on-surface-variant italic">NULL</span>
                      ) : (
                        String(cell)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

function ReactPreview({
  files,
  flash,
}: {
  files: Record<string, string>;
  flash: "none" | "pass" | "fail";
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const readyRef = useRef(false);
  const requestRef = useRef(0);
  const watchdogRef = useRef<number | null>(null);
  const [runtimeKey, setRuntimeKey] = useState(0);
  const codeRef = useRef(files["app.tsx"] ?? files["app.js"] ?? "");
  const typescriptRef = useRef(files["app.tsx"] !== undefined);

  // The runtime is inlined rather than linked. This frame has an opaque
  // origin, so a relative `<script src>` inside it has nothing to resolve
  // against and 404s; the parent fetches it on its own origin instead. See
  // lib/react-runner.ts.
  const [runnerDoc, setRunnerDoc] = useState<string | undefined>(undefined);
  useEffect(() => {
    let live = true;
    reactRunnerDocumentAsync().then((doc) => {
      if (live) setRunnerDoc(doc);
    });
    return () => {
      live = false;
    };
  }, []);

  const send = () => {
    if (!readyRef.current) return;
    requestRef.current += 1;
    const requestId = `preview-${requestRef.current}`;
    if (watchdogRef.current !== null) window.clearTimeout(watchdogRef.current);
    watchdogRef.current = window.setTimeout(() => {
      readyRef.current = false;
      watchdogRef.current = null;
      setRuntimeKey((key) => key + 1);
    }, REACT_PREVIEW_TIMEOUT_MS);
    frameRef.current?.contentWindow?.postMessage(
      {
        __academy: "react-run",
        requestId,
        code: codeRef.current,
        checks: [],
        typescript: typescriptRef.current,
      },
      "*",
    );
  };

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== frameRef.current?.contentWindow) return;
      const data = event.data as Record<string, unknown> | null;
      if (data?.__academy === "react-ready") {
        readyRef.current = true;
        send();
        return;
      }
      if (
        data?.__academy === "react-result" &&
        data.requestId === `preview-${requestRef.current}`
      ) {
        if (watchdogRef.current !== null) window.clearTimeout(watchdogRef.current);
        watchdogRef.current = null;
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      if (watchdogRef.current !== null) window.clearTimeout(watchdogRef.current);
    };
  }, []);

  useEffect(() => {
    codeRef.current = files["app.tsx"] ?? files["app.js"] ?? "";
    const timer = window.setTimeout(send, 260);
    return () => window.clearTimeout(timer);
  }, [files]);

  const ring = previewRing(flash);

  return (
    <section className="flex min-h-0 flex-1 flex-col bg-surface" aria-label="Live preview">
      <div className="flex h-10 shrink-0 items-center border-b border-outline-variant bg-surface-container px-4">
        <span className="text-label-caps uppercase tracking-widest text-on-surface-variant">
          Live Preview
        </span>
      </div>
      <div className="min-h-0 flex-1 bg-surface p-3 sm:p-5">
        <iframe
          key={runtimeKey}
          ref={frameRef}
          title="Your React component preview"
          sandbox="allow-scripts"
          srcDoc={runnerDoc}
          className={`h-full w-full bg-white ${ring}`}
        />
      </div>
    </section>
  );
}

/**
 * Opens the learner's rendered page in its own tab.
 *
 * The document is handed over as a blob so the new tab shows exactly what the
 * preview pane shows, without the platform serving learner code from its own
 * origin.
 */
function openInNewTab(srcDoc: string) {
  const url = URL.createObjectURL(new Blob([srcDoc], { type: "text/html" }));
  window.open(url, "_blank", "noopener,noreferrer");
  // The tab keeps its own copy once loaded, so the handle can be released.
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
