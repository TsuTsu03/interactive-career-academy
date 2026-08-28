"use client";

import { Icon } from "@/components/icon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Workspace } from "@/components/workspace";
import { courseById } from "@/content/curriculum";
import { copy, type Copy, type Course } from "@/lib/lesson-ir";
import { courseProgressFromStorage, courseStorageKey } from "@/lib/progress";

const GATE_COPY = {
  loading: "Checking course progress",
  locked: "This course is locked.",
  requirement: "Finish the course before this one.",
  returnToMap: "VIEW COURSE MAP",
} satisfies Record<string, Copy>;

interface GateState {
  ready: boolean;
  unlocked: boolean;
}

export function CourseGate({ course }: { course: Course }) {
  const [state, setState] = useState<GateState>({
    ready: false,
    unlocked: false,
  });

  useEffect(() => {
    const ownProgress = courseProgressFromStorage(
      course,
      localStorage.getItem(courseStorageKey(course.id)),
    );
    const requirements = course.requires
      .map((id) => courseById(id))
      .filter((requiredCourse): requiredCourse is Course => requiredCourse !== undefined);
    const progress = requirements.map((requiredCourse) =>
      courseProgressFromStorage(
        requiredCourse,
        localStorage.getItem(courseStorageKey(requiredCourse.id)),
      ),
    );

    // Browser progress is unavailable to the server. Adopt it after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({
      ready: true,
      unlocked:
        ownProgress.hasSession ||
        (requirements.length === course.requires.length && progress.every((item) => item.isComplete)),
    });
  }, [course]);

  if (state.ready && state.unlocked) return <Workspace course={course} />;

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[720px] items-center px-5 py-12 sm:px-6">
      <section className="w-full rounded-2xl border border-hairline bg-panel p-6 sm:p-8" aria-live="polite">
        <div className="flex items-center gap-2 font-mono text-[12px] text-ash">
          <Icon name={state.ready ? "lock" : "radio_button_unchecked"} size={16} />
          <span>{copy(state.ready ? GATE_COPY.locked : GATE_COPY.loading)}</span>
        </div>
        {state.ready ? (
          <>
            <h1 className="mt-4 font-display text-[32px] font-bold tracking-tight text-chalk">
              {course.title}
            </h1>
            <p className="mt-3 max-w-[54ch] text-[16px] leading-relaxed text-ash">
              {copy(GATE_COPY.requirement)}
            </p>
            <Link
              href="/curriculum"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-voltage px-5 py-3 font-bold text-on-voltage transition-transform active:scale-[0.98]"
            >
              {copy(GATE_COPY.returnToMap)}
              <Icon name="arrow_forward" size={16} />
            </Link>
          </>
        ) : null}
      </section>
    </main>
  );
}
