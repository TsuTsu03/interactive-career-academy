import { spawn } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { capstones } from "../content/capstones.ts";

const baseUrl = process.env.CODEDADDY_URL ?? "http://localhost:3000";
const chromePath = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outputDir = process.env.CODEDADDY_QA_OUTPUT ?? join(tmpdir(), "codedaddy-backend-audit");
const port = Number(process.env.CODEDADDY_CDP_PORT ?? 9345);

// This audit asserts the honest disconnected state, so it only means anything
// against a server with no Supabase credentials. Check that before launching
// Chrome, otherwise the run dies on a timeout for text that can never appear.
const authConfig = await fetch(`${baseUrl}/api/auth/config`).then((response) => response.json()).catch(() => null);
if (authConfig?.configured) {
  console.error("The app under test is connected to Supabase. This audit checks the disconnected account, certificate, and submission states, so run it against a server started without SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY - for example with apps/web/.env.local temporarily renamed.");
  process.exit(1);
}
const profileDir = await mkdtemp(join(tmpdir(), "codedaddy-backend-chrome-"));
await mkdir(outputDir, { recursive: true });
const chrome = spawn(chromePath, ["--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`, `--user-data-dir=${profileDir}`, "--no-first-run", "about:blank"], { stdio: "ignore" });
let socket;
let nextId = 0;
const pending = new Map();
const consoleErrors = [];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function waitForJson(url) { for (let count = 0; count < 150; count += 1) { try { const response = await fetch(url); if (response.ok) return response.json(); } catch {} await delay(100); } throw new Error("Chrome did not start."); }
function send(method, params = {}) { const id = ++nextId; socket.send(JSON.stringify({ id, method, params })); return new Promise((resolve, reject) => pending.set(id, { resolve, reject, method })); }
async function evaluate(expression) { const response = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }); if (response.exceptionDetails) throw new Error(response.exceptionDetails.text); return response.result?.value; }
async function waitFor(check) { for (let count = 0; count < 200; count += 1) { if (await evaluate(check)) return; await delay(100); } throw new Error(`Timed out: ${check}`); }
async function navigate(path, width = 375, height = 812) { await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width <= 480 }); await send("Page.navigate", { url: `${baseUrl}${path}` }); await waitFor('document.readyState === "complete"'); await evaluate(`document.querySelector('button[aria-label="Close donation message"]')?.click()`); await delay(100); }
async function screenshot(name) { const result = await send("Page.captureScreenshot", { format: "png" }); await writeFile(join(outputDir, name), Buffer.from(result.data, "base64")); }

try {
  const targets = await waitForJson(`http://127.0.0.1:${port}/json/list`);
  const page = targets.find((target) => target.type === "page");
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const waiter = pending.get(message.id);
      if (!waiter) return;
      pending.delete(message.id);
      if (message.error) waiter.reject(new Error(message.error.message));
      else waiter.resolve(message.result);
    } else if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
      consoleErrors.push(message.params.args.map((arg) => arg.value ?? arg.description).join(" "));
    } else if (message.method === "Runtime.exceptionThrown") {
      consoleErrors.push(message.params.exceptionDetails?.text ?? "Browser exception");
    }
  });
  await send("Page.enable"); await send("Runtime.enable");

  await navigate("/account");
  await waitFor(`document.body.textContent?.includes("Supabase setup pending")`);
  const account = await evaluate(`({ pending: document.body.textContent?.includes("Supabase setup pending"), githubDisabled: ![...document.querySelectorAll("a")].find((node) => node.textContent?.includes("Continue with GitHub"))?.getAttribute("href"), emailDisabled: document.querySelector("#account-email")?.disabled, overflow: document.body.scrollWidth > innerWidth })`);
  await screenshot("account-provider-pending-375.png");

  await navigate("/certificate");
  await waitFor(`document.body.textContent?.includes("Account connection required")`);
  const certificate = await evaluate(`({ truthful: document.body.textContent?.includes("Certificate of Completion only") && document.body.textContent?.includes("Account connection required"), overflow: document.body.scrollWidth > innerWidth })`);
  await screenshot("certificate-disconnected-375.png");

  const first = capstones[0];
  await navigate(`/capstones/${first.id}/submit`);
  await waitFor(`document.body.textContent?.includes("Submission locked")`);
  const locked = await evaluate(`!document.querySelector("#capstone-repository")`);
  const completion = { activityId: first.id, passedTestIds: first.tests.map((test) => test.id), completedAt: "2026-08-29T00:00:00.000Z" };
  await evaluate(`localStorage.setItem("aca.practice.v1", ${JSON.stringify(JSON.stringify({ version: 1, drafts: {}, completions: [completion], submissionDrafts: {} }))})`);
  await navigate(`/capstones/${first.id}/submit`);
  await waitFor(`Boolean(document.querySelector("#capstone-repository"))`);
  await evaluate(`(() => { const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set; const repository = document.querySelector("#capstone-repository"); set.call(repository, "https://github.com/learner/service-directory"); repository.dispatchEvent(new Event("input", { bubbles: true })); const live = document.querySelector("#capstone-live"); set.call(live, "https://service-directory.example.com"); live.dispatchEvent(new Event("input", { bubbles: true })); document.querySelector("form").requestSubmit(); })()`);
  await waitFor(`document.body.textContent?.includes("Draft saved in this browser")`);
  const localDraft = await evaluate(`(() => { const state = JSON.parse(localStorage.getItem("aca.practice.v1")); return { repository: state.submissionDrafts?.[${JSON.stringify(first.id)}]?.repositoryUrl, live: state.submissionDrafts?.[${JSON.stringify(first.id)}]?.liveUrl, completionStillPresent: state.completions?.some((item) => item.activityId === ${JSON.stringify(first.id)}), overflow: document.body.scrollWidth > innerWidth }; })()`);
  await screenshot("capstone-local-submission-375.png");

  await navigate("/certificate/00000000-0000-4000-8000-000000000000", 1440, 900);
  await waitFor(`document.body.textContent?.includes("Certificate record unavailable")`);
  const publicMissing = await evaluate(`document.body.textContent?.includes("The code was not found") && document.body.scrollWidth <= innerWidth`);
  const api = await evaluate(`Promise.all(["/api/auth/config", "/api/progress", "/api/submissions", "/api/certificate"].map(async (path) => { const response = await fetch(path); return [path, response.status]; }))`);
  const result = { account, certificate, locked, localDraft, publicMissing, api, consoleErrors, outputDir };
  if (!account.pending || !account.githubDisabled || !account.emailDisabled || account.overflow || !certificate.truthful || certificate.overflow || !locked || localDraft.repository !== "https://github.com/learner/service-directory" || localDraft.live !== "https://service-directory.example.com" || !localDraft.completionStillPresent || localDraft.overflow || !publicMissing || JSON.stringify(api) !== JSON.stringify([["/api/auth/config", 200], ["/api/progress", 401], ["/api/submissions", 401], ["/api/certificate", 401]]) || consoleErrors.length) throw new Error(`Backend browser audit failed: ${JSON.stringify(result)}`);
  const reportPath = join(outputDir, "backend-audit.json"); await writeFile(reportPath, `${JSON.stringify(result, null, 2)}\n`); process.stdout.write(`${JSON.stringify({ ...result, reportPath }, null, 2)}\n`);
} finally { if (socket?.readyState === WebSocket.OPEN) socket.close(); chrome.kill(); await Promise.race([new Promise((resolve) => chrome.once("exit", resolve)), delay(2000)]); await rm(profileDir, { recursive: true, force: true }).catch(() => {}); }
