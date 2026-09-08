"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BlockTray } from "./block-tray";
import { Icon, type IconName } from "@/components/icon";
import { ConceptCard } from "./concept-card";
import { CodeEditor } from "./code-editor";
import { Hud, LEVEL_STEP, rankFor, type GameState } from "./hud";
import { ParticleBurst } from "./juice";
import { Preview } from "./preview";
import { PhoneSymbolRow } from "./phone-symbol-row";
import { RankUp } from "./rank-up";
import { curriculum } from "@/content/curriculum";
import { resolveConcepts } from "@/content/concepts";
import { gradeStep, type TestResult } from "@/lib/grading";
import { type Course, type Step } from "@/lib/lesson-ir";
import { characterIssues, type CharacterIssue } from "@/lib/character-guard";
import { conceptConnections } from "@/lib/concept-connections";
import { baonStorageKey, restoreBaonPlan, type BaonPlan } from "@/lib/baon";
import {
  applyChallengeProgress,
  freshChallengeState,
  restoreChallengeState,
  type ChallengeState,
} from "@/lib/challenges";
import {
  courseStorageKey,
  loadGlobalReviewState,
  normalizeCompletedStepIds,
  saveGlobalReviewState,
} from "@/lib/progress";
import { enrollStepConcepts, freshReviewState, todayKey, type ReviewState } from "@/lib/review";
import {
  freshMistakeState,
  loadMistakeState,
  recordMistakes,
  saveMistakeState,
  type MistakeState,
} from "@/lib/mistakes";
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
type MobilePane = "instructions" | "editor" | "preview";

const VIEW_COURSE_MAP = "VIEW COURSE MAP" as const;

/** The Stitch workspace rail. Icons carry it at tablet width; labels return at lg. */
const RAIL_LINKS: { href: string; icon: IconName; label: string }[] = [
  { href: "#workspace-instructions", icon: "description", label: "Instructions" },
  { href: "#workspace-concepts", icon: "lightbulb", label: "Concept" },
  { href: "#workspace-files", icon: "folder", label: "Files" },
  { href: "#workspace-output", icon: "terminal", label: "Output" },
];

function guidanceFor(step: Step): string {
  switch (step.inputMode) {
    case "tap-to-build":
      return "Start by reading the instruction and looking at the empty place in the code. Choose the one block that belongs there, then press Run. The checker will show whether that small building block created the result we are practicing.";
    case "fill-blank":
      return "The structure is already here to help you. Find the blank or placeholder named in the instruction, fill in only that missing piece, then press Run. Read each check as feedback about that one part of your code.";
    case "guided":
      return "Take this one change at a time. Look for the file and line named in the instruction, make the requested edit, then press Run. If a check does not pass yet, use its message to decide what to inspect before changing anything else.";
    default:
      return "You have room to write this yourself, but you do not need to guess. Read the instruction closely, make one focused change, then press Run. The checks are here to guide your next attempt, not to punish a first draft.";
  }
}

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
  files: Record<string, string>;
  activeFile: string;
  challenges: ChallengeState;
  completedSteps: string[];
  submissionDraft: SubmissionDraft;
}

function initialSession(course: Course): Session {
  return {
    game: INITIAL,
    stepIdx: 0,
    files: course.steps[0].files,
    activeFile: course.steps[0].activeFile,
    // Stable placeholder for SSR. The mount effect replaces it with today's
    // state, so rendering never reads the clock.
    challenges: freshChallengeState("1970-1-1"),
    completedSteps: [],
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
      files: saved.files ?? step.files,
      activeFile: saved.activeFile ?? step.activeFile,
      challenges: restoreChallengeState(saved.challenges),
      completedSteps,
      submissionDraft: restoreSubmissionDraft(saved.submissionDraft),
    };
  } catch {
    // A corrupt snapshot must never block the learner. Start clean instead.
    return null;
  }
}

export function Workspace({ course }: { course: Course }) {
  const [session, setSession] = useState<Session>(() => initialSession(course));
  const { game, stepIdx, files, activeFile } = session;

  const setGame = useCallback(
    (next: GameState | ((g: GameState) => GameState)) =>
      setSession((s) => ({
        ...s,
        game: typeof next === "function" ? next(s.game) : next,
      })),
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
  const [recoveryLevel, setRecoveryLevel] = useState(0);
  const [burst, setBurst] = useState(0);
  const [gain, setGain] = useState({ fire: 0, amount: 0 });
  const [challengeNotice, setChallengeNotice] = useState<{
    fire: number;
    count: number;
    xp: number;
  } | null>(null);
  const [shake, setShake] = useState(false);
  const [rankUp, setRankUp] = useState<string | null>(null);
  const [characterWarnings, setCharacterWarnings] = useState<CharacterIssue[]>([]);
  const [questionOpen, setQuestionOpen] = useState(false);
  const [questionCopied, setQuestionCopied] = useState(false);
  const [baonPlan, setBaonPlan] = useState<BaonPlan | null>(null);
  const [review, setReview] = useState<ReviewState>(freshReviewState());
  const [mistakes, setMistakes] = useState<MistakeState>(freshMistakeState());
  const liveRef = useRef<HTMLDivElement>(null);

  // Pane sizing. The Stitch workspace lets the learner tune the split with the
  // 2px dividers, so the widths live in state instead of fixed classes.
  const [instructionWidth, setInstructionWidth] = useState(340);
  const [editorRatio, setEditorRatio] = useState(1.45);
  const [wideLayout, setWideLayout] = useState(false);
  const [splitLayout, setSplitLayout] = useState(false);
  const [mobilePane, setMobilePane] = useState<MobilePane>("instructions");
  const outerRef = useRef<HTMLDivElement>(null);
  const paneRowRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Inline pane sizes only make sense once the panes sit side by side; in the
  // stacked layout a flex-basis would set heights instead.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const split = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      setWideLayout(wide.matches);
      setSplitLayout(split.matches);
    };
    sync();
    wide.addEventListener("change", sync);
    split.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      split.removeEventListener("change", sync);
    };
  }, []);

  const dragInstruction = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const container = outerRef.current;
    if (!container) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const left = container.getBoundingClientRect().left;
    const railWidth = container.firstElementChild?.getBoundingClientRect().width ?? 0;
    const move = (e: PointerEvent) =>
      setInstructionWidth(clamp(e.clientX - left - railWidth, 260, 460));
    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
  }, []);

  const dragEditor = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const row = paneRowRef.current;
    if (!row) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const move = (e: PointerEvent) => {
      const box = row.getBoundingClientRect();
      const editorPart = clamp(e.clientX - box.left, 240, box.width - 240);
      setEditorRatio(clamp(editorPart / Math.max(box.width - editorPart, 1), 0.5, 3.5));
    };
    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
  }, []);

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
    setReview(loadGlobalReviewState(curriculum));
    setMistakes(loadMistakeState());
    try {
      const raw = localStorage.getItem(baonStorageKey);
      const value: unknown = raw ? JSON.parse(raw) : null;
      setBaonPlan(restoreBaonPlan(value, course));
    } catch {
      setBaonPlan(null);
    }
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

  // Review is its own atomic record spanning every course (AGENTS.md 1.6,
  // amended), so it is persisted separately from the per-course session.
  useEffect(() => {
    const t = setTimeout(() => saveGlobalReviewState(review), 400);
    return () => clearTimeout(t);
  }, [review]);

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
    const warnings = characterIssues(step, files);
    if (warnings.length > 0) {
      setCharacterWarnings(warnings);
      setResults([]);
      setPhase("editing");
      announce(warnings[0].message);
      return;
    }
    setCharacterWarnings([]);
    setQuestionOpen(false);
    setQuestionCopied(false);
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
          message:
            "The checker could not finish this attempt. Your code is still saved. Press Run again, and if the problem repeats, review the file named in the instruction before trying once more.",
        })),
      );
      announce("The checker could not finish. Your code is still saved; press Run again when you are ready.");
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
        };
      });
      if (firstClear) {
        setReview((r) => enrollStepConcepts(r, course.id, step, todayKey()));
      }

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
      setRecoveryLevel((level) => Math.max(level, 1));
      const failedIds = graded
        .filter((result) => result.status === "failed")
        .map((result) => result.id);
      const nextMistakes = recordMistakes(
        mistakes,
        course,
        step,
        failedIds,
        new Date().toISOString(),
      );
      setMistakes(nextMistakes);
      saveMistakeState(nextMistakes);
      if (game.combo > 1) setGame((g) => ({ ...g, combo: 1 }));
      const firstFail = graded.find((g) => g.status === "failed");
      announce(
        firstFail?.message ? firstFail.message : "Some checks did not pass.",
      );
    }
  }, [
    phase,
    step,
    files,
    game.combo,
    game.xp,
    game.level,
    usedHint,
    results,
    session.challenges,
    session.completedSteps,
    mistakes,
    setGame,
    course,
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
    setRecoveryLevel(0);
    setCharacterWarnings([]);
    setQuestionOpen(false);
    setQuestionCopied(false);
  }, [isLast, course.steps, stepIdx]);

  const resetStep = useCallback(() => {
    setFiles(step.files);
    setResults([]);
    setPhase("editing");
    setHintLevel(0);
    setUsedHint(false);
    setRecoveryLevel(0);
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

  const insertPhoneSymbol = useCallback(
    (symbol: string) => {
      const source = files[activeFile] ?? "";
      const textarea = editorRef.current;
      const start = textarea?.selectionStart ?? source.length;
      const end = textarea?.selectionEnd ?? start;
      const nextCursor = start + symbol.length;
      setFiles({
        ...files,
        [activeFile]: `${source.slice(0, start)}${symbol}${source.slice(end)}`,
      });
      setPhase("editing");

      const restoreCursor = () => {
        editorRef.current?.focus();
        editorRef.current?.setSelectionRange(nextCursor, nextCursor);
      };
      requestAnimationFrame(restoreCursor);
      window.setTimeout(restoreCursor, 80);
    },
    [activeFile, files, setFiles],
  );

  const fileNames = Object.keys(step.files);
  const currentProject = course.projects.find((project) => project.id === step.projectId);
  const projectSteps = course.steps.filter((candidate) => candidate.projectId === step.projectId);
  const projectStepIndex = projectSteps.findIndex((candidate) => candidate.id === step.id);
  const courseCompletion = Math.round((session.completedSteps.length / total) * 100);
  const baonStepIndex = baonPlan?.stepIds.indexOf(step.id) ?? -1;
  const baonActive = baonStepIndex >= 0;
  const baonEndsHere = baonActive && baonStepIndex === (baonPlan?.stepIds.length ?? 0) - 1;
  const questionText = failed[0]
    ? buildQuestion(course, step, failed[0], files)
    : "";
  const connections = useMemo(
    () => conceptConnections(course, step),
    [course, step],
  );

  async function copyQuestion() {
    if (!questionText) return;
    try {
      await navigator.clipboard.writeText(questionText);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = questionText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setQuestionCopied(true);
    announce("Question copied. You can paste it where you choose to ask for help.");
  }

  function saveBaonExit() {
    try {
      localStorage.removeItem(baonStorageKey);
      if (!isLast) {
        const next = course.steps[stepIdx + 1];
        localStorage.setItem(
          courseStorageKey(course.id),
          JSON.stringify({
            ...session,
            stepIdx: stepIdx + 1,
            files: next.files,
            activeFile: next.activeFile,
          }),
        );
      }
    } catch {
      // Leaving the workspace still works when browser storage is blocked.
    }
  }

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-void">
      <div ref={liveRef} aria-live="polite" className="sr-only" />

      <Hud
        breadcrumb={currentProject?.title ?? course.project}
      />

      {challengeNotice ? (
        <div
          key={challengeNotice.fire}
          className="animate-toast absolute right-4 top-16 z-30 flex items-center gap-3 border border-acid/50 bg-panel px-4 py-3"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-on-secondary"
          >
            <Icon name="check" size={16} />
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
            className="ml-1 flex h-7 w-7 items-center justify-center rounded text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
          >
            <Icon name="close" size={16} />
          </button>
        </div>
      ) : null}

      <div ref={outerRef} className="flex min-h-0 flex-1 flex-col pb-[7.75rem] md:pb-[4.75rem] lg:flex-row">
        <aside
          className="z-10 hidden w-16 shrink-0 flex-col border-r border-outline-variant bg-surface-container-low px-1 py-gutter md:flex lg:w-64 lg:px-2"
          aria-label="Workspace sections"
        >
          <div className="mb-gutter hidden px-2 lg:block">
            <p className="truncate text-headline-md text-primary">Project Workspace</p>
            <p className="mt-1 text-xs text-on-surface-variant">
              Step {projectStepIndex + 1} of {projectSteps.length}
            </p>
          </div>
          <nav className="flex flex-1 flex-col gap-2">
            {RAIL_LINKS.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                title={item.label}
                className={`flex min-h-11 items-center justify-center gap-3 rounded-lg p-2 text-label-caps uppercase tracking-widest transition-colors lg:justify-start ${
                  index === 0
                    ? "bg-primary-container text-on-primary-container"
                    : "text-on-surface-variant hover:bg-surface-variant hover:text-primary"
                }`}
              >
                <Icon name={item.icon} size={22} filled={index === 0} />
                <span className="hidden lg:inline">{item.label}</span>
              </a>
            ))}
          </nav>
          <Link
            href="/curriculum"
            className="mt-auto flex min-h-11 items-center justify-center gap-2 border-t border-outline-variant pt-gutter text-label-caps uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary"
          >
            <Icon name="map" size={22} />
            <span className="hidden lg:inline">Exit to Map</span>
          </Link>
        </aside>

        {/* ---------------- Instruction rail ---------------- */}
        <aside
          id="workspace-instructions"
          style={wideLayout ? { flexBasis: instructionWidth, maxWidth: instructionWidth } : undefined}
          className={`${mobilePane === "instructions" ? "flex" : "hidden"} min-h-0 w-full flex-1 shrink-0 flex-col overflow-y-auto border-b border-outline-variant bg-surface p-gutter md:flex lg:flex-none lg:border-b-0`}
        >
          <div className="-mx-4 -mt-4 mb-4 border-b border-hairline bg-raised px-4 py-3 lg:hidden">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-voltage">Project workspace</p>
            <p className="mt-1 truncate text-[13px] font-semibold text-chalk">{currentProject?.title ?? course.project}</p>
          </div>
          <div className="mb-1 flex items-center gap-3">
            <span className="font-mono text-[13px] font-bold uppercase tracking-wider text-voltage">
              Step {projectStepIndex + 1} of {projectSteps.length}
            </span>
            <div className="flex flex-1 gap-1" aria-hidden="true">
              {projectSteps.map((s, i) => (
                <span
                  key={s.id}
                  className={`h-1 flex-1 ${
                    i < projectStepIndex ? "bg-acid" : i === projectStepIndex ? "bg-voltage" : "bg-hairline"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* The step count above belongs to this project, not the course. On
              its own it reads as if the whole course were 33 steps, so the
              course scale sits underneath it — smaller, so the near goal stays
              the number the learner works towards. */}
          <p className="mb-3 flex flex-wrap gap-x-2 font-mono text-[11px] text-ash">
            <span className="truncate">{currentProject?.title ?? course.project}</span>
            <span aria-hidden="true">·</span>
            <span>
              {session.completedSteps.length} of {total} steps in this course
            </span>
          </p>

          <div id="workspace-concepts">
            {resolveConcepts(step.conceptIds).map((c) => (
              <ConceptCard key={c.id} concept={c} onSpeak={speak} />
            ))}
            {connections.length > 0 ? (
              <section className="mb-5 border border-hairline bg-raised p-3.5" aria-labelledby="concept-connections-heading">
                <h2 id="concept-connections-heading" className="font-mono text-[10px] font-bold uppercase tracking-widest text-acid">
                  Concept connections
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-ash">You will use this idea again in:</p>
                <ul className="mt-2 space-y-2">
                  {connections.map((connection) => (
                    <li key={`${connection.courseId}:${connection.projectTitle}`} className="text-[13px] leading-relaxed">
                      <Link href={`/learn/${connection.courseId}`} className="font-semibold text-primary underline-offset-2 hover:underline">
                        {connection.projectTitle}
                      </Link>
                      <span className="text-ash"> — {connection.stepTask}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <div className="mb-4 flex items-start gap-3">
            <div className="flex-1">
              <p className="inline-block rounded bg-tertiary-container px-2 py-1 text-label-caps uppercase text-on-tertiary">Current Task</p>
              <h1 className="mt-2 text-[20px] font-semibold leading-snug text-chalk">{step.task}</h1>
            </div>
            <button
              type="button"
              onClick={() => speak(step.task)}
              aria-label="Read this out loud"
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded border border-primary/60 text-primary transition-transform active:scale-95"
            >
              <Icon name="volume_up" size={16} />
            </button>
          </div>

          <section
            aria-labelledby="approach-heading"
            className="mb-6 border border-plasma/30 bg-raised p-3.5"
          >
            <h2
              id="approach-heading"
              className="font-mono text-[10px] uppercase tracking-widest text-plasma"
            >
              Take your time with this step
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-ash">{guidanceFor(step)}</p>
          </section>

          {baonActive ? (
            <section className="mb-5 border border-gold/40 bg-raised p-3.5" aria-label="Baon Mode plan">
              <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-gold">
                <Icon name="schedule" size={15} /> Baon Mode
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-ash">
                Step {baonStepIndex + 1} of {baonPlan?.stepIds.length}. About {baonPlan?.estimatedMinutes} minutes planned.
                {baonEndsHere ? " Your planned session ends after this step." : ""}
              </p>
            </section>
          ) : null}

          <div className="mb-2 text-[10px] uppercase tracking-widest text-ash">What the checker will look for</div>
          <p className="mb-3 text-[13px] leading-relaxed text-ash">
            These checks are clues, not a score. After you press Run, read the first unfinished
            check slowly, compare it with your code, and make one thoughtful change before trying
            again.
          </p>
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
                    {t.label}
                  </span>
                </li>
              );
            })}
          </ul>

          {phase === "failed" && failed[0]?.message ? (
            <div className="mb-4 border border-strike/40 bg-raised p-3">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-strike">
                Here is the next thing to inspect
              </p>
              <p className="text-[15px] leading-relaxed text-chalk">
                {failed[0].message}
              </p>
              {failed[0].expected ? (
                <div className="mt-3 grid grid-cols-2 gap-3 border border-hairline bg-void p-2.5 font-mono text-[12px]">
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
              <button type="button" onClick={() => setQuestionOpen(true)} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded border border-hairline px-3 py-2 font-mono text-[11px] font-bold text-chalk">
                <Icon name="help" size={16} /> Make a Tanong Card
              </button>
              {recoveryLevel === 1 ? (
                <button type="button" onClick={() => setRecoveryLevel(2)} className="mt-3 ml-2 inline-flex min-h-11 items-center gap-2 rounded border border-hairline px-3 py-2 font-mono text-[11px] font-bold text-chalk">
                  <Icon name="visibility" size={16} /> Show where to inspect
                </button>
              ) : null}
              {recoveryLevel >= 2 ? (
                <div className="mt-3 border-t border-hairline pt-3 text-[13px] leading-relaxed text-ash">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gold">Focused inspection</p>
                  <p className="mt-1">
                    Open <span className="font-mono text-chalk">{activeFile}</span>
                    {errorLine ? ` near line ${errorLine}` : " and find the part named in the task"}. Compare one symbol or value at a time before changing it.
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}

          {characterWarnings.length > 0 ? (
            <section className="mb-4 border border-gold/50 bg-raised p-3" aria-labelledby="character-guard-heading">
              <p id="character-guard-heading" className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-gold">
                <Icon name="visibility" size={15} /> Character Guard found a phone keyboard character
              </p>
              <ul className="mt-2 space-y-2 text-[14px] leading-relaxed text-chalk">
                {characterWarnings.map((warning) => <li key={warning.id}>{warning.message}</li>)}
              </ul>
            </section>
          ) : null}

          {questionOpen && questionText ? (
            <section className="mb-4 border border-plasma/40 bg-raised p-3" aria-labelledby="tanong-card-heading">
              <h2 id="tanong-card-heading" className="font-mono text-[10px] font-bold uppercase tracking-widest text-plasma">Tanong Card</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-ash">This includes code from the current step only. Review it before copying. CodeDaddy sends nothing.</p>
              <label htmlFor="tanong-card-text" className="sr-only">Question text</label>
              <textarea id="tanong-card-text" readOnly value={questionText} className="mt-3 h-40 w-full resize-y rounded border border-hairline bg-void p-3 font-mono text-[12px] leading-relaxed text-chalk" />
              <button type="button" onClick={() => void copyQuestion()} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded bg-primary px-4 py-2 font-mono text-[11px] font-bold text-on-primary">
                <Icon name="description" size={16} /> {questionCopied ? "Copied" : "Copy question"}
              </button>
            </section>
          ) : null}

          {phase === "passed" ? (
            <div className="mb-4">
              <div className="font-display text-[26px] font-bold tracking-tight text-acid">
                STEP CLEAR
              </div>
              <p className="mt-1 text-[15px] text-ash">
                {isLast
                  ? "Course complete. You built the whole thing."
                  : `Next: ${course.steps[stepIdx + 1].task}`}
              </p>
            </div>
          ) : null}

          <div className="mt-auto space-y-2 pt-4">
            {hintLevel > 0 ? (
              <div className="space-y-2">
                <p className="text-[13px] leading-relaxed text-ash">
                  Use each hint as a direction to investigate, then return to your own code and
                  try the change yourself.
                </p>
                {step.hints.slice(0, hintLevel).map((h) => (
                  <p
                    key={h.level}
                    className="rounded border border-hairline bg-panel p-2.5 text-[14px] text-ash"
                  >
                    {h.text}
                  </p>
                ))}
              </div>
            ) : null}
            {recoveryLevel >= 2 && hintLevel < step.hints.length ? (
              <button
                type="button"
                onClick={() => {
                  setHintLevel((n) => n + 1);
                  setUsedHint(true);
                }}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded border border-outline-variant text-on-surface transition-colors hover:bg-surface-variant"
              >
                <Icon name="help" size={18} />
                {hintLevel === 0 ? "Use a Hint" : "Get another Hint"}
              </button>
            ) : recoveryLevel === 0 && step.hints.length > 0 ? (
              <p className="rounded border border-hairline bg-raised p-3 text-[13px] leading-relaxed text-ash">
                Run your code first. If a check needs work, CodeDaddy will guide you from the check to the file, then to an authored hint.
              </p>
            ) : null}
            <button
              type="button"
              onClick={resetStep}
              className="flex min-h-9 items-center gap-1.5 text-xs text-on-surface-variant underline-offset-2 hover:text-on-surface hover:underline"
            >
              <Icon name="refresh" size={14} />
              Reset this step
            </button>
          </div>
        </aside>

        {/* ---------------- Editor + preview ---------------- */}
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize the instruction pane"
          aria-valuenow={Math.round(instructionWidth)}
          aria-valuemin={260}
          aria-valuemax={460}
          tabIndex={0}
          onPointerDown={dragInstruction}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") setInstructionWidth((w) => clamp(w - 16, 260, 460));
            if (event.key === "ArrowRight") setInstructionWidth((w) => clamp(w + 16, 260, 460));
          }}
          className="pane-resizer hidden lg:block"
        />

        <div className={`${mobilePane === "instructions" ? "h-0 flex-none" : "min-h-0 flex-1"} flex flex-col md:h-auto md:min-h-0 md:flex-1`}>
          <div ref={paneRowRef} className={`${mobilePane === "instructions" ? "hidden" : "flex"} min-h-0 flex-1 flex-col md:flex md:flex-row`}>
            {/* Editor */}
            <section
              id="workspace-files"
              style={splitLayout ? { flexGrow: editorRatio, flexBasis: 0 } : undefined}
              className={`${mobilePane === "editor" ? "flex" : "hidden"} min-h-0 flex-1 flex-col border-b border-outline-variant bg-surface md:flex md:border-b-0`}
              aria-label="Code editor"
            >
              <div className="no-scrollbar flex h-10 shrink-0 items-center overflow-x-auto border-b border-outline-variant bg-surface-container">
                {fileNames.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setActiveFile(f)}
                    aria-pressed={activeFile === f}
                    className={`flex h-full shrink-0 items-center gap-2 border-r border-t-2 border-outline-variant px-4 font-mono text-[13px] transition-colors ${
                      activeFile === f
                        ? "border-t-primary bg-surface text-primary"
                        : "border-t-transparent text-on-surface-variant hover:bg-surface-variant"
                    }`}
                  >
                    <Icon name={fileIcon(f)} size={16} />
                    {f}
                  </button>
                ))}
              </div>

              <PhoneSymbolRow onInsert={insertPhoneSymbol} />

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
                textareaRef={editorRef}
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

            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize the editor and preview panes"
              aria-valuenow={Math.round(editorRatio * 100)}
              aria-valuemin={50}
              aria-valuemax={350}
              tabIndex={0}
              onPointerDown={dragEditor}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") setEditorRatio((r) => clamp(r - 0.1, 0.5, 3.5));
                if (event.key === "ArrowRight") setEditorRatio((r) => clamp(r + 0.1, 0.5, 3.5));
              }}
              className="pane-resizer hidden md:block"
            />

            {/* Preview */}
            <div id="workspace-output" className={`${mobilePane === "preview" ? "flex" : "hidden"} min-h-0 flex-1 flex-col bg-surface md:flex`}>
              <Preview
                files={files}
                kind={step.kind}
                sqlSeed={step.sqlSeed}
                nosqlSeed={step.nosqlSeed}
                flash={phase === "passed" ? "pass" : phase === "failed" ? "fail" : "none"}
              />
            </div>
          </div>

          <nav
            aria-label="Phone workspace views"
            className="fixed inset-x-0 bottom-12 z-20 grid h-12 grid-cols-3 border-t border-hairline bg-panel md:hidden"
          >
            {([
              ["instructions", "description", "Learn"],
              ["editor", "code", "Code"],
              ["preview", "visibility", "Preview"],
            ] as const).map(([pane, icon, label]) => (
              <button
                key={pane}
                type="button"
                aria-pressed={mobilePane === pane}
                onClick={() => setMobilePane(pane)}
                className={`flex min-h-11 items-center justify-center gap-2 border-t-2 font-mono text-[11px] font-bold uppercase tracking-wider ${
                  mobilePane === pane
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-transparent text-on-surface-variant"
                }`}
              >
                <Icon name={icon} size={17} filled={mobilePane === pane} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* ---------------- Action bar ---------------- */}
          <div
            className={`fixed inset-x-0 bottom-0 z-20 flex h-12 shrink-0 items-center gap-4 border-t border-hairline bg-panel px-3 sm:px-4 lg:absolute ${
              shake ? "animate-shake" : ""
            }`}
          >
            <div className="flex shrink-0 items-center gap-2 text-[13px] text-on-surface-variant">
              <Icon name="check_circle" size={16} />
              <span>Saved</span>
            </div>
            <div className="hidden items-center gap-2 text-[11px] text-ash sm:flex">
              <span>Progress: {courseCompletion}%</span>
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-hairline" role="progressbar" aria-label="Course progress" aria-valuenow={courseCompletion} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full rounded-full bg-acid transition-[width]" style={{ width: `${courseCompletion}%` }} />
              </div>
            </div>
            <div className="min-w-0 flex-1 truncate text-[12px] text-ash">
              {results.length > 0 ? (
                <span className={`flex items-center gap-1.5 ${phase === "passed" ? "text-secondary" : phase === "failed" ? "text-error" : "text-on-surface-variant"}`}>
                  <Icon
                    name={phase === "passed" ? "check_circle" : phase === "failed" ? "close" : "radio_button_unchecked"}
                    size={14}
                    filled={phase === "passed"}
                  />
                  {passedCount} of {results.length} checks passed
                </span>
              ) : (
                <span>Ready. Make one change, then run the checks.</span>
              )}
            </div>
            {phase === "passed" ? (
              <span className="hidden shrink-0 rounded border border-acid/40 bg-acid/10 px-2 py-1 font-mono text-[11px] font-bold text-acid md:inline-flex">
                {gain.amount > 0 ? `+${gain.amount} XP` : "Reward already earned"}
              </span>
            ) : null}
            <div className="relative shrink-0">
              {burst > 0 ? <ParticleBurst key={`burst-${burst}`} count={14} /> : null}
            {phase === "passed" ? baonEndsHere ? (
                <Link href="/dashboard" onNavigate={saveBaonExit} className="flex h-9 items-center gap-2 rounded-lg bg-secondary px-5 font-bold text-on-secondary">
                  Finish Session
                  <Icon name="arrow_forward" size={18} />
                </Link>
              ) : isLast ? (
                <Link
                  href="/curriculum"
                  onNavigate={() => {
                    try {
                      localStorage.setItem(courseStorageKey(course.id), JSON.stringify(session));
                    } catch {
                      // Navigation still works if browser storage is unavailable.
                    }
                  }}
                  className="flex h-9 items-center gap-2 rounded-lg bg-secondary px-6 font-bold text-on-secondary transition-transform duration-150 active:scale-95"
                >
                  {VIEW_COURSE_MAP}
                  <Icon name="arrow_forward" size={18} />
                </Link>
              ) : (
                <button type="button" onClick={goNext} className="flex h-9 items-center gap-2 rounded-lg bg-secondary px-6 font-bold text-on-secondary transition-transform duration-150 active:scale-95">
                  Next Step
                  <Icon name="arrow_forward" size={18} />
                </button>
              ) : (
                <button type="button" onClick={() => void run()} disabled={phase === "running"} className="flex h-9 items-center gap-2 rounded-lg bg-primary px-6 font-bold text-on-primary transition-transform duration-150 hover:bg-primary-container active:scale-95 disabled:opacity-60">
                  <Icon name="play_arrow" size={18} />
                  {phase === "running" ? "Running" : "Run Code"}
                </button>
              )}
            </div>
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
    return <Icon name="check_circle" size={18} filled className="mt-0.5 text-secondary" />;
  }
  if (status === "failed") {
    return <Icon name="close" size={18} className="mt-0.5 text-error" />;
  }
  return (
    <Icon name="radio_button_unchecked" size={18} className="mt-0.5 text-on-surface-variant opacity-50" />
  );
}

function fileIcon(file: string): IconName {
  if (file.endsWith(".css")) return "css";
  if (file.endsWith(".js")) return "javascript";
  return "html";
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
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

function buildQuestion(
  course: Course,
  step: Step,
  failure: TestResult,
  files: Record<string, string>,
): string {
  const code = Object.entries(files)
    .map(([file, source]) => `File: ${file}\n\`\`\`\n${source}\n\`\`\``)
    .join("\n\n");
  return [
    `I am working on ${course.title}.`,
    `Step: ${step.task}`,
    `Failing check: ${failure.label}`,
    failure.message ? `Checker message: ${failure.message}` : null,
    "I ran the checker and reviewed the named file, but I am still stuck. Please help me understand what to inspect next without giving me the full solution.",
    "",
    "Current step code:",
    code,
  ].filter((line): line is string => line !== null).join("\n");
}
