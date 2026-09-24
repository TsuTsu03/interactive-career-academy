import type { Step } from "./lesson-ir";
import type { TestResult } from "./grading";

/**
 * Reads a report pasted from the downloadable local checker.
 *
 * Nothing runs here. The report is plain text the learner copied from their
 * own terminal, so this parser is strict about shape and trusts nothing about
 * honesty: a report that parses is still only a result the learner reports.
 * The workspace never turns it into XP, completion, evidence, or certificate
 * credit. V2_RUNNER_DESIGN.md, contract item 6.
 *
 * The markers and version must match `tools/local-checker.mjs`; the content
 * gate compares them.
 */

export const LOCAL_CHECKER_VERSION = 1;
export const LOCAL_REPORT_START = "----- CODEDADDY REPORT START -----";
export const LOCAL_REPORT_END = "----- CODEDADDY REPORT END -----";

const MAX_REPORT_CHARS = 20000;

export type LocalReportResult =
  | { ok: true; checks: Map<string, boolean> }
  | { ok: false; message: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function hasOnlyKeys(value: Record<string, unknown>, keys: string[]): boolean {
  return Object.keys(value).every((key) => keys.includes(key));
}

export function parseLocalReport(text: string, courseId: string, step: Step): LocalReportResult {
  if (text.length > MAX_REPORT_CHARS) {
    return { ok: false, message: "That paste is much longer than a checker report. Paste only the lines from START to END." };
  }
  const start = text.indexOf(LOCAL_REPORT_START);
  const end = text.indexOf(LOCAL_REPORT_END);
  if (start === -1 || end === -1 || end < start) {
    return { ok: false, message: "No checker report found yet. Run the check command in your terminal, then paste everything from the START line to the END line." };
  }
  if (text.indexOf(LOCAL_REPORT_START, start + 1) !== -1) {
    return { ok: false, message: "The paste holds more than one report. Keep only the newest one." };
  }

  let body: unknown;
  try {
    body = JSON.parse(text.slice(start + LOCAL_REPORT_START.length, end).trim());
  } catch {
    return { ok: false, message: "The report was cut off or changed while copying. Run the check command again and copy the whole report." };
  }

  if (!isRecord(body) || !hasOnlyKeys(body, ["v", "checker", "course", "step", "checks"])) {
    return { ok: false, message: "That report does not have the shape this page expects. Run the check command again and paste the new report." };
  }
  if (body.v !== LOCAL_CHECKER_VERSION || body.checker !== LOCAL_CHECKER_VERSION) {
    return { ok: false, message: "That report came from a different checker version. Download the checker again from this page, then rerun the check." };
  }
  if (body.course !== courseId || body.step !== step.id) {
    return { ok: false, message: `That report is for a different step. Run the check command shown for this step: ${step.id}.` };
  }
  if (!Array.isArray(body.checks) || body.checks.length !== step.tests.length) {
    return { ok: false, message: "That report does not list this step's checks. Download the checker again, then rerun the check." };
  }

  const expected = new Set(step.tests.map((test) => test.id));
  const checks = new Map<string, boolean>();
  for (const entry of body.checks) {
    if (!isRecord(entry) || !hasOnlyKeys(entry, ["id", "pass"]) || typeof entry.id !== "string" || typeof entry.pass !== "boolean") {
      return { ok: false, message: "One line of the report is damaged. Run the check command again and paste the new report." };
    }
    if (!expected.has(entry.id) || checks.has(entry.id)) {
      return { ok: false, message: "That report does not list this step's checks. Download the checker again, then rerun the check." };
    }
    checks.set(entry.id, entry.pass);
  }
  return { ok: true, checks };
}

/** Turns a pasted report into rows for the workspace's results list. */
export function gradeLocalReport(step: Step, courseId: string, report: string): TestResult[] {
  const parsed = parseLocalReport(report, courseId, step);
  return step.tests.map((test) => {
    if (!parsed.ok) return { id: test.id, label: test.label, status: "failed" as const, message: parsed.message };
    return parsed.checks.get(test.id)
      ? { id: test.id, label: test.label, status: "passed" as const }
      : {
          id: test.id,
          label: test.label,
          status: "failed" as const,
          message: "Your checker reported this as not done yet. Read the FAIL line in your terminal, fix it, run the check again, and paste the new report.",
        };
  });
}
