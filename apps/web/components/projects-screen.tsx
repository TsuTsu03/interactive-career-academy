"use client";

import Link from "next/link";
import { ProductNav } from "@/components/product-nav";
import { RegisterToggle } from "@/components/register-toggle";
import { curriculum } from "@/content/curriculum";
import { useCurriculumProgress } from "@/hooks/use-curriculum-progress";
import { copy, type Copy } from "@/lib/lesson-ir";
import type { CourseProgress } from "@/lib/progress";

const PROJECT_COPY = {
  eyebrow: { simple: "Projects", standard: "Projects" },
  heading: { simple: "Keep what you build.", standard: "Projects built through each course" },
  intro: {
    simple: "Every course makes one real project. Finish it, then prepare its links.",
    standard: "Each course produces a portfolio project with a repository and live URL.",
  },
  localOnly: {
    simple: "Draft links stay in this browser. Nothing is sent yet.",
    standard: "Submission drafts remain local until backend verification is connected.",
  },
  loading: { simple: "Loading progress", standard: "Loading project progress" },
  complete: { simple: "Project complete", standard: "Course project complete" },
  building: { simple: "Still building", standard: "Course in progress" },
  notStarted: { simple: "Not started", standard: "Not started" },
  locked: { simple: "Locked", standard: "Prerequisite required" },
  prepare: { simple: "Prepare project links", standard: "Prepare submission draft" },
  continue: { simple: "Keep building", standard: "Continue course" },
  requirement: { simple: "View requirement", standard: "View prerequisite" },
} satisfies Record<string, Copy>;

function progressCopy(progress: CourseProgress): Copy {
  return {
    simple: `${progress.completedCount} of ${progress.total} steps done`,
    standard: `${progress.completedCount} of ${progress.total} steps completed`,
  };
}

export function ProjectsScreen() {
  const { ready, register, progress, setRegister } = useCurriculumProgress();

  return (
    <main className="mx-auto min-h-[100dvh] max-w-[1060px] px-5 py-8 sm:px-6 sm:py-12">
      <ProductNav current="projects" register={register} />

      <header className="max-w-[720px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-voltage">
            {copy(PROJECT_COPY.eyebrow, register)}
          </span>
          <RegisterToggle register={register} onChange={setRegister} />
        </div>
        <h1 className="mt-4 font-display text-[38px] font-bold leading-[1.05] tracking-tight text-chalk sm:text-[46px]">
          {copy(PROJECT_COPY.heading, register)}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ash">
          {copy(PROJECT_COPY.intro, register)}
        </p>
      </header>

      <div className="mt-9 grid gap-5 lg:grid-cols-3">
        {curriculum.courses.map((course) => {
          const item = progress[course.id];
          const locked = ready && course.requires.some((id) => !progress[id]?.isComplete);
          const icon = !ready
            ? "·"
            : locked
              ? "×"
              : item.isComplete
                ? "✓"
                : item.hasSession
                  ? "→"
                  : "·";
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
                <span aria-hidden="true">{icon}</span>
                <span>{copy(label, register)}</span>
              </p>
              <h2 className="mt-4 font-display text-[22px] font-bold tracking-tight text-chalk">
                {course.project}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-ash">{course.title}</p>
              <p className="mt-5 font-mono text-[12px] text-ash">
                {copy(progressCopy(item), register)}
              </p>
              <div
                className="mt-3 h-1.5 overflow-hidden rounded-full bg-hairline"
                role="progressbar"
                aria-label={`${course.project}: ${copy(progressCopy(item), register)}`}
                aria-valuenow={item.completedCount}
                aria-valuemin={0}
                aria-valuemax={item.total}
              >
                <div
                  className="h-full rounded-full bg-acid transition-[width] duration-500"
                  style={{ width: `${(item.completedCount / item.total) * 100}%` }}
                />
              </div>
              <Link
                href={item.isComplete ? `/projects/${course.id}` : `/learn/${course.id}`}
                className="mt-6 inline-flex min-h-11 items-center justify-between gap-3 rounded-lg border border-hairline px-4 py-3 font-mono text-[12px] text-chalk transition-colors hover:border-ash/70 lg:mt-auto lg:translate-y-1"
              >
                <span>
                  {copy(
                    item.isComplete
                      ? PROJECT_COPY.prepare
                      : locked
                        ? PROJECT_COPY.requirement
                        : PROJECT_COPY.continue,
                    register,
                  )}
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          );
        })}
      </div>

      <p className="mt-10 flex items-start gap-2 font-mono text-[12px] leading-relaxed text-ash">
        <span aria-hidden="true">·</span>
        <span>{copy(PROJECT_COPY.localOnly, register)}</span>
      </p>
    </main>
  );
}
