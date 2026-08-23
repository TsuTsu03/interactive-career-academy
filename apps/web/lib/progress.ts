import type { Course, Register } from "@/lib/lesson-ir";

export const courseStorageKey = (courseId: string) => `aca.progress.v2.${courseId}`;

export interface CourseProgress {
  completedCount: number;
  total: number;
  isComplete: boolean;
  hasSession: boolean;
  register: Register;
}

export interface CourseSessionSnapshot {
  record: Record<string, unknown>;
  stepIndex: number;
  completedStepIds: string[];
  register: Register;
}

function validStepIndex(course: Course, value: unknown): number | null {
  return typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0 &&
    value < course.steps.length
    ? value
    : null;
}

/**
 * Older snapshots did not record completed step ids. Reaching step N proves
 * that every earlier step was cleared, so restore that prefix without
 * inventing completion for the current step.
 */
export function normalizeCompletedStepIds(
  course: Course,
  stepIndex: number,
  value: unknown,
): string[] {
  const completed = new Set(course.steps.slice(0, stepIndex).map((step) => step.id));

  if (Array.isArray(value)) {
    for (const id of value) {
      if (typeof id === "string" && course.steps.some((step) => step.id === id)) {
        completed.add(id);
      }
    }
  }

  return course.steps.filter((step) => completed.has(step.id)).map((step) => step.id);
}

/** Parse one atomic course session as untrusted browser data. */
export function courseSessionSnapshotFromStorage(
  course: Course,
  raw: string | null,
): CourseSessionSnapshot | null {
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;

    const saved = parsed as Record<string, unknown>;
    const stepIndex = validStepIndex(course, saved.stepIdx);
    if (stepIndex === null) return null;
    const completedStepIds = normalizeCompletedStepIds(
      course,
      stepIndex,
      saved.completedSteps,
    );

    return {
      record: saved,
      stepIndex,
      completedStepIds,
      register: saved.register === "standard" ? "standard" : "simple",
    };
  } catch {
    return null;
  }
}

/** Read one atomic course session as untrusted browser data. */
export function courseProgressFromStorage(course: Course, raw: string | null): CourseProgress {
  const snapshot = courseSessionSnapshotFromStorage(course, raw);

  if (!snapshot) {
    return {
      completedCount: 0,
      total: course.steps.length,
      isComplete: false,
      hasSession: false,
      register: "simple",
    };
  }

  return {
    completedCount: snapshot.completedStepIds.length,
    total: course.steps.length,
    isComplete: snapshot.completedStepIds.length === course.steps.length,
    hasSession: true,
    register: snapshot.register,
  };
}
