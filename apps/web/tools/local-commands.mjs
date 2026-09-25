// Authoring-only replay of a local step's solution commands.
//
// A Command Line and Git step's solution is the handful of terminal commands a
// learner would type. The content gate replays them in a throwaway folder to
// prove the step's checks fail before and pass after. Nothing here reaches the
// website or the learner's checker.
//
// There is no shell. Each line is tokenised here and must be one of a small
// set of file commands, implemented in Node, or `git` with an allowlisted
// subcommand, launched with separate arguments. Anything else is rejected, so
// authored content cannot run arbitrary programs on the authoring machine.

import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { runNpm, safeRelative } from "./local-checker.mjs";

/**
 * Installs a project's pinned packages once per exact package.json, in a
 * shared cache folder, and links the project to it. The gate replays every
 * React step on every batch; downloading the same packages each time would
 * take minutes and depend on the network every run. Only the first run for a
 * given package.json touches the registry.
 */
const installs = new Map();

async function installOnce(root) {
  const manifest = fs.readFileSync(path.join(root, "package.json"), "utf8");
  const key = createHash("sha256").update(manifest).digest("hex").slice(0, 16);
  const cache = path.join(tmpdir(), "codedaddy-npm-cache", key);
  // Projects are replayed in parallel and many share one package.json; only
  // one of them may fill a cache folder, and the rest wait for it.
  if (!installs.has(key)) installs.set(key, fillCache(cache, manifest));
  await installs.get(key);
  fs.symlinkSync(path.join(cache, "node_modules"), path.join(root, "node_modules"), "junction");
  fs.copyFileSync(path.join(cache, "package-lock.json"), path.join(root, "package-lock.json"));
}

async function fillCache(cache, manifest) {
  if (!fs.existsSync(path.join(cache, "node_modules", ".package-lock.json"))) {
    fs.mkdirSync(cache, { recursive: true });
    fs.writeFileSync(path.join(cache, "package.json"), manifest);
    const run = await runNpm(cache, ["install", "--no-audit", "--no-fund"], process.env, 600000);
    if (run.code !== 0) throw Error(`npm install failed in the gate cache: ${run.output.slice(-300)}`);
  }
  // Vite creates node_modules/.vite-temp while loading its config, and on
  // Windows that mkdir fails when node_modules is a junction. Made here, in the
  // real folder, it already exists when any linked project builds.
  fs.mkdirSync(path.join(cache, "node_modules", ".vite-temp"), { recursive: true });
}

const GIT_SUBCOMMANDS = new Set(["init", "config", "add", "commit", "restore", "rm", "mv", "branch", "switch", "checkout", "merge", "status", "log", "diff"]);
// Global options such as -C and -c can only precede the subcommand, and the
// subcommand is always the first word here, so they cannot appear.
const GIT_FORBIDDEN = new Set(["--global", "--system", "--file", "-f", "--force", "-D", "--exec-path", "--git-dir", "--work-tree", "--edit", "--interactive", "-i", "-p", "--patch"]);
const CONFIG_KEYS = new Set(["user.name", "user.email"]);

/** Splits one command line into words. Double quotes group words; nothing is expanded. */
export function tokenize(line) {
  const words = [];
  let current = "";
  let quoted = false;
  let started = false;
  for (const character of line) {
    if (quoted) {
      if (character === '"') quoted = false;
      else if ("$`\\".includes(character)) throw Error(`Unsupported character ${character} inside quotes: ${line}`);
      else current += character;
      continue;
    }
    if (character === '"') {
      quoted = true;
      started = true;
    } else if (character === " " || character === "\t") {
      if (started) words.push(current);
      current = "";
      started = false;
    } else if (/[A-Za-z0-9._/@:=+,%-]/.test(character) || character === ">") {
      current += character;
      started = true;
    } else throw Error(`Unsupported character ${character}: ${line}`);
  }
  if (quoted) throw Error(`Unclosed quote: ${line}`);
  if (started) words.push(current);
  return words;
}

function resolveInside(root, relative) {
  const clean = safeRelative(relative);
  if (!clean) throw Error(`Path must stay inside the project: ${relative}`);
  return path.join(root, ...clean.split("/"));
}

function runGit(root, args, env) {
  return new Promise((resolve, reject) => {
    execFile("git", args, { cwd: root, env, timeout: 15000, windowsHide: true, encoding: "utf8" }, (error, _stdout, stderr) => {
      if (error) reject(Error(`git ${args.join(" ")} failed: ${String(stderr || error.message).trim().slice(0, 300)}`));
      else resolve();
    });
  });
}

/** Replays one command line inside `root`. */
export async function runCommand(root, line, env) {
  const words = tokenize(line.trim());
  if (!words.length) return;
  const [program, ...args] = words;
  const redirect = args.findIndex((word) => word === ">" || word === ">>");
  if (redirect !== -1 && (program !== "echo" || redirect !== args.length - 2)) throw Error(`Redirection is allowed only as echo text > file: ${line}`);
  if (redirect === -1 && args.some((word) => word.includes(">"))) throw Error(`Unsupported redirection: ${line}`);

  switch (program) {
    case "mkdir": {
      const recursive = args[0] === "-p";
      const targets = recursive ? args.slice(1) : args;
      if (!targets.length) throw Error(`mkdir needs a folder: ${line}`);
      for (const target of targets) fs.mkdirSync(resolveInside(root, target), { recursive });
      return;
    }
    case "touch": {
      if (args.length !== 1) throw Error(`touch takes one file: ${line}`);
      const full = resolveInside(root, args[0]);
      if (!fs.existsSync(path.dirname(full))) throw Error(`No such folder for ${args[0]}`);
      if (fs.existsSync(full)) fs.utimesSync(full, new Date(), new Date());
      else fs.writeFileSync(full, "");
      return;
    }
    case "echo": {
      const text = (redirect === -1 ? args : args.slice(0, redirect)).join(" ") + "\n";
      if (redirect === -1) return;
      const full = resolveInside(root, args[redirect + 1]);
      if (!fs.existsSync(path.dirname(full))) throw Error(`No such folder for ${args[redirect + 1]}`);
      if (args[redirect] === ">>") fs.appendFileSync(full, text);
      else fs.writeFileSync(full, text);
      return;
    }
    case "cp":
    case "mv": {
      if (args.length !== 2) throw Error(`${program} takes a source and a destination: ${line}`);
      const source = resolveInside(root, args[0]);
      let destination = resolveInside(root, args[1]);
      if (!fs.existsSync(source)) throw Error(`No such file: ${args[0]}`);
      if (fs.existsSync(destination) && fs.statSync(destination).isDirectory()) destination = path.join(destination, path.basename(source));
      if (program === "cp") {
        if (!fs.statSync(source).isFile()) throw Error(`cp copies files only here: ${line}`);
        fs.copyFileSync(source, destination);
      } else fs.renameSync(source, destination);
      return;
    }
    case "rm": {
      const recursive = args[0] === "-r";
      const targets = recursive ? args.slice(1) : args;
      if (targets.length !== 1) throw Error(`rm takes one path: ${line}`);
      const full = resolveInside(root, targets[0]);
      if (!fs.existsSync(full)) throw Error(`No such path: ${targets[0]}`);
      if (fs.statSync(full).isDirectory() && !recursive) throw Error(`rm needs -r for a folder: ${line}`);
      fs.rmSync(full, { recursive });
      return;
    }
    case "git": {
      const [subcommand, ...rest] = args;
      if (!GIT_SUBCOMMANDS.has(subcommand)) throw Error(`git ${subcommand ?? ""} is not allowed in a solution.`);
      if (rest.some((word) => GIT_FORBIDDEN.has(word))) throw Error(`That git option is not allowed in a solution: ${line}`);
      if (subcommand === "commit" && !rest.some((word) => word === "-m" || word === "-am")) throw Error(`git commit needs -m in a solution: ${line}`);
      if (subcommand === "config" && (rest.length !== 2 || !CONFIG_KEYS.has(rest[0]))) throw Error(`Only git config user.name or user.email may be set: ${line}`);
      for (const word of rest) if (!word.startsWith("-") && word.includes("/") && !safeRelative(word)) throw Error(`Path must stay inside the project: ${word}`);
      await runGit(root, args, env);
      return;
    }
    case "node": {
      // Runs a script the plan itself wrote, never model output, so a step can
      // prove what the script leaves behind in files.
      const [script, ...rest] = args;
      if (!script || !/\.m?js$/.test(script)) throw Error(`node runs a .js or .mjs file in a solution: ${line}`);
      const full = resolveInside(root, script);
      await new Promise((resolve, reject) => {
        execFile(process.execPath, [full, ...rest], { cwd: root, env, timeout: 10000, windowsHide: true, encoding: "utf8" }, (error, _stdout, stderr) => {
          if (error) reject(Error(`${line} failed: ${String(stderr || error.message).trim().slice(0, 300)}`));
          else resolve();
        });
      });
      return;
    }
    case "npm": {
      if (args.length === 1 && args[0] === "install") {
        if (!fs.existsSync(path.join(root, "node_modules"))) await installOnce(root);
        return;
      }
      if (args.length === 2 && args[0] === "run" && /^[a-z][a-z0-9:-]{0,30}$/.test(args[1])) {
        const run = await runNpm(root, args, { ...process.env, ...env, HOME: process.env.HOME ?? env.HOME, USERPROFILE: process.env.USERPROFILE ?? env.USERPROFILE });
        if (run.code !== 0) throw Error(`${line} failed: ${run.output.slice(-300)}`);
        return;
      }
      throw Error(`Only npm install and npm run <script> are allowed in a solution: ${line}`);
    }
    default:
      throw Error(`Command ${program} is not allowed in a solution.`);
  }
}

/**
 * A sealed Git environment for the gate: no user or system configuration, a
 * fixed clock, and no editor or credential prompt. Solutions must set their own
 * user.name and user.email, exactly as a learner on a fresh machine must.
 */
export function gateEnv(home) {
  const env = { ...process.env };
  for (const key of Object.keys(env)) if (key.startsWith("GIT_")) delete env[key];
  return {
    ...env,
    HOME: home,
    USERPROFILE: home,
    XDG_CONFIG_HOME: home,
    GIT_CONFIG_GLOBAL: path.join(home, "empty-gitconfig"),
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_AUTHOR_DATE: "2026-01-01T08:00:00+08:00",
    GIT_COMMITTER_DATE: "2026-01-01T08:00:00+08:00",
    GIT_MERGE_AUTOEDIT: "no",
    GIT_TERMINAL_PROMPT: "0",
    GIT_EDITOR: "false",
  };
}
