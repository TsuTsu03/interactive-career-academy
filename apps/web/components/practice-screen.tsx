"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { ProductNav } from "@/components/product-nav";
import { SiteFooter } from "@/components/site-footer";
import { practiceActivities } from "@/content/practice-activities";
import { loadPracticeState } from "@/lib/practice-progress";

export function PracticeScreen() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setCompleted(loadPracticeState().completions.map((item) => item.activityId));
    sync();
    window.addEventListener("codedaddy-practice-changed", sync);
    return () => window.removeEventListener("codedaddy-practice-changed", sync);
  }, []);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-on-background">
      <ProductNav current="practice" />
      <main className="mx-auto w-full max-w-[1080px] flex-1 px-margin-mobile py-8 md:px-margin-desktop md:py-12">
        <header className="max-w-[760px]">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Practice lab</p>
          <h1 className="mt-4 font-display text-[38px] font-bold leading-tight text-chalk sm:text-[48px]">Recall it. Debug it. Prove it again.</h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ash">Rebuilds remove the small prompts. Bug Clinics give you a broken result to trace. Constraint Missions add practical requirements. Remixes transfer a finished build to a new subject. Every activity is optional.</p>
          <Link href="/capstones" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/60 px-5 font-mono text-[12px] font-bold text-primary">View the five capstones <Icon name="arrow_forward" size={16} /></Link>
        </header>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {practiceActivities.map((activity) => {
            const done = completed.includes(activity.id);
            const locked = Boolean(activity.sourceActivityId && !completed.includes(activity.sourceActivityId));
            const modeLabel = activity.mode === "rebuild" ? "Rebuild Mode" : activity.mode === "bug-clinic" ? "Bug Clinic" : activity.mode === "constraint" ? "Constraint Mission" : "Project Remix";
            return (
              <article key={activity.id} className="rounded-xl border border-hairline bg-panel p-5 sm:p-6">
                <p className={`font-mono text-[10px] font-bold uppercase tracking-wider ${activity.mode === "rebuild" ? "text-acid" : activity.mode === "bug-clinic" ? "text-gold" : activity.mode === "constraint" ? "text-plasma" : "text-primary"}`}>{modeLabel}</p>
                <h2 className="mt-3 font-display text-[24px] font-bold text-chalk">{activity.title}</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-ash">{activity.summary}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className={`flex items-center gap-2 text-[12px] ${done ? "text-acid" : "text-ash"}`}>
                    <Icon name={done ? "check_circle" : locked ? "lock" : "radio_button_unchecked"} size={17} filled={done} /> {done ? "Complete" : locked ? "Finish source first" : "Ready"}
                  </span>
                  {locked ? <span className="inline-flex min-h-11 items-center rounded-lg border border-hairline px-4 font-mono text-[11px] text-ash">Locked</span> : <Link href={`/practice/${activity.id}`} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 font-mono text-[11px] font-bold text-on-primary">Open activity <Icon name="arrow_forward" size={15} /></Link>}
                </div>
              </article>
            );
          })}
        </div>
      </main>
      <SiteFooter home="/dashboard" />
    </div>
  );
}
