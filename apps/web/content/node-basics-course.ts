import type { Course } from "@/lib/lesson-ir";

// The local-computer grading model awaits the decision in V2_RUNNER_DESIGN.md.
export const nodeBasicsCourse: Course = {
  "id": "node-basics",
  "title": "Node.js Fundamentals",
  "project": "Market Stall Records",
  "projects": [
    {
      "id": "market-records",
      "title": "Market Stall Records"
    },
    {
      "id": "delivery-import",
      "title": "Local Delivery Import"
    },
    {
      "id": "weather-config",
      "title": "Community Weather Configuration"
    }
  ],
  "order": 14,
  "summary": "Use JavaScript on your computer to read files, organise modules, and handle asynchronous work. Lessons are being prepared.",
  "requires": [
    "cli-git"
  ],
  "requiresComputer": true,
  "kind": "js",
  "steps": []
};
