"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { ProductNav } from "@/components/product-nav";
import { SiteFooter } from "@/components/site-footer";
import { curriculum } from "@/content/curriculum";
import { conceptById } from "@/content/concepts";
import { useCurriculumProgress } from "@/hooks/use-curriculum-progress";
import { baonStorageKey, buildBaonPlan } from "@/lib/baon";
import { createPassport, importPassport } from "@/lib/passport";
import {
  freshMistakeState,
  loadMistakeState,
  topMistakes,
  type MistakeState,
} from "@/lib/mistakes";

type Status = { tone: "success" | "error"; message: string } | null;

export function LearningTools() {
  const { ready, progress, refresh } = useCurriculumProgress();
  const [passportStatus, setPassportStatus] = useState<Status>(null);
  const [minutes, setMinutes] = useState(20);
  const [baonStatus, setBaonStatus] = useState<Status>(null);
  const [mistakeState, setMistakeState] = useState<MistakeState>(freshMistakeState());
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sync = () => setMistakeState(loadMistakeState());
    // Browser storage does not exist during server render. Adopt the one
    // validated cross-course record after mount, then follow lesson updates.
    sync();
    window.addEventListener("codedaddy-mistakes-changed", sync);
    window.addEventListener("codedaddy-progress-imported", sync);
    return () => {
      window.removeEventListener("codedaddy-mistakes-changed", sync);
      window.removeEventListener("codedaddy-progress-imported", sync);
    };
  }, []);

  const activeCourse = useMemo(() => {
    if (!ready) return null;
    return (
      curriculum.courses.find(
        (course) => progress[course.id].hasSession && !progress[course.id].isComplete,
      ) ??
      curriculum.courses.find((course) =>
        course.requires.every((id) => progress[id]?.isComplete),
      ) ??
      null
    );
  }, [progress, ready]);

  const activeStepIndex = activeCourse
    ? Math.min(progress[activeCourse.id].completedCount, activeCourse.steps.length - 1)
    : 0;
  const plan = activeCourse
    ? buildBaonPlan(activeCourse, activeStepIndex, minutes, "")
    : null;
  const firstMinutes = activeCourse?.steps[activeStepIndex]?.estimatedMinutes ?? 5;
  const museumEntries = topMistakes(mistakeState);

  function downloadPassport() {
    const passport = createPassport();
    const blob = new Blob([`${JSON.stringify(passport, null, 2)}\n`], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `codedaddy-progress-${passport.exportedAt.slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setPassportStatus({ tone: "success", message: "Progress Passport downloaded." });
  }

  async function readPassport(file: File | undefined) {
    if (!file) return;
    try {
      const value: unknown = JSON.parse(await file.text());
      const result = importPassport(value);
      setPassportStatus({ tone: result.ok ? "success" : "error", message: result.message });
      if (result.ok) refresh();
    } catch {
      setPassportStatus({
        tone: "error",
        message: "This file is not valid JSON. No progress was changed.",
      });
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function startBaon() {
    if (!plan || !activeCourse || plan.stepIds.length === 0) {
      setBaonStatus({
        tone: "error",
        message: `The next step needs about ${firstMinutes} minutes. Choose more time before starting.`,
      });
      return;
    }
    try {
      const savedPlan = { ...plan, createdAt: new Date().toISOString() };
      localStorage.setItem(baonStorageKey, JSON.stringify(savedPlan));
      setBaonStatus({
        tone: "success",
        message: `${plan.stepIds.length} ${plan.stepIds.length === 1 ? "step" : "steps"} planned for about ${plan.estimatedMinutes} minutes.`,
      });
    } catch {
      setBaonStatus({ tone: "error", message: "Browser storage could not save this plan." });
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-on-background">
      <ProductNav current="tools" />
      <main className="mx-auto w-full max-w-[980px] flex-1 px-margin-mobile py-8 md:px-margin-desktop md:py-12">
        <header className="max-w-[720px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">Learning tools</p>
          <h1 className="mt-4 font-display text-[38px] font-bold leading-tight text-chalk sm:text-[46px]">
            Carry your progress. Plan the time you have.
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ash">
            These tools work in your browser. They do not need an account.
          </p>
        </header>

        <div className="mt-9 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-hairline bg-panel p-5 sm:p-7" aria-labelledby="passport-heading">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-acid">Progress Passport</p>
            <h2 id="passport-heading" className="mt-3 font-display text-[26px] font-bold text-chalk">Move progress between browsers</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ash">
              Download one file, then import it on another computer. Import checks the whole file before changing any saved course.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={downloadPassport} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-3 font-mono text-[12px] font-bold text-on-primary">
                <Icon name="download" size={17} /> Download passport
              </button>
              <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-hairline px-4 py-3 font-mono text-[12px] font-bold text-chalk">
                <Icon name="folder_open" size={17} /> Import passport
                <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" onChange={(event) => void readPassport(event.target.files?.[0])} />
              </label>
            </div>
            <StatusLine status={passportStatus} />
          </section>

          <section className="rounded-2xl border border-hairline bg-panel p-5 sm:p-7" aria-labelledby="baon-heading">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-gold">Baon Mode</p>
            <h2 id="baon-heading" className="mt-3 font-display text-[26px] font-bold text-chalk">Plan a short study session</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ash">
              Choose the minutes you have. CodeDaddy keeps every lesson intact and stops the plan before the next step would run over.
            </p>
            <label htmlFor="baon-minutes" className="mt-6 block text-[14px] font-semibold text-chalk">Minutes available</label>
            <input id="baon-minutes" type="number" min={5} max={120} step={5} value={minutes} onChange={(event) => setMinutes(Math.max(1, Math.min(120, Number(event.target.value) || 1)))} className="mt-2 min-h-11 w-32 rounded-lg border border-hairline bg-void px-3 font-mono text-[15px] text-chalk" />
            {activeCourse ? (
              <div className="mt-5 rounded-lg border border-hairline bg-raised p-4 text-[14px] text-ash">
                <p className="font-semibold text-chalk">{activeCourse.title}</p>
                <p className="mt-1">
                  {plan?.stepIds.length
                    ? `${plan.stepIds.length} ${plan.stepIds.length === 1 ? "step" : "steps"}, about ${plan.estimatedMinutes} minutes`
                    : `The next step needs about ${firstMinutes} minutes.`}
                </p>
              </div>
            ) : null}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button type="button" onClick={startBaon} disabled={!activeCourse} className="min-h-11 rounded-lg bg-secondary px-4 py-3 font-mono text-[12px] font-bold text-on-secondary disabled:opacity-50">Save this plan</button>
              {activeCourse && plan?.stepIds.length ? <Link href={`/learn/${activeCourse.id}`} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-hairline px-4 py-3 font-mono text-[12px] text-chalk">Open course <Icon name="arrow_forward" size={16} /></Link> : null}
            </div>
            <StatusLine status={baonStatus} />
          </section>

          <section className="rounded-2xl border border-hairline bg-panel p-5 sm:p-7 lg:col-span-2" aria-labelledby="museum-heading">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-plasma">Mistake Museum</p>
            <h2 id="museum-heading" className="mt-3 font-display text-[26px] font-bold text-chalk">Patterns worth another look</h2>
            <p className="mt-3 max-w-[700px] text-[15px] leading-relaxed text-ash">
              A repeated check is a useful practice signal, not a score. CodeDaddy saves the check, concept, and lesson location. It never saves your code here.
            </p>
            {museumEntries.length > 0 ? (
              <ol className="mt-6 grid gap-3 md:grid-cols-3">
                {museumEntries.map((entry) => {
                  const course = curriculum.courses.find((item) => item.id === entry.courseId);
                  const project = course?.projects.find((item) => item.id === entry.projectId);
                  const step = course?.steps.find((item) => item.id === entry.stepId);
                  const concept = conceptById(entry.conceptId);
                  return (
                    <li key={entry.key} className="rounded-lg border border-hairline bg-raised p-4">
                      <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-gold">
                        <Icon name="refresh" size={16} /> {entry.count} {entry.count === 1 ? "attempt" : "attempts"}
                      </p>
                      <p className="mt-3 text-[16px] font-semibold text-chalk">{concept?.term ?? "Course foundation"}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-ash">{step?.task}</p>
                      {course ? (
                        <Link href={`/learn/${course.id}`} className="mt-4 inline-flex min-h-11 items-center gap-2 font-mono text-[11px] font-bold text-primary underline-offset-2 hover:underline">
                          Review {project?.title ?? "lesson"} <Icon name="arrow_forward" size={15} />
                        </Link>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            ) : (
              <div className="mt-6 rounded-lg border border-hairline bg-raised p-4 text-[14px] leading-relaxed text-ash">
                No patterns yet. When the same check needs another try, it will appear here with a link back to the lesson.
              </div>
            )}
          </section>
        </div>
      </main>
      <SiteFooter home="/dashboard" />
    </div>
  );
}

function StatusLine({ status }: { status: Status }) {
  if (!status) return null;
  const success = status.tone === "success";
  return (
    <p role="status" className={`mt-5 flex items-start gap-2 text-[13px] leading-relaxed ${success ? "text-acid" : "text-strike"}`}>
      <Icon name={success ? "check_circle" : "close"} size={16} filled={success} className="mt-0.5" />
      <span>{status.message}</span>
    </p>
  );
}
