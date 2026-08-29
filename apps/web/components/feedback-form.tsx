"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";
import {
  FEEDBACK_MOODS,
  rememberFeedbackAsked,
  sendFeedback,
  type FeedbackMood,
} from "@/lib/feedback";

/**
 * The one feedback form, used by the page and by the prompt.
 *
 * Only the answer is required. A learner who has thirty seconds can press one
 * button and leave; a learner with more to say has room for it. Asking for an
 * address is optional and says why, because most people should not have to
 * give one to report that a step is broken.
 */
export function FeedbackForm({
  page,
  compact = false,
  onDone
}: {
  page?: string;
  compact?: boolean;
  onDone?: () => void;
}) {
  const [mood, setMood] = useState<FeedbackMood | null>(null);
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState<{ sent: boolean; error: string }>({ sent: false, error: "" });

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!mood || busy) return;
    setBusy(true);
    const result = await sendFeedback({ mood, message, page, contact });
    setBusy(false);
    if (result.ok) {
      rememberFeedbackAsked();
      setState({ sent: true, error: "" });
      onDone?.();
      return;
    }
    setState({ sent: false, error: result.error });
  };

  if (state.sent) {
    return (
      <p className="flex items-center gap-2 font-mono text-[13px] text-acid" role="status">
        <Icon name="check_circle" size={18} filled /> Sent. Thank you — this is read.
      </p>
    );
  }

  return (
    <form onSubmit={submit}>
      <fieldset>
        <legend className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ash">
          How is it going?
        </legend>
        <div className={`mt-3 grid gap-2 ${compact ? "" : "sm:grid-cols-2"}`}>
          {FEEDBACK_MOODS.map((option) => (
            <label
              key={option.id}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                mood === option.id
                  ? "border-primary bg-primary-soft"
                  : "border-hairline hover:border-ash/60"
              }`}
            >
              <input
                type="radio"
                name="mood"
                value={option.id}
                checked={mood === option.id}
                onChange={() => setMood(option.id)}
                className="mt-1 h-4 w-4 shrink-0 accent-primary"
              />
              <span className="min-w-0">
                <span className="block text-[14px] font-semibold text-chalk">{option.label}</span>
                <span className="block text-[13px] leading-snug text-ash">{option.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label htmlFor="feedback-message" className="mt-4 block text-[13px] text-ash">
        Anything else? Optional.
      </label>
      <textarea
        id="feedback-message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        rows={compact ? 3 : 5}
        maxLength={2000}
        className="mt-2 w-full rounded-lg border border-hairline bg-void p-3 text-[14px] leading-relaxed text-chalk"
        placeholder="Which step, what happened, what you expected."
      />

      <label htmlFor="feedback-contact" className="mt-4 block text-[13px] text-ash">
        Email, only if you want a reply. Optional.
      </label>
      <input
        id="feedback-contact"
        type="email"
        value={contact}
        onChange={(event) => setContact(event.target.value)}
        className="mt-2 min-h-11 w-full rounded-lg border border-hairline bg-void px-4 text-[14px] text-chalk"
        placeholder="you@example.com"
      />

      {state.error ? (
        <p role="alert" className="mt-3 flex items-start gap-2 font-mono text-[13px] text-strike">
          <Icon name="close" size={16} /> {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!mood || busy}
        className="mt-5 min-h-11 rounded-lg bg-primary px-5 font-mono text-[12px] font-bold text-on-primary disabled:opacity-50"
      >
        {busy ? "Sending…" : "Send feedback"}
      </button>
      <p className="mt-3 text-[12px] leading-relaxed text-ash">
        No name, no browsing history, and no address unless you type one.
      </p>
    </form>
  );
}
