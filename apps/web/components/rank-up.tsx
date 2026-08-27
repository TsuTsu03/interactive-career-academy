"use client";

import { Icon } from "@/components/icon";
import { useEffect } from "react";
import { ParticleBurst } from "./juice";

const BLURB: Record<string, string> = {
  Apprentice: "You can change how a page looks.",
  Builder: "You can build real pages now.",
  Shipper: "You can put your work online.",
  Engineer: "You can build the whole thing.",
  Architect: "You design what gets built.",
};

/**
 * The loudest moment in the product. Always skippable, always returns focus,
 * and collapses to a plain crossfade under prefers-reduced-motion.
 */
export function RankUp({ rank, onClose }: { rank: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    const auto = setTimeout(onClose, 9000);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(auto);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Rank up. Your new rank is ${rank}.`}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void/[0.88]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gold/[0.06]" />

      <div className="relative flex flex-col items-center px-6 text-center">
        <ParticleBurst count={24} spread={190} />

        <span className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-ash">
          Rank up
        </span>

        <div className="animate-punch mb-8 flex h-40 w-40 items-center justify-center border-2 border-gold bg-gold text-void">
          <span className="font-display text-5xl font-bold" aria-hidden="true">{rank[0]}</span>
        </div>

        <h1 className="font-display text-[72px] font-bold uppercase leading-none tracking-tight text-chalk">
          {rank}
        </h1>

        <p className="mt-4 text-[17px] text-ash">{BLURB[rank] ?? "You levelled up."}</p>

        <p className="mt-7 border border-acid bg-raised px-4 py-2 font-mono text-[12px] font-bold uppercase tracking-wide text-acid">
          <Icon name="workspace_premium" size={16} /> New rank earned
        </p>

        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="mt-10 flex items-center gap-3 border border-acid bg-acid px-8 py-3.5 font-bold text-void transition-transform active:scale-[0.98]"
        >
          CONTINUE
          <kbd className="rounded bg-void/20 px-1.5 py-0.5 font-mono text-[11px]">SPACE</kbd>
        </button>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="absolute bottom-6 right-6 flex items-center gap-2 text-sm text-ash hover:text-chalk"
      >
        Skip
        <kbd className="rounded border border-hairline bg-raised px-1.5 py-0.5 font-mono text-[10px]">
          esc
        </kbd>
      </button>
    </div>
  );
}
