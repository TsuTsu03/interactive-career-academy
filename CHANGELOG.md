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

### Fixed

- The editor and preview collapsed to zero height on desktop.
- Icons vanished in dark mode, and the program band was over-saturated.
- The course status ran over the course title.
- The certificate drew twice, ignored the save action, and followed the dark
  theme into an unreadable print.
- The disconnected-state audit now says why it cannot run instead of timing
  out.

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
