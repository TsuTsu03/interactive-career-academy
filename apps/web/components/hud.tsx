"use client";

import { CountUp, FloatingGain } from "./juice";

export interface GameState {
  xp: number;
  level: number;
  streak: number;
  shields: number;
  combo: number;
  /**
   * Kept so old saved sessions still parse. Leagues are not shown: they need a
   * crowd, and an empty leaderboard reads as an abandoned product.
   * PLAN.md decision 14.
   */
  league?: string;
}

export const LEVEL_STEP = 500;
export const RANKS = [
  "Novice",
  "Apprentice",
  "Builder",
  "Shipper",
  "Engineer",
  "Architect",
] as const;

export function rankFor(level: number): string {
  return RANKS[Math.min(RANKS.length - 1, Math.floor((level - 1) / 3))];
}

interface ChallengeSummary {
  label: string;
  done: number;
  target: number;
  complete: boolean;
}

function ChallengePlate({
  challenge,
  className,
}: {
  challenge: ChallengeSummary;
  className: string;
}) {
  return (
    <div className={className} title="Today's challenge">
      <span className="shrink-0 text-[10px] uppercase tracking-widest text-ash">Today</span>
      <span className="min-w-0 truncate text-[12px] text-chalk">{challenge.label}</span>
      {challenge.complete ? (
        <span className="ml-auto flex shrink-0 items-center gap-1 font-mono text-[12px] text-acid">
          <span aria-hidden="true">✓</span>
          <span>Done</span>
        </span>
      ) : (
        <span className="tnum ml-auto shrink-0 font-mono text-[12px] text-voltage">
          {challenge.done}/{challenge.target}
        </span>
      )}
    </div>
  );
}

export function Hud({
  state,
  breadcrumb,
  gainFire,
  gainAmount,
  challenge,
}: {
  state: GameState;
  breadcrumb: string;
  /** Changing this value remounts the gain label, which replays it. */
  gainFire: number;
  gainAmount: number;
  challenge?: ChallengeSummary;
}) {
  const intoLevel = state.xp % LEVEL_STEP;
  const pct = Math.round((intoLevel / LEVEL_STEP) * 100);

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-6 border-b border-hairline bg-panel px-4">
      <div className="flex items-center gap-3">
        <span className="font-display text-[15px] font-bold tracking-tight text-chalk">
          Academy
        </span>
        <span className="hidden font-mono text-xs text-ash md:inline">{breadcrumb}</span>
      </div>

      <div className="ml-auto flex items-center gap-5">
        {/* Streak */}
        <div className="flex items-center gap-2" title={`${state.streak} day streak`}>
          <span className="animate-flicker text-lg leading-none text-voltage" aria-hidden="true">
            ▲
          </span>
          <div className="leading-none">
            <div className="tnum font-mono text-sm font-bold text-chalk">{state.streak}</div>
            <div className="text-[9px] uppercase tracking-widest text-ash">Streak</div>
          </div>
        </div>

        {/* XP + level */}
        <div className="relative flex items-center gap-3">
          {gainFire > 0 ? <FloatingGain key={gainFire} amount={gainAmount} /> : null}
          <div className="leading-none">
            <div className="mb-1 flex items-baseline gap-2">
              <CountUp value={state.xp} className="font-mono text-sm font-bold text-chalk" />
              <span className="text-[9px] uppercase tracking-widest text-ash">XP</span>
            </div>
            <div
              className="h-1.5 w-[180px] overflow-hidden rounded-full bg-hairline"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progress to next level"
            >
              <div
                className="h-full rounded-full bg-acid transition-[width] duration-700 ease-out"
                style={{ width: `${pct}%`, boxShadow: "0 0 10px 0 rgb(198 242 78 / 0.6)" }}
              />
            </div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-acid bg-void">
            <span className="tnum font-mono text-xs font-bold text-acid">{state.level}</span>
          </div>
        </div>

        {/* Today's solo challenge. Replaces the league plate. */}
        {challenge ? (
          <ChallengePlate
            challenge={challenge}
            className="hidden items-center gap-2 rounded border border-hairline bg-raised px-2.5 py-1 lg:flex"
          />
        ) : null}

        <kbd className="hidden rounded border border-hairline bg-raised px-2 py-1 font-mono text-[11px] text-ash md:inline">
          ⌘K
        </kbd>

        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-gold bg-raised">
          <span className="font-mono text-[10px] font-bold text-chalk">MB</span>
        </div>
        </div>
      </header>
      {challenge ? (
        <ChallengePlate
          challenge={challenge}
          className="flex h-9 shrink-0 items-center gap-2 border-b border-hairline bg-panel px-4 lg:hidden"
        />
      ) : null}
    </>
  );
}
