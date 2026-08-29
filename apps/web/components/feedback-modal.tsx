"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { FeedbackForm } from "@/components/feedback-form";
import { Icon } from "@/components/icon";
import { feedbackRecentlyAsked, rememberFeedbackAsked } from "@/lib/feedback";
import { completedStepTotal } from "@/lib/progress-lite";

/**
 * Asks how the product is going, once the learner has done enough for the
 * answer to mean something.
 *
 * It queues behind the donation prompt rather than competing with it: the
 * donation prompt opens at ten completed steps, this one waits for thirty and
 * only while that prompt is not on screen. Two modals stacked on one page is
 * how a product teaches people to dismiss everything without reading.
 *
 * Whether it was answered or dismissed, it stays away for 45 days. There is no
 * second ask, no reminder, and nothing here blocks the lesson.
 */
const REQUIRED_STEPS = 30;

export function FeedbackModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const isHarness = pathname === "/harness" || pathname.startsWith("/harness/");
  const onFeedbackPage = pathname === "/feedback";

  useEffect(() => {
    if (isHarness || onFeedbackPage) return;
    if (feedbackRecentlyAsked()) return;
    if (completedStepTotal() < REQUIRED_STEPS) return;
    // Never on top of another dialog.
    if (document.querySelector('[role="dialog"]')) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(true);
  }, [isHarness, onFeedbackPage]);

  const dismiss = () => {
    rememberFeedbackAsked();
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        rememberFeedbackAsked();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-void/90 px-4 py-8 sm:flex sm:items-center sm:justify-center">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="relative mx-auto w-full max-w-lg rounded-xl border border-hairline bg-panel p-6 text-chalk sm:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          aria-label="Close feedback message"
          className="absolute right-3 top-3 flex h-touch-target w-touch-target items-center justify-center rounded-lg text-ash transition-colors hover:bg-raised hover:text-chalk"
        >
          <Icon name="close" size={22} />
        </button>

        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-voltage">
          Feedback
        </p>
        <h2 id={titleId} className="mt-2 pr-10 font-display text-[24px] font-bold text-chalk">
          You have built a few things. How is it going?
        </h2>
        <p id={descriptionId} className="mt-2 text-[14px] leading-relaxed text-ash">
          One answer is enough. It goes straight to the person who writes the lessons, and it is
          the only way a confusing step gets found.
        </p>

        <div className="mt-5">
          <FeedbackForm page={pathname} compact onDone={() => setTimeout(() => setOpen(false), 1200)} />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={dismiss}
            className="min-h-11 rounded-lg border border-hairline px-5 font-mono text-[12px] text-ash transition-colors hover:text-chalk"
          >
            Not now
          </button>
          <Link
            href="/feedback"
            onClick={dismiss}
            className="font-mono text-[12px] text-primary underline"
          >
            Open the full form
          </Link>
        </div>
      </div>
    </div>
  );
}
