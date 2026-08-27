"use client";

import { Icon } from "@/components/icon";
import { useState } from "react";
import { DiagramView } from "./diagram";
import { buildDocument } from "@/lib/grading";
import { type Concept } from "@/lib/lesson-ir";

/**
 * Introduces one new idea in four forms before the learner is asked to use it.
 *
 * Order matters. Definition, then analogy, then picture, then what they are
 * about to do. A learner who only reads the first line still gets a usable
 * answer; one who reads all four gets it from four directions.
 *
 * Collapsible, and remembered per concept, because a returning learner should
 * not have to scroll past explanations they have already understood.
 */
export function ConceptCard({
  concept,
  onSpeak,
}: {
  concept: Concept;
  onSpeak: (text: string) => void;
}) {
  const [open, setOpen] = useState(true);

  const spoken = [
    concept.term,
    concept.definition,
    concept.analogy,
  ].join(". ");

  return (
    <section className="mb-5 overflow-hidden rounded-xl border border-plasma/30 bg-panel">
      <div className="flex items-center gap-2 border-b border-hairline bg-plasma/[0.07] px-4 py-2.5">
        <span className="text-[10px] uppercase tracking-widest text-plasma">A new idea before you use it</span>
        <code className="font-mono text-[13px] font-bold text-chalk">{concept.term}</code>

        <button
          type="button"
          onClick={() => onSpeak(spoken)}
          aria-label={`Read the explanation of ${concept.term} out loud`}
          className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border border-plasma/50 text-plasma transition-transform active:scale-95"
        >
          <Icon name="volume_up" size={15} />
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="rounded border border-hairline px-2 py-0.5 text-[11px] text-ash hover:text-chalk"
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>

      {open ? (
        <div className="space-y-4 px-4 py-4">
          {/* 1. What it is */}
          <p className="text-[17px] leading-relaxed text-chalk">
            {concept.definition}
          </p>

          {/* 2. Something from ordinary life that works the same way */}
          <div className="rounded-lg border-l-2 border-gold bg-raised px-3 py-2.5">
            <div className="mb-1 text-[10px] uppercase tracking-widest text-gold">
              A familiar way to picture it
            </div>
            <p className="text-[15px] leading-relaxed text-ash">
              {concept.analogy}
            </p>
          </div>

          {/* 3. The picture */}
          {concept.visual.kind === "diagram" ? (
            <DiagramView diagram={concept.visual.diagram} />
          ) : (
            <LiveDemo
              files={concept.visual.files}
              caption={concept.visual.caption}
            />
          )}

          {/* 4. What they are about to do that proves it */}
          <div className="flex items-start gap-2 border-t border-hairline pt-3">
            <Icon name="arrow_forward" size={17} className="mt-0.5 text-secondary" />
            <p className="text-[15px] leading-relaxed text-acid">
              {concept.proof}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

/**
 * A tiny worked example running for real, beside the explanation.
 *
 * Same sandbox rule as everywhere else: `allow-scripts` and never
 * `allow-same-origin`. This is authored content rather than learner code, but
 * the rule does not get exceptions, because exceptions are how it breaks.
 */
function LiveDemo({ files, caption }: { files: Record<string, string>; caption: string }) {
  return (
    <figure className="my-1">
      <div className="overflow-hidden rounded-lg border border-hairline bg-white">
        <iframe
          title={caption}
          sandbox="allow-scripts"
          srcDoc={buildDocument(files)}
          className="h-[150px] w-full"
        />
      </div>
      <figcaption className="mt-1.5 text-[13px] text-ash">{caption}</figcaption>
    </figure>
  );
}
