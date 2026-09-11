import type { TestSpec } from "./lesson-ir";
import type { SqlRunResult } from "./sql-runner";
import type { TestResult } from "./grading";

// Pure SQL result assertions shared by browser grading and the Node content gate.
// Type-only imports keep the browser runners out of the Node execution path.
function show(v: unknown): string {
  if (typeof v === "string") return `"${v}"`;
  if (v === undefined) return "undefined";
  if (v === null) return "null";
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

function same(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

export const SQL_KINDS = new Set([
  "sql-runs",
  "sql-rows-equal",
  "sql-row-contains",
  "sql-row-count",
  "sql-columns-equal",
  "sql-value-equals",
  "sql-table-exists",
  "sql-table-columns",
]);

export type SqlTestSpec = Extract<TestSpec, { kind: `sql-${string}` }>;

/** Renders one result row the way the learner sees it in the results table. */
function showRow(row: unknown[]): string {
  return `(${row.map(show).join(", ")})`;
}

function sameRow(a: unknown[], b: unknown[]): boolean {
  return a.length === b.length && a.every((cell, i) => same(cell, b[i]));
}

/**
 * Reports one SQL assertion.
 *
 * The messages name what came back rather than only what was wanted, because
 * "you got 4 rows, the question asks for 3" is the sentence that actually
 * teaches a learner to re-read their WHERE clause.
 */
export function runSqlTest(spec: SqlTestSpec, run: SqlRunResult): TestResult {
  const fail = (message: string): TestResult => ({
    id: spec.id,
    label: spec.label,
    status: "failed",
    message,
  });
  const pass = (): TestResult => ({ id: spec.id, label: spec.label, status: "passed" });

  // An authoring bug, not a learner mistake. Say so plainly rather than
  // blaming the query.
  if (run.seedError) {
    return fail(`This lesson's starting data could not be built: ${run.seedError}`);
  }
  if (run.timedOut) {
    return fail(run.error ?? "Your query did not finish.");
  }
  if (run.error) {
    return fail(`The database rejected your SQL: ${run.error}`);
  }

  if (spec.kind === "sql-runs") return pass();

  if (spec.kind === "sql-table-exists") {
    return run.tables.includes(spec.table)
      ? pass()
      : fail(
          run.tables.length
            ? `There is no table called ${spec.table}. The database has: ${run.tables.join(", ")}.`
            : `There is no table called ${spec.table}. The database has no tables yet.`,
        );
  }

  if (spec.kind === "sql-table-columns") {
    const got = run.schema[spec.table];
    if (!got) {
      return fail(
        run.tables.length
          ? `There is no table called ${spec.table}. The database has: ${run.tables.join(", ")}.`
          : `There is no table called ${spec.table}. The database has no tables yet.`,
      );
    }
    const ok = got.length === spec.columns.length && got.every((c, i) => c === spec.columns[i]);
    return ok
      ? pass()
      : fail(
          `${spec.table} should have the columns ${spec.columns.join(", ")}, ` +
            `but it has ${got.length ? got.join(", ") : "none"}.`,
        );
  }

  const result = run.results[spec.resultIndex ?? 0];
  if (!result) {
    return fail("Your SQL ran but returned no results. A SELECT is what produces rows.");
  }

  switch (spec.kind) {
    case "sql-row-count":
      return result.rows.length === spec.count
        ? pass()
        : fail(`Expected ${spec.count} row(s), but got ${result.rows.length}.`);

    case "sql-columns-equal": {
      const got = result.columns;
      const ok =
        got.length === spec.columns.length && got.every((c, i) => c === spec.columns[i]);
      return ok
        ? pass()
        : fail(`Expected the columns ${spec.columns.join(", ")}, but got ${got.join(", ")}.`);
    }

    case "sql-row-contains":
      return result.rows.some((row) => sameRow(row, spec.row))
        ? pass()
        : fail(`No row came back matching ${showRow(spec.row)}.`);

    case "sql-value-equals": {
      const row = result.rows[spec.row];
      if (!row) return fail(`Expected at least ${spec.row + 1} row(s), but got ${result.rows.length}.`);
      const cell = row[spec.column];
      return same(cell, spec.value)
        ? pass()
        : fail(`Expected ${show(spec.value)} there, but got ${show(cell)}.`);
    }

    case "sql-rows-equal": {
      if (result.rows.length !== spec.rows.length) {
        return fail(`Expected ${spec.rows.length} row(s), but got ${result.rows.length}.`);
      }
      if (spec.ignoreOrder) {
        const remaining = [...result.rows];
        for (const wanted of spec.rows) {
          const at = remaining.findIndex((row) => sameRow(row, wanted));
          if (at === -1) return fail(`No row came back matching ${showRow(wanted)}.`);
          remaining.splice(at, 1);
        }
        return pass();
      }
      for (let i = 0; i < spec.rows.length; i++) {
        if (!sameRow(result.rows[i], spec.rows[i])) {
          return fail(
            `Row ${i + 1} should be ${showRow(spec.rows[i])}, but it is ${showRow(result.rows[i])}. ` +
              `If the values are right but in the wrong places, the order is what needs fixing.`,
          );
        }
      }
      return pass();
    }
  }
}
