# Computer-course runner decision

Date: 2026-09-08. Status: proposed; owner decision required before implementation.

Recommend a learner-run local checker for the five computer courses. It can inspect real files, Git history, Node processes, and local HTTP responses. Its pasted report must remain **learner-reported local results**, not independently verified competence. Keep these courses without graded steps until the checker and its authoring gate are approved and proven.

This document implements nothing. It authorizes no dependency, iframe, storage key, progress migration, certificate rule, or provider integration. The current course shells have empty `steps` arrays and `requiresComputer: true`.

## What must be checked

Each row describes a proposed sequence of small lessons, not one large step. Each individual step introduces one change and one or two new behavioral assertions.

| Course | Concrete resulting-state checks | A meaningful failing start and passing solution |
|---|---|---|
| Command Line and Git | Expected relative paths and file contents; a file moved without losing its contents; staged versus unstaged changes; a commit containing the intended tree; branch ancestry and a resolved merge whose output preserves both edits. Read machine-readable Git output, not terminal screenshots. | Start has an unstaged change; solution stages only the intended file. A later merge starts with conflicting fixture branches and ends with the expected combined file and no unresolved index entries. |
| Node.js Fundamentals | A module returns the expected value for two inputs; a command exits correctly and prints the expected result; asynchronous file reading completes; missing-file and malformed-JSON cases produce the specified error; output stays within a temporary project directory. | Start reads the wrong file or returns before the read completes. Solution returns the expected data and handles the missing-file fixture. |
| Building APIs | Method/path routing; status, content type, and JSON response; invalid input refused without a write; created record readable afterward; unknown id handled; persistence survives a local process restart. | Start accepts a negative quantity or changes no stored record. Solution rejects the invalid request and preserves the prior state; separate steps prove successful creation and persistence. |
| Auth and Security | Unauthenticated access refused; user A cannot read or modify user B's fixture record; logout invalidates the fixture session; missing anti-forgery protection is caught for the selected cookie-session design; public responses and built assets exclude fake secret markers. | Start trusts a client-supplied owner id and returns another fixture user's record. Solution denies that request while allowing the legitimate owner's request. These specific checks never justify a blanket claim that an application is secure. |
| Full-Stack Integration | A real UI action creates a record through the learner's API; reloading retrieves it; loading, empty, and failed-request states appear; a signed-out action is refused; submitted public URL exposes the expected application and handles a deep link. | Start updates only component memory. Solution performs the API request and restores the record after reload. A local HTTP checker alone cannot prove a UI click or layout: browser automation needs a separate dependency decision, or those checks remain explicitly manual and ungraded. |

Git documents `status --porcelain=v1 -z` as a stable format suited to machine parsing. That makes it a suitable source for staging checks. [Git status documentation](https://git-scm.com/docs/git-status#_porcelain_format_version_1)

## Options and their limits

| Option | What it can prove | Cost and limitation | Rule 1.8 outcome |
|---|---|---|---|
| A. Browser simulation of a shell, file tree, and small Git model | Deterministic paths, file changes, staging, and simplified commits against an in-memory model. An allowlisted command parser interprets data; it does not execute a real shell. | No install, but substantial parser/model authoring and tests. It cannot prove real Git, OS permissions, Node processes, network behavior, or actual deployment. Reusing the NoSQL data structures would not make them a filesystem or Git implementation. | Can satisfy fail-on-start and solution-pass for explicitly labelled simulations. Cannot count simulated success as completion of the corresponding real-machine behavior. |
| B. Local checker, with a report pasted into the website | Actual local state and behavior for Git, Node, and API lessons. The same fixed checks run against authored starts and reference solutions. | Requires Node and Git installation where absent, terminal/PATH setup, and cross-platform support. Learner code runs with the learner's OS access. Pasted reports can be fabricated or edited. UI automation and external services need separate decisions. | Can establish that a lesson is behaviorally meaningful through a local authoring gate. A pasted pass alone cannot establish that the learner ran an unchanged checker or submitted their own result. |
| C. Instructions with self-attestation | The learner says they followed the instructions. Useful for setup help and reading material. | Lowest software cost; no behavioral evidence. A checkbox, screenshot, or copied command cannot establish the intended resulting state. | Fails the rule for graded steps: the same affirmation can be submitted before any work. Keep outside graded step counts, XP, evidence, and certificate completion. Teaching these unchecked needs the owner decision described in PLAN decision 39. |
| D. Platform-hosted execution or a browser Node/shell runtime | A hosted runtime could execute code centrally; a browser runtime could emulate some machine behavior. | Hosted execution contradicts PLAN decision 9. A new browser runtime has unmeasured download/memory cost and would need dependencies and a newly authorized execution boundary. | Neither becomes acceptable merely by passing tests. Both are excluded from this implementation scope. |

A browser-private filesystem is scoped to its web origin and is not the learner's ordinary project directory. Adding persistent browser files would also require a reviewed storage design; option A proposes in-memory data only. [WebKit filesystem explanation](https://webkit.org/blog/12257/the-file-system-access-api-with-origin-private-file-system/)

## Rules that constrain the choice

| Rule | Effect on the options |
|---|---|
| AGENTS 1.1, iframe boundaries | A tenth frame is not authorized. No option may combine script and same-origin permissions or execute learner JavaScript on the platform origin. Option A would need a separately approved design that interprets bounded plain data, with no new frame or evaluated commands. Option B runs outside the web app on the learner's machine. |
| AGENTS 1.7, closed assertions | Future local checks must be named plain-data variants, such as expected file contents or an HTTP response contract. No authored callbacks, arbitrary shell-command strings, or JavaScript assertion strings. Repository-owned checker implementations interpret these variants. Changing `TestSpec` and wiring its dispatch need a separate reviewed implementation. |
| AGENTS 1.8, meaningful checks | For A or B, the same assertions must fail on untouched starting state and pass on the reference solution. Infrastructure failure is not a valid failing-start result. C cannot meet this requirement for graded work. Existing `/harness` cannot exercise an OS process, so B also needs an approved companion authoring gate before any local step ships. |
| AGENTS section 3, dependencies | No shell emulator, Git library, browser Node runtime, container tool, or browser automation package is approved. Any proposed package must clear the four repository tests and receive the required owner decision. B proposes repository-owned checker code using installed Node and Git, with no new npm package. Installing tools on the learner's machine still has a real setup and data cost. |
| PLAN decision 9 | The backend runs on the learner's machine; the learner submits a URL. Hosted execution of uploaded learner code is eliminated. B fits the local execution requirement. It does not replace the eventual published-URL submission with a pasted report. Public endpoint checks, if later implemented, need their own bounded URL-fetch and network-security design. |

## Proposed local-checker contract

1. Distribute a versioned checker and small fixture bundle from the repository. Use Node's built-in test facilities and fixed adapters for filesystem, Git, process, and HTTP assertions; the test runner is available without adding a testing package. [Node test runner](https://nodejs.org/docs/latest-v24.x/api/test.html)
2. The learner selects a project directory explicitly. A lesson manifest names only supported checks and relative paths. Resolve paths inside that directory, reject traversal and escaping links, cap data/output sizes, and launch only known executables with separate arguments. Never treat pasted text as a command. Do not modify global Git configuration, remotes, credentials, or unrelated files.
3. Run only the selected project. Use disposable fixture data, fake users and secrets, a minimal environment, loopback HTTP addresses, a fixed execution timeout, and reliable child-process cleanup. No background service or elevation. These controls reduce accidental damage; they do not sandbox arbitrary local learner code. Node explicitly describes its permission model as protection against mistakes in trusted code, not a malicious-code security boundary. [Node permissions](https://nodejs.org/api/permissions.html)
4. Authoring verification starts from clean fixture copies. Verify checker health first; require a named behavior failure on the starter, all assertions passing on the solution, and relevant negative cases still failing. Repeat with a fresh database/process to expose leaked state. Pin tested Node/Git versions and verify Windows and another supported OS before claiming portability.
5. A proposed pasted JSON report contains course/project/step ids, checker and fixture versions, expected check ids, and bounded pass/fail details. Parse it strictly and reject unknown versions, missing/duplicate checks, oversized values, and unsafe keys. Include no code, secret values, personal home paths, tokens, or full logs. A checksum can detect accidental mismatch; a nonce or locally generated signature does not make a report trustworthy when the learner controls the checker and signing material.
6. Initially display results without persisting them or changing course completion. Label them as local results reported by the learner. Any later progress, passport, evidence, or certificate integration needs a separate trust decision and a backward-compatible storage design. A forged-report test must prove that parsing a syntactically valid pass cannot mint independently verified evidence.

Local authoring checks prove the educational fixture, not the honesty of the report sender. Keep that distinction visible in the product and in QA reports.

## Transfer and 4 GB laptop budget

The following are **unmeasured planning estimates and proposed caps**, not measured build sizes or performance claims. Count them as incremental to the existing lesson shell. At an ideal 3 Mbps, 1 decimal KB takes about 0.0027 seconds; real loading also includes latency, protocol overhead, parsing, and device contention.

| Option | Proposed incremental transfer | Ideal transfer-only time | Setup and runtime costs |
|---|---|---|---|
| A. Simulation | 20-60 KB compressed interpreter plus 10-30 KB selected-project fixtures | About 0.08-0.24 seconds for 30-90 KB | No Node/Git install; model implementation and behavior fidelity remain unproven. Cap the model's records and command count. |
| B. Local checker | 5-15 KB compressed, lazy-loaded report UI; 40-100 KB compressed downloadable checker and selected fixtures | About 0.01-0.04 seconds for the UI; 0.11-0.27 seconds for the bundle | Node and Git downloads, installed disk footprint, learner project dependencies, and provider uploads are additional and **not measured here**. Check existing installations before asking for downloads. One app process plus one checker, sequential checks, bounded logs; peak memory must be measured on the reference machine. |
| C. Self-attestation | No grading runtime; ordinary instruction-page text only | No new runtime transfer | Real Node/Git setup still applies if the learner performs the exercises. No machine verification is gained. |
| D. Hosted/browser runtime | Not estimated because neither architecture is approved | Not applicable | Do not imply a remote service is free or that a runtime fits 4 GB without measurements. |

Do not precache the checker or all fixtures for phone-only learners. Before release, measure compressed artifacts and a cold selected-project download, test repeat use offline, and record peak combined browser/editor/server/checker memory on a 4 GB machine. Installation permission, metered downloads, Windows path handling, occupied ports, and process cleanup are required setup QA cases.

## Owner decision to record

Approve option B for a small Command Line and Git pilot, accepting **learner-reported local results for practice only**. Keep real UI automation, published-URL verification, completion/evidence integration, and additional dependencies outside that pilot. Its first acceptance case should distinguish an unstaged file from a correctly staged file, fail on the untouched starter, pass on the solution, and reject malformed reports without changing saved progress.

If independently trustworthy completion is required immediately, option B's pasted-report mechanism is insufficient. The five course shells must stay ungraded while the owner chooses a different trust model. No local-course grading, new storage format, or additional execution permission follows merely from accepting this design document.
