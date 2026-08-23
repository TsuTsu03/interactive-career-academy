"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { curriculum } from "@/content/curriculum";
import { copy, type Concept, type Copy, type Register } from "@/lib/lesson-ir";
import {
  courseSessionSnapshotFromStorage,
  courseStorageKey,
} from "@/lib/progress";
import {
  dueReviewConcepts,
  rateReviewItem,
  restoreReviewState,
  todayKey,
  type ReviewRating,
} from "@/lib/review";

const REVIEW_COPY = {
  eyebrow: { simple: "Spaced review", standard: "Spaced review" },
  heading: {
    simple: "Review what you learned.",
    standard: "Review the concepts you have finished.",
  },
  intro: {
    simple: "Think of the answer first. Then check it.",
    standard: "Recall each definition before revealing the answer.",
  },
  readingLevel: { simple: "Reading level", standard: "Reading level" },
  simple: { simple: "Simple", standard: "Simple" },
  standard: { simple: "Standard", standard: "Standard" },
  back: { simple: "Back to course map", standard: "Back to course map" },
  loading: { simple: "Loading review", standard: "Loading review" },
  ready: { simple: "Ready to review", standard: "Ready to review" },
  recall: {
    simple: "Say what this word means. Then show the answer.",
    standard: "Recall the definition before revealing it.",
  },
  showAnswer: { simple: "Show answer", standard: "Reveal answer" },
  meaning: { simple: "What it means", standard: "Definition" },
  analogy: { simple: "Think of it like", standard: "Analogy" },
  proof: { simple: "Where you used it", standard: "How you applied it" },
  again: { simple: "Need practice", standard: "Review tomorrow" },
  gotIt: { simple: "Got it", standard: "I remembered" },
  clear: { simple: "Review clear", standard: "Review complete" },
  empty: {
    simple: "No review yet. Finish a lesson that teaches a new word.",
    standard: "No concepts are ready for review. Complete a lesson that introduces one.",
  },
  caughtUp: {
    simple: "Nothing is due today. Your next review will appear here.",
    standard: "Nothing is due today. Future reviews will appear here when they are ready.",
  },
  storageError: {
    simple: "Your answer was not saved. Check browser storage and try again.",
    standard: "The review could not be saved. Check browser storage and try again.",
  },
} satisfies Record<string, Copy>;

interface DeckItem {
  courseId: string;
  courseTitle: string;
  concept: Concept;
  stepLabel: Copy;
}

interface ReviewScreenState {
  ready: boolean;
  register: Register;
  deck: DeckItem[];
  reviewedCount: number;
  initialCount: number;
  hasCompletedConcepts: boolean;
  revealed: boolean;
  error: Copy | null;
}

function loadReviewDeck(today: string) {
  const deck: DeckItem[] = [];
  let register: Register = "simple";
  let hasSavedRegister = false;
  let hasCompletedConcepts = false;

  for (const course of curriculum.courses) {
    const snapshot = courseSessionSnapshotFromStorage(
      course,
      localStorage.getItem(courseStorageKey(course.id)),
    );
    if (!snapshot) continue;

    if (!hasSavedRegister) {
      register = snapshot.register;
      hasSavedRegister = true;
    }

    const review = restoreReviewState(
      snapshot.record.review,
      course,
      snapshot.completedStepIds,
      today,
    );
    hasCompletedConcepts ||= review.items.length > 0;

    for (const due of dueReviewConcepts(review, course, today)) {
      deck.push({
        courseId: course.id,
        courseTitle: course.title,
        concept: due.concept,
        stepLabel: {
          simple: `Step ${due.step.index}`,
          standard: `Step ${due.step.index}`,
        },
      });
    }
  }

  return { deck, register, hasCompletedConcepts };
}

function queueCopy(current: number, total: number): Copy {
  return {
    simple: `${current} of ${total}`,
    standard: `Review ${current} of ${total}`,
  };
}

export function ReviewSession() {
  const [state, setState] = useState<ReviewScreenState>({
    ready: false,
    register: "simple",
    deck: [],
    reviewedCount: 0,
    initialCount: 0,
    hasCompletedConcepts: false,
    revealed: false,
    error: null,
  });
  const cardHeadingRef = useRef<HTMLHeadingElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const completionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const loaded = loadReviewDeck(todayKey());
    // Browser storage is unavailable during SSR, so adopt it once after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState((current) => ({
      ...current,
      ready: true,
      register: loaded.register,
      deck: loaded.deck,
      initialCount: loaded.deck.length,
      hasCompletedConcepts: loaded.hasCompletedConcepts,
    }));
  }, []);

  const current = state.deck[0];

  function rate(rating: ReviewRating) {
    if (!current) return;

    const course = curriculum.courses.find((candidate) => candidate.id === current.courseId);
    if (!course) return;

    const snapshot = courseSessionSnapshotFromStorage(
      course,
      localStorage.getItem(courseStorageKey(course.id)),
    );
    if (!snapshot) {
      setState((value) => ({ ...value, error: REVIEW_COPY.storageError }));
      return;
    }

    const today = todayKey();
    const restored = restoreReviewState(
      snapshot.record.review,
      course,
      snapshot.completedStepIds,
      today,
    );
    const review = rateReviewItem(restored, current.concept.id, rating, today);
    const hasNextCard = state.deck.length > 1;

    try {
      localStorage.setItem(
        courseStorageKey(course.id),
        JSON.stringify({
          ...snapshot.record,
          completedSteps: snapshot.completedStepIds,
          review,
        }),
      );
    } catch {
      setState((value) => ({ ...value, error: REVIEW_COPY.storageError }));
      return;
    }

    setState((value) => ({
      ...value,
      deck: value.deck.slice(1),
      reviewedCount: value.reviewedCount + 1,
      revealed: false,
      error: null,
    }));
    setTimeout(
      () => (hasNextCard ? cardHeadingRef.current : completionRef.current)?.focus(),
      0,
    );
  }

  const { ready, register } = state;

  return (
    <main className="mx-auto min-h-[100dvh] max-w-[820px] px-5 py-8 sm:px-6 sm:py-12">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 font-mono text-[12px] text-ash transition-colors hover:text-chalk"
      >
        <span aria-hidden="true">←</span>
        <span>{copy(REVIEW_COPY.back, register)}</span>
      </Link>

      <header className="mt-6 border-b border-hairline pb-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-plasma">
            {copy(REVIEW_COPY.eyebrow, register)}
          </span>
          <div
            className="flex min-h-11 items-center rounded-lg border border-hairline bg-panel p-1"
            aria-label={copy(REVIEW_COPY.readingLevel, register)}
          >
            {(["simple", "standard"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={register === option}
                onClick={() => setState((value) => ({ ...value, register: option }))}
                className={`min-h-9 rounded-md px-3 text-sm transition-colors ${
                  register === option ? "bg-raised text-chalk" : "text-ash hover:text-chalk"
                }`}
              >
                {copy(option === "simple" ? REVIEW_COPY.simple : REVIEW_COPY.standard, register)}
              </button>
            ))}
          </div>
        </div>
        <h1 className="mt-4 font-display text-[36px] font-bold leading-[1.08] tracking-tight text-chalk sm:text-[44px]">
          {copy(REVIEW_COPY.heading, register)}
        </h1>
        <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-ash">
          {copy(REVIEW_COPY.intro, register)}
        </p>
      </header>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {!ready
          ? copy(REVIEW_COPY.loading, register)
          : current
            ? copy(REVIEW_COPY.ready, register)
            : copy(REVIEW_COPY.clear, register)}
      </div>

      {!ready ? (
        <section className="mt-8 rounded-2xl border border-hairline bg-panel p-6">
          <p className="flex items-center gap-2 font-mono text-sm text-ash">
            <span aria-hidden="true">·</span>
            <span>{copy(REVIEW_COPY.loading, register)}</span>
          </p>
        </section>
      ) : current ? (
        <section className="mt-8 rounded-2xl border border-hairline bg-panel p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[12px] text-ash">
            <span className="flex items-center gap-2 text-voltage">
              <span aria-hidden="true">→</span>
              <span>{copy(REVIEW_COPY.ready, register)}</span>
            </span>
            <span>
              {copy(
                queueCopy(state.reviewedCount + 1, state.initialCount),
                register,
              )}
            </span>
          </div>

          <div className="mt-6 border-t border-hairline pt-6">
            <p className="font-mono text-[11px] uppercase tracking-wider text-ash">
              {current.courseTitle} · {copy(current.stepLabel, register)}
            </p>
            <h2
              ref={cardHeadingRef}
              tabIndex={-1}
              className="mt-3 font-mono text-[30px] font-bold tracking-tight text-chalk outline-none sm:text-[36px]"
            >
              {current.concept.term}
            </h2>
            <p className="mt-3 text-[17px] leading-relaxed text-ash">
              {copy(REVIEW_COPY.recall, register)}
            </p>
          </div>

          {!state.revealed ? (
            <button
              type="button"
              onClick={() => {
                setState((value) => ({ ...value, revealed: true, error: null }));
                setTimeout(() => answerRef.current?.focus(), 0);
              }}
              className="mt-7 min-h-11 w-full rounded-lg border border-voltage bg-voltage/10 px-5 py-3 font-mono text-[13px] font-bold uppercase tracking-wider text-voltage transition-colors hover:bg-voltage/15 sm:w-auto"
            >
              {copy(REVIEW_COPY.showAnswer, register)}
            </button>
          ) : (
            <div
              ref={answerRef}
              tabIndex={-1}
              className="mt-7 space-y-4 border-t border-hairline pt-6 outline-none"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-plasma">
                  {copy(REVIEW_COPY.meaning, register)}
                </p>
                <p className="mt-2 text-[18px] leading-relaxed text-chalk">
                  {copy(current.concept.definition, register)}
                </p>
              </div>
              <div className="rounded-lg border-l-2 border-gold bg-raised px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-gold">
                  {copy(REVIEW_COPY.analogy, register)}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-ash">
                  {copy(current.concept.analogy, register)}
                </p>
              </div>
              <div className="flex items-start gap-2 border-t border-hairline pt-4 text-acid">
                <span aria-hidden="true">→</span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest">
                    {copy(REVIEW_COPY.proof, register)}
                  </p>
                  <p className="mt-1 text-[15px] leading-relaxed">
                    {copy(current.concept.proof, register)}
                  </p>
                </div>
              </div>

              {state.error ? (
                <p role="alert" className="flex items-start gap-2 text-[14px] text-danger">
                  <span aria-hidden="true">×</span>
                  <span>{copy(state.error, register)}</span>
                </p>
              ) : null}

              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => rate("again")}
                  className="min-h-11 rounded-lg border border-gold/60 bg-gold/5 px-4 py-3 font-mono text-[13px] font-bold uppercase tracking-wider text-gold transition-colors hover:bg-gold/10"
                >
                  <span aria-hidden="true">↺ </span>
                  {copy(REVIEW_COPY.again, register)}
                </button>
                <button
                  type="button"
                  onClick={() => rate("got-it")}
                  className="min-h-11 rounded-lg border border-acid/60 bg-acid/5 px-4 py-3 font-mono text-[13px] font-bold uppercase tracking-wider text-acid transition-colors hover:bg-acid/10"
                >
                  <span aria-hidden="true">✓ </span>
                  {copy(REVIEW_COPY.gotIt, register)}
                </button>
              </div>
            </div>
          )}
        </section>
      ) : (
        <section className="mt-8 rounded-2xl border border-acid/30 bg-panel p-6 sm:p-8">
          <p
            ref={completionRef}
            tabIndex={-1}
            className="flex items-center gap-2 font-mono text-[13px] font-bold uppercase tracking-wider text-acid outline-none"
          >
            <span aria-hidden="true">✓</span>
            <span>{copy(REVIEW_COPY.clear, register)}</span>
          </p>
          <p className="mt-4 max-w-[58ch] text-[17px] leading-relaxed text-ash">
            {copy(
              state.hasCompletedConcepts ? REVIEW_COPY.caughtUp : REVIEW_COPY.empty,
              register,
            )}
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-hairline px-4 py-3 font-mono text-[12px] text-chalk transition-colors hover:border-ash/70"
          >
            <span aria-hidden="true">←</span>
            <span>{copy(REVIEW_COPY.back, register)}</span>
          </Link>
        </section>
      )}
    </main>
  );
}
