"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CertificateCard } from "@/components/certificate-card";
import { Icon } from "@/components/icon";
import { ProductNav } from "@/components/product-nav";
import { SiteFooter } from "@/components/site-footer";
import { capstones } from "@/content/capstones";
import { curriculum } from "@/content/curriculum";
import { useCurriculumProgress } from "@/hooks/use-curriculum-progress";
import { loadPracticeState } from "@/lib/practice-progress";

interface CertificateRecord {
  code: string;
  display_name: string;
  credential_name: string;
  portfolio_url: string;
  repository_url: string;
  issued_at: string;
}

interface ServerStatus {
  configured?: boolean;
  certificateIssuance?: boolean;
  signedIn?: boolean;
  ready?: boolean;
  completedCourses?: string[];
  completedCapstones?: string[];
  submittedCapstones?: string[];
  displayName?: string;
  certificate?: CertificateRecord | null;
  error?: string;
}

export function CertificateScreen() {
  const { ready, progress } = useCurriculumProgress();
  const [localCapstones, setLocalCapstones] = useState(0);
  const [server, setServer] = useState<ServerStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const localCourses = ready ? curriculum.courses.filter((course) => progress[course.id].isComplete).length : 0;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const state = loadPracticeState();
      setLocalCapstones(capstones.filter((capstone) => {
        const completion = state.completions.find((item) => item.activityId === capstone.id);
        return completion && capstone.tests.every((test) => completion.passedTestIds.includes(test.id));
      }).length);
    }, 0);
    void fetch("/api/certificate", { cache: "no-store" }).then(async (response) => setServer(await response.json() as ServerStatus));
    return () => window.clearTimeout(timer);
  }, []);

  async function issue() {
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/certificate", { method: "POST" });
    const data = await response.json() as ServerStatus & { certificate?: CertificateRecord };
    setBusy(false);
    if (!response.ok) {
      setMessage(data.error ?? "Certificate could not be issued.");
      return;
    }
    setServer((current) => ({ ...current, certificate: data.certificate, ready: true }));
    setMessage("Certificate issued. The public record is ready to share.");
  }

  const certificate = server?.certificate;
  return <div className="flex min-h-[100dvh] flex-col bg-background text-on-background"><ProductNav current="certificate" /><main className="mx-auto w-full max-w-[980px] flex-1 px-margin-mobile py-8 md:px-margin-desktop md:py-12"><header className="max-w-[720px]"><p className="font-mono text-[11px] uppercase tracking-[0.25em] text-voltage">Certificate</p><h1 className="mt-4 font-display text-[38px] font-bold leading-tight text-chalk sm:text-[46px]">A completion record backed by your saved work.</h1><p className="mt-4 text-[17px] leading-relaxed text-ash">The Front-End Development Certificate of Completion requires ten guided courses, five independent capstones, five project-link records, and a saved certificate name.</p></header>

  <section className="mt-8 grid gap-3 sm:grid-cols-3"><Requirement label="Guided courses" value={`${localCourses} / ${curriculum.courses.length}`} done={localCourses === curriculum.courses.length} /><Requirement label="Capstones" value={`${localCapstones} / ${capstones.length}`} done={localCapstones === capstones.length} /><Requirement label="Account submissions" value={`${server?.submittedCapstones?.length ?? 0} / ${capstones.length}`} done={server?.submittedCapstones?.length === capstones.length} /></section>

  <section className="certificate-block mt-6">
    <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-plasma"><Icon name="workspace_premium" size={16} className="mr-1 inline-block align-text-bottom" />{certificate ? "Issued record" : "Certificate preview"}</p>
    <CertificateCard
      name={certificate?.display_name || server?.displayName || "Your saved certificate name"}
      code={certificate?.code}
      issuedAt={certificate?.issued_at ? new Date(certificate.issued_at).toISOString().slice(0, 10) : undefined}
    />
  </section>

  <section className="mt-6 rounded-2xl border border-hairline bg-panel p-5 sm:p-6">{certificate ? <><p className="flex items-center gap-2 font-mono text-[12px] font-bold uppercase text-acid"><Icon name="check_circle" size={16} filled /> Issued {new Date(certificate.issued_at).toLocaleDateString("en-PH", { dateStyle: "long" })}</p><div className="mt-5 flex flex-wrap gap-3"><Link href={`/certificate/${certificate.code}`} className="inline-flex min-h-11 items-center rounded-lg bg-primary px-5 font-mono text-[12px] font-bold text-on-primary">Open public record</Link><a href={certificate.portfolio_url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-lg border border-hairline px-5 font-mono text-[12px] text-chalk">Portfolio</a></div></> : server?.signedIn ? <><p className={`flex items-center gap-2 font-mono text-[12px] font-bold uppercase ${server.ready ? "text-acid" : "text-gold"}`}><Icon name={server.ready ? "check_circle" : "lock"} size={16} filled={server.ready} />{server.ready ? "All account requirements recorded" : "Account requirements still open"}</p><p className="mt-3 text-[14px] leading-relaxed text-ash">Merge your browser progress from Account, record all five capstone links, and save your certificate name. Issuance uses the server-only key; the browser cannot mint a certificate directly.</p><button onClick={() => void issue()} disabled={!server.ready || !server.certificateIssuance || busy} className="mt-5 min-h-11 rounded-lg bg-primary px-5 font-mono text-[12px] font-bold text-on-primary disabled:opacity-50">{busy ? "Issuing…" : "Issue certificate"}</button></> : <><p className="flex items-center gap-2 font-mono text-[12px] font-bold uppercase text-gold"><Icon name="lock" size={16} /> Account connection required</p><p className="mt-3 text-[14px] text-ash">Sign in and sync your completed browser work before the server can issue a public record.</p><Link href="/account" className="mt-5 inline-flex min-h-11 items-center rounded-lg border border-hairline px-5 font-mono text-[12px] text-chalk">Open account</Link></>}{message ? <p role="status" className="mt-4 text-[13px] text-gold">{message}</p> : null}</section>
  </main><SiteFooter home="/dashboard" /></div>;
}

function Requirement({ label, value, done }: { label: string; value: string; done: boolean }) {
  return <div className="rounded-xl border border-hairline bg-panel p-4"><p className={`flex items-center gap-2 font-mono text-[11px] font-bold uppercase ${done ? "text-acid" : "text-ash"}`}><Icon name={done ? "check_circle" : "radio_button_unchecked"} size={15} filled={done} />{label}</p><p className="mt-2 font-display text-[26px] font-bold text-chalk">{value}</p></div>;
}
