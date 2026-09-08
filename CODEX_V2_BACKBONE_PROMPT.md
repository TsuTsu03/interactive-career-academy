# Codex v2 Backbone Prompt - CodeDaddy Program C

**Working directory:** `C:\CodingProjects\interactive-career-academy`
**App:** `apps/web`
**Read before your first edit, every session:** `AGENTS.md` (all of it), `PLAN.md`
decision 42 and section 4's Program C table, and sections 7 through 9 of
`CODEX_LOOP_PROMPT.md` (the invariants and authoring rules there still bind).
**Reference implementation to copy the shape of:** `apps/web/content/sql-course.ts`,
`apps/web/lib/sql-runner.ts`, `apps/web/tools/build-sql-runtime.mjs`.

---

## 1. What this job is, and what it is not

v2 is Program C: seven back-end courses, ~2,880 steps (PLAN.md decision 42).
Today Program C is 8 SQL steps across 2 projects. That gap is roughly the size of
the entire v1 curriculum, so it is a build cycle, not an increment.

**You are building the backbone, not the curriculum.** The backbone is every
piece of plumbing that must exist and be correct before thousands of steps are
written against it, because each one is expensive to change afterwards. Bulk step
authoring is delegated to a local Qwen model, under a prompt and a driver that
you write as deliverable F.

If you find yourself writing step 40 of a course, you have left your scope.
Exemplar step counts in deliverable C are caps, deliberately.

## 2. Prime directive

Work the deliverables in order A through F. Do not reorder them: A is the gate
that makes B through F verifiable, and F is unsafe to run before A exists.

Do not end a turn with a summary or a question. End it with exactly one line:
`NEXT: <deliverable letter> - <the specific next unit of work>`.

**Never edit `PLAN.md` or `AGENTS.md`.** They are the plan and the rules, not
your output. A previous loop deleted `AGENTS.md` outright. If you believe either
is wrong or must change, say so in your `NEXT:` line and change nothing. The one
exception is the AGENTS.md 1.1 iframe table, and only under section 7 below.

## 3. Deliverable A - a content gate that runs without a browser

**Build this first. Nothing else in this prompt is safe without it.**

`lib/harness.ts` needs a real document and real computed styles, so it only runs
at `/harness` in a browser. That was survivable when a frontier model authored v1
with an owner watching. It is not survivable when a 7B local model authors
~1,000 database steps overnight: the failure mode is not a red build, it is a
step whose tests already pass on its starting code, which teaches nothing and
looks completely fine (AGENTS.md 1.8).

Build `apps/web/tools/check-content.mjs`, wired as `npm run check:content`, that
runs in plain Node and exits non-zero on any error.

**Structural checks (all step kinds).** Port the non-DOM rules already in
`lib/harness.ts` rather than inventing new ones: every step carries a `projectId`
matching an entry in `Course.projects[]`; every `conceptIds` entry resolves in
`content/concepts.ts`; `estimatedMinutes` present, hard error above 10 and
warning above 8; `solution` present on all new content; granularity (solution
diff at most 3 changed lines from `start`, tap-to-build exactly 1, at most 1 new
concept, 1 to 2 tests asserting new behaviour); every `TestSpec` variant is a
known literal kind from `lib/lesson-ir.ts`; every `source-matches` regex
compiles.

**Behavioural checks (SQL steps, and NoSQL steps once B exists).** Execute the
step for real, in Node:

- Load the vendored SQLite build already in the repo at
  `apps/web/public/sql/sql-wasm.txt` and `sql-wasm.wasm`. It is a WebAssembly
  module with emscripten glue, and Node can instantiate it. **This adds no npm
  dependency** - the asset is already vendored and `sql.js` is already a
  devDependency. If you conclude it genuinely cannot be driven from Node without
  a new package, stop and say so in your `NEXT:` line rather than adding one.
- For every SQL step: seed the database, run the step's `start` code, evaluate
  its `tests`, and **assert at least one test fails**. Then reset, run
  `solution`, and assert **every test passes**. A step failing either assertion
  is an error, not a warning.
- Reuse the assertion semantics in `lib/grading.ts` rather than reimplementing
  them. Extract the `sql-*` evaluation into a shared pure module that both the
  browser grader and this tool import, so the two can never drift. That
  extraction must not change browser behaviour.

Prove it works before moving on: run it against the existing 8 SQL steps (all
must pass), then temporarily break one step's seed so a test passes on `start`
and confirm the gate catches it. Revert the break.

## 4. Deliverable B - the NoSQL runner

`Databases: NoSQL` (~250 steps) is the second browser-graded course and the last
one that works on a phone. It needs the same treatment SQL got:

- `lib/nosql-runner.ts`, modelled exactly on `lib/js-runner.ts` and
  `lib/sql-runner.ts`: a disposable frame, **`allow-scripts` only**, opaque
  origin, results returned by `postMessage`, store held in memory, dies with the
  frame.
- A document store implemented in local code. No npm package - a small in-memory
  collection with insert, find, filter operators, projection, and sort sits well
  under the 150-line bar in AGENTS.md section 3, and PLAN.md decision 42 is
  explicit that its one dependency exception does not generalise.
- `StepKind` gains `"nosql"` in `lib/lesson-ir.ts`.
- New `TestSpec` variants, `nosql-*`, following the closed-union rule (AGENTS.md
  1.7) - plain data fields only, no function, no callback, nothing reaching
  `eval` or `new Function`. Mirror the `sql-*` family: `nosql-runs`,
  `nosql-doc-count`, `nosql-docs-equal`, `nosql-doc-contains`,
  `nosql-field-equals`, `nosql-collection-exists`.
- Graders in `lib/grading.ts`, a results pane in `components/preview.tsx`
  alongside `SqlPreview`, workspace wiring in `components/workspace.tsx`, harness
  support in `lib/harness.ts`, and Node support in the deliverable A gate.

Every rule that applied to the SQL work applies here unchanged: `allow-scripts`
and `allow-same-origin` never appear together; anything carrying a value races
rAF against a timer, and the timer sets the final value (AGENTS.md 1.2); status
is icon plus word, never colour alone.

## 5. Deliverable C - course scaffolding and registration

Create the remaining six Program C course files and register them, in decision 42
order, in `content/curriculum.ts` under the existing `back-end-development`
program: `nosql-basics`, `cli-git`, `node-basics`, `api-basics`, `auth-security`,
`fullstack-integration`. Set `requires` so each gates on the previous one, and
`sql-basics` gates on the Program B chain exactly as the existing courses do.

Author steps only where the platform can actually check them today:

- **SQL:** extend from 8 to **30 exemplar steps** across at least 4 projects.
  These are the reference batch Qwen imitates, so they must be the best content
  in the repo, not the fastest.
- **NoSQL:** **20 exemplar steps** across at least 3 projects, once B is green.
- **The other five courses:** real `Course` objects with real `projects[]` lists
  and summaries, and **zero steps**. Their grading model does not exist yet - see
  deliverable E. A course with a plausible-looking step that cannot be graded is
  worse than an empty one.

Every project is Filipino by default (PLAN.md decision 25), and any Filipino noun
a global reader would not know is glossed on first use. One patient plain English
voice throughout (AGENTS.md 1.3) - no Simple/Standard registers, no reading-level
state.

## 6. Deliverable D - the computer prerequisite surface

PLAN.md section 4 requires that each course from `Command Line and Git` onward
"states the prerequisite on its face rather than letting a learner discover it
partway in."

Add a declared field on `Course` (for example `requiresComputer?: true`) and
surface it on the curriculum map card and at the top of the course page, before
entry - icon plus words, never colour alone, and phrased as information rather
than a lock. Programs A and B, SQL, and NoSQL stay phone-first and must render
exactly as they do today.

## 7. Owner authorization, and the two things it covers

Deliverable B adds a ninth iframe role, and the AGENTS.md 1.1 table is the
authoritative list of the eight that exist. The owner has authorized, for this
job only:

1. **One new iframe role**, the NoSQL runner: opaque origin, `allow-scripts`
   only, `postMessage` results, disposable, in-memory. No other sandbox
   attribute. No other new frame.
2. **Appending exactly one row to the AGENTS.md 1.1 table** describing that
   frame, in the same format as the existing eight. **Nothing else in
   `AGENTS.md` may be touched** - not the prose, not another section, not a
   reworded rule.

This authorization extends to nothing else. It is not permission to combine
`allow-scripts` with `allow-same-origin` anywhere, to add `allow-popups`,
`allow-top-navigation`, `allow-modals`, or `allow-forms`, or to add a tenth frame
for the Node or API courses. Those need a fresh owner decision.

## 8. Deliverable E - the runner design for the five computer courses

`Command Line and Git`, `Node.js Fundamentals`, `Building APIs`,
`Auth and Security`, and `Full-Stack Integration` run on the learner's own
machine. PLAN.md decision 39 names the terminal and git **unsolved**: there is no
shell in a sandboxed iframe, so nothing can be checked, and decision 9 forbids
server-side execution of learner code.

Write `V2_RUNNER_DESIGN.md` at the repo root. **Design only. Implement nothing.**
It must hand the owner a decision, with:

- What each of the five courses actually needs to check, concretely.
- At least three options with honest costs. For example: a simulated shell and
  file system in the browser, graded on resulting state; a learner-run local
  checker CLI whose output is pasted back; instruction-only steps with
  self-attestation and no grading; a git model implemented over the same
  in-memory store as deliverable B.
- Which options AGENTS.md 1.1, 1.7, 1.8, section 3, and PLAN.md decision 9
  eliminate outright, and why.
- A recommendation, and what it costs in transfer size on a 4 GB laptop over a
  3 Mbps metered connection.
- What each option means for AGENTS.md 1.8: a step that cannot fail on its
  starting code is not a step. If an option cannot satisfy that, say so plainly
  rather than burying it.

## 9. Deliverable F - the Qwen authoring handoff

Two files, written after A through D are green:

**`QWEN_V2_AUTHORING_PROMPT.md`** - the authoring loop prompt for the local
model. Keep it short and mechanical; a 7B model drifts across long prose. It
must:

- Restrict the job to **one course, one project, one batch of 5 to 10 steps** per
  pass, in `content/sql-course.ts` and `content/nosql-course.ts` only.
- Name the exemplar steps you wrote in deliverable C as the shape to copy, by
  file and line.
- State the fail-on-start rule as the single most important rule, using the seed
  comment at the top of `sql-course.ts` as the worked example of how a step
  silently becomes worthless.
- Forbid: new files; new dependencies; edits to `lib/`, `components/`, `app/`,
  `AGENTS.md`, `PLAN.md`, or any course outside Program C; new `TestSpec` kinds;
  inlining a concept instead of registering it in `content/concepts.ts`.
- Require `npm run check:content` green before the pass ends, and one line
  appended to `content/AUTHORING_LOG.md`.
- End every turn with a single `NEXT:` line naming course, project, step range.

**`run-qwen-v2-loop.ps1`** - fork `run-qwen-loop.ps1` and keep its structure
(ASCII only; Windows PowerShell 5.1 reads the file as ANSI, and one curly quote
breaks every line after it). Change:

- Point it at `QWEN_V2_AUTHORING_PROMPT.md`.
- Add `npm run check:content` to `Test-StaticGates`, after tsc and eslint. A red
  content gate reverts the pass exactly as a red tsc does.
- Extend the guarded-file list beyond `AGENTS.md` and `PLAN.md` to every path
  outside `apps/web/content/`, so a drifting model cannot touch a runner or a
  grader and have it survive the pass.
- Keep the checkpoint commit behaviour, and keep the human-only git identity
  rule: never add Claude, Codex, Anthropic, OpenAI, an AI assistant, or a bot as
  author, committer, `Co-Authored-By` trailer, or contributor.

Then **prove the handoff before you hand it over**: run the driver for one pass
against a loaded Qwen model, confirm the produced batch passes `check:content`,
and fix the prompt if it does not. Do not start a long unattended run yourself -
report the exact command for the owner to run.

## 10. Verification, every pass

From `apps/web`:

```bash
npx tsc --noEmit
```

```bash
npx eslint .
```

```bash
npm run check:content
```

```bash
npm run build
```

Zero errors, zero eslint warnings, green build. Plus, for anything with a UI
surface (deliverables B, C, D): load it in a real browser and exercise it. The
in-app browser pane freezes its renderer when hidden - a `setTimeout(140)` can
take 30 seconds and clicks appear dead. That is the environment, not the app.
Resize the viewport to wake it, and never change app code in response to it.

Browser QA stays deferred per `CODEX_LOOP_PROMPT.md` section 5a for **authoring**
work only. It is **not** deferred for a new runner, a new preview pane, or the
prerequisite surface: those are shell surfaces, and shipping one unopened is how
both regressions in `apps/web/README.md` happened.

## 11. Stop and ask - genuinely

Stop and report, do not work around:

- Anything needing a sandbox change beyond the single authorized frame in
  section 7.
- Any new npm package. Decision 42's SQLite exception is the only one, and is not
  precedent.
- A storage or schema change that would strand saved progress at
  `aca.progress.v2.<courseId>`.
- Anything in AGENTS.md section 4's do-not-reopen list: no payments, no
  community, no leaderboards, no human review, no i18n, no passwords, no
  multi-tenancy, no server-side execution of learner code.
- `PLAN.md` and `AGENTS.md` contradicting each other on something load-bearing.
- The deliverable A gate proving impossible in Node without a dependency.

"This conflicts with rule X, how do you want to proceed" is always the right
move. Silently routing around a rule never is.

---

**Start with deliverable A.** Read `AGENTS.md` and `lib/harness.ts` first, build
the gate, then prove it catches a step that passes on its own starting code.
