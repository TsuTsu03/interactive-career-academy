> **SUPERSEDED — 2026-08-23.** Read [`PLAN.md`](PLAN.md) instead.
>
> This document was written assuming a paid-assessment business model, human capstone review, a community layer in v1, and a locale system. All four were decided against in an interview with the product owner. What survives here — the runtime trust zones, the lesson IR, the data model constraints, and the security threat table — is carried forward into `PLAN.md`. Kept for history and for the sections `PLAN.md` still points at.

# Interactive Career Academy — Architecture and Direction v2

**Supersedes:** the v1 plan, as amended by `ARCHITECTURE_AUDIT_REPORT.md` and `AUDIT_REVIEW.md`
**Date:** 2026-08-23
**Status:** Proposed. Sections marked **DECISION** need the product owner before Gate 0 exits.

This document keeps every P0 finding from the v1 audit and resolves the fourteen gaps and seven contradictions raised in the review. It is written to be executable: each section ends with what has to be true before the next release starts.

---

## 1. Direction

### 1.1 What this is

A free, project-centred path from no programming experience to shipping a full-stack web application, built for Filipino beginners on modest hardware and metered connections, with an optional paid assessment that produces a defensible credential.

### 1.2 What changed from v1

| v1 | v2 | Why |
|---|---|---|
| Free path includes certification | Free path includes everything except human review | Reviewer hours are the only unbounded cost. Pricing them is the honest fix |
| Paid = advanced tracks | Paid = assessment now, advanced tracks later | Revenue does not wait on content that does not exist |
| Certificate at Release 4, verifier at Release 6 | Deterministic verification at Release 3 | Verification is cheap once the GitHub App exists |
| 13 stages, 8 projects in v1 | 6 stages, 3 projects, 1 capstone in v1 | Content is the critical path; a narrow path finished beats a wide path abandoned |
| Eleven-career roadmap | One path, publicly | Expectation debt |
| "The free path creates the developer" | "Free to learn. Ship real software." | Removes the causality overclaim |

### 1.3 Positioning language

Approved for public use now:

> Learn full-stack web development for free. Build real projects, keep your code, and get honest feedback on your work.

Not approved until pilot evidence exists: any phrasing containing "job-ready", "career guarantee", "hire", or "employment".

The credential, when it ships, is a **Certificate of Completion with Verified Project Evidence**. Not a competency certification. Not accreditation.

### 1.4 The one thing that must work

A beginner opens a lesson on a cheap Android phone or an eight-year-old laptop, reads, predicts, edits code, runs it, sees a real failure, understands why, fixes it, and comes back three days later to find their work intact.

Everything else in this document is scaffolding around that loop. If that loop is not delightful, no amount of certificate infrastructure saves the product.

---

## 2. Business model

**DECISION-1: adopt Model A.**

| Tier | Price | Contents | Marginal cost |
|---|---|---|---|
| Learn | Free, forever | Every lesson, every exercise, every project brief, deterministic self-check, portfolio pages, progress, resume | Hosting and bandwidth only |
| Verified | One-time fee | CI verification run, human rubric review, project defense, issued certificate, one free resubmission | Reviewer time plus CI minutes |
| Advanced (later) | One-time fee | Specialisation tracks, when they exist | Content amortisation |

Why this resolves the v1 contradiction:

- Free learners cost near zero. The path can stay free honestly and indefinitely.
- The paid unit is a service with a known cost, so pricing follows from reviewer minutes rather than from vibes.
- "Lifetime access" liability shrinks to hosting free content. Assessment is a one-time service, delivered and complete.
- No paywall ever sits between a learner and a skill.

### 2.1 Cost model, first version

Assumptions are deliberately explicit so they can be attacked.

**Per free learner, per active month**

| Item | Assumption | Cost |
|---|---|---|
| Static lesson delivery | 40 MB egress, CDN-cached immutable bundles | negligible |
| Auth and progress requests | ~600 requests | negligible |
| Checkpoint storage | 3 MB in object storage, 90-day retention | negligible |
| Support | 0.4 minutes averaged across all learners | small |

Free learners are effectively a fixed-cost problem, not a variable-cost one. The binding constraint is the platform floor (Supabase and Vercel production tiers plus email), not per-learner cost. Model the floor, not the marginal.

**Per verified assessment**

| Item | Assumption | Cost driver |
|---|---|---|
| CI verification run | 6 to 12 minutes of runner time | Cents |
| Human rubric review | 45 to 75 minutes for a first-cohort capstone | The whole cost |
| Defense session | 20 to 30 minutes | Reviewer time |
| Resubmission allowance | 35% resubmit once, at 60% of original review time | Reviewer time |
| Payment processing | Card rail fee plus VAT, fixed component dominates at low ticket | Margin killer below a threshold |

**Implication:** the price floor for Verified is set by roughly 1.5 to 2.0 reviewer hours plus payment fees, not by what feels affordable. If that number lands above what the audience will pay, the response is to cut review time through better rubrics and more deterministic checks, not to underprice and absorb the loss.

**Gate:** produce this table with real currency figures, real Supabase and Vercel plan prices, and real PayMongo rates before any price is published. Prices remain internal until then.

### 2.2 Metrics that decide sustainability

- Reviewer minutes per issued certificate, trended.
- Percentage of rubric criteria decided by CI rather than a human, trended. This is the leverage metric.
- Platform fixed cost per month against active learners.
- Verified conversion rate from completed capstone.
- Hours per published lesson.

---

## 3. Scope: the minimum complete path

The v1 curriculum is correct as an eventual target and wrong as a v1. Ship this instead.

| Stage | Focus | Runtime tier | Evidence |
|---|---|---|---|
| 0 | Orientation, files, browser, terminal basics, debugging mindset | None | Environment check |
| 1 | Semantic HTML, CSS, responsive layout, accessibility basics | Tier 1 | **Project A** — responsive site from a brief |
| 2 | JavaScript language and browser APIs | Tier 1 | Exercises |
| 3 | Git and GitHub workflow | None, external | Branch, PR, merge, conflict exercise |
| 4 | TypeScript and testing fundamentals | Tier 2 | Typed module with tests |
| 5 | React fundamentals | Tier 2 | **Project B** — accessible React app with API states |
| 6 | HTTP, Node, REST, validation, auth, SQL and Postgres | Tier 2 plus Tier 3 SQL | **Project C** — deployed full-stack app |
| 7 | Capstone | External | Assessed submission |

Deferred to v2 of the curriculum: Next.js App Router, observability, performance engineering, the production-readiness upgrade stage, the eight-project ladder.

Rationale: three projects and a capstone is already a portfolio. The v1 ladder's stages 9 through 11 are refinements of skills the learner has already demonstrated. They are the right second release and the wrong first one.

**Constraint:** no stage is authored until the preceding stage has been completed unaided by at least five recruited beginners.

---

## 4. Evidence and trust architecture

This is the section that makes the certificate defensible. It replaces v1 sections 3 P0-01 and 17 R6.

### 4.1 Evidence classes

| Class | Produced by | Trusted for | Never used for |
|---|---|---|---|
| Formative | Browser runtime | Immediate feedback, hints | Progress gates, credentials |
| Progress | Authenticated server record of a client event | Resume, "continue where you left off" | Any credential claim |
| Project | Repository, pinned commit SHA, deployment URL, README | Portfolio display, review input | Automatic pass |
| Verified | Platform-controlled CI run against the pinned SHA | Deterministic rubric criteria | Subjective criteria |
| Reviewed | Human against a versioned rubric plus defense | Certificate issuance | — |

**Hard rule:** no certificate criterion is ever satisfied by a Formative or Progress record.

### 4.2 The verification runner

The v1 audit deferred this as expensive infrastructure. It is not, because the GitHub App already exists.

```
Learner submits: repo URL + commit SHA + deployment URL
        |
        v
Platform records immutable evidence snapshot
  (repo id, SHA, tree hash, submitted_at, release id, rubric version, test_plan_version)
        |
        v
Platform-owned verification job
  - fetches that exact tree via installation token, read-only
  - IGNORES every workflow, script, and config in the learner repo
  - installs from the learner lockfile with a registry allowlist
  - runs THE PLATFORM'S test plan at the pinned test_plan_version
  - egress denied except the allowlisted registry
  - CPU, memory, wall-clock capped; no platform secrets present
        |
        v
Signed verification result -> deterministic rubric criteria
        |
        v
Human reviewer sees: CI result + diff + README + deployment, scores subjective criteria only
        |
        v
Defense question set or async walkthrough
        |
        v
Certificate references: evidence snapshot, release, rubric version, template version
```

Properties that make this trustworthy:

- The learner never controls the test harness, the runner image, or the network policy.
- The commit SHA is pinned before verification, so post-submission edits are visible and irrelevant.
- The run is reproducible: same SHA plus same `test_plan_version` yields the same result.
- No platform secret is ever in the job environment. The installation token is repository-scoped, read-only, and discarded.

**Design note:** a learner's own CI results are never accepted as evidence. They control that workflow file.

### 4.3 Anti-plagiarism posture

Capstone briefs are deterministic and versioned, which means they will be posted publicly. Plan for that instead of fighting it.

- Briefs are assumed public. Secrecy is not a control.
- The defense step carries the weight: the learner explains their own architecture decisions, walks through a bug they hit, and modifies their code live or in a recorded response to a small change request.
- Commit history is evidence. A repository with one commit containing a finished application is a review flag, not an automatic failure.
- No invasive surveillance. No proctoring software, no keystroke logging, no webcam requirement.

### 4.4 Competency matrix

Keep the v1 matrix structure. Two changes:

1. Trim to the six v1 stages. Drop the Next.js and production-operations rows until that content exists.
2. Every row gains an **evidence class** column and a **decided by** column (CI or human). The trended ratio of CI-decided criteria is the primary cost-reduction metric from section 2.2.

**Gate:** the matrix is validated in interviews with at least six Philippine hiring managers or senior engineers who screen junior candidates, before it is frozen and before any capability claim is made publicly.

---

## 5. The lesson IR

The v1 audit correctly forbade runtime MDX evaluation and then never said what replaces it. This is that specification, at the level needed to start.

### 5.1 Pipeline

```
curriculum repo (MDX + test files + assets)
  -> schema validation
  -> link, asset, and test validation
  -> compile in CI, isolated, no network
  -> component allowlist enforcement
  -> lesson IR (JSON, no executable source)
  -> content hash + source commit + compiler version + schema version
  -> preview approval
  -> immutable release bundle
  -> metadata publication transaction
```

The compiler runs only in CI. The application never compiles MDX at runtime, never for authored content and never for learner content.

### 5.2 IR shape

```jsonc
{
  "schemaVersion": "1.0.0",
  "compilerVersion": "0.4.2",
  "unitId": "js-array-methods",
  "revision": 7,
  "contentHash": "sha256:...",
  "title": "Transforming arrays with map",
  "estimatedActiveMinutes": 12,
  "prerequisites": ["js-functions", "js-arrays-intro"],
  "skills": ["js.arrays", "js.higher-order-functions"],
  "device": { "minTier": 1, "requiresKeyboard": false },
  "blocks": [
    { "type": "prose", "content": [ /* inline nodes: text, code, link, emphasis */ ] },
    { "type": "callout", "variant": "note", "content": [ /* inline nodes */ ] },
    { "type": "codeSample", "language": "js", "source": "...", "highlight": [3, 4] },
    {
      "type": "predict",
      "prompt": "What does this print?",
      "options": [ /* ... */ ],
      "correct": 2,
      "explanation": [ /* inline nodes */ ]
    },
    {
      "type": "exercise",
      "exerciseId": "map-doubling",
      "runtimeTier": 1,
      "workspace": {
        "files": { "index.js": "...", "index.html": "..." },
        "entry": "index.js",
        "readonly": ["index.html"],
        "dependencies": {}
      },
      "testPlanRef": "map-doubling@3",
      "hints": [
        { "level": 1, "content": [ /* nudge */ ] },
        { "level": 2, "content": [ /* structural */ ] },
        { "level": 3, "content": [ /* near-solution */ ] }
      ]
    },
    { "type": "explain", "prompt": "In your own words, why...", "rubricRef": "explain-basic@1" }
  ]
}
```

Rules:

- `blocks` is a closed set. Adding a block type is a schema version bump and a review.
- Inline content is a closed node set. No raw HTML, ever.
- No block carries executable JavaScript that the platform evaluates. `codeSample.source` is displayed. `workspace.files` are shipped to the runtime origin and executed only there.
- `testPlanRef` and `rubricRef` are versioned pointers. A published lesson can never silently change its grading.
- `device.minTier` drives the low-bandwidth experience and the mobile contract. It is authored, not inferred.

### 5.3 Authoring toolchain, treated as a product

Because content is the critical path (review G-01), the authoring experience gets real investment before mass authoring starts:

- `npm run lesson:new` scaffolds a lesson with tests and hints.
- `npm run lesson:check` runs schema validation, link checks, test-plan execution against the reference solution, estimated-time sanity checks, and an accessibility lint of the rendered IR.
- Local preview renders the IR through the real lesson renderer, not a separate preview app.
- A pull request template requires the reference solution to pass and a stated `estimatedActiveMinutes`.

**Gate:** hours-per-published-lesson is measured from lesson one. If it exceeds 6 hours after the first 30 lessons, authoring tooling is rebuilt before more content is written.

---

## 6. Runtime architecture

### 6.1 Device budget, declared first

This is a hard constraint, not an aspiration. It is stated before runtime selection because it eliminates options.

| Target | Spec |
|---|---|
| Reference low-end device | 3 GB RAM Android, Chrome, mid-range 2021 hardware |
| Reference network | 3 Mbps, metered, intermittent |
| Lesson shell budget | Under 200 KB transferred for a text-and-prediction lesson |
| Tier 1 exercise budget | Under 400 KB additional |
| Any runtime over 2 MB | Explicit learner confirmation before download, size shown, resumable |

### 6.2 Runtime tiers

| Tier | Runner | Payload | Devices | Used for |
|---|---|---|---|---|
| 0 | None | 0 | All | Prose, prediction, explain, review |
| 1 | Sandboxed iframe on the runtime origin, no bundler | Tens of KB | All including phones | HTML, CSS, vanilla JS, DOM |
| 2 | Sandpack on the runtime origin | ~1 to 2 MB | Tablet and up | TypeScript, React, unit tests |
| 3 | PGlite on the runtime origin | Multi-MB WASM | Desktop and capable tablets | Postgres-accurate SQL |
| 3-fallback | Server-evaluated query against an ephemeral per-session schema | Tens of KB | All | SQL on low-end devices |
| 4 | WebContainer, feature-flagged | Large, cross-origin isolated | Desktop, supported browsers only | Deferred past v1 entirely |

Every lesson declares `device.minTier`. The learner sees, before starting, what the lesson needs and what it will download. A learner on a phone gets a complete Tier 0 and Tier 1 experience and a clear, non-apologetic statement of what needs a bigger screen.

**Tier 4 decision:** WebContainers are out of scope for v1. Not deferred with intent to adopt. They are re-evaluated only if a specific lesson cannot be built any other way, and only with a written commercial licence quote and a device benchmark in hand.

### 6.3 Trust zones

```
Platform origin  academy.example
  Next.js UI, auth session, progress, editor, file tree,
  DIAGNOSTICS, TEST RESULTS, CONSOLE TRANSCRIPT, payments, profile

        |  typed postMessage, schema-validated, origin-checked, both directions
        v

Runtime origin  runtime-academy.example  (separate registrable domain, not a path)
  sandboxed iframe, learner code execution, PREVIEW OUTPUT ONLY
  no platform cookie, no token, no provider key, restricted capability set

Server zone
  Next.js modular monolith, private Postgres schemas, provider secrets

Verification zone
  ephemeral CI job, no platform secrets, egress-denied, read-only source
```

**The accessibility fix (review G-06).** The runtime origin renders only the visual preview. Editor, diagnostics, test results, and console transcript are platform-origin DOM. This means:

- `aria-live` announcements work, because they are same-document.
- Focus order and keyboard escape are managed by one document.
- Screen readers read structured test results as text, not as color in a foreign frame.
- The plain-textarea accessible editor mode is a straightforward alternative renderer, because the editor was never inside the iframe.

Runtime controls, unchanged from the v1 audit and all still required: separate origin, minimal sandbox capabilities, never `allow-scripts` with `allow-same-origin`, message schema validation with origin checks, dependency allowlist and lockfiles, execution timeout and cancellation, memory guard, output-size and console-rate limits, explicit network policy with a learner-visible warning, CSP and Permissions-Policy tuned for the runtime origin, and security tests for escape, exfiltration, navigation, popup, and storage access.

### 6.4 Caching policy (resolves contradiction C-5)

| Content | Policy |
|---|---|
| Free lesson IR and assets | Immutable, content-hashed URL, long max-age, service-worker cacheable, publicly crawlable |
| Runtime bundles | Immutable, content-hashed, cacheable |
| Paid lesson IR | `private, no-store`, never statically generated, never in a service worker, never in a client prefetch bundle, entitlement checked per request |
| Learner code checkpoints | Object storage, signed access, size-capped, retention policy, never public |

---

## 6b. The community layer

Learners should be able to find each other, add friends, code together, and see what their friends have built. This section defines that, and resolves the four places where it collides with decisions already made in this document.

### 6b.1 What the collisions are

Adding a social layer is not additive. Each of these must be answered before any of it ships.

| # | Collision | Where it comes from | Resolution |
|---|---|---|---|
| S-1 | **Seeing others' work weakens the credential** | Section 4 makes the capstone the evidence a certificate rests on. If solutions are browsable, "they did this themselves" stops being true | Solutions unlock only after *you* pass the step. Capstone briefs, capstone code, and assessment work never enter the social layer at all |
| S-2 | **Private-by-default identity** | ADR-21 and section 6.6 of the audit make profiles and projects private unless the learner opts in | Social is entirely opt-in and per-field. A learner who never opts in has the same product they have today, with nothing missing and nothing nagging them |
| S-3 | **You now run other people's code** | Section 6.3's sandbox protects a learner from their own mistakes. Sharing means learner A's browser executes learner B's code, which is now genuinely adversarial | The existing trust zones already hold, but only if shared work is *never* rendered on the platform origin. This becomes a hard invariant with a test, not a convention |
| S-4 | **Moderation is reviewer hours** | Section 2.1 prices reviewer time as the one expensive unit. Reports, blocks, and takedowns draw from the same budget | Moderation load is a tracked metric with its own kill criterion. Surfaces that cannot be moderated at the current team size do not ship |

### 6b.2 Design principle

**Social features exist to make learning less lonely, not to farm attention.**

Every surface below either helps a learner get unstuck, shows them that someone like them finished, or gets them building with another person. Nothing here is a feed, nothing is ranked by an algorithm, and nothing rewards posting frequency.

This follows from section 1.4: the product is a workshop. A workshop has other people in it, working nearby, and you can walk over and ask. It is not a stage.

### 6b.3 What ships, in tiers

Ordered by value per unit of cost and risk. Each tier is independently shippable.

**Tier 0 — Share a link. No social graph at all.**

- Any finished project gets an unlisted, shareable URL the learner controls and can revoke
- Read-only. Renders on the runtime origin, never the platform origin
- No account needed to view; nothing about the viewer is recorded beyond a hit count the owner sees
- This is most of the value of "see their work" at almost none of the cost, and it ships first

**Tier 1 — Friends.**

- A **handle** the learner chooses, and a profile carrying only what they explicitly enable: display name, current course, streak, rank, and the projects they marked shareable
- **Mutual friend requests.** Not follows. Asymmetric following creates audiences, and audiences create performance
- Request, accept, decline, remove, **block**. Block is total and silent to the blocked party
- A friends list, and nothing resembling a follower count
- No free-text bio in v1. Bios are a spam and abuse surface with no learning value, and they are the cheapest thing to add later

**Tier 2 — See their work, and how they solved it.**

- A friend's shareable projects, on their profile
- **Solution peeking, gated on your own pass.** Once you have passed a step, you can see how your friends solved that same step. Before you pass, you cannot. This is the S-1 resolution and it is also better pedagogy: comparing your working solution to three others is where the real learning is
- **Ask a friend for help on a step.** Sends your current code and the step, to one person, on request. Not a public forum post
- Reactions on a project, from a fixed set. No free-text comments in v1, for the same reason as bios

**Tier 3 — Code together.**

- **Co-op on a step.** Two learners, one shared workspace, presence cursors, both can edit and run
- The step still grades against whoever's session it is; co-op is for helping, not for farming XP. A step passed in co-op is marked as such in the progress record and **never counts toward capstone evidence**
- Sessions are ephemeral and invite-only, from your friends list. No public rooms
- This is the expensive tier. See 6b.5

**Tier 4 — Friend leagues and clubs.**

- The existing weekly league, scoped to friends instead of strangers
- **Clubs**: a named group with a shared join code, for a class, a barkada, or a bootcamp cohort. Shared progress board, no chat
- A club owner can see member progress only if members opt in when joining, and the join screen says so plainly

### 6b.4 Explicitly not building

Named so nobody has to relitigate them later:

- **No open DMs.** Free-text messaging between strangers is the single highest-abuse, highest-moderation-cost surface in any social product, and a learning platform gets almost nothing from it. Help requests are structured and scoped to friends
- **No public feed or algorithmic ranking**
- **No follower counts, no viral mechanics, no share-to-unlock**
- **No public comments in v1** on profiles, projects, or steps
- **No discovery of strangers.** You find people by handle or by club code, because someone gave it to you. There is no browse-people surface
- **No social gating of learning.** Nothing in the curriculum ever requires a friend

### 6b.5 Cost, which decides Tier 3

Tiers 0 through 2 are ordinary requests against tables already in the data model. They do not move the cost floor.

Tier 3 does. Real-time collaborative editing needs persistent connections, presence, and conflict resolution. That is a per-concurrent-user cost against a product whose entire premise is a fixed monthly floor with near-zero marginal cost per free learner.

**Gate:** Tier 3 does not start until there is a measured number for concurrent co-op sessions at the then-current active-learner count, and a cost per session-hour. If co-op cannot be delivered inside the monthly ceiling in section 10, it is priced into the paid tier or it does not ship. It is never subsidised by degrading the free path.

Implementation note when it does ship: use a CRDT over a hosted realtime channel rather than building operational transform. The workspace is a handful of small text files, which is the case CRDTs handle well.

### 6b.6 Security additions

These extend section 14 of the audit. The first is the important one.

| Threat | Mitigation |
|---|---|
| **Shared work executes in a viewer's browser** | Shared and co-op content renders only on the runtime origin, under the existing sandbox, with no platform session present. A test asserts that no shared-content path can render on the platform origin. This is the S-3 invariant |
| Stored XSS via handle, display name, or project title | Rendered as text, never HTML. Sanitised at render, not only at write. Strict CSP on profile pages |
| Handle impersonation | Reserved handles, homoglyph normalisation on uniqueness checks, no display name that renders identically to another handle |
| Friend-request spam | Rate limits per account and per target, silent block, no notification to a blocked sender |
| Harassment through structured surfaces | Every social surface has a report action; block is available from every surface where a person appears |
| Social graph is personal data | The graph is PII under the Philippine Data Privacy Act. It is included in export and deletion, and deleting an account removes you from other people's friends lists |
| Co-op session hijack | Invite tokens are single-use, short-lived, and scoped to one step and one invitee |
| Plagiarism laundering through co-op | Co-op-assisted steps are flagged in the progress record and excluded from capstone evidence |
| Leaderboard doxxing | Friend leagues show the handle only, never the real name, never location |

### 6b.7 Data model additions

Extends section 8.

```
handles                  unique, normalised, reserved list
profiles                 per-field visibility flags, not one public/private switch
friendships              requester_id, addressee_id, status, requested_at, responded_at
blocks                   blocker_id, blocked_id, created_at   (checked before every social read)
share_links              project_id, token, revoked_at, hit_count
help_requests            from_id, to_id, step_id, code_snapshot_id, status
reactions                actor_id, project_id, kind
clubs / club_members     join_code, member opt-in flag for progress visibility
coop_sessions            step_id, host_id, invitee_id, expires_at, assisted flag
moderation_reports       reporter_id, subject_type, subject_id, reason, status, actioned_by
```

`friendships` is stored once per pair with an ordered key, not twice, so a pair can never disagree about its own state. Every social read checks `blocks` first.

### 6b.8 Definition of done for the community layer

- A learner who never opts in is never prompted twice and loses no functionality
- Blocking is total, immediate, and silent
- No shared content renders on the platform origin, proven by test
- Solution peeking is impossible before passing the step, proven by test
- Capstone work never appears in any social surface, proven by test
- Every surface where a person appears has report and block
- Moderation queue time per week is measured before the next social surface ships
- Export and deletion include the social graph

---

## 7. Repository and workspace structure

### 7.1 Repositories

| Repo | Visibility | Contains |
|---|---|---|
| `academy-platform` | Public | Application, runtime engine, migrations, docs, ADRs |
| `academy-curriculum` | Public | Free curriculum source, test plans, assets, content licence |
| `academy-curriculum-pro` | Private | Paid content, when it exists |

`academy-infra` is deferred until there is infrastructure worth separating. Deployment configuration stays with the platform; secrets stay in provider secret storage.

Every course release pins the exact curriculum commit it was built from.

### 7.2 Workspace

```
apps/
  web/                      Next.js platform origin
  runtime/                  runtime origin, deployed separately, no platform deps
  worker/                   added at Release 3, when webhooks and CI callbacks start

packages/
  ui/
  curriculum-contracts/     IR schema, validators, generated types
  curriculum-compiler/      MDX -> IR, CI only, never imported by apps/web at runtime
  runtime-protocol/         postMessage message schemas, shared by web and runtime
  grading/                  deterministic test plan execution, shared by runtime and verifier
  config/

supabase/
  migrations/
  seed/
  tests/                    pgTAP RLS suite

tools/
  verifier/                 CI verification job definition and runner image
  lesson-cli/               authoring toolchain

tests/
  e2e/
  contracts/
  security/

docs/
  architecture/
  adr/
  curriculum/
  security/
  operations/
```

Three additions to the v1 structure, each justified by a real boundary:

- `apps/runtime` is a separate deployable because it is a separate origin. That is a security boundary, which is the v1 audit's own stated criterion for extraction.
- `packages/curriculum-compiler` is separate so a lint rule can forbid `apps/web` from importing it. That is the enforcement mechanism for P0-04, not a preference.
- `packages/grading` is shared by the browser runtime and the CI verifier so formative and verified results come from one implementation.

Module structure inside `apps/web` stays as the v1 audit specified: `domain / application / infrastructure / presentation`, with no Next.js imports in domain code and no provider payloads in domain entities.

---

## 8. Data model corrections

The v1 audit's model is adopted. These are the missing enforcement details.

### 8.1 Immutability is enforced, not assumed

`content_revisions`, `course_releases`, `order_lines`, `entitlement_grants`, `submitted_evidence`, and audit tables are append-only. Enforce with revoked `UPDATE` and `DELETE` grants plus a trigger that raises on modification. A comment saying "immutable" is not immutability.

### 8.2 Release graph constraints

- `course_release_nodes` forms a tree by `parent_node_id`; `prerequisite_edges` forms a DAG across revisions.
- Cycle prevention on `prerequisite_edges` is enforced by a recursive check trigger, not by application code.
- `(course_release_id, parent_node_id, sequence)` is unique so ordering is stable.
- A release is `published` only once every referenced revision exists and every referenced `test_plan_version` and `rubric_version` resolves. Enforced in the publication transaction.

### 8.3 Price windows

The audit says "no overlapping active price windows." The mechanism is an exclusion constraint:

```sql
ALTER TABLE private.price_versions
  ADD CONSTRAINT price_versions_no_overlap
  EXCLUDE USING gist (
    product_id WITH =,
    currency WITH =,
    active_range WITH &&
  ) WHERE (status = 'active');
```

Requires `btree_gist`. Application-level checks race.

### 8.4 Release support and migration (resolves G-10)

- A learner's enrollment pins one `course_release`. They stay on it until they complete it or explicitly opt into a newer release.
- Opting in is a learner action with a visible diff summary. Progress on unchanged revisions carries over by `content_revision_id`; progress on changed revisions is preserved and marked as belonging to the prior revision.
- Releases are supported for 24 months from supersession, or N+2 releases, whichever is longer.
- Certificates reference their release and rubric version permanently and remain verifiable after the release retires. Retired releases stay readable; they stop accepting new enrollments.
- No migration ever rewrites a learner progress row.

### 8.5 Roles

Adopt the scoped role assignment table from the v1 audit. For a small team, defer dual approval and role expiry; keep AAL2 for admins **and reviewers**, append-only audit with reason codes, and the rule that no role is ever derived from user-editable metadata.

---

## 9. Release plan

Each release states its exit gate. A release does not end because its features exist; it ends when its gate passes.

### Gate 0 — Foundations

Deliverables:

1. **DECISION-1** business model, confirmed.
2. **DECISION-2** credential wording, drafted and sent for legal review.
3. Competency matrix, trimmed to six stages, with evidence class and decided-by columns.
4. Lesson IR schema v1.0.0 plus validator, in `packages/curriculum-contracts`.
5. Cost model with real figures.
6. Device budget, published.
7. RLS role × resource × action matrix.
8. Privacy defaults, retention schedule, and age policy.
9. WCAG 2.2 AA acceptance criteria for the editor, console, and test-result surfaces.
10. ADRs 1 through 27 opened as **proposed**, plus the community-layer ADRs:
    - 28. Mutual friends rather than follows
    - 29. No free-text social surfaces in v1
    - 30. Shared and co-op content renders only on the runtime origin
    - 31. Solution peeking is gated on passing the step
    - 32. Capstone work never enters the social layer
    - 33. Co-op-assisted steps are excluded from capstone evidence
11. Kill criteria, section 10, agreed in writing.

Exit: every P0 from the v1 audit and every Critical and High from the review has a named owner and an acceptance test.

### Release 1 — The learning kernel

The whole product is one lesson, done properly.

- Account creation, optional and light.
- **Minimal curriculum release pipeline.** One course, one release, real content hash, real `content_revision` identity. A script is acceptable; the identity model is not deferrable (review G-09).
- One JavaScript lesson compiled to IR: prose, predict, exercise, explain.
- Tier 1 runtime on the separate runtime origin.
- Deterministic formative tests via `packages/grading`.
- Progressive hints.
- Three-layer save: memory, debounced IndexedDB, coarse remote checkpoint with optimistic concurrency and the v1 conflict rules.
- Resume across reload, tab, and device.
- Platform-origin diagnostics with `aria-live`, plain-textarea editor mode, full keyboard operation.
- Low-bandwidth shell inside the stated budget.

Explicitly absent: payments, certificates, GitHub write access, Sandpack, PGlite, WebContainers, public profiles.

**Exit gate:**
- 10 recruited beginners attempt the lesson unaided. At least 6 complete it.
- Zero lost-work incidents across the tested failure matrix: reload, offline edit, two tabs, two devices, quota exhaustion, cleared storage, partial upload, corrupt snapshot.
- A security test proves the runtime origin cannot reach the platform session, cookies, storage, or any secret.
- The lesson loads within the device budget on the reference low-end device.
- Median unaided completion time is within 1.5x of the authored `estimatedActiveMinutes`.

### Release 2 — Projects and portfolio

- Project A brief, acceptance criteria, and rubric.
- GitHub App with Metadata read and Contents read.
- Repository linking and read-only verification.
- Optional explicit publishing to an `academy/checkpoint-*` branch with the full v1 flow: diff preview, confirmation, short-lived scoped token, base-SHA check, no force push, resulting SHA recorded, token discarded.
- Private-by-default profile and project visibility.
- Project evidence card.
- Public, crawlable, server-rendered free lesson pages with canonical URLs and structured data (review G-12).

**Exit gate:**
- Learners correctly predict what will be published before confirming, tested with real users.
- No default-branch write is possible, verified by test.
- Revoking the GitHub installation fails safely and visibly.
- A private project is not reachable by an unauthenticated or wrong-user request, verified by the RLS suite.
- **Community Tier 0** (section 6b.3): revocable share links for finished projects, rendered on the runtime origin only. No social graph, no accounts needed to view. Most of the value of "see their work" at almost none of the cost.

### Release 3 — Free path beta and verification

- Stages 1 through 6 authored.
- Tier 2 (Sandpack) and Tier 3 (PGlite) with the Tier 3 server fallback.
- Projects B and C.
- Review scheduling.
- `apps/worker` for webhooks and CI callbacks.
- **The CI verification runner** (section 4.2), applied to project rubric criteria.
- pgTAP RLS regression suite in CI.
- Support and analytics operations with the v1 governance rules.
- **Community Tiers 1 and 2** (section 6b.3): handles, opt-in profiles, mutual friends, block, friends' shared projects, pass-gated solution peeking, and scoped help requests. Report and block on every surface from day one.

**Exit gate:**
- Representative beginners complete multiple stages.
- No shared content renders on the platform origin, proven by test. Solution peeking before passing is impossible, proven by test.
- Weekly moderation queue time is measured and inside the section 10 ceiling.
- The device and browser support matrix is proven on real hardware, including the reference low-end device.
- Hours-per-published-lesson is known and under the kill threshold.
- Verification reruns are reproducible: same SHA, same test plan, same result, ten times.
- Platform fixed cost per month is known.

### Release 4 — Capstone and credential

- Capstone brief generator, deterministic and versioned.
- Reviewer workflow with rubric versioning, confidence, reason codes, resubmission, and appeal.
- Defense question set.
- Evidence snapshot and certificate issuance.
- Public verification page with high-entropy codes, rate limiting, and a minimal response.
- Commerce for the Verified tier only: product, versioned price, order ledger, PayMongo hosted checkout, webhook inbox and outbox, refunds, entitlement grants. The full v1 commerce design applies here.

**Exit gate:**
- A pilot cohort completes the whole path.
- Two reviewers independently score the same five capstones; disagreement is within the agreed threshold or the rubric is repaired before issuing anything.
- Certificate wording has passed legal review.
- Payment fulfilment is webhook-driven, idempotent, and survives a forced crash between provider confirmation and entitlement grant.
- Marketing claims match measured outcomes.

### Release 5 — Advanced content, and coding together

Next.js, production operations, performance, observability, the remaining project ladder, and any advanced track. Only after Release 4's gate holds for a full cohort.

**Community Tiers 3 and 4** (section 6b.3): co-op coding on a step, friend leagues, and clubs. Tier 3 is gated on the cost measurement in section 6b.5 and does not start without it.

**Removed from the plan:** the v1 "Release 6 — advanced runtimes." Remote labs and WebContainers are not roadmap items. They are options to be re-opened with evidence.

---

## 10. Kill criteria

Agreed before the work starts, so they can be applied without argument later.

| Trigger | Response |
|---|---|
| Fewer than 6 of 10 recruited beginners complete the Release 1 lesson unaided | Stop authoring. The learning loop is wrong. Redesign and retest before any stage is written |
| Hours per published lesson exceeds 6 after the first 30 lessons | Freeze authoring, rebuild the toolchain |
| Median unaided completion time exceeds 2x the authored estimate across a stage | The stage is mis-scoped. Rewrite before continuing |
| Reviewer disagreement on the capstone rubric exceeds the agreed threshold | Suspend certification. Repair the rubric. Do not automate around it |
| Reviewer minutes per certificate do not fall across three cohorts | The Verified tier does not scale. Reprice or restructure the assessment |
| The reference low-end device cannot complete stages 1 through 3 | The audience thesis is wrong. Re-scope the product or the audience, explicitly |
| Platform fixed cost exceeds the agreed monthly ceiling before Release 4 | Reduce scope. Do not solve it by paywalling the free path |
| Moderation queue exceeds the agreed weekly hours for two consecutive weeks | Stop shipping social surfaces. Close the noisiest one until the queue clears |
| Co-op cost per session-hour cannot fit the monthly ceiling | Tier 3 moves to the paid tier or does not ship. It is never funded by degrading the free path |
| Capstone originality flags rise after solution peeking ships | Tighten the pass gate or withdraw the feature. The credential outranks the social layer |

The last row is the important one. The rule that free-path quality is never degraded to force conversion only means something if there is a pre-agreed alternative when money gets tight.

---

## 11. Decisions required

| ID | Decision | Recommended | Blocks |
|---|---|---|---|
| DECISION-1 | Business model | Model A: free learning, paid assessment | Gate 0, all pricing work |
| DECISION-2 | Credential type | Certificate of Completion with Verified Project Evidence | Legal review, all certificate copy |
| DECISION-3 | Curriculum scope for v1 | Six stages, three projects, one capstone | All authoring |
| DECISION-4 | WebContainers | Out of scope for v1 | Runtime work, licence spend |
| DECISION-5 | Team size and solo-viable control set | State it; it changes which controls defer | Gate 0 acceptance tests |
| DECISION-6 | Lesson prose language policy | English technical terms; decide on Taglish explanatory prose | All authoring, expensive to reverse |
| DECISION-7 | Software licence | AGPL-3.0 vs permissive, with counsel | Public repository creation |
| DECISION-8 | Curriculum content licence | CC BY or CC BY-SA, not NonCommercial | Public curriculum repository |
| DECISION-9 | Age policy and minor handling | Decide before any signup ships | Release 1 |
| DECISION-10 | Friends or follows | Mutual friends. Follows create audiences, and audiences create performance | Community Tier 1 |
| DECISION-11 | Free-text surfaces (bios, comments, DMs) | None in v1. Structured reactions and scoped help requests instead | Moderation budget, Tier 2 |
| DECISION-12 | Who moderates, and for how many hours a week | State it before Tier 1 ships; it sets the kill threshold | Community Tiers 1 and up |

---

## 12. Priority order

The ordering that follows from everything above:

```
Learning loop quality
  -> content authoring throughput
  -> trustworthy evidence
  -> safe runtime and data boundaries
  -> reliable content releases
  -> sustainable operations
  -> commerce for assessment
  -> community layer
  -> advanced content
```

The community layer sits late deliberately. A social network around an empty school is nothing, and every social surface adds moderation load to the same budget that pays for assessment. The one exception is Tier 0 share links, which need no social graph and no moderation, and therefore ship early in Release 2.

The v1 audit's ordering put content nowhere and commerce sixth. The correction is that authoring throughput sits second, immediately after the learning loop, because it is the constraint that decides whether this product exists at all.

The decisive first deliverable is not the platform. It is one lesson that a beginner on a cheap phone can finish, leave, and return to with their work intact, and a toolchain that makes the next two hundred lessons cheap to write.
