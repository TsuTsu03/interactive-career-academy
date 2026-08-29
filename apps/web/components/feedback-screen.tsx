"use client";

import { usePathname } from "next/navigation";
import { FeedbackForm } from "@/components/feedback-form";
import { ProductNav } from "@/components/product-nav";
import { SiteFooter } from "@/components/site-footer";

export function FeedbackScreen() {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-on-background">
      <ProductNav current="feedback" />
      <main className="mx-auto w-full max-w-[760px] flex-1 px-margin-mobile py-8 md:px-margin-desktop md:py-12">
        <header className="max-w-[62ch]">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-voltage">Feedback</p>
          <h1 className="mt-4 font-display text-[34px] font-bold leading-tight text-chalk sm:text-[42px]">
            Tell us what is working and what is not.
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-ash">
            A step that contradicts itself, a checker that will not pass when it should, a word
            nobody explained, or something you wish existed. Short notes are useful. You do not
            need an account.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-hairline bg-panel p-5 sm:p-6">
          <FeedbackForm page={pathname} />
        </section>

        <p className="mt-6 text-[13px] leading-relaxed text-ash">
          If a lesson is wrong, naming the course and the step number is the fastest way to get it
          fixed.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
