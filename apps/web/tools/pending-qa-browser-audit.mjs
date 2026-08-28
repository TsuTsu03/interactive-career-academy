import { spawn } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { htmlCourse } from "../content/html-course.ts";
import { designFoundationsCourse } from "../content/design-foundations-course.ts";
import { cssCourse } from "../content/css-course.ts";
import { jsCourse } from "../content/js-course.ts";
import { domCourse } from "../content/dom-course.ts";
import { realAppsCourse } from "../content/real-apps-course.ts";
import { tailwindCourse } from "../content/tailwind-course.ts";

const courses = [htmlCourse, designFoundationsCourse, cssCourse, jsCourse, domCourse, realAppsCourse, tailwindCourse];
const targetRanges = new Map([
  [htmlCourse.id, [19, 27]],
  [cssCourse.id, [14, 18]],
  [jsCourse.id, [14, 84]],
  [tailwindCourse.id, [8, 9]],
]);
const targets = courses.flatMap((course) => {
  const range = targetRanges.get(course.id);
  if (!range) return [];
  return course.projects.slice(range[0] - 1, range[1]).map((project) => {
    const matches = course.steps.filter((step) => step.projectId === project.id);
    return { course, project, step: matches.at(-1) };
  });
});

const baseUrl = process.env.CODEDADDY_URL ?? "http://localhost:3000";
const chromePath = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outputDir = process.env.CODEDADDY_QA_OUTPUT ?? join(tmpdir(), "codedaddy-pending-qa-audit");
const port = Number(process.env.CODEDADDY_CDP_PORT ?? 9341);
const profileDir = await mkdtemp(join(tmpdir(), "codedaddy-pending-qa-chrome-"));
await mkdir(outputDir, { recursive: true });

const chrome = spawn(chromePath, [
  "--headless=new", "--disable-gpu", "--disable-background-timer-throttling", "--disable-renderer-backgrounding",
  `--remote-debugging-port=${port}`, `--user-data-dir=${profileDir}`, "--no-first-run", "--no-default-browser-check", "about:blank",
], { stdio: "ignore" });

let socket;
let nextId = 0;
const pending = new Map();
const consoleErrors = [];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForJson(url, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try { const response = await fetch(url); if (response.ok) return response.json(); } catch {}
    await delay(100);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function send(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject, method }));
}

async function evaluate(expression) {
  const response = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text ?? "Browser evaluation failed");
  return response.result?.value;
}

async function waitFor(check, timeoutMs = 20_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await evaluate(check)) return;
    await delay(80);
  }
  throw new Error(`Timed out waiting for ${check}`);
}

async function setViewport(width, height) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width <= 480 });
  await delay(100);
}

async function navigate(path) {
  await send("Page.navigate", { url: `${baseUrl}${path}` });
  await waitFor('document.readyState === "complete"');
  await evaluate(`document.querySelector('button[aria-label="Close donation message"]')?.click()`);
  await waitFor(`Boolean(document.querySelector('textarea[aria-label^="Code editor,"]'))`);
}

function sessionFor(course, step, files = step.solution) {
  const stepIndex = course.steps.findIndex((candidate) => candidate.id === step.id);
  return {
    stepIdx: stepIndex,
    files,
    activeFile: step.activeFile,
    completedSteps: course.steps.slice(0, stepIndex).map((item) => item.id),
  };
}

async function installPrerequisites(course) {
  const before = courses.slice(0, courses.findIndex((candidate) => candidate.id === course.id));
  await evaluate(`(() => {
    const sessions = ${JSON.stringify(Object.fromEntries(before.map((item) => {
      const last = item.steps.at(-1);
      return [`aca.progress.v2.${item.id}`, { stepIdx: item.steps.length - 1, files: last.solution, activeFile: last.activeFile, completedSteps: item.steps.map((step) => step.id) }];
    })))};
    for (const [key, value] of Object.entries(sessions)) localStorage.setItem(key, JSON.stringify(value));
  })()`);
}

async function installTarget(course, step, files = step.solution) {
  await evaluate(`localStorage.setItem(${JSON.stringify(`aca.progress.v2.${course.id}`)}, ${JSON.stringify(JSON.stringify(sessionFor(course, step, files)))})`);
}

async function screenshot(name) {
  const result = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(join(outputDir, name), Buffer.from(result.data, "base64"));
}

try {
  if (targets.some((target) => !target.step)) throw new Error("A queued project has no final step.");
  const browserTargets = await waitForJson(`http://127.0.0.1:${port}/json/list`);
  const page = browserTargets.find((target) => target.type === "page");
  if (!page) throw new Error("Chrome exposed no page target.");
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const waiter = pending.get(message.id);
      if (!waiter) return;
      pending.delete(message.id);
      if (message.error) waiter.reject(new Error(`${waiter.method}: ${message.error.message}`));
      else waiter.resolve(message.result);
      return;
    }
    if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") consoleErrors.push(message.params.args.map((arg) => arg.value ?? arg.description).join(" "));
    if (message.method === "Runtime.exceptionThrown") consoleErrors.push(message.params.exceptionDetails?.exception?.description ?? message.params.exceptionDetails?.text ?? "Uncaught browser exception");
  });
  await send("Page.enable");
  await send("Runtime.enable");
  await setViewport(375, 812);
  await send("Page.navigate", { url: `${baseUrl}/` });
  await waitFor('document.readyState === "complete"');

  const results = [];
  let previousCourse = "";
  for (const { course, project, step } of targets) {
    if (course.id !== previousCourse) {
      await installPrerequisites(course);
      previousCourse = course.id;
    }
    await installTarget(course, step);
    await navigate(`/learn/${course.id}`);
    await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Run Code")))?.click()`);
    await waitFor(`document.body.textContent?.includes("STEP CLEAR")`, 30_000);
    await delay(450);
    await evaluate(`([...document.querySelectorAll('nav[aria-label="Phone workspace views"] button')].find((node) => node.textContent?.includes("Preview")))?.click()`);
    await waitFor(`document.querySelector('#workspace-output iframe')?.getBoundingClientRect().height > 300`);
    const mobile = await evaluate(`(() => { const frame = document.querySelector('#workspace-output iframe'); const rect = frame?.getBoundingClientRect(); return { overflow: document.body.scrollWidth > innerWidth, textarea: document.querySelector('textarea[aria-label^="Code editor,"]')?.tagName === "TEXTAREA", previewWidth: rect?.width ?? 0, previewHeight: rect?.height ?? 0 }; })()`);
    await setViewport(1440, 1000);
    const desktop = await evaluate(`(() => { const frame = document.querySelector('#workspace-output iframe'); const rect = frame?.getBoundingClientRect(); return { overflow: document.body.scrollWidth > innerWidth, workspace: Boolean(document.querySelector('textarea[aria-label^="Code editor,"]')), previewWidth: rect?.width ?? 0, previewHeight: rect?.height ?? 0 }; })()`);
    const projectNumber = course.projects.findIndex((candidate) => candidate.id === project.id) + 1;
    const [firstProject, lastProject] = targetRanges.get(course.id);
    if (projectNumber === firstProject || projectNumber === lastProject) await screenshot(`${course.id}-${project.id}-desktop.png`);
    await setViewport(375, 812);
    results.push({ courseId: course.id, projectId: project.id, stepId: step.id, passed: true, mobile, desktop });
  }

  const tapIds = ["alert-dialog", "service-search", "meal-group", "market-caption", "resident-title", "document-title"];
  const tapResults = [];
  for (const id of tapIds) {
    const step = htmlCourse.steps.find((candidate) => candidate.id === id);
    if (!step?.correctBlock) throw new Error(`Missing tap-to-build step ${id}.`);
    await installTarget(htmlCourse, step, step.files);
    await navigate(`/learn/${htmlCourse.id}`);
    const before = await evaluate(`document.querySelector('textarea[aria-label^="Code editor,"]')?.value`);
    await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.includes(${JSON.stringify(step.correctBlock)})))?.click()`);
    await waitFor(`document.querySelector('textarea[aria-label^="Code editor,"]')?.value !== ${JSON.stringify(before)}`);
    const after = await evaluate(`document.querySelector('textarea[aria-label^="Code editor,"]')?.value`);
    await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Run Code")))?.click()`);
    await waitFor(`document.body.textContent?.includes("STEP CLEAR")`, 30_000);
    const preserved = before.split("\n").filter((line) => line.trim()).every((line) => after.includes(line));
    tapResults.push({ stepId: id, inserted: after.includes(step.correctBlock), preserved });
  }

  const result = { queuedProjects: results.length, results, tapResults, consoleErrors, outputDir };
  if (
    results.length !== 87 || results.some((item) => !item.passed || item.mobile.overflow || !item.mobile.textarea || item.mobile.previewWidth < 300 || item.mobile.previewHeight < 300 || item.desktop.overflow || !item.desktop.workspace || item.desktop.previewWidth < 300 || item.desktop.previewHeight < 300) ||
    tapResults.length !== 6 || tapResults.some((item) => !item.inserted || !item.preserved) || consoleErrors.length > 0
  ) throw new Error(`Pending QA audit failed: ${JSON.stringify(result)}`);
  const reportPath = join(outputDir, "pending-qa-audit.json");
  await writeFile(reportPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  process.stdout.write(`${JSON.stringify({ queuedProjects: results.length, tapResults, consoleErrors, reportPath }, null, 2)}\n`);
} finally {
  if (socket?.readyState === WebSocket.OPEN) socket.close();
  chrome.kill();
  await Promise.race([new Promise((resolve) => chrome.once("exit", resolve)), delay(2_000)]);
  await rm(profileDir, { recursive: true, force: true }).catch(() => {});
}
