/**
 * Live integration audit of every account route against the real database.
 *
 * Run from apps/web against a running server that uses the same MONGODB_URI:
 *   node --env-file=.env.local tools/backend-integration-audit.mjs [http://localhost:3000]
 *
 * It creates one throwaway account and a session for it directly in MongoDB,
 * so no GitHub, Google, or email round-trip is needed, then exercises profile,
 * progress, project links, certificate gates and issuance, the public record,
 * feedback and its throttle, the sign-in redirects, and sign-out. Everything it
 * wrote is deleted at the end, pass or fail. The provider round-trips still
 * need one manual sign-in per provider on a configured deployment.
 */
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { promises as dnsPromises, setServers } from "node:dns";
import { existsSync } from "node:fs";
import { createRequire, registerHooks } from "node:module";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

registerHooks({ resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) return { url: pathToFileURL(join(process.cwd(), `${specifier.slice(2)}.ts`)).href, shortCircuit: true };
  if (specifier.startsWith(".") && context.parentURL && !/\.[cm]?[jt]sx?$/.test(specifier)) {
    const candidate = new URL(`${specifier}.ts`, context.parentURL);
    if (existsSync(fileURLToPath(candidate))) return { url: candidate.href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
} });

const base = process.argv[2] ?? process.env.CODEDADDY_URL ?? "http://localhost:3000";
if (!process.env.MONGODB_URI) {
  console.error("Set MONGODB_URI, for example with node --env-file=.env.local.");
  process.exit(1);
}
const dns = process.env.MONGODB_DNS_SERVERS?.split(",").filter(Boolean);
if (dns?.length) {
  setServers(dns);
  dnsPromises.setServers(dns);
}
const { MongoClient } = createRequire(join(process.cwd(), "package.json"))("mongodb");
const { frontEndCourses } = await import(pathToFileURL(join(process.cwd(), "content/curriculum.ts")).href);
const { capstones } = await import(pathToFileURL(join(process.cwd(), "content/capstones.ts")).href);

const client = await new MongoClient(process.env.MONGODB_URI).connect();
const db = client.db(process.env.MONGODB_DB || "codedaddy");
const sha = (v) => createHash("sha256").update(v).digest("hex");
const results = [];
const check = (name, ok, detail = "") => { results.push({ name, ok }); console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` :: ${detail}` : ""}`); };

const testUser = randomUUID();
const tokens = [];
async function sessionFor(userId) {
  const token = randomBytes(32).toString("base64url");
  tokens.push(sha(token));
  await db.collection("sessions").insertOne({ _id: sha(token), user_id: userId, created_at: new Date(), expires_at: new Date(Date.now() + 86400000) });
  return `codedaddy-session=${token}`;
}
async function call(path, { cookie, method = "GET", body, redirect = "follow" } = {}) {
  const response = await fetch(base + path, { method, redirect, headers: { ...(cookie ? { cookie } : {}), ...(body ? { "content-type": "application/json" } : {}), "x-forwarded-for": "203.0.113.77" }, body: body ? JSON.stringify(body) : undefined });
  const text = await response.text();
  let json = null; try { json = JSON.parse(text); } catch {}
  return { status: response.status, json, location: response.headers.get("location") };
}

try {
  await db.collection("users").insertOne({ _id: testUser, email: `smoke-${testUser}@example.test`, name: "Smoke Test", identities: [{ provider: "email", provider_id: `smoke-${testUser}@example.test`, email: `smoke-${testUser}@example.test` }], created_at: new Date(), updated_at: new Date(), last_sign_in_at: null });
  const cookie = await sessionFor(testUser);

  let r = await call("/api/auth/config");
  check("config configured", r.json?.configured === true && r.json?.certificateIssuance === true, JSON.stringify(r.json));
  r = await call("/api/auth/session");
  check("session anonymous", r.status === 200 && r.json?.user === null);
  r = await call("/api/auth/session", { cookie });
  check("session signed in", r.json?.user?.id === testUser, JSON.stringify(r.json?.user));
  r = await call("/api/profile");
  check("profile requires sign-in", r.status === 401);
  r = await call("/api/profile", { cookie });
  check("profile falls back to account name", r.json?.displayName === "Smoke Test", JSON.stringify(r.json));
  r = await call("/api/profile", { cookie, method: "PUT", body: { displayName: "  Smoke   Learner " } });
  check("profile save", r.status === 200 && r.json?.displayName === "Smoke Learner");
  r = await call("/api/profile", { cookie, method: "PUT", body: { displayName: "x" } });
  check("profile rejects short name", r.status === 400);
  r = await call("/api/profile", { cookie });
  check("profile reads saved", r.json?.displayName === "Smoke Learner");

  r = await call("/api/progress", { cookie });
  check("progress empty", r.status === 200 && JSON.stringify(r.json?.courses) === "{}" && r.json?.practice?.version === 1, JSON.stringify(r.json));
  const course = frontEndCourses[0];
  const activity = capstones[0];
  const practice = { version: 1, drafts: activity ? { [activity.id]: { files: Object.fromEntries(Object.keys(activity.files).map((n) => [n, `/* ${n} */`])), activeFile: Object.keys(activity.files)[0] } } : {}, completions: [], submissionDrafts: {} };
  const courses = { [course.id]: { stepIdx: 1, files: course.steps[1].starter ?? course.steps[0].solution, activeFile: course.steps[0].activeFile, completedSteps: [course.steps[0].id] } };
  r = await call("/api/progress", { cookie, method: "PUT", body: { courses, practice } });
  check("progress save", r.status === 200 && r.json?.saved === true, JSON.stringify(r.json));
  r = await call("/api/progress", { cookie });
  const savedCourse = r.json?.courses?.[course.id];
  check("progress reads course", savedCourse && savedCourse.files === undefined && Array.isArray(savedCourse.completedSteps ?? savedCourse.completedStepIds ?? []), JSON.stringify(savedCourse)?.slice(0, 160));
  check("progress keeps dotted file names in drafts", !activity || JSON.stringify(r.json?.practice?.drafts) === JSON.stringify(practice.drafts), JSON.stringify(r.json?.practice?.drafts)?.slice(0, 160));
  r = await call("/api/progress", { cookie, method: "PUT", body: { courses: { nope: {} }, practice } });
  check("progress rejects unknown course", r.status === 400);

  r = await call("/api/submissions", { cookie, method: "PUT", body: { projectId: capstones[0].id, repositoryUrl: "https://github.com/learner/repo", liveUrl: "https://learner.example.com" } });
  check("submission save", r.status === 200 && r.json?.submission?.project_id === capstones[0].id && r.json?.submission?.user_id === undefined, JSON.stringify(r.json));
  r = await call("/api/submissions", { cookie, method: "PUT", body: { projectId: capstones[0].id, repositoryUrl: "http://gitlab.com/x", liveUrl: "ftp://x" } });
  check("submission rejects bad links", r.status === 400);
  r = await call("/api/submissions", { cookie });
  check("submission list", r.json?.submissions?.length === 1);

  r = await call("/api/certificate", { cookie });
  check("certificate not ready", r.status === 200 && r.json?.signedIn === true && r.json?.ready === false && r.json?.certificate === null, JSON.stringify(r.json)?.slice(0, 200));
  r = await call("/api/certificate", { cookie, method: "POST" });
  check("certificate refuses when not ready", r.status === 409);

  // Seed a fully finished learner, then issue.
  const now = new Date();
  await db.collection("course_progress").deleteMany({ user_id: testUser });
  await db.collection("course_progress").insertMany(frontEndCourses.map((c) => ({ user_id: testUser, course_id: c.id, session: { stepIdx: c.steps.length - 1, completedSteps: c.steps.map((s) => s.id) }, created_at: now, updated_at: now })));
  await db.collection("practice_progress").updateOne({ user_id: testUser }, { $set: { state: { version: 1, drafts: {}, completions: capstones.map((c) => ({ activityId: c.id, passedTestIds: c.tests.map((t) => t.id), completedAt: now.toISOString() })), submissionDrafts: {} } } });
  await db.collection("project_submissions").deleteMany({ user_id: testUser });
  await db.collection("project_submissions").insertMany(capstones.map((c) => ({ user_id: testUser, project_id: c.id, repository_url: `https://github.com/learner/${c.id}`, live_url: `https://${c.id}.example.com`, verification_status: "recorded", created_at: now, updated_at: now })));
  r = await call("/api/certificate", { cookie });
  check("certificate ready", r.json?.ready === true, JSON.stringify({ c: r.json?.completedCourses?.length, k: r.json?.completedCapstones?.length, s: r.json?.submittedCapstones?.length }));
  const [a, b] = await Promise.all([call("/api/certificate", { cookie, method: "POST" }), call("/api/certificate", { cookie, method: "POST" })]);
  check("certificate issued once under double click", a.json?.certificate?.code && a.json.certificate.code === b.json?.certificate?.code, `${a.status} ${b.status} ${a.json?.certificate?.code}`);
  check("certificate count is one", (await db.collection("certificates").countDocuments({ user_id: testUser })) === 1);
  r = await call(`/api/certificate/${a.json?.certificate?.code}`);
  check("public certificate lookup", r.status === 200 && r.json?.certificate?.display_name === "Smoke Learner" && r.json?.certificate?.user_id === undefined, JSON.stringify(r.json));
  r = await call(`/api/certificate/${randomUUID()}`);
  check("unknown certificate 404", r.status === 404);
  r = await call("/api/certificate/not-a-uuid");
  check("malformed certificate 404", r.status === 404);

  r = await call("/api/feedback", { method: "POST", body: { mood: "idea", message: "smoke test feedback", page: "/smoke-test" } });
  check("feedback anonymous", r.status === 200 && r.json?.sent === true, JSON.stringify(r.json));
  r = await call("/api/feedback", { method: "POST", body: { mood: "nope" } });
  check("feedback rejects bad mood", r.status === 400);
  r = await call("/api/feedback", { cookie, method: "POST", body: { mood: "working", page: "/smoke-test" } });
  check("feedback signed in keeps user id", r.status === 200 && (await db.collection("feedback").findOne({ page: "/smoke-test", user_id: testUser })) !== null);
  let last;
  for (let i = 0; i < 9; i += 1) last = await call("/api/feedback", { method: "POST", body: { mood: "stuck", page: "/smoke-test" } });
  check("feedback throttled after 10 per hour", last.status === 429, String(last.status));

  r = await call("/api/auth/email", { method: "POST", body: { email: "smoke@example.test" } });
  check("email sign-in reports missing Resend", r.status === 503 || r.status === 502, `${r.status} ${JSON.stringify(r.json)}`);
  r = await call("/api/auth/github", { redirect: "manual" });
  check("github start", r.status === 307 && (r.location?.includes("github.com/login/oauth/authorize") || r.location?.includes("auth=provider-unavailable")), r.location);
  r = await call("/auth/callback/github?code=x&state=y", { redirect: "manual" });
  check("oauth callback without state cookie fails", r.location?.includes("auth=failed"), r.location);
  r = await call("/auth/callback?token=nope", { redirect: "manual", cookie: "codedaddy-email-verifier=nope" });
  check("email callback with bad token fails", r.location?.includes("auth=failed"), r.location);

  r = await call("/api/auth/logout", { cookie, method: "POST" });
  check("logout", r.json?.signedOut === true);
  r = await call("/api/auth/session", { cookie });
  check("session gone after logout", r.json?.user === null);
} finally {
  await Promise.all([
    db.collection("users").deleteOne({ _id: testUser }),
    db.collection("sessions").deleteMany({ _id: { $in: tokens } }),
    ...["profiles", "course_progress", "practice_progress", "project_submissions", "certificates"].map((name) => db.collection(name).deleteMany({ user_id: testUser })),
    db.collection("feedback").deleteMany({ page: "/smoke-test" }),
    db.collection("auth_throttle").deleteMany({ _id: { $in: [`feedback:${sha("203.0.113.77")}`, `client:${sha("203.0.113.77")}`, `email:${sha("smoke@example.test")}`] } }),
  ]);
  await client.close();
  const failed = results.filter((item) => !item.ok);
  console.log(`\n${results.length - failed.length}/${results.length} passed`);
  process.exitCode = failed.length ? 1 : 0;
}
