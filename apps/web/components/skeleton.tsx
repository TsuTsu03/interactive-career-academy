/**
 * Loading placeholders for route segments that have not streamed yet.
 *
 * Every skeleton mirrors the real screen's frame — the same sticky header
 * height, the same page width, the same card rhythm — so the content that
 * arrives lands where the placeholder was instead of shoving the page around.
 *
 * These are server components: no state, no effects, nothing shipped to the
 * browser but markup and two class names.
 */

function Bar({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded ${className}`} />;
}

function HeaderBar() {
  return (
    <div className="sticky inset-x-0 top-0 z-50 border-b border-outline-variant bg-surface">
      <div className="flex h-touch-target w-full items-center justify-between gap-gutter px-margin-mobile md:px-margin-desktop">
        <Bar className="h-7 w-36" />
        <div className="hidden items-center gap-6 md:flex">
          <Bar className="h-4 w-20" />
          <Bar className="h-4 w-20" />
          <Bar className="h-4 w-16" />
        </div>
        <Bar className="h-touch-target w-28" />
      </div>
    </div>
  );
}

function CardRow({ lines = 3 }: { lines?: number }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-hairline bg-panel p-5 sm:gap-5 sm:p-6">
      <Bar className="mt-1 h-11 w-11 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-3">
        <Bar className="h-6 w-2/3" />
        {Array.from({ length: lines }, (_, index) => (
          <Bar key={index} className={`h-4 ${index === lines - 1 ? "w-1/3" : "w-full"}`} />
        ))}
        <Bar className="h-1.5 w-full rounded-full" />
      </div>
    </div>
  );
}

/**
 * `list` covers every screen built from a heading and a stack of cards.
 * `workspace` covers the three-part lesson screen, whose shape is nothing like
 * the others and whose blank state is the most jarring to land on.
 */
export function PageSkeleton({
  variant = "list",
  cards = 3,
  label = "Loading this page",
}: {
  variant?: "list" | "workspace";
  cards?: number;
  label?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="flex min-h-[100dvh] flex-col bg-background text-on-background"
    >
      <span className="sr-only">{label}</span>
      <HeaderBar />

      {variant === "workspace" ? (
        <div className="grid flex-1 gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-4 rounded-2xl border border-hairline bg-panel p-5">
            <Bar className="h-4 w-24" />
            <Bar className="h-6 w-3/4" />
            <Bar className="h-4 w-full" />
            <Bar className="h-4 w-5/6" />
            <Bar className="h-24 w-full rounded-lg" />
          </div>
          <div className="space-y-3 rounded-2xl border border-hairline bg-panel p-5">
            <Bar className="h-4 w-28" />
            <Bar className="h-[240px] w-full rounded-lg" />
          </div>
          <div className="space-y-3 rounded-2xl border border-hairline bg-panel p-5 lg:block">
            <Bar className="h-4 w-24" />
            <Bar className="h-[240px] w-full rounded-lg" />
          </div>
        </div>
      ) : (
        <main className="mx-auto w-full max-w-[1100px] flex-1 px-margin-mobile py-8 md:px-margin-desktop md:py-12">
          <div className="mb-10 max-w-[680px] space-y-4 sm:mb-14">
            <Bar className="h-3 w-40" />
            <Bar className="h-10 w-full" />
            <Bar className="h-4 w-5/6" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: cards }, (_, index) => (
              <CardRow key={index} />
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
