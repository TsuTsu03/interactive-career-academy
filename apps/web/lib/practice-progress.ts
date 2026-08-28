import { practiceActivities } from "@/content/practice-activities";
import { capstones } from "@/content/capstones";
import { restoreSubmissionDraft, type SubmissionDraft } from "@/lib/submission";

const independentActivities = [...practiceActivities, ...capstones];

export const practiceStorageKey = "aca.practice.v1";
export const PRACTICE_VERSION = 1;

export interface PracticeCompletion {
  activityId: string;
  passedTestIds: string[];
  completedAt: string;
}

export interface PracticeDraft {
  files: Record<string, string>;
  activeFile: string;
}

export interface PracticeState {
  version: typeof PRACTICE_VERSION;
  drafts: Record<string, PracticeDraft>;
  completions: PracticeCompletion[];
  submissionDrafts: Record<string, SubmissionDraft>;
}

export function freshPracticeState(): PracticeState {
  return { version: PRACTICE_VERSION, drafts: {}, completions: [], submissionDrafts: {} };
}

export function validatePracticeState(value: unknown): PracticeState | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const candidate = value as Partial<PracticeState>;
  if (
    candidate.version !== PRACTICE_VERSION ||
    !candidate.drafts ||
    typeof candidate.drafts !== "object" ||
    Array.isArray(candidate.drafts) ||
    !Array.isArray(candidate.completions)
  ) return null;
  const activities = new Map(independentActivities.map((activity) => [activity.id, activity]));
  const drafts: PracticeState["drafts"] = {};
  for (const [id, raw] of Object.entries(candidate.drafts)) {
      const activity = activities.get(id);
      if (!activity || !raw || typeof raw !== "object" || Array.isArray(raw)) continue;
      const draft = raw as Partial<PracticeDraft>;
      if (!draft.files || typeof draft.files !== "object" || Array.isArray(draft.files)) continue;
      const names = Object.keys(activity.files);
      if (!names.every((name) => typeof draft.files?.[name] === "string")) continue;
      if (typeof draft.activeFile !== "string" || !names.includes(draft.activeFile)) continue;
      drafts[id] = { files: Object.fromEntries(names.map((name) => [name, draft.files?.[name] ?? ""])), activeFile: draft.activeFile };
  }
  const completions = candidate.completions.flatMap((raw) => {
        if (!raw || typeof raw !== "object" || Array.isArray(raw)) return [];
        const completion = raw as Partial<PracticeCompletion>;
        const activity = activities.get(completion.activityId ?? "");
        if (!activity || !Array.isArray(completion.passedTestIds) || typeof completion.completedAt !== "string") return [];
        const validIds = new Set(activity.tests.map((test) => test.id));
        if (!completion.passedTestIds.every((id) => typeof id === "string" && validIds.has(id))) return [];
        return [{ activityId: activity.id, passedTestIds: [...new Set(completion.passedTestIds)], completedAt: completion.completedAt }];
      });
  const submissionDrafts: PracticeState["submissionDrafts"] = {};
  if (candidate.submissionDrafts !== undefined) {
    if (!candidate.submissionDrafts || typeof candidate.submissionDrafts !== "object" || Array.isArray(candidate.submissionDrafts)) return null;
    for (const [id, raw] of Object.entries(candidate.submissionDrafts)) {
      if (!capstones.some((capstone) => capstone.id === id)) return null;
      submissionDrafts[id] = restoreSubmissionDraft(raw);
    }
  }
  if (
    Object.keys(drafts).length !== Object.keys(candidate.drafts).length ||
    completions.length !== candidate.completions.length
  ) return null;
  return { version: PRACTICE_VERSION, drafts, completions, submissionDrafts };
}

export function restorePracticeState(value: unknown): PracticeState {
  return validatePracticeState(value) ?? freshPracticeState();
}

export function loadPracticeState(): PracticeState {
  try {
    const raw = localStorage.getItem(practiceStorageKey);
    return restorePracticeState(raw ? JSON.parse(raw) : null);
  } catch {
    return freshPracticeState();
  }
}

export function savePracticeState(state: PracticeState): void {
  try {
    localStorage.setItem(practiceStorageKey, JSON.stringify(state));
    window.dispatchEvent(new Event("codedaddy-practice-changed"));
  } catch {
    // Practice stays usable when browser storage is unavailable.
  }
}
