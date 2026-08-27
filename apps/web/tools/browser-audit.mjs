import { spawn } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const baseUrl = process.env.CODEDADDY_URL ?? "http://localhost:3000";
const harnessPath = process.env.CODEDADDY_HARNESS_PATH ?? "/harness";
const chromePath = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outputDir = process.env.CODEDADDY_QA_OUTPUT ?? join(tmpdir(), "codedaddy-browser-audit");
const port = Number(process.env.CODEDADDY_CDP_PORT ?? 9333);
const profileDir = await mkdtemp(join(tmpdir(), "codedaddy-chrome-"));

await mkdir(outputDir, { recursive: true });

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
    "--disable-backgrounding-occluded-windows",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    "--no-first-run",
    "--no-default-browser-check",
    "about:blank",
  ],
  { stdio: "ignore" },
);

let socket;
let nextId = 0;
const pending = new Map();
const consoleErrors = [];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForJson(url, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return await response.json();
    } catch {}
    await delay(100);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function send(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function evaluate(expression, awaitPromise = true) {
  const response = await send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
  });
  if (response.exceptionDetails) {
    throw new Error(response.exceptionDetails.text ?? "Browser evaluation failed");
  }
  return response.result?.value;
}

async function navigate(path, width, height) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width <= 480,
  });
  await send("Page.navigate", { url: `${baseUrl}${path}` });
  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    const ready = await evaluate("document.readyState");
    if (ready === "complete") return;
    await delay(100);
  }
  throw new Error(`Timed out loading ${path}`);
}

async function screenshot(name) {
  const result = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  await writeFile(join(outputDir, name), Buffer.from(result.data, "base64"));
}

async function pageAudit(path, name, width, height) {
  await navigate(path, width, height);
  await screenshot(`${name}-${width}.png`);
  return evaluate(`(() => ({
    path: ${JSON.stringify(path)},
    width: ${width},
    title: document.title,
    h1: document.querySelector("h1")?.textContent?.trim() ?? null,
    bodyWidth: document.body.scrollWidth,
    viewportWidth: window.innerWidth,
    horizontalOverflow: document.body.scrollWidth > window.innerWidth,
    buttons: [...document.querySelectorAll("button")].map((node) => ({
      text: node.textContent?.trim() ?? "",
      disabled: node.disabled,
      label: node.getAttribute("aria-label"),
    })),
    links: [...document.querySelectorAll("a")].map((node) => ({
      text: node.textContent?.trim() ?? "",
      href: node.getAttribute("href"),
    })),
  }))()`);
}

try {
  const targets = await waitForJson(`http://127.0.0.1:${port}/json/list`);
  const pageTarget = targets.find((target) => target.type === "page");
  if (!pageTarget) throw new Error("Chrome exposed no page target.");
  socket = new WebSocket(pageTarget.webSocketDebuggerUrl);
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
      if (message.error) waiter.reject(new Error(message.error.message));
      else waiter.resolve(message.result);
      return;
    }
    if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
      consoleErrors.push(message.params.args.map((arg) => arg.value ?? arg.description).join(" "));
    }
    if (message.method === "Runtime.exceptionThrown") {
      consoleErrors.push(message.params.exceptionDetails?.text ?? "Uncaught browser exception");
    }
  });

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Log.enable");

  await navigate(harnessPath, 1440, 1000);
  await evaluate(`document.querySelector("button")?.click()`);

  const startedAt = Date.now();
  const timeoutMs = Number(process.env.CODEDADDY_HARNESS_TIMEOUT_MS ?? 900_000);
  let lastProgress = 0;
  while (Date.now() - startedAt < timeoutMs) {
    const state = await evaluate(`(() => ({
      running: document.querySelector("button")?.disabled ?? false,
      count: window.__harness?.length ?? 0,
      progress: document.querySelector("main > p.font-mono")?.textContent ?? "",
    }))()`);
    if (state.count >= lastProgress + 100) {
      lastProgress = state.count;
      process.stdout.write(`Harness progress: ${state.count} steps\n`);
    }
    if (!state.running && state.count > 0) break;
    await delay(250);
  }

  const reports = await evaluate("window.__harness ?? []");
  const stillRunning = await evaluate("document.querySelector('button')?.disabled ?? false");
  if (stillRunning || reports.length === 0) {
    throw new Error(`Harness did not finish. Reports captured: ${reports.length}`);
  }

  const summary = reports.reduce(
    (result, report) => {
      const course = (result.courses[report.courseId] ??= { steps: 0, errors: 0, warnings: 0 });
      course.steps++;
      for (const finding of report.findings) {
        result[finding.severity === "error" ? "errors" : "warnings"]++;
        course[finding.severity === "error" ? "errors" : "warnings"]++;
        result.rules[finding.rule] = (result.rules[finding.rule] ?? 0) + 1;
      }
      return result;
    },
    { steps: reports.length, errors: 0, warnings: 0, courses: {}, rules: {} },
  );

  await screenshot("harness-1440.png");
  const pageChecks = [];
  for (const [path, name] of [
    ["/", "home"],
    ["/curriculum", "curriculum"],
    ["/learn/html-basics", "html-workspace"],
    ["/learn/css-basics", "css-gate"],
  ]) {
    pageChecks.push(await pageAudit(path, name, 1440, 1000));
    pageChecks.push(await pageAudit(path, name, 375, 812));
  }

  // This browser profile is disposable. Seed only the prerequisite course so
  // the real React workspace can be inspected without changing product gates.
  await navigate("/curriculum", 1440, 1000);
  await evaluate(`localStorage.setItem("aca.progress.v2.js-basics", JSON.stringify({
    stepIdx: 654,
    completedSteps: ["store-counter-5"],
    files: { "script.js": "" },
    activeFile: "script.js"
  }))`);
  pageChecks.push(await pageAudit("/learn/react-basics", "react-workspace", 1440, 1000));
  pageChecks.push(await pageAudit("/learn/react-basics", "react-workspace", 375, 812));
  await evaluate(`localStorage.removeItem("aca.progress.v2.js-basics")`);

  const result = {
    summary,
    errors: reports.filter((report) => report.findings.some((finding) => finding.severity === "error")),
    warnings: reports.filter((report) => report.findings.some((finding) => finding.severity === "warning")),
    consoleErrors,
    pageChecks,
    outputDir,
    durationMs: Date.now() - startedAt,
  };
  const reportPath = join(outputDir, "audit.json");
  await writeFile(reportPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  process.stdout.write(`${JSON.stringify({ summary, consoleErrors, pageChecks, reportPath, durationMs: result.durationMs }, null, 2)}\n`);
} finally {
  if (socket?.readyState === WebSocket.OPEN) socket.close();
  chrome.kill();
  await Promise.race([
    new Promise((resolve) => chrome.once("exit", resolve)),
    delay(2_000),
  ]);
  await rm(profileDir, { recursive: true, force: true }).catch(() => {});
}
