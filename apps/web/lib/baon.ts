import type { Course } from "@/lib/lesson-ir";

export const baonStorageKey = "aca.baon.v1";

export interface BaonPlan {
  version: 1;
  courseId: string;
  stepIds: string[];
  estimatedMinutes: number;
  createdAt: string;
}

export function buildBaonPlan(
  course: Course,
  startIndex: number,
  availableMinutes: number,
  createdAt: string,
): BaonPlan | null {
  if (!Number.isInteger(startIndex) || startIndex < 0 || startIndex >= course.steps.length) {
    return null;
  }
  if (!Number.isFinite(availableMinutes) || availableMinutes < 1) return null;

  const stepIds: string[] = [];
  let estimatedMinutes = 0;
  for (const step of course.steps.slice(startIndex)) {
    const minutes = step.estimatedMinutes ?? 5;
    if (estimatedMinutes + minutes > availableMinutes) break;
    stepIds.push(step.id);
    estimatedMinutes += minutes;
  }

  return {
    version: 1,
    courseId: course.id,
    stepIds,
    estimatedMinutes,
    createdAt,
  };
}

export function restoreBaonPlan(value: unknown, course: Course): BaonPlan | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const plan = value as Partial<BaonPlan>;
  if (
    plan.version !== 1 ||
    plan.courseId !== course.id ||
    !Array.isArray(plan.stepIds) ||
    plan.stepIds.some((id) => typeof id !== "string") ||
    typeof plan.estimatedMinutes !== "number" ||
    typeof plan.createdAt !== "string"
  ) {
    return null;
  }
  const known = new Set(course.steps.map((step) => step.id));
  if (plan.stepIds.some((id) => !known.has(id))) return null;
  return plan as BaonPlan;
}
