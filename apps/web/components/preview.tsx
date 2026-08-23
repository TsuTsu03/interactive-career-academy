"use client";

import { useEffect, useState } from "react";
import { buildConsoleDocument, buildDocument } from "@/lib/grading";
import type { StepKind } from "@/lib/lesson-ir";

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

  const ring =
    flash === "pass"
      ? "ring-2 ring-acid glow-acid"
      : flash === "fail"
        ? "ring-2 ring-strike/60"
        : "ring-1 ring-hairline";

  return (
    <section
      className="flex min-h-0 flex-1 flex-col bg-panel"
      aria-label={kind === "js" ? "Console output" : "Live preview"}
    >
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-hairline px-3">
        <span className="h-1.5 w-1.5 rounded-full bg-plasma" aria-hidden="true" />
        <span className="text-[10px] uppercase tracking-widest text-ash">
          {kind === "js" ? "Console" : "Your page"}
        </span>
        <span className="ml-auto font-mono text-[10px] text-ash/60">live</span>
      </div>
      <div className="min-h-0 flex-1 p-3">
        <iframe
          title={kind === "js" ? "Console output" : "Your page preview"}
          sandbox="allow-scripts"
          srcDoc={srcDoc}
          className={`h-full w-full rounded-lg bg-white transition-shadow duration-300 ${ring}`}
        />
      </div>
    </section>
  );
}
