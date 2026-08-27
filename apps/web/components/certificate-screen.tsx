"use client";

import { SiteFooter } from "@/components/site-footer";
import { Icon } from "@/components/icon";
import Link from "next/link";
import { ProductNav } from "@/components/product-nav";
import { curriculum } from "@/content/curriculum";
import { useCurriculumProgress } from "@/hooks/use-curriculum-progress";
import { type Copy } from "@/lib/lesson-ir";

const CERTIFICATE_COPY = {
  eyebrow: "Certificate",
  heading: "Show what you finished.",
  intro: "Finish every project. Verified links will be added after the backend is ready.",
  loading: "Checking progress",
  locked: "Not ready yet",
  frontendReady: "Course work complete",
  disconnected: "Verification not connected",
  disconnectedHelp: "Browser progress cannot issue a real certificate.",
  preview: "Preview only",
  learner: "Learner name",
  completedPath: "finished the Web Foundations learning path",
  wordingOpen: "Final wording and project links come later.",
  projectDone: "Done",
  projectOpen: "Not done",
  viewProjects: "View projects",
} satisfies Record<string, Copy>;

export function CertificateScreen() {
  const { ready, progress } = useCurriculumProgress();
  const eligible = ready && curriculum.courses.every((course) => progress[course.id].isComplete);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-on-background">
      <ProductNav current="certificate" />
      <main className="mx-auto w-full flex-1 max-w-[980px] px-margin-mobile py-8 md:px-margin-desktop md:py-12">

        <header className="max-w-[720px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-voltage">
              {CERTIFICATE_COPY.eyebrow}
            </span>
          </div>
          <h1 className="mt-4 font-display text-[38px] font-bold leading-[1.05] tracking-tight text-chalk sm:text-[46px]">
            {CERTIFICATE_COPY.heading}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ash">
            {CERTIFICATE_COPY.intro}
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-hairline bg-panel p-5 sm:p-7">
          <p
            className={`flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-wider ${
              eligible ? "text-acid" : ready ? "text-gold" : "text-ash"
            }`}
          >
            <Icon
              name={!ready ? "radio_button_unchecked" : eligible ? "check_circle" : "lock"}
              size={16}
              filled={eligible}
            />
            <span>
              {!ready
                  ? CERTIFICATE_COPY.loading
                  : eligible
                    ? CERTIFICATE_COPY.frontendReady
                    : CERTIFICATE_COPY.locked}
            </span>
          </p>

          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {curriculum.courses.map((course) => {
              const complete = ready && progress[course.id].isComplete;
              return (
                <li key={course.id} className="rounded-lg border border-hairline bg-raised px-4 py-3">
                  <p className="font-mono text-[11px] text-ash">{course.project}</p>
                  <p className={`mt-2 flex items-center gap-1.5 text-[13px] ${complete ? "text-acid" : "text-ash"}`}>
                    <Icon name={complete ? "check_circle" : "lock"} size={15} filled={complete} />
                    <span>{complete ? CERTIFICATE_COPY.projectDone : CERTIFICATE_COPY.projectOpen}</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="relative mt-6 overflow-hidden rounded-2xl border border-plasma/35 bg-raised p-6 sm:p-10">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-plasma">
            <Icon name="workspace_premium" size={16} className="mr-1 inline-block align-text-bottom" />
            {CERTIFICATE_COPY.preview}
          </p>
          <div className="mt-8 border-y border-hairline py-8 text-center sm:py-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
              Web Foundations
            </p>
            <h2 className="mt-3 font-display text-[32px] font-bold tracking-tight text-chalk sm:text-[42px]">
              Certificate of Completion
            </h2>
            <p className="mt-7 text-[14px] text-ash">{CERTIFICATE_COPY.learner}</p>
            <p className="mt-2 font-display text-[24px] font-bold text-chalk">________________</p>
            <p className="mx-auto mt-6 max-w-[50ch] text-[15px] leading-relaxed text-ash">
              {CERTIFICATE_COPY.completedPath}
            </p>
          </div>
          <p className="mt-6 flex items-start gap-2 text-[14px] leading-relaxed text-ash">
            <Icon name="lightbulb" size={16} className="mt-0.5" />
            <span>{CERTIFICATE_COPY.wordingOpen}</span>
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-gold/40 bg-panel p-5 sm:p-6">
          <p className="flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-wider text-gold">
            <Icon name="lock" size={16} />
            <span>{CERTIFICATE_COPY.disconnected}</span>
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ash">
            {CERTIFICATE_COPY.disconnectedHelp}
          </p>
          <Link
            href="/projects"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-hairline px-4 py-3 font-mono text-[12px] text-chalk transition-colors hover:border-ash/70"
          >
            <span>{CERTIFICATE_COPY.viewProjects}</span>
            <Icon name="arrow_forward" size={16} />
          </Link>
        </section>
      </main>
      <SiteFooter home="/dashboard" />
    </div>
  );
}
