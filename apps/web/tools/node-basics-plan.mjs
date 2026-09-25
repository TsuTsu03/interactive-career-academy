// The Node.js Fundamentals course skeleton: 35 projects of 10 steps.
//
// Like tools/cli-git-plan.mjs, this fixes the code each step asks for and the
// checks that prove it; the local model writes only the lesson text. Each
// step is a full new version of the files it touches, and the content gate
// requires the checks to fail on the previous version and pass on this one,
// with at most three changed lines. Only Node's built-in modules are used
// (PLAN.md decision 45), so nothing is installed and every check runs offline.
//
// Seven tracks teach one skill set each. The first five contexts revisit every
// track, so the first seven projects teach and the rest are spaced practice.

const contexts = [
  { slug: "sari-sari", title: "Sari-Sari Store", place: "a sari-sari store (a small neighborhood shop)", items: [["Rice", 50], ["Soap", 25], ["Egg", 9]] },
  { slug: "carinderia", title: "Carinderia", place: "a carinderia (a small eatery that serves cooked dishes)", items: [["Adobo", 80], ["Pancit", 60], ["Lumpia", 15]] },
  { slug: "barangay", title: "Barangay Office", place: "a barangay office (the local community office)", items: [["Clearance", 50], ["Permit", 300], ["ID", 20]] },
  { slug: "school-club", title: "School Club", place: "a public school club", items: [["Shirt", 250], ["Pin", 30], ["Badge", 45]] },
  { slug: "tricycle", title: "Tricycle Terminal", place: "a tricycle terminal (where small motor taxis wait for passengers)", items: [["Market", 20], ["School", 30], ["Clinic", 25]] },
];

const t = (id, kind, fields, label) => ({ id, label, kind, ...fields });
const file = (...lines) => lines.join("\n") + "\n";
const pkg = file("{", '  "type": "module"', "}");
const readme = (c) => file(`${c.title} Node.js project.`, "Follow the CodeDaddy course steps inside this folder.");
const RUN = "node app.js";

// Each track returns { seed, steps }. A step lists the full files after it,
// the commands to run afterwards, where the change goes, and its checks.
const tracks = [
  {
    key: "scripts", title: "First Scripts",
    concepts: ["node-runtime", null, null, null, null, null, null, null, null, "node-stderr"],
    build(c) {
      const [[i0, p0], [i1, p1], [i2, p2]] = c.items;
      const total = p0 + p1 + p2;
      const taxed = Math.round(total * 1.12);
      const size = total > 100 ? "Big order" : "Small order";
      const base = [`console.log("${c.title}");`];
      const v = [];
      v[1] = [...base];
      v[2] = [...v[1], `const item = "${i0}";`, "console.log(item);"];
      v[3] = [...base, `const item = "${i0}";`, `const price = ${p0};`, "console.log(item, price);"];
      v[4] = [...base, `const item = "${i0}";`, `const price = ${p0};`, "console.log(`${item} costs ${price} pesos`);"];
      v[5] = [...v[4], `const items = ["${i0}", "${i1}", "${i2}"];`, "console.log(`Items: ${items.length}`);"];
      v[6] = [...v[5], "for (const name of items) {", "  console.log(`- ${name}`);", "}"];
      v[7] = [...v[6], `const total = ${p0} + ${p1} + ${p2};`, "console.log(`Total: ${total}`);"];
      v[8] = [...v[7], "const withTax = (amount) => Math.round(amount * 1.12);", "console.log(`With tax: ${withTax(total)}`);"];
      v[9] = [...v[8], 'if (total > 100) console.log("Big order");', 'else console.log("Small order");'];
      v[10] = [...v[9], `console.error("Low stock: ${i2}");`];
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "app.js": file('console.log("Hello from Node");') },
        steps: [
          { where: "Replace the only line in app.js", goal: `make the script print the store name ${c.title} instead of Hello from Node, then run it with node app.js`, files: { "app.js": file(...v[1]) }, tests: [t("name", "local-node-prints", { file: "app.js", value: c.title }, `node app.js prints ${c.title}`)] },
          { where: "Add two lines at the end of app.js", goal: `keep a product name in a constant called item and print it`, files: { "app.js": file(...v[2]) }, tests: [t("item", "local-node-prints", { file: "app.js", value: `${i0}\n` }, `The script prints ${i0} on its own line`)] },
          { where: "Add a price constant and change the last console.log", goal: `add a price constant and print the item and its price together`, files: { "app.js": file(...v[3]) }, tests: [t("pair", "local-node-prints", { file: "app.js", value: `${i0} ${p0}` }, `The script prints ${i0} ${p0}`)] },
          { where: "Change the last console.log", goal: "print a full sentence with a template literal", files: { "app.js": file(...v[4]) }, tests: [t("sentence", "local-node-prints", { file: "app.js", value: `${i0} costs ${p0} pesos` }, `The script prints ${i0} costs ${p0} pesos`)] },
          { where: "Add two lines at the end", goal: "keep three product names in an array and print how many there are", files: { "app.js": file(...v[5]) }, tests: [t("count", "local-node-prints", { file: "app.js", value: "Items: 3" }, "The script prints Items: 3")] },
          { where: "Add a for...of loop at the end", goal: "print every product name on its own line with a dash in front", files: { "app.js": file(...v[6]) }, tests: [t("last", "local-node-prints", { file: "app.js", value: `- ${i2}` }, `The list ends with - ${i2}`)] },
          { where: "Add two lines at the end", goal: "add up the three prices and print the total", files: { "app.js": file(...v[7]) }, tests: [t("total", "local-node-prints", { file: "app.js", value: `Total: ${total}` }, `The script prints Total: ${total}`)] },
          { where: "Add two lines at the end", goal: "write a small arrow function that adds 12% tax and print the total with tax", files: { "app.js": file(...v[8]) }, tests: [t("tax", "local-node-prints", { file: "app.js", value: `With tax: ${taxed}` }, `The script prints With tax: ${taxed}`)] },
          { where: "Add an if and an else at the end", goal: "label the order as big when the total is over 100 and small otherwise", files: { "app.js": file(...v[9]) }, tests: [t("size", "local-node-prints", { file: "app.js", value: size }, `The script prints ${size}`)] },
          { where: "Add one line at the end", goal: "report a warning on the error stream with console.error instead of console.log", files: { "app.js": file(...v[10]) }, tests: [t("warning", "local-node-stderr", { file: "app.js", value: `Low stock: ${i2}` }, `The script reports Low stock: ${i2} as an error message`), t("still-runs", "local-node-exit-code", { file: "app.js", code: 0 }, "The script still finishes normally")] },
        ],
      };
    },
  },
  {
    key: "modules", title: "Modules",
    concepts: ["node-export", "node-import", null, null, null, "node-default-export", null, "node-builtin-module", "npm-script", "node-import-alias"],
    build(c) {
      const [[i0, p0], [i1, p1], [i2, p2]] = c.items;
      const P = [];
      P[1] = [`export const storeName = "${c.title}";`];
      P[3] = [...P[1], `export const prices = { "${i0}": ${p0}, "${i1}": ${p1}, "${i2}": ${p2} };`];
      P[4] = [...P[3], "export function priceOf(name) {", "  return prices[name] ?? 0;", "}"];
      P[6] = [...P[4], "export default function formatPeso(amount) {", "  return `PHP ${amount.toFixed(2)}`;", "}"];
      const A = [];
      A[0] = ['console.log("Price list");'];
      A[2] = ['import { storeName } from "./prices.js";', ...A[0], "console.log(storeName);"];
      A[3] = ['import { storeName, prices } from "./prices.js";', ...A[0], "console.log(storeName);", `console.log(prices["${i0}"]);`];
      A[5] = ['import { storeName, prices, priceOf } from "./prices.js";', ...A[3].slice(1), `console.log(\`${i1}: \${priceOf("${i1}")}\`);`];
      A[7] = ['import formatPeso from "./prices.js";', ...A[5], `console.log(formatPeso(${p0}));`];
      A[8] = ['import { platform } from "node:os";', ...A[7], "console.log(`Running on ${platform()}`);"];
      A[10] = ['import { priceOf as lookup } from "./prices.js";', ...A[8], `console.log(\`Last item: \${lookup("${i2}")}\`);`];
      const scripts = file("{", '  "type": "module",', '  "scripts": { "start": "node app.js" }', "}");
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "app.js": file(...A[0]) },
        steps: [
          { where: "Make a new file named prices.js with one line", goal: "export the store name from its own module file", files: { "prices.js": file(...P[1]) }, tests: [t("export", "local-file-contains", { path: "prices.js", value: "export const storeName" }, "prices.js exports storeName")] },
          { where: "Add an import at the top of app.js and a console.log at the end", goal: "import storeName into app.js and print it", files: { "app.js": file(...A[2]) }, tests: [t("imported", "local-node-prints", { file: "app.js", value: c.title }, `node app.js prints ${c.title} from prices.js`)] },
          { where: "Add one export to prices.js, add prices to the import, and print one price", goal: `export a prices object and print the price of ${i0}`, files: { "prices.js": file(...P[3]), "app.js": file(...A[3]) }, tests: [t("price", "local-node-prints", { file: "app.js", value: `${p0}\n` }, `The script prints ${p0} on its own line`)] },
          { where: "Add a function at the end of prices.js", goal: "export a priceOf function that looks up a price and gives 0 for unknown items", files: { "prices.js": file(...P[4]) }, tests: [t("function", "local-file-contains", { path: "prices.js", value: "export function priceOf(name)" }, "prices.js exports priceOf")] },
          { where: "Add priceOf to the import and print one line at the end of app.js", goal: `use priceOf in app.js to print the price of ${i1}`, files: { "app.js": file(...A[5]) }, tests: [t("lookup", "local-node-prints", { file: "app.js", value: `${i1}: ${p1}` }, `The script prints ${i1}: ${p1}`)] },
          { where: "Add a default export at the end of prices.js", goal: "give prices.js one default export that formats an amount as pesos", files: { "prices.js": file(...P[6]) }, tests: [t("default", "local-file-contains", { path: "prices.js", value: "export default function formatPeso" }, "prices.js has a default export")] },
          { where: "Add a default import at the top of app.js and one line at the end", goal: `import the default export without braces and print ${p0} as pesos`, files: { "app.js": file(...A[7]) }, tests: [t("peso", "local-node-prints", { file: "app.js", value: `PHP ${p0}.00` }, `The script prints PHP ${p0}.00`)] },
          { where: "Add an import at the top of app.js and one line at the end", goal: "import from Node's built-in node:os module and print the operating system name", files: { "app.js": file(...A[8]) }, tests: [t("os", "local-node-prints", { file: "app.js", value: "Running on " }, "The script prints Running on and your system name")] },
          { where: "Change package.json so it has a scripts entry", goal: "add a start script so npm run start runs the app, then try npm run start", files: { "package.json": scripts }, tests: [t("script", "local-file-contains", { path: "package.json", value: '"start": "node app.js"' }, "package.json has a start script")] },
          { where: "Add an import at the top of app.js and one line at the end", goal: "import priceOf under a new name, lookup, and use it", files: { "app.js": file(...A[10]) }, tests: [t("alias", "local-node-prints", { file: "app.js", value: `Last item: ${p2}` }, `The script prints Last item: ${p2}`)] },
        ],
      };
    },
  },
  {
    key: "files", title: "Reading and Writing Files",
    concepts: ["node-read-file", "node-split-lines", null, null, "node-write-file", "node-json-file", null, "node-append-file", null, "node-error-code"],
    build(c) {
      const [[i0, p0], [i1, p1], [i2, p2]] = c.items;
      const cheapest = Math.min(p0, p1, p2);
      const I = 'import { readFile } from "node:fs/promises";';
      const v = [];
      v[1] = [I, 'const text = await readFile("stock.txt", "utf8");', "console.log(text);"];
      v[2] = [...v[1], 'const lines = text.trim().split("\\n");', "console.log(`Lines: ${lines.length}`);"];
      v[3] = [...v[2], 'const rows = lines.map((line) => line.split(","));', "console.log(`Second item: ${rows[1][0]}`);"];
      v[4] = [...v[3], "const items = rows.map(([name, price]) => ({ name, price: Number(price) }));", "console.log(`Cheapest: ${Math.min(...items.map((item) => item.price))}`);"];
      v[5] = ['import { readFile, writeFile } from "node:fs/promises";', ...v[4].slice(1), 'await writeFile("report.txt", `Items: ${items.length}\\n`);'];
      v[6] = [...v[5], 'await writeFile("stock.json", JSON.stringify(items, null, 2));'];
      v[7] = [...v[6], 'const saved = JSON.parse(await readFile("stock.json", "utf8"));', "console.log(`Saved: ${saved.length} items`);"];
      v[8] = ['import { readFile, writeFile, appendFile } from "node:fs/promises";', ...v[7].slice(1), 'await appendFile("report.txt", "Checked today\\n");'];
      v[9] = [...v[8], "saved[0].price += 7;", 'await writeFile("stock.json", JSON.stringify(saved, null, 2));'];
      v[10] = [...v[9], 'try { await readFile("missing.txt", "utf8"); }', "catch (error) { console.error(`Could not read: ${error.code}`); }"];
      const out = (n) => ({ "app.js": file(...v[n]) });
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "app.js": file(I, 'console.log("Stock reader");'), "stock.txt": file(`${i0},${p0}`, `${i1},${p1}`, `${i2},${p2}`) },
        steps: [
          { where: "Replace the console.log line in app.js with two lines", goal: "read stock.txt with readFile and await, then print its text", files: out(1), tests: [t("text", "local-node-prints", { file: "app.js", value: `${i0},${p0}` }, `The script prints the line ${i0},${p0} from stock.txt`)] },
          { where: "Add two lines at the end", goal: "split the text into lines and print how many there are", files: out(2), tests: [t("lines", "local-node-prints", { file: "app.js", value: "Lines: 3" }, "The script prints Lines: 3")] },
          { where: "Add two lines at the end", goal: "split each line at the comma and print the second item's name", files: out(3), tests: [t("second", "local-node-prints", { file: "app.js", value: `Second item: ${i1}` }, `The script prints Second item: ${i1}`)] },
          { where: "Add two lines at the end", goal: "turn each row into an object with a number price and print the cheapest price", files: out(4), tests: [t("cheapest", "local-node-prints", { file: "app.js", value: `Cheapest: ${cheapest}` }, `The script prints Cheapest: ${cheapest}`)] },
          { where: "Add writeFile to the import and one line at the end, then run node app.js", goal: "write a short report file with the number of items", files: out(5), commands: [RUN], tests: [t("report", "local-file-contains", { path: "report.txt", value: "Items: 3" }, "report.txt says Items: 3")] },
          { where: "Add one line at the end, then run node app.js", goal: "save the item objects as a JSON file", files: out(6), commands: [RUN], tests: [t("json", "local-file-contains", { path: "stock.json", value: `"name": "${i0}"` }, `stock.json holds ${i0} as JSON`)] },
          { where: "Add two lines at the end", goal: "read the JSON file back into objects and print how many were saved", files: out(7), tests: [t("saved", "local-node-prints", { file: "app.js", value: "Saved: 3 items" }, "The script prints Saved: 3 items")] },
          { where: "Add appendFile to the import and one line at the end, then run node app.js", goal: "add a line to the end of report.txt without replacing it", files: out(8), commands: [RUN], tests: [t("appended", "local-file-contains", { path: "report.txt", value: "Checked today" }, "report.txt ends with Checked today"), t("kept", "local-file-contains", { path: "report.txt", value: "Items: 3" }, "report.txt still says Items: 3")] },
          { where: "Add two lines at the end, then run node app.js", goal: `raise the first saved price by 7 and write the JSON file again`, files: out(9), commands: [RUN], tests: [t("raised", "local-file-contains", { path: "stock.json", value: `"price": ${p0 + 7}` }, `stock.json now has ${i0} at ${p0 + 7}`)] },
          { where: "Add a try and catch at the end", goal: "read a file that does not exist and report the error code instead of crashing", files: out(10), tests: [t("code", "local-node-stderr", { file: "app.js", value: "Could not read: ENOENT" }, "The script reports Could not read: ENOENT"), t("finishes", "local-node-exit-code", { file: "app.js", code: 0 }, "The script still finishes normally")] },
        ],
      };
    },
  },
  {
    key: "async", title: "Waiting for Work",
    concepts: ["node-top-level-await", null, null, "node-promise-race", "node-rejected-promise", "node-all-settled", null, "node-finally", "node-interval", "node-event-loop"],
    build(c) {
      const [[i0], [i1], [i2]] = c.items;
      const price = (name) => name.length * 10;
      const v = [];
      const base = ["const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));", 'console.log("Start");'];
      v[1] = [...base, "await wait(100);", 'console.log("After wait");'];
      v[2] = [...v[1], "const fetchPrice = async (name) => { await wait(20); return name.length * 10; };", `console.log(\`Price: \${await fetchPrice("${i0}")}\`);`];
      v[3] = [...v[2], `const prices = await Promise.all(["${i0}", "${i1}", "${i2}"].map(fetchPrice));`, 'console.log(`All: ${prices.join(", ")}`);'];
      v[4] = [...v[3], 'const slow = wait(200).then(() => "slow");', 'const fast = wait(20).then(() => "fast");', "console.log(`First: ${await Promise.race([slow, fast])}`);"];
      v[5] = [...v[4], 'const failing = async () => { throw new Error("Supplier offline"); };', "try { await failing(); } catch (error) { console.error(error.message); }"];
      v[6] = [...v[5], `const results = await Promise.allSettled([fetchPrice("${i0}"), failing()]);`, 'console.log(`Settled: ${results.map((result) => result.status).join(" ")}`);'];
      v[7] = [...v[6], `for (const name of ["${i0}", "${i1}"]) {`, "  console.log(`Checked ${name}: ${await fetchPrice(name)}`);", "}"];
      v[8] = [...v[7], 'try { await wait(10); } finally { console.log("Cleanup done"); }'];
      v[9] = [...v[8], "let ticks = 0;", 'const timer = setInterval(() => { ticks += 1; if (ticks === 3) { clearInterval(timer); console.log("Ticks: 3"); } }, 10);'];
      v[10] = [...v[9], 'setTimeout(() => console.log("Timer done"), 0);', 'console.log("Sync done");'];
      const out = (n) => ({ "app.js": file(...v[n]) });
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "app.js": file(...base) },
        steps: [
          { where: "Add two lines at the end of app.js", goal: "pause for a moment with await before printing the next line", files: out(1), tests: [t("after", "local-node-prints", { file: "app.js", value: "Start\nAfter wait" }, "The script prints Start and then After wait")] },
          { where: "Add two lines at the end", goal: "write an async function that returns a price after a short wait, and print its result", files: out(2), tests: [t("price", "local-node-prints", { file: "app.js", value: `Price: ${price(i0)}` }, `The script prints Price: ${price(i0)}`)] },
          { where: "Add two lines at the end", goal: "start three lookups at once with Promise.all and print every result", files: out(3), tests: [t("all", "local-node-prints", { file: "app.js", value: `All: ${price(i0)}, ${price(i1)}, ${price(i2)}` }, `The script prints All: ${price(i0)}, ${price(i1)}, ${price(i2)}`)] },
          { where: "Add three lines at the end", goal: "race a slow and a fast promise and print which finished first", files: out(4), tests: [t("race", "local-node-prints", { file: "app.js", value: "First: fast" }, "The script prints First: fast")] },
          { where: "Add two lines at the end", goal: "catch a promise that fails and report its message on the error stream", files: out(5), tests: [t("caught", "local-node-stderr", { file: "app.js", value: "Supplier offline" }, "The script reports Supplier offline"), t("finishes", "local-node-exit-code", { file: "app.js", code: 0 }, "The script still finishes normally")] },
          { where: "Add two lines at the end", goal: "wait for one working and one failing promise with Promise.allSettled and print both statuses", files: out(6), tests: [t("settled", "local-node-prints", { file: "app.js", value: "Settled: fulfilled rejected" }, "The script prints Settled: fulfilled rejected")] },
          { where: "Add a three-line loop at the end", goal: "look up two prices one after the other inside a for...of loop", files: out(7), tests: [t("loop", "local-node-prints", { file: "app.js", value: `Checked ${i1}: ${price(i1)}` }, `The script prints Checked ${i1}: ${price(i1)}`)] },
          { where: "Add one line at the end", goal: "use finally so a cleanup message prints whether or not the wait succeeds", files: out(8), tests: [t("cleanup", "local-node-prints", { file: "app.js", value: "Cleanup done" }, "The script prints Cleanup done")] },
          { where: "Add two lines at the end", goal: "repeat a small task every 10 milliseconds with setInterval and stop it after three ticks", files: out(9), tests: [t("ticks", "local-node-prints", { file: "app.js", value: "Ticks: 3" }, "The script prints Ticks: 3"), t("stops", "local-node-exit-code", { file: "app.js", code: 0 }, "The script stops on its own")] },
          { where: "Add two lines at the end", goal: "see that a zero-delay timer still runs after the code that follows it", files: out(10), tests: [t("order", "local-node-prints", { file: "app.js", value: "Sync done\nTimer done" }, "Sync done prints before Timer done")] },
        ],
      };
    },
  },
  {
    key: "cli", title: "Command-Line Tools",
    concepts: ["node-argv", null, null, null, "node-exit-code", null, null, "node-cli-flag", null, null],
    build(c) {
      const [[i0, p0], [i1, p1], [i2, p2]] = c.items;
      const args = [i0, "2"];
      const priceLine = `const prices = { "${i0}": ${p0}, "${i1}": ${p1}, "${i2}": ${p2} };`;
      const head = ["const args = process.argv.slice(2);", 'console.log("Order tool");'];
      const help = 'if (args[0] === "--help") { console.log("Usage: node app.js <item> <quantity> [--receipt]"); process.exit(0); }';
      const usage = 'if (!name) { console.error("Usage: node app.js <item> <quantity>"); process.exit(1); }';
      const unknown = "if (!(name in prices)) { console.error(`Unknown item: ${name}`); process.exit(2); }";
      const badCount = 'if (!Number.isInteger(count) || count < 1) { console.error("Quantity must be a whole number"); process.exit(3); }';
      const v = [];
      v[1] = [...head, "console.log(`You typed ${args.length} words`);"];
      v[2] = [...v[1], "const [name, quantity] = args;", "console.log(`Item: ${name}`);"];
      v[3] = [...v[2], "const count = Number(quantity);", "console.log(`Quantity: ${count}`);"];
      v[4] = [...v[3], priceLine, "console.log(`Total: ${prices[name] * count}`);"];
      v[5] = [...v[1], "const [name, quantity] = args;", usage, "console.log(`Item: ${name}`);", "const count = Number(quantity);", "console.log(`Quantity: ${count}`);", priceLine, "console.log(`Total: ${prices[name] * count}`);"];
      v[6] = [...v[5].slice(0, 9), unknown, "console.log(`Total: ${prices[name] * count}`);"];
      v[7] = [...v[6].slice(0, 7), badCount, ...v[6].slice(7)];
      v[8] = [...v[7], 'const receipt = args.includes("--receipt");', 'if (receipt) console.log("Receipt: thank you!");'];
      v[9] = [...v[8].slice(0, 11), 'const currency = process.env.CURRENCY ?? "PHP";', "console.log(`Total: ${currency} ${prices[name] * count}`);", ...v[8].slice(12)];
      v[10] = [head[0], help, ...v[9].slice(1)];
      const out = (n) => ({ "app.js": file(...v[n]) });
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "app.js": file(...head) },
        steps: [
          { where: "Add one line at the end of app.js", goal: `print how many words were typed after node app.js; the checker runs node app.js ${args.join(" ")}`, files: out(1), tests: [t("words", "local-node-prints", { file: "app.js", args, value: "You typed 2 words" }, `node app.js ${args.join(" ")} prints You typed 2 words`)] },
          { where: "Add two lines at the end", goal: "take the first two words apart into name and quantity and print the name", files: out(2), tests: [t("item", "local-node-prints", { file: "app.js", args, value: `Item: ${i0}` }, `node app.js ${args.join(" ")} prints Item: ${i0}`)] },
          { where: "Add two lines at the end", goal: "turn the quantity text into a number and print it", files: out(3), tests: [t("quantity", "local-node-prints", { file: "app.js", args, value: "Quantity: 2" }, `node app.js ${args.join(" ")} prints Quantity: 2`)] },
          { where: "Add two lines at the end", goal: "look up the item's price and print the total cost", files: out(4), tests: [t("total", "local-node-prints", { file: "app.js", args, value: `Total: ${p0 * 2}` }, `node app.js ${args.join(" ")} prints Total: ${p0 * 2}`)] },
          { where: "Add one line right after the line that sets name and quantity", goal: "stop with exit code 1 and a usage message when no item is typed", files: out(5), tests: [t("exit", "local-node-exit-code", { file: "app.js", code: 1 }, "node app.js with no words ends with exit code 1"), t("usage", "local-node-stderr", { file: "app.js", value: "Usage: node app.js <item> <quantity>" }, "It explains how to use the tool")] },
          { where: "Add one line right before the last console.log", goal: "stop with exit code 2 when the item is not on the price list", files: out(6), tests: [t("exit", "local-node-exit-code", { file: "app.js", args: ["Milk", "1"], code: 2 }, "node app.js Milk 1 ends with exit code 2"), t("message", "local-node-stderr", { file: "app.js", args: ["Milk", "1"], value: "Unknown item: Milk" }, "It reports Unknown item: Milk")] },
          { where: "Add one line right after the line that sets count", goal: "stop with exit code 3 when the quantity is not a whole number", files: out(7), tests: [t("exit", "local-node-exit-code", { file: "app.js", args: [i0, "abc"], code: 3 }, `node app.js ${i0} abc ends with exit code 3`), t("fine", "local-node-exit-code", { file: "app.js", args, code: 0 }, `node app.js ${args.join(" ")} still works`)] },
          { where: "Add two lines at the end", goal: "print a thank-you line only when --receipt is typed", files: out(8), tests: [t("flag", "local-node-prints", { file: "app.js", args: [...args, "--receipt"], value: "Receipt: thank you!" }, `node app.js ${args.join(" ")} --receipt prints the receipt line`)] },
          { where: "Add one line before the total and change the total line", goal: "show the currency, taken from a CURRENCY environment variable or PHP by default", files: out(9), tests: [t("currency", "local-node-prints", { file: "app.js", args, env: { CURRENCY: "USD" }, value: `Total: USD ${p0 * 2}` }, `With CURRENCY=USD it prints Total: USD ${p0 * 2}`)] },
          { where: "Add one line right after the first line", goal: "print the usage and stop normally when --help is typed", files: out(10), tests: [t("help", "local-node-prints", { file: "app.js", args: ["--help"], value: "[--receipt]" }, "node app.js --help prints the usage"), t("exit", "local-node-exit-code", { file: "app.js", args: ["--help"], code: 0 }, "node app.js --help ends with exit code 0")] },
        ],
      };
    },
  },
  {
    key: "config", title: "Settings and Secrets",
    concepts: ["node-env-var", "node-default-value", null, null, null, "node-required-setting", "node-secret", "node-config-file", "node-setting-order", "node-env-mode"],
    build(c) {
      const key = { API_KEY: "sk12345" };
      const v = [];
      const base = ['console.log("Config check");'];
      v[1] = [...base, "const place = process.env.PLACE;", "console.log(`Place: ${place}`);"];
      v[2] = [...base, 'const place = process.env.PLACE ?? "Unknown place";', "console.log(`Place: ${place}`);"];
      v[3] = [...v[2], "const limit = Number(process.env.LIMIT ?? 5);", "console.log(`Limit: ${limit}`);"];
      v[4] = [...v[3], 'const debug = process.env.DEBUG === "true";', 'if (debug) console.log("Debug mode on");'];
      v[5] = [...v[4], "const config = { place, limit, debug };", "console.log(JSON.stringify(config));"];
      v[6] = [...v[5], 'if (!process.env.API_KEY) { console.error("Missing API_KEY"); process.exit(1); }'];
      v[7] = [...v[6], "const key = process.env.API_KEY;", "console.log(`Key: ${key.slice(0, 2)}***`);"];
      v[8] = ['import { readFile } from "node:fs/promises";', ...v[7], 'const fileConfig = JSON.parse(await readFile("config.json", "utf8"));', "console.log(`Currency: ${fileConfig.currency}`);"];
      v[9] = [...v[8], "const currency = process.env.CURRENCY ?? fileConfig.currency;", "console.log(`Using ${currency}`);"];
      v[10] = [...v[9], 'const mode = process.env.NODE_ENV === "production" ? "production" : "development";', "console.log(`Mode: ${mode}`);"];
      const out = (n) => ({ "app.js": file(...v[n]) });
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "app.js": file(...base), "config.json": file("{", '  "currency": "PHP",', '  "taxRate": 0.12', "}") },
        steps: [
          { where: "Add two lines at the end of app.js", goal: `read the PLACE environment variable and print it; the checker sets PLACE to ${c.title}`, files: out(1), tests: [t("place", "local-node-prints", { file: "app.js", env: { PLACE: c.title }, value: `Place: ${c.title}` }, `With PLACE=${c.title} it prints Place: ${c.title}`)] },
          { where: "Change the line that reads PLACE", goal: "fall back to Unknown place when PLACE is not set", files: out(2), tests: [t("fallback", "local-node-prints", { file: "app.js", value: "Place: Unknown place" }, "Without PLACE it prints Place: Unknown place")] },
          { where: "Add two lines at the end", goal: "read a LIMIT setting as a number, with 5 as the default", files: out(3), tests: [t("limit", "local-node-prints", { file: "app.js", env: { LIMIT: "12" }, value: "Limit: 12" }, "With LIMIT=12 it prints Limit: 12")] },
          { where: "Add two lines at the end", goal: "turn on a debug message only when DEBUG is the text true", files: out(4), tests: [t("debug", "local-node-prints", { file: "app.js", env: { DEBUG: "true" }, value: "Debug mode on" }, "With DEBUG=true it prints Debug mode on")] },
          { where: "Add two lines at the end", goal: "collect the settings in one object and print it as JSON", files: out(5), tests: [t("json", "local-node-prints", { file: "app.js", env: { PLACE: "Hall", LIMIT: "3" }, value: '{"place":"Hall","limit":3,"debug":false}' }, "With PLACE=Hall and LIMIT=3 it prints the settings as JSON")] },
          { where: "Add one line at the end", goal: "stop with exit code 1 when the API_KEY secret is missing", files: out(6), tests: [t("missing", "local-node-exit-code", { file: "app.js", code: 1 }, "Without API_KEY it ends with exit code 1"), t("present", "local-node-exit-code", { file: "app.js", env: key, code: 0 }, "With API_KEY it finishes normally")] },
          { where: "Add two lines at the end", goal: "print only the first two characters of the secret so it never appears in full", files: out(7), tests: [t("masked", "local-node-prints", { file: "app.js", env: key, value: "Key: sk***" }, "With API_KEY=sk12345 it prints Key: sk***")] },
          { where: "Add an import at the top and two lines at the end", goal: "read the currency from config.json", files: out(8), tests: [t("currency", "local-node-prints", { file: "app.js", env: key, value: "Currency: PHP" }, "It prints Currency: PHP from config.json")] },
          { where: "Add two lines at the end", goal: "let a CURRENCY environment variable override the value in config.json", files: out(9), tests: [t("override", "local-node-prints", { file: "app.js", env: { ...key, CURRENCY: "USD" }, value: "Using USD" }, "With CURRENCY=USD it prints Using USD")] },
          { where: "Add two lines at the end", goal: "print production mode only when NODE_ENV is production", files: out(10), tests: [t("mode", "local-node-prints", { file: "app.js", env: { ...key, NODE_ENV: "production" }, value: "Mode: production" }, "With NODE_ENV=production it prints Mode: production")] },
        ],
      };
    },
  },
  {
    key: "folders", title: "Paths and Folders",
    concepts: ["node-path-join", "node-extname", null, "node-readdir", null, "node-mkdir", "node-copy-file", "node-stat", "node-rename", "node-absolute-path"],
    build(c) {
      const [[i0, p0], [i1, p1]] = c.items;
      const first = `${i0} ${p0}\n`;
      const size = Buffer.byteLength(first);
      const P = 'import path from "node:path";';
      const v = [];
      const imports = (names) => `import { ${names.join(", ")} } from "node:fs/promises";`;
      v[1] = [P, 'console.log("Folder tool");', 'const file = path.join("records", "a.txt");', 'console.log(file.split(path.sep).join("/"));'];
      v[2] = [...v[1], "console.log(`Extension: ${path.extname(file)}`);"];
      v[3] = [...v[2], 'console.log(`Base: ${path.basename(file, ".txt")}`);'];
      v[4] = [P, imports(["readdir"]), ...v[3].slice(1), 'const names = await readdir("records");', "console.log(`Files: ${names.length}`);"];
      v[5] = [...v[4], 'const textFiles = names.filter((name) => path.extname(name) === ".txt");', "console.log(`Text files: ${textFiles.length}`);"];
      v[6] = [P, imports(["readdir", "mkdir"]), ...v[5].slice(2), 'await mkdir("archive", { recursive: true });'];
      v[7] = [P, imports(["readdir", "mkdir", "copyFile"]), ...v[6].slice(2), 'await copyFile(file, path.join("archive", "a.txt"));'];
      v[8] = [P, imports(["readdir", "mkdir", "copyFile", "stat"]), ...v[7].slice(2), "const info = await stat(file);", "console.log(`Size: ${info.size} bytes`);"];
      v[9] = [P, imports(["readdir", "mkdir", "copyFile", "stat", "rename"]), ...v[8].slice(2), 'await rename(path.join("archive", "a.txt"), path.join("archive", "a-old.txt"));'];
      v[10] = [...v[9], "console.log(`Absolute: ${path.isAbsolute(path.resolve(file))}`);"];
      const out = (n) => ({ "app.js": file(...v[n]) });
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "app.js": file(P, 'console.log("Folder tool");'), "records/a.txt": first, "records/b.txt": `${i1} ${p1}\n`, "records/notes.md": file("# Notes", `Keep ${c.title} records here.`) },
        steps: [
          { where: "Add two lines at the end of app.js", goal: "build the path records/a.txt with path.join and print it with forward slashes", files: out(1), tests: [t("joined", "local-node-prints", { file: "app.js", value: "records/a.txt" }, "The script prints records/a.txt")] },
          { where: "Add one line at the end", goal: "print the file's extension with path.extname", files: out(2), tests: [t("ext", "local-node-prints", { file: "app.js", value: "Extension: .txt" }, "The script prints Extension: .txt")] },
          { where: "Add one line at the end", goal: "print the file name without its extension using path.basename", files: out(3), tests: [t("base", "local-node-prints", { file: "app.js", value: "Base: a" }, "The script prints Base: a")] },
          { where: "Add an import as the second line and two lines at the end", goal: "list the records folder with readdir and print how many entries it has", files: out(4), tests: [t("count", "local-node-prints", { file: "app.js", value: "Files: 3" }, "The script prints Files: 3")] },
          { where: "Add two lines at the end", goal: "keep only the .txt files and print how many there are", files: out(5), tests: [t("txt", "local-node-prints", { file: "app.js", value: "Text files: 2" }, "The script prints Text files: 2")] },
          { where: "Add mkdir to the import and one line at the end, then run node app.js", goal: "make an archive folder, safely even if it already exists", files: out(6), commands: [RUN], tests: [t("archive", "local-dir-exists", { path: "archive" }, "The archive folder exists")] },
          { where: "Add copyFile to the import and one line at the end, then run node app.js", goal: "copy records/a.txt into the archive folder", files: out(7), commands: [RUN], tests: [t("copied", "local-file-contains", { path: "archive/a.txt", value: `${i0} ${p0}` }, "archive/a.txt is a copy of records/a.txt")] },
          { where: "Add stat to the import and two lines at the end", goal: "read the file's details with stat and print its size in bytes", files: out(8), tests: [t("size", "local-node-prints", { file: "app.js", value: `Size: ${size} bytes` }, `The script prints Size: ${size} bytes`)] },
          { where: "Add rename to the import and one line at the end, then run node app.js", goal: "rename the archived copy to a-old.txt", files: out(9), commands: [RUN], tests: [t("renamed", "local-file-exists", { path: "archive/a-old.txt" }, "archive/a-old.txt exists"), t("moved", "local-path-missing", { path: "archive/a.txt" }, "archive/a.txt is gone")] },
          { where: "Add one line at the end", goal: "turn the relative path into a full one with path.resolve and confirm it is absolute", files: out(10), tests: [t("absolute", "local-node-prints", { file: "app.js", value: "Absolute: true" }, "The script prints Absolute: true")] },
        ],
      };
    },
  },
];

export const nodeBasicsProjects = contexts.flatMap((c, round) =>
  tracks.map((track) => {
    const id = `${track.key}-${c.slug}`;
    const built = track.build(c);
    const steps = built.steps.map((step, index) => ({
      ...step,
      commands: step.commands ?? [],
      id: `node-${id}-${index + 1}`,
      conceptId: round === 0 ? track.concepts[index] ?? undefined : undefined,
    }));
    return { id, title: `${c.title} ${track.title}`, place: c.place, track: track.title, seed: built.seed, steps };
  }),
);

if (nodeBasicsProjects.length !== 35 || nodeBasicsProjects.some((project) => project.steps.length !== 10)) {
  throw new Error("The Node.js Fundamentals plan must be 35 projects of 10 steps.");
}
