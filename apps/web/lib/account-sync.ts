import { curriculum } from "@/content/curriculum";
import { courseSessionSnapshotFromStorage, courseStorageKey, withoutLearnerFiles } from "@/lib/progress";
import { freshPracticeState, practiceStorageKey, validatePracticeState, type PracticeCompletion, type PracticeState } from "@/lib/practice-progress";

interface RemoteProgress {
  courses: Record<string, unknown>;
  practice: unknown;
}

function practiceFromStorage(): PracticeState {
  try {
    return validatePracticeState(JSON.parse(localStorage.getItem(practiceStorageKey) ?? "null")) ?? freshPracticeState();
  } catch {
    return freshPracticeState();
  }
}

function mergePractice(local: PracticeState, remote: PracticeState): PracticeState {
  const completions = new Map<string, PracticeCompletion>();
  for (const item of [...remote.completions, ...local.completions]) {
    const current = completions.get(item.activityId);
    if (!current || item.passedTestIds.length > current.passedTestIds.length || (item.passedTestIds.length === current.passedTestIds.length && item.completedAt > current.completedAt)) completions.set(item.activityId, item);
  }
  return {
    version: 1,
    drafts: { ...remote.drafts, ...local.drafts },
    completions: [...completions.values()],
    submissionDrafts: { ...remote.submissionDrafts, ...local.submissionDrafts },
  };
}

export async function syncBrowserProgress(): Promise<{ restoredCourses: number; savedCourses: number }> {
  const response = await fetch("/api/progress", { cache: "no-store" });
  if (!response.ok) throw new Error("Account progress could not be loaded.");
  const remote = await response.json() as RemoteProgress;
  const mergedCourses: Record<string, unknown> = {};
  let restoredCourses = 0;
  let savedCourses = 0;
  for (const course of curriculum.courses) {
    const localRaw = localStorage.getItem(courseStorageKey(course.id));
    const local = courseSessionSnapshotFromStorage(course, localRaw);
    const remoteRaw = remote.courses[course.id];
    const server = courseSessionSnapshotFromStorage(course, remoteRaw ? JSON.stringify(remoteRaw) : null);
    if (!local && !server) continue;
    if (server && (!local || server.completedStepIds.length > local.completedStepIds.length)) {
      // The account record carries no files, so a restore keeps whatever this
      // browser already holds. Adopting the remote position must never be the
      // thing that deletes code the learner wrote here.
      const restored = local
        ? { ...server.record, files: local.record.files, activeFile: local.record.activeFile }
        : server.record;
      localStorage.setItem(courseStorageKey(course.id), JSON.stringify(restored));
      mergedCourses[course.id] = withoutLearnerFiles(server.record);
      restoredCourses += 1;
    } else if (local) {
      mergedCourses[course.id] = withoutLearnerFiles(local.record);
      if (!server || local.completedStepIds.length > server.completedStepIds.length) savedCourses += 1;
    }
  }
  const localPractice = practiceFromStorage();
  const remotePractice = validatePracticeState(remote.practice) ?? freshPracticeState();
  const practice = mergePractice(localPractice, remotePractice);
  localStorage.setItem(practiceStorageKey, JSON.stringify(practice));
  const saved = await fetch("/api/progress", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ courses: mergedCourses, practice }),
  });
  if (!saved.ok) throw new Error("Merged progress could not be saved.");
  window.dispatchEvent(new Event("codedaddy-progress-imported"));
  window.dispatchEvent(new Event("codedaddy-practice-changed"));
  return { restoredCourses, savedCourses };
}
