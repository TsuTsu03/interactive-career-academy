import type { Concept, Course, Step } from "@/lib/lesson-ir";

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30] as const;

export interface ReviewItem {
  conceptId: string;
  stepId: string;
  stage: number;
  dueOn: string;
}

export interface ReviewState {
  items: ReviewItem[];
}

export type ReviewRating = "again" | "got-it";

export interface ReviewConcept {
  concept: Concept;
  item: ReviewItem;
  step: Step;
}

interface CompletedConcept {
  concept: Concept;
  step: Step;
}

export function freshReviewState(): ReviewState {
  return { items: [] };
}

export function todayKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isDateKey(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day, 12);
  return todayKey(date) === value;
}

export function addDays(dateKey: string, days: number): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day, 12);
  date.setDate(date.getDate() + days);
  return todayKey(date);
}

function completedConcepts(course: Course, completedStepIds: string[]): CompletedConcept[] {
  const completed = new Set(completedStepIds);
  const concepts: CompletedConcept[] = [];

  for (const step of course.steps) {
    if (!completed.has(step.id)) continue;

    for (const concept of step.concepts ?? []) {
      concepts.push({ concept, step });
    }
  }

  return concepts;
}

function validSavedItems(value: unknown): Map<string, ReviewItem> {
  const saved = new Map<string, ReviewItem>();
  if (!value || typeof value !== "object" || Array.isArray(value)) return saved;

  const items = (value as { items?: unknown }).items;
  if (!Array.isArray(items)) return saved;

  for (const candidate of items) {
    if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) continue;
    const item = candidate as Partial<ReviewItem>;
    if (
      typeof item.conceptId !== "string" ||
      typeof item.stepId !== "string" ||
      typeof item.stage !== "number" ||
      !Number.isInteger(item.stage) ||
      item.stage < 0 ||
      item.stage >= REVIEW_INTERVAL_DAYS.length ||
      !isDateKey(item.dueOn)
    ) {
      continue;
    }

    saved.set(item.conceptId, {
      conceptId: item.conceptId,
      stepId: item.stepId,
      stage: item.stage,
      dueOn: item.dueOn,
    });
  }

  return saved;
}

/**
 * Restore review data against the current lesson IR. Completed concepts that
 * predate review support are due now, while stale or malformed items are dropped.
 */
export function restoreReviewState(
  value: unknown,
  course: Course,
  completedStepIds: string[],
  today: string,
): ReviewState {
  const saved = validSavedItems(value);
  const items = completedConcepts(course, completedStepIds).map(({ concept, step }) => {
    const existing = saved.get(concept.id);
    return existing?.stepId === step.id
      ? existing
      : { conceptId: concept.id, stepId: step.id, stage: 0, dueOn: today };
  });

  return { items };
}

export function enrollStepConcepts(
  state: ReviewState,
  step: Step,
  today: string,
): ReviewState {
  const known = new Set(state.items.map((item) => item.conceptId));
  const additions = (step.concepts ?? [])
    .filter((concept) => !known.has(concept.id))
    .map((concept) => ({
      conceptId: concept.id,
      stepId: step.id,
      stage: 0,
      dueOn: addDays(today, REVIEW_INTERVAL_DAYS[0]),
    }));

  return additions.length > 0 ? { items: [...state.items, ...additions] } : state;
}

export function dueReviewConcepts(
  state: ReviewState,
  course: Course,
  today: string,
): ReviewConcept[] {
  const due = new Map(
    state.items.filter((item) => item.dueOn <= today).map((item) => [item.conceptId, item]),
  );
  const concepts: ReviewConcept[] = [];

  for (const step of course.steps) {
    for (const concept of step.concepts ?? []) {
      const item = due.get(concept.id);
      if (item?.stepId === step.id) concepts.push({ concept, item, step });
    }
  }

  return concepts;
}

export function rateReviewItem(
  state: ReviewState,
  conceptId: string,
  rating: ReviewRating,
  today: string,
): ReviewState {
  return {
    items: state.items.map((item) => {
      if (item.conceptId !== conceptId) return item;

      const stage = rating === "again"
        ? 0
        : Math.min(item.stage + 1, REVIEW_INTERVAL_DAYS.length - 1);

      return {
        ...item,
        stage,
        dueOn: addDays(today, REVIEW_INTERVAL_DAYS[stage]),
      };
    }),
  };
}
