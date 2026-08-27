import type { Course, Curriculum } from "@/lib/lesson-ir";
import { restoreReviewState, todayKey, type ReviewState } from "@/lib/review";

export const courseStorageKey = (courseId: string) => `aca.progress.v2.${courseId}`;

/**
 * Spaced review spans every course, so its schedule cannot live inside any
 * one course's atomic session. It gets its own storage key instead — a
 * second atomic object, not a split of the first. AGENTS.md rule 1.6
 * (amended): code and step position are atomic per course; review is its
 * own atomic record because it does not belong to one course.
 */
export const reviewStorageKey = "aca.review.v1";

export interface CourseProgress {
  completedCount: number;
  total: number;
  isComplete: boolean;
  hasSession: boolean;
}

export interface CourseSessionSnapshot {
  record: Record<string, unknown>;
  stepIndex: number;
  completedStepIds: string[];
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

    // Older sessions included a reading-level choice. It no longer affects
    // progress, and removing it from the normalized record lets any future
    // write migrate the snapshot without touching the learner's code or steps.
    const record = { ...saved };
    delete record.register;

    return {
      record,
      stepIndex,
      completedStepIds,
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
    };
  }

  return {
    completedCount: snapshot.completedStepIds.length,
    total: course.steps.length,
    isComplete: snapshot.completedStepIds.length === course.steps.length,
    hasSession: true,
  };
}

/**
 * Every course's completed step ids, read from each course's own atomic
 * storage. Only ever called from an effect or a handler, never during
 * render — same rule every other localStorage read in this app follows.
 */
export function completedStepIdsByCourse(curriculum: Curriculum): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const course of curriculum.courses) {
    const raw = localStorage.getItem(courseStorageKey(course.id));
    result[course.id] = courseSessionSnapshotFromStorage(course, raw)?.completedStepIds ?? [];
  }
  return result;
}

/** Read the global review record, restored against every course's progress. */
export function loadGlobalReviewState(curriculum: Curriculum): ReviewState {
  let saved: unknown = null;
  try {
    const raw = localStorage.getItem(reviewStorageKey);
    saved = raw ? JSON.parse(raw) : null;
  } catch {
    saved = null;
  }
  return restoreReviewState(saved, curriculum, completedStepIdsByCourse(curriculum), todayKey());
}

/** Persist the global review record. Never throws; storage can be full or blocked. */
export function saveGlobalReviewState(state: ReviewState): void {
  try {
    localStorage.setItem(reviewStorageKey, JSON.stringify(state));
  } catch {
    // Storage full or blocked. Review continues in memory for this session.
  }
}
