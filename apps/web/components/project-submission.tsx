"use client";

import { SiteFooter } from "@/components/site-footer";
import { Icon } from "@/components/icon";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProductNav } from "@/components/product-nav";
import { useCurriculumProgress } from "@/hooks/use-curriculum-progress";
import { type Copy, type Course } from "@/lib/lesson-ir";
import { courseSessionSnapshotFromStorage, courseStorageKey } from "@/lib/progress";
import {
  freshSubmissionDraft,
  restoreSubmissionDraft,
  validateLiveUrl,
  validateRepositoryUrl,
  type SubmissionDraft,
  type SubmissionFieldError,
} from "@/lib/submission";

const SUBMISSION_COPY = {
  back: "Back to projects",
  heading: "Prepare your project links.",
  intro: "Add the code link and the live project link. They stay in this browser.",
  loading: "Loading project",
  locked: "Finish this project first",
  lockedHelp: "Complete every step before you prepare the links.",
  continue: "Keep building",
  draftOnly: "Draft only",
  draftHelp: "Nothing is uploaded or checked yet.",
  repository: "GitHub code link",
  repositoryHelp: "Use a link that starts with github.com.",
  repositoryPlaceholder: "https://github.com/your-name/project",
  live: "Live project link",
  liveHelp: "Use the page people can open in a browser.",
  livePlaceholder: "https://your-project.example",
  save: "Save draft here",
  saved: "Draft saved",
  saveError: "The draft was not saved. Check browser storage and try again.",
  finalUnavailable: "Final submission is not connected",
  required: "Add this link.",
  invalidUrl: "Enter a full web link.",
  notGithub: "Use a github.com link.",
  notRepository: "Use a link to one GitHub project.",
} satisfies Record<string, Copy>;

type SaveStatus = "idle" | "saved" | "error";

function errorCopy(error: SubmissionFieldError): Copy | null {
  if (error === "required") return SUBMISSION_COPY.required;
  if (error === "not-github") return SUBMISSION_COPY.notGithub;
  if (error === "not-repository") return SUBMISSION_COPY.notRepository;
  if (error === "invalid-url") return SUBMISSION_COPY.invalidUrl;
  return null;
}

export function ProjectSubmission({ course }: { course: Course }) {
  const { ready, progress } = useCurriculumProgress();
  const [draft, setDraft] = useState<SubmissionDraft>(freshSubmissionDraft);
  const [errors, setErrors] = useState<{
    repositoryUrl: SubmissionFieldError;
    liveUrl: SubmissionFieldError;
  }>({ repositoryUrl: null, liveUrl: null });
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const repositoryRef = useRef<HTMLInputElement>(null);
  const liveRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const snapshot = courseSessionSnapshotFromStorage(
      course,
      localStorage.getItem(courseStorageKey(course.id)),
    );
    // Browser storage is unavailable during SSR, so restore the draft after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft(restoreSubmissionDraft(snapshot?.record.submissionDraft));
  }, [course]);

  const courseProgress = progress[course.id];
  const unlocked = ready && courseProgress.isComplete;
  const repositoryError = errorCopy(errors.repositoryUrl);
  const liveError = errorCopy(errors.liveUrl);

  function change(field: keyof SubmissionDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: null }));
    setSaveStatus("idle");
  }

  function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = {
      repositoryUrl: validateRepositoryUrl(draft.repositoryUrl),
      liveUrl: validateLiveUrl(draft.liveUrl),
    };
    setErrors(nextErrors);
    if (nextErrors.repositoryUrl || nextErrors.liveUrl) {
      (nextErrors.repositoryUrl ? repositoryRef.current : liveRef.current)?.focus();
      return;
    }

    const snapshot = courseSessionSnapshotFromStorage(
      course,
      localStorage.getItem(courseStorageKey(course.id)),
    );
    if (!snapshot) {
      setSaveStatus("error");
      return;
    }

    try {
      localStorage.setItem(
        courseStorageKey(course.id),
        JSON.stringify({
          ...snapshot.record,
          submissionDraft: {
            repositoryUrl: draft.repositoryUrl.trim(),
            liveUrl: draft.liveUrl.trim(),
          },
        }),
      );
      setDraft({
        repositoryUrl: draft.repositoryUrl.trim(),
        liveUrl: draft.liveUrl.trim(),
      });
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-on-background">
      <ProductNav current="projects" />
      <main className="mx-auto w-full flex-1 max-w-[900px] px-margin-mobile py-8 md:px-margin-desktop md:py-12">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center gap-2 font-mono text-[12px] text-ash transition-colors hover:text-chalk"
        >
          <Icon name="arrow_back" size={16} />
          <span>{SUBMISSION_COPY.back}</span>
        </Link>

        <header className="mt-5 max-w-[720px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-voltage">
              {course.project}
            </span>
          </div>
          <h1 className="mt-4 font-display text-[36px] font-bold leading-[1.08] tracking-tight text-chalk sm:text-[44px]">
            {SUBMISSION_COPY.heading}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ash">
            {SUBMISSION_COPY.intro}
          </p>
        </header>

        {!ready ? (
          <section className="mt-8 rounded-2xl border border-hairline bg-panel p-6">
            <p className="flex items-center gap-2 font-mono text-[13px] text-ash">
              <Icon name="schedule" size={16} />
              <span>{SUBMISSION_COPY.loading}</span>
            </p>
          </section>
        ) : !unlocked ? (
          <section className="mt-8 rounded-2xl border border-gold/40 bg-panel p-6 sm:p-8">
            <p className="flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-wider text-gold">
              <Icon name="lock" size={16} />
              <span>{SUBMISSION_COPY.locked}</span>
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-ash">
              {SUBMISSION_COPY.lockedHelp}
            </p>
            <Link
              href={`/learn/${course.id}`}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-hairline px-4 py-3 font-mono text-[12px] text-chalk transition-colors hover:border-ash/70"
            >
              <span>{SUBMISSION_COPY.continue}</span>
              <Icon name="arrow_forward" size={16} />
            </Link>
          </section>
        ) : (
          <form onSubmit={save} noValidate className="mt-8 rounded-2xl border border-hairline bg-panel p-5 sm:p-8">
            <div className="rounded-lg border border-voltage/30 bg-voltage/5 p-4">
              <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-voltage">
                <span aria-hidden="true">·</span>
                <span>{SUBMISSION_COPY.draftOnly}</span>
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-ash">
                {SUBMISSION_COPY.draftHelp}
              </p>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <label htmlFor="repository-url" className="text-[15px] font-semibold text-chalk">
                  {SUBMISSION_COPY.repository}
                </label>
                <p id="repository-help" className="mt-1 text-[13px] text-ash">
                  {SUBMISSION_COPY.repositoryHelp}
                </p>
                <input
                  id="repository-url"
                  ref={repositoryRef}
                  name="repositoryUrl"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  value={draft.repositoryUrl}
                  onChange={(event) => change("repositoryUrl", event.target.value)}
                  aria-describedby={`repository-help${errors.repositoryUrl ? " repository-error" : ""}`}
                  aria-invalid={Boolean(errors.repositoryUrl)}
                  placeholder={SUBMISSION_COPY.repositoryPlaceholder}
                  className="mt-3 min-h-11 w-full rounded-lg border border-hairline bg-void px-4 py-3 font-mono text-[14px] text-chalk outline-none transition-colors placeholder:text-ash/50 focus:border-voltage"
                />
                {repositoryError ? (
                  <p id="repository-error" className="mt-2 flex items-center gap-2 text-[13px] text-strike">
                    <Icon name="close" size={15} />
                    <span>{repositoryError}</span>
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="live-url" className="text-[15px] font-semibold text-chalk">
                  {SUBMISSION_COPY.live}
                </label>
                <p id="live-help" className="mt-1 text-[13px] text-ash">
                  {SUBMISSION_COPY.liveHelp}
                </p>
                <input
                  id="live-url"
                  ref={liveRef}
                  name="liveUrl"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  value={draft.liveUrl}
                  onChange={(event) => change("liveUrl", event.target.value)}
                  aria-describedby={`live-help${errors.liveUrl ? " live-error" : ""}`}
                  aria-invalid={Boolean(errors.liveUrl)}
                  placeholder={SUBMISSION_COPY.livePlaceholder}
                  className="mt-3 min-h-11 w-full rounded-lg border border-hairline bg-void px-4 py-3 font-mono text-[14px] text-chalk outline-none transition-colors placeholder:text-ash/50 focus:border-voltage"
                />
                {liveError ? (
                  <p id="live-error" className="mt-2 flex items-center gap-2 text-[13px] text-strike">
                    <Icon name="close" size={15} />
                    <span>{liveError}</span>
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="min-h-11 rounded-lg border border-voltage bg-voltage/10 px-5 py-3 font-mono text-[12px] font-bold uppercase tracking-wider text-voltage transition-colors hover:bg-voltage/15"
              >
                {SUBMISSION_COPY.save}
              </button>
              <p aria-live="polite" className={`flex items-center gap-2 text-[13px] ${saveStatus === "error" ? "text-strike" : "text-acid"}`}>
                {saveStatus === "saved" ? (
                  <><Icon name="check_circle" size={15} filled /><span>{SUBMISSION_COPY.saved}</span></>
                ) : saveStatus === "error" ? (
                  <><Icon name="close" size={15} /><span>{SUBMISSION_COPY.saveError}</span></>
                ) : null}
              </p>
            </div>

            <p className="mt-7 flex items-start gap-2 border-t border-hairline pt-5 font-mono text-[12px] leading-relaxed text-ash">
              <Icon name="schedule" size={16} className="mt-0.5" />
              <span>{SUBMISSION_COPY.finalUnavailable}</span>
            </p>
          </form>
        )}
      </main>
      <SiteFooter home="/dashboard" />
    </div>
  );
}
