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
