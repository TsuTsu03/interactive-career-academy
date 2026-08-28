import type { Course, Step, TestSpec } from "@/lib/lesson-ir";

interface DebugScenario {
  id: string;
  title: string;
  value: number;
  alternate: number;
  label: string;
}

interface DebugStage {
  task: string;
  code: string;
  tests: TestSpec[];
  hint: string;
  answer: string;
}

interface DebugTopic {
  id: string;
  conceptId: string;
  title: string;
  scenarios: DebugScenario[];
  build: (scenario: DebugScenario) => { starter: string; stages: DebugStage[] };
}

const source = (id: string, label: string, pattern: string, because: string): TestSpec => ({ id, label, kind: "source-matches", file: "script.js", pattern, because });
const returns = (id: string, label: string, fn: string, args: unknown[], equals: unknown): TestSpec => ({ id, label, kind: "js-returns", fn, args, equals });

function caseStages(s: DebugScenario) {
  return {
    starter: `function double(value) { return value * 2; }`,
    stages: [
      { task: "Create one test case with an input and expected result.", code: `function double(value) { return value * 2; } function runCase() { const input = ${s.value}; const expected = ${s.value * 2}; return { input, expected }; }`, tests: [source(`${s.id}-case`, "The test keeps input and expected values", "const\\s+input[\\s\\S]*const\\s+expected", "Create input and expected values."), returns(`${s.id}-case-result`, "The test case describes one example", "runCase", [], { input: s.value, expected: s.value * 2 })], hint: "Keep the example values beside each other inside one function.", answer: "Create input and expected, then return both." },
      { task: "Run the action using the test input.", code: `function double(value) { return value * 2; } function runCase() { const input = ${s.value}; const expected = ${s.value * 2}; const actual = double(input); return { input, expected, actual }; }`, tests: [source(`${s.id}-case-act`, "The test calls double with its input", "double\\(input\\)", "Call double with input."), returns(`${s.id}-case-act-result`, "The test records the actual result", "runCase", [], { input: s.value, expected: s.value * 2, actual: s.value * 2 })], hint: "Save what the function actually returns.", answer: "Create actual = double(input)." },
      { task: "Compare the actual result with the expected result.", code: `function double(value) { return value * 2; } function runCase() { const input = ${s.value}; const expected = ${s.value * 2}; const actual = double(input); return actual === expected; }`, tests: [returns(`${s.id}-case-pass`, "The focused test case passes", "runCase", [], true)], hint: "Use strict equality for the final comparison.", answer: "Return actual === expected." },
      { task: "Let the test case receive its own input and expected value.", code: `function double(value) { return value * 2; } function runCase(input, expected) { const actual = double(input); return actual === expected; }`, tests: [source(`${s.id}-case-parameters`, "The test case accepts input and expected", "function\\s+runCase\\s*\\(\\s*input\\s*,\\s*expected\\s*\\)", "Move input and expected into the function parameters."), returns(`${s.id}-case-reuse`, "The test case works with another example", "runCase", [s.alternate, s.alternate * 2], true)], hint: "Move the example values into the function parameters.", answer: "Accept input and expected in runCase." },
      { task: "Return patient evidence when the test does not match.", code: `function double(value) { return value * 2; } function runCase(input, expected) { const actual = double(input); return { passed: actual === expected, expected, actual }; }`, tests: [returns(`${s.id}-case-complete`, "The test reports expected and actual", "runCase", [s.value, s.value * 2 + 1], { passed: false, expected: s.value * 2 + 1, actual: s.value * 2 })], hint: "Return the comparison and both values in one object.", answer: "Return { passed, expected, actual }." },
    ],
  };
}

function assertionStages(s: DebugScenario) {
  return {
    starter: `function addFee(value) { return value + ${s.alternate}; }`,
    stages: [
      { task: "Create an assertEqual function that compares two values.", code: `function addFee(value) { return value + ${s.alternate}; } function assertEqual(actual, expected) { return actual === expected; }`, tests: [source(`${s.id}-assert`, "The assertion compares actual and expected", "actual\\s*===\\s*expected", "Compare actual and expected."), returns(`${s.id}-assert-pass`, "Equal values pass", "assertEqual", [s.value, s.value], true)], hint: "Use strict equality inside the assertion.", answer: "Return actual === expected." },
      { task: "Add an assertion for values that should differ.", code: `function addFee(value) { return value + ${s.alternate}; } function assertEqual(actual, expected) { return actual === expected; } function assertNotEqual(actual, expected) { return actual !== expected; }`, tests: [source(`${s.id}-assert-not-equal-source`, "The new assertion checks for different values", "function\\s+assertNotEqual[\\s\\S]*actual\\s*!==\\s*expected", "Create assertNotEqual with a strict not-equal check."), returns(`${s.id}-assert-fail`, "Different values pass the new assertion", "assertNotEqual", [s.value, s.value + 1], true)], hint: "Use the strict comparison for values that should differ.", answer: "Create assertNotEqual and return actual !== expected." },
      { task: "Use the equality assertion to check addFee.", code: `function addFee(value) { return value + ${s.alternate}; } function assertEqual(actual, expected) { return actual === expected; } function assertNotEqual(actual, expected) { return actual !== expected; } function testFee() { return assertEqual(addFee(${s.value}), ${s.value + s.alternate}); }`, tests: [returns(`${s.id}-assert-use`, "The fee assertion passes", "testFee", [], true)], hint: "Pass the function result and expected total to assertEqual.", answer: "Return assertEqual(addFee(input), expected)." },
      { task: "Include a clear label in the assertion result.", code: `function addFee(value) { return value + ${s.alternate}; } function assertEqual(label, actual, expected) { return { label, passed: actual === expected }; } function assertNotEqual(actual, expected) { return actual !== expected; } function testFee() { return assertEqual(${JSON.stringify(s.label)}, addFee(${s.value}), ${s.value + s.alternate}); }`, tests: [returns(`${s.id}-assert-label`, "The assertion names what it checks", "testFee", [], { label: s.label, passed: true })], hint: "Accept label before the two compared values.", answer: "Return an object with label and passed." },
      { task: "Report expected and actual when the assertion fails.", code: `function addFee(value) { return value + ${s.alternate}; } function assertEqual(label, actual, expected) { return { label, passed: actual === expected, expected, actual }; } function assertNotEqual(actual, expected) { return actual !== expected; } function testFee() { return assertEqual(${JSON.stringify(s.label)}, addFee(${s.value}), ${s.value + s.alternate + 1}); }`, tests: [returns(`${s.id}-assert-complete`, "The failed assertion has useful evidence", "testFee", [], { label: s.label, passed: false, expected: s.value + s.alternate + 1, actual: s.value + s.alternate })], hint: "Keep both compared values in the returned object.", answer: "Add expected and actual to the assertion result." },
    ],
  };
}

function edgeStages(s: DebugScenario) {
  return {
    starter: `function firstItem(items) { return items[0]; }`,
    stages: [
      { task: "Return a fallback for an empty array.", code: `function firstItem(items) { return items[0] ?? ${JSON.stringify(s.label)}; }`, tests: [returns(`${s.id}-edge-empty`, "An empty list gets a fallback", "firstItem", [[]], s.label)], hint: "Use the missing-value fallback after the first item.", answer: `Return items[0] ?? ${JSON.stringify(s.label)}.` },
      { task: "Add a test for a list that has a real first item.", code: `function firstItem(items) { return items[0] ?? ${JSON.stringify(s.label)}; } function testRealItem() { return firstItem([${s.value}, ${s.alternate}]) === ${s.value}; }`, tests: [source(`${s.id}-edge-real-source`, "A named test covers the non-empty list", "function\\s+testRealItem", "Create a named test for the real first item."), returns(`${s.id}-edge-real`, "The non-empty list test passes", "testRealItem", [], true)], hint: "Call firstItem with a non-empty list inside a test function.", answer: "Create testRealItem and compare the result with the first value." },
      { task: "Handle a missing list before reading its first item.", code: `function firstItem(items) { return items?.[0] ?? ${JSON.stringify(s.label)}; } function testRealItem() { return firstItem([${s.value}, ${s.alternate}]) === ${s.value}; }`, tests: [source(`${s.id}-edge-missing`, "The function checks a missing list", "items\\?\\.\\[0\\]", "Use optional access before index zero."), returns(`${s.id}-edge-missing-result`, "A missing list gets a fallback", "firstItem", [null], s.label)], hint: "Use optional access on the list.", answer: "Return items?.[0] ?? fallback." },
      { task: "Add a test that treats an empty string as real data.", code: `function firstItem(items) { return items?.[0] ?? ${JSON.stringify(s.label)}; } function testRealItem() { return firstItem([${s.value}, ${s.alternate}]) === ${s.value}; } function testEmptyString() { return firstItem([""]) === ""; }`, tests: [source(`${s.id}-edge-empty-string-source`, "A named test covers the empty string", "function\\s+testEmptyString", "Create a named test for the empty string."), returns(`${s.id}-edge-empty-string`, "The empty-string test passes", "testEmptyString", [], true)], hint: "Put the empty string inside an array and compare the returned value.", answer: "Create testEmptyString and compare the result with an empty string." },
      { task: "Return evidence showing which edge case was used.", code: `function firstItem(items) { const value = items?.[0] ?? ${JSON.stringify(s.label)}; return { value, usedFallback: items?.[0] == null }; } function testRealItem() { return firstItem([${s.value}, ${s.alternate}]).value === ${s.value}; } function testEmptyString() { return firstItem([""]).value === ""; }`, tests: [returns(`${s.id}-edge-complete`, "The edge result explains its fallback", "firstItem", [[]], { value: s.label, usedFallback: true })], hint: "Compare the original first item with null before returning.", answer: "Return value and usedFallback fields." },
    ],
  };
}

function boundaryStages(s: DebugScenario) {
  return {
    starter: `function category(value) { return value > ${s.value} ? "high" : "low"; }`,
    stages: [
      { task: "Include the exact limit in the high category.", code: `function category(value) { return value >= ${s.value} ? "high" : "low"; }`, tests: [source(`${s.id}-boundary-equal`, "The limit uses greater than or equal", `value\\s*>=\\s*${s.value}`, "Include the exact limit."), returns(`${s.id}-boundary-equal-result`, "The limit enters the high category", "category", [s.value], "high")], hint: "Use the comparison that includes equality.", answer: `Check value >= ${s.value}.` },
      { task: "Check the value immediately below the boundary.", code: `function category(value) { return value >= ${s.value} ? "high" : "low"; } function belowBoundary() { return category(${s.value - 1}); }`, tests: [returns(`${s.id}-boundary-below`, "The value below stays low", "belowBoundary", [], "low")], hint: "Call category with one less than the limit.", answer: `Return category(${s.value - 1}).` },
      { task: "Check the value immediately above the boundary.", code: `function category(value) { return value >= ${s.value} ? "high" : "low"; } function aboveBoundary() { return category(${s.value + 1}); }`, tests: [returns(`${s.id}-boundary-above`, "The value above is high", "aboveBoundary", [], "high")], hint: "Call category with one more than the limit.", answer: `Return category(${s.value + 1}).` },
      { task: "Collect below, exact, and above results in one boundary test.", code: `function category(value) { return value >= ${s.value} ? "high" : "low"; } function boundaryTest() { return [category(${s.value - 1}), category(${s.value}), category(${s.value + 1})]; }`, tests: [returns(`${s.id}-boundary-set`, "The boundary test covers all three positions", "boundaryTest", [], ["low", "high", "high"])], hint: "Call the function at the three closest values.", answer: "Return the below, exact, and above results in order." },
      { task: "Return whether every boundary expectation passes.", code: `function category(value) { return value >= ${s.value} ? "high" : "low"; } function boundaryTest() { const actual = [category(${s.value - 1}), category(${s.value}), category(${s.value + 1})]; const expected = ["low", "high", "high"]; return { passed: actual.every((value, index) => value === expected[index]), actual, expected }; }`, tests: [returns(`${s.id}-boundary-complete`, "The boundary evidence passes", "boundaryTest", [], { passed: true, actual: ["low", "high", "high"], expected: ["low", "high", "high"] })], hint: "Compare every actual result with the value at the same position.", answer: "Use every with the expected array, then return the evidence." },
    ],
  };
}

function regressionStages(s: DebugScenario) {
  return {
    starter: `function peso(value) { return "PHP " + value; }`,
    stages: [
      { task: "Preserve two decimal places for the value that failed before.", code: `function peso(value) { return "PHP " + value.toFixed(2); }`, tests: [source(`${s.id}-regression-fix`, "The value keeps two decimal places", "toFixed\\(2\\)", "Format the value with two decimal places."), returns(`${s.id}-regression-fix-result`, "The past failing value is fixed", "peso", [s.value / 10], `PHP ${(s.value / 10).toFixed(2)}`)], hint: "Use the number method that fixes decimal places.", answer: "Append value.toFixed(2)." },
      { task: "Add a regression test for a whole-number value.", code: `function peso(value) { return "PHP " + value.toFixed(2); } function wholeNumberTest() { return peso(${s.alternate}) === ${JSON.stringify(`PHP ${s.alternate.toFixed(2)}`)}; }`, tests: [source(`${s.id}-regression-whole-source`, "A named test covers the whole number", "function\\s+wholeNumberTest", "Create a named test for the whole-number value."), returns(`${s.id}-regression-whole`, "The whole-number regression test passes", "wholeNumberTest", [], true)], hint: "Keep the whole-number example in a named test function.", answer: "Create wholeNumberTest and compare the formatted result." },
      { task: "Name the exact past bug in a regression test function.", code: `function peso(value) { return "PHP " + value.toFixed(2); } function wholeNumberTest() { return peso(${s.alternate}) === ${JSON.stringify(`PHP ${s.alternate.toFixed(2)}`)}; } function regressionTest() { const actual = peso(${s.value / 10}); const expected = ${JSON.stringify(`PHP ${(s.value / 10).toFixed(2)}`)}; return actual === expected; }`, tests: [source(`${s.id}-regression-case`, "The past input stays in a named regression test", "function\\s+regressionTest", "Create a named regression test."), returns(`${s.id}-regression-case-result`, "The regression test passes", "regressionTest", [], true)], hint: "Keep the input that exposed the old formatting bug.", answer: "Create regressionTest with actual and expected values." },
      { task: "Return expected and actual evidence from the regression test.", code: `function peso(value) { return "PHP " + value.toFixed(2); } function wholeNumberTest() { return peso(${s.alternate}) === ${JSON.stringify(`PHP ${s.alternate.toFixed(2)}`)}; } function regressionTest() { const actual = peso(${s.value / 10}); const expected = ${JSON.stringify(`PHP ${(s.value / 10).toFixed(2)}`)}; return { passed: actual === expected, expected, actual }; }`, tests: [returns(`${s.id}-regression-evidence`, "The regression test reports evidence", "regressionTest", [], { passed: true, expected: `PHP ${(s.value / 10).toFixed(2)}`, actual: `PHP ${(s.value / 10).toFixed(2)}` })], hint: "Return both compared values with the result.", answer: "Return passed, expected, and actual." },
      { task: "Add the bug label to the completed regression evidence.", code: `function peso(value) { return "PHP " + value.toFixed(2); } function wholeNumberTest() { return peso(${s.alternate}) === ${JSON.stringify(`PHP ${s.alternate.toFixed(2)}`)}; } function regressionTest() { const actual = peso(${s.value / 10}); const expected = ${JSON.stringify(`PHP ${(s.value / 10).toFixed(2)}`)}; return { label: ${JSON.stringify(s.label)}, passed: actual === expected, expected, actual }; }`, tests: [returns(`${s.id}-regression-complete`, "The regression evidence names the old bug", "regressionTest", [], { label: s.label, passed: true, expected: `PHP ${(s.value / 10).toFixed(2)}`, actual: `PHP ${(s.value / 10).toFixed(2)}` })], hint: "Add the prepared label to the evidence object.", answer: `Add label: ${JSON.stringify(s.label)}.` },
    ],
  };
}

function doubleStages(s: DebugScenario) {
  return {
    starter: `async function loadCount(loader) { return loader(); }`,
    stages: [
      { task: "Create a controlled loader for the test.", code: `async function loadCount(loader) { return loader(); } function controlledLoader() { return Promise.resolve(${s.value}); }`, tests: [source(`${s.id}-double`, "The test has a controlled loader", "function\\s+controlledLoader", "Create a controlled loader."), returns(`${s.id}-double-value`, "The controlled loader returns fixed data", "controlledLoader", [], s.value)], hint: "Return a resolved Promise with the lesson value.", answer: `Create controlledLoader returning Promise.resolve(${s.value}).` },
      { task: "Pass the controlled loader into the real function.", code: `async function loadCount(loader) { return loader(); } function controlledLoader() { return Promise.resolve(${s.value}); } async function runTest() { return loadCount(controlledLoader); }`, tests: [returns(`${s.id}-double-use`, "The real function uses the test double", "runTest", [], s.value)], hint: "Give the controlled function to loadCount without calling it first.", answer: "Return loadCount(controlledLoader)." },
      { task: "Track how many times the controlled loader is called.", code: `async function loadCount(loader) { return loader(); } let calls = 0; function controlledLoader() { calls += 1; return Promise.resolve(${s.value}); } async function runTest() { await loadCount(controlledLoader); return calls; }`, tests: [returns(`${s.id}-double-calls`, "The dependency is called once", "runTest", [], 1)], hint: "Increase a counter inside the controlled loader.", answer: "Add calls += 1 inside controlledLoader." },
      { task: "Make the controlled loader simulate a failure.", code: `async function loadCount(loader) { try { return await loader(); } catch { return ${s.alternate}; } } function controlledLoader() { return Promise.reject(new Error("Offline")); } async function runTest() { return loadCount(controlledLoader); }`, tests: [returns(`${s.id}-double-failure`, "The controlled failure uses the fallback", "runTest", [], s.alternate)], hint: "Reject inside the double and catch inside the real function.", answer: "Return a rejected Promise, then return the fallback in catch." },
      { task: "Return evidence from the completed dependency test.", code: `async function loadCount(loader) { try { return await loader(); } catch { return ${s.alternate}; } } function controlledLoader() { return Promise.reject(new Error("Offline")); } async function runTest() { const actual = await loadCount(controlledLoader); return { label: ${JSON.stringify(s.label)}, passed: actual === ${s.alternate}, actual }; }`, tests: [returns(`${s.id}-double-complete`, "The dependency test reports its evidence", "runTest", [], { label: s.label, passed: true, actual: s.alternate })], hint: "Compare the loaded fallback with its expected value.", answer: "Return label, passed, and actual." },
    ],
  };
}

function breakpointStages(s: DebugScenario) {
  return {
    starter: `function total(price, quantity) { return price * quantity; }`,
    stages: [
      { task: "Name the subtotal value you would inspect at a breakpoint.", code: `function total(price, quantity) { const subtotal = price * quantity; return subtotal; }`, tests: [source(`${s.id}-breakpoint-value`, "The subtotal has an inspectable name", "const\\s+subtotal\\s*=", "Save the intermediate subtotal."), returns(`${s.id}-breakpoint-result`, "The named subtotal is correct", "total", [s.value, 2], s.value * 2)], hint: "Save the multiplication before returning it.", answer: "Create const subtotal = price * quantity." },
      { task: "Add a named fee value beside the subtotal.", code: `function total(price, quantity) { const subtotal = price * quantity; const fee = ${s.alternate}; return subtotal + fee; }`, tests: [source(`${s.id}-breakpoint-fee`, "The fee has an inspectable name", "const\\s+fee\\s*=", "Save the fee in a constant."), returns(`${s.id}-breakpoint-fee-result`, "The total includes the fee", "total", [s.value, 2], s.value * 2 + s.alternate)], hint: "Give the second part of the total its own name.", answer: `Create const fee = ${s.alternate}.` },
      { task: "Return a snapshot of the values at the inspection point.", code: `function total(price, quantity) { const subtotal = price * quantity; const fee = ${s.alternate}; return { price, quantity, subtotal, fee }; }`, tests: [returns(`${s.id}-breakpoint-snapshot`, "The inspection snapshot keeps current values", "total", [s.value, 2], { price: s.value, quantity: 2, subtotal: s.value * 2, fee: s.alternate })], hint: "Return the named inputs and intermediate values together.", answer: "Return { price, quantity, subtotal, fee }." },
      { task: "Add the final total to the inspection snapshot.", code: `function total(price, quantity) { const subtotal = price * quantity; const fee = ${s.alternate}; const finalTotal = subtotal + fee; return { price, quantity, subtotal, fee, finalTotal }; }`, tests: [returns(`${s.id}-breakpoint-final`, "The snapshot includes the final total", "total", [s.value, 2], { price: s.value, quantity: 2, subtotal: s.value * 2, fee: s.alternate, finalTotal: s.value * 2 + s.alternate })], hint: "Save and return the last calculation too.", answer: "Create finalTotal and add it to the snapshot." },
      { task: "Label the completed inspection snapshot.", code: `function total(price, quantity) { const subtotal = price * quantity; const fee = ${s.alternate}; const finalTotal = subtotal + fee; return { label: ${JSON.stringify(s.label)}, price, quantity, subtotal, fee, finalTotal }; }`, tests: [returns(`${s.id}-breakpoint-complete`, "The inspection evidence has a label", "total", [s.value, 2], { label: s.label, price: s.value, quantity: 2, subtotal: s.value * 2, fee: s.alternate, finalTotal: s.value * 2 + s.alternate })], hint: "Add the prepared label to the snapshot.", answer: `Add label: ${JSON.stringify(s.label)}.` },
    ],
  };
}

function stackStages(s: DebugScenario) {
  return {
    starter: `function validate(value) { if (value < 0) throw new Error("Invalid"); return value; } function submit(value) { return validate(value); }`,
    stages: [
      { task: "Give the thrown error a message that names the failed rule.", code: `function validate(value) { if (value < 0) throw new Error(${JSON.stringify(s.label)}); return value; } function submit(value) { return validate(value); }`, tests: [source(`${s.id}-stack-message`, "The error names the failed rule", `new\\s+Error\\(${JSON.stringify(s.label).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\)`, "Use the prepared error message."), returns(`${s.id}-stack-normal`, "Valid input still passes", "submit", [s.value], s.value)], hint: "A useful error says which rule failed.", answer: `Throw new Error(${JSON.stringify(s.label)}).` },
      { task: "Catch the error at the caller boundary.", code: `function validate(value) { if (value < 0) throw new Error(${JSON.stringify(s.label)}); return value; } function submit(value) { try { return validate(value); } catch (error) { return error.message; } }`, tests: [source(`${s.id}-stack-catch`, "The caller handles the thrown error", "try\\s*\\{[\\s\\S]*catch", "Catch the validation error in submit."), returns(`${s.id}-stack-error`, "The caller returns the useful message", "submit", [-1], s.label)], hint: "The caller is where the validation failure becomes user-facing.", answer: "Wrap validate in try and return error.message in catch." },
      { task: "Record the two function names in their call order.", code: `function validate(value) { if (value < 0) throw new Error(${JSON.stringify(s.label)}); return value; } function submit(value) { const calls = ["submit", "validate"]; try { return validate(value); } catch (error) { return { message: error.message, calls }; } }`, tests: [returns(`${s.id}-stack-calls`, "The call chain is recorded in order", "submit", [-1], { message: s.label, calls: ["submit", "validate"] })], hint: "Start with the caller, then name the function it calls.", answer: "Create calls = [\"submit\", \"validate\"]." },
      { task: "Add the input value to the debugging evidence.", code: `function validate(value) { if (value < 0) throw new Error(${JSON.stringify(s.label)}); return value; } function submit(value) { const calls = ["submit", "validate"]; try { return validate(value); } catch (error) { return { message: error.message, calls, input: value }; } }`, tests: [returns(`${s.id}-stack-input`, "The error evidence keeps its input", "submit", [-2], { message: s.label, calls: ["submit", "validate"], input: -2 })], hint: "Keep the value that produced the error.", answer: "Add input: value to the returned evidence." },
      { task: "Mark the completed debugging evidence as handled.", code: `function validate(value) { if (value < 0) throw new Error(${JSON.stringify(s.label)}); return value; } function submit(value) { const calls = ["submit", "validate"]; try { return validate(value); } catch (error) { return { handled: true, message: error.message, calls, input: value }; } }`, tests: [returns(`${s.id}-stack-complete`, "The error evidence is marked handled", "submit", [-1], { handled: true, message: s.label, calls: ["submit", "validate"], input: -1 })], hint: "Add one boolean field that states the error reached its handler.", answer: "Add handled: true." },
    ],
  };
}

function networkStages(s: DebugScenario) {
  const records = `[{ url: "/services", status: 200, duration: ${s.value} }, { url: "/missing", status: 404, duration: ${s.alternate} }]`;
  return {
    starter: `const requests = ${records}; function inspectRequests() { return requests.length; }`,
    stages: [
      { task: "Find the request whose status says not found.", code: `const requests = ${records}; function inspectRequests() { return requests.find((request) => request.status === 404).url; }`, tests: [source(`${s.id}-network-status`, "The inspection checks status 404", "request\\.status\\s*===\\s*404", "Find the request with status 404."), returns(`${s.id}-network-status-result`, "The missing request is identified", "inspectRequests", [], "/missing")], hint: "Use the status column as evidence, not the URL wording.", answer: "Find the request where request.status === 404." },
      { task: "Return every request that did not succeed.", code: `const requests = ${records}; function inspectRequests() { return requests.filter((request) => request.status >= 400).map((request) => request.url); }`, tests: [returns(`${s.id}-network-errors`, "Failed request URLs are listed", "inspectRequests", [], ["/missing"])], hint: "Filter the error status range before mapping URLs.", answer: "Filter status >= 400, then map request.url." },
      { task: "Find the slowest request by duration.", code: `const requests = ${records}; function inspectRequests() { return [...requests].sort((a, b) => b.duration - a.duration)[0].url; }`, tests: [source(`${s.id}-network-duration`, "The inspection compares duration", "b\\.duration\\s*-\\s*a\\.duration", "Sort requests from longest to shortest duration."), returns(`${s.id}-network-duration-result`, "The slowest request is identified", "inspectRequests", [], s.alternate > s.value ? "/missing" : "/services")], hint: "Sort a copy from larger duration to smaller duration.", answer: "Sort by b.duration - a.duration, then read the first URL." },
      { task: "Summarize request count, failures, and total duration.", code: `const requests = ${records}; function inspectRequests() { return { count: requests.length, failures: requests.filter((request) => request.status >= 400).length, duration: requests.reduce((total, request) => total + request.duration, 0) }; }`, tests: [returns(`${s.id}-network-summary`, "The request summary is complete", "inspectRequests", [], { count: 2, failures: 1, duration: s.value + s.alternate })], hint: "Use one expression for each column of the summary.", answer: "Return count, failed count, and reduced duration." },
      { task: "Add the inspected page label to the completed network evidence.", code: `const requests = ${records}; function inspectRequests() { return { label: ${JSON.stringify(s.label)}, count: requests.length, failures: requests.filter((request) => request.status >= 400).length, duration: requests.reduce((total, request) => total + request.duration, 0) }; }`, tests: [returns(`${s.id}-network-complete`, "The network evidence names its page", "inspectRequests", [], { label: s.label, count: 2, failures: 1, duration: s.value + s.alternate })], hint: "Keep the page name beside the measured evidence.", answer: `Add label: ${JSON.stringify(s.label)}.` },
    ],
  };
}

function performanceStages(s: DebugScenario) {
  const tasks = `[{ name: "render", duration: ${s.value} }, { name: "filter", duration: ${s.alternate} }, { name: "paint", duration: ${Math.max(1, Math.floor(s.value / 2))} }]`;
  const slowest = s.alternate > s.value ? "filter" : "render";
  return {
    starter: `const tasks = ${tasks}; function profile() { return tasks.length; }`,
    stages: [
      { task: "Find the task with the longest duration.", code: `const tasks = ${tasks}; function profile() { return [...tasks].sort((a, b) => b.duration - a.duration)[0].name; }`, tests: [source(`${s.id}-profile-sort`, "The profile sorts by duration", "b\\.duration\\s*-\\s*a\\.duration", "Sort from longest to shortest duration."), returns(`${s.id}-profile-slowest`, "The slowest task is identified", "profile", [], slowest)], hint: "The largest duration should come first.", answer: "Sort by b.duration - a.duration." },
      { task: "Calculate the total measured duration.", code: `const tasks = ${tasks}; function profile() { return tasks.reduce((total, task) => total + task.duration, 0); }`, tests: [returns(`${s.id}-profile-total`, "The measured durations are added", "profile", [], s.value + s.alternate + Math.max(1, Math.floor(s.value / 2)))], hint: "Reduce every task duration into one total.", answer: "Reduce total + task.duration from zero." },
      { task: "List only tasks above the lesson's slow threshold.", code: `const tasks = ${tasks}; function profile() { return tasks.filter((task) => task.duration >= ${s.value}).map((task) => task.name); }`, tests: [returns(`${s.id}-profile-threshold`, "Slow tasks are listed", "profile", [], [{ name: "render", duration: s.value }, { name: "filter", duration: s.alternate }].filter((task) => task.duration >= s.value).map((task) => task.name))], hint: "Filter by duration before mapping names.", answer: `Keep tasks with duration >= ${s.value}.` },
      { task: "Return the slowest task with its measured duration.", code: `const tasks = ${tasks}; function profile() { const slowest = [...tasks].sort((a, b) => b.duration - a.duration)[0]; return { name: slowest.name, duration: slowest.duration }; }`, tests: [returns(`${s.id}-profile-evidence`, "The slowest task keeps its duration", "profile", [], s.alternate > s.value ? { name: "filter", duration: s.alternate } : { name: "render", duration: s.value })], hint: "Keep the whole first sorted task before returning its fields.", answer: "Return the slowest name and duration." },
      { task: "Add the interaction label to the completed performance evidence.", code: `const tasks = ${tasks}; function profile() { const slowest = [...tasks].sort((a, b) => b.duration - a.duration)[0]; return { label: ${JSON.stringify(s.label)}, name: slowest.name, duration: slowest.duration }; }`, tests: [returns(`${s.id}-profile-complete`, "The performance evidence names its interaction", "profile", [], s.alternate > s.value ? { label: s.label, name: "filter", duration: s.alternate } : { label: s.label, name: "render", duration: s.value })], hint: "Add the measured interaction name to the evidence.", answer: `Add label: ${JSON.stringify(s.label)}.` },
    ],
  };
}

const d = (id: string, title: string, value: number, alternate: number, label: string): DebugScenario => ({ id, title, value, alternate, label });

const topics: DebugTopic[] = [
  { id: "case", conceptId: "test-case", title: "Focused Test Cases", scenarios: [d("fare-test-case", "Fare Test Case", 13, 20, "adds the fare"), d("stock-test-case", "Stock Test Case", 7, 11, "counts the stock")], build: caseStages },
  { id: "assertion", conceptId: "test-assertion", title: "Useful Assertions", scenarios: [d("fee-assertion", "Fee Assertion", 50, 5, "adds the service fee"), d("discount-assertion", "Discount Assertion", 100, -10, "applies the discount")], build: assertionStages },
  { id: "edge", conceptId: "test-edge-case", title: "Edge Cases", scenarios: [d("empty-queue-edge", "Empty Queue Edge", 1, 2, "No one waiting"), d("empty-stock-edge", "Empty Stock Edge", 3, 4, "No stock")], build: edgeStages },
  { id: "boundary", conceptId: "test-boundary", title: "Boundary Values", scenarios: [d("age-boundary", "Age Boundary", 60, 1, "senior discount limit"), d("load-boundary", "Load Boundary", 50, 1, "free delivery limit")], build: boundaryStages },
  { id: "regression", conceptId: "test-regression", title: "Regression Tests", scenarios: [d("peso-regression", "Peso Format Regression", 105, 20, "keeps centavos"), d("fare-regression", "Fare Format Regression", 135, 13, "keeps fare decimals")], build: regressionStages },
  { id: "double", conceptId: "test-double", title: "Controlled Dependencies", scenarios: [d("request-double", "Request Test Double", 12, 0, "request fallback"), d("storage-double", "Storage Test Double", 8, -1, "storage fallback")], build: doubleStages },
  { id: "breakpoint", conceptId: "debug-breakpoint", title: "Breakpoint Values", scenarios: [d("checkout-breakpoint", "Checkout Breakpoint", 25, 5, "checkout calculation")], build: breakpointStages },
  { id: "stack", conceptId: "debug-stack-trace", title: "Stack Trace Evidence", scenarios: [d("validation-stack", "Validation Stack Trace", 4, 1, "Quantity must not be negative")], build: stackStages },
  { id: "network", conceptId: "debug-network-panel", title: "Network Panel Records", scenarios: [d("service-network", "Service Network Record", 120, 240, "services page")], build: networkStages },
  { id: "performance", conceptId: "debug-performance-profile", title: "Performance Profiles", scenarios: [d("search-profile", "Search Performance Profile", 18, 35, "search interaction")], build: performanceStages },
];

const projects: Course["projects"] = [];
const steps: Step[] = [];
let index = 1;

for (const topic of topics) {
  for (const [practiceIndex, scenario] of topic.scenarios.entries()) {
    const built = topic.build(scenario);
    projects.push({ id: scenario.id, title: scenario.title });
    let code = built.starter;
    for (const [stageIndex, stage] of built.stages.entries()) {
      steps.push({
        id: `${scenario.id}-${stageIndex + 1}`,
        index: index++,
        projectId: scenario.id,
        task: stage.task,
        kind: "js",
        inputMode: "guided",
        files: { "script.js": code },
        activeFile: "script.js",
        tests: stage.tests,
        hints: [{ level: 1, text: stage.hint }, { level: 2, text: stage.answer }],
        xp: practiceIndex === 0 ? 55 : 65,
        estimatedMinutes: practiceIndex === 0 ? 5 : 6,
        conceptIds: practiceIndex === 0 && stageIndex === 0 ? [topic.conceptId] : undefined,
        solution: { "script.js": stage.code },
      });
      code = stage.code;
    }
  }
}

export const testingDevtoolsCourse: Course = {
  id: "testing-devtools",
  title: "Learn Testing and DevTools by Repairing Front-End Evidence",
  project: projects[0].title,
  projects,
  order: 10,
  summary: "Write focused tests, preserve bug fixes, and interpret stack, network, and performance evidence.",
  requires: ["typescript-react"],
  kind: "js",
  steps,
};
