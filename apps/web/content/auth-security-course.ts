import type { Course } from "@/lib/lesson-ir";

// Runs on the learner's own computer under PLAN.md decisions 43 and 45. Every
// user, password, and secret is fake practice data. The code and checks for
// every project are fixed in tools/auth-security-plan.mjs; a pasted report is
// learner-reported practice only.
export const authSecurityCourse: Course = {
  "id": "auth-security",
  "title": "Auth and Security",
  "project": "Sari-Sari Store Storing Passwords Safely",
  "projects": [
    {
      "id": "hashing-sari-sari",
      "title": "Sari-Sari Store Storing Passwords Safely"
    },
    {
      "id": "signup-login-sari-sari",
      "title": "Sari-Sari Store Sign-Up and Login"
    },
    {
      "id": "sessions-sari-sari",
      "title": "Sari-Sari Store Sessions and Cookies"
    },
    {
      "id": "tokens-sari-sari",
      "title": "Sari-Sari Store Signed Tokens"
    },
    {
      "id": "access-sari-sari",
      "title": "Sari-Sari Store Who Can See What"
    },
    {
      "id": "checklist-sari-sari",
      "title": "Sari-Sari Store Security Checklist"
    },
    {
      "id": "hashing-carinderia",
      "title": "Carinderia Storing Passwords Safely"
    },
    {
      "id": "signup-login-carinderia",
      "title": "Carinderia Sign-Up and Login"
    },
    {
      "id": "sessions-carinderia",
      "title": "Carinderia Sessions and Cookies"
    },
    {
      "id": "tokens-carinderia",
      "title": "Carinderia Signed Tokens"
    },
    {
      "id": "access-carinderia",
      "title": "Carinderia Who Can See What"
    },
    {
      "id": "checklist-carinderia",
      "title": "Carinderia Security Checklist"
    },
    {
      "id": "hashing-barangay",
      "title": "Barangay Office Storing Passwords Safely"
    },
    {
      "id": "signup-login-barangay",
      "title": "Barangay Office Sign-Up and Login"
    },
    {
      "id": "sessions-barangay",
      "title": "Barangay Office Sessions and Cookies"
    },
    {
      "id": "tokens-barangay",
      "title": "Barangay Office Signed Tokens"
    },
    {
      "id": "access-barangay",
      "title": "Barangay Office Who Can See What"
    },
    {
      "id": "checklist-barangay",
      "title": "Barangay Office Security Checklist"
    },
    {
      "id": "hashing-school-club",
      "title": "School Club Storing Passwords Safely"
    },
    {
      "id": "signup-login-school-club",
      "title": "School Club Sign-Up and Login"
    },
    {
      "id": "sessions-school-club",
      "title": "School Club Sessions and Cookies"
    },
    {
      "id": "tokens-school-club",
      "title": "School Club Signed Tokens"
    },
    {
      "id": "access-school-club",
      "title": "School Club Who Can See What"
    },
    {
      "id": "checklist-school-club",
      "title": "School Club Security Checklist"
    },
    {
      "id": "hashing-tricycle",
      "title": "Tricycle Terminal Storing Passwords Safely"
    },
    {
      "id": "signup-login-tricycle",
      "title": "Tricycle Terminal Sign-Up and Login"
    },
    {
      "id": "sessions-tricycle",
      "title": "Tricycle Terminal Sessions and Cookies"
    },
    {
      "id": "tokens-tricycle",
      "title": "Tricycle Terminal Signed Tokens"
    },
    {
      "id": "access-tricycle",
      "title": "Tricycle Terminal Who Can See What"
    },
    {
      "id": "checklist-tricycle",
      "title": "Tricycle Terminal Security Checklist"
    }
  ],
  "order": 16,
  "summary": "Protect users and their data with Node built-ins: password hashing, sign-up and login, sessions and cookies, signed tokens, access control, and a security checklist. Needs a computer with Node.js 22.13 or newer. Checks run on your computer and are practice only.",
  "requires": [
    "api-basics"
  ],
  "requiresComputer": true,
  "kind": "local",
  "steps": []
};

// Validated local authoring batch: hashing-sari-sari.
authSecurityCourse.steps.push(...([
  {
    "id": "sec-hashing-sari-sari-1",
    "index": 1,
    "task": "You will add code to hash.js. The code reads a password from the command line. It prints only the password's length. This helps you see how long each password is before hashing. The code below does this. Run the checker to confirm.\n\nIn hash.js:\n```\nconst password = process.argv[2] ?? \"\";\nconsole.log(`Length: ${password.length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\n"
    },
    "tests": [
      {
        "id": "length",
        "label": "node hash.js tindahan2026 prints Length: 12",
        "kind": "local-node-prints",
        "file": "hash.js",
        "args": [
          "tindahan2026"
        ],
        "value": "Length: 12"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The password comes from the command line. Use process.argv[2] to get it."
      },
      {
        "level": 2,
        "text": "Add the code at the end of hash.js.\n\nIn hash.js:\n```\nconst password = process.argv[2] ?? \"\";\nconsole.log(`Length: ${password.length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\nconst password = process.argv[2] ?? \"\";\nconsole.log(`Length: ${password.length}`);\n"
    },
    "conceptIds": [
      "sec-plain-password"
    ],
    "estimatedMinutes": 3,
    "projectId": "hashing-sari-sari"
  },
  {
    "id": "sec-hashing-sari-sari-2",
    "index": 2,
    "task": "You will add code to hash.js. The code turns the password into a scrypt hash using a fixed salt. It prints the hash. This shows how passwords become unreadable codes. The code below does this. Run the checker to confirm.\n\nIn hash.js:\n```\nconst salt = \"fixedsalt\";\nconst hash = scryptSync(password, salt, 32).toString(\"hex\");\nconsole.log(`Hash: ${hash}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\n"
    },
    "tests": [
      {
        "id": "hash",
        "label": "The script prints the scrypt hash",
        "kind": "local-node-prints",
        "file": "hash.js",
        "args": [
          "tindahan2026"
        ],
        "value": "Hash: 5a6f6cd1106b30dc6b5366eeccb40da81918fd9d75080dada2861d5f4ecfdaa6"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use scryptSync to hash the password with the salt. The result is a hex string."
      },
      {
        "level": 2,
        "text": "Add the code at the end of hash.js.\n\nIn hash.js:\n```\nconst salt = \"fixedsalt\";\nconst hash = scryptSync(password, salt, 32).toString(\"hex\");\nconsole.log(`Hash: ${hash}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\nconst password = process.argv[2] ?? \"\";\nconsole.log(`Length: ${password.length}`);\nconst salt = \"fixedsalt\";\nconst hash = scryptSync(password, salt, 32).toString(\"hex\");\nconsole.log(`Hash: ${hash}`);\n"
    },
    "conceptIds": [
      "sec-hash"
    ],
    "estimatedMinutes": 4,
    "projectId": "hashing-sari-sari"
  },
  {
    "id": "sec-hashing-sari-sari-3",
    "index": 3,
    "task": "You will replace the fixed salt with a random salt. The code prints the salt's length. This ensures each user gets a unique hash, even if they use the same password. The code below does this. Run the checker to confirm.\n\nIn hash.js:\n```\nconst salt = randomBytes(16).toString(\"hex\");\nconsole.log(`Salt length: ${salt.length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\n"
    },
    "tests": [
      {
        "id": "salt",
        "label": "The script prints Salt length: 32",
        "kind": "local-node-prints",
        "file": "hash.js",
        "args": [
          "tindahan2026"
        ],
        "value": "Salt length: 32"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use randomBytes(16) to make a new salt each time. Convert it to hex."
      },
      {
        "level": 2,
        "text": "Replace the fixed salt line with this new code.\n\nIn hash.js:\n```\nconst salt = randomBytes(16).toString(\"hex\");\nconsole.log(`Salt length: ${salt.length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\nconst password = process.argv[2] ?? \"\";\nconsole.log(`Length: ${password.length}`);\nconst salt = randomBytes(16).toString(\"hex\");\nconsole.log(`Salt length: ${salt.length}`);\nconst hash = scryptSync(password, salt, 32).toString(\"hex\");\nconsole.log(`Hash: ${hash}`);\n"
    },
    "conceptIds": [
      "sec-salt"
    ],
    "estimatedMinutes": 4,
    "projectId": "hashing-sari-sari"
  },
  {
    "id": "sec-hashing-sari-sari-4",
    "index": 4,
    "task": "You will add code to hash.js. The code joins the salt and hash with a colon. It prints how many parts are stored. This lets you store both values together safely. The code below does this. Run the checker to confirm.\n\nIn hash.js:\n```\nconst stored = `${salt}:${hash}`;\nconsole.log(`Stored parts: ${stored.split(\":\").length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\n"
    },
    "tests": [
      {
        "id": "parts",
        "label": "The script prints Stored parts: 2",
        "kind": "local-node-prints",
        "file": "hash.js",
        "args": [
          "tindahan2026"
        ],
        "value": "Stored parts: 2"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use .split(\":\") to check how many parts are in the stored value."
      },
      {
        "level": 2,
        "text": "Add the code at the end of hash.js.\n\nIn hash.js:\n```\nconst stored = `${salt}:${hash}`;\nconsole.log(`Stored parts: ${stored.split(\":\").length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\nconst password = process.argv[2] ?? \"\";\nconsole.log(`Length: ${password.length}`);\nconst salt = randomBytes(16).toString(\"hex\");\nconsole.log(`Salt length: ${salt.length}`);\nconst hash = scryptSync(password, salt, 32).toString(\"hex\");\nconsole.log(`Hash: ${hash}`);\nconst stored = `${salt}:${hash}`;\nconsole.log(`Stored parts: ${stored.split(\":\").length}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "hashing-sari-sari"
  },
  {
    "id": "sec-hashing-sari-sari-5",
    "index": 5,
    "task": "You will add code to hash.js. The code checks if a password matches the stored value using timingSafeEqual. This prevents timing attacks. The code below does this. Run the checker to confirm.\n\nIn hash.js:\n```\nconst verify = (attempt, saved) => { const [s, h] = saved.split(\":\"); return timingSafeEqual(Buffer.from(h, \"hex\"), scryptSync(attempt, s, 32)); };\nconsole.log(`Correct: ${verify(password, stored)}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\n"
    },
    "tests": [
      {
        "id": "correct",
        "label": "The right password checks as true",
        "kind": "local-node-prints",
        "file": "hash.js",
        "args": [
          "tindahan2026"
        ],
        "value": "Correct: true"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use timingSafeEqual to compare the hashes without leaking timing info."
      },
      {
        "level": 2,
        "text": "Add the code at the end of hash.js.\n\nIn hash.js:\n```\nconst verify = (attempt, saved) => { const [s, h] = saved.split(\":\"); return timingSafeEqual(Buffer.from(h, \"hex\"), scryptSync(attempt, s, 32)); };\nconsole.log(`Correct: ${verify(password, stored)}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\nconst password = process.argv[2] ?? \"\";\nconsole.log(`Length: ${password.length}`);\nconst salt = randomBytes(16).toString(\"hex\");\nconsole.log(`Salt length: ${salt.length}`);\nconst hash = scryptSync(password, salt, 32).toString(\"hex\");\nconsole.log(`Hash: ${hash}`);\nconst stored = `${salt}:${hash}`;\nconsole.log(`Stored parts: ${stored.split(\":\").length}`);\nconst verify = (attempt, saved) => { const [s, h] = saved.split(\":\"); return timingSafeEqual(Buffer.from(h, \"hex\"), scryptSync(attempt, s, 32)); };\nconsole.log(`Correct: ${verify(password, stored)}`);\n"
    },
    "conceptIds": [
      "sec-verify-hash"
    ],
    "estimatedMinutes": 5,
    "projectId": "hashing-sari-sari"
  }
] satisfies typeof authSecurityCourse.steps));

// Validated local authoring batch: hashing-sari-sari.
authSecurityCourse.steps.push(...([
  {
    "id": "sec-hashing-sari-sari-6",
    "index": 6,
    "task": "You add one line at the end of hash.js. This line checks if a wrong password matches. It helps the store know that a wrong guess is not correct. The code below shows this check. Run the checker to confirm it works.\n\nIn hash.js:\n```\nconsole.log(`Wrong: ${verify(\"wrong-guess\", stored)}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\n"
    },
    "tests": [
      {
        "id": "wrong",
        "label": "A wrong password checks as false",
        "kind": "local-node-prints",
        "file": "hash.js",
        "args": [
          "tindahan2026"
        ],
        "value": "Wrong: false"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The checker sends a wrong password to test if the script says it's wrong."
      },
      {
        "level": 2,
        "text": "Add the line at the end of the file, after the verify function.\n\nIn hash.js:\n```\nconsole.log(`Wrong: ${verify(\"wrong-guess\", stored)}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\nconst password = process.argv[2] ?? \"\";\nconsole.log(`Length: ${password.length}`);\nconst salt = randomBytes(16).toString(\"hex\");\nconsole.log(`Salt length: ${salt.length}`);\nconst hash = scryptSync(password, salt, 32).toString(\"hex\");\nconsole.log(`Hash: ${hash}`);\nconst stored = `${salt}:${hash}`;\nconsole.log(`Stored parts: ${stored.split(\":\").length}`);\nconst verify = (attempt, saved) => { const [s, h] = saved.split(\":\"); return timingSafeEqual(Buffer.from(h, \"hex\"), scryptSync(attempt, s, 32)); };\nconsole.log(`Correct: ${verify(password, stored)}`);\nconsole.log(`Wrong: ${verify(\"wrong-guess\", stored)}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "hashing-sari-sari"
  },
  {
    "id": "sec-hashing-sari-sari-7",
    "index": 7,
    "task": "You add one line right after where the password is read. This line checks if the password is at least 8 characters long. If not, the script stops and says the password is too short. The code below shows this check. Run the checker to confirm it works.\n\nIn hash.js:\n```\nif (password.length < 8) { console.error(\"Password must be at least 8 characters\"); process.exit(1); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\n"
    },
    "tests": [
      {
        "id": "short",
        "label": "node hash.js abc ends with exit code 1",
        "kind": "local-node-exit-code",
        "file": "hash.js",
        "args": [
          "abc"
        ],
        "code": 1
      },
      {
        "id": "fine",
        "label": "node hash.js tindahan2026 still works",
        "kind": "local-node-exit-code",
        "file": "hash.js",
        "args": [
          "tindahan2026"
        ],
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The checker uses a short password to test if the script refuses it."
      },
      {
        "level": 2,
        "text": "Add the line right after the password line, before the hash part.\n\nIn hash.js:\n```\nif (password.length < 8) { console.error(\"Password must be at least 8 characters\"); process.exit(1); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\nconst password = process.argv[2] ?? \"\";\nif (password.length < 8) { console.error(\"Password must be at least 8 characters\"); process.exit(1); }\nconsole.log(`Length: ${password.length}`);\nconst salt = randomBytes(16).toString(\"hex\");\nconsole.log(`Salt length: ${salt.length}`);\nconst hash = scryptSync(password, salt, 32).toString(\"hex\");\nconsole.log(`Hash: ${hash}`);\nconst stored = `${salt}:${hash}`;\nconsole.log(`Stored parts: ${stored.split(\":\").length}`);\nconst verify = (attempt, saved) => { const [s, h] = saved.split(\":\"); return timingSafeEqual(Buffer.from(h, \"hex\"), scryptSync(attempt, s, 32)); };\nconsole.log(`Correct: ${verify(password, stored)}`);\nconsole.log(`Wrong: ${verify(\"wrong-guess\", stored)}`);\n"
    },
    "conceptIds": [
      "sec-password-length"
    ],
    "estimatedMinutes": 4,
    "projectId": "hashing-sari-sari"
  },
  {
    "id": "sec-hashing-sari-sari-8",
    "index": 8,
    "task": "You add two lines after the length check. The first line lists common passwords. The second line checks if the password is in that list. If it is, the script stops and says to choose a less common password. The code below shows this check. Run the checker to confirm it works.\n\nIn hash.js:\n```\nconst common = [\"password\", \"12345678\", \"qwerty123\"];\nif (common.includes(password.toLowerCase())) { console.error(\"Choose a less common password\"); process.exit(2); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\n"
    },
    "tests": [
      {
        "id": "common",
        "label": "node hash.js Password ends with exit code 2",
        "kind": "local-node-exit-code",
        "file": "hash.js",
        "args": [
          "Password"
        ],
        "code": 2
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The checker tries a common password to test if the script blocks it."
      },
      {
        "level": 2,
        "text": "Add the two lines after the length check, before the hash part.\n\nIn hash.js:\n```\nconst common = [\"password\", \"12345678\", \"qwerty123\"];\nif (common.includes(password.toLowerCase())) { console.error(\"Choose a less common password\"); process.exit(2); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\nconst password = process.argv[2] ?? \"\";\nif (password.length < 8) { console.error(\"Password must be at least 8 characters\"); process.exit(1); }\nconst common = [\"password\", \"12345678\", \"qwerty123\"];\nif (common.includes(password.toLowerCase())) { console.error(\"Choose a less common password\"); process.exit(2); }\nconsole.log(`Length: ${password.length}`);\nconst salt = randomBytes(16).toString(\"hex\");\nconsole.log(`Salt length: ${salt.length}`);\nconst hash = scryptSync(password, salt, 32).toString(\"hex\");\nconsole.log(`Hash: ${hash}`);\nconst stored = `${salt}:${hash}`;\nconsole.log(`Stored parts: ${stored.split(\":\").length}`);\nconst verify = (attempt, saved) => { const [s, h] = saved.split(\":\"); return timingSafeEqual(Buffer.from(h, \"hex\"), scryptSync(attempt, s, 32)); };\nconsole.log(`Correct: ${verify(password, stored)}`);\nconsole.log(`Wrong: ${verify(\"wrong-guess\", stored)}`);\n"
    },
    "conceptIds": [
      "sec-common-password"
    ],
    "estimatedMinutes": 5,
    "projectId": "hashing-sari-sari"
  },
  {
    "id": "sec-hashing-sari-sari-9",
    "index": 9,
    "task": "You replace the line that prints the password with one that prints stars. This hides the password from anyone who sees the output. The code below shows this change. Run the checker to confirm it works.\n\nIn hash.js:\n```\nconsole.log(`Checking ${\"*\".repeat(password.length)}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\n"
    },
    "tests": [
      {
        "id": "masked",
        "label": "The script prints stars instead of the password",
        "kind": "local-node-prints",
        "file": "hash.js",
        "args": [
          "tindahan2026"
        ],
        "value": "Checking ************"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The checker runs the script to see if it prints stars instead of letters."
      },
      {
        "level": 2,
        "text": "Replace the line that prints the password with the new one.\n\nIn hash.js:\n```\nconsole.log(`Checking ${\"*\".repeat(password.length)}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\nconst password = process.argv[2] ?? \"\";\nif (password.length < 8) { console.error(\"Password must be at least 8 characters\"); process.exit(1); }\nconst common = [\"password\", \"12345678\", \"qwerty123\"];\nif (common.includes(password.toLowerCase())) { console.error(\"Choose a less common password\"); process.exit(2); }\nconsole.log(`Checking ${\"*\".repeat(password.length)}`);\nconst salt = randomBytes(16).toString(\"hex\");\nconsole.log(`Salt length: ${salt.length}`);\nconst hash = scryptSync(password, salt, 32).toString(\"hex\");\nconsole.log(`Hash: ${hash}`);\nconst stored = `${salt}:${hash}`;\nconsole.log(`Stored parts: ${stored.split(\":\").length}`);\nconst verify = (attempt, saved) => { const [s, h] = saved.split(\":\"); return timingSafeEqual(Buffer.from(h, \"hex\"), scryptSync(attempt, s, 32)); };\nconsole.log(`Correct: ${verify(password, stored)}`);\nconsole.log(`Wrong: ${verify(\"wrong-guess\", stored)}`);\n"
    },
    "conceptIds": [
      "sec-no-logging-secrets"
    ],
    "estimatedMinutes": 4,
    "projectId": "hashing-sari-sari"
  },
  {
    "id": "sec-hashing-sari-sari-10",
    "index": 10,
    "task": "You change two lines in hash.js. First, you make the hash 64 bytes long. Second, you print only the length of the hash, not the whole thing. The code below shows these changes. Run the checker to confirm it works.\n\nIn hash.js:\n```\nconst hash = scryptSync(password, salt, 64).toString(\"hex\");\nconsole.log(`Hash length: ${hash.length}`);\nconst verify = (attempt, saved) => { const [s, h] = saved.split(\":\"); return timingSafeEqual(Buffer.from(h, \"hex\"), scryptSync(attempt, s, 64)); };\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\n"
    },
    "tests": [
      {
        "id": "long",
        "label": "The script prints Hash length: 128",
        "kind": "local-node-prints",
        "file": "hash.js",
        "args": [
          "tindahan2026"
        ],
        "value": "Hash length: 128"
      },
      {
        "id": "still",
        "label": "The right password still checks as true",
        "kind": "local-node-prints",
        "file": "hash.js",
        "args": [
          "tindahan2026"
        ],
        "value": "Correct: true"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The checker tests if the script prints the correct hash length."
      },
      {
        "level": 2,
        "text": "Change the scrypt and print lines as shown in the code below.\n\nIn hash.js:\n```\nconst hash = scryptSync(password, salt, 64).toString(\"hex\");\nconsole.log(`Hash length: ${hash.length}`);\nconst verify = (attempt, saved) => { const [s, h] = saved.split(\":\"); return timingSafeEqual(Buffer.from(h, \"hex\"), scryptSync(attempt, s, 64)); };\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "hash.js": "import { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nconsole.log(\"Password tool\");\nconst password = process.argv[2] ?? \"\";\nif (password.length < 8) { console.error(\"Password must be at least 8 characters\"); process.exit(1); }\nconst common = [\"password\", \"12345678\", \"qwerty123\"];\nif (common.includes(password.toLowerCase())) { console.error(\"Choose a less common password\"); process.exit(2); }\nconsole.log(`Checking ${\"*\".repeat(password.length)}`);\nconst salt = randomBytes(16).toString(\"hex\");\nconsole.log(`Salt length: ${salt.length}`);\nconst hash = scryptSync(password, salt, 64).toString(\"hex\");\nconsole.log(`Hash length: ${hash.length}`);\nconst stored = `${salt}:${hash}`;\nconsole.log(`Stored parts: ${stored.split(\":\").length}`);\nconst verify = (attempt, saved) => { const [s, h] = saved.split(\":\"); return timingSafeEqual(Buffer.from(h, \"hex\"), scryptSync(attempt, s, 64)); };\nconsole.log(`Correct: ${verify(password, stored)}`);\nconsole.log(`Wrong: ${verify(\"wrong-guess\", stored)}`);\n"
    },
    "conceptIds": [
      "sec-hash-length"
    ],
    "estimatedMinutes": 6,
    "projectId": "hashing-sari-sari"
  }
] satisfies typeof authSecurityCourse.steps));

// Validated local authoring batch: signup-login-sari-sari.
authSecurityCourse.steps.push(...([
  {
    "id": "sec-signup-login-sari-sari-1",
    "index": 11,
    "task": "You change the sign-up route to store a password hash. The code below does this. It stores the username and password hash in memory. This protects the password because the store never holds the plain password. The checker will test this.\n\nIn server.js:\n```\n  const { username, password } = await readJson(req);\n  users.set(username, hashPassword(password));\n  return send(res, 201, { username });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nasync function signup(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function login(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "created",
        "label": "POST /signup answers 201",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/signup",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\",\"confirm\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 201,
        "bodyContains": "\"username\":\"ana\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The code stores a password hash, not the plain password, so no one can steal it."
      },
      {
        "level": 2,
        "text": "Put the code inside the signup route in server.js, right after reading the body.\n\nIn server.js:\n```\n  const { username, password } = await readJson(req);\n  users.set(username, hashPassword(password));\n  return send(res, 201, { username });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nasync function signup(req, res) {\n  const { username, password } = await readJson(req);\n  users.set(username, hashPassword(password));\n  return send(res, 201, { username });\n}\nasync function login(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-signup"
    ],
    "estimatedMinutes": 3,
    "projectId": "signup-login-sari-sari"
  },
  {
    "id": "sec-signup-login-sari-sari-2",
    "index": 12,
    "task": "You add a check to stop duplicate sign-ups. The code below checks if the username already exists. If it does, it answers 409. This protects the store from having two accounts with the same name. The checker will test this.\n\nIn server.js:\n```\n  if (users.has(username)) return send(res, 409, { error: \"Username taken\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nasync function signup(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function login(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "taken",
        "label": "Signing up twice as ana answers 409",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/signup",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\",\"confirm\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/signup",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\",\"confirm\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 409
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the username is already taken, the server must say 409 so no one can create a duplicate."
      },
      {
        "level": 2,
        "text": "Put the code inside the signup route in server.js, right after reading the body.\n\nIn server.js:\n```\n  if (users.has(username)) return send(res, 409, { error: \"Username taken\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nasync function signup(req, res) {\n  const { username, password } = await readJson(req);\n  if (users.has(username)) return send(res, 409, { error: \"Username taken\" });\n  users.set(username, hashPassword(password));\n  return send(res, 201, { username });\n}\nasync function login(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-unique-username"
    ],
    "estimatedMinutes": 2,
    "projectId": "signup-login-sari-sari"
  },
  {
    "id": "sec-signup-login-sari-sari-3",
    "index": 13,
    "task": "You add rules to check if the username or password is too short. The code below checks if the username is at least 3 characters and the password is at least 8. If not, it answers 422. This protects the store from bad data. The checker will test this.\n\nIn server.js:\n```\n  if (typeof username !== \"string\" || username.length < 3 || typeof password !== \"string\" || password.length < 8) return send(res, 422, { error: \"Username needs 3 or more characters and password 8 or more\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nasync function signup(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function login(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "rules",
        "label": "A too-short sign-up answers 422",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/signup",
            "body": "{\"username\":\"al\",\"password\":\"x\",\"confirm\":\"x\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 422
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the username or password is too short, the server must say 422 so no one can sign up with weak data."
      },
      {
        "level": 2,
        "text": "Put the code inside the signup route in server.js, right after reading the body.\n\nIn server.js:\n```\n  if (typeof username !== \"string\" || username.length < 3 || typeof password !== \"string\" || password.length < 8) return send(res, 422, { error: \"Username needs 3 or more characters and password 8 or more\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nasync function signup(req, res) {\n  const { username, password } = await readJson(req);\n  if (typeof username !== \"string\" || username.length < 3 || typeof password !== \"string\" || password.length < 8) return send(res, 422, { error: \"Username needs 3 or more characters and password 8 or more\" });\n  if (users.has(username)) return send(res, 409, { error: \"Username taken\" });\n  users.set(username, hashPassword(password));\n  return send(res, 201, { username });\n}\nasync function login(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-input-rules"
    ],
    "estimatedMinutes": 3,
    "projectId": "signup-login-sari-sari"
  },
  {
    "id": "sec-signup-login-sari-sari-4",
    "index": 14,
    "task": "You change the login route to check the password against the stored hash. The code below checks if the username exists and if the password matches. If not, it answers 401. If yes, it says welcome. This protects the store from wrong logins. The checker will test this.\n\nIn server.js:\n```\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { message: `Welcome, ${username}` });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nasync function signup(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function login(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "wrong",
        "label": "A wrong password answers 401",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/signup",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\",\"confirm\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"wrong-guess\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 401
      },
      {
        "id": "right",
        "label": "The right password answers Welcome, ana",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/signup",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\",\"confirm\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 200,
        "bodyContains": "Welcome, ana"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The code checks if the password matches the stored hash, so only the right user can log in."
      },
      {
        "level": 2,
        "text": "Replace the login route in server.js with the code below.\n\nIn server.js:\n```\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { message: `Welcome, ${username}` });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nasync function signup(req, res) {\n  const { username, password } = await readJson(req);\n  if (typeof username !== \"string\" || username.length < 3 || typeof password !== \"string\" || password.length < 8) return send(res, 422, { error: \"Username needs 3 or more characters and password 8 or more\" });\n  if (users.has(username)) return send(res, 409, { error: \"Username taken\" });\n  users.set(username, hashPassword(password));\n  return send(res, 201, { username });\n}\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-login"
    ],
    "estimatedMinutes": 4,
    "projectId": "signup-login-sari-sari"
  },
  {
    "id": "sec-signup-login-sari-sari-5",
    "index": 15,
    "task": "You add a route to list usernames only. The code below answers with a list of usernames. This protects the store because it never sends password hashes. The checker will test this.\n\nIn server.js:\n```\n  if (req.url === \"/users\") return send(res, 200, [...users.keys()]);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nasync function signup(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function login(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "names",
        "label": "GET /users answers only the names",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/signup",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\",\"confirm\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/users"
          }
        ],
        "bodyContains": "[\"ana\"]",
        "bodyLacks": ":"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The route should only list usernames, never password hashes, so no one can see the passwords."
      },
      {
        "level": 2,
        "text": "Add the code after the login route in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/users\") return send(res, 200, [...users.keys()]);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nasync function signup(req, res) {\n  const { username, password } = await readJson(req);\n  if (typeof username !== \"string\" || username.length < 3 || typeof password !== \"string\" || password.length < 8) return send(res, 422, { error: \"Username needs 3 or more characters and password 8 or more\" });\n  if (users.has(username)) return send(res, 409, { error: \"Username taken\" });\n  users.set(username, hashPassword(password));\n  return send(res, 201, { username });\n}\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/users\") return send(res, 200, [...users.keys()]);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-safe-listing"
    ],
    "estimatedMinutes": 3,
    "projectId": "signup-login-sari-sari"
  }
] satisfies typeof authSecurityCourse.steps));

// Validated local authoring batch: signup-login-sari-sari.
authSecurityCourse.steps.push(...([
  {
    "id": "sec-signup-login-sari-sari-6",
    "index": 16,
    "task": "Add a map called failures above the signup function. This map remembers how many wrong tries each user has. Then, in login, check if a user has five or more wrong tries. If so, send 429. This stops fast guessing of passwords. The code below does this. Run the checker and paste its report.\n\nIn server.js:\n```\nconst failures = new Map();\n  if ((failures.get(username) ?? 0) >= 5) return send(res, 429, { error: \"Too many attempts. Try again later.\" });\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) { failures.set(username, (failures.get(username) ?? 0) + 1); return send(res, 401, { error: \"Wrong username or password\" }); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nasync function signup(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function login(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "locked",
        "label": "The sixth wrong try answers 429",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/signup",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\",\"confirm\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"wrong-guess\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"wrong-guess\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"wrong-guess\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"wrong-guess\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"wrong-guess\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"wrong-guess\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 429
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of failures like a counter for each user's wrong tries."
      },
      {
        "level": 2,
        "text": "Put the failures check right after you read the username in login.\n\nIn server.js:\n```\nconst failures = new Map();\n  if ((failures.get(username) ?? 0) >= 5) return send(res, 429, { error: \"Too many attempts. Try again later.\" });\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) { failures.set(username, (failures.get(username) ?? 0) + 1); return send(res, 401, { error: \"Wrong username or password\" }); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nconst failures = new Map();\nasync function signup(req, res) {\n  const { username, password } = await readJson(req);\n  if (typeof username !== \"string\" || username.length < 3 || typeof password !== \"string\" || password.length < 8) return send(res, 422, { error: \"Username needs 3 or more characters and password 8 or more\" });\n  if (users.has(username)) return send(res, 409, { error: \"Username taken\" });\n  users.set(username, hashPassword(password));\n  return send(res, 201, { username });\n}\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if ((failures.get(username) ?? 0) >= 5) return send(res, 429, { error: \"Too many attempts. Try again later.\" });\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) { failures.set(username, (failures.get(username) ?? 0) + 1); return send(res, 401, { error: \"Wrong username or password\" }); }\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/users\") return send(res, 200, [...users.keys()]);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-rate-limit"
    ],
    "estimatedMinutes": 5,
    "projectId": "signup-login-sari-sari"
  },
  {
    "id": "sec-signup-login-sari-sari-7",
    "index": 17,
    "task": "After a user logs in successfully, delete their failure count. This means they can try again without being locked out. The code below deletes the count right after you send the welcome message. Run the checker and paste its report.\n\nIn server.js:\n```\n  failures.delete(username);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nasync function signup(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function login(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "reset",
        "label": "After a good login, wrong tries start counting again from zero",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/signup",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\",\"confirm\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"wrong-guess\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"wrong-guess\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"wrong-guess\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"wrong-guess\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"wrong-guess\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"wrong-guess\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 401
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "After a good login, the failure count should be wiped clean."
      },
      {
        "level": 2,
        "text": "Put the delete line right before you send the success message.\n\nIn server.js:\n```\n  failures.delete(username);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nconst failures = new Map();\nasync function signup(req, res) {\n  const { username, password } = await readJson(req);\n  if (typeof username !== \"string\" || username.length < 3 || typeof password !== \"string\" || password.length < 8) return send(res, 422, { error: \"Username needs 3 or more characters and password 8 or more\" });\n  if (users.has(username)) return send(res, 409, { error: \"Username taken\" });\n  users.set(username, hashPassword(password));\n  return send(res, 201, { username });\n}\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if ((failures.get(username) ?? 0) >= 5) return send(res, 429, { error: \"Too many attempts. Try again later.\" });\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) { failures.set(username, (failures.get(username) ?? 0) + 1); return send(res, 401, { error: \"Wrong username or password\" }); }\n  failures.delete(username);\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/users\") return send(res, 200, [...users.keys()]);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-reset-failures"
    ],
    "estimatedMinutes": 3,
    "projectId": "signup-login-sari-sari"
  },
  {
    "id": "sec-signup-login-sari-sari-8",
    "index": 18,
    "task": "In signup, check if the password and confirm fields match. If not, send 422. This stops users from making accounts with mismatched passwords. The code below adds this check. Run the checker and paste its report.\n\nIn server.js:\n```\n  const { username, password, confirm } = await readJson(req);\n  if (password !== confirm) return send(res, 422, { error: \"Passwords do not match\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nasync function signup(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function login(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "mismatch",
        "label": "Different passwords answer 422",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/signup",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\",\"confirm\":\"tindahan2026x\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 422,
        "bodyContains": "Passwords do not match"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Compare the password and confirm fields before creating the account."
      },
      {
        "level": 2,
        "text": "Put this check right after you read the password and confirm fields.\n\nIn server.js:\n```\n  const { username, password, confirm } = await readJson(req);\n  if (password !== confirm) return send(res, 422, { error: \"Passwords do not match\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nconst failures = new Map();\nasync function signup(req, res) {\n  const { username, password, confirm } = await readJson(req);\n  if (typeof username !== \"string\" || username.length < 3 || typeof password !== \"string\" || password.length < 8) return send(res, 422, { error: \"Username needs 3 or more characters and password 8 or more\" });\n  if (password !== confirm) return send(res, 422, { error: \"Passwords do not match\" });\n  if (users.has(username)) return send(res, 409, { error: \"Username taken\" });\n  users.set(username, hashPassword(password));\n  return send(res, 201, { username });\n}\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if ((failures.get(username) ?? 0) >= 5) return send(res, 429, { error: \"Too many attempts. Try again later.\" });\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) { failures.set(username, (failures.get(username) ?? 0) + 1); return send(res, 401, { error: \"Wrong username or password\" }); }\n  failures.delete(username);\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/users\") return send(res, 200, [...users.keys()]);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-confirm-password"
    ],
    "estimatedMinutes": 4,
    "projectId": "signup-login-sari-sari"
  },
  {
    "id": "sec-signup-login-sari-sari-9",
    "index": 19,
    "task": "In signup, check if the username uses only letters, numbers, and underscore. If it has spaces or symbols, send 422. This avoids tricky usernames that look like real ones. The code below adds this check. Run the checker and paste its report.\n\nIn server.js:\n```\n  if (!/^[a-z0-9_]+$/i.test(username)) return send(res, 422, { error: \"Use letters, numbers, and _ only\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nasync function signup(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function login(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "format",
        "label": "A username with a space answers 422",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/signup",
            "body": "{\"username\":\"ana smith\",\"password\":\"tindahan2026\",\"confirm\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 422,
        "bodyContains": "letters, numbers"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use a regular expression to check for allowed characters only."
      },
      {
        "level": 2,
        "text": "Put this check right after you read the username.\n\nIn server.js:\n```\n  if (!/^[a-z0-9_]+$/i.test(username)) return send(res, 422, { error: \"Use letters, numbers, and _ only\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nconst failures = new Map();\nasync function signup(req, res) {\n  const { username, password, confirm } = await readJson(req);\n  if (typeof username !== \"string\" || username.length < 3 || typeof password !== \"string\" || password.length < 8) return send(res, 422, { error: \"Username needs 3 or more characters and password 8 or more\" });\n  if (password !== confirm) return send(res, 422, { error: \"Passwords do not match\" });\n  if (!/^[a-z0-9_]+$/i.test(username)) return send(res, 422, { error: \"Use letters, numbers, and _ only\" });\n  if (users.has(username)) return send(res, 409, { error: \"Username taken\" });\n  users.set(username, hashPassword(password));\n  return send(res, 201, { username });\n}\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if ((failures.get(username) ?? 0) >= 5) return send(res, 429, { error: \"Too many attempts. Try again later.\" });\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) { failures.set(username, (failures.get(username) ?? 0) + 1); return send(res, 401, { error: \"Wrong username or password\" }); }\n  failures.delete(username);\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/users\") return send(res, 200, [...users.keys()]);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-username-format"
    ],
    "estimatedMinutes": 4,
    "projectId": "signup-login-sari-sari"
  },
  {
    "id": "sec-signup-login-sari-sari-10",
    "index": 20,
    "task": "In login, check if username and password are given. If either is missing, send 400. This stops requests that don't have all needed data. The code below adds this check. Run the checker and paste its report.\n\nIn server.js:\n```\n  if (!username || !password) return send(res, 400, { error: \"Send username and password\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nasync function signup(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function login(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "missing",
        "label": "POST /login with an empty body answers 400",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 400
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Check for missing fields before any password check."
      },
      {
        "level": 2,
        "text": "Put this check right after you read the request body.\n\nIn server.js:\n```\n  if (!username || !password) return send(res, 400, { error: \"Send username and password\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map();\nconst failures = new Map();\nasync function signup(req, res) {\n  const { username, password, confirm } = await readJson(req);\n  if (typeof username !== \"string\" || username.length < 3 || typeof password !== \"string\" || password.length < 8) return send(res, 422, { error: \"Username needs 3 or more characters and password 8 or more\" });\n  if (password !== confirm) return send(res, 422, { error: \"Passwords do not match\" });\n  if (!/^[a-z0-9_]+$/i.test(username)) return send(res, 422, { error: \"Use letters, numbers, and _ only\" });\n  if (users.has(username)) return send(res, 409, { error: \"Username taken\" });\n  users.set(username, hashPassword(password));\n  return send(res, 201, { username });\n}\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!username || !password) return send(res, 400, { error: \"Send username and password\" });\n  if ((failures.get(username) ?? 0) >= 5) return send(res, 429, { error: \"Too many attempts. Try again later.\" });\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) { failures.set(username, (failures.get(username) ?? 0) + 1); return send(res, 401, { error: \"Wrong username or password\" }); }\n  failures.delete(username);\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/signup\" && req.method === \"POST\") return signup(req, res);\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/users\") return send(res, 200, [...users.keys()]);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-required-fields"
    ],
    "estimatedMinutes": 3,
    "projectId": "signup-login-sari-sari"
  }
] satisfies typeof authSecurityCourse.steps));

// Validated local authoring batch: sessions-sari-sari.
authSecurityCourse.steps.push(...([
  {
    "id": "sec-sessions-sari-sari-1",
    "index": 21,
    "task": "You will add a session to remember who is logged in. This session has a random id. The server sends this id back to the browser as a cookie. The cookie is HttpOnly, so it can't be read by page scripts. This protects the user's login from being stolen by a script on the page. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  const sid = randomBytes(16).toString(\"hex\");\n  sessions.set(sid, username);\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; Path=/`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "cookie",
        "label": "Logging in sets an HttpOnly sid cookie",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "header": {
          "name": "set-cookie",
          "value": "HttpOnly"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server creates a random id for the session. It stores that id in memory with the user's name. It sends the id back to the browser as a cookie with the HttpOnly flag."
      },
      {
        "level": 2,
        "text": "Add the code right before the last line in the login route, in server.js.\n\nIn server.js:\n```\n  const sid = randomBytes(16).toString(\"hex\");\n  sessions.set(sid, username);\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; Path=/`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  const sid = randomBytes(16).toString(\"hex\");\n  sessions.set(sid, username);\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; Path=/`);\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-session"
    ],
    "estimatedMinutes": 4,
    "projectId": "sessions-sari-sari"
  },
  {
    "id": "sec-sessions-sari-sari-2",
    "index": 22,
    "task": "You will add a route to answer /me with the logged-in user's name. The server finds the user by reading the cookie sent by the browser. If the cookie is missing, it sends a 401 error. This lets the user see their own data only. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (req.url === \"/me\") { const username = sessions.get(cookie(req, \"sid\")); return username ? send(res, 200, { username }) : send(res, 401, { error: \"Log in first\" }); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "me",
        "label": "After logging in, GET /me answers ana",
        "kind": "local-http",
        "file": "server.js",
        "cookies": true,
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/me"
          }
        ],
        "status": 200,
        "bodyContains": "\"username\":\"ana\""
      },
      {
        "id": "anon",
        "label": "Without logging in, GET /me answers 401",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/me"
          }
        ],
        "status": 401
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server reads the cookie from the browser request. It looks up the user's name in its session store. If the session is found, it sends the user's name. If not, it sends a 401 error."
      },
      {
        "level": 2,
        "text": "Add the route after the login route, in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/me\") { const username = sessions.get(cookie(req, \"sid\")); return username ? send(res, 200, { username }) : send(res, 401, { error: \"Log in first\" }); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  const sid = randomBytes(16).toString(\"hex\");\n  sessions.set(sid, username);\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; Path=/`);\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const username = sessions.get(cookie(req, \"sid\")); return username ? send(res, 200, { username }) : send(res, 401, { error: \"Log in first\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-cookie"
    ],
    "estimatedMinutes": 5,
    "projectId": "sessions-sari-sari"
  },
  {
    "id": "sec-sessions-sari-sari-3",
    "index": 23,
    "task": "You will add SameSite=Lax to the cookie. This tells the browser not to send the cookie on most requests from other websites. This protects the user's login from being used by a different site. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "samesite",
        "label": "The cookie says SameSite=Lax",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "header": {
          "name": "set-cookie",
          "value": "SameSite=Lax"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server adds SameSite=Lax to the cookie header. This tells the browser to ignore the cookie on requests from other sites."
      },
      {
        "level": 2,
        "text": "Change the Set-Cookie line in the login route, in server.js.\n\nIn server.js:\n```\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  const sid = randomBytes(16).toString(\"hex\");\n  sessions.set(sid, username);\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/`);\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const username = sessions.get(cookie(req, \"sid\")); return username ? send(res, 200, { username }) : send(res, 401, { error: \"Log in first\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-samesite"
    ],
    "estimatedMinutes": 3,
    "projectId": "sessions-sari-sari"
  },
  {
    "id": "sec-sessions-sari-sari-4",
    "index": 24,
    "task": "You will add a logout route. When the user posts to /logout, the server deletes the session. It also clears the cookie so the browser stops sending it. This makes sure the login is truly gone. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (req.url === \"/logout\" && req.method === \"POST\") { sessions.delete(cookie(req, \"sid\")); res.setHeader(\"Set-Cookie\", \"sid=; Max-Age=0; Path=/\"); return send(res, 200, { ok: true }); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "logout",
        "label": "After logout, the old cookie no longer works",
        "kind": "local-http",
        "file": "server.js",
        "cookies": true,
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/logout",
            "body": "{}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/me"
          }
        ],
        "status": 401
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server deletes the session from memory and clears the cookie. This ensures the user is truly logged out, even if the browser still has the cookie."
      },
      {
        "level": 2,
        "text": "Add the route after /me, in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/logout\" && req.method === \"POST\") { sessions.delete(cookie(req, \"sid\")); res.setHeader(\"Set-Cookie\", \"sid=; Max-Age=0; Path=/\"); return send(res, 200, { ok: true }); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  const sid = randomBytes(16).toString(\"hex\");\n  sessions.set(sid, username);\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/`);\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const username = sessions.get(cookie(req, \"sid\")); return username ? send(res, 200, { username }) : send(res, 401, { error: \"Log in first\" }); }\n  if (req.url === \"/logout\" && req.method === \"POST\") { sessions.delete(cookie(req, \"sid\")); res.setHeader(\"Set-Cookie\", \"sid=; Max-Age=0; Path=/\"); return send(res, 200, { ok: true }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-logout"
    ],
    "estimatedMinutes": 5,
    "projectId": "sessions-sari-sari"
  },
  {
    "id": "sec-sessions-sari-sari-5",
    "index": 25,
    "task": "You will add a session expiry. The server stores when the session ends. If the session has expired, the server sends a 401 error. This stops users from using a forgotten login. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\nconst minutes = Number(process.env.SESSION_MINUTES ?? 30);\n  sessions.set(sid, { username, expires: Date.now() + minutes * 60 * 1000 });\n  if (req.url === \"/me\") { const session = sessions.get(cookie(req, \"sid\")); return session && session.expires > Date.now() ? send(res, 200, { username: session.username }) : send(res, 401, { error: \"Log in first\" }); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "expired",
        "label": "With SESSION_MINUTES=0, the session has already expired",
        "kind": "local-http",
        "file": "server.js",
        "cookies": true,
        "env": {
          "SESSION_MINUTES": "0"
        },
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/me"
          }
        ],
        "status": 401
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server stores the session's expiry time. When the user asks for /me, it checks if the session is still active. If not, it sends a 401 error."
      },
      {
        "level": 2,
        "text": "Add the minutes setting, expiry time, and check in the /me route, in server.js.\n\nIn server.js:\n```\nconst minutes = Number(process.env.SESSION_MINUTES ?? 30);\n  sessions.set(sid, { username, expires: Date.now() + minutes * 60 * 1000 });\n  if (req.url === \"/me\") { const session = sessions.get(cookie(req, \"sid\")); return session && session.expires > Date.now() ? send(res, 200, { username: session.username }) : send(res, 401, { error: \"Log in first\" }); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nconst minutes = Number(process.env.SESSION_MINUTES ?? 30);\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  const sid = randomBytes(16).toString(\"hex\");\n  sessions.set(sid, { username, expires: Date.now() + minutes * 60 * 1000 });\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/`);\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const session = sessions.get(cookie(req, \"sid\")); return session && session.expires > Date.now() ? send(res, 200, { username: session.username }) : send(res, 401, { error: \"Log in first\" }); }\n  if (req.url === \"/logout\" && req.method === \"POST\") { sessions.delete(cookie(req, \"sid\")); res.setHeader(\"Set-Cookie\", \"sid=; Max-Age=0; Path=/\"); return send(res, 200, { ok: true }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-session-expiry"
    ],
    "estimatedMinutes": 6,
    "projectId": "sessions-sari-sari"
  }
] satisfies typeof authSecurityCourse.steps));

// Validated local authoring batch: sessions-sari-sari.
authSecurityCourse.steps.push(...([
  {
    "id": "sec-sessions-sari-sari-6",
    "index": 26,
    "task": "Change the Set-Cookie line to include Max-Age. This tells the browser to forget the cookie after 1800 seconds (30 minutes). The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${minutes * 60}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "maxage",
        "label": "The cookie says Max-Age=1800",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "header": {
          "name": "set-cookie",
          "value": "Max-Age=1800"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Max-Age sets how long the browser keeps the cookie before deleting it."
      },
      {
        "level": 2,
        "text": "Add Max-Age to the Set-Cookie line in server.js.\n\nIn server.js:\n```\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${minutes * 60}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nconst minutes = Number(process.env.SESSION_MINUTES ?? 30);\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  const sid = randomBytes(16).toString(\"hex\");\n  sessions.set(sid, { username, expires: Date.now() + minutes * 60 * 1000 });\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${minutes * 60}`);\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const session = sessions.get(cookie(req, \"sid\")); return session && session.expires > Date.now() ? send(res, 200, { username: session.username }) : send(res, 401, { error: \"Log in first\" }); }\n  if (req.url === \"/logout\" && req.method === \"POST\") { sessions.delete(cookie(req, \"sid\")); res.setHeader(\"Set-Cookie\", \"sid=; Max-Age=0; Path=/\"); return send(res, 200, { ok: true }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-max-age"
    ],
    "estimatedMinutes": 3,
    "projectId": "sessions-sari-sari"
  },
  {
    "id": "sec-sessions-sari-sari-7",
    "index": 27,
    "task": "Add a helper function to check if a user is logged in. Then, add a route to protect /orders. This route answers 401 if the user is not logged in, and 200 with orders if they are. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\nfunction currentUser(req) { const session = sessions.get(cookie(req, \"sid\")); return session && session.expires > Date.now() ? session.username : null; }\n  if (req.url === \"/orders\") { const username = currentUser(req); return username ? send(res, 200, { owner: username, orders: [] }) : send(res, 401, { error: \"Log in first\" }); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "closed",
        "label": "GET /orders without a session answers 401",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/orders"
          }
        ],
        "status": 401
      },
      {
        "id": "open",
        "label": "After logging in, GET /orders answers ana's orders",
        "kind": "local-http",
        "file": "server.js",
        "cookies": true,
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/orders"
          }
        ],
        "bodyContains": "\"owner\":\"ana\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "A protected route checks if the user has a valid session before answering."
      },
      {
        "level": 2,
        "text": "Add the helper and route after the login route in server.js.\n\nIn server.js:\n```\nfunction currentUser(req) { const session = sessions.get(cookie(req, \"sid\")); return session && session.expires > Date.now() ? session.username : null; }\n  if (req.url === \"/orders\") { const username = currentUser(req); return username ? send(res, 200, { owner: username, orders: [] }) : send(res, 401, { error: \"Log in first\" }); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nconst minutes = Number(process.env.SESSION_MINUTES ?? 30);\nfunction currentUser(req) { const session = sessions.get(cookie(req, \"sid\")); return session && session.expires > Date.now() ? session.username : null; }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  const sid = randomBytes(16).toString(\"hex\");\n  sessions.set(sid, { username, expires: Date.now() + minutes * 60 * 1000 });\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${minutes * 60}`);\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const session = sessions.get(cookie(req, \"sid\")); return session && session.expires > Date.now() ? send(res, 200, { username: session.username }) : send(res, 401, { error: \"Log in first\" }); }\n  if (req.url === \"/logout\" && req.method === \"POST\") { sessions.delete(cookie(req, \"sid\")); res.setHeader(\"Set-Cookie\", \"sid=; Max-Age=0; Path=/\"); return send(res, 200, { ok: true }); }\n  if (req.url === \"/orders\") { const username = currentUser(req); return username ? send(res, 200, { owner: username, orders: [] }) : send(res, 401, { error: \"Log in first\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-protected-route"
    ],
    "estimatedMinutes": 5,
    "projectId": "sessions-sari-sari"
  },
  {
    "id": "sec-sessions-sari-sari-8",
    "index": 28,
    "task": "Change the Set-Cookie line to add Secure if the app is in production. This tells the browser to send the cookie only over HTTPS. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${minutes * 60}${process.env.NODE_ENV === \"production\" ? \"; Secure\" : \"\"}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "secure",
        "label": "In production the cookie says Secure",
        "kind": "local-http",
        "file": "server.js",
        "env": {
          "NODE_ENV": "production"
        },
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "header": {
          "name": "set-cookie",
          "value": "Secure"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Secure cookies only work over HTTPS, not plain HTTP."
      },
      {
        "level": 2,
        "text": "Add Secure to the Set-Cookie line in server.js, but only if NODE_ENV is production.\n\nIn server.js:\n```\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${minutes * 60}${process.env.NODE_ENV === \"production\" ? \"; Secure\" : \"\"}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nconst minutes = Number(process.env.SESSION_MINUTES ?? 30);\nfunction currentUser(req) { const session = sessions.get(cookie(req, \"sid\")); return session && session.expires > Date.now() ? session.username : null; }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  const sid = randomBytes(16).toString(\"hex\");\n  sessions.set(sid, { username, expires: Date.now() + minutes * 60 * 1000 });\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${minutes * 60}${process.env.NODE_ENV === \"production\" ? \"; Secure\" : \"\"}`);\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const session = sessions.get(cookie(req, \"sid\")); return session && session.expires > Date.now() ? send(res, 200, { username: session.username }) : send(res, 401, { error: \"Log in first\" }); }\n  if (req.url === \"/logout\" && req.method === \"POST\") { sessions.delete(cookie(req, \"sid\")); res.setHeader(\"Set-Cookie\", \"sid=; Max-Age=0; Path=/\"); return send(res, 200, { ok: true }); }\n  if (req.url === \"/orders\") { const username = currentUser(req); return username ? send(res, 200, { owner: username, orders: [] }) : send(res, 401, { error: \"Log in first\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-secure-cookie"
    ],
    "estimatedMinutes": 4,
    "projectId": "sessions-sari-sari"
  },
  {
    "id": "sec-sessions-sari-sari-9",
    "index": 29,
    "task": "Store a CSRF token with each session. Add a /csrf route to get the token. Then, check the token in /logout. This stops fake logout requests. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  sessions.set(sid, { username, expires: Date.now() + minutes * 60 * 1000, csrf: randomBytes(16).toString(\"hex\") });\n  if (req.url === \"/csrf\") { const session = sessions.get(cookie(req, \"sid\")); return session ? send(res, 200, { csrf: session.csrf }) : send(res, 401, { error: \"Log in first\" }); }\n  if (req.url === \"/logout\" && req.method === \"POST\") { const session = sessions.get(cookie(req, \"sid\")); if (!session || req.headers[\"x-csrf-token\"] !== session.csrf) return send(res, 403, { error: \"Missing or wrong CSRF token\" }); sessions.delete(cookie(req, \"sid\")); res.setHeader(\"Set-Cookie\", \"sid=; Max-Age=0; Path=/\"); return send(res, 200, { ok: true }); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "forged",
        "label": "A logout without the token answers 403",
        "kind": "local-http",
        "file": "server.js",
        "cookies": true,
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/logout",
            "body": "{}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 403
      },
      {
        "id": "real",
        "label": "A logout with the token answers 200",
        "kind": "local-http",
        "file": "server.js",
        "cookies": true,
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/csrf"
          },
          {
            "method": "POST",
            "path": "/logout",
            "body": "{}",
            "headers": {
              "Content-Type": "application/json"
            },
            "fromPrevious": {
              "header": "X-CSRF-Token",
              "field": "csrf"
            }
          }
        ],
        "status": 200
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "A CSRF token is a secret value that stops fake requests from other sites."
      },
      {
        "level": 2,
        "text": "Add the token to the session, add the /csrf route, and check it in /logout.\n\nIn server.js:\n```\n  sessions.set(sid, { username, expires: Date.now() + minutes * 60 * 1000, csrf: randomBytes(16).toString(\"hex\") });\n  if (req.url === \"/csrf\") { const session = sessions.get(cookie(req, \"sid\")); return session ? send(res, 200, { csrf: session.csrf }) : send(res, 401, { error: \"Log in first\" }); }\n  if (req.url === \"/logout\" && req.method === \"POST\") { const session = sessions.get(cookie(req, \"sid\")); if (!session || req.headers[\"x-csrf-token\"] !== session.csrf) return send(res, 403, { error: \"Missing or wrong CSRF token\" }); sessions.delete(cookie(req, \"sid\")); res.setHeader(\"Set-Cookie\", \"sid=; Max-Age=0; Path=/\"); return send(res, 200, { ok: true }); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nconst minutes = Number(process.env.SESSION_MINUTES ?? 30);\nfunction currentUser(req) { const session = sessions.get(cookie(req, \"sid\")); return session && session.expires > Date.now() ? session.username : null; }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  const sid = randomBytes(16).toString(\"hex\");\n  sessions.set(sid, { username, expires: Date.now() + minutes * 60 * 1000, csrf: randomBytes(16).toString(\"hex\") });\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${minutes * 60}${process.env.NODE_ENV === \"production\" ? \"; Secure\" : \"\"}`);\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const session = sessions.get(cookie(req, \"sid\")); return session && session.expires > Date.now() ? send(res, 200, { username: session.username }) : send(res, 401, { error: \"Log in first\" }); }\n  if (req.url === \"/csrf\") { const session = sessions.get(cookie(req, \"sid\")); return session ? send(res, 200, { csrf: session.csrf }) : send(res, 401, { error: \"Log in first\" }); }\n  if (req.url === \"/logout\" && req.method === \"POST\") { const session = sessions.get(cookie(req, \"sid\")); if (!session || req.headers[\"x-csrf-token\"] !== session.csrf) return send(res, 403, { error: \"Missing or wrong CSRF token\" }); sessions.delete(cookie(req, \"sid\")); res.setHeader(\"Set-Cookie\", \"sid=; Max-Age=0; Path=/\"); return send(res, 200, { ok: true }); }\n  if (req.url === \"/orders\") { const username = currentUser(req); return username ? send(res, 200, { owner: username, orders: [] }) : send(res, 401, { error: \"Log in first\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-csrf"
    ],
    "estimatedMinutes": 6,
    "projectId": "sessions-sari-sari"
  },
  {
    "id": "sec-sessions-sari-sari-10",
    "index": 30,
    "task": "Add a route to report how many sessions the user has open. This helps the user know if they're logged in from multiple places. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (req.url === \"/sessions\") { const username = currentUser(req); return username ? send(res, 200, { active: [...sessions.values()].filter((session) => session.username === username).length }) : send(res, 401, { error: \"Log in first\" }); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "After two logins, GET /sessions answers 2",
        "kind": "local-http",
        "file": "server.js",
        "cookies": true,
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/sessions"
          }
        ],
        "bodyContains": "\"active\":2"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Count sessions by filtering the sessions object for the user's name."
      },
      {
        "level": 2,
        "text": "Add the route after the /orders route in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/sessions\") { const username = currentUser(req); return username ? send(res, 200, { active: [...sessions.values()].filter((session) => session.username === username).length }) : send(res, 401, { error: \"Log in first\" }); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nfunction cookie(req, name) { return (req.headers.cookie ?? \"\").split(/; */).map((part) => part.split(\"=\")).find(([key]) => key === name)?.[1]; }\nconst users = new Map([[\"ana\", hashPassword(\"tindahan2026\")]]);\nconst sessions = new Map();\nconst minutes = Number(process.env.SESSION_MINUTES ?? 30);\nfunction currentUser(req) { const session = sessions.get(cookie(req, \"sid\")); return session && session.expires > Date.now() ? session.username : null; }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: \"Wrong username or password\" });\n  const sid = randomBytes(16).toString(\"hex\");\n  sessions.set(sid, { username, expires: Date.now() + minutes * 60 * 1000, csrf: randomBytes(16).toString(\"hex\") });\n  res.setHeader(\"Set-Cookie\", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${minutes * 60}${process.env.NODE_ENV === \"production\" ? \"; Secure\" : \"\"}`);\n  return send(res, 200, { username });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const session = sessions.get(cookie(req, \"sid\")); return session && session.expires > Date.now() ? send(res, 200, { username: session.username }) : send(res, 401, { error: \"Log in first\" }); }\n  if (req.url === \"/csrf\") { const session = sessions.get(cookie(req, \"sid\")); return session ? send(res, 200, { csrf: session.csrf }) : send(res, 401, { error: \"Log in first\" }); }\n  if (req.url === \"/logout\" && req.method === \"POST\") { const session = sessions.get(cookie(req, \"sid\")); if (!session || req.headers[\"x-csrf-token\"] !== session.csrf) return send(res, 403, { error: \"Missing or wrong CSRF token\" }); sessions.delete(cookie(req, \"sid\")); res.setHeader(\"Set-Cookie\", \"sid=; Max-Age=0; Path=/\"); return send(res, 200, { ok: true }); }\n  if (req.url === \"/orders\") { const username = currentUser(req); return username ? send(res, 200, { owner: username, orders: [] }) : send(res, 401, { error: \"Log in first\" }); }\n  if (req.url === \"/sessions\") { const username = currentUser(req); return username ? send(res, 200, { active: [...sessions.values()].filter((session) => session.username === username).length }) : send(res, 401, { error: \"Log in first\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "sessions-sari-sari"
  }
] satisfies typeof authSecurityCourse.steps));

// Validated local authoring batch: tokens-sari-sari.
authSecurityCourse.steps.push(...([
  {
    "id": "sec-tokens-sari-sari-1",
    "index": 31,
    "task": "Add a secret and a sign function above login. Change the last line of login to return a signed token. This lets the server prove it issued the token. The code below shows what to add. Run the checker and paste its report.\n\nIn server.js:\n```\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\n  return send(res, 200, { token: sign({ username }) });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "token",
        "label": "Logging in answers a token",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 200,
        "bodyContains": "\"token\":\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The token is like a receipt that proves you logged in."
      },
      {
        "level": 2,
        "text": "Add the code above the login function, then change the last line to return the token.\n\nIn server.js:\n```\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\n  return send(res, 200, { token: sign({ username }) });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-token"
    ],
    "estimatedMinutes": 4,
    "projectId": "tokens-sari-sari"
  },
  {
    "id": "sec-tokens-sari-sari-2",
    "index": 32,
    "task": "Add a verifyToken function and a /me route. This checks if a token is real and valid. The code below shows what to add. Run the checker and paste its report.\n\nIn server.js:\n```\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); if (!body || signature !== createHmac(\"sha256\", secret).update(body).digest(\"base64url\")) return null; return JSON.parse(Buffer.from(body, \"base64url\").toString()); }\n  if (req.url === \"/me\") { const payload = verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); return payload ? send(res, 200, payload) : send(res, 401, { error: \"Send a valid token\" }); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "me",
        "label": "GET /me with the token answers ana",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/me",
            "fromPrevious": {
              "header": "Authorization",
              "field": "token",
              "prefix": "Bearer "
            }
          }
        ],
        "status": 200,
        "bodyContains": "\"username\":\"ana\""
      },
      {
        "id": "forged",
        "label": "A token with a fake signature answers 401",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/me",
            "headers": {
              "Authorization": "Bearer eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZXhwIjo5OTk5OTk5OTk5OTk5fQ.fake"
            }
          }
        ],
        "status": 401
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The verifyToken function checks if the token's signature matches its data."
      },
      {
        "level": 2,
        "text": "Add the code after the sign function, then add the /me route below it.\n\nIn server.js:\n```\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); if (!body || signature !== createHmac(\"sha256\", secret).update(body).digest(\"base64url\")) return null; return JSON.parse(Buffer.from(body, \"base64url\").toString()); }\n  if (req.url === \"/me\") { const payload = verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); return payload ? send(res, 200, payload) : send(res, 401, { error: \"Send a valid token\" }); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); if (!body || signature !== createHmac(\"sha256\", secret).update(body).digest(\"base64url\")) return null; return JSON.parse(Buffer.from(body, \"base64url\").toString()); }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const payload = verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); return payload ? send(res, 200, payload) : send(res, 401, { error: \"Send a valid token\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-hmac"
    ],
    "estimatedMinutes": 5,
    "projectId": "tokens-sari-sari"
  },
  {
    "id": "sec-tokens-sari-sari-3",
    "index": 33,
    "task": "Replace verifyToken with a version that uses timingSafeEqual. This stops attackers from guessing tokens by watching how long the server takes to answer. The code below shows what to add. Run the checker and paste its report.\n\nIn server.js:\n```\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; return JSON.parse(Buffer.from(body, \"base64url\").toString()); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "safe",
        "label": "verifyToken compares with timingSafeEqual",
        "kind": "local-file-contains",
        "path": "server.js",
        "value": "timingSafeEqual(given, expected)"
      },
      {
        "id": "still",
        "label": "Real tokens still work",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/me",
            "fromPrevious": {
              "header": "Authorization",
              "field": "token",
              "prefix": "Bearer "
            }
          }
        ],
        "status": 200
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "timingSafeEqual compares tokens in the same time, no matter what's wrong."
      },
      {
        "level": 2,
        "text": "Replace the whole verifyToken function with the new code.\n\nIn server.js:\n```\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; return JSON.parse(Buffer.from(body, \"base64url\").toString()); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; return JSON.parse(Buffer.from(body, \"base64url\").toString()); }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const payload = verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); return payload ? send(res, 200, payload) : send(res, 401, { error: \"Send a valid token\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-timing-safe"
    ],
    "estimatedMinutes": 6,
    "projectId": "tokens-sari-sari"
  },
  {
    "id": "sec-tokens-sari-sari-4",
    "index": 34,
    "task": "Add a TOKEN_MINUTES setting, add an exp field to the token, and check it in verifyToken. This lets tokens expire after a time. The code below shows what to add. Run the checker and paste its report.\n\nIn server.js:\n```\nconst minutes = Number(process.env.TOKEN_MINUTES ?? 60);\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; const payload = JSON.parse(Buffer.from(body, \"base64url\").toString()); return payload.exp > Date.now() ? payload : null; }\n  return send(res, 200, { token: sign({ username, exp: Date.now() + minutes * 60 * 1000 }) });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "expired",
        "label": "With TOKEN_MINUTES=0, a new token is already expired",
        "kind": "local-http",
        "file": "server.js",
        "env": {
          "TOKEN_MINUTES": "0"
        },
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/me",
            "fromPrevious": {
              "header": "Authorization",
              "field": "token",
              "prefix": "Bearer "
            }
          }
        ],
        "status": 401
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The exp field tells the server when the token stops working."
      },
      {
        "level": 2,
        "text": "Add the minutes setting, then update the token and verify function.\n\nIn server.js:\n```\nconst minutes = Number(process.env.TOKEN_MINUTES ?? 60);\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; const payload = JSON.parse(Buffer.from(body, \"base64url\").toString()); return payload.exp > Date.now() ? payload : null; }\n  return send(res, 200, { token: sign({ username, exp: Date.now() + minutes * 60 * 1000 }) });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nconst minutes = Number(process.env.TOKEN_MINUTES ?? 60);\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; const payload = JSON.parse(Buffer.from(body, \"base64url\").toString()); return payload.exp > Date.now() ? payload : null; }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, exp: Date.now() + minutes * 60 * 1000 }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const payload = verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); return payload ? send(res, 200, payload) : send(res, 401, { error: \"Send a valid token\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-token-expiry"
    ],
    "estimatedMinutes": 7,
    "projectId": "tokens-sari-sari"
  },
  {
    "id": "sec-tokens-sari-sari-5",
    "index": 35,
    "task": "Add one line after the secret line to check if TOKEN_SECRET is set in production. If not, the server stops. This stops attackers from using fake secrets. The code below shows what to add. Run the checker and paste its report.\n\nIn server.js:\n```\nif (process.env.NODE_ENV === \"production\" && !process.env.TOKEN_SECRET) { console.error(\"TOKEN_SECRET is required in production\"); process.exit(1); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "stop",
        "label": "In production without TOKEN_SECRET the server stops with exit code 1",
        "kind": "local-node-exit-code",
        "file": "server.js",
        "env": {
          "NODE_ENV": "production"
        },
        "code": 1
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server must have a real secret to run in production."
      },
      {
        "level": 2,
        "text": "Add the line right after the secret line, before any other code.\n\nIn server.js:\n```\nif (process.env.NODE_ENV === \"production\" && !process.env.TOKEN_SECRET) { console.error(\"TOKEN_SECRET is required in production\"); process.exit(1); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nif (process.env.NODE_ENV === \"production\" && !process.env.TOKEN_SECRET) { console.error(\"TOKEN_SECRET is required in production\"); process.exit(1); }\nconst minutes = Number(process.env.TOKEN_MINUTES ?? 60);\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; const payload = JSON.parse(Buffer.from(body, \"base64url\").toString()); return payload.exp > Date.now() ? payload : null; }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, exp: Date.now() + minutes * 60 * 1000 }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const payload = verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); return payload ? send(res, 200, payload) : send(res, 401, { error: \"Send a valid token\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-secret-config"
    ],
    "estimatedMinutes": 3,
    "projectId": "tokens-sari-sari"
  }
] satisfies typeof authSecurityCourse.steps));

// Validated local authoring batch: tokens-sari-sari.
authSecurityCourse.steps.push(...([
  {
    "id": "sec-tokens-sari-sari-6",
    "index": 36,
    "task": "You change the last line of the login route. The code below adds the user's role to the token. This lets the server know what kind of access the user has. For example, a member can buy, but an admin can change prices. The token will expire after 10 minutes.\n\nIn server.js:\n```\n  return send(res, 200, { token: sign({ username, role: user.role, exp: Date.now() + minutes * 60 * 1000 }) });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "role",
        "label": "ana's token says role member",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/me",
            "fromPrevious": {
              "header": "Authorization",
              "field": "token",
              "prefix": "Bearer "
            }
          }
        ],
        "bodyContains": "\"role\":\"member\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The token must include the user's role so the server knows what to allow."
      },
      {
        "level": 2,
        "text": "Add the code right after the line that sends the token.\n\nIn server.js:\n```\n  return send(res, 200, { token: sign({ username, role: user.role, exp: Date.now() + minutes * 60 * 1000 }) });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nif (process.env.NODE_ENV === \"production\" && !process.env.TOKEN_SECRET) { console.error(\"TOKEN_SECRET is required in production\"); process.exit(1); }\nconst minutes = Number(process.env.TOKEN_MINUTES ?? 60);\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; const payload = JSON.parse(Buffer.from(body, \"base64url\").toString()); return payload.exp > Date.now() ? payload : null; }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, role: user.role, exp: Date.now() + minutes * 60 * 1000 }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const payload = verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); return payload ? send(res, 200, payload) : send(res, 401, { error: \"Send a valid token\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-role"
    ],
    "estimatedMinutes": 3,
    "projectId": "tokens-sari-sari"
  },
  {
    "id": "sec-tokens-sari-sari-7",
    "index": 37,
    "task": "You add a helper function called tokenUser. This checks if a token is valid. Then you add an /admin route. If the user is not an admin, the server says 403. This stops non-admins from changing prices. Admins get 200 to show they can access the route.\n\nIn server.js:\n```\nfunction tokenUser(req) { return verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); }\n  if (req.url === \"/admin\") { const user = tokenUser(req); if (!user) return send(res, 401, { error: \"Send a valid token\" }); if (user.role !== \"admin\") return send(res, 403, { error: \"Admins only\" }); return send(res, 200, { report: \"All good\" }); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "member",
        "label": "ana gets 403 at /admin",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/admin",
            "fromPrevious": {
              "header": "Authorization",
              "field": "token",
              "prefix": "Bearer "
            }
          }
        ],
        "status": 403
      },
      {
        "id": "admin",
        "label": "admin gets 200 at /admin",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"admin\",\"password\":\"admin-pass-2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/admin",
            "fromPrevious": {
              "header": "Authorization",
              "field": "token",
              "prefix": "Bearer "
            }
          }
        ],
        "status": 200
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The tokenUser helper checks if the token is valid and gets the user's role."
      },
      {
        "level": 2,
        "text": "Add the code after the login route, before the /admin route.\n\nIn server.js:\n```\nfunction tokenUser(req) { return verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); }\n  if (req.url === \"/admin\") { const user = tokenUser(req); if (!user) return send(res, 401, { error: \"Send a valid token\" }); if (user.role !== \"admin\") return send(res, 403, { error: \"Admins only\" }); return send(res, 200, { report: \"All good\" }); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nif (process.env.NODE_ENV === \"production\" && !process.env.TOKEN_SECRET) { console.error(\"TOKEN_SECRET is required in production\"); process.exit(1); }\nconst minutes = Number(process.env.TOKEN_MINUTES ?? 60);\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; const payload = JSON.parse(Buffer.from(body, \"base64url\").toString()); return payload.exp > Date.now() ? payload : null; }\nfunction tokenUser(req) { return verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, role: user.role, exp: Date.now() + minutes * 60 * 1000 }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const payload = verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); return payload ? send(res, 200, payload) : send(res, 401, { error: \"Send a valid token\" }); }\n  if (req.url === \"/admin\") { const user = tokenUser(req); if (!user) return send(res, 401, { error: \"Send a valid token\" }); if (user.role !== \"admin\") return send(res, 403, { error: \"Admins only\" }); return send(res, 200, { report: \"All good\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-forbidden"
    ],
    "estimatedMinutes": 5,
    "projectId": "tokens-sari-sari"
  },
  {
    "id": "sec-tokens-sari-sari-8",
    "index": 38,
    "task": "You change the /me route. If a user has no token, the server adds a WWW-Authenticate header. This tells the user to send a token next time. This helps the user know how to log in again.\n\nIn server.js:\n```\n  if (req.url === \"/me\") { const payload = tokenUser(req); if (!payload) res.setHeader(\"WWW-Authenticate\", \"Bearer\"); return payload ? send(res, 200, payload) : send(res, 401, { error: \"Send a valid token\" }); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "hint",
        "label": "GET /me without a token sends WWW-Authenticate: Bearer",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/me"
          }
        ],
        "status": 401,
        "header": {
          "name": "www-authenticate",
          "value": "Bearer"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server must tell the user what kind of token to send next time."
      },
      {
        "level": 2,
        "text": "Add the code right after the tokenUser check in the /me route.\n\nIn server.js:\n```\n  if (req.url === \"/me\") { const payload = tokenUser(req); if (!payload) res.setHeader(\"WWW-Authenticate\", \"Bearer\"); return payload ? send(res, 200, payload) : send(res, 401, { error: \"Send a valid token\" }); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nif (process.env.NODE_ENV === \"production\" && !process.env.TOKEN_SECRET) { console.error(\"TOKEN_SECRET is required in production\"); process.exit(1); }\nconst minutes = Number(process.env.TOKEN_MINUTES ?? 60);\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; const payload = JSON.parse(Buffer.from(body, \"base64url\").toString()); return payload.exp > Date.now() ? payload : null; }\nfunction tokenUser(req) { return verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, role: user.role, exp: Date.now() + minutes * 60 * 1000 }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const payload = tokenUser(req); if (!payload) res.setHeader(\"WWW-Authenticate\", \"Bearer\"); return payload ? send(res, 200, payload) : send(res, 401, { error: \"Send a valid token\" }); }\n  if (req.url === \"/admin\") { const user = tokenUser(req); if (!user) return send(res, 401, { error: \"Send a valid token\" }); if (user.role !== \"admin\") return send(res, 403, { error: \"Admins only\" }); return send(res, 200, { report: \"All good\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-www-authenticate"
    ],
    "estimatedMinutes": 4,
    "projectId": "tokens-sari-sari"
  },
  {
    "id": "sec-tokens-sari-sari-9",
    "index": 39,
    "task": "You add a revoked set to track cancelled tokens. You change the tokenUser helper to check if a token is revoked. You add a /logout route that adds the token to the revoked set. This stops the token from working after logout, even if it hasn't expired.\n\nIn server.js:\n```\nconst revoked = new Set();\nfunction tokenUser(req) { const token = (req.headers.authorization ?? \"\").replace(\"Bearer \", \"\"); return revoked.has(token) ? null : verifyToken(token); }\n  if (req.url === \"/logout\" && req.method === \"POST\") { revoked.add((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); return send(res, 200, { ok: true }); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "revoked",
        "label": "After logout, the same token answers 401",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/logout",
            "body": "{}",
            "headers": {
              "Content-Type": "application/json"
            },
            "fromPrevious": {
              "header": "Authorization",
              "field": "token",
              "prefix": "Bearer "
            }
          },
          {
            "method": "GET",
            "path": "/me",
            "fromPrevious": {
              "header": "Authorization",
              "field": "token",
              "prefix": "Bearer "
            }
          }
        ],
        "status": 401
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The revoked set keeps a list of tokens that should not work anymore."
      },
      {
        "level": 2,
        "text": "Add the revoked set at the top, then change tokenUser, then add the /logout route.\n\nIn server.js:\n```\nconst revoked = new Set();\nfunction tokenUser(req) { const token = (req.headers.authorization ?? \"\").replace(\"Bearer \", \"\"); return revoked.has(token) ? null : verifyToken(token); }\n  if (req.url === \"/logout\" && req.method === \"POST\") { revoked.add((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); return send(res, 200, { ok: true }); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nif (process.env.NODE_ENV === \"production\" && !process.env.TOKEN_SECRET) { console.error(\"TOKEN_SECRET is required in production\"); process.exit(1); }\nconst minutes = Number(process.env.TOKEN_MINUTES ?? 60);\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; const payload = JSON.parse(Buffer.from(body, \"base64url\").toString()); return payload.exp > Date.now() ? payload : null; }\nconst revoked = new Set();\nfunction tokenUser(req) { const token = (req.headers.authorization ?? \"\").replace(\"Bearer \", \"\"); return revoked.has(token) ? null : verifyToken(token); }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, role: user.role, exp: Date.now() + minutes * 60 * 1000 }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const payload = tokenUser(req); if (!payload) res.setHeader(\"WWW-Authenticate\", \"Bearer\"); return payload ? send(res, 200, payload) : send(res, 401, { error: \"Send a valid token\" }); }\n  if (req.url === \"/admin\") { const user = tokenUser(req); if (!user) return send(res, 401, { error: \"Send a valid token\" }); if (user.role !== \"admin\") return send(res, 403, { error: \"Admins only\" }); return send(res, 200, { report: \"All good\" }); }\n  if (req.url === \"/logout\" && req.method === \"POST\") { revoked.add((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); return send(res, 200, { ok: true }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-revocation"
    ],
    "estimatedMinutes": 6,
    "projectId": "tokens-sari-sari"
  },
  {
    "id": "sec-tokens-sari-sari-10",
    "index": 40,
    "task": "You add a check at the top of the handler. If a token is sent in the URL, the server says 400. This stops tokens from being saved in logs or shared links. Tokens must go in the Authorization header, not the URL.\n\nIn server.js:\n```\n  if (new URL(req.url, \"http://localhost\").searchParams.has(\"token\")) return send(res, 400, { error: \"Send tokens in the Authorization header, not the URL\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { message: `Welcome, ${username}` });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "url",
        "label": "GET /me?token=abc answers 400",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/me?token=abc"
          }
        ],
        "status": 400
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Tokens in URLs can be saved or shared, so they must not be there."
      },
      {
        "level": 2,
        "text": "Add the check right after the route starts, before any other code.\n\nIn server.js:\n```\n  if (new URL(req.url, \"http://localhost\").searchParams.has(\"token\")) return send(res, 400, { error: \"Send tokens in the Authorization header, not the URL\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nif (process.env.NODE_ENV === \"production\" && !process.env.TOKEN_SECRET) { console.error(\"TOKEN_SECRET is required in production\"); process.exit(1); }\nconst minutes = Number(process.env.TOKEN_MINUTES ?? 60);\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; const payload = JSON.parse(Buffer.from(body, \"base64url\").toString()); return payload.exp > Date.now() ? payload : null; }\nconst revoked = new Set();\nfunction tokenUser(req) { const token = (req.headers.authorization ?? \"\").replace(\"Bearer \", \"\"); return revoked.has(token) ? null : verifyToken(token); }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, role: user.role, exp: Date.now() + minutes * 60 * 1000 }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (new URL(req.url, \"http://localhost\").searchParams.has(\"token\")) return send(res, 400, { error: \"Send tokens in the Authorization header, not the URL\" });\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  if (req.url === \"/me\") { const payload = tokenUser(req); if (!payload) res.setHeader(\"WWW-Authenticate\", \"Bearer\"); return payload ? send(res, 200, payload) : send(res, 401, { error: \"Send a valid token\" }); }\n  if (req.url === \"/admin\") { const user = tokenUser(req); if (!user) return send(res, 401, { error: \"Send a valid token\" }); if (user.role !== \"admin\") return send(res, 403, { error: \"Admins only\" }); return send(res, 200, { report: \"All good\" }); }\n  if (req.url === \"/logout\" && req.method === \"POST\") { revoked.add((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); return send(res, 200, { ok: true }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-token-in-url"
    ],
    "estimatedMinutes": 3,
    "projectId": "tokens-sari-sari"
  }
] satisfies typeof authSecurityCourse.steps));

// Validated local authoring batch: access-sari-sari.
authSecurityCourse.steps.push(...([
  {
    "id": "sec-access-sari-sari-1",
    "index": 41,
    "task": "You will add a route to show notes. This route only shows notes that belong to the logged-in user. The code below goes after the login check. This matters because a user should only see their own notes, not everyone's. The checker will test if Ana sees only her own notes.\n\nIn server.js:\n```\n  if (req.url === \"/notes\" && req.method === \"GET\") return send(res, 200, notes.filter((note) => note.owner === user.username));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"ben\", { hash: hashPassword(\"ben-pass-2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst notes = [{ id: 1, owner: \"ana\", text: \"Sari-Sari Store supply list\", sharedWith: [\"ben\"] }, { id: 2, owner: \"ben\", text: \"Ben private plan\", sharedWith: [] }, { id: 3, owner: \"ana\", text: \"Ana budget\", sharedWith: [] }];\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; return JSON.parse(Buffer.from(body, \"base64url\").toString()); }\nfunction tokenUser(req) { return verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, role: user.role }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  const user = tokenUser(req);\n  if (!user) return send(res, 401, { error: \"Log in first\" });\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "own",
        "label": "ana sees only her two notes",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/notes",
            "fromPrevious": {
              "header": "Authorization",
              "field": "token",
              "prefix": "Bearer "
            }
          }
        ],
        "bodyContains": "[{\"id\":1,\"owner\":\"ana\",\"text\":\"Sari-Sari Store supply list\",\"sharedWith\":[\"ben\"]},{\"id\":3,\"owner\":\"ana\",\"text\":\"Ana budget\",\"sharedWith\":[]}]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think: Who should see what? Only the logged-in user's notes."
      },
      {
        "level": 2,
        "text": "Add the code after the login check in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/notes\" && req.method === \"GET\") return send(res, 200, notes.filter((note) => note.owner === user.username));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"ben\", { hash: hashPassword(\"ben-pass-2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst notes = [{ id: 1, owner: \"ana\", text: \"Sari-Sari Store supply list\", sharedWith: [\"ben\"] }, { id: 2, owner: \"ben\", text: \"Ben private plan\", sharedWith: [] }, { id: 3, owner: \"ana\", text: \"Ana budget\", sharedWith: [] }];\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; return JSON.parse(Buffer.from(body, \"base64url\").toString()); }\nfunction tokenUser(req) { return verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, role: user.role }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  const user = tokenUser(req);\n  if (!user) return send(res, 401, { error: \"Log in first\" });\n  if (req.url === \"/notes\" && req.method === \"GET\") return send(res, 200, notes.filter((note) => note.owner === user.username));\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-authorization"
    ],
    "estimatedMinutes": 3,
    "projectId": "access-sari-sari"
  },
  {
    "id": "sec-access-sari-sari-2",
    "index": 42,
    "task": "You will add code to check if a note belongs to the logged-in user. If not, return a 404 error. The code below goes after the login check. This matters because if someone guesses another person's note ID, they should not get it. The checker will test if Ana can't see Ben's note.\n\nIn server.js:\n```\n  const match = req.url.match(/^\\/notes\\/(\\d+)$/);\n  const note = match && notes.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return note && note.owner === user.username ? send(res, 200, note) : send(res, 404, { error: \"Note not found\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"ben\", { hash: hashPassword(\"ben-pass-2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst notes = [{ id: 1, owner: \"ana\", text: \"Sari-Sari Store supply list\", sharedWith: [\"ben\"] }, { id: 2, owner: \"ben\", text: \"Ben private plan\", sharedWith: [] }, { id: 3, owner: \"ana\", text: \"Ana budget\", sharedWith: [] }];\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; return JSON.parse(Buffer.from(body, \"base64url\").toString()); }\nfunction tokenUser(req) { return verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, role: user.role }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  const user = tokenUser(req);\n  if (!user) return send(res, 401, { error: \"Log in first\" });\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "other",
        "label": "ana asking for ben's note gets 404",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/notes/2",
            "fromPrevious": {
              "header": "Authorization",
              "field": "token",
              "prefix": "Bearer "
            }
          }
        ],
        "status": 404,
        "bodyContains": "Note not found"
      },
      {
        "id": "mine",
        "label": "ana can read her own note",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/notes/3",
            "fromPrevious": {
              "header": "Authorization",
              "field": "token",
              "prefix": "Bearer "
            }
          }
        ],
        "status": 200
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Check if the note's owner matches the logged-in user's username."
      },
      {
        "level": 2,
        "text": "Add the code after the login check in server.js.\n\nIn server.js:\n```\n  const match = req.url.match(/^\\/notes\\/(\\d+)$/);\n  const note = match && notes.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return note && note.owner === user.username ? send(res, 200, note) : send(res, 404, { error: \"Note not found\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"ben\", { hash: hashPassword(\"ben-pass-2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst notes = [{ id: 1, owner: \"ana\", text: \"Sari-Sari Store supply list\", sharedWith: [\"ben\"] }, { id: 2, owner: \"ben\", text: \"Ben private plan\", sharedWith: [] }, { id: 3, owner: \"ana\", text: \"Ana budget\", sharedWith: [] }];\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; return JSON.parse(Buffer.from(body, \"base64url\").toString()); }\nfunction tokenUser(req) { return verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, role: user.role }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  const user = tokenUser(req);\n  if (!user) return send(res, 401, { error: \"Log in first\" });\n  if (req.url === \"/notes\" && req.method === \"GET\") return send(res, 200, notes.filter((note) => note.owner === user.username));\n  const match = req.url.match(/^\\/notes\\/(\\d+)$/);\n  const note = match && notes.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return note && note.owner === user.username ? send(res, 200, note) : send(res, 404, { error: \"Note not found\" });\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-idor"
    ],
    "estimatedMinutes": 4,
    "projectId": "access-sari-sari"
  },
  {
    "id": "sec-access-sari-sari-3",
    "index": 43,
    "task": "You will add a route to let users update their own notes. The code below goes after the GET route. This matters because users should only change their own notes. The checker will test if Ana can't change Ben's note.\n\nIn server.js:\n```\n  if (match && req.method === \"PUT\") { if (!note || note.owner !== user.username) return send(res, 404, { error: \"Note not found\" }); Object.assign(note, await readJson(req)); return send(res, 200, note); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"ben\", { hash: hashPassword(\"ben-pass-2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst notes = [{ id: 1, owner: \"ana\", text: \"Sari-Sari Store supply list\", sharedWith: [\"ben\"] }, { id: 2, owner: \"ben\", text: \"Ben private plan\", sharedWith: [] }, { id: 3, owner: \"ana\", text: \"Ana budget\", sharedWith: [] }];\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; return JSON.parse(Buffer.from(body, \"base64url\").toString()); }\nfunction tokenUser(req) { return verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, role: user.role }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  const user = tokenUser(req);\n  if (!user) return send(res, 401, { error: \"Log in first\" });\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "other",
        "label": "ana cannot change ben's note",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "PUT",
            "path": "/notes/2",
            "body": "{\"text\":\"hacked\"}",
            "headers": {
              "Content-Type": "application/json"
            },
            "fromPrevious": {
              "header": "Authorization",
              "field": "token",
              "prefix": "Bearer "
            }
          }
        ],
        "status": 404,
        "bodyContains": "Note not found"
      },
      {
        "id": "mine",
        "label": "ana can change her own note",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "PUT",
            "path": "/notes/3",
            "body": "{\"text\":\"New budget\"}",
            "headers": {
              "Content-Type": "application/json"
            },
            "fromPrevious": {
              "header": "Authorization",
              "field": "token",
              "prefix": "Bearer "
            }
          }
        ],
        "bodyContains": "New budget"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Only let the user change a note if it belongs to them."
      },
      {
        "level": 2,
        "text": "Add the code after the GET route in server.js.\n\nIn server.js:\n```\n  if (match && req.method === \"PUT\") { if (!note || note.owner !== user.username) return send(res, 404, { error: \"Note not found\" }); Object.assign(note, await readJson(req)); return send(res, 200, note); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"ben\", { hash: hashPassword(\"ben-pass-2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst notes = [{ id: 1, owner: \"ana\", text: \"Sari-Sari Store supply list\", sharedWith: [\"ben\"] }, { id: 2, owner: \"ben\", text: \"Ben private plan\", sharedWith: [] }, { id: 3, owner: \"ana\", text: \"Ana budget\", sharedWith: [] }];\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; return JSON.parse(Buffer.from(body, \"base64url\").toString()); }\nfunction tokenUser(req) { return verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, role: user.role }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  const user = tokenUser(req);\n  if (!user) return send(res, 401, { error: \"Log in first\" });\n  if (req.url === \"/notes\" && req.method === \"GET\") return send(res, 200, notes.filter((note) => note.owner === user.username));\n  const match = req.url.match(/^\\/notes\\/(\\d+)$/);\n  const note = match && notes.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return note && note.owner === user.username ? send(res, 200, note) : send(res, 404, { error: \"Note not found\" });\n  if (match && req.method === \"PUT\") { if (!note || note.owner !== user.username) return send(res, 404, { error: \"Note not found\" }); Object.assign(note, await readJson(req)); return send(res, 200, note); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "access-sari-sari"
  },
  {
    "id": "sec-access-sari-sari-4",
    "index": 44,
    "task": "You will add a route to let users delete their own notes. The code below goes after the PUT route. This matters because users should only delete their own notes. The checker will test if Ana can't delete Ben's note.\n\nIn server.js:\n```\n  if (match && req.method === \"DELETE\") { if (!note || note.owner !== user.username) return send(res, 404, { error: \"Note not found\" }); notes.splice(notes.indexOf(note), 1); res.statusCode = 204; return res.end(); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"ben\", { hash: hashPassword(\"ben-pass-2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst notes = [{ id: 1, owner: \"ana\", text: \"Sari-Sari Store supply list\", sharedWith: [\"ben\"] }, { id: 2, owner: \"ben\", text: \"Ben private plan\", sharedWith: [] }, { id: 3, owner: \"ana\", text: \"Ana budget\", sharedWith: [] }];\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; return JSON.parse(Buffer.from(body, \"base64url\").toString()); }\nfunction tokenUser(req) { return verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, role: user.role }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  const user = tokenUser(req);\n  if (!user) return send(res, 401, { error: \"Log in first\" });\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "other",
        "label": "ana cannot delete ben's note",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "DELETE",
            "path": "/notes/2",
            "fromPrevious": {
              "header": "Authorization",
              "field": "token",
              "prefix": "Bearer "
            }
          }
        ],
        "status": 404,
        "bodyContains": "Note not found"
      },
      {
        "id": "mine",
        "label": "ana can delete her own note",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "DELETE",
            "path": "/notes/3",
            "fromPrevious": {
              "header": "Authorization",
              "field": "token",
              "prefix": "Bearer "
            }
          }
        ],
        "status": 204
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Only let the user delete a note if it belongs to them."
      },
      {
        "level": 2,
        "text": "Add the code after the PUT route in server.js.\n\nIn server.js:\n```\n  if (match && req.method === \"DELETE\") { if (!note || note.owner !== user.username) return send(res, 404, { error: \"Note not found\" }); notes.splice(notes.indexOf(note), 1); res.statusCode = 204; return res.end(); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"ben\", { hash: hashPassword(\"ben-pass-2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst notes = [{ id: 1, owner: \"ana\", text: \"Sari-Sari Store supply list\", sharedWith: [\"ben\"] }, { id: 2, owner: \"ben\", text: \"Ben private plan\", sharedWith: [] }, { id: 3, owner: \"ana\", text: \"Ana budget\", sharedWith: [] }];\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; return JSON.parse(Buffer.from(body, \"base64url\").toString()); }\nfunction tokenUser(req) { return verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, role: user.role }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  const user = tokenUser(req);\n  if (!user) return send(res, 401, { error: \"Log in first\" });\n  if (req.url === \"/notes\" && req.method === \"GET\") return send(res, 200, notes.filter((note) => note.owner === user.username));\n  const match = req.url.match(/^\\/notes\\/(\\d+)$/);\n  const note = match && notes.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return note && note.owner === user.username ? send(res, 200, note) : send(res, 404, { error: \"Note not found\" });\n  if (match && req.method === \"PUT\") { if (!note || note.owner !== user.username) return send(res, 404, { error: \"Note not found\" }); Object.assign(note, await readJson(req)); return send(res, 200, note); }\n  if (match && req.method === \"DELETE\") { if (!note || note.owner !== user.username) return send(res, 404, { error: \"Note not found\" }); notes.splice(notes.indexOf(note), 1); res.statusCode = 204; return res.end(); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "access-sari-sari"
  },
  {
    "id": "sec-access-sari-sari-5",
    "index": 45,
    "task": "You will add a route to create a new note. The code below goes after the list route. This matters because the owner of a new note must come from the logged-in user, not from the request body. The checker will test if a note posted by Ana belongs to Ana even if the body says Ben.\n\nIn server.js:\n```\n  if (req.url === \"/notes\" && req.method === \"POST\") { const data = await readJson(req); const created = { id: notes.length + 1, owner: user.username, text: String(data.text ?? \"\"), sharedWith: [] }; notes.push(created); return send(res, 201, created); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store security project.\nEvery user, password, and secret here is fake practice data.\n",
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"ben\", { hash: hashPassword(\"ben-pass-2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst notes = [{ id: 1, owner: \"ana\", text: \"Sari-Sari Store supply list\", sharedWith: [\"ben\"] }, { id: 2, owner: \"ben\", text: \"Ben private plan\", sharedWith: [] }, { id: 3, owner: \"ana\", text: \"Ana budget\", sharedWith: [] }];\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; return JSON.parse(Buffer.from(body, \"base64url\").toString()); }\nfunction tokenUser(req) { return verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, role: user.role }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  const user = tokenUser(req);\n  if (!user) return send(res, 401, { error: \"Log in first\" });\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "owner",
        "label": "A note posted by ana belongs to ana even if the body says ben",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/login",
            "body": "{\"username\":\"ana\",\"password\":\"tindahan2026\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "POST",
            "path": "/notes",
            "body": "{\"owner\":\"ben\",\"text\":\"Posted by Ana\"}",
            "headers": {
              "Content-Type": "application/json"
            },
            "fromPrevious": {
              "header": "Authorization",
              "field": "token",
              "prefix": "Bearer "
            }
          }
        ],
        "status": 201,
        "bodyContains": "\"owner\":\"ana\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Set the note's owner to the logged-in user's username, not from the request body."
      },
      {
        "level": 2,
        "text": "Add the code after the list route in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/notes\" && req.method === \"POST\") { const data = await readJson(req); const created = { id: notes.length + 1, owner: user.username, text: String(data.text ?? \"\"), sharedWith: [] }; notes.push(created); return send(res, 201, created); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { createHmac, randomBytes, scryptSync, timingSafeEqual } from \"node:crypto\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }\nfunction hashPassword(password) { const salt = randomBytes(16).toString(\"hex\"); return `${salt}:${scryptSync(password, salt, 32).toString(\"hex\")}`; }\nfunction verifyPassword(password, stored) { const [salt, hash] = stored.split(\":\"); return timingSafeEqual(Buffer.from(hash, \"hex\"), scryptSync(password, salt, 32)); }\nconst users = new Map([[\"ana\", { hash: hashPassword(\"tindahan2026\"), role: \"member\" }], [\"ben\", { hash: hashPassword(\"ben-pass-2026\"), role: \"member\" }], [\"admin\", { hash: hashPassword(\"admin-pass-2026\"), role: \"admin\" }]]);\nconst notes = [{ id: 1, owner: \"ana\", text: \"Sari-Sari Store supply list\", sharedWith: [\"ben\"] }, { id: 2, owner: \"ben\", text: \"Ben private plan\", sharedWith: [] }, { id: 3, owner: \"ana\", text: \"Ana budget\", sharedWith: [] }];\nconst secret = process.env.TOKEN_SECRET ?? \"dev-only-secret\";\nfunction sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString(\"base64url\"); return `${body}.${createHmac(\"sha256\", secret).update(body).digest(\"base64url\")}`; }\nfunction verifyToken(token) { const [body, signature] = String(token).split(\".\"); const expected = createHmac(\"sha256\", secret).update(body ?? \"\").digest(); const given = Buffer.from(signature ?? \"\", \"base64url\"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; return JSON.parse(Buffer.from(body, \"base64url\").toString()); }\nfunction tokenUser(req) { return verifyToken((req.headers.authorization ?? \"\").replace(\"Bearer \", \"\")); }\nasync function login(req, res) {\n  const { username, password } = await readJson(req);\n  const user = users.get(username);\n  if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: \"Wrong username or password\" });\n  return send(res, 200, { token: sign({ username, role: user.role }) });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/login\" && req.method === \"POST\") return login(req, res);\n  const user = tokenUser(req);\n  if (!user) return send(res, 401, { error: \"Log in first\" });\n  if (req.url === \"/notes\" && req.method === \"GET\") return send(res, 200, notes.filter((note) => note.owner === user.username));\n  if (req.url === \"/notes\" && req.method === \"POST\") { const data = await readJson(req); const created = { id: notes.length + 1, owner: user.username, text: String(data.text ?? \"\"), sharedWith: [] }; notes.push(created); return send(res, 201, created); }\n  const match = req.url.match(/^\\/notes\\/(\\d+)$/);\n  const note = match && notes.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return note && note.owner === user.username ? send(res, 200, note) : send(res, 404, { error: \"Note not found\" });\n  if (match && req.method === \"PUT\") { if (!note || note.owner !== user.username) return send(res, 404, { error: \"Note not found\" }); Object.assign(note, await readJson(req)); return send(res, 200, note); }\n  if (match && req.method === \"DELETE\") { if (!note || note.owner !== user.username) return send(res, 404, { error: \"Note not found\" }); notes.splice(notes.indexOf(note), 1); res.statusCode = 204; return res.end(); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "sec-owner-from-login"
    ],
    "estimatedMinutes": 4,
    "projectId": "access-sari-sari"
  }
] satisfies typeof authSecurityCourse.steps));
