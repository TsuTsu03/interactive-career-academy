"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { Icon } from "@/components/icon";
import { Preview } from "@/components/preview";
import { gradeStep, type TestResult } from "@/lib/grading";
import type { PracticeActivity } from "@/lib/practice-ir";
import { loadPracticeState, savePracticeState } from "@/lib/practice-progress";

type Phase = "editing" | "running" | "passed" | "failed";

function languageFor(file: string) {
  if (file.endsWith(".css")) return "css";
  if (file.endsWith(".js")) return "js";
  return "html";
}

export function PracticeWorkspace({ activity }: { activity: PracticeActivity }) {
  const [{ files, activeFile }, setDraft] = useState({
    files: activity.files,
    activeFile: activity.activeFile,
  });
  const [phase, setPhase] = useState<Phase>("editing");
  const [results, setResults] = useState<TestResult[]>([]);
  const [hintLevel, setHintLevel] = useState(0);
  const [available, setAvailable] = useState(!activity.sourceActivityId);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const state = loadPracticeState();
      const requirements = [activity.sourceActivityId, ...(activity.requiresActivityIds ?? [])].filter((id): id is string => Boolean(id));
      const sourceComplete = requirements.every((id) => state.completions.some((item) => item.activityId === id));
      setAvailable(sourceComplete);
      if (!sourceComplete) return;
      const draft = state.drafts[activity.id] ?? (activity.sourceActivityId ? state.drafts[activity.sourceActivityId] : null);
      if (draft) setDraft(draft);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [activity.id, activity.requiresActivityIds, activity.sourceActivityId]);

  useEffect(() => {
    if (!available) return;
    const timer = window.setTimeout(() => {
      const state = loadPracticeState();
      savePracticeState({
        ...state,
        drafts: { ...state.drafts, [activity.id]: { files, activeFile } },
      });
    }, 400);
    return () => window.clearTimeout(timer);
  }, [activity.id, activeFile, available, files]);

  const run = useCallback(async () => {
    if (phase === "running" || !available) return;
    setPhase("running");
    setResults(activity.tests.map((test) => ({ id: test.id, label: test.label, status: "waiting" })));
    let graded: TestResult[];
    try {
      graded = await gradeStep(activity, files);
    } catch {
      graded = activity.tests.map((test) => ({
        id: test.id,
        label: test.label,
        status: "failed",
        message: "The checker could not finish. Your draft is saved. Try once more.",
      }));
    }
    setResults(graded);
    const passed = graded.every((result) => result.status === "passed");
    setPhase(passed ? "passed" : "failed");
    if (passed) {
      const state = loadPracticeState();
      const completion = {
        activityId: activity.id,
        passedTestIds: graded.map((result) => result.id),
        completedAt: new Date().toISOString(),
      };
      savePracticeState({
        ...state,
        completions: [
          ...state.completions.filter((item) => item.activityId !== activity.id),
          completion,
        ],
      });
    }
  }, [activity, available, files, phase]);

  function reset() {
    setDraft({ files: activity.files, activeFile: activity.activeFile });
    setResults([]);
    setPhase("editing");
    setHintLevel(0);
  }

  if (!available) {
    const source = activity.sourceActivityId;
    const capstone = activity.mode === "capstone";
    return <main className="flex min-h-[100dvh] items-center justify-center bg-void p-5 text-chalk"><section className="max-w-[560px] rounded-xl border border-gold/40 bg-panel p-6"><p className="font-mono text-[11px] font-bold uppercase tracking-wider text-gold">{capstone ? "Final capstone locked" : "Remix locked"}</p><h1 className="mt-3 font-display text-[30px] font-bold">{capstone ? "Finish the first four capstones." : "Finish the source build first."}</h1><p className="mt-3 text-[15px] leading-relaxed text-ash">{capstone ? "The portfolio uses the other four projects as its content, so it is built last." : "A remix starts from a completed copy. Your original draft stays separate and unchanged."}</p><Link href={source ? `/practice/${source}` : "/capstones"} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 font-mono text-[12px] font-bold text-on-primary">{capstone ? "View capstones" : "Open source activity"} <Icon name="arrow_forward" size={16} /></Link></section></main>;
  }

  const modeLabel = activity.mode === "rebuild" ? "Rebuild Mode" : activity.mode === "bug-clinic" ? "Bug Clinic" : activity.mode === "constraint" ? "Constraint Mission" : activity.mode === "remix" ? "Project Remix" : `Capstone ${activity.index} of 5`;

  return (
    <main className="min-h-[100dvh] bg-void text-chalk">
      <header className="border-b border-hairline bg-surface px-margin-mobile py-4 md:px-margin-desktop">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
          <div>
            <Link href={activity.mode === "capstone" ? "/capstones" : "/practice"} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary underline-offset-2 hover:underline">
              ← {activity.mode === "capstone" ? "Capstones" : "Practice lab"}
            </Link>
            <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-acid">
              {modeLabel}
            </p>
            <h1 className="mt-1 font-display text-[24px] font-bold">{activity.title}</h1>
          </div>
          <button type="button" onClick={() => void run()} disabled={phase === "running"} className="min-h-11 shrink-0 rounded-lg bg-primary px-5 font-mono text-[12px] font-bold text-on-primary disabled:opacity-60">
            {phase === "running" ? "Checking…" : "Run checks"}
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1200px] gap-5 p-margin-mobile md:p-margin-desktop lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="rounded-xl border border-hairline bg-panel p-5">
          <p className="text-[15px] leading-relaxed text-ash">{activity.summary}</p>
          <h2 className="mt-5 font-mono text-[10px] font-bold uppercase tracking-wider text-gold">Your brief</h2>
          <p className="mt-2 text-[17px] font-semibold leading-relaxed">{activity.task}</p>
          <p className="mt-4 text-[13px] leading-relaxed text-ash">
            {activity.mode === "capstone" ? "This independent project contributes to the certificate requirements. The draft stays in this browser until you sign in and merge it with your account." : "This optional activity does not block your course. Your draft stays in this browser."}
          </p>

          {activity.constraints?.length ? (
            <section className="mt-5 rounded-lg border border-gold/40 bg-raised p-4" aria-labelledby="activity-constraints-heading">
              <h2 id="activity-constraints-heading" className="font-mono text-[10px] font-bold uppercase tracking-wider text-gold">Authored constraints</h2>
              <ul className="mt-3 space-y-3">{activity.constraints.map((constraint) => <li key={constraint.id}><p className="text-[14px] font-semibold text-chalk">{constraint.label}</p><p className="mt-1 text-[12px] leading-relaxed text-ash">{constraint.description}</p></li>)}</ul>
            </section>
          ) : null}

          <h2 className="mt-6 font-mono text-[10px] font-bold uppercase tracking-wider text-plasma">Checks</h2>
          <ul className="mt-3 space-y-3">
            {activity.tests.map((test) => {
              const result = results.find((item) => item.id === test.id);
              const status = result?.status ?? "waiting";
              return (
                <li key={test.id} data-check-status={status} className="flex items-start gap-2 text-[14px] leading-relaxed">
                  <Icon name={status === "passed" ? "check_circle" : status === "failed" ? "close" : "radio_button_unchecked"} size={17} className={status === "passed" ? "text-acid" : status === "failed" ? "text-strike" : "text-ash"} />
                  <span><span className="sr-only">{status}. </span>{result?.message ?? test.label}</span>
                </li>
              );
            })}
          </ul>

          {phase === "passed" ? (
            <div className="mt-5"><p role="status" className="flex items-center gap-2 rounded-lg border border-acid/40 bg-raised p-3 text-[14px] text-acid"><Icon name="check_circle" size={18} filled /> Activity complete. Evidence saved.</p>{activity.mode === "capstone" ? <Link href={`/capstones/${activity.id}/submit`} className="mt-3 inline-flex min-h-11 items-center rounded-lg border border-hairline px-4 font-mono text-[11px] font-bold text-chalk">Record project links</Link> : null}</div>
          ) : null}

          <div className="mt-6 space-y-2">
            {activity.hints.slice(0, hintLevel).map((hint) => <p key={hint.level} className="rounded-lg border border-hairline bg-raised p-3 text-[13px] leading-relaxed text-ash">{hint.text}</p>)}
            {hintLevel < activity.hints.length ? (
              <button type="button" onClick={() => setHintLevel((level) => level + 1)} className="min-h-11 w-full rounded-lg border border-hairline font-mono text-[11px] font-bold">{hintLevel === 0 ? "Use a hint" : "Get another hint"}</button>
            ) : null}
            <button type="button" onClick={reset} className="min-h-11 w-full font-mono text-[11px] text-ash underline-offset-2 hover:underline">Reset this activity</button>
          </div>
        </aside>

        <div className="min-w-0 space-y-5">
          <section className="overflow-hidden rounded-xl border border-hairline bg-surface" aria-label="Practice code editor">
            <div className="flex h-11 overflow-x-auto border-b border-hairline bg-raised">
              {Object.keys(files).map((name) => (
                <button key={name} type="button" onClick={() => setDraft((draft) => ({ ...draft, activeFile: name }))} aria-pressed={activeFile === name} className={`shrink-0 border-r border-hairline px-4 font-mono text-[12px] ${activeFile === name ? "bg-surface text-primary" : "text-ash"}`}>{name}</button>
              ))}
            </div>
            <div className="h-[360px] min-h-0">
              <CodeEditor value={files[activeFile] ?? ""} onChange={(value) => { setDraft((draft) => ({ ...draft, files: { ...draft.files, [draft.activeFile]: value } })); setPhase("editing"); }} language={languageFor(activeFile)} highlightToken={activeFile === activity.activeFile ? activity.highlightToken : undefined} label={`Practice code editor, ${activeFile}`} />
            </div>
          </section>
          <section className="h-[360px] overflow-hidden rounded-xl border border-hairline bg-surface" aria-label="Practice preview">
            <Preview files={files} kind={activity.kind} flash={phase === "passed" ? "pass" : phase === "failed" ? "fail" : "none"} />
          </section>
        </div>
      </div>
    </main>
  );
}
