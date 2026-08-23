# Interactive Career Academy

## Product, UX, Curriculum, and Technical Architecture Audit

**Audit date:** 2026-08-23  
**Source reviewed:** “Interactive Career Academy — Product, UX, Curriculum, and Technical Architecture Plan,” status Audit-ready v1  
**Audit outcome:** Conditional approval for discovery and prototype work; not yet approved for certificate-ready or production launch  
**Confidence:** High for architecture and security findings; medium for commercial viability until learner research, pricing validation, and vendor quotes are completed

---

## 1. Executive Verdict

The v1 plan has a strong product thesis and unusually good first-principles decisions:

- the free path is intended to be complete rather than a disguised trial;
- learners build real projects and retain ownership of their code;
- active practice is prioritized over passive content;
- deterministic feedback is preferred before optional AI;
- the platform begins as a modular monolith;
- arbitrary code is kept away from the main application server;
- pricing, payments, entitlements, course versions, and certificates are treated as auditable records;
- manipulative retention mechanics are explicitly rejected.

Those choices should remain.

The plan is not yet production-ready because five foundations are incomplete:

1. **Certificate-critical evidence cannot be trusted when grading runs only in the learner’s browser.**
2. **“Junior Full Stack job readiness” is not yet defined as a measurable competency contract.**
3. **The curriculum data model cannot safely support immutable versions, reusable modules, and learner migration at the same time.**
4. **The runtime boundary lacks a concrete origin, network, dependency, messaging, and browser-support policy.**
5. **The MVP, lifetime-access promise, and proposed low prices do not yet have a sustainable operating model.**

Recommended decision:

> Build the learning kernel first. Treat browser grading as formative feedback. Issue a completion credential only after certificate evidence has a controlled verification path or a documented human-review path.

Do not market the product as a complete job-ready path until the full curriculum, independent capstone, assessment process, accessibility baseline, and pilot evidence all pass defined launch gates.

---

## 2. Audit Status Map

### Strong — preserve

- Mission and ethical product principles
- Free career-entry baseline
- Learner-owned repositories
- Project-centered learning
- Modular monolith
- Browser-first practice runtime
- Deterministic feedback before AI
- Human-approved, versioned pricing
- Immutable submission commit SHA
- One-time purchase as default
- Git-sourced curriculum
- Separation of completion and mastery
- Explicit limits on fake accreditation and DRM claims

### Needs redesign before implementation

- Certificate trust model
- Curriculum release and reuse model
- Runtime security boundary
- Safe curriculum compilation
- GitHub publishing semantics
- Payment and entitlement ledger
- Autosave conflict handling
- Background-job architecture
- Public-profile privacy defaults
- Accessibility definition of done
- Low-bandwidth and device support

### Needs validation before business launch

- Course workload and completion feasibility
- Paid-track prices
- “Lifetime access” liability
- WebContainer commercial license
- Hosting and database production costs
- Capstone review staffing
- Refund and entitlement-removal policy
- Philippine privacy and consumer-law implementation
- Employer acceptance of the portfolio and certificate

---

## 3. Highest-Priority Findings

### P0-01 — Browser grading is not certificate-grade evidence

**Problem**

The plan correctly avoids executing arbitrary learner code on the primary application server. It then relies heavily on browser tests for progress and certification. A learner controls the browser, JavaScript runtime, network requests, local storage, and submitted result payload. A pass result produced only on the client can be forged.

**Impact**

- lesson feedback remains useful;
- progress completion is low-assurance;
- certificate competency claims are not defensible;
- automated capstone approval can be bypassed;
- analytics based on client pass events can be polluted.

**Required design**

Classify evidence:

| Evidence class | Purpose | Trust level | Verification |
|---|---|---:|---|
| Formative | Immediate lesson feedback | Low | Browser runtime |
| Progress | Resume and completion tracking | Medium-low | Authenticated server record plus anomaly checks |
| Project | Portfolio evidence | Medium | Repository, immutable SHA, deployment, rubric |
| Summative | Certificate decision | High | Controlled re-run, human review, or both |

For the first certificate-ready cohort, use the lowest-cost credible approach:

1. learner submits repository, commit SHA, deployment, README, and architecture explanation;
2. platform records an immutable evidence snapshot;
3. deterministic checks are re-run in an isolated verifier with no platform secrets and no privileged network;
4. a reviewer evaluates subjective rubric criteria;
5. learner completes a short project-defense question set or live/asynchronous walkthrough;
6. certificate references the rubric version and evidence snapshot.

If an isolated verifier is not available, use manual review and clearly issue a **Certificate of Completion**, not a competency certification.

**Launch gate**

No automatic certificate based only on client-reported results.

---

### P0-02 — “Job-ready” needs an observable competency contract

**Problem**

The curriculum lists topics and outcomes, but topic coverage is not proof of performance. “Enough practical ability to reasonably apply” needs evidence thresholds, not only module completion.

**Required design**

Create a versioned competency matrix:

| Competency | Observable behavior | Required evidence | Pass rule |
|---|---|---|---|
| Web foundations | Build responsive, semantic interface from a brief | Project A plus accessibility checks | Required criteria pass; no critical accessibility defect |
| JavaScript/TypeScript | Solve, debug, test, and explain non-trivial logic | Independent exercises and Project B | Core tests pass; explanation meets rubric |
| Git workflow | Use branches, meaningful commits, PR, and conflict resolution | Repository history | Required workflow events present |
| React | Build accessible stateful UI with API states | Project C | Functional, loading, error, empty, and keyboard criteria pass |
| HTTP/API | Design and implement validated REST behavior | Project D | Contract, auth, validation, and error tests pass |
| PostgreSQL | Model relations and use constraints, migrations, and transactions | Database assessment and integrated project | Schema and query rubric pass |
| Full stack | Deploy and operate a complete application | Project E | Deployment, auth, persistence, tests, and README pass |
| Independent engineering | Plan, build, debug, and defend an original system | Final capstone | Minimum rubric plus no critical security failure |

Add:

- assessment blueprint per course version;
- rubric versioning;
- reviewer calibration;
- appeal and resubmission policy;
- plagiarism and code-provenance policy that avoids invasive surveillance;
- pilot outcome study before public “job-ready” language.

The MDN Curriculum is a useful baseline for front-end fundamentals, but it explicitly excludes full back-end and relational-database coverage. Use it as one reference, not as the complete full-stack standard.

**Positioning change**

Until pilot evidence exists:

> Build job-relevant full-stack skills, real projects, and portfolio evidence.

After validation, a carefully qualified career-entry claim may be used. Never promise employment.

---

### P0-03 — Runtime isolation needs an enforceable boundary

**Problem**

“Runs in the browser” does not automatically mean “safe.” Learner code can still:

- attempt to read same-origin storage or messages;
- send data to external endpoints;
- consume CPU or memory;
- load malicious dependencies;
- abuse popups, downloads, or navigation;
- probe local-network resources where browsers allow it;
- send malformed messages to the parent app.

**Required boundary**

Use three distinct trust zones:

1. **Platform origin** — authenticated UI, payments, profile, progress
2. **Runtime origin** — learner code and preview, with no platform cookies or tokens
3. **Server/private zone** — domain services, private database schema, provider secrets

Minimum runtime controls:

- separate origin, not merely a different route;
- sandboxed iframe with only required capabilities;
- never combine same-origin privileges with script execution for untrusted output;
- explicit message schema and source validation;
- no auth token, payment key, Supabase secret key, or GitHub token in runtime state;
- dependency allowlist for authored lessons;
- package lockfiles and integrity checks;
- execution timeout, cancellation, memory guard, and reset;
- output-size and console-rate limits;
- clear network policy and learner warning;
- CSP and Permissions-Policy designed for the runtime origin;
- security tests for escape, exfiltration, navigation, popup, and storage access.

MDN warns that a same-origin iframe using both allow-scripts and allow-same-origin can defeat sandboxing. Student previews should therefore use a separate origin and the smallest capability set.

**WebContainer gate**

WebContainers remain a possible advanced runner, not an unconditional MVP dependency:

- production commercial use requires a commercial license;
- production needs cross-origin-isolation configuration;
- support and behavior vary by browser;
- booting is expensive and only one concurrent instance is supported by the public API;
- blockers and third-party cookie settings can break expected behavior.

Obtain a written license quote and complete a device/browser benchmark before committing the curriculum to WebContainers.

---

### P0-04 — Curriculum MDX is executable supply-chain code

**Problem**

MDX can execute imported React components and JavaScript. Sanitizing “rich text” is not enough if raw or dynamically compiled MDX reaches production.

**Required pipeline**

~~~text
Authoring repository
  -> schema validation
  -> link/asset/test validation
  -> isolated curriculum compiler
  -> approved component allowlist
  -> safe lesson intermediate representation
  -> content hash + source commit
  -> preview approval
  -> immutable release bundle
  -> metadata publication transaction
~~~

Rules:

- never evaluate learner-supplied MDX;
- never dynamically evaluate repository MDX inside the authenticated app;
- compile trusted content in CI;
- store safe structured lesson data, not executable source, for runtime rendering;
- record compiler version, schema version, source commit, and bundle hash;
- require review for new custom components;
- treat community curriculum PRs as untrusted until checks and human review pass.

---

### P0-05 — MVP scope and certificate operations conflict

**Problem**

The MVP includes auth, several browser runtimes, review scheduling, projects, GitHub writes, deployment capture, certification, public profiles, and later commerce. That is already a large platform plus a large curriculum. The plan simultaneously postpones remote verification and human-review operations while requiring a capstone score for certification.

**Decision required**

Choose one initial credential model:

- **Model A: Completion credential.** Automated platform completion plus submitted public evidence; conservative wording.
- **Model B: Assessed credential.** Controlled verification and human review; higher cost and slower issuance.

Recommended:

- launch learning beta with no job-ready claim;
- manually review the first certificate cohort;
- measure review time and disagreement;
- automate only stable rubric checks;
- build isolated verification only after real evidence shows what should be automated.

---

## 4. Product and Business Critique

### What works

- “Learn by doing. Ship real software.” is clear and credible.
- Free fundamentals plus paid specialization creates an ethical product boundary.
- Portfolio production is a better learner outcome than watch time.
- One-time purchases fit content products better than an artificial subscription.
- Avoiding heavy gamification protects learner autonomy.

### What needs tightening

#### 4.1 Replace absolute promises

Avoid:

> The free path creates the developer.

Prefer:

> The free path builds the skills, workflow practice, and portfolio evidence needed to pursue junior full-stack opportunities.

The first sentence is memorable but overclaims causality.

#### 4.2 Define “lifetime access”

Use contract language such as:

> Access lasts for the commercial life of the purchased product and includes ordinary updates to that release line. It does not guarantee every future major course, live service, mentor service, or third-party lab.

Legal review remains required. Without this definition, a one-time low-price sale creates an unbounded support and hosting obligation.

#### 4.3 Treat prices as hypotheses

PHP 400–1,500 may be attractive, but price must follow unit economics and willingness-to-pay research. Current costs include:

- payment processing and VAT;
- refunds, disputes, and fraud;
- Vercel commercial hosting;
- Supabase production hosting and backups;
- email;
- WebContainer commercial licensing if used;
- content maintenance;
- accessibility QA;
- security work;
- capstone review;
- support.

Current public PayMongo rates vary by rail and are VAT-exclusive. At very low prices, the fixed card component materially affects margin. The launch-price table should remain internal until a cost model and pricing interviews are complete.

#### 4.4 Reduce public roadmap surface

Do not advertise eleven future careers as if they are committed products. Publicly show:

- Free Junior Full Stack path
- Advanced Full Stack, planned
- Other specializations, research stage

This reduces expectation debt.

#### 4.5 Add an explicit sustainability rule

> Free-path quality may not be reduced to force conversion, but scope, support, and infrastructure must remain financially supportable.

Track:

- cost per active learner;
- cost per graduate;
- support minutes per learner;
- reviewer minutes per capstone;
- payment cost per order;
- content maintenance hours per release;
- gross margin by paid track.

---

## 5. Polished Curriculum Architecture

### 5.1 Curriculum principles

1. Outcomes map to observable evidence.
2. Every new concept moves from recognition to supported production to independent production.
3. Git, testing, debugging, accessibility, security, and documentation spiral through projects.
4. Framework knowledge comes after web and programming foundations.
5. Browser exercises teach; independent projects prove.
6. Completion and mastery remain separate.
7. Review intervals are transparent heuristics and are tuned with outcome data.
8. No fixed interaction-frequency rule should fragment difficult concepts.

Active learning and retrieval practice are evidence-aligned choices. However, “an action every 30–90 seconds” and the exact 1/3/7/21/45-day schedule should be treated as testable product defaults, not universal pedagogical laws.

### 5.2 Recommended sequence

| Stage | Focus | Required evidence |
|---|---|---|
| 0 | Digital fluency, setup, terminal, browser, files, debugging mindset | Environment check and first repository |
| 1 | Semantic HTML, CSS, responsive design, accessibility | Responsive site from brief |
| 2 | JavaScript programming and browser APIs | Data-driven JavaScript app |
| 3 | Git/GitHub workflow, introduced then repeated everywhere | Branch, PR, merge, conflict exercise |
| 4 | TypeScript and testing fundamentals | Typed module with unit tests |
| 5 | React fundamentals | Accessible React application |
| 6 | HTTP, Node.js, REST, validation, auth, logging | REST API |
| 7 | SQL, PostgreSQL, schema design, migrations, transactions | Database assessment and API integration |
| 8 | React + API + PostgreSQL integration | Deployed full-stack application |
| 9 | Next.js App Router and production web patterns | Next.js application with server capability |
| 10 | Security, performance, testing, observability, deployment | Production-readiness upgrade |
| 11 | Portfolio, README, project explanation, interview practice | Polished public/private portfolio package |
| 12 | Independent capstone | Assessed immutable submission |

Why move Next.js later:

- learners first understand HTTP and server responsibilities;
- React, API, and database boundaries are visible before framework integration;
- “server versus client” becomes less magical;
- Express/Node and Next.js stop appearing as two unexplained competing backends.

### 5.3 Project ladder

1. Guided responsive site
2. Feature-based JavaScript app
3. Independent TypeScript module
4. React product screen/app
5. REST API plus PostgreSQL
6. Integrated full-stack application
7. Next.js production application
8. Independent capstone

At least three public-ready projects is reasonable. Requiring every project to be public is not.

Provide:

- private-repository option;
- downloadable evidence bundle;
- privacy/accessibility exception for GitHub publication;
- public metadata opt-in;
- rubric-equivalent alternative where a deployment cannot be public.

### 5.4 Capstone generation

Keep “choose one of three briefs,” but make generation deterministic and versioned:

- brief template version;
- domain seed;
- required competency set;
- optional feature set;
- complexity budget;
- rubric version;
- generated brief hash.

Do not let randomness produce materially different difficulty. Validate brief equivalence through pilot completion data and reviewer calibration.

### 5.5 Review system

Store:

- rubric version;
- criterion result;
- evidence reference;
- reviewer;
- reviewer confidence;
- decision reason;
- resubmission number;
- appeal result;
- timestamps.

Track inter-reviewer agreement. If two competent reviewers score the same work very differently, the rubric needs repair before more automation.

---

## 6. UX and Accessibility Polish

### 6.1 Learning loop

Recommended lesson loop:

~~~text
Orient -> Predict -> Try -> Observe -> Explain -> Apply -> Review
~~~

Not every lesson needs every interaction. The system should select the smallest interaction that proves the intended behavior.

### 6.2 Session-length mode

Keep 5/15/30/60-minute choices, but do not split work at arbitrary clock boundaries.

Each activity needs:

- estimated active time;
- safe stopping points;
- prerequisite state;
- device requirement;
- expected download/runtime cost.

Recommend activities that fit a session. Never interrupt a test run or lose editor state when time expires.

### 6.3 Mobile contract

State support honestly:

- mobile: reading, prediction, review, small edits, progress;
- tablet: moderate code tasks;
- desktop/laptop: multi-file projects, terminal-like runtimes, GitHub publishing.

Do not claim full mobile parity for a three-panel development workspace.

### 6.4 Low-bandwidth mode

Required for the primary Filipino audience:

- text-first lesson shell;
- runtime packages loaded only when needed;
- visible download size;
- cached immutable lesson assets;
- prebuilt starter bundles;
- no WebContainer boot for simple exercises;
- recoverable downloads;
- explicit fallback when a runtime is unsupported;
- performance tests on low-memory devices and constrained networks.

### 6.5 Accessibility definition of done

Target **WCAG 2.2 AA**, not “WCAG-conscious.”

For editor and console surfaces:

- no keyboard trap;
- documented shortcut to leave the editor;
- screen-reader-friendly file and diagnostic summaries;
- semantic test results, not color-only indicators;
- focus not hidden by sticky panels;
- minimum target-size compliance or documented exceptions;
- adjustable font size and line height;
- reduced motion;
- no drag-only task;
- accessible authentication;
- automated checks plus manual NVDA/VoiceOver keyboard testing.

The W3C WCAG 2.2 standard specifically requires keyboard operability and escape from keyboard traps. This is critical for embedded editors.

### 6.6 Privacy defaults

Recommended defaults:

- learner profile: private;
- projects: private/unlisted;
- certificate: verification code works, public discovery disabled;
- public display name: learner-controlled;
- GitHub link: optional;
- analytics not used for targeted advertising;
- code not used for model training without separate explicit consent.

The Philippine Data Privacy Act requires transparency, legitimate purpose, and proportionality. Public profile exposure should therefore be an explicit learner choice, not an enrollment side effect.

Define an age policy before launch. If minors are permitted, obtain specific legal advice and implement age-appropriate notices and consent.

---

## 7. Polished System Architecture

### 7.1 Target architecture

Keep a modular monolith, but identify deployable security boundaries:

~~~text
┌──────────────────────────────────────────────────────────────────┐
│ Platform browser origin                                          │
│ Next.js UI, lesson orchestration, IndexedDB, authenticated shell  │
└───────────────────────────┬──────────────────────────────────────┘
                            │ typed HTTPS / postMessage boundary
┌───────────────────────────▼──────────────────────────────────────┐
│ Runtime origin                                                    │
│ HTML/JS iframe, Sandpack, optional WebContainer, PGlite           │
│ No platform cookies, no provider secrets, restricted capability   │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ Next.js modular monolith                                          │
│ Identity | Catalog | Learning | Assessment | Projects             │
│ Credentials | Commerce | GitHub | Operations                      │
│ Route Handlers / Server Functions -> application services         │
└───────────────────────────┬──────────────────────────────────────┘
                            │
┌───────────────────────────▼──────────────────────────────────────┐
│ Supabase                                                         │
│ exposed API schema + RLS | private core schema | Storage          │
│ audit log | webhook inbox | outbox | immutable release metadata   │
└───────────────────────────┬──────────────────────────────────────┘
                            │ queued side effects
┌───────────────────────────▼──────────────────────────────────────┐
│ Worker boundary                                                   │
│ email | webhooks | GitHub publish | certificates | imports        │
└───────────────┬─────────────────────────────┬────────────────────┘
                │                             │
             GitHub                       PayMongo

Future:
isolated assessment verifier and remote lab service
~~~

The worker can share the same repository and domain modules. A separate process does not imply a microservice architecture; it is an execution boundary for reliable asynchronous work.

### 7.2 Application modules

~~~text
apps/web/src/modules/
  identity/
  catalog/
  curriculum/
  learning/
  assessment/
  projects/
  credentials/
  commerce/
  integrations/
    github/
    payments/
    email/
  operations/
~~~

Inside each module:

~~~text
domain/          pure rules and state transitions
application/     use cases and authorization requirements
infrastructure/  Postgres, Supabase, GitHub, PayMongo adapters
presentation/    server functions, route handlers, UI integration
~~~

Keep Next.js imports out of domain code. Keep provider payloads out of domain entities.

### 7.3 Reduced workspace structure

The original package list is too granular for day one. Start with:

~~~text
apps/
  web/
  worker/                  # add when webhook/import work begins

packages/
  ui/
  curriculum-contracts/
  runtime/
  grading/
  config/

supabase/
  migrations/
  seed/
  tests/

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
~~~

Do not create separate packages for auth, analytics, certificates, GitHub, and payments until one of these is true:

- a separate deployable consumes it;
- a security boundary requires it;
- independent versioning is useful;
- circular dependency pressure proves extraction is needed.

### 7.4 Repository strategy

Recommended:

1. **academy-platform — public**  
   Platform, free runtime engine, migrations, UI, documentation.

2. **academy-curriculum-free — public**  
   Free curriculum and tests under an explicit content license.

3. **academy-curriculum-pro — private**  
   Paid curriculum source and assessments.

Defer **academy-infra** until remote labs or material private infrastructure exist. Normal Vercel/Supabase deployment configuration can remain with the platform while secrets stay in provider-managed secret storage.

Separate free curriculum is justified by its different license and contributor workflow. The release pipeline must pin the exact curriculum commit used by every published course release.

---

## 8. Curriculum Runtime Contract

The proposed adapter is directionally right but too small for production.

Recommended contract:

~~~ts
type RuntimeCapability =
  | "html-preview"
  | "javascript"
  | "typescript"
  | "react"
  | "node"
  | "sql"
  | "network";

type RuntimeState =
  | "idle"
  | "preparing"
  | "ready"
  | "running"
  | "stopped"
  | "failed"
  | "disposed";

interface RuntimeAdapter {
  readonly capabilities: ReadonlySet<RuntimeCapability>;
  readonly state: RuntimeState;

  prepare(workspace: WorkspaceSpec, signal: AbortSignal): Promise<void>;
  applyChanges(patch: WorkspacePatch): Promise<WorkspaceRevision>;
  execute(request: RunRequest, signal: AbortSignal): AsyncIterable<RuntimeEvent>;
  grade(plan: FormativeTestPlan, signal: AbortSignal): Promise<GradeResult>;
  snapshot(): Promise<WorkspaceSnapshot>;
  restore(snapshot: WorkspaceSnapshot): Promise<void>;
  reset(): Promise<void>;
  dispose(): Promise<void>;
}
~~~

Add:

- adapter version;
- supported schema version;
- maximum files and bytes;
- timeout;
- dependency policy;
- network policy;
- structured diagnostics;
- deterministic seed;
- telemetry without source-code leakage;
- capability negotiation and fallback.

### Recommended runners

| Need | Default runner | Notes |
|---|---|---|
| HTML/CSS/vanilla JS | Separate-origin sandboxed iframe | Smallest and fastest |
| React/TypeScript | Sandpack pilot | Apache-2.0 toolkit; benchmark service/runtime behavior |
| SQL/PostgreSQL syntax | PGlite pilot | Browser Postgres in WASM; validate beta maturity and supported features |
| Rich Node projects | WebContainer behind feature flag | Commercial-license and browser-support gate |
| Summative verification | Isolated verifier | Never the authenticated app server |
| DevOps/Cloud labs | Future remote lab | Separate infrastructure and economics |

PGlite aligns SQL exercises more closely with PostgreSQL than SQLite or DuckDB, but its beta status and single-user browser model mean it should be tested rather than assumed.

---

## 9. Data Model Redesign

### 9.1 Separate logical identity from immutable revisions

The current model attaches modules directly to one course version. That conflicts with reusable modules across career tracks.

Use:

~~~text
course
course_release
content_unit                 # stable logical identity
content_revision             # immutable authored revision
course_release_node          # ordered graph reference to a revision
prerequisite_edge
skill
content_revision_skill
~~~

Key fields:

**course_releases**

- id
- course_id
- version
- status
- source_repository
- source_commit
- content_hash
- schema_version
- compiler_version
- published_at
- published_by

**content_revisions**

- id
- content_unit_id
- revision
- content_hash
- runtime_contract_version
- artifact_path
- created_at

**course_release_nodes**

- course_release_id
- parent_node_id
- content_revision_id
- node_type
- sequence
- required

Enrollments pin a course release. Progress references the release node and revision, not a mutable lesson row.

### 9.2 Version every assessment object

Version:

- exercise;
- test plan;
- hint set;
- project template;
- requirement set;
- rubric;
- capstone brief generator;
- completion rule.

A certificate must record:

- course release;
- completion-rule version;
- rubric version;
- evidence snapshot;
- certificate template/legal wording version.

### 9.3 Learning records

Add:

**lesson_progress**

- revision
- last_client_id
- last_checkpoint_id
- version for optimistic concurrency

**code_checkpoints**

- storage_path
- content_hash
- byte_size
- revision
- reason
- expires_at

Do not store large compressed blobs indefinitely in a hot table. Use object storage with RLS-signed access, size limits, retention, and metadata in Postgres.

**exercise_attempts**

- content_revision_id
- test_plan_version
- result_class: client_formative | server_verified | reviewer_verified
- client_version
- duration bucket rather than unnecessary precision
- evidence reference

### 9.4 Roles and admin controls

Replace a bare user-role pair with scoped assignments:

- id
- user_id
- role
- scope_type
- scope_id
- granted_by
- granted_at
- expires_at
- revoked_at

Require:

- AAL2 for admin actions;
- dual approval for price publication, manual entitlement grants, and certificate revocation where practical;
- append-only audit evidence;
- reason codes;
- no role change through user-editable metadata.

### 9.5 Project and GitHub model

An installation can belong to an organization and can be relevant to more than one platform user. Avoid assuming a one-to-one user-to-installation relationship.

Add:

- github_installations
- github_installation_memberships
- github_repositories
- project_repository_links
- publish_operations
- submitted_evidence

For each publish:

- installation id;
- repository id;
- target branch;
- base SHA;
- resulting commit SHA;
- file manifest hash;
- requested_by;
- approved_at;
- provider request id;
- status and failure reason.

### 9.6 Commerce ledger

Replace single-product orders and mutable entitlements with:

- products
- product_releases
- price_versions
- orders
- order_lines
- payment_attempts
- payment_events
- refunds
- entitlement_grants
- entitlement_revocations
- commerce_outbox

Use integer minor units:

- amount_minor
- currency

Add database constraints:

- no overlapping active price windows for the same product/currency;
- frozen order-line description and amount;
- unique provider plus external event id;
- unique provider reference where applicable;
- legal state transitions;
- paid total equals required order total;
- entitlement grant references a paid order line or explicit approved grant.

Do not delete or overwrite grants. Revoke with a separate record and reason.

### 9.7 Operations

Add:

- webhook_inbox
- outbox_events
- job_attempts
- admin_audit_logs
- security_events
- data_export_requests
- data_deletion_requests

Use an inbox/outbox pattern so payment state, entitlement state, and queued side effects cannot drift after a crash.

---

## 10. Supabase and Authorization Model

### 10.1 Schema layout

Recommended:

~~~text
api/          intentionally exposed client-readable/writable objects
private/      commerce, integrations, admin, audit, release internals
auth/         Supabase-managed identity
storage/      Supabase-managed objects with explicit policies
~~~

Do not expose all domain tables merely because RLS exists. Expose the smallest API surface.

### 10.2 Required controls

- enable RLS on every exposed table;
- revoke default grants, then grant only required operations;
- write separate select/insert/update/delete policies;
- use both using and with check where appropriate;
- index ownership and policy columns;
- ensure exposed views use security-invoker behavior or remain private;
- keep Supabase secret keys server-only;
- prefer current publishable and secret key types over legacy anon/service-role keys for a new build;
- never use a secret-key client for ordinary learner requests;
- validate authorization inside every Next.js Server Function and Route Handler;
- enforce admin AAL2 in database policies and server code;
- generate a role × resource × action × ownership test matrix;
- run pgTAP RLS tests in CI.

Supabase’s current documentation emphasizes that grants and RLS work together; adding a policy does not automatically revoke broad table privileges.

### 10.3 Private paid content

Paid lesson delivery must also prevent cache and observability leaks:

- entitlement check on each lesson request;
- immutable lesson release id;
- private/no-store response policy unless a secure per-user cache is designed;
- no static generation of paid payloads;
- no paid content in RSC/client prefetch bundles;
- no full content in logs, error trackers, analytics, or service-worker caches;
- rate limits and abnormal-download detection;
- only requested lesson returned;
- revocation effective on the next request.

This reduces bulk leakage. It is not DRM.

---

## 11. GitHub Integration Polish

The GitHub App decision is correct. GitHub Apps support narrow permissions, selected repositories, and short-lived installation tokens.

### MVP permission strategy

- Metadata: read
- Contents: read for linking and submission inspection
- Contents: write only when explicit platform publishing is enabled
- No Administration permission
- No Workflows permission
- Subscribe only to required webhook events

### Safer publishing

Do not write directly to the learner’s default branch.

Recommended flow:

1. show repository, branch, base SHA, file diff, and commit message;
2. require explicit confirmation;
3. mint a short-lived installation token limited to that repository;
4. write to an academy/checkpoint-* branch;
5. create or invite a pull request;
6. record resulting SHA;
7. handle base-SHA conflict without force push;
8. discard the token after use.

Tokens should be generated when needed and never stored as durable project data. GitHub installation tokens currently expire after one hour and can be narrowed to selected repositories and permissions.

### Webhooks

- verify the raw payload with X-Hub-Signature-256;
- use timing-safe comparison;
- deduplicate with X-GitHub-Delivery;
- subscribe to minimum events;
- acknowledge quickly;
- process asynchronously;
- handle installation suspension, deletion, repository transfer, rename, and access removal.

---

## 12. Payment Architecture Polish

Use PayMongo Hosted Checkout v2 or a provider adapter after final provider selection. Current PayMongo documentation recommends v2 for new hosted-checkout integrations.

### Checkout state machine

~~~text
draft
  -> pending_provider
  -> awaiting_payment
  -> paid
  -> partially_refunded
  -> refunded

terminal alternatives:
expired | cancelled | failed
~~~

State transitions must be enforced server-side and transactionally.

### Required flow

1. server reads one active price version;
2. server creates order and frozen order lines;
3. transaction commits;
4. provider checkout creation uses a stable idempotency key;
5. provider reference is attached to the order;
6. browser redirects to hosted checkout;
7. signed webhook is verified from raw bytes;
8. webhook event is inserted into an idempotent inbox;
9. endpoint acknowledges quickly;
10. worker processes event;
11. order and entitlement grant update in one database transaction;
12. outbox triggers email and analytics;
13. redirect page only displays server-confirmed state.

PayMongo supports idempotency keys for creation requests and recommends deduplicating webhook event IDs. Its current docs also recommend separate test/live endpoints and asynchronous processing.

### Refund policy

Decide before launch:

- full versus partial refunds;
- grace period;
- whether access remains during dispute;
- whether consumed/downloaded content changes policy;
- when entitlement is revoked;
- how reinstatement works after a reversed refund;
- learner notice and appeal.

Legal review is required.

---

## 13. Autosave and Resume

The three-layer approach is correct:

1. in-memory editor state;
2. debounced IndexedDB;
3. coarse remote checkpoint.

Add:

- workspace revision;
- content release/revision;
- client/device id;
- base checkpoint id;
- content hash;
- optimistic concurrency;
- explicit conflict policy;
- max snapshot size;
- retention and garbage collection;
- export and deletion behavior.

Recommended conflict rule:

- same base revision: last successful explicit save wins;
- divergent revisions: preserve both, show recovery choice;
- never silently replace a newer remote checkpoint with an older client snapshot.

Test:

- reload;
- offline edit;
- two tabs;
- two devices;
- quota exhaustion;
- browser storage cleared;
- content version migration;
- partial upload;
- corrupt snapshot;
- account deletion.

---

## 14. Security Threat Model Additions

The original threat model is a good start. Add:

| Threat | Required mitigation |
|---|---|
| Forged client pass results | Certificate evidence re-run or human verified |
| Malicious npm dependency | Curated dependency allowlist, lockfile, separate runtime origin |
| Runtime network exfiltration | Explicit egress policy, no platform data in sandbox |
| Unsafe MDX/component | CI compile to safe IR, component allowlist |
| IDOR on projects/orders | Object-level authorization on every request plus RLS tests |
| CSRF on mutations | Same-origin controls, CSRF/fetch-metadata strategy, re-auth for sensitive actions |
| SSRF through deployment URL or asset fetch | URL allowlist/validation, private-network denial, safe fetch service |
| Webhook replay | Signature, timestamp where supported, unique event/delivery id |
| Out-of-order commerce flow | Server-enforced state machine |
| GitHub force overwrite | Base-SHA check, learner branch, no force push |
| Admin abuse or compromise | AAL2, scoped roles, dual approval, append-only audit |
| Public-profile data leak | Private default, field-level consent, minimal certificate response |
| Account recovery takeover | Strong recovery workflow, notification, session revocation |
| Denial of wallet/storage | Runtime quotas, snapshot limits, rate limits |
| Secret leakage in logs | Structured redaction, provider payload minimization |
| Backup failure | Restore drills, documented RPO/RTO |
| Content provenance dispute | Source commit, contributor attestation, license metadata |

Authorization should deny by default and be checked on every request. UI visibility is never an authorization control.

---

## 15. Analytics and Experimentation

Keep learning metrics, but add governance:

- event schema version;
- purpose and retention;
- source: client or server;
- learner consent where required;
- pseudonymous analytics id;
- no raw code in event properties;
- no full provider payloads;
- deletion/export mapping;
- experiment assignment and stop rules.

Add outcome metrics:

- independent assessment pass rate;
- capstone first-pass rate;
- reviewer disagreement;
- time from first lesson to first original project;
- percentage producing three portfolio-ready projects;
- accessibility defect rate;
- deployment survival after 30 days;
- opt-in job application/interview outcome;
- employer review feedback.

Do not infer employability from time on site, streaks, or lesson clicks.

---

## 16. Licensing and Open-Source Governance

### Software

Evaluate AGPL-3.0 versus a permissive license with legal counsel.

- AGPL supports hosted-fork reciprocity.
- MIT/Apache-style licensing improves adoption and integration.
- trademark policy must remain separate from code license.

### Curriculum

Use a content license, not a software license. CC BY or CC BY-SA are plausible open educational resource options. A NonCommercial restriction would not meet the Open Source Definition’s no-discrimination-by-field principle and may reduce reuse.

Creative Commons licenses are generally irrevocable for recipients who comply. Confirm ownership of every image, exercise, excerpt, and contribution before publication.

### Contributions

Add:

- contributor guide;
- code of conduct;
- security policy;
- DCO or CLA decision;
- curriculum attribution format;
- third-party asset inventory;
- plagiarism review;
- maintainer approval rules;
- release signing/hash policy.

---

## 17. Revised Delivery Plan

### Gate 0 — Evidence and architecture

Deliver:

- competency matrix;
- assessment trust model;
- safe curriculum IR;
- runtime-origin proof;
- RLS matrix;
- core data model;
- cost model;
- privacy defaults;
- accessibility acceptance criteria;
- proposed ADR set.

Exit only when the five P0 findings have owners and acceptance tests.

### Release 1 — Learning kernel

Build:

- optional/simple account creation;
- one JavaScript lesson;
- prediction;
- code modification;
- deterministic formative test;
- progressive hint;
- IndexedDB save;
- remote checkpoint;
- resume;
- basic accessibility and low-bandwidth fallback.

Do not include payments, certificate, WebContainers, or GitHub write access.

Success:

- learners can complete and resume without facilitator help;
- no lost work in tested failure cases;
- lesson completion time and confusion points are observed with real learners;
- runtime cannot reach platform secrets or authenticated storage.

### Release 2 — Project and portfolio slice

Add:

- mini project;
- acceptance criteria;
- repository link;
- read-only repository verification;
- optional branch-based explicit publishing;
- private-by-default learner profile;
- project evidence card.

Success:

- learner understands what will be published;
- no default-branch overwrite;
- revoking GitHub access fails safely;
- private project remains private.

### Release 3 — Free-path beta

Add:

- HTML/CSS, JavaScript, TypeScript, React, Node/API, and PostgreSQL pilots;
- PGlite/Sandpack evaluation;
- review scheduling;
- project ladder;
- curriculum release pipeline;
- RLS regression suite;
- support and analytics operations.

Success:

- representative beginners complete multiple stages;
- device/browser support matrix is proven;
- authoring throughput is measurable;
- cost per active learner is known.

### Release 4 — Complete free path

Add:

- complete curriculum;
- Next.js and production material;
- all required projects;
- independent capstone;
- reviewer workflow;
- certificate evidence snapshot;
- public verification with privacy controls.

Success:

- pilot cohort completes the whole path;
- capstone rubric is reproducible;
- critical security requirements are tested;
- certificate wording receives legal review;
- product claims match observed outcomes.

### Release 5 — Commerce

Add only after free-path stability:

- product catalog;
- versioned prices;
- order ledger;
- PayMongo integration;
- webhook inbox/outbox;
- refunds;
- entitlements;
- Advanced Full Stack pilot.

### Release 6 — Advanced runtimes

Only after license, support, and economics validation:

- WebContainers;
- isolated verification;
- remote labs;
- infrastructure career tracks.

---

## 18. ADR Backlog

The original fifteen ADR topics are valid. Add these proposed ADRs:

16. Safe compiled lesson IR instead of runtime MDX  
17. Browser grading is formative, not certificate-authoritative  
18. Separate runtime origin for learner code  
19. Immutable curriculum release graph  
20. Inbox/outbox for provider events and side effects  
21. Private-by-default learner identity and project visibility  
22. Branch-based GitHub publishing with optimistic concurrency  
23. PGlite evaluation for PostgreSQL-aligned browser labs  
24. WebContainer licensing and browser-support gate  
25. Human-reviewed first certificate cohort  
26. Worker execution boundary inside the modular-monolith repository  
27. Completion credential versus assessed credential  

All should begin as **proposed**. Do not mark accepted until the product owner approves the trade-offs and proof work passes.

---

## 19. Revised Definition of Done

The free path may be called complete only when:

- every stated competency maps to versioned evidence;
- a representative beginner cohort has completed the path;
- required projects include original work rather than tutorial copying;
- formative browser results are not the sole basis for certificate issuance;
- capstone evidence is pinned to an immutable commit;
- rubric scoring is reproducible;
- certificate wording is legally reviewed and accurately describes completion;
- public identity and project visibility are opt-in;
- WCAG 2.2 AA acceptance tests pass for core flows;
- supported browsers/devices and fallbacks are published;
- RLS and authorization tests pass;
- no learner runtime receives platform secrets;
- paid content is absent from public bundles and caches;
- GitHub permissions are minimal and publishing is explicit;
- payment fulfillment is webhook-driven and idempotent;
- data retention, export, deletion, backup, and incident procedures exist;
- cost per learner and review workload are sustainable;
- marketing avoids an employment guarantee.

---

## 20. Recommended Immediate Work Order

1. Approve the credential model: completion or assessed.
2. Build the competency-to-evidence matrix.
3. Design the immutable curriculum release graph.
4. Prototype the separate-origin HTML/JS runner.
5. Define safe lesson IR and compiler.
6. Build the learning-kernel vertical slice.
7. Test with real beginners before adding GitHub writes.
8. Benchmark Sandpack, PGlite, and WebContainers across target devices.
9. Obtain WebContainer commercial pricing and model production hosting costs.
10. Draft RLS, role, and admin-action matrices.
11. Define privacy defaults, retention, and age policy.
12. Pilot capstone review before automating certification.
13. Add commerce only after free-path beta reliability is proven.

---

## 21. Final Assessment

The product direction is worth pursuing. The v1 plan is thoughtful, ethical, and substantially better than a typical LMS blueprint. Its main weakness is not poor technology selection; it is a mismatch between **learning feedback**, **credential evidence**, and **operating cost**.

The polished architecture should therefore optimize for this order:

~~~text
Learning quality
  -> trustworthy evidence
  -> safe runtime boundaries
  -> reliable content releases
  -> sustainable operations
  -> commerce
  -> advanced infrastructure
~~~

The decisive first product is not the complete LMS. It is a fast, accessible, recoverable learning loop that helps a beginner understand, change, run, debug, explain, and retain code without losing work or exposing platform data.

If that loop succeeds with real learners, the rest of the platform has a sound foundation. If that loop fails, more tracks, certificates, and integrations will only scale the failure.

---

## 22. Current Sources Checked

Vendor behavior and pricing are time-sensitive. Re-check before implementation and launch.

### Platform and data

- [Next.js App Router documentation](https://nextjs.org/docs/app)
- [Next.js authentication and authorization guidance](https://nextjs.org/docs/app/guides/authentication)
- [Next.js backend-for-frontend guidance](https://nextjs.org/docs/app/guides/backend-for-frontend)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)
- [Supabase MFA and AAL2](https://supabase.com/docs/guides/auth/auth-mfa)
- [Supabase production pricing](https://supabase.com/pricing)
- [Vercel Hobby plan restrictions](https://vercel.com/docs/plans/hobby)
- [Vercel pricing](https://vercel.com/pricing)

### Interactive runtimes

- [WebContainer commercial usage](https://webcontainers.io/enterprise)
- [WebContainer browser support](https://webcontainers.io/guides/browser-support)
- [WebContainer cross-origin isolation](https://webcontainers.io/guides/configuring-headers)
- [Sandpack documentation](https://sandpack.codesandbox.io/)
- [Sandpack Apache-2.0 repository](https://github.com/codesandbox/sandpack)
- [PGlite browser Postgres documentation](https://pglite.dev/docs/)
- [MDN iframe sandbox security guidance](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe)

### Integrations and commerce

- [GitHub App permission guidance](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app)
- [GitHub installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [GitHub webhook validation](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries)
- [GitHub webhook best practices](https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks)
- [PayMongo Hosted Checkout](https://docs.paymongo.com/docs/payment-channels-hosted-checkout)
- [PayMongo idempotent requests](https://docs.paymongo.com/reference/idempotent-requests)
- [PayMongo webhook setup and signature scheme](https://docs.paymongo.com/docs/developer-tools-webhook-setup-management)
- [PayMongo production checklist](https://docs.paymongo.com/docs/developer-tools-go-live-checklist)
- [PayMongo pricing](https://www.paymongo.com/pricing)

### Curriculum, accessibility, privacy, and licensing

- [MDN Curriculum](https://developer.mozilla.org/en-US/curriculum/)
- [Active learning meta-analysis, PNAS](https://doi.org/10.1073/pnas.1319030111)
- [Retrieval practice research, Science](https://doi.org/10.1126/science.1152408)
- [Spacing-effects research](https://doi.org/10.1111/j.1467-9280.2008.02209.x)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Philippine Data Privacy Act, National Privacy Commission](https://privacy.gov.ph/data-privacy-act/)
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [Creative Commons license guidance](https://creativecommons.org/share-your-work/cclicenses/)
- [Open Source Definition](https://opensource.org/osd)

