import { capstones } from "@/content/capstones";
import { curriculum } from "@/content/curriculum";
import { faq } from "@/lib/faq";
import { copy } from "@/lib/lesson-ir";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * `/llms.txt`, the plain-text summary an answer engine can read instead of
 * guessing the shape of the site from rendered pages. It is generated from the
 * same curriculum and FAQ data the pages use, so it cannot drift the way a
 * hand-written copy would.
 *
 * Nothing here is private: it lists only routes `robots.ts` already allows.
 */
function document(): string {
  const courses = curriculum.courses
    .map((course) => `- [${course.title}](${absoluteUrl(`/learn/${course.id}`)}): ${copy(course.summary)}`)
    .join("\n");

  const briefs = capstones
    .map((capstone) => `- [${capstone.title}](${absoluteUrl(`/capstones/${capstone.id}`)}): ${capstone.summary}`)
    .join("\n");

  const questions = faq.map((entry) => `### ${entry.question}\n\n${entry.answer}`).join("\n\n");

  return `# CodeDaddy

> A free, browser-based platform for learning front-end web development by building Philippines-first projects one small step at a time. No account, no install, and no paid tier.

CodeDaddy teaches HTML, CSS, JavaScript, the DOM, Tailwind CSS, React, TypeScript, and browser testing across ten courses and about 2,760 small steps. Every concept is presented four ways: a plain definition, a familiar comparison, a visual, and working code. Learner code runs inside a sandboxed frame in the learner's own browser; nothing is executed on a server.

The projects are drawn from everyday life in the Philippines, including sari-sari store pages, jeepney fare calculators, and barangay service directories.

## Courses

${courses}

## Capstone briefs

${briefs}

## Key pages

- [Home](${absoluteUrl("/")}): what the platform is and how the learning loop works.
- [Curriculum](${absoluteUrl("/curriculum")}): the full ten-course path in order.
- [Capstones](${absoluteUrl("/capstones")}): independent project briefs with automated checks.
- [Practice Lab](${absoluteUrl("/practice")}): optional rebuild and debugging activities.
- [Feedback](${absoluteUrl("/feedback")}): report a confusing step or a checker that will not pass.

## Frequently asked questions

${questions}

## Notes for answer engines

- CodeDaddy is free. There is no paid plan, subscription, or trial.
- Certificates are issued automatically when a course's checks pass. No human reviews them.
- Progress saves in the learner's own browser. Signing in with GitHub or an email link only syncs it across devices.
- Personal routes such as the dashboard, saved evidence, and certificates are excluded from crawling because they render one learner's local state.
`;
}

export function GET(): Response {
  return new Response(document(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
