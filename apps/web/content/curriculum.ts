import type { Curriculum } from "@/lib/lesson-ir";
import { cssCourse } from "./css-course";
import { domCourse } from "./dom-course";
import { htmlCourse } from "./html-course";
import { jsCourse } from "./js-course";
import { reactCourse } from "./react-course";
import { tailwindCourse } from "./tailwind-course";

/**
 * Stage 1 of the free path: the web foundations, in the order the audit's
 * curriculum sequence requires. Structure follows freeCodeCamp: each course
 * contains many projects built across small cumulative steps, and courses
 * unlock in order.
 *
 * PLAN.md section 4 states the free-path order as
 * HTML -> CSS -> Tailwind -> JavaScript -> JavaScript on a Page -> React.
 * Decision 39 added the page course between the language and React: React is
 * about components, and a learner who has never touched the DOM has no idea
 * what a component is replacing.
 */
export const curriculum: Curriculum = {
  id: "web-foundations",
  title: "Web Foundations",
  courses: [htmlCourse, cssCourse, tailwindCourse, jsCourse, domCourse, reactCourse],
};

export function courseById(id: string) {
  return curriculum.courses.find((c) => c.id === id);
}
