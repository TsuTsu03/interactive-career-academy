import type { Copy } from "./lesson-ir";

/**
 * Solo challenges, in place of leagues.
 *
 * Leagues need a crowd. Until there is one, an empty leaderboard makes the
 * product look abandoned, which is the opposite of the intended feeling. These
 * work with exactly one learner and never compare anyone to anyone.
 *
 * PLAN.md decision 14.
 */

export type ChallengeId = "steps" | "no-hints" | "combo" | "fix";

export interface Challenge {
  id: ChallengeId;
  title: Copy;
  target: number;
  xp: number;
}

export const CHALLENGES: Challenge[] = [
  {
    id: "steps",
    title: { simple: "Finish 5 steps", standard: "Complete 5 steps" },
    target: 5,
    xp: 100,
  },
  {
    id: "no-hints",
    title: { simple: "Pass 3 steps with no hints", standard: "Clear 3 steps unaided" },
    target: 3,
    xp: 150,
  },
  {
    id: "combo",
    title: { simple: "Reach a x3 combo", standard: "Reach a x3 combo" },
    target: 3,
    xp: 120,
  },
  {
    id: "fix",
    title: { simple: "Fix 3 failing checks", standard: "Turn 3 failing tests green" },
    target: 3,
    xp: 120,
  },
];

export interface ChallengeState {
  /** Local date key, so the set rotates once per day in the learner's timezone. */
  day: string;
  progress: Record<ChallengeId, number>;
  claimed: ChallengeId[];
}

export interface ChallengeProgress {
  steps?: number;
  noHints?: number;
  combo?: number;
  fixedChecks?: number;
}

export interface ChallengeUpdate {
  state: ChallengeState;
  completed: Challenge[];
  bonusXp: number;
}

export function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function freshChallengeState(day = today()): ChallengeState {
  return {
    day,
    progress: { steps: 0, "no-hints": 0, combo: 0, fix: 0 },
    claimed: [],
  };
}

/** Rolls the set over at local midnight without touching anything else. */
export function rolledOver(state: ChallengeState): ChallengeState {
  return state.day === today() ? state : freshChallengeState();
}

/** Treat localStorage as untrusted input. Bad snapshots restart this feature only. */
export function restoreChallengeState(value: unknown): ChallengeState {
  if (!value || typeof value !== "object") return freshChallengeState();

  const candidate = value as Partial<ChallengeState>;
  if (
    typeof candidate.day !== "string" ||
    !candidate.progress ||
    typeof candidate.progress !== "object" ||
    !Array.isArray(candidate.claimed)
  ) {
    return freshChallengeState();
  }

  const number = (id: ChallengeId) => {
    const raw = candidate.progress?.[id];
    return typeof raw === "number" && Number.isFinite(raw) && raw >= 0 ? raw : 0;
  };
  const claimed = candidate.claimed.filter(
    (id): id is ChallengeId => CHALLENGES.some((challenge) => challenge.id === id),
  );

  return rolledOver({
    day: candidate.day,
    progress: {
      steps: number("steps"),
      "no-hints": number("no-hints"),
      combo: number("combo"),
      fix: number("fix"),
    },
    claimed: [...new Set(claimed)],
  });
}

export function isComplete(state: ChallengeState, c: Challenge): boolean {
  return (state.progress[c.id] ?? 0) >= c.target;
}

/**
 * Today's two challenges, chosen by date so they are stable through the day
 * and rotate without needing a server.
 */
export function todaysChallenges(day: string): Challenge[] {
  const seed = day.split("-").reduce((n, p) => n + Number(p), 0);
  const first = seed % CHALLENGES.length;
  const second = (first + 1 + (seed % 2)) % CHALLENGES.length;
  return first === second
    ? [CHALLENGES[first], CHALLENGES[(first + 1) % CHALLENGES.length]]
    : [CHALLENGES[first], CHALLENGES[second]];
}

/**
 * Records one successful step and auto-claims any daily goal it completes.
 * Returning the reward with the state keeps XP and progress in one transaction.
 */
export function applyChallengeProgress(
  current: ChallengeState,
  gain: ChallengeProgress,
): ChallengeUpdate {
  const state = rolledOver(current);
  const progress: ChallengeState["progress"] = {
    steps: state.progress.steps + Math.max(0, gain.steps ?? 0),
    "no-hints": state.progress["no-hints"] + Math.max(0, gain.noHints ?? 0),
    combo: Math.max(state.progress.combo, Math.max(0, gain.combo ?? 0)),
    fix: state.progress.fix + Math.max(0, gain.fixedChecks ?? 0),
  };
  const completed = todaysChallenges(state.day).filter(
    (challenge) =>
      progress[challenge.id] >= challenge.target && !state.claimed.includes(challenge.id),
  );
  const claimed = [...state.claimed, ...completed.map((challenge) => challenge.id)];

  return {
    state: { ...state, progress, claimed },
    completed,
    bonusXp: completed.reduce((sum, challenge) => sum + challenge.xp, 0),
  };
}
