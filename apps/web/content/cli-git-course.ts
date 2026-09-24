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
