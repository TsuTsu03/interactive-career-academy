import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { Icon, type IconName } from "@/components/icon";
import { SiteFooter } from "@/components/site-footer";
import { StructuredData } from "@/components/structured-data";
import { ThemeToggle } from "@/components/theme-toggle";
import { pageOpenGraph } from "@/lib/site";
import { siteGraph } from "@/lib/structured-data";

const DESCRIPTION =
  "Learn front-end development through clear concepts, Philippines-first projects, and working code you can inspect and improve.";

export const metadata: Metadata = {
  title: "Learn web development by building for real life",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph({
    url: "/",
    title: "CodeDaddy | Learn web development by building for real life",
    description: DESCRIPTION,
  }),
};

const CODE_LINES = [
  "<header>",
  "  <h1>Lola's Sari-Sari Store</h1>",
  "</header>",
  "<main>",
  "  <h2>Price List</h2>",
  "  <ul>",
  "    <li>Chichiria - ₱10</li>",
  "    <li>Softdrinks - ₱20</li>",
  "  </ul>",
  "</main>",
];

const LOOP: {
  icon: IconName;
  title: string;
  text: string;
  ring: string;
  hover: string;
}[] = [
  {
    icon: "menu_book",
    title: "1. Read Task",
    text: "Clear instructions focus on one small feature and explain why the change matters.",
    ring: "bg-primary-fixed text-primary",
    hover: "hover:border-primary",
  },
  {
    icon: "terminal",
    title: "2. Edit Code",
    text: "Write real code in a keyboard-friendly editor and watch the page update beside it.",
    ring: "bg-secondary-container text-on-secondary-container",
    hover: "hover:border-secondary",
  },
  {
    icon: "visibility",
    title: "3. See Results",
    text: "Instant checks show what passed and what to inspect before your next attempt.",
    ring: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    hover: "hover:border-tertiary-fixed-dim",
  },
];

const PRODUCT_STORY: {
  icon: IconName;
  label: string;
  title: string;
  text: string;
}[] = [
  {
    icon: "menu_book",
    label: "Understand",
    title: "Learn every idea four ways",
    text: "Start with a plain definition. Connect it to a familiar analogy, see a visual, then prove it with code.",
  },
  {
    icon: "map",
    label: "Build",
    title: "Work on projects that feel familiar",
    text: "Build sari-sari store pages, barangay tools, fare calculators, and other projects rooted in everyday Filipino life.",
  },
  {
    icon: "schedule",
    label: "Remember",
    title: "Review ideas before they fade",
    text: "Short review sessions bring back concepts from earlier courses while you keep working on new projects.",
  },
  {
    icon: "task_alt",
    label: "Prove",
    title: "Keep working proof",
    text: "Each check points to a real requirement. Your completed projects stay available for you to inspect and improve.",
  },
];

export default function Page() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-on-background">
      <StructuredData data={siteGraph()} />
      <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface">
        <div className="flex h-touch-target w-full items-center justify-between px-margin-mobile md:h-16 md:px-margin-desktop">
          <BrandLogo href="/" compact />

          <nav aria-label="Public navigation" className="hidden items-center gap-6 md:flex">
            <a href="#why-codedaddy" className="text-body-md text-on-surface-variant transition-colors hover:text-primary">
              Why CodeDaddy
            </a>
            <a href="#workspace" className="text-body-md text-on-surface-variant transition-colors hover:text-primary">
              Workspace
            </a>
            <a href="#how-it-works" className="text-body-md text-on-surface-variant transition-colors hover:text-primary">
              How it Works
            </a>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            <Link
              href="/account"
              className="hidden h-touch-target items-center justify-center px-4 text-label-caps uppercase text-primary transition-colors hover:text-primary-container md:flex"
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              className="flex h-touch-target items-center justify-center gap-2 rounded bg-primary px-4 text-label-caps uppercase text-on-primary transition-opacity active:opacity-80 sm:px-6"
            >
              <Icon name="code" size={18} />
              Start Coding
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative flex w-full flex-col items-center overflow-hidden px-margin-mobile pb-24 pt-20 text-center md:px-margin-desktop md:pb-40 md:pt-32">
          <div className="z-10 flex max-w-4xl flex-col items-center">
            <h1 className="mb-6 max-w-3xl font-display text-[24px] font-bold leading-8 tracking-[-0.01em] text-primary md:text-headline-lg">
              Learn web development
              <br />
              <span className="text-secondary">by building for real life.</span>
            </h1>
            <p className="mb-10 max-w-2xl text-body-lg text-on-surface-variant">
              Learn each concept four ways, then use it in projects shaped by everyday life in the
              Philippines. Finish with working pages and apps you can inspect, explain, and improve.
            </p>
            <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-primary px-8 text-label-caps uppercase text-on-primary transition-transform active:scale-95 sm:w-auto"
              >
                <Icon name="rocket_launch" size={20} />
                Start Learning for Free
              </Link>
              <Link
                href="/curriculum"
                className="flex h-14 w-full items-center justify-center rounded-lg border border-primary bg-surface px-8 text-label-caps uppercase text-primary transition-colors hover:bg-surface-variant sm:w-auto"
              >
                Explore Curriculum
              </Link>
            </div>
            <p className="mt-4 text-label-caps text-on-surface-variant opacity-70">
              No credit card required. No sign-up. Your work saves in this browser.
            </p>
          </div>
        </section>

        <section
          id="why-codedaddy"
          aria-labelledby="why-codedaddy-title"
          className="border-y border-outline-variant bg-surface-container-low px-margin-mobile py-16 md:px-margin-desktop md:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="font-mono text-label-caps uppercase tracking-widest text-secondary">
                Built for practice
              </p>
              <h2 id="why-codedaddy-title" className="mt-3 text-headline-md text-primary md:text-headline-lg">
                A clear path from explanation to working code
              </h2>
              <p className="mt-4 text-body-lg text-on-surface-variant">
                CodeDaddy connects explanations, familiar projects, and browser checks in one
                learning loop. You always know what you are changing and why it matters.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {PRODUCT_STORY.map((item) => (
                <article
                  key={item.label}
                  className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-fixed text-primary">
                    <Icon name={item.icon} size={26} />
                  </div>
                  <p className="mt-6 font-mono text-label-caps uppercase tracking-widest text-secondary">
                    {item.label}
                  </p>
                  <h3 className="mt-2 text-[20px] font-semibold leading-7 text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-body-md text-on-surface-variant">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Workspace preview */}
        <section
          id="workspace"
          className="w-full border-b border-outline-variant bg-surface-container-low px-margin-mobile py-16 md:px-margin-desktop md:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center md:mb-16 md:text-left">
              <h2 className="mb-2 text-headline-md text-primary">The Workspace</h2>
              <p className="max-w-2xl text-body-lg text-on-surface-variant">
                Read one clear task, edit real code, and compare it with a live browser preview.
                You work in a real editor inside your browser.
              </p>
            </div>

            <div className="grid h-[600px] grid-cols-1 gap-pane-gap overflow-hidden rounded-xl border border-outline-variant bg-outline-variant md:grid-cols-12">
              {/* Instructions */}
              <section className="hidden h-full flex-col bg-surface md:col-span-3 md:flex">
                <div className="flex h-10 items-center border-b border-outline-variant bg-surface-container-lowest px-4">
                  <span className="text-label-caps uppercase tracking-wider text-on-surface-variant">
                    Instructions
                  </span>
                </div>
                <div className="flex flex-1 flex-col overflow-y-auto p-4">
                  <h3 className="mb-2 text-headline-md text-primary">Task 4: Build the Price List</h3>
                  <p className="mb-4 text-body-md text-on-surface-variant">
                    In this step you add a readable list of products and prices to Lola&apos;s
                    sari-sari store page using <code className="font-mono">&lt;ul&gt;</code> and{" "}
                    <code className="font-mono">&lt;li&gt;</code>.
                  </p>
                  <div className="mb-4 rounded-md bg-primary-fixed p-3">
                    <p className="m-0 flex items-start gap-1.5 font-mono text-[12px] leading-5 text-on-primary-fixed-variant">
                      <Icon name="check_circle" size={16} filled className="mt-0.5" />
                      Goal: group each product and price in its own list item.
                    </p>
                  </div>
                </div>
              </section>

              {/* Editor */}
              <section className="col-span-1 flex h-full flex-col bg-surface md:col-span-6">
                <div className="flex h-10 items-center gap-4 border-b border-outline-variant bg-surface-container-lowest px-4">
                  <span className="flex items-center gap-1 rounded bg-primary-fixed-dim px-2 py-1 font-mono text-[12px] text-primary">
                    <Icon name="html" size={14} />
                    index.html
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 font-mono text-[12px] text-on-surface-variant opacity-60">
                    <Icon name="css" size={14} />
                    styles.css
                  </span>
                </div>
                <div className="flex flex-1 overflow-hidden bg-[#1e1e1e] p-4 font-mono text-[13px] leading-6 text-[#d4d4d4]">
                  <div className="mr-4 w-8 shrink-0 select-none border-r border-[#404040] pr-3 text-right text-[#858585] opacity-70">
                    {CODE_LINES.map((_, index) => (
                      <div key={index}>{index + 1}</div>
                    ))}
                  </div>
                  <pre className="min-w-0 overflow-auto whitespace-pre">
                    <code>{CODE_LINES.join("\n")}</code>
                  </pre>
                </div>
              </section>

              {/* Preview */}
              <section className="hidden h-full flex-col bg-surface md:col-span-3 md:flex">
                <div className="flex h-10 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-4">
                  <span className="text-label-caps uppercase tracking-wider text-on-surface-variant">
                    Preview
                  </span>
                  <Icon name="open_in_new" size={16} className="text-on-surface-variant" />
                </div>
                <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-white p-6">
                  <div className="w-full max-w-[240px] rounded border border-[#c4c5d5] bg-white">
                    <div className="flex justify-between border-b border-[#e0e3e5] p-4">
                      <div>
                        <h4 className="text-[16px] font-semibold leading-6 text-[#002576]">
                          Chippy Garlic
                        </h4>
                        <span className="text-[13px] text-[#444653] opacity-70">Qty: 1</span>
                      </div>
                      <div className="text-[16px] font-semibold leading-6 text-[#006a63]">₱15.00</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1 rounded bg-[#79f7ea] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.05em] text-[#007169]">
                    <Icon name="check" size={14} />
                    Preview Updated
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* Learning loop */}
        <section
          id="how-it-works"
          className="bg-surface px-margin-mobile py-16 md:px-margin-desktop md:py-24"
        >
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="mb-12 text-headline-md text-primary md:text-headline-lg">
              The Learning Loop
            </h2>
            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
              <div
                aria-hidden="true"
                className="absolute left-[16.66%] right-[16.66%] top-12 z-0 hidden h-[2px] bg-outline-variant md:block"
              />
              {LOOP.map((item) => (
                <article
                  key={item.title}
                  className={`relative z-10 flex flex-col items-center rounded-xl border border-outline-variant bg-surface-container-lowest p-6 transition-colors ${item.hover}`}
                >
                  <span
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full ring-4 ring-surface ${item.ring}`}
                  >
                    <Icon name={item.icon} size={30} />
                  </span>
                  <h3 className="mb-3 text-[20px] font-semibold leading-7 text-primary">
                    {item.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
