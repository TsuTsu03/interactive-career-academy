// The Building APIs course skeleton.
//
// Like tools/node-basics-plan.mjs, this fixes the code each step asks for and
// the checks that prove it; the local model writes only the lesson text. Each
// server is started by the checker with PORT set and receives real HTTP
// requests on 127.0.0.1 only. Only Node's built-in modules are used
// (node:http, node:sqlite; PLAN.md decision 45).

const contexts = [
  { slug: "sari-sari", title: "Sari-Sari Store", place: "a sari-sari store (a small neighborhood shop)", items: [["Rice", 50], ["Soap", 25], ["Egg", 9]] },
  { slug: "carinderia", title: "Carinderia", place: "a carinderia (a small eatery that serves cooked dishes)", items: [["Adobo", 80], ["Pancit", 60], ["Lumpia", 15]] },
  { slug: "barangay", title: "Barangay Office", place: "a barangay office (the local community office)", items: [["Clearance", 50], ["Permit", 300], ["ID", 20]] },
  { slug: "school-club", title: "School Club", place: "a public school club", items: [["Shirt", 250], ["Pin", 30], ["Badge", 45]] },
  { slug: "tricycle", title: "Tricycle Terminal", place: "a tricycle terminal (where small motor taxis wait for passengers)", items: [["Market", 20], ["School", 30], ["Clinic", 25]] },
];

const t = (id, fields, label) => ({ id, label, kind: "local-http", file: "server.js", ...fields });
const tf = (id, kind, fields, label) => ({ id, label, kind, ...fields });
const file = (...lines) => lines.join("\n") + "\n";
const pkg = file("{", '  "type": "module"', "}");
const readme = (c) => file(`${c.title} API project.`, "Start the server with node server.js, then follow the CodeDaddy steps.");
const GET = (path) => ({ method: "GET", path });
const SEND = (method, path, body) => ({ method, path, body: typeof body === "string" ? body : JSON.stringify(body), headers: { "Content-Type": "application/json" } });
const POST = (path, body) => SEND("POST", path, body);
const json = (value) => JSON.stringify(value);

/** A server.js whose request handler holds `body`, with `pre` lines above it. */
function server(pre, body, post = []) {
  return file(
    'import http from "node:http";',
    ...pre,
    "const port = Number(process.env.PORT ?? 3000);",
    "const server = http.createServer(async (req, res) => {",
    ...body.map((line) => `  ${line}`),
    "});",
    ...post,
    "server.listen(port);",
  );
}

const itemsLine = (c, keyword = "const") => `${keyword} items = [${c.items.map(([name, price], index) => `{ id: ${index + 1}, name: "${name}", price: ${price} }`).join(", ")}];`;
const sendFn = [
  "function send(res, status, data) {",
  "  res.statusCode = status;",
  '  res.setHeader("Content-Type", "application/json");',
  "  res.end(JSON.stringify(data));",
  "}",
];
const readBodyFn = "async function readBody(req) { let text = \"\"; for await (const chunk of req) text += chunk; return text; }";

const tracks = [
  {
    key: "first-server", title: "First Server",
    concepts: ["api-server", "api-header", null, "api-route", "real-response-status", "real-request-method", null, null, null, "real-url-search-params"],
    build(c) {
      const S = (pre, body) => ({ "server.js": server(pre, body) });
      const health = 'if (req.url === "/health") { res.end("healthy"); return; }';
      const notFound = 'if (req.url !== "/") { res.statusCode = 404; res.end("Not found"); return; }';
      const method = 'if (req.method !== "GET") { res.statusCode = 405; res.end("Method not allowed"); return; }';
      const info = `if (req.url === "/info") { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify({ name: "${c.title}" })); return; }`;
      const type = 'res.setHeader("Content-Type", "text/plain; charset=utf-8");';
      const place = `res.setHeader("X-Place", "${c.slug}");`;
      const end = `res.end("${c.title} API");`;
      const v = [];
      v[1] = [[], [end]];
      v[2] = [[], [type, end]];
      v[3] = [[], [type, place, end]];
      v[4] = [[], [health, type, place, end]];
      v[5] = [[], [health, notFound, type, place, end]];
      v[6] = [[], [method, health, notFound, type, place, end]];
      v[7] = [[], [method, health, info, notFound, type, place, end]];
      v[8] = [["let visits = 0;"], [method, "visits += 1;", health, info, 'if (req.url === "/visits") { res.end(String(visits)); return; }', notFound, type, place, end]];
      v[9] = [v[8][0], ['res.setHeader("Cache-Control", "no-store");', ...v[8][1]]];
      v[10] = [v[9][0], [...v[9][1].slice(0, 6), 'const url = new URL(req.url, "http://localhost");', 'if (url.pathname === "/hello") { res.end(`Hello, ${url.searchParams.get("name") ?? "friend"}`); return; }', ...v[9][1].slice(6)]];
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "server.js": server([], ['res.end("Hello");']) },
        steps: [
          { where: "Change the res.end line in server.js", goal: `answer every request with ${c.title} API`, files: S(...v[1]), tests: [t("root", { requests: [GET("/")], status: 200, bodyContains: `${c.title} API` }, `GET / answers ${c.title} API`)] },
          { where: "Add one line above res.end", goal: "say that the answer is plain text with a Content-Type header", files: S(...v[2]), tests: [t("type", { requests: [GET("/")], header: { name: "content-type", value: "text/plain" } }, "GET / says its body is plain text")] },
          { where: "Add one line above res.end", goal: "add a custom X-Place header naming the place", files: S(...v[3]), tests: [t("custom", { requests: [GET("/")], header: { name: "x-place", value: c.slug } }, `GET / sends X-Place: ${c.slug}`)] },
          { where: "Add one line at the top of the handler", goal: "answer /health with healthy, so a monitor can check the server is up", files: S(...v[4]), tests: [t("health", { requests: [GET("/health")], status: 200, bodyContains: "healthy" }, "GET /health answers healthy")] },
          { where: "Add one line right after the /health line", goal: "answer any other path with status 404 Not found", files: S(...v[5]), tests: [t("missing", { requests: [GET("/missing")], status: 404 }, "GET /missing answers 404"), t("root", { requests: [GET("/")], status: 200 }, "GET / still answers 200")] },
          { where: "Add one line at the very top of the handler", goal: "refuse any method other than GET with status 405", files: S(...v[6]), tests: [t("post", { requests: [POST("/", {})], status: 405 }, "POST / answers 405")] },
          { where: "Add one line right after the /health line", goal: "answer /info with JSON describing the place", files: S(...v[7]), tests: [t("info", { requests: [GET("/info")], bodyContains: `"name":"${c.title}"`, header: { name: "content-type", value: "application/json" } }, "GET /info answers JSON with the name")] },
          { where: "Add a counter above the server, count each request, and add a /visits route before the 404 line", goal: "count requests and report the count at /visits", files: S(...v[8]), tests: [t("visits", { requests: [GET("/"), GET("/"), GET("/visits")], bodyContains: "3" }, "After two requests, GET /visits answers 3")] },
          { where: "Add one line at the very top of the handler", goal: "tell browsers not to store any answer with Cache-Control", files: S(...v[9]), tests: [t("cache", { requests: [GET("/")], header: { name: "cache-control", value: "no-store" } }, "GET / sends Cache-Control: no-store")] },
          { where: "Add two lines right before the 404 line", goal: "read a name from the query string at /hello, with friend as the default", files: S(...v[10]), tests: [t("hello", { requests: [GET("/hello?name=Ana")], bodyContains: "Hello, Ana" }, "GET /hello?name=Ana answers Hello, Ana"), t("default", { requests: [GET("/hello")], bodyContains: "Hello, friend" }, "GET /hello answers Hello, friend")] },
        ],
      };
    },
  },
  {
    key: "json-routes", title: "JSON Routes",
    concepts: ["real-json", null, null, null, null, "api-json-error", null, null, null, null],
    build(c) {
      const [[i0, p0], [i1, p1], [i2, p2]] = c.items;
      const pre = [itemsLine(c), ...sendFn];
      const S = (body) => ({ "server.js": server(pre, body) });
      const r = {
        items: 'if (req.url === "/items") return send(res, 200, items);',
        count: 'if (req.url === "/items/count") return send(res, 200, { count: items.length });',
        first: 'if (req.url === "/items/first") return send(res, 200, items[0]);',
        names: 'if (req.url === "/items/names") return send(res, 200, items.map((item) => item.name));',
        total: 'if (req.url === "/items/total") return send(res, 200, { total: items.reduce((sum, item) => sum + item.price, 0) });',
        root: `if (req.url === "/") return send(res, 200, { name: "${c.title}", routes: ["/items"] });`,
        cheapest: 'if (req.url === "/items/cheapest") return send(res, 200, [...items].sort((a, b) => a.price - b.price)[0]);',
        pretty: 'if (req.url === "/items/pretty") { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(items, null, 2)); return; }',
        expensive: 'if (req.url === "/items/expensive") return send(res, 200, items.filter((item) => item.price > 40));',
      };
      const plain = 'res.end("Items API");';
      const missing = 'send(res, 404, { error: "Not found" });';
      const v = [];
      v[1] = [r.items, plain];
      v[2] = [r.items, r.count, plain];
      v[3] = [r.items, r.count, r.first, plain];
      v[4] = [r.items, r.count, r.first, r.names, plain];
      v[5] = [r.items, r.count, r.first, r.names, r.total, plain];
      v[6] = [r.items, r.count, r.first, r.names, r.total, missing];
      v[7] = [r.root, ...v[6]];
      v[8] = [r.root, r.items, r.count, r.first, r.names, r.total, r.cheapest, missing];
      v[9] = [r.root, r.items, r.count, r.first, r.names, r.total, r.cheapest, r.pretty, missing];
      v[10] = [r.root, r.items, r.count, r.first, r.names, r.total, r.cheapest, r.pretty, r.expensive, missing];
      const cheapest = [...c.items].sort((a, b) => a[1] - b[1])[0][0];
      const expensive = c.items.filter(([, price]) => price > 40).map(([name]) => name);
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "server.js": server(pre, [plain]) },
        steps: [
          { where: "Add one line at the top of the handler", goal: "answer GET /items with the whole list as JSON, using the send helper", files: S(v[1]), tests: [t("list", { requests: [GET("/items")], bodyContains: `"name":"${i0}"`, header: { name: "content-type", value: "application/json" } }, "GET /items answers the list as JSON")] },
          { where: "Add one line after the /items line", goal: "answer /items/count with how many items there are", files: S(v[2]), tests: [t("count", { requests: [GET("/items/count")], bodyContains: json({ count: 3 }) }, 'GET /items/count answers {"count":3}')] },
          { where: "Add one line after the /items/count line", goal: "answer /items/first with the first item only", files: S(v[3]), tests: [t("first", { requests: [GET("/items/first")], bodyContains: json({ id: 1, name: i0, price: p0 }) }, `GET /items/first answers ${i0}`)] },
          { where: "Add one line after the /items/first line", goal: "answer /items/names with only the names, using map", files: S(v[4]), tests: [t("names", { requests: [GET("/items/names")], bodyContains: json([i0, i1, i2]) }, "GET /items/names answers the three names")] },
          { where: "Add one line after the /items/names line", goal: "answer /items/total with the sum of all prices, using reduce", files: S(v[5]), tests: [t("total", { requests: [GET("/items/total")], bodyContains: json({ total: p0 + p1 + p2 }) }, `GET /items/total answers ${p0 + p1 + p2}`)] },
          { where: "Replace the last line of the handler", goal: "answer unknown paths with status 404 and a JSON error", files: S(v[6]), tests: [t("missing", { requests: [GET("/nope")], status: 404, bodyContains: json({ error: "Not found" }) }, "GET /nope answers 404 with a JSON error")] },
          { where: "Add one line at the top of the handler", goal: "answer GET / with the API's name and its routes", files: S(v[7]), tests: [t("root", { requests: [GET("/")], status: 200, bodyContains: '"routes":["/items"]' }, "GET / lists the routes")] },
          { where: "Add one line before the 404 line", goal: "answer /items/cheapest with the lowest-priced item", files: S(v[8]), tests: [t("cheapest", { requests: [GET("/items/cheapest")], bodyContains: `"name":"${cheapest}"` }, `GET /items/cheapest answers ${cheapest}`)] },
          { where: "Add one line before the 404 line", goal: "answer /items/pretty with indented JSON that is easier for people to read", files: S(v[9]), tests: [t("pretty", { requests: [GET("/items/pretty")], bodyContains: '[\n  {\n    "id": 1' }, "GET /items/pretty answers indented JSON")] },
          { where: "Add one line before the 404 line", goal: "answer /items/expensive with items priced over 40, using filter", files: S(v[10]), tests: [t("expensive", { requests: [GET("/items/expensive")], bodyContains: json(expensive) === "[]" ? "[]" : `"name":"${expensive[0]}"` }, `GET /items/expensive answers ${expensive.join(" and ") || "an empty list"}`)] },
        ],
      };
    },
  },
  {
    key: "request-bodies", title: "Reading Request Bodies",
    concepts: ["api-request-body", "api-parse-json", "api-post", null, null, "api-bad-request", "api-validation", null, null, "api-location-header"],
    build(c) {
      const list = 'if (req.url === "/items" && req.method === "GET") return send(res, 200, items);';
      const create = 'if (req.url === "/items" && req.method === "POST") return createItem(req, res);';
      const missing = 'send(res, 404, { error: "Not found" });';
      const echo = 'if (req.url === "/echo" && req.method === "POST") return send(res, 200, { received: await readBody(req) });';
      const echoJson = 'if (req.url === "/echo-json" && req.method === "POST") return send(res, 200, JSON.parse(await readBody(req)));';
      const fn = (lines) => ["async function createItem(req, res) {", ...lines.map((line) => `  ${line}`), "}"];
      const stub = ['return send(res, 501, { error: "Not built yet" });'];
      const pre = (withRead, body) => [itemsLine(c), ...sendFn, ...(withRead ? [readBodyFn] : []), ...fn(body)];
      const S = (withRead, fnBody, body) => ({ "server.js": server(pre(withRead, fnBody), body) });
      const F = [];
      F[3] = ["const data = JSON.parse(await readBody(req));", "return send(res, 201, data);"];
      F[4] = ["const data = JSON.parse(await readBody(req));", "items.push(data);", "return send(res, 201, data);"];
      F[5] = ["const data = JSON.parse(await readBody(req));", "const item = { id: items.length + 1, ...data };", "items.push(item);", "return send(res, 201, item);"];
      F[6] = ["let data;", 'try { data = JSON.parse(await readBody(req)); } catch { return send(res, 400, { error: "Body must be JSON" }); }', ...F[5].slice(1)];
      F[7] = [...F[6].slice(0, 2), 'if (typeof data.name !== "string" || !data.name.trim()) return send(res, 422, { error: "name is required" });', ...F[6].slice(2)];
      F[8] = [...F[7].slice(0, 3), 'if (!Number.isFinite(data.price) || data.price < 0) return send(res, 422, { error: "price must be a number 0 or more" });', ...F[7].slice(3)];
      F[9] = [...F[8].slice(0, 4), "const item = { id: items.length + 1, name: data.name.trim(), price: data.price };", ...F[8].slice(5)];
      F[10] = [...F[9].slice(0, 6), "res.setHeader(\"Location\", `/items/${item.id}`);", ...F[9].slice(6)];
      const body = [list, create, missing];
      const tea = { name: "Tea", price: 12 };
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "server.js": server(pre(false, stub), body) },
        steps: [
          { where: "Add the readBody helper above the server and an /echo route at the top of the handler", goal: "read the text a client sends and send it back", files: S(true, stub, [echo, ...body]), tests: [t("echo", { requests: [SEND("POST", "/echo", "hello")], bodyContains: '"received":"hello"' }, "POST /echo with hello answers it back")] },
          { where: "Add one line after the /echo route", goal: "turn JSON text from the client into an object with JSON.parse", files: S(true, stub, [echo, echoJson, ...body]), tests: [t("json", { requests: [POST("/echo-json", { name: "Ana" })], bodyContains: '"name":"Ana"' }, "POST /echo-json answers the object it received")] },
          { where: "Replace the line inside createItem with two lines", goal: "answer POST /items with status 201 and the new item", files: S(true, F[3], [echo, echoJson, ...body]), tests: [t("created", { requests: [POST("/items", tea)], status: 201, bodyContains: '"name":"Tea"' }, "POST /items answers 201 with the item")] },
          { where: "Add one line inside createItem before the return", goal: "store the new item so it shows up in the list", files: S(true, F[4], [echo, echoJson, ...body]), tests: [t("stored", { requests: [POST("/items", tea), GET("/items")], bodyContains: '"name":"Tea"' }, "After POST /items, GET /items includes Tea")] },
          { where: "Change createItem so each new item gets the next id", goal: "give each new item an id one higher than the last", files: S(true, F[5], [echo, echoJson, ...body]), tests: [t("id", { requests: [POST("/items", tea)], bodyContains: '"id":4' }, "The new item answers with id 4")] },
          { where: "Replace the JSON.parse line with two lines", goal: "answer 400 when the body is not JSON instead of crashing", files: S(true, F[6], [echo, echoJson, ...body]), tests: [t("bad", { requests: [SEND("POST", "/items", "not json")], status: 400, bodyContains: "Body must be JSON" }, "POST /items with broken JSON answers 400")] },
          { where: "Add one line after the try line", goal: "answer 422 when the name is missing or empty", files: S(true, F[7], [echo, echoJson, ...body]), tests: [t("noname", { requests: [POST("/items", { price: 5 })], status: 422, bodyContains: "name is required" }, "POST /items without a name answers 422")] },
          { where: "Add one line after the name check", goal: "answer 422 when the price is not a number of 0 or more", files: S(true, F[8], [echo, echoJson, ...body]), tests: [t("badprice", { requests: [POST("/items", { name: "Tea", price: "five" })], status: 422, bodyContains: "price must be a number" }, "POST /items with price five answers 422")] },
          { where: "Change the line that builds item", goal: "keep only the known fields and trim spaces from the name", files: S(true, F[9], [echo, echoJson, ...body]), tests: [t("trim", { requests: [POST("/items", { name: "  Tea  ", price: 12, secret: "x" })], bodyContains: '{"id":4,"name":"Tea","price":12}' }, "The new item is stored with a trimmed name and no extra fields")] },
          { where: "Add one line before the return in createItem", goal: "say where the new item lives with a Location header", files: S(true, F[10], [echo, echoJson, ...body]), tests: [t("location", { requests: [POST("/items", tea)], header: { name: "location", value: "/items/4" } }, "POST /items sends Location: /items/4")] },
        ],
      };
    },
  },
  {
    key: "one-item", title: "One Item at a Time",
    concepts: ["api-path-parameter", "api-not-found", "api-delete", null, "api-put", null, "api-unsupported-type", "api-head", "api-options", "api-method-not-allowed"],
    build(c) {
      const [, [i1]] = c.items;
      const list = 'if (req.url === "/items" && req.method === "GET") return send(res, 200, items);';
      const missing = 'send(res, 404, { error: "Not found" });';
      const match = "const match = req.url.match(/^\\/items\\/(\\d+)$/);";
      const found = "const found = match && items.find((item) => item.id === Number(match[1]));";
      const getNaive = 'if (match && req.method === "GET") return send(res, 200, items.find((item) => item.id === Number(match[1])));';
      const get = 'if (match && req.method === "GET") return found ? send(res, 200, found) : send(res, 404, { error: "Item not found" });';
      const del = 'if (found && req.method === "DELETE") { items.splice(items.indexOf(found), 1); res.statusCode = 204; return res.end(); }';
      const delMissing = 'if (match && req.method === "DELETE") return send(res, 404, { error: "Item not found" });';
      const put = 'if (found && req.method === "PUT") { Object.assign(found, JSON.parse(await readBody(req))); return send(res, 200, found); }';
      const putKeep = 'if (found && req.method === "PUT") { Object.assign(found, JSON.parse(await readBody(req)), { id: found.id }); return send(res, 200, found); }';
      const putType = 'if (found && req.method === "PUT" && !req.headers["content-type"]?.includes("application/json")) return send(res, 415, { error: "Send JSON" });';
      const head = 'if (req.url === "/items" && req.method === "HEAD") { res.setHeader("X-Total-Count", String(items.length)); return res.end(); }';
      const options = 'if (match && req.method === "OPTIONS") { res.setHeader("Allow", "GET, PUT, DELETE"); res.statusCode = 204; return res.end(); }';
      const notAllowed = 'if (match) return send(res, 405, { error: "Method not allowed" });';
      const pre = [itemsLine(c), ...sendFn, readBodyFn];
      const S = (body) => ({ "server.js": server(pre, body) });
      const v = [];
      v[1] = [match, getNaive, list, missing];
      v[2] = [match, found, get, list, missing];
      v[3] = [match, found, get, del, list, missing];
      v[4] = [match, found, get, del, delMissing, list, missing];
      v[5] = [match, found, get, del, delMissing, put, list, missing];
      v[6] = [match, found, get, del, delMissing, putKeep, list, missing];
      v[7] = [match, found, get, del, delMissing, putType, putKeep, list, missing];
      v[8] = [match, found, get, del, delMissing, putType, putKeep, list, head, missing];
      v[9] = [match, found, get, del, delMissing, putType, putKeep, options, list, head, missing];
      v[10] = [match, found, get, del, delMissing, putType, putKeep, options, notAllowed, list, head, missing];
      const text = { method: "PUT", path: "/items/1", body: "price=99", headers: { "Content-Type": "text/plain" } };
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "server.js": server(pre, [list, missing]) },
        steps: [
          { where: "Add two lines at the top of the handler", goal: "read an id from the path /items/2 and answer that one item", files: S(v[1]), tests: [t("one", { requests: [GET("/items/2")], bodyContains: `"name":"${i1}"` }, `GET /items/2 answers ${i1}`)] },
          { where: "Add a found line and change the GET line", goal: "answer 404 when no item has that id", files: S(v[2]), tests: [t("none", { requests: [GET("/items/99")], status: 404, bodyContains: "Item not found" }, "GET /items/99 answers 404")] },
          { where: "Add one line after the GET line", goal: "delete an item and answer 204 No Content", files: S(v[3]), tests: [t("deleted", { requests: [{ method: "DELETE", path: "/items/1" }], status: 204 }, "DELETE /items/1 answers 204")] },
          { where: "Add one line after the DELETE line", goal: "answer 404 when deleting an id that does not exist", files: S(v[4]), tests: [t("gone", { requests: [{ method: "DELETE", path: "/items/99" }], status: 404, bodyContains: "Item not found" }, "DELETE /items/99 answers 404 Item not found")] },
          { where: "Add one line after the DELETE lines", goal: "replace an item's fields with PUT and answer the updated item", files: S(v[5]), tests: [t("put", { requests: [SEND("PUT", "/items/1", { price: 99 })], bodyContains: '"price":99' }, "PUT /items/1 with price 99 answers the new price")] },
          { where: "Change the PUT line", goal: "keep the id the same even if the client sends a different one", files: S(v[6]), tests: [t("keep", { requests: [SEND("PUT", "/items/1", { id: 50, price: 1 }), GET("/items/1")], status: 200, bodyContains: '"id":1' }, "After PUT with id 50, GET /items/1 still works")] },
          { where: "Add one line before the PUT line", goal: "answer 415 when a PUT body is not marked as JSON", files: S(v[7]), tests: [t("type", { requests: [text], status: 415 }, "PUT with a text/plain body answers 415")] },
          { where: "Add one line before the 404 line", goal: "answer HEAD /items with only an X-Total-Count header and no body", files: S(v[8]), tests: [t("head", { requests: [{ method: "HEAD", path: "/items" }], header: { name: "x-total-count", value: "3" } }, "HEAD /items sends X-Total-Count: 3")] },
          { where: "Add one line after the PUT line", goal: "answer OPTIONS with an Allow header listing the methods", files: S(v[9]), tests: [t("options", { requests: [{ method: "OPTIONS", path: "/items/1" }], header: { name: "allow", value: "GET, PUT, DELETE" } }, "OPTIONS /items/1 lists GET, PUT, DELETE")] },
          { where: "Add one line after the OPTIONS line", goal: "answer 405 for any other method on one item", files: S(v[10]), tests: [t("post", { requests: [POST("/items/1", {})], status: 405 }, "POST /items/1 answers 405")] },
        ],
      };
    },
  },
  {
    key: "query-strings", title: "Filtering with Query Strings",
    concepts: ["api-filter", null, "api-search", "api-sort", null, "api-limit", "api-fields", null, "api-count-header", null],
    build(original) {
      // Sorting must visibly change the order, so start from an order that is
      // neither cheapest-first nor most-expensive-first.
      const orders = [[0, 1, 2], [1, 2, 0], [1, 0, 2], [2, 0, 1], [0, 2, 1], [2, 1, 0]];
      const order = orders.find((indexes) => {
        const prices = indexes.map((index) => original.items[index][1]);
        return !(prices[0] < prices[1] && prices[1] < prices[2]) && !(prices[0] > prices[1] && prices[1] > prices[2]);
      });
      const c = { ...original, items: order.map((index) => original.items[index]) };
      const items = c.items.map(([name, price], index) => ({ id: index + 1, name, price }));
      const byPrice = [...items].sort((a, b) => a.price - b.price);
      const mid = byPrice[1].price;
      const q = items[1].name.slice(1, 4).toLowerCase();
      const url = 'const url = new URL(req.url, "http://localhost");';
      const let_ = "let list = items;";
      const f = {
        max: 'if (url.searchParams.has("max")) list = list.filter((item) => item.price <= Number(url.searchParams.get("max")));',
        min: 'if (url.searchParams.has("min")) list = list.filter((item) => item.price >= Number(url.searchParams.get("min")));',
        q: 'if (url.searchParams.has("q")) list = list.filter((item) => item.name.toLowerCase().includes(url.searchParams.get("q").toLowerCase()));',
        asc: 'if (url.searchParams.get("sort") === "price") list = [...list].sort((a, b) => a.price - b.price);',
        desc: 'if (url.searchParams.get("sort") === "-price") list = [...list].sort((a, b) => b.price - a.price);',
        limit: 'if (url.searchParams.has("limit")) list = list.slice(0, Number(url.searchParams.get("limit")));',
        fields: 'if (url.searchParams.get("fields") === "name") list = list.map((item) => ({ name: item.name }));',
        bad: 'if (url.searchParams.has("max") && Number.isNaN(Number(url.searchParams.get("max")))) return send(res, 400, { error: "max must be a number" });',
      };
      const routeItems = 'if (url.pathname === "/items") return send(res, 200, items);';
      const routeList = 'if (url.pathname === "/items") return send(res, 200, list);';
      const routeCount = 'if (url.pathname === "/items") { res.setHeader("X-Total-Count", String(list.length)); return send(res, 200, list); }';
      const options = 'if (url.pathname === "/items/options") return send(res, 200, { filters: ["max", "min", "q"], sort: ["price", "-price"], other: ["limit", "fields"] });';
      const missing = 'send(res, 404, { error: "Not found" });';
      const pre = [itemsLine(c), ...sendFn];
      const S = (body) => ({ "server.js": server(pre, body) });
      const v = [];
      v[1] = [url, let_, f.max, routeList, missing];
      v[2] = [url, let_, f.max, f.min, routeList, missing];
      v[3] = [url, let_, f.max, f.min, f.q, routeList, missing];
      v[4] = [url, let_, f.max, f.min, f.q, f.asc, routeList, missing];
      v[5] = [url, let_, f.max, f.min, f.q, f.asc, f.desc, routeList, missing];
      v[6] = [url, let_, f.max, f.min, f.q, f.asc, f.desc, f.limit, routeList, missing];
      v[7] = [url, let_, f.max, f.min, f.q, f.asc, f.desc, f.limit, f.fields, routeList, missing];
      v[8] = [url, f.bad, let_, f.max, f.min, f.q, f.asc, f.desc, f.limit, f.fields, routeList, missing];
      v[9] = [url, f.bad, let_, f.max, f.min, f.q, f.asc, f.desc, f.limit, f.fields, routeCount, missing];
      v[10] = [url, f.bad, options, let_, f.max, f.min, f.q, f.asc, f.desc, f.limit, f.fields, routeCount, missing];
      const upTo = items.filter((item) => item.price <= mid);
      const from = items.filter((item) => item.price >= mid);
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "server.js": server(pre, [url, routeItems, missing]) },
        steps: [
          { where: "Add two lines after the url line and change the /items line to send list", goal: `keep only items that cost at most ?max, for example ?max=${mid}`, files: S(v[1]), tests: [t("max", { requests: [GET(`/items?max=${mid}`)], bodyContains: json(upTo) }, `GET /items?max=${mid} answers only the items up to ${mid}`)] },
          { where: "Add one line after the max line", goal: "keep only items that cost at least ?min", files: S(v[2]), tests: [t("min", { requests: [GET(`/items?min=${mid}`)], bodyContains: json(from) }, `GET /items?min=${mid} answers only the items from ${mid}`)] },
          { where: "Add one line after the min line", goal: "search names with ?q, ignoring upper and lower case", files: S(v[3]), tests: [t("q", { requests: [GET(`/items?q=${q}`)], bodyContains: json([items[1]]) }, `GET /items?q=${q} finds ${items[1].name}`)] },
          { where: "Add one line after the q line", goal: "sort cheapest first with ?sort=price", files: S(v[4]), tests: [t("asc", { requests: [GET("/items?sort=price")], bodyContains: json(byPrice) }, "GET /items?sort=price answers cheapest first")] },
          { where: "Add one line after the sort line", goal: "sort most expensive first with ?sort=-price", files: S(v[5]), tests: [t("desc", { requests: [GET("/items?sort=-price")], bodyContains: json([...byPrice].reverse()) }, "GET /items?sort=-price answers most expensive first")] },
          { where: "Add one line after the second sort line", goal: "answer only the first few items with ?limit", files: S(v[6]), tests: [t("limit", { requests: [GET("/items?sort=price&limit=1")], bodyContains: json([byPrice[0]]) }, "GET /items?sort=price&limit=1 answers only the cheapest item")] },
          { where: "Add one line after the limit line", goal: "answer only the names with ?fields=name", files: S(v[7]), tests: [t("fields", { requests: [GET("/items?fields=name")], bodyContains: json(items.map((item) => ({ name: item.name }))) }, "GET /items?fields=name answers names only")] },
          { where: "Add one line right after the url line", goal: "answer 400 when ?max is not a number", files: S(v[8]), tests: [t("bad", { requests: [GET("/items?max=abc")], status: 400 }, "GET /items?max=abc answers 400")] },
          { where: "Change the /items line", goal: "send how many items matched in an X-Total-Count header", files: S(v[9]), tests: [t("count", { requests: [GET(`/items?max=${mid}`)], header: { name: "x-total-count", value: String(upTo.length) } }, `GET /items?max=${mid} sends X-Total-Count: ${upTo.length}`)] },
          { where: "Add one line after the 400 line", goal: "describe the supported query options at /items/options", files: S(v[10]), tests: [t("options", { requests: [GET("/items/options")], bodyContains: '"filters":["max","min","q"]' }, "GET /items/options lists the filters")] },
        ],
      };
    },
  },
  {
    key: "middleware", title: "Middleware",
    concepts: ["api-middleware", null, "api-middleware-list", null, "api-cors", "api-api-key", null, "api-preflight", null, "api-security-header"],
    build(c) {
      const list = 'if (req.url === "/items") return send(res, 200, items);';
      const missing = 'send(res, 404, { error: "Not found" });';
      const idFn = ["let nextId = 1;", 'function addRequestId(req, res) { res.setHeader("X-Request-Id", String(nextId++)); }'];
      const placeFn = `function addPlace(req, res) { res.setHeader("X-Place", "${c.slug}"); }`;
      const poweredFn = 'function addPoweredBy(req, res) { res.setHeader("X-Powered-By", "Node built-ins"); }';
      const corsFn = 'function allowBrowsers(req, res) { res.setHeader("Access-Control-Allow-Origin", "*"); }';
      const corsFn2 = 'function allowBrowsers(req, res) { res.setHeader("Access-Control-Allow-Origin", "*"); if (req.method === "OPTIONS") { res.statusCode = 204; res.end(); return true; } }';
      const keyFn = 'function requireKey(req, res) { if (req.headers["x-api-key"] !== "secret123") { send(res, 401, { error: "Missing or wrong API key" }); return true; } }';
      const secureFn = 'function secureHeaders(req, res) { res.setHeader("X-Content-Type-Options", "nosniff"); }';
      const mw = (names) => `const middleware = [${names.join(", ")}];`;
      const loop = "for (const step of middleware) step(req, res);";
      const loopStop = "for (const step of middleware) if (step(req, res)) return;";
      const health = 'if (req.url === "/health") return send(res, 200, { ok: true });';
      const stats = 'if (req.url === "/stats") return send(res, 200, { served: nextId - 1 });';
      const base = [itemsLine(c), ...sendFn];
      const S = (pre, body) => ({ "server.js": server([...base, ...pre], body) });
      const key = { "x-api-key": "secret123" };
      const v = [];
      v[1] = [[...idFn], ["addRequestId(req, res);", list, missing]];
      v[2] = [[...idFn, placeFn], ["addRequestId(req, res);", "addPlace(req, res);", list, missing]];
      v[3] = [[...idFn, placeFn, mw(["addRequestId", "addPlace"])], [loop, list, missing]];
      v[4] = [[...idFn, placeFn, poweredFn, mw(["addRequestId", "addPlace", "addPoweredBy"])], [loop, list, missing]];
      v[5] = [[...idFn, placeFn, poweredFn, corsFn, mw(["addRequestId", "addPlace", "addPoweredBy", "allowBrowsers"])], [loop, list, missing]];
      v[6] = [[...idFn, placeFn, poweredFn, corsFn, keyFn, mw(["addRequestId", "addPlace", "addPoweredBy", "allowBrowsers", "requireKey"])], [loopStop, list, missing]];
      v[7] = [v[6][0], [health, loopStop, list, missing]];
      v[8] = [[...idFn, placeFn, poweredFn, corsFn2, keyFn, mw(["addRequestId", "addPlace", "addPoweredBy", "allowBrowsers", "requireKey"])], [health, loopStop, list, missing]];
      v[9] = [v[8][0], [health, loopStop, stats, list, missing]];
      v[10] = [[...idFn, placeFn, poweredFn, corsFn2, keyFn, secureFn, mw(["addRequestId", "addPlace", "addPoweredBy", "allowBrowsers", "secureHeaders", "requireKey"])], [health, loopStop, stats, list, missing]];
      const withKey = (path) => ({ method: "GET", path, headers: key });
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "server.js": server(base, [list, missing]) },
        steps: [
          { where: "Add a counter and an addRequestId function above the server, and call it at the top of the handler", goal: "give every answer a numbered X-Request-Id header", files: S(...v[1]), tests: [t("id", { requests: [GET("/items")], header: { name: "x-request-id", value: "1" } }, "The first answer sends X-Request-Id: 1")] },
          { where: "Add an addPlace function and call it after addRequestId", goal: "add a second small function that sets an X-Place header", files: S(...v[2]), tests: [t("place", { requests: [GET("/items")], header: { name: "x-place", value: c.slug } }, `Answers send X-Place: ${c.slug}`)] },
          { where: "Add a middleware list and replace the two calls with one loop", goal: "run every middleware function from one list", files: S(...v[3]), tests: [tf("list", "local-file-contains", { path: "server.js", value: "const middleware = [addRequestId, addPlace];" }, "server.js keeps its middleware in one list"), t("still", { requests: [GET("/items")], header: { name: "x-place", value: c.slug } }, "Answers still send X-Place")] },
          { where: "Add an addPoweredBy function and add it to the list", goal: "add a middleware without touching the handler", files: S(...v[4]), tests: [t("powered", { requests: [GET("/items")], header: { name: "x-powered-by", value: "Node built-ins" } }, "Answers send X-Powered-By: Node built-ins")] },
          { where: "Add an allowBrowsers function and add it to the list", goal: "let web pages on other sites call this API with a CORS header", files: S(...v[5]), tests: [t("cors", { requests: [GET("/items")], header: { name: "access-control-allow-origin", value: "*" } }, "Answers send Access-Control-Allow-Origin: *")] },
          { where: "Add a requireKey function, add it to the list, and let the loop stop early", goal: "refuse requests without the right X-Api-Key header", files: S(...v[6]), tests: [t("nokey", { requests: [GET("/items")], status: 401 }, "GET /items without a key answers 401"), t("key", { requests: [withKey("/items")], status: 200 }, "GET /items with the key answers 200")] },
          { where: "Add one line at the top of the handler, before the loop", goal: "keep /health open without a key so monitors can reach it", files: S(...v[7]), tests: [t("health", { requests: [GET("/health")], status: 200, bodyContains: '"ok":true' }, "GET /health answers without a key")] },
          { where: "Change the allowBrowsers function", goal: "answer browser preflight OPTIONS requests with 204 before the key check", files: S(...v[8]), tests: [t("preflight", { requests: [{ method: "OPTIONS", path: "/items" }], status: 204 }, "OPTIONS /items answers 204 without a key")] },
          { where: "Add one line after the loop", goal: "report how many requests the server has answered at /stats", files: S(...v[9]), tests: [t("stats", { requests: [withKey("/items"), withKey("/items"), withKey("/stats")], bodyContains: '"served":3' }, "After two requests, GET /stats answers served 3")] },
          { where: "Add a secureHeaders function and add it to the list", goal: "add a common security header to every answer", files: S(...v[10]), tests: [t("nosniff", { requests: [withKey("/items")], header: { name: "x-content-type-options", value: "nosniff" } }, "Answers send X-Content-Type-Options: nosniff")] },
        ],
      };
    },
  },
  {
    key: "sqlite-storage", title: "Storing Data in SQLite",
    concepts: ["api-sqlite", "api-insert-rows", "api-order-by", "api-count", "api-sql-parameter", null, "api-last-insert-id", "api-sum", "api-like-search", "api-database-file"],
    build(c) {
      const byPrice = c.items.map(([name, price], index) => ({ id: index + 1, name, price })).sort((a, b) => a.price - b.price);
      const q = c.items[2][0].slice(1, 4);
      const imp = 'import { DatabaseSync } from "node:sqlite";';
      const D = {
        open: 'const db = new DatabaseSync(":memory:");',
        openFile: 'const db = new DatabaseSync(process.env.DB_FILE ?? ":memory:");',
        table: 'db.exec("CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)");',
        tableSafe: 'db.exec("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)");',
        insert: 'const insert = db.prepare("INSERT INTO items (name, price) VALUES (?, ?)");',
        seed: `for (const [name, price] of ${json(c.items)}) insert.run(name, price);`,
        seedOnce: `if (db.prepare("SELECT COUNT(*) AS count FROM items").get().count === 0) for (const [name, price] of ${json(c.items)}) insert.run(name, price);`,
      };
      const fn = (lines) => ["async function createItem(req, res) {", ...lines.map((line) => `  ${line}`), "}"];
      const stub = ['return send(res, 501, { error: "Not built yet" });'];
      const built = ["const data = JSON.parse(await readBody(req));", "const result = insert.run(data.name, data.price);", "return send(res, 201, { id: Number(result.lastInsertRowid), ...data });"];
      const R = {
        create: 'if (req.url === "/items" && req.method === "POST") return createItem(req, res);',
        list: 'if (req.url === "/items") return send(res, 200, db.prepare("SELECT * FROM items").all());',
        ordered: 'if (req.url === "/items") return send(res, 200, db.prepare("SELECT * FROM items ORDER BY price").all());',
        count: 'if (req.url === "/items/count") return send(res, 200, db.prepare("SELECT COUNT(*) AS count FROM items").get());',
        match: "const match = req.url.match(/^\\/items\\/(\\d+)$/);",
        one: 'if (match) return send(res, 200, db.prepare("SELECT * FROM items WHERE id = ?").get(Number(match[1])));',
        oneSafe: 'if (match) { const row = db.prepare("SELECT * FROM items WHERE id = ?").get(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: "Item not found" }); }',
        total: 'if (req.url === "/items/total") return send(res, 200, db.prepare("SELECT SUM(price) AS total FROM items").get());',
        url: 'const url = new URL(req.url, "http://localhost");',
        search: 'if (url.pathname === "/items/search") return send(res, 200, db.prepare("SELECT * FROM items WHERE name LIKE ?").all(`%${url.searchParams.get("q") ?? ""}%`));',
        missing: 'send(res, 404, { error: "Not found" });',
      };
      const pre = (dbLines, fnBody) => [imp, ...sendFn, readBodyFn, ...dbLines, ...fn(fnBody)];
      const S = (dbLines, fnBody, body) => ({ "server.js": server(pre(dbLines, fnBody), body) });
      const dbAll = [D.open, D.table, D.insert, D.seed];
      const v = [];
      v[1] = [[D.open, D.table], stub, [R.create, R.list, R.missing]];
      v[2] = [dbAll, stub, [R.create, R.list, R.missing]];
      v[3] = [dbAll, stub, [R.create, R.ordered, R.missing]];
      v[4] = [dbAll, stub, [R.create, R.ordered, R.count, R.missing]];
      v[5] = [dbAll, stub, [R.create, R.ordered, R.count, R.match, R.one, R.missing]];
      v[6] = [dbAll, stub, [R.create, R.ordered, R.count, R.match, R.oneSafe, R.missing]];
      v[7] = [dbAll, built, v[6][2]];
      v[8] = [dbAll, built, [R.create, R.ordered, R.count, R.total, R.match, R.oneSafe, R.missing]];
      v[9] = [dbAll, built, [R.create, R.ordered, R.count, R.total, R.url, R.search, R.match, R.oneSafe, R.missing]];
      v[10] = [[D.openFile, D.tableSafe, D.insert, D.seedOnce], built, v[9][2]];
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "server.js": server(pre([], stub), [R.create, R.missing]) },
        steps: [
          { where: "Add two lines above createItem and one route before the 404 line", goal: "open an in-memory SQLite database, make an items table, and answer GET /items from it", files: S(...v[1]), tests: [t("empty", { requests: [GET("/items")], status: 200, bodyContains: "[]" }, "GET /items answers an empty list from the database")] },
          { where: "Add two lines after the CREATE TABLE line", goal: "prepare an INSERT statement and add the three starting items", files: S(...v[2]), tests: [t("rows", { requests: [GET("/items")], bodyContains: `"name":"${c.items[0][0]}"` }, `GET /items includes ${c.items[0][0]} from the database`)] },
          { where: "Change the SQL in the GET /items line", goal: "let the database sort the rows cheapest first with ORDER BY", files: S(...v[3]), tests: [t("ordered", { requests: [GET("/items")], bodyContains: json(byPrice) }, `GET /items lists the items cheapest first, starting with ${byPrice[0].name}`)] },
          { where: "Add one route after the GET /items line", goal: "count the rows with COUNT(*)", files: S(...v[4]), tests: [t("count", { requests: [GET("/items/count")], bodyContains: json({ count: 3 }) }, 'GET /items/count answers {"count":3}')] },
          { where: "Add two lines before the 404 line", goal: "answer one row by id, passing the id as a ? parameter", files: S(...v[5]), tests: [t("one", { requests: [GET("/items/2")], bodyContains: `"name":"${c.items[1][0]}"` }, `GET /items/2 answers ${c.items[1][0]}`)] },
          { where: "Change the one-row line", goal: "answer 404 when the database has no row with that id", files: S(...v[6]), tests: [t("none", { requests: [GET("/items/99")], status: 404 }, "GET /items/99 answers 404")] },
          { where: "Replace the line inside createItem with three lines", goal: "insert a posted item and answer it with the id the database gave it", files: S(...v[7]), tests: [t("insert", { requests: [POST("/items", { name: "Tea", price: 12 })], status: 201, bodyContains: '"id":4' }, "POST /items answers 201 with id 4")] },
          { where: "Add one route after the count route", goal: "add up all prices in the database with SUM", files: S(...v[8]), tests: [t("sum", { requests: [GET("/items/total")], bodyContains: json({ total: c.items.reduce((sum, [, price]) => sum + price, 0) }) }, "GET /items/total answers the sum of prices")] },
          { where: "Add two lines after the total route", goal: "search names with LIKE, passing the search text as a parameter", files: S(...v[9]), tests: [t("like", { requests: [GET(`/items/search?q=${q}`)], bodyContains: `"name":"${c.items[2][0]}"` }, `GET /items/search?q=${q} finds ${c.items[2][0]}`)] },
          { where: "Change the open, CREATE TABLE, and starting-rows lines", goal: "keep the data in a file named by DB_FILE, creating the table and rows only once", files: S(...v[10]), tests: [t("file", { requests: [GET("/items")], env: { DB_FILE: "shop.db" }, status: 200, bodyContains: `"name":"${c.items[0][0]}"` }, "With DB_FILE=shop.db the server answers from a file"), tf("saved", "local-file-exists", { path: "shop.db" }, "shop.db exists on disk")] },
        ],
      };
    },
  },
  {
    key: "sqlite-changes", title: "Updating and Deleting Rows",
    concepts: ["api-delete-row", "api-changes", "api-update-row", null, null, "api-coalesce", "api-transaction", null, null, "api-sql-injection"],
    build(c) {
      const imp = 'import { DatabaseSync } from "node:sqlite";';
      const db = ['const db = new DatabaseSync(":memory:");', 'db.exec("CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL)");', 'const insert = db.prepare("INSERT INTO items (name, price) VALUES (?, ?)");', `for (const [name, price] of ${json(c.items)}) insert.run(name, price);`];
      const stub = ['return send(res, 501, { error: "Not built yet" });'];
      const fns = (del, upd) => ["function deleteItem(res, id) {", ...del.map((line) => `  ${line}`), "}", "async function updateItem(req, res, id) {", ...upd.map((line) => `  ${line}`), "}"];
      const one = 'const one = (id) => db.prepare("SELECT * FROM items WHERE id = ?").get(id);';
      const DEL = [];
      DEL[1] = ['db.prepare("DELETE FROM items WHERE id = ?").run(id);', "res.statusCode = 204;", "return res.end();"];
      DEL[2] = ['const result = db.prepare("DELETE FROM items WHERE id = ?").run(id);', 'if (result.changes === 0) return send(res, 404, { error: "Item not found" });', ...DEL[1].slice(1)];
      const UPD = [];
      UPD[3] = ["const data = JSON.parse(await readBody(req));", 'db.prepare("UPDATE items SET price = ? WHERE id = ?").run(data.price, id);', "return send(res, 200, one(id));"];
      UPD[4] = [UPD[3][0], 'const result = db.prepare("UPDATE items SET price = ? WHERE id = ?").run(data.price, id);', 'if (result.changes === 0) return send(res, 404, { error: "Item not found" });', UPD[3][2]];
      UPD[5] = [UPD[4][0], 'if (!Number.isInteger(data.price) || data.price < 0) return send(res, 422, { error: "price must be a whole number 0 or more" });', ...UPD[4].slice(1)];
      UPD[6] = [UPD[5][0], 'if (data.price !== undefined && (!Number.isInteger(data.price) || data.price < 0)) return send(res, 422, { error: "price must be a whole number 0 or more" });', 'const result = db.prepare("UPDATE items SET name = COALESCE(?, name), price = COALESCE(?, price) WHERE id = ?").run(data.name ?? null, data.price ?? null, id);', ...UPD[5].slice(3)];
      const R = {
        match: "const match = req.url.match(/^\\/items\\/(\\d+)$/);",
        get: 'if (match && req.method === "GET") { const row = one(Number(match[1])); return row ? send(res, 200, row) : send(res, 404, { error: "Item not found" }); }',
        del: 'if (match && req.method === "DELETE") return deleteItem(res, Number(match[1]));',
        put: 'if (match && req.method === "PUT") return updateItem(req, res, Number(match[1]));',
        list: 'if (req.url === "/items") return send(res, 200, db.prepare("SELECT * FROM items").all());',
        listCount: 'if (req.url === "/items") { const rows = db.prepare("SELECT * FROM items").all(); res.setHeader("X-Total-Count", String(rows.length)); return send(res, 200, rows); }',
        raise: 'if (req.url === "/items/raise" && req.method === "POST") { db.exec("BEGIN"); db.prepare("UPDATE items SET price = price + 1").run(); db.exec("COMMIT"); return send(res, 200, db.prepare("SELECT * FROM items").all()); }',
        count: 'if (req.url === "/items/count") return send(res, 200, db.prepare("SELECT COUNT(*) AS count FROM items").get());',
        url: 'const url = new URL(req.url, "http://localhost");',
        search: 'if (url.pathname === "/items/search") return send(res, 200, db.prepare("SELECT * FROM items WHERE name = ?").all(url.searchParams.get("name") ?? ""));',
        missing: 'send(res, 404, { error: "Not found" });',
      };
      const pre = (del, upd) => [imp, ...sendFn, readBodyFn, ...db, one, ...fns(del, upd)];
      const S = (del, upd, body) => ({ "server.js": server(pre(del, upd), body) });
      const base = [R.match, R.get, R.del, R.put, R.list, R.missing];
      const v = [];
      v[1] = [DEL[1], stub, base];
      v[2] = [DEL[2], stub, base];
      v[3] = [DEL[2], UPD[3], base];
      v[4] = [DEL[2], UPD[4], base];
      v[5] = [DEL[2], UPD[5], base];
      v[6] = [DEL[2], UPD[6], base];
      v[7] = [DEL[2], UPD[6], [R.raise, ...base]];
      v[8] = [DEL[2], UPD[6], [R.raise, R.count, ...base]];
      v[9] = [DEL[2], UPD[6], [R.raise, R.count, ...base.slice(0, 4), R.listCount, R.missing]];
      v[10] = [DEL[2], UPD[6], [R.raise, R.count, R.url, R.search, ...base.slice(0, 4), R.listCount, R.missing]];
      const injection = "/items/search?name=%27%20OR%20%271%27%3D%271";
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "server.js": server(pre(stub, stub), base) },
        steps: [
          { where: "Replace the line inside deleteItem with three lines", goal: "delete a row and answer 204 No Content", files: S(...v[1]), tests: [t("deleted", { requests: [{ method: "DELETE", path: "/items/1" }], status: 204 }, "DELETE /items/1 answers 204")] },
          { where: "Change the DELETE line and add a check after it", goal: "answer 404 when no row was deleted, using result.changes", files: S(...v[2]), tests: [t("none", { requests: [{ method: "DELETE", path: "/items/99" }], status: 404 }, "DELETE /items/99 answers 404")] },
          { where: "Replace the line inside updateItem with three lines", goal: "change a row's price with UPDATE and answer the updated row", files: S(...v[3]), tests: [t("updated", { requests: [SEND("PUT", "/items/1", { price: 99 })], bodyContains: '"price":99' }, "PUT /items/1 with price 99 answers the new price")] },
          { where: "Change the UPDATE line and add a check after it", goal: "answer 404 when no row was updated", files: S(...v[4]), tests: [t("none", { requests: [SEND("PUT", "/items/99", { price: 1 })], status: 404 }, "PUT /items/99 answers 404")] },
          { where: "Add one line after the JSON.parse line", goal: "answer 422 when the price is not a whole number of 0 or more", files: S(...v[5]), tests: [t("bad", { requests: [SEND("PUT", "/items/1", { price: -5 })], status: 422 }, "PUT /items/1 with price -5 answers 422")] },
          { where: "Change the price check and the UPDATE line", goal: "let a PUT change the name, the price, or both, keeping whatever is not sent", files: S(...v[6]), tests: [t("name", { requests: [SEND("PUT", "/items/1", { name: "Tea" })], bodyContains: `"name":"Tea","price":${c.items[0][1]}` }, "PUT /items/1 with only a name keeps the price")] },
          { where: "Add one route at the top of the handler", goal: "raise every price by 1 inside a transaction", files: S(...v[7]), tests: [t("raise", { requests: [POST("/items/raise", {})], bodyContains: `"price":${c.items[0][1] + 1}` }, "POST /items/raise answers the raised prices")] },
          { where: "Add one route after the raise route", goal: "count the rows so a delete can be seen", files: S(...v[8]), tests: [t("count", { requests: [{ method: "DELETE", path: "/items/1" }, GET("/items/count")], bodyContains: json({ count: 2 }) }, "After DELETE /items/1, GET /items/count answers 2")] },
          { where: "Change the GET /items line", goal: "send the number of rows in an X-Total-Count header", files: S(...v[9]), tests: [t("header", { requests: [GET("/items")], header: { name: "x-total-count", value: "3" } }, "GET /items sends X-Total-Count: 3")] },
          { where: "Add two lines after the count route", goal: "search by exact name with a ? parameter, so typed text can never change the SQL", files: S(...v[10]), tests: [t("found", { requests: [GET(`/items/search?name=${c.items[1][0]}`)], bodyContains: `"name":"${c.items[1][0]}"` }, `GET /items/search?name=${c.items[1][0]} finds it`), t("safe", { requests: [GET(injection)], status: 200, bodyContains: "[]" }, "A search for ' OR '1'='1 finds nothing")] },
        ],
      };
    },
  },
  {
    key: "errors", title: "Errors and Status Codes",
    concepts: ["api-server-error", "api-error-id", "api-http-error", null, null, "api-payload-limit", null, "api-conflict", null, null],
    build(c) {
      const file2 = (pre, body, call) => file('import http from "node:http";', ...pre, "const port = Number(process.env.PORT ?? 3000);", "async function handle(req, res) {", ...body.map((line) => `  ${line}`), "}", "const server = http.createServer((req, res) => {", `  ${call}`, "});", "server.listen(port);");
      const cls = "class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }";
      const read = readBodyFn;
      const readLimited = 'async function readBody(req) { let text = ""; for await (const chunk of req) { text += chunk; if (text.length > 1000) throw new HttpError(413, "Body too large"); } return text; }';
      const readJson = 'async function readJson(req) { const text = await readBody(req); try { return JSON.parse(text); } catch { throw new HttpError(400, "Body must be JSON"); } }';
      const readJsonType = 'async function readJson(req) { if (!req.headers["content-type"]?.includes("application/json")) throw new HttpError(415, "Send JSON"); const text = await readBody(req); try { return JSON.parse(text); } catch { throw new HttpError(400, "Body must be JSON"); } }';
      const create = (lines) => ["async function createItem(req, res) {", ...lines.map((line) => `  ${line}`), "}"];
      const C0 = ["const item = JSON.parse(await readBody(req));", "items.push(item);", "return send(res, 201, item);"];
      const C4 = ["const item = await readJson(req);", ...C0.slice(1)];
      const C8 = [C4[0], 'if (items.some((existing) => existing.name === item.name)) throw new HttpError(409, "Name already exists");', ...C4.slice(1)];
      const calls = {
        plain: "handle(req, res);",
        c500: 'handle(req, res).catch(() => send(res, 500, { error: "Something went wrong" }));',
        cId: 'handle(req, res).catch(() => send(res, 500, { error: "Something went wrong", id: ++errorCount }));',
        cHttp: 'handle(req, res).catch((error) => send(res, error.status ?? 500, { error: error.status ? error.message : "Something went wrong", id: ++errorCount }));',
        cStatus: 'handle(req, res).catch((error) => send(res, error.status ?? 500, { error: error.status ? error.message : "Something went wrong", status: error.status ?? 500, id: ++errorCount }));',
      };
      const R = {
        list: 'if (req.url === "/items" && req.method === "GET") return send(res, 200, items);',
        create: 'if (req.url === "/items" && req.method === "POST") return createItem(req, res);',
        boom: 'if (req.url === "/boom") throw new Error("Database is down");',
        teapot: 'if (req.url === "/teapot") throw new HttpError(418, "I am a teapot");',
        allow: 'if (req.url === "/items" && !["GET", "POST"].includes(req.method)) { res.setHeader("Allow", "GET, POST"); throw new HttpError(405, "Method not allowed"); }',
        missing: 'send(res, 404, { error: "Not found" });',
        missingThrow: "throw new HttpError(404, `No route for ${req.method} ${req.url}`);",
      };
      const base = [itemsLine(c), ...sendFn];
      const S = (pre, body, call) => ({ "server.js": file2([...base, ...pre], body, call) });
      const v = [];
      v[1] = [[read, ...create(C0)], [R.boom, R.list, R.create, R.missing], calls.c500];
      v[2] = [["let errorCount = 0;", read, ...create(C0)], v[1][1], calls.cId];
      v[3] = [["let errorCount = 0;", cls, read, ...create(C0)], [R.boom, R.teapot, R.list, R.create, R.missing], calls.cHttp];
      v[4] = [["let errorCount = 0;", cls, read, readJson, ...create(C4)], v[3][1], calls.cHttp];
      v[5] = [v[4][0], [R.boom, R.teapot, R.allow, R.list, R.create, R.missing], calls.cHttp];
      v[6] = [["let errorCount = 0;", cls, readLimited, readJson, ...create(C4)], v[5][1], calls.cHttp];
      v[7] = [["let errorCount = 0;", cls, readLimited, readJsonType, ...create(C4)], v[5][1], calls.cHttp];
      v[8] = [["let errorCount = 0;", cls, readLimited, readJsonType, ...create(C8)], v[5][1], calls.cHttp];
      v[9] = [v[8][0], v[5][1], calls.cStatus];
      v[10] = [v[8][0], [R.boom, R.teapot, R.allow, R.list, R.create, R.missingThrow], calls.cStatus];
      const big = { method: "POST", path: "/items", body: JSON.stringify({ name: "x".repeat(2000), price: 1 }), headers: { "Content-Type": "application/json" } };
      const text = { method: "POST", path: "/items", body: "name=Tea", headers: { "Content-Type": "text/plain" } };
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "server.js": file2([...base, read, ...create(C0)], [R.list, R.create, R.missing], calls.plain) },
        steps: [
          { where: "Add a /boom route at the top of handle and change the handle call at the bottom", goal: "catch any error and answer 500 instead of letting the server crash", files: S(...v[1]), tests: [t("500", { requests: [GET("/boom")], status: 500, bodyContains: "Something went wrong" }, "GET /boom answers 500"), t("alive", { requests: [GET("/boom"), GET("/items")], status: 200 }, "The server keeps answering after an error")] },
          { where: "Add a counter above handle and change the catch", goal: "give each error answer a number so it can be found in logs", files: S(...v[2]), tests: [t("id", { requests: [GET("/boom")], bodyContains: '"id":1' }, "The first error answers id 1")] },
          { where: "Add an HttpError class, a /teapot route, and change the catch", goal: "let code throw an error that carries its own status code", files: S(...v[3]), tests: [t("teapot", { requests: [GET("/teapot")], status: 418, bodyContains: "I am a teapot" }, "GET /teapot answers 418"), t("hidden", { requests: [GET("/boom")], status: 500, bodyContains: "Something went wrong" }, "Unexpected errors still hide their details")] },
          { where: "Add a readJson helper and use it in createItem", goal: "answer 400 for broken JSON by throwing an HttpError", files: S(...v[4]), tests: [t("400", { requests: [SEND("POST", "/items", "not json")], status: 400 }, "POST /items with broken JSON answers 400")] },
          { where: "Add one route before the GET /items line", goal: "answer 405 with an Allow header for methods /items does not support", files: S(...v[5]), tests: [t("405", { requests: [{ method: "DELETE", path: "/items" }], status: 405, header: { name: "allow", value: "GET, POST" } }, "DELETE /items answers 405 with Allow: GET, POST")] },
          { where: "Change the readBody helper", goal: "stop reading and answer 413 when a body is larger than 1,000 characters", files: S(...v[6]), tests: [t("413", { requests: [big], status: 413 }, "A 2,000-character body answers 413")] },
          { where: "Change the readJson helper", goal: "answer 415 when the body is not marked as JSON", files: S(...v[7]), tests: [t("415", { requests: [text], status: 415 }, "POST /items with text/plain answers 415")] },
          { where: "Add one line in createItem after reading the item", goal: "answer 409 Conflict when an item with that name already exists", files: S(...v[8]), tests: [t("409", { requests: [POST("/items", { name: c.items[0][0], price: 1 })], status: 409 }, `POST /items with ${c.items[0][0]} again answers 409`)] },
          { where: "Change the catch at the bottom", goal: "include the status code inside every error body", files: S(...v[9]), tests: [t("status", { requests: [GET("/teapot")], bodyContains: '"status":418' }, "The /teapot error body includes status 418")] },
          { where: "Replace the last line of handle", goal: "throw a 404 HttpError that names the method and path", files: S(...v[10]), tests: [t("route", { requests: [GET("/nope")], status: 404, bodyContains: "No route for GET /nope" }, "GET /nope answers No route for GET /nope")] },
        ],
      };
    },
  },
  {
    key: "api-design", title: "Designing a Clean API",
    concepts: ["api-versioning", "api-pagination", null, "api-envelope", null, "api-next-link", null, null, "api-limit-cap", "api-deprecation"],
    build(c) {
      const names = json(c.items.map(([name]) => name));
      const pre = [`const names = ${names};`, "const items = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${names[n % 3]} ${n + 1}`, price: (n + 1) * 5 }));", ...sendFn];
      const all = Array.from({ length: 12 }, (_, n) => ({ id: n + 1, name: `${c.items[n % 3][0]} ${n + 1}`, price: (n + 1) * 5 }));
      const url = 'const url = new URL(req.url, "http://localhost");';
      const old = 'if (url.pathname === "/items") return send(res, 200, items);';
      const oldDep = 'if (url.pathname === "/items") { res.setHeader("Deprecation", "true"); return send(res, 200, items); }';
      const page = 'const page = Number(url.searchParams.get("page") ?? 1);';
      const per = 'const perPage = Number(url.searchParams.get("perPage") ?? 5);';
      const perCap = 'const perPage = Math.min(Number(url.searchParams.get("perPage") ?? 5), 10);';
      const data = "const data = items.slice((page - 1) * perPage, page * perPage);";
      const next = "const next = page * perPage < items.length ? `/v1/items?page=${page + 1}&perPage=${perPage}` : null;";
      const prev = "const previous = page > 1 ? `/v1/items?page=${page - 1}&perPage=${perPage}` : null;";
      const bad = 'if (!Number.isInteger(page) || page < 1) return send(res, 400, { error: "page must be a whole number 1 or more" });';
      const V = {
        v1: 'if (url.pathname === "/v1/items") return send(res, 200, items);',
        p5: 'if (url.pathname === "/v1/items") return send(res, 200, items.slice((page - 1) * 5, page * 5));',
        pp: 'if (url.pathname === "/v1/items") return send(res, 200, items.slice((page - 1) * perPage, page * perPage));',
        env: 'if (url.pathname === "/v1/items") return send(res, 200, { data, page, perPage });',
        total: 'if (url.pathname === "/v1/items") return send(res, 200, { data, page, perPage, total: items.length });',
        next: 'if (url.pathname === "/v1/items") return send(res, 200, { data, page, perPage, total: items.length, next });',
        prev: 'if (url.pathname === "/v1/items") return send(res, 200, { data, page, perPage, total: items.length, next, previous });',
      };
      const missing = 'send(res, 404, { error: "Not found" });';
      const S = (body) => ({ "server.js": server(pre, body) });
      const v = [];
      v[1] = [url, V.v1, old, missing];
      v[2] = [url, page, V.p5, old, missing];
      v[3] = [url, page, per, V.pp, old, missing];
      v[4] = [url, page, per, data, V.env, old, missing];
      v[5] = [url, page, per, data, V.total, old, missing];
      v[6] = [url, page, per, data, next, V.next, old, missing];
      v[7] = [url, page, per, data, next, prev, V.prev, old, missing];
      v[8] = [url, page, bad, per, data, next, prev, V.prev, old, missing];
      v[9] = [url, page, bad, perCap, data, next, prev, V.prev, old, missing];
      v[10] = [url, page, bad, perCap, data, next, prev, V.prev, oldDep, missing];
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "server.js": server(pre, [url, old, missing]) },
        steps: [
          { where: "Add one route after the url line", goal: "serve the list at /v1/items so the API can change later without breaking old clients", files: S(v[1]), tests: [t("v1", { requests: [GET("/v1/items")], status: 200, bodyContains: `"name":"${all[0].name}"` }, "GET /v1/items answers the list")] },
          { where: "Add a page line and change the /v1/items route", goal: "answer five items per page, chosen with ?page", files: S(v[2]), tests: [t("page2", { requests: [GET("/v1/items?page=2")], bodyContains: json(all.slice(5, 10)) }, "GET /v1/items?page=2 answers items 6 to 10")] },
          { where: "Add a perPage line and change the route to use it", goal: "let the client choose how many items per page with ?perPage", files: S(v[3]), tests: [t("per", { requests: [GET("/v1/items?perPage=3")], bodyContains: json(all.slice(0, 3)) }, "GET /v1/items?perPage=3 answers three items")] },
          { where: "Add a data line and change the route", goal: "wrap the page in an object with data, page, and perPage", files: S(v[4]), tests: [t("envelope", { requests: [GET("/v1/items?page=2")], bodyContains: '"page":2,"perPage":5' }, "The answer says page 2 and perPage 5")] },
          { where: "Change the /v1/items route", goal: "add the total number of items to the answer", files: S(v[5]), tests: [t("total", { requests: [GET("/v1/items")], bodyContains: '"total":12' }, "The answer says total 12")] },
          { where: "Add a next line and add next to the answer", goal: "give the link to the next page, or null on the last page", files: S(v[6]), tests: [t("next", { requests: [GET("/v1/items")], bodyContains: '"next":"/v1/items?page=2&perPage=5"' }, "Page 1 links to page 2"), t("last", { requests: [GET("/v1/items?page=3")], bodyContains: '"next":null' }, "The last page has no next link")] },
          { where: "Add a previous line and add previous to the answer", goal: "give the link to the page before, or null on the first page", files: S(v[7]), tests: [t("previous", { requests: [GET("/v1/items?page=2")], bodyContains: '"previous":"/v1/items?page=1&perPage=5"' }, "Page 2 links back to page 1")] },
          { where: "Add one line after the page line", goal: "answer 400 when page is not a whole number 1 or more", files: S(v[8]), tests: [t("bad", { requests: [GET("/v1/items?page=0")], status: 400 }, "GET /v1/items?page=0 answers 400")] },
          { where: "Change the perPage line", goal: "never send more than 10 items per page, whatever the client asks", files: S(v[9]), tests: [t("cap", { requests: [GET("/v1/items?perPage=100")], bodyContains: '"perPage":10,"total":12' }, "GET /v1/items?perPage=100 answers perPage 10")] },
          { where: "Change the old /items route", goal: "mark the old unversioned route as deprecated with a header", files: S(v[10]), tests: [t("deprecated", { requests: [GET("/items")], header: { name: "deprecation", value: "true" } }, "GET /items sends Deprecation: true")] },
        ],
      };
    },
  },
];

export const apiBasicsProjects = contexts.flatMap((c, round) =>
  tracks.map((track) => {
    const id = `${track.key}-${c.slug}`;
    const built = track.build(c);
    const steps = built.steps.map((step, index) => ({
      ...step,
      commands: step.commands ?? [],
      id: `api-${id}-${index + 1}`,
      conceptId: round === 0 ? track.concepts[index] ?? undefined : undefined,
    }));
    return { id, title: `${c.title} ${track.title}`, place: c.place, track: track.title, seed: built.seed, steps };
  }),
);
