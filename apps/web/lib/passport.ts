import { curriculum } from "@/content/curriculum";
import {
  courseSessionSnapshotFromStorage,
  courseStorageKey,
  reviewStorageKey,
} from "@/lib/progress";
import { restoreReviewState, todayKey } from "@/lib/review";
import {
  loadMistakeState,
  mistakeStorageKey,
  validateMistakeState,
} from "@/lib/mistakes";
import {
  loadPracticeState,
  practiceStorageKey,
  validatePracticeState,
} from "@/lib/practice-progress";

const PASSPORT_KIND = "codedaddy-progress-passport";
export const PASSPORT_VERSION = 1;

interface PassportFile {
  kind: typeof PASSPORT_KIND;
  version: typeof PASSPORT_VERSION;
  exportedAt: string;
  records: {
    courses: Record<string, Record<string, unknown>>;
    review: unknown;
    mistakes?: unknown;
    practice?: unknown;
  };
}

export interface PassportResult {
  ok: boolean;
  message: string;
  courseCount: number;
}

export function createPassport(): PassportFile {
  const courses: PassportFile["records"]["courses"] = {};
  for (const course of curriculum.courses) {
    const snapshot = courseSessionSnapshotFromStorage(
      course,
      localStorage.getItem(courseStorageKey(course.id)),
    );
    if (snapshot) courses[course.id] = snapshot.record;
  }

  let review: unknown = null;
  try {
    const raw = localStorage.getItem(reviewStorageKey);
    review = raw ? JSON.parse(raw) : null;
  } catch {
    review = null;
  }

  return {
    kind: PASSPORT_KIND,
    version: PASSPORT_VERSION,
    exportedAt: new Date().toISOString(),
    records: {
      courses,
      review,
      mistakes: loadMistakeState(),
      practice: loadPracticeState(),
    },
  };
}

export function importPassport(value: unknown): PassportResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ok: false, message: "This file is not a CodeDaddy Progress Passport.", courseCount: 0 };
  }
  const candidate = value as Partial<PassportFile>;
  if (candidate.kind !== PASSPORT_KIND) {
    return { ok: false, message: "This file is not a CodeDaddy Progress Passport.", courseCount: 0 };
  }
  if (candidate.version !== PASSPORT_VERSION) {
    return {
      ok: false,
      message: "This passport uses a version this app cannot import. No progress was changed.",
      courseCount: 0,
    };
  }
  if (!candidate.records || typeof candidate.records !== "object") {
    return { ok: false, message: "This passport is incomplete. No progress was changed.", courseCount: 0 };
  }
  const courseValues = candidate.records.courses;
  if (!courseValues || typeof courseValues !== "object" || Array.isArray(courseValues)) {
    return { ok: false, message: "This passport has no valid course records. No progress was changed.", courseCount: 0 };
  }

  const staged = new Map<string, string>();
  const completedByCourse: Record<string, string[]> = {};
  for (const course of curriculum.courses) {
    const record = courseValues[course.id];
    if (record === undefined) {
      completedByCourse[course.id] = [];
      continue;
    }
    const raw = JSON.stringify(record);
    const snapshot = courseSessionSnapshotFromStorage(course, raw);
    if (!snapshot) {
      return {
        ok: false,
        message: `${course.title} has an invalid progress record. No progress was changed.`,
        courseCount: 0,
      };
    }
    staged.set(courseStorageKey(course.id), JSON.stringify(snapshot.record));
    completedByCourse[course.id] = snapshot.completedStepIds;
  }

  const review = restoreReviewState(
    candidate.records.review,
    curriculum,
    completedByCourse,
    todayKey(),
  );
  const mistakes = candidate.records.mistakes === undefined
    ? null
    : validateMistakeState(candidate.records.mistakes);
  if (candidate.records.mistakes !== undefined && !mistakes) {
    return {
      ok: false,
      message: "This passport has an invalid Mistake Museum record. No progress was changed.",
      courseCount: 0,
    };
  }
  const practice = candidate.records.practice === undefined
    ? null
    : validatePracticeState(candidate.records.practice);
  if (candidate.records.practice !== undefined && !practice) {
    return {
      ok: false,
      message: "This passport has an invalid practice record. No progress was changed.",
      courseCount: 0,
    };
  }
  const keys = [
    ...curriculum.courses.map((course) => courseStorageKey(course.id)),
    reviewStorageKey,
    ...(candidate.records.mistakes === undefined ? [] : [mistakeStorageKey]),
    ...(candidate.records.practice === undefined ? [] : [practiceStorageKey]),
  ];
  const backup = new Map(keys.map((key) => [key, localStorage.getItem(key)]));

  try {
    for (const key of keys) {
      const next = key === reviewStorageKey
        ? JSON.stringify(review)
        : key === mistakeStorageKey
          ? mistakes
            ? JSON.stringify(mistakes)
            : undefined
          : key === practiceStorageKey
            ? practice
              ? JSON.stringify(practice)
              : undefined
          : staged.get(key);
      if (next === undefined) localStorage.removeItem(key);
      else localStorage.setItem(key, next);
    }
  } catch {
    for (const [key, raw] of backup) {
      if (raw === null) localStorage.removeItem(key);
      else localStorage.setItem(key, raw);
    }
    return {
      ok: false,
      message: "Browser storage could not apply this passport. Your earlier progress was restored.",
      courseCount: 0,
    };
  }

  window.dispatchEvent(new Event("codedaddy-progress-imported"));
  return {
    ok: true,
    message: `Imported progress for ${staged.size} ${staged.size === 1 ? "course" : "courses"}.`,
    courseCount: staged.size,
  };
}
