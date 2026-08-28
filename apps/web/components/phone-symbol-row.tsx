"use client";

const SYMBOLS = ["<", ">", "/", '"', "'", "{", "}", "(", ")", "[", "]", "=", ";", ":"] as const;

export function PhoneSymbolRow({
  onInsert,
}: {
  onInsert: (symbol: string) => void;
}) {
  return (
    <div
      aria-label="Code symbols"
      className="no-scrollbar flex shrink-0 gap-1 overflow-x-auto border-b border-outline-variant bg-panel px-2 py-1.5 md:hidden"
    >
      {SYMBOLS.map((symbol) => (
        <button
          key={symbol}
          type="button"
          aria-label={`Insert ${symbol}`}
          onClick={() => onInsert(symbol)}
          className="flex h-11 min-w-11 shrink-0 items-center justify-center rounded border border-hairline bg-raised font-mono text-[17px] font-bold text-chalk active:scale-95"
        >
          {symbol}
        </button>
      ))}
    </div>
  );
}
