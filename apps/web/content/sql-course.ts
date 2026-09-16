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
  seed?: string;
  conceptIds?: string[];
}

const drafts: Draft[] = [
  {
    id: "sql-select-one-column",
    conceptIds: ["sql-select"],
    projectId: "price-list",
    task: "A sari-sari store is a neighborhood shop. A table is a grid of saved information. This one is called product, and each row is one item on the shelf. Ask the database for the name of every product. In SQL you ask with SELECT, then the column you want, then FROM and the table name. End the line with a semicolon.",
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
    conceptIds: ["sql-select"],
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
    conceptIds: ["sql-filter"],
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
    conceptIds: ["sql-order-by"],
    projectId: "price-list",
    task: "Without ORDER BY, SQL does not promise a row order. A price list needs a clear order. Use ORDER BY price to show the cheaper product first.",
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
    conceptIds: ["sql-limit"],
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
    conceptIds: ["sql-count"],
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
    conceptIds: ["sql-filter"],
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
    conceptIds: ["sql-alias"],
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

const SALES_SEED = `CREATE TABLE sale (id INTEGER, stall TEXT, amount INTEGER, paid INTEGER);
INSERT INTO sale VALUES (1, 'Mila', 120, 1), (2, 'Mila', 180, 1),
  (3, 'Romy', 60, 1), (4, 'Romy', 30, 1), (5, 'Luz', 90, 1), (6, 'Luz', 110, 0);`;
const ROUTES_SEED = `CREATE TABLE driver (id INTEGER, name TEXT);
INSERT INTO driver VALUES (1, 'Liza'), (2, 'Jun');
CREATE TABLE route (id INTEGER, name TEXT, driver_id INTEGER, fare INTEGER);
INSERT INTO route VALUES (1, 'Cubao to Quiapo', 2, 20), (2, 'Tondo to Divisoria', 1, 13),
  (3, 'Pasig to Marikina', NULL, 25), (4, 'San Juan to Quiapo', 2, 15);`;

/** A new project resets its database; each later step starts at the last solution. */
function appendProject(projectId: string, seed: string, lessons: Omit<Draft, "projectId" | "seed" | "start">[]) {
  let start = "";
  for (const lesson of lessons) {
    drafts.push({ ...lesson, projectId, seed, start });
    start = lesson.solution;
  }
}

const rows = (label: string, expected: unknown[][], ignoreOrder = false): TestSpec => ({
  id: "rows", label, kind: "sql-rows-equal", rows: expected, ignoreOrder,
});

appendProject("palengke-sales", SALES_SEED, [
  {
    id: "sql-market-read-sales",
    task: "A palengke is a public market. Its sale table records a stall name, an amount in pesos, and paid: 1 for paid, 0 for unpaid. Begin a sales report by reading stall and amount from every sale.",
    solution: "SELECT stall, amount FROM sale;",
    tests: [rows("All six sales show their stall and amount", [["Mila", 120], ["Mila", 180], ["Romy", 60], ["Romy", 30], ["Luz", 90], ["Luz", 110]], true)],
    hints: ["Read the table description and choose the two fields the report needs.", "Write SELECT stall, amount FROM sale;"], minutes: 4, conceptIds: ["sql-select"],
  },
  {
    id: "sql-market-sum",
    task: "The market manager needs the combined amount, including unpaid sales for now. SUM adds values from a column. Replace the selected fields with SUM(amount) AS total.",
    solution: "SELECT SUM(amount) AS total FROM sale;",
    tests: [rows("The combined amount is 590 pesos", [[590]]), { id: "heading", label: "The answer is named total", kind: "sql-columns-equal", columns: ["total"] }],
    hints: ["The report needs one combined number instead of separate sale rows.", "Use SELECT SUM(amount) AS total FROM sale;"], minutes: 4, conceptIds: ["sql-sum"],
  },
  {
    id: "sql-market-group-stalls",
    task: "Each stall needs its own total. GROUP BY collects rows with the same stall name before adding their amounts. Select stall beside the total, then add GROUP BY stall.",
    solution: "SELECT stall, SUM(amount) AS total FROM sale GROUP BY stall;",
    tests: [rows("Each stall has its own combined amount", [["Mila", 300], ["Romy", 90], ["Luz", 200]], true)],
    hints: ["The table has repeated stall names. Keep their totals separate.", "Select stall, SUM(amount) AS total and end with GROUP BY stall;"], minutes: 5, conceptIds: ["sql-group-by"],
  },
  {
    id: "sql-market-descending",
    task: "Put the largest stall total first. DESC reverses the usual ascending order. Add ORDER BY total DESC after the grouping.",
    solution: "SELECT stall, SUM(amount) AS total FROM sale GROUP BY stall ORDER BY total DESC;",
    tests: [rows("Stalls run from the largest total to the smallest", [["Mila", 300], ["Luz", 200], ["Romy", 90]])],
    hints: ["Compare the totals before choosing the direction of the report.", "Add ORDER BY total DESC before the semicolon."], minutes: 3, conceptIds: ["sql-descending"],
  },
  {
    id: "sql-market-having",
    task: "Only show stalls whose combined amount exceeds 100 pesos. HAVING filters completed groups. Add HAVING SUM(amount) > 100 between GROUP BY and ORDER BY.",
    solution: "SELECT stall, SUM(amount) AS total FROM sale GROUP BY stall HAVING SUM(amount) > 100 ORDER BY total DESC;",
    tests: [rows("Only the two stall totals above 100 remain", [["Mila", 300], ["Luz", 200]])],
    hints: ["This condition applies to a stall total, not to each individual sale.", "Put HAVING SUM(amount) > 100 after GROUP BY stall."], minutes: 5, conceptIds: ["sql-having"],
  },
  {
    id: "sql-market-average",
    task: "Change the report to the average sale amount per stall. AVG adds the amounts and divides by their count. Use AVG(amount) AS average, keep averages above 50 with HAVING, and sort by average DESC.",
    solution: "SELECT stall, AVG(amount) AS average FROM sale GROUP BY stall HAVING AVG(amount) > 50 ORDER BY average DESC;",
    tests: [rows("Mila averages 150 pesos and Luz averages 100", [["Mila", 150], ["Luz", 100]]), { id: "heading", label: "The amount column is named average", kind: "sql-columns-equal", columns: ["stall", "average"] }],
    hints: ["The selected calculation, group condition, and sort name must describe the same measure.", "Use AVG(amount) AS average, HAVING AVG(amount) > 50, and ORDER BY average DESC."], minutes: 5, conceptIds: ["sql-average"],
  },
  {
    id: "sql-market-paid-only",
    task: "An unpaid sale must not affect the final report. Add WHERE paid = 1 before GROUP BY. Keep the average calculation and HAVING condition. Watch how removing Luz's unpaid sale changes its average.",
    solution: "SELECT stall, AVG(amount) AS average FROM sale WHERE paid = 1 GROUP BY stall HAVING AVG(amount) > 50 ORDER BY average DESC;",
    tests: [rows("Paid sales average 150 for Mila and 90 for Luz", [["Mila", 150], ["Luz", 90]])],
    hints: ["Remove unpaid rows before calculating each stall's average.", "Put WHERE paid = 1 between FROM sale and GROUP BY stall."], minutes: 5, conceptIds: ["sql-filter"],
  },
]);

const joinedRoutes = [["Cubao to Quiapo", "Jun", 20], ["Tondo to Divisoria", "Liza", 13], ["San Juan to Quiapo", "Jun", 15]];
const allRoutes = [...joinedRoutes, ["Pasig to Marikina", "Unassigned", 25]];
appendProject("jeepney-dispatch", ROUTES_SEED, [
  {
    id: "sql-route-qualified-columns",
    task: "A jeepney is a shared public vehicle. This dispatch database has route and driver tables. Both use a name column. A qualified name includes its table, such as route.name. Read route.name and route.driver_id from route.",
    solution: "SELECT route.name, route.driver_id FROM route;",
    tests: [rows("Each route shows its assigned driver number", [["Cubao to Quiapo", 2], ["Tondo to Divisoria", 1], ["Pasig to Marikina", null], ["San Juan to Quiapo", 2]], true)],
    hints: ["The dot identifies which table owns a field with a shared name.", "Write SELECT route.name, route.driver_id FROM route;"], minutes: 4, conceptIds: ["sql-qualified-column"],
  },
  {
    id: "sql-route-inner-join",
    task: "A driver number is hard to read at dispatch. JOIN combines matching rows from two tables. Match driver.id to route.driver_id using ON. Show route.name, driver.name AS driver, and route.fare.",
    solution: "SELECT route.name, driver.name AS driver, route.fare FROM route JOIN driver ON driver.id = route.driver_id;",
    tests: [rows("The three assigned routes show their driver's name and fare", joinedRoutes, true)],
    hints: ["The matching numbers connect a route record to a driver record.", "Select route.name, driver.name AS driver, route.fare FROM route JOIN driver ON driver.id = route.driver_id;"], minutes: 6, conceptIds: ["sql-inner-join"],
  },
  {
    id: "sql-route-left-join",
    task: "The unassigned route disappeared because JOIN needs a match. LEFT JOIN keeps every route from the left table, even without a matching driver. Change JOIN to LEFT JOIN.",
    solution: "SELECT route.name, driver.name AS driver, route.fare FROM route LEFT JOIN driver ON driver.id = route.driver_id;",
    tests: [rows("All routes remain, including the one without a driver", [...joinedRoutes, ["Pasig to Marikina", null, 25]], true)],
    hints: ["Dispatch must see routes that still need a driver.", "Replace JOIN driver with LEFT JOIN driver."], minutes: 4, conceptIds: ["sql-left-join"],
  },
  {
    id: "sql-route-missing-driver",
    task: "NULL means a value is missing. It is different from zero or empty text. Use IS NULL to find missing values. Add WHERE driver.id IS NULL to list only routes that need a driver.",
    solution: "SELECT route.name, driver.name AS driver, route.fare FROM route LEFT JOIN driver ON driver.id = route.driver_id WHERE driver.id IS NULL;",
    tests: [rows("Only Pasig to Marikina needs a driver", [["Pasig to Marikina", null, 25]])],
    hints: ["Inspect which driver field is missing on the unassigned route.", "Add WHERE driver.id IS NULL before the semicolon."], minutes: 4, conceptIds: ["sql-null"],
  },
  {
    id: "sql-route-fallback-name",
    task: "Make the missing driver easy to understand. COALESCE returns the first value that is not NULL. Replace driver.name with COALESCE(driver.name, 'Unassigned'), keeping AS driver. Single quotes mark SQL text.",
    solution: "SELECT route.name, COALESCE(driver.name, 'Unassigned') AS driver, route.fare FROM route LEFT JOIN driver ON driver.id = route.driver_id WHERE driver.id IS NULL;",
    tests: [rows("The driver cell says Unassigned", [["Pasig to Marikina", "Unassigned", 25]])],
    hints: ["The stored value should stay missing. Give the report a readable fallback.", "Use COALESCE(driver.name, 'Unassigned') AS driver in the selected columns."], minutes: 5, conceptIds: ["sql-coalesce"],
  },
  {
    id: "sql-route-full-dispatch",
    task: "Publish one dispatch report with every route. Remove the missing-driver filter. Keep LEFT JOIN and the fallback so assigned names remain visible and the unassigned route is labelled clearly.",
    solution: "SELECT route.name, COALESCE(driver.name, 'Unassigned') AS driver, route.fare FROM route LEFT JOIN driver ON driver.id = route.driver_id;",
    tests: [rows("Every route has a driver name or Unassigned", allRoutes, true)],
    hints: ["Find the part that currently hides routes with assigned drivers.", "Remove WHERE driver.id IS NULL and keep the rest of the query."], minutes: 4, conceptIds: ["sql-filter"],
  },
  {
    id: "sql-route-highest-fares",
    task: "The dispatcher needs a short fare review. Show the two routes with the highest fares. Keep the readable driver names, sort route.fare in descending order, then limit the report to two rows.",
    solution: "SELECT route.name, COALESCE(driver.name, 'Unassigned') AS driver, route.fare FROM route LEFT JOIN driver ON driver.id = route.driver_id ORDER BY route.fare DESC LIMIT 2;",
    tests: [rows("The 25-peso and 20-peso routes appear in that order", [["Pasig to Marikina", "Unassigned", 25], ["Cubao to Quiapo", "Jun", 20]])],
    hints: ["Choose the order before cutting the report to its requested length.", "Add ORDER BY route.fare DESC LIMIT 2 before the semicolon."], minutes: 4, conceptIds: ["sql-descending"],
  },
]);

const volunteerTable = "CREATE TABLE volunteer (id INTEGER, name TEXT);";
const volunteerInsert = "INSERT INTO volunteer (id, name) VALUES (1, 'Ana'), (2, 'Bela'), (3, 'Carlo');";
const volunteerUpdate = "UPDATE volunteer SET name = 'Carla' WHERE id = 3;";
const volunteerDelete = "DELETE FROM volunteer WHERE id = 2;";
const register = (...statements: string[]) => [volunteerTable, ...statements].join("\n");
appendProject("barangay-volunteers", "", [
  {
    id: "sql-volunteer-create-table",
    task: "A barangay is a local community district. Build a small volunteer register in this empty practice database. CREATE TABLE defines a table and its columns. Create volunteer with id INTEGER for whole numbers and name TEXT for words.",
    solution: volunteerTable,
    tests: [{ id: "table", label: "The volunteer table exists", kind: "sql-table-exists", table: "volunteer" }],
    hints: ["Name the new table, then put its column names and types in parentheses.", "Write CREATE TABLE volunteer (id INTEGER, name TEXT);"], minutes: 5, conceptIds: ["sql-create-table"],
  },
  {
    id: "sql-volunteer-insert",
    task: "INSERT INTO adds a saved row. Add Ana with id 1 using INSERT INTO volunteer (id, name) VALUES (1, 'Ana');. Then add SELECT id, name FROM volunteer; to inspect the saved record. Each Run rebuilds this practice database from your file.",
    solution: register("INSERT INTO volunteer (id, name) VALUES (1, 'Ana');", "SELECT id, name FROM volunteer;"),
    tests: [rows("Ana is stored with id 1", [[1, "Ana"]])],
    hints: ["The order of the values must match the order of the named columns.", "After CREATE TABLE, add the INSERT statement, then SELECT id, name FROM volunteer;"], minutes: 5, conceptIds: ["sql-insert"],
  },
  {
    id: "sql-volunteer-several-rows",
    task: "Bela and Carlo also volunteer. One INSERT can add several rows, separated by commas. Extend its VALUES list with (2, 'Bela') and (3, 'Carlo'). Keep Ana and the final SELECT.",
    solution: register(volunteerInsert, "SELECT id, name FROM volunteer;"),
    tests: [rows("Ana, Bela, and Carlo each have a saved row", [[1, "Ana"], [2, "Bela"], [3, "Carlo"]], true)],
    hints: ["Add complete value pairs to the existing INSERT without replacing Ana's pair.", "Use VALUES (1, 'Ana'), (2, 'Bela'), (3, 'Carlo') in the INSERT."], minutes: 4, conceptIds: ["sql-insert"],
  },
  {
    id: "sql-volunteer-newest-first",
    task: "For this practice register, higher ids were added later. Show the latest volunteer first. Sort the final SELECT by id DESC. Leave the table and saved rows unchanged.",
    solution: register(volunteerInsert, "SELECT id, name FROM volunteer ORDER BY id DESC;"),
    tests: [rows("The register shows ids 3, 2, then 1", [[3, "Carlo"], [2, "Bela"], [1, "Ana"]])],
    hints: ["Change the report's order, not the order in which records are inserted.", "Add ORDER BY id DESC to the final SELECT."], minutes: 3, conceptIds: ["sql-descending"],
  },
  {
    id: "sql-volunteer-update-name",
    task: "The third volunteer's name should be Carla. UPDATE changes saved rows, and SET names the field and new value. Add UPDATE volunteer SET name = 'Carla' WHERE id = 3; before the SELECT. The WHERE condition protects the other names.",
    solution: register(volunteerInsert, volunteerUpdate, "SELECT id, name FROM volunteer ORDER BY id DESC;"),
    tests: [rows("Only id 3 changes to Carla", [[3, "Carla"], [2, "Bela"], [1, "Ana"]])],
    hints: ["Identify the record by its id before changing its name.", "Put UPDATE volunteer SET name = 'Carla' WHERE id = 3; before SELECT."], minutes: 5, conceptIds: ["sql-update"],
  },
  {
    id: "sql-volunteer-delete-row",
    task: "Bela asks to leave this practice register. DELETE FROM removes saved rows. Add DELETE FROM volunteer WHERE id = 2; before the SELECT. Keep its WHERE condition so the other volunteers remain.",
    solution: register(volunteerInsert, volunteerUpdate, volunteerDelete, "SELECT id, name FROM volunteer ORDER BY id DESC;"),
    tests: [rows("Carla and Ana remain after id 2 is removed", [[3, "Carla"], [1, "Ana"]])],
    hints: ["Remove the one matching record without changing the report's SELECT.", "Put DELETE FROM volunteer WHERE id = 2; before SELECT."], minutes: 5, conceptIds: ["sql-delete"],
  },
  {
    id: "sql-volunteer-name-pattern",
    task: "Find the remaining names beginning with C. LIKE compares text with a pattern. In 'C%', the percent sign accepts any following characters. Add WHERE name LIKE 'C%' to the final SELECT, before ORDER BY.",
    solution: register(volunteerInsert, volunteerUpdate, volunteerDelete, "SELECT id, name FROM volunteer WHERE name LIKE 'C%' ORDER BY id DESC;"),
    tests: [rows("Only Carla matches the C prefix", [[3, "Carla"]])],
    hints: ["Apply the pattern to the reported names, leaving the saved rows alone.", "Put WHERE name LIKE 'C%' before ORDER BY id DESC."], minutes: 4, conceptIds: ["sql-like"],
  },
  {
    id: "sql-volunteer-either-condition",
    task: "Include Ana as the organiser alongside names beginning with C. OR keeps a row when either condition is true. Extend the final WHERE condition with OR id = 1. Keep the newest-first order.",
    solution: register(volunteerInsert, volunteerUpdate, volunteerDelete, "SELECT id, name FROM volunteer WHERE name LIKE 'C%' OR id = 1 ORDER BY id DESC;"),
    tests: [rows("The report includes Carla and organiser Ana", [[3, "Carla"], [1, "Ana"]])],
    hints: ["Ana can qualify by id even though her name does not match the pattern.", "Use WHERE name LIKE 'C%' OR id = 1 before ORDER BY."], minutes: 4, conceptIds: ["sql-or"],
  },
]);

const steps: Step[] = drafts.map((draft, i) => ({
  id: draft.id,
  index: i + 1,
  task: draft.task,
  kind: "sql",
  inputMode: "free",
  files: { "query.sql": draft.start },
  activeFile: "query.sql",
  sqlSeed: draft.seed ?? SEED,
  conceptIds: draft.conceptIds,
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
  title: "Learn SQL through Stores and Community Records",
  project: "Store Price List",
  projects: [
    { id: "price-list", title: "Store Price List" },
    { id: "stock-check", title: "Stock Check" },
    { id: "palengke-sales", title: "Palengke Sales Report" },
    { id: "jeepney-dispatch", title: "Jeepney Dispatch Report" },
    { id: "barangay-volunteers", title: "Barangay Volunteer Register" },
  ],
  order: 11,
  summary:
    "Read, group, and connect real database records. Build store reports, a jeepney dispatch list, and a small volunteer register you can update.",
  requires: ["testing-devtools"],
  kind: "sql",
  steps,
};

// Validated local authoring batch: sari-sari-inventory-report.
sqlCourse.projects.push({"id":"sari-sari-inventory-report","title":"Sari-Sari Store Inventory Report"});
sqlCourse.steps.push(...([
  {
    "id": "sql-sari-sari-inventory-report-31",
    "index": 31,
    "task": "Select only the product name from the inventory table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE inventory (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO inventory (id, name, category, amount, status, group_id) VALUES\n(1, 'Rice', 'Local', 8, 'Open', 1),\n(2, 'Soap', 'Regional', 20, 'Done', 2),\n(3, 'Cooking Oil', 'Local', 2, 'Open', 1),\n(4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info (id, label) VALUES\n(1, 'North Team'),\n(2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Report shows product names",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice"
          ],
          [
            "Soap"
          ],
          [
            "Cooking Oil"
          ],
          [
            "Egg"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose only the name field from the inventory table."
      },
      {
        "level": 2,
        "text": "Use SELECT name FROM inventory;"
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name FROM inventory;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-inventory-report"
  },
  {
    "id": "sql-sari-sari-inventory-report-32",
    "index": 32,
    "task": "Add the amount field to the report.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name FROM inventory;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE inventory (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO inventory (id, name, category, amount, status, group_id) VALUES\n(1, 'Rice', 'Local', 8, 'Open', 1),\n(2, 'Soap', 'Regional', 20, 'Done', 2),\n(3, 'Cooking Oil', 'Local', 2, 'Open', 1),\n(4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info (id, label) VALUES\n(1, 'North Team'),\n(2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Report shows product names and amounts",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice",
            8
          ],
          [
            "Soap",
            20
          ],
          [
            "Cooking Oil",
            2
          ],
          [
            "Egg",
            5
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the amount field to the SELECT clause."
      },
      {
        "level": 2,
        "text": "Use SELECT name, amount FROM inventory;"
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM inventory;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-inventory-report"
  },
  {
    "id": "sql-sari-sari-inventory-report-33",
    "index": 33,
    "task": "Filter the report to show only products with amount <= 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM inventory;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE inventory (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO inventory (id, name, category, amount, status, group_id) VALUES\n(1, 'Rice', 'Local', 8, 'Open', 1),\n(2, 'Soap', 'Regional', 20, 'Done', 2),\n(3, 'Cooking Oil', 'Local', 2, 'Open', 1),\n(4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info (id, label) VALUES\n(1, 'North Team'),\n(2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Report shows filtered products with amount <= 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice",
            8
          ],
          [
            "Cooking Oil",
            2
          ],
          [
            "Egg",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter products with amount <= 10."
      },
      {
        "level": 2,
        "text": "Use SELECT name, amount FROM inventory WHERE amount <= 10;"
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM inventory WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-inventory-report"
  },
  {
    "id": "sql-sari-sari-inventory-report-34",
    "index": 34,
    "task": "Sort the filtered report by amount in ascending order.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM inventory WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE inventory (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO inventory (id, name, category, amount, status, group_id) VALUES\n(1, 'Rice', 'Local', 8, 'Open', 1),\n(2, 'Soap', 'Regional', 20, 'Done', 2),\n(3, 'Cooking Oil', 'Local', 2, 'Open', 1),\n(4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info (id, label) VALUES\n(1, 'North Team'),\n(2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Report shows filtered products sorted by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cooking Oil",
            2
          ],
          [
            "Egg",
            5
          ],
          [
            "Rice",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY amount ASC to sort the filtered results by amount ascending."
      },
      {
        "level": 2,
        "text": "Use SELECT name, amount FROM inventory WHERE amount <= 10 ORDER BY amount ASC;"
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM inventory WHERE amount <= 10 ORDER BY amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-inventory-report"
  },
  {
    "id": "sql-sari-sari-inventory-report-35",
    "index": 35,
    "task": "Limit the sorted report to 2 rows for a short priority list.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM inventory WHERE amount <= 10 ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE inventory (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO inventory (id, name, category, amount, status, group_id) VALUES\n(1, 'Rice', 'Local', 8, 'Open', 1),\n(2, 'Soap', 'Regional', 20, 'Done', 2),\n(3, 'Cooking Oil', 'Local', 2, 'Open', 1),\n(4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info (id, label) VALUES\n(1, 'North Team'),\n(2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Report shows top 2 products by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cooking Oil",
            2
          ],
          [
            "Egg",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT 2 to restrict the output to the top 2 rows."
      },
      {
        "level": 2,
        "text": "Use SELECT name, amount FROM inventory WHERE amount <= 10 ORDER BY amount ASC LIMIT 2;"
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM inventory WHERE amount <= 10 ORDER BY amount ASC LIMIT 2;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-inventory-report"
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: sari-sari-inventory-report.
sqlCourse.steps.push(...([
  {
    "id": "sql-sari-sari-inventory-report-36",
    "index": 36,
    "task": "Replace the entire prior SELECT with COUNT(*) for amount <= 10 and check the scalar value 3, not the output row count.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM inventory WHERE amount <= 10 ORDER BY amount ASC LIMIT 2;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE inventory (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO inventory (id, name, category, amount, status, group_id) VALUES\n(1, 'Rice', 'Local', 8, 'Open', 1),\n(2, 'Soap', 'Regional', 20, 'Done', 2),\n(3, 'Cooking Oil', 'Local', 2, 'Open', 1),\n(4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info (id, label) VALUES\n(1, 'North Team'),\n(2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Count returns scalar value 3 for products with amount <= 10",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 3
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows matching the condition."
      },
      {
        "level": 2,
        "text": "Remove SELECT name, amount and replace with SELECT COUNT(*)."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM inventory WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-inventory-report",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-sari-sari-inventory-report-37",
    "index": 37,
    "task": "Alias that count as priority_count and check that exact result column heading.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM inventory WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE inventory (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO inventory (id, name, category, amount, status, group_id) VALUES\n(1, 'Rice', 'Local', 8, 'Open', 1),\n(2, 'Soap', 'Regional', 20, 'Done', 2),\n(3, 'Cooking Oil', 'Local', 2, 'Open', 1),\n(4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info (id, label) VALUES\n(1, 'North Team'),\n(2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Column heading is priority_count",
        "kind": "sql-columns-equal",
        "columns": [
          "priority_count"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add AS priority_count after COUNT(*) to rename the column."
      },
      {
        "level": 2,
        "text": "The result should show only one column named priority_count."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) AS priority_count FROM inventory WHERE amount <= 10;"
    },
    "estimatedMinutes": 3,
    "projectId": "sari-sari-inventory-report",
    "conceptIds": [
      "sql-alias"
    ]
  },
  {
    "id": "sql-sari-sari-inventory-report-38",
    "index": 38,
    "task": "Replace the entire count query with category and SUM(amount) grouped across all four rows, giving Local 10 and Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) AS priority_count FROM inventory WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE inventory (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO inventory (id, name, category, amount, status, group_id) VALUES\n(1, 'Rice', 'Local', 8, 'Open', 1),\n(2, 'Soap', 'Regional', 20, 'Done', 2),\n(3, 'Cooking Oil', 'Local', 2, 'Open', 1),\n(4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info (id, label) VALUES\n(1, 'North Team'),\n(2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Grouped totals: Local 10, Regional 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use GROUP BY category to group rows by category."
      },
      {
        "level": 2,
        "text": "Use SUM(amount) to calculate total amount per category."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) FROM inventory GROUP BY category;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-inventory-report",
    "conceptIds": [
      "sql-group-by"
    ]
  },
  {
    "id": "sql-sari-sari-inventory-report-39",
    "index": 39,
    "task": "Keep only the Regional 25 total by using HAVING above 12.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) FROM inventory GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE inventory (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO inventory (id, name, category, amount, status, group_id) VALUES\n(1, 'Rice', 'Local', 8, 'Open', 1),\n(2, 'Soap', 'Regional', 20, 'Done', 2),\n(3, 'Cooking Oil', 'Local', 2, 'Open', 1),\n(4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info (id, label) VALUES\n(1, 'North Team'),\n(2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Only Regional 25 remains after HAVING SUM(amount) > 12",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(amount) > 12 to filter groups by total amount."
      },
      {
        "level": 2,
        "text": "Only Regional (25) meets the condition."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) FROM inventory GROUP BY category HAVING SUM(amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-inventory-report",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-sari-sari-inventory-report-40",
    "index": 40,
    "task": "Lower HAVING to above 8 to restore both totals and sort them largest first so Regional 25 comes before Local 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) FROM inventory GROUP BY category HAVING SUM(amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE inventory (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO inventory (id, name, category, amount, status, group_id) VALUES\n(1, 'Rice', 'Local', 8, 'Open', 1),\n(2, 'Soap', 'Regional', 20, 'Done', 2),\n(3, 'Cooking Oil', 'Local', 2, 'Open', 1),\n(4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info (id, label) VALUES\n(1, 'North Team'),\n(2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Both totals restored, sorted largest first: Regional 25, Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Change HAVING SUM(amount) > 12 to HAVING SUM(amount) > 8."
      },
      {
        "level": 2,
        "text": "Add ORDER BY SUM(amount) DESC to sort by total amount descending."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) FROM inventory GROUP BY category HAVING SUM(amount) > 8 ORDER BY SUM(amount) DESC;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-inventory-report",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: sari-sari-daily-record.
sqlCourse.projects.push({"id":"sari-sari-daily-record","title":"Sari-Sari Store Daily Record"});
sqlCourse.steps.push(...([
  {
    "id": "sql-sari-sari-daily-record-41",
    "index": 41,
    "task": "Select the name and status of all items in the sari-sari store.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE sari_sari_items (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO sari_sari_items (id, name, category, amount, status, group_id) VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "sql-sari-sari-daily-record-41-result",
        "label": "The result contains the name and status of all items",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice",
            "Open"
          ],
          [
            "Soap",
            "Done"
          ],
          [
            "Cooking Oil",
            "Open"
          ],
          [
            "Egg",
            "Done"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the fields the report needs: name and status."
      },
      {
        "level": 2,
        "text": "Use SELECT to retrieve these fields from the table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM sari_sari_items;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-daily-record"
  },
  {
    "id": "sql-sari-sari-daily-record-42",
    "index": 42,
    "task": "Filter to keep only items with status 'Open'.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM sari_sari_items;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE sari_sari_items (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO sari_sari_items (id, name, category, amount, status, group_id) VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "sql-sari-sari-daily-record-42-result",
        "label": "The result contains only items with status 'Open'",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice",
            "Open"
          ],
          [
            "Cooking Oil",
            "Open"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use WHERE to filter rows based on status."
      },
      {
        "level": 2,
        "text": "Only include rows where status equals 'Open'."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM sari_sari_items WHERE status = 'Open';"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-daily-record"
  },
  {
    "id": "sql-sari-sari-daily-record-43",
    "index": 43,
    "task": "Filter to keep only items with amount less than or equal to 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM sari_sari_items WHERE status = 'Open';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE sari_sari_items (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO sari_sari_items (id, name, category, amount, status, group_id) VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "sql-sari-sari-daily-record-43-result",
        "label": "The result contains only items with amount <= 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice",
            "Open"
          ],
          [
            "Cooking Oil",
            "Open"
          ],
          [
            "Egg",
            "Done"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use WHERE to filter rows based on amount."
      },
      {
        "level": 2,
        "text": "Only include rows where amount is less than or equal to 8."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM sari_sari_items WHERE amount <= 8;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-daily-record"
  },
  {
    "id": "sql-sari-sari-daily-record-44",
    "index": 44,
    "task": "Filter to keep only items that are 'Open' AND have amount <= 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM sari_sari_items WHERE amount <= 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE sari_sari_items (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO sari_sari_items (id, name, category, amount, status, group_id) VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "sql-sari-sari-daily-record-44-result",
        "label": "The result contains only items that are 'Open' AND amount <= 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice",
            "Open"
          ],
          [
            "Cooking Oil",
            "Open"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AND to combine two conditions."
      },
      {
        "level": 2,
        "text": "Only include rows where status is 'Open' AND amount is <= 8."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM sari_sari_items WHERE status = 'Open' AND amount <= 8;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-daily-record"
  },
  {
    "id": "sql-sari-sari-daily-record-45",
    "index": 45,
    "task": "Filter to keep items that are 'Done' OR have amount less than 3.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM sari_sari_items WHERE status = 'Open' AND amount <= 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE sari_sari_items (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO sari_sari_items (id, name, category, amount, status, group_id) VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "sql-sari-sari-daily-record-45-result",
        "label": "The result contains items that are 'Done' OR amount < 3",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Soap",
            "Done"
          ],
          [
            "Cooking Oil",
            "Open"
          ],
          [
            "Egg",
            "Done"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use OR to combine two conditions."
      },
      {
        "level": 2,
        "text": "Only include rows where status is 'Done' OR amount is less than 3."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM sari_sari_items WHERE status = 'Done' OR amount < 3;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-daily-record"
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: sari-sari-daily-record.
sqlCourse.steps.push(...([
  {
    "id": "sql-sari-sari-daily-record-46",
    "index": 46,
    "task": "Select names beginning with 'R' using LIKE to match the first seeded item.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM sari_sari_items WHERE status = 'Done' OR amount < 3;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE sari_sari_items (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO sari_sari_items (id, name, category, amount, status, group_id) VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "sql-sari-sari-daily-record-46-result",
        "label": "The result contains only 'Rice'",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use LIKE with 'R%' to match names starting with 'R'."
      },
      {
        "level": 2,
        "text": "Only 'Rice' should match; check the exact string value."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name FROM sari_sari_items WHERE name LIKE 'R%';"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-daily-record",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-sari-sari-daily-record-47",
    "index": 47,
    "task": "Show name, category, and amount for all Local items.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name FROM sari_sari_items WHERE name LIKE 'R%';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE sari_sari_items (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO sari_sari_items (id, name, category, amount, status, group_id) VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "sql-sari-sari-daily-record-47-result",
        "label": "The result contains Rice 8 and Cooking Oil 2",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice",
            "Local",
            8
          ],
          [
            "Cooking Oil",
            "Local",
            2
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Filter for category = 'Local' to show only Local items."
      },
      {
        "level": 2,
        "text": "Include name, category, and amount in the SELECT."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM sari_sari_items WHERE category = 'Local';"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-daily-record",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-sari-sari-daily-record-48",
    "index": 48,
    "task": "Include Local items OR items with amount = 20.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM sari_sari_items WHERE category = 'Local';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE sari_sari_items (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO sari_sari_items (id, name, category, amount, status, group_id) VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "sql-sari-sari-daily-record-48-result",
        "label": "The result contains Rice 8, Soap 20, and Cooking Oil 2",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice",
            "Local",
            8
          ],
          [
            "Soap",
            "Regional",
            20
          ],
          [
            "Cooking Oil",
            "Local",
            2
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use OR to combine the two conditions: category = 'Local' OR amount = 20."
      },
      {
        "level": 2,
        "text": "Include all three rows: Rice, Soap, and Cooking Oil."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM sari_sari_items WHERE category = 'Local' OR amount = 20;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-daily-record",
    "conceptIds": [
      "sql-or"
    ]
  },
  {
    "id": "sql-sari-sari-daily-record-49",
    "index": 49,
    "task": "Sort the three-row report by amount descending so Soap 20 comes first.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM sari_sari_items WHERE category = 'Local' OR amount = 20;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE sari_sari_items (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO sari_sari_items (id, name, category, amount, status, group_id) VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "sql-sari-sari-daily-record-49-result",
        "label": "The result is sorted with Soap 20 first, then Rice 8, then Cooking Oil 2",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Soap",
            "Regional",
            20
          ],
          [
            "Rice",
            "Local",
            8
          ],
          [
            "Cooking Oil",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY amount DESC to sort by amount in descending order."
      },
      {
        "level": 2,
        "text": "Soap 20 must be first, then Rice 8, then Cooking Oil 2."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM sari_sari_items WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-daily-record",
    "conceptIds": [
      "sql-order-by"
    ]
  },
  {
    "id": "sql-sari-sari-daily-record-50",
    "index": 50,
    "task": "Limit the sorted report to the first 2 rows so only Soap 20 and Rice 8 appear.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM sari_sari_items WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE sari_sari_items (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO sari_sari_items (id, name, category, amount, status, group_id) VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "sql-sari-sari-daily-record-50-result",
        "label": "The result contains only Soap 20 and Rice 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Soap",
            "Regional",
            20
          ],
          [
            "Rice",
            "Local",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT 2 to restrict output to the first two rows."
      },
      {
        "level": 2,
        "text": "Only Soap 20 and Rice 8 should appear; Cooking Oil 2 is excluded."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM sari_sari_items WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC LIMIT 2;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-daily-record",
    "conceptIds": [
      "sql-limit"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: sari-sari-service-queue.
sqlCourse.projects.push({"id":"sari-sari-service-queue","title":"Sari-Sari Store Service Queue"});
sqlCourse.steps.push(...([
  {
    "id": "sql-sari-sari-service-queue-1",
    "index": 51,
    "task": "Count all records in the sari-sari service queue.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "count-all-rows",
        "label": "Count all rows in the record table",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows in the table."
      },
      {
        "level": 2,
        "text": "The result should be 4 because there are four seeded items."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-service-queue",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-sari-sari-service-queue-2",
    "index": 52,
    "task": "Name the count as record_count for clarity.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "named-count",
        "label": "The count is named record_count",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      },
      {
        "id": "alias-heading",
        "label": "The result column is named record_count",
        "kind": "sql-columns-equal",
        "columns": [
          "record_count"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add AS record_count to rename the count result."
      },
      {
        "level": 2,
        "text": "This makes the output more readable for business reports."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) AS record_count FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-service-queue",
    "conceptIds": [
      "sql-alias"
    ]
  },
  {
    "id": "sql-sari-sari-service-queue-3",
    "index": 53,
    "task": "Calculate the total amount of all items in the queue.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) AS record_count FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "total-amount",
        "label": "Total amount is 35",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 35
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(amount) to add up all the amounts."
      },
      {
        "level": 2,
        "text": "The expected total is 8 + 20 + 2 + 5 = 35."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT SUM(amount) AS total_amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-service-queue",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-sari-sari-service-queue-4",
    "index": 54,
    "task": "Calculate the average amount of all items in the queue.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT SUM(amount) AS total_amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "average-amount",
        "label": "Average amount is 8.75",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 8.75
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AVG(amount) to compute the average."
      },
      {
        "level": 2,
        "text": "The average is 35 divided by 4, which equals 8.75."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT AVG(amount) AS average_amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-service-queue",
    "conceptIds": [
      "sql-average"
    ]
  },
  {
    "id": "sql-sari-sari-service-queue-5",
    "index": 55,
    "task": "Group items by category and count how many are in each category.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT AVG(amount) AS average_amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "grouped-counts",
        "label": "Local has 2 items, Regional has 2 items",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            2
          ],
          [
            "Regional",
            2
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use GROUP BY category to group by category."
      },
      {
        "level": 2,
        "text": "COUNT(*) will count items in each group; no ORDER BY is needed since counts are tied."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, COUNT(*) AS record_count FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-service-queue",
    "conceptIds": [
      "sql-group-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: sari-sari-service-queue.
sqlCourse.steps.push(...([
  {
    "id": "sql-sari-sari-service-queue-6",
    "index": 56,
    "task": "Change the grouped calculation to SUM(amount) as total_amount, giving Local 10 and Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, COUNT(*) AS record_count FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "grouped-sums",
        "label": "Local has total 10, Regional has total 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(amount) to add up the amounts for each category."
      },
      {
        "level": 2,
        "text": "Replace COUNT(*) with SUM(amount) and rename the alias to total_amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-service-queue",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-sari-sari-service-queue-7",
    "index": 57,
    "task": "Sort both group totals descending so Regional 25 comes first.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "sorted-grouped-sums",
        "label": "Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort totals from highest to lowest."
      },
      {
        "level": 2,
        "text": "The result should show Regional first because 25 > 10."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-service-queue",
    "conceptIds": [
      "sql-descending"
    ]
  },
  {
    "id": "sql-sari-sari-service-queue-8",
    "index": 58,
    "task": "Keep only totals above 12 with HAVING, leaving only Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "filtered-grouped-sums",
        "label": "Regional 25 only",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(amount) > 12 to filter groups with totals over 12."
      },
      {
        "level": 2,
        "text": "Only Regional remains because 25 > 12, but 10 is not."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-service-queue",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-sari-sari-service-queue-9",
    "index": 59,
    "task": "Remove HAVING to restore both complete category totals: Local 10 and Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "restored-grouped-sums",
        "label": "Local 10 and Regional 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove the HAVING clause to show all group totals again."
      },
      {
        "level": 2,
        "text": "The result should return both categories with their full sums."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-service-queue",
    "conceptIds": []
  },
  {
    "id": "sql-sari-sari-service-queue-10",
    "index": 60,
    "task": "Order those two restored totals from largest to smallest: Regional 25 then Local 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "final-sorted-grouped-sums",
        "label": "Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort the restored totals descending."
      },
      {
        "level": 2,
        "text": "Regional must appear first because 25 > 10."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-service-queue",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: sari-sari-supplier-list.
sqlCourse.projects.push({"id":"sari-sari-supplier-list","title":"Sari-Sari Store Supplier List"});
sqlCourse.steps.push(...([
  {
    "id": "sql-sari-sari-supplier-list-1",
    "index": 61,
    "task": "Read supplier names and group IDs from the record table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains supplier names and group IDs",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice",
            1
          ],
          [
            "Soap",
            2
          ],
          [
            "Cooking Oil",
            1
          ],
          [
            "Egg",
            2
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Select the supplier name and group_id from the record table."
      },
      {
        "level": 2,
        "text": "Use qualified column names to avoid ambiguity."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-supplier-list",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-sari-sari-supplier-list-2",
    "index": 62,
    "task": "Join supplier names with group labels using an inner join.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains supplier names and group labels",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice",
            "North Team"
          ],
          [
            "Soap",
            "South Team"
          ],
          [
            "Cooking Oil",
            "North Team"
          ],
          [
            "Egg",
            "South Team"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Join the record table with group_info using matching group IDs."
      },
      {
        "level": 2,
        "text": "Use the ON clause to specify the join condition."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-supplier-list",
    "conceptIds": [
      "sql-inner-join"
    ]
  },
  {
    "id": "sql-sari-sari-supplier-list-3",
    "index": 63,
    "task": "Add the amount column to the supplier list.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains supplier names, group labels, and amounts",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice",
            "North Team",
            8
          ],
          [
            "Soap",
            "South Team",
            20
          ],
          [
            "Cooking Oil",
            "North Team",
            2
          ],
          [
            "Egg",
            "South Team",
            5
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the amount column from the record table to the SELECT clause."
      },
      {
        "level": 2,
        "text": "Ensure the join condition remains unchanged."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-supplier-list",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-sari-sari-supplier-list-4",
    "index": 64,
    "task": "Filter suppliers with amounts less than or equal to 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains only suppliers with amount <= 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice",
            "North Team",
            8
          ],
          [
            "Cooking Oil",
            "North Team",
            2
          ],
          [
            "Egg",
            "South Team",
            5
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter suppliers by amount."
      },
      {
        "level": 2,
        "text": "Use <= to include suppliers with exactly 10."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-supplier-list",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-sari-sari-supplier-list-5",
    "index": 65,
    "task": "Sort the filtered suppliers by amount in ascending order.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result is sorted by amount in ascending order",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cooking Oil",
            "North Team",
            2
          ],
          [
            "Egg",
            "South Team",
            5
          ],
          [
            "Rice",
            "North Team",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add an ORDER BY clause to sort by amount."
      },
      {
        "level": 2,
        "text": "Use ASC for ascending order."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10 ORDER BY record.amount ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-supplier-list",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: sari-sari-supplier-list.
sqlCourse.steps.push(...([
  {
    "id": "sql-sari-sari-supplier-list-6",
    "index": 66,
    "task": "Count how many records belong to each group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10 ORDER BY record.amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result shows count for each group label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            2
          ],
          [
            "South Team",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count records per group."
      },
      {
        "level": 2,
        "text": "Group by group_info.label to aggregate by group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, COUNT(*) AS record_count FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-supplier-list",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-sari-sari-supplier-list-7",
    "index": 67,
    "task": "Sum the amount for each group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, COUNT(*) AS record_count FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result shows total amount for each group label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(record.amount) to add up amounts per group."
      },
      {
        "level": 2,
        "text": "Group by group_info.label to aggregate by group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-supplier-list",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-sari-sari-supplier-list-8",
    "index": 68,
    "task": "Keep only group totals above 12 using HAVING.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result shows only group totals above 12",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING to filter groups by total amount."
      },
      {
        "level": 2,
        "text": "Use SUM(record.amount) > 12 to keep only totals above 12."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label HAVING SUM(record.amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-supplier-list",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-sari-sari-supplier-list-9",
    "index": 69,
    "task": "Remove HAVING to restore both groups and sort their sums descending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label HAVING SUM(record.amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result shows both groups sorted by total amount descending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ],
          [
            "North Team",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove HAVING to restore all groups."
      },
      {
        "level": 2,
        "text": "Add ORDER BY total_amount DESC to sort descending."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-supplier-list",
    "conceptIds": [
      "sql-descending"
    ]
  },
  {
    "id": "sql-sari-sari-supplier-list-10",
    "index": 70,
    "task": "Limit the restored grouped report to the largest group.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result shows only the largest group total",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT 1 to keep only the top group."
      },
      {
        "level": 2,
        "text": "Use ORDER BY total_amount DESC to ensure the largest group is first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC LIMIT 1;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-supplier-list",
    "conceptIds": [
      "sql-limit"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: sari-sari-community-schedule.
sqlCourse.projects.push({"id":"sari-sari-community-schedule","title":"Sari-Sari Store Community Schedule"});
sqlCourse.steps.push(...([
  {
    "id": "sql-sari-sari-community-schedule-1",
    "index": 71,
    "task": "Select the record name and group_id for all items in the sari-sari store.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows with name and group_id",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice",
            1
          ],
          [
            "Soap",
            2
          ],
          [
            "Cooking Oil",
            1
          ],
          [
            "Egg",
            null
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the name and group_id columns from the record table."
      },
      {
        "level": 2,
        "text": "This is the base query before any joins or filters."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-community-schedule"
  },
  {
    "id": "sql-sari-sari-community-schedule-2",
    "index": 72,
    "task": "LEFT JOIN group_info to show every record with its group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows with name and group label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice",
            "North Team"
          ],
          [
            "Soap",
            "South Team"
          ],
          [
            "Cooking Oil",
            "North Team"
          ],
          [
            "Egg",
            null
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Join group_info using LEFT JOIN so all records appear even if group_id is NULL."
      },
      {
        "level": 2,
        "text": "Use ON group_info.id = record.group_id to match the group_id."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-community-schedule"
  },
  {
    "id": "sql-sari-sari-community-schedule-3",
    "index": 73,
    "task": "Use COALESCE to display 'Unassigned' for records with no group.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows with name and group_label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice",
            "North Team"
          ],
          [
            "Soap",
            "South Team"
          ],
          [
            "Cooking Oil",
            "North Team"
          ],
          [
            "Egg",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COALESCE to replace NULL with 'Unassigned' for missing group labels."
      },
      {
        "level": 2,
        "text": "Alias the new column as group_label for clarity."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-community-schedule"
  },
  {
    "id": "sql-sari-sari-community-schedule-4",
    "index": 74,
    "task": "Filter to show only the record whose group_id is NULL.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains one row with name and group_label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Egg",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add WHERE record.group_id IS NULL to filter for the unassigned record."
      },
      {
        "level": 2,
        "text": "This isolates the row with no group assigned."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id WHERE record.group_id IS NULL;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-community-schedule"
  },
  {
    "id": "sql-sari-sari-community-schedule-5",
    "index": 75,
    "task": "Switch back to all rows and sort by the displayed group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id WHERE record.group_id IS NULL;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows sorted by group_label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice",
            "North Team"
          ],
          [
            "Cooking Oil",
            "North Team"
          ],
          [
            "Soap",
            "South Team"
          ],
          [
            "Egg",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove the WHERE clause to show all rows again."
      },
      {
        "level": 2,
        "text": "Add ORDER BY group_label ASC to sort alphabetically by group label."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id ORDER BY group_label ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-community-schedule"
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: sari-sari-community-schedule.
sqlCourse.steps.push(...([
  {
    "id": "sql-sari-sari-community-schedule-6",
    "index": 76,
    "task": "Count every record after the LEFT JOIN.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id ORDER BY group_label ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result is a single row with count 4",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Count all rows from the LEFT JOIN result."
      },
      {
        "level": 2,
        "text": "Use COUNT(*) to count all rows regardless of NULLs."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-community-schedule",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-sari-sari-community-schedule-7",
    "index": 77,
    "task": "Count records per displayed group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains three rows: North Team 2, South Team 1, Unassigned 1",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            2
          ],
          [
            "South Team",
            1
          ],
          [
            "Unassigned",
            1
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Group by the displayed group label using GROUP BY."
      },
      {
        "level": 2,
        "text": "Use COUNT(*) to count records per group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, COUNT(*) AS record_count FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-community-schedule",
    "conceptIds": [
      "sql-group-by"
    ]
  },
  {
    "id": "sql-sari-sari-community-schedule-8",
    "index": 78,
    "task": "Sum amount per displayed group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, COUNT(*) AS record_count FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains three rows: North Team 10, South Team 20, Unassigned 5",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            20
          ],
          [
            "Unassigned",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(record.amount) to calculate total amount per group."
      },
      {
        "level": 2,
        "text": "Group by the displayed group label using GROUP BY."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-community-schedule",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-sari-sari-community-schedule-9",
    "index": 79,
    "task": "Keep displayed groups whose sum exceeds 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains two rows: North Team 10 and South Team 20",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use HAVING to filter groups by their total amount."
      },
      {
        "level": 2,
        "text": "Only groups with total > 8 will appear."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-community-schedule",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-sari-sari-community-schedule-10",
    "index": 80,
    "task": "Order those group sums descending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains two rows: South Team 20 then North Team 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            20
          ],
          [
            "North Team",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use ORDER BY total_amount DESC to sort by sum descending."
      },
      {
        "level": 2,
        "text": "The largest sum comes first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8 ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-community-schedule",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: sari-sari-delivery-log.
sqlCourse.projects.push({"id":"sari-sari-delivery-log","title":"Sari-Sari Store Delivery Log"});
sqlCourse.steps.push(...([
  {
    "id": "sql-sari-sari-delivery-log-1",
    "index": 81,
    "task": "Select the id, name, and amount from the record table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-1",
        "label": "Initial rows contain id 1, 2, 3, 4 with their amounts",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Rice",
            8
          ],
          [
            2,
            "Soap",
            20
          ],
          [
            3,
            "Cooking Oil",
            2
          ],
          [
            4,
            "Egg",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the three fields: id, name, and amount."
      },
      {
        "level": 2,
        "text": "Use SELECT to read from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-delivery-log"
  },
  {
    "id": "sql-sari-sari-delivery-log-2",
    "index": 82,
    "task": "Insert a new record with id 5, name 'New Record', category 'Local', amount 7, status 'Open', group_id 1, then read all rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-2",
        "label": "After insert, rows include id 5 with amount 7",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Rice",
            8
          ],
          [
            2,
            "Soap",
            20
          ],
          [
            3,
            "Cooking Oil",
            2
          ],
          [
            4,
            "Egg",
            5
          ],
          [
            5,
            "New Record",
            7
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the new record using INSERT with id 5 and name 'New Record'."
      },
      {
        "level": 2,
        "text": "Then read all rows with SELECT id, name, amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nSELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-delivery-log"
  },
  {
    "id": "sql-sari-sari-delivery-log-3",
    "index": 83,
    "task": "Update only id 5 amount to 9, then read the updated record.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nSELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-3",
        "label": "Updated record shows id 5 with amount 9",
        "kind": "sql-row-contains",
        "row": [
          5,
          "New Record",
          9
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Change only id 5's amount to 9 using UPDATE."
      },
      {
        "level": 2,
        "text": "Then read only id 5 with SELECT WHERE id = 5."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nSELECT id, name, amount FROM record WHERE id = 5;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-delivery-log"
  },
  {
    "id": "sql-sari-sari-delivery-log-4",
    "index": 84,
    "task": "Update only id 2 status to 'Open', then read id 2's details.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nSELECT id, name, amount FROM record WHERE id = 5;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-4",
        "label": "Updated record shows id 2 with status 'Open'",
        "kind": "sql-row-contains",
        "row": [
          2,
          "Soap",
          "Open"
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Change id 2's status to 'Open' using UPDATE."
      },
      {
        "level": 2,
        "text": "Then read id 2's id, name, and status with SELECT WHERE id = 2."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nSELECT id, name, status FROM record WHERE id = 2;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-delivery-log"
  },
  {
    "id": "sql-sari-sari-delivery-log-5",
    "index": 85,
    "task": "Delete only id 4, then read remaining ids and names.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nSELECT id, name, status FROM record WHERE id = 2;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-5",
        "label": "After delete, rows contain ids 1, 2, 3, 5 with their names",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Rice"
          ],
          [
            2,
            "Soap"
          ],
          [
            3,
            "Cooking Oil"
          ],
          [
            5,
            "New Record"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove id 4 using DELETE WHERE id = 4."
      },
      {
        "level": 2,
        "text": "Then read remaining ids and names with SELECT id, name."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nSELECT id, name FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-delivery-log"
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: sari-sari-delivery-log.
sqlCourse.steps.push(...([
  {
    "id": "sql-sari-sari-delivery-log-6",
    "index": 86,
    "task": "Insert id 6 named Backup Record with amount 4 and read it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nSELECT id, name FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-6",
        "label": "After insert, row with id 6 contains Backup Record and amount 4",
        "kind": "sql-row-contains",
        "row": [
          6,
          "Backup Record",
          4
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add INSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);"
      },
      {
        "level": 2,
        "text": "Then read it with SELECT id, name, amount FROM record WHERE id = 6;"
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nSELECT id, name, amount FROM record WHERE id = 6;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-delivery-log",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-sari-sari-delivery-log-7",
    "index": 87,
    "task": "Update id 6 category to Regional and read it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nSELECT id, name, amount FROM record WHERE id = 6;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-7",
        "label": "After update, row with id 6 has category Regional",
        "kind": "sql-row-contains",
        "row": [
          6,
          "Backup Record",
          "Regional",
          4
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Update category to 'Regional' with UPDATE record SET category = 'Regional' WHERE id = 6;"
      },
      {
        "level": 2,
        "text": "Then read the updated row with SELECT id, name, category, amount FROM record WHERE id = 6;"
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nSELECT id, name, category, amount FROM record WHERE id = 6;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-delivery-log",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-sari-sari-delivery-log-8",
    "index": 88,
    "task": "Delete id 1 and read remaining rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nSELECT id, name, category, amount FROM record WHERE id = 6;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-8",
        "label": "After delete, rows contain ids 2, 3, 5, 6 with their names and amounts",
        "kind": "sql-rows-equal",
        "rows": [
          [
            2,
            "Soap",
            20
          ],
          [
            3,
            "Cooking Oil",
            2
          ],
          [
            5,
            "New Record",
            9
          ],
          [
            6,
            "Backup Record",
            4
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Delete id 1 with DELETE FROM record WHERE id = 1;"
      },
      {
        "level": 2,
        "text": "Then read remaining rows with SELECT id, name, amount FROM record;"
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-delivery-log",
    "conceptIds": [
      "sql-delete"
    ]
  },
  {
    "id": "sql-sari-sari-delivery-log-9",
    "index": 89,
    "task": "Count all remaining rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-9",
        "label": "Count is 4 after deleting id 1",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows after deletion."
      },
      {
        "level": 2,
        "text": "The result should be 4."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT COUNT(*) FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-delivery-log",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-sari-sari-delivery-log-10",
    "index": 90,
    "task": "Show remaining names and amounts sorted by amount ascending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT COUNT(*) FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice', 'Local', 8, 'Open', 1), (2, 'Soap', 'Regional', 20, 'Done', 2), (3, 'Cooking Oil', 'Local', 2, 'Open', 1), (4, 'Egg', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-10",
        "label": "Rows sorted by amount ascending: Cooking Oil 2, Backup Record 4, New Record 9, Soap 20",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cooking Oil",
            2
          ],
          [
            "Backup Record",
            4
          ],
          [
            "New Record",
            9
          ],
          [
            "Soap",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Select name and amount with SELECT name, amount FROM record;"
      },
      {
        "level": 2,
        "text": "Sort them ascending with ORDER BY amount ASC;"
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT name, amount FROM record ORDER BY amount ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "sari-sari-delivery-log",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: palengke-inventory-report.
sqlCourse.projects.push({"id":"palengke-inventory-report","title":"Palengke Stall Inventory Report"});
sqlCourse.steps.push(...([
  {
    "id": "sql-palengke-inventory-report-1",
    "index": 91,
    "task": "Create the report table with id and name columns.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-table-exists",
        "label": "The report table exists with id and name columns",
        "kind": "sql-table-columns",
        "table": "report",
        "columns": [
          "id",
          "name"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Create a new table named 'report' with two columns: id (INTEGER) and name (TEXT)."
      },
      {
        "level": 2,
        "text": "Use the exact CREATE TABLE syntax with the correct column types."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT);"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-inventory-report",
    "conceptIds": [
      "sql-create-table"
    ]
  },
  {
    "id": "sql-palengke-inventory-report-2",
    "index": 92,
    "task": "Add the amount column to the report table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT);"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-table-columns",
        "label": "The report table now has id, name, and amount columns",
        "kind": "sql-table-columns",
        "table": "report",
        "columns": [
          "id",
          "name",
          "amount"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the amount column as an INTEGER type to the report table definition."
      },
      {
        "level": 2,
        "text": "Keep the existing id and name columns in the same order."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);"
    },
    "estimatedMinutes": 3,
    "projectId": "palengke-inventory-report",
    "conceptIds": [
      "sql-create-table"
    ]
  },
  {
    "id": "sql-palengke-inventory-report-3",
    "index": 93,
    "task": "Insert the first item (Tomatoes, id 1) into the report and select it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "tomatoes-row",
        "label": "The report contains Tomatoes with id 1 and amount 8",
        "kind": "sql-row-contains",
        "row": [
          1,
          "Tomatoes",
          8
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert the row from source_record where id = 1 into the report table."
      },
      {
        "level": 2,
        "text": "Then select all columns from the report table to verify the insertion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id = 1;\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 5,
    "projectId": "palengke-inventory-report",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-palengke-inventory-report-4",
    "index": 94,
    "task": "Insert items with ids 2 and 3 into the report and select all.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id = 1;\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "three-items",
        "label": "The report contains three items: id 1, 2, and 3",
        "kind": "sql-row-count",
        "count": 3,
        "resultIndex": 0
      },
      {
        "id": "carrots-row",
        "label": "The report contains Carrots with id 3 and amount 2",
        "kind": "sql-row-contains",
        "row": [
          3,
          "Carrots",
          2
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert rows from source_record where id is 1, 2, or 3 into the report table."
      },
      {
        "level": 2,
        "text": "Select all rows from the report to verify the insertion of all three items."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 5,
    "projectId": "palengke-inventory-report",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-palengke-inventory-report-5",
    "index": 95,
    "task": "Sort the report rows by amount in ascending order.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "sorted-by-amount",
        "label": "The report rows are sorted by amount ascending: Carrots 2, Tomatoes 8, Eggplant 20",
        "kind": "sql-rows-equal",
        "rows": [
          [
            3,
            "Carrots",
            2
          ],
          [
            1,
            "Tomatoes",
            8
          ],
          [
            2,
            "Eggplant",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY amount ASC to the final SELECT to sort rows by amount ascending."
      },
      {
        "level": 2,
        "text": "Verify that Carrots (2) comes first, then Tomatoes (8), then Eggplant (20)."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "palengke-inventory-report",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: palengke-inventory-report.
sqlCourse.steps.push(...([
  {
    "id": "sql-palengke-inventory-report-6",
    "index": 96,
    "task": "Insert the fourth item (Cabbage, id 4) into the report and select all.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "four-items-selected",
        "label": "The report shows all four items: Tomatoes 8, Eggplant 20, Carrots 2, Cabbage 5",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Tomatoes",
            8
          ],
          [
            2,
            "Eggplant",
            20
          ],
          [
            3,
            "Carrots",
            2
          ],
          [
            4,
            "Cabbage",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add id 4 to the WHERE clause in the INSERT to include Cabbage."
      },
      {
        "level": 2,
        "text": "Verify that all four items appear in the SELECT output."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-inventory-report",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-palengke-inventory-report-7",
    "index": 97,
    "task": "Update the report row for id 2 (Eggplant) to set its amount to 18.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "eggplant-updated",
        "label": "Eggplant amount is now 18, others unchanged",
        "kind": "sql-row-contains",
        "row": [
          2,
          "Eggplant",
          18
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use UPDATE report SET amount = 18 WHERE id = 2 to change Eggplant's amount."
      },
      {
        "level": 2,
        "text": "Verify that Eggplant's amount is 18 in the final SELECT."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-inventory-report",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-palengke-inventory-report-8",
    "index": 98,
    "task": "Delete the report row for id 3 (Carrots) and select remaining rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "carrots-deleted",
        "label": "Carrots row is gone; remaining rows are Tomatoes 8, Eggplant 18, Cabbage 5",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Tomatoes",
            8
          ],
          [
            2,
            "Eggplant",
            18
          ],
          [
            4,
            "Cabbage",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use DELETE FROM report WHERE id = 3 to remove Carrots."
      },
      {
        "level": 2,
        "text": "Verify that Carrots is missing and the other three rows remain."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-inventory-report",
    "conceptIds": [
      "sql-delete"
    ]
  },
  {
    "id": "sql-palengke-inventory-report-9",
    "index": 99,
    "task": "Count the number of rows remaining in the report table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "count-three-rows",
        "label": "The report has exactly three rows remaining",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 3
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SELECT COUNT(*) FROM report to count remaining rows."
      },
      {
        "level": 2,
        "text": "Verify that the scalar result is 3."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT COUNT(*) FROM report;"
    },
    "estimatedMinutes": 3,
    "projectId": "palengke-inventory-report",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-palengke-inventory-report-10",
    "index": 100,
    "task": "Show the report rows ordered by id ascending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT COUNT(*) FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "ordered-by-id",
        "label": "Rows are sorted by id: Tomatoes 8, Eggplant 18, Cabbage 5",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Tomatoes",
            8
          ],
          [
            2,
            "Eggplant",
            18
          ],
          [
            4,
            "Cabbage",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY id ASC to the final SELECT to sort by id ascending."
      },
      {
        "level": 2,
        "text": "Verify that id 1 comes first, then id 2, then id 4."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report ORDER BY id ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-inventory-report",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: palengke-daily-record.
sqlCourse.projects.push({"id":"palengke-daily-record","title":"Palengke Stall Daily Record"});
sqlCourse.steps.push(...([
  {
    "id": "sql-palengke-daily-record-101",
    "index": 101,
    "task": "Select only the item names from the record table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows all item names",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes"
          ],
          [
            "Eggplant"
          ],
          [
            "Carrots"
          ],
          [
            "Cabbage"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the field the requested report needs."
      },
      {
        "level": 2,
        "text": "Read the named fields from the example data."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-daily-record"
  },
  {
    "id": "sql-palengke-daily-record-102",
    "index": 102,
    "task": "Add the amount field to the report.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows names and amounts",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes",
            8
          ],
          [
            "Eggplant",
            20
          ],
          [
            "Carrots",
            2
          ],
          [
            "Cabbage",
            5
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the amount field to the report."
      },
      {
        "level": 2,
        "text": "Use the exact field name from the schema."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-daily-record"
  },
  {
    "id": "sql-palengke-daily-record-103",
    "index": 103,
    "task": "Filter the report to show only items with amount <= 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only items with amount <= 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes",
            8
          ],
          [
            "Carrots",
            2
          ],
          [
            "Cabbage",
            5
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter by amount."
      },
      {
        "level": 2,
        "text": "Use <= to include items with amount 10 or less."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-daily-record"
  },
  {
    "id": "sql-palengke-daily-record-104",
    "index": 104,
    "task": "Sort the filtered report by amount ascending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report sorts items by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Carrots",
            2
          ],
          [
            "Cabbage",
            5
          ],
          [
            "Tomatoes",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY amount ASC to sort by amount ascending."
      },
      {
        "level": 2,
        "text": "The order must be exact: Carrots, Cabbage, Tomatoes."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-daily-record"
  },
  {
    "id": "sql-palengke-daily-record-105",
    "index": 105,
    "task": "Limit the sorted report to two rows for priority.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report limits to two rows for priority",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Carrots",
            2
          ],
          [
            "Cabbage",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT 2 to restrict output to two rows."
      },
      {
        "level": 2,
        "text": "The first two rows must be Carrots and Cabbage."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC LIMIT 2;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-daily-record"
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: palengke-daily-record.
sqlCourse.steps.push(...([
  {
    "id": "sql-palengke-daily-record-106",
    "index": 106,
    "task": "Count the number of items with amount <= 10 and check the scalar value 3.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC LIMIT 2;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The count of items with amount <= 10 is 3",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 3
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count matching rows."
      },
      {
        "level": 2,
        "text": "The value must be 3, not the row count."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-daily-record",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-palengke-daily-record-107",
    "index": 107,
    "task": "Alias the count as priority_count and check that exact result column heading.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The count is shown under the exact column priority_count",
        "kind": "sql-columns-equal",
        "columns": [
          "priority_count"
        ]
      },
      {
        "id": "value",
        "label": "The value under priority_count is 3",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 3
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AS to rename the count column."
      },
      {
        "level": 2,
        "text": "The column must be named priority_count exactly."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) AS priority_count FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-daily-record",
    "conceptIds": [
      "sql-alias"
    ]
  },
  {
    "id": "sql-palengke-daily-record-108",
    "index": 108,
    "task": "Group by category and sum the amounts across all rows, giving Local 10 and Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) AS priority_count FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The totals are Local 10 and Regional 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use GROUP BY to group rows by category."
      },
      {
        "level": 2,
        "text": "Use SUM(amount) to add the amounts per group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-daily-record",
    "conceptIds": [
      "sql-group-by"
    ]
  },
  {
    "id": "sql-palengke-daily-record-109",
    "index": 109,
    "task": "Keep only the Regional 25 total by using HAVING above 12.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Only Regional 25 remains",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use HAVING to filter groups after grouping."
      },
      {
        "level": 2,
        "text": "Only Regional 25 has total > 12."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-daily-record",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-palengke-daily-record-110",
    "index": 110,
    "task": "Lower HAVING to above 8 to restore both totals and sort them largest first so Regional 25 comes before Local 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Lower HAVING to 8 to include both groups."
      },
      {
        "level": 2,
        "text": "Use ORDER BY total_amount DESC to sort largest first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 8 ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-daily-record",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: palengke-service-queue.
sqlCourse.projects.push({"id":"palengke-service-queue","title":"Palengke Stall Service Queue"});
sqlCourse.steps.push(...([
  {
    "id": "sql-palengke-service-queue-1",
    "index": 111,
    "task": "Select the name and status of all items in the service queue.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes all items with their name and status",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes",
            "Open"
          ],
          [
            "Eggplant",
            "Done"
          ],
          [
            "Carrots",
            "Open"
          ],
          [
            "Cabbage",
            "Done"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the fields the requested report needs: name and status."
      },
      {
        "level": 2,
        "text": "Read the named fields from the example data."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-service-queue"
  },
  {
    "id": "sql-palengke-service-queue-2",
    "index": 112,
    "task": "Filter to show only items that are currently Open.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes only items with status 'Open'",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes",
            "Open"
          ],
          [
            "Carrots",
            "Open"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use WHERE to filter rows based on status."
      },
      {
        "level": 2,
        "text": "Only rows with status 'Open' should appear."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open';"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-service-queue"
  },
  {
    "id": "sql-palengke-service-queue-3",
    "index": 113,
    "task": "Filter to show only items with amount less than or equal to 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes only items with amount <= 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes",
            "Open"
          ],
          [
            "Carrots",
            "Open"
          ],
          [
            "Cabbage",
            "Done"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use WHERE with amount <= 8 to filter rows."
      },
      {
        "level": 2,
        "text": "Only rows with amount 8 or less should appear."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE amount <= 8;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-service-queue"
  },
  {
    "id": "sql-palengke-service-queue-4",
    "index": 114,
    "task": "Filter to show only items that are Open AND have amount <= 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE amount <= 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes only items that are Open AND amount <= 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes",
            "Open"
          ],
          [
            "Carrots",
            "Open"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AND to combine two conditions: status = 'Open' and amount <= 8."
      },
      {
        "level": 2,
        "text": "Only rows matching both conditions should appear."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open' AND amount <= 8;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-service-queue"
  },
  {
    "id": "sql-palengke-service-queue-5",
    "index": 115,
    "task": "Filter to show only items that are Done OR have amount less than 3.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open' AND amount <= 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes only items that are Done OR amount < 3",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Eggplant",
            "Done"
          ],
          [
            "Carrots",
            "Open"
          ],
          [
            "Cabbage",
            "Done"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use OR to combine two conditions: status = 'Done' or amount < 3."
      },
      {
        "level": 2,
        "text": "Only rows matching either condition should appear."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Done' OR amount < 3;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-service-queue"
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: palengke-service-queue.
sqlCourse.steps.push(...([
  {
    "id": "sql-palengke-service-queue-6",
    "index": 116,
    "task": "Select names beginning with the first letter of the first seeded name using LIKE.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Done' OR amount < 3;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes only names starting with 'T'",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use LIKE to match the first letter of the name: 'T%'"
      },
      {
        "level": 2,
        "text": "Only rows matching the pattern should appear."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name FROM record WHERE name LIKE 'T%';"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-service-queue",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-palengke-service-queue-7",
    "index": 117,
    "task": "Show name, category, and amount for Local rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name FROM record WHERE name LIKE 'T%';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes only Local rows with name, category, and amount",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes",
            "Local",
            8
          ],
          [
            "Carrots",
            "Local",
            2
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Select the three fields: name, category, amount"
      },
      {
        "level": 2,
        "text": "Filter for category = 'Local'"
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local';"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-service-queue",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-palengke-service-queue-8",
    "index": 118,
    "task": "Include Local rows OR amount = 20.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes Local rows and the row with amount = 20",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes",
            "Local",
            8
          ],
          [
            "Carrots",
            "Local",
            2
          ],
          [
            "Eggplant",
            "Regional",
            20
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use OR to combine two conditions: category = 'Local' or amount = 20"
      },
      {
        "level": 2,
        "text": "Only rows matching either condition should appear."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-service-queue",
    "conceptIds": [
      "sql-or"
    ]
  },
  {
    "id": "sql-palengke-service-queue-9",
    "index": 119,
    "task": "Sort that three-row report by amount descending so the 20 row comes first.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report is sorted by amount descending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Eggplant",
            "Regional",
            20
          ],
          [
            "Tomatoes",
            "Local",
            8
          ],
          [
            "Carrots",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY amount DESC to sort by amount descending"
      },
      {
        "level": 2,
        "text": "The row with amount 20 should come first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-service-queue",
    "conceptIds": [
      "sql-order-by"
    ]
  },
  {
    "id": "sql-palengke-service-queue-10",
    "index": 120,
    "task": "Limit it to the first 2 rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report is limited to the first 2 rows",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Eggplant",
            "Regional",
            20
          ],
          [
            "Tomatoes",
            "Local",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT 2 to restrict output to the first 2 rows"
      },
      {
        "level": 2,
        "text": "Only the first two rows should appear."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC LIMIT 2;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-service-queue",
    "conceptIds": [
      "sql-limit"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: palengke-supplier-list.
sqlCourse.projects.push({"id":"palengke-supplier-list","title":"Palengke Stall Supplier List"});
sqlCourse.steps.push(...([
  {
    "id": "sql-palengke-supplier-list-1",
    "index": 121,
    "task": "Count all supplier records in the palengke stall.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "count-all",
        "label": "The count of all supplier records is 4",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows in the record table."
      },
      {
        "level": 2,
        "text": "The result is a single scalar number."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-supplier-list",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-palengke-supplier-list-2",
    "index": 122,
    "task": "Name the count as record_count for clarity.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "named-count",
        "label": "The count is named record_count",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      },
      {
        "id": "alias-heading",
        "label": "The result column is named record_count",
        "kind": "sql-columns-equal",
        "columns": [
          "record_count"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AS to rename the COUNT(*) result to record_count."
      },
      {
        "level": 2,
        "text": "This makes the output column explicit for business reports."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) AS record_count FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-supplier-list",
    "conceptIds": [
      "sql-alias"
    ]
  },
  {
    "id": "sql-palengke-supplier-list-3",
    "index": 123,
    "task": "Calculate the total amount of all supplier records.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) AS record_count FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "total-amount",
        "label": "The total amount is 35",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 35
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(amount) to add up all the amounts in the record table."
      },
      {
        "level": 2,
        "text": "The result is a single scalar total."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT SUM(amount) AS total_amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-supplier-list",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-palengke-supplier-list-4",
    "index": 124,
    "task": "Calculate the average amount per supplier record.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT SUM(amount) AS total_amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "average-amount",
        "label": "The average amount is 8.75",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 8.75
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AVG(amount) to compute the average of all amounts."
      },
      {
        "level": 2,
        "text": "The result is a single scalar average."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT AVG(amount) AS average_amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-supplier-list",
    "conceptIds": [
      "sql-average"
    ]
  },
  {
    "id": "sql-palengke-supplier-list-5",
    "index": 125,
    "task": "Group records by category and count how many per category.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT AVG(amount) AS average_amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "grouped-counts",
        "label": "Local has 2 records and Regional has 2 records",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            2
          ],
          [
            "Regional",
            2
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use GROUP BY category to group rows by their category."
      },
      {
        "level": 2,
        "text": "Use COUNT(*) to count how many records are in each group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, COUNT(*) AS record_count FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-supplier-list",
    "conceptIds": [
      "sql-group-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: palengke-supplier-list.
sqlCourse.steps.push(...([
  {
    "id": "sql-palengke-supplier-list-6",
    "index": 126,
    "task": "Change the grouped calculation to SUM(amount) as total_amount, giving Local 10 and Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, COUNT(*) AS record_count FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "grouped-sums",
        "label": "Local has total_amount 10 and Regional has total_amount 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(amount) to calculate the total amount per category."
      },
      {
        "level": 2,
        "text": "Replace COUNT(*) with SUM(amount) and alias it as total_amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-supplier-list",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-palengke-supplier-list-7",
    "index": 127,
    "task": "Sort both group totals descending so Regional 25 comes first.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "sorted-descending",
        "label": "Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort totals from highest to lowest."
      },
      {
        "level": 2,
        "text": "The result should show Regional first because 25 > 10."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-supplier-list",
    "conceptIds": [
      "sql-descending"
    ]
  },
  {
    "id": "sql-palengke-supplier-list-8",
    "index": 128,
    "task": "Keep only totals above 12 with HAVING.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "filtered-having",
        "label": "Regional 25 only",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(amount) > 12 to filter groups with totals above 12."
      },
      {
        "level": 2,
        "text": "Only Regional (25) meets the condition; Local (10) is excluded."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-supplier-list",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-palengke-supplier-list-9",
    "index": 129,
    "task": "Remove HAVING to restore both complete category totals.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "restored-grouped-sums",
        "label": "Local 10 and Regional 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove the HAVING clause to show all category totals again."
      },
      {
        "level": 2,
        "text": "The result should return both Local and Regional totals."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-supplier-list",
    "conceptIds": [
      "sql-group-by"
    ]
  },
  {
    "id": "sql-palengke-supplier-list-10",
    "index": 130,
    "task": "Order those two restored totals from largest to smallest.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "final-sorted-descending",
        "label": "Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Re-add ORDER BY total_amount DESC to sort the totals descending."
      },
      {
        "level": 2,
        "text": "Regional (25) comes first, then Local (10)."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-supplier-list",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: palengke-community-schedule.
sqlCourse.projects.push({"id":"palengke-community-schedule","title":"Palengke Stall Community Schedule"});
sqlCourse.steps.push(...([
  {
    "id": "sql-palengke-community-schedule-1",
    "index": 131,
    "task": "Read record.name and record.group_id with qualified names",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains record.name and record.group_id",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes",
            1
          ],
          [
            "Eggplant",
            2
          ],
          [
            "Carrots",
            1
          ],
          [
            "Cabbage",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use qualified column names to select record.name and record.group_id."
      },
      {
        "level": 2,
        "text": "The solution selects only the two required fields from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-community-schedule",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-palengke-community-schedule-2",
    "index": 132,
    "task": "Join group_info on matching group ids and show record name plus group label",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains record.name and group_info.label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes",
            "North Team"
          ],
          [
            "Eggplant",
            "South Team"
          ],
          [
            "Carrots",
            "North Team"
          ],
          [
            "Cabbage",
            "South Team"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Join record with group_info using ON group_info.id = record.group_id."
      },
      {
        "level": 2,
        "text": "Select record.name and group_info.label to show the stall name and team label."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 5,
    "projectId": "palengke-community-schedule",
    "conceptIds": [
      "sql-inner-join"
    ]
  },
  {
    "id": "sql-palengke-community-schedule-3",
    "index": 133,
    "task": "Add record.amount to the joined result",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains record.name, group_info.label, and record.amount",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes",
            "North Team",
            8
          ],
          [
            "Eggplant",
            "South Team",
            20
          ],
          [
            "Carrots",
            "North Team",
            2
          ],
          [
            "Cabbage",
            "South Team",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add record.amount to the SELECT list to include the stall's price."
      },
      {
        "level": 2,
        "text": "The solution retains the join and adds the amount field."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-community-schedule",
    "conceptIds": [
      "sql-qualified-column"
    ]
  },
  {
    "id": "sql-palengke-community-schedule-4",
    "index": 134,
    "task": "Filter joined rows to amount <= 10",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains only rows with amount <= 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes",
            "North Team",
            8
          ],
          [
            "Carrots",
            "North Team",
            2
          ],
          [
            "Cabbage",
            "South Team",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add WHERE record.amount <= 10 to filter rows by price."
      },
      {
        "level": 2,
        "text": "Only Tomatoes, Carrots, and Cabbage meet the condition."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-community-schedule",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-palengke-community-schedule-5",
    "index": 135,
    "task": "Sort filtered joined rows by amount ascending",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result is sorted by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Carrots",
            "North Team",
            2
          ],
          [
            "Cabbage",
            "South Team",
            5
          ],
          [
            "Tomatoes",
            "North Team",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY record.amount ASC to sort by price from lowest to highest."
      },
      {
        "level": 2,
        "text": "The sorted rows are Carrots (2), Cabbage (5), Tomatoes (8)."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10 ORDER BY record.amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-community-schedule",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: palengke-community-schedule.
sqlCourse.steps.push(...([
  {
    "id": "sql-palengke-community-schedule-6",
    "index": 136,
    "task": "Count records for each group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10 ORDER BY record.amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result shows count per group label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            2
          ],
          [
            "South Team",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) with GROUP BY group_info.label to count records per group."
      },
      {
        "level": 2,
        "text": "The solution groups by group_info.label and counts all records in each group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, COUNT(*) AS record_count FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-community-schedule",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-palengke-community-schedule-7",
    "index": 137,
    "task": "Sum amount for each group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, COUNT(*) AS record_count FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result shows total amount per group label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(record.amount) with GROUP BY group_info.label to sum amounts per group."
      },
      {
        "level": 2,
        "text": "The solution groups by group_info.label and sums the amount in each group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-community-schedule",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-palengke-community-schedule-8",
    "index": 138,
    "task": "Keep only group sums above 12 with HAVING.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result shows only groups with total amount above 12",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(record.amount) > 12 to filter groups with total amount above 12."
      },
      {
        "level": 2,
        "text": "The solution keeps only South Team (25) because it’s the only group above 12."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label HAVING SUM(record.amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-community-schedule",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-palengke-community-schedule-9",
    "index": 139,
    "task": "Remove HAVING to restore both groups and sort their sums descending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label HAVING SUM(record.amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result shows both groups sorted by total amount descending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ],
          [
            "North Team",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove HAVING and add ORDER BY total_amount DESC to sort groups by total amount descending."
      },
      {
        "level": 2,
        "text": "The solution restores both groups and sorts them with South Team (25) first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-community-schedule",
    "conceptIds": [
      "sql-descending"
    ]
  },
  {
    "id": "sql-palengke-community-schedule-10",
    "index": 140,
    "task": "Limit the restored grouped report to the largest group.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result shows only the largest group",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT 1 after ORDER BY total_amount DESC to keep only the largest group."
      },
      {
        "level": 2,
        "text": "The solution returns only South Team (25) as the largest group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC LIMIT 1;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-community-schedule",
    "conceptIds": [
      "sql-limit"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: palengke-delivery-log.
sqlCourse.projects.push({"id":"palengke-delivery-log","title":"Palengke Stall Delivery Log"});
sqlCourse.steps.push(...([
  {
    "id": "sql-palengke-delivery-log-1",
    "index": 141,
    "task": "Select the record name and group_id for all items in the palengke delivery log.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows with name and group_id",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes",
            1
          ],
          [
            "Eggplant",
            2
          ],
          [
            "Carrots",
            1
          ],
          [
            "Cabbage",
            null
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the exact columns: name and group_id from the record table."
      },
      {
        "level": 2,
        "text": "This is the base query to fetch all items with their group identifiers."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-delivery-log",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-palengke-delivery-log-2",
    "index": 142,
    "task": "LEFT JOIN group_info to display the group label for each record.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows with name and group label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes",
            "North Team"
          ],
          [
            "Eggplant",
            "South Team"
          ],
          [
            "Carrots",
            "North Team"
          ],
          [
            "Cabbage",
            null
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use LEFT JOIN to include all records even if group_info is missing."
      },
      {
        "level": 2,
        "text": "Match group_info.id with record.group_id to link the labels."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 5,
    "projectId": "palengke-delivery-log",
    "conceptIds": [
      "sql-left-join"
    ]
  },
  {
    "id": "sql-palengke-delivery-log-3",
    "index": 143,
    "task": "Use COALESCE to show 'Unassigned' for records with no group.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows with name and group_label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes",
            "North Team"
          ],
          [
            "Eggplant",
            "South Team"
          ],
          [
            "Carrots",
            "North Team"
          ],
          [
            "Cabbage",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COALESCE to replace NULL with 'Unassigned' for missing group labels."
      },
      {
        "level": 2,
        "text": "Alias the new column as group_label for clarity."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-delivery-log",
    "conceptIds": [
      "sql-coalesce"
    ]
  },
  {
    "id": "sql-palengke-delivery-log-4",
    "index": 144,
    "task": "Filter to show only the record with group_id IS NULL.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains one row with name and group_label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cabbage",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add WHERE record.group_id IS NULL to filter for the unassigned item."
      },
      {
        "level": 2,
        "text": "This isolates the row with no group assigned."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id WHERE record.group_id IS NULL;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-delivery-log",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-palengke-delivery-log-5",
    "index": 145,
    "task": "Switch back to all rows and sort by the displayed group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id WHERE record.group_id IS NULL;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows sorted by group_label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tomatoes",
            "North Team"
          ],
          [
            "Carrots",
            "North Team"
          ],
          [
            "Eggplant",
            "South Team"
          ],
          [
            "Cabbage",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove the WHERE clause to return all rows."
      },
      {
        "level": 2,
        "text": "Add ORDER BY group_label ASC to sort alphabetically by group label."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id ORDER BY group_label ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-delivery-log",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: palengke-delivery-log.
sqlCourse.steps.push(...([
  {
    "id": "sql-palengke-delivery-log-6",
    "index": 146,
    "task": "Count every record after the LEFT JOIN",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id ORDER BY group_label ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result is a single row with scalar count 4",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows after the LEFT JOIN."
      },
      {
        "level": 2,
        "text": "The solution is a single SELECT with no WHERE or ORDER BY."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-delivery-log",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-palengke-delivery-log-7",
    "index": 147,
    "task": "Count records per displayed group label",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains three rows: North Team 2, South Team 1, Unassigned 1",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            2
          ],
          [
            "South Team",
            1
          ],
          [
            "Unassigned",
            1
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Group by the displayed group label using GROUP BY group_label."
      },
      {
        "level": 2,
        "text": "Use COUNT(*) to count records per group, and COALESCE to handle NULLs."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, COUNT(*) AS record_count FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "estimatedMinutes": 5,
    "projectId": "palengke-delivery-log",
    "conceptIds": [
      "sql-group-by"
    ]
  },
  {
    "id": "sql-palengke-delivery-log-8",
    "index": 148,
    "task": "Sum amount per displayed group label",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, COUNT(*) AS record_count FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains three rows: North Team 10, South Team 20, Unassigned 5",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            20
          ],
          [
            "Unassigned",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(record.amount) to calculate total amount per group."
      },
      {
        "level": 2,
        "text": "Group by the displayed group label using GROUP BY group_label."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "estimatedMinutes": 5,
    "projectId": "palengke-delivery-log",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-palengke-delivery-log-9",
    "index": 149,
    "task": "Keep displayed groups whose sum exceeds 8",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains two rows: North Team 10 and South Team 20",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(record.amount) > 8 to filter groups with total amount over 8."
      },
      {
        "level": 2,
        "text": "The solution retains only groups whose sum exceeds 8."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8;"
    },
    "estimatedMinutes": 5,
    "projectId": "palengke-delivery-log",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-palengke-delivery-log-10",
    "index": 150,
    "task": "Order those group sums descending",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Tomatoes', 'Local', 8, 'Open', 1), (2, 'Eggplant', 'Regional', 20, 'Done', 2), (3, 'Carrots', 'Local', 2, 'Open', 1), (4, 'Cabbage', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains two rows: South Team 20 then North Team 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            20
          ],
          [
            "North Team",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort group sums in descending order."
      },
      {
        "level": 2,
        "text": "The solution displays South Team first (20) then North Team (10)."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8 ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 5,
    "projectId": "palengke-delivery-log",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: jeepney-inventory-report.
sqlCourse.projects.push({"id":"jeepney-inventory-report","title":"Jeepney Dispatch Inventory Report"});
sqlCourse.steps.push(...([
  {
    "id": "sql-jeepney-inventory-report-1",
    "index": 151,
    "task": "Select the id, name, and amount from the record table to start the jeepney inventory report.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The initial report shows all jeepney records with id, name, and amount",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Cubao",
            8
          ],
          [
            2,
            "Quiapo",
            20
          ],
          [
            3,
            "Divisoria",
            2
          ],
          [
            4,
            "Marikina",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Start by selecting the id, name, and amount columns from the record table."
      },
      {
        "level": 2,
        "text": "This is the base query for the jeepney inventory report."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-inventory-report",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-jeepney-inventory-report-2",
    "index": 152,
    "task": "Insert a new jeepney record with id 5, name 'New Record', category 'Local', amount 7, status 'Open', group_id 1, then read all rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report now includes the new record with id 5 and amount 7",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Cubao",
            8
          ],
          [
            2,
            "Quiapo",
            20
          ],
          [
            3,
            "Divisoria",
            2
          ],
          [
            4,
            "Marikina",
            5
          ],
          [
            5,
            "New Record",
            7
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert the new record using the INSERT INTO statement with the correct values."
      },
      {
        "level": 2,
        "text": "Then select all rows to verify the new record is included."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nSELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "jeepney-inventory-report",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-jeepney-inventory-report-3",
    "index": 153,
    "task": "Update the amount of the new record (id 5) to 9, then read only that record.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nSELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The new record's amount is updated to 9",
        "kind": "sql-row-contains",
        "row": [
          5,
          "New Record",
          9
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Update the amount of the new record using the UPDATE statement with WHERE id = 5."
      },
      {
        "level": 2,
        "text": "Then select only the updated record to verify the change."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nSELECT id, name, amount FROM record WHERE id = 5;"
    },
    "estimatedMinutes": 5,
    "projectId": "jeepney-inventory-report",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-jeepney-inventory-report-4",
    "index": 154,
    "task": "Update the status of the Quiapo record (id 2) to 'Open', then read only that record's id and status.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nSELECT id, name, amount FROM record WHERE id = 5;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The Quiapo record's status is updated to 'Open'",
        "kind": "sql-row-contains",
        "row": [
          2,
          "Quiapo",
          "Open"
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Update the status of the Quiapo record using the UPDATE statement with WHERE id = 2."
      },
      {
        "level": 2,
        "text": "Then select only that record to verify the change."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nSELECT id, name, status FROM record WHERE id = 2;"
    },
    "estimatedMinutes": 5,
    "projectId": "jeepney-inventory-report",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-jeepney-inventory-report-5",
    "index": 155,
    "task": "Delete the Marikina record (id 4), then read the remaining ids and names.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nSELECT id, name, status FROM record WHERE id = 2;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The Marikina record is deleted, and the remaining records are shown",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Cubao"
          ],
          [
            2,
            "Quiapo"
          ],
          [
            3,
            "Divisoria"
          ],
          [
            5,
            "New Record"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Delete the Marikina record using the DELETE statement with WHERE id = 4."
      },
      {
        "level": 2,
        "text": "Then select the remaining records to verify the deletion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nSELECT id, name FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "jeepney-inventory-report",
    "conceptIds": [
      "sql-delete"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: jeepney-inventory-report.
sqlCourse.steps.push(...([
  {
    "id": "sql-jeepney-inventory-report-6",
    "index": 156,
    "task": "Insert a new jeepney record with id 6, name 'Backup Record', category 'Local', amount 4, status 'Open', group_id 1, then read it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nSELECT id, name FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The Backup Record is inserted and retrieved correctly",
        "kind": "sql-row-contains",
        "row": [
          6,
          "Backup Record",
          4
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert the new record with id 6 using INSERT INTO record VALUES (...)."
      },
      {
        "level": 2,
        "text": "Then select only the row with id = 6 to verify the insertion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nSELECT id, name, amount FROM record WHERE id = 6;"
    },
    "estimatedMinutes": 5,
    "projectId": "jeepney-inventory-report",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-jeepney-inventory-report-7",
    "index": 157,
    "task": "Update the category of the Backup Record (id 6) to 'Regional', then read it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nSELECT id, name, amount FROM record WHERE id = 6;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The Backup Record's category is updated to 'Regional'",
        "kind": "sql-row-contains",
        "row": [
          6,
          "Backup Record",
          "Regional",
          4
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Update the category using UPDATE record SET category = 'Regional' WHERE id = 6."
      },
      {
        "level": 2,
        "text": "Then select the row to verify the change."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nSELECT id, name, category, amount FROM record WHERE id = 6;"
    },
    "estimatedMinutes": 5,
    "projectId": "jeepney-inventory-report",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-jeepney-inventory-report-8",
    "index": 158,
    "task": "Delete the Cubao record (id 1), then read the remaining rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nSELECT id, name, category, amount FROM record WHERE id = 6;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The Cubao record is deleted, and the remaining records are shown",
        "kind": "sql-rows-equal",
        "rows": [
          [
            2,
            "Quiapo",
            20
          ],
          [
            3,
            "Divisoria",
            2
          ],
          [
            5,
            "New Record",
            9
          ],
          [
            6,
            "Backup Record",
            4
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Delete the Cubao record using DELETE FROM record WHERE id = 1."
      },
      {
        "level": 2,
        "text": "Then select all remaining rows to verify the deletion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "jeepney-inventory-report",
    "conceptIds": [
      "sql-delete"
    ]
  },
  {
    "id": "sql-jeepney-inventory-report-9",
    "index": 159,
    "task": "Count all remaining rows after deletion.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The count of remaining rows is 4",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows in the record table."
      },
      {
        "level": 2,
        "text": "The result should be 4 after deleting id 1."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT COUNT(*) FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-inventory-report",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-jeepney-inventory-report-10",
    "index": 160,
    "task": "Show remaining names and amounts sorted by amount ascending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT COUNT(*) FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The names and amounts are sorted by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Divisoria",
            2
          ],
          [
            "Backup Record",
            4
          ],
          [
            "New Record",
            9
          ],
          [
            "Quiapo",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Select name and amount columns and sort by amount using ORDER BY amount ASC."
      },
      {
        "level": 2,
        "text": "The output should list records in ascending order of amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT name, amount FROM record ORDER BY amount ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "jeepney-inventory-report",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: jeepney-daily-record.
sqlCourse.projects.push({"id":"jeepney-daily-record","title":"Jeepney Dispatch Daily Record"});
sqlCourse.steps.push(...([
  {
    "id": "sql-jeepney-daily-record-1",
    "index": 161,
    "task": "Create a report table with id and name columns.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-table-exists",
        "label": "The report table exists with id and name columns",
        "kind": "sql-table-columns",
        "table": "report",
        "columns": [
          "id",
          "name"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Create a new table named 'report' with columns 'id' and 'name'."
      },
      {
        "level": 2,
        "text": "Use the exact CREATE TABLE syntax with the required column types."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT);"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-daily-record",
    "conceptIds": [
      "sql-create-table"
    ]
  },
  {
    "id": "sql-jeepney-daily-record-2",
    "index": 162,
    "task": "Add the amount column to the report table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT);"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-table-columns",
        "label": "The report table has id, name, and amount columns",
        "kind": "sql-table-columns",
        "table": "report",
        "columns": [
          "id",
          "name",
          "amount"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the column 'amount' of type INTEGER to the report table."
      },
      {
        "level": 2,
        "text": "Use the exact CREATE TABLE syntax with the new column added."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-daily-record",
    "conceptIds": [
      "sql-create-table"
    ]
  },
  {
    "id": "sql-jeepney-daily-record-3",
    "index": 163,
    "task": "Insert the row for id 1 from source_record into report and select it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "row-1-exists",
        "label": "The row for id 1 (Cubao) exists in report",
        "kind": "sql-row-contains",
        "row": [
          1,
          "Cubao",
          8
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert the row with id 1 from source_record into report using a SELECT."
      },
      {
        "level": 2,
        "text": "Then select all rows from report to verify the insertion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id = 1;\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 6,
    "projectId": "jeepney-daily-record",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-jeepney-daily-record-4",
    "index": 164,
    "task": "Insert rows for ids 2 and 3 from source_record into report and select them.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id = 1;\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "rows-1-2-3-exist",
        "label": "Rows for ids 1, 2, and 3 exist in report",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Cubao",
            8
          ],
          [
            2,
            "Quiapo",
            20
          ],
          [
            3,
            "Divisoria",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert rows for ids 2 and 3 using IN clause with id 1 already inserted."
      },
      {
        "level": 2,
        "text": "Then select all rows to verify the insertion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 6,
    "projectId": "jeepney-daily-record",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-jeepney-daily-record-5",
    "index": 165,
    "task": "Sort the report rows by amount in ascending order.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "sorted-by-amount",
        "label": "Rows are sorted by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            3,
            "Divisoria",
            2
          ],
          [
            1,
            "Cubao",
            8
          ],
          [
            2,
            "Quiapo",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY amount ASC to sort the rows by amount in ascending order."
      },
      {
        "level": 2,
        "text": "The expected rows are Divisoria 2, Cubao 8, Quiapo 20."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "estimatedMinutes": 6,
    "projectId": "jeepney-daily-record",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: jeepney-daily-record.
sqlCourse.steps.push(...([
  {
    "id": "sql-jeepney-daily-record-6",
    "index": 166,
    "task": "Insert the row for id 4 from source_record into report and select it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-has-id-4",
        "label": "The report includes the row for id 4",
        "kind": "sql-row-contains",
        "row": [
          4,
          "Marikina",
          5
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add WHERE id IN (1, 2, 3, 4) to the INSERT to include id 4."
      },
      {
        "level": 2,
        "text": "The expected row is Marikina with amount 5."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-daily-record",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-jeepney-daily-record-7",
    "index": 167,
    "task": "Update the amount of the Quiapo record (id 2) to 18, then select it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "quiapo-amount-updated",
        "label": "The Quiapo record's amount is now 18",
        "kind": "sql-value-equals",
        "row": 1,
        "column": 2,
        "value": 18,
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add UPDATE report SET amount = 18 WHERE id = 2 to change the amount."
      },
      {
        "level": 2,
        "text": "The expected row is Quiapo with amount 18."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-daily-record",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-jeepney-daily-record-8",
    "index": 168,
    "task": "Delete the Divisoria record (id 3), then select the remaining rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "divisoria-deleted",
        "label": "The Divisoria record is no longer in the report",
        "kind": "sql-row-count",
        "count": 3,
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add DELETE FROM report WHERE id = 3 to remove the Divisoria row."
      },
      {
        "level": 2,
        "text": "The remaining rows are Cubao 8, Quiapo 18, Marikina 5."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-daily-record",
    "conceptIds": [
      "sql-delete"
    ]
  },
  {
    "id": "sql-jeepney-daily-record-9",
    "index": 169,
    "task": "Count the remaining rows in the report after deletion.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "count-remaining-rows",
        "label": "The report has 3 rows remaining",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 3,
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add SELECT COUNT(*) FROM report to count the rows."
      },
      {
        "level": 2,
        "text": "The expected count is 3."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT COUNT(*) FROM report;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-daily-record",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-jeepney-daily-record-10",
    "index": 170,
    "task": "Show id, name, and amount ordered by id ascending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT COUNT(*) FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "ordered-by-id",
        "label": "Rows are sorted by id ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Cubao",
            8
          ],
          [
            2,
            "Quiapo",
            18
          ],
          [
            4,
            "Marikina",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY id ASC to sort the rows by id ascending."
      },
      {
        "level": 2,
        "text": "The expected rows are Cubao 8, Quiapo 18, Marikina 5."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report ORDER BY id ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-daily-record",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: jeepney-service-queue.
sqlCourse.projects.push({"id":"jeepney-service-queue","title":"Jeepney Dispatch Service Queue"});
sqlCourse.steps.push(...([
  {
    "id": "sql-jeepney-service-queue-1",
    "index": 171,
    "task": "Select only the jeepney names from the record table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows all jeepney names",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cubao"
          ],
          [
            "Quiapo"
          ],
          [
            "Divisoria"
          ],
          [
            "Marikina"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the field the report needs: jeepney name."
      },
      {
        "level": 2,
        "text": "Read the name field from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-service-queue"
  },
  {
    "id": "sql-jeepney-service-queue-2",
    "index": 172,
    "task": "Add the amount field to the report.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows names and amounts",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cubao",
            8
          ],
          [
            "Quiapo",
            20
          ],
          [
            "Divisoria",
            2
          ],
          [
            "Marikina",
            5
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the amount field to the SELECT clause."
      },
      {
        "level": 2,
        "text": "The solution adds one field to the existing SELECT."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-service-queue"
  },
  {
    "id": "sql-jeepney-service-queue-3",
    "index": 173,
    "task": "Filter the report to show only jeepneys with amount <= 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only jeepneys with amount <= 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cubao",
            8
          ],
          [
            "Divisoria",
            2
          ],
          [
            "Marikina",
            5
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter by amount."
      },
      {
        "level": 2,
        "text": "Use <= to include amounts equal to 10."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-service-queue"
  },
  {
    "id": "sql-jeepney-service-queue-4",
    "index": 174,
    "task": "Sort the filtered report by amount in ascending order.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report is sorted by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Divisoria",
            2
          ],
          [
            "Marikina",
            5
          ],
          [
            "Cubao",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY amount ASC to sort by amount."
      },
      {
        "level": 2,
        "text": "The sort must be ascending to match the requested order."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-service-queue"
  },
  {
    "id": "sql-jeepney-service-queue-5",
    "index": 175,
    "task": "Limit the sorted report to only 2 rows for a priority list.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only 2 rows for priority list",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Divisoria",
            2
          ],
          [
            "Marikina",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT 2 to restrict output to 2 rows."
      },
      {
        "level": 2,
        "text": "The limit removes the highest amount row (Cubao)."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC LIMIT 2;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-service-queue"
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: jeepney-service-queue.
sqlCourse.steps.push(...([
  {
    "id": "sql-jeepney-service-queue-6",
    "index": 176,
    "task": "Replace the entire prior SELECT with COUNT(*) for amount <= 10 and check the scalar value 3, not the output row count.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC LIMIT 2;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The scalar COUNT value is 3",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 3
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count matching rows, not SELECT *."
      },
      {
        "level": 2,
        "text": "Filter rows with WHERE amount <= 10."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-service-queue",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-jeepney-service-queue-7",
    "index": 177,
    "task": "Alias that count as priority_count and check that exact result column heading.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result column is named priority_count",
        "kind": "sql-columns-equal",
        "columns": [
          "priority_count"
        ]
      },
      {
        "id": "value",
        "label": "The value under priority_count is 3",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 3
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AS to rename the COUNT result to priority_count."
      },
      {
        "level": 2,
        "text": "The column heading must match exactly."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) AS priority_count FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-service-queue",
    "conceptIds": [
      "sql-alias"
    ]
  },
  {
    "id": "sql-jeepney-service-queue-8",
    "index": 178,
    "task": "Replace the entire count query with category and SUM(amount) grouped across all four rows, giving Local 10 and Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) AS priority_count FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows Local 10 and Regional 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use GROUP BY to group rows by category."
      },
      {
        "level": 2,
        "text": "Use SUM(amount) to calculate total per group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-service-queue",
    "conceptIds": [
      "sql-group-by"
    ]
  },
  {
    "id": "sql-jeepney-service-queue-9",
    "index": 179,
    "task": "Keep only the Regional 25 total by using HAVING above 12.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only Regional 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use HAVING to filter groups after grouping."
      },
      {
        "level": 2,
        "text": "Only groups with SUM(amount) > 12 are shown."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-service-queue",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-jeepney-service-queue-10",
    "index": 180,
    "task": "Lower HAVING to above 8 to restore both totals and sort them largest first so Regional 25 comes before Local 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Lower the HAVING threshold to 8 to include both groups."
      },
      {
        "level": 2,
        "text": "Use ORDER BY total_amount DESC to sort largest first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 8 ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-service-queue",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: jeepney-supplier-list.
sqlCourse.projects.push({"id":"jeepney-supplier-list","title":"Jeepney Dispatch Supplier List"});
sqlCourse.steps.push(...([
  {
    "id": "sql-jeepney-supplier-list-1",
    "index": 181,
    "task": "Select the name and status of all jeepney suppliers.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains the name and status of all suppliers",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cubao",
            "Open"
          ],
          [
            "Quiapo",
            "Done"
          ],
          [
            "Divisoria",
            "Open"
          ],
          [
            "Marikina",
            "Done"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the fields the requested report needs."
      },
      {
        "level": 2,
        "text": "Read the named fields from the example data."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-supplier-list"
  },
  {
    "id": "sql-jeepney-supplier-list-2",
    "index": 182,
    "task": "Filter to show only suppliers with status 'Open'.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains only suppliers with status 'Open'",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cubao",
            "Open"
          ],
          [
            "Divisoria",
            "Open"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use WHERE to filter rows based on a condition."
      },
      {
        "level": 2,
        "text": "Only include rows where status equals 'Open'."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open';"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-supplier-list"
  },
  {
    "id": "sql-jeepney-supplier-list-3",
    "index": 183,
    "task": "Filter to show only suppliers with amount less than or equal to 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains only suppliers with amount <= 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cubao",
            "Open"
          ],
          [
            "Divisoria",
            "Open"
          ],
          [
            "Marikina",
            "Done"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use WHERE to filter rows based on a condition."
      },
      {
        "level": 2,
        "text": "Only include rows where amount is less than or equal to 8."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE amount <= 8;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-supplier-list"
  },
  {
    "id": "sql-jeepney-supplier-list-4",
    "index": 184,
    "task": "Filter to show only suppliers that are 'Open' AND have amount <= 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE amount <= 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains only suppliers that are 'Open' AND amount <= 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cubao",
            "Open"
          ],
          [
            "Divisoria",
            "Open"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AND to combine two conditions."
      },
      {
        "level": 2,
        "text": "Only include rows where status is 'Open' AND amount is <= 8."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open' AND amount <= 8;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-supplier-list"
  },
  {
    "id": "sql-jeepney-supplier-list-5",
    "index": 185,
    "task": "Filter to show suppliers that are 'Done' OR have amount less than 3.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open' AND amount <= 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains suppliers that are 'Done' OR amount < 3",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Quiapo",
            "Done"
          ],
          [
            "Divisoria",
            "Open"
          ],
          [
            "Marikina",
            "Done"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use OR to combine two conditions."
      },
      {
        "level": 2,
        "text": "Only include rows where status is 'Done' OR amount is less than 3."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Done' OR amount < 3;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-supplier-list"
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: jeepney-supplier-list.
sqlCourse.steps.push(...([
  {
    "id": "sql-jeepney-supplier-list-6",
    "index": 186,
    "task": "Select names beginning with the first letter of the first seeded name using LIKE.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Done' OR amount < 3;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains names beginning with 'C'",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cubao"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use LIKE to match names starting with 'C'."
      },
      {
        "level": 2,
        "text": "Only include rows where name starts with 'C'."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name FROM record WHERE name LIKE 'C%';"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-supplier-list",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-jeepney-supplier-list-7",
    "index": 187,
    "task": "Show name, category, and amount for Local rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name FROM record WHERE name LIKE 'C%';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains Local rows with name, category, and amount",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cubao",
            "Local",
            8
          ],
          [
            "Divisoria",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Select the three fields: name, category, and amount."
      },
      {
        "level": 2,
        "text": "Filter for rows where category is 'Local'."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local';"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-supplier-list",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-jeepney-supplier-list-8",
    "index": 188,
    "task": "Include Local rows OR amount = 20.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains Local rows and the row with amount = 20",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cubao",
            "Local",
            8
          ],
          [
            "Quiapo",
            "Regional",
            20
          ],
          [
            "Divisoria",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use OR to combine the two conditions."
      },
      {
        "level": 2,
        "text": "Include rows where category is 'Local' OR amount is 20."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-supplier-list",
    "conceptIds": [
      "sql-or"
    ]
  },
  {
    "id": "sql-jeepney-supplier-list-9",
    "index": 189,
    "task": "Sort that three-row report by amount descending so the 20 row comes first.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result is sorted by amount descending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Quiapo",
            "Regional",
            20
          ],
          [
            "Cubao",
            "Local",
            8
          ],
          [
            "Divisoria",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY amount DESC to sort by amount descending."
      },
      {
        "level": 2,
        "text": "The row with amount 20 should come first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-supplier-list",
    "conceptIds": [
      "sql-order-by"
    ]
  },
  {
    "id": "sql-jeepney-supplier-list-10",
    "index": 190,
    "task": "Limit it to the first 2 rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result is limited to the first 2 rows",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Quiapo",
            "Regional",
            20
          ],
          [
            "Cubao",
            "Local",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT 2 to restrict output to the first two rows."
      },
      {
        "level": 2,
        "text": "Only the first two rows should appear in the result."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC LIMIT 2;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-supplier-list",
    "conceptIds": [
      "sql-limit"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: jeepney-community-schedule.
sqlCourse.projects.push({"id":"jeepney-community-schedule","title":"Jeepney Community Schedule"});
sqlCourse.steps.push(...([
  {
    "id": "sql-jeepney-community-schedule-1",
    "index": 191,
    "task": "Count all rows in the record table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "count",
        "label": "The count is 4",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows in the table."
      },
      {
        "level": 2,
        "text": "The result is a single scalar value."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-community-schedule"
  },
  {
    "id": "sql-jeepney-community-schedule-2",
    "index": 192,
    "task": "Name the count as record_count.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "record-count",
        "label": "The count is named record_count",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      },
      {
        "id": "alias-heading",
        "label": "The result column is named record_count",
        "kind": "sql-columns-equal",
        "columns": [
          "record_count"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AS to rename the count column."
      },
      {
        "level": 2,
        "text": "The result is still a single scalar value."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) AS record_count FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-community-schedule"
  },
  {
    "id": "sql-jeepney-community-schedule-3",
    "index": 193,
    "task": "Calculate the total amount of all records.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) AS record_count FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "total-amount",
        "label": "The total amount is 35",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 35
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(amount) to calculate the total."
      },
      {
        "level": 2,
        "text": "The result is a single scalar value."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT SUM(amount) AS total_amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-community-schedule"
  },
  {
    "id": "sql-jeepney-community-schedule-4",
    "index": 194,
    "task": "Calculate the average amount of all records.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT SUM(amount) AS total_amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "average-amount",
        "label": "The average amount is 8.75",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 8.75
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AVG(amount) to calculate the average."
      },
      {
        "level": 2,
        "text": "The result is a single scalar value."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT AVG(amount) AS average_amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-community-schedule"
  },
  {
    "id": "sql-jeepney-community-schedule-5",
    "index": 195,
    "task": "Group records by category and count each category.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT AVG(amount) AS average_amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "category-counts",
        "label": "Local has 2 records, Regional has 2 records",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            2
          ],
          [
            "Regional",
            2
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use GROUP BY category to group by category."
      },
      {
        "level": 2,
        "text": "Use COUNT(*) to count records in each group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, COUNT(*) AS record_count FROM record GROUP BY category;"
    },
    "estimatedMinutes": 6,
    "projectId": "jeepney-community-schedule"
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: jeepney-community-schedule.
sqlCourse.steps.push(...([
  {
    "id": "sql-jeepney-community-schedule-6",
    "index": 196,
    "task": "Change the grouped calculation to SUM(amount) as total_amount, giving Local 10 and Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, COUNT(*) AS record_count FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "category-totals",
        "label": "Local has total 10, Regional has total 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(amount) to calculate total amount per category."
      },
      {
        "level": 2,
        "text": "Replace COUNT(*) with SUM(amount) and alias it as total_amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-community-schedule",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-jeepney-community-schedule-7",
    "index": 197,
    "task": "Sort both group totals descending so Regional 25 comes first.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "sorted-totals",
        "label": "Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort totals descending."
      },
      {
        "level": 2,
        "text": "The result should show Regional first, then Local."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-community-schedule",
    "conceptIds": [
      "sql-descending"
    ]
  },
  {
    "id": "sql-jeepney-community-schedule-8",
    "index": 198,
    "task": "Keep only totals above 12 with HAVING.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "filtered-totals",
        "label": "Regional 25 only",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(amount) > 12 to filter groups with totals above 12."
      },
      {
        "level": 2,
        "text": "Only Regional remains since its total is 25, which is above 12."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-community-schedule",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-jeepney-community-schedule-9",
    "index": 199,
    "task": "Remove HAVING to restore both complete category totals.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "restored-totals",
        "label": "Local 10 and Regional 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove the HAVING clause to restore all category totals."
      },
      {
        "level": 2,
        "text": "The result should show both Local and Regional totals again."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-community-schedule",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-jeepney-community-schedule-10",
    "index": 200,
    "task": "Order those two restored totals from largest to smallest.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "final-sorted-totals",
        "label": "Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort the totals descending."
      },
      {
        "level": 2,
        "text": "Regional should appear first, then Local."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-community-schedule",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: jeepney-delivery-log.
sqlCourse.projects.push({"id":"jeepney-delivery-log","title":"Jeepney Dispatch Delivery Log"});
sqlCourse.steps.push(...([
  {
    "id": "sql-jeepney-delivery-log-201",
    "index": 201,
    "task": "Read the record names and group IDs from the delivery log.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows record names and group IDs",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cubao",
            1
          ],
          [
            "Quiapo",
            2
          ],
          [
            "Divisoria",
            1
          ],
          [
            "Marikina",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use qualified column names to select record.name and record.group_id."
      },
      {
        "level": 2,
        "text": "This step selects only the name and group_id from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-delivery-log",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-jeepney-delivery-log-202",
    "index": 202,
    "task": "Join the record table with group_info to show the group label for each delivery.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows record names and their group labels",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cubao",
            "North Team"
          ],
          [
            "Quiapo",
            "South Team"
          ],
          [
            "Divisoria",
            "North Team"
          ],
          [
            "Marikina",
            "South Team"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use an INNER JOIN to link record.group_id with group_info.id."
      },
      {
        "level": 2,
        "text": "Select record.name and group_info.label to show the delivery name and its group label."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 5,
    "projectId": "jeepney-delivery-log",
    "conceptIds": [
      "sql-inner-join"
    ]
  },
  {
    "id": "sql-jeepney-delivery-log-203",
    "index": 203,
    "task": "Add the amount column to the report for each delivery.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows record names, group labels, and amounts",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cubao",
            "North Team",
            8
          ],
          [
            "Quiapo",
            "South Team",
            20
          ],
          [
            "Divisoria",
            "North Team",
            2
          ],
          [
            "Marikina",
            "South Team",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add record.amount to the SELECT list to include the delivery amount."
      },
      {
        "level": 2,
        "text": "The join remains unchanged; just add the amount column."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-delivery-log",
    "conceptIds": [
      "sql-qualified-column"
    ]
  },
  {
    "id": "sql-jeepney-delivery-log-204",
    "index": 204,
    "task": "Filter the report to show only deliveries with amount less than or equal to 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only deliveries with amount <= 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Cubao",
            "North Team",
            8
          ],
          [
            "Divisoria",
            "North Team",
            2
          ],
          [
            "Marikina",
            "South Team",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter rows where record.amount <= 10."
      },
      {
        "level": 2,
        "text": "This removes Quiapo (20) from the report."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-delivery-log",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-jeepney-delivery-log-205",
    "index": 205,
    "task": "Sort the filtered deliveries by amount in ascending order.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows filtered deliveries sorted by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Divisoria",
            "North Team",
            2
          ],
          [
            "Marikina",
            "South Team",
            5
          ],
          [
            "Cubao",
            "North Team",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY record.amount ASC to sort the filtered rows by amount."
      },
      {
        "level": 2,
        "text": "The order must be ascending to match the expected result."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10 ORDER BY record.amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-delivery-log",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: jeepney-delivery-log.
sqlCourse.steps.push(...([
  {
    "id": "sql-jeepney-delivery-log-206",
    "index": 206,
    "task": "Count the number of records for each group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10 ORDER BY record.amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows group labels with their record counts",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            2
          ],
          [
            "South Team",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows in each group."
      },
      {
        "level": 2,
        "text": "Group by group_info.label to get one row per group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, COUNT(*) AS record_count FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-delivery-log",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-jeepney-delivery-log-207",
    "index": 207,
    "task": "Sum the amount for each group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, COUNT(*) AS record_count FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows group labels with their total amounts",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(record.amount) to add up the amounts for each group."
      },
      {
        "level": 2,
        "text": "Group by group_info.label to get one row per group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-delivery-log",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-jeepney-delivery-log-208",
    "index": 208,
    "task": "Keep only groups with total amount above 12 using HAVING.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only groups with total amount above 12",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(record.amount) > 12 to filter groups by total amount."
      },
      {
        "level": 2,
        "text": "Only South Team (25) meets the condition."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label HAVING SUM(record.amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-delivery-log",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-jeepney-delivery-log-209",
    "index": 209,
    "task": "Remove HAVING to restore both groups and sort their totals descending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label HAVING SUM(record.amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows both groups sorted by total amount descending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ],
          [
            "North Team",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove HAVING to restore all groups."
      },
      {
        "level": 2,
        "text": "Add ORDER BY total_amount DESC to sort totals from largest to smallest."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-delivery-log",
    "conceptIds": [
      "sql-descending"
    ]
  },
  {
    "id": "sql-jeepney-delivery-log-210",
    "index": 210,
    "task": "Limit the restored grouped report to the largest group.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Cubao', 'Local', 8, 'Open', 1), (2, 'Quiapo', 'Regional', 20, 'Done', 2), (3, 'Divisoria', 'Local', 2, 'Open', 1), (4, 'Marikina', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only the largest group",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT 1 to keep only the first row after sorting."
      },
      {
        "level": 2,
        "text": "The largest group is South Team with 25."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC LIMIT 1;"
    },
    "estimatedMinutes": 4,
    "projectId": "jeepney-delivery-log",
    "conceptIds": [
      "sql-limit"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: barangay-clinic-inventory-report.
sqlCourse.projects.push({"id":"barangay-clinic-inventory-report","title":"Barangay Clinic Inventory Report"});
sqlCourse.steps.push(...([
  {
    "id": "sql-barangay-clinic-inventory-report-1",
    "index": 211,
    "task": "Select the record name and group_id from the record table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows with name and group_id",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Consultation",
            1
          ],
          [
            "Vaccination",
            2
          ],
          [
            "Checkup",
            1
          ],
          [
            "Medicine",
            null
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the fields the report needs: name and group_id."
      },
      {
        "level": 2,
        "text": "Use the table name 'record' and its columns."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-inventory-report"
  },
  {
    "id": "sql-barangay-clinic-inventory-report-2",
    "index": 212,
    "task": "LEFT JOIN group_info to show every record with its group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows with name and group label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Consultation",
            "North Team"
          ],
          [
            "Vaccination",
            "South Team"
          ],
          [
            "Checkup",
            "North Team"
          ],
          [
            "Medicine",
            null
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Join the record table with group_info using LEFT JOIN."
      },
      {
        "level": 2,
        "text": "Match group_info.id with record.group_id."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-inventory-report"
  },
  {
    "id": "sql-barangay-clinic-inventory-report-3",
    "index": 213,
    "task": "Use COALESCE to display 'Unassigned' for missing group labels.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows with name and group_label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Consultation",
            "North Team"
          ],
          [
            "Vaccination",
            "South Team"
          ],
          [
            "Checkup",
            "North Team"
          ],
          [
            "Medicine",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COALESCE to substitute 'Unassigned' when group_info.label is NULL."
      },
      {
        "level": 2,
        "text": "Alias the new column as group_label."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-inventory-report"
  },
  {
    "id": "sql-barangay-clinic-inventory-report-4",
    "index": 214,
    "task": "Filter for the row whose group_id is NULL (Medicine).",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains one row with Medicine and Unassigned",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Medicine",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter for group_id IS NULL."
      },
      {
        "level": 2,
        "text": "Only Medicine matches this condition."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id WHERE record.group_id IS NULL;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-inventory-report"
  },
  {
    "id": "sql-barangay-clinic-inventory-report-5",
    "index": 215,
    "task": "Switch back to all rows and sort by the displayed group_label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id WHERE record.group_id IS NULL;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows sorted by group_label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Consultation",
            "North Team"
          ],
          [
            "Checkup",
            "North Team"
          ],
          [
            "Vaccination",
            "South Team"
          ],
          [
            "Medicine",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove the WHERE clause to show all rows."
      },
      {
        "level": 2,
        "text": "Add ORDER BY group_label ASC to sort alphabetically."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id ORDER BY group_label ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-inventory-report"
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: barangay-clinic-inventory-report.
sqlCourse.steps.push(...([
  {
    "id": "sql-barangay-clinic-inventory-report-6",
    "index": 216,
    "task": "Count every record after the LEFT JOIN.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id ORDER BY group_label ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result is a scalar count of 4",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows in the joined result."
      },
      {
        "level": 2,
        "text": "The LEFT JOIN ensures all records are counted, even if group_info is missing."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-inventory-report",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-barangay-clinic-inventory-report-7",
    "index": 217,
    "task": "Count records per displayed group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains three rows: North Team 2, South Team 1, Unassigned 1",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            2
          ],
          [
            "South Team",
            1
          ],
          [
            "Unassigned",
            1
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use GROUP BY group_label to group rows by the displayed label."
      },
      {
        "level": 2,
        "text": "Use COUNT(*) to count records in each group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, COUNT(*) AS record_count FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-inventory-report",
    "conceptIds": [
      "sql-group-by"
    ]
  },
  {
    "id": "sql-barangay-clinic-inventory-report-8",
    "index": 218,
    "task": "Sum amount per displayed group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, COUNT(*) AS record_count FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains three rows: North Team 10, South Team 20, Unassigned 5",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            20
          ],
          [
            "Unassigned",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(record.amount) to add up the amounts for each group."
      },
      {
        "level": 2,
        "text": "GROUP BY group_label ensures the sum is calculated per group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-inventory-report",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-barangay-clinic-inventory-report-9",
    "index": 219,
    "task": "Keep displayed groups whose sum exceeds 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains two rows: North Team 10 and South Team 20",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use HAVING SUM(record.amount) > 8 to filter groups with total amount over 8."
      },
      {
        "level": 2,
        "text": "HAVING applies after GROUP BY and filters the grouped results."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-inventory-report",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-barangay-clinic-inventory-report-10",
    "index": 220,
    "task": "Order those group sums descending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains two rows: South Team 20 then North Team 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            20
          ],
          [
            "North Team",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort the groups by their total amount in descending order."
      },
      {
        "level": 2,
        "text": "DESC ensures the largest sum appears first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8 ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-inventory-report",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: barangay-clinic-daily-record.
sqlCourse.projects.push({"id":"barangay-clinic-daily-record","title":"Barangay Clinic Daily Record"});
sqlCourse.steps.push(...([
  {
    "id": "sql-barangay-clinic-daily-record-221",
    "index": 221,
    "task": "Select the id, name, and amount from the record table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The initial report shows all records with id, name, and amount",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Consultation",
            8
          ],
          [
            2,
            "Vaccination",
            20
          ],
          [
            3,
            "Checkup",
            2
          ],
          [
            4,
            "Medicine",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the three fields: id, name, and amount from the record table."
      },
      {
        "level": 2,
        "text": "Run a SELECT to fetch these fields without any filters or sorting."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-daily-record",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-barangay-clinic-daily-record-222",
    "index": 222,
    "task": "Insert a new record with id 5, name 'New Record', category 'Local', amount 7, status 'Open', group_id 1, then read all rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "After insertion, all records including New Record are listed",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Consultation",
            8
          ],
          [
            2,
            "Vaccination",
            20
          ],
          [
            3,
            "Checkup",
            2
          ],
          [
            4,
            "Medicine",
            5
          ],
          [
            5,
            "New Record",
            7
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a new row using INSERT with id 5 and the given details."
      },
      {
        "level": 2,
        "text": "Then run the same SELECT to verify the new row appears."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nSELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-daily-record",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-barangay-clinic-daily-record-223",
    "index": 223,
    "task": "Update only id 5 amount to 9, then read it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nSELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "After updating id 5, its amount is now 9",
        "kind": "sql-row-contains",
        "row": [
          5,
          "New Record",
          9
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use UPDATE to change only the amount of the row with id 5."
      },
      {
        "level": 2,
        "text": "Then SELECT only that row to confirm the change."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nSELECT id, name, amount FROM record WHERE id = 5;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-daily-record",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-barangay-clinic-daily-record-224",
    "index": 224,
    "task": "Update only id 2 status to 'Open', then read id 2.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nSELECT id, name, amount FROM record WHERE id = 5;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "After updating id 2, its status is now 'Open'",
        "kind": "sql-row-contains",
        "row": [
          2,
          "Vaccination",
          "Open"
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Change the status of id 2 to 'Open' using UPDATE."
      },
      {
        "level": 2,
        "text": "Then SELECT only that row to confirm the change."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nSELECT id, name, status FROM record WHERE id = 2;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-daily-record",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-barangay-clinic-daily-record-225",
    "index": 225,
    "task": "Delete only id 4, then read remaining ids and names.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nSELECT id, name, status FROM record WHERE id = 2;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "After deleting id 4, remaining records are listed",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Consultation"
          ],
          [
            2,
            "Vaccination"
          ],
          [
            3,
            "Checkup"
          ],
          [
            5,
            "New Record"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use DELETE to remove the row with id 4."
      },
      {
        "level": 2,
        "text": "Then SELECT only id and name to confirm the deletion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nSELECT id, name FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-daily-record",
    "conceptIds": [
      "sql-delete"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: barangay-clinic-daily-record.
sqlCourse.steps.push(...([
  {
    "id": "sql-barangay-clinic-daily-record-226",
    "index": 226,
    "task": "Insert a new record with id 6, name 'Backup Record', category 'Local', amount 4, status 'Open', group_id 1, then read it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nSELECT id, name FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "After inserting id 6, the Backup Record is listed",
        "kind": "sql-row-contains",
        "row": [
          6,
          "Backup Record",
          4
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "level 1: Insert the new record with id 6, name 'Backup Record', category 'Local', amount 4, status 'Open', group_id 1."
      },
      {
        "level": 2,
        "text": "level 2: Then SELECT only id, name, and amount to confirm the insertion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nSELECT id, name, amount FROM record WHERE id = 6;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-daily-record",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-barangay-clinic-daily-record-227",
    "index": 227,
    "task": "Update only id 6 category to 'Regional', then read it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nSELECT id, name, amount FROM record WHERE id = 6;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "After updating id 6, the category is 'Regional'",
        "kind": "sql-row-contains",
        "row": [
          6,
          "Backup Record",
          "Regional",
          4
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "level 1: Update the category of id 6 to 'Regional'."
      },
      {
        "level": 2,
        "text": "level 2: Then SELECT id, name, category, and amount to confirm the update."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nSELECT id, name, category, amount FROM record WHERE id = 6;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-daily-record",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-barangay-clinic-daily-record-228",
    "index": 228,
    "task": "Delete only id 1, then read remaining rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nSELECT id, name, category, amount FROM record WHERE id = 6;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "After deleting id 1, remaining records are listed",
        "kind": "sql-rows-equal",
        "rows": [
          [
            2,
            "Vaccination",
            20
          ],
          [
            3,
            "Checkup",
            2
          ],
          [
            5,
            "New Record",
            9
          ],
          [
            6,
            "Backup Record",
            4
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "level 1: Use DELETE to remove the row with id 1."
      },
      {
        "level": 2,
        "text": "level 2: Then SELECT only id, name, and amount to confirm the deletion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-daily-record",
    "conceptIds": [
      "sql-delete"
    ]
  },
  {
    "id": "sql-barangay-clinic-daily-record-229",
    "index": 229,
    "task": "Count all remaining rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The count of remaining rows is 4",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "level 1: Use COUNT(*) to count all rows after deletion."
      },
      {
        "level": 2,
        "text": "level 2: The result should be a single scalar value."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT COUNT(*) FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-daily-record",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-barangay-clinic-daily-record-230",
    "index": 230,
    "task": "Show remaining names and amounts sorted by amount ascending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT COUNT(*) FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Names and amounts sorted by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Checkup",
            2
          ],
          [
            "Backup Record",
            4
          ],
          [
            "New Record",
            9
          ],
          [
            "Vaccination",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "level 1: Use ORDER BY amount ASC to sort the rows by amount ascending."
      },
      {
        "level": 2,
        "text": "level 2: Select only name and amount to match the expected output."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT name, amount FROM record ORDER BY amount ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-daily-record",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: barangay-clinic-service-queue.
sqlCourse.projects.push({"id":"barangay-clinic-service-queue","title":"Barangay Clinic Service Queue"});
sqlCourse.steps.push(...([
  {
    "id": "sql-barangay-clinic-service-queue-231",
    "index": 231,
    "task": "Create the report table with id and name columns.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-table-exists",
        "label": "The report table exists with id and name columns",
        "kind": "sql-table-columns",
        "table": "report",
        "columns": [
          "id",
          "name"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Create a new table named report with two columns: id and name."
      },
      {
        "level": 2,
        "text": "Use the CREATE TABLE statement to define the table structure."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT);"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-service-queue",
    "conceptIds": [
      "sql-create-table"
    ]
  },
  {
    "id": "sql-barangay-clinic-service-queue-232",
    "index": 232,
    "task": "Add the amount column to the report table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT);"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-table-columns",
        "label": "The report table has id, name, and amount columns",
        "kind": "sql-table-columns",
        "table": "report",
        "columns": [
          "id",
          "name",
          "amount"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the amount column to the report table definition."
      },
      {
        "level": 2,
        "text": "Use the CREATE TABLE statement to redefine the table with the new column."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-service-queue",
    "conceptIds": [
      "sql-create-table"
    ]
  },
  {
    "id": "sql-barangay-clinic-service-queue-233",
    "index": 233,
    "task": "Insert the row for id 1 from source_record and select from report.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "consultation-row-present",
        "label": "The report contains the Consultation row with id 1 and amount 8",
        "kind": "sql-row-contains",
        "row": [
          1,
          "Consultation",
          8
        ],
        "resultIndex": 0
      },
      {
        "id": "report-has-one-row",
        "label": "The report has exactly one row after inserting id 1",
        "kind": "sql-row-count",
        "count": 1,
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert the row from source_record where id equals 1 into the report table."
      },
      {
        "level": 2,
        "text": "Then select all columns from the report table to verify the insertion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id = 1;\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-service-queue",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-barangay-clinic-service-queue-234",
    "index": 234,
    "task": "Insert rows for id 2 and 3 from source_record and select from report.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id = 1;\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "three-rows-present",
        "label": "The report contains rows for id 1, 2, and 3",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Consultation",
            8
          ],
          [
            2,
            "Vaccination",
            20
          ],
          [
            3,
            "Checkup",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert rows from source_record where id is in (1, 2, 3) into the report table."
      },
      {
        "level": 2,
        "text": "Then select all columns from the report table to verify the insertion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-service-queue",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-barangay-clinic-service-queue-235",
    "index": 235,
    "task": "Sort the report rows by amount in ascending order.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "sorted-by-amount",
        "label": "The report rows are sorted by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            3,
            "Checkup",
            2
          ],
          [
            1,
            "Consultation",
            8
          ],
          [
            2,
            "Vaccination",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY amount ASC to the SELECT statement to sort rows by amount."
      },
      {
        "level": 2,
        "text": "Verify that the rows appear in ascending order of amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-service-queue",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: barangay-clinic-service-queue.
sqlCourse.steps.push(...([
  {
    "id": "sql-barangay-clinic-service-queue-236",
    "index": 236,
    "task": "Insert the row for id 4 from source_record and select from report.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-has-id-4",
        "label": "The report includes id 4",
        "kind": "sql-row-contains",
        "row": [
          4,
          "Medicine",
          5
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add id 4 to the WHERE clause in the INSERT statement."
      },
      {
        "level": 2,
        "text": "Verify that the row for id 4 appears in the SELECT output."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-service-queue",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-barangay-clinic-service-queue-237",
    "index": 237,
    "task": "Update the report row for id 2 amount to 18.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "id-2-amount-updated",
        "label": "The report row for id 2 has amount 18",
        "kind": "sql-value-equals",
        "row": 1,
        "column": 2,
        "value": 18,
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use UPDATE report SET amount = 18 WHERE id = 2 to change the amount."
      },
      {
        "level": 2,
        "text": "Verify that the row for id 2 now shows amount 18."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-service-queue",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-barangay-clinic-service-queue-238",
    "index": 238,
    "task": "Delete the report row for id 3.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "id-3-deleted",
        "label": "The report does not include id 3",
        "kind": "sql-row-count",
        "count": 3,
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use DELETE FROM report WHERE id = 3 to remove the row."
      },
      {
        "level": 2,
        "text": "Verify that the report now has only three rows."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-service-queue",
    "conceptIds": [
      "sql-delete"
    ]
  },
  {
    "id": "sql-barangay-clinic-service-queue-239",
    "index": 239,
    "task": "Count the number of rows in the report table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "count-is-3",
        "label": "The report has 3 rows",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 3,
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SELECT COUNT(*) FROM report to count the rows."
      },
      {
        "level": 2,
        "text": "Verify that the count is 3."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT COUNT(*) FROM report;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-service-queue",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-barangay-clinic-service-queue-240",
    "index": 240,
    "task": "Show id, name, and amount ordered by id ascending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT COUNT(*) FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "ordered-by-id",
        "label": "The report rows are sorted by id ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Consultation",
            8
          ],
          [
            2,
            "Vaccination",
            18
          ],
          [
            4,
            "Medicine",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY id ASC to the SELECT statement to sort by id."
      },
      {
        "level": 2,
        "text": "Verify that the rows appear in ascending order of id."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3, 4);\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report ORDER BY id ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "barangay-clinic-service-queue",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: barangay-clinic-supplier-list.
sqlCourse.projects.push({"id":"barangay-clinic-supplier-list","title":"Barangay Clinic Supplier List"});
sqlCourse.steps.push(...([
  {
    "id": "sql-barangay-clinic-supplier-list-241",
    "index": 241,
    "task": "Select only the supplier name from the record table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only supplier names",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Consultation"
          ],
          [
            "Vaccination"
          ],
          [
            "Checkup"
          ],
          [
            "Medicine"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose only the name column from the record table."
      },
      {
        "level": 2,
        "text": "The solution is a SELECT statement with only one field: name."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-supplier-list",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-barangay-clinic-supplier-list-242",
    "index": 242,
    "task": "Add the amount column to the report.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes supplier names and amounts",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Consultation",
            8
          ],
          [
            "Vaccination",
            20
          ],
          [
            "Checkup",
            2
          ],
          [
            "Medicine",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the amount column to the SELECT clause."
      },
      {
        "level": 2,
        "text": "The solution adds one field: amount, to the existing SELECT."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-supplier-list",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-barangay-clinic-supplier-list-243",
    "index": 243,
    "task": "Filter the report to show only suppliers with amount <= 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only suppliers with amount <= 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Consultation",
            8
          ],
          [
            "Checkup",
            2
          ],
          [
            "Medicine",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter rows where amount is less than or equal to 10."
      },
      {
        "level": 2,
        "text": "The solution adds WHERE amount <= 10 to filter the rows."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-supplier-list",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-barangay-clinic-supplier-list-244",
    "index": 244,
    "task": "Sort the filtered suppliers by amount in ascending order.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report sorts suppliers by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Checkup",
            2
          ],
          [
            "Medicine",
            5
          ],
          [
            "Consultation",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY amount ASC to sort the filtered rows by amount."
      },
      {
        "level": 2,
        "text": "The solution adds ORDER BY amount ASC to sort the rows."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-supplier-list",
    "conceptIds": [
      "sql-order-by"
    ]
  },
  {
    "id": "sql-barangay-clinic-supplier-list-245",
    "index": 245,
    "task": "Limit the sorted report to only 2 rows for a short priority list.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report limits to 2 rows for priority list",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Checkup",
            2
          ],
          [
            "Medicine",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT 2 to restrict the output to two rows."
      },
      {
        "level": 2,
        "text": "The solution adds LIMIT 2 to cap the result to two rows."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC LIMIT 2;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-supplier-list",
    "conceptIds": [
      "sql-limit"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: barangay-clinic-supplier-list.
sqlCourse.steps.push(...([
  {
    "id": "sql-barangay-clinic-supplier-list-246",
    "index": 246,
    "task": "Replace the entire prior SELECT with COUNT(*) for amount <= 10 and check the scalar value 3, not the output row count.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC LIMIT 2;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The count query returns scalar value 3",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 3
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Replace the SELECT with COUNT(*) and filter by amount <= 10."
      },
      {
        "level": 2,
        "text": "The solution is a single COUNT(*) statement filtering by amount <= 10."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-supplier-list",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-barangay-clinic-supplier-list-247",
    "index": 247,
    "task": "Alias that count as priority_count and check that exact result column heading.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The count query returns column priority_count",
        "kind": "sql-columns-equal",
        "columns": [
          "priority_count"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add AS priority_count to rename the count column."
      },
      {
        "level": 2,
        "text": "The solution adds AS priority_count to alias the count result."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) AS priority_count FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-supplier-list",
    "conceptIds": [
      "sql-alias"
    ]
  },
  {
    "id": "sql-barangay-clinic-supplier-list-248",
    "index": 248,
    "task": "Replace the entire count query with category and SUM(amount) grouped across all four rows, giving Local 10 and Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) AS priority_count FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The grouped query returns Local 10 and Regional 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Replace the COUNT with category and SUM(amount) grouped by category."
      },
      {
        "level": 2,
        "text": "The solution replaces the count query with category and SUM(amount) GROUP BY category."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-supplier-list",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-barangay-clinic-supplier-list-249",
    "index": 249,
    "task": "Keep only the Regional 25 total by using HAVING above 12.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The HAVING clause filters to Regional 25 only",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(amount) > 12 to filter groups with totals above 12."
      },
      {
        "level": 2,
        "text": "The solution adds HAVING SUM(amount) > 12 to keep only Regional 25."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-supplier-list",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-barangay-clinic-supplier-list-250",
    "index": 250,
    "task": "Lower HAVING to above 8 to restore both totals and sort them largest first so Regional 25 comes before Local 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The query returns Regional 25 then Local 10 sorted largest first",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Lower HAVING to > 8 and add ORDER BY total_amount DESC to sort largest first."
      },
      {
        "level": 2,
        "text": "The solution lowers HAVING to > 8 and adds ORDER BY total_amount DESC."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 8 ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-supplier-list",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: barangay-clinic-community-schedule.
sqlCourse.projects.push({"id":"barangay-clinic-community-schedule","title":"Barangay Clinic Community Schedule"});
sqlCourse.steps.push(...([
  {
    "id": "sql-barangay-clinic-community-schedule-251",
    "index": 251,
    "task": "Select the name and status of all records in the barangay clinic community schedule.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes Consultation, Vaccination, Checkup, and Medicine with their statuses",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Consultation",
            "Open"
          ],
          [
            "Vaccination",
            "Done"
          ],
          [
            "Checkup",
            "Open"
          ],
          [
            "Medicine",
            "Done"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the name and status columns from the record table."
      },
      {
        "level": 2,
        "text": "This is the base query to retrieve all records."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-community-schedule",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-barangay-clinic-community-schedule-252",
    "index": 252,
    "task": "Filter the records to only include those with status 'Open'.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes only Consultation and Checkup with status 'Open'",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Consultation",
            "Open"
          ],
          [
            "Checkup",
            "Open"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter by status."
      },
      {
        "level": 2,
        "text": "Use the exact string 'Open' to match the status."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open';"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-community-schedule",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-barangay-clinic-community-schedule-253",
    "index": 253,
    "task": "Filter the records to only include those with amount less than or equal to 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes Consultation, Checkup, and Medicine with amount <= 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Consultation",
            "Open"
          ],
          [
            "Checkup",
            "Open"
          ],
          [
            "Medicine",
            "Done"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the <= operator to include records with amount 8 or less."
      },
      {
        "level": 2,
        "text": "This filters by the amount column, not status."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE amount <= 8;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-community-schedule",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-barangay-clinic-community-schedule-254",
    "index": 254,
    "task": "Filter the records to only include those that are 'Open' AND have amount <= 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE amount <= 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes only Consultation and Checkup with status 'Open' and amount <= 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Consultation",
            "Open"
          ],
          [
            "Checkup",
            "Open"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Combine two conditions with AND to require both to be true."
      },
      {
        "level": 2,
        "text": "This filters by both status and amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open' AND amount <= 8;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-community-schedule",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-barangay-clinic-community-schedule-255",
    "index": 255,
    "task": "Filter the records to include those that are 'Done' OR have amount less than 3.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open' AND amount <= 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes Vaccination, Checkup, and Medicine with status 'Done' or amount < 3",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Vaccination",
            "Done"
          ],
          [
            "Checkup",
            "Open"
          ],
          [
            "Medicine",
            "Done"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the OR operator to include records that meet either condition."
      },
      {
        "level": 2,
        "text": "This filters by status 'Done' or amount less than 3."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Done' OR amount < 3;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-community-schedule",
    "conceptIds": [
      "sql-or"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: barangay-clinic-community-schedule.
sqlCourse.steps.push(...([
  {
    "id": "sql-barangay-clinic-community-schedule-256",
    "index": 256,
    "task": "Select the names of all records that begin with the letter 'C'.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Done' OR amount < 3;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes Consultation and Checkup with names starting with 'C'",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Consultation"
          ],
          [
            "Checkup"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the LIKE operator with 'C%' to match names starting with 'C'."
      },
      {
        "level": 2,
        "text": "This filters records whose names start with the letter 'C'."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name FROM record WHERE name LIKE 'C%';"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-community-schedule",
    "conceptIds": [
      "sql-like"
    ]
  },
  {
    "id": "sql-barangay-clinic-community-schedule-257",
    "index": 257,
    "task": "Select the name, category, and amount for all records with category 'Local'.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name FROM record WHERE name LIKE 'C%';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes Consultation with amount 8 and Checkup with amount 2",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Consultation",
            "Local",
            8
          ],
          [
            "Checkup",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Select the name, category, and amount columns for records where category is 'Local'."
      },
      {
        "level": 2,
        "text": "This retrieves only Local category records with their details."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local';"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-community-schedule",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-barangay-clinic-community-schedule-258",
    "index": 258,
    "task": "Include records that are 'Local' OR have amount equal to 20.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes Consultation 8, Vaccination 20, and Checkup 2",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Consultation",
            "Local",
            8
          ],
          [
            "Vaccination",
            "Regional",
            20
          ],
          [
            "Checkup",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the OR operator to include records that meet either condition: category = 'Local' or amount = 20."
      },
      {
        "level": 2,
        "text": "This filters to include Consultation, Vaccination, and Checkup."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-community-schedule",
    "conceptIds": [
      "sql-or"
    ]
  },
  {
    "id": "sql-barangay-clinic-community-schedule-259",
    "index": 259,
    "task": "Sort the filtered records by amount in descending order.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes Vaccination 20, Consultation 8, and Checkup 2 sorted by amount descending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Vaccination",
            "Regional",
            20
          ],
          [
            "Consultation",
            "Local",
            8
          ],
          [
            "Checkup",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY amount DESC to sort the rows by amount in descending order."
      },
      {
        "level": 2,
        "text": "This ensures the highest amount row appears first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-community-schedule",
    "conceptIds": [
      "sql-order-by"
    ]
  },
  {
    "id": "sql-barangay-clinic-community-schedule-260",
    "index": 260,
    "task": "Limit the sorted report to only the first two rows for a priority list.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes only Vaccination 20 and Consultation 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Vaccination",
            "Regional",
            20
          ],
          [
            "Consultation",
            "Local",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT 2 at the end to restrict output to only the first two rows."
      },
      {
        "level": 2,
        "text": "This ensures only the highest amounts are shown for priority."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC LIMIT 2;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-community-schedule",
    "conceptIds": [
      "sql-limit"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: barangay-clinic-delivery-log.
sqlCourse.projects.push({"id":"barangay-clinic-delivery-log","title":"Barangay Clinic Delivery Log"});
sqlCourse.steps.push(...([
  {
    "id": "sql-barangay-clinic-delivery-log-261",
    "index": 261,
    "task": "Count all delivery records in the clinic log.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "count-all-rows",
        "label": "The count of all rows is 4",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows in the table."
      },
      {
        "level": 2,
        "text": "The starting data has exactly four records."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-delivery-log",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-barangay-clinic-delivery-log-262",
    "index": 262,
    "task": "Name the count as record_count for clarity.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "named-count",
        "label": "The count is named record_count",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      },
      {
        "id": "alias-heading",
        "label": "The result column is named record_count",
        "kind": "sql-columns-equal",
        "columns": [
          "record_count"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add AS record_count to rename the count column."
      },
      {
        "level": 2,
        "text": "This makes the output more readable for reports."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) AS record_count FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-delivery-log",
    "conceptIds": [
      "sql-alias"
    ]
  },
  {
    "id": "sql-barangay-clinic-delivery-log-263",
    "index": 263,
    "task": "Calculate the total amount spent on all deliveries.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) AS record_count FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "total-amount",
        "label": "The total amount is 35",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 35
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(amount) to add up all the amounts."
      },
      {
        "level": 2,
        "text": "The total is 8 + 20 + 2 + 5 = 35."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT SUM(amount) AS total_amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-delivery-log",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-barangay-clinic-delivery-log-264",
    "index": 264,
    "task": "Calculate the average amount per delivery.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT SUM(amount) AS total_amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "average-amount",
        "label": "The average amount is 8.75",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 8.75
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AVG(amount) to compute the average."
      },
      {
        "level": 2,
        "text": "The average is 35 divided by 4, which equals 8.75."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT AVG(amount) AS average_amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-delivery-log",
    "conceptIds": [
      "sql-average"
    ]
  },
  {
    "id": "sql-barangay-clinic-delivery-log-265",
    "index": 265,
    "task": "Group deliveries by category and count how many of each type.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT AVG(amount) AS average_amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "grouped-by-category",
        "label": "Local has 2 records, Regional has 2 records",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            2
          ],
          [
            "Regional",
            2
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use GROUP BY category to group by category."
      },
      {
        "level": 2,
        "text": "COUNT(*) will count how many records are in each group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, COUNT(*) AS record_count FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-delivery-log",
    "conceptIds": [
      "sql-group-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: barangay-clinic-delivery-log.
sqlCourse.steps.push(...([
  {
    "id": "sql-barangay-clinic-delivery-log-266",
    "index": 266,
    "task": "Change the grouped calculation to SUM(amount) as total_amount, giving Local 10 and Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, COUNT(*) AS record_count FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "sum-by-category",
        "label": "Local has total 10, Regional has total 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(amount) to calculate the total amount per category."
      },
      {
        "level": 2,
        "text": "Replace COUNT(*) with SUM(amount) and rename the alias to total_amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-delivery-log",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-barangay-clinic-delivery-log-267",
    "index": 267,
    "task": "Sort both group totals descending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "sorted-descending",
        "label": "Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort totals from highest to lowest."
      },
      {
        "level": 2,
        "text": "The starting data has Regional 25 and Local 10, so descending order is Regional first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-delivery-log",
    "conceptIds": [
      "sql-descending"
    ]
  },
  {
    "id": "sql-barangay-clinic-delivery-log-268",
    "index": 268,
    "task": "Keep only totals above 12 with HAVING.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "filtered-having",
        "label": "Regional 25 only",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(amount) > 12 to filter groups with totals above 12."
      },
      {
        "level": 2,
        "text": "Only Regional (25) meets the condition; Local (10) is excluded."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-delivery-log",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-barangay-clinic-delivery-log-269",
    "index": 269,
    "task": "Remove HAVING to restore both complete category totals.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "restored-grouped",
        "label": "Local 10 and Regional 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove the HAVING clause to show all category totals again."
      },
      {
        "level": 2,
        "text": "The solution reverts to the original grouped query without filtering."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-delivery-log",
    "conceptIds": [
      "sql-group-by"
    ]
  },
  {
    "id": "sql-barangay-clinic-delivery-log-270",
    "index": 270,
    "task": "Order those two restored totals from largest to smallest.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Consultation', 'Local', 8, 'Open', 1), (2, 'Vaccination', 'Regional', 20, 'Done', 2), (3, 'Checkup', 'Local', 2, 'Open', 1), (4, 'Medicine', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "final-sorted",
        "label": "Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort the restored totals descending."
      },
      {
        "level": 2,
        "text": "Regional (25) comes first, then Local (10), as in the previous step."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-clinic-delivery-log",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: public-school-inventory-report.
sqlCourse.projects.push({"id":"public-school-inventory-report","title":"Public School Inventory Report"});
sqlCourse.steps.push(...([
  {
    "id": "sql-public-school-inventory-report-271",
    "index": 271,
    "task": "Read record.name and record.group_id with qualified names",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains record.name and record.group_id",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook",
            1
          ],
          [
            "Pencil",
            2
          ],
          [
            "Ruler",
            1
          ],
          [
            "Paper",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use qualified column names to specify the exact fields from the record table."
      },
      {
        "level": 2,
        "text": "The solution selects only the name and group_id columns from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-inventory-report",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-public-school-inventory-report-272",
    "index": 272,
    "task": "Join group_info on matching group ids and show record name plus group label",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains record.name and group_info.label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook",
            "North Team"
          ],
          [
            "Pencil",
            "South Team"
          ],
          [
            "Ruler",
            "North Team"
          ],
          [
            "Paper",
            "South Team"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Join the record and group_info tables using the matching group_id and id fields."
      },
      {
        "level": 2,
        "text": "The solution selects the record name and group label from the joined tables."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-inventory-report",
    "conceptIds": [
      "sql-inner-join"
    ]
  },
  {
    "id": "sql-public-school-inventory-report-273",
    "index": 273,
    "task": "Add amount to the joined result",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains record.name, group_info.label, and record.amount",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook",
            "North Team",
            8
          ],
          [
            "Pencil",
            "South Team",
            20
          ],
          [
            "Ruler",
            "North Team",
            2
          ],
          [
            "Paper",
            "South Team",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the record.amount column to the SELECT clause."
      },
      {
        "level": 2,
        "text": "The solution includes the amount for each item in the joined result."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-inventory-report",
    "conceptIds": [
      "sql-qualified-column"
    ]
  },
  {
    "id": "sql-public-school-inventory-report-274",
    "index": 274,
    "task": "Filter joined rows to amount <= 10",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains only items with amount <= 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook",
            "North Team",
            8
          ],
          [
            "Ruler",
            "North Team",
            2
          ],
          [
            "Paper",
            "South Team",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter rows where amount is less than or equal to 10."
      },
      {
        "level": 2,
        "text": "The solution removes the Pencil row because its amount (20) exceeds the limit."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-inventory-report",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-public-school-inventory-report-275",
    "index": 275,
    "task": "Sort filtered joined rows by amount ascending",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result is sorted by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Ruler",
            "North Team",
            2
          ],
          [
            "Paper",
            "South Team",
            5
          ],
          [
            "Notebook",
            "North Team",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add an ORDER BY clause to sort the filtered rows by amount in ascending order."
      },
      {
        "level": 2,
        "text": "The solution sorts the rows so that the smallest amount (2) comes first, followed by 5 and 8."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10 ORDER BY record.amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-inventory-report",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: public-school-inventory-report.
sqlCourse.steps.push(...([
  {
    "id": "sql-public-school-inventory-report-276",
    "index": 276,
    "task": "Count records for each group label",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10 ORDER BY record.amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result shows count for each group label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            2
          ],
          [
            "South Team",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count how many records belong to each group."
      },
      {
        "level": 2,
        "text": "Group the results by group_info.label to get one row per group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, COUNT(*) AS record_count FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-inventory-report",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-public-school-inventory-report-277",
    "index": 277,
    "task": "Sum amount for each group label",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, COUNT(*) AS record_count FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result shows total amount for each group label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(record.amount) to add up the amounts for each group."
      },
      {
        "level": 2,
        "text": "Group the results by group_info.label to get one row per group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-inventory-report",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-public-school-inventory-report-278",
    "index": 278,
    "task": "Keep only group sums above 12 with HAVING",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result shows only groups with total amount above 12",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(record.amount) > 12 to filter groups with total amount above 12."
      },
      {
        "level": 2,
        "text": "Only South Team (25) meets the condition, so only one row remains."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label HAVING SUM(record.amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-inventory-report",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-public-school-inventory-report-279",
    "index": 279,
    "task": "Remove HAVING to restore both groups and sort their sums descending",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label HAVING SUM(record.amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result shows both groups sorted by total amount descending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ],
          [
            "North Team",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove HAVING to restore all groups."
      },
      {
        "level": 2,
        "text": "Add ORDER BY total_amount DESC to sort the groups by total amount from largest to smallest."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-inventory-report",
    "conceptIds": [
      "sql-descending"
    ]
  },
  {
    "id": "sql-public-school-inventory-report-280",
    "index": 280,
    "task": "Limit the restored grouped report to the largest group",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result shows only the largest group",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT 1 to keep only the top row after sorting."
      },
      {
        "level": 2,
        "text": "The largest group is South Team with total amount 25."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC LIMIT 1;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-inventory-report",
    "conceptIds": [
      "sql-limit"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: public-school-daily-record.
sqlCourse.projects.push({"id":"public-school-daily-record","title":"Public School Daily Record"});
sqlCourse.steps.push(...([
  {
    "id": "sql-public-school-daily-record-281",
    "index": 281,
    "task": "Select the record name and group_id for all items.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows with name and group_id",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook",
            1
          ],
          [
            "Pencil",
            2
          ],
          [
            "Ruler",
            1
          ],
          [
            "Paper",
            null
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the name and group_id columns from the record table."
      },
      {
        "level": 2,
        "text": "Use SELECT to fetch these two fields."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-daily-record",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-public-school-daily-record-282",
    "index": 282,
    "task": "LEFT JOIN group_info to show every record with its group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows with name and group label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook",
            "North Team"
          ],
          [
            "Pencil",
            "South Team"
          ],
          [
            "Ruler",
            "North Team"
          ],
          [
            "Paper",
            null
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Join record with group_info using LEFT JOIN."
      },
      {
        "level": 2,
        "text": "Match group_info.id with record.group_id."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 5,
    "projectId": "public-school-daily-record",
    "conceptIds": [
      "sql-left-join"
    ]
  },
  {
    "id": "sql-public-school-daily-record-283",
    "index": 283,
    "task": "Use COALESCE to display 'Unassigned' for missing group labels.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows with name and group_label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook",
            "North Team"
          ],
          [
            "Pencil",
            "South Team"
          ],
          [
            "Ruler",
            "North Team"
          ],
          [
            "Paper",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COALESCE to substitute 'Unassigned' for NULL labels."
      },
      {
        "level": 2,
        "text": "Alias the result as group_label."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 5,
    "projectId": "public-school-daily-record",
    "conceptIds": [
      "sql-coalesce"
    ]
  },
  {
    "id": "sql-public-school-daily-record-284",
    "index": 284,
    "task": "Filter for the row whose group_id is NULL.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains one row with name and group_label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Paper",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter for group_id IS NULL."
      },
      {
        "level": 2,
        "text": "Only Paper matches this condition."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id WHERE record.group_id IS NULL;"
    },
    "estimatedMinutes": 5,
    "projectId": "public-school-daily-record",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-public-school-daily-record-285",
    "index": 285,
    "task": "Switch back to all rows and sort by the displayed group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id WHERE record.group_id IS NULL;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows sorted by group_label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook",
            "North Team"
          ],
          [
            "Ruler",
            "North Team"
          ],
          [
            "Pencil",
            "South Team"
          ],
          [
            "Paper",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove the WHERE clause to return all rows."
      },
      {
        "level": 2,
        "text": "Add ORDER BY group_label ASC to sort them."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id ORDER BY group_label ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "public-school-daily-record",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: public-school-daily-record.
sqlCourse.steps.push(...([
  {
    "id": "sql-public-school-daily-record-286",
    "index": 286,
    "task": "Count every record after the LEFT JOIN.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id ORDER BY group_label ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result is a scalar count of 4",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows returned by the LEFT JOIN."
      },
      {
        "level": 2,
        "text": "The solution is a single SELECT with no FROM clause needed beyond the JOIN."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-daily-record",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-public-school-daily-record-287",
    "index": 287,
    "task": "Count records per displayed group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains three rows: North Team 2, South Team 1, Unassigned 1",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            2
          ],
          [
            "South Team",
            1
          ],
          [
            "Unassigned",
            1
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Group by the displayed group_label using GROUP BY."
      },
      {
        "level": 2,
        "text": "Use COUNT(*) to count records per group, and alias the label with COALESCE."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, COUNT(*) AS record_count FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "estimatedMinutes": 5,
    "projectId": "public-school-daily-record",
    "conceptIds": [
      "sql-group-by"
    ]
  },
  {
    "id": "sql-public-school-daily-record-288",
    "index": 288,
    "task": "Sum amount per displayed group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, COUNT(*) AS record_count FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains three rows: North Team 10, South Team 20, Unassigned 5",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            20
          ],
          [
            "Unassigned",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(record.amount) to calculate total amount per group."
      },
      {
        "level": 2,
        "text": "Group by the displayed group_label and alias the sum as total_amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "estimatedMinutes": 5,
    "projectId": "public-school-daily-record",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-public-school-daily-record-289",
    "index": 289,
    "task": "Keep displayed groups whose sum exceeds 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains two rows: North Team 10 and South Team 20",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(record.amount) > 8 to filter groups with total amount over 8."
      },
      {
        "level": 2,
        "text": "This removes the Unassigned group with total 5."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8;"
    },
    "estimatedMinutes": 5,
    "projectId": "public-school-daily-record",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-public-school-daily-record-290",
    "index": 290,
    "task": "Order those group sums descending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains two rows: South Team 20 then North Team 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            20
          ],
          [
            "North Team",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort the groups by their sum in descending order."
      },
      {
        "level": 2,
        "text": "This places South Team (20) before North Team (10)."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8 ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 5,
    "projectId": "public-school-daily-record",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: public-school-service-queue.
sqlCourse.projects.push({"id":"public-school-service-queue","title":"Public School Service Queue"});
sqlCourse.steps.push(...([
  {
    "id": "sql-public-school-service-queue-291",
    "index": 291,
    "task": "Select id, name, and amount from the record table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The initial report shows four rows with id, name, and amount",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Notebook",
            8
          ],
          [
            2,
            "Pencil",
            20
          ],
          [
            3,
            "Ruler",
            2
          ],
          [
            4,
            "Paper",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the three fields: id, name, and amount from the record table."
      },
      {
        "level": 2,
        "text": "Use SELECT to fetch these fields from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-service-queue",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-public-school-service-queue-292",
    "index": 292,
    "task": "Insert a new record with id 5, name 'New Record', category 'Local', amount 7, status 'Open', group_id 1, then read all rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report now includes New Record with id 5 and amount 7",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Notebook",
            8
          ],
          [
            2,
            "Pencil",
            20
          ],
          [
            3,
            "Ruler",
            2
          ],
          [
            4,
            "Paper",
            5
          ],
          [
            5,
            "New Record",
            7
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert the new record using INSERT INTO with id 5 and the given values."
      },
      {
        "level": 2,
        "text": "Then select all id, name, and amount to verify the new row."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nSELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "public-school-service-queue",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-public-school-service-queue-293",
    "index": 293,
    "task": "Update only id 5 amount to 9, then read it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nSELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows New Record with updated amount 9",
        "kind": "sql-row-contains",
        "row": [
          5,
          "New Record",
          9
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Update the amount for id 5 using SET amount = 9 WHERE id = 5."
      },
      {
        "level": 2,
        "text": "Then select only id 5 to verify the change."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nSELECT id, name, amount FROM record WHERE id = 5;"
    },
    "estimatedMinutes": 5,
    "projectId": "public-school-service-queue",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-public-school-service-queue-294",
    "index": 294,
    "task": "Update only id 2 status to 'Open', then read id 2.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nSELECT id, name, amount FROM record WHERE id = 5;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows Pencil with status 'Open'",
        "kind": "sql-row-contains",
        "row": [
          2,
          "Pencil",
          "Open"
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Update the status for id 2 using SET status = 'Open' WHERE id = 2."
      },
      {
        "level": 2,
        "text": "Then select only id 2 to verify the change."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nSELECT id, name, status FROM record WHERE id = 2;"
    },
    "estimatedMinutes": 5,
    "projectId": "public-school-service-queue",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-public-school-service-queue-295",
    "index": 295,
    "task": "Delete only id 4, then read remaining ids and names.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nSELECT id, name, status FROM record WHERE id = 2;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows remaining records with ids 1, 2, 3, 5",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Notebook"
          ],
          [
            2,
            "Pencil"
          ],
          [
            3,
            "Ruler"
          ],
          [
            5,
            "New Record"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Delete id 4 using DELETE FROM record WHERE id = 4."
      },
      {
        "level": 2,
        "text": "Then select id and name to verify the deletion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nSELECT id, name FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "public-school-service-queue",
    "conceptIds": [
      "sql-delete"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: public-school-service-queue.
sqlCourse.steps.push(...([
  {
    "id": "sql-public-school-service-queue-296",
    "index": 296,
    "task": "Insert a new record with id 6, name 'Backup Record', category 'Local', amount 4, status 'Open', group_id 1, then read it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nSELECT id, name FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows the new record with id 6, name Backup Record, amount 4",
        "kind": "sql-row-contains",
        "row": [
          6,
          "Backup Record",
          4
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert the new record using INSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);"
      },
      {
        "level": 2,
        "text": "Then select id, name, and amount for id 6 to verify."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nSELECT id, name, amount FROM record WHERE id = 6;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-service-queue",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-public-school-service-queue-297",
    "index": 297,
    "task": "Update only id 6 category to 'Regional', then read it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nSELECT id, name, amount FROM record WHERE id = 6;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows the updated record with category 'Regional'",
        "kind": "sql-row-contains",
        "row": [
          6,
          "Backup Record",
          "Regional",
          4
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Update the category using UPDATE record SET category = 'Regional' WHERE id = 6;"
      },
      {
        "level": 2,
        "text": "Then select id, name, category, and amount for id 6 to verify."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nSELECT id, name, category, amount FROM record WHERE id = 6;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-service-queue",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-public-school-service-queue-298",
    "index": 298,
    "task": "Delete only id 1, then read remaining rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nSELECT id, name, category, amount FROM record WHERE id = 6;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows remaining records with ids 2, 3, 5, 6",
        "kind": "sql-rows-equal",
        "rows": [
          [
            2,
            "Pencil",
            20
          ],
          [
            3,
            "Ruler",
            2
          ],
          [
            5,
            "New Record",
            9
          ],
          [
            6,
            "Backup Record",
            4
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Delete id 1 using DELETE FROM record WHERE id = 1;"
      },
      {
        "level": 2,
        "text": "Then select id, name, and amount to verify the deletion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-service-queue",
    "conceptIds": [
      "sql-delete"
    ]
  },
  {
    "id": "sql-public-school-service-queue-299",
    "index": 299,
    "task": "Count every record after the DELETE.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The count is 4",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4,
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows after deletion;"
      },
      {
        "level": 2,
        "text": "The result should be 4."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT COUNT(*) FROM record;"
    },
    "estimatedMinutes": 3,
    "projectId": "public-school-service-queue",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-public-school-service-queue-300",
    "index": 300,
    "task": "Show remaining names and amounts sorted by amount ascending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT COUNT(*) FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows names and amounts sorted by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Ruler",
            2
          ],
          [
            "Backup Record",
            4
          ],
          [
            "New Record",
            9
          ],
          [
            "Pencil",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Select name and amount using SELECT name, amount FROM record;"
      },
      {
        "level": 2,
        "text": "Then sort by amount ascending using ORDER BY amount ASC;"
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT name, amount FROM record ORDER BY amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-service-queue",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: public-school-supplier-list.
sqlCourse.projects.push({"id":"public-school-supplier-list","title":"Public School Supplier List"});
sqlCourse.steps.push(...([
  {
    "id": "sql-public-school-supplier-list-301",
    "index": 301,
    "task": "Create a report table with id and name columns.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-table-exists",
        "label": "The report table exists with id and name columns",
        "kind": "sql-table-columns",
        "table": "report",
        "columns": [
          "id",
          "name"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Create a new table named 'report' with columns 'id' and 'name'."
      },
      {
        "level": 2,
        "text": "Use the exact CREATE TABLE syntax from the seed."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT);"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-supplier-list",
    "conceptIds": [
      "sql-create-table"
    ]
  },
  {
    "id": "sql-public-school-supplier-list-302",
    "index": 302,
    "task": "Add the amount column to the report table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT);"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-table-columns",
        "label": "The report table now has id, name, and amount columns",
        "kind": "sql-table-columns",
        "table": "report",
        "columns": [
          "id",
          "name",
          "amount"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the column 'amount' of type INTEGER to the report table."
      },
      {
        "level": 2,
        "text": "Use the exact CREATE TABLE syntax from the seed."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-supplier-list",
    "conceptIds": [
      "sql-create-table"
    ]
  },
  {
    "id": "sql-public-school-supplier-list-303",
    "index": 303,
    "task": "Insert the row for id 1 from source_record into report and select it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "row-1-inserted",
        "label": "The row for id 1 is inserted and visible",
        "kind": "sql-row-contains",
        "row": [
          1,
          "Notebook",
          8
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert the row from source_record where id = 1 into report."
      },
      {
        "level": 2,
        "text": "Then select all rows from report to verify the insertion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id = 1;\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 6,
    "projectId": "public-school-supplier-list",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-public-school-supplier-list-304",
    "index": 304,
    "task": "Insert rows for ids 2 and 3 from source_record into report and select them.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id = 1;\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "rows-1-2-3-inserted",
        "label": "Rows for ids 1, 2, and 3 are inserted and visible",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Notebook",
            8
          ],
          [
            2,
            "Pencil",
            20
          ],
          [
            3,
            "Ruler",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert rows from source_record where id is in (1, 2, 3) into report."
      },
      {
        "level": 2,
        "text": "Then select all rows from report to verify the insertion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 6,
    "projectId": "public-school-supplier-list",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-public-school-supplier-list-305",
    "index": 305,
    "task": "Sort the report rows by amount in ascending order.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "rows-sorted-by-amount",
        "label": "Rows are sorted by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            3,
            "Ruler",
            2
          ],
          [
            1,
            "Notebook",
            8
          ],
          [
            2,
            "Pencil",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY amount ASC to the SELECT statement."
      },
      {
        "level": 2,
        "text": "The rows should appear in order: Ruler (2), Notebook (8), Pencil (20)."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "estimatedMinutes": 6,
    "projectId": "public-school-supplier-list",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: public-school-supplier-list.
sqlCourse.steps.push(...([
  {
    "id": "sql-public-school-supplier-list-306",
    "index": 306,
    "task": "Insert the row for id 4 from source_record into report and select it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "rows-after-insert-id4",
        "label": "Rows include id 4 Paper with amount 5",
        "kind": "sql-rows-equal",
        "rows": [
          [
            3,
            "Ruler",
            2
          ],
          [
            4,
            "Paper",
            5
          ],
          [
            1,
            "Notebook",
            8
          ],
          [
            2,
            "Pencil",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add id 4 to the WHERE clause in the INSERT."
      },
      {
        "level": 2,
        "text": "The SELECT should return all four rows in their original order."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "public-school-supplier-list",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-public-school-supplier-list-307",
    "index": 307,
    "task": "Update only id 2 amount to 18, then select it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "id2-updated-to-18",
        "label": "Row id 2 amount is now 18",
        "kind": "sql-row-contains",
        "row": [
          2,
          "Pencil",
          18
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use UPDATE report SET amount = 18 WHERE id = 2;"
      },
      {
        "level": 2,
        "text": "The SELECT should return all rows, including id 2 with amount 18."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "public-school-supplier-list",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-public-school-supplier-list-308",
    "index": 308,
    "task": "Delete only id 3, then select remaining rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "id3-deleted",
        "label": "Row id 3 is gone",
        "kind": "sql-row-count",
        "count": 3,
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add DELETE FROM report WHERE id = 3;"
      },
      {
        "level": 2,
        "text": "The SELECT should return three rows: id 1, 2, and 4."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "public-school-supplier-list",
    "conceptIds": [
      "sql-delete"
    ]
  },
  {
    "id": "sql-public-school-supplier-list-309",
    "index": 309,
    "task": "Count every record after the DELETE.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "count-after-delete",
        "label": "Count is 3",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 3,
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SELECT COUNT(*) FROM report;"
      },
      {
        "level": 2,
        "text": "The result should be the scalar 3."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT COUNT(*) FROM report;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-supplier-list",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-public-school-supplier-list-310",
    "index": 310,
    "task": "Show id, name, and amount ordered by id ascending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT COUNT(*) FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "rows-sorted-by-id",
        "label": "Rows are sorted by id ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Notebook",
            8
          ],
          [
            2,
            "Pencil",
            18
          ],
          [
            4,
            "Paper",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY id ASC to the SELECT statement."
      },
      {
        "level": 2,
        "text": "The rows should appear in order: Notebook (1), Pencil (2), Paper (4)."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report ORDER BY id ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "public-school-supplier-list",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: public-school-community-schedule.
sqlCourse.projects.push({"id":"public-school-community-schedule","title":"Public School Community Schedule"});
sqlCourse.steps.push(...([
  {
    "id": "sql-public-school-community-schedule-311",
    "index": 311,
    "task": "Select only the name of each item from the record table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only the names of items",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook"
          ],
          [
            "Pencil"
          ],
          [
            "Ruler"
          ],
          [
            "Paper"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the field the report needs: name."
      },
      {
        "level": 2,
        "text": "Read the names from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-community-schedule",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-public-school-community-schedule-312",
    "index": 312,
    "task": "Add the amount column to the report.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows names and amounts",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook",
            8
          ],
          [
            "Pencil",
            20
          ],
          [
            "Ruler",
            2
          ],
          [
            "Paper",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the amount field to the SELECT list."
      },
      {
        "level": 2,
        "text": "The solution adds one more column: amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-community-schedule",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-public-school-community-schedule-313",
    "index": 313,
    "task": "Filter the report to show only items with amount less than or equal to 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only items with amount <= 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook",
            8
          ],
          [
            "Ruler",
            2
          ],
          [
            "Paper",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter by amount."
      },
      {
        "level": 2,
        "text": "Use <= to include items with amount 10 or less."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-community-schedule",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-public-school-community-schedule-314",
    "index": 314,
    "task": "Sort the filtered items by amount in ascending order.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows filtered items sorted by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Ruler",
            2
          ],
          [
            "Paper",
            5
          ],
          [
            "Notebook",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY to sort by amount."
      },
      {
        "level": 2,
        "text": "Use ASC for ascending order."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-community-schedule",
    "conceptIds": [
      "sql-order-by"
    ]
  },
  {
    "id": "sql-public-school-community-schedule-315",
    "index": 315,
    "task": "Limit the sorted report to only two rows for a short priority list.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only two items with lowest amounts",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Ruler",
            2
          ],
          [
            "Paper",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT to restrict output to two rows."
      },
      {
        "level": 2,
        "text": "The solution limits to the two lowest amounts: Ruler and Paper."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC LIMIT 2;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-community-schedule",
    "conceptIds": [
      "sql-limit"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: public-school-community-schedule.
sqlCourse.steps.push(...([
  {
    "id": "sql-public-school-community-schedule-316",
    "index": 316,
    "task": "Replace the entire prior SELECT with COUNT(*) for amount <= 10 and check the scalar value 3, not the output row count.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC LIMIT 2;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The count is 3 for items with amount <= 10",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 3
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count matching rows, not to list them."
      },
      {
        "level": 2,
        "text": "The solution counts only Ruler, Paper, and Notebook: three rows."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-community-schedule",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-public-school-community-schedule-317",
    "index": 317,
    "task": "Alias that count as priority_count and check that exact result column heading.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The column heading is exactly priority_count",
        "kind": "sql-columns-equal",
        "columns": [
          "priority_count"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add AS priority_count to rename the count column."
      },
      {
        "level": 2,
        "text": "The solution returns one column named priority_count."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) AS priority_count FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-community-schedule",
    "conceptIds": [
      "sql-alias"
    ]
  },
  {
    "id": "sql-public-school-community-schedule-318",
    "index": 318,
    "task": "Replace the entire count query with category and SUM(amount) grouped across all four rows, giving Local 10 and Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) AS priority_count FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Local 10 and Regional 25 grouped by category",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Group by category and sum the amounts for each group."
      },
      {
        "level": 2,
        "text": "The solution returns Local 10 (Notebook 8 + Ruler 2) and Regional 25 (Pencil 20 + Paper 5)."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-community-schedule",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-public-school-community-schedule-319",
    "index": 319,
    "task": "Keep only the Regional 25 total by using HAVING above 12.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Only Regional 25 remains after filtering by HAVING",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(amount) > 12 to filter groups by total amount."
      },
      {
        "level": 2,
        "text": "The solution keeps only Regional 25, since Local 10 is less than 12."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-community-schedule",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-public-school-community-schedule-320",
    "index": 320,
    "task": "Lower HAVING to above 8 to restore both totals and sort them largest first so Regional 25 comes before Local 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Regional 25 then Local 10 sorted largest first",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Lower HAVING to > 8 to include both groups."
      },
      {
        "level": 2,
        "text": "Add ORDER BY total_amount DESC to sort largest first: Regional 25 before Local 10."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 8 ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-community-schedule",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: public-school-delivery-log.
sqlCourse.projects.push({"id":"public-school-delivery-log","title":"Public School Delivery Log"});
sqlCourse.steps.push(...([
  {
    "id": "sql-public-school-delivery-log-321",
    "index": 321,
    "task": "Select the name and status of all items in the delivery log.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains the name and status of all items",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook",
            "Open"
          ],
          [
            "Pencil",
            "Done"
          ],
          [
            "Ruler",
            "Open"
          ],
          [
            "Paper",
            "Done"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the fields the requested report needs: name and status."
      },
      {
        "level": 2,
        "text": "Read the named fields from the example data."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-delivery-log",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-public-school-delivery-log-322",
    "index": 322,
    "task": "Filter to keep only items with status 'Open'.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains only items with status 'Open'",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook",
            "Open"
          ],
          [
            "Ruler",
            "Open"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use WHERE to filter rows based on status."
      },
      {
        "level": 2,
        "text": "Only include rows where status equals 'Open'."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open';"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-delivery-log",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-public-school-delivery-log-323",
    "index": 323,
    "task": "Filter to keep only items with amount less than or equal to 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains only items with amount <= 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook",
            "Open"
          ],
          [
            "Ruler",
            "Open"
          ],
          [
            "Paper",
            "Done"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use WHERE to filter rows based on amount."
      },
      {
        "level": 2,
        "text": "Only include rows where amount is less than or equal to 8."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE amount <= 8;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-delivery-log",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-public-school-delivery-log-324",
    "index": 324,
    "task": "Filter to keep only items that are 'Open' AND have amount <= 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE amount <= 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains only items that are 'Open' AND amount <= 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook",
            "Open"
          ],
          [
            "Ruler",
            "Open"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AND to combine two conditions."
      },
      {
        "level": 2,
        "text": "Only include rows where status is 'Open' AND amount is <= 8."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open' AND amount <= 8;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-delivery-log",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-public-school-delivery-log-325",
    "index": 325,
    "task": "Filter to keep only items that are 'Done' OR have amount < 3.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open' AND amount <= 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains only items that are 'Done' OR amount < 3",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pencil",
            "Done"
          ],
          [
            "Ruler",
            "Open"
          ],
          [
            "Paper",
            "Done"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use OR to combine two conditions."
      },
      {
        "level": 2,
        "text": "Only include rows where status is 'Done' OR amount is less than 3."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Done' OR amount < 3;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-delivery-log",
    "conceptIds": [
      "sql-or"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: public-school-delivery-log.
sqlCourse.steps.push(...([
  {
    "id": "sql-public-school-delivery-log-326",
    "index": 326,
    "task": "Select the name and status of all items in the delivery log.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Done' OR amount < 3;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains the name and status of all items",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the fields the requested report needs: name and status."
      },
      {
        "level": 2,
        "text": "Read the named fields from the example data."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name FROM record WHERE name LIKE 'N%';"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-delivery-log",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-public-school-delivery-log-327",
    "index": 327,
    "task": "Filter to keep only items with status 'Open'.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name FROM record WHERE name LIKE 'N%';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains only items with status 'Open'",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook",
            "Local",
            8
          ],
          [
            "Ruler",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the WHERE clause to filter rows based on status."
      },
      {
        "level": 2,
        "text": "Only include rows where status is 'Open'."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local';"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-delivery-log",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-public-school-delivery-log-328",
    "index": 328,
    "task": "Filter to keep only items with amount less than or equal to 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains only items with amount <= 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Notebook",
            "Local",
            8
          ],
          [
            "Pencil",
            "Regional",
            20
          ],
          [
            "Ruler",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the WHERE clause to filter rows based on amount."
      },
      {
        "level": 2,
        "text": "Only include rows where amount is less than or equal to 8."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-delivery-log",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-public-school-delivery-log-329",
    "index": 329,
    "task": "Filter to keep only items that are 'Open' AND have amount <= 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains only items that are 'Open' AND amount <= 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pencil",
            "Regional",
            20
          ],
          [
            "Notebook",
            "Local",
            8
          ],
          [
            "Ruler",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AND to combine two conditions."
      },
      {
        "level": 2,
        "text": "Only include rows where status is 'Open' AND amount is less than or equal to 8."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-delivery-log",
    "conceptIds": [
      "sql-or"
    ]
  },
  {
    "id": "sql-public-school-delivery-log-330",
    "index": 330,
    "task": "Filter to keep only items that are 'Done' OR have amount < 3.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Notebook', 'Local', 8, 'Open', 1), (2, 'Pencil', 'Regional', 20, 'Done', 2), (3, 'Ruler', 'Local', 2, 'Open', 1), (4, 'Paper', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains only items that are 'Done' OR amount < 3",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pencil",
            "Regional",
            20
          ],
          [
            "Notebook",
            "Local",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use OR to combine two conditions."
      },
      {
        "level": 2,
        "text": "Only include rows where status is 'Done' OR amount is less than 3."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC LIMIT 2;"
    },
    "estimatedMinutes": 4,
    "projectId": "public-school-delivery-log",
    "conceptIds": [
      "sql-or"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: cooperative-inventory-report.
sqlCourse.projects.push({"id":"cooperative-inventory-report","title":"Community Cooperative Inventory Report"});
sqlCourse.steps.push(...([
  {
    "id": "sql-cooperative-inventory-report-331",
    "index": 331,
    "task": "Count all inventory records in the cooperative.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "count-all-rows",
        "label": "The count of all inventory records is 4",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows in the record table."
      },
      {
        "level": 2,
        "text": "The starting data has exactly four rows."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-inventory-report",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-cooperative-inventory-report-332",
    "index": 332,
    "task": "Name the count as record_count for clarity in reports.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "named-count",
        "label": "The count is named record_count",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      },
      {
        "id": "alias-heading",
        "label": "The result column is named record_count",
        "kind": "sql-columns-equal",
        "columns": [
          "record_count"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AS to rename the COUNT(*) result as record_count."
      },
      {
        "level": 2,
        "text": "This makes the output more readable in reports."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) AS record_count FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-inventory-report",
    "conceptIds": [
      "sql-alias"
    ]
  },
  {
    "id": "sql-cooperative-inventory-report-333",
    "index": 333,
    "task": "Calculate the total amount of all inventory items.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) AS record_count FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "total-amount",
        "label": "The total amount is 35",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 35
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(amount) to add up all the amounts."
      },
      {
        "level": 2,
        "text": "The expected total is 8 + 20 + 2 + 5 = 35."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT SUM(amount) AS total_amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-inventory-report",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-cooperative-inventory-report-334",
    "index": 334,
    "task": "Calculate the average amount of all inventory items.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT SUM(amount) AS total_amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "average-amount",
        "label": "The average amount is 8.75",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 8.75
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AVG(amount) to compute the average of all amounts."
      },
      {
        "level": 2,
        "text": "The average is 35 divided by 4, which equals 8.75."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT AVG(amount) AS average_amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-inventory-report",
    "conceptIds": [
      "sql-average"
    ]
  },
  {
    "id": "sql-cooperative-inventory-report-335",
    "index": 335,
    "task": "Group records by category and count how many are in each category.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT AVG(amount) AS average_amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "grouped-by-category",
        "label": "Local has 2 records and Regional has 2 records",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            2
          ],
          [
            "Regional",
            2
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use GROUP BY category to group records by their category."
      },
      {
        "level": 2,
        "text": "Use COUNT(*) to count how many records are in each group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, COUNT(*) AS record_count FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-inventory-report",
    "conceptIds": [
      "sql-group-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: cooperative-inventory-report.
sqlCourse.steps.push(...([
  {
    "id": "sql-cooperative-inventory-report-336",
    "index": 336,
    "task": "Change the grouped calculation to SUM(amount) as total_amount, giving Local 10 and Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, COUNT(*) AS record_count FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "sum-by-category",
        "label": "Local has total_amount 10 and Regional has total_amount 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(amount) to calculate the total amount for each category."
      },
      {
        "level": 2,
        "text": "Replace COUNT(*) with SUM(amount) and alias it as total_amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-inventory-report",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-cooperative-inventory-report-337",
    "index": 337,
    "task": "Sort both group totals descending, so Regional 25 then Local 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "sorted-descending",
        "label": "Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort the totals from highest to lowest."
      },
      {
        "level": 2,
        "text": "The current order is Local then Regional; reversing it requires DESC."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-inventory-report",
    "conceptIds": [
      "sql-descending"
    ]
  },
  {
    "id": "sql-cooperative-inventory-report-338",
    "index": 338,
    "task": "Keep only totals above 12 with HAVING, so Regional 25 only.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "filtered-having",
        "label": "Regional 25 only",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(amount) > 12 to filter out categories with total amount <= 12."
      },
      {
        "level": 2,
        "text": "Only Regional (25) meets the condition; Local (10) is excluded."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-inventory-report",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-cooperative-inventory-report-339",
    "index": 339,
    "task": "Remove HAVING to restore both complete category totals, Local 10 and Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "restored-grouped",
        "label": "Local 10 and Regional 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove the HAVING clause to restore all grouped totals."
      },
      {
        "level": 2,
        "text": "The query should return both Local and Regional totals again."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-inventory-report",
    "conceptIds": [
      "sql-group-by"
    ]
  },
  {
    "id": "sql-cooperative-inventory-report-340",
    "index": 340,
    "task": "Order those two restored totals from largest to smallest, so Regional 25 then Local 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "final-sorted",
        "label": "Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort the totals from highest to lowest."
      },
      {
        "level": 2,
        "text": "This is the same as step 337; the order is Regional then Local."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-inventory-report",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: cooperative-daily-record.
sqlCourse.projects.push({"id":"cooperative-daily-record","title":"Community Cooperative Daily Record"});
sqlCourse.steps.push(...([
  {
    "id": "sql-cooperative-daily-record-341",
    "index": 341,
    "task": "Read record.name and record.group_id with qualified names",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows record.name and record.group_id",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice Loan",
            1
          ],
          [
            "Seed Fund",
            2
          ],
          [
            "Tool Share",
            1
          ],
          [
            "Market Stall",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use qualified column names to specify the table for each field."
      },
      {
        "level": 2,
        "text": "Select only the name and group_id columns from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-daily-record",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-cooperative-daily-record-342",
    "index": 342,
    "task": "Join group_info on matching group ids and show record name plus group label",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows record name and group label after joining",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice Loan",
            "North Team"
          ],
          [
            "Seed Fund",
            "South Team"
          ],
          [
            "Tool Share",
            "North Team"
          ],
          [
            "Market Stall",
            "South Team"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use INNER JOIN to combine record and group_info tables on matching group_id and id."
      },
      {
        "level": 2,
        "text": "Select the record name and group_info label after joining."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-daily-record",
    "conceptIds": [
      "sql-inner-join"
    ]
  },
  {
    "id": "sql-cooperative-daily-record-343",
    "index": 343,
    "task": "Add record.amount to the joined report",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes record.amount after joining",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice Loan",
            "North Team",
            8
          ],
          [
            "Seed Fund",
            "South Team",
            20
          ],
          [
            "Tool Share",
            "North Team",
            2
          ],
          [
            "Market Stall",
            "South Team",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the amount column from the record table to the SELECT list."
      },
      {
        "level": 2,
        "text": "The join condition remains unchanged."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-daily-record",
    "conceptIds": [
      "sql-qualified-column"
    ]
  },
  {
    "id": "sql-cooperative-daily-record-344",
    "index": 344,
    "task": "Filter joined rows to amount <= 10",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report filters rows to amount <= 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice Loan",
            "North Team",
            8
          ],
          [
            "Tool Share",
            "North Team",
            2
          ],
          [
            "Market Stall",
            "South Team",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter rows where amount is less than or equal to 10."
      },
      {
        "level": 2,
        "text": "The join and SELECT clauses remain unchanged."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-daily-record",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-cooperative-daily-record-345",
    "index": 345,
    "task": "Sort filtered joined rows by amount ascending",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report sorts filtered rows by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tool Share",
            "North Team",
            2
          ],
          [
            "Market Stall",
            "South Team",
            5
          ],
          [
            "Rice Loan",
            "North Team",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY record.amount ASC to sort the filtered rows by amount in ascending order."
      },
      {
        "level": 2,
        "text": "The WHERE clause and JOIN remain unchanged."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10 ORDER BY record.amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-daily-record",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: cooperative-daily-record.
sqlCourse.steps.push(...([
  {
    "id": "sql-cooperative-daily-record-346",
    "index": 346,
    "task": "Count records for each group label",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10 ORDER BY record.amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report counts records for each group label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            2
          ],
          [
            "South Team",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count the number of records per group."
      },
      {
        "level": 2,
        "text": "Group by group_info.label to get counts per group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, COUNT(*) AS record_count FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-daily-record",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-cooperative-daily-record-347",
    "index": 347,
    "task": "Sum amount for each group label",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, COUNT(*) AS record_count FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report sums amount for each group label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(record.amount) to calculate total amount per group."
      },
      {
        "level": 2,
        "text": "Group by group_info.label to get totals per group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-daily-record",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-cooperative-daily-record-348",
    "index": 348,
    "task": "Keep only group sums above 12 with HAVING",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report keeps only group sums above 12",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(record.amount) > 12 to filter groups with total amount above 12."
      },
      {
        "level": 2,
        "text": "The GROUP BY clause remains unchanged."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label HAVING SUM(record.amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-daily-record",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-cooperative-daily-record-349",
    "index": 349,
    "task": "Remove HAVING to restore both groups and sort their sums descending",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label HAVING SUM(record.amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report restores both groups and sorts their sums descending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ],
          [
            "North Team",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove HAVING to restore all groups."
      },
      {
        "level": 2,
        "text": "Add ORDER BY total_amount DESC to sort sums descending."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-daily-record",
    "conceptIds": [
      "sql-descending"
    ]
  },
  {
    "id": "sql-cooperative-daily-record-350",
    "index": 350,
    "task": "Limit the restored grouped report to the largest group",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report limits to the largest group",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT 1 to keep only the largest group."
      },
      {
        "level": 2,
        "text": "The ORDER BY clause remains unchanged."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC LIMIT 1;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-daily-record",
    "conceptIds": [
      "sql-limit"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: cooperative-service-queue.
sqlCourse.projects.push({"id":"cooperative-service-queue","title":"Community Cooperative Service Queue"});
sqlCourse.steps.push(...([
  {
    "id": "sql-cooperative-service-queue-351",
    "index": 351,
    "task": "Select record name and group_id to start the report.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows four rows with name and group_id",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice Loan",
            1
          ],
          [
            "Seed Fund",
            2
          ],
          [
            "Tool Share",
            1
          ],
          [
            "Market Stall",
            null
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Start by selecting the name and group_id from the record table."
      },
      {
        "level": 2,
        "text": "This is the first step: just select the required fields."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-service-queue",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-cooperative-service-queue-352",
    "index": 352,
    "task": "LEFT JOIN group_info to show every record with its group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows four rows with name and group label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice Loan",
            "North Team"
          ],
          [
            "Seed Fund",
            "South Team"
          ],
          [
            "Tool Share",
            "North Team"
          ],
          [
            "Market Stall",
            null
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Join the group_info table using LEFT JOIN to include all records."
      },
      {
        "level": 2,
        "text": "Use ON group_info.id = record.group_id to match the group_id."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-service-queue",
    "conceptIds": [
      "sql-left-join"
    ]
  },
  {
    "id": "sql-cooperative-service-queue-353",
    "index": 353,
    "task": "Use COALESCE to display 'Unassigned' for missing group labels.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows four rows with name and group_label including Unassigned",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice Loan",
            "North Team"
          ],
          [
            "Seed Fund",
            "South Team"
          ],
          [
            "Tool Share",
            "North Team"
          ],
          [
            "Market Stall",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COALESCE to replace NULL with 'Unassigned' for missing group labels."
      },
      {
        "level": 2,
        "text": "Alias the result as group_label for clarity."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-service-queue",
    "conceptIds": [
      "sql-coalesce"
    ]
  },
  {
    "id": "sql-cooperative-service-queue-354",
    "index": 354,
    "task": "Filter for the row whose group_id is NULL to isolate the unassigned record.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only one row for the unassigned record",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Market Stall",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter for records with group_id IS NULL."
      },
      {
        "level": 2,
        "text": "This isolates the unassigned record for business reporting."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id WHERE record.group_id IS NULL;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-service-queue",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-cooperative-service-queue-355",
    "index": 355,
    "task": "Switch back to all rows and sort by the displayed group_label for business reporting.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id WHERE record.group_id IS NULL;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows all four rows sorted by group_label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice Loan",
            "North Team"
          ],
          [
            "Tool Share",
            "North Team"
          ],
          [
            "Seed Fund",
            "South Team"
          ],
          [
            "Market Stall",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove the WHERE clause to return all rows."
      },
      {
        "level": 2,
        "text": "Add ORDER BY group_label ASC to sort by the displayed label."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id ORDER BY group_label ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-service-queue",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: cooperative-service-queue.
sqlCourse.steps.push(...([
  {
    "id": "sql-cooperative-service-queue-356",
    "index": 356,
    "task": "Count every record after the LEFT JOIN.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id ORDER BY group_label ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The count is 4",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows in the joined result."
      },
      {
        "level": 2,
        "text": "The LEFT JOIN ensures all records are counted, even if group_info is missing."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-service-queue",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-cooperative-service-queue-357",
    "index": 357,
    "task": "Count records per displayed group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Group counts: North Team 2, South Team 1, Unassigned 1",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            2
          ],
          [
            "South Team",
            1
          ],
          [
            "Unassigned",
            1
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Group by the displayed group_label using GROUP BY."
      },
      {
        "level": 2,
        "text": "Use COUNT(*) to count records per group, and COALESCE to handle NULLs."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, COUNT(*) AS record_count FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-service-queue",
    "conceptIds": [
      "sql-group-by"
    ]
  },
  {
    "id": "sql-cooperative-service-queue-358",
    "index": 358,
    "task": "Sum amount per displayed group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, COUNT(*) AS record_count FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Group sums: North Team 10, South Team 20, Unassigned 5",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            20
          ],
          [
            "Unassigned",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(record.amount) to calculate total amount per group."
      },
      {
        "level": 2,
        "text": "Group by group_label and use COALESCE to handle missing labels."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-service-queue",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-cooperative-service-queue-359",
    "index": 359,
    "task": "Keep displayed groups whose sum exceeds 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Groups with sum > 8: North Team 10, South Team 20",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(record.amount) > 8 to filter groups by total amount."
      },
      {
        "level": 2,
        "text": "This removes the 'Unassigned' row since its sum is 5, which is not > 8."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-service-queue",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-cooperative-service-queue-360",
    "index": 360,
    "task": "Order those group sums descending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Groups ordered descending: South Team 20, North Team 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            20
          ],
          [
            "North Team",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort groups by their sums in descending order."
      },
      {
        "level": 2,
        "text": "This ensures the highest sum appears first in the report."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8 ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-service-queue",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: cooperative-supplier-list.
sqlCourse.projects.push({"id":"cooperative-supplier-list","title":"Community Cooperative Supplier List"});
sqlCourse.steps.push(...([
  {
    "id": "sql-cooperative-supplier-list-361",
    "index": 361,
    "task": "Select id, name, and amount from the record table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-1",
        "label": "The initial SELECT returns four rows with id, name, and amount",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Rice Loan",
            8
          ],
          [
            2,
            "Seed Fund",
            20
          ],
          [
            3,
            "Tool Share",
            2
          ],
          [
            4,
            "Market Stall",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SELECT to choose the three fields: id, name, and amount."
      },
      {
        "level": 2,
        "text": "Run the query to see all rows from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-supplier-list",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-cooperative-supplier-list-362",
    "index": 362,
    "task": "Insert a new record with id 5, name 'New Record', category 'Local', amount 7, status 'Open', group_id 1, then read all rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-2",
        "label": "After insert, five rows are returned including New Record",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Rice Loan",
            8
          ],
          [
            2,
            "Seed Fund",
            20
          ],
          [
            3,
            "Tool Share",
            2
          ],
          [
            4,
            "Market Stall",
            5
          ],
          [
            5,
            "New Record",
            7
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the new record using INSERT INTO record VALUES (...)."
      },
      {
        "level": 2,
        "text": "Then run SELECT id, name, amount FROM record to verify all rows."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nSELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-supplier-list",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-cooperative-supplier-list-363",
    "index": 363,
    "task": "Update only id 5 amount to 9, then read it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nSELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-3",
        "label": "After updating id 5, its amount is 9",
        "kind": "sql-row-contains",
        "row": [
          5,
          "New Record",
          9
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use UPDATE record SET amount = 9 WHERE id = 5 to change only id 5."
      },
      {
        "level": 2,
        "text": "Then SELECT id, name, amount WHERE id = 5 to verify the change."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nSELECT id, name, amount FROM record WHERE id = 5;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-supplier-list",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-cooperative-supplier-list-364",
    "index": 364,
    "task": "Update only id 2 status to 'Open', then read id 2.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nSELECT id, name, amount FROM record WHERE id = 5;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-4",
        "label": "After updating id 2, its status is 'Open'",
        "kind": "sql-row-contains",
        "row": [
          2,
          "Seed Fund",
          "Open"
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use UPDATE record SET status = 'Open' WHERE id = 2 to change only id 2."
      },
      {
        "level": 2,
        "text": "Then SELECT id, name, status WHERE id = 2 to verify the change."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nSELECT id, name, status FROM record WHERE id = 2;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-supplier-list",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-cooperative-supplier-list-365",
    "index": 365,
    "task": "Delete only id 4, then read remaining ids and names.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nSELECT id, name, status FROM record WHERE id = 2;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-5",
        "label": "After deleting id 4, remaining rows are id 1, 2, 3, 5",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Rice Loan"
          ],
          [
            2,
            "Seed Fund"
          ],
          [
            3,
            "Tool Share"
          ],
          [
            5,
            "New Record"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use DELETE FROM record WHERE id = 4 to remove only id 4."
      },
      {
        "level": 2,
        "text": "Then SELECT id, name to see the remaining rows."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nSELECT id, name FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-supplier-list",
    "conceptIds": [
      "sql-delete"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: cooperative-supplier-list.
sqlCourse.steps.push(...([
  {
    "id": "sql-cooperative-supplier-list-366",
    "index": 366,
    "task": "Insert a new record with id 6, name 'Backup Record', category 'Local', amount 4, status 'Open', group_id 1, then read it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nSELECT id, name FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-6",
        "label": "After inserting id 6, reading it returns Backup Record with all fields",
        "kind": "sql-row-contains",
        "row": [
          6,
          "Backup Record",
          4
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use INSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1); to add the new record."
      },
      {
        "level": 2,
        "text": "Then use SELECT id, name, category, amount, status, group_id FROM record WHERE id = 6; to read it."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nSELECT id, name, amount FROM record WHERE id = 6;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-supplier-list",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-cooperative-supplier-list-367",
    "index": 367,
    "task": "Update only id 6 category to 'Regional', then read it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nSELECT id, name, amount FROM record WHERE id = 6;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-7",
        "label": "After updating id 6 category to 'Regional', reading it returns the updated row",
        "kind": "sql-row-contains",
        "row": [
          6,
          "Backup Record",
          "Regional",
          4
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use UPDATE record SET category = 'Regional' WHERE id = 6; to change the category."
      },
      {
        "level": 2,
        "text": "Then use SELECT id, name, category, amount, status, group_id FROM record WHERE id = 6; to verify the change."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nSELECT id, name, category, amount FROM record WHERE id = 6;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-supplier-list",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-cooperative-supplier-list-368",
    "index": 368,
    "task": "Delete only id 1, then read remaining rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nSELECT id, name, category, amount FROM record WHERE id = 6;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-8",
        "label": "After deleting id 1, remaining rows are id 2, 3, 5, 6",
        "kind": "sql-rows-equal",
        "rows": [
          [
            2,
            "Seed Fund",
            20
          ],
          [
            3,
            "Tool Share",
            2
          ],
          [
            5,
            "New Record",
            9
          ],
          [
            6,
            "Backup Record",
            4
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use DELETE FROM record WHERE id = 1; to remove the row with id 1."
      },
      {
        "level": 2,
        "text": "Then use SELECT id, name, amount FROM record; to see the remaining rows."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-supplier-list",
    "conceptIds": [
      "sql-delete"
    ]
  },
  {
    "id": "sql-cooperative-supplier-list-369",
    "index": 369,
    "task": "Count all remaining rows after deleting id 1.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-9",
        "label": "After deleting id 1, there are 4 remaining rows",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SELECT COUNT(*) FROM record; to count all rows."
      },
      {
        "level": 2,
        "text": "The result should be 4, since id 1 was deleted."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT COUNT(*) FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-supplier-list",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-cooperative-supplier-list-370",
    "index": 370,
    "task": "Show remaining names and amounts sorted by amount ascending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT COUNT(*) FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result-10",
        "label": "After sorting by amount ascending, rows are Tool Share 2, Backup Record 4, New Record 9, Seed Fund 20",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tool Share",
            2
          ],
          [
            "Backup Record",
            4
          ],
          [
            "New Record",
            9
          ],
          [
            "Seed Fund",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SELECT name, amount FROM record ORDER BY amount ASC; to sort by amount."
      },
      {
        "level": 2,
        "text": "The rows should appear in order: Tool Share (2), Backup Record (4), New Record (9), Seed Fund (20)."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT name, amount FROM record ORDER BY amount ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "cooperative-supplier-list",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: cooperative-community-schedule.
sqlCourse.projects.push({"id":"cooperative-community-schedule","title":"Cooperative Community Schedule"});
sqlCourse.steps.push(...([
  {
    "id": "sql-cooperative-community-schedule-371",
    "index": 371,
    "task": "Create a report table with id and name columns",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-table-exists",
        "label": "The report table exists with id and name",
        "kind": "sql-table-columns",
        "table": "report",
        "columns": [
          "id",
          "name"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Create a new table named report with two columns: id and name."
      },
      {
        "level": 2,
        "text": "Use the CREATE TABLE statement to define the table structure."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT);"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-community-schedule",
    "conceptIds": [
      "sql-create-table"
    ]
  },
  {
    "id": "sql-cooperative-community-schedule-372",
    "index": 372,
    "task": "Add amount INTEGER to the report table definition",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT);"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-table-columns",
        "label": "The report table has id, name, and amount columns",
        "kind": "sql-table-columns",
        "table": "report",
        "columns": [
          "id",
          "name",
          "amount"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the amount column to the report table definition."
      },
      {
        "level": 2,
        "text": "Use the CREATE TABLE statement to redefine the table with the new column."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-community-schedule",
    "conceptIds": [
      "sql-create-table"
    ]
  },
  {
    "id": "sql-cooperative-community-schedule-373",
    "index": 373,
    "task": "Insert row from source_record id 1 and read report",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-row-1",
        "label": "Report contains row for id 1: Rice Loan with amount 8",
        "kind": "sql-row-contains",
        "row": [
          1,
          "Rice Loan",
          8
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert the row from source_record with id 1 into the report table."
      },
      {
        "level": 2,
        "text": "Then select all rows from the report table to verify the insertion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id = 1;\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 6,
    "projectId": "cooperative-community-schedule",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-cooperative-community-schedule-374",
    "index": 374,
    "task": "Insert source rows ids 2 and 3 into report",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id = 1;\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-rows-1-2-3",
        "label": "Report contains rows for ids 1, 2, and 3",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Rice Loan",
            8
          ],
          [
            2,
            "Seed Fund",
            20
          ],
          [
            3,
            "Tool Share",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert rows from source_record with ids 2 and 3 into the report table."
      },
      {
        "level": 2,
        "text": "Then select all rows from the report table to verify the insertion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 6,
    "projectId": "cooperative-community-schedule",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-cooperative-community-schedule-375",
    "index": 375,
    "task": "Sort report rows by amount ascending",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-rows-sorted-by-amount",
        "label": "Report rows sorted by amount ascending: Tool Share, Rice Loan, Seed Fund",
        "kind": "sql-rows-equal",
        "rows": [
          [
            3,
            "Tool Share",
            2
          ],
          [
            1,
            "Rice Loan",
            8
          ],
          [
            2,
            "Seed Fund",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Sort the report rows by the amount column in ascending order."
      },
      {
        "level": 2,
        "text": "Use the ORDER BY clause with ASC to sort the rows."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "estimatedMinutes": 6,
    "projectId": "cooperative-community-schedule",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: cooperative-community-schedule.
sqlCourse.steps.push(...([
  {
    "id": "sql-cooperative-community-schedule-376",
    "index": 376,
    "task": "Insert source row id 4 into report",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-rows-after-inserting-id-4",
        "label": "Report rows after inserting id 4: Tool Share 2, Rice Loan 8, Seed Fund 20, Market Stall 5",
        "kind": "sql-rows-equal",
        "rows": [
          [
            3,
            "Tool Share",
            2
          ],
          [
            4,
            "Market Stall",
            5
          ],
          [
            1,
            "Rice Loan",
            8
          ],
          [
            2,
            "Seed Fund",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a new INSERT statement to include id 4 from source_record."
      },
      {
        "level": 2,
        "text": "Use INSERT INTO report SELECT id, name, amount FROM source_record WHERE id = 4;"
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-community-schedule",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-cooperative-community-schedule-377",
    "index": 377,
    "task": "Update report id 2 amount to 18",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-rows-after-updating-id-2",
        "label": "Report rows after updating id 2 amount to 18: Tool Share 2, Rice Loan 8, Seed Fund 18, Market Stall 5",
        "kind": "sql-rows-equal",
        "rows": [
          [
            3,
            "Tool Share",
            2
          ],
          [
            4,
            "Market Stall",
            5
          ],
          [
            1,
            "Rice Loan",
            8
          ],
          [
            2,
            "Seed Fund",
            18
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use UPDATE report SET amount = 18 WHERE id = 2;"
      },
      {
        "level": 2,
        "text": "This changes the amount for Seed Fund from 20 to 18."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-community-schedule",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-cooperative-community-schedule-378",
    "index": 378,
    "task": "Delete report id 3",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-rows-after-deleting-id-3",
        "label": "Report rows after deleting id 3: Tool Share 2, Rice Loan 8, Seed Fund 18, Market Stall 5",
        "kind": "sql-rows-equal",
        "rows": [
          [
            4,
            "Market Stall",
            5
          ],
          [
            1,
            "Rice Loan",
            8
          ],
          [
            2,
            "Seed Fund",
            18
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a DELETE statement to remove id 3."
      },
      {
        "level": 2,
        "text": "Use DELETE FROM report WHERE id = 3;"
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-community-schedule",
    "conceptIds": [
      "sql-delete"
    ]
  },
  {
    "id": "sql-cooperative-community-schedule-379",
    "index": 379,
    "task": "Count report rows",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-row-count-after-deletion",
        "label": "Report row count after deleting id 3: 3",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 3
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SELECT COUNT(*) FROM report;"
      },
      {
        "level": 2,
        "text": "This counts the remaining rows after deletion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT COUNT(*) FROM report;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-community-schedule",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-cooperative-community-schedule-380",
    "index": 380,
    "task": "Show id, name, and amount ordered by id",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT COUNT(*) FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-rows-ordered-by-id",
        "label": "Report rows ordered by id: Rice Loan 8, Seed Fund 18, Market Stall 5",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Rice Loan",
            8
          ],
          [
            2,
            "Seed Fund",
            18
          ],
          [
            4,
            "Market Stall",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY id ASC to sort by id ascending."
      },
      {
        "level": 2,
        "text": "This ensures rows are listed in order of id: 1, 2, 4."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report ORDER BY id ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-community-schedule",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: cooperative-delivery-log.
sqlCourse.projects.push({"id":"cooperative-delivery-log","title":"Community Cooperative Delivery Log"});
sqlCourse.steps.push(...([
  {
    "id": "sql-cooperative-delivery-log-381",
    "index": 381,
    "task": "Select only the name of each delivery record.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows all names",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice Loan"
          ],
          [
            "Seed Fund"
          ],
          [
            "Tool Share"
          ],
          [
            "Market Stall"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose only the name field from the record table."
      },
      {
        "level": 2,
        "text": "The solution is a SELECT with one field."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-delivery-log",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-cooperative-delivery-log-382",
    "index": 382,
    "task": "Add the amount field to the report.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows names and amounts",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice Loan",
            8
          ],
          [
            "Seed Fund",
            20
          ],
          [
            "Tool Share",
            2
          ],
          [
            "Market Stall",
            5
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the amount column to the SELECT list."
      },
      {
        "level": 2,
        "text": "The solution adds one field to the existing SELECT."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-delivery-log",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-cooperative-delivery-log-383",
    "index": 383,
    "task": "Filter the report to show only records with amount <= 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only records with amount <= 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice Loan",
            8
          ],
          [
            "Tool Share",
            2
          ],
          [
            "Market Stall",
            5
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter by amount."
      },
      {
        "level": 2,
        "text": "Use <= to include 10 and below."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-delivery-log",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-cooperative-delivery-log-384",
    "index": 384,
    "task": "Sort the filtered records by amount in ascending order.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows filtered records sorted by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tool Share",
            2
          ],
          [
            "Market Stall",
            5
          ],
          [
            "Rice Loan",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY amount ASC to sort the filtered rows."
      },
      {
        "level": 2,
        "text": "The sort must be ascending to match the goal."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-delivery-log",
    "conceptIds": [
      "sql-order-by"
    ]
  },
  {
    "id": "sql-cooperative-delivery-log-385",
    "index": 385,
    "task": "Limit the sorted report to only two rows for a priority list.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only two rows for priority",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Tool Share",
            2
          ],
          [
            "Market Stall",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT 2 to restrict output to two rows."
      },
      {
        "level": 2,
        "text": "The limit removes the last row, Rice Loan, from the sorted list."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC LIMIT 2;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-delivery-log",
    "conceptIds": [
      "sql-limit"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: cooperative-delivery-log.
sqlCourse.steps.push(...([
  {
    "id": "sql-cooperative-delivery-log-386",
    "index": 386,
    "task": "Replace the entire prior SELECT with COUNT(*) for amount <= 10 and check the scalar value 3, not the output row count.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC LIMIT 2;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The count query returns scalar value 3",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 3
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Replace the entire SELECT with COUNT(*) and filter by amount <= 10."
      },
      {
        "level": 2,
        "text": "The solution returns a single scalar value, not rows."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-delivery-log",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-cooperative-delivery-log-387",
    "index": 387,
    "task": "Alias that count as priority_count and check that exact result column heading.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The column heading is exactly priority_count",
        "kind": "sql-columns-equal",
        "columns": [
          "priority_count"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add AS priority_count to rename the count column."
      },
      {
        "level": 2,
        "text": "The column name must match exactly for the test to pass."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) AS priority_count FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-delivery-log",
    "conceptIds": [
      "sql-alias"
    ]
  },
  {
    "id": "sql-cooperative-delivery-log-388",
    "index": 388,
    "task": "Replace the entire count query with category and SUM(amount) grouped across all four rows, giving Local 10 and Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) AS priority_count FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The grouped report shows Local 10 and Regional 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Replace the SELECT with category and SUM(amount) GROUP BY category."
      },
      {
        "level": 2,
        "text": "The solution must return two rows: Local 10 and Regional 25."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-delivery-log",
    "conceptIds": [
      "sql-group-by"
    ]
  },
  {
    "id": "sql-cooperative-delivery-log-389",
    "index": 389,
    "task": "Keep only the Regional 25 total by using HAVING above 12.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only Regional 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(amount) > 12 to filter groups by total amount."
      },
      {
        "level": 2,
        "text": "Only Regional 25 meets the condition above 12."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-delivery-log",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-cooperative-delivery-log-390",
    "index": 390,
    "task": "Lower HAVING to above 8 to restore both totals and sort them largest first so Regional 25 comes before Local 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Rice Loan', 'Local', 8, 'Open', 1), (2, 'Seed Fund', 'Regional', 20, 'Done', 2), (3, 'Tool Share', 'Local', 2, 'Open', 1), (4, 'Market Stall', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows Regional 25 then Local 10 sorted largest first",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Lower HAVING to > 8 to include both totals."
      },
      {
        "level": 2,
        "text": "Add ORDER BY total_amount DESC to sort largest first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 8 ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "cooperative-delivery-log",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: carinderia-inventory-report.
sqlCourse.projects.push({"id":"carinderia-inventory-report","title":"Carinderia Inventory Report"});
sqlCourse.steps.push(...([
  {
    "id": "sql-carinderia-inventory-report-391",
    "index": 391,
    "task": "Select the name and status of all items in the inventory.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows name and status for all items",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Adobo",
            "Open"
          ],
          [
            "Sinigang",
            "Done"
          ],
          [
            "Pancit",
            "Open"
          ],
          [
            "Rice Meal",
            "Done"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the two fields requested: name and status."
      },
      {
        "level": 2,
        "text": "Use SELECT to fetch these fields from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-inventory-report",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-carinderia-inventory-report-392",
    "index": 392,
    "task": "Filter to show only items with status 'Open'.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only Open items",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Adobo",
            "Open"
          ],
          [
            "Pancit",
            "Open"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter by status."
      },
      {
        "level": 2,
        "text": "Use 'Open' as the exact string value for status."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open';"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-inventory-report",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-carinderia-inventory-report-393",
    "index": 393,
    "task": "Filter to show only items with amount less than or equal to 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only items with amount <= 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Adobo",
            "Open"
          ],
          [
            "Pancit",
            "Open"
          ],
          [
            "Rice Meal",
            "Done"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the <= operator to include items with amount 8 or less."
      },
      {
        "level": 2,
        "text": "Check the amount column in the WHERE clause."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE amount <= 8;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-inventory-report",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-carinderia-inventory-report-394",
    "index": 394,
    "task": "Filter to show only items that are 'Open' AND have amount <= 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE amount <= 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only Open items with amount <= 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Adobo",
            "Open"
          ],
          [
            "Pancit",
            "Open"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Combine two conditions with AND."
      },
      {
        "level": 2,
        "text": "Both status and amount must match."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open' AND amount <= 8;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-inventory-report",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-carinderia-inventory-report-395",
    "index": 395,
    "task": "Filter to show items that are 'Done' OR have amount less than 3.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open' AND amount <= 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows Done items or items with amount < 3",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Sinigang",
            "Done"
          ],
          [
            "Pancit",
            "Open"
          ],
          [
            "Rice Meal",
            "Done"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use OR to include items that meet either condition."
      },
      {
        "level": 2,
        "text": "Check status for 'Done' or amount for < 3."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Done' OR amount < 3;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-inventory-report",
    "conceptIds": [
      "sql-or"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: carinderia-inventory-report.
sqlCourse.steps.push(...([
  {
    "id": "sql-carinderia-inventory-report-396",
    "index": 396,
    "task": "Select names beginning with the first letter of the first seeded name using LIKE.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Done' OR amount < 3;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows names starting with 'A'",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Adobo"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use LIKE to match names starting with 'A'."
      },
      {
        "level": 2,
        "text": "Check the first seeded name: 'Adobo' starts with 'A'."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name FROM record WHERE name LIKE 'A%';"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-inventory-report",
    "conceptIds": [
      "sql-like"
    ]
  },
  {
    "id": "sql-carinderia-inventory-report-397",
    "index": 397,
    "task": "Show name, category, and amount for Local rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name FROM record WHERE name LIKE 'A%';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows Local items with name, category, and amount",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Adobo",
            "Local",
            8
          ],
          [
            "Pancit",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Filter for category = 'Local'."
      },
      {
        "level": 2,
        "text": "Select name, category, and amount from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local';"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-inventory-report",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-carinderia-inventory-report-398",
    "index": 398,
    "task": "Include Local rows OR amount = 20.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows Local items or items with amount = 20",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Adobo",
            "Local",
            8
          ],
          [
            "Sinigang",
            "Regional",
            20
          ],
          [
            "Pancit",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use OR to include both conditions."
      },
      {
        "level": 2,
        "text": "Check category = 'Local' or amount = 20."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-inventory-report",
    "conceptIds": [
      "sql-or"
    ]
  },
  {
    "id": "sql-carinderia-inventory-report-399",
    "index": 399,
    "task": "Sort that three-row report by amount descending so the 20 row comes first.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows sorted rows by amount descending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Sinigang",
            "Regional",
            20
          ],
          [
            "Adobo",
            "Local",
            8
          ],
          [
            "Pancit",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use ORDER BY amount DESC to sort descending."
      },
      {
        "level": 2,
        "text": "The row with amount 20 should come first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-inventory-report",
    "conceptIds": [
      "sql-order-by"
    ]
  },
  {
    "id": "sql-carinderia-inventory-report-400",
    "index": 400,
    "task": "Limit it to the first 2 rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only the first two rows after sorting",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Sinigang",
            "Regional",
            20
          ],
          [
            "Adobo",
            "Local",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use LIMIT 2 to restrict output to two rows."
      },
      {
        "level": 2,
        "text": "The first two rows after sorting are Sinigang and Adobo."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC LIMIT 2;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-inventory-report",
    "conceptIds": [
      "sql-limit"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: carinderia-daily-record.
sqlCourse.projects.push({"id":"carinderia-daily-record","title":"Carinderia Daily Record"});
sqlCourse.steps.push(...([
  {
    "id": "sql-carinderia-daily-record-401",
    "index": 401,
    "task": "Count all rows in the record table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "count-all-rows",
        "label": "The count of all rows in record is 4",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows in the table."
      },
      {
        "level": 2,
        "text": "The solution is a single SELECT COUNT(*) statement."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record;"
    },
    "estimatedMinutes": 3,
    "projectId": "carinderia-daily-record",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-carinderia-daily-record-402",
    "index": 402,
    "task": "Name the count as record_count.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "named-count",
        "label": "The count is named record_count",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      },
      {
        "id": "alias-heading",
        "label": "The result column is named record_count",
        "kind": "sql-columns-equal",
        "columns": [
          "record_count"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AS to rename the count column to record_count."
      },
      {
        "level": 2,
        "text": "The solution is a single SELECT with AS record_count."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) AS record_count FROM record;"
    },
    "estimatedMinutes": 3,
    "projectId": "carinderia-daily-record",
    "conceptIds": [
      "sql-alias"
    ]
  },
  {
    "id": "sql-carinderia-daily-record-403",
    "index": 403,
    "task": "Calculate the total amount of all records.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) AS record_count FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "total-amount",
        "label": "The total amount is 35",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 35
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(amount) to calculate the total amount."
      },
      {
        "level": 2,
        "text": "The solution is a single SELECT with AS total_amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT SUM(amount) AS total_amount FROM record;"
    },
    "estimatedMinutes": 3,
    "projectId": "carinderia-daily-record",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-carinderia-daily-record-404",
    "index": 404,
    "task": "Calculate the average amount of all records.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT SUM(amount) AS total_amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "average-amount",
        "label": "The average amount is 8.75",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 8.75
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AVG(amount) to calculate the average amount."
      },
      {
        "level": 2,
        "text": "The solution is a single SELECT with AS average_amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT AVG(amount) AS average_amount FROM record;"
    },
    "estimatedMinutes": 3,
    "projectId": "carinderia-daily-record",
    "conceptIds": [
      "sql-average"
    ]
  },
  {
    "id": "sql-carinderia-daily-record-405",
    "index": 405,
    "task": "Select category and count of records grouped by category.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT AVG(amount) AS average_amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "grouped-by-category",
        "label": "Local has 2 records and Regional has 2 records",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            2
          ],
          [
            "Regional",
            2
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use GROUP BY category to group records by category."
      },
      {
        "level": 2,
        "text": "The solution is a single SELECT with COUNT(*) AS record_count and GROUP BY category."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, COUNT(*) AS record_count FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-daily-record",
    "conceptIds": [
      "sql-group-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: carinderia-daily-record.
sqlCourse.steps.push(...([
  {
    "id": "sql-carinderia-daily-record-406",
    "index": 406,
    "task": "Change the grouped calculation to SUM(amount) as total_amount, giving Local 10 and Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, COUNT(*) AS record_count FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "sum-by-category",
        "label": "Local has total 10 and Regional has total 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(amount) to calculate the total amount per category."
      },
      {
        "level": 2,
        "text": "The solution replaces COUNT(*) with SUM(amount) and adds AS total_amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-daily-record",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-carinderia-daily-record-407",
    "index": 407,
    "task": "Sort both group totals descending so Regional 25 comes first.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "sorted-descending",
        "label": "Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort totals from highest to lowest."
      },
      {
        "level": 2,
        "text": "The solution adds ORDER BY total_amount DESC after GROUP BY."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 3,
    "projectId": "carinderia-daily-record",
    "conceptIds": [
      "sql-descending"
    ]
  },
  {
    "id": "sql-carinderia-daily-record-408",
    "index": 408,
    "task": "Keep only totals above 12 with HAVING.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "filtered-having",
        "label": "Regional 25 only",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(amount) > 12 to filter groups with totals over 12."
      },
      {
        "level": 2,
        "text": "The solution adds HAVING SUM(amount) > 12 after GROUP BY."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-daily-record",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-carinderia-daily-record-409",
    "index": 409,
    "task": "Remove HAVING to restore both complete category totals.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "restored-totals",
        "label": "Local 10 and Regional 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove HAVING SUM(amount) > 12 to restore all group totals."
      },
      {
        "level": 2,
        "text": "The solution removes HAVING SUM(amount) > 12."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 3,
    "projectId": "carinderia-daily-record",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-carinderia-daily-record-410",
    "index": 410,
    "task": "Order those two restored totals from largest to smallest.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "final-sorted",
        "label": "Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort totals from highest to lowest."
      },
      {
        "level": 2,
        "text": "The solution adds ORDER BY total_amount DESC after GROUP BY."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 3,
    "projectId": "carinderia-daily-record",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: carinderia-service-queue.
sqlCourse.projects.push({"id":"carinderia-service-queue","title":"Carinderia Service Queue"});
sqlCourse.steps.push(...([
  {
    "id": "sql-carinderia-service-queue-411",
    "index": 411,
    "task": "Read record.name and record.group_id with qualified names",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows record.name and record.group_id",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Adobo",
            1
          ],
          [
            "Sinigang",
            2
          ],
          [
            "Pancit",
            1
          ],
          [
            "Rice Meal",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use qualified column names: record.name and record.group_id."
      },
      {
        "level": 2,
        "text": "Select only the two fields requested: name and group_id."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-service-queue",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-carinderia-service-queue-412",
    "index": 412,
    "task": "Join group_info on matching group ids and show record name plus group label",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows record.name and group_info.label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Adobo",
            "North Team"
          ],
          [
            "Sinigang",
            "South Team"
          ],
          [
            "Pancit",
            "North Team"
          ],
          [
            "Rice Meal",
            "South Team"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Join record and group_info using ON group_info.id = record.group_id."
      },
      {
        "level": 2,
        "text": "Select record.name and group_info.label to show the joined data."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-service-queue",
    "conceptIds": [
      "sql-inner-join"
    ]
  },
  {
    "id": "sql-carinderia-service-queue-413",
    "index": 413,
    "task": "Add record.amount to the joined report",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows record.name, group_info.label, and record.amount",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Adobo",
            "North Team",
            8
          ],
          [
            "Sinigang",
            "South Team",
            20
          ],
          [
            "Pancit",
            "North Team",
            2
          ],
          [
            "Rice Meal",
            "South Team",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add record.amount to the SELECT list."
      },
      {
        "level": 2,
        "text": "Keep the existing JOIN and SELECT fields."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-service-queue",
    "conceptIds": [
      "sql-qualified-column"
    ]
  },
  {
    "id": "sql-carinderia-service-queue-414",
    "index": 414,
    "task": "Filter joined rows to amount <= 10",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report filters rows to amount <= 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Adobo",
            "North Team",
            8
          ],
          [
            "Pancit",
            "North Team",
            2
          ],
          [
            "Rice Meal",
            "South Team",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add WHERE record.amount <= 10 to filter rows."
      },
      {
        "level": 2,
        "text": "Keep the existing JOIN and SELECT fields."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-service-queue",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-carinderia-service-queue-415",
    "index": 415,
    "task": "Sort filtered joined rows by amount ascending",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report sorts filtered rows by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pancit",
            "North Team",
            2
          ],
          [
            "Rice Meal",
            "South Team",
            5
          ],
          [
            "Adobo",
            "North Team",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY record.amount ASC to sort by amount ascending."
      },
      {
        "level": 2,
        "text": "Keep the existing JOIN, WHERE, and SELECT fields."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10 ORDER BY record.amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-service-queue",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: carinderia-service-queue.
sqlCourse.steps.push(...([
  {
    "id": "sql-carinderia-service-queue-416",
    "index": 416,
    "task": "Count records for each group label",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10 ORDER BY record.amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report counts records for each group label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            2
          ],
          [
            "South Team",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count rows per group."
      },
      {
        "level": 2,
        "text": "Group by group_info.label to get one row per group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, COUNT(*) AS record_count FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-service-queue",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-carinderia-service-queue-417",
    "index": 417,
    "task": "Sum amount for each group label",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, COUNT(*) AS record_count FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report sums amount for each group label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(record.amount) to add up amounts per group."
      },
      {
        "level": 2,
        "text": "Group by group_info.label to get one row per group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-service-queue",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-carinderia-service-queue-418",
    "index": 418,
    "task": "Keep only group sums above 12 with HAVING",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report keeps only group sums above 12",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(record.amount) > 12 to filter groups by total amount."
      },
      {
        "level": 2,
        "text": "Only South Team (25) meets the condition."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label HAVING SUM(record.amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-service-queue",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-carinderia-service-queue-419",
    "index": 419,
    "task": "Remove HAVING to restore both groups and sort their sums descending",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label HAVING SUM(record.amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report restores both groups and sorts their sums descending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ],
          [
            "North Team",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove HAVING to show all groups again."
      },
      {
        "level": 2,
        "text": "Add ORDER BY total_amount DESC to sort by total amount descending."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-service-queue",
    "conceptIds": [
      "sql-descending"
    ]
  },
  {
    "id": "sql-carinderia-service-queue-420",
    "index": 420,
    "task": "Limit the restored grouped report to the largest group",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report limits the restored grouped report to the largest group",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT 1 to keep only the top group by total amount."
      },
      {
        "level": 2,
        "text": "South Team (25) is the largest group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC LIMIT 1;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-service-queue",
    "conceptIds": [
      "sql-limit"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: carinderia-supplier-list.
sqlCourse.projects.push({"id":"carinderia-supplier-list","title":"Carinderia Supplier List"});
sqlCourse.steps.push(...([
  {
    "id": "sql-carinderia-supplier-list-421",
    "index": 421,
    "task": "Select the record name and group_id for all suppliers.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows with name and group_id",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Adobo",
            1
          ],
          [
            "Sinigang",
            2
          ],
          [
            "Pancit",
            1
          ],
          [
            "Rice Meal",
            null
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the fields: name and group_id from the record table."
      },
      {
        "level": 2,
        "text": "Use SELECT to fetch these two columns from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-supplier-list",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-carinderia-supplier-list-422",
    "index": 422,
    "task": "LEFT JOIN group_info to show every record with its group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows with name and group label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Adobo",
            "North Team"
          ],
          [
            "Sinigang",
            "South Team"
          ],
          [
            "Pancit",
            "North Team"
          ],
          [
            "Rice Meal",
            null
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Join record with group_info using LEFT JOIN."
      },
      {
        "level": 2,
        "text": "Match group_info.id with record.group_id to show the label."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-supplier-list",
    "conceptIds": [
      "sql-left-join"
    ]
  },
  {
    "id": "sql-carinderia-supplier-list-423",
    "index": 423,
    "task": "Use COALESCE to display 'Unassigned' for missing group labels.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows with name and group_label including Unassigned",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Adobo",
            "North Team"
          ],
          [
            "Sinigang",
            "South Team"
          ],
          [
            "Pancit",
            "North Team"
          ],
          [
            "Rice Meal",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COALESCE to replace NULL with 'Unassigned'."
      },
      {
        "level": 2,
        "text": "Alias the new column as group_label."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-supplier-list",
    "conceptIds": [
      "sql-coalesce"
    ]
  },
  {
    "id": "sql-carinderia-supplier-list-424",
    "index": 424,
    "task": "Filter for the row whose group_id is NULL.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains one row with name and group_label for the NULL group_id",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Rice Meal",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter for group_id IS NULL."
      },
      {
        "level": 2,
        "text": "Only the row with group_id NULL should appear."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id WHERE record.group_id IS NULL;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-supplier-list",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-carinderia-supplier-list-425",
    "index": 425,
    "task": "Switch back to all rows and sort by the displayed group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id WHERE record.group_id IS NULL;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains four rows sorted by group_label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Adobo",
            "North Team"
          ],
          [
            "Pancit",
            "North Team"
          ],
          [
            "Sinigang",
            "South Team"
          ],
          [
            "Rice Meal",
            "Unassigned"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove the WHERE clause to show all rows."
      },
      {
        "level": 2,
        "text": "Add ORDER BY group_label ASC to sort the results."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id ORDER BY group_label ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-supplier-list",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: carinderia-supplier-list.
sqlCourse.steps.push(...([
  {
    "id": "sql-carinderia-supplier-list-426",
    "index": 426,
    "task": "Count every record after the LEFT JOIN.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id ORDER BY group_label ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result is a scalar count of 4",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows in the joined result."
      },
      {
        "level": 2,
        "text": "The solution is a single SELECT with no FROM clause needed."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-supplier-list",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-carinderia-supplier-list-427",
    "index": 427,
    "task": "Count records per displayed group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record LEFT JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains three rows with group_label and record_count",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            2
          ],
          [
            "South Team",
            1
          ],
          [
            "Unassigned",
            1
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Group by the displayed group label using GROUP BY."
      },
      {
        "level": 2,
        "text": "Use COUNT(*) to count records per group, and alias the group label."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, COUNT(*) AS record_count FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-supplier-list",
    "conceptIds": [
      "sql-group-by"
    ]
  },
  {
    "id": "sql-carinderia-supplier-list-428",
    "index": 428,
    "task": "Sum amount per displayed group label.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, COUNT(*) AS record_count FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains three rows with group_label and total_amount",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            20
          ],
          [
            "Unassigned",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(record.amount) to compute the total amount per group."
      },
      {
        "level": 2,
        "text": "Group by the displayed group label using GROUP BY."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-supplier-list",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-carinderia-supplier-list-429",
    "index": 429,
    "task": "Keep displayed groups whose sum exceeds 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains two rows with group_label and total_amount",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "North Team",
            10
          ],
          [
            "South Team",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(record.amount) > 8 to filter groups with total amount over 8."
      },
      {
        "level": 2,
        "text": "The HAVING clause filters groups after grouping is done."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-supplier-list",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-carinderia-supplier-list-430",
    "index": 430,
    "task": "Order those group sums descending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', NULL);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains two rows ordered by total_amount descending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "South Team",
            20
          ],
          [
            "North Team",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort the groups by their total amount descending."
      },
      {
        "level": 2,
        "text": "The ORDER BY clause sorts the final result set."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8 ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-supplier-list",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: carinderia-community-schedule.
sqlCourse.projects.push({"id":"carinderia-community-schedule","title":"Carinderia Community Schedule"});
sqlCourse.steps.push(...([
  {
    "id": "sql-carinderia-community-schedule-431",
    "index": 431,
    "task": "Select the id, name, and amount of all records in the carinderia community schedule.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The initial report shows all records with id, name, and amount",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Adobo",
            8
          ],
          [
            2,
            "Sinigang",
            20
          ],
          [
            3,
            "Pancit",
            2
          ],
          [
            4,
            "Rice Meal",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the fields: id, name, and amount from the record table."
      },
      {
        "level": 2,
        "text": "Use SELECT to list these fields from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-community-schedule",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-carinderia-community-schedule-432",
    "index": 432,
    "task": "Insert a new record with id 5, name 'New Record', category 'Local', amount 7, status 'Open', group_id 1, then read all rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "After inserting, all records including New Record are shown",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Adobo",
            8
          ],
          [
            2,
            "Sinigang",
            20
          ],
          [
            3,
            "Pancit",
            2
          ],
          [
            4,
            "Rice Meal",
            5
          ],
          [
            5,
            "New Record",
            7
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert the new record using INSERT INTO record VALUES (...)."
      },
      {
        "level": 2,
        "text": "Then select all id, name, amount to verify the insertion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nSELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-community-schedule",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-carinderia-community-schedule-433",
    "index": 433,
    "task": "Update only id 5 amount to 9, then read it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nSELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "After updating, only id 5 shows amount 9",
        "kind": "sql-row-contains",
        "row": [
          5,
          "New Record",
          9
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Update the amount for id 5 using UPDATE record SET amount = 9 WHERE id = 5."
      },
      {
        "level": 2,
        "text": "Then select only id 5 to verify the change."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nSELECT id, name, amount FROM record WHERE id = 5;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-community-schedule",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-carinderia-community-schedule-434",
    "index": 434,
    "task": "Update only id 2 status to 'Open', then read id 2.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nSELECT id, name, amount FROM record WHERE id = 5;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "After updating, id 2 shows status 'Open'",
        "kind": "sql-row-contains",
        "row": [
          2,
          "Sinigang",
          "Open"
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Update the status for id 2 using UPDATE record SET status = 'Open' WHERE id = 2."
      },
      {
        "level": 2,
        "text": "Then select only id 2 to verify the change."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nSELECT id, name, status FROM record WHERE id = 2;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-community-schedule",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-carinderia-community-schedule-435",
    "index": 435,
    "task": "Delete only id 4, then read remaining ids and names.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nSELECT id, name, status FROM record WHERE id = 2;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "After deleting id 4, remaining records show ids 1, 2, 3, 5",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Adobo"
          ],
          [
            2,
            "Sinigang"
          ],
          [
            3,
            "Pancit"
          ],
          [
            5,
            "New Record"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Delete id 4 using DELETE FROM record WHERE id = 4."
      },
      {
        "level": 2,
        "text": "Then select id and name to verify the deletion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nSELECT id, name FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-community-schedule",
    "conceptIds": [
      "sql-delete"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: carinderia-community-schedule.
sqlCourse.steps.push(...([
  {
    "id": "sql-carinderia-community-schedule-436",
    "index": 436,
    "task": "Insert a new record with id 6, name 'Backup Record', category 'Local', amount 4, status 'Open', group_id 1, then read it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nSELECT id, name FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The inserted record shows id 6, name Backup Record, amount 4",
        "kind": "sql-row-contains",
        "row": [
          6,
          "Backup Record",
          4
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert the new record using INSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1)."
      },
      {
        "level": 2,
        "text": "Then select the row with WHERE id = 6 to verify."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nSELECT id, name, amount FROM record WHERE id = 6;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-community-schedule",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-carinderia-community-schedule-437",
    "index": 437,
    "task": "Update only id 6 category to 'Regional', then read it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nSELECT id, name, amount FROM record WHERE id = 6;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The updated row shows category 'Regional'",
        "kind": "sql-row-contains",
        "row": [
          6,
          "Backup Record",
          "Regional",
          4
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Update the category using UPDATE record SET category = 'Regional' WHERE id = 6."
      },
      {
        "level": 2,
        "text": "Then select the row to verify the change."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nSELECT id, name, category, amount FROM record WHERE id = 6;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-community-schedule",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-carinderia-community-schedule-438",
    "index": 438,
    "task": "Delete only id 1, then read remaining rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nSELECT id, name, category, amount FROM record WHERE id = 6;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "After deleting id 1, remaining records show ids 2, 3, 5, 6",
        "kind": "sql-rows-equal",
        "rows": [
          [
            2,
            "Sinigang",
            20
          ],
          [
            3,
            "Pancit",
            2
          ],
          [
            5,
            "New Record",
            9
          ],
          [
            6,
            "Backup Record",
            4
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Delete id 1 using DELETE FROM record WHERE id = 1."
      },
      {
        "level": 2,
        "text": "Then select all rows to verify the deletion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT id, name, amount FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-community-schedule",
    "conceptIds": [
      "sql-delete"
    ]
  },
  {
    "id": "sql-carinderia-community-schedule-439",
    "index": 439,
    "task": "Count all remaining rows after deleting id 1.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT id, name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The count is 4 after deleting id 1",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows in the table."
      },
      {
        "level": 2,
        "text": "The result should be 4 after deleting id 1."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT COUNT(*) FROM record;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-community-schedule",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-carinderia-community-schedule-440",
    "index": 440,
    "task": "Show remaining names and amounts sorted by amount ascending.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT COUNT(*) FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "Rows sorted by amount ascending: Pancit 2, Backup Record 4, New Record 9, Sinigang 20",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pancit",
            2
          ],
          [
            "Backup Record",
            4
          ],
          [
            "New Record",
            9
          ],
          [
            "Sinigang",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use ORDER BY amount ASC to sort the rows by amount ascending."
      },
      {
        "level": 2,
        "text": "The result should show Pancit first, then Backup Record, then New Record, then Sinigang."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT name, amount FROM record ORDER BY amount ASC;"
    },
    "estimatedMinutes": 5,
    "projectId": "carinderia-community-schedule",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: carinderia-delivery-log.
sqlCourse.projects.push({"id":"carinderia-delivery-log","title":"Carinderia Delivery Log"});
sqlCourse.steps.push(...([
  {
    "id": "sql-carinderia-delivery-log-441",
    "index": 441,
    "task": "Create a report table with id and name columns.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-table-exists",
        "label": "The report table exists with id and name columns",
        "kind": "sql-table-columns",
        "table": "report",
        "columns": [
          "id",
          "name"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Create a new table named report with two columns: id and name."
      },
      {
        "level": 2,
        "text": "Use the CREATE TABLE statement to define the table structure."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT);"
    },
    "estimatedMinutes": 3,
    "projectId": "carinderia-delivery-log",
    "conceptIds": [
      "sql-create-table"
    ]
  },
  {
    "id": "sql-carinderia-delivery-log-442",
    "index": 442,
    "task": "Add the amount column to the report table.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT);"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-table-columns",
        "label": "The report table has id, name, and amount columns",
        "kind": "sql-table-columns",
        "table": "report",
        "columns": [
          "id",
          "name",
          "amount"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the amount column to the report table definition."
      },
      {
        "level": 2,
        "text": "Use the CREATE TABLE statement to redefine the table with the new column."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);"
    },
    "estimatedMinutes": 3,
    "projectId": "carinderia-delivery-log",
    "conceptIds": [
      "sql-create-table"
    ]
  },
  {
    "id": "sql-carinderia-delivery-log-443",
    "index": 443,
    "task": "Insert the row for id 1 from source_record into report and select it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "row-1-exists",
        "label": "The row with id 1 exists in report",
        "kind": "sql-row-contains",
        "row": [
          1,
          "Adobo",
          8
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert the row from source_record where id is 1 into the report table."
      },
      {
        "level": 2,
        "text": "Then select all rows from report to verify the insertion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id = 1;\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-delivery-log",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-carinderia-delivery-log-444",
    "index": 444,
    "task": "Insert rows for ids 2 and 3 from source_record into report.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id = 1;\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "rows-1-2-3-exist",
        "label": "Rows with ids 1, 2, and 3 exist in report",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Adobo",
            8
          ],
          [
            2,
            "Sinigang",
            20
          ],
          [
            3,
            "Pancit",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Insert rows from source_record where id is in (1, 2, 3) into report."
      },
      {
        "level": 2,
        "text": "Then select all rows from report to verify the insertion."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-delivery-log",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-carinderia-delivery-log-445",
    "index": 445,
    "task": "Sort the report rows by amount in ascending order.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "sorted-by-amount",
        "label": "Rows are sorted by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            3,
            "Pancit",
            2
          ],
          [
            1,
            "Adobo",
            8
          ],
          [
            2,
            "Sinigang",
            20
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY amount ASC to the SELECT statement to sort rows by amount."
      },
      {
        "level": 2,
        "text": "Verify that the rows are ordered from lowest to highest amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-delivery-log",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: carinderia-delivery-log.
sqlCourse.steps.push(...([
  {
    "id": "sql-carinderia-delivery-log-446",
    "index": 446,
    "task": "Insert the row for id 4 from source_record into report and select it.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-has-id-4",
        "label": "Report contains row for id 4",
        "kind": "sql-row-contains",
        "row": [
          4,
          "Rice Meal",
          5
        ],
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add an INSERT statement to add the row for id 4 from source_record into report."
      },
      {
        "level": 2,
        "text": "Verify that the row for id 4 appears in the SELECT output."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-delivery-log",
    "conceptIds": [
      "sql-insert"
    ]
  },
  {
    "id": "sql-carinderia-delivery-log-447",
    "index": 447,
    "task": "Update report id 2 amount to 18.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "id-2-amount-updated",
        "label": "Report row for id 2 has amount 18",
        "kind": "sql-value-equals",
        "row": 3,
        "column": 2,
        "value": 18,
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use an UPDATE statement to change the amount for id 2 to 18."
      },
      {
        "level": 2,
        "text": "Verify that the amount for id 2 is now 18 in the SELECT output."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-delivery-log",
    "conceptIds": [
      "sql-update"
    ]
  },
  {
    "id": "sql-carinderia-delivery-log-448",
    "index": 448,
    "task": "Delete report id 3.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "id-3-deleted",
        "label": "Report does not contain row for id 3",
        "kind": "sql-row-count",
        "count": 3,
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use a DELETE statement to remove the row for id 3 from report."
      },
      {
        "level": 2,
        "text": "Verify that the SELECT output no longer contains id 3."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-delivery-log",
    "conceptIds": [
      "sql-delete"
    ]
  },
  {
    "id": "sql-carinderia-delivery-log-449",
    "index": 449,
    "task": "Count report rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "report-row-count",
        "label": "Report has 3 rows",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 3,
        "resultIndex": 0
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use a COUNT(*) statement to count the rows in report."
      },
      {
        "level": 2,
        "text": "Verify that the count is 3."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT COUNT(*) FROM report;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-delivery-log",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-carinderia-delivery-log-450",
    "index": 450,
    "task": "Show id, name, and amount ordered by id.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT COUNT(*) FROM report;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, 'Adobo', 'Local', 8, 'Open', 1), (2, 'Sinigang', 'Regional', 20, 'Done', 2), (3, 'Pancit', 'Local', 2, 'Open', 1), (4, 'Rice Meal', 'Regional', 5, 'Done', 2);",
    "tests": [
      {
        "id": "ordered-by-id",
        "label": "Rows are ordered by id ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            1,
            "Adobo",
            8
          ],
          [
            2,
            "Sinigang",
            18
          ],
          [
            4,
            "Rice Meal",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY id ASC to the SELECT statement to sort rows by id ascending."
      },
      {
        "level": 2,
        "text": "Verify that the rows are ordered from lowest to highest id."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report ORDER BY id ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "carinderia-delivery-log",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: bakery-inventory-report.
sqlCourse.projects.push({"id":"bakery-inventory-report","title":"Neighborhood Bakery Inventory Report"});
sqlCourse.steps.push(...([
  {
    "id": "sql-bakery-inventory-report-451",
    "index": 451,
    "task": "Select only the product names from the bakery inventory.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "names-list",
        "label": "The report lists all product names",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pandesal"
          ],
          [
            "Ensaymada"
          ],
          [
            "Monay"
          ],
          [
            "Hopia"
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the field that names the product."
      },
      {
        "level": 2,
        "text": "Read the name field from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name FROM record;"
    },
    "estimatedMinutes": 3,
    "projectId": "bakery-inventory-report",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-bakery-inventory-report-452",
    "index": 452,
    "task": "Add the amount column to show how many units are available.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "names-and-amounts",
        "label": "The report shows names and their amounts",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pandesal",
            8
          ],
          [
            "Ensaymada",
            20
          ],
          [
            "Monay",
            2
          ],
          [
            "Hopia",
            5
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the amount field to the SELECT list."
      },
      {
        "level": 2,
        "text": "Include the amount column from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record;"
    },
    "estimatedMinutes": 3,
    "projectId": "bakery-inventory-report",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-bakery-inventory-report-453",
    "index": 453,
    "task": "Filter the report to show only products with amount less than or equal to 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "filtered-products",
        "label": "The report shows only products with amount <= 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pandesal",
            8
          ],
          [
            "Monay",
            2
          ],
          [
            "Hopia",
            5
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter by amount."
      },
      {
        "level": 2,
        "text": "Use <= to include amounts equal to 10."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 3,
    "projectId": "bakery-inventory-report",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-bakery-inventory-report-454",
    "index": 454,
    "task": "Sort the filtered products by amount in ascending order.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "sorted-by-amount",
        "label": "The report sorts products by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Monay",
            2
          ],
          [
            "Hopia",
            5
          ],
          [
            "Pandesal",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY to sort by amount."
      },
      {
        "level": 2,
        "text": "Use ASC for ascending order."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC;"
    },
    "estimatedMinutes": 3,
    "projectId": "bakery-inventory-report",
    "conceptIds": [
      "sql-order-by"
    ]
  },
  {
    "id": "sql-bakery-inventory-report-455",
    "index": 455,
    "task": "Limit the report to only two rows for a short priority list.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "limited-to-two",
        "label": "The report limits output to two rows",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Monay",
            2
          ],
          [
            "Hopia",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT to restrict output to two rows."
      },
      {
        "level": 2,
        "text": "Use 2 as the limit value."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC LIMIT 2;"
    },
    "estimatedMinutes": 3,
    "projectId": "bakery-inventory-report",
    "conceptIds": [
      "sql-limit"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: bakery-inventory-report.
sqlCourse.steps.push(...([
  {
    "id": "sql-bakery-inventory-report-456",
    "index": 456,
    "task": "Replace the entire prior SELECT with COUNT(*) for amount <= 10 and check the scalar value 3, not the output row count.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC LIMIT 2;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "scalar-count-3",
        "label": "The report returns scalar value 3",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 3
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Replace the entire SELECT with COUNT(*) and filter by amount <= 10."
      },
      {
        "level": 2,
        "text": "Use COUNT(*) to count matching rows, not to return them."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 3,
    "projectId": "bakery-inventory-report",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-bakery-inventory-report-457",
    "index": 457,
    "task": "Alias that count as priority_count and check that exact result column heading.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "alias-priority-count",
        "label": "The report returns column priority_count",
        "kind": "sql-columns-equal",
        "columns": [
          "priority_count"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add AS priority_count to rename the count result."
      },
      {
        "level": 2,
        "text": "The column heading must be exactly priority_count."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) AS priority_count FROM record WHERE amount <= 10;"
    },
    "estimatedMinutes": 3,
    "projectId": "bakery-inventory-report",
    "conceptIds": [
      "sql-alias"
    ]
  },
  {
    "id": "sql-bakery-inventory-report-458",
    "index": 458,
    "task": "Replace the entire count query with category and SUM(amount) grouped across all four rows, giving Local 10 and Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) AS priority_count FROM record WHERE amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "grouped-local-regional",
        "label": "The report shows Local 10 and Regional 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Replace the COUNT with category and SUM(amount)."
      },
      {
        "level": 2,
        "text": "Group by category to aggregate totals per group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-inventory-report",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-bakery-inventory-report-459",
    "index": 459,
    "task": "Keep only the Regional 25 total by using HAVING above 12.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "regional-only",
        "label": "The report shows only Regional 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(amount) > 12 to filter groups by total."
      },
      {
        "level": 2,
        "text": "Only Regional 25 meets the threshold."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-inventory-report",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-bakery-inventory-report-460",
    "index": 460,
    "task": "Lower HAVING to above 8 to restore both totals and sort them largest first so Regional 25 comes before Local 10.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "sorted-regional-local",
        "label": "The report shows Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Lower HAVING to > 8 to include both groups."
      },
      {
        "level": 2,
        "text": "Add ORDER BY total_amount DESC to sort largest first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 8 ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-inventory-report",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: bakery-daily-record.
sqlCourse.projects.push({"id":"bakery-daily-record","title":"Neighborhood Bakery Daily Record"});
sqlCourse.steps.push(...([
  {
    "id": "sql-bakery-daily-record-461",
    "index": 461,
    "task": "Select the name and status of all bakery items.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows name and status for all items",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pandesal",
            "Open"
          ],
          [
            "Ensaymada",
            "Done"
          ],
          [
            "Monay",
            "Open"
          ],
          [
            "Hopia",
            "Done"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Choose the two fields requested: name and status."
      },
      {
        "level": 2,
        "text": "Use SELECT to retrieve these fields from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-daily-record"
  },
  {
    "id": "sql-bakery-daily-record-462",
    "index": 462,
    "task": "Filter to show only items with status 'Open'.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only Open items",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pandesal",
            "Open"
          ],
          [
            "Monay",
            "Open"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter by status."
      },
      {
        "level": 2,
        "text": "Use 'Open' as the exact string value for status."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open';"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-daily-record"
  },
  {
    "id": "sql-bakery-daily-record-463",
    "index": 463,
    "task": "Filter to show only items with amount less than or equal to 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only items with amount <= 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pandesal",
            "Open"
          ],
          [
            "Monay",
            "Open"
          ],
          [
            "Hopia",
            "Done"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the <= operator to include items with amount 8 or less."
      },
      {
        "level": 2,
        "text": "Check the amount column in the WHERE clause."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE amount <= 8;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-daily-record"
  },
  {
    "id": "sql-bakery-daily-record-464",
    "index": 464,
    "task": "Filter to show only items that are 'Open' AND have amount <= 8.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE amount <= 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only Open items with amount <= 8",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pandesal",
            "Open"
          ],
          [
            "Monay",
            "Open"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Combine two conditions with AND."
      },
      {
        "level": 2,
        "text": "Both status and amount must match for a row to be included."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open' AND amount <= 8;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-daily-record"
  },
  {
    "id": "sql-bakery-daily-record-465",
    "index": 465,
    "task": "Filter to show only items that are 'Done' OR have amount less than 3.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Open' AND amount <= 8;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only Done items or items with amount < 3",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Ensaymada",
            "Done"
          ],
          [
            "Monay",
            "Open"
          ],
          [
            "Hopia",
            "Done"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use OR to include items that meet either condition."
      },
      {
        "level": 2,
        "text": "Check status for 'Done' or amount for less than 3."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Done' OR amount < 3;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-daily-record"
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: bakery-daily-record.
sqlCourse.steps.push(...([
  {
    "id": "sql-bakery-daily-record-466",
    "index": 466,
    "task": "Select names beginning with the first letter of the first seeded name using LIKE.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, status FROM record WHERE status = 'Done' OR amount < 3;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows only names starting with 'P'",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pandesal"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use LIKE to match names starting with 'P'."
      },
      {
        "level": 2,
        "text": "Check the first seeded name: 'Pandesal' starts with 'P'."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name FROM record WHERE name LIKE 'P%';"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-daily-record",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-bakery-daily-record-467",
    "index": 467,
    "task": "Show name, category, and amount for Local rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name FROM record WHERE name LIKE 'P%';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report shows Local items with name, category, and amount",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pandesal",
            "Local",
            8
          ],
          [
            "Monay",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Filter for category = 'Local'."
      },
      {
        "level": 2,
        "text": "Select the three fields: name, category, amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local';"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-daily-record",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-bakery-daily-record-468",
    "index": 468,
    "task": "Include Local rows OR amount = 20.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local';"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report includes Local items and the item with amount 20",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pandesal",
            "Local",
            8
          ],
          [
            "Ensaymada",
            "Regional",
            20
          ],
          [
            "Monay",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use OR to include both Local items and the 20-amount item."
      },
      {
        "level": 2,
        "text": "Check that Ensaymada (20) is included."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-daily-record",
    "conceptIds": [
      "sql-or"
    ]
  },
  {
    "id": "sql-bakery-daily-record-469",
    "index": 469,
    "task": "Sort that three-row report by amount descending so the 20 row comes first.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report is sorted by amount descending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Ensaymada",
            "Regional",
            20
          ],
          [
            "Pandesal",
            "Local",
            8
          ],
          [
            "Monay",
            "Local",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY amount DESC to sort descending."
      },
      {
        "level": 2,
        "text": "Verify that Ensaymada (20) is first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-daily-record",
    "conceptIds": [
      "sql-order-by"
    ]
  },
  {
    "id": "sql-bakery-daily-record-470",
    "index": 470,
    "task": "Limit it to the first 2 rows.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The report is limited to the first 2 rows",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Ensaymada",
            "Regional",
            20
          ],
          [
            "Pandesal",
            "Local",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add LIMIT 2 to restrict output to two rows."
      },
      {
        "level": 2,
        "text": "Verify that Ensaymada (20) and Pandesal (8) are shown."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC LIMIT 2;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-daily-record",
    "conceptIds": [
      "sql-limit"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: bakery-service-queue.
sqlCourse.projects.push({"id":"bakery-service-queue","title":"Neighborhood Bakery Service Queue"});
sqlCourse.steps.push(...([
  {
    "id": "sql-bakery-service-queue-471",
    "index": 471,
    "task": "Count all rows in the bakery service queue.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "count-all-rows",
        "label": "The count of all rows is 4",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use COUNT(*) to count all rows in the table."
      },
      {
        "level": 2,
        "text": "The result is a single scalar value."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-service-queue",
    "conceptIds": [
      "sql-count"
    ]
  },
  {
    "id": "sql-bakery-service-queue-472",
    "index": 472,
    "task": "Name the count as record_count.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "named-count",
        "label": "The count is named record_count",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 4
      },
      {
        "id": "alias-heading",
        "label": "The result column is named record_count",
        "kind": "sql-columns-equal",
        "columns": [
          "record_count"
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AS to rename the count column to record_count."
      },
      {
        "level": 2,
        "text": "The result is a single scalar value."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT COUNT(*) AS record_count FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-service-queue",
    "conceptIds": [
      "sql-alias"
    ]
  },
  {
    "id": "sql-bakery-service-queue-473",
    "index": 473,
    "task": "Calculate the total amount of all items.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT COUNT(*) AS record_count FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "total-amount",
        "label": "The total amount is 35",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 35
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(amount) to calculate the total amount."
      },
      {
        "level": 2,
        "text": "The result is a single scalar value."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT SUM(amount) AS total_amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-service-queue",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-bakery-service-queue-474",
    "index": 474,
    "task": "Calculate the average amount of all items.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT SUM(amount) AS total_amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "average-amount",
        "label": "The average amount is 8.75",
        "kind": "sql-value-equals",
        "row": 0,
        "column": 0,
        "value": 8.75
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use AVG(amount) to calculate the average amount."
      },
      {
        "level": 2,
        "text": "The result is a single scalar value."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT AVG(amount) AS average_amount FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-service-queue",
    "conceptIds": [
      "sql-average"
    ]
  },
  {
    "id": "sql-bakery-service-queue-475",
    "index": 475,
    "task": "Select category and count of items grouped by category.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT AVG(amount) AS average_amount FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "grouped-by-category",
        "label": "Local has 2 items, Regional has 2 items",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            2
          ],
          [
            "Regional",
            2
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use GROUP BY category to group rows by category."
      },
      {
        "level": 2,
        "text": "Use COUNT(*) to count items in each group."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, COUNT(*) AS record_count FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-service-queue",
    "conceptIds": [
      "sql-group-by"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: bakery-service-queue.
sqlCourse.steps.push(...([
  {
    "id": "sql-bakery-service-queue-476",
    "index": 476,
    "task": "Change the grouped calculation to SUM(amount) as total_amount, giving Local 10 and Regional 25.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, COUNT(*) AS record_count FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "sum-by-category",
        "label": "Local has total 10, Regional has total 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use SUM(amount) to calculate the total amount per category."
      },
      {
        "level": 2,
        "text": "Replace COUNT(*) with SUM(amount) and alias it as total_amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-service-queue",
    "conceptIds": [
      "sql-sum"
    ]
  },
  {
    "id": "sql-bakery-service-queue-477",
    "index": 477,
    "task": "Sort both group totals descending so Regional 25 comes first.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "sorted-descending",
        "label": "Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort totals from highest to lowest."
      },
      {
        "level": 2,
        "text": "The result should show Regional first, then Local."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-service-queue",
    "conceptIds": [
      "sql-descending"
    ]
  },
  {
    "id": "sql-bakery-service-queue-478",
    "index": 478,
    "task": "Keep only totals above 12 with HAVING.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "filtered-having",
        "label": "Regional 25 only",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add HAVING SUM(amount) > 12 to filter groups with totals above 12."
      },
      {
        "level": 2,
        "text": "Only Regional remains because 25 > 12, but 10 is not."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-service-queue",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-bakery-service-queue-479",
    "index": 479,
    "task": "Remove HAVING to restore both complete category totals.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "restored-grouped",
        "label": "Local 10 and Regional 25",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Local",
            10
          ],
          [
            "Regional",
            25
          ]
        ],
        "ignoreOrder": true
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Remove the HAVING clause to show all categories again."
      },
      {
        "level": 2,
        "text": "The result should return both Local and Regional totals."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-service-queue",
    "conceptIds": [
      "sql-having"
    ]
  },
  {
    "id": "sql-bakery-service-queue-480",
    "index": 480,
    "task": "Order those two restored totals from largest to smallest.",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "final-sorted",
        "label": "Regional 25 then Local 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Regional",
            25
          ],
          [
            "Local",
            10
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add ORDER BY total_amount DESC to sort the restored totals."
      },
      {
        "level": 2,
        "text": "Regional should appear first because 25 > 10."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-service-queue",
    "conceptIds": [
      "sql-descending"
    ]
  }
] satisfies typeof sqlCourse.steps));

// Validated local authoring batch: bakery-supplier-list.
sqlCourse.projects.push({"id":"bakery-supplier-list","title":"Neighborhood Bakery Supplier List"});
sqlCourse.steps.push(...([
  {
    "id": "sql-bakery-supplier-list-481",
    "index": 481,
    "task": "Read record.name and record.group_id with qualified names",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": ""
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains record.name and record.group_id",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pandesal",
            1
          ],
          [
            "Ensaymada",
            2
          ],
          [
            "Monay",
            1
          ],
          [
            "Hopia",
            2
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use qualified column names to specify which table each field comes from."
      },
      {
        "level": 2,
        "text": "The solution selects only the name and group_id columns from the record table."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-supplier-list",
    "conceptIds": [
      "sql-select"
    ]
  },
  {
    "id": "sql-bakery-supplier-list-482",
    "index": 482,
    "task": "Join group_info on matching group ids and show record name plus group label",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, record.group_id FROM record;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains record.name and group_info.label",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pandesal",
            "North Team"
          ],
          [
            "Ensaymada",
            "South Team"
          ],
          [
            "Monay",
            "North Team"
          ],
          [
            "Hopia",
            "South Team"
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use an INNER JOIN to combine record and group_info tables where group_id matches id."
      },
      {
        "level": 2,
        "text": "The solution selects the record name and group label from the joined tables."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 5,
    "projectId": "bakery-supplier-list",
    "conceptIds": [
      "sql-inner-join"
    ]
  },
  {
    "id": "sql-bakery-supplier-list-483",
    "index": 483,
    "task": "Add amount to the joined report",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains record.name, group_info.label, and record.amount",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pandesal",
            "North Team",
            8
          ],
          [
            "Ensaymada",
            "South Team",
            20
          ],
          [
            "Monay",
            "North Team",
            2
          ],
          [
            "Hopia",
            "South Team",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the amount column from the record table to the SELECT list."
      },
      {
        "level": 2,
        "text": "The solution includes the amount value for each supplier."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-supplier-list",
    "conceptIds": [
      "sql-qualified-column"
    ]
  },
  {
    "id": "sql-bakery-supplier-list-484",
    "index": 484,
    "task": "Filter joined rows to amount <= 10",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result contains only rows where amount <= 10",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Pandesal",
            "North Team",
            8
          ],
          [
            "Monay",
            "North Team",
            2
          ],
          [
            "Hopia",
            "South Team",
            5
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a WHERE clause to filter rows where amount is less than or equal to 10."
      },
      {
        "level": 2,
        "text": "The solution removes Ensaymada (20) from the result."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-supplier-list",
    "conceptIds": [
      "sql-filter"
    ]
  },
  {
    "id": "sql-bakery-supplier-list-485",
    "index": 485,
    "task": "Sort filtered joined rows by amount ascending",
    "kind": "sql",
    "inputMode": "free",
    "files": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10;"
    },
    "activeFile": "query.sql",
    "sqlSeed": "CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, 'Pandesal', 'Local', 8, 'Open', 1), (2, 'Ensaymada', 'Regional', 20, 'Done', 2), (3, 'Monay', 'Local', 2, 'Open', 1), (4, 'Hopia', 'Regional', 5, 'Done', 2);\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');",
    "tests": [
      {
        "id": "result",
        "label": "The result is sorted by amount ascending",
        "kind": "sql-rows-equal",
        "rows": [
          [
            "Monay",
            "North Team",
            2
          ],
          [
            "Hopia",
            "South Team",
            5
          ],
          [
            "Pandesal",
            "North Team",
            8
          ]
        ],
        "ignoreOrder": false
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add an ORDER BY clause to sort the filtered rows by amount in ascending order."
      },
      {
        "level": 2,
        "text": "The solution sorts Monay (2), Hopia (5), and Pandesal (8) by amount."
      }
    ],
    "xp": 10,
    "solution": {
      "query.sql": "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10 ORDER BY record.amount ASC;"
    },
    "estimatedMinutes": 4,
    "projectId": "bakery-supplier-list",
    "conceptIds": [
      "sql-order-by"
    ]
  }
] satisfies typeof sqlCourse.steps));
