import { curriculum } from "@/content/curriculum";
import { conceptById } from "@/content/concepts";
import { practiceActivities } from "@/content/practice-activities";
import { capstones } from "@/content/capstones";
import { loadPracticeState } from "@/lib/practice-progress";
import type { PracticeMode } from "@/lib/practice-ir";
import { courseSessionSnapshotFromStorage, courseStorageKey } from "@/lib/progress";
import { restoreSubmissionDraft, validateLiveUrl, validateRepositoryUrl } from "@/lib/submission";

export interface EvidenceCheck {
  id: string;
  label: string;
}

export interface EvidenceProject {
  id: string;
  title: string;
  courseId: string;
  complete: boolean;
  completedSteps: number;
  totalSteps: number;
  checks: EvidenceCheck[];
  concepts: { id: string; term: string }[];
}

export interface EvidenceCourse {
  id: string;
  title: string;
  completedSteps: number;
  totalSteps: number;
  projects: EvidenceProject[];
  artifact: { repositoryUrl: string; liveUrl: string } | null;
}

export interface PracticeEvidence {
  id: string;
  mode: PracticeMode;
  title: string;
  checks: EvidenceCheck[];
}

export interface EvidenceLedger {
  courses: EvidenceCourse[];
  practice: PracticeEvidence[];
  totals: {
    completedSteps: number;
    passedChecks: number;
    completedProjects: number;
    completedPractice: number;
    completedCapstones: number;
  };
}

export function deriveEvidenceLedger(): EvidenceLedger {
  const independentActivities = [...practiceActivities, ...capstones];
  const courses: EvidenceCourse[] = [];
  for (const course of curriculum.courses) {
    const snapshot = courseSessionSnapshotFromStorage(
      course,
      localStorage.getItem(courseStorageKey(course.id)),
    );
    const completed = new Set(snapshot?.completedStepIds ?? []);
    const draft = restoreSubmissionDraft(snapshot?.record.submissionDraft);
    const artifact = validateRepositoryUrl(draft.repositoryUrl) === null && validateLiveUrl(draft.liveUrl) === null
      ? draft
      : null;
    const projects = course.projects.flatMap((project) => {
      const steps = course.steps.filter((step) => step.projectId === project.id);
      const completedSteps = steps.filter((step) => completed.has(step.id));
      if (completedSteps.length === 0) return [];
      const conceptIds = [...new Set(completedSteps.flatMap((step) => step.conceptIds ?? []))];
      return [{
        id: project.id,
        title: project.title,
        courseId: course.id,
        complete: completedSteps.length === steps.length,
        completedSteps: completedSteps.length,
        totalSteps: steps.length,
        checks: completedSteps.flatMap((step) => step.tests.map((test) => ({ id: test.id, label: test.label }))),
        concepts: conceptIds.flatMap((id) => {
          const concept = conceptById(id);
          return concept ? [{ id, term: concept.term }] : [];
        }),
      }];
    });
    if (completed.size > 0) {
      courses.push({
        id: course.id,
        title: course.title,
        completedSteps: completed.size,
        totalSteps: course.steps.length,
        projects,
        artifact,
      });
    }
  }

  const practiceState = loadPracticeState();
  const practice = practiceState.completions.flatMap((completion) => {
    const activity = independentActivities.find((item) => item.id === completion.activityId);
    if (!activity) return [];
    const passed = new Set(completion.passedTestIds);
    if (!activity.tests.every((test) => passed.has(test.id))) return [];
    return [{
      id: activity.id,
      mode: activity.mode,
      title: activity.title,
      checks: activity.tests.map((test) => ({ id: test.id, label: test.label })),
    }];
  });

  const allProjects = courses.flatMap((course) => course.projects);
  return {
    courses,
    practice,
    totals: {
      completedSteps: courses.reduce((sum, course) => sum + course.completedSteps, 0),
      passedChecks: allProjects.reduce((sum, project) => sum + project.checks.length, 0) + practice.reduce((sum, item) => sum + item.checks.length, 0),
      completedProjects: allProjects.filter((project) => project.complete).length,
      completedPractice: practice.filter((item) => item.mode !== "capstone").length,
      completedCapstones: practice.filter((item) => item.mode === "capstone").length,
    },
  };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

export function buildProofDocument(ledger: EvidenceLedger, generatedAt: string): string {
  const courseSections = ledger.courses.map((course) => `
    <section>
      <h2>${escapeHtml(course.title)}</h2>
      <p>${course.completedSteps} of ${course.totalSteps} guided steps completed.</p>
      ${course.artifact ? `<p><a href="${escapeHtml(course.artifact.liveUrl)}">Live project</a> · <a href="${escapeHtml(course.artifact.repositoryUrl)}">Source repository</a></p>` : ""}
      ${course.projects.map((project) => `
        <details>
          <summary>${escapeHtml(project.title)} — ${project.complete ? "complete" : `${project.completedSteps} of ${project.totalSteps} steps`}</summary>
          ${project.concepts.length ? `<p><strong>Concepts:</strong> ${project.concepts.map((concept) => escapeHtml(concept.term)).join(", ")}</p>` : ""}
          <ul>${project.checks.map((check) => `<li>✓ ${escapeHtml(check.label)}</li>`).join("")}</ul>
        </details>`).join("")}
    </section>`).join("");
  const practice = ledger.practice.length ? `<section><h2>Independent practice and capstones</h2><ul>${ledger.practice.map((item) => `<li><strong>${escapeHtml(item.title)}</strong> (${item.mode === "rebuild" ? "Rebuild Mode" : item.mode === "bug-clinic" ? "Bug Clinic" : item.mode === "constraint" ? "Constraint Mission" : item.mode === "remix" ? "Project Remix" : "Capstone"}) — ${item.checks.length} checks passed</li>`).join("")}</ul></section>` : "";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CodeDaddy Learning Proof</title><style>
  :root{color-scheme:light}*{box-sizing:border-box}body{margin:0;background:#f5f7fb;color:#172033;font:16px/1.6 system-ui,sans-serif}main{max-width:860px;margin:auto;padding:48px 20px}header,section{background:white;border:1px solid #d8deea;padding:24px;margin-bottom:16px}h1,h2{line-height:1.2}h1{font-size:clamp(2rem,7vw,3.5rem);margin:.25rem 0}h2{font-size:1.35rem}p,li{max-width:70ch}a{color:#174ea6}summary{cursor:pointer;font-weight:700;padding:8px 0}.notice{border-left:5px solid #f3b61f}.stats{display:flex;flex-wrap:wrap;gap:12px}.stats span{border:1px solid #d8deea;padding:8px 12px;font-weight:700}@media(max-width:480px){main{padding:20px 12px}header,section{padding:18px}}</style></head><body><main>
  <header><p>CodeDaddy browser-generated record</p><h1>Learning proof</h1><p>Exact checks and learning activity recorded in this browser.</p><div class="stats"><span>${ledger.totals.completedSteps} steps</span><span>${ledger.totals.passedChecks} checks</span><span>${ledger.totals.completedProjects} guided projects</span><span>${ledger.totals.completedPractice} practice activities</span><span>${ledger.totals.completedCapstones} capstones</span></div></header>
  <section class="notice"><h2>Honest limit</h2><p>This file was generated in the learner's own browser on ${escapeHtml(generatedAt)}. Browser-side records can be changed. This page shows course completion evidence, not employment readiness, accreditation, or independently verified competence.</p></section>
  ${courseSections || "<section><h2>No guided evidence yet</h2><p>Complete lesson checks before generating a proof file.</p></section>"}${practice}
  <footer><p>Generated by CodeDaddy. Learning stays free whether the learner donates or not.</p></footer>
  </main></body></html>`;
}
