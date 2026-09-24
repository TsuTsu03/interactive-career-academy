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
