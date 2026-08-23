"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BlockTray } from "./block-tray";
import { ConceptCard } from "./concept-card";
import { CodeEditor } from "./code-editor";
import { Hud, LEVEL_STEP, rankFor, type GameState } from "./hud";
import { ParticleBurst } from "./juice";
import { Preview } from "./preview";
import { RankUp } from "./rank-up";
import { gradeStep, type TestResult } from "@/lib/grading";
import { copy, type Course, type Register } from "@/lib/lesson-ir";
import {
  applyChallengeProgress,
  freshChallengeState,
  isComplete,
  restoreChallengeState,
  todaysChallenges,
  type ChallengeState,
} from "@/lib/challenges";
import { courseStorageKey, normalizeCompletedStepIds } from "@/lib/progress";
import {
  enrollStepConcepts,
  freshReviewState,
  restoreReviewState,
  todayKey,
  type ReviewState,
} from "@/lib/review";
import {
  freshSubmissionDraft,
  restoreSubmissionDraft,
  type SubmissionDraft,
} from "@/lib/submission";

const INITIAL: GameState = {
  xp: 0,
  level: 1,
  streak: 1,
  shields: 2,
  combo: 1,
};

type Phase = "editing" | "running" | "passed" | "failed";

const VIEW_COURSE_MAP = {
  simple: "VIEW COURSE MAP",
  standard: "VIEW COURSE MAP",
} as const;

/**
 * Everything that survives a reload, held as one object.
 *
 * Persisted state is atomic on purpose: a partial restore (progress without
 * the matching files, say) would show the learner someone else's code under
 * their own step number. One object means one write and one read.
 */
interface Session {
  game: GameState;
  stepIdx: number;
  register: Register;
  files: Record<string, string>;
  activeFile: string;
  challenges: ChallengeState;
  completedSteps: string[];
  review: ReviewState;
  submissionDraft: SubmissionDraft;
}

function initialSession(course: Course): Session {
  return {
    game: INITIAL,
    stepIdx: 0,
    register: "simple",
    files: course.steps[0].files,
    activeFile: course.steps[0].activeFile,
    // Stable placeholder for SSR. The mount effect replaces it with today's
    // state, so rendering never reads the clock.
    challenges: freshChallengeState("1970-1-1"),
    completedSteps: [],
    review: freshReviewState(),
    submissionDraft: freshSubmissionDraft(),
  };
}

function loadSession(course: Course): Session | null {
  try {
    const raw = localStorage.getItem(courseStorageKey(course.id));
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<Session>;
    if (
      typeof saved.stepIdx !== "number" ||
      saved.stepIdx < 0 ||
      saved.stepIdx >= course.steps.length
    ) {
      return null;
    }
    const step = course.steps[saved.stepIdx];
    const completedSteps = normalizeCompletedStepIds(
      course,
      saved.stepIdx,
      saved.completedSteps,
    );
    return {
      game: saved.game ?? INITIAL,
      stepIdx: saved.stepIdx,
      register: saved.register === "standard" ? "standard" : "simple",
      files: saved.files ?? step.files,
      activeFile: saved.activeFile ?? step.activeFile,
      challenges: restoreChallengeState(saved.challenges),
      completedSteps,
      review: restoreReviewState(saved.review, course, completedSteps, todayKey()),
      submissionDraft: restoreSubmissionDraft(saved.submissionDraft),
    };
  } catch {
    // A corrupt snapshot must never block the learner. Start clean instead.
    return null;
  }
}

export function Workspace({ course }: { course: Course }) {
  const [session, setSession] = useState<Session>(() => initialSession(course));
  const { game, stepIdx, register, files, activeFile } = session;

  const setGame = useCallback(
    (next: GameState | ((g: GameState) => GameState)) =>
      setSession((s) => ({
        ...s,
        game: typeof next === "function" ? next(s.game) : next,
      })),
    [],
  );
  const setRegister = useCallback(
    (r: Register) => setSession((s) => ({ ...s, register: r })),
    [],
  );
  const setFiles = useCallback(
    (f: Record<string, string>) => setSession((s) => ({ ...s, files: f })),
    [],
  );
  const setActiveFile = useCallback(
    (f: string) => setSession((s) => ({ ...s, activeFile: f })),
    [],
  );

  const [results, setResults] = useState<TestResult[]>([]);
  const [phase, setPhase] = useState<Phase>("editing");
  const [hintLevel, setHintLevel] = useState(0);
  const [usedHint, setUsedHint] = useState(false);
  const [burst, setBurst] = useState(0);
  const [gain, setGain] = useState({ fire: 0, amount: 0 });
  const [challengeNotice, setChallengeNotice] = useState<{
    fire: number;
    count: number;
    xp: number;
  } | null>(null);
  const [shake, setShake] = useState(false);
  const [rankUp, setRankUp] = useState<string | null>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  const step = course.steps[stepIdx];
  const total = course.steps.length;
  const isLast = stepIdx === total - 1;

  /* ------------------------------------------------------------------ */
  /* Persistence                                                         */
  /* ------------------------------------------------------------------ */

  // Restore runs once after mount, never during render.
  //
  // The server has no localStorage, so it must render the default session and
  // the client adopts the saved one on hydration. That makes a single mount
  // effect the only correct place for this. It is one atomic setState, so the
  // cascading-render concern behind the lint rule does not apply here.
  useEffect(() => {
    const saved = loadSession(course);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(
      saved ?? {
        ...initialSession(course),
        challenges: freshChallengeState(),
      },
    );
  }, [course]);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(courseStorageKey(course.id), JSON.stringify(session));
      } catch {
        // Storage full or blocked. Editing continues regardless.
      }
    }, 400);
    return () => clearTimeout(t);
  }, [session, course.id]);

  useEffect(() => {
    if (!challengeNotice) return;
    const timer = setTimeout(() => setChallengeNotice(null), 4000);
    return () => clearTimeout(timer);
  }, [challengeNotice]);

  /* ------------------------------------------------------------------ */
  /* Running                                                             */
  /* ------------------------------------------------------------------ */

  const run = useCallback(async () => {
    if (phase === "running") return;
    setPhase("running");
    setResults(
      step.tests.map((t) => ({ id: t.id, label: t.label, status: "waiting" as const })),
    );

    let graded: TestResult[];
    try {
      graded = await gradeStep(step, files);
    } catch {
      // Grading must never strand the learner in a running state with no way
      // back. Fail visibly and leave Run pressable.
      setPhase("failed");
      setResults(
        step.tests.map((t) => ({
          id: t.id,
          label: t.label,
          status: "failed" as const,
          message: {
            simple: "Something went wrong on our side. Press Run it again.",
            standard: "The checker could not run. Press Run it again.",
          },
        })),
      );
      announce("The checker could not run. Try again.");
      return;
    }

    // Resolve rows one at a time so the outcome reads as a sequence.
    for (let i = 0; i < graded.length; i++) {
      await new Promise((r) => setTimeout(r, 140));
      setResults((prev) => prev.map((row, j) => (j === i ? graded[i] : row)));
    }

    const allPassed = graded.every((g) => g.status === "passed");

    if (allPassed) {
      const firstClear = !session.completedSteps.includes(step.id);
      const multiplier = usedHint ? 1 : game.combo;
      const stepAward = firstClear ? Math.round(step.xp * multiplier) : 0;
      const nextCombo = usedHint ? 1 : Math.min(5, game.combo + 1);
      const fixedChecks = results.filter((result) => result.status === "failed").length;
      const challengeUpdate = firstClear
        ? applyChallengeProgress(session.challenges, {
            steps: 1,
            noHints: usedHint ? 0 : 1,
            combo: nextCombo,
            fixedChecks,
          })
        : { state: session.challenges, completed: [], bonusXp: 0 };
      const award = stepAward + challengeUpdate.bonusXp;
      const nextXp = game.xp + award;
      const nextLevel = Math.floor(nextXp / LEVEL_STEP) + 1;

      if (firstClear) setBurst((n) => n + 1);
      setGain({ fire: firstClear ? Date.now() : 0, amount: award });
      setPhase("passed");

      if (firstClear && !usedHint && game.combo >= 3) {
        setShake(true);
        setTimeout(() => setShake(false), 140);
      }

      const priorRank = rankFor(game.level);
      const newRank = rankFor(nextLevel);

      setSession((sess) => {
        return {
          ...sess,
          game: {
            ...sess.game,
            xp: nextXp,
            level: nextLevel,
            combo: firstClear ? nextCombo : sess.game.combo,
          },
          challenges: challengeUpdate.state,
          completedSteps: firstClear
            ? [...sess.completedSteps, step.id]
            : sess.completedSteps,
          review: firstClear
            ? enrollStepConcepts(sess.review, step, todayKey())
            : sess.review,
        };
      });

      if (challengeUpdate.completed.length > 0) {
        setChallengeNotice((notice) => ({
          fire: (notice?.fire ?? 0) + 1,
          count: challengeUpdate.completed.length,
          xp: challengeUpdate.bonusXp,
        }));
      }

      if (newRank !== priorRank) setRankUp(newRank);
      announce(
        !firstClear
          ? "Step clear. You already earned the reward for this step."
          : challengeUpdate.completed.length > 0
          ? `Step clear. ${stepAward} XP. Daily challenge complete. ${challengeUpdate.bonusXp} bonus XP.`
          : `Step clear. ${stepAward} XP.`,
      );
    } else {
      setPhase("failed");
      if (game.combo > 1) setGame((g) => ({ ...g, combo: 1 }));
      const firstFail = graded.find((g) => g.status === "failed");
      announce(
        firstFail?.message ? copy(firstFail.message, register) : "Some checks did not pass.",
      );
    }
  }, [
    phase,
    step,
    files,
    register,
    game.combo,
    game.xp,
    game.level,
    usedHint,
    results,
    session.challenges,
    session.completedSteps,
    setGame,
  ]);

  function announce(msg: string) {
    if (liveRef.current) liveRef.current.textContent = msg;
  }

  /* ------------------------------------------------------------------ */
  /* Step navigation                                                     */
  /* ------------------------------------------------------------------ */

  const goNext = useCallback(() => {
    if (isLast) return;
    const next = course.steps[stepIdx + 1];
    setSession((s) => ({
      ...s,
      stepIdx: s.stepIdx + 1,
      files: next.files,
      activeFile: next.activeFile,
    }));
    setResults([]);
    setPhase("editing");
    setHintLevel(0);
    setUsedHint(false);
  }, [isLast, course.steps, stepIdx]);

  const resetStep = useCallback(() => {
    setFiles(step.files);
    setResults([]);
    setPhase("editing");
  }, [step, setFiles]);

  /* ------------------------------------------------------------------ */
  /* Keyboard                                                            */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (phase === "passed") goNext();
        else void run();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        // Never hand this to the browser's save dialog.
        e.preventDefault();
        announce("Checkpoint saved.");
      }
      if (e.key === "Enter" && phase === "passed" && !isLast) {
        const t = e.target as HTMLElement | null;
        if (t && /^(A|BUTTON|INPUT|TEXTAREA)$/.test(t.tagName)) return;
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [run, goNext, phase, isLast]);

  /* ------------------------------------------------------------------ */
  /* Derived                                                             */
  /* ------------------------------------------------------------------ */

  const activeChallenge = useMemo(() => {
    const c = session.challenges;
    if (c.day === "1970-1-1") return null;
    const pick =
      todaysChallenges(c.day).find((ch) => !isComplete(c, ch)) ?? todaysChallenges(c.day)[0];
    return {
      label: copy(pick.title, register),
      done: Math.min(c.progress[pick.id] ?? 0, pick.target),
      target: pick.target,
      complete: isComplete(c, pick),
    };
  }, [session.challenges, register]);

  const passedCount = results.filter((r) => r.status === "passed").length;
  const failed = results.filter((r) => r.status === "failed");
  const errorLine = useMemo(() => {
    if (phase !== "failed" || !step.highlightToken) return null;
    const idx = (files[activeFile] ?? "").split("\n").findIndex((l) =>
      l.includes(step.highlightToken!),
    );
    return idx >= 0 ? idx + 1 : null;
  }, [phase, step.highlightToken, files, activeFile]);

  const placeBlock = useCallback(
    (block: string) => {
      const line = step.slotLine ?? 1;
      const current = (files[step.activeFile] ?? "").split("\n");
      while (current.length < line) current.push("");

      const target = current[line - 1];
      const indent = target.match(/^\s*/)?.[0] ?? "";

      if (target.trim() === "") {
        // The authored slot is empty, as intended: fill it.
        current[line - 1] = indent + block;
      } else {
        // The slot points at real markup. An authoring mistake must never
        // delete the learner's code, so insert below it instead of replacing.
        current.splice(line, 0, indent + block);
      }

      setFiles({ ...files, [step.activeFile]: current.join("\n") });
      setPhase("editing");
    },
    [files, step, setFiles],
  );

  const fileNames = Object.keys(step.files);

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-void">
      <div ref={liveRef} aria-live="polite" className="sr-only" />

      <Hud
        state={game}
        breadcrumb={course.project}
        gainFire={gain.fire}
        gainAmount={gain.amount}
        challenge={activeChallenge ?? undefined}
      />

      {challengeNotice ? (
        <div
          key={challengeNotice.fire}
          className="animate-toast absolute right-4 top-16 z-30 flex items-center gap-3 rounded-lg border border-acid/50 bg-panel px-4 py-3 shadow-lg"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-acid font-bold text-void"
          >
            ✓
          </span>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-acid">
              {challengeNotice.count === 1
                ? "Daily challenge complete"
                : `${challengeNotice.count} daily challenges complete`}
            </div>
            <div className="mt-0.5 text-[13px] text-chalk">
              Bonus: +{challengeNotice.xp} XP
            </div>
          </div>
          <button
            type="button"
            aria-label="Dismiss challenge message"
            onClick={() => setChallengeNotice(null)}
            className="ml-1 flex h-7 w-7 items-center justify-center rounded text-ash hover:bg-raised hover:text-chalk"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* ---------------- Instruction rail ---------------- */}
        <aside className="flex w-full shrink-0 flex-col overflow-y-auto border-b border-hairline p-5 lg:w-[26%] lg:border-b-0 lg:border-r">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-[13px] font-bold uppercase tracking-wider text-voltage">
              Step {step.index} of {total}
            </span>
            <div className="flex flex-1 gap-1" aria-hidden="true">
              {course.steps.map((s, i) => (
                <span
                  key={s.id}
                  className={`h-1 flex-1 rounded-full ${
                    i < stepIdx ? "bg-acid" : i === stepIdx ? "bg-voltage" : "bg-hairline"
                  }`}
                />
              ))}
            </div>
          </div>

          {step.concepts?.map((c) => (
            <ConceptCard key={c.id} concept={c} register={register} onSpeak={speak} />
          ))}

          <div className="mb-4 flex items-start gap-3">
            <p className="flex-1 text-[18px] leading-relaxed text-chalk">
              {copy(step.task, register)}
            </p>
            <button
              type="button"
              onClick={() => speak(copy(step.task, register))}
              aria-label="Read this out loud"
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-voltage/60 text-voltage transition-transform active:scale-95"
            >
              <span aria-hidden="true" className="text-sm">
                ♪
              </span>
            </button>
          </div>

          {/* Register toggle */}
          <div
            className="mb-6 inline-flex self-start rounded-full border border-hairline bg-panel p-0.5"
            role="group"
            aria-label="Reading level"
          >
            {(["simple", "standard"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegister(r)}
                aria-pressed={register === r}
                className={`rounded-full px-3 py-1 text-xs capitalize transition-colors ${
                  register === r ? "bg-voltage font-bold text-void" : "text-ash"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="mb-2 text-[10px] uppercase tracking-widest text-ash">What to check</div>
          <ul className="mb-6 space-y-2">
            {step.tests.map((t) => {
              const res = results.find((r) => r.id === t.id);
              const status = res?.status ?? "waiting";
              return (
                <li key={t.id} className="flex items-start gap-2.5 text-[15px]">
                  <StatusGlyph status={status} />
                  <span
                    className={
                      status === "passed"
                        ? "text-ash line-through"
                        : status === "failed"
                          ? "text-chalk"
                          : "text-ash"
                    }
                  >
                    {copy(t.label, register)}
                  </span>
                </li>
              );
            })}
          </ul>

          {phase === "failed" && failed[0]?.message ? (
            <div className="mb-4 rounded-lg border-l-2 border-strike bg-raised p-3">
              <p className="text-[15px] leading-relaxed text-chalk">
                {copy(failed[0].message, register)}
              </p>
              {failed[0].expected ? (
                <div className="mt-3 grid grid-cols-2 gap-3 rounded bg-void p-2.5 font-mono text-[12px]">
                  <div>
                    <div className="mb-1 text-[9px] uppercase tracking-widest text-ash">
                      Should be
                    </div>
                    <div className="text-acid">{failed[0].expected}</div>
                  </div>
                  <div className="border-l border-hairline pl-3">
                    <div className="mb-1 text-[9px] uppercase tracking-widest text-ash">Yours</div>
                    <div className="text-strike">{failed[0].actual}</div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {phase === "passed" ? (
            <div className="mb-4">
              <div className="font-display text-[26px] font-bold tracking-tight text-acid">
                STEP CLEAR
              </div>
              <p className="mt-1 text-[15px] text-ash">
                {isLast
                  ? "Course complete. You built the whole thing."
                  : `Next: ${copy(course.steps[stepIdx + 1].task, register)}`}
              </p>
            </div>
          ) : null}

          <div className="mt-auto space-y-2 pt-4">
            {hintLevel > 0 ? (
              <div className="space-y-2">
                {step.hints.slice(0, hintLevel).map((h) => (
                  <p
                    key={h.level}
                    className="rounded border border-hairline bg-panel p-2.5 text-[14px] text-ash"
                  >
                    {copy(h.text, register)}
                  </p>
                ))}
              </div>
            ) : null}
            {hintLevel < step.hints.length ? (
              <button
                type="button"
                onClick={() => {
                  setHintLevel((n) => n + 1);
                  setUsedHint(true);
                }}
                className="rounded-lg border border-hairline px-3 py-1.5 text-sm text-ash transition-colors hover:border-ash/60 hover:text-chalk"
              >
                Show a hint
              </button>
            ) : null}
            <button
              type="button"
              onClick={resetStep}
              className="block text-xs text-ash/70 underline-offset-2 hover:text-ash hover:underline"
            >
              Reset this step
            </button>
          </div>
        </aside>

        {/* ---------------- Editor + preview ---------------- */}
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 flex-col md:flex-row">
            {/* Editor */}
            <section
              className="flex min-h-0 flex-1 flex-col border-b border-hairline md:border-b-0 md:border-r"
              aria-label="Code editor"
            >
              <div className="flex h-9 shrink-0 items-center gap-1 border-b border-hairline bg-panel px-2">
                {fileNames.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setActiveFile(f)}
                    className={`h-full border-b-2 px-3 font-mono text-xs transition-colors ${
                      activeFile === f
                        ? "border-voltage text-chalk"
                        : "border-transparent text-ash hover:text-chalk"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <CodeEditor
                value={files[activeFile] ?? ""}
                onChange={(next) => {
                  setFiles({ ...files, [activeFile]: next });
                  if (phase !== "editing") setPhase("editing");
                }}
                language={editorLanguage(activeFile)}
                highlightToken={activeFile === step.activeFile ? step.highlightToken : undefined}
                errorLine={activeFile === step.activeFile ? errorLine : null}
                label={`Code editor, ${activeFile}`}
              />

              {step.inputMode === "tap-to-build" && step.blocks && step.correctBlock ? (
                <BlockTray
                  blocks={step.blocks}
                  correctBlock={step.correctBlock}
                  onPlace={placeBlock}
                  disabled={phase === "running"}
                />
              ) : null}
            </section>

            {/* Preview */}
            <div className="flex min-h-0 flex-1 flex-col">
              <Preview
                files={files}
                kind={step.kind}
                flash={phase === "passed" ? "pass" : phase === "failed" ? "fail" : "none"}
              />
            </div>
          </div>

          {/* ---------------- Action bar ---------------- */}
          <div
            className={`flex shrink-0 items-center gap-4 border-t border-hairline bg-raised px-4 py-3 ${
              shake ? "animate-shake" : ""
            }`}
          >
            {/* Combo */}
            <div className="relative w-16 shrink-0 text-center">
              {burst > 0 ? <ParticleBurst key={`burst-${burst}`} count={14} /> : null}
              <div
                key={`combo-${game.combo}`}
                className={`animate-punch font-mono text-[28px] font-bold leading-none ${
                  game.combo > 1 ? "text-voltage" : "text-ash/50"
                }`}
              >
                x{game.combo}
              </div>
              <div className="mt-1 h-0.5 w-full overflow-hidden rounded-full bg-hairline">
                <div
                  className="h-full bg-voltage transition-[width] duration-500"
                  style={{ width: `${(game.combo / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Run */}
            {phase === "passed" ? isLast ? (
              <Link
                href="/"
                onNavigate={() => {
                  try {
                    localStorage.setItem(courseStorageKey(course.id), JSON.stringify(session));
                  } catch {
                    // Navigation still works if browser storage is unavailable.
                  }
                }}
                className="glow-acid flex h-13 items-center gap-3 rounded-lg bg-acid px-6 py-3 font-bold text-void transition-transform duration-150 active:scale-[0.98]"
              >
                {copy(VIEW_COURSE_MAP, register)}
                <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={goNext}
                className="glow-acid flex h-13 items-center gap-3 rounded-lg bg-acid px-6 py-3 font-bold text-void transition-transform duration-150 active:scale-[0.98]"
              >
                NEXT STEP
                <kbd className="rounded bg-void/20 px-1.5 py-0.5 font-mono text-[11px]">⏎</kbd>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void run()}
                disabled={phase === "running"}
                className="glow-voltage flex h-13 items-center gap-3 rounded-lg bg-voltage px-6 py-3 font-bold text-void transition-transform duration-150 active:scale-[0.98] disabled:opacity-60"
              >
                {phase === "running" ? "RUNNING…" : "RUN IT"}
                <kbd className="rounded bg-void/20 px-1.5 py-0.5 font-mono text-[11px]">⌘⏎</kbd>
              </button>
            )}

            {/* Test rows */}
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-1">
              {results.length > 0 ? (
                <span className="font-mono text-[13px] text-chalk">
                  {passedCount} of {results.length} passed
                </span>
              ) : (
                <span className="text-[13px] text-ash">
                  Nothing has run yet. Press Run it.
                </span>
              )}
              {results.map((r, i) => (
                <span
                  key={r.id}
                  className="animate-row-in flex items-center gap-1.5"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <StatusGlyph status={r.status} />
                  <code className="font-mono text-[12px] text-ash">{r.id}</code>
                  <span
                    className={`text-[12px] ${
                      r.status === "passed"
                        ? "text-acid"
                        : r.status === "failed"
                          ? "text-strike"
                          : "text-ash/60"
                    }`}
                  >
                    {r.status === "passed"
                      ? "Passed"
                      : r.status === "failed"
                        ? "Failed"
                        : "Waiting"}
                  </span>
                </span>
              ))}
            </div>

            {phase === "passed" ? (
              <span className="shrink-0 rounded border border-acid/40 bg-acid/10 px-2 py-1 font-mono text-[12px] font-bold text-acid">
                {gain.amount > 0 ? `+${gain.amount} XP` : "Reward already earned"}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {rankUp ? <RankUp rank={rankUp} onClose={() => setRankUp(null)} /> : null}
    </div>
  );
}

/** Status is never colour alone: every state has its own glyph and a word. */
function StatusGlyph({ status }: { status: "waiting" | "passed" | "failed" }) {
  if (status === "passed") {
    return (
      <span
        aria-hidden="true"
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-acid text-[10px] font-bold text-void"
      >
        ✓
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span
        aria-hidden="true"
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-strike text-[10px] font-bold text-void"
      >
        ✕
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="h-4 w-4 shrink-0 rounded-full border-2 border-hairline"
    />
  );
}

function editorLanguage(file: string): "html" | "css" | "js" {
  if (file.endsWith(".css")) return "css";
  if (file.endsWith(".js")) return "js";
  return "html";
}

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
}
