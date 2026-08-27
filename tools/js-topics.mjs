/**
 * js-topics.mjs - the JavaScript the course still has to teach, as data.
 *
 * WHAT IS ALREADY COVERED, AND WHY THESE
 *
 * The 430 steps written by hand cover variables, arithmetic, strings, objects,
 * arrays and most of their methods, conditionals, and the logical operators.
 * Checked against the source: map, filter, reduce, and sort already appear;
 * `try`, `class`, `JSON`, and `Map` appear nowhere at all. These topics are
 * the gap - functions taught properly, then error handling, classes, JSON, and
 * the collection types - plus destructuring and spread, which the course uses
 * in its own code but never teaches.
 *
 * HOW A TOPIC BECOMES A PROJECT
 *
 * A topic is a short script built one line per step. Each line names a value
 * and the expression that produces it; the step before it is the same script
 * with that expression blanked, which is the shape the hand-authored steps
 * already use.
 *
 * `slots` are the only thing the model writes: short strings that go inside
 * string literals, so a lesson about `try` is set in a barangay office rather
 * than in the abstract. Every expression, every expected value, and every
 * assertion is fixed here, because a value the model invents will not match
 * what the runner actually produces and the step's check could never pass.
 *
 * A line's `test` is a function of the filled slots, so the expectation and
 * the code are generated from the same data and cannot drift apart.
 */

/**
 * Each topic: `slots` describes what to ask the model for, `lines` is the
 * script in order. The last line is normally a `console.log`, which is what
 * the learner sees run.
 *
 * A line is `{ name, expr, test, task, hint1, hint2 }`. `name` is the variable
 * being declared, or null for a bare statement such as a log. `expr` and
 * `test` both receive the slot values.
 */
export const JS_TOPICS = [
  {
    id: "function-declaration", label: "a function you can call",
    slots: ["a short greeting, two or three words"],
    lines: [
      { name: "greeting", expr: (v) => `"${v[0]}"`, test: (v) => ({ kind: "js-value", expression: "greeting", equals: v[0] }), task: (v) => `Store the greeting ${v[0]}.`, hint1: "Put the words in quotes after the equals sign.", hint2: (v) => `Write "${v[0]}" after the equals sign.` },
      { raw: () => `function greet() {\n  return greeting;\n}`, blank: "function greet() {\n  return ;\n}", token: "return ;", test: (v) => ({ kind: "js-returns", fn: "greet", args: [], equals: v[0] }), task: "Make the function hand back the greeting.", hint1: "A function hands a value back with return.", hint2: "Write greeting after return." },
      { name: "welcome", expr: () => `greet()`, test: (v) => ({ kind: "js-value", expression: "welcome", equals: v[0] }), task: "Call the function and keep what it gives back.", hint1: "Write the function name followed by round brackets.", hint2: "Write greet() after the equals sign." },
      { name: "shout", expr: () => `welcome.toUpperCase()`, test: (v) => ({ kind: "js-value", expression: "shout", equals: v[0].toUpperCase() }), task: "Make a loud version of the greeting.", hint1: "Use the string method that returns capitals.", hint2: "Write welcome.toUpperCase() after the equals sign." },
      { log: "shout", test: (v) => ({ kind: "js-logs", values: [v[0].toUpperCase()] }), task: "Print the loud greeting.", hint1: "Put shout inside console.log.", hint2: "Write console.log(shout);" },
    ],
  },
  {
    id: "function-parameters", label: "a function that takes a value",
    slots: ["a person's first name", "another person's first name"],
    lines: [
      { raw: () => `function greetPerson(name) {\n  return "Hello, " + name;\n}`, blank: 'function greetPerson(name) {\n  return ;\n}', token: "return ;", test: (v) => ({ kind: "js-returns", fn: "greetPerson", args: [v[0]], equals: `Hello, ${v[0]}` }), task: "Make the function greet whoever it is given.", hint1: "Join the fixed words to the name it was handed.", hint2: 'Write "Hello, " + name after return.' },
      { name: "first", expr: (v) => `greetPerson("${v[0]}")`, test: (v) => ({ kind: "js-value", expression: "first", equals: `Hello, ${v[0]}` }), task: (v) => `Greet ${v[0]}.`, hint1: "Put the name in quotes inside the brackets.", hint2: (v) => `Write greetPerson("${v[0]}") after the equals sign.` },
      { name: "second", expr: (v) => `greetPerson("${v[1]}")`, test: (v) => ({ kind: "js-value", expression: "second", equals: `Hello, ${v[1]}` }), task: (v) => `Greet ${v[1]} with the same function.`, hint1: "Call it again with a different name.", hint2: (v) => `Write greetPerson("${v[1]}") after the equals sign.` },
      { name: "both", expr: () => `first + " and " + second`, test: (v) => ({ kind: "js-value", expression: "both", equals: `Hello, ${v[0]} and Hello, ${v[1]}` }), task: "Join the two greetings into one line.", hint1: "Join the two with the words in between.", hint2: 'Write first + " and " + second after the equals sign.' },
      { log: "both", test: (v) => ({ kind: "js-logs", values: [`Hello, ${v[0]} and Hello, ${v[1]}`] }), task: "Print both greetings.", hint1: "Put both inside console.log.", hint2: "Write console.log(both);" },
    ],
  },
  {
    id: "arrow-function", label: "the short way to write a function",
    slots: ["a service the barangay offers, one or two words"],
    lines: [
      { name: "service", expr: (v) => `"${v[0]}"`, test: (v) => ({ kind: "js-value", expression: "service", equals: v[0] }), task: (v) => `Store the service name ${v[0]}.`, hint1: "Put the words in quotes.", hint2: (v) => `Write "${v[0]}" after the equals sign.` },
      { name: "label", expr: () => `(text) => "Service: " + text`, blankExpr: "(text) => ;", token: "(text) => ;", test: () => ({ kind: "js-runs" }), task: "Write a short function that labels any service name.", hint1: "After the arrow, give the value the function hands back.", hint2: 'Write (text) => "Service: " + text after the equals sign.' },
      { name: "labelled", expr: () => `label(service)`, test: (v) => ({ kind: "js-value", expression: "labelled", equals: `Service: ${v[0]}` }), task: "Label the stored service.", hint1: "Call the short function with the service.", hint2: "Write label(service) after the equals sign." },
      { name: "short", expr: () => `labelled.length`, test: (v) => ({ kind: "js-value", expression: "short", equals: `Service: ${v[0]}`.length }), task: "Count the letters in the labelled service.", hint1: "Use the property that gives a string's length.", hint2: "Write labelled.length after the equals sign." },
      { log: "labelled", test: (v) => ({ kind: "js-logs", values: [`Service: ${v[0]}`] }), task: "Print the labelled service.", hint1: "Put labelled inside console.log.", hint2: "Write console.log(labelled);" },
    ],
  },
  {
    id: "default-parameters", label: "a value used when none is given",
    slots: ["a barangay desk name, one or two words"],
    lines: [
      { raw: () => `function deskName(name = "Front desk") {\n  return name;\n}`, blank: 'function deskName(name = ) {\n  return name;\n}', token: "name = )", test: () => ({ kind: "js-returns", fn: "deskName", args: [], equals: "Front desk" }), task: "Give the function a fallback name to use when it is called with nothing.", hint1: "Put the fallback after the equals sign in the brackets.", hint2: 'Write "Front desk" after the equals sign.' },
      { name: "fallback", expr: () => `deskName()`, test: () => ({ kind: "js-value", expression: "fallback", equals: "Front desk" }), task: "Call the function with nothing at all.", hint1: "Leave the round brackets empty.", hint2: "Write deskName() after the equals sign." },
      { name: "named", expr: (v) => `deskName("${v[0]}")`, test: (v) => ({ kind: "js-value", expression: "named", equals: v[0] }), task: (v) => `Call it again with ${v[0]}.`, hint1: "Put the name in quotes inside the brackets.", hint2: (v) => `Write deskName("${v[0]}") after the equals sign.` },
      { name: "both", expr: () => `fallback + " / " + named`, test: (v) => ({ kind: "js-value", expression: "both", equals: `Front desk / ${v[0]}` }), task: "Join the two results with a slash between them.", hint1: "Join the two with the slash in quotes between them.", hint2: 'Write fallback + " / " + named after the equals sign.' },
      { log: "both", test: (v) => ({ kind: "js-logs", values: [`Front desk / ${v[0]}`] }), task: "Print both desk names.", hint1: "Put both inside console.log.", hint2: "Write console.log(both);" },
    ],
  },
  {
    id: "template-literal", label: "building text with backticks",
    slots: ["an item sold in a sari-sari store, one or two words", "a whole number price under 200"],
    lines: [
      { name: "item", expr: (v) => `"${v[0]}"`, test: (v) => ({ kind: "js-value", expression: "item", equals: v[0] }), task: (v) => `Store the item name ${v[0]}.`, hint1: "Put the words in quotes.", hint2: (v) => `Write "${v[0]}" after the equals sign.` },
      { name: "price", expr: (v) => `${v[1]}`, test: (v) => ({ kind: "js-value", expression: "price", equals: Number(v[1]) }), task: (v) => `Store the price ${v[1]}.`, hint1: "A number needs no quotes.", hint2: (v) => `Write ${v[1]} after the equals sign.` },
      { name: "line", expr: () => "`${item} costs PHP ${price}`", blankExpr: "``", token: "``", test: (v) => ({ kind: "js-value", expression: "line", equals: `${v[0]} costs PHP ${v[1]}` }), task: "Build the price line using backticks instead of joining with plus signs.", hint1: "Inside backticks, a value goes in a dollar sign and curly brackets.", hint2: "Write ${item} costs PHP ${price} between the backticks." },
      { name: "shout", expr: () => `line.toUpperCase()`, test: (v) => ({ kind: "js-value", expression: "shout", equals: `${v[0]} costs PHP ${v[1]}`.toUpperCase() }), task: "Make a loud version of the price line.", hint1: "Use the string method that returns capitals.", hint2: "Write line.toUpperCase() after the equals sign." },
      { log: "line", test: (v) => ({ kind: "js-logs", values: [`${v[0]} costs PHP ${v[1]}`] }), task: "Print the price line.", hint1: "Put line inside console.log.", hint2: "Write console.log(line);" },
    ],
  },
  {
    id: "destructuring-array", label: "unpacking a list into names",
    slots: ["a first name", "a second first name", "a third first name"],
    lines: [
      { name: "queue", expr: (v) => `["${v[0]}", "${v[1]}", "${v[2]}"]`, test: (v) => ({ kind: "js-value", expression: "queue", equals: [v[0], v[1], v[2]] }), task: "Store the three people waiting.", hint1: "Use square brackets and quote each name.", hint2: (v) => `Write ["${v[0]}", "${v[1]}", "${v[2]}"] after the equals sign.` },
      { raw: () => `const [firstUp, secondUp] = queue;`, blank: "const [firstUp, secondUp] = ;", token: "= ;", test: (v) => ({ kind: "js-value", expression: "firstUp", equals: v[0] }), task: "Unpack the first two people into their own names.", hint1: "Name the list the two names come out of.", hint2: "Write queue after the equals sign." },
      { name: "waiting", expr: () => `queue.length - 2`, test: () => ({ kind: "js-value", expression: "waiting", equals: 1 }), task: "Work out how many are still waiting after those two.", hint1: "Take two away from the list length.", hint2: "Write queue.length - 2 after the equals sign." },
      { name: "callNext", expr: () => "`Now serving ${firstUp}, then ${secondUp}`", blankExpr: "``", token: "``", test: (v) => ({ kind: "js-value", expression: "callNext", equals: `Now serving ${v[0]}, then ${v[1]}` }), task: "Build the announcement for the first two.", hint1: "Use backticks and put each name in a dollar sign and curly brackets.", hint2: "Write Now serving ${firstUp}, then ${secondUp} between the backticks." },
      { log: "callNext", test: (v) => ({ kind: "js-logs", values: [`Now serving ${v[0]}, then ${v[1]}`] }), task: "Print the announcement.", hint1: "Put callNext inside console.log.", hint2: "Write console.log(callNext);" },
    ],
  },
  {
    id: "destructuring-object", label: "unpacking a record into names",
    slots: ["a barangay office name, one or two words", "a phone number like 0917 555 0101"],
    lines: [
      { name: "office", expr: (v) => `{ name: "${v[0]}", phone: "${v[1]}" }`, test: (v) => ({ kind: "js-value", expression: "office.name", equals: v[0] }), task: "Store the office name and phone number together in one record.", hint1: "Use curly brackets with name and phone inside.", hint2: (v) => `Write { name: "${v[0]}", phone: "${v[1]}" } after the equals sign.` },
      { raw: () => `const { name, phone } = office;`, blank: "const { name, phone } = ;", token: "= ;", test: (v) => ({ kind: "js-value", expression: "name", equals: v[0] }), task: "Unpack the record into two plain names.", hint1: "Name the record the two values come out of.", hint2: "Write office after the equals sign." },
      { name: "contact", expr: () => "`${name}: ${phone}`", blankExpr: "``", token: "``", test: (v) => ({ kind: "js-value", expression: "contact", equals: `${v[0]}: ${v[1]}` }), task: "Build one contact line from the two unpacked values.", hint1: "Use backticks with each value in a dollar sign and curly brackets.", hint2: "Write ${name}: ${phone} between the backticks." },
      { name: "digits", expr: () => `phone.replace(/ /g, "")`, test: (v) => ({ kind: "js-value", expression: "digits", equals: v[1].replace(/ /g, "") }), task: "Make a version of the number with no spaces.", hint1: "Replace every space with nothing.", hint2: 'Write phone.replace(/ /g, "") after the equals sign.' },
      { log: "contact", test: (v) => ({ kind: "js-logs", values: [`${v[0]}: ${v[1]}`] }), task: "Print the contact line.", hint1: "Put contact inside console.log.", hint2: "Write console.log(contact);" },
    ],
  },
  {
    id: "spread-array", label: "copying and joining lists",
    slots: ["an item on a relief list", "another item on a relief list"],
    lines: [
      { name: "boxA", expr: (v) => `["${v[0]}"]`, test: (v) => ({ kind: "js-value", expression: "boxA", equals: [v[0]] }), task: (v) => `Store a list holding only ${v[0]}.`, hint1: "Use square brackets with one quoted item.", hint2: (v) => `Write ["${v[0]}"] after the equals sign.` },
      { name: "boxB", expr: (v) => `["${v[1]}"]`, test: (v) => ({ kind: "js-value", expression: "boxB", equals: [v[1]] }), task: (v) => `Store a second list holding only ${v[1]}.`, hint1: "Use square brackets with one quoted item.", hint2: (v) => `Write ["${v[1]}"] after the equals sign.` },
      { name: "combined", expr: () => `[...boxA, ...boxB]`, test: (v) => ({ kind: "js-value", expression: "combined", equals: [v[0], v[1]] }), task: "Pour both lists into one new list.", hint1: "Three dots before a list pours its items out.", hint2: "Write [...boxA, ...boxB] after the equals sign." },
      { name: "count", expr: () => `combined.length`, test: () => ({ kind: "js-value", expression: "count", equals: 2 }), task: "Count what the combined list holds.", hint1: "Use the property that gives a list's length.", hint2: "Write combined.length after the equals sign." },
      { log: "count", test: () => ({ kind: "js-logs", values: ["2"] }), task: "Print how many items there are.", hint1: "Put count inside console.log.", hint2: "Write console.log(count);" },
    ],
  },
  {
    id: "rest-parameters", label: "a function that takes any number of values",
    slots: ["a whole number under 100", "another whole number under 100"],
    lines: [
      { raw: () => `function addAll(...amounts) {\n  return amounts.length;\n}`, blank: "function addAll() {\n  return amounts.length;\n}", token: "addAll()", test: () => ({ kind: "js-returns", fn: "addAll", args: [1, 2, 3], equals: 3 }), task: "Let the function accept however many amounts it is given.", hint1: "Three dots before a parameter name gathers everything into a list.", hint2: "Write ...amounts inside the brackets." },
      { name: "two", expr: (v) => `addAll(${v[0]}, ${v[1]})`, test: () => ({ kind: "js-value", expression: "two", equals: 2 }), task: "Call it with two amounts.", hint1: "Put both numbers inside the brackets, separated by a comma.", hint2: (v) => `Write addAll(${v[0]}, ${v[1]}) after the equals sign.` },
      { name: "three", expr: (v) => `addAll(${v[0]}, ${v[1]}, ${v[0]})`, test: () => ({ kind: "js-value", expression: "three", equals: 3 }), task: "Call it again with three amounts.", hint1: "Add one more number inside the brackets.", hint2: (v) => `Write addAll(${v[0]}, ${v[1]}, ${v[0]}) after the equals sign.` },
      { name: "grew", expr: () => `three - two`, test: () => ({ kind: "js-value", expression: "grew", equals: 1 }), task: "Work out how many more the second call counted.", hint1: "Take the first count away from the second.", hint2: "Write three - two after the equals sign." },
      { log: "three", test: () => ({ kind: "js-logs", values: ["3"] }), task: "Print the larger count.", hint1: "Put three inside console.log.", hint2: "Write console.log(three);" },
    ],
  },
  {
    id: "try-catch", label: "handling something that goes wrong",
    slots: ["a barangay record name, one or two words"],
    lines: [
      { name: "raw", expr: (v) => `"${v[0]}"`, test: (v) => ({ kind: "js-value", expression: "raw", equals: v[0] }), task: (v) => `Store the record name ${v[0]}.`, hint1: "Put the words in quotes.", hint2: (v) => `Write "${v[0]}" after the equals sign.` },
      { raw: () => `let status = "";\ntry {\n  status = raw.toUpperCase();\n} catch (error) {\n  status = "unreadable";\n}`, blank: 'let status = "";\ntry {\n  status = ;\n} catch (error) {\n  status = "unreadable";\n}', token: "status = ;", test: (v) => ({ kind: "js-value", expression: "status", equals: v[0].toUpperCase() }), task: "Inside the attempt, make a capitalised version of the record name.", hint1: "Use the string method that returns capitals.", hint2: "Write raw.toUpperCase() after the equals sign." },
      { name: "worked", expr: () => `status !== "unreadable"`, test: () => ({ kind: "js-value", expression: "worked", equals: true }), task: "Check whether the attempt succeeded.", hint1: "Compare the status against the failure word.", hint2: 'Write status !== "unreadable" after the equals sign.' },
      { name: "report", expr: () => "`Record ${status} read: ${worked}`", blankExpr: "``", token: "``", test: (v) => ({ kind: "js-value", expression: "report", equals: `Record ${v[0].toUpperCase()} read: true` }), task: "Build a line naming the record and whether it was read.", hint1: "Use backticks with each value in a dollar sign and curly brackets.", hint2: "Write Record ${status} read: ${worked} between the backticks." },
      { log: "report", test: (v) => ({ kind: "js-logs", values: [`Record ${v[0].toUpperCase()} read: true`] }), task: "Print the report.", hint1: "Put report inside console.log.", hint2: "Write console.log(report);" },
    ],
  },
  {
    id: "throw-error", label: "refusing a value that makes no sense",
    slots: ["a whole number between 10 and 90"],
    lines: [
      { raw: () => `function checkAge(age) {\n  if (age < 0) {\n    throw new Error("Age cannot be negative");\n  }\n  return age;\n}`, blank: "function checkAge(age) {\n  if (age < 0) {\n    throw ;\n  }\n  return age;\n}", token: "throw ;", test: (v) => ({ kind: "js-returns", fn: "checkAge", args: [Number(v[0])], equals: Number(v[0]) }), task: "Refuse a negative age by raising an error.", hint1: "Raise a new Error with a message explaining the refusal.", hint2: 'Write new Error("Age cannot be negative") after throw.' },
      { name: "good", expr: (v) => `checkAge(${v[0]})`, test: (v) => ({ kind: "js-value", expression: "good", equals: Number(v[0]) }), task: (v) => `Check the age ${v[0]}, which is fine.`, hint1: "Put the number inside the brackets.", hint2: (v) => `Write checkAge(${v[0]}) after the equals sign.` },
      { raw: () => `let message = "";\ntry {\n  checkAge(-1);\n} catch (error) {\n  message = error.message;\n}`, blank: 'let message = "";\ntry {\n  checkAge(-1);\n} catch (error) {\n  message = ;\n}', token: "message = ;", test: () => ({ kind: "js-value", expression: "message", equals: "Age cannot be negative" }), task: "Catch the refusal and keep the reason it gave.", hint1: "An error carries its reason on a property.", hint2: "Write error.message after the equals sign." },
      { name: "summary", expr: () => "`Checked ${good}, refused: ${message}`", blankExpr: "``", token: "``", test: (v) => ({ kind: "js-value", expression: "summary", equals: `Checked ${v[0]}, refused: Age cannot be negative` }), task: "Build a line naming the good value and the refusal.", hint1: "Use backticks with each value in a dollar sign and curly brackets.", hint2: "Write Checked ${good}, refused: ${message} between the backticks." },
      { log: "summary", test: (v) => ({ kind: "js-logs", values: [`Checked ${v[0]}, refused: Age cannot be negative`] }), task: "Print the summary.", hint1: "Put summary inside console.log.", hint2: "Write console.log(summary);" },
    ],
  },
  {
    id: "class-basics", label: "a blueprint for records of the same shape",
    slots: ["a resident's first name", "a whole number between 18 and 80"],
    lines: [
      { raw: () => `class Resident {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n}`, blank: "class Resident {\n  constructor(name, age) {\n    this.name = ;\n    this.age = age;\n  }\n}", token: "this.name = ;", test: (v) => ({ kind: "js-value", expression: `new Resident("${v[0]}", ${v[1]}).name`, equals: v[0] }), task: "Store the name that the blueprint is handed.", hint1: "The value handed in is the parameter of the same name.", hint2: "Write name after the equals sign." },
      { name: "one", expr: (v) => `new Resident("${v[0]}", ${v[1]})`, test: (v) => ({ kind: "js-value", expression: "one.name", equals: v[0] }), task: (v) => `Make a record for ${v[0]}.`, hint1: "Use new followed by the blueprint name and the two values.", hint2: (v) => `Write new Resident("${v[0]}", ${v[1]}) after the equals sign.` },
      { name: "years", expr: () => `one.age`, test: (v) => ({ kind: "js-value", expression: "years", equals: Number(v[1]) }), task: "Read the age off the record.", hint1: "Reach into the record with a dot.", hint2: "Write one.age after the equals sign." },
      { name: "line", expr: () => "`${one.name} is ${years}`", blankExpr: "``", token: "``", test: (v) => ({ kind: "js-value", expression: "line", equals: `${v[0]} is ${v[1]}` }), task: "Build a line naming the resident and their age.", hint1: "Use backticks with each value in a dollar sign and curly brackets.", hint2: "Write ${one.name} is ${years} between the backticks." },
      { log: "line", test: (v) => ({ kind: "js-logs", values: [`${v[0]} is ${v[1]}`] }), task: "Print the resident line.", hint1: "Put line inside console.log.", hint2: "Write console.log(line);" },
    ],
  },
  {
    id: "class-method", label: "giving a blueprint something it can do",
    slots: ["a barangay desk name, one or two words"],
    lines: [
      { raw: () => `class Desk {\n  constructor(name) {\n    this.name = name;\n  }\n  label() {\n    return "Desk: " + this.name;\n  }\n}`, blank: 'class Desk {\n  constructor(name) {\n    this.name = name;\n  }\n  label() {\n    return ;\n  }\n}', token: "return ;", test: (v) => ({ kind: "js-value", expression: `new Desk("${v[0]}").label()`, equals: `Desk: ${v[0]}` }), task: "Make the blueprint able to label itself.", hint1: "Join the fixed words to the record's own name.", hint2: 'Write "Desk: " + this.name after return.' },
      { name: "desk", expr: (v) => `new Desk("${v[0]}")`, test: (v) => ({ kind: "js-value", expression: "desk.name", equals: v[0] }), task: (v) => `Make a desk record for ${v[0]}.`, hint1: "Use new followed by the blueprint name and the desk name.", hint2: (v) => `Write new Desk("${v[0]}") after the equals sign.` },
      { name: "labelled", expr: () => `desk.label()`, test: (v) => ({ kind: "js-value", expression: "labelled", equals: `Desk: ${v[0]}` }), task: "Ask the desk to label itself.", hint1: "Call the method with a dot and round brackets.", hint2: "Write desk.label() after the equals sign." },
      { name: "shout", expr: () => `labelled.toUpperCase()`, test: (v) => ({ kind: "js-value", expression: "shout", equals: `Desk: ${v[0]}`.toUpperCase() }), task: "Make a loud version of the label.", hint1: "Use the string method that returns capitals.", hint2: "Write labelled.toUpperCase() after the equals sign." },
      { log: "labelled", test: (v) => ({ kind: "js-logs", values: [`Desk: ${v[0]}`] }), task: "Print the desk label.", hint1: "Put labelled inside console.log.", hint2: "Write console.log(labelled);" },
    ],
  },
  {
    id: "json", label: "turning records into text and back",
    slots: ["a barangay office name, one or two words", "a whole number under 500"],
    lines: [
      { name: "record", expr: (v) => `{ office: "${v[0]}", queue: ${v[1]} }`, test: (v) => ({ kind: "js-value", expression: "record.office", equals: v[0] }), task: "Store the office and how many are queueing.", hint1: "Use curly brackets with office and queue inside.", hint2: (v) => `Write { office: "${v[0]}", queue: ${v[1]} } after the equals sign.` },
      { name: "text", expr: () => `JSON.stringify(record)`, test: (v) => ({ kind: "js-value", expression: "text", equals: JSON.stringify({ office: v[0], queue: Number(v[1]) }) }), task: "Turn the record into text that can be saved or sent.", hint1: "JSON has a method that turns a value into text.", hint2: "Write JSON.stringify(record) after the equals sign." },
      { name: "back", expr: () => `JSON.parse(text)`, test: (v) => ({ kind: "js-value", expression: "back.office", equals: v[0] }), task: "Turn that text back into a record.", hint1: "JSON has a matching method that reads text back.", hint2: "Write JSON.parse(text) after the equals sign." },
      { name: "same", expr: () => `back.queue === record.queue`, test: () => ({ kind: "js-value", expression: "same", equals: true }), task: "Check the queue survived the round trip.", hint1: "Compare the two queue values with three equals signs.", hint2: "Write back.queue === record.queue after the equals sign." },
      { log: "text", test: (v) => ({ kind: "js-logs", values: [JSON.stringify({ office: v[0], queue: Number(v[1]) })] }), task: "Print the record as text.", hint1: "Put text inside console.log.", hint2: "Write console.log(text);" },
    ],
  },
  {
    id: "set-unique", label: "a collection that refuses duplicates",
    slots: ["a first name", "a second first name"],
    lines: [
      { name: "signups", expr: (v) => `["${v[0]}", "${v[1]}", "${v[0]}"]`, test: (v) => ({ kind: "js-value", expression: "signups.length", equals: 3 }), task: "Store the sign-up list, where one person signed twice.", hint1: "Use square brackets and quote each name.", hint2: (v) => `Write ["${v[0]}", "${v[1]}", "${v[0]}"] after the equals sign.` },
      { name: "unique", expr: () => `new Set(signups)`, test: () => ({ kind: "js-value", expression: "unique.size", equals: 2 }), task: "Make a collection that keeps each name only once.", hint1: "Use new followed by the collection type that refuses duplicates.", hint2: "Write new Set(signups) after the equals sign." },
      { name: "count", expr: () => `unique.size`, test: () => ({ kind: "js-value", expression: "count", equals: 2 }), task: "Count how many different people signed up.", hint1: "This collection reports its size, not its length.", hint2: "Write unique.size after the equals sign." },
      { name: "names", expr: () => `[...unique]`, test: (v) => ({ kind: "js-value", expression: "names", equals: [v[0], v[1]] }), task: "Turn the collection back into a plain list.", hint1: "Three dots pour a collection into a list.", hint2: "Write [...unique] after the equals sign." },
      { log: "count", test: () => ({ kind: "js-logs", values: ["2"] }), task: "Print how many different people signed up.", hint1: "Put count inside console.log.", hint2: "Write console.log(count);" },
    ],
  },
];
