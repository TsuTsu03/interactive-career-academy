"use client";

import { ProductNav } from "@/components/product-nav";
import { RegisterToggle } from "@/components/register-toggle";
import { useCurriculumProgress } from "@/hooks/use-curriculum-progress";
import { copy, type Copy } from "@/lib/lesson-ir";

const ACCOUNT_COPY = {
  eyebrow: { simple: "Account", standard: "Account" },
  heading: { simple: "Keep your work with you.", standard: "Your learning account" },
  intro: {
    simple: "Account connection comes after the frontend is finished.",
    standard: "Authentication is intentionally disconnected during frontend development.",
  },
  disconnected: { simple: "Not connected", standard: "Account not connected" },
  localProgress: {
    simple: "For now, this browser saves your course work.",
    standard: "Course progress currently stays in this browser only.",
  },
  github: { simple: "Continue with GitHub", standard: "Continue with GitHub" },
  githubHelp: {
    simple: "GitHub will connect your projects later.",
    standard: "GitHub OAuth will connect project repositories after the frontend freeze.",
  },
  email: { simple: "Email sign-in link", standard: "Email magic link" },
  emailHelp: {
    simple: "Get a one-time link. No password needed.",
    standard: "Email authentication will use a one-time magic link, never a password.",
  },
  planned: { simple: "Planned sign-in", standard: "Connection pending" },
  noPassword: { simple: "No passwords", standard: "Password-free by design" },
  noPasswordHelp: {
    simple: "You will use GitHub or a one-time email link.",
    standard: "The product will support GitHub OAuth and email magic links only.",
  },
} satisfies Record<string, Copy>;

export function AccountScreen() {
  const { register, setRegister } = useCurriculumProgress();

  return (
    <main className="mx-auto min-h-[100dvh] max-w-[980px] px-5 py-8 sm:px-6 sm:py-12">
      <ProductNav current="account" register={register} />

      <header className="max-w-[680px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-voltage">
            {copy(ACCOUNT_COPY.eyebrow, register)}
          </span>
          <RegisterToggle register={register} onChange={setRegister} />
        </div>
        <h1 className="mt-4 font-display text-[38px] font-bold leading-[1.05] tracking-tight text-chalk sm:text-[46px]">
          {copy(ACCOUNT_COPY.heading, register)}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ash">
          {copy(ACCOUNT_COPY.intro, register)}
        </p>
      </header>

      <section className="mt-8 rounded-2xl border border-gold/40 bg-panel p-5 sm:p-7">
        <p className="flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-wider text-gold">
          <span aria-hidden="true">×</span>
          <span>{copy(ACCOUNT_COPY.disconnected, register)}</span>
        </p>
        <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-ash">
          {copy(ACCOUNT_COPY.localProgress, register)}
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
                  {copy(title, register)}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ash">
                  {copy(description, register)}
                </p>
              </div>
            </div>
            <p className="mt-5 flex min-h-11 items-center gap-2 rounded-lg border border-hairline px-4 font-mono text-[12px] text-ash">
              <span aria-hidden="true">·</span>
              <span>{copy(ACCOUNT_COPY.planned, register)}</span>
            </p>
          </section>
        ))}
      </div>

      <section className="mt-6 rounded-2xl border border-acid/30 bg-panel p-5 sm:p-6">
        <p className="flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-wider text-acid">
          <span aria-hidden="true">✓</span>
          <span>{copy(ACCOUNT_COPY.noPassword, register)}</span>
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-ash">
          {copy(ACCOUNT_COPY.noPasswordHelp, register)}
        </p>
      </section>
    </main>
  );
}
