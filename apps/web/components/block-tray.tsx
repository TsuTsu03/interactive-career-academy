"use client";

import { useEffect } from "react";

/**
 * Tap-to-build input. Real code, zero typing.
 *
 * Blocks are buttons, selectable by click or by number key. Nothing here
 * requires dragging, which keeps the mode usable by keyboard and on a phone.
 */
export function BlockTray({
  blocks,
  correctBlock,
  onPlace,
  disabled,
}: {
  blocks: string[];
  correctBlock: string;
  onPlace: (block: string) => void;
  disabled: boolean;
}) {
  useEffect(() => {
    if (disabled) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA)$/.test(target.tagName)) return;
      const n = Number(e.key);
      if (n >= 1 && n <= blocks.length) {
        e.preventDefault();
        onPlace(blocks[n - 1]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [blocks, onPlace, disabled]);

  return (
    <div className="shrink-0 border-t border-hairline bg-panel p-3">
      <div className="mb-2 text-[10px] uppercase tracking-widest text-ash">Blocks</div>
      <div className="grid grid-cols-2 gap-2">
        {blocks.map((b, i) => {
          const isCorrect = b === correctBlock;
          return (
            <button
              key={b}
              type="button"
              disabled={disabled}
              onClick={() => onPlace(b)}
              className={`group relative flex h-14 items-center gap-2 rounded-lg border-2 px-3 text-left transition-transform duration-150 active:scale-[0.97] disabled:opacity-40 ${
                isCorrect
                  ? "border-voltage bg-raised glow-voltage"
                  : "border-hairline bg-raised hover:border-ash/50"
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rounded-full ${
                  isCorrect ? "bg-voltage" : "bg-ash/40"
                }`}
              />
              <code className="truncate font-mono text-[13px] text-chalk">{label(b)}</code>
              <kbd className="ml-auto shrink-0 rounded border border-hairline bg-void px-1.5 py-0.5 font-mono text-[10px] text-ash">
                {i + 1}
              </kbd>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Data-URI blocks are unreadable at full length. */
function label(block: string): string {
  if (block.length <= 30) return block;
  const tag = block.match(/^<([a-z0-9]+)/i)?.[1] ?? "tag";
  return `<${tag} …>`;
}
