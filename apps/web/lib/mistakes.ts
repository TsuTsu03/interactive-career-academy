import { curriculum } from "@/content/curriculum";
import type { Course, Step } from "@/lib/lesson-ir";

export const mistakeStorageKey = "aca.mistakes.v1";
export const MISTAKE_VERSION = 1;

export interface MistakeEntry {
  key: string;
  testId: string;
  conceptId: string;
  courseId: string;
  projectId: string;
  stepId: string;
  count: number;
  lastFailedAt: string;
}

export interface MistakeState {
  version: typeof MISTAKE_VERSION;
  entries: MistakeEntry[];
}

export function freshMistakeState(): MistakeState {
  return { version: MISTAKE_VERSION, entries: [] };
}

function conceptForStep(course: Course, step: Step): string {
  if (step.conceptIds?.[0]) return step.conceptIds[0];
  const index = course.steps.findIndex((candidate) => candidate.id === step.id);
  for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
    const candidate = course.steps[cursor];
    if (candidate.projectId === step.projectId && candidate.conceptIds?.[0]) {
      return candidate.conceptIds[0];
    }
  }
  for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
    const conceptId = course.steps[cursor].conceptIds?.[0];
    if (conceptId) return conceptId;
  }
  return `${course.id}-foundations`;
}

export function recordMistakes(
  state: MistakeState,
  course: Course,
  step: Step,
  failedTestIds: string[],
  failedAt: string,
): MistakeState {
  const conceptId = conceptForStep(course, step);
  const entries = [...state.entries];
  for (const testId of [...new Set(failedTestIds)]) {
    if (!step.tests.some((test) => test.id === testId)) continue;
    const key = `${testId}::${conceptId}`;
    const index = entries.findIndex((entry) => entry.key === key);
    const next: MistakeEntry = {
      key,
      testId,
      conceptId,
      courseId: course.id,
      projectId: step.projectId,
      stepId: step.id,
      count: index >= 0 ? entries[index].count + 1 : 1,
      lastFailedAt: failedAt,
    };
    if (index >= 0) entries[index] = next;
    else entries.push(next);
  }
  return { version: MISTAKE_VERSION, entries };
}

export function validateMistakeState(value: unknown): MistakeState | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const candidate = value as Partial<MistakeState>;
  if (candidate.version !== MISTAKE_VERSION || !Array.isArray(candidate.entries)) {
    return null;
  }

  const valid = new Map<string, MistakeEntry>();
  for (const valueEntry of candidate.entries) {
    if (!valueEntry || typeof valueEntry !== "object" || Array.isArray(valueEntry)) continue;
    const entry = valueEntry as Partial<MistakeEntry>;
    const course = curriculum.courses.find((item) => item.id === entry.courseId);
    const step = course?.steps.find((item) => item.id === entry.stepId);
    if (
      !course ||
      !step ||
      !step.tests.some((test) => test.id === entry.testId) ||
      step.projectId !== entry.projectId ||
      typeof entry.conceptId !== "string" ||
      !entry.conceptId ||
      entry.key !== `${entry.testId}::${entry.conceptId}` ||
      typeof entry.count !== "number" ||
      !Number.isInteger(entry.count) ||
      entry.count < 1 ||
      typeof entry.lastFailedAt !== "string"
    ) continue;
    valid.set(entry.key, entry as MistakeEntry);
  }
  if (valid.size !== candidate.entries.length) return null;
  return { version: MISTAKE_VERSION, entries: [...valid.values()] };
}

export function restoreMistakeState(value: unknown): MistakeState {
  return validateMistakeState(value) ?? freshMistakeState();
}

export function loadMistakeState(): MistakeState {
  try {
    const raw = localStorage.getItem(mistakeStorageKey);
    return restoreMistakeState(raw ? JSON.parse(raw) : null);
  } catch {
    return freshMistakeState();
  }
}

export function saveMistakeState(state: MistakeState): void {
  try {
    localStorage.setItem(mistakeStorageKey, JSON.stringify(state));
    window.dispatchEvent(new Event("codedaddy-mistakes-changed"));
  } catch {
    // A full or blocked browser store must never stop a lesson attempt.
  }
}

export function topMistakes(state: MistakeState, limit = 3): MistakeEntry[] {
  return [...state.entries]
    .sort((a, b) => b.count - a.count || b.lastFailedAt.localeCompare(a.lastFailedAt))
    .slice(0, limit);
}
