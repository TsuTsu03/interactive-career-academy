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
