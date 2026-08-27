import { conceptById } from "@/content/concepts";
import type { Concept, Curriculum, Step } from "@/lib/lesson-ir";

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30] as const;

/**
 * Spaced review is global, not per-course.
 *
 * A concept learned in one course (e.g. "class" in Learn CSS) must still
 * resurface while the learner spends the next several months inside a later
 * course — that is exactly the gap in memory decision 17 exists to close.
 * One review record spans every course, keyed by the global concept id from
 * `content/concepts.ts`, so a concept is scheduled once no matter how many
 * courses reference it. This is its own atomic persisted object, separate
 * from any one course's session, because it does not belong to one course.
 * PLAN.md section 3, decision 26. AGENTS.md rule 1.6 (amended).
 */
export interface ReviewItem {
  conceptId: string;
  /** The course whose step first introduced this concept, for display and lookup. */
  courseId: string;
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
  courseId: string;
  courseTitle: string;
  step: Step;
}

interface CompletedConcept {
  concept: Concept;
  courseId: string;
  courseTitle: string;
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

/**
 * Every concept the learner has finished, across every course, in curriculum
 * order. Deduplicated by concept id: a concept referenced again in a later
 * course (same id, same registry entry) is not enrolled a second time.
 */
function completedConcepts(
  curriculum: Curriculum,
  completedStepIdsByCourse: Record<string, string[]>,
): CompletedConcept[] {
  const seen = new Set<string>();
  const out: CompletedConcept[] = [];

  for (const course of curriculum.courses) {
    const completed = new Set(completedStepIdsByCourse[course.id] ?? []);

    for (const step of course.steps) {
      if (!completed.has(step.id)) continue;

      for (const conceptId of step.conceptIds ?? []) {
        if (seen.has(conceptId)) continue;
        const concept = conceptById(conceptId);
        if (!concept) continue;
        seen.add(conceptId);
        out.push({ concept, courseId: course.id, courseTitle: course.title, step });
      }
    }
  }

  return out;
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
      typeof item.courseId !== "string" ||
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
      courseId: item.courseId,
      stepId: item.stepId,
      stage: item.stage,
      dueOn: item.dueOn,
    });
  }

  return saved;
}

/**
 * Restore the global review record against the current lesson IR. Completed
 * concepts that predate review support, or that were never enrolled, are due
 * now. Stale or malformed items are dropped.
 */
export function restoreReviewState(
  value: unknown,
  curriculum: Curriculum,
  completedStepIdsByCourse: Record<string, string[]>,
  today: string,
): ReviewState {
  const saved = validSavedItems(value);
  const items = completedConcepts(curriculum, completedStepIdsByCourse).map(
    ({ concept, courseId, step }) => {
      const existing = saved.get(concept.id);
      return existing?.stepId === step.id && existing.courseId === courseId
        ? existing
        : { conceptId: concept.id, courseId, stepId: step.id, stage: 0, dueOn: today };
    },
  );

  return { items };
}

/** Called the moment a step completes, so its new concepts enter the schedule. */
export function enrollStepConcepts(
  state: ReviewState,
  courseId: string,
  step: Step,
  today: string,
): ReviewState {
  const known = new Set(state.items.map((item) => item.conceptId));
  const additions = (step.conceptIds ?? [])
    .filter((id) => !known.has(id) && conceptById(id))
    .map((conceptId) => ({
      conceptId,
      courseId,
      stepId: step.id,
      stage: 0,
      dueOn: addDays(today, REVIEW_INTERVAL_DAYS[0]),
    }));

  return additions.length > 0 ? { items: [...state.items, ...additions] } : state;
}

export function dueReviewConcepts(
  state: ReviewState,
  curriculum: Curriculum,
  today: string,
): ReviewConcept[] {
  const concepts: ReviewConcept[] = [];

  for (const item of state.items) {
    if (item.dueOn > today) continue;
    const concept = conceptById(item.conceptId);
    const course = curriculum.courses.find((c) => c.id === item.courseId);
    const step = course?.steps.find((s) => s.id === item.stepId);
    if (!concept || !course || !step) continue;
    concepts.push({ concept, item, courseId: course.id, courseTitle: course.title, step });
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
