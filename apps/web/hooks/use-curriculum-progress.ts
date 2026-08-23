"use client";

import { useCallback, useEffect, useState } from "react";
import { curriculum } from "@/content/curriculum";
import type { Register } from "@/lib/lesson-ir";
import {
  courseProgressFromStorage,
  courseStorageKey,
  type CourseProgress,
} from "@/lib/progress";

export type ProgressByCourse = Record<string, CourseProgress>;

function emptyProgress(): ProgressByCourse {
  return Object.fromEntries(
    curriculum.courses.map((course) => [course.id, courseProgressFromStorage(course, null)]),
  );
}

export function useCurriculumProgress() {
  const [state, setState] = useState({
    ready: false,
    register: "simple" as Register,
    progress: emptyProgress(),
  });

  const refresh = useCallback(() => {
    const progress = Object.fromEntries(
      curriculum.courses.map((course) => [
        course.id,
        courseProgressFromStorage(course, localStorage.getItem(courseStorageKey(course.id))),
      ]),
    );
    const register = Object.values(progress).find((item) => item.hasSession)?.register ?? "simple";
    setState((current) => ({ ...current, ready: true, register, progress }));
  }, []);

  useEffect(() => {
    // Browser progress is unavailable during SSR, so adopt it once after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  const setRegister = useCallback(
    (register: Register) => setState((current) => ({ ...current, register })),
    [],
  );

  return { ...state, refresh, setRegister };
}
