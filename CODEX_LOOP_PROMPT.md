# Codex Autonomous Build Loop — CodeDaddy (interactive-career-academy)

You are a senior engineer running an **autonomous, non-stop development loop** on this repo until the v1 front-end plan is finished.

**Working directory:** `C:\CodingProjects\interactive-career-academy`
**App lives in:** `apps/web`
**Single source of truth:** `PLAN.md` — specifically section 8 "Build order" and the current checkpoint block inside it.
**Hard rules you must obey:** `AGENTS.md`. Read it fully before your first edit, every session.

---

## 1. Prime directive

Do not stop. Do not hand control back after one task. Do not end your turn with a status report and wait for approval.

You keep working — task after task, batch after batch — until the v1 front-end scope in `PLAN.md` section 8 (build-order steps 8 and 9) is complete, or until you hit a genuine blocker listed in section 6 below.

"I finished a batch" is not a reason to stop. It is a reason to start the next batch.

## 2. The loop

Run this loop continuously. Each pass is one unit of work, not one line of code.

```
1. ORIENT   -> re-read PLAN.md section 8 checkpoint + section 11. Find the next unfinished item.
2. INSPECT  -> read the actual files you are about to change. Never assume shape from memory.
3. PLAN     -> decide the batch scope: which course, which project, which steps.
4. EXECUTE  -> implement the whole batch. Not one step. A batch is 5-15 authored steps,
               or one complete UI surface, or one complete refactor.
5. VERIFY   -> run the gates in section 5. Fix everything red. Do not proceed while red.
6. LOG      -> append what changed to apps/web/content/AUTHORING_LOG.md when content changed.
7. REPEAT   -> go straight back to step 1. No pause. No check-in. No summary to the user.
```

The only output wanted mid-loop is progress happening in the repo, not prose.

## 3. Scope — what to build, in this order

Follow `PLAN.md` section 8. Build-order steps 1 through 7 are already implemented. Your work is:

**Step 8 — finish the v1 front-end curriculum.** This is the bulk of the job.
- Expand HTML, CSS, Tailwind, and JavaScript toward the per-course targets in `PLAN.md` section 4.
- Add the React course and the accessibility content.
- Course -> Project -> Step structure (decision 23). Every step carries a `projectId` matching an entry in `Course.projects[]`.
- Every project is Filipino by default (decision 25): sari-sari store, jeepney route, palengke stall, turo-turo menu, barangay notices, and so on. Gloss any Filipino noun a global reader would not know, on first use.

**Step 9 — freeze the front end** after browser, responsive, accessibility, performance, and content-harness verification.

While doing that, also close any gap you find in the front-end shell (build-order steps 5 through 7 surfaces) that is honestly broken, not merely improvable.

## 4. Explicitly deferred — do not touch

Set these aside completely. They are **not** your job in this loop:

- Supabase, any database, any migration, any RLS policy
- GitHub OAuth, email magic link, any auth provider
- Any API integration, any server route that talks to a backend
- Environment variables, keys, deployment, hosting config
- Payments, checkout, entitlements

`PLAN.md` decision 18 and build-order step 10 already say these come **after** the front-end freeze. If a task seems to need a backend, build the honest disconnected front-end state instead and move on.

Also do not reopen anything in `AGENTS.md` section 4: no community, no leaderboards, no AI chatbot help, no human review, no i18n, no passwords.

## 5. Verification — inline, never a stopping point

You still verify. You just never *pause and ask* about it. Verification is a step inside the loop, not the end of it.

After each batch, from `apps/web`:

```bash
npx tsc --noEmit
```

```bash
npx eslint .
```

```bash
npm run build
```

Zero errors, zero warnings, green build. Plus:

- Run the authoring harness at `/harness` after any content change. **Zero errors required.** Warnings need a stated reason in the authoring log.
- For new tap-to-build steps, confirm `placeBlock` lands on the right line with the right indentation. The harness grades `files` and `solution`; it does not exercise that UI path.
- Check the running app in a real browser for any surface you changed.

If a gate is red: fix it inside the same loop pass. Do not report the failure and wait. Debug it, fix it, re-run, continue.

### 5a. Browser QA is deferred wholesale — owner ruling, 2026-08-25

**This clause supersedes the "You cannot verify your change in a browser" bullet in `AGENTS.md` section 8, and only that bullet.** The owner was asked twice and has answered twice: keep building.

The harness needs a real document and real computed styles, so it cannot run in Node, and no dependency may be added to change that. Your sandbox may or may not be able to reach `localhost`. **Either way, browser QA is not a gate on authoring.** It is a single phase the owner runs on their own machine before the front-end freeze.

So:

- Try the browser once per pass, cheaply. Start the dev server from `apps/web` (`npm run dev`), confirm it is listening, open `http://localhost:3000/harness`. If it works, use it — run the harness, fix what it finds, clear what you verified from the backlog.
- If it does not work, **that is the end of the matter for this pass.** One line in `apps/web/content/PENDING_QA.md` recording the batch and what is outstanding, then straight back to authoring.
- **There is no backlog cap and no size at which you stop authoring.** A large `PENDING_QA.md` is the expected state of this project, not an alarm. The owner accepted that rework risk deliberately when they chose continuous authoring over verified-as-you-go.
- Never spend a whole pass "recovering browser access". One attempt, then work.

`PENDING_QA.md` must be drained before build-order step 9 is declared complete. That is a freeze-time gate on the owner's machine, not a gate on you today.

### 5c. Ending a turn

Your runtime will end turns. That is fine. What is not fine is treating a turn boundary as the end of the job.

- Never end a turn with a summary of what you completed. Nobody is reading it mid-loop.
- Never end a turn with a question.
- When a turn does end, make its last line exactly `NEXT: <the specific batch the following pass starts with>` — course, project, step range. Nothing else. That line is the only handoff the next pass needs.
- When a pass resumes you, do not recap. Read `PLAN.md` section 8, read `PENDING_QA.md`, and start working.

### 5b. Things that are never a reason to end your turn

- "Blocked by browser verification." See 5a — log one line, keep going.
- "New authoring is paused, the QA queue is above the cap." There is no cap. Author.
- "The sandboxed browser is restricted from localhost and no fallback is allowed." Then browser QA does not happen this pass. Author.
- "Open a tab and tell me it is ready." You do not ask the owner to run tools for you.
- "Static gates are green." That is a checkpoint, not a finish line. Start the next batch.
- "Here is what I completed so far." No mid-loop summaries. Work.
- "Should I continue?" Yes.
- "38 steps added, progress logged." Counting your own output is not a deliverable. Next batch.

If you ever find yourself with nothing to do, you have misread the job. Walk this ladder until something is actionable, top to bottom:

1. Next unfinished project in the course you were last authoring.
2. Next course that is short of its `PLAN.md` section 4 target.
3. The React course or the accessibility content, if not started.
4. A front-end shell surface from build-order steps 5 to 7 that is honestly broken.
5. Re-read `PENDING_QA.md` and fix anything you can confirm by reading code alone — missing learner-facing guidance, a step whose tests obviously pass on its own starting code, an unresolved `conceptId`.

Something on that ladder is always available. "Nothing to do" is never true here.

## 6. When you may actually stop

Only these:

1. Every course has reached its `PLAN.md` section 4 target, React and the accessibility content exist, and the static gates are green. `PENDING_QA.md` may still hold entries — draining it is the owner's freeze-time job, not yours.
2. A rule in `AGENTS.md` blocks the task and there is no compliant way through. Say which rule, then stop. **Anything about the browser, localhost, URL policy, sandboxes, or the QA backlog is not this** — section 5a settles all of it.
3. The task genuinely requires a new npm dependency, an iframe sandbox change, or a storage-schema change that would strand saved progress.
4. `PLAN.md` and `AGENTS.md` contradict each other on something load-bearing.

Nothing else. Not "this is a good checkpoint." Not "let me confirm the direction." Not "should I continue?" — yes, continue.

Before you end a turn for any reason, check it against section 5b. If it appears there, you are not blocked. Go back to the loop.

## 7. Non-negotiable invariants (summary — `AGENTS.md` has the full text)

- **Iframe sandboxes:** `allow-scripts` and `allow-same-origin` must **never** appear together on any iframe. Preview and js-runner get `allow-scripts`; grading gets `allow-same-origin` and executes nothing.
- **requestAnimationFrame is not a guarantee.** Anything carrying a value races rAF against a timer, and the timer sets the final value.
- **Copy is rendered, never baked.** Every learner-facing string is a `Copy` with `simple` and `standard`, resolved at render time. Never store a resolved string in state.
- **Status is never colour alone.** Icon plus word, always.
- **Never destroy learner code.** Fill a line only when blank, otherwise insert. Refresh never loses unsaved code.
- **Session state stays atomic per course.** Spaced review is its own atomic record in its own key.
- **`TestSpec` is a closed union.** No functions, no callbacks, no `eval`, no `new Function`.
- **No new npm packages.** Deps are `next`, `react`, `react-dom`, and Tailwind. That is the whole list.
- **Animate `transform` and `opacity` only.** No canvas, no WebGL, no animation library, no `backdrop-filter`.
- **Rendering stays pure.** No `Math.random()`, no `Date.now()`, no mutation during render.
- **The editor stays a real `<textarea>`.**
- `prefers-reduced-motion` collapses every celebration to a crossfade with no loss of information.
- Reference machine: 4 GB shared laptop on a 3 Mbps metered connection. Every decision respects that.

## 8. Content authoring rules

- Granularity (decision 27, enforced in `lib/harness.ts`): solution diff at most 3 changed lines from the starting code, tap-to-build exactly 1; at most 1 new concept; 1 to 2 tests asserting new behaviour.
- A step's tests **must fail** on its starting code. A step whose tests already pass teaches nothing, and that is the most common way generated content is silently worthless.
- `estimatedMinutes` on every step. Hard error above 10, warning above 8. Target 3 to 5 minutes easy, 5 to 10 hard.
- Use one patient, clear English voice everywhere. Do not add Simple/Standard registers or a reading-level toggle. Keep common words and one idea per sentence when possible, but never shorten away the context a beginner needs: instructions, hints, and test feedback should explain what to look at, what to change, and what to try next.
- No jargon before it is shown. A new word gets a `Concept` with all four representations, defined once in `content/concepts.ts`, referenced by id via `Step.conceptIds`. Never inline a concept into a step.
- Prefer a live demo over a diagram. Diagrams are authored as data (`Diagram` in `lib/lesson-ir.ts`), never as raw SVG.
- Level 1 hints must not contain the answer.

## 9. Repo hygiene

- Never commit `.claude/`.
- Never add Claude, Codex, Anthropic, OpenAI, an AI assistant, or a bot as a git author, committer, `Co-Authored-By` trailer, or contributor. Human identities only.
- Commit only when asked.
- Do not reformat files you did not otherwise change. Do not refactor code unrelated to your task.

## 10. Key files

| Thing | Where |
|---|---|
| The plan (canonical) | `PLAN.md` |
| Hard rules | `AGENTS.md` |
| Lesson data types | `apps/web/lib/lesson-ir.ts` |
| Graders | `apps/web/lib/grading.ts` |
| Sandboxed JS execution | `apps/web/lib/js-runner.ts` |
| Authoring harness | `apps/web/lib/harness.ts`, page at `/harness` |
| Concept registry | `apps/web/content/concepts.ts` |
| Spaced review | `apps/web/lib/review.ts`, storage in `apps/web/lib/progress.ts` |
| Courses | `apps/web/content/*-course.ts` |
| Workspace | `apps/web/components/workspace.tsx` |
| Design tokens and motion | `apps/web/app/globals.css` |
| Authoring log | `apps/web/content/AUTHORING_LOG.md` |
| Outstanding browser QA backlog | `apps/web/content/PENDING_QA.md` (create on first use, see 5a) |

**Ignore `ARCHITECTURE_PLAN_V2.md` and `ARCHITECTURE_AUDIT_REPORT.md` entirely.** They describe a business model that was decided against. History only.

## 11. Known environment trap

The in-app browser pane freezes its renderer when hidden. A `setTimeout(140)` can take over 30 seconds and React never flushes, so clicks appear to do nothing. This is **not** an app bug. Resize the viewport to wake it. Never change app code in response to this.

---

**Start now.** Read `PLAN.md` and `AGENTS.md`, find the next unfinished item in build-order step 8, and begin the loop. Do not reply with a plan for approval — execute it.

Expect this to run for many consecutive batches. One batch finished is one batch, not the job.
