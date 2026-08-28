import type { MetadataRoute } from "next";
import { capstones } from "@/content/capstones";
import { curriculum } from "@/content/curriculum";
import { practiceActivities } from "@/content/practice-activities";
import { absoluteUrl } from "@/lib/site";

/**
 * Only the routes that teach something to a first-time visitor. Personal
 * surfaces are excluded here for the same reason `robots.ts` disallows them:
 * they render local browser state and say nothing to anybody else.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-08-29");

  const fixed: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: updated, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/curriculum"), lastModified: updated, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/capstones"), lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/practice"), lastModified: updated, changeFrequency: "monthly", priority: 0.6 },
  ];

  const courses: MetadataRoute.Sitemap = curriculum.courses.map((course) => ({
    url: absoluteUrl(`/learn/${course.id}`),
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const briefs: MetadataRoute.Sitemap = capstones.map((capstone) => ({
    url: absoluteUrl(`/capstones/${capstone.id}`),
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const practice: MetadataRoute.Sitemap = practiceActivities.map((activity) => ({
    url: absoluteUrl(`/practice/${activity.id}`),
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...fixed, ...courses, ...briefs, ...practice];
}
