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
