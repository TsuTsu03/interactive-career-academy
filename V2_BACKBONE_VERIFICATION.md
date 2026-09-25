# V2 backbone verification

Verified locally on 2026-09-08. Delivery branch: `codex/v2-backbone`.
The production branch is not part of this delivery.

## Delivered

- A shared Node content gate checks structure across 2,810 steps and executes
  all 50 SQL/NoSQL starting files and solutions. Database assertions use the
  same evaluators as browser grading. Invalid solutions and checks that already
  pass on starting code fail the gate. Node 24 is required; no package was added.
- A bounded NoSQL JSON interpreter runs in the one authorized opaque
  `allow-scripts` frame. The document preview, six plain-data assertions,
  timeout, cleanup, prototype protection, and reset behavior are implemented.
- SQL has 30 steps in five projects; NoSQL has 20 in three. Each introduces
  concepts through the existing four-representation registry. The other five
  Program C courses have real project outlines, zero steps, and an accessible
  computer prerequisite notice. Empty courses show a preparation page.
- Existing atomic saved-progress keys are preserved. The v1 certificate still
  requires its ten front-end courses and five capstones. Program C does not
  expand that requirement.
- `V2_RUNNER_DESIGN.md` compares four options for the later computer courses.
  It is a design document; no local checker or server learner runner ships here.
- The Qwen driver limits changes to one selected database course and one log
  entry. It validates JSON, guards other source files, restores exact bytes on
  failure, runs tsc/zero-warning ESLint/content checks, and commits passing
  checkpoints using the configured human identity. It never pushes.
- Branch CI runs types, zero-warning lint, the content gate, and the build on
  `codex/v2-*` pushes as well as the existing main/PR triggers.

## Evidence

| Check | Result |
| --- | --- |
| TypeScript | Zero errors |
| ESLint with `--max-warnings 0` | Zero errors or warnings |
| Production build | Passed, 78 generated pages |
| Node content gate | 2,810 steps; 50 database steps executed; zero errors |
| Negative gate controls | Nine invalid variants rejected without source writes |
| NoSQL runtime controls | Operators, all six assertions, limits, prototype protection, reset passed |
| Real Chrome content harness | SQL 30 and NoSQL 20; zero errors or warnings |
| Desktop 1440px and phone 360px | Runtime diagnostics, workspace grading, phone preview, reload preservation, no horizontal overflow passed |
| Computer prerequisite | Five map notices and all five preparation pages passed; SQL/NoSQL have no false notice |
| Mock backend integration | Auth/progress/submissions/certificate round trip passed; v1 ten-course certificate scope retained |
| Independent review | No unresolved runner, persistence, assertion, or certificate blocker |

The 28 structural warnings reported by the Node gate are existing older-course
warnings. The complete older 2,760-step browser harness was not repeated. No
live provider or production deployment was performed.

Local browser evidence is written to `%TEMP%/codedaddy-v2-audit/v2-audit.json`
and screenshots beside it. Mock-provider evidence is in
`%TEMP%/codedaddy-backend-integration/backend-integration-audit.json`.

## Qwen handoff

The driver uses LM Studio's local constrained-JSON endpoint instead of the
stock agent CLI preamble, which overwhelmed this 7B model in prior trials.
The model has no tools; a fixed adapter applies validated plain data to the
two allowed destinations. This preserves the original driver's bounded passes,
static gates, rollback, STOP_LOOP, and checkpoint workflow.

**Live proof passed with `qwen/qwen3-vl-8b`, 16,384-token context.** One bounded
pass authored five cumulative SQL steps in an isolated local clone. TypeScript,
zero-warning ESLint, and the content gate passed: 2,815 total steps and 55
database steps executed with zero errors. The driver created human-authored
checkpoint `fd96bd8a0ff712011977bf5d94a644364aba34d6`, touching only the selected
SQL course and its authoring log. The probe worktree is clean.

The five probe steps are not included in this branch: the requested exemplar
cap stays at SQL 30 / NoSQL 20. Probe browser QA was deferred as permitted for
authoring-only work. A passing local gate does not replace editorial or browser
review before publishing a future model-authored batch.

Earlier Qwen2.5 Coder 7B trials failed; the driver rejected and restored them.
Qwen3 4B Thinking exhausted its response budget. Neither is represented as a
verified handoff model. The default now selects the model that actually passed.
The proof used a concrete owner brief with seed facts, five step goals, and
expected report outcomes. Unguided, long authoring runs were not proven.

Proof logs: `%TEMP%/codedaddy-qwen-v2-97f3fa2f57664a67b5cc62d74d3327c6/`.
The successful response used 2,685 prompt tokens and 1,039 completion tokens
as reported by the local model API. All test drivers have stopped; the
task-started model and LM Studio server were unloaded/stopped after the proof.

### Exact owner command

Run from a clean `codex/v2-backbone` checkout with the existing dependencies
installed. This reproduces the verified one-pass example. It writes a local
checkpoint; it does not push or deploy. Change the project id and brief for a
different project. The installed model must be available before starting.

```powershell
Set-Location C:/CodingProjects/interactive-career-academy
& "$env:USERPROFILE/.lmstudio/bin/lms.exe" server start
& "$env:USERPROFILE/.lmstudio/bin/lms.exe" load qwen/qwen3-vl-8b --context-length 16384 --ttl 1800
$batchBrief = 'A sari-sari store is a neighborhood shop. Build its restock report. Seed one inventory table with name and stock columns, with rows in this order: Rice 8, Soap 20, Cooking Oil 2, Egg 5. Seed setup belongs ONLY in the outer seed field and is already present for every query. Exactly five goals: select name only; add stock; filter stock <= 10; sort filtered stock ascending; limit to 2 for a trip that can carry two restock items. Preserve earlier edits. Every expected result from step 2 onward includes both name and numeric stock. Step 3 includes Rice 8, Cooking Oil 2, Egg 5; step 4 orders Cooking Oil 2, Egg 5, Rice 8; step 5 keeps Cooking Oil 2 and Egg 5. Each step changes executable SQL. Briefly gloss sari-sari in the first task.'
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ./run-qwen-v2-loop.ps1 -MaxIterations 1 -Model qwen/qwen3-vl-8b -CourseId sql-basics -ProjectId sari-sari-restock-report -BatchSize 5 -BatchBrief $batchBrief
```

`STOP_LOOP` prevents another pass. Default limits are one pass, one retry, five
steps, and one checkpoint per accepted pass. A dirty tree, invalid identity,
unsupported assertion, changed guarded path, or failed gate stops acceptance.
No new npm dependencies, learner storage format, or production configuration
changes were introduced. The computer-course checker still needs the owner
decision described in `V2_RUNNER_DESIGN.md`.

## Resumable database campaign

`run-qwen-v2-campaign.ps1` schedules 72 new SQL projects and 23 new NoSQL
projects in two five-step batches each. Together with the verified exemplars,
the exact stop targets are SQL 750 and NoSQL 250. The campaign derives its next
job from committed course data, so restarting it does not repeat accepted work.

Each child pass gets a concrete Philippine project, seed facts, five ordered
goals, relevant registered concepts, and expected result guidance. The child
driver permits only one selected course and the authoring log, restores rejected
attempts byte-for-byte, and commits only after TypeScript, zero-warning ESLint,
and the behavioral content gate pass. The supervisor retries a rejected batch
up to four times, pushes only `codex/v2-backbone` every ten accepted batches,
and writes status under the ignored `.qwen-v2-campaign/` folder. `STOP_LOOP`
stops it before another batch. Persistent failure stops the campaign safely.

The campaign intentionally ends after the two browser-graded database courses.
Command Line and Git through Full-Stack Integration still need the owner to
choose a trustworthy local-computer grading model from `V2_RUNNER_DESIGN.md`.
Generating plausible but uncheckable lessons would violate the fail-on-start
rule, so those five course shells remain at zero steps.
