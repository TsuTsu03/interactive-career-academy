"use client";

import { Icon } from "@/components/icon";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function DonationModal({ gcashQrAvailable }: { gcashQrAvailable: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [qrState, setQrState] = useState<"loading" | "ready" | "missing">(
    gcashQrAvailable ? "loading" : "missing",
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const isHarness = pathname === "/harness" || pathname.startsWith("/harness/");

  useEffect(() => {
    if (!open || isHarness) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
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
          onClick={() => setOpen(false)}
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

        <div className="mt-5 flex min-h-[184px] items-center justify-center rounded-lg border border-hairline bg-white p-3 sm:min-h-[216px]">
          {qrState !== "missing" ? (
            <Image
              src="/gcash-qr.png"
              alt="GCash QR code for CodeDaddy donations"
              width={200}
              height={200}
              onLoad={() => setQrState("ready")}
              onError={() => setQrState("missing")}
              className="h-auto w-[160px] sm:w-[200px]"
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
            onClick={() => setOpen(false)}
            className="min-h-11 rounded-lg border border-hairline px-5 py-3 font-bold text-chalk transition-colors hover:bg-raised"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
