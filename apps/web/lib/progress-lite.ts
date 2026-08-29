import { courseStorageKey } from "@/lib/progress";

/**
 * How many steps the learner has completed across every course, read straight
 * from the saved records without importing any course content.
 *
 * This exists so code that only needs a number - the donation prompt in the
 * root layout, for one - never drags the whole curriculum into a bundle. The
 * key prefix is derived from `courseStorageKey` so the two cannot drift.
 *
 * Reads localStorage, so it belongs in an effect or a handler, never a render.
 */
const KEY_PREFIX = courseStorageKey("");

export function completedStepTotal(): number {
  let total = 0;
  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key || !key.startsWith(KEY_PREFIX)) continue;
      const parsed: unknown = JSON.parse(localStorage.getItem(key) ?? "null");
      if (!parsed || typeof parsed !== "object") continue;
      const completed = (parsed as { completedSteps?: unknown }).completedSteps;
      if (Array.isArray(completed)) total += completed.length;
    }
  } catch {
    // A blocked or corrupt store just means the prompt waits longer.
    return 0;
  }
  return total;
}
