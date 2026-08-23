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

const MAX_SIMPLE_SENTENCE_WORDS = 14;

function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function words(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/** Structural checks that need no execution. */
function checkShape(step: Step): Finding[] {
  const out: Finding[] = [];
  const err = (rule: string, message: string) =>
    out.push({ severity: "error", rule, message });
  const warn = (rule: string, message: string) =>
    out.push({ severity: "warning", rule, message });

  // Both registers, everywhere.
  const pairs: [string, { simple: string; standard: string }][] = [
    ["task", step.task],
    ...step.tests.map((t) => [`test:${t.id}`, t.label] as [string, typeof t.label]),
    ...step.hints.map((h) => [`hint:${h.level}`, h.text] as [string, typeof h.text]),
  ];

  for (const [where, copy] of pairs) {
    if (!copy.simple?.trim()) err("register", `${where} has no Simple text.`);
    if (!copy.standard?.trim()) err("register", `${where} has no Standard text.`);
    if (copy.simple && copy.simple === copy.standard) {
      warn("register", `${where} has identical Simple and Standard text.`);
    }
  }

  // Simple register is for someone with no technical background.
  for (const s of sentences(step.task.simple)) {
    if (words(s) > MAX_SIMPLE_SENTENCE_WORDS) {
      warn(
        "simple-length",
        `Simple task sentence is ${words(s)} words: "${s.slice(0, 60)}…"`,
      );
    }
  }

  if (step.tests.length === 0) err("tests", "Step has no tests.");
  if (step.hints.length === 0) warn("hints", "Step has no hints.");

  // A level-1 hint that contains the answer is not a hint.
  const first = step.hints.find((h) => h.level === 1);
  if (first && step.highlightToken && first.text.simple.includes(step.highlightToken)) {
    warn("hint-spoiler", "Level 1 hint contains the token the learner must change.");
  }

  if (!step.estimatedMinutes) warn("estimate", "No estimatedMinutes.");
  if (step.estimatedMinutes && step.estimatedMinutes > 15) {
    warn("estimate", `${step.estimatedMinutes} min is too long for one step.`);
  }

  if (step.inputMode === "tap-to-build") {
    if (!step.blocks?.length) err("blocks", "tap-to-build step has no blocks.");
    if (!step.correctBlock) err("blocks", "tap-to-build step has no correctBlock.");
    if (step.correctBlock && !step.blocks?.includes(step.correctBlock)) {
      err("blocks", "correctBlock is not one of the blocks offered.");
    }
    if (!step.slotLine) warn("blocks", "tap-to-build step has no slotLine.");
  }

  for (const c of step.concepts ?? []) out.push(...checkConcept(c));

  return out;
}

/** All four representations, or it does not ship. */
function checkConcept(c: Concept): Finding[] {
  const out: Finding[] = [];
  const err = (message: string) =>
    out.push({ severity: "error", rule: "concept", message });

  if (!c.definition.simple?.trim()) err(`Concept "${c.term}" has no definition.`);
  if (!c.analogy.simple?.trim()) err(`Concept "${c.term}" has no analogy.`);
  if (!c.proof.simple?.trim()) err(`Concept "${c.term}" has no proof.`);

  if (c.visual.kind === "diagram") {
    if (!c.visual.diagram.alt.simple?.trim()) {
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
    if (!c.visual.caption.simple?.trim()) {
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
