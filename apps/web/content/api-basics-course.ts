import type { Course } from "@/lib/lesson-ir";

// Runs on the learner's own computer under PLAN.md decisions 43 and 45. The
// checker starts the learner's server and sends it real requests on
// 127.0.0.1; a pasted report is learner-reported practice only. The code and
// checks for every project are fixed in tools/api-basics-plan.mjs.
export const apiBasicsCourse: Course = {
  "id": "api-basics",
  "title": "Building APIs",
  "project": "Sari-Sari Store First Server",
  "projects": [
    {
      "id": "first-server-sari-sari",
      "title": "Sari-Sari Store First Server"
    },
    {
      "id": "json-routes-sari-sari",
      "title": "Sari-Sari Store JSON Routes"
    },
    {
      "id": "request-bodies-sari-sari",
      "title": "Sari-Sari Store Reading Request Bodies"
    },
    {
      "id": "one-item-sari-sari",
      "title": "Sari-Sari Store One Item at a Time"
    },
    {
      "id": "query-strings-sari-sari",
      "title": "Sari-Sari Store Filtering with Query Strings"
    },
    {
      "id": "middleware-sari-sari",
      "title": "Sari-Sari Store Middleware"
    },
    {
      "id": "sqlite-storage-sari-sari",
      "title": "Sari-Sari Store Storing Data in SQLite"
    },
    {
      "id": "sqlite-changes-sari-sari",
      "title": "Sari-Sari Store Updating and Deleting Rows"
    },
    {
      "id": "errors-sari-sari",
      "title": "Sari-Sari Store Errors and Status Codes"
    },
    {
      "id": "api-design-sari-sari",
      "title": "Sari-Sari Store Designing a Clean API"
    },
    {
      "id": "first-server-carinderia",
      "title": "Carinderia First Server"
    },
    {
      "id": "json-routes-carinderia",
      "title": "Carinderia JSON Routes"
    },
    {
      "id": "request-bodies-carinderia",
      "title": "Carinderia Reading Request Bodies"
    },
    {
      "id": "one-item-carinderia",
      "title": "Carinderia One Item at a Time"
    },
    {
      "id": "query-strings-carinderia",
      "title": "Carinderia Filtering with Query Strings"
    },
    {
      "id": "middleware-carinderia",
      "title": "Carinderia Middleware"
    },
    {
      "id": "sqlite-storage-carinderia",
      "title": "Carinderia Storing Data in SQLite"
    },
    {
      "id": "sqlite-changes-carinderia",
      "title": "Carinderia Updating and Deleting Rows"
    },
    {
      "id": "errors-carinderia",
      "title": "Carinderia Errors and Status Codes"
    },
    {
      "id": "api-design-carinderia",
      "title": "Carinderia Designing a Clean API"
    },
    {
      "id": "first-server-barangay",
      "title": "Barangay Office First Server"
    },
    {
      "id": "json-routes-barangay",
      "title": "Barangay Office JSON Routes"
    },
    {
      "id": "request-bodies-barangay",
      "title": "Barangay Office Reading Request Bodies"
    },
    {
      "id": "one-item-barangay",
      "title": "Barangay Office One Item at a Time"
    },
    {
      "id": "query-strings-barangay",
      "title": "Barangay Office Filtering with Query Strings"
    },
    {
      "id": "middleware-barangay",
      "title": "Barangay Office Middleware"
    },
    {
      "id": "sqlite-storage-barangay",
      "title": "Barangay Office Storing Data in SQLite"
    },
    {
      "id": "sqlite-changes-barangay",
      "title": "Barangay Office Updating and Deleting Rows"
    },
    {
      "id": "errors-barangay",
      "title": "Barangay Office Errors and Status Codes"
    },
    {
      "id": "api-design-barangay",
      "title": "Barangay Office Designing a Clean API"
    },
    {
      "id": "first-server-school-club",
      "title": "School Club First Server"
    },
    {
      "id": "json-routes-school-club",
      "title": "School Club JSON Routes"
    },
    {
      "id": "request-bodies-school-club",
      "title": "School Club Reading Request Bodies"
    },
    {
      "id": "one-item-school-club",
      "title": "School Club One Item at a Time"
    },
    {
      "id": "query-strings-school-club",
      "title": "School Club Filtering with Query Strings"
    },
    {
      "id": "middleware-school-club",
      "title": "School Club Middleware"
    },
    {
      "id": "sqlite-storage-school-club",
      "title": "School Club Storing Data in SQLite"
    },
    {
      "id": "sqlite-changes-school-club",
      "title": "School Club Updating and Deleting Rows"
    },
    {
      "id": "errors-school-club",
      "title": "School Club Errors and Status Codes"
    },
    {
      "id": "api-design-school-club",
      "title": "School Club Designing a Clean API"
    },
    {
      "id": "first-server-tricycle",
      "title": "Tricycle Terminal First Server"
    },
    {
      "id": "json-routes-tricycle",
      "title": "Tricycle Terminal JSON Routes"
    },
    {
      "id": "request-bodies-tricycle",
      "title": "Tricycle Terminal Reading Request Bodies"
    },
    {
      "id": "one-item-tricycle",
      "title": "Tricycle Terminal One Item at a Time"
    },
    {
      "id": "query-strings-tricycle",
      "title": "Tricycle Terminal Filtering with Query Strings"
    },
    {
      "id": "middleware-tricycle",
      "title": "Tricycle Terminal Middleware"
    },
    {
      "id": "sqlite-storage-tricycle",
      "title": "Tricycle Terminal Storing Data in SQLite"
    },
    {
      "id": "sqlite-changes-tricycle",
      "title": "Tricycle Terminal Updating and Deleting Rows"
    },
    {
      "id": "errors-tricycle",
      "title": "Tricycle Terminal Errors and Status Codes"
    },
    {
      "id": "api-design-tricycle",
      "title": "Tricycle Terminal Designing a Clean API"
    }
  ],
  "order": 15,
  "summary": "Build web APIs with Node built-ins: routes, JSON, request bodies, validation, filtering, middleware, SQLite storage, errors, and clean design. Needs a computer with Node.js 22.13 or newer. Checks run on your computer and are practice only.",
  "requires": [
    "node-basics"
  ],
  "requiresComputer": true,
  "kind": "local",
  "steps": []
};
