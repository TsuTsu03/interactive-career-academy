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

// Validated local authoring batch: json-routes-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-json-routes-sari-sari-1",
    "index": 11,
    "task": "You will send the whole list as JSON when someone asks for /items. The code below does that. Add it at the top of the handler. This helps the store show all products in one request. JSON is a text format for sending structured values such as objects and arrays.\n\nIn server.js:\n```\n  if (req.url === \"/items\") return send(res, 200, items);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "list",
        "label": "GET /items answers the list as JSON",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items"
          }
        ],
        "bodyContains": "\"name\":\"Rice\"",
        "header": {
          "name": "content-type",
          "value": "application/json"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The send helper sends the list as JSON, so you don't need to format it yourself."
      },
      {
        "level": 2,
        "text": "Add this line right after the first if statement in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/items\") return send(res, 200, items);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "real-json"
    ],
    "estimatedMinutes": 3,
    "projectId": "json-routes-sari-sari"
  },
  {
    "id": "api-json-routes-sari-sari-2",
    "index": 12,
    "task": "You will send the count of items when someone asks for /items/count. The code below does that. Add it after the /items line. This helps the store know how many products are available without listing them all.\n\nIn server.js:\n```\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "GET /items/count answers {\"count\":3}",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/count"
          }
        ],
        "bodyContains": "{\"count\":3}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The code uses items.length to count how many items are in the list."
      },
      {
        "level": 2,
        "text": "Add this line right after the /items line in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "json-routes-sari-sari"
  },
  {
    "id": "api-json-routes-sari-sari-3",
    "index": 13,
    "task": "You will send only the first item when someone asks for /items/first. The code below does that. Add it after the /items/count line. This helps the store show the cheapest or most popular item quickly.\n\nIn server.js:\n```\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "first",
        "label": "GET /items/first answers Rice",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/first"
          }
        ],
        "bodyContains": "{\"id\":1,\"name\":\"Rice\",\"price\":50}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The code uses items[0] to get the first item in the list."
      },
      {
        "level": 2,
        "text": "Add this line right after the /items/count line in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "json-routes-sari-sari"
  },
  {
    "id": "api-json-routes-sari-sari-4",
    "index": 14,
    "task": "You will send only the names of items when someone asks for /items/names. The code below does that. Add it after the /items/first line. This helps the store show only the product names, not the prices or other details.\n\nIn server.js:\n```\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "names",
        "label": "GET /items/names answers the three names",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/names"
          }
        ],
        "bodyContains": "[\"Rice\",\"Soap\",\"Egg\"]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The code uses map to get each item's name from the list."
      },
      {
        "level": 2,
        "text": "Add this line right after the /items/first line in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "json-routes-sari-sari"
  },
  {
    "id": "api-json-routes-sari-sari-5",
    "index": 15,
    "task": "You will send the total price of all items when someone asks for /items/total. The code below does that. Add it after the /items/names line. This helps the store calculate the total cost of all products quickly.\n\nIn server.js:\n```\n  if (req.url === \"/items/total\") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "total",
        "label": "GET /items/total answers 84",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/total"
          }
        ],
        "bodyContains": "{\"total\":84}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The code uses reduce to add up all the prices in the list."
      },
      {
        "level": 2,
        "text": "Add this line right after the /items/names line in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/items/total\") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n  if (req.url === \"/items/total\") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "json-routes-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: json-routes-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-json-routes-sari-sari-6",
    "index": 16,
    "task": "You will change the last line of the handler. This line tells the server what to send when a path is not found. You will replace it with a 404 error in JSON format. The code below does that. Run the checker to confirm the server now answers 404 with a JSON error.\n\nIn server.js:\n```\n  send(res, 404, { error: \"Not found\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "missing",
        "label": "GET /nope answers 404 with a JSON error",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/nope"
          }
        ],
        "status": 404,
        "bodyContains": "{\"error\":\"Not found\"}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server must send a 404 status and a JSON error body when a path is unknown."
      },
      {
        "level": 2,
        "text": "Put the code at the end of the handler, right before the 404 line.\n\nIn server.js:\n```\n  send(res, 404, { error: \"Not found\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n  if (req.url === \"/items/total\") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-json-error"
    ],
    "estimatedMinutes": 3,
    "projectId": "json-routes-sari-sari"
  },
  {
    "id": "api-json-routes-sari-sari-7",
    "index": 17,
    "task": "Add one line at the top of the handler. This line handles the root path. It sends back the API's name and its routes. The code below does that. Run the checker to confirm the server now lists the routes.\n\nIn server.js:\n```\n  if (req.url === \"/\") return send(res, 200, { name: \"Sari-Sari Store\", routes: [\"/items\"] });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "root",
        "label": "GET / lists the routes",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/"
          }
        ],
        "status": 200,
        "bodyContains": "\"routes\":[\"/items\"]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server must return a 200 status and a JSON object with name and routes for the root path."
      },
      {
        "level": 2,
        "text": "Put the code at the top of the handler, right after the import lines.\n\nIn server.js:\n```\n  if (req.url === \"/\") return send(res, 200, { name: \"Sari-Sari Store\", routes: [\"/items\"] });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/\") return send(res, 200, { name: \"Sari-Sari Store\", routes: [\"/items\"] });\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n  if (req.url === \"/items/total\") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "json-routes-sari-sari"
  },
  {
    "id": "api-json-routes-sari-sari-8",
    "index": 18,
    "task": "Add one line before the 404 line. This line handles the /items/cheapest path. It finds the item with the lowest price and sends it back. The code below does that. Run the checker to confirm the server now answers with the cheapest item.\n\nIn server.js:\n```\n  if (req.url === \"/items/cheapest\") return send(res, 200, [...items].sort((a, b) => a.price - b.price)[0]);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "cheapest",
        "label": "GET /items/cheapest answers Egg",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/cheapest"
          }
        ],
        "bodyContains": "\"name\":\"Egg\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server must sort the items by price and pick the first one for /items/cheapest."
      },
      {
        "level": 2,
        "text": "Put the code before the 404 line, right after the /items path check.\n\nIn server.js:\n```\n  if (req.url === \"/items/cheapest\") return send(res, 200, [...items].sort((a, b) => a.price - b.price)[0]);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/\") return send(res, 200, { name: \"Sari-Sari Store\", routes: [\"/items\"] });\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n  if (req.url === \"/items/total\") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });\n  if (req.url === \"/items/cheapest\") return send(res, 200, [...items].sort((a, b) => a.price - b.price)[0]);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "json-routes-sari-sari"
  },
  {
    "id": "api-json-routes-sari-sari-9",
    "index": 19,
    "task": "Add one line before the 404 line. This line handles the /items/pretty path. It sends the items in indented JSON so it's easier to read. The code below does that. Run the checker to confirm the server now answers with indented JSON.\n\nIn server.js:\n```\n  if (req.url === \"/items/pretty\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify(items, null, 2)); return; }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "pretty",
        "label": "GET /items/pretty answers indented JSON",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/pretty"
          }
        ],
        "bodyContains": "[\n  {\n    \"id\": 1"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server must set the Content-Type header to application/json and use JSON.stringify with 2 spaces for indentation."
      },
      {
        "level": 2,
        "text": "Put the code before the 404 line, right after the /items path check.\n\nIn server.js:\n```\n  if (req.url === \"/items/pretty\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify(items, null, 2)); return; }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/\") return send(res, 200, { name: \"Sari-Sari Store\", routes: [\"/items\"] });\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n  if (req.url === \"/items/total\") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });\n  if (req.url === \"/items/cheapest\") return send(res, 200, [...items].sort((a, b) => a.price - b.price)[0]);\n  if (req.url === \"/items/pretty\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify(items, null, 2)); return; }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "json-routes-sari-sari"
  },
  {
    "id": "api-json-routes-sari-sari-10",
    "index": 20,
    "task": "Add one line before the 404 line. This line handles the /items/expensive path. It filters items with price over 40 and sends them back. The code below does that. Run the checker to confirm the server now answers with expensive items.\n\nIn server.js:\n```\n  if (req.url === \"/items/expensive\") return send(res, 200, items.filter((item) => item.price > 40));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "expensive",
        "label": "GET /items/expensive answers Rice",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/expensive"
          }
        ],
        "bodyContains": "\"name\":\"Rice\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server must use filter to keep only items with price greater than 40."
      },
      {
        "level": 2,
        "text": "Put the code before the 404 line, right after the /items path check.\n\nIn server.js:\n```\n  if (req.url === \"/items/expensive\") return send(res, 200, items.filter((item) => item.price > 40));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/\") return send(res, 200, { name: \"Sari-Sari Store\", routes: [\"/items\"] });\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n  if (req.url === \"/items/total\") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });\n  if (req.url === \"/items/cheapest\") return send(res, 200, [...items].sort((a, b) => a.price - b.price)[0]);\n  if (req.url === \"/items/pretty\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify(items, null, 2)); return; }\n  if (req.url === \"/items/expensive\") return send(res, 200, items.filter((item) => item.price > 40));\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "json-routes-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: request-bodies-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-request-bodies-sari-sari-1",
    "index": 21,
    "task": "You will read the text a client sends. This is called the request body. The code below reads it. Add this code above the server. Then add the /echo route at the top of the handler. This lets you test reading the body. Run the checker to confirm.\n\nIn server.js:\n```\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "echo",
        "label": "POST /echo with hello answers it back",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/echo",
            "body": "hello",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "bodyContains": "\"received\":\"hello\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of the request body as the message the client sends to your server."
      },
      {
        "level": 2,
        "text": "Add the code above the server and the /echo route at the top of the handler.\n\nIn server.js:\n```\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-request-body"
    ],
    "estimatedMinutes": 4,
    "projectId": "request-bodies-sari-sari"
  },
  {
    "id": "api-request-bodies-sari-sari-2",
    "index": 22,
    "task": "You will turn JSON text into an object. This is called parsing JSON. The code below does that. Add it after the /echo route. This lets you test parsing. Run the checker to confirm.\n\nIn server.js:\n```\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "json",
        "label": "POST /echo-json answers the object it received",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/echo-json",
            "body": "{\"name\":\"Ana\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "bodyContains": "\"name\":\"Ana\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use JSON.parse to turn the text into an object your code can use."
      },
      {
        "level": 2,
        "text": "Add the code after the /echo route.\n\nIn server.js:\n```\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-parse-json"
    ],
    "estimatedMinutes": 3,
    "projectId": "request-bodies-sari-sari"
  },
  {
    "id": "api-request-bodies-sari-sari-3",
    "index": 23,
    "task": "You will answer POST /items with status 201 and the new item. The code below does that. Replace the line inside createItem with these two lines. This lets you test creating an item. Run the checker to confirm.\n\nIn server.js:\n```\n  const data = JSON.parse(await readBody(req));\n  return send(res, 201, data);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "created",
        "label": "POST /items answers 201 with the item",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"name\":\"Tea\",\"price\":12}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 201,
        "bodyContains": "\"name\":\"Tea\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use status 201 to say the item was created successfully."
      },
      {
        "level": 2,
        "text": "Replace the line inside createItem with the two lines.\n\nIn server.js:\n```\n  const data = JSON.parse(await readBody(req));\n  return send(res, 201, data);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const data = JSON.parse(await readBody(req));\n  return send(res, 201, data);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-post"
    ],
    "estimatedMinutes": 4,
    "projectId": "request-bodies-sari-sari"
  },
  {
    "id": "api-request-bodies-sari-sari-4",
    "index": 24,
    "task": "You will store the new item so it shows up in the list. The code below does that. Add it inside createItem before the return. This lets you test storing. Run the checker to confirm.\n\nIn server.js:\n```\n  items.push(data);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "stored",
        "label": "After POST /items, GET /items includes Tea",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"name\":\"Tea\",\"price\":12}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/items"
          }
        ],
        "bodyContains": "\"name\":\"Tea\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the code inside createItem before the return."
      },
      {
        "level": 2,
        "text": "This line adds the new item to the list.\n\nIn server.js:\n```\n  items.push(data);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const data = JSON.parse(await readBody(req));\n  items.push(data);\n  return send(res, 201, data);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "request-bodies-sari-sari"
  },
  {
    "id": "api-request-bodies-sari-sari-5",
    "index": 25,
    "task": "You will give each new item an id one higher than the last. The code below does that. Change createItem so each new item gets the next id. This lets you test assigning ids. Run the checker to confirm.\n\nIn server.js:\n```\n  const item = { id: items.length + 1, ...data };\n  items.push(item);\n  return send(res, 201, item);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "id",
        "label": "The new item answers with id 4",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"name\":\"Tea\",\"price\":12}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "bodyContains": "\"id\":4"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use items.length + 1 to get the next id."
      },
      {
        "level": 2,
        "text": "Change createItem to include the new id.\n\nIn server.js:\n```\n  const item = { id: items.length + 1, ...data };\n  items.push(item);\n  return send(res, 201, item);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const data = JSON.parse(await readBody(req));\n  const item = { id: items.length + 1, ...data };\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "request-bodies-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: request-bodies-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-request-bodies-sari-sari-6",
    "index": 26,
    "task": "If the body is not JSON, the server crashes. You fix this by catching the error. The code below shows how to return 400 instead. This helps customers know their request is broken. Run the checker to confirm.\n\nIn server.js:\n```\n  let data;\n  try { data = JSON.parse(await readBody(req)); } catch { return send(res, 400, { error: \"Body must be JSON\" }); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "bad",
        "label": "POST /items with broken JSON answers 400",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "not json",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 400,
        "bodyContains": "Body must be JSON"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "When JSON.parse fails, the server should not crash. It should return 400."
      },
      {
        "level": 2,
        "text": "Put the two lines after the try block, right before the catch block.\n\nIn server.js:\n```\n  let data;\n  try { data = JSON.parse(await readBody(req)); } catch { return send(res, 400, { error: \"Body must be JSON\" }); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  let data;\n  try { data = JSON.parse(await readBody(req)); } catch { return send(res, 400, { error: \"Body must be JSON\" }); }\n  const item = { id: items.length + 1, ...data };\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-bad-request"
    ],
    "estimatedMinutes": 3,
    "projectId": "request-bodies-sari-sari"
  },
  {
    "id": "api-request-bodies-sari-sari-7",
    "index": 27,
    "task": "Validation checks if data is correct before storing it. If the name is missing or empty, return 422. This tells the user what is wrong. The code below shows how to check. Run the checker to confirm.\n\nIn server.js:\n```\n  if (typeof data.name !== \"string\" || !data.name.trim()) return send(res, 422, { error: \"name is required\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "noname",
        "label": "POST /items without a name answers 422",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"price\":5}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 422,
        "bodyContains": "name is required"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Check if data.name is a string and not empty. If not, return 422."
      },
      {
        "level": 2,
        "text": "Put the check right after the try block, before the item creation.\n\nIn server.js:\n```\n  if (typeof data.name !== \"string\" || !data.name.trim()) return send(res, 422, { error: \"name is required\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  let data;\n  try { data = JSON.parse(await readBody(req)); } catch { return send(res, 400, { error: \"Body must be JSON\" }); }\n  if (typeof data.name !== \"string\" || !data.name.trim()) return send(res, 422, { error: \"name is required\" });\n  const item = { id: items.length + 1, ...data };\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-validation"
    ],
    "estimatedMinutes": 4,
    "projectId": "request-bodies-sari-sari"
  },
  {
    "id": "api-request-bodies-sari-sari-8",
    "index": 28,
    "task": "Price must be a number, and it must be 0 or more. If not, return 422. This stops bad data from being stored. The code below shows how to check. Run the checker to confirm.\n\nIn server.js:\n```\n  if (!Number.isFinite(data.price) || data.price < 0) return send(res, 422, { error: \"price must be a number 0 or more\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "badprice",
        "label": "POST /items with price five answers 422",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"name\":\"Tea\",\"price\":\"five\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 422,
        "bodyContains": "price must be a number"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use Number.isFinite to check if price is a number. Then check if it's not less than 0."
      },
      {
        "level": 2,
        "text": "Put the check right after the name check, before creating the item.\n\nIn server.js:\n```\n  if (!Number.isFinite(data.price) || data.price < 0) return send(res, 422, { error: \"price must be a number 0 or more\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  let data;\n  try { data = JSON.parse(await readBody(req)); } catch { return send(res, 400, { error: \"Body must be JSON\" }); }\n  if (typeof data.name !== \"string\" || !data.name.trim()) return send(res, 422, { error: \"name is required\" });\n  if (!Number.isFinite(data.price) || data.price < 0) return send(res, 422, { error: \"price must be a number 0 or more\" });\n  const item = { id: items.length + 1, ...data };\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "request-bodies-sari-sari"
  },
  {
    "id": "api-request-bodies-sari-sari-9",
    "index": 29,
    "task": "Only keep the known fields: id, name, and price. Trim spaces from the name. This keeps data clean and safe. The code below shows how to build the item. Run the checker to confirm.\n\nIn server.js:\n```\n  const item = { id: items.length + 1, name: data.name.trim(), price: data.price };\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "trim",
        "label": "The new item is stored with a trimmed name and no extra fields",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"name\":\"  Tea  \",\"price\":12,\"secret\":\"x\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "bodyContains": "{\"id\":4,\"name\":\"Tea\",\"price\":12}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use data.name.trim() to remove spaces from the name."
      },
      {
        "level": 2,
        "text": "Replace the old item line with the new one, keeping only id, name, and price.\n\nIn server.js:\n```\n  const item = { id: items.length + 1, name: data.name.trim(), price: data.price };\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  let data;\n  try { data = JSON.parse(await readBody(req)); } catch { return send(res, 400, { error: \"Body must be JSON\" }); }\n  if (typeof data.name !== \"string\" || !data.name.trim()) return send(res, 422, { error: \"name is required\" });\n  if (!Number.isFinite(data.price) || data.price < 0) return send(res, 422, { error: \"price must be a number 0 or more\" });\n  const item = { id: items.length + 1, name: data.name.trim(), price: data.price };\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "request-bodies-sari-sari"
  },
  {
    "id": "api-request-bodies-sari-sari-10",
    "index": 30,
    "task": "After creating an item, send a Location header. This tells the client where to find the new item. The code below shows how to add it. Run the checker to confirm.\n\nIn server.js:\n```\n  res.setHeader(\"Location\", `/items/${item.id}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "location",
        "label": "POST /items sends Location: /items/4",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"name\":\"Tea\",\"price\":12}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "header": {
          "name": "location",
          "value": "/items/4"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the header before the return line in createItem. Use the item's id."
      },
      {
        "level": 2,
        "text": "The header should be: Location: /items/{id}.\n\nIn server.js:\n```\n  res.setHeader(\"Location\", `/items/${item.id}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  let data;\n  try { data = JSON.parse(await readBody(req)); } catch { return send(res, 400, { error: \"Body must be JSON\" }); }\n  if (typeof data.name !== \"string\" || !data.name.trim()) return send(res, 422, { error: \"name is required\" });\n  if (!Number.isFinite(data.price) || data.price < 0) return send(res, 422, { error: \"price must be a number 0 or more\" });\n  const item = { id: items.length + 1, name: data.name.trim(), price: data.price };\n  items.push(item);\n  res.setHeader(\"Location\", `/items/${item.id}`);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-location-header"
    ],
    "estimatedMinutes": 3,
    "projectId": "request-bodies-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: one-item-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-one-item-sari-sari-1",
    "index": 31,
    "task": "You will read the item's id from the path. The path is /items/2. The 2 is the id. The code below picks that id. Add these two lines at the top of the handler. This lets you find the item by its id.\n\nIn server.js:\n```\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") return send(res, 200, items.find((item) => item.id === Number(match[1])));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "one",
        "label": "GET /items/2 answers Soap",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/2"
          }
        ],
        "bodyContains": "\"name\":\"Soap\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Look for the pattern in the URL: /items/number. The number is the id you need."
      },
      {
        "level": 2,
        "text": "Add the code at the top of the handler, right after the other lines.\n\nIn server.js:\n```\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") return send(res, 200, items.find((item) => item.id === Number(match[1])));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") return send(res, 200, items.find((item) => item.id === Number(match[1])));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-path-parameter"
    ],
    "estimatedMinutes": 3,
    "projectId": "one-item-sari-sari"
  },
  {
    "id": "api-one-item-sari-sari-2",
    "index": 32,
    "task": "You will check if the item exists. If it does not, answer 404. The code below checks for the item. Add this line and change the GET line. This stops errors when the item is missing.\n\nIn server.js:\n```\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "none",
        "label": "GET /items/99 answers 404",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/99"
          }
        ],
        "status": 404,
        "bodyContains": "Item not found"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the item is not found, send 404 with a message. The code below does that."
      },
      {
        "level": 2,
        "text": "Add the found line first, then change the GET line to use it.\n\nIn server.js:\n```\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-not-found"
    ],
    "estimatedMinutes": 4,
    "projectId": "one-item-sari-sari"
  },
  {
    "id": "api-one-item-sari-sari-3",
    "index": 33,
    "task": "You will delete an item. The code below removes it and answers 204. Add this line after the GET line. This tells the user the item is gone.\n\nIn server.js:\n```\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "deleted",
        "label": "DELETE /items/1 answers 204",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "DELETE",
            "path": "/items/1"
          }
        ],
        "status": 204
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "After checking if the item exists, add code to delete it. The code below does that."
      },
      {
        "level": 2,
        "text": "Add the DELETE code right after the GET code, in the same block.\n\nIn server.js:\n```\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-delete"
    ],
    "estimatedMinutes": 4,
    "projectId": "one-item-sari-sari"
  },
  {
    "id": "api-one-item-sari-sari-4",
    "index": 34,
    "task": "You will answer 404 when deleting an item that does not exist. Add this line after the DELETE line. This stops errors when the item is missing.\n\nIn server.js:\n```\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "gone",
        "label": "DELETE /items/99 answers 404 Item not found",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "DELETE",
            "path": "/items/99"
          }
        ],
        "status": 404,
        "bodyContains": "Item not found"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the item is not found, send 404 with a message. The code below does that."
      },
      {
        "level": 2,
        "text": "Add this line right after the DELETE code, before the next check.\n\nIn server.js:\n```\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "one-item-sari-sari"
  },
  {
    "id": "api-one-item-sari-sari-5",
    "index": 35,
    "task": "You will update an item with PUT. The code below replaces the item's fields. Add this line after the DELETE lines. This lets you change the item's details.\n\nIn server.js:\n```\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req))); return send(res, 200, found); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "put",
        "label": "PUT /items/1 with price 99 answers the new price",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "PUT",
            "path": "/items/1",
            "body": "{\"price\":99}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "bodyContains": "\"price\":99"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "PUT changes the item's fields. The code below reads the new fields and updates the item."
      },
      {
        "level": 2,
        "text": "Add this line after the DELETE lines, in the same block.\n\nIn server.js:\n```\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req))); return send(res, 200, found); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req))); return send(res, 200, found); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-put"
    ],
    "estimatedMinutes": 5,
    "projectId": "one-item-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: one-item-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-one-item-sari-sari-6",
    "index": 36,
    "task": "You will change the PUT line in server.js. The client may send a different id, but you must keep the item's original id. This keeps the item's identity safe. The code below shows the change. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req)), { id: found.id }); return send(res, 200, found); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "keep",
        "label": "After PUT with id 50, GET /items/1 still works",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "PUT",
            "path": "/items/1",
            "body": "{\"id\":50,\"price\":1}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/items/1"
          }
        ],
        "status": 200,
        "bodyContains": "\"id\":1"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The client may send a new id, but you must keep the old one. This keeps the item's identity safe."
      },
      {
        "level": 2,
        "text": "Change the PUT line in server.js. The code below shows the change.\n\nIn server.js:\n```\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req)), { id: found.id }); return send(res, 200, found); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req)), { id: found.id }); return send(res, 200, found); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "one-item-sari-sari"
  },
  {
    "id": "api-one-item-sari-sari-7",
    "index": 37,
    "task": "Add one line before the PUT line. This line checks if the body is not JSON. If it is not, send 415. This stops bad data from breaking the server. The code below shows the change. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (found && req.method === \"PUT\" && !req.headers[\"content-type\"]?.includes(\"application/json\")) return send(res, 415, { error: \"Send JSON\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "type",
        "label": "PUT with a text/plain body answers 415",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "PUT",
            "path": "/items/1",
            "body": "price=99",
            "headers": {
              "Content-Type": "text/plain"
            }
          }
        ],
        "status": 415
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the body is not JSON, send 415. This stops bad data from breaking the server."
      },
      {
        "level": 2,
        "text": "Add the line before the PUT line. The code below shows the change.\n\nIn server.js:\n```\n  if (found && req.method === \"PUT\" && !req.headers[\"content-type\"]?.includes(\"application/json\")) return send(res, 415, { error: \"Send JSON\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"PUT\" && !req.headers[\"content-type\"]?.includes(\"application/json\")) return send(res, 415, { error: \"Send JSON\" });\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req)), { id: found.id }); return send(res, 200, found); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-unsupported-type"
    ],
    "estimatedMinutes": 3,
    "projectId": "one-item-sari-sari"
  },
  {
    "id": "api-one-item-sari-sari-8",
    "index": 38,
    "task": "Add one line before the 404 line. This line handles HEAD requests. HEAD asks for only the headers, not the body. The code below shows the change. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (req.url === \"/items\" && req.method === \"HEAD\") { res.setHeader(\"X-Total-Count\", String(items.length)); return res.end(); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "head",
        "label": "HEAD /items sends X-Total-Count: 3",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "HEAD",
            "path": "/items"
          }
        ],
        "header": {
          "name": "x-total-count",
          "value": "3"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "HEAD asks for only the headers, not the body. This line sends the X-Total-Count header."
      },
      {
        "level": 2,
        "text": "Add the line before the 404 line. The code below shows the change.\n\nIn server.js:\n```\n  if (req.url === \"/items\" && req.method === \"HEAD\") { res.setHeader(\"X-Total-Count\", String(items.length)); return res.end(); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"PUT\" && !req.headers[\"content-type\"]?.includes(\"application/json\")) return send(res, 415, { error: \"Send JSON\" });\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req)), { id: found.id }); return send(res, 200, found); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"HEAD\") { res.setHeader(\"X-Total-Count\", String(items.length)); return res.end(); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-head"
    ],
    "estimatedMinutes": 3,
    "projectId": "one-item-sari-sari"
  },
  {
    "id": "api-one-item-sari-sari-9",
    "index": 39,
    "task": "Add one line after the PUT line. This line handles OPTIONS requests. OPTIONS asks which methods a path supports. The code below shows the change. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (match && req.method === \"OPTIONS\") { res.setHeader(\"Allow\", \"GET, PUT, DELETE\"); res.statusCode = 204; return res.end(); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "options",
        "label": "OPTIONS /items/1 lists GET, PUT, DELETE",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "OPTIONS",
            "path": "/items/1"
          }
        ],
        "header": {
          "name": "allow",
          "value": "GET, PUT, DELETE"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "OPTIONS asks which methods a path supports. This line sends the Allow header with GET, PUT, DELETE."
      },
      {
        "level": 2,
        "text": "Add the line after the PUT line. The code below shows the change.\n\nIn server.js:\n```\n  if (match && req.method === \"OPTIONS\") { res.setHeader(\"Allow\", \"GET, PUT, DELETE\"); res.statusCode = 204; return res.end(); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"PUT\" && !req.headers[\"content-type\"]?.includes(\"application/json\")) return send(res, 415, { error: \"Send JSON\" });\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req)), { id: found.id }); return send(res, 200, found); }\n  if (match && req.method === \"OPTIONS\") { res.setHeader(\"Allow\", \"GET, PUT, DELETE\"); res.statusCode = 204; return res.end(); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"HEAD\") { res.setHeader(\"X-Total-Count\", String(items.length)); return res.end(); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-options"
    ],
    "estimatedMinutes": 3,
    "projectId": "one-item-sari-sari"
  },
  {
    "id": "api-one-item-sari-sari-10",
    "index": 40,
    "task": "Add one line after the OPTIONS line. This line handles any other method on one item. It sends 405 for those methods. The code below shows the change. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (match) return send(res, 405, { error: \"Method not allowed\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "post",
        "label": "POST /items/1 answers 405",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items/1",
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
        "text": "Any method not listed (like POST) should get 405. This line handles that."
      },
      {
        "level": 2,
        "text": "Add the line after the OPTIONS line. The code below shows the change.\n\nIn server.js:\n```\n  if (match) return send(res, 405, { error: \"Method not allowed\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"PUT\" && !req.headers[\"content-type\"]?.includes(\"application/json\")) return send(res, 415, { error: \"Send JSON\" });\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req)), { id: found.id }); return send(res, 200, found); }\n  if (match && req.method === \"OPTIONS\") { res.setHeader(\"Allow\", \"GET, PUT, DELETE\"); res.statusCode = 204; return res.end(); }\n  if (match) return send(res, 405, { error: \"Method not allowed\" });\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"HEAD\") { res.setHeader(\"X-Total-Count\", String(items.length)); return res.end(); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-method-not-allowed"
    ],
    "estimatedMinutes": 3,
    "projectId": "one-item-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: query-strings-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-query-strings-sari-sari-1",
    "index": 41,
    "task": "You will add two lines to server.js. The first line gets the items. The second line checks if the client sent ?max. If yes, it filters the list to keep only items that cost at most that number. This helps the client find items they can afford. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  let list = items;\n  if (url.searchParams.has(\"max\")) list = list.filter((item) => item.price <= Number(url.searchParams.get(\"max\")));\n  if (url.pathname === \"/items\") return send(res, 200, list);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "max",
        "label": "GET /items?max=25 answers only the items up to 25",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items?max=25"
          }
        ],
        "bodyContains": "[{\"id\":1,\"name\":\"Soap\",\"price\":25},{\"id\":2,\"name\":\"Egg\",\"price\":9}]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of filtering like picking only the items that fit your budget."
      },
      {
        "level": 2,
        "text": "Add the code after the url line, right before the /items line.\n\nIn server.js:\n```\n  let list = items;\n  if (url.searchParams.has(\"max\")) list = list.filter((item) => item.price <= Number(url.searchParams.get(\"max\")));\n  if (url.pathname === \"/items\") return send(res, 200, list);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  let list = items;\n  if (url.searchParams.has(\"max\")) list = list.filter((item) => item.price <= Number(url.searchParams.get(\"max\")));\n  if (url.pathname === \"/items\") return send(res, 200, list);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-filter"
    ],
    "estimatedMinutes": 4,
    "projectId": "query-strings-sari-sari"
  },
  {
    "id": "api-query-strings-sari-sari-2",
    "index": 42,
    "task": "You will add one line to server.js. This line checks if the client sent ?min. If yes, it filters the list to keep only items that cost at least that number. This helps the client find items they want to buy. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (url.searchParams.has(\"min\")) list = list.filter((item) => item.price >= Number(url.searchParams.get(\"min\")));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "min",
        "label": "GET /items?min=25 answers only the items from 25",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items?min=25"
          }
        ],
        "bodyContains": "[{\"id\":1,\"name\":\"Soap\",\"price\":25},{\"id\":3,\"name\":\"Rice\",\"price\":50}]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of filtering like picking only the items that cost more than or equal to the minimum."
      },
      {
        "level": 2,
        "text": "Add the code after the max line, right before the q line.\n\nIn server.js:\n```\n  if (url.searchParams.has(\"min\")) list = list.filter((item) => item.price >= Number(url.searchParams.get(\"min\")));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  let list = items;\n  if (url.searchParams.has(\"max\")) list = list.filter((item) => item.price <= Number(url.searchParams.get(\"max\")));\n  if (url.searchParams.has(\"min\")) list = list.filter((item) => item.price >= Number(url.searchParams.get(\"min\")));\n  if (url.pathname === \"/items\") return send(res, 200, list);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "query-strings-sari-sari"
  },
  {
    "id": "api-query-strings-sari-sari-3",
    "index": 43,
    "task": "You will add one line to server.js. This line checks if the client sent ?q. If yes, it filters the list to keep only items whose name contains what the client typed, ignoring upper and lower case. This helps the client find items by name. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (url.searchParams.has(\"q\")) list = list.filter((item) => item.name.toLowerCase().includes(url.searchParams.get(\"q\").toLowerCase()));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "q",
        "label": "GET /items?q=gg finds Egg",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items?q=gg"
          }
        ],
        "bodyContains": "[{\"id\":2,\"name\":\"Egg\",\"price\":9}]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of searching like looking for a word in a list, no matter if it's uppercase or lowercase."
      },
      {
        "level": 2,
        "text": "Add the code after the min line, right before the sort line.\n\nIn server.js:\n```\n  if (url.searchParams.has(\"q\")) list = list.filter((item) => item.name.toLowerCase().includes(url.searchParams.get(\"q\").toLowerCase()));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  let list = items;\n  if (url.searchParams.has(\"max\")) list = list.filter((item) => item.price <= Number(url.searchParams.get(\"max\")));\n  if (url.searchParams.has(\"min\")) list = list.filter((item) => item.price >= Number(url.searchParams.get(\"min\")));\n  if (url.searchParams.has(\"q\")) list = list.filter((item) => item.name.toLowerCase().includes(url.searchParams.get(\"q\").toLowerCase()));\n  if (url.pathname === \"/items\") return send(res, 200, list);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-search"
    ],
    "estimatedMinutes": 4,
    "projectId": "query-strings-sari-sari"
  },
  {
    "id": "api-query-strings-sari-sari-4",
    "index": 44,
    "task": "You will add one line to server.js. This line checks if the client sent ?sort=price. If yes, it sorts the list from cheapest to most expensive. This helps the client see the best deals first. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (url.searchParams.get(\"sort\") === \"price\") list = [...list].sort((a, b) => a.price - b.price);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "asc",
        "label": "GET /items?sort=price answers cheapest first",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items?sort=price"
          }
        ],
        "bodyContains": "[{\"id\":2,\"name\":\"Egg\",\"price\":9},{\"id\":1,\"name\":\"Soap\",\"price\":25},{\"id\":3,\"name\":\"Rice\",\"price\":50}]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of sorting like arranging items from lowest to highest price."
      },
      {
        "level": 2,
        "text": "Add the code after the q line, right before the -price line.\n\nIn server.js:\n```\n  if (url.searchParams.get(\"sort\") === \"price\") list = [...list].sort((a, b) => a.price - b.price);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  let list = items;\n  if (url.searchParams.has(\"max\")) list = list.filter((item) => item.price <= Number(url.searchParams.get(\"max\")));\n  if (url.searchParams.has(\"min\")) list = list.filter((item) => item.price >= Number(url.searchParams.get(\"min\")));\n  if (url.searchParams.has(\"q\")) list = list.filter((item) => item.name.toLowerCase().includes(url.searchParams.get(\"q\").toLowerCase()));\n  if (url.searchParams.get(\"sort\") === \"price\") list = [...list].sort((a, b) => a.price - b.price);\n  if (url.pathname === \"/items\") return send(res, 200, list);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-sort"
    ],
    "estimatedMinutes": 4,
    "projectId": "query-strings-sari-sari"
  },
  {
    "id": "api-query-strings-sari-sari-5",
    "index": 45,
    "task": "You will add one line to server.js. This line checks if the client sent ?sort=-price. If yes, it sorts the list from most expensive to cheapest. This helps the client see the most costly items first. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (url.searchParams.get(\"sort\") === \"-price\") list = [...list].sort((a, b) => b.price - a.price);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "desc",
        "label": "GET /items?sort=-price answers most expensive first",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items?sort=-price"
          }
        ],
        "bodyContains": "[{\"id\":3,\"name\":\"Rice\",\"price\":50},{\"id\":1,\"name\":\"Soap\",\"price\":25},{\"id\":2,\"name\":\"Egg\",\"price\":9}]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of sorting like arranging items from highest to lowest price."
      },
      {
        "level": 2,
        "text": "Add the code after the sort line, right before the end of the filter block.\n\nIn server.js:\n```\n  if (url.searchParams.get(\"sort\") === \"-price\") list = [...list].sort((a, b) => b.price - a.price);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  let list = items;\n  if (url.searchParams.has(\"max\")) list = list.filter((item) => item.price <= Number(url.searchParams.get(\"max\")));\n  if (url.searchParams.has(\"min\")) list = list.filter((item) => item.price >= Number(url.searchParams.get(\"min\")));\n  if (url.searchParams.has(\"q\")) list = list.filter((item) => item.name.toLowerCase().includes(url.searchParams.get(\"q\").toLowerCase()));\n  if (url.searchParams.get(\"sort\") === \"price\") list = [...list].sort((a, b) => a.price - b.price);\n  if (url.searchParams.get(\"sort\") === \"-price\") list = [...list].sort((a, b) => b.price - a.price);\n  if (url.pathname === \"/items\") return send(res, 200, list);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "query-strings-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: query-strings-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-query-strings-sari-sari-6",
    "index": 46,
    "task": "You add a new line after the second sort line. This line checks if the client asks for a limit. If yes, it cuts the list to only the first few items. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (url.searchParams.has(\"limit\")) list = list.slice(0, Number(url.searchParams.get(\"limit\")));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "limit",
        "label": "GET /items?sort=price&limit=1 answers only the cheapest item",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items?sort=price&limit=1"
          }
        ],
        "bodyContains": "[{\"id\":2,\"name\":\"Egg\",\"price\":9}]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of limit as a cap on how many items to show."
      },
      {
        "level": 2,
        "text": "Add this line right after the second sort line, in server.js.\n\nIn server.js:\n```\n  if (url.searchParams.has(\"limit\")) list = list.slice(0, Number(url.searchParams.get(\"limit\")));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  let list = items;\n  if (url.searchParams.has(\"max\")) list = list.filter((item) => item.price <= Number(url.searchParams.get(\"max\")));\n  if (url.searchParams.has(\"min\")) list = list.filter((item) => item.price >= Number(url.searchParams.get(\"min\")));\n  if (url.searchParams.has(\"q\")) list = list.filter((item) => item.name.toLowerCase().includes(url.searchParams.get(\"q\").toLowerCase()));\n  if (url.searchParams.get(\"sort\") === \"price\") list = [...list].sort((a, b) => a.price - b.price);\n  if (url.searchParams.get(\"sort\") === \"-price\") list = [...list].sort((a, b) => b.price - a.price);\n  if (url.searchParams.has(\"limit\")) list = list.slice(0, Number(url.searchParams.get(\"limit\")));\n  if (url.pathname === \"/items\") return send(res, 200, list);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-limit"
    ],
    "estimatedMinutes": 3,
    "projectId": "query-strings-sari-sari"
  },
  {
    "id": "api-query-strings-sari-sari-7",
    "index": 47,
    "task": "You add a new line after the limit line. This line checks if the client asks for only the name field. If yes, it changes the list to only names. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (url.searchParams.get(\"fields\") === \"name\") list = list.map((item) => ({ name: item.name }));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "fields",
        "label": "GET /items?fields=name answers names only",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items?fields=name"
          }
        ],
        "bodyContains": "[{\"name\":\"Soap\"},{\"name\":\"Egg\"},{\"name\":\"Rice\"}]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Field selection means you send only what the client asks for, not extra data."
      },
      {
        "level": 2,
        "text": "Add this line right after the limit line, in server.js.\n\nIn server.js:\n```\n  if (url.searchParams.get(\"fields\") === \"name\") list = list.map((item) => ({ name: item.name }));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  let list = items;\n  if (url.searchParams.has(\"max\")) list = list.filter((item) => item.price <= Number(url.searchParams.get(\"max\")));\n  if (url.searchParams.has(\"min\")) list = list.filter((item) => item.price >= Number(url.searchParams.get(\"min\")));\n  if (url.searchParams.has(\"q\")) list = list.filter((item) => item.name.toLowerCase().includes(url.searchParams.get(\"q\").toLowerCase()));\n  if (url.searchParams.get(\"sort\") === \"price\") list = [...list].sort((a, b) => a.price - b.price);\n  if (url.searchParams.get(\"sort\") === \"-price\") list = [...list].sort((a, b) => b.price - a.price);\n  if (url.searchParams.has(\"limit\")) list = list.slice(0, Number(url.searchParams.get(\"limit\")));\n  if (url.searchParams.get(\"fields\") === \"name\") list = list.map((item) => ({ name: item.name }));\n  if (url.pathname === \"/items\") return send(res, 200, list);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-fields"
    ],
    "estimatedMinutes": 3,
    "projectId": "query-strings-sari-sari"
  },
  {
    "id": "api-query-strings-sari-sari-8",
    "index": 48,
    "task": "You add a new line right after the url line. This line checks if the client asks for a max that is not a number. If yes, it sends a 400 error. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (url.searchParams.has(\"max\") && Number.isNaN(Number(url.searchParams.get(\"max\")))) return send(res, 400, { error: \"max must be a number\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "bad",
        "label": "GET /items?max=abc answers 400",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items?max=abc"
          }
        ],
        "status": 400
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If max is not a number, the server must say 400, not try to use it."
      },
      {
        "level": 2,
        "text": "Add this line right after the url line, in server.js.\n\nIn server.js:\n```\n  if (url.searchParams.has(\"max\") && Number.isNaN(Number(url.searchParams.get(\"max\")))) return send(res, 400, { error: \"max must be a number\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.searchParams.has(\"max\") && Number.isNaN(Number(url.searchParams.get(\"max\")))) return send(res, 400, { error: \"max must be a number\" });\n  let list = items;\n  if (url.searchParams.has(\"max\")) list = list.filter((item) => item.price <= Number(url.searchParams.get(\"max\")));\n  if (url.searchParams.has(\"min\")) list = list.filter((item) => item.price >= Number(url.searchParams.get(\"min\")));\n  if (url.searchParams.has(\"q\")) list = list.filter((item) => item.name.toLowerCase().includes(url.searchParams.get(\"q\").toLowerCase()));\n  if (url.searchParams.get(\"sort\") === \"price\") list = [...list].sort((a, b) => a.price - b.price);\n  if (url.searchParams.get(\"sort\") === \"-price\") list = [...list].sort((a, b) => b.price - a.price);\n  if (url.searchParams.has(\"limit\")) list = list.slice(0, Number(url.searchParams.get(\"limit\")));\n  if (url.searchParams.get(\"fields\") === \"name\") list = list.map((item) => ({ name: item.name }));\n  if (url.pathname === \"/items\") return send(res, 200, list);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "query-strings-sari-sari"
  },
  {
    "id": "api-query-strings-sari-sari-9",
    "index": 49,
    "task": "You change the /items line. This line sends a header called X-Total-Count that says how many items matched. Then it sends the list. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (url.pathname === \"/items\") { res.setHeader(\"X-Total-Count\", String(list.length)); return send(res, 200, list); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "GET /items?max=25 sends X-Total-Count: 2",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items?max=25"
          }
        ],
        "header": {
          "name": "x-total-count",
          "value": "2"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "X-Total-Count is a header that tells the client how many items matched, not in the body."
      },
      {
        "level": 2,
        "text": "Change the /items line to send the header and list, in server.js.\n\nIn server.js:\n```\n  if (url.pathname === \"/items\") { res.setHeader(\"X-Total-Count\", String(list.length)); return send(res, 200, list); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.searchParams.has(\"max\") && Number.isNaN(Number(url.searchParams.get(\"max\")))) return send(res, 400, { error: \"max must be a number\" });\n  let list = items;\n  if (url.searchParams.has(\"max\")) list = list.filter((item) => item.price <= Number(url.searchParams.get(\"max\")));\n  if (url.searchParams.has(\"min\")) list = list.filter((item) => item.price >= Number(url.searchParams.get(\"min\")));\n  if (url.searchParams.has(\"q\")) list = list.filter((item) => item.name.toLowerCase().includes(url.searchParams.get(\"q\").toLowerCase()));\n  if (url.searchParams.get(\"sort\") === \"price\") list = [...list].sort((a, b) => a.price - b.price);\n  if (url.searchParams.get(\"sort\") === \"-price\") list = [...list].sort((a, b) => b.price - a.price);\n  if (url.searchParams.has(\"limit\")) list = list.slice(0, Number(url.searchParams.get(\"limit\")));\n  if (url.searchParams.get(\"fields\") === \"name\") list = list.map((item) => ({ name: item.name }));\n  if (url.pathname === \"/items\") { res.setHeader(\"X-Total-Count\", String(list.length)); return send(res, 200, list); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-count-header"
    ],
    "estimatedMinutes": 4,
    "projectId": "query-strings-sari-sari"
  },
  {
    "id": "api-query-strings-sari-sari-10",
    "index": 50,
    "task": "You add a new line after the 400 line. This line answers /items/options with a list of all supported filters and sort options. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (url.pathname === \"/items/options\") return send(res, 200, { filters: [\"max\", \"min\", \"q\"], sort: [\"price\", \"-price\"], other: [\"limit\", \"fields\"] });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "options",
        "label": "GET /items/options lists the filters",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/options"
          }
        ],
        "bodyContains": "\"filters\":[\"max\",\"min\",\"q\"]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The /items/options endpoint lists all the filters and sorts the client can use."
      },
      {
        "level": 2,
        "text": "Add this line after the 400 line, in server.js.\n\nIn server.js:\n```\n  if (url.pathname === \"/items/options\") return send(res, 200, { filters: [\"max\", \"min\", \"q\"], sort: [\"price\", \"-price\"], other: [\"limit\", \"fields\"] });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Soap\", price: 25 }, { id: 2, name: \"Egg\", price: 9 }, { id: 3, name: \"Rice\", price: 50 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.searchParams.has(\"max\") && Number.isNaN(Number(url.searchParams.get(\"max\")))) return send(res, 400, { error: \"max must be a number\" });\n  if (url.pathname === \"/items/options\") return send(res, 200, { filters: [\"max\", \"min\", \"q\"], sort: [\"price\", \"-price\"], other: [\"limit\", \"fields\"] });\n  let list = items;\n  if (url.searchParams.has(\"max\")) list = list.filter((item) => item.price <= Number(url.searchParams.get(\"max\")));\n  if (url.searchParams.has(\"min\")) list = list.filter((item) => item.price >= Number(url.searchParams.get(\"min\")));\n  if (url.searchParams.has(\"q\")) list = list.filter((item) => item.name.toLowerCase().includes(url.searchParams.get(\"q\").toLowerCase()));\n  if (url.searchParams.get(\"sort\") === \"price\") list = [...list].sort((a, b) => a.price - b.price);\n  if (url.searchParams.get(\"sort\") === \"-price\") list = [...list].sort((a, b) => b.price - a.price);\n  if (url.searchParams.has(\"limit\")) list = list.slice(0, Number(url.searchParams.get(\"limit\")));\n  if (url.searchParams.get(\"fields\") === \"name\") list = list.map((item) => ({ name: item.name }));\n  if (url.pathname === \"/items\") { res.setHeader(\"X-Total-Count\", String(list.length)); return send(res, 200, list); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "query-strings-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: middleware-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-middleware-sari-sari-1",
    "index": 51,
    "task": "You will add a counter and a function to add request IDs. This helps every answer have a unique number. The code below goes above the server. You call this function at the top of the handler. This way, every request gets a numbered header.\n\nIn server.js:\n```\nlet nextId = 1;\nfunction addRequestId(req, res) { res.setHeader(\"X-Request-Id\", String(nextId++)); }\n  addRequestId(req, res);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "id",
        "label": "The first answer sends X-Request-Id: 1",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items"
          }
        ],
        "header": {
          "name": "x-request-id",
          "value": "1"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of the counter as a small machine that counts up each time you use it."
      },
      {
        "level": 2,
        "text": "Put the code above the server, right after the empty line.\n\nIn server.js:\n```\nlet nextId = 1;\nfunction addRequestId(req, res) { res.setHeader(\"X-Request-Id\", String(nextId++)); }\n  addRequestId(req, res);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet nextId = 1;\nfunction addRequestId(req, res) { res.setHeader(\"X-Request-Id\", String(nextId++)); }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  addRequestId(req, res);\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-middleware"
    ],
    "estimatedMinutes": 3,
    "projectId": "middleware-sari-sari"
  },
  {
    "id": "api-middleware-sari-sari-2",
    "index": 52,
    "task": "You will add another function to set a place header. This tells the browser where the answer comes from. The code below goes right after the first function. You call it after the first one. This way, every answer gets the store's name.\n\nIn server.js:\n```\nfunction addPlace(req, res) { res.setHeader(\"X-Place\", \"sari-sari\"); }\n  addPlace(req, res);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "place",
        "label": "Answers send X-Place: sari-sari",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items"
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
        "text": "Imagine this function as a sign that says 'sari-sari' on every answer."
      },
      {
        "level": 2,
        "text": "Put the code after the first function, right before the first call.\n\nIn server.js:\n```\nfunction addPlace(req, res) { res.setHeader(\"X-Place\", \"sari-sari\"); }\n  addPlace(req, res);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet nextId = 1;\nfunction addRequestId(req, res) { res.setHeader(\"X-Request-Id\", String(nextId++)); }\nfunction addPlace(req, res) { res.setHeader(\"X-Place\", \"sari-sari\"); }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  addRequestId(req, res);\n  addPlace(req, res);\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 2,
    "projectId": "middleware-sari-sari"
  },
  {
    "id": "api-middleware-sari-sari-3",
    "index": 53,
    "task": "You will make a list of all the functions you added. This lets you run them all in order. The code below replaces the two calls with one loop. This way, you can add or change steps without changing the handler.\n\nIn server.js:\n```\nconst middleware = [addRequestId, addPlace];\n  for (const step of middleware) step(req, res);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "list",
        "label": "server.js keeps its middleware in one list",
        "kind": "local-file-contains",
        "path": "server.js",
        "value": "const middleware = [addRequestId, addPlace];"
      },
      {
        "id": "still",
        "label": "Answers still send X-Place",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items"
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
        "text": "Think of the list as a recipe where you follow each step in order."
      },
      {
        "level": 2,
        "text": "Put the code right after the functions, before the handler.\n\nIn server.js:\n```\nconst middleware = [addRequestId, addPlace];\n  for (const step of middleware) step(req, res);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet nextId = 1;\nfunction addRequestId(req, res) { res.setHeader(\"X-Request-Id\", String(nextId++)); }\nfunction addPlace(req, res) { res.setHeader(\"X-Place\", \"sari-sari\"); }\nconst middleware = [addRequestId, addPlace];\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  for (const step of middleware) step(req, res);\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-middleware-list"
    ],
    "estimatedMinutes": 4,
    "projectId": "middleware-sari-sari"
  },
  {
    "id": "api-middleware-sari-sari-4",
    "index": 54,
    "task": "You will add a new function that sets a powered-by header. This tells the browser what tools you used. The code below adds this function to the list. You do not change the handler. This way, every answer gets the tool name.\n\nIn server.js:\n```\nfunction addPoweredBy(req, res) { res.setHeader(\"X-Powered-By\", \"Node built-ins\"); }\nconst middleware = [addRequestId, addPlace, addPoweredBy];\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "powered",
        "label": "Answers send X-Powered-By: Node built-ins",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items"
          }
        ],
        "header": {
          "name": "x-powered-by",
          "value": "Node built-ins"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of this function as a credit card for your tools."
      },
      {
        "level": 2,
        "text": "Add the code to the list, right after addPlace.\n\nIn server.js:\n```\nfunction addPoweredBy(req, res) { res.setHeader(\"X-Powered-By\", \"Node built-ins\"); }\nconst middleware = [addRequestId, addPlace, addPoweredBy];\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet nextId = 1;\nfunction addRequestId(req, res) { res.setHeader(\"X-Request-Id\", String(nextId++)); }\nfunction addPlace(req, res) { res.setHeader(\"X-Place\", \"sari-sari\"); }\nfunction addPoweredBy(req, res) { res.setHeader(\"X-Powered-By\", \"Node built-ins\"); }\nconst middleware = [addRequestId, addPlace, addPoweredBy];\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  for (const step of middleware) step(req, res);\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "middleware-sari-sari"
  },
  {
    "id": "api-middleware-sari-sari-5",
    "index": 55,
    "task": "You will add a function to let other websites call this API. This uses CORS headers. The code below adds this function to the list. You do not change the handler. This way, every answer lets other sites use it.\n\nIn server.js:\n```\nfunction allowBrowsers(req, res) { res.setHeader(\"Access-Control-Allow-Origin\", \"*\"); }\nconst middleware = [addRequestId, addPlace, addPoweredBy, allowBrowsers];\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "cors",
        "label": "Answers send Access-Control-Allow-Origin: *",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items"
          }
        ],
        "header": {
          "name": "access-control-allow-origin",
          "value": "*"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of CORS as a door that opens for other websites."
      },
      {
        "level": 2,
        "text": "Add the code to the list, right after addPoweredBy.\n\nIn server.js:\n```\nfunction allowBrowsers(req, res) { res.setHeader(\"Access-Control-Allow-Origin\", \"*\"); }\nconst middleware = [addRequestId, addPlace, addPoweredBy, allowBrowsers];\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet nextId = 1;\nfunction addRequestId(req, res) { res.setHeader(\"X-Request-Id\", String(nextId++)); }\nfunction addPlace(req, res) { res.setHeader(\"X-Place\", \"sari-sari\"); }\nfunction addPoweredBy(req, res) { res.setHeader(\"X-Powered-By\", \"Node built-ins\"); }\nfunction allowBrowsers(req, res) { res.setHeader(\"Access-Control-Allow-Origin\", \"*\"); }\nconst middleware = [addRequestId, addPlace, addPoweredBy, allowBrowsers];\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  for (const step of middleware) step(req, res);\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-cors"
    ],
    "estimatedMinutes": 4,
    "projectId": "middleware-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: middleware-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-middleware-sari-sari-6",
    "index": 56,
    "task": "You add a function called requireKey. This function checks if the request has the right API key. If not, it sends a 401 error. You add this function to the middleware list. Then, when the loop runs, it stops early if requireKey returns true. The code below shows what to add. Run the checker to confirm it works.\n\nIn server.js:\n```\nfunction requireKey(req, res) { if (req.headers[\"x-api-key\"] !== \"secret123\") { send(res, 401, { error: \"Missing or wrong API key\" }); return true; } }\nconst middleware = [addRequestId, addPlace, addPoweredBy, allowBrowsers, requireKey];\n  for (const step of middleware) if (step(req, res)) return;\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "nokey",
        "label": "GET /items without a key answers 401",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items"
          }
        ],
        "status": 401
      },
      {
        "id": "key",
        "label": "GET /items with the key answers 200",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items",
            "headers": {
              "x-api-key": "secret123"
            }
          }
        ],
        "status": 200
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The key check must happen before any other middleware, so put it in the list after allowBrowsers."
      },
      {
        "level": 2,
        "text": "Add the requireKey function right before the middleware list, then add it to the list.\n\nIn server.js:\n```\nfunction requireKey(req, res) { if (req.headers[\"x-api-key\"] !== \"secret123\") { send(res, 401, { error: \"Missing or wrong API key\" }); return true; } }\nconst middleware = [addRequestId, addPlace, addPoweredBy, allowBrowsers, requireKey];\n  for (const step of middleware) if (step(req, res)) return;\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet nextId = 1;\nfunction addRequestId(req, res) { res.setHeader(\"X-Request-Id\", String(nextId++)); }\nfunction addPlace(req, res) { res.setHeader(\"X-Place\", \"sari-sari\"); }\nfunction addPoweredBy(req, res) { res.setHeader(\"X-Powered-By\", \"Node built-ins\"); }\nfunction allowBrowsers(req, res) { res.setHeader(\"Access-Control-Allow-Origin\", \"*\"); }\nfunction requireKey(req, res) { if (req.headers[\"x-api-key\"] !== \"secret123\") { send(res, 401, { error: \"Missing or wrong API key\" }); return true; } }\nconst middleware = [addRequestId, addPlace, addPoweredBy, allowBrowsers, requireKey];\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  for (const step of middleware) if (step(req, res)) return;\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-api-key"
    ],
    "estimatedMinutes": 4,
    "projectId": "middleware-sari-sari"
  },
  {
    "id": "api-middleware-sari-sari-7",
    "index": 57,
    "task": "You add a line at the top of the handler. This line checks if the request is for /health. If so, it sends a 200 OK response and stops the loop. This lets monitors check the server without a key. The code below shows what to add. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "health",
        "label": "GET /health answers without a key",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/health"
          }
        ],
        "status": 200,
        "bodyContains": "\"ok\":true"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Put this check right after the start of the handler, before the loop runs."
      },
      {
        "level": 2,
        "text": "The /health check must happen before the key check, so put it before requireKey.\n\nIn server.js:\n```\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet nextId = 1;\nfunction addRequestId(req, res) { res.setHeader(\"X-Request-Id\", String(nextId++)); }\nfunction addPlace(req, res) { res.setHeader(\"X-Place\", \"sari-sari\"); }\nfunction addPoweredBy(req, res) { res.setHeader(\"X-Powered-By\", \"Node built-ins\"); }\nfunction allowBrowsers(req, res) { res.setHeader(\"Access-Control-Allow-Origin\", \"*\"); }\nfunction requireKey(req, res) { if (req.headers[\"x-api-key\"] !== \"secret123\") { send(res, 401, { error: \"Missing or wrong API key\" }); return true; } }\nconst middleware = [addRequestId, addPlace, addPoweredBy, allowBrowsers, requireKey];\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  for (const step of middleware) if (step(req, res)) return;\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "middleware-sari-sari"
  },
  {
    "id": "api-middleware-sari-sari-8",
    "index": 58,
    "task": "You change the allowBrowsers function. Now, if the request method is OPTIONS, you send a 204 status and stop the loop. This lets browsers ask permission before making real requests. The code below shows what to change. Run the checker to confirm it works.\n\nIn server.js:\n```\nfunction allowBrowsers(req, res) { res.setHeader(\"Access-Control-Allow-Origin\", \"*\"); if (req.method === \"OPTIONS\") { res.statusCode = 204; res.end(); return true; } }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "preflight",
        "label": "OPTIONS /items answers 204 without a key",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "OPTIONS",
            "path": "/items"
          }
        ],
        "status": 204
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The preflight check must happen before the key check, so put it before requireKey."
      },
      {
        "level": 2,
        "text": "The OPTIONS check must come right after setting the Access-Control-Allow-Origin header.\n\nIn server.js:\n```\nfunction allowBrowsers(req, res) { res.setHeader(\"Access-Control-Allow-Origin\", \"*\"); if (req.method === \"OPTIONS\") { res.statusCode = 204; res.end(); return true; } }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet nextId = 1;\nfunction addRequestId(req, res) { res.setHeader(\"X-Request-Id\", String(nextId++)); }\nfunction addPlace(req, res) { res.setHeader(\"X-Place\", \"sari-sari\"); }\nfunction addPoweredBy(req, res) { res.setHeader(\"X-Powered-By\", \"Node built-ins\"); }\nfunction allowBrowsers(req, res) { res.setHeader(\"Access-Control-Allow-Origin\", \"*\"); if (req.method === \"OPTIONS\") { res.statusCode = 204; res.end(); return true; } }\nfunction requireKey(req, res) { if (req.headers[\"x-api-key\"] !== \"secret123\") { send(res, 401, { error: \"Missing or wrong API key\" }); return true; } }\nconst middleware = [addRequestId, addPlace, addPoweredBy, allowBrowsers, requireKey];\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  for (const step of middleware) if (step(req, res)) return;\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-preflight"
    ],
    "estimatedMinutes": 4,
    "projectId": "middleware-sari-sari"
  },
  {
    "id": "api-middleware-sari-sari-9",
    "index": 59,
    "task": "You add a line after the loop. This line checks if the request is for /stats. If so, it sends a 200 OK response with the number of requests served. The code below shows what to add. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (req.url === \"/stats\") return send(res, 200, { served: nextId - 1 });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "stats",
        "label": "After two requests, GET /stats answers served 3",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items",
            "headers": {
              "x-api-key": "secret123"
            }
          },
          {
            "method": "GET",
            "path": "/items",
            "headers": {
              "x-api-key": "secret123"
            }
          },
          {
            "method": "GET",
            "path": "/stats",
            "headers": {
              "x-api-key": "secret123"
            }
          }
        ],
        "bodyContains": "\"served\":3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Put this check right after the loop, so it runs after all middleware."
      },
      {
        "level": 2,
        "text": "The /stats check must happen after the key check, so put it after requireKey.\n\nIn server.js:\n```\n  if (req.url === \"/stats\") return send(res, 200, { served: nextId - 1 });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet nextId = 1;\nfunction addRequestId(req, res) { res.setHeader(\"X-Request-Id\", String(nextId++)); }\nfunction addPlace(req, res) { res.setHeader(\"X-Place\", \"sari-sari\"); }\nfunction addPoweredBy(req, res) { res.setHeader(\"X-Powered-By\", \"Node built-ins\"); }\nfunction allowBrowsers(req, res) { res.setHeader(\"Access-Control-Allow-Origin\", \"*\"); if (req.method === \"OPTIONS\") { res.statusCode = 204; res.end(); return true; } }\nfunction requireKey(req, res) { if (req.headers[\"x-api-key\"] !== \"secret123\") { send(res, 401, { error: \"Missing or wrong API key\" }); return true; } }\nconst middleware = [addRequestId, addPlace, addPoweredBy, allowBrowsers, requireKey];\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  for (const step of middleware) if (step(req, res)) return;\n  if (req.url === \"/stats\") return send(res, 200, { served: nextId - 1 });\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "middleware-sari-sari"
  },
  {
    "id": "api-middleware-sari-sari-10",
    "index": 60,
    "task": "You add a function called secureHeaders. This function adds a security header to every response. You add this function to the middleware list. The code below shows what to add. Run the checker to confirm it works.\n\nIn server.js:\n```\nfunction secureHeaders(req, res) { res.setHeader(\"X-Content-Type-Options\", \"nosniff\"); }\nconst middleware = [addRequestId, addPlace, addPoweredBy, allowBrowsers, secureHeaders, requireKey];\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "nosniff",
        "label": "Answers send X-Content-Type-Options: nosniff",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items",
            "headers": {
              "x-api-key": "secret123"
            }
          }
        ],
        "header": {
          "name": "x-content-type-options",
          "value": "nosniff"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The secureHeaders function must run after all other middleware, so put it last in the list."
      },
      {
        "level": 2,
        "text": "Add the secureHeaders function right before the middleware list, then add it to the list.\n\nIn server.js:\n```\nfunction secureHeaders(req, res) { res.setHeader(\"X-Content-Type-Options\", \"nosniff\"); }\nconst middleware = [addRequestId, addPlace, addPoweredBy, allowBrowsers, secureHeaders, requireKey];\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet nextId = 1;\nfunction addRequestId(req, res) { res.setHeader(\"X-Request-Id\", String(nextId++)); }\nfunction addPlace(req, res) { res.setHeader(\"X-Place\", \"sari-sari\"); }\nfunction addPoweredBy(req, res) { res.setHeader(\"X-Powered-By\", \"Node built-ins\"); }\nfunction allowBrowsers(req, res) { res.setHeader(\"Access-Control-Allow-Origin\", \"*\"); if (req.method === \"OPTIONS\") { res.statusCode = 204; res.end(); return true; } }\nfunction requireKey(req, res) { if (req.headers[\"x-api-key\"] !== \"secret123\") { send(res, 401, { error: \"Missing or wrong API key\" }); return true; } }\nfunction secureHeaders(req, res) { res.setHeader(\"X-Content-Type-Options\", \"nosniff\"); }\nconst middleware = [addRequestId, addPlace, addPoweredBy, allowBrowsers, secureHeaders, requireKey];\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  for (const step of middleware) if (step(req, res)) return;\n  if (req.url === \"/stats\") return send(res, 200, { served: nextId - 1 });\n  if (req.url === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-security-header"
    ],
    "estimatedMinutes": 4,
    "projectId": "middleware-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: sqlite-storage-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-sqlite-storage-sari-sari-1",
    "index": 61,
    "task": "You will open a database in memory. This is fast and temporary. You will make a table called items. This holds the store's products. You will answer a request to /items. The code below does this. Run the checker to test it.\n\nIn server.js:\n```\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "empty",
        "label": "GET /items answers an empty list from the database",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items"
          }
        ],
        "status": 200,
        "bodyContains": "[]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of the database as a notebook you open and close. It holds the store's items."
      },
      {
        "level": 2,
        "text": "Add the code above createItem and before the 404 line.\n\nIn server.js:\n```\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-sqlite"
    ],
    "estimatedMinutes": 4,
    "projectId": "sqlite-storage-sari-sari"
  },
  {
    "id": "api-sqlite-storage-sari-sari-2",
    "index": 62,
    "task": "You will add three items to the database. Rice, Soap, and Egg. You will use a prepared insert. This is safe and fast. You will run the code below after the CREATE TABLE line. Run the checker to test it.\n\nIn server.js:\n```\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "rows",
        "label": "GET /items includes Rice from the database",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items"
          }
        ],
        "bodyContains": "\"name\":\"Rice\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the prepared insert to add items without writing SQL each time."
      },
      {
        "level": 2,
        "text": "Add the code after the CREATE TABLE line.\n\nIn server.js:\n```\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-insert-rows"
    ],
    "estimatedMinutes": 4,
    "projectId": "sqlite-storage-sari-sari"
  },
  {
    "id": "api-sqlite-storage-sari-sari-3",
    "index": 63,
    "task": "You will change the SQL to sort items by price. Cheapest first. You will use ORDER BY. This helps the customer see the cheapest items first. You will change the SQL in the GET /items line. Run the checker to test it.\n\nIn server.js:\n```\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items ORDER BY price\").all());\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "ordered",
        "label": "GET /items lists the items cheapest first, starting with Egg",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items"
          }
        ],
        "bodyContains": "[{\"id\":3,\"name\":\"Egg\",\"price\":9},{\"id\":2,\"name\":\"Soap\",\"price\":25},{\"id\":1,\"name\":\"Rice\",\"price\":50}]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "ORDER BY tells the database to sort the rows before sending them."
      },
      {
        "level": 2,
        "text": "Change the SQL in the GET /items line.\n\nIn server.js:\n```\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items ORDER BY price\").all());\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items ORDER BY price\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-order-by"
    ],
    "estimatedMinutes": 3,
    "projectId": "sqlite-storage-sari-sari"
  },
  {
    "id": "api-sqlite-storage-sari-sari-4",
    "index": 64,
    "task": "You will add a route to count the items. You will use COUNT(*). This tells how many rows there are. You will add the code below after the GET /items line. Run the checker to test it.\n\nIn server.js:\n```\n  if (req.url === \"/items/count\") return send(res, 200, db.prepare(\"SELECT COUNT(*) AS count FROM items\").get());\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "GET /items/count answers {\"count\":3}",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/count"
          }
        ],
        "bodyContains": "{\"count\":3}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "COUNT(*) asks the database how many rows there are."
      },
      {
        "level": 2,
        "text": "Add the code after the GET /items line.\n\nIn server.js:\n```\n  if (req.url === \"/items/count\") return send(res, 200, db.prepare(\"SELECT COUNT(*) AS count FROM items\").get());\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items ORDER BY price\").all());\n  if (req.url === \"/items/count\") return send(res, 200, db.prepare(\"SELECT COUNT(*) AS count FROM items\").get());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-count"
    ],
    "estimatedMinutes": 3,
    "projectId": "sqlite-storage-sari-sari"
  },
  {
    "id": "api-sqlite-storage-sari-sari-5",
    "index": 65,
    "task": "You will answer one item by its id. You will use a SQL parameter. This is safe. You will add the code below before the 404 line. Run the checker to test it.\n\nIn server.js:\n```\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match) return send(res, 200, db.prepare(\"SELECT * FROM items WHERE id = ?\").get(Number(match[1])));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "one",
        "label": "GET /items/2 answers Soap",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/2"
          }
        ],
        "bodyContains": "\"name\":\"Soap\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "A SQL parameter is a ? that you fill with a value separately. This keeps the value as data, not code."
      },
      {
        "level": 2,
        "text": "Add the code before the 404 line.\n\nIn server.js:\n```\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match) return send(res, 200, db.prepare(\"SELECT * FROM items WHERE id = ?\").get(Number(match[1])));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items ORDER BY price\").all());\n  if (req.url === \"/items/count\") return send(res, 200, db.prepare(\"SELECT COUNT(*) AS count FROM items\").get());\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match) return send(res, 200, db.prepare(\"SELECT * FROM items WHERE id = ?\").get(Number(match[1])));\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-sql-parameter"
    ],
    "estimatedMinutes": 4,
    "projectId": "sqlite-storage-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: sqlite-storage-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-sqlite-storage-sari-sari-6",
    "index": 66,
    "task": "You change one line in server.js. That line checks if an item exists by ID. If no row matches, it now answers 404. This helps the store app know when a customer asks for something not in stock. The code below does this. Run the checker to confirm.\n\nIn server.js:\n```\n  if (match) { const row = db.prepare(\"SELECT * FROM items WHERE id = ?\").get(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "none",
        "label": "GET /items/99 answers 404",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/99"
          }
        ],
        "status": 404
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If no row matches, send 404. Don't send 200."
      },
      {
        "level": 2,
        "text": "Put the code inside the if (match) block, right after the SELECT line.\n\nIn server.js:\n```\n  if (match) { const row = db.prepare(\"SELECT * FROM items WHERE id = ?\").get(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items ORDER BY price\").all());\n  if (req.url === \"/items/count\") return send(res, 200, db.prepare(\"SELECT COUNT(*) AS count FROM items\").get());\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match) { const row = db.prepare(\"SELECT * FROM items WHERE id = ?\").get(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "sqlite-storage-sari-sari"
  },
  {
    "id": "api-sqlite-storage-sari-sari-7",
    "index": 67,
    "task": "You replace one line with three lines. The first reads the item data from the request. The second inserts it into the database. The third sends back the new row's ID. This lets the store app know what ID to use for the new item. The code below does this. Run the checker to confirm.\n\nIn server.js:\n```\n  const data = JSON.parse(await readBody(req));\n  const result = insert.run(data.name, data.price);\n  return send(res, 201, { id: Number(result.lastInsertRowid), ...data });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "insert",
        "label": "POST /items answers 201 with id 4",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"name\":\"Tea\",\"price\":12}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 201,
        "bodyContains": "\"id\":4"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use JSON.parse to read the body. Then insert the data. Then send the ID."
      },
      {
        "level": 2,
        "text": "Put the code inside the createItem function, right after the if (req.method === 'POST') line.\n\nIn server.js:\n```\n  const data = JSON.parse(await readBody(req));\n  const result = insert.run(data.name, data.price);\n  return send(res, 201, { id: Number(result.lastInsertRowid), ...data });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nasync function createItem(req, res) {\n  const data = JSON.parse(await readBody(req));\n  const result = insert.run(data.name, data.price);\n  return send(res, 201, { id: Number(result.lastInsertRowid), ...data });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items ORDER BY price\").all());\n  if (req.url === \"/items/count\") return send(res, 200, db.prepare(\"SELECT COUNT(*) AS count FROM items\").get());\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match) { const row = db.prepare(\"SELECT * FROM items WHERE id = ?\").get(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-last-insert-id"
    ],
    "estimatedMinutes": 4,
    "projectId": "sqlite-storage-sari-sari"
  },
  {
    "id": "api-sqlite-storage-sari-sari-8",
    "index": 68,
    "task": "You add one route after the count route. This route answers with the total price of all items. This helps the store owner know how much money is in stock. The code below does this. Run the checker to confirm.\n\nIn server.js:\n```\n  if (req.url === \"/items/total\") return send(res, 200, db.prepare(\"SELECT SUM(price) AS total FROM items\").get());\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "sum",
        "label": "GET /items/total answers the sum of prices",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/total"
          }
        ],
        "bodyContains": "{\"total\":84}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM to add up the prices. Send the result as JSON."
      },
      {
        "level": 2,
        "text": "Put the code after the count route, right before the next route.\n\nIn server.js:\n```\n  if (req.url === \"/items/total\") return send(res, 200, db.prepare(\"SELECT SUM(price) AS total FROM items\").get());\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nasync function createItem(req, res) {\n  const data = JSON.parse(await readBody(req));\n  const result = insert.run(data.name, data.price);\n  return send(res, 201, { id: Number(result.lastInsertRowid), ...data });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items ORDER BY price\").all());\n  if (req.url === \"/items/count\") return send(res, 200, db.prepare(\"SELECT COUNT(*) AS count FROM items\").get());\n  if (req.url === \"/items/total\") return send(res, 200, db.prepare(\"SELECT SUM(price) AS total FROM items\").get());\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match) { const row = db.prepare(\"SELECT * FROM items WHERE id = ?\").get(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-sum"
    ],
    "estimatedMinutes": 3,
    "projectId": "sqlite-storage-sari-sari"
  },
  {
    "id": "api-sqlite-storage-sari-sari-9",
    "index": 69,
    "task": "You add two lines after the total route. The first gets the search text from the URL. The second uses LIKE to find items matching that text. This lets the store app search for items by name. The code below does this. Run the checker to confirm.\n\nIn server.js:\n```\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items/search\") return send(res, 200, db.prepare(\"SELECT * FROM items WHERE name LIKE ?\").all(`%${url.searchParams.get(\"q\") ?? \"\"}%`));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "like",
        "label": "GET /items/search?q=gg finds Egg",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/search?q=gg"
          }
        ],
        "bodyContains": "\"name\":\"Egg\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use URL to get the search parameter. Use LIKE with % to match any text."
      },
      {
        "level": 2,
        "text": "Put the code after the total route, right before the next route.\n\nIn server.js:\n```\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items/search\") return send(res, 200, db.prepare(\"SELECT * FROM items WHERE name LIKE ?\").all(`%${url.searchParams.get(\"q\") ?? \"\"}%`));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nasync function createItem(req, res) {\n  const data = JSON.parse(await readBody(req));\n  const result = insert.run(data.name, data.price);\n  return send(res, 201, { id: Number(result.lastInsertRowid), ...data });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items ORDER BY price\").all());\n  if (req.url === \"/items/count\") return send(res, 200, db.prepare(\"SELECT COUNT(*) AS count FROM items\").get());\n  if (req.url === \"/items/total\") return send(res, 200, db.prepare(\"SELECT SUM(price) AS total FROM items\").get());\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items/search\") return send(res, 200, db.prepare(\"SELECT * FROM items WHERE name LIKE ?\").all(`%${url.searchParams.get(\"q\") ?? \"\"}%`));\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match) { const row = db.prepare(\"SELECT * FROM items WHERE id = ?\").get(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-like-search"
    ],
    "estimatedMinutes": 4,
    "projectId": "sqlite-storage-sari-sari"
  },
  {
    "id": "api-sqlite-storage-sari-sari-10",
    "index": 70,
    "task": "You change three lines. The first opens a database file. The second creates the table if it doesn't exist. The third adds sample rows if the table is empty. This lets the store app keep data even after restarting. The code below does this. Run the checker to confirm.\n\nIn server.js:\n```\nconst db = new DatabaseSync(process.env.DB_FILE ?? \":memory:\");\ndb.exec(\"CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nif (db.prepare(\"SELECT COUNT(*) AS count FROM items\").get().count === 0) for (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "file",
        "label": "With DB_FILE=shop.db the server answers from a file",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items"
          }
        ],
        "env": {
          "DB_FILE": "shop.db"
        },
        "status": 200,
        "bodyContains": "\"name\":\"Rice\""
      },
      {
        "id": "saved",
        "label": "shop.db exists on disk",
        "kind": "local-file-exists",
        "path": "shop.db"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use process.env.DB_FILE to get the file name. Use CREATE TABLE IF NOT EXISTS to avoid errors."
      },
      {
        "level": 2,
        "text": "Put the code at the top of server.js, right after the const db = line.\n\nIn server.js:\n```\nconst db = new DatabaseSync(process.env.DB_FILE ?? \":memory:\");\ndb.exec(\"CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nif (db.prepare(\"SELECT COUNT(*) AS count FROM items\").get().count === 0) for (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(process.env.DB_FILE ?? \":memory:\");\ndb.exec(\"CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nif (db.prepare(\"SELECT COUNT(*) AS count FROM items\").get().count === 0) for (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nasync function createItem(req, res) {\n  const data = JSON.parse(await readBody(req));\n  const result = insert.run(data.name, data.price);\n  return send(res, 201, { id: Number(result.lastInsertRowid), ...data });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items ORDER BY price\").all());\n  if (req.url === \"/items/count\") return send(res, 200, db.prepare(\"SELECT COUNT(*) AS count FROM items\").get());\n  if (req.url === \"/items/total\") return send(res, 200, db.prepare(\"SELECT SUM(price) AS total FROM items\").get());\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items/search\") return send(res, 200, db.prepare(\"SELECT * FROM items WHERE name LIKE ?\").all(`%${url.searchParams.get(\"q\") ?? \"\"}%`));\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match) { const row = db.prepare(\"SELECT * FROM items WHERE id = ?\").get(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-database-file"
    ],
    "estimatedMinutes": 5,
    "projectId": "sqlite-storage-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: sqlite-changes-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-sqlite-changes-sari-sari-1",
    "index": 71,
    "task": "You will delete a row from the store's database. Go to server.js. Replace the line inside deleteItem with three lines. The code below deletes the row, sets the response to 204 No Content, and ends it. This tells the client the row was deleted without sending extra data. Run the checker to test it. The checker will send a DELETE request to /items/1 and confirm it answers 204.\n\nIn server.js:\n```\n  db.prepare(\"DELETE FROM items WHERE id = ?\").run(id);\n  res.statusCode = 204;\n  return res.end();\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function updateItem(req, res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "deleted",
        "label": "DELETE /items/1 answers 204",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "DELETE",
            "path": "/items/1"
          }
        ],
        "status": 204
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of 204 as 'gone, no message needed'."
      },
      {
        "level": 2,
        "text": "Put the three lines inside the deleteItem function, right after the db.prepare line.\n\nIn server.js:\n```\n  db.prepare(\"DELETE FROM items WHERE id = ?\").run(id);\n  res.statusCode = 204;\n  return res.end();\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  db.prepare(\"DELETE FROM items WHERE id = ?\").run(id);\n  res.statusCode = 204;\n  return res.end();\n}\nasync function updateItem(req, res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-delete-row"
    ],
    "estimatedMinutes": 3,
    "projectId": "sqlite-changes-sari-sari"
  },
  {
    "id": "api-sqlite-changes-sari-sari-2",
    "index": 72,
    "task": "You will check if the row was found before deleting it. Go to server.js. Change the DELETE line to store the result. Then add a check after it. If result.changes is 0, it means no row matched, so return 404 with an error message. This stops the server from deleting nothing. Run the checker to test it. The checker will send DELETE to /items/99 and confirm it answers 404.\n\nIn server.js:\n```\n  const result = db.prepare(\"DELETE FROM items WHERE id = ?\").run(id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function updateItem(req, res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "none",
        "label": "DELETE /items/99 answers 404",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "DELETE",
            "path": "/items/99"
          }
        ],
        "status": 404
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If result.changes is 0, nothing was deleted, that's an error."
      },
      {
        "level": 2,
        "text": "Put the check right after the DELETE line, inside deleteItem.\n\nIn server.js:\n```\n  const result = db.prepare(\"DELETE FROM items WHERE id = ?\").run(id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  const result = db.prepare(\"DELETE FROM items WHERE id = ?\").run(id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n  res.statusCode = 204;\n  return res.end();\n}\nasync function updateItem(req, res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-changes"
    ],
    "estimatedMinutes": 4,
    "projectId": "sqlite-changes-sari-sari"
  },
  {
    "id": "api-sqlite-changes-sari-sari-3",
    "index": 73,
    "task": "You will update a row's price. Go to server.js. Replace the line inside updateItem with three lines. The code below parses the request body, updates the price using UPDATE, and sends back the updated row. This lets the client know the price changed. Run the checker to test it. The checker will send PUT to /items/1 with price 99 and confirm it answers with the new price.\n\nIn server.js:\n```\n  const data = JSON.parse(await readBody(req));\n  db.prepare(\"UPDATE items SET price = ? WHERE id = ?\").run(data.price, id);\n  return send(res, 200, one(id));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function updateItem(req, res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "updated",
        "label": "PUT /items/1 with price 99 answers the new price",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "PUT",
            "path": "/items/1",
            "body": "{\"price\":99}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "bodyContains": "\"price\":99"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "UPDATE changes the price only if the row exists and matches the ID."
      },
      {
        "level": 2,
        "text": "Put the three lines inside the updateItem function, right after the JSON.parse line.\n\nIn server.js:\n```\n  const data = JSON.parse(await readBody(req));\n  db.prepare(\"UPDATE items SET price = ? WHERE id = ?\").run(data.price, id);\n  return send(res, 200, one(id));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  const result = db.prepare(\"DELETE FROM items WHERE id = ?\").run(id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n  res.statusCode = 204;\n  return res.end();\n}\nasync function updateItem(req, res, id) {\n  const data = JSON.parse(await readBody(req));\n  db.prepare(\"UPDATE items SET price = ? WHERE id = ?\").run(data.price, id);\n  return send(res, 200, one(id));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-update-row"
    ],
    "estimatedMinutes": 4,
    "projectId": "sqlite-changes-sari-sari"
  },
  {
    "id": "api-sqlite-changes-sari-sari-4",
    "index": 74,
    "task": "You will check if the row was found before updating it. Go to server.js. Change the UPDATE line to store the result. Then add a check after it. If no rows were updated, return 404. This stops the server from updating nothing. Run the checker to test it. The checker will send PUT to /items/99 and confirm it answers 404.\n\nIn server.js:\n```\n  const result = db.prepare(\"UPDATE items SET price = ? WHERE id = ?\").run(data.price, id);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function updateItem(req, res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "none",
        "label": "PUT /items/99 answers 404",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "PUT",
            "path": "/items/99",
            "body": "{\"price\":1}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 404
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If no rows were updated, it means the ID was wrong or the row doesn't exist."
      },
      {
        "level": 2,
        "text": "Put the check right after the UPDATE line, inside updateItem.\n\nIn server.js:\n```\n  const result = db.prepare(\"UPDATE items SET price = ? WHERE id = ?\").run(data.price, id);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  const result = db.prepare(\"DELETE FROM items WHERE id = ?\").run(id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n  res.statusCode = 204;\n  return res.end();\n}\nasync function updateItem(req, res, id) {\n  const data = JSON.parse(await readBody(req));\n  const result = db.prepare(\"UPDATE items SET price = ? WHERE id = ?\").run(data.price, id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n  return send(res, 200, one(id));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "sqlite-changes-sari-sari"
  },
  {
    "id": "api-sqlite-changes-sari-sari-5",
    "index": 75,
    "task": "You will check if the price is a whole number 0 or more. Go to server.js. Add one line after the JSON.parse line. The code below checks if data.price is not a whole number or less than 0. If so, return 422 with an error message. This stops the server from accepting bad prices. Run the checker to test it. The checker will send PUT to /items/1 with price -5 and confirm it answers 422.\n\nIn server.js:\n```\n  if (!Number.isInteger(data.price) || data.price < 0) return send(res, 422, { error: \"price must be a whole number 0 or more\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function updateItem(req, res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "bad",
        "label": "PUT /items/1 with price -5 answers 422",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "PUT",
            "path": "/items/1",
            "body": "{\"price\":-5}",
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
        "text": "422 means 'invalid input', the price must be a whole number 0 or more."
      },
      {
        "level": 2,
        "text": "Put the check right after JSON.parse, inside updateItem.\n\nIn server.js:\n```\n  if (!Number.isInteger(data.price) || data.price < 0) return send(res, 422, { error: \"price must be a whole number 0 or more\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  const result = db.prepare(\"DELETE FROM items WHERE id = ?\").run(id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n  res.statusCode = 204;\n  return res.end();\n}\nasync function updateItem(req, res, id) {\n  const data = JSON.parse(await readBody(req));\n  if (!Number.isInteger(data.price) || data.price < 0) return send(res, 422, { error: \"price must be a whole number 0 or more\" });\n  const result = db.prepare(\"UPDATE items SET price = ? WHERE id = ?\").run(data.price, id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n  return send(res, 200, one(id));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "sqlite-changes-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: sqlite-changes-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-sqlite-changes-sari-sari-6",
    "index": 76,
    "task": "You will change the price check and the UPDATE line. The code below lets PUT change the name, the price, or both. It keeps whatever is not sent. This is important because customers may only want to change one thing, not both. The code below uses COALESCE. COALESCE(a, b) uses a unless it is missing, then falls back to b. It keeps old values when a field is not sent.\n\nIn server.js:\n```\n  if (data.price !== undefined && (!Number.isInteger(data.price) || data.price < 0)) return send(res, 422, { error: \"price must be a whole number 0 or more\" });\n  const result = db.prepare(\"UPDATE items SET name = COALESCE(?, name), price = COALESCE(?, price) WHERE id = ?\").run(data.name ?? null, data.price ?? null, id);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function updateItem(req, res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "PUT /items/1 with only a name keeps the price",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "PUT",
            "path": "/items/1",
            "body": "{\"name\":\"Tea\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "bodyContains": "\"name\":\"Tea\",\"price\":50"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of COALESCE like a safety net: if you don't send a value, it doesn't change the old one."
      },
      {
        "level": 2,
        "text": "Put the code in the PUT /items/1 section, right after the price check.\n\nIn server.js:\n```\n  if (data.price !== undefined && (!Number.isInteger(data.price) || data.price < 0)) return send(res, 422, { error: \"price must be a whole number 0 or more\" });\n  const result = db.prepare(\"UPDATE items SET name = COALESCE(?, name), price = COALESCE(?, price) WHERE id = ?\").run(data.name ?? null, data.price ?? null, id);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  const result = db.prepare(\"DELETE FROM items WHERE id = ?\").run(id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n  res.statusCode = 204;\n  return res.end();\n}\nasync function updateItem(req, res, id) {\n  const data = JSON.parse(await readBody(req));\n  if (data.price !== undefined && (!Number.isInteger(data.price) || data.price < 0)) return send(res, 422, { error: \"price must be a whole number 0 or more\" });\n  const result = db.prepare(\"UPDATE items SET name = COALESCE(?, name), price = COALESCE(?, price) WHERE id = ?\").run(data.name ?? null, data.price ?? null, id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n  return send(res, 200, one(id));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-coalesce"
    ],
    "estimatedMinutes": 5,
    "projectId": "sqlite-changes-sari-sari"
  },
  {
    "id": "api-sqlite-changes-sari-sari-7",
    "index": 77,
    "task": "You will add one route at the top of the handler. The code below lets you raise every price by 1 inside a transaction. A transaction groups changes so they all happen together or not at all. This is important because if one price fails, no price changes at all. The code below uses BEGIN and COMMIT to start and finish the transaction.\n\nIn server.js:\n```\n  if (req.url === \"/items/raise\" && req.method === \"POST\") { db.exec(\"BEGIN\"); db.prepare(\"UPDATE items SET price = price + 1\").run(); db.exec(\"COMMIT\"); return send(res, 200, db.prepare(\"SELECT * FROM items\").all()); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function updateItem(req, res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "raise",
        "label": "POST /items/raise answers the raised prices",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items/raise",
            "body": "{}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "bodyContains": "\"price\":51"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of a transaction like a group of actions that must all succeed or none at all."
      },
      {
        "level": 2,
        "text": "Put the code right after the PUT route, before the DELETE route.\n\nIn server.js:\n```\n  if (req.url === \"/items/raise\" && req.method === \"POST\") { db.exec(\"BEGIN\"); db.prepare(\"UPDATE items SET price = price + 1\").run(); db.exec(\"COMMIT\"); return send(res, 200, db.prepare(\"SELECT * FROM items\").all()); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  const result = db.prepare(\"DELETE FROM items WHERE id = ?\").run(id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n  res.statusCode = 204;\n  return res.end();\n}\nasync function updateItem(req, res, id) {\n  const data = JSON.parse(await readBody(req));\n  if (data.price !== undefined && (!Number.isInteger(data.price) || data.price < 0)) return send(res, 422, { error: \"price must be a whole number 0 or more\" });\n  const result = db.prepare(\"UPDATE items SET name = COALESCE(?, name), price = COALESCE(?, price) WHERE id = ?\").run(data.name ?? null, data.price ?? null, id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n  return send(res, 200, one(id));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items/raise\" && req.method === \"POST\") { db.exec(\"BEGIN\"); db.prepare(\"UPDATE items SET price = price + 1\").run(); db.exec(\"COMMIT\"); return send(res, 200, db.prepare(\"SELECT * FROM items\").all()); }\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-transaction"
    ],
    "estimatedMinutes": 6,
    "projectId": "sqlite-changes-sari-sari"
  },
  {
    "id": "api-sqlite-changes-sari-sari-8",
    "index": 78,
    "task": "You will add one route after the raise route. The code below lets you count the rows so a delete can be seen. This is important because you need to know how many items are left after deleting. The code below uses COUNT(*) to count all rows.\n\nIn server.js:\n```\n  if (req.url === \"/items/count\") return send(res, 200, db.prepare(\"SELECT COUNT(*) AS count FROM items\").get());\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function updateItem(req, res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "After DELETE /items/1, GET /items/count answers 2",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "DELETE",
            "path": "/items/1"
          },
          {
            "method": "GET",
            "path": "/items/count"
          }
        ],
        "bodyContains": "{\"count\":2}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of COUNT(*) as a counter that tells you how many rows are left after deleting."
      },
      {
        "level": 2,
        "text": "Put the code after the POST /items/raise route, before the DELETE route.\n\nIn server.js:\n```\n  if (req.url === \"/items/count\") return send(res, 200, db.prepare(\"SELECT COUNT(*) AS count FROM items\").get());\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  const result = db.prepare(\"DELETE FROM items WHERE id = ?\").run(id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n  res.statusCode = 204;\n  return res.end();\n}\nasync function updateItem(req, res, id) {\n  const data = JSON.parse(await readBody(req));\n  if (data.price !== undefined && (!Number.isInteger(data.price) || data.price < 0)) return send(res, 422, { error: \"price must be a whole number 0 or more\" });\n  const result = db.prepare(\"UPDATE items SET name = COALESCE(?, name), price = COALESCE(?, price) WHERE id = ?\").run(data.name ?? null, data.price ?? null, id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n  return send(res, 200, one(id));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items/raise\" && req.method === \"POST\") { db.exec(\"BEGIN\"); db.prepare(\"UPDATE items SET price = price + 1\").run(); db.exec(\"COMMIT\"); return send(res, 200, db.prepare(\"SELECT * FROM items\").all()); }\n  if (req.url === \"/items/count\") return send(res, 200, db.prepare(\"SELECT COUNT(*) AS count FROM items\").get());\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "sqlite-changes-sari-sari"
  },
  {
    "id": "api-sqlite-changes-sari-sari-9",
    "index": 79,
    "task": "You will change the GET /items line. The code below sends the number of rows in an X-Total-Count header. This is important because it tells the client how many items there are. The code below uses res.setHeader to add the header.\n\nIn server.js:\n```\n  if (req.url === \"/items\") { const rows = db.prepare(\"SELECT * FROM items\").all(); res.setHeader(\"X-Total-Count\", String(rows.length)); return send(res, 200, rows); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function updateItem(req, res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "header",
        "label": "GET /items sends X-Total-Count: 3",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items"
          }
        ],
        "header": {
          "name": "x-total-count",
          "value": "3"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of X-Total-Count as a label that tells the client how many rows are there."
      },
      {
        "level": 2,
        "text": "Put the code right after the GET /items route, before the send(res, 200, rows); line.\n\nIn server.js:\n```\n  if (req.url === \"/items\") { const rows = db.prepare(\"SELECT * FROM items\").all(); res.setHeader(\"X-Total-Count\", String(rows.length)); return send(res, 200, rows); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  const result = db.prepare(\"DELETE FROM items WHERE id = ?\").run(id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n  res.statusCode = 204;\n  return res.end();\n}\nasync function updateItem(req, res, id) {\n  const data = JSON.parse(await readBody(req));\n  if (data.price !== undefined && (!Number.isInteger(data.price) || data.price < 0)) return send(res, 422, { error: \"price must be a whole number 0 or more\" });\n  const result = db.prepare(\"UPDATE items SET name = COALESCE(?, name), price = COALESCE(?, price) WHERE id = ?\").run(data.name ?? null, data.price ?? null, id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n  return send(res, 200, one(id));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items/raise\" && req.method === \"POST\") { db.exec(\"BEGIN\"); db.prepare(\"UPDATE items SET price = price + 1\").run(); db.exec(\"COMMIT\"); return send(res, 200, db.prepare(\"SELECT * FROM items\").all()); }\n  if (req.url === \"/items/count\") return send(res, 200, db.prepare(\"SELECT COUNT(*) AS count FROM items\").get());\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") { const rows = db.prepare(\"SELECT * FROM items\").all(); res.setHeader(\"X-Total-Count\", String(rows.length)); return send(res, 200, rows); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "sqlite-changes-sari-sari"
  },
  {
    "id": "api-sqlite-changes-sari-sari-10",
    "index": 80,
    "task": "You will add two lines after the count route. The code below lets you search by exact name with a ? parameter. This is important because typed text can never change the SQL. The code below uses URL to get the search parameter and ? to prevent SQL injection. SQL injection happens when typed text becomes part of the SQL itself. ? parameters prevent it.\n\nIn server.js:\n```\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items/search\") return send(res, 200, db.prepare(\"SELECT * FROM items WHERE name = ?\").all(url.searchParams.get(\"name\") ?? \"\"));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nasync function updateItem(req, res, id) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") return send(res, 200, db.prepare(\"SELECT * FROM items\").all());\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "found",
        "label": "GET /items/search?name=Soap finds it",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/search?name=Soap"
          }
        ],
        "bodyContains": "\"name\":\"Soap\""
      },
      {
        "id": "safe",
        "label": "A search for ' OR '1'='1 finds nothing",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/search?name=%27%20OR%20%271%27%3D%271"
          }
        ],
        "status": 200,
        "bodyContains": "[]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of ? as a safe box that keeps typed text out of the SQL."
      },
      {
        "level": 2,
        "text": "Put the code after the GET /items/count route, before the GET /items route.\n\nIn server.js:\n```\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items/search\") return send(res, 200, db.prepare(\"SELECT * FROM items WHERE name = ?\").all(url.searchParams.get(\"name\") ?? \"\"));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { DatabaseSync } from \"node:sqlite\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst db = new DatabaseSync(\":memory:\");\ndb.exec(\"CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)\");\nconst insert = db.prepare(\"INSERT INTO items (name, price) VALUES (?, ?)\");\nfor (const [name, price] of [[\"Rice\",50],[\"Soap\",25],[\"Egg\",9]]) insert.run(name, price);\nconst one = (id) => db.prepare(\"SELECT * FROM items WHERE id = ?\").get(id);\nfunction deleteItem(res, id) {\n  const result = db.prepare(\"DELETE FROM items WHERE id = ?\").run(id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n  res.statusCode = 204;\n  return res.end();\n}\nasync function updateItem(req, res, id) {\n  const data = JSON.parse(await readBody(req));\n  if (data.price !== undefined && (!Number.isInteger(data.price) || data.price < 0)) return send(res, 422, { error: \"price must be a whole number 0 or more\" });\n  const result = db.prepare(\"UPDATE items SET name = COALESCE(?, name), price = COALESCE(?, price) WHERE id = ?\").run(data.name ?? null, data.price ?? null, id);\n  if (result.changes === 0) return send(res, 404, { error: \"Item not found\" });\n  return send(res, 200, one(id));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items/raise\" && req.method === \"POST\") { db.exec(\"BEGIN\"); db.prepare(\"UPDATE items SET price = price + 1\").run(); db.exec(\"COMMIT\"); return send(res, 200, db.prepare(\"SELECT * FROM items\").all()); }\n  if (req.url === \"/items/count\") return send(res, 200, db.prepare(\"SELECT COUNT(*) AS count FROM items\").get());\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items/search\") return send(res, 200, db.prepare(\"SELECT * FROM items WHERE name = ?\").all(url.searchParams.get(\"name\") ?? \"\"));\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: \"Item not found\" }); }\n  if (match && req.method === \"DELETE\") return deleteItem(res, Number(match[1]));\n  if (match && req.method === \"PUT\") return updateItem(req, res, Number(match[1]));\n  if (req.url === \"/items\") { const rows = db.prepare(\"SELECT * FROM items\").all(); res.setHeader(\"X-Total-Count\", String(rows.length)); return send(res, 200, rows); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-sql-injection"
    ],
    "estimatedMinutes": 7,
    "projectId": "sqlite-changes-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: errors-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-errors-sari-sari-1",
    "index": 81,
    "task": "Add a /boom route at the top of handle. This route will throw an error to test the server's error handling. Change the handle call at the bottom to catch any error and send a 500 response. This keeps the server running even when something breaks. The code below shows what to add. Run the checker to confirm the server answers 500 for /boom and keeps running after an error.\n\nIn server.js:\n```\n  if (req.url === \"/boom\") throw new Error(\"Database is down\");\n  handle(req, res).catch(() => send(res, 500, { error: \"Something went wrong\" }));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const item = JSON.parse(await readBody(req));\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "500",
        "label": "GET /boom answers 500",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/boom"
          }
        ],
        "status": 500,
        "bodyContains": "Something went wrong"
      },
      {
        "id": "alive",
        "label": "The server keeps answering after an error",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/boom"
          },
          {
            "method": "GET",
            "path": "/items"
          }
        ],
        "status": 200
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Throw an error in the /boom route to test how the server handles it."
      },
      {
        "level": 2,
        "text": "Add the code at the top of handle and change the bottom catch to send 500.\n\nIn server.js:\n```\n  if (req.url === \"/boom\") throw new Error(\"Database is down\");\n  handle(req, res).catch(() => send(res, 500, { error: \"Something went wrong\" }));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const item = JSON.parse(await readBody(req));\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/boom\") throw new Error(\"Database is down\");\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res).catch(() => send(res, 500, { error: \"Something went wrong\" }));\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-server-error"
    ],
    "estimatedMinutes": 3,
    "projectId": "errors-sari-sari"
  },
  {
    "id": "api-errors-sari-sari-2",
    "index": 82,
    "task": "Add a counter variable above handle to track how many errors happen. Change the catch to include this counter in the error answer. This helps you find which error matches a user's report. The code below shows what to add. Run the checker to confirm the first error answers id 1.\n\nIn server.js:\n```\nlet errorCount = 0;\n  handle(req, res).catch(() => send(res, 500, { error: \"Something went wrong\", id: ++errorCount }));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const item = JSON.parse(await readBody(req));\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "id",
        "label": "The first error answers id 1",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/boom"
          }
        ],
        "bodyContains": "\"id\":1"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Track errors with a counter so you can match user reports to server logs."
      },
      {
        "level": 2,
        "text": "Add the counter above handle and update the catch to include it.\n\nIn server.js:\n```\nlet errorCount = 0;\n  handle(req, res).catch(() => send(res, 500, { error: \"Something went wrong\", id: ++errorCount }));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet errorCount = 0;\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const item = JSON.parse(await readBody(req));\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/boom\") throw new Error(\"Database is down\");\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res).catch(() => send(res, 500, { error: \"Something went wrong\", id: ++errorCount }));\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-error-id"
    ],
    "estimatedMinutes": 3,
    "projectId": "errors-sari-sari"
  },
  {
    "id": "api-errors-sari-sari-3",
    "index": 83,
    "task": "Add an HttpError class to let code throw errors with their own status codes. Add a /teapot route that throws this error. Change the catch to use the error's status if it exists, or fall back to 500. This lets deep code say which answer to send. The code below shows what to add. Run the checker to confirm /teapot answers 418 and unexpected errors still hide their details.\n\nIn server.js:\n```\nclass HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }\n  if (req.url === \"/teapot\") throw new HttpError(418, \"I am a teapot\");\n  handle(req, res).catch((error) => send(res, error.status ?? 500, { error: error.status ? error.message : \"Something went wrong\", id: ++errorCount }));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const item = JSON.parse(await readBody(req));\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "teapot",
        "label": "GET /teapot answers 418",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/teapot"
          }
        ],
        "status": 418,
        "bodyContains": "I am a teapot"
      },
      {
        "id": "hidden",
        "label": "Unexpected errors still hide their details",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/boom"
          }
        ],
        "status": 500,
        "bodyContains": "Something went wrong"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Create a custom error class to carry its own status code for better control."
      },
      {
        "level": 2,
        "text": "Add the class, route, and updated catch at the top and bottom of handle.\n\nIn server.js:\n```\nclass HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }\n  if (req.url === \"/teapot\") throw new HttpError(418, \"I am a teapot\");\n  handle(req, res).catch((error) => send(res, error.status ?? 500, { error: error.status ? error.message : \"Something went wrong\", id: ++errorCount }));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet errorCount = 0;\nclass HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const item = JSON.parse(await readBody(req));\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/boom\") throw new Error(\"Database is down\");\n  if (req.url === \"/teapot\") throw new HttpError(418, \"I am a teapot\");\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res).catch((error) => send(res, error.status ?? 500, { error: error.status ? error.message : \"Something went wrong\", id: ++errorCount }));\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-http-error"
    ],
    "estimatedMinutes": 4,
    "projectId": "errors-sari-sari"
  },
  {
    "id": "api-errors-sari-sari-4",
    "index": 84,
    "task": "Add a readJson helper function to read and parse the request body. Use it in createItem to check if the body is valid JSON. If not, throw an HttpError with status 400. This tells users their JSON is broken. The code below shows what to add. Run the checker to confirm POST /items with broken JSON answers 400.\n\nIn server.js:\n```\nasync function readJson(req) { const text = await readBody(req); try { return JSON.parse(text); } catch { throw new HttpError(400, \"Body must be JSON\"); } }\n  const item = await readJson(req);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const item = JSON.parse(await readBody(req));\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "400",
        "label": "POST /items with broken JSON answers 400",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "not json",
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
        "text": "Use a helper to read and check the body, then throw an error if it's not valid JSON."
      },
      {
        "level": 2,
        "text": "Add the helper and use it in createItem before the item assignment.\n\nIn server.js:\n```\nasync function readJson(req) { const text = await readBody(req); try { return JSON.parse(text); } catch { throw new HttpError(400, \"Body must be JSON\"); } }\n  const item = await readJson(req);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet errorCount = 0;\nclass HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { const text = await readBody(req); try { return JSON.parse(text); } catch { throw new HttpError(400, \"Body must be JSON\"); } }\nasync function createItem(req, res) {\n  const item = await readJson(req);\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/boom\") throw new Error(\"Database is down\");\n  if (req.url === \"/teapot\") throw new HttpError(418, \"I am a teapot\");\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res).catch((error) => send(res, error.status ?? 500, { error: error.status ? error.message : \"Something went wrong\", id: ++errorCount }));\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "errors-sari-sari"
  },
  {
    "id": "api-errors-sari-sari-5",
    "index": 85,
    "task": "Add a route before GET /items to check if the method is not GET or POST. If not, set the Allow header to \"GET, POST\" and throw an HttpError with status 405. This tells users which methods are allowed. The code below shows what to add. Run the checker to confirm DELETE /items answers 405 with Allow: GET, POST.\n\nIn server.js:\n```\n  if (req.url === \"/items\" && ![\"GET\", \"POST\"].includes(req.method)) { res.setHeader(\"Allow\", \"GET, POST\"); throw new HttpError(405, \"Method not allowed\"); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const item = JSON.parse(await readBody(req));\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "405",
        "label": "DELETE /items answers 405 with Allow: GET, POST",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "DELETE",
            "path": "/items"
          }
        ],
        "status": 405,
        "header": {
          "name": "allow",
          "value": "GET, POST"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Check the method before the GET route and set the Allow header if it's not allowed."
      },
      {
        "level": 2,
        "text": "Add the route check right before the GET /items line.\n\nIn server.js:\n```\n  if (req.url === \"/items\" && ![\"GET\", \"POST\"].includes(req.method)) { res.setHeader(\"Allow\", \"GET, POST\"); throw new HttpError(405, \"Method not allowed\"); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet errorCount = 0;\nclass HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function readJson(req) { const text = await readBody(req); try { return JSON.parse(text); } catch { throw new HttpError(400, \"Body must be JSON\"); } }\nasync function createItem(req, res) {\n  const item = await readJson(req);\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/boom\") throw new Error(\"Database is down\");\n  if (req.url === \"/teapot\") throw new HttpError(418, \"I am a teapot\");\n  if (req.url === \"/items\" && ![\"GET\", \"POST\"].includes(req.method)) { res.setHeader(\"Allow\", \"GET, POST\"); throw new HttpError(405, \"Method not allowed\"); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res).catch((error) => send(res, error.status ?? 500, { error: error.status ? error.message : \"Something went wrong\", id: ++errorCount }));\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "errors-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: errors-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-errors-sari-sari-6",
    "index": 86,
    "task": "You will change the readBody helper. This helper reads the body of a request. It stops if the body is too big. You will make it stop at 1,000 characters. This protects the server from huge uploads. The code below does this. Run the checker to test it.\n\nIn server.js:\n```\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) { text += chunk; if (text.length > 1000) throw new HttpError(413, \"Body too large\"); } return text; }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const item = JSON.parse(await readBody(req));\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "413",
        "label": "A 2,000-character body answers 413",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"name\":\"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\",\"price\":1}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 413
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of a body as a message. If it's too long, the server can't handle it."
      },
      {
        "level": 2,
        "text": "Put the code in the readBody function in server.js.\n\nIn server.js:\n```\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) { text += chunk; if (text.length > 1000) throw new HttpError(413, \"Body too large\"); } return text; }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet errorCount = 0;\nclass HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) { text += chunk; if (text.length > 1000) throw new HttpError(413, \"Body too large\"); } return text; }\nasync function readJson(req) { const text = await readBody(req); try { return JSON.parse(text); } catch { throw new HttpError(400, \"Body must be JSON\"); } }\nasync function createItem(req, res) {\n  const item = await readJson(req);\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/boom\") throw new Error(\"Database is down\");\n  if (req.url === \"/teapot\") throw new HttpError(418, \"I am a teapot\");\n  if (req.url === \"/items\" && ![\"GET\", \"POST\"].includes(req.method)) { res.setHeader(\"Allow\", \"GET, POST\"); throw new HttpError(405, \"Method not allowed\"); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res).catch((error) => send(res, error.status ?? 500, { error: error.status ? error.message : \"Something went wrong\", id: ++errorCount }));\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-payload-limit"
    ],
    "estimatedMinutes": 4,
    "projectId": "errors-sari-sari"
  },
  {
    "id": "api-errors-sari-sari-7",
    "index": 87,
    "task": "You will change the readJson helper. This helper checks if the body is marked as JSON. If not, it throws 415. This tells the client to send JSON. The code below does this. Run the checker to test it.\n\nIn server.js:\n```\nasync function readJson(req) { if (!req.headers[\"content-type\"]?.includes(\"application/json\")) throw new HttpError(415, \"Send JSON\"); const text = await readBody(req); try { return JSON.parse(text); } catch { throw new HttpError(400, \"Body must be JSON\"); } }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const item = JSON.parse(await readBody(req));\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "415",
        "label": "POST /items with text/plain answers 415",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "name=Tea",
            "headers": {
              "Content-Type": "text/plain"
            }
          }
        ],
        "status": 415
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server needs to know the body is JSON before it can read it."
      },
      {
        "level": 2,
        "text": "Put the code in the readJson function in server.js.\n\nIn server.js:\n```\nasync function readJson(req) { if (!req.headers[\"content-type\"]?.includes(\"application/json\")) throw new HttpError(415, \"Send JSON\"); const text = await readBody(req); try { return JSON.parse(text); } catch { throw new HttpError(400, \"Body must be JSON\"); } }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet errorCount = 0;\nclass HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) { text += chunk; if (text.length > 1000) throw new HttpError(413, \"Body too large\"); } return text; }\nasync function readJson(req) { if (!req.headers[\"content-type\"]?.includes(\"application/json\")) throw new HttpError(415, \"Send JSON\"); const text = await readBody(req); try { return JSON.parse(text); } catch { throw new HttpError(400, \"Body must be JSON\"); } }\nasync function createItem(req, res) {\n  const item = await readJson(req);\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/boom\") throw new Error(\"Database is down\");\n  if (req.url === \"/teapot\") throw new HttpError(418, \"I am a teapot\");\n  if (req.url === \"/items\" && ![\"GET\", \"POST\"].includes(req.method)) { res.setHeader(\"Allow\", \"GET, POST\"); throw new HttpError(405, \"Method not allowed\"); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res).catch((error) => send(res, error.status ?? 500, { error: error.status ? error.message : \"Something went wrong\", id: ++errorCount }));\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "errors-sari-sari"
  },
  {
    "id": "api-errors-sari-sari-8",
    "index": 88,
    "task": "You will add one line in createItem. This line checks if an item with that name already exists. If it does, it throws 409. This stops duplicates. The code below does this. Run the checker to test it.\n\nIn server.js:\n```\n  if (items.some((existing) => existing.name === item.name)) throw new HttpError(409, \"Name already exists\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const item = JSON.parse(await readBody(req));\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "409",
        "label": "POST /items with Rice again answers 409",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"name\":\"Rice\",\"price\":1}",
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
        "text": "Check the list of items before adding a new one. If it's there, don't add it."
      },
      {
        "level": 2,
        "text": "Put the code right after you read the item in createItem.\n\nIn server.js:\n```\n  if (items.some((existing) => existing.name === item.name)) throw new HttpError(409, \"Name already exists\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet errorCount = 0;\nclass HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) { text += chunk; if (text.length > 1000) throw new HttpError(413, \"Body too large\"); } return text; }\nasync function readJson(req) { if (!req.headers[\"content-type\"]?.includes(\"application/json\")) throw new HttpError(415, \"Send JSON\"); const text = await readBody(req); try { return JSON.parse(text); } catch { throw new HttpError(400, \"Body must be JSON\"); } }\nasync function createItem(req, res) {\n  const item = await readJson(req);\n  if (items.some((existing) => existing.name === item.name)) throw new HttpError(409, \"Name already exists\");\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/boom\") throw new Error(\"Database is down\");\n  if (req.url === \"/teapot\") throw new HttpError(418, \"I am a teapot\");\n  if (req.url === \"/items\" && ![\"GET\", \"POST\"].includes(req.method)) { res.setHeader(\"Allow\", \"GET, POST\"); throw new HttpError(405, \"Method not allowed\"); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res).catch((error) => send(res, error.status ?? 500, { error: error.status ? error.message : \"Something went wrong\", id: ++errorCount }));\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-conflict"
    ],
    "estimatedMinutes": 3,
    "projectId": "errors-sari-sari"
  },
  {
    "id": "api-errors-sari-sari-9",
    "index": 89,
    "task": "You will change the catch at the bottom. This part handles errors. You will make it send the status code inside the error body. This helps the client know what went wrong. The code below does this. Run the checker to test it.\n\nIn server.js:\n```\n  handle(req, res).catch((error) => send(res, error.status ?? 500, { error: error.status ? error.message : \"Something went wrong\", status: error.status ?? 500, id: ++errorCount }));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const item = JSON.parse(await readBody(req));\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "status",
        "label": "The /teapot error body includes status 418",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/teapot"
          }
        ],
        "bodyContains": "\"status\":418"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The error body should include the status code so the client knows what to do next."
      },
      {
        "level": 2,
        "text": "Put the code in the catch block at the bottom of server.js.\n\nIn server.js:\n```\n  handle(req, res).catch((error) => send(res, error.status ?? 500, { error: error.status ? error.message : \"Something went wrong\", status: error.status ?? 500, id: ++errorCount }));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet errorCount = 0;\nclass HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) { text += chunk; if (text.length > 1000) throw new HttpError(413, \"Body too large\"); } return text; }\nasync function readJson(req) { if (!req.headers[\"content-type\"]?.includes(\"application/json\")) throw new HttpError(415, \"Send JSON\"); const text = await readBody(req); try { return JSON.parse(text); } catch { throw new HttpError(400, \"Body must be JSON\"); } }\nasync function createItem(req, res) {\n  const item = await readJson(req);\n  if (items.some((existing) => existing.name === item.name)) throw new HttpError(409, \"Name already exists\");\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/boom\") throw new Error(\"Database is down\");\n  if (req.url === \"/teapot\") throw new HttpError(418, \"I am a teapot\");\n  if (req.url === \"/items\" && ![\"GET\", \"POST\"].includes(req.method)) { res.setHeader(\"Allow\", \"GET, POST\"); throw new HttpError(405, \"Method not allowed\"); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res).catch((error) => send(res, error.status ?? 500, { error: error.status ? error.message : \"Something went wrong\", status: error.status ?? 500, id: ++errorCount }));\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "errors-sari-sari"
  },
  {
    "id": "api-errors-sari-sari-10",
    "index": 90,
    "task": "You will replace the last line of handle. This line throws a 404 error. It will include the method and path. This tells the client the route doesn't exist. The code below does this. Run the checker to test it.\n\nIn server.js:\n```\n  throw new HttpError(404, `No route for ${req.method} ${req.url}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const item = JSON.parse(await readBody(req));\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "route",
        "label": "GET /nope answers No route for GET /nope",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/nope"
          }
        ],
        "status": 404,
        "bodyContains": "No route for GET /nope"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The error message should say what method and path were used. This helps the client fix the request."
      },
      {
        "level": 2,
        "text": "Put the code in the handle function, replacing the last line.\n\nIn server.js:\n```\n  throw new HttpError(404, `No route for ${req.method} ${req.url}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nlet errorCount = 0;\nclass HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) { text += chunk; if (text.length > 1000) throw new HttpError(413, \"Body too large\"); } return text; }\nasync function readJson(req) { if (!req.headers[\"content-type\"]?.includes(\"application/json\")) throw new HttpError(415, \"Send JSON\"); const text = await readBody(req); try { return JSON.parse(text); } catch { throw new HttpError(400, \"Body must be JSON\"); } }\nasync function createItem(req, res) {\n  const item = await readJson(req);\n  if (items.some((existing) => existing.name === item.name)) throw new HttpError(409, \"Name already exists\");\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  if (req.url === \"/boom\") throw new Error(\"Database is down\");\n  if (req.url === \"/teapot\") throw new HttpError(418, \"I am a teapot\");\n  if (req.url === \"/items\" && ![\"GET\", \"POST\"].includes(req.method)) { res.setHeader(\"Allow\", \"GET, POST\"); throw new HttpError(405, \"Method not allowed\"); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  throw new HttpError(404, `No route for ${req.method} ${req.url}`);\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res).catch((error) => send(res, error.status ?? 500, { error: error.status ? error.message : \"Something went wrong\", status: error.status ?? 500, id: ++errorCount }));\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "errors-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: api-design-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-api-design-sari-sari-1",
    "index": 91,
    "task": "Add this route after the url line. It lets the API change later without breaking old clients. The code below does that. Run the checker to test it.\n\nIn server.js:\n```\n  if (url.pathname === \"/v1/items\") return send(res, 200, items);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "v1",
        "label": "GET /v1/items answers the list",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/v1/items"
          }
        ],
        "status": 200,
        "bodyContains": "\"name\":\"Rice 1\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Put the route after the url line. It checks if the path is /v1/items."
      },
      {
        "level": 2,
        "text": "Add it to server.js where the url line is.\n\nIn server.js:\n```\n  if (url.pathname === \"/v1/items\") return send(res, 200, items);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/v1/items\") return send(res, 200, items);\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-versioning"
    ],
    "estimatedMinutes": 3,
    "projectId": "api-design-sari-sari"
  },
  {
    "id": "api-api-design-sari-sari-2",
    "index": 92,
    "task": "Add a page line to get the page number. Change the /v1/items route to send five items per page. The code below does that. Run the checker to test it.\n\nIn server.js:\n```\n  const page = Number(url.searchParams.get(\"page\") ?? 1);\n  if (url.pathname === \"/v1/items\") return send(res, 200, items.slice((page - 1) * 5, page * 5));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "page2",
        "label": "GET /v1/items?page=2 answers items 6 to 10",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/v1/items?page=2"
          }
        ],
        "bodyContains": "[{\"id\":6,\"name\":\"Egg 6\",\"price\":30},{\"id\":7,\"name\":\"Rice 7\",\"price\":35},{\"id\":8,\"name\":\"Soap 8\",\"price\":40},{\"id\":9,\"name\":\"Egg 9\",\"price\":45},{\"id\":10,\"name\":\"Rice 10\",\"price\":50}]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use url.searchParams to get the page number. Set it to 1 if not given."
      },
      {
        "level": 2,
        "text": "Add this to server.js after the url line.\n\nIn server.js:\n```\n  const page = Number(url.searchParams.get(\"page\") ?? 1);\n  if (url.pathname === \"/v1/items\") return send(res, 200, items.slice((page - 1) * 5, page * 5));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  const page = Number(url.searchParams.get(\"page\") ?? 1);\n  if (url.pathname === \"/v1/items\") return send(res, 200, items.slice((page - 1) * 5, page * 5));\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-pagination"
    ],
    "estimatedMinutes": 4,
    "projectId": "api-design-sari-sari"
  },
  {
    "id": "api-api-design-sari-sari-3",
    "index": 93,
    "task": "Add a perPage line to get the number of items per page. Change the route to use it. The code below does that. Run the checker to test it.\n\nIn server.js:\n```\n  const perPage = Number(url.searchParams.get(\"perPage\") ?? 5);\n  if (url.pathname === \"/v1/items\") return send(res, 200, items.slice((page - 1) * perPage, page * perPage));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "per",
        "label": "GET /v1/items?perPage=3 answers three items",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/v1/items?perPage=3"
          }
        ],
        "bodyContains": "[{\"id\":1,\"name\":\"Rice 1\",\"price\":5},{\"id\":2,\"name\":\"Soap 2\",\"price\":10},{\"id\":3,\"name\":\"Egg 3\",\"price\":15}]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use url.searchParams to get perPage. Set it to 5 if not given."
      },
      {
        "level": 2,
        "text": "Add this to server.js after the page line.\n\nIn server.js:\n```\n  const perPage = Number(url.searchParams.get(\"perPage\") ?? 5);\n  if (url.pathname === \"/v1/items\") return send(res, 200, items.slice((page - 1) * perPage, page * perPage));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  const page = Number(url.searchParams.get(\"page\") ?? 1);\n  const perPage = Number(url.searchParams.get(\"perPage\") ?? 5);\n  if (url.pathname === \"/v1/items\") return send(res, 200, items.slice((page - 1) * perPage, page * perPage));\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "api-design-sari-sari"
  },
  {
    "id": "api-api-design-sari-sari-4",
    "index": 94,
    "task": "Add a data line to store the sliced items. Change the route to send an object with data, page, and perPage. The code below does that. Run the checker to test it.\n\nIn server.js:\n```\n  const data = items.slice((page - 1) * perPage, page * perPage);\n  if (url.pathname === \"/v1/items\") return send(res, 200, { data, page, perPage });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "envelope",
        "label": "The answer says page 2 and perPage 5",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/v1/items?page=2"
          }
        ],
        "bodyContains": "\"page\":2,\"perPage\":5"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Store the sliced items in a data variable. Wrap it in an object with page and perPage."
      },
      {
        "level": 2,
        "text": "Add this to server.js after the perPage line.\n\nIn server.js:\n```\n  const data = items.slice((page - 1) * perPage, page * perPage);\n  if (url.pathname === \"/v1/items\") return send(res, 200, { data, page, perPage });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  const page = Number(url.searchParams.get(\"page\") ?? 1);\n  const perPage = Number(url.searchParams.get(\"perPage\") ?? 5);\n  const data = items.slice((page - 1) * perPage, page * perPage);\n  if (url.pathname === \"/v1/items\") return send(res, 200, { data, page, perPage });\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-envelope"
    ],
    "estimatedMinutes": 4,
    "projectId": "api-design-sari-sari"
  },
  {
    "id": "api-api-design-sari-sari-5",
    "index": 95,
    "task": "Change the /v1/items route to add total: items.length. The code below does that. Run the checker to test it.\n\nIn server.js:\n```\n  if (url.pathname === \"/v1/items\") return send(res, 200, { data, page, perPage, total: items.length });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "total",
        "label": "The answer says total 12",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/v1/items"
          }
        ],
        "bodyContains": "\"total\":12"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add total: items.length to the object. It shows how many items there are."
      },
      {
        "level": 2,
        "text": "Change the route in server.js to include total.\n\nIn server.js:\n```\n  if (url.pathname === \"/v1/items\") return send(res, 200, { data, page, perPage, total: items.length });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  const page = Number(url.searchParams.get(\"page\") ?? 1);\n  const perPage = Number(url.searchParams.get(\"perPage\") ?? 5);\n  const data = items.slice((page - 1) * perPage, page * perPage);\n  if (url.pathname === \"/v1/items\") return send(res, 200, { data, page, perPage, total: items.length });\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "api-design-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: api-design-sari-sari.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-api-design-sari-sari-6",
    "index": 96,
    "task": "Add a next line to the answer. This line tells the client where to go for the next page. If there is no next page, the value is null. The code below shows how to make this work. Run the checker to confirm the next link works on page 1 and that the last page has no next link.\n\nIn server.js:\n```\n  const next = page * perPage < items.length ? `/v1/items?page=${page + 1}&perPage=${perPage}` : null;\n  if (url.pathname === \"/v1/items\") return send(res, 200, { data, page, perPage, total: items.length, next });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "next",
        "label": "Page 1 links to page 2",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/v1/items"
          }
        ],
        "bodyContains": "\"next\":\"/v1/items?page=2&perPage=5\""
      },
      {
        "id": "last",
        "label": "The last page has no next link",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/v1/items?page=3"
          }
        ],
        "bodyContains": "\"next\":null"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The next link should be the URL for the next page, or null if there is no next page."
      },
      {
        "level": 2,
        "text": "Add the code after the line that already has the data and page info.\n\nIn server.js:\n```\n  const next = page * perPage < items.length ? `/v1/items?page=${page + 1}&perPage=${perPage}` : null;\n  if (url.pathname === \"/v1/items\") return send(res, 200, { data, page, perPage, total: items.length, next });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  const page = Number(url.searchParams.get(\"page\") ?? 1);\n  const perPage = Number(url.searchParams.get(\"perPage\") ?? 5);\n  const data = items.slice((page - 1) * perPage, page * perPage);\n  const next = page * perPage < items.length ? `/v1/items?page=${page + 1}&perPage=${perPage}` : null;\n  if (url.pathname === \"/v1/items\") return send(res, 200, { data, page, perPage, total: items.length, next });\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-next-link"
    ],
    "estimatedMinutes": 4,
    "projectId": "api-design-sari-sari"
  },
  {
    "id": "api-api-design-sari-sari-7",
    "index": 97,
    "task": "Add a previous line to the answer. This line tells the client where to go for the previous page. If there is no previous page, the value is null. The code below shows how to make this work. Run the checker to confirm the previous link works on page 2.\n\nIn server.js:\n```\n  const previous = page > 1 ? `/v1/items?page=${page - 1}&perPage=${perPage}` : null;\n  if (url.pathname === \"/v1/items\") return send(res, 200, { data, page, perPage, total: items.length, next, previous });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "previous",
        "label": "Page 2 links back to page 1",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/v1/items?page=2"
          }
        ],
        "bodyContains": "\"previous\":\"/v1/items?page=1&perPage=5\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The previous link should be the URL for the previous page, or null if there is no previous page."
      },
      {
        "level": 2,
        "text": "Add the code after the line that already has the next and page info.\n\nIn server.js:\n```\n  const previous = page > 1 ? `/v1/items?page=${page - 1}&perPage=${perPage}` : null;\n  if (url.pathname === \"/v1/items\") return send(res, 200, { data, page, perPage, total: items.length, next, previous });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  const page = Number(url.searchParams.get(\"page\") ?? 1);\n  const perPage = Number(url.searchParams.get(\"perPage\") ?? 5);\n  const data = items.slice((page - 1) * perPage, page * perPage);\n  const next = page * perPage < items.length ? `/v1/items?page=${page + 1}&perPage=${perPage}` : null;\n  const previous = page > 1 ? `/v1/items?page=${page - 1}&perPage=${perPage}` : null;\n  if (url.pathname === \"/v1/items\") return send(res, 200, { data, page, perPage, total: items.length, next, previous });\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "api-design-sari-sari"
  },
  {
    "id": "api-api-design-sari-sari-8",
    "index": 98,
    "task": "Add one line after the page line. This line checks if the page number is not a whole number or less than 1. If so, send a 400 error with a message. The code below shows how to make this work. Run the checker to confirm that asking for page 0 returns a 400 error.\n\nIn server.js:\n```\n  if (!Number.isInteger(page) || page < 1) return send(res, 400, { error: \"page must be a whole number 1 or more\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "bad",
        "label": "GET /v1/items?page=0 answers 400",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/v1/items?page=0"
          }
        ],
        "status": 400
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the page number is not a whole number or less than 1, send a 400 error with a message."
      },
      {
        "level": 2,
        "text": "Add the code after the line that checks if the page is a whole number.\n\nIn server.js:\n```\n  if (!Number.isInteger(page) || page < 1) return send(res, 400, { error: \"page must be a whole number 1 or more\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  const page = Number(url.searchParams.get(\"page\") ?? 1);\n  if (!Number.isInteger(page) || page < 1) return send(res, 400, { error: \"page must be a whole number 1 or more\" });\n  const perPage = Number(url.searchParams.get(\"perPage\") ?? 5);\n  const data = items.slice((page - 1) * perPage, page * perPage);\n  const next = page * perPage < items.length ? `/v1/items?page=${page + 1}&perPage=${perPage}` : null;\n  const previous = page > 1 ? `/v1/items?page=${page - 1}&perPage=${perPage}` : null;\n  if (url.pathname === \"/v1/items\") return send(res, 200, { data, page, perPage, total: items.length, next, previous });\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "api-design-sari-sari"
  },
  {
    "id": "api-api-design-sari-sari-9",
    "index": 99,
    "task": "Change the perPage line to limit the number of items per page to 10. This is called a limit cap. The code below shows how to make this work. Run the checker to confirm that asking for 100 items per page returns a limit cap of 10.\n\nIn server.js:\n```\n  const perPage = Math.min(Number(url.searchParams.get(\"perPage\") ?? 5), 10);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "cap",
        "label": "GET /v1/items?perPage=100 answers perPage 10",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/v1/items?perPage=100"
          }
        ],
        "bodyContains": "\"perPage\":10,\"total\":12"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Set the perPage value to the smaller of what the client asks or 10."
      },
      {
        "level": 2,
        "text": "Replace the current perPage line with the code below.\n\nIn server.js:\n```\n  const perPage = Math.min(Number(url.searchParams.get(\"perPage\") ?? 5), 10);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  const page = Number(url.searchParams.get(\"page\") ?? 1);\n  if (!Number.isInteger(page) || page < 1) return send(res, 400, { error: \"page must be a whole number 1 or more\" });\n  const perPage = Math.min(Number(url.searchParams.get(\"perPage\") ?? 5), 10);\n  const data = items.slice((page - 1) * perPage, page * perPage);\n  const next = page * perPage < items.length ? `/v1/items?page=${page + 1}&perPage=${perPage}` : null;\n  const previous = page > 1 ? `/v1/items?page=${page - 1}&perPage=${perPage}` : null;\n  if (url.pathname === \"/v1/items\") return send(res, 200, { data, page, perPage, total: items.length, next, previous });\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-limit-cap"
    ],
    "estimatedMinutes": 3,
    "projectId": "api-design-sari-sari"
  },
  {
    "id": "api-api-design-sari-sari-10",
    "index": 100,
    "task": "Change the old /items route to mark it as deprecated. Add a header called \"Deprecation\" with the value \"true\". The code below shows how to make this work. Run the checker to confirm that asking for /items sends the Deprecation header.\n\nIn server.js:\n```\n  if (url.pathname === \"/items\") { res.setHeader(\"Deprecation\", \"true\"); return send(res, 200, items); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/items\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "deprecated",
        "label": "GET /items sends Deprecation: true",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items"
          }
        ],
        "header": {
          "name": "deprecation",
          "value": "true"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the header \"Deprecation: true\" to the response for the old route."
      },
      {
        "level": 2,
        "text": "Replace the old route code with the code below.\n\nIn server.js:\n```\n  if (url.pathname === \"/items\") { res.setHeader(\"Deprecation\", \"true\"); return send(res, 200, items); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst names = [\"Rice\",\"Soap\",\"Egg\"];\nconst items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  const page = Number(url.searchParams.get(\"page\") ?? 1);\n  if (!Number.isInteger(page) || page < 1) return send(res, 400, { error: \"page must be a whole number 1 or more\" });\n  const perPage = Math.min(Number(url.searchParams.get(\"perPage\") ?? 5), 10);\n  const data = items.slice((page - 1) * perPage, page * perPage);\n  const next = page * perPage < items.length ? `/v1/items?page=${page + 1}&perPage=${perPage}` : null;\n  const previous = page > 1 ? `/v1/items?page=${page - 1}&perPage=${perPage}` : null;\n  if (url.pathname === \"/v1/items\") return send(res, 200, { data, page, perPage, total: items.length, next, previous });\n  if (url.pathname === \"/items\") { res.setHeader(\"Deprecation\", \"true\"); return send(res, 200, items); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "api-deprecation"
    ],
    "estimatedMinutes": 3,
    "projectId": "api-design-sari-sari"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: first-server-carinderia.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-first-server-carinderia-1",
    "index": 101,
    "task": "You will change server.js to answer every request. The code below says the server replies with 'Carinderia API'. This is the first message your server sends. When you run the server, it will say this for any request. Run the checker to test it.\n\nIn server.js:\n```\n  res.end(\"Carinderia API\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Hello\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "root",
        "label": "GET / answers Carinderia API",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/"
          }
        ],
        "status": 200,
        "bodyContains": "Carinderia API"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server must reply with the same message for every request."
      },
      {
        "level": 2,
        "text": "Change the res.end line in server.js to say 'Carinderia API'.\n\nIn server.js:\n```\n  res.end(\"Carinderia API\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Carinderia API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "first-server-carinderia"
  },
  {
    "id": "api-first-server-carinderia-2",
    "index": 102,
    "task": "You will add a header to tell the browser the answer is plain text. The code below sets the Content-Type header. This helps the browser know how to show the answer. Run the checker to test it.\n\nIn server.js:\n```\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
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
        "text": "Add the header before the res.end line so the browser knows the answer format."
      },
      {
        "level": 2,
        "text": "Place the new line above res.end in server.js.\n\nIn server.js:\n```\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.end(\"Carinderia API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "first-server-carinderia"
  },
  {
    "id": "api-first-server-carinderia-3",
    "index": 103,
    "task": "You will add a custom header called X-Place. The code below sets it to 'carinderia'. This helps other systems know where the server is. Run the checker to test it.\n\nIn server.js:\n```\n  res.setHeader(\"X-Place\", \"carinderia\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Hello\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "custom",
        "label": "GET / sends X-Place: carinderia",
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
          "value": "carinderia"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the header before the res.end line so it goes with the answer."
      },
      {
        "level": 2,
        "text": "Place the new line above res.end in server.js.\n\nIn server.js:\n```\n  res.setHeader(\"X-Place\", \"carinderia\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.setHeader(\"X-Place\", \"carinderia\");\n  res.end(\"Carinderia API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "first-server-carinderia"
  },
  {
    "id": "api-first-server-carinderia-4",
    "index": 104,
    "task": "You will add a new path for /health. The code below checks if the request is for /health. If so, it replies with 'healthy'. This helps a monitor know the server is working. Run the checker to test it.\n\nIn server.js:\n```\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
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
        "text": "Check the URL before sending the answer. If it's /health, reply with 'healthy'."
      },
      {
        "level": 2,
        "text": "Place the new code at the top of the handler in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.setHeader(\"X-Place\", \"carinderia\");\n  res.end(\"Carinderia API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "first-server-carinderia"
  },
  {
    "id": "api-first-server-carinderia-5",
    "index": 105,
    "task": "You will add a rule for any other path. The code below checks if the URL is not /. If so, it sends status 404 and the message 'Not found'. This tells users the path does not exist. Run the checker to test it.\n\nIn server.js:\n```\n  if (req.url !== \"/\") { res.statusCode = 404; res.end(\"Not found\"); return; }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
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
        "text": "Add the check after the /health code so it runs after checking for /health."
      },
      {
        "level": 2,
        "text": "Place the new code right after the /health line in server.js.\n\nIn server.js:\n```\n  if (req.url !== \"/\") { res.statusCode = 404; res.end(\"Not found\"); return; }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n  if (req.url !== \"/\") { res.statusCode = 404; res.end(\"Not found\"); return; }\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.setHeader(\"X-Place\", \"carinderia\");\n  res.end(\"Carinderia API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "first-server-carinderia"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: first-server-carinderia.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-first-server-carinderia-6",
    "index": 106,
    "task": "You must stop any request that is not GET. Add this line at the very top of the handler. This line stops bad requests and sends a 405 error. The checker will test this.\n\nIn server.js:\n```\n  if (req.method !== \"GET\") { res.statusCode = 405; res.end(\"Method not allowed\"); return; }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
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
        "text": "Think of 405 as 'not allowed'. You must check the method before doing anything else."
      },
      {
        "level": 2,
        "text": "Add the line at the very top of the handler, right after the imports.\n\nIn server.js:\n```\n  if (req.method !== \"GET\") { res.statusCode = 405; res.end(\"Method not allowed\"); return; }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.method !== \"GET\") { res.statusCode = 405; res.end(\"Method not allowed\"); return; }\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n  if (req.url !== \"/\") { res.statusCode = 404; res.end(\"Not found\"); return; }\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.setHeader(\"X-Place\", \"carinderia\");\n  res.end(\"Carinderia API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "first-server-carinderia"
  },
  {
    "id": "api-first-server-carinderia-7",
    "index": 107,
    "task": "You must answer /info with a JSON object. Add this line right after the /health line. This tells the browser the name of the carinderia. The checker will test this.\n\nIn server.js:\n```\n  if (req.url === \"/info\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify({ name: \"Carinderia\" })); return; }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
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
        "bodyContains": "\"name\":\"Carinderia\"",
        "header": {
          "name": "content-type",
          "value": "application/json"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You must send a JSON object with the name. Use the code below to make it."
      },
      {
        "level": 2,
        "text": "Add the line right after the /health line, before the 404 line.\n\nIn server.js:\n```\n  if (req.url === \"/info\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify({ name: \"Carinderia\" })); return; }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.method !== \"GET\") { res.statusCode = 405; res.end(\"Method not allowed\"); return; }\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n  if (req.url === \"/info\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify({ name: \"Carinderia\" })); return; }\n  if (req.url !== \"/\") { res.statusCode = 404; res.end(\"Not found\"); return; }\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.setHeader(\"X-Place\", \"carinderia\");\n  res.end(\"Carinderia API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "first-server-carinderia"
  },
  {
    "id": "api-first-server-carinderia-8",
    "index": 108,
    "task": "You must count how many requests come in. Add a counter above the server. Then, add a /visits route before the 404 line. This route will show the count. The checker will test this.\n\nIn server.js:\n```\nlet visits = 0;\n  visits += 1;\n  if (req.url === \"/visits\") { res.end(String(visits)); return; }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
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
        "text": "Start with a counter set to zero. Add one to it every time a request comes."
      },
      {
        "level": 2,
        "text": "Add the counter above the server, then add the /visits route before the 404 line.\n\nIn server.js:\n```\nlet visits = 0;\n  visits += 1;\n  if (req.url === \"/visits\") { res.end(String(visits)); return; }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nlet visits = 0;\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.method !== \"GET\") { res.statusCode = 405; res.end(\"Method not allowed\"); return; }\n  visits += 1;\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n  if (req.url === \"/info\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify({ name: \"Carinderia\" })); return; }\n  if (req.url === \"/visits\") { res.end(String(visits)); return; }\n  if (req.url !== \"/\") { res.statusCode = 404; res.end(\"Not found\"); return; }\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.setHeader(\"X-Place\", \"carinderia\");\n  res.end(\"Carinderia API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "first-server-carinderia"
  },
  {
    "id": "api-first-server-carinderia-9",
    "index": 109,
    "task": "You must tell browsers not to store any answer. Add this line at the very top of the handler. This line stops browsers from caching your answers. The checker will test this.\n\nIn server.js:\n```\n  res.setHeader(\"Cache-Control\", \"no-store\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
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
        "text": "Cache-Control is a header that tells browsers not to save the answer."
      },
      {
        "level": 2,
        "text": "Add the line at the very top of the handler, right after the imports.\n\nIn server.js:\n```\n  res.setHeader(\"Cache-Control\", \"no-store\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nlet visits = 0;\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"Cache-Control\", \"no-store\");\n  if (req.method !== \"GET\") { res.statusCode = 405; res.end(\"Method not allowed\"); return; }\n  visits += 1;\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n  if (req.url === \"/info\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify({ name: \"Carinderia\" })); return; }\n  if (req.url === \"/visits\") { res.end(String(visits)); return; }\n  if (req.url !== \"/\") { res.statusCode = 404; res.end(\"Not found\"); return; }\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.setHeader(\"X-Place\", \"carinderia\");\n  res.end(\"Carinderia API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "first-server-carinderia"
  },
  {
    "id": "api-first-server-carinderia-10",
    "index": 110,
    "task": "You must read a name from the query string at /hello. Use 'friend' as the default. Add these two lines right before the 404 line. This tells the browser to greet the person. The checker will test this.\n\nIn server.js:\n```\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/hello\") { res.end(`Hello, ${url.searchParams.get(\"name\") ?? \"friend\"}`); return; }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
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
        "text": "Use the URL class to get the query string. Then, get the name or use 'friend' if none is given."
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
      "server.js": "import http from \"node:http\";\nlet visits = 0;\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"Cache-Control\", \"no-store\");\n  if (req.method !== \"GET\") { res.statusCode = 405; res.end(\"Method not allowed\"); return; }\n  visits += 1;\n  if (req.url === \"/health\") { res.end(\"healthy\"); return; }\n  if (req.url === \"/info\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify({ name: \"Carinderia\" })); return; }\n  if (req.url === \"/visits\") { res.end(String(visits)); return; }\n  const url = new URL(req.url, \"http://localhost\");\n  if (url.pathname === \"/hello\") { res.end(`Hello, ${url.searchParams.get(\"name\") ?? \"friend\"}`); return; }\n  if (req.url !== \"/\") { res.statusCode = 404; res.end(\"Not found\"); return; }\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\");\n  res.setHeader(\"X-Place\", \"carinderia\");\n  res.end(\"Carinderia API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 6,
    "projectId": "first-server-carinderia"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: json-routes-carinderia.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-json-routes-carinderia-1",
    "index": 111,
    "task": "You will answer requests for /items. The code below sends the whole list as JSON. Add it at the top of the handler. This makes the server return the menu when someone asks for /items. Run the checker to confirm.\n\nIn server.js:\n```\n  if (req.url === \"/items\") return send(res, 200, items);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "list",
        "label": "GET /items answers the list as JSON",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items"
          }
        ],
        "bodyContains": "\"name\":\"Adobo\"",
        "header": {
          "name": "content-type",
          "value": "application/json"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The code sends the whole list as JSON. Put it right after the if statement for /items."
      },
      {
        "level": 2,
        "text": "Add it at the top of the handler, right after the first if line.\n\nIn server.js:\n```\n  if (req.url === \"/items\") return send(res, 200, items);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "json-routes-carinderia"
  },
  {
    "id": "api-json-routes-carinderia-2",
    "index": 112,
    "task": "You will answer requests for /items/count. The code below sends how many items there are. Add it after the /items line. This helps the server count the menu items. Run the checker to confirm.\n\nIn server.js:\n```\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "GET /items/count answers {\"count\":3}",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/count"
          }
        ],
        "bodyContains": "{\"count\":3}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The code counts the items and sends that number. Put it after the /items line."
      },
      {
        "level": 2,
        "text": "Add it after the /items line, right before the /items/first line.\n\nIn server.js:\n```\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "json-routes-carinderia"
  },
  {
    "id": "api-json-routes-carinderia-3",
    "index": 113,
    "task": "You will answer requests for /items/first. The code below sends only the first item. Add it after the /items/count line. This lets the server show the first dish. Run the checker to confirm.\n\nIn server.js:\n```\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "first",
        "label": "GET /items/first answers Adobo",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/first"
          }
        ],
        "bodyContains": "{\"id\":1,\"name\":\"Adobo\",\"price\":80}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The code gets the first item from the list and sends it. Put it after the /items/count line."
      },
      {
        "level": 2,
        "text": "Add it after the /items/count line, right before the /items/names line.\n\nIn server.js:\n```\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "json-routes-carinderia"
  },
  {
    "id": "api-json-routes-carinderia-4",
    "index": 114,
    "task": "You will answer requests for /items/names. The code below sends only the names using map. Add it after the /items/first line. This lets the server show only the names. Run the checker to confirm.\n\nIn server.js:\n```\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "names",
        "label": "GET /items/names answers the three names",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/names"
          }
        ],
        "bodyContains": "[\"Adobo\",\"Pancit\",\"Lumpia\"]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The code uses map to get only the names. Put it after the /items/first line."
      },
      {
        "level": 2,
        "text": "Add it after the /items/first line, right before the /items/total line.\n\nIn server.js:\n```\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "json-routes-carinderia"
  },
  {
    "id": "api-json-routes-carinderia-5",
    "index": 115,
    "task": "You will answer requests for /items/total. The code below sends the sum of all prices using reduce. Add it after the /items/names line. This lets the server show the total price. Run the checker to confirm.\n\nIn server.js:\n```\n  if (req.url === \"/items/total\") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "total",
        "label": "GET /items/total answers 155",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/total"
          }
        ],
        "bodyContains": "{\"total\":155}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The code adds all prices using reduce. Put it after the /items/names line."
      },
      {
        "level": 2,
        "text": "Add it after the /items/names line, right before the closing brace of the handler.\n\nIn server.js:\n```\n  if (req.url === \"/items/total\") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n  if (req.url === \"/items/total\") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "json-routes-carinderia"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: json-routes-carinderia.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-json-routes-carinderia-6",
    "index": 116,
    "task": "Your server must say 404 when someone asks for a path that does not exist. Change the last line of the handler to send a JSON error. This helps users know when a request fails. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  send(res, 404, { error: \"Not found\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "missing",
        "label": "GET /nope answers 404 with a JSON error",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/nope"
          }
        ],
        "status": 404,
        "bodyContains": "{\"error\":\"Not found\"}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the path is not known, send a 404 status and a JSON message."
      },
      {
        "level": 2,
        "text": "Put the new line at the end of the handler, right before the 404 line.\n\nIn server.js:\n```\n  send(res, 404, { error: \"Not found\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n  if (req.url === \"/items/total\") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "json-routes-carinderia"
  },
  {
    "id": "api-json-routes-carinderia-7",
    "index": 117,
    "task": "When someone asks for the root path, your server must reply with the API's name and its routes. Add a line at the top of the handler to handle this case. This helps users discover what your API offers. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (req.url === \"/\") return send(res, 200, { name: \"Carinderia\", routes: [\"/items\"] });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "root",
        "label": "GET / lists the routes",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/"
          }
        ],
        "status": 200,
        "bodyContains": "\"routes\":[\"/items\"]"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Check if the URL is exactly \"/\", then send a JSON object with the name and routes."
      },
      {
        "level": 2,
        "text": "Put this line at the top of the handler, right after the `if (req.method === 'GET')` line.\n\nIn server.js:\n```\n  if (req.url === \"/\") return send(res, 200, { name: \"Carinderia\", routes: [\"/items\"] });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/\") return send(res, 200, { name: \"Carinderia\", routes: [\"/items\"] });\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n  if (req.url === \"/items/total\") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "json-routes-carinderia"
  },
  {
    "id": "api-json-routes-carinderia-8",
    "index": 118,
    "task": "When someone asks for /items/cheapest, your server must reply with the item that costs the least. Add a line before the 404 line to handle this. This helps users find the cheapest dish. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (req.url === \"/items/cheapest\") return send(res, 200, [...items].sort((a, b) => a.price - b.price)[0]);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "cheapest",
        "label": "GET /items/cheapest answers Lumpia",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/cheapest"
          }
        ],
        "bodyContains": "\"name\":\"Lumpia\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Sort the items by price and pick the first one. Use the `sort` and `filter` methods."
      },
      {
        "level": 2,
        "text": "Put this line before the 404 line, after the `if (req.url === \"/\")` line.\n\nIn server.js:\n```\n  if (req.url === \"/items/cheapest\") return send(res, 200, [...items].sort((a, b) => a.price - b.price)[0]);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/\") return send(res, 200, { name: \"Carinderia\", routes: [\"/items\"] });\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n  if (req.url === \"/items/total\") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });\n  if (req.url === \"/items/cheapest\") return send(res, 200, [...items].sort((a, b) => a.price - b.price)[0]);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "json-routes-carinderia"
  },
  {
    "id": "api-json-routes-carinderia-9",
    "index": 119,
    "task": "When someone asks for /items/pretty, your server must reply with indented JSON. Add a line before the 404 line to handle this. This helps people read the data more easily. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (req.url === \"/items/pretty\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify(items, null, 2)); return; }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "pretty",
        "label": "GET /items/pretty answers indented JSON",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/pretty"
          }
        ],
        "bodyContains": "[\n  {\n    \"id\": 1"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Set the Content-Type header to application/json, then use JSON.stringify with 2 spaces for indentation."
      },
      {
        "level": 2,
        "text": "Put this line before the 404 line, after the /items/cheapest line.\n\nIn server.js:\n```\n  if (req.url === \"/items/pretty\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify(items, null, 2)); return; }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/\") return send(res, 200, { name: \"Carinderia\", routes: [\"/items\"] });\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n  if (req.url === \"/items/total\") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });\n  if (req.url === \"/items/cheapest\") return send(res, 200, [...items].sort((a, b) => a.price - b.price)[0]);\n  if (req.url === \"/items/pretty\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify(items, null, 2)); return; }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "json-routes-carinderia"
  },
  {
    "id": "api-json-routes-carinderia-10",
    "index": 120,
    "task": "When someone asks for /items/expensive, your server must reply with items priced over 40. Add a line before the 404 line to handle this. This helps users find expensive dishes. The code below does this. Run the checker to confirm it works.\n\nIn server.js:\n```\n  if (req.url === \"/items/expensive\") return send(res, 200, items.filter((item) => item.price > 40));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Items API\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "expensive",
        "label": "GET /items/expensive answers Adobo and Pancit",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/expensive"
          }
        ],
        "bodyContains": "\"name\":\"Adobo\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the `filter` method to keep only items with price greater than 40."
      },
      {
        "level": 2,
        "text": "Put this line before the 404 line, after the /items/pretty line.\n\nIn server.js:\n```\n  if (req.url === \"/items/expensive\") return send(res, 200, items.filter((item) => item.price > 40));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/\") return send(res, 200, { name: \"Carinderia\", routes: [\"/items\"] });\n  if (req.url === \"/items\") return send(res, 200, items);\n  if (req.url === \"/items/count\") return send(res, 200, { count: items.length });\n  if (req.url === \"/items/first\") return send(res, 200, items[0]);\n  if (req.url === \"/items/names\") return send(res, 200, items.map((item) => item.name));\n  if (req.url === \"/items/total\") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });\n  if (req.url === \"/items/cheapest\") return send(res, 200, [...items].sort((a, b) => a.price - b.price)[0]);\n  if (req.url === \"/items/pretty\") { res.setHeader(\"Content-Type\", \"application/json\"); res.end(JSON.stringify(items, null, 2)); return; }\n  if (req.url === \"/items/expensive\") return send(res, 200, items.filter((item) => item.price > 40));\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "json-routes-carinderia"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: request-bodies-carinderia.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-request-bodies-carinderia-1",
    "index": 121,
    "task": "You will read what a client sends. The code below does that. Add it above the server. Then add a route for /echo. This lets you test reading the body. Run the checker to see if it works.\n\nIn server.js:\n```\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "echo",
        "label": "POST /echo with hello answers it back",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/echo",
            "body": "hello",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "bodyContains": "\"received\":\"hello\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The code reads chunks of data one by one until it's all done."
      },
      {
        "level": 2,
        "text": "Put the code above the server and the /echo route at the top of the handler.\n\nIn server.js:\n```\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "request-bodies-carinderia"
  },
  {
    "id": "api-request-bodies-carinderia-2",
    "index": 122,
    "task": "You will turn text into an object. Add one line after the /echo route. This line uses JSON.parse to turn text into an object. Run the checker to see if it works.\n\nIn server.js:\n```\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "json",
        "label": "POST /echo-json answers the object it received",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/echo-json",
            "body": "{\"name\":\"Ana\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "bodyContains": "\"name\":\"Ana\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "JSON.parse turns a string into an object. You need to wait for the body to finish before parsing."
      },
      {
        "level": 2,
        "text": "Add the line after the /echo route. The page will add the code after your hint.\n\nIn server.js:\n```\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "request-bodies-carinderia"
  },
  {
    "id": "api-request-bodies-carinderia-3",
    "index": 123,
    "task": "You will answer POST /items with status 201 and the new item. Replace the line inside createItem with two lines. The first line parses the body. The second sends the item. Run the checker to see if it works.\n\nIn server.js:\n```\n  const data = JSON.parse(await readBody(req));\n  return send(res, 201, data);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "created",
        "label": "POST /items answers 201 with the item",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"name\":\"Tea\",\"price\":12}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 201,
        "bodyContains": "\"name\":\"Tea\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You need to parse the body first, then send the item with status 201."
      },
      {
        "level": 2,
        "text": "Replace the line inside createItem. The page will add the code after your hint.\n\nIn server.js:\n```\n  const data = JSON.parse(await readBody(req));\n  return send(res, 201, data);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const data = JSON.parse(await readBody(req));\n  return send(res, 201, data);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "request-bodies-carinderia"
  },
  {
    "id": "api-request-bodies-carinderia-4",
    "index": 124,
    "task": "You will store the new item so it shows up in the list. Add one line inside createItem before the return. This line adds the item to the list. Run the checker to see if it works.\n\nIn server.js:\n```\n  items.push(data);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "stored",
        "label": "After POST /items, GET /items includes Tea",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"name\":\"Tea\",\"price\":12}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/items"
          }
        ],
        "bodyContains": "\"name\":\"Tea\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the item to the list before you send it back. This way, it will appear in the list."
      },
      {
        "level": 2,
        "text": "Add the line inside createItem. The page will add the code after your hint.\n\nIn server.js:\n```\n  items.push(data);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const data = JSON.parse(await readBody(req));\n  items.push(data);\n  return send(res, 201, data);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "request-bodies-carinderia"
  },
  {
    "id": "api-request-bodies-carinderia-5",
    "index": 125,
    "task": "You will give each new item an id one higher than the last. Change createItem so each new item gets the next id. Add the id to the item, then push it. Run the checker to see if it works.\n\nIn server.js:\n```\n  const item = { id: items.length + 1, ...data };\n  items.push(item);\n  return send(res, 201, item);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "id",
        "label": "The new item answers with id 4",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"name\":\"Tea\",\"price\":12}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "bodyContains": "\"id\":4"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The last item's id is the length of the list. Add one to get the next id."
      },
      {
        "level": 2,
        "text": "Change createItem. The page will add the code after your hint.\n\nIn server.js:\n```\n  const item = { id: items.length + 1, ...data };\n  items.push(item);\n  return send(res, 201, item);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  const data = JSON.parse(await readBody(req));\n  const item = { id: items.length + 1, ...data };\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "request-bodies-carinderia"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: request-bodies-carinderia.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-request-bodies-carinderia-6",
    "index": 126,
    "task": "If the body is not JSON, the server crashes. You fix this by catching the error. This stops the server from breaking. The code below does that. Run the checker to test it.\n\nIn server.js:\n```\n  let data;\n  try { data = JSON.parse(await readBody(req)); } catch { return send(res, 400, { error: \"Body must be JSON\" }); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "bad",
        "label": "POST /items with broken JSON answers 400",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "not json",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 400,
        "bodyContains": "Body must be JSON"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "When JSON.parse fails, you send a 400 error instead of crashing."
      },
      {
        "level": 2,
        "text": "Put the code in server.js, right after the try block.\n\nIn server.js:\n```\n  let data;\n  try { data = JSON.parse(await readBody(req)); } catch { return send(res, 400, { error: \"Body must be JSON\" }); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  let data;\n  try { data = JSON.parse(await readBody(req)); } catch { return send(res, 400, { error: \"Body must be JSON\" }); }\n  const item = { id: items.length + 1, ...data };\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "request-bodies-carinderia"
  },
  {
    "id": "api-request-bodies-carinderia-7",
    "index": 127,
    "task": "If the name is missing or empty, you send a 422 error. This tells the user what's wrong. The code below does that. Run the checker to test it.\n\nIn server.js:\n```\n  if (typeof data.name !== \"string\" || !data.name.trim()) return send(res, 422, { error: \"name is required\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "noname",
        "label": "POST /items without a name answers 422",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"price\":5}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 422,
        "bodyContains": "name is required"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Check if the name is a string and not empty after trimming."
      },
      {
        "level": 2,
        "text": "Put the code in server.js, right after the try block.\n\nIn server.js:\n```\n  if (typeof data.name !== \"string\" || !data.name.trim()) return send(res, 422, { error: \"name is required\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  let data;\n  try { data = JSON.parse(await readBody(req)); } catch { return send(res, 400, { error: \"Body must be JSON\" }); }\n  if (typeof data.name !== \"string\" || !data.name.trim()) return send(res, 422, { error: \"name is required\" });\n  const item = { id: items.length + 1, ...data };\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "request-bodies-carinderia"
  },
  {
    "id": "api-request-bodies-carinderia-8",
    "index": 128,
    "task": "If the price is not a number or less than zero, you send a 422 error. This stops bad prices from being saved. The code below does that. Run the checker to test it.\n\nIn server.js:\n```\n  if (!Number.isFinite(data.price) || data.price < 0) return send(res, 422, { error: \"price must be a number 0 or more\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "badprice",
        "label": "POST /items with price five answers 422",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"name\":\"Tea\",\"price\":\"five\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 422,
        "bodyContains": "price must be a number"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Check if the price is a finite number and not negative."
      },
      {
        "level": 2,
        "text": "Put the code in server.js, right after the name check.\n\nIn server.js:\n```\n  if (!Number.isFinite(data.price) || data.price < 0) return send(res, 422, { error: \"price must be a number 0 or more\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  let data;\n  try { data = JSON.parse(await readBody(req)); } catch { return send(res, 400, { error: \"Body must be JSON\" }); }\n  if (typeof data.name !== \"string\" || !data.name.trim()) return send(res, 422, { error: \"name is required\" });\n  if (!Number.isFinite(data.price) || data.price < 0) return send(res, 422, { error: \"price must be a number 0 or more\" });\n  const item = { id: items.length + 1, ...data };\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "request-bodies-carinderia"
  },
  {
    "id": "api-request-bodies-carinderia-9",
    "index": 129,
    "task": "You only keep the name and price fields. You trim spaces from the name. This keeps the data clean. The code below does that. Run the checker to test it.\n\nIn server.js:\n```\n  const item = { id: items.length + 1, name: data.name.trim(), price: data.price };\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "trim",
        "label": "The new item is stored with a trimmed name and no extra fields",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"name\":\"  Tea  \",\"price\":12,\"secret\":\"x\"}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "bodyContains": "{\"id\":4,\"name\":\"Tea\",\"price\":12}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Only include name and price in the item object. Trim the name."
      },
      {
        "level": 2,
        "text": "Put the code in server.js, right after the data check.\n\nIn server.js:\n```\n  const item = { id: items.length + 1, name: data.name.trim(), price: data.price };\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  let data;\n  try { data = JSON.parse(await readBody(req)); } catch { return send(res, 400, { error: \"Body must be JSON\" }); }\n  if (typeof data.name !== \"string\" || !data.name.trim()) return send(res, 422, { error: \"name is required\" });\n  if (!Number.isFinite(data.price) || data.price < 0) return send(res, 422, { error: \"price must be a number 0 or more\" });\n  const item = { id: items.length + 1, name: data.name.trim(), price: data.price };\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "request-bodies-carinderia"
  },
  {
    "id": "api-request-bodies-carinderia-10",
    "index": 130,
    "task": "You add a Location header to tell where the new item lives. This helps clients find it. The code below does that. Run the checker to test it.\n\nIn server.js:\n```\n  res.setHeader(\"Location\", `/items/${item.id}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "location",
        "label": "POST /items sends Location: /items/4",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items",
            "body": "{\"name\":\"Tea\",\"price\":12}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "header": {
          "name": "location",
          "value": "/items/4"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Set the Location header to the new item's URL before returning."
      },
      {
        "level": 2,
        "text": "Put the code in server.js, right before the return in createItem.\n\nIn server.js:\n```\n  res.setHeader(\"Location\", `/items/${item.id}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nasync function createItem(req, res) {\n  let data;\n  try { data = JSON.parse(await readBody(req)); } catch { return send(res, 400, { error: \"Body must be JSON\" }); }\n  if (typeof data.name !== \"string\" || !data.name.trim()) return send(res, 422, { error: \"name is required\" });\n  if (!Number.isFinite(data.price) || data.price < 0) return send(res, 422, { error: \"price must be a number 0 or more\" });\n  const item = { id: items.length + 1, name: data.name.trim(), price: data.price };\n  items.push(item);\n  res.setHeader(\"Location\", `/items/${item.id}`);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/echo\" && req.method === \"POST\") return send(res, 200, { received: await readBody(req) });\n  if (req.url === \"/echo-json\" && req.method === \"POST\") return send(res, 200, JSON.parse(await readBody(req)));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"POST\") return createItem(req, res);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "request-bodies-carinderia"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: one-item-carinderia.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-one-item-carinderia-1",
    "index": 131,
    "task": "You will read the item ID from the path. The code below finds the ID in /items/2. Add these two lines at the top of the handler. This lets you get one item by its ID.\n\nIn server.js:\n```\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") return send(res, 200, items.find((item) => item.id === Number(match[1])));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "one",
        "label": "GET /items/2 answers Pancit",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/2"
          }
        ],
        "bodyContains": "\"name\":\"Pancit\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Look for the pattern /items/ followed by a number in the URL."
      },
      {
        "level": 2,
        "text": "Add the code at the top of the handler, right after the imports.\n\nIn server.js:\n```\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") return send(res, 200, items.find((item) => item.id === Number(match[1])));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  if (match && req.method === \"GET\") return send(res, 200, items.find((item) => item.id === Number(match[1])));\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "one-item-carinderia"
  },
  {
    "id": "api-one-item-carinderia-2",
    "index": 132,
    "task": "Now, check if the item exists. If not, send a 404 error. Add the found line and change the GET line. This stops the server from sending a wrong item.\n\nIn server.js:\n```\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "none",
        "label": "GET /items/99 answers 404",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/items/99"
          }
        ],
        "status": 404,
        "bodyContains": "Item not found"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the item is not found, send a 404 with an error message."
      },
      {
        "level": 2,
        "text": "Add the found line before the GET line, then update the GET line to check found.\n\nIn server.js:\n```\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "one-item-carinderia"
  },
  {
    "id": "api-one-item-carinderia-3",
    "index": 133,
    "task": "Add code to delete an item. When you delete, send 204 No Content. Add this line after the GET line. This tells the server to remove the item.\n\nIn server.js:\n```\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "deleted",
        "label": "DELETE /items/1 answers 204",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "DELETE",
            "path": "/items/1"
          }
        ],
        "status": 204
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Delete an item by removing it from the items array using splice."
      },
      {
        "level": 2,
        "text": "Add the code after the GET line, right before the DELETE line.\n\nIn server.js:\n```\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "one-item-carinderia"
  },
  {
    "id": "api-one-item-carinderia-4",
    "index": 134,
    "task": "Add code to send 404 when deleting a non-existent item. Add this line after the DELETE line. This stops the server from deleting something that doesn't exist.\n\nIn server.js:\n```\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "gone",
        "label": "DELETE /items/99 answers 404 Item not found",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "DELETE",
            "path": "/items/99"
          }
        ],
        "status": 404,
        "bodyContains": "Item not found"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the item is not found, send a 404 with an error message."
      },
      {
        "level": 2,
        "text": "Add this line after the DELETE line, right before the PUT line.\n\nIn server.js:\n```\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "one-item-carinderia"
  },
  {
    "id": "api-one-item-carinderia-5",
    "index": 135,
    "task": "Add code to update an item with PUT. When you update, send back the new item. Add this line after the DELETE lines. This lets the server change the item's fields.\n\nIn server.js:\n```\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req))); return send(res, 200, found); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "put",
        "label": "PUT /items/1 with price 99 answers the new price",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "PUT",
            "path": "/items/1",
            "body": "{\"price\":99}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "bodyContains": "\"price\":99"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use Object.assign to replace the item's fields with the new data."
      },
      {
        "level": 2,
        "text": "Add this line after the DELETE lines, right before the end of the handler.\n\nIn server.js:\n```\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req))); return send(res, 200, found); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req))); return send(res, 200, found); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "one-item-carinderia"
  }
] satisfies typeof apiBasicsCourse.steps));

// Validated local authoring batch: one-item-carinderia.
apiBasicsCourse.steps.push(...([
  {
    "id": "api-one-item-carinderia-6",
    "index": 136,
    "task": "The client might send a PUT request with a different id. Keep the original id. Change the PUT line. The code below does this. Run the checker to confirm.\n\nIn server.js:\n```\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req)), { id: found.id }); return send(res, 200, found); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "keep",
        "label": "After PUT with id 50, GET /items/1 still works",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "PUT",
            "path": "/items/1",
            "body": "{\"id\":50,\"price\":1}",
            "headers": {
              "Content-Type": "application/json"
            }
          },
          {
            "method": "GET",
            "path": "/items/1"
          }
        ],
        "status": 200,
        "bodyContains": "\"id\":1"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The client might send a different id. Keep the original id."
      },
      {
        "level": 2,
        "text": "Change the PUT line in server.js.\n\nIn server.js:\n```\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req)), { id: found.id }); return send(res, 200, found); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req)), { id: found.id }); return send(res, 200, found); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "one-item-carinderia"
  },
  {
    "id": "api-one-item-carinderia-7",
    "index": 137,
    "task": "If the client sends a PUT body that is not JSON, answer 415. Add one line before the PUT line. The code below does this. Run the checker to confirm.\n\nIn server.js:\n```\n  if (found && req.method === \"PUT\" && !req.headers[\"content-type\"]?.includes(\"application/json\")) return send(res, 415, { error: \"Send JSON\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "type",
        "label": "PUT with a text/plain body answers 415",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "PUT",
            "path": "/items/1",
            "body": "price=99",
            "headers": {
              "Content-Type": "text/plain"
            }
          }
        ],
        "status": 415
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the body is not JSON, answer 415. Check the content-type header."
      },
      {
        "level": 2,
        "text": "Add one line before the PUT line in server.js.\n\nIn server.js:\n```\n  if (found && req.method === \"PUT\" && !req.headers[\"content-type\"]?.includes(\"application/json\")) return send(res, 415, { error: \"Send JSON\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"PUT\" && !req.headers[\"content-type\"]?.includes(\"application/json\")) return send(res, 415, { error: \"Send JSON\" });\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req)), { id: found.id }); return send(res, 200, found); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "one-item-carinderia"
  },
  {
    "id": "api-one-item-carinderia-8",
    "index": 138,
    "task": "For HEAD /items, send only the X-Total-Count header. No body. Add one line before the 404 line. The code below does this. Run the checker to confirm.\n\nIn server.js:\n```\n  if (req.url === \"/items\" && req.method === \"HEAD\") { res.setHeader(\"X-Total-Count\", String(items.length)); return res.end(); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "head",
        "label": "HEAD /items sends X-Total-Count: 3",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "HEAD",
            "path": "/items"
          }
        ],
        "header": {
          "name": "x-total-count",
          "value": "3"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "HEAD requests need only headers. Send X-Total-Count."
      },
      {
        "level": 2,
        "text": "Add one line before the 404 line in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/items\" && req.method === \"HEAD\") { res.setHeader(\"X-Total-Count\", String(items.length)); return res.end(); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"PUT\" && !req.headers[\"content-type\"]?.includes(\"application/json\")) return send(res, 415, { error: \"Send JSON\" });\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req)), { id: found.id }); return send(res, 200, found); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"HEAD\") { res.setHeader(\"X-Total-Count\", String(items.length)); return res.end(); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "one-item-carinderia"
  },
  {
    "id": "api-one-item-carinderia-9",
    "index": 139,
    "task": "For OPTIONS /items, send an Allow header with GET, PUT, DELETE. Add one line after the PUT line. The code below does this. Run the checker to confirm.\n\nIn server.js:\n```\n  if (match && req.method === \"OPTIONS\") { res.setHeader(\"Allow\", \"GET, PUT, DELETE\"); res.statusCode = 204; return res.end(); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "options",
        "label": "OPTIONS /items/1 lists GET, PUT, DELETE",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "OPTIONS",
            "path": "/items/1"
          }
        ],
        "header": {
          "name": "allow",
          "value": "GET, PUT, DELETE"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "OPTIONS requests need an Allow header. List the allowed methods."
      },
      {
        "level": 2,
        "text": "Add one line after the PUT line in server.js.\n\nIn server.js:\n```\n  if (match && req.method === \"OPTIONS\") { res.setHeader(\"Allow\", \"GET, PUT, DELETE\"); res.statusCode = 204; return res.end(); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"PUT\" && !req.headers[\"content-type\"]?.includes(\"application/json\")) return send(res, 415, { error: \"Send JSON\" });\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req)), { id: found.id }); return send(res, 200, found); }\n  if (match && req.method === \"OPTIONS\") { res.setHeader(\"Allow\", \"GET, PUT, DELETE\"); res.statusCode = 204; return res.end(); }\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"HEAD\") { res.setHeader(\"X-Total-Count\", String(items.length)); return res.end(); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "one-item-carinderia"
  },
  {
    "id": "api-one-item-carinderia-10",
    "index": 140,
    "task": "For any other method on one item, answer 405. Add one line after the OPTIONS line. The code below does this. Run the checker to confirm.\n\nIn server.js:\n```\n  if (match) return send(res, 405, { error: \"Method not allowed\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia API project.\nStart the server with node server.js, then follow the CodeDaddy steps.\n",
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "post",
        "label": "POST /items/1 answers 405",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/items/1",
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
        "text": "If the method is not GET, PUT, or DELETE, answer 405."
      },
      {
        "level": 2,
        "text": "Add one line after the OPTIONS line in server.js.\n\nIn server.js:\n```\n  if (match) return send(res, 405, { error: \"Method not allowed\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nconst items = [{ id: 1, name: \"Adobo\", price: 80 }, { id: 2, name: \"Pancit\", price: 60 }, { id: 3, name: \"Lumpia\", price: 15 }];\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  const match = req.url.match(/^\\/items\\/(\\d+)$/);\n  const found = match && items.find((item) => item.id === Number(match[1]));\n  if (match && req.method === \"GET\") return found ? send(res, 200, found) : send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"DELETE\") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }\n  if (match && req.method === \"DELETE\") return send(res, 404, { error: \"Item not found\" });\n  if (found && req.method === \"PUT\" && !req.headers[\"content-type\"]?.includes(\"application/json\")) return send(res, 415, { error: \"Send JSON\" });\n  if (found && req.method === \"PUT\") { Object.assign(found, JSON.parse(await readBody(req)), { id: found.id }); return send(res, 200, found); }\n  if (match && req.method === \"OPTIONS\") { res.setHeader(\"Allow\", \"GET, PUT, DELETE\"); res.statusCode = 204; return res.end(); }\n  if (match) return send(res, 405, { error: \"Method not allowed\" });\n  if (req.url === \"/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/items\" && req.method === \"HEAD\") { res.setHeader(\"X-Total-Count\", String(items.length)); return res.end(); }\n  send(res, 404, { error: \"Not found\" });\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "one-item-carinderia"
  }
] satisfies typeof apiBasicsCourse.steps));
