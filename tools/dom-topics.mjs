/**
 * dom-topics.mjs - JavaScript on a page, as data.
 *
 * WHY THIS COURSE EXISTS
 *
 * The JavaScript course is 655 steps and every one of them ends in
 * `console.log`. Grepped across it: no `document.`, no `querySelector`, no
 * `addEventListener`, no `fetch`. A learner finishing it has never made a web
 * page do anything. That is decision 39's finding, and this is the course that
 * closes it.
 *
 * HOW A TOPIC BECOMES A PROJECT
 *
 * Each topic is a fixture - a few lines of markup - and a script built one
 * line per step. The step before each line is the same script with that line's
 * value blanked.
 *
 * Assertions use the `page-*` family, which is checked after the script has
 * run. The plain `exists` / `text-equals` family cannot be used here: it runs
 * in a frame where nothing executes, so it would describe the starting markup
 * and say nothing about what the learner's code did.
 *
 * `slots` are the only thing the model writes: short strings that appear in
 * the markup and in the expected results. Both are generated from the same
 * values, so they cannot disagree.
 */

export const DOM_FIXTURES = {
  notice: {
    slots: ["a barangay notice heading, two or three words", "a one-sentence message under 10 words"],
    html: (s) => `<h1 id="notice-title">${s[0]}</h1>\n<p id="notice-body">${s[1]}</p>`,
  },
  button: {
    slots: ["a label for a button, one or two words", "a short line the page shows at first"],
    html: (s) => `<button id="action">${s[0]}</button>\n<p id="status">${s[1]}</p>`,
  },
  field: {
    slots: ["a label for a name box, one or two words", "a first name"],
    html: (s) => `<label for="who">${s[0]}</label>\n<input id="who" value="">\n<p id="greeting"></p>`,
  },
  list: {
    slots: ["a heading for a list, two or three words", "one item that belongs on it"],
    html: (s) => `<h2 id="list-title">${s[0]}</h2>\n<ul id="items"></ul>\n<p id="count"></p>`,
  },
};

export const DOM_TOPICS = [
  {
    id: "find-element", label: "finding an element on the page", fixture: "notice",
    lines: [
      { name: "title", expr: () => `document.querySelector("#notice-title")`, blankExpr: "document.querySelector();", test: (v) => ({ kind: "page-text-equals", selector: "#notice-title", value: v[0] }), task: "Find the heading so the script can work with it.", hint1: "Ask the document for the element with that id.", hint2: 'Write document.querySelector("#notice-title") after the equals sign.' },
      { name: "words", expr: () => `title.textContent`, test: (v) => ({ kind: "page-text-equals", selector: "#notice-title", value: v[0] }), task: "Read the words that are already in the heading.", hint1: "An element keeps its words in a property.", hint2: "Write title.textContent after the equals sign." },
      { raw: () => `title.textContent = words + " (updated)";`, blank: "title.textContent = ;", token: "title.textContent = ;", test: (v) => ({ kind: "page-text-equals", selector: "#notice-title", value: `${v[0]} (updated)` }), task: "Add the word updated to the end of the heading.", hint1: "Join the words you read to the new part.", hint2: 'Write words + " (updated)" after the equals sign.' },
      { name: "body", expr: () => `document.querySelector("#notice-body")`, test: (v) => ({ kind: "page-text-equals", selector: "#notice-body", value: v[1] }), task: "Find the message below the heading.", hint1: "Ask the document for the element with that id.", hint2: 'Write document.querySelector("#notice-body") after the equals sign.' },
      { raw: () => `body.textContent = "Please read the notice above.";`, blank: "body.textContent = ;", token: "body.textContent = ;", test: () => ({ kind: "page-text-equals", selector: "#notice-body", value: "Please read the notice above." }), task: "Replace the message with a line pointing at the heading.", hint1: "Put the new words in quotes.", hint2: 'Write "Please read the notice above." after the equals sign.' },
    ],
  },
  {
    id: "change-text", label: "changing what a page says", fixture: "notice",
    lines: [
      { name: "title", expr: () => `document.querySelector("#notice-title")`, test: (v) => ({ kind: "page-text-equals", selector: "#notice-title", value: v[0] }), task: "Find the heading.", hint1: "Ask the document for the element with that id.", hint2: 'Write document.querySelector("#notice-title") after the equals sign.' },
      { raw: () => `title.textContent = "Today's Notice";`, blank: "title.textContent = ;", token: "title.textContent = ;", test: () => ({ kind: "page-text-equals", selector: "#notice-title", value: "Today's Notice" }), task: "Change the heading to say Today's Notice.", hint1: "Put the new words in quotes.", hint2: `Write "Today's Notice" after the equals sign.` },
      { name: "body", expr: () => `document.querySelector("#notice-body")`, test: (v) => ({ kind: "page-text-equals", selector: "#notice-body", value: v[1] }), task: "Find the message.", hint1: "Ask the document for the element with that id.", hint2: 'Write document.querySelector("#notice-body") after the equals sign.' },
      { raw: (v) => `body.textContent = "${v[1]} Thank you.";`, blank: "body.textContent = ;", token: "body.textContent = ;", test: (v) => ({ kind: "page-text-equals", selector: "#notice-body", value: `${v[1]} Thank you.` }), task: "Add a thank you to the end of the message.", hint1: "Put the whole new sentence in quotes.", hint2: (v) => `Write "${v[1]} Thank you." after the equals sign.` },
      { raw: () => `title.setAttribute("lang", "en");`, blank: 'title.setAttribute("lang", );', token: 'title.setAttribute("lang", );', test: () => ({ kind: "page-attr-equals", selector: "#notice-title", attr: "lang", value: "en" }), task: "Mark the heading as English so screen readers say it correctly.", hint1: "The language code goes in quotes as the second value.", hint2: 'Write "en" as the second value.' },
    ],
  },
  {
    id: "click-handler", label: "making a button do something", fixture: "button",
    lines: [
      { name: "button", expr: () => `document.querySelector("#action")`, test: (v) => ({ kind: "page-text-equals", selector: "#action", value: v[0] }), task: "Find the button.", hint1: "Ask the document for the element with that id.", hint2: 'Write document.querySelector("#action") after the equals sign.' },
      { name: "status", expr: () => `document.querySelector("#status")`, test: (v) => ({ kind: "page-text-equals", selector: "#status", value: v[1] }), task: "Find the line the page shows.", hint1: "Ask the document for the element with that id.", hint2: 'Write document.querySelector("#status") after the equals sign.' },
      { raw: () => `button.addEventListener("click", function () {\n  status.textContent = "Done";\n});`, blank: 'button.addEventListener(, function () {\n  status.textContent = "Done";\n});', token: "addEventListener(,", test: () => ({ kind: "page-click-text-equals", clickSelector: "#action", selector: "#status", value: "Done" }), task: "Make the line say Done when the button is pressed.", hint1: "Name the event you are listening for, in quotes.", hint2: 'Write "click" as the first value.' },
      { raw: () => `button.setAttribute("type", "button");`, blank: 'button.setAttribute("type", );', token: 'button.setAttribute("type", );', test: () => ({ kind: "page-attr-equals", selector: "#action", attr: "type", value: "button" }), task: "Say plainly that this button does not submit a form.", hint1: "The type goes in quotes as the second value.", hint2: 'Write "button" as the second value.' },
      { raw: () => `status.setAttribute("role", "status");`, blank: 'status.setAttribute("role", );', token: 'status.setAttribute("role", );', test: () => ({ kind: "page-attr-equals", selector: "#status", attr: "role", value: "status" }), task: "Let a screen reader announce the line when it changes.", hint1: "The role name goes in quotes as the second value.", hint2: 'Write "status" as the second value.' },
    ],
  },
  {
    id: "toggle-class", label: "changing how something looks on a click", fixture: "button",
    lines: [
      { name: "button", expr: () => `document.querySelector("#action")`, test: (v) => ({ kind: "page-text-equals", selector: "#action", value: v[0] }), task: "Find the button.", hint1: "Ask the document for the element with that id.", hint2: 'Write document.querySelector("#action") after the equals sign.' },
      { name: "status", expr: () => `document.querySelector("#status")`, test: (v) => ({ kind: "page-text-equals", selector: "#status", value: v[1] }), task: "Find the line the page shows.", hint1: "Ask the document for the element with that id.", hint2: 'Write document.querySelector("#status") after the equals sign.' },
      { raw: () => `status.classList.add("resting");`, blank: "status.classList.add();", token: "classList.add();", test: () => ({ kind: "page-class-contains", selector: "#status", value: "resting" }), task: "Give the line a starting class of resting.", hint1: "The class name goes in quotes inside the brackets.", hint2: 'Write "resting" inside the brackets.' },
      { raw: () => `button.addEventListener("click", function () {\n  status.classList.toggle("active");\n});`, blank: 'button.addEventListener("click", function () {\n  status.classList.toggle();\n});', token: "classList.toggle();", test: () => ({ kind: "page-click-class-contains", clickSelector: "#action", selector: "#status", value: "active" }), task: "Add the class active when the button is pressed, and take it off when pressed again.", hint1: "The class name goes in quotes inside the brackets.", hint2: 'Write "active" inside the brackets.' },
      { raw: () => `button.setAttribute("aria-pressed", "false");`, blank: 'button.setAttribute("aria-pressed", );', token: 'setAttribute("aria-pressed", );', test: () => ({ kind: "page-attr-equals", selector: "#action", attr: "aria-pressed", value: "false" }), task: "Say that the button starts in its off position.", hint1: "The starting answer goes in quotes as the second value.", hint2: 'Write "false" as the second value.' },
    ],
  },
  {
    id: "read-input", label: "reading what someone typed", fixture: "field",
    lines: [
      { name: "field", expr: () => `document.querySelector("#who")`, test: () => ({ kind: "page-exists", selector: "#who" }), task: "Find the name box.", hint1: "Ask the document for the element with that id.", hint2: 'Write document.querySelector("#who") after the equals sign.' },
      { name: "greeting", expr: () => `document.querySelector("#greeting")`, test: () => ({ kind: "page-exists", selector: "#greeting" }), task: "Find the line where the greeting will go.", hint1: "Ask the document for the element with that id.", hint2: 'Write document.querySelector("#greeting") after the equals sign.' },
      { raw: () => `field.addEventListener("input", function () {\n  greeting.textContent = "Hello, " + field.value;\n});`, blank: 'field.addEventListener("input", function () {\n  greeting.textContent = ;\n});', token: "greeting.textContent = ;", test: (v) => ({ kind: "page-input-text-equals", selector: "#greeting", type: v[1], value: `Hello, ${v[1]}` }), task: "Greet whoever is typing, as they type.", hint1: "A box keeps what was typed in its value property.", hint2: 'Write "Hello, " + field.value after the equals sign.' },
      { raw: () => `field.setAttribute("placeholder", "Your name");`, blank: 'field.setAttribute("placeholder", );', token: 'setAttribute("placeholder", );', test: () => ({ kind: "page-attr-equals", selector: "#who", attr: "placeholder", value: "Your name" }), task: "Show a hint inside the empty box.", hint1: "The hint goes in quotes as the second value.", hint2: 'Write "Your name" as the second value.' },
      { raw: () => `greeting.setAttribute("aria-live", "polite");`, blank: 'greeting.setAttribute("aria-live", );', token: 'setAttribute("aria-live", );', test: () => ({ kind: "page-attr-equals", selector: "#greeting", attr: "aria-live", value: "polite" }), task: "Let a screen reader read the greeting without interrupting.", hint1: "The politeness setting goes in quotes as the second value.", hint2: 'Write "polite" as the second value.' },
    ],
  },
  {
    id: "create-element", label: "adding something to the page", fixture: "list",
    lines: [
      { name: "list", expr: () => `document.querySelector("#items")`, test: () => ({ kind: "page-exists", selector: "#items" }), task: "Find the empty list.", hint1: "Ask the document for the element with that id.", hint2: 'Write document.querySelector("#items") after the equals sign.' },
      { name: "item", expr: () => `document.createElement("li")`, blankExpr: "document.createElement();", test: () => ({ kind: "page-exists", selector: "#items" }), task: "Make a new list item, not yet on the page.", hint1: "The tag name goes in quotes inside the brackets.", hint2: 'Write document.createElement("li") after the equals sign.' },
      { raw: (v) => `item.textContent = "${v[1]}";`, blank: "item.textContent = ;", token: "item.textContent = ;", test: () => ({ kind: "page-exists", selector: "#items" }), task: "Put the words into the new item.", hint1: "Put the words in quotes.", hint2: (v) => `Write "${v[1]}" after the equals sign.` },
      { raw: () => `list.appendChild(item);`, blank: "list.appendChild();", token: "appendChild();", test: (v) => ({ kind: "page-text-equals", selector: "#items li", value: v[1] }), task: "Put the new item onto the page, inside the list.", hint1: "Name the element you are adding.", hint2: "Write item inside the brackets." },
      { raw: () => `document.querySelector("#count").textContent = list.children.length + " item";`, blank: 'document.querySelector("#count").textContent = ;', token: '"#count").textContent = ;', test: () => ({ kind: "page-text-equals", selector: "#count", value: "1 item" }), task: "Show how many items the list now holds.", hint1: "A list reports how many children it has.", hint2: 'Write list.children.length + " item" after the equals sign.' },
    ],
  },
  {
    id: "remove-element", label: "taking something off the page", fixture: "button",
    lines: [
      { name: "button", expr: () => `document.querySelector("#action")`, test: (v) => ({ kind: "page-text-equals", selector: "#action", value: v[0] }), task: "Find the button.", hint1: "Ask the document for the element with that id.", hint2: 'Write document.querySelector("#action") after the equals sign.' },
      { name: "status", expr: () => `document.querySelector("#status")`, test: (v) => ({ kind: "page-text-equals", selector: "#status", value: v[1] }), task: "Find the line the page shows.", hint1: "Ask the document for the element with that id.", hint2: 'Write document.querySelector("#status") after the equals sign.' },
      { raw: () => `status.classList.add("dismissible");`, blank: "status.classList.add();", token: "classList.add();", test: () => ({ kind: "page-class-contains", selector: "#status", value: "dismissible" }), task: "Mark the line as one that can be dismissed.", hint1: "The class name goes in quotes inside the brackets.", hint2: 'Write "dismissible" inside the brackets.' },
      { raw: () => `button.addEventListener("click", function () {\n  button.textContent = "Dismissed";\n});`, blank: 'button.addEventListener("click", function () {\n  button.textContent = ;\n});', token: "button.textContent = ;", test: () => ({ kind: "page-click-text-equals", clickSelector: "#action", selector: "#action", value: "Dismissed" }), task: "Make the button say Dismissed once it has been pressed.", hint1: "Put the new word in quotes.", hint2: 'Write "Dismissed" after the equals sign.' },
      { raw: () => `button.setAttribute("aria-label", "Dismiss this notice");`, blank: 'button.setAttribute("aria-label", );', token: 'setAttribute("aria-label", );', test: () => ({ kind: "page-attr-equals", selector: "#action", attr: "aria-label", value: "Dismiss this notice" }), task: "Give the button a fuller name for screen readers.", hint1: "The fuller name goes in quotes as the second value.", hint2: 'Write "Dismiss this notice" as the second value.' },
    ],
  },
  {
    id: "change-style", label: "changing a style from JavaScript", fixture: "notice",
    lines: [
      { name: "title", expr: () => `document.querySelector("#notice-title")`, test: (v) => ({ kind: "page-text-equals", selector: "#notice-title", value: v[0] }), task: "Find the heading.", hint1: "Ask the document for the element with that id.", hint2: 'Write document.querySelector("#notice-title") after the equals sign.' },
      { raw: () => `title.classList.add("urgent");`, blank: "title.classList.add();", token: "classList.add();", test: () => ({ kind: "page-class-contains", selector: "#notice-title", value: "urgent" }), task: "Mark the heading as urgent, so CSS can style it.", hint1: "The class name goes in quotes inside the brackets.", hint2: 'Write "urgent" inside the brackets.' },
      { name: "body", expr: () => `document.querySelector("#notice-body")`, test: (v) => ({ kind: "page-text-equals", selector: "#notice-body", value: v[1] }), task: "Find the message.", hint1: "Ask the document for the element with that id.", hint2: 'Write document.querySelector("#notice-body") after the equals sign.' },
      { raw: () => `body.classList.add("muted");`, blank: "body.classList.add();", token: "classList.add();", test: () => ({ kind: "page-class-contains", selector: "#notice-body", value: "muted" }), task: "Mark the message as the quieter part.", hint1: "The class name goes in quotes inside the brackets.", hint2: 'Write "muted" inside the brackets.' },
      { raw: () => `title.classList.remove("urgent");`, blank: "title.classList.remove();", token: "classList.remove();", test: () => ({ kind: "page-exists", selector: "#notice-title" }), task: "Take the urgent mark back off the heading.", hint1: "Name the class you are taking away.", hint2: 'Write "urgent" inside the brackets.' },
    ],
  },
];
