import type { Course } from "@/lib/lesson-ir";

// The local-computer grading model awaits the decision in V2_RUNNER_DESIGN.md.
export const cliGitCourse: Course = {
  "id": "cli-git",
  "title": "Command Line and Git",
  "project": "Barangay Office Files (Local Community Office)",
  "projects": [
    {
      "id": "barangay-files",
      "title": "Barangay Office Files (Local Community Office)"
    },
    {
      "id": "store-history",
      "title": "Sari-Sari Store History (Neighborhood Shop)"
    },
    {
      "id": "volunteer-branches",
      "title": "Volunteer Website Branches"
    }
  ],
  "order": 13,
  "summary": "Practise paths, files, processes, and version history through Philippine community projects. Lessons are being prepared.",
  "requires": [
    "nosql-basics"
  ],
  "requiresComputer": true,
  "kind": "js",
  "steps": []
};
