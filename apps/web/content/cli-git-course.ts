import type { Course } from "@/lib/lesson-ir";

// Runs on the learner's own computer under V2_RUNNER_DESIGN.md option B. Each
// step is checked by the downloadable local checker; a pasted report is
// learner-reported practice only. The commands and checks for every project
// are fixed in tools/cli-git-plan.mjs; authoring batches append the steps.
export const cliGitCourse: Course = {
  "id": "cli-git",
  "title": "Command Line and Git",
  "project": "Sari-Sari Store Files and Folders",
  "projects": [
    {
      "id": "files-sari-sari",
      "title": "Sari-Sari Store Files and Folders"
    },
    {
      "id": "first-commit-sari-sari",
      "title": "Sari-Sari Store First Commits"
    },
    {
      "id": "undo-sari-sari",
      "title": "Sari-Sari Store Undoing Changes"
    },
    {
      "id": "branches-sari-sari",
      "title": "Sari-Sari Store Branches"
    },
    {
      "id": "merging-sari-sari",
      "title": "Sari-Sari Store Merging Work"
    },
    {
      "id": "tidy-sari-sari",
      "title": "Sari-Sari Store Renaming and Ignoring"
    },
    {
      "id": "files-barangay",
      "title": "Barangay Office Files and Folders"
    },
    {
      "id": "first-commit-barangay",
      "title": "Barangay Office First Commits"
    },
    {
      "id": "undo-barangay",
      "title": "Barangay Office Undoing Changes"
    },
    {
      "id": "branches-barangay",
      "title": "Barangay Office Branches"
    },
    {
      "id": "merging-barangay",
      "title": "Barangay Office Merging Work"
    },
    {
      "id": "tidy-barangay",
      "title": "Barangay Office Renaming and Ignoring"
    },
    {
      "id": "files-school-club",
      "title": "School Club Files and Folders"
    },
    {
      "id": "first-commit-school-club",
      "title": "School Club First Commits"
    },
    {
      "id": "undo-school-club",
      "title": "School Club Undoing Changes"
    },
    {
      "id": "branches-school-club",
      "title": "School Club Branches"
    },
    {
      "id": "merging-school-club",
      "title": "School Club Merging Work"
    },
    {
      "id": "tidy-school-club",
      "title": "School Club Renaming and Ignoring"
    }
  ],
  "order": 13,
  "summary": "Practise folders, files, and Git history in your own terminal through Philippine community projects. Needs a computer with Node.js and Git. Checks run on your computer and are practice only.",
  "requires": [
    "nosql-basics"
  ],
  "requiresComputer": true,
  "kind": "local",
  "steps": []
};
