import type { Course } from "@/lib/lesson-ir";

// Runs on the learner's own computer under PLAN.md decisions 43 and 45. Each
// step is checked by the downloadable local checker; a pasted report is
// learner-reported practice only. The code and checks for every project are
// fixed in tools/node-basics-plan.mjs; authoring batches append the steps.
export const nodeBasicsCourse: Course = {
  "id": "node-basics",
  "title": "Node.js Fundamentals",
  "project": "Sari-Sari Store First Scripts",
  "projects": [
    {
      "id": "scripts-sari-sari",
      "title": "Sari-Sari Store First Scripts"
    },
    {
      "id": "modules-sari-sari",
      "title": "Sari-Sari Store Modules"
    },
    {
      "id": "files-sari-sari",
      "title": "Sari-Sari Store Reading and Writing Files"
    },
    {
      "id": "async-sari-sari",
      "title": "Sari-Sari Store Waiting for Work"
    },
    {
      "id": "cli-sari-sari",
      "title": "Sari-Sari Store Command-Line Tools"
    },
    {
      "id": "config-sari-sari",
      "title": "Sari-Sari Store Settings and Secrets"
    },
    {
      "id": "folders-sari-sari",
      "title": "Sari-Sari Store Paths and Folders"
    },
    {
      "id": "scripts-carinderia",
      "title": "Carinderia First Scripts"
    },
    {
      "id": "modules-carinderia",
      "title": "Carinderia Modules"
    },
    {
      "id": "files-carinderia",
      "title": "Carinderia Reading and Writing Files"
    },
    {
      "id": "async-carinderia",
      "title": "Carinderia Waiting for Work"
    },
    {
      "id": "cli-carinderia",
      "title": "Carinderia Command-Line Tools"
    },
    {
      "id": "config-carinderia",
      "title": "Carinderia Settings and Secrets"
    },
    {
      "id": "folders-carinderia",
      "title": "Carinderia Paths and Folders"
    },
    {
      "id": "scripts-barangay",
      "title": "Barangay Office First Scripts"
    },
    {
      "id": "modules-barangay",
      "title": "Barangay Office Modules"
    },
    {
      "id": "files-barangay",
      "title": "Barangay Office Reading and Writing Files"
    },
    {
      "id": "async-barangay",
      "title": "Barangay Office Waiting for Work"
    },
    {
      "id": "cli-barangay",
      "title": "Barangay Office Command-Line Tools"
    },
    {
      "id": "config-barangay",
      "title": "Barangay Office Settings and Secrets"
    },
    {
      "id": "folders-barangay",
      "title": "Barangay Office Paths and Folders"
    },
    {
      "id": "scripts-school-club",
      "title": "School Club First Scripts"
    },
    {
      "id": "modules-school-club",
      "title": "School Club Modules"
    },
    {
      "id": "files-school-club",
      "title": "School Club Reading and Writing Files"
    },
    {
      "id": "async-school-club",
      "title": "School Club Waiting for Work"
    },
    {
      "id": "cli-school-club",
      "title": "School Club Command-Line Tools"
    },
    {
      "id": "config-school-club",
      "title": "School Club Settings and Secrets"
    },
    {
      "id": "folders-school-club",
      "title": "School Club Paths and Folders"
    },
    {
      "id": "scripts-tricycle",
      "title": "Tricycle Terminal First Scripts"
    },
    {
      "id": "modules-tricycle",
      "title": "Tricycle Terminal Modules"
    },
    {
      "id": "files-tricycle",
      "title": "Tricycle Terminal Reading and Writing Files"
    },
    {
      "id": "async-tricycle",
      "title": "Tricycle Terminal Waiting for Work"
    },
    {
      "id": "cli-tricycle",
      "title": "Tricycle Terminal Command-Line Tools"
    },
    {
      "id": "config-tricycle",
      "title": "Tricycle Terminal Settings and Secrets"
    },
    {
      "id": "folders-tricycle",
      "title": "Tricycle Terminal Paths and Folders"
    }
  ],
  "order": 14,
  "summary": "Run JavaScript on your own computer: scripts, modules, files, waiting for work, command-line tools, settings, and folders, all with Node built-ins. Needs a computer with Node.js. Checks run on your computer and are practice only.",
  "requires": [
    "cli-git"
  ],
  "requiresComputer": true,
  "kind": "local",
  "steps": []
};
