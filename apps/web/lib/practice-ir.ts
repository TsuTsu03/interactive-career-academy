import type { Copy, Step } from "@/lib/lesson-ir";

export type PracticeMode = "rebuild" | "bug-clinic" | "constraint" | "remix" | "capstone";

export interface ConstraintSpec {
  id: string;
  label: Copy;
  description: Copy;
  testIds: string[];
}

export interface PracticeActivity extends Step {
  mode: PracticeMode;
  title: Copy;
  summary: Copy;
  sourceCourseId: string;
  sourceProjectId: string;
  sourceActivityId?: string;
  requiresActivityIds?: string[];
  constraints?: ConstraintSpec[];
}
