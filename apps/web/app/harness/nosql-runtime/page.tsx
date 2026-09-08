"use client";

import { useState } from "react";
import { Preview } from "@/components/preview";
import { gradeStep } from "@/lib/grading";
import { runLearnerNosql } from "@/lib/nosql-runner";
import type { Step } from "@/lib/lesson-ir";

const seed = { stock: [{ name: "Rice", price: 55 }, { name: "Egg", price: 8 }] };
const start = '{"collection":"stock","operation":"find"}';
const solution = '{"collection":"stock","operation":"find","filter":{"price":{"$lt":10}}}';
const step: Step = {
  id: "nosql-runtime-probe", index: 1, kind: "nosql", inputMode: "free", projectId: "runtime",
  task: "Keep only items priced below 10.", activeFile: "query.json", files: { "query.json": start },
  solution: { "query.json": solution }, nosqlSeed: seed, xp: 0, estimatedMinutes: 3,
  hints: [{ level: 1, text: "Compare the prices before choosing a filter." }],
  tests: [{ id: "docs", label: "Only the egg is returned", kind: "nosql-docs-equal", documents: [{ name: "Egg", price: 8 }] }],
};

export default function NosqlRuntimeHarness() {
  const [query, setQuery] = useState(start);
  const [checks, setChecks] = useState<{ name: string; passed: boolean }[]>([]);
  async function run() {
    const before = await gradeStep(step, step.files);
    const after = await gradeStep(step, step.solution!);
    const invalid = await runLearnerNosql(seed, "not JSON");
    const insert = await runLearnerNosql(seed, '{"collection":"stock","operation":"insert","documents":[{"name":"Milk","price":30}]}');
    const reset = await runLearnerNosql(seed, start);
    const injection = await runLearnerNosql(seed, '{"collection":"stock","operation":"find","filter":{"$where":"parent.document.body.innerHTML = 1"}}');
    const next = [
      { name: "Starting code fails", passed: before.some(test => test.status === "failed") },
      { name: "Solution passes", passed: after.every(test => test.status === "passed") },
      { name: "Malformed JSON rejected", passed: !invalid.ok && Boolean(invalid.error) },
      { name: "Insert succeeds", passed: insert.ok },
      { name: "Store resets between runs", passed: reset.documents.length === 2 },
      { name: "Executable filter rejected", passed: !injection.ok },
      { name: "Runner frames removed", passed: document.querySelectorAll("iframe").length === 0 },
    ];
    setChecks(next);
  }
  return <main className="mx-auto max-w-3xl p-5">
    <h1 className="text-2xl">NoSQL runtime checks</h1>
    <button className="my-4 rounded border p-3" onClick={() => void run()}>Run runtime checks</button>
    <ul data-runtime-results={JSON.stringify(checks)}>{checks.map(check => <li key={check.name}>{check.passed ? "✓ Pass" : "✕ Fail"}: {check.name}</li>)}</ul>
    <label className="block">JSON command<textarea aria-label="JSON command" className="my-3 min-h-28 w-full border p-2 font-mono" value={query} onChange={event => setQuery(event.target.value)} /></label>
    <div className="min-h-64"><Preview files={{ "query.json": query }} kind="nosql" nosqlSeed={seed} flash="none" /></div>
  </main>;
}
