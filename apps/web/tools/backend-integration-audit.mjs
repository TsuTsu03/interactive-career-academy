import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";
import { registerHooks } from "node:module";
import { tmpdir } from "node:os";
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

const { frontEndCourses } = await import("../content/curriculum.ts");
const { capstones } = await import("../content/capstones.ts");

const outputDir = process.env.CODEDADDY_QA_OUTPUT ?? join(tmpdir(), "codedaddy-backend-integration");
await mkdir(outputDir, { recursive: true });
const upstreamPort = 54329;
const appPort = 3001;
const requests = [];
let readyFixture = false;
let certificateStored = null;
const completedCourseRows = frontEndCourses.map((course) => {
  const last = course.steps.at(-1);
  return { course_id: course.id, session: { stepIdx: course.steps.length - 1, files: last.solution, activeFile: last.activeFile, completedSteps: course.steps.map((step) => step.id) } };
});
const completedPractice = { version: 1, drafts: {}, completions: capstones.map((capstone) => ({ activityId: capstone.id, passedTestIds: capstone.tests.map((test) => test.id), completedAt: "2026-08-29T00:00:00.000Z" })), submissionDrafts: {} };
const completedSubmissions = capstones.map((capstone) => ({ project_id: capstone.id, repository_url: `https://github.com/learner/${capstone.id}`, live_url: `https://${capstone.id}.example.com`, verification_status: "recorded" }));

async function bodyOf(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString("utf8");
  try { return JSON.parse(text); } catch { return text; }
}

const mock = createServer(async (request, response) => {
  const url = new URL(request.url, `http://127.0.0.1:${upstreamPort}`);
  const body = await bodyOf(request);
  requests.push({ method: request.method, path: url.pathname, search: url.search, authorization: request.headers.authorization, apikey: request.headers.apikey, body });
  response.setHeader("Content-Type", "application/json");
  if (url.pathname === "/auth/v1/otp") return response.end("{}");
  if (url.pathname === "/auth/v1/token") return response.end(JSON.stringify({ access_token: "access-test", refresh_token: "refresh-test", expires_in: 3600, user: { id: "11111111-1111-4111-8111-111111111111", email: "learner@example.com" } }));
  if (url.pathname === "/auth/v1/user") return response.end(JSON.stringify({ id: "11111111-1111-4111-8111-111111111111", email: "learner@example.com", user_metadata: { name: "Learner Test" } }));
  if (url.pathname === "/auth/v1/logout") { response.statusCode = 204; return response.end(); }
  if (url.pathname === "/rest/v1/profiles" && request.method === "GET") return response.end(readyFixture ? JSON.stringify([{ display_name: "Learner Test" }]) : "[]");
  if (url.pathname === "/rest/v1/profiles" && request.method === "POST") { response.statusCode = 201; return response.end("[]"); }
  if (url.pathname === "/rest/v1/course_progress") return response.end(readyFixture ? JSON.stringify(completedCourseRows) : "[]");
  if (url.pathname === "/rest/v1/practice_progress") return response.end(readyFixture ? JSON.stringify([{ state: completedPractice }]) : "[]");
  if (url.pathname === "/rest/v1/project_submissions" && request.method === "GET") return response.end(readyFixture ? JSON.stringify(completedSubmissions) : "[]");
  if (url.pathname === "/rest/v1/project_submissions" && request.method === "POST") { response.statusCode = 201; return response.end(JSON.stringify([{ ...body, updated_at: "2026-08-29T00:00:00.000Z" }])); }
  if (url.pathname === "/rest/v1/certificates" && request.method === "GET") return response.end(certificateStored ? JSON.stringify([certificateStored]) : "[]");
  if (url.pathname === "/rest/v1/certificates" && request.method === "POST") { certificateStored = { ...body, code: "22222222-2222-4222-8222-222222222222", credential_name: "Front-End Development Certificate of Completion", issued_at: "2026-08-29T00:00:00.000Z" }; response.statusCode = 201; return response.end(JSON.stringify([certificateStored])); }
  if (url.pathname === "/rest/v1/rpc/sync_learning_state") { response.statusCode = 204; return response.end(); }
  // Both return a plain boolean: allowed, and recorded. Missing these routes
  // sent the email route down its fail-closed path and the audit failed on a
  // 502 that had nothing to do with the contract under test.
  if (url.pathname === "/rest/v1/rpc/claim_email_link") return response.end("true");
  if (url.pathname === "/rest/v1/rpc/submit_feedback") return response.end("true");
  response.statusCode = 404;
  response.end(JSON.stringify({ message: "mock route not found" }));
});
await new Promise((resolve) => mock.listen(upstreamPort, "127.0.0.1", resolve));

const app = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(appPort)], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    SUPABASE_URL: `http://localhost:${upstreamPort}`,
    SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
    SUPABASE_SECRET_KEY: "sb_secret_test",
    SITE_URL: `http://localhost:${appPort}`,
  },
  stdio: ["ignore", "pipe", "pipe"],
});
let appOutput = "";
app.stdout.on("data", (chunk) => { appOutput += chunk; });
app.stderr.on("data", (chunk) => { appOutput += chunk; });

const base = `http://localhost:${appPort}`;
async function waitForApp() {
  for (let count = 0; count < 200; count += 1) {
    try { const response = await fetch(`${base}/api/auth/config`); if (response.ok) return; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`App did not start. ${appOutput}`);
}

function cookieHeader(response, existing = "") {
  const values = response.headers.getSetCookie?.() ?? [];
  const next = values.map((value) => value.split(";", 1)[0]);
  return [existing, ...next].filter(Boolean).join("; ");
}

try {
  await waitForApp();
  const configResponse = await fetch(`${base}/api/auth/config`);
  const config = await configResponse.json();

  const githubResponse = await fetch(`${base}/api/auth/github`, { redirect: "manual" });
  const githubLocation = new URL(githubResponse.headers.get("location"));
  const verifierCookie = cookieHeader(githubResponse);
  const github = {
    status: githubResponse.status,
    provider: githubLocation.searchParams.get("provider"),
    challengeLength: githubLocation.searchParams.get("code_challenge")?.length,
    method: githubLocation.searchParams.get("code_challenge_method"),
    redirect: githubLocation.searchParams.get("redirect_to"),
    hasHttpOnlyVerifier: githubResponse.headers.getSetCookie().some((value) => value.startsWith("codedaddy-pkce-verifier=") && /HttpOnly/i.test(value)),
  };

  const callbackResponse = await fetch(`${base}/auth/callback?code=auth-code`, { headers: { Cookie: verifierCookie }, redirect: "manual" });
  const sessionCookies = cookieHeader(callbackResponse);
  const sessionResponse = await fetch(`${base}/api/auth/session`, { headers: { Cookie: sessionCookies } });
  const session = await sessionResponse.json();

  const emailResponse = await fetch(`${base}/api/auth/email`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "learner@example.com" }) });
  const email = await emailResponse.json();

  const profileGet = await fetch(`${base}/api/profile`, { headers: { Cookie: sessionCookies } });
  const profile = await profileGet.json();
  const profilePut = await fetch(`${base}/api/profile`, { method: "PUT", headers: { Cookie: sessionCookies, "Content-Type": "application/json" }, body: JSON.stringify({ displayName: "Learner Test" }) });

  const progressGet = await fetch(`${base}/api/progress`, { headers: { Cookie: sessionCookies } });
  const progress = await progressGet.json();
  const progressPut = await fetch(`${base}/api/progress`, { method: "PUT", headers: { Cookie: sessionCookies, "Content-Type": "application/json" }, body: JSON.stringify({ courses: {}, practice: { version: 1, drafts: {}, completions: [], submissionDrafts: {} } }) });

  const submissionPut = await fetch(`${base}/api/submissions`, { method: "PUT", headers: { Cookie: sessionCookies, "Content-Type": "application/json" }, body: JSON.stringify({ projectId: "capstone-service-directory", repositoryUrl: "https://github.com/learner/project", liveUrl: "https://project.example.com" }) });
  const submission = await submissionPut.json();
  const certificateGet = await fetch(`${base}/api/certificate`, { headers: { Cookie: sessionCookies } });
  const certificate = await certificateGet.json();
  const certificatePost = await fetch(`${base}/api/certificate`, { method: "POST", headers: { Cookie: sessionCookies } });

  readyFixture = true;
  const certificateReadyGet = await fetch(`${base}/api/certificate`, { headers: { Cookie: sessionCookies } });
  const certificateReady = await certificateReadyGet.json();
  const certificateIssue = await fetch(`${base}/api/certificate`, { method: "POST", headers: { Cookie: sessionCookies } });
  const issued = await certificateIssue.json();
  const publicRecordResponse = await fetch(`${base}/api/certificate/22222222-2222-4222-8222-222222222222`);
  const publicRecord = await publicRecordResponse.json();

  const tokenExchange = requests.find((item) => item.path === "/auth/v1/token" && item.search.includes("pkce"));
  const otp = requests.find((item) => item.path === "/auth/v1/otp");
  const rpc = requests.find((item) => item.path === "/rest/v1/rpc/sync_learning_state");
  // Both writable RPCs are server-only. If either ever goes back to the
  // publishable key, its `security definer` function has to be reachable by
  // `anon` again, and anyone holding that key can call it directly.
  const throttleRpc = requests.find((item) => item.path === "/rest/v1/rpc/claim_email_link");
  const secretInsert = requests.find((item) => item.path === "/rest/v1/certificates" && item.method === "POST");
  const result = { config, github, callbackStatus: callbackResponse.status, session, emailStatus: emailResponse.status, email, profileStatus: [profileGet.status, profilePut.status], profile, progressStatus: [progressGet.status, progressPut.status], progress, submissionStatus: submissionPut.status, submission, certificateGetStatus: certificateGet.status, certificate, certificatePostStatus: certificatePost.status, certificateReadyStatus: certificateReadyGet.status, certificateReady, certificateIssueStatus: certificateIssue.status, issued, publicRecordStatus: publicRecordResponse.status, publicRecord, tokenExchange, otp, rpc, secretInsert, requestCount: requests.length };
  if (!config.configured || !config.certificateIssuance || github.status !== 307 || github.provider !== "github" || github.challengeLength !== 43 || github.method !== "s256" || github.redirect !== `${base}/auth/callback` || !github.hasHttpOnlyVerifier || callbackResponse.status !== 307 || !session.user || session.user.email !== "learner@example.com" || emailResponse.status !== 200 || !email.sent || profileGet.status !== 200 || profilePut.status !== 200 || profile.displayName !== "Learner Test" || progressGet.status !== 200 || progressPut.status !== 200 || submissionPut.status !== 200 || submission.submission.project_id !== "capstone-service-directory" || certificateGet.status !== 200 || certificate.ready !== false || certificatePost.status !== 409 || certificateReadyGet.status !== 200 || certificateReady.ready !== true || certificateReady.completedCourses.length !== 10 || certificateReady.completedCapstones.length !== 5 || certificateIssue.status !== 200 || issued.certificate.code !== "22222222-2222-4222-8222-222222222222" || publicRecordResponse.status !== 200 || publicRecord.certificate.display_name !== "Learner Test" || secretInsert?.apikey !== "sb_secret_test" || secretInsert?.authorization || tokenExchange?.body?.auth_code !== "auth-code" || typeof tokenExchange?.body?.code_verifier !== "string" || otp?.body?.code_challenge?.length !== 43 || rpc?.authorization !== "Bearer access-test" || throttleRpc?.apikey !== "sb_secret_test") throw new Error(`Backend integration audit failed: ${JSON.stringify(result)}`);
  const reportPath = join(outputDir, "backend-integration-audit.json");
  await writeFile(reportPath, `${JSON.stringify(result, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify({ configured: config.configured, github, sessionUser: session.user.email, emailStatus: emailResponse.status, profileStatus: profilePut.status, progressStatus: progressPut.status, submissionStatus: submissionPut.status, certificateGateStatus: certificatePost.status, certificateReady: certificateReady.ready, certificateIssueStatus: certificateIssue.status, publicRecordStatus: publicRecordResponse.status, requestCount: requests.length, reportPath }, null, 2)}\n`);
} finally {
  app.kill();
  await new Promise((resolve) => setTimeout(resolve, 500));
  mock.close();
}
