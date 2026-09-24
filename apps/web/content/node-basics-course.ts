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

// Validated local authoring batch: modules-sari-sari.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-modules-sari-sari-1",
    "index": 11,
    "task": "Make a new file named prices.js. Write one line inside it. That line tells other files the store's name. The code below does that. Run the checker to see if it works.\n\nIn prices.js:\n```\nexport const storeName = \"Sari-Sari Store\";\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "export",
        "label": "prices.js exports storeName",
        "kind": "local-file-contains",
        "path": "prices.js",
        "value": "export const storeName"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of prices.js as a notebook that holds the store's name. Other files can read from it."
      },
      {
        "level": 2,
        "text": "Put the code in a file called prices.js in your project folder.\n\nIn prices.js:\n```\nexport const storeName = \"Sari-Sari Store\";\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "prices.js": "export const storeName = \"Sari-Sari Store\";\n"
    },
    "conceptIds": [
      "node-export"
    ],
    "estimatedMinutes": 3,
    "projectId": "modules-sari-sari"
  },
  {
    "id": "node-modules-sari-sari-2",
    "index": 12,
    "task": "Open app.js. Add one line at the top to bring in the store name. Add another line at the end to print it. The code below does that. Run the checker to see if it prints the name.\n\nIn app.js:\n```\nimport { storeName } from \"./prices.js\";\nconsole.log(storeName);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "imported",
        "label": "node app.js prints Sari-Sari Store from prices.js",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Sari-Sari Store"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You need to tell app.js to get the store name from prices.js. Use import for that."
      },
      {
        "level": 2,
        "text": "Put the import line at the top of app.js, and the console.log line at the bottom.\n\nIn app.js:\n```\nimport { storeName } from \"./prices.js\";\nconsole.log(storeName);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { storeName } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\n"
    },
    "conceptIds": [
      "node-import"
    ],
    "estimatedMinutes": 4,
    "projectId": "modules-sari-sari"
  },
  {
    "id": "node-modules-sari-sari-3",
    "index": 13,
    "task": "Add a new object called prices to prices.js. It holds the cost of items. Then in app.js, import that object and print the price of Rice. The code below does that. Run the checker to see if it prints 50.\n\nIn prices.js:\n```\nexport const prices = { \"Rice\": 50, \"Soap\": 25, \"Egg\": 9 };\n```\n\nIn app.js:\n```\nimport { storeName, prices } from \"./prices.js\";\nconsole.log(prices[\"Rice\"]);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "price",
        "label": "The script prints 50 on its own line",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "50\n"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The prices object holds the cost of items like Rice and Soap. You need to add it to prices.js."
      },
      {
        "level": 2,
        "text": "In app.js, after importing storeName, add prices to the import list, then print prices[\"Rice\"].\n\nIn prices.js:\n```\nexport const prices = { \"Rice\": 50, \"Soap\": 25, \"Egg\": 9 };\n```\n\nIn app.js:\n```\nimport { storeName, prices } from \"./prices.js\";\nconsole.log(prices[\"Rice\"]);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "prices.js": "export const storeName = \"Sari-Sari Store\";\nexport const prices = { \"Rice\": 50, \"Soap\": 25, \"Egg\": 9 };\n",
      "app.js": "import { storeName, prices } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Rice\"]);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "modules-sari-sari"
  },
  {
    "id": "node-modules-sari-sari-4",
    "index": 14,
    "task": "Add a new function called priceOf to prices.js. It takes an item name and returns its price. If the item is not found, it returns 0. The code below does that. Run the checker to see if it confirms the function is exported.\n\nIn prices.js:\n```\nexport function priceOf(name) {\n  return prices[name] ?? 0;\n}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "function",
        "label": "prices.js exports priceOf",
        "kind": "local-file-contains",
        "path": "prices.js",
        "value": "export function priceOf(name)"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The function priceOf looks up a price in the prices object. If the item doesn't exist, it returns 0."
      },
      {
        "level": 2,
        "text": "Put the function at the end of prices.js, after the prices object.\n\nIn prices.js:\n```\nexport function priceOf(name) {\n  return prices[name] ?? 0;\n}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "prices.js": "export const storeName = \"Sari-Sari Store\";\nexport const prices = { \"Rice\": 50, \"Soap\": 25, \"Egg\": 9 };\nexport function priceOf(name) {\n  return prices[name] ?? 0;\n}\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-sari-sari"
  },
  {
    "id": "node-modules-sari-sari-5",
    "index": 15,
    "task": "In app.js, import the new function priceOf. Then print the price of Soap using that function. The code below does that. Run the checker to see if it prints Soap: 25.\n\nIn app.js:\n```\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(`Soap: ${priceOf(\"Soap\")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "lookup",
        "label": "The script prints Soap: 25",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Soap: 25"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You need to add priceOf to the import list in app.js. Then use it to print the price of Soap."
      },
      {
        "level": 2,
        "text": "Put the import line at the top of app.js, and the console.log line at the end.\n\nIn app.js:\n```\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(`Soap: ${priceOf(\"Soap\")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Rice\"]);\nconsole.log(`Soap: ${priceOf(\"Soap\")}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-sari-sari"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: modules-sari-sari.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-modules-sari-sari-6",
    "index": 16,
    "task": "You will add a default export to prices.js. This lets other files use it without curly braces. The code below is what you type. Run the checker after you type it.\n\nIn prices.js:\n```\nexport default function formatPeso(amount) {\n  return `PHP ${amount.toFixed(2)}`;\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "default",
        "label": "prices.js has a default export",
        "kind": "local-file-contains",
        "path": "prices.js",
        "value": "export default function formatPeso"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The function formatPeso turns a number into PHP with two decimal places."
      },
      {
        "level": 2,
        "text": "Put the code at the end of prices.js, after the existing exports.\n\nIn prices.js:\n```\nexport default function formatPeso(amount) {\n  return `PHP ${amount.toFixed(2)}`;\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "prices.js": "export const storeName = \"Sari-Sari Store\";\nexport const prices = { \"Rice\": 50, \"Soap\": 25, \"Egg\": 9 };\nexport function priceOf(name) {\n  return prices[name] ?? 0;\n}\nexport default function formatPeso(amount) {\n  return `PHP ${amount.toFixed(2)}`;\n}\n"
    },
    "conceptIds": [
      "node-default-export"
    ],
    "estimatedMinutes": 3,
    "projectId": "modules-sari-sari"
  },
  {
    "id": "node-modules-sari-sari-7",
    "index": 17,
    "task": "You will import the default export in app.js. This lets you use the function without braces. The code below is what you type. Run the checker after you type it.\n\nIn app.js:\n```\nimport formatPeso from \"./prices.js\";\nconsole.log(formatPeso(50));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "peso",
        "label": "The script prints PHP 50.00",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "PHP 50.00"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The import line brings the function into app.js so you can use it."
      },
      {
        "level": 2,
        "text": "Put the import at the top of app.js, then add the console.log line at the end.\n\nIn app.js:\n```\nimport formatPeso from \"./prices.js\";\nconsole.log(formatPeso(50));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import formatPeso from \"./prices.js\";\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Rice\"]);\nconsole.log(`Soap: ${priceOf(\"Soap\")}`);\nconsole.log(formatPeso(50));\n"
    },
    "estimatedMinutes": 3,
    "projectId": "modules-sari-sari"
  },
  {
    "id": "node-modules-sari-sari-8",
    "index": 18,
    "task": "You will import from Node's built-in os module. This gives you info about your computer. The code below is what you type. Run the checker after you type it.\n\nIn app.js:\n```\nimport { platform } from \"node:os\";\nconsole.log(`Running on ${platform()}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "os",
        "label": "The script prints Running on and your system name",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Running on "
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The platform() function tells you what operating system you're using."
      },
      {
        "level": 2,
        "text": "Put the import at the top of app.js, then add the console.log line at the end.\n\nIn app.js:\n```\nimport { platform } from \"node:os\";\nconsole.log(`Running on ${platform()}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { platform } from \"node:os\";\nimport formatPeso from \"./prices.js\";\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Rice\"]);\nconsole.log(`Soap: ${priceOf(\"Soap\")}`);\nconsole.log(formatPeso(50));\nconsole.log(`Running on ${platform()}`);\n"
    },
    "conceptIds": [
      "node-builtin-module"
    ],
    "estimatedMinutes": 4,
    "projectId": "modules-sari-sari"
  },
  {
    "id": "node-modules-sari-sari-9",
    "index": 19,
    "task": "You will add a start script to package.json. This lets you run the app with npm run start. The code below is what you type. Run the checker after you type it.\n\nIn package.json:\n```\n  \"type\": \"module\",\n  \"scripts\": { \"start\": \"node app.js\" }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "script",
        "label": "package.json has a start script",
        "kind": "local-file-contains",
        "path": "package.json",
        "value": "\"start\": \"node app.js\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The scripts entry in package.json lets npm run commands like start."
      },
      {
        "level": 2,
        "text": "Add the scripts entry under type: \"module\" in package.json.\n\nIn package.json:\n```\n  \"type\": \"module\",\n  \"scripts\": { \"start\": \"node app.js\" }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "package.json": "{\n  \"type\": \"module\",\n  \"scripts\": { \"start\": \"node app.js\" }\n}\n"
    },
    "conceptIds": [
      "npm-script"
    ],
    "estimatedMinutes": 4,
    "projectId": "modules-sari-sari"
  },
  {
    "id": "node-modules-sari-sari-10",
    "index": 20,
    "task": "You will import priceOf under a new name, lookup. This lets you use it without changing the original name. The code below is what you type. Run the checker after you type it.\n\nIn app.js:\n```\nimport { priceOf as lookup } from \"./prices.js\";\nconsole.log(`Last item: ${lookup(\"Egg\")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "alias",
        "label": "The script prints Last item: 9",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Last item: 9"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The as keyword lets you rename the imported value inside your file."
      },
      {
        "level": 2,
        "text": "Put the import at the top of app.js, then add the console.log line at the end.\n\nIn app.js:\n```\nimport { priceOf as lookup } from \"./prices.js\";\nconsole.log(`Last item: ${lookup(\"Egg\")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { priceOf as lookup } from \"./prices.js\";\nimport { platform } from \"node:os\";\nimport formatPeso from \"./prices.js\";\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Rice\"]);\nconsole.log(`Soap: ${priceOf(\"Soap\")}`);\nconsole.log(formatPeso(50));\nconsole.log(`Running on ${platform()}`);\nconsole.log(`Last item: ${lookup(\"Egg\")}`);\n"
    },
    "conceptIds": [
      "node-import-alias"
    ],
    "estimatedMinutes": 4,
    "projectId": "modules-sari-sari"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: files-sari-sari.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-files-sari-sari-1",
    "index": 21,
    "task": "You will read the stock file. The code below reads the file and prints its text. Replace the console.log line in app.js with the two lines. This lets you see what's in the file. Then run the checker to confirm.\n\nIn app.js:\n```\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Rice,50\nSoap,25\nEgg,9\n"
    },
    "tests": [
      {
        "id": "text",
        "label": "The script prints the line Rice,50 from stock.txt",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Rice,50"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of readFile as opening a file to read its contents."
      },
      {
        "level": 2,
        "text": "Put the two lines right after the import line in app.js.\n\nIn app.js:\n```\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\n"
    },
    "conceptIds": [
      "node-read-file"
    ],
    "estimatedMinutes": 4,
    "projectId": "files-sari-sari"
  },
  {
    "id": "node-files-sari-sari-2",
    "index": 22,
    "task": "You will split the text into lines. The code below splits the text and counts how many lines there are. Add these two lines at the end of app.js. This helps you count the items. Then run the checker to confirm.\n\nIn app.js:\n```\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Rice,50\nSoap,25\nEgg,9\n"
    },
    "tests": [
      {
        "id": "lines",
        "label": "The script prints Lines: 3",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Lines: 3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use split to cut the text into pieces at each line break."
      },
      {
        "level": 2,
        "text": "Put the two lines at the end of app.js, after the previous code.\n\nIn app.js:\n```\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\n"
    },
    "conceptIds": [
      "node-split-lines"
    ],
    "estimatedMinutes": 3,
    "projectId": "files-sari-sari"
  },
  {
    "id": "node-files-sari-sari-3",
    "index": 23,
    "task": "You will split each line into parts. The code below splits each line at the comma and prints the second item's name. Add these two lines at the end of app.js. This helps you find the item name. Then run the checker to confirm.\n\nIn app.js:\n```\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Rice,50\nSoap,25\nEgg,9\n"
    },
    "tests": [
      {
        "id": "second",
        "label": "The script prints Second item: Soap",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Second item: Soap"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use map to process each line, then split each line by the comma."
      },
      {
        "level": 2,
        "text": "Put the two lines at the end of app.js, after the previous code.\n\nIn app.js:\n```\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "files-sari-sari"
  },
  {
    "id": "node-files-sari-sari-4",
    "index": 24,
    "task": "You will turn each row into an object. The code below turns each row into an object with a name and price, then finds the cheapest price. Add these two lines at the end of app.js. This helps you find the lowest price. Then run the checker to confirm.\n\nIn app.js:\n```\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Rice,50\nSoap,25\nEgg,9\n"
    },
    "tests": [
      {
        "id": "cheapest",
        "label": "The script prints Cheapest: 9",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Cheapest: 9"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use map to make each row into an object with name and price."
      },
      {
        "level": 2,
        "text": "Put the two lines at the end of app.js, after the previous code.\n\nIn app.js:\n```\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "files-sari-sari"
  },
  {
    "id": "node-files-sari-sari-5",
    "index": 25,
    "task": "You will write a report file. The code below adds writeFile to the import and writes a short report to report.txt. Add these two lines at the end of app.js. Then run node app.js to save the report. The checker confirms the file was written correctly.\n\nIn app.js:\n```\nimport { readFile, writeFile } from \"node:fs/promises\";\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Rice,50\nSoap,25\nEgg,9\n"
    },
    "tests": [
      {
        "id": "report",
        "label": "report.txt says Items: 3",
        "kind": "local-file-contains",
        "path": "report.txt",
        "value": "Items: 3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add writeFile to the import line at the top of app.js."
      },
      {
        "level": 2,
        "text": "Put the one line at the end of app.js, after the previous code.\n\nIn app.js:\n```\nimport { readFile, writeFile } from \"node:fs/promises\";\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\n"
    },
    "conceptIds": [
      "node-write-file"
    ],
    "estimatedMinutes": 5,
    "projectId": "files-sari-sari"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: files-sari-sari.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-files-sari-sari-6",
    "index": 26,
    "task": "You will save the item objects as a JSON file. Add one line at the end of app.js. This line writes the items to stock.json. You run node app.js to test it. The checker confirms stock.json holds Rice as JSON. JSON.stringify turns objects into text you can save, and JSON.parse turns that text back into objects.\n\nIn app.js:\n```\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Rice,50\nSoap,25\nEgg,9\n"
    },
    "tests": [
      {
        "id": "json",
        "label": "stock.json holds Rice as JSON",
        "kind": "local-file-contains",
        "path": "stock.json",
        "value": "\"name\": \"Rice\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of JSON as a way to store data as text, not code."
      },
      {
        "level": 2,
        "text": "Add the line at the end of app.js, after the items array.\n\nIn app.js:\n```\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\n"
    },
    "conceptIds": [
      "node-json-file"
    ],
    "estimatedMinutes": 4,
    "projectId": "files-sari-sari"
  },
  {
    "id": "node-files-sari-sari-7",
    "index": 27,
    "task": "You will read the JSON file back into objects and print how many were saved. Add two lines at the end of app.js. The first line reads the file and turns it into objects. The second line prints how many items were saved. The checker confirms the script prints Saved: 3 items.\n\nIn app.js:\n```\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Rice,50\nSoap,25\nEgg,9\n"
    },
    "tests": [
      {
        "id": "saved",
        "label": "The script prints Saved: 3 items",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Saved: 3 items"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Read the file, then count the objects in it."
      },
      {
        "level": 2,
        "text": "Add these two lines at the end of app.js, after the writeFile line.\n\nIn app.js:\n```\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "files-sari-sari"
  },
  {
    "id": "node-files-sari-sari-8",
    "index": 28,
    "task": "You will add a line to the end of report.txt without replacing it. Add appendFile to the import section. Then add one line at the end to append the text. Run node app.js. The checker confirms report.txt ends with Checked today, but still says Items: 3. appendFile adds text to the end of a file and keeps what is already there.\n\nIn app.js:\n```\nimport { readFile, writeFile, appendFile } from \"node:fs/promises\";\nawait appendFile(\"report.txt\", \"Checked today\\n\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Rice,50\nSoap,25\nEgg,9\n"
    },
    "tests": [
      {
        "id": "appended",
        "label": "report.txt ends with Checked today",
        "kind": "local-file-contains",
        "path": "report.txt",
        "value": "Checked today"
      },
      {
        "id": "kept",
        "label": "report.txt still says Items: 3",
        "kind": "local-file-contains",
        "path": "report.txt",
        "value": "Items: 3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use appendFile to add text without deleting what's already there."
      },
      {
        "level": 2,
        "text": "Add the import line at the top, then the append line at the end.\n\nIn app.js:\n```\nimport { readFile, writeFile, appendFile } from \"node:fs/promises\";\nawait appendFile(\"report.txt\", \"Checked today\\n\");\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile, appendFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\nawait appendFile(\"report.txt\", \"Checked today\\n\");\n"
    },
    "conceptIds": [
      "node-append-file"
    ],
    "estimatedMinutes": 5,
    "projectId": "files-sari-sari"
  },
  {
    "id": "node-files-sari-sari-9",
    "index": 29,
    "task": "You will raise the first saved price by 7 and write the JSON file again. Add two lines at the end of app.js. The first line adds 7 to the price of the first item. The second line writes the updated items to stock.json. Run node app.js. The checker confirms stock.json now has Rice at 57.\n\nIn app.js:\n```\nsaved[0].price += 7;\nawait writeFile(\"stock.json\", JSON.stringify(saved, null, 2));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Rice,50\nSoap,25\nEgg,9\n"
    },
    "tests": [
      {
        "id": "raised",
        "label": "stock.json now has Rice at 57",
        "kind": "local-file-contains",
        "path": "stock.json",
        "value": "\"price\": 57"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Change the price of the first item in the saved array."
      },
      {
        "level": 2,
        "text": "Add these two lines at the end, after the read line.\n\nIn app.js:\n```\nsaved[0].price += 7;\nawait writeFile(\"stock.json\", JSON.stringify(saved, null, 2));\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile, appendFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\nawait appendFile(\"report.txt\", \"Checked today\\n\");\nsaved[0].price += 7;\nawait writeFile(\"stock.json\", JSON.stringify(saved, null, 2));\n"
    },
    "estimatedMinutes": 4,
    "projectId": "files-sari-sari"
  },
  {
    "id": "node-files-sari-sari-10",
    "index": 30,
    "task": "You will read a file that does not exist and report the error code instead of crashing. Add a try and catch block at the end of app.js. The try block tries to read missing.txt. The catch block prints the error code. The checker confirms the script reports Could not read: ENOENT, and still finishes normally. A Node error carries a short code, such as ENOENT for a file that does not exist, so you can react to it.\n\nIn app.js:\n```\ntry { await readFile(\"missing.txt\", \"utf8\"); }\ncatch (error) { console.error(`Could not read: ${error.code}`); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Rice,50\nSoap,25\nEgg,9\n"
    },
    "tests": [
      {
        "id": "code",
        "label": "The script reports Could not read: ENOENT",
        "kind": "local-node-stderr",
        "file": "app.js",
        "value": "Could not read: ENOENT"
      },
      {
        "id": "finishes",
        "label": "The script still finishes normally",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Wrap the readFile in a try-catch to handle errors safely."
      },
      {
        "level": 2,
        "text": "Add the try-catch block at the end of app.js, after the other lines.\n\nIn app.js:\n```\ntry { await readFile(\"missing.txt\", \"utf8\"); }\ncatch (error) { console.error(`Could not read: ${error.code}`); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile, appendFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\nawait appendFile(\"report.txt\", \"Checked today\\n\");\nsaved[0].price += 7;\nawait writeFile(\"stock.json\", JSON.stringify(saved, null, 2));\ntry { await readFile(\"missing.txt\", \"utf8\"); }\ncatch (error) { console.error(`Could not read: ${error.code}`); }\n"
    },
    "conceptIds": [
      "node-error-code"
    ],
    "estimatedMinutes": 5,
    "projectId": "files-sari-sari"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: async-sari-sari.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-async-sari-sari-1",
    "index": 31,
    "task": "You will add two lines to app.js. The first line pauses the script for 100 milliseconds. The second line prints 'After wait'. This lets you see that the script waits before printing the next message. The code below does this. Run the checker to confirm.\n\nIn app.js:\n```\nawait wait(100);\nconsole.log(\"After wait\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "after",
        "label": "The script prints Start and then After wait",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Start\nAfter wait"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of await as a pause button that stops the script until something finishes."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nawait wait(100);\nconsole.log(\"After wait\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\n"
    },
    "conceptIds": [
      "node-top-level-await"
    ],
    "estimatedMinutes": 3,
    "projectId": "async-sari-sari"
  },
  {
    "id": "node-async-sari-sari-2",
    "index": 32,
    "task": "You will add two lines to app.js. The first line defines a function called fetchPrice that takes a name and returns a price after waiting 20 milliseconds. The second line calls this function with 'Rice' and prints the result. The code below does this. Run the checker to confirm.\n\nIn app.js:\n```\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Rice\")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "price",
        "label": "The script prints Price: 40",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Price: 40"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The function fetchPrice uses await to wait before returning a price."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Rice\")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Rice\")}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "async-sari-sari"
  },
  {
    "id": "node-async-sari-sari-3",
    "index": 33,
    "task": "You will add two lines to app.js. The first line uses Promise.all to start three lookups at once for 'Rice', 'Soap', and 'Egg'. The second line prints all the results joined by commas. The code below does this. Run the checker to confirm.\n\nIn app.js:\n```\nconst prices = await Promise.all([\"Rice\", \"Soap\", \"Egg\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "all",
        "label": "The script prints All: 40, 40, 30",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "All: 40, 40, 30"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Promise.all starts all the promises at once and waits for all of them to finish."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst prices = await Promise.all([\"Rice\", \"Soap\", \"Egg\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Rice\")}`);\nconst prices = await Promise.all([\"Rice\", \"Soap\", \"Egg\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "async-sari-sari"
  },
  {
    "id": "node-async-sari-sari-4",
    "index": 34,
    "task": "You will add three lines to app.js. The first line creates a slow promise that waits 200 milliseconds. The second line creates a fast promise that waits 20 milliseconds. The third line uses Promise.race to print which one finished first. The code below does this. Run the checker to confirm.\n\nIn app.js:\n```\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "race",
        "label": "The script prints First: fast",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "First: fast"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Promise.race checks which promise finishes first and returns its result."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Rice\")}`);\nconst prices = await Promise.all([\"Rice\", \"Soap\", \"Egg\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\n"
    },
    "conceptIds": [
      "node-promise-race"
    ],
    "estimatedMinutes": 4,
    "projectId": "async-sari-sari"
  },
  {
    "id": "node-async-sari-sari-5",
    "index": 35,
    "task": "You will add two lines to app.js. The first line defines a function called failing that throws an error. The second line uses try and catch to catch the error and print its message. The code below does this. Run the checker to confirm.\n\nIn app.js:\n```\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "caught",
        "label": "The script reports Supplier offline",
        "kind": "local-node-stderr",
        "file": "app.js",
        "value": "Supplier offline"
      },
      {
        "id": "finishes",
        "label": "The script still finishes normally",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use try and catch to handle errors from rejected promises."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Rice\")}`);\nconst prices = await Promise.all([\"Rice\", \"Soap\", \"Egg\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\n"
    },
    "conceptIds": [
      "node-rejected-promise"
    ],
    "estimatedMinutes": 4,
    "projectId": "async-sari-sari"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: async-sari-sari.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-async-sari-sari-6",
    "index": 36,
    "task": "Add two lines at the end of app.js. The code below waits for both promises. One works, one fails. It prints their statuses. Run the checker to confirm.\n\nIn app.js:\n```\nconst results = await Promise.allSettled([fetchPrice(\"Rice\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "settled",
        "label": "The script prints Settled: fulfilled rejected",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Settled: fulfilled rejected"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Promise.allSettled waits for all promises, even if one fails. It tells you which succeeded and which didn't."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst results = await Promise.allSettled([fetchPrice(\"Rice\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Rice\")}`);\nconst prices = await Promise.all([\"Rice\", \"Soap\", \"Egg\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Rice\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\n"
    },
    "conceptIds": [
      "node-all-settled"
    ],
    "estimatedMinutes": 4,
    "projectId": "async-sari-sari"
  },
  {
    "id": "node-async-sari-sari-7",
    "index": 37,
    "task": "Add a three-line loop at the end of app.js. The code below checks two items one after the other. It prints each price. Run the checker to confirm.\n\nIn app.js:\n```\nfor (const name of [\"Rice\", \"Soap\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "loop",
        "label": "The script prints Checked Soap: 40",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Checked Soap: 40"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use for...of to repeat the check for each item in the list. The loop runs until all items are checked."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nfor (const name of [\"Rice\", \"Soap\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Rice\")}`);\nconst prices = await Promise.all([\"Rice\", \"Soap\", \"Egg\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Rice\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\nfor (const name of [\"Rice\", \"Soap\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "async-sari-sari"
  },
  {
    "id": "node-async-sari-sari-8",
    "index": 38,
    "task": "Add one line at the end of app.js. The code below runs a cleanup message after the wait, whether it succeeds or fails. Run the checker to confirm.\n\nIn app.js:\n```\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "cleanup",
        "label": "The script prints Cleanup done",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Cleanup done"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "finally runs no matter what. Use it to clean up after any promise, even if it fails."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Rice\")}`);\nconst prices = await Promise.all([\"Rice\", \"Soap\", \"Egg\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Rice\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\nfor (const name of [\"Rice\", \"Soap\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\n"
    },
    "conceptIds": [
      "node-finally"
    ],
    "estimatedMinutes": 3,
    "projectId": "async-sari-sari"
  },
  {
    "id": "node-async-sari-sari-9",
    "index": 39,
    "task": "Add two lines at the end of app.js. The code below repeats a small task every 10 milliseconds. It stops after three ticks. Run the checker to confirm.\n\nIn app.js:\n```\nlet ticks = 0;\nconst timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log(\"Ticks: 3\"); } }, 10);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "ticks",
        "label": "The script prints Ticks: 3",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Ticks: 3"
      },
      {
        "id": "stops",
        "label": "The script stops on its own",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "setInterval repeats a function every 10 milliseconds. Use clearInterval to stop it after three ticks."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nlet ticks = 0;\nconst timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log(\"Ticks: 3\"); } }, 10);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Rice\")}`);\nconst prices = await Promise.all([\"Rice\", \"Soap\", \"Egg\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Rice\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\nfor (const name of [\"Rice\", \"Soap\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\nlet ticks = 0;\nconst timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log(\"Ticks: 3\"); } }, 10);\n"
    },
    "conceptIds": [
      "node-interval"
    ],
    "estimatedMinutes": 4,
    "projectId": "async-sari-sari"
  },
  {
    "id": "node-async-sari-sari-10",
    "index": 40,
    "task": "Add two lines at the end of app.js. The code below runs a timer with zero delay. It prints after the sync code. Run the checker to confirm.\n\nIn app.js:\n```\nsetTimeout(() => console.log(\"Timer done\"), 0);\nconsole.log(\"Sync done\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "order",
        "label": "Sync done prints before Timer done",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Sync done\nTimer done"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "setTimeout with 0 means the timer runs right after the current code, even if it's not waiting. The event loop handles it."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nsetTimeout(() => console.log(\"Timer done\"), 0);\nconsole.log(\"Sync done\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Rice\")}`);\nconst prices = await Promise.all([\"Rice\", \"Soap\", \"Egg\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Rice\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\nfor (const name of [\"Rice\", \"Soap\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\nlet ticks = 0;\nconst timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log(\"Ticks: 3\"); } }, 10);\nsetTimeout(() => console.log(\"Timer done\"), 0);\nconsole.log(\"Sync done\");\n"
    },
    "conceptIds": [
      "node-event-loop"
    ],
    "estimatedMinutes": 3,
    "projectId": "async-sari-sari"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: cli-sari-sari.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-cli-sari-sari-1",
    "index": 41,
    "task": "You will add one line to the end of app.js. This line prints how many words you typed after node app.js. The checker runs node app.js Rice 2 to test it. You must run the checker after you add the line. The checker will say if it worked.\n\nIn app.js:\n```\nconsole.log(`You typed ${args.length} words`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "words",
        "label": "node app.js Rice 2 prints You typed 2 words",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Rice",
          "2"
        ],
        "value": "You typed 2 words"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of process.argv as a list of all the words you type after node app.js."
      },
      {
        "level": 2,
        "text": "Add the line at the very end of app.js, after the existing code.\n\nIn app.js:\n```\nconsole.log(`You typed ${args.length} words`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\n"
    },
    "conceptIds": [
      "node-argv"
    ],
    "estimatedMinutes": 3,
    "projectId": "cli-sari-sari"
  },
  {
    "id": "node-cli-sari-sari-2",
    "index": 42,
    "task": "You will add two lines to the end of app.js. The first line takes the first two words and splits them into name and quantity. The second line prints the name. The checker runs node app.js Rice 2 to test it. You must run the checker after you add the lines. The checker will say if it worked.\n\nIn app.js:\n```\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "item",
        "label": "node app.js Rice 2 prints Item: Rice",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Rice",
          "2"
        ],
        "value": "Item: Rice"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the array destructuring syntax to split the words into name and quantity."
      },
      {
        "level": 2,
        "text": "Add these lines right after the line you added in step 1.\n\nIn app.js:\n```\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "cli-sari-sari"
  },
  {
    "id": "node-cli-sari-sari-3",
    "index": 43,
    "task": "You will add two lines to the end of app.js. The first line turns the quantity text into a number. The second line prints that number. The checker runs node app.js Rice 2 to test it. You must run the checker after you add the lines. The checker will say if it worked.\n\nIn app.js:\n```\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "quantity",
        "label": "node app.js Rice 2 prints Quantity: 2",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Rice",
          "2"
        ],
        "value": "Quantity: 2"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use Number() to turn the text into a number."
      },
      {
        "level": 2,
        "text": "Add these lines right after the lines you added in step 2.\n\nIn app.js:\n```\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "cli-sari-sari"
  },
  {
    "id": "node-cli-sari-sari-4",
    "index": 44,
    "task": "You will add two lines to the end of app.js. The first line sets up a prices object with item names and their prices. The second line calculates and prints the total cost. The checker runs node app.js Rice 2 to test it. You must run the checker after you add the lines. The checker will say if it worked.\n\nIn app.js:\n```\nconst prices = { \"Rice\": 50, \"Soap\": 25, \"Egg\": 9 };\nconsole.log(`Total: ${prices[name] * count}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "total",
        "label": "node app.js Rice 2 prints Total: 100",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Rice",
          "2"
        ],
        "value": "Total: 100"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The prices object holds the price for each item, like Rice: 50."
      },
      {
        "level": 2,
        "text": "Add these lines right after the lines you added in step 3.\n\nIn app.js:\n```\nconst prices = { \"Rice\": 50, \"Soap\": 25, \"Egg\": 9 };\nconsole.log(`Total: ${prices[name] * count}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Rice\": 50, \"Soap\": 25, \"Egg\": 9 };\nconsole.log(`Total: ${prices[name] * count}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-sari-sari"
  },
  {
    "id": "node-cli-sari-sari-5",
    "index": 45,
    "task": "You will add one line to app.js. This line checks if the name is empty. If it is, it prints a message and stops the program with exit code 1. The checker tests this by running node app.js with no words. You must run the checker after you add the line. The checker will say if it worked.\n\nIn app.js:\n```\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "exit",
        "label": "node app.js with no words ends with exit code 1",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 1
      },
      {
        "id": "usage",
        "label": "It explains how to use the tool",
        "kind": "local-node-stderr",
        "file": "app.js",
        "value": "Usage: node app.js <item> <quantity>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If name is empty, the program should stop and show a message."
      },
      {
        "level": 2,
        "text": "Add this line right after the line that sets name and quantity.\n\nIn app.js:\n```\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Rice\": 50, \"Soap\": 25, \"Egg\": 9 };\nconsole.log(`Total: ${prices[name] * count}`);\n"
    },
    "conceptIds": [
      "node-exit-code"
    ],
    "estimatedMinutes": 4,
    "projectId": "cli-sari-sari"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: cli-sari-sari.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-cli-sari-sari-6",
    "index": 46,
    "task": "Add one line before the last console.log. This line stops the program when the item is not in the price list. The code below stops the program with exit code 2. Run the checker to confirm it works for 'Milk'.\n\nIn app.js:\n```\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "exit",
        "label": "node app.js Milk 1 ends with exit code 2",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "args": [
          "Milk",
          "1"
        ],
        "code": 2
      },
      {
        "id": "message",
        "label": "It reports Unknown item: Milk",
        "kind": "local-node-stderr",
        "file": "app.js",
        "args": [
          "Milk",
          "1"
        ],
        "value": "Unknown item: Milk"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the item is not in the prices list, stop the program with an error message."
      },
      {
        "level": 2,
        "text": "Put the code right before the final console.log line.\n\nIn app.js:\n```\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Rice\": 50, \"Soap\": 25, \"Egg\": 9 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconsole.log(`Total: ${prices[name] * count}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "cli-sari-sari"
  },
  {
    "id": "node-cli-sari-sari-7",
    "index": 47,
    "task": "Add one line after the line that sets count. This line stops the program if the quantity is not a whole number. The code below stops the program with exit code 3. Run the checker to confirm it works for 'abc' but not for '2'.\n\nIn app.js:\n```\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "exit",
        "label": "node app.js Rice abc ends with exit code 3",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "args": [
          "Rice",
          "abc"
        ],
        "code": 3
      },
      {
        "id": "fine",
        "label": "node app.js Rice 2 still works",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "args": [
          "Rice",
          "2"
        ],
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Check if the quantity is a whole number and greater than zero. If not, stop the program."
      },
      {
        "level": 2,
        "text": "Put the code right after the line that sets the count variable.\n\nIn app.js:\n```\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Rice\": 50, \"Soap\": 25, \"Egg\": 9 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconsole.log(`Total: ${prices[name] * count}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-sari-sari"
  },
  {
    "id": "node-cli-sari-sari-8",
    "index": 48,
    "task": "Add two lines at the end. The first line checks if --receipt is typed. The second line prints 'Receipt: thank you!' only if --receipt is typed. The code below adds this feature. Run the checker to confirm it prints the receipt line when --receipt is typed.\n\nIn app.js:\n```\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "flag",
        "label": "node app.js Rice 2 --receipt prints the receipt line",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Rice",
          "2",
          "--receipt"
        ],
        "value": "Receipt: thank you!"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the args array to check if --receipt is included. Only print the receipt if it is."
      },
      {
        "level": 2,
        "text": "Put the two lines at the very end of the file, after the total line.\n\nIn app.js:\n```\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Rice\": 50, \"Soap\": 25, \"Egg\": 9 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconsole.log(`Total: ${prices[name] * count}`);\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n"
    },
    "conceptIds": [
      "node-cli-flag"
    ],
    "estimatedMinutes": 4,
    "projectId": "cli-sari-sari"
  },
  {
    "id": "node-cli-sari-sari-9",
    "index": 49,
    "task": "Add one line before the total. This line gets the currency from the CURRENCY environment variable or uses 'PHP' by default. Then, change the total line to use this currency. The code below adds this feature. Run the checker to confirm it prints 'USD 100' when CURRENCY=USD.\n\nIn app.js:\n```\nconst currency = process.env.CURRENCY ?? \"PHP\";\nconsole.log(`Total: ${currency} ${prices[name] * count}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "currency",
        "label": "With CURRENCY=USD it prints Total: USD 100",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Rice",
          "2"
        ],
        "env": {
          "CURRENCY": "USD"
        },
        "value": "Total: USD 100"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use process.env.CURRENCY to get the currency. If not set, use 'PHP'."
      },
      {
        "level": 2,
        "text": "Replace the total line with the new format that includes the currency.\n\nIn app.js:\n```\nconst currency = process.env.CURRENCY ?? \"PHP\";\nconsole.log(`Total: ${currency} ${prices[name] * count}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Rice\": 50, \"Soap\": 25, \"Egg\": 9 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconst currency = process.env.CURRENCY ?? \"PHP\";\nconsole.log(`Total: ${currency} ${prices[name] * count}`);\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n"
    },
    "estimatedMinutes": 5,
    "projectId": "cli-sari-sari"
  },
  {
    "id": "node-cli-sari-sari-10",
    "index": 50,
    "task": "Add one line right after the first line. This line checks if --help is typed. If so, it prints the usage message and stops the program with exit code 0. The code below adds this feature. Run the checker to confirm it prints the usage and ends with exit code 0.\n\nIn app.js:\n```\nif (args[0] === \"--help\") { console.log(\"Usage: node app.js <item> <quantity> [--receipt]\"); process.exit(0); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "help",
        "label": "node app.js --help prints the usage",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "--help"
        ],
        "value": "[--receipt]"
      },
      {
        "id": "exit",
        "label": "node app.js --help ends with exit code 0",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "args": [
          "--help"
        ],
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Check if the first argument is --help. If yes, print the usage and stop."
      },
      {
        "level": 2,
        "text": "Put the code right after the first line of the file, before any other logic.\n\nIn app.js:\n```\nif (args[0] === \"--help\") { console.log(\"Usage: node app.js <item> <quantity> [--receipt]\"); process.exit(0); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nif (args[0] === \"--help\") { console.log(\"Usage: node app.js <item> <quantity> [--receipt]\"); process.exit(0); }\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Rice\": 50, \"Soap\": 25, \"Egg\": 9 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconst currency = process.env.CURRENCY ?? \"PHP\";\nconsole.log(`Total: ${currency} ${prices[name] * count}`);\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-sari-sari"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: config-sari-sari.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-config-sari-sari-1",
    "index": 51,
    "task": "You will read the PLACE environment variable. This tells the app where the store is. Add these two lines at the end of app.js. The code below reads the variable and prints it. Run the checker to confirm it works with PLACE set to Sari-Sari Store.\n\nIn app.js:\n```\nconst place = process.env.PLACE;\nconsole.log(`Place: ${place}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "place",
        "label": "With PLACE=Sari-Sari Store it prints Place: Sari-Sari Store",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "PLACE": "Sari-Sari Store"
        },
        "value": "Place: Sari-Sari Store"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The code uses process.env to get the setting from outside the file."
      },
      {
        "level": 2,
        "text": "Add the lines at the end of app.js, after the existing code.\n\nIn app.js:\n```\nconst place = process.env.PLACE;\nconsole.log(`Place: ${place}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE;\nconsole.log(`Place: ${place}`);\n"
    },
    "conceptIds": [
      "node-env-var"
    ],
    "estimatedMinutes": 3,
    "projectId": "config-sari-sari"
  },
  {
    "id": "node-config-sari-sari-2",
    "index": 52,
    "task": "Now, if PLACE is not set, the app should say 'Unknown place'. Change the line that reads PLACE to use ?? for a fallback. The code below does that. Run the checker to confirm it prints 'Unknown place' when PLACE is not set.\n\nIn app.js:\n```\nconst place = process.env.PLACE ?? \"Unknown place\";\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "fallback",
        "label": "Without PLACE it prints Place: Unknown place",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Place: Unknown place"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use ?? to give a default value if the setting is missing."
      },
      {
        "level": 2,
        "text": "Replace the old line with the new one at the end of app.js.\n\nIn app.js:\n```\nconst place = process.env.PLACE ?? \"Unknown place\";\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\n"
    },
    "conceptIds": [
      "node-default-value"
    ],
    "estimatedMinutes": 3,
    "projectId": "config-sari-sari"
  },
  {
    "id": "node-config-sari-sari-3",
    "index": 53,
    "task": "You will read LIMIT as a number. The default is 5. Add these two lines at the end of app.js. The code below converts the setting to a number and prints it. Run the checker to confirm it prints 12 when LIMIT is set to 12.\n\nIn app.js:\n```\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "limit",
        "label": "With LIMIT=12 it prints Limit: 12",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "LIMIT": "12"
        },
        "value": "Limit: 12"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use Number() to turn the setting into a number."
      },
      {
        "level": 2,
        "text": "Add the lines at the end of app.js, after the existing code.\n\nIn app.js:\n```\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "config-sari-sari"
  },
  {
    "id": "node-config-sari-sari-4",
    "index": 54,
    "task": "You will turn on debug mode only if DEBUG is set to true. Add these two lines at the end of app.js. The code below checks if DEBUG equals 'true' and prints a message if it does. Run the checker to confirm it prints 'Debug mode on' when DEBUG is true.\n\nIn app.js:\n```\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "debug",
        "label": "With DEBUG=true it prints Debug mode on",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "DEBUG": "true"
        },
        "value": "Debug mode on"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use === to check if DEBUG is exactly 'true'."
      },
      {
        "level": 2,
        "text": "Add the lines at the end of app.js, after the existing code.\n\nIn app.js:\n```\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "config-sari-sari"
  },
  {
    "id": "node-config-sari-sari-5",
    "index": 55,
    "task": "You will collect all settings into one object. Add these two lines at the end of app.js. The code below creates an object with place, limit, and debug, then prints it as JSON. Run the checker to confirm it prints the settings as JSON when PLACE is Hall and LIMIT is 3.\n\nIn app.js:\n```\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "json",
        "label": "With PLACE=Hall and LIMIT=3 it prints the settings as JSON",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "PLACE": "Hall",
          "LIMIT": "3"
        },
        "value": "{\"place\":\"Hall\",\"limit\":3,\"debug\":false}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use { place, limit, debug } to make an object with the settings."
      },
      {
        "level": 2,
        "text": "Add the lines at the end of app.js, after the existing code.\n\nIn app.js:\n```\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\n"
    },
    "estimatedMinutes": 3,
    "projectId": "config-sari-sari"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: config-sari-sari.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-config-sari-sari-6",
    "index": 56,
    "task": "Add one line at the end of app.js. This line checks if the API_KEY secret is missing. If it is, the program stops and shows an error. This is important because the store's API needs this key to work. The code below does this. Run the checker to confirm it stops with exit code 1 when API_KEY is missing.\n\nIn app.js:\n```\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "missing",
        "label": "Without API_KEY it ends with exit code 1",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 1
      },
      {
        "id": "present",
        "label": "With API_KEY it finishes normally",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "env": {
          "API_KEY": "sk12345"
        },
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the key is missing, the program should stop right away with a clear message."
      },
      {
        "level": 2,
        "text": "Add this line at the very end of app.js, after the other code.\n\nIn app.js:\n```\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\n"
    },
    "conceptIds": [
      "node-required-setting"
    ],
    "estimatedMinutes": 3,
    "projectId": "config-sari-sari"
  },
  {
    "id": "node-config-sari-sari-7",
    "index": 57,
    "task": "Add two lines at the end of app.js. The first line gets the secret. The second line prints only the first two characters, then hides the rest with asterisks. This is important because secrets must never be shown in full. The code below does this. Run the checker to confirm it prints Key: sk*** when the key is sk12345.\n\nIn app.js:\n```\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "masked",
        "label": "With API_KEY=sk12345 it prints Key: sk***",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "API_KEY": "sk12345"
        },
        "value": "Key: sk***"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the .slice(0, 2) method to take only the first two characters."
      },
      {
        "level": 2,
        "text": "Add these two lines at the very end of app.js, after the other code.\n\nIn app.js:\n```\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\n"
    },
    "conceptIds": [
      "node-secret"
    ],
    "estimatedMinutes": 4,
    "projectId": "config-sari-sari"
  },
  {
    "id": "node-config-sari-sari-8",
    "index": 58,
    "task": "Add an import at the top and two lines at the end of app.js. The import brings in the file reading tool. The next two lines read config.json and print the currency. This is important because settings like currency can change without changing code. The code below does this. Run the checker to confirm it prints Currency: PHP from config.json.\n\nIn app.js:\n```\nimport { readFile } from \"node:fs/promises\";\nconst fileConfig = JSON.parse(await readFile(\"config.json\", \"utf8\"));\nconsole.log(`Currency: ${fileConfig.currency}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "currency",
        "label": "It prints Currency: PHP from config.json",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "API_KEY": "sk12345"
        },
        "value": "Currency: PHP"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the import statement to get the file reading tool from node:fs/promises."
      },
      {
        "level": 2,
        "text": "Add these lines at the very end of app.js, after the other code.\n\nIn app.js:\n```\nimport { readFile } from \"node:fs/promises\";\nconst fileConfig = JSON.parse(await readFile(\"config.json\", \"utf8\"));\nconsole.log(`Currency: ${fileConfig.currency}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\nconst fileConfig = JSON.parse(await readFile(\"config.json\", \"utf8\"));\nconsole.log(`Currency: ${fileConfig.currency}`);\n"
    },
    "conceptIds": [
      "node-config-file"
    ],
    "estimatedMinutes": 5,
    "projectId": "config-sari-sari"
  },
  {
    "id": "node-config-sari-sari-9",
    "index": 59,
    "task": "Add two lines at the end of app.js. The first line checks if CURRENCY is set in the environment. If yes, it uses that. If not, it uses the value from config.json. This is important because environment settings can override file settings. The code below does this. Run the checker to confirm it prints Using USD when CURRENCY=USD.\n\nIn app.js:\n```\nconst currency = process.env.CURRENCY ?? fileConfig.currency;\nconsole.log(`Using ${currency}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "override",
        "label": "With CURRENCY=USD it prints Using USD",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "API_KEY": "sk12345",
          "CURRENCY": "USD"
        },
        "value": "Using USD"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the ?? operator to pick the environment value if it exists, otherwise use the file value."
      },
      {
        "level": 2,
        "text": "Add these two lines at the very end of app.js, after the other code.\n\nIn app.js:\n```\nconst currency = process.env.CURRENCY ?? fileConfig.currency;\nconsole.log(`Using ${currency}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\nconst fileConfig = JSON.parse(await readFile(\"config.json\", \"utf8\"));\nconsole.log(`Currency: ${fileConfig.currency}`);\nconst currency = process.env.CURRENCY ?? fileConfig.currency;\nconsole.log(`Using ${currency}`);\n"
    },
    "conceptIds": [
      "node-setting-order"
    ],
    "estimatedMinutes": 4,
    "projectId": "config-sari-sari"
  },
  {
    "id": "node-config-sari-sari-10",
    "index": 60,
    "task": "Add two lines at the end of app.js. The first line checks if NODE_ENV is production. If yes, it sets mode to production. If not, it sets mode to development. This is important because the store's system must know if it's running in production or development. The code below does this. Run the checker to confirm it prints Mode: production when NODE_ENV=production.\n\nIn app.js:\n```\nconst mode = process.env.NODE_ENV === \"production\" ? \"production\" : \"development\";\nconsole.log(`Mode: ${mode}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "mode",
        "label": "With NODE_ENV=production it prints Mode: production",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "API_KEY": "sk12345",
          "NODE_ENV": "production"
        },
        "value": "Mode: production"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use a ternary operator to set mode based on the environment variable."
      },
      {
        "level": 2,
        "text": "Add these two lines at the very end of app.js, after the other code.\n\nIn app.js:\n```\nconst mode = process.env.NODE_ENV === \"production\" ? \"production\" : \"development\";\nconsole.log(`Mode: ${mode}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\nconst fileConfig = JSON.parse(await readFile(\"config.json\", \"utf8\"));\nconsole.log(`Currency: ${fileConfig.currency}`);\nconst currency = process.env.CURRENCY ?? fileConfig.currency;\nconsole.log(`Using ${currency}`);\nconst mode = process.env.NODE_ENV === \"production\" ? \"production\" : \"development\";\nconsole.log(`Mode: ${mode}`);\n"
    },
    "conceptIds": [
      "node-env-mode"
    ],
    "estimatedMinutes": 4,
    "projectId": "config-sari-sari"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: folders-sari-sari.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-folders-sari-sari-1",
    "index": 61,
    "task": "You will add two lines to app.js. The first line builds the path to records/a.txt using path.join. This works on any computer. The second line prints the path with forward slashes, which is how you write paths in code. The code below does this. Run the checker and paste its report.\n\nIn app.js:\n```\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Rice 50\n",
      "records/b.txt": "Soap 25\n",
      "records/notes.md": "# Notes\nKeep Sari-Sari Store records here.\n"
    },
    "tests": [
      {
        "id": "joined",
        "label": "The script prints records/a.txt",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "records/a.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "path.join uses the right separator for your computer. You don't need to type it."
      },
      {
        "level": 2,
        "text": "Add the two lines at the end of app.js. The page will show the code after your text.\n\nIn app.js:\n```\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\n"
    },
    "conceptIds": [
      "node-path-join"
    ],
    "estimatedMinutes": 3,
    "projectId": "folders-sari-sari"
  },
  {
    "id": "node-folders-sari-sari-2",
    "index": 62,
    "task": "You will add one line to app.js. This line gets the file's extension using path.extname. The extension is the ending part of the file name, like .txt. The code below does this. Run the checker and paste its report.\n\nIn app.js:\n```\nconsole.log(`Extension: ${path.extname(file)}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Rice 50\n",
      "records/b.txt": "Soap 25\n",
      "records/notes.md": "# Notes\nKeep Sari-Sari Store records here.\n"
    },
    "tests": [
      {
        "id": "ext",
        "label": "The script prints Extension: .txt",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Extension: .txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "path.extname gets the ending of the file name. It's like checking the file's type."
      },
      {
        "level": 2,
        "text": "Add this line at the end of app.js. The page will show the code after your text.\n\nIn app.js:\n```\nconsole.log(`Extension: ${path.extname(file)}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\n"
    },
    "conceptIds": [
      "node-extname"
    ],
    "estimatedMinutes": 2,
    "projectId": "folders-sari-sari"
  },
  {
    "id": "node-folders-sari-sari-3",
    "index": 63,
    "task": "You will add one line to app.js. This line gets the file name without its extension using path.basename. You tell it to remove .txt. The code below does this. Run the checker and paste its report.\n\nIn app.js:\n```\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Rice 50\n",
      "records/b.txt": "Soap 25\n",
      "records/notes.md": "# Notes\nKeep Sari-Sari Store records here.\n"
    },
    "tests": [
      {
        "id": "base",
        "label": "The script prints Base: a",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Base: a"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "path.basename removes the extension. You can tell it which extension to remove."
      },
      {
        "level": 2,
        "text": "Add this line at the end of app.js. The page will show the code after your text.\n\nIn app.js:\n```\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\n"
    },
    "estimatedMinutes": 2,
    "projectId": "folders-sari-sari"
  },
  {
    "id": "node-folders-sari-sari-4",
    "index": 64,
    "task": "You will add three lines to app.js. The first line imports readdir from node:fs/promises. The next two lines list the files in the records folder and count them. The code below does this. Run the checker and paste its report.\n\nIn app.js:\n```\nimport { readdir } from \"node:fs/promises\";\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Rice 50\n",
      "records/b.txt": "Soap 25\n",
      "records/notes.md": "# Notes\nKeep Sari-Sari Store records here.\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The script prints Files: 3",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Files: 3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "readdir lists all the files inside a folder. It's like checking what's in a drawer."
      },
      {
        "level": 2,
        "text": "Add the three lines after the import. The page will show the code after your text.\n\nIn app.js:\n```\nimport { readdir } from \"node:fs/promises\";\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\n"
    },
    "conceptIds": [
      "node-readdir"
    ],
    "estimatedMinutes": 4,
    "projectId": "folders-sari-sari"
  },
  {
    "id": "node-folders-sari-sari-5",
    "index": 65,
    "task": "You will add two lines to app.js. The first line filters the list to keep only .txt files. The second line counts them. The code below does this. Run the checker and paste its report.\n\nIn app.js:\n```\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Rice 50\n",
      "records/b.txt": "Soap 25\n",
      "records/notes.md": "# Notes\nKeep Sari-Sari Store records here.\n"
    },
    "tests": [
      {
        "id": "txt",
        "label": "The script prints Text files: 2",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Text files: 2"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "filter keeps only the files that match the condition. .txt files are the ones you want."
      },
      {
        "level": 2,
        "text": "Add the two lines at the end of app.js. The page will show the code after your text.\n\nIn app.js:\n```\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "folders-sari-sari"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: folders-sari-sari.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-folders-sari-sari-6",
    "index": 66,
    "task": "You will add a line to make a folder called 'archive'. This folder will be created safely, even if it already exists. The code below does this. Run `node app.js` to test it. After running, check the report to confirm the folder exists.\n\nIn app.js:\n```\nimport { readdir, mkdir } from \"node:fs/promises\";\nawait mkdir(\"archive\", { recursive: true });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Rice 50\n",
      "records/b.txt": "Soap 25\n",
      "records/notes.md": "# Notes\nKeep Sari-Sari Store records here.\n"
    },
    "tests": [
      {
        "id": "archive",
        "label": "The archive folder exists",
        "kind": "local-dir-exists",
        "path": "archive"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of mkdir as a tool that builds a folder, and recursive: true means it won't stop if the folder is already there."
      },
      {
        "level": 2,
        "text": "Add the line at the end of the import section, right after mkdir.\n\nIn app.js:\n```\nimport { readdir, mkdir } from \"node:fs/promises\";\nawait mkdir(\"archive\", { recursive: true });\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir, mkdir } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\nawait mkdir(\"archive\", { recursive: true });\n"
    },
    "conceptIds": [
      "node-mkdir"
    ],
    "estimatedMinutes": 3,
    "projectId": "folders-sari-sari"
  },
  {
    "id": "node-folders-sari-sari-7",
    "index": 67,
    "task": "You will copy the file 'records/a.txt' into the new 'archive' folder. The code below does this. Run `node app.js` to test it. After running, check the report to confirm the file is copied.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile } from \"node:fs/promises\";\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Rice 50\n",
      "records/b.txt": "Soap 25\n",
      "records/notes.md": "# Notes\nKeep Sari-Sari Store records here.\n"
    },
    "tests": [
      {
        "id": "copied",
        "label": "archive/a.txt is a copy of records/a.txt",
        "kind": "local-file-contains",
        "path": "archive/a.txt",
        "value": "Rice 50"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "copyFile takes two paths: the original file and where you want to copy it."
      },
      {
        "level": 2,
        "text": "Add the line at the end of the import section, right after copyFile.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile } from \"node:fs/promises\";\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir, mkdir, copyFile } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\nawait mkdir(\"archive\", { recursive: true });\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\n"
    },
    "conceptIds": [
      "node-copy-file"
    ],
    "estimatedMinutes": 4,
    "projectId": "folders-sari-sari"
  },
  {
    "id": "node-folders-sari-sari-8",
    "index": 68,
    "task": "You will read the file's size using stat. The code below reads the file and prints its size in bytes. Run the script to test it. After running, check the report to confirm it prints 'Size: 8 bytes'.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile, stat } from \"node:fs/promises\";\nconst info = await stat(file);\nconsole.log(`Size: ${info.size} bytes`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Rice 50\n",
      "records/b.txt": "Soap 25\n",
      "records/notes.md": "# Notes\nKeep Sari-Sari Store records here.\n"
    },
    "tests": [
      {
        "id": "size",
        "label": "The script prints Size: 8 bytes",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Size: 8 bytes"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "stat reads file details like size without opening the file's content."
      },
      {
        "level": 2,
        "text": "Add the two lines at the end of the import section, right after stat.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile, stat } from \"node:fs/promises\";\nconst info = await stat(file);\nconsole.log(`Size: ${info.size} bytes`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir, mkdir, copyFile, stat } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\nawait mkdir(\"archive\", { recursive: true });\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\nconst info = await stat(file);\nconsole.log(`Size: ${info.size} bytes`);\n"
    },
    "conceptIds": [
      "node-stat"
    ],
    "estimatedMinutes": 4,
    "projectId": "folders-sari-sari"
  },
  {
    "id": "node-folders-sari-sari-9",
    "index": 69,
    "task": "You will rename the copied file from 'a.txt' to 'a-old.txt' in the archive folder. The code below does this. Run `node app.js` to test it. After running, check the report to confirm 'archive/a-old.txt' exists and 'archive/a.txt' is gone.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile, stat, rename } from \"node:fs/promises\";\nawait rename(path.join(\"archive\", \"a.txt\"), path.join(\"archive\", \"a-old.txt\"));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Rice 50\n",
      "records/b.txt": "Soap 25\n",
      "records/notes.md": "# Notes\nKeep Sari-Sari Store records here.\n"
    },
    "tests": [
      {
        "id": "renamed",
        "label": "archive/a-old.txt exists",
        "kind": "local-file-exists",
        "path": "archive/a-old.txt"
      },
      {
        "id": "moved",
        "label": "archive/a.txt is gone",
        "kind": "local-path-missing",
        "path": "archive/a.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "rename moves or changes the name of a file in one step."
      },
      {
        "level": 2,
        "text": "Add the line at the end of the import section, right after rename.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile, stat, rename } from \"node:fs/promises\";\nawait rename(path.join(\"archive\", \"a.txt\"), path.join(\"archive\", \"a-old.txt\"));\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir, mkdir, copyFile, stat, rename } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\nawait mkdir(\"archive\", { recursive: true });\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\nconst info = await stat(file);\nconsole.log(`Size: ${info.size} bytes`);\nawait rename(path.join(\"archive\", \"a.txt\"), path.join(\"archive\", \"a-old.txt\"));\n"
    },
    "conceptIds": [
      "node-rename"
    ],
    "estimatedMinutes": 4,
    "projectId": "folders-sari-sari"
  },
  {
    "id": "node-folders-sari-sari-10",
    "index": 70,
    "task": "You will turn the relative path into an absolute one using path.resolve. The code below prints 'Absolute: true' to confirm it. Run the script to test it. After running, check the report to confirm it prints 'Absolute: true'.\n\nIn app.js:\n```\nconsole.log(`Absolute: ${path.isAbsolute(path.resolve(file))}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Sari-Sari Store Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Rice 50\n",
      "records/b.txt": "Soap 25\n",
      "records/notes.md": "# Notes\nKeep Sari-Sari Store records here.\n"
    },
    "tests": [
      {
        "id": "absolute",
        "label": "The script prints Absolute: true",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Absolute: true"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "path.resolve turns a relative path into a full path that starts from the top of the drive."
      },
      {
        "level": 2,
        "text": "Add the line at the end of the script, right after the other lines.\n\nIn app.js:\n```\nconsole.log(`Absolute: ${path.isAbsolute(path.resolve(file))}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir, mkdir, copyFile, stat, rename } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\nawait mkdir(\"archive\", { recursive: true });\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\nconst info = await stat(file);\nconsole.log(`Size: ${info.size} bytes`);\nawait rename(path.join(\"archive\", \"a.txt\"), path.join(\"archive\", \"a-old.txt\"));\nconsole.log(`Absolute: ${path.isAbsolute(path.resolve(file))}`);\n"
    },
    "conceptIds": [
      "node-absolute-path"
    ],
    "estimatedMinutes": 3,
    "projectId": "folders-sari-sari"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: scripts-carinderia.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-scripts-carinderia-1",
    "index": 71,
    "task": "Open the file app.js. Replace the only line with the code below. This changes what the script prints. Run node app.js to check. The checker will confirm it prints Carinderia.\n\nIn app.js:\n```\nconsole.log(\"Carinderia\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "node app.js prints Carinderia",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Carinderia"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Change the message to match the carinderia's name."
      },
      {
        "level": 2,
        "text": "Type the code exactly where it says to, at the start of app.js.\n\nIn app.js:\n```\nconsole.log(\"Carinderia\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Carinderia\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "scripts-carinderia"
  },
  {
    "id": "node-scripts-carinderia-2",
    "index": 72,
    "task": "Add two lines at the end of app.js. The first line sets a constant called item to \"Adobo\". The second line prints that value. This shows the product name. Run node app.js to check. The checker will confirm it prints Adobo on its own line.\n\nIn app.js:\n```\nconst item = \"Adobo\";\nconsole.log(item);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "item",
        "label": "The script prints Adobo on its own line",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Adobo\n"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use const to make item a fixed value that won't change."
      },
      {
        "level": 2,
        "text": "Add the two lines at the end of app.js, after the first line.\n\nIn app.js:\n```\nconst item = \"Adobo\";\nconsole.log(item);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Carinderia\");\nconst item = \"Adobo\";\nconsole.log(item);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "scripts-carinderia"
  },
  {
    "id": "node-scripts-carinderia-3",
    "index": 73,
    "task": "Add a new constant called price with the value 80. Then change the last console.log to print both item and price together. This shows the product and its cost. Run node app.js to check. The checker will confirm it prints Adobo 80.\n\nIn app.js:\n```\nconst price = 80;\nconsole.log(item, price);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "pair",
        "label": "The script prints Adobo 80",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Adobo 80"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add price right after item, then update the log to include both."
      },
      {
        "level": 2,
        "text": "Type the code exactly where it says to, at the end of app.js.\n\nIn app.js:\n```\nconst price = 80;\nconsole.log(item, price);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Carinderia\");\nconst item = \"Adobo\";\nconst price = 80;\nconsole.log(item, price);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "scripts-carinderia"
  },
  {
    "id": "node-scripts-carinderia-4",
    "index": 74,
    "task": "Change the last console.log to use a template literal. This lets you mix text and variables. Print the item and price in one sentence. Run node app.js to check. The checker will confirm it prints Adobo costs 80 pesos.\n\nIn app.js:\n```\nconsole.log(`${item} costs ${price} pesos`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "sentence",
        "label": "The script prints Adobo costs 80 pesos",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Adobo costs 80 pesos"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use backticks and dollar signs to insert variables into text."
      },
      {
        "level": 2,
        "text": "Replace the last line with the code below, at the end of app.js.\n\nIn app.js:\n```\nconsole.log(`${item} costs ${price} pesos`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Carinderia\");\nconst item = \"Adobo\";\nconst price = 80;\nconsole.log(`${item} costs ${price} pesos`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "scripts-carinderia"
  },
  {
    "id": "node-scripts-carinderia-5",
    "index": 75,
    "task": "Add two lines at the end of app.js. The first line creates an array called items with three product names. The second line prints how many items are in the array. Run node app.js to check. The checker will confirm it prints Items: 3.\n\nIn app.js:\n```\nconst items = [\"Adobo\", \"Pancit\", \"Lumpia\"];\nconsole.log(`Items: ${items.length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
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
        "text": "Use square brackets to make an array with names inside."
      },
      {
        "level": 2,
        "text": "Add the two lines at the end of app.js, after the last line.\n\nIn app.js:\n```\nconst items = [\"Adobo\", \"Pancit\", \"Lumpia\"];\nconsole.log(`Items: ${items.length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Carinderia\");\nconst item = \"Adobo\";\nconst price = 80;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Adobo\", \"Pancit\", \"Lumpia\"];\nconsole.log(`Items: ${items.length}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "scripts-carinderia"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: scripts-carinderia.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-scripts-carinderia-6",
    "index": 76,
    "task": "You will print each product name with a dash in front. Add the code below at the end of app.js. This loop goes through every item in the list. It prints each name with a dash before it. The checker will confirm that the last item printed is - Lumpia.\n\nIn app.js:\n```\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "last",
        "label": "The list ends with - Lumpia",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "- Lumpia"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of a loop that goes through each item in the list one by one."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the items list.\n\nIn app.js:\n```\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Carinderia\");\nconst item = \"Adobo\";\nconst price = 80;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Adobo\", \"Pancit\", \"Lumpia\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "scripts-carinderia"
  },
  {
    "id": "node-scripts-carinderia-7",
    "index": 77,
    "task": "You will add up the three prices and print the total. Add the code below at the end of app.js. This adds 80, 60, and 15 to get 155. The checker will confirm that the script prints Total: 155.\n\nIn app.js:\n```\nconst total = 80 + 60 + 15;\nconsole.log(`Total: ${total}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "total",
        "label": "The script prints Total: 155",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Total: 155"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add two lines that calculate the total by adding the three prices."
      },
      {
        "level": 2,
        "text": "Place these lines at the end of app.js, after the loop.\n\nIn app.js:\n```\nconst total = 80 + 60 + 15;\nconsole.log(`Total: ${total}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Carinderia\");\nconst item = \"Adobo\";\nconst price = 80;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Adobo\", \"Pancit\", \"Lumpia\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\nconst total = 80 + 60 + 15;\nconsole.log(`Total: ${total}`);\n"
    },
    "estimatedMinutes": 2,
    "projectId": "scripts-carinderia"
  },
  {
    "id": "node-scripts-carinderia-8",
    "index": 78,
    "task": "You will write a function that adds 12% tax to any amount. Add the code below at the end of app.js. The function multiplies the amount by 1.12 and rounds it. The checker will confirm that the script prints With tax: 174.\n\nIn app.js:\n```\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "tax",
        "label": "The script prints With tax: 174",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "With tax: 174"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Create a function that takes an amount and returns it with 12% tax added."
      },
      {
        "level": 2,
        "text": "Add these lines at the end of app.js, after the total line.\n\nIn app.js:\n```\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Carinderia\");\nconst item = \"Adobo\";\nconst price = 80;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Adobo\", \"Pancit\", \"Lumpia\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\nconst total = 80 + 60 + 15;\nconsole.log(`Total: ${total}`);\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "scripts-carinderia"
  },
  {
    "id": "node-scripts-carinderia-9",
    "index": 79,
    "task": "You will label the order as big if the total is over 100, otherwise small. Add the code below at the end of app.js. The if statement checks if total is greater than 100. The checker will confirm that the script prints Big order.\n\nIn app.js:\n```\nif (total > 100) console.log(\"Big order\");\nelse console.log(\"Small order\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "size",
        "label": "The script prints Big order",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Big order"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use an if statement to check if the total is over 100. If yes, print 'Big order'. If no, print 'Small order'."
      },
      {
        "level": 2,
        "text": "Add these lines at the end of app.js, after the tax line.\n\nIn app.js:\n```\nif (total > 100) console.log(\"Big order\");\nelse console.log(\"Small order\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Carinderia\");\nconst item = \"Adobo\";\nconst price = 80;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Adobo\", \"Pancit\", \"Lumpia\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\nconst total = 80 + 60 + 15;\nconsole.log(`Total: ${total}`);\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\nif (total > 100) console.log(\"Big order\");\nelse console.log(\"Small order\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "scripts-carinderia"
  },
  {
    "id": "node-scripts-carinderia-10",
    "index": 80,
    "task": "You will report a warning using console.error. Add the code below at the end of app.js. This prints 'Low stock: Lumpia' as an error message. The checker will confirm that this message appears as an error, but the script still finishes normally.\n\nIn app.js:\n```\nconsole.error(\"Low stock: Lumpia\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "warning",
        "label": "The script reports Low stock: Lumpia as an error message",
        "kind": "local-node-stderr",
        "file": "app.js",
        "value": "Low stock: Lumpia"
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
        "text": "Use console.error to print a warning message, not console.log."
      },
      {
        "level": 2,
        "text": "Add this line at the end of app.js, after the order label.\n\nIn app.js:\n```\nconsole.error(\"Low stock: Lumpia\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Carinderia\");\nconst item = \"Adobo\";\nconst price = 80;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Adobo\", \"Pancit\", \"Lumpia\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\nconst total = 80 + 60 + 15;\nconsole.log(`Total: ${total}`);\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\nif (total > 100) console.log(\"Big order\");\nelse console.log(\"Small order\");\nconsole.error(\"Low stock: Lumpia\");\n"
    },
    "estimatedMinutes": 2,
    "projectId": "scripts-carinderia"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: modules-carinderia.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-modules-carinderia-1",
    "index": 81,
    "task": "Create a new file named prices.js. Put this code inside it: export const storeName = \"Carinderia\";. This tells the computer to save the store name for later use. The checker will test if this code works.\n\nIn prices.js:\n```\nexport const storeName = \"Carinderia\";\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "export",
        "label": "prices.js exports storeName",
        "kind": "local-file-contains",
        "path": "prices.js",
        "value": "export const storeName"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of prices.js as a small notebook that holds the store's name. You write it once, and other files can read it."
      },
      {
        "level": 2,
        "text": "Put the code in a file named prices.js inside your project folder.\n\nIn prices.js:\n```\nexport const storeName = \"Carinderia\";\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "prices.js": "export const storeName = \"Carinderia\";\n"
    },
    "estimatedMinutes": 3,
    "projectId": "modules-carinderia"
  },
  {
    "id": "node-modules-carinderia-2",
    "index": 82,
    "task": "Open app.js. Add this code at the top: import { storeName } from \"./prices.js\";. Then add this at the end: console.log(storeName);. This lets app.js read the store name from prices.js and show it on screen. Run the checker to test.\n\nIn app.js:\n```\nimport { storeName } from \"./prices.js\";\nconsole.log(storeName);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "imported",
        "label": "node app.js prints Carinderia from prices.js",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Carinderia"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are borrowing the store name from prices.js. The import line tells app.js where to find it."
      },
      {
        "level": 2,
        "text": "Put the import line at the top of app.js, and the console.log line at the very end.\n\nIn app.js:\n```\nimport { storeName } from \"./prices.js\";\nconsole.log(storeName);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { storeName } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-carinderia"
  },
  {
    "id": "node-modules-carinderia-3",
    "index": 83,
    "task": "In prices.js, add this code: export const prices = { \"Adobo\": 80, \"Pancit\": 60, \"Lumpia\": 15 };. In app.js, change the import to: import { storeName, prices } from \"./prices.js\";. Then add this at the end: console.log(prices[\"Adobo\"]);. This prints the price of Adobo. Run the checker.\n\nIn prices.js:\n```\nexport const prices = { \"Adobo\": 80, \"Pancit\": 60, \"Lumpia\": 15 };\n```\n\nIn app.js:\n```\nimport { storeName, prices } from \"./prices.js\";\nconsole.log(prices[\"Adobo\"]);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "price",
        "label": "The script prints 80 on its own line",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "80\n"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The prices object holds the food names and their prices. Use it to get the price for Adobo."
      },
      {
        "level": 2,
        "text": "Add the new import line to app.js, then add the console.log line at the end.\n\nIn prices.js:\n```\nexport const prices = { \"Adobo\": 80, \"Pancit\": 60, \"Lumpia\": 15 };\n```\n\nIn app.js:\n```\nimport { storeName, prices } from \"./prices.js\";\nconsole.log(prices[\"Adobo\"]);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "prices.js": "export const storeName = \"Carinderia\";\nexport const prices = { \"Adobo\": 80, \"Pancit\": 60, \"Lumpia\": 15 };\n",
      "app.js": "import { storeName, prices } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Adobo\"]);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "modules-carinderia"
  },
  {
    "id": "node-modules-carinderia-4",
    "index": 84,
    "task": "In prices.js, add this function at the end: export function priceOf(name) { return prices[name] ?? 0; }. This function looks up a food's price and returns 0 if it doesn't exist. The checker will test if this function is exported correctly.\n\nIn prices.js:\n```\nexport function priceOf(name) {\n  return prices[name] ?? 0;\n}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "function",
        "label": "prices.js exports priceOf",
        "kind": "local-file-contains",
        "path": "prices.js",
        "value": "export function priceOf(name)"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The function priceOf takes a food name and returns its price. If the food is not in the list, it returns 0."
      },
      {
        "level": 2,
        "text": "Add this code after the prices object in prices.js.\n\nIn prices.js:\n```\nexport function priceOf(name) {\n  return prices[name] ?? 0;\n}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "prices.js": "export const storeName = \"Carinderia\";\nexport const prices = { \"Adobo\": 80, \"Pancit\": 60, \"Lumpia\": 15 };\nexport function priceOf(name) {\n  return prices[name] ?? 0;\n}\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-carinderia"
  },
  {
    "id": "node-modules-carinderia-5",
    "index": 85,
    "task": "In app.js, add this to the import: import { storeName, prices, priceOf } from \"./prices.js\";. Then add this at the end: console.log(`Pancit: ${priceOf(\"Pancit\")}`);. This prints the price of Pancit. Run the checker to test.\n\nIn app.js:\n```\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(`Pancit: ${priceOf(\"Pancit\")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "lookup",
        "label": "The script prints Pancit: 60",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Pancit: 60"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are now using the priceOf function to get the price of Pancit. The function will return 60."
      },
      {
        "level": 2,
        "text": "Add the new import line to app.js, then add the console.log line at the end.\n\nIn app.js:\n```\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(`Pancit: ${priceOf(\"Pancit\")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Adobo\"]);\nconsole.log(`Pancit: ${priceOf(\"Pancit\")}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-carinderia"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: modules-carinderia.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-modules-carinderia-6",
    "index": 86,
    "task": "You will add a default export to prices.js. This lets other files use it easily. The code below will format a number as pesos. You must add it at the end of prices.js. Then run the checker to confirm it works.\n\nIn prices.js:\n```\nexport default function formatPeso(amount) {\n  return `PHP ${amount.toFixed(2)}`;\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "default",
        "label": "prices.js has a default export",
        "kind": "local-file-contains",
        "path": "prices.js",
        "value": "export default function formatPeso"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of default export as the main thing you want to share."
      },
      {
        "level": 2,
        "text": "Add the code at the end of prices.js, right after the last line.\n\nIn prices.js:\n```\nexport default function formatPeso(amount) {\n  return `PHP ${amount.toFixed(2)}`;\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "prices.js": "export const storeName = \"Carinderia\";\nexport const prices = { \"Adobo\": 80, \"Pancit\": 60, \"Lumpia\": 15 };\nexport function priceOf(name) {\n  return prices[name] ?? 0;\n}\nexport default function formatPeso(amount) {\n  return `PHP ${amount.toFixed(2)}`;\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "modules-carinderia"
  },
  {
    "id": "node-modules-carinderia-7",
    "index": 87,
    "task": "You will import the default export in app.js. This lets you use the formatPeso function. Add the import at the top of app.js. Then add one line at the end to print 80 as pesos. Run the checker to confirm it prints PHP 80.00.\n\nIn app.js:\n```\nimport formatPeso from \"./prices.js\";\nconsole.log(formatPeso(80));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "peso",
        "label": "The script prints PHP 80.00",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "PHP 80.00"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You import a default export without braces, like importing a single tool."
      },
      {
        "level": 2,
        "text": "Add the import at the top of app.js, then add the console.log line at the end.\n\nIn app.js:\n```\nimport formatPeso from \"./prices.js\";\nconsole.log(formatPeso(80));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import formatPeso from \"./prices.js\";\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Adobo\"]);\nconsole.log(`Pancit: ${priceOf(\"Pancit\")}`);\nconsole.log(formatPeso(80));\n"
    },
    "estimatedMinutes": 3,
    "projectId": "modules-carinderia"
  },
  {
    "id": "node-modules-carinderia-8",
    "index": 88,
    "task": "You will import from Node's built-in os module. This gives you info about your computer. Add the import at the top of app.js. Then add one line at the end to print the operating system name. Run the checker to confirm it prints Running on and your system name.\n\nIn app.js:\n```\nimport { platform } from \"node:os\";\nconsole.log(`Running on ${platform()}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "os",
        "label": "The script prints Running on and your system name",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Running on "
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the platform property to get the system name."
      },
      {
        "level": 2,
        "text": "Add the import at the top of app.js, then add the console.log line at the end.\n\nIn app.js:\n```\nimport { platform } from \"node:os\";\nconsole.log(`Running on ${platform()}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { platform } from \"node:os\";\nimport formatPeso from \"./prices.js\";\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Adobo\"]);\nconsole.log(`Pancit: ${priceOf(\"Pancit\")}`);\nconsole.log(formatPeso(80));\nconsole.log(`Running on ${platform()}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-carinderia"
  },
  {
    "id": "node-modules-carinderia-9",
    "index": 89,
    "task": "You will add a start script to package.json. This lets you run the app with npm run start. Change package.json to add a scripts entry. Then run npm run start to test it. Run the checker to confirm package.json has a start script.\n\nIn package.json:\n```\n  \"type\": \"module\",\n  \"scripts\": { \"start\": \"node app.js\" }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "script",
        "label": "package.json has a start script",
        "kind": "local-file-contains",
        "path": "package.json",
        "value": "\"start\": \"node app.js\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The start script tells npm how to run your app."
      },
      {
        "level": 2,
        "text": "Add the scripts entry inside package.json, right after type: \"module\".\n\nIn package.json:\n```\n  \"type\": \"module\",\n  \"scripts\": { \"start\": \"node app.js\" }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "package.json": "{\n  \"type\": \"module\",\n  \"scripts\": { \"start\": \"node app.js\" }\n}\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-carinderia"
  },
  {
    "id": "node-modules-carinderia-10",
    "index": 90,
    "task": "You will import priceOf under a new name, lookup, and use it. Add the import at the top of app.js. Then add one line at the end to print the price of \"Lumpia\". Run the checker to confirm it prints Last item: 15.\n\nIn app.js:\n```\nimport { priceOf as lookup } from \"./prices.js\";\nconsole.log(`Last item: ${lookup(\"Lumpia\")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "alias",
        "label": "The script prints Last item: 15",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Last item: 15"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use \"as lookup\" to rename the imported function."
      },
      {
        "level": 2,
        "text": "Add the import at the top of app.js, then add the console.log line at the end.\n\nIn app.js:\n```\nimport { priceOf as lookup } from \"./prices.js\";\nconsole.log(`Last item: ${lookup(\"Lumpia\")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { priceOf as lookup } from \"./prices.js\";\nimport { platform } from \"node:os\";\nimport formatPeso from \"./prices.js\";\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Adobo\"]);\nconsole.log(`Pancit: ${priceOf(\"Pancit\")}`);\nconsole.log(formatPeso(80));\nconsole.log(`Running on ${platform()}`);\nconsole.log(`Last item: ${lookup(\"Lumpia\")}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-carinderia"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: files-carinderia.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-files-carinderia-1",
    "index": 91,
    "task": "Open app.js. Replace the console.log line with two lines. The code below reads stock.txt and prints its text. Run the checker to confirm it works.\n\nIn app.js:\n```\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Adobo,80\nPancit,60\nLumpia,15\n"
    },
    "tests": [
      {
        "id": "text",
        "label": "The script prints the line Adobo,80 from stock.txt",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Adobo,80"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Read the file first, then print its content."
      },
      {
        "level": 2,
        "text": "Put the code where the console.log line is.\n\nIn app.js:\n```\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "files-carinderia"
  },
  {
    "id": "node-files-carinderia-2",
    "index": 92,
    "task": "Add two lines at the end of app.js. The code below splits the text into lines and prints how many lines there are. Run the checker to confirm it works.\n\nIn app.js:\n```\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Adobo,80\nPancit,60\nLumpia,15\n"
    },
    "tests": [
      {
        "id": "lines",
        "label": "The script prints Lines: 3",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Lines: 3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Split the text by new lines to count each dish."
      },
      {
        "level": 2,
        "text": "Add the code after the first two lines you added.\n\nIn app.js:\n```\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "files-carinderia"
  },
  {
    "id": "node-files-carinderia-3",
    "index": 93,
    "task": "Add two lines at the end of app.js. The code below splits each line by comma and prints the second item's name. Run the checker to confirm it works.\n\nIn app.js:\n```\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Adobo,80\nPancit,60\nLumpia,15\n"
    },
    "tests": [
      {
        "id": "second",
        "label": "The script prints Second item: Pancit",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Second item: Pancit"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Each line has a name and price. Split it to get the name."
      },
      {
        "level": 2,
        "text": "Add the code after the lines you added before.\n\nIn app.js:\n```\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "files-carinderia"
  },
  {
    "id": "node-files-carinderia-4",
    "index": 94,
    "task": "Add two lines at the end of app.js. The code below turns each row into an object with price and prints the cheapest. Run the checker to confirm it works.\n\nIn app.js:\n```\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Adobo,80\nPancit,60\nLumpia,15\n"
    },
    "tests": [
      {
        "id": "cheapest",
        "label": "The script prints Cheapest: 15",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Cheapest: 15"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Turn each row into an object with name and price. Use Math.min to find the lowest price."
      },
      {
        "level": 2,
        "text": "Add the code after the lines you added before.\n\nIn app.js:\n```\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "files-carinderia"
  },
  {
    "id": "node-files-carinderia-5",
    "index": 95,
    "task": "Add two lines at the end of app.js. The first line imports writeFile. The second line writes a report to report.txt. Then run `node app.js` in the terminal. Run the checker to confirm report.txt says Items: 3.\n\nIn app.js:\n```\nimport { readFile, writeFile } from \"node:fs/promises\";\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Adobo,80\nPancit,60\nLumpia,15\n"
    },
    "tests": [
      {
        "id": "report",
        "label": "report.txt says Items: 3",
        "kind": "local-file-contains",
        "path": "report.txt",
        "value": "Items: 3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Import writeFile first. Then write to report.txt after you finish reading the stock."
      },
      {
        "level": 2,
        "text": "Put the code at the end of app.js, after the other lines.\n\nIn app.js:\n```\nimport { readFile, writeFile } from \"node:fs/promises\";\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\n"
    },
    "estimatedMinutes": 6,
    "projectId": "files-carinderia"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: files-carinderia.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-files-carinderia-6",
    "index": 96,
    "task": "You will save the item list as a file. This file will hold the menu in a format called JSON. You add one line at the end of app.js. Then you run the command `node app.js` to test it. The checker will confirm that stock.json now holds Adobo as JSON.\n\nIn app.js:\n```\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Adobo,80\nPancit,60\nLumpia,15\n"
    },
    "tests": [
      {
        "id": "json",
        "label": "stock.json holds Adobo as JSON",
        "kind": "local-file-contains",
        "path": "stock.json",
        "value": "\"name\": \"Adobo\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of JSON as a way to store data that your computer can read later."
      },
      {
        "level": 2,
        "text": "Add the line at the end of app.js, right after the last line.\n\nIn app.js:\n```\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\n"
    },
    "estimatedMinutes": 3,
    "projectId": "files-carinderia"
  },
  {
    "id": "node-files-carinderia-7",
    "index": 97,
    "task": "You will read the saved file back into objects. This lets you count how many items are in the menu. Add two lines at the end of app.js. The checker will confirm that the script prints 'Saved: 3 items'.\n\nIn app.js:\n```\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Adobo,80\nPancit,60\nLumpia,15\n"
    },
    "tests": [
      {
        "id": "saved",
        "label": "The script prints Saved: 3 items",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Saved: 3 items"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You need to read the file, turn it back into objects, then count them."
      },
      {
        "level": 2,
        "text": "Add the two lines at the end of app.js, after the last line.\n\nIn app.js:\n```\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "files-carinderia"
  },
  {
    "id": "node-files-carinderia-8",
    "index": 98,
    "task": "You will add a line to report.txt without deleting what's already there. You add one line to the import section and one line at the end of app.js. Then you run `node app.js`. The checker will confirm that report.txt ends with 'Checked today' but still says 'Items: 3'.\n\nIn app.js:\n```\nimport { readFile, writeFile, appendFile } from \"node:fs/promises\";\nawait appendFile(\"report.txt\", \"Checked today\\n\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Adobo,80\nPancit,60\nLumpia,15\n"
    },
    "tests": [
      {
        "id": "appended",
        "label": "report.txt ends with Checked today",
        "kind": "local-file-contains",
        "path": "report.txt",
        "value": "Checked today"
      },
      {
        "id": "kept",
        "label": "report.txt still says Items: 3",
        "kind": "local-file-contains",
        "path": "report.txt",
        "value": "Items: 3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use appendFile to add to the end of a file, not to replace it."
      },
      {
        "level": 2,
        "text": "Add the new import line at the top, then the append line at the end.\n\nIn app.js:\n```\nimport { readFile, writeFile, appendFile } from \"node:fs/promises\";\nawait appendFile(\"report.txt\", \"Checked today\\n\");\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile, appendFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\nawait appendFile(\"report.txt\", \"Checked today\\n\");\n"
    },
    "estimatedMinutes": 4,
    "projectId": "files-carinderia"
  },
  {
    "id": "node-files-carinderia-9",
    "index": 99,
    "task": "You will raise the price of the first item by 7 and save the updated list. Add two lines at the end of app.js. Then run `node app.js`. The checker will confirm that stock.json now shows Adobo at 87.\n\nIn app.js:\n```\nsaved[0].price += 7;\nawait writeFile(\"stock.json\", JSON.stringify(saved, null, 2));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Adobo,80\nPancit,60\nLumpia,15\n"
    },
    "tests": [
      {
        "id": "raised",
        "label": "stock.json now has Adobo at 87",
        "kind": "local-file-contains",
        "path": "stock.json",
        "value": "\"price\": 87"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You change the first item's price, then save the whole list again."
      },
      {
        "level": 2,
        "text": "Add the two lines at the end of app.js, after the last line.\n\nIn app.js:\n```\nsaved[0].price += 7;\nawait writeFile(\"stock.json\", JSON.stringify(saved, null, 2));\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile, appendFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\nawait appendFile(\"report.txt\", \"Checked today\\n\");\nsaved[0].price += 7;\nawait writeFile(\"stock.json\", JSON.stringify(saved, null, 2));\n"
    },
    "estimatedMinutes": 4,
    "projectId": "files-carinderia"
  },
  {
    "id": "node-files-carinderia-10",
    "index": 100,
    "task": "You will read a file that does not exist and handle the error. You add a try and catch block at the end of app.js. The checker will confirm that the script reports 'Could not read: ENOENT' and still finishes normally.\n\nIn app.js:\n```\ntry { await readFile(\"missing.txt\", \"utf8\"); }\ncatch (error) { console.error(`Could not read: ${error.code}`); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Adobo,80\nPancit,60\nLumpia,15\n"
    },
    "tests": [
      {
        "id": "code",
        "label": "The script reports Could not read: ENOENT",
        "kind": "local-node-stderr",
        "file": "app.js",
        "value": "Could not read: ENOENT"
      },
      {
        "id": "finishes",
        "label": "The script still finishes normally",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Wrap the file reading in a try block and catch the error to avoid crashing."
      },
      {
        "level": 2,
        "text": "Add the try-catch block at the end of app.js, after the last line.\n\nIn app.js:\n```\ntry { await readFile(\"missing.txt\", \"utf8\"); }\ncatch (error) { console.error(`Could not read: ${error.code}`); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile, appendFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\nawait appendFile(\"report.txt\", \"Checked today\\n\");\nsaved[0].price += 7;\nawait writeFile(\"stock.json\", JSON.stringify(saved, null, 2));\ntry { await readFile(\"missing.txt\", \"utf8\"); }\ncatch (error) { console.error(`Could not read: ${error.code}`); }\n"
    },
    "estimatedMinutes": 5,
    "projectId": "files-carinderia"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: async-carinderia.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-async-carinderia-1",
    "index": 101,
    "task": "Open the file app.js. At the end, add two lines. The first line says await wait(100);. The second line says console.log(\"After wait\");. This pauses the script for 100 milliseconds before printing the next message. The checker will run the script and confirm it prints Start and then After wait.\n\nIn app.js:\n```\nawait wait(100);\nconsole.log(\"After wait\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "after",
        "label": "The script prints Start and then After wait",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Start\nAfter wait"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The script must pause before printing the next line. Use await to wait for the promise to finish."
      },
      {
        "level": 2,
        "text": "Add these two lines at the very end of app.js, after the current code.\n\nIn app.js:\n```\nawait wait(100);\nconsole.log(\"After wait\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "async-carinderia"
  },
  {
    "id": "node-async-carinderia-2",
    "index": 102,
    "task": "Open app.js. At the end, add two lines. The first line defines a function called fetchPrice that takes a name. It waits 20 milliseconds, then returns the length of the name times 10. The second line prints the price for \"Adobo\". The checker will run the script and confirm it prints Price: 50.\n\nIn app.js:\n```\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Adobo\")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "price",
        "label": "The script prints Price: 50",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Price: 50"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The function fetchPrice must wait 20 milliseconds before returning a value. Use async and await to do this."
      },
      {
        "level": 2,
        "text": "Add these two lines at the end of app.js, after the previous code.\n\nIn app.js:\n```\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Adobo\")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Adobo\")}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "async-carinderia"
  },
  {
    "id": "node-async-carinderia-3",
    "index": 103,
    "task": "Open app.js. At the end, add two lines. The first line uses Promise.all to run fetchPrice for three dishes at the same time. The second line prints all the prices joined by commas. The checker will run the script and confirm it prints All: 50, 60, 60.\n\nIn app.js:\n```\nconst prices = await Promise.all([\"Adobo\", \"Pancit\", \"Lumpia\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "all",
        "label": "The script prints All: 50, 60, 60",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "All: 50, 60, 60"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Promise.all runs multiple promises at once. Use .map to create an array of promises for each dish."
      },
      {
        "level": 2,
        "text": "Add these two lines at the end of app.js, after the previous code.\n\nIn app.js:\n```\nconst prices = await Promise.all([\"Adobo\", \"Pancit\", \"Lumpia\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Adobo\")}`);\nconst prices = await Promise.all([\"Adobo\", \"Pancit\", \"Lumpia\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "async-carinderia"
  },
  {
    "id": "node-async-carinderia-4",
    "index": 104,
    "task": "Open app.js. At the end, add three lines. The first line creates a slow promise that waits 200 milliseconds then returns \"slow\". The second line creates a fast promise that waits 20 milliseconds then returns \"fast\". The third line uses Promise.race to race them and prints the winner. The checker will run the script and confirm it prints First: fast.\n\nIn app.js:\n```\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "race",
        "label": "The script prints First: fast",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "First: fast"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Promise.race waits for the first promise to finish, then returns its result. The slow promise takes longer."
      },
      {
        "level": 2,
        "text": "Add these three lines at the end of app.js, after the previous code.\n\nIn app.js:\n```\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Adobo\")}`);\nconst prices = await Promise.all([\"Adobo\", \"Pancit\", \"Lumpia\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "async-carinderia"
  },
  {
    "id": "node-async-carinderia-5",
    "index": 105,
    "task": "Open app.js. At the end, add two lines. The first line defines a function called failing that throws an error with the message \"Supplier offline\". The second line tries to run the function and catches the error, then prints the message to the error stream. The checker will run the script and confirm it reports Supplier offline, and the script still finishes normally.\n\nIn app.js:\n```\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "caught",
        "label": "The script reports Supplier offline",
        "kind": "local-node-stderr",
        "file": "app.js",
        "value": "Supplier offline"
      },
      {
        "id": "finishes",
        "label": "The script still finishes normally",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use try and catch to handle errors. The error message must be printed using console.error."
      },
      {
        "level": 2,
        "text": "Add these two lines at the end of app.js, after the previous code.\n\nIn app.js:\n```\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Adobo\")}`);\nconst prices = await Promise.all([\"Adobo\", \"Pancit\", \"Lumpia\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\n"
    },
    "estimatedMinutes": 4,
    "projectId": "async-carinderia"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: async-carinderia.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-async-carinderia-6",
    "index": 106,
    "task": "You will wait for two promises: one that works and one that fails. Add the code below at the end of app.js. This lets you see both results at once. The checker confirms that the script prints Settled: fulfilled rejected. Run the checker to check your work.\n\nIn app.js:\n```\nconst results = await Promise.allSettled([fetchPrice(\"Adobo\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "settled",
        "label": "The script prints Settled: fulfilled rejected",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Settled: fulfilled rejected"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of Promise.allSettled as a way to wait for all tasks, even if some fail."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst results = await Promise.allSettled([fetchPrice(\"Adobo\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Adobo\")}`);\nconst prices = await Promise.all([\"Adobo\", \"Pancit\", \"Lumpia\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Adobo\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "async-carinderia"
  },
  {
    "id": "node-async-carinderia-7",
    "index": 107,
    "task": "You will check two dishes one after the other. Add the code below at the end of app.js. This loop checks each dish name and prints its price. The checker confirms that the script prints Checked Pancit: 60. Run the checker to check your work.\n\nIn app.js:\n```\nfor (const name of [\"Adobo\", \"Pancit\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "loop",
        "label": "The script prints Checked Pancit: 60",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Checked Pancit: 60"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use a for...of loop to repeat the same action for each dish name."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nfor (const name of [\"Adobo\", \"Pancit\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Adobo\")}`);\nconst prices = await Promise.all([\"Adobo\", \"Pancit\", \"Lumpia\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Adobo\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\nfor (const name of [\"Adobo\", \"Pancit\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "async-carinderia"
  },
  {
    "id": "node-async-carinderia-8",
    "index": 108,
    "task": "You will make sure a cleanup message prints no matter what. Add the code below at the end of app.js. The finally block runs after the wait, even if it fails. The checker confirms that the script prints Cleanup done. Run the checker to check your work.\n\nIn app.js:\n```\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "cleanup",
        "label": "The script prints Cleanup done",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Cleanup done"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The finally block runs no matter if the wait succeeds or fails."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Adobo\")}`);\nconst prices = await Promise.all([\"Adobo\", \"Pancit\", \"Lumpia\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Adobo\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\nfor (const name of [\"Adobo\", \"Pancit\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\n"
    },
    "estimatedMinutes": 3,
    "projectId": "async-carinderia"
  },
  {
    "id": "node-async-carinderia-9",
    "index": 109,
    "task": "You will repeat a small task every 10 milliseconds. Add the code below at the end of app.js. This timer runs for three ticks, then stops itself. The checker confirms that the script prints Ticks: 3 and stops on its own. Run the checker to check your work.\n\nIn app.js:\n```\nlet ticks = 0;\nconst timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log(\"Ticks: 3\"); } }, 10);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "ticks",
        "label": "The script prints Ticks: 3",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Ticks: 3"
      },
      {
        "id": "stops",
        "label": "The script stops on its own",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use setInterval to repeat a task, and clearInterval to stop it."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nlet ticks = 0;\nconst timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log(\"Ticks: 3\"); } }, 10);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Adobo\")}`);\nconst prices = await Promise.all([\"Adobo\", \"Pancit\", \"Lumpia\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Adobo\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\nfor (const name of [\"Adobo\", \"Pancit\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\nlet ticks = 0;\nconst timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log(\"Ticks: 3\"); } }, 10);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "async-carinderia"
  },
  {
    "id": "node-async-carinderia-10",
    "index": 110,
    "task": "You will see that a zero-delay timer still runs after other code. Add the code below at the end of app.js. The setTimeout runs after the sync code, even though it's zero delay. The checker confirms that Sync done prints before Timer done. Run the checker to check your work.\n\nIn app.js:\n```\nsetTimeout(() => console.log(\"Timer done\"), 0);\nconsole.log(\"Sync done\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "order",
        "label": "Sync done prints before Timer done",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Sync done\nTimer done"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "setTimeout with 0 delay runs after the current code, even if it's fast."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nsetTimeout(() => console.log(\"Timer done\"), 0);\nconsole.log(\"Sync done\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Adobo\")}`);\nconst prices = await Promise.all([\"Adobo\", \"Pancit\", \"Lumpia\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Adobo\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\nfor (const name of [\"Adobo\", \"Pancit\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\nlet ticks = 0;\nconst timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log(\"Ticks: 3\"); } }, 10);\nsetTimeout(() => console.log(\"Timer done\"), 0);\nconsole.log(\"Sync done\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "async-carinderia"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: cli-carinderia.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-cli-carinderia-1",
    "index": 111,
    "task": "You will add one line to app.js. This line counts how many words you typed after node app.js. The checker runs node app.js Adobo 2 to test it. Run the checker and paste its report.\n\nIn app.js:\n```\nconsole.log(`You typed ${args.length} words`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "words",
        "label": "node app.js Adobo 2 prints You typed 2 words",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Adobo",
          "2"
        ],
        "value": "You typed 2 words"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Count the words after node app.js. Use args.length to get the number."
      },
      {
        "level": 2,
        "text": "Add this line at the end of app.js, right after the existing code.\n\nIn app.js:\n```\nconsole.log(`You typed ${args.length} words`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "cli-carinderia"
  },
  {
    "id": "node-cli-carinderia-2",
    "index": 112,
    "task": "You will split the first two words into name and quantity. The checker runs node app.js Adobo 2 to test it. Run the checker and paste its report.\n\nIn app.js:\n```\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "item",
        "label": "node app.js Adobo 2 prints Item: Adobo",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Adobo",
          "2"
        ],
        "value": "Item: Adobo"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use array destructuring to split the first two words into name and quantity."
      },
      {
        "level": 2,
        "text": "Add these two lines at the end of app.js, right after the previous code.\n\nIn app.js:\n```\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-carinderia"
  },
  {
    "id": "node-cli-carinderia-3",
    "index": 113,
    "task": "You will turn the quantity text into a number. The checker runs node app.js Adobo 2 to test it. Run the checker and paste its report.\n\nIn app.js:\n```\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "quantity",
        "label": "node app.js Adobo 2 prints Quantity: 2",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Adobo",
          "2"
        ],
        "value": "Quantity: 2"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use Number() to turn the text into a number."
      },
      {
        "level": 2,
        "text": "Add these two lines at the end of app.js, right after the previous code.\n\nIn app.js:\n```\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-carinderia"
  },
  {
    "id": "node-cli-carinderia-4",
    "index": 114,
    "task": "You will look up the item's price and print the total cost. The checker runs node app.js Adobo 2 to test it. Run the checker and paste its report.\n\nIn app.js:\n```\nconst prices = { \"Adobo\": 80, \"Pancit\": 60, \"Lumpia\": 15 };\nconsole.log(`Total: ${prices[name] * count}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "total",
        "label": "node app.js Adobo 2 prints Total: 160",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Adobo",
          "2"
        ],
        "value": "Total: 160"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Create a prices object with item names and their prices. Multiply the price by the count."
      },
      {
        "level": 2,
        "text": "Add these two lines at the end of app.js, right after the previous code.\n\nIn app.js:\n```\nconst prices = { \"Adobo\": 80, \"Pancit\": 60, \"Lumpia\": 15 };\nconsole.log(`Total: ${prices[name] * count}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Adobo\": 80, \"Pancit\": 60, \"Lumpia\": 15 };\nconsole.log(`Total: ${prices[name] * count}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "cli-carinderia"
  },
  {
    "id": "node-cli-carinderia-5",
    "index": 115,
    "task": "You will add a check to stop the program if no item is typed. The checker runs node app.js with no words to test it. Run the checker and paste its report.\n\nIn app.js:\n```\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "exit",
        "label": "node app.js with no words ends with exit code 1",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 1
      },
      {
        "id": "usage",
        "label": "It explains how to use the tool",
        "kind": "local-node-stderr",
        "file": "app.js",
        "value": "Usage: node app.js <item> <quantity>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Check if name is empty. If so, print a message and exit with code 1."
      },
      {
        "level": 2,
        "text": "Add this line right after the line that sets name and quantity.\n\nIn app.js:\n```\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Adobo\": 80, \"Pancit\": 60, \"Lumpia\": 15 };\nconsole.log(`Total: ${prices[name] * count}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-carinderia"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: cli-carinderia.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-cli-carinderia-6",
    "index": 116,
    "task": "You will add a line to stop the program if the item is not in the price list. This line goes right before the last console.log. The code below checks if the item name is not in the prices object. If it's not, it prints an error and stops with exit code 2. This helps the user know when they typed an item that doesn't exist. Run the checker to confirm it works.\n\nIn app.js:\n```\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "exit",
        "label": "node app.js Milk 1 ends with exit code 2",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "args": [
          "Milk",
          "1"
        ],
        "code": 2
      },
      {
        "id": "message",
        "label": "It reports Unknown item: Milk",
        "kind": "local-node-stderr",
        "file": "app.js",
        "args": [
          "Milk",
          "1"
        ],
        "value": "Unknown item: Milk"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of exit code 2 as a signal that something went wrong with the item."
      },
      {
        "level": 2,
        "text": "Place the code right before the last console.log in app.js.\n\nIn app.js:\n```\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Adobo\": 80, \"Pancit\": 60, \"Lumpia\": 15 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconsole.log(`Total: ${prices[name] * count}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "cli-carinderia"
  },
  {
    "id": "node-cli-carinderia-7",
    "index": 117,
    "task": "You will add a line to stop the program if the quantity is not a whole number. This line goes right after the line that sets count. The code below checks if the quantity is not a whole number or less than 1. If so, it prints an error and stops with exit code 3. This stops bad input from causing problems. Run the checker to confirm it works.\n\nIn app.js:\n```\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "exit",
        "label": "node app.js Adobo abc ends with exit code 3",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "args": [
          "Adobo",
          "abc"
        ],
        "code": 3
      },
      {
        "id": "fine",
        "label": "node app.js Adobo 2 still works",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "args": [
          "Adobo",
          "2"
        ],
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Check if the quantity is a whole number using the built-in function."
      },
      {
        "level": 2,
        "text": "Place the code right after the line that sets count in app.js.\n\nIn app.js:\n```\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Adobo\": 80, \"Pancit\": 60, \"Lumpia\": 15 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconsole.log(`Total: ${prices[name] * count}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-carinderia"
  },
  {
    "id": "node-cli-carinderia-8",
    "index": 118,
    "task": "You will add two lines to print a thank-you message only when --receipt is typed. This goes at the end of the file. The code below creates a variable called receipt that checks if --receipt is in the args. If it is, it prints 'Receipt: thank you!'. This lets the user know they're getting a receipt. Run the checker to confirm it works.\n\nIn app.js:\n```\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "flag",
        "label": "node app.js Adobo 2 --receipt prints the receipt line",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Adobo",
          "2",
          "--receipt"
        ],
        "value": "Receipt: thank you!"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The receipt message only appears if --receipt is typed in the command."
      },
      {
        "level": 2,
        "text": "Add the two lines at the very end of app.js, after the total line.\n\nIn app.js:\n```\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Adobo\": 80, \"Pancit\": 60, \"Lumpia\": 15 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconsole.log(`Total: ${prices[name] * count}`);\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "cli-carinderia"
  },
  {
    "id": "node-cli-carinderia-9",
    "index": 119,
    "task": "You will add one line to get the currency from an environment variable or use PHP by default. This goes before the total line. The code below sets a variable called currency to the value of CURRENCY from the environment, or PHP if it's not set. Then it changes the total line to use that currency. This lets you change the currency without editing the code. Run the checker to confirm it works.\n\nIn app.js:\n```\nconst currency = process.env.CURRENCY ?? \"PHP\";\nconsole.log(`Total: ${currency} ${prices[name] * count}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "currency",
        "label": "With CURRENCY=USD it prints Total: USD 160",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Adobo",
          "2"
        ],
        "env": {
          "CURRENCY": "USD"
        },
        "value": "Total: USD 160"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use process.env.CURRENCY to get the currency from the environment, or PHP if it's not set."
      },
      {
        "level": 2,
        "text": "Place the line before the total line in app.js.\n\nIn app.js:\n```\nconst currency = process.env.CURRENCY ?? \"PHP\";\nconsole.log(`Total: ${currency} ${prices[name] * count}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Adobo\": 80, \"Pancit\": 60, \"Lumpia\": 15 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconst currency = process.env.CURRENCY ?? \"PHP\";\nconsole.log(`Total: ${currency} ${prices[name] * count}`);\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-carinderia"
  },
  {
    "id": "node-cli-carinderia-10",
    "index": 120,
    "task": "You will add one line to print usage and stop normally when --help is typed. This goes right after the first line. The code below checks if the first argument is --help. If it is, it prints the usage message and stops with exit code 0. This helps users know how to use the program. Run the checker to confirm it works.\n\nIn app.js:\n```\nif (args[0] === \"--help\") { console.log(\"Usage: node app.js <item> <quantity> [--receipt]\"); process.exit(0); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "help",
        "label": "node app.js --help prints the usage",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "--help"
        ],
        "value": "[--receipt]"
      },
      {
        "id": "exit",
        "label": "node app.js --help ends with exit code 0",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "args": [
          "--help"
        ],
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The usage message tells users how to run the program."
      },
      {
        "level": 2,
        "text": "Place the code right after the first line in app.js.\n\nIn app.js:\n```\nif (args[0] === \"--help\") { console.log(\"Usage: node app.js <item> <quantity> [--receipt]\"); process.exit(0); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nif (args[0] === \"--help\") { console.log(\"Usage: node app.js <item> <quantity> [--receipt]\"); process.exit(0); }\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Adobo\": 80, \"Pancit\": 60, \"Lumpia\": 15 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconst currency = process.env.CURRENCY ?? \"PHP\";\nconsole.log(`Total: ${currency} ${prices[name] * count}`);\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "cli-carinderia"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: config-carinderia.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-config-carinderia-1",
    "index": 121,
    "task": "You will read the PLACE environment variable. This tells where the carinderia is. Add the code below at the end of app.js. Then run the checker to test it. The checker sets PLACE to Carinderia. After you run it, you will see the text: Place: Carinderia.\n\nIn app.js:\n```\nconst place = process.env.PLACE;\nconsole.log(`Place: ${place}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "place",
        "label": "With PLACE=Carinderia it prints Place: Carinderia",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "PLACE": "Carinderia"
        },
        "value": "Place: Carinderia"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You use process.env to read environment variables. Think of it like a secret box that holds settings."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst place = process.env.PLACE;\nconsole.log(`Place: ${place}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE;\nconsole.log(`Place: ${place}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "config-carinderia"
  },
  {
    "id": "node-config-carinderia-2",
    "index": 122,
    "task": "Now, if PLACE is not set, the program should say 'Unknown place'. Change the line that reads PLACE to use the ?? operator. Add the code below at the end of app.js. Then run the checker. Without PLACE, it will print: Place: Unknown place.\n\nIn app.js:\n```\nconst place = process.env.PLACE ?? \"Unknown place\";\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "fallback",
        "label": "Without PLACE it prints Place: Unknown place",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Place: Unknown place"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The ?? operator gives a default value if the first part is empty or not set."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst place = process.env.PLACE ?? \"Unknown place\";\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "config-carinderia"
  },
  {
    "id": "node-config-carinderia-3",
    "index": 123,
    "task": "You will read a LIMIT setting as a number. If LIMIT is not set, use 5 as the default. Add the code below at the end of app.js. Then run the checker. With LIMIT=12, it will print: Limit: 12.\n\nIn app.js:\n```\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "limit",
        "label": "With LIMIT=12 it prints Limit: 12",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "LIMIT": "12"
        },
        "value": "Limit: 12"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use Number() to turn a string into a number. The ?? operator gives a default if the setting is missing."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "config-carinderia"
  },
  {
    "id": "node-config-carinderia-4",
    "index": 124,
    "task": "You will turn on a debug message only when DEBUG is set to true. Add the code below at the end of app.js. Then run the checker. With DEBUG=true, it will print: Debug mode on.\n\nIn app.js:\n```\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "debug",
        "label": "With DEBUG=true it prints Debug mode on",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "DEBUG": "true"
        },
        "value": "Debug mode on"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use === to check if a string is exactly 'true'. This is not the same as true or false."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "config-carinderia"
  },
  {
    "id": "node-config-carinderia-5",
    "index": 125,
    "task": "You will collect all settings into one object. Then print it as JSON. Add the code below at the end of app.js. Then run the checker. With PLACE=Hall and LIMIT=3, it will print the settings as JSON.\n\nIn app.js:\n```\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "json",
        "label": "With PLACE=Hall and LIMIT=3 it prints the settings as JSON",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "PLACE": "Hall",
          "LIMIT": "3"
        },
        "value": "{\"place\":\"Hall\",\"limit\":3,\"debug\":false}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use an object to group settings together. Use JSON.stringify() to turn it into a string."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\n"
    },
    "estimatedMinutes": 4,
    "projectId": "config-carinderia"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: config-carinderia.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-config-carinderia-6",
    "index": 126,
    "task": "Add this line at the end of app.js. It checks if the API_KEY is missing. If it is, the program stops with error code 1. This stops bad things from happening when the secret is not set. Run the checker to see if it works.\n\nIn app.js:\n```\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "missing",
        "label": "Without API_KEY it ends with exit code 1",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 1
      },
      {
        "id": "present",
        "label": "With API_KEY it finishes normally",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "env": {
          "API_KEY": "sk12345"
        },
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the secret is missing, the program must stop right away."
      },
      {
        "level": 2,
        "text": "Put the code at the end of app.js, right before the last line.\n\nIn app.js:\n```\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\n"
    },
    "estimatedMinutes": 3,
    "projectId": "config-carinderia"
  },
  {
    "id": "node-config-carinderia-7",
    "index": 127,
    "task": "Add these two lines at the end of app.js. The first line gets the secret. The second prints only the first two letters, then hides the rest with stars. This keeps the secret safe. Run the checker to test it.\n\nIn app.js:\n```\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "masked",
        "label": "With API_KEY=sk12345 it prints Key: sk***",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "API_KEY": "sk12345"
        },
        "value": "Key: sk***"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Hide the secret by showing only the first two letters, then use stars."
      },
      {
        "level": 2,
        "text": "Put the code at the end of app.js, right after the previous code.\n\nIn app.js:\n```\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "config-carinderia"
  },
  {
    "id": "node-config-carinderia-8",
    "index": 128,
    "task": "Add these three lines at the end of app.js. The first imports a tool to read files. The next reads config.json and turns it into a JavaScript object. The last prints the currency from that file. Run the checker to test it.\n\nIn app.js:\n```\nimport { readFile } from \"node:fs/promises\";\nconst fileConfig = JSON.parse(await readFile(\"config.json\", \"utf8\"));\nconsole.log(`Currency: ${fileConfig.currency}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "currency",
        "label": "It prints Currency: PHP from config.json",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "API_KEY": "sk12345"
        },
        "value": "Currency: PHP"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the tool to read the file, then turn it into a JavaScript object."
      },
      {
        "level": 2,
        "text": "Put the code at the end of app.js, right after the previous code.\n\nIn app.js:\n```\nimport { readFile } from \"node:fs/promises\";\nconst fileConfig = JSON.parse(await readFile(\"config.json\", \"utf8\"));\nconsole.log(`Currency: ${fileConfig.currency}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\nconst fileConfig = JSON.parse(await readFile(\"config.json\", \"utf8\"));\nconsole.log(`Currency: ${fileConfig.currency}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "config-carinderia"
  },
  {
    "id": "node-config-carinderia-9",
    "index": 129,
    "task": "Add these two lines at the end of app.js. The first gets the CURRENCY from the environment, or uses the one from config.json if none is set. The second prints what it is using. Run the checker to test it.\n\nIn app.js:\n```\nconst currency = process.env.CURRENCY ?? fileConfig.currency;\nconsole.log(`Using ${currency}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "override",
        "label": "With CURRENCY=USD it prints Using USD",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "API_KEY": "sk12345",
          "CURRENCY": "USD"
        },
        "value": "Using USD"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If CURRENCY is set, use it. If not, use the one from config.json."
      },
      {
        "level": 2,
        "text": "Put the code at the end of app.js, right after the previous code.\n\nIn app.js:\n```\nconst currency = process.env.CURRENCY ?? fileConfig.currency;\nconsole.log(`Using ${currency}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\nconst fileConfig = JSON.parse(await readFile(\"config.json\", \"utf8\"));\nconsole.log(`Currency: ${fileConfig.currency}`);\nconst currency = process.env.CURRENCY ?? fileConfig.currency;\nconsole.log(`Using ${currency}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "config-carinderia"
  },
  {
    "id": "node-config-carinderia-10",
    "index": 130,
    "task": "Add these two lines at the end of app.js. The first checks if NODE_ENV is production. If yes, it sets mode to production. If not, it sets mode to development. The second prints the mode. Run the checker to test it.\n\nIn app.js:\n```\nconst mode = process.env.NODE_ENV === \"production\" ? \"production\" : \"development\";\nconsole.log(`Mode: ${mode}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "mode",
        "label": "With NODE_ENV=production it prints Mode: production",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "API_KEY": "sk12345",
          "NODE_ENV": "production"
        },
        "value": "Mode: production"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If NODE_ENV is production, the mode is production. Otherwise, it's development."
      },
      {
        "level": 2,
        "text": "Put the code at the end of app.js, right after the previous code.\n\nIn app.js:\n```\nconst mode = process.env.NODE_ENV === \"production\" ? \"production\" : \"development\";\nconsole.log(`Mode: ${mode}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\nconst fileConfig = JSON.parse(await readFile(\"config.json\", \"utf8\"));\nconsole.log(`Currency: ${fileConfig.currency}`);\nconst currency = process.env.CURRENCY ?? fileConfig.currency;\nconsole.log(`Using ${currency}`);\nconst mode = process.env.NODE_ENV === \"production\" ? \"production\" : \"development\";\nconsole.log(`Mode: ${mode}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "config-carinderia"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: folders-carinderia.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-folders-carinderia-1",
    "index": 131,
    "task": "You will add two lines to the end of app.js. The first line builds a path using path.join. The second line prints that path with forward slashes. This helps you write paths that work on any computer. The code below does this. Run the checker to see if it works.\n\nIn app.js:\n```\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Adobo 80\n",
      "records/b.txt": "Pancit 60\n",
      "records/notes.md": "# Notes\nKeep Carinderia records here.\n"
    },
    "tests": [
      {
        "id": "joined",
        "label": "The script prints records/a.txt",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "records/a.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of path.join as a tool that puts folder names together safely."
      },
      {
        "level": 2,
        "text": "Add the two lines at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\n"
    },
    "estimatedMinutes": 4,
    "projectId": "folders-carinderia"
  },
  {
    "id": "node-folders-carinderia-2",
    "index": 132,
    "task": "You will add one line to the end of app.js. This line gets the file's extension using path.extname. The checker will confirm it prints .txt. The code below does this. Run the checker to check your work.\n\nIn app.js:\n```\nconsole.log(`Extension: ${path.extname(file)}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Adobo 80\n",
      "records/b.txt": "Pancit 60\n",
      "records/notes.md": "# Notes\nKeep Carinderia records here.\n"
    },
    "tests": [
      {
        "id": "ext",
        "label": "The script prints Extension: .txt",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Extension: .txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The extension is the part after the last dot, like .txt or .md."
      },
      {
        "level": 2,
        "text": "Add this line at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconsole.log(`Extension: ${path.extname(file)}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "folders-carinderia"
  },
  {
    "id": "node-folders-carinderia-3",
    "index": 133,
    "task": "You will add one line to the end of app.js. This line gets the file name without its extension using path.basename. The checker will confirm it prints a. The code below does this. Run the checker to check your work.\n\nIn app.js:\n```\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Adobo 80\n",
      "records/b.txt": "Pancit 60\n",
      "records/notes.md": "# Notes\nKeep Carinderia records here.\n"
    },
    "tests": [
      {
        "id": "base",
        "label": "The script prints Base: a",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Base: a"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "path.basename removes the extension, so it leaves only the name."
      },
      {
        "level": 2,
        "text": "Add this line at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "folders-carinderia"
  },
  {
    "id": "node-folders-carinderia-4",
    "index": 134,
    "task": "You will add an import and two lines to app.js. The import brings in a tool to read folder contents. The two lines read the records folder and print how many files it has. The code below does this. Run the checker to check your work.\n\nIn app.js:\n```\nimport { readdir } from \"node:fs/promises\";\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Adobo 80\n",
      "records/b.txt": "Pancit 60\n",
      "records/notes.md": "# Notes\nKeep Carinderia records here.\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The script prints Files: 3",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Files: 3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The tool readdir reads folder contents. You must wait for it to finish with await."
      },
      {
        "level": 2,
        "text": "Add the import as the second line, then the two lines after the import.\n\nIn app.js:\n```\nimport { readdir } from \"node:fs/promises\";\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "folders-carinderia"
  },
  {
    "id": "node-folders-carinderia-5",
    "index": 135,
    "task": "You will add two lines to the end of app.js. The first line filters the list to keep only .txt files. The second line prints how many there are. The code below does this. Run the checker to check your work.\n\nIn app.js:\n```\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Adobo 80\n",
      "records/b.txt": "Pancit 60\n",
      "records/notes.md": "# Notes\nKeep Carinderia records here.\n"
    },
    "tests": [
      {
        "id": "txt",
        "label": "The script prints Text files: 2",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Text files: 2"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use filter to keep only files ending with .txt. The condition checks the extension."
      },
      {
        "level": 2,
        "text": "Add these two lines at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "folders-carinderia"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: folders-carinderia.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-folders-carinderia-6",
    "index": 136,
    "task": "You add mkdir to the import list. This lets you make folders. You add one line at the end to make the archive folder. This folder will hold your copied files. Run `node app.js` to test it. The checker will confirm the folder exists.\n\nIn app.js:\n```\nimport { readdir, mkdir } from \"node:fs/promises\";\nawait mkdir(\"archive\", { recursive: true });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Adobo 80\n",
      "records/b.txt": "Pancit 60\n",
      "records/notes.md": "# Notes\nKeep Carinderia records here.\n"
    },
    "tests": [
      {
        "id": "archive",
        "label": "The archive folder exists",
        "kind": "local-dir-exists",
        "path": "archive"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of mkdir like a tool to build a new folder. You need it to make the archive folder."
      },
      {
        "level": 2,
        "text": "Add the line at the end of the file, right after the import list.\n\nIn app.js:\n```\nimport { readdir, mkdir } from \"node:fs/promises\";\nawait mkdir(\"archive\", { recursive: true });\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir, mkdir } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\nawait mkdir(\"archive\", { recursive: true });\n"
    },
    "estimatedMinutes": 3,
    "projectId": "folders-carinderia"
  },
  {
    "id": "node-folders-carinderia-7",
    "index": 137,
    "task": "You add copyFile to the import list. This lets you copy files. You add one line at the end to copy records/a.txt into the archive folder. Run `node app.js` to test it. The checker will confirm the file was copied to archive/a.txt.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile } from \"node:fs/promises\";\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Adobo 80\n",
      "records/b.txt": "Pancit 60\n",
      "records/notes.md": "# Notes\nKeep Carinderia records here.\n"
    },
    "tests": [
      {
        "id": "copied",
        "label": "archive/a.txt is a copy of records/a.txt",
        "kind": "local-file-contains",
        "path": "archive/a.txt",
        "value": "Adobo 80"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of copyFile like a tool to copy a file from one place to another."
      },
      {
        "level": 2,
        "text": "Add the line at the end of the file, right after the import list.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile } from \"node:fs/promises\";\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir, mkdir, copyFile } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\nawait mkdir(\"archive\", { recursive: true });\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\n"
    },
    "estimatedMinutes": 3,
    "projectId": "folders-carinderia"
  },
  {
    "id": "node-folders-carinderia-8",
    "index": 138,
    "task": "You add stat to the import list. This lets you check a file's details. You add two lines at the end to get the file's size and print it. The script will print the size in bytes. The checker will confirm the size is 9 bytes.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile, stat } from \"node:fs/promises\";\nconst info = await stat(file);\nconsole.log(`Size: ${info.size} bytes`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Adobo 80\n",
      "records/b.txt": "Pancit 60\n",
      "records/notes.md": "# Notes\nKeep Carinderia records here.\n"
    },
    "tests": [
      {
        "id": "size",
        "label": "The script prints Size: 9 bytes",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Size: 9 bytes"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of stat like a tool to check what a file is and how big it is."
      },
      {
        "level": 2,
        "text": "Add the two lines at the end of the file, after the import list.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile, stat } from \"node:fs/promises\";\nconst info = await stat(file);\nconsole.log(`Size: ${info.size} bytes`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir, mkdir, copyFile, stat } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\nawait mkdir(\"archive\", { recursive: true });\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\nconst info = await stat(file);\nconsole.log(`Size: ${info.size} bytes`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "folders-carinderia"
  },
  {
    "id": "node-folders-carinderia-9",
    "index": 139,
    "task": "You add rename to the import list. This lets you rename files. You add one line at the end to rename archive/a.txt to archive/a-old.txt. Run `node app.js` to test it. The checker will confirm the old file exists and the new one is gone.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile, stat, rename } from \"node:fs/promises\";\nawait rename(path.join(\"archive\", \"a.txt\"), path.join(\"archive\", \"a-old.txt\"));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Adobo 80\n",
      "records/b.txt": "Pancit 60\n",
      "records/notes.md": "# Notes\nKeep Carinderia records here.\n"
    },
    "tests": [
      {
        "id": "renamed",
        "label": "archive/a-old.txt exists",
        "kind": "local-file-exists",
        "path": "archive/a-old.txt"
      },
      {
        "id": "moved",
        "label": "archive/a.txt is gone",
        "kind": "local-path-missing",
        "path": "archive/a.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of rename like a tool to change a file's name. You are moving it to a new name."
      },
      {
        "level": 2,
        "text": "Add the line at the end of the file, right after the import list.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile, stat, rename } from \"node:fs/promises\";\nawait rename(path.join(\"archive\", \"a.txt\"), path.join(\"archive\", \"a-old.txt\"));\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir, mkdir, copyFile, stat, rename } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\nawait mkdir(\"archive\", { recursive: true });\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\nconst info = await stat(file);\nconsole.log(`Size: ${info.size} bytes`);\nawait rename(path.join(\"archive\", \"a.txt\"), path.join(\"archive\", \"a-old.txt\"));\n"
    },
    "estimatedMinutes": 3,
    "projectId": "folders-carinderia"
  },
  {
    "id": "node-folders-carinderia-10",
    "index": 140,
    "task": "You add one line at the end to use path.resolve. This turns the file path into a full path. You use path.isAbsolute to check if it's absolute. The script will print Absolute: true. The checker will confirm it is true.\n\nIn app.js:\n```\nconsole.log(`Absolute: ${path.isAbsolute(path.resolve(file))}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Carinderia Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Adobo 80\n",
      "records/b.txt": "Pancit 60\n",
      "records/notes.md": "# Notes\nKeep Carinderia records here.\n"
    },
    "tests": [
      {
        "id": "absolute",
        "label": "The script prints Absolute: true",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Absolute: true"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of path.resolve like a tool to fix a path so it works everywhere. It makes it full and clear."
      },
      {
        "level": 2,
        "text": "Add the line at the end of the file, right after the import list.\n\nIn app.js:\n```\nconsole.log(`Absolute: ${path.isAbsolute(path.resolve(file))}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir, mkdir, copyFile, stat, rename } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\nawait mkdir(\"archive\", { recursive: true });\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\nconst info = await stat(file);\nconsole.log(`Size: ${info.size} bytes`);\nawait rename(path.join(\"archive\", \"a.txt\"), path.join(\"archive\", \"a-old.txt\"));\nconsole.log(`Absolute: ${path.isAbsolute(path.resolve(file))}`);\n"
    },
    "estimatedMinutes": 2,
    "projectId": "folders-carinderia"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: scripts-barangay.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-scripts-barangay-1",
    "index": 141,
    "task": "Open the file app.js. It has one line. Change that line to print Barangay Office. This is the name of the store. Run the script with node app.js. The checker will confirm it prints Barangay Office.\n\nIn app.js:\n```\nconsole.log(\"Barangay Office\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "node app.js prints Barangay Office",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Barangay Office"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Change the text inside the console.log to Barangay Office."
      },
      {
        "level": 2,
        "text": "Type the code below at the end of app.js.\n\nIn app.js:\n```\nconsole.log(\"Barangay Office\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Barangay Office\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "scripts-barangay"
  },
  {
    "id": "node-scripts-barangay-2",
    "index": 142,
    "task": "Open app.js. Add two lines at the end. The first line sets a constant called item to \"Clearance\". The second line prints that value. This shows the product name. Run the script. The checker will confirm it prints Clearance on its own line.\n\nIn app.js:\n```\nconst item = \"Clearance\";\nconsole.log(item);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "item",
        "label": "The script prints Clearance on its own line",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Clearance\n"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use const to make item a constant. Set it to \"Clearance\"."
      },
      {
        "level": 2,
        "text": "Type the code below at the end of app.js.\n\nIn app.js:\n```\nconst item = \"Clearance\";\nconsole.log(item);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Barangay Office\");\nconst item = \"Clearance\";\nconsole.log(item);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "scripts-barangay"
  },
  {
    "id": "node-scripts-barangay-3",
    "index": 143,
    "task": "Open app.js. Add a new constant called price and set it to 50. Then change the last console.log to print both item and price together. This shows the product and its cost. Run the script. The checker will confirm it prints Clearance 50.\n\nIn app.js:\n```\nconst price = 50;\nconsole.log(item, price);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "pair",
        "label": "The script prints Clearance 50",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Clearance 50"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add price = 50 after item. Then update the console.log to show both."
      },
      {
        "level": 2,
        "text": "Type the code below at the end of app.js.\n\nIn app.js:\n```\nconst price = 50;\nconsole.log(item, price);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Barangay Office\");\nconst item = \"Clearance\";\nconst price = 50;\nconsole.log(item, price);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "scripts-barangay"
  },
  {
    "id": "node-scripts-barangay-4",
    "index": 144,
    "task": "Open app.js. Change the last console.log to use a template literal. It should print \"Clearance costs 50 pesos\". This uses backticks and dollar signs to insert values. Run the script. The checker will confirm it prints Clearance costs 50 pesos.\n\nIn app.js:\n```\nconsole.log(`${item} costs ${price} pesos`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "sentence",
        "label": "The script prints Clearance costs 50 pesos",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Clearance costs 50 pesos"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use backticks to wrap the sentence. Use ${item} and ${price} inside."
      },
      {
        "level": 2,
        "text": "Type the code below at the end of app.js.\n\nIn app.js:\n```\nconsole.log(`${item} costs ${price} pesos`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Barangay Office\");\nconst item = \"Clearance\";\nconst price = 50;\nconsole.log(`${item} costs ${price} pesos`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "scripts-barangay"
  },
  {
    "id": "node-scripts-barangay-5",
    "index": 145,
    "task": "Open app.js. Add two lines at the end. The first line makes an array called items with three strings: \"Clearance\", \"Permit\", \"ID\". The second line prints how many items are in the array. This shows the count. Run the script. The checker will confirm it prints Items: 3.\n\nIn app.js:\n```\nconst items = [\"Clearance\", \"Permit\", \"ID\"];\nconsole.log(`Items: ${items.length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
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
        "text": "Use [\"Clearance\", \"Permit\", \"ID\"] to make the array."
      },
      {
        "level": 2,
        "text": "Type the code below at the end of app.js.\n\nIn app.js:\n```\nconst items = [\"Clearance\", \"Permit\", \"ID\"];\nconsole.log(`Items: ${items.length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Barangay Office\");\nconst item = \"Clearance\";\nconst price = 50;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Clearance\", \"Permit\", \"ID\"];\nconsole.log(`Items: ${items.length}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "scripts-barangay"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: scripts-barangay.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-scripts-barangay-6",
    "index": 146,
    "task": "You will print each product name with a dash in front. Add the code below at the end of app.js. This makes the list look neat for the barangay office. Run the checker to confirm it works.\n\nIn app.js:\n```\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "last",
        "label": "The list ends with - ID",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "- ID"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of a list of names with dashes before each one."
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
      "app.js": "console.log(\"Barangay Office\");\nconst item = \"Clearance\";\nconst price = 50;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Clearance\", \"Permit\", \"ID\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "scripts-barangay"
  },
  {
    "id": "node-scripts-barangay-7",
    "index": 147,
    "task": "You will add up the three prices and print the total. Add the code below at the end of app.js. This helps the barangay office know how much to charge. Run the checker to confirm it works.\n\nIn app.js:\n```\nconst total = 50 + 300 + 20;\nconsole.log(`Total: ${total}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "total",
        "label": "The script prints Total: 370",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Total: 370"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the prices together: 50 + 300 + 20 equals 370."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, after the for loop.\n\nIn app.js:\n```\nconst total = 50 + 300 + 20;\nconsole.log(`Total: ${total}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Barangay Office\");\nconst item = \"Clearance\";\nconst price = 50;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Clearance\", \"Permit\", \"ID\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\nconst total = 50 + 300 + 20;\nconsole.log(`Total: ${total}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "scripts-barangay"
  },
  {
    "id": "node-scripts-barangay-8",
    "index": 148,
    "task": "You will add 12% tax to the total and print the new amount. Add the code below at the end of app.js. This shows the barangay office the final cost with tax. Run the checker to confirm it works.\n\nIn app.js:\n```\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "tax",
        "label": "The script prints With tax: 414",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "With tax: 414"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the arrow function to multiply the total by 1.12 for tax."
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
      "app.js": "console.log(\"Barangay Office\");\nconst item = \"Clearance\";\nconst price = 50;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Clearance\", \"Permit\", \"ID\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\nconst total = 50 + 300 + 20;\nconsole.log(`Total: ${total}`);\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "scripts-barangay"
  },
  {
    "id": "node-scripts-barangay-9",
    "index": 149,
    "task": "You will label the order as big if the total is over 100, or small if not. Add the code below at the end of app.js. This helps the barangay office decide if the order is large or small. Run the checker to confirm it works.\n\nIn app.js:\n```\nif (total > 100) console.log(\"Big order\");\nelse console.log(\"Small order\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "size",
        "label": "The script prints Big order",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Big order"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use if and else to check if total is bigger than 100."
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
      "app.js": "console.log(\"Barangay Office\");\nconst item = \"Clearance\";\nconst price = 50;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Clearance\", \"Permit\", \"ID\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\nconst total = 50 + 300 + 20;\nconsole.log(`Total: ${total}`);\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\nif (total > 100) console.log(\"Big order\");\nelse console.log(\"Small order\");\n"
    },
    "estimatedMinutes": 4,
    "projectId": "scripts-barangay"
  },
  {
    "id": "node-scripts-barangay-10",
    "index": 150,
    "task": "You will report a warning using console.error instead of console.log. Add the code below at the end of app.js. This shows the barangay office a warning message, but the script still finishes normally. Run the checker to confirm it works.\n\nIn app.js:\n```\nconsole.error(\"Low stock: ID\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "warning",
        "label": "The script reports Low stock: ID as an error message",
        "kind": "local-node-stderr",
        "file": "app.js",
        "value": "Low stock: ID"
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
        "text": "Use console.error to show warnings, not console.log."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, after the if-else block.\n\nIn app.js:\n```\nconsole.error(\"Low stock: ID\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Barangay Office\");\nconst item = \"Clearance\";\nconst price = 50;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Clearance\", \"Permit\", \"ID\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\nconst total = 50 + 300 + 20;\nconsole.log(`Total: ${total}`);\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\nif (total > 100) console.log(\"Big order\");\nelse console.log(\"Small order\");\nconsole.error(\"Low stock: ID\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "scripts-barangay"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: modules-barangay.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-modules-barangay-1",
    "index": 151,
    "task": "Create a new file called prices.js. Put this code inside it. This file will hold the store's name. You will use this name later in your main program.\n\nIn prices.js:\n```\nexport const storeName = \"Barangay Office\";\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "export",
        "label": "prices.js exports storeName",
        "kind": "local-file-contains",
        "path": "prices.js",
        "value": "export const storeName"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of prices.js as a small notebook that holds store info."
      },
      {
        "level": 2,
        "text": "Put the code in a file named prices.js in your project folder.\n\nIn prices.js:\n```\nexport const storeName = \"Barangay Office\";\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "prices.js": "export const storeName = \"Barangay Office\";\n"
    },
    "estimatedMinutes": 3,
    "projectId": "modules-barangay"
  },
  {
    "id": "node-modules-barangay-2",
    "index": 152,
    "task": "Open app.js. Add this import at the top. Then add this line at the end. This tells app.js to use the store name from prices.js and print it.\n\nIn app.js:\n```\nimport { storeName } from \"./prices.js\";\nconsole.log(storeName);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "imported",
        "label": "node app.js prints Barangay Office from prices.js",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Barangay Office"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are borrowing the store name from prices.js like sharing a book."
      },
      {
        "level": 2,
        "text": "Put the import and console.log lines in app.js, right after the import section.\n\nIn app.js:\n```\nimport { storeName } from \"./prices.js\";\nconsole.log(storeName);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { storeName } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-barangay"
  },
  {
    "id": "node-modules-barangay-3",
    "index": 153,
    "task": "In prices.js, add this code to define the prices. In app.js, add this import and this line to print the price of Clearance. This lets you show the price of items later.\n\nIn prices.js:\n```\nexport const prices = { \"Clearance\": 50, \"Permit\": 300, \"ID\": 20 };\n```\n\nIn app.js:\n```\nimport { storeName, prices } from \"./prices.js\";\nconsole.log(prices[\"Clearance\"]);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "price",
        "label": "The script prints 50 on its own line",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "50\n"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the prices object to prices.js so it can be used by other files."
      },
      {
        "level": 2,
        "text": "In app.js, add the import for prices and print the price using the key 'Clearance'.\n\nIn prices.js:\n```\nexport const prices = { \"Clearance\": 50, \"Permit\": 300, \"ID\": 20 };\n```\n\nIn app.js:\n```\nimport { storeName, prices } from \"./prices.js\";\nconsole.log(prices[\"Clearance\"]);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "prices.js": "export const storeName = \"Barangay Office\";\nexport const prices = { \"Clearance\": 50, \"Permit\": 300, \"ID\": 20 };\n",
      "app.js": "import { storeName, prices } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Clearance\"]);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "modules-barangay"
  },
  {
    "id": "node-modules-barangay-4",
    "index": 154,
    "task": "In prices.js, add a function called priceOf. This function will look up a price by name. If the item is not found, it will return 0. This helps you find prices without typing them every time.\n\nIn prices.js:\n```\nexport function priceOf(name) {\n  return prices[name] ?? 0;\n}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "function",
        "label": "prices.js exports priceOf",
        "kind": "local-file-contains",
        "path": "prices.js",
        "value": "export function priceOf(name)"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The function priceOf takes a name and returns a price or 0 if not found."
      },
      {
        "level": 2,
        "text": "Add the function at the end of prices.js, after the prices object.\n\nIn prices.js:\n```\nexport function priceOf(name) {\n  return prices[name] ?? 0;\n}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "prices.js": "export const storeName = \"Barangay Office\";\nexport const prices = { \"Clearance\": 50, \"Permit\": 300, \"ID\": 20 };\nexport function priceOf(name) {\n  return prices[name] ?? 0;\n}\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-barangay"
  },
  {
    "id": "node-modules-barangay-5",
    "index": 155,
    "task": "In app.js, add this import for the new function. Then add this line to print the price of Permit. This shows how to use the function to get prices.\n\nIn app.js:\n```\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(`Permit: ${priceOf(\"Permit\")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "lookup",
        "label": "The script prints Permit: 300",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Permit: 300"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are now using the priceOf function to get the price of Permit."
      },
      {
        "level": 2,
        "text": "Add the import for priceOf and the console.log line at the end of app.js.\n\nIn app.js:\n```\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(`Permit: ${priceOf(\"Permit\")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Clearance\"]);\nconsole.log(`Permit: ${priceOf(\"Permit\")}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-barangay"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: modules-barangay.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-modules-barangay-6",
    "index": 156,
    "task": "Open the file prices.js. At the end, add a default export. This export will format an amount as pesos. The code below does that. Run the checker to confirm it works.\n\nIn prices.js:\n```\nexport default function formatPeso(amount) {\n  return `PHP ${amount.toFixed(2)}`;\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "default",
        "label": "prices.js has a default export",
        "kind": "local-file-contains",
        "path": "prices.js",
        "value": "export default function formatPeso"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are adding a function that turns numbers into pesos format."
      },
      {
        "level": 2,
        "text": "Add it at the end of prices.js, right after the last line.\n\nIn prices.js:\n```\nexport default function formatPeso(amount) {\n  return `PHP ${amount.toFixed(2)}`;\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "prices.js": "export const storeName = \"Barangay Office\";\nexport const prices = { \"Clearance\": 50, \"Permit\": 300, \"ID\": 20 };\nexport function priceOf(name) {\n  return prices[name] ?? 0;\n}\nexport default function formatPeso(amount) {\n  return `PHP ${amount.toFixed(2)}`;\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "modules-barangay"
  },
  {
    "id": "node-modules-barangay-7",
    "index": 157,
    "task": "Open app.js. At the top, add an import for the default export. Then add a line at the end to print 50 as pesos. The code below does that. Run the checker to confirm it prints PHP 50.00.\n\nIn app.js:\n```\nimport formatPeso from \"./prices.js\";\nconsole.log(formatPeso(50));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "peso",
        "label": "The script prints PHP 50.00",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "PHP 50.00"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are bringing in the function to use it in app.js."
      },
      {
        "level": 2,
        "text": "Add the import at the top, then the print line at the end.\n\nIn app.js:\n```\nimport formatPeso from \"./prices.js\";\nconsole.log(formatPeso(50));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import formatPeso from \"./prices.js\";\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Clearance\"]);\nconsole.log(`Permit: ${priceOf(\"Permit\")}`);\nconsole.log(formatPeso(50));\n"
    },
    "estimatedMinutes": 3,
    "projectId": "modules-barangay"
  },
  {
    "id": "node-modules-barangay-8",
    "index": 158,
    "task": "Open app.js. Add an import for the node:os module. Use its platform property to print the operating system name. The code below does that. Run the checker to confirm it prints your system name.\n\nIn app.js:\n```\nimport { platform } from \"node:os\";\nconsole.log(`Running on ${platform()}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "os",
        "label": "The script prints Running on and your system name",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Running on "
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are using Node's built-in module to get system info."
      },
      {
        "level": 2,
        "text": "Add the import at the top, then the print line at the end.\n\nIn app.js:\n```\nimport { platform } from \"node:os\";\nconsole.log(`Running on ${platform()}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { platform } from \"node:os\";\nimport formatPeso from \"./prices.js\";\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Clearance\"]);\nconsole.log(`Permit: ${priceOf(\"Permit\")}`);\nconsole.log(formatPeso(50));\nconsole.log(`Running on ${platform()}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-barangay"
  },
  {
    "id": "node-modules-barangay-9",
    "index": 159,
    "task": "Open package.json. Add a scripts entry with a start command. This lets you run the app with npm run start. The code below adds it. Run the checker to confirm it's there.\n\nIn package.json:\n```\n  \"type\": \"module\",\n  \"scripts\": { \"start\": \"node app.js\" }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "script",
        "label": "package.json has a start script",
        "kind": "local-file-contains",
        "path": "package.json",
        "value": "\"start\": \"node app.js\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are telling npm how to run your app."
      },
      {
        "level": 2,
        "text": "Add the scripts entry inside package.json, under type.\n\nIn package.json:\n```\n  \"type\": \"module\",\n  \"scripts\": { \"start\": \"node app.js\" }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "package.json": "{\n  \"type\": \"module\",\n  \"scripts\": { \"start\": \"node app.js\" }\n}\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-barangay"
  },
  {
    "id": "node-modules-barangay-10",
    "index": 160,
    "task": "Open app.js. Add an import for priceOf under a new name, lookup. Then use it to print the last item's price. The code below does that. Run the checker to confirm it prints Last item: 20.\n\nIn app.js:\n```\nimport { priceOf as lookup } from \"./prices.js\";\nconsole.log(`Last item: ${lookup(\"ID\")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "alias",
        "label": "The script prints Last item: 20",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Last item: 20"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are renaming an import to make it easier to use."
      },
      {
        "level": 2,
        "text": "Add the import at the top, then the print line at the end.\n\nIn app.js:\n```\nimport { priceOf as lookup } from \"./prices.js\";\nconsole.log(`Last item: ${lookup(\"ID\")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { priceOf as lookup } from \"./prices.js\";\nimport { platform } from \"node:os\";\nimport formatPeso from \"./prices.js\";\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Clearance\"]);\nconsole.log(`Permit: ${priceOf(\"Permit\")}`);\nconsole.log(formatPeso(50));\nconsole.log(`Running on ${platform()}`);\nconsole.log(`Last item: ${lookup(\"ID\")}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-barangay"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: files-barangay.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-files-barangay-1",
    "index": 161,
    "task": "You will read the file stock.txt. The code below reads it and prints its text. Replace the console.log line in app.js with those two lines. This lets you see the file's content in the terminal. Run the checker to confirm.\n\nIn app.js:\n```\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Clearance,50\nPermit,300\nID,20\n"
    },
    "tests": [
      {
        "id": "text",
        "label": "The script prints the line Clearance,50 from stock.txt",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Clearance,50"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of readFile as opening a door to the file's content."
      },
      {
        "level": 2,
        "text": "Put the two lines right after the import line in app.js.\n\nIn app.js:\n```\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "files-barangay"
  },
  {
    "id": "node-files-barangay-2",
    "index": 162,
    "task": "You will split the text into lines. The code below splits the text and prints how many lines there are. Add those two lines at the end of app.js. This helps you count the items in the file. Run the checker to confirm.\n\nIn app.js:\n```\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Clearance,50\nPermit,300\nID,20\n"
    },
    "tests": [
      {
        "id": "lines",
        "label": "The script prints Lines: 3",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Lines: 3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use split to break the text into parts, like cutting a rope into pieces."
      },
      {
        "level": 2,
        "text": "Add the lines after the previous code in app.js.\n\nIn app.js:\n```\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "files-barangay"
  },
  {
    "id": "node-files-barangay-3",
    "index": 163,
    "task": "You will split each line by the comma and print the second item's name. The code below splits each line and prints the second part's first word. Add those two lines at the end of app.js. This helps you find the item name. Run the checker to confirm.\n\nIn app.js:\n```\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Clearance,50\nPermit,300\nID,20\n"
    },
    "tests": [
      {
        "id": "second",
        "label": "The script prints Second item: Permit",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Second item: Permit"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Split by comma to find the item name in each line."
      },
      {
        "level": 2,
        "text": "Add the lines after the previous code in app.js.\n\nIn app.js:\n```\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "files-barangay"
  },
  {
    "id": "node-files-barangay-4",
    "index": 164,
    "task": "You will turn each row into an object with a number price and print the cheapest price. The code below turns each row into an object and finds the lowest price. Add those two lines at the end of app.js. This helps you find the cheapest item. Run the checker to confirm.\n\nIn app.js:\n```\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Clearance,50\nPermit,300\nID,20\n"
    },
    "tests": [
      {
        "id": "cheapest",
        "label": "The script prints Cheapest: 20",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Cheapest: 20"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use map to turn each row into an object with a price."
      },
      {
        "level": 2,
        "text": "Add the lines after the previous code in app.js.\n\nIn app.js:\n```\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "files-barangay"
  },
  {
    "id": "node-files-barangay-5",
    "index": 165,
    "task": "You will write a report file with the number of items. The code below adds writeFile to the import and writes a line to report.txt. Add these lines at the end of app.js. Then run `node app.js` to create the file. Run the checker to confirm.\n\nIn app.js:\n```\nimport { readFile, writeFile } from \"node:fs/promises\";\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Clearance,50\nPermit,300\nID,20\n"
    },
    "tests": [
      {
        "id": "report",
        "label": "report.txt says Items: 3",
        "kind": "local-file-contains",
        "path": "report.txt",
        "value": "Items: 3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "WriteFile saves text to a new file on your computer."
      },
      {
        "level": 2,
        "text": "Add the two lines at the end of app.js, then run `node app.js`.\n\nIn app.js:\n```\nimport { readFile, writeFile } from \"node:fs/promises\";\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "files-barangay"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: files-barangay.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-files-barangay-6",
    "index": 166,
    "task": "You will save the item objects as a JSON file. Add this line at the end of app.js. This saves the items to a file named stock.json. Run the command `node app.js` to test it. The checker confirms that stock.json holds Clearance as JSON.\n\nIn app.js:\n```\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Clearance,50\nPermit,300\nID,20\n"
    },
    "tests": [
      {
        "id": "json",
        "label": "stock.json holds Clearance as JSON",
        "kind": "local-file-contains",
        "path": "stock.json",
        "value": "\"name\": \"Clearance\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of JSON as a way to store data in a file that can be read by programs later."
      },
      {
        "level": 2,
        "text": "Add the line right after the last line of code in app.js.\n\nIn app.js:\n```\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\n"
    },
    "estimatedMinutes": 3,
    "projectId": "files-barangay"
  },
  {
    "id": "node-files-barangay-7",
    "index": 167,
    "task": "You will read the saved JSON file back into objects and print how many items were saved. Add these two lines at the end of app.js. The first line reads the file, the second prints the count. The checker confirms the script prints 'Saved: 3 items'.\n\nIn app.js:\n```\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Clearance,50\nPermit,300\nID,20\n"
    },
    "tests": [
      {
        "id": "saved",
        "label": "The script prints Saved: 3 items",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Saved: 3 items"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Read the file like you read a note, then count the items in it."
      },
      {
        "level": 2,
        "text": "Add these lines right after the last line of code in app.js.\n\nIn app.js:\n```\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "files-barangay"
  },
  {
    "id": "node-files-barangay-8",
    "index": 168,
    "task": "You will add a line to report.txt without replacing what's already there. Add this to the import section: `appendFile` from node:fs/promises. Then add this line at the end: `await appendFile(\"report.txt\", \"Checked today\\n\");`. Run `node app.js` to test. The checker confirms report.txt ends with 'Checked today' but still says 'Items: 3'.\n\nIn app.js:\n```\nimport { readFile, writeFile, appendFile } from \"node:fs/promises\";\nawait appendFile(\"report.txt\", \"Checked today\\n\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Clearance,50\nPermit,300\nID,20\n"
    },
    "tests": [
      {
        "id": "appended",
        "label": "report.txt ends with Checked today",
        "kind": "local-file-contains",
        "path": "report.txt",
        "value": "Checked today"
      },
      {
        "id": "kept",
        "label": "report.txt still says Items: 3",
        "kind": "local-file-contains",
        "path": "report.txt",
        "value": "Items: 3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use appendFile to add to the end of a file, not to replace it."
      },
      {
        "level": 2,
        "text": "Add the import line right after the other imports, then add the append line at the end.\n\nIn app.js:\n```\nimport { readFile, writeFile, appendFile } from \"node:fs/promises\";\nawait appendFile(\"report.txt\", \"Checked today\\n\");\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile, appendFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\nawait appendFile(\"report.txt\", \"Checked today\\n\");\n"
    },
    "estimatedMinutes": 5,
    "projectId": "files-barangay"
  },
  {
    "id": "node-files-barangay-9",
    "index": 169,
    "task": "You will raise the first saved price by 7 and write the JSON file again. Add these two lines at the end: `saved[0].price += 7;` and `await writeFile(\"stock.json\", JSON.stringify(saved, null, 2));`. Run `node app.js` to test. The checker confirms stock.json now has Clearance at 57.\n\nIn app.js:\n```\nsaved[0].price += 7;\nawait writeFile(\"stock.json\", JSON.stringify(saved, null, 2));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Clearance,50\nPermit,300\nID,20\n"
    },
    "tests": [
      {
        "id": "raised",
        "label": "stock.json now has Clearance at 57",
        "kind": "local-file-contains",
        "path": "stock.json",
        "value": "\"price\": 57"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You are changing the first item's price by adding 7 to it."
      },
      {
        "level": 2,
        "text": "Add these lines right after the last line of code in app.js.\n\nIn app.js:\n```\nsaved[0].price += 7;\nawait writeFile(\"stock.json\", JSON.stringify(saved, null, 2));\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile, appendFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\nawait appendFile(\"report.txt\", \"Checked today\\n\");\nsaved[0].price += 7;\nawait writeFile(\"stock.json\", JSON.stringify(saved, null, 2));\n"
    },
    "estimatedMinutes": 4,
    "projectId": "files-barangay"
  },
  {
    "id": "node-files-barangay-10",
    "index": 170,
    "task": "You will read a file that does not exist and report the error code instead of crashing. Add this try-catch block at the end: `try { await readFile(\"missing.txt\", \"utf8\"); } catch (error) { console.error(`Could not read: ${error.code}`); }`. The checker confirms the script reports 'Could not read: ENOENT' and still finishes normally.\n\nIn app.js:\n```\ntry { await readFile(\"missing.txt\", \"utf8\"); }\ncatch (error) { console.error(`Could not read: ${error.code}`); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Clearance,50\nPermit,300\nID,20\n"
    },
    "tests": [
      {
        "id": "code",
        "label": "The script reports Could not read: ENOENT",
        "kind": "local-node-stderr",
        "file": "app.js",
        "value": "Could not read: ENOENT"
      },
      {
        "id": "finishes",
        "label": "The script still finishes normally",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Wrap the file reading in a try-catch to handle errors without crashing."
      },
      {
        "level": 2,
        "text": "Add this block right after the last line of code in app.js.\n\nIn app.js:\n```\ntry { await readFile(\"missing.txt\", \"utf8\"); }\ncatch (error) { console.error(`Could not read: ${error.code}`); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile, appendFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\nawait appendFile(\"report.txt\", \"Checked today\\n\");\nsaved[0].price += 7;\nawait writeFile(\"stock.json\", JSON.stringify(saved, null, 2));\ntry { await readFile(\"missing.txt\", \"utf8\"); }\ncatch (error) { console.error(`Could not read: ${error.code}`); }\n"
    },
    "estimatedMinutes": 5,
    "projectId": "files-barangay"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: async-barangay.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-async-barangay-1",
    "index": 171,
    "task": "You add two lines to the end of app.js. The first line pauses for 100 milliseconds. The second line prints After wait. This lets you see the pause before the next message. The code below does this. Run the checker and paste its report.\n\nIn app.js:\n```\nawait wait(100);\nconsole.log(\"After wait\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "after",
        "label": "The script prints Start and then After wait",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Start\nAfter wait"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of await like a pause button that waits for something to finish before moving on."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nawait wait(100);\nconsole.log(\"After wait\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "async-barangay"
  },
  {
    "id": "node-async-barangay-2",
    "index": 172,
    "task": "You add two lines to the end of app.js. The first line defines a function called fetchPrice. It takes a name and returns a price after waiting 20 milliseconds. The second line calls this function with \"Clearance\" and prints the result. The code below does this. Run the checker and paste its report.\n\nIn app.js:\n```\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Clearance\")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "price",
        "label": "The script prints Price: 90",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Price: 90"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "This function waits a little, then returns a number based on the name's length."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Clearance\")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Clearance\")}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "async-barangay"
  },
  {
    "id": "node-async-barangay-3",
    "index": 173,
    "task": "You add two lines to the end of app.js. The first line uses Promise.all to run fetchPrice on three names at the same time. The second line prints all the prices joined by commas. The code below does this. Run the checker and paste its report.\n\nIn app.js:\n```\nconst prices = await Promise.all([\"Clearance\", \"Permit\", \"ID\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "all",
        "label": "The script prints All: 90, 60, 20",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "All: 90, 60, 20"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Promise.all runs multiple promises at once and waits for all to finish."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst prices = await Promise.all([\"Clearance\", \"Permit\", \"ID\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Clearance\")}`);\nconst prices = await Promise.all([\"Clearance\", \"Permit\", \"ID\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "async-barangay"
  },
  {
    "id": "node-async-barangay-4",
    "index": 174,
    "task": "You add three lines to the end of app.js. The first line creates a slow promise that waits 200 milliseconds. The second line creates a fast promise that waits 20 milliseconds. The third line races them and prints which one finished first. The code below does this. Run the checker and paste its report.\n\nIn app.js:\n```\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "race",
        "label": "The script prints First: fast",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "First: fast"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Promise.race waits for the first promise to finish, even if others are still running."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Clearance\")}`);\nconst prices = await Promise.all([\"Clearance\", \"Permit\", \"ID\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "async-barangay"
  },
  {
    "id": "node-async-barangay-5",
    "index": 175,
    "task": "You add two lines to the end of app.js. The first line defines a function called failing that throws an error. The second line tries to run it and catches the error, printing its message to the error stream. The code below does this. Run the checker and paste its report.\n\nIn app.js:\n```\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "caught",
        "label": "The script reports Supplier offline",
        "kind": "local-node-stderr",
        "file": "app.js",
        "value": "Supplier offline"
      },
      {
        "id": "finishes",
        "label": "The script still finishes normally",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Try...catch lets you handle errors without stopping the whole script."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Clearance\")}`);\nconst prices = await Promise.all([\"Clearance\", \"Permit\", \"ID\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\n"
    },
    "estimatedMinutes": 5,
    "projectId": "async-barangay"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: async-barangay.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-async-barangay-6",
    "index": 176,
    "task": "You will add two lines to the end of app.js. The first line waits for both promises to finish, even if one fails. The second line prints the status of each. This helps you see if a task worked or not. The code below does that. Run the checker and paste its report.\n\nIn app.js:\n```\nconst results = await Promise.allSettled([fetchPrice(\"Clearance\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "settled",
        "label": "The script prints Settled: fulfilled rejected",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Settled: fulfilled rejected"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Wait for both tasks to finish, even if one fails."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js.\n\nIn app.js:\n```\nconst results = await Promise.allSettled([fetchPrice(\"Clearance\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Clearance\")}`);\nconst prices = await Promise.all([\"Clearance\", \"Permit\", \"ID\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Clearance\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "async-barangay"
  },
  {
    "id": "node-async-barangay-7",
    "index": 177,
    "task": "You will add a for...of loop to check two prices one after the other. The loop runs for each name in the list. It prints the name and the price. This lets you check multiple things without repeating code. The code below does that. Run the checker and paste its report.\n\nIn app.js:\n```\nfor (const name of [\"Clearance\", \"Permit\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "loop",
        "label": "The script prints Checked Permit: 60",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Checked Permit: 60"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use a loop to check each item in the list."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js.\n\nIn app.js:\n```\nfor (const name of [\"Clearance\", \"Permit\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Clearance\")}`);\nconst prices = await Promise.all([\"Clearance\", \"Permit\", \"ID\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Clearance\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\nfor (const name of [\"Clearance\", \"Permit\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "async-barangay"
  },
  {
    "id": "node-async-barangay-8",
    "index": 178,
    "task": "You will add one line to run cleanup after waiting. The finally block runs no matter if the wait succeeds or fails. This ensures cleanup happens always. The code below does that. Run the checker and paste its report.\n\nIn app.js:\n```\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "cleanup",
        "label": "The script prints Cleanup done",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Cleanup done"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use finally to run cleanup after waiting."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js.\n\nIn app.js:\n```\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Clearance\")}`);\nconst prices = await Promise.all([\"Clearance\", \"Permit\", \"ID\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Clearance\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\nfor (const name of [\"Clearance\", \"Permit\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\n"
    },
    "estimatedMinutes": 2,
    "projectId": "async-barangay"
  },
  {
    "id": "node-async-barangay-9",
    "index": 179,
    "task": "You will add two lines to repeat a task every 10 milliseconds. The first line sets up a timer. The second line counts ticks and stops after three. This lets you test how often something runs. The code below does that. Run the checker and paste its report.\n\nIn app.js:\n```\nlet ticks = 0;\nconst timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log(\"Ticks: 3\"); } }, 10);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "ticks",
        "label": "The script prints Ticks: 3",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Ticks: 3"
      },
      {
        "id": "stops",
        "label": "The script stops on its own",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Set up a timer to repeat a task every 10 milliseconds."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js.\n\nIn app.js:\n```\nlet ticks = 0;\nconst timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log(\"Ticks: 3\"); } }, 10);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Clearance\")}`);\nconst prices = await Promise.all([\"Clearance\", \"Permit\", \"ID\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Clearance\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\nfor (const name of [\"Clearance\", \"Permit\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\nlet ticks = 0;\nconst timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log(\"Ticks: 3\"); } }, 10);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "async-barangay"
  },
  {
    "id": "node-async-barangay-10",
    "index": 180,
    "task": "You will add two lines to show that a zero-delay timer still runs. The first line sets a timer with zero delay. The second line prints sync done. This shows that async tasks can run even after sync code. The code below does that. Run the checker and paste its report.\n\nIn app.js:\n```\nsetTimeout(() => console.log(\"Timer done\"), 0);\nconsole.log(\"Sync done\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "order",
        "label": "Sync done prints before Timer done",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Sync done\nTimer done"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Set a timer with zero delay to test async behavior."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js.\n\nIn app.js:\n```\nsetTimeout(() => console.log(\"Timer done\"), 0);\nconsole.log(\"Sync done\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Clearance\")}`);\nconst prices = await Promise.all([\"Clearance\", \"Permit\", \"ID\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Clearance\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\nfor (const name of [\"Clearance\", \"Permit\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\nlet ticks = 0;\nconst timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log(\"Ticks: 3\"); } }, 10);\nsetTimeout(() => console.log(\"Timer done\"), 0);\nconsole.log(\"Sync done\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "async-barangay"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: cli-barangay.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-cli-barangay-1",
    "index": 181,
    "task": "You will add a line to app.js. This line prints how many words you typed. The checker runs node app.js Clearance 2 to test it. After you add the line, run the checker and paste its report.\n\nIn app.js:\n```\nconsole.log(`You typed ${args.length} words`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "words",
        "label": "node app.js Clearance 2 prints You typed 2 words",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Clearance",
          "2"
        ],
        "value": "You typed 2 words"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The code uses args to get the words you typed."
      },
      {
        "level": 2,
        "text": "Add the line at the end of app.js.\n\nIn app.js:\n```\nconsole.log(`You typed ${args.length} words`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "cli-barangay"
  },
  {
    "id": "node-cli-barangay-2",
    "index": 182,
    "task": "You will add two lines to app.js. These lines split the first two words into name and quantity. The checker runs node app.js Clearance 2 to test it. After you add the lines, run the checker and paste its report.\n\nIn app.js:\n```\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "item",
        "label": "node app.js Clearance 2 prints Item: Clearance",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Clearance",
          "2"
        ],
        "value": "Item: Clearance"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the array syntax to split the words into name and quantity."
      },
      {
        "level": 2,
        "text": "Add the two lines at the end of app.js.\n\nIn app.js:\n```\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-barangay"
  },
  {
    "id": "node-cli-barangay-3",
    "index": 183,
    "task": "You will add two lines to app.js. These lines turn the quantity into a number and print it. The checker runs node app.js Clearance 2 to test it. After you add the lines, run the checker and paste its report.\n\nIn app.js:\n```\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "quantity",
        "label": "node app.js Clearance 2 prints Quantity: 2",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Clearance",
          "2"
        ],
        "value": "Quantity: 2"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use Number() to turn text into a number."
      },
      {
        "level": 2,
        "text": "Add the two lines at the end of app.js.\n\nIn app.js:\n```\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-barangay"
  },
  {
    "id": "node-cli-barangay-4",
    "index": 184,
    "task": "You will add two lines to app.js. These lines look up the price of the item and print the total cost. The checker runs node app.js Clearance 2 to test it. After you add the lines, run the checker and paste its report.\n\nIn app.js:\n```\nconst prices = { \"Clearance\": 50, \"Permit\": 300, \"ID\": 20 };\nconsole.log(`Total: ${prices[name] * count}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "total",
        "label": "node app.js Clearance 2 prints Total: 100",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Clearance",
          "2"
        ],
        "value": "Total: 100"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use a prices object to store item prices."
      },
      {
        "level": 2,
        "text": "Add the two lines at the end of app.js.\n\nIn app.js:\n```\nconst prices = { \"Clearance\": 50, \"Permit\": 300, \"ID\": 20 };\nconsole.log(`Total: ${prices[name] * count}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Clearance\": 50, \"Permit\": 300, \"ID\": 20 };\nconsole.log(`Total: ${prices[name] * count}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "cli-barangay"
  },
  {
    "id": "node-cli-barangay-5",
    "index": 185,
    "task": "You will add one line to app.js. This line checks if the item name is missing. If it is, it prints a message and stops with exit code 1. The checker tests this by running node app.js with no words. After you add the line, run the checker and paste its report.\n\nIn app.js:\n```\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "exit",
        "label": "node app.js with no words ends with exit code 1",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 1
      },
      {
        "id": "usage",
        "label": "It explains how to use the tool",
        "kind": "local-node-stderr",
        "file": "app.js",
        "value": "Usage: node app.js <item> <quantity>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use if (!name) to check if the name is empty."
      },
      {
        "level": 2,
        "text": "Add the line right after the line that sets name and quantity.\n\nIn app.js:\n```\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Clearance\": 50, \"Permit\": 300, \"ID\": 20 };\nconsole.log(`Total: ${prices[name] * count}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-barangay"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: cli-barangay.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-cli-barangay-6",
    "index": 186,
    "task": "You will add one line before the last console.log. This line stops the program if the item is not in the price list. The code below does that. Run the checker to confirm it works.\n\nIn app.js:\n```\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "exit",
        "label": "node app.js Milk 1 ends with exit code 2",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "args": [
          "Milk",
          "1"
        ],
        "code": 2
      },
      {
        "id": "message",
        "label": "It reports Unknown item: Milk",
        "kind": "local-node-stderr",
        "file": "app.js",
        "args": [
          "Milk",
          "1"
        ],
        "value": "Unknown item: Milk"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the item is not in the list, the program must stop and show an error message."
      },
      {
        "level": 2,
        "text": "Add the line right before the last console.log in app.js.\n\nIn app.js:\n```\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Clearance\": 50, \"Permit\": 300, \"ID\": 20 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconsole.log(`Total: ${prices[name] * count}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "cli-barangay"
  },
  {
    "id": "node-cli-barangay-7",
    "index": 187,
    "task": "You will add one line after the line that sets count. This line stops the program if the quantity is not a whole number. The code below does that. Run the checker to confirm it works.\n\nIn app.js:\n```\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "exit",
        "label": "node app.js Clearance abc ends with exit code 3",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "args": [
          "Clearance",
          "abc"
        ],
        "code": 3
      },
      {
        "id": "fine",
        "label": "node app.js Clearance 2 still works",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "args": [
          "Clearance",
          "2"
        ],
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the quantity is not a whole number, the program must stop and show an error message."
      },
      {
        "level": 2,
        "text": "Add the line right after the line that sets count in app.js.\n\nIn app.js:\n```\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Clearance\": 50, \"Permit\": 300, \"ID\": 20 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconsole.log(`Total: ${prices[name] * count}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "cli-barangay"
  },
  {
    "id": "node-cli-barangay-8",
    "index": 188,
    "task": "You will add two lines at the end of the file. The first line checks if --receipt was typed. The second line prints a thank-you message if it was. The code below does that. Run the checker to confirm it works.\n\nIn app.js:\n```\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "flag",
        "label": "node app.js Clearance 2 --receipt prints the receipt line",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Clearance",
          "2",
          "--receipt"
        ],
        "value": "Receipt: thank you!"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The thank-you message only appears if --receipt is typed. Check the args array for that."
      },
      {
        "level": 2,
        "text": "Add the two lines at the very end of app.js.\n\nIn app.js:\n```\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Clearance\": 50, \"Permit\": 300, \"ID\": 20 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconsole.log(`Total: ${prices[name] * count}`);\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-barangay"
  },
  {
    "id": "node-cli-barangay-9",
    "index": 189,
    "task": "You will add one line before the total line. This line gets the currency from an environment variable or uses PHP by default. Then you change the total line to use that currency. The code below does that. Run the checker to confirm it works.\n\nIn app.js:\n```\nconst currency = process.env.CURRENCY ?? \"PHP\";\nconsole.log(`Total: ${currency} ${prices[name] * count}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "currency",
        "label": "With CURRENCY=USD it prints Total: USD 100",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Clearance",
          "2"
        ],
        "env": {
          "CURRENCY": "USD"
        },
        "value": "Total: USD 100"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The currency comes from the CURRENCY environment variable. If not set, use PHP."
      },
      {
        "level": 2,
        "text": "Add the line before the total line in app.js, then update the total line to use the new variable.\n\nIn app.js:\n```\nconst currency = process.env.CURRENCY ?? \"PHP\";\nconsole.log(`Total: ${currency} ${prices[name] * count}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Clearance\": 50, \"Permit\": 300, \"ID\": 20 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconst currency = process.env.CURRENCY ?? \"PHP\";\nconsole.log(`Total: ${currency} ${prices[name] * count}`);\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n"
    },
    "estimatedMinutes": 5,
    "projectId": "cli-barangay"
  },
  {
    "id": "node-cli-barangay-10",
    "index": 190,
    "task": "You will add one line right after the first line. This line checks if --help was typed. If so, it prints the usage and stops the program. The code below does that. Run the checker to confirm it works.\n\nIn app.js:\n```\nif (args[0] === \"--help\") { console.log(\"Usage: node app.js <item> <quantity> [--receipt]\"); process.exit(0); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "help",
        "label": "node app.js --help prints the usage",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "--help"
        ],
        "value": "[--receipt]"
      },
      {
        "id": "exit",
        "label": "node app.js --help ends with exit code 0",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "args": [
          "--help"
        ],
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If --help is typed, print the usage message and exit normally. Check the first argument."
      },
      {
        "level": 2,
        "text": "Add the line right after the first line in app.js.\n\nIn app.js:\n```\nif (args[0] === \"--help\") { console.log(\"Usage: node app.js <item> <quantity> [--receipt]\"); process.exit(0); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nif (args[0] === \"--help\") { console.log(\"Usage: node app.js <item> <quantity> [--receipt]\"); process.exit(0); }\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Clearance\": 50, \"Permit\": 300, \"ID\": 20 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconst currency = process.env.CURRENCY ?? \"PHP\";\nconsole.log(`Total: ${currency} ${prices[name] * count}`);\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-barangay"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: config-barangay.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-config-barangay-1",
    "index": 191,
    "task": "You will read the PLACE environment variable. This tells the program where the barangay office is. Add the code below at the end of app.js. Then run the checker to see if it prints 'Place: Barangay Office'.\n\nIn app.js:\n```\nconst place = process.env.PLACE;\nconsole.log(`Place: ${place}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "place",
        "label": "With PLACE=Barangay Office it prints Place: Barangay Office",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "PLACE": "Barangay Office"
        },
        "value": "Place: Barangay Office"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The PLACE variable holds the name of the barangay office. Use process.env to read it."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, after the existing code.\n\nIn app.js:\n```\nconst place = process.env.PLACE;\nconsole.log(`Place: ${place}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE;\nconsole.log(`Place: ${place}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "config-barangay"
  },
  {
    "id": "node-config-barangay-2",
    "index": 192,
    "task": "Now, if PLACE is not set, the program should show 'Unknown place'. Change the line that reads PLACE to use the ?? operator. Then run the checker to see if it prints 'Place: Unknown place'.\n\nIn app.js:\n```\nconst place = process.env.PLACE ?? \"Unknown place\";\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "fallback",
        "label": "Without PLACE it prints Place: Unknown place",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Place: Unknown place"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The ?? operator gives a default value if the variable is empty or not set."
      },
      {
        "level": 2,
        "text": "Replace the previous line with the new one at the end of app.js.\n\nIn app.js:\n```\nconst place = process.env.PLACE ?? \"Unknown place\";\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "config-barangay"
  },
  {
    "id": "node-config-barangay-3",
    "index": 193,
    "task": "You will read the LIMIT setting as a number. If not set, it defaults to 5. Add the code below at the end of app.js. Then run the checker to see if it prints 'Limit: 12' when LIMIT=12.\n\nIn app.js:\n```\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "limit",
        "label": "With LIMIT=12 it prints Limit: 12",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "LIMIT": "12"
        },
        "value": "Limit: 12"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use Number() to convert the setting to a number. The ?? operator gives 5 if LIMIT is not set."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, after the previous lines.\n\nIn app.js:\n```\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "config-barangay"
  },
  {
    "id": "node-config-barangay-4",
    "index": 194,
    "task": "You will turn on debug mode only if DEBUG is set to 'true'. Add the code below at the end of app.js. Then run the checker to see if it prints 'Debug mode on' when DEBUG=true.\n\nIn app.js:\n```\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "debug",
        "label": "With DEBUG=true it prints Debug mode on",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "DEBUG": "true"
        },
        "value": "Debug mode on"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use === to check if DEBUG is exactly the string 'true'."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, after the previous lines.\n\nIn app.js:\n```\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\n"
    },
    "estimatedMinutes": 4,
    "projectId": "config-barangay"
  },
  {
    "id": "node-config-barangay-5",
    "index": 195,
    "task": "You will collect all settings into one object. Add the code below at the end of app.js. Then run the checker to see if it prints the settings as JSON when PLACE=Hall and LIMIT=3.\n\nIn app.js:\n```\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "json",
        "label": "With PLACE=Hall and LIMIT=3 it prints the settings as JSON",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "PLACE": "Hall",
          "LIMIT": "3"
        },
        "value": "{\"place\":\"Hall\",\"limit\":3,\"debug\":false}"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Create an object with the keys: place, limit, and debug. Use the variables you already created."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, after the previous lines.\n\nIn app.js:\n```\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\n"
    },
    "estimatedMinutes": 5,
    "projectId": "config-barangay"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: config-barangay.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-config-barangay-6",
    "index": 196,
    "task": "You add one line at the end of app.js. This line checks if the API_KEY is missing. If it is, the program stops and shows an error. This stops bad things from happening when the secret is not set. The code below does this. Run the checker to see if it works.\n\nIn app.js:\n```\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "missing",
        "label": "Without API_KEY it ends with exit code 1",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 1
      },
      {
        "id": "present",
        "label": "With API_KEY it finishes normally",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "env": {
          "API_KEY": "sk12345"
        },
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the secret is missing, the program must stop right away."
      },
      {
        "level": 2,
        "text": "Put the code at the end of app.js, after the other lines.\n\nIn app.js:\n```\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\n"
    },
    "estimatedMinutes": 3,
    "projectId": "config-barangay"
  },
  {
    "id": "node-config-barangay-7",
    "index": 197,
    "task": "You add two lines at the end of app.js. The first line gets the secret. The second line prints only the first two letters, then hides the rest with stars. This keeps the full secret safe. The code below does this. Run the checker to see if it works.\n\nIn app.js:\n```\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "masked",
        "label": "With API_KEY=sk12345 it prints Key: sk***",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "API_KEY": "sk12345"
        },
        "value": "Key: sk***"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You don't show the full secret, only the first two letters."
      },
      {
        "level": 2,
        "text": "Put the code at the end of app.js, after the other lines.\n\nIn app.js:\n```\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "config-barangay"
  },
  {
    "id": "node-config-barangay-8",
    "index": 198,
    "task": "You add three lines at the end of app.js. The first line imports a tool to read files. The next two lines read config.json and print the currency. This lets the program use settings from a file. The code below does this. Run the checker to see if it works.\n\nIn app.js:\n```\nimport { readFile } from \"node:fs/promises\";\nconst fileConfig = JSON.parse(await readFile(\"config.json\", \"utf8\"));\nconsole.log(`Currency: ${fileConfig.currency}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "currency",
        "label": "It prints Currency: PHP from config.json",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "API_KEY": "sk12345"
        },
        "value": "Currency: PHP"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You read a file called config.json to get the currency."
      },
      {
        "level": 2,
        "text": "Put the code at the end of app.js, after the other lines.\n\nIn app.js:\n```\nimport { readFile } from \"node:fs/promises\";\nconst fileConfig = JSON.parse(await readFile(\"config.json\", \"utf8\"));\nconsole.log(`Currency: ${fileConfig.currency}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\nconst fileConfig = JSON.parse(await readFile(\"config.json\", \"utf8\"));\nconsole.log(`Currency: ${fileConfig.currency}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "config-barangay"
  },
  {
    "id": "node-config-barangay-9",
    "index": 199,
    "task": "You add two lines at the end of app.js. The first line checks if CURRENCY is set. If yes, it uses that. If no, it uses the value from config.json. The second line prints what it's using. This lets you change the currency from the environment. The code below does this. Run the checker to see if it works.\n\nIn app.js:\n```\nconst currency = process.env.CURRENCY ?? fileConfig.currency;\nconsole.log(`Using ${currency}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "override",
        "label": "With CURRENCY=USD it prints Using USD",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "API_KEY": "sk12345",
          "CURRENCY": "USD"
        },
        "value": "Using USD"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If CURRENCY is set, use it. Otherwise, use config.json."
      },
      {
        "level": 2,
        "text": "Put the code at the end of app.js, after the other lines.\n\nIn app.js:\n```\nconst currency = process.env.CURRENCY ?? fileConfig.currency;\nconsole.log(`Using ${currency}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\nconst fileConfig = JSON.parse(await readFile(\"config.json\", \"utf8\"));\nconsole.log(`Currency: ${fileConfig.currency}`);\nconst currency = process.env.CURRENCY ?? fileConfig.currency;\nconsole.log(`Using ${currency}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "config-barangay"
  },
  {
    "id": "node-config-barangay-10",
    "index": 200,
    "task": "You add two lines at the end of app.js. The first line checks if NODE_ENV is production. If yes, it sets mode to production. If no, it sets mode to development. The second line prints the mode. This lets you know if the program is running in production. The code below does this. Run the checker to see if it works.\n\nIn app.js:\n```\nconst mode = process.env.NODE_ENV === \"production\" ? \"production\" : \"development\";\nconsole.log(`Mode: ${mode}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Config check\");\n",
      "config.json": "{\n  \"currency\": \"PHP\",\n  \"taxRate\": 0.12\n}\n"
    },
    "tests": [
      {
        "id": "mode",
        "label": "With NODE_ENV=production it prints Mode: production",
        "kind": "local-node-prints",
        "file": "app.js",
        "env": {
          "API_KEY": "sk12345",
          "NODE_ENV": "production"
        },
        "value": "Mode: production"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If NODE_ENV is production, the mode is production. Otherwise, it's development."
      },
      {
        "level": 2,
        "text": "Put the code at the end of app.js, after the other lines.\n\nIn app.js:\n```\nconst mode = process.env.NODE_ENV === \"production\" ? \"production\" : \"development\";\nconsole.log(`Mode: ${mode}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Config check\");\nconst place = process.env.PLACE ?? \"Unknown place\";\nconsole.log(`Place: ${place}`);\nconst limit = Number(process.env.LIMIT ?? 5);\nconsole.log(`Limit: ${limit}`);\nconst debug = process.env.DEBUG === \"true\";\nif (debug) console.log(\"Debug mode on\");\nconst config = { place, limit, debug };\nconsole.log(JSON.stringify(config));\nif (!process.env.API_KEY) { console.error(\"Missing API_KEY\"); process.exit(1); }\nconst key = process.env.API_KEY;\nconsole.log(`Key: ${key.slice(0, 2)}***`);\nconst fileConfig = JSON.parse(await readFile(\"config.json\", \"utf8\"));\nconsole.log(`Currency: ${fileConfig.currency}`);\nconst currency = process.env.CURRENCY ?? fileConfig.currency;\nconsole.log(`Using ${currency}`);\nconst mode = process.env.NODE_ENV === \"production\" ? \"production\" : \"development\";\nconsole.log(`Mode: ${mode}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "config-barangay"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: folders-barangay.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-folders-barangay-1",
    "index": 201,
    "task": "You will add two lines to the end of app.js. The first line builds a path using path.join. The second line prints that path with forward slashes. This shows how to make file paths safely in Node.js. The code below does this. Run the checker and paste its report.\n\nIn app.js:\n```\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Clearance 50\n",
      "records/b.txt": "Permit 300\n",
      "records/notes.md": "# Notes\nKeep Barangay Office records here.\n"
    },
    "tests": [
      {
        "id": "joined",
        "label": "The script prints records/a.txt",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "records/a.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use path.join to build the path safely, even if the folder names have spaces or special characters."
      },
      {
        "level": 2,
        "text": "Add the two lines at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\n"
    },
    "estimatedMinutes": 3,
    "projectId": "folders-barangay"
  },
  {
    "id": "node-folders-barangay-2",
    "index": 202,
    "task": "You will add one line to the end of app.js. This line prints the file's extension using path.extname. The extension is the part after the dot, like .txt. The code below does this. Run the checker and paste its report.\n\nIn app.js:\n```\nconsole.log(`Extension: ${path.extname(file)}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Clearance 50\n",
      "records/b.txt": "Permit 300\n",
      "records/notes.md": "# Notes\nKeep Barangay Office records here.\n"
    },
    "tests": [
      {
        "id": "ext",
        "label": "The script prints Extension: .txt",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Extension: .txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "path.extname takes the full file name and returns only the part after the dot."
      },
      {
        "level": 2,
        "text": "Add this line at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconsole.log(`Extension: ${path.extname(file)}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\n"
    },
    "estimatedMinutes": 2,
    "projectId": "folders-barangay"
  },
  {
    "id": "node-folders-barangay-3",
    "index": 203,
    "task": "You will add one line to the end of app.js. This line prints the file name without its extension using path.basename. You tell it to remove .txt. The code below does this. Run the checker and paste its report.\n\nIn app.js:\n```\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Clearance 50\n",
      "records/b.txt": "Permit 300\n",
      "records/notes.md": "# Notes\nKeep Barangay Office records here.\n"
    },
    "tests": [
      {
        "id": "base",
        "label": "The script prints Base: a",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Base: a"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "path.basename removes the extension if you give it the extension as a second argument."
      },
      {
        "level": 2,
        "text": "Add this line at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\n"
    },
    "estimatedMinutes": 2,
    "projectId": "folders-barangay"
  },
  {
    "id": "node-folders-barangay-4",
    "index": 204,
    "task": "You will add three lines to the end of app.js. The first line imports readdir from Node.js. The next two lines read the records folder and print how many files it has. The code below does this. Run the checker and paste its report.\n\nIn app.js:\n```\nimport { readdir } from \"node:fs/promises\";\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Clearance 50\n",
      "records/b.txt": "Permit 300\n",
      "records/notes.md": "# Notes\nKeep Barangay Office records here.\n"
    },
    "tests": [
      {
        "id": "count",
        "label": "The script prints Files: 3",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Files: 3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "readdir reads a folder and returns an array of file names. Use await to wait for it to finish."
      },
      {
        "level": 2,
        "text": "Add the three lines at the end of app.js, right after the last line.\n\nIn app.js:\n```\nimport { readdir } from \"node:fs/promises\";\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "folders-barangay"
  },
  {
    "id": "node-folders-barangay-5",
    "index": 205,
    "task": "You will add two lines to the end of app.js. The first line filters the file names to keep only those ending with .txt. The second line prints how many .txt files there are. The code below does this. Run the checker and paste its report.\n\nIn app.js:\n```\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Clearance 50\n",
      "records/b.txt": "Permit 300\n",
      "records/notes.md": "# Notes\nKeep Barangay Office records here.\n"
    },
    "tests": [
      {
        "id": "txt",
        "label": "The script prints Text files: 2",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Text files: 2"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use filter to keep only files that end with .txt. Check the file's extension with path.extname."
      },
      {
        "level": 2,
        "text": "Add the two lines at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "folders-barangay"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: folders-barangay.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-folders-barangay-6",
    "index": 206,
    "task": "You will make a folder called 'archive'. This folder will hold copies of files. The code below lets you make it even if it already exists. Type the code in app.js. Then run the command `node app.js` in your terminal. After that, run the checker and paste its report.\n\nIn app.js:\n```\nimport { readdir, mkdir } from \"node:fs/promises\";\nawait mkdir(\"archive\", { recursive: true });\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Clearance 50\n",
      "records/b.txt": "Permit 300\n",
      "records/notes.md": "# Notes\nKeep Barangay Office records here.\n"
    },
    "tests": [
      {
        "id": "archive",
        "label": "The archive folder exists",
        "kind": "local-dir-exists",
        "path": "archive"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of 'recursive' as a safety switch. It lets you make folders even if they already exist."
      },
      {
        "level": 2,
        "text": "Add the code to the end of app.js, right after the 'mkdir' line.\n\nIn app.js:\n```\nimport { readdir, mkdir } from \"node:fs/promises\";\nawait mkdir(\"archive\", { recursive: true });\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir, mkdir } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\nawait mkdir(\"archive\", { recursive: true });\n"
    },
    "estimatedMinutes": 3,
    "projectId": "folders-barangay"
  },
  {
    "id": "node-folders-barangay-7",
    "index": 207,
    "task": "You will copy a file named 'a.txt' from the 'records' folder into the 'archive' folder. The code below does this. Type it in app.js. Then run `node app.js` in your terminal. After that, run the checker and paste its report.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile } from \"node:fs/promises\";\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Clearance 50\n",
      "records/b.txt": "Permit 300\n",
      "records/notes.md": "# Notes\nKeep Barangay Office records here.\n"
    },
    "tests": [
      {
        "id": "copied",
        "label": "archive/a.txt is a copy of records/a.txt",
        "kind": "local-file-contains",
        "path": "archive/a.txt",
        "value": "Clearance 50"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The 'copyFile' function takes two paths: where the file is now, and where it should go."
      },
      {
        "level": 2,
        "text": "Add the code to the end of app.js, right after the 'copyFile' line.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile } from \"node:fs/promises\";\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir, mkdir, copyFile } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\nawait mkdir(\"archive\", { recursive: true });\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\n"
    },
    "estimatedMinutes": 3,
    "projectId": "folders-barangay"
  },
  {
    "id": "node-folders-barangay-8",
    "index": 208,
    "task": "You will read the file's details using 'stat'. This tells you how big the file is. The code below gets the size and prints it. Type it in app.js. Then run `node app.js` in your terminal. After that, run the checker and paste its report.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile, stat } from \"node:fs/promises\";\nconst info = await stat(file);\nconsole.log(`Size: ${info.size} bytes`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Clearance 50\n",
      "records/b.txt": "Permit 300\n",
      "records/notes.md": "# Notes\nKeep Barangay Office records here.\n"
    },
    "tests": [
      {
        "id": "size",
        "label": "The script prints Size: 13 bytes",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Size: 13 bytes"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The 'stat' function gives you a report. The 'size' property tells you how big the file is in bytes."
      },
      {
        "level": 2,
        "text": "Add the code to the end of app.js, right after the 'stat' line.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile, stat } from \"node:fs/promises\";\nconst info = await stat(file);\nconsole.log(`Size: ${info.size} bytes`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir, mkdir, copyFile, stat } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\nawait mkdir(\"archive\", { recursive: true });\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\nconst info = await stat(file);\nconsole.log(`Size: ${info.size} bytes`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "folders-barangay"
  },
  {
    "id": "node-folders-barangay-9",
    "index": 209,
    "task": "You will rename the file 'a.txt' in the archive folder to 'a-old.txt'. The code below does this. Type it in app.js. Then run `node app.js` in your terminal. After that, run the checker and paste its report.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile, stat, rename } from \"node:fs/promises\";\nawait rename(path.join(\"archive\", \"a.txt\"), path.join(\"archive\", \"a-old.txt\"));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Clearance 50\n",
      "records/b.txt": "Permit 300\n",
      "records/notes.md": "# Notes\nKeep Barangay Office records here.\n"
    },
    "tests": [
      {
        "id": "renamed",
        "label": "archive/a-old.txt exists",
        "kind": "local-file-exists",
        "path": "archive/a-old.txt"
      },
      {
        "id": "moved",
        "label": "archive/a.txt is gone",
        "kind": "local-path-missing",
        "path": "archive/a.txt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The 'rename' function changes the name of a file. It takes the old name and the new name."
      },
      {
        "level": 2,
        "text": "Add the code to the end of app.js, right after the 'rename' line.\n\nIn app.js:\n```\nimport { readdir, mkdir, copyFile, stat, rename } from \"node:fs/promises\";\nawait rename(path.join(\"archive\", \"a.txt\"), path.join(\"archive\", \"a-old.txt\"));\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir, mkdir, copyFile, stat, rename } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\nawait mkdir(\"archive\", { recursive: true });\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\nconst info = await stat(file);\nconsole.log(`Size: ${info.size} bytes`);\nawait rename(path.join(\"archive\", \"a.txt\"), path.join(\"archive\", \"a-old.txt\"));\n"
    },
    "estimatedMinutes": 3,
    "projectId": "folders-barangay"
  },
  {
    "id": "node-folders-barangay-10",
    "index": 210,
    "task": "You will turn the file path into a full path using 'path.resolve'. This makes sure the path is absolute. The code below prints 'true' if it is. Type it in app.js. Then run `node app.js` in your terminal. After that, run the checker and paste its report.\n\nIn app.js:\n```\nconsole.log(`Absolute: ${path.isAbsolute(path.resolve(file))}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "Barangay Office Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import path from \"node:path\";\nconsole.log(\"Folder tool\");\n",
      "records/a.txt": "Clearance 50\n",
      "records/b.txt": "Permit 300\n",
      "records/notes.md": "# Notes\nKeep Barangay Office records here.\n"
    },
    "tests": [
      {
        "id": "absolute",
        "label": "The script prints Absolute: true",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Absolute: true"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "An absolute path starts from the root of your computer. 'path.resolve' makes sure it does."
      },
      {
        "level": 2,
        "text": "Add the code to the end of app.js, right after the 'rename' line.\n\nIn app.js:\n```\nconsole.log(`Absolute: ${path.isAbsolute(path.resolve(file))}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import path from \"node:path\";\nimport { readdir, mkdir, copyFile, stat, rename } from \"node:fs/promises\";\nconsole.log(\"Folder tool\");\nconst file = path.join(\"records\", \"a.txt\");\nconsole.log(file.split(path.sep).join(\"/\"));\nconsole.log(`Extension: ${path.extname(file)}`);\nconsole.log(`Base: ${path.basename(file, \".txt\")}`);\nconst names = await readdir(\"records\");\nconsole.log(`Files: ${names.length}`);\nconst textFiles = names.filter((name) => path.extname(name) === \".txt\");\nconsole.log(`Text files: ${textFiles.length}`);\nawait mkdir(\"archive\", { recursive: true });\nawait copyFile(file, path.join(\"archive\", \"a.txt\"));\nconst info = await stat(file);\nconsole.log(`Size: ${info.size} bytes`);\nawait rename(path.join(\"archive\", \"a.txt\"), path.join(\"archive\", \"a-old.txt\"));\nconsole.log(`Absolute: ${path.isAbsolute(path.resolve(file))}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "folders-barangay"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: scripts-school-club.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-scripts-school-club-1",
    "index": 211,
    "task": "Open the file app.js. Change the line to say School Club. Run the script with node app.js. The checker will confirm it prints School Club.\n\nIn app.js:\n```\nconsole.log(\"School Club\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "name",
        "label": "node app.js prints School Club",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "School Club"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The script runs with node app.js. Make sure the text is exactly School Club."
      },
      {
        "level": 2,
        "text": "Type the code in app.js, then run node app.js in the terminal.\n\nIn app.js:\n```\nconsole.log(\"School Club\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"School Club\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "scripts-school-club"
  },
  {
    "id": "node-scripts-school-club-2",
    "index": 212,
    "task": "Add two lines at the end of app.js. First, make a constant called item with the value Shirt. Then print that value. The checker will confirm it prints Shirt on its own line.\n\nIn app.js:\n```\nconst item = \"Shirt\";\nconsole.log(item);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "item",
        "label": "The script prints Shirt on its own line",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Shirt\n"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use const to make a constant. The value must be Shirt."
      },
      {
        "level": 2,
        "text": "Add the lines at the end of app.js, after the first line.\n\nIn app.js:\n```\nconst item = \"Shirt\";\nconsole.log(item);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"School Club\");\nconst item = \"Shirt\";\nconsole.log(item);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "scripts-school-club"
  },
  {
    "id": "node-scripts-school-club-3",
    "index": 213,
    "task": "Add a new constant called price with the value 250. Change the last console.log to print both item and price together. The checker will confirm it prints Shirt 250.\n\nIn app.js:\n```\nconst price = 250;\nconsole.log(item, price);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "pair",
        "label": "The script prints Shirt 250",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Shirt 250"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the price constant before the last line. Use 250 as the value."
      },
      {
        "level": 2,
        "text": "Change the last line to console.log(item, price);\n\nIn app.js:\n```\nconst price = 250;\nconsole.log(item, price);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"School Club\");\nconst item = \"Shirt\";\nconst price = 250;\nconsole.log(item, price);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "scripts-school-club"
  },
  {
    "id": "node-scripts-school-club-4",
    "index": 214,
    "task": "Change the last console.log to use a template literal. Print the item and price in one sentence. The checker will confirm it prints Shirt costs 250 pesos.\n\nIn app.js:\n```\nconsole.log(`${item} costs ${price} pesos`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "sentence",
        "label": "The script prints Shirt costs 250 pesos",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Shirt costs 250 pesos"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use backticks to start and end the template. Use ${} to insert variables."
      },
      {
        "level": 2,
        "text": "Replace the last line with console.log(`${item} costs ${price} pesos`);\n\nIn app.js:\n```\nconsole.log(`${item} costs ${price} pesos`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"School Club\");\nconst item = \"Shirt\";\nconst price = 250;\nconsole.log(`${item} costs ${price} pesos`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "scripts-school-club"
  },
  {
    "id": "node-scripts-school-club-5",
    "index": 215,
    "task": "Add two lines at the end of app.js. First, make an array called items with three strings: Shirt, Pin, and Badge. Then print how many items there are. The checker will confirm it prints Items: 3.\n\nIn app.js:\n```\nconst items = [\"Shirt\", \"Pin\", \"Badge\"];\nconsole.log(`Items: ${items.length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
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
        "text": "Use square brackets to make an array. Add the three names inside."
      },
      {
        "level": 2,
        "text": "Add the last line as console.log(`Items: ${items.length}`);\n\nIn app.js:\n```\nconst items = [\"Shirt\", \"Pin\", \"Badge\"];\nconsole.log(`Items: ${items.length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"School Club\");\nconst item = \"Shirt\";\nconst price = 250;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Shirt\", \"Pin\", \"Badge\"];\nconsole.log(`Items: ${items.length}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "scripts-school-club"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: scripts-school-club.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-scripts-school-club-6",
    "index": 216,
    "task": "You will print each product name with a dash in front. Add the code below at the end of app.js. This loop goes through each item in the list. The checker confirms the last line is - Badge.\n\nIn app.js:\n```\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "last",
        "label": "The list ends with - Badge",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "- Badge"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use a for...of loop to go through each item in the items array."
      },
      {
        "level": 2,
        "text": "Put the code at the end of app.js, after the items list.\n\nIn app.js:\n```\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"School Club\");\nconst item = \"Shirt\";\nconst price = 250;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Shirt\", \"Pin\", \"Badge\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "scripts-school-club"
  },
  {
    "id": "node-scripts-school-club-7",
    "index": 217,
    "task": "You will add the prices and print the total. Add the code below at the end of app.js. The checker confirms the total is 325. This is the sum of 250, 30, and 45.\n\nIn app.js:\n```\nconst total = 250 + 30 + 45;\nconsole.log(`Total: ${total}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "total",
        "label": "The script prints Total: 325",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Total: 325"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add two lines: one to calculate the total, one to print it."
      },
      {
        "level": 2,
        "text": "Put the code at the end of app.js, after the loop.\n\nIn app.js:\n```\nconst total = 250 + 30 + 45;\nconsole.log(`Total: ${total}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"School Club\");\nconst item = \"Shirt\";\nconst price = 250;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Shirt\", \"Pin\", \"Badge\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\nconst total = 250 + 30 + 45;\nconsole.log(`Total: ${total}`);\n"
    },
    "estimatedMinutes": 2,
    "projectId": "scripts-school-club"
  },
  {
    "id": "node-scripts-school-club-8",
    "index": 218,
    "task": "You will add a tax of 12% to the total. Add the code below at the end of app.js. The checker confirms the total with tax is 364. The function multiplies the amount by 1.12 and rounds it.\n\nIn app.js:\n```\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "tax",
        "label": "The script prints With tax: 364",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "With tax: 364"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Write a function that takes an amount and returns it with 12% tax."
      },
      {
        "level": 2,
        "text": "Put the code at the end of app.js, after the total line.\n\nIn app.js:\n```\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"School Club\");\nconst item = \"Shirt\";\nconst price = 250;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Shirt\", \"Pin\", \"Badge\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\nconst total = 250 + 30 + 45;\nconsole.log(`Total: ${total}`);\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "scripts-school-club"
  },
  {
    "id": "node-scripts-school-club-9",
    "index": 219,
    "task": "You will label the order as big or small. Add the code below at the end of app.js. The checker confirms the order is big because the total is over 100. If the total is not over 100, it says small.\n\nIn app.js:\n```\nif (total > 100) console.log(\"Big order\");\nelse console.log(\"Small order\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "size",
        "label": "The script prints Big order",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Big order"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use an if statement to check if total is greater than 100."
      },
      {
        "level": 2,
        "text": "Put the code at the end of app.js, after the tax line.\n\nIn app.js:\n```\nif (total > 100) console.log(\"Big order\");\nelse console.log(\"Small order\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"School Club\");\nconst item = \"Shirt\";\nconst price = 250;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Shirt\", \"Pin\", \"Badge\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\nconst total = 250 + 30 + 45;\nconsole.log(`Total: ${total}`);\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\nif (total > 100) console.log(\"Big order\");\nelse console.log(\"Small order\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "scripts-school-club"
  },
  {
    "id": "node-scripts-school-club-10",
    "index": 220,
    "task": "You will report a warning using console.error. Add the code below at the end of app.js. The checker confirms it prints as an error message but the script still finishes. This is for warning messages, not normal output.\n\nIn app.js:\n```\nconsole.error(\"Low stock: Badge\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Hello from Node\");\n"
    },
    "tests": [
      {
        "id": "warning",
        "label": "The script reports Low stock: Badge as an error message",
        "kind": "local-node-stderr",
        "file": "app.js",
        "value": "Low stock: Badge"
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
        "text": "Use console.error to show a warning message."
      },
      {
        "level": 2,
        "text": "Put the code at the end of app.js, after the order label.\n\nIn app.js:\n```\nconsole.error(\"Low stock: Badge\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "console.log(\"School Club\");\nconst item = \"Shirt\";\nconst price = 250;\nconsole.log(`${item} costs ${price} pesos`);\nconst items = [\"Shirt\", \"Pin\", \"Badge\"];\nconsole.log(`Items: ${items.length}`);\nfor (const name of items) {\n  console.log(`- ${name}`);\n}\nconst total = 250 + 30 + 45;\nconsole.log(`Total: ${total}`);\nconst withTax = (amount) => Math.round(amount * 1.12);\nconsole.log(`With tax: ${withTax(total)}`);\nif (total > 100) console.log(\"Big order\");\nelse console.log(\"Small order\");\nconsole.error(\"Low stock: Badge\");\n"
    },
    "estimatedMinutes": 2,
    "projectId": "scripts-school-club"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: modules-school-club.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-modules-school-club-1",
    "index": 221,
    "task": "Create a new file named prices.js. Type the code below into it. This file holds the store name. You will use it later in app.js. Run the checker to confirm it works.\n\nIn prices.js:\n```\nexport const storeName = \"School Club\";\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "export",
        "label": "prices.js exports storeName",
        "kind": "local-file-contains",
        "path": "prices.js",
        "value": "export const storeName"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of prices.js as a small notebook that holds store details."
      },
      {
        "level": 2,
        "text": "Put the code in prices.js, not in app.js.\n\nIn prices.js:\n```\nexport const storeName = \"School Club\";\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "prices.js": "export const storeName = \"School Club\";\n"
    },
    "estimatedMinutes": 3,
    "projectId": "modules-school-club"
  },
  {
    "id": "node-modules-school-club-2",
    "index": 222,
    "task": "Open app.js. Add an import at the top to bring in storeName from prices.js. Add a console.log at the end to print it. Run the checker to confirm it prints the store name.\n\nIn app.js:\n```\nimport { storeName } from \"./prices.js\";\nconsole.log(storeName);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "imported",
        "label": "node app.js prints School Club from prices.js",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "School Club"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You need to tell app.js to borrow storeName from prices.js."
      },
      {
        "level": 2,
        "text": "Put the import and log at the end of app.js.\n\nIn app.js:\n```\nimport { storeName } from \"./prices.js\";\nconsole.log(storeName);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { storeName } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-school-club"
  },
  {
    "id": "node-modules-school-club-3",
    "index": 223,
    "task": "Add a prices object to prices.js. Update app.js to import prices and print the price of Shirt. Run the checker to confirm it prints 250.\n\nIn prices.js:\n```\nexport const prices = { \"Shirt\": 250, \"Pin\": 30, \"Badge\": 45 };\n```\n\nIn app.js:\n```\nimport { storeName, prices } from \"./prices.js\";\nconsole.log(prices[\"Shirt\"]);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "price",
        "label": "The script prints 250 on its own line",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "250\n"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "prices.js now holds both store name and item prices."
      },
      {
        "level": 2,
        "text": "Add prices to the import in app.js and print prices[\"Shirt\"].\n\nIn prices.js:\n```\nexport const prices = { \"Shirt\": 250, \"Pin\": 30, \"Badge\": 45 };\n```\n\nIn app.js:\n```\nimport { storeName, prices } from \"./prices.js\";\nconsole.log(prices[\"Shirt\"]);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "prices.js": "export const storeName = \"School Club\";\nexport const prices = { \"Shirt\": 250, \"Pin\": 30, \"Badge\": 45 };\n",
      "app.js": "import { storeName, prices } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Shirt\"]);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "modules-school-club"
  },
  {
    "id": "node-modules-school-club-4",
    "index": 224,
    "task": "Add a function called priceOf to prices.js. This function looks up a price and returns 0 if the item is not found. Run the checker to confirm it exports the function.\n\nIn prices.js:\n```\nexport function priceOf(name) {\n  return prices[name] ?? 0;\n}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "function",
        "label": "prices.js exports priceOf",
        "kind": "local-file-contains",
        "path": "prices.js",
        "value": "export function priceOf(name)"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The function uses a special operator to check if the item exists."
      },
      {
        "level": 2,
        "text": "Put the function at the end of prices.js.\n\nIn prices.js:\n```\nexport function priceOf(name) {\n  return prices[name] ?? 0;\n}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "prices.js": "export const storeName = \"School Club\";\nexport const prices = { \"Shirt\": 250, \"Pin\": 30, \"Badge\": 45 };\nexport function priceOf(name) {\n  return prices[name] ?? 0;\n}\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-school-club"
  },
  {
    "id": "node-modules-school-club-5",
    "index": 225,
    "task": "Update app.js to import priceOf. Print the price of Pin using the function. Run the checker to confirm it prints Pin: 30.\n\nIn app.js:\n```\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(`Pin: ${priceOf(\"Pin\")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "lookup",
        "label": "The script prints Pin: 30",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Pin: 30"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You need to add priceOf to the import list in app.js."
      },
      {
        "level": 2,
        "text": "Use priceOf(\"Pin\") to get the price and print it with a label.\n\nIn app.js:\n```\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(`Pin: ${priceOf(\"Pin\")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Shirt\"]);\nconsole.log(`Pin: ${priceOf(\"Pin\")}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-school-club"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: modules-school-club.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-modules-school-club-6",
    "index": 226,
    "task": "You will add a default export to prices.js. This lets other files use it easily. The code below formats an amount as pesos. You must add it at the end of prices.js. After you add it, run the checker to confirm it worked.\n\nIn prices.js:\n```\nexport default function formatPeso(amount) {\n  return `PHP ${amount.toFixed(2)}`;\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "default",
        "label": "prices.js has a default export",
        "kind": "local-file-contains",
        "path": "prices.js",
        "value": "export default function formatPeso"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of default export like a main tool you give to others."
      },
      {
        "level": 2,
        "text": "Add the code at the end of prices.js, right after the last line.\n\nIn prices.js:\n```\nexport default function formatPeso(amount) {\n  return `PHP ${amount.toFixed(2)}`;\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "prices.js": "export const storeName = \"School Club\";\nexport const prices = { \"Shirt\": 250, \"Pin\": 30, \"Badge\": 45 };\nexport function priceOf(name) {\n  return prices[name] ?? 0;\n}\nexport default function formatPeso(amount) {\n  return `PHP ${amount.toFixed(2)}`;\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "modules-school-club"
  },
  {
    "id": "node-modules-school-club-7",
    "index": 227,
    "task": "You will import the default export in app.js. You do not use braces for default imports. The code below prints 250 as PHP 250.00. Add it at the top of app.js and one line at the end. Then run the checker to confirm it prints correctly.\n\nIn app.js:\n```\nimport formatPeso from \"./prices.js\";\nconsole.log(formatPeso(250));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "peso",
        "label": "The script prints PHP 250.00",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "PHP 250.00"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Default imports are like taking a tool from a box, no braces needed."
      },
      {
        "level": 2,
        "text": "Add the code at the top of app.js, then add the console.log line at the end.\n\nIn app.js:\n```\nimport formatPeso from \"./prices.js\";\nconsole.log(formatPeso(250));\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import formatPeso from \"./prices.js\";\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Shirt\"]);\nconsole.log(`Pin: ${priceOf(\"Pin\")}`);\nconsole.log(formatPeso(250));\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-school-club"
  },
  {
    "id": "node-modules-school-club-8",
    "index": 228,
    "task": "You will import from Node's built-in os module. This gives you info about your computer's operating system. The code below prints the system name. Add it at the top of app.js and one line at the end. Then run the checker to confirm it prints your system name.\n\nIn app.js:\n```\nimport { platform } from \"node:os\";\nconsole.log(`Running on ${platform()}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "os",
        "label": "The script prints Running on and your system name",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Running on "
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Node's os module is like a built-in tool for checking your computer's system."
      },
      {
        "level": 2,
        "text": "Add the import line at the top of app.js, then add the console.log line at the end.\n\nIn app.js:\n```\nimport { platform } from \"node:os\";\nconsole.log(`Running on ${platform()}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { platform } from \"node:os\";\nimport formatPeso from \"./prices.js\";\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Shirt\"]);\nconsole.log(`Pin: ${priceOf(\"Pin\")}`);\nconsole.log(formatPeso(250));\nconsole.log(`Running on ${platform()}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-school-club"
  },
  {
    "id": "node-modules-school-club-9",
    "index": 229,
    "task": "You will add a start script to package.json. This lets you run npm run start to start the app. The code below adds a scripts entry. Change package.json to include it. Then run the checker to confirm it's there.\n\nIn package.json:\n```\n  \"type\": \"module\",\n  \"scripts\": { \"start\": \"node app.js\" }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "script",
        "label": "package.json has a start script",
        "kind": "local-file-contains",
        "path": "package.json",
        "value": "\"start\": \"node app.js\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The start script is like a button, when you press it, it runs your app."
      },
      {
        "level": 2,
        "text": "Add the scripts entry inside package.json, right after type: \"module\".\n\nIn package.json:\n```\n  \"type\": \"module\",\n  \"scripts\": { \"start\": \"node app.js\" }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "package.json": "{\n  \"type\": \"module\",\n  \"scripts\": { \"start\": \"node app.js\" }\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "modules-school-club"
  },
  {
    "id": "node-modules-school-club-10",
    "index": 230,
    "task": "You will import priceOf under a new name, lookup, and use it. The code below imports it and prints the price of a Badge. Add it at the top of app.js and one line at the end. Then run the checker to confirm it prints Last item: 45.\n\nIn app.js:\n```\nimport { priceOf as lookup } from \"./prices.js\";\nconsole.log(`Last item: ${lookup(\"Badge\")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "console.log(\"Price list\");\n"
    },
    "tests": [
      {
        "id": "alias",
        "label": "The script prints Last item: 45",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Last item: 45"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "You can rename imports to make your code clearer, like giving a tool a new name."
      },
      {
        "level": 2,
        "text": "Add the import line at the top of app.js, then add the console.log line at the end.\n\nIn app.js:\n```\nimport { priceOf as lookup } from \"./prices.js\";\nconsole.log(`Last item: ${lookup(\"Badge\")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { priceOf as lookup } from \"./prices.js\";\nimport { platform } from \"node:os\";\nimport formatPeso from \"./prices.js\";\nimport { storeName, prices, priceOf } from \"./prices.js\";\nconsole.log(\"Price list\");\nconsole.log(storeName);\nconsole.log(prices[\"Shirt\"]);\nconsole.log(`Pin: ${priceOf(\"Pin\")}`);\nconsole.log(formatPeso(250));\nconsole.log(`Running on ${platform()}`);\nconsole.log(`Last item: ${lookup(\"Badge\")}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "modules-school-club"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: files-school-club.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-files-school-club-1",
    "index": 231,
    "task": "You will read the file stock.txt. This file has the club's inventory. Replace the console.log line in app.js with two lines. The code below reads the file and prints its text. Run the checker to confirm the script prints Shirt,250.\n\nIn app.js:\n```\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Shirt,250\nPin,30\nBadge,45\n"
    },
    "tests": [
      {
        "id": "text",
        "label": "The script prints the line Shirt,250 from stock.txt",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Shirt,250"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Read the file using readFile and await. The file name is stock.txt."
      },
      {
        "level": 2,
        "text": "Put the code in app.js, right after the import line.\n\nIn app.js:\n```\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "files-school-club"
  },
  {
    "id": "node-files-school-club-2",
    "index": 232,
    "task": "You will split the text into lines. This helps count how many items are in the file. Add two lines at the end of app.js. The code below splits the text and prints the number of lines. Run the checker to confirm the script prints Lines: 3.\n\nIn app.js:\n```\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Shirt,250\nPin,30\nBadge,45\n"
    },
    "tests": [
      {
        "id": "lines",
        "label": "The script prints Lines: 3",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Lines: 3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use trim() to remove extra spaces, then split by newline (\\n)."
      },
      {
        "level": 2,
        "text": "Put the code after the previous code in app.js.\n\nIn app.js:\n```\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "files-school-club"
  },
  {
    "id": "node-files-school-club-3",
    "index": 233,
    "task": "You will split each line by the comma. This separates the item name and price. Add two lines at the end of app.js. The code below splits each line and prints the second item's name. Run the checker to confirm the script prints Second item: Pin.\n\nIn app.js:\n```\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Shirt,250\nPin,30\nBadge,45\n"
    },
    "tests": [
      {
        "id": "second",
        "label": "The script prints Second item: Pin",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Second item: Pin"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use map to process each line. Split each line by comma (,)."
      },
      {
        "level": 2,
        "text": "Put the code after the previous code in app.js.\n\nIn app.js:\n```\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "files-school-club"
  },
  {
    "id": "node-files-school-club-4",
    "index": 234,
    "task": "You will turn each row into an object with a name and price. This helps find the cheapest item. Add two lines at the end of app.js. The code below creates objects and prints the cheapest price. Run the checker to confirm the script prints Cheapest: 30.\n\nIn app.js:\n```\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Shirt,250\nPin,30\nBadge,45\n"
    },
    "tests": [
      {
        "id": "cheapest",
        "label": "The script prints Cheapest: 30",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Cheapest: 30"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use map to create objects. Convert the price to a number using Number()."
      },
      {
        "level": 2,
        "text": "Put the code after the previous code in app.js.\n\nIn app.js:\n```\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "files-school-club"
  },
  {
    "id": "node-files-school-club-5",
    "index": 235,
    "task": "You will write a report file. This file will say how many items are in the club. Add two lines at the end of app.js. The first line imports writeFile. The second line writes to report.txt. Then run node app.js. Run the checker to confirm report.txt says Items: 3.\n\nIn app.js:\n```\nimport { readFile, writeFile } from \"node:fs/promises\";\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Shirt,250\nPin,30\nBadge,45\n"
    },
    "tests": [
      {
        "id": "report",
        "label": "report.txt says Items: 3",
        "kind": "local-file-contains",
        "path": "report.txt",
        "value": "Items: 3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Import writeFile from node:fs/promises. Then write to report.txt."
      },
      {
        "level": 2,
        "text": "Put the code after the previous code in app.js. Then run node app.js.\n\nIn app.js:\n```\nimport { readFile, writeFile } from \"node:fs/promises\";\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\n"
    },
    "estimatedMinutes": 6,
    "projectId": "files-school-club"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: files-school-club.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-files-school-club-6",
    "index": 236,
    "task": "You will save the item objects to a file called stock.json. This file will store the club's inventory in a format that can be read later. The code below writes the items as JSON. Run node app.js to save the file. Then check if stock.json holds Shirt as JSON.\n\nIn app.js:\n```\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Shirt,250\nPin,30\nBadge,45\n"
    },
    "tests": [
      {
        "id": "json",
        "label": "stock.json holds Shirt as JSON",
        "kind": "local-file-contains",
        "path": "stock.json",
        "value": "\"name\": \"Shirt\""
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The JSON string must be written to the file using writeFile."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\n"
    },
    "estimatedMinutes": 3,
    "projectId": "files-school-club"
  },
  {
    "id": "node-files-school-club-7",
    "index": 237,
    "task": "You will read the stock.json file back into objects and count how many items are saved. The code below reads the file and prints the count. Add these lines at the end of app.js. Then run the script to see the count printed.\n\nIn app.js:\n```\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Shirt,250\nPin,30\nBadge,45\n"
    },
    "tests": [
      {
        "id": "saved",
        "label": "The script prints Saved: 3 items",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Saved: 3 items"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use JSON.parse to turn the file's text into objects."
      },
      {
        "level": 2,
        "text": "Add these lines after the writeFile line in app.js.\n\nIn app.js:\n```\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "files-school-club"
  },
  {
    "id": "node-files-school-club-8",
    "index": 238,
    "task": "You will add a line to report.txt without deleting what's already there. The code below uses appendFile to add a new line. Add the import for appendFile and the code at the end of app.js. Then run node app.js to check if report.txt ends with Checked today, but still says Items: 3.\n\nIn app.js:\n```\nimport { readFile, writeFile, appendFile } from \"node:fs/promises\";\nawait appendFile(\"report.txt\", \"Checked today\\n\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Shirt,250\nPin,30\nBadge,45\n"
    },
    "tests": [
      {
        "id": "appended",
        "label": "report.txt ends with Checked today",
        "kind": "local-file-contains",
        "path": "report.txt",
        "value": "Checked today"
      },
      {
        "id": "kept",
        "label": "report.txt still says Items: 3",
        "kind": "local-file-contains",
        "path": "report.txt",
        "value": "Items: 3"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "appendFile adds to the end of a file without replacing it."
      },
      {
        "level": 2,
        "text": "Add the import and code at the end of app.js, after the last line.\n\nIn app.js:\n```\nimport { readFile, writeFile, appendFile } from \"node:fs/promises\";\nawait appendFile(\"report.txt\", \"Checked today\\n\");\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile, appendFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\nawait appendFile(\"report.txt\", \"Checked today\\n\");\n"
    },
    "estimatedMinutes": 4,
    "projectId": "files-school-club"
  },
  {
    "id": "node-files-school-club-9",
    "index": 239,
    "task": "You will raise the price of the first item in stock.json by 7 and save the change. The code below changes the price and writes the file again. Add these lines at the end of app.js. Then run node app.js to check if stock.json now shows Shirt at 257.\n\nIn app.js:\n```\nsaved[0].price += 7;\nawait writeFile(\"stock.json\", JSON.stringify(saved, null, 2));\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Shirt,250\nPin,30\nBadge,45\n"
    },
    "tests": [
      {
        "id": "raised",
        "label": "stock.json now has Shirt at 257",
        "kind": "local-file-contains",
        "path": "stock.json",
        "value": "\"price\": 257"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use saved[0] to get the first item in the array."
      },
      {
        "level": 2,
        "text": "Add these lines after the read code in app.js.\n\nIn app.js:\n```\nsaved[0].price += 7;\nawait writeFile(\"stock.json\", JSON.stringify(saved, null, 2));\n``` The command is: `node app.js`"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": "node app.js"
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile, appendFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\nawait appendFile(\"report.txt\", \"Checked today\\n\");\nsaved[0].price += 7;\nawait writeFile(\"stock.json\", JSON.stringify(saved, null, 2));\n"
    },
    "estimatedMinutes": 4,
    "projectId": "files-school-club"
  },
  {
    "id": "node-files-school-club-10",
    "index": 240,
    "task": "You will read a file that does not exist and handle the error without crashing. The code below uses try and catch to report the error code. Add these lines at the end of app.js. Then run the script to check if it reports Could not read: ENOENT and still finishes normally.\n\nIn app.js:\n```\ntry { await readFile(\"missing.txt\", \"utf8\"); }\ncatch (error) { console.error(`Could not read: ${error.code}`); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "import { readFile } from \"node:fs/promises\";\nconsole.log(\"Stock reader\");\n",
      "stock.txt": "Shirt,250\nPin,30\nBadge,45\n"
    },
    "tests": [
      {
        "id": "code",
        "label": "The script reports Could not read: ENOENT",
        "kind": "local-node-stderr",
        "file": "app.js",
        "value": "Could not read: ENOENT"
      },
      {
        "id": "finishes",
        "label": "The script still finishes normally",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use try and catch to handle errors safely."
      },
      {
        "level": 2,
        "text": "Add these lines at the end of app.js, after the last line.\n\nIn app.js:\n```\ntry { await readFile(\"missing.txt\", \"utf8\"); }\ncatch (error) { console.error(`Could not read: ${error.code}`); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "import { readFile, writeFile, appendFile } from \"node:fs/promises\";\nconst text = await readFile(\"stock.txt\", \"utf8\");\nconsole.log(text);\nconst lines = text.trim().split(\"\\n\");\nconsole.log(`Lines: ${lines.length}`);\nconst rows = lines.map((line) => line.split(\",\"));\nconsole.log(`Second item: ${rows[1][0]}`);\nconst items = rows.map(([name, price]) => ({ name, price: Number(price) }));\nconsole.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);\nawait writeFile(\"report.txt\", `Items: ${items.length}\\n`);\nawait writeFile(\"stock.json\", JSON.stringify(items, null, 2));\nconst saved = JSON.parse(await readFile(\"stock.json\", \"utf8\"));\nconsole.log(`Saved: ${saved.length} items`);\nawait appendFile(\"report.txt\", \"Checked today\\n\");\nsaved[0].price += 7;\nawait writeFile(\"stock.json\", JSON.stringify(saved, null, 2));\ntry { await readFile(\"missing.txt\", \"utf8\"); }\ncatch (error) { console.error(`Could not read: ${error.code}`); }\n"
    },
    "estimatedMinutes": 5,
    "projectId": "files-school-club"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: async-school-club.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-async-school-club-1",
    "index": 241,
    "task": "You will add two lines to the end of app.js. The first line says await wait(100);. This pauses the script for 100 milliseconds. The second line says console.log(\"After wait\");. This prints the message after the pause. The code below does this. Run the checker to confirm it works.\n\nIn app.js:\n```\nawait wait(100);\nconsole.log(\"After wait\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "after",
        "label": "The script prints Start and then After wait",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Start\nAfter wait"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The await makes the script wait before moving on."
      },
      {
        "level": 2,
        "text": "Add these lines at the end of app.js.\n\nIn app.js:\n```\nawait wait(100);\nconsole.log(\"After wait\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "async-school-club"
  },
  {
    "id": "node-async-school-club-2",
    "index": 242,
    "task": "You will add two lines to the end of app.js. The first line defines a function called fetchPrice. It takes a name and returns a price after waiting 20 milliseconds. The second line calls this function with \"Shirt\" and prints the result. The code below does this. Run the checker to confirm it works.\n\nIn app.js:\n```\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Shirt\")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "price",
        "label": "The script prints Price: 50",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Price: 50"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The function uses await to wait before returning the price."
      },
      {
        "level": 2,
        "text": "Add these lines at the end of app.js.\n\nIn app.js:\n```\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Shirt\")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Shirt\")}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "async-school-club"
  },
  {
    "id": "node-async-school-club-3",
    "index": 243,
    "task": "You will add two lines to the end of app.js. The first line uses Promise.all to run fetchPrice for three items at the same time. The second line prints all the prices joined by commas. The code below does this. Run the checker to confirm it works.\n\nIn app.js:\n```\nconst prices = await Promise.all([\"Shirt\", \"Pin\", \"Badge\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "all",
        "label": "The script prints All: 50, 30, 50",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "All: 50, 30, 50"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Promise.all runs all the promises at once, not one after another."
      },
      {
        "level": 2,
        "text": "Add these lines at the end of app.js.\n\nIn app.js:\n```\nconst prices = await Promise.all([\"Shirt\", \"Pin\", \"Badge\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Shirt\")}`);\nconst prices = await Promise.all([\"Shirt\", \"Pin\", \"Badge\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "async-school-club"
  },
  {
    "id": "node-async-school-club-4",
    "index": 244,
    "task": "You will add three lines to the end of app.js. The first line creates a slow promise that waits 200 milliseconds. The second line creates a fast promise that waits 20 milliseconds. The third line uses Promise.race to see which finishes first and prints it. The code below does this. Run the checker to confirm it works.\n\nIn app.js:\n```\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "race",
        "label": "The script prints First: fast",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "First: fast"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Promise.race lets you see which promise finishes first."
      },
      {
        "level": 2,
        "text": "Add these lines at the end of app.js.\n\nIn app.js:\n```\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Shirt\")}`);\nconst prices = await Promise.all([\"Shirt\", \"Pin\", \"Badge\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\n"
    },
    "estimatedMinutes": 5,
    "projectId": "async-school-club"
  },
  {
    "id": "node-async-school-club-5",
    "index": 245,
    "task": "You will add two lines to the end of app.js. The first line defines a function called failing that throws an error. The second line tries to run it and catches the error, printing its message. The code below does this. Run the checker to confirm it works.\n\nIn app.js:\n```\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "caught",
        "label": "The script reports Supplier offline",
        "kind": "local-node-stderr",
        "file": "app.js",
        "value": "Supplier offline"
      },
      {
        "id": "finishes",
        "label": "The script still finishes normally",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "The try...catch block catches errors and prints them."
      },
      {
        "level": 2,
        "text": "Add these lines at the end of app.js.\n\nIn app.js:\n```\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Shirt\")}`);\nconst prices = await Promise.all([\"Shirt\", \"Pin\", \"Badge\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\n"
    },
    "estimatedMinutes": 4,
    "projectId": "async-school-club"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: async-school-club.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-async-school-club-6",
    "index": 246,
    "task": "You add two lines at the end of app.js. The first line waits for both promises to finish, even if one fails. The second line prints the status of each. This helps you know if a task worked or not. The code below does that. Run the checker and paste its report.\n\nIn app.js:\n```\nconst results = await Promise.allSettled([fetchPrice(\"Shirt\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "settled",
        "label": "The script prints Settled: fulfilled rejected",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Settled: fulfilled rejected"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of Promise.allSettled as a way to check if all tasks are done, even if some fail."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nconst results = await Promise.allSettled([fetchPrice(\"Shirt\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Shirt\")}`);\nconst prices = await Promise.all([\"Shirt\", \"Pin\", \"Badge\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Shirt\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "async-school-club"
  },
  {
    "id": "node-async-school-club-7",
    "index": 247,
    "task": "You add a for...of loop at the end. It checks the price of each item one after the other. This lets you check many things without repeating code. The code below does that. Run the checker and paste its report.\n\nIn app.js:\n```\nfor (const name of [\"Shirt\", \"Pin\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "loop",
        "label": "The script prints Checked Pin: 30",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Checked Pin: 30"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use for...of to loop over an array of names. Each time, call fetchPrice with that name."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nfor (const name of [\"Shirt\", \"Pin\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Shirt\")}`);\nconst prices = await Promise.all([\"Shirt\", \"Pin\", \"Badge\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Shirt\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\nfor (const name of [\"Shirt\", \"Pin\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\n"
    },
    "estimatedMinutes": 3,
    "projectId": "async-school-club"
  },
  {
    "id": "node-async-school-club-8",
    "index": 248,
    "task": "You add one line at the end. It runs a cleanup message no matter if the wait succeeds or fails. This ensures cleanup happens always. The code below does that. Run the checker and paste its report.\n\nIn app.js:\n```\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "cleanup",
        "label": "The script prints Cleanup done",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Cleanup done"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use finally to run code after a try block, whether it succeeds or fails."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Shirt\")}`);\nconst prices = await Promise.all([\"Shirt\", \"Pin\", \"Badge\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Shirt\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\nfor (const name of [\"Shirt\", \"Pin\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\n"
    },
    "estimatedMinutes": 3,
    "projectId": "async-school-club"
  },
  {
    "id": "node-async-school-club-9",
    "index": 249,
    "task": "You add two lines at the end. One starts a timer that repeats every 10 milliseconds. The other stops it after three ticks. This lets you test how often something runs. The code below does that. Run the checker and paste its report.\n\nIn app.js:\n```\nlet ticks = 0;\nconst timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log(\"Ticks: 3\"); } }, 10);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "ticks",
        "label": "The script prints Ticks: 3",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Ticks: 3"
      },
      {
        "id": "stops",
        "label": "The script stops on its own",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use setInterval to repeat a task. Use clearInterval to stop it after three ticks."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nlet ticks = 0;\nconst timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log(\"Ticks: 3\"); } }, 10);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Shirt\")}`);\nconst prices = await Promise.all([\"Shirt\", \"Pin\", \"Badge\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Shirt\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\nfor (const name of [\"Shirt\", \"Pin\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\nlet ticks = 0;\nconst timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log(\"Ticks: 3\"); } }, 10);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "async-school-club"
  },
  {
    "id": "node-async-school-club-10",
    "index": 250,
    "task": "You add two lines at the end. The first runs a timer with zero delay. The second prints a message right after. This shows that async code runs even after sync code. The code below does that. Run the checker and paste its report.\n\nIn app.js:\n```\nsetTimeout(() => console.log(\"Timer done\"), 0);\nconsole.log(\"Sync done\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\n"
    },
    "tests": [
      {
        "id": "order",
        "label": "Sync done prints before Timer done",
        "kind": "local-node-prints",
        "file": "app.js",
        "value": "Sync done\nTimer done"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "setTimeout with 0 means the task runs as soon as possible, even after sync code."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js, right after the last line.\n\nIn app.js:\n```\nsetTimeout(() => console.log(\"Timer done\"), 0);\nconsole.log(\"Sync done\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconsole.log(\"Start\");\nawait wait(100);\nconsole.log(\"After wait\");\nconst fetchPrice = async (name) => { await wait(20); return name.length * 10; };\nconsole.log(`Price: ${await fetchPrice(\"Shirt\")}`);\nconst prices = await Promise.all([\"Shirt\", \"Pin\", \"Badge\"].map(fetchPrice));\nconsole.log(`All: ${prices.join(\", \")}`);\nconst slow = wait(200).then(() => \"slow\");\nconst fast = wait(20).then(() => \"fast\");\nconsole.log(`First: ${await Promise.race([slow, fast])}`);\nconst failing = async () => { throw new Error(\"Supplier offline\"); };\ntry { await failing(); } catch (error) { console.error(error.message); }\nconst results = await Promise.allSettled([fetchPrice(\"Shirt\"), failing()]);\nconsole.log(`Settled: ${results.map((result) => result.status).join(\" \")}`);\nfor (const name of [\"Shirt\", \"Pin\"]) {\n  console.log(`Checked ${name}: ${await fetchPrice(name)}`);\n}\ntry { await wait(10); } finally { console.log(\"Cleanup done\"); }\nlet ticks = 0;\nconst timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log(\"Ticks: 3\"); } }, 10);\nsetTimeout(() => console.log(\"Timer done\"), 0);\nconsole.log(\"Sync done\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "async-school-club"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: cli-school-club.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-cli-school-club-1",
    "index": 251,
    "task": "You will add code to app.js. This code counts how many words you typed after node app.js. The checker runs your code with the words Shirt 2. It checks if your code prints You typed 2 words. Run the checker to see the result.\n\nIn app.js:\n```\nconsole.log(`You typed ${args.length} words`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "words",
        "label": "node app.js Shirt 2 prints You typed 2 words",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Shirt",
          "2"
        ],
        "value": "You typed 2 words"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Think of words as pieces you type after the command."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js.\n\nIn app.js:\n```\nconsole.log(`You typed ${args.length} words`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "cli-school-club"
  },
  {
    "id": "node-cli-school-club-2",
    "index": 252,
    "task": "You will split the first two words into name and quantity. The checker runs your code with Shirt 2. It checks if your code prints Item: Shirt. Add the code at the end of app.js.\n\nIn app.js:\n```\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "item",
        "label": "node app.js Shirt 2 prints Item: Shirt",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Shirt",
          "2"
        ],
        "value": "Item: Shirt"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the code to split the words into two parts: the item name and the number."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js.\n\nIn app.js:\n```\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "cli-school-club"
  },
  {
    "id": "node-cli-school-club-3",
    "index": 253,
    "task": "You will turn the quantity text into a number. The checker runs your code with Shirt 2. It checks if your code prints Quantity: 2. Add the code at the end of app.js.\n\nIn app.js:\n```\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "quantity",
        "label": "node app.js Shirt 2 prints Quantity: 2",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Shirt",
          "2"
        ],
        "value": "Quantity: 2"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use Number() to turn text into a number."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js.\n\nIn app.js:\n```\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "cli-school-club"
  },
  {
    "id": "node-cli-school-club-4",
    "index": 254,
    "task": "You will look up the item's price and print the total cost. The checker runs your code with Shirt 2. It checks if your code prints Total: 500. Add the code at the end of app.js.\n\nIn app.js:\n```\nconst prices = { \"Shirt\": 250, \"Pin\": 30, \"Badge\": 45 };\nconsole.log(`Total: ${prices[name] * count}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "total",
        "label": "node app.js Shirt 2 prints Total: 500",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Shirt",
          "2"
        ],
        "value": "Total: 500"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use a price list to find the cost of the item."
      },
      {
        "level": 2,
        "text": "Add the code at the end of app.js.\n\nIn app.js:\n```\nconst prices = { \"Shirt\": 250, \"Pin\": 30, \"Badge\": 45 };\nconsole.log(`Total: ${prices[name] * count}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Shirt\": 250, \"Pin\": 30, \"Badge\": 45 };\nconsole.log(`Total: ${prices[name] * count}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-school-club"
  },
  {
    "id": "node-cli-school-club-5",
    "index": 255,
    "task": "You will stop the program with exit code 1 if no item is typed. The checker runs your code with no words. It checks if your code stops and shows a message. Add the code right after the line that sets name and quantity.\n\nIn app.js:\n```\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "exit",
        "label": "node app.js with no words ends with exit code 1",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "code": 1
      },
      {
        "id": "usage",
        "label": "It explains how to use the tool",
        "kind": "local-node-stderr",
        "file": "app.js",
        "value": "Usage: node app.js <item> <quantity>"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use process.exit(1) to stop the program with an error."
      },
      {
        "level": 2,
        "text": "Add the code right after the line that sets name and quantity.\n\nIn app.js:\n```\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Shirt\": 250, \"Pin\": 30, \"Badge\": 45 };\nconsole.log(`Total: ${prices[name] * count}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-school-club"
  }
] satisfies typeof nodeBasicsCourse.steps));

// Validated local authoring batch: cli-school-club.
nodeBasicsCourse.steps.push(...([
  {
    "id": "node-cli-school-club-6",
    "index": 256,
    "task": "Add one line before the last console.log. This line stops the program if the item is not on the price list. The code below does that. Run the checker to confirm it works.\n\nIn app.js:\n```\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "exit",
        "label": "node app.js Milk 1 ends with exit code 2",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "args": [
          "Milk",
          "1"
        ],
        "code": 2
      },
      {
        "id": "message",
        "label": "It reports Unknown item: Milk",
        "kind": "local-node-stderr",
        "file": "app.js",
        "args": [
          "Milk",
          "1"
        ],
        "value": "Unknown item: Milk"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the item is not in the prices list, stop the program with error code 2."
      },
      {
        "level": 2,
        "text": "Put this line right before the last console.log in app.js.\n\nIn app.js:\n```\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Shirt\": 250, \"Pin\": 30, \"Badge\": 45 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconsole.log(`Total: ${prices[name] * count}`);\n"
    },
    "estimatedMinutes": 3,
    "projectId": "cli-school-club"
  },
  {
    "id": "node-cli-school-club-7",
    "index": 257,
    "task": "Add one line after the line that sets count. This line stops the program if the quantity is not a whole number. The code below does that. Run the checker to confirm it works.\n\nIn app.js:\n```\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "exit",
        "label": "node app.js Shirt abc ends with exit code 3",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "args": [
          "Shirt",
          "abc"
        ],
        "code": 3
      },
      {
        "id": "fine",
        "label": "node app.js Shirt 2 still works",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "args": [
          "Shirt",
          "2"
        ],
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Check if the quantity is a whole number and at least 1. If not, stop with error code 3."
      },
      {
        "level": 2,
        "text": "Put this line right after where count is set in app.js.\n\nIn app.js:\n```\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Shirt\": 250, \"Pin\": 30, \"Badge\": 45 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconsole.log(`Total: ${prices[name] * count}`);\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-school-club"
  },
  {
    "id": "node-cli-school-club-8",
    "index": 258,
    "task": "Add two lines at the end of app.js. The first line checks if --receipt was typed. The second line prints a thank-you message if it was. The code below does that. Run the checker to confirm it works.\n\nIn app.js:\n```\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "flag",
        "label": "node app.js Shirt 2 --receipt prints the receipt line",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Shirt",
          "2",
          "--receipt"
        ],
        "value": "Receipt: thank you!"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use args.includes(\"--receipt\") to check if --receipt was typed. Then print the message if true."
      },
      {
        "level": 2,
        "text": "Put these two lines at the very end of app.js, after the total line.\n\nIn app.js:\n```\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Shirt\": 250, \"Pin\": 30, \"Badge\": 45 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconsole.log(`Total: ${prices[name] * count}`);\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "cli-school-club"
  },
  {
    "id": "node-cli-school-club-9",
    "index": 259,
    "task": "Add one line before the total line to get the currency. Change the total line to use that currency. The code below does that. Run the checker to confirm it works.\n\nIn app.js:\n```\nconst currency = process.env.CURRENCY ?? \"PHP\";\nconsole.log(`Total: ${currency} ${prices[name] * count}`);\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "currency",
        "label": "With CURRENCY=USD it prints Total: USD 500",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "Shirt",
          "2"
        ],
        "env": {
          "CURRENCY": "USD"
        },
        "value": "Total: USD 500"
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use process.env.CURRENCY to get the currency, or use \"PHP\" if not set."
      },
      {
        "level": 2,
        "text": "Replace the total line with the new one that uses the currency variable.\n\nIn app.js:\n```\nconst currency = process.env.CURRENCY ?? \"PHP\";\nconsole.log(`Total: ${currency} ${prices[name] * count}`);\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Shirt\": 250, \"Pin\": 30, \"Badge\": 45 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconst currency = process.env.CURRENCY ?? \"PHP\";\nconsole.log(`Total: ${currency} ${prices[name] * count}`);\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n"
    },
    "estimatedMinutes": 4,
    "projectId": "cli-school-club"
  },
  {
    "id": "node-cli-school-club-10",
    "index": 260,
    "task": "Add one line right after the first line. This line checks if --help was typed. If so, it prints the usage and stops normally. The code below does that. Run the checker to confirm it works.\n\nIn app.js:\n```\nif (args[0] === \"--help\") { console.log(\"Usage: node app.js <item> <quantity> [--receipt]\"); process.exit(0); }\n```",
    "kind": "local",
    "inputMode": "free",
    "files": {
      "report.txt": ""
    },
    "activeFile": "report.txt",
    "localSeed": {
      "package.json": "{\n  \"type\": \"module\"\n}\n",
      "README.txt": "School Club Node.js project.\nFollow the CodeDaddy course steps inside this folder.\n",
      "app.js": "const args = process.argv.slice(2);\nconsole.log(\"Order tool\");\n"
    },
    "tests": [
      {
        "id": "help",
        "label": "node app.js --help prints the usage",
        "kind": "local-node-prints",
        "file": "app.js",
        "args": [
          "--help"
        ],
        "value": "[--receipt]"
      },
      {
        "id": "exit",
        "label": "node app.js --help ends with exit code 0",
        "kind": "local-node-exit-code",
        "file": "app.js",
        "args": [
          "--help"
        ],
        "code": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "If the first argument is --help, print the usage and exit with code 0."
      },
      {
        "level": 2,
        "text": "Put this line right after the first line in app.js, before any other checks.\n\nIn app.js:\n```\nif (args[0] === \"--help\") { console.log(\"Usage: node app.js <item> <quantity> [--receipt]\"); process.exit(0); }\n```"
      }
    ],
    "xp": 10,
    "solution": {
      "commands.txt": ""
    },
    "localFiles": {
      "app.js": "const args = process.argv.slice(2);\nif (args[0] === \"--help\") { console.log(\"Usage: node app.js <item> <quantity> [--receipt]\"); process.exit(0); }\nconsole.log(\"Order tool\");\nconsole.log(`You typed ${args.length} words`);\nconst [name, quantity] = args;\nif (!name) { console.error(\"Usage: node app.js <item> <quantity>\"); process.exit(1); }\nconsole.log(`Item: ${name}`);\nconst count = Number(quantity);\nif (!Number.isInteger(count) || count < 1) { console.error(\"Quantity must be a whole number\"); process.exit(3); }\nconsole.log(`Quantity: ${count}`);\nconst prices = { \"Shirt\": 250, \"Pin\": 30, \"Badge\": 45 };\nif (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }\nconst currency = process.env.CURRENCY ?? \"PHP\";\nconsole.log(`Total: ${currency} ${prices[name] * count}`);\nconst receipt = args.includes(\"--receipt\");\nif (receipt) console.log(\"Receipt: thank you!\");\n"
    },
    "estimatedMinutes": 3,
    "projectId": "cli-school-club"
  }
] satisfies typeof nodeBasicsCourse.steps));
