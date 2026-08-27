"use client";

import { SiteFooter } from "@/components/site-footer";
import { Icon } from "@/components/icon";
import { ProductNav } from "@/components/product-nav";
import { type Copy } from "@/lib/lesson-ir";

const ACCOUNT_COPY = {
  eyebrow: "Account",
  heading: "Keep your work with you.",
  intro: "Account connection comes after the frontend is finished.",
  disconnected: "Not connected",
  localProgress: "For now, this browser saves your course work.",
  github: "Continue with GitHub",
  githubHelp: "GitHub will connect your projects later.",
  email: "Email sign-in link",
  emailHelp: "Get a one-time link. No password needed.",
  planned: "Planned sign-in",
  noPassword: "No passwords",
  noPasswordHelp: "You will use GitHub or a one-time email link.",
} satisfies Record<string, Copy>;

export function AccountScreen() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-on-background">
      <ProductNav current="account" />
      <main className="mx-auto w-full flex-1 max-w-[980px] px-margin-mobile py-8 md:px-margin-desktop md:py-12">

        <header className="max-w-[680px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-voltage">
              {ACCOUNT_COPY.eyebrow}
            </span>
          </div>
          <h1 className="mt-4 font-display text-[38px] font-bold leading-[1.05] tracking-tight text-chalk sm:text-[46px]">
            {ACCOUNT_COPY.heading}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ash">
            {ACCOUNT_COPY.intro}
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-gold/40 bg-panel p-5 sm:p-7">
          <p className="flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-wider text-gold">
            <Icon name="lock" size={16} />
            <span>{ACCOUNT_COPY.disconnected}</span>
          </p>
          <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-ash">
            {ACCOUNT_COPY.localProgress}
          </p>
        </section>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {([
            [ACCOUNT_COPY.github, ACCOUNT_COPY.githubHelp, "GH"],
            [ACCOUNT_COPY.email, ACCOUNT_COPY.emailHelp, "@"],
          ] as const).map(([title, description, mark]) => (
            <section key={mark} className="rounded-2xl border border-hairline bg-panel p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-hairline bg-raised font-mono text-[12px] font-bold text-chalk"
                >
                  {mark}
                </span>
                <div>
                  <h2 className="font-display text-[20px] font-bold text-chalk">
                    {title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-ash">
                    {description}
                  </p>
                </div>
              </div>
              <p className="mt-5 flex min-h-11 items-center gap-2 rounded-lg border border-hairline px-4 font-mono text-[12px] text-ash">
                <Icon name="schedule" size={16} />
                <span>{ACCOUNT_COPY.planned}</span>
              </p>
            </section>
          ))}
        </div>

        <section className="mt-6 rounded-2xl border border-acid/30 bg-panel p-5 sm:p-6">
          <p className="flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-wider text-acid">
            <Icon name="check_circle" size={16} filled />
            <span>{ACCOUNT_COPY.noPassword}</span>
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ash">
            {ACCOUNT_COPY.noPasswordHelp}
          </p>
        </section>
      </main>
      <SiteFooter home="/dashboard" />
    </div>
  );
}
