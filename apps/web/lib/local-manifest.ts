import type { Curriculum, TestSpec } from "./lesson-ir";

/**
 * The plain data the downloadable checker carries: each local project's
 * starting files and each local step's checks. No solutions and no code.
 */
export interface LocalManifest {
  projects: Record<string, { title: string; seed: Record<string, string> }>;
  steps: Record<string, { course: string; project: string; tests: TestSpec[] }>;
}

export function localProjectKey(courseId: string, projectId: string): string {
  return `${courseId}/${projectId}`;
}

export function buildLocalManifest(curriculum: Curriculum): LocalManifest {
  const manifest: LocalManifest = { projects: {}, steps: {} };
  for (const course of curriculum.courses) {
    for (const step of course.steps) {
      if (step.kind !== "local") continue;
      // Two courses may reuse a project id, so the checker's start command
      // names the course too: start node-basics/files-sari-sari.
      const key = localProjectKey(course.id, step.projectId);
      if (!manifest.projects[key]) {
        const title = course.projects.find((project) => project.id === step.projectId)?.title ?? step.projectId;
        manifest.projects[key] = { title, seed: step.localSeed ?? {} };
      }
      manifest.steps[step.id] = { course: course.id, project: key, tests: step.tests };
    }
  }
  return manifest;
}
