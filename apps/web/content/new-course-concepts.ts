import type { Concept } from "@/lib/lesson-ir";

interface ConceptSeed {
  id: string;
  term: string;
  definition: string;
  analogy: string;
  proof: string;
  input: string;
  action: string;
  output: string;
}

const seeds: ConceptSeed[] = [
  { id: "design-visual-hierarchy", term: "visual hierarchy", definition: "Visual hierarchy makes the most important information easiest to notice first.", analogy: "A market sign shows the stall name large, then prices smaller, so buyers know where to look.", proof: "You will make the page title lead the reader's eye.", input: "Same-size content", action: "Rank by importance", output: "Clear reading order" },
  { id: "design-type-scale", term: "type scale", definition: "A type scale is a small set of text sizes used for clear, repeated levels.", analogy: "Road signs use a few planned sizes instead of a different size for every word.", proof: "You will apply a planned set of text sizes.", input: "Random sizes", action: "Use a scale", output: "Consistent levels" },
  { id: "design-spacing-scale", term: "spacing scale", definition: "A spacing scale is a short list of reusable gaps that keeps a page consistent.", analogy: "Floor tiles create a steady measuring grid instead of guessed distances.", proof: "You will give related and separate items planned gaps.", input: "Guessed gaps", action: "Use set gaps", output: "Steady rhythm" },
  { id: "design-proximity", term: "proximity", definition: "Proximity places related items near each other and separates unrelated groups.", analogy: "Goods for one order stay in one basket, away from the next customer's basket.", proof: "You will group a label with the information it explains.", input: "Loose items", action: "Group related items", output: "Clear groups" },
  { id: "design-alignment", term: "alignment", definition: "Alignment places edges on shared lines so information is easier to scan.", analogy: "Names on a barangay list line up in one column so each row is easy to follow.", proof: "You will align the card content to one clear edge.", input: "Drifting edges", action: "Share a line", output: "Easy scan" },
  { id: "design-whitespace", term: "whitespace", definition: "Whitespace is empty room that separates content and helps important parts breathe.", analogy: "An uncrowded counter leaves room to count change without mixing different orders.", proof: "You will add useful room around the main content.", input: "Crowded panel", action: "Add breathing room", output: "Calm focus" },
  { id: "design-readable-measure", term: "readable measure", definition: "Readable measure keeps a line of text short enough for the eye to find the next line.", analogy: "A short queue is easier to follow than one that bends across the whole terminal.", proof: "You will limit the width of a paragraph.", input: "Very long lines", action: "Limit line width", output: "Readable paragraph" },
  { id: "design-contrast-ratio", term: "contrast ratio", definition: "Contrast ratio measures how strongly text stands apart from its background.", analogy: "Black ink on white paper is easier to read than pale pencil on grey paper.", proof: "You will choose a text and background pair with strong contrast.", input: "Faint text", action: "Increase contrast", output: "Readable words" },
  { id: "design-semantic-colour", term: "semantic colour", definition: "Semantic colour gives a colour a stable job, such as action, success, or warning.", analogy: "A traffic light keeps the same meaning at every crossing.", proof: "You will use one colour role consistently across the page.", input: "Random colour", action: "Give colour a job", output: "Predictable meaning" },
  { id: "design-status-cue", term: "status cue", definition: "A status cue uses a word and a symbol so meaning never depends on colour alone.", analogy: "A clinic number board shows both the number and a spoken call.", proof: "You will add a visible word and symbol to a status.", input: "Colour only", action: "Add word and symbol", output: "Clear status" },
  { id: "design-focus-indicator", term: "focus indicator", definition: "A focus indicator shows which control will respond to the keyboard.", analogy: "A service window light shows which counter is ready for the next person.", proof: "You will give the main action a visible keyboard focus style.", input: "Hidden focus", action: "Mark current control", output: "Visible focus" },
  { id: "design-touch-target", term: "touch target", definition: "A touch target is the full area a finger can press, not only the words inside it.", analogy: "A large door handle is easier to use than a tiny latch.", proof: "You will make the main action comfortable to tap.", input: "Tiny control", action: "Enlarge press area", output: "Easy tap" },
  { id: "design-responsive-reflow", term: "responsive reflow", definition: "Responsive reflow moves content into a new arrangement when the screen gets narrow.", analogy: "Chairs move from rows into one line when a room becomes a hallway.", proof: "You will let the content stack cleanly on a phone.", input: "Wide row", action: "Rearrange for width", output: "Phone layout" },
  { id: "design-empty-state", term: "empty state", definition: "An empty state explains why nothing is shown and gives one useful next action.", analogy: "An empty shelf sign says when stock returns instead of leaving buyers guessing.", proof: "You will turn a blank panel into useful guidance.", input: "Blank panel", action: "Explain and guide", output: "Useful next step" },
  { id: "design-token", term: "design token", definition: "A design token is a named value reused for colour, spacing, type, or shape.", analogy: "A recipe names one measuring cup so every cook uses the same amount.", proof: "You will reuse named visual values across a small interface.", input: "Repeated guesses", action: "Name shared values", output: "Consistent system" },

  { id: "real-promise", term: "Promise", definition: "A Promise represents a result that will arrive later or fail.", analogy: "A claim stub is not the parcel, but it connects you to the parcel when it arrives.", proof: "You will return and resolve a Promise.", input: "Work starts", action: "Wait for result", output: "Value or error" },
  { id: "real-async-function", term: "async function", definition: "An async function always returns a Promise and can pause at await.", analogy: "A numbered service ticket lets the counter continue while your request is prepared.", proof: "You will mark a function async and read its resolved value.", input: "Function call", action: "Run async work", output: "Promise result" },
  { id: "real-await", term: "await", definition: "await pauses one async function until a Promise settles.", analogy: "You wait for your receipt before checking the total printed on it.", proof: "You will await a value before using it.", input: "Promise", action: "Await", output: "Resolved value" },
  { id: "real-try-catch", term: "try and catch", definition: "try and catch separates normal work from the response to an error.", analogy: "A delivery plan includes the normal route and a clear detour when a road is closed.", proof: "You will return a useful fallback after a failed request.", input: "Risky work", action: "Catch failure", output: "Handled result" },
  { id: "real-http-request", term: "HTTP request", definition: "An HTTP request asks another service for data or asks it to perform an action.", analogy: "An order slip says what you want and where the reply should go.", proof: "You will send a request to a lesson API fixture.", input: "App", action: "Send request", output: "Service response" },
  { id: "real-response-status", term: "response status", definition: "A response status is a number that says whether a request succeeded or why it failed.", analogy: "A claim desk stamps a form approved, missing information, or not found.", proof: "You will check response.ok and response.status.", input: "Response", action: "Read status", output: "Success or failure" },
  { id: "real-json", term: "JSON", definition: "JSON is a text format for sending structured values such as objects and arrays.", analogy: "A standard delivery form keeps every name and value in a known place.", proof: "You will read JSON from a response and store JSON safely.", input: "JSON text", action: "Parse or stringify", output: "JavaScript value" },
  { id: "real-request-method", term: "request method", definition: "A request method states the action a client wants, such as GET or POST.", analogy: "A service form is marked read, create, update, or remove before it reaches the desk.", proof: "You will send a POST request for new data.", input: "Request", action: "Choose method", output: "Clear action" },
  { id: "real-request-header", term: "request header", definition: "A request header carries information about a request, such as the body format.", analogy: "A parcel label says fragile before anyone opens the box.", proof: "You will label a JSON request body correctly.", input: "Request body", action: "Add header", output: "Known format" },
  { id: "real-url-search-params", term: "URLSearchParams", definition: "URLSearchParams builds and reads the query values after a question mark in a URL.", analogy: "A route slip adds named filters without changing the destination office.", proof: "You will build a safe search query from named values.", input: "Filter values", action: "Encode query", output: "Safe URL" },
  { id: "real-local-storage", term: "localStorage", definition: "localStorage keeps small text values in one browser after the page closes.", analogy: "A labelled drawer keeps a note ready for the next visit on the same desk.", proof: "You will save, restore, and remove one browser setting.", input: "Current value", action: "Store by key", output: "Later value" },
  { id: "real-promise-all", term: "Promise.all", definition: "Promise.all waits for several Promises and keeps their results in order.", analogy: "A report waits for every barangay desk to submit its number before adding the total.", proof: "You will load two independent records together.", input: "Several Promises", action: "Wait together", output: "Ordered results" },
  { id: "real-retry", term: "retry", definition: "A retry makes another bounded attempt after a temporary failure.", analogy: "A caller redials once after a dropped signal, then stops instead of calling forever.", proof: "You will limit repeated attempts and return the final result.", input: "Temporary failure", action: "Try again", output: "Result or stop" },

  { id: "ts-type-annotation", term: "type annotation", definition: "A type annotation states the kind of value a name may hold.", analogy: "A labelled bin says bottles only before anyone puts an item inside.", proof: "You will annotate a React value and render it.", input: "Name", action: "Add type", output: "Checked value" },
  { id: "ts-type-inference", term: "type inference", definition: "Type inference lets TypeScript work out a type from the value already present.", analogy: "Seeing rice in a clear jar tells you what belongs there without another label.", proof: "You will let TypeScript infer a safe local value.", input: "Known value", action: "Infer", output: "Known type" },
  { id: "ts-union", term: "union type", definition: "A union type allows one value to be one of several named types.", analogy: "A payment desk can accept cash or card, but not an unrelated item.", proof: "You will limit a status to a small set of valid words.", input: "Several valid kinds", action: "Join with |", output: "Limited choices" },
  { id: "ts-type-alias", term: "type alias", definition: "A type alias gives a reusable name to a TypeScript type.", analogy: "A route name stands for the full list of streets it follows.", proof: "You will name and reuse a component data shape.", input: "Type shape", action: "Give it a name", output: "Reusable type" },
  { id: "ts-interface", term: "interface", definition: "An interface names the required shape of an object.", analogy: "A permit form lists every field an accepted application must contain.", proof: "You will describe the props a component accepts.", input: "Object values", action: "Describe shape", output: "Checked object" },
  { id: "ts-optional-property", term: "optional property", definition: "An optional property may be present or absent on a typed object.", analogy: "A delivery form requires an address but leaves the landmark box optional.", proof: "You will add an optional note prop and a fallback.", input: "Object shape", action: "Mark with ?", output: "Optional value" },
  { id: "ts-readonly", term: "readonly", definition: "readonly prevents a typed property or array from being assigned a new value.", analogy: "A printed receipt can be read after payment but should not be rewritten.", proof: "You will mark incoming component data readonly.", input: "Shared data", action: "Protect from writes", output: "Read-only type" },
  { id: "ts-generic", term: "generic", definition: "A generic keeps a relationship between types while allowing many concrete values.", analogy: "One labelled tray design can carry medicine, forms, or tools without mixing their labels.", proof: "You will keep an input and output type connected.", input: "Type parameter", action: "Reuse relationship", output: "Specific result" },
  { id: "ts-narrowing", term: "type narrowing", definition: "Type narrowing uses a check to reduce several possible types to the one currently present.", analogy: "A guard checks an ID category before sending a visitor to the right line.", proof: "You will check a value before using type-specific behavior.", input: "Union value", action: "Check current kind", output: "Narrow type" },
  { id: "ts-discriminated-union", term: "discriminated union", definition: "A discriminated union gives each object shape one shared field with a distinct literal value.", analogy: "Every service ticket has a type code that determines the fields the clerk should read.", proof: "You will render different request states safely.", input: "Related object shapes", action: "Check tag field", output: "Safe branch" },
  { id: "ts-event-type", term: "event type", definition: "An event type describes the element and data carried by a browser event in React.", analogy: "A form stamp says which desk produced it and what details travel with it.", proof: "You will type an input change handler.", input: "Browser event", action: "Name event shape", output: "Safe handler" },
  { id: "ts-react-node", term: "ReactNode", definition: "ReactNode describes values React can place in the rendered tree, including text and elements.", analogy: "A display shelf can hold several approved kinds of item, not every object in the building.", proof: "You will type reusable child content.", input: "Child content", action: "Use ReactNode", output: "Renderable value" },

  { id: "test-case", term: "test case", definition: "A test case is one example with a setup, an action, and an expected result.", analogy: "A cashier checks one sample basket before opening the counter.", proof: "You will write one focused example for a function.", input: "Known setup", action: "Run one action", output: "Observed result" },
  { id: "test-assertion", term: "assertion", definition: "An assertion compares what happened with what should have happened.", analogy: "A receipt check compares the printed total with the amount you calculated.", proof: "You will make a failing comparison pass.", input: "Actual value", action: "Compare", output: "Pass or fail" },
  { id: "test-edge-case", term: "edge case", definition: "An edge case is a less common input near the limits of normal use.", analogy: "A tricycle plan should still work for the last seat, not only the first passenger.", proof: "You will add a case the first example missed.", input: "Unusual input", action: "Exercise behavior", output: "Known result" },
  { id: "test-boundary", term: "boundary value", definition: "A boundary value sits exactly where behavior changes from one rule to another.", analogy: "A fare rule changes at exactly the age printed on the sign.", proof: "You will test values immediately below, at, and above a limit.", input: "Rule limit", action: "Check around edge", output: "Correct transition" },
  { id: "test-regression", term: "regression test", definition: "A regression test preserves behavior that failed before and was later fixed.", analogy: "A repaired gate is checked with the same push that exposed the broken latch.", proof: "You will keep a previous bug from returning.", input: "Past bug", action: "Repeat failing case", output: "Protected fix" },
  { id: "test-double", term: "test double", definition: "A test double is a controlled replacement for a real dependency during a test.", analogy: "A fire drill uses a safe practice alarm instead of starting a real fire.", proof: "You will replace a request with fixed lesson data.", input: "Real dependency", action: "Use controlled stand-in", output: "Deterministic test" },
  { id: "debug-breakpoint", term: "breakpoint", definition: "A breakpoint pauses code at one line so you can inspect current values.", analogy: "A checkpoint stops a vehicle long enough to inspect its papers.", proof: "You will isolate the line where a wrong value first appears.", input: "Running code", action: "Pause at line", output: "Visible state" },
  { id: "debug-stack-trace", term: "stack trace", definition: "A stack trace lists the chain of function calls that led to an error.", analogy: "A delivery log shows every handoff before a parcel reached the wrong desk.", proof: "You will read a call chain and fix its source.", input: "Thrown error", action: "Follow calls backward", output: "Source line" },
  { id: "debug-network-panel", term: "Network panel", definition: "The Network panel shows each browser request, its timing, status, and transferred data.", analogy: "A dispatch board shows every trip, departure time, result, and load.", proof: "You will interpret a captured request record.", input: "Page requests", action: "Inspect records", output: "Request evidence" },
  { id: "debug-performance-profile", term: "performance profile", definition: "A performance profile records where browser time is spent during an interaction.", analogy: "A timed kitchen log shows which preparation step delays every order.", proof: "You will find the slowest measured task in a profile.", input: "Timed work", action: "Compare duration", output: "Largest cost" },
];

function buildConcept(seed: ConceptSeed): Concept {
  return {
    id: seed.id,
    term: seed.term,
    definition: seed.definition,
    analogy: seed.analogy,
    visual: {
      kind: "diagram",
      diagram: {
        alt: `${seed.input} moves through ${seed.action} and becomes ${seed.output}.`,
        columns: 3,
        nodes: [
          { id: "input", label: seed.input, tone: "ghost" },
          { id: "action", label: seed.action, tone: "accent" },
          { id: "output", label: seed.output, tone: "box" },
        ],
        arrows: [
          { from: "input", to: "action" },
          { from: "action", to: "output" },
        ],
      },
    },
    proof: seed.proof,
  };
}

export const newCourseConcepts: Record<string, Concept> = Object.fromEntries(
  seeds.map((seed) => [seed.id, buildConcept(seed)]),
);
