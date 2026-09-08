import type { Course } from "@/lib/lesson-ir";

// The local-computer grading model awaits the decision in V2_RUNNER_DESIGN.md.
export const authSecurityCourse: Course = {
  "id": "auth-security",
  "title": "Auth and Security",
  "project": "Volunteer Portal Access",
  "projects": [
    {
      "id": "volunteer-access",
      "title": "Volunteer Portal Access"
    },
    {
      "id": "clinic-boundaries",
      "title": "Clinic Appointment Access Rules"
    },
    {
      "id": "store-security",
      "title": "Store API Security Checks"
    }
  ],
  "order": 16,
  "summary": "Protect a learner-built application with session checks, access rules, and safe handling of input. Lessons are being prepared.",
  "requires": [
    "api-basics"
  ],
  "requiresComputer": true,
  "kind": "js",
  "steps": []
};
