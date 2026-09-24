import type { Course } from "@/lib/lesson-ir";

// Runs on the learner's own computer under PLAN.md decisions 43 and 45. Each
// step is checked by the downloadable local checker; a pasted report is
// learner-reported practice only. The code and checks for every project are
// fixed in tools/node-basics-plan.mjs; authoring batches append the steps.
export const nodeBasicsCourse: Course = {
  "id": "node-basics",
  "title": "Node.js Fundamentals",
  "project": "Sari-Sari Store First Scripts",
  "projects": [
    {
      "id": "scripts-sari-sari",
      "title": "Sari-Sari Store First Scripts"
    },
    {
      "id": "modules-sari-sari",
      "title": "Sari-Sari Store Modules"
    },
    {
      "id": "files-sari-sari",
      "title": "Sari-Sari Store Reading and Writing Files"
    },
    {
      "id": "async-sari-sari",
      "title": "Sari-Sari Store Waiting for Work"
    },
    {
      "id": "cli-sari-sari",
      "title": "Sari-Sari Store Command-Line Tools"
    },
    {
      "id": "config-sari-sari",
      "title": "Sari-Sari Store Settings and Secrets"
    },
    {
      "id": "folders-sari-sari",
      "title": "Sari-Sari Store Paths and Folders"
    },
    {
      "id": "scripts-carinderia",
      "title": "Carinderia First Scripts"
    },
    {
      "id": "modules-carinderia",
      "title": "Carinderia Modules"
    },
    {
      "id": "files-carinderia",
      "title": "Carinderia Reading and Writing Files"
    },
    {
      "id": "async-carinderia",
      "title": "Carinderia Waiting for Work"
    },
    {
      "id": "cli-carinderia",
      "title": "Carinderia Command-Line Tools"
    },
    {
      "id": "config-carinderia",
      "title": "Carinderia Settings and Secrets"
    },
    {
      "id": "folders-carinderia",
      "title": "Carinderia Paths and Folders"
    },
    {
      "id": "scripts-barangay",
      "title": "Barangay Office First Scripts"
    },
    {
      "id": "modules-barangay",
      "title": "Barangay Office Modules"
    },
    {
      "id": "files-barangay",
      "title": "Barangay Office Reading and Writing Files"
    },
    {
      "id": "async-barangay",
      "title": "Barangay Office Waiting for Work"
    },
    {
      "id": "cli-barangay",
      "title": "Barangay Office Command-Line Tools"
    },
    {
      "id": "config-barangay",
      "title": "Barangay Office Settings and Secrets"
    },
    {
      "id": "folders-barangay",
      "title": "Barangay Office Paths and Folders"
    },
    {
      "id": "scripts-school-club",
      "title": "School Club First Scripts"
    },
    {
      "id": "modules-school-club",
      "title": "School Club Modules"
    },
    {
      "id": "files-school-club",
      "title": "School Club Reading and Writing Files"
    },
    {
      "id": "async-school-club",
      "title": "School Club Waiting for Work"
    },
    {
      "id": "cli-school-club",
      "title": "School Club Command-Line Tools"
    },
    {
      "id": "config-school-club",
      "title": "School Club Settings and Secrets"
    },
    {
      "id": "folders-school-club",
      "title": "School Club Paths and Folders"
    },
    {
      "id": "scripts-tricycle",
      "title": "Tricycle Terminal First Scripts"
    },
    {
      "id": "modules-tricycle",
      "title": "Tricycle Terminal Modules"
    },
    {
      "id": "files-tricycle",
      "title": "Tricycle Terminal Reading and Writing Files"
    },
    {
      "id": "async-tricycle",
      "title": "Tricycle Terminal Waiting for Work"
    },
    {
      "id": "cli-tricycle",
      "title": "Tricycle Terminal Command-Line Tools"
    },
    {
      "id": "config-tricycle",
      "title": "Tricycle Terminal Settings and Secrets"
    },
    {
      "id": "folders-tricycle",
      "title": "Tricycle Terminal Paths and Folders"
    }
  ],
  "order": 14,
  "summary": "Run JavaScript on your own computer: scripts, modules, files, waiting for work, command-line tools, settings, and folders, all with Node built-ins. Needs a computer with Node.js. Checks run on your computer and are practice only.",
  "requires": [
    "cli-git"
  ],
  "requiresComputer": true,
  "kind": "local",
  "steps": []
};

// Validated local authoring batch: scripts-sari-sari.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-scripts-sari-sari-1",
    "index": 1,
    "task": "The script now says Sari-Sari Store. You change the line in app.js. This is the store's name. The checker runs the script and confirms it prints Sari-Sari Store. Run the checker to check your work.\n\nIn app.js:\n```\nconsole.log(\"Sari-Sari Store\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "node app.js prints Sari-Sari Store",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Sari-Sari Store"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Change the text inside the console.log to match the store's name."
      },
      {
        "level": 2,
        "text": "Type the code below in app.js, then run the checker.\n\nIn app.js:\n```\nconsole.log(\"Sari-Sari Store\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Sari-Sari Store\");\n"
    },
    "conceptIds": [
      "node-runtime"
    ],
    "estimatedMinutes": 3,
    "projectId": "scripts-sari-sari"
  },
  {
    "id": "node-scripts-sari-sari-2",
    "index": 2,
    "task": "You add a constant called item. It holds the product name Rice. You print it after the store name. The checker confirms it prints Rice. Run the checker to check your work.\n\nIn app.js:\n```\nconst item = \"Rice\";\nconsole.log(item);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "item",
        "label": "The script prints Rice on its own line",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Rice\n"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use const to make a constant that won't change."
      },
      {
        "level": 2,
        "text": "Type the code below at the end of app.js, then run the checker.\n\nIn app.js:\n```\nconst item = \"Rice\";\nconsole.log(item);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Sari-Sari Store\");\nconst item = \"Rice\";\nconsole.log(item);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "scripts-sari-sari"
  },
  {
    "id": "node-scripts-sari-sari-3",
    "index": 3,
    "task": "You add a price constant. You change the last console.log to show both the item and its price. The checker confirms it prints Rice 50. Run the checker to check your work.\n\nIn app.js:\n```\nconst price = 50;\nconsole.log(item, price);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "pair",
        "label": "The script prints Rice 50",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Rice 50"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the price constant before the last console.log."
      },
      {
        "level": 2,
        "text": "Type the code below at the end of app.js, then run the checker.\n\nIn app.js:\n```\nconst price = 50;\nconsole.log(item, price);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Sari-Sari Store\");\nconst item = \"Rice\";\nconst price = 50;\nconsole.log(item, price);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "scripts-sari-sari"
  },
  {
    "id": "node-scripts-sari-sari-4",
    "index": 4,
    "task": "You use a template literal to print a full sentence. The sentence says Rice costs 50 pesos. The checker confirms it prints the full sentence. Run the checker to check your work.\n\nIn app.js:\n```\nconsole.log(`${item} costs ${price} pesos`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "sentence",
        "label": "The script prints Rice costs 50 pesos",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Rice costs 50 pesos"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use backticks and ${} to insert variables into the sentence."
      },
      {
        "level": 2,
        "text": "Type the code below at the end of app.js, then run the checker.\n\nIn app.js:\n```\nconsole.log(`${item} costs ${price} pesos`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Sari-Sari Store\");\nconst item = \"Rice\";\nconst price = 50;\nconsole.log(`${item} costs ${price} pesos`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "scripts-sari-sari"
  },
  {
    "id": "node-scripts-sari-sari-5",
    "index": 5,
    "task": "You add an array called items with three product names. You print how many items there are. The checker confirms it prints Items: 3. Run the checker to check your work.\n\nIn app.js:\n```\nconst items = [\"Rice\", \"Soap\", \"Egg\"];\nconsole.log(`Items: ${items.length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The script prints Items: 3",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Items: 3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use [] to make an array. Use .length to count items."
      },
      {
        "level": 2,
        "text": "Type the code below at the end of app.js, then run the checker.\n\nIn app.js:\n```\nconst items = [\"Rice\", \"Soap\", \"Egg\"];\nconsole.log(`Items: ${items.length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Sari-Sari Store\");\nconst item = \"Rice\";\nconst price = 50;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Rice\", \"Soap\", \"Egg\"];\nconsole.log(`Items: ${items.length}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "scripts-sari-sari"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: scripts-sari-sari.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-scripts-sari-sari-6",
    "index": 6,
    "task": "You will print each product name with a dash before it. Add the code below at the end of app.js. This makes the list look neat for the store owner. Run the checker to confirm the last line is - Egg.\n\nIn app.js:\n```\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "last",
        "label": "The list ends with - Egg",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "- Egg"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of each product as one item in a list. You need to show each one with a dash."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, after the items list.\n\nIn app.js:\n```\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Sari-Sari Store\");\nconst item = \"Rice\";\nconst price = 50;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Rice\", \"Soap\", \"Egg\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "scripts-sari-sari"
  },
  {
    "id": "node-scripts-sari-sari-7",
    "index": 7,
    "task": "You will add up the three prices and print the total. Add the code below at the end of app.js. This helps the store owner know how much to charge. Run the checker to confirm it prints Total: 84.\n\nIn app.js:\n```\nconst total = 50 + 25 + 9;\nconsole.log(`Total: ${total}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "total",
        "label": "The script prints Total: 84",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Total: 84"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the prices together: 50 + 25 + 9. Then print the result."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, after the for loop.\n\nIn app.js:\n```\nconst total = 50 + 25 + 9;\nconsole.log(`Total: ${total}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Sari-Sari Store\");\nconst item = \"Rice\";\nconst price = 50;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Rice\", \"Soap\", \"Egg\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\nconst total = 50 + 25 + 9;\nconsole.log(`Total: ${total}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "scripts-sari-sari"
  },
  {
    "id": "node-scripts-sari-sari-8",
    "index": 8,
    "task": "You will write a function that adds 12% tax to the total. Add the code below at the end of app.js. This helps the store owner know the final price with tax. Run the checker to confirm it prints With tax: 94.\n\nIn app.js:\n```\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "tax",
        "label": "The script prints With tax: 94",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "With tax: 94"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use an arrow function to take the total and multiply it by 1.12. Round it to a whole number."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, after the total line.\n\nIn app.js:\n```\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Sari-Sari Store\");\nconst item = \"Rice\";\nconst price = 50;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Rice\", \"Soap\", \"Egg\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\nconst total = 50 + 25 + 9;\nconsole.log(`Total: ${total}`);\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "scripts-sari-sari"
  },
  {
    "id": "node-scripts-sari-sari-9",
    "index": 9,
    "task": "You will label the order as big or small based on the total. Add the code below at the end of app.js. This helps the store owner know if the order is large or small. Run the checker to confirm it prints Small order.\n\nIn app.js:\n```\nif (total > 100) console.log(\"Big order\");\nelse console.log(\"Small order\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "size",
        "label": "The script prints Small order",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Small order"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the total is more than 100, print 'Big order'. Otherwise, print 'Small order'."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, after the tax line.\n\nIn app.js:\n```\nif (total > 100) console.log(\"Big order\");\nelse console.log(\"Small order\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Sari-Sari Store\");\nconst item = \"Rice\";\nconst price = 50;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Rice\", \"Soap\", \"Egg\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\nconst total = 50 + 25 + 9;\nconsole.log(`Total: ${total}`);\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\nif (total > 100) console.log(\"Big order\");\nelse console.log(\"Small order\");\n"
    },
    "estimatedMinutes": 4,
    "projectId": "scripts-sari-sari"
  },
  {
    "id": "node-scripts-sari-sari-10",
    "index": 10,
    "task": "You will report a warning using the error stream. Add the code below at the end of app.js. This helps the store owner see warnings separately from normal messages. Run the checker to confirm it reports Low stock: Egg as an error message and still finishes normally.\n\nIn app.js:\n```\nconsole.error(\"Low stock: Egg\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "warning",
        "label": "The script reports Low stock: Egg as an error message",
        "kind": "local-node-stderr",
        "file": "app.js",
        "value": "Low stock: Egg"
      },
      {
        "id": "still-runs",
        "label": "The script still finishes normally",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use console.error to write a warning. This keeps it apart from normal output."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, after the if-else block.\n\nIn app.js:\n```\nconsole.error(\"Low stock: Egg\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Sari-Sari Store\");\nconst item = \"Rice\";\nconst price = 50;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Rice\", \"Soap\", \"Egg\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\nconst total = 50 + 25 + 9;\nconsole.log(`Total: ${total}`);\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\nif (total > 100) console.log(\"Big order\");\nelse console.log(\"Small order\");\nconsole.error(\"Low stock: Egg\");\n"
    },
    "conceptIds": [
      "node-stderr"
    ],
    "estimatedMinutes": 4,
    "projectId": "scripts-sari-sari"
  }
] satisfies typeof nodeBasicsCourse.steps));
