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
