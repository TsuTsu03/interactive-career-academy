"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { buildConsoleDocument, buildDocument } from "@/lib/grading";
import type { StepKind } from "@/lib/lesson-ir";
import { reactRunnerDocumentAsync } from "@/lib/react-runner";

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
}: {
  files: Record<string, string>;
  kind: StepKind;
  flash: "none" | "pass" | "fail";
}) {
  if (kind === "react") return <ReactPreview files={files} flash={flash} />;
  return <DocumentPreview files={files} kind={kind} flash={flash} />;
}

function DocumentPreview({
  files,
  kind,
  flash,
}: {
  files: Record<string, string>;
  kind: Exclude<StepKind, "react">;
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
  const codeRef = useRef(files["app.js"] ?? "");

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
    codeRef.current = files["app.js"] ?? "";
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
