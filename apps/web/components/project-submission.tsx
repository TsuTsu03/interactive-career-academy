"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProductNav } from "@/components/product-nav";
import { RegisterToggle } from "@/components/register-toggle";
import { useCurriculumProgress } from "@/hooks/use-curriculum-progress";
import { copy, type Copy, type Course } from "@/lib/lesson-ir";
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
  back: { simple: "Back to projects", standard: "Back to projects" },
  heading: { simple: "Prepare your project links.", standard: "Prepare a submission draft" },
  intro: {
    simple: "Add the code link and the live project link. They stay in this browser.",
    standard: "Add the repository and deployment URLs that will be verified after backend connection.",
  },
  loading: { simple: "Loading project", standard: "Loading project progress" },
  locked: { simple: "Finish this project first", standard: "Course project incomplete" },
  lockedHelp: {
    simple: "Complete every step before you prepare the links.",
    standard: "Complete every course step before preparing its submission draft.",
  },
  continue: { simple: "Keep building", standard: "Continue course" },
  draftOnly: { simple: "Draft only", standard: "Local draft only" },
  draftHelp: {
    simple: "Nothing is uploaded or checked yet.",
    standard: "Saving does not submit, upload, or verify either URL.",
  },
  repository: { simple: "GitHub code link", standard: "GitHub repository URL" },
  repositoryHelp: {
    simple: "Use a link that starts with github.com.",
    standard: "Use the public GitHub repository for this project.",
  },
  repositoryPlaceholder: {
    simple: "https://github.com/your-name/project",
    standard: "https://github.com/your-name/project",
  },
  live: { simple: "Live project link", standard: "Live deployment URL" },
  liveHelp: {
    simple: "Use the page people can open in a browser.",
    standard: "Use the public deployment that displays the finished project.",
  },
  livePlaceholder: {
    simple: "https://your-project.example",
    standard: "https://your-project.example",
  },
  save: { simple: "Save draft here", standard: "Save local draft" },
  saved: { simple: "Draft saved", standard: "Draft saved in this browser" },
  saveError: {
    simple: "The draft was not saved. Check browser storage and try again.",
    standard: "The local draft could not be saved. Check browser storage and try again.",
  },
  finalUnavailable: {
    simple: "Final submission is not connected",
    standard: "Final submission and verification are not connected",
  },
  required: { simple: "Add this link.", standard: "This URL is required." },
  invalidUrl: { simple: "Enter a full web link.", standard: "Enter a valid HTTP or HTTPS URL." },
  notGithub: { simple: "Use a github.com link.", standard: "The repository URL must use github.com." },
  notRepository: {
    simple: "Use a link to one GitHub project.",
    standard: "Enter a GitHub repository URL with an owner and repository name.",
  },
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
  const { ready, register, progress, setRegister } = useCurriculumProgress();
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
    <main className="mx-auto min-h-[100dvh] max-w-[900px] px-5 py-8 sm:px-6 sm:py-12">
      <ProductNav current="projects" register={register} />
      <Link
        href="/projects"
        className="inline-flex min-h-11 items-center gap-2 font-mono text-[12px] text-ash transition-colors hover:text-chalk"
      >
        <span aria-hidden="true">←</span>
        <span>{copy(SUBMISSION_COPY.back, register)}</span>
      </Link>

      <header className="mt-5 max-w-[720px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-voltage">
            {course.project}
          </span>
          <RegisterToggle register={register} onChange={setRegister} />
        </div>
        <h1 className="mt-4 font-display text-[36px] font-bold leading-[1.08] tracking-tight text-chalk sm:text-[44px]">
          {copy(SUBMISSION_COPY.heading, register)}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ash">
          {copy(SUBMISSION_COPY.intro, register)}
        </p>
      </header>

      {!ready ? (
        <section className="mt-8 rounded-2xl border border-hairline bg-panel p-6">
          <p className="flex items-center gap-2 font-mono text-[13px] text-ash">
            <span aria-hidden="true">·</span>
            <span>{copy(SUBMISSION_COPY.loading, register)}</span>
          </p>
        </section>
      ) : !unlocked ? (
        <section className="mt-8 rounded-2xl border border-gold/40 bg-panel p-6 sm:p-8">
          <p className="flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-wider text-gold">
            <span aria-hidden="true">×</span>
            <span>{copy(SUBMISSION_COPY.locked, register)}</span>
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-ash">
            {copy(SUBMISSION_COPY.lockedHelp, register)}
          </p>
          <Link
            href={`/learn/${course.id}`}
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-hairline px-4 py-3 font-mono text-[12px] text-chalk transition-colors hover:border-ash/70"
          >
            <span>{copy(SUBMISSION_COPY.continue, register)}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      ) : (
        <form onSubmit={save} noValidate className="mt-8 rounded-2xl border border-hairline bg-panel p-5 sm:p-8">
          <div className="rounded-lg border border-voltage/30 bg-voltage/5 p-4">
            <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-voltage">
              <span aria-hidden="true">·</span>
              <span>{copy(SUBMISSION_COPY.draftOnly, register)}</span>
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-ash">
              {copy(SUBMISSION_COPY.draftHelp, register)}
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <label htmlFor="repository-url" className="text-[15px] font-semibold text-chalk">
                {copy(SUBMISSION_COPY.repository, register)}
              </label>
              <p id="repository-help" className="mt-1 text-[13px] text-ash">
                {copy(SUBMISSION_COPY.repositoryHelp, register)}
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
                placeholder={copy(SUBMISSION_COPY.repositoryPlaceholder, register)}
                className="mt-3 min-h-11 w-full rounded-lg border border-hairline bg-canvas px-4 py-3 font-mono text-[14px] text-chalk outline-none transition-colors placeholder:text-ash/50 focus:border-voltage"
              />
              {repositoryError ? (
                <p id="repository-error" className="mt-2 flex items-center gap-2 text-[13px] text-danger">
                  <span aria-hidden="true">×</span>
                  <span>{copy(repositoryError, register)}</span>
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="live-url" className="text-[15px] font-semibold text-chalk">
                {copy(SUBMISSION_COPY.live, register)}
              </label>
              <p id="live-help" className="mt-1 text-[13px] text-ash">
                {copy(SUBMISSION_COPY.liveHelp, register)}
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
                placeholder={copy(SUBMISSION_COPY.livePlaceholder, register)}
                className="mt-3 min-h-11 w-full rounded-lg border border-hairline bg-canvas px-4 py-3 font-mono text-[14px] text-chalk outline-none transition-colors placeholder:text-ash/50 focus:border-voltage"
              />
              {liveError ? (
                <p id="live-error" className="mt-2 flex items-center gap-2 text-[13px] text-danger">
                  <span aria-hidden="true">×</span>
                  <span>{copy(liveError, register)}</span>
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="min-h-11 rounded-lg border border-voltage bg-voltage/10 px-5 py-3 font-mono text-[12px] font-bold uppercase tracking-wider text-voltage transition-colors hover:bg-voltage/15"
            >
              {copy(SUBMISSION_COPY.save, register)}
            </button>
            <p aria-live="polite" className={`flex items-center gap-2 text-[13px] ${saveStatus === "error" ? "text-danger" : "text-acid"}`}>
              {saveStatus === "saved" ? (
                <><span aria-hidden="true">✓</span><span>{copy(SUBMISSION_COPY.saved, register)}</span></>
              ) : saveStatus === "error" ? (
                <><span aria-hidden="true">×</span><span>{copy(SUBMISSION_COPY.saveError, register)}</span></>
              ) : null}
            </p>
          </div>

          <p className="mt-7 flex items-start gap-2 border-t border-hairline pt-5 font-mono text-[12px] leading-relaxed text-ash">
            <span aria-hidden="true">×</span>
            <span>{copy(SUBMISSION_COPY.finalUnavailable, register)}</span>
          </p>
        </form>
      )}
    </main>
  );
}
