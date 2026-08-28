"use client";

import { useCallback, useState } from "react";
import { curriculum } from "@/content/curriculum";
import { practiceActivities, practiceCourse } from "@/content/practice-activities";
import { capstoneCourse, capstones } from "@/content/capstones";
import { checkPracticeReference, countBySeverity, validateCourse, type StepReport } from "@/lib/harness";

/**
 * Runs the authoring harness against every course and shows what failed.
 *
 * This is the gate for AI-drafted content. It runs in the browser because the
 * graders need a real document and real computed styles, and because reusing
 * the exact runtime code path is the only way the result means anything.
 */
export function HarnessRunner() {
  const [reports, setReports] = useState<StepReport[] | null>(null);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState("");

  const run = useCallback(async () => {
    setRunning(true);
    setReports(null);
    const all: StepReport[] = [];
    const requestedCourse = new URLSearchParams(window.location.search).get("course");
    const allCourses = [...curriculum.courses, practiceCourse, capstoneCourse];
    const courses = requestedCourse
      ? allCourses.filter((course) => course.id === requestedCourse)
      : allCourses;
    if (requestedCourse && courses.length === 0) {
      const invalidFilter: StepReport = {
        courseId: requestedCourse,
        stepId: "invalid-course-filter",
        index: 0,
        findings: [
          {
            severity: "error",
            rule: "course-filter",
            message: `No course has the id ${requestedCourse}.`,
          },
        ],
      };
      all.push(invalidFilter);
      (window as unknown as { __harness?: StepReport[] }).__harness = all;
    }
    for (const course of courses) {
      setProgress(`Checking ${course.title}…`);
      // Parked on window as each step finishes, so the result survives a
      // starved renderer and so a hang is visible at the step that caused it.
      // That is how this page is usually driven during development.
      const independentActivities = [...practiceActivities, ...capstones];
      await validateCourse(course, (report) => {
        if (course.id === practiceCourse.id || course.id === capstoneCourse.id) {
          const activity = independentActivities.find((item) => item.id === report.stepId);
          if (activity) {
            report.findings.push(...checkPracticeReference(activity));
            if (activity.sourceActivityId && !independentActivities.some((item) => item.id === activity.sourceActivityId)) {
              report.findings.push({ severity: "error", rule: "remix-source", message: `Source activity ${activity.sourceActivityId} does not exist.` });
            }
            for (const requiredId of activity.requiresActivityIds ?? []) {
              if (!independentActivities.some((item) => item.id === requiredId)) report.findings.push({ severity: "error", rule: "capstone-order", message: `Required activity ${requiredId} does not exist.` });
            }
          }
        }
        all.push(report);
        (window as unknown as { __harness?: StepReport[] }).__harness = all;
      }, { independent: course.id === capstoneCourse.id });
    }
    setReports(all);
    setProgress("");
    setRunning(false);
  }, []);

  const counts = reports ? countBySeverity(reports) : null;
  const problems = reports?.filter((r) => r.findings.length > 0) ?? [];

  return (
    <main
      className="mx-auto min-h-[100dvh] max-w-[1000px] px-6 py-12"
      data-course-ids={[...curriculum.courses, practiceCourse, capstoneCourse].map((course) => course.id).join(",")}
    >
      <h1 className="font-display text-[34px] font-bold tracking-tight text-chalk">
        Authoring harness
      </h1>
      <p className="mt-2 max-w-[65ch] text-[15px] leading-relaxed text-ash">
        Every step is checked twice for the thing that matters: the tests must{" "}
        <strong className="text-chalk">fail</strong> on the starting code, and{" "}
        <strong className="text-chalk">pass</strong> on the solution. A step that
        already passes before the learner acts teaches nothing.
      </p>

      <button
        type="button"
        onClick={() => void run()}
        disabled={running}
        className="glow-voltage mt-6 rounded-lg bg-voltage px-6 py-3 font-bold text-void transition-transform active:scale-[0.98] disabled:opacity-60"
      >
        {running ? "Checking…" : "Run checks"}
      </button>

      {progress ? <p className="mt-4 font-mono text-[13px] text-ash">{progress}</p> : null}

      {counts ? (
        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-5 rounded-lg border border-hairline bg-panel px-4 py-3">
            <Stat label="Steps" value={reports?.length ?? 0} tone="text-chalk" />
            <Stat label="Errors" value={counts.errors} tone="text-strike" />
            <Stat label="Warnings" value={counts.warnings} tone="text-gold" />
            <span className="ml-auto font-mono text-[13px] text-ash">
              {counts.errors === 0 ? "No blocking problems" : "Blocking problems found"}
            </span>
          </div>

          {problems.length === 0 ? (
            <p className="mt-6 text-[15px] text-acid">Every step passed every check.</p>
          ) : (
            <ul className="mt-6 space-y-3">
              {problems.map((r) => (
                <li
                  key={`${r.courseId}/${r.stepId}`}
                  className="rounded-lg border border-hairline bg-panel p-4"
                >
                  <div className="mb-2 font-mono text-[12px] text-ash">
                    {r.courseId} · step {r.index} · {r.stepId}
                  </div>
                  <ul className="space-y-1.5">
                    {r.findings.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-[14px]">
                        <span
                          className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] uppercase ${
                            f.severity === "error"
                              ? "bg-strike/15 text-strike"
                              : "bg-gold/15 text-gold"
                          }`}
                        >
                          {f.rule}
                        </span>
                        <span className="text-ash">{f.message}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </main>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div>
      <div className={`tnum font-mono text-[20px] font-bold ${tone}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-ash">{label}</div>
    </div>
  );
}
