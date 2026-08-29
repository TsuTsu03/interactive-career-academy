"use client";

import { useEffect, useState } from "react";
import { CertificateCard } from "@/components/certificate-card";
import { Icon } from "@/components/icon";

interface RecordData {
  code: string;
  display_name: string;
  credential_name: string;
  portfolio_url: string;
  repository_url: string;
  issued_at: string;
}

export function PublicCertificate({ code }: { code: string }) {
  const [record, setRecord] = useState<RecordData | null | undefined>(undefined);
  useEffect(() => { void fetch(`/api/certificate/${encodeURIComponent(code)}`, { cache: "no-store" }).then(async (response) => setRecord(response.ok ? ((await response.json()) as { certificate: RecordData }).certificate : null)); }, [code]);
  if (record === undefined) return <main className="flex min-h-[100dvh] items-center justify-center bg-void text-ash">Checking certificate record…</main>;
  if (record === null) return <main className="flex min-h-[100dvh] items-center justify-center bg-void p-6 text-chalk"><section className="max-w-[560px] rounded-xl border border-gold/40 bg-panel p-6"><h1 className="font-display text-[32px] font-bold">Certificate record unavailable</h1><p className="mt-3 text-ash">The code was not found, or the certificate service is not configured.</p></section></main>;
  // The public record shows the same single certificate design the learner
  // downloads, so the thing an employer opens and the thing in the learner's
  // folder are one document.
  return <main className="min-h-[100dvh] bg-background px-4 py-10 text-on-background sm:px-8"><article className="mx-auto max-w-[980px]"><p className="mb-4 flex items-center justify-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-acid"><Icon name="check_circle" size={16} filled /> Server-issued CodeDaddy record</p><CertificateCard name={record.display_name} code={record.code} issuedAt={new Date(record.issued_at).toISOString().slice(0, 10)} credential={record.credential_name} /><div className="certificate-actions mt-6 flex flex-wrap justify-center gap-3"><a href={record.portfolio_url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-lg bg-primary px-5 font-mono text-[12px] font-bold text-on-primary">Open portfolio</a><a href={record.repository_url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-lg border border-hairline px-5 font-mono text-[12px] text-on-surface">Portfolio source</a></div><p className="certificate-actions mt-8 text-center text-[13px] leading-relaxed text-ash">Issued {new Date(record.issued_at).toLocaleDateString("en-PH", { dateStyle: "long" })}. This is a completion record, not accreditation, employment readiness, or independent competency certification.</p><p className="certificate-actions mt-3 break-all text-center font-mono text-[10px] text-ash">Record {record.code}</p></article></main>;
}
