// The Auth and Security course skeleton: 30 projects of 10 steps.
//
// Like tools/api-basics-plan.mjs, this fixes the code each step asks for and
// the checks that prove it; the local model writes only the lesson text. Only
// Node's built-in modules are used (node:crypto, node:http; PLAN.md decision
// 45). Every check runs against fake users and fake secrets. These checks
// prove specific protections work; they never prove an application is secure.

import { scryptSync } from "node:crypto";

const contexts = [
  { slug: "sari-sari", title: "Sari-Sari Store", place: "a sari-sari store (a small neighborhood shop)", password: "tindahan2026" },
  { slug: "carinderia", title: "Carinderia", place: "a carinderia (a small eatery that serves cooked dishes)", password: "adobo4life" },
  { slug: "barangay", title: "Barangay Office", place: "a barangay office (the local community office)", password: "barangay-hall-9" },
  { slug: "school-club", title: "School Club", place: "a public school club", password: "eskwela2026" },
  { slug: "tricycle", title: "Tricycle Terminal", place: "a tricycle terminal (where small motor taxis wait for passengers)", password: "biyahe-ko-2026" },
];

const t = (id, fields, label) => ({ id, label, kind: "local-http", file: "server.js", ...fields });
const tn = (id, kind, fields, label) => ({ id, label, kind, file: "hash.js", ...fields });
const tf = (id, kind, fields, label) => ({ id, label, kind, ...fields });
const file = (...lines) => lines.join("\n") + "\n";
const pkg = file("{", '  "type": "module"', "}");
const readme = (c) => file(`${c.title} security project.`, "Every user, password, and secret here is fake practice data.");
const GET = (path, headers) => ({ method: "GET", path, ...(headers ? { headers } : {}) });
const SEND = (method, path, body, headers = {}) => ({ method, path, body: typeof body === "string" ? body : JSON.stringify(body), headers: { "Content-Type": "application/json", ...headers } });
const POST = (path, body, headers) => SEND("POST", path, body, headers);
const BEARER = { header: "Authorization", field: "token", prefix: "Bearer " };
const AUTH = (method, path, body) => ({ method, path, ...(body === undefined ? {} : { body: JSON.stringify(body), headers: { "Content-Type": "application/json" } }), fromPrevious: BEARER });
const json = (value) => JSON.stringify(value);

function server(pre, body) {
  return file('import http from "node:http";', ...pre, "const port = Number(process.env.PORT ?? 3000);", "const server = http.createServer(async (req, res) => {", ...body.map((line) => `  ${line}`), "});", "server.listen(port);");
}
const fn = (head, lines) => [head, ...lines.map((line) => `  ${line}`), "}"];
const sendFn = ["function send(res, status, data) {", "  res.statusCode = status;", '  res.setHeader("Content-Type", "application/json");', "  res.end(JSON.stringify(data));", "}"];
const readBodyFn = 'async function readBody(req) { let text = ""; for await (const chunk of req) text += chunk; return text; }';
const readJsonFn = "async function readJson(req) { try { return JSON.parse(await readBody(req)); } catch { return {}; } }";
const hashFn = 'function hashPassword(password) { const salt = randomBytes(16).toString("hex"); return `${salt}:${scryptSync(password, salt, 32).toString("hex")}`; }';
const verifyPwFn = 'function verifyPassword(password, stored) { const [salt, hash] = stored.split(":"); return timingSafeEqual(Buffer.from(hash, "hex"), scryptSync(password, salt, 32)); }';
const missing = 'send(res, 404, { error: "Not found" });';
const stub = ['return send(res, 501, { error: "Not built yet" });'];

const tracks = [
  {
    key: "hashing", title: "Storing Passwords Safely",
    concepts: ["sec-plain-password", "sec-hash", "sec-salt", null, "sec-verify-hash", null, "sec-password-length", "sec-common-password", "sec-no-logging-secrets", "sec-hash-length"],
    build(c) {
      const pw = c.password;
      const imp = 'import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";';
      const L = {
        pw: 'const password = process.argv[2] ?? "";',
        len: "console.log(`Length: ${password.length}`);",
        masked: 'console.log(`Checking ${"*".repeat(password.length)}`);',
        fixedSalt: 'const salt = "fixedsalt";',
        salt: 'const salt = randomBytes(16).toString("hex");',
        hash: 'const hash = scryptSync(password, salt, 32).toString("hex");',
        hash64: 'const hash = scryptSync(password, salt, 64).toString("hex");',
        printHash: "console.log(`Hash: ${hash}`);",
        printHashLen: "console.log(`Hash length: ${hash.length}`);",
        saltLen: "console.log(`Salt length: ${salt.length}`);",
        stored: "const stored = `${salt}:${hash}`;",
        parts: 'console.log(`Stored parts: ${stored.split(":").length}`);',
        verify: 'const verify = (attempt, saved) => { const [s, h] = saved.split(":"); return timingSafeEqual(Buffer.from(h, "hex"), scryptSync(attempt, s, 32)); };',
        verify64: 'const verify = (attempt, saved) => { const [s, h] = saved.split(":"); return timingSafeEqual(Buffer.from(h, "hex"), scryptSync(attempt, s, 64)); };',
        correct: "console.log(`Correct: ${verify(password, stored)}`);",
        wrong: 'console.log(`Wrong: ${verify("wrong-guess", stored)}`);',
        short: 'if (password.length < 8) { console.error("Password must be at least 8 characters"); process.exit(1); }',
        common: 'const common = ["password", "12345678", "qwerty123"];',
        commonCheck: 'if (common.includes(password.toLowerCase())) { console.error("Choose a less common password"); process.exit(2); }',
      };
      const head = [imp, 'console.log("Password tool");'];
      const v = [];
      v[1] = [...head, L.pw, L.len];
      v[2] = [...v[1], L.fixedSalt, L.hash, L.printHash];
      v[3] = [...v[1], L.salt, L.saltLen, L.hash, L.printHash];
      v[4] = [...v[3], L.stored, L.parts];
      v[5] = [...v[4], L.verify, L.correct];
      v[6] = [...v[5], L.wrong];
      v[7] = [...head, L.pw, L.short, ...v[6].slice(3)];
      v[8] = [...head, L.pw, L.short, L.common, L.commonCheck, ...v[6].slice(3)];
      v[9] = [...head, L.pw, L.short, L.common, L.commonCheck, L.masked, ...v[8].slice(7)];
      v[10] = v[9].map((line) => (line === L.hash ? L.hash64 : line === L.verify ? L.verify64 : line === L.printHash ? L.printHashLen : line));
      const out = (n) => ({ "hash.js": file(...v[n]) });
      const fixedHash = scryptSync(pw, "fixedsalt", 32).toString("hex");
      const args = [pw];
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "hash.js": file(...head) },
        steps: [
          { where: "Add two lines at the end of hash.js", goal: "read a password typed after the command and print only its length", files: out(1), tests: [tn("length", "local-node-prints", { args, value: `Length: ${pw.length}` }, `node hash.js ${pw} prints Length: ${pw.length}`)] },
          { where: "Add three lines at the end", goal: "turn the password into a scrypt hash with a fixed salt and print the hash", files: out(2), tests: [tn("hash", "local-node-prints", { args, value: `Hash: ${fixedHash}` }, "The script prints the scrypt hash")] },
          { where: "Replace the fixed salt line with a random salt and print its length", goal: "use a new random salt each time, so two users with the same password get different hashes", files: out(3), tests: [tn("salt", "local-node-prints", { args, value: "Salt length: 32" }, "The script prints Salt length: 32")] },
          { where: "Add two lines at the end", goal: "store the salt and hash together as salt:hash", files: out(4), tests: [tn("parts", "local-node-prints", { args, value: "Stored parts: 2" }, "The script prints Stored parts: 2")] },
          { where: "Add two lines at the end", goal: "check a password against the stored value with timingSafeEqual", files: out(5), tests: [tn("correct", "local-node-prints", { args, value: "Correct: true" }, "The right password checks as true")] },
          { where: "Add one line at the end", goal: "show that a wrong password checks as false", files: out(6), tests: [tn("wrong", "local-node-prints", { args, value: "Wrong: false" }, "A wrong password checks as false")] },
          { where: "Add one line right after the password line", goal: "refuse passwords shorter than 8 characters with exit code 1", files: out(7), tests: [tn("short", "local-node-exit-code", { args: ["abc"], code: 1 }, "node hash.js abc ends with exit code 1"), tn("fine", "local-node-exit-code", { args, code: 0 }, `node hash.js ${pw} still works`)] },
          { where: "Add two lines after the length check", goal: "refuse very common passwords with exit code 2", files: out(8), tests: [tn("common", "local-node-exit-code", { args: ["Password"], code: 2 }, "node hash.js Password ends with exit code 2")] },
          { where: "Replace the Length line", goal: "never print a real password, not even its letters; show stars instead", files: out(9), tests: [tn("masked", "local-node-prints", { args, value: `Checking ${"*".repeat(pw.length)}` }, "The script prints stars instead of the password")] },
          { where: "Change the two scrypt lines and the hash print line", goal: "make a longer 64-byte hash and print only its length", files: out(10), tests: [tn("long", "local-node-prints", { args, value: "Hash length: 128" }, "The script prints Hash length: 128"), tn("still", "local-node-prints", { args, value: "Correct: true" }, "The right password still checks as true")] },
        ],
      };
    },
  },
  {
    key: "signup-login", title: "Sign-Up and Login",
    concepts: ["sec-signup", "sec-unique-username", "sec-input-rules", "sec-login", "sec-safe-listing", "sec-rate-limit", "sec-reset-failures", "sec-confirm-password", "sec-username-format", "sec-required-fields"],
    build(c) {
      const imp = 'import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";';
      const pw = c.password;
      const account = { username: "ana", password: pw, confirm: pw };
      const SU = [];
      SU[1] = ["const { username, password } = await readJson(req);", "users.set(username, hashPassword(password));", "return send(res, 201, { username });"];
      SU[2] = [SU[1][0], 'if (users.has(username)) return send(res, 409, { error: "Username taken" });', ...SU[1].slice(1)];
      SU[3] = [SU[1][0], 'if (typeof username !== "string" || username.length < 3 || typeof password !== "string" || password.length < 8) return send(res, 422, { error: "Username needs 3 or more characters and password 8 or more" });', ...SU[2].slice(1)];
      SU[8] = ["const { username, password, confirm } = await readJson(req);", SU[3][1], 'if (password !== confirm) return send(res, 422, { error: "Passwords do not match" });', ...SU[3].slice(2)];
      SU[9] = [...SU[8].slice(0, 3), 'if (!/^[a-z0-9_]+$/i.test(username)) return send(res, 422, { error: "Use letters, numbers, and _ only" });', ...SU[8].slice(3)];
      const LI = [];
      const fail401 = 'if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: "Wrong username or password" });';
      const fail401count = 'if (!users.has(username) || !verifyPassword(password, users.get(username))) { failures.set(username, (failures.get(username) ?? 0) + 1); return send(res, 401, { error: "Wrong username or password" }); }';
      const locked = 'if ((failures.get(username) ?? 0) >= 5) return send(res, 429, { error: "Too many attempts. Try again later." });';
      const welcome = "return send(res, 200, { message: `Welcome, ${username}` });";
      LI[4] = ["const { username, password } = await readJson(req);", fail401, welcome];
      LI[6] = [LI[4][0], locked, fail401count, welcome];
      LI[7] = [LI[4][0], locked, fail401count, "failures.delete(username);", welcome];
      LI[10] = [LI[4][0], 'if (!username || !password) return send(res, 400, { error: "Send username and password" });', ...LI[7].slice(1)];
      const pre = (su, li, extra = []) => [imp, ...sendFn, readBodyFn, readJsonFn, hashFn, verifyPwFn, "const users = new Map();", ...extra, ...fn("async function signup(req, res) {", su), ...fn("async function login(req, res) {", li)];
      const routes = ['if (req.url === "/signup" && req.method === "POST") return signup(req, res);', 'if (req.url === "/login" && req.method === "POST") return login(req, res);'];
      const usersRoute = 'if (req.url === "/users") return send(res, 200, [...users.keys()]);';
      const S = (su, li, body = [...routes, missing], extra) => ({ "server.js": server(pre(su, li, extra), body) });
      const withUsers = [...routes, usersRoute, missing];
      const F = ["const failures = new Map();"];
      const signup = POST("/signup", account);
      const good = POST("/login", { username: "ana", password: pw });
      const bad = POST("/login", { username: "ana", password: "wrong-guess" });
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "server.js": server(pre(stub, stub), [...routes, missing]) },
        steps: [
          { where: "Replace the line inside signup with three lines", goal: "store a new user with a hashed password and answer 201", files: S(SU[1], stub), tests: [t("created", { requests: [signup], status: 201, bodyContains: '"username":"ana"' }, "POST /signup answers 201")] },
          { where: "Add one line in signup after reading the body", goal: "answer 409 when the username is already taken", files: S(SU[2], stub), tests: [t("taken", { requests: [signup, signup], status: 409 }, "Signing up twice as ana answers 409")] },
          { where: "Add one line in signup after reading the body", goal: "answer 422 when the username or password is too short", files: S(SU[3], stub), tests: [t("rules", { requests: [POST("/signup", { username: "al", password: "x", confirm: "x" })], status: 422 }, "A too-short sign-up answers 422")] },
          { where: "Replace the line inside login with three lines", goal: "check the password against the stored hash and answer 401 or a welcome", files: S(SU[3], LI[4]), tests: [t("wrong", { requests: [signup, bad], status: 401 }, "A wrong password answers 401"), t("right", { requests: [signup, good], status: 200, bodyContains: "Welcome, ana" }, "The right password answers Welcome, ana")] },
          { where: "Add one route after the login route", goal: "list usernames only, never their password hashes", files: S(SU[3], LI[4], withUsers), tests: [t("names", { requests: [signup, GET("/users")], bodyContains: '["ana"]', bodyLacks: ":" }, "GET /users answers only the names")] },
          { where: "Add a failures map above signup, a lockout check in login, and count failures", goal: "answer 429 after five wrong passwords in a row", files: S(SU[3], LI[6], withUsers, F), tests: [t("locked", { requests: [signup, bad, bad, bad, bad, bad, bad], status: 429 }, "The sixth wrong try answers 429")] },
          { where: "Add one line in login before the welcome", goal: "clear the failure count after a successful login", files: S(SU[3], LI[7], withUsers, F), tests: [t("reset", { requests: [signup, bad, bad, bad, bad, good, bad, bad], status: 401 }, "After a good login, wrong tries start counting again from zero")] },
          { where: "Read confirm in signup and add one check", goal: "answer 422 when the two passwords do not match", files: S(SU[8], LI[7], withUsers, F), tests: [t("mismatch", { requests: [POST("/signup", { username: "ana", password: pw, confirm: `${pw}x` })], status: 422, bodyContains: "Passwords do not match" }, "Different passwords answer 422")] },
          { where: "Add one line in signup after the password check", goal: "allow only letters, numbers, and _ in usernames", files: S(SU[9], LI[7], withUsers, F), tests: [t("format", { requests: [POST("/signup", { username: "ana smith", password: pw, confirm: pw })], status: 422, bodyContains: "letters, numbers" }, "A username with a space answers 422")] },
          { where: "Add one line in login after reading the body", goal: "answer 400 when the username or password is missing", files: S(SU[9], LI[10], withUsers, F), tests: [t("missing", { requests: [POST("/login", {})], status: 400 }, "POST /login with an empty body answers 400")] },
        ],
      };
    },
  },
  {
    key: "sessions", title: "Sessions and Cookies",
    concepts: ["sec-session", "sec-cookie", "sec-samesite", "sec-logout", "sec-session-expiry", "sec-max-age", "sec-protected-route", "sec-secure-cookie", "sec-csrf", null],
    build(c) {
      const pw = c.password;
      const imp = 'import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";';
      const cookieFn = 'function cookie(req, name) { return (req.headers.cookie ?? "").split(/; */).map((part) => part.split("=")).find(([key]) => key === name)?.[1]; }';
      const users = `const users = new Map([["ana", hashPassword("${pw}")]]);`;
      const minutes = "const minutes = Number(process.env.SESSION_MINUTES ?? 30);";
      const currentFn = 'function currentUser(req) { const session = sessions.get(cookie(req, "sid")); return session && session.expires > Date.now() ? session.username : null; }';
      const L = {
        read: "const { username, password } = await readJson(req);",
        fail: 'if (!users.has(username) || !verifyPassword(password, users.get(username))) return send(res, 401, { error: "Wrong username or password" });',
        sid: 'const sid = randomBytes(16).toString("hex");',
        set: "sessions.set(sid, username);",
        setExp: "sessions.set(sid, { username, expires: Date.now() + minutes * 60 * 1000 });",
        setCsrf: 'sessions.set(sid, { username, expires: Date.now() + minutes * 60 * 1000, csrf: randomBytes(16).toString("hex") });',
        c1: 'res.setHeader("Set-Cookie", `sid=${sid}; HttpOnly; Path=/`);',
        c2: 'res.setHeader("Set-Cookie", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/`);',
        c3: 'res.setHeader("Set-Cookie", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${minutes * 60}`);',
        c4: 'res.setHeader("Set-Cookie", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${minutes * 60}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`);',
        ok: "return send(res, 200, { username });",
      };
      const R = {
        login: 'if (req.url === "/login" && req.method === "POST") return login(req, res);',
        me: 'if (req.url === "/me") { const username = sessions.get(cookie(req, "sid")); return username ? send(res, 200, { username }) : send(res, 401, { error: "Log in first" }); }',
        meExp: 'if (req.url === "/me") { const session = sessions.get(cookie(req, "sid")); return session && session.expires > Date.now() ? send(res, 200, { username: session.username }) : send(res, 401, { error: "Log in first" }); }',
        logout: 'if (req.url === "/logout" && req.method === "POST") { sessions.delete(cookie(req, "sid")); res.setHeader("Set-Cookie", "sid=; Max-Age=0; Path=/"); return send(res, 200, { ok: true }); }',
        logoutCsrf: 'if (req.url === "/logout" && req.method === "POST") { const session = sessions.get(cookie(req, "sid")); if (!session || req.headers["x-csrf-token"] !== session.csrf) return send(res, 403, { error: "Missing or wrong CSRF token" }); sessions.delete(cookie(req, "sid")); res.setHeader("Set-Cookie", "sid=; Max-Age=0; Path=/"); return send(res, 200, { ok: true }); }',
        orders: 'if (req.url === "/orders") { const username = currentUser(req); return username ? send(res, 200, { owner: username, orders: [] }) : send(res, 401, { error: "Log in first" }); }',
        csrf: 'if (req.url === "/csrf") { const session = sessions.get(cookie(req, "sid")); return session ? send(res, 200, { csrf: session.csrf }) : send(res, 401, { error: "Log in first" }); }',
        count: 'if (req.url === "/sessions") { const username = currentUser(req); return username ? send(res, 200, { active: [...sessions.values()].filter((session) => session.username === username).length }) : send(res, 401, { error: "Log in first" }); }',
      };
      const base = [imp, ...sendFn, readBodyFn, readJsonFn, hashFn, verifyPwFn, cookieFn, users, "const sessions = new Map();"];
      const S = (extra, li, body) => ({ "server.js": server([...base, ...extra, ...fn("async function login(req, res) {", li)], body) });
      const LI = [];
      LI[0] = [L.read, L.fail, L.ok];
      LI[1] = [L.read, L.fail, L.sid, L.set, L.c1, L.ok];
      LI[3] = [L.read, L.fail, L.sid, L.set, L.c2, L.ok];
      LI[5] = [L.read, L.fail, L.sid, L.setExp, L.c2, L.ok];
      LI[6] = [L.read, L.fail, L.sid, L.setExp, L.c3, L.ok];
      LI[8] = [L.read, L.fail, L.sid, L.setExp, L.c4, L.ok];
      LI[9] = [L.read, L.fail, L.sid, L.setCsrf, L.c4, L.ok];
      const login = POST("/login", { username: "ana", password: pw });
      const v = [];
      v[1] = [[], LI[1], [R.login, missing]];
      v[2] = [[], LI[1], [R.login, R.me, missing]];
      v[3] = [[], LI[3], v[2][2]];
      v[4] = [[], LI[3], [R.login, R.me, R.logout, missing]];
      v[5] = [[minutes], LI[5], [R.login, R.meExp, R.logout, missing]];
      v[6] = [[minutes], LI[6], v[5][2]];
      v[7] = [[minutes, currentFn], LI[6], [R.login, R.meExp, R.logout, R.orders, missing]];
      v[8] = [[minutes, currentFn], LI[8], v[7][2]];
      v[9] = [[minutes, currentFn], LI[9], [R.login, R.meExp, R.csrf, R.logoutCsrf, R.orders, missing]];
      v[10] = [[minutes, currentFn], LI[9], [R.login, R.meExp, R.csrf, R.logoutCsrf, R.orders, R.count, missing]];
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "server.js": server([...base, ...fn("async function login(req, res) {", LI[0])], [R.login, missing]) },
        steps: [
          { where: "Add three lines in login before the last line", goal: "start a session with a random id and send it in an HttpOnly cookie", files: S(...v[1]), tests: [t("cookie", { requests: [login], header: { name: "set-cookie", value: "HttpOnly" } }, "Logging in sets an HttpOnly sid cookie")] },
          { where: "Add one route after the login route", goal: "answer /me with the logged-in user, found through the cookie", files: S(...v[2]), tests: [t("me", { cookies: true, requests: [login, GET("/me")], status: 200, bodyContains: '"username":"ana"' }, "After logging in, GET /me answers ana"), t("anon", { requests: [GET("/me")], status: 401 }, "Without logging in, GET /me answers 401")] },
          { where: "Change the Set-Cookie line", goal: "add SameSite=Lax so other sites cannot send this cookie on most requests", files: S(...v[3]), tests: [t("samesite", { requests: [login], header: { name: "set-cookie", value: "SameSite=Lax" } }, "The cookie says SameSite=Lax")] },
          { where: "Add one route after /me", goal: "log out by deleting the session on the server, not only the cookie", files: S(...v[4]), tests: [t("logout", { cookies: true, requests: [login, POST("/logout", {}), GET("/me")], status: 401 }, "After logout, the old cookie no longer works")] },
          { where: "Add a minutes setting, store an expiry with the session, and check it in /me", goal: "make sessions expire after SESSION_MINUTES", files: S(...v[5]), tests: [t("expired", { cookies: true, env: { SESSION_MINUTES: "0" }, requests: [login, GET("/me")], status: 401 }, "With SESSION_MINUTES=0, the session has already expired")] },
          { where: "Change the Set-Cookie line", goal: "tell the browser to forget the cookie when the session ends, with Max-Age", files: S(...v[6]), tests: [t("maxage", { requests: [login], header: { name: "set-cookie", value: "Max-Age=1800" } }, "The cookie says Max-Age=1800")] },
          { where: "Add a currentUser helper above login and one route after /logout", goal: "protect /orders so only a logged-in user can see it", files: S(...v[7]), tests: [t("closed", { requests: [GET("/orders")], status: 401 }, "GET /orders without a session answers 401"), t("open", { cookies: true, requests: [login, GET("/orders")], bodyContains: '"owner":"ana"' }, "After logging in, GET /orders answers ana's orders")] },
          { where: "Change the Set-Cookie line", goal: "mark the cookie Secure in production so it only travels over HTTPS", files: S(...v[8]), tests: [t("secure", { env: { NODE_ENV: "production" }, requests: [login], header: { name: "set-cookie", value: "Secure" } }, "In production the cookie says Secure")] },
          { where: "Store a CSRF token with the session, add a /csrf route, and check the token in /logout", goal: "refuse a logout that does not send the CSRF token", files: S(...v[9]), tests: [t("forged", { cookies: true, requests: [login, POST("/logout", {})], status: 403 }, "A logout without the token answers 403"), t("real", { cookies: true, requests: [login, GET("/csrf"), { ...POST("/logout", {}), fromPrevious: { header: "X-CSRF-Token", field: "csrf" } }], status: 200 }, "A logout with the token answers 200")] },
          { where: "Add one route after /orders", goal: "report how many sessions the user has open", files: S(...v[10]), tests: [t("count", { cookies: true, requests: [login, login, GET("/sessions")], bodyContains: '"active":2' }, "After two logins, GET /sessions answers 2")] },
        ],
      };
    },
  },
  {
    key: "tokens", title: "Signed Tokens",
    concepts: ["sec-token", "sec-hmac", "sec-timing-safe", "sec-token-expiry", "sec-secret-config", "sec-role", "sec-forbidden", "sec-www-authenticate", "sec-revocation", "sec-token-in-url"],
    build(c) {
      const pw = c.password;
      const imp = 'import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";';
      const users = `const users = new Map([["ana", { hash: hashPassword("${pw}"), role: "member" }], ["admin", { hash: hashPassword("admin-pass-2026"), role: "admin" }]]);`;
      const secret = 'const secret = process.env.TOKEN_SECRET ?? "dev-only-secret";';
      const required = 'if (process.env.NODE_ENV === "production" && !process.env.TOKEN_SECRET) { console.error("TOKEN_SECRET is required in production"); process.exit(1); }';
      const minutes = "const minutes = Number(process.env.TOKEN_MINUTES ?? 60);";
      const signFn = 'function sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString("base64url"); return `${body}.${createHmac("sha256", secret).update(body).digest("base64url")}`; }';
      const V = {
        plain: 'function verifyToken(token) { const [body, signature] = String(token).split("."); if (!body || signature !== createHmac("sha256", secret).update(body).digest("base64url")) return null; return JSON.parse(Buffer.from(body, "base64url").toString()); }',
        safe: 'function verifyToken(token) { const [body, signature] = String(token).split("."); const expected = createHmac("sha256", secret).update(body ?? "").digest(); const given = Buffer.from(signature ?? "", "base64url"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; return JSON.parse(Buffer.from(body, "base64url").toString()); }',
        exp: 'function verifyToken(token) { const [body, signature] = String(token).split("."); const expected = createHmac("sha256", secret).update(body ?? "").digest(); const given = Buffer.from(signature ?? "", "base64url"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; const payload = JSON.parse(Buffer.from(body, "base64url").toString()); return payload.exp > Date.now() ? payload : null; }',
      };
      const tokenUser = 'function tokenUser(req) { return verifyToken((req.headers.authorization ?? "").replace("Bearer ", "")); }';
      const tokenUserRevoked = 'function tokenUser(req) { const token = (req.headers.authorization ?? "").replace("Bearer ", ""); return revoked.has(token) ? null : verifyToken(token); }';
      const L = {
        read: "const { username, password } = await readJson(req);",
        user: "const user = users.get(username);",
        fail: 'if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: "Wrong username or password" });',
        welcome: "return send(res, 200, { message: `Welcome, ${username}` });",
        token: "return send(res, 200, { token: sign({ username }) });",
        tokenExp: "return send(res, 200, { token: sign({ username, exp: Date.now() + minutes * 60 * 1000 }) });",
        tokenRole: "return send(res, 200, { token: sign({ username, role: user.role, exp: Date.now() + minutes * 60 * 1000 }) });",
      };
      const R = {
        login: 'if (req.url === "/login" && req.method === "POST") return login(req, res);',
        me: 'if (req.url === "/me") { const payload = verifyToken((req.headers.authorization ?? "").replace("Bearer ", "")); return payload ? send(res, 200, payload) : send(res, 401, { error: "Send a valid token" }); }',
        meHelper: 'if (req.url === "/me") { const payload = tokenUser(req); return payload ? send(res, 200, payload) : send(res, 401, { error: "Send a valid token" }); }',
        meAuth: 'if (req.url === "/me") { const payload = tokenUser(req); if (!payload) res.setHeader("WWW-Authenticate", "Bearer"); return payload ? send(res, 200, payload) : send(res, 401, { error: "Send a valid token" }); }',
        admin: 'if (req.url === "/admin") { const user = tokenUser(req); if (!user) return send(res, 401, { error: "Send a valid token" }); if (user.role !== "admin") return send(res, 403, { error: "Admins only" }); return send(res, 200, { report: "All good" }); }',
        logout: 'if (req.url === "/logout" && req.method === "POST") { revoked.add((req.headers.authorization ?? "").replace("Bearer ", "")); return send(res, 200, { ok: true }); }',
        noUrl: 'if (new URL(req.url, "http://localhost").searchParams.has("token")) return send(res, 400, { error: "Send tokens in the Authorization header, not the URL" });',
      };
      const base = [imp, ...sendFn, readBodyFn, readJsonFn, hashFn, verifyPwFn, users];
      const S = (extra, li, body) => ({ "server.js": server([...base, ...extra, ...fn("async function login(req, res) {", li)], body) });
      const li = (last) => [L.read, L.user, L.fail, last];
      const v = [];
      v[1] = [[secret, signFn], li(L.token), [R.login, missing]];
      v[2] = [[secret, signFn, V.plain], li(L.token), [R.login, R.me, missing]];
      v[3] = [[secret, signFn, V.safe], li(L.token), v[2][2]];
      v[4] = [[secret, minutes, signFn, V.exp], li(L.tokenExp), v[2][2]];
      v[5] = [[secret, required, minutes, signFn, V.exp], li(L.tokenExp), v[2][2]];
      v[6] = [[secret, required, minutes, signFn, V.exp], li(L.tokenRole), v[2][2]];
      v[7] = [[secret, required, minutes, signFn, V.exp, tokenUser], li(L.tokenRole), [R.login, R.me, R.admin, missing]];
      v[8] = [v[7][0], li(L.tokenRole), [R.login, R.meAuth, R.admin, missing]];
      v[9] = [[secret, required, minutes, signFn, V.exp, "const revoked = new Set();", tokenUserRevoked], li(L.tokenRole), [R.login, R.meAuth, R.admin, R.logout, missing]];
      v[10] = [v[9][0], li(L.tokenRole), [R.noUrl, ...v[9][2]]];
      const login = POST("/login", { username: "ana", password: pw });
      const admin = POST("/login", { username: "admin", password: "admin-pass-2026" });
      const forged = `${Buffer.from(JSON.stringify({ username: "admin", role: "admin", exp: 9999999999999 })).toString("base64url")}.fake`;
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "server.js": server([...base, ...fn("async function login(req, res) {", li(L.welcome))], [R.login, missing]) },
        steps: [
          { where: "Add a secret and a sign function above login, and change the last line of login", goal: "answer a successful login with a signed token", files: S(...v[1]), tests: [t("token", { requests: [login], status: 200, bodyContains: '"token":"' }, "Logging in answers a token")] },
          { where: "Add a verifyToken function and a /me route", goal: "accept the token in an Authorization: Bearer header and reject changed tokens", files: S(...v[2]), tests: [t("me", { requests: [login, AUTH("GET", "/me")], status: 200, bodyContains: '"username":"ana"' }, "GET /me with the token answers ana"), t("forged", { requests: [GET("/me", { Authorization: `Bearer ${forged}` })], status: 401 }, "A token with a fake signature answers 401")] },
          { where: "Replace verifyToken", goal: "compare signatures with timingSafeEqual so the comparison time gives nothing away", files: S(...v[3]), tests: [tf("safe", "local-file-contains", { path: "server.js", value: "timingSafeEqual(given, expected)" }, "verifyToken compares with timingSafeEqual"), t("still", { requests: [login, AUTH("GET", "/me")], status: 200 }, "Real tokens still work")] },
          { where: "Add a minutes setting, add exp to the token, and check it in verifyToken", goal: "make tokens expire after TOKEN_MINUTES", files: S(...v[4]), tests: [t("expired", { env: { TOKEN_MINUTES: "0" }, requests: [login, AUTH("GET", "/me")], status: 401 }, "With TOKEN_MINUTES=0, a new token is already expired")] },
          { where: "Add one line after the secret line", goal: "refuse to start in production without a real TOKEN_SECRET", files: S(...v[5]), tests: [tf("stop", "local-node-exit-code", { file: "server.js", env: { NODE_ENV: "production" }, code: 1 }, "In production without TOKEN_SECRET the server stops with exit code 1")] },
          { where: "Change the last line of login", goal: "put the user's role inside the token", files: S(...v[6]), tests: [t("role", { requests: [login, AUTH("GET", "/me")], bodyContains: '"role":"member"' }, "ana's token says role member")] },
          { where: "Add a tokenUser helper and an /admin route", goal: "answer 403 to users who are logged in but not admins", files: S(...v[7]), tests: [t("member", { requests: [login, AUTH("GET", "/admin")], status: 403 }, "ana gets 403 at /admin"), t("admin", { requests: [admin, AUTH("GET", "/admin")], status: 200 }, "admin gets 200 at /admin")] },
          { where: "Change the /me route", goal: "say how to authenticate with a WWW-Authenticate header on 401", files: S(...v[8]), tests: [t("hint", { requests: [GET("/me")], status: 401, header: { name: "www-authenticate", value: "Bearer" } }, "GET /me without a token sends WWW-Authenticate: Bearer")] },
          { where: "Add a revoked set, change tokenUser, and add a /logout route", goal: "let a logout cancel a token before it expires", files: S(...v[9]), tests: [t("revoked", { requests: [login, AUTH("POST", "/logout", {}), AUTH("GET", "/me")], status: 401 }, "After logout, the same token answers 401")] },
          { where: "Add one line at the top of the handler", goal: "refuse tokens sent in the URL, where logs and history would keep them", files: S(...v[10]), tests: [t("url", { requests: [GET("/me?token=abc")], status: 400 }, "GET /me?token=abc answers 400")] },
        ],
      };
    },
  },
  {
    key: "access", title: "Who Can See What",
    concepts: ["sec-authorization", "sec-idor", null, null, "sec-owner-from-login", "sec-admin-view", "sec-sharing", "sec-audit", "sec-mass-assignment", "sec-unguessable-id"],
    build(c) {
      const pw = c.password;
      const imp = 'import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";';
      const impUuid = 'import { createHmac, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";';
      const users = `const users = new Map([["ana", { hash: hashPassword("${pw}"), role: "member" }], ["ben", { hash: hashPassword("ben-pass-2026"), role: "member" }], ["admin", { hash: hashPassword("admin-pass-2026"), role: "admin" }]]);`;
      const notesLine = `const notes = [{ id: 1, owner: "ana", text: "${c.title} supply list", sharedWith: ["ben"] }, { id: 2, owner: "ben", text: "Ben private plan", sharedWith: [] }, { id: 3, owner: "ana", text: "Ana budget", sharedWith: [] }];`;
      const secret = 'const secret = process.env.TOKEN_SECRET ?? "dev-only-secret";';
      const signFn = 'function sign(payload) { const body = Buffer.from(JSON.stringify(payload)).toString("base64url"); return `${body}.${createHmac("sha256", secret).update(body).digest("base64url")}`; }';
      const verifyFn = 'function verifyToken(token) { const [body, signature] = String(token).split("."); const expected = createHmac("sha256", secret).update(body ?? "").digest(); const given = Buffer.from(signature ?? "", "base64url"); if (!body || given.length !== expected.length || !timingSafeEqual(given, expected)) return null; return JSON.parse(Buffer.from(body, "base64url").toString()); }';
      const tokenUser = 'function tokenUser(req) { return verifyToken((req.headers.authorization ?? "").replace("Bearer ", "")); }';
      const loginFn = fn("async function login(req, res) {", ["const { username, password } = await readJson(req);", "const user = users.get(username);", 'if (!user || !verifyPassword(password, user.hash)) return send(res, 401, { error: "Wrong username or password" });', "return send(res, 200, { token: sign({ username, role: user.role }) });"]);
      const base = (i) => [i, ...sendFn, readBodyFn, readJsonFn, hashFn, verifyPwFn, users, notesLine, secret, signFn, verifyFn, tokenUser, ...loginFn];
      const head = ['if (req.url === "/login" && req.method === "POST") return login(req, res);', "const user = tokenUser(req);", 'if (!user) return send(res, 401, { error: "Log in first" });'];
      const match = "const match = req.url.match(/^\\/notes\\/(\\d+)$/);";
      const find = "const note = match && notes.find((item) => item.id === Number(match[1]));";
      const R = {
        list: 'if (req.url === "/notes" && req.method === "GET") return send(res, 200, notes.filter((note) => note.owner === user.username));',
        listAdmin: 'if (req.url === "/notes" && req.method === "GET") return send(res, 200, user.role === "admin" ? notes : notes.filter((note) => note.owner === user.username));',
        get: 'if (match && req.method === "GET") return note && note.owner === user.username ? send(res, 200, note) : send(res, 404, { error: "Note not found" });',
        getShared: 'if (match && req.method === "GET") return note && (note.owner === user.username || note.sharedWith.includes(user.username)) ? send(res, 200, note) : send(res, 404, { error: "Note not found" });',
        getAudit: 'if (match && req.method === "GET") { if (note && (note.owner === user.username || note.sharedWith.includes(user.username))) return send(res, 200, note); denied += 1; return send(res, 404, { error: "Note not found" }); }',
        put: 'if (match && req.method === "PUT") { if (!note || note.owner !== user.username) return send(res, 404, { error: "Note not found" }); Object.assign(note, await readJson(req)); return send(res, 200, note); }',
        putSafe: 'if (match && req.method === "PUT") { if (!note || note.owner !== user.username) return send(res, 404, { error: "Note not found" }); note.text = String((await readJson(req)).text ?? note.text); return send(res, 200, note); }',
        del: 'if (match && req.method === "DELETE") { if (!note || note.owner !== user.username) return send(res, 404, { error: "Note not found" }); notes.splice(notes.indexOf(note), 1); res.statusCode = 204; return res.end(); }',
        post: 'if (req.url === "/notes" && req.method === "POST") { const data = await readJson(req); const created = { id: notes.length + 1, owner: user.username, text: String(data.text ?? ""), sharedWith: [] }; notes.push(created); return send(res, 201, created); }',
        postUuid: 'if (req.url === "/notes" && req.method === "POST") { const data = await readJson(req); const created = { id: randomUUID(), owner: user.username, text: String(data.text ?? ""), sharedWith: [] }; notes.push(created); return send(res, 201, created); }',
        audit: 'if (req.url === "/audit" && user.role === "admin") return send(res, 200, { denied });',
      };
      const S = (i, extra, body) => ({ "server.js": server([...base(i), ...extra], [...head, ...body, missing]) });
      const v = [];
      v[1] = [imp, [], [R.list]];
      v[2] = [imp, [], [R.list, match, find, R.get]];
      v[3] = [imp, [], [R.list, match, find, R.get, R.put]];
      v[4] = [imp, [], [R.list, match, find, R.get, R.put, R.del]];
      v[5] = [imp, [], [R.list, R.post, match, find, R.get, R.put, R.del]];
      v[6] = [imp, [], [R.listAdmin, R.post, match, find, R.get, R.put, R.del]];
      v[7] = [imp, [], [R.listAdmin, R.post, match, find, R.getShared, R.put, R.del]];
      v[8] = [imp, ["let denied = 0;"], [R.listAdmin, R.post, R.audit, match, find, R.getAudit, R.put, R.del]];
      v[9] = [imp, ["let denied = 0;"], [R.listAdmin, R.post, R.audit, match, find, R.getAudit, R.putSafe, R.del]];
      v[10] = [impUuid, ["let denied = 0;"], [R.listAdmin, R.postUuid, R.audit, match, find, R.getAudit, R.putSafe, R.del]];
      const as = (name, password) => POST("/login", { username: name, password });
      const ana = as("ana", pw);
      const ben = as("ben", "ben-pass-2026");
      const admin = as("admin", "admin-pass-2026");
      const anaNotes = [{ id: 1, owner: "ana", text: `${c.title} supply list`, sharedWith: ["ben"] }, { id: 3, owner: "ana", text: "Ana budget", sharedWith: [] }];
      return {
        seed: { "package.json": pkg, "README.txt": readme(c), "server.js": server(base(imp), [...head, missing]) },
        steps: [
          { where: "Add one route after the login check", goal: "answer GET /notes with only the logged-in user's own notes", files: S(...v[1]), tests: [t("own", { requests: [ana, AUTH("GET", "/notes")], bodyContains: json(anaNotes) }, "ana sees only her two notes")] },
          { where: "Add two lines that find the note and one GET route", goal: "answer 404 when someone asks for another person's note by id", files: S(...v[2]), tests: [t("other", { requests: [ana, AUTH("GET", "/notes/2")], status: 404, bodyContains: "Note not found" }, "ana asking for ben's note gets 404"), t("mine", { requests: [ana, AUTH("GET", "/notes/3")], status: 200 }, "ana can read her own note")] },
          { where: "Add one PUT route after the GET route", goal: "let people change only their own notes", files: S(...v[3]), tests: [t("other", { requests: [ana, AUTH("PUT", "/notes/2", { text: "hacked" })], status: 404, bodyContains: "Note not found" }, "ana cannot change ben's note"), t("mine", { requests: [ana, AUTH("PUT", "/notes/3", { text: "New budget" })], bodyContains: "New budget" }, "ana can change her own note")] },
          { where: "Add one DELETE route after the PUT route", goal: "let people delete only their own notes", files: S(...v[4]), tests: [t("other", { requests: [ana, AUTH("DELETE", "/notes/2")], status: 404, bodyContains: "Note not found" }, "ana cannot delete ben's note"), t("mine", { requests: [ana, AUTH("DELETE", "/notes/3")], status: 204 }, "ana can delete her own note")] },
          { where: "Add one POST route after the list route", goal: "take the owner of a new note from the login, never from the request body", files: S(...v[5]), tests: [t("owner", { requests: [ana, AUTH("POST", "/notes", { owner: "ben", text: "Posted by Ana" })], status: 201, bodyContains: '"owner":"ana"' }, "A note posted by ana belongs to ana even if the body says ben")] },
          { where: "Change the list route", goal: "let an admin see every note while members see only their own", files: S(...v[6]), tests: [t("admin", { requests: [admin, AUTH("GET", "/notes")], bodyContains: "Ben private plan" }, "admin sees ben's note")] },
          { where: "Change the GET route", goal: "let people read notes shared with them, but still not change them", files: S(...v[7]), tests: [t("shared", { requests: [ben, AUTH("GET", "/notes/1")], status: 200, bodyContains: `${c.title} supply list` }, "ben can read the note ana shared"), t("noedit", { requests: [ben, AUTH("PUT", "/notes/1", { text: "changed" })], status: 404 }, "ben still cannot change it")] },
          { where: "Add a denied counter, count refusals in the GET route, and add an /audit route", goal: "let an admin see how many times someone was refused", files: S(...v[8]), tests: [t("audit", { requests: [ana, AUTH("GET", "/notes/2"), admin, AUTH("GET", "/audit")], bodyContains: '"denied":1' }, "After one refusal, admin sees denied 1")] },
          { where: "Change the PUT route", goal: "copy only the text field, so a PUT can never change the owner", files: S(...v[9]), tests: [t("owner", { requests: [ben, AUTH("PUT", "/notes/2", { owner: "ana", text: "still mine" }), ana, AUTH("GET", "/notes")], bodyContains: json(anaNotes) }, "ben cannot give his note to ana by sending an owner field")] },
          { where: "Import randomUUID and use it for new note ids", goal: "give new notes ids that cannot be guessed by counting", files: S(...v[10]), tests: [t("uuid", { requests: [ana, AUTH("POST", "/notes", { text: "Random id" })], status: 201, bodyContains: '"id":"' }, "A new note gets a text id, not a counting number")] },
        ],
      };
    },
  },
  {
    key: "checklist", title: "Security Checklist",
    concepts: ["sec-nosniff", "sec-csp", "sec-secret-leak", "sec-cors-allowlist", "sec-xss", "sec-path-traversal", "sec-open-redirect", "sec-body-limit", "sec-hsts", null],
    build(c) {
      const imp = ['import { readFile } from "node:fs/promises";', 'import path from "node:path";'];
      const config = 'const config = { currency: "PHP", place: "' + c.title + '", apiKey: "sk-live-FAKE-DO-NOT-SHARE" };';
      const escape = 'const escapeHtml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");';
      const read = readBodyFn;
      const readLimited = 'async function readBody(req) { let text = ""; for await (const chunk of req) { text += chunk; if (text.length > 1000) throw new Error("too large"); } return text; }';
      const hitsLine = "const hits = new Map();";
      const H = {
        nosniff: 'res.setHeader("X-Content-Type-Options", "nosniff");',
        referrer: 'res.setHeader("Referrer-Policy", "no-referrer");',
        frame: 'res.setHeader("X-Frame-Options", "DENY");',
        csp: "res.setHeader(\"Content-Security-Policy\", \"default-src 'self'\");",
        cors: 'if (req.headers.origin && req.headers.origin === process.env.ALLOWED_ORIGIN) res.setHeader("Access-Control-Allow-Origin", req.headers.origin);',
        hsts: 'if (process.env.NODE_ENV === "production") res.setHeader("Strict-Transport-Security", "max-age=31536000");',
        rate: 'const ip = req.socket.remoteAddress; hits.set(ip, (hits.get(ip) ?? 0) + 1); if (hits.get(ip) > 5) return send(res, 429, { error: "Slow down" });',
      };
      const url = 'const url = new URL(req.url, "http://localhost");';
      const R = {
        configLeak: 'if (url.pathname === "/config") return send(res, 200, config);',
        configSafe: 'if (url.pathname === "/config") { const { apiKey, ...publicConfig } = config; return send(res, 200, publicConfig); }',
        hello: 'if (url.pathname === "/hello") { res.setHeader("Content-Type", "text/html"); return res.end(`<p>Hello, ${url.searchParams.get("name") ?? "friend"}</p>`); }',
        helloSafe: 'if (url.pathname === "/hello") { res.setHeader("Content-Type", "text/html"); return res.end(`<p>Hello, ${escapeHtml(url.searchParams.get("name") ?? "friend")}</p>`); }',
        files: 'if (url.pathname === "/files") { const name = url.searchParams.get("name") ?? ""; try { return res.end(await readFile(path.join("public", name), "utf8")); } catch { return send(res, 404, { error: "No such file" }); } }',
        filesSafe: 'if (url.pathname === "/files") { const name = url.searchParams.get("name") ?? ""; if (name.includes("..") || name.includes("/") || name.includes("\\\\")) return send(res, 400, { error: "Bad file name" }); try { return res.end(await readFile(path.join("public", name), "utf8")); } catch { return send(res, 404, { error: "No such file" }); } }',
        go: 'if (url.pathname === "/go") { const to = url.searchParams.get("to") ?? "/"; res.statusCode = 302; res.setHeader("Location", to); return res.end(); }',
        goSafe: 'if (url.pathname === "/go") { const to = url.searchParams.get("to") ?? "/"; if (!to.startsWith("/") || to.startsWith("//")) return send(res, 400, { error: "Only local redirects" }); res.statusCode = 302; res.setHeader("Location", to); return res.end(); }',
        echo: 'if (url.pathname === "/echo" && req.method === "POST") { try { return send(res, 200, { length: (await readBody(req)).length }); } catch { return send(res, 413, { error: "Body too large" }); } }',
      };
      const pre = (extra, body) => [...imp, ...sendFn, body, config, ...extra];
      const S = (extra, readFn, body) => ({ "server.js": server(pre(extra, readFn), body) });
      const routes0 = [url, R.configLeak, R.hello, R.files, R.go, R.echo, missing];
      const v = [];
      v[1] = [[], read, [H.nosniff, H.referrer, H.frame, ...routes0]];
      v[2] = [[], read, [H.nosniff, H.referrer, H.frame, H.csp, ...routes0]];
      const heads = [H.nosniff, H.referrer, H.frame, H.csp];
      const routes = (config_, hello, files, go) => [url, config_, hello, files, go, R.echo, missing];
      v[3] = [[], read, [...heads, ...routes(R.configSafe, R.hello, R.files, R.go)]];
      v[4] = [[], read, [...heads, H.cors, ...routes(R.configSafe, R.hello, R.files, R.go)]];
      v[5] = [[escape], read, [...heads, H.cors, ...routes(R.configSafe, R.helloSafe, R.files, R.go)]];
      v[6] = [[escape], read, [...heads, H.cors, ...routes(R.configSafe, R.helloSafe, R.filesSafe, R.go)]];
      v[7] = [[escape], read, [...heads, H.cors, ...routes(R.configSafe, R.helloSafe, R.filesSafe, R.goSafe)]];
      v[8] = [[escape], readLimited, v[7][2]];
      v[9] = [[escape], readLimited, [...heads, H.cors, H.hsts, ...routes(R.configSafe, R.helloSafe, R.filesSafe, R.goSafe)]];
      v[10] = [[escape, hitsLine], readLimited, [H.rate, ...v[9][2]]];
      const origin = "https://shop.example";
      const big = { method: "POST", path: "/echo", body: "x".repeat(2000), headers: { "Content-Type": "text/plain" } };
      const seedServer = server(pre([], read), routes0);
      const seedFiles = { "package.json": pkg, "README.txt": readme(c), "server.js": seedServer, "public/menu.txt": file(`${c.title} menu`, "Open 7 AM to 7 PM"), "secret.txt": file("FAKE-SECRET-DO-NOT-SERVE") };
      return {
        seed: seedFiles,
        steps: [
          { where: "Add three lines at the top of the handler", goal: "send three common safety headers on every answer", files: S(...v[1]), tests: [t("nosniff", { requests: [GET("/config")], header: { name: "x-content-type-options", value: "nosniff" } }, "Answers send X-Content-Type-Options: nosniff"), t("frame", { requests: [GET("/config")], header: { name: "x-frame-options", value: "DENY" } }, "Answers send X-Frame-Options: DENY")] },
          { where: "Add one line after the other headers", goal: "add a Content-Security-Policy that only trusts this site", files: S(...v[2]), tests: [t("csp", { requests: [GET("/config")], header: { name: "content-security-policy", value: "default-src 'self'" } }, "Answers send a Content-Security-Policy")] },
          { where: "Change the /config route", goal: "answer the public settings but never the API key", files: S(...v[3]), tests: [t("public", { requests: [GET("/config")], bodyContains: '"currency":"PHP"', bodyLacks: "sk-live" }, "GET /config answers the currency without the key")] },
          { where: "Add one line after the headers", goal: "allow only the site named in ALLOWED_ORIGIN to call this API from a browser", files: S(...v[4]), tests: [t("allowed", { env: { ALLOWED_ORIGIN: origin }, requests: [GET("/config", { Origin: origin })], header: { name: "access-control-allow-origin", value: origin } }, "A request from the allowed site gets the CORS header")] },
          { where: "Add an escapeHtml helper and use it in /hello", goal: "escape a name before putting it in HTML, so it cannot inject a script", files: S(...v[5]), tests: [t("escaped", { requests: [GET("/hello?name=%3Cscript%3Ealert(1)%3C%2Fscript%3E")], bodyContains: "&lt;script&gt;", bodyLacks: "<script>" }, "A name with a script tag is shown as harmless text")] },
          { where: "Change the /files route", goal: "refuse file names that try to climb out of the public folder", files: S(...v[6]), tests: [t("climb", { requests: [GET("/files?name=..%2Fsecret.txt")], status: 400, bodyLacks: "FAKE-SECRET" }, "GET /files?name=../secret.txt answers 400"), t("menu", { requests: [GET("/files?name=menu.txt")], bodyContains: "menu" }, "Normal files still load")] },
          { where: "Change the /go route", goal: "redirect only to paths on this site, never to another website", files: S(...v[7]), tests: [t("evil", { requests: [GET("/go?to=https%3A%2F%2Fevil.example")], status: 400 }, "A redirect to another site answers 400"), t("local", { requests: [GET("/go?to=%2Fconfig")], status: 302, header: { name: "location", value: "/config" } }, "A redirect to /config still works")] },
          { where: "Change the readBody helper", goal: "stop reading a body after 1,000 characters and answer 413", files: S(...v[8]), tests: [t("big", { requests: [big], status: 413 }, "A 2,000-character body answers 413")] },
          { where: "Add one line after the CORS line", goal: "tell browsers to use HTTPS only, in production", files: S(...v[9]), tests: [t("hsts", { env: { NODE_ENV: "production" }, requests: [GET("/config")], header: { name: "strict-transport-security", value: "max-age=31536000" } }, "In production answers send Strict-Transport-Security")] },
          { where: "Add a hits map above the server and one line at the top of the handler", goal: "answer 429 when one address sends more than five requests", files: S(...v[10]), tests: [t("slow", { requests: [GET("/config"), GET("/config"), GET("/config"), GET("/config"), GET("/config"), GET("/config")], status: 429 }, "The sixth request answers 429")] },
        ],
      };
    },
  },
];

export const authSecurityProjects = contexts.flatMap((c, round) =>
  tracks.map((track) => {
    const id = `${track.key}-${c.slug}`;
    const built = track.build(c);
    const steps = built.steps.map((step, index) => ({
      ...step,
      commands: step.commands ?? [],
      id: `sec-${id}-${index + 1}`,
      conceptId: round === 0 ? track.concepts[index] ?? undefined : undefined,
    }));
    return { id, title: `${c.title} ${track.title}`, place: c.place, track: track.title, seed: built.seed, steps };
  }),
);
