import type { Course } from "@/lib/lesson-ir";
import type { PracticeActivity } from "@/lib/practice-ir";

const pixel = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360'%3E%3Crect width='640' height='360' fill='%23dbeafe'/%3E%3C/svg%3E";

export const capstones: PracticeActivity[] = [
  {
    id: "capstone-service-directory", index: 1, projectId: "capstone-service-directory", sourceCourseId: "testing-devtools", sourceProjectId: "fare-test-case", mode: "capstone",
    title: "Barangay Service Directory", summary: "Build a phone-readable directory that helps a resident find and call essential local services.",
    task: "Create the directory from the brief. Choose your own visual design while meeting every named check.", kind: "web", inputMode: "free",
    files: { "index.html": "<!DOCTYPE html>\n<html>\n<head><title>Service Directory</title></head>\n<body>\n\n</body>\n</html>", "styles.css": "" }, activeFile: "index.html",
    tests: [
      { id: "directory-heading", kind: "text-not-empty", selector: "h1", label: "The directory has a clear page heading" },
      { id: "directory-skip", kind: "attr-equals", selector: ".skip-link", attr: "href", value: "#services", label: "A skip link reaches the service list" },
      { id: "directory-cards", kind: "count", selector: ".service-card", atLeast: 4, label: "At least four local services are listed" },
      { id: "directory-phone-links", kind: "count", selector: "a[href^='tel:']", atLeast: 4, label: "Every listed service has a phone link" },
      { id: "directory-focus", kind: "source-matches", file: "styles.css", pattern: ":focus-visible\\s*\\{[^}]*outline\\s*:", flags: "is", because: "Add a visible outline inside a focus-visible rule.", label: "Keyboard focus is visible" },
      { id: "directory-mobile", kind: "source-matches", file: "styles.css", pattern: "@media\\s*\\(\\s*max-width\\s*:\\s*480px\\s*\\)", flags: "i", because: "Add a small-screen media rule at 480 pixels or below.", label: "The directory has an authored phone layout" },
    ],
    constraints: [
      { id: "resident-path", label: "Fast resident path", description: "A heading, skip link, and four service cards must make the useful content easy to reach.", testIds: ["directory-heading", "directory-skip", "directory-cards"] },
      { id: "working-contact", label: "Working phone actions", description: "Each service must use a tel link. The check does not call the number.", testIds: ["directory-phone-links"] },
      { id: "access-layout", label: "Keyboard and phone support", description: "Author visible focus and a small-screen layout without claiming full device certification.", testIds: ["directory-focus", "directory-mobile"] },
    ], hints: [{ level: 1, text: "Start with the resident's shortest path: page heading, service list, then one clear call action per service." }], xp: 0, estimatedMinutes: 90,
    solution: {
      "index.html": "<!DOCTYPE html>\n<html>\n<head><title>Barangay Service Directory</title></head>\n<body>\n<a class=\"skip-link\" href=\"#services\">Skip to services</a>\n<header><h1>Barangay Service Directory</h1><p>Call the right local desk.</p></header>\n<main id=\"services\">\n<article class=\"service-card\"><h2>Health Centre</h2><a href=\"tel:+63280000001\">Call Health Centre</a></article>\n<article class=\"service-card\"><h2>Fire Station</h2><a href=\"tel:+63280000002\">Call Fire Station</a></article>\n<article class=\"service-card\"><h2>Barangay Desk</h2><a href=\"tel:+63280000003\">Call Barangay Desk</a></article>\n<article class=\"service-card\"><h2>Rescue Team</h2><a href=\"tel:+63280000004\">Call Rescue Team</a></article>\n</main>\n</body>\n</html>",
      "styles.css": "body { font-family: system-ui; margin: 0; padding: 24px; }\n#services { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }\n.service-card { border: 1px solid #94a3b8; padding: 16px; }\n:focus-visible { outline: 3px solid #0f766e; outline-offset: 3px; }\n@media (max-width: 480px) { #services { grid-template-columns: 1fr; } }",
    },
  },
  {
    id: "capstone-fare-planner", index: 2, projectId: "capstone-fare-planner", sourceCourseId: "dom-basics", sourceProjectId: "barangay-help", mode: "capstone",
    title: "Daily Fare Planner", summary: "Build a small browser tool that turns two resident inputs into a clear daily transport total.",
    task: "Create the planner from the brief. The result must update only after the learner activates the button.", kind: "web", inputMode: "free",
    files: { "index.html": "<main></main>", "styles.css": "", "script.js": "" }, activeFile: "index.html",
    tests: [
      { id: "fare-rides", kind: "exists", selector: "#rides", label: "The planner asks for the number of rides" },
      { id: "fare-cost", kind: "exists", selector: "#fare", label: "The planner asks for the fare per ride" },
      { id: "fare-button", kind: "exists", selector: "#calculate", label: "The planner has a calculate button" },
      { id: "fare-live-result", kind: "attr-equals", selector: "#total", attr: "aria-live", value: "polite", label: "The result is announced politely" },
      { id: "fare-calculation", kind: "page-click-text-equals", clickSelector: "#calculate", selector: "#total", value: "PHP 26", label: "Two rides at PHP 13 produce PHP 26" },
      { id: "fare-event", kind: "source-matches", file: "script.js", pattern: "addEventListener\\(\\s*[\"']click[\"']", because: "Attach a click event listener to the calculate button.", label: "The button uses a click event listener" },
    ],
    constraints: [
      { id: "real-inputs", label: "Resident-controlled inputs", description: "Use two labelled number inputs rather than fixed values in the script.", testIds: ["fare-rides", "fare-cost"] },
      { id: "button-result", label: "Explicit calculation", description: "Calculate on button activation and announce the result without a page reload.", testIds: ["fare-button", "fare-live-result", "fare-calculation", "fare-event"] },
    ], hints: [{ level: 1, text: "Build and label the two inputs before connecting the button to the result." }], xp: 0, estimatedMinutes: 90,
    solution: {
      "index.html": "<main><h1>Daily Fare Planner</h1><label>Rides <input id=\"rides\" type=\"number\" value=\"2\"></label><label>Fare per ride <input id=\"fare\" type=\"number\" value=\"13\"></label><button id=\"calculate\" type=\"button\">Calculate</button><p id=\"total\" aria-live=\"polite\">PHP 0</p></main>",
      "styles.css": "body { font-family: system-ui; padding: 24px; }\nmain { max-width: 360px; }\nlabel { display: block; margin-block: 12px; }\nbutton, input { min-height: 44px; }",
      "script.js": "const rides = document.querySelector(\"#rides\");\nconst fare = document.querySelector(\"#fare\");\nconst total = document.querySelector(\"#total\");\ndocument.querySelector(\"#calculate\").addEventListener(\"click\", () => {\n  total.textContent = `PHP ${Number(rides.value) * Number(fare.value)}`;\n});",
    },
  },
  {
    id: "capstone-evacuation-queue", index: 3, projectId: "capstone-evacuation-queue", sourceCourseId: "react-basics", sourceProjectId: "barangay-queue-counter", mode: "capstone",
    title: "Evacuation Centre Queue Board", summary: "Build a React board that shows a starting queue and updates the count when a family is added.",
    task: "Create the queue board from the brief. Keep its status readable before and after the interaction.", kind: "react", inputMode: "free",
    files: { "app.js": "function App() {\n  return null;\n}" }, activeFile: "app.js",
    tests: [
      { id: "queue-heading", kind: "react-text-equals", selector: "h1", value: "Evacuation Centre Queue", label: "The board has the required heading" },
      { id: "queue-initial", kind: "react-text-equals", selector: "[data-testid='queue-count']", value: "2 families waiting", label: "The starting queue shows two families" },
      { id: "queue-list", kind: "react-exists", selector: "ol li:nth-child(2)", label: "The board lists both starting families" },
      { id: "queue-live", kind: "react-attr-equals", selector: "[data-testid='queue-count']", attr: "aria-live", value: "polite", label: "Queue changes are announced politely" },
      { id: "queue-add", kind: "react-click-text-equals", clickSelector: "button", selector: "[data-testid='queue-count']", value: "3 families waiting", label: "Adding one family updates the count to three" },
    ],
    constraints: [
      { id: "queue-state", label: "Visible state", description: "Show the starting people and update the visible count through React state.", testIds: ["queue-initial", "queue-list", "queue-add"] },
      { id: "queue-announcement", label: "Polite status update", description: "The changing count must carry an aria-live status.", testIds: ["queue-live"] },
    ], hints: [{ level: 1, text: "Keep the family list as state, then derive the visible count from that list." }], xp: 0, estimatedMinutes: 100,
    solution: {
      "app.js": "function App() {\n  const [families, setFamilies] = React.useState([\"Santos\", \"Reyes\"]);\n  const addFamily = () => setFamilies((current) => [...current, `Family ${current.length + 1}`]);\n  return React.createElement(\"main\", null,\n    React.createElement(\"h1\", null, \"Evacuation Centre Queue\"),\n    React.createElement(\"p\", { \"data-testid\": \"queue-count\", \"aria-live\": \"polite\" }, `${families.length} families waiting`),\n    React.createElement(\"ol\", null, families.map((name) => React.createElement(\"li\", { key: name }, name))),\n    React.createElement(\"button\", { onClick: addFamily }, \"Add family\")\n  );\n}",
    },
  },
  {
    id: "capstone-relief-tracker", index: 4, projectId: "capstone-relief-tracker", sourceCourseId: "typescript-react", sourceProjectId: "typed-help-desk", mode: "capstone",
    title: "Relief Request Tracker", summary: "Build a typed React filter that helps a volunteer find requests by item or family name.",
    task: "Create the tracker from the brief. Use a declared request type and keep the result count clear while filtering.", kind: "react", inputMode: "free",
    files: { "app.tsx": "function App() {\n  return null;\n}" }, activeFile: "app.tsx",
    tests: [
      { id: "relief-heading", kind: "react-text-equals", selector: "h1", value: "Relief Request Tracker", label: "The tracker has the required heading" },
      { id: "relief-search", kind: "react-attr-equals", selector: "input", attr: "aria-label", value: "Search relief requests", label: "The search input has a clear accessible name" },
      { id: "relief-list", kind: "react-exists", selector: "ul li:nth-child(3)", label: "Three starting relief requests are listed" },
      { id: "relief-filter", kind: "react-input-text-equals", inputSelector: "input", inputValue: "water", selector: "[data-testid='result-count']", value: "1 request", label: "Searching water leaves one request" },
      { id: "relief-type", kind: "source-matches", file: "app.tsx", pattern: "(?:type|interface)\\s+ReliefRequest", because: "Declare a ReliefRequest type or interface for the request records.", label: "The request records use a declared TypeScript type" },
    ],
    constraints: [
      { id: "typed-records", label: "Typed request records", description: "Declare the shape of each relief request before using the data.", testIds: ["relief-type"] },
      { id: "usable-filter", label: "Named, working filter", description: "A volunteer can identify the search field and see the filtered count.", testIds: ["relief-search", "relief-filter"] },
    ], hints: [{ level: 1, text: "Declare the request record shape first, then filter one typed array from the search value." }], xp: 0, estimatedMinutes: 110,
    solution: {
      "app.tsx": "type ReliefRequest = { id: number; family: string; item: string };\nconst requests: ReliefRequest[] = [\n  { id: 1, family: \"Santos\", item: \"Rice\" },\n  { id: 2, family: \"Reyes\", item: \"Water\" },\n  { id: 3, family: \"Cruz\", item: \"Medicine\" },\n];\nfunction App() {\n  const [query, setQuery] = React.useState(\"\");\n  const filtered = requests.filter((request) => `${request.family} ${request.item}`.toLowerCase().includes(query.toLowerCase()));\n  return <main><h1>Relief Request Tracker</h1><label>Search <input aria-label=\"Search relief requests\" value={query} onChange={(event) => setQuery(event.target.value)} /></label><p data-testid=\"result-count\">{filtered.length} {filtered.length === 1 ? \"request\" : \"requests\"}</p><ul>{filtered.map((request) => <li key={request.id}>{request.family}: {request.item}</li>)}</ul></main>;\n}",
    },
  },
  {
    id: "capstone-portfolio", index: 5, projectId: "capstone-portfolio", sourceCourseId: "testing-devtools", sourceProjectId: "fare-test-case", mode: "capstone",
    requiresActivityIds: ["capstone-service-directory", "capstone-fare-planner", "capstone-evacuation-queue", "capstone-relief-tracker"],
    title: "Your Front-End Portfolio", summary: "Build the final site that presents the other four capstones and links to exact learning evidence.",
    task: "Create your portfolio from the authored brief. Choose the visual direction; the checks enforce usefulness, access, responsiveness, and honest proof.", kind: "web", inputMode: "free",
    files: { "index.html": "<!DOCTYPE html>\n<html>\n<head><title>Front-End Portfolio</title></head>\n<body>\n\n</body>\n</html>", "styles.css": "" }, activeFile: "index.html",
    tests: [
      { id: "portfolio-heading", kind: "text-not-empty", selector: "h1", label: "The portfolio says who the learner is" },
      { id: "portfolio-intro", kind: "source-matches", file: "index.html", pattern: "class=[\"']intro[\"'][^>]*>\\s*(?:\\S+\\s+){1,19}\\S+\\s*<", flags: "i", because: "Add an intro with the intro class and keep it under about 20 words.", label: "The introduction is one short plain sentence" },
      { id: "portfolio-email", kind: "attr", selector: "a[href^='mailto:']", attr: "href", nonEmpty: true, label: "The portfolio has a working email link" },
      { id: "portfolio-github", kind: "source-matches", file: "index.html", pattern: "href=[\"']https://github\\.com/[^/\"']+/?[\"']", flags: "i", because: "Link to a public GitHub profile.", label: "The portfolio links to a GitHub profile" },
      { id: "portfolio-projects", kind: "count", selector: ".project-card", atLeast: 4, label: "Four capstone projects are shown" },
      { id: "portfolio-images", kind: "count", selector: ".project-card img[alt]", atLeast: 4, label: "Every project has a described image" },
      { id: "portfolio-live-links", kind: "count", selector: ".project-card .live-link[href^='https://']", atLeast: 4, label: "Every project has a live link shape" },
      { id: "portfolio-repo-links", kind: "count", selector: ".project-card .repo-link[href^='https://github.com/']", atLeast: 4, label: "Every project has a repository link shape" },
      { id: "portfolio-case-study", kind: "source-matches", file: "index.html", pattern: "id=[\"']problem[\"'][\\s\\S]*id=[\"']what-i-built[\"'][\\s\\S]*id=[\"']decision[\"'][\\s\\S]*id=[\"']change-next[\"']", flags: "i", because: "Include the problem, what you built, one decision, and what you would change, in that order.", label: "One project has all four case-study parts" },
      { id: "portfolio-proof", kind: "attr-equals", selector: ".proof-link", attr: "href", value: "codedaddy-learning-proof.html", label: "The portfolio links to the exported proof file" },
      { id: "portfolio-learning-next", kind: "text-not-empty", selector: "#learning-next", label: "The portfolio says what the learner is learning next" },
      { id: "portfolio-no-form", kind: "source-matches", file: "index.html", pattern: "^(?![\\s\\S]*<form\\b)[\\s\\S]*$", flags: "i", because: "Use working email and GitHub links. Do not add a contact form with no backend.", label: "The portfolio does not include a dead contact form" },
      { id: "portfolio-phone", kind: "source-matches", file: "styles.css", pattern: "@media\\s*\\(\\s*max-width\\s*:\\s*360px\\s*\\)", flags: "i", because: "Add a media rule for screens 360 pixels wide or narrower.", label: "A 360-pixel layout rule is authored" },
      { id: "portfolio-focus", kind: "source-matches", file: "styles.css", pattern: ":focus-visible\\s*\\{[^}]*outline\\s*:", flags: "is", because: "Add a visible outline in a focus-visible rule.", label: "Keyboard focus is visible" },
      { id: "portfolio-motion", kind: "source-matches", file: "styles.css", pattern: "@media\\s*\\(\\s*prefers-reduced-motion\\s*:\\s*reduce\\s*\\)", flags: "i", because: "Add a reduced-motion media rule even if the current design uses little motion.", label: "Reduced-motion preference is respected" },
    ],
    constraints: [
      { id: "plain-intro", label: "Plain introduction", description: "Use one heading and a short sentence with no unsupported experience claim.", testIds: ["portfolio-heading", "portfolio-intro"] },
      { id: "real-contact", label: "Working contact", description: "Use mailto and GitHub links, not a form that goes nowhere.", testIds: ["portfolio-email", "portfolio-github", "portfolio-no-form"] },
      { id: "project-shelf", label: "Four-project shelf", description: "Each capstone needs a described image and URL-shaped live and repository links. A connection is still required to confirm those destinations resolve.", testIds: ["portfolio-projects", "portfolio-images", "portfolio-live-links", "portfolio-repo-links"] },
      { id: "case-study-proof", label: "Inspectable evidence", description: "Include one honest case study and the exported browser proof file.", testIds: ["portfolio-case-study", "portfolio-proof"] },
      { id: "access-responsive", label: "Access and phone layout", description: "Author a 360-pixel layout, visible focus, and reduced-motion rule. These checks do not claim full device certification.", testIds: ["portfolio-phone", "portfolio-focus", "portfolio-motion"] },
    ], hints: [{ level: 1, text: "Organize the page around four questions: who you are, what you built, what the evidence shows, and how to contact you." }], xp: 0, estimatedMinutes: 180,
    solution: {
      "index.html": `<!DOCTYPE html>\n<html>\n<head><title>Ana Reyes — Front-End Developer</title></head>\n<body>\n<header><h1>Ana builds clear, useful web interfaces.</h1><p class="intro">I build accessible front-end projects for everyday community needs.</p><a href="mailto:ana@example.com">Email Ana</a><a href="https://github.com/ana-reyes">GitHub profile</a></header>\n<main><section aria-labelledby="projects-title"><h2 id="projects-title">Projects</h2>\n${[1,2,3,4].map((n) => `<article class="project-card"><img src="${pixel}" alt="Preview of project ${n}"><h3>Capstone ${n}</h3><p>A practical front-end project for a local need.</p><a class="live-link" href="https://example.com/project-${n}">Live project</a><a class="repo-link" href="https://github.com/ana-reyes/project-${n}">Repository</a></article>`).join("\n")}\n</section>\n<section><h2>Case study</h2><h3 id="problem">The problem</h3><p>Residents needed a faster path to service contacts.</p><h3 id="what-i-built">What I built</h3><p>I built a phone-readable directory.</p><h3 id="decision">One decision</h3><p>I used direct phone links so the main action works without a form.</p><h3 id="change-next">What I would change</h3><p>I would test the service labels with more residents.</p></section>\n<section><h2>Learning proof</h2><p>This is browser-generated course completion evidence, not employment certification.</p><a class="proof-link" href="codedaddy-learning-proof.html">Open learning proof</a></section>\n<section id="learning-next"><h2>Learning next</h2><p>I am learning server-side validation next.</p></section></main>\n</body>\n</html>`,
      "styles.css": "body { font-family: system-ui; margin: 0; padding: 24px; line-height: 1.6; }\nmain, header { max-width: 960px; margin-inline: auto; }\n.project-card { border: 1px solid #94a3b8; padding: 16px; margin-block: 16px; }\n.project-card img { max-width: 100%; height: auto; }\na { display: inline-block; min-height: 44px; margin-right: 16px; }\n:focus-visible { outline: 3px solid #0f766e; outline-offset: 3px; }\n@media (max-width: 360px) { body { padding: 12px; } }\n@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto; } }",
    },
  },
];

export const capstoneCourse: Course = {
  id: "capstones", title: "Front-End Development Capstones", project: "Independent Capstones", projects: capstones.map((capstone) => ({ id: capstone.id, title: capstone.title })), order: 12,
  summary: "Five independent projects with authored briefs and automated acceptance checks.", requires: [], kind: "web", steps: capstones,
};

export const capstoneIds = capstones.map((capstone) => capstone.id);
