/**
 * Emails one piece of feedback to the person who maintains the lessons.
 *
 * The row is written first and this runs afterwards, so a mail outage costs a
 * notification and never the feedback itself. Everything here is optional
 * configuration: with no API key the app still records feedback, and the
 * Supabase table remains the record of what people said.
 *
 * `onboarding@resend.dev` is Resend's own sender. It needs no verified domain,
 * and it can only deliver to the address that owns the Resend account, which is
 * exactly the shape of this feature: one recipient, the maintainer.
 */
const ENDPOINT = "https://api.resend.com/emails";
const SEND_TIMEOUT_MS = 4000;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function notifyFeedback(input: {
  mood: string;
  message: string;
  page: string;
  contact: string;
}): Promise<"sent" | "skipped" | "failed"> {
  const key = process.env.RESEND_API_KEY?.trim();
  const to = process.env.FEEDBACK_EMAIL_TO?.trim();
  if (!key || !to) return "skipped";

  const from = process.env.FEEDBACK_EMAIL_FROM?.trim() || "CodeDaddy Feedback <onboarding@resend.dev>";
  const lines = [
    `Answer: ${input.mood}`,
    `Page: ${input.page || "not recorded"}`,
    `Reply to: ${input.contact || "not given"}`,
    "",
    input.message || "(no note)",
  ];

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        from,
        to: [to],
        subject: `CodeDaddy feedback: ${input.mood}`,
        text: lines.join("\n"),
        html: `<pre style="font:14px/1.6 ui-monospace,monospace;white-space:pre-wrap">${escapeHtml(lines.join("\n"))}</pre>`,
        ...(input.contact ? { reply_to: input.contact } : {}),
      }),
    });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  } finally {
    clearTimeout(timer);
  }
}
