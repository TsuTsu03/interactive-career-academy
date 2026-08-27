"use client";

import { SiteFooter } from "@/components/site-footer";
import { Icon } from "@/components/icon";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { curriculum } from "@/content/curriculum";
import { ProductNav } from "@/components/product-nav";
import { type Concept, type Copy } from "@/lib/lesson-ir";
import {
  loadGlobalReviewState,
  saveGlobalReviewState,
} from "@/lib/progress";
import { dueReviewConcepts, rateReviewItem, todayKey, type ReviewRating } from "@/lib/review";

const REVIEW_COPY = {
  eyebrow: "Spaced review",
  heading: "Review what you have already learned.",
  intro:
    "Try to remember each idea in your own words before revealing the answer. This is practice, not a test; choosing “Need more practice” simply schedules another helpful review.",
  back: "Return to the course map",
  loading: "Loading your review session…",
  ready: "Your next review is ready",
  recall:
    "Pause for a moment and explain this word to yourself. When you are ready, reveal the answer and compare it with what you remembered.",
  showAnswer: "Reveal the explanation",
  meaning: "What this word means",
  analogy: "A familiar way to picture it",
  proof: "Where you used it in code",
  again: "I need more practice with this",
  gotIt: "I remembered this clearly",
  clear: "You have finished today’s review",
  empty: "No review is ready yet. Finish a lesson that introduces a new word, and it will return here for a short practice session.",
  caughtUp: "Nothing else is due today. Keep building normally; your next review will appear here when it can help you remember.",
  storageError: "Your answer was not saved. Check that this browser allows storage, then choose your response again.",
} satisfies Record<string, Copy>;

interface DeckItem {
  courseId: string;
  courseTitle: string;
  concept: Concept;
  stepLabel: Copy;
}

interface ReviewScreenState {
  ready: boolean;
  deck: DeckItem[];
  reviewedCount: number;
  initialCount: number;
  hasCompletedConcepts: boolean;
  revealed: boolean;
  error: Copy | null;
}

function loadReviewDeck(today: string) {
  const deck: DeckItem[] = [];

  const review = loadGlobalReviewState(curriculum);
  const hasCompletedConcepts = review.items.length > 0;

  for (const due of dueReviewConcepts(review, curriculum, today)) {
    deck.push({
      courseId: due.courseId,
      courseTitle: due.courseTitle,
      concept: due.concept,
      stepLabel: `Step ${due.step.index}`,
    });
  }

  return { deck, hasCompletedConcepts };
}

function queueCopy(current: number, total: number): Copy {
  return `${current} of ${total}`;
}

export function ReviewSession() {
  const [state, setState] = useState<ReviewScreenState>({
    ready: false,
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
      deck: loaded.deck,
      initialCount: loaded.deck.length,
      hasCompletedConcepts: loaded.hasCompletedConcepts,
    }));
  }, []);

  const current = state.deck[0];

  function rate(rating: ReviewRating) {
    if (!current) return;

    const today = todayKey();
    const restored = loadGlobalReviewState(curriculum);
    const review = rateReviewItem(restored, current.concept.id, rating, today);
    const hasNextCard = state.deck.length > 1;

    saveGlobalReviewState(review);

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

  const { ready } = state;
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-on-background">
      <ProductNav current="review" />
      <main className="mx-auto w-full flex-1 max-w-[820px] px-margin-mobile py-8 md:px-margin-desktop md:py-12">

        <header className="border-b border-hairline pb-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-plasma">
              {REVIEW_COPY.eyebrow}
            </span>
          </div>
          <h1 className="mt-4 font-display text-[36px] font-bold leading-[1.08] tracking-tight text-chalk sm:text-[44px]">
            {REVIEW_COPY.heading}
          </h1>
          <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-ash">
            {REVIEW_COPY.intro}
          </p>
        </header>

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {!ready
            ? REVIEW_COPY.loading
            : current
              ? REVIEW_COPY.ready
              : REVIEW_COPY.clear}
        </div>

        {!ready ? (
          <section className="mt-8 rounded-2xl border border-hairline bg-panel p-6">
            <p className="flex items-center gap-2 font-mono text-sm text-ash">
              <Icon name="schedule" size={16} />
              <span>{REVIEW_COPY.loading}</span>
            </p>
          </section>
        ) : current ? (
          <section className="mt-8 rounded-2xl border border-hairline bg-panel p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[12px] text-ash">
              <span className="flex items-center gap-2 text-voltage">
                <Icon name="play_circle" size={16} filled />
                <span>{REVIEW_COPY.ready}</span>
              </span>
              <span>
                {queueCopy(state.reviewedCount + 1, state.initialCount)}
              </span>
            </div>

            <div className="mt-6 border-t border-hairline pt-6">
              <p className="font-mono text-[11px] uppercase tracking-wider text-ash">
                {current.courseTitle} · {current.stepLabel}
              </p>
              <h2
                ref={cardHeadingRef}
                tabIndex={-1}
                className="mt-3 font-mono text-[30px] font-bold tracking-tight text-chalk outline-none sm:text-[36px]"
              >
                {current.concept.term}
              </h2>
              <p className="mt-3 text-[17px] leading-relaxed text-ash">
                {REVIEW_COPY.recall}
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
                {REVIEW_COPY.showAnswer}
              </button>
            ) : (
              <div
                ref={answerRef}
                tabIndex={-1}
                className="mt-7 space-y-4 border-t border-hairline pt-6 outline-none"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-plasma">
                    {REVIEW_COPY.meaning}
                  </p>
                  <p className="mt-2 text-[18px] leading-relaxed text-chalk">
                    {current.concept.definition}
                  </p>
                </div>
                <div className="rounded-lg border-l-2 border-gold bg-raised px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-gold">
                    {REVIEW_COPY.analogy}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ash">
                    {current.concept.analogy}
                  </p>
                </div>
                <div className="flex items-start gap-2 border-t border-hairline pt-4 text-acid">
                  <Icon name="arrow_forward" size={16} className="mt-0.5" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest">
                      {REVIEW_COPY.proof}
                    </p>
                    <p className="mt-1 text-[15px] leading-relaxed">
                      {current.concept.proof}
                    </p>
                  </div>
                </div>

                {state.error ? (
                  <p role="alert" className="flex items-start gap-2 text-[14px] text-error">
                    <Icon name="close" size={16} className="mt-0.5" />
                    <span>{state.error}</span>
                  </p>
                ) : null}

                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => rate("again")}
                    className="min-h-11 rounded-lg border border-gold/60 bg-gold/5 px-4 py-3 font-mono text-[13px] font-bold uppercase tracking-wider text-gold transition-colors hover:bg-gold/10"
                  >
                    <Icon name="refresh" size={16} className="mr-1.5 inline-block align-text-bottom" />
                    {REVIEW_COPY.again}
                  </button>
                  <button
                    type="button"
                    onClick={() => rate("got-it")}
                    className="min-h-11 rounded-lg border border-acid/60 bg-acid/5 px-4 py-3 font-mono text-[13px] font-bold uppercase tracking-wider text-acid transition-colors hover:bg-acid/10"
                  >
                    <Icon name="check" size={16} className="mr-1.5 inline-block align-text-bottom" />
                    {REVIEW_COPY.gotIt}
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
              <Icon name="check_circle" size={16} filled />
              <span>{REVIEW_COPY.clear}</span>
            </p>
            <p className="mt-4 max-w-[58ch] text-[17px] leading-relaxed text-ash">
              {state.hasCompletedConcepts ? REVIEW_COPY.caughtUp : REVIEW_COPY.empty}
            </p>
            <Link
              href="/dashboard"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-hairline px-4 py-3 font-mono text-[12px] text-chalk transition-colors hover:border-ash/70"
            >
              <Icon name="arrow_back" size={16} />
              <span>{REVIEW_COPY.back}</span>
            </Link>
          </section>
        )}
      </main>
      <SiteFooter home="/dashboard" />
    </div>
  );
}
