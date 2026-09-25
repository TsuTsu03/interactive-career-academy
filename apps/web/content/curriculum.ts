import { fullstackIntegrationCourse } from "./fullstack-integration-course";
import { authSecurityCourse } from "./auth-security-course";
import { apiBasicsCourse } from "./api-basics-course";
import { nodeBasicsCourse } from "./node-basics-course";
import { cliGitCourse } from "./cli-git-course";
import { nosqlCourse } from "./nosql-course";
import type { Curriculum } from "@/lib/lesson-ir";
import { cssCourse } from "./css-course";
import { designFoundationsCourse } from "./design-foundations-course";
import { domCourse } from "./dom-course";
import { htmlCourse } from "./html-course";
import { jsCourse } from "./js-course";
import { realAppsCourse } from "./real-apps-course";
import { reactCourse } from "./react-course";
import { sqlCourse } from "./sql-course";
import { tailwindCourse } from "./tailwind-course";
import { testingDevtoolsCourse } from "./testing-devtools-course";
import { typescriptReactCourse } from "./typescript-react-course";

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
  id: "codedaddy-front-end",
  title: "CodeDaddy Front-End Path",
  programs: [
    {
      id: "web-design-basics",
      title: "Web Design Basics",
      summary: "Learn page structure, design judgment, styling, JavaScript, and browser interaction.",
      courseIds: ["html-basics", "design-foundations", "css-basics", "js-basics", "dom-basics"],
    },
    {
      id: "front-end-development",
      title: "Front-End Development",
      summary: "Connect real app data, build typed React interfaces, and prove them with tests and diagnostics.",
      courseIds: ["js-real-apps", "tailwind-basics", "react-basics", "typescript-react", "testing-devtools"],
    },
    {
      id: "back-end-development",
      title: "Back-End Development",
      summary: "Ask a database questions, then build and secure the server that answers them.",
      courseIds: ["sql-basics", "nosql-basics", "cli-git", "node-basics", "api-basics", "auth-security", "fullstack-integration"],
    },
  ],
  courses: [
    htmlCourse,
    designFoundationsCourse,
    cssCourse,
    jsCourse,
    domCourse,
    realAppsCourse,
    tailwindCourse,
    reactCourse,
    typescriptReactCourse,
    testingDevtoolsCourse,
    sqlCourse,
    nosqlCourse,
    cliGitCourse,
    nodeBasicsCourse,
    apiBasicsCourse,
    authSecurityCourse,
    fullstackIntegrationCourse,

  ],
};

export function courseById(id: string) {
  return curriculum.courses.find((c) => c.id === id);
}

/** Program C does not expand the settled v1 Front-End certificate requirements. */
export const frontEndCourses = curriculum.courses.filter(course =>
  curriculum.programs.some(program =>
    ["web-design-basics", "front-end-development"].includes(program.id) && program.courseIds.includes(course.id),
  ),
);
