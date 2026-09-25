"use client";

import { SiteFooter } from "@/components/site-footer";
import { Icon, type IconName } from "@/components/icon";
import Link from "next/link";
import { ProductNav } from "@/components/product-nav";
import { curriculum } from "@/content/curriculum";
import { useCurriculumProgress } from "@/hooks/use-curriculum-progress";
import { type Copy } from "@/lib/lesson-ir";
import type { CourseProgress } from "@/lib/progress";

const PROJECT_COPY = {
  eyebrow: "Projects",
  heading: "Keep what you build.",
  intro: "Every course makes one real project. Finish it, then prepare its links.",
  localOnly: "Guided-course link drafts stay in this browser. Certificate submissions use the five capstone records.",
  loading: "Loading progress",
  complete: "Project complete",
  building: "Still building",
  notStarted: "Not started",
  locked: "Locked",
  prepare: "Prepare project links",
  continue: "Keep building",
  requirement: "View requirement",
} satisfies Record<string, Copy>;

function progressCopy(progress: CourseProgress): Copy {
  return `${progress.completedCount} of ${progress.total} steps done`;
}

export function ProjectsScreen() {
  const { ready, progress } = useCurriculumProgress();
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-on-background">
      <ProductNav current="projects" />
      <main className="mx-auto w-full flex-1 max-w-[1060px] px-margin-mobile py-8 md:px-margin-desktop md:py-12">

        <header className="max-w-[720px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-voltage">
              {PROJECT_COPY.eyebrow}
            </span>
            <Link href="/evidence" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-hairline px-4 font-mono text-[11px] font-bold text-chalk">
              Skill Evidence Ledger <Icon name="arrow_forward" size={15} />
            </Link>
          </div>
          <h1 className="mt-4 font-display text-[38px] font-bold leading-[1.05] tracking-tight text-chalk sm:text-[46px]">
            {PROJECT_COPY.heading}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ash">
            {PROJECT_COPY.intro}
          </p>
        </header>

        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {curriculum.courses.map((course) => {
            const item = progress[course.id];
            const locked = ready && course.requires.some((id) => !progress[id]?.isComplete);
            const icon: IconName = !ready
              ? "radio_button_unchecked"
              : locked
                ? "lock"
                : item.isComplete
                  ? "check_circle"
                  : item.hasSession
                    ? "play_circle"
                    : "radio_button_unchecked";
            const label = !ready
              ? PROJECT_COPY.loading
              : locked
                ? PROJECT_COPY.locked
                : item.isComplete
                  ? PROJECT_COPY.complete
                  : item.hasSession
                    ? PROJECT_COPY.building
                    : PROJECT_COPY.notStarted;
            const tone = item.isComplete
              ? "text-acid"
              : item.hasSession && ready
                ? "text-voltage"
                : "text-ash";

            return (
              <article key={course.id} className="flex flex-col rounded-2xl border border-hairline bg-panel p-5 sm:p-6">
                <p className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider ${tone}`}>
                  <Icon name={icon} size={16} filled={icon === "check_circle"} />
                  <span>{label}</span>
                </p>
                <h2 className="mt-4 font-display text-[22px] font-bold tracking-tight text-chalk">
                  {course.project}
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-ash">{course.title}</p>
                <p className="mt-5 font-mono text-[12px] text-ash">
                  {progressCopy(item)}
                </p>
                <div
                  className="mt-3 h-1.5 overflow-hidden rounded-full bg-hairline"
                  role="progressbar"
                  aria-label={`${course.project}: ${progressCopy(item)}`}
                  aria-valuenow={item.completedCount}
                  aria-valuemin={0}
                  aria-valuemax={Math.max(1, item.total)}
                >
                  <div
                    className="h-full rounded-full bg-acid transition-[width] duration-500"
                    style={{ width: `${(item.completedCount / Math.max(1, item.total)) * 100}%` }}
                  />
                </div>
                <Link
                  href={item.isComplete ? `/projects/${course.id}` : `/learn/${course.id}`}
                  className="mt-6 inline-flex min-h-11 items-center justify-between gap-3 rounded-lg border border-hairline px-4 py-3 font-mono text-[12px] text-chalk transition-colors hover:border-ash/70 lg:mt-auto lg:translate-y-1"
                >
                  <span>
                    {item.isComplete
                        ? PROJECT_COPY.prepare
                        : locked
                          ? PROJECT_COPY.requirement
                          : PROJECT_COPY.continue}
                  </span>
                  <Icon name="arrow_forward" size={16} />
                </Link>
              </article>
            );
          })}
        </div>

        <p className="mt-10 flex items-start gap-2 font-mono text-[12px] leading-relaxed text-ash">
          <Icon name="lightbulb" size={16} className="mt-0.5" />
          <span>{PROJECT_COPY.localOnly}</span>
        </p>
      </main>
      <SiteFooter home="/dashboard" />
    </div>
  );
}
