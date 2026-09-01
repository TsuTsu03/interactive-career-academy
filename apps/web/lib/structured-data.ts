import { curriculum } from "@/content/curriculum";
import { faq } from "@/lib/faq";
import { copy, type Course } from "@/lib/lesson-ir";
import { absoluteUrl, siteUrl } from "@/lib/site";

const ORGANIZATION_ID = `${siteUrl()}/#organization`;
const WEBSITE_ID = `${siteUrl()}/#website`;

const SUBJECTS = [
  "HTML",
  "CSS",
  "JavaScript",
  "Tailwind CSS",
  "React",
  "TypeScript",
  "Web accessibility",
  "Front-end development",
];

const PROVIDER = {
  "@type": "EducationalOrganization",
  "@id": ORGANIZATION_ID,
  name: "CodeDaddy",
  url: absoluteUrl("/"),
  logo: absoluteUrl("/icon.svg"),
  image: absoluteUrl("/opengraph-image"),
  description:
    "A free, browser-based front-end learning platform built around Philippines-first projects.",
  areaServed: "PH",
  knowsAbout: SUBJECTS,
  knowsLanguage: "en",
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
      {
        "@type": "FAQPage",
        "@id": `${siteUrl()}/#faq`,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: faq.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: { "@type": "Answer", text: entry.answer },
        })),
      },
    ],
  };
}

/**
 * The trail a reader actually walked to reach a page. Answer engines use it to
 * name the section a quoted passage came from, and search results render it in
 * place of a bare URL.
 */
export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/**
 * One course as schema.org `Course`. `hasCourseInstance` states the honest
 * shape of the offering: self-paced, online, and free, with the authored
 * minute estimates summed into a duration rather than a guessed schedule.
 */
export function courseSchema(course: Course): Record<string, unknown> {
  const minutes = course.steps.reduce((total, step) => total + (step.estimatedMinutes ?? 0), 0);
  const hours = Math.max(1, Math.round(minutes / 60));

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
    about: SUBJECTS,
    educationalLevel: "Beginner",
    learningResourceType: "Interactive project course",
    timeRequired: `PT${hours}H`,
    educationalCredentialAwarded: "CodeDaddy certificate of completion",
    provider: { "@id": ORGANIZATION_ID },
    offers: { "@type": "Offer", price: 0, priceCurrency: "PHP", category: "Free" },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${hours}H`,
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
