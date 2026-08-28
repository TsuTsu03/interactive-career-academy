"use client";

import { useEffect, useState } from "react";
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
  return <main className="min-h-[100dvh] bg-void px-4 py-10 text-chalk sm:px-8"><article className="mx-auto max-w-[900px] border border-plasma/40 bg-panel p-6 sm:p-12"><p className="flex items-center justify-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-acid"><Icon name="check_circle" size={16} filled /> Server-issued CodeDaddy record</p><div className="my-9 border-y border-hairline py-10 text-center"><p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ash">Front-End Development</p><h1 className="mt-4 font-display text-[38px] font-bold sm:text-[54px]">Certificate of Completion</h1><p className="mt-8 text-ash">Presented to</p><p className="mt-2 font-display text-[30px] font-bold text-primary sm:text-[38px]">{record.display_name}</p><p className="mx-auto mt-7 max-w-[58ch] leading-relaxed text-ash">Completed ten guided courses and five independent capstone projects recorded by CodeDaddy.</p></div><div className="flex flex-wrap justify-center gap-3"><a href={record.portfolio_url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-lg bg-primary px-5 font-mono text-[12px] font-bold text-on-primary">Open portfolio</a><a href={record.repository_url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-lg border border-hairline px-5 font-mono text-[12px]">Portfolio source</a></div><p className="mt-8 text-center text-[13px] leading-relaxed text-ash">Issued {new Date(record.issued_at).toLocaleDateString("en-PH", { dateStyle: "long" })}. This is a completion record, not accreditation, employment readiness, or independent competency certification.</p><p className="mt-3 break-all text-center font-mono text-[10px] text-ash">Record {record.code}</p></article></main>;
}
