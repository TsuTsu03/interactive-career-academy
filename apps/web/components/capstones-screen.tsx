"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { ProductNav } from "@/components/product-nav";
import { SiteFooter } from "@/components/site-footer";
import { capstones } from "@/content/capstones";
import { loadPracticeState } from "@/lib/practice-progress";

export function CapstonesScreen() {
  const [completed, setCompleted] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setCompleted(loadPracticeState().completions.map((item) => item.activityId));
    sync();
    window.addEventListener("codedaddy-practice-changed", sync);
    return () => window.removeEventListener("codedaddy-practice-changed", sync);
  }, []);

  return <div className="flex min-h-[100dvh] flex-col bg-background text-on-background"><ProductNav current="practice" /><main className="mx-auto w-full max-w-[1080px] flex-1 px-margin-mobile py-8 md:px-margin-desktop md:py-12">
    <header className="max-w-[800px]"><p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Five capstones</p><h1 className="mt-4 font-display text-[38px] font-bold leading-tight text-chalk sm:text-[48px]">Independent briefs. Your design decisions.</h1><p className="mt-4 text-[17px] leading-relaxed text-ash">The checks enforce useful behavior and practical constraints. They do not prescribe one visual design. The portfolio is fifth because it presents the first four.</p><Link href="/practice" className="mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-[12px] text-primary underline-offset-2 hover:underline"><Icon name="arrow_back" size={16} /> Optional practice lab</Link></header>
    <div className="mt-9 space-y-4">{capstones.map((capstone) => {
      const done = completed.includes(capstone.id);
      const locked = (capstone.requiresActivityIds ?? []).some((id) => !completed.includes(id));
      return <article key={capstone.id} className="grid gap-5 rounded-xl border border-hairline bg-panel p-5 sm:p-6 md:grid-cols-[80px_1fr_auto] md:items-center"><div className="font-mono text-[34px] font-bold text-primary">0{capstone.index}</div><div><p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gold">{capstone.index === 5 ? "Portfolio · built last" : "Independent capstone"}</p><h2 className="mt-2 font-display text-[24px] font-bold text-chalk">{capstone.title}</h2><p className="mt-2 text-[14px] leading-relaxed text-ash">{capstone.summary}</p><p className={`mt-3 flex items-center gap-2 text-[12px] ${done ? "text-acid" : locked ? "text-gold" : "text-ash"}`}><Icon name={done ? "check_circle" : locked ? "lock" : "radio_button_unchecked"} size={17} filled={done} />{done ? "Complete" : locked ? "Finish capstones 1–4 first" : `${capstone.tests.length} acceptance checks`}</p></div>{locked ? <span className="inline-flex min-h-11 items-center justify-center rounded-lg border border-hairline px-5 font-mono text-[11px] text-ash">Locked</span> : <div className="flex flex-wrap gap-2"><Link href={`/capstones/${capstone.id}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 font-mono text-[11px] font-bold text-on-primary">Open brief <Icon name="arrow_forward" size={15} /></Link>{done ? <Link href={`/capstones/${capstone.id}/submit`} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-hairline px-4 font-mono text-[11px] font-bold text-chalk">Submit links</Link> : null}</div>}</article>;
    })}</div>
  </main><SiteFooter home="/dashboard" /></div>;
}
