import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline",
  description: "CodeDaddy offline course status.",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-background px-margin-mobile py-12 text-on-background md:px-margin-desktop">
      <section className="w-full max-w-xl rounded-2xl border border-gold/40 bg-panel p-6 sm:p-9">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
          Offline
        </p>
        <h1 className="mt-4 font-display text-[34px] font-bold leading-tight text-chalk sm:text-[42px]">
          This page was not saved yet.
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-ash">
          Reconnect and open the course once. After it finishes loading, you can return to that course without a connection.
        </p>
        <p className="mt-4 text-[14px] leading-relaxed text-ash">
          Courses you already opened remain available. Account sign-in, final project submission, and certificates still need a connection.
        </p>
      </section>
    </main>
  );
}
