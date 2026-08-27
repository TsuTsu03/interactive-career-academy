"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export interface GameState {
  xp: number;
  level: number;
  streak: number;
  shields: number;
  combo: number;
  /** Kept so old saved sessions still parse. PLAN.md decision 14. */
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

export function Hud({ breadcrumb }: { breadcrumb: string }) {
  return (
    <header className="sticky top-0 z-30 flex h-touch-target shrink-0 items-center justify-between gap-gutter border-b border-outline-variant bg-surface px-margin-mobile md:px-margin-desktop">
      <div className="flex min-w-0 items-center gap-gutter">
        <BrandLogo href="/dashboard" compact />
        <span aria-hidden="true" className="hidden h-4 w-px bg-outline-variant sm:block" />
        <span className="hidden truncate text-label-caps uppercase tracking-widest text-on-surface-variant sm:inline">
          Building: {breadcrumb}
        </span>
      </div>

      <nav aria-label="Workspace navigation" className="hidden h-full items-center gap-gutter lg:flex">
        <Link href="/curriculum" className="flex h-full items-center border-b-2 border-transparent px-2 text-body-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary">
          Curriculum
        </Link>
        <Link href="/projects" className="flex h-full items-center border-b-2 border-transparent px-2 text-body-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary">
          Portfolio
        </Link>
        <Link href="/account" className="flex h-full items-center border-b-2 border-transparent px-2 text-body-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary">
          Learner Profile
        </Link>
      </nav>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <Link
          href="/dashboard"
          className="hidden h-9 items-center rounded px-4 text-label-caps uppercase text-primary transition-colors hover:bg-surface-variant sm:inline-flex"
        >
          Resume
        </Link>
        <Link
          href="/curriculum"
          className="inline-flex h-9 items-center rounded bg-primary px-4 text-label-caps uppercase text-on-primary transition-colors hover:bg-surface-tint"
        >
          Start Coding
        </Link>
      </div>
    </header>
  );
}
