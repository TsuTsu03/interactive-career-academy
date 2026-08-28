"use client";

import { useCallback, useEffect, useState } from "react";
import { curriculum } from "@/content/curriculum";
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
    progress: emptyProgress(),
  });

  const refresh = useCallback(() => {
    const progress = Object.fromEntries(
      curriculum.courses.map((course) => [
        course.id,
        courseProgressFromStorage(course, localStorage.getItem(courseStorageKey(course.id))),
      ]),
    );
    setState((current) => ({ ...current, ready: true, progress }));
  }, []);

  useEffect(() => {
    // Browser progress is unavailable during SSR, so adopt it once after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
    window.addEventListener("codedaddy-progress-imported", refresh);
    return () => window.removeEventListener("codedaddy-progress-imported", refresh);
  }, [refresh]);

  return { ...state, refresh };
}
