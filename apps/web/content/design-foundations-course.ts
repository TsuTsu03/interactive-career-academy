import type { Course, Step, TestSpec } from "@/lib/lesson-ir";

interface DesignAction {
  target: "page" | "panel" | "eyebrow" | "title" | "copy" | "support" | "action";
  token: string;
  declaration: string;
  task: string;
  label: string;
}

interface DesignTopic {
  id: string;
  conceptId: string;
  title: string;
  actions: DesignAction[];
}

const commonActions = (prefix: string, declarations: string[]): DesignAction[] => [
  { target: "title", token: `${prefix}-title`, declaration: declarations[0], task: "Make the main heading lead the reading order.", label: "The heading leads the page" },
  { target: "eyebrow", token: `${prefix}-eyebrow`, declaration: declarations[1], task: "Keep the short context line useful but quieter than the heading.", label: "The context line supports the heading" },
  { target: "copy", token: `${prefix}-copy`, declaration: declarations[2], task: "Make the explanation comfortable to scan and read.", label: "The explanation is easy to read" },
  { target: "support", token: `${prefix}-support`, declaration: declarations[3], task: "Separate the supporting detail without hiding it.", label: "The supporting detail has a clear place" },
  { target: "action", token: `${prefix}-action`, declaration: declarations[4], task: "Make the next action easy to find and use.", label: "The next action is clear" },
  { target: "panel", token: `${prefix}-panel`, declaration: declarations[5], task: "Finish the panel so every part feels like one deliberate system.", label: "The panel uses one coherent design" },
];

const topics: DesignTopic[] = [
  { id: "hierarchy", conceptId: "design-visual-hierarchy", title: "Barangay Service Hierarchy", actions: commonActions("hierarchy", ["font-size:2.25rem;font-weight:800;line-height:1.05", "font-size:.75rem;text-transform:uppercase;letter-spacing:.12em;color:#475569", "font-size:1rem;line-height:1.6", "font-size:.875rem;color:#475569", "display:inline-block;background:#1d4ed8;color:white;padding:.75rem 1rem;font-weight:700", "max-width:36rem;padding:2rem;border:1px solid #cbd5e1"]) },
  { id: "type-scale", conceptId: "design-type-scale", title: "Clinic Type Scale", actions: commonActions("type-scale", ["font-size:2rem;line-height:1.1", "font-size:.75rem", "font-size:1rem", "font-size:.875rem", "font-size:1rem;font-weight:700", "font-size:1rem"]) },
  { id: "spacing-scale", conceptId: "design-spacing-scale", title: "Cooperative Spacing Scale", actions: commonActions("spacing", ["margin:0 0 1rem", "margin:0 0 .5rem", "margin:0 0 1rem", "margin:0 0 1.5rem", "padding:.75rem 1rem", "padding:2rem"]) },
  { id: "proximity", conceptId: "design-proximity", title: "Health Desk Proximity", actions: commonActions("proximity", ["margin-bottom:.5rem", "margin-bottom:.25rem", "margin-bottom:1.5rem", "margin-bottom:.5rem", "margin-top:1.5rem", "display:flex;flex-direction:column"]) },
  { id: "alignment", conceptId: "design-alignment", title: "Jeepney Route Alignment", actions: commonActions("alignment", ["text-align:left", "text-align:left", "text-align:left", "text-align:left", "align-self:flex-start", "display:flex;flex-direction:column;align-items:flex-start"]) },
  { id: "whitespace", conceptId: "design-whitespace", title: "Sari-Sari Whitespace", actions: commonActions("whitespace", ["margin-bottom:1rem", "margin-bottom:.5rem", "margin-bottom:1.25rem", "margin-bottom:1.5rem", "padding:.75rem 1rem", "padding:2.5rem"]) },
  { id: "measure", conceptId: "design-readable-measure", title: "Evacuation Guide Measure", actions: commonActions("measure", ["max-width:18ch", "max-width:24ch", "max-width:60ch", "max-width:52ch", "max-width:max-content", "max-width:42rem"]) },
  { id: "contrast", conceptId: "design-contrast-ratio", title: "Pharmacy Contrast Check", actions: commonActions("contrast", ["color:#0f172a", "color:#334155", "color:#1e293b", "color:#334155", "background:#0f172a;color:#fff", "background:#fff;color:#0f172a"]) },
  { id: "semantic-colour", conceptId: "design-semantic-colour", title: "Relief Status Colours", actions: commonActions("semantic", ["color:#1e3a8a", "color:#1d4ed8", "color:#1e293b", "color:#166534", "background:#1d4ed8;color:white", "border-top:4px solid #1d4ed8"]) },
  { id: "status-cue", conceptId: "design-status-cue", title: "Water Service Status", actions: commonActions("status", ["display:flex;align-items:center;gap:.5rem", "font-weight:700", "line-height:1.5", "font-weight:700", "text-decoration:underline", "border-left:4px solid #166534"]) },
  { id: "focus", conceptId: "design-focus-indicator", title: "Library Keyboard Focus", actions: commonActions("focus", ["outline-offset:.2rem", "font-weight:800", "line-height:1.6", "color:#334155", "outline:3px solid #f59e0b;outline-offset:3px", "border:1px solid #94a3b8"]) },
  { id: "touch", conceptId: "design-touch-target", title: "Mobile Payment Target", actions: commonActions("touch", ["line-height:1.2", "font-size:.875rem", "line-height:1.6", "min-height:2.75rem", "min-height:2.75rem;min-width:2.75rem;padding:.75rem 1rem", "padding:1.25rem"]) },
  { id: "reflow", conceptId: "design-responsive-reflow", title: "Market Mobile Reflow", actions: commonActions("reflow", ["overflow-wrap:anywhere", "display:block", "max-width:60ch", "display:block", "display:block;width:100%;box-sizing:border-box;text-align:center", "display:flex;flex-direction:column;gap:1rem"]) },
  { id: "empty", conceptId: "design-empty-state", title: "Project Shelf Empty State", actions: commonActions("empty", ["font-size:1.75rem", "display:block;color:#475569", "max-width:50ch", "font-weight:700", "display:inline-block;margin-top:1rem", "text-align:center;padding:2.5rem"]) },
  { id: "tokens", conceptId: "design-token", title: "Barangay Design Tokens", actions: commonActions("token", ["color:var(--ink)", "color:var(--muted)", "color:var(--ink)", "color:var(--muted)", "background:var(--action);color:var(--surface)", "background:var(--surface);padding:var(--space)"]) },
];

const practiceNames = [
  "Community Pantry", "Barangay Clinic", "Transport Desk", "Public Library", "Water District",
  "Local Cooperative", "Evacuation Centre", "Public Market", "School Office", "Health Centre",
  "Permit Counter", "Payment Kiosk", "Mobile Directory", "Project Gallery", "Service Portal",
];

function baseFiles(name: string, topic: DesignTopic): Record<string, string> {
  const rules = topic.actions.map((action) => `.${action.token}{${action.declaration}}`).join("\n");
  return {
    "index.html": `<main class="page"><article class="panel"><p class="eyebrow">Public service</p><h1 class="title">${name}</h1><p class="copy">Find the information you need and complete one clear task.</p><p class="support">Open weekdays from 8:00 AM to 5:00 PM.</p><a class="action" href="#next">Continue</a></article></main>`,
    "styles.css": `:root{--ink:#0f172a;--muted:#475569;--action:#1d4ed8;--surface:#fff;--space:2rem}*{box-sizing:border-box}body{margin:0;padding:1rem;font-family:system-ui,sans-serif;background:#f1f5f9;color:#0f172a}.page{min-height:100vh;display:grid;place-items:center}.panel{width:min(100%,42rem);background:white}.panel *{box-sizing:border-box}.action{text-decoration:none;border-radius:.35rem}${rules}`,
  };
}

function addClass(html: string, target: string, token: string): string {
  const marker = `class="${target}`;
  if (!html.includes(marker)) throw new Error(`Design course target ${target} is missing.`);
  return html.replace(marker, `class="${target} ${token}`);
}

const projects: Course["projects"] = [];
const steps: Step[] = [];
let index = 1;

for (const [topicIndex, topic] of topics.entries()) {
  for (let practice = 0; practice < 2; practice++) {
    const projectId = `${topic.id}-${practice === 0 ? "guided" : "practice"}`;
    const projectTitle = practice === 0 ? topic.title : `${practiceNames[topicIndex]} ${topic.title.split(" ").slice(-2).join(" ")}`;
    projects.push({ id: projectId, title: projectTitle });
    let files = baseFiles(projectTitle, topic);

    for (const [stageIndex, action] of topic.actions.entries()) {
      const solution = {
        ...files,
        "index.html": addClass(files["index.html"], action.target, action.token),
      };
      const test: TestSpec = {
        id: `${projectId}-${action.token}`,
        kind: "source-matches",
        file: "index.html",
        pattern: `class="[^"]*\\b${action.token}\\b`,
        because: `Add the ${action.token} class to the ${action.target} element.`,
        label: action.label,
      };
      steps.push({
        id: `${projectId}-${stageIndex + 1}`,
        index: index++,
        projectId,
        task: action.task,
        kind: "web",
        inputMode: "guided",
        files,
        activeFile: "index.html",
        highlightToken: `class="${action.target}`,
        tests: [test],
        hints: [
          { level: 1, text: "Use the prepared class whose name matches this design job." },
          { level: 2, text: `Add ${action.token} to the ${action.target} class list.` },
        ],
        xp: practice === 0 ? 45 : 55,
        estimatedMinutes: practice === 0 ? 4 : 5,
        conceptIds: practice === 0 && stageIndex === 0 ? [topic.conceptId] : undefined,
        solution,
      });
      files = solution;
    }
  }
}

export const designFoundationsCourse: Course = {
  id: "design-foundations",
  title: "Learn Design Foundations by Improving Public-Service Pages",
  project: projects[0].title,
  projects,
  order: 2,
  summary: "Learn why an interface works before learning the CSS used to build it.",
  requires: ["html-basics"],
  kind: "web",
  steps,
};
