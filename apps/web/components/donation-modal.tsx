"use client";

import { Icon } from "@/components/icon";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { completedStepTotal } from "@/lib/progress-lite";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The prompt waits until the learner has real progress. Asking a first-time
 * visitor for money before the product has done anything for them is both rude
 * and useless, and it put a payment card in front of somebody who had not yet
 * read a single step.
 *
 * Counted in steps rather than whole projects so this file never imports course
 * content: it renders in the root layout, and importing the curriculum here put
 * every step of all ten courses into the first load of every page, landing page
 * included. Ten steps is a real stretch of work in a curriculum whose projects
 * run from five steps upward.
 */
const REQUIRED_STEPS = 10;

/** Its own key, like the review record. Nothing here belongs to a course. */
const DISMISSED_KEY = "codedaddy.donation.dismissed.v1";
const DISMISSED_DAYS = 30;

function recentlyDismissed(): boolean {
  try {
    const saved = Number(localStorage.getItem(DISMISSED_KEY));
    if (!Number.isFinite(saved) || saved <= 0) return false;
    return Date.now() - saved < DISMISSED_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function rememberDismissal(): void {
  try {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
  } catch {
    // A blocked or full store only means the prompt may return sooner.
  }
}

export function DonationModal({ gcashQrAvailable }: { gcashQrAvailable: boolean }) {
  const pathname = usePathname();
  // Closed on the first render: whether it opens depends on saved progress,
  // which only exists in the browser.
  const [open, setOpen] = useState(false);
  const [qrState, setQrState] = useState<"loading" | "ready" | "missing">(
    gcashQrAvailable ? "loading" : "missing",
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const isHarness = pathname === "/harness" || pathname.startsWith("/harness/");

  useEffect(() => {
    if (isHarness) return;
    if (recentlyDismissed()) return;
    if (completedStepTotal() < REQUIRED_STEPS) return;
    // One post-mount decision, from browser-only state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(true);
  }, [isHarness]);

  const dismiss = () => {
    rememberDismissal();
    setOpen(false);
  };

  useEffect(() => {
    if (!open || isHarness) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        rememberDismissal();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
      );
      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && document.contains(previousFocus)) {
        previousFocus.focus();
      }
    };
  }, [isHarness, open]);

  if (!open || isHarness) return null;

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
          aria-label="Close donation message"
          className="absolute right-3 top-3 flex h-touch-target w-touch-target items-center justify-center rounded-lg text-ash transition-colors hover:bg-raised hover:text-chalk"
        >
          <Icon name="close" size={22} />
        </button>

        <div
          aria-hidden="true"
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft text-voltage"
        >
          <Icon name="star" filled size={26} />
        </div>

        <p className="font-mono text-label-caps uppercase tracking-widest text-voltage">
          Support CodeDaddy
        </p>
        <h2 id={titleId} className="mt-2 pr-10 font-display text-headline-md">
          Support CodeDaddy with GCash
        </h2>
        <p id={descriptionId} className="mt-4 text-body-md leading-7 text-ash">
          If CodeDaddy has helped you and you are able to contribute, scan the QR code to send
          any amount through GCash.
        </p>
        <p className="mt-4 rounded-lg border border-hairline bg-raised px-4 py-3 text-sm text-chalk">
          Learning stays free whether you donate or not.
        </p>

        <div className="mt-5 flex min-h-[248px] items-center justify-center rounded-lg border border-hairline bg-white p-3 sm:min-h-[288px]">
          {qrState !== "missing" ? (
            <Image
              src="/gcash-qr.png"
              alt="GCash QR code for CodeDaddy donations"
              width={288}
              height={288}
              onLoad={() => setQrState("ready")}
              onError={() => setQrState("missing")}
              className="h-auto w-[224px] sm:w-[264px]"
            />
          ) : null}
          {qrState === "missing" ? (
            <div className="flex max-w-[240px] flex-col items-center gap-2 text-center text-sm text-[#444653]">
              <Icon name="schedule" size={24} />
              <span>
                <strong>QR pending.</strong> The GCash code is being prepared.
              </span>
            </div>
          ) : null}
        </div>

        {qrState === "ready" ? (
          <p className="mt-3 text-center text-sm text-ash">
            Open GCash and scan this QR code.
          </p>
        ) : null}

        <div className="mt-7 flex justify-end">
          <button
            type="button"
            onClick={dismiss}
            className="min-h-11 rounded-lg border border-hairline px-5 py-3 font-bold text-chalk transition-colors hover:bg-raised"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
