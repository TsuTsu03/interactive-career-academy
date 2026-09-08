"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Icon, type IconName } from "@/components/icon";
import { ProductNav } from "@/components/product-nav";
import { SiteFooter } from "@/components/site-footer";
import { curriculum } from "@/content/curriculum";
import { useCurriculumProgress } from "@/hooks/use-curriculum-progress";
import { isComplete, restoreChallengeState, todaysChallenges } from "@/lib/challenges";
import {
  courseSessionSnapshotFromStorage,
  courseStorageKey,
} from "@/lib/progress";

interface DashboardState {
  dailyDone: number;
  dailyTotal: number;
  projectsBuilt: string[];
  xp: number;
  streak: number;
  stepByCourse: Record<string, number>;
}

const EMPTY_STATE: DashboardState = {
  dailyDone: 0,
  dailyTotal: 2,
  projectsBuilt: [],
  xp: 0,
  streak: 0,
  stepByCourse: {},
};

const PROJECT_IMAGES = [
  "/stitch/project-portfolio.png",
  "/stitch/project-calculator.png",
] as const;

/** The four Stitch dashboard tiles, in the order the design lays them out. */
const STATS: {
  icon: IconName;
  filled: boolean;
  tone: string;
  label: string;
  read: (state: DashboardState) => string;
}[] = [
  {
    icon: "local_fire_department",
    filled: true,
    tone: "text-secondary",
    label: "Current Streak",
    read: (state) =>
      state.streak ? `${state.streak} ${state.streak === 1 ? "Day" : "Days"}` : "Start Today",
  },
  {
    icon: "stars",
    filled: true,
    tone: "text-primary",
    label: "Total XP",
    read: (state) => state.xp.toLocaleString(),
  },
  {
    icon: "task_alt",
    filled: false,
    tone: "text-on-tertiary-container",
    label: "Daily Challenges",
    read: (state) => `${state.dailyDone}/${state.dailyTotal}`,
  },
  {
    icon: "folder_open",
    filled: false,
    tone: "text-secondary",
    label: "Projects Built",
    read: (state) => state.projectsBuilt.length.toString(),
  },
];

function numberField(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0;
}

export function LearnerHome() {
  const { ready, progress } = useCurriculumProgress();
  const [dashboard, setDashboard] = useState<DashboardState>(EMPTY_STATE);

  useEffect(() => {
    const built: string[] = [];
    const stepByCourse: Record<string, number> = {};
    let dailyDone = 0;
    let dailyTotal = 2;
    let xp = 0;
    let streak = 0;

    for (const course of curriculum.courses) {
      const snapshot = courseSessionSnapshotFromStorage(
        course,
        localStorage.getItem(courseStorageKey(course.id)),
      );
      if (!snapshot) continue;

      stepByCourse[course.id] = snapshot.stepIndex;
      const completed = new Set(snapshot.completedStepIds);
      for (const project of course.projects) {
        const projectSteps = course.steps.filter((step) => step.projectId === project.id);
        if (projectSteps.length > 0 && projectSteps.every((step) => completed.has(step.id))) {
          built.push(`${course.id}:${project.id}`);
        }
      }

      const game = snapshot.record.game;
      if (game && typeof game === "object" && !Array.isArray(game)) {
        const fields = game as Record<string, unknown>;
        xp += numberField(fields.xp);
        streak = Math.max(streak, numberField(fields.streak));
      }

      const challengeState = restoreChallengeState(snapshot.record.challenges);
      const daily = todaysChallenges(challengeState.day);
      dailyDone = Math.max(
        dailyDone,
        daily.filter((challenge) => isComplete(challengeState, challenge)).length,
      );
      dailyTotal = daily.length;
    }

    // Browser-only local storage must be adopted after mount to avoid a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDashboard({ dailyDone, dailyTotal, projectsBuilt: built, xp, streak, stepByCourse });
  }, []);

  const currentCourse = useMemo(() => {
    const active = curriculum.courses.find(
      (course) => progress[course.id]?.hasSession && !progress[course.id]?.isComplete,
    );
    if (active) return active;

    return (
      curriculum.courses.find((course) =>
        course.steps.length > 0 && course.requires.every((requiredId) => progress[requiredId]?.isComplete),
      ) ?? curriculum.courses[0]
    );
  }, [progress]);

  const courseProgress = progress[currentCourse.id];
  const stepIndex = dashboard.stepByCourse[currentCourse.id] ?? courseProgress.completedCount;
  const activeStep = currentCourse.steps[Math.min(stepIndex, currentCourse.steps.length - 1)];
  const activeProject = currentCourse.projects.find((project) => project.id === activeStep.projectId);
  const completion = Math.round((courseProgress.completedCount / Math.max(1, courseProgress.total)) * 100);
  const projectCards = currentCourse.projects.slice(0, 2);
  const nextCourses = curriculum.courses.filter((course) => course.id !== currentCourse.id).slice(0, 2);
  const level = Math.floor(dashboard.xp / 500) + 1;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-on-background">
      <ProductNav current="dashboard" resumeHref={`/learn/${currentCourse.id}`} />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-12 px-margin-mobile py-8 md:px-margin-desktop md:py-12">
        {/* Welcome and resume: the Stitch bento header */}
        <section className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
          <header className="flex flex-col justify-center lg:col-span-5">
            <span className="mb-4 w-fit rounded-full border border-outline-variant bg-primary-container px-3 py-1 text-label-caps uppercase text-on-primary-container">
              Level {level} Developer
            </span>
            <h1 className="mb-2 font-display text-[24px] font-bold leading-8 tracking-[-0.01em] md:text-headline-lg">
              Welcome back!
            </h1>
            <p className="mb-6 max-w-[44ch] text-body-lg text-on-surface-variant">
              You&apos;re building momentum. Keep pushing forward on your web development journey.
            </p>
          </header>

          <section
            aria-labelledby="current-focus"
            className="group relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low p-6 md:p-8 lg:col-span-7"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-primary opacity-5" />
            <div className="relative z-10">
              <p id="current-focus" className="mb-2 flex items-center gap-2 text-label-caps uppercase text-secondary">
                <Icon name="play_circle" size={16} filled />
                Current Focus
              </p>
              <h2 className="mb-2 text-headline-md">{currentCourse.title}</h2>
              <p className="mb-6 text-on-surface-variant">
                Step {Math.min(stepIndex + 1, courseProgress.total)} of {courseProgress.total}
                {activeProject ? `: ${activeProject.title}` : ""}
              </p>
              <div
                className="mb-8 h-2 w-full overflow-hidden rounded-full bg-surface-variant"
                role="progressbar"
                aria-label={`${currentCourse.title} progress`}
                aria-valuenow={courseProgress.completedCount}
                aria-valuemin={0}
                aria-valuemax={courseProgress.total}
              >
                <div className="h-full rounded-full bg-secondary transition-[width]" style={{ width: `${completion}%` }} />
              </div>
            </div>
            <div className="relative z-10 flex justify-end">
              <Link
                href={`/learn/${currentCourse.id}`}
                className="flex h-touch-target items-center justify-center gap-2 rounded bg-primary px-6 text-label-caps uppercase text-on-primary transition-transform duration-300 group-hover:scale-105 active:scale-95"
              >
                {courseProgress.hasSession ? "Continue Project" : "Start Project"}
                <Icon name="arrow_forward" size={18} />
              </Link>
            </div>
            {!ready ? <span className="sr-only">Loading saved progress</span> : null}
          </section>
        </section>

        {/* Stat tiles */}
        <section aria-label="Learning summary" className="grid grid-cols-2 gap-gutter md:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-start justify-center rounded-lg border border-outline-variant bg-surface-container-low p-gutter"
            >
              <span className={`mb-2 ${stat.tone}`}>
                <Icon name={stat.icon} size={30} filled={stat.filled} />
              </span>
              <p className="text-headline-md">{stat.read(dashboard)}</p>
              <p className="mt-1 text-label-caps uppercase text-on-surface-variant">{stat.label}</p>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Projects */}
          <section className="flex flex-col gap-6 lg:col-span-2" aria-labelledby="projects-heading">
            <div className="flex items-end justify-between border-b border-outline-variant pb-2">
              <h2 id="projects-heading" className="text-headline-md">My Projects</h2>
              <Link href="/projects" className="text-label-caps uppercase text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2">
              {projectCards.map((project, index) => {
                const complete = dashboard.projectsBuilt.includes(`${currentCourse.id}:${project.id}`);
                const current = activeProject?.id === project.id;
                const status = complete ? "Completed" : current ? "In Progress" : "Not Started";
                return (
                  <article
                    key={project.id}
                    className="flex flex-col overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest transition-transform hover:-translate-y-1"
                  >
                    <div className="relative h-32 w-full overflow-hidden bg-surface-variant">
                      <Image
                        src={PROJECT_IMAGES[index]}
                        alt=""
                        fill
                        loading={index === 0 ? "eager" : "lazy"}
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <span
                        className={`absolute right-2 top-2 flex items-center gap-1 rounded px-2 py-1 text-label-caps uppercase ${
                          complete
                            ? "bg-surface text-on-surface"
                            : "border border-outline-variant bg-surface-container-high text-on-surface-variant"
                        }`}
                      >
                        <Icon
                          name={complete ? "check_circle" : current ? "play_circle" : "lock"}
                          size={14}
                          filled={complete}
                        />
                        {status}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="mb-1 text-body-lg font-bold">{project.title}</h3>
                      <p className="mb-4 line-clamp-2 text-sm text-on-surface-variant">
                        A guided project in {currentCourse.title}.
                      </p>
                      <div className="mt-auto flex gap-2">
                        <span className="rounded bg-surface-container px-2 py-1 font-mono text-xs uppercase text-on-surface-variant">
                          {currentCourse.kind}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Milestones */}
          <section className="flex flex-col gap-6" aria-labelledby="milestones-heading">
            <div className="border-b border-outline-variant pb-2">
              <h2 id="milestones-heading" className="text-headline-md">Upcoming Milestones</h2>
            </div>
            <div className="flex flex-col gap-4 rounded-lg border border-outline-variant bg-surface-container-lowest p-4">
              {nextCourses.map((course, index) => {
                const unlocked = course.requires.every((id) => progress[id]?.isComplete);
                return (
                  <div key={course.id} className="flex flex-col gap-4">
                    {index > 0 ? <hr className="border-outline-variant" /> : null}
                    <div className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-outline-variant bg-surface-container-high text-on-surface-variant">
                        <Icon name={unlocked ? "play_circle" : "lock"} size={16} />
                      </span>
                      <div>
                        <h3 className="mb-1 text-body-lg font-bold leading-6">{course.title}</h3>
                        <p className="text-sm text-on-surface-variant">
                          {unlocked
                            ? "Unlocked. Open it whenever you are ready."
                            : "Finish the earlier course to unlock this."}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter home="/dashboard" />
    </div>
  );
}
