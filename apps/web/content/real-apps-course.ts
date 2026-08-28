import type { Course, RuntimeFixtures, Step, TestSpec } from "@/lib/lesson-ir";

interface AppScenario {
  id: string;
  title: string;
  value: string;
  alternate: string;
  url: string;
  status: number;
}

interface AppStage {
  task: string;
  code: string;
  tests: TestSpec[];
  hint: string;
  answer: string;
}

interface AppTopic {
  id: string;
  conceptId: string;
  title: string;
  scenarios: [AppScenario, AppScenario];
  stages: (scenario: AppScenario) => { starter: string; stages: AppStage[]; fixtures?: RuntimeFixtures };
}

const source = (id: string, label: string, pattern: string, because: string): TestSpec => ({
  id,
  kind: "source-matches",
  file: "script.js",
  pattern,
  because,
  label,
});

const returns = (id: string, label: string, fn: string, args: unknown[], equals: unknown): TestSpec => ({
  id,
  kind: "js-returns",
  fn,
  args,
  equals,
  label,
});

const fixture = (scenario: AppScenario, body: unknown = { message: scenario.value }): RuntimeFixtures => ({
  fetch: { [scenario.url]: { status: scenario.status, body, headers: { "content-type": "application/json" } } },
});

function promiseStages(s: AppScenario) {
  const fn = "getNotice";
  return {
    starter: `function ${fn}() { return null; }`,
    stages: [
      { task: "Return a Promise that resolves to the current notice.", code: `function ${fn}() { return Promise.resolve(${JSON.stringify(s.value)}); }`, tests: [source(`${s.id}-promise`, "The function creates a Promise", "Promise\\.resolve", "Return Promise.resolve with the notice."), returns(`${s.id}-promise-value`, "The Promise resolves to the notice", fn, [], s.value)], hint: "Use the Promise helper that starts in the fulfilled state.", answer: `Return Promise.resolve(${JSON.stringify(s.value)}).` },
      { task: "Let the Promise receive a notice argument instead of one fixed value.", code: `function ${fn}(notice) { return Promise.resolve(notice); }`, tests: [returns(`${s.id}-promise-arg`, "The Promise keeps its input", fn, [s.alternate], s.alternate)], hint: "Resolve the value received by the function.", answer: "Pass notice to Promise.resolve." },
      { task: "Give a missing notice a useful fallback before resolving it.", code: `function ${fn}(notice) { return Promise.resolve(notice || ${JSON.stringify(s.value)}); }`, tests: [returns(`${s.id}-promise-fallback`, "A missing notice gets a fallback", fn, [""], s.value)], hint: "Choose the saved notice when the input is empty.", answer: `Resolve notice || ${JSON.stringify(s.value)}.` },
      { task: "Resolve a plain object that keeps both the notice and its source.", code: `function ${fn}(notice) { return Promise.resolve({ notice: notice || ${JSON.stringify(s.value)}, source: ${JSON.stringify(s.title)} }); }`, tests: [returns(`${s.id}-promise-object`, "The Promise resolves structured data", fn, [s.alternate], { notice: s.alternate, source: s.title })], hint: "Put both values in one object before resolving it.", answer: "Resolve an object with notice and source." },
      { task: "Add an ok flag to the resolved result so the caller can read its state.", code: `function ${fn}(notice) { return Promise.resolve({ notice: notice || ${JSON.stringify(s.value)}, source: ${JSON.stringify(s.title)}, ok: true }); }`, tests: [returns(`${s.id}-promise-complete`, "The resolved result includes its state", fn, [s.alternate], { notice: s.alternate, source: s.title, ok: true })], hint: "Add one boolean field to the returned object.", answer: "Add ok: true to the resolved object." },
    ],
  };
}

function asyncStages(s: AppScenario) {
  const fn = "loadNotice";
  return {
    starter: `function ${fn}() { return ${JSON.stringify(s.value)}; }`,
    stages: [
      { task: "Mark the notice function async.", code: `async function ${fn}() { return ${JSON.stringify(s.value)}; }`, tests: [source(`${s.id}-async`, "The function is async", `async\\s+function\\s+${fn}`, "Write async before function."), returns(`${s.id}-async-value`, "The async function resolves its notice", fn, [], s.value)], hint: "Put the async keyword before function.", answer: `Write async function ${fn}().` },
      { task: "Let the async function receive the notice it returns.", code: `async function ${fn}(notice) { return notice; }`, tests: [returns(`${s.id}-async-arg`, "The async result keeps its input", fn, [s.alternate], s.alternate)], hint: "Return the function parameter.", answer: "Accept notice, then return notice." },
      { task: "Give an empty input a useful async fallback.", code: `async function ${fn}(notice) { return notice || ${JSON.stringify(s.value)}; }`, tests: [returns(`${s.id}-async-fallback`, "The async result has a fallback", fn, [""], s.value)], hint: "Use the current notice when the input is empty.", answer: `Return notice || ${JSON.stringify(s.value)}.` },
      { task: "Return an object so the caller receives named fields.", code: `async function ${fn}(notice) { return { notice: notice || ${JSON.stringify(s.value)}, source: ${JSON.stringify(s.title)} }; }`, tests: [returns(`${s.id}-async-object`, "The async result has named fields", fn, [s.alternate], { notice: s.alternate, source: s.title })], hint: "Return an object with notice and source.", answer: "Return { notice, source }." },
      { task: "Add a loaded flag to the async result.", code: `async function ${fn}(notice) { return { notice: notice || ${JSON.stringify(s.value)}, source: ${JSON.stringify(s.title)}, loaded: true }; }`, tests: [returns(`${s.id}-async-loaded`, "The async result says it loaded", fn, [s.alternate], { notice: s.alternate, source: s.title, loaded: true })], hint: "Add one true or false field to the result object.", answer: "Add loaded: true." },
    ],
  };
}

function awaitStages(s: AppScenario) {
  const fn = "readNotice";
  return {
    starter: `async function ${fn}() { return Promise.resolve(${JSON.stringify(s.value)}); }`,
    stages: [
      { task: "Await the promised notice before returning it.", code: `async function ${fn}() { const notice = await Promise.resolve(${JSON.stringify(s.value)}); return notice; }`, tests: [source(`${s.id}-await`, "The function awaits the notice", "await\\s+Promise\\.resolve", "Await the promised notice."), returns(`${s.id}-await-value`, "The awaited notice is returned", fn, [], s.value)], hint: "Save the awaited value in a constant.", answer: "Create notice with await Promise.resolve, then return it." },
      { task: "Await a promised argument instead of one fixed notice.", code: `async function ${fn}(notice) { const result = await Promise.resolve(notice); return result; }`, tests: [returns(`${s.id}-await-arg`, "The awaited input is returned", fn, [s.alternate], s.alternate)], hint: "Resolve and await the function parameter.", answer: "Await Promise.resolve(notice)." },
      { task: "Trim the awaited text before returning it.", code: `async function ${fn}(notice) { const result = await Promise.resolve(notice); return result.trim(); }`, tests: [returns(`${s.id}-await-trim`, "The awaited text is trimmed", fn, [` ${s.alternate} `], s.alternate)], hint: "Use the string method that removes outside spaces.", answer: "Return result.trim()." },
      { task: "Return the awaited text with its character count.", code: `async function ${fn}(notice) { const result = await Promise.resolve(notice); return { text: result.trim(), length: result.trim().length }; }`, tests: [returns(`${s.id}-await-object`, "The awaited result includes its length", fn, [s.alternate], { text: s.alternate, length: s.alternate.length })], hint: "Put the cleaned text and its length in one object.", answer: "Return text and length fields." },
      { task: "Add the project source to the awaited result.", code: `async function ${fn}(notice) { const result = await Promise.resolve(notice); return { text: result.trim(), length: result.trim().length, source: ${JSON.stringify(s.title)} }; }`, tests: [returns(`${s.id}-await-complete`, "The awaited result includes its source", fn, [s.alternate], { text: s.alternate, length: s.alternate.length, source: s.title })], hint: "Add one source field to the returned object.", answer: `Add source: ${JSON.stringify(s.title)}.` },
    ],
  };
}

function catchStages(s: AppScenario) {
  const fn = "safeNotice";
  return {
    starter: `async function ${fn}(shouldFail) { if (shouldFail) throw new Error("Unavailable"); return ${JSON.stringify(s.value)}; }`,
    stages: [
      { task: "Catch a failed notice and return a useful fallback.", code: `async function ${fn}(shouldFail) { try { if (shouldFail) throw new Error("Unavailable"); return ${JSON.stringify(s.value)}; } catch { return ${JSON.stringify(s.alternate)}; } }`, tests: [source(`${s.id}-catch`, "The function handles an error", "try\\s*\\{[\\s\\S]*catch", "Wrap the risky work in try and catch."), returns(`${s.id}-catch-value`, "A failure returns the fallback", fn, [true], s.alternate)], hint: "Put the risky branch in try and the fallback in catch.", answer: "Use try for the normal result and catch for the fallback." },
      { task: "Return a named success result when no error happens.", code: `async function ${fn}(shouldFail) { try { if (shouldFail) throw new Error("Unavailable"); return { ok: true, message: ${JSON.stringify(s.value)} }; } catch { return ${JSON.stringify(s.alternate)}; } }`, tests: [returns(`${s.id}-catch-normal`, "The normal result has a named state", fn, [false], { ok: true, message: s.value })], hint: "Put the success state and notice in one object.", answer: `Return { ok: true, message: ${JSON.stringify(s.value)} } inside try.` },
      { task: "Read the error message inside catch.", code: `async function ${fn}(shouldFail) { try { if (shouldFail) throw new Error("Unavailable"); return ${JSON.stringify(s.value)}; } catch (error) { return error.message; } }`, tests: [returns(`${s.id}-catch-message`, "The failure explains what happened", fn, [true], "Unavailable")], hint: "Give catch a name, then return its message.", answer: "Use catch (error), then return error.message." },
      { task: "Return a named result object for both success and failure.", code: `async function ${fn}(shouldFail) { try { if (shouldFail) throw new Error("Unavailable"); return { ok: true, message: ${JSON.stringify(s.value)} }; } catch (error) { return { ok: false, message: error.message }; } }`, tests: [returns(`${s.id}-catch-object`, "The failure has a named state", fn, [true], { ok: false, message: "Unavailable" })], hint: "Return the same object shape from try and catch.", answer: "Return { ok, message } from both branches." },
      { task: "Include the project source in the handled result.", code: `async function ${fn}(shouldFail) { try { if (shouldFail) throw new Error("Unavailable"); return { ok: true, message: ${JSON.stringify(s.value)}, source: ${JSON.stringify(s.title)} }; } catch (error) { return { ok: false, message: error.message, source: ${JSON.stringify(s.title)} }; } }`, tests: [returns(`${s.id}-catch-complete`, "The handled result includes its source", fn, [true], { ok: false, message: "Unavailable", source: s.title })], hint: "Add the same source field to both returned objects.", answer: `Add source: ${JSON.stringify(s.title)} in both branches.` },
    ],
  };
}

function fetchStages(s: AppScenario) {
  const fn = "loadMessage";
  const fixtures = fixture(s);
  return {
    starter: `async function ${fn}() { return ${JSON.stringify(s.value)}; }`, fixtures,
    stages: [
      { task: "Fetch the lesson endpoint and return its status.", code: `async function ${fn}() { const response = await fetch(${JSON.stringify(s.url)}); return response.status; }`, tests: [source(`${s.id}-fetch`, "The function sends a request", "await\\s+fetch\\(", "Await fetch with the lesson URL."), returns(`${s.id}-fetch-status`, "The request returns its status", fn, [], s.status)], hint: "Await fetch with the prepared endpoint.", answer: `Await fetch(${JSON.stringify(s.url)}), then return response.status.` },
      { task: "Return whether the response is successful.", code: `async function ${fn}() { const response = await fetch(${JSON.stringify(s.url)}); return response.ok; }`, tests: [returns(`${s.id}-fetch-ok`, "The response reports success", fn, [], s.status >= 200 && s.status < 300)], hint: "Read the response boolean made for this check.", answer: "Return response.ok." },
      { task: "Read the JSON body from the response.", code: `async function ${fn}() { const response = await fetch(${JSON.stringify(s.url)}); const data = await response.json(); return data.message; }`, tests: [returns(`${s.id}-fetch-json`, "The response body is read", fn, [], s.value)], hint: "Await the response method that reads JSON.", answer: "Await response.json(), then return data.message." },
      { task: "Return a clear fallback when the response is not successful.", code: `async function ${fn}() { const response = await fetch(${JSON.stringify(s.url)}); if (!response.ok) return ${JSON.stringify(s.alternate)}; const data = await response.json(); return data.message; }`, tests: [source(`${s.id}-fetch-check`, "The function checks response.ok", "if\\s*\\(\\s*!response\\.ok", "Check response.ok before reading the body."), returns(`${s.id}-fetch-result`, "The request returns a useful result", fn, [], s.status >= 200 && s.status < 300 ? s.value : s.alternate)], hint: "Check the response before reading its body.", answer: `Return ${JSON.stringify(s.alternate)} when response.ok is false.` },
      { task: "Return the message, status, and source in one object.", code: `async function ${fn}() { const response = await fetch(${JSON.stringify(s.url)}); if (!response.ok) return { message: ${JSON.stringify(s.alternate)}, status: response.status, source: ${JSON.stringify(s.title)} }; const data = await response.json(); return { message: data.message, status: response.status, source: ${JSON.stringify(s.title)} }; }`, tests: [returns(`${s.id}-fetch-complete`, "The request result keeps useful evidence", fn, [], { message: s.status >= 200 && s.status < 300 ? s.value : s.alternate, status: s.status, source: s.title })], hint: "Return the same object shape from both response branches.", answer: "Return message, status, and source fields." },
    ],
  };
}

function postStages(s: AppScenario, headerOnly = false) {
  const fn = "sendRecord";
  const fixtures = fixture(s, { saved: true, message: s.value });
  const method = headerOnly ? "PUT" : "POST";
  return {
    starter: `async function ${fn}(record) { return record; }`, fixtures,
    stages: [
      { task: `Send the record with the ${method} request method.`, code: `async function ${fn}(record) { const response = await fetch(${JSON.stringify(s.url)}, { method: ${JSON.stringify(method)} }); return response.status; }`, tests: [source(`${s.id}-method`, `The request uses ${method}`, `method\\s*:\\s*["']${method}["']`, `Set method to ${method}.`), returns(`${s.id}-method-status`, "The request returns its status", fn, [{ name: s.value }], s.status)], hint: "Pass a request options object as the second fetch argument.", answer: `Set method: ${JSON.stringify(method)}.` },
      { task: "Label the request body as JSON.", code: `async function ${fn}(record) { const response = await fetch(${JSON.stringify(s.url)}, { method: ${JSON.stringify(method)}, headers: { "Content-Type": "application/json" } }); return response.status; }`, tests: [source(`${s.id}-header`, "The request labels its JSON body", `["']Content-Type["']\\s*:\\s*["']application/json["']`, "Add the JSON content type header.")], hint: "Add a headers object beside method.", answer: "Set Content-Type to application/json." },
      { task: "Serialize the record into the request body.", code: `async function ${fn}(record) { const response = await fetch(${JSON.stringify(s.url)}, { method: ${JSON.stringify(method)}, headers: { "Content-Type": "application/json" }, body: JSON.stringify(record) }); return response.status; }`, tests: [source(`${s.id}-body`, "The request serializes its body", "body\\s*:\\s*JSON\\.stringify\\(record\\)", "Use JSON.stringify for the request body.")], hint: "Turn the record object into JSON text.", answer: "Set body to JSON.stringify(record)." },
      { task: "Read the saved response body.", code: `async function ${fn}(record) { const response = await fetch(${JSON.stringify(s.url)}, { method: ${JSON.stringify(method)}, headers: { "Content-Type": "application/json" }, body: JSON.stringify(record) }); const data = await response.json(); return data.saved; }`, tests: [returns(`${s.id}-post-saved`, "The saved response is read", fn, [{ name: s.value }], true)], hint: "Await response.json before returning its saved field.", answer: "Read data with response.json(), then return data.saved." },
      { task: "Return the saved state with the response status.", code: `async function ${fn}(record) { const response = await fetch(${JSON.stringify(s.url)}, { method: ${JSON.stringify(method)}, headers: { "Content-Type": "application/json" }, body: JSON.stringify(record) }); const data = await response.json(); return { saved: data.saved, status: response.status }; }`, tests: [returns(`${s.id}-post-complete`, "The request returns saved state and status", fn, [{ name: s.value }], { saved: true, status: s.status })], hint: "Return one object containing both values.", answer: "Return { saved: data.saved, status: response.status }." },
    ],
  };
}

function paramsStages(s: AppScenario) {
  const fn = "buildSearch";
  return {
    starter: `function ${fn}(query) { return query; }`,
    stages: [
      { task: "Create URLSearchParams from the search value.", code: `function ${fn}(query) { const params = new URLSearchParams({ query }); return params.toString(); }`, tests: [source(`${s.id}-params`, "The function creates URLSearchParams", "new\\s+URLSearchParams", "Create URLSearchParams from query."), returns(`${s.id}-params-query`, "The search value is encoded", fn, [s.value], `query=${encodeURIComponent(s.value).replace(/%20/g, "+")}`)], hint: "Pass an object with query to URLSearchParams.", answer: "Create new URLSearchParams({ query })." },
      { task: "Add a page number to the encoded search.", code: `function ${fn}(query, page) { const params = new URLSearchParams({ query, page: String(page) }); return params.toString(); }`, tests: [returns(`${s.id}-params-page`, "The query includes its page", fn, [s.value, 2], `query=${encodeURIComponent(s.value).replace(/%20/g, "+")}&page=2`)], hint: "Add page to the object and turn it into text.", answer: "Add page: String(page)." },
      { task: "Prefix the encoded values with the search endpoint.", code: `function ${fn}(query, page) { const params = new URLSearchParams({ query, page: String(page) }); return ${JSON.stringify(s.url)} + "?" + params.toString(); }`, tests: [returns(`${s.id}-params-url`, "The search has a complete URL", fn, [s.value, 2], `${s.url}?query=${encodeURIComponent(s.value).replace(/%20/g, "+")}&page=2`)], hint: "Join the endpoint, a question mark, and the encoded values.", answer: `Return ${JSON.stringify(s.url)} + "?" + params.toString().` },
      { task: "Trim the search words before encoding them.", code: `function ${fn}(query, page) { const params = new URLSearchParams({ query: query.trim(), page: String(page) }); return ${JSON.stringify(s.url)} + "?" + params.toString(); }`, tests: [returns(`${s.id}-params-trim`, "Outside spaces are removed", fn, [` ${s.value} `, 1], `${s.url}?query=${encodeURIComponent(s.value).replace(/%20/g, "+")}&page=1`)], hint: "Clean query before adding it to the parameters.", answer: "Use query.trim()." },
      { task: "Use page one when the caller gives no page number.", code: `function ${fn}(query, page = 1) { const params = new URLSearchParams({ query: query.trim(), page: String(page) }); return ${JSON.stringify(s.url)} + "?" + params.toString(); }`, tests: [returns(`${s.id}-params-complete`, "The search defaults to page one", fn, [s.alternate], `${s.url}?query=${encodeURIComponent(s.alternate).replace(/%20/g, "+")}&page=1`)], hint: "Give the page parameter a default value.", answer: "Write page = 1 in the parameter list." },
    ],
  };
}

function storageStages(s: AppScenario) {
  const fn = "savePreference";
  const key = `${s.id}.notice`;
  return {
    starter: `function ${fn}(value) { return value; }`, fixtures: { storage: {} },
    stages: [
      { task: "Save the preference under its lesson key.", code: `function ${fn}(value) { localStorage.setItem(${JSON.stringify(key)}, value); return value; }`, tests: [source(`${s.id}-storage-set`, "The preference is stored", "localStorage\\.setItem", "Call localStorage.setItem with the lesson key."), returns(`${s.id}-storage-value`, "The saved value is returned", fn, [s.value], s.value)], hint: "Use setItem with one key and one text value.", answer: `Call localStorage.setItem(${JSON.stringify(key)}, value).` },
      { task: "Read the saved preference after storing it.", code: `function ${fn}(value) { localStorage.setItem(${JSON.stringify(key)}, value); return localStorage.getItem(${JSON.stringify(key)}); }`, tests: [source(`${s.id}-storage-get`, "The preference is read from storage", "localStorage\\.getItem", "Read the saved value with getItem."), returns(`${s.id}-storage-read`, "The stored preference can be read", fn, [s.alternate], s.alternate)], hint: "Return getItem with the same key.", answer: `Return localStorage.getItem(${JSON.stringify(key)}).` },
      { task: "Store a structured preference as JSON text.", code: `function ${fn}(value) { localStorage.setItem(${JSON.stringify(key)}, JSON.stringify({ value })); return localStorage.getItem(${JSON.stringify(key)}); }`, tests: [source(`${s.id}-storage-json`, "The preference is stored as JSON", "JSON\\.stringify", "Serialize the preference before storing it."), returns(`${s.id}-storage-text`, "The stored JSON is valid text", fn, [s.value], JSON.stringify({ value: s.value }))], hint: "Stringify an object containing value.", answer: "Store JSON.stringify({ value })." },
      { task: "Parse the stored JSON before returning it.", code: `function ${fn}(value) { localStorage.setItem(${JSON.stringify(key)}, JSON.stringify({ value })); return JSON.parse(localStorage.getItem(${JSON.stringify(key)})); }`, tests: [returns(`${s.id}-storage-parse`, "The saved object is restored", fn, [s.alternate], { value: s.alternate })], hint: "Pass the stored text to JSON.parse.", answer: "Return JSON.parse(localStorage.getItem(key))." },
      { task: "Remove the lesson key after reading the saved value.", code: `function ${fn}(value) { localStorage.setItem(${JSON.stringify(key)}, JSON.stringify({ value })); const saved = JSON.parse(localStorage.getItem(${JSON.stringify(key)})); localStorage.removeItem(${JSON.stringify(key)}); return saved; }`, tests: [source(`${s.id}-storage-remove`, "The lesson key is removed", "localStorage\\.removeItem", "Remove the same lesson key after reading it."), returns(`${s.id}-storage-complete`, "The saved value survives the cleanup", fn, [s.value], { value: s.value })], hint: "Save the parsed value before removing its key.", answer: "Store the parsed object, remove the key, then return the object." },
    ],
  };
}

function allStages(s: AppScenario) {
  const fn = "loadSummary";
  const secondUrl = `${s.url}/detail`;
  const fixtures: RuntimeFixtures = { fetch: { [s.url]: { status: 200, body: { value: s.value } }, [secondUrl]: { status: 200, body: { value: s.alternate } } } };
  return {
    starter: `async function ${fn}() { return []; }`, fixtures,
    stages: [
      { task: "Start both lesson requests before waiting for their results.", code: `async function ${fn}() { const requests = [fetch(${JSON.stringify(s.url)}), fetch(${JSON.stringify(secondUrl)})]; return requests.length; }`, tests: [source(`${s.id}-all-start`, "Two requests start together", "\\[fetch\\([\\s\\S]*fetch\\(", "Put both fetch calls in one array."), returns(`${s.id}-all-count`, "Two requests are prepared", fn, [], 2)], hint: "Create an array containing both fetch calls.", answer: "Put both fetch calls in requests." },
      { task: "Await both responses with Promise.all.", code: `async function ${fn}() { const requests = [fetch(${JSON.stringify(s.url)}), fetch(${JSON.stringify(secondUrl)})]; const responses = await Promise.all(requests); return responses.length; }`, tests: [source(`${s.id}-all-wait`, "The function waits with Promise.all", "await\\s+Promise\\.all", "Await Promise.all with the request array."), returns(`${s.id}-all-responses`, "Both responses arrive", fn, [], 2)], hint: "Pass the request array to Promise.all.", answer: "Create responses with await Promise.all(requests)." },
      { task: "Read both response bodies together.", code: `async function ${fn}() { const requests = [fetch(${JSON.stringify(s.url)}), fetch(${JSON.stringify(secondUrl)})]; const responses = await Promise.all(requests); return Promise.all(responses.map((response) => response.json())); }`, tests: [returns(`${s.id}-all-json`, "Both response bodies are read", fn, [], [{ value: s.value }, { value: s.alternate }])], hint: "Map each response to response.json, then wait for the new Promises.", answer: "Return Promise.all(responses.map(response => response.json()))." },
      { task: "Return only the values from the two response bodies.", code: `async function ${fn}() { const requests = [fetch(${JSON.stringify(s.url)}), fetch(${JSON.stringify(secondUrl)})]; const responses = await Promise.all(requests); const data = await Promise.all(responses.map((response) => response.json())); return data.map((item) => item.value); }`, tests: [returns(`${s.id}-all-values`, "The summary keeps both values", fn, [], [s.value, s.alternate])], hint: "Map the loaded objects to their value fields.", answer: "Return data.map(item => item.value)." },
      { task: "Join the two loaded values into one readable summary.", code: `async function ${fn}() { const requests = [fetch(${JSON.stringify(s.url)}), fetch(${JSON.stringify(secondUrl)})]; const responses = await Promise.all(requests); const data = await Promise.all(responses.map((response) => response.json())); return data.map((item) => item.value).join(" | "); }`, tests: [returns(`${s.id}-all-complete`, "The combined summary is readable", fn, [], `${s.value} | ${s.alternate}`)], hint: "Join the mapped values with a visible separator.", answer: "Join the values with \" | \"." },
    ],
  };
}

function retryStages(s: AppScenario) {
  const fn = "attemptRequest";
  return {
    starter: `async function ${fn}(failures) { return failures; }`,
    stages: [
      { task: "Count one request attempt.", code: `async function ${fn}(failures) { let attempts = 0; attempts += 1; return attempts; }`, tests: [returns(`${s.id}-retry-one`, "One attempt is counted", fn, [2], 1)], hint: "Start attempts at zero and add one.", answer: "Create attempts, add one, then return it." },
      { task: "Repeat while failures remain and the limit is not reached.", code: `async function ${fn}(failures) { let attempts = 0; while (attempts <= failures && attempts < 3) attempts += 1; return attempts; }`, tests: [source(`${s.id}-retry-loop`, "The retry has a bounded loop", "while\\s*\\([\\s\\S]*attempts\\s*<\\s*3", "Use a loop with the three-attempt limit."), returns(`${s.id}-retry-count`, "Temporary failures are retried", fn, [2], 3)], hint: "Continue only while failures remain and attempts stay below three.", answer: "Loop while attempts <= failures and attempts < 3." },
      { task: "Stop after the first successful attempt.", code: `async function ${fn}(failures) { let attempts = 0; while (attempts <= failures && attempts < 3) { attempts += 1; if (attempts > failures) return attempts; } return attempts; }`, tests: [source(`${s.id}-retry-stop`, "The loop returns as soon as an attempt succeeds", "if\\s*\\(attempts\\s*>\\s*failures\\)\\s*return\\s+attempts", "Return attempts inside the success branch."), returns(`${s.id}-retry-success`, "Success stops further retries", fn, [0], 1)], hint: "Return as soon as attempts passes the failure count.", answer: "Return attempts when attempts > failures." },
      { task: "Return whether the bounded attempts succeeded.", code: `async function ${fn}(failures) { let attempts = 0; while (attempts <= failures && attempts < 3) { attempts += 1; if (attempts > failures) return { ok: true, attempts }; } return { ok: false, attempts }; }`, tests: [returns(`${s.id}-retry-state`, "The final retry state is explicit", fn, [3], { ok: false, attempts: 3 })], hint: "Return the same object shape for success and failure.", answer: "Return { ok, attempts } from both outcomes." },
      { task: "Add the request source to the retry result.", code: `async function ${fn}(failures) { let attempts = 0; while (attempts <= failures && attempts < 3) { attempts += 1; if (attempts > failures) return { ok: true, attempts, source: ${JSON.stringify(s.title)} }; } return { ok: false, attempts, source: ${JSON.stringify(s.title)} }; }`, tests: [returns(`${s.id}-retry-complete`, "The retry result keeps its source", fn, [1], { ok: true, attempts: 2, source: s.title })], hint: "Add the same source to both returned objects.", answer: `Add source: ${JSON.stringify(s.title)}.` },
    ],
  };
}

const scenario = (id: string, title: string, value: string, alternate: string, status = 200): AppScenario => ({ id, title, value, alternate, url: `https://lesson.local/${id}`, status });

const topics: AppTopic[] = [
  { id: "promise", conceptId: "real-promise", title: "Promise Results", scenarios: [scenario("claim-status", "Barangay Claim Status", "Ready for pickup", "Still processing"), scenario("water-status", "Water Delivery Status", "On the way", "Schedule pending")], stages: promiseStages },
  { id: "async", conceptId: "real-async-function", title: "Async Functions", scenarios: [scenario("clinic-queue", "Clinic Queue", "Queue open", "Queue paused"), scenario("permit-desk", "Permit Desk", "Desk open", "Desk closed")], stages: asyncStages },
  { id: "await", conceptId: "real-await", title: "Await Results", scenarios: [scenario("ferry-time", "Ferry Time", "7:30 AM", "8:15 AM"), scenario("class-room", "Class Room", "Room 204", "Room 105")], stages: awaitStages },
  { id: "try-catch", conceptId: "real-try-catch", title: "Handled Failures", scenarios: [scenario("power-alert", "Power Alert", "Service normal", "Try again later"), scenario("relief-line", "Relief Line", "Line moving", "Ask the help desk")], stages: catchStages },
  { id: "request", conceptId: "real-http-request", title: "HTTP Requests", scenarios: [scenario("weather-note", "Barangay Weather Note", "Bring an umbrella", "Weather unavailable"), scenario("market-hours", "Market Hours", "Open until 6 PM", "Hours unavailable")], stages: fetchStages },
  { id: "status", conceptId: "real-response-status", title: "Response Status", scenarios: [scenario("medicine-stock", "Medicine Stock", "Available", "Stock unavailable", 200), scenario("missing-record", "Missing Resident Record", "Record found", "Record not found", 404)], stages: fetchStages },
  { id: "json", conceptId: "real-json", title: "JSON Data", scenarios: [scenario("fare-data", "Jeepney Fare Data", "Minimum fare PHP 13", "Fare unavailable"), scenario("rice-price", "Rice Price Data", "PHP 55 per kilo", "Price unavailable")], stages: fetchStages },
  { id: "method", conceptId: "real-request-method", title: "Request Methods", scenarios: [scenario("save-appointment", "Save Appointment", "Appointment saved", "Save failed", 201), scenario("save-order", "Save Store Order", "Order saved", "Save failed", 201)], stages: (s) => postStages(s, false) },
  { id: "header", conceptId: "real-request-header", title: "Request Headers", scenarios: [scenario("update-profile", "Update Resident Profile", "Profile updated", "Update failed", 200), scenario("update-route", "Update Route Notice", "Route updated", "Update failed", 200)], stages: (s) => postStages(s, true) },
  { id: "params", conceptId: "real-url-search-params", title: "Safe Search URLs", scenarios: [scenario("search-services", "Search Public Services", "health centre", "permit desk"), scenario("search-stalls", "Search Market Stalls", "rice seller", "fruit stall")], stages: paramsStages },
  { id: "storage", conceptId: "real-local-storage", title: "Browser Preferences", scenarios: [scenario("theme-setting", "Theme Setting", "dark", "light"), scenario("text-size", "Text Size Setting", "large", "regular")], stages: storageStages },
  { id: "promise-all", conceptId: "real-promise-all", title: "Parallel Requests", scenarios: [scenario("dashboard-summary", "Barangay Dashboard Summary", "12 requests", "4 notices"), scenario("clinic-summary", "Clinic Dashboard Summary", "8 patients", "3 rooms")], stages: allStages },
  { id: "retry", conceptId: "real-retry", title: "Bounded Retry", scenarios: [scenario("signal-retry", "Weak Signal Retry", "Connected", "Stopped"), scenario("upload-retry", "Upload Retry", "Uploaded", "Stopped")], stages: retryStages },
];

const projects: Course["projects"] = [];
const steps: Step[] = [];
let index = 1;

for (const topic of topics) {
  for (const [practiceIndex, app] of topic.scenarios.entries()) {
    const projectId = app.id;
    const built = topic.stages(app);
    projects.push({ id: projectId, title: app.title });
    let code = built.starter;
    for (const [stageIndex, stage] of built.stages.entries()) {
      const solution = { "script.js": stage.code };
      steps.push({
        id: `${projectId}-${stageIndex + 1}`,
        index: index++,
        projectId,
        task: stage.task,
        kind: "js",
        inputMode: "guided",
        files: { "script.js": code },
        activeFile: "script.js",
        tests: stage.tests,
        hints: [
          { level: 1, text: stage.hint },
          { level: 2, text: stage.answer },
        ],
        xp: practiceIndex === 0 ? 50 : 60,
        estimatedMinutes: practiceIndex === 0 ? 5 : 6,
        conceptIds: practiceIndex === 0 && stageIndex === 0 ? [topic.conceptId] : undefined,
        runtimeFixtures: built.fixtures,
        solution,
      });
      code = stage.code;
    }
  }
}

export const realAppsCourse: Course = {
  id: "js-real-apps",
  title: "Learn JavaScript for Real Apps by Connecting Browser Data",
  project: projects[0].title,
  projects,
  order: 6,
  summary: "Load data, handle failures, submit records, and keep small browser preferences safely.",
  requires: ["dom-basics"],
  kind: "js",
  steps,
};
