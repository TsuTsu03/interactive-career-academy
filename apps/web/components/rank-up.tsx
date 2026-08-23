"use client";

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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgb(255 201 61 / 0.20) 0%, transparent 55%)",
        }}
      />

      <div className="relative flex flex-col items-center px-6 text-center">
        <ParticleBurst count={24} spread={190} />

        <span className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-ash">
          Rank up
        </span>

        <div
          className="glow-gold animate-punch mb-8 flex h-44 w-40 items-center justify-center border-[3px] border-gold text-void"
          style={{
            background: "linear-gradient(160deg, #ffd76b 0%, #ffc93d 45%, #d99e15 100%)",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        >
          <span className="font-display text-5xl font-bold">{rank[0]}</span>
        </div>

        <h1 className="font-display text-[72px] font-bold uppercase leading-none tracking-tight text-chalk">
          {rank}
        </h1>

        <p className="mt-4 text-[17px] text-ash">{BLURB[rank] ?? "You levelled up."}</p>

        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {["New editor theme", "Gold name effect", "Boss unlocked"].map((u) => (
            <span
              key={u}
              className="rounded-full border border-plasma/50 bg-raised px-3.5 py-1.5 text-[13px] text-plasma"
            >
              {u}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="glow-acid mt-10 flex items-center gap-3 rounded-lg bg-acid px-8 py-3.5 font-bold text-void transition-transform active:scale-[0.98]"
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
