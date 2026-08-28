"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { ProductNav } from "@/components/product-nav";
import { SiteFooter } from "@/components/site-footer";
import { buildProofDocument, deriveEvidenceLedger, type EvidenceLedger } from "@/lib/evidence";

export function EvidenceScreen({ proof = false }: { proof?: boolean }) {
  const [ledger, setLedger] = useState<EvidenceLedger | null>(null);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const sync = () => setLedger(deriveEvidenceLedger());
    sync();
    window.addEventListener("codedaddy-practice-changed", sync);
    window.addEventListener("codedaddy-progress-imported", sync);
    return () => {
      window.removeEventListener("codedaddy-practice-changed", sync);
      window.removeEventListener("codedaddy-progress-imported", sync);
    };
  }, []);

  function downloadProof() {
    if (!ledger) return;
    const html = buildProofDocument(ledger, new Date().toLocaleDateString("en-PH", { dateStyle: "long" }));
    const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "codedaddy-learning-proof.html";
    anchor.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-on-background">
      <ProductNav current="evidence" />
      <main className="mx-auto w-full max-w-[1080px] flex-1 px-margin-mobile py-8 md:px-margin-desktop md:py-12">
        <header className="max-w-[800px]">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">{proof ? "Proof page" : "Skill Evidence Ledger"}</p>
          <h1 className="mt-4 font-display text-[38px] font-bold leading-tight text-chalk sm:text-[48px]">{proof ? "Evidence you can carry with you." : "What your completed checks actually show."}</h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ash">This page is derived from completed lesson checks, named projects, and independent practice in this browser. There is no field for adding your own claim.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={downloadProof} disabled={!ledger} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 font-mono text-[12px] font-bold text-on-primary disabled:opacity-50"><Icon name="download" size={17} /> Download self-contained proof</button>
            {!proof ? <Link href="/proof" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-hairline px-5 font-mono text-[12px] font-bold text-chalk">Preview proof page <Icon name="arrow_forward" size={16} /></Link> : <Link href="/evidence" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-hairline px-5 font-mono text-[12px] font-bold text-chalk"><Icon name="arrow_back" size={16} /> Private ledger</Link>}
          </div>
          {downloaded ? <p role="status" className="mt-4 flex items-center gap-2 text-[13px] text-acid"><Icon name="check_circle" size={16} filled /> Proof file downloaded.</p> : null}
        </header>

        <section className="mt-8 rounded-xl border border-gold/40 bg-panel p-5" aria-labelledby="evidence-limit-heading">
          <h2 id="evidence-limit-heading" className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-gold"><Icon name="visibility" size={17} /> Honest limit</h2>
          <p className="mt-2 max-w-[760px] text-[14px] leading-relaxed text-ash">This private ledger is derived from this browser and can be changed by someone with access to the device. Account sync preserves the record; only the separately issued certificate has a server record. Neither is employment readiness, accreditation, or independent competency certification.</p>
        </section>

        {ledger ? (
          <>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
              <Stat label="Steps" value={ledger.totals.completedSteps} />
              <Stat label="Checks" value={ledger.totals.passedChecks} />
              <Stat label="Projects" value={ledger.totals.completedProjects} />
              <Stat label="Independent" value={ledger.totals.completedPractice} />
              <Stat label="Capstones" value={ledger.totals.completedCapstones} />
            </div>
            <div className="mt-6 space-y-5">
              {ledger.courses.map((course) => (
                <section key={course.id} className="rounded-xl border border-hairline bg-panel p-5 sm:p-6">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-acid">{course.completedSteps} of {course.totalSteps} guided steps</p>
                  <h2 className="mt-2 font-display text-[24px] font-bold text-chalk">{course.title}</h2>
                  {course.artifact ? <p className="mt-3 flex flex-wrap gap-4 text-[13px]"><a href={course.artifact.liveUrl} target="_blank" rel="noreferrer" className="text-primary underline">Live project</a><a href={course.artifact.repositoryUrl} target="_blank" rel="noreferrer" className="text-primary underline">Source repository</a></p> : null}
                  <div className="mt-5 space-y-2">
                    {course.projects.map((project) => (
                      <details key={project.id} className="rounded-lg border border-hairline bg-raised p-4">
                        <summary className="cursor-pointer font-semibold text-chalk">{project.title} · {project.complete ? "Complete" : `${project.completedSteps} of ${project.totalSteps} steps`}</summary>
                        {project.concepts.length ? <p className="mt-3 text-[13px] text-ash"><strong className="text-chalk">Concepts:</strong> {project.concepts.map((concept) => concept.term).join(", ")}</p> : null}
                        <ul className="mt-3 space-y-2 text-[13px] text-ash">{project.checks.map((check) => <li key={check.id} className="flex items-start gap-2"><Icon name="check_circle" size={15} filled className="mt-0.5 text-acid" /><span><span className="sr-only">Passed: </span>{check.label}</span></li>)}</ul>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
              {ledger.practice.length ? (
                <section className="rounded-xl border border-hairline bg-panel p-5 sm:p-6">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-plasma">Independent practice</p>
                  <h2 className="mt-2 font-display text-[24px] font-bold text-chalk">Rebuilds, repairs, constraints, remixes, and capstones</h2>
                  <ul className="mt-4 grid gap-3 md:grid-cols-2">{ledger.practice.map((item) => <li key={item.id} className="rounded-lg border border-hairline bg-raised p-4"><p className="font-semibold text-chalk">{item.title}</p><p className="mt-1 text-[13px] text-ash">{item.mode === "rebuild" ? "Rebuild Mode" : item.mode === "bug-clinic" ? "Bug Clinic" : item.mode === "constraint" ? "Constraint Mission" : item.mode === "remix" ? "Project Remix" : "Capstone"} · {item.checks.length} {item.checks.length === 1 ? "check" : "checks"} passed</p></li>)}</ul>
                </section>
              ) : null}
              {ledger.courses.length === 0 && ledger.practice.length === 0 ? <section className="rounded-xl border border-hairline bg-panel p-6 text-ash">No evidence yet. Complete a lesson check or an optional practice activity, then return here.</section> : null}
            </div>
          </>
        ) : <p className="mt-8 flex items-center gap-2 text-ash"><Icon name="schedule" size={16} /> Loading browser evidence</p>}
      </main>
      <SiteFooter home="/dashboard" />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div data-evidence-stat={label.toLowerCase()} className="rounded-xl border border-hairline bg-panel p-4"><p className="font-mono text-[24px] font-bold text-chalk">{value}</p><p className="mt-1 text-[11px] uppercase tracking-wider text-ash">{label}</p></div>;
}
