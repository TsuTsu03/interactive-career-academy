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

// Validated local authoring batch: files-sari-sari.
cliGitCourse.steps.push(...([
  {
    "id": "cli-files-sari-sari-1",
    "index": 1,
    "task": "You make a folder named orders. This is where you will keep your store's order records. The terminal lets you create folders with the command `mkdir orders`. Run the checker to confirm the folder exists.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "folder",
        "label": "The orders folder exists",
        "kind": "local-dir-exists",
        "path": "orders"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of a folder as a box to hold your files. You name it 'orders' to keep track of your store's sales."
      },
      {
        "level": 2,
        "text": "Type `mkdir orders` and press Enter."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "mkdir orders"
    },
    "conceptIds": [
      "cli-terminal"
    ],
    "estimatedMinutes": 3,
    "projectId": "files-sari-sari"
  },
  {
    "id": "cli-files-sari-sari-2",
    "index": 2,
    "task": "You make a file named prices.txt inside the orders folder. This file will hold your store's prices. Use the relative path orders/prices.txt to point to the file. The command is `touch orders/prices.txt`. Run the checker to confirm the file exists.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "file",
        "label": "orders/prices.txt exists",
        "kind": "local-file-exists",
        "path": "orders/prices.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "A relative path starts from your current folder. Here, you go into 'orders' to make 'prices.txt'."
      },
      {
        "level": 2,
        "text": "Type `touch orders/prices.txt` and press Enter."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "touch orders/prices.txt"
    },
    "conceptIds": [
      "cli-relative-path"
    ],
    "estimatedMinutes": 3,
    "projectId": "files-sari-sari"
  },
  {
    "id": "cli-files-sari-sari-3",
    "index": 3,
    "task": "You write the price 'Rice 50' into the prices.txt file. This tells your store's customers how much rice costs. You use the output redirect > to write this line. The command is `echo \"Rice 50\" > orders/prices.txt`. Run the checker to confirm the file says 'Rice 50'.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "line",
        "label": "prices.txt says Rice 50",
        "kind": "local-file-contains",
        "path": "orders/prices.txt",
        "value": "Rice 50"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The > sign writes your text into the file. It replaces whatever was there before, so you start fresh."
      },
      {
        "level": 2,
        "text": "Type `echo \"Rice 50\" > orders/prices.txt` and press Enter."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Rice 50\" > orders/prices.txt"
    },
    "conceptIds": [
      "cli-redirect"
    ],
    "estimatedMinutes": 3,
    "projectId": "files-sari-sari"
  },
  {
    "id": "cli-files-sari-sari-4",
    "index": 4,
    "task": "You add 'Soap 25' as a second line to the prices.txt file. This keeps your soap price with the rice price. You use >> to append, so the first line stays. The command is `echo \"Soap 25\" >> orders/prices.txt`. Run the checker to confirm both lines are there.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "second",
        "label": "prices.txt now also says Soap 25",
        "kind": "local-file-contains",
        "path": "orders/prices.txt",
        "value": "Soap 25"
      },
      {
        "id": "first",
        "label": "Rice 50 is still there",
        "kind": "local-file-contains",
        "path": "orders/prices.txt",
        "value": "Rice 50"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The >> sign adds your text to the end of the file, without deleting the first line."
      },
      {
        "level": 2,
        "text": "Type `echo \"Soap 25\" >> orders/prices.txt` and press Enter."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Soap 25\" >> orders/prices.txt"
    },
    "conceptIds": [
      "cli-append"
    ],
    "estimatedMinutes": 3,
    "projectId": "files-sari-sari"
  },
  {
    "id": "cli-files-sari-sari-5",
    "index": 5,
    "task": "You copy the prices.txt file to a new file named backup.txt. This is a safety copy in case you need to go back. The command is `cp orders/prices.txt orders/backup.txt`. Run the checker to confirm backup.txt holds both lines.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "copy",
        "label": "backup.txt holds a copy of both lines",
        "kind": "local-file-contains",
        "path": "orders/backup.txt",
        "value": "Soap 25"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The cp command makes a copy of the file. It leaves the original file unchanged."
      },
      {
        "level": 2,
        "text": "Type `cp orders/prices.txt orders/backup.txt` and press Enter."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "cp orders/prices.txt orders/backup.txt"
    },
    "conceptIds": [
      "cli-copy"
    ],
    "estimatedMinutes": 3,
    "projectId": "files-sari-sari"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: files-sari-sari.
cliGitCourse.steps.push(...([
  {
    "id": "cli-files-sari-sari-6",
    "index": 6,
    "task": "You make a new folder called archive. This is like a box for old papers. You put it next to your main box. This helps you keep things tidy. Run this command: `mkdir archive`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "archive",
        "label": "The archive folder exists",
        "kind": "local-dir-exists",
        "path": "archive"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of it as making a new box next to your main box. You don't need to type the whole command."
      },
      {
        "level": 2,
        "text": "Run `mkdir archive` to make the box."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "mkdir archive"
    },
    "estimatedMinutes": 3,
    "projectId": "files-sari-sari"
  },
  {
    "id": "cli-files-sari-sari-7",
    "index": 7,
    "task": "You move the backup file into the archive folder. This is like putting a paper in a box. The backup file will stay safe there. Run this command: `mv orders/backup.txt archive/backup.txt`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "moved",
        "label": "archive/backup.txt exists",
        "kind": "local-file-exists",
        "path": "archive/backup.txt"
      },
      {
        "id": "gone",
        "label": "backup.txt is no longer in orders",
        "kind": "local-path-missing",
        "path": "orders/backup.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of moving a paper from one box to another. You don't need to type the whole command."
      },
      {
        "level": 2,
        "text": "Run `mv orders/backup.txt archive/backup.txt` to move the paper."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "mv orders/backup.txt archive/backup.txt"
    },
    "conceptIds": [
      "cli-move"
    ],
    "estimatedMinutes": 4,
    "projectId": "files-sari-sari"
  },
  {
    "id": "cli-files-sari-sari-8",
    "index": 8,
    "task": "You add Egg 9 to the prices file. This is like writing a new price on the list. The backup file stays old and unchanged. Run this command: `echo \"Egg 9\" >> orders/prices.txt`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "third",
        "label": "prices.txt now says Egg 9",
        "kind": "local-file-contains",
        "path": "orders/prices.txt",
        "value": "Egg 9"
      },
      {
        "id": "backup-old",
        "label": "The backup does not have Egg 9",
        "kind": "local-file-lacks",
        "path": "archive/backup.txt",
        "value": "Egg 9"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of adding a new price to the list. You don't need to type the whole command."
      },
      {
        "level": 2,
        "text": "Run `echo \"Egg 9\" >> orders/prices.txt` to add the price."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Egg 9\" >> orders/prices.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "files-sari-sari"
  },
  {
    "id": "cli-files-sari-sari-9",
    "index": 9,
    "task": "You delete the old backup file. This is like throwing away a paper. It's gone for good. Run this command: `rm archive/backup.txt`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "deleted",
        "label": "The old backup is deleted",
        "kind": "local-path-missing",
        "path": "archive/backup.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of throwing away a paper. You don't need to type the whole command."
      },
      {
        "level": 2,
        "text": "Run `rm archive/backup.txt` to delete the paper."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "rm archive/backup.txt"
    },
    "conceptIds": [
      "cli-remove"
    ],
    "estimatedMinutes": 3,
    "projectId": "files-sari-sari"
  },
  {
    "id": "cli-files-sari-sari-10",
    "index": 10,
    "task": "You remove the empty archive folder. This is like taking away an empty box. The main folder stays. Run this command: `rm -r archive`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "no-archive",
        "label": "The archive folder is gone",
        "kind": "local-path-missing",
        "path": "archive"
      },
      {
        "id": "kept",
        "label": "The orders folder is still there",
        "kind": "local-dir-exists",
        "path": "orders"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of taking away an empty box. You don't need to type the whole command."
      },
      {
        "level": 2,
        "text": "Run `rm -r archive` to remove the box."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "rm -r archive"
    },
    "estimatedMinutes": 4,
    "projectId": "files-sari-sari"
  }
] satisfies typeof cliGitCourse.steps));
