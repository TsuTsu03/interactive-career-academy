// The Full-Stack Integration course skeleton: 40 projects of 10 steps.
//
// A React front end built with Vite, served by the learner's own node:http
// server next to its JSON API (PLAN.md decisions 45 and 46). The checker
// builds with the learner's own npm scripts, renders components to HTML in
// Node with react-dom/server, and sends real requests to the server; it never
// opens a browser, so clicks and layout are taught but not checked. Package
// versions are pinned so every learner and the content gate build the same.

const contexts = [
  { slug: "sari-sari", title: "Sari-Sari Store", place: "a sari-sari store (a small neighborhood shop)", items: [["Rice", 50], ["Soap", 25], ["Egg", 9]] },
  { slug: "carinderia", title: "Carinderia", place: "a carinderia (a small eatery that serves cooked dishes)", items: [["Adobo", 80], ["Pancit", 60], ["Lumpia", 15]] },
  { slug: "barangay", title: "Barangay Office", place: "a barangay office (the local community office)", items: [["Clearance", 50], ["Permit", 300], ["ID", 20]] },
  { slug: "school-club", title: "School Club", place: "a public school club", items: [["Shirt", 250], ["Pin", 30], ["Badge", 45]] },
  { slug: "tricycle", title: "Tricycle Terminal", place: "a tricycle terminal (where small motor taxis wait for passengers)", items: [["Market", 20], ["School", 30], ["Clinic", 25]] },
];

const file = (...lines) => lines.join("\n") + "\n";
const json = (value) => JSON.stringify(value);
const T = {
  file: (id, kind, fields, label) => ({ id, label, kind, ...fields }),
  render: (id, fileName, props, fields, label) => ({ id, label, kind: "local-react-render", file: fileName, props, ...fields }),
  http: (id, fields, label) => ({ id, label, kind: "local-http", file: "server.js", ...fields }),
  build: (id, label, env) => ({ id, label, kind: "local-npm-script", script: "build", ...(env ? { env } : {}) }),
};
const GET = (path) => ({ method: "GET", path });
const POST = (path, body) => ({ method: "POST", path, body: JSON.stringify(body), headers: { "Content-Type": "application/json" } });

const packageJson = (extra = []) => file("{", '  "name": "fullstack-practice",', '  "private": true,', '  "type": "module",', ...extra, '  "scripts": { "build": "vite build", "dev": "vite" },', '  "dependencies": { "react": "19.3.0", "react-dom": "19.3.0" },', '  "devDependencies": { "vite": "8.3.1", "@vitejs/plugin-react": "6.1.1" }', "}");
const viteConfig = file('import { defineConfig } from "vite";', 'import react from "@vitejs/plugin-react";', "export default defineConfig({", "  plugins: [react()],", '  build: { rollupOptions: { output: { entryFileNames: "assets/app.js", assetFileNames: "assets/[name][extname]" } } },', "});");
const indexHtml = (title) => file("<!doctype html>", '<html lang="en">', "  <head>", '    <meta charset="utf-8" />', '    <meta name="viewport" content="width=device-width, initial-scale=1" />', `    <title>${title}</title>`, "  </head>", "  <body>", '    <div id="root"></div>', '    <script type="module" src="/src/main.jsx"></script>', "  </body>", "</html>");
const mainJsx = file('import { createRoot } from "react-dom/client";', 'import App from "./App.jsx";', 'import "./app.css";', 'createRoot(document.getElementById("root")).render(<App />);');
const appCss = file("body { font-family: system-ui, sans-serif; margin: 2rem; }");
const readme = (c) => file(`${c.title} full-stack project.`, "Run npm install once, then follow the CodeDaddy steps.");
const base = (c, title = "Practice") => ({ "package.json": packageJson(), "vite.config.js": viteConfig, "index.html": indexHtml(title), "src/main.jsx": mainJsx, "src/app.css": appCss, "README.txt": readme(c) });
const appJsx = (head, body) => file(...head, "export default function App() {", ...body.map((line) => `  ${line}`), "}");
const itemsConst = (c) => `const items = [${c.items.map(([name, price], index) => `{ id: ${index + 1}, name: "${name}", price: ${price} }`).join(", ")}];`;
const serverFile = (pre, body) => file('import http from "node:http";', 'import { readFile } from "node:fs/promises";', 'import path from "node:path";', ...pre, "const port = Number(process.env.PORT ?? 3000);", "const server = http.createServer(async (req, res) => {", ...body.map((line) => `  ${line}`), "});", "server.listen(port);");
const sendFn = ["function send(res, status, data) {", "  res.statusCode = status;", '  res.setHeader("Content-Type", "application/json");', "  res.end(JSON.stringify(data));", "}"];
const readBodyFn = 'async function readBody(req) { let text = ""; for await (const chunk of req) text += chunk; return text; }';
const S = {
  index: 'if (req.url === "/") { res.setHeader("Content-Type", "text/html; charset=utf-8"); return res.end(await readFile(path.join("dist", "index.html"))); }',
  indexNoCache: 'if (req.url === "/") { res.setHeader("Content-Type", "text/html; charset=utf-8"); res.setHeader("Cache-Control", "no-cache"); return res.end(await readFile(path.join("dist", "index.html"))); }',
  appJs: 'if (req.url === "/assets/app.js") { res.setHeader("Content-Type", "text/javascript"); return res.end(await readFile(path.join("dist", "assets", "app.js"))); }',
  assets: 'if (req.url.startsWith("/assets/")) { const file = path.join("dist", req.url); res.setHeader("Content-Type", types[path.extname(file)] ?? "application/octet-stream"); return res.end(await readFile(file)); }',
  assetsSafe: 'if (req.url.startsWith("/assets/")) { const file = path.join("dist", req.url); try { const body = await readFile(file); res.setHeader("Content-Type", types[path.extname(file)] ?? "application/octet-stream"); return res.end(body); } catch { res.statusCode = 404; return res.end("Missing file"); } }',
  assetsCache: 'if (req.url.startsWith("/assets/")) { const file = path.join("dist", req.url); try { const body = await readFile(file); res.setHeader("Content-Type", types[path.extname(file)] ?? "application/octet-stream"); res.setHeader("Cache-Control", "public, max-age=31536000, immutable"); return res.end(body); } catch { res.statusCode = 404; return res.end("Missing file"); } }',
  spa: 'if (req.method === "GET" && !req.url.startsWith("/api/")) { res.setHeader("Content-Type", "text/html; charset=utf-8"); return res.end(await readFile(path.join("dist", "index.html"))); }',
  nosniff: 'res.setHeader("X-Content-Type-Options", "nosniff");',
  health: 'if (req.url === "/health") return send(res, 200, { ok: true });',
  missingText: 'res.statusCode = 404; res.end("Not found");',
  missing: 'send(res, 404, { error: "Not found" });',
  apiMissing: 'if (req.url.startsWith("/api/")) return send(res, 404, { error: "No such API route" });',
  types: 'const types = { ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" };',
};


const tracks = [
  {
    key: "setup", title: "Setting Up a React Project",
    concepts: ["fs-npm-install", "react-jsx-element", "fs-build", "fs-index-html", null, "react-list-rendering", "react-jsx-class-name", "fs-rebuild", "react-component", "react-component-composition"],
    build(c) {
      const names = json(c.items.map(([name]) => name));
      const A = [];
      A[0] = [[], ["return (", "  <main>", "    <h1>Hello</h1>", "  </main>", ");"]];
      A[2] = [[], ["return (", "  <main>", `    <h1>${c.title}</h1>`, "  </main>", ");"]];
      A[5] = [[], ["return (", "  <main>", `    <h1>${c.title}</h1>`, "    <p>Open 7 AM to 7 PM</p>", "  </main>", ");"]];
      A[6] = [[], [`const names = ${names};`, "return (", "  <main>", `    <h1>${c.title}</h1>`, "    <p>Open 7 AM to 7 PM</p>", "    <ul>{names.map((name) => <li key={name}>{name}</li>)}</ul>", "  </main>", ");"]];
      A[7] = [[], A[6][1].map((line) => (line === `    <h1>${c.title}</h1>` ? `    <h1 className="title">${c.title}</h1>` : line))];
      A[10] = [['import Footer from "./Footer.jsx";'], [...A[7][1].slice(0, 6), "    <Footer />", ...A[7][1].slice(6)]];
      const app = (n) => ({ "src/App.jsx": appJsx(...A[n]) });
      const footer = file("export default function Footer() {", `  return <footer>${c.title}, serving since 2026</footer>;`, "}");
      return {
        seed: { ...base(c), "src/App.jsx": appJsx(...A[0]) },
        steps: [
          { where: "In the terminal, inside the project folder", goal: "download the packages listed in package.json with npm install", files: {}, commands: ["npm install"], tests: [T.file("lock", "local-file-exists", { path: "package-lock.json" }, "npm install made package-lock.json")] },
          { where: "Change the h1 line in src/App.jsx", goal: `show ${c.title} as the page heading`, files: app(2), tests: [T.render("heading", "src/App.jsx", {}, { contains: `<h1>${c.title}</h1>` }, `App shows the heading ${c.title}`)] },
          { where: "In the terminal", goal: "build the app for the web with npm run build, which writes the dist folder", files: {}, commands: ["npm run build"], tests: [T.file("dist", "local-file-exists", { path: "dist/index.html" }, "dist/index.html exists")] },
          { where: "Change the title line in index.html", goal: "give the browser tab a real title", files: { "index.html": indexHtml(c.title) }, tests: [T.file("title", "local-file-contains", { path: "index.html", value: `<title>${c.title}</title>` }, `index.html has the title ${c.title}`)] },
          { where: "Add one line after the h1 in src/App.jsx", goal: "show the opening hours under the heading", files: app(5), tests: [T.render("hours", "src/App.jsx", {}, { contains: "<p>Open 7 AM to 7 PM</p>" }, "App shows the opening hours")] },
          { where: "Add a names array above return and a list after the hours", goal: "show every product in a list with map and a key", files: app(6), tests: [T.render("list", "src/App.jsx", {}, { contains: `<li>${c.items[0][0]}</li>` }, `App lists ${c.items[0][0]}`)] },
          { where: "Change the h1 line", goal: "give the heading a class with className", files: app(7), tests: [T.render("class", "src/App.jsx", {}, { contains: 'class="title"' }, "The heading has class title")] },
          { where: "In the terminal", goal: "build again so dist has the new title", files: {}, commands: ["npm run build"], tests: [T.file("rebuilt", "local-file-contains", { path: "dist/index.html", value: `<title>${c.title}</title>` }, "dist/index.html has the new title")] },
          { where: "Make a new file src/Footer.jsx with three lines", goal: "write a Footer component in its own file", files: { "src/Footer.jsx": footer }, tests: [T.render("footer", "src/Footer.jsx", {}, { contains: "serving since 2026" }, "Footer shows its text")] },
          { where: "Import Footer at the top of src/App.jsx and use it after the list", goal: "show the Footer inside App", files: app(10), tests: [T.render("used", "src/App.jsx", {}, { contains: "<footer>" }, "App shows the footer")] },
        ],
      };
    },
  },
  {
    key: "props", title: "Components with Props",
    concepts: ["react-props", null, "fs-default-prop", "react-conditional-rendering", null, "fs-conditional-class", null, "react-derived-state", "react-children", null],
    build(c) {
      const items = c.items.map(([name, price], index) => ({ id: index + 1, name, price }));
      const L = [];
      const sig = (params) => `export default function ItemList({ ${params} }) {`;
      const liName = "      {items.map((item) => <li key={item.id}>{item.name}</li>)}";
      const liPrice = "      {items.map((item) => <li key={item.id}>{item.name}: {item.price}</li>)}";
      const liCur = "      {items.map((item) => <li key={item.id}>{item.name}: {currency} {item.price}</li>)}";
      const liCheap = '      {items.map((item) => <li key={item.id} className={item.price < 40 ? "cheap" : undefined}>{item.name}: {currency} {item.price}</li>)}';
      const liShown = '      {shown.map((item) => <li key={item.id} className={item.price < 40 ? "cheap" : undefined}>{item.name}: {currency} {item.price}</li>)}';
      const list = (params, pre, li, sectionTop = [], sectionBottom = []) => file(sig(params), ...pre.map((line) => `  ${line}`), "  return (", "    <section>", ...sectionTop, "      <ul>", li.replace(/^ {6}/, "        "), "      </ul>", ...sectionBottom, "    </section>", "  );", "}");
      L[0] = list("items", [], liName);
      L[2] = list("items", [], liPrice);
      L[3] = list('items, currency = "PHP"', [], liCur);
      L[4] = list('items, currency = "PHP"', ['if (items.length === 0) return <p>No items yet</p>;'], liCur);
      L[5] = list('items, currency = "PHP", title', ['if (items.length === 0) return <p>No items yet</p>;'], liCur, ["      <h2>{title}</h2>"]);
      L[6] = list('items, currency = "PHP", title', ['if (items.length === 0) return <p>No items yet</p>;'], liCheap, ["      <h2>{title}</h2>"]);
      L[7] = list('items, currency = "PHP", title', ['if (items.length === 0) return <p>No items yet</p>;'], liCheap, ["      <h2>{title}</h2>", "      <p>{items.length} items</p>"]);
      L[8] = list('items, currency = "PHP", title, sortByPrice = false', ['if (items.length === 0) return <p>No items yet</p>;', "const shown = sortByPrice ? [...items].sort((a, b) => a.price - b.price) : items;"], liShown, ["      <h2>{title}</h2>", "      <p>{items.length} items</p>"]);
      L[9] = list('items, currency = "PHP", title, sortByPrice = false, children', ['if (items.length === 0) return <p>No items yet</p>;', "const shown = sortByPrice ? [...items].sort((a, b) => a.price - b.price) : items;"], liShown, ["      <h2>{title}</h2>", "      <p>{items.length} items</p>"], ["      {children}"]);
      const A = [];
      A[0] = [[], ["return (", "  <main>", `    <h1>${c.title}</h1>`, "  </main>", ");"]];
      A[1] = [['import ItemList from "./ItemList.jsx";', itemsConst(c)], ["return (", "  <main>", `    <h1>${c.title}</h1>`, "    <ItemList items={items} />", "  </main>", ");"]];
      A[10] = [A[1][0], A[1][1].map((line) => (line === "    <ItemList items={items} />" ? `    <ItemList items={items} title="${c.title} price list" currency="PHP" sortByPrice />` : line))];
      const app = (n) => ({ "src/App.jsx": appJsx(...A[n]) });
      const L1 = (n) => ({ "src/ItemList.jsx": L[n] });
      const props = { items };
      const sorted = [...items].sort((a, b) => a.price - b.price);
      const cheap = items.find((item) => item.price < 40);
      return {
        seed: { ...base(c, c.title), "src/App.jsx": appJsx(...A[0]), "src/ItemList.jsx": L[0] },
        steps: [
          { where: "Add an import and an items array at the top of src/App.jsx, and use ItemList after the h1", goal: "pass the items array to the ItemList component as a prop", files: app(1), commands: ["npm install"], tests: [T.render("list", "src/App.jsx", {}, { contains: `<li>${items[0].name}</li>` }, `App lists ${items[0].name} through ItemList`)] },
          { where: "Change the list line in src/ItemList.jsx", goal: "show each item's price next to its name", files: L1(2), tests: [T.render("price", "src/ItemList.jsx", props, { contains: `${items[0].name}: ${items[0].price}` }, `ItemList shows ${items[0].name}: ${items[0].price}`)] },
          { where: "Add currency to the props with a default and show it in the list", goal: "take an optional currency prop that defaults to PHP", files: L1(3), tests: [T.render("currency", "src/ItemList.jsx", { ...props, currency: "USD" }, { contains: `${items[0].name}: USD ${items[0].price}` }, "With currency USD the list shows USD")] },
          { where: "Add one line before return", goal: "show a friendly message when there are no items", files: L1(4), tests: [T.render("empty", "src/ItemList.jsx", { items: [] }, { contains: "No items yet" }, "An empty list shows No items yet")] },
          { where: "Add title to the props and an h2 inside the section", goal: "show a title passed in by the parent", files: L1(5), tests: [T.render("title", "src/ItemList.jsx", { ...props, title: "Today" }, { contains: "<h2>Today</h2>" }, "The title prop appears as a heading")] },
          { where: "Change the list line", goal: "mark items under 40 pesos with a cheap class", files: L1(6), tests: [T.render("cheap", "src/ItemList.jsx", props, { contains: `<li class="cheap">${cheap.name}` }, `${cheap.name} is marked cheap`)] },
          { where: "Add one line after the h2", goal: "show how many items there are", files: L1(7), tests: [T.render("count", "src/ItemList.jsx", props, { contains: "<p>3 items</p>" }, "The list says 3 items")] },
          { where: "Add a sortByPrice prop, one line that sorts a copy, and use it in the list", goal: "sort cheapest first when sortByPrice is true, without changing the original array", files: L1(8), tests: [T.render("sorted", "src/ItemList.jsx", { ...props, sortByPrice: true }, { contains: `<ul>${sorted.map((item) => `<li${item.price < 40 ? ' class="cheap"' : ""}>${item.name}: PHP ${item.price}</li>`).join("")}</ul>` }, `With sortByPrice the list starts with ${sorted[0].name}`)] },
          { where: "Add children to the props and show it at the end of the section", goal: "let the parent put extra content inside the list with children", files: L1(9), tests: [T.render("children", "src/ItemList.jsx", { ...props, children: "Prices updated today" }, { contains: "Prices updated today</section>" }, "Text passed as children appears at the end")] },
          { where: "Change the ItemList line in src/App.jsx", goal: "pass a title, a currency, and sortByPrice from App", files: app(10), tests: [T.render("app", "src/App.jsx", {}, { contains: `<h2>${c.title} price list</h2>` }, "App passes a title to ItemList")] },
        ],
      };
    },
  },
  {
    key: "serving", title: "Serving the Built App",
    concepts: ["fs-dist", "fs-serve-index", "fs-content-type-js", "fs-static-files", "fs-missing-asset", "fs-asset-cache", "fs-spa-fallback", "fs-index-no-cache", "fs-nosniff", "fs-health-route"],
    build(c) {
      const pre = (extra = []) => [...sendFn, ...extra];
      const srv = (extra, body) => ({ "server.js": serverFile(pre(extra), body) });
      const v = [];
      v[2] = [[], [S.index, S.missingText]];
      v[3] = [[], [S.index, S.appJs, S.missingText]];
      v[4] = [[S.types], [S.index, S.assets, S.missingText]];
      v[5] = [[S.types], [S.index, S.assetsSafe, S.missingText]];
      v[6] = [[S.types], [S.index, S.assetsCache, S.missingText]];
      v[7] = [[S.types], [S.index, S.assetsCache, S.spa, S.missingText]];
      v[8] = [[S.types], [S.indexNoCache, S.assetsCache, S.spa, S.missingText]];
      v[9] = [[S.types], [S.nosniff, S.indexNoCache, S.assetsCache, S.spa, S.missingText]];
      v[10] = [[S.types], [S.nosniff, S.health, S.indexNoCache, S.assetsCache, S.spa, S.missingText]];
      const app = appJsx([], ["return (", "  <main>", `    <h1>${c.title}</h1>`, "  </main>", ");"]);
      return {
        seed: { ...base(c, c.title), "src/App.jsx": app, "server.js": serverFile(pre(), ['res.end("Server is running");']) },
        steps: [
          { where: "In the terminal", goal: "install the packages and build the app into dist", files: {}, commands: ["npm install", "npm run build"], tests: [T.file("dist", "local-file-exists", { path: "dist/assets/app.js" }, "dist/assets/app.js exists")] },
          { where: "Replace the res.end line in server.js with two lines", goal: "answer GET / with the built index.html and a 404 for anything else", files: srv(...v[2]), tests: [T.http("index", { requests: [GET("/")], bodyContains: '<div id="root"></div>', header: { name: "content-type", value: "text/html" } }, "GET / answers the built page")] },
          { where: "Add one line after the / route", goal: "serve the built JavaScript file with a JavaScript content type", files: srv(...v[3]), tests: [T.http("js", { requests: [GET("/assets/app.js")], header: { name: "content-type", value: "text/javascript" } }, "GET /assets/app.js answers JavaScript")] },
          { where: "Add a types map above the server and replace the app.js line", goal: "serve every file in dist/assets with the right content type", files: srv(...v[4]), tests: [T.http("css", { requests: [GET("/assets/index.css")], header: { name: "content-type", value: "text/css" } }, "GET /assets/index.css answers CSS")] },
          { where: "Change the /assets/ line", goal: "answer 404 for a missing file instead of crashing", files: srv(...v[5]), tests: [T.http("missing", { requests: [GET("/assets/nope.js")], status: 404 }, "GET /assets/nope.js answers 404"), T.http("alive", { requests: [GET("/assets/nope.js"), GET("/")], status: 200 }, "The server keeps answering afterwards")] },
          { where: "Change the /assets/ line", goal: "let browsers keep built files for a year, since their names change when the content does", files: srv(...v[6]), tests: [T.http("cache", { requests: [GET("/assets/app.js")], header: { name: "cache-control", value: "immutable" } }, "Built files are sent with a long cache")] },
          { where: "Add one line before the 404 line", goal: "answer other page paths with index.html so the React app can handle them", files: srv(...v[7]), tests: [T.http("spa", { requests: [GET("/about")], status: 200, bodyContains: '<div id="root"></div>' }, "GET /about answers the app page")] },
          { where: "Change the / line", goal: "tell browsers to check for a new index.html every time", files: srv(...v[8]), tests: [T.http("nocache", { requests: [GET("/")], header: { name: "cache-control", value: "no-cache" } }, "GET / sends Cache-Control: no-cache")] },
          { where: "Add one line at the top of the handler", goal: "add the nosniff safety header to every answer", files: srv(...v[9]), tests: [T.http("nosniff", { requests: [GET("/")], header: { name: "x-content-type-options", value: "nosniff" } }, "Answers send X-Content-Type-Options: nosniff")] },
          { where: "Add one line after the nosniff line", goal: "answer /health with JSON so a hosting service can check the server", files: srv(...v[10]), tests: [T.http("health", { requests: [GET("/health")], bodyContains: '"ok":true' }, "GET /health answers ok")] },
        ],
      };
    },
  },
  {
    key: "api", title: "An API Beside the App",
    concepts: ["fs-same-server-api", "react-effect", "react-state", null, "fs-server-validation", "fs-error-message", "fs-computed-total", null, "fs-api-404", "fs-stable-key"],
    build(c) {
      const items = c.items.map(([name, price], index) => ({ id: index + 1, name, price }));
      const total = items.reduce((sum, item) => sum + item.price, 0);
      const create = (lines) => ["async function createItem(req, res) {", ...lines.map((line) => `  ${line}`), "}"];
      const C0 = ['return send(res, 501, { error: "Not built yet" });'];
      const C4 = ["const item = { id: items.length + 1, ...JSON.parse(await readBody(req)) };", "items.push(item);", "return send(res, 201, item);"];
      const C5 = ["const data = JSON.parse(await readBody(req));", 'if (typeof data.name !== "string" || !data.name.trim() || !Number.isFinite(data.price)) return send(res, 422, { error: "Send a name and a number price" });', "const item = { id: items.length + 1, name: data.name, price: data.price };", ...C4.slice(1)];
      const routes = {
        list: 'if (req.url === "/api/items" && req.method === "GET") return send(res, 200, items);',
        post: 'if (req.url === "/api/items" && req.method === "POST") return createItem(req, res);',
        summary: 'if (req.url === "/api/summary") return send(res, 200, { count: items.length, total: items.reduce((sum, item) => sum + item.price, 0) });',
      };
      const pre = (fnLines) => [...sendFn, readBodyFn, S.types, itemsConst(c), ...create(fnLines)];
      const head = ['import { useEffect, useState } from "react";'];
      const A = [];
      const h1 = `    <h1>${c.title}</h1>`;
      const ul = "    <ul>{items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>";
      const ulId = "    <ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>";
      A[0] = [head, ["const [items, setItems] = useState([]);", "return (", "  <main>", h1, ul, "  </main>", ");"]];
      A[2] = [head, ["const [items, setItems] = useState([]);", "useEffect(() => {", '  fetch("/api/items").then((response) => response.json()).then(setItems);', "}, []);", "return (", "  <main>", h1, ul, "  </main>", ");"]];
      A[3] = [head, ["const [items, setItems] = useState([]);", "const [loading, setLoading] = useState(true);", "useEffect(() => {", '  fetch("/api/items").then((response) => response.json()).then((data) => { setItems(data); setLoading(false); });', "}, []);", "return (", "  <main>", h1, "    {loading && <p>Loading items…</p>}", ul, "  </main>", ");"]];
      A[6] = [head, ["const [items, setItems] = useState([]);", "const [loading, setLoading] = useState(true);", 'const [error, setError] = useState("");', "useEffect(() => {", '  fetch("/api/items").then((response) => response.json()).then((data) => { setItems(data); setLoading(false); }).catch(() => { setError("Could not load items"); setLoading(false); });', "}, []);", "return (", "  <main>", h1, "    {loading && <p>Loading items…</p>}", '    {error && <p role="alert">{error}</p>}', ul, "  </main>", ");"]];
      A[7] = [head, [...A[6][1].slice(0, 12), "    <p>Total: {items.reduce((sum, item) => sum + item.price, 0)} pesos</p>", ...A[6][1].slice(12)]];
      A[10] = [head, A[7][1].map((line) => (line === ul ? ulId : line))];
      const app = (n) => ({ "src/App.jsx": appJsx(...A[n]) });
      const seedServer = serverFile(pre(C0).filter((line) => line !== itemsConst(c)), [S.nosniff, S.health, routes.post, S.indexNoCache, S.assetsCache, S.spa, S.missingText]);
      const withItems = (fnLines, r) => ({ "server.js": serverFile(pre(fnLines), [S.nosniff, S.health, ...r, S.indexNoCache, S.assetsCache, S.spa, S.missingText]) });
      return {
        seed: { ...base(c, c.title), "src/App.jsx": appJsx(...A[0]), "server.js": seedServer },
        steps: [
          { where: "Add an items array above createItem and one route after /health in server.js, then install and build", goal: "answer GET /api/items with JSON from the same server that serves the app", files: withItems(C0, [routes.list, routes.post]), commands: ["npm install", "npm run build"], tests: [T.http("list", { requests: [GET("/api/items")], bodyContains: `"name":"${items[0].name}"` }, "GET /api/items answers the items as JSON")] },
          { where: "Add a three-line useEffect after the useState line in src/App.jsx", goal: "load the items from /api/items once, when the page first shows", files: app(2), tests: [T.file("fetch", "local-file-contains", { path: "src/App.jsx", value: 'fetch("/api/items")' }, "App fetches /api/items"), T.build("build", "The app still builds")] },
          { where: "Add a loading state, set it to false after loading, and show a message while it is true", goal: "show Loading items… until the data arrives", files: app(3), tests: [T.render("loading", "src/App.jsx", {}, { contains: "Loading items…" }, "App first shows Loading items…")] },
          { where: "Replace the line inside createItem with three lines", goal: "add a new item with POST /api/items and answer 201", files: withItems(C4, [routes.list, routes.post]), tests: [T.http("post", { requests: [POST("/api/items", { name: "Tea", price: 12 })], status: 201, bodyContains: '"id":4' }, "POST /api/items answers 201 with id 4")] },
          { where: "Read the body into data, check it, and build the item from its fields", goal: "answer 422 when the name or price is missing", files: withItems(C5, [routes.list, routes.post]), tests: [T.http("invalid", { requests: [POST("/api/items", { price: 5 })], status: 422 }, "POST /api/items without a name answers 422")] },
          { where: "Add an error state, catch failed requests, and show the error", goal: "show a clear message when loading fails", files: app(6), tests: [T.file("alert", "local-file-contains", { path: "src/App.jsx", value: '<p role="alert">{error}</p>' }, "App shows errors in an alert"), T.build("build", "The app still builds")] },
          { where: "Add one line after the error line", goal: "show the total price of the loaded items", files: app(7), tests: [T.render("total", "src/App.jsx", {}, { contains: "Total: 0 pesos" }, "Before loading, App shows Total: 0 pesos")] },
          { where: "Add one route after the POST route", goal: "answer /api/summary with the count and total", files: withItems(C5, [routes.list, routes.post, routes.summary]), tests: [T.http("summary", { requests: [GET("/api/summary")], bodyContains: json({ count: 3, total }) }, `GET /api/summary answers count 3 and total ${total}`)] },
          { where: "Add one line after the summary route", goal: "answer unknown /api/ paths with a JSON 404 instead of the app page", files: withItems(C5, [routes.list, routes.post, routes.summary, S.apiMissing]), tests: [T.http("api404", { requests: [GET("/api/nope")], status: 404, bodyContains: "No such API route" }, "GET /api/nope answers a JSON 404")] },
          { where: "Change the list line in src/App.jsx", goal: "use each item's id from the API as its key", files: app(10), tests: [T.file("key", "local-file-contains", { path: "src/App.jsx", value: "key={item.id}" }, "The list uses item.id as the key"), T.build("build", "The app still builds")] },
        ],
      };
    },
  },
  {
    key: "states", title: "Loading, Empty, and Error States",
    concepts: ["fs-view-states", "fs-error-state", "fs-empty-message", null, "fs-retry", "fs-aria-busy", null, "fs-updated-at", "fs-offline", null],
    build(c) {
      const items = c.items.map(([name, price], index) => ({ id: index + 1, name, price }));
      const V = [];
      const sig = "export default function ItemsView({ status, items = [], error = \"\", updatedAt }) {";
      const body = (pre, ret) => file(sig, ...pre.map((line) => `  ${line}`), `  return ${ret};`, "}");
      const load = 'if (status === "loading") return <p role="status">Loading items…</p>;';
      const loadBusy = 'if (status === "loading") return <p role="status" aria-busy="true">Loading items…</p>;';
      const err = 'if (status === "error") return <p role="alert">{error || "Something went wrong"}</p>;';
      const errRetry = 'if (status === "error") return <p role="alert">{error || "Something went wrong"} <button type="button">Try again</button></p>;';
      const off = 'if (status === "offline") return <p role="alert">You are offline. Showing saved items.</p>;';
      const empty = "if (items.length === 0) return <p>No items yet. Add the first one.</p>;";
      const list = "<ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>";
      const counted = "<section><p>{items.length} items</p><ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul></section>";
      const dated = "<section><p>{items.length} items</p>{updatedAt && <p>Updated {updatedAt}</p>}<ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul></section>";
      V[0] = body([], "<section>{status}</section>");
      V[1] = body([load], "<section>{status}</section>");
      V[2] = body([load, err], "<section>{status}</section>");
      V[3] = body([load, err, empty], "<section>{status}</section>");
      V[4] = body([load, err, empty], list);
      V[5] = body([load, errRetry, empty], list);
      V[6] = body([loadBusy, errRetry, empty], list);
      V[7] = body([loadBusy, errRetry, empty], counted);
      V[8] = body([loadBusy, errRetry, empty], dated);
      V[9] = body([loadBusy, errRetry, off, empty], dated);
      const view = (n) => ({ "src/ItemsView.jsx": V[n] });
      const A0 = appJsx([], ["return (", "  <main>", `    <h1>${c.title}</h1>`, "  </main>", ");"]);
      const A10 = appJsx(['import ItemsView from "./ItemsView.jsx";'], ["return (", "  <main>", `    <h1>${c.title}</h1>`, '    <ItemsView status="loading" />', "  </main>", ");"]);
      return {
        seed: { ...base(c, c.title), "src/App.jsx": A0, "src/ItemsView.jsx": V[0] },
        steps: [
          { where: "Add one line before return in src/ItemsView.jsx, then run npm install", goal: "show a loading message while status is loading", files: view(1), commands: ["npm install"], tests: [T.render("loading", "src/ItemsView.jsx", { status: "loading" }, { contains: "Loading items…" }, "status loading shows Loading items…")] },
          { where: "Add one line after the loading line", goal: "show the error, or a general message, when status is error", files: view(2), tests: [T.render("error", "src/ItemsView.jsx", { status: "error", error: "Server is down" }, { contains: '<p role="alert">Server is down</p>' }, "status error shows the error message")] },
          { where: "Add one line after the error line", goal: "invite the user to add the first item when the list is empty", files: view(3), tests: [T.render("empty", "src/ItemsView.jsx", { status: "ready", items: [] }, { contains: "No items yet. Add the first one." }, "An empty list shows an inviting message")] },
          { where: "Change the return line", goal: "show the items as a list when everything is ready", files: view(4), tests: [T.render("list", "src/ItemsView.jsx", { status: "ready", items }, { contains: `<li>${items[0].name}</li>` }, `A ready list shows ${items[0].name}`)] },
          { where: "Change the error line", goal: "offer a Try again button with the error", files: view(5), tests: [T.render("retry", "src/ItemsView.jsx", { status: "error" }, { contains: "Try again</button>" }, "The error state has a Try again button")] },
          { where: "Change the loading line", goal: "tell screen readers the area is busy while loading", files: view(6), tests: [T.render("busy", "src/ItemsView.jsx", { status: "loading" }, { contains: 'aria-busy="true"' }, "The loading message has aria-busy")] },
          { where: "Change the return line", goal: "show how many items are listed", files: view(7), tests: [T.render("count", "src/ItemsView.jsx", { status: "ready", items }, { contains: "<p>3 items</p>" }, "The list says 3 items")] },
          { where: "Change the return line", goal: "show when the list was last updated, only if updatedAt is given", files: view(8), tests: [T.render("updated", "src/ItemsView.jsx", { status: "ready", items, updatedAt: "8:00 AM" }, { contains: "Updated 8:00 AM" }, "updatedAt appears when given")] },
          { where: "Add one line after the error line", goal: "explain the offline state clearly", files: view(9), tests: [T.render("offline", "src/ItemsView.jsx", { status: "offline" }, { contains: "You are offline" }, "status offline explains the situation")] },
          { where: "Import ItemsView in src/App.jsx and show it after the h1", goal: "use ItemsView inside App", files: { "src/App.jsx": A10 }, tests: [T.render("app", "src/App.jsx", {}, { contains: "Loading items…" }, "App shows the loading state from ItemsView")] },
        ],
      };
    },
  },
  {
    key: "forms", title: "Forms that Send Data",
    concepts: ["fs-form-label", "fs-number-input", "fs-submit-button", "fs-default-value", "fs-prevent-default", "fs-form-error", "fs-disabled-button", null, "fs-post-json", null],
    build(c) {
      const F = [];
      const sig = (params) => `export default function ItemForm({ ${params} }) {`;
      const form = (params, pre, formTag, inner) => file(sig(params), ...pre.map((line) => `  ${line}`), "  return (", `    ${formTag}`, ...inner.map((line) => `      ${line}`), "    </form>", "  );", "}");
      const nameL = ['<label htmlFor="name">Name</label>', '<input id="name" name="name" required />'];
      const nameD = ['<label htmlFor="name">Name</label>', '<input id="name" name="name" defaultValue={initialName} required />'];
      const priceL = ['<label htmlFor="price">Price</label>', '<input id="price" name="price" type="number" min="0" required />'];
      const button = '<button type="submit">Add item</button>';
      const buttonD = '<button type="submit" disabled={saving}>{saving ? "Saving…" : "Add item"}</button>';
      const handler = 'function handleSubmit(event) { event.preventDefault(); const data = new FormData(event.target); onSubmit?.({ name: data.get("name"), price: Number(data.get("price")) }); }';
      const errorLine = '{error && <p role="alert">{error}</p>}';
      F[0] = form("onSubmit", [], "<form>", []);
      F[1] = form("onSubmit", [], "<form>", nameL);
      F[2] = form("onSubmit", [], "<form>", [...nameL, ...priceL]);
      F[3] = form("onSubmit", [], "<form>", [...nameL, ...priceL, button]);
      F[4] = form('onSubmit, initialName = ""', [], "<form>", [...nameD, ...priceL, button]);
      F[5] = form('onSubmit, initialName = ""', [handler], "<form onSubmit={handleSubmit}>", [...nameD, ...priceL, button]);
      F[6] = form('onSubmit, initialName = "", error', [handler], "<form onSubmit={handleSubmit}>", [...nameD, ...priceL, errorLine, button]);
      F[7] = form('onSubmit, initialName = "", error, saving = false', [handler], "<form onSubmit={handleSubmit}>", [...nameD, ...priceL, errorLine, buttonD]);
      const fm = (n) => ({ "src/ItemForm.jsx": F[n] });
      const create = (lines) => ["async function createItem(req, res) {", ...lines.map((line) => `  ${line}`), "}"];
      const C0 = ['return send(res, 501, { error: "Not built yet" });'];
      const C8 = ["const data = JSON.parse(await readBody(req));", 'if (typeof data.name !== "string" || !data.name.trim() || !Number.isFinite(data.price) || data.price < 0) return send(res, 422, { error: "Send a name and a price of 0 or more" });', "return send(res, 201, { id: 4, ...data });"];
      const post = 'if (req.url === "/api/items" && req.method === "POST") return createItem(req, res);';
      const srv = (fnLines) => ({ "server.js": serverFile([...sendFn, readBodyFn, S.types, ...create(fnLines)], [S.nosniff, S.health, post, S.indexNoCache, S.assetsCache, S.spa, S.missingText]) });
      const A0 = appJsx([], ["return (", "  <main>", `    <h1>${c.title}</h1>`, "  </main>", ");"]);
      const addItem = 'function addItem(item) { fetch("/api/items", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) }); }';
      const A9 = appJsx([], [addItem, "return (", "  <main>", `    <h1>${c.title}</h1>`, "  </main>", ");"]);
      const A10 = appJsx(['import ItemForm from "./ItemForm.jsx";'], [addItem, "return (", "  <main>", `    <h1>${c.title}</h1>`, "    <ItemForm onSubmit={addItem} />", "  </main>", ");"]);
      return {
        seed: { ...base(c, c.title), "src/App.jsx": A0, "src/ItemForm.jsx": F[0], "server.js": serverFile([...sendFn, readBodyFn, S.types, ...create(C0)], [S.nosniff, S.health, post, S.indexNoCache, S.assetsCache, S.spa, S.missingText]) },
        steps: [
          { where: "Add a label and an input inside the form in src/ItemForm.jsx, then run npm install", goal: "add a name field whose label is connected to it", files: fm(1), commands: ["npm install"], tests: [T.render("name", "src/ItemForm.jsx", {}, { contains: '<label for="name">Name</label><input id="name"' }, "The form has a labelled name field")] },
          { where: "Add a label and an input after the name field", goal: "add a price field that only accepts numbers of 0 or more", files: fm(2), tests: [T.render("price", "src/ItemForm.jsx", {}, { contains: 'type="number" min="0"' }, "The price field is a number input")] },
          { where: "Add one line after the price field", goal: "add a submit button with a clear label", files: fm(3), tests: [T.render("button", "src/ItemForm.jsx", {}, { contains: '<button type="submit">Add item</button>' }, "The form has an Add item button")] },
          { where: "Add initialName to the props and use it as the name field's starting value", goal: "let the parent fill in a starting name", files: fm(4), tests: [T.render("initial", "src/ItemForm.jsx", { initialName: "Tea" }, { contains: 'value="Tea"' }, "initialName Tea fills the name field")] },
          { where: "Add a handleSubmit function before return and connect it to the form", goal: "stop the page from reloading and send the form data to onSubmit", files: fm(5), tests: [T.file("prevent", "local-file-contains", { path: "src/ItemForm.jsx", value: "event.preventDefault()" }, "handleSubmit stops the page reload"), T.build("build", "The app still builds")] },
          { where: "Add error to the props and show it before the button", goal: "show an error message passed in by the parent", files: fm(6), tests: [T.render("error", "src/ItemForm.jsx", { error: "Price must be 0 or more" }, { contains: '<p role="alert">Price must be 0 or more</p>' }, "The error appears in an alert")] },
          { where: "Add saving to the props and change the button", goal: "disable the button and say Saving… while the form is being sent", files: fm(7), tests: [T.render("saving", "src/ItemForm.jsx", { saving: true }, { contains: 'disabled="">Saving…</button>' }, "While saving, the button is disabled")] },
          { where: "Replace the line inside createItem in server.js with three lines", goal: "check the posted item on the server and answer 201 or 422", files: srv(C8), tests: [T.http("ok", { requests: [POST("/api/items", { name: "Tea", price: 12 })], status: 201 }, "A good item answers 201"), T.http("bad", { requests: [POST("/api/items", { name: "Tea", price: -1 })], status: 422 }, "A negative price answers 422")] },
          { where: "Add an addItem function at the top of App in src/App.jsx", goal: "send a new item to the API as JSON with POST", files: { "src/App.jsx": A9 }, tests: [T.file("post", "local-file-contains", { path: "src/App.jsx", value: 'method: "POST"' }, "App sends items with POST"), T.build("build", "The app still builds")] },
          { where: "Import ItemForm and show it after the h1", goal: "show the form and connect it to addItem", files: { "src/App.jsx": A10 }, tests: [T.render("form", "src/App.jsx", {}, { contains: "Add item</button>" }, "App shows the form")] },
        ],
      };
    },
  },
  {
    key: "config", title: "Settings for Front and Back End",
    concepts: ["fs-vite-env", "fs-env-file", "fs-env-example", "fs-gitignore", "fs-server-config", "fs-public-config", "fs-required-secret", null, "fs-build-time-env", "fs-mode-env"],
    build(c) {
      const A = [];
      A[0] = [[], ["return (", "  <main>", `    <h1>${c.title}</h1>`, "  </main>", ");"]];
      A[1] = [[], ['const place = import.meta.env.VITE_PLACE ?? "Our store";', "return (", "  <main>", "    <h1>{place}</h1>", "  </main>", ");"]];
      A[8] = [[], ['const place = import.meta.env.VITE_PLACE ?? "Our store";', "return (", "  <main>", "    <h1>{place}</h1>", '    <p>Prices in {import.meta.env.VITE_CURRENCY ?? "PHP"}</p>', "  </main>", ");"]];
      const app = (n) => ({ "src/App.jsx": appJsx(...A[n]) });
      const configLine = 'const config = { place: process.env.PLACE ?? "Our store", currency: process.env.CURRENCY ?? "PHP", apiKey: process.env.API_KEY ?? "" };';
      const required = 'if (process.env.NODE_ENV === "production" && !process.env.API_KEY) { console.error("API_KEY is required in production"); process.exit(1); }';
      const leak = 'if (req.url === "/api/config") return send(res, 200, config);';
      const safe = 'if (req.url === "/api/config") { const { apiKey, ...publicConfig } = config; return send(res, 200, publicConfig); }';
      const srv = (pre, route) => ({ "server.js": serverFile([...sendFn, S.types, ...pre], [S.nosniff, S.health, ...(route ? [route] : []), S.indexNoCache, S.assetsCache, S.spa, S.missingText]) });
      return {
        seed: { ...base(c, c.title), "src/App.jsx": appJsx(...A[0]), "server.js": serverFile([...sendFn, S.types], [S.nosniff, S.health, S.indexNoCache, S.assetsCache, S.spa, S.missingText]) },
        steps: [
          { where: "Add a place line before return in src/App.jsx and use it in the h1, then run npm install", goal: "read the place name from a VITE_PLACE setting, with Our store as the default", files: app(1), commands: ["npm install"], tests: [T.render("default", "src/App.jsx", {}, { contains: "<h1>Our store</h1>" }, "Without a setting, App shows Our store")] },
          { where: "Make a new file named .env with one line", goal: `set VITE_PLACE to ${c.title} for this project`, files: { ".env": file(`VITE_PLACE=${c.title}`) }, tests: [T.render("env", "src/App.jsx", {}, { contains: `<h1>${c.title}</h1>` }, `With .env, App shows ${c.title}`)] },
          { where: "Make a new file named .env.example with one line", goal: "show other developers which settings exist, without real values", files: { ".env.example": file("VITE_PLACE=Your place name") }, tests: [T.file("example", "local-file-contains", { path: ".env.example", value: "VITE_PLACE=" }, ".env.example lists VITE_PLACE")] },
          { where: "Make a new file named .gitignore with three lines", goal: "keep node_modules, dist, and .env out of Git", files: { ".gitignore": file("node_modules", "dist", ".env") }, tests: [T.file("ignore", "local-file-contains", { path: ".gitignore", value: ".env" }, ".gitignore lists .env")] },
          { where: "Add a config line above the server and an /api/config route after /health", goal: "let the server read its settings from environment variables", files: srv([configLine], leak), tests: [T.http("config", { env: { PLACE: c.title }, requests: [GET("/api/config")], bodyContains: `"place":"${c.title}"` }, `With PLACE set, /api/config answers ${c.title}`)] },
          { where: "Change the /api/config route", goal: "send only the public settings, never the API key", files: srv([configLine], safe), tests: [T.http("safe", { env: { API_KEY: "sk-test-FAKE" }, requests: [GET("/api/config")], bodyLacks: "sk-test" }, "/api/config never sends the API key")] },
          { where: "Add one line after the config line", goal: "refuse to start in production without an API key", files: srv([configLine, required], safe), tests: [T.file("stop", "local-node-exit-code", { file: "server.js", env: { NODE_ENV: "production" }, code: 1 }, "In production without API_KEY the server exits with code 1")] },
          { where: "Add one line after the h1 in src/App.jsx", goal: "show the price currency from VITE_CURRENCY, with PHP as the default", files: app(8), tests: [T.render("currency", "src/App.jsx", {}, { contains: "Prices in PHP" }, "App shows Prices in PHP")] },
          { where: "In the terminal", goal: "build the app and see the .env value baked into the built JavaScript", files: {}, commands: ["npm run build"], tests: [T.file("baked", "local-file-contains", { path: "dist/assets/app.js", value: c.title }, `dist/assets/app.js contains ${c.title}`)] },
          { where: "Make a new file named .env.production with one line, then build again", goal: "use a different place name for production builds", files: { ".env.production": file(`VITE_PLACE=${c.title} Online`) }, commands: ["npm run build"], tests: [T.file("prod", "local-file-contains", { path: "dist/assets/app.js", value: `${c.title} Online` }, `The production build says ${c.title} Online`)] },
        ],
      };
    },
  },
  {
    key: "deploy", title: "Ready to Deploy",
    concepts: ["fs-start-script", "fs-engines", "fs-version-route", "fs-check-script", "fs-readme-deploy", "fs-graceful-shutdown", "fs-json-errors", null, "fs-request-log", "fs-robots"],
    build(c) {
      const pkg = (extra, scripts) => file("{", '  "name": "fullstack-practice",', ...extra, '  "private": true,', '  "type": "module",', `  "scripts": ${scripts},`, '  "dependencies": { "react": "19.3.0", "react-dom": "19.3.0" },', '  "devDependencies": { "vite": "8.3.1", "@vitejs/plugin-react": "6.1.1" }', "}");
      const s0 = '{ "build": "vite build", "dev": "vite" }';
      const s1 = '{ "build": "vite build", "dev": "vite", "start": "node server.js" }';
      const s4 = '{ "build": "vite build", "dev": "vite", "start": "node server.js", "check": "node --check server.js" }';
      const s8 = '{ "build": "vite build", "dev": "vite", "prestart": "npm run build", "start": "node server.js", "check": "node --check server.js" }';
      const version = '  "version": "1.0.0",';
      const engines = '  "engines": { "node": ">=22.13" },';
      const P = [];
      P[1] = pkg([], s1);
      P[2] = pkg([engines], s1);
      P[3] = pkg([version, engines], s1);
      P[4] = pkg([version, engines], s4);
      const versionRoute = 'if (req.url === "/api/version") return send(res, 200, { version: JSON.parse(await readFile("package.json", "utf8")).version });';
      const shutdown = 'process.on("SIGTERM", () => server.close(() => process.exit(0)));';
      const boom = 'if (req.url === "/api/boom") throw new Error("Test failure");';
      const logLine = 'if (process.env.LOG_REQUESTS === "true") res.setHeader("X-Logged", "yes");';
      const handlerWrap = (body) => [...body];
      const serverWith = (pre, body, post = []) => file('import http from "node:http";', 'import { readFile } from "node:fs/promises";', 'import path from "node:path";', ...sendFn, S.types, ...pre, "const port = Number(process.env.PORT ?? 3000);", "async function handle(req, res) {", ...body.map((line) => `  ${line}`), "}", "const server = http.createServer((req, res) => {", ...post, "});", "server.listen(port);");
      const call = "  handle(req, res);";
      const callSafe = '  handle(req, res).catch(() => send(res, 500, { error: "Something went wrong" }));';
      const served = [S.nosniff, S.health, S.indexNoCache, S.assetsCache, S.spa, S.missingText];
      const B = {
        v3: [S.nosniff, S.health, versionRoute, ...served.slice(2)],
        v7: [S.nosniff, S.health, versionRoute, boom, ...served.slice(2)],
        v9: [S.nosniff, logLine, S.health, versionRoute, boom, ...served.slice(2)],
      };
      const srv = (pre, body, post) => ({ "server.js": serverWith(pre, handlerWrap(body), post) });
      const readmeDeploy = file(`${c.title} full-stack project.`, "Run npm install once, then follow the CodeDaddy steps.", "Deploy: npm install, npm run build, then npm start.", "Set PORT and NODE_ENV=production on the host.");
      const app = appJsx([], ["return (", "  <main>", `    <h1>${c.title}</h1>`, "  </main>", ");"]);
      return {
        seed: { ...base(c, c.title), "package.json": pkg([], s0), "src/App.jsx": app, "server.js": serverWith([], served, [call]) },
        steps: [
          { where: "Change the scripts line in package.json, then run npm install", goal: "add a start script, the command most hosting services run", files: { "package.json": P[1] }, commands: ["npm install"], tests: [T.file("start", "local-file-contains", { path: "package.json", value: '"start": "node server.js"' }, "package.json has a start script")] },
          { where: "Add one line to package.json", goal: "say which Node.js version the app needs with engines", files: { "package.json": P[2] }, tests: [T.file("engines", "local-file-contains", { path: "package.json", value: '"node": ">=22.13"' }, "package.json lists Node 22.13 or newer")] },
          { where: "Add a version line to package.json and an /api/version route", goal: "report which version of the app is running", files: { "package.json": P[3], ...srv([], B.v3, [call]) }, commands: ["npm run build"], tests: [T.http("version", { requests: [GET("/api/version")], bodyContains: '"version":"1.0.0"' }, "GET /api/version answers 1.0.0")] },
          { where: "Change the scripts line in package.json", goal: "add a check script that finds syntax errors in server.js before deploying", files: { "package.json": P[4] }, tests: [{ id: "check", label: "npm run check passes", kind: "local-npm-script", script: "check" }] },
          { where: "Add two lines at the end of README.txt", goal: "write down the exact deploy commands for whoever deploys next", files: { "README.txt": readmeDeploy }, tests: [T.file("readme", "local-file-contains", { path: "README.txt", value: "npm run build, then npm start" }, "README.txt lists the deploy commands")] },
          { where: "Add one line above the port line", goal: "close the server cleanly when the host asks it to stop", files: srv([shutdown], B.v3, [call]), tests: [T.file("sigterm", "local-file-contains", { path: "server.js", value: 'process.on("SIGTERM"' }, "server.js closes cleanly on SIGTERM"), T.http("still", { requests: [GET("/health")], status: 200 }, "The server still answers")] },
          { where: "Add a test /api/boom route and catch errors from handle", goal: "answer 500 JSON instead of crashing when a route throws", files: srv([shutdown], B.v7, [callSafe]), tests: [T.http("500", { requests: [GET("/api/boom")], status: 500, bodyContains: "Something went wrong" }, "GET /api/boom answers 500"), T.http("alive", { requests: [GET("/api/boom"), GET("/health")], status: 200 }, "The server keeps running after an error")] },
          { where: "Change the scripts line in package.json", goal: "build automatically before every npm start with a prestart script", files: { "package.json": pkg([version, engines], s8) }, tests: [T.file("prestart", "local-file-contains", { path: "package.json", value: '"prestart": "npm run build"' }, "package.json builds before start"), T.build("build", "npm run build passes")] },
          { where: "Add one line near the top of handle", goal: "mark answers as logged when LOG_REQUESTS is true, so logging can be switched on at the host", files: srv([shutdown], B.v9, [callSafe]), tests: [T.http("logged", { env: { LOG_REQUESTS: "true" }, requests: [GET("/health")], header: { name: "x-logged", value: "yes" } }, "With LOG_REQUESTS=true answers are marked logged")] },
          { where: "Add one line after the /api/version route", goal: "answer /robots.txt so search engines know they may visit the site", files: srv([shutdown], [...B.v9.slice(0, 4), 'if (req.url === "/robots.txt") { res.setHeader("Content-Type", "text/plain"); return res.end("User-agent: *\\nAllow: /\\n"); }', ...B.v9.slice(4)], [callSafe]), tests: [T.http("robots", { requests: [GET("/robots.txt")], bodyContains: "User-agent: *", header: { name: "content-type", value: "text/plain" } }, "GET /robots.txt answers the robots rules")] },
        ],
      };
    },
  },
];

export const fullstackProjects = contexts.flatMap((c, round) =>
  tracks.map((track) => {
    const id = `${track.key}-${c.slug}`;
    const built = track.build(c);
    const steps = built.steps.map((step, index) => ({
      ...step,
      commands: step.commands ?? [],
      id: `fs-${id}-${index + 1}`,
      conceptId: round === 0 ? track.concepts[index] ?? undefined : undefined,
    }));
    return { id, title: `${c.title} ${track.title}`, place: c.place, track: track.title, seed: built.seed, steps };
  }),
);
