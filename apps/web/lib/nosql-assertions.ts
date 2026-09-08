import type { TestSpec } from "./lesson-ir";
import type { TestResult } from "./grading";
import type { NosqlRunResult } from "./nosql-store";

export const NOSQL_KINDS = new Set(["nosql-runs", "nosql-doc-count", "nosql-docs-equal", "nosql-doc-contains", "nosql-field-equals", "nosql-collection-exists"]);
export type NosqlTestSpec = Extract<TestSpec, { kind: `nosql-${string}` }>;

function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical((value as Record<string, unknown>)[key])}`).join(",")}}`;
  return JSON.stringify(value) ?? "undefined";
}

/** Plain-data checks shared by browser grading and the Node authoring gate. */
export function runNosqlTest(spec: NosqlTestSpec, run: NosqlRunResult): TestResult {
  const fail = (message: string): TestResult => ({ id: spec.id, label: spec.label, status: "failed", message });
  const pass = (): TestResult => ({ id: spec.id, label: spec.label, status: "passed" });
  if (run.seedError) return fail(`This lesson's starting data could not be built: ${run.seedError}`);
  if (run.timedOut) return fail(run.error ?? "Your query did not finish.");
  if (!run.ok || run.error) return fail(`The document store rejected your query: ${run.error ?? "Invalid query."}`);
  switch (spec.kind) {
    case "nosql-runs": return pass();
    case "nosql-collection-exists": return run.collections.includes(spec.collection) ? pass() : fail(`There is no collection called ${spec.collection}.`);
    case "nosql-doc-count": return run.documents.length === spec.count ? pass() : fail(`Expected ${spec.count} document(s), but got ${run.documents.length}.`);
    case "nosql-doc-contains": return run.documents.some((doc) => canonical(doc) === canonical(spec.document)) ? pass() : fail(`No document came back matching ${canonical(spec.document)}.`);
    case "nosql-field-equals": {
      const doc = run.documents[spec.document];
      if (!doc) return fail(`Expected at least ${spec.document + 1} document(s), but got ${run.documents.length}.`);
      const actual = Object.prototype.hasOwnProperty.call(doc, spec.field) ? doc[spec.field] : undefined;
      return canonical(actual) === canonical(spec.value) ? pass() : fail(`Expected ${canonical(spec.value)} in ${spec.field}, but got ${canonical(actual)}.`);
    }
    case "nosql-docs-equal": {
      const actual = run.documents.map(canonical), expected = spec.documents.map(canonical);
      if (spec.ignoreOrder) { actual.sort(); expected.sort(); }
      return canonical(actual) === canonical(expected) ? pass() : fail(`Expected ${canonical(spec.documents)}, but got ${canonical(run.documents)}.`);
    }
  }
}
