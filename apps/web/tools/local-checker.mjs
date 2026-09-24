// CodeDaddy local checker.
//
// Runs on the learner's own computer for the Command Line and Git course
// (V2_RUNNER_DESIGN.md option B). It reads the learner's project folder and
// Git state, then prints a short report for the learner to paste into the
// course page. It never changes Git configuration, remotes, credentials, or
// any file, except that `start` writes the starting files into an empty
// folder the learner chose.
//
// The report is a result the learner reports. Anyone who controls this file
// can edit what it prints, so the website treats a pasted report as practice
// feedback only and never as verified evidence.
//
// The same file is imported by the Node authoring gate in
// tools/check-content.mjs, so the checks the gate proves are the checks the
// learner runs. The download route fills in MANIFEST; the source copy has none.

import { execFile, spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const CHECKER_VERSION = 1;
export const REPORT_START = "----- CODEDADDY REPORT START -----";
export const REPORT_END = "----- CODEDADDY REPORT END -----";

const MANIFEST = /*__CODEDADDY_MANIFEST__*/ null;

const MAX_FILE_BYTES = 262144;
const GIT_TIMEOUT_MS = 10000;

/** A relative path inside the project, written with forward slashes. */
export function safeRelative(value) {
  if (typeof value !== "string" || !value || value.length > 200) return null;
  if (value.includes("\0") || value.includes("\\") || value.startsWith("/") || /^[A-Za-z]:/.test(value)) return null;
  const parts = value.split("/");
  if (parts.some((part) => !part || part === "." || part === "..")) return null;
  return parts.join("/");
}

export function safeBranch(value) {
  return typeof value === "string" && /^[A-Za-z0-9][A-Za-z0-9._/-]{0,99}$/.test(value) && !value.includes("..") && !value.endsWith(".lock") && !value.endsWith("/");
}

export function safeConfigKey(value) {
  return typeof value === "string" && /^[a-z]+(?:\.[a-z]+)+$/i.test(value) && value.length <= 60;
}

function inside(root, relative) {
  const clean = safeRelative(relative);
  if (!clean) return null;
  const full = path.resolve(root, ...clean.split("/"));
  const base = path.resolve(root);
  if (full !== base && !full.startsWith(base + path.sep)) return null;
  // A link could point outside the folder the learner chose. Refuse to follow it.
  let current = base;
  for (const part of clean.split("/")) {
    current = path.join(current, part);
    try {
      if (fs.lstatSync(current).isSymbolicLink()) return null;
    } catch {
      break;
    }
  }
  return full;
}

function kindOf(full) {
  try {
    const stat = fs.lstatSync(full);
    if (stat.isSymbolicLink()) return "link";
    if (stat.isDirectory()) return "dir";
    if (stat.isFile()) return "file";
    return "other";
  } catch {
    return "missing";
  }
}

/**
 * Reads a small text file whatever wrote it. PowerShell 5.1 redirection writes
 * UTF-16 with a byte-order mark and Windows editors add CRLF line endings;
 * neither should make a correct answer fail.
 */
export function decodeText(buffer) {
  let text;
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xfe) text = buffer.subarray(2).toString("utf16le");
  else if (buffer.length >= 2 && buffer[0] === 0xfe && buffer[1] === 0xff) {
    const swapped = Buffer.from(buffer.subarray(2));
    swapped.swap16();
    text = swapped.toString("utf16le");
  } else if (buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) text = buffer.subarray(3).toString("utf8");
  else text = buffer.toString("utf8");
  return text.replace(/\r\n?/g, "\n");
}

function readText(full) {
  const stat = fs.statSync(full);
  if (stat.size > MAX_FILE_BYTES) return null;
  return decodeText(fs.readFileSync(full));
}

function git(root, args, env) {
  return new Promise((resolve) => {
    execFile(
      "git",
      ["-C", root, ...args],
      {
        timeout: GIT_TIMEOUT_MS,
        maxBuffer: 1 << 20,
        windowsHide: true,
        encoding: "utf8",
        env: { ...(env ?? process.env), GIT_OPTIONAL_LOCKS: "0", GIT_TERMINAL_PROMPT: "0", LC_ALL: "C" },
      },
      (error, stdout, stderr) => {
        if (error && error.code === "ENOENT") resolve({ code: -1, stdout: "", stderr: "", missing: true });
        else resolve({ code: error ? (typeof error.code === "number" ? error.code : 1) : 0, stdout: String(stdout), stderr: String(stderr), missing: false });
      },
    );
  });
}

/** Parses `git status --porcelain=v1 -z` into path -> two-letter code. */
export function parseStatus(output) {
  const entries = new Map();
  const tokens = output.split("\0");
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.length < 4) continue;
    const code = token.slice(0, 2);
    entries.set(token.slice(3), code);
    // A rename or copy is followed by its original path as its own token.
    if (code[0] === "R" || code[0] === "C") i++;
  }
  return entries;
}

const NODE_TIMEOUT_MS = 5000;
const MAX_OUTPUT_CHARS = 65536;

export function safeEnvName(value) {
  return typeof value === "string" && /^[A-Z_][A-Z0-9_]{0,40}$/.test(value);
}

/**
 * Runs the learner's own script with Node, on their own computer. A short
 * time limit, a small environment, and captured output: the same run serves
 * every check in the step that asks for the same file, arguments, and input.
 */
function runNode(root, full, test) {
  return new Promise((resolve) => {
    const env = { PATH: process.env.PATH ?? "", NODE_NO_WARNINGS: "1" };
    for (const key of ["SystemRoot", "SYSTEMROOT", "TEMP", "TMP", "HOME", "USERPROFILE"]) if (process.env[key]) env[key] = process.env[key];
    Object.assign(env, test.env ?? {});
    const child = spawn(process.execPath, [full, ...(test.args ?? [])], { cwd: root, env, windowsHide: true });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(result);
    };
    const timer = setTimeout(() => {
      child.kill();
      finish({ timedOut: true, code: null, stdout, stderr });
    }, NODE_TIMEOUT_MS);
    child.stdout.on("data", (chunk) => { if (stdout.length < MAX_OUTPUT_CHARS) stdout += chunk; });
    child.stderr.on("data", (chunk) => { if (stderr.length < MAX_OUTPUT_CHARS) stderr += chunk; });
    child.on("error", () => finish({ failedToStart: true, code: null, stdout, stderr }));
    child.on("close", (code) => finish({ code, stdout: stdout.replace(/\r\n?/g, "\n"), stderr: stderr.replace(/\r\n?/g, "\n") }));
    child.stdin.on("error", () => {});
    child.stdin.end(test.stdin ?? "");
  });
}

const pass = { pass: true, reason: "" };
const fail = (reason) => ({ pass: false, reason });

async function runCheck(root, test, state) {
  const needsGit = test.kind.startsWith("local-git-");
  if (needsGit) {
    if (!fs.existsSync(path.join(root, ".git"))) return fail("This folder is not its own Git repository yet.");
    if (state.gitMissing) return fail("Git is not installed, or your terminal cannot find it.");
  }
  const target = "path" in test ? inside(root, test.path) : null;
  if ("path" in test && !target) return fail("The check names a path this checker will not read.");

  if (test.kind.startsWith("local-node-")) {
    const script = inside(root, test.file);
    if (!script) return fail("The check names a file this checker will not run.");
    if (kindOf(script) !== "file") return fail(`There is no file named ${test.file}.`);
    if (Object.keys(test.env ?? {}).some((key) => !safeEnvName(key))) return fail("The check sets an environment variable this checker will not set.");
    const run = await state.node(script, test);
    const command = `node ${[test.file, ...(test.args ?? [])].join(" ")}`;
    if (run.failedToStart) return fail("Node could not start. Check that Node.js is installed.");
    if (run.timedOut) return fail(`${command} was still running after 5 seconds. Look for code that never finishes.`);
    if (test.kind === "local-node-prints") return run.stdout.includes(test.value) ? pass : fail(`${command} did not print the expected text.${run.stderr.trim() ? " It printed an error; run it yourself to read it." : ""}`);
    if (test.kind === "local-node-stderr") return run.stderr.includes(test.value) ? pass : fail(`${command} did not report the expected error message.`);
    return run.code === test.code ? pass : fail(`${command} ended with exit code ${run.code}; the step expects ${test.code}.`);
  }

  switch (test.kind) {
    case "local-dir-exists":
      return kindOf(target) === "dir" ? pass : fail(`There is no folder named ${test.path}.`);
    case "local-file-exists":
      return kindOf(target) === "file" ? pass : fail(`There is no file named ${test.path}.`);
    case "local-path-missing":
      return kindOf(target) === "missing" ? pass : fail(`${test.path} still exists.`);
    case "local-file-contains":
    case "local-file-lacks": {
      if (kindOf(target) !== "file") return fail(`There is no file named ${test.path}.`);
      const text = readText(target);
      if (text === null) return fail(`${test.path} is too large to check.`);
      const found = text.includes(test.value);
      if (test.kind === "local-file-contains") return found ? pass : fail(`${test.path} does not contain the expected text yet.`);
      return found ? fail(`${test.path} still contains text that should be gone.`) : pass;
    }
    case "local-git-repo":
      return pass;
    case "local-git-config": {
      if (!safeConfigKey(test.key)) return fail("The check names a setting this checker will not read.");
      const result = await git(root, ["config", "--local", "--get", test.key], state.env);
      return result.code === 0 && result.stdout.trim() === test.value ? pass : fail(`${test.key} is not set to the expected value in this repository.`);
    }
    case "local-git-staged":
    case "local-git-unstaged":
    case "local-git-untracked": {
      const status = await state.status();
      const code = status.get(test.path);
      if (test.kind === "local-git-untracked") return code === "??" ? pass : fail(`${test.path} is not an untracked file.`);
      if (!code || code === "??" || code === "!!") return fail(`${test.path} has no ${test.kind === "local-git-staged" ? "staged" : "unstaged"} change.`);
      if (test.kind === "local-git-staged") return code[0] !== " " ? pass : fail(`${test.path} is changed but not staged.`);
      return code[1] !== " " ? pass : fail(`${test.path} has no unstaged change.`);
    }
    case "local-git-clean": {
      const status = await state.status();
      return status.size === 0 ? pass : fail("There are changes that are not committed yet.");
    }
    case "local-git-commit-count": {
      const result = await git(root, ["rev-list", "--count", "HEAD"], state.env);
      const count = result.code === 0 ? Number(result.stdout.trim()) : 0;
      return count === test.count ? pass : fail(`This repository has ${count} ${count === 1 ? "commit" : "commits"}; the step expects ${test.count}.`);
    }
    case "local-git-head-message": {
      const result = await git(root, ["log", "-1", "--format=%s"], state.env);
      return result.code === 0 && result.stdout.trim() === test.value ? pass : fail("The latest commit message is not the expected one.");
    }
    case "local-git-head-has-file": {
      const result = await git(root, ["ls-tree", "-r", "-z", "--name-only", "HEAD"], state.env);
      return result.code === 0 && result.stdout.split("\0").includes(test.path) ? pass : fail(`The latest commit does not include ${test.path}.`);
    }
    case "local-git-branch": {
      if (!safeBranch(test.value)) return fail("The check names a branch this checker will not read.");
      const result = await git(root, ["branch", "--show-current"], state.env);
      return result.code === 0 && result.stdout.trim() === test.value ? pass : fail(`You are not on the ${test.value} branch.`);
    }
    case "local-git-branch-exists": {
      if (!safeBranch(test.branch)) return fail("The check names a branch this checker will not read.");
      const result = await git(root, ["rev-parse", "--verify", "--quiet", `refs/heads/${test.branch}`], state.env);
      return result.code === 0 ? pass : fail(`There is no branch named ${test.branch}.`);
    }
    case "local-git-branch-missing": {
      if (!safeBranch(test.branch)) return fail("The check names a branch this checker will not read.");
      const result = await git(root, ["rev-parse", "--verify", "--quiet", `refs/heads/${test.branch}`], state.env);
      return result.code !== 0 ? pass : fail(`The ${test.branch} branch still exists.`);
    }
    case "local-git-merged": {
      if (!safeBranch(test.branch)) return fail("The check names a branch this checker will not read.");
      const result = await git(root, ["merge-base", "--is-ancestor", `refs/heads/${test.branch}`, "HEAD"], state.env);
      return result.code === 0 ? pass : fail(`${test.branch} is not merged into the current branch.`);
    }
    default:
      return fail("This checker does not know that kind of check. Download the latest checker.");
  }
}

/** Runs every check in order against one project folder. */
export async function runChecks(root, tests, options = {}) {
  const env = options.env;
  const version = await git(root, ["--version"], env);
  let statusCache = null;
  const nodeRuns = new Map();
  const state = {
    env,
    node(script, test) {
      const key = JSON.stringify([script, test.args ?? [], test.env ?? {}, test.stdin ?? ""]);
      if (!nodeRuns.has(key)) nodeRuns.set(key, runNode(root, script, test));
      return nodeRuns.get(key);
    },
    gitMissing: version.missing,
    async status() {
      if (!statusCache) {
        const result = await git(root, ["status", "--porcelain=v1", "-z", "--untracked-files=all"], env);
        statusCache = result.code === 0 ? parseStatus(result.stdout) : new Map();
      }
      return statusCache;
    },
  };
  const results = [];
  for (const test of tests) results.push({ id: test.id, label: test.label, ...(await runCheck(root, test, state)) });
  return results;
}

export function formatReport(course, stepId, results) {
  const body = { v: CHECKER_VERSION, checker: CHECKER_VERSION, course, step: stepId, checks: results.map((result) => ({ id: result.id, pass: result.pass })) };
  return `${REPORT_START}\n${JSON.stringify(body)}\n${REPORT_END}`;
}

async function main(argv) {
  const [command, id] = argv;
  if (!MANIFEST) {
    console.error("This is the checker source. Download the checker from the course page instead.");
    return 1;
  }
  const root = process.cwd();
  if (command === "start") {
    const project = MANIFEST.projects[id];
    if (!project) {
      console.error(`Unknown project "${id ?? ""}". Copy the start command from the course page.`);
      return 1;
    }
    if (fs.readdirSync(root).length > 0) {
      console.error("This folder is not empty. Make a new empty folder, move into it with cd, and run start again.");
      return 1;
    }
    for (const [relative, text] of Object.entries(project.seed)) {
      const full = inside(root, relative);
      if (!full) continue;
      fs.mkdirSync(path.dirname(full), { recursive: true });
      fs.writeFileSync(full, text);
    }
    console.log(`Ready: ${project.title}. Go back to the course page for step 1.`);
    return 0;
  }
  if (command === "check") {
    const step = MANIFEST.steps[id];
    if (!step) {
      console.error(`Unknown step "${id ?? ""}". Copy the check command from the course page.`);
      return 1;
    }
    const results = await runChecks(root, step.tests);
    for (const result of results) console.log(`${result.pass ? "PASS" : "FAIL"}  ${result.label}${result.pass ? "" : `\n      ${result.reason}`}`);
    console.log("");
    console.log("Copy everything from the START line to the END line, then paste it into the course page:");
    console.log(formatReport(step.course, id, results));
    return 0;
  }
  console.log("Usage:\n  node codedaddy-check.mjs start <project-id>\n  node codedaddy-check.mjs check <step-id>");
  return command ? 1 : 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main(process.argv.slice(2)).then((code) => {
    process.exitCode = code;
  });
}
