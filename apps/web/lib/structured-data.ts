import { curriculum } from "@/content/curriculum";
import { copy, type Course } from "@/lib/lesson-ir";
import { absoluteUrl, siteUrl } from "@/lib/site";

const ORGANIZATION_ID = `${siteUrl()}/#organization`;
const WEBSITE_ID = `${siteUrl()}/#website`;

const PROVIDER = {
  "@type": "EducationalOrganization",
  "@id": ORGANIZATION_ID,
  name: "CodeDaddy",
  url: absoluteUrl("/"),
  logo: absoluteUrl("/icon.svg"),
  description:
    "A free, browser-based front-end learning platform built around Philippines-first projects.",
  areaServed: "PH",
  sameAs: ["https://github.com/TsuTsu03/interactive-career-academy"],
};

/** Organization plus site identity, emitted once on the landing page. */
export function siteGraph(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      PROVIDER,
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: absoluteUrl("/"),
        name: "CodeDaddy",
        inLanguage: "en",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

/**
 * One course as schema.org `Course`. `hasCourseInstance` states the honest
 * shape of the offering: self-paced, online, and free, with the authored
 * minute estimates summed into a duration rather than a guessed schedule.
 */
export function courseSchema(course: Course): Record<string, unknown> {
  const minutes = course.steps.reduce((total, step) => total + (step.estimatedMinutes ?? 0), 0);

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": absoluteUrl(`/learn/${course.id}#course`),
    name: course.title,
    description: copy(course.summary),
    url: absoluteUrl(`/learn/${course.id}`),
    inLanguage: "en",
    isAccessibleForFree: true,
    teaches: course.projects.map((project) => project.title),
    provider: { "@id": ORGANIZATION_ID },
    offers: { "@type": "Offer", price: 0, priceCurrency: "PHP", category: "Free" },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${Math.max(1, Math.round(minutes / 60))}H`,
    },
  };
}

/** The whole path as an ordered list, for the curriculum map. */
export function curriculumSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: curriculum.title,
    description:
      "Ten courses that move from page structure and design judgment to styling, JavaScript, the DOM, Tailwind, React, TypeScript, and testing.",
    numberOfItems: curriculum.courses.length,
    itemListElement: curriculum.courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: courseSchema(course),
    })),
  };
}
