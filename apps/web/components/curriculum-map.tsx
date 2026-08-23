"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductNav } from "@/components/product-nav";
import { curriculum } from "@/content/curriculum";
import { copy, totalXp, type Copy, type Register } from "@/lib/lesson-ir";
import {
  courseProgressFromStorage,
  courseSessionSnapshotFromStorage,
  courseStorageKey,
  type CourseProgress,
} from "@/lib/progress";
import { dueReviewConcepts, restoreReviewState, todayKey } from "@/lib/review";

const MAP_COPY = {
  heading: {
    simple: "Write real code. See it work.",
    standard: "Write real code and see the result immediately.",
  },
  intro: {
    simple: "Build one project in each course. Finish them in order.",
    standard: "Each course builds one project through small, ordered steps.",
  },
  localOnly: {
    simple: "No account yet. This browser saves your work.",
    standard: "Accounts are not connected yet. Progress stays in this browser.",
  },
  readingLevel: { simple: "Reading level", standard: "Reading level" },
  simple: { simple: "Simple", standard: "Simple" },
  standard: { simple: "Standard", standard: "Standard" },
  loading: {
    simple: "Loading progress",
    standard: "Loading saved progress",
  },
  start: { simple: "Start", standard: "Start course" },
  continue: { simple: "Continue", standard: "Continue course" },
  completed: { simple: "Done", standard: "Completed" },
  locked: { simple: "Locked", standard: "Locked" },
  reviewTitle: { simple: "Review what you learned", standard: "Spaced review" },
  reviewSummary: {
    simple: "Remember finished concepts before you keep building.",
    standard: "Recall completed concepts at short, useful intervals.",
  },
  noReview: { simple: "No review yet", standard: "No review yet" },
  reviewClear: { simple: "Review clear", standard: "Review clear" },
} satisfies Record<string, Copy>;

type ProgressByCourse = Record<string, CourseProgress>;

interface MapState {
  ready: boolean;
  register: Register;
  progress: ProgressByCourse;
  dueReviews: number;
  hasReviewConcepts: boolean;
}

function emptyProgress(): ProgressByCourse {
  return Object.fromEntries(
    curriculum.courses.map((course) => [course.id, courseProgressFromStorage(course, null)]),
  );
}

function progressCopy(progress: CourseProgress): Copy {
  return {
    simple: `${progress.completedCount} of ${progress.total} steps done`,
    standard: `${progress.completedCount} of ${progress.total} steps completed`,
  };
}

function requirementCopy(requiredCourseTitle: string): Copy {
  return {
    simple: `Finish ${requiredCourseTitle} first.`,
    standard: `Complete ${requiredCourseTitle} to unlock this course.`,
  };
}

function dueReviewCopy(count: number): Copy {
  return {
    simple: `${count} ${count === 1 ? "review" : "reviews"} due`,
    standard: `${count} ${count === 1 ? "concept" : "concepts"} due for review`,
  };
}

function technology(courseId: string, kind: "web" | "js"): string {
  if (kind === "js") return "JavaScript";
  return courseId.startsWith("css") ? "CSS" : "HTML";
}

function CourseStatus({
  progress,
  locked,
  ready,
  register,
}: {
  progress: CourseProgress;
  locked: boolean;
  ready: boolean;
  register: Register;
}) {
  let icon = "·";
  let label = MAP_COPY.loading;
  let tone = "text-ash";

  if (ready && locked) {
    icon = "×";
    label = MAP_COPY.locked;
  } else if (ready && progress.isComplete) {
    icon = "✓";
    label = MAP_COPY.completed;
    tone = "text-acid";
  } else if (ready && progress.hasSession) {
    icon = "→";
    label = MAP_COPY.continue;
    tone = "text-voltage";
  } else if (ready) {
    icon = "→";
    label = MAP_COPY.start;
    tone = "text-voltage";
  }

  return (
    <span className={`flex items-center gap-1.5 font-mono text-[12px] ${tone}`}>
      <span aria-hidden="true">{icon}</span>
      <span>{copy(label, register)}</span>
    </span>
  );
}

export function CurriculumMap() {
  const [state, setState] = useState<MapState>(() => ({
    ready: false,
    register: "simple",
    progress: emptyProgress(),
    dueReviews: 0,
    hasReviewConcepts: false,
  }));

  useEffect(() => {
    const today = todayKey();
    let dueReviews = 0;
    let hasReviewConcepts = false;
    const progressEntries = curriculum.courses.map((course) => {
      const raw = localStorage.getItem(courseStorageKey(course.id));
      const snapshot = courseSessionSnapshotFromStorage(course, raw);

      if (snapshot) {
        const review = restoreReviewState(
          snapshot.record.review,
          course,
          snapshot.completedStepIds,
          today,
        );
        hasReviewConcepts ||= review.items.length > 0;
        dueReviews += dueReviewConcepts(review, course, today).length;
      }

      return [course.id, courseProgressFromStorage(course, raw)] as const;
    });
    const progress = Object.fromEntries(progressEntries);
    const savedRegister = Object.values(progress).find((item) => item.hasSession)?.register;

    // One post-mount update adopts browser-only progress without a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({
      ready: true,
      register: savedRegister ?? "simple",
      progress,
      dueReviews,
      hasReviewConcepts,
    });
  }, []);

  const { ready, register, progress, dueReviews, hasReviewConcepts } = state;

  return (
    <main className="mx-auto min-h-[100dvh] max-w-[1100px] px-5 py-10 sm:px-6 sm:py-16">
      <ProductNav current="courses" register={register} />
      <header className="mb-10 max-w-[680px] sm:mb-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-voltage">
            {curriculum.title}
          </span>
          <div
            className="flex min-h-11 items-center rounded-lg border border-hairline bg-panel p-1"
            aria-label={copy(MAP_COPY.readingLevel, register)}
          >
            {(["simple", "standard"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={register === option}
                onClick={() => setState((current) => ({ ...current, register: option }))}
                className={`min-h-9 rounded-md px-3 text-sm transition-colors ${
                  register === option ? "bg-raised text-chalk" : "text-ash hover:text-chalk"
                }`}
              >
                {copy(option === "simple" ? MAP_COPY.simple : MAP_COPY.standard, register)}
              </button>
            ))}
          </div>
        </div>
        <h1 className="mt-4 font-display text-[38px] font-bold leading-[1.05] tracking-tight text-chalk sm:text-[46px]">
          {copy(MAP_COPY.heading, register)}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ash">
          {copy(MAP_COPY.intro, register)}
        </p>
      </header>

      <Link
        href="/review"
        className="mb-8 flex min-h-11 items-start gap-4 rounded-2xl border border-plasma/30 bg-panel p-5 transition-colors hover:border-plasma/60 sm:items-center sm:p-6"
      >
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-plasma text-lg text-plasma"
        >
          ↺
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <span className="font-display text-[21px] font-bold tracking-tight text-chalk">
              {copy(MAP_COPY.reviewTitle, register)}
            </span>
            <span
              className={`flex items-center gap-1.5 font-mono text-[12px] ${
                dueReviews > 0
                  ? "text-plasma"
                  : ready && hasReviewConcepts
                    ? "text-acid"
                    : "text-ash"
              }`}
            >
              <span aria-hidden="true">
                {!ready ? "·" : dueReviews > 0 ? "→" : hasReviewConcepts ? "✓" : "·"}
              </span>
              <span>
                {copy(
                  !ready
                    ? MAP_COPY.loading
                    : dueReviews > 0
                      ? dueReviewCopy(dueReviews)
                      : hasReviewConcepts
                        ? MAP_COPY.reviewClear
                        : MAP_COPY.noReview,
                  register,
                )}
              </span>
            </span>
          </span>
          <span className="mt-2 block max-w-[62ch] text-[15px] leading-relaxed text-ash">
            {copy(MAP_COPY.reviewSummary, register)}
          </span>
        </span>
      </Link>

      <ol className="relative space-y-4">
        {curriculum.courses.map((course) => {
          const courseProgress = progress[course.id];
          const unmetRequirement = course.requires.find(
            (requiredId) => !progress[requiredId]?.isComplete,
          );
          const locked = course.requires.length > 0 && (!ready || Boolean(unmetRequirement));
          const requiredCourse = curriculum.courses.find(
            (candidate) => candidate.id === unmetRequirement,
          );

          const content = (
            <>
              <span
                aria-hidden="true"
                className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm font-bold ${
                  courseProgress.isComplete
                    ? "border-acid text-acid glow-acid"
                    : !locked && ready
                      ? "border-voltage text-voltage glow-voltage"
                      : "border-hairline text-ash"
                }`}
              >
                {courseProgress.isComplete ? "✓" : course.order}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="font-display text-[22px] font-bold tracking-tight text-chalk">
                      {course.title}
                    </h2>
                    <span className="rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ash">
                      {technology(course.id, course.kind)}
                    </span>
                  </div>
                  <CourseStatus
                    progress={courseProgress}
                    locked={locked}
                    ready={ready}
                    register={register}
                  />
                </div>

                <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-ash">
                  {copy(course.summary, register)}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[12px] text-ash">
                  <span>{copy(progressCopy(courseProgress), register)}</span>
                  <span>{totalXp(course)} XP</span>
                  {locked && requiredCourse ? (
                    <span className="flex items-center gap-1.5 text-ash/80">
                      <span aria-hidden="true">×</span>
                      <span>{copy(requirementCopy(requiredCourse.title), register)}</span>
                    </span>
                  ) : null}
                </div>

                <div
                  className="mt-4 h-1.5 overflow-hidden rounded-full bg-hairline"
                  role="progressbar"
                  aria-label={`${course.title}: ${copy(progressCopy(courseProgress), register)}`}
                  aria-valuenow={courseProgress.completedCount}
                  aria-valuemin={0}
                  aria-valuemax={courseProgress.total}
                >
                  <div
                    className="h-full rounded-full bg-acid transition-[width] duration-500"
                    style={{
                      width: `${(courseProgress.completedCount / courseProgress.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </>
          );

          return (
            <li key={course.id}>
              {locked ? (
                <article
                  className="flex items-start gap-4 rounded-2xl border border-hairline bg-panel p-5 opacity-75 sm:gap-5 sm:p-6"
                >
                  {content}
                </article>
              ) : (
                <Link
                  href={`/learn/${course.id}`}
                  className="group flex min-h-11 items-start gap-4 rounded-2xl border border-hairline bg-panel p-5 transition-colors hover:border-ash/50 sm:gap-5 sm:p-6"
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      <p className="mt-12 font-mono text-[12px] text-ash/80">
        {copy(MAP_COPY.localOnly, register)}
      </p>
    </main>
  );
}
