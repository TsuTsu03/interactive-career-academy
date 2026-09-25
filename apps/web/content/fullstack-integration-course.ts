import type { Course } from "@/lib/lesson-ir";

// Runs on the learner's own computer under PLAN.md decisions 43, 45, and 46.
// React and Vite come from npm with pinned versions. The checker builds the
// app, renders components to HTML in Node, and sends requests to the
// learner's server; a pasted report is learner-reported practice only.
export const fullstackIntegrationCourse: Course = {
  "id": "fullstack-integration",
  "title": "Full-Stack Integration",
  "project": "Sari-Sari Store Setting Up a React Project",
  "projects": [
    {
      "id": "setup-sari-sari",
      "title": "Sari-Sari Store Setting Up a React Project"
    },
    {
      "id": "props-sari-sari",
      "title": "Sari-Sari Store Components with Props"
    },
    {
      "id": "serving-sari-sari",
      "title": "Sari-Sari Store Serving the Built App"
    },
    {
      "id": "api-sari-sari",
      "title": "Sari-Sari Store An API Beside the App"
    },
    {
      "id": "states-sari-sari",
      "title": "Sari-Sari Store Loading, Empty, and Error States"
    },
    {
      "id": "forms-sari-sari",
      "title": "Sari-Sari Store Forms that Send Data"
    },
    {
      "id": "config-sari-sari",
      "title": "Sari-Sari Store Settings for Front and Back End"
    },
    {
      "id": "deploy-sari-sari",
      "title": "Sari-Sari Store Ready to Deploy"
    },
    {
      "id": "setup-carinderia",
      "title": "Carinderia Setting Up a React Project"
    },
    {
      "id": "props-carinderia",
      "title": "Carinderia Components with Props"
    },
    {
      "id": "serving-carinderia",
      "title": "Carinderia Serving the Built App"
    },
    {
      "id": "api-carinderia",
      "title": "Carinderia An API Beside the App"
    },
    {
      "id": "states-carinderia",
      "title": "Carinderia Loading, Empty, and Error States"
    },
    {
      "id": "forms-carinderia",
      "title": "Carinderia Forms that Send Data"
    },
    {
      "id": "config-carinderia",
      "title": "Carinderia Settings for Front and Back End"
    },
    {
      "id": "deploy-carinderia",
      "title": "Carinderia Ready to Deploy"
    },
    {
      "id": "setup-barangay",
      "title": "Barangay Office Setting Up a React Project"
    },
    {
      "id": "props-barangay",
      "title": "Barangay Office Components with Props"
    },
    {
      "id": "serving-barangay",
      "title": "Barangay Office Serving the Built App"
    },
    {
      "id": "api-barangay",
      "title": "Barangay Office An API Beside the App"
    },
    {
      "id": "states-barangay",
      "title": "Barangay Office Loading, Empty, and Error States"
    },
    {
      "id": "forms-barangay",
      "title": "Barangay Office Forms that Send Data"
    },
    {
      "id": "config-barangay",
      "title": "Barangay Office Settings for Front and Back End"
    },
    {
      "id": "deploy-barangay",
      "title": "Barangay Office Ready to Deploy"
    },
    {
      "id": "setup-school-club",
      "title": "School Club Setting Up a React Project"
    },
    {
      "id": "props-school-club",
      "title": "School Club Components with Props"
    },
    {
      "id": "serving-school-club",
      "title": "School Club Serving the Built App"
    },
    {
      "id": "api-school-club",
      "title": "School Club An API Beside the App"
    },
    {
      "id": "states-school-club",
      "title": "School Club Loading, Empty, and Error States"
    },
    {
      "id": "forms-school-club",
      "title": "School Club Forms that Send Data"
    },
    {
      "id": "config-school-club",
      "title": "School Club Settings for Front and Back End"
    },
    {
      "id": "deploy-school-club",
      "title": "School Club Ready to Deploy"
    },
    {
      "id": "setup-tricycle",
      "title": "Tricycle Terminal Setting Up a React Project"
    },
    {
      "id": "props-tricycle",
      "title": "Tricycle Terminal Components with Props"
    },
    {
      "id": "serving-tricycle",
      "title": "Tricycle Terminal Serving the Built App"
    },
    {
      "id": "api-tricycle",
      "title": "Tricycle Terminal An API Beside the App"
    },
    {
      "id": "states-tricycle",
      "title": "Tricycle Terminal Loading, Empty, and Error States"
    },
    {
      "id": "forms-tricycle",
      "title": "Tricycle Terminal Forms that Send Data"
    },
    {
      "id": "config-tricycle",
      "title": "Tricycle Terminal Settings for Front and Back End"
    },
    {
      "id": "deploy-tricycle",
      "title": "Tricycle Terminal Ready to Deploy"
    }
  ],
  "order": 17,
  "summary": "Connect a React front end to your own Node.js API: set up and build with Vite, pass props, serve the built app, load and send data, handle loading and errors, configure settings, and get ready to deploy. Needs a computer with Node.js 22.13 or newer and internet for npm install. Checks run on your computer and are practice only.",
  "requires": [
    "auth-security"
  ],
  "requiresComputer": true,
  "kind": "local",
  "steps": []
};

// Validated local authoring batch: setup-sari-sari.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-setup-sari-sari-1",
    "index": 1,
    "task": "Run this command in your terminal inside the project folder. It downloads all the packages listed in package.json. This step sets up the project's tools. The code below shows what it does. Run the checker to confirm it worked.\n\nType this command in your terminal:\n`npm install`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Practice</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Hello</h1>\n    </main>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "lock",
        "label": "npm install made package-lock.json",
        "kind": "local-file-exists",
        "path": "package-lock.json"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The command downloads the packages needed to run your app."
      },
      {
        "level": 2,
        "text": "Type the command exactly as shown in the terminal. The command is: `npm install`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "npm install"
    },
    "localFiles": {},
    "conceptIds": [
      "fs-npm-install"
    ],
    "estimatedMinutes": 2,
    "projectId": "setup-sari-sari"
  },
  {
    "id": "fs-setup-sari-sari-2",
    "index": 2,
    "task": "Open src/App.jsx. Change the h1 tag to say 'Sari-Sari Store'. This is the title your app shows. The code below shows the change. Run the checker to confirm it shows the heading.\n\nIn src/App.jsx:\n```\n      <h1>Sari-Sari Store</h1>\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Practice</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Hello</h1>\n    </main>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "heading",
        "label": "App shows the heading Sari-Sari Store",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "<h1>Sari-Sari Store</h1>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Look for the h1 tag and replace its text with 'Sari-Sari Store'."
      },
      {
        "level": 2,
        "text": "Add the new text right after the opening <h1> tag.\n\nIn src/App.jsx:\n```\n      <h1>Sari-Sari Store</h1>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n"
    },
    "conceptIds": [
      "react-jsx-element"
    ],
    "estimatedMinutes": 3,
    "projectId": "setup-sari-sari"
  },
  {
    "id": "fs-setup-sari-sari-3",
    "index": 3,
    "task": "In your terminal, run this command to build your app. It creates a folder called dist with files for the web. The code below shows the command. Run the checker to confirm the dist folder exists.\n\nType this command in your terminal:\n`npm run build`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Practice</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Hello</h1>\n    </main>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "dist",
        "label": "dist/index.html exists",
        "kind": "local-file-exists",
        "path": "dist/index.html"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Building turns your React code into files a browser can load."
      },
      {
        "level": 2,
        "text": "Type the command exactly as shown in the terminal. The command is: `npm run build`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "npm run build"
    },
    "localFiles": {},
    "conceptIds": [
      "fs-build"
    ],
    "estimatedMinutes": 4,
    "projectId": "setup-sari-sari"
  },
  {
    "id": "fs-setup-sari-sari-4",
    "index": 4,
    "task": "Open index.html. Change the title tag to say 'Sari-Sari Store'. This is the title that appears in the browser tab. The code below shows the change. Run the checker to confirm it shows the title.\n\nIn index.html:\n```\n    <title>Sari-Sari Store</title>\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Practice</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Hello</h1>\n    </main>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "title",
        "label": "index.html has the title Sari-Sari Store",
        "kind": "local-file-contains",
        "path": "index.html",
        "value": "<title>Sari-Sari Store</title>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Look for the <title> tag and change its text to 'Sari-Sari Store'."
      },
      {
        "level": 2,
        "text": "The title tag is inside the <head> section of index.html.\n\nIn index.html:\n```\n    <title>Sari-Sari Store</title>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n"
    },
    "conceptIds": [
      "fs-index-html"
    ],
    "estimatedMinutes": 3,
    "projectId": "setup-sari-sari"
  },
  {
    "id": "fs-setup-sari-sari-5",
    "index": 5,
    "task": "Open src/App.jsx. Add one line after the h1 tag. This line shows the store's opening hours. The code below shows the line. Run the checker to confirm it shows the hours.\n\nIn src/App.jsx:\n```\n      <p>Open 7 AM to 7 PM</p>\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Practice</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Hello</h1>\n    </main>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "hours",
        "label": "App shows the opening hours",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "<p>Open 7 AM to 7 PM</p>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the line right after the <h1> tag, before any other content."
      },
      {
        "level": 2,
        "text": "The line should be <p>Open 7 AM to 7 PM</p>.\n\nIn src/App.jsx:\n```\n      <p>Open 7 AM to 7 PM</p>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <p>Open 7 AM to 7 PM</p>\n    </main>\n  );\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "setup-sari-sari"
  }
] satisfies typeof fullstackIntegrationCourse.steps));
