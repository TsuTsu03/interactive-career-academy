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
