import { faq } from "@/lib/faq";

/**
 * Questions and answers as plain headings and paragraphs, always open. A
 * disclosure widget would hide the answer text behind a click, and both search
 * result snippets and answer engines quote what is actually rendered.
 */
export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-t border-outline-variant bg-surface-container-low px-margin-mobile py-16 md:px-margin-desktop md:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-label-caps uppercase tracking-widest text-secondary">
          Before you start
        </p>
        <h2 id="faq-title" className="mt-3 text-headline-md text-primary md:text-headline-lg">
          Common questions
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {faq.map((entry) => (
            <article
              key={entry.question}
              className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6"
            >
              <h3 className="text-[18px] font-semibold leading-7 text-primary">{entry.question}</h3>
              <p className="mt-3 text-body-md text-on-surface-variant">{entry.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
