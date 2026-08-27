import type { Course, Step } from "@/lib/lesson-ir";

const PROJECT_ID = "barangay-help-desk-heading";
const PROJECT_2_ID = "barangay-service-card";
const PROJECT_3_ID = "barangay-notice-list";
const PROJECT_4_ID = "barangay-office-status";
const PROJECT_5_ID = "barangay-queue-counter";
const PROJECT_6_ID = "barangay-visitor-name";
const PROJECT_7_ID = "barangay-attendance-toggle";
const PROJECT_8_ID = "barangay-page-title";
const PROJECT_9_ID = "barangay-search-focus";
const file = (source: string) => ({ "app.js": source });

const appComponent = "function App() {\n  return null;\n}\n";
const headingElement = 'function App() {\n  return React.createElement("h1");\n}\n';
const headingText =
  'function App() {\n  return React.createElement("h1", null, "Barangay Help Desk");\n}\n';
const headingClass =
  'function App() {\n  return React.createElement("h1", { className: "help-title" }, "Barangay Help Desk");\n}\n';
const identifiedHeading =
  'function App() {\n  return React.createElement("h1", { className: "help-title", id: "help-desk-title" }, "Barangay Help Desk");\n}\n';
const serviceCardStarter = "function App() {\n  return null;\n}\n\n// Create ServiceCard below.\n";
const serviceCardComponent =
  "function App() {\n  return null;\n}\n\nfunction ServiceCard() {\n  return null;\n}\n";
const composedServiceCard =
  "function App() {\n  return React.createElement(ServiceCard);\n}\n\nfunction ServiceCard() {\n  return null;\n}\n";
const serviceCardSection =
  'function App() {\n  return React.createElement(ServiceCard);\n}\n\nfunction ServiceCard() {\n  return React.createElement("section");\n}\n';
const serviceCardHeading =
  'function App() {\n  return React.createElement(ServiceCard);\n}\n\nfunction ServiceCard() {\n  return React.createElement("section", null, React.createElement("h2", null, "Health Centre"));\n}\n';
const serviceCardInput =
  'function App() {\n  return React.createElement(ServiceCard);\n}\n\nfunction ServiceCard(props) {\n  return React.createElement("section", null, React.createElement("h2", null, "Health Centre"));\n}\n';
const namedServiceCard =
  'function App() {\n  return React.createElement(ServiceCard, { name: "Health Centre" });\n}\n\nfunction ServiceCard(props) {\n  return React.createElement("section", null, React.createElement("h2", null, "Health Centre"));\n}\n';
const dynamicServiceCard =
  'function App() {\n  return React.createElement(ServiceCard, { name: "Health Centre" });\n}\n\nfunction ServiceCard(props) {\n  return React.createElement("section", null, React.createElement("h2", null, props.name));\n}\n';
const noticeApp = "function App() {\n  return null;\n}\n";
const noticeData =
  'function App() {\n  const notices = ["Water interruption", "Cleanup drive"];\n  return null;\n}\n';
const noticeList =
  'function App() {\n  const notices = ["Water interruption", "Cleanup drive"];\n  return React.createElement("ul");\n}\n';
const firstNotice =
  'function App() {\n  const notices = ["Water interruption", "Cleanup drive"];\n  return React.createElement("ul", null, React.createElement("li", null, notices[0]));\n}\n';
const mappedNotices =
  'function App() {\n  const notices = ["Water interruption", "Cleanup drive"];\n  return React.createElement("ul", null, notices.map((notice) => React.createElement("li", null, notice)));\n}\n';
const keyedNotices =
  'function App() {\n  const notices = ["Water interruption", "Cleanup drive"];\n  return React.createElement("ul", null, notices.map((notice) => React.createElement("li", { key: notice }, notice)));\n}\n';
const statusApp = "function App() {\n  return null;\n}\n";
const openStatusData = "function App() {\n  const isOpen = true;\n  return null;\n}\n";
const fixedOpenStatus =
  'function App() {\n  const isOpen = true;\n  return React.createElement("p", null, "Open now");\n}\n';
const conditionalStatus =
  'function App() {\n  const isOpen = true;\n  return React.createElement("p", null, isOpen ? "Open now" : "Closed");\n}\n';
const styledConditionalStatus =
  'function App() {\n  const isOpen = true;\n  return React.createElement("p", { className: isOpen ? "open" : "closed" }, isOpen ? "Open now" : "Closed");\n}\n';
const closedConditionalStatus =
  'function App() {\n  const isOpen = false;\n  return React.createElement("p", { className: isOpen ? "open" : "closed" }, isOpen ? "Open now" : "Closed");\n}\n';
const counterApp = "function App() {\n  return null;\n}\n";
const counterState =
  "function App() {\n  const [count, setCount] = React.useState(0);\n  return null;\n}\n";
const counterButton =
  'function App() {\n  const [count, setCount] = React.useState(0);\n  return React.createElement("button", null, count);\n}\n';
const typedCounterButton =
  'function App() {\n  const [count, setCount] = React.useState(0);\n  return React.createElement("button", { type: "button" }, count);\n}\n';
const labeledCounterButton =
  'function App() {\n  const [count, setCount] = React.useState(0);\n  return React.createElement("button", { type: "button", "aria-label": "Add person to queue. Current queue: " + count }, count);\n}\n';
const interactiveCounterButton =
  'function App() {\n  const [count, setCount] = React.useState(0);\n  return React.createElement("button", { type: "button", "aria-label": "Add person to queue. Current queue: " + count, onClick: () => setCount(count + 1) }, count);\n}\n';
const updatingCounterButton =
  'function App() {\n  const [count, setCount] = React.useState(0);\n  return React.createElement("button", { type: "button", "aria-label": "Add person to queue. Current queue: " + count, onClick: () => setCount((current) => current + 1) }, count);\n}\n';
const visitorApp = "function App() {\n  return null;\n}\n";
const visitorState =
  'function App() {\n  const [name, setName] = React.useState("");\n  return null;\n}\n';
const visitorSection =
  'function App() {\n  const [name, setName] = React.useState("");\n  return React.createElement("section");\n}\n';
const visitorInput =
  'function App() {\n  const [name, setName] = React.useState("");\n  return React.createElement("section", null, React.createElement("input"));\n}\n';
const identifiedVisitorInput =
  'function App() {\n  const [name, setName] = React.useState("");\n  return React.createElement("section", null, React.createElement("input", { id: "visitor-name" }));\n}\n';
const labeledVisitorInput =
  'function App() {\n  const [name, setName] = React.useState("");\n  return React.createElement("section", null, React.createElement("label", { htmlFor: "visitor-name" }, "Visitor name"), React.createElement("input", { id: "visitor-name" }));\n}\n';
const visitorEcho =
  'function App() {\n  const [name, setName] = React.useState("");\n  return React.createElement("section", null, React.createElement("label", { htmlFor: "visitor-name" }, "Visitor name"), React.createElement("input", { id: "visitor-name" }), React.createElement("p", null, name));\n}\n';
const controlledVisitorInput =
  'function App() {\n  const [name, setName] = React.useState("");\n  return React.createElement("section", null, React.createElement("label", { htmlFor: "visitor-name" }, "Visitor name"), React.createElement("input", { id: "visitor-name", value: name }), React.createElement("p", null, name));\n}\n';
const changingVisitorInput =
  'function App() {\n  const [name, setName] = React.useState("");\n  return React.createElement("section", null, React.createElement("label", { htmlFor: "visitor-name" }, "Visitor name"), React.createElement("input", { id: "visitor-name", value: name, onChange: (event) => setName(event.target.value) }), React.createElement("p", null, name));\n}\n';
const attendanceApp = "function App() {\n  return null;\n}\n";
const attendanceState =
  "function App() {\n  const [isPresent, setIsPresent] = React.useState(false);\n  return null;\n}\n";
const attendanceButton =
  'function App() {\n  const [isPresent, setIsPresent] = React.useState(false);\n  return React.createElement("button", null, isPresent ? "Marked present" : "Mark present");\n}\n';
const typedAttendanceButton =
  'function App() {\n  const [isPresent, setIsPresent] = React.useState(false);\n  return React.createElement("button", { type: "button" }, isPresent ? "Marked present" : "Mark present");\n}\n';
const pressedAttendanceButton =
  'function App() {\n  const [isPresent, setIsPresent] = React.useState(false);\n  return React.createElement("button", { type: "button", "aria-pressed": isPresent }, isPresent ? "Marked present" : "Mark present");\n}\n';
const interactiveAttendanceButton =
  'function App() {\n  const [isPresent, setIsPresent] = React.useState(false);\n  return React.createElement("button", { type: "button", "aria-pressed": isPresent, onClick: () => setIsPresent(!isPresent) }, isPresent ? "Marked present" : "Mark present");\n}\n';
const updatingAttendanceButton =
  'function App() {\n  const [isPresent, setIsPresent] = React.useState(false);\n  return React.createElement("button", { type: "button", "aria-pressed": isPresent, onClick: () => setIsPresent((current) => !current) }, isPresent ? "Marked present" : "Mark present");\n}\n';
const titleApp = "function App() {\n  return null;\n}\n";
const titleState =
  'function App() {\n  const [message, setMessage] = React.useState("Relief update");\n  return null;\n}\n';
const titleHeading =
  'function App() {\n  const [message, setMessage] = React.useState("Relief update");\n  return React.createElement("h1", null, message);\n}\n';
const titleEffect =
  'function App() {\n  const [message, setMessage] = React.useState("Relief update");\n  React.useEffect(() => { document.title = message; });\n  return React.createElement("h1", null, message);\n}\n';
const titleDependency =
  'function App() {\n  const [message, setMessage] = React.useState("Relief update");\n  React.useEffect(() => { document.title = message; }, [message]);\n  return React.createElement("h1", null, message);\n}\n';
const focusApp = "function App() {\n  return null;\n}\n";
const focusRef =
  "function App() {\n  const searchInput = React.useRef(null);\n  return null;\n}\n";
const focusSection =
  'function App() {\n  const searchInput = React.useRef(null);\n  return React.createElement("section");\n}\n';
const focusInput =
  'function App() {\n  const searchInput = React.useRef(null);\n  return React.createElement("section", null, React.createElement("input", { id: "search-input" }));\n}\n';
const labeledFocusInput =
  'function App() {\n  const searchInput = React.useRef(null);\n  return React.createElement("section", null, React.createElement("label", { htmlFor: "search-input" }, "Search services"), React.createElement("input", { id: "search-input" }));\n}\n';
const focusButton =
  'function App() {\n  const searchInput = React.useRef(null);\n  return React.createElement("section", null, React.createElement("label", { htmlFor: "search-input" }, "Search services"), React.createElement("input", { id: "search-input" }), React.createElement("button", { type: "button" }, "Focus search"));\n}\n';
const connectedFocusInput =
  'function App() {\n  const searchInput = React.useRef(null);\n  return React.createElement("section", null, React.createElement("label", { htmlFor: "search-input" }, "Search services"), React.createElement("input", { id: "search-input", ref: searchInput }), React.createElement("button", { type: "button" }, "Focus search"));\n}\n';
const interactiveFocusInput =
  'function App() {\n  const searchInput = React.useRef(null);\n  return React.createElement("section", null, React.createElement("label", { htmlFor: "search-input" }, "Search services"), React.createElement("input", { id: "search-input", ref: searchInput }), React.createElement("button", { type: "button", onClick: () => searchInput.current.focus() }, "Focus search"));\n}\n';

const steps: Step[] = [
  {
    id: "create-app-component",
    index: 1,
    projectId: PROJECT_ID,
    task: "Create a function named App. Return null inside it for now.",
    kind: "react",
    inputMode: "guided",
    files: file("// Create the App function below.\n"),
    activeFile: "app.js",
    highlightToken: "// Create",
    conceptIds: ["react-component"],
    tests: [
      {
        id: "app-component-written",
        kind: "source-matches",
        file: "app.js",
        pattern: "function\\s+App\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*return\\s+null\\s*;?[\\s\\S]*\\}",
        because: "Write a function named App and return null from inside its braces.",
        label: "The App component is ready",
      },
    ],
    hints: [
      { level: 1, text: "Start with the same function shape you used in JavaScript." },
      { level: 2, text: "Write function App() with braces, then return null inside." },
    ],
    xp: 50,
    estimatedMinutes: 5,
    solution: file(appComponent),
  },
  {
    id: "return-heading-element",
    index: 2,
    projectId: PROJECT_ID,
    task: "Replace null with a React h1 element.",
    kind: "react",
    inputMode: "guided",
    files: file(appComponent),
    activeFile: "app.js",
    highlightToken: "return null",
    conceptIds: ["react-element"],
    tests: [
      {
        id: "help-heading-exists",
        kind: "react-exists",
        selector: "h1",
        label: "React shows a big heading",
      },
    ],
    hints: [
      { level: 1, text: "Ask React to create the same heading element you used in HTML." },
      { level: 2, text: 'Return React.createElement("h1").' },
    ],
    xp: 60,
    estimatedMinutes: 5,
    solution: file(headingElement),
  },
  {
    id: "add-heading-text",
    index: 3,
    projectId: PROJECT_ID,
    task: "Make the heading read Barangay Help Desk.",
    kind: "react",
    inputMode: "guided",
    files: file(headingElement),
    activeFile: "app.js",
    highlightToken: 'React.createElement("h1")',
    tests: [
      {
        id: "help-heading-text",
        kind: "react-text-equals",
        selector: "h1",
        value: "Barangay Help Desk",
        label: "The heading names the help desk",
      },
    ],
    hints: [
      { level: 1, text: "The words are the third value passed when the element is created." },
      { level: 2, text: 'Use null as the second value, then add "Barangay Help Desk".' },
    ],
    xp: 50,
    estimatedMinutes: 4,
    solution: file(headingText),
  },
  {
    id: "add-heading-class",
    index: 4,
    projectId: PROJECT_ID,
    task: "Pass the class name help-title to the heading.",
    kind: "react",
    inputMode: "guided",
    files: file(headingText),
    activeFile: "app.js",
    highlightToken: "null",
    conceptIds: ["react-props"],
    tests: [
      {
        id: "help-heading-class",
        kind: "react-attr-equals",
        selector: "h1",
        attr: "class",
        value: "help-title",
        label: "The heading receives its class name",
      },
    ],
    hints: [
      { level: 1, text: "The second value is an object that holds element details." },
      { level: 2, text: 'Use { className: "help-title" } as the second value.' },
    ],
    xp: 60,
    estimatedMinutes: 5,
    solution: file(headingClass),
  },
  {
    id: "identify-help-heading",
    index: 5,
    projectId: PROJECT_ID,
    task: "Give the heading the id help-desk-title.",
    kind: "react",
    inputMode: "guided",
    files: file(headingClass),
    activeFile: "app.js",
    highlightToken: "className",
    tests: [
      {
        id: "help-heading-id",
        kind: "react-attr-equals",
        selector: "h1",
        attr: "id",
        value: "help-desk-title",
        label: "The heading has its id",
      },
    ],
    hints: [
      { level: 1, text: "Add one more name and value inside the props object." },
      { level: 2, text: 'Add id: "help-desk-title" after the class name.' },
    ],
    xp: 60,
    estimatedMinutes: 5,
    solution: file(identifiedHeading),
  },
  {
    id: "create-service-card-component",
    index: 6,
    projectId: PROJECT_2_ID,
    task: "Create a function named ServiceCard. Return null inside it for now.",
    kind: "react",
    inputMode: "guided",
    files: file(serviceCardStarter),
    activeFile: "app.js",
    highlightToken: "// Create ServiceCard",
    tests: [
      {
        id: "service-card-component-written",
        kind: "source-matches",
        file: "app.js",
        pattern:
          "function\\s+ServiceCard\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*return\\s+null\\s*;?[\\s\\S]*\\}",
        because: "Write a ServiceCard function and return null from inside its braces.",
        label: "The ServiceCard component is ready",
      },
    ],
    hints: [
      { level: 1, text: "Use the same function shape as App, but give it the new name." },
      { level: 2, text: "Write function ServiceCard() and return null inside." },
    ],
    xp: 50,
    estimatedMinutes: 5,
    solution: file(serviceCardComponent),
  },
  {
    id: "compose-service-card",
    index: 7,
    projectId: PROJECT_2_ID,
    task: "Show ServiceCard from inside App.",
    kind: "react",
    inputMode: "guided",
    files: file(serviceCardComponent),
    activeFile: "app.js",
    highlightToken: "return null",
    conceptIds: ["react-component-composition"],
    tests: [
      {
        id: "app-renders-service-card",
        kind: "source-matches",
        file: "app.js",
        pattern: "return\\s+React\\.createElement\\(\\s*ServiceCard\\s*\\)",
        because: "Return a React element that uses ServiceCard as its component.",
        label: "App includes ServiceCard",
      },
    ],
    hints: [
      { level: 1, text: "A component can be passed where you used an HTML tag name before." },
      { level: 2, text: "Return React.createElement(ServiceCard) from App." },
    ],
    xp: 60,
    estimatedMinutes: 5,
    solution: file(composedServiceCard),
  },
  {
    id: "return-service-section",
    index: 8,
    projectId: PROJECT_2_ID,
    task: "Make ServiceCard return a section element.",
    kind: "react",
    inputMode: "guided",
    files: file(composedServiceCard),
    activeFile: "app.js",
    highlightToken: "return null",
    tests: [
      {
        id: "service-section-exists",
        kind: "react-exists",
        selector: "section",
        label: "The service card shows a section",
      },
    ],
    hints: [
      { level: 1, text: "Change only what ServiceCard returns." },
      { level: 2, text: 'Return React.createElement("section") from ServiceCard.' },
    ],
    xp: 50,
    estimatedMinutes: 4,
    solution: file(serviceCardSection),
  },
  {
    id: "nest-service-heading",
    index: 9,
    projectId: PROJECT_2_ID,
    task: "Put an h2 reading Health Centre inside the section.",
    kind: "react",
    inputMode: "guided",
    files: file(serviceCardSection),
    activeFile: "app.js",
    highlightToken: 'React.createElement("section")',
    conceptIds: ["react-nested-element"],
    tests: [
      {
        id: "service-heading-text",
        kind: "react-text-equals",
        selector: "section h2",
        value: "Health Centre",
        label: "The section contains its service heading",
      },
    ],
    hints: [
      { level: 1, text: "The third value can be another React element instead of plain text." },
      {
        level: 2,
        text: 'Pass React.createElement("h2", null, "Health Centre") as the section child.',
      },
    ],
    xp: 60,
    estimatedMinutes: 6,
    solution: file(serviceCardHeading),
  },
  {
    id: "receive-service-props",
    index: 10,
    projectId: PROJECT_2_ID,
    task: "Let ServiceCard receive props as its function input.",
    kind: "react",
    inputMode: "guided",
    files: file(serviceCardHeading),
    activeFile: "app.js",
    highlightToken: "function ServiceCard()",
    tests: [
      {
        id: "service-card-receives-props",
        kind: "source-matches",
        file: "app.js",
        pattern: "function\\s+ServiceCard\\s*\\(\\s*props\\s*\\)",
        because: "Put props between the ServiceCard function parentheses.",
        label: "ServiceCard receives props",
      },
    ],
    hints: [
      { level: 1, text: "Function inputs go between the parentheses after its name." },
      { level: 2, text: "Change ServiceCard() to ServiceCard(props)." },
    ],
    xp: 50,
    estimatedMinutes: 4,
    solution: file(serviceCardInput),
  },
  {
    id: "pass-service-name",
    index: 11,
    projectId: PROJECT_2_ID,
    task: "Pass the name Health Centre from App to ServiceCard.",
    kind: "react",
    inputMode: "guided",
    files: file(serviceCardInput),
    activeFile: "app.js",
    highlightToken: "React.createElement(ServiceCard)",
    tests: [
      {
        id: "service-name-prop-passed",
        kind: "source-matches",
        file: "app.js",
        pattern:
          "React\\.createElement\\(\\s*ServiceCard\\s*,\\s*\\{\\s*name\\s*:\\s*[\"']Health Centre[\"']\\s*\\}\\s*\\)",
        because: "Pass an object with the name Health Centre to ServiceCard.",
        label: "App passes the service name",
      },
    ],
    hints: [
      { level: 1, text: "Use the second value to pass a named detail to the component." },
      { level: 2, text: 'Use { name: "Health Centre" } after ServiceCard.' },
    ],
    xp: 60,
    estimatedMinutes: 5,
    solution: file(namedServiceCard),
  },
  {
    id: "read-service-name",
    index: 12,
    projectId: PROJECT_2_ID,
    task: "Replace the fixed heading words with the name from props.",
    kind: "react",
    inputMode: "guided",
    files: file(namedServiceCard),
    activeFile: "app.js",
    highlightToken: '"Health Centre"));',
    tests: [
      {
        id: "service-name-read-from-props",
        kind: "source-matches",
        file: "app.js",
        pattern: "React\\.createElement\\(\\s*[\"']h2[\"']\\s*,\\s*null\\s*,\\s*props\\.name\\s*\\)",
        because: "Read the name property from props for the h2 text.",
        label: "The heading reads its name from props",
      },
      {
        id: "dynamic-service-heading-text",
        kind: "react-text-equals",
        selector: "section h2",
        value: "Health Centre",
        label: "The passed service name appears",
      },
    ],
    hints: [
      { level: 1, text: "Read the named value with the same dot syntax used for objects." },
      { level: 2, text: "Use props.name as the h2 child." },
    ],
    xp: 60,
    estimatedMinutes: 5,
    solution: file(dynamicServiceCard),
  },
  {
    id: "create-notice-app",
    index: 13,
    projectId: PROJECT_3_ID,
    task: "Create App and return null inside it.",
    kind: "react",
    inputMode: "guided",
    files: file("// Create App for the notice list.\n"),
    activeFile: "app.js",
    highlightToken: "// Create App",
    tests: [
      {
        id: "notice-app-written",
        kind: "source-matches",
        file: "app.js",
        pattern: "function\\s+App\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*return\\s+null\\s*;?[\\s\\S]*\\}",
        because: "Write an App function and return null from inside its braces.",
        label: "The notice App is ready",
      },
    ],
    hints: [
      { level: 1, text: "Start this project with the component shape you already know." },
      { level: 2, text: "Write function App() and return null inside." },
    ],
    xp: 40,
    estimatedMinutes: 4,
    solution: file(noticeApp),
  },
  {
    id: "store-notice-data",
    index: 14,
    projectId: PROJECT_3_ID,
    task: "Inside App, save Water interruption and Cleanup drive in a notices array.",
    kind: "react",
    inputMode: "guided",
    files: file(noticeApp),
    activeFile: "app.js",
    highlightToken: "return null",
    tests: [
      {
        id: "notice-data-stored",
        kind: "source-matches",
        file: "app.js",
        pattern:
          "const\\s+notices\\s*=\\s*\\[\\s*[\"']Water interruption[\"']\\s*,\\s*[\"']Cleanup drive[\"']\\s*\\]",
        because: "Create the notices array with both requested messages in order.",
        label: "Both notice messages are stored",
      },
    ],
    hints: [
      { level: 1, text: "Place one array variable before the return line." },
      { level: 2, text: 'Create const notices = ["Water interruption", "Cleanup drive"].' },
    ],
    xp: 50,
    estimatedMinutes: 5,
    solution: file(noticeData),
  },
  {
    id: "return-notice-list",
    index: 15,
    projectId: PROJECT_3_ID,
    task: "Replace null with an empty ul element.",
    kind: "react",
    inputMode: "guided",
    files: file(noticeData),
    activeFile: "app.js",
    highlightToken: "return null",
    tests: [
      {
        id: "notice-list-exists",
        kind: "react-exists",
        selector: "ul",
        label: "The notice list appears",
      },
    ],
    hints: [
      { level: 1, text: "Create the same list element you used in HTML." },
      { level: 2, text: 'Return React.createElement("ul").' },
    ],
    xp: 50,
    estimatedMinutes: 4,
    solution: file(noticeList),
  },
  {
    id: "show-first-notice",
    index: 16,
    projectId: PROJECT_3_ID,
    task: "Show the first notices value inside one li element.",
    kind: "react",
    inputMode: "guided",
    files: file(noticeList),
    activeFile: "app.js",
    highlightToken: 'React.createElement("ul")',
    tests: [
      {
        id: "first-notice-text",
        kind: "react-text-equals",
        selector: "ul li",
        value: "Water interruption",
        label: "The first notice appears",
      },
    ],
    hints: [
      { level: 1, text: "Read the first array position and use it as the li child." },
      {
        level: 2,
        text: 'Pass React.createElement("li", null, notices[0]) as the ul child.',
      },
    ],
    xp: 60,
    estimatedMinutes: 6,
    solution: file(firstNotice),
  },
  {
    id: "map-notice-list",
    index: 17,
    projectId: PROJECT_3_ID,
    task: "Use map so every notices value becomes an li element.",
    kind: "react",
    inputMode: "guided",
    files: file(firstNotice),
    activeFile: "app.js",
    highlightToken: 'React.createElement("li", null, notices[0])',
    conceptIds: ["react-list-rendering"],
    tests: [
      {
        id: "second-notice-text",
        kind: "react-text-equals",
        selector: "ul li:nth-child(2)",
        value: "Cleanup drive",
        label: "Map renders the second notice",
      },
    ],
    hints: [
      { level: 1, text: "Transform each notice with the array method you learned in JavaScript." },
      {
        level: 2,
        text: 'Use notices.map((notice) => React.createElement("li", null, notice)).',
      },
    ],
    xp: 70,
    estimatedMinutes: 7,
    solution: file(mappedNotices),
  },
  {
    id: "key-notice-items",
    index: 18,
    projectId: PROJECT_3_ID,
    task: "Give each mapped li a key that uses its notice value.",
    kind: "react",
    inputMode: "guided",
    files: file(mappedNotices),
    activeFile: "app.js",
    highlightToken: 'React.createElement("li", null, notice)',
    conceptIds: ["react-key"],
    tests: [
      {
        id: "notice-key-added",
        kind: "source-matches",
        file: "app.js",
        pattern:
          "React\\.createElement\\(\\s*[\"']li[\"']\\s*,\\s*\\{\\s*key\\s*:\\s*notice\\s*\\}\\s*,\\s*notice\\s*\\)",
        because: "Pass a props object whose key value is the current notice.",
        label: "Each notice item has a stable key",
      },
      {
        id: "keyed-second-notice-text",
        kind: "react-text-equals",
        selector: "ul li:nth-child(2)",
        value: "Cleanup drive",
        label: "The keyed list keeps both notices",
      },
    ],
    hints: [
      { level: 1, text: "Replace the li props value with an object that identifies this item." },
      { level: 2, text: "Use { key: notice } as the li props object." },
    ],
    xp: 60,
    estimatedMinutes: 5,
    solution: file(keyedNotices),
  },
  {
    id: "create-status-app",
    index: 19,
    projectId: PROJECT_4_ID,
    task: "Create App and return null inside it.",
    kind: "react",
    inputMode: "guided",
    files: file("// Create App for the office status.\n"),
    activeFile: "app.js",
    highlightToken: "// Create App",
    tests: [
      {
        id: "status-app-written",
        kind: "source-matches",
        file: "app.js",
        pattern: "function\\s+App\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*return\\s+null\\s*;?[\\s\\S]*\\}",
        because: "Write an App function and return null from inside its braces.",
        label: "The status App is ready",
      },
    ],
    hints: [
      { level: 1, text: "Begin with the same component shape as the earlier projects." },
      { level: 2, text: "Write function App() and return null inside." },
    ],
    xp: 40,
    estimatedMinutes: 4,
    solution: file(statusApp),
  },
  {
    id: "store-open-status",
    index: 20,
    projectId: PROJECT_4_ID,
    task: "Inside App, save true in a constant named isOpen.",
    kind: "react",
    inputMode: "guided",
    files: file(statusApp),
    activeFile: "app.js",
    highlightToken: "return null",
    tests: [
      {
        id: "open-status-stored",
        kind: "source-matches",
        file: "app.js",
        pattern: "const\\s+isOpen\\s*=\\s*true\\s*;?",
        because: "Create the isOpen constant and give it the boolean value true.",
        label: "The open status is stored",
      },
    ],
    hints: [
      { level: 1, text: "Add one boolean constant before the return line." },
      { level: 2, text: "Write const isOpen = true." },
    ],
    xp: 40,
    estimatedMinutes: 4,
    solution: file(openStatusData),
  },
  {
    id: "show-open-status",
    index: 21,
    projectId: PROJECT_4_ID,
    task: "Replace null with a p element reading Open now.",
    kind: "react",
    inputMode: "guided",
    files: file(openStatusData),
    activeFile: "app.js",
    highlightToken: "return null",
    tests: [
      {
        id: "fixed-open-status-text",
        kind: "react-text-equals",
        selector: "p",
        value: "Open now",
        label: "The office shows as open",
      },
    ],
    hints: [
      { level: 1, text: "Create a paragraph with the requested words as its child." },
      { level: 2, text: 'Return React.createElement("p", null, "Open now").' },
    ],
    xp: 50,
    estimatedMinutes: 4,
    solution: file(fixedOpenStatus),
  },
  {
    id: "choose-status-text",
    index: 22,
    projectId: PROJECT_4_ID,
    task: "Use isOpen to choose between Open now and Closed for the p text.",
    kind: "react",
    inputMode: "guided",
    files: file(fixedOpenStatus),
    activeFile: "app.js",
    highlightToken: '"Open now"',
    conceptIds: ["react-conditional-rendering"],
    tests: [
      {
        id: "status-text-is-conditional",
        kind: "source-matches",
        file: "app.js",
        pattern: "isOpen\\s*\\?\\s*[\"']Open now[\"']\\s*:\\s*[\"']Closed[\"']",
        because: "Use a conditional expression with both requested status messages.",
        label: "The status text depends on isOpen",
      },
      {
        id: "conditional-open-status-text",
        kind: "react-text-equals",
        selector: "p",
        value: "Open now",
        label: "True still shows the open message",
      },
    ],
    hints: [
      { level: 1, text: "Use the short JavaScript choice with one result for true and one for false." },
      { level: 2, text: 'Use isOpen ? "Open now" : "Closed" as the p child.' },
    ],
    xp: 60,
    estimatedMinutes: 6,
    solution: file(conditionalStatus),
  },
  {
    id: "choose-status-class",
    index: 23,
    projectId: PROJECT_4_ID,
    task: "Give the p class open when isOpen is true and closed when it is false.",
    kind: "react",
    inputMode: "guided",
    files: file(conditionalStatus),
    activeFile: "app.js",
    highlightToken: "null",
    tests: [
      {
        id: "open-status-class",
        kind: "react-attr-equals",
        selector: "p",
        attr: "class",
        value: "open",
        label: "The true status receives the open class",
      },
    ],
    hints: [
      { level: 1, text: "Pass a className prop that makes the same true-or-false choice." },
      { level: 2, text: 'Use { className: isOpen ? "open" : "closed" }.' },
    ],
    xp: 60,
    estimatedMinutes: 6,
    solution: file(styledConditionalStatus),
  },
  {
    id: "close-office-status",
    index: 24,
    projectId: PROJECT_4_ID,
    task: "Change isOpen to false so the office shows its closed state.",
    kind: "react",
    inputMode: "guided",
    files: file(styledConditionalStatus),
    activeFile: "app.js",
    highlightToken: "true",
    tests: [
      {
        id: "closed-status-text",
        kind: "react-text-equals",
        selector: "p",
        value: "Closed",
        label: "The office shows as closed",
      },
      {
        id: "closed-status-class",
        kind: "react-attr-equals",
        selector: "p",
        attr: "class",
        value: "closed",
        label: "The false status receives the closed class",
      },
    ],
    hints: [
      { level: 1, text: "Only the saved boolean needs to change." },
      { level: 2, text: "Change const isOpen = true to const isOpen = false." },
    ],
    xp: 50,
    estimatedMinutes: 4,
    solution: file(closedConditionalStatus),
  },
  {
    id: "create-counter-app",
    index: 25,
    projectId: PROJECT_5_ID,
    task: "Create App and return null inside it.",
    kind: "react",
    inputMode: "guided",
    files: file("// Create App for the queue counter.\n"),
    activeFile: "app.js",
    highlightToken: "// Create App",
    tests: [
      {
        id: "counter-app-written",
        kind: "source-matches",
        file: "app.js",
        pattern: "function\\s+App\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*return\\s+null\\s*;?[\\s\\S]*\\}",
        because: "Write an App function and return null from inside its braces.",
        label: "The counter App is ready",
      },
    ],
    hints: [
      { level: 1, text: "Begin with the component shape used by every project so far." },
      { level: 2, text: "Write function App() and return null inside." },
    ],
    xp: 40,
    estimatedMinutes: 4,
    solution: file(counterApp),
  },
  {
    id: "create-count-state",
    index: 26,
    projectId: PROJECT_5_ID,
    task: "Create count state starting at 0 with React.useState.",
    kind: "react",
    inputMode: "guided",
    files: file(counterApp),
    activeFile: "app.js",
    highlightToken: "return null",
    conceptIds: ["react-state"],
    tests: [
      {
        id: "count-state-created",
        kind: "source-matches",
        file: "app.js",
        pattern:
          "const\\s*\\[\\s*count\\s*,\\s*setCount\\s*\\]\\s*=\\s*React\\.useState\\(\\s*0\\s*\\)",
        because: "Create count and setCount by calling React.useState with 0.",
        label: "The counter state starts at zero",
      },
    ],
    hints: [
      { level: 1, text: "The state call returns the current value and the function that changes it." },
      { level: 2, text: "Write const [count, setCount] = React.useState(0)." },
    ],
    xp: 70,
    estimatedMinutes: 7,
    solution: file(counterState),
  },
  {
    id: "show-count-button",
    index: 27,
    projectId: PROJECT_5_ID,
    task: "Replace null with a button that shows count.",
    kind: "react",
    inputMode: "guided",
    files: file(counterState),
    activeFile: "app.js",
    highlightToken: "return null",
    tests: [
      {
        id: "initial-count-text",
        kind: "react-text-equals",
        selector: "button",
        value: "0",
        label: "The button shows the starting count",
      },
    ],
    hints: [
      { level: 1, text: "Use the current state value as the button child." },
      { level: 2, text: 'Return React.createElement("button", null, count).' },
    ],
    xp: 60,
    estimatedMinutes: 5,
    solution: file(counterButton),
  },
  {
    id: "set-counter-button-type",
    index: 28,
    projectId: PROJECT_5_ID,
    task: "Give the counter button the type button.",
    kind: "react",
    inputMode: "guided",
    files: file(counterButton),
    activeFile: "app.js",
    highlightToken: "null",
    tests: [
      {
        id: "counter-button-type",
        kind: "react-attr-equals",
        selector: "button",
        attr: "type",
        value: "button",
        label: "The counter has a safe button type",
      },
    ],
    hints: [
      { level: 1, text: "Pass the button detail in the props object." },
      { level: 2, text: 'Replace null with { type: "button" }.' },
    ],
    xp: 50,
    estimatedMinutes: 4,
    solution: file(typedCounterButton),
  },
  {
    id: "label-counter-button",
    index: 29,
    projectId: PROJECT_5_ID,
    task: "Give the number-only button an accessible name that includes its action and current count.",
    kind: "react",
    inputMode: "guided",
    files: file(typedCounterButton),
    activeFile: "app.js",
    highlightToken: "type",
    tests: [
      {
        id: "counter-button-label",
        kind: "react-attr-equals",
        selector: "button",
        attr: "aria-label",
        value: "Add person to queue. Current queue: 0",
        label: "The counter button announces its action and count",
      },
    ],
    hints: [
      { level: 1, text: "Join the action words and count inside the label prop." },
      { level: 2, text: 'Add "aria-label": "Add person to queue. Current queue: " + count.' },
    ],
    xp: 60,
    estimatedMinutes: 5,
    solution: file(labeledCounterButton),
  },
  {
    id: "increment-queue-count",
    index: 30,
    projectId: PROJECT_5_ID,
    task: "When the button is clicked, set count to count plus 1.",
    kind: "react",
    inputMode: "guided",
    files: file(labeledCounterButton),
    activeFile: "app.js",
    highlightToken: '"aria-label"',
    conceptIds: ["react-event-handler"],
    tests: [
      {
        id: "counter-label-updates-on-click",
        kind: "react-click-attr-equals",
        clickSelector: "button",
        selector: "button",
        attr: "aria-label",
        value: "Add person to queue. Current queue: 1",
        label: "One click updates the announced queue count",
      },
    ],
    hints: [
      { level: 1, text: "Pass a function that runs only when the click happens." },
      { level: 2, text: "Add onClick: () => setCount(count + 1) to the props object." },
    ],
    xp: 80,
    estimatedMinutes: 8,
    solution: file(interactiveCounterButton),
  },
  {
    id: "use-count-updater",
    index: 31,
    projectId: PROJECT_5_ID,
    task: "Update count from its current value with a setCount function input.",
    kind: "react",
    inputMode: "guided",
    files: file(interactiveCounterButton),
    activeFile: "app.js",
    highlightToken: "setCount(count + 1)",
    conceptIds: ["react-state-updater"],
    tests: [
      {
        id: "functional-count-update",
        kind: "source-matches",
        file: "app.js",
        pattern:
          "setCount\\(\\s*\\(\\s*current\\s*\\)\\s*=>\\s*current\\s*\\+\\s*1\\s*\\)",
        because: "Pass setCount a function that adds one to its current value.",
        label: "The count update uses its current value",
      },
      {
        id: "updater-increments-on-click",
        kind: "react-click-text-equals",
        clickSelector: "button",
        selector: "button",
        value: "1",
        label: "The updater still adds one person",
      },
    ],
    hints: [
      { level: 1, text: "Give setCount a function that receives the current number." },
      { level: 2, text: "Use setCount((current) => current + 1)." },
    ],
    xp: 70,
    estimatedMinutes: 7,
    solution: file(updatingCounterButton),
  },
  {
    id: "create-visitor-app",
    index: 32,
    projectId: PROJECT_6_ID,
    task: "Create App and return null inside it.",
    kind: "react",
    inputMode: "guided",
    files: file("// Create App for the visitor name field.\n"),
    activeFile: "app.js",
    highlightToken: "// Create App",
    tests: [
      {
        id: "visitor-app-written",
        kind: "source-matches",
        file: "app.js",
        pattern: "function\\s+App\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*return\\s+null\\s*;?[\\s\\S]*\\}",
        because: "Write an App function and return null from inside its braces.",
        label: "The visitor App is ready",
      },
    ],
    hints: [
      { level: 1, text: "Begin with the component shape you have already practised." },
      { level: 2, text: "Write function App() and return null inside." },
    ],
    xp: 40,
    estimatedMinutes: 4,
    solution: file(visitorApp),
  },
  {
    id: "create-name-state",
    index: 33,
    projectId: PROJECT_6_ID,
    task: "Create name state starting with an empty string.",
    kind: "react",
    inputMode: "guided",
    files: file(visitorApp),
    activeFile: "app.js",
    highlightToken: "return null",
    tests: [
      {
        id: "name-state-created",
        kind: "source-matches",
        file: "app.js",
        pattern:
          "const\\s*\\[\\s*name\\s*,\\s*setName\\s*\\]\\s*=\\s*React\\.useState\\(\\s*[\"'][\"']\\s*\\)",
        because: "Create name and setName by calling React.useState with an empty string.",
        label: "The visitor name starts empty",
      },
    ],
    hints: [
      { level: 1, text: "Use the same state pattern as count, but start with text." },
      { level: 2, text: 'Write const [name, setName] = React.useState("").' },
    ],
    xp: 60,
    estimatedMinutes: 6,
    solution: file(visitorState),
  },
  {
    id: "return-visitor-section",
    index: 34,
    projectId: PROJECT_6_ID,
    task: "Replace null with an empty section element.",
    kind: "react",
    inputMode: "guided",
    files: file(visitorState),
    activeFile: "app.js",
    highlightToken: "return null",
    tests: [
      {
        id: "visitor-section-exists",
        kind: "react-exists",
        selector: "section",
        label: "The visitor section appears",
      },
    ],
    hints: [
      { level: 1, text: "Create one outer element to hold the field and its result." },
      { level: 2, text: 'Return React.createElement("section").' },
    ],
    xp: 40,
    estimatedMinutes: 4,
    solution: file(visitorSection),
  },
  {
    id: "add-visitor-input",
    index: 35,
    projectId: PROJECT_6_ID,
    task: "Put an input element inside the section.",
    kind: "react",
    inputMode: "guided",
    files: file(visitorSection),
    activeFile: "app.js",
    highlightToken: 'React.createElement("section")',
    tests: [
      {
        id: "visitor-input-exists",
        kind: "react-exists",
        selector: "section input",
        label: "The section contains an input",
      },
    ],
    hints: [
      { level: 1, text: "Pass one input element as the section child." },
      { level: 2, text: 'Pass React.createElement("input") as the third value.' },
    ],
    xp: 50,
    estimatedMinutes: 5,
    solution: file(visitorInput),
  },
  {
    id: "identify-visitor-input",
    index: 36,
    projectId: PROJECT_6_ID,
    task: "Give the input the id visitor-name.",
    kind: "react",
    inputMode: "guided",
    files: file(visitorInput),
    activeFile: "app.js",
    highlightToken: 'React.createElement("input")',
    tests: [
      {
        id: "visitor-input-id",
        kind: "react-attr-equals",
        selector: "input",
        attr: "id",
        value: "visitor-name",
        label: "The visitor input has its id",
      },
    ],
    hints: [
      { level: 1, text: "Pass the id through the input props object." },
      { level: 2, text: 'Use { id: "visitor-name" } as the input props.' },
    ],
    xp: 50,
    estimatedMinutes: 4,
    solution: file(identifiedVisitorInput),
  },
  {
    id: "label-visitor-input",
    index: 37,
    projectId: PROJECT_6_ID,
    task: "Before the input, add a label reading Visitor name for visitor-name.",
    kind: "react",
    inputMode: "guided",
    files: file(identifiedVisitorInput),
    activeFile: "app.js",
    highlightToken: 'React.createElement("input"',
    tests: [
      {
        id: "visitor-label-text",
        kind: "react-text-equals",
        selector: "label",
        value: "Visitor name",
        label: "The field has a visible label",
      },
      {
        id: "visitor-label-target",
        kind: "react-attr-equals",
        selector: "label",
        attr: "for",
        value: "visitor-name",
        label: "The label points to the visitor input",
      },
    ],
    hints: [
      { level: 1, text: "Use htmlFor in React to connect a label to an input id." },
      {
        level: 2,
        text: 'Add React.createElement("label", { htmlFor: "visitor-name" }, "Visitor name") before the input.',
      },
    ],
    xp: 70,
    estimatedMinutes: 7,
    solution: file(labeledVisitorInput),
  },
  {
    id: "show-visitor-name",
    index: 38,
    projectId: PROJECT_6_ID,
    task: "After the input, add a p element that shows name.",
    kind: "react",
    inputMode: "guided",
    files: file(labeledVisitorInput),
    activeFile: "app.js",
    highlightToken: 'React.createElement("input"',
    tests: [
      {
        id: "visitor-name-output",
        kind: "react-exists",
        selector: "section p",
        label: "The section has a place for the visitor name",
      },
    ],
    hints: [
      { level: 1, text: "Add one more section child after the input." },
      { level: 2, text: 'Add React.createElement("p", null, name) after the input.' },
    ],
    xp: 50,
    estimatedMinutes: 5,
    solution: file(visitorEcho),
  },
  {
    id: "control-visitor-input",
    index: 39,
    projectId: PROJECT_6_ID,
    task: "Pass name as the input value.",
    kind: "react",
    inputMode: "guided",
    files: file(visitorEcho),
    activeFile: "app.js",
    highlightToken: 'id: "visitor-name"',
    tests: [
      {
        id: "visitor-input-uses-name",
        kind: "source-matches",
        file: "app.js",
        pattern:
          "React\\.createElement\\(\\s*[\"']input[\"']\\s*,\\s*\\{[\\s\\S]*?value\\s*:\\s*name[\\s\\S]*?\\}\\s*\\)",
        because: "Add value: name to the input props object.",
        label: "The input value comes from name state",
      },
    ],
    hints: [
      { level: 1, text: "Add the current state value to the input props." },
      { level: 2, text: "Add value: name after the input id." },
    ],
    xp: 50,
    estimatedMinutes: 4,
    solution: file(controlledVisitorInput),
  },
  {
    id: "update-visitor-name",
    index: 40,
    projectId: PROJECT_6_ID,
    task: "On input change, save event.target.value with setName.",
    kind: "react",
    inputMode: "guided",
    files: file(controlledVisitorInput),
    activeFile: "app.js",
    highlightToken: "value: name",
    conceptIds: ["react-controlled-input"],
    tests: [
      {
        id: "visitor-name-updates",
        kind: "react-input-text-equals",
        inputSelector: "input",
        inputValue: "Ana",
        selector: "p",
        value: "Ana",
        label: "Typing a name updates the page",
      },
    ],
    hints: [
      { level: 1, text: "Pass a change function that reads the field's latest value." },
      { level: 2, text: "Add onChange: (event) => setName(event.target.value)." },
    ],
    xp: 80,
    estimatedMinutes: 8,
    solution: file(changingVisitorInput),
  },
  {
    id: "create-attendance-app",
    index: 41,
    projectId: PROJECT_7_ID,
    task: "Create App and return null inside it.",
    kind: "react",
    inputMode: "guided",
    files: file("// Create App for the attendance toggle.\n"),
    activeFile: "app.js",
    highlightToken: "// Create App",
    tests: [
      {
        id: "attendance-app-written",
        kind: "source-matches",
        file: "app.js",
        pattern: "function\\s+App\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*return\\s+null\\s*;?[\\s\\S]*\\}",
        because: "Write an App function and return null from inside its braces.",
        label: "The attendance App is ready",
      },
    ],
    hints: [
      { level: 1, text: "Start with the same component shape as the earlier projects." },
      { level: 2, text: "Write function App() and return null inside." },
    ],
    xp: 40,
    estimatedMinutes: 4,
    solution: file(attendanceApp),
  },
  {
    id: "create-attendance-state",
    index: 42,
    projectId: PROJECT_7_ID,
    task: "Create isPresent state starting at false.",
    kind: "react",
    inputMode: "guided",
    files: file(attendanceApp),
    activeFile: "app.js",
    highlightToken: "return null",
    conceptIds: ["react-state"],
    tests: [
      {
        id: "attendance-state-created",
        kind: "source-matches",
        file: "app.js",
        pattern:
          "const\\s*\\[\\s*isPresent\\s*,\\s*setIsPresent\\s*\\]\\s*=\\s*React\\.useState\\(\\s*false\\s*\\)",
        because: "Create isPresent and setIsPresent with false as the starting state.",
        label: "Attendance starts as not present",
      },
    ],
    hints: [
      { level: 1, text: "Use boolean state because attendance has two conditions." },
      { level: 2, text: "Write const [isPresent, setIsPresent] = React.useState(false)." },
    ],
    xp: 60,
    estimatedMinutes: 6,
    solution: file(attendanceState),
  },
  {
    id: "show-attendance-button",
    index: 43,
    projectId: PROJECT_7_ID,
    task: "Show Marked present when isPresent is true, or Mark present when false.",
    kind: "react",
    inputMode: "guided",
    files: file(attendanceState),
    activeFile: "app.js",
    highlightToken: "return null",
    tests: [
      {
        id: "initial-attendance-text",
        kind: "react-text-equals",
        selector: "button",
        value: "Mark present",
        label: "The button shows the available action",
      },
    ],
    hints: [
      { level: 1, text: "Use the saved boolean to choose the button words." },
      {
        level: 2,
        text: 'Return a button with isPresent ? "Marked present" : "Mark present" as its child.',
      },
    ],
    xp: 60,
    estimatedMinutes: 6,
    solution: file(attendanceButton),
  },
  {
    id: "set-attendance-button-type",
    index: 44,
    projectId: PROJECT_7_ID,
    task: "Give the attendance button the type button.",
    kind: "react",
    inputMode: "guided",
    files: file(attendanceButton),
    activeFile: "app.js",
    highlightToken: "null",
    tests: [
      {
        id: "attendance-button-type",
        kind: "react-attr-equals",
        selector: "button",
        attr: "type",
        value: "button",
        label: "The attendance control has a safe button type",
      },
    ],
    hints: [
      { level: 1, text: "Pass the button detail through its props object." },
      { level: 2, text: 'Replace null with { type: "button" }.' },
    ],
    xp: 40,
    estimatedMinutes: 4,
    solution: file(typedAttendanceButton),
  },
  {
    id: "press-attendance-button",
    index: 45,
    projectId: PROJECT_7_ID,
    task: "Pass isPresent to the button's aria-pressed prop.",
    kind: "react",
    inputMode: "guided",
    files: file(typedAttendanceButton),
    activeFile: "app.js",
    highlightToken: "type",
    tests: [
      {
        id: "attendance-not-pressed",
        kind: "react-attr-equals",
        selector: "button",
        attr: "aria-pressed",
        value: "false",
        label: "The control exposes its current toggle state",
      },
    ],
    hints: [
      { level: 1, text: "A toggle tells assistive technology whether its state is active." },
      { level: 2, text: 'Add "aria-pressed": isPresent to the props object.' },
    ],
    xp: 60,
    estimatedMinutes: 5,
    solution: file(pressedAttendanceButton),
  },
  {
    id: "toggle-attendance",
    index: 46,
    projectId: PROJECT_7_ID,
    task: "On click, set isPresent to the opposite of isPresent.",
    kind: "react",
    inputMode: "guided",
    files: file(pressedAttendanceButton),
    activeFile: "app.js",
    highlightToken: '"aria-pressed"',
    conceptIds: ["react-event-handler"],
    tests: [
      {
        id: "attendance-toggles-on-click",
        kind: "react-click-text-equals",
        clickSelector: "button",
        selector: "button",
        value: "Marked present",
        label: "One click marks the person present",
      },
    ],
    hints: [
      { level: 1, text: "Use the not operator to switch the boolean when clicked." },
      { level: 2, text: "Add onClick: () => setIsPresent(!isPresent)." },
    ],
    xp: 70,
    estimatedMinutes: 7,
    solution: file(interactiveAttendanceButton),
  },
  {
    id: "use-attendance-updater",
    index: 47,
    projectId: PROJECT_7_ID,
    task: "Toggle attendance from its current value with a setIsPresent function input.",
    kind: "react",
    inputMode: "guided",
    files: file(interactiveAttendanceButton),
    activeFile: "app.js",
    highlightToken: "setIsPresent(!isPresent)",
    conceptIds: ["react-state-updater"],
    tests: [
      {
        id: "attendance-functional-update",
        kind: "source-matches",
        file: "app.js",
        pattern:
          "setIsPresent\\(\\s*\\(\\s*current\\s*\\)\\s*=>\\s*!\\s*current\\s*\\)",
        because: "Pass setIsPresent a function that reverses the current boolean.",
        label: "Attendance updates from its current value",
      },
      {
        id: "attendance-updater-click",
        kind: "react-click-text-equals",
        clickSelector: "button",
        selector: "button",
        value: "Marked present",
        label: "The updater still marks the person present",
      },
    ],
    hints: [
      { level: 1, text: "Give the setter a function that receives and reverses the current value." },
      { level: 2, text: "Use setIsPresent((current) => !current)." },
    ],
    xp: 70,
    estimatedMinutes: 7,
    solution: file(updatingAttendanceButton),
  },
  {
    id: "create-title-app",
    index: 48,
    projectId: PROJECT_8_ID,
    task: "Create App and return null inside it.",
    kind: "react",
    inputMode: "guided",
    files: file("// Create App for the page title.\n"),
    activeFile: "app.js",
    highlightToken: "// Create App",
    tests: [
      {
        id: "title-app-written",
        kind: "source-matches",
        file: "app.js",
        pattern: "function\\s+App\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*return\\s+null\\s*;?[\\s\\S]*\\}",
        because: "Write an App function and return null from inside its braces.",
        label: "The title App is ready",
      },
    ],
    hints: [
      { level: 1, text: "Begin with the component shape used by the other projects." },
      { level: 2, text: "Write function App() and return null inside." },
    ],
    xp: 40,
    estimatedMinutes: 4,
    solution: file(titleApp),
  },
  {
    id: "create-message-state",
    index: 49,
    projectId: PROJECT_8_ID,
    task: "Create message state starting with Relief update.",
    kind: "react",
    inputMode: "guided",
    files: file(titleApp),
    activeFile: "app.js",
    highlightToken: "return null",
    tests: [
      {
        id: "message-state-created",
        kind: "source-matches",
        file: "app.js",
        pattern:
          "const\\s*\\[\\s*message\\s*,\\s*setMessage\\s*\\]\\s*=\\s*React\\.useState\\(\\s*[\"']Relief update[\"']\\s*\\)",
        because: "Create message and setMessage with Relief update as the starting state.",
        label: "The title message state is ready",
      },
    ],
    hints: [
      { level: 1, text: "Use text state like the visitor name project." },
      { level: 2, text: 'Write const [message, setMessage] = React.useState("Relief update").' },
    ],
    xp: 60,
    estimatedMinutes: 6,
    solution: file(titleState),
  },
  {
    id: "show-message-heading",
    index: 50,
    projectId: PROJECT_8_ID,
    task: "Replace null with an h1 that shows message.",
    kind: "react",
    inputMode: "guided",
    files: file(titleState),
    activeFile: "app.js",
    highlightToken: "return null",
    tests: [
      {
        id: "message-heading-text",
        kind: "react-text-equals",
        selector: "h1",
        value: "Relief update",
        label: "The page shows the relief update heading",
      },
    ],
    hints: [
      { level: 1, text: "Use the current message state as the heading child." },
      { level: 2, text: 'Return React.createElement("h1", null, message).' },
    ],
    xp: 50,
    estimatedMinutes: 5,
    solution: file(titleHeading),
  },
  {
    id: "sync-document-title",
    index: 51,
    projectId: PROJECT_8_ID,
    task: "Use React.useEffect to set document.title to message.",
    kind: "react",
    inputMode: "guided",
    files: file(titleHeading),
    activeFile: "app.js",
    highlightToken: 'return React.createElement("h1"',
    conceptIds: ["react-effect"],
    tests: [
      {
        id: "document-title-synced",
        kind: "react-document-title-equals",
        value: "Relief update",
        label: "The browser document receives the message title",
      },
    ],
    hints: [
      { level: 1, text: "Run the browser update after React finishes showing the component." },
      { level: 2, text: "Add React.useEffect(() => { document.title = message; }); before return." },
    ],
    xp: 80,
    estimatedMinutes: 8,
    solution: file(titleEffect),
  },
  {
    id: "depend-on-title-message",
    index: 52,
    projectId: PROJECT_8_ID,
    task: "Give the effect a dependency array containing message.",
    kind: "react",
    inputMode: "guided",
    files: file(titleEffect),
    activeFile: "app.js",
    highlightToken: "document.title = message; });",
    conceptIds: ["react-effect-dependency"],
    tests: [
      {
        id: "message-effect-dependency",
        kind: "source-matches",
        file: "app.js",
        pattern:
          "React\\.useEffect\\(\\s*\\(\\s*\\)\\s*=>\\s*\\{[\\s\\S]*document\\.title\\s*=\\s*message\\s*;?[\\s\\S]*\\}\\s*,\\s*\\[\\s*message\\s*\\]\\s*\\)",
        because: "Pass [message] as the second value to React.useEffect.",
        label: "The effect lists the message it reads",
      },
      {
        id: "dependent-document-title",
        kind: "react-document-title-equals",
        value: "Relief update",
        label: "The dependency-aware effect still updates the title",
      },
    ],
    hints: [
      { level: 1, text: "The second value lists the state used inside the effect." },
      { level: 2, text: "Add [message] after the effect function." },
    ],
    xp: 70,
    estimatedMinutes: 7,
    solution: file(titleDependency),
  },
  {
    id: "create-focus-app",
    index: 53,
    projectId: PROJECT_9_ID,
    task: "Create App and return null inside it.",
    kind: "react",
    inputMode: "guided",
    files: file("// Create App for the search focus tool.\n"),
    activeFile: "app.js",
    highlightToken: "// Create App",
    tests: [
      {
        id: "focus-app-written",
        kind: "source-matches",
        file: "app.js",
        pattern: "function\\s+App\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*return\\s+null\\s*;?[\\s\\S]*\\}",
        because: "Write an App function and return null from inside its braces.",
        label: "The focus App is ready",
      },
    ],
    hints: [
      { level: 1, text: "Start with the familiar component shape." },
      { level: 2, text: "Write function App() and return null inside." },
    ],
    xp: 40,
    estimatedMinutes: 4,
    solution: file(focusApp),
  },
  {
    id: "create-search-ref",
    index: 54,
    projectId: PROJECT_9_ID,
    task: "Create a searchInput ref starting at null with React.useRef.",
    kind: "react",
    inputMode: "guided",
    files: file(focusApp),
    activeFile: "app.js",
    highlightToken: "return null",
    conceptIds: ["react-ref"],
    tests: [
      {
        id: "search-ref-created",
        kind: "source-matches",
        file: "app.js",
        pattern: "const\\s+searchInput\\s*=\\s*React\\.useRef\\(\\s*null\\s*\\)",
        because: "Create searchInput by calling React.useRef with null.",
        label: "The search input ref is ready",
      },
    ],
    hints: [
      { level: 1, text: "Save the ref object in one constant before return." },
      { level: 2, text: "Write const searchInput = React.useRef(null)." },
    ],
    xp: 70,
    estimatedMinutes: 7,
    solution: file(focusRef),
  },
  {
    id: "return-focus-section",
    index: 55,
    projectId: PROJECT_9_ID,
    task: "Replace null with an empty section element.",
    kind: "react",
    inputMode: "guided",
    files: file(focusRef),
    activeFile: "app.js",
    highlightToken: "return null",
    tests: [
      {
        id: "focus-section-exists",
        kind: "react-exists",
        selector: "section",
        label: "The search section appears",
      },
    ],
    hints: [
      { level: 1, text: "Create one outer element for the field and button." },
      { level: 2, text: 'Return React.createElement("section").' },
    ],
    xp: 40,
    estimatedMinutes: 4,
    solution: file(focusSection),
  },
  {
    id: "add-search-input",
    index: 56,
    projectId: PROJECT_9_ID,
    task: "Put an input with id search-input inside the section.",
    kind: "react",
    inputMode: "guided",
    files: file(focusSection),
    activeFile: "app.js",
    highlightToken: 'React.createElement("section")',
    tests: [
      {
        id: "search-input-id",
        kind: "react-attr-equals",
        selector: "section input",
        attr: "id",
        value: "search-input",
        label: "The search field has its id",
      },
    ],
    hints: [
      { level: 1, text: "Create the input as the section child and pass its id through props." },
      { level: 2, text: 'Use React.createElement("input", { id: "search-input" }).' },
    ],
    xp: 60,
    estimatedMinutes: 6,
    solution: file(focusInput),
  },
  {
    id: "label-search-input",
    index: 57,
    projectId: PROJECT_9_ID,
    task: "Before the input, add a label reading Search services for search-input.",
    kind: "react",
    inputMode: "guided",
    files: file(focusInput),
    activeFile: "app.js",
    highlightToken: 'React.createElement("input"',
    tests: [
      {
        id: "search-label-text",
        kind: "react-text-equals",
        selector: "label",
        value: "Search services",
        label: "The search field has a visible label",
      },
      {
        id: "search-label-target",
        kind: "react-attr-equals",
        selector: "label",
        attr: "for",
        value: "search-input",
        label: "The label points to the search field",
      },
    ],
    hints: [
      { level: 1, text: "Use htmlFor to connect the visible words to the field id." },
      {
        level: 2,
        text: 'Add React.createElement("label", { htmlFor: "search-input" }, "Search services") before the input.',
      },
    ],
    xp: 70,
    estimatedMinutes: 7,
    solution: file(labeledFocusInput),
  },
  {
    id: "add-focus-button",
    index: 58,
    projectId: PROJECT_9_ID,
    task: "After the input, add a type button reading Focus search.",
    kind: "react",
    inputMode: "guided",
    files: file(labeledFocusInput),
    activeFile: "app.js",
    highlightToken: 'React.createElement("input"',
    tests: [
      {
        id: "focus-button-text",
        kind: "react-text-equals",
        selector: "button",
        value: "Focus search",
        label: "The focus button names its action",
      },
      {
        id: "focus-button-type",
        kind: "react-attr-equals",
        selector: "button",
        attr: "type",
        value: "button",
        label: "The focus control has a safe button type",
      },
    ],
    hints: [
      { level: 1, text: "Add one more section child after the input." },
      { level: 2, text: 'Add React.createElement("button", { type: "button" }, "Focus search").' },
    ],
    xp: 60,
    estimatedMinutes: 6,
    solution: file(focusButton),
  },
  {
    id: "connect-search-ref",
    index: 59,
    projectId: PROJECT_9_ID,
    task: "Pass searchInput to the input's ref prop.",
    kind: "react",
    inputMode: "guided",
    files: file(focusButton),
    activeFile: "app.js",
    highlightToken: 'id: "search-input"',
    tests: [
      {
        id: "search-ref-connected",
        kind: "source-matches",
        file: "app.js",
        pattern:
          "React\\.createElement\\(\\s*[\"']input[\"']\\s*,\\s*\\{[\\s\\S]*?ref\\s*:\\s*searchInput[\\s\\S]*?\\}\\s*\\)",
        because: "Add ref: searchInput to the input props object.",
        label: "The ref points to the search input",
      },
    ],
    hints: [
      { level: 1, text: "Add the ref object to the same props as the input id." },
      { level: 2, text: "Add ref: searchInput after the input id." },
    ],
    xp: 60,
    estimatedMinutes: 5,
    solution: file(connectedFocusInput),
  },
  {
    id: "focus-search-input",
    index: 60,
    projectId: PROJECT_9_ID,
    task: "On button click, call focus on searchInput.current.",
    kind: "react",
    inputMode: "guided",
    files: file(connectedFocusInput),
    activeFile: "app.js",
    highlightToken: 'type: "button"',
    tests: [
      {
        id: "search-focuses-on-click",
        kind: "react-click-focus-equals",
        clickSelector: "button",
        selector: "input",
        label: "The button moves focus to the search field",
      },
    ],
    hints: [
      { level: 1, text: "The ref's current value is the real input element after rendering." },
      { level: 2, text: "Add onClick: () => searchInput.current.focus()." },
    ],
    xp: 80,
    estimatedMinutes: 8,
    solution: file(interactiveFocusInput),
  },
];

export const reactCourse: Course = {
  id: "react-basics",
  order: 5,
  title: "Learn React by Building a Barangay Help Desk",
  project: "Barangay Help Desk Heading",
  projects: [
    { id: PROJECT_ID, title: "Barangay Help Desk Heading" },
    { id: PROJECT_2_ID, title: "Barangay Service Card" },
    { id: PROJECT_3_ID, title: "Barangay Notice List" },
    { id: PROJECT_4_ID, title: "Barangay Office Status" },
    { id: PROJECT_5_ID, title: "Barangay Queue Counter" },
    { id: PROJECT_6_ID, title: "Barangay Visitor Name" },
    { id: PROJECT_7_ID, title: "Barangay Attendance Toggle" },
    { id: PROJECT_8_ID, title: "Barangay Page Title" },
    { id: PROJECT_9_ID, title: "Barangay Search Focus" },
  ],
  kind: "react",
  requires: ["js-basics"],
  summary: "Build real React components and see each change render in a secure live preview.",
  steps,
};
