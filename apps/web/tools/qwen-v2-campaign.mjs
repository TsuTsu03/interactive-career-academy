import "./content-loader.mjs";
const { curriculum } = await import("../content/curriculum.ts");
const { concepts } = await import("../content/concepts.ts");

const sqlSectors = [
  ["sari-sari", "Sari-Sari Store", ["Rice", "Soap", "Cooking Oil", "Egg"]],
  ["palengke", "Palengke Stall", ["Tomatoes", "Eggplant", "Carrots", "Cabbage"]],
  ["jeepney", "Jeepney Dispatch", ["Cubao", "Quiapo", "Divisoria", "Marikina"]],
  ["barangay-clinic", "Barangay Clinic", ["Consultation", "Vaccination", "Checkup", "Medicine"]],
  ["public-school", "Public School", ["Notebook", "Pencil", "Ruler", "Paper"]],
  ["cooperative", "Community Cooperative", ["Rice Loan", "Seed Fund", "Tool Share", "Market Stall"]],
  ["carinderia", "Carinderia", ["Adobo", "Sinigang", "Pancit", "Rice Meal"]],
  ["bakery", "Neighborhood Bakery", ["Pandesal", "Ensaymada", "Monay", "Hopia"]],
  ["rice-mill", "Rice Mill", ["Dinorado", "Sinandomeng", "Malagkit", "Brown Rice"]],
  ["fishing-harbor", "Fishing Harbor", ["Bangus", "Tilapia", "Galunggong", "Tuna"]],
  ["water-station", "Water Refill Station", ["Refill", "Container", "Delivery", "Dispenser"]],
  ["ukay-ukay", "Ukay-Ukay Shop", ["Shirt", "Jeans", "Jacket", "Dress"]],
];
const activities = ["Inventory Report", "Daily Record", "Service Queue", "Supplier List", "Community Schedule", "Delivery Log"];
const sqlProjects = sqlSectors.flatMap(([slug, title, names]) => activities.map((activity) => ({
  id: `${slug}-${activity.toLowerCase().replaceAll(" ", "-")}`,
  title: `${title} ${activity}`,
  context: title,
  names,
})));

const sqlTracks = [
  {
    name: "filtered report",
    concepts: "sql-select, sql-filter, sql-order-by, sql-limit, sql-count, sql-alias, sql-sum, sql-group-by, sql-having, sql-descending",
    first: "1 select name only; 2 add amount; 3 keep both columns and filter amount <= 10; 4 keep the filter and sort amount ascending; 5 keep that query and limit to 2 rows for a short priority list",
    second: "6 replace the entire prior SELECT with COUNT(*) for amount <= 10 and check the scalar value 3, not the output row count; 7 alias that count as priority_count and check that exact result column heading; 8 replace the entire count query with category and SUM(amount) grouped across all four rows, giving Local 10 and Regional 25; 9 keep only the Regional 25 total by using HAVING above 12; 10 lower HAVING to above 8 to restore both totals and sort them largest first so Regional 25 comes before Local 10",
  },
  {
    name: "conditions report",
    concepts: "sql-select, sql-filter, sql-or, sql-like, sql-order-by, sql-limit",
    first: "1 select name and status; 2 keep status Open; 3 instead keep amount <= 8; 4 keep rows that are Open AND amount <= 8; 5 keep rows that are Done OR amount < 3",
    second: "6 select names beginning with the first letter of the first seeded name using LIKE; 7 show name, category, and amount for Local rows; 8 include Local rows OR amount = 20; 9 sort that three-row report by amount descending so the 20 row comes first; 10 limit it to the first 2 rows",
  },
  {
    name: "aggregate report",
    concepts: "sql-select, sql-count, sql-alias, sql-sum, sql-average, sql-group-by, sql-having, sql-descending",
    first: "1 count all rows; 2 name the count record_count; 3 calculate SUM(amount) as total_amount; 4 calculate AVG(amount) as average_amount; 5 select category and COUNT(*) grouped by category",
    second: "6 change the grouped calculation to SUM(amount) as total_amount, giving Local 10 and Regional 25; 7 sort both group totals descending; 8 keep only totals above 12 with HAVING; 9 remove HAVING to restore both complete category totals; 10 order those two restored totals from largest to smallest",
  },
  {
    name: "inner join report",
    concepts: "sql-select, sql-qualified-column, sql-inner-join, sql-filter, sql-order-by, sql-count, sql-sum, sql-group-by, sql-having, sql-descending, sql-limit",
    first: "1 read record.name and record.group_id with qualified names; 2 join group_info on matching group ids and show record name plus group label; 3 add amount; 4 filter joined rows to amount <= 10; 5 sort filtered joined rows by amount ascending",
    second: "6 count records for each group label; 7 sum amount for each group label; 8 keep only group sums above 12 with HAVING; 9 remove HAVING to restore both groups and sort their sums descending; 10 limit the restored grouped report to the largest group",
  },
  {
    name: "left join report",
    concepts: "sql-select, sql-qualified-column, sql-left-join, sql-null, sql-coalesce, sql-filter, sql-order-by, sql-count, sql-group-by, sql-sum, sql-having, sql-descending",
    first: "1 select record name and group id; 2 LEFT JOIN group_info and show every record with its group label; 3 use COALESCE to display Unassigned for the missing group; 4 filter for the row whose group_id IS NULL; 5 switch back to all rows and sort by the displayed group label",
    second: "6 count every record after the LEFT JOIN; 7 count records per displayed group label; 8 sum amount per displayed group label; 9 keep displayed groups whose sum exceeds 8; 10 order those group sums descending",
    missingGroup: true,
  },
  {
    name: "data changes",
    concepts: "sql-select, sql-insert, sql-update, sql-delete, sql-filter, sql-count, sql-order-by",
    first: "1 select id, name, and amount; 2 INSERT id 5 named New Record with category Local, amount 7, status Open, group_id 1, then read all rows; 3 UPDATE only id 5 amount to 9, then read it; 4 UPDATE only id 2 status to Open, then read id 2; 5 DELETE only id 4, then read remaining ids and names",
    second: "6 insert id 6 named Backup Record with amount 4 and read it; 7 update id 6 category to Regional and read it; 8 delete id 1 and read remaining rows; 9 count all remaining rows; 10 show remaining names and amounts sorted by amount ascending",
  },
  {
    name: "schema and rows",
    concepts: "sql-create-table, sql-insert, sql-update, sql-delete, sql-select, sql-order-by, sql-count",
    first: "The seed provides source_record only. 1 CREATE TABLE report with id INTEGER and name TEXT; 2 add amount INTEGER to that CREATE TABLE definition; 3 INSERT one row copied from source_record id 1, then read report; 4 insert source rows ids 2 and 3 too; 5 sort report rows by amount ascending",
    second: "6 insert source row id 4; 7 update report id 2 amount to 18; 8 delete report id 3; 9 count report rows; 10 show id, name, and amount ordered by id",
    sourceOnly: true,
  },
];

const nosqlContexts = [
  ["sari-sari-stock", "Sari-Sari Stock", ["Rice", "Soap", "Cooking Oil", "Egg"]],
  ["palengke-document-orders", "Palengke Document Orders", ["Tomatoes", "Eggplant", "Carrots", "Cabbage"]],
  ["cebu-route-deliveries", "Cebu Route Deliveries", ["Lahug", "Mandaue", "Lapu-Lapu", "Talisay"]],
  ["barangay-services", "Barangay Services", ["Clearance", "Health Check", "Permit", "Senior Aid"]],
  ["school-supplies", "School Supplies", ["Notebook", "Pencil", "Ruler", "Paper"]],
  ["cooperative-records", "Cooperative Records", ["Rice Loan", "Seed Fund", "Tool Share", "Market Stall"]],
  ["carinderia-menu", "Carinderia Menu", ["Adobo", "Sinigang", "Pancit", "Rice Meal"]],
  ["bakery-orders", "Bakery Orders", ["Pandesal", "Ensaymada", "Monay", "Hopia"]],
  ["rice-mill-batches", "Rice Mill Batches", ["Dinorado", "Sinandomeng", "Malagkit", "Brown Rice"]],
  ["fishing-catch", "Fishing Catch", ["Bangus", "Tilapia", "Galunggong", "Tuna"]],
  ["water-refills", "Water Refills", ["Refill", "Container", "Delivery", "Dispenser"]],
  ["ukay-listings", "Ukay-Ukay Listings", ["Shirt", "Jeans", "Jacket", "Dress"]],
  ["tricycle-queue", "Tricycle Queue", ["Market", "School", "Clinic", "Terminal"]],
  ["farm-harvest", "Farm Harvest", ["Mango", "Banana", "Coconut", "Papaya"]],
  ["community-library", "Community Library", ["History", "Science", "Stories", "Comics"]],
  ["medicine-stock", "Medicine Stock", ["Paracetamol", "Vitamin C", "Bandage", "Alcohol"]],
  ["relief-packs", "Relief Packs", ["Rice Pack", "Water", "Blanket", "Soap"]],
  ["laundry-jobs", "Laundry Jobs", ["Wash", "Dry", "Fold", "Pickup"]],
  ["repair-tickets", "Repair Tickets", ["Phone", "Fan", "Radio", "Lamp"]],
  ["tour-bookings", "Local Tour Bookings", ["Museum", "River", "Market", "Park"]],
  ["garden-plants", "Community Garden", ["Tomato", "Pechay", "Okra", "Herbs"]],
  ["recycling-pickups", "Recycling Pickups", ["Paper", "Plastic", "Glass", "Metal"]],
  ["food-pantry", "Food Pantry", ["Rice", "Beans", "Noodles", "Milk"]],
].map(([id, title, names]) => ({ id, title, names }));

const nosqlTracks = [
  ["document report", "nosql-document, nosql-projection, nosql-filter, nosql-sort, nosql-limit",
    "1 find every document; 2 project name only; 3 add amount to the projection; 4 filter amount <= 10; 5 sort those filtered documents by amount ascending",
    "6 limit the sorted result to 2; 7 change the filter to amount > 5; 8 sort that result descending; 9 project name only while keeping the filter and sort; 10 limit to 1"],
  ["logical filters", "nosql-equality, nosql-not-equal, nosql-upper-bound, nosql-lower-bound, nosql-and, nosql-or, nosql-in",
    "1 find status equal to Open; 2 instead find status not equal to Open; 3 find amount <= 8; 4 find amount >= 8; 5 use $and for status Open and amount <= 8",
    "6 use $or for status Done or amount < 3; 7 use $in for category Local or Regional; 8 project name and amount from that result; 9 sort by amount ascending; 10 limit to 3"],
  ["insert and read", "nosql-insert, nosql-command-sequence, nosql-projection, nosql-filter",
    "1 insert one document named New Record with category Local, amount 7, status Open; 2 add a note field to that inserted document; 3 insert a second document named Backup Record with amount 4; 4 use a command sequence to insert both then find all records; 5 project name and amount in the final find",
    "6 filter the final find to amount <= 7; 7 sort those documents by amount; 8 limit to 2; 9 change the second inserted document status to Done in its source document and find Done records; 10 project only name and status from the Done result"],
  ["embedded document view", "nosql-document, nosql-projection, nosql-filter, nosql-sort",
    "The seed documents include a top-level details object but queries operate on top-level fields. 1 find all documents and observe the embedded details; 2 project name and details; 3 add amount to the projection; 4 filter top-level category equal to Local; 5 sort those Local documents by amount",
    "6 limit the two sorted Local documents to 1; 7 switch the filter to status Open and remove the limit so two documents return; 8 project name and status; 9 sort the two Open documents by amount descending; 10 limit to the first 1. Explain in the tasks that embedding keeps related details together but large repeated data can be costly"],
  ["reference record view", "nosql-document, nosql-projection, nosql-filter, nosql-in",
    "The seed has records with groupId references and a separate groups collection. The runner has no join. 1 find all records; 2 project name and groupId; 3 filter groupId equal to 1; 4 sort the two matching records by amount; 5 limit to 1",
    "6 query the groups collection instead and find all group documents; 7 project group id and label; 8 sort the two groups by label descending; 9 use $in to keep only group id 1; 10 project only the label from that one group. State plainly that relational SQL is usually better when many reports must combine changing referenced records"],
];

function sqlExpected(track, project, batch) {
  const [a, b, c, d] = project.names;
  const likeNames = project.names.filter((name) => name[0].toLowerCase() === a[0].toLowerCase()).join(", ");
  const expectations = {
    "filtered report": [
      `1 names ${a}, ${b}, ${c}, ${d}; 2 those names with amounts 8, 20, 2, 5; 3 ${a} 8, ${c} 2, ${d} 5; 4 ${c} 2, ${d} 5, ${a} 8; 5 ${c} 2, ${d} 5`,
      "6 scalar value 3 in one output row; 7 the same value under the exact column priority_count; 8 Local 10 then Regional 25; 9 Regional 25 only; 10 Regional 25 then Local 10",
    ],
    "conditions report": [
      `1 ${a} Open, ${b} Done, ${c} Open, ${d} Done; 2 ${a}, ${c}; 3 ${a}, ${c}, ${d}; 4 ${a}, ${c}; 5 ${b}, ${c}, ${d}`,
      `6 ${likeNames}; 7 ${a} 8 and ${c} 2; 8 ${a} 8, ${b} 20, ${c} 2; 9 ${b} 20, ${a} 8, ${c} 2; 10 ${b} 20, ${a} 8`,
    ],
    "aggregate report": [
      "1 scalar 4 checked with sql-value-equals at row 0 column 0; 2 the same scalar 4 under record_count; 3 scalar 35 under total_amount; 4 scalar 8.75 under average_amount; 5 Local 2 and Regional 2 checked with sql-rows-equal and ignoreOrder true, with no ORDER BY because the counts are tied",
      "6 Local 10 and Regional 25; 7 Regional 25 then Local 10; 8 Regional 25 only; 9 Local 10 and Regional 25; 10 Regional 25 then Local 10",
    ],
    "inner join report": [
      `1 ${a} 1, ${b} 2, ${c} 1, ${d} 2; 2 ${a} North Team, ${b} South Team, ${c} North Team, ${d} South Team; 3 add amounts 8, 20, 2, 5; 4 ${a} 8, ${c} 2, ${d} 5; 5 ${c} 2, ${d} 5, ${a} 8`,
      "6 North Team 2 and South Team 2; 7 North Team 10 and South Team 25; 8 South Team 25 only; 9 South Team 25 then North Team 10; 10 South Team 25 only",
    ],
    "left join report": [
      `1 four names with group ids 1, 2, 1, NULL; 2 labels North Team, South Team, North Team, NULL; 3 the last label becomes Unassigned; 4 ${d} only; 5 all four rows ordered North Team, North Team, South Team, Unassigned`,
      "6 scalar 4; 7 North Team 2, South Team 1, Unassigned 1; 8 North Team 10, South Team 20, Unassigned 5; 9 North Team 10 and South Team 20; 10 South Team 20 then North Team 10",
    ],
    "data changes": [
      `1 ids 1-4 with amounts 8, 20, 2, 5; 2 ids 1-5 including New Record 7; 3 New Record 9 only; 4 ${b} status Open only; 5 remaining ids 1, 2, 3, 5`,
      `6 Backup Record id 6 amount 4; 7 that row with category Regional; 8 remaining ids 2, 3, 5, 6; 9 scalar 4; 10 ${c} 2, Backup Record 4, New Record 9, ${b} 20`,
    ],
    "schema and rows": [
      `1 report exists with id and name; 2 report also has amount; 3 id 1 ${a} 8; 4 ids 1-3; 5 ${c} 2, ${a} 8, ${b} 20`,
      `6 ${c} 2, ${d} 5, ${a} 8, ${b} 20; 7 ${c} 2, ${d} 5, ${a} 8, ${b} 18; 8 ${d} 5, ${a} 8, ${b} 18; 9 scalar 3; 10 ids 1 ${a} 8, 2 ${b} 18, 4 ${d} 5`,
    ],
  };
  return expectations[track.name][batch - 1];
}

function sqlSeed(track, project) {
  const quote = (value) => value.replaceAll("'", "''");
  const [a, b, c, d] = project.names.map(quote);
  if (track.sourceOnly) {
    return `CREATE TABLE source_record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO source_record VALUES (1, '${a}', 'Local', 8, 'Open', 1), (2, '${b}', 'Regional', 20, 'Done', 2), (3, '${c}', 'Local', 2, 'Open', 1), (4, '${d}', 'Regional', 5, 'Done', 2);`;
  }
  const fourthGroup = track.missingGroup ? "NULL" : "2";
  return `CREATE TABLE record (id INTEGER, name TEXT, category TEXT, amount INTEGER, status TEXT, group_id INTEGER);\nINSERT INTO record VALUES (1, '${a}', 'Local', 8, 'Open', 1), (2, '${b}', 'Regional', 20, 'Done', 2), (3, '${c}', 'Local', 2, 'Open', 1), (4, '${d}', 'Regional', 5, 'Done', ${fourthGroup});\nCREATE TABLE group_info (id INTEGER, label TEXT);\nINSERT INTO group_info VALUES (1, 'North Team'), (2, 'South Team');`;
}

function sqlSolutions(track, project, batch) {
  const firstLetter = project.names[0][0].replaceAll("'", "''");
  const solutions = {
    "filtered report": [
      "SELECT name FROM record;",
      "SELECT name, amount FROM record;",
      "SELECT name, amount FROM record WHERE amount <= 10;",
      "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC;",
      "SELECT name, amount FROM record WHERE amount <= 10 ORDER BY amount ASC LIMIT 2;",
      "SELECT COUNT(*) FROM record WHERE amount <= 10;",
      "SELECT COUNT(*) AS priority_count FROM record WHERE amount <= 10;",
      "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;",
      "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;",
      "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 8 ORDER BY total_amount DESC;",
    ],
    "conditions report": [
      "SELECT name, status FROM record;",
      "SELECT name, status FROM record WHERE status = 'Open';",
      "SELECT name, status FROM record WHERE amount <= 8;",
      "SELECT name, status FROM record WHERE status = 'Open' AND amount <= 8;",
      "SELECT name, status FROM record WHERE status = 'Done' OR amount < 3;",
      `SELECT name FROM record WHERE name LIKE '${firstLetter}%';`,
      "SELECT name, category, amount FROM record WHERE category = 'Local';",
      "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20;",
      "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC;",
      "SELECT name, category, amount FROM record WHERE category = 'Local' OR amount = 20 ORDER BY amount DESC LIMIT 2;",
    ],
    "aggregate report": [
      "SELECT COUNT(*) FROM record;",
      "SELECT COUNT(*) AS record_count FROM record;",
      "SELECT SUM(amount) AS total_amount FROM record;",
      "SELECT AVG(amount) AS average_amount FROM record;",
      "SELECT category, COUNT(*) AS record_count FROM record GROUP BY category;",
      "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;",
      "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;",
      "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category HAVING SUM(amount) > 12;",
      "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category;",
      "SELECT category, SUM(amount) AS total_amount FROM record GROUP BY category ORDER BY total_amount DESC;",
    ],
    "inner join report": [
      "SELECT record.name, record.group_id FROM record;",
      "SELECT record.name, group_info.label FROM record JOIN group_info ON group_info.id = record.group_id;",
      "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id;",
      "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10;",
      "SELECT record.name, group_info.label, record.amount FROM record JOIN group_info ON group_info.id = record.group_id WHERE record.amount <= 10 ORDER BY record.amount ASC;",
      "SELECT group_info.label, COUNT(*) AS record_count FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;",
      "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label;",
      "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label HAVING SUM(record.amount) > 12;",
      "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC;",
      "SELECT group_info.label, SUM(record.amount) AS total_amount FROM record JOIN group_info ON group_info.id = record.group_id GROUP BY group_info.label ORDER BY total_amount DESC LIMIT 1;",
    ],
    "left join report": [
      "SELECT record.name, record.group_id FROM record;",
      "SELECT record.name, group_info.label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;",
      "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id;",
      "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id WHERE record.group_id IS NULL;",
      "SELECT record.name, COALESCE(group_info.label, 'Unassigned') AS group_label FROM record LEFT JOIN group_info ON group_info.id = record.group_id ORDER BY group_label ASC;",
      "SELECT COUNT(*) FROM record LEFT JOIN group_info ON group_info.id = record.group_id;",
      "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, COUNT(*) AS record_count FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;",
      "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label;",
      "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8;",
      "SELECT COALESCE(group_info.label, 'Unassigned') AS group_label, SUM(record.amount) AS total_amount FROM record LEFT JOIN group_info ON group_info.id = record.group_id GROUP BY group_label HAVING SUM(record.amount) > 8 ORDER BY total_amount DESC;",
    ],
    "data changes": [
      "SELECT id, name, amount FROM record;",
      "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nSELECT id, name, amount FROM record;",
      "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nSELECT id, name, amount FROM record WHERE id = 5;",
      "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nSELECT id, name, status FROM record WHERE id = 2;",
      "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nSELECT id, name FROM record;",
      "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nSELECT id, name, amount FROM record WHERE id = 6;",
      "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nSELECT id, name, category, amount FROM record WHERE id = 6;",
      "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT id, name, amount FROM record;",
      "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT COUNT(*) FROM record;",
      "INSERT INTO record VALUES (5, 'New Record', 'Local', 7, 'Open', 1);\nUPDATE record SET amount = 9 WHERE id = 5;\nUPDATE record SET status = 'Open' WHERE id = 2;\nDELETE FROM record WHERE id = 4;\nINSERT INTO record VALUES (6, 'Backup Record', 'Local', 4, 'Open', 1);\nUPDATE record SET category = 'Regional' WHERE id = 6;\nDELETE FROM record WHERE id = 1;\nSELECT name, amount FROM record ORDER BY amount ASC;",
    ],
    "schema and rows": [
      "CREATE TABLE report (id INTEGER, name TEXT);",
      "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);",
      "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id = 1;\nSELECT id, name, amount FROM report;",
      "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report;",
      "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record WHERE id IN (1, 2, 3);\nSELECT id, name, amount FROM report ORDER BY amount ASC;",
      "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nSELECT id, name, amount FROM report ORDER BY amount ASC;",
      "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nSELECT id, name, amount FROM report ORDER BY amount ASC;",
      "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report ORDER BY amount ASC;",
      "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT COUNT(*) FROM report;",
      "CREATE TABLE report (id INTEGER, name TEXT, amount INTEGER);\nINSERT INTO report SELECT id, name, amount FROM source_record;\nUPDATE report SET amount = 18 WHERE id = 2;\nDELETE FROM report WHERE id = 3;\nSELECT id, name, amount FROM report ORDER BY id ASC;",
    ],
  };
  const all = solutions[track.name];
  return all.slice(batch === 1 ? 0 : 5, batch === 1 ? 5 : 10);
}

function nosqlSeed(project) {
  const [a, b, c, d] = project.names;
  const details = { source: "Community", checked: true };
  return {
    records: [
      { id: 1, name: a, category: "Local", amount: 8, status: "Open", groupId: 1, details },
      { id: 2, name: b, category: "Regional", amount: 20, status: "Done", groupId: 2, details },
      { id: 3, name: c, category: "Local", amount: 2, status: "Open", groupId: 1, details },
      { id: 4, name: d, category: "Regional", amount: 5, status: "Done", groupId: 2, details },
    ],
    groups: [
      { id: 1, label: "North Team", area: "North" },
      { id: 2, label: "South Team", area: "South" },
    ],
  };
}

function nosqlSolutions(track, project, batch) {
  const command = (value) => JSON.stringify(value);
  const inserted = [
    { name: "New Record", category: "Local", amount: 7, status: "Open", note: "Community order" },
    { name: "Backup Record", category: "Local", amount: 4, status: "Open" },
  ];
  const changed = [inserted[0], { ...inserted[1], status: "Done" }];
  const records = (options = {}) => ({ collection: "records", operation: "find", ...options });
  const groups = (options = {}) => ({ collection: "groups", operation: "find", ...options });
  const insert = (documents) => ({ collection: "records", operation: "insert", documents });
  const solutions = {
    "document report": [
      command(records()), command(records({ projection: ["name"] })), command(records({ projection: ["name", "amount"] })),
      command(records({ projection: ["name", "amount"], filter: { amount: { $lte: 10 } } })),
      command(records({ projection: ["name", "amount"], filter: { amount: { $lte: 10 } }, sort: { amount: 1 } })),
      command(records({ projection: ["name", "amount"], filter: { amount: { $lte: 10 } }, sort: { amount: 1 }, limit: 2 })),
      command(records({ projection: ["name", "amount"], filter: { amount: { $gt: 5 } }, sort: { amount: 1 }, limit: 2 })),
      command(records({ projection: ["name", "amount"], filter: { amount: { $gt: 5 } }, sort: { amount: -1 }, limit: 2 })),
      command(records({ projection: ["name"], filter: { amount: { $gt: 5 } }, sort: { amount: -1 }, limit: 2 })),
      command(records({ projection: ["name"], filter: { amount: { $gt: 5 } }, sort: { amount: -1 }, limit: 1 })),
    ],
    "logical filters": [
      command(records({ filter: { status: { $eq: "Open" } } })), command(records({ filter: { status: { $ne: "Open" } } })),
      command(records({ filter: { amount: { $lte: 8 } } })), command(records({ filter: { amount: { $gte: 8 } } })),
      command(records({ filter: { $and: [{ status: "Open" }, { amount: { $lte: 8 } }] } })),
      command(records({ filter: { $or: [{ status: "Done" }, { amount: { $lt: 3 } }] } })),
      command(records({ filter: { category: { $in: ["Local", "Regional"] } } })),
      command(records({ filter: { category: { $in: ["Local", "Regional"] } }, projection: ["name", "amount"] })),
      command(records({ filter: { category: { $in: ["Local", "Regional"] } }, projection: ["name", "amount"], sort: { amount: 1 } })),
      command(records({ filter: { category: { $in: ["Local", "Regional"] } }, projection: ["name", "amount"], sort: { amount: 1 }, limit: 3 })),
    ],
    "insert and read": [
      command(insert([{ ...inserted[0], note: undefined }])).replace(',"note":null', ""), command(insert([inserted[0]])), command(insert(inserted)),
      command([insert(inserted), records()]), command([insert(inserted), records({ projection: ["name", "amount"] })]),
      command([insert(inserted), records({ projection: ["name", "amount"], filter: { amount: { $lte: 7 } } })]),
      command([insert(inserted), records({ projection: ["name", "amount"], filter: { amount: { $lte: 7 } }, sort: { amount: 1 } })]),
      command([insert(inserted), records({ projection: ["name", "amount"], filter: { amount: { $lte: 7 } }, sort: { amount: 1 }, limit: 2 })]),
      command([insert(changed), records({ filter: { status: "Done" } })]), command([insert(changed), records({ filter: { status: "Done" }, projection: ["name", "status"] })]),
    ],
    "embedded document view": [
      command(records()), command(records({ projection: ["name", "details"] })), command(records({ projection: ["name", "details", "amount"] })),
      command(records({ projection: ["name", "details", "amount"], filter: { category: "Local" } })),
      command(records({ projection: ["name", "details", "amount"], filter: { category: "Local" }, sort: { amount: 1 } })),
      command(records({ projection: ["name", "details", "amount"], filter: { category: "Local" }, sort: { amount: 1 }, limit: 1 })),
      command(records({ projection: ["name", "details", "amount"], filter: { status: "Open" }, sort: { amount: 1 } })),
      command(records({ projection: ["name", "status"], filter: { status: "Open" }, sort: { amount: 1 } })),
      command(records({ projection: ["name", "status"], filter: { status: "Open" }, sort: { amount: -1 } })),
      command(records({ projection: ["name", "status"], filter: { status: "Open" }, sort: { amount: -1 }, limit: 1 })),
    ],
    "reference record view": [
      command(records()), command(records({ projection: ["name", "groupId"] })), command(records({ projection: ["name", "groupId"], filter: { groupId: 1 } })),
      command(records({ projection: ["name", "groupId"], filter: { groupId: 1 }, sort: { amount: 1 } })),
      command(records({ projection: ["name", "groupId"], filter: { groupId: 1 }, sort: { amount: 1 }, limit: 1 })),
      command(groups()), command(groups({ projection: ["id", "label"] })), command(groups({ projection: ["id", "label"], sort: { label: -1 } })),
      command(groups({ projection: ["id", "label"], sort: { label: -1 }, filter: { id: { $in: [1] } } })),
      command(groups({ projection: ["label"], sort: { label: -1 }, filter: { id: { $in: [1] } } })),
    ],
  };
  const all = solutions[track[0]];
  return all.slice(batch === 1 ? 0 : 5, batch === 1 ? 5 : 10);
}

function nosqlExpected(track, project, batch) {
  const [a, b, c, d] = project.names;
  const expected = {
    "document report": [`1 ${a}, ${b}, ${c}, ${d}; 2 names only; 3 names and amounts 8, 20, 2, 5; 4 ${a} 8, ${c} 2, ${d} 5; 5 ${c} 2, ${d} 5, ${a} 8`, `6 ${c} 2 and ${d} 5; 7 ${a} 8 and ${b} 20; 8 ${b} 20 then ${a} 8; 9 those two names only; 10 ${b} only`],
    "logical filters": [`1 ${a}, ${c}; 2 ${b}, ${d}; 3 ${a}, ${c}, ${d}; 4 ${a}, ${b}; 5 ${a}, ${c}`, `6 ${b}, ${c}, ${d}; 7 all four; 8 all names and amounts; 9 ${c} 2, ${d} 5, ${a} 8, ${b} 20; 10 ${c}, ${d}, ${a}`],
    "insert and read": ["1 New Record without a note; 2 New Record with note Community order; 3 New Record and Backup Record; 4 all four seed records followed by both inserted records; 5 those six names and amounts", `6 ${c} 2, ${d} 5, New Record 7, Backup Record 4; 7 ${c} 2, Backup Record 4, ${d} 5, New Record 7; 8 ${c} 2 and Backup Record 4; 9 ${b}, ${d}, and Backup Record as Done; 10 those three names and Done statuses only`],
    "embedded document view": [`1 all four complete documents; 2 names and details; 3 names, details, and amounts; 4 ${a} and ${c}; 5 ${c} 2 then ${a} 8`, `6 ${c} only; 7 ${c} 2 then ${a} 8; 8 those two names and Open statuses; 9 ${a} then ${c}; 10 ${a} only`],
    "reference record view": [`1 all four records; 2 four names and group ids; 3 ${a} and ${c}; 4 ${c} then ${a}; 5 ${c} only`, "6 both complete group documents including area; 7 both ids and labels without area; 8 South Team then North Team; 9 North Team only; 10 label North Team only"],
  };
  return expected[track[0]][batch - 1];
}

function sqlBrief(project, projectIndex, batch) {
  const track = sqlTracks[projectIndex % sqlTracks.length];
  const [a, b, c, d] = project.names;
  const missing = track.missingGroup ? " The fourth row has group_id NULL rather than 2." : "";
  const seedShape = track.sourceOnly
    ? "Use source_record with columns id, name, category, amount, status, group_id."
    : track.flatOnly
      ? "Use flat_record with columns id, name, category, amount."
      : "Use record with columns id, name, category, amount, status, group_id, plus group_info(id,label).";
  const facts = `${a}: id 1, Local, amount 8, Open, group 1; ${b}: id 2, Regional, amount 20, Done, group 2; ${c}: id 3, Local, amount 2, Open, group 1; ${d}: id 4, Regional, amount 5, Done, group ${track.missingGroup ? "NULL" : "2"}. Groups are 1 North Team and 2 South Team.${missing}`;
  return `Build ${project.title}, a Philippine ${project.context.toLowerCase()} project. Track: ${track.name}. ${seedShape} Seed exactly these facts: ${facts} For a new project, copy this exact SQL seed unchanged: ${JSON.stringify(sqlSeed(track, project))}. This is batch ${batch} of 2. Five exact goals: ${batch === 1 ? track.first : track.second}. Copy these five complete solution strings unchanged and in order: ${JSON.stringify(sqlSolutions(track, project, batch))}. Required result facts for goals 1-5 in this batch: ${sqlExpected(track, project, batch)}. Copy these facts into behavioral tests; do not recalculate or omit matching rows. Use these registered concepts where they first apply: ${track.concepts}. Every solution is the complete executable SQL file. Keep each change to at most three lines. Give actual seed-derived expected values, including every selected column. Make filtering, sorting, grouping, limiting, changes, and rollback observable. No explanation-only step. Do not add concepts outside the registered list.`;
}

function nosqlBrief(project, projectIndex, batch) {
  const track = nosqlTracks[projectIndex % nosqlTracks.length];
  const [a, b, c, d] = project.names;
  const facts = `${a}: id 1, category Local, amount 8, status Open, groupId 1; ${b}: id 2, category Regional, amount 20, status Done, groupId 2; ${c}: id 3, category Local, amount 2, status Open, groupId 1; ${d}: id 4, category Regional, amount 5, status Done, groupId 2. Each record also has details: { source: "Community", checked: true }. Groups are North Team with area North and South Team with area South.`;
  return `Build ${project.title}, a Philippine project. Track: ${track[0]}. Seed collections records and groups with exactly these facts: ${facts} For a new project, copy this exact seed object unchanged: ${JSON.stringify(nosqlSeed(project))}. This is batch ${batch} of 2. Five exact goals: ${batch === 1 ? track[2] : track[3]}. Copy these five complete solution strings unchanged and in order: ${JSON.stringify(nosqlSolutions(track, project, batch))}. Required result facts: ${nosqlExpected(track, project, batch)}. Copy these facts into behavioral tests; do not recalculate or omit matching documents. Use these registered concepts where they first apply: ${track[1]}. Every solution is the complete JSON command or command array. Keep each change to at most three lines. Give exact expected documents with every projected field and value. Make every filter, sort, limit, insertion, or projection change observable. No explanation-only step. Do not add concepts outside the registered list.`;
}

const campaigns = {
  "sql-basics": { target: 750, projects: sqlProjects, brief: sqlBrief },
  "nosql-basics": { target: 250, projects: nosqlContexts, brief: nosqlBrief },
};

if (sqlProjects.length !== 72 || nosqlContexts.length !== 23) throw new Error("Campaign project counts changed unexpectedly");
const registeredConceptIds = new Set(Object.keys(concepts));
for (const track of sqlTracks) {
  for (const conceptId of track.concepts.split(", ")) {
    if (!registeredConceptIds.has(conceptId)) throw new Error(`Unknown campaign concept ${conceptId}`);
  }
  for (const batch of [1, 2]) {
    if (!sqlExpected(track, sqlProjects[0], batch)) throw new Error(`Missing expected outcomes for ${track.name} batch ${batch}`);
    if (sqlSolutions(track, sqlProjects[0], batch).length !== 5) throw new Error(`Missing exact solutions for ${track.name} batch ${batch}`);
  }
}
for (const track of nosqlTracks) {
  for (const conceptId of track[1].split(", ")) {
    if (!registeredConceptIds.has(conceptId)) throw new Error(`Unknown campaign concept ${conceptId}`);
  }
  for (const batch of [1, 2]) {
    if (!nosqlExpected(track, nosqlContexts[0], batch)) throw new Error(`Missing expected outcomes for ${track[0]} batch ${batch}`);
    if (nosqlSolutions(track, nosqlContexts[0], batch).length !== 5) throw new Error(`Missing exact solutions for ${track[0]} batch ${batch}`);
  }
}
for (const [courseId, campaign] of Object.entries(campaigns)) {
  if (new Set(campaign.projects.map((project) => project.id)).size !== campaign.projects.length) throw new Error(`${courseId} has duplicate campaign project ids`);
  if (campaign.projects.some((project) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.id))) throw new Error(`${courseId} has an invalid campaign project id`);
  for (const [projectIndex, project] of campaign.projects.entries()) {
    for (const batch of [1, 2]) {
      if (campaign.brief(project, projectIndex, batch).length > 12000) throw new Error(`${courseId}/${project.id} batch ${batch} brief is too large`);
    }
  }
}

function progress(courseId) {
  const campaign = campaigns[courseId];
  const course = curriculum.courses.find((item) => item.id === courseId);
  if (!campaign || !course) throw new Error(`Unknown campaign course ${courseId}`);
  for (let projectIndex = 0; projectIndex < campaign.projects.length; projectIndex++) {
    const project = campaign.projects[projectIndex];
    const count = course.steps.filter((step) => step.projectId === project.id).length;
    if (count === 0) return { complete: false, courseId, target: campaign.target, current: course.steps.length, projectId: project.id, batch: 1, brief: campaign.brief(project, projectIndex, 1) };
    if (count === 5) return { complete: false, courseId, target: campaign.target, current: course.steps.length, projectId: project.id, batch: 2, brief: campaign.brief(project, projectIndex, 2) };
    if (count !== 10) throw new Error(`${project.id} has ${count} campaign steps; expected 0, 5, or 10`);
  }
  if (course.steps.length !== campaign.target) throw new Error(`${courseId} exhausted its campaign at ${course.steps.length}; target is ${campaign.target}`);
  return { complete: true, courseId, target: campaign.target, current: course.steps.length };
}

const sql = progress("sql-basics");
const nosql = progress("nosql-basics");
const next = sql.complete ? nosql : sql;
console.log(JSON.stringify({ complete: sql.complete && nosql.complete, sql, nosql, next }));
