import type { Course, Step } from "@/lib/lesson-ir";

/**
 * Course 4 — Learn Tailwind CSS by Building a Turo-Turo Menu Card.
 *
 * Tailwind is CSS the learner already knows, spelled as class names instead
 * of rules. Each step's `styles.css` is readonly and contains only the exact
 * utility rules that step teaches, hand-written to match real Tailwind v4
 * values. This is deliberately NOT a general-purpose Tailwind runtime: no
 * change to lib/grading.ts or the sandbox model was needed, because the
 * "compiled" CSS a real Tailwind build would produce is just... CSS, and
 * `buildDocument` already renders `files["styles.css"]` verbatim. See
 * AGENTS.md section 1.1 — this course does not touch the guarded files.
 *
 * `hover:` and other state-variant classes cannot be observed by the static
 * grading frame (no real pointer event fires there), so those steps use
 * `source-matches` on the class name itself, the same technique the CSS
 * course already uses for `:hover`.
 */

let n = 0;

/**
 * Real Tailwind ships a Preflight reset that removes the browser's default
 * heading weight, so utility classes are the only source of styling. Without
 * it, a bare <h1> already renders bold via the user-agent stylesheet, and the
 * font-weight step's test passes before the learner does anything — a real
 * bug the authoring harness caught. Only steps 1 and 2 need this: from step 3
 * onward the h1 always carries font-bold in the narrative, which sets 700
 * unconditionally regardless of any reset.
 */
const H1_RESET = "h1 {\n  font-weight: 400;\n}\n\n";

const references = {
  "utility-class": {
    estimatedMinutes: 5,
    solution: {
      "index.html": '<h1 class="text-2xl">Turo-Turo Menu</h1>',
      "styles.css": H1_RESET + ".text-2xl {\n  font-size: 1.5rem;\n}",
    },
  },
  "font-weight": {
    estimatedMinutes: 4,
    solution: {
      "index.html": '<h1 class="text-2xl font-bold">Turo-Turo Menu</h1>',
      "styles.css":
        H1_RESET + ".text-2xl {\n  font-size: 1.5rem;\n}\n\n.font-bold {\n  font-weight: 700;\n}",
    },
  },
  color: {
    estimatedMinutes: 4,
    solution: {
      "index.html": '<h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>',
      "styles.css":
        ".text-2xl {\n  font-size: 1.5rem;\n}\n\n.font-bold {\n  font-weight: 700;\n}\n\n.text-orange-600 {\n  color: #ea580c;\n}",
    },
  },
  spacing: {
    estimatedMinutes: 5,
    solution: {
      "index.html":
        '<div class="p-4">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n</div>',
      "styles.css": ".p-4 {\n  padding: 1rem;\n}",
    },
  },
  rounded: {
    estimatedMinutes: 4,
    solution: {
      "index.html":
        '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n</div>',
      "styles.css": ".rounded-lg {\n  border-radius: 0.5rem;\n}\n\n.bg-white {\n  background-color: #ffffff;\n}",
    },
  },
  "menu-item": {
    estimatedMinutes: 5,
    solution: {
      "index.html":
        '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n  <div class="flex">\n    <p>Adobo Rice</p>\n    <p>75</p>\n  </div>\n</div>',
      "styles.css": ".flex {\n  display: flex;\n}",
    },
  },
  "justify-between": {
    estimatedMinutes: 6,
    solution: {
      "index.html":
        '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n  <div class="flex justify-between">\n    <p>Adobo Rice</p>\n    <p>75</p>\n  </div>\n</div>',
      "styles.css":
        ".flex {\n  display: flex;\n}\n\n.justify-between {\n  justify-content: space-between;\n}",
    },
  },
  gap: {
    estimatedMinutes: 5,
    solution: {
      "index.html":
        '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n  <div class="flex flex-col gap-3">\n    <div class="flex justify-between">\n      <p>Adobo Rice</p>\n      <p>75</p>\n    </div>\n    <div class="flex justify-between">\n      <p>Pancit Bihon</p>\n      <p>65</p>\n    </div>\n  </div>\n</div>',
      "styles.css":
        ".flex {\n  display: flex;\n}\n\n.flex-col {\n  flex-direction: column;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.gap-3 {\n  gap: 0.75rem;\n}",
    },
  },
  "hover-state": {
    estimatedMinutes: 6,
    solution: {
      "index.html":
        '<div class="p-4 rounded-lg bg-white">\n  <div class="flex justify-between hover:bg-orange-50">\n    <p>Adobo Rice</p>\n    <p>75</p>\n  </div>\n</div>',
      "styles.css":
        ".flex {\n  display: flex;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.hover\\:bg-orange-50:hover {\n  background-color: #fff7ed;\n}",
    },
  },
  "max-width": {
    estimatedMinutes: 4,
    solution: {
      "index.html":
        '<div class="max-w-sm p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n</div>',
      "styles.css": ".max-w-sm {\n  max-width: 24rem;\n}",
    },
  },
  caption: {
    estimatedMinutes: 4,
    solution: {
      "index.html":
        '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n  <p class="text-sm text-gray-500">Open 10am to 8pm</p>\n</div>',
      "styles.css":
        ".text-sm {\n  font-size: 0.875rem;\n}\n\n.text-gray-500 {\n  color: #6b7280;\n}",
    },
  },
  finish: {
    estimatedMinutes: 6,
    solution: {
      "index.html":
        '<div class="max-w-sm rounded-2xl shadow-lg bg-white p-6">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n  <p class="text-sm text-gray-500">Open 10am to 8pm</p>\n</div>',
      "styles.css":
        ".max-w-sm {\n  max-width: 24rem;\n}\n\n.rounded-2xl {\n  border-radius: 1rem;\n}\n\n.bg-white {\n  background-color: #ffffff;\n}\n\n.p-6 {\n  padding: 1.5rem;\n}",
    },
  },
  "badge-inline-flex": { estimatedMinutes: 5, solution: { "index.html": '<span class="inline-flex">Open now</span>', "styles.css": ".inline-flex {\n  display: inline-flex;\n}" } },
  "badge-centre": { estimatedMinutes: 4, solution: { "index.html": '<span class="inline-flex items-center">Open now</span>', "styles.css": ".inline-flex {\n  display: inline-flex;\n}\n\n.items-center {\n  align-items: center;\n}" } },
  "badge-gap": { estimatedMinutes: 4, solution: { "index.html": '<span class="inline-flex items-center gap-2">Open now</span>', "styles.css": ".gap-2 {\n  gap: 0.5rem;\n}" } },
  "badge-colour": { estimatedMinutes: 4, solution: { "index.html": '<span class="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800">Open now</span>', "styles.css": ".bg-emerald-100 {\n  background-color: #d1fae5;\n}\n\n.text-emerald-800 {\n  color: #065f46;\n}" } },
  "badge-round": { estimatedMinutes: 4, solution: { "index.html": '<span class="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 rounded-full">Open now</span>', "styles.css": ".rounded-full {\n  border-radius: 9999px;\n}" } },
  "badge-wide-text": { estimatedMinutes: 5, solution: { "index.html": '<span class="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 rounded-full sm:text-base">Open now</span>', "styles.css": "@media (min-width: 40rem) {\n  .sm\\:text-base {\n    font-size: 1rem;\n  }\n}" } },
  "category-grid": { estimatedMinutes: 5, solution: { "index.html": '<section class="grid"><article>Fruit</article><article>Fish</article><article>Rice</article></section>', "styles.css": ".grid {\n  display: grid;\n}" } },
  "category-columns": { estimatedMinutes: 5, solution: { "index.html": '<section class="grid grid-cols-2"><article>Fruit</article><article>Fish</article><article>Rice</article></section>', "styles.css": ".grid-cols-2 {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}" } },
  "category-gap": { estimatedMinutes: 4, solution: { "index.html": '<section class="grid grid-cols-2 gap-3"><article>Fruit</article><article>Fish</article><article>Rice</article></section>', "styles.css": ".gap-3 {\n  gap: 0.75rem;\n}" } },
  "category-wide-columns": { estimatedMinutes: 5, solution: { "index.html": '<section class="grid grid-cols-2 gap-3 md:grid-cols-3"><article>Fruit</article><article>Fish</article><article>Rice</article></section>', "styles.css": "@media (min-width: 48rem) {\n  .md\\:grid-cols-3 {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}" } },
  "category-card": { estimatedMinutes: 4, solution: { "index.html": '<section class="grid grid-cols-2 gap-3 md:grid-cols-3"><article class="bg-amber-50 p-3">Fruit</article><article class="bg-amber-50 p-3">Fish</article><article class="bg-amber-50 p-3">Rice</article></section>', "styles.css": ".bg-amber-50 {\n  background-color: #fffbeb;\n}\n\n.p-3 {\n  padding: 0.75rem;\n}" } },
  "route-padding": { estimatedMinutes: 4, solution: { "index.html": '<aside class="p-4">Cubao to Katipunan route open</aside>', "styles.css": ".p-4 {\n  padding: 1rem;\n}" } },
  "route-surface": { estimatedMinutes: 4, solution: { "index.html": '<aside class="p-4 bg-teal-50">Cubao to Katipunan route open</aside>', "styles.css": ".bg-teal-50 {\n  background-color: #f0fdfa;\n}" } },
  "route-border-width": { estimatedMinutes: 4, solution: { "index.html": '<aside class="p-4 bg-teal-50 border-l-4">Cubao to Katipunan route open</aside>', "styles.css": ".border-l-4 {\n  border-left-width: 4px;\n  border-left-style: solid;\n}" } },
  "route-border-colour": { estimatedMinutes: 4, solution: { "index.html": '<aside class="p-4 bg-teal-50 border-l-4 border-teal-700">Cubao to Katipunan route open</aside>', "styles.css": ".border-teal-700 {\n  border-color: #0f766e;\n}" } },
  "route-round": { estimatedMinutes: 4, solution: { "index.html": '<aside class="p-4 bg-teal-50 border-l-4 border-teal-700 rounded-r-lg">Cubao to Katipunan route open</aside>', "styles.css": ".rounded-r-lg {\n  border-top-right-radius: 0.5rem;\n  border-bottom-right-radius: 0.5rem;\n}" } },
  "event-width": { estimatedMinutes: 4, solution: { "index.html": '<article class="max-w-sm">Barangay clean-up day</article>', "styles.css": ".max-w-sm {\n  max-width: 24rem;\n}" } },
  "event-surface": { estimatedMinutes: 4, solution: { "index.html": '<article class="max-w-sm bg-white">Barangay clean-up day</article>', "styles.css": ".bg-white {\n  background-color: #ffffff;\n}" } },
  "event-padding": { estimatedMinutes: 4, solution: { "index.html": '<article class="max-w-sm bg-white p-5">Barangay clean-up day</article>', "styles.css": ".p-5 {\n  padding: 1.25rem;\n}" } },
  "event-shadow": { estimatedMinutes: 4, solution: { "index.html": '<article class="max-w-sm bg-white p-5 shadow-md">Barangay clean-up day</article>', "styles.css": ".shadow-md {\n  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n}" } },
  "event-hover-shadow": { estimatedMinutes: 5, solution: { "index.html": '<article class="max-w-sm bg-white p-5 shadow-md hover:shadow-lg">Barangay clean-up day</article>', "styles.css": ".hover\\:shadow-lg:hover {\n  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n}" } },
  "service-inline": { estimatedMinutes: 4, solution: { "index.html": '<a class="inline-flex" href="tel:117">Call help: 117</a>', "styles.css": ".inline-flex {\n  display: inline-flex;\n}" } },
  "service-centre": { estimatedMinutes: 4, solution: { "index.html": '<a class="inline-flex items-center" href="tel:117">Call help: 117</a>', "styles.css": ".items-center {\n  align-items: center;\n}" } },
  "service-gap": { estimatedMinutes: 4, solution: { "index.html": '<a class="inline-flex items-center gap-2" href="tel:117">Call help: 117</a>', "styles.css": ".gap-2 {\n  gap: 0.5rem;\n}" } },
  "service-focus-width": { estimatedMinutes: 5, solution: { "index.html": '<a class="inline-flex items-center gap-2 focus:outline-2" href="tel:117">Call help: 117</a>', "styles.css": ".focus\\:outline-2:focus {\n  outline-width: 2px;\n  outline-style: solid;\n}" } },
  "service-focus-colour": { estimatedMinutes: 5, solution: { "index.html": '<a class="inline-flex items-center gap-2 focus:outline-2 focus:outline-teal-700" href="tel:117">Call help: 117</a>', "styles.css": ".focus\\:outline-teal-700:focus {\n  outline-color: #0f766e;\n}" } },
  "price-row-flex": { estimatedMinutes: 4, solution: { "index.html": '<div class="flex"><span>Rice</span><span>PHP 58</span></div>', "styles.css": ".flex {\n  display: flex;\n}" } },
  "price-row-between": { estimatedMinutes: 4, solution: { "index.html": '<div class="flex justify-between"><span>Rice</span><span>PHP 58</span></div>', "styles.css": ".justify-between {\n  justify-content: space-between;\n}" } },
  "price-row-padding": { estimatedMinutes: 4, solution: { "index.html": '<div class="flex justify-between py-2"><span>Rice</span><span>PHP 58</span></div>', "styles.css": ".py-2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}" } },
  "price-row-border": { estimatedMinutes: 4, solution: { "index.html": '<div class="flex justify-between py-2 border-b"><span>Rice</span><span>PHP 58</span></div>', "styles.css": ".border-b {\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n}" } },
  "price-row-border-colour": { estimatedMinutes: 4, solution: { "index.html": '<div class="flex justify-between py-2 border-b border-slate-200"><span>Rice</span><span>PHP 58</span></div>', "styles.css": ".border-slate-200 {\n  border-color: #e2e8f0;\n}" } },
  "hours-uppercase": { estimatedMinutes: 4, solution: { "index.html": '<p class="uppercase">Clinic hours</p>', "styles.css": ".uppercase {\n  text-transform: uppercase;\n}" } },
  "hours-size": { estimatedMinutes: 4, solution: { "index.html": '<p class="uppercase text-xs">Clinic hours</p>', "styles.css": ".text-xs {\n  font-size: 0.75rem;\n  line-height: 1rem;\n}" } },
  "hours-tracking": { estimatedMinutes: 5, solution: { "index.html": '<p class="uppercase text-xs tracking-wide">Clinic hours</p>', "styles.css": ".tracking-wide {\n  letter-spacing: 0.025em;\n}" } },
  "hours-colour": { estimatedMinutes: 4, solution: { "index.html": '<p class="uppercase text-xs tracking-wide text-slate-500">Clinic hours</p>', "styles.css": ".text-slate-500 {\n  color: #64748b;\n}" } },
  "hours-weight": { estimatedMinutes: 4, solution: { "index.html": '<p class="uppercase text-xs tracking-wide text-slate-500 font-semibold">Clinic hours</p>', "styles.css": ".font-semibold {\n  font-weight: 600;\n}" } },
  "water-width": { estimatedMinutes: 4, solution: { "index.html": '<aside class="max-w-md">Boil water before drinking.</aside>', "styles.css": ".max-w-md {\n  max-width: 28rem;\n}" } },
  "water-surface": { estimatedMinutes: 4, solution: { "index.html": '<aside class="max-w-md bg-cyan-50">Boil water before drinking.</aside>', "styles.css": ".bg-cyan-50 {\n  background-color: #ecfeff;\n}" } },
  "water-padding": { estimatedMinutes: 4, solution: { "index.html": '<aside class="max-w-md bg-cyan-50 p-4">Boil water before drinking.</aside>', "styles.css": ".p-4 {\n  padding: 1rem;\n}" } },
  "water-border-width": { estimatedMinutes: 4, solution: { "index.html": '<aside class="max-w-md bg-cyan-50 p-4 border-l-4">Boil water before drinking.</aside>', "styles.css": ".border-l-4 {\n  border-left-width: 4px;\n  border-left-style: solid;\n}" } },
  "water-border-colour": { estimatedMinutes: 4, solution: { "index.html": '<aside class="max-w-md bg-cyan-50 p-4 border-l-4 border-cyan-700">Boil water before drinking.</aside>', "styles.css": ".border-cyan-700 {\n  border-color: #0e7490;\n}" } },
  "water-refill-max-w-sm": { estimatedMinutes: 4, solution: { "index.html": "<article class=\"max-w-sm\">Water Refill Station</article>", "styles.css": ".max-w-sm {\n  max-width: 24rem;\n}" } },
  "water-refill-p-4": { estimatedMinutes: 4, solution: { "index.html": "<article class=\"max-w-sm p-4\">Water Refill Station</article>", "styles.css": ".p-4 {\n  padding: 1rem;\n}" } },
  "water-refill-mb-6": { estimatedMinutes: 4, solution: { "index.html": "<article class=\"max-w-sm p-4 mb-6\">Water Refill Station</article>", "styles.css": ".mb-6 {\n  margin-bottom: 1.5rem;\n}" } },
  "water-refill-mt-2": { estimatedMinutes: 4, solution: { "index.html": "<article class=\"max-w-sm p-4 mb-6 mt-2\">Water Refill Station</article>", "styles.css": ".mt-2 {\n  margin-top: 0.5rem;\n}" } },
  "water-refill-px-6": { estimatedMinutes: 4, solution: { "index.html": "<article class=\"max-w-sm p-4 mb-6 mt-2 px-6\">Water Refill Station</article>", "styles.css": ".px-6 {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}" } },
  "barangay-clean-bg-amber-50": { estimatedMinutes: 4, solution: { "index.html": "<aside class=\"bg-amber-50\">Clean-up Day! Barangay Together!</aside>", "styles.css": ".bg-amber-50 {\n  background-color: #fffbeb;\n}" } },
  "barangay-clean-text-amber-900": { estimatedMinutes: 4, solution: { "index.html": "<aside class=\"bg-amber-50 text-amber-900\">Clean-up Day! Barangay Together!</aside>", "styles.css": ".text-amber-900 {\n  color: #78350f;\n}" } },
  "barangay-clean-p-4": { estimatedMinutes: 4, solution: { "index.html": "<aside class=\"bg-amber-50 text-amber-900 p-4\">Clean-up Day! Barangay Together!</aside>", "styles.css": ".p-4 {\n  padding: 1rem;\n}" } },
  "barangay-clean-rounded-lg": { estimatedMinutes: 4, solution: { "index.html": "<aside class=\"bg-amber-50 text-amber-900 p-4 rounded-lg\">Clean-up Day! Barangay Together!</aside>", "styles.css": ".rounded-lg {\n  border-radius: 0.5rem;\n}" } },
  "barangay-clean-border-amber-200": { estimatedMinutes: 4, solution: { "index.html": "<aside class=\"bg-amber-50 text-amber-900 p-4 rounded-lg border-amber-200\">Clean-up Day! Barangay Together!</aside>", "styles.css": ".border-amber-200 {\n  border: 1px solid #fde68a;\n}" } },
  "computer-shop-text-xl": { estimatedMinutes: 4, solution: { "index.html": "<article class=\"text-xl\">Welcome to QuickTech Solutions</article>", "styles.css": ".text-xl {\n  font-size: 1.25rem;\n}" } },
  "computer-shop-font-semibold": { estimatedMinutes: 4, solution: { "index.html": "<article class=\"text-xl font-semibold\">Welcome to QuickTech Solutions</article>", "styles.css": ".font-semibold {\n  font-weight: 600;\n}" } },
  "computer-shop-leading-relaxed": { estimatedMinutes: 4, solution: { "index.html": "<article class=\"text-xl font-semibold leading-relaxed\">Welcome to QuickTech Solutions</article>", "styles.css": ".leading-relaxed {\n  line-height: 1.625;\n}" } },
  "computer-shop-tracking-wide": { estimatedMinutes: 4, solution: { "index.html": "<article class=\"text-xl font-semibold leading-relaxed tracking-wide\">Welcome to QuickTech Solutions</article>", "styles.css": ".tracking-wide {\n  letter-spacing: 0.025em;\n}" } },
  "computer-shop-text-center": { estimatedMinutes: 4, solution: { "index.html": "<article class=\"text-xl font-semibold leading-relaxed tracking-wide text-center\">Welcome to QuickTech Solutions</article>", "styles.css": ".text-center {\n  text-align: center;\n}" } },
} satisfies Record<string, { estimatedMinutes: number; solution: Record<string, string> }>;

const PROJECT_ID = "turo-turo-menu-card";
const PROJECT_2_ID = "sari-sari-status-badge";
const PROJECT_3_ID = "palengke-category-grid";
const PROJECT_4_ID = "jeepney-route-notice";
const PROJECT_5_ID = "barangay-event-card";
const PROJECT_6_ID = "barangay-help-link";
const PROJECT_7_ID = "palengke-price-row";
const PROJECT_8_ID = "barangay-clinic-hours";
const PROJECT_9_ID = "barangay-water-notice";
/* tw-topic: spacing-size */
const PROJECT_10_ID = "water-refill";
/* tw-topic: colour-surface */
const PROJECT_11_ID = "barangay-clean";
/* tw-topic: type-scale */
const PROJECT_12_ID = "computer-shop";

const s = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for Tailwind step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_ID };
};
const s2 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for Tailwind step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_2_ID };
};
const s3 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for Tailwind step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_3_ID };
};
const s4 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for Tailwind step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_4_ID };
};
const s5 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for Tailwind step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_5_ID };
};
const s6 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for Tailwind step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_6_ID };
};
const s7 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for Tailwind step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_7_ID };
};
const s8 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for Tailwind step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_8_ID };
};
const s9 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for Tailwind step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_9_ID };
};

const s10 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for Tailwind step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_10_ID }; };

const s11 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for Tailwind step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_11_ID }; };

const s12 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for Tailwind step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_12_ID }; };

export const tailwindCourse: Course = {
  id: "tailwind-basics",
  order: 4,
  title: "Learn Tailwind CSS by Building a Turo-Turo Menu Card",
  project: "Turo-Turo Menu Card",
  projects: [{ id: PROJECT_ID, title: "Turo-Turo Menu Card" }, { id: PROJECT_2_ID, title: "Sari-Sari Status Badge" }, { id: PROJECT_3_ID, title: "Palengke Category Grid" }, { id: PROJECT_4_ID, title: "Jeepney Route Notice" }, { id: PROJECT_5_ID, title: "Barangay Event Card" }, { id: PROJECT_6_ID, title: "Barangay Help Link" }, { id: PROJECT_7_ID, title: "Palengke Price Row" }, { id: PROJECT_8_ID, title: "Barangay Clinic Hours" }, { id: PROJECT_9_ID, title: "Barangay Water Notice" }, { id: PROJECT_10_ID, title: "Water Refill" }, { id: PROJECT_11_ID, title: "Barangay Clean" }, { id: PROJECT_12_ID, title: "Computer Shop" }],
  kind: "web",
  requires: ["css-basics"],
  summary: "You already know CSS. Now learn to write it as short class names instead of rules.",
  steps: [
    s({
      id: "utility-class",
      task: "Make the title big. Add the class text-2xl to the h1.",
      inputMode: "tap-to-build",
      files: {
        // Blank at the slot: placeBlock only fills a blank line, and inserts
        // below a non-blank one (AGENTS.md rule 1.5). Starting with real
        // content here would leave two <h1> elements after tapping.
        "index.html": "",
        "styles.css": H1_RESET + ".text-2xl {\n  font-size: 1.5rem;\n}",
      },
      activeFile: "index.html",
      slotLine: 1,
      blocks: [
        '<h1 class="text-2xl">Turo-Turo Menu</h1>',
        '<h1 id="text-2xl">Turo-Turo Menu</h1>',
        "<h1>Turo-Turo Menu</h1>",
        '<h1 style="text-2xl">Turo-Turo Menu</h1>',
      ],
      correctBlock: '<h1 class="text-2xl">Turo-Turo Menu</h1>',
      conceptIds: ["utility-class"],
      tests: [
        {
          id: "h1-2xl",
          kind: "style",
          selector: "h1",
          prop: "font-size",
          equals: "24px",
          readable: "24 pixels",
          label: "The title is big",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Tap the block with class=\"text-2xl\" in it.",
        },
      ],
      xp: 40,
    }),
    s({
      id: "font-weight",
      task: "Make the title bold. Add font-bold, right after text-2xl.",
      inputMode: "guided",
      files: {
        "index.html": '<h1 class="text-2xl">Turo-Turo Menu</h1>',
        "styles.css":
          H1_RESET + ".text-2xl {\n  font-size: 1.5rem;\n}\n\n.font-bold {\n  font-weight: 700;\n}",
      },
      activeFile: "index.html",
      highlightToken: "text-2xl",
      tests: [
        {
          id: "h1-bold",
          kind: "style",
          selector: "h1",
          prop: "font-weight",
          equals: "700",
          readable: "bold",
          label: "The title is bold",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Two classes can sit in the same quotes, with a space between.",
        },
      ],
      xp: 40,
    }),
    s({
      id: "color",
      task: "Make the title orange. Add text-orange-600.",
      inputMode: "guided",
      files: {
        "index.html": '<h1 class="text-2xl font-bold">Turo-Turo Menu</h1>',
        "styles.css":
          ".text-2xl {\n  font-size: 1.5rem;\n}\n\n.font-bold {\n  font-weight: 700;\n}\n\n.text-orange-600 {\n  color: #ea580c;\n}",
      },
      activeFile: "index.html",
      highlightToken: "font-bold",
      tests: [
        {
          id: "h1-orange",
          kind: "style",
          selector: "h1",
          prop: "color",
          equals: "rgb(234, 88, 12)",
          readable: "orange",
          label: "The title is orange",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Tailwind colour classes end in a number. 600 is a medium-strong shade.",
        },
      ],
      xp: 40,
    }),
    s({
      id: "spacing",
      task: "Wrap everything in a div with p-4, so there is room around the edges.",
      inputMode: "guided",
      files: {
        "index.html": '<h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>',
        "styles.css": ".p-4 {\n  padding: 1rem;\n}",
      },
      activeFile: "index.html",
      tests: [
        {
          id: "wrap-padding",
          kind: "style",
          selector: ".p-4",
          prop: "padding-top",
          equals: "16px",
          readable: "16 pixels",
          label: "There is space around everything",
        },
      ],
      hints: [
        {
          level: 1,
          text: 'Try: <div class="p-4"> ... </div>',
        },
      ],
      xp: 50,
    }),
    s({
      id: "rounded",
      task: "Give the wrapper a white background and round corners. Add bg-white rounded-lg.",
      inputMode: "guided",
      files: {
        "index.html":
          '<div class="p-4">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n</div>',
        "styles.css":
          ".p-4 {\n  padding: 1rem;\n}\n\n.rounded-lg {\n  border-radius: 0.5rem;\n}\n\n.bg-white {\n  background-color: #ffffff;\n}",
      },
      activeFile: "index.html",
      highlightToken: 'class="p-4"',
      tests: [
        {
          id: "wrap-white",
          kind: "style",
          selector: ".p-4",
          prop: "background-color",
          equals: "rgb(255, 255, 255)",
          readable: "white",
          label: "The card is white",
        },
        {
          id: "wrap-rounded",
          kind: "style",
          selector: ".p-4",
          prop: "border-radius",
          equals: "8px",
          readable: "8 pixels",
          label: "The corners are round",
        },
      ],
      hints: [
        {
          level: 1,
          text: 'class="p-4 bg-white rounded-lg", all in one string.',
        },
      ],
      xp: 50,
    }),
    s({
      id: "menu-item",
      task: "Add a name and a price below the title, each on its own line.",
      inputMode: "guided",
      files: {
        "index.html":
          '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n</div>',
        "styles.css": ".flex {\n  display: flex;\n}",
      },
      activeFile: "index.html",
      highlightToken: "</h1>",
      tests: [
        {
          id: "has-two-p",
          kind: "count",
          selector: "p",
          atLeast: 2,
          label: "There is a name and a price",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add <p>Adobo Rice</p> and <p>75</p> after the title.",
        },
      ],
      xp: 40,
    }),
    s({
      id: "justify-between",
      task: "Put the name on the left and the price on the right. Wrap them in a div with flex justify-between.",
      inputMode: "guided",
      files: {
        "index.html":
          '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n  <p>Adobo Rice</p>\n  <p>75</p>\n</div>',
        "styles.css":
          ".flex {\n  display: flex;\n}\n\n.justify-between {\n  justify-content: space-between;\n}",
      },
      activeFile: "index.html",
      conceptIds: ["justify-between"],
      tests: [
        {
          id: "row-flex",
          kind: "style",
          selector: ".justify-between",
          prop: "display",
          equals: "flex",
          readable: "flex",
          label: "The row is side by side",
        },
        {
          id: "row-between",
          kind: "style",
          selector: ".justify-between",
          prop: "justify-content",
          equals: "space-between",
          readable: "space-between",
          label: "Name and price are pushed apart",
        },
      ],
      hints: [
        {
          level: 1,
          text: 'Wrap both <p> tags: <div class="flex justify-between"> ... </div>',
        },
      ],
      xp: 60,
    }),
    s({
      id: "gap",
      task: "Add a second menu item the same way. Wrap both rows in a div with flex flex-col gap-3.",
      inputMode: "guided",
      files: {
        "index.html":
          '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n  <div class="flex justify-between">\n    <p>Adobo Rice</p>\n    <p>75</p>\n  </div>\n</div>',
        "styles.css":
          ".flex {\n  display: flex;\n}\n\n.flex-col {\n  flex-direction: column;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.gap-3 {\n  gap: 0.75rem;\n}",
      },
      activeFile: "index.html",
      tests: [
        {
          id: "two-rows",
          kind: "count",
          selector: ".justify-between",
          atLeast: 2,
          label: "There are two menu rows",
        },
        {
          id: "stack-gap",
          kind: "style",
          selector: ".gap-3",
          prop: "gap",
          equals: "12px",
          readable: "12 pixels",
          label: "The rows have space between them",
        },
      ],
      hints: [
        {
          level: 1,
          text: "The new wrapper goes around both rows, not inside either one.",
        },
      ],
      xp: 60,
    }),
    s({
      id: "hover-state",
      task: "Make a menu row light up when the mouse is over it. Add hover:bg-orange-50 to one row's classes.",
      inputMode: "guided",
      files: {
        "index.html":
          '<div class="p-4 rounded-lg bg-white">\n  <div class="flex justify-between">\n    <p>Adobo Rice</p>\n    <p>75</p>\n  </div>\n</div>',
        "styles.css":
          ".flex {\n  display: flex;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.hover\\:bg-orange-50:hover {\n  background-color: #fff7ed;\n}",
      },
      activeFile: "index.html",
      highlightToken: "justify-between",
      conceptIds: ["state-variant"],
      tests: [
        {
          id: "has-hover-class",
          kind: "source-matches",
          file: "index.html",
          pattern: "hover:bg-orange-50",
          because: "The class hover:bg-orange-50 needs to be on one of the rows.",
          label: "A row reacts to the mouse",
        },
      ],
      hints: [
        {
          level: 1,
          text: "The hover word goes right inside the same quotes as the other classes.",
        },
        {
          level: 2,
          text: 'Add it after the others: class="flex justify-between hover:bg-orange-50"',
        },
      ],
      xp: 60,
    }),
    s({
      id: "max-width",
      task: "Stop the card stretching too wide. Add max-w-sm to the outer wrapper.",
      inputMode: "guided",
      files: {
        "index.html":
          '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n</div>',
        "styles.css": ".max-w-sm {\n  max-width: 24rem;\n}",
      },
      activeFile: "index.html",
      highlightToken: 'class="p-4',
      tests: [
        {
          id: "wrap-maxw",
          kind: "style",
          selector: ".max-w-sm",
          prop: "max-width",
          equals: "384px",
          readable: "384 pixels",
          label: "The card is not too wide",
        },
      ],
      hints: [
        {
          level: 1,
          text: "sm is one size in Tailwind's width scale: xs, sm, md, lg, and up.",
        },
      ],
      xp: 50,
    }),
    s({
      id: "caption",
      task: "Add a small grey line under the title saying when you are open.",
      inputMode: "guided",
      files: {
        "index.html":
          '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n</div>',
        "styles.css":
          ".text-sm {\n  font-size: 0.875rem;\n}\n\n.text-gray-500 {\n  color: #6b7280;\n}",
      },
      activeFile: "index.html",
      highlightToken: "</h1>",
      tests: [
        {
          id: "caption-small",
          kind: "style",
          selector: ".text-sm",
          prop: "font-size",
          equals: "14px",
          readable: "14 pixels",
          label: "The line is small",
        },
        {
          id: "caption-grey",
          kind: "style",
          selector: ".text-sm",
          prop: "color",
          equals: "rgb(107, 114, 128)",
          readable: "grey",
          label: "The line is grey",
        },
      ],
      hints: [
        {
          level: 1,
          text: 'Try: <p class="text-sm text-gray-500">Open 10am to 8pm</p>',
        },
      ],
      xp: 50,
    }),
    s({
      id: "finish",
      task: "Last one. Give the outer wrapper a bigger shadow and rounder corners: rounded-2xl shadow-lg p-6.",
      inputMode: "guided",
      files: {
        "index.html":
          '<div class="max-w-sm rounded-lg bg-white p-4">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n  <p class="text-sm text-gray-500">Open 10am to 8pm</p>\n</div>',
        "styles.css":
          ".max-w-sm {\n  max-width: 24rem;\n}\n\n.rounded-2xl {\n  border-radius: 1rem;\n}\n\n.bg-white {\n  background-color: #ffffff;\n}\n\n.p-6 {\n  padding: 1.5rem;\n}",
      },
      activeFile: "index.html",
      highlightToken: "rounded-lg bg-white p-4",
      tests: [
        {
          id: "final-rounded",
          kind: "style",
          selector: ".max-w-sm",
          prop: "border-radius",
          equals: "16px",
          readable: "16 pixels",
          label: "The corners are rounder now",
        },
        {
          id: "final-padding",
          kind: "style",
          selector: ".max-w-sm",
          prop: "padding-top",
          equals: "24px",
          readable: "24 pixels",
          label: "There is more room inside",
        },
        {
          id: "final-shadow",
          kind: "source-matches",
          file: "index.html",
          pattern: "shadow-lg",
          because: "The class shadow-lg needs to be on the wrapper.",
          label: "The card lifts off the page",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Replace rounded-lg with rounded-2xl, and p-4 with p-6, then add shadow-lg.",
        },
      ],
      xp: 100,
    }),
    s2({ id: "badge-inline-flex", task: "Make the status words act like a small flexible box.", inputMode: "guided", files: { "index.html": "<span>Open now</span>", "styles.css": ".inline-flex {\n  display: inline-flex;\n}" }, activeFile: "index.html", highlightToken: "<span", tests: [{ id: "badge-inline-flex-style", kind: "style", selector: ".inline-flex", prop: "display", equals: "inline-flex", readable: "inline flex", label: "The badge is a small flexible box" }], hints: [{ level: 1, text: "Add class=\"inline-flex\" to the span." }], xp: 50 }),
    s2({ id: "badge-centre", task: "Line up things in the middle of the badge.", inputMode: "guided", files: { "index.html": '<span class="inline-flex">Open now</span>', "styles.css": ".inline-flex {\n  display: inline-flex;\n}\n\n.items-center {\n  align-items: center;\n}" }, activeFile: "index.html", highlightToken: "inline-flex", tests: [{ id: "badge-items-centre", kind: "style", selector: ".items-center", prop: "align-items", equals: "center", readable: "centred", label: "Badge items line up" }], hints: [{ level: 1, text: "Add the class that lines the badge parts up vertically." }], xp: 40 }),
    s2({ id: "badge-gap", task: "Leave a small gap between badge parts.", inputMode: "guided", files: { "index.html": '<span class="inline-flex items-center">Open now</span>', "styles.css": ".gap-2 {\n  gap: 0.5rem;\n}" }, activeFile: "index.html", highlightToken: "items-center", tests: [{ id: "badge-gap-style", kind: "style", selector: ".gap-2", prop: "gap", equals: "8px", readable: "8 pixels", label: "Badge parts have a gap" }], hints: [{ level: 1, text: "Add gap-2 in the same quotes." }], xp: 40 }),
    s2({ id: "badge-colour", task: "Give the open badge a pale green background and dark green words.", inputMode: "guided", files: { "index.html": '<span class="inline-flex items-center gap-2">Open now</span>', "styles.css": ".bg-emerald-100 {\n  background-color: #d1fae5;\n}\n\n.text-emerald-800 {\n  color: #065f46;\n}" }, activeFile: "index.html", highlightToken: "gap-2", tests: [{ id: "badge-green-bg", kind: "style", selector: ".bg-emerald-100", prop: "background-color", equals: "rgb(209, 250, 229)", readable: "pale green", label: "The badge has a pale green background" }, { id: "badge-green-text", kind: "style", selector: ".text-emerald-800", prop: "color", equals: "rgb(6, 95, 70)", readable: "dark green", label: "The badge words are dark green" }], hints: [{ level: 1, text: "Add one pale background class and one darker text class." }], xp: 50 }),
    s2({ id: "badge-round", task: "Make the status badge pill-shaped.", inputMode: "guided", files: { "index.html": '<span class="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800">Open now</span>', "styles.css": ".rounded-full {\n  border-radius: 9999px;\n}" }, activeFile: "index.html", highlightToken: "text-emerald-800", tests: [{ id: "badge-full-round", kind: "style", selector: ".rounded-full", prop: "border-radius", equals: "9999px", readable: "fully round", label: "The badge is pill-shaped" }], hints: [{ level: 1, text: "Add rounded-full in the class list." }], xp: 40 }),
    s2({ id: "badge-wide-text", task: "On a small screen, keep the badge normal. On a wider screen, make its words base size.", inputMode: "guided", files: { "index.html": '<span class="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 rounded-full">Open now</span>', "styles.css": "@media (min-width: 40rem) {\n  .sm\\:text-base {\n    font-size: 1rem;\n  }\n}" }, activeFile: "index.html", highlightToken: "rounded-full", conceptIds: ["responsive-variant"], tests: [{ id: "badge-responsive-class", kind: "source-matches", file: "index.html", pattern: "sm:text-base", because: "Add the wider-screen text class to the badge.", label: "The badge responds to screen width" }], hints: [{ level: 1, text: "Add the small-screen prefix with the base text size after the round class." }], xp: 70 }),
    s3({ id: "category-grid", task: "Put the three market categories into a grid.", inputMode: "guided", files: { "index.html": "<section><article>Fruit</article><article>Fish</article><article>Rice</article></section>", "styles.css": ".grid {\n  display: grid;\n}" }, activeFile: "index.html", highlightToken: "<section", tests: [{ id: "category-grid-style", kind: "style", selector: ".grid", prop: "display", equals: "grid", readable: "grid", label: "Categories use a grid" }], hints: [{ level: 1, text: "Add the grid class to the section." }], xp: 50 }),
    s3({ id: "category-columns", task: "Show two equal category columns.", inputMode: "guided", files: { "index.html": '<section class="grid"><article>Fruit</article><article>Fish</article><article>Rice</article></section>', "styles.css": ".grid-cols-2 {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}" }, activeFile: "index.html", highlightToken: "grid", tests: [{ id: "category-two-cols", kind: "source-matches", file: "index.html", pattern: "grid-cols-2", because: "Add the two-column class to the section.", label: "Categories have two columns" }], hints: [{ level: 1, text: "Add the next class after the first one." }], xp: 50 }),
    s3({ id: "category-gap", task: "Leave a small gap between categories.", inputMode: "guided", files: { "index.html": '<section class="grid grid-cols-2"><article>Fruit</article><article>Fish</article><article>Rice</article></section>', "styles.css": ".gap-3 {\n  gap: 0.75rem;\n}" }, activeFile: "index.html", highlightToken: "grid-cols-2", tests: [{ id: "category-gap-style", kind: "style", selector: ".gap-3", prop: "gap", equals: "12px", readable: "12 pixels", label: "Categories have a gap" }], hints: [{ level: 1, text: "Add the spacing class after the column class." }], xp: 40 }),
    s3({ id: "category-wide-columns", task: "On a wider screen, show three category columns.", inputMode: "guided", files: { "index.html": '<section class="grid grid-cols-2 gap-3"><article>Fruit</article><article>Fish</article><article>Rice</article></section>', "styles.css": "@media (min-width: 48rem) {\n  .md\\:grid-cols-3 {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}" }, activeFile: "index.html", highlightToken: "gap-3", conceptIds: ["responsive-variant"], tests: [{ id: "category-wide-class", kind: "source-matches", file: "index.html", pattern: "md:grid-cols-3", because: "Add the medium-screen three-column class to the section.", label: "Wide screens show three columns" }], hints: [{ level: 1, text: "Add the medium-screen three-column class after the gap class." }], xp: 70 }),
    s3({ id: "category-card", task: "Give every category a pale warm surface and space inside.", inputMode: "guided", files: { "index.html": '<section class="grid grid-cols-2 gap-3 md:grid-cols-3"><article>Fruit</article><article>Fish</article><article>Rice</article></section>', "styles.css": ".bg-amber-50 {\n  background-color: #fffbeb;\n}\n\n.p-3 {\n  padding: 0.75rem;\n}" }, activeFile: "index.html", highlightToken: "<article>", tests: [{ id: "categories-pale-bg", kind: "count", selector: ".bg-amber-50", atLeast: 3, label: "All three categories have a surface" }, { id: "categories-padding", kind: "count", selector: ".p-3", atLeast: 3, label: "All three categories have inside room" }], hints: [{ level: 1, text: "Put the two surface classes on each article." }], xp: 60 }),
    s4({ id: "route-padding", task: "Give the route notice room inside.", inputMode: "guided", files: { "index.html": "<aside>Cubao to Katipunan route open</aside>", "styles.css": ".p-4 {\n  padding: 1rem;\n}" }, activeFile: "index.html", highlightToken: "<aside", tests: [{ id: "route-padding-style", kind: "style", selector: ".p-4", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The notice has inside room" }], hints: [{ level: 1, text: "Add the padding utility to the aside." }], xp: 40 }),
    s4({ id: "route-surface", task: "Give the route notice a pale teal surface.", inputMode: "guided", files: { "index.html": '<aside class="p-4">Cubao to Katipunan route open</aside>', "styles.css": ".bg-teal-50 {\n  background-color: #f0fdfa;\n}" }, activeFile: "index.html", highlightToken: "p-4", tests: [{ id: "route-surface-style", kind: "style", selector: ".bg-teal-50", prop: "background-color", equals: "rgb(240, 253, 250)", readable: "pale teal", label: "The notice is pale teal" }], hints: [{ level: 1, text: "Add the pale teal background utility after the padding one." }], xp: 40 }),
    s4({ id: "route-border-width", task: "Make a thick line on the left side of the notice.", inputMode: "guided", files: { "index.html": '<aside class="p-4 bg-teal-50">Cubao to Katipunan route open</aside>', "styles.css": ".border-l-4 {\n  border-left-width: 4px;\n  border-left-style: solid;\n}" }, activeFile: "index.html", highlightToken: "bg-teal-50", tests: [{ id: "route-border-width-class", kind: "source-matches", file: "index.html", pattern: "class=\\\"[^\\\"]*\\bborder-l-4\\b", flags: "i", because: "Add border-l-4 to the notice class list.", label: "The notice has a thick left line" }], hints: [{ level: 1, text: "Add the left-border width utility after the surface class." }], xp: 40 }),
    s4({ id: "route-border-colour", task: "Make the left line dark teal.", inputMode: "guided", files: { "index.html": '<aside class="p-4 bg-teal-50 border-l-4">Cubao to Katipunan route open</aside>', "styles.css": ".border-teal-700 {\n  border-color: #0f766e;\n}" }, activeFile: "index.html", highlightToken: "border-l-4", tests: [{ id: "route-border-colour-style", kind: "style", selector: ".border-teal-700", prop: "border-left-color", equals: "rgb(15, 118, 110)", readable: "dark teal", label: "The left line is dark teal" }], hints: [{ level: 1, text: "Add the dark teal border utility after the width class." }], xp: 40 }),
    s4({ id: "route-round", task: "Round only the right side of the route notice.", inputMode: "guided", files: { "index.html": '<aside class="p-4 bg-teal-50 border-l-4 border-teal-700">Cubao to Katipunan route open</aside>', "styles.css": ".rounded-r-lg {\n  border-top-right-radius: 0.5rem;\n  border-bottom-right-radius: 0.5rem;\n}" }, activeFile: "index.html", highlightToken: "border-teal-700", tests: [{ id: "route-round-style", kind: "style", selector: ".rounded-r-lg", prop: "border-top-right-radius", equals: "8px", readable: "8 pixels", label: "The right corners are rounded" }], hints: [{ level: 1, text: "Add the right-corner rounding utility after the border colour." }], xp: 40 }),
    s5({ id: "event-width", task: "Keep the event card from stretching too wide.", inputMode: "guided", files: { "index.html": "<article>Barangay clean-up day</article>", "styles.css": ".max-w-sm {\n  max-width: 24rem;\n}" }, activeFile: "index.html", highlightToken: "<article", tests: [{ id: "event-max-width", kind: "style", selector: ".max-w-sm", prop: "max-width", equals: "384px", readable: "384 pixels", label: "The event card is not too wide" }], hints: [{ level: 1, text: "Add the small max-width utility to the article." }], xp: 40 }),
    s5({ id: "event-surface", task: "Give the event card a white surface.", inputMode: "guided", files: { "index.html": '<article class="max-w-sm">Barangay clean-up day</article>', "styles.css": ".bg-white {\n  background-color: #ffffff;\n}" }, activeFile: "index.html", highlightToken: "max-w-sm", tests: [{ id: "event-white", kind: "style", selector: ".bg-white", prop: "background-color", equals: "rgb(255, 255, 255)", readable: "white", label: "The event card is white" }], hints: [{ level: 1, text: "Add the white background utility after the width class." }], xp: 40 }),
    s5({ id: "event-padding", task: "Give the event card a little more room inside.", inputMode: "guided", files: { "index.html": '<article class="max-w-sm bg-white">Barangay clean-up day</article>', "styles.css": ".p-5 {\n  padding: 1.25rem;\n}" }, activeFile: "index.html", highlightToken: "bg-white", tests: [{ id: "event-padding-style", kind: "style", selector: ".p-5", prop: "padding-top", equals: "20px", readable: "20 pixels", label: "The event card has inside room" }], hints: [{ level: 1, text: "Add the five-step padding utility after the surface class." }], xp: 40 }),
    s5({ id: "event-shadow", task: "Lift the event card slightly from the page.", inputMode: "guided", files: { "index.html": '<article class="max-w-sm bg-white p-5">Barangay clean-up day</article>', "styles.css": ".shadow-md {\n  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n}" }, activeFile: "index.html", highlightToken: "p-5", tests: [{ id: "event-shadow-class", kind: "source-matches", file: "index.html", pattern: "shadow-md", because: "Add the medium shadow class to the article.", label: "The event card lifts from the page" }], hints: [{ level: 1, text: "Add the medium shadow utility after the padding class." }], xp: 40 }),
    s5({ id: "event-hover-shadow", task: "Make the event card lift a little more under the mouse.", inputMode: "guided", files: { "index.html": '<article class="max-w-sm bg-white p-5 shadow-md">Barangay clean-up day</article>', "styles.css": ".hover\\:shadow-lg:hover {\n  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n}" }, activeFile: "index.html", highlightToken: "shadow-md", conceptIds: ["state-variant"], tests: [{ id: "event-hover-shadow-class", kind: "source-matches", file: "index.html", pattern: "hover:shadow-lg", because: "Add the hover shadow class to the article.", label: "The event card reacts to the mouse" }], hints: [{ level: 1, text: "Add the hover shadow utility after the first shadow class." }], xp: 60 }),
    s6({ id: "service-inline", task: "Make the help link act like a small flexible box.", inputMode: "guided", files: { "index.html": '<a href="tel:117">Call help: 117</a>', "styles.css": ".inline-flex {\n  display: inline-flex;\n}" }, activeFile: "index.html", highlightToken: "<a", tests: [{ id: "service-inline-style", kind: "style", selector: ".inline-flex", prop: "display", equals: "inline-flex", readable: "inline flex", label: "The link is a small flexible box" }], hints: [{ level: 1, text: "Add class=\"inline-flex\" to the link." }], xp: 40 }),
    s6({ id: "service-centre", task: "Line up the help link items in the middle.", inputMode: "guided", files: { "index.html": '<a class="inline-flex" href="tel:117">Call help: 117</a>', "styles.css": ".items-center {\n  align-items: center;\n}" }, activeFile: "index.html", highlightToken: "inline-flex", tests: [{ id: "service-centre-style", kind: "style", selector: ".items-center", prop: "align-items", equals: "center", readable: "centred", label: "The link items line up" }], hints: [{ level: 1, text: "Add items-center in the same quotes." }], xp: 40 }),
    s6({ id: "service-gap", task: "Leave a small gap inside the help link.", inputMode: "guided", files: { "index.html": '<a class="inline-flex items-center" href="tel:117">Call help: 117</a>', "styles.css": ".gap-2 {\n  gap: 0.5rem;\n}" }, activeFile: "index.html", highlightToken: "items-center", tests: [{ id: "service-gap-style", kind: "style", selector: ".gap-2", prop: "gap", equals: "8px", readable: "8 pixels", label: "The link has a small gap" }], hints: [{ level: 1, text: "Add the short spacing class after the second class." }], xp: 40 }),
    s6({ id: "service-focus-width", task: "Make the keyboard focus ring easy to see.", inputMode: "guided", files: { "index.html": '<a class="inline-flex items-center gap-2" href="tel:117">Call help: 117</a>', "styles.css": ".focus\\:outline-2:focus {\n  outline-width: 2px;\n  outline-style: solid;\n}" }, activeFile: "index.html", highlightToken: "gap-2", conceptIds: ["state-variant"], tests: [{ id: "service-focus-width-class", kind: "source-matches", file: "index.html", pattern: "focus:outline-2", because: "Add the focus outline class to the link.", label: "Keyboard focus has a clear ring" }], hints: [{ level: 1, text: "Add the focus outline class after the gap class." }], xp: 60 }),
    s6({ id: "service-focus-colour", task: "Make the keyboard focus ring dark teal.", inputMode: "guided", files: { "index.html": '<a class="inline-flex items-center gap-2 focus:outline-2" href="tel:117">Call help: 117</a>', "styles.css": ".focus\\:outline-teal-700:focus {\n  outline-color: #0f766e;\n}" }, activeFile: "index.html", highlightToken: "focus:outline-2", tests: [{ id: "service-focus-colour-class", kind: "source-matches", file: "index.html", pattern: "focus:outline-teal-700", because: "Add the dark teal focus colour class to the link.", label: "Keyboard focus uses dark teal" }], hints: [{ level: 1, text: "Add the dark teal focus class after the outline width class." }], xp: 60 }),
    s7({ id: "price-row-flex", task: "Put the food name and price on one row.", inputMode: "guided", files: { "index.html": "<div><span>Rice</span><span>PHP 58</span></div>", "styles.css": ".flex {\n  display: flex;\n}" }, activeFile: "index.html", highlightToken: "<div", tests: [{ id: "price-row-flex-style", kind: "style", selector: ".flex", prop: "display", equals: "flex", readable: "flex", label: "The name and price share a row" }], hints: [{ level: 1, text: "Add the flexible layout class to the div." }], xp: 40 }),
    s7({ id: "price-row-between", task: "Keep the food name left and price right.", inputMode: "guided", files: { "index.html": '<div class="flex"><span>Rice</span><span>PHP 58</span></div>', "styles.css": ".justify-between {\n  justify-content: space-between;\n}" }, activeFile: "index.html", highlightToken: "flex", tests: [{ id: "price-row-between-style", kind: "style", selector: ".justify-between", prop: "justify-content", equals: "space-between", readable: "space between", label: "Name and price spread apart" }], hints: [{ level: 1, text: "Add the class that spreads the two items apart." }], xp: 40 }),
    s7({ id: "price-row-padding", task: "Give the row a little room above and below.", inputMode: "guided", files: { "index.html": '<div class="flex justify-between"><span>Rice</span><span>PHP 58</span></div>', "styles.css": ".py-2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}" }, activeFile: "index.html", highlightToken: "justify-between", tests: [{ id: "price-row-padding-style", kind: "style", selector: ".py-2", prop: "padding-top", equals: "8px", readable: "8 pixels", label: "The row has vertical room" }], hints: [{ level: 1, text: "Add the two-step vertical padding class." }], xp: 40 }),
    s7({ id: "price-row-border", task: "Put a thin line under the price row.", inputMode: "guided", files: { "index.html": '<div class="flex justify-between py-2"><span>Rice</span><span>PHP 58</span></div>', "styles.css": ".border-b {\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n}" }, activeFile: "index.html", highlightToken: "py-2", tests: [{ id: "price-row-border-style", kind: "source-matches", file: "index.html", pattern: "class=\\\"[^\\\"]*\\bborder-b\\b", flags: "i", because: "Put the bottom-border class in the row class list.", label: "The row has a thin bottom line" }], hints: [{ level: 1, text: "Add the class for a bottom border." }], xp: 40 }),
    s7({ id: "price-row-border-colour", task: "Make the bottom line a soft grey.", inputMode: "guided", files: { "index.html": '<div class="flex justify-between py-2 border-b"><span>Rice</span><span>PHP 58</span></div>', "styles.css": ".border-slate-200 {\n  border-color: #e2e8f0;\n}" }, activeFile: "index.html", highlightToken: "border-b", tests: [{ id: "price-row-border-colour-style", kind: "style", selector: ".border-slate-200", prop: "border-bottom-color", equals: "rgb(226, 232, 240)", readable: "soft grey", label: "The bottom line is soft grey" }], hints: [{ level: 1, text: "Add the light slate border colour class." }], xp: 40 }),
    s8({ id: "hours-uppercase", task: "Make the clinic hours label use capital letters.", inputMode: "guided", files: { "index.html": "<p>Clinic hours</p>", "styles.css": ".uppercase {\n  text-transform: uppercase;\n}" }, activeFile: "index.html", highlightToken: "<p", tests: [{ id: "hours-uppercase-style", kind: "style", selector: ".uppercase", prop: "text-transform", equals: "uppercase", readable: "uppercase", label: "The clinic hours use capital letters" }], hints: [{ level: 1, text: "Put the capital-letter utility in the paragraph class list." }], xp: 40 }),
    s8({ id: "hours-size", task: "Make the clinic hours label small.", inputMode: "guided", files: { "index.html": '<p class="uppercase">Clinic hours</p>', "styles.css": ".text-xs {\n  font-size: 0.75rem;\n  line-height: 1rem;\n}" }, activeFile: "index.html", highlightToken: "uppercase", tests: [{ id: "hours-size-style", kind: "style", selector: ".text-xs", prop: "font-size", equals: "12px", readable: "12 pixels", label: "The clinic hours label is small" }], hints: [{ level: 1, text: "Add the extra-small text utility after the first class." }], xp: 40 }),
    s8({ id: "hours-tracking", task: "Leave a small gap between the label letters.", inputMode: "guided", files: { "index.html": '<p class="uppercase text-xs">Clinic hours</p>', "styles.css": ".tracking-wide {\n  letter-spacing: 0.025em;\n}" }, activeFile: "index.html", highlightToken: "text-xs", conceptIds: ["tracking-utility"], tests: [{ id: "hours-tracking-style", kind: "style", selector: ".tracking-wide", prop: "letter-spacing", equals: "0.4px", readable: "a small letter gap", label: "The label letters have a small gap" }], hints: [{ level: 1, text: "Add the wide letter-spacing utility after the size class." }], xp: 60 }),
    s8({ id: "hours-colour", task: "Make the clinic hours label a soft grey.", inputMode: "guided", files: { "index.html": '<p class="uppercase text-xs tracking-wide">Clinic hours</p>', "styles.css": ".text-slate-500 {\n  color: #64748b;\n}" }, activeFile: "index.html", highlightToken: "tracking-wide", tests: [{ id: "hours-colour-style", kind: "style", selector: ".text-slate-500", prop: "color", equals: "rgb(100, 116, 139)", readable: "soft grey", label: "The clinic hours label is soft grey" }], hints: [{ level: 1, text: "Add the soft slate text colour class after the spacing class." }], xp: 40 }),
    s8({ id: "hours-weight", task: "Make the clinic hours label a little stronger.", inputMode: "guided", files: { "index.html": '<p class="uppercase text-xs tracking-wide text-slate-500">Clinic hours</p>', "styles.css": ".font-semibold {\n  font-weight: 600;\n}" }, activeFile: "index.html", highlightToken: "text-slate-500", tests: [{ id: "hours-weight-style", kind: "style", selector: ".font-semibold", prop: "font-weight", equals: "600", readable: "semibold", label: "The clinic hours label is stronger" }], hints: [{ level: 1, text: "Add the medium-strong text weight utility after the colour class." }], xp: 40 }),
    s9({ id: "water-width", task: "Keep the water notice from getting too wide.", inputMode: "guided", files: { "index.html": "<aside>Boil water before drinking.</aside>", "styles.css": ".max-w-md {\n  max-width: 28rem;\n}" }, activeFile: "index.html", highlightToken: "<aside", tests: [{ id: "water-width-style", kind: "style", selector: ".max-w-md", prop: "max-width", equals: "448px", readable: "448 pixels", label: "The water notice is not too wide" }], hints: [{ level: 1, text: "Use the medium max-width utility on the aside." }], xp: 40 }),
    s9({ id: "water-surface", task: "Give the water notice a pale blue surface.", inputMode: "guided", files: { "index.html": '<aside class="max-w-md">Boil water before drinking.</aside>', "styles.css": ".bg-cyan-50 {\n  background-color: #ecfeff;\n}" }, activeFile: "index.html", highlightToken: "max-w-md", tests: [{ id: "water-surface-style", kind: "style", selector: ".bg-cyan-50", prop: "background-color", equals: "rgb(236, 254, 255)", readable: "pale blue", label: "The water notice is pale blue" }], hints: [{ level: 1, text: "Add the pale cyan background utility after the width class." }], xp: 40 }),
    s9({ id: "water-padding", task: "Give the water notice room inside.", inputMode: "guided", files: { "index.html": '<aside class="max-w-md bg-cyan-50">Boil water before drinking.</aside>', "styles.css": ".p-4 {\n  padding: 1rem;\n}" }, activeFile: "index.html", highlightToken: "bg-cyan-50", tests: [{ id: "water-padding-style", kind: "style", selector: ".p-4", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The water notice has inside room" }], hints: [{ level: 1, text: "Add the four-step padding utility after the surface class." }], xp: 40 }),
    s9({ id: "water-border-width", task: "Put a thick line on the water notice left side.", inputMode: "guided", files: { "index.html": '<aside class="max-w-md bg-cyan-50 p-4">Boil water before drinking.</aside>', "styles.css": ".border-l-4 {\n  border-left-width: 4px;\n  border-left-style: solid;\n}" }, activeFile: "index.html", highlightToken: "p-4", tests: [{ id: "water-border-width-class", kind: "source-matches", file: "index.html", pattern: "class=\\\"[^\\\"]*\\bborder-l-4\\b", flags: "i", because: "Add border-l-4 to the water notice class list.", label: "The water notice has a thick left line" }], hints: [{ level: 1, text: "Add the left-border width utility after the padding class." }], xp: 40 }),
    s9({ id: "water-border-colour", task: "Make the water notice left line dark blue.", inputMode: "guided", files: { "index.html": '<aside class="max-w-md bg-cyan-50 p-4 border-l-4">Boil water before drinking.</aside>', "styles.css": ".border-cyan-700 {\n  border-color: #0e7490;\n}" }, activeFile: "index.html", highlightToken: "border-l-4", tests: [{ id: "water-border-colour-style", kind: "style", selector: ".border-cyan-700", prop: "border-left-color", equals: "rgb(14, 116, 144)", readable: "dark blue", label: "The water notice left line is dark blue" }], hints: [{ level: 1, text: "Add the dark cyan border class after the border width." }], xp: 40 }),
    s10({ id: "water-refill-max-w-sm", task: "Stop the card growing too wide to read.", inputMode: "guided", files: { "index.html": "<article>Water Refill Station</article>", "styles.css": ".max-w-sm {\n  max-width: 24rem;\n}" }, activeFile: "index.html", highlightToken: "article", tests: [{ id: "water-refill-max-w-sm-style", kind: "style", selector: ".max-w-sm", prop: "max-width", equals: "384px", readable: "384 pixels", label: "The card has 384 pixels" }], hints: [{ level: 1, text: "Add the small max-width utility." }, { level: 2, text: "Add max-w-sm to the class list." }], xp: 40 }),
    s10({ id: "water-refill-p-4", task: "Give the card room inside.", inputMode: "guided", files: { "index.html": "<article class=\"max-w-sm\">Water Refill Station</article>", "styles.css": ".p-4 {\n  padding: 1rem;\n}" }, activeFile: "index.html", highlightToken: "max-w-sm", tests: [{ id: "water-refill-p-4-style", kind: "style", selector: ".p-4", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The card has 16 pixels" }], hints: [{ level: 1, text: "Add the four-step padding utility. It goes after max-w-sm." }, { level: 2, text: "Add p-4 to the class list." }], xp: 40 }),
    s10({ id: "water-refill-mb-6", task: "Leave space below the card.", inputMode: "guided", files: { "index.html": "<article class=\"max-w-sm p-4\">Water Refill Station</article>", "styles.css": ".mb-6 {\n  margin-bottom: 1.5rem;\n}" }, activeFile: "index.html", highlightToken: "p-4", tests: [{ id: "water-refill-mb-6-style", kind: "style", selector: ".mb-6", prop: "margin-bottom", equals: "24px", readable: "24 pixels", label: "The card has 24 pixels" }], hints: [{ level: 1, text: "Add the six-step bottom-margin utility. It goes after p-4." }, { level: 2, text: "Add mb-6 to the class list." }], xp: 40 }),
    s10({ id: "water-refill-mt-2", task: "Leave a small space above the card.", inputMode: "guided", files: { "index.html": "<article class=\"max-w-sm p-4 mb-6\">Water Refill Station</article>", "styles.css": ".mt-2 {\n  margin-top: 0.5rem;\n}" }, activeFile: "index.html", highlightToken: "mb-6", tests: [{ id: "water-refill-mt-2-style", kind: "style", selector: ".mt-2", prop: "margin-top", equals: "8px", readable: "8 pixels", label: "The card has 8 pixels" }], hints: [{ level: 1, text: "Add the two-step top-margin utility. It goes after mb-6." }, { level: 2, text: "Add mt-2 to the class list." }], xp: 40 }),
    s10({ id: "water-refill-px-6", task: "Widen the room on the left and right only.", inputMode: "guided", files: { "index.html": "<article class=\"max-w-sm p-4 mb-6 mt-2\">Water Refill Station</article>", "styles.css": ".px-6 {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}" }, activeFile: "index.html", highlightToken: "mt-2", tests: [{ id: "water-refill-px-6-class", kind: "source-matches", file: "index.html", pattern: "class=\\\"[^\\\"]*\\bpx-6\\b", flags: "i", because: "Add px-6 to the class list.", label: "The card has wider side padding" }], hints: [{ level: 1, text: "Add the six-step horizontal padding utility. It goes after mt-2." }, { level: 2, text: "Add px-6 to the class list." }], xp: 40 }),
    s11({ id: "barangay-clean-bg-amber-50", task: "Give the notice a pale amber surface.", inputMode: "guided", files: { "index.html": "<aside>Clean-up Day! Barangay Together!</aside>", "styles.css": ".bg-amber-50 {\n  background-color: #fffbeb;\n}" }, activeFile: "index.html", highlightToken: "aside", tests: [{ id: "barangay-clean-bg-amber-50-style", kind: "style", selector: ".bg-amber-50", prop: "background-color", equals: "rgb(255, 251, 235)", readable: "pale amber", label: "The notice has pale amber" }], hints: [{ level: 1, text: "Add the lightest amber background utility." }, { level: 2, text: "Add bg-amber-50 to the class list." }], xp: 40 }),
    s11({ id: "barangay-clean-text-amber-900", task: "Darken the notice words so they have enough contrast.", inputMode: "guided", files: { "index.html": "<aside class=\"bg-amber-50\">Clean-up Day! Barangay Together!</aside>", "styles.css": ".text-amber-900 {\n  color: #78350f;\n}" }, activeFile: "index.html", highlightToken: "bg-amber-50", tests: [{ id: "barangay-clean-text-amber-900-style", kind: "style", selector: ".text-amber-900", prop: "color", equals: "rgb(120, 53, 15)", readable: "dark amber", label: "The notice has dark amber" }], hints: [{ level: 1, text: "Add the darkest amber text utility. It goes after bg-amber-50." }, { level: 2, text: "Add text-amber-900 to the class list." }], xp: 40 }),
    s11({ id: "barangay-clean-p-4", task: "Give the notice room inside.", inputMode: "guided", files: { "index.html": "<aside class=\"bg-amber-50 text-amber-900\">Clean-up Day! Barangay Together!</aside>", "styles.css": ".p-4 {\n  padding: 1rem;\n}" }, activeFile: "index.html", highlightToken: "text-amber-900", tests: [{ id: "barangay-clean-p-4-style", kind: "style", selector: ".p-4", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The notice has 16 pixels" }], hints: [{ level: 1, text: "Add the four-step padding utility. It goes after text-amber-900." }, { level: 2, text: "Add p-4 to the class list." }], xp: 40 }),
    s11({ id: "barangay-clean-rounded-lg", task: "Round the notice corners.", inputMode: "guided", files: { "index.html": "<aside class=\"bg-amber-50 text-amber-900 p-4\">Clean-up Day! Barangay Together!</aside>", "styles.css": ".rounded-lg {\n  border-radius: 0.5rem;\n}" }, activeFile: "index.html", highlightToken: "p-4", tests: [{ id: "barangay-clean-rounded-lg-style", kind: "style", selector: ".rounded-lg", prop: "border-top-left-radius", equals: "8px", readable: "8 pixels", label: "The notice has 8 pixels" }], hints: [{ level: 1, text: "Add the large corner-radius utility. It goes after p-4." }, { level: 2, text: "Add rounded-lg to the class list." }], xp: 40 }),
    s11({ id: "barangay-clean-border-amber-200", task: "Give the notice a faint amber edge.", inputMode: "guided", files: { "index.html": "<aside class=\"bg-amber-50 text-amber-900 p-4 rounded-lg\">Clean-up Day! Barangay Together!</aside>", "styles.css": ".border-amber-200 {\n  border: 1px solid #fde68a;\n}" }, activeFile: "index.html", highlightToken: "rounded-lg", tests: [{ id: "barangay-clean-border-amber-200-class", kind: "source-matches", file: "index.html", pattern: "class=\\\"[^\\\"]*\\bborder-amber-200\\b", flags: "i", because: "Add border-amber-200 to the class list.", label: "The notice has a faint amber edge" }], hints: [{ level: 1, text: "Add the light amber border utility. It goes after rounded-lg." }, { level: 2, text: "Add border-amber-200 to the class list." }], xp: 40 }),
    s12({ id: "computer-shop-text-xl", task: "Make the card heading larger.", inputMode: "guided", files: { "index.html": "<article>Welcome to QuickTech Solutions</article>", "styles.css": ".text-xl {\n  font-size: 1.25rem;\n}" }, activeFile: "index.html", highlightToken: "article", tests: [{ id: "computer-shop-text-xl-style", kind: "style", selector: ".text-xl", prop: "font-size", equals: "20px", readable: "20 pixels", label: "The card has 20 pixels" }], hints: [{ level: 1, text: "Add the extra-large text-size utility." }, { level: 2, text: "Add text-xl to the class list." }], xp: 40 }),
    s12({ id: "computer-shop-font-semibold", task: "Give the heading more weight.", inputMode: "guided", files: { "index.html": "<article class=\"text-xl\">Welcome to QuickTech Solutions</article>", "styles.css": ".font-semibold {\n  font-weight: 600;\n}" }, activeFile: "index.html", highlightToken: "text-xl", tests: [{ id: "computer-shop-font-semibold-style", kind: "style", selector: ".font-semibold", prop: "font-weight", equals: "600", readable: "semibold", label: "The card has semibold" }], hints: [{ level: 1, text: "Add the semibold weight utility. It goes after text-xl." }, { level: 2, text: "Add font-semibold to the class list." }], xp: 40 }),
    s12({ id: "computer-shop-leading-relaxed", task: "Open up the space between lines.", inputMode: "guided", files: { "index.html": "<article class=\"text-xl font-semibold\">Welcome to QuickTech Solutions</article>", "styles.css": ".leading-relaxed {\n  line-height: 1.625;\n}" }, activeFile: "index.html", highlightToken: "font-semibold", tests: [{ id: "computer-shop-leading-relaxed-style", kind: "style", selector: ".leading-relaxed", prop: "line-height", equals: "32.5px", readable: "relaxed line spacing", label: "The card has relaxed line spacing" }], hints: [{ level: 1, text: "Add the relaxed line-height utility. It goes after font-semibold." }, { level: 2, text: "Add leading-relaxed to the class list." }], xp: 40 }),
    s12({ id: "computer-shop-tracking-wide", task: "Loosen the letters slightly.", inputMode: "guided", files: { "index.html": "<article class=\"text-xl font-semibold leading-relaxed\">Welcome to QuickTech Solutions</article>", "styles.css": ".tracking-wide {\n  letter-spacing: 0.025em;\n}" }, activeFile: "index.html", highlightToken: "leading-relaxed", tests: [{ id: "computer-shop-tracking-wide-style", kind: "style", selector: ".tracking-wide", prop: "letter-spacing", equals: "0.5px", readable: "wide letter spacing", label: "The card has wide letter spacing" }], hints: [{ level: 1, text: "Add the wide letter-spacing utility. It goes after leading-relaxed." }, { level: 2, text: "Add tracking-wide to the class list." }], xp: 40 }),
    s12({ id: "computer-shop-text-center", task: "Centre the heading.", inputMode: "guided", files: { "index.html": "<article class=\"text-xl font-semibold leading-relaxed tracking-wide\">Welcome to QuickTech Solutions</article>", "styles.css": ".text-center {\n  text-align: center;\n}" }, activeFile: "index.html", highlightToken: "tracking-wide", tests: [{ id: "computer-shop-text-center-style", kind: "style", selector: ".text-center", prop: "text-align", equals: "center", readable: "centred", label: "The card has centred" }], hints: [{ level: 1, text: "Add the centred text utility. It goes after tracking-wide." }, { level: 2, text: "Add text-center to the class list." }], xp: 40 }),
  ],
};
