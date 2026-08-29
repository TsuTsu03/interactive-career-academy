export type FeedbackMood = "working" | "unsure" | "stuck" | "idea";

export const FEEDBACK_MOODS: { id: FeedbackMood; label: string; hint: string }[] = [
  { id: "working", label: "It is working", hint: "The steps make sense and I am building." },
  { id: "unsure", label: "Something is unclear", hint: "I got through it, but part of it confused me." },
  { id: "stuck", label: "I am stuck", hint: "A step, a check, or the app itself blocked me." },
  { id: "idea", label: "I have an idea", hint: "Something you could add or change." },
];

/** Its own key, like the review record and the donation prompt. */
export const FEEDBACK_ASKED_KEY = "codedaddy.feedback.asked.v1";
export const FEEDBACK_ASK_AFTER_DAYS = 45;

export function feedbackRecentlyAsked(): boolean {
  try {
    const saved = Number(localStorage.getItem(FEEDBACK_ASKED_KEY));
    if (!Number.isFinite(saved) || saved <= 0) return false;
    return Date.now() - saved < FEEDBACK_ASK_AFTER_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export function rememberFeedbackAsked(): void {
  try {
    localStorage.setItem(FEEDBACK_ASKED_KEY, String(Date.now()));
  } catch {
    // A blocked store only means the question may come back sooner.
  }
}

export async function sendFeedback(input: {
  mood: FeedbackMood;
  message?: string;
  page?: string;
  contact?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (response.ok) return { ok: true };
    const detail = (await response.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, error: detail?.error ?? "Feedback could not be sent right now." };
  } catch {
    return { ok: false, error: "You appear to be offline. The note was not sent." };
  }
}
