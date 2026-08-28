import { spawn } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const appPort = Number(process.env.CODEDADDY_APP_PORT ?? 3100);
const baseUrl = `http://localhost:${appPort}`;
const chromePath =
  process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outputDir =
  process.env.CODEDADDY_QA_OUTPUT ?? join(tmpdir(), "codedaddy-offline-audit");
const port = Number(process.env.CODEDADDY_CDP_PORT ?? 9334);
const profileDir = await mkdtemp(join(tmpdir(), "codedaddy-offline-chrome-"));

await mkdir(outputDir, { recursive: true });

const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", String(appPort)],
  { cwd: process.cwd(), stdio: "ignore" },
);

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
      if (response.ok) return response.json();
    } catch {}
    await delay(100);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function waitForServer(timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {}
    await delay(100);
  }
  throw new Error(`Timed out waiting for ${baseUrl}`);
}

function send(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject, method }));
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

async function waitFor(check, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const value = await evaluate(check);
    if (value) return value;
    await delay(100);
  }
  throw new Error(`Timed out waiting for ${check}`);
}

async function navigate(path) {
  await send("Page.navigate", { url: `${baseUrl}${path}` });
  await waitFor('document.readyState === "complete"');
}

async function screenshot(name) {
  const result = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  await writeFile(join(outputDir, name), Buffer.from(result.data, "base64"));
}

async function dismissDonation() {
  const deadline = Date.now() + 2_000;
  while (Date.now() < deadline) {
    const found = await evaluate(`(() => {
      const button = document.querySelector('button[aria-label="Close donation message"]');
      if (!button) return false;
      button.click();
      return true;
    })()`);
    if (found) {
      await waitFor(`!document.querySelector('[role="dialog"]')`);
      await delay(100);
      return;
    }
    await delay(50);
  }
}

try {
  await waitForServer();
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
      if (message.error) waiter.reject(new Error(`${waiter.method}: ${message.error.message}`));
      else waiter.resolve(message.result);
      return;
    }
    if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
      consoleErrors.push(message.params.args.map((arg) => arg.value ?? arg.description).join(" "));
    }
    if (message.method === "Runtime.exceptionThrown") {
      consoleErrors.push(
        message.params.exceptionDetails?.exception?.description ??
          message.params.exceptionDetails?.text ??
          "Uncaught browser exception",
      );
    }
  });

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 375,
    height: 812,
    deviceScaleFactor: 1,
    mobile: true,
  });

  await navigate("/learn/html-basics");
  await dismissDonation();
  await waitFor(
    `document.querySelector('[data-offline-status="online"]')?.textContent?.includes("Saved offline")`,
    30_000,
  );
  await screenshot("course-online-375.png");

  const phoneWorkspace = {};
  phoneWorkspace.defaultPane = await evaluate(`(() => ({
    learnPressed: [...document.querySelectorAll("button")].find((node) => node.textContent?.trim() === "Learn")?.getAttribute("aria-pressed"),
    instructionsVisible: document.querySelector("#workspace-instructions")?.getBoundingClientRect().height > 0,
    horizontalOverflow: document.body.scrollWidth > innerWidth,
  }))()`);

  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.trim() === "Code"))?.click()`);
  await waitFor(`document.querySelector('textarea[aria-label^="Code editor"]')?.getBoundingClientRect().height > 0`);
  await evaluate(`(() => {
    const textarea = document.querySelector('textarea[aria-label^="Code editor"]');
    textarea.focus();
    textarea.setSelectionRange(0, 0);
    document.querySelector('button[aria-label="Insert <"]')?.click();
  })()`);
  await delay(120);
  phoneWorkspace.editorPane = await evaluate(`(() => {
    const textarea = document.querySelector('textarea[aria-label^="Code editor"]');
    const symbols = [...document.querySelectorAll('[aria-label="Code symbols"] button')];
    return {
      textareaTag: textarea?.tagName ?? null,
      textareaFocused: document.activeElement === textarea,
      symbolInserted: textarea?.value.startsWith("<") ?? false,
      symbolCount: symbols.length,
      symbolsMeetTouchTarget: symbols.every((button) => {
        const box = button.getBoundingClientRect();
        return box.width >= 44 && box.height >= 44;
      }),
      horizontalOverflow: document.body.scrollWidth > innerWidth,
    };
  })()`);
  await screenshot("phone-code-375.png");

  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.trim() === "Preview"))?.click()`);
  await waitFor(`document.querySelector("#workspace-output")?.getBoundingClientRect().height > 0`);
  phoneWorkspace.previewPane = await evaluate(`(() => ({
    previewVisible: document.querySelector("#workspace-output")?.getBoundingClientRect().height > 0,
    iframeVisible: document.querySelector("#workspace-output iframe")?.getBoundingClientRect().height > 0,
    horizontalOverflow: document.body.scrollWidth > innerWidth,
  }))()`);
  await screenshot("phone-preview-375.png");

  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.trim() === "Learn"))?.click()`);
  await screenshot("phone-learn-375.png");

  await waitFor(`Boolean(localStorage.getItem("aca.progress.v2.html-basics"))`);
  const originalSession = await evaluate(`localStorage.getItem("aca.progress.v2.html-basics")`);
  const originalRecord = JSON.parse(originalSession);

  await navigate("/tools");
  await dismissDonation();
  await waitFor(`document.querySelector("h1")?.textContent?.includes("Carry your progress")`);

  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Download passport")))?.click()`);
  await waitFor(`document.body.textContent?.includes("Progress Passport downloaded")`);

  const newerPassport = {
    kind: "codedaddy-progress-passport",
    version: 999,
    exportedAt: "2026-08-29T00:00:00.000Z",
    records: { courses: {}, review: null },
  };
  await evaluate(`(() => {
    const input = document.querySelector('input[type="file"]');
    const transfer = new DataTransfer();
    transfer.items.add(new File([${JSON.stringify(JSON.stringify(newerPassport))}], "newer.json", { type: "application/json" }));
    input.files = transfer.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  })()`);
  await waitFor(`document.body.textContent?.includes("version this app cannot import")`);
  const newerVersionPreserved = await evaluate(`localStorage.getItem("aca.progress.v2.html-basics") === ${JSON.stringify(originalSession)}`);

  await evaluate(`(() => {
    const record = JSON.parse(localStorage.getItem("aca.progress.v2.html-basics"));
    record.game = { ...(record.game ?? {}), xp: 777 };
    localStorage.setItem("aca.progress.v2.html-basics", JSON.stringify(record));
  })()`);
  const validPassport = {
    kind: "codedaddy-progress-passport",
    version: 1,
    exportedAt: "2026-08-29T00:00:00.000Z",
    records: { courses: { "html-basics": originalRecord }, review: null },
  };
  await evaluate(`(() => {
    const input = document.querySelector('input[type="file"]');
    const transfer = new DataTransfer();
    transfer.items.add(new File([${JSON.stringify(JSON.stringify(validPassport))}], "valid.json", { type: "application/json" }));
    input.files = transfer.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  })()`);
  await waitFor(`document.body.textContent?.includes("Imported progress for 1 course")`);
  const passportRoundTrip = await evaluate(`JSON.parse(localStorage.getItem("aca.progress.v2.html-basics")).game?.xp === ${JSON.stringify(originalRecord.game?.xp ?? 0)}`);

  const setMinutes = (value) => evaluate(`(() => {
    const input = document.querySelector("#baon-minutes");
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    setter.call(input, ${JSON.stringify(String(value))});
    input.dispatchEvent(new Event("input", { bubbles: true }));
  })()`);
  await setMinutes(1);
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Save this plan")))?.click()`);
  await waitFor(`document.body.textContent?.includes("Choose more time before starting")`);
  await setMinutes(5);
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Save this plan")))?.click()`);
  await waitFor(`document.body.textContent?.includes("planned for about")`);
  const baonStored = await evaluate(`(() => {
    const plan = JSON.parse(localStorage.getItem("aca.baon.v1"));
    return plan?.version === 1 && plan.courseId === "html-basics" && plan.stepIds.length === 1;
  })()`);
  await screenshot("learning-tools-375.png");

  await navigate("/learn/html-basics");
  await dismissDonation();
  await waitFor(`document.body.textContent?.includes("Your planned session ends after this step")`);
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.trim() === "Code"))?.click()`);
  await waitFor(`document.querySelector('textarea[aria-label^="Code editor"]')?.getBoundingClientRect().height > 0`);
  await evaluate(`(() => {
    const textarea = document.querySelector('textarea[aria-label^="Code editor"]');
    const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set;
    setter.call(textarea, "“" + textarea.value);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  })()`);
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Run Code")))?.click()`);
  await waitFor(`document.body.textContent?.includes("Character Guard found")`);
  const characterGuard = await evaluate(`(() => ({
    warning: document.body.textContent?.includes("left smart double quote"),
    graderDidNotRun: !document.body.textContent?.includes("checks passed"),
  }))()`);

  await evaluate(`(() => {
    const textarea = document.querySelector('textarea[aria-label^="Code editor"]');
    const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set;
    setter.call(textarea, textarea.value.slice(1));
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  })()`);
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Run Code")))?.click()`);
  await waitFor(`document.body.textContent?.includes("Make a Tanong Card")`);
  const recoveryFirstLevel = await evaluate(`(() => ({
    checkerMessage: document.body.textContent?.includes("Here is the next thing to inspect"),
    inspectButton: [...document.querySelectorAll("button")].some((node) => node.textContent?.includes("Show where to inspect")),
    hintStillLocked: ![...document.querySelectorAll("button")].some((node) => node.textContent?.includes("Use a Hint")),
  }))()`);
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Show where to inspect")))?.click()`);
  await waitFor(`document.body.textContent?.includes("Focused inspection")`);
  const recoverySecondLevel = await evaluate(`(() => ({
    focusedInspection: document.body.textContent?.includes("Focused inspection"),
    namesFile: document.body.textContent?.includes("index.html"),
    hintUnlocked: [...document.querySelectorAll("button")].some((node) => node.textContent?.includes("Use a Hint")),
  }))()`);
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Use a Hint")))?.click()`);
  await waitFor(`document.body.textContent?.includes("Use each hint as a direction")`);
  const recoveryThirdLevel = await evaluate(`(() => ({
    authoredHintVisible: document.body.textContent?.includes("Use each hint as a direction"),
    solutionNotExposed: !document.body.textContent?.includes("Show solution"),
  }))()`);
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Make a Tanong Card")))?.click()`);
  await waitFor(`Boolean(document.querySelector("#tanong-card-text"))`);
  const tanongCard = await evaluate(`(() => {
    const card = document.querySelector("#tanong-card-text");
    return {
      currentStepOnlyNotice: document.body.textContent?.includes("current step only"),
      saysNothingSent: document.body.textContent?.includes("sends nothing"),
      includesTask: card?.value.includes("Step:") ?? false,
      includesFailure: card?.value.includes("Failing check:") ?? false,
      includesCode: card?.value.includes("Current step code:") ?? false,
    };
  })()`);
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.trim() === "Copy question"))?.click()`);
  await waitFor(`document.body.textContent?.includes("Copied")`);
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.trim() === "Learn"))?.click()`);
  await screenshot("recovery-tanong-375.png");
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Run Code")))?.click()`);
  await waitFor(`JSON.parse(localStorage.getItem("aca.mistakes.v1"))?.entries?.[0]?.count === 2`);
  const mistakeStorage = await evaluate(`(() => {
    const state = JSON.parse(localStorage.getItem("aca.mistakes.v1"));
    const entry = state?.entries?.[0];
    return {
      version: state?.version,
      count: entry?.count,
      hasOnlySafeFields: entry && Object.keys(entry).sort().join(",") === "conceptId,count,courseId,key,lastFailedAt,projectId,stepId,testId",
      containsLearnerCode: JSON.stringify(state).includes("<!DOCTYPE") || "files" in (entry ?? {}) || "code" in (entry ?? {}),
    };
  })()`);
  await screenshot("character-guard-tanong-375.png");
  await evaluate(`localStorage.removeItem("aca.baon.v1")`);

  await navigate("/tools");
  await dismissDonation();
  await waitFor(`document.body.textContent?.includes("Mistake Museum")`);
  const mistakeMuseum = await evaluate(`(() => ({
    showsTwoAttempts: document.body.textContent?.includes("2 attempts"),
    explainsNoCode: document.body.textContent?.includes("never saves your code"),
    hasReviewLink: [...document.querySelectorAll("a")].some((node) => node.textContent?.includes("Review")),
    horizontalOverflow: document.body.scrollWidth > innerWidth,
  }))()`);
  await screenshot("mistake-museum-375.png");

  await navigate("/learn/html-basics");
  await dismissDonation();
  await waitFor(`document.body.textContent?.includes("Concept connections")`);
  const conceptConnection = await evaluate(`(() => ({
    visible: document.body.textContent?.includes("Concept connections"),
    laterProject: document.body.textContent?.includes("Add a paragraph under the title"),
    hasCourseLink: [...document.querySelectorAll("a")].some((node) => node.getAttribute("href") === "/learn/html-basics"),
  }))()`);
  await screenshot("concept-connections-375.png");

  const accessTools = {
    passportDownload: true,
    newerVersionPreserved,
    passportRoundTrip,
    baonStored,
    characterGuard,
    tanongCard,
    recoveryFirstLevel,
    recoverySecondLevel,
    recoveryThirdLevel,
    mistakeStorage,
    mistakeMuseum,
    conceptConnection,
  };

  const cacheBefore = await evaluate(`(async () => {
    const names = await caches.keys();
    const urls = [];
    for (const name of names) {
      for (const request of await (await caches.open(name)).keys()) urls.push(request.url);
    }
    return { names, urls };
  })()`);
  const onlineConsoleErrors = [...consoleErrors];
  consoleErrors.length = 0;

  server.kill();
  await Promise.race([new Promise((resolve) => server.once("exit", resolve)), delay(5_000)]);

  await send("Network.emulateNetworkConditions", {
    offline: true,
    latency: 0,
    downloadThroughput: 0,
    uploadThroughput: 0,
    connectionType: "none",
  });
  await send("Network.overrideNetworkState", {
    offline: true,
    latency: 0,
    downloadThroughput: 0,
    uploadThroughput: 0,
    connectionType: "none",
  });
  await send("Network.setCacheDisabled", { cacheDisabled: true });
  await send("Page.reload", { ignoreCache: true });
  await waitFor('document.readyState === "complete"');
  await dismissDonation();
  await waitFor(`Boolean(document.querySelector("#workspace-instructions"))`);
  await waitFor(`Boolean(document.querySelector('[data-offline-status="offline"]'))`);
  await screenshot("course-offline-375.png");

  await evaluate(`(() => {
    const button = [...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Run Code"));
    button?.click();
  })()`);
  await waitFor(
    `(() => {
      const button = [...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Run Code") || node.textContent?.includes("Running"));
      return Boolean(button && !button.disabled && document.body.textContent?.includes("checks passed"));
    })()`,
  );

  const offlineCourse = await evaluate(`(() => ({
    path: location.pathname,
    workspaceVisible: Boolean(document.querySelector("#workspace-instructions")),
    status: document.querySelector('[data-offline-status]')?.textContent?.trim() ?? null,
    checkStatus: [...document.querySelectorAll("span")].find((node) => node.textContent?.includes("checks passed"))?.textContent?.trim() ?? null,
    horizontalOverflow: document.body.scrollWidth > innerWidth,
  }))()`);
  const offlineCourseConsoleErrors = [...consoleErrors];
  consoleErrors.length = 0;

  await navigate("/not-saved-for-offline-audit");
  await dismissDonation();
  await delay(500);
  await screenshot("unsaved-page-offline-375.png");
  const fallback = await evaluate(`(() => ({
    path: location.pathname,
    url: location.href,
    title: document.title,
    heading: document.querySelector("h1")?.textContent?.trim() ?? null,
    body: document.body?.textContent?.replace(/\\s+/g, " ").trim().slice(0, 500) ?? null,
    copy: document.querySelector("main")?.textContent?.replace(/\\s+/g, " ").trim() ?? null,
    horizontalOverflow: document.body.scrollWidth > innerWidth,
  }))()`);
  const fallbackConsoleErrors = [...consoleErrors];

  await send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 0,
    downloadThroughput: -1,
    uploadThroughput: -1,
    connectionType: "wifi",
  });
  await send("Network.overrideNetworkState", {
    offline: false,
    latency: 0,
    downloadThroughput: -1,
    uploadThroughput: -1,
    connectionType: "wifi",
  });
  await send("Network.setCacheDisabled", { cacheDisabled: false });

  const openedCourses = cacheBefore.urls
    .map((value) => new URL(value).pathname.match(/^\/learn\/([^/]+)$/)?.[1])
    .filter(Boolean);
  const result = {
    cacheBefore,
    openedCourses,
    phoneWorkspace,
    accessTools,
    offlineCourse,
    fallback,
    onlineConsoleErrors,
    offlineCourseConsoleErrors,
    fallbackConsoleErrors,
    outputDir,
  };

  if (
    openedCourses.length !== 1 ||
    !openedCourses.includes("html-basics") ||
    phoneWorkspace.defaultPane.learnPressed !== "true" ||
    !phoneWorkspace.defaultPane.instructionsVisible ||
    phoneWorkspace.defaultPane.horizontalOverflow ||
    phoneWorkspace.editorPane.textareaTag !== "TEXTAREA" ||
    !phoneWorkspace.editorPane.textareaFocused ||
    !phoneWorkspace.editorPane.symbolInserted ||
    phoneWorkspace.editorPane.symbolCount !== 14 ||
    !phoneWorkspace.editorPane.symbolsMeetTouchTarget ||
    phoneWorkspace.editorPane.horizontalOverflow ||
    !phoneWorkspace.previewPane.previewVisible ||
    !phoneWorkspace.previewPane.iframeVisible ||
    phoneWorkspace.previewPane.horizontalOverflow ||
    !accessTools.passportDownload ||
    !accessTools.newerVersionPreserved ||
    !accessTools.passportRoundTrip ||
    !accessTools.baonStored ||
    !accessTools.characterGuard.warning ||
    !accessTools.characterGuard.graderDidNotRun ||
    !accessTools.tanongCard.currentStepOnlyNotice ||
    !accessTools.tanongCard.saysNothingSent ||
    !accessTools.tanongCard.includesTask ||
    !accessTools.tanongCard.includesFailure ||
    !accessTools.tanongCard.includesCode ||
    !accessTools.recoveryFirstLevel.checkerMessage ||
    !accessTools.recoveryFirstLevel.inspectButton ||
    !accessTools.recoveryFirstLevel.hintStillLocked ||
    !accessTools.recoverySecondLevel.focusedInspection ||
    !accessTools.recoverySecondLevel.namesFile ||
    !accessTools.recoverySecondLevel.hintUnlocked ||
    !accessTools.recoveryThirdLevel.authoredHintVisible ||
    !accessTools.recoveryThirdLevel.solutionNotExposed ||
    accessTools.mistakeStorage.version !== 1 ||
    accessTools.mistakeStorage.count !== 2 ||
    !accessTools.mistakeStorage.hasOnlySafeFields ||
    accessTools.mistakeStorage.containsLearnerCode ||
    !accessTools.mistakeMuseum.showsTwoAttempts ||
    !accessTools.mistakeMuseum.explainsNoCode ||
    !accessTools.mistakeMuseum.hasReviewLink ||
    accessTools.mistakeMuseum.horizontalOverflow ||
    !accessTools.conceptConnection.visible ||
    !accessTools.conceptConnection.laterProject ||
    !accessTools.conceptConnection.hasCourseLink ||
    !offlineCourse.workspaceVisible ||
    !offlineCourse.status?.includes("Offline") ||
    !offlineCourse.checkStatus ||
    offlineCourse.horizontalOverflow ||
    fallback.heading !== "This page was not saved yet." ||
    !fallback.copy?.includes("Account sign-in, final project submission, and certificates still need a connection.") ||
    fallback.horizontalOverflow ||
    onlineConsoleErrors.length > 0 ||
    offlineCourseConsoleErrors.length > 0 ||
    fallbackConsoleErrors.length > 0
  ) {
    throw new Error(`Offline audit failed: ${JSON.stringify(result)}`);
  }

  const reportPath = join(outputDir, "offline-audit.json");
  await writeFile(reportPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  process.stdout.write(`${JSON.stringify({ ...result, reportPath }, null, 2)}\n`);
} finally {
  if (server.exitCode === null) server.kill();
  if (socket?.readyState === WebSocket.OPEN) socket.close();
  chrome.kill();
  await Promise.race([new Promise((resolve) => chrome.once("exit", resolve)), delay(2_000)]);
  await rm(profileDir, { recursive: true, force: true }).catch(() => {});
}
