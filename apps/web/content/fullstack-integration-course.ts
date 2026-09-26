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

// Validated local authoring batch: setup-sari-sari.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-setup-sari-sari-6",
    "index": 6,
    "task": "Add an array called names above the return line. This array holds product names. Then, after the hours, add a list that uses map to show each name. This makes a list of products. The code below does this. Run the checker. Paste its report.\n\nIn src/App.jsx:\n```\n  const names = [\"Rice\",\"Soap\",\"Egg\"];\n      <ul>{names.map((name) => <li key={name}>{name}</li>)}</ul>\n```",
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
        "id": "list",
        "label": "App lists Rice",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "<li>Rice</li>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use map to turn each name into a list item."
      },
      {
        "level": 2,
        "text": "Put the list after the hours in App.jsx.\n\nIn src/App.jsx:\n```\n  const names = [\"Rice\",\"Soap\",\"Egg\"];\n      <ul>{names.map((name) => <li key={name}>{name}</li>)}</ul>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "export default function App() {\n  const names = [\"Rice\",\"Soap\",\"Egg\"];\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <p>Open 7 AM to 7 PM</p>\n      <ul>{names.map((name) => <li key={name}>{name}</li>)}</ul>\n    </main>\n  );\n}\n"
    },
    "conceptIds": [
      "react-list-rendering"
    ],
    "estimatedMinutes": 4,
    "projectId": "setup-sari-sari"
  },
  {
    "id": "fs-setup-sari-sari-7",
    "index": 7,
    "task": "Change the h1 line to add a class called title. This class lets you style the heading. The code below does this. Run the checker. Paste its report.\n\nIn src/App.jsx:\n```\n      <h1 className=\"title\">Sari-Sari Store</h1>\n```",
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
        "id": "class",
        "label": "The heading has class title",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "class=\"title\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add className=\"title\" to the h1 tag."
      },
      {
        "level": 2,
        "text": "Put this line where the heading is in App.jsx.\n\nIn src/App.jsx:\n```\n      <h1 className=\"title\">Sari-Sari Store</h1>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "export default function App() {\n  const names = [\"Rice\",\"Soap\",\"Egg\"];\n  return (\n    <main>\n      <h1 className=\"title\">Sari-Sari Store</h1>\n      <p>Open 7 AM to 7 PM</p>\n      <ul>{names.map((name) => <li key={name}>{name}</li>)}</ul>\n    </main>\n  );\n}\n"
    },
    "conceptIds": [
      "react-jsx-class-name"
    ],
    "estimatedMinutes": 3,
    "projectId": "setup-sari-sari"
  },
  {
    "id": "fs-setup-sari-sari-8",
    "index": 8,
    "task": "In the terminal, type `npm run build` and press Enter. This rebuilds the project so the new title appears in the HTML file. The checker confirms the title is there. Run the checker. Paste its report.",
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
        "id": "rebuilt",
        "label": "dist/index.html has the new title",
        "kind": "local-file-contains",
        "path": "dist/index.html",
        "value": "<title>Sari-Sari Store</title>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The build command updates the files in the dist folder."
      },
      {
        "level": 2,
        "text": "Run `npm run build` in the terminal to rebuild."
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "npm run build"
    },
    "localFiles": {},
    "conceptIds": [
      "fs-rebuild"
    ],
    "estimatedMinutes": 3,
    "projectId": "setup-sari-sari"
  },
  {
    "id": "fs-setup-sari-sari-9",
    "index": 9,
    "task": "Create a new file called src/Footer.jsx. Inside, write a function called Footer. This function returns a footer with store text. This is a React component. The code below does this. Run the checker. Paste its report.\n\nIn src/Footer.jsx:\n```\nexport default function Footer() {\n  return <footer>Sari-Sari Store, serving since 2026</footer>;\n}\n```",
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
        "id": "footer",
        "label": "Footer shows its text",
        "kind": "local-react-render",
        "file": "src/Footer.jsx",
        "props": {},
        "contains": "serving since 2026"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Write a function that returns a footer tag with text."
      },
      {
        "level": 2,
        "text": "Save this code in src/Footer.jsx.\n\nIn src/Footer.jsx:\n```\nexport default function Footer() {\n  return <footer>Sari-Sari Store, serving since 2026</footer>;\n}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/Footer.jsx": "export default function Footer() {\n  return <footer>Sari-Sari Store, serving since 2026</footer>;\n}\n"
    },
    "conceptIds": [
      "react-component"
    ],
    "estimatedMinutes": 4,
    "projectId": "setup-sari-sari"
  },
  {
    "id": "fs-setup-sari-sari-10",
    "index": 10,
    "task": "In App.jsx, import the Footer component at the top. Then, after the list, add <Footer />. This puts the footer inside the app. The code below does this. Run the checker. Paste its report.\n\nIn src/App.jsx:\n```\nimport Footer from \"./Footer.jsx\";\n      <Footer />\n```",
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
        "id": "used",
        "label": "App shows the footer",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "<footer>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Import Footer from \"./Footer.jsx\" at the top."
      },
      {
        "level": 2,
        "text": "Put <Footer /> after the list in App.jsx.\n\nIn src/App.jsx:\n```\nimport Footer from \"./Footer.jsx\";\n      <Footer />\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "import Footer from \"./Footer.jsx\";\nexport default function App() {\n  const names = [\"Rice\",\"Soap\",\"Egg\"];\n  return (\n    <main>\n      <h1 className=\"title\">Sari-Sari Store</h1>\n      <p>Open 7 AM to 7 PM</p>\n      <ul>{names.map((name) => <li key={name}>{name}</li>)}</ul>\n      <Footer />\n    </main>\n  );\n}\n"
    },
    "conceptIds": [
      "react-component-composition"
    ],
    "estimatedMinutes": 3,
    "projectId": "setup-sari-sari"
  }
] satisfies typeof fullstackIntegrationCourse.steps));

// Validated local authoring batch: props-sari-sari.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-props-sari-sari-1",
    "index": 11,
    "task": "You will pass the items array to the ItemList component. Add this code at the top of src/App.jsx. It imports ItemList and creates an items array. Then, use ItemList after the h1. The code below shows what to add. Run the checker to see if your component renders.\n\nIn src/App.jsx:\n```\nimport ItemList from \"./ItemList.jsx\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\n      <ItemList items={items} />\n```\n\nType this command in your terminal:\n`npm install`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemList.jsx": "export default function ItemList({ items }) {\n  return (\n    <section>\n      <ul>\n        {items.map((item) => <li key={item.id}>{item.name}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "list",
        "label": "App lists Rice through ItemList",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "<li>Rice</li>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You need to pass the items array to ItemList so it can show them."
      },
      {
        "level": 2,
        "text": "Add the code at the top of src/App.jsx, right after the import.\n\nIn src/App.jsx:\n```\nimport ItemList from \"./ItemList.jsx\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\n      <ItemList items={items} />\n``` The command is: `npm install`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "npm install"
    },
    "localFiles": {
      "src/App.jsx": "import ItemList from \"./ItemList.jsx\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nexport default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <ItemList items={items} />\n    </main>\n  );\n}\n"
    },
    "conceptIds": [
      "react-props"
    ],
    "estimatedMinutes": 4,
    "projectId": "props-sari-sari"
  },
  {
    "id": "fs-props-sari-sari-2",
    "index": 12,
    "task": "You will show each item's price next to its name. Change the list line in src/ItemList.jsx. The code below shows what to add. Run the checker to see if your component renders.\n\nIn src/ItemList.jsx:\n```\n        {items.map((item) => <li key={item.id}>{item.name}: {item.price}</li>)}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemList.jsx": "export default function ItemList({ items }) {\n  return (\n    <section>\n      <ul>\n        {items.map((item) => <li key={item.id}>{item.name}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "price",
        "label": "ItemList shows Rice: 50",
        "kind": "local-react-render",
        "file": "src/ItemList.jsx",
        "props": {
          "items": [
            {
              "id": 1,
              "name": "Rice",
              "price": 50
            },
            {
              "id": 2,
              "name": "Soap",
              "price": 25
            },
            {
              "id": 3,
              "name": "Egg",
              "price": 9
            }
          ]
        },
        "contains": "Rice: 50"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You need to show the price next to the name inside the list item."
      },
      {
        "level": 2,
        "text": "Change the line inside src/ItemList.jsx that renders the list.\n\nIn src/ItemList.jsx:\n```\n        {items.map((item) => <li key={item.id}>{item.name}: {item.price}</li>)}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemList.jsx": "export default function ItemList({ items }) {\n  return (\n    <section>\n      <ul>\n        {items.map((item) => <li key={item.id}>{item.name}: {item.price}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "props-sari-sari"
  },
  {
    "id": "fs-props-sari-sari-3",
    "index": 13,
    "task": "You will add a currency prop that defaults to PHP. Add currency to the props with a default. Show it in the list. The code below shows what to add. Run the checker to see if your component renders.\n\nIn src/ItemList.jsx:\n```\nexport default function ItemList({ items, currency = \"PHP\" }) {\n        {items.map((item) => <li key={item.id}>{item.name}: {currency} {item.price}</li>)}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemList.jsx": "export default function ItemList({ items }) {\n  return (\n    <section>\n      <ul>\n        {items.map((item) => <li key={item.id}>{item.name}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "currency",
        "label": "With currency USD the list shows USD",
        "kind": "local-react-render",
        "file": "src/ItemList.jsx",
        "props": {
          "items": [
            {
              "id": 1,
              "name": "Rice",
              "price": 50
            },
            {
              "id": 2,
              "name": "Soap",
              "price": 25
            },
            {
              "id": 3,
              "name": "Egg",
              "price": 9
            }
          ],
          "currency": "USD"
        },
        "contains": "Rice: USD 50"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You need to add a default value for currency so it shows PHP if not passed."
      },
      {
        "level": 2,
        "text": "Add the code inside src/ItemList.jsx, right after the items prop.\n\nIn src/ItemList.jsx:\n```\nexport default function ItemList({ items, currency = \"PHP\" }) {\n        {items.map((item) => <li key={item.id}>{item.name}: {currency} {item.price}</li>)}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemList.jsx": "export default function ItemList({ items, currency = \"PHP\" }) {\n  return (\n    <section>\n      <ul>\n        {items.map((item) => <li key={item.id}>{item.name}: {currency} {item.price}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "conceptIds": [
      "fs-default-prop"
    ],
    "estimatedMinutes": 4,
    "projectId": "props-sari-sari"
  },
  {
    "id": "fs-props-sari-sari-4",
    "index": 14,
    "task": "You will show a message when there are no items. Add one line before return in src/ItemList.jsx. The code below shows what to add. Run the checker to see if your component renders.\n\nIn src/ItemList.jsx:\n```\n  if (items.length === 0) return <p>No items yet</p>;\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemList.jsx": "export default function ItemList({ items }) {\n  return (\n    <section>\n      <ul>\n        {items.map((item) => <li key={item.id}>{item.name}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "empty",
        "label": "An empty list shows No items yet",
        "kind": "local-react-render",
        "file": "src/ItemList.jsx",
        "props": {
          "items": []
        },
        "contains": "No items yet"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You need to show a message if the items array is empty."
      },
      {
        "level": 2,
        "text": "Add the code before the return statement in src/ItemList.jsx.\n\nIn src/ItemList.jsx:\n```\n  if (items.length === 0) return <p>No items yet</p>;\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemList.jsx": "export default function ItemList({ items, currency = \"PHP\" }) {\n  if (items.length === 0) return <p>No items yet</p>;\n  return (\n    <section>\n      <ul>\n        {items.map((item) => <li key={item.id}>{item.name}: {currency} {item.price}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "conceptIds": [
      "react-conditional-rendering"
    ],
    "estimatedMinutes": 3,
    "projectId": "props-sari-sari"
  },
  {
    "id": "fs-props-sari-sari-5",
    "index": 15,
    "task": "You will show a title passed in by the parent. Add title to the props and an h2 inside the section. The code below shows what to add. Run the checker to see if your component renders.\n\nIn src/ItemList.jsx:\n```\nexport default function ItemList({ items, currency = \"PHP\", title }) {\n      <h2>{title}</h2>\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemList.jsx": "export default function ItemList({ items }) {\n  return (\n    <section>\n      <ul>\n        {items.map((item) => <li key={item.id}>{item.name}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "title",
        "label": "The title prop appears as a heading",
        "kind": "local-react-render",
        "file": "src/ItemList.jsx",
        "props": {
          "items": [
            {
              "id": 1,
              "name": "Rice",
              "price": 50
            },
            {
              "id": 2,
              "name": "Soap",
              "price": 25
            },
            {
              "id": 3,
              "name": "Egg",
              "price": 9
            }
          ],
          "title": "Today"
        },
        "contains": "<h2>Today</h2>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You need to accept a title prop from the parent and show it as a heading."
      },
      {
        "level": 2,
        "text": "Add the code inside src/ItemList.jsx, right after the currency prop.\n\nIn src/ItemList.jsx:\n```\nexport default function ItemList({ items, currency = \"PHP\", title }) {\n      <h2>{title}</h2>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemList.jsx": "export default function ItemList({ items, currency = \"PHP\", title }) {\n  if (items.length === 0) return <p>No items yet</p>;\n  return (\n    <section>\n      <h2>{title}</h2>\n      <ul>\n        {items.map((item) => <li key={item.id}>{item.name}: {currency} {item.price}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "estimatedMinutes": 4,
    "projectId": "props-sari-sari"
  }
] satisfies typeof fullstackIntegrationCourse.steps));

// Validated local authoring batch: props-sari-sari.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-props-sari-sari-6",
    "index": 16,
    "task": "You will mark items under 40 pesos with a class called 'cheap'.\nGo to the list line in ItemList.jsx.\nAdd a condition: if price is less than 40, add 'cheap' to className.\nThis helps the store show cheap items differently.\nRun the checker to see if soap is marked cheap.\n\nIn src/ItemList.jsx:\n```\n        {items.map((item) => <li key={item.id} className={item.price < 40 ? \"cheap\" : undefined}>{item.name}: {currency} {item.price}</li>)}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemList.jsx": "export default function ItemList({ items }) {\n  return (\n    <section>\n      <ul>\n        {items.map((item) => <li key={item.id}>{item.name}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "cheap",
        "label": "Soap is marked cheap",
        "kind": "local-react-render",
        "file": "src/ItemList.jsx",
        "props": {
          "items": [
            {
              "id": 1,
              "name": "Rice",
              "price": 50
            },
            {
              "id": 2,
              "name": "Soap",
              "price": 25
            },
            {
              "id": 3,
              "name": "Egg",
              "price": 9
            }
          ]
        },
        "contains": "<li class=\"cheap\">Soap"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think: if item price is less than 40, add 'cheap' to className."
      },
      {
        "level": 2,
        "text": "Add the condition right after the className={...} part.\n\nIn src/ItemList.jsx:\n```\n        {items.map((item) => <li key={item.id} className={item.price < 40 ? \"cheap\" : undefined}>{item.name}: {currency} {item.price}</li>)}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemList.jsx": "export default function ItemList({ items, currency = \"PHP\", title }) {\n  if (items.length === 0) return <p>No items yet</p>;\n  return (\n    <section>\n      <h2>{title}</h2>\n      <ul>\n        {items.map((item) => <li key={item.id} className={item.price < 40 ? \"cheap\" : undefined}>{item.name}: {currency} {item.price}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "conceptIds": [
      "fs-conditional-class"
    ],
    "estimatedMinutes": 4,
    "projectId": "props-sari-sari"
  },
  {
    "id": "fs-props-sari-sari-7",
    "index": 17,
    "task": "You will show how many items are in the list.\nGo to the line after the h2 tag.\nAdd a paragraph that says the number of items.\nThis helps the store owner know how many items they have.\nRun the checker to see if it says 3 items.\n\nIn src/ItemList.jsx:\n```\n      <p>{items.length} items</p>\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemList.jsx": "export default function ItemList({ items }) {\n  return (\n    <section>\n      <ul>\n        {items.map((item) => <li key={item.id}>{item.name}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The list says 3 items",
        "kind": "local-react-render",
        "file": "src/ItemList.jsx",
        "props": {
          "items": [
            {
              "id": 1,
              "name": "Rice",
              "price": 50
            },
            {
              "id": 2,
              "name": "Soap",
              "price": 25
            },
            {
              "id": 3,
              "name": "Egg",
              "price": 9
            }
          ]
        },
        "contains": "<p>3 items</p>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use items.length to count the items."
      },
      {
        "level": 2,
        "text": "Add the paragraph right after the h2 tag.\n\nIn src/ItemList.jsx:\n```\n      <p>{items.length} items</p>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemList.jsx": "export default function ItemList({ items, currency = \"PHP\", title }) {\n  if (items.length === 0) return <p>No items yet</p>;\n  return (\n    <section>\n      <h2>{title}</h2>\n      <p>{items.length} items</p>\n      <ul>\n        {items.map((item) => <li key={item.id} className={item.price < 40 ? \"cheap\" : undefined}>{item.name}: {currency} {item.price}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "props-sari-sari"
  },
  {
    "id": "fs-props-sari-sari-8",
    "index": 18,
    "task": "You will let the store owner sort items by price.\nAdd a new prop called sortByPrice.\nIf true, make a copy of items and sort it by price.\nUse this sorted list in the map.\nThis helps the store owner see cheapest items first.\nRun the checker to see if egg is first when sortByPrice is true.\n\nIn src/ItemList.jsx:\n```\nexport default function ItemList({ items, currency = \"PHP\", title, sortByPrice = false }) {\n  const shown = sortByPrice ? [...items].sort((a, b) => a.price - b.price) : items;\n        {shown.map((item) => <li key={item.id} className={item.price < 40 ? \"cheap\" : undefined}>{item.name}: {currency} {item.price}</li>)}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemList.jsx": "export default function ItemList({ items }) {\n  return (\n    <section>\n      <ul>\n        {items.map((item) => <li key={item.id}>{item.name}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "sorted",
        "label": "With sortByPrice the list starts with Egg",
        "kind": "local-react-render",
        "file": "src/ItemList.jsx",
        "props": {
          "items": [
            {
              "id": 1,
              "name": "Rice",
              "price": 50
            },
            {
              "id": 2,
              "name": "Soap",
              "price": 25
            },
            {
              "id": 3,
              "name": "Egg",
              "price": 9
            }
          ],
          "sortByPrice": true
        },
        "contains": "<ul><li class=\"cheap\">Egg: PHP 9</li><li class=\"cheap\">Soap: PHP 25</li><li>Rice: PHP 50</li></ul>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Make a copy of items and sort it if sortByPrice is true."
      },
      {
        "level": 2,
        "text": "Use the sorted list in the map, not the original.\n\nIn src/ItemList.jsx:\n```\nexport default function ItemList({ items, currency = \"PHP\", title, sortByPrice = false }) {\n  const shown = sortByPrice ? [...items].sort((a, b) => a.price - b.price) : items;\n        {shown.map((item) => <li key={item.id} className={item.price < 40 ? \"cheap\" : undefined}>{item.name}: {currency} {item.price}</li>)}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemList.jsx": "export default function ItemList({ items, currency = \"PHP\", title, sortByPrice = false }) {\n  if (items.length === 0) return <p>No items yet</p>;\n  const shown = sortByPrice ? [...items].sort((a, b) => a.price - b.price) : items;\n  return (\n    <section>\n      <h2>{title}</h2>\n      <p>{items.length} items</p>\n      <ul>\n        {shown.map((item) => <li key={item.id} className={item.price < 40 ? \"cheap\" : undefined}>{item.name}: {currency} {item.price}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "conceptIds": [
      "react-derived-state"
    ],
    "estimatedMinutes": 6,
    "projectId": "props-sari-sari"
  },
  {
    "id": "fs-props-sari-sari-9",
    "index": 19,
    "task": "You will let the parent add extra content inside the list.\nAdd a new prop called children.\nShow this content at the end of the list.\nThis lets the store owner add notes or ads inside the list.\nRun the checker to see if extra text appears at the end.\n\nIn src/ItemList.jsx:\n```\nexport default function ItemList({ items, currency = \"PHP\", title, sortByPrice = false, children }) {\n      {children}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemList.jsx": "export default function ItemList({ items }) {\n  return (\n    <section>\n      <ul>\n        {items.map((item) => <li key={item.id}>{item.name}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "children",
        "label": "Text passed as children appears at the end",
        "kind": "local-react-render",
        "file": "src/ItemList.jsx",
        "props": {
          "items": [
            {
              "id": 1,
              "name": "Rice",
              "price": 50
            },
            {
              "id": 2,
              "name": "Soap",
              "price": 25
            },
            {
              "id": 3,
              "name": "Egg",
              "price": 9
            }
          ],
          "children": "Prices updated today"
        },
        "contains": "Prices updated today</section>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add children to the props and show it at the end of the section."
      },
      {
        "level": 2,
        "text": "Use {children} to show the content.\n\nIn src/ItemList.jsx:\n```\nexport default function ItemList({ items, currency = \"PHP\", title, sortByPrice = false, children }) {\n      {children}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemList.jsx": "export default function ItemList({ items, currency = \"PHP\", title, sortByPrice = false, children }) {\n  if (items.length === 0) return <p>No items yet</p>;\n  const shown = sortByPrice ? [...items].sort((a, b) => a.price - b.price) : items;\n  return (\n    <section>\n      <h2>{title}</h2>\n      <p>{items.length} items</p>\n      <ul>\n        {shown.map((item) => <li key={item.id} className={item.price < 40 ? \"cheap\" : undefined}>{item.name}: {currency} {item.price}</li>)}\n      </ul>\n      {children}\n    </section>\n  );\n}\n"
    },
    "conceptIds": [
      "react-children"
    ],
    "estimatedMinutes": 4,
    "projectId": "props-sari-sari"
  },
  {
    "id": "fs-props-sari-sari-10",
    "index": 20,
    "task": "You will pass a title, currency, and sortByPrice from App to ItemList.\nGo to the ItemList line in App.jsx.\nAdd the title, currency, and sortByPrice props.\nThis lets the store owner customize the list.\nRun the checker to see if the title is passed correctly.\n\nIn src/App.jsx:\n```\n      <ItemList items={items} title=\"Sari-Sari Store price list\" currency=\"PHP\" sortByPrice />\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemList.jsx": "export default function ItemList({ items }) {\n  return (\n    <section>\n      <ul>\n        {items.map((item) => <li key={item.id}>{item.name}</li>)}\n      </ul>\n    </section>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "app",
        "label": "App passes a title to ItemList",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "<h2>Sari-Sari Store price list</h2>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the props: title, currency, and sortByPrice."
      },
      {
        "level": 2,
        "text": "Use the exact prop names in the ItemList call.\n\nIn src/App.jsx:\n```\n      <ItemList items={items} title=\"Sari-Sari Store price list\" currency=\"PHP\" sortByPrice />\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "import ItemList from \"./ItemList.jsx\";\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nexport default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <ItemList items={items} title=\"Sari-Sari Store price list\" currency=\"PHP\" sortByPrice />\n    </main>\n  );\n}\n"
    },
    "estimatedMinutes": 5,
    "projectId": "props-sari-sari"
  }
] satisfies typeof fullstackIntegrationCourse.steps));

// Validated local authoring batch: serving-sari-sari.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-serving-sari-sari-1",
    "index": 21,
    "task": "Run `npm install` to get the needed packages. Then run `npm run build` to make the app files. The checker will confirm that the `dist` folder has the built files. This folder holds the files the server sends to browsers.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Server is running\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "dist",
        "label": "dist/assets/app.js exists",
        "kind": "local-file-exists",
        "path": "dist/assets/app.js"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The `dist` folder is where the built files go. The server reads from here."
      },
      {
        "level": 2,
        "text": "Run the commands in the terminal where the project files are. The command is: `npm install` then `npm run build`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "npm install\nnpm run build"
    },
    "localFiles": {},
    "conceptIds": [
      "fs-dist"
    ],
    "estimatedMinutes": 3,
    "projectId": "serving-sari-sari"
  },
  {
    "id": "fs-serving-sari-sari-2",
    "index": 22,
    "task": "Replace the `res.end` line in `server.js` with two lines. The first line sends the built `index.html` with an HTML content type. The second line answers 404 for any other URL. This lets the server serve the built page.\n\nIn server.js:\n```\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Server is running\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "index",
        "label": "GET / answers the built page",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/"
          }
        ],
        "bodyContains": "<div id=\"root\"></div>",
        "header": {
          "name": "content-type",
          "value": "text/html"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server must send the HTML file with the right content type so the browser can show it."
      },
      {
        "level": 2,
        "text": "Put the new code right after the `if (req.url === '/')` block.\n\nIn server.js:\n```\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-serve-index"
    ],
    "estimatedMinutes": 4,
    "projectId": "serving-sari-sari"
  },
  {
    "id": "fs-serving-sari-sari-3",
    "index": 23,
    "task": "Add one line after the `/` route in `server.js`. This line serves the `app.js` file with a JavaScript content type. Browsers only run scripts if they get the right content type.\n\nIn server.js:\n```\n  if (req.url === \"/assets/app.js\") { res.setHeader(\"Content-Type\", \"text/javascript\"); return res.end(await readFile(path.join(\"dist\", \"assets\", \"app.js\"))); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Server is running\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "js",
        "label": "GET /assets/app.js answers JavaScript",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/assets/app.js"
          }
        ],
        "header": {
          "name": "content-type",
          "value": "text/javascript"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server must send the JavaScript file with `text/javascript` so the browser can run it."
      },
      {
        "level": 2,
        "text": "Put the new line right after the `/` route block.\n\nIn server.js:\n```\n  if (req.url === \"/assets/app.js\") { res.setHeader(\"Content-Type\", \"text/javascript\"); return res.end(await readFile(path.join(\"dist\", \"assets\", \"app.js\"))); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url === \"/assets/app.js\") { res.setHeader(\"Content-Type\", \"text/javascript\"); return res.end(await readFile(path.join(\"dist\", \"assets\", \"app.js\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-content-type-js"
    ],
    "estimatedMinutes": 3,
    "projectId": "serving-sari-sari"
  },
  {
    "id": "fs-serving-sari-sari-4",
    "index": 24,
    "task": "Add a `types` map above the server code. Then replace the `app.js` line with a new one that serves all files in `dist/assets` with the right content type. This lets the server serve CSS, SVG, and other files correctly.\n\nIn server.js:\n```\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); return res.end(await readFile(file)); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Server is running\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "css",
        "label": "GET /assets/index.css answers CSS",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/assets/index.css"
          }
        ],
        "header": {
          "name": "content-type",
          "value": "text/css"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The `types` map tells the server what content type to send for each file ending."
      },
      {
        "level": 2,
        "text": "Put the new code right after the `const types = { ... }` line.\n\nIn server.js:\n```\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); return res.end(await readFile(file)); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); return res.end(await readFile(file)); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-static-files"
    ],
    "estimatedMinutes": 5,
    "projectId": "serving-sari-sari"
  },
  {
    "id": "fs-serving-sari-sari-5",
    "index": 25,
    "task": "Change the `/assets/` line in `server.js` to handle missing files. If a file is not found, the server answers 404 instead of crashing. This keeps the server running even if a file is missing.\n\nIn server.js:\n```\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Server is running\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "missing",
        "label": "GET /assets/nope.js answers 404",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/assets/nope.js"
          }
        ],
        "status": 404
      },
      {
        "id": "alive",
        "label": "The server keeps answering afterwards",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/assets/nope.js"
          },
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
        "text": "If a file does not exist, the server should answer 404, not crash."
      },
      {
        "level": 2,
        "text": "Put the new code right after the `if (req.url.startsWith('/assets/'))` block.\n\nIn server.js:\n```\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-missing-asset"
    ],
    "estimatedMinutes": 4,
    "projectId": "serving-sari-sari"
  }
] satisfies typeof fullstackIntegrationCourse.steps));

// Validated local authoring batch: serving-sari-sari.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-serving-sari-sari-6",
    "index": 26,
    "task": "You change the /assets/ line in server.js. This line sends built files to browsers. You add a long cache header so browsers keep those files for a year. This matters because built files get new names when they change. The code below does that. Run the checker and paste its report.\n\nIn server.js:\n```\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Server is running\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "cache",
        "label": "Built files are sent with a long cache",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/assets/app.js"
          }
        ],
        "header": {
          "name": "cache-control",
          "value": "immutable"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The cache header tells browsers to keep files for a long time."
      },
      {
        "level": 2,
        "text": "Add the header inside the if block for /assets/.\n\nIn server.js:\n```\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-asset-cache"
    ],
    "estimatedMinutes": 3,
    "projectId": "serving-sari-sari"
  },
  {
    "id": "fs-serving-sari-sari-7",
    "index": 27,
    "task": "You add one line before the 404 line in server.js. This line answers any GET request that does not start with /api/ with index.html. This matters because the React app handles its own pages. The code below does that. Run the checker and paste its report.\n\nIn server.js:\n```\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Server is running\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "spa",
        "label": "GET /about answers the app page",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/about"
          }
        ],
        "status": 200,
        "bodyContains": "<div id=\"root\"></div>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The React app needs index.html for all unknown paths."
      },
      {
        "level": 2,
        "text": "Add the line before the 404 block, inside the GET handler.\n\nIn server.js:\n```\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-spa-fallback"
    ],
    "estimatedMinutes": 4,
    "projectId": "serving-sari-sari"
  },
  {
    "id": "fs-serving-sari-sari-8",
    "index": 28,
    "task": "You change the / line in server.js. This line sends index.html for the root path. You add a no-cache header so browsers check for a new index.html every time. This matters because the app must show the latest build. The code below does that. Run the checker and paste its report.\n\nIn server.js:\n```\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Server is running\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "nocache",
        "label": "GET / sends Cache-Control: no-cache",
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
          "value": "no-cache"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The no-cache header forces browsers to check for a new file."
      },
      {
        "level": 2,
        "text": "Add the header inside the if block for /.\n\nIn server.js:\n```\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-index-no-cache"
    ],
    "estimatedMinutes": 3,
    "projectId": "serving-sari-sari"
  },
  {
    "id": "fs-serving-sari-sari-9",
    "index": 29,
    "task": "You add one line at the top of the server.js handler. This line sends the nosniff header to every answer. This matters because nosniff tells the browser to trust the content type. The code below does that. Run the checker and paste its report.\n\nIn server.js:\n```\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Server is running\");\n});\nserver.listen(port);\n"
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
            "path": "/"
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
        "text": "The nosniff header stops the browser from guessing the content type."
      },
      {
        "level": 2,
        "text": "Add the line at the top of the server.js handler, before any if block.\n\nIn server.js:\n```\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-nosniff"
    ],
    "estimatedMinutes": 2,
    "projectId": "serving-sari-sari"
  },
  {
    "id": "fs-serving-sari-sari-10",
    "index": 30,
    "task": "You add one line after the nosniff line in server.js. This line answers /health with a JSON object. This matters because a hosting service checks the server with /health. The code below does that. Run the checker and paste its report.\n\nIn server.js:\n```\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.end(\"Server is running\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "health",
        "label": "GET /health answers ok",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/health"
          }
        ],
        "bodyContains": "\"ok\":true"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The /health route lets a hosting service check if the server is running."
      },
      {
        "level": 2,
        "text": "Add the line after the nosniff header, inside the server.js handler.\n\nIn server.js:\n```\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-health-route"
    ],
    "estimatedMinutes": 3,
    "projectId": "serving-sari-sari"
  }
] satisfies typeof fullstackIntegrationCourse.steps));

// Validated local authoring batch: api-sari-sari.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-api-sari-sari-1",
    "index": 31,
    "task": "You will add a list of items to server.js. This list will answer GET /api/items. The code goes after /health. You will install dependencies and build the app. The checker will run your server and test the API.\n\nIn server.js:\n```\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\n  if (req.url === \"/api/items\" && req.method === \"GET\") return send(res, 200, items);\n```\n\nType these commands in your terminal:\n`npm install`\n`npm run build`",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [items, setItems] = useState([]);\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <ul>{items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "list",
        "label": "GET /api/items answers the items as JSON",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/api/items"
          }
        ],
        "bodyContains": "\"name\":\"Rice\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The items list must be above createItem so the server can use it."
      },
      {
        "level": 2,
        "text": "Add the route after /health in server.js.\n\nIn server.js:\n```\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\n  if (req.url === \"/api/items\" && req.method === \"GET\") return send(res, 200, items);\n``` The command is: `npm install` then `npm run build`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "npm install\nnpm run build"
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-same-server-api"
    ],
    "estimatedMinutes": 5,
    "projectId": "api-sari-sari"
  },
  {
    "id": "fs-api-sari-sari-2",
    "index": 32,
    "task": "You will add a React effect to fetch items when the page loads. The code goes after useState in src/App.jsx. The effect will call /api/items and update the state. The checker will confirm the app fetches the data.\n\nIn src/App.jsx:\n```\n  useEffect(() => {\n    fetch(\"/api/items\").then((response) => response.json()).then(setItems);\n  }, []);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [items, setItems] = useState([]);\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <ul>{items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "fetch",
        "label": "App fetches /api/items",
        "kind": "local-file-contains",
        "path": "src/App.jsx",
        "value": "fetch(\"/api/items\")"
      },
      {
        "id": "build",
        "label": "The app still builds",
        "kind": "local-npm-script",
        "script": "build"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The effect runs once, when the component mounts. It uses fetch to get data."
      },
      {
        "level": 2,
        "text": "Add the three lines after the useState line in src/App.jsx.\n\nIn src/App.jsx:\n```\n  useEffect(() => {\n    fetch(\"/api/items\").then((response) => response.json()).then(setItems);\n  }, []);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [items, setItems] = useState([]);\n  useEffect(() => {\n    fetch(\"/api/items\").then((response) => response.json()).then(setItems);\n  }, []);\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <ul>{items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>\n    </main>\n  );\n}\n"
    },
    "conceptIds": [
      "react-effect"
    ],
    "estimatedMinutes": 4,
    "projectId": "api-sari-sari"
  },
  {
    "id": "fs-api-sari-sari-3",
    "index": 33,
    "task": "You will add a loading state to show a message while data arrives. The code goes in src/App.jsx. You will set loading to false after fetching. The checker will confirm the app shows 'Loading items…' first.\n\nIn src/App.jsx:\n```\n  const [loading, setLoading] = useState(true);\n    fetch(\"/api/items\").then((response) => response.json()).then((data) => { setItems(data); setLoading(false); });\n      {loading && <p>Loading items…</p>}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [items, setItems] = useState([]);\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <ul>{items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "loading",
        "label": "App first shows Loading items…",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "Loading items…"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "React state remembers values while the user uses the page. Use useState to create it."
      },
      {
        "level": 2,
        "text": "Add the loading state and message before the fetch call.\n\nIn src/App.jsx:\n```\n  const [loading, setLoading] = useState(true);\n    fetch(\"/api/items\").then((response) => response.json()).then((data) => { setItems(data); setLoading(false); });\n      {loading && <p>Loading items…</p>}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [items, setItems] = useState([]);\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    fetch(\"/api/items\").then((response) => response.json()).then((data) => { setItems(data); setLoading(false); });\n  }, []);\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      {loading && <p>Loading items…</p>}\n      <ul>{items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>\n    </main>\n  );\n}\n"
    },
    "conceptIds": [
      "react-state"
    ],
    "estimatedMinutes": 4,
    "projectId": "api-sari-sari"
  },
  {
    "id": "fs-api-sari-sari-4",
    "index": 34,
    "task": "You will change the createItem function in server.js. The code will add a new item to the list and answer 201. The checker will confirm POST /api/items answers 201 with id 4.\n\nIn server.js:\n```\n  const item = { id: items.length + 1, ...JSON.parse(await readBody(req)) };\n  items.push(item);\n  return send(res, 201, item);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [items, setItems] = useState([]);\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <ul>{items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "post",
        "label": "POST /api/items answers 201 with id 4",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/api/items",
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
        "text": "The new item gets an id from the list length. Add it to items."
      },
      {
        "level": 2,
        "text": "Replace the line inside createItem with the three lines shown.\n\nIn server.js:\n```\n  const item = { id: items.length + 1, ...JSON.parse(await readBody(req)) };\n  items.push(item);\n  return send(res, 201, item);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nasync function createItem(req, res) {\n  const item = { id: items.length + 1, ...JSON.parse(await readBody(req)) };\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "api-sari-sari"
  },
  {
    "id": "fs-api-sari-sari-5",
    "index": 35,
    "task": "You will add server-side validation to check the name and price. The code goes in server.js. If the name or price is missing, the server will answer 422. The checker will confirm POST /api/items without a name answers 422.\n\nIn server.js:\n```\n  const data = JSON.parse(await readBody(req));\n  if (typeof data.name !== \"string\" || !data.name.trim() || !Number.isFinite(data.price)) return send(res, 422, { error: \"Send a name and a number price\" });\n  const item = { id: items.length + 1, name: data.name, price: data.price };\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [items, setItems] = useState([]);\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <ul>{items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "invalid",
        "label": "POST /api/items without a name answers 422",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/api/items",
            "body": "{\"price\":5}",
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
        "text": "Server-side validation means the server checks data before it accepts it. This is important because anyone can send requests."
      },
      {
        "level": 2,
        "text": "Read the body, check the name and price, then build the item.\n\nIn server.js:\n```\n  const data = JSON.parse(await readBody(req));\n  if (typeof data.name !== \"string\" || !data.name.trim() || !Number.isFinite(data.price)) return send(res, 422, { error: \"Send a name and a number price\" });\n  const item = { id: items.length + 1, name: data.name, price: data.price };\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nasync function createItem(req, res) {\n  const data = JSON.parse(await readBody(req));\n  if (typeof data.name !== \"string\" || !data.name.trim() || !Number.isFinite(data.price)) return send(res, 422, { error: \"Send a name and a number price\" });\n  const item = { id: items.length + 1, name: data.name, price: data.price };\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-server-validation"
    ],
    "estimatedMinutes": 5,
    "projectId": "api-sari-sari"
  }
] satisfies typeof fullstackIntegrationCourse.steps));

// Validated local authoring batch: api-sari-sari.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-api-sari-sari-6",
    "index": 36,
    "task": "Add an error state to show when loading fails. This helps the user know something went wrong. The code below catches failed requests and shows a message. Run the checker to confirm the app shows errors in an alert. The app still builds.\n\nIn src/App.jsx:\n```\n  const [error, setError] = useState(\"\");\n    fetch(\"/api/items\").then((response) => response.json()).then((data) => { setItems(data); setLoading(false); }).catch(() => { setError(\"Could not load items\"); setLoading(false); });\n      {error && <p role=\"alert\">{error}</p>}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [items, setItems] = useState([]);\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <ul>{items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "alert",
        "label": "App shows errors in an alert",
        "kind": "local-file-contains",
        "path": "src/App.jsx",
        "value": "<p role=\"alert\">{error}</p>"
      },
      {
        "id": "build",
        "label": "The app still builds",
        "kind": "local-npm-script",
        "script": "build"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Keep an error message in state and show it so users see what went wrong."
      },
      {
        "level": 2,
        "text": "Add the code after the error line in src/App.jsx.\n\nIn src/App.jsx:\n```\n  const [error, setError] = useState(\"\");\n    fetch(\"/api/items\").then((response) => response.json()).then((data) => { setItems(data); setLoading(false); }).catch(() => { setError(\"Could not load items\"); setLoading(false); });\n      {error && <p role=\"alert\">{error}</p>}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [items, setItems] = useState([]);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(\"\");\n  useEffect(() => {\n    fetch(\"/api/items\").then((response) => response.json()).then((data) => { setItems(data); setLoading(false); }).catch(() => { setError(\"Could not load items\"); setLoading(false); });\n  }, []);\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      {loading && <p>Loading items…</p>}\n      {error && <p role=\"alert\">{error}</p>}\n      <ul>{items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>\n    </main>\n  );\n}\n"
    },
    "conceptIds": [
      "fs-error-message"
    ],
    "estimatedMinutes": 4,
    "projectId": "api-sari-sari"
  },
  {
    "id": "fs-api-sari-sari-7",
    "index": 37,
    "task": "Add a line to show the total price of the loaded items. This is a computed value, not stored separately. The code below adds it after the error line. Run the checker to confirm the app shows Total: 0 pesos before loading.\n\nIn src/App.jsx:\n```\n      <p>Total: {items.reduce((sum, item) => sum + item.price, 0)} pesos</p>\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [items, setItems] = useState([]);\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <ul>{items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "total",
        "label": "Before loading, App shows Total: 0 pesos",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "Total: 0 pesos"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Compute the total from the items array while rendering, not store it separately."
      },
      {
        "level": 2,
        "text": "Add the code after the error line in src/App.jsx.\n\nIn src/App.jsx:\n```\n      <p>Total: {items.reduce((sum, item) => sum + item.price, 0)} pesos</p>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [items, setItems] = useState([]);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(\"\");\n  useEffect(() => {\n    fetch(\"/api/items\").then((response) => response.json()).then((data) => { setItems(data); setLoading(false); }).catch(() => { setError(\"Could not load items\"); setLoading(false); });\n  }, []);\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      {loading && <p>Loading items…</p>}\n      {error && <p role=\"alert\">{error}</p>}\n      <ul>{items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>\n      <p>Total: {items.reduce((sum, item) => sum + item.price, 0)} pesos</p>\n    </main>\n  );\n}\n"
    },
    "conceptIds": [
      "fs-computed-total"
    ],
    "estimatedMinutes": 3,
    "projectId": "api-sari-sari"
  },
  {
    "id": "fs-api-sari-sari-8",
    "index": 38,
    "task": "Add a route to answer /api/summary with the count and total. This helps the app know how many items and how much they cost. The code below adds it after the POST route. Run the checker to confirm GET /api/summary answers count 3 and total 84.\n\nIn server.js:\n```\n  if (req.url === \"/api/summary\") return send(res, 200, { count: items.length, total: items.reduce((sum, item) => sum + item.price, 0) });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [items, setItems] = useState([]);\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <ul>{items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "summary",
        "label": "GET /api/summary answers count 3 and total 84",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/api/summary"
          }
        ],
        "bodyContains": "{\"count\":3,\"total\":84}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the route after the POST route in server.js so it works with the app."
      },
      {
        "level": 2,
        "text": "Add the code after the POST route in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/api/summary\") return send(res, 200, { count: items.length, total: items.reduce((sum, item) => sum + item.price, 0) });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nasync function createItem(req, res) {\n  const data = JSON.parse(await readBody(req));\n  if (typeof data.name !== \"string\" || !data.name.trim() || !Number.isFinite(data.price)) return send(res, 422, { error: \"Send a name and a number price\" });\n  const item = { id: items.length + 1, name: data.name, price: data.price };\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/api/summary\") return send(res, 200, { count: items.length, total: items.reduce((sum, item) => sum + item.price, 0) });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "api-sari-sari"
  },
  {
    "id": "fs-api-sari-sari-9",
    "index": 39,
    "task": "Add a line to answer unknown /api/ paths with a JSON 404. This helps code calling the API know the path is wrong. The code below adds it after the summary route. Run the checker to confirm GET /api/nope answers a JSON 404.\n\nIn server.js:\n```\n  if (req.url.startsWith(\"/api/\")) return send(res, 404, { error: \"No such API route\" });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [items, setItems] = useState([]);\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <ul>{items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "api404",
        "label": "GET /api/nope answers a JSON 404",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/api/nope"
          }
        ],
        "status": 404,
        "bodyContains": "No such API route"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the 404 check after the summary route so it catches unknown paths."
      },
      {
        "level": 2,
        "text": "Add the code after the summary route in server.js.\n\nIn server.js:\n```\n  if (req.url.startsWith(\"/api/\")) return send(res, 404, { error: \"No such API route\" });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst items = [{ id: 1, name: \"Rice\", price: 50 }, { id: 2, name: \"Soap\", price: 25 }, { id: 3, name: \"Egg\", price: 9 }];\nasync function createItem(req, res) {\n  const data = JSON.parse(await readBody(req));\n  if (typeof data.name !== \"string\" || !data.name.trim() || !Number.isFinite(data.price)) return send(res, 422, { error: \"Send a name and a number price\" });\n  const item = { id: items.length + 1, name: data.name, price: data.price };\n  items.push(item);\n  return send(res, 201, item);\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"GET\") return send(res, 200, items);\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/api/summary\") return send(res, 200, { count: items.length, total: items.reduce((sum, item) => sum + item.price, 0) });\n  if (req.url.startsWith(\"/api/\")) return send(res, 404, { error: \"No such API route\" });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-api-404"
    ],
    "estimatedMinutes": 4,
    "projectId": "api-sari-sari"
  },
  {
    "id": "fs-api-sari-sari-10",
    "index": 40,
    "task": "Change the list line to use each item's id as its key. This keeps each row tied to the same item even when names repeat. The code below changes the list line. Run the checker to confirm the list uses item.id as the key. The app still builds.\n\nIn src/App.jsx:\n```\n      <ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [items, setItems] = useState([]);\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <ul>{items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "key",
        "label": "The list uses item.id as the key",
        "kind": "local-file-contains",
        "path": "src/App.jsx",
        "value": "key={item.id}"
      },
      {
        "id": "build",
        "label": "The app still builds",
        "kind": "local-npm-script",
        "script": "build"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the database id as the key so React keeps each row tied to the same item."
      },
      {
        "level": 2,
        "text": "Change the list line in src/App.jsx to use item.id as the key.\n\nIn src/App.jsx:\n```\n      <ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "import { useEffect, useState } from \"react\";\nexport default function App() {\n  const [items, setItems] = useState([]);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(\"\");\n  useEffect(() => {\n    fetch(\"/api/items\").then((response) => response.json()).then((data) => { setItems(data); setLoading(false); }).catch(() => { setError(\"Could not load items\"); setLoading(false); });\n  }, []);\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      {loading && <p>Loading items…</p>}\n      {error && <p role=\"alert\">{error}</p>}\n      <ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>\n      <p>Total: {items.reduce((sum, item) => sum + item.price, 0)} pesos</p>\n    </main>\n  );\n}\n"
    },
    "conceptIds": [
      "fs-stable-key"
    ],
    "estimatedMinutes": 4,
    "projectId": "api-sari-sari"
  }
] satisfies typeof fullstackIntegrationCourse.steps));

// Validated local authoring batch: states-sari-sari.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-states-sari-sari-1",
    "index": 41,
    "task": "Add a line to show loading. This line tells the user the app is working. The code below goes in src/ItemsView.jsx. Run `npm install` to get the needed tools. Then run the checker to see if it shows Loading items…\n\nIn src/ItemsView.jsx:\n```\n  if (status === \"loading\") return <p role=\"status\">Loading items…</p>;\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  return <section>{status}</section>;\n}\n"
    },
    "tests": [
      {
        "id": "loading",
        "label": "status loading shows Loading items…",
        "kind": "local-react-render",
        "file": "src/ItemsView.jsx",
        "props": {
          "status": "loading"
        },
        "contains": "Loading items…"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Put the loading message before any other return. It must come first."
      },
      {
        "level": 2,
        "text": "The code goes right before the return line in src/ItemsView.jsx.\n\nIn src/ItemsView.jsx:\n```\n  if (status === \"loading\") return <p role=\"status\">Loading items…</p>;\n``` The command is: `npm install`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "npm install"
    },
    "localFiles": {
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  if (status === \"loading\") return <p role=\"status\">Loading items…</p>;\n  return <section>{status}</section>;\n}\n"
    },
    "conceptIds": [
      "fs-view-states"
    ],
    "estimatedMinutes": 3,
    "projectId": "states-sari-sari"
  },
  {
    "id": "fs-states-sari-sari-2",
    "index": 42,
    "task": "Add a line to show an error. This line tells the user something went wrong. The code below goes after the loading line. The checker will confirm it shows the error message.\n\nIn src/ItemsView.jsx:\n```\n  if (status === \"error\") return <p role=\"alert\">{error || \"Something went wrong\"}</p>;\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  return <section>{status}</section>;\n}\n"
    },
    "tests": [
      {
        "id": "error",
        "label": "status error shows the error message",
        "kind": "local-react-render",
        "file": "src/ItemsView.jsx",
        "props": {
          "status": "error",
          "error": "Server is down"
        },
        "contains": "<p role=\"alert\">Server is down</p>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Put the error message after the loading message. It must come after loading."
      },
      {
        "level": 2,
        "text": "The code goes after the loading line in src/ItemsView.jsx.\n\nIn src/ItemsView.jsx:\n```\n  if (status === \"error\") return <p role=\"alert\">{error || \"Something went wrong\"}</p>;\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  if (status === \"loading\") return <p role=\"status\">Loading items…</p>;\n  if (status === \"error\") return <p role=\"alert\">{error || \"Something went wrong\"}</p>;\n  return <section>{status}</section>;\n}\n"
    },
    "conceptIds": [
      "fs-error-state"
    ],
    "estimatedMinutes": 3,
    "projectId": "states-sari-sari"
  },
  {
    "id": "fs-states-sari-sari-3",
    "index": 43,
    "task": "Add a line to show a helpful message when the list is empty. This line invites the user to add the first item. The code below goes after the error line. The checker will confirm it shows the inviting message.\n\nIn src/ItemsView.jsx:\n```\n  if (items.length === 0) return <p>No items yet. Add the first one.</p>;\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  return <section>{status}</section>;\n}\n"
    },
    "tests": [
      {
        "id": "empty",
        "label": "An empty list shows an inviting message",
        "kind": "local-react-render",
        "file": "src/ItemsView.jsx",
        "props": {
          "status": "ready",
          "items": []
        },
        "contains": "No items yet. Add the first one."
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Put the empty message after the error message. It must come after error."
      },
      {
        "level": 2,
        "text": "The code goes after the error line in src/ItemsView.jsx.\n\nIn src/ItemsView.jsx:\n```\n  if (items.length === 0) return <p>No items yet. Add the first one.</p>;\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  if (status === \"loading\") return <p role=\"status\">Loading items…</p>;\n  if (status === \"error\") return <p role=\"alert\">{error || \"Something went wrong\"}</p>;\n  if (items.length === 0) return <p>No items yet. Add the first one.</p>;\n  return <section>{status}</section>;\n}\n"
    },
    "conceptIds": [
      "fs-empty-message"
    ],
    "estimatedMinutes": 3,
    "projectId": "states-sari-sari"
  },
  {
    "id": "fs-states-sari-sari-4",
    "index": 44,
    "task": "Change the return line to show the items as a list. This line shows the items when everything is ready. The code below replaces the return line. The checker will confirm it shows Rice.\n\nIn src/ItemsView.jsx:\n```\n  return <ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>;\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  return <section>{status}</section>;\n}\n"
    },
    "tests": [
      {
        "id": "list",
        "label": "A ready list shows Rice",
        "kind": "local-react-render",
        "file": "src/ItemsView.jsx",
        "props": {
          "status": "ready",
          "items": [
            {
              "id": 1,
              "name": "Rice",
              "price": 50
            },
            {
              "id": 2,
              "name": "Soap",
              "price": 25
            },
            {
              "id": 3,
              "name": "Egg",
              "price": 9
            }
          ]
        },
        "contains": "<li>Rice</li>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Replace the return line with the list code. It must be the last return."
      },
      {
        "level": 2,
        "text": "The code goes in place of the return line in src/ItemsView.jsx.\n\nIn src/ItemsView.jsx:\n```\n  return <ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>;\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  if (status === \"loading\") return <p role=\"status\">Loading items…</p>;\n  if (status === \"error\") return <p role=\"alert\">{error || \"Something went wrong\"}</p>;\n  if (items.length === 0) return <p>No items yet. Add the first one.</p>;\n  return <ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>;\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "states-sari-sari"
  },
  {
    "id": "fs-states-sari-sari-5",
    "index": 45,
    "task": "Change the error line to add a Try again button. This button lets the user try again. The code below adds the button to the error line. The checker will confirm it shows the Try again button.\n\nIn src/ItemsView.jsx:\n```\n  if (status === \"error\") return <p role=\"alert\">{error || \"Something went wrong\"} <button type=\"button\">Try again</button></p>;\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  return <section>{status}</section>;\n}\n"
    },
    "tests": [
      {
        "id": "retry",
        "label": "The error state has a Try again button",
        "kind": "local-react-render",
        "file": "src/ItemsView.jsx",
        "props": {
          "status": "error"
        },
        "contains": "Try again</button>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the button after the error message. It must come after the message."
      },
      {
        "level": 2,
        "text": "The code goes in the error line in src/ItemsView.jsx.\n\nIn src/ItemsView.jsx:\n```\n  if (status === \"error\") return <p role=\"alert\">{error || \"Something went wrong\"} <button type=\"button\">Try again</button></p>;\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  if (status === \"loading\") return <p role=\"status\">Loading items…</p>;\n  if (status === \"error\") return <p role=\"alert\">{error || \"Something went wrong\"} <button type=\"button\">Try again</button></p>;\n  if (items.length === 0) return <p>No items yet. Add the first one.</p>;\n  return <ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>;\n}\n"
    },
    "conceptIds": [
      "fs-retry"
    ],
    "estimatedMinutes": 3,
    "projectId": "states-sari-sari"
  }
] satisfies typeof fullstackIntegrationCourse.steps));

// Validated local authoring batch: states-sari-sari.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-states-sari-sari-6",
    "index": 46,
    "task": "You change the loading line in ItemsView.jsx. This tells screen readers that the area is still busy. The code below adds aria-busy to help users with screen readers. Run the checker to confirm it works.\n\nIn src/ItemsView.jsx:\n```\n  if (status === \"loading\") return <p role=\"status\" aria-busy=\"true\">Loading items…</p>;\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  return <section>{status}</section>;\n}\n"
    },
    "tests": [
      {
        "id": "busy",
        "label": "The loading message has aria-busy",
        "kind": "local-react-render",
        "file": "src/ItemsView.jsx",
        "props": {
          "status": "loading"
        },
        "contains": "aria-busy=\"true\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add aria-busy to tell screen readers the area is loading."
      },
      {
        "level": 2,
        "text": "Put it in the loading line inside ItemsView.jsx.\n\nIn src/ItemsView.jsx:\n```\n  if (status === \"loading\") return <p role=\"status\" aria-busy=\"true\">Loading items…</p>;\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  if (status === \"loading\") return <p role=\"status\" aria-busy=\"true\">Loading items…</p>;\n  if (status === \"error\") return <p role=\"alert\">{error || \"Something went wrong\"} <button type=\"button\">Try again</button></p>;\n  if (items.length === 0) return <p>No items yet. Add the first one.</p>;\n  return <ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>;\n}\n"
    },
    "conceptIds": [
      "fs-aria-busy"
    ],
    "estimatedMinutes": 3,
    "projectId": "states-sari-sari"
  },
  {
    "id": "fs-states-sari-sari-7",
    "index": 47,
    "task": "You change the return line in ItemsView.jsx. This shows how many items are listed. The code below adds the count. Run the checker to confirm it shows 3 items.\n\nIn src/ItemsView.jsx:\n```\n  return <section><p>{items.length} items</p><ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul></section>;\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  return <section>{status}</section>;\n}\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The list says 3 items",
        "kind": "local-react-render",
        "file": "src/ItemsView.jsx",
        "props": {
          "status": "ready",
          "items": [
            {
              "id": 1,
              "name": "Rice",
              "price": 50
            },
            {
              "id": 2,
              "name": "Soap",
              "price": 25
            },
            {
              "id": 3,
              "name": "Egg",
              "price": 9
            }
          ]
        },
        "contains": "<p>3 items</p>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the item count before the list to show how many items there are."
      },
      {
        "level": 2,
        "text": "Put it in the return line inside ItemsView.jsx.\n\nIn src/ItemsView.jsx:\n```\n  return <section><p>{items.length} items</p><ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul></section>;\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  if (status === \"loading\") return <p role=\"status\" aria-busy=\"true\">Loading items…</p>;\n  if (status === \"error\") return <p role=\"alert\">{error || \"Something went wrong\"} <button type=\"button\">Try again</button></p>;\n  if (items.length === 0) return <p>No items yet. Add the first one.</p>;\n  return <section><p>{items.length} items</p><ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul></section>;\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "states-sari-sari"
  },
  {
    "id": "fs-states-sari-sari-8",
    "index": 48,
    "task": "You change the return line in ItemsView.jsx. This shows when the list was last updated, only if updatedAt is given. The code below adds the update message. Run the checker to confirm it appears when given.\n\nIn src/ItemsView.jsx:\n```\n  return <section><p>{items.length} items</p>{updatedAt && <p>Updated {updatedAt}</p>}<ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul></section>;\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  return <section>{status}</section>;\n}\n"
    },
    "tests": [
      {
        "id": "updated",
        "label": "updatedAt appears when given",
        "kind": "local-react-render",
        "file": "src/ItemsView.jsx",
        "props": {
          "status": "ready",
          "items": [
            {
              "id": 1,
              "name": "Rice",
              "price": 50
            },
            {
              "id": 2,
              "name": "Soap",
              "price": 25
            },
            {
              "id": 3,
              "name": "Egg",
              "price": 9
            }
          ],
          "updatedAt": "8:00 AM"
        },
        "contains": "Updated 8:00 AM"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Only show the update message if updatedAt is provided."
      },
      {
        "level": 2,
        "text": "Put it in the return line inside ItemsView.jsx.\n\nIn src/ItemsView.jsx:\n```\n  return <section><p>{items.length} items</p>{updatedAt && <p>Updated {updatedAt}</p>}<ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul></section>;\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  if (status === \"loading\") return <p role=\"status\" aria-busy=\"true\">Loading items…</p>;\n  if (status === \"error\") return <p role=\"alert\">{error || \"Something went wrong\"} <button type=\"button\">Try again</button></p>;\n  if (items.length === 0) return <p>No items yet. Add the first one.</p>;\n  return <section><p>{items.length} items</p>{updatedAt && <p>Updated {updatedAt}</p>}<ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul></section>;\n}\n"
    },
    "conceptIds": [
      "fs-updated-at"
    ],
    "estimatedMinutes": 4,
    "projectId": "states-sari-sari"
  },
  {
    "id": "fs-states-sari-sari-9",
    "index": 49,
    "task": "You add one line after the error line in ItemsView.jsx. This explains the offline state clearly. The code below adds a message for screen readers. Run the checker to confirm it explains the situation.\n\nIn src/ItemsView.jsx:\n```\n  if (status === \"offline\") return <p role=\"alert\">You are offline. Showing saved items.</p>;\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  return <section>{status}</section>;\n}\n"
    },
    "tests": [
      {
        "id": "offline",
        "label": "status offline explains the situation",
        "kind": "local-react-render",
        "file": "src/ItemsView.jsx",
        "props": {
          "status": "offline"
        },
        "contains": "You are offline"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a message that says you are offline and show saved items."
      },
      {
        "level": 2,
        "text": "Put it after the error line inside ItemsView.jsx.\n\nIn src/ItemsView.jsx:\n```\n  if (status === \"offline\") return <p role=\"alert\">You are offline. Showing saved items.</p>;\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  if (status === \"loading\") return <p role=\"status\" aria-busy=\"true\">Loading items…</p>;\n  if (status === \"error\") return <p role=\"alert\">{error || \"Something went wrong\"} <button type=\"button\">Try again</button></p>;\n  if (status === \"offline\") return <p role=\"alert\">You are offline. Showing saved items.</p>;\n  if (items.length === 0) return <p>No items yet. Add the first one.</p>;\n  return <section><p>{items.length} items</p>{updatedAt && <p>Updated {updatedAt}</p>}<ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul></section>;\n}\n"
    },
    "conceptIds": [
      "fs-offline"
    ],
    "estimatedMinutes": 3,
    "projectId": "states-sari-sari"
  },
  {
    "id": "fs-states-sari-sari-10",
    "index": 50,
    "task": "You import ItemsView in App.jsx and show it after the h1. The code below adds the import and the component. Run the checker to confirm App shows the loading state from ItemsView.\n\nIn src/App.jsx:\n```\nimport ItemsView from \"./ItemsView.jsx\";\n      <ItemsView status=\"loading\" />\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemsView.jsx": "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {\n  return <section>{status}</section>;\n}\n"
    },
    "tests": [
      {
        "id": "app",
        "label": "App shows the loading state from ItemsView",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "Loading items…"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Import ItemsView and add it after the h1 in App.jsx."
      },
      {
        "level": 2,
        "text": "Put the import and component in App.jsx.\n\nIn src/App.jsx:\n```\nimport ItemsView from \"./ItemsView.jsx\";\n      <ItemsView status=\"loading\" />\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "import ItemsView from \"./ItemsView.jsx\";\nexport default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <ItemsView status=\"loading\" />\n    </main>\n  );\n}\n"
    },
    "estimatedMinutes": 4,
    "projectId": "states-sari-sari"
  }
] satisfies typeof fullstackIntegrationCourse.steps));

// Validated local authoring batch: forms-sari-sari.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-forms-sari-sari-1",
    "index": 51,
    "task": "Add a label and an input inside the form in src/ItemForm.jsx. This label tells users what to type. The input lets them type the item's name. Run `npm install` to get the needed tools. The checker renders your component to check if the name field is there. Paste the checker's report.\n\nIn src/ItemForm.jsx:\n```\n      <label htmlFor=\"name\">Name</label>\n      <input id=\"name\" name=\"name\" required />\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit }) {\n  return (\n    <form>\n    </form>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "The form has a labelled name field",
        "kind": "local-react-render",
        "file": "src/ItemForm.jsx",
        "props": {},
        "contains": "<label for=\"name\">Name</label><input id=\"name\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The label must match the input's id so screen readers can understand it."
      },
      {
        "level": 2,
        "text": "Put the label and input inside the form, right after the opening <form> tag.\n\nIn src/ItemForm.jsx:\n```\n      <label htmlFor=\"name\">Name</label>\n      <input id=\"name\" name=\"name\" required />\n``` The command is: `npm install`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "npm install"
    },
    "localFiles": {
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit }) {\n  return (\n    <form>\n      <label htmlFor=\"name\">Name</label>\n      <input id=\"name\" name=\"name\" required />\n    </form>\n  );\n}\n"
    },
    "conceptIds": [
      "fs-form-label"
    ],
    "estimatedMinutes": 4,
    "projectId": "forms-sari-sari"
  },
  {
    "id": "fs-forms-sari-sari-2",
    "index": 52,
    "task": "Add a label and an input after the name field. The label says 'Price'. The input lets users type a number. Set type to 'number' and min to '0' so only prices of 0 or more are allowed. The checker renders your component to check if the price field is there. Paste the checker's report.\n\nIn src/ItemForm.jsx:\n```\n      <label htmlFor=\"price\">Price</label>\n      <input id=\"price\" name=\"price\" type=\"number\" min=\"0\" required />\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit }) {\n  return (\n    <form>\n    </form>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "price",
        "label": "The price field is a number input",
        "kind": "local-react-render",
        "file": "src/ItemForm.jsx",
        "props": {},
        "contains": "type=\"number\" min=\"0\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Set type to 'number' and min to '0' to limit what users can type."
      },
      {
        "level": 2,
        "text": "Put the label and input right after the name field, inside the form.\n\nIn src/ItemForm.jsx:\n```\n      <label htmlFor=\"price\">Price</label>\n      <input id=\"price\" name=\"price\" type=\"number\" min=\"0\" required />\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit }) {\n  return (\n    <form>\n      <label htmlFor=\"name\">Name</label>\n      <input id=\"name\" name=\"name\" required />\n      <label htmlFor=\"price\">Price</label>\n      <input id=\"price\" name=\"price\" type=\"number\" min=\"0\" required />\n    </form>\n  );\n}\n"
    },
    "conceptIds": [
      "fs-number-input"
    ],
    "estimatedMinutes": 5,
    "projectId": "forms-sari-sari"
  },
  {
    "id": "fs-forms-sari-sari-3",
    "index": 53,
    "task": "Add a button after the price field. Set its type to 'submit'. The text should say 'Add item'. This button sends the form data when clicked. The checker renders your component to check if the button is there. Paste the checker's report.\n\nIn src/ItemForm.jsx:\n```\n      <button type=\"submit\">Add item</button>\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit }) {\n  return (\n    <form>\n    </form>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "button",
        "label": "The form has an Add item button",
        "kind": "local-react-render",
        "file": "src/ItemForm.jsx",
        "props": {},
        "contains": "<button type=\"submit\">Add item</button>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Set type to 'submit' so the browser knows this button sends the form."
      },
      {
        "level": 2,
        "text": "Put the button right after the price input, inside the form.\n\nIn src/ItemForm.jsx:\n```\n      <button type=\"submit\">Add item</button>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit }) {\n  return (\n    <form>\n      <label htmlFor=\"name\">Name</label>\n      <input id=\"name\" name=\"name\" required />\n      <label htmlFor=\"price\">Price</label>\n      <input id=\"price\" name=\"price\" type=\"number\" min=\"0\" required />\n      <button type=\"submit\">Add item</button>\n    </form>\n  );\n}\n"
    },
    "conceptIds": [
      "fs-submit-button"
    ],
    "estimatedMinutes": 3,
    "projectId": "forms-sari-sari"
  },
  {
    "id": "fs-forms-sari-sari-4",
    "index": 54,
    "task": "Add initialName to the props in src/ItemForm.jsx. Use it as the starting value for the name input with defaultValue. This lets the parent pass a starting name, like 'Tea'. The checker renders your component to check if the name field has 'Tea'. Paste the checker's report.\n\nIn src/ItemForm.jsx:\n```\nexport default function ItemForm({ onSubmit, initialName = \"\" }) {\n      <input id=\"name\" name=\"name\" defaultValue={initialName} required />\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit }) {\n  return (\n    <form>\n    </form>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "initial",
        "label": "initialName Tea fills the name field",
        "kind": "local-react-render",
        "file": "src/ItemForm.jsx",
        "props": {
          "initialName": "Tea"
        },
        "contains": "value=\"Tea\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use defaultValue to set the input's starting text without changing it later."
      },
      {
        "level": 2,
        "text": "Put defaultValue={initialName} inside the input tag, right after the id.\n\nIn src/ItemForm.jsx:\n```\nexport default function ItemForm({ onSubmit, initialName = \"\" }) {\n      <input id=\"name\" name=\"name\" defaultValue={initialName} required />\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit, initialName = \"\" }) {\n  return (\n    <form>\n      <label htmlFor=\"name\">Name</label>\n      <input id=\"name\" name=\"name\" defaultValue={initialName} required />\n      <label htmlFor=\"price\">Price</label>\n      <input id=\"price\" name=\"price\" type=\"number\" min=\"0\" required />\n      <button type=\"submit\">Add item</button>\n    </form>\n  );\n}\n"
    },
    "conceptIds": [
      "fs-default-value"
    ],
    "estimatedMinutes": 4,
    "projectId": "forms-sari-sari"
  },
  {
    "id": "fs-forms-sari-sari-5",
    "index": 55,
    "task": "Add a handleSubmit function before return in src/ItemForm.jsx. This function stops the page from reloading with event.preventDefault(). It collects the form data and sends it to onSubmit. Connect it to the form with onSubmit={handleSubmit}. The checker renders your component to check if the form sends data. Paste the checker's report.\n\nIn src/ItemForm.jsx:\n```\n  function handleSubmit(event) { event.preventDefault(); const data = new FormData(event.target); onSubmit?.({ name: data.get(\"name\"), price: Number(data.get(\"price\")) }); }\n    <form onSubmit={handleSubmit}>\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit }) {\n  return (\n    <form>\n    </form>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "prevent",
        "label": "handleSubmit stops the page reload",
        "kind": "local-file-contains",
        "path": "src/ItemForm.jsx",
        "value": "event.preventDefault()"
      },
      {
        "id": "build",
        "label": "The app still builds",
        "kind": "local-npm-script",
        "script": "build"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use event.preventDefault() to stop the browser from reloading the page."
      },
      {
        "level": 2,
        "text": "Put onSubmit={handleSubmit} on the form tag, right after the opening <form> tag.\n\nIn src/ItemForm.jsx:\n```\n  function handleSubmit(event) { event.preventDefault(); const data = new FormData(event.target); onSubmit?.({ name: data.get(\"name\"), price: Number(data.get(\"price\")) }); }\n    <form onSubmit={handleSubmit}>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit, initialName = \"\" }) {\n  function handleSubmit(event) { event.preventDefault(); const data = new FormData(event.target); onSubmit?.({ name: data.get(\"name\"), price: Number(data.get(\"price\")) }); }\n  return (\n    <form onSubmit={handleSubmit}>\n      <label htmlFor=\"name\">Name</label>\n      <input id=\"name\" name=\"name\" defaultValue={initialName} required />\n      <label htmlFor=\"price\">Price</label>\n      <input id=\"price\" name=\"price\" type=\"number\" min=\"0\" required />\n      <button type=\"submit\">Add item</button>\n    </form>\n  );\n}\n"
    },
    "conceptIds": [
      "fs-prevent-default"
    ],
    "estimatedMinutes": 6,
    "projectId": "forms-sari-sari"
  }
] satisfies typeof fullstackIntegrationCourse.steps));

// Validated local authoring batch: forms-sari-sari.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-forms-sari-sari-6",
    "index": 56,
    "task": "Add an error to the props. Show it before the button. This lets users see what's wrong. The code below does this. Run the checker and paste its report.\n\nIn src/ItemForm.jsx:\n```\nexport default function ItemForm({ onSubmit, initialName = \"\", error }) {\n      {error && <p role=\"alert\">{error}</p>}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit }) {\n  return (\n    <form>\n    </form>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "error",
        "label": "The error appears in an alert",
        "kind": "local-react-render",
        "file": "src/ItemForm.jsx",
        "props": {
          "error": "Price must be 0 or more"
        },
        "contains": "<p role=\"alert\">Price must be 0 or more</p>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Show the error message in a paragraph with role=\"alert\"."
      },
      {
        "level": 2,
        "text": "Put the error code in the ItemForm.jsx file, right before the button.\n\nIn src/ItemForm.jsx:\n```\nexport default function ItemForm({ onSubmit, initialName = \"\", error }) {\n      {error && <p role=\"alert\">{error}</p>}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit, initialName = \"\", error }) {\n  function handleSubmit(event) { event.preventDefault(); const data = new FormData(event.target); onSubmit?.({ name: data.get(\"name\"), price: Number(data.get(\"price\")) }); }\n  return (\n    <form onSubmit={handleSubmit}>\n      <label htmlFor=\"name\">Name</label>\n      <input id=\"name\" name=\"name\" defaultValue={initialName} required />\n      <label htmlFor=\"price\">Price</label>\n      <input id=\"price\" name=\"price\" type=\"number\" min=\"0\" required />\n      {error && <p role=\"alert\">{error}</p>}\n      <button type=\"submit\">Add item</button>\n    </form>\n  );\n}\n"
    },
    "conceptIds": [
      "fs-form-error"
    ],
    "estimatedMinutes": 3,
    "projectId": "forms-sari-sari"
  },
  {
    "id": "fs-forms-sari-sari-7",
    "index": 57,
    "task": "Add a saving prop to the ItemForm. Change the button to show \"Saving…\" when saving is true. This stops users from clicking twice. The code below does this. Run the checker and paste its report.\n\nIn src/ItemForm.jsx:\n```\nexport default function ItemForm({ onSubmit, initialName = \"\", error, saving = false }) {\n      <button type=\"submit\" disabled={saving}>{saving ? \"Saving…\" : \"Add item\"}</button>\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit }) {\n  return (\n    <form>\n    </form>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "saving",
        "label": "While saving, the button is disabled",
        "kind": "local-react-render",
        "file": "src/ItemForm.jsx",
        "props": {
          "saving": true
        },
        "contains": "disabled=\"\">Saving…</button>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use a ternary to show either \"Add item\" or \"Saving…\" based on saving."
      },
      {
        "level": 2,
        "text": "Put the button code in ItemForm.jsx, right after the error message.\n\nIn src/ItemForm.jsx:\n```\nexport default function ItemForm({ onSubmit, initialName = \"\", error, saving = false }) {\n      <button type=\"submit\" disabled={saving}>{saving ? \"Saving…\" : \"Add item\"}</button>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit, initialName = \"\", error, saving = false }) {\n  function handleSubmit(event) { event.preventDefault(); const data = new FormData(event.target); onSubmit?.({ name: data.get(\"name\"), price: Number(data.get(\"price\")) }); }\n  return (\n    <form onSubmit={handleSubmit}>\n      <label htmlFor=\"name\">Name</label>\n      <input id=\"name\" name=\"name\" defaultValue={initialName} required />\n      <label htmlFor=\"price\">Price</label>\n      <input id=\"price\" name=\"price\" type=\"number\" min=\"0\" required />\n      {error && <p role=\"alert\">{error}</p>}\n      <button type=\"submit\" disabled={saving}>{saving ? \"Saving…\" : \"Add item\"}</button>\n    </form>\n  );\n}\n"
    },
    "conceptIds": [
      "fs-disabled-button"
    ],
    "estimatedMinutes": 4,
    "projectId": "forms-sari-sari"
  },
  {
    "id": "fs-forms-sari-sari-8",
    "index": 58,
    "task": "Replace the line inside createItem in server.js with three lines. This checks if the item is good or bad. Good items get 201. Bad items get 422. The code below does this. Run the checker and paste its report.\n\nIn server.js:\n```\n  const data = JSON.parse(await readBody(req));\n  if (typeof data.name !== \"string\" || !data.name.trim() || !Number.isFinite(data.price) || data.price < 0) return send(res, 422, { error: \"Send a name and a price of 0 or more\" });\n  return send(res, 201, { id: 4, ...data });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit }) {\n  return (\n    <form>\n    </form>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "ok",
        "label": "A good item answers 201",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/api/items",
            "body": "{\"name\":\"Tea\",\"price\":12}",
            "headers": {
              "Content-Type": "application/json"
            }
          }
        ],
        "status": 201
      },
      {
        "id": "bad",
        "label": "A negative price answers 422",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "POST",
            "path": "/api/items",
            "body": "{\"name\":\"Tea\",\"price\":-1}",
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
        "text": "Check if the name is a string, not empty, and the price is a number and not negative."
      },
      {
        "level": 2,
        "text": "Put the three lines in server.js, right after the line that reads the body.\n\nIn server.js:\n```\n  const data = JSON.parse(await readBody(req));\n  if (typeof data.name !== \"string\" || !data.name.trim() || !Number.isFinite(data.price) || data.price < 0) return send(res, 422, { error: \"Send a name and a price of 0 or more\" });\n  return send(res, 201, { id: 4, ...data });\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  const data = JSON.parse(await readBody(req));\n  if (typeof data.name !== \"string\" || !data.name.trim() || !Number.isFinite(data.price) || data.price < 0) return send(res, 422, { error: \"Send a name and a price of 0 or more\" });\n  return send(res, 201, { id: 4, ...data });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "forms-sari-sari"
  },
  {
    "id": "fs-forms-sari-sari-9",
    "index": 59,
    "task": "Add an addItem function at the top of App in src/App.jsx. This sends new items to the API. The code below does this. Run the checker and paste its report.\n\nIn src/App.jsx:\n```\n  function addItem(item) { fetch(\"/api/items\", { method: \"POST\", headers: { \"Content-Type\": \"application/json\" }, body: JSON.stringify(item) }); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit }) {\n  return (\n    <form>\n    </form>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "post",
        "label": "App sends items with POST",
        "kind": "local-file-contains",
        "path": "src/App.jsx",
        "value": "method: \"POST\""
      },
      {
        "id": "build",
        "label": "The app still builds",
        "kind": "local-npm-script",
        "script": "build"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use fetch with method POST, headers with \"Content-Type\": \"application/json\", and body with JSON.stringify(item)."
      },
      {
        "level": 2,
        "text": "Put the function in App.jsx, right after the other functions.\n\nIn src/App.jsx:\n```\n  function addItem(item) { fetch(\"/api/items\", { method: \"POST\", headers: { \"Content-Type\": \"application/json\" }, body: JSON.stringify(item) }); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "export default function App() {\n  function addItem(item) { fetch(\"/api/items\", { method: \"POST\", headers: { \"Content-Type\": \"application/json\" }, body: JSON.stringify(item) }); }\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n"
    },
    "conceptIds": [
      "fs-post-json"
    ],
    "estimatedMinutes": 4,
    "projectId": "forms-sari-sari"
  },
  {
    "id": "fs-forms-sari-sari-10",
    "index": 60,
    "task": "Import ItemForm and show it after the h1. This connects the form to addItem. The code below does this. Run the checker and paste its report.\n\nIn src/App.jsx:\n```\nimport ItemForm from \"./ItemForm.jsx\";\n      <ItemForm onSubmit={addItem} />\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "src/ItemForm.jsx": "export default function ItemForm({ onSubmit }) {\n  return (\n    <form>\n    </form>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nasync function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nasync function createItem(req, res) {\n  return send(res, 501, { error: \"Not built yet\" });\n}\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/items\" && req.method === \"POST\") return createItem(req, res);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "form",
        "label": "App shows the form",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "Add item</button>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Import ItemForm from \"./ItemForm.jsx\"."
      },
      {
        "level": 2,
        "text": "Put the <ItemForm onSubmit={addItem} /> after the <h1> tag in App.jsx.\n\nIn src/App.jsx:\n```\nimport ItemForm from \"./ItemForm.jsx\";\n      <ItemForm onSubmit={addItem} />\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "import ItemForm from \"./ItemForm.jsx\";\nexport default function App() {\n  function addItem(item) { fetch(\"/api/items\", { method: \"POST\", headers: { \"Content-Type\": \"application/json\" }, body: JSON.stringify(item) }); }\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n      <ItemForm onSubmit={addItem} />\n    </main>\n  );\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "forms-sari-sari"
  }
] satisfies typeof fullstackIntegrationCourse.steps));

// Validated local authoring batch: config-sari-sari.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-config-sari-sari-1",
    "index": 61,
    "task": "Open src/App.jsx. Add a line before return to get the place name. Use it in the h1 tag. This lets the app show the store name. Run npm install to get the Vite settings. The checker renders your component to see if it works.\n\nIn src/App.jsx:\n```\n  const place = import.meta.env.VITE_PLACE ?? \"Our store\";\n      <h1>{place}</h1>\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "default",
        "label": "Without a setting, App shows Our store",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "<h1>Our store</h1>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The VITE_PLACE setting lets you change the store name without changing code."
      },
      {
        "level": 2,
        "text": "Add the line before return in src/App.jsx, then use it in the h1 tag.\n\nIn src/App.jsx:\n```\n  const place = import.meta.env.VITE_PLACE ?? \"Our store\";\n      <h1>{place}</h1>\n``` The command is: `npm install`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "npm install"
    },
    "localFiles": {
      "src/App.jsx": "export default function App() {\n  const place = import.meta.env.VITE_PLACE ?? \"Our store\";\n  return (\n    <main>\n      <h1>{place}</h1>\n    </main>\n  );\n}\n"
    },
    "conceptIds": [
      "fs-vite-env"
    ],
    "estimatedMinutes": 3,
    "projectId": "config-sari-sari"
  },
  {
    "id": "fs-config-sari-sari-2",
    "index": 62,
    "task": "Create a new file named .env. Add one line: VITE_PLACE=Sari-Sari Store. This tells the app to use this name. The checker renders your component to check if it shows Sari-Sari Store.\n\nIn .env:\n```\nVITE_PLACE=Sari-Sari Store\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "env",
        "label": "With .env, App shows Sari-Sari Store",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "<h1>Sari-Sari Store</h1>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The .env file holds settings for this computer only. You can change it later."
      },
      {
        "level": 2,
        "text": "Save the line VITE_PLACE=Sari-Sari Store in a new file named .env.\n\nIn .env:\n```\nVITE_PLACE=Sari-Sari Store\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      ".env": "VITE_PLACE=Sari-Sari Store\n"
    },
    "conceptIds": [
      "fs-env-file"
    ],
    "estimatedMinutes": 2,
    "projectId": "config-sari-sari"
  },
  {
    "id": "fs-config-sari-sari-3",
    "index": 63,
    "task": "Create a new file named .env.example. Add one line: VITE_PLACE=Your place name. This helps other developers know what to put in .env. The checker confirms the file exists.\n\nIn .env.example:\n```\nVITE_PLACE=Your place name\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "example",
        "label": ".env.example lists VITE_PLACE",
        "kind": "local-file-contains",
        "path": ".env.example",
        "value": "VITE_PLACE="
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The .env.example file shows what settings exist, without real values."
      },
      {
        "level": 2,
        "text": "Save the line VITE_PLACE=Your place name in a new file named .env.example.\n\nIn .env.example:\n```\nVITE_PLACE=Your place name\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      ".env.example": "VITE_PLACE=Your place name\n"
    },
    "conceptIds": [
      "fs-env-example"
    ],
    "estimatedMinutes": 2,
    "projectId": "config-sari-sari"
  },
  {
    "id": "fs-config-sari-sari-4",
    "index": 64,
    "task": "Create a new file named .gitignore. Add three lines: node_modules, dist, .env. This keeps these files out of Git. The checker confirms .gitignore lists .env.\n\nIn .gitignore:\n```\nnode_modules\ndist\n.env\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "ignore",
        "label": ".gitignore lists .env",
        "kind": "local-file-contains",
        "path": ".gitignore",
        "value": ".env"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The .gitignore file tells Git to ignore certain files, like .env."
      },
      {
        "level": 2,
        "text": "Save the three lines in a new file named .gitignore.\n\nIn .gitignore:\n```\nnode_modules\ndist\n.env\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      ".gitignore": "node_modules\ndist\n.env\n"
    },
    "conceptIds": [
      "fs-gitignore"
    ],
    "estimatedMinutes": 2,
    "projectId": "config-sari-sari"
  },
  {
    "id": "fs-config-sari-sari-5",
    "index": 65,
    "task": "Open server.js. Add a config line above the server. Add an /api/config route after /health. This lets the server read its own settings. The checker confirms /api/config answers Sari-Sari Store.\n\nIn server.js:\n```\nconst config = { place: process.env.PLACE ?? \"Our store\", currency: process.env.CURRENCY ?? \"PHP\", apiKey: process.env.API_KEY ?? \"\" };\n  if (req.url === \"/api/config\") return send(res, 200, config);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "config",
        "label": "With PLACE set, /api/config answers Sari-Sari Store",
        "kind": "local-http",
        "file": "server.js",
        "env": {
          "PLACE": "Sari-Sari Store"
        },
        "requests": [
          {
            "method": "GET",
            "path": "/api/config"
          }
        ],
        "bodyContains": "\"place\":\"Sari-Sari Store\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server reads its own settings from process.env, separate from the front end."
      },
      {
        "level": 2,
        "text": "Add the config line and /api/config route in server.js, after /health.\n\nIn server.js:\n```\nconst config = { place: process.env.PLACE ?? \"Our store\", currency: process.env.CURRENCY ?? \"PHP\", apiKey: process.env.API_KEY ?? \"\" };\n  if (req.url === \"/api/config\") return send(res, 200, config);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst config = { place: process.env.PLACE ?? \"Our store\", currency: process.env.CURRENCY ?? \"PHP\", apiKey: process.env.API_KEY ?? \"\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/config\") return send(res, 200, config);\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-server-config"
    ],
    "estimatedMinutes": 4,
    "projectId": "config-sari-sari"
  }
] satisfies typeof fullstackIntegrationCourse.steps));

// Validated local authoring batch: config-sari-sari.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-config-sari-sari-6",
    "index": 66,
    "task": "You change the /api/config route. This route sends settings to the front end. You must hide the API key. The code below removes the API key from the response. Run the checker to confirm the API key is not sent.\n\nIn server.js:\n```\n  if (req.url === \"/api/config\") { const { apiKey, ...publicConfig } = config; return send(res, 200, publicConfig); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "safe",
        "label": "/api/config never sends the API key",
        "kind": "local-http",
        "file": "server.js",
        "env": {
          "API_KEY": "sk-test-FAKE"
        },
        "requests": [
          {
            "method": "GET",
            "path": "/api/config"
          }
        ],
        "bodyLacks": "sk-test"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The front end only needs public settings, not secrets."
      },
      {
        "level": 2,
        "text": "Add the code after the if (req.url === \"/api/config\") block.\n\nIn server.js:\n```\n  if (req.url === \"/api/config\") { const { apiKey, ...publicConfig } = config; return send(res, 200, publicConfig); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst config = { place: process.env.PLACE ?? \"Our store\", currency: process.env.CURRENCY ?? \"PHP\", apiKey: process.env.API_KEY ?? \"\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/config\") { const { apiKey, ...publicConfig } = config; return send(res, 200, publicConfig); }\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-public-config"
    ],
    "estimatedMinutes": 3,
    "projectId": "config-sari-sari"
  },
  {
    "id": "fs-config-sari-sari-7",
    "index": 67,
    "task": "You add a line after the config line. This line checks if the server runs in production. If it does, and no API key is set, the server stops. This is a required secret for production. Run the checker to confirm the server stops without an API key.\n\nIn server.js:\n```\nif (process.env.NODE_ENV === \"production\" && !process.env.API_KEY) { console.error(\"API_KEY is required in production\"); process.exit(1); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "stop",
        "label": "In production without API_KEY the server exits with code 1",
        "kind": "local-node-exit-code",
        "file": "server.js",
        "env": {
          "NODE_ENV": "production"
        },
        "code": 1
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The server must stop if it starts without a required secret."
      },
      {
        "level": 2,
        "text": "Add the code after the config line, before the route handler.\n\nIn server.js:\n```\nif (process.env.NODE_ENV === \"production\" && !process.env.API_KEY) { console.error(\"API_KEY is required in production\"); process.exit(1); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst config = { place: process.env.PLACE ?? \"Our store\", currency: process.env.CURRENCY ?? \"PHP\", apiKey: process.env.API_KEY ?? \"\" };\nif (process.env.NODE_ENV === \"production\" && !process.env.API_KEY) { console.error(\"API_KEY is required in production\"); process.exit(1); }\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/config\") { const { apiKey, ...publicConfig } = config; return send(res, 200, publicConfig); }\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-required-secret"
    ],
    "estimatedMinutes": 4,
    "projectId": "config-sari-sari"
  },
  {
    "id": "fs-config-sari-sari-8",
    "index": 68,
    "task": "You add a line after the h1 in src/App.jsx. This line shows the price currency. It uses VITE_CURRENCY, with PHP as default. The checker confirms the app shows Prices in PHP. Run the checker to confirm the text appears.\n\nIn src/App.jsx:\n```\n      <p>Prices in {import.meta.env.VITE_CURRENCY ?? \"PHP\"}</p>\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "currency",
        "label": "App shows Prices in PHP",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "Prices in PHP"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The currency is set by a Vite environment variable, which you can read in the app."
      },
      {
        "level": 2,
        "text": "Add the line after the <h1> tag, inside the <div> element.\n\nIn src/App.jsx:\n```\n      <p>Prices in {import.meta.env.VITE_CURRENCY ?? \"PHP\"}</p>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "export default function App() {\n  const place = import.meta.env.VITE_PLACE ?? \"Our store\";\n  return (\n    <main>\n      <h1>{place}</h1>\n      <p>Prices in {import.meta.env.VITE_CURRENCY ?? \"PHP\"}</p>\n    </main>\n  );\n}\n"
    },
    "estimatedMinutes": 2,
    "projectId": "config-sari-sari"
  },
  {
    "id": "fs-config-sari-sari-9",
    "index": 69,
    "task": "You run npm run build. This builds the app into a folder called dist. The built JavaScript includes VITE_CURRENCY. The checker confirms the built file contains the store name. Run the checker to confirm the text appears in the built file.",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "baked",
        "label": "dist/assets/app.js contains Sari-Sari Store",
        "kind": "local-file-contains",
        "path": "dist/assets/app.js",
        "value": "Sari-Sari Store"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Build-time settings are baked into the JavaScript, so anyone can read them."
      },
      {
        "level": 2,
        "text": "Run the command in the terminal, then check the dist folder. The command is: `npm run build`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "npm run build"
    },
    "localFiles": {},
    "conceptIds": [
      "fs-build-time-env"
    ],
    "estimatedMinutes": 4,
    "projectId": "config-sari-sari"
  },
  {
    "id": "fs-config-sari-sari-10",
    "index": 70,
    "task": "You make a new file named .env.production. This file sets VITE_PLACE to Sari-Sari Store Online. You run npm run build again. The checker confirms the production build uses this new name. Run the checker to confirm the text appears in the built file.\n\nIn .env.production:\n```\nVITE_PLACE=Sari-Sari Store Online\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nconst server = http.createServer(async (req, res) => {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "prod",
        "label": "The production build says Sari-Sari Store Online",
        "kind": "local-file-contains",
        "path": "dist/assets/app.js",
        "value": "Sari-Sari Store Online"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Mode files like .env.production are used only for production builds."
      },
      {
        "level": 2,
        "text": "Create the file in the root folder, then run the build command.\n\nIn .env.production:\n```\nVITE_PLACE=Sari-Sari Store Online\n``` The command is: `npm run build`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "npm run build"
    },
    "localFiles": {
      ".env.production": "VITE_PLACE=Sari-Sari Store Online\n"
    },
    "conceptIds": [
      "fs-mode-env"
    ],
    "estimatedMinutes": 5,
    "projectId": "config-sari-sari"
  }
] satisfies typeof fullstackIntegrationCourse.steps));

// Validated local authoring batch: deploy-sari-sari.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-deploy-sari-sari-1",
    "index": 71,
    "task": "Open package.json. Change the scripts line. Add the start script. This tells hosting services how to start your app. Run npm install to install the new script. The checker renders your component. Paste its report.\n\nIn package.json:\n```\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\", \"start\": \"node server.js\" },\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "start",
        "label": "package.json has a start script",
        "kind": "local-file-contains",
        "path": "package.json",
        "value": "\"start\": \"node server.js\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The start script tells the host how to run your app. Add it to the scripts section."
      },
      {
        "level": 2,
        "text": "Put the start script in package.json, then run npm install to save it.\n\nIn package.json:\n```\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\", \"start\": \"node server.js\" },\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "npm install"
    },
    "localFiles": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\", \"start\": \"node server.js\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n"
    },
    "conceptIds": [
      "fs-start-script"
    ],
    "estimatedMinutes": 3,
    "projectId": "deploy-sari-sari"
  },
  {
    "id": "fs-deploy-sari-sari-2",
    "index": 72,
    "task": "Open package.json. Add the engines line. This tells hosts which Node.js version your app needs. The checker renders your component. Paste its report.\n\nIn package.json:\n```\n  \"engines\": { \"node\": \">=22.13\" },\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "engines",
        "label": "package.json lists Node 22.13 or newer",
        "kind": "local-file-contains",
        "path": "package.json",
        "value": "\"node\": \">=22.13\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The engines field says which Node.js version your app uses. Add it to package.json."
      },
      {
        "level": 2,
        "text": "Put the engines line in package.json, then save it.\n\nIn package.json:\n```\n  \"engines\": { \"node\": \">=22.13\" },\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"engines\": { \"node\": \">=22.13\" },\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\", \"start\": \"node server.js\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n"
    },
    "conceptIds": [
      "fs-engines"
    ],
    "estimatedMinutes": 2,
    "projectId": "deploy-sari-sari"
  },
  {
    "id": "fs-deploy-sari-sari-3",
    "index": 73,
    "task": "Open package.json. Add the version line. This shows which release is running. Open server.js. Add the /api/version route. This lets you check the version. Run npm run build. The checker renders your component. Paste its report.\n\nIn package.json:\n```\n  \"version\": \"1.0.0\",\n```\n\nIn server.js:\n```\n  if (req.url === \"/api/version\") return send(res, 200, { version: JSON.parse(await readFile(\"package.json\", \"utf8\")).version });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "version",
        "label": "GET /api/version answers 1.0.0",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/api/version"
          }
        ],
        "bodyContains": "\"version\":\"1.0.0\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The version route shows the app's version. Add it to server.js to answer GET /api/version."
      },
      {
        "level": 2,
        "text": "Put the version line in package.json, then add the route to server.js.\n\nIn package.json:\n```\n  \"version\": \"1.0.0\",\n```\n\nIn server.js:\n```\n  if (req.url === \"/api/version\") return send(res, 200, { version: JSON.parse(await readFile(\"package.json\", \"utf8\")).version });\n``` The command is: `npm run build`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "npm run build"
    },
    "localFiles": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"version\": \"1.0.0\",\n  \"engines\": { \"node\": \">=22.13\" },\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\", \"start\": \"node server.js\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/version\") return send(res, 200, { version: JSON.parse(await readFile(\"package.json\", \"utf8\")).version });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-version-route"
    ],
    "estimatedMinutes": 5,
    "projectId": "deploy-sari-sari"
  },
  {
    "id": "fs-deploy-sari-sari-4",
    "index": 74,
    "task": "Open package.json. Change the scripts line. Add the check script. This finds syntax errors before deploying. The checker renders your component. Paste its report.\n\nIn package.json:\n```\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\", \"start\": \"node server.js\", \"check\": \"node --check server.js\" },\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "check",
        "label": "npm run check passes",
        "kind": "local-npm-script",
        "script": "check"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The check script runs Node's built-in checker. Add it to the scripts section."
      },
      {
        "level": 2,
        "text": "Put the check script in package.json, then run npm run check to test it.\n\nIn package.json:\n```\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\", \"start\": \"node server.js\", \"check\": \"node --check server.js\" },\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"version\": \"1.0.0\",\n  \"engines\": { \"node\": \">=22.13\" },\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\", \"start\": \"node server.js\", \"check\": \"node --check server.js\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n"
    },
    "conceptIds": [
      "fs-check-script"
    ],
    "estimatedMinutes": 3,
    "projectId": "deploy-sari-sari"
  },
  {
    "id": "fs-deploy-sari-sari-5",
    "index": 75,
    "task": "Open README.txt. Add two lines at the end. The first line says how to deploy. The second line says to set PORT and NODE_ENV. This helps anyone deploy your app the same way. The checker renders your component. Paste its report.\n\nIn README.txt:\n```\nDeploy: npm install, npm run build, then npm start.\nSet PORT and NODE_ENV=production on the host.\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "readme",
        "label": "README.txt lists the deploy commands",
        "kind": "local-file-contains",
        "path": "README.txt",
        "value": "npm run build, then npm start"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Write the exact deploy commands in README.txt so others can deploy your app."
      },
      {
        "level": 2,
        "text": "Add the two lines at the end of README.txt, then save it.\n\nIn README.txt:\n```\nDeploy: npm install, npm run build, then npm start.\nSet PORT and NODE_ENV=production on the host.\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\nDeploy: npm install, npm run build, then npm start.\nSet PORT and NODE_ENV=production on the host.\n"
    },
    "conceptIds": [
      "fs-readme-deploy"
    ],
    "estimatedMinutes": 4,
    "projectId": "deploy-sari-sari"
  }
] satisfies typeof fullstackIntegrationCourse.steps));

// Validated local authoring batch: deploy-sari-sari.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-deploy-sari-sari-6",
    "index": 76,
    "task": "Add this line above the port line in server.js. It lets the host stop the server cleanly. When the host sends SIGTERM, the server stops taking new requests. It finishes any work before exiting. This is called a graceful shutdown.\n\nIn server.js:\n```\nprocess.on(\"SIGTERM\", () => server.close(() => process.exit(0)));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "sigterm",
        "label": "server.js closes cleanly on SIGTERM",
        "kind": "local-file-contains",
        "path": "server.js",
        "value": "process.on(\"SIGTERM\""
      },
      {
        "id": "still",
        "label": "The server still answers",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/health"
          }
        ],
        "status": 200
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The host sends SIGTERM to stop the server. Your code must close the server before it exits."
      },
      {
        "level": 2,
        "text": "Add the line above the port line in server.js.\n\nIn server.js:\n```\nprocess.on(\"SIGTERM\", () => server.close(() => process.exit(0)));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nprocess.on(\"SIGTERM\", () => server.close(() => process.exit(0)));\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/version\") return send(res, 200, { version: JSON.parse(await readFile(\"package.json\", \"utf8\")).version });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-graceful-shutdown"
    ],
    "estimatedMinutes": 3,
    "projectId": "deploy-sari-sari"
  },
  {
    "id": "fs-deploy-sari-sari-7",
    "index": 77,
    "task": "Add a test route /api/boom to server.js. If someone asks for it, throw an error. Then catch that error in the handle function. Instead of crashing, send a 500 JSON answer. This is called catching route errors. The server keeps running after the error.\n\nIn server.js:\n```\n  if (req.url === \"/api/boom\") throw new Error(\"Test failure\");\n  handle(req, res).catch(() => send(res, 500, { error: \"Something went wrong\" }));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "500",
        "label": "GET /api/boom answers 500",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/api/boom"
          }
        ],
        "status": 500,
        "bodyContains": "Something went wrong"
      },
      {
        "id": "alive",
        "label": "The server keeps running after an error",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/api/boom"
          },
          {
            "method": "GET",
            "path": "/health"
          }
        ],
        "status": 200
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If you throw an error, the server crashes. Catch it to send a 500 answer instead."
      },
      {
        "level": 2,
        "text": "Add the code after the /api/version route in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/api/boom\") throw new Error(\"Test failure\");\n  handle(req, res).catch(() => send(res, 500, { error: \"Something went wrong\" }));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nprocess.on(\"SIGTERM\", () => server.close(() => process.exit(0)));\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/version\") return send(res, 200, { version: JSON.parse(await readFile(\"package.json\", \"utf8\")).version });\n  if (req.url === \"/api/boom\") throw new Error(\"Test failure\");\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res).catch(() => send(res, 500, { error: \"Something went wrong\" }));\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-json-errors"
    ],
    "estimatedMinutes": 5,
    "projectId": "deploy-sari-sari"
  },
  {
    "id": "fs-deploy-sari-sari-8",
    "index": 78,
    "task": "Change the scripts line in package.json. Add \"prestart\": \"npm run build\". This tells npm to build the app before starting the server. When you run npm start, it will first run npm run build. This ensures the app is always built before it runs.\n\nIn package.json:\n```\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\", \"prestart\": \"npm run build\", \"start\": \"node server.js\", \"check\": \"node --check server.js\" },\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "prestart",
        "label": "package.json builds before start",
        "kind": "local-file-contains",
        "path": "package.json",
        "value": "\"prestart\": \"npm run build\""
      },
      {
        "id": "build",
        "label": "npm run build passes",
        "kind": "local-npm-script",
        "script": "build"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The prestart script runs before start. It ensures the app is built before it runs."
      },
      {
        "level": 2,
        "text": "Change the scripts line in package.json. Add \"prestart\": \"npm run build\".\n\nIn package.json:\n```\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\", \"prestart\": \"npm run build\", \"start\": \"node server.js\", \"check\": \"node --check server.js\" },\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"version\": \"1.0.0\",\n  \"engines\": { \"node\": \">=22.13\" },\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\", \"prestart\": \"npm run build\", \"start\": \"node server.js\", \"check\": \"node --check server.js\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n"
    },
    "estimatedMinutes": 4,
    "projectId": "deploy-sari-sari"
  },
  {
    "id": "fs-deploy-sari-sari-9",
    "index": 79,
    "task": "Add this line near the top of handle in server.js. If LOG_REQUESTS is true, mark the answer with X-Logged: yes. This is called switchable logging. It lets you turn logging on at the host without changing code.\n\nIn server.js:\n```\n  if (process.env.LOG_REQUESTS === \"true\") res.setHeader(\"X-Logged\", \"yes\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "logged",
        "label": "With LOG_REQUESTS=true answers are marked logged",
        "kind": "local-http",
        "file": "server.js",
        "env": {
          "LOG_REQUESTS": "true"
        },
        "requests": [
          {
            "method": "GET",
            "path": "/health"
          }
        ],
        "header": {
          "name": "x-logged",
          "value": "yes"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Set LOG_REQUESTS to true in the environment to see the logged header."
      },
      {
        "level": 2,
        "text": "Add the line near the top of handle in server.js.\n\nIn server.js:\n```\n  if (process.env.LOG_REQUESTS === \"true\") res.setHeader(\"X-Logged\", \"yes\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nprocess.on(\"SIGTERM\", () => server.close(() => process.exit(0)));\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (process.env.LOG_REQUESTS === \"true\") res.setHeader(\"X-Logged\", \"yes\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/version\") return send(res, 200, { version: JSON.parse(await readFile(\"package.json\", \"utf8\")).version });\n  if (req.url === \"/api/boom\") throw new Error(\"Test failure\");\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res).catch(() => send(res, 500, { error: \"Something went wrong\" }));\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-request-log"
    ],
    "estimatedMinutes": 3,
    "projectId": "deploy-sari-sari"
  },
  {
    "id": "fs-deploy-sari-sari-10",
    "index": 80,
    "task": "Add this line after the /api/version route in server.js. If someone asks for /robots.txt, send a text/plain answer with the rules. This is called robots.txt. It tells search engines which parts of your site they may visit.\n\nIn server.js:\n```\n  if (req.url === \"/robots.txt\") { res.setHeader(\"Content-Type\", \"text/plain\"); return res.end(\"User-agent: *\\nAllow: /\\n\"); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"name\": \"fullstack-practice\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": { \"build\": \"vite build\", \"dev\": \"vite\" },\n  \"dependencies\": { \"react\": \"19.3.0\", \"react-dom\": \"19.3.0\" },\n  \"devDependencies\": { \"vite\": \"8.3.1\", \"@vitejs/plugin-react\": \"6.1.1\" }\n}\n",
      "vite.config.js": "import { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nexport default defineConfig({\n  plugins: [react()],\n  build: { rollupOptions: { output: { entryFileNames: \"assets/app.js\", assetFileNames: \"assets/[name][extname]\" } } },\n});\n",
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Sari-Sari Store</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
      "src/main.jsx": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\nimport \"./app.css\";\ncreateRoot(document.getElementById(\"root\")).render(<App />);\n",
      "src/app.css": "body { font-family: system-ui, sans-serif; margin: 2rem; }\n",
      "README.txt": "Sari-Sari Store full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Sari-Sari Store</h1>\n    </main>\n  );\n}\n",
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res);\n});\nserver.listen(port);\n"
    },
    "tests": [
      {
        "id": "robots",
        "label": "GET /robots.txt answers the robots rules",
        "kind": "local-http",
        "file": "server.js",
        "requests": [
          {
            "method": "GET",
            "path": "/robots.txt"
          }
        ],
        "bodyContains": "User-agent: *",
        "header": {
          "name": "content-type",
          "value": "text/plain"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "robots.txt tells search engines which parts of your site they may visit."
      },
      {
        "level": 2,
        "text": "Add the code after the /api/version route in server.js.\n\nIn server.js:\n```\n  if (req.url === \"/robots.txt\") { res.setHeader(\"Content-Type\", \"text/plain\"); return res.end(\"User-agent: *\\nAllow: /\\n\"); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "server.js": "import http from \"node:http\";\nimport { readFile } from \"node:fs/promises\";\nimport path from \"node:path\";\nfunction send(res, status, data) {\n  res.statusCode = status;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  res.end(JSON.stringify(data));\n}\nconst types = { \".js\": \"text/javascript\", \".css\": \"text/css\", \".svg\": \"image/svg+xml\" };\nprocess.on(\"SIGTERM\", () => server.close(() => process.exit(0)));\nconst port = Number(process.env.PORT ?? 3000);\nasync function handle(req, res) {\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  if (process.env.LOG_REQUESTS === \"true\") res.setHeader(\"X-Logged\", \"yes\");\n  if (req.url === \"/health\") return send(res, 200, { ok: true });\n  if (req.url === \"/api/version\") return send(res, 200, { version: JSON.parse(await readFile(\"package.json\", \"utf8\")).version });\n  if (req.url === \"/robots.txt\") { res.setHeader(\"Content-Type\", \"text/plain\"); return res.end(\"User-agent: *\\nAllow: /\\n\"); }\n  if (req.url === \"/api/boom\") throw new Error(\"Test failure\");\n  if (req.url === \"/\") { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); res.setHeader(\"Cache-Control\", \"no-cache\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  if (req.url.startsWith(\"/assets/\")) { const file = path.join(\"dist\", req.url); try { const body = await readFile(file); res.setHeader(\"Content-Type\", types[path.extname(file)] ?? \"application/octet-stream\"); res.setHeader(\"Cache-Control\", \"public, max-age=31536000, immutable\"); return res.end(body); } catch { res.statusCode = 404; return res.end(\"Missing file\"); } }\n  if (req.method === \"GET\" && !req.url.startsWith(\"/api/\")) { res.setHeader(\"Content-Type\", \"text/html; charset=utf-8\"); return res.end(await readFile(path.join(\"dist\", \"index.html\"))); }\n  res.statusCode = 404; res.end(\"Not found\");\n}\nconst server = http.createServer((req, res) => {\n  handle(req, res).catch(() => send(res, 500, { error: \"Something went wrong\" }));\n});\nserver.listen(port);\n"
    },
    "conceptIds": [
      "fs-robots"
    ],
    "estimatedMinutes": 4,
    "projectId": "deploy-sari-sari"
  }
] satisfies typeof fullstackIntegrationCourse.steps));

// Validated local authoring batch: setup-carinderia.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-setup-carinderia-1",
    "index": 81,
    "task": "You run the command to install the packages. This makes sure your app has all the tools it needs. The checker confirms the package-lock.json file was made. Run the checker to see the result.\n\nType this command in your terminal:\n`npm install`",
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
      "README.txt": "Carinderia full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
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
        "text": "The command installs everything listed in package.json."
      },
      {
        "level": 2,
        "text": "Type the command in the terminal inside the project folder. The command is: `npm install`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "npm install"
    },
    "localFiles": {},
    "estimatedMinutes": 2,
    "projectId": "setup-carinderia"
  },
  {
    "id": "fs-setup-carinderia-2",
    "index": 82,
    "task": "You change the heading in the App file. This tells visitors what your carinderia is called. The checker confirms the heading shows up. Run the checker to see the result.\n\nIn src/App.jsx:\n```\n      <h1>Carinderia</h1>\n```",
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
      "README.txt": "Carinderia full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Hello</h1>\n    </main>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "heading",
        "label": "App shows the heading Carinderia",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "<h1>Carinderia</h1>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Look for the h1 tag in src/App.jsx and change its text."
      },
      {
        "level": 2,
        "text": "The code below shows what to type in that file.\n\nIn src/App.jsx:\n```\n      <h1>Carinderia</h1>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Carinderia</h1>\n    </main>\n  );\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "setup-carinderia"
  },
  {
    "id": "fs-setup-carinderia-3",
    "index": 83,
    "task": "You run the build command. This prepares your app for the web. It writes files to the dist folder. The checker confirms the dist/index.html file exists. Run the checker to see the result.\n\nType this command in your terminal:\n`npm run build`",
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
      "README.txt": "Carinderia full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
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
        "text": "The build command prepares your app for the browser."
      },
      {
        "level": 2,
        "text": "Type the command in the terminal inside the project folder. The command is: `npm run build`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "npm run build"
    },
    "localFiles": {},
    "estimatedMinutes": 4,
    "projectId": "setup-carinderia"
  },
  {
    "id": "fs-setup-carinderia-4",
    "index": 84,
    "task": "You change the title in the index.html file. This is what appears in the browser tab. The checker confirms the title is now Carinderia. Run the checker to see the result.\n\nIn index.html:\n```\n    <title>Carinderia</title>\n```",
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
      "README.txt": "Carinderia full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Hello</h1>\n    </main>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "title",
        "label": "index.html has the title Carinderia",
        "kind": "local-file-contains",
        "path": "index.html",
        "value": "<title>Carinderia</title>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Look for the <title> tag in index.html and change its text."
      },
      {
        "level": 2,
        "text": "The code below shows what to type in that file.\n\nIn index.html:\n```\n    <title>Carinderia</title>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Carinderia</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n"
    },
    "estimatedMinutes": 3,
    "projectId": "setup-carinderia"
  },
  {
    "id": "fs-setup-carinderia-5",
    "index": 85,
    "task": "You add a line under the heading. This shows the opening hours. The checker confirms the hours appear. Run the checker to see the result.\n\nIn src/App.jsx:\n```\n      <p>Open 7 AM to 7 PM</p>\n```",
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
      "README.txt": "Carinderia full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
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
        "text": "Add the line after the h1 tag in src/App.jsx."
      },
      {
        "level": 2,
        "text": "The code below shows what to type in that file.\n\nIn src/App.jsx:\n```\n      <p>Open 7 AM to 7 PM</p>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Carinderia</h1>\n      <p>Open 7 AM to 7 PM</p>\n    </main>\n  );\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "setup-carinderia"
  }
] satisfies typeof fullstackIntegrationCourse.steps));

// Validated local authoring batch: setup-carinderia.
fullstackIntegrationCourse.steps.push(...([
  {
    "id": "fs-setup-carinderia-6",
    "index": 86,
    "task": "Add an array called names with three food items. Then, use map to show each item in a list. This helps you show all products clearly. The code below does this. Run the checker and paste its report.\n\nIn src/App.jsx:\n```\n  const names = [\"Adobo\",\"Pancit\",\"Lumpia\"];\n      <ul>{names.map((name) => <li key={name}>{name}</li>)}</ul>\n```",
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
      "README.txt": "Carinderia full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Hello</h1>\n    </main>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "list",
        "label": "App lists Adobo",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "<li>Adobo</li>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use map to loop through the names array and make a list item for each one."
      },
      {
        "level": 2,
        "text": "Put the list after the hours section in App.jsx.\n\nIn src/App.jsx:\n```\n  const names = [\"Adobo\",\"Pancit\",\"Lumpia\"];\n      <ul>{names.map((name) => <li key={name}>{name}</li>)}</ul>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "export default function App() {\n  const names = [\"Adobo\",\"Pancit\",\"Lumpia\"];\n  return (\n    <main>\n      <h1>Carinderia</h1>\n      <p>Open 7 AM to 7 PM</p>\n      <ul>{names.map((name) => <li key={name}>{name}</li>)}</ul>\n    </main>\n  );\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "setup-carinderia"
  },
  {
    "id": "fs-setup-carinderia-7",
    "index": 87,
    "task": "Change the h1 tag to include a class called title. This helps style the heading later. The code below does this. Run the checker and paste its report.\n\nIn src/App.jsx:\n```\n      <h1 className=\"title\">Carinderia</h1>\n```",
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
      "README.txt": "Carinderia full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Hello</h1>\n    </main>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "class",
        "label": "The heading has class title",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "class=\"title\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the className attribute to the h1 tag with the value 'title'."
      },
      {
        "level": 2,
        "text": "Put this change right after the return statement in App.jsx.\n\nIn src/App.jsx:\n```\n      <h1 className=\"title\">Carinderia</h1>\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "export default function App() {\n  const names = [\"Adobo\",\"Pancit\",\"Lumpia\"];\n  return (\n    <main>\n      <h1 className=\"title\">Carinderia</h1>\n      <p>Open 7 AM to 7 PM</p>\n      <ul>{names.map((name) => <li key={name}>{name}</li>)}</ul>\n    </main>\n  );\n}\n"
    },
    "estimatedMinutes": 2,
    "projectId": "setup-carinderia"
  },
  {
    "id": "fs-setup-carinderia-8",
    "index": 88,
    "task": "Run the build command in your terminal. This makes a new version of your app in the dist folder. The checker will check if the title is in the new HTML file. Run the checker and paste its report.\n\nType this command in your terminal:\n`npm run build`",
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
      "README.txt": "Carinderia full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Hello</h1>\n    </main>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "rebuilt",
        "label": "dist/index.html has the new title",
        "kind": "local-file-contains",
        "path": "dist/index.html",
        "value": "<title>Carinderia</title>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Run the build command to update your app's files."
      },
      {
        "level": 2,
        "text": "The checker confirms the new title is in dist/index.html. The command is: `npm run build`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "npm run build"
    },
    "localFiles": {},
    "estimatedMinutes": 3,
    "projectId": "setup-carinderia"
  },
  {
    "id": "fs-setup-carinderia-9",
    "index": 89,
    "task": "Create a new file called Footer.jsx. In it, write a function that returns a footer with the text 'Carinderia, serving since 2026'. This keeps your code organized. The code below does this. Run the checker and paste its report.\n\nIn src/Footer.jsx:\n```\nexport default function Footer() {\n  return <footer>Carinderia, serving since 2026</footer>;\n}\n```",
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
      "README.txt": "Carinderia full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Hello</h1>\n    </main>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "footer",
        "label": "Footer shows its text",
        "kind": "local-react-render",
        "file": "src/Footer.jsx",
        "props": {},
        "contains": "serving since 2026"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Make a new file named Footer.jsx and write the function inside it."
      },
      {
        "level": 2,
        "text": "The function should return a footer tag with the text inside.\n\nIn src/Footer.jsx:\n```\nexport default function Footer() {\n  return <footer>Carinderia, serving since 2026</footer>;\n}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/Footer.jsx": "export default function Footer() {\n  return <footer>Carinderia, serving since 2026</footer>;\n}\n"
    },
    "estimatedMinutes": 4,
    "projectId": "setup-carinderia"
  },
  {
    "id": "fs-setup-carinderia-10",
    "index": 90,
    "task": "Import the Footer component at the top of App.jsx. Then, use it after the list. This adds the footer to your app. The code below does this. Run the checker and paste its report.\n\nIn src/App.jsx:\n```\nimport Footer from \"./Footer.jsx\";\n      <Footer />\n```",
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
      "README.txt": "Carinderia full-stack project.\nRun npm install once, then follow the CodeDaddy steps.\n",
      "src/App.jsx": "export default function App() {\n  return (\n    <main>\n      <h1>Hello</h1>\n    </main>\n  );\n}\n"
    },
    "tests": [
      {
        "id": "used",
        "label": "App shows the footer",
        "kind": "local-react-render",
        "file": "src/App.jsx",
        "props": {},
        "contains": "<footer>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Import Footer from './Footer.jsx' at the top of App.jsx."
      },
      {
        "level": 2,
        "text": "Put the <Footer /> tag right after the list in App.jsx.\n\nIn src/App.jsx:\n```\nimport Footer from \"./Footer.jsx\";\n      <Footer />\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "src/App.jsx": "import Footer from \"./Footer.jsx\";\nexport default function App() {\n  const names = [\"Adobo\",\"Pancit\",\"Lumpia\"];\n  return (\n    <main>\n      <h1 className=\"title\">Carinderia</h1>\n      <p>Open 7 AM to 7 PM</p>\n      <ul>{names.map((name) => <li key={name}>{name}</li>)}</ul>\n      <Footer />\n    </main>\n  );\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "setup-carinderia"
  }
] satisfies typeof fullstackIntegrationCourse.steps));
