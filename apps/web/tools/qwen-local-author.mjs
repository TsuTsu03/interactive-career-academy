// Local-model authoring for the computer courses (PLAN.md decisions 43, 45).
//
// Called by run-qwen-v2-loop.ps1 for one batch of five steps. The commands,
// code, checks, starting files, step ids, and concepts come from the course's
// plan file (tools/cli-git-plan.mjs, tools/node-basics-plan.mjs) and never
// from the model. The model writes only the learner-facing words: each
// step's task, two hints, and a time estimate. Everything it returns is plain
// JSON, validated here, and serialised into the course's content file.
// `npm run check:content` then replays every step in a throwaway folder
// before the batch is accepted.

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { cliGitProjects } from "./cli-git-plan.mjs";
import { nodeBasicsProjects } from "./node-basics-plan.mjs";
import { apiBasicsProjects } from "./api-basics-plan.mjs";

const BATCH = 5;

export const LOCAL_COURSES = {
  "cli-git": { projects: cliGitProjects, symbol: "cliGitCourse", title: "Command Line and Git" },
  "node-basics": { projects: nodeBasicsProjects, symbol: "nodeBasicsCourse", title: "Node.js Fundamentals" },
  "api-basics": { projects: apiBasicsProjects, symbol: "apiBasicsCourse", title: "Building APIs" },
};

/** The lines of `next` that are new or changed compared with `previous`. */
function changedLines(previous, next) {
  const before = new Set(previous.split("\n").map((line) => line.trimEnd()));
  return next.split("\n").map((line) => line.trimEnd()).filter((line) => line.trim() && !before.has(line));
}

function plainText(value) {
  // Product copy avoids long dashes; keep the sentence, change the mark.
  return value.replace(/\s*[—–]\s*/g, ", ").replace(/[“”]/g, '"').replace(/[‘’]/g, "'").trim();
}

async function requestModel({ endpoint, model, system, user, schema, retrying, receiptPath }) {
  const body = {
    model,
    messages: [{ role: "system", content: system }, { role: "user", content: user }],
    temperature: retrying ? 0.5 : 0.3,
    max_tokens: 5000,
    // Streamed so the headers arrive at once; a slow model otherwise trips
    // undici's fixed five-minute header timeout. See run-qwen-v2-loop.ps1.
    stream: true,
    response_format: { type: "json_schema", json_schema: { name: "local_course_batch", strict: true, schema } },
  };
  const response = await fetch(`${endpoint.replace(/\/$/, "")}/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(1800000),
  });
  if (!response.ok) throw Error(`LM Studio returned HTTP ${response.status}: ${(await response.text()).slice(0, 500)}`);
  let raw = "";
  let pending = "";
  let finish = null;
  const decoder = new TextDecoder();
  for await (const chunk of response.body) {
    pending += decoder.decode(chunk, { stream: true });
    const lines = pending.split("\n");
    pending = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (payload === "[DONE]") continue;
      let parsed;
      try { parsed = JSON.parse(payload); } catch { throw Error("LM Studio sent a stream chunk that is not JSON."); }
      const choice = parsed.choices?.[0];
      if (typeof choice?.delta?.content === "string") raw += choice.delta.content;
      if (choice?.finish_reason) finish = choice.finish_reason;
      if (raw.length > 100000) throw Error("Oversized model result.");
    }
  }
  fs.writeFileSync(`${receiptPath}.model.txt`, raw);
  if (finish === "length") throw Error("Model output was truncated; no changes applied.");
  try { return JSON.parse(raw.trim()); } catch { throw Error("Model did not return one JSON object. No batch applied."); }
}

export async function authorLocalBatch({ root, courseId = "cli-git", courseFile, logFile, projectId, endpoint, model, promptPath, receiptPath }) {
  const local = LOCAL_COURSES[courseId];
  if (!local) throw Error(`${courseId} is not a local course.`);
  const resolve = (file) => path.join(root, file);
  await import(pathToFileURL(resolve("apps/web/tools/content-loader.mjs")));
  const { curriculum } = await import(pathToFileURL(resolve("apps/web/content/curriculum.ts")));
  const { concepts } = await import(pathToFileURL(resolve("apps/web/content/concepts.ts")));
  const { checkShape } = await import(pathToFileURL(resolve("apps/web/lib/content-shape.ts")));
  const course = curriculum.courses.find((item) => item.id === courseId);
  if (!course) throw Error(`${courseId} is not registered.`);

  const project = local.projects.find((item) => item.id === projectId);
  if (!project) throw Error(`Unknown ${courseId} project ${projectId}.`);
  const done = course.steps.filter((step) => step.projectId === project.id).length;
  if (done !== 0 && done !== BATCH) throw Error(`${project.id} has ${done} steps; expected 0 or 5.`);
  const planned = project.steps.slice(done, done + BATCH);
  // What each step asks the learner to type into a file: the lines that are
  // new or changed compared with the files as the previous step left them.
  const current = { ...project.seed };
  for (const step of project.steps.slice(0, done)) Object.assign(current, step.files ?? {});
  const edits = planned.map((step) => {
    const list = Object.entries(step.files ?? {}).map(([path, text]) => ({ file: path, lines: changedLines(current[path] ?? "", text) }));
    Object.assign(current, step.files ?? {});
    return list.filter((edit) => edit.lines.length);
  });

  const first = done === 0;
  const context = {
    course: local.title,
    project: project.title,
    setting: project.place,
    skill: project.track,
    batch: first ? "steps 1-5 of 10" : "steps 6-10 of 10",
    learnerStartsWith: first
      ? "an empty folder where they ran the checker's start command, which created these files: " + Object.keys(project.seed).join(", ")
      : "the folder exactly as step 5 left it",
    steps: planned.map((step, i) => ({
      id: step.id,
      stepNumber: done + i + 1,
      goal: step.goal,
      ...(step.where ? { where: step.where } : {}),
      ...(edits[i].length ? { codeToType: edits[i] } : {}),
      commands: step.commands,
      checkerConfirms: step.tests.map((test) => test.label),
      newTerm: step.conceptId ? { term: concepts[step.conceptId].term, meaning: concepts[step.conceptId].definition } : null,
    })),
  };
  const priorReceipt = receiptPath.replace(/-attempt-2\.json$/, "-attempt-1.json");
  if (priorReceipt !== receiptPath && fs.existsSync(`${priorReceipt}.log`)) {
    context.previousAttemptWasRejectedBecause = fs.readFileSync(`${priorReceipt}.log`, "utf8").slice(-600);
  }

  const ids = planned.map((step) => step.id);
  const schema = {
    type: "object",
    additionalProperties: false,
    required: ["steps"],
    properties: {
      steps: {
        type: "array",
        minItems: BATCH,
        maxItems: BATCH,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["id", "task", "hints", "estimatedMinutes"],
          properties: {
            id: { type: "string", enum: ids },
            task: { type: "string", minLength: 80, maxLength: 900 },
            hints: { type: "array", minItems: 2, maxItems: 2, items: { type: "string", minLength: 15, maxLength: 400 } },
            estimatedMinutes: { type: "integer", minimum: 2, maximum: 8 },
          },
        },
      },
    },
  };

  const system = fs.readFileSync(promptPath, "utf8");
  const data = await requestModel({ endpoint, model, system, user: JSON.stringify(context), schema, retrying: /-attempt-[2-9]\.json$/.test(receiptPath), receiptPath });
  if (!data || !Array.isArray(data.steps) || data.steps.length !== BATCH) throw Error(`A batch needs exactly ${BATCH} steps.`);

  const generated = planned.map((plan, i) => {
    const draft = data.steps[i];
    if (!draft || draft.id !== plan.id) throw Error(`Step ${i + 1} must have id ${plan.id}, in order.`);
    let task = plainText(String(draft.task));
    const hints = draft.hints.map((hint) => plainText(String(hint)));
    // Code is shown in a fenced block after the prose, exactly as the plan
    // wrote it: code can itself contain backticks, and a small model does not
    // copy it reliably. The prompt asks the model to describe the change and
    // leave the code to this block.
    for (const edit of edits[i]) {
      const block = `\n\nIn ${edit.file}:\n\`\`\`\n${edit.lines.join("\n")}\n\`\`\``;
      task += block;
      for (const line of edit.lines) {
        if (line.trim().length > 12 && hints[0].includes(line.trim())) throw Error(`${plan.id}: hint 1 gives away the exact code; it must only point toward it.`);
      }
      hints[1] += block;
    }
    // The learner must see the exact command. If the prose paraphrased it,
    // add it verbatim rather than let the step ship without it.
    const missing = plan.commands.filter((command) => !task.includes(command));
    if (missing.length) task += `\n\nType ${missing.length === 1 ? "this command" : "these commands"} in your terminal:\n${missing.map((command) => `\`${command}\``).join("\n")}`;
    for (const command of plan.commands) {
      if (hints[0].includes(command)) throw Error(`${plan.id}: hint 1 gives away the exact command; it must only point toward it.`);
    }
    if (!plan.commands.every((command) => hints[1].includes(command))) hints[1] += ` The command is: ${plan.commands.map((command) => `\`${command}\``).join(" then ")}`;
    if (/\b(simply|simple|just|easy|obviously)\b/i.test(`${task} ${hints.join(" ")}`)) throw Error(`${plan.id}: avoid words like simply, simple, just, easy, or obviously; they make a stuck learner feel worse.`);
    return {
      id: plan.id,
      index: course.steps.length + i + 1,
      task,
      kind: "local",
      inputMode: "free",
      files: { "report.txt": "" },
      activeFile: "report.txt",
      localSeed: project.seed,
      tests: plan.tests,
      hints: hints.map((text, level) => ({ level: level + 1, text })),
      xp: 10,
      solution: { "commands.txt": plan.commands.join("\n") },
      ...(plan.files ? { localFiles: plan.files } : {}),
      ...(plan.conceptId ? { conceptIds: [plan.conceptId] } : {}),
      estimatedMinutes: draft.estimatedMinutes,
      projectId: project.id,
    };
  });

  for (const step of generated) {
    const findings = checkShape(step).filter((finding) => finding.severity === "error");
    if (findings.length) throw Error(`${step.id}: ${findings.map((finding) => finding.message).join("; ")}`);
  }

  // JSON is the only route from model output into TypeScript.
  const addition = `\n// Validated local authoring batch: ${project.id}.\n${local.symbol}.steps.push(...(${JSON.stringify(generated, null, 2)} satisfies typeof ${local.symbol}.steps));\n`;
  fs.writeFileSync(resolve(courseFile), fs.readFileSync(resolve(courseFile), "utf8") + addition);
  const date = new Date().toISOString().slice(0, 10);
  fs.appendFileSync(resolve(logFile), `\n- ${date}: Local Qwen wrote the lesson text for ${courseId}/${project.id}, steps ${generated[0].index}-${generated.at(-1).index}; code, commands, and checks come from the course plan and were replayed by check:content before acceptance.\n`);
  console.log(JSON.stringify({ added: generated.length, selected: course.steps.length + generated.length }));
}
