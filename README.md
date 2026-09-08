# Interactive Career Academy

Interactive Career Academy is a free, project-led web-development learning platform for complete beginners. The learner works through small, practical steps in the browser instead of reading a course and being sent away to start from a blank file.

The web app is branded as **CodeDaddy**. Its examples use familiar Filipino everyday contexts while the learner-facing course copy stays in plain English.

## Learning path

The completed front-end path covers:

- HTML and design foundations
- CSS and JavaScript
- JavaScript for real apps and Tailwind CSS
- React and TypeScript for React
- Testing and developer tools
- Independent practice activities and five capstone projects

Database coursework is being developed separately. The product plan, course decisions, and current scope live in [PLAN.md](PLAN.md).

## Run locally

Prerequisites: Node.js and npm.

```bash
npm --prefix apps/web ci
npm --prefix apps/web run dev
```

Open <http://localhost:3000>.

## Verify a local change

Run these checks from the web app directory:

```bash
cd apps/web
npx tsc --noEmit
npx eslint .
npm run build
```

The app also includes browser audits for the curriculum, practice activities, capstones, offline behavior, and the optional backend contract. See [apps/web/README.md](apps/web/README.md) for the full verification commands.

## Repository layout

```text
apps/web/             Next.js learner application
apps/web/content/     Course, project, practice, and concept data
apps/web/components/  Learning workspace and learner-facing screens
apps/web/lib/         Lesson model, grading, sandbox runners, and persistence
apps/web/tools/       Browser audits and runtime build tools
design/               Design system and source design references
supabase/             Optional authentication and persistence migration
```

## Design and safety boundaries

- Learning progress remains useful without an account; signed-in sync is explicit.
- Learner code runs in purpose-specific sandboxed frames. Do not combine `allow-scripts` with `allow-same-origin` on an iframe.
- The free learning path does not include a paid tier or checkout.
- Optional account, progress-sync, submission, and certificate flows require a configured Supabase project. Follow [apps/web/README.md](apps/web/README.md) for those environment and provider steps.

## Further reading

- [Product plan](PLAN.md)
- [Web application guide](apps/web/README.md)
- [Changelog](CHANGELOG.md)
