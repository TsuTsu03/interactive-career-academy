"use client";

import Link from "next/link";
import { ProductNav } from "@/components/product-nav";
import { RegisterToggle } from "@/components/register-toggle";
import { curriculum } from "@/content/curriculum";
import { useCurriculumProgress } from "@/hooks/use-curriculum-progress";
import { copy, type Copy } from "@/lib/lesson-ir";

const CERTIFICATE_COPY = {
  eyebrow: { simple: "Certificate", standard: "Certificate" },
  heading: { simple: "Show what you finished.", standard: "Certificate of Completion" },
  intro: {
    simple: "Finish every project. Verified links will be added after the backend is ready.",
    standard: "Complete every course project before automated repository and deployment verification.",
  },
  loading: { simple: "Checking progress", standard: "Checking eligibility" },
  locked: { simple: "Not ready yet", standard: "Requirements incomplete" },
  frontendReady: { simple: "Course work complete", standard: "Frontend requirements met" },
  disconnected: { simple: "Verification not connected", standard: "Verification not connected" },
  disconnectedHelp: {
    simple: "Browser progress cannot issue a real certificate.",
    standard: "Local browser results are forgeable, so they cannot issue a verified credential.",
  },
  preview: { simple: "Preview only", standard: "Unverified preview" },
  learner: { simple: "Learner name", standard: "Learner name" },
  completedPath: {
    simple: "finished the Web Foundations learning path",
    standard: "completed the Web Foundations learning path",
  },
  wordingOpen: {
    simple: "Final wording and project links come later.",
    standard: "Final wording, repository evidence, and deployment links are still pending.",
  },
  projectDone: { simple: "Done", standard: "Completed" },
  projectOpen: { simple: "Not done", standard: "Incomplete" },
  viewProjects: { simple: "View projects", standard: "Review project progress" },
} satisfies Record<string, Copy>;

export function CertificateScreen() {
  const { ready, register, progress, setRegister } = useCurriculumProgress();
  const eligible = ready && curriculum.courses.every((course) => progress[course.id].isComplete);

  return (
    <main className="mx-auto min-h-[100dvh] max-w-[980px] px-5 py-8 sm:px-6 sm:py-12">
      <ProductNav current="certificate" register={register} />

      <header className="max-w-[720px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-voltage">
            {copy(CERTIFICATE_COPY.eyebrow, register)}
          </span>
          <RegisterToggle register={register} onChange={setRegister} />
        </div>
        <h1 className="mt-4 font-display text-[38px] font-bold leading-[1.05] tracking-tight text-chalk sm:text-[46px]">
          {copy(CERTIFICATE_COPY.heading, register)}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ash">
          {copy(CERTIFICATE_COPY.intro, register)}
        </p>
      </header>

      <section className="mt-8 rounded-2xl border border-hairline bg-panel p-5 sm:p-7">
        <p
          className={`flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-wider ${
            eligible ? "text-acid" : ready ? "text-gold" : "text-ash"
          }`}
        >
          <span aria-hidden="true">{!ready ? "·" : eligible ? "✓" : "×"}</span>
          <span>
            {copy(
              !ready
                ? CERTIFICATE_COPY.loading
                : eligible
                  ? CERTIFICATE_COPY.frontendReady
                  : CERTIFICATE_COPY.locked,
              register,
            )}
          </span>
        </p>

        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {curriculum.courses.map((course) => {
            const complete = ready && progress[course.id].isComplete;
            return (
              <li key={course.id} className="rounded-lg border border-hairline bg-raised px-4 py-3">
                <p className="font-mono text-[11px] text-ash">{course.project}</p>
                <p className={`mt-2 flex items-center gap-1.5 text-[13px] ${complete ? "text-acid" : "text-ash"}`}>
                  <span aria-hidden="true">{complete ? "✓" : "×"}</span>
                  <span>{copy(complete ? CERTIFICATE_COPY.projectDone : CERTIFICATE_COPY.projectOpen, register)}</span>
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="relative mt-6 overflow-hidden rounded-2xl border border-plasma/35 bg-raised p-6 sm:p-10">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-plasma">
          <span aria-hidden="true">· </span>
          {copy(CERTIFICATE_COPY.preview, register)}
        </p>
        <div className="mt-8 border-y border-hairline py-8 text-center sm:py-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
            Web Foundations
          </p>
          <h2 className="mt-3 font-display text-[32px] font-bold tracking-tight text-chalk sm:text-[42px]">
            Certificate of Completion
          </h2>
          <p className="mt-7 text-[14px] text-ash">{copy(CERTIFICATE_COPY.learner, register)}</p>
          <p className="mt-2 font-display text-[24px] font-bold text-chalk">________________</p>
          <p className="mx-auto mt-6 max-w-[50ch] text-[15px] leading-relaxed text-ash">
            {copy(CERTIFICATE_COPY.completedPath, register)}
          </p>
        </div>
        <p className="mt-6 flex items-start gap-2 text-[14px] leading-relaxed text-ash">
          <span aria-hidden="true">·</span>
          <span>{copy(CERTIFICATE_COPY.wordingOpen, register)}</span>
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-gold/40 bg-panel p-5 sm:p-6">
        <p className="flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-wider text-gold">
          <span aria-hidden="true">×</span>
          <span>{copy(CERTIFICATE_COPY.disconnected, register)}</span>
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-ash">
          {copy(CERTIFICATE_COPY.disconnectedHelp, register)}
        </p>
        <Link
          href="/projects"
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-hairline px-4 py-3 font-mono text-[12px] text-chalk transition-colors hover:border-ash/70"
        >
          <span>{copy(CERTIFICATE_COPY.viewProjects, register)}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
