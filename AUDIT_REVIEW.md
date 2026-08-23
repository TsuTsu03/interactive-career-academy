# Review of the v1 Architecture Audit

**Reviewing:** `ARCHITECTURE_AUDIT_REPORT.md` (audit date 2026-08-23)
**Review date:** 2026-08-23
**Verdict:** The audit is technically sound and should be kept. It is incomplete as a decision document, and it is wrong about what the project's biggest risk is.

---

## 1. Verdict

The audit does the security and data-modelling work well. Its five P0 findings are correct and none of them should be softened.

It fails in three ways:

1. **It audits the platform and ignores the product's actual critical path.** The riskiest, most expensive, least reversible part of this project is writing several hundred interactive lessons with tests, hints, rubrics, and accessibility QA. The audit spends 1,400 lines on runtime isolation, RLS, and commerce ledgers, and gives content production one sentence ("authoring throughput is measurable"). Content is where this project dies.
2. **It demands artifacts it never sketches.** It requires a cost model, a competency matrix, and a "safe lesson IR" as Gate 0 exit criteria, then never shows what any of them look like. A gate nobody can picture is a gate nobody passes.
3. **It leaves its own central business contradiction unresolved.** A free path that ends in a human-reviewed capstone has an unbounded marginal cost per learner. The audit states both requirements and never reconciles them.

Everything below is a gap, a contradiction, or a mis-weighting. The audit's existing findings are not re-argued.

---

## 2. What the audit got right (keep, do not revisit)

- P0-01. Client-side grading is not certificate evidence.
- P0-03. Separate runtime origin, never `allow-scripts` combined with `allow-same-origin`.
- P0-04. MDX is executable code; compile it in CI to a safe representation.
- Immutable curriculum releases with pinned source commit and content hash.
- Order ledger with frozen order lines, minor-unit integers, inbox/outbox.
- Branch-based GitHub publishing with base-SHA checks and no force push.
- Private-by-default learner identity.
- Refusal to promise employment.

Better than most education platforms ship. These stay.

---

## 3. Critical gaps

### G-01 (Critical) — Content production is the critical path and is not in the plan

The free path as specified is 13 stages, 8 projects, and a capstone. At a realistic 3 to 5 hours per polished interactive lesson (prose, exercise, deterministic tests, progressive hints, accessibility pass, review), a 350 to 450 lesson path is roughly 1,200 to 2,000 person-hours of authoring alone. That dwarfs the platform build.

The audit never asks:

- Who writes the curriculum?
- What does the authoring tool look like, and is it built before or after the lessons?
- What does re-authoring cost when the lesson IR schema changes in month 8?
- What is the smallest curriculum that still produces a real learner outcome?

**Consequence:** the release plan can succeed technically and still ship an empty school.

**Required:** treat curriculum authoring DX as a first-class product surface with its own release gate. Cut the v1 free path to the smallest complete outcome. Measure hours-per-published-lesson from lesson one and publish that number in every status review.

### G-02 (Critical) — The free path's economics are undefined and probably negative

The audit preserves the free career-entry baseline and separately demands a human-reviewed first certificate cohort, capstone review staffing, and support. It never states who pays for reviewing a free learner's capstone.

Three consistent resolutions exist. Pick one.

| Model | Free | Paid | Marginal cost per free learner |
|---|---|---|---|
| A. Free learning, paid assessment | All lessons, projects, self-check | Capstone review and credential | Near zero, hosting only |
| B. Free everything, capped credential | Everything including review | Advanced tracks | Unbounded unless cohort size is capped |
| C. Free everything, paid advanced only | Everything including review | Advanced tracks | Unbounded |

**Recommendation: Model A.** It prices the only genuinely expensive unit (reviewer hours), keeps every lesson free forever, and does not require the advanced tracks to exist before there is revenue. It also dissolves the "lifetime access" liability, because assessment is a one-time service rather than a perpetual entitlement.

The ethical framing survives Model A intact. Learning stays free. Only the credential, the part that consumes a human's time, is priced.

### G-03 (High) — The isolated verifier is deferred to Release 6 but required from Release 4

P0-01 says a certificate needs a controlled re-run or human review. Release 4 issues certificates. Release 6 builds the verifier. Releases 4 through 6 therefore run entirely on manual review, and the audit never sizes that workload.

The audit also missed a cheap verifier already implied by its own architecture. The platform is building a GitHub App with repository read access. Verification can run as a **platform-controlled CI job against a pinned commit SHA**, needing no new infrastructure:

1. Learner submits repository and commit SHA.
2. Platform fetches that exact tree into a platform-owned ephemeral job (GitHub Actions on a platform repository, or a container runner).
3. The job installs from a lockfile in a network-restricted sandbox and runs the **platform's** test plan at the released `test_plan_version`. It never executes any workflow file from the learner's repository.
4. The job emits a signed result referencing the evidence snapshot and rubric version.

The learner controls neither the harness nor the runner. This is Release 3 cost, not Release 6 cost. It does not replace human rubric judgment; it removes human time from the deterministic portion of the checklist.

**Required:** move deterministic verification to Release 3 or 4. Keep human review for subjective criteria and the project defense.

### G-04 (High) — "Safe lesson IR" is mandated and never specified

P0-04 is the correct call, but "safe structured lesson data" is not a specification. Every downstream decision depends on this schema: authoring format, component allowlist, runtime contract, grading contract, versioning, migration cost, accessibility rendering, translation.

**Required:** the IR schema is a Gate 0 deliverable with an actual document and a validator, not a principle. A concrete starting shape is proposed in the revised plan.

### G-05 (High) — No cost model, despite requiring one

The audit criticises the PHP 400 to 1,500 prices, lists cost categories, and produces no numbers. A one-page model with explicit assumptions, even wrong ones, beats a list of things that cost money, because a wrong number gets corrected and a list does not.

**Required:** a model with named assumptions for hosting, payment fees, reviewer minutes per capstone, support minutes per learner, and content maintenance hours per release.

### G-06 (High) — Accessibility and the separate runtime origin are in direct conflict

Section 6.5 requires screen-reader-friendly diagnostics and no keyboard traps in the editor and console. Section 7.1 puts the runtime on a foreign origin. A cross-origin iframe cannot share an `aria-live` region, cannot be reliably announced by the parent, and cannot join the parent's focus order without deliberate work. The audit lists both requirements and never notices they fight.

**Required rule:** the runtime origin renders **preview output only**. Editor, file tree, diagnostics, test results, and console transcript all render on the platform origin, fed by a typed `postMessage` contract. Accessibility lives entirely on the platform side. A plain-textarea editor mode is required as the accessible fallback, because full screen-reader support for a code editor component is not a solved problem.

### G-07 (High) — Low-bandwidth mode conflicts with the chosen runtimes

Section 6.4 targets Filipino learners on constrained networks and low-memory Android devices. Section 8 recommends PGlite (multi-megabyte WASM Postgres) and Sandpack (bundler plus dependency fetch), and keeps WebContainers on the table (cross-origin isolation, high memory, desktop-only in practice).

The audit lists both without noting that the primary audience may not be able to run the primary runtimes.

**Required:** a device and network budget stated as a hard constraint *before* runtime selection. Every runtime needs a documented payload size, memory floor, and degraded path. SQL exercises need a non-PGlite fallback for devices that cannot load it.

### G-08 (High) — The AI feedback path is an unlisted prompt-injection surface

The plan mentions optional AI feedback. Any AI reading learner code is reading attacker-controlled text. The audit's threat table has fifteen rows and none is this.

Concrete risks: a learner embeds instructions in a comment to force a pass verdict; extracts the system prompt, rubric, or hidden test cases; uses the feedback endpoint as a free general-purpose LLM proxy; induces the model to emit content attributed to the platform.

**Required:** AI output is advisory only and can never write to a progress, grading, or certificate record. Learner code is passed as clearly delimited untrusted data. Hidden tests and rubrics never share a context with learner code. Per-learner rate and token limits. Output filtered before display.

### G-09 (Medium-High) — Release 1 contradicts the audit's own data model

Section 9.1 states progress must reference an immutable `content_revision`, not a mutable lesson row. Release 1 ships lessons, progress, and checkpoints with no curriculum release pipeline, which does not arrive until Release 3. Release 1 therefore writes progress against something with no revision identity, and Release 3 has to migrate live learner data.

**Required:** a minimal release pipeline in Release 1. One course, one release, one hand-built bundle, real content hash. The pipeline can be a script. The identity model cannot be retrofitted.

### G-10 (Medium-High) — No release support window or learner migration policy

The model correctly pins enrollments to a release. It never says how long an old release is supported, what happens to a learner halfway through v3 when v4 ships, or what release a certificate issued today refers to in two years.

**Required:** an explicit policy. Suggested default: learners stay on their pinned release until they finish or opt in; releases are supported for 24 months or N+2, whichever is longer; certificates permanently reference their release and rubric version and stay verifiable after the release retires.

### G-11 (Medium) — The audience is Filipino and the curriculum is not

The Philippines appears in the audit only under privacy law and payment rails. The competency matrix, employer-acceptance validation, and portfolio expectations are generic. For this audience, employer validation means PH agencies, BPO and GDC engineering teams, local startups, and offshore contract work, whose hiring signals differ from the US bootcamp template the matrix implicitly targets.

**Required:** employer validation interviews with PH hiring managers before the competency matrix is frozen. State the language policy for lesson prose. English technical terms are expected; decide whether explanatory prose is English-only or Taglish-tolerant, because it affects beginner comprehension and is expensive to reverse.

### G-12 (Medium) — No acquisition model

The product is free-first. Free-first means acquisition cost must be near zero, which means organic discovery is the entire growth model. The audit has nothing on how anyone finds this. That is a business-model hole, not a marketing afterthought: the free path carries real cost per learner and there is no plan that produces learners.

**Required:** treat public lesson pages, the curriculum repository, and learner project pages as the acquisition surface. That means crawlable server-rendered free lessons, structured data, and canonical URLs. It is also an architectural constraint, because "free lessons are publicly crawlable" alongside "paid lessons are no-store" is a routing and caching decision, not a marketing setting.

### G-13 (Medium) — Findings are not prioritised below P0

Sections 4 through 16 contain well over 200 individual requirements in the same imperative voice. "Enable RLS on every exposed table" and "track inter-reviewer agreement" read as equally mandatory. A team handed this document cannot start, because everything is a blocker.

**Required:** every requirement carries a severity, an owner, a release, and an acceptance test. Anything without an acceptance test is an opinion and should be labelled one.

### G-14 (Medium) — No kill criteria

The audit has launch gates and no stop conditions. A plan this large needs pre-committed numbers meaning "this is not working," decided before the team is emotionally invested.

**Required:** falsifiable thresholds. If fewer than 40% of a recruited beginner cohort completes Release 1's single lesson unaided, the learning loop is wrong and no further stages are authored. If hours-per-published-lesson exceeds 6 after 30 lessons, the authoring toolchain is rebuilt before more content. If reviewer disagreement on the capstone rubric exceeds the defined threshold, certification is suspended rather than automated.

---

## 4. Internal contradictions to resolve

| # | Contradiction | Sections | Resolution |
|---|---|---|---|
| C-1 | Free path includes human-reviewed capstone, but operations must be sustainable | 2, 3 P0-05, 4.5 | Adopt Model A: free learning, paid assessment |
| C-2 | Progress references immutable revisions, Release 1 has no releases | 9.1, 17 R1 | Minimal release pipeline in Release 1 |
| C-3 | Screen-reader-accessible diagnostics vs cross-origin runtime | 6.5, 7.1 | Diagnostics render on platform origin only; runtime posts structured events |
| C-4 | Low-bandwidth, low-memory audience vs PGlite, Sandpack, WebContainer | 6.4, 8 | Device budget is a hard constraint; every runtime needs a degraded path |
| C-5 | Cache immutable lesson assets vs no-store for paid content | 6.4, 10.3 | Free content immutable and cacheable; paid content memory-only, never in a service worker |
| C-6 | Certificate needs a controlled re-run, verifier deferred to Release 6 | 3 P0-01, 17 R6 | CI-based verifier at Release 3 or 4 |
| C-7 | Deterministic versioned capstone briefs vs brief secrecy | 5.4 | Briefs will leak. Assume public. The defense interview carries the anti-plagiarism weight, not brief secrecy |

---

## 5. Threat model additions

The audit's table is good. Missing rows:

| Threat | Mitigation |
|---|---|
| Prompt injection through learner code into AI feedback | Advisory-only output, no write path to grading, delimited untrusted input, rubric and hidden tests excluded from context |
| Credential sharing or account resale under lifetime access | Model A removes most of the incentive; otherwise device and session heuristics with human review, never automated bans |
| Stored XSS via learner-controlled display name, README, or project description | Render as text, never HTML; sanitise at render; strict CSP on profile pages |
| Certificate verification code enumeration | High-entropy codes, rate limiting, minimal response body, no PII in the response |
| Capstone brief and solution leakage | Assume public; weight defense and originality checks accordingly |
| Reviewer account compromise | AAL2 for reviewers as well as admins; scope to assigned submissions; append-only decisions |
| Supply chain in the authoring and CI pipeline | Pin actions by SHA, minimal token scopes, no secrets in curriculum CI, signed release bundles |
| Learner data loss through a bad content migration | Migrations never rewrite learner progress; revision pinning makes migration opt-in |

---

## 6. Where the audit over-invests

Not wrong, but sequenced too early relative to content and learner validation:

- Full commerce ledger design (9.6). Correct design, needed at Release 5. Designing it now costs attention content authoring needs.
- Dual approval and scoped role assignments with expiry (9.4). Right for a team with several admins. For a one to three person operation, an append-only audit log plus AAL2 suffices until there are people to separate.
- Eleven-track roadmap analysis (4.4). The correct action is to delete the roadmap, not reduce it.

**A question the audit never asks:** how many people are building this. Every recommendation about dual approval, reviewer calibration, inter-reviewer agreement statistics, restore drills, and pgTAP suites in CI implies a team. If the real team is one or two people, the plan needs a solo-viable variant, and the audit should say which controls defer and which do not.

Deferrable: dual approval, reviewer calibration statistics, formal restore drills, granular scoped roles.
Not deferrable: separate runtime origin, RLS with revoked default grants, no client-authoritative grading, no secrets in the sandbox, webhook idempotency, immutable evidence.

---

## 7. Required changes to the plan

1. Adopt a credential and revenue model. Recommended: free learning, paid assessment.
2. Name curriculum authoring as the critical path and give it a toolchain, a budget, and a gate.
3. Specify the lesson IR concretely at Gate 0.
4. Move deterministic verification into platform-controlled CI at Release 3 or 4.
5. Put the minimal curriculum release pipeline into Release 1.
6. Move all learner-facing diagnostics to the platform origin and add a plain-textarea editor mode.
7. Set a device and network budget before selecting runtimes; require a degraded path per runtime.
8. Add the AI feedback threat surface and constrain AI to advisory output.
9. Publish a cost model with named assumptions.
10. Define release support windows and learner migration.
11. Validate competencies with Philippine employers.
12. Treat free lessons as the acquisition surface and make that an architectural constraint.
13. Assign severity, owner, release, and acceptance test to every requirement.
14. Pre-commit kill criteria.
