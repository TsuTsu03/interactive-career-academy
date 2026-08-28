"use client";

import { type FormEvent, useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { ProductNav } from "@/components/product-nav";
import { SiteFooter } from "@/components/site-footer";
import { syncBrowserProgress } from "@/lib/account-sync";

interface SessionState {
  configured: boolean;
  certificateIssuance: boolean;
  user: { id: string; email?: string } | null;
}

type Notice = { tone: "success" | "error"; text: string } | null;

export function AccountScreen() {
  const [session, setSession] = useState<SessionState | null>(null);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);

  useEffect(() => {
    let live = true;
    void fetch("/api/auth/session", { cache: "no-store" }).then(async (response) => {
      const next = await response.json() as SessionState;
      if (!live) return;
      setSession(next);
      if (next.user) {
        const profile = await fetch("/api/profile", { cache: "no-store" });
        const data = await profile.json() as { displayName?: string };
        if (live) setDisplayName(data.displayName ?? "");
      }
    });
    return () => { live = false; };
  }, []);

  async function sendEmail(event: FormEvent) {
    event.preventDefault();
    setBusy("email");
    setNotice(null);
    const response = await fetch("/api/auth/email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    const data = await response.json() as { error?: string };
    setBusy(null);
    setNotice(response.ok ? { tone: "success", text: "Check your email for the one-time sign-in link." } : { tone: "error", text: data.error ?? "The sign-in email could not be sent." });
  }

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    setBusy("profile");
    const response = await fetch("/api/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ displayName }) });
    const data = await response.json() as { error?: string };
    setBusy(null);
    setNotice(response.ok ? { tone: "success", text: "Certificate name saved." } : { tone: "error", text: data.error ?? "The name could not be saved." });
  }

  async function sync() {
    setBusy("sync");
    setNotice(null);
    try {
      const result = await syncBrowserProgress();
      setNotice({ tone: "success", text: `Progress merged safely. ${result.restoredCourses} course records restored and ${result.savedCourses} newer browser records saved.` });
    } catch (error) {
      setNotice({ tone: "error", text: error instanceof Error ? error.message : "Progress could not be synced." });
    } finally {
      setBusy(null);
    }
  }

  async function signOut() {
    setBusy("logout");
    await fetch("/api/auth/logout", { method: "POST" });
    location.reload();
  }

  const configured = session?.configured ?? false;
  const signedIn = Boolean(session?.user);
  return <div className="flex min-h-[100dvh] flex-col bg-background text-on-background"><ProductNav current="account" /><main className="mx-auto w-full max-w-[980px] flex-1 px-margin-mobile py-8 md:px-margin-desktop md:py-12">
    <header className="max-w-[700px]"><p className="font-mono text-[11px] uppercase tracking-[0.25em] text-voltage">Account</p><h1 className="mt-4 font-display text-[38px] font-bold leading-tight text-chalk sm:text-[46px]">Keep your work with you.</h1><p className="mt-4 text-[17px] leading-relaxed text-ash">Sign in without a password, then merge this browser with your private account record.</p></header>
    <section className={`mt-8 rounded-2xl border p-5 sm:p-7 ${signedIn ? "border-acid/40" : configured ? "border-hairline" : "border-gold/40"} bg-panel`}>
      <p className={`flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-wider ${signedIn ? "text-acid" : configured ? "text-voltage" : "text-gold"}`}><Icon name={signedIn ? "check_circle" : configured ? "radio_button_unchecked" : "schedule"} size={16} filled={signedIn} />{session === null ? "Checking account connection" : signedIn ? `Signed in${session?.user?.email ? ` as ${session.user.email}` : ""}` : configured ? "Ready to connect" : "Supabase setup pending"}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-ash">{signedIn ? "Your account can store progress, current lesson code, capstone links, and certificate records. Sync remains explicit so another device never silently replaces this browser's code." : configured ? "Choose GitHub or request a one-time email link. CodeDaddy does not use passwords." : "Local learning remains available. Add the documented Supabase environment values and migration before account features can connect."}</p>
    </section>

    {!signedIn ? <div className="mt-6 grid gap-4 md:grid-cols-2"><section className="rounded-2xl border border-hairline bg-panel p-5 sm:p-6"><h2 className="font-display text-[22px] font-bold text-chalk">GitHub</h2><p className="mt-2 text-[14px] leading-relaxed text-ash">Use the same identity you will use for project repositories.</p><a aria-disabled={!configured} href={configured ? "/api/auth/github" : undefined} className={`mt-5 inline-flex min-h-11 items-center rounded-lg px-5 font-mono text-[12px] font-bold ${configured ? "bg-primary text-on-primary" : "cursor-not-allowed border border-hairline text-ash"}`}>Continue with GitHub</a></section><section className="rounded-2xl border border-hairline bg-panel p-5 sm:p-6"><h2 className="font-display text-[22px] font-bold text-chalk">Email sign-in link</h2><form className="mt-4" onSubmit={sendEmail}><label htmlFor="account-email" className="text-[13px] text-ash">Email address</label><input id="account-email" type="email" required disabled={!configured || busy === "email"} value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-hairline bg-void px-4 text-chalk disabled:opacity-60" /><button disabled={!configured || busy === "email"} className="mt-3 min-h-11 rounded-lg border border-primary px-5 font-mono text-[12px] font-bold text-primary disabled:opacity-50">{busy === "email" ? "Sending…" : "Email me a link"}</button></form></section></div> : <div className="mt-6 grid gap-4 md:grid-cols-2"><form onSubmit={saveProfile} className="rounded-2xl border border-hairline bg-panel p-5 sm:p-6"><h2 className="font-display text-[22px] font-bold text-chalk">Certificate name</h2><p className="mt-2 text-[14px] text-ash">Use the name you want shown on a public completion record.</p><label htmlFor="display-name" className="sr-only">Certificate display name</label><input id="display-name" required minLength={2} maxLength={80} value={displayName} onChange={(event) => setDisplayName(event.target.value)} className="mt-4 min-h-11 w-full rounded-lg border border-hairline bg-void px-4 text-chalk" /><button disabled={busy === "profile"} className="mt-3 min-h-11 rounded-lg border border-primary px-5 font-mono text-[12px] font-bold text-primary disabled:opacity-50">{busy === "profile" ? "Saving…" : "Save name"}</button></form><section className="rounded-2xl border border-hairline bg-panel p-5 sm:p-6"><h2 className="font-display text-[22px] font-bold text-chalk">Progress sync</h2><p className="mt-2 text-[14px] leading-relaxed text-ash">The merge keeps the course record with more completed steps. Equal browser drafts are not overwritten.</p><button onClick={() => void sync()} disabled={busy === "sync"} className="mt-4 min-h-11 rounded-lg bg-primary px-5 font-mono text-[12px] font-bold text-on-primary disabled:opacity-50">{busy === "sync" ? "Syncing…" : "Merge this browser"}</button><button onClick={() => void signOut()} disabled={busy === "logout"} className="ml-3 min-h-11 px-3 font-mono text-[12px] text-ash underline">Sign out</button></section></div>}
    {notice ? <p role="status" className={`mt-5 flex items-start gap-2 rounded-lg border p-4 text-[14px] ${notice.tone === "success" ? "border-acid/40 text-acid" : "border-strike/40 text-strike"}`}><Icon name={notice.tone === "success" ? "check_circle" : "close"} size={17} filled={notice.tone === "success"} />{notice.text}</p> : null}
  </main><SiteFooter home="/dashboard" /></div>;
}
