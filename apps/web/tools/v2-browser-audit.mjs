import { spawn } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const baseUrl = process.env.CODEDADDY_URL ?? "http://localhost:3000";
const chromePath = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outputDir = process.env.CODEDADDY_QA_OUTPUT ?? join(tmpdir(), "codedaddy-v2-audit");
const port = Number(process.env.CODEDADDY_CDP_PORT ?? 9337);
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
  { stdio: "ignore", windowsHide: true },
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


  const evidence = [];
  for (const width of [1440, 360]) {
    await navigate("/harness/nosql-runtime", width, 900);
    await waitForSelector("main button");
    await delay(300);
    await evaluate(`document.querySelector("main button").click()`);
    let checks = [];
    for (let attempt = 0; attempt < 150; attempt++) {
      checks = await evaluate(`JSON.parse(document.querySelector("[data-runtime-results]").dataset.runtimeResults)`);
      if (checks.length) break;
      await delay(100);
    }
    if (!checks.length || checks.some(check => !check.passed)) throw new Error(JSON.stringify(checks));
    await evaluate(`(() => { const input = document.querySelector("textarea"); Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set.call(input, '{"collection":"stock","operation":"find","projection":["name"]}'); input.dispatchEvent(new Event("input", {bubbles:true})); })()`);
    await delay(900);
    const preview = await evaluate(`({text: document.querySelector('[aria-label="Document results"]').textContent, overflow: document.body.scrollWidth > innerWidth})`);
    if (!preview.text.includes('Rice') || preview.text.includes('55') || preview.overflow) throw new Error(`Preview failed: ${JSON.stringify(preview)}`);
    const screenshot = await send("Page.captureScreenshot", { format: "png" });
    await writeFile(join(outputDir, `nosql-runtime-${width}.png`), Buffer.from(screenshot.data, "base64"));
    evidence.push({width, checks, preview});
  }
  for (const course of (process.argv.includes("--runtime-only") ? ["sql-basics"] : ["sql-basics", "nosql-basics"])) {
    await navigate(`/harness?course=${course}`, 1440, 900);
    await waitForSelector("main button"); await delay(200);
    await evaluate(`document.querySelector("main button").click()`);
    let reports;
    for (let attempt = 0; attempt < 1200; attempt++) {
      reports = await evaluate(`window.__harness ?? null`);
      if (reports?.length && await evaluate(`!document.querySelector("main button").disabled`)) break;
      await delay(100);
    }
    if (!reports?.length || await evaluate(`document.querySelector("main button").disabled`) || reports.some(report => report.findings.some(finding => finding.severity === "error"))) throw new Error(`Harness failed: ${JSON.stringify(reports)}`);
    evidence.push({ course, steps: reports.length, findings: reports.flatMap(report => report.findings) });
  }

  if (!process.argv.includes("--runtime-only")) {
    for (const [course, solution] of [["sql-basics", "SELECT name FROM product;"], ["nosql-basics", '{"collection":"products","operation":"find"}']]) {
      for (const width of [1440, 360]) {
        await evaluate(`localStorage.setItem("aca.progress.v2.${course}", JSON.stringify({stepIdx:0})); localStorage.setItem("codedaddy.theme", ${JSON.stringify(width === 360 ? "light" : "dark")})`);
        await navigate(`/learn/${course}`, width, 900);
        await waitForSelector('[aria-label="Code editor"] textarea');
        await delay(300);
        await evaluate(`(() => { const input = document.querySelector('[aria-label="Code editor"] textarea'); Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set.call(input, ${JSON.stringify(solution)}); input.dispatchEvent(new Event("input", {bubbles:true})); })()`);
        await delay(350);
        await evaluate(`Array.from(document.querySelectorAll("button")).find(button => button.textContent.trim() === "Run Code").click()`);
        let passed = false;
        for (let attempt = 0; attempt < 100; attempt++) {
          passed = await evaluate(`Array.from(document.querySelectorAll("button")).some(button => button.textContent.trim() === "Next Step")`);
          if (passed) break;
          await delay(100);
        }
        if (!passed) throw new Error(`${course} workspace solution did not pass`);
        // Reload must retain the exact query in the one atomic course record.
        await navigate(`/learn/${course}`, width, 900);
        await waitForSelector('[aria-label="Code editor"] textarea'); await delay(300);
        const restored = await evaluate(`document.querySelector('[aria-label="Code editor"] textarea').value`);
        if (restored !== solution) throw new Error(`${course} lost code after reload`);
        if (await evaluate(`!!document.querySelector("[data-computer-prerequisite]")`)) throw new Error(`${course} incorrectly requires a computer`);
        if (width === 360) {
          await evaluate(`document.querySelector('[aria-label="Phone workspace views"] button:last-child')?.click()`);
          await delay(650);
          const previewVisible = await evaluate(`(() => { const section = document.querySelector('[aria-label="${course === "sql-basics" ? "Query results" : "Document results"}"]'); return !!section && section.getBoundingClientRect().width > 0; })()`);
          if (!previewVisible) throw new Error(`${course} phone preview tab failed`);
        }
        const overflow = await evaluate(`document.body.scrollWidth > innerWidth`);
        if (overflow) throw new Error(`${course} overflows at ${width}px`);
        const shot = await send("Page.captureScreenshot", {format:"png"});
        await writeFile(join(outputDir, `${course}-${width}.png`), Buffer.from(shot.data,"base64"));
        evidence.push({course,width,workspacePassed:passed,reloadPreserved:true,overflow});
      }
    }
    await navigate("/curriculum", 360, 900);
    await waitForSelector('section[aria-labelledby="back-end-development-title"] summary'); await delay(300);
    await evaluate(`document.querySelector('section[aria-labelledby="back-end-development-title"] summary').click()`);
    await delay(200);
    const notices = await evaluate(`document.querySelectorAll('[data-computer-prerequisite]').length`);
    if (notices !== 5) throw new Error(`Expected five computer notices, got ${notices}`);
    evidence.push({mapComputerNotices:notices});
    for (const course of ["cli-git", "node-basics", "api-basics", "auth-security", "fullstack-integration"]) {
      await navigate(`/learn/${course}`,360,900);
      const result = await evaluate(`({computer:!!document.querySelector("[data-computer-prerequisite]"),prepared:document.body.textContent.includes("Lessons are being prepared"),editor:!!document.querySelector("textarea"),overflow:document.body.scrollWidth>innerWidth})`);
      if (!result.computer || !result.prepared || result.editor || result.overflow) throw new Error(`Empty course failed ${course}: ${JSON.stringify(result)}`);
      evidence.push({course,...result});
    }
  }
  if (consoleErrors.length) throw new Error(`Browser errors: ${consoleErrors.join("; ")}`);
  await writeFile(join(outputDir, "v2-audit.json"), JSON.stringify(evidence, null, 2));
  console.log(JSON.stringify({ passed:true, evidence, outputDir }));
} finally {
  if (socket?.readyState === WebSocket.OPEN) socket.close();
  chrome.kill();
  await Promise.race([new Promise(resolve => chrome.once("exit", resolve)), delay(2000)]);
  await rm(profileDir, { recursive: true, force: true }).catch(() => {});
}
