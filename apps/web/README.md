# CodeDaddy web app

CodeDaddy is a browser-based, project-led front-end learning platform. The current v1 frontend teaches HTML, CSS, JavaScript, and Tailwind CSS through small steps and practical projects rooted in everyday Filipino life.

```bash
npm --prefix apps/web run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Main routes

| Route | Purpose |
|---|---|
| `/` | Public CodeDaddy landing page |
| `/dashboard` | Learner home using locally saved progress |
| `/curriculum` | Course and progress map |
| `/learn/[courseId]` | Three-part lesson workspace |
| `/projects` | Learner project portfolio |
| `/review` | Spaced review session |
| `/certificate` | Honest certificate readiness state |
| `/account` | Account connection state |
| `/harness` | Curriculum authoring and regression harness |

## Product structure

| Path | Role |
|---|---|
| `content/*-course.ts` | Course, project, and step data |
| `content/concepts.ts` | Shared concepts with four teaching representations |
| `lib/lesson-ir.ts` | Closed lesson and test data types |
| `lib/grading.ts` | Deterministic browser-side assertions |
| `lib/js-runner.ts` | Sandboxed JavaScript execution |
| `lib/harness.ts` | Curriculum integrity checks |
| `components/workspace.tsx` | Lesson state, instructions, editor, preview, and run loop |
| `components/learner-home.tsx` | Local-progress dashboard |
| `components/product-nav.tsx` | Shared responsive learner navigation |
| `app/globals.css` | Manila Modernist design tokens and responsive themes |

## Iframe security

The iframe sandboxes are the security boundary and must stay separate.

| Frame | Sandbox | Reason |
|---|---|---|
| Preview and concept demo | `allow-scripts` | Learner or authored code can run without same-origin access |
| Grader | `allow-same-origin` | The parent can inspect output while script execution remains off |
| JavaScript runner | `allow-scripts` | Code runs in an opaque origin and communicates through `postMessage` |

Never combine `allow-scripts` and `allow-same-origin` on one iframe.

## Deliberate constraints

- The frontend has no added UI, editor, state, or animation package.
- The editor remains a real `textarea` for keyboard and assistive-technology support.
- Meaningful values race animation frames against a timer so background tabs cannot leave stale state.
- Status always uses a word and an icon, never colour alone.
- Course code, position, and completed steps persist as one atomic browser record.
- Account sync, authentication providers, backend verification, and production certificates remain disconnected until the frontend scope is frozen.

The authoritative product decisions are in the repository root `PLAN.md`. The visual system is documented in `design/DESIGN.md`, and the downloaded Google Stitch reference package is in `design/stitch/codedaddy-learning-platform/`.
