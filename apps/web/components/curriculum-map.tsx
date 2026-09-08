"use client";

import { SiteFooter } from "@/components/site-footer";
import { ComputerPrerequisite } from "@/components/computer-prerequisite";
import { Icon, type IconName } from "@/components/icon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductNav } from "@/components/product-nav";
import { curriculum } from "@/content/curriculum";
import { copy, totalXp, type Copy, type StepKind } from "@/lib/lesson-ir";
import {
  courseProgressFromStorage,
  courseStorageKey,
  loadGlobalReviewState,
  type CourseProgress
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
  expand: "Show the courses in this program",
  collapse: "Hide the courses in this program"
} satisfies Record<string, Copy>;

type ProgressByCourse = Record<string, CourseProgress>;

interface MapState {
  ready: boolean;
  progress: ProgressByCourse;
  dueReviews: number;
  hasReviewConcepts: boolean;
  /** Keyed by program id. One program is open at a time by default. */
  openPrograms: Record<string, boolean>;
}

/** Every program starts closed. The map opens as a short list of programs. */
function initialOpenPrograms(): Record<string, boolean> {
  return Object.fromEntries(
    curriculum.programs.map((program) => [program.id, false])
  );
}

function programCourses(program: (typeof curriculum.programs)[number]) {
  return program.courseIds
    .map((id) => curriculum.courses.find((course) => course.id === id))
    .filter((course): course is (typeof curriculum.courses)[number] =>
      Boolean(course)
    );
}

function programCountCopy(courseCount: number, completedCount: number): Copy {
  const courses = `${courseCount} ${courseCount === 1 ? "course" : "courses"}`;
  return completedCount > 0
    ? `${courses} · ${completedCount} completed`
    : courses;
}

function emptyProgress(): ProgressByCourse {
  return Object.fromEntries(
    curriculum.courses.map((course) => [
      course.id,
      courseProgressFromStorage(course, null)
    ])
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

function technology(courseId: string, kind: StepKind): string {
  if (courseId === "design-foundations") return "Design";
  if (courseId === "typescript-react") return "TypeScript + React";
  if (courseId === "testing-devtools") return "Testing + DevTools";
  if (kind === "nosql") return "NoSQL";
  if (kind === "sql") return "SQL";
  if (courseId === "cli-git") return "Terminal + Git";
  if (courseId === "node-basics") return "Node.js";
  if (courseId === "api-basics") return "APIs";
  if (courseId === "auth-security") return "Security";
  if (courseId === "fullstack-integration") return "Full Stack";
  if (kind === "react") return "React";
  if (kind === "js") return "JavaScript";
  if (courseId.startsWith("tailwind")) return "Tailwind CSS";
  return courseId.startsWith("css") ? "CSS" : "HTML";
}

function CourseStatus({
  progress,
  locked,
  ready,
  active
}: {
  progress: CourseProgress;
  locked: boolean;
  ready: boolean;
  active: boolean;
}) {
  // A locked course says nothing here. The meta row already carries the whole
  // sentence, with its own lock icon, naming the course to finish first; a
  // second shorter copy of the same fact only crowded the title.
  if (ready && locked) return null;

  let icon: IconName = "radio_button_unchecked";
  let label = MAP_COPY.loading;

  if (ready && progress.isComplete) {
    icon = "check_circle";
    label = MAP_COPY.completed;
  } else if (ready && progress.hasSession) {
    icon = "play_circle";
    label = MAP_COPY.continue;
  } else if (ready) {
    icon = "arrow_forward";
    label = MAP_COPY.start;
  }

  // Only the course the learner is actually on carries the primary colour, so
  // the eye lands on one row. Every other state is told apart by its icon and
  // its words, which is what the status rule requires.
  return (
    <span
      className={`flex items-start justify-start gap-2 font-mono text-sm md:justify-end ${
        active ? "text-primary" : "text-on-surface-variant"
      }`}
    >
      <span className="mt-0.5 shrink-0">
        <Icon name={icon} size={18} filled={icon === "check_circle"} />
      </span>
      <span className="text-left md:text-right">{copy(label)}</span>
    </span>
  );
}

export function CurriculumMap() {
  const [state, setState] = useState<MapState>(() => ({
    ready: false,
    progress: emptyProgress(),
    dueReviews: 0,
    hasReviewConcepts: false,
    openPrograms: initialOpenPrograms()
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
    setState((previous) => ({
      ...previous,
      ready: true,
      progress,
      dueReviews,
      hasReviewConcepts
    }));
  }, []);

  const { ready, progress, dueReviews, hasReviewConcepts, openPrograms } =
    state;

  // One row at a time wears the primary colour: the first course the learner
  // can open and has not finished.
  const activeCourseId = ready
    ? curriculum.courses.find((course) => {
        const unmet = course.requires.some(
          (requiredId) => !progress[requiredId]?.isComplete
        );
        const openable = !unmet || progress[course.id].hasSession;
        return openable && !progress[course.id].isComplete;
      })?.id ?? null
    : null;

  const setProgramOpen = (programId: string, open: boolean) => {
    setState((previous) =>
      previous.openPrograms[programId] === open
        ? previous
        : {
            ...previous,
            openPrograms: { ...previous.openPrograms, [programId]: open }
          }
    );
  };

  const renderCourse = (
    course: (typeof curriculum.courses)[number],
    active: boolean
  ) => {
    const courseProgress = progress[course.id];
    const unmetRequirement = course.requires.find(
      (requiredId) => !progress[requiredId]?.isComplete
    );
    const locked =
      course.requires.length > 0 &&
      (!ready || (Boolean(unmetRequirement) && !courseProgress.hasSession));
    const requiredCourse = curriculum.courses.find(
      (candidate) => candidate.id === unmetRequirement
    );
    const percent = Math.round(
      (courseProgress.completedCount / Math.max(1, courseProgress.total)) * 100
    );

    const content = (
      <>
        <div className="flex flex-col gap-6 md:flex-row">
          <span
            aria-hidden="true"
            className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border font-mono text-lg ${
              active
                ? "border-primary text-primary"
                : "border-outline text-on-surface-variant"
            }`}
          >
            {courseProgress.isComplete ? (
              <Icon name="check" size={20} />
            ) : (
              course.order
            )}
          </span>

          <div className="min-w-0 flex-grow">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <h3 className="font-display text-[22px] font-bold tracking-tight text-on-surface">
                {course.title}
              </h3>
              <span className="rounded border border-outline-variant px-2 py-0.5 font-mono text-xs uppercase tracking-wider text-on-surface-variant">
                {technology(course.id, course.kind)}
              </span>
            </div>

            <p className="mb-6 max-w-[62ch] text-[15px] leading-relaxed text-on-surface-variant">
              {copy(course.summary)}
            </p>
            {course.requiresComputer && <div className="mb-5 max-w-[62ch]"><ComputerPrerequisite /></div>}

            <div
              className={`mb-3 flex flex-wrap items-center gap-4 font-mono text-sm ${
                active ? "text-primary" : "text-on-surface-variant"
              }`}
            >
              <span>{course.steps.length ? copy(progressCopy(courseProgress)) : "Lessons are being prepared"}</span>
              <span>{totalXp(course)} XP</span>
              {locked && requiredCourse ? (
                <span className="flex items-start gap-1.5">
                  <span className="mt-0.5 shrink-0">
                    <Icon name="lock" size={14} />
                  </span>
                  <span>{copy(requirementCopy(requiredCourse.title))}</span>
                </span>
              ) : null}
            </div>
          </div>

          <div className="mt-4 md:mt-0 md:w-48 md:shrink-0 md:text-right">
            {course.steps.length === 0 ? <span className="inline-flex items-center gap-2 text-on-surface-variant"><Icon name="schedule" size={16} />In preparation</span> : <CourseStatus
              progress={courseProgress}
              locked={locked}
              ready={ready}
              active={active}
            />}
          </div>
        </div>

        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-surface-variant md:ml-[4.5rem] md:w-[calc(100%-4.5rem)]"
          role="progressbar"
          aria-label={`${course.title}: ${copy(progressCopy(courseProgress))}`}
          aria-valuenow={courseProgress.completedCount}
          aria-valuemin={0}
          aria-valuemax={Math.max(1, courseProgress.total)}
        >
          <div
            className={`h-full rounded-full transition-[width] duration-500 ${
              active ? "bg-primary" : "bg-on-surface-variant"
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </>
    );

    const shell = active
      ? "bg-surface-container"
      : "bg-surface-container-low border border-outline-variant";

    return (
      <li key={course.id}>
        {locked ? (
          <article
            className={`relative flex flex-col gap-4 rounded-xl p-6 opacity-75 ${shell}`}
          >
            {content}
          </article>
        ) : (
          <Link
            href={`/learn/${course.id}`}
            className={`relative flex flex-col gap-4 rounded-xl p-6 transition-colors hover:border-outline hover:bg-surface-container ${shell}`}
          >
            {content}
          </Link>
        )}
      </li>
    );
  };

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
                          : MAP_COPY.noReview
                  )}
                </span>
              </span>
            </span>
            <span className="mt-2 block max-w-[62ch] text-[15px] leading-relaxed text-ash">
              {copy(MAP_COPY.reviewSummary)}
            </span>
          </span>
        </Link>

        <div className="space-y-6">
          {curriculum.programs.map((program) => {
            const courses = programCourses(program);
            const completedCount = courses.filter(
              (course) => ready && progress[course.id].isComplete
            ).length;
            const open = openPrograms[program.id] ?? false;

            return (
              <section
                key={program.id}
                aria-labelledby={`${program.id}-title`}
                className="flex flex-col rounded-xl border border-outline-variant bg-surface-dim"
              >
                {/* A native details element carries the keyboard, focus, and
                    screen-reader behaviour of a disclosure for free, and works
                    before hydration. */}
                <details
                  open={open}
                  onToggle={(event) =>
                    setProgramOpen(program.id, event.currentTarget.open)
                  }
                >
                  <summary
                    className={`relative flex cursor-pointer list-none items-start gap-6 p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary md:p-8 [&::-webkit-details-marker]:hidden ${
                      open ? "border-b border-outline-variant" : ""
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-outline text-on-surface transition-transform duration-200 motion-reduce:transition-none ${
                        open ? "rotate-90" : ""
                      }`}
                    >
                      <Icon name="chevron_right" size={22} />
                    </span>

                    <span className="min-w-0 flex-grow">
                      <h2
                        id={`${program.id}-title`}
                        className="mb-2 font-display text-[26px] font-bold tracking-tight text-on-surface"
                      >
                        {program.title}
                      </h2>
                      <span className="block max-w-2xl text-[15px] leading-relaxed text-on-surface-variant">
                        {copy(program.summary)}
                      </span>
                      <span className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm text-on-surface-variant md:hidden">
                        <span>
                          {copy(
                            programCountCopy(courses.length, completedCount)
                          )}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="underline">
                          {copy(open ? MAP_COPY.collapse : MAP_COPY.expand)}
                        </span>
                      </span>
                    </span>

                    <span className="absolute right-8 top-6 hidden font-mono text-sm text-on-surface-variant md:block">
                      <span>
                        {copy(programCountCopy(courses.length, completedCount))}
                      </span>
                      <span aria-hidden="true" className="mx-2">
                        ·
                      </span>
                      <span className="underline">
                        {copy(open ? MAP_COPY.collapse : MAP_COPY.expand)}
                      </span>
                    </span>
                  </summary>

                  <ol className="flex flex-col gap-6 p-6 md:p-8">
                    {courses.map((course) =>
                      renderCourse(course, course.id === activeCourseId)
                    )}
                  </ol>
                </details>
              </section>
            );
          })}
        </div>

        <p className="mt-12 font-mono text-[12px] text-ash/80">
          {copy(MAP_COPY.localOnly)}
        </p>
      </main>
      <SiteFooter home="/dashboard" />
    </div>
  );
}
