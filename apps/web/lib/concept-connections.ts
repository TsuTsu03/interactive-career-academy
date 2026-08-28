import { curriculum } from "@/content/curriculum";
import type { Course, Step } from "@/lib/lesson-ir";

export interface ConceptConnection {
  conceptId: string;
  courseId: string;
  courseTitle: string;
  projectTitle: string;
  stepTask: string;
}
export function conceptConnections(course: Course, step: Step, limit = 3): ConceptConnection[] {
  const ids = new Set(step.conceptIds ?? []);
  if (ids.size === 0) return [];
  const currentCourseIndex = curriculum.courses.findIndex((item) => item.id === course.id);
  const currentStepIndex = course.steps.findIndex((item) => item.id === step.id);
  const connections: ConceptConnection[] = [];
  const seenProjects = new Set<string>();

  for (let courseIndex = currentCourseIndex; courseIndex < curriculum.courses.length; courseIndex += 1) {
    const candidateCourse = curriculum.courses[courseIndex];
    const start = candidateCourse.id === course.id ? currentStepIndex + 1 : 0;
    for (let stepIndex = start; stepIndex < candidateCourse.steps.length; stepIndex += 1) {
      const candidateStep = candidateCourse.steps[stepIndex];
      const conceptId = candidateStep.conceptIds?.find((id) => ids.has(id));
      const projectKey = `${candidateCourse.id}:${candidateStep.projectId}`;
      if (!conceptId || seenProjects.has(projectKey)) continue;
      const project = candidateCourse.projects.find((item) => item.id === candidateStep.projectId);
      if (!project) continue;
      seenProjects.add(projectKey);
      connections.push({
        conceptId,
        courseId: candidateCourse.id,
        courseTitle: candidateCourse.title,
        projectTitle: project.title,
        stepTask: candidateStep.task,
      });
      if (connections.length >= limit) return connections;
    }
  }
  return connections;
}
