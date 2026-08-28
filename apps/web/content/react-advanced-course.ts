import type { Project, Step, TestSpec } from "@/lib/lesson-ir";

interface ProjectSeed {
  id: string;
  title: string;
  heading: string;
  sectionTitle: string;
  detail: string;
  action: string;
  className: string;
}

interface Stage {
  task: string;
  code: string;
  tests: TestSpec[];
  hint: string;
  answer: string;
  conceptId?: string;
}

const file = (source: string) => ({ "app.js": source });

const sourceTest = (
  id: string,
  label: string,
  pattern: string,
  because: string,
): TestSpec => ({
  id,
  kind: "source-matches",
  file: "app.js",
  pattern,
  because,
  label,
});

const existsTest = (id: string, label: string, selector: string): TestSpec => ({
  id,
  kind: "react-exists",
  selector,
  label,
});

const textTest = (
  id: string,
  label: string,
  selector: string,
  value: string,
): TestSpec => ({ id, kind: "react-text-equals", selector, value, label });

const attrTest = (
  id: string,
  label: string,
  selector: string,
  attr: string,
  value: string,
): TestSpec => ({ id, kind: "react-attr-equals", selector, attr, value, label });

const clickTextTest = (
  id: string,
  label: string,
  clickSelector: string,
  selector: string,
  value: string,
): TestSpec => ({ id, kind: "react-click-text-equals", clickSelector, selector, value, label });

const inputTextTest = (
  id: string,
  label: string,
  inputSelector: string,
  inputValue: string,
  selector: string,
  value: string,
): TestSpec => ({
  id,
  kind: "react-input-text-equals",
  inputSelector,
  inputValue,
  selector,
  value,
  label,
});

function buildProject(
  seed: ProjectSeed,
  startIndex: number,
  stages: Stage[],
  introduceConcepts: boolean,
): Step[] {
  const firstCode = "function App() {\n  return null;\n}\n";
  return stages.map((stage, offset) => ({
    id: `${seed.id}-${offset + 1}`,
    index: startIndex + offset,
    projectId: seed.id,
    task: stage.task,
    kind: "react",
    inputMode: "guided",
    files: file(offset === 0 ? firstCode : stages[offset - 1].code),
    activeFile: "app.js",
    conceptIds: introduceConcepts && stage.conceptId ? [stage.conceptId] : undefined,
    tests: stage.tests,
    hints: [
      { level: 1, text: stage.hint },
      { level: 2, text: stage.answer },
    ],
    xp: stage.conceptId ? 70 : 50,
    estimatedMinutes: stage.conceptId ? 6 : 5,
    solution: file(stage.code),
  }));
}

function jsxStages(seed: ProjectSeed): Stage[] {
  const titleLine = `const title = ${JSON.stringify(seed.heading)};`;
  const base = `${titleLine}\n\nfunction App() {\n  return null;\n}\n`;
  const main = `${titleLine}\n\nfunction App() {\n  return <main></main>;\n}\n`;
  const heading = `${titleLine}\n\nfunction App() {\n  return <main><h1>{title}</h1></main>;\n}\n`;
  const classed = `${titleLine}\n\nfunction App() {\n  return <main><h1 className=${JSON.stringify(seed.className)}>{title}</h1></main>;\n}\n`;
  const section = `${titleLine}\n\nfunction App() {\n  return <main><h1 className=${JSON.stringify(seed.className)}>{title}</h1><section></section></main>;\n}\n`;
  const sectionHeading = `${titleLine}\n\nfunction App() {\n  return <main><h1 className=${JSON.stringify(seed.className)}>{title}</h1><section><h2>${seed.sectionTitle}</h2></section></main>;\n}\n`;
  const detail = `${titleLine}\n\nfunction App() {\n  return <main><h1 className=${JSON.stringify(seed.className)}>{title}</h1><section><h2>${seed.sectionTitle}</h2><p>${seed.detail}</p></section></main>;\n}\n`;
  const button = `${titleLine}\n\nfunction App() {\n  return <main><h1 className=${JSON.stringify(seed.className)}>{title}</h1><section><h2>${seed.sectionTitle}</h2><p>${seed.detail}</p><button>${seed.action}</button></section></main>;\n}\n`;
  const safeButton = `${titleLine}\n\nfunction App() {\n  return <main><h1 className=${JSON.stringify(seed.className)}>{title}</h1><section><h2>${seed.sectionTitle}</h2><p>${seed.detail}</p><button type="button" aria-label=${JSON.stringify(seed.action)}>${seed.action}</button></section></main>;\n}\n`;
  const fragment = `${titleLine}\n\nfunction App() {\n  return <><main><h1 className=${JSON.stringify(seed.className)}>{title}</h1><section><h2>${seed.sectionTitle}</h2><p>${seed.detail}</p><button type="button" aria-label=${JSON.stringify(seed.action)}>${seed.action}</button></section></main></>;\n}\n`;

  return [
    {
      task: `Save ${seed.heading} in a constant named title.`,
      code: base,
      tests: [sourceTest(`${seed.id}-title`, "The page keeps its heading in title", "const\\s+title\\s*=", "Create a constant named title before App.")],
      hint: "Put the page heading in a constant above App.",
      answer: `Write const title = ${JSON.stringify(seed.heading)}; above App.`,
    },
    {
      task: "Replace null with an empty main element written in JSX.",
      code: main,
      tests: [existsTest(`${seed.id}-main`, "React shows the main area", "main")],
      hint: "Return the same main element you used in HTML.",
      answer: "Write return <main></main>; inside App.",
      conceptId: "react-jsx-element",
    },
    {
      task: "Put an h1 inside main. Show the value stored in title.",
      code: heading,
      tests: [textTest(`${seed.id}-heading`, "The heading shows the saved title", "h1", seed.heading)],
      hint: "Curly braces let JSX read a JavaScript value.",
      answer: "Write <h1>{title}</h1> inside main.",
      conceptId: "react-jsx-expression",
    },
    {
      task: `Give the h1 the class name ${seed.className}.`,
      code: classed,
      tests: [attrTest(`${seed.id}-class`, "The heading has its class name", "h1", "class", seed.className)],
      hint: "JSX uses className for an HTML class.",
      answer: `Add className=${JSON.stringify(seed.className)} to the h1.`,
      conceptId: "react-jsx-class-name",
    },
    {
      task: "Add an empty section after the h1.",
      code: section,
      tests: [existsTest(`${seed.id}-section`, "The page has a section", "main section")],
      hint: "Keep the section inside main and after the heading.",
      answer: "Add <section></section> after the h1.",
      conceptId: "react-nested-element",
    },
    {
      task: `Put an h2 inside the section. Make it read ${seed.sectionTitle}.`,
      code: sectionHeading,
      tests: [textTest(`${seed.id}-section-heading`, "The section has its heading", "section h2", seed.sectionTitle)],
      hint: "The section heading is a child of section.",
      answer: `Write <h2>${seed.sectionTitle}</h2> inside section.`,
    },
    {
      task: `Add a paragraph under the h2. Make it read ${seed.detail}.`,
      code: detail,
      tests: [textTest(`${seed.id}-detail`, "The section explains the service", "section p", seed.detail)],
      hint: "Keep the paragraph inside the same section.",
      answer: `Write <p>${seed.detail}</p> after the h2.`,
    },
    {
      task: `Add a button after the paragraph. Make it read ${seed.action}.`,
      code: button,
      tests: [textTest(`${seed.id}-button`, "The button names its action", "button", seed.action)],
      hint: "The button belongs at the end of the section.",
      answer: `Write <button>${seed.action}</button> after the paragraph.`,
    },
    {
      task: "Give the button a button type and an accessible name that matches its words.",
      code: safeButton,
      tests: [
        attrTest(`${seed.id}-button-type`, "The button has a safe type", "button", "type", "button"),
        attrTest(`${seed.id}-button-name`, "The button has its accessible name", "button", "aria-label", seed.action),
      ],
      hint: "Both details belong in the opening button tag.",
      answer: `Add type="button" and aria-label=${JSON.stringify(seed.action)}.`,
      conceptId: "react-props",
    },
    {
      task: "Wrap the returned main element in a JSX fragment.",
      code: fragment,
      tests: [sourceTest(`${seed.id}-fragment`, "App uses a JSX fragment", "return\\s*<>[\\s\\S]*<main", "Put the main element between an opening and closing fragment.")],
      hint: "A fragment uses empty angle-bracket tags.",
      answer: "Place <> before main and </> after main.",
      conceptId: "react-jsx-fragment",
    },
  ];
}

const jsxSeeds: ProjectSeed[] = [
  { id: "barangay-evacuation-card", title: "Barangay Evacuation Card", heading: "Evacuation Centre", sectionTitle: "Covered Court", detail: "Open during heavy rain", action: "View directions", className: "evacuation-title" },
  { id: "sari-sari-stock-card", title: "Sari-Sari Stock Card", heading: "Store Stock", sectionTitle: "Rice", detail: "Five bags available", action: "Check stock", className: "stock-title" },
  { id: "jeepney-route-card", title: "Jeepney Route Card", heading: "Jeepney Route", sectionTitle: "Cubao to Divisoria", detail: "First trip at 5 AM", action: "View stops", className: "route-title" },
  { id: "palengke-price-card", title: "Palengke Price Card", heading: "Market Prices", sectionTitle: "Tomatoes", detail: "Eighty pesos per kilo", action: "See price list", className: "price-title" },
  { id: "health-centre-hours-card", title: "Health Centre Hours Card", heading: "Health Centre", sectionTitle: "Clinic Hours", detail: "Open until 5 PM", action: "View schedule", className: "clinic-title" },
  { id: "school-enrolment-card", title: "School Enrolment Card", heading: "School Enrolment", sectionTitle: "Grade Seven", detail: "Bring a report card", action: "See requirements", className: "school-title" },
  { id: "water-refill-order-card", title: "Water Refill Order Card", heading: "Water Refill", sectionTitle: "Five Gallons", detail: "Delivery takes one hour", action: "Review order", className: "water-title" },
];

function componentStages(seed: ProjectSeed): Stage[] {
  const data = `const service = { title: ${JSON.stringify(seed.heading)}, detail: ${JSON.stringify(seed.detail)}, action: ${JSON.stringify(seed.action)} };\n\nfunction App() {\n  return null;\n}\n`;
  const component = `const service = { title: ${JSON.stringify(seed.heading)}, detail: ${JSON.stringify(seed.detail)}, action: ${JSON.stringify(seed.action)} };\n\nfunction ServiceCard() { return <article></article>; }\n\nfunction App() {\n  return null;\n}\n`;
  const titleProp = `const service = { title: ${JSON.stringify(seed.heading)}, detail: ${JSON.stringify(seed.detail)}, action: ${JSON.stringify(seed.action)} };\n\nfunction ServiceCard({ title }) {\n  return <article><h2>{title}</h2></article>;\n}\n\nfunction App() {\n  return null;\n}\n`;
  const detailProp = `const service = { title: ${JSON.stringify(seed.heading)}, detail: ${JSON.stringify(seed.detail)}, action: ${JSON.stringify(seed.action)} };\n\nfunction ServiceCard({ title, detail }) {\n  return <article><h2>{title}</h2><p>{detail}</p></article>;\n}\n\nfunction App() {\n  return null;\n}\n`;
  const actionProp = `const service = { title: ${JSON.stringify(seed.heading)}, detail: ${JSON.stringify(seed.detail)}, action: ${JSON.stringify(seed.action)} };\n\nfunction ServiceCard({ title, detail, action }) {\n  return <article><h2>{title}</h2><p>{detail}</p><button type="button">{action}</button></article>;\n}\n\nfunction App() {\n  return null;\n}\n`;
  const render = `const service = { title: ${JSON.stringify(seed.heading)}, detail: ${JSON.stringify(seed.detail)}, action: ${JSON.stringify(seed.action)} };\n\nfunction ServiceCard({ title, detail, action }) {\n  return <article><h2>{title}</h2><p>{detail}</p><button type="button">{action}</button></article>;\n}\n\nfunction App() {\n  return <ServiceCard title={service.title} detail={service.detail} action={service.action} />;\n}\n`;
  const badge = `const service = { title: ${JSON.stringify(seed.heading)}, detail: ${JSON.stringify(seed.detail)}, action: ${JSON.stringify(seed.action)} };\n\nfunction StatusBadge({ children }) { return <span className="status-badge">{children}</span>; }\n\nfunction ServiceCard({ title, detail, action }) {\n  return <article><StatusBadge>Available</StatusBadge><h2>{title}</h2><p>{detail}</p><button type="button">{action}</button></article>;\n}\n\nfunction App() {\n  return <ServiceCard title={service.title} detail={service.detail} action={service.action} />;\n}\n`;
  const wrapper = `const service = { title: ${JSON.stringify(seed.heading)}, detail: ${JSON.stringify(seed.detail)}, action: ${JSON.stringify(seed.action)} };\n\nfunction StatusBadge({ children }) { return <span className="status-badge">{children}</span>; }\n\nfunction ServiceCard({ title, detail, action }) {\n  return <article><StatusBadge>Available</StatusBadge><h2>{title}</h2><p>{detail}</p><button type="button">{action}</button></article>;\n}\n\nfunction App() {\n  return <main><h1>${seed.sectionTitle}</h1><ServiceCard title={service.title} detail={service.detail} action={service.action} /></main>;\n}\n`;
  const classProp = `const service = { title: ${JSON.stringify(seed.heading)}, detail: ${JSON.stringify(seed.detail)}, action: ${JSON.stringify(seed.action)} };\n\nfunction StatusBadge({ children }) {\n  return <span className="status-badge">{children}</span>;\n}\n\nfunction ServiceCard({ title, detail, action, className }) {\n  return <article className={className}><StatusBadge>Available</StatusBadge><h2>{title}</h2><p>{detail}</p><button type="button">{action}</button></article>;\n}\n\nfunction App() {\n  return <main><h1>${seed.sectionTitle}</h1><ServiceCard title={service.title} detail={service.detail} action={service.action} className=${JSON.stringify(seed.className)} /></main>;\n}\n`;
  const accessible = `const service = { title: ${JSON.stringify(seed.heading)}, detail: ${JSON.stringify(seed.detail)}, action: ${JSON.stringify(seed.action)} };\n\nfunction StatusBadge({ children }) {\n  return <span className="status-badge">{children}</span>;\n}\n\nfunction ServiceCard({ title, detail, action, className }) {\n  return <article className={className}><StatusBadge>Available</StatusBadge><h2>{title}</h2><p>{detail}</p><button type="button" aria-label={action}>{action}</button></article>;\n}\n\nfunction App() {\n  return <main><h1>${seed.sectionTitle}</h1><ServiceCard title={service.title} detail={service.detail} action={service.action} className=${JSON.stringify(seed.className)} /></main>;\n}\n`;

  return [
    { task: "Create a service object with title, detail, and action values.", code: data, tests: [sourceTest(`${seed.id}-data`, "The service data is grouped in one object", "const\\s+service\\s*=\\s*\\{", "Create the service object above App.")], hint: "Group the three related values inside one object.", answer: "Write const service = { title, detail, action } above App." },
    { task: "Create a ServiceCard component that returns an empty article.", code: component, tests: [sourceTest(`${seed.id}-component`, "ServiceCard is a component", "function\\s+ServiceCard\\s*\\(", "Define a function named ServiceCard."), sourceTest(`${seed.id}-article-source`, "ServiceCard returns an article", "ServiceCard[\\s\\S]*return\\s+<article", "Return an article from ServiceCard.")], hint: "A component is a function with a capital first letter.", answer: "Write function ServiceCard() and return <article></article>.", conceptId: "react-component" },
    { task: "Give ServiceCard a title prop and show it in an h2.", code: titleProp, tests: [sourceTest(`${seed.id}-title-prop`, "ServiceCard receives the title prop", "ServiceCard\\s*\\(\\s*\\{\\s*title", "Read title from the component props."), sourceTest(`${seed.id}-title-expression`, "The heading reads the title prop", "<h2>\\s*\\{title\\}\\s*</h2>", "Put title inside the h2 with braces.")], hint: "Read title from the object between the component parentheses.", answer: "Use function ServiceCard({ title }) and <h2>{title}</h2>.", conceptId: "react-props" },
    { task: "Add a detail prop and show it in a paragraph.", code: detailProp, tests: [sourceTest(`${seed.id}-detail-prop`, "ServiceCard receives detail", "\\{\\s*title\\s*,\\s*detail", "Add detail beside title in the prop object."), sourceTest(`${seed.id}-detail-expression`, "The paragraph reads detail", "<p>\\s*\\{detail\\}\\s*</p>", "Put detail inside the paragraph.")], hint: "Add detail beside title in the prop list.", answer: "Receive detail, then add <p>{detail}</p>." },
    { task: "Add an action prop and use it as the button text.", code: actionProp, tests: [sourceTest(`${seed.id}-action-prop`, "ServiceCard receives action", "title\\s*,\\s*detail\\s*,\\s*action", "Add action to the prop list."), sourceTest(`${seed.id}-action-button`, "The button reads action", "<button[^>]*>\\s*\\{action\\}", "Put action between the button tags.")], hint: "The button text should come from the new prop.", answer: "Receive action and write <button type=\"button\">{action}</button>." },
    { task: "Render ServiceCard from App and pass all three service values.", code: render, tests: [textTest(`${seed.id}-render-title`, "The card shows its title", "article h2", seed.heading), textTest(`${seed.id}-render-action`, "The card shows its action", "article button", seed.action)], hint: "Use the component like a JSX element inside App.", answer: "Return ServiceCard and pass service.title, service.detail, and service.action.", conceptId: "react-component-composition" },
    { task: "Create StatusBadge and pass Available through its children prop.", code: badge, tests: [textTest(`${seed.id}-badge`, "The status badge says Available", ".status-badge", "Available"), sourceTest(`${seed.id}-children`, "StatusBadge reads children", "StatusBadge\\s*\\(\\s*\\{\\s*children", "Receive children in StatusBadge.")], hint: "Text placed between component tags arrives as children.", answer: "Receive children in StatusBadge and render <StatusBadge>Available</StatusBadge>.", conceptId: "react-children" },
    { task: `Wrap the card in main and add an h1 that reads ${seed.sectionTitle}.`, code: wrapper, tests: [textTest(`${seed.id}-page-heading`, "The page has its heading", "main > h1", seed.sectionTitle), existsTest(`${seed.id}-nested-card`, "The card is inside main", "main article")], hint: "App can compose regular elements and custom components.", answer: `Return main with <h1>${seed.sectionTitle}</h1> before ServiceCard.` },
    { task: `Give ServiceCard a className prop with the value ${seed.className}.`, code: classProp, tests: [attrTest(`${seed.id}-class-prop`, "The card receives its class name", "article", "class", seed.className), sourceTest(`${seed.id}-class-received`, "ServiceCard reads className", "ServiceCard\\s*\\(\\s*\\{[^}]*className", "Receive className with the other props.")], hint: "Pass className into the component, then use it on article.", answer: `Receive className, set article className={className}, and pass ${JSON.stringify(seed.className)}.` },
    { task: "Use the action prop as the button's accessible name.", code: accessible, tests: [attrTest(`${seed.id}-accessible-action`, "The button has a clear accessible name", "button", "aria-label", seed.action)], hint: "The visible action words already describe the button.", answer: "Add aria-label={action} to the button." },
  ];
}

interface ListSeed extends ProjectSeed {
  items: [string, string, string];
  emptyMessage: string;
}

function listStages(seed: ListSeed): Stage[] {
  const array = `const items = ${JSON.stringify(seed.items)};\n\nfunction App() {\n  return null;\n}\n`;
  const list = `const items = ${JSON.stringify(seed.items)};\n\nfunction App() {\n  return <ul></ul>;\n}\n`;
  const map = `const items = ${JSON.stringify(seed.items)};\n\nfunction App() {\n  return <ul>{items.map((item) => <li>{item}</li>)}</ul>;\n}\n`;
  const keyed = `const items = ${JSON.stringify(seed.items)};\n\nfunction App() {\n  return <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>;\n}\n`;
  const component = `const items = ${JSON.stringify(seed.items)};\n\nfunction Item({ name }) { return <li>{name}</li>; }\n\nfunction App() {\n  return <ul>{items.map((item) => <Item key={item} name={item} />)}</ul>;\n}\n`;
  const count = `const items = ${JSON.stringify(seed.items)};\n\nfunction Item({ name }) { return <li>{name}</li>; }\n\nfunction App() {\n  return <main><p className="count">{items.length} items</p><ul>{items.map((item) => <Item key={item} name={item} />)}</ul></main>;\n}\n`;
  const filtered = `const items = ${JSON.stringify(seed.items)};\nconst visibleItems = items.filter((item) => item.length > 0);\n\nfunction Item({ name }) {\n  return <li>{name}</li>;\n}\n\nfunction App() {\n  return <main><p className="count">{visibleItems.length} items</p><ul>{visibleItems.map((item) => <Item key={item} name={item} />)}</ul></main>;\n}\n`;
  const conditional = `const items = ${JSON.stringify(seed.items)};\nconst visibleItems = items.filter((item) => item.length > 0);\n\nfunction Item({ name }) {\n  return <li>{name}</li>;\n}\n\nfunction App() {\n  return <main><p className="count">{visibleItems.length} items</p>{visibleItems.length > 0 ? <ul>{visibleItems.map((item) => <Item key={item} name={item} />)}</ul> : <p className="empty">${seed.emptyMessage}</p>}</main>;\n}\n`;
  const featured = `const items = ${JSON.stringify(seed.items)};\nconst visibleItems = items.filter((item) => item.length > 0);\n\nfunction Item({ name, featured }) {\n  return <li className={featured ? "featured" : "regular"}>{name}</li>;\n}\n\nfunction App() {\n  return <main><p className="count">{visibleItems.length} items</p>{visibleItems.length > 0 ? <ul>{visibleItems.map((item, index) => <Item key={item} name={item} featured={index === 0} />)}</ul> : <p className="empty">${seed.emptyMessage}</p>}</main>;\n}\n`;
  const complete = `const items = ${JSON.stringify(seed.items)};\nconst visibleItems = items.filter((item) => item.length > 0);\n\nfunction Item({ name, featured }) {\n  return <li className={featured ? "featured" : "regular"}>{name}{featured && <span aria-label="Featured item"> Featured</span>}</li>;\n}\n\nfunction App() {\n  return <main><h1>${seed.heading}</h1><p className="count">{visibleItems.length} items</p>{visibleItems.length > 0 ? <ul>{visibleItems.map((item, index) => <Item key={item} name={item} featured={index === 0} />)}</ul> : <p className="empty">${seed.emptyMessage}</p>}</main>;\n}\n`;
  return [
    { task: "Create an items array with the three provided values.", code: array, tests: [sourceTest(`${seed.id}-array`, "The project stores its items in an array", "const\\s+items\\s*=\\s*\\[", "Create the items array above App.")], hint: "Keep the related values in one array.", answer: `Write const items = ${JSON.stringify(seed.items)};` },
    { task: "Return an empty unordered list from App.", code: list, tests: [existsTest(`${seed.id}-list`, "React shows an unordered list", "ul")], hint: "Use the ul element for this group.", answer: "Replace null with <ul></ul>." },
    { task: "Map over items and return one li for each item.", code: map, tests: [textTest(`${seed.id}-first-item`, "The first item is rendered", "li:first-child", seed.items[0]), textTest(`${seed.id}-last-item`, "The last item is rendered", "li:last-child", seed.items[2])], hint: "Use items.map inside JSX braces.", answer: "Write items.map((item) => <li>{item}</li>) inside ul.", conceptId: "react-list-rendering" },
    { task: "Give each list item a stable key based on its value.", code: keyed, tests: [sourceTest(`${seed.id}-key`, "Each list item has a stable key", "<li\\s+key=\\{item\\}", "Add key={item} to the list item.")], hint: "The item values are unique in this list.", answer: "Add key={item} to li.", conceptId: "react-key" },
    { task: "Move each list item into an Item component with a name prop.", code: component, tests: [sourceTest(`${seed.id}-item-component`, "The list uses the Item component", "function\\s+Item[\\s\\S]*<Item\\s+key=", "Create Item and render it inside map."), textTest(`${seed.id}-component-item`, "Item still shows the first value", "li:first-child", seed.items[0])], hint: "Item receives one name and returns one li.", answer: "Create Item({ name }) and map to <Item key={item} name={item} />." },
    { task: "Show the number of items in a paragraph before the list.", code: count, tests: [textTest(`${seed.id}-count`, "The page shows the item count", ".count", "3 items")], hint: "Arrays have a length value.", answer: "Add <p className=\"count\">{items.length} items</p>." },
    { task: "Create visibleItems by filtering out empty item names.", code: filtered, tests: [sourceTest(`${seed.id}-filter`, "The list filters empty names", "items\\.filter\\(", "Call filter on items."), textTest(`${seed.id}-visible-count`, "The visible count stays correct", ".count", "3 items")], hint: "Keep names whose length is greater than zero.", answer: "Create visibleItems with items.filter, then render visibleItems." },
    { task: `Show ${seed.emptyMessage} when visibleItems is empty.`, code: conditional, tests: [sourceTest(`${seed.id}-conditional`, "The page handles an empty list", "visibleItems\\.length\\s*>\\s*0\\s*\\?", "Use a conditional expression for the list and empty message.")], hint: "Choose between the list and one empty-state paragraph.", answer: `Use visibleItems.length > 0 ? the list : <p className="empty">${seed.emptyMessage}</p>.`, conceptId: "react-conditional-rendering" },
    { task: "Mark the first item as featured and give it a featured class.", code: featured, tests: [attrTest(`${seed.id}-featured-class`, "The first item is featured", "li:first-child", "class", "featured"), attrTest(`${seed.id}-regular-class`, "The next item is regular", "li:nth-child(2)", "class", "regular")], hint: "The map callback also receives the item index.", answer: "Pass featured={index === 0} and choose the class inside Item." },
    { task: "Add the page heading and a visible Featured label on the first item.", code: complete, tests: [textTest(`${seed.id}-heading`, "The list has its page heading", "h1", seed.heading), attrTest(`${seed.id}-featured-label`, "The featured label has an accessible name", "li:first-child span", "aria-label", "Featured item")], hint: "Render the label only when featured is true.", answer: "Add the h1 and use featured && to render the labelled span." },
  ];
}

interface CounterSeed extends ProjectSeed {
  unit: string;
  initial: number;
}

function stateStages(seed: CounterSeed): Stage[] {
  const display = `function App() {\n  return <main><h1>${seed.heading}</h1><output>${seed.initial} ${seed.unit}</output></main>;\n}\n`;
  const state = `function App() {\n  const [count, setCount] = React.useState(${seed.initial});\n  return <main><h1>${seed.heading}</h1><output>{count} ${seed.unit}</output></main>;\n}\n`;
  const addButton = `function App() {\n  const [count, setCount] = React.useState(${seed.initial});\n  return <main><h1>${seed.heading}</h1><output>{count} ${seed.unit}</output><button type="button">Add one</button></main>;\n}\n`;
  const add = `function App() {\n  const [count, setCount] = React.useState(${seed.initial});\n  return <main><h1>${seed.heading}</h1><output>{count} ${seed.unit}</output><button className="add" type="button" onClick={() => setCount(count + 1)}>Add one</button></main>;\n}\n`;
  const updater = `function App() {\n  const [count, setCount] = React.useState(${seed.initial});\n  return <main><h1>${seed.heading}</h1><output>{count} ${seed.unit}</output><button className="add" type="button" onClick={() => setCount((current) => current + 1)}>Add one</button></main>;\n}\n`;
  const removeButton = `function App() {\n  const [count, setCount] = React.useState(${seed.initial});\n  return <main><h1>${seed.heading}</h1><output>{count} ${seed.unit}</output><button className="add" type="button" onClick={() => setCount((current) => current + 1)}>Add one</button><button className="remove" type="button">Remove one</button></main>;\n}\n`;
  const remove = `function App() {\n  const [count, setCount] = React.useState(${seed.initial});\n  return <main><h1>${seed.heading}</h1><output>{count} ${seed.unit}</output><button className="add" type="button" onClick={() => setCount((current) => current + 1)}>Add one</button><button className="remove" type="button" onClick={() => setCount((current) => Math.max(0, current - 1))}>Remove one</button></main>;\n}\n`;
  const disabled = `function App() {\n  const [count, setCount] = React.useState(${seed.initial});\n  return <main><h1>${seed.heading}</h1><output>{count} ${seed.unit}</output><button className="add" type="button" onClick={() => setCount((current) => current + 1)}>Add one</button><button className="remove" type="button" disabled={count === 0} onClick={() => setCount((current) => Math.max(0, current - 1))}>Remove one</button></main>;\n}\n`;
  const resetButton = `function App() {\n  const [count, setCount] = React.useState(${seed.initial});\n  return <main><h1>${seed.heading}</h1><output>{count} ${seed.unit}</output><button className="add" type="button" onClick={() => setCount((current) => current + 1)}>Add one</button><button className="remove" type="button" disabled={count === 0} onClick={() => setCount((current) => Math.max(0, current - 1))}>Remove one</button><button className="reset" type="button">Reset</button></main>;\n}\n`;
  const reset = `function App() {\n  const [count, setCount] = React.useState(${seed.initial});\n  return <main><h1>${seed.heading}</h1><output aria-live="polite">{count} ${seed.unit}</output><button className="add" type="button" onClick={() => setCount((current) => current + 1)}>Add one</button><button className="remove" type="button" disabled={count === 0} onClick={() => setCount((current) => Math.max(0, current - 1))}>Remove one</button><button className="reset" type="button" onClick={() => setCount(${seed.initial})}>Reset</button></main>;\n}\n`;
  return [
    { task: `Show the starting value of ${seed.initial} ${seed.unit} in an output element.`, code: display, tests: [textTest(`${seed.id}-display`, "The starting value is visible", "output", `${seed.initial} ${seed.unit}`)], hint: "Use output for a value that will change.", answer: `Return an output that reads ${seed.initial} ${seed.unit}.` },
    { task: "Store the number in count state and show count in the output.", code: state, tests: [sourceTest(`${seed.id}-state`, "The counter uses state", "React\\.useState\\(", "Call React.useState inside App."), textTest(`${seed.id}-state-value`, "The state value is visible", "output", `${seed.initial} ${seed.unit}`)], hint: "useState returns the current value and its setter.", answer: `Write const [count, setCount] = React.useState(${seed.initial}).`, conceptId: "react-state" },
    { task: "Add a button that reads Add one.", code: addButton, tests: [textTest(`${seed.id}-add-button`, "The add button is visible", "button", "Add one")], hint: "Keep the button after the output.", answer: "Add <button type=\"button\">Add one</button>." },
    { task: "Make Add one increase the count when clicked.", code: add, tests: [clickTextTest(`${seed.id}-add`, "The add button increases the value", ".add", "output", `${seed.initial + 1} ${seed.unit}`)], hint: "Pass a function to the button's onClick prop.", answer: "Use onClick={() => setCount(count + 1)}.", conceptId: "react-event-handler" },
    { task: "Change the add handler to use the current-state updater form.", code: updater, tests: [sourceTest(`${seed.id}-updater`, "The add handler uses current state", "setCount\\(\\s*\\(current\\)\\s*=>", "Pass a function to setCount.")], hint: "The setter can receive a function with the latest value.", answer: "Use setCount((current) => current + 1).", conceptId: "react-state-updater" },
    { task: "Add a Remove one button after Add one.", code: removeButton, tests: [textTest(`${seed.id}-remove-button`, "The remove button is visible", ".remove", "Remove one")], hint: "Give the new button a remove class for grading.", answer: "Add a type button with className=\"remove\" and the words Remove one." },
    { task: "Make Remove one lower the count without going below zero.", code: remove, tests: [clickTextTest(`${seed.id}-remove`, "The remove button lowers the value", ".remove", "output", `${Math.max(0, seed.initial - 1)} ${seed.unit}`), sourceTest(`${seed.id}-floor`, "The count cannot go below zero", "Math\\.max\\(\\s*0", "Use Math.max with zero.")], hint: "Choose the larger value between zero and current minus one.", answer: "Use setCount((current) => Math.max(0, current - 1))." },
    { task: "Disable Remove one whenever count is zero.", code: disabled, tests: [sourceTest(`${seed.id}-disabled`, "The remove button checks for zero", "disabled=\\{count\\s*===\\s*0\\}", "Set disabled from a zero check.")], hint: "The disabled prop can receive a Boolean expression.", answer: "Add disabled={count === 0} to Remove one." },
    { task: "Add a Reset button after Remove one.", code: resetButton, tests: [textTest(`${seed.id}-reset-button`, "The reset button is visible", ".reset", "Reset")], hint: "The reset control is another ordinary button.", answer: "Add a type button with className=\"reset\" and the word Reset." },
    { task: "Make Reset restore the starting value and announce output changes.", code: reset, tests: [sourceTest(`${seed.id}-reset-handler`, "Reset restores the starting value", `className="reset"[\\s\\S]*onClick=\\{\\(\\) => setCount\\(${seed.initial}\\)\\}`, "Call setCount with the starting value from Reset."), attrTest(`${seed.id}-live`, "Output changes are announced", "output", "aria-live", "polite")], hint: "Set count to its first value and make the output a polite live region.", answer: `Use onClick={() => setCount(${seed.initial})} and aria-live="polite".` },
  ];
}

interface FormSeed extends ProjectSeed {
  field: string;
  sample: string;
}

function formStages(seed: FormSeed): Stage[] {
  const shell = `function App() {\n  return <form><h1>${seed.heading}</h1></form>;\n}\n`;
  const label = `function App() {\n  return <form><h1>${seed.heading}</h1><label htmlFor="entry">${seed.field}</label></form>;\n}\n`;
  const input = `function App() {\n  return <form><h1>${seed.heading}</h1><label htmlFor="entry">${seed.field}</label><input id="entry" name="entry" /></form>;\n}\n`;
  const state = `function App() {\n  const [value, setValue] = React.useState("");\n  return <form><h1>${seed.heading}</h1><label htmlFor="entry">${seed.field}</label><input id="entry" name="entry" /></form>;\n}\n`;
  const controlled = `function App() {\n  const [value, setValue] = React.useState("");\n  return <form><h1>${seed.heading}</h1><label htmlFor="entry">${seed.field}</label><input id="entry" name="entry" value={value} onChange={(event) => setValue(event.target.value)} /></form>;\n}\n`;
  const preview = `function App() {\n  const [value, setValue] = React.useState("");\n  return <form><h1>${seed.heading}</h1><label htmlFor="entry">${seed.field}</label><input id="entry" name="entry" value={value} onChange={(event) => setValue(event.target.value)} /><p className="preview">{value}</p></form>;\n}\n`;
  const hint = `function App() {\n  const [value, setValue] = React.useState("");\n  return <form><h1>${seed.heading}</h1><label htmlFor="entry">${seed.field}</label><input id="entry" name="entry" value={value} onChange={(event) => setValue(event.target.value)} aria-describedby="entry-hint" /><p id="entry-hint">Enter ${seed.detail}.</p><p className="preview">{value}</p></form>;\n}\n`;
  const count = `function App() {\n  const [value, setValue] = React.useState("");\n  return <form><h1>${seed.heading}</h1><label htmlFor="entry">${seed.field}</label><input id="entry" name="entry" value={value} onChange={(event) => setValue(event.target.value)} aria-describedby="entry-hint" /><p id="entry-hint">Enter ${seed.detail}.</p><p className="preview">{value}</p><p className="count">{value.length} characters</p></form>;\n}\n`;
  const clear = `function App() {\n  const [value, setValue] = React.useState("");\n  return <form><h1>${seed.heading}</h1><label htmlFor="entry">${seed.field}</label><input id="entry" name="entry" value={value} onChange={(event) => setValue(event.target.value)} aria-describedby="entry-hint" /><p id="entry-hint">Enter ${seed.detail}.</p><p className="preview">{value}</p><p className="count">{value.length} characters</p><button className="clear" type="button" onClick={() => setValue("")}>Clear</button></form>;\n}\n`;
  const complete = `function App() {\n  const [value, setValue] = React.useState("");\n  const isReady = value.trim().length > 0;\n  return <form onSubmit={(event) => event.preventDefault()}><h1>${seed.heading}</h1><label htmlFor="entry">${seed.field}</label><input id="entry" name="entry" value={value} onChange={(event) => setValue(event.target.value)} aria-describedby="entry-hint" required /><p id="entry-hint">Enter ${seed.detail}.</p><p className="preview" aria-live="polite">{value}</p><p className="count">{value.length} characters</p><button className="clear" type="button" onClick={() => setValue("")}>Clear</button><button className="save" type="submit" disabled={!isReady}>${seed.action}</button></form>;\n}\n`;
  return [
    { task: "Return a form with the project heading.", code: shell, tests: [textTest(`${seed.id}-form-heading`, "The form has its heading", "form h1", seed.heading)], hint: "Keep the heading inside a form element.", answer: `Return <form><h1>${seed.heading}</h1></form>.` },
    { task: `Add a label that reads ${seed.field}.`, code: label, tests: [textTest(`${seed.id}-label`, "The field has a visible label", "label", seed.field), attrTest(`${seed.id}-label-for`, "The label points to the field", "label", "for", "entry")], hint: "Use htmlFor in JSX to connect a label.", answer: `Add <label htmlFor="entry">${seed.field}</label>.` },
    { task: "Add a named input with the id entry.", code: input, tests: [attrTest(`${seed.id}-input-id`, "The input has the matching id", "input", "id", "entry"), attrTest(`${seed.id}-input-name`, "The input has a name", "input", "name", "entry")], hint: "The input id must match the label's htmlFor value.", answer: "Add <input id=\"entry\" name=\"entry\" />." },
    { task: "Create value state with an empty starting string.", code: state, tests: [sourceTest(`${seed.id}-form-state`, "The form stores its value in state", "const\\s*\\[value\\s*,\\s*setValue\\]\\s*=\\s*React\\.useState\\(\"\"\\)", "Create value state at the top of App.")], hint: "This field starts empty.", answer: "Write const [value, setValue] = React.useState(\"\")." },
    { task: "Control the input with value state and update it on change.", code: controlled, tests: [sourceTest(`${seed.id}-controlled`, "The input is controlled", "value=\\{value\\}[\\s\\S]*onChange=", "Give the input value and onChange props.")], hint: "Read event.target.value in the change handler.", answer: "Add value={value} and onChange={(event) => setValue(event.target.value)}.", conceptId: "react-controlled-input" },
    { task: "Show the current field value in a preview paragraph.", code: preview, tests: [inputTextTest(`${seed.id}-preview`, "Typing updates the preview", "#entry", seed.sample, ".preview", seed.sample)], hint: "Render value inside a paragraph after the input.", answer: "Add <p className=\"preview\">{value}</p>." },
    { task: `Add help text that tells the learner to enter ${seed.detail}.`, code: hint, tests: [attrTest(`${seed.id}-describedby`, "The input points to its help text", "input", "aria-describedby", "entry-hint"), textTest(`${seed.id}-help`, "The help text explains the field", "#entry-hint", `Enter ${seed.detail}.`)], hint: "Connect the input and help text with an id.", answer: `Add aria-describedby="entry-hint" and <p id="entry-hint">Enter ${seed.detail}.</p>.` },
    { task: "Show the current number of characters under the preview.", code: count, tests: [inputTextTest(`${seed.id}-count`, "Typing updates the character count", "#entry", seed.sample, ".count", `${seed.sample.length} characters`)], hint: "Strings have a length value.", answer: "Add <p className=\"count\">{value.length} characters</p>." },
    { task: "Add a Clear button that empties the field.", code: clear, tests: [sourceTest(`${seed.id}-clear`, "Clear empties the field state", "className=\"clear\"[\\s\\S]*setValue\\(\"\"\\)", "Set value to an empty string from Clear.")], hint: "A clear control should not submit the form.", answer: "Add a type button that calls setValue(\"\")." },
    { task: `Add a required ${seed.action} submit button that stays disabled while the field is blank.`, code: complete, tests: [sourceTest(`${seed.id}-required-live`, "The finished form marks required and announces the preview", "required[\\s\\S]*aria-live=\"polite\"", "Add required to the input and aria-live to the preview."), attrTest(`${seed.id}-save-disabled`, "The blank form cannot submit", ".save", "disabled", "")], hint: "Derive isReady from the trimmed value, then use its opposite for disabled.", answer: "Create isReady, add required, and set disabled={!isReady} on the submit button." },
  ];
}

interface EffectSeed extends ProjectSeed {
  titleValue: string;
}

function effectStages(seed: EffectSeed): Stage[] {
  const state = `function App() {\n  const [status, setStatus] = React.useState("Ready");\n  return <main><h1>${seed.heading}</h1><p className="status">{status}</p></main>;\n}\n`;
  const effect = `function App() {\n  const [status, setStatus] = React.useState("Ready");\n  React.useEffect(() => {\n    document.title = ${JSON.stringify(seed.titleValue)};\n  });\n  return <main><h1>${seed.heading}</h1><p className="status">{status}</p></main>;\n}\n`;
  const dependency = `function App() {\n  const [status, setStatus] = React.useState("Ready");\n  React.useEffect(() => {\n    document.title = ${JSON.stringify(seed.titleValue)};\n  }, []);\n  return <main><h1>${seed.heading}</h1><p className="status">{status}</p></main>;\n}\n`;
  const updateTitle = `function App() {\n  const [status, setStatus] = React.useState("Ready");\n  React.useEffect(() => {\n    document.title = status + " | ${seed.titleValue}";\n  }, [status]);\n  return <main><h1>${seed.heading}</h1><p className="status">{status}</p></main>;\n}\n`;
  const button = `function App() {\n  const [status, setStatus] = React.useState("Ready");\n  React.useEffect(() => {\n    document.title = status + " | ${seed.titleValue}";\n  }, [status]);\n  return <main><h1>${seed.heading}</h1><p className="status">{status}</p><button className="update" type="button" onClick={() => setStatus("Updated")}>Update status</button></main>;\n}\n`;
  const ref = `function App() {\n  const [status, setStatus] = React.useState("Ready");\n  const headingRef = React.useRef(null);\n  React.useEffect(() => {\n    document.title = status + " | ${seed.titleValue}";\n  }, [status]);\n  return <main><h1 ref={headingRef} tabIndex="-1">${seed.heading}</h1><p className="status">{status}</p><button className="update" type="button" onClick={() => setStatus("Updated")}>Update status</button></main>;\n}\n`;
  const focusButton = `function App() {\n  const [status, setStatus] = React.useState("Ready");\n  const headingRef = React.useRef(null);\n  React.useEffect(() => {\n    document.title = status + " | ${seed.titleValue}";\n  }, [status]);\n  return <main><h1 ref={headingRef} tabIndex="-1">${seed.heading}</h1><p className="status">{status}</p><button className="update" type="button" onClick={() => setStatus("Updated")}>Update status</button><button className="focus" type="button">Focus heading</button></main>;\n}\n`;
  const focus = `function App() {\n  const [status, setStatus] = React.useState("Ready");\n  const headingRef = React.useRef(null);\n  React.useEffect(() => {\n    document.title = status + " | ${seed.titleValue}";\n  }, [status]);\n  return <main><h1 ref={headingRef} tabIndex="-1">${seed.heading}</h1><p className="status">{status}</p><button className="update" type="button" onClick={() => setStatus("Updated")}>Update status</button><button className="focus" type="button" onClick={() => headingRef.current?.focus()}>Focus heading</button></main>;\n}\n`;
  const cleanup = `function App() {\n  const [status, setStatus] = React.useState("Ready");\n  const headingRef = React.useRef(null);\n  React.useEffect(() => {\n    document.title = status + " | ${seed.titleValue}";\n    return () => { document.title = ${JSON.stringify(seed.titleValue)}; };\n  }, [status]);\n  return <main><h1 ref={headingRef} tabIndex="-1">${seed.heading}</h1><p className="status">{status}</p><button className="update" type="button" onClick={() => setStatus("Updated")}>Update status</button><button className="focus" type="button" onClick={() => headingRef.current?.focus()}>Focus heading</button></main>;\n}\n`;
  const complete = `function App() {\n  const [status, setStatus] = React.useState("Ready");\n  const headingRef = React.useRef(null);\n  React.useEffect(() => {\n    document.title = status + " | ${seed.titleValue}";\n    return () => { document.title = ${JSON.stringify(seed.titleValue)}; };\n  }, [status]);\n  return <main><h1 ref={headingRef} tabIndex="-1">${seed.heading}</h1><p className="status" role="status">{status}</p><button className="update" type="button" onClick={() => setStatus("Updated")}>Update status</button><button className="focus" type="button" onClick={() => headingRef.current?.focus()}>Focus heading</button></main>;\n}\n`;
  return [
    { task: "Store a Ready status in state and show it under the heading.", code: state, tests: [textTest(`${seed.id}-ready`, "The starting status is visible", ".status", "Ready"), sourceTest(`${seed.id}-status-state`, "The status uses state", "React\\.useState\\(\"Ready\"\\)", "Create status state with Ready.")], hint: "This changing value belongs in state.", answer: "Create status state and render {status}." },
    { task: `Use an effect to set the document title to ${seed.titleValue}.`, code: effect, tests: [{ id: `${seed.id}-title-effect`, kind: "react-document-title-equals", value: seed.titleValue, label: "The effect sets the document title" }], hint: "Effects run after React updates the page.", answer: `Call React.useEffect and assign ${JSON.stringify(seed.titleValue)} to document.title.`, conceptId: "react-effect" },
    { task: "Add an empty dependency array so the title effect runs once.", code: dependency, tests: [sourceTest(`${seed.id}-empty-deps`, "The effect has an empty dependency array", "React\\.useEffect\\([\\s\\S]*\\},\\s*\\[\\]\\s*\\)", "Pass an empty array after the effect function.")], hint: "The dependency array is the second useEffect argument.", answer: "Add [] after the effect function.", conceptId: "react-effect-dependency" },
    { task: "Include status in the document title and list it as a dependency.", code: updateTitle, tests: [{ id: `${seed.id}-status-title`, kind: "react-document-title-equals", value: `Ready | ${seed.titleValue}`, label: "The title includes the current status" }, sourceTest(`${seed.id}-status-dep`, "The effect depends on status", "\\[status\\]", "Put status in the dependency array.")], hint: "Build the title from status and the project name.", answer: "Set document.title from status, then change [] to [status]." },
    { task: "Add a button that changes status to Updated.", code: button, tests: [clickTextTest(`${seed.id}-updated`, "The button updates the visible status", ".update", ".status", "Updated")], hint: "Use the state setter in an onClick handler.", answer: "Add Update status and call setStatus(\"Updated\")." },
    { task: "Create headingRef and attach it to the focusable h1.", code: ref, tests: [sourceTest(`${seed.id}-ref`, "The heading uses a ref", "React\\.useRef\\(null\\)[\\s\\S]*<h1\\s+ref=\\{headingRef\\}", "Create headingRef and pass it to h1."), attrTest(`${seed.id}-tabindex`, "The heading can receive focus", "h1", "tabindex", "-1")], hint: "A ref can point to a rendered element.", answer: "Create headingRef, add ref={headingRef}, and set tabIndex=\"-1\".", conceptId: "react-ref" },
    { task: "Add a Focus heading button after Update status.", code: focusButton, tests: [textTest(`${seed.id}-focus-button`, "The focus control is visible", ".focus", "Focus heading")], hint: "This button will use the ref in the next step.", answer: "Add a type button with className=\"focus\"." },
    { task: "Make Focus heading move keyboard focus to the h1.", code: focus, tests: [{ id: `${seed.id}-focus`, kind: "react-click-focus-equals", clickSelector: ".focus", selector: "h1", label: "The button moves focus to the heading" }], hint: "The element is available through headingRef.current.", answer: "Call headingRef.current?.focus() from onClick." },
    { task: "Return a cleanup function that restores the plain project title.", code: cleanup, tests: [sourceTest(`${seed.id}-cleanup`, "The effect returns a cleanup function", "return\\s*\\(\\)\\s*=>", "Return a function from the effect."), sourceTest(`${seed.id}-cleanup-title`, "Cleanup restores the project title", `document\\.title\\s*=\\s*${JSON.stringify(seed.titleValue).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "Set document.title inside cleanup.")], hint: "An effect may return work that runs before it is replaced or removed.", answer: `Return a function that sets document.title to ${JSON.stringify(seed.titleValue)}.` },
    { task: "Give the status paragraph a status role for assistive technology.", code: complete, tests: [attrTest(`${seed.id}-status-role`, "Status changes are announced", ".status", "role", "status"), clickTextTest(`${seed.id}-final-update`, "The finished status control works", ".update", ".status", "Updated")], hint: "The role belongs on the text that changes.", answer: "Add role=\"status\" to the status paragraph." },
  ];
}

function advancedStages(seed: ProjectSeed): Stage[] {
  const reducerLine = `function reducer(state, action) { if (action.type === "add") return state + 1; return state; }`;
  const removeReducerLine = `function reducer(state, action) { if (action.type === "add") return state + 1; if (action.type === "remove") return Math.max(0, state - 1); return state; }`;
  const resetReducerLine = `function reducer(state, action) { if (action.type === "add") return state + 1; if (action.type === "remove") return Math.max(0, state - 1); if (action.type === "reset") return 0; return state; }`;
  const contextLine = `const LabelContext = React.createContext(${JSON.stringify(seed.detail)});`;
  const contextLabelLine = `function ContextLabel() { const label = React.useContext(LabelContext); return <p className="context-label">{label}</p>; }`;
  const hookLine = "function useLabel() { return React.useContext(LabelContext); }";
  const hookedLabelLine = `function ContextLabel() { const label = useLabel(); return <p className="context-label">{label}</p>; }`;
  const reducer = `${reducerLine}\n\nfunction App() {\n  return <main><h1>${seed.heading}</h1></main>;\n}\n`;
  const dispatch = `${reducerLine}\n\nfunction App() {\n  const [count, dispatch] = React.useReducer(reducer, 0);\n  return <main><h1>${seed.heading}</h1><output>{count}</output></main>;\n}\n`;
  const button = `${reducerLine}\n\nfunction App() {\n  const [count, dispatch] = React.useReducer(reducer, 0);\n  return <main><h1>${seed.heading}</h1><output>{count}</output><button className="add" type="button" onClick={() => dispatch({ type: "add" })}>${seed.action}</button></main>;\n}\n`;
  const context = `${contextLine}\n\n${reducerLine}\n\nfunction App() {\n  const [count, dispatch] = React.useReducer(reducer, 0);\n  return <LabelContext.Provider value=${JSON.stringify(seed.sectionTitle)}><main><h1>${seed.heading}</h1><output>{count}</output><button className="add" type="button" onClick={() => dispatch({ type: "add" })}>${seed.action}</button></main></LabelContext.Provider>;\n}\n`;
  const consumer = `${contextLine}\n\n${reducerLine}\n\n${contextLabelLine}\n\nfunction App() {\n  const [count, dispatch] = React.useReducer(reducer, 0);\n  return <LabelContext.Provider value=${JSON.stringify(seed.sectionTitle)}><main><h1>${seed.heading}</h1><ContextLabel /><output>{count}</output><button className="add" type="button" onClick={() => dispatch({ type: "add" })}>${seed.action}</button></main></LabelContext.Provider>;\n}\n`;
  const hook = `${contextLine}\n\n${reducerLine}\n\n${hookLine}\n\n${hookedLabelLine}\n\nfunction App() {\n  const [count, dispatch] = React.useReducer(reducer, 0);\n  return <LabelContext.Provider value=${JSON.stringify(seed.sectionTitle)}><main><h1>${seed.heading}</h1><ContextLabel /><output>{count}</output><button className="add" type="button" onClick={() => dispatch({ type: "add" })}>${seed.action}</button></main></LabelContext.Provider>;\n}\n`;
  const removeAction = `${contextLine}\n\n${removeReducerLine}\n\n${hookLine}\n\n${hookedLabelLine}\n\nfunction App() {\n  const [count, dispatch] = React.useReducer(reducer, 0);\n  return <LabelContext.Provider value=${JSON.stringify(seed.sectionTitle)}><main><h1>${seed.heading}</h1><ContextLabel /><output>{count}</output><button className="add" type="button" onClick={() => dispatch({ type: "add" })}>${seed.action}</button></main></LabelContext.Provider>;\n}\n`;
  const removeButton = `${contextLine}\n\n${removeReducerLine}\n\n${hookLine}\n\n${hookedLabelLine}\n\nfunction App() {\n  const [count, dispatch] = React.useReducer(reducer, 0);\n  return <LabelContext.Provider value=${JSON.stringify(seed.sectionTitle)}><main><h1>${seed.heading}</h1><ContextLabel /><output>{count}</output><button className="add" type="button" onClick={() => dispatch({ type: "add" })}>${seed.action}</button><button className="remove" type="button" onClick={() => dispatch({ type: "remove" })}>Remove one</button></main></LabelContext.Provider>;\n}\n`;
  const resetAction = `${contextLine}\n\n${resetReducerLine}\n\n${hookLine}\n\n${hookedLabelLine}\n\nfunction App() {\n  const [count, dispatch] = React.useReducer(reducer, 0);\n  return <LabelContext.Provider value=${JSON.stringify(seed.sectionTitle)}><main><h1>${seed.heading}</h1><ContextLabel /><output>{count}</output><button className="add" type="button" onClick={() => dispatch({ type: "add" })}>${seed.action}</button><button className="remove" type="button" onClick={() => dispatch({ type: "remove" })}>Remove one</button></main></LabelContext.Provider>;\n}\n`;
  const complete = `${contextLine}\n\n${resetReducerLine}\n\n${hookLine}\n\n${hookedLabelLine}\n\nfunction App() {\n  const [count, dispatch] = React.useReducer(reducer, 0);\n  return <LabelContext.Provider value=${JSON.stringify(seed.sectionTitle)}><main><h1>${seed.heading}</h1><ContextLabel /><output aria-live="polite">{count}</output><button className="add" type="button" onClick={() => dispatch({ type: "add" })}>${seed.action}</button><button className="remove" type="button" onClick={() => dispatch({ type: "remove" })}>Remove one</button><button className="reset" type="button" onClick={() => dispatch({ type: "reset" })}>Reset</button></main></LabelContext.Provider>;\n}\n`;
  return [
    { task: "Create a reducer that handles an add action.", code: reducer, tests: [sourceTest(`${seed.id}-reducer`, "The project has a reducer", "function\\s+reducer\\s*\\(", "Define a reducer function."), sourceTest(`${seed.id}-add-action`, "The reducer handles add", "action\\.type\\s*===\\s*\"add\"", "Check the action type inside reducer.")], hint: "A reducer receives the current state and an action.", answer: "Create reducer(state, action) and return state + 1 for add." },
    { task: "Use the reducer in App and show its count in an output.", code: dispatch, tests: [sourceTest(`${seed.id}-use-reducer`, "App uses the reducer", "React\\.useReducer\\(reducer\\s*,\\s*0\\)", "Call useReducer with reducer and zero."), textTest(`${seed.id}-reducer-count`, "The reducer starts at zero", "output", "0")], hint: "useReducer returns state and a dispatch function.", answer: "Write const [count, dispatch] = React.useReducer(reducer, 0).", conceptId: "react-reducer" },
    { task: `Add a ${seed.action} button that dispatches an add action.`, code: button, tests: [clickTextTest(`${seed.id}-dispatch`, "The action increases the count", ".add", "output", "1")], hint: "Dispatch an object with type add.", answer: "Call dispatch({ type: \"add\" }) from the button." },
    { task: "Create LabelContext and wrap the page in its provider.", code: context, tests: [sourceTest(`${seed.id}-context`, "The project creates context", "React\\.createContext\\(", "Create LabelContext above the reducer."), sourceTest(`${seed.id}-provider`, "App provides a label value", "<LabelContext\\.Provider\\s+value=", "Wrap the page in LabelContext.Provider.")], hint: "Context carries one value through the component tree.", answer: "Create LabelContext and return its Provider around main.", conceptId: "react-context" },
    { task: "Create ContextLabel and read the provided value with useContext.", code: consumer, tests: [textTest(`${seed.id}-context-value`, "The provided label is visible", ".context-label", seed.sectionTitle), sourceTest(`${seed.id}-use-context`, "ContextLabel reads context", "React\\.useContext\\(LabelContext\\)", "Call useContext in ContextLabel.")], hint: "Read LabelContext inside the child component.", answer: "Create ContextLabel, call React.useContext(LabelContext), and render the value." },
    { task: "Move the context lookup into a custom hook named useLabel.", code: hook, tests: [sourceTest(`${seed.id}-custom-hook`, "The project has a custom hook", "function\\s+useLabel\\s*\\(", "Create a function named useLabel."), sourceTest(`${seed.id}-hook-use`, "ContextLabel uses the custom hook", "const\\s+label\\s*=\\s*useLabel\\(\\)", "Call useLabel in ContextLabel.")], hint: "A custom hook is a function whose name starts with use.", answer: "Create useLabel that returns useContext, then call useLabel in ContextLabel.", conceptId: "react-custom-hook" },
    { task: "Handle a remove action without letting the count go below zero.", code: removeAction, tests: [sourceTest(`${seed.id}-remove-action`, "The reducer handles remove safely", "action\\.type\\s*===\\s*\"remove\"[\\s\\S]*Math\\.max\\(0", "Add a remove branch with a zero floor.")], hint: "Reducers can handle several named actions.", answer: "Return Math.max(0, state - 1) for remove." },
    { task: "Add a Remove one button that dispatches remove.", code: removeButton, tests: [sourceTest(`${seed.id}-remove-dispatch`, "Remove dispatches its action", "className=\"remove\"[\\s\\S]*type:\\s*\"remove\"", "Dispatch the remove action from the button.")], hint: "The button sends the action; the reducer decides the next state.", answer: "Add Remove one and dispatch { type: \"remove\" }." },
    { task: "Add a reset action branch to the reducer.", code: resetAction, tests: [sourceTest(`${seed.id}-reset-branch`, "The reducer handles reset", "action\\.type\\s*===\\s*\"reset\"", "Add a reset branch to reducer.")], hint: "Reset should return the initial count.", answer: "Return 0 when action.type is reset." },
    { task: "Handle reset in the reducer and add an accessible Reset button.", code: complete, tests: [sourceTest(`${seed.id}-reset-action`, "The reducer handles reset and announces count changes", "action\\.type\\s*===\\s*\"reset\"[\\s\\S]*aria-live=\"polite\"", "Add the reset branch and aria-live to output."), sourceTest(`${seed.id}-reset-dispatch`, "Reset dispatches its action", "className=\"reset\"[\\s\\S]*dispatch\\(\\{\\s*type:\\s*\"reset\"\\s*\\}\\)", "Dispatch the reset action from the Reset button.")], hint: "Reset returns zero, and its button dispatches a reset action.", answer: "Handle reset in reducer, dispatch it from Reset, and add aria-live to output." },
  ];
}

function liftedStateStages(seed: ProjectSeed): Stage[] {
  const state = `function App() {\n  const [amount, setAmount] = React.useState(0);\n  return <main><h1>${seed.heading}</h1><output>{amount}</output></main>;\n}\n`;
  const inputComponent = `function AmountInput({ amount, onChange }) { return <input aria-label="Amount" value={amount} onChange={(event) => onChange(Number(event.target.value))} />; }\n\n${state}`;
  const input = `function AmountInput({ amount, onChange }) { return <input aria-label="Amount" value={amount} onChange={(event) => onChange(Number(event.target.value))} />; }\n\nfunction App() {\n  const [amount, setAmount] = React.useState(0);\n  return <main><h1>${seed.heading}</h1><AmountInput amount={amount} onChange={setAmount} /><output>{amount}</output></main>;\n}\n`;
  const summaryComponent = `function AmountInput({ amount, onChange }) { return <input aria-label="Amount" value={amount} onChange={(event) => onChange(Number(event.target.value))} />; }\nfunction Summary({ amount }) { return <p className="summary">Amount: {amount}</p>; }\n\nfunction App() {\n  const [amount, setAmount] = React.useState(0);\n  return <main><h1>${seed.heading}</h1><AmountInput amount={amount} onChange={setAmount} /><output>{amount}</output></main>;\n}\n`;
  const shared = `function AmountInput({ amount, onChange }) { return <input aria-label="Amount" value={amount} onChange={(event) => onChange(Number(event.target.value))} />; }\nfunction Summary({ amount }) { return <p className="summary">Amount: {amount}</p>; }\n\nfunction App() {\n  const [amount, setAmount] = React.useState(0);\n  return <main><h1>${seed.heading}</h1><AmountInput amount={amount} onChange={setAmount} /><Summary amount={amount} /><output>{amount}</output></main>;\n}\n`;
  const derived = `function AmountInput({ amount, onChange }) { return <input aria-label="Amount" value={amount} onChange={(event) => onChange(Number(event.target.value))} />; }\nfunction Summary({ amount, doubled }) { return <p className="summary">Amount: {amount}. Double: {doubled}.</p>; }\n\nfunction App() {\n  const [amount, setAmount] = React.useState(0);\n  const doubled = amount * 2;\n  return <main><h1>${seed.heading}</h1><AmountInput amount={amount} onChange={setAmount} /><Summary amount={amount} doubled={doubled} /><output>{amount}</output></main>;\n}\n`;
  const resetButton = derived.replace("<output>{amount}</output>", `<output>{amount}</output><button className="reset" type="button">Reset</button>`);
  const reset = resetButton.replace('className="reset" type="button"', 'className="reset" type="button" onClick={() => setAmount(0)}');
  const live = reset.replace("<output>{amount}</output>", '<output aria-live="polite">{amount}</output>');
  const complete = live.replace('<output aria-live="polite">', '<output aria-label="Shared amount" aria-live="polite">');
  return [
    { task: "Keep the shared amount state in App and show it in an output.", code: state, tests: [sourceTest(`${seed.id}-parent-state`, "App owns the shared amount", "function\\s+App[\\s\\S]*React\\.useState\\(0\\)", "Create amount state inside App."), textTest(`${seed.id}-amount-zero`, "The amount starts at zero", "output", "0")], hint: "The nearest common parent should own shared state.", answer: "Create amount state inside App and render it in output.", conceptId: "react-lifted-state" },
    { task: "Create AmountInput with amount and onChange props.", code: inputComponent, tests: [sourceTest(`${seed.id}-amount-input`, "AmountInput receives shared values", "AmountInput\\s*\\(\\s*\\{\\s*amount\\s*,\\s*onChange", "Receive amount and onChange in AmountInput.")], hint: "The child reads the value and reports changes through props.", answer: "Create AmountInput({ amount, onChange }) with a controlled input." },
    { task: "Render AmountInput from App with the shared state and setter.", code: input, tests: [inputTextTest(`${seed.id}-shared-input`, "Typing updates the parent output", "input", "12", "output", "12")], hint: "Pass amount as the value and setAmount as the change function.", answer: "Render <AmountInput amount={amount} onChange={setAmount} />." },
    { task: "Create a Summary component that receives amount.", code: summaryComponent, tests: [sourceTest(`${seed.id}-summary-component`, "Summary receives the amount", "function\\s+Summary\\s*\\(\\s*\\{\\s*amount", "Create Summary with an amount prop.")], hint: "This sibling will read the same parent state.", answer: "Create Summary({ amount }) and return its paragraph." },
    { task: "Render Summary with the same amount state.", code: shared, tests: [inputTextTest(`${seed.id}-shared-summary`, "Both children receive the updated amount", "input", "7", ".summary", "Amount: 7")], hint: "Both children receive data from App.", answer: "Add <Summary amount={amount} /> after AmountInput." },
    { task: "Derive doubled from amount in App.", code: derived, tests: [sourceTest(`${seed.id}-derived-double`, "Double is derived from amount", "const\\s+doubled\\s*=\\s*amount\\s*\\*\\s*2", "Calculate doubled directly from amount."), inputTextTest(`${seed.id}-double-value`, "The summary shows the derived value", "input", "6", ".summary", "Amount: 6. Double: 12.")], hint: "Do not create a second state value for something you can calculate.", answer: "Create const doubled = amount * 2 and pass it to Summary.", conceptId: "react-derived-state" },
    { task: "Add a Reset button after the output.", code: resetButton, tests: [textTest(`${seed.id}-reset-visible`, "The reset control is visible", ".reset", "Reset")], hint: "Use a button type so the control is safe inside future forms.", answer: "Add a type button with className reset." },
    { task: "Make Reset set the shared amount back to zero.", code: reset, tests: [sourceTest(`${seed.id}-reset-shared`, "Reset updates the parent state", "className=\"reset\"[\\s\\S]*setAmount\\(0\\)", "Call setAmount(0) from Reset.")], hint: "The reset handler belongs beside the state setter.", answer: "Add onClick={() => setAmount(0)} to Reset." },
    { task: "Announce changes to the shared output politely.", code: live, tests: [attrTest(`${seed.id}-shared-live`, "Amount changes are announced", "output", "aria-live", "polite")], hint: "The changing output needs a polite live region.", answer: "Add aria-live=\"polite\" to output." },
    { task: "Give the shared output a clear accessible name.", code: complete, tests: [attrTest(`${seed.id}-shared-name`, "The shared output has a clear name", "output", "aria-label", "Shared amount")], hint: "Name the changing value, not its visual position.", answer: "Add aria-label=\"Shared amount\" to output." },
  ];
}

function objectStateStages(seed: ProjectSeed): Stage[] {
  const state = `function App() {\n  const [profile, setProfile] = React.useState({ name: "Ana", city: "Manila" });\n  return <main><h1>${seed.heading}</h1></main>;\n}\n`;
  const name = state.replace("</main>", '<p className="name">{profile.name}</p></main>');
  const nameInput = name.replace('<p className="name">', '<input aria-label="Name" value={profile.name} /><p className="name">');
  const updateName = nameInput.replace('value={profile.name} />', 'value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} />');
  const city = updateName.replace('<p className="name">', '<input aria-label="City" value={profile.city} /><p className="name">');
  const updateCity = city.replace('value={profile.city} />', 'value={profile.city} onChange={(event) => setProfile({ ...profile, city: event.target.value })} />');
  const summary = updateCity.replace('</main>', '<p className="summary">{profile.name} from {profile.city}</p></main>');
  const complete = summary.replace('</main>', '<p className="complete">{profile.name.trim() && profile.city.trim() ? "Complete" : "Incomplete"}</p></main>');
  const resetButton = complete.replace('</main>', '<button className="reset" type="button">Reset profile</button></main>');
  const reset = resetButton.replace('className="reset" type="button"', 'className="reset" type="button" onClick={() => setProfile({ name: "Ana", city: "Manila" })}');
  return [
    { task: "Store name and city together in profile state.", code: state, tests: [sourceTest(`${seed.id}-object-state`, "Profile state is one object", "React\\.useState\\(\\{\\s*name:", "Create one object for the related fields.")], hint: "Related form fields can share one state object.", answer: "Create profile state with name and city." },
    { task: "Show the profile name in a paragraph.", code: name, tests: [textTest(`${seed.id}-profile-name`, "The profile shows its name", ".name", "Ana")], hint: "Read the name property with a dot.", answer: "Render {profile.name} in the name paragraph." },
    { task: "Add a controlled input for the profile name.", code: nameInput, tests: [attrTest(`${seed.id}-name-value`, "The name input reads state", 'input[aria-label="Name"]', "value", "Ana")], hint: "The input value comes from profile.name.", answer: "Add a Name input with value={profile.name}." },
    { task: "Update name without removing city from the object.", code: updateName, tests: [sourceTest(`${seed.id}-spread-name`, "The name update keeps other fields", "setProfile\\(\\{\\s*\\.\\.\\.profile\\s*,\\s*name:", "Spread profile before replacing name."), inputTextTest(`${seed.id}-name-update`, "Typing changes the profile name", 'input[aria-label="Name"]', "Lina", ".name", "Lina")], hint: "Copy the old object before replacing one property.", answer: "Use setProfile({ ...profile, name: event.target.value }).", conceptId: "react-immutable-update" },
    { task: "Add a controlled City input.", code: city, tests: [attrTest(`${seed.id}-city-value`, "The city input reads state", 'input[aria-label="City"]', "value", "Manila")], hint: "Read profile.city for the second field.", answer: "Add a City input with value={profile.city}." },
    { task: "Update city without removing name from the object.", code: updateCity, tests: [sourceTest(`${seed.id}-spread-city`, "The city update keeps other fields", "setProfile\\(\\{\\s*\\.\\.\\.profile\\s*,\\s*city:", "Spread profile before replacing city.")], hint: "Use the same immutable update pattern for city.", answer: "Use setProfile({ ...profile, city: event.target.value })." },
    { task: "Show a summary made from both object properties.", code: summary, tests: [textTest(`${seed.id}-profile-summary`, "The summary combines both fields", ".summary", "Ana from Manila")], hint: "Read both properties from the same object.", answer: "Render {profile.name} from {profile.city}." },
    { task: "Derive whether the two fields make a complete profile.", code: complete, tests: [textTest(`${seed.id}-profile-complete`, "The filled profile is complete", ".complete", "Complete")], hint: "Both trimmed strings must contain words.", answer: "Use a conditional expression based on both trimmed fields." },
    { task: "Add a Reset profile button.", code: resetButton, tests: [textTest(`${seed.id}-profile-reset-visible`, "The reset control is visible", ".reset", "Reset profile")], hint: "Use a regular button for this action.", answer: "Add a type button named Reset profile." },
    { task: "Reset both profile fields with one new object.", code: reset, tests: [sourceTest(`${seed.id}-profile-reset`, "Reset replaces the whole profile", "setProfile\\(\\{\\s*name:\\s*\"Ana\"\\s*,\\s*city:\\s*\"Manila\"", "Pass a complete new object to setProfile.")], hint: "Reset can replace the object with its initial value.", answer: "Call setProfile with the original name and city object." },
  ];
}

function arrayStateStages(seed: ProjectSeed): Stage[] {
  const state = `function App() {\n  const [tasks, setTasks] = React.useState([{ id: 1, name: "Pack rice", done: false }]);\n  return <main><h1>${seed.heading}</h1></main>;\n}\n`;
  const list = state.replace("</main>", '<ul>{tasks.map((task) => <li key={task.id}>{task.name}</li>)}</ul></main>');
  const addButton = list.replace("</main>", '<button className="add" type="button">Add task</button></main>');
  const add = addButton.replace('className="add" type="button"', 'className="add" type="button" onClick={() => setTasks([...tasks, { id: 2, name: "Pack water", done: false }])}');
  const removeButton = add.replace("{task.name}</li>", '{task.name}<button className="remove" type="button">Remove</button></li>');
  const remove = removeButton.replace('className="remove" type="button"', 'className="remove" type="button" onClick={() => setTasks(tasks.filter((item) => item.id !== task.id))}');
  const toggle = remove.replace("{task.name}<button", '<input aria-label={task.name} type="checkbox" checked={task.done} onChange={() => setTasks(tasks.map((item) => item.id === task.id ? { ...item, done: !item.done } : item))} />{task.name}<button');
  const remaining = toggle.replace("<ul>", '<p className="remaining">{tasks.filter((task) => !task.done).length} remaining</p><ul>');
  const empty = remaining.replace("<ul>{tasks.map", '{tasks.length > 0 ? <ul>{tasks.map').replace("</ul><button", '</ul> : <p className="empty">No tasks</p>}<button');
  const live = empty.replace('className="remaining"', 'className="remaining" aria-live="polite"');
  return [
    { task: "Store the first task object in tasks state.", code: state, tests: [sourceTest(`${seed.id}-array-state`, "Tasks state starts with an object array", "React\\.useState\\(\\[\\{\\s*id:", "Create an array with one task object.")], hint: "Each task needs a stable id, a name, and done state.", answer: "Create tasks state with the first task object." },
    { task: "Map tasks into a keyed list.", code: list, tests: [textTest(`${seed.id}-task-list`, "The first task is visible", "li", "Pack rice"), sourceTest(`${seed.id}-task-key`, "Each task uses its id as a key", "key=\\{task\\.id\\}", "Use task.id for the key.")], hint: "Objects in a list need stable keys.", answer: "Map tasks to li elements with key={task.id}." },
    { task: "Add an Add task button after the list.", code: addButton, tests: [textTest(`${seed.id}-add-task-visible`, "The add control is visible", ".add", "Add task")], hint: "Use a regular button for this state change.", answer: "Add a type button named Add task." },
    { task: "Append a second task without changing the old array.", code: add, tests: [sourceTest(`${seed.id}-append-array`, "The add handler creates a new array", "setTasks\\(\\[\\.\\.\\.tasks\\s*,", "Spread tasks into a new array."), sourceTest(`${seed.id}-new-task`, "The new task has a stable id", "id:\\s*2", "Give the new task its own id.")], hint: "Spread the existing tasks before the new object.", answer: "Call setTasks([...tasks, the new task object]).", conceptId: "react-immutable-update" },
    { task: "Add a Remove button to each task.", code: removeButton, tests: [textTest(`${seed.id}-remove-visible`, "Each task has a remove control", ".remove", "Remove")], hint: "The button belongs inside each list item.", answer: "Add a Remove button inside the mapped li." },
    { task: "Remove a task by filtering its id from the array.", code: remove, tests: [sourceTest(`${seed.id}-remove-filter`, "Remove creates a filtered array", "setTasks\\(tasks\\.filter", "Pass a filtered array to setTasks.")], hint: "Keep only items whose id is different.", answer: "Use tasks.filter with the clicked task id." },
    { task: "Toggle one task with map and an object spread.", code: toggle, tests: [sourceTest(`${seed.id}-toggle-map`, "Toggle maps to a new array", "setTasks\\(tasks\\.map", "Map tasks when toggling one item."), sourceTest(`${seed.id}-toggle-spread`, "Toggle copies the changed task", "\\{\\s*\\.\\.\\.item\\s*,\\s*done:", "Spread the matching task before changing done.")], hint: "Return a copied object for the matching id.", answer: "Map tasks and spread the matching item with a flipped done value." },
    { task: "Derive and show the number of unfinished tasks.", code: remaining, tests: [textTest(`${seed.id}-remaining`, "The remaining count is derived", ".remaining", "1 remaining")], hint: "Filter unfinished tasks, then read the array length.", answer: "Render tasks.filter((task) => !task.done).length." },
    { task: "Show an empty message when no tasks remain in the array.", code: empty, tests: [sourceTest(`${seed.id}-empty-array`, "The page handles an empty task array", "tasks\\.length\\s*>\\s*0\\s*\\?", "Choose between the list and empty message.")], hint: "Use the array length as the condition.", answer: "Render the list when tasks has items, otherwise show No tasks." },
    { task: "Announce changes to the remaining count.", code: live, tests: [attrTest(`${seed.id}-remaining-live`, "Remaining changes are announced", ".remaining", "aria-live", "polite")], hint: "The derived count changes after task actions.", answer: "Add aria-live=\"polite\" to the remaining paragraph." },
  ];
}

function derivedCollectionStages(seed: ProjectSeed): Stage[] {
  const productData = `const products = [{ id: 1, name: "Rice", price: 55 }, { id: 2, name: "Soap", price: 30 }, { id: 3, name: "Water", price: 20 }];`;
  const data = `${productData}\n\nfunction App() { return <main><h1>${seed.heading}</h1></main>; }\n`;
  const query = `${productData}\n\nfunction App() { const [query, setQuery] = React.useState(""); return <main><h1>${seed.heading}</h1></main>; }\n`;
  const input = `${productData}\n\nfunction App() { const [query, setQuery] = React.useState(""); return <main><h1>${seed.heading}</h1><input aria-label="Search" value={query} onChange={(event) => setQuery(event.target.value)} /></main>; }\n`;
  const filtered = `${productData}\n\nfunction App() { const [query, setQuery] = React.useState(""); const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())); return <main><h1>${seed.heading}</h1><input aria-label="Search" value={query} onChange={(event) => setQuery(event.target.value)} /></main>; }\n`;
  const list = filtered.replace("</main>", '<ul>{filteredProducts.map((product) => <li key={product.id}>{product.name}</li>)}</ul></main>');
  const count = list.replace("<ul>", '<p className="count">{filteredProducts.length} matches</p><ul>');
  const total = count.replace("const filteredProducts =", "const filteredProducts =").replace("return <main>", "const total = filteredProducts.reduce((sum, product) => sum + product.price, 0); return <main>").replace("<p className=\"count\">", '<p className="total">Total: {total}</p><p className="count">');
  const sorted = total.replace("const total =", "const sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price); const total =").replace("filteredProducts.map", "sortedProducts.map");
  const price = sorted.replace("{product.name}</li>", '{product.name}: ₱{product.price}</li>');
  const empty = price.replace("<ul>{sortedProducts.map", '{sortedProducts.length > 0 ? <ul>{sortedProducts.map').replace("</ul></main>", '</ul> : <p className="empty">No matches</p>}</main>');
  return [
    { task: "Create a products array with stable ids, names, and prices.", code: data, tests: [sourceTest(`${seed.id}-products`, "Products are stored as objects", "const\\s+products\\s*=\\s*\\[\\{", "Create the products array above App.")], hint: "Each product needs an id, name, and price.", answer: "Create the products array with three objects." },
    { task: "Create query state for a product search.", code: query, tests: [sourceTest(`${seed.id}-query`, "The search query uses state", "React\\.useState\\(\"\"\\)", "Create empty query state.")], hint: "The search begins with an empty string.", answer: "Create query and setQuery state." },
    { task: "Add a controlled Search input.", code: input, tests: [sourceTest(`${seed.id}-search-input`, "The search input is controlled", "value=\\{query\\}[\\s\\S]*setQuery", "Connect query and setQuery to the input.")], hint: "The input reads query and reports every edit.", answer: "Add a Search input controlled by query." },
    { task: "Derive filteredProducts directly from products and query.", code: filtered, tests: [sourceTest(`${seed.id}-derive-filter`, "Filtered products are derived during render", "const\\s+filteredProducts\\s*=\\s*products\\.filter", "Filter products directly from current values.")], hint: "This value does not need its own state or effect.", answer: "Filter products by the lower-case query.", conceptId: "react-derived-state" },
    { task: "Render the filtered products as a keyed list.", code: list, tests: [inputTextTest(`${seed.id}-filtered-list`, "Searching shows the matching product", 'input[aria-label="Search"]', "soap", "li", "Soap")], hint: "Map filteredProducts, not the original array.", answer: "Map filteredProducts to keyed list items." },
    { task: "Show the number of filtered matches.", code: count, tests: [inputTextTest(`${seed.id}-match-count`, "The match count follows the query", 'input[aria-label="Search"]', "water", ".count", "1 matches")], hint: "The filtered array already has the needed length.", answer: "Render filteredProducts.length in the count paragraph." },
    { task: "Derive the total price with reduce.", code: total, tests: [textTest(`${seed.id}-total`, "The total comes from all visible products", ".total", "Total: 105")], hint: "Add each visible product price to a running sum.", answer: "Use reduce on filteredProducts with a starting sum of zero." },
    { task: "Sort a copied filtered array by price.", code: sorted, tests: [sourceTest(`${seed.id}-sorted-copy`, "Sorting keeps the filtered array unchanged", "\\[\\.\\.\\.filteredProducts\\]\\.sort", "Spread filteredProducts before sorting."), textTest(`${seed.id}-lowest-first`, "The cheapest product appears first", "li:first-child", "Water")], hint: "Copy the array before calling sort.", answer: "Create sortedProducts from [...filteredProducts].sort by price." },
    { task: "Show each visible product price beside its name.", code: price, tests: [textTest(`${seed.id}-price-label`, "The first item includes its price", "li:first-child", "Water: ₱20")], hint: "Read both name and price from each object.", answer: "Render product.name and product.price in each li." },
    { task: "Show No matches when the derived array is empty.", code: empty, tests: [inputTextTest(`${seed.id}-no-matches`, "An unmatched search shows the empty state", 'input[aria-label="Search"]', "coffee", ".empty", "No matches")], hint: "Choose between the list and an empty-state paragraph.", answer: "Render No matches when sortedProducts has no items." },
  ];
}

function reusableHookStages(seed: ProjectSeed): Stage[] {
  const hook = `function useToggle() {\n  const [open, setOpen] = React.useState(false);\n  return [open, () => setOpen((current) => !current)];\n}\n\nfunction App() { return <main><h1>${seed.heading}</h1></main>; }\n`;
  const call = hook.replace("function App() {", "function App() { const [open, toggle] = useToggle();");
  const button = call.replace("</main>", '<button className="toggle" type="button" onClick={toggle}>Toggle details</button></main>');
  const details = button.replace("</main>", '{open && <p className="details">Details are open</p>}</main>');
  const panel = details.replace("function App() {", 'function Panel({ title }) { const [open, toggle] = useToggle(); return <section><h2>{title}</h2><button type="button" onClick={toggle}>Toggle panel</button>{open && <p>Panel is open</p>}</section>; }\n\nfunction App() {');
  const firstPanel = panel.replace("</main>", '<Panel title="Schedule" /></main>');
  const secondPanel = firstPanel.replace("</main>", '<Panel title="Requirements" /></main>');
  const labelled = secondPanel.replace("<button type=\"button\" onClick={toggle}>Toggle panel</button>", '<button type="button" aria-expanded={open} onClick={toggle}>Toggle panel</button>');
  const status = labelled.replace("<p>Panel is open</p>", '<p role="status">Panel is open</p>');
  const complete = status.replace("return [open, () => setOpen((current) => !current)];", "const toggle = () => setOpen((current) => !current);\n  return [open, toggle];");
  return [
    { task: "Create a useToggle custom hook with open state.", code: hook, tests: [sourceTest(`${seed.id}-toggle-hook`, "The custom hook owns open state", "function\\s+useToggle[\\s\\S]*React\\.useState\\(false\\)", "Create open state inside useToggle.")], hint: "Hooks can package state and the action that changes it.", answer: "Create useToggle with false open state.", conceptId: "react-custom-hook" },
    { task: "Call useToggle at the top of App.", code: call, tests: [sourceTest(`${seed.id}-hook-call`, "App calls the hook at its top level", "function\\s+App\\(\\)\\s*\\{\\s*const\\s*\\[open", "Call useToggle before returning JSX.")], hint: "Hooks run at the top level of a component.", answer: "Destructure open and toggle from useToggle in App.", conceptId: "react-hook-rules" },
    { task: "Add a button that runs the toggle function.", code: button, tests: [sourceTest(`${seed.id}-toggle-button`, "The button uses the hook action", "onClick=\\{toggle\\}", "Pass toggle to onClick.")], hint: "Pass the returned function directly to onClick.", answer: "Add Toggle details with onClick={toggle}." },
    { task: "Show details only while open is true.", code: details, tests: [clickTextTest(`${seed.id}-toggle-details`, "The hook opens the details", ".toggle", ".details", "Details are open")], hint: "Use open with the && operator.", answer: "Render the details paragraph with open &&." },
    { task: "Create a Panel component that uses the same hook.", code: panel, tests: [sourceTest(`${seed.id}-panel-hook`, "Panel reuses useToggle", "function\\s+Panel[\\s\\S]*useToggle\\(\\)", "Call useToggle inside Panel.")], hint: "Each component call receives its own hook state.", answer: "Create Panel and call useToggle inside it." },
    { task: "Render a Schedule panel from App.", code: firstPanel, tests: [textTest(`${seed.id}-schedule-panel`, "The first reusable panel is visible", "section h2", "Schedule")], hint: "Pass the panel heading through its title prop.", answer: "Render <Panel title=\"Schedule\" />." },
    { task: "Render a second independent Requirements panel.", code: secondPanel, tests: [textTest(`${seed.id}-second-panel`, "The second panel has its own heading", "section:nth-of-type(2) h2", "Requirements")], hint: "Calling the component again creates separate hook state.", answer: "Add <Panel title=\"Requirements\" />." },
    { task: "Expose each panel's open state with aria-expanded.", code: labelled, tests: [attrTest(`${seed.id}-collapsed-panel`, "A closed panel reports false", "section button", "aria-expanded", "false")], hint: "The Boolean open value belongs on the toggle button.", answer: "Add aria-expanded={open} to the panel button." },
    { task: "Give each opened panel message a status role.", code: status, tests: [sourceTest(`${seed.id}-panel-status`, "Opened panel messages are status text", "<p\\s+role=\"status\">", "Add a status role to the open message.")], hint: "The message appears after an action.", answer: "Add role=\"status\" to the panel message." },
    { task: "Name the toggle function inside the custom hook before returning it.", code: complete, tests: [sourceTest(`${seed.id}-named-toggle`, "The hook returns a named action", "const\\s+toggle\\s*=\\s*\\(\\)\\s*=>[\\s\\S]*return\\s*\\[open\\s*,\\s*toggle\\]", "Create toggle, then return it with open.")], hint: "A named action is easier to inspect and reuse.", answer: "Create const toggle inside useToggle, then return [open, toggle]." },
  ];
}

function memoCollectionStages(seed: ProjectSeed): Stage[] {
  const recordData = `const records = [{ id: 1, name: "Rice" }, { id: 2, name: "Soap" }, { id: 3, name: "Water" }];`;
  const data = `${recordData}\n\nfunction App() { return <main><h1>${seed.heading}</h1></main>; }\n`;
  const state = `${recordData}\n\nfunction App() { const [query, setQuery] = React.useState(""); return <main><h1>${seed.heading}</h1></main>; }\n`;
  const input = `${recordData}\n\nfunction App() { const [query, setQuery] = React.useState(""); return <main><h1>${seed.heading}</h1><input aria-label="Filter records" value={query} onChange={(event) => setQuery(event.target.value)} /></main>; }\n`;
  const plainFilter = `${recordData}\n\nfunction App() { const [query, setQuery] = React.useState(""); const visibleRecords = records.filter((record) => record.name.toLowerCase().includes(query.toLowerCase())); return <main><h1>${seed.heading}</h1><input aria-label="Filter records" value={query} onChange={(event) => setQuery(event.target.value)} /></main>; }\n`;
  const listComponent = plainFilter.replace("function App() {", 'const RecordList = function RecordList({ records, onSelect }) { return <ul>{records.map((record) => <li key={record.id}><button type="button" onClick={() => onSelect(record.name)}>{record.name}</button></li>)}</ul>; };\n\nfunction App() {');
  const selected = listComponent.replace('const [query, setQuery] = React.useState("");', 'const [query, setQuery] = React.useState(""); const [selected, setSelected] = React.useState("None");').replace("</main>", '<RecordList records={visibleRecords} onSelect={setSelected} /><p className="selected">Selected: {selected}</p></main>');
  const memoFilter = selected.replace("const visibleRecords = records.filter", "const visibleRecords = React.useMemo(() => records.filter").replace("query.toLowerCase())); return", "query.toLowerCase())), [query]); return");
  const callback = memoFilter.replace('const [selected, setSelected] = React.useState("None");', 'const [selected, setSelected] = React.useState("None"); const selectRecord = React.useCallback((name) => setSelected(name), []);').replace("onSelect={setSelected}", "onSelect={selectRecord}");
  const memoChild = callback.replace("const RecordList = function RecordList", "const RecordList = React.memo(function RecordList").replace("</ul>; };", "</ul>; });");
  const count = memoChild.replace("<RecordList", '<p className="count">{visibleRecords.length} visible</p><RecordList');
  return [
    { task: "Create a records array with stable ids and names.", code: data, tests: [sourceTest(`${seed.id}-records`, "The records are stored as objects", "const\\s+records\\s*=\\s*\\[\\{", "Create the records array above App.")], hint: "Each record needs a stable id for list rendering.", answer: "Create three record objects with ids and names." },
    { task: "Create query state for filtering records.", code: state, tests: [sourceTest(`${seed.id}-memo-query`, "The filter query uses state", "React\\.useState\\(\"\"\\)", "Create empty query state.")], hint: "The filter begins empty.", answer: "Create query and setQuery state." },
    { task: "Add a controlled Filter records input.", code: input, tests: [sourceTest(`${seed.id}-memo-input`, "The filter input is controlled", "aria-label=\"Filter records\"[\\s\\S]*value=\\{query\\}", "Connect query to the filter input.")], hint: "Update query on every input change.", answer: "Add the controlled filter input." },
    { task: "Derive visibleRecords by filtering names with query.", code: plainFilter, tests: [sourceTest(`${seed.id}-plain-filter`, "Visible records come from the query", "records\\.filter", "Filter the records array.")], hint: "Start with the clear direct calculation before optimizing it.", answer: "Create visibleRecords with records.filter." },
    { task: "Move the list into a RecordList component.", code: listComponent, tests: [sourceTest(`${seed.id}-record-list`, "RecordList renders record buttons", "function\\s+RecordList[\\s\\S]*records\\.map", "Create RecordList and map its records prop.")], hint: "The child receives records and a selection action.", answer: "Create RecordList with records and onSelect props." },
    { task: "Track the selected record and render RecordList.", code: selected, tests: [textTest(`${seed.id}-selected-start`, "Nothing is selected at first", ".selected", "Selected: None"), existsTest(`${seed.id}-records-rendered`, "The record list is rendered", "ul")], hint: "Pass setSelected as the child action for now.", answer: "Create selected state and render RecordList with visibleRecords." },
    { task: "Memoize the filtered collection with query as its dependency.", code: memoFilter, tests: [sourceTest(`${seed.id}-memo-filter`, "The filtered collection uses useMemo", "React\\.useMemo\\([\\s\\S]*\\[query\\]", "Wrap the filter in useMemo with query."), inputTextTest(`${seed.id}-memo-filter-works`, "The memoized filter follows the query", 'input[aria-label="Filter records"]', "soap", "button", "Soap")], hint: "Memoize only the collection calculation, not the state itself.", answer: "Wrap records.filter in React.useMemo with [query].", conceptId: "react-memoization" },
    { task: "Create a stable selectRecord callback and pass it to RecordList.", code: callback, tests: [sourceTest(`${seed.id}-memo-callback`, "The selection action uses useCallback", "React\\.useCallback\\(", "Create selectRecord with useCallback."), sourceTest(`${seed.id}-callback-prop`, "RecordList receives the stable callback", "onSelect=\\{selectRecord\\}", "Pass selectRecord to RecordList.")], hint: "This callback is passed to a memoized child in the next step.", answer: "Create selectRecord with useCallback and pass it as onSelect." },
    { task: "Wrap RecordList in React.memo so stable props can skip repeated work.", code: memoChild, tests: [sourceTest(`${seed.id}-memo-child`, "RecordList uses React.memo", "React\\.memo\\(function\\s+RecordList", "Wrap the child component with React.memo.")], hint: "Memoizing the child matters only because its collection and callback props are stable.", answer: "Pass the RecordList function to React.memo." },
    { task: "Show the number of visible records before RecordList.", code: count, tests: [inputTextTest(`${seed.id}-visible-record-count`, "The visible count follows the memoized collection", 'input[aria-label="Filter records"]', "water", ".count", "1 visible")], hint: "Read the length of the same memoized collection.", answer: "Render visibleRecords.length before RecordList." },
  ];
}

function jsxPracticeStages(seed: ProjectSeed, variant: number): Stage[] {
  const stages = jsxStages(seed);
  if (variant === 0) return stages;
  const attributes = [
    { source: 'title="Open details"', attr: "title", value: "Open details" },
    { source: 'name="primary-action"', attr: "name", value: "primary-action" },
    { source: 'data-kind="service"', attr: "data-kind", value: "service" },
    { source: 'id="primary-action"', attr: "id", value: "primary-action" },
    { source: 'value="open"', attr: "value", value: "open" },
    { source: 'className="action-button"', attr: "class", value: "action-button" },
  ];
  const endings = [
    { code: "<footer>Updated today</footer>", selector: "footer", value: "Updated today" },
    { code: "<aside>Bring one valid ID</aside>", selector: "aside", value: "Bring one valid ID" },
    { code: "<address>Municipal Hall</address>", selector: "address", value: "Municipal Hall" },
    { code: '<time dateTime="08:00">8 AM</time>', selector: "time", value: "8 AM" },
    { code: "<nav>Service menu</nav>", selector: "nav", value: "Service menu" },
    { code: "<small>Information may change</small>", selector: "small", value: "Information may change" },
  ];
  const attribute = attributes[variant - 1];
  const ending = endings[variant - 1];
  const stepNineCode = stages[7].code.replace("<button>", `<button ${attribute.source}>`);
  const stepTenCode = stepNineCode.replace("</main>", `${ending.code}</main>`);
  return [
    ...stages.slice(0, 8),
    { task: `Give the action button a ${attribute.attr} value of ${attribute.value}.`, code: stepNineCode, tests: [attrTest(`${seed.id}-practice-attribute`, "The action button has its new JSX prop", "button", attribute.attr, attribute.value)], hint: "Write the prop in the opening button tag.", answer: `Add ${attribute.source} to the button.` },
    { task: `Add a ${ending.selector} element that reads ${ending.value}.`, code: stepTenCode, tests: [textTest(`${seed.id}-practice-ending`, `The page has its ${ending.selector} content`, ending.selector, ending.value)], hint: "Keep the new semantic element inside main.", answer: `Add ${ending.code} before main closes.` },
  ];
}

function componentPracticeStages(seed: ProjectSeed, variant: number): Stage[] {
  const stages = componentStages(seed);
  if (variant === 0) return stages;
  const configs = [
    { prop: "note", pass: 'note="Bring your claim stub"', jsx: '<small>{note}</small>', selector: "article small", value: "Bring your claim stub" },
    { prop: "available", pass: "available={true}", jsx: '{available && <strong>Open</strong>}', selector: "article strong", value: "Open" },
    { prop: "count", pass: "count={3}", jsx: '<output>{count}</output>', selector: "article output", value: "3" },
    { prop: "area", pass: 'area={{ name: "Town Centre" }}', jsx: '<address>{area.name}</address>', selector: "article address", value: "Town Centre" },
    { prop: "schedule", pass: 'schedule="Weekdays"', jsx: '<time>{schedule}</time>', selector: "article time", value: "Weekdays" },
    { prop: "reference", pass: 'reference="REF-101"', jsx: '<code>{reference}</code>', selector: "article code", value: "REF-101" },
  ];
  const config = configs[variant - 1];
  const base = stages[7].code;
  const stepNineCode = base
    .replace("title, detail, action })", `title, detail, action, ${config.prop} })`)
    .replace("action={service.action} />", `action={service.action} ${config.pass} />`);
  const stepTenCode = stepNineCode.replace("</article>", `${config.jsx}</article>`);
  return [
    ...stages.slice(0, 8),
    { task: `Pass a ${config.prop} prop into ServiceCard.`, code: stepNineCode, tests: [sourceTest(`${seed.id}-practice-prop`, `ServiceCard receives ${config.prop}`, `ServiceCard\\s*\\(\\s*\\{[^}]*${config.prop}`, `Receive the ${config.prop} prop in ServiceCard.`), sourceTest(`${seed.id}-practice-prop-pass`, `App passes ${config.prop}`, config.pass.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), `Pass ${config.prop} from App.`)], hint: "Add the prop at both ends of the component call.", answer: `Receive ${config.prop} and pass ${config.pass}.` },
    { task: `Show the ${config.prop} value inside the card.`, code: stepTenCode, tests: [textTest(`${seed.id}-practice-prop-output`, `The card shows ${config.prop}`, config.selector, config.value)], hint: "Render the prop inside the article.", answer: `Add ${config.jsx} before article closes.` },
  ];
}

function listPracticeStages(seed: ListSeed, variant: number): Stage[] {
  const stages = listStages(seed);
  if (variant === 0) return stages;
  const operations = [
    { expression: "[...visibleItems].sort()", label: "sorted", result: [...seed.items].sort() },
    { expression: "visibleItems.slice(0, 2)", label: "first two", result: seed.items.slice(0, 2) },
    { expression: "[...visibleItems].reverse()", label: "reversed", result: [...seed.items].reverse() },
    { expression: "visibleItems.filter((item) => item.length > 4)", label: "long names", result: seed.items.filter((item) => item.length > 4) },
    { expression: 'visibleItems.concat("Other")', label: "extended", result: [...seed.items, "Other"] },
    { expression: "visibleItems.slice(-2)", label: "last two", result: seed.items.slice(-2) },
  ];
  const operation = operations[variant - 1];
  const base = stages[7].code;
  const marker = "\n\nfunction Item";
  const withPracticeItems = base.replace(marker, `\nconst practiceItems = ${operation.expression};${marker}`);
  const appIndex = withPracticeItems.indexOf("function App");
  const stepNineCode = `${withPracticeItems.slice(0, appIndex)}${withPracticeItems.slice(appIndex).replaceAll("visibleItems", "practiceItems")}`;
  const stepTenCode = stepNineCode.replace("<p className=\"count\">", `<p className="practice-label">${operation.label}</p><p className="count">`);
  return [
    ...stages.slice(0, 8),
    { task: `Create a ${operation.label} practice list and render it.`, code: stepNineCode, tests: [sourceTest(`${seed.id}-practice-list-source`, "The project derives a new practice list", `const\\s+practiceItems\\s*=`, "Create practiceItems before Item."), textTest(`${seed.id}-practice-list-first`, "The practice list has the expected first item", "li:first-child", operation.result[0])], hint: "Derive a new array without changing visibleItems.", answer: `Create practiceItems with ${operation.expression} and render it.` },
    { task: `Label this list ${operation.label}.`, code: stepTenCode, tests: [textTest(`${seed.id}-practice-list-label`, "The practice list has its label", ".practice-label", operation.label)], hint: "Put a short label before the count.", answer: `Add a practice-label paragraph that reads ${operation.label}.` },
  ];
}

function statePracticeStages(seed: CounterSeed, variant: number): Stage[] {
  const stages = stateStages(seed);
  if (variant === 0) return stages;
  const actions = [
    { label: "Add two", expression: "current + 2", expected: seed.initial + 2, message: "Small order" },
    { label: "Double", expression: "current * 2", expected: seed.initial * 2, message: "Seats tracked" },
    { label: "Clear", expression: "0", expected: 0, message: "Tokens ready" },
    { label: "Set ten", expression: "10", expected: 10, message: "Jugs tracked" },
    { label: "Half", expression: "Math.floor(current / 2)", expected: Math.floor(seed.initial / 2), message: "Books tracked" },
    { label: "Cap at five", expression: "Math.min(5, current + 1)", expected: Math.min(5, seed.initial + 1), message: "Count protected" },
  ];
  const action = actions[variant - 1];
  const base = stages[7].code;
  const stepNineCode = base.replace("  return <main>", `  const message = ${JSON.stringify(action.message)};\n  return <main><p className="message">{message}</p>`);
  const stepTenCode = stepNineCode.replace("</main>", `<button className="practice" type="button" onClick={() => setCount((current) => ${action.expression})}>${action.label}</button></main>`);
  return [
    ...stages.slice(0, 8),
    { task: `Derive a short status message that reads ${action.message}.`, code: stepNineCode, tests: [textTest(`${seed.id}-practice-message`, "The counter has its status message", ".message", action.message)], hint: "Keep this display value beside the state it describes.", answer: `Create message and render ${action.message}.` },
    { task: `Add a ${action.label} state action.`, code: stepTenCode, tests: [clickTextTest(`${seed.id}-practice-action`, `The ${action.label} action updates count`, ".practice", "output", `${action.expected} ${seed.unit}`)], hint: "Use the functional state updater form.", answer: `Call setCount((current) => ${action.expression}).` },
  ];
}

function formPracticeStages(seed: FormSeed, variant: number): Stage[] {
  const stages = formStages(seed);
  if (variant === 0) return stages;
  const rules = [
    { expression: "value.trim().length >= 3", label: "At least 3 characters" },
    { expression: "/^[A-Z]/.test(value)", label: "Starts with a capital" },
    { expression: "!/[0-9]/.test(value)", label: "No numbers" },
    { expression: "value.trim().length <= 40", label: "Up to 40 characters" },
    { expression: "value === value.trim()", label: "No outer spaces" },
    { expression: "value.length !== 1", label: "Not one character" },
  ];
  const rule = rules[variant - 1];
  const base = stages[7].code;
  const stepNineCode = base.replace("  return <form>", `  const isValid = ${rule.expression};\n  return <form>`).replace("</form>", `<p className="rule">${rule.label}</p></form>`);
  const stepTenCode = stepNineCode.replace("</form>", `<button className="save" type="submit" disabled={!isValid}>${seed.action}</button></form>`).replace("<form>", '<form onSubmit={(event) => event.preventDefault()}>');
  return [
    ...stages.slice(0, 8),
    { task: `Add the validation rule ${rule.label}.`, code: stepNineCode, tests: [sourceTest(`${seed.id}-practice-validation`, "The form derives isValid", "const\\s+isValid\\s*=", "Create isValid before returning the form."), textTest(`${seed.id}-practice-rule`, "The validation rule is visible", ".rule", rule.label)], hint: "Derive validity from the current controlled value.", answer: `Create isValid with ${rule.expression}.` },
    { task: `Add the ${seed.action} submit button and disable it when invalid.`, code: stepTenCode, tests: [sourceTest(`${seed.id}-practice-submit`, "The submit button follows isValid", "disabled=\\{!isValid\\}", "Use isValid for the disabled prop."), sourceTest(`${seed.id}-practice-prevent`, "The practice form prevents page navigation", "preventDefault\\(\\)", "Prevent the default submit action.")], hint: "Keep this local practice form on the same page.", answer: "Prevent default submit and set disabled={!isValid}." },
  ];
}

function effectPracticeStages(seed: EffectSeed, variant: number): Stage[] {
  const stages = effectStages(seed);
  if (variant === 0) return stages;
  const events = ["resize", "online", "offline", "visibilitychange", "keydown", "hashchange"];
  const eventName = events[variant - 1];
  const eventTarget = eventName === "visibilitychange" ? "document" : "window";
  const base = stages[7].code;
  const effect = `  React.useEffect(() => {\n    const handleEvent = () => setStatus(${JSON.stringify(eventName + " event")});\n    ${eventTarget}.addEventListener(${JSON.stringify(eventName)}, handleEvent);\n  }, []);\n`;
  const cleanupEffect = effect.replace("  }, []);", `    return () => ${eventTarget}.removeEventListener(${JSON.stringify(eventName)}, handleEvent);\n  }, []);`);
  const stepNineCode = base.replace("  return <main>", `${effect}  return <main>`);
  const stepTenCode = base.replace("  return <main>", `${cleanupEffect}  return <main>`).replace('className="status"', 'className="status" role="status"');
  return [
    ...stages.slice(0, 8),
    { task: `Listen for the browser ${eventName} event in a second effect.`, code: stepNineCode, tests: [sourceTest(`${seed.id}-practice-listener`, `The effect listens for ${eventName}`, `addEventListener\\(\"${eventName}\"`, `Listen for ${eventName} inside the effect.`)], hint: "Create the handler inside the effect, then register it.", answer: `Add a second effect with a ${eventName} listener.` },
    { task: `Clean up the ${eventName} listener and mark status text.`, code: stepTenCode, tests: [sourceTest(`${seed.id}-practice-cleanup`, `The effect removes the ${eventName} listener`, `removeEventListener\\(\"${eventName}\"`, `Remove the ${eventName} listener in cleanup.`), attrTest(`${seed.id}-practice-status`, "Status changes are announced", ".status", "role", "status")], hint: "Return a function that removes the same handler.", answer: `Return removeEventListener for ${eventName} and add role="status".` },
  ];
}

const componentSeeds: ProjectSeed[] = [
  { id: "barangay-service-components", title: "Barangay Service Components", heading: "Document Pickup", sectionTitle: "Barangay Services", detail: "Ready after two working days", action: "View claim stub", className: "service-card" },
  { id: "bakery-menu-components", title: "Bakery Menu Components", heading: "Pandesal Tray", sectionTitle: "Morning Menu", detail: "Baked at 5 AM", action: "View batch", className: "menu-card" },
  { id: "ferry-trip-components", title: "Ferry Trip Components", heading: "Island Ferry", sectionTitle: "Port Schedule", detail: "Boarding starts at 7 AM", action: "View boarding", className: "trip-card" },
  { id: "clinic-service-components", title: "Clinic Service Components", heading: "Dental Checkup", sectionTitle: "Clinic Services", detail: "Walk-ins until noon", action: "View queue", className: "clinic-card" },
  { id: "library-book-components", title: "Library Book Components", heading: "Filipino Stories", sectionTitle: "Library Picks", detail: "Available for seven days", action: "View shelf", className: "book-card" },
  { id: "farm-produce-components", title: "Farm Produce Components", heading: "Fresh Mangoes", sectionTitle: "Farm Produce", detail: "Harvested this morning", action: "View crate", className: "produce-card" },
  { id: "repair-service-components", title: "Repair Service Components", heading: "Phone Repair", sectionTitle: "Repair Desk", detail: "Diagnosis takes one hour", action: "View ticket", className: "repair-card" },
];

const listSeeds: ListSeed[] = [
  { id: "relief-supply-list", title: "Relief Supply List", heading: "Relief Supplies", sectionTitle: "Packing List", detail: "Barangay distribution", action: "Pack supplies", className: "supply-list", items: ["Rice", "Water", "Medicine"], emptyMessage: "No supplies listed" },
  { id: "jeepney-stop-list", title: "Jeepney Stop List", heading: "Jeepney Stops", sectionTitle: "Route List", detail: "City route", action: "View route", className: "stop-list", items: ["Cubao", "Quiapo", "Divisoria"], emptyMessage: "No stops listed" },
  { id: "school-task-list", title: "School Task List", heading: "School Tasks", sectionTitle: "Class List", detail: "Weekly tasks", action: "View tasks", className: "task-list", items: ["Read", "Review", "Submit"], emptyMessage: "No tasks listed" },
  { id: "market-stall-list", title: "Market Stall List", heading: "Market Stalls", sectionTitle: "Stall List", detail: "Market guide", action: "View stalls", className: "stall-list", items: ["Vegetables", "Fish", "Rice"], emptyMessage: "No stalls listed" },
  { id: "clinic-queue-list", title: "Clinic Queue List", heading: "Clinic Queue", sectionTitle: "Patient List", detail: "Morning queue", action: "View queue", className: "queue-list", items: ["Ana", "Ben", "Carlo"], emptyMessage: "No patients waiting" },
  { id: "festival-event-list", title: "Festival Event List", heading: "Festival Events", sectionTitle: "Event List", detail: "Town programme", action: "View events", className: "event-list", items: ["Parade", "Dance", "Concert"], emptyMessage: "No events listed" },
  { id: "delivery-zone-list", title: "Delivery Zone List", heading: "Delivery Zones", sectionTitle: "Zone List", detail: "Local deliveries", action: "View zones", className: "zone-list", items: ["North", "Central", "South"], emptyMessage: "No zones listed" },
];

const counterSeeds: CounterSeed[] = [
  { id: "rice-order-counter", title: "Rice Order Counter", heading: "Rice Order", sectionTitle: "Order Counter", detail: "Store order", action: "Add sack", className: "order-counter", unit: "sacks", initial: 1 },
  { id: "tricycle-seat-counter", title: "Tricycle Seat Counter", heading: "Tricycle Seats", sectionTitle: "Seat Counter", detail: "Passenger count", action: "Add seat", className: "seat-counter", unit: "seats", initial: 2 },
  { id: "clinic-token-counter", title: "Clinic Token Counter", heading: "Clinic Tokens", sectionTitle: "Token Counter", detail: "Queue count", action: "Add token", className: "token-counter", unit: "tokens", initial: 1 },
  { id: "water-jug-counter", title: "Water Jug Counter", heading: "Water Jugs", sectionTitle: "Jug Counter", detail: "Delivery count", action: "Add jug", className: "jug-counter", unit: "jugs", initial: 2 },
  { id: "library-book-counter", title: "Library Book Counter", heading: "Borrowed Books", sectionTitle: "Book Counter", detail: "Loan count", action: "Add book", className: "book-counter", unit: "books", initial: 1 },
  { id: "market-basket-counter", title: "Market Basket Counter", heading: "Market Baskets", sectionTitle: "Basket Counter", detail: "Order count", action: "Add basket", className: "basket-counter", unit: "baskets", initial: 2 },
  { id: "classroom-chair-counter", title: "Classroom Chair Counter", heading: "Classroom Chairs", sectionTitle: "Chair Counter", detail: "Room count", action: "Add chair", className: "chair-counter", unit: "chairs", initial: 1 },
];

const formSeeds: FormSeed[] = [
  { id: "barangay-request-form", title: "Barangay Request Form", heading: "Document Request", sectionTitle: "Request Form", detail: "the document name", action: "Save request", className: "request-form", field: "Document name", sample: "Clearance" },
  { id: "canteen-order-form", title: "Canteen Order Form", heading: "Canteen Order", sectionTitle: "Order Form", detail: "the meal name", action: "Save order", className: "order-form", field: "Meal name", sample: "Adobo" },
  { id: "clinic-note-form", title: "Clinic Note Form", heading: "Clinic Note", sectionTitle: "Note Form", detail: "a short health note", action: "Save note", className: "note-form", field: "Health note", sample: "Fever" },
  { id: "school-club-form", title: "School Club Form", heading: "Club Signup", sectionTitle: "Signup Form", detail: "the club name", action: "Save signup", className: "club-form", field: "Club name", sample: "Robotics" },
  { id: "delivery-address-form", title: "Delivery Address Form", heading: "Delivery Address", sectionTitle: "Address Form", detail: "the street address", action: "Save address", className: "address-form", field: "Street address", sample: "Rizal Street" },
  { id: "market-feedback-form", title: "Market Feedback Form", heading: "Market Feedback", sectionTitle: "Feedback Form", detail: "a short comment", action: "Save feedback", className: "feedback-form", field: "Comment", sample: "Clean stalls" },
  { id: "repair-ticket-form", title: "Repair Ticket Form", heading: "Repair Ticket", sectionTitle: "Ticket Form", detail: "the device problem", action: "Save ticket", className: "ticket-form", field: "Device problem", sample: "Broken screen" },
];

const effectSeeds: EffectSeed[] = [
  { id: "flood-alert-effects", title: "Flood Alert Effects", heading: "Flood Alert", sectionTitle: "Alert Panel", detail: "Weather notice", action: "Update alert", className: "alert-panel", titleValue: "Flood Alert" },
  { id: "store-status-effects", title: "Store Status Effects", heading: "Store Status", sectionTitle: "Status Panel", detail: "Business notice", action: "Update store", className: "store-panel", titleValue: "Store Status" },
  { id: "ferry-status-effects", title: "Ferry Status Effects", heading: "Ferry Status", sectionTitle: "Trip Panel", detail: "Port notice", action: "Update ferry", className: "ferry-panel", titleValue: "Ferry Status" },
  { id: "clinic-status-effects", title: "Clinic Status Effects", heading: "Clinic Status", sectionTitle: "Clinic Panel", detail: "Health notice", action: "Update clinic", className: "clinic-panel", titleValue: "Clinic Status" },
  { id: "school-status-effects", title: "School Status Effects", heading: "School Status", sectionTitle: "School Panel", detail: "Class notice", action: "Update school", className: "school-panel", titleValue: "School Status" },
  { id: "delivery-status-effects", title: "Delivery Status Effects", heading: "Delivery Status", sectionTitle: "Delivery Panel", detail: "Order notice", action: "Update delivery", className: "delivery-panel", titleValue: "Delivery Status" },
  { id: "power-status-effects", title: "Power Status Effects", heading: "Power Status", sectionTitle: "Power Panel", detail: "Utility notice", action: "Update power", className: "power-panel", titleValue: "Power Status" },
];

const advancedSeeds: ProjectSeed[] = [
  { id: "community-pantry-dashboard", title: "Community Pantry Dashboard", heading: "Community Pantry", sectionTitle: "Pantry Summary", detail: "Daily stock", action: "Add donation", className: "pantry-dashboard" },
  { id: "cooperative-shared-state", title: "Cooperative Shared State", heading: "Cooperative Amount", sectionTitle: "Shared Amount", detail: "Shared value", action: "Update amount", className: "shared-state" },
  { id: "barangay-profile-state", title: "Barangay Profile State", heading: "Resident Profile", sectionTitle: "Profile State", detail: "Resident details", action: "Update profile", className: "profile-state" },
  { id: "clinic-task-state", title: "Clinic Task State", heading: "Clinic Tasks", sectionTitle: "Task State", detail: "Clinic checklist", action: "Update tasks", className: "task-state" },
  { id: "school-record-search", title: "School Record Search", heading: "School Records", sectionTitle: "Derived Records", detail: "School search", action: "Search records", className: "record-search" },
  { id: "farm-panel-hook", title: "Farm Panel Hook", heading: "Farm Panels", sectionTitle: "Reusable Panels", detail: "Farm details", action: "Toggle panel", className: "panel-hook" },
  { id: "transport-record-memo", title: "Transport Record Memoization", heading: "Transport Records", sectionTitle: "Memoized Records", detail: "Transport search", action: "Select record", className: "record-memo" },
];

let nextIndex = 61;
const projects: Project[] = [];
const steps: Step[] = [];

for (const [seedIndex, seed] of jsxSeeds.entries()) {
  projects.push({ id: seed.id, title: seed.title });
  const built = buildProject(seed, nextIndex, jsxPracticeStages(seed, seedIndex), seedIndex === 0);
  steps.push(...built);
  nextIndex += built.length;
}

function appendFamily<T extends ProjectSeed>(seeds: T[], makeStages: (seed: T, seedIndex: number) => Stage[]) {
  for (const [seedIndex, seed] of seeds.entries()) {
    projects.push({ id: seed.id, title: seed.title });
    const built = buildProject(seed, nextIndex, makeStages(seed, seedIndex), seedIndex === 0);
    steps.push(...built);
    nextIndex += built.length;
  }
}

appendFamily(componentSeeds, componentPracticeStages);
appendFamily(listSeeds, listPracticeStages);
appendFamily(counterSeeds, statePracticeStages);
appendFamily(formSeeds, formPracticeStages);
appendFamily(effectSeeds, effectPracticeStages);

const advancedFactories: Array<(seed: ProjectSeed) => Stage[]> = [
  advancedStages,
  liftedStateStages,
  objectStateStages,
  arrayStateStages,
  derivedCollectionStages,
  reusableHookStages,
  memoCollectionStages,
];

for (const [seedIndex, seed] of advancedSeeds.entries()) {
  projects.push({ id: seed.id, title: seed.title });
  const built = buildProject(seed, nextIndex, advancedFactories[seedIndex](seed), true);
  steps.push(...built);
  nextIndex += built.length;
}

export const advancedReactProjects = projects;
export const advancedReactSteps = steps;
