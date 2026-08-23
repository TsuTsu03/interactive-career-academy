import type { Course, Step } from "@/lib/lesson-ir";

/**
 * Course 3 — Learn JavaScript by Building a Palengke Price Counter.
 *
 * Script steps run in an isolated frame and are checked on what the code
 * actually did: what it printed, what its values are, what its functions
 * return. The preview pane becomes a console for these steps.
 */

let n = 0;
const js = (body: string) => ({ "script.js": body });

interface StepReference {
  estimatedMinutes: number;
  solution: Record<string, string>;
}

/** Authored proof for every step. Missing entries stop the course from loading. */
const references = {
  "console-log": {
    estimatedMinutes: 4,
    solution: js('console.log("Palengke open");\n'),
  },
  variable: { estimatedMinutes: 5, solution: js("let price = 25;\n") },
  const: {
    estimatedMinutes: 5,
    solution: js('let price = 25;\nconst storeName = "Divisoria";\n'),
  },
  maths: {
    estimatedMinutes: 5,
    solution: js(
      'let price = 25;\nconst storeName = "Divisoria";\nlet total = price * 3;\n',
    ),
  },
  template: {
    estimatedMinutes: 6,
    solution: js(
      "let price = 25;\nlet total = price * 3;\nconsole.log(`Total: ${total} pesos`);\n",
    ),
  },
  function: {
    estimatedMinutes: 7,
    solution: js("function double(n) {\n  return n * 2;\n}\n"),
  },
  if: {
    estimatedMinutes: 6,
    solution: js("function isCheap(p) {\n  return p < 30;\n}\n"),
  },
  array: {
    estimatedMinutes: 5,
    solution: js("const prices = [25, 40, 15];\n"),
  },
  index: {
    estimatedMinutes: 4,
    solution: js("const prices = [25, 40, 15];\nconst first = prices[0];\n"),
  },
  loop: {
    estimatedMinutes: 7,
    solution: js(
      "const prices = [25, 40, 15];\n\nfor (const price of prices) {\n  console.log(price);\n}\n",
    ),
  },
  "sum-function": {
    estimatedMinutes: 8,
    solution: js(
      "function addUp(list) {\n  let total = 0;\n  for (const item of list) {\n    total = total + item;\n  }\n  return total;\n}\n",
    ),
  },
  final: {
    estimatedMinutes: 6,
    solution: js(
      "const prices = [25, 40, 15];\n\nfunction addUp(list) {\n  let t = 0;\n  for (const item of list) {\n    t = t + item;\n  }\n  return t;\n}\n\nconsole.log(`Total: ${addUp(prices)} pesos`);\n",
    ),
  },
} satisfies Record<string, StepReference>;

const s = (step: Omit<Step, "index" | "kind">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for JavaScript step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "js" };
};

export const jsCourse: Course = {
  id: "js-basics",
  order: 3,
  title: "Learn JavaScript by Building a Palengke Price Counter",
  project: "Palengke Price Counter",
  kind: "js",
  requires: ["css-basics"],
  summary: {
    simple: "Now make it think. Store numbers, do maths, make decisions, repeat work.",
    standard:
      "Behaviour. Variables, types, operators, conditionals, functions, arrays, and loops.",
  },
  steps: [
    s({
      id: "console-log",
      task: {
        simple: 'Make the computer say something. Print the words Palengke open.',
        standard: 'Use console.log to print the string "Palengke open".',
      },
      inputMode: "guided",
      files: js("// Print something below this line\n"),
      activeFile: "script.js",
      tests: [
        {
          id: "logs-open",
          kind: "js-logs",
          values: ["Palengke open"],
          label: { simple: "It prints Palengke open", standard: 'Console output is "Palengke open"' },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "console.log is how you show something. Words need quotes.",
            standard: "`console.log(\"...\")` writes to the console.",
          },
        },
        {
          level: 2,
          text: {
            simple: 'console.log("Palengke open");',
            standard: '`console.log("Palengke open");`',
          },
        },
      ],
      xp: 40,
    }),
    s({
      id: "variable",
      task: {
        simple:
          "A variable remembers a value. Make one called price that holds 25.",
        standard: "Declare a variable named price with the value 25.",
      },
      inputMode: "guided",
      files: js("// Make the variable below\n"),
      activeFile: "script.js",
      tests: [
        {
          id: "price-25",
          kind: "js-value",
          expression: "price",
          equals: 25,
          label: { simple: "price holds 25", standard: "price equals 25" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Use let, then the name, then =, then the number.",
            standard: "`let price = 25;`",
          },
        },
      ],
      xp: 50,
    }),
    s({
      id: "const",
      task: {
        simple:
          "Some things never change. Make a const called storeName holding Divisoria.",
        standard: "Declare a const named storeName with the string Divisoria.",
      },
      inputMode: "guided",
      files: js("let price = 25;\n"),
      activeFile: "script.js",
      tests: [
        {
          id: "storename",
          kind: "js-value",
          expression: "storeName",
          equals: "Divisoria",
          label: { simple: "storeName holds Divisoria", standard: 'storeName equals "Divisoria"' },
        },
        {
          id: "uses-const",
          kind: "source-matches",
          file: "script.js",
          pattern: "const\\s+storeName",
          because: {
            simple: "Use const, not let, so it cannot be changed later.",
            standard: "Declare storeName with `const`.",
          },
          label: { simple: "You used const", standard: "storeName is declared with const" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "const means it can never be changed after this.",
            standard: "`const` creates a binding that cannot be reassigned.",
          },
        },
      ],
      xp: 50,
    }),
    s({
      id: "maths",
      task: {
        simple:
          "Three kilos at 25 each. Make a variable total that multiplies price by 3.",
        standard: "Declare total as price multiplied by 3.",
      },
      inputMode: "guided",
      files: js('let price = 25;\nconst storeName = "Divisoria";\n'),
      activeFile: "script.js",
      tests: [
        {
          id: "total-75",
          kind: "js-value",
          expression: "total",
          equals: 75,
          label: { simple: "total is 75", standard: "total equals 75" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "The star * means multiply.",
            standard: "`let total = price * 3;`",
          },
        },
      ],
      xp: 50,
    }),
    s({
      id: "template",
      task: {
        simple:
          "Print the total in a sentence. Use backticks and ${total} to drop the number in.",
        standard: "Use a template literal to print `Total: 75 pesos`.",
      },
      inputMode: "guided",
      files: js("let price = 25;\nlet total = price * 3;\n"),
      activeFile: "script.js",
      tests: [
        {
          id: "logs-total",
          kind: "js-logs",
          values: ["Total: 75 pesos"],
          label: { simple: "It prints Total: 75 pesos", standard: "Console output matches" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Backticks are the key above Tab, not normal quotes.",
            standard: "Template literals use backticks and `${}` interpolation.",
          },
        },
        {
          level: 2,
          text: {
            simple: "console.log(`Total: ${total} pesos`);",
            standard: "`console.log(`Total: ${total} pesos`);`",
          },
        },
      ],
      xp: 60,
    }),
    s({
      id: "function",
      task: {
        simple: "Make a function called double. It returns twice the number you give it.",
        standard: "Write a function double(n) that returns n multiplied by 2.",
      },
      inputMode: "guided",
      files: js("// Write your function below\n"),
      activeFile: "script.js",
      tests: [
        {
          id: "double-4",
          kind: "js-returns",
          fn: "double",
          args: [4],
          equals: 8,
          label: { simple: "double(4) gives 8", standard: "double(4) returns 8" },
        },
        {
          id: "double-25",
          kind: "js-returns",
          fn: "double",
          args: [25],
          equals: 50,
          label: { simple: "double(25) gives 50", standard: "double(25) returns 50" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "A function needs return to give a value back.",
            standard: "Without `return` a function evaluates to undefined.",
          },
        },
        {
          level: 2,
          text: {
            simple: "function double(n) {\n  return n * 2;\n}",
            standard: "`function double(n) { return n * 2; }`",
          },
        },
      ],
      xp: 70,
    }),
    s({
      id: "if",
      task: {
        simple: "Make a function called isCheap. It returns true below 30, and false otherwise.",
        standard: "Write isCheap(p) returning true when p is less than 30.",
      },
      inputMode: "guided",
      files: js("// Write your function below\n"),
      activeFile: "script.js",
      tests: [
        {
          id: "cheap-yes",
          kind: "js-returns",
          fn: "isCheap",
          args: [20],
          equals: true,
          label: { simple: "isCheap(20) is true", standard: "isCheap(20) returns true" },
        },
        {
          id: "cheap-no",
          kind: "js-returns",
          fn: "isCheap",
          args: [45],
          equals: false,
          label: { simple: "isCheap(45) is false", standard: "isCheap(45) returns false" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "The < sign means less than.",
            standard: "`return p < 30;` is enough; no if statement required.",
          },
        },
      ],
      xp: 70,
    }),
    s({
      id: "array",
      task: {
        simple:
          "Make a list called prices holding 25, 40 and 15. Lists use square brackets.",
        standard: "Declare an array prices containing 25, 40, 15.",
      },
      inputMode: "guided",
      files: js("// Make the list below\n"),
      activeFile: "script.js",
      tests: [
        {
          id: "prices-array",
          kind: "js-value",
          expression: "prices",
          equals: [25, 40, 15],
          label: { simple: "prices holds the three numbers", standard: "prices equals [25, 40, 15]" },
        },
        {
          id: "prices-length",
          kind: "js-value",
          expression: "prices.length",
          equals: 3,
          label: { simple: "The list has three things", standard: "prices.length is 3" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Square brackets, numbers separated by commas.",
            standard: "`const prices = [25, 40, 15];`",
          },
        },
      ],
      xp: 70,
    }),
    s({
      id: "index",
      task: {
        simple:
          "Lists start counting at 0. Make a variable first holding the first price.",
        standard: "Declare first as the element at index 0 of prices.",
      },
      inputMode: "guided",
      files: js("const prices = [25, 40, 15];\n"),
      activeFile: "script.js",
      tests: [
        {
          id: "first-25",
          kind: "js-value",
          expression: "first",
          equals: 25,
          label: { simple: "first is 25", standard: "first equals 25" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "The first one is number 0, not number 1.",
            standard: "`prices[0]` is the first element.",
          },
        },
      ],
      xp: 60,
    }),
    s({
      id: "loop",
      task: {
        simple:
          "Print every price in the list, one per line. Use a for loop.",
        standard: "Loop over prices and log each value.",
      },
      inputMode: "guided",
      files: js("const prices = [25, 40, 15];\n\n// Loop below\n"),
      activeFile: "script.js",
      tests: [
        {
          id: "logs-each",
          kind: "js-logs",
          values: ["25", "40", "15"],
          label: { simple: "It prints all three prices", standard: "Each price is logged in order" },
        },
        {
          id: "uses-loop",
          kind: "source-matches",
          file: "script.js",
          pattern: "for\\s*\\(|forEach|for\\s+.*\\s+of\\s+",
          because: {
            simple: "Use a loop, not three separate console.log lines.",
            standard: "Expected a loop construct rather than repeated statements.",
          },
          label: { simple: "You used a loop", standard: "A loop is present" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "A loop repeats the same work for each thing in the list.",
            standard: "`for (const p of prices) { console.log(p); }`",
          },
        },
      ],
      xp: 80,
    }),
    s({
      id: "sum-function",
      task: {
        simple: "Make a function called addUp. It returns the total of a list of numbers.",
        standard: "Write addUp(list) returning the sum of its numbers.",
      },
      inputMode: "guided",
      files: js("// Write your function below\n"),
      activeFile: "script.js",
      tests: [
        {
          id: "addup-basic",
          kind: "js-returns",
          fn: "addUp",
          args: [[25, 40, 15]],
          equals: 80,
          label: { simple: "addUp([25,40,15]) gives 80", standard: "addUp returns 80" },
        },
        {
          id: "addup-empty",
          kind: "js-returns",
          fn: "addUp",
          args: [[]],
          equals: 0,
          label: {
            simple: "An empty list gives 0",
            standard: "addUp([]) returns 0",
          },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Start a total at 0, then add each number to it.",
            standard: "Accumulate into a variable initialised to 0.",
          },
        },
        {
          level: 2,
          text: {
            simple:
              "function addUp(list) {\n  let t = 0;\n  for (const nItem of list) {\n    t = t + nItem;\n  }\n  return t;\n}",
            standard: "`let t = 0; for (const x of list) t += x; return t;`",
          },
        },
      ],
      xp: 90,
    }),
    s({
      id: "final",
      task: {
        simple:
          "Last one. Print the total using your function, like this: Total: 80 pesos",
        standard: "Use addUp with prices and log the result in a template literal.",
      },
      inputMode: "guided",
      files: js(
        "const prices = [25, 40, 15];\n\nfunction addUp(list) {\n  let t = 0;\n  for (const item of list) {\n    t = t + item;\n  }\n  return t;\n}\n\n// Print the total below\n",
      ),
      activeFile: "script.js",
      tests: [
        {
          id: "final-log",
          kind: "js-logs",
          values: ["Total: 80 pesos"],
          label: { simple: "It prints Total: 80 pesos", standard: "Console output matches" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Call your function inside the backticks.",
            standard: "`console.log(`Total: ${addUp(prices)} pesos`);`",
          },
        },
      ],
      xp: 120,
    }),
  ],
};
