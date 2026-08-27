"use client";

import { SiteFooter } from "@/components/site-footer";
import { Icon, type IconName } from "@/components/icon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductNav } from "@/components/product-nav";
import { curriculum } from "@/content/curriculum";
import { copy, totalXp, type Copy } from "@/lib/lesson-ir";
import {
  courseProgressFromStorage,
  courseStorageKey,
  loadGlobalReviewState,
  type CourseProgress,
} from "@/lib/progress";
import { dueReviewConcepts, todayKey } from "@/lib/review";

const MAP_COPY = {
  heading: "Write real code. See it work.",
  intro:
    "Each course guides you through a small project one clear step at a time. Read the explanation, make one change, and use the checker to learn from the result.",
  localOnly:
    "Your progress is saved in this browser while accounts are being connected.",
  loading: "Loading your saved progress…",
  start: "Start this course",
  continue: "Continue this course",
  completed: "Course completed",
  locked: "Finish the earlier course first",
  reviewTitle: "Review what you learned",
  reviewSummary:
    "Short review sessions help the ideas you have already used stay familiar while you keep building.",
  noReview: "No review is ready yet",
  reviewClear: "You are caught up for today",
} satisfies Record<string, Copy>;

type ProgressByCourse = Record<string, CourseProgress>;

interface MapState {
  ready: boolean;
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
  return `${progress.completedCount} of ${progress.total} steps completed`;
}

function requirementCopy(requiredCourseTitle: string): Copy {
  return `Finish ${requiredCourseTitle} before starting this course.`;
}

function dueReviewCopy(count: number): Copy {
  return `${count} ${count === 1 ? "concept" : "concepts"} ready for review`;
}

function technology(courseId: string, kind: "web" | "js"): string {
  if (kind === "js") return "JavaScript";
  return courseId.startsWith("css") ? "CSS" : "HTML";
}

function CourseStatus({
  progress,
  locked,
  ready,
}: {
  progress: CourseProgress;
  locked: boolean;
  ready: boolean;
}) {
  let icon: IconName = "radio_button_unchecked";
  let label = MAP_COPY.loading;
  let tone = "text-on-surface-variant";

  if (ready && locked) {
    icon = "lock";
    label = MAP_COPY.locked;
  } else if (ready && progress.isComplete) {
    icon = "check_circle";
    label = MAP_COPY.completed;
    tone = "text-secondary";
  } else if (ready && progress.hasSession) {
    icon = "play_circle";
    label = MAP_COPY.continue;
    tone = "text-primary";
  } else if (ready) {
    icon = "arrow_forward";
    label = MAP_COPY.start;
    tone = "text-primary";
  }

  return (
    <span className={`flex items-center gap-1.5 font-mono text-[12px] ${tone}`}>
      <Icon name={icon} size={16} filled={icon === "check_circle"} />
      <span>{copy(label)}</span>
    </span>
  );
}

export function CurriculumMap() {
  const [state, setState] = useState<MapState>(() => ({
    ready: false,
    progress: emptyProgress(),
    dueReviews: 0,
    hasReviewConcepts: false,
  }));

  useEffect(() => {
    const today = todayKey();
    const progressEntries = curriculum.courses.map((course) => {
      const raw = localStorage.getItem(courseStorageKey(course.id));
      return [course.id, courseProgressFromStorage(course, raw)] as const;
    });
    const progress = Object.fromEntries(progressEntries);

    const review = loadGlobalReviewState(curriculum);
    const hasReviewConcepts = review.items.length > 0;
    const dueReviews = dueReviewConcepts(review, curriculum, today).length;
    // One post-mount update adopts browser-only progress without a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({
      ready: true,
      progress,
      dueReviews,
      hasReviewConcepts,
    });
  }, []);

  const { ready, progress, dueReviews, hasReviewConcepts } = state;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-on-background">
      <ProductNav current="courses" />
      <main className="mx-auto w-full flex-1 max-w-[1100px] px-margin-mobile py-8 md:px-margin-desktop md:py-12">
        <header className="mb-10 max-w-[680px] sm:mb-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-voltage">
              {curriculum.title}
            </span>
          </div>
          <h1 className="mt-4 font-display text-[38px] font-bold leading-[1.05] tracking-tight text-chalk sm:text-[46px]">
            {copy(MAP_COPY.heading)}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ash">
            {copy(MAP_COPY.intro)}
          </p>
        </header>

        <Link
          href="/review"
          className="mb-8 flex min-h-11 items-start gap-4 rounded-2xl border border-plasma/30 bg-panel p-5 transition-colors hover:border-plasma/60 sm:items-center sm:p-6"
        >
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-plasma text-plasma"
          >
            <Icon name="refresh" size={22} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <span className="font-display text-[21px] font-bold tracking-tight text-chalk">
                {copy(MAP_COPY.reviewTitle)}
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
                <Icon
                  name={
                    !ready
                      ? "radio_button_unchecked"
                      : dueReviews > 0
                        ? "arrow_forward"
                        : hasReviewConcepts
                          ? "check_circle"
                          : "radio_button_unchecked"
                  }
                  size={16}
                  filled={ready && dueReviews === 0 && hasReviewConcepts}
                />
                <span>
                  {copy(
                    !ready
                      ? MAP_COPY.loading
                      : dueReviews > 0
                        ? dueReviewCopy(dueReviews)
                        : hasReviewConcepts
                          ? MAP_COPY.reviewClear
                          : MAP_COPY.noReview,
                  )}
                </span>
              </span>
            </span>
            <span className="mt-2 block max-w-[62ch] text-[15px] leading-relaxed text-ash">
              {copy(MAP_COPY.reviewSummary)}
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
                  {courseProgress.isComplete ? <Icon name="check" size={20} /> : course.order}
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
                    />
                  </div>

                  <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-ash">
                    {copy(course.summary)}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[12px] text-ash">
                    <span>{copy(progressCopy(courseProgress))}</span>
                    <span>{totalXp(course)} XP</span>
                    {locked && requiredCourse ? (
                      <span className="flex items-center gap-1.5 text-ash/80">
                        <Icon name="lock" size={14} />
                        <span>{copy(requirementCopy(requiredCourse.title))}</span>
                      </span>
                    ) : null}
                  </div>

                  <div
                    className="mt-4 h-1.5 overflow-hidden rounded-full bg-hairline"
                    role="progressbar"
                    aria-label={`${course.title}: ${copy(progressCopy(courseProgress))}`}
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
          {copy(MAP_COPY.localOnly)}
        </p>
      </main>
      <SiteFooter home="/dashboard" />
    </div>
  );
}
