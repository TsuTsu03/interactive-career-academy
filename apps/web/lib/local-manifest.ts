import type { Curriculum, TestSpec } from "./lesson-ir";

/**
 * The plain data the downloadable checker carries: each local project's
 * starting files and each local step's checks. No solutions and no code.
 */
export interface LocalManifest {
  projects: Record<string, { title: string; seed: Record<string, string> }>;
  steps: Record<string, { course: string; project: string; tests: TestSpec[] }>;
}

export function buildLocalManifest(curriculum: Curriculum): LocalManifest {
  const manifest: LocalManifest = { projects: {}, steps: {} };
  for (const course of curriculum.courses) {
    for (const step of course.steps) {
      if (step.kind !== "local") continue;
      if (!manifest.projects[step.projectId]) {
        const title = course.projects.find((project) => project.id === step.projectId)?.title ?? step.projectId;
        manifest.projects[step.projectId] = { title, seed: step.localSeed ?? {} };
      }
      manifest.steps[step.id] = { course: course.id, project: step.projectId, tests: step.tests };
    }
  }
  return manifest;
}
