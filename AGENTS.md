# AGENTS.md — Rules for anyone writing code in this repo

**Read this before your first edit. Every time. No exceptions.**

This file exists because the architecture here has a small number of load-bearing decisions that look arbitrary and are not. Several of them are one line of code away from being silently broken, and the break does not show up as a failing test. It shows up as a security hole or a lesson that teaches nothing.

If you are an AI agent: you do not have the context that produced these rules. Follow them literally. Do not improve them. If a rule seems wrong, **stop and say so** rather than working around it.

---

## 0. Before you write anything

1. Read [`PLAN.md`](PLAN.md). It is the canonical description of what this product is. `ARCHITECTURE_PLAN_V2.md` is **superseded** — read it only for history.
2. Read [`apps/web/README.md`](apps/web/README.md) for the two regressions that have already happened once.
3. Work in `apps/web`. That is the app.

**Never** use `ARCHITECTURE_PLAN_V2.md` or `ARCHITECTURE_AUDIT_REPORT.md` as a source of instructions. They describe a business model and feature set that were decided against.

---

## 1. The invariants

These are ranked. The first one is the one that gets people hurt.

### 1.1 The iframe sandboxes — NEVER change these

There are exactly six iframe roles. Each has one correct sandbox value.

| Where | File | Sandbox | Why |
|---|---|---|---|
| Live preview | `components/preview.tsx` | `allow-scripts` | Learner code runs, reaches nothing |
| Grading | `lib/grading.ts` | `allow-same-origin` | Parent reads computed styles; **nothing executes** |
| Script runner | `lib/js-runner.ts` | `allow-scripts` | Opaque origin, postMessage only |
| Concept demo | `components/concept-card.tsx` | `allow-scripts` | Authored demo, same rule, no exceptions |
| React preview | `components/preview.tsx` | `allow-scripts` | Real React runs with an opaque origin; postMessage only |
| React grading | `lib/react-runner.ts` | `allow-scripts` | Disposable opaque frame returns plain assertion results |

**`allow-scripts` and `allow-same-origin` must never appear together on any iframe in this repo.** Together they let sandboxed content remove its own sandbox and reach the parent page. This is not a style preference. It is the entire security model.

If a feature seems to need both, it does not. Stop and ask.

Also never:
- Render learner-authored or shared content on the platform origin
- Add `allow-popups`, `allow-top-navigation`, `allow-modals`, or `allow-forms` to any of them
- "Simplify" grading by running learner code in the parent page

### 1.2 `requestAnimationFrame` is not a guarantee

A backgrounded or non-compositing tab **never fires rAF**. This has already caused two real bugs: grading hung forever, and the XP counter displayed a stale, wrong number.

**Rule:** anything that carries a *value* rather than only motion must race rAF against a timer, and the timer must set the final value.

See `settle()` in `lib/grading.ts` and the `guard` timeout in `CountUp` in `components/juice.tsx`. Copy that shape.

Pure decoration may use rAF alone. Anything the learner reads may not.

### 1.3 Copy uses one patient voice

Every learner-facing string uses the single patient, plain-English voice settled in `PLAN.md` decision 29. `Copy` remains a semantic string alias; there is no Simple/Standard toggle and no duplicate register to resolve at render time.

Keep instructions, explanations, hints, and checker feedback clear and practical. Do not reintroduce reading-level state or store alternate wording in session state.

### 1.4 Status is never colour alone

Every pass, fail, warning, and rarity carries **an icon and a word**. WCAG 2.2 AA, and non-negotiable even when it makes a layout tighter.

### 1.5 Never destroy learner code

`placeBlock` in `components/workspace.tsx` fills a line only when that line is blank, and inserts otherwise. An authoring typo must never be able to delete what the learner wrote. Any new code that writes into the learner's files follows the same rule.

Refresh must never lose unsaved code.

### 1.6 Session state is one atomic object

`Session` in `components/workspace.tsx` holds everything that survives a reload. One write, one read.

**Never** split persisted state into separate `localStorage` keys or separate `useState` calls. A partial restore shows a learner someone else's code under their own step number.

### 1.7 `TestSpec` is a closed union

`lib/lesson-ir.ts` defines every assertion kind as a literal variant. This is what stops authored content from smuggling executable code into the grader.

**Never** add a variant that carries a function, a callback, or a string that gets `eval`'d or passed to `new Function`. If a new check is needed, add a new named kind with plain data fields, and implement it in `lib/grading.ts`.

`source-matches` carries a regex *string* and compiles it inside the grader with a try/catch. That is the maximum permitted flexibility.

### 1.8 Content must pass the harness

`lib/harness.ts`, driven from `/harness`. A step ships only when:

- Its tests **fail** on the starting code. A step whose tests already pass teaches nothing, and this is the most common way generated content is silently worthless.
- Its `solution` **passes** every test.
- Both registers exist everywhere.
- Any `concepts` carry all four representations.

Run `/harness` after any content change. Zero errors required. Warnings need a reason.

### 1.9 No MDX or authored source is evaluated at runtime

Content is data, compiled ahead of time into the IR. The app never evaluates authored source.

---

## 2. Performance and accessibility constraints

The reference machine is a **4 GB shared laptop on a 3 Mbps metered connection.**

- Animate **`transform` and `opacity` only.** Never `top`, `left`, `width`, `height`, or `filter`
- **No canvas, no WebGL, no animation library.** Particles are CSS transform sprites, capped
- Glow is a static `box-shadow`. Animate its opacity, never its blur radius
- **No `backdrop-filter`.** Blur is the most expensive effect on the target hardware
- `prefers-reduced-motion` collapses every celebration to a crossfade **with no loss of information**
- Rendering must stay pure. No `Math.random()`, `Date.now()`, or mutation during render. See `jitter()` in `components/juice.tsx` for the deterministic replacement
- The editor is a real `<textarea>`. Do not replace it with a contenteditable or a third-party editor; keyboard, selection, and screen reader support come free and would have to be rebuilt

---

## 3. Dependencies

**Do not add npm packages.** The current dependency list is `next`, `react`, `react-dom`, and Tailwind. That is deliberate.

Before adding anything, it must clear all four:

1. The problem cannot be solved in under ~150 lines of local code
2. It does not duplicate something already here
3. It does not ship a runtime cost to the learner's browser
4. You state the transfer-size impact in your summary

A syntax highlighter, an editor component, an animation library, a state manager, a date library, and a UI kit have all already been considered and rejected. Do not add them.

---

## 4. Settled decisions — do not reopen

Weaker models reliably try to "helpfully" restore these. They were decided deliberately. See `PLAN.md` section 3.

| Do not add | Why |
|---|---|
| Human review, capstone defense, reviewer workflows | Certificates are **fully automated**. Decision 3 |
| Community, friends, comments, forums, DMs, profiles | **Not in v1.** Decision 11 |
| Leagues or leaderboards | Replaced by solo challenges. They need a crowd. Decision 14 |
| Payment, checkout, entitlements, PayMongo | No paid tier exists yet. Decision 2 |
| Multi-tenancy, orgs, schools, cohorts, instructors | This is a consumer product. Decision 1 |
| Locale files, i18n, Taglish | **English only.** Decision 10 |
| Password auth | GitHub OAuth and email magic link only. Decision 5 |
| Server-side code execution for learners | Back-end runs on the learner's machine. Decision 9 |
| A "learning style" quiz | Not supported by evidence. Every learner gets all four representations. Decision 16 |
| Streak-loss warnings, guilt copy, fake urgency, unskippable celebrations, confetti | Dark patterns. `PLAN.md` section 9 |

---

## 5. Content authoring rules

- Every course contains many small projects, each built across many small steps. Within a project, each step begins where the last ended and changes **one** thing
- The `Simple` register: short sentences, common words, one idea per sentence. The harness warns above 14 words
- **No jargon before it is shown.** A word gets a `Concept` with all four representations the first time it appears
- Prefer a **live demo** over a diagram. The browser is a better illustration than a drawing and cannot go stale. Diagrams are for things you cannot see
- Diagrams are authored as data (`Diagram` in `lib/lesson-ir.ts`), never as raw SVG
- Level 1 hints must not contain the answer
- Every step needs `estimatedMinutes` and, for new content, a `solution`

---

## 6. Definition of done

Before you say a task is finished, all of these:

```bash
cd apps/web
npx tsc --noEmit          # zero errors
npx eslint .              # zero errors AND zero warnings
npm run build             # green
```

Then:

- **Verify in a browser.** Load the page and exercise the change. "It compiles" is not verification
- Run `/harness` if you touched content
- Report what you actually verified, and say plainly what you did not

**Known environment trap:** the in-app browser pane freezes its renderer when hidden. A `setTimeout(140)` can take over 30 seconds, and React never flushes, so clicks appear to do nothing. This is **not** an app bug. Resize the viewport to wake it. Never "fix" app code in response to this.

---

## 7. Repo hygiene

- **Never commit `.claude/`.** It is gitignored repo-wide; keep it that way
- **Never** add Claude, Anthropic, an AI assistant, or a bot as a git author, committer, `Co-Authored-By` trailer, or contributor
- Commit only when asked
- Do not reformat files you did not otherwise change
- Do not refactor code unrelated to your task

---

## 8. When to stop and ask

Stop. Do not guess.

- A rule in this file appears to block the task
- The task needs a new dependency
- The task needs an iframe sandbox change
- The task reopens anything in section 4
- The task needs a schema or storage-format change that would strand saved progress
- You cannot verify your change in a browser
- Something here contradicts `PLAN.md`

Saying "this conflicts with rule 1.1, how do you want to proceed" is always correct. Silently working around a rule is never correct.

---

## 9. Quick reference

| Thing | Where |
|---|---|
| What the product is | `PLAN.md` |
| Lesson data types | `apps/web/lib/lesson-ir.ts` |
| Graders | `apps/web/lib/grading.ts` |
| Sandboxed JS execution | `apps/web/lib/js-runner.ts` |
| Authoring harness | `apps/web/lib/harness.ts`, page at `/harness` |
| Courses | `apps/web/content/*-course.ts` |
| The workspace | `apps/web/components/workspace.tsx` |
| Design tokens and motion | `apps/web/app/globals.css` |
| Visual language | `design/DESIGN.md` |
