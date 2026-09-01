# Changelog

Notable changes to CodeDaddy. Versions follow [semantic versioning](https://semver.org).
The version lives in `apps/web/package.json`; a `v*` tag on this repository runs
the release workflow, which re-runs the full verification gates before publishing.

## [Unreleased]

Work since the 1.0.0-rc.1 entry was written. Note that no `v*` tag exists on
this repository yet, so nothing has actually been released.

### Added

- The donation prompt's GCash QR (`apps/web/public/gcash-qr.png`), cropped to
  the code itself. The account name, mobile number, and user ID printed on the
  source screenshot are not in the file. Decision 40 is now fully delivered.
- Google as a third sign-in provider, alongside GitHub OAuth and the email
  magic link. Decision 5 names only the latter two, so the decision now
  understates what ships.
- A feedback page and a prompt that queues behind the donation one, storing
  each answer through a rate-limited function and emailing it to the
  maintainer when `RESEND_API_KEY` and `FEEDBACK_EMAIL_TO` are set.
- A rate limit on the email sign-in link, keyed on salted digests of the
  address and client so the table identifies nobody.
- `apps/web/.env.example`, which the README has told contributors to copy
  since the deployment section was written. `.env*` in `apps/web/.gitignore`
  had been quietly swallowing it.
- Route skeletons and a fade between screens.
- `supabase/migrations/202608300003_server_only_rpcs.sql`, which takes the
  anonymous execute grant off `claim_email_link` and `submit_feedback`. It must
  be applied *after* the release below is deployed, not before.
- A landing-page FAQ, written as nine plain-data question and answer pairs
  and rendered always open. Both a featured snippet and an AI answer quote
  rendered text, and a collapsed answer is hidden text.
- `/llms.txt`, generated from the curriculum, capstones, and the same FAQ data
  so it cannot drift from the site it describes.
- `BreadcrumbList` JSON-LD on all six public nested routes, and `FAQPage`
  JSON-LD on the landing page.

### Security

- The email-throttle and feedback RPCs are now called with the secret key
  instead of the publishable one. Both are `security definer` functions that
  were granted to `anon`, so anyone holding the publishable key could reach
  `/rest/v1/rpc/...` directly and bypass the app — putting arbitrary text in the
  maintainer's inbox, or burning the sign-in throttle for somebody else's
  address until its owner was locked out. Neither function is called from a
  browser, so nothing legitimate loses access.

### Changed

- The curriculum is presented as its two programs, rebuilt to the Stitch
  screens, with both closed by default and each given its own colour.
- Course size is stated under the per-project step count.
- The donation prompt waits for a finished project rather than a step count.
- Capacity and cost reviewed to keep ten thousand learners inside the free
  tiers.
- The account status line names every sign-in method.
- `Course` structured data now carries `about`, `educationalLevel`,
  `timeRequired`, `learningResourceType`, and `educationalCredentialAwarded`.
- `robots.txt` names thirteen AI crawlers explicitly and disallows
  `/capstones/*/submit`. Root metadata sets `googleBot` snippet directives,
  because a truncated snippet is what stops a page being quoted at all.
- The sitemap stopped hardcoding a date; `lastModified` is build time.
- The footer links to the curriculum and practice pages.

### Fixed

- The editor and preview collapsed to zero height on desktop.
- Icons vanished in dark mode, and the program band was over-saturated.
- The course status ran over the course title.
- The certificate drew twice, ignored the save action, and followed the dark
  theme into an unreadable print.
- The disconnected-state audit now says why it cannot run instead of timing
  out.
- The donation prompt decided whether the GCash QR existed by calling
  `existsSync` against `public/` from the root layout, on every request. The
  app does not build to `standalone`, so on a host that serves `public/` from
  a CDN rather than from the function filesystem that check can read false
  while the image itself serves fine — showing every learner "QR pending"
  forever. The browser's own `onLoad` and `onError` already reported the
  truth, so the server-side check is gone.
- The landing page title carried no brand. `title.template` in a root layout
  applies to child segments only, and `app/page.tsx` shares the root segment,
  so `%s | CodeDaddy` never ran on the most-linked page on the site.
- `/capstones` and `/practice` set title and description only, so neither had
  a canonical URL or a share card.

## [1.0.0-rc.1] - 2026-08-29

The complete v1 front-end, its discovery layer, and the backend implementation.
Release candidate rather than 1.0.0 because live provider setup, hosting, and
the production round-trip have not happened yet.

### Curriculum

- Ten courses grouped into Web Design Basics and Front-End Development:
  HTML, Design Foundations, CSS, JavaScript, JavaScript on a Page, JavaScript
  for Real Apps, Tailwind, React, TypeScript for React, and Testing and DevTools.
- 2,760 guided steps across 476 projects, 8 optional practice activities, and
  5 independent capstones. Every item passes the authoring harness.

### Product

- Three-part workspace: instructions, a real `<textarea>` editor, live preview.
- Local progress, ordered course gates, and a global cross-course spaced review.
- Offline course shell, phone-first workspace, Progress Passport, Baon Mode,
  Character Guard, Tanong Card, Mistake Museum, and progressive recovery.
- Rebuild Mode, Bug Clinic, Constraint Missions, Project Remix, the Skill
  Evidence Ledger, and a share-ready proof page.

### Backend

- Supabase Auth and REST through server routes, with no browser SDK and no new
  npm package: GitHub PKCE, email magic link, HttpOnly sessions, explicit
  progress sync, project-link records, and server-gated certificate issuance.
- Row-level security on all five tables; anonymous reads are denied.

### Discovery

- `robots.txt`, `sitemap.xml`, a web manifest, and a build-time Open Graph card.
- Canonical URLs, per-page Open Graph and Twitter metadata, and JSON-LD for the
  organisation, the curriculum, and each course.
- Personal routes are `noindex` and disallowed.

### Fixed

- The `project_submissions.repository_url` check constraint used `\.` where
  Postgres needed `\.`, so every valid GitHub URL would have been rejected on
  live capstone submission.
