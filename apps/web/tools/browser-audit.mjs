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

async function waitForSelector(selector, timeoutMs = 5_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await evaluate(`Boolean(document.querySelector(${JSON.stringify(selector)}))`)) return;
    await delay(50);
  }
  throw new Error(`Timed out waiting for ${selector}`);
}

async function pressKey(key, code, modifiers = 0) {
  await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key, code, modifiers });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key, code, modifiers });
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
  await evaluate(`document.querySelector('button[aria-label="Close donation message"]')?.click()`);
  await delay(50);
  await screenshot(`${name}-${width}.png`);
  return evaluate(`(() => ({
    path: ${JSON.stringify(path)},
    width: ${width},
    title: document.title,
    h1: document.querySelector("h1")?.textContent?.trim() ?? null,
    bodyWidth: document.body.scrollWidth,
    viewportWidth: window.innerWidth,
    horizontalOverflow: document.body.scrollWidth > window.innerWidth,
    workspaceVisible: Boolean(document.querySelector("#workspace-instructions")),
    productStoryVisible: Boolean(document.querySelector("#why-codedaddy")),
    productStoryCards: document.querySelectorAll("#why-codedaddy article").length,
    gateVisible: [...document.querySelectorAll("a")].some((node) => node.textContent?.includes("VIEW COURSE MAP")),
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

async function donationModalAudit() {
  await navigate("/", 1440, 1000);
  await waitForSelector('[role="dialog"]');
  await delay(50);
  await screenshot("donation-modal-1440.png");

  const desktop = await evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const rect = dialog?.getBoundingClientRect();
    const close = document.querySelector('button[aria-label="Close donation message"]');
    return {
      title: dialog?.querySelector("h2")?.textContent?.trim() ?? null,
      closeFocused: document.activeElement === close,
      bodyScrollLocked: document.body.style.overflow === "hidden",
      withinViewport: Boolean(rect && rect.left >= 0 && rect.right <= innerWidth && rect.top >= 0 && rect.bottom <= innerHeight),
      donationHref: dialog?.querySelector('a[href]')?.getAttribute("href") ?? null,
      qrLoaded: Boolean(dialog?.querySelector('img[alt="GCash QR code for CodeDaddy donations"]')?.naturalWidth),
      pendingVisible: dialog?.textContent?.includes("QR pending.") ?? false,
      horizontalOverflow: document.body.scrollWidth > innerWidth,
    };
  })()`);

  await pressKey("Tab", "Tab", 8);
  const shiftTabWrapped = await evaluate(`document.querySelector('[role="dialog"]')?.contains(document.activeElement) ?? false`);
  await pressKey("Tab", "Tab");
  const tabReturnedToClose = await evaluate(`document.activeElement === document.querySelector('button[aria-label="Close donation message"]')`);
  await pressKey("Escape", "Escape");
  await delay(50);
  const escape = await evaluate(`({
    dismissed: !document.querySelector('[role="dialog"]'),
    bodyScrollRestored: document.body.style.overflow !== "hidden",
  })`);

  await evaluate(`localStorage.setItem("codedaddy.theme", "light")`);
  await navigate("/", 375, 812);
  await waitForSelector('[role="dialog"]');
  await delay(50);
  await screenshot("donation-modal-375.png");
  const mobile = await evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const rect = dialog?.getBoundingClientRect();
    return {
      theme: document.documentElement.dataset.theme ?? null,
      withinViewport: Boolean(rect && rect.left >= 0 && rect.right <= innerWidth),
      horizontalOverflow: document.body.scrollWidth > innerWidth,
    };
  })()`);
  await evaluate(`document.querySelector('button[aria-label="Close donation message"]')?.click()`);
  await evaluate(`localStorage.removeItem("codedaddy.theme")`);

  await navigate("/harness", 1440, 1000);
  await delay(100);
  const hiddenOnHarness = await evaluate(`!document.querySelector('button[aria-label="Close donation message"]')`);

  const result = {
    desktop,
    keyboard: { shiftTabWrapped, tabReturnedToClose, ...escape },
    mobile,
    hiddenOnHarness,
  };
  const failures = [
    desktop.title !== "Support CodeDaddy with GCash",
    !desktop.closeFocused,
    !desktop.bodyScrollLocked,
    !desktop.withinViewport,
    desktop.horizontalOverflow,
    !shiftTabWrapped,
    !tabReturnedToClose,
    !escape.dismissed,
    !escape.bodyScrollRestored,
    !mobile.withinViewport,
    mobile.theme !== "light",
    mobile.horizontalOverflow,
    !hiddenOnHarness,
  ];
  if (failures.some(Boolean)) {
    throw new Error(`Donation modal audit failed: ${JSON.stringify(result)}`);
  }
  return result;
}

async function landingStoryAudit() {
  const checks = [];
  for (const [width, height] of [
    [1440, 1000],
    [375, 812],
  ]) {
    await navigate("/", width, height);
    await evaluate(`document.querySelector('button[aria-label="Close donation message"]')?.click()`);
    await evaluate(`document.querySelector("#why-codedaddy")?.scrollIntoView()`);
    await delay(50);
    await screenshot(`landing-story-${width}.png`);
    checks.push(
      await evaluate(`(() => {
        const section = document.querySelector("#why-codedaddy");
        return {
          width: ${width},
          heading: section?.querySelector("h2")?.textContent?.trim() ?? null,
          cards: section?.querySelectorAll("article").length ?? 0,
          horizontalOverflow: document.body.scrollWidth > innerWidth,
        };
      })()`),
    );
  }
  if (
    checks.some(
      (check) =>
        check.heading !== "A clear path from explanation to working code" ||
        check.cards !== 4 ||
        check.horizontalOverflow,
    )
  ) {
    throw new Error(`Landing story audit failed: ${JSON.stringify(checks)}`);
  }
  return checks;
}

let lastReportedProgress = 0;

async function runHarnessPage(path, completedCount) {
  await navigate(path, 1440, 1000);
  await evaluate(`document.querySelector("button")?.click()`);

  const startedAt = Date.now();
  const timeoutMs = Number(process.env.CODEDADDY_HARNESS_TIMEOUT_MS ?? 900_000);
  while (Date.now() - startedAt < timeoutMs) {
    const state = await evaluate(`(() => ({
      running: document.querySelector("button")?.disabled ?? false,
      count: window.__harness?.length ?? 0,
    }))()`);
    const totalProgress = completedCount + state.count;
    if (totalProgress >= lastReportedProgress + 100) {
      lastReportedProgress = totalProgress;
      process.stdout.write(`Harness progress: ${totalProgress} steps\n`);
    }
    if (!state.running && state.count > 0) break;
    await delay(250);
  }

  const reports = await evaluate("window.__harness ?? []");
  const stillRunning = await evaluate("document.querySelector('button')?.disabled ?? false");
  if (stillRunning || reports.length === 0) {
    throw new Error(`Harness did not finish ${path}. Reports captured: ${reports.length}`);
  }
  return reports;
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

  const startedAt = Date.now();
  let harnessPaths = [harnessPath];
  if (harnessPath === "/harness") {
    await navigate("/harness", 1440, 1000);
    const courseIds = await evaluate(`document.querySelector("main")?.dataset.courseIds?.split(",").filter(Boolean) ?? []`);
    if (!Array.isArray(courseIds) || courseIds.length === 0) {
      throw new Error("The harness exposed no course ids.");
    }
    harnessPaths = courseIds.map((courseId) => `/harness?course=${encodeURIComponent(courseId)}`);
  }

  const reports = [];
  for (const path of harnessPaths) {
    const courseReports = await runHarnessPage(path, reports.length);
    reports.push(...courseReports);
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
  await navigate("/harness/react-runtime", 1440, 1000);
  await evaluate(`document.querySelector("main button")?.click()`);
  const diagnosticDeadline = Date.now() + 15_000;
  let reactRuntimeDiagnostic;
  while (Date.now() < diagnosticDeadline) {
    reactRuntimeDiagnostic = await evaluate("window.__reactRuntimeHarness ?? null");
    if (reactRuntimeDiagnostic?.done) break;
    await delay(100);
  }
  if (!reactRuntimeDiagnostic?.passed) {
    throw new Error(`React runtime diagnostic failed: ${JSON.stringify(reactRuntimeDiagnostic)}`);
  }

  const donationModal = await donationModalAudit();
  const landingStory = await landingStoryAudit();

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

  // This browser profile is disposable. A minimal own-course snapshot opens
  // the real workspace without pretending that prerequisite courses are done.
  const workspaceAudits = [
    ["react-basics", "react-workspace"],
    ["design-foundations", "design-workspace"],
    ["js-real-apps", "real-apps-workspace"],
    ["typescript-react", "typescript-workspace"],
    ["testing-devtools", "testing-workspace"],
  ];
  for (const [courseId, name] of workspaceAudits) {
    await evaluate(`localStorage.setItem(${JSON.stringify(`aca.progress.v2.${courseId}`)}, JSON.stringify({ stepIdx: 0 }))`);
    const path = `/learn/${courseId}`;
    pageChecks.push(await pageAudit(path, name, 1440, 1000));
    pageChecks.push(await pageAudit(path, name, 375, 812));
    await evaluate(`localStorage.removeItem(${JSON.stringify(`aca.progress.v2.${courseId}`)})`);
  }

  const overflowChecks = pageChecks.filter((check) => check.horizontalOverflow);
  if (overflowChecks.length > 0) {
    throw new Error(`Horizontal overflow found: ${JSON.stringify(overflowChecks.map((check) => ({ path: check.path, width: check.width })))}`);
  }
  const homeStoryFailures = pageChecks.filter(
    (check) => check.path === "/" && (!check.productStoryVisible || check.productStoryCards !== 4),
  );
  if (homeStoryFailures.length > 0) {
    throw new Error(`Landing product story missing: ${JSON.stringify(homeStoryFailures)}`);
  }
  const workspacePaths = new Set(workspaceAudits.map(([courseId]) => `/learn/${courseId}`));
  workspacePaths.add("/learn/html-basics");
  const missingWorkspaces = pageChecks.filter((check) => workspacePaths.has(check.path) && !check.workspaceVisible);
  if (missingWorkspaces.length > 0) {
    throw new Error(`Expected workspace was gated: ${JSON.stringify(missingWorkspaces.map((check) => ({ path: check.path, width: check.width })))}`);
  }

  const result = {
    summary,
    errors: reports.filter((report) => report.findings.some((finding) => finding.severity === "error")),
    warnings: reports.filter((report) => report.findings.some((finding) => finding.severity === "warning")),
    consoleErrors,
    reactRuntimeDiagnostic,
    donationModal,
    landingStory,
    pageChecks,
    outputDir,
    durationMs: Date.now() - startedAt,
  };
  const reportPath = join(outputDir, "audit.json");
  await writeFile(reportPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  process.stdout.write(`${JSON.stringify({ summary, consoleErrors, reactRuntimeDiagnostic, donationModal, landingStory, pageChecks, reportPath, durationMs: result.durationMs }, null, 2)}\n`);
} finally {
  if (socket?.readyState === WebSocket.OPEN) socket.close();
  chrome.kill();
  await Promise.race([
    new Promise((resolve) => chrome.once("exit", resolve)),
    delay(2_000),
  ]);
  await rm(profileDir, { recursive: true, force: true }).catch(() => {});
}
