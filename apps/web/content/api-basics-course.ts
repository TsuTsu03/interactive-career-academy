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

// Validated local authoring batch: first-server-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-first-server-sari-sari-1",
    "index": 1,
    "task": "You will change the answer your server sends. The code below says the server answers every request with 'Sari-Sari Store API'.\n\nThis is the first answer your server gives. It tells users your server is ready.\n\nRun the checker to confirm your server answers GET / with 'Sari-Sari Store API'.\n\nIn server.js:\n```\n  res.end(\"Sari-Sari Store API\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Hello\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "root",
        "label": "GET / answers Sari-Sari Store API",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/"
          }
        ],
        "status": 200,
        "bodyContains": "Sari-Sari Store API"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Your server must answer every request with the same message."
      },
      {
        "level": 2,
        "text": "Change the res.end line in server.js to say 'Sari-Sari Store API'.\n\nIn server.js:\n```\n  res.end(\"Sari-Sari Store API\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Sari-Sari Store API\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-server"
    ],
    "estimatedMinutes": 3,
    "projectId": "first-server-sari-sari"
  },
  {
    "id": "api-first-server-sari-sari-2",
    "index": 2,
    "task": "You will add a header to tell the client the answer is plain text. The code below sets the Content-Type header.\n\nThis header tells the browser or tool how to read your answer. Without it, the answer might not show right.\n\nRun the checker to confirm your server says its body is plain text.\n\nIn server.js:\n```\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Hello\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "type",
        "label": "GET / says its body is plain text",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/"
          }
        ],
        "header": {
          "name": "content-type",
          "value": "text/plain"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a header before res.end to tell the client the answer format."
      },
      {
        "level": 2,
        "text": "Add the line above res.end in server.js to set Content-Type.\n\nIn server.js:\n```\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.end(\"Sari-Sari Store API\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-header"
    ],
    "estimatedMinutes": 4,
    "projectId": "first-server-sari-sari"
  },
  {
    "id": "api-first-server-sari-sari-3",
    "index": 3,
    "task": "You will add a custom header to name the place. The code below adds X-Place: sari-sari.\n\nThis header helps tools know where your server is located. It's like a tag on your answer.\n\nRun the checker to confirm your server sends X-Place: sari-sari.\n\nIn server.js:\n```\n  res.setHeader(\"X-Place\", \"sari-sari\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Hello\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "custom",
        "label": "GET / sends X-Place: sari-sari",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/"
          }
        ],
        "header": {
          "name": "x-place",
          "value": "sari-sari"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a header to mark your server's location."
      },
      {
        "level": 2,
        "text": "Add the line above res.end in server.js to set X-Place.\n\nIn server.js:\n```\n  res.setHeader(\"X-Place\", \"sari-sari\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.setHeader(\"X-Place\", \"sari-sari\");\n  res.end(\"Sari-Sari Store API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "first-server-sari-sari"
  },
  {
    "id": "api-first-server-sari-sari-4",
    "index": 4,
    "task": "You will add a route for /health. The code below checks if the request is for /health.\n\nThis route lets tools check if your server is running. It answers with 'healthy'.\n\nRun the checker to confirm your server answers GET /health with 'healthy'.\n\nIn server.js:\n```\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Hello\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "health",
        "label": "GET /health answers healthy",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/health"
          }
        ],
        "status": 200,
        "bodyContains": "healthy"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a condition to check if the request is for /health."
      },
      {
        "level": 2,
        "text": "Add the line at the top of the handler in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.setHeader(\"X-Place\", \"sari-sari\");\n  res.end(\"Sari-Sari Store API\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-route"
    ],
    "estimatedMinutes": 4,
    "projectId": "first-server-sari-sari"
  },
  {
    "id": "api-first-server-sari-sari-5",
    "index": 5,
    "task": "You will add a rule for any other path. The code below sets status 404 for any URL that is not / or /health.\n\nThis tells users the path they asked for does not exist. It helps your server stay organized.\n\nRun the checker to confirm your server answers 404 for /missing and still answers 200 for /.\n\nIn server.js:\n```\n  if (req.url !== \"/\") { res.statusCode = 404; res.end(\"Not found\"); return; }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Hello\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "missing",
        "label": "GET /missing answers 404",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/missing"
          }
        ],
        "status": 404
      },
      {
        "id": "root",
        "label": "GET / still answers 200",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/"
          }
        ],
        "status": 200
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a rule to handle any path that is not / or /health."
      },
      {
        "level": 2,
        "text": "Add the line right after the /health line in server.js.\n\nIn server.js:\n```\n  if (req.url !== \"/\") { res.statusCode = 404; res.end(\"Not found\"); return; }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n  if (req.url !== \"/\") { res.statusCode = 404; res.end(\"Not found\"); return; }\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.setHeader(\"X-Place\", \"sari-sari\");\n  res.end(\"Sari-Sari Store API\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "real-response-status"
    ],
    "estimatedMinutes": 5,
    "projectId": "first-server-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: first-server-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-first-server-sari-sari-6",
    "index": 6,
    "task": "You will add a rule to stop any request that is not GET. This rule goes at the very top of the handler. The code below stops any method other than GET and sends status 405. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (req.method !== \"GET\") { res.statusCode = 405; res.end(\"Method not allowed\"); return; }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Hello\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "post",
        "label": "POST / answers 405",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/",
            "body": "{}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 405
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of a request method as the action you want to do, like GET or POST."
      },
      {
        "level": 2,
        "text": "Add the code right after the first line of the handler, before any other checks.\n\nIn server.js:\n```\n  if (req.method !== \"GET\") { res.statusCode = 405; res.end(\"Method not allowed\"); return; }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.method !== \"GET\") { res.statusCode = 405; res.end(\"Method not allowed\"); return; }\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n  if (req.url !== \"/\") { res.statusCode = 404; res.end(\"Not found\"); return; }\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.setHeader(\"X-Place\", \"sari-sari\");\n  res.end(\"Sari-Sari Store API\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "real-request-method"
    ],
    "estimatedMinutes": 3,
    "projectId": "first-server-sari-sari"
  },
  {
    "id": "api-first-server-sari-sari-7",
    "index": 7,
    "task": "You will add a route to answer /info with a JSON object. This goes right after the /health line. The code below sends a JSON object with the store's name. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (req.url === \"/info\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify({ name: \"Sari-Sari Store\" })); return; }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Hello\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "info",
        "label": "GET /info answers JSON with the name",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/info"
          }
        ],
        "bodyContains": "\"name\":\"Sari-Sari Store\"",
        "header": {
          "name": "content-type",
          "value": "application/json"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The JSON answer should have the key 'name' with the value 'Sari-Sari Store'."
      },
      {
        "level": 2,
        "text": "Add the code right after the /health route, before the 404 line.\n\nIn server.js:\n```\n  if (req.url === \"/info\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify({ name: \"Sari-Sari Store\" })); return; }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.method !== \"GET\") { res.statusCode = 405; res.end(\"Method not allowed\"); return; }\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n  if (req.url === \"/info\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify({ name: \"Sari-Sari Store\" })); return; }\n  if (req.url !== \"/\") { res.statusCode = 404; res.end(\"Not found\"); return; }\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.setHeader(\"X-Place\", \"sari-sari\");\n  res.end(\"Sari-Sari Store API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "first-server-sari-sari"
  },
  {
    "id": "api-first-server-sari-sari-8",
    "index": 8,
    "task": "You will add a counter to track how many requests come in. This counter starts at 0 and adds 1 for each request. Then you add a route for /visits to show the count. The code below adds the counter and the /visits route. Run the checker to confirm it works.\n\nIn server.js:\n```\nlet visits = 0;\n  visits += 1;\n  if (req.url === \"/visits\") { res.end(String(visits)); return; }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Hello\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "visits",
        "label": "After two requests, GET /visits answers 3",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/"
          },
          {
            "method": "GET",
            "path": "/"
          },
          {
            "method": "GET",
            "path": "/visits"
          }
        ],
        "bodyContains": "3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Start the counter at 0 and add 1 for each request before sending the answer."
      },
      {
        "level": 2,
        "text": "Add the counter above the server, and the /visits route before the 404 line.\n\nIn server.js:\n```\nlet visits = 0;\n  visits += 1;\n  if (req.url === \"/visits\") { res.end(String(visits)); return; }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nlet visits = 0;\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.method !== \"GET\") { res.statusCode = 405; res.end(\"Method not allowed\"); return; }\n  visits += 1;\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n  if (req.url === \"/info\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify({ name: \"Sari-Sari Store\" })); return; }\n  if (req.url === \"/visits\") { res.end(String(visits)); return; }\n  if (req.url !== \"/\") { res.statusCode = 404; res.end(\"Not found\"); return; }\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.setHeader(\"X-Place\", \"sari-sari\");\n  res.end(\"Sari-Sari Store API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "first-server-sari-sari"
  },
  {
    "id": "api-first-server-sari-sari-9",
    "index": 9,
    "task": "You will add a header to tell browsers not to store any answer. This goes at the very top of the handler. The code below sets the header 'Cache-Control' to 'no-store'. Run the checker to confirm it works.\n\nIn server.js:\n```\n  res.setHeader(\"Cache-Control\", \"no-store\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Hello\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "cache",
        "label": "GET / sends Cache-Control: no-store",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/"
          }
        ],
        "header": {
          "name": "cache-control",
          "value": "no-store"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "This header tells browsers not to save the answer in memory or cache."
      },
      {
        "level": 2,
        "text": "Add the code right after the first line of the handler, before any other checks.\n\nIn server.js:\n```\n  res.setHeader(\"Cache-Control\", \"no-store\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nlet visits = 0;\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"Cache-Control\", \"no-store\");\n  if (req.method !== \"GET\") { res.statusCode = 405; res.end(\"Method not allowed\"); return; }\n  visits += 1;\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n  if (req.url === \"/info\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify({ name: \"Sari-Sari Store\" })); return; }\n  if (req.url === \"/visits\") { res.end(String(visits)); return; }\n  if (req.url !== \"/\") { res.statusCode = 404; res.end(\"Not found\"); return; }\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.setHeader(\"X-Place\", \"sari-sari\");\n  res.end(\"Sari-Sari Store API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "first-server-sari-sari"
  },
  {
    "id": "api-first-server-sari-sari-10",
    "index": 10,
    "task": "You will add a route to answer /hello with a name from the query string. If no name is given, it uses 'friend'. This goes right before the 404 line. The code below uses URLSearchParams to read the name. Run the checker to confirm it works.\n\nIn server.js:\n```\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/hello\") { res.end(`Hello, ${url.searchParams.get(\"name\") ?? \"friend\"}`); return; }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Hello\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "hello",
        "label": "GET /hello?name=Ana answers Hello, Ana",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/hello?name=Ana"
          }
        ],
        "bodyContains": "Hello, Ana"
      },
      {
        "id": "default",
        "label": "GET /hello answers Hello, friend",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/hello"
          }
        ],
        "bodyContains": "Hello, friend"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "URLSearchParams reads the values after the ? in the URL, like ?name=Ana."
      },
      {
        "level": 2,
        "text": "Add the two lines right before the 404 line, after the /visits route.\n\nIn server.js:\n```\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/hello\") { res.end(`Hello, ${url.searchParams.get(\"name\") ?? \"friend\"}`); return; }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nlet visits = 0;\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"Cache-Control\", \"no-store\");\n  if (req.method !== \"GET\") { res.statusCode = 405; res.end(\"Method not allowed\"); return; }\n  visits += 1;\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n  if (req.url === \"/info\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify({ name: \"Sari-Sari Store\" })); return; }\n  if (req.url === \"/visits\") { res.end(String(visits)); return; }\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/hello\") { res.end(`Hello, ${url.searchParams.get(\"name\") ?? \"friend\"}`); return; }\n  if (req.url !== \"/\") { res.statusCode = 404; res.end(\"Not found\"); return; }\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.setHeader(\"X-Place\", \"sari-sari\");\n  res.end(\"Sari-Sari Store API\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "real-url-search-params"
    ],
    "estimatedMinutes": 6,
    "projectId": "first-server-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));
