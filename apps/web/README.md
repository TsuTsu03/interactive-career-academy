# CodeDaddy web app

CodeDaddy is a browser-based, project-led front-end learning platform. Its ten-course v1 frontend teaches web design, HTML, CSS, JavaScript, browser APIs, Tailwind CSS, React, TypeScript, testing, and DevTools through small steps and practical projects rooted in everyday Filipino life.

Program C has 30 SQL and 20 NoSQL exemplar steps. Both run and grade in the
browser. Its five computer courses have planned projects and no steps while
their grading model awaits the decision in `../../V2_RUNNER_DESIGN.md`.

The Node content gate requires Node 24. It shares structural checks with the
browser harness and executes SQL and NoSQL starts and solutions. It does not
replace browser behavior checks for the other courses. Legacy granularity
warnings remain warnings; database-course granularity violations are errors.

```bash
npm --prefix apps/web run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Donation prompt

The donation prompt waits until the learner has finished at least one whole project, so a first-time visitor is never asked for money before the product has done anything for them. It can always be dismissed, and a dismissal is remembered for 30 days in `codedaddy.donation.dismissed.v1`. It does not appear on the internal `/harness` route. Donations use a static owner-supplied GCash QR image with no embedded checkout or payment backend. Save the real QR as `public/gcash-qr.png`; until that file exists, the prompt shows an honest pending state.

## Main routes

| Route | Purpose |
|---|---|
| `/` | Public CodeDaddy landing page |
| `/dashboard` | Learner home using locally saved progress |
| `/curriculum` | Course and progress map |
| `/learn/[courseId]` | Three-part lesson workspace |
| `/projects` | Learner project portfolio |
| `/practice` | Rebuild Mode, Bug Clinic, Constraint Missions, and Project Remix |
| `/capstones` | Five independent capstone briefs and browser checks |
| `/capstones/[capstoneId]/submit` | Signed-in project-link record, with a local draft fallback |
| `/evidence` | Private Skill Evidence Ledger |
| `/proof` | Share-ready proof page derived from verified browser work |
| `/tools` | Progress Passport, Baon Mode, Tanong Card, and recovery tools |
| `/review` | Spaced review session |
| `/certificate` | Account-backed certificate readiness and issuance |
| `/certificate/[code]` | Public certificate record |
| `/account` | GitHub or email sign-in, profile, and explicit progress sync |
| `/harness` | Curriculum authoring and regression harness |

## Product structure

| Path | Role |
|---|---|
| `content/*-course.ts` | Course, project, and step data |
| `content/concepts.ts` | Shared concepts with four teaching representations |
| `lib/lesson-ir.ts` | Closed lesson and test data types |
| `lib/grading.ts` | Deterministic browser-side assertions |
| `lib/js-runner.ts` | Sandboxed JavaScript execution |
| `lib/react-runner.ts` | Sandboxed React grading and fixed runtime document |
| `tools/react-browser-runtime-entry.js` | React, JSX/TSX compilation, and plain-data assertion runtime |
| `lib/harness.ts` | Curriculum integrity checks |
| `components/workspace.tsx` | Lesson state, instructions, editor, preview, and run loop |
| `components/learner-home.tsx` | Local-progress dashboard |
| `components/product-nav.tsx` | Shared responsive learner navigation |
| `app/globals.css` | Manila Modernist design tokens and responsive themes |

## Discovery, sharing, and installing

Public teaching routes are indexable. Every route that renders one learner's own
browser state is `noindex` and disallowed in `robots.txt`, because it says
nothing to anybody else.

| Route | Role |
|---|---|
| `/robots.txt` | Crawl rules and the sitemap pointer |
| `/sitemap.xml` | Landing page, curriculum, ten courses, five capstones, eight practice activities |
| `/manifest.webmanifest` | Installable shell for the offline course cache in `public/sw.js` |
| `/opengraph-image` | Build-time share card generated from the Manila Modernist tokens |

`SITE_URL` sets the origin used by canonical links, the sitemap, the share card,
and the auth redirects. It is one variable for all of them (`lib/site.ts`), and
an unset value falls back to `http://localhost:3000` rather than emitting a
wrong canonical.

Structured data is authored from curriculum data in `lib/structured-data.ts`:
an `EducationalOrganization` and `WebSite` on the landing page, an `ItemList` of
every course on `/curriculum`, and a `Course` on each `/learn/[courseId]`.

## Route changes

Each route segment has a `loading.tsx` that renders `components/skeleton.tsx`
in the shape of the screen it is waiting for — the same header height, page
width, and card rhythm — so arriving content lands where the placeholder was
instead of shoving the page around. The skeletons are server components: markup
and two class names, nothing shipped to the browser.

`app/template.tsx` fades a new screen in over 160ms. The App Router builds a
fresh template instance per navigation, which is what replays the animation; a
key on the layout's children would remount the same way but sits above the
router's Suspense boundaries. Two constraints shape it. It animates opacity only, because a
transform on that wrapper would become the containing block for the sticky
product nav and every fixed layer while it ran. And it uses no fill mode and
starts at `0.6` rather than `0`: a hidden or throttled tab freezes the
animation clock, and a screen whose visibility depends on an animation that
never ran is a blank page. At rest the wrapper is simply opaque.

## Iframe security

The iframe sandboxes are the security boundary and must stay separate.

| Frame | Sandbox | Reason |
|---|---|---|
| HTML/CSS/Tailwind preview | `allow-scripts` | Learner code runs without same-origin access |
| Grader | `allow-same-origin` | The parent can inspect output while script execution remains off |
| JavaScript runner | `allow-scripts` | Code runs in an opaque origin and communicates through `postMessage` |
| Concept demo | `allow-scripts` | Authored demos run without same-origin access |
| React preview | `allow-scripts` | Real React and learner code run in an opaque origin |
| React grader | `allow-scripts` | Disposable opaque frame returns plain assertion results |
| Page grader | `allow-scripts` | Learner scripts update a disposable opaque document before assertions run |

Never combine `allow-scripts` and `allow-same-origin` on one iframe.

## Deliberate constraints

- The frontend has no added UI, editor, state, or animation package.
- Sucrase 3.35.1 is the owner-approved JSX and TypeScript compiler inside the generated React browser runtime. Its measured gzip increase is 45,276 bytes.
- The editor remains a real `textarea` for keyboard and assistive-technology support.
- Meaningful values race animation frames against a timer so background tabs cannot leave stale state.
- Status always uses a word and an icon, never colour alone.
- Course code, position, and completed steps persist as one atomic browser record.
- Browser progress remains useful without an account. Signed-in sync is explicit and merges the more advanced record instead of silently replacing local work.
- Public certificates are minted only by the server after it revalidates all ten courses, five capstones, five project-link records, and the saved certificate name.
- Donations remain optional and never change access to the free curriculum.

## Continuous integration, versions, and deployment

`.github/workflows/ci.yml` runs on every push to `main` and every pull request.
It runs the three gates `AGENTS.md` section 6 requires — `tsc --noEmit`,
`eslint . --max-warnings 0`, and `next build` — on Node 24. A red CI run means
the change is not finished.

The app version lives in `apps/web/package.json`. Record changes in
`CHANGELOG.md`, then tag:

```bash
git tag -a v1.0.0 -m "v1.0.0"
git push origin v1.0.0
```

`.github/workflows/release.yml` re-runs the same gates against the tag and only
then publishes a GitHub release. A tag that fails verification publishes nothing.

Deployment itself is the host's Git integration rather than a workflow, so no
deploy credentials live in this repository. On Vercel, connect the repo, set the
root directory to `apps/web`, and set four environment variables:

| Variable | Value |
|---|---|
| `SUPABASE_URL` | The project API URL |
| `SUPABASE_PUBLISHABLE_KEY` | The `sb_publishable_...` key |
| `SUPABASE_SECRET_KEY` | The `sb_secret_...` key, server-only |
| `SITE_URL` | The production origin, with no trailing slash |

`SITE_URL` drives canonical URLs, the sitemap, the share card, and the auth
redirects at once. Setting it wrong is the single most likely deployment
mistake. The same origin must also be the Supabase Site URL, and
`<origin>/**` must be in the Supabase redirect allow-list.

## Supabase setup

The backend integration uses Supabase Auth and REST directly through server routes. It adds no browser SDK or npm package.

1. Create a Supabase project and run `supabase/migrations/202608290001_frontend_learning_backend.sql` in its SQL editor or migration pipeline.
2. Copy `.env.example` to `.env.local` and set `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, and `SITE_URL`. The secret key is server-only and must never use a `NEXT_PUBLIC_` prefix.
3. In Supabase Auth, set the site URL and allow `${SITE_URL}/auth/callback` as a redirect URL.
4. Enable GitHub OAuth and configure its provider credentials in Supabase.
5. For email links, use the callback URL with the token hash: `{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email`.

The migration enables row-level security. Learners can read and update only their own profile, progress, and project-link records. Authenticated clients can only read their own certificate; certificate creation requires the server-only secret.

## Verification

From `apps/web`:

```bash
npx tsc --noEmit
npx eslint .
npm run check:content
node tools/check-content-regressions.mjs
node tools/check-nosql-runtime.mjs
npm run build
node tools/v2-browser-audit.mjs
node tools/browser-audit.mjs
node tools/practice-browser-audit.mjs
node tools/capstone-browser-audit.mjs
node tools/pending-qa-browser-audit.mjs
node tools/backend-browser-audit.mjs
node tools/backend-integration-audit.mjs
```

The browser scripts use `http://localhost:3000` and a temporary report folder by default. Set `CODEDADDY_URL`, `CODEDADDY_QA_OUTPUT`, `CODEDADDY_CDP_PORT`, or `CHROME_PATH` when those defaults do not fit the environment.

`backend-browser-audit.mjs` checks the honest **disconnected** account,
certificate, and submission states, so it needs a server started without
Supabase credentials. Against a configured server it exits early and says so
rather than timing out.

`backend-integration-audit.mjs` runs the built app against a local Supabase-compatible mock. It verifies the server contract, PKCE flow, authenticated persistence, submission recording, certificate gates, and public record without using real provider credentials. A live Supabase deployment still needs a separate provider round-trip.

The authoritative product decisions are in the repository root `PLAN.md`. The visual system is documented in `design/DESIGN.md`, and the downloaded Google Stitch reference package is in `design/stitch/codedaddy-learning-platform/`.
