import type { Course, Step, TestSpec } from "@/lib/lesson-ir";

/**
 * The first database course.
 *
 * Every step here runs against a real SQLite database built in the browser by
 * `lib/sql-runner.ts` (PLAN.md decision 42), so a query is checked on the rows
 * it returned rather than on the text the learner typed.
 *
 * The seed is deliberately shaped so that id order and price order disagree.
 * Without that, the ORDER BY step would already pass before the learner wrote
 * anything, which AGENTS.md 1.8 exists to prevent.
 */
const SEED = `
CREATE TABLE product (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  stock INTEGER NOT NULL
);
INSERT INTO product (id, name, price, stock) VALUES
  (1, 'Canned Sardines', 32, 5),
  (2, 'Softdrink', 25, 12),
  (3, 'Chichirya', 15, 40),
  (4, 'Instant Noodles', 18, 60),
  (5, 'Shampoo Sachet', 8, 100);
`.trim();

interface Draft {
  id: string;
  projectId: string;
  task: string;
  start: string;
  solution: string;
  tests: TestSpec[];
  hints: [string, string];
  minutes: number;
}

const drafts: Draft[] = [
  {
    id: "sql-select-one-column",
    projectId: "price-list",
    task: "A table is a grid of saved information. This one is called product, and each row is one item on the shelf. Ask the database for the name of every product. In SQL you ask with SELECT, then the column you want, then FROM and the table name. End the line with a semicolon.",
    start: "",
    solution: "SELECT name FROM product;",
    tests: [
      { id: "cols", label: "It asks for the name column", kind: "sql-columns-equal", columns: ["name"] },
      { id: "count", label: "All five products come back", kind: "sql-row-count", count: 5 },
    ],
    hints: [
      "The order is always the same: SELECT, then what you want, then FROM, then where it lives.",
      "Write SELECT name FROM product; on one line.",
    ],
    minutes: 4,
  },
  {
    id: "sql-select-two-columns",
    projectId: "price-list",
    task: "A price list needs the price beside the name. Ask for both columns by separating them with a comma.",
    start: "SELECT name FROM product;",
    solution: "SELECT name, price FROM product;",
    tests: [
      { id: "cols", label: "Both name and price come back", kind: "sql-columns-equal", columns: ["name", "price"] },
      { id: "count", label: "All five products come back", kind: "sql-row-count", count: 5 },
    ],
    hints: [
      "A comma separates the columns you are asking for.",
      "Put , price directly after name.",
    ],
    minutes: 3,
  },
  {
    id: "sql-where",
    projectId: "price-list",
    task: "You only want the more expensive items. WHERE filters the rows, keeping the ones where a condition is true. Keep only products priced above 20.",
    start: "SELECT name, price FROM product;",
    solution: "SELECT name, price FROM product WHERE price > 20;",
    tests: [
      { id: "count", label: "Only two products are left", kind: "sql-row-count", count: 2 },
      {
        id: "rows",
        label: "They are the two priced above 20",
        kind: "sql-rows-equal",
        ignoreOrder: true,
        rows: [
          ["Canned Sardines", 32],
          ["Softdrink", 25],
        ],
      },
    ],
    hints: [
      "WHERE goes after the table name, and describes what has to be true about a row.",
      "Add WHERE price > 20 before the semicolon.",
    ],
    minutes: 5,
  },
  {
    id: "sql-order-by",
    projectId: "price-list",
    task: "The two rows come back in the order they happen to sit in the table, which is not useful on a price list. ORDER BY sorts them. Sort by price, cheapest first.",
    start: "SELECT name, price FROM product WHERE price > 20;",
    solution: "SELECT name, price FROM product WHERE price > 20 ORDER BY price;",
    tests: [
      {
        id: "rows",
        label: "Cheapest first",
        kind: "sql-rows-equal",
        rows: [
          ["Softdrink", 25],
          ["Canned Sardines", 32],
        ],
      },
    ],
    hints: [
      "ORDER BY comes after WHERE, and names the column to sort on.",
      "Add ORDER BY price before the semicolon. Cheapest first is the default direction.",
    ],
    minutes: 5,
  },
  {
    id: "sql-limit",
    projectId: "price-list",
    task: "Sometimes you only want the top of the list. LIMIT stops the results after a number of rows. Keep only the cheapest one.",
    start: "SELECT name, price FROM product WHERE price > 20 ORDER BY price;",
    solution: "SELECT name, price FROM product WHERE price > 20 ORDER BY price LIMIT 1;",
    tests: [
      { id: "count", label: "Only one row comes back", kind: "sql-row-count", count: 1 },
      { id: "row", label: "It is the cheaper of the two", kind: "sql-row-contains", row: ["Softdrink", 25] },
    ],
    hints: [
      "LIMIT goes last, after the sorting.",
      "Add LIMIT 1 before the semicolon.",
    ],
    minutes: 3,
  },
  {
    id: "sql-count",
    projectId: "stock-check",
    task: "Now a different question: not which items, but how many. COUNT(*) reports the number of rows instead of listing them. Count every product in the table.",
    start: "",
    solution: "SELECT COUNT(*) FROM product;",
    tests: [
      { id: "count", label: "One row of answer comes back", kind: "sql-row-count", count: 1 },
      { id: "value", label: "The answer is five", kind: "sql-value-equals", row: 0, column: 0, value: 5 },
    ],
    hints: [
      "You are still using SELECT and FROM. Only the thing you select changes.",
      "Write SELECT COUNT(*) FROM product; on one line.",
    ],
    minutes: 4,
  },
  {
    id: "sql-count-where",
    projectId: "stock-check",
    task: "Counting everything is rarely the question. You want to know how many items are nearly sold out. Count only the products with less than 20 in stock.",
    start: "SELECT COUNT(*) FROM product;",
    solution: "SELECT COUNT(*) FROM product WHERE stock < 20;",
    tests: [
      { id: "value", label: "Two products are running low", kind: "sql-value-equals", row: 0, column: 0, value: 2 },
    ],
    hints: [
      "WHERE filters rows before they are counted.",
      "Add WHERE stock < 20 before the semicolon.",
    ],
    minutes: 4,
  },
  {
    id: "sql-alias",
    projectId: "stock-check",
    task: "The column heading currently reads COUNT(*), which tells a reader nothing. AS gives a result column a clearer name. Name this one low_stock.",
    start: "SELECT COUNT(*) FROM product WHERE stock < 20;",
    solution: "SELECT COUNT(*) AS low_stock FROM product WHERE stock < 20;",
    tests: [
      { id: "cols", label: "The column is named low_stock", kind: "sql-columns-equal", columns: ["low_stock"] },
      { id: "value", label: "The answer is still two", kind: "sql-value-equals", row: 0, column: 0, value: 2 },
    ],
    hints: [
      "The new name goes directly after the thing being named.",
      "Write COUNT(*) AS low_stock.",
    ],
    minutes: 3,
  },
];

const steps: Step[] = drafts.map((draft, i) => ({
  id: draft.id,
  index: i + 1,
  task: draft.task,
  kind: "sql",
  inputMode: "free",
  files: { "query.sql": draft.start },
  activeFile: "query.sql",
  sqlSeed: SEED,
  tests: draft.tests,
  hints: [
    { level: 1, text: draft.hints[0] },
    { level: 2, text: draft.hints[1] },
  ],
  xp: 10,
  solution: { "query.sql": draft.solution },
  estimatedMinutes: draft.minutes,
  projectId: draft.projectId,
}));

export const sqlCourse: Course = {
  id: "sql-basics",
  title: "Learn SQL by Building a Sari-Sari Store Inventory",
  project: "Store Price List",
  projects: [
    { id: "price-list", title: "Store Price List" },
    { id: "stock-check", title: "Stock Check" },
  ],
  order: 11,
  summary:
    "Ask a real database questions. Read rows, filter them, sort them, and count them, using a store inventory you already understand.",
  requires: [],
  kind: "sql",
  steps,
};
