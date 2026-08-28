"use client";

import { useState } from "react";

import {
  runLearnerReact,
  type ReactRunResult,
  type ReactTestSpec,
} from "@/lib/react-runner";

interface DiagnosticResult {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
}

const headingCheck: ReactTestSpec = {
  id: "jsx-heading",
  label: "The heading shows Kumusta, React!",
  kind: "react-text-equals",
  selector: "h1",
  value: "Kumusta, React!",
};

function passedCheck(result: ReactRunResult): boolean {
  return result.ok && result.checks.length === 1 && result.checks[0]?.passed === true;
}

export default function ReactRuntimeHarnessPage() {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [running, setRunning] = useState(false);

  async function runDiagnostics() {
    setRunning(true);
    setResults([]);

    const valid = await runLearnerReact(
      'function App() { return <h1 className="greeting">Kumusta, React!</h1>; }',
      [headingCheck],
    );
    const validTsx = await runLearnerReact(
      'interface GreetingProps { place: string } function Greeting({ place }: GreetingProps) { return <h1>Kumusta, {place}!</h1>; } function App(): React.ReactNode { return <Greeting place="React" />; }',
      [headingCheck],
      { typescript: true },
    );
    const invalid = await runLearnerReact(
      "function App() { return <h1>Kumusta, React!; }",
      [headingCheck],
    );
    const timedOut = await runLearnerReact("function App() { return null; }", [headingCheck], {
      runtimeSource: "",
      timeoutMs: 100,
    });
    const recovered = await runLearnerReact(
      "function App() { const place = 'React'; return <h1>Kumusta, {place}!</h1>; }",
      [headingCheck],
    );

    const nextResults: DiagnosticResult[] = [
      {
        id: "valid-jsx",
        label: "Valid JSX compiles and renders",
        passed: passedCheck(valid),
        detail: valid.error ?? valid.checks[0]?.actual ?? "Rendered the expected heading.",
      },
      {
        id: "valid-tsx",
        label: "TypeScript and JSX compile and render together",
        passed: passedCheck(validTsx),
        detail: validTsx.error ?? validTsx.checks[0]?.actual ?? "Rendered the typed component.",
      },
      {
        id: "invalid-jsx",
        label: "Malformed JSX returns an error",
        passed: !invalid.ok && Boolean(invalid.error),
        detail: invalid.error ?? "The malformed JSX was accepted.",
      },
      {
        id: "timeout",
        label: "An unresponsive runner times out and is removed",
        passed: timedOut.timedOut === true && timedOut.error === "Your component did not finish rendering.",
        detail: timedOut.error ?? "The unresponsive runner did not time out.",
      },
      {
        id: "recovery",
        label: "A later valid run still works",
        passed: passedCheck(recovered),
        detail: recovered.error ?? recovered.checks[0]?.actual ?? "Recovered successfully.",
      },
    ];

    setResults(nextResults);
    setRunning(false);

    Object.assign(window, {
      __reactRuntimeHarness: {
        done: true,
        passed: nextResults.every((result) => result.passed),
        results: nextResults,
      },
    });
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">React runtime diagnostic</h1>
      <p className="mt-3 text-slate-600">
        This internal page checks JSX and TypeScript compilation, errors, timeouts, and recovery in the secure runner.
      </p>
      <button
        className="mt-6 rounded bg-slate-900 px-4 py-2 font-semibold text-white disabled:opacity-60"
        disabled={running}
        onClick={runDiagnostics}
        type="button"
      >
        {running ? "Running checks…" : "Run checks"}
      </button>

      <ul className="mt-8 space-y-3" aria-live="polite">
        {results.map((result) => (
          <li className="rounded border border-slate-200 p-4" key={result.id}>
            <p className="font-semibold">
              <span aria-hidden="true">{result.passed ? "✓" : "✕"}</span>{" "}
              {result.passed ? "Pass" : "Fail"}: {result.label}
            </p>
            <p className="mt-1 text-sm text-slate-600">{result.detail}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
