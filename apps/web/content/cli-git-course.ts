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

// Validated local authoring batch: first-commit-sari-sari.
cliGitCourse.steps.push(...([
  {
    "id": "cli-first-commit-sari-sari-1",
    "index": 11,
    "task": "You turn your folder into a Git repository. This lets Git track your files. You name the first branch main. This is the default branch name. Run this command: `git init -b main`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "repo",
        "label": "The folder is a Git repository",
        "kind": "local-git-repo"
      },
      {
        "id": "untracked",
        "label": "prices.txt is not tracked yet",
        "kind": "local-git-untracked",
        "path": "prices.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Make your folder a Git project by running git init with the -b flag for main."
      },
      {
        "level": 2,
        "text": "Run `git init -b main` to start the repository with the branch named main."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git init -b main"
    },
    "conceptIds": [
      "git-repository"
    ],
    "estimatedMinutes": 3,
    "projectId": "first-commit-sari-sari"
  },
  {
    "id": "cli-first-commit-sari-sari-2",
    "index": 12,
    "task": "You set your Git identity name to Maria Santos. This name appears on every commit. Run this command: `git config user.name \"Maria Santos\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "Commits will be signed by Maria Santos",
        "kind": "local-git-config",
        "key": "user.name",
        "value": "Maria Santos"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Set your Git name so future commits show Maria Santos as the author."
      },
      {
        "level": 2,
        "text": "Run `git config user.name \"Maria Santos\"` to set your name in Git."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.name \"Maria Santos\""
    },
    "conceptIds": [
      "git-identity"
    ],
    "estimatedMinutes": 2,
    "projectId": "first-commit-sari-sari"
  },
  {
    "id": "cli-first-commit-sari-sari-3",
    "index": 13,
    "task": "You set your Git identity email to maria@example.com. This email appears on every commit. Run this command: `git config user.email \"maria@example.com\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "email",
        "label": "The commit email is maria@example.com",
        "kind": "local-git-config",
        "key": "user.email",
        "value": "maria@example.com"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Set your Git email so commits show maria@example.com as the contact."
      },
      {
        "level": 2,
        "text": "Run `git config user.email \"maria@example.com\"` to set your email in Git."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.email \"maria@example.com\""
    },
    "estimatedMinutes": 2,
    "projectId": "first-commit-sari-sari"
  },
  {
    "id": "cli-first-commit-sari-sari-4",
    "index": 14,
    "task": "You stage only prices.txt. This means Git will save its changes next. README.txt stays unstaged. Run this command: `git add prices.txt`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "staged",
        "label": "prices.txt is staged",
        "kind": "local-git-staged",
        "path": "prices.txt"
      },
      {
        "id": "readme-waits",
        "label": "README.txt is still untracked",
        "kind": "local-git-untracked",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add prices.txt to the staging area so Git knows it's ready to save."
      },
      {
        "level": 2,
        "text": "Run `git add prices.txt` to stage only this file for your next commit."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add prices.txt"
    },
    "conceptIds": [
      "git-staging"
    ],
    "estimatedMinutes": 2,
    "projectId": "first-commit-sari-sari"
  },
  {
    "id": "cli-first-commit-sari-sari-5",
    "index": 15,
    "task": "You stage README.txt too. Now both files are ready to be saved. Run this command: `git add README.txt`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "readme",
        "label": "README.txt is staged",
        "kind": "local-git-staged",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add README.txt to the staging area so Git saves it with prices.txt."
      },
      {
        "level": 2,
        "text": "Run `git add README.txt` to stage this file for your next commit."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add README.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "first-commit-sari-sari"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: first-commit-sari-sari.
cliGitCourse.steps.push(...([
  {
    "id": "cli-first-commit-sari-sari-6",
    "index": 16,
    "task": "You will save your first work in Git. This is called a commit. It keeps a record of your changes. Run this command exactly as shown: `git commit -m \"Start sari-sari store list\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has one commit",
        "kind": "local-git-commit-count",
        "count": 1
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of a commit like saving a photo of your work so you can return to it later."
      },
      {
        "level": 2,
        "text": "`git commit -m \"Start sari-sari store list\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Start sari-sari store list\""
    },
    "conceptIds": [
      "git-commit"
    ],
    "estimatedMinutes": 3,
    "projectId": "first-commit-sari-sari"
  },
  {
    "id": "cli-first-commit-sari-sari-7",
    "index": 17,
    "task": "You will add a new item to your prices list. This edit is not yet saved in Git. Run this command exactly as shown: `echo \"Soap 25\" >> prices.txt`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "changed",
        "label": "prices.txt has an unstaged change",
        "kind": "local-git-unstaged",
        "path": "prices.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "This command adds text to the file without needing to open it."
      },
      {
        "level": 2,
        "text": "`echo \"Soap 25\" >> prices.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Soap 25\" >> prices.txt"
    },
    "conceptIds": [
      "git-unstaged-change"
    ],
    "estimatedMinutes": 2,
    "projectId": "first-commit-sari-sari"
  },
  {
    "id": "cli-first-commit-sari-sari-8",
    "index": 18,
    "task": "You will tell Git to save this new change. Run this command exactly as shown: `git add prices.txt`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "staged",
        "label": "The change to prices.txt is staged",
        "kind": "local-git-staged",
        "path": "prices.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "This command prepares the file for saving in Git, like putting it in a box before sealing it."
      },
      {
        "level": 2,
        "text": "`git add prices.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add prices.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "first-commit-sari-sari"
  },
  {
    "id": "cli-first-commit-sari-sari-9",
    "index": 19,
    "task": "You will save the change you prepared. This will be your second commit. Run this command exactly as shown: `git commit -m \"Add soap lne\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has two commits",
        "kind": "local-git-commit-count",
        "count": 2
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "This saves your change with a message, even if the message has a mistake."
      },
      {
        "level": 2,
        "text": "`git commit -m \"Add soap lne\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Add soap lne\""
    },
    "estimatedMinutes": 2,
    "projectId": "first-commit-sari-sari"
  },
  {
    "id": "cli-first-commit-sari-sari-10",
    "index": 20,
    "task": "You will fix the mistake in your last commit message. Git lets you change the most recent commit message with --amend. Run this command exactly as shown: `git commit --amend -m \"Add soap line\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "message",
        "label": "The last commit message is spelled correctly",
        "kind": "local-git-head-message",
        "value": "Add soap line"
      },
      {
        "id": "still-two",
        "label": "There are still two commits, not three",
        "kind": "local-git-commit-count",
        "count": 2
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use --amend to fix the message without making a new commit."
      },
      {
        "level": 2,
        "text": "`git commit --amend -m \"Add soap line\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit --amend -m \"Add soap line\""
    },
    "conceptIds": [
      "git-amend"
    ],
    "estimatedMinutes": 3,
    "projectId": "first-commit-sari-sari"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: undo-sari-sari.
cliGitCourse.steps.push(...([
  {
    "id": "cli-undo-sari-sari-1",
    "index": 21,
    "task": "You turn this folder into a Git repository. This lets you save your work safely. You use the command `git init -b main` to start. After you run it, the checker will say the folder is now a Git repo. It will also say prices.txt is not tracked yet. That's okay for now.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\nSoap 25\n"
    },
    "tests": [
      {
        "id": "repo",
        "label": "The folder is a Git repository",
        "kind": "local-git-repo"
      },
      {
        "id": "untracked",
        "label": "prices.txt is not tracked yet",
        "kind": "local-git-untracked",
        "path": "prices.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are starting a new project folder. Git will remember your changes from here."
      },
      {
        "level": 2,
        "text": "Run `git init -b main` to start the repository."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git init -b main"
    },
    "estimatedMinutes": 3,
    "projectId": "undo-sari-sari"
  },
  {
    "id": "cli-undo-sari-sari-2",
    "index": 22,
    "task": "You tell Git who you are. This helps identify your work later. You run `git config user.name \"Maria Santos\"` to set your name. Then you run `git config user.email \"maria@example.com\"` to set your email. After that, the checker will confirm your name and email are set.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\nSoap 25\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "Commits will be signed by Maria Santos",
        "kind": "local-git-config",
        "key": "user.name",
        "value": "Maria Santos"
      },
      {
        "id": "email",
        "label": "The commit email is maria@example.com",
        "kind": "local-git-config",
        "key": "user.email",
        "value": "maria@example.com"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Git needs to know who made the changes. You give it your name and email."
      },
      {
        "level": 2,
        "text": "Run `git config user.name \"Maria Santos\"` and `git config user.email \"maria@example.com\"`."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.name \"Maria Santos\"\ngit config user.email \"maria@example.com\""
    },
    "estimatedMinutes": 4,
    "projectId": "undo-sari-sari"
  },
  {
    "id": "cli-undo-sari-sari-3",
    "index": 23,
    "task": "You prepare all files to be saved. You use `git add .` to stage every file. This means Git will save them together. After you run it, the checker will say both files are now staged. That means they are ready to be saved.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\nSoap 25\n"
    },
    "tests": [
      {
        "id": "file",
        "label": "prices.txt is staged",
        "kind": "local-git-staged",
        "path": "prices.txt"
      },
      {
        "id": "readme",
        "label": "README.txt is staged",
        "kind": "local-git-staged",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are telling Git to save all files at once. Use the dot to mean all files."
      },
      {
        "level": 2,
        "text": "Run `git add .` to stage all files."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add ."
    },
    "estimatedMinutes": 2,
    "projectId": "undo-sari-sari"
  },
  {
    "id": "cli-undo-sari-sari-4",
    "index": 24,
    "task": "You save your work as the first commit. You use `git commit -m \"Start sari-sari store list\"` to do this. The message tells what you did. After you run it, the checker will say the repo has one commit and nothing is left uncommitted. That means your work is saved.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\nSoap 25\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has one commit",
        "kind": "local-git-commit-count",
        "count": 1
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are saving your files for the first time. Give a short message to explain what you did."
      },
      {
        "level": 2,
        "text": "Run `git commit -m \"Start sari-sari store list\"` to save your work."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Start sari-sari store list\""
    },
    "estimatedMinutes": 3,
    "projectId": "undo-sari-sari"
  },
  {
    "id": "cli-undo-sari-sari-5",
    "index": 25,
    "task": "You add a mistake to prices.txt. You use `echo \"Wrong line\" >> prices.txt` to add it. This is a test for undoing changes. After you run it, the checker will say prices.txt now has the wrong line and Git sees an unstaged change. That's what you want for now.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\nSoap 25\n"
    },
    "tests": [
      {
        "id": "mistake",
        "label": "prices.txt has the mistaken line",
        "kind": "local-file-contains",
        "path": "prices.txt",
        "value": "Wrong line"
      },
      {
        "id": "unstaged",
        "label": "Git sees an unstaged change",
        "kind": "local-git-unstaged",
        "path": "prices.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are adding a mistake to test undoing changes. Use the `>>` to add to the end of the file."
      },
      {
        "level": 2,
        "text": "Run `echo \"Wrong line\" >> prices.txt` to add the mistake."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Wrong line\" >> prices.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "undo-sari-sari"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: undo-sari-sari.
cliGitCourse.steps.push(...([
  {
    "id": "cli-undo-sari-sari-6",
    "index": 26,
    "task": "You made a mistake in prices.txt. You want to throw away that mistake. Use git restore to fix it. This command puts the file back to its last saved state. Run the checker to see if the mistake is gone. Then paste its report.\n\nType this command in your terminal:\n`git restore prices.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\nSoap 25\n"
    },
    "tests": [
      {
        "id": "fixed",
        "label": "The mistaken line is gone",
        "kind": "local-file-lacks",
        "path": "prices.txt",
        "value": "Wrong line"
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think: throw away the edit you made but keep the last saved version."
      },
      {
        "level": 2,
        "text": "git restore prices.txt"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git restore prices.txt"
    },
    "conceptIds": [
      "git-restore"
    ],
    "estimatedMinutes": 3,
    "projectId": "undo-sari-sari"
  },
  {
    "id": "cli-undo-sari-sari-7",
    "index": 27,
    "task": "You want to add a new item: Egg 9. Type echo \"Egg 9\" >> prices.txt to write it into the file. This adds the line without saving it yet. Run the checker to see if the new line appears. Then paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\nSoap 25\n"
    },
    "tests": [
      {
        "id": "unstaged",
        "label": "prices.txt has an unstaged change",
        "kind": "local-git-unstaged",
        "path": "prices.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think: write the new line into the file without staging it."
      },
      {
        "level": 2,
        "text": "echo \"Egg 9\" >> prices.txt"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Egg 9\" >> prices.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "undo-sari-sari"
  },
  {
    "id": "cli-undo-sari-sari-8",
    "index": 28,
    "task": "You now want to prepare the new line to be saved. Use git add prices.txt to stage it. This tells Git you are ready to save this change. Run the checker to see if the file is now staged. Then paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\nSoap 25\n"
    },
    "tests": [
      {
        "id": "staged",
        "label": "prices.txt is staged",
        "kind": "local-git-staged",
        "path": "prices.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think: mark the new line so Git knows you want to save it next."
      },
      {
        "level": 2,
        "text": "git add prices.txt"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add prices.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "undo-sari-sari"
  },
  {
    "id": "cli-undo-sari-sari-9",
    "index": 29,
    "task": "You changed your mind. You want to remove the new line from the staging area but keep it in the file. Use git restore --staged prices.txt. This takes the change out of staging but leaves the file as is. Run the checker to see if it's unstaged. Then paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\nSoap 25\n"
    },
    "tests": [
      {
        "id": "unstaged",
        "label": "prices.txt is back to unstaged",
        "kind": "local-git-unstaged",
        "path": "prices.txt"
      },
      {
        "id": "kept",
        "label": "Egg 9 is still in the file",
        "kind": "local-file-contains",
        "path": "prices.txt",
        "value": "Egg 9"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think: take the change out of the staging area but leave the file unchanged."
      },
      {
        "level": 2,
        "text": "git restore --staged prices.txt"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git restore --staged prices.txt"
    },
    "conceptIds": [
      "git-unstage"
    ],
    "estimatedMinutes": 3,
    "projectId": "undo-sari-sari"
  },
  {
    "id": "cli-undo-sari-sari-10",
    "index": 30,
    "task": "You decide not to save the change. You want to throw away the new line and return to the last saved version. Use git restore prices.txt. This removes the edit and returns the file to its last commit. Run the checker to see if the line is gone. Then paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\nSoap 25\n"
    },
    "tests": [
      {
        "id": "dropped",
        "label": "Egg 9 is gone again",
        "kind": "local-file-lacks",
        "path": "prices.txt",
        "value": "Egg 9"
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think: remove the edit and return to the last saved version."
      },
      {
        "level": 2,
        "text": "git restore prices.txt"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git restore prices.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "undo-sari-sari"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: branches-sari-sari.
cliGitCourse.steps.push(...([
  {
    "id": "cli-branches-sari-sari-1",
    "index": 31,
    "task": "You turn your folder into a Git repository. This lets you save your work safely. You name the first branch 'main'. This is the main line of work. Run this command: `git init -b main`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "repo",
        "label": "The folder is a Git repository",
        "kind": "local-git-repo"
      },
      {
        "id": "untracked",
        "label": "prices.txt is not tracked yet",
        "kind": "local-git-untracked",
        "path": "prices.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are starting a Git repo. The 'main' branch is the default line of work."
      },
      {
        "level": 2,
        "text": "`git init -b main`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git init -b main"
    },
    "estimatedMinutes": 3,
    "projectId": "branches-sari-sari"
  },
  {
    "id": "cli-branches-sari-sari-2",
    "index": 32,
    "task": "You tell Git who you are. This helps others know who made the changes. You set your name and email. Run these commands: `git config user.name \"Maria Santos\"` and `git config user.email \"maria@example.com\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "Commits will be signed by Maria Santos",
        "kind": "local-git-config",
        "key": "user.name",
        "value": "Maria Santos"
      },
      {
        "id": "email",
        "label": "The commit email is maria@example.com",
        "kind": "local-git-config",
        "key": "user.email",
        "value": "maria@example.com"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Git needs your name and email to mark your work. Use your real details."
      },
      {
        "level": 2,
        "text": "`git config user.name \"Maria Santos\"` and `git config user.email \"maria@example.com\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.name \"Maria Santos\"\ngit config user.email \"maria@example.com\""
    },
    "estimatedMinutes": 3,
    "projectId": "branches-sari-sari"
  },
  {
    "id": "cli-branches-sari-sari-3",
    "index": 33,
    "task": "You prepare all files for saving. This is called staging. You use a dot (.) to include everything. Run this command: `git add .`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "file",
        "label": "prices.txt is staged",
        "kind": "local-git-staged",
        "path": "prices.txt"
      },
      {
        "id": "readme",
        "label": "README.txt is staged",
        "kind": "local-git-staged",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Staging means you are ready to save your files. The dot means all files."
      },
      {
        "level": 2,
        "text": "`git add .` is the command to stage everything."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add ."
    },
    "estimatedMinutes": 2,
    "projectId": "branches-sari-sari"
  },
  {
    "id": "cli-branches-sari-sari-4",
    "index": 34,
    "task": "You save your staged files as the first commit. This is your first step. You write a message: 'Start sari-sari store list'. Run this command: `git commit -m \"Start sari-sari store list\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has one commit",
        "kind": "local-git-commit-count",
        "count": 1
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Commit means you save your work. The message explains what you did."
      },
      {
        "level": 2,
        "text": "`git commit -m \"Start sari-sari store list\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Start sari-sari store list\""
    },
    "estimatedMinutes": 3,
    "projectId": "branches-sari-sari"
  },
  {
    "id": "cli-branches-sari-sari-5",
    "index": 35,
    "task": "You make a new branch named 'update-prices'. This is a separate line of work. You stay on 'main'. Run this command: `git branch update-prices`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "exists",
        "label": "The update-prices branch exists",
        "kind": "local-git-branch-exists",
        "branch": "update-prices"
      },
      {
        "id": "still-main",
        "label": "You are still on main",
        "kind": "local-git-branch",
        "value": "main"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "A branch is like a separate notebook. You can try changes without affecting main."
      },
      {
        "level": 2,
        "text": "`git branch update-prices`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git branch update-prices"
    },
    "conceptIds": [
      "git-branch"
    ],
    "estimatedMinutes": 2,
    "projectId": "branches-sari-sari"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: branches-sari-sari.
cliGitCourse.steps.push(...([
  {
    "id": "cli-branches-sari-sari-6",
    "index": 36,
    "task": "You are now on the update-prices branch. This branch is for changing prices. You must move here to add new prices. Use this command to move there. Run the checker to confirm you are on the right branch.\n\nType this command in your terminal:\n`git switch update-prices`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "on-branch",
        "label": "You are on update-prices",
        "kind": "local-git-branch",
        "value": "update-prices"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You change branches by telling Git which one you want to use. Think of it like switching to a different part of your store's records."
      },
      {
        "level": 2,
        "text": "Run `git switch update-prices` to move there."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git switch update-prices"
    },
    "conceptIds": [
      "git-switch"
    ],
    "estimatedMinutes": 3,
    "projectId": "branches-sari-sari"
  },
  {
    "id": "cli-branches-sari-sari-7",
    "index": 37,
    "task": "You are on the update-prices branch. Add the new price for Soap 25 to the prices file. This is like writing a new price tag on a shelf. Use this command to write it. Then run the checker to see if Git noticed the change.\n\nType this command in your terminal:\n`echo \"Soap 25\" >> prices.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "unstaged",
        "label": "prices.txt has an unstaged change",
        "kind": "local-git-unstaged",
        "path": "prices.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You add new prices by writing them into the prices file. Git will notice it's new and ready to save."
      },
      {
        "level": 2,
        "text": "Run `echo \"Soap 25\" >> prices.txt` to add it."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Soap 25\" >> prices.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "branches-sari-sari"
  },
  {
    "id": "cli-branches-sari-sari-8",
    "index": 38,
    "task": "You are on the update-prices branch. Git has noticed the new price. You must save it. Use this command to save it with a message. Then run the checker to see if Git saved it correctly.\n\nType this command in your terminal:\n`git commit -am \"Add Soap 25\"`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "This branch has two commits",
        "kind": "local-git-commit-count",
        "count": 2
      },
      {
        "id": "message",
        "label": "The last commit says Add Soap 25",
        "kind": "local-git-head-message",
        "value": "Add Soap 25"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You save changes by telling Git to commit them. The -am flag saves and adds the message at once."
      },
      {
        "level": 2,
        "text": "Run `git commit -am \"Add Soap 25\"` to save it."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -am \"Add Soap 25\""
    },
    "estimatedMinutes": 3,
    "projectId": "branches-sari-sari"
  },
  {
    "id": "cli-branches-sari-sari-9",
    "index": 39,
    "task": "You are still on the update-prices branch. You must go back to the main branch to check if the new price is there. Use this command to move back. Then run the checker to confirm you are on main and that the price is not there.\n\nType this command in your terminal:\n`git switch main`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "main",
        "label": "You are back on main",
        "kind": "local-git-branch",
        "value": "main"
      },
      {
        "id": "not-here",
        "label": "main does not have Soap 25",
        "kind": "local-file-lacks",
        "path": "prices.txt",
        "value": "Soap 25"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You move back to main to check if the new price is saved there. Main is the main record of the store."
      },
      {
        "level": 2,
        "text": "Run `git switch main` to go back."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git switch main"
    },
    "estimatedMinutes": 2,
    "projectId": "branches-sari-sari"
  },
  {
    "id": "cli-branches-sari-sari-10",
    "index": 40,
    "task": "You are on the main branch. You must create a new branch named weekend-sale and move onto it. This is like opening a new notebook for weekend sales. Use this command to do both at once. Then run the checker to confirm the branch exists and you are on it.\n\nType this command in your terminal:\n`git switch -c weekend-sale`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "created",
        "label": "The weekend-sale branch exists",
        "kind": "local-git-branch-exists",
        "branch": "weekend-sale"
      },
      {
        "id": "on-it",
        "label": "You are on weekend-sale",
        "kind": "local-git-branch",
        "value": "weekend-sale"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You create and move to a new branch with one command. The -c flag creates the branch and switches you to it."
      },
      {
        "level": 2,
        "text": "Run `git switch -c weekend-sale` to do both."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git switch -c weekend-sale"
    },
    "estimatedMinutes": 3,
    "projectId": "branches-sari-sari"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: merging-sari-sari.
cliGitCourse.steps.push(...([
  {
    "id": "cli-merging-sari-sari-1",
    "index": 41,
    "task": "You turn this folder into a Git repository. This lets you save your work safely. You name the first branch main. This is the default branch for your store's work. Run this command: `git init -b main`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "repo",
        "label": "The folder is a Git repository",
        "kind": "local-git-repo"
      },
      {
        "id": "untracked",
        "label": "prices.txt is not tracked yet",
        "kind": "local-git-untracked",
        "path": "prices.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are starting a new Git project. Think of it like opening a new notebook for your store's records."
      },
      {
        "level": 2,
        "text": "Run `git init -b main` to start the repository."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git init -b main"
    },
    "estimatedMinutes": 3,
    "projectId": "merging-sari-sari"
  },
  {
    "id": "cli-merging-sari-sari-2",
    "index": 42,
    "task": "You tell Git who you are. This helps track your changes. You use the name Maria Santos and the email maria@example.com. Run these commands: `git config user.name \"Maria Santos\"` and `git config user.email \"maria@example.com\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "Commits will be signed by Maria Santos",
        "kind": "local-git-config",
        "key": "user.name",
        "value": "Maria Santos"
      },
      {
        "id": "email",
        "label": "The commit email is maria@example.com",
        "kind": "local-git-config",
        "key": "user.email",
        "value": "maria@example.com"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Git needs your name and email to mark your work. Think of it like signing your store's daily log."
      },
      {
        "level": 2,
        "text": "Run `git config user.name \"Maria Santos\"` and `git config user.email \"maria@example.com\"`."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.name \"Maria Santos\"\ngit config user.email \"maria@example.com\""
    },
    "estimatedMinutes": 3,
    "projectId": "merging-sari-sari"
  },
  {
    "id": "cli-merging-sari-sari-3",
    "index": 43,
    "task": "You prepare all files for saving. You stage them with a dot. This means you include everything. Run this command: `git add .`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "file",
        "label": "prices.txt is staged",
        "kind": "local-git-staged",
        "path": "prices.txt"
      },
      {
        "id": "readme",
        "label": "README.txt is staged",
        "kind": "local-git-staged",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are telling Git to save all files. Think of it like putting all your store's items on a shelf before packing them."
      },
      {
        "level": 2,
        "text": "Run `git add .` to stage every file."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add ."
    },
    "estimatedMinutes": 2,
    "projectId": "merging-sari-sari"
  },
  {
    "id": "cli-merging-sari-sari-4",
    "index": 44,
    "task": "You save the staged files as your first commit. This is your first record of your store's work. Run this command: `git commit -m \"Start sari-sari store list\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has one commit",
        "kind": "local-git-commit-count",
        "count": 1
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are saving your work with a message. Think of it like writing a note on your store's first day."
      },
      {
        "level": 2,
        "text": "Run `git commit -m \"Start sari-sari store list\"` to save your changes."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Start sari-sari store list\""
    },
    "estimatedMinutes": 3,
    "projectId": "merging-sari-sari"
  },
  {
    "id": "cli-merging-sari-sari-5",
    "index": 45,
    "task": "You create a new branch named update-prices. This branch will hold your price changes. You switch to this branch. Run this command: `git switch -c update-prices`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "on-branch",
        "label": "You are on update-prices",
        "kind": "local-git-branch",
        "value": "update-prices"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are making a new branch for your price updates. Think of it like opening a new notebook for price changes."
      },
      {
        "level": 2,
        "text": "Run `git switch -c update-prices` to move to the new branch."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git switch -c update-prices"
    },
    "estimatedMinutes": 2,
    "projectId": "merging-sari-sari"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: merging-sari-sari.
cliGitCourse.steps.push(...([
  {
    "id": "cli-merging-sari-sari-6",
    "index": 46,
    "task": "You will add the price for Soap 25 to the prices.txt file. This is the first step to make the change visible in your branch. You will use a command to write the price into the file. After you run the command, check if the file has an unstaged change. This means your change is ready to be saved but not yet saved.\n\nType this command in your terminal:\n`echo \"Soap 25\" >> prices.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "unstaged",
        "label": "prices.txt has an unstaged change",
        "kind": "local-git-unstaged",
        "path": "prices.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are adding a line to a file. Think of it like writing a new price on a paper list."
      },
      {
        "level": 2,
        "text": "Run: `echo \"Soap 25\" >> prices.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Soap 25\" >> prices.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "merging-sari-sari"
  },
  {
    "id": "cli-merging-sari-sari-7",
    "index": 47,
    "task": "Now you will save the change you made. You will use a command to record the change in your branch. This makes the change part of your work. After you run the command, check if your branch has two commits and nothing is left uncommitted. This means your change is saved and ready to be shared.\n\nType this command in your terminal:\n`git commit -am \"Add Soap 25\"`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The branch has two commits",
        "kind": "local-git-commit-count",
        "count": 2
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are saving your change with a message. Think of it like writing a note on your work log."
      },
      {
        "level": 2,
        "text": "Run: `git commit -am \"Add Soap 25\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -am \"Add Soap 25\""
    },
    "estimatedMinutes": 3,
    "projectId": "merging-sari-sari"
  },
  {
    "id": "cli-merging-sari-sari-8",
    "index": 48,
    "task": "Now you will go back to the main branch. The main branch does not have the Soap 25 price yet. You will use a command to switch to the main branch. After you run the command, check if you are on main and if main does not have Soap 25. This means you are ready to bring the change into main.\n\nType this command in your terminal:\n`git switch main`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "main",
        "label": "You are on main",
        "kind": "local-git-branch",
        "value": "main"
      },
      {
        "id": "not-yet",
        "label": "main does not have Soap 25 yet",
        "kind": "local-file-lacks",
        "path": "prices.txt",
        "value": "Soap 25"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are switching to the main branch. Think of it like going to the main store counter."
      },
      {
        "level": 2,
        "text": "Run: `git switch main`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git switch main"
    },
    "estimatedMinutes": 2,
    "projectId": "merging-sari-sari"
  },
  {
    "id": "cli-merging-sari-sari-9",
    "index": 49,
    "task": "You will bring the work from the update-prices branch into the main branch. This is called merging. You will use a command to merge the branch. After you run the command, check if update-prices is merged into main and if main now has Soap 25. This means the change is now part of the main store's records.\n\nType this command in your terminal:\n`git merge update-prices`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "merged",
        "label": "update-prices is merged into main",
        "kind": "local-git-merged",
        "branch": "update-prices"
      },
      {
        "id": "arrived",
        "label": "main now has Soap 25",
        "kind": "local-file-contains",
        "path": "prices.txt",
        "value": "Soap 25"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are combining the work from one branch into another. Think of it like adding a new item to the main store's price list."
      },
      {
        "level": 2,
        "text": "Run: `git merge update-prices`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git merge update-prices"
    },
    "conceptIds": [
      "git-merge"
    ],
    "estimatedMinutes": 4,
    "projectId": "merging-sari-sari"
  },
  {
    "id": "cli-merging-sari-sari-10",
    "index": 50,
    "task": "You will delete the update-prices branch. Its work is now in main, so it is no longer needed. You will use a command to delete the branch. After you run the command, check if the update-prices branch is deleted and if Soap 25 is still in main. This means the branch is gone but the change is safe.\n\nType this command in your terminal:\n`git branch -d update-prices`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n"
    },
    "tests": [
      {
        "id": "deleted",
        "label": "The update-prices branch is deleted",
        "kind": "local-git-branch-missing",
        "branch": "update-prices"
      },
      {
        "id": "kept",
        "label": "Soap 25 is still in main",
        "kind": "local-file-contains",
        "path": "prices.txt",
        "value": "Soap 25"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are removing a branch name. Think of it like closing a temporary work station after the task is done."
      },
      {
        "level": 2,
        "text": "Run: `git branch -d update-prices`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git branch -d update-prices"
    },
    "conceptIds": [
      "git-delete-branch"
    ],
    "estimatedMinutes": 3,
    "projectId": "merging-sari-sari"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: tidy-sari-sari.
cliGitCourse.steps.push(...([
  {
    "id": "cli-tidy-sari-sari-1",
    "index": 51,
    "task": "You turn this folder into a Git repository. Git tracks changes to files. You name the first branch main. This is the start of your project's history. Run this command: `git init -b main`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "repo",
        "label": "The folder is a Git repository",
        "kind": "local-git-repo"
      },
      {
        "id": "untracked",
        "label": "prices.txt is not tracked yet",
        "kind": "local-git-untracked",
        "path": "prices.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are starting a new project with Git. The branch name main is the default branch."
      },
      {
        "level": 2,
        "text": "Run `git init -b main` to start the repository."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git init -b main"
    },
    "estimatedMinutes": 3,
    "projectId": "tidy-sari-sari"
  },
  {
    "id": "cli-tidy-sari-sari-2",
    "index": 52,
    "task": "Git needs to know who is making the changes. You tell Git your name and email. This helps identify your work later. Run these two commands: `git config user.name \"Maria Santos\"` and `git config user.email \"maria@example.com\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "Commits will be signed by Maria Santos",
        "kind": "local-git-config",
        "key": "user.name",
        "value": "Maria Santos"
      },
      {
        "id": "email",
        "label": "The commit email is maria@example.com",
        "kind": "local-git-config",
        "key": "user.email",
        "value": "maria@example.com"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are setting your identity so Git can tag your commits with your name and email."
      },
      {
        "level": 2,
        "text": "Run `git config user.name \"Maria Santos\"` and `git config user.email \"maria@example.com\"`."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.name \"Maria Santos\"\ngit config user.email \"maria@example.com\""
    },
    "estimatedMinutes": 4,
    "projectId": "tidy-sari-sari"
  },
  {
    "id": "cli-tidy-sari-sari-3",
    "index": 53,
    "task": "You stage all files in the folder at once. Staging means Git will record these files in your next commit. You use a dot (.) to stage everything. Run this command: `git add .`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "file",
        "label": "prices.txt is staged",
        "kind": "local-git-staged",
        "path": "prices.txt"
      },
      {
        "id": "readme",
        "label": "README.txt is staged",
        "kind": "local-git-staged",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are telling Git to prepare all files for your first commit. The dot means all files."
      },
      {
        "level": 2,
        "text": "Run `git add .` to stage every file in the folder."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add ."
    },
    "estimatedMinutes": 2,
    "projectId": "tidy-sari-sari"
  },
  {
    "id": "cli-tidy-sari-sari-4",
    "index": 54,
    "task": "You save the staged files as your first commit. This commit records the files you staged. You give it a message that says what you did. Run this command: `git commit -m \"Start sari-sari store files\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has one commit",
        "kind": "local-git-commit-count",
        "count": 1
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are saving your work as a commit. The message explains what you did."
      },
      {
        "level": 2,
        "text": "Run `git commit -m \"Start sari-sari store files\"` to save your changes."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Start sari-sari store files\""
    },
    "estimatedMinutes": 3,
    "projectId": "tidy-sari-sari"
  },
  {
    "id": "cli-tidy-sari-sari-5",
    "index": 55,
    "task": "You rename the file prices.txt to price-list.txt. Git will record this rename. You use git mv to do this. Run this command: `git mv prices.txt price-list.txt`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "renamed",
        "label": "price-list.txt is staged",
        "kind": "local-git-staged",
        "path": "price-list.txt"
      },
      {
        "id": "old-gone",
        "label": "prices.txt no longer exists",
        "kind": "local-path-missing",
        "path": "prices.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are renaming a file and Git will record the change. Use git mv to rename a file."
      },
      {
        "level": 2,
        "text": "Run `git mv prices.txt price-list.txt` to rename the file."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git mv prices.txt price-list.txt"
    },
    "conceptIds": [
      "git-mv"
    ],
    "estimatedMinutes": 4,
    "projectId": "tidy-sari-sari"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: tidy-sari-sari.
cliGitCourse.steps.push(...([
  {
    "id": "cli-tidy-sari-sari-6",
    "index": 56,
    "task": "You are now ready to save the rename. Type the command exactly as shown. This saves your change so others can see it. After you run it, check the result with the checker. It will confirm the rename is saved and nothing else is left to save.\n\nType this command in your terminal:\n`git commit -m \"Rename prices.txt\"`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "in-commit",
        "label": "The last commit includes price-list.txt",
        "kind": "local-git-head-has-file",
        "path": "price-list.txt"
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are saving the rename so it becomes part of the project's history."
      },
      {
        "level": 2,
        "text": "`git commit -m \"Rename prices.txt\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Rename prices.txt\""
    },
    "estimatedMinutes": 3,
    "projectId": "tidy-sari-sari"
  },
  {
    "id": "cli-tidy-sari-sari-7",
    "index": 57,
    "task": "You will now delete the file draft.txt. Use the command shown. This removes the file from your project and prepares it for saving. After you run it, check the result. The checker will confirm the file is gone and the deletion is ready to be saved.\n\nType this command in your terminal:\n`git rm draft.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "gone",
        "label": "draft.txt is deleted",
        "kind": "local-path-missing",
        "path": "draft.txt"
      },
      {
        "id": "staged",
        "label": "The deletion is staged",
        "kind": "local-git-staged",
        "path": "draft.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "This command deletes the file and prepares it for the next commit."
      },
      {
        "level": 2,
        "text": "`git rm draft.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git rm draft.txt"
    },
    "conceptIds": [
      "git-rm"
    ],
    "estimatedMinutes": 4,
    "projectId": "tidy-sari-sari"
  },
  {
    "id": "cli-tidy-sari-sari-8",
    "index": 58,
    "task": "Now you save the deletion. Type the command exactly as shown. This adds the deletion to the project's history. After you run it, check the result. The checker will confirm the project now has three commits and nothing is left to save.\n\nType this command in your terminal:\n`git commit -m \"Remove old draft\"`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has three commits",
        "kind": "local-git-commit-count",
        "count": 3
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "This saves the deletion so others will see draft.txt is gone."
      },
      {
        "level": 2,
        "text": "`git commit -m \"Remove old draft\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Remove old draft\""
    },
    "estimatedMinutes": 3,
    "projectId": "tidy-sari-sari"
  },
  {
    "id": "cli-tidy-sari-sari-9",
    "index": 59,
    "task": "You will now create a .gitignore file. This file tells Git to ignore all files ending in .log. Type the command exactly as shown. This creates the file. After you run it, check the result. The checker will confirm the file is created and not yet saved to the project.\n\nType this command in your terminal:\n`echo \"*.log\" > .gitignore`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "rule",
        "label": ".gitignore lists *.log",
        "kind": "local-file-contains",
        "path": ".gitignore",
        "value": "*.log"
      },
      {
        "id": "new",
        "label": ".gitignore is a new, untracked file",
        "kind": "local-git-untracked",
        "path": ".gitignore"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "This file tells Git to ignore log files so they don't get saved."
      },
      {
        "level": 2,
        "text": "`echo \"*.log\" > .gitignore`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"*.log\" > .gitignore"
    },
    "conceptIds": [
      "git-ignore"
    ],
    "estimatedMinutes": 4,
    "projectId": "tidy-sari-sari"
  },
  {
    "id": "cli-tidy-sari-sari-10",
    "index": 60,
    "task": "Now you save the .gitignore file. Type the two commands exactly as shown. The first adds the file to what will be saved. The second saves it with a message. After you run it, check the result. The checker will confirm the file is saved and nothing is left to save.\n\nType these commands in your terminal:\n`git add .gitignore`\n`git commit -m \"Ignore log files\"`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Sari-Sari Store project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "prices.txt": "Rice 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "saved",
        "label": "The last commit includes .gitignore",
        "kind": "local-git-head-has-file",
        "path": ".gitignore"
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "First add the file, then commit it to save the ignore rule."
      },
      {
        "level": 2,
        "text": "`git add .gitignore` then `git commit -m \"Ignore log files\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add .gitignore\ngit commit -m \"Ignore log files\""
    },
    "estimatedMinutes": 5,
    "projectId": "tidy-sari-sari"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: files-barangay.
cliGitCourse.steps.push(...([
  {
    "id": "cli-files-barangay-1",
    "index": 61,
    "task": "You make a folder named requests. This folder will hold all the files for requests. You type the command exactly as shown. Then you run the checker to confirm the folder exists.\n\nType this command in your terminal:\n`mkdir requests`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "folder",
        "label": "The requests folder exists",
        "kind": "local-dir-exists",
        "path": "requests"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of a folder as a box to hold your files. You name it requests to match the project."
      },
      {
        "level": 2,
        "text": "Type `mkdir requests` exactly as written."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "mkdir requests"
    },
    "estimatedMinutes": 3,
    "projectId": "files-barangay"
  },
  {
    "id": "cli-files-barangay-2",
    "index": 62,
    "task": "You make a file named fees.txt inside the requests folder. This file will hold fee information. You type the command exactly as shown. Then you run the checker to confirm the file exists.\n\nType this command in your terminal:\n`touch requests/fees.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "file",
        "label": "requests/fees.txt exists",
        "kind": "local-file-exists",
        "path": "requests/fees.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You create a file like writing a note on paper. The path requests/fees.txt means the file is inside the requests folder."
      },
      {
        "level": 2,
        "text": "Type `touch requests/fees.txt` exactly as written."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "touch requests/fees.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "files-barangay"
  },
  {
    "id": "cli-files-barangay-3",
    "index": 63,
    "task": "You write the line Clearance 50 into the fees.txt file. This line is the first fee entry. You type the command exactly as shown. Then you run the checker to confirm the line appears.\n\nType this command in your terminal:\n`echo \"Clearance 50\" > requests/fees.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "line",
        "label": "fees.txt says Clearance 50",
        "kind": "local-file-contains",
        "path": "requests/fees.txt",
        "value": "Clearance 50"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You use echo to write text. The > symbol means 'write this line and start fresh.'"
      },
      {
        "level": 2,
        "text": "Type `echo \"Clearance 50\" > requests/fees.txt` exactly as written."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Clearance 50\" > requests/fees.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "files-barangay"
  },
  {
    "id": "cli-files-barangay-4",
    "index": 64,
    "task": "You add the line Permit 300 to fees.txt. This line is the second fee entry. You type the command exactly as shown. Then you run the checker to confirm both lines are there.\n\nType this command in your terminal:\n`echo \"Permit 300\" >> requests/fees.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "second",
        "label": "fees.txt now also says Permit 300",
        "kind": "local-file-contains",
        "path": "requests/fees.txt",
        "value": "Permit 300"
      },
      {
        "id": "first",
        "label": "Clearance 50 is still there",
        "kind": "local-file-contains",
        "path": "requests/fees.txt",
        "value": "Clearance 50"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The >> symbol means 'add this line after the first line, without deleting it.'"
      },
      {
        "level": 2,
        "text": "Type `echo \"Permit 300\" >> requests/fees.txt` exactly as written."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Permit 300\" >> requests/fees.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "files-barangay"
  },
  {
    "id": "cli-files-barangay-5",
    "index": 65,
    "task": "You copy fees.txt to a new file named backup.txt. This copy holds both lines for safety. You type the command exactly as shown. Then you run the checker to confirm the copy exists.\n\nType this command in your terminal:\n`cp requests/fees.txt requests/backup.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "copy",
        "label": "backup.txt holds a copy of both lines",
        "kind": "local-file-contains",
        "path": "requests/backup.txt",
        "value": "Permit 300"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You copy a file like making a photocopy. The cp command copies from one file to another."
      },
      {
        "level": 2,
        "text": "Type `cp requests/fees.txt requests/backup.txt` exactly as written."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "cp requests/fees.txt requests/backup.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "files-barangay"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: files-barangay.
cliGitCourse.steps.push(...([
  {
    "id": "cli-files-barangay-6",
    "index": 66,
    "task": "You will make a new folder called archive. This is like a storage box for old files. You type the command exactly as shown. Then you run the checker to see if the folder was made. This helps you keep your files organized.\n\nType this command in your terminal:\n`mkdir archive`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n"
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
        "text": "Think of a new box for old papers. You name it 'archive'."
      },
      {
        "level": 2,
        "text": "`mkdir archive`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "mkdir archive"
    },
    "estimatedMinutes": 3,
    "projectId": "files-barangay"
  },
  {
    "id": "cli-files-barangay-7",
    "index": 67,
    "task": "You will move the file backup.txt into the archive folder. This keeps your backup safe. You type the command exactly as shown. Then you run the checker to make sure the file moved and is no longer in the requests folder.\n\nType this command in your terminal:\n`mv requests/backup.txt archive/backup.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n"
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
        "label": "backup.txt is no longer in requests",
        "kind": "local-path-missing",
        "path": "requests/backup.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Take the backup file and put it inside the archive box."
      },
      {
        "level": 2,
        "text": "`mv requests/backup.txt archive/backup.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "mv requests/backup.txt archive/backup.txt"
    },
    "estimatedMinutes": 4,
    "projectId": "files-barangay"
  },
  {
    "id": "cli-files-barangay-8",
    "index": 68,
    "task": "You will add ID 20 to the working file only. This means the backup file stays unchanged. You type the command exactly as shown. Then you run the checker to see if ID 20 is now in fees.txt and not in the backup.\n\nType this command in your terminal:\n`echo \"ID 20\" >> requests/fees.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "third",
        "label": "fees.txt now says ID 20",
        "kind": "local-file-contains",
        "path": "requests/fees.txt",
        "value": "ID 20"
      },
      {
        "id": "backup-old",
        "label": "The backup does not have ID 20",
        "kind": "local-file-lacks",
        "path": "archive/backup.txt",
        "value": "ID 20"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ID 20 to the working file, not the backup. Use the echo command."
      },
      {
        "level": 2,
        "text": "`echo \"ID 20\" >> requests/fees.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"ID 20\" >> requests/fees.txt"
    },
    "estimatedMinutes": 4,
    "projectId": "files-barangay"
  },
  {
    "id": "cli-files-barangay-9",
    "index": 69,
    "task": "You will delete the old backup file. This frees up space and keeps things clean. You type the command exactly as shown. Then you run the checker to see if the old backup is gone.\n\nType this command in your terminal:\n`rm archive/backup.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n"
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
        "text": "Remove the backup file from the archive folder. Use the rm command."
      },
      {
        "level": 2,
        "text": "`rm archive/backup.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "rm archive/backup.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "files-barangay"
  },
  {
    "id": "cli-files-barangay-10",
    "index": 70,
    "task": "You will remove the empty archive folder. This cleans up your space. You type the command exactly as shown. Then you run the checker to see if the folder is gone and the requests folder is still there.\n\nType this command in your terminal:\n`rm -r archive`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n"
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
        "label": "The requests folder is still there",
        "kind": "local-dir-exists",
        "path": "requests"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Delete the whole archive folder. Use rm with the -r flag."
      },
      {
        "level": 2,
        "text": "`rm -r archive`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "rm -r archive"
    },
    "estimatedMinutes": 4,
    "projectId": "files-barangay"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: first-commit-barangay.
cliGitCourse.steps.push(...([
  {
    "id": "cli-first-commit-barangay-1",
    "index": 71,
    "task": "You turn this folder into a Git repository. Git lets you save changes to files. You name the first branch 'main'. This is the default branch for new projects. Run this command: `git init -b main`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "repo",
        "label": "The folder is a Git repository",
        "kind": "local-git-repo"
      },
      {
        "id": "untracked",
        "label": "fees.txt is not tracked yet",
        "kind": "local-git-untracked",
        "path": "fees.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You make this folder a Git project by telling Git to start tracking it. The branch 'main' is the main path for your work."
      },
      {
        "level": 2,
        "text": "Run `git init -b main`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git init -b main"
    },
    "estimatedMinutes": 3,
    "projectId": "first-commit-barangay"
  },
  {
    "id": "cli-first-commit-barangay-2",
    "index": 72,
    "task": "You tell Git who made the first commits. This is your name. You set it to 'Jose Reyes'. Git uses this to mark your work. Run this command: `git config user.name \"Jose Reyes\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "Commits will be signed by Jose Reyes",
        "kind": "local-git-config",
        "key": "user.name",
        "value": "Jose Reyes"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Git needs your name to know who wrote the changes. You give it 'Jose Reyes'."
      },
      {
        "level": 2,
        "text": "Run `git config user.name \"Jose Reyes\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.name \"Jose Reyes\""
    },
    "estimatedMinutes": 2,
    "projectId": "first-commit-barangay"
  },
  {
    "id": "cli-first-commit-barangay-3",
    "index": 73,
    "task": "You tell Git your email address. This is your contact. You set it to 'jose@example.com'. Git uses this to link your name to your work. Run this command: `git config user.email \"jose@example.com\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "email",
        "label": "The commit email is jose@example.com",
        "kind": "local-git-config",
        "key": "user.email",
        "value": "jose@example.com"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Git needs your email to connect your name to your changes. You give it 'jose@example.com'."
      },
      {
        "level": 2,
        "text": "Run `git config user.email \"jose@example.com\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.email \"jose@example.com\""
    },
    "estimatedMinutes": 2,
    "projectId": "first-commit-barangay"
  },
  {
    "id": "cli-first-commit-barangay-4",
    "index": 74,
    "task": "You tell Git to save only 'fees.txt'. This file will be part of your first commit. 'README.txt' stays out for now. Run this command: `git add fees.txt`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "staged",
        "label": "fees.txt is staged",
        "kind": "local-git-staged",
        "path": "fees.txt"
      },
      {
        "id": "readme-waits",
        "label": "README.txt is still untracked",
        "kind": "local-git-untracked",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You mark 'fees.txt' to be saved. Git will include it in your next save. 'README.txt' is not marked yet."
      },
      {
        "level": 2,
        "text": "Run `git add fees.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add fees.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "first-commit-barangay"
  },
  {
    "id": "cli-first-commit-barangay-5",
    "index": 75,
    "task": "You tell Git to save 'README.txt' too. Now both files are ready to be saved. Run this command: `git add README.txt`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "readme",
        "label": "README.txt is staged",
        "kind": "local-git-staged",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You mark 'README.txt' to be saved. Now both files are ready. Git will save them together."
      },
      {
        "level": 2,
        "text": "Run `git add README.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add README.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "first-commit-barangay"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: first-commit-barangay.
cliGitCourse.steps.push(...([
  {
    "id": "cli-first-commit-barangay-6",
    "index": 76,
    "task": "You save both files as the first commit. This is the first time you save changes in this project. It marks the start of your work. Run the checker to see if your save was successful. Paste its report.\n\nType this command in your terminal:\n`git commit -m \"Start barangay office list\"`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has one commit",
        "kind": "local-git-commit-count",
        "count": 1
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are saving your first work. Think of it like signing a document."
      },
      {
        "level": 2,
        "text": "git commit -m \"Start barangay office list\""
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Start barangay office list\""
    },
    "estimatedMinutes": 3,
    "projectId": "first-commit-barangay"
  },
  {
    "id": "cli-first-commit-barangay-7",
    "index": 77,
    "task": "You add the text 'Permit 300' to fees.txt. This is a new line. Git notices this change. It is not saved yet. Run the checker to confirm Git sees this new change. Paste its report.\n\nType this command in your terminal:\n`echo \"Permit 300\" >> fees.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "changed",
        "label": "fees.txt has an unstaged change",
        "kind": "local-git-unstaged",
        "path": "fees.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are adding a new line to the file. Git will notice it if you don't save it."
      },
      {
        "level": 2,
        "text": "echo \"Permit 300\" >> fees.txt"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Permit 300\" >> fees.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "first-commit-barangay"
  },
  {
    "id": "cli-first-commit-barangay-8",
    "index": 78,
    "task": "You prepare the change in fees.txt to be saved. This is called staging. Git will save it next. Run the checker to confirm the change is ready to be saved. Paste its report.\n\nType this command in your terminal:\n`git add fees.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "staged",
        "label": "The change to fees.txt is staged",
        "kind": "local-git-staged",
        "path": "fees.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are telling Git to save this new line. It is now ready to be saved."
      },
      {
        "level": 2,
        "text": "git add fees.txt"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add fees.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "first-commit-barangay"
  },
  {
    "id": "cli-first-commit-barangay-9",
    "index": 79,
    "task": "You save the change in fees.txt with a message. The message says 'Add permit lne'. This is a mistake on purpose. Run the checker to confirm you have two commits now. Paste its report.\n\nType this command in your terminal:\n`git commit -m \"Add permit lne\"`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has two commits",
        "kind": "local-git-commit-count",
        "count": 2
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are saving the new line with a message. The message has a typo."
      },
      {
        "level": 2,
        "text": "git commit -m \"Add permit lne\""
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Add permit lne\""
    },
    "estimatedMinutes": 3,
    "projectId": "first-commit-barangay"
  },
  {
    "id": "cli-first-commit-barangay-10",
    "index": 80,
    "task": "You fix the mistake in the last message. You use --amend to change it. The new message says 'Add permit line'. Run the checker to confirm the message is correct and you still have two commits. Paste its report.\n\nType this command in your terminal:\n`git commit --amend -m \"Add permit line\"`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "message",
        "label": "The last commit message is spelled correctly",
        "kind": "local-git-head-message",
        "value": "Add permit line"
      },
      {
        "id": "still-two",
        "label": "There are still two commits, not three",
        "kind": "local-git-commit-count",
        "count": 2
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are correcting the last message. Git will update it without adding a new commit."
      },
      {
        "level": 2,
        "text": "git commit --amend -m \"Add permit line\""
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit --amend -m \"Add permit line\""
    },
    "estimatedMinutes": 4,
    "projectId": "first-commit-barangay"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: undo-barangay.
cliGitCourse.steps.push(...([
  {
    "id": "cli-undo-barangay-1",
    "index": 81,
    "task": "You turn this folder into a Git repository. Git tracks changes to files. You name the first branch main. This is the start of your project's history. Run this command: `git init -b main`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\nPermit 300\n"
    },
    "tests": [
      {
        "id": "repo",
        "label": "The folder is a Git repository",
        "kind": "local-git-repo"
      },
      {
        "id": "untracked",
        "label": "fees.txt is not tracked yet",
        "kind": "local-git-untracked",
        "path": "fees.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are starting a new Git project. The branch name is main. This is the default branch."
      },
      {
        "level": 2,
        "text": "Run `git init -b main` to start the repository."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git init -b main"
    },
    "estimatedMinutes": 3,
    "projectId": "undo-barangay"
  },
  {
    "id": "cli-undo-barangay-2",
    "index": 82,
    "task": "You tell Git who you are. This helps identify your changes. You set your name to Jose Reyes and your email to jose@example.com. Run these commands: `git config user.name \"Jose Reyes\"` and `git config user.email \"jose@example.com\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\nPermit 300\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "Commits will be signed by Jose Reyes",
        "kind": "local-git-config",
        "key": "user.name",
        "value": "Jose Reyes"
      },
      {
        "id": "email",
        "label": "The commit email is jose@example.com",
        "kind": "local-git-config",
        "key": "user.email",
        "value": "jose@example.com"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Git needs your name and email to mark your work. This is like signing your work."
      },
      {
        "level": 2,
        "text": "Run `git config user.name \"Jose Reyes\"` and `git config user.email \"jose@example.com\"`."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.name \"Jose Reyes\"\ngit config user.email \"jose@example.com\""
    },
    "estimatedMinutes": 4,
    "projectId": "undo-barangay"
  },
  {
    "id": "cli-undo-barangay-3",
    "index": 83,
    "task": "You prepare all files to be saved in Git. You use the dot (.) to include every file. This is called staging. Run this command: `git add .`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\nPermit 300\n"
    },
    "tests": [
      {
        "id": "file",
        "label": "fees.txt is staged",
        "kind": "local-git-staged",
        "path": "fees.txt"
      },
      {
        "id": "readme",
        "label": "README.txt is staged",
        "kind": "local-git-staged",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are telling Git to save all files. The dot means all files in the folder."
      },
      {
        "level": 2,
        "text": "Run `git add .` to stage all files."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add ."
    },
    "estimatedMinutes": 2,
    "projectId": "undo-barangay"
  },
  {
    "id": "cli-undo-barangay-4",
    "index": 84,
    "task": "You save the staged files as your first commit. This is your first saved version. You write a message: Start barangay office list. Run this command: `git commit -m \"Start barangay office list\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\nPermit 300\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has one commit",
        "kind": "local-git-commit-count",
        "count": 1
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are saving your work. The message explains what you did."
      },
      {
        "level": 2,
        "text": "Run `git commit -m \"Start barangay office list\"` to save."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Start barangay office list\""
    },
    "estimatedMinutes": 3,
    "projectId": "undo-barangay"
  },
  {
    "id": "cli-undo-barangay-5",
    "index": 85,
    "task": "You add a wrong line to fees.txt. This is a mistake. You use echo to add the line. Run this command: `echo \"Wrong line\" >> fees.txt`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\nPermit 300\n"
    },
    "tests": [
      {
        "id": "mistake",
        "label": "fees.txt has the mistaken line",
        "kind": "local-file-contains",
        "path": "fees.txt",
        "value": "Wrong line"
      },
      {
        "id": "unstaged",
        "label": "Git sees an unstaged change",
        "kind": "local-git-unstaged",
        "path": "fees.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are adding a line to the file. The >> means add to the end."
      },
      {
        "level": 2,
        "text": "Run `echo \"Wrong line\" >> fees.txt` to add the mistake."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Wrong line\" >> fees.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "undo-barangay"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: undo-barangay.
cliGitCourse.steps.push(...([
  {
    "id": "cli-undo-barangay-6",
    "index": 86,
    "task": "You made a mistake in the fees.txt file. You want to throw away that mistake. This keeps your work clean. Run this command exactly as shown. Then run the checker and paste its report.\n\nType this command in your terminal:\n`git restore fees.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\nPermit 300\n"
    },
    "tests": [
      {
        "id": "fixed",
        "label": "The mistaken line is gone",
        "kind": "local-file-lacks",
        "path": "fees.txt",
        "value": "Wrong line"
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of this like erasing a wrong line you wrote on paper. You don't keep the mistake."
      },
      {
        "level": 2,
        "text": "Run `git restore fees.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git restore fees.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "undo-barangay"
  },
  {
    "id": "cli-undo-barangay-7",
    "index": 87,
    "task": "You want to add a new line with ID 20. This is a real change you want to keep. Run this command exactly as shown. Then run the checker and paste its report.\n\nType this command in your terminal:\n`echo \"ID 20\" >> fees.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\nPermit 300\n"
    },
    "tests": [
      {
        "id": "unstaged",
        "label": "fees.txt has an unstaged change",
        "kind": "local-git-unstaged",
        "path": "fees.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are adding a line to the file. It's not yet saved in Git. You'll stage it next."
      },
      {
        "level": 2,
        "text": "Run `echo \"ID 20\" >> fees.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"ID 20\" >> fees.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "undo-barangay"
  },
  {
    "id": "cli-undo-barangay-8",
    "index": 88,
    "task": "You want to tell Git you are ready to save this new line. This is called staging. Run this command exactly as shown. Then run the checker and paste its report.\n\nType this command in your terminal:\n`git add fees.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\nPermit 300\n"
    },
    "tests": [
      {
        "id": "staged",
        "label": "fees.txt is staged",
        "kind": "local-git-staged",
        "path": "fees.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are preparing the file to be saved. Git will remember this change soon."
      },
      {
        "level": 2,
        "text": "Run `git add fees.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add fees.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "undo-barangay"
  },
  {
    "id": "cli-undo-barangay-9",
    "index": 89,
    "task": "You want to take back the staging without losing the new line you typed. This is useful if you change your mind. Run this command exactly as shown. Then run the checker and paste its report.\n\nType this command in your terminal:\n`git restore --staged fees.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\nPermit 300\n"
    },
    "tests": [
      {
        "id": "unstaged",
        "label": "fees.txt is back to unstaged",
        "kind": "local-git-unstaged",
        "path": "fees.txt"
      },
      {
        "id": "kept",
        "label": "ID 20 is still in the file",
        "kind": "local-file-contains",
        "path": "fees.txt",
        "value": "ID 20"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are removing the 'ready to save' mark, but the line stays in the file. You can stage it again later."
      },
      {
        "level": 2,
        "text": "Run `git restore --staged fees.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git restore --staged fees.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "undo-barangay"
  },
  {
    "id": "cli-undo-barangay-10",
    "index": 90,
    "task": "You decide not to keep the new line. You want to go back to the last saved version. Run this command exactly as shown. Then run the checker and paste its report.\n\nType this command in your terminal:\n`git restore fees.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\nPermit 300\n"
    },
    "tests": [
      {
        "id": "dropped",
        "label": "ID 20 is gone again",
        "kind": "local-file-lacks",
        "path": "fees.txt",
        "value": "ID 20"
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are undoing the change and returning to what was saved. The new line disappears."
      },
      {
        "level": 2,
        "text": "Run `git restore fees.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git restore fees.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "undo-barangay"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: branches-barangay.
cliGitCourse.steps.push(...([
  {
    "id": "cli-branches-barangay-1",
    "index": 91,
    "task": "You turn this folder into a Git repository. This lets you save your work safely. You name the first branch 'main'. This is the default branch for your project. Run this command exactly: `git init -b main`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "repo",
        "label": "The folder is a Git repository",
        "kind": "local-git-repo"
      },
      {
        "id": "untracked",
        "label": "fees.txt is not tracked yet",
        "kind": "local-git-untracked",
        "path": "fees.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are starting a new Git project. The '-b main' part sets the first branch name."
      },
      {
        "level": 2,
        "text": "Run: `git init -b main`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git init -b main"
    },
    "estimatedMinutes": 3,
    "projectId": "branches-barangay"
  },
  {
    "id": "cli-branches-barangay-2",
    "index": 92,
    "task": "You tell Git who you are. This helps identify your work later. You set your name and email. Run these commands one at a time: `git config user.name \"Jose Reyes\"` and `git config user.email \"jose@example.com\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "Commits will be signed by Jose Reyes",
        "kind": "local-git-config",
        "key": "user.name",
        "value": "Jose Reyes"
      },
      {
        "id": "email",
        "label": "The commit email is jose@example.com",
        "kind": "local-git-config",
        "key": "user.email",
        "value": "jose@example.com"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Git needs your name and email to mark your changes. Use the exact quotes."
      },
      {
        "level": 2,
        "text": "Run: `git config user.name \"Jose Reyes\"` and `git config user.email \"jose@example.com\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.name \"Jose Reyes\"\ngit config user.email \"jose@example.com\""
    },
    "estimatedMinutes": 4,
    "projectId": "branches-barangay"
  },
  {
    "id": "cli-branches-barangay-3",
    "index": 93,
    "task": "You prepare all files for saving. This is called staging. You use a dot (.) to include every file. Run this command: `git add .`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "file",
        "label": "fees.txt is staged",
        "kind": "local-git-staged",
        "path": "fees.txt"
      },
      {
        "id": "readme",
        "label": "README.txt is staged",
        "kind": "local-git-staged",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Staging means you are ready to save all files together. The dot means 'all files'."
      },
      {
        "level": 2,
        "text": "Run: `git add .`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add ."
    },
    "estimatedMinutes": 2,
    "projectId": "branches-barangay"
  },
  {
    "id": "cli-branches-barangay-4",
    "index": 94,
    "task": "You save your prepared files as the first commit. This is your first record of work. You use a message to describe what you did. Run this command: `git commit -m \"Start barangay office list\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has one commit",
        "kind": "local-git-commit-count",
        "count": 1
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Commit means you save your changes permanently. The message explains what you did."
      },
      {
        "level": 2,
        "text": "Run: `git commit -m \"Start barangay office list\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Start barangay office list\""
    },
    "estimatedMinutes": 3,
    "projectId": "branches-barangay"
  },
  {
    "id": "cli-branches-barangay-5",
    "index": 95,
    "task": "You make a new branch named 'new-fees'. This branch is separate from 'main'. You stay on 'main' after making it. Run this command: `git branch new-fees`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "exists",
        "label": "The new-fees branch exists",
        "kind": "local-git-branch-exists",
        "branch": "new-fees"
      },
      {
        "id": "still-main",
        "label": "You are still on main",
        "kind": "local-git-branch",
        "value": "main"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Branches are like separate paths for your work. 'new-fees' is a new path. You stay on 'main' after creating it."
      },
      {
        "level": 2,
        "text": "Run: `git branch new-fees`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git branch new-fees"
    },
    "estimatedMinutes": 2,
    "projectId": "branches-barangay"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: branches-barangay.
cliGitCourse.steps.push(...([
  {
    "id": "cli-branches-barangay-6",
    "index": 96,
    "task": "You are now in the barangay office's computer. You will move to a branch called new-fees. This branch is for updating the fees list. Run this command exactly as shown: `git switch new-fees`. Then run the checker to confirm you are on the new-fees branch.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "on-branch",
        "label": "You are on new-fees",
        "kind": "local-git-branch",
        "value": "new-fees"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are switching to a branch that holds changes for new fees. Think of it like picking a folder to work in."
      },
      {
        "level": 2,
        "text": "Run `git switch new-fees` to move there."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git switch new-fees"
    },
    "estimatedMinutes": 3,
    "projectId": "branches-barangay"
  },
  {
    "id": "cli-branches-barangay-7",
    "index": 97,
    "task": "You are now on the new-fees branch. You will add a new permit to the fees file. This is like writing a new entry in the barangay's fee log. Run this command exactly as shown: `echo \"Permit 300\" >> fees.txt`. Then run the checker to confirm the file has an unstaged change.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "unstaged",
        "label": "fees.txt has an unstaged change",
        "kind": "local-git-unstaged",
        "path": "fees.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are adding text to the fees file without saving it yet. Think of it like writing a note on paper but not putting it in a box."
      },
      {
        "level": 2,
        "text": "Run `echo \"Permit 300\" >> fees.txt` to add the permit."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Permit 300\" >> fees.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "branches-barangay"
  },
  {
    "id": "cli-branches-barangay-8",
    "index": 98,
    "task": "You are still on the new-fees branch. You will save the new permit in the file. This is like putting the note in a box and labeling it. Run this command exactly as shown: `git commit -am \"Add Permit 300\"`. Then run the checker to confirm the branch now has two commits and the last one says Add Permit 300.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "This branch has two commits",
        "kind": "local-git-commit-count",
        "count": 2
      },
      {
        "id": "message",
        "label": "The last commit says Add Permit 300",
        "kind": "local-git-head-message",
        "value": "Add Permit 300"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are saving your change with a message. Think of it like writing a note and putting it in a box with a label."
      },
      {
        "level": 2,
        "text": "Run `git commit -am \"Add Permit 300\"` to save the change."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -am \"Add Permit 300\""
    },
    "estimatedMinutes": 4,
    "projectId": "branches-barangay"
  },
  {
    "id": "cli-branches-barangay-9",
    "index": 99,
    "task": "You will now go back to the main branch. This is the main folder for the barangay's official records. Run this command exactly as shown: `git switch main`. Then run the checker to confirm you are back on main and that the Permit 300 is not there.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "main",
        "label": "You are back on main",
        "kind": "local-git-branch",
        "value": "main"
      },
      {
        "id": "not-here",
        "label": "main does not have Permit 300",
        "kind": "local-file-lacks",
        "path": "fees.txt",
        "value": "Permit 300"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are returning to the main folder. Think of it like going back to the main room after working in a side room."
      },
      {
        "level": 2,
        "text": "Run `git switch main` to return to the main branch."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git switch main"
    },
    "estimatedMinutes": 3,
    "projectId": "branches-barangay"
  },
  {
    "id": "cli-branches-barangay-10",
    "index": 100,
    "task": "You will now create a new branch called holiday-hours and move onto it. This branch is for planning holiday office hours. Run this command exactly as shown: `git switch -c holiday-hours`. Then run the checker to confirm the holiday-hours branch exists and you are on it.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "created",
        "label": "The holiday-hours branch exists",
        "kind": "local-git-branch-exists",
        "branch": "holiday-hours"
      },
      {
        "id": "on-it",
        "label": "You are on holiday-hours",
        "kind": "local-git-branch",
        "value": "holiday-hours"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are making a new folder and moving into it at the same time. Think of it like creating a new room and walking into it."
      },
      {
        "level": 2,
        "text": "Run `git switch -c holiday-hours` to create and move to the new branch."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git switch -c holiday-hours"
    },
    "estimatedMinutes": 4,
    "projectId": "branches-barangay"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: merging-barangay.
cliGitCourse.steps.push(...([
  {
    "id": "cli-merging-barangay-1",
    "index": 101,
    "task": "You turn this folder into a Git project. Git will track all your files. The first branch will be named main. This is the start of your work. Run this command exactly as shown. Then run the checker and paste its report.\n\nType this command in your terminal:\n`git init -b main`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "repo",
        "label": "The folder is a Git repository",
        "kind": "local-git-repo"
      },
      {
        "id": "untracked",
        "label": "fees.txt is not tracked yet",
        "kind": "local-git-untracked",
        "path": "fees.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are starting a Git project. The branch name is main. This is the first step."
      },
      {
        "level": 2,
        "text": "git init -b main"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git init -b main"
    },
    "estimatedMinutes": 3,
    "projectId": "merging-barangay"
  },
  {
    "id": "cli-merging-barangay-2",
    "index": 102,
    "task": "Git needs to know who you are. This helps identify your work. You set your name and email. Run these two commands one after the other. Then run the checker and paste its report.\n\nType these commands in your terminal:\n`git config user.name \"Jose Reyes\"`\n`git config user.email \"jose@example.com\"`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "Commits will be signed by Jose Reyes",
        "kind": "local-git-config",
        "key": "user.name",
        "value": "Jose Reyes"
      },
      {
        "id": "email",
        "label": "The commit email is jose@example.com",
        "kind": "local-git-config",
        "key": "user.email",
        "value": "jose@example.com"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You tell Git your name and email. This is like signing your work. Do not change the email."
      },
      {
        "level": 2,
        "text": "git config user.name \"Jose Reyes\"\ngit config user.email \"jose@example.com\""
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.name \"Jose Reyes\"\ngit config user.email \"jose@example.com\""
    },
    "estimatedMinutes": 3,
    "projectId": "merging-barangay"
  },
  {
    "id": "cli-merging-barangay-3",
    "index": 103,
    "task": "You prepare all files for saving. Git will track them together. You use a dot to mean all files. Run this command exactly as shown. Then run the checker and paste its report.\n\nType this command in your terminal:\n`git add .`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "file",
        "label": "fees.txt is staged",
        "kind": "local-git-staged",
        "path": "fees.txt"
      },
      {
        "id": "readme",
        "label": "README.txt is staged",
        "kind": "local-git-staged",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You stage all files at once. The dot means all files. This is like packing everything for saving."
      },
      {
        "level": 2,
        "text": "git add .\n\nNote: The dot is not a typo. It means all files."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add ."
    },
    "estimatedMinutes": 2,
    "projectId": "merging-barangay"
  },
  {
    "id": "cli-merging-barangay-4",
    "index": 104,
    "task": "You save the files you prepared. This is your first commit. The message says what you did. Run this command exactly as shown. Then run the checker and paste its report.\n\nType this command in your terminal:\n`git commit -m \"Start barangay office list\"`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has one commit",
        "kind": "local-git-commit-count",
        "count": 1
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You save your files with a message. The message explains what you did. This is your first save."
      },
      {
        "level": 2,
        "text": "git commit -m \"Start barangay office list\""
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Start barangay office list\""
    },
    "estimatedMinutes": 3,
    "projectId": "merging-barangay"
  },
  {
    "id": "cli-merging-barangay-5",
    "index": 105,
    "task": "You create a new branch named new-fees. You move onto it. This branch will hold your new work. Run this command exactly as shown. Then run the checker and paste its report.\n\nType this command in your terminal:\n`git switch -c new-fees`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "on-branch",
        "label": "You are on new-fees",
        "kind": "local-git-branch",
        "value": "new-fees"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You make a new branch called new-fees. You switch to it. This is where you will work on new fees."
      },
      {
        "level": 2,
        "text": "git switch -c new-fees"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git switch -c new-fees"
    },
    "estimatedMinutes": 2,
    "projectId": "merging-barangay"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: merging-barangay.
cliGitCourse.steps.push(...([
  {
    "id": "cli-merging-barangay-6",
    "index": 106,
    "task": "You are on the new-fees branch. Add the text 'Permit 300' to the fees.txt file. This makes the change ready to save. Run the command exactly as shown. Then check if the file has an unstaged change. That means the change is made but not yet saved.\n\nType this command in your terminal:\n`echo \"Permit 300\" >> fees.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "unstaged",
        "label": "fees.txt has an unstaged change",
        "kind": "local-git-unstaged",
        "path": "fees.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the text to the file using the command given. Then check if the file has an unstaged change."
      },
      {
        "level": 2,
        "text": "Run `echo \"Permit 300\" >> fees.txt` to add the text."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Permit 300\" >> fees.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "merging-barangay"
  },
  {
    "id": "cli-merging-barangay-7",
    "index": 107,
    "task": "Save the change you made to fees.txt. This saves the new permit fee in your branch. Run the command exactly as shown. Then check if your branch has two commits and nothing is left uncommitted.\n\nType this command in your terminal:\n`git commit -am \"Add Permit 300\"`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The branch has two commits",
        "kind": "local-git-commit-count",
        "count": 2
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Save the change by running the command. Then check if your branch has two commits and nothing is left uncommitted."
      },
      {
        "level": 2,
        "text": "Run `git commit -am \"Add Permit 300\"` to save the change."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -am \"Add Permit 300\""
    },
    "estimatedMinutes": 3,
    "projectId": "merging-barangay"
  },
  {
    "id": "cli-merging-barangay-8",
    "index": 108,
    "task": "Switch to the main branch. This branch does not yet have the new permit fee. Run the command exactly as shown. Then check if you are on main and if main still does not have Permit 300.\n\nType this command in your terminal:\n`git switch main`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "main",
        "label": "You are on main",
        "kind": "local-git-branch",
        "value": "main"
      },
      {
        "id": "not-yet",
        "label": "main does not have Permit 300 yet",
        "kind": "local-file-lacks",
        "path": "fees.txt",
        "value": "Permit 300"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Switch to main by running the command. Then check if you are on main and if main still does not have Permit 300."
      },
      {
        "level": 2,
        "text": "Run `git switch main` to switch branches."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git switch main"
    },
    "estimatedMinutes": 2,
    "projectId": "merging-barangay"
  },
  {
    "id": "cli-merging-barangay-9",
    "index": 109,
    "task": "Bring the new-fees branch into main. This adds the permit fee to main. Run the command exactly as shown. Then check if new-fees is merged into main and if main now has Permit 300.\n\nType this command in your terminal:\n`git merge new-fees`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "merged",
        "label": "new-fees is merged into main",
        "kind": "local-git-merged",
        "branch": "new-fees"
      },
      {
        "id": "arrived",
        "label": "main now has Permit 300",
        "kind": "local-file-contains",
        "path": "fees.txt",
        "value": "Permit 300"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Merge the branch by running the command. Then check if new-fees is merged into main and if main now has Permit 300."
      },
      {
        "level": 2,
        "text": "Run `git merge new-fees` to bring the changes into main."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git merge new-fees"
    },
    "estimatedMinutes": 4,
    "projectId": "merging-barangay"
  },
  {
    "id": "cli-merging-barangay-10",
    "index": 110,
    "task": "Delete the new-fees branch. Its commits are already saved in main. Run the command exactly as shown. Then check if the branch is deleted and if Permit 300 is still in main.\n\nType this command in your terminal:\n`git branch -d new-fees`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n"
    },
    "tests": [
      {
        "id": "deleted",
        "label": "The new-fees branch is deleted",
        "kind": "local-git-branch-missing",
        "branch": "new-fees"
      },
      {
        "id": "kept",
        "label": "Permit 300 is still in main",
        "kind": "local-file-contains",
        "path": "fees.txt",
        "value": "Permit 300"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Delete the branch by running the command. Then check if the branch is deleted and if Permit 300 is still in main."
      },
      {
        "level": 2,
        "text": "Run `git branch -d new-fees` to delete the branch."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git branch -d new-fees"
    },
    "estimatedMinutes": 3,
    "projectId": "merging-barangay"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: tidy-barangay.
cliGitCourse.steps.push(...([
  {
    "id": "cli-tidy-barangay-1",
    "index": 111,
    "task": "You turn this folder into a Git repository. Git helps you track changes to files. You use the command `git init -b main` to start. This makes a branch named main. The checker will confirm the folder is now a Git repo and that fees.txt is not tracked yet.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "repo",
        "label": "The folder is a Git repository",
        "kind": "local-git-repo"
      },
      {
        "id": "untracked",
        "label": "fees.txt is not tracked yet",
        "kind": "local-git-untracked",
        "path": "fees.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of Git as a digital notebook for your files. Use the command to start writing in it."
      },
      {
        "level": 2,
        "text": "Run `git init -b main` exactly as shown."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git init -b main"
    },
    "estimatedMinutes": 3,
    "projectId": "tidy-barangay"
  },
  {
    "id": "cli-tidy-barangay-2",
    "index": 112,
    "task": "You tell Git who you are. This helps identify your changes. You use `git config user.name \"Jose Reyes\"` to set your name. Then use `git config user.email \"jose@example.com\"` to set your email. The checker will confirm your name and email are set.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "Commits will be signed by Jose Reyes",
        "kind": "local-git-config",
        "key": "user.name",
        "value": "Jose Reyes"
      },
      {
        "id": "email",
        "label": "The commit email is jose@example.com",
        "kind": "local-git-config",
        "key": "user.email",
        "value": "jose@example.com"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Git needs to know who made the changes. Think of it like signing a document."
      },
      {
        "level": 2,
        "text": "Run `git config user.name \"Jose Reyes\"` and then `git config user.email \"jose@example.com\"`."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.name \"Jose Reyes\"\ngit config user.email \"jose@example.com\""
    },
    "estimatedMinutes": 4,
    "projectId": "tidy-barangay"
  },
  {
    "id": "cli-tidy-barangay-3",
    "index": 113,
    "task": "You prepare all files for saving. You use `git add .` to stage every file. This means Git will remember these files when you save them. The checker will confirm fees.txt and README.txt are now staged.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "file",
        "label": "fees.txt is staged",
        "kind": "local-git-staged",
        "path": "fees.txt"
      },
      {
        "id": "readme",
        "label": "README.txt is staged",
        "kind": "local-git-staged",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Staging means you're telling Git: 'I'm ready to save these files.'"
      },
      {
        "level": 2,
        "text": "Run `git add .` to stage all files at once."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add ."
    },
    "estimatedMinutes": 2,
    "projectId": "tidy-barangay"
  },
  {
    "id": "cli-tidy-barangay-4",
    "index": 114,
    "task": "You save the staged files as the first commit. You use `git commit -m \"Start barangay office files\"` to do this. This records your work. The checker will confirm there is now one commit and nothing is left uncommitted.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has one commit",
        "kind": "local-git-commit-count",
        "count": 1
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "A commit is like a snapshot of your work. Give it a message so you know what it is."
      },
      {
        "level": 2,
        "text": "Run `git commit -m \"Start barangay office files\"` to save your work."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Start barangay office files\""
    },
    "estimatedMinutes": 3,
    "projectId": "tidy-barangay"
  },
  {
    "id": "cli-tidy-barangay-5",
    "index": 115,
    "task": "You rename fees.txt to fee-list.txt. Git will record this change. You use `git mv fees.txt fee-list.txt` to rename. The checker will confirm fee-list.txt is staged and fees.txt no longer exists.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "renamed",
        "label": "fee-list.txt is staged",
        "kind": "local-git-staged",
        "path": "fee-list.txt"
      },
      {
        "id": "old-gone",
        "label": "fees.txt no longer exists",
        "kind": "local-path-missing",
        "path": "fees.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Renaming a file is like changing its name on a label. Git tracks this change."
      },
      {
        "level": 2,
        "text": "Run `git mv fees.txt fee-list.txt` to rename the file."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git mv fees.txt fee-list.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "tidy-barangay"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: tidy-barangay.
cliGitCourse.steps.push(...([
  {
    "id": "cli-tidy-barangay-6",
    "index": 116,
    "task": "You rename a file. This change is important because the barangay office now uses a new name for the fee list. Run this command to save the change to the project history: `git commit -m \"Rename fees.txt\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "in-commit",
        "label": "The last commit includes fee-list.txt",
        "kind": "local-git-head-has-file",
        "path": "fee-list.txt"
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You save the rename so others see the new file name in the project."
      },
      {
        "level": 2,
        "text": "`git commit -m \"Rename fees.txt\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Rename fees.txt\""
    },
    "estimatedMinutes": 3,
    "projectId": "tidy-barangay"
  },
  {
    "id": "cli-tidy-barangay-7",
    "index": 117,
    "task": "You delete a file called draft.txt. This removes old work from the project. Run this command to delete the file and prepare it for saving: `git rm draft.txt`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "gone",
        "label": "draft.txt is deleted",
        "kind": "local-path-missing",
        "path": "draft.txt"
      },
      {
        "id": "staged",
        "label": "The deletion is staged",
        "kind": "local-git-staged",
        "path": "draft.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You remove the file so it doesn't appear in the project anymore."
      },
      {
        "level": 2,
        "text": "`git rm draft.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git rm draft.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "tidy-barangay"
  },
  {
    "id": "cli-tidy-barangay-8",
    "index": 118,
    "task": "You save the deletion so it becomes part of the project's history. Run this command to save the change: `git commit -m \"Remove old draft\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has three commits",
        "kind": "local-git-commit-count",
        "count": 3
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You save the deletion so the project remembers it was removed."
      },
      {
        "level": 2,
        "text": "`git commit -m \"Remove old draft\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Remove old draft\""
    },
    "estimatedMinutes": 3,
    "projectId": "tidy-barangay"
  },
  {
    "id": "cli-tidy-barangay-9",
    "index": 119,
    "task": "You make a new file called .gitignore. This file tells Git to ignore files ending in .log. Run this command to create it: `echo \"*.log\" > .gitignore`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "rule",
        "label": ".gitignore lists *.log",
        "kind": "local-file-contains",
        "path": ".gitignore",
        "value": "*.log"
      },
      {
        "id": "new",
        "label": ".gitignore is a new, untracked file",
        "kind": "local-git-untracked",
        "path": ".gitignore"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You create a rule so Git will not track any file with .log at the end."
      },
      {
        "level": 2,
        "text": "`echo \"*.log\" > .gitignore`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"*.log\" > .gitignore"
    },
    "estimatedMinutes": 4,
    "projectId": "tidy-barangay"
  },
  {
    "id": "cli-tidy-barangay-10",
    "index": 120,
    "task": "You save the .gitignore file so the rule becomes part of the project. Run these two commands: `git add .gitignore` and `git commit -m \"Ignore log files\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "Barangay Office project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "fees.txt": "Clearance 50\n",
      "draft.txt": "Old draft notes\n"
    },
    "tests": [
      {
        "id": "saved",
        "label": "The last commit includes .gitignore",
        "kind": "local-git-head-has-file",
        "path": ".gitignore"
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You save the rule so Git will ignore .log files in future changes."
      },
      {
        "level": 2,
        "text": "`git add .gitignore` and `git commit -m \"Ignore log files\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add .gitignore\ngit commit -m \"Ignore log files\""
    },
    "estimatedMinutes": 5,
    "projectId": "tidy-barangay"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: files-school-club.
cliGitCourse.steps.push(...([
  {
    "id": "cli-files-school-club-1",
    "index": 121,
    "task": "You make a folder named events. This folder will hold all your club's event files. Type the command exactly as shown. Then run the checker to confirm the folder is ready.\n\nType this command in your terminal:\n`mkdir events`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "folder",
        "label": "The events folder exists",
        "kind": "local-dir-exists",
        "path": "events"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of a folder like a box for your event papers. Make it first before adding anything inside."
      },
      {
        "level": 2,
        "text": "Type: `mkdir events`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "mkdir events"
    },
    "estimatedMinutes": 3,
    "projectId": "files-school-club"
  },
  {
    "id": "cli-files-school-club-2",
    "index": 122,
    "task": "You make an empty file called schedule.txt inside the events folder. This file will hold your club's practice times. Type the command exactly as shown. Then run the checker to confirm the file is ready.\n\nType this command in your terminal:\n`touch events/schedule.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "file",
        "label": "events/schedule.txt exists",
        "kind": "local-file-exists",
        "path": "events/schedule.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You're creating a blank paper for your schedule. Put it in the events box first."
      },
      {
        "level": 2,
        "text": "Type: `touch events/schedule.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "touch events/schedule.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "files-school-club"
  },
  {
    "id": "cli-files-school-club-3",
    "index": 123,
    "task": "You write the line Monday Practice into the schedule file. This tells your club when the first practice is. Type the command exactly as shown. Then run the checker to confirm the text is there.\n\nType this command in your terminal:\n`echo \"Monday Practice\" > events/schedule.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "line",
        "label": "schedule.txt says Monday Practice",
        "kind": "local-file-contains",
        "path": "events/schedule.txt",
        "value": "Monday Practice"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You're putting the first line on the paper. Use the > symbol to write over the empty file."
      },
      {
        "level": 2,
        "text": "Type: `echo \"Monday Practice\" > events/schedule.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Monday Practice\" > events/schedule.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "files-school-club"
  },
  {
    "id": "cli-files-school-club-4",
    "index": 124,
    "task": "You add Wednesday Meeting as the second line to the schedule file. This keeps the first line and adds a new one. Type the command exactly as shown. Then run the checker to confirm both lines are there.\n\nType this command in your terminal:\n`echo \"Wednesday Meeting\" >> events/schedule.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "second",
        "label": "schedule.txt now also says Wednesday Meeting",
        "kind": "local-file-contains",
        "path": "events/schedule.txt",
        "value": "Wednesday Meeting"
      },
      {
        "id": "first",
        "label": "Monday Practice is still there",
        "kind": "local-file-contains",
        "path": "events/schedule.txt",
        "value": "Monday Practice"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You're adding a new line without losing the old one. Use >> to add after the first line."
      },
      {
        "level": 2,
        "text": "Type: `echo \"Wednesday Meeting\" >> events/schedule.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Wednesday Meeting\" >> events/schedule.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "files-school-club"
  },
  {
    "id": "cli-files-school-club-5",
    "index": 125,
    "task": "You copy the schedule file to a new file called backup.txt. This keeps a copy of both lines for safety. Type the command exactly as shown. Then run the checker to confirm the backup file has both lines.\n\nType this command in your terminal:\n`cp events/schedule.txt events/backup.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "copy",
        "label": "backup.txt holds a copy of both lines",
        "kind": "local-file-contains",
        "path": "events/backup.txt",
        "value": "Wednesday Meeting"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You're making a copy of your schedule. Use cp to copy from one file to another in the same folder."
      },
      {
        "level": 2,
        "text": "Type: `cp events/schedule.txt events/backup.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "cp events/schedule.txt events/backup.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "files-school-club"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: files-school-club.
cliGitCourse.steps.push(...([
  {
    "id": "cli-files-school-club-6",
    "index": 126,
    "task": "You make a new folder called archive. This folder will hold old files. You type the command exactly as shown. Then you run the checker to see if it worked.\n\nType this command in your terminal:\n`mkdir archive`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n"
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
        "text": "Think of a new folder like a box for old things. You create it with mkdir."
      },
      {
        "level": 2,
        "text": "Type `mkdir archive` and press Enter."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "mkdir archive"
    },
    "estimatedMinutes": 3,
    "projectId": "files-school-club"
  },
  {
    "id": "cli-files-school-club-7",
    "index": 127,
    "task": "You move the file backup.txt into the archive folder. This keeps old files safe. You type the command exactly as shown. Then you run the checker to see if it worked.\n\nType this command in your terminal:\n`mv events/backup.txt archive/backup.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n"
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
        "label": "backup.txt is no longer in events",
        "kind": "local-path-missing",
        "path": "events/backup.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You take a file from one place and put it in another. Use mv to move it."
      },
      {
        "level": 2,
        "text": "Type `mv events/backup.txt archive/backup.txt` and press Enter."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "mv events/backup.txt archive/backup.txt"
    },
    "estimatedMinutes": 4,
    "projectId": "files-school-club"
  },
  {
    "id": "cli-files-school-club-8",
    "index": 128,
    "task": "You add a line to the schedule file. This updates the current plan. You type the command exactly as shown. Then you run the checker to see if it worked.\n\nType this command in your terminal:\n`echo \"Friday Cleanup\" >> events/schedule.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n"
    },
    "tests": [
      {
        "id": "third",
        "label": "schedule.txt now says Friday Cleanup",
        "kind": "local-file-contains",
        "path": "events/schedule.txt",
        "value": "Friday Cleanup"
      },
      {
        "id": "backup-old",
        "label": "The backup does not have Friday Cleanup",
        "kind": "local-file-lacks",
        "path": "archive/backup.txt",
        "value": "Friday Cleanup"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You add text to a file without changing the old version. Use >> to add."
      },
      {
        "level": 2,
        "text": "Type `echo \"Friday Cleanup\" >> events/schedule.txt` and press Enter."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Friday Cleanup\" >> events/schedule.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "files-school-club"
  },
  {
    "id": "cli-files-school-club-9",
    "index": 129,
    "task": "You delete the old backup file. This clears space. You type the command exactly as shown. Then you run the checker to see if it worked.\n\nType this command in your terminal:\n`rm archive/backup.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n"
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
        "text": "You remove a file with rm. You type the full path to the file."
      },
      {
        "level": 2,
        "text": "Type `rm archive/backup.txt` and press Enter."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "rm archive/backup.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "files-school-club"
  },
  {
    "id": "cli-files-school-club-10",
    "index": 130,
    "task": "You remove the empty archive folder. This cleans up space. You type the command exactly as shown. Then you run the checker to see if it worked.\n\nType this command in your terminal:\n`rm -r archive`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n"
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
        "label": "The events folder is still there",
        "kind": "local-dir-exists",
        "path": "events"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You delete a folder and all inside it with rm -r. Be careful with this."
      },
      {
        "level": 2,
        "text": "Type `rm -r archive` and press Enter."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "rm -r archive"
    },
    "estimatedMinutes": 3,
    "projectId": "files-school-club"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: first-commit-school-club.
cliGitCourse.steps.push(...([
  {
    "id": "cli-first-commit-school-club-1",
    "index": 131,
    "task": "You turn this folder into a Git repository. Git helps you save and share your work. You name the first branch 'main'. This is the default branch for your project. Run this command: `git init -b main`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "repo",
        "label": "The folder is a Git repository",
        "kind": "local-git-repo"
      },
      {
        "id": "untracked",
        "label": "schedule.txt is not tracked yet",
        "kind": "local-git-untracked",
        "path": "schedule.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are starting a new Git project. Think of it like setting up a new folder for your club's files."
      },
      {
        "level": 2,
        "text": "Run `git init -b main` to start the repository with the branch named 'main'."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git init -b main"
    },
    "estimatedMinutes": 3,
    "projectId": "first-commit-school-club"
  },
  {
    "id": "cli-first-commit-school-club-2",
    "index": 132,
    "task": "You tell Git who you are. This helps others know who made the changes. You set your name to Ana Cruz. Run this command: `git config user.name \"Ana Cruz\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "Commits will be signed by Ana Cruz",
        "kind": "local-git-config",
        "key": "user.name",
        "value": "Ana Cruz"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Git needs to know your name so your work can be credited. Think of it like signing your name on a school project."
      },
      {
        "level": 2,
        "text": "Run `git config user.name \"Ana Cruz\"` to set your name in Git."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.name \"Ana Cruz\""
    },
    "estimatedMinutes": 2,
    "projectId": "first-commit-school-club"
  },
  {
    "id": "cli-first-commit-school-club-3",
    "index": 133,
    "task": "You tell Git your email address. This helps others contact you if needed. You set it to ana@example.com. Run this command: `git config user.email \"ana@example.com\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "email",
        "label": "The commit email is ana@example.com",
        "kind": "local-git-config",
        "key": "user.email",
        "value": "ana@example.com"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Your email helps identify you in the Git history. Think of it like your contact for the club's work."
      },
      {
        "level": 2,
        "text": "Run `git config user.email \"ana@example.com\"` to set your email in Git."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.email \"ana@example.com\""
    },
    "estimatedMinutes": 2,
    "projectId": "first-commit-school-club"
  },
  {
    "id": "cli-first-commit-school-club-4",
    "index": 134,
    "task": "You prepare only schedule.txt for saving. This means Git will track changes to it. README.txt is not ready yet. Run this command: `git add schedule.txt`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "staged",
        "label": "schedule.txt is staged",
        "kind": "local-git-staged",
        "path": "schedule.txt"
      },
      {
        "id": "readme-waits",
        "label": "README.txt is still untracked",
        "kind": "local-git-untracked",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are telling Git to watch schedule.txt. Think of it like marking a file to save later."
      },
      {
        "level": 2,
        "text": "Run `git add schedule.txt` to stage only this file."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add schedule.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "first-commit-school-club"
  },
  {
    "id": "cli-first-commit-school-club-5",
    "index": 135,
    "task": "You now prepare README.txt too. This means Git will track changes to it. Both files are now ready to be saved. Run this command: `git add README.txt`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "readme",
        "label": "README.txt is staged",
        "kind": "local-git-staged",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are adding another file to be saved. Think of it like marking README.txt to save with schedule.txt."
      },
      {
        "level": 2,
        "text": "Run `git add README.txt` to stage this file too."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add README.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "first-commit-school-club"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: first-commit-school-club.
cliGitCourse.steps.push(...([
  {
    "id": "cli-first-commit-school-club-6",
    "index": 136,
    "task": "You save your work as the first commit. This marks the start of your project. Git remembers this moment. Run the checker to confirm your work is saved. Paste its report.\n\nType this command in your terminal:\n`git commit -m \"Start school club list\"`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has one commit",
        "kind": "local-git-commit-count",
        "count": 1
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of this like saving a photo of your work for the first time."
      },
      {
        "level": 2,
        "text": "Run `git commit -m \"Start school club list\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Start school club list\""
    },
    "estimatedMinutes": 3,
    "projectId": "first-commit-school-club"
  },
  {
    "id": "cli-first-commit-school-club-7",
    "index": 137,
    "task": "You add a new line to schedule.txt. Git notices this change. It is not saved yet. Run the checker to confirm Git sees the change. Paste its report.\n\nType this command in your terminal:\n`echo \"Wednesday Meeting\" >> schedule.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "changed",
        "label": "schedule.txt has an unstaged change",
        "kind": "local-git-unstaged",
        "path": "schedule.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are adding text to the file. Git watches for new changes."
      },
      {
        "level": 2,
        "text": "Run `echo \"Wednesday Meeting\" >> schedule.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Wednesday Meeting\" >> schedule.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "first-commit-school-club"
  },
  {
    "id": "cli-first-commit-school-club-8",
    "index": 138,
    "task": "You tell Git to save the change in schedule.txt. This prepares it for the next commit. Run the checker to confirm the change is ready. Paste its report.\n\nType this command in your terminal:\n`git add schedule.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "staged",
        "label": "The change to schedule.txt is staged",
        "kind": "local-git-staged",
        "path": "schedule.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are telling Git to hold the new text until you save it."
      },
      {
        "level": 2,
        "text": "Run `git add schedule.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add schedule.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "first-commit-school-club"
  },
  {
    "id": "cli-first-commit-school-club-9",
    "index": 139,
    "task": "You save the change with a message. The message has a mistake. Git saves it anyway. Run the checker to confirm two commits exist. Paste its report.\n\nType this command in your terminal:\n`git commit -m \"Add wednesday lne\"`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has two commits",
        "kind": "local-git-commit-count",
        "count": 2
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are saving the file with a message that is not perfect yet."
      },
      {
        "level": 2,
        "text": "Run `git commit -m \"Add wednesday lne\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Add wednesday lne\""
    },
    "estimatedMinutes": 3,
    "projectId": "first-commit-school-club"
  },
  {
    "id": "cli-first-commit-school-club-10",
    "index": 140,
    "task": "You fix the message in the last commit. You use --amend to change it. Git updates the message but keeps the same commit. Run the checker to confirm the message is fixed. Paste its report.\n\nType this command in your terminal:\n`git commit --amend -m \"Add wednesday line\"`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "message",
        "label": "The last commit message is spelled correctly",
        "kind": "local-git-head-message",
        "value": "Add wednesday line"
      },
      {
        "id": "still-two",
        "label": "There are still two commits, not three",
        "kind": "local-git-commit-count",
        "count": 2
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are correcting the message without making a new commit."
      },
      {
        "level": 2,
        "text": "Run `git commit --amend -m \"Add wednesday line\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit --amend -m \"Add wednesday line\""
    },
    "estimatedMinutes": 4,
    "projectId": "first-commit-school-club"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: undo-school-club.
cliGitCourse.steps.push(...([
  {
    "id": "cli-undo-school-club-1",
    "index": 141,
    "task": "You turn this folder into a Git project. Git will track your work. You name the first branch main. This is the start of your school club's record. Run this command: `git init -b main`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\nWednesday Meeting\n"
    },
    "tests": [
      {
        "id": "repo",
        "label": "The folder is a Git repository",
        "kind": "local-git-repo"
      },
      {
        "id": "untracked",
        "label": "schedule.txt is not tracked yet",
        "kind": "local-git-untracked",
        "path": "schedule.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are starting a Git project. The branch name is main. Git will remember your files."
      },
      {
        "level": 2,
        "text": "`git init -b main`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git init -b main"
    },
    "estimatedMinutes": 3,
    "projectId": "undo-school-club"
  },
  {
    "id": "cli-undo-school-club-2",
    "index": 142,
    "task": "You tell Git who you are. This helps others know who made the changes. You use the name Ana Cruz and the email ana@example.com. Run these two commands: `git config user.name \"Ana Cruz\"` and `git config user.email \"ana@example.com\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\nWednesday Meeting\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "Commits will be signed by Ana Cruz",
        "kind": "local-git-config",
        "key": "user.name",
        "value": "Ana Cruz"
      },
      {
        "id": "email",
        "label": "The commit email is ana@example.com",
        "kind": "local-git-config",
        "key": "user.email",
        "value": "ana@example.com"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are setting your name and email so Git can mark your work. This is like signing your paper."
      },
      {
        "level": 2,
        "text": "`git config user.name \"Ana Cruz\"` and `git config user.email \"ana@example.com\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.name \"Ana Cruz\"\ngit config user.email \"ana@example.com\""
    },
    "estimatedMinutes": 3,
    "projectId": "undo-school-club"
  },
  {
    "id": "cli-undo-school-club-3",
    "index": 143,
    "task": "You prepare all files to be saved. You use a dot (.) to mean all files. This is like putting all your homework in a box before handing it in. Run this command: `git add .`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\nWednesday Meeting\n"
    },
    "tests": [
      {
        "id": "file",
        "label": "schedule.txt is staged",
        "kind": "local-git-staged",
        "path": "schedule.txt"
      },
      {
        "id": "readme",
        "label": "README.txt is staged",
        "kind": "local-git-staged",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are telling Git to save all files. The dot means everything in the folder."
      },
      {
        "level": 2,
        "text": "`git add .` is the command to stage all files."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add ."
    },
    "estimatedMinutes": 2,
    "projectId": "undo-school-club"
  },
  {
    "id": "cli-undo-school-club-4",
    "index": 144,
    "task": "You save your prepared files as the first step. You write a message: Start school club list. This is your first record. Run this command: `git commit -m \"Start school club list\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\nWednesday Meeting\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has one commit",
        "kind": "local-git-commit-count",
        "count": 1
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are saving your work with a message. This is like writing a note on your homework."
      },
      {
        "level": 2,
        "text": "`git commit -m \"Start school club list\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Start school club list\""
    },
    "estimatedMinutes": 3,
    "projectId": "undo-school-club"
  },
  {
    "id": "cli-undo-school-club-5",
    "index": 145,
    "task": "You add a mistake to schedule.txt. You write: Wrong line. This is a test for undoing changes. Run this command: `echo \"Wrong line\" >> schedule.txt`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\nWednesday Meeting\n"
    },
    "tests": [
      {
        "id": "mistake",
        "label": "schedule.txt has the mistaken line",
        "kind": "local-file-contains",
        "path": "schedule.txt",
        "value": "Wrong line"
      },
      {
        "id": "unstaged",
        "label": "Git sees an unstaged change",
        "kind": "local-git-unstaged",
        "path": "schedule.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are adding a line to test undoing. The >> means you add to the end of the file."
      },
      {
        "level": 2,
        "text": "`echo \"Wrong line\" >> schedule.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Wrong line\" >> schedule.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "undo-school-club"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: undo-school-club.
cliGitCourse.steps.push(...([
  {
    "id": "cli-undo-school-club-6",
    "index": 146,
    "task": "You will remove the wrong line you added earlier. This keeps your file clean. Run this command exactly as shown. Then run the checker and paste its report.\n\nType this command in your terminal:\n`git restore schedule.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\nWednesday Meeting\n"
    },
    "tests": [
      {
        "id": "fixed",
        "label": "The mistaken line is gone",
        "kind": "local-file-lacks",
        "path": "schedule.txt",
        "value": "Wrong line"
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of this as undoing a mistake you made before saving anything."
      },
      {
        "level": 2,
        "text": "git restore schedule.txt"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git restore schedule.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "undo-school-club"
  },
  {
    "id": "cli-undo-school-club-7",
    "index": 147,
    "task": "You will add a new line called 'Friday Cleanup' to the file. This is a real change you want to keep. Run this command exactly as shown. Then run the checker and paste its report.\n\nType this command in your terminal:\n`echo \"Friday Cleanup\" >> schedule.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\nWednesday Meeting\n"
    },
    "tests": [
      {
        "id": "unstaged",
        "label": "schedule.txt has an unstaged change",
        "kind": "local-git-unstaged",
        "path": "schedule.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are adding text to the file, not removing it. Think of it like writing a note."
      },
      {
        "level": 2,
        "text": "echo \"Friday Cleanup\" >> schedule.txt"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Friday Cleanup\" >> schedule.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "undo-school-club"
  },
  {
    "id": "cli-undo-school-club-8",
    "index": 148,
    "task": "You will tell Git to prepare this new line for saving. This makes it ready to be committed. Run this command exactly as shown. Then run the checker and paste its report.\n\nType this command in your terminal:\n`git add schedule.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\nWednesday Meeting\n"
    },
    "tests": [
      {
        "id": "staged",
        "label": "schedule.txt is staged",
        "kind": "local-git-staged",
        "path": "schedule.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are telling Git to mark the new line as ready to be saved permanently."
      },
      {
        "level": 2,
        "text": "git add schedule.txt"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add schedule.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "undo-school-club"
  },
  {
    "id": "cli-undo-school-club-9",
    "index": 149,
    "task": "You will take back the new line from being ready to save, but keep it in the file. This lets you think again. Run this command exactly as shown. Then run the checker and paste its report.\n\nType this command in your terminal:\n`git restore --staged schedule.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\nWednesday Meeting\n"
    },
    "tests": [
      {
        "id": "unstaged",
        "label": "schedule.txt is back to unstaged",
        "kind": "local-git-unstaged",
        "path": "schedule.txt"
      },
      {
        "id": "kept",
        "label": "Friday Cleanup is still in the file",
        "kind": "local-file-contains",
        "path": "schedule.txt",
        "value": "Friday Cleanup"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are removing the 'staged' state, but not deleting the text you wrote."
      },
      {
        "level": 2,
        "text": "git restore --staged schedule.txt"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git restore --staged schedule.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "undo-school-club"
  },
  {
    "id": "cli-undo-school-club-10",
    "index": 150,
    "task": "You will decide not to keep the new line. You will return the file to its last saved version. Run this command exactly as shown. Then run the checker and paste its report.\n\nType this command in your terminal:\n`git restore schedule.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\nWednesday Meeting\n"
    },
    "tests": [
      {
        "id": "dropped",
        "label": "Friday Cleanup is gone again",
        "kind": "local-file-lacks",
        "path": "schedule.txt",
        "value": "Friday Cleanup"
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are going back to the version that was saved before you added anything new."
      },
      {
        "level": 2,
        "text": "git restore schedule.txt"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git restore schedule.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "undo-school-club"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: branches-school-club.
cliGitCourse.steps.push(...([
  {
    "id": "cli-branches-school-club-1",
    "index": 151,
    "task": "You turn your folder into a Git project. This lets you save your work and share it with others. You name the first branch 'main'. This is the default branch for your project. Run this command: `git init -b main`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "repo",
        "label": "The folder is a Git repository",
        "kind": "local-git-repo"
      },
      {
        "id": "untracked",
        "label": "schedule.txt is not tracked yet",
        "kind": "local-git-untracked",
        "path": "schedule.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are starting a new project with Git. The branch 'main' will hold your main work."
      },
      {
        "level": 2,
        "text": "Run `git init -b main` to start the project."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git init -b main"
    },
    "estimatedMinutes": 3,
    "projectId": "branches-school-club"
  },
  {
    "id": "cli-branches-school-club-2",
    "index": 152,
    "task": "You tell Git who you are. This helps others know who made the changes. You set your name and email. Run these commands: `git config user.name \"Ana Cruz\"` and `git config user.email \"ana@example.com\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "Commits will be signed by Ana Cruz",
        "kind": "local-git-config",
        "key": "user.name",
        "value": "Ana Cruz"
      },
      {
        "id": "email",
        "label": "The commit email is ana@example.com",
        "kind": "local-git-config",
        "key": "user.email",
        "value": "ana@example.com"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Git needs your name and email to mark your work. Use the exact text shown."
      },
      {
        "level": 2,
        "text": "Run `git config user.name \"Ana Cruz\"` first, then `git config user.email \"ana@example.com\"`."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.name \"Ana Cruz\"\ngit config user.email \"ana@example.com\""
    },
    "estimatedMinutes": 4,
    "projectId": "branches-school-club"
  },
  {
    "id": "cli-branches-school-club-3",
    "index": 153,
    "task": "You prepare all files to be saved. This is called staging. You use a dot (.) to include every file. Run this command: `git add .`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "file",
        "label": "schedule.txt is staged",
        "kind": "local-git-staged",
        "path": "schedule.txt"
      },
      {
        "id": "readme",
        "label": "README.txt is staged",
        "kind": "local-git-staged",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are telling Git to save all files at once. The dot (.) means 'all files'."
      },
      {
        "level": 2,
        "text": "Run `git add .` to stage everything."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add ."
    },
    "estimatedMinutes": 2,
    "projectId": "branches-school-club"
  },
  {
    "id": "cli-branches-school-club-4",
    "index": 154,
    "task": "You save your staged files as the first step. This is called a commit. You give it a message: 'Start school club list'. Run this command: `git commit -m \"Start school club list\"`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has one commit",
        "kind": "local-git-commit-count",
        "count": 1
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are saving your work with a message. The message explains what you did."
      },
      {
        "level": 2,
        "text": "Run `git commit -m \"Start school club list\"` to save your work."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Start school club list\""
    },
    "estimatedMinutes": 3,
    "projectId": "branches-school-club"
  },
  {
    "id": "cli-branches-school-club-5",
    "index": 155,
    "task": "You make a new branch named 'friday-plan'. This is separate from 'main'. You stay on 'main' after making it. Run this command: `git branch friday-plan`. Then run the checker and paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "exists",
        "label": "The friday-plan branch exists",
        "kind": "local-git-branch-exists",
        "branch": "friday-plan"
      },
      {
        "id": "still-main",
        "label": "You are still on main",
        "kind": "local-git-branch",
        "value": "main"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are creating a new branch for planning Friday's activities. You don't leave 'main'."
      },
      {
        "level": 2,
        "text": "Run `git branch friday-plan` to make the new branch."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git branch friday-plan"
    },
    "estimatedMinutes": 2,
    "projectId": "branches-school-club"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: branches-school-club.
cliGitCourse.steps.push(...([
  {
    "id": "cli-branches-school-club-6",
    "index": 156,
    "task": "You are now on the friday-plan branch. This branch is for planning Friday activities. You must be here to add the Wednesday Meeting. Run this command: `git switch friday-plan`. Then run the checker to see if you are on the right branch.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "on-branch",
        "label": "You are on friday-plan",
        "kind": "local-git-branch",
        "value": "friday-plan"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Change your branch to friday-plan to start adding the meeting."
      },
      {
        "level": 2,
        "text": "`git switch friday-plan`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git switch friday-plan"
    },
    "estimatedMinutes": 3,
    "projectId": "branches-school-club"
  },
  {
    "id": "cli-branches-school-club-7",
    "index": 157,
    "task": "You are on the friday-plan branch. Add the text 'Wednesday Meeting' to the schedule file. This is a new idea for Friday. Run this command: `echo \"Wednesday Meeting\" >> schedule.txt`. Then run the checker to confirm the file changed.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "unstaged",
        "label": "schedule.txt has an unstaged change",
        "kind": "local-git-unstaged",
        "path": "schedule.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the text to the file without typing it out manually."
      },
      {
        "level": 2,
        "text": "`echo \"Wednesday Meeting\" >> schedule.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Wednesday Meeting\" >> schedule.txt"
    },
    "estimatedMinutes": 2,
    "projectId": "branches-school-club"
  },
  {
    "id": "cli-branches-school-club-8",
    "index": 158,
    "task": "You are on the friday-plan branch. The file changed but not saved yet. Save it with one command. Run this command: `git commit -am \"Add Wednesday Meeting\"`. Then run the checker to confirm the commit was made.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "This branch has two commits",
        "kind": "local-git-commit-count",
        "count": 2
      },
      {
        "id": "message",
        "label": "The last commit says Add Wednesday Meeting",
        "kind": "local-git-head-message",
        "value": "Add Wednesday Meeting"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Save the change with one command that adds and commits at once."
      },
      {
        "level": 2,
        "text": "`git commit -am \"Add Wednesday Meeting\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -am \"Add Wednesday Meeting\""
    },
    "estimatedMinutes": 3,
    "projectId": "branches-school-club"
  },
  {
    "id": "cli-branches-school-club-9",
    "index": 159,
    "task": "Switch back to the main branch. This branch holds the official plan. You will check that the Wednesday Meeting is not here. Run this command: `git switch main`. Then run the checker to confirm you are back and the meeting is missing.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "main",
        "label": "You are back on main",
        "kind": "local-git-branch",
        "value": "main"
      },
      {
        "id": "not-here",
        "label": "main does not have Wednesday Meeting",
        "kind": "local-file-lacks",
        "path": "schedule.txt",
        "value": "Wednesday Meeting"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Go back to the main branch to check if the meeting was added there."
      },
      {
        "level": 2,
        "text": "`git switch main`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git switch main"
    },
    "estimatedMinutes": 2,
    "projectId": "branches-school-club"
  },
  {
    "id": "cli-branches-school-club-10",
    "index": 160,
    "task": "Create a new branch named sports-week and move onto it in one step. This branch is for sports plans. Run this command: `git switch -c sports-week`. Then run the checker to confirm the branch was made and you are on it.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "created",
        "label": "The sports-week branch exists",
        "kind": "local-git-branch-exists",
        "branch": "sports-week"
      },
      {
        "id": "on-it",
        "label": "You are on sports-week",
        "kind": "local-git-branch",
        "value": "sports-week"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Make and switch to the new branch using one command."
      },
      {
        "level": 2,
        "text": "`git switch -c sports-week`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git switch -c sports-week"
    },
    "estimatedMinutes": 3,
    "projectId": "branches-school-club"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: merging-school-club.
cliGitCourse.steps.push(...([
  {
    "id": "cli-merging-school-club-1",
    "index": 161,
    "task": "You turn this folder into a Git project. This lets you save your work safely. You run the command `git init -b main`. This creates a new branch called main. Then you run the checker to see if it worked. Paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "repo",
        "label": "The folder is a Git repository",
        "kind": "local-git-repo"
      },
      {
        "id": "untracked",
        "label": "schedule.txt is not tracked yet",
        "kind": "local-git-untracked",
        "path": "schedule.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You make this folder a Git project so you can save your work. Use the command that starts with git init."
      },
      {
        "level": 2,
        "text": "Run `git init -b main` to start the project with the main branch."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git init -b main"
    },
    "estimatedMinutes": 3,
    "projectId": "merging-school-club"
  },
  {
    "id": "cli-merging-school-club-2",
    "index": 162,
    "task": "You tell Git who you are. This helps others know who made the changes. You run `git config user.name \"Ana Cruz\"` and `git config user.email \"ana@example.com\"`. Then you run the checker to check if it worked. Paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "Commits will be signed by Ana Cruz",
        "kind": "local-git-config",
        "key": "user.name",
        "value": "Ana Cruz"
      },
      {
        "id": "email",
        "label": "The commit email is ana@example.com",
        "kind": "local-git-config",
        "key": "user.email",
        "value": "ana@example.com"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Git needs to know your name and email to mark your work. Use the commands to set them."
      },
      {
        "level": 2,
        "text": "Run `git config user.name \"Ana Cruz\"` and `git config user.email \"ana@example.com\"` to set your details."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git config user.name \"Ana Cruz\"\ngit config user.email \"ana@example.com\""
    },
    "estimatedMinutes": 4,
    "projectId": "merging-school-club"
  },
  {
    "id": "cli-merging-school-club-3",
    "index": 163,
    "task": "You prepare all files to be saved. This means you will save them together. You run `git add .`. This stages every file. Then you run the checker to check if it worked. Paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "file",
        "label": "schedule.txt is staged",
        "kind": "local-git-staged",
        "path": "schedule.txt"
      },
      {
        "id": "readme",
        "label": "README.txt is staged",
        "kind": "local-git-staged",
        "path": "README.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You tell Git to save all files at once. Use the command that uses a dot to mean all files."
      },
      {
        "level": 2,
        "text": "Run `git add .` to stage every file for saving."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git add ."
    },
    "estimatedMinutes": 2,
    "projectId": "merging-school-club"
  },
  {
    "id": "cli-merging-school-club-4",
    "index": 164,
    "task": "You save the files you prepared. This is your first save. You run `git commit -m \"Start school club list\"`. This saves the files with a message. Then you run the checker to check if it worked. Paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The repository has one commit",
        "kind": "local-git-commit-count",
        "count": 1
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You save your files with a message so you know what you did. Use the command with the message."
      },
      {
        "level": 2,
        "text": "Run `git commit -m \"Start school club list\"` to save your files."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -m \"Start school club list\""
    },
    "estimatedMinutes": 3,
    "projectId": "merging-school-club"
  },
  {
    "id": "cli-merging-school-club-5",
    "index": 165,
    "task": "You make a new branch for Friday plans. This lets you work on a new idea. You run `git switch -c friday-plan`. This moves you to the new branch. Then you run the checker to check if it worked. Paste its report.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "on-branch",
        "label": "You are on friday-plan",
        "kind": "local-git-branch",
        "value": "friday-plan"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You create a new branch to work on Friday plans. Use the command that switches to a new branch."
      },
      {
        "level": 2,
        "text": "Run `git switch -c friday-plan` to move to the new branch."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git switch -c friday-plan"
    },
    "estimatedMinutes": 2,
    "projectId": "merging-school-club"
  }
] satisfies typeof cliGitCourse.steps));

// Validated local authoring batch: merging-school-club.
cliGitCourse.steps.push(...([
  {
    "id": "cli-merging-school-club-6",
    "index": 166,
    "task": "You add the text 'Wednesday Meeting' to the schedule file. This change is not saved yet. You must save it before it becomes part of the project. Run the checker to confirm the change is ready to be saved.\n\nType this command in your terminal:\n`echo \"Wednesday Meeting\" >> schedule.txt`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "unstaged",
        "label": "schedule.txt has an unstaged change",
        "kind": "local-git-unstaged",
        "path": "schedule.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are adding a line to the schedule file. Think of it like writing on a paper that hasn't been taped down yet."
      },
      {
        "level": 2,
        "text": "Run `echo \"Wednesday Meeting\" >> schedule.txt`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "echo \"Wednesday Meeting\" >> schedule.txt"
    },
    "estimatedMinutes": 3,
    "projectId": "merging-school-club"
  },
  {
    "id": "cli-merging-school-club-7",
    "index": 167,
    "task": "You save the change with a message. This tells your team what you did. After saving, nothing is left unsaved. Run the checker to confirm your work is saved.\n\nType this command in your terminal:\n`git commit -am \"Add Wednesday Meeting\"`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The branch has two commits",
        "kind": "local-git-commit-count",
        "count": 2
      },
      {
        "id": "clean",
        "label": "Nothing is left uncommitted",
        "kind": "local-git-clean"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are saving your change with a note. Think of it like putting a stamp on a letter before sending it."
      },
      {
        "level": 2,
        "text": "Run `git commit -am \"Add Wednesday Meeting\"`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git commit -am \"Add Wednesday Meeting\""
    },
    "estimatedMinutes": 4,
    "projectId": "merging-school-club"
  },
  {
    "id": "cli-merging-school-club-8",
    "index": 168,
    "task": "You switch to the main branch. This branch does not have your new meeting yet. You are preparing to bring your work into main. Run the checker to confirm you are on main and your change is not there.\n\nType this command in your terminal:\n`git switch main`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "main",
        "label": "You are on main",
        "kind": "local-git-branch",
        "value": "main"
      },
      {
        "id": "not-yet",
        "label": "main does not have Wednesday Meeting yet",
        "kind": "local-file-lacks",
        "path": "schedule.txt",
        "value": "Wednesday Meeting"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are moving to the main branch. Think of it like switching to a different room in a house."
      },
      {
        "level": 2,
        "text": "Run `git switch main`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git switch main"
    },
    "estimatedMinutes": 3,
    "projectId": "merging-school-club"
  },
  {
    "id": "cli-merging-school-club-9",
    "index": 169,
    "task": "You bring the work from the friday-plan branch into main. This adds your meeting to main. Now main has the Wednesday Meeting. Run the checker to confirm the merge is done.\n\nType this command in your terminal:\n`git merge friday-plan`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "merged",
        "label": "friday-plan is merged into main",
        "kind": "local-git-merged",
        "branch": "friday-plan"
      },
      {
        "id": "arrived",
        "label": "main now has Wednesday Meeting",
        "kind": "local-file-contains",
        "path": "schedule.txt",
        "value": "Wednesday Meeting"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are combining your work with the main branch. Think of it like putting two puzzle pieces together."
      },
      {
        "level": 2,
        "text": "Run `git merge friday-plan`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git merge friday-plan"
    },
    "estimatedMinutes": 4,
    "projectId": "merging-school-club"
  },
  {
    "id": "cli-merging-school-club-10",
    "index": 170,
    "task": "You delete the friday-plan branch. Its commits are already in main, so they are safe. The branch is gone, but your work stays. Run the checker to confirm the branch is deleted.\n\nType this command in your terminal:\n`git branch -d friday-plan`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "README.txt": "School Club project files.\nFollow the CodeDaddy course steps inside this folder.\n",
      "schedule.txt": "Monday Practice\n"
    },
    "tests": [
      {
        "id": "deleted",
        "label": "The friday-plan branch is deleted",
        "kind": "local-git-branch-missing",
        "branch": "friday-plan"
      },
      {
        "id": "kept",
        "label": "Wednesday Meeting is still in main",
        "kind": "local-file-contains",
        "path": "schedule.txt",
        "value": "Wednesday Meeting"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are removing the branch. Think of it like closing a file after you've saved it."
      },
      {
        "level": 2,
        "text": "Run `git branch -d friday-plan`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "git branch -d friday-plan"
    },
    "estimatedMinutes": 3,
    "projectId": "merging-school-club"
  }
] satisfies typeof cliGitCourse.steps));
