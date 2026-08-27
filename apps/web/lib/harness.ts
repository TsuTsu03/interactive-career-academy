import { conceptById } from "@/content/concepts";
import { gradeStep } from "./grading";
import type { Concept, Course, Step } from "./lesson-ir";

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

/** Structural checks that need no execution. */
function checkShape(step: Step): Finding[] {
  const out: Finding[] = [];
  const err = (rule: string, message: string) =>
    out.push({ severity: "error", rule, message });
  const warn = (rule: string, message: string) =>
    out.push({ severity: "warning", rule, message });

  // One patient teaching voice, everywhere. The harness intentionally does
  // not impose a short-sentence limit: explanations need enough room to tell
  // a beginner what to inspect and what to try next.
  const learnerCopy: [string, string][] = [
    ["task", step.task],
    ...step.tests.map((t) => [`test:${t.id}`, t.label] as [string, typeof t.label]),
    ...step.hints.map((h) => [`hint:${h.level}`, h.text] as [string, typeof h.text]),
  ];

  for (const [where, text] of learnerCopy) {
    if (!text?.trim()) err("learner-copy", `${where} has no learner-facing text.`);
  }

  if (step.tests.length === 0) err("tests", "Step has no tests.");
  if (step.hints.length === 0) warn("hints", "Step has no hints.");

  // A level-1 hint that contains the answer is not a hint.
  const first = step.hints.find((h) => h.level === 1);
  if (first && step.highlightToken && first.text.includes(step.highlightToken)) {
    warn("hint-spoiler", "Level 1 hint contains the token the learner must change.");
  }

  // Learner time budget: 3-5 min for an easy step, 5-10 for a hard one.
  // PLAN.md section 3, decision 21.
  if (!step.estimatedMinutes) warn("estimate", "No estimatedMinutes.");
  if (step.estimatedMinutes && step.estimatedMinutes > 10) {
    err("estimate", `${step.estimatedMinutes} min exceeds the 10 min hard cap for one step.`);
  } else if (step.estimatedMinutes && step.estimatedMinutes > 8) {
    warn("estimate", `${step.estimatedMinutes} min is long; keep hard steps to 5-10 min.`);
  }

  if (step.inputMode === "tap-to-build") {
    if (!step.blocks?.length) err("blocks", "tap-to-build step has no blocks.");
    if (!step.correctBlock) err("blocks", "tap-to-build step has no correctBlock.");
    if (step.correctBlock && !step.blocks?.includes(step.correctBlock)) {
      err("blocks", "correctBlock is not one of the blocks offered.");
    }
    if (!step.slotLine) warn("blocks", "tap-to-build step has no slotLine.");
  }

  if (!step.projectId) err("project", "Step has no projectId.");

  for (const id of step.conceptIds ?? []) {
    const concept = conceptById(id);
    if (!concept) {
      err("concept", `conceptIds includes "${id}", which is not in content/concepts.ts.`);
      continue;
    }
    out.push(...checkConcept(concept));
  }

  out.push(...checkGranularity(step));

  return out;
}

/**
 * Counts how many lines differ between the starting code and the solution,
 * per file. A rough measure, not a real diff: good enough to catch a step
 * that bundles several changes, which is the failure mode that matters.
 */
function lineDiffCount(a: string, b: string): number {
  const linesA = a.split("\n");
  const linesB = b.split("\n");
  const previous = Array.from({ length: linesB.length + 1 }, (_, index) => index);

  for (let row = 1; row <= linesA.length; row++) {
    const current = [row];
    for (let column = 1; column <= linesB.length; column++) {
      const substitution = previous[column - 1] + (linesA[row - 1] === linesB[column - 1] ? 0 : 1);
      const deletion = previous[column] + 1;
      const insertion = current[column - 1] + 1;
      current[column] = Math.min(substitution, deletion, insertion);
    }
    previous.splice(0, previous.length, ...current);
  }

  return previous[linesB.length];
}

function solutionDiffLines(step: Step): number {
  if (!step.solution) return 0;
  const names = new Set([...Object.keys(step.files), ...Object.keys(step.solution)]);
  let total = 0;
  for (const name of names) {
    total += lineDiffCount(step.files[name] ?? "", step.solution[name] ?? "");
  }
  return total;
}

/**
 * One idea per step, mechanically. Decision 19's entire "2x depth" claim
 * rests on finer granularity rather than padding — an AI drafter told to
 * make more steps will pad unless something machine-checkable stops it.
 * PLAN.md section 3, decision 27.
 */
function checkGranularity(step: Step): Finding[] {
  const out: Finding[] = [];
  const warn = (message: string) => out.push({ severity: "warning", rule: "granularity", message });
  const err = (message: string) => out.push({ severity: "error", rule: "granularity", message });

  const diffLines = solutionDiffLines(step);
  if (step.solution) {
    if (step.inputMode === "tap-to-build" && diffLines > 1) {
      err(
        `tap-to-build step changes ${diffLines} lines between start and solution; a single tapped block should change exactly 1.`,
      );
    } else if (step.inputMode !== "tap-to-build" && diffLines > 3) {
      warn(
        `Solution differs from the starting code by ${diffLines} lines. One idea per step should need at most 3.`,
      );
    }
  }

  const newConcepts = step.conceptIds?.length ?? 0;
  if (newConcepts > 1) {
    warn(`Step introduces ${newConcepts} new concepts; at most 1 keeps one idea per step.`);
  }

  if (step.tests.length > 2) {
    warn(
      `Step has ${step.tests.length} tests. 1-2 asserting new behaviour keeps one idea per step.`,
    );
  }

  return out;
}

/** All four representations, or it does not ship. */
function checkConcept(c: Concept): Finding[] {
  const out: Finding[] = [];
  const err = (message: string) =>
    out.push({ severity: "error", rule: "concept", message });

  if (!c.definition.trim()) err(`Concept "${c.term}" has no definition.`);
  if (!c.analogy.trim()) err(`Concept "${c.term}" has no analogy.`);
  if (!c.proof.trim()) err(`Concept "${c.term}" has no proof.`);

  if (c.visual.kind === "diagram") {
    if (!c.visual.diagram.alt.trim()) {
      err(`Concept "${c.term}" diagram has no alt text.`);
    }
    if (c.visual.diagram.nodes.length === 0) {
      err(`Concept "${c.term}" diagram has no nodes.`);
    }
    const ids = new Set(c.visual.diagram.nodes.map((n) => n.id));
    for (const a of c.visual.diagram.arrows) {
      if (!ids.has(a.from) || !ids.has(a.to)) {
        err(`Concept "${c.term}" diagram has an arrow pointing at a missing node.`);
      }
    }
  } else {
    if (Object.keys(c.visual.files).length === 0) {
      err(`Concept "${c.term}" live demo has no files.`);
    }
    if (!c.visual.caption.trim()) {
      err(`Concept "${c.term}" live demo has no caption.`);
    }
  }

  return out;
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
    const after = await gradeStep(step, step.solution);
    const failed = after.filter((r) => r.status !== "passed");
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
): Promise<StepReport[]> {
  const reports: StepReport[] = [];
  for (const step of course.steps) {
    const findings = [...checkShape(step), ...(await checkBehaviour(step))];
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
