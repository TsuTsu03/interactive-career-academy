import type { Curriculum } from "@/lib/lesson-ir";
import { cssCourse } from "./css-course";
import { htmlCourse } from "./html-course";
import { jsCourse } from "./js-course";
import { tailwindCourse } from "./tailwind-course";

/**
 * Stage 1 of the free path: the web foundations, in the order the audit's
 * curriculum sequence requires. Structure follows freeCodeCamp: each course
 * is one project built across many small steps, and courses unlock in order.
 *
 * PLAN.md section 4 states the intended free-path order as
 * HTML -> CSS -> Tailwind -> JavaScript -> React. tailwindCourse only
 * requires css-basics (it needs no JavaScript), so it is safe to reorder
 * this array to [html, css, tailwind, js] later without touching either
 * course's `requires` field. Left after js-basics for now to avoid an
 * unnecessary edit to js-course.ts while it may be under active work.
 */
export const curriculum: Curriculum = {
  id: "web-foundations",
  title: "Web Foundations",
  courses: [htmlCourse, cssCourse, jsCourse, tailwindCourse],
};

export function courseById(id: string) {
  return curriculum.courses.find((c) => c.id === id);
}
