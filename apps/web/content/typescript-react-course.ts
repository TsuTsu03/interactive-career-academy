import type { Course, Step, TestSpec } from "@/lib/lesson-ir";

interface TsScenario {
  id: string;
  title: string;
  value: string;
  alternate: string;
  count: number;
}

interface TsStage {
  task: string;
  code: string;
  tests: TestSpec[];
  hint: string;
  answer: string;
}

interface TsTopic {
  id: string;
  conceptId: string;
  title: string;
  scenarios: [TsScenario, TsScenario];
  build: (scenario: TsScenario) => { starter: string; stages: TsStage[] };
}

const source = (id: string, label: string, pattern: string, because: string): TestSpec => ({ id, label, kind: "source-matches", file: "app.tsx", pattern, because });
const text = (id: string, label: string, selector: string, value: string): TestSpec => ({ id, label, kind: "react-text-equals", selector, value });
const exists = (id: string, label: string, selector: string): TestSpec => ({ id, label, kind: "react-exists", selector });
const inputText = (
  id: string,
  label: string,
  inputSelector: string,
  inputValue: string,
  selector: string,
  value: string,
): TestSpec => ({ id, label, kind: "react-input-text-equals", inputSelector, inputValue, selector, value });

function annotationStages(s: TsScenario) {
  return {
    starter: `function App() { const label = ${JSON.stringify(s.value)}; return <main><h1>{label}</h1></main>; }`,
    stages: [
      { task: "Annotate the label as a string.", code: `function App() { const label: string = ${JSON.stringify(s.value)}; return <main><h1>{label}</h1></main>; }`, tests: [source(`${s.id}-string`, "The label has a string annotation", "const\\s+label\\s*:\\s*string", "Add : string after label."), text(`${s.id}-string-view`, "The typed label still renders", "h1", s.value)], hint: "Place the value kind between the name and equals sign.", answer: "Write const label: string = ..." },
      { task: "Add a number annotation to the count.", code: `function App() { const label: string = ${JSON.stringify(s.value)}; const count: number = ${s.count}; return <main><h1>{label}</h1><p>{count}</p></main>; }`, tests: [source(`${s.id}-number`, "The count has a number annotation", "const\\s+count\\s*:\\s*number", "Add : number after count."), text(`${s.id}-number-view`, "The typed count renders", "p", String(s.count))], hint: "Use the TypeScript name for numeric values.", answer: "Write const count: number = ..." },
      { task: "Annotate whether the service is open.", code: `function App() { const label: string = ${JSON.stringify(s.value)}; const count: number = ${s.count}; const open: boolean = true; return <main><h1>{label}</h1><p>{count}</p><output>{open ? "Open" : "Closed"}</output></main>; }`, tests: [source(`${s.id}-boolean`, "The state has a boolean annotation", "const\\s+open\\s*:\\s*boolean", "Add : boolean after open."), text(`${s.id}-boolean-view`, "The boolean state renders", "output", "Open")], hint: "Use the type for true and false values.", answer: "Write const open: boolean = true." },
      { task: "Annotate the formatting function's input and output.", code: `function formatLabel(value: string): string { return value.toUpperCase(); } function App() { const label: string = ${JSON.stringify(s.value)}; const count: number = ${s.count}; const open: boolean = true; return <main><h1>{formatLabel(label)}</h1><p>{count}</p><output>{open ? "Open" : "Closed"}</output></main>; }`, tests: [source(`${s.id}-function-types`, "The formatter has input and output types", "function\\s+formatLabel\\(value\\s*:\\s*string\\)\\s*:\\s*string", "Annotate the parameter and return value."), text(`${s.id}-function-view`, "The typed formatter runs", "h1", s.value.toUpperCase())], hint: "Type the parameter inside the brackets and the return after them.", answer: "Write function formatLabel(value: string): string." },
      { task: "Annotate the App return value as a JSX element.", code: `function formatLabel(value: string): string { return value.toUpperCase(); } function App(): React.JSX.Element { const label: string = ${JSON.stringify(s.value)}; const count: number = ${s.count}; const open: boolean = true; return <main><h1>{formatLabel(label)}</h1><p>{count}</p><output>{open ? "Open" : "Closed"}</output></main>; }`, tests: [source(`${s.id}-jsx-return`, "App has a JSX return annotation", "function\\s+App\\(\\)\\s*:\\s*React\\.JSX\\.Element", "Add React.JSX.Element after App's brackets."), exists(`${s.id}-jsx-view`, "The typed component renders", "main")], hint: "Name the React type produced by JSX.", answer: "Write function App(): React.JSX.Element." },
    ],
  };
}

function inferenceStages(s: TsScenario) {
  return {
    starter: `function App() { const label: string = ${JSON.stringify(s.value)}; return <h1>{label}</h1>; }`,
    stages: [
      { task: "Let TypeScript infer the label type from its value.", code: `function App() { const label = ${JSON.stringify(s.value)}; return <h1>{label}</h1>; }`, tests: [source(`${s.id}-infer-string`, "The label type is inferred", "const\\s+label\\s*=", "Remove the explicit label annotation."), text(`${s.id}-infer-string-view`, "The inferred label renders", "h1", s.value)], hint: "The text value already gives TypeScript enough information.", answer: "Use const label = ... without : string." },
      { task: "Let TypeScript infer a numeric count.", code: `function App() { const label = ${JSON.stringify(s.value)}; const count = ${s.count}; return <main><h1>{label}</h1><p>{count}</p></main>; }`, tests: [source(`${s.id}-infer-number`, "The count type is inferred", `const\\s+count\\s*=\\s*${s.count}`, "Create count directly from its number."), text(`${s.id}-infer-number-view`, "The inferred count renders", "p", String(s.count))], hint: "Assign the number without writing a type.", answer: `Write const count = ${s.count}.` },
      { task: "Infer an array from its text items.", code: `function App() { const label = ${JSON.stringify(s.value)}; const count = ${s.count}; const items = [${JSON.stringify(s.value)}, ${JSON.stringify(s.alternate)}]; return <main><h1>{label}</h1><p>{count}</p><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></main>; }`, tests: [source(`${s.id}-infer-array`, "The item array is inferred", "const\\s+items\\s*=\\s*\\[", "Create items from its values without an annotation."), text(`${s.id}-infer-array-view`, "The inferred array renders", "li", s.value)], hint: "Let the two text values establish the array type.", answer: "Create const items = [...] without a type annotation." },
      { task: "Infer an object shape from named fields.", code: `function App() { const record = { label: ${JSON.stringify(s.value)}, count: ${s.count} }; return <main><h1>{record.label}</h1><p>{record.count}</p></main>; }`, tests: [source(`${s.id}-infer-object`, "The record shape is inferred", "const\\s+record\\s*=\\s*\\{", "Create the record directly from its fields."), text(`${s.id}-infer-object-view`, "The inferred record renders", "h1", s.value)], hint: "Assign the object without naming its type.", answer: "Create const record = { label, count }." },
      { task: "Infer a derived status from the current count.", code: `function App() { const record = { label: ${JSON.stringify(s.value)}, count: ${s.count} }; const status = record.count > 0 ? "Available" : "Empty"; return <main><h1>{record.label}</h1><p>{record.count}</p><output>{status}</output></main>; }`, tests: [source(`${s.id}-infer-derived`, "The derived status is inferred", "const\\s+status\\s*=", "Create status from the count comparison."), text(`${s.id}-infer-derived-view`, "The inferred status renders", "output", s.count > 0 ? "Available" : "Empty")], hint: "Use the count to choose one of two text values.", answer: "Create status with a conditional expression." },
    ],
  };
}

function aliasStages(s: TsScenario) {
  return {
    starter: `function App() { const label = ${JSON.stringify(s.value)}; return <h1>{label}</h1>; }`,
    stages: [
      { task: "Create a Label type alias and use it for the heading.", code: `type Label = string; function App() { const label: Label = ${JSON.stringify(s.value)}; return <h1>{label}</h1>; }`, tests: [source(`${s.id}-alias`, "The Label type is reusable", "type\\s+Label\\s*=\\s*string", "Create a Label type alias."), text(`${s.id}-alias-view`, "The aliased label renders", "h1", s.value)], hint: "Use type, a new name, equals, and the existing type.", answer: "Write type Label = string." },
      { task: "Create a Count type alias for the numeric value.", code: `type Label = string; type Count = number; function App() { const label: Label = ${JSON.stringify(s.value)}; const count: Count = ${s.count}; return <main><h1>{label}</h1><p>{count}</p></main>; }`, tests: [source(`${s.id}-count-alias`, "The Count type is reusable", "type\\s+Count\\s*=\\s*number", "Create a Count type alias."), text(`${s.id}-count-alias-view`, "The aliased count renders", "p", String(s.count))], hint: "Give number a course-specific name.", answer: "Write type Count = number." },
      { task: "Name the object shape used by the card.", code: `type Label = string; type Count = number; type RecordItem = { label: Label; count: Count }; function App() { const record: RecordItem = { label: ${JSON.stringify(s.value)}, count: ${s.count} }; return <main><h1>{record.label}</h1><p>{record.count}</p></main>; }`, tests: [source(`${s.id}-object-alias`, "The card shape has a type name", "type\\s+RecordItem\\s*=\\s*\\{", "Create a RecordItem object type."), text(`${s.id}-object-alias-view`, "The typed record renders", "h1", s.value)], hint: "Put the label and count fields inside braces.", answer: "Create type RecordItem = { label: Label; count: Count }." },
      { task: "Use the named record shape as a component prop.", code: `type Label = string; type Count = number; type RecordItem = { label: Label; count: Count }; function Card({ record }: { record: RecordItem }) { return <article><h1>{record.label}</h1><p>{record.count}</p></article>; } function App() { const record: RecordItem = { label: ${JSON.stringify(s.value)}, count: ${s.count} }; return <Card record={record} />; }`, tests: [source(`${s.id}-alias-prop`, "The component prop reuses RecordItem", "record\\s*:\\s*RecordItem", "Use RecordItem for the record prop."), exists(`${s.id}-alias-prop-view`, "The typed card renders", "article")], hint: "Annotate the record prop with the alias already created.", answer: "Use { record }: { record: RecordItem }." },
      { task: "Reuse the named shape for a second record.", code: `type Label = string; type Count = number; type RecordItem = { label: Label; count: Count }; function Card({ record }: { record: RecordItem }) { return <article><h2>{record.label}</h2><p>{record.count}</p></article>; } function App() { const records: RecordItem[] = [{ label: ${JSON.stringify(s.value)}, count: ${s.count} }, { label: ${JSON.stringify(s.alternate)}, count: ${s.count + 1} }]; return <main>{records.map((record) => <Card key={record.label} record={record} />)}</main>; }`, tests: [source(`${s.id}-alias-array`, "The array reuses RecordItem", "RecordItem\\[\\]", "Use RecordItem[] for records."), text(`${s.id}-alias-array-view`, "Both typed records render", "article:last-child h2", s.alternate)], hint: "Add square brackets to the record type for a list.", answer: "Annotate records as RecordItem[]." },
    ],
  };
}

function interfaceStages(s: TsScenario) {
  return {
    starter: `function Card({ label }) { return <h1>{label}</h1>; } function App() { return <Card label=${JSON.stringify(s.value)} />; }`,
    stages: [
      { task: "Describe the Card props with an interface.", code: `interface CardProps { label: string } function Card({ label }: CardProps) { return <h1>{label}</h1>; } function App() { return <Card label=${JSON.stringify(s.value)} />; }`, tests: [source(`${s.id}-interface`, "CardProps is an interface", "interface\\s+CardProps\\s*\\{", "Create the CardProps interface."), text(`${s.id}-interface-view`, "The typed card renders", "h1", s.value)], hint: "List the required label field inside an interface.", answer: "Create interface CardProps { label: string }." },
      { task: "Add a numeric count to the props interface.", code: `interface CardProps { label: string; count: number } function Card({ label, count }: CardProps) { return <article><h1>{label}</h1><p>{count}</p></article>; } function App() { return <Card label=${JSON.stringify(s.value)} count={${s.count}} />; }`, tests: [source(`${s.id}-interface-count`, "CardProps includes count", "count\\s*:\\s*number", "Add a numeric count field."), text(`${s.id}-interface-count-view`, "The typed count renders", "p", String(s.count))], hint: "Add one required numeric field to CardProps.", answer: "Add count: number to CardProps." },
      { task: "Add an open state to the props interface.", code: `interface CardProps { label: string; count: number; open: boolean } function Card({ label, count, open }: CardProps) { return <article><h1>{label}</h1><p>{count}</p><output>{open ? "Open" : "Closed"}</output></article>; } function App() { return <Card label=${JSON.stringify(s.value)} count={${s.count}} open={true} />; }`, tests: [source(`${s.id}-interface-open`, "CardProps includes open", "open\\s*:\\s*boolean", "Add a boolean open field."), text(`${s.id}-interface-open-view`, "The typed state renders", "output", "Open")], hint: "Add the field type used by true and false.", answer: "Add open: boolean." },
      { task: "Mark the interface fields as readonly inputs.", code: `interface CardProps { readonly label: string; readonly count: number; readonly open: boolean } function Card({ label, count, open }: CardProps) { return <article><h1>{label}</h1><p>{count}</p><output>{open ? "Open" : "Closed"}</output></article>; } function App() { return <Card label=${JSON.stringify(s.value)} count={${s.count}} open={true} />; }`, tests: [source(`${s.id}-interface-readonly`, "CardProps protects its inputs", "readonly\\s+label", "Mark the interface fields readonly."), exists(`${s.id}-interface-readonly-view`, "The readonly props still render", "article")], hint: "Place readonly before each field name.", answer: "Write readonly label, readonly count, and readonly open." },
      { task: "Reuse CardProps for a second card.", code: `interface CardProps { readonly label: string; readonly count: number; readonly open: boolean } function Card({ label, count, open }: CardProps) { return <article><h2>{label}</h2><p>{count}</p><output>{open ? "Open" : "Closed"}</output></article>; } function App() { const cards: CardProps[] = [{ label: ${JSON.stringify(s.value)}, count: ${s.count}, open: true }, { label: ${JSON.stringify(s.alternate)}, count: ${s.count + 1}, open: false }]; return <main>{cards.map((card) => <Card key={card.label} {...card} />)}</main>; }`, tests: [source(`${s.id}-interface-array`, "The card list uses CardProps", "CardProps\\[\\]", "Use CardProps[] for the card list."), text(`${s.id}-interface-array-view`, "The second typed card renders", "article:last-child h2", s.alternate)], hint: "Use the interface name followed by square brackets.", answer: "Annotate cards as CardProps[]." },
    ],
  };
}

function optionalStages(s: TsScenario) {
  return {
    starter: `interface CardProps { label: string; note: string } function Card({ label, note }: CardProps) { return <article><h1>{label}</h1><p>{note}</p></article>; } function App() { return <Card label=${JSON.stringify(s.value)} note=${JSON.stringify(s.alternate)} />; }`,
    stages: [
      { task: "Make the note prop optional.", code: `interface CardProps { label: string; note?: string } function Card({ label, note }: CardProps) { return <article><h1>{label}</h1><p>{note}</p></article>; } function App() { return <Card label=${JSON.stringify(s.value)} />; }`, tests: [source(`${s.id}-optional`, "The note prop is optional", "note\\?\\s*:\\s*string", "Add ? after note."), text(`${s.id}-optional-view`, "The card renders without a note", "h1", s.value)], hint: "Put a question mark after the optional field name.", answer: "Write note?: string." },
      { task: "Show a fallback when the optional note is missing.", code: `interface CardProps { label: string; note?: string } function Card({ label, note }: CardProps) { return <article><h1>{label}</h1><p>{note ?? "No note"}</p></article>; } function App() { return <Card label=${JSON.stringify(s.value)} />; }`, tests: [source(`${s.id}-optional-fallback`, "The missing note has a fallback", "note\\s*\\?\\?", "Use the nullish fallback operator."), text(`${s.id}-optional-fallback-view`, "The fallback note renders", "p", "No note")], hint: "Use the operator that keeps real text but replaces missing values.", answer: "Render note ?? \"No note\"." },
      { task: "Pass an optional note when one is available.", code: `interface CardProps { label: string; note?: string } function Card({ label, note }: CardProps) { return <article><h1>{label}</h1><p>{note ?? "No note"}</p></article>; } function App() { return <Card label=${JSON.stringify(s.value)} note=${JSON.stringify(s.alternate)} />; }`, tests: [text(`${s.id}-optional-present`, "The supplied note renders", "p", s.alternate)], hint: "Add the note prop to the Card use.", answer: `Pass note=${JSON.stringify(s.alternate)}.` },
      { task: "Make the count prop optional too.", code: `interface CardProps { label: string; note?: string; count?: number } function Card({ label, note, count }: CardProps) { return <article><h1>{label}</h1><p>{note ?? "No note"}</p><output>{count ?? 0}</output></article>; } function App() { return <Card label=${JSON.stringify(s.value)} note=${JSON.stringify(s.alternate)} />; }`, tests: [source(`${s.id}-optional-count`, "The count prop is optional", "count\\?\\s*:\\s*number", "Mark count optional."), text(`${s.id}-optional-count-view`, "A missing count becomes zero", "output", "0")], hint: "Use the same optional marker on count.", answer: "Add count?: number and render count ?? 0." },
      { task: "Supply every optional prop in the completed card.", code: `interface CardProps { label: string; note?: string; count?: number } function Card({ label, note, count }: CardProps) { return <article><h1>{label}</h1><p>{note ?? "No note"}</p><output>{count ?? 0}</output></article>; } function App() { return <Card label=${JSON.stringify(s.value)} note=${JSON.stringify(s.alternate)} count={${s.count}} />; }`, tests: [text(`${s.id}-optional-complete`, "The optional count renders when supplied", "output", String(s.count))], hint: "Pass the prepared count to the completed card.", answer: `Add count={${s.count}}.` },
    ],
  };
}

function readonlyStages(s: TsScenario) {
  return {
    starter: `type Item = { label: string }; function App() { const item: Item = { label: ${JSON.stringify(s.value)} }; return <h1>{item.label}</h1>; }`,
    stages: [
      { task: "Make the item label readonly.", code: `type Item = { readonly label: string }; function App() { const item: Item = { label: ${JSON.stringify(s.value)} }; return <h1>{item.label}</h1>; }`, tests: [source(`${s.id}-readonly-field`, "The item label is readonly", "readonly\\s+label\\s*:\\s*string", "Place readonly before label."), text(`${s.id}-readonly-field-view`, "The readonly label renders", "h1", s.value)], hint: "Protect the field where its object type is declared.", answer: "Write readonly label: string." },
      { task: "Add a readonly numeric count.", code: `type Item = { readonly label: string; readonly count: number }; function App() { const item: Item = { label: ${JSON.stringify(s.value)}, count: ${s.count} }; return <main><h1>{item.label}</h1><p>{item.count}</p></main>; }`, tests: [source(`${s.id}-readonly-count`, "The count is readonly", "readonly\\s+count\\s*:\\s*number", "Place readonly before count."), text(`${s.id}-readonly-count-view`, "The readonly count renders", "p", String(s.count))], hint: "Protect count in the same object type.", answer: "Add readonly count: number." },
      { task: "Make the list itself a readonly array.", code: `type Item = { readonly label: string; readonly count: number }; function App() { const items: readonly Item[] = [{ label: ${JSON.stringify(s.value)}, count: ${s.count} }]; return <main>{items.map((item) => <article key={item.label}><h1>{item.label}</h1><p>{item.count}</p></article>)}</main>; }`, tests: [source(`${s.id}-readonly-array`, "The item array is readonly", "readonly\\s+Item\\[\\]", "Add readonly before Item[]."), exists(`${s.id}-readonly-array-view`, "The readonly list renders", "article")], hint: "Protect the array before its item type.", answer: "Annotate items as readonly Item[]." },
      { task: "Accept the readonly list as a component prop.", code: `type Item = { readonly label: string; readonly count: number }; function List({ items }: { items: readonly Item[] }) { return <main>{items.map((item) => <article key={item.label}><h2>{item.label}</h2><p>{item.count}</p></article>)}</main>; } function App() { const items: readonly Item[] = [{ label: ${JSON.stringify(s.value)}, count: ${s.count} }]; return <List items={items} />; }`, tests: [source(`${s.id}-readonly-prop`, "The List prop accepts readonly items", "items\\s*:\\s*readonly\\s+Item\\[\\]", "Type the items prop as a readonly array."), text(`${s.id}-readonly-prop-view`, "The readonly prop renders", "h2", s.value)], hint: "Use the same readonly array type for the prop.", answer: "Type items as readonly Item[]." },
      { task: "Render a second readonly item without changing the first.", code: `type Item = { readonly label: string; readonly count: number }; function List({ items }: { items: readonly Item[] }) { return <main>{items.map((item) => <article key={item.label}><h2>{item.label}</h2><p>{item.count}</p></article>)}</main>; } function App() { const items: readonly Item[] = [{ label: ${JSON.stringify(s.value)}, count: ${s.count} }, { label: ${JSON.stringify(s.alternate)}, count: ${s.count + 1} }]; return <List items={items} />; }`, tests: [text(`${s.id}-readonly-complete`, "The second readonly item renders", "article:last-child h2", s.alternate)], hint: "Add a new object to the array instead of editing the first one.", answer: "Append the prepared second item to items." },
    ],
  };
}

function unionStages(s: TsScenario) {
  return {
    starter: `function App() { const status = "open"; return <output>{status}</output>; }`,
    stages: [
      { task: "Limit status to open or closed with a union type.", code: `type Status = "open" | "closed"; function App() { const status: Status = "open"; return <output>{status}</output>; }`, tests: [source(`${s.id}-union`, "Status has two valid values", `type\\s+Status\\s*=\\s*["']open["']\\s*\\|\\s*["']closed["']`, "Create the open or closed union."), text(`${s.id}-union-view`, "The union value renders", "output", "open")], hint: "Join the two allowed text values with a vertical bar.", answer: "Write type Status = \"open\" | \"closed\"." },
      { task: "Accept the union value as a component prop.", code: `type Status = "open" | "closed"; function Badge({ status }: { status: Status }) { return <output>{status}</output>; } function App() { return <Badge status="open" />; }`, tests: [source(`${s.id}-union-prop`, "The Badge prop uses Status", "function\\s+Badge\\s*\\(\\{\\s*status\\s*\\}\\s*:\\s*\\{\\s*status\\s*:\\s*Status\\s*\\}\\)", "Use Status for the Badge prop."), text(`${s.id}-union-prop-view`, "The union prop renders", "output", "open")], hint: "Reuse the union name for the prop.", answer: "Type status as Status." },
      { task: "Add a pending value to the status union.", code: `type Status = "open" | "closed" | "pending"; function Badge({ status }: { status: Status }) { return <output>{status}</output>; } function App() { return <Badge status="pending" />; }`, tests: [source(`${s.id}-union-pending`, "Status includes pending", `\\|\\s*["']pending["']`, "Add pending to the union."), text(`${s.id}-union-pending-view`, "The new union value renders", "output", "pending")], hint: "Join one more literal value to Status.", answer: "Add | \"pending\"." },
      { task: "Map each status to patient display text.", code: `type Status = "open" | "closed" | "pending"; function labelFor(status: Status): string { return status === "open" ? "Open now" : status === "closed" ? "Closed" : "Checking"; } function App() { return <output>{labelFor("pending")}</output>; }`, tests: [source(`${s.id}-union-function`, "The formatter accepts Status", "labelFor\\(status\\s*:\\s*Status\\)", "Type the formatter parameter as Status."), text(`${s.id}-union-function-view`, "The status has patient text", "output", "Checking")], hint: "Use the named union in the formatter parameter.", answer: "Write labelFor(status: Status): string." },
      { task: "Render the project's completed typed status card.", code: `type Status = "open" | "closed" | "pending"; function labelFor(status: Status): string { return status === "open" ? "Open now" : status === "closed" ? "Closed" : "Checking"; } function App() { const status: Status = "open"; return <main><h1>${s.title}</h1><output>{labelFor(status)}</output></main>; }`, tests: [text(`${s.id}-union-complete-title`, "The completed card has its title", "h1", s.title), text(`${s.id}-union-complete-status`, "The completed card has its status", "output", "Open now")], hint: "Use one allowed Status value, then pass it to labelFor.", answer: "Create status: Status = \"open\" and render labelFor(status)." },
    ],
  };
}

function narrowingStages(s: TsScenario) {
  return {
    starter: `type Value = string | number; function show(value: Value) { return value; } function App() { return <p>{show(${JSON.stringify(s.value)})}</p>; }`,
    stages: [
      { task: "Narrow the value to a string before making it uppercase.", code: `type Value = string | number; function show(value: Value) { return typeof value === "string" ? value.toUpperCase() : value; } function App() { return <p>{show(${JSON.stringify(s.value)})}</p>; }`, tests: [source(`${s.id}-narrow-typeof`, "The function narrows with typeof", `typeof\\s+value\\s*===\\s*["']string["']`, "Check whether value is a string."), text(`${s.id}-narrow-typeof-view`, "The narrowed string is formatted", "p", s.value.toUpperCase())], hint: "Use typeof before the string-only method.", answer: "Check typeof value === \"string\"." },
      { task: "Give the narrowed numeric branch a formatted label.", code: `type Value = string | number; function show(value: Value) { return typeof value === "string" ? value.toUpperCase() : "Count: " + value; } function App() { return <p>{show(${s.count})}</p>; }`, tests: [text(`${s.id}-narrow-number`, "The numeric branch is formatted", "p", `Count: ${s.count}`)], hint: "Use the branch where value is already known as a number.", answer: "Return \"Count: \" + value from the numeric branch." },
      { task: "Move the narrowed result into a typed component prop.", code: `type Value = string | number; function show(value: Value): string { return typeof value === "string" ? value.toUpperCase() : "Count: " + value; } function Result({ value }: { value: Value }) { return <p>{show(value)}</p>; } function App() { return <Result value=${JSON.stringify(s.value)} />; }`, tests: [source(`${s.id}-narrow-prop`, "The component accepts Value", "value\\s*:\\s*Value", "Type the prop with the union."), text(`${s.id}-narrow-prop-view`, "The narrowed prop renders", "p", s.value.toUpperCase())], hint: "Reuse Value for the component input.", answer: "Type the value prop as Value." },
      { task: "Narrow an array before reading its first item.", code: `type Value = string | number | string[]; function show(value: Value): string { if (Array.isArray(value)) return value[0] ?? "Empty"; return typeof value === "string" ? value.toUpperCase() : "Count: " + value; } function App() { return <p>{show([${JSON.stringify(s.alternate)}])}</p>; }`, tests: [source(`${s.id}-narrow-array`, "The function narrows arrays", "Array\\.isArray\\(value\\)", "Check the array before reading an item."), text(`${s.id}-narrow-array-view`, "The narrowed array renders", "p", s.alternate)], hint: "Use the standard array check before indexing.", answer: "Add if (Array.isArray(value))." },
      { task: "Render string, number, and array values together.", code: `type Value = string | number | string[]; function show(value: Value): string { if (Array.isArray(value)) return value[0] ?? "Empty"; return typeof value === "string" ? value.toUpperCase() : "Count: " + value; } function App() { const values: Value[] = [${JSON.stringify(s.value)}, ${s.count}, [${JSON.stringify(s.alternate)}]]; return <ul>{values.map((value, index) => <li key={index}>{show(value)}</li>)}</ul>; }`, tests: [text(`${s.id}-narrow-complete`, "Every narrowed kind renders", "li:last-child", s.alternate)], hint: "Use one Value array and pass each item through show.", answer: "Map values to list items using show(value)." },
    ],
  };
}

function discriminatedStages(s: TsScenario) {
  return {
    starter: `function App() { return <p>${s.value}</p>; }`,
    stages: [
      { task: "Create loading and ready object shapes with a shared state field.", code: `type LoadState = { state: "loading" } | { state: "ready"; value: string }; function App() { const result: LoadState = { state: "loading" }; return <p>{result.state}</p>; }`, tests: [source(`${s.id}-discriminated`, "LoadState has distinct state values", `state\\s*:\\s*["']loading["'][\\s\\S]*\\|[\\s\\S]*state\\s*:\\s*["']ready["']`, "Create loading and ready object shapes."), text(`${s.id}-discriminated-view`, "The loading state renders", "p", "loading")], hint: "Give both object shapes a state field with different literal values.", answer: "Create a union of loading and ready objects." },
      { task: "Narrow the object before reading its ready value.", code: `type LoadState = { state: "loading" } | { state: "ready"; value: string }; function Message({ result }: { result: LoadState }) { return <p>{result.state === "ready" ? result.value : "Loading"}</p>; } function App() { return <Message result={{ state: "ready", value: ${JSON.stringify(s.value)} }} />; }`, tests: [source(`${s.id}-discriminated-check`, "The component checks the state field", `result\\.state\\s*===\\s*["']ready["']`, "Check result.state before reading value."), text(`${s.id}-discriminated-check-view`, "The ready value renders", "p", s.value)], hint: "Read value only in the ready branch.", answer: "Check result.state === \"ready\"." },
      { task: "Add an error object shape to LoadState.", code: `type LoadState = { state: "loading" } | { state: "ready"; value: string } | { state: "error"; message: string }; function Message({ result }: { result: LoadState }) { if (result.state === "error") return <p>{result.message}</p>; return <p>{result.state === "ready" ? result.value : "Loading"}</p>; } function App() { return <Message result={{ state: "error", message: ${JSON.stringify(s.alternate)} }} />; }`, tests: [source(`${s.id}-discriminated-error`, "LoadState includes an error shape", `state\\s*:\\s*["']error["']`, "Add the error object shape."), text(`${s.id}-discriminated-error-view`, "The error message renders", "p", s.alternate)], hint: "Add one union member with state and message fields.", answer: "Add { state: \"error\"; message: string }." },
      { task: "Move every state branch into one patient message function.", code: `type LoadState = { state: "loading" } | { state: "ready"; value: string } | { state: "error"; message: string }; function messageFor(result: LoadState): string { if (result.state === "ready") return result.value; if (result.state === "error") return result.message; return "Loading"; } function App() { const result: LoadState = { state: "ready", value: ${JSON.stringify(s.value)} }; return <p>{messageFor(result)}</p>; }`, tests: [source(`${s.id}-discriminated-function`, "The message function accepts LoadState", "messageFor\\(result\\s*:\\s*LoadState\\)", "Type the function input as LoadState."), text(`${s.id}-discriminated-function-view`, "The ready message renders", "p", s.value)], hint: "Check each state before reading its matching fields.", answer: "Create messageFor with ready, error, and loading branches." },
      { task: "Render the completed request state with a live status role.", code: `type LoadState = { state: "loading" } | { state: "ready"; value: string } | { state: "error"; message: string }; function messageFor(result: LoadState): string { if (result.state === "ready") return result.value; if (result.state === "error") return result.message; return "Loading"; } function App() { const result: LoadState = { state: "ready", value: ${JSON.stringify(s.value)} }; return <main><h1>${s.title}</h1><p role="status">{messageFor(result)}</p></main>; }`, tests: [source(`${s.id}-discriminated-role`, "The changing message has a status role", `role=["']status["']`, "Add role status to the message."), text(`${s.id}-discriminated-complete`, "The completed state card renders", "p", s.value)], hint: "Mark the message so assistive technology can announce changes.", answer: "Add role=\"status\" to the message paragraph." },
    ],
  };
}

function genericStages(s: TsScenario) {
  return {
    starter: `function first(items) { return items[0]; } function App() { return <p>{first([${JSON.stringify(s.value)}])}</p>; }`,
    stages: [
      { task: "Make first generic so its input and output types stay connected.", code: `function first<T>(items: T[]): T | undefined { return items[0]; } function App() { return <p>{first([${JSON.stringify(s.value)}])}</p>; }`, tests: [source(`${s.id}-generic`, "first uses a type parameter", "function\\s+first<T>\\(items\\s*:\\s*T\\[\\]\\)\\s*:\\s*T\\s*\\|\\s*undefined", "Add T to the function, array, and return type."), text(`${s.id}-generic-view`, "The generic result renders", "p", s.value)], hint: "Use one type parameter in the input array and output.", answer: "Write function first<T>(items: T[]): T | undefined." },
      { task: "Use the generic with a numeric list.", code: `function first<T>(items: T[]): T | undefined { return items[0]; } function App() { return <p>{first([${s.count}, ${s.count + 1}])}</p>; }`, tests: [text(`${s.id}-generic-number`, "The generic keeps a number", "p", String(s.count))], hint: "Call the same function with numbers.", answer: "Pass a numeric array to first." },
      { task: "Create a generic last function with the same relationship.", code: `function first<T>(items: T[]): T | undefined { return items[0]; } function last<T>(items: T[]): T | undefined { return items.at(-1); } function App() { return <p>{last([${JSON.stringify(s.value)}, ${JSON.stringify(s.alternate)}])}</p>; }`, tests: [source(`${s.id}-generic-last`, "last keeps its item type", "function\\s+last<T>\\(items\\s*:\\s*T\\[\\]\\)", "Make last generic too."), text(`${s.id}-generic-last-view`, "The generic last item renders", "p", s.alternate)], hint: "Reuse T for the second helper's array.", answer: "Create function last<T>(items: T[])." },
      { task: "Use a generic List component for typed items.", code: `function List<T>({ items, labelFor }: { items: T[]; labelFor: (item: T) => string }) { return <ul>{items.map((item, index) => <li key={index}>{labelFor(item)}</li>)}</ul>; } function App() { return <List items={[${JSON.stringify(s.value)}, ${JSON.stringify(s.alternate)}]} labelFor={(item) => item} />; }`, tests: [source(`${s.id}-generic-component`, "List keeps its item type", "function\\s+List<T>", "Give List a type parameter."), text(`${s.id}-generic-component-view`, "The generic list renders", "li:last-child", s.alternate)], hint: "Connect items and labelFor through the same T.", answer: "Type items as T[] and labelFor as (item: T) => string." },
      { task: "Use the generic List with typed object records.", code: `type RecordItem = { id: number; label: string }; function List<T>({ items, labelFor }: { items: T[]; labelFor: (item: T) => string }) { return <ul>{items.map((item, index) => <li key={index}>{labelFor(item)}</li>)}</ul>; } function App() { const records: RecordItem[] = [{ id: 1, label: ${JSON.stringify(s.value)} }, { id: 2, label: ${JSON.stringify(s.alternate)} }]; return <List items={records} labelFor={(item) => item.label} />; }`, tests: [source(`${s.id}-generic-record`, "The records have a named type", "RecordItem\\[\\]", "Type the record array."), text(`${s.id}-generic-complete`, "The typed object list renders", "li:first-child", s.value)], hint: "Let the generic infer RecordItem from the items prop.", answer: "Pass the typed records and read item.label." },
    ],
  };
}

function eventStages(s: TsScenario) {
  return {
    starter: `function App() { const [value, setValue] = React.useState(""); return <input value={value} onChange={(event) => setValue(event.target.value)} />; }`,
    stages: [
      { task: "Move the change logic into a typed input handler.", code: `function App() { const [value, setValue] = React.useState(""); const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value); return <input aria-label="${s.title}" value={value} onChange={handleChange} />; }`, tests: [source(`${s.id}-event`, "The handler has an input change type", "React\\.ChangeEvent<HTMLInputElement>", "Type the change event for an input."), exists(`${s.id}-event-view`, "The typed input renders", "input")], hint: "Use the React change event type with HTMLInputElement.", answer: "Type event as React.ChangeEvent<HTMLInputElement>." },
      { task: "Show the typed input value below the field.", code: `function App() { const [value, setValue] = React.useState(""); const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value); return <main><input aria-label="${s.title}" value={value} onChange={handleChange} /><output>{value}</output></main>; }`, tests: [inputText(`${s.id}-event-input`, "The typed input updates its output", "input", s.value, "output", s.value)], hint: "Render the same state value controlled by the input.", answer: "Add output containing value." },
      { task: "Type a button click handler.", code: `function App() { const [value, setValue] = React.useState(""); const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value); const clear = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault(); setValue(""); }; return <main><input aria-label="${s.title}" value={value} onChange={handleChange} /><output>{value}</output><button type="button" onClick={clear}>Clear</button></main>; }`, tests: [source(`${s.id}-mouse-event`, "The click handler has a button event type", "React\\.MouseEvent<HTMLButtonElement>", "Type the mouse event for a button."), exists(`${s.id}-mouse-event-view`, "The typed button renders", "button")], hint: "Use the React mouse event type with HTMLButtonElement.", answer: "Type event as React.MouseEvent<HTMLButtonElement>." },
      { task: "Type the state value explicitly for the form.", code: `function App() { const [value, setValue] = React.useState<string>(""); const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value); const clear = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault(); setValue(""); }; return <main><input aria-label="${s.title}" value={value} onChange={handleChange} /><output>{value}</output><button type="button" onClick={clear}>Clear</button></main>; }`, tests: [source(`${s.id}-event-state`, "The form state is typed", "useState<string>", "Give the form state a string type."), exists(`${s.id}-event-state-view`, "The typed form still renders", "main")], hint: "Pass the state type between angle brackets.", answer: "Write React.useState<string>(\"\")." },
      { task: "Add patient helper text to the completed typed field.", code: `function App() { const [value, setValue] = React.useState<string>(""); const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value); const clear = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault(); setValue(""); }; return <main><label>${s.title}<input aria-describedby="field-help" value={value} onChange={handleChange} /></label><p id="field-help">Enter ${s.value.toLowerCase()}.</p><output>{value}</output><button type="button" onClick={clear}>Clear</button></main>; }`, tests: [source(`${s.id}-event-help`, "The field points to its helper text", "aria-describedby=[\"']field-help[\"']", "Connect the field to its helper text."), text(`${s.id}-event-complete`, "The helper text explains the field", "#field-help", `Enter ${s.value.toLowerCase()}.`)], hint: "Give the help text an id and reference it from the input.", answer: "Use aria-describedby=\"field-help\" and the matching id." },
    ],
  };
}

function nodeStages(s: TsScenario) {
  return {
    starter: `function Panel({ children }) { return <section>{children}</section>; } function App() { return <Panel><h1>${s.value}</h1></Panel>; }`,
    stages: [
      { task: "Type the Panel children as ReactNode.", code: `function Panel({ children }: { children: React.ReactNode }) { return <section>{children}</section>; } function App() { return <Panel><h1>${s.value}</h1></Panel>; }`, tests: [source(`${s.id}-node`, "Panel accepts renderable children", "children\\s*:\\s*React\\.ReactNode", "Type children as React.ReactNode."), text(`${s.id}-node-view`, "The typed child renders", "h1", s.value)], hint: "Use the React type that includes text and elements.", answer: "Type children as React.ReactNode." },
      { task: "Add a typed title beside the child content.", code: `function Panel({ title, children }: { title: string; children: React.ReactNode }) { return <section><h1>{title}</h1>{children}</section>; } function App() { return <Panel title=${JSON.stringify(s.value)}><p>${s.alternate}</p></Panel>; }`, tests: [source(`${s.id}-node-title`, "Panel has a typed title", "title\\s*:\\s*string", "Add a string title prop."), text(`${s.id}-node-title-view`, "The typed title renders", "h1", s.value)], hint: "Add title to both the props type and component use.", answer: "Type title as string and pass it to Panel." },
      { task: "Allow an optional action after the child content.", code: `function Panel({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) { return <section><h1>{title}</h1>{children}{action}</section>; } function App() { return <Panel title=${JSON.stringify(s.value)} action={<button type="button">Continue</button>}><p>${s.alternate}</p></Panel>; }`, tests: [source(`${s.id}-node-action`, "The action is an optional ReactNode", "action\\?\\s*:\\s*React\\.ReactNode", "Type action as an optional ReactNode."), exists(`${s.id}-node-action-view`, "The typed action renders", "button")], hint: "Use the same renderable type with an optional marker.", answer: "Add action?: React.ReactNode." },
      { task: "Use ReactNode for a reusable empty-state message.", code: `function EmptyState({ message, action }: { message: React.ReactNode; action?: React.ReactNode }) { return <section><div>{message}</div>{action}</section>; } function App() { return <EmptyState message={<><h1>${s.value}</h1><p>${s.alternate}</p></>} action={<button type="button">Continue</button>} />; }`, tests: [source(`${s.id}-node-message`, "The message accepts ReactNode", "message\\s*:\\s*React\\.ReactNode", "Type message as React.ReactNode."), text(`${s.id}-node-message-view`, "The typed message renders", "p", s.alternate)], hint: "Type the complete message slot as renderable content.", answer: "Use message: React.ReactNode." },
      { task: "Label the completed reusable region for assistive technology.", code: `function EmptyState({ title, message, action }: { title: string; message: React.ReactNode; action?: React.ReactNode }) { return <section aria-labelledby="empty-title"><h1 id="empty-title">{title}</h1><div>{message}</div>{action}</section>; } function App() { return <EmptyState title=${JSON.stringify(s.value)} message={<p>${s.alternate}</p>} action={<button type="button">Continue</button>} />; }`, tests: [source(`${s.id}-node-label`, "The region points to its title", "aria-labelledby=[\"']empty-title[\"']", "Connect the section to its title."), text(`${s.id}-node-complete`, "The completed typed region renders", "#empty-title", s.value)], hint: "Give the title an id and reference it from the section.", answer: "Use aria-labelledby=\"empty-title\" and id=\"empty-title\"." },
    ],
  };
}

const scenario = (id: string, title: string, value: string, alternate: string, count: number): TsScenario => ({ id, title, value, alternate, count });

const topics: TsTopic[] = [
  { id: "annotation", conceptId: "ts-type-annotation", title: "Type Annotations", scenarios: [scenario("typed-help-desk", "Typed Help Desk", "Help Desk", "Permit Desk", 4), scenario("typed-clinic-card", "Typed Clinic Card", "Clinic Queue", "Medicine Desk", 7)], build: annotationStages },
  { id: "inference", conceptId: "ts-type-inference", title: "Type Inference", scenarios: [scenario("inferred-market-card", "Inferred Market Card", "Market Stalls", "Food Stalls", 12), scenario("inferred-route-card", "Inferred Route Card", "Route Stops", "Fare Stops", 8)], build: inferenceStages },
  { id: "alias", conceptId: "ts-type-alias", title: "Type Aliases", scenarios: [scenario("aliased-service-card", "Aliased Service Card", "Water Service", "Power Service", 3), scenario("aliased-stock-card", "Aliased Stock Card", "Rice Stock", "Medicine Stock", 9)], build: aliasStages },
  { id: "interface", conceptId: "ts-interface", title: "Typed Props Interfaces", scenarios: [scenario("permit-props", "Permit Props", "Permit Counter", "Claims Counter", 5), scenario("school-props", "School Props", "School Office", "Library Office", 6)], build: interfaceStages },
  { id: "optional", conceptId: "ts-optional-property", title: "Optional Props", scenarios: [scenario("optional-clinic-note", "Optional Clinic Note", "Clinic Notice", "Bring your ID", 2), scenario("optional-route-note", "Optional Route Note", "Route Notice", "Use Gate 2", 4)], build: optionalStages },
  { id: "readonly", conceptId: "ts-readonly", title: "Readonly Data", scenarios: [scenario("readonly-receipt", "Readonly Receipt", "Receipt A", "Receipt B", 120), scenario("readonly-record", "Readonly Record", "Record A", "Record B", 18)], build: readonlyStages },
  { id: "union", conceptId: "ts-union", title: "Union Status", scenarios: [scenario("union-queue", "Union Queue", "Queue State", "Desk State", 3), scenario("union-stock", "Union Stock", "Stock State", "Order State", 6)], build: unionStages },
  { id: "narrowing", conceptId: "ts-narrowing", title: "Type Narrowing", scenarios: [scenario("narrow-service-value", "Narrow Service Value", "Available", "Pending", 5), scenario("narrow-fare-value", "Narrow Fare Value", "Regular Fare", "Discount Fare", 13)], build: narrowingStages },
  { id: "discriminated", conceptId: "ts-discriminated-union", title: "Request State Unions", scenarios: [scenario("typed-request-state", "Typed Request State", "Request ready", "Request failed", 1), scenario("typed-upload-state", "Typed Upload State", "Upload ready", "Upload failed", 1)], build: discriminatedStages },
  { id: "generic", conceptId: "ts-generic", title: "Generic Collections", scenarios: [scenario("generic-service-list", "Generic Service List", "Health", "Permits", 2), scenario("generic-route-list", "Generic Route List", "North Route", "South Route", 2)], build: genericStages },
  { id: "event", conceptId: "ts-event-type", title: "Typed React Events", scenarios: [scenario("typed-name-field", "Resident name", "resident name", "contact name", 1), scenario("typed-search-field", "Service search", "service search", "route search", 1)], build: eventStages },
  { id: "node", conceptId: "ts-react-node", title: "Typed Child Content", scenarios: [scenario("typed-empty-state", "Typed Empty State", "No projects yet", "Build your first project.", 0), scenario("typed-error-state", "Typed Error State", "Could not load", "Try the request again.", 0)], build: nodeStages },
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
        kind: "react",
        inputMode: "guided",
        files: { "app.tsx": code },
        activeFile: "app.tsx",
        tests: stage.tests,
        hints: [{ level: 1, text: stage.hint }, { level: 2, text: stage.answer }],
        xp: practiceIndex === 0 ? 55 : 65,
        estimatedMinutes: practiceIndex === 0 ? 5 : 6,
        conceptIds: practiceIndex === 0 && stageIndex === 0 ? [topic.conceptId] : undefined,
        solution: { "app.tsx": stage.code },
      });
      code = stage.code;
    }
  }
}

export const typescriptReactCourse: Course = {
  id: "typescript-react",
  title: "Learn TypeScript for React by Hardening Community Interfaces",
  project: projects[0].title,
  projects,
  order: 9,
  summary: "Add useful types to props, state, events, request states, collections, and reusable content.",
  requires: ["react-basics"],
  kind: "react",
  steps,
};
