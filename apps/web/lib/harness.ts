import { checkShape } from "./content-shape";
import { curriculum } from "@/content/curriculum";
import { gradeStep } from "./grading";
import type { Course, Step } from "./lesson-ir";
import type { PracticeActivity } from "./practice-ir";

/**
 * The authoring harness.
 *
 * AI drafts steps; this decides whether a draft is allowed to ship. It runs in
 * the browser rather than in Node because the graders need a real document and
 * real computed styles, and because reusing the exact runtime code path is the
 * only way the harness result means anything.
 *
 * PLAN.md section 8.
 */

export type Severity = "error" | "warning";

export interface Finding {
  severity: Severity;
  rule: string;
  message: string;
}

export interface StepReport {
  courseId: string;
  stepId: string;
  index: number;
  findings: Finding[];
}

export function checkPracticeReference(activity: PracticeActivity): Finding[] {
  const course = curriculum.courses.find((item) => item.id === activity.sourceCourseId);
  if (!course) {
    return [{ severity: "error", rule: "practice-source", message: `Source course ${activity.sourceCourseId} does not exist.` }];
  }
  if (!course.projects.some((project) => project.id === activity.sourceProjectId)) {
    return [{ severity: "error", rule: "practice-source", message: `Source project ${activity.sourceProjectId} does not exist in ${course.id}.` }];
  }
  if (!["rebuild", "bug-clinic", "constraint", "remix", "capstone"].includes(activity.mode)) {
    return [{ severity: "error", rule: "practice-mode", message: "Practice mode is not in the closed mode union." }];
  }
  if (activity.mode === "remix") {
    const source = activity.sourceActivityId;
    if (!source || source === activity.id) {
      return [{ severity: "error", rule: "remix-source", message: "A remix needs a different source activity." }];
    }
  } else if (activity.sourceActivityId) {
    return [{ severity: "error", rule: "remix-source", message: "Only a remix may depend on a source activity." }];
  }
  if (activity.mode !== "capstone" && activity.requiresActivityIds?.length) {
    return [{ severity: "error", rule: "capstone-order", message: "Only a capstone may require earlier independent activities." }];
  }
  for (const constraint of activity.constraints ?? []) {
    const testIds = new Set(activity.tests.map((test) => test.id));
    if (constraint.testIds.length === 0 || constraint.testIds.some((id) => !testIds.has(id))) {
      return [{ severity: "error", rule: "constraint", message: `Constraint ${constraint.id} must point only to checks in this activity.` }];
    }
  }
  return [];
}

/**
 * The two checks that decide whether a step teaches anything.
 *
 * A step is only real if its tests fail before the learner acts and pass
 * after. Everything else in this file is hygiene; this is the substance.
 */
async function checkBehaviour(step: Step): Promise<Finding[]> {
  const out: Finding[] = [];

  try {
    const before = await gradeStep(step, step.files);
    if (before.every((r) => r.status === "passed")) {
      out.push({
        severity: "error",
        rule: "teaches-nothing",
        message:
          "Every test already passes on the starting code. The learner has nothing to do.",
      });
    }
  } catch (e) {
    out.push({
      severity: "error",
      rule: "grader",
      message: `Grading the starting code threw: ${String(e)}`,
    });
  }

  if (!step.solution) {
    out.push({
      severity: "warning",
      rule: "no-solution",
      message: "No solution supplied, so the tests were never proven passable.",
    });
    return out;
  }

  try {
    let after = await gradeStep(step, step.solution);
    let failed = after.filter((r) => r.status !== "passed");
    if (failed.length > 0) {
      // A full audit creates and destroys thousands of opaque runner frames.
      // Give the browser one cleanup window, then require the same solution to
      // prove itself again. A real content error still fails deterministically;
      // a one-frame lifecycle miss does not become a false curriculum error.
      await new Promise<void>((resolve) => setTimeout(resolve, 50));
      after = await gradeStep(step, step.solution);
      failed = after.filter((r) => r.status !== "passed");
    }
    if (failed.length > 0) {
      out.push({
        severity: "error",
        rule: "solution-fails",
        message: `The solution does not pass: ${failed.map((f) => f.id).join(", ")}`,
      });
    }
  } catch (e) {
    out.push({
      severity: "error",
      rule: "grader",
      message: `Grading the solution threw: ${String(e)}`,
    });
  }

  return out;
}

export async function validateCourse(
  course: Course,
  onStep?: (report: StepReport) => void,
  options?: { independent?: boolean },
): Promise<StepReport[]> {
  const reports: StepReport[] = [];
  for (const step of course.steps) {
    const findings = [...checkShape(step, options?.independent), ...(await checkBehaviour(step))];
    const report: StepReport = {
      courseId: course.id,
      stepId: step.id,
      index: step.index,
      findings,
    };
    reports.push(report);
    onStep?.(report);
  }
  return reports;
}

export function countBySeverity(reports: StepReport[]) {
  let errors = 0;
  let warnings = 0;
  for (const r of reports) {
    for (const f of r.findings) {
      if (f.severity === "error") errors++;
      else warnings++;
    }
  }
  return { errors, warnings };
}
