"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import type { PracticeActivity } from "@/lib/practice-ir";
import { loadPracticeState, savePracticeState } from "@/lib/practice-progress";
import { freshSubmissionDraft, validateSecureLiveUrl, validateSecureRepositoryUrl, type SubmissionDraft } from "@/lib/submission";

type Status = "idle" | "local" | "submitted" | "error";

export function CapstoneSubmission({ capstone }: { capstone: PracticeActivity }) {
  const [ready, setReady] = useState(false);
  const [complete, setComplete] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [draft, setDraft] = useState<SubmissionDraft>(freshSubmissionDraft);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let live = true;
    const timer = window.setTimeout(() => {
      const state = loadPracticeState();
      const completion = state.completions.find((item) => item.activityId === capstone.id);
      setComplete(Boolean(completion && capstone.tests.every((test) => completion.passedTestIds.includes(test.id))));
      setDraft(state.submissionDrafts[capstone.id] ?? freshSubmissionDraft());
      setReady(true);
    }, 0);
    void fetch("/api/auth/session", { cache: "no-store" }).then(async (response) => {
      const session = await response.json() as { user?: unknown };
      if (!live) return;
      setSignedIn(Boolean(session.user));
      if (session.user) {
        const submissions = await fetch("/api/submissions", { cache: "no-store" });
        if (submissions.ok) {
          const data = await submissions.json() as { submissions: { project_id: string; repository_url: string; live_url: string }[] };
          const remote = data.submissions.find((item) => item.project_id === capstone.id);
          if (remote && live) setDraft({ repositoryUrl: remote.repository_url, liveUrl: remote.live_url });
        }
      }
    });
    return () => { live = false; window.clearTimeout(timer); };
  }, [capstone]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const repositoryError = validateSecureRepositoryUrl(draft.repositoryUrl);
    const liveError = validateSecureLiveUrl(draft.liveUrl);
    if (repositoryError || liveError) {
      setStatus("error");
      setMessage("Use one GitHub project link and one full HTTPS live-project link.");
      return;
    }
    const state = loadPracticeState();
    savePracticeState({ ...state, submissionDrafts: { ...state.submissionDrafts, [capstone.id]: { repositoryUrl: draft.repositoryUrl.trim(), liveUrl: draft.liveUrl.trim() } } });
    if (!signedIn) {
      setStatus("local");
      setMessage("Draft saved in this browser. Sign in to record it with your account.");
      return;
    }
    const response = await fetch("/api/submissions", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ projectId: capstone.id, ...draft }) });
    const data = await response.json() as { error?: string };
    setStatus(response.ok ? "submitted" : "error");
    setMessage(response.ok ? "Links recorded with your account. URL availability is not independently certified." : data.error ?? "The links could not be recorded.");
  }

  if (!ready) return <main className="min-h-[100dvh] bg-void p-6 text-ash">Loading capstone record…</main>;
  if (!complete) return <main className="flex min-h-[100dvh] items-center justify-center bg-void p-5 text-chalk"><section className="max-w-[560px] rounded-xl border border-gold/40 bg-panel p-6"><p className="font-mono text-[11px] font-bold uppercase tracking-wider text-gold">Submission locked</p><h1 className="mt-3 font-display text-[30px] font-bold">Finish this capstone first.</h1><p className="mt-3 text-ash">Every authored acceptance check must pass before project links can be recorded.</p><Link href={`/capstones/${capstone.id}`} className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-primary px-5 font-mono text-[12px] font-bold text-on-primary">Return to capstone</Link></section></main>;
  return <main className="min-h-[100dvh] bg-void px-margin-mobile py-8 text-chalk md:px-margin-desktop"><div className="mx-auto max-w-[760px]"><Link href="/capstones" className="font-mono text-[11px] font-bold uppercase text-primary">← Capstones</Link><p className="mt-8 font-mono text-[11px] font-bold uppercase tracking-wider text-acid">Completed capstone</p><h1 className="mt-3 font-display text-[38px] font-bold">Record {capstone.title}</h1><p className="mt-3 text-[16px] leading-relaxed text-ash">Add the repository and live deployment. CodeDaddy records the links; it does not claim the destinations were independently reviewed.</p><form onSubmit={submit} className="mt-7 space-y-6 rounded-xl border border-hairline bg-panel p-5 sm:p-7"><Field id="capstone-repository" label="GitHub repository" value={draft.repositoryUrl} placeholder="https://github.com/your-name/project" onChange={(repositoryUrl) => setDraft((current) => ({ ...current, repositoryUrl }))} /><Field id="capstone-live" label="Live HTTPS project" value={draft.liveUrl} placeholder="https://your-project.example" onChange={(liveUrl) => setDraft((current) => ({ ...current, liveUrl }))} /><button className="min-h-11 rounded-lg bg-primary px-5 font-mono text-[12px] font-bold text-on-primary">{signedIn ? "Record with account" : "Save browser draft"}</button>{message ? <p role="status" className={`flex items-start gap-2 text-[13px] ${status === "error" ? "text-strike" : status === "submitted" ? "text-acid" : "text-gold"}`}><Icon name={status === "error" ? "close" : status === "submitted" ? "check_circle" : "download"} size={16} filled={status === "submitted"} />{message}</p> : null}</form></div></main>;
}

function Field({ id, label, value, placeholder, onChange }: { id: string; label: string; value: string; placeholder: string; onChange: (value: string) => void }) {
  return <div><label htmlFor={id} className="text-[14px] font-semibold">{label}</label><input id={id} type="url" required value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-hairline bg-void px-4 font-mono text-[13px] text-chalk" /></div>;
}
