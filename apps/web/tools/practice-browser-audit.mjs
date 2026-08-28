import { spawn } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const baseUrl = process.env.CODEDADDY_URL ?? "http://localhost:3000";
const chromePath = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outputDir = process.env.CODEDADDY_QA_OUTPUT ?? join(tmpdir(), "codedaddy-practice-audit");
const port = Number(process.env.CODEDADDY_CDP_PORT ?? 9336);
const profileDir = await mkdtemp(join(tmpdir(), "codedaddy-practice-chrome-"));
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

async function waitFor(check, timeoutMs = 15_000) {
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

async function setEditor(value) {
  await evaluate(`(() => {
    const textarea = document.querySelector('textarea[aria-label^="Practice code editor"]');
    const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set;
    setter.call(textarea, ${JSON.stringify(value)});
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  })()`);
  await delay(100);
}

async function runAndWaitForStatus(status, count = 1) {
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Run checks")))?.click()`);
  await waitFor(`document.querySelectorAll('[data-check-status=${JSON.stringify(status)}]').length >= ${count}`);
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

  await navigate("/practice");
  const listing = await evaluate(`(() => ({
    cards: document.querySelectorAll("main article").length,
    rebuilds: [...document.querySelectorAll("main article")].filter((node) => node.textContent?.includes("Rebuild Mode")).length,
    clinics: [...document.querySelectorAll("main article")].filter((node) => node.textContent?.includes("Bug Clinic")).length,
    constraints: [...document.querySelectorAll("main article")].filter((node) => node.textContent?.includes("Constraint Mission")).length,
    remixes: [...document.querySelectorAll("main article")].filter((node) => node.textContent?.includes("Project Remix")).length,
    readyCount: [...document.querySelectorAll("main article")].filter((node) => node.textContent?.includes("Ready")).length,
    lockedCount: [...document.querySelectorAll("main article")].filter((node) => node.textContent?.includes("Finish source first")).length,
    overflow: document.body.scrollWidth > innerWidth,
  }))()`);
  await screenshot("practice-list-375.png");

  await navigate("/practice/remix-readable-card");
  await waitFor(`document.body.textContent?.includes("Remix locked")`);
  const lockedDirect = await evaluate(`document.body.textContent?.includes("Finish the source build first") && !document.querySelector('textarea[aria-label^="Practice code editor"]')`);

  await navigate("/practice/rebuild-community-notice");
  await runAndWaitForStatus("failed");
  const rebuildStartingFailed = await evaluate(`Boolean(document.querySelector('[data-check-status="failed"]'))`);
  const rebuildSolution = "<!DOCTYPE html>\n<html>\n  <head><title>Community Notice</title></head>\n  <body>\n    <h1>Water interruption</h1>\n    <p>Service returns at 4 PM today.</p>\n  </body>\n</html>";
  await setEditor(rebuildSolution);
  await runAndWaitForStatus("passed", 2);
  await waitFor(`document.body.textContent?.includes("Activity complete. Evidence saved.")`);
  await delay(500);
  const rebuildPassed = await evaluate(`(() => {
    const state = JSON.parse(localStorage.getItem("aca.practice.v1"));
    const completion = state?.completions?.find((item) => item.activityId === "rebuild-community-notice");
    return completion?.passedTestIds?.length === 2;
  })()`);
  await screenshot("rebuild-complete-375.png");
  await send("Page.reload", { ignoreCache: true });
  await waitFor('document.readyState === "complete"');
  const draftSurvivedReload = await evaluate(`document.querySelector('textarea[aria-label^="Practice code editor"]')?.value === ${JSON.stringify(rebuildSolution)}`);

  await navigate("/practice/bug-clinic-fare-total", 1440, 1000);
  await runAndWaitForStatus("failed");
  const clinicStartingFailed = await evaluate(`Boolean(document.querySelector('[data-check-status="failed"]'))`);
  const clinicSource = await evaluate(`document.querySelector('textarea[aria-label^="Practice code editor"]')?.value`);
  await setEditor(clinicSource.replace("total - fare", "total + fare"));
  await runAndWaitForStatus("passed");
  const clinicPassed = await evaluate(`JSON.parse(localStorage.getItem("aca.practice.v1"))?.completions?.some((item) => item.activityId === "bug-clinic-fare-total")`);
  await delay(400);
  const desktop = await evaluate(`(() => ({
    overflow: document.body.scrollWidth > innerWidth,
    editorIsTextarea: document.querySelector('textarea[aria-label^="Practice code editor"]')?.tagName === "TEXTAREA",
    iframeSandboxes: [...document.querySelectorAll("iframe")].map((frame) => frame.getAttribute("sandbox")),
  }))()`);
  await screenshot("bug-clinic-complete-1440.png");

  await navigate("/practice/bug-clinic-counter-button");
  await runAndWaitForStatus("failed");
  const reactStartingFailed = await evaluate(`Boolean(document.querySelector('[data-check-status="failed"]'))`);
  const reactSource = await evaluate(`document.querySelector('textarea[aria-label^="Practice code editor"]')?.value`);
  await setEditor(reactSource.replace("count - 1", "count + 1"));
  await runAndWaitForStatus("passed");
  const reactPassed = await evaluate(`JSON.parse(localStorage.getItem("aca.practice.v1"))?.completions?.some((item) => item.activityId === "bug-clinic-counter-button")`);
  await delay(400);
  const mobile = await evaluate(`(() => ({
    overflow: document.body.scrollWidth > innerWidth,
    statusHasIconAndWord: Boolean(document.querySelector('[role="status"] svg, [role="status"] span')) && document.querySelector('[role="status"]')?.textContent?.includes("Activity complete"),
  }))()`);
  await screenshot("react-clinic-complete-375.png");

  await navigate("/practice/constraint-keyboard-help-link");
  await runAndWaitForStatus("failed");
  const constraintStartingFailed = await evaluate(`Boolean(document.querySelector('[data-check-status="failed"]')) && document.body.textContent?.includes("Authored constraints")`);
  await setEditor('<a class="help-link" href="tel:+63281234567">Call the barangay desk</a>');
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.trim() === "styles.css"))?.click()`);
  await waitFor(`document.querySelector('textarea[aria-label^="Practice code editor"]')?.getAttribute("aria-label")?.includes("styles.css")`);
  await setEditor('.help-link {\n  color: #b91c1c;\n}\n\n.help-link:focus-visible {\n  outline: 3px solid #111827;\n}');
  await runAndWaitForStatus("passed", 2);
  const constraintPassed = await evaluate(`JSON.parse(localStorage.getItem("aca.practice.v1"))?.completions?.some((item) => item.activityId === "constraint-keyboard-help-link")`);
  await screenshot("constraint-complete-375.png");

  const sourceDraftBeforeRemix = await evaluate(`JSON.stringify(JSON.parse(localStorage.getItem("aca.practice.v1"))?.drafts?.["rebuild-community-notice"])`);
  await navigate("/practice/remix-community-notice");
  await waitFor(`document.body.textContent?.includes("Project Remix")`);
  await waitFor(`Boolean(JSON.parse(localStorage.getItem("aca.practice.v1"))?.drafts?.["remix-community-notice"])`);
  const remixClone = await evaluate(`(() => ({
    clonedSource: JSON.stringify(JSON.parse(localStorage.getItem("aca.practice.v1"))?.drafts?.["rebuild-community-notice"]?.files) === JSON.stringify(JSON.parse(localStorage.getItem("aca.practice.v1"))?.drafts?.["remix-community-notice"]?.files),
    explainsSeparateDraft: document.body.textContent?.includes("draft stays in this browser"),
  }))()`);
  await runAndWaitForStatus("failed");
  await setEditor("<!DOCTYPE html>\n<html>\n  <head><title>Community Notice</title></head>\n  <body>\n    <h1>Barangay Cleanup</h1>\n    <p>Meet at the covered court this Saturday.</p>\n  </body>\n</html>");
  await runAndWaitForStatus("passed", 2);
  await delay(500);
  const remix = await evaluate(`(() => {
    const state = JSON.parse(localStorage.getItem("aca.practice.v1"));
    return {
      passed: state?.completions?.some((item) => item.activityId === "remix-community-notice"),
      sourceUnchanged: JSON.stringify(state?.drafts?.["rebuild-community-notice"]) === ${JSON.stringify(sourceDraftBeforeRemix)},
      separateDraft: state?.drafts?.["remix-community-notice"]?.files?.["index.html"]?.includes("Barangay Cleanup"),
    };
  })()`);
  await screenshot("remix-complete-375.png");

  await navigate("/learn/html-basics");
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.trim().startsWith("<h1></h1>")))?.click()`);
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Run Code")))?.click()`);
  await waitFor(`document.body.textContent?.includes("STEP CLEAR")`);
  await delay(500);

  await navigate("/evidence");
  await waitFor(`Boolean(document.querySelector('[data-evidence-stat="steps"]'))`);
  const evidence = await evaluate(`(() => ({
    steps: Number(document.querySelector('[data-evidence-stat="steps"] p')?.textContent),
    checks: Number(document.querySelector('[data-evidence-stat="checks"] p')?.textContent),
    independent: Number(document.querySelector('[data-evidence-stat="independent"] p')?.textContent),
    exactGuidedCheck: document.body.textContent?.includes("The page has a big title"),
    exactPracticeTitle: document.body.textContent?.includes("Rebuild a community notice"),
    constraintEvidence: document.body.textContent?.includes("Constraint Mission: keyboard help link"),
    remixEvidence: document.body.textContent?.includes("Remix the community notice"),
    noClaimInput: !document.querySelector("main input, main textarea"),
    honestLimit: document.body.textContent?.includes("can be changed by someone with access to the device"),
    overflow: document.body.scrollWidth > innerWidth,
  }))()`);
  await evaluate(`(() => {
    const original = URL.createObjectURL.bind(URL);
    URL.createObjectURL = (blob) => { window.__proofBlob = blob; return original(blob); };
  })()`);
  await evaluate(`([...document.querySelectorAll("button")].find((node) => node.textContent?.includes("Download self-contained proof")))?.click()`);
  await waitFor(`document.body.textContent?.includes("Proof file downloaded")`);
  const proofFile = await evaluate(`(async () => {
    const html = await window.__proofBlob.text();
    return {
      selfContained: html.startsWith("<!doctype html>") && html.includes("<style>") && !html.includes("<script"),
      exactCheck: html.includes("The page has a big title"),
      practiceEvidence: html.includes("Rebuild a community notice"),
      disclosedBrowserLimit: html.includes("Browser-side records can be changed"),
      noLearnerCode: !html.includes("Water interruption") && !html.includes("function totalFares"),
    };
  })()`);
  await screenshot("evidence-ledger-375.png");

  const supportedPractice = await evaluate(`localStorage.getItem("aca.practice.v1")`);
  await evaluate(`(() => {
    const state = JSON.parse(localStorage.getItem("aca.practice.v1"));
    state.completions = [{ activityId: "rebuild-community-notice", passedTestIds: ["notice-heading"], completedAt: "2026-08-29T00:00:00.000Z" }];
    localStorage.setItem("aca.practice.v1", JSON.stringify(state));
    location.reload();
  })()`);
  await waitFor(`Boolean(document.querySelector('[data-evidence-stat="independent"]'))`);
  const unsupportedClaimHidden = await evaluate(`Number(document.querySelector('[data-evidence-stat="independent"] p')?.textContent) === 0 && !document.body.textContent?.includes("Rebuild a community notice")`);
  await evaluate(`localStorage.setItem("aca.practice.v1", ${JSON.stringify(supportedPractice)})`);

  await navigate("/proof");
  await waitFor(`document.body.textContent?.includes("Evidence you can carry with you")`);
  const proofPreview = await evaluate(`(() => ({
    previewVisible: document.body.textContent?.includes("Proof page"),
    exactEvidenceVisible: document.body.textContent?.includes("The page has a big title"),
    overflow: document.body.scrollWidth > innerWidth,
  }))()`);
  await screenshot("proof-preview-375.png");

  const result = { listing, lockedDirect, rebuildStartingFailed, rebuildPassed, draftSurvivedReload, clinicStartingFailed, clinicPassed, reactStartingFailed, reactPassed, constraintStartingFailed, constraintPassed, remixClone, remix, desktop, mobile, evidence, proofFile, unsupportedClaimHidden, proofPreview, consoleErrors, outputDir };
  if (
    listing.cards !== 8 || listing.rebuilds !== 2 || listing.clinics !== 2 || listing.constraints !== 2 || listing.remixes !== 2 || listing.readyCount !== 6 || listing.lockedCount !== 2 || listing.overflow || !lockedDirect ||
    !rebuildStartingFailed || !rebuildPassed || !draftSurvivedReload ||
    !clinicStartingFailed || !clinicPassed || !reactStartingFailed || !reactPassed || !constraintStartingFailed || !constraintPassed ||
    !remixClone.clonedSource || !remixClone.explainsSeparateDraft || !remix.passed || !remix.sourceUnchanged || !remix.separateDraft ||
    desktop.overflow || !desktop.editorIsTextarea || desktop.iframeSandboxes.some((value) => value?.includes("allow-same-origin")) ||
    mobile.overflow || !mobile.statusHasIconAndWord ||
    evidence.steps !== 1 || evidence.checks !== 9 || evidence.independent !== 5 || !evidence.exactGuidedCheck || !evidence.exactPracticeTitle || !evidence.constraintEvidence || !evidence.remixEvidence || !evidence.noClaimInput || !evidence.honestLimit || evidence.overflow ||
    !proofFile.selfContained || !proofFile.exactCheck || !proofFile.practiceEvidence || !proofFile.disclosedBrowserLimit || !proofFile.noLearnerCode ||
    !unsupportedClaimHidden || !proofPreview.previewVisible || !proofPreview.exactEvidenceVisible || proofPreview.overflow ||
    consoleErrors.length > 0
  ) throw new Error(`Practice audit failed: ${JSON.stringify(result)}`);
  const reportPath = join(outputDir, "practice-audit.json");
  await writeFile(reportPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  process.stdout.write(`${JSON.stringify({ ...result, reportPath }, null, 2)}\n`);
} finally {
  if (socket?.readyState === WebSocket.OPEN) socket.close();
  chrome.kill();
  await Promise.race([new Promise((resolve) => chrome.once("exit", resolve)), delay(2_000)]);
  await rm(profileDir, { recursive: true, force: true }).catch(() => {});
}
