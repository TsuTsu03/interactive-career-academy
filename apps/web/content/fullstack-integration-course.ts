import type { Course } from "@/lib/lesson-ir";

// The local-computer grading model awaits the decision in V2_RUNNER_DESIGN.md.
export const fullstackIntegrationCourse: Course = {
  "id": "fullstack-integration",
  "title": "Full-Stack Integration",
  "project": "Neighborhood Market Orders",
  "projects": [
    {
      "id": "market-orders",
      "title": "Neighborhood Market Orders"
    },
    {
      "id": "community-bookings",
      "title": "Community Hall Bookings"
    },
    {
      "id": "fullstack-portfolio",
      "title": "Full-Stack Project Portfolio"
    }
  ],
  "order": 17,
  "summary": "Connect a React interface to your own API, handle failures, and deploy a complete project. Lessons are being prepared.",
  "requires": [
    "auth-security"
  ],
  "requiresComputer": true,
  "kind": "js",
  "steps": []
};
