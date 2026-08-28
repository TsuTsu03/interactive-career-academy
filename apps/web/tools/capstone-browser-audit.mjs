import { spawn } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { capstones } from "../content/capstones.ts";

const baseUrl = process.env.CODEDADDY_URL ?? "http://localhost:3000";
const chromePath = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outputDir = process.env.CODEDADDY_QA_OUTPUT ?? join(tmpdir(), "codedaddy-capstone-audit");
const port = Number(process.env.CODEDADDY_CDP_PORT ?? 9337);
const profileDir = await mkdtemp(join(tmpdir(), "codedaddy-capstone-chrome-"));
await mkdir(outputDir, { recursive: true });

const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--disable-background-timer-throttling",
  "--disable-renderer-backgrounding",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profileDir}`,
  "--no-first-run",
  "--no-default-browser-check",
  "about:blank",
], { stdio: "ignore" });

let socket;
let nextId = 0;
const pending = new Map();
const consoleErrors = [];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForJson(url, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {}
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
    await delay(100);
  }
  throw new Error(`Timed out waiting for ${check}`);
}

async function navigate(path, width = 375, height = 812) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width <= 480 });
  await send("Page.navigate", { url: `${baseUrl}${path}` });
  await waitFor('document.readyState === "complete"');
  await evaluate(`document.querySelector('button[aria-label="Close donation message"]')?.click()`);
  await delay(100);
}

async function screenshot(name) {
  const result = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(join(outputDir, name), Buffer.from(result.data, "base64"));
}

async function setFile(name, value) {
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.trim() === ${JSON.stringify(name)}))?.click()`);
  await waitFor(`document.querySelector('textarea[aria-label^="Practice code editor"]')?.getAttribute("aria-label")?.includes(${JSON.stringify(name)})`);
  await evaluate(`(() => {
    const textarea = document.querySelector('textarea[aria-label^="Practice code editor"]');
    const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set;
    setter.call(textarea, ${JSON.stringify(value)});
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  })()`);
  await delay(100);
}

async function setSolution(activity) {
  for (const [name, value] of Object.entries(activity.solution)) await setFile(name, value);
}

async function runChecks() {
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Run checks")))?.click()`);
}

try {
  const targets = await waitForJson(`http://127.0.0.1:${port}/json/list`);
  const page = targets.find((target) => target.type === "page");
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
    if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
      consoleErrors.push(message.params.args.map((arg) => arg.value ?? arg.description).join(" "));
    }
    if (message.method === "Runtime.exceptionThrown") {
      consoleErrors.push(message.params.exceptionDetails?.exception?.description ?? message.params.exceptionDetails?.text ?? "Uncaught browser exception");
    }
  });
  await send("Page.enable");
  await send("Runtime.enable");

  await navigate("/capstones");
  const initialList = await evaluate(`(() => ({
    cards: document.querySelectorAll("main article").length,
    ready: [...document.querySelectorAll("main article")].filter((node) => node.textContent?.includes("acceptance checks")).length,
    locked: [...document.querySelectorAll("main article")].filter((node) => node.textContent?.includes("Finish capstones 1–4 first")).length,
    overflow: document.body.scrollWidth > innerWidth,
  }))()`);
  await screenshot("capstones-list-375.png");

  await navigate("/capstones/capstone-portfolio");
  const portfolioInitiallyLocked = await evaluate(`document.body.textContent?.includes("Final capstone locked") && !document.querySelector('textarea[aria-label^="Practice code editor"]')`);
  await screenshot("portfolio-locked-375.png");

  const first = capstones[0];
  await navigate(`/capstones/${first.id}`, 1440, 1000);
  await runChecks();
  await waitFor(`Boolean(document.querySelector('[data-check-status="failed"]'))`);
  const firstStartsFailing = await evaluate(`Boolean(document.querySelector('[data-check-status="failed"]'))`);
  await setSolution(first);
  await runChecks();
  await waitFor(`document.querySelectorAll('[data-check-status="passed"]').length === ${first.tests.length}`, 30_000);
  await waitFor(`document.body.textContent?.includes("Activity complete. Evidence saved.")`);
  const firstCompleted = await evaluate(`JSON.parse(localStorage.getItem("aca.practice.v1"))?.completions?.some((item) => item.activityId === ${JSON.stringify(first.id)} && item.passedTestIds.length === ${first.tests.length})`);
  const desktop = await evaluate(`(() => ({
    overflow: document.body.scrollWidth > innerWidth,
    editorIsTextarea: document.querySelector('textarea[aria-label^="Practice code editor"]')?.tagName === "TEXTAREA",
    sandboxes: [...document.querySelectorAll("iframe")].map((frame) => frame.getAttribute("sandbox")),
  }))()`);
  await screenshot("service-directory-complete-1440.png");

  const prerequisites = capstones.slice(0, 4).map((activity) => ({
    activityId: activity.id,
    passedTestIds: activity.tests.map((test) => test.id),
    completedAt: "2026-08-29T00:00:00.000Z",
  }));
  await evaluate(`(() => {
    const state = JSON.parse(localStorage.getItem("aca.practice.v1"));
    state.completions = ${JSON.stringify(prerequisites)};
    localStorage.setItem("aca.practice.v1", JSON.stringify(state));
  })()`);

  await navigate("/capstones");
  const unlockedList = await evaluate(`(() => ({
    complete: [...document.querySelectorAll("main article")].filter((node) => node.textContent?.includes("Complete")).length,
    portfolioReady: [...document.querySelectorAll("main article")].some((node) => node.textContent?.includes("Your Front-End Portfolio") && node.textContent?.includes("15 acceptance checks")),
    overflow: document.body.scrollWidth > innerWidth,
  }))()`);
  await screenshot("capstones-unlocked-375.png");

  const portfolio = capstones[4];
  await navigate(`/capstones/${portfolio.id}`);
  await runChecks();
  await waitFor(`Boolean(document.querySelector('[data-check-status="failed"]'))`);
  const portfolioStartsFailing = await evaluate(`Boolean(document.querySelector('[data-check-status="failed"]'))`);
  await setSolution(portfolio);
  await runChecks();
  await waitFor(`document.querySelectorAll('[data-check-status="passed"]').length === ${portfolio.tests.length}`, 30_000);
  await waitFor(`document.body.textContent?.includes("Activity complete. Evidence saved.")`);
  const portfolioCompleted = await evaluate(`JSON.parse(localStorage.getItem("aca.practice.v1"))?.completions?.some((item) => item.activityId === ${JSON.stringify(portfolio.id)} && item.passedTestIds.length === ${portfolio.tests.length})`);
  const mobile = await evaluate(`(() => ({
    overflow: document.body.scrollWidth > innerWidth,
    statusHasIconAndWord: Boolean(document.querySelector('[role="status"] svg')) && document.querySelector('[role="status"]')?.textContent?.includes("Activity complete"),
    sandboxCombination: [...document.querySelectorAll("iframe")].some((frame) => {
      const value = frame.getAttribute("sandbox") ?? "";
      return value.includes("allow-scripts") && value.includes("allow-same-origin");
    }),
  }))()`);
  await screenshot("portfolio-complete-375.png");

  await navigate("/evidence");
  await waitFor(`Boolean(document.querySelector('[data-evidence-stat="capstones"]'))`);
  const evidence = await evaluate(`(() => ({
    capstones: Number(document.querySelector('[data-evidence-stat="capstones"] p')?.textContent),
    hasFirst: document.body.textContent?.includes("Barangay Service Directory"),
    hasPortfolio: document.body.textContent?.includes("Your Front-End Portfolio"),
    honestLimit: document.body.textContent?.includes("can be changed by someone with access to the device"),
    overflow: document.body.scrollWidth > innerWidth,
  }))()`);
  await screenshot("capstone-evidence-375.png");

  const result = { initialList, portfolioInitiallyLocked, firstStartsFailing, firstCompleted, desktop, unlockedList, portfolioStartsFailing, portfolioCompleted, mobile, evidence, consoleErrors, outputDir };
  if (
    initialList.cards !== 5 || initialList.ready !== 4 || initialList.locked !== 1 || initialList.overflow ||
    !portfolioInitiallyLocked || !firstStartsFailing || !firstCompleted || desktop.overflow || !desktop.editorIsTextarea ||
    desktop.sandboxes.some((value) => value?.includes("allow-scripts") && value?.includes("allow-same-origin")) ||
    unlockedList.complete !== 4 || !unlockedList.portfolioReady || unlockedList.overflow ||
    !portfolioStartsFailing || !portfolioCompleted || mobile.overflow || !mobile.statusHasIconAndWord || mobile.sandboxCombination ||
    evidence.capstones !== 5 || !evidence.hasFirst || !evidence.hasPortfolio || !evidence.honestLimit || evidence.overflow ||
    consoleErrors.length > 0
  ) throw new Error(`Capstone audit failed: ${JSON.stringify(result)}`);
  const reportPath = join(outputDir, "capstone-audit.json");
  await writeFile(reportPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  process.stdout.write(`${JSON.stringify({ ...result, reportPath }, null, 2)}\n`);
} finally {
  if (socket?.readyState === WebSocket.OPEN) socket.close();
  chrome.kill();
  await Promise.race([new Promise((resolve) => chrome.once("exit", resolve)), delay(2_000)]);
  await rm(profileDir, { recursive: true, force: true }).catch(() => {});
}
