# Changelog

Notable changes to CodeDaddy. Versions follow [semantic versioning](https://semver.org).
The version lives in `apps/web/package.json`; a `v*` tag on this repository runs
the release workflow, which re-runs the full verification gates before publishing.

## [Unreleased]

Nothing yet.

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
