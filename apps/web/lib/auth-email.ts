/**
 * Sends the one-time sign-in link through Resend.
 *
 * Supabase used to send this email itself. Resend's shared sender,
 * `onboarding@resend.dev`, only delivers to the address that owns the Resend
 * account, so learners only receive links once AUTH_EMAIL_FROM is an address
 * on a domain verified in Resend. Until then Resend refuses the send, and the
 * learner sees that the email could not be sent rather than waiting for
 * nothing.
 */
const ENDPOINT = "https://api.resend.com/emails";
const SEND_TIMEOUT_MS = 6000;

export async function sendSignInEmail(
  sender: { apiKey: string; from: string },
  to: string,
  link: string,
  minutes: number,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const text = [
    "Use this link to sign in to CodeDaddy:",
    "",
    link,
    "",
    `It works once, for ${minutes} minutes, in the browser where you asked for it.`,
    "If you did not ask for it, you can ignore this email.",
  ].join("\n");
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${sender.apiKey}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
      body: JSON.stringify({
        from: sender.from,
        to: [to],
        subject: "Your CodeDaddy sign-in link",
        text,
        html: `<p>Use this link to sign in to CodeDaddy:</p><p><a href="${link}">Sign in to CodeDaddy</a></p><p>It works once, for ${minutes} minutes, in the browser where you asked for it.</p><p>If you did not ask for it, you can ignore this email.</p>`,
      }),
    });
    return response.ok ? { ok: true } : { ok: false, error: "The sign-in email could not be sent." };
  } catch {
    return { ok: false, error: "The sign-in email could not be sent." };
  }
}
