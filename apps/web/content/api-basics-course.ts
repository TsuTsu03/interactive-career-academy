import type { Course } from "@/lib/lesson-ir";

// The local-computer grading model awaits the decision in V2_RUNNER_DESIGN.md.
export const apiBasicsCourse: Course = {
  "id": "api-basics",
  "title": "Building APIs",
  "project": "Market Inventory API",
  "projects": [
    {
      "id": "market-api",
      "title": "Market Inventory API"
    },
    {
      "id": "jeepney-api",
      "title": "Jeepney Route API (Shared Minibus)"
    },
    {
      "id": "booking-api",
      "title": "Community Hall Booking API"
    }
  ],
  "order": 15,
  "summary": "Build request handlers, validate input, and connect a database for useful local services. Lessons are being prepared.",
  "requires": [
    "node-basics"
  ],
  "requiresComputer": true,
  "kind": "js",
  "steps": []
};
