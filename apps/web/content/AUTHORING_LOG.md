# Authoring rate log

Timed batches of content authoring, kept so PLAN.md section 7's estimate gets
replaced by a measured rate rather than a second guess (decision 22).

Format: one entry per batch. Wall-clock start/end, what got made, and an
honest note on what the number does and does not prove.

---

## 2026-08-23, batch 1 — HTML course, steps 28–33

**Wall clock:** 20:07:30 to 20:21:49 = **14 min 19 s for 6 steps**, ≈2.4 min/step.

**What got made:** 6 new HTML steps (checkbox, two chained radio buttons, a
placeholder attribute, a `<small>` note, a tap-to-build `<strong>` step), 3 new
registry concepts with all four representations (`checkbox`, `radio-button`,
`placeholder-attribute`), the body-chain constants and reference entries each
step needs, plus a small reusable `slotPage()` helper for computing
`slotLine` on tap-to-build steps inserted mid-document.

**Verification performed:** `tsc --noEmit`, `eslint`, `next build` all clean.
`/harness` run twice — first pass found 2 real defects (an identical-text
register warning and a hint that repeated its own `highlightToken`, both on
`small-note`), fixed, re-run clean at 0 errors. Both tap-to-build steps
(`radio-cash`, `strong-emphasis`) were additionally verified by hand in a
real browser session — `placeBlock` inserting at the right line with the
right indentation, `RUN IT` passing, XP awarded, and the course's final
"Course complete" milestone firing correctly on the new last step.

**Why this number should not be trusted the way decision 19's 20–30 min/step
figure is:** this batch was authored directly by an AI editing the TypeScript
source, with the harness as the only reviewer — not the process decision 6
describes (AI drafts, a human plus the harness reviews). It has no human
review pass, no per-step wall-clock isolation (time includes debugging a real
regression, see below), and a sample of 6 is not enough to generalize from
regardless. Read it as one more data point in the same rough, honest spirit as
the Tailwind sample PLAN.md section 7 already records — not as a replacement
for the human-authored rate that decision 22 still calls for.

**One real bug this batch caught, worth keeping:** the first `/harness` run
appeared to hang. It had not — the in-app browser pane had frozen its
renderer after being backgrounded (the exact trap documented in AGENTS.md
section 6), and `window.__harness`, which the harness page deliberately parks
partial results on for this reason, showed only 4 of 69 steps processed after
20+ seconds. A fresh foregrounded tab ran all 69 in a few seconds. Recorded
here because it is the trap the docs warn about, actually encountered.

---

## 2026-08-23, batch 2 — HTML course, project 2 (steps 34–40)

**Wall clock:** 20:36:52 to 20:47:43 = **10 min 51 s for 7 steps**, ≈1.55 min/step.

**What got made:** the second project inside Learn HTML — Price List Table —
exercising the `Course.projects[]` / `Step.projectId` structure with more
than one project for the first time. 7 steps (table, ordered list,
blockquote, figure/figcaption, address), 5 new registry concepts. Confirms
decision 24's project-boundary reset works as designed: project 2 starts
from a blank document, not a continuation of project 1's finished markup.

**Verification performed:** `tsc --noEmit`, `eslint`, `next build` clean.
`/harness`: first run found 1 real error, fixed, re-run at 76 steps / 0
errors / 29 warnings (all pre-characterized granularity, none new in kind).

**One real bug this batch caught:** the `table-skeleton` tap-to-build step's
authored `solution` was the two-line pretty-printed empty table
(`<table>\n</table>`) reused from the next step's starting file, but tapping
one block can only ever produce what's in that block — a single line,
`<table></table>`. The harness's new tap-to-build granularity check (exactly
1 line, decision 27) caught the mismatch immediately as a hard error, not a
warning. Fixed by giving the tap-to-build step its own single-line solution,
separate from the next step's authored (and intentionally differently
formatted) starting point — confirmed via `goNext` in `workspace.tsx`, which
always loads the next step's authored `files` rather than carrying the
learner's actual code forward, so the two were never required to match
byte-for-byte in the first place. Exactly the kind of defect decision 27 was
added to catch mechanically instead of by review.

---

## 2026-08-23, batch 3 — HTML course, project 3 (steps 41–46)

**Wall clock:** Not measured. This draft began before a batch timer was started, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** a third HTML project, Barangay Water Notice, with six steps. It starts from a fresh document, then builds a semantic article, a notice heading and paragraph, a time element, its `datetime` value, and a contact line. The global registry gained three four-representation concepts: `article-element`, `time-element`, and `datetime-attribute`.

**Verification performed:** the browser harness processed all 82 curriculum steps with 0 errors and 30 pre-existing granularity warnings. The new six steps created no warnings. TypeScript, ESLint, and production build all passed before handoff.

**One real authoring issue caught:** adding a line before a closing tag makes the harness's position-based line-diff count include every shifted line. The initial draft therefore produced warnings despite one conceptual change per step. Each new step now replaces an authored blank line, keeping the closing tags aligned and the measured diff within the decision 27 limit.

---

## 2026-08-23, batch 4 — HTML course, project 4 (steps 47–52)

**Wall clock:** 21:17:44 to 21:21:31 = **3 min 47 s for 6 steps**, ≈0.63 min/step.

**What got made:** a fourth HTML project, Jeepney Route Guide, with six steps. It starts from a fresh document, then builds navigation, a route title and list, a same-page Palengke link, its matching `id`, and a short description. The registry gained three four-representation concepts: `nav-element`, `fragment-link`, and `id-attribute`.

**Verification performed:** the browser harness processed all 88 curriculum steps with 0 errors and 29 pre-existing granularity warnings. The new six steps created no warnings. TypeScript and ESLint passed before the final production build.

**One real bug caught:** the first route-stop test selected every h2 and therefore inspected the navigation title instead of the Palengke destination. The harness rejected the solution. Narrowing the closed-data selector to `h2#palengke` fixed the assertion and the full harness then passed.

**Why this number is not a usable authoring rate:** it covers AI drafting and one automated review loop, not a human review pass. The number is kept for transparency only and does not replace the measurement decision 22 calls for.

---

## 2026-08-23, batch 5 — HTML course, project 5 (steps 53–58)

**Wall clock:** 21:26:26 to 21:29:13 = **2 min 47 s for 6 steps**, ≈0.46 min/step.

**What got made:** a fifth HTML project, Turo-Turo Food Stall Menu, with six steps. It starts from a fresh document, then builds a collapsible menu with details, summary, a dish, a price, an initial open state, and an allergy note. The registry gained three four-representation concepts: `details-element`, `summary-element`, and `open-attribute`.

**Verification performed:** the browser harness processed all 94 curriculum steps with 0 errors and 29 pre-existing granularity warnings. The new six steps created no warnings. TypeScript and ESLint passed before the final production build.

**One real bug caught:** the menu-price level-1 hint repeated its highlighted dish name, so the harness marked it as a spoiler. The hint now refers to the dish without repeating the answer token. The full harness then passed.

**Why this number is not a usable authoring rate:** it covers AI drafting and one automated review loop, not a human review pass. The number is kept for transparency only and does not replace the measurement decision 22 calls for.

---

## 2026-08-23, batch 6 — HTML course, project 6 (steps 59–64)

**Wall clock:** Not measured. This draft began before a batch timer was started, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** a sixth HTML project, Adobo Recipe Facts, with six steps. It starts from a fresh document, then builds a definition list with a cooking-time term and value, a servings term and value, and a serving note. The registry gained three four-representation concepts: `definition-list`, `term-element`, and `description-element`.

**Verification performed:** the browser harness processed all 100 curriculum steps with 0 errors and 29 pre-existing granularity warnings. The new six steps created no warnings. TypeScript and ESLint passed before the later production build that includes this project.

---

## 2026-08-23, batch 7 — HTML course, project 7 (steps 65–71)

**Wall clock:** Not measured. This draft's start and end were not isolated, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** a seventh HTML project, Barangay Clinic Bulletin, with seven steps. It starts from a fresh document, then builds a clinic message, marks an abbreviation and its expanded title, highlights free check-ups, and records a cancelled and corrected clinic day. The registry gained five four-representation concepts: `abbreviation-element`, `title-attribute`, `mark-element`, `deletion-element`, and `insertion-element`.

**Verification performed:** the browser harness processed all 107 curriculum steps with 0 errors and 29 pre-existing granularity warnings. The new seven steps created no warnings. TypeScript and ESLint passed before the later production build that includes this project.

---

## 2026-08-23, batch 8 — HTML course, project 8 (steps 72–76)

**Wall clock:** Not measured. This draft's start and end were not isolated, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** an eighth HTML project, Computer Shop Connection Guide, with five steps. It starts from a fresh document, then gives a connection instruction, marks keyboard input, an exact access code, and sample computer output. The registry gained three four-representation concepts: `keyboard-input-element`, `code-element`, and `sample-output-element`.

**Verification performed:** the browser harness processed all 112 curriculum steps with 0 errors and 29 pre-existing granularity warnings. The new five steps created no warnings. TypeScript, ESLint, and the 17-route production build all passed. The browser course card hydrated with 76 HTML steps and no console errors.

---

## 2026-08-23, batch 9 — HTML course, project 9 (steps 77–83)

**Wall clock:** Not measured. This draft's start and end were not isolated, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** a ninth HTML project, Relief Supply Tracker, with seven steps. It starts from a fresh document, then builds a labelled progress tracker with readable fallback text, its current and maximum values, and a labelled water-level meter with its current and maximum values. The registry gained four four-representation concepts: `progress-element`, `value-attribute`, `max-attribute`, and `meter-element`.

**Verification performed:** the browser harness processed all 119 curriculum steps with 0 errors and 29 pre-existing granularity warnings. The new seven steps created no warnings. TypeScript, ESLint, and the 18-route production build all passed.

---

## 2026-08-23, batch 10 — HTML course, project 10 (steps 84–88)

**Wall clock:** Not measured. This draft's start and end were not isolated, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** a tenth HTML project, Weather Photo, with five steps. It starts from a fresh document, then builds a responsive picture container, a smaller alternate source, its narrow-screen media condition, a descriptive fallback image, and lazy loading. The registry gained four four-representation concepts: `picture-element`, `source-element`, `media-attribute`, and `loading-attribute`.

**Verification performed:** the browser harness processed all 124 curriculum steps with 0 errors and 29 pre-existing granularity warnings. The new five steps created no warnings. TypeScript, ESLint, and the 18-route production build all passed.

---

## 2026-08-23, batch 11 — HTML course, project 11 (steps 89–95)

**Wall clock:** Not measured. This draft's start and end were not isolated, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** an eleventh HTML project, Water Notice Video, with seven steps. It adds a notice heading, a native video player, MP4 source, playback controls, English captions, and a default captions setting. The registry gained `video-element`, `controls-attribute`, `track-element`, and `default-attribute`.

**Verification performed:** the browser harness processed all 131 curriculum steps with 0 errors and 29 pre-existing granularity warnings. The heading's initial multi-line starter created one granularity warning; it was changed to a one-line blank heading and the warning cleared. TypeScript, ESLint, and the 18-route production build all passed.

---

## 2026-08-24, batch 12 — HTML course, project 12 (steps 96–102)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** a twelfth HTML project, Barangay Radio Update, with seven steps. It starts from a fresh document and builds a radio-update heading, a native audio player, an MP3 source, playback controls, metadata-only preload, and a readable transcript sentence. The global registry gained `audio-element` and `preload-attribute`, each with all four required representations.

**Verification performed:** the browser harness processed all 138 curriculum steps with 0 errors and 29 pre-existing granularity warnings. TypeScript and ESLint passed. The course data was also loaded in the local browser through the harness page, with no console errors.

**One authoring safeguard retained:** the audio-player tap-to-build step has its own one-line solution (`<audio></audio>`). The following source step uses an intentionally formatted multi-line starter. This preserves the exact one-line tap-to-build diff while allowing the next guided edit to land on an authored blank line.

---

## 2026-08-24, batch 13 — HTML course, project 13 (steps 103–111)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** a thirteenth HTML project, Jeepney Stop Search, with nine steps. It builds a labelled stop input, connects it to a native datalist, and adds Palengke, Terminal, and City Hall suggestions. The global registry gained `list-attribute` and `datalist-element`, each with all four required representations.

**Verification performed:** the browser harness processed all 147 curriculum steps with 0 errors and 29 pre-existing granularity warnings. TypeScript and ESLint passed. The first harness run exposed a new four-line warning from an extra authored blank line in `search-label`; the starter and solution now preserve line positions, and the final harness run added no new warning.

**One authoring safeguard retained:** the datalist tap-to-build step has a one-line solution (`<datalist id="stops"></datalist>`). The next guided option step receives its own multi-line starter with blank slots, preserving the exact tap-to-build diff and letting each option remain a one-line edit.

---

## 2026-08-24, batch 14 — HTML course, project 14 (steps 112–120)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** a fourteenth HTML project, Barangay Help Contacts, with nine steps. It builds clear phone and email contacts, then connects them to `tel:117` and `mailto:help@barangay.example`. The global registry gained `telephone-link` and `mailto-link`, each with all four required representations.

**Verification performed:** the browser harness processed all 156 curriculum steps with 0 errors and 29 pre-existing granularity warnings. TypeScript, ESLint, and the 18-route production build passed. The local browser loaded the updated HTML course at `STEP 27 OF 120` with no console errors.

**One authoring safeguard retained:** each new anchor tap-to-build step has its own one-line empty-anchor solution. The following guided step receives an authored `href=""` starter, so adding the phone or email address stays a one-line change without destroying learner code.

---

## 2026-08-24, batch 15 — HTML course, project 15 (steps 121–127)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** a fifteenth HTML project, Barangay Bulletin Download, with seven steps. It builds a clear bulletin PDF link and adds the native `download` attribute. The global registry gained `download-attribute` with all four required representations.

**Verification performed:** the browser harness processed all 163 curriculum steps with 0 errors and 29 pre-existing granularity warnings. TypeScript and ESLint passed before the harness run.

---

## 2026-08-24, batch 16 — HTML course, project 16 (steps 128–133)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** a sixteenth HTML project, Barangay Safety Tip, with six steps. It builds semantic supporting content with an `aside`, a readable safety paragraph, highlighted urgent words, and a small emergency note. The global registry gained `aside-element` with all four required representations.

**Verification performed:** the browser harness processed all 169 curriculum steps with 0 errors and 29 pre-existing granularity warnings. TypeScript, ESLint, and the 18-route production build passed.

---

## 2026-08-24, batch 17 — HTML course, project 17 (steps 134–140)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** a seventeenth HTML project, Barangay Office Hours, with seven steps. It practices readable office scheduling with time text, a machine-readable opening value, and a holiday note.

**Verification performed:** the browser harness processed all 176 curriculum steps with 0 errors and 29 pre-existing granularity warnings. TypeScript and ESLint passed.

---

## 2026-08-24, batch 18 — HTML course, project 18 (steps 141–147)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** an eighteenth HTML project, Palengke Price Label, with seven steps. It adds readable and machine-readable rice price data plus a unit note. The global registry gained `data-element` with all four required representations.

**Verification performed:** the browser harness processed all 183 curriculum steps with 0 errors and 29 pre-existing granularity warnings. TypeScript and ESLint passed.

---

## 2026-08-24, batch 19 — CSS course, project 2 (steps 13–19)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** continued the second Learn CSS project, Sari-Sari Receipt, through seven small styling steps: white background, inside spacing, border, bold total, a capped width, automatic side margins, and a teal title. The global registry gained `margin-property` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 190 curriculum steps with 0 errors and 29 pre-existing granularity warnings; the new receipt steps added none.

---

## 2026-08-24, batch 20 — CSS course, project 3 (steps 20–25)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added a third Learn CSS project, **Turo-Turo Order Row**, in six small steps. The learner makes a food-and-price row a flex container, distributes it with `space-between`, aligns it vertically, then adds padding, a divider, and deliberate price weight. The global concept registry gained `flex-container`, `justify-content`, and `align-items`, each with all four required representations.

**Verification performed:** TypeScript and ESLint passed. The first browser harness run caught a real no-op lesson: `<strong>` is bold by default, so the starting code already met the last test. The price is now a neutral `.price` span; the corrected browser harness processed all 196 steps with 0 errors and 29 pre-existing warnings, with none from the new project. The 18-route production build passed.

---

## 2026-08-24, batch 21 — CSS course, project 4 (steps 26–30)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the fourth Learn CSS project, **Barangay Notice Banner**, in five small steps: background, readable text colour, padding, line height, and corner radius. The global registry gained `line-height` with all four representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 201 steps with 0 errors and 29 pre-existing granularity warnings; the notice lessons added none.

---

## 2026-08-24, batch 22 — CSS course, project 5 (steps 31–36)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the fifth Learn CSS project, **Palengke Produce Grid**, in six small steps. It introduces grid containers, equal fraction columns, grid gaps, stall surface styling, and a min-width responsive media rule. The global registry gained `grid-container`, `grid-template-columns`, and `media-query`, each with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The first harness run correctly rejected a brittle computed-width assertion for `repeat(2, 1fr)` and flagged an overlarge media-query diff. The column test now checks the authored closed-data rule; the media starter supplies the rule shell so the learner changes only the column value. The corrected browser harness processed all 207 steps with 0 errors and 29 pre-existing warnings, with none from the grid project.

---

## 2026-08-24, batch 23 — CSS course, project 6 (steps 37–41)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the sixth Learn CSS project, **Emergency Help Link**, in five small steps. It gives a real `tel:117` link box styling and a visible keyboard focus indicator. The global registry gained `inline-block` and `focus-visible`, each with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 212 steps with 0 errors and 29 pre-existing granularity warnings; the accessibility lessons added none.

---

## 2026-08-24, batch 24 — JavaScript course, project 2 (steps 13–18)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the second Learn JavaScript project, **Jeepney Fare Check**, in six small steps. The learner stores a fixed fare and payment, calculates and prints change, then builds and calls an exact-fare function. The global registry gained `constant` and `strict-equality`, each with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 218 steps with 0 errors and 29 pre-existing granularity warnings; the new JavaScript lessons added none.

---

## 2026-08-24, batch 25 — Tailwind course, project 2 (steps 13–18)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the second Learn Tailwind CSS project, **Sari-Sari Status Badge**, in six small steps. It composes an inline flex status badge, centres and spaces content, adds green status colour, pill rounding, and a responsive text-size variant. The global registry gained `responsive-variant` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The first harness run found three level-1 hints that named their answer tokens and an unnecessary inherited CSS payload that made one solution too large. The hints now describe the intent without supplying the token and the solution keeps only the needed utility rule. The corrected browser harness processed all 224 steps with 0 errors and 29 pre-existing warnings, with none from the badge project.

---

## 2026-08-24, batch 26 — JavaScript course, project 3 (steps 19–24)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the third Learn JavaScript project, **Barangay Queue Check**, in six small steps. It creates a named waiting list, checks membership, writes a reusable queue-check function, and finds an item's zero-based position. The global registry gained `array-includes` and `array-index-of`, each with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 230 steps with 0 errors and 29 pre-existing granularity warnings; the new JavaScript lessons added none.

---

## 2026-08-24, batch 27 — CSS course, project 7 (steps 42–46)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the seventh Learn CSS project, **Barangay Request Form**, in five small steps. It caps form width, makes shared fields full-width, explains border-box sizing, then adds field padding and a visible border. The global registry gained `box-sizing` with all four required representations.

**Verification performed:** TypeScript and ESLint passed. The first browser harness run exposed a grading-frame-dependent computed-width assertion. It now checks the authored closed-data shared-field rule instead. The corrected browser harness processed all 235 steps with 0 errors and 29 pre-existing warnings; the form project added none. A production build was rerun after a transient parallel-build lock cleared; compilation and type checking passed, with final route-generation output pending confirmation in the next continuation.

---

## 2026-08-24, batch 28 — JavaScript course, project 4 (steps 25–29)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the fourth Learn JavaScript project, **Sari-Sari Item Facts**, in five small steps. It models a product as an object, reads named properties, builds a reusable product-label function, and logs its output. The global registry gained `object` and `property-access`, each with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 240 steps with 0 errors and 29 pre-existing granularity warnings; the new JavaScript lessons added none.

---

## 2026-08-24, batch 29 — CSS course, project 8 (steps 47–52)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the eighth Learn CSS project, **Barangay Service Cards**, in six small steps. It lays service cards out with flex, gap, wrapping, equal growth, a minimum width, and a simple surface. The global registry gained `flex-wrap` and `flex-grow`, each with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 246 steps with 0 errors and 29 pre-existing granularity warnings; the new CSS lessons added none.

---

## 2026-08-24, batch 30 — JavaScript course, project 5 (steps 30–35)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the fifth Learn JavaScript project, **Barangay Budget Split**, in six small steps. It stores a budget and participant count, calculates division and the remainder, then creates and logs a reusable split label. The global registry gained `remainder-operator` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The first harness run warned that the label-function reference carried unrelated budget declarations, making the solution larger than the step. The reference now contains only the function. The corrected browser harness processed all 252 steps with 0 errors and 29 pre-existing warnings, with none from the new project.

---

## 2026-08-24, batch 31 — CSS course, project 9 (steps 53–57)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the ninth Learn CSS project, **Palengke Price Columns**, in five small steps. It lays out name-and-price rows, adds vertical breathing room, right-aligns price text, and uses tabular figures for an easier-to-scan numeric column. The global registry gained `text-align` and `tabular-numbers`, each with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 257 steps with 0 errors and 29 pre-existing granularity warnings; the new CSS lessons added none.

---

## 2026-08-24, batch 32 — Tailwind course, project 3 (steps 19–23)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the third Learn Tailwind CSS project, **Palengke Category Grid**, in five small steps. It composes a category grid, two and responsive three-column layouts, spacing, and shared card surfaces.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. TypeScript first caught an invalid `equals` field on closed `count` tests; those tests now use the supported `atLeast` shape. The first harness run then caught a level-1 hint that repeated its highlighted token; the hint now directs the next action without giving that token. The corrected browser harness processed all 262 steps with 0 errors and 29 pre-existing warnings, with none from the new project.

---

## 2026-08-24, batch 33 — JavaScript course, project 6 (steps 36–40)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the sixth Learn JavaScript project, **Tricycle Fare Rounder**, in five small steps. It stores a decimal fare, rounds to the nearest peso, finds the lower whole peso, then makes and logs a reusable rounding function. The global registry gained `math-round` and `math-floor`, each with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 267 steps with 0 errors and 29 pre-existing granularity warnings; the new JavaScript lessons added none.

---

## 2026-08-24, batch 34 — JavaScript course, project 7 (steps 41–45)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the seventh Learn JavaScript project, **Barangay Name Cleanup**, in five small steps. It stores a raw typed name, trims outer spaces, converts text to uppercase, then makes and logs a reusable display-name function. The global registry gained `string-trim` and `string-uppercase`, each with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 272 steps with 0 errors and 29 pre-existing granularity warnings; the new JavaScript lessons added none.

---

## 2026-08-24, batch 35 — CSS course, project 10 (steps 58–62)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the tenth Learn CSS project, **Barangay Holiday Theme**, in five small steps. It defines a named teal custom property, resolves it with `var`, reuses the value for a border, then adds spacing and a pale background. The global registry gained `css-custom-property` and `css-var`, each with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 277 steps with 0 errors and 29 pre-existing granularity warnings; the new CSS lessons added none.

---

## 2026-08-24, batch 36 — CSS course, project 11 (steps 63–67)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the eleventh Learn CSS project, **Barangay Alert Motion**, in five small steps. It uses a transform-only transition and hover lift, provides a prefers-reduced-motion fallback, and gives the flood alert a clear border. The global registry gained `css-transition`, `css-transform`, and `prefers-reduced-motion`, each with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The first harness browser tab was background-throttled while checking; a foregrounded follow-up confirmed all 282 steps, 0 errors, and 29 pre-existing warnings. The alert project added none.

---

## 2026-08-24, batch 37 — Tailwind course, project 4 (steps 24–28)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the fourth Learn Tailwind CSS project, **Jeepney Route Notice**, in five small steps. It composes padding, a teal surface, left border width and colour, and right-side corner rounding.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The first harness run caught a real fixture gap: a border-width utility lacked a solid border style, so computed width did not produce a visible border. The local utility fixture now includes border-left-style: solid. The corrected browser harness processed all 287 steps with 0 errors and 29 pre-existing warnings, with none from the route project.

---

## 2026-08-24, batch 38 — JavaScript course, project 8 (steps 46–50)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the eighth Learn JavaScript project, **Sari-Sari Stock Check**, in five small steps. It defines stock counts, creates a reusable sold-out predicate, filters sold-out counts, measures the result, and logs it. The global registry gained `array-filter` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 292 steps with 0 errors and 29 pre-existing granularity warnings; the new JavaScript lessons added none.

---

## 2026-08-24, batch 39 — JavaScript course, project 9 (steps 51–55)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the ninth Learn JavaScript project, **Palengke Price Update**, in five small steps. It creates a reusable price-adjustment function, maps it across a price list, reads the first result, and logs the transformed list. The global registry gained `array-map` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 297 steps with 0 errors and 29 pre-existing granularity warnings; the new JavaScript lessons added none.

---

## 2026-08-24, batch 40 — CSS course, project 12 (steps 68–72)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the twelfth Learn CSS project, **Barangay Announcement Heading**, in five small steps. It styles an uppercase update label, controls tracking, gives the heading a clamped responsive size and compact line-height, then caps the line length in character units. The global registry gained `text-transform`, `letter-spacing`, `css-clamp`, and `ch-unit`, each with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. Two initially viewport-sensitive computed-style checks were deliberately replaced with closed-data source checks for the authored `line-height: 1.1` and `max-width: 20ch` declarations. The browser harness processed all 302 steps with 0 errors and 29 pre-existing warnings; the new CSS lessons added none.

---

## 2026-08-24, batch 41 — Tailwind course, project 5 (steps 29–33)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the fifth Learn Tailwind CSS project, **Barangay Event Card**, in five small steps. It composes a constrained width, white surface, padding, medium shadow, and a hover shadow state.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 307 steps with 0 errors and 29 pre-existing granularity warnings; the new Tailwind lessons added none.

---

## 2026-08-24, batch 42 — JavaScript course, project 10 (steps 56–60)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the tenth Learn JavaScript project, **Barangay Donation Total**, in five small steps. It stores donations, creates a reusable addition function, reduces the list to one total, creates a peso label, and logs the total. The global registry gained `array-reduce` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 312 steps with 0 errors and 29 pre-existing granularity warnings; the new JavaScript lessons added none.

---

## 2026-08-24, batch 43 — JavaScript course, project 11 (steps 61–65)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the eleventh Learn JavaScript project, **Barangay Contact Find**, in five small steps. It stores contact names, creates a reusable desk check, finds the first matching contact, reads its length, and logs it. The global registry gained `array-find` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 317 steps with 0 errors and 29 pre-existing granularity warnings; the new JavaScript lessons added none.

---

## 2026-08-24, batch 44 — Tailwind course, project 6 (steps 34–38)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the sixth Learn Tailwind CSS project, **Barangay Help Link**, in five small steps. It composes a compact flex link, aligns and spaces its contents, then adds a visible dark-teal keyboard focus outline using Tailwind state variants.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The first harness pass flagged a level-one hint that repeated the highlighted token; the hint was rewritten. The corrected browser harness processed all 322 steps with 0 errors and 29 pre-existing granularity warnings; the new Tailwind lessons added none.

---

## 2026-08-24, batch 45 — JavaScript course, project 12 (steps 66–70)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the twelfth Learn JavaScript project, **Sari-Sari Stock Alert**, in five small steps. It stores stock counts, makes a sold-out check, uses `some` to detect whether any count is zero, produces an alert label, and logs it. The global registry gained `array-some` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness briefly remained in its normal Checking state while the JavaScript suite ran; the follow-up result processed all 327 steps with 0 errors and 29 pre-existing granularity warnings. The new JavaScript lessons added none.

---

## 2026-08-24, batch 46 — CSS course, project 13 (steps 73–77)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the thirteenth Learn CSS project, **Barangay Announcement Link**, in five small steps. It sets a readable dark-teal link colour and stronger weight, then makes the underline thicker, offsets it from the text, and adds a darker hover colour. The global registry gained `text-decoration-thickness` and `text-underline-offset`, each with all four required representations.

**Verification performed:** TypeScript and ESLint passed. The first production-build run compiled and began static generation but did not return its normal final route report; a clean repeat completed all 18 routes successfully. The browser harness processed all 332 steps with 0 errors and 29 pre-existing granularity warnings; the new CSS lessons added none.

---

## 2026-08-24, batch 47 — JavaScript course, project 13 (steps 71–75)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the thirteenth Learn JavaScript project, **Barangay Payment Check**, in five small steps. It stores payment amounts, defines a reusable positive-payment check, uses `every` to validate the whole list, creates a status label, and logs it. The global registry gained `array-every` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 337 steps with 0 errors and 29 pre-existing granularity warnings; the new JavaScript lessons added none.

---

## 2026-08-24, batch 48 — Tailwind course, project 7 (steps 39–43)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Palengke Price Row** in five small steps: flex layout, split alignment, vertical padding, bottom border, and a soft slate border colour.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The browser harness processed all 342 steps with 0 errors and 29 pre-existing granularity warnings; the new Tailwind lessons added none.

---

## 2026-08-24, batch 49 — CSS course, project 14 (steps 78–83)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the fourteenth Learn CSS project, **Turo-Turo Order Button**, in six small steps. It gives an order button a dark-teal surface, white text, practical padding, gentle corner rounding, a pointer cursor, and a darker hover state. The global registry gained `cursor-property` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. Browser-only harness, pointer/hover, and responsive checks are recorded in `PENDING_QA.md` because the browser tooling refused localhost navigation after its initial connection failure.

---

## 2026-08-25, batch 50 — JavaScript course, project 14 (steps 76–80)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the fourteenth Learn JavaScript project, **Barangay Flood Notice**, in five small steps. It stores notice words, joins them into a readable message, adds an alert prefix, changes the message to uppercase, and prints it. The global registry gained `array-join` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. Browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md` because the browser tooling refused localhost navigation after its initial connection failure.

---

## 2026-08-25, batch 51 — Tailwind course, project 8 (steps 44–48)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the eighth Learn Tailwind CSS project, **Barangay Clinic Hours**, in five small steps. It changes a clinic-hours label to uppercase, makes it compact, adds readable tracking, uses a soft slate colour, and gives it a semibold weight. The global registry gained `tracking-utility` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. Browser-only harness, visual, and responsive checks are recorded in `PENDING_QA.md` because the browser tooling refused localhost navigation after its initial connection failure.

---

## 2026-08-25, batch 52 — CSS course, project 15 (steps 84–90)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the fifteenth Learn CSS project, **Barangay Service Status**, in seven small steps. It builds a compact inline status row, aligns and spaces its content, then shapes a green open-status dot one property at a time. The global registry gained `inline-flex` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. Browser-only harness, visual, and responsive checks are recorded in `PENDING_QA.md` because the browser tooling refused localhost navigation after its initial connection failure.

---

## 2026-08-25, batch 53 — JavaScript course, project 15 (steps 81–85)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the fifteenth Learn JavaScript project, **Barangay Contact Keys**, in five small steps. It stores a contact object, reads its detail names, selects the first name, makes it uppercase, and prints it. The global registry gained `object-keys` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. Browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md` because the browser tooling refused localhost navigation after its initial connection failure.

---

## 2026-08-25, batch 54 — Tailwind course, project 9 (steps 49–53)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the ninth Learn Tailwind CSS project, **Barangay Water Notice**, in five small steps. It constrains the notice width, adds a pale cyan surface and padding, then builds a strong left notice edge with matching cyan colour.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. Browser-only harness, visual, and responsive checks are recorded in `PENDING_QA.md` because the browser tooling refused localhost navigation after its initial connection failure.

---

## 2026-08-25, batch 55 — JavaScript course, project 16 (steps 86–90)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the sixteenth Learn JavaScript project, **Barangay Service List Check**, in five small steps. It stores two service names, verifies that they form an array, reads the first name, makes a readable label, and prints it. The global registry gained `array-is-array` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. Browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md` because the browser tooling refused localhost navigation after its initial connection failure.

---

## 2026-08-25, batch 56 — JavaScript course, project 17 (steps 91–95)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the seventeenth Learn JavaScript project, **Barangay Shelter Contacts**, in five small steps. It stores shelter details, reads values from the object, selects the first value, makes a lead label, and prints it. The global registry gained `object-values` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The real-browser `/harness` ran all 426 steps. It reported no finding for this new project, but its visible error counter retained stale background-renderer state; it must not promote a verified curriculum count. Console-preview and responsive inspection remain in `PENDING_QA.md`.

---

## 2026-08-25, batch 57 — JavaScript course, project 18 (steps 96–100)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the eighteenth Learn JavaScript project, **Barangay Clinic Hours Entries**, in five small steps. It stores opening hours, turns them into name-and-time pairs, reads the first pair, selects its name, and prints it. The global registry gained `object-entries` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The real-browser `/harness` ran all 431 steps and reported no finding for either new JavaScript project. The visible error counter again retained stale background-renderer state, so it must not promote a verified curriculum count. Console-preview and responsive inspection remain in `PENDING_QA.md`.

---

## 2026-08-25, batch 58 — JavaScript course, project 19 (steps 101–105)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added the nineteenth Learn JavaScript project, **Barangay Permit Update**, in five small steps. It stores permit details, changes the status property, reads the updated status, makes a status label, and prints it. The global registry gained `object-property-update` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The real-browser `/harness` ran all 436 steps and reported no finding for the permit project. Its visible error counter retained stale hidden-renderer state, so it must not promote a verified curriculum count. Console-preview and responsive inspection remain in `PENDING_QA.md`.

---

## 2026-08-25, batch 59 — JavaScript course, project 20 (steps 106–110)

**What got made:** added Barangay Desk List. It introduces `for...in` and bracket notation.

**Verification performed:** TypeScript, ESLint, and the 18-route build passed. The first browser harness run flagged a four-line loop diff; rewritten to a one-line loop. The real-browser rerun covered 441 steps and reported no Desk List finding. Its visible error counter retained stale hidden-renderer state, so it must not promote a verified curriculum count.

---

## 2026-08-25, batch 60 — JavaScript course, project 21 (steps 111–115)

**What got made:** added Barangay Hotline Pair. It introduces array destructuring.

**Verification performed:** TypeScript, ESLint, and the 18-route build passed. The real-browser harness covered 446 steps and reported no Hotline Pair finding. Its visible error counter retained stale hidden-renderer state, so it must not promote a verified curriculum count.

---

## 2026-08-25, batch 61 â€” JavaScript course, project 22 (steps 116â€“120)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Emergency Details** in five small steps. It stores a barangay emergency contact, uses object destructuring to take its two named details into variables, creates a label for each detail, and prints both labels. The global registry gained `object-destructuring` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 62 â€” JavaScript course, project 23 (steps 121â€“125)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Welcome Message** in five small steps. It stores a guest name, gives a welcome function a fallback name, makes a personal and fallback message, then prints both. The global registry gained `default-parameter` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 63 â€” JavaScript course, project 24 (steps 126â€“130)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Service Lookup** in five small steps. It stores two barangay service statuses, checks for listed and missing services, makes a health-service label, and prints it. The global registry gained `object-has-own` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 64 â€” JavaScript course, project 25 (steps 131â€“135)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Shift Roster** in five small steps. It stores weekday and weekend volunteer lists, uses spread syntax to combine them, reads the first volunteer, and prints that name. The global registry gained `spread-syntax` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 65 â€” JavaScript course, project 26 (steps 136â€“140)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Donation Readout** in five small steps. It stores a donation as text, converts it into a number, checks whether it is large, makes a label, and prints that label. The global registry gained `number-conversion` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 66 â€” JavaScript course, project 27 (steps 141â€“145)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Visitor Check** in five small steps. It stores a visitor name, uses a text includes check for present and absent names, makes a label, and prints it. The global registry gained `text-includes` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 67 â€” JavaScript course, project 28 (steps 146â€“150)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Supply Order** in five small steps. It stores supply names, sorts them in letter order, reads the first supply, makes a label, and prints it. The global registry gained `array-sort` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 68 â€” JavaScript course, project 29 (steps 151â€“155)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Event Announcement** in five small steps. It stores an event message, introduces an arrow function, calls it, changes its result to uppercase, and prints it. The global registry gained `arrow-function` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 69 â€” JavaScript course, project 30 (steps 156â€“160)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Attendee Count** in five small steps. It stores attendee names, introduces a rest parameter, counts the list by spreading it into a function, makes a label, and prints it. The global registry gained `rest-parameter` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 70 - JavaScript course, project 31 (steps 161-165)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Reminder List** in five small steps. It stores two event reminders, introduces `forEach`, counts the reminders, makes a label, and prints the messages and count. The global registry gained `array-for-each` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 71 - JavaScript course, project 32 (steps 166-170)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Aid Doubling** in five small steps. It stores relief pack counts, maps them into a doubled list, reads the first result, makes a label, and prints it. The existing `array-map` concept supplies all four representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 72 - JavaScript course, project 33 (steps 171-175)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Open Seats** in five small steps. It stores shelter seat counts, filters for positive counts, reads the first open count, makes a label, and prints it. The existing `array-filter` concept supplies all four representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 73 - JavaScript course, project 34 (steps 176-180)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Rice Total** in five small steps. It stores rice sack counts, writes an adding function, combines the counts with the existing `reduce` concept, makes a label, and prints it.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 92 - JavaScript course, project 53 (steps 271-275)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Full Boxes** in five small steps. It stores a relief-pack count and box capacity, finds the box count, introduces `Number.isInteger`, checks for whole boxes, and prints the result. The global registry gained `number-is-integer` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 91 - JavaScript course, project 52 (steps 266-270)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Cash Difference** in five small steps. It stores due and paid amounts, finds their difference, introduces `Math.abs`, finds the unpaid amount, and prints it. The global registry gained `math-abs` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 90 - JavaScript course, project 51 (steps 261-265)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Relief Boxes** in five small steps. It stores a family count and box capacity, introduces `Math.ceil`, finds the number of boxes needed, makes a label, and prints it. The global registry gained `math-ceil` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 89 - JavaScript course, project 50 (steps 256-260)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Water Alert** in five small steps. It stores water-tank levels, introduces `Math.min`, checks whether the lowest level needs a refill, makes a label, and prints it. The global registry gained `math-min` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 74 - JavaScript course, project 35 (steps 181-185)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Notice Order** in five small steps. It stores three notice messages, introduces `reverse`, reads the first reversed notice, makes a label, and prints it. The global registry gained `array-reverse` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 75 - JavaScript course, project 36 (steps 186-190)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Top Notices** in five small steps. It stores three notice messages, introduces `slice`, reads the first copied notice, makes a label, and prints it. The global registry gained `array-slice` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 76 - JavaScript course, project 37 (steps 191-195)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Notice Tags** in five small steps. It stores morning and afternoon tags, introduces `concat`, counts the joined tags, and prints the count. The global registry gained `array-concat` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 77 - JavaScript course, project 38 (steps 196-200)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Relief Supplies** in five small steps. It stores two supply lists, introduces `flat`, reads the first combined supply, makes a label, and prints it. The global registry gained `array-flat` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 78 - JavaScript course, project 39 (steps 201-205)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Latest Notice** in five small steps. It stores notices in time order, introduces `at`, makes and capitalizes a label for the last notice, and prints it. The global registry gained `array-at` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 79 - JavaScript course, project 40 (steps 206-210)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Service Position** in five small steps. It stores service names, refreshes `indexOf`, changes the zero-based result into a human number, makes a label, and prints it.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 80 - JavaScript course, project 41 (steps 211-215)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Service Labels** in five small steps. It stores service labels, refreshes `Object.entries`, reads the first pair, makes text from the pair, and prints it.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 81 - JavaScript course, project 42 (steps 216-220)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Volunteer Check** in five small steps. It stores zone counts, writes a presence check, refreshes `every`, makes a result label, and prints it.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 82 - JavaScript course, project 43 (steps 221-225)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Aid Search** in five small steps. It stores aid items, writes a rice check, refreshes `find`, makes a result label, and prints it.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 83 - JavaScript course, project 44 (steps 226-230)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Aid Stock Alert** in five small steps. It stores stock counts, writes an empty-stock check, refreshes `some`, makes an alert label, and prints it.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 84 - JavaScript course, project 45 (steps 231-235)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Hotline Prefix** in five small steps. It stores hotline numbers, reads the first one, introduces `startsWith`, makes a check label, and prints it. The global registry gained `string-starts-with` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 85 - JavaScript course, project 46 (steps 236-240)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Permit Suffix** in five small steps. It stores permit codes, reads the first one, introduces `endsWith`, makes a check label, and prints it. The global registry gained `string-ends-with` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 86 - JavaScript course, project 47 (steps 241-245)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Notice Edit** in five small steps. It stores a notice, introduces `replace`, makes and capitalizes an updated label, and prints it. The global registry gained `string-replace` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 87 - JavaScript course, project 48 (steps 246-250)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Ticket Code** in five small steps. It stores a ticket number, introduces `padStart`, makes and capitalizes a ticket label, and prints it. The global registry gained `string-pad-start` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, harness repair — border assertions and tap-to-build solutions

**What changed:** Replaced four flaky border-width computed-style assertions with exact source assertions for the requested CSS or Tailwind utility. Rebuilt seven HTML tap-to-build reference solutions from their actual slot pages, so each solution now differs from its starting page by exactly the one block the learner taps.

**Verification performed:** TypeScript and ESLint passed. The production build generated all 18 routes. A foregrounded real-browser `/harness` run checked all 496 current steps: 0 errors and 36 pre-existing granularity warnings. The queued visual, responsive, console-preview, and tap-placement checks in `PENDING_QA.md` remain outstanding.

---

## 2026-08-25, batch 88 - JavaScript course, project 49 (steps 251-255)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Highest Donation** in five small steps. It stores donation amounts, introduces `Math.max`, makes and capitalizes a largest-donation label, and prints it. The global registry gained `math-max` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 93 - JavaScript course, project 54 (steps 276-280)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Price Tag** in five small steps. It stores a decimal price, introduces `toFixed`, makes a peso price tag, checks its length, and prints it. The global registry gained `number-to-fixed` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 94 - JavaScript course, project 55 (steps 281-285)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Meter Reading** in five small steps. It stores a meter reading as text, introduces `Number.parseFloat`, turns it into a number, checks the reading, and prints the result. The global registry gained `number-parse-float` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 95 - JavaScript course, project 56 (steps 286-290)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Notice Words** in five small steps. It stores a clinic notice, introduces `split`, makes a word list, counts the words, and prints the result. The global registry gained `string-split` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 96 - JavaScript course, project 57 (steps 291-295)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Alert Banner** in five small steps. It stores an alert mark, introduces `repeat`, makes three marks, creates a flood alert, and prints it. The global registry gained `string-repeat` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 97 - JavaScript course, project 58 (steps 296-300)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Permit Prefix** in five small steps. It stores a permit code, introduces `substring`, reads the prefix, checks it, and prints the result. The global registry gained `string-substring` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 98 - JavaScript course, project 59 (steps 301-305)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Notice Cleanup** in five small steps. It stores a clinic notice with extra spaces, introduces `replaceAll`, cleans the notice, checks its date, and prints the result. The global registry gained `string-replace-all` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 99 - JavaScript course, project 60 (steps 306-310)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Notice First Letter** in five small steps. It stores a flood notice, introduces `charAt`, reads its first letter, checks the letter, and prints the result. The global registry gained `string-char-at` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 100 - JavaScript course, project 61 (steps 311-315)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Notice End Cleanup** in five small steps. It stores a clinic notice with spaces after it, introduces `trimEnd`, cleans the end, checks the date, and prints the result. The global registry gained `string-trim-end` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 101 - JavaScript course, project 62 (steps 316-320)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Notice Start Cleanup** in five small steps. It stores a clinic notice with spaces before it, introduces `trimStart`, cleans the start, checks the opening word, and prints the result. The global registry gained `string-trim-start` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-25, batch 102 - JavaScript course, project 63 (steps 321-325)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Notice Small Letters** in five small steps. It stores a capital-letter clinic notice, introduces `toLowerCase`, makes the notice use small letters, checks its text, and prints the result. The global registry gained `string-to-lower-case` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-26, batch 103 - JavaScript course, project 64 (steps 326-330)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Notice Last Word** in five small steps. It stores a clinic notice, introduces `lastIndexOf`, finds its last space, reads the last word, and prints it. The global registry gained `string-last-index-of` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-26, batch 104 - JavaScript course, project 65 (steps 331-335)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Notice Letter List** in five small steps. It stores a flood notice, introduces `Array.from`, makes a letter list, reads its first letter, and prints it. The global registry gained `array-from` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-26, batch 105 - JavaScript course, project 66 (steps 336-340)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Seat Update** in five small steps. It stores open seat labels, introduces `fill`, marks every seat taken, reads the first result, and prints it. The global registry gained `array-fill` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-26, batch 106 - JavaScript course, project 67 (steps 341-345)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Seat Numbers** in five small steps. It stores three seat labels, introduces `keys`, makes their number list, reads the last number, and prints it. The global registry gained `array-keys` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-26, batch 107 - JavaScript course, project 68 (steps 346-350)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Seat Pairs** in five small steps. It stores two seat labels, introduces `entries`, makes their number-and-label pairs, reads the first pair, and prints its label. The global registry gained `array-entries` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-26, batch 108 - JavaScript course, project 69 (steps 351-355)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Seat Call** in five small steps. It stores three seat names, introduces `shift`, calls the first name, counts those left, and prints the next seat. The global registry gained `array-shift` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-26, batch 109 - JavaScript course, project 70 (steps 356-360)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Seat Arrival** in five small steps. It stores two seat names, introduces `unshift`, adds Ana at the start, reads the first seat, and prints it. The global registry gained `array-unshift` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-26, batch 110 - JavaScript course, project 71 (steps 361-365)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Seat Close** in five small steps. It stores three seat names, introduces `pop`, calls the last name, counts those left, and prints the last seat. The global registry gained `array-pop` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-26, batch 111 - JavaScript course, project 72 (steps 366-370)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Seat Join** in five small steps. It stores two seat names, introduces `push`, adds Cia at the end, reads the last seat, and prints it. The global registry gained `array-push` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-26, batch 112 - JavaScript course, project 73 (steps 371-375)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Seat Change** in five small steps. It stores three seat names, introduces `splice`, removes Ben from the middle, reads the new middle seat, and prints it. The global registry gained `array-splice` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-26, batch 113 - JavaScript course, project 74 (steps 376-380)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Seat Duplicate** in five small steps. It stores a repeated seat name, introduces `lastIndexOf`, finds Ana's final place, turns it into a seat number, and prints it. The global registry gained `array-last-index-of` with all four required representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. The one required dev-server attempt did not produce a listener on port 3000, so browser-only harness, console-preview, and responsive checks are recorded in `PENDING_QA.md`. No harness warnings were observed or asserted for this unrun browser-only check.

---

## 2026-08-26, batch 114 - JavaScript course, project 75 (steps 381-385)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Seat Final Match** in five small steps. It stores seat statuses, introduces `findLast`, finds the final open seat, makes an understandable label, makes that label capitalized, and prints it. The global registry gained `array-find-last` with definition, analogy, visual, and proof representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. A real-browser `/harness` run checked 716 steps with 0 errors and 36 existing granularity warnings; the new starting code failed and its reference solutions passed. The harness and the locked JavaScript course page had no console errors. The normal course route is correctly locked until CSS is completed, so console-preview and desktop/375px workspace visual checks remain in `PENDING_QA.md`; no artificial learner progress was created to bypass course gating.

---

## 2026-08-26, batch 115 - JavaScript course, project 76 (steps 386-390)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Seat Final Position** in five small steps. It stores seat statuses, introduces `findLastIndex`, finds the final open-seat position, turns it into a visible seat number, labels it, and prints it. The global registry gained `array-find-last-index` with definition, analogy, visual, and proof representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. A real-browser `/harness` run checked 721 steps with 0 errors and 36 existing granularity warnings; the new starting code failed and its reference solutions passed. The harness had no console errors. Console-preview and desktop/375px workspace visual checks remain in `PENDING_QA.md` because the normal JavaScript route is locked until CSS is completed; no artificial learner progress was created to bypass course gating.

---

## 2026-08-26, batch 116 - JavaScript course, project 77 (steps 391-395)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Desk Safe Number** in five small steps. It stores a nested desk contact, introduces optional chaining, reads the health phone safely, makes an understandable label, makes that label capitalized, and prints it. The global registry gained `optional-chaining` with definition, analogy, visual, and proof representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. A real-browser `/harness` run checked 726 steps with 0 errors and 36 existing granularity warnings; the new starting code failed and its reference solutions passed. The harness had no console errors. Console-preview and desktop/375px workspace visual checks remain in `PENDING_QA.md` because the normal JavaScript route is locked until CSS is completed; no artificial learner progress was created to bypass course gating.

---

## 2026-08-26, batch 117 - JavaScript course, project 78 (steps 396-400)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Desk Fallback Number** in five small steps. It stores an empty desk record, introduces nullish coalescing, uses a helpful message when no health phone exists, labels it, makes that label capitalized, and prints it. The global registry gained `nullish-coalescing` with definition, analogy, visual, and proof representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. A real-browser `/harness` run checked 731 steps with 0 errors and 36 existing granularity warnings; the new starting code failed and its reference solutions passed. The harness had no console errors. Console-preview and desktop/375px workspace visual checks remain in `PENDING_QA.md` because the normal JavaScript route is locked until CSS is completed; no artificial learner progress was created to bypass course gating.

---

## 2026-08-26, batch 118 - JavaScript course, project 79 (steps 401-405)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Contact Type Check** in five small steps. It stores a hotline as text, introduces `typeof`, checks the hotline value kind, labels the result, makes that label capitalized, and prints it. The global registry gained `typeof-operator` with definition, analogy, visual, and proof representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. A real-browser `/harness` run checked 736 steps with 0 errors and 36 existing granularity warnings; the new starting code failed and its reference solutions passed. The harness had no console errors. Console-preview and desktop/375px workspace visual checks remain in `PENDING_QA.md` because the normal JavaScript route is locked until CSS is completed; no artificial learner progress was created to bypass course gating.

---

## 2026-08-26, batch 119 - JavaScript course, project 80 (steps 406-410)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Contact Card** in five small steps. It stores office-and-phone name-and-value pairs, introduces `Object.fromEntries`, turns the pairs into a contact record, reads its phone number, labels it, and prints it. The global registry gained `object-from-entries` with definition, analogy, visual, and proof representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. A real-browser `/harness` run checked 741 steps with 0 errors and 36 existing granularity warnings; the new starting code failed and its reference solutions passed. The harness had no console errors. Console-preview and desktop/375px workspace visual checks remain in `PENDING_QA.md` because the normal JavaScript route is locked until CSS is completed; no artificial learner progress was created to bypass course gating.

---

## 2026-08-26, batch 120 - JavaScript course, project 81 (steps 411-415)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Rain Plan** in five small steps. It stores a rain answer, introduces the conditional expression, chooses a rain plan in one line, labels the plan, makes the label capitalized, and prints it. The global registry gained `conditional-expression` with definition, analogy, visual, and proof representations.

**Verification performed:** TypeScript, ESLint, and the 18-route production build passed with zero warnings. A real-browser `/harness` run checked 746 steps and initially reported one unrelated existing `if` reference failure. A new browser tab then rechecked all 746 steps with 0 errors and the same 36 existing granularity warnings; the new starting code failed and its reference solutions passed. The harness had no console errors. Console-preview and desktop/375px workspace visual checks remain in `PENDING_QA.md` because the normal JavaScript route is locked until CSS is completed; no artificial learner progress was created to bypass course gating.

---

## 2026-08-26, batch 121 - JavaScript course, project 82 (steps 416-420)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Desk Entry** in five small steps. It stores an ID check and an open-desk check, introduces logical AND, combines both answers into an entry decision, labels that decision, and prints it. The global registry gained `logical-and` with definition, analogy, visual, and proof representations.

**Verification performed:** TypeScript, ESLint, and the 20-route production build passed with zero warnings. A real-browser `/harness` run checked 751 steps with 0 errors and 36 existing granularity warnings; the new starting code failed and its reference solutions passed. The harness had no console errors. Console-preview and desktop/375px workspace visual checks remain in `PENDING_QA.md` because the normal JavaScript route is locked until CSS is completed; no artificial learner progress was created to bypass course gating.

---

## 2026-08-26, batch 122 - JavaScript course, project 83 (steps 421-425)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Help Desk** in five small steps. It stores a closed health desk and an open service desk, introduces logical OR, checks whether either desk can help, labels that decision, and prints it. The global registry gained `logical-or` with definition, analogy, visual, and proof representations.

**Verification performed:** TypeScript, ESLint, and the 20-route production build passed with zero warnings. A real-browser `/harness` run checked 756 steps with 0 errors and 36 existing granularity warnings; the new starting code failed and its reference solutions passed. The harness had no console errors. Console-preview and desktop/375px workspace visual checks remain in `PENDING_QA.md` because the normal JavaScript route is locked until CSS is completed; no artificial learner progress was created to bypass course gating.

---

## 2026-08-26, batch 123 - JavaScript course, project 84 (steps 426-430)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Desk Closed** in five small steps. It stores a closed-desk answer, introduces logical NOT, reverses that answer into a clear closed check, creates a polite return-later reminder, and prints it. The global registry gained `logical-not` with definition, analogy, visual, and proof representations.

**Verification performed:** TypeScript, ESLint, and the 20-route production build passed with zero warnings. A real-browser `/harness` run checked 761 steps with 0 errors and 36 existing granularity warnings; the new starting code failed and its reference solutions passed. The harness had no console errors. Console-preview and desktop/375px workspace visual checks remain in `PENDING_QA.md` because the normal JavaScript route is locked until CSS is completed; no artificial learner progress was created to bypass course gating.

---

## 2026-08-26, batch 124 - HTML course, project 25 (steps 189-193)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Story Source** in five small steps. It opens a fresh source page, names the page, adds a flood-history reminder, introduces the `cite` element, and names the barangay record that supports the reminder. The global registry gained `cite-element` with definition, analogy, visual, and proof representations.

**Verification performed:** TypeScript, ESLint, and the 20-route production build passed with zero warnings. A real-browser `/harness` run checked 771 steps with 0 errors and 36 existing granularity warnings; the new starting code failed and its reference solutions passed. The harness had no console errors. Workspace desktop/375px visual checks remain in `PENDING_QA.md` because no artificial learner step position was created to skip to this later HTML project.

---

## 2026-08-26, batch 125 - CSS course, project 16 (steps 91-95)

**Wall clock:** Not measured. This draft was not bounded by a batch timer, so it must not be used for the authoring-rate estimate in PLAN.md section 7.

**What got made:** added **Barangay Focus Link** in five small steps. It styles an office-hours link, adds a keyboard-focus outline, introduces `outline-offset`, then improves the link weight and underline. The global registry gained `outline-offset` with definition, analogy, visual, and proof representations.

**Verification performed:** TypeScript, ESLint, and the 20-route production build passed with zero warnings. A real-browser `/harness` run checked 771 steps with 0 errors and 36 existing granularity warnings; the new starting code failed and its reference solutions passed. The harness had no console errors. Workspace desktop/375px visual checks remain in `PENDING_QA.md` because CSS is correctly locked until Learn HTML is completed; no artificial learner progress was created to bypass course gating.

---

## 2026-08-26, batch 126 - HTML course, project 26 (steps 194-198)

**What got made:** added **Barangay Abbreviation Guide** in five small steps. It introduces the `abbr` element, gives BHW its full Barangay Health Worker meaning, and reuses the existing `title` attribute lesson.

**Verification performed:** TypeScript and ESLint passed with zero warnings. A real-browser `/harness` run checked 791 steps with 0 errors and 36 existing granularity warnings; the new starting code failed and its reference solutions passed. Workspace visual checks remain in `PENDING_QA.md` without bypassing learner progress.

---

## 2026-08-26, batch 127 - CSS course, project 17 (steps 96-100)

**What got made:** added **Barangay Print Notice** in five small steps. It introduces the print media query and page rule while making the paper notice readable, hiding its print button, and setting a paper margin.

**Verification performed:** TypeScript and ESLint passed with zero warnings. A real-browser `/harness` run checked 791 steps with 0 errors and 36 existing granularity warnings; the new starting code failed and its reference solutions passed. Workspace visual checks remain in `PENDING_QA.md` without bypassing learner progress.

---

## 2026-08-26, batch 128 - HTML course, project 27 (steps 199-203)

**What got made:** added **Barangay Reminder Quote** in five small steps. It introduces the `q` element, adds a short ID reminder, and identifies the existing cited notice source.

**Verification performed:** TypeScript and ESLint passed with zero warnings. A real-browser `/harness` run checked 791 steps with 0 errors and 36 existing granularity warnings; the new starting code failed and its reference solutions passed. Workspace visual checks remain in `PENDING_QA.md` without bypassing learner progress.

---

## 2026-08-26, batch 129 - CSS course, project 18 (steps 101-105)

**What got made:** added **Barangay Night Notice** in five small steps. It introduces `prefers-color-scheme` and `color-scheme` to make a notice readable in both light and dark settings.

**Verification performed:** TypeScript and ESLint passed with zero warnings. The first harness run exposed a new test that accidentally matched the media-query condition; its selector was narrowed, then the real-browser `/harness` run checked 791 steps with 0 errors and 36 existing granularity warnings. Workspace visual checks remain in `PENDING_QA.md` without bypassing learner progress.

---

---

## 2026-08-27 - HTML course, project 28 (local model)

**What got made:** Barangay Health Center Notice, five steps teaching the `i` element, plus the `i-element` concept with all four representations.

**How:** `tools/local-author.mjs` with `qwen2.5-coder-7b-instruct` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.

**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in `PENDING_QA.md` per the owner ruling of 2026-08-25. Course is at 208 steps.

---

## 2026-08-27 - HTML course, project 29 (local model)

**What got made:** Jeepney Route Notice, five steps teaching the `b` element, plus the `b-element` concept with all four representations.

**How:** `tools/local-author.mjs` with `qwen2.5-coder-7b-instruct` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.

**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in `PENDING_QA.md` per the owner ruling of 2026-08-25. Course is at 213 steps.

---

## 2026-08-27 - HTML course, project 30 (local model)

**What got made:** Barangay Sari-Sari Store, five steps teaching the `sub` element, plus the `sub-element` concept with all four representations.

**How:** `tools/local-author.mjs` with `qwen2.5-coder-7b-instruct` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.

**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in `PENDING_QA.md` per the owner ruling of 2026-08-25. Course is at 218 steps.

---

## 2026-08-27 - HTML course, project 31 (local model)

**What got made:** Sari-Sari Store Prices, five steps teaching the `em` element, plus the `em-element` concept with all four representations.

**How:** `tools/local-author.mjs` with `qwen2.5-coder-7b-instruct` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.

**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in `PENDING_QA.md` per the owner ruling of 2026-08-25. Course is at 223 steps.

---

## 2026-08-27 - HTML course, project 32 (local model)

**What got made:** Barangay Water Bill, five steps teaching the `span` element, plus the `span-element` concept with all four representations.

**How:** `tools/local-author.mjs` with `qwen2.5-coder-7b-instruct` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.

**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in `PENDING_QA.md` per the owner ruling of 2026-08-25. Course is at 228 steps.

---

## 2026-08-27 - HTML course, project 33 (local model)

**What got made:** Sari-Sari Store Receipt, five steps teaching the `pre` element, plus the `pre-element` concept with all four representations.

**How:** `tools/local-author.mjs` with `qwen2.5-coder-7b-instruct` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.

**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in `PENDING_QA.md` per the owner ruling of 2026-08-25. Course is at 233 steps.

---

## 2026-08-27 - HTML course, project 34 (local model)

**What got made:** Pharmacy Stock List, five steps teaching the `thead` element, plus the `thead-element` concept with all four representations.

**How:** `tools/local-author.mjs` with `qwen2.5-coder-7b-instruct` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.

**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in `PENDING_QA.md` per the owner ruling of 2026-08-25. Course is at 238 steps.

---

## 2026-08-27 - HTML course, project 35 (local model)

**What got made:** Barangay ID Application, five steps teaching the `tbody` element, plus the `tbody-element` concept with all four representations.

**How:** `tools/local-author.mjs` with `qwen2.5-coder-7b-instruct` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.

**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in `PENDING_QA.md` per the owner ruling of 2026-08-25. Course is at 243 steps.

---

## 2026-08-27 - HTML course, project 36 (local model)

**What got made:** Sari Sari Store Price, five steps teaching the `tfoot` element, plus the `tfoot-element` concept with all four representations.

**How:** `tools/local-author.mjs` with `qwen2.5-coder-7b-instruct` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.

**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in `PENDING_QA.md` per the owner ruling of 2026-08-25. Course is at 248 steps.

---

## 2026-08-27 - HTML course, project 37 (local model)

**What got made:** Barangay Health Centre, five steps teaching the `u` element, plus the `u-element` concept with all four representations.

**How:** `tools/local-author.mjs` with `qwen2.5-coder-7b-instruct` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.

**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in `PENDING_QA.md` per the owner ruling of 2026-08-25. Course is at 253 steps.

---

## 2026-08-27 - HTML course, project 38 (local model)

**What got made:** Jeepney Route Board, five steps teaching the `sup` element, plus the `sup-element` concept with all four representations.

**How:** `tools/local-author.mjs` with `qwen2.5-coder-7b-instruct` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.

**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in `PENDING_QA.md` per the owner ruling of 2026-08-25. Course is at 258 steps.

---

## 2026-08-27 - HTML course, project 39 (local model)

**What got made:** Palengke Fish Stall, five steps teaching the `dfn` element, plus the `dfn-element` concept with all four representations.

**How:** `tools/local-author.mjs` with `qwen2.5-coder-7b-instruct` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.

**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in `PENDING_QA.md` per the owner ruling of 2026-08-25. Course is at 263 steps.

---

## 2026-08-27 - HTML course, project 40 (local model)

**What got made:** Turo Turo Menu, five steps teaching the `menu` element, plus the `menu-element` concept with all four representations.

**How:** `tools/local-author.mjs` with `qwen2.5-coder-7b-instruct` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.

**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in `PENDING_QA.md` per the owner ruling of 2026-08-25. Course is at 268 steps.

---

## 2026-08-27 - HTML course, project 41 (local model)

**What got made:** Barangay Basketball League, five steps teaching the `bdi` element, plus the `bdi-element` concept with all four representations.

**How:** `tools/local-author.mjs` with `qwen2.5-coder-7b-instruct` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.

**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in `PENDING_QA.md` per the owner ruling of 2026-08-25. Course is at 273 steps.

---

## 2026-08-27 - HTML course, project 42 (local model)

**What got made:** School Supply List. A combination project: it assembles a structure out of elements already taught, one node per step, and adds no new concept.

**How:** `tools/local-author.mjs` with `qwen2.5-coder-7b-instruct` served locally. The model supplied the scene, the element, and the wording as JSON; the step structure, tests, hints, and concept entry were generated from a template, so the shape cannot drift.

**Verification performed:** TypeScript and ESLint both clean. Browser harness checks remain queued in `PENDING_QA.md` per the owner ruling of 2026-08-25. Course is at 276 steps.
