import type { Course, Step } from "@/lib/lesson-ir";

/**
 * Course 1 — Learn HTML by Building a Sari-Sari Store Page.
 *
 * freeCodeCamp structure: one project, built across many small steps. Each
 * step changes one thing, starts from where the last step ended, and is
 * checked by assertions the learner can read before running.
 */

let n = 0;

const HEAD = `<!DOCTYPE html>
<html>
  <head>
    <title>Aling Nena's Store</title>
  </head>
  <body>
`;
const TAIL = `  </body>
</html>`;

/** Wraps body markup in the boilerplate the learner is not editing yet. */
const page = (body: string) => `${HEAD}${body}${TAIL}`;

interface StepReference {
  estimatedMinutes: number;
  solution: Record<string, string>;
}

const solved = (body: string): Record<string, string> => ({ "index.html": page(body) });

const ORDER_FOOTER_BODY = `    <header>
      <h1>Aling Nena's Store</h1>
    </header>
    <h2>Order</h2>
    <form>
      <label for="item">What do you need?</label>
      <input type="text" id="item">
      <button>Send Order</button>
    </form>
    <footer>Open daily from 6am to 10pm.</footer>
`;

const MAIN_BODY = `    <header>
      <h1>Aling Nena's Store</h1>
    </header>
    <main>
      <h2>Order</h2>
      <form>
        <label for="item">What do you need?</label>
        <input type="text" id="item">
        <button>Send Order</button>
      </form>
    </main>
    <footer>Open daily from 6am to 10pm.</footer>
`;

const REQUIRED_BODY = MAIN_BODY.replace(
  '<input type="text" id="item">',
  '<input type="text" id="item" required>',
);
const NAMED_INPUT_BODY = REQUIRED_BODY.replace(
  '<input type="text" id="item" required>',
  '<input type="text" id="item" name="item" required>',
);
const SUBMIT_TYPE_BODY = NAMED_INPUT_BODY.replace(
  "<button>Send Order</button>",
  '<button type="submit">Send Order</button>',
);
const FIELDSET_BODY = SUBMIT_TYPE_BODY.replace(
  `      <form>
        <label for="item">What do you need?</label>
        <input type="text" id="item" name="item" required>
        <button type="submit">Send Order</button>
      </form>`,
  `      <form>
        <fieldset>
          <label for="item">What do you need?</label>
          <input type="text" id="item" name="item" required>
          <button type="submit">Send Order</button>
        </fieldset>
      </form>`,
);
const LEGEND_BODY = FIELDSET_BODY.replace(
  "        <fieldset>\n",
  "        <fieldset>\n          <legend>Order details</legend>\n",
);
const QUANTITY_BODY = LEGEND_BODY.replace(
  '          <input type="text" id="item" name="item" required>',
  `          <input type="text" id="item" name="item" required>
          <label for="quantity">How many?</label>
          <input type="text" id="quantity" name="quantity" required>`,
);
const NUMBER_BODY = QUANTITY_BODY.replace(
  '<input type="text" id="quantity" name="quantity" required>',
  '<input type="number" id="quantity" name="quantity" required>',
);
const MINIMUM_BODY = NUMBER_BODY.replace(
  '<input type="number" id="quantity" name="quantity" required>',
  '<input type="number" id="quantity" name="quantity" min="1" required>',
);
const PICKUP_SELECT_BODY = MINIMUM_BODY.replace(
  '          <input type="number" id="quantity" name="quantity" min="1" required>',
  `          <input type="number" id="quantity" name="quantity" min="1" required>
          <label for="pickup">Pickup time</label>
          <select id="pickup" name="pickup"></select>`,
);
const PICKUP_OPTIONS_BODY = PICKUP_SELECT_BODY.replace(
  '          <select id="pickup" name="pickup"></select>',
  `          <select id="pickup" name="pickup">
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>`,
);
const ORDER_NOTES_BODY = PICKUP_OPTIONS_BODY.replace(
  "          </select>\n",
  `          </select>
          <label for="notes">Order notes</label>
          <textarea id="notes" name="notes"></textarea>
`,
);

/** Authored proof for every step. Missing entries stop the course from loading. */
const references = {
  "h1-block": { estimatedMinutes: 3, solution: solved("    <h1></h1>\n") },
  "h1-text": {
    estimatedMinutes: 4,
    solution: solved("    <h1>Aling Nena's Store</h1>\n"),
  },
  "p-block": {
    estimatedMinutes: 3,
    solution: solved("    <h1>Aling Nena's Store</h1>\n    <p></p>\n"),
  },
  "p-text": {
    estimatedMinutes: 4,
    solution: solved(
      "    <h1>Aling Nena's Store</h1>\n    <p>Open every day from 6am to 10pm.</p>\n",
    ),
  },
  "h2-section": {
    estimatedMinutes: 5,
    solution: solved(
      "    <h1>Aling Nena's Store</h1>\n    <p>Open every day from 6am to 10pm.</p>\n    <h2>What We Sell</h2>\n",
    ),
  },
  "ul-block": {
    estimatedMinutes: 3,
    solution: solved(
      "    <h1>Aling Nena's Store</h1>\n    <p>Open every day from 6am to 10pm.</p>\n    <h2>What We Sell</h2>\n    <ul></ul>\n",
    ),
  },
  "li-items": {
    estimatedMinutes: 6,
    solution: solved(
      "    <h1>Aling Nena's Store</h1>\n    <p>Open every day from 6am to 10pm.</p>\n    <h2>What We Sell</h2>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n      <li>Coffee</li>\n    </ul>\n",
    ),
  },
  "img-block": {
    estimatedMinutes: 3,
    solution: solved(
      "    <h1>Aling Nena's Store</h1>\n    <h2>What We Sell</h2>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n      <li>Coffee</li>\n    </ul>\n    <img src=\"store.png\">\n",
    ),
  },
  "img-alt": {
    estimatedMinutes: 5,
    solution: solved(
      "    <h1>Aling Nena's Store</h1>\n    <h2>What We Sell</h2>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n      <li>Coffee</li>\n    </ul>\n    <img src=\"store.png\" alt=\"Aling Nena's store front\">\n",
    ),
  },
  anchor: {
    estimatedMinutes: 6,
    solution: solved(
      "    <h1>Aling Nena's Store</h1>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n      <li>Coffee</li>\n    </ul>\n    <img src=\"store.png\" alt=\"Store front\">\n    <a href=\"https://example.com\">Find us</a>\n",
    ),
  },
  sectioning: {
    estimatedMinutes: 6,
    solution: solved(
      "    <header>\n      <h1>Aling Nena's Store</h1>\n    </header>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n    </ul>\n",
    ),
  },
  "form-input": {
    estimatedMinutes: 6,
    solution: solved(
      "    <header>\n      <h1>Aling Nena's Store</h1>\n    </header>\n    <h2>Order</h2>\n    <form>\n      <input type=\"text\">\n    </form>\n",
    ),
  },
  label: {
    estimatedMinutes: 5,
    solution: solved(
      "    <h2>Order</h2>\n    <form>\n      <label for=\"item\">What do you need?</label>\n      <input type=\"text\" id=\"item\">\n    </form>\n",
    ),
  },
  button: {
    estimatedMinutes: 4,
    solution: solved(
      "    <form>\n      <label for=\"item\">What do you need?</label>\n      <input type=\"text\" id=\"item\">\n      <button>Send Order</button>\n    </form>\n",
    ),
  },
  footer: {
    estimatedMinutes: 4,
    solution: solved(ORDER_FOOTER_BODY),
  },
  "main-region": {
    estimatedMinutes: 6,
    solution: solved(MAIN_BODY),
  },
  "required-input": {
    estimatedMinutes: 5,
    solution: solved(REQUIRED_BODY),
  },
  "input-name": {
    estimatedMinutes: 5,
    solution: solved(NAMED_INPUT_BODY),
  },
  "submit-type": {
    estimatedMinutes: 4,
    solution: solved(SUBMIT_TYPE_BODY),
  },
  fieldset: {
    estimatedMinutes: 7,
    solution: solved(FIELDSET_BODY),
  },
  legend: {
    estimatedMinutes: 5,
    solution: solved(LEGEND_BODY),
  },
  "quantity-field": {
    estimatedMinutes: 6,
    solution: solved(QUANTITY_BODY),
  },
  "quantity-number": {
    estimatedMinutes: 5,
    solution: solved(NUMBER_BODY),
  },
  "quantity-minimum": {
    estimatedMinutes: 5,
    solution: solved(MINIMUM_BODY),
  },
  "pickup-select": {
    estimatedMinutes: 6,
    solution: solved(PICKUP_SELECT_BODY),
  },
  "pickup-options": {
    estimatedMinutes: 6,
    solution: solved(PICKUP_OPTIONS_BODY),
  },
  "order-notes": {
    estimatedMinutes: 6,
    solution: solved(ORDER_NOTES_BODY),
  },
} satisfies Record<string, StepReference>;

const s = (step: Omit<Step, "index" | "kind">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web" };
};

export const htmlCourse: Course = {
  id: "html-basics",
  order: 1,
  title: "Learn HTML by Building a Sari-Sari Store Page",
  project: "Sari-Sari Store Page",
  kind: "web",
  requires: [],
  summary: {
    simple: "Start here. Build a real web page from nothing, one piece at a time.",
    standard:
      "Structure and content. Elements, attributes, text, images, links, lists, and forms.",
  },
  steps: [
    s({
      id: "h1-block",
      task: {
        simple: "Every page needs a big title. Add one.",
        standard: "Add a top-level heading element inside the body.",
      },
      inputMode: "tap-to-build",
      files: { "index.html": page("    \n") },
      activeFile: "index.html",
      slotLine: 7,
      concepts: [
        {
          id: "element",
          term: "element",
          definition: {
            simple:
              "An element is one piece of a page. A heading is an element. A picture is an element.",
            standard:
              "An element is a single piece of page structure: an opening tag, some content, and a closing tag.",
          },
          analogy: {
            simple:
              "Think of a labelled box. The opening tag is the label on the front. The closing tag is the tape on the bottom. Whatever you put between them is what the box holds.",
            standard:
              "Think of a labelled box: the tags mark where it starts and ends, and anything between them is inside that box.",
          },
          visual: {
            kind: "diagram",
            diagram: {
              alt: {
                simple:
                  "An element has three parts: an opening tag, the words inside, and a closing tag.",
                standard: "Anatomy of an element: opening tag, text content, closing tag.",
              },
              columns: 3,
              nodes: [
                { id: "open", label: "Opening tag", note: "<h1>", tone: "accent" },
                { id: "text", label: "What's inside", note: "Hello", tone: "box" },
                { id: "close", label: "Closing tag", note: "</h1>", tone: "accent" },
              ],
              arrows: [
                { from: "open", to: "text" },
                { from: "text", to: "close" },
              ],
            },
          },
          proof: {
            simple: "You are about to add your first element and watch it appear.",
            standard: "You will add an h1 element and see it render.",
          },
        },
      ],
      blocks: ["<h1></h1>", "<p></p>", "<img>", "<div></div>"],
      correctBlock: "<h1></h1>",
      tests: [
        {
          id: "h1-exists",
          kind: "exists",
          selector: "h1",
          label: { simple: "The page has a big title", standard: "An h1 element exists" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "The big title block is the one that says h1.",
            standard: "h1 is the highest-level heading in HTML.",
          },
        },
      ],
      xp: 40,
    }),
    s({
      id: "h1-text",
      task: {
        simple: "Your title is empty. Type words between the two tags.",
        standard: "Give the heading text content, between the opening and closing tags.",
      },
      inputMode: "guided",
      files: { "index.html": page("    <h1></h1>\n") },
      activeFile: "index.html",
      highlightToken: "<h1></h1>",
      tests: [
        {
          id: "h1-text",
          kind: "text-not-empty",
          selector: "h1",
          label: { simple: "The title has words in it", standard: "The h1 has text content" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Words go in the middle, not inside the pointy brackets.",
            standard: "Text content sits between `<h1>` and `</h1>`.",
          },
        },
        {
          level: 2,
          text: {
            simple: "Try: <h1>Aling Nena's Store</h1>",
            standard: "For example: `<h1>Aling Nena's Store</h1>`",
          },
        },
      ],
      xp: 40,
    }),
    s({
      id: "p-block",
      task: {
        simple: "Add a paragraph under the title to say what the store sells.",
        standard: "Add a paragraph element below the heading.",
      },
      inputMode: "tap-to-build",
      files: { "index.html": page("    <h1>Aling Nena's Store</h1>\n    \n") },
      activeFile: "index.html",
      slotLine: 8,
      blocks: ["<p></p>", "<h2></h2>", "<img>", "<span></span>"],
      correctBlock: "<p></p>",
      tests: [
        {
          id: "p-exists",
          kind: "exists",
          selector: "p",
          label: { simple: "The page has a paragraph", standard: "A p element exists" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "A paragraph holds normal words. Its block says p.",
            standard: "The `p` element marks a paragraph of text.",
          },
        },
      ],
      xp: 40,
    }),
    s({
      id: "p-text",
      task: {
        simple: "Write what the store sells inside the paragraph.",
        standard: "Give the paragraph text content.",
      },
      inputMode: "guided",
      files: { "index.html": page("    <h1>Aling Nena's Store</h1>\n    <p></p>\n") },
      activeFile: "index.html",
      highlightToken: "<p></p>",
      tests: [
        {
          id: "p-text",
          kind: "text-not-empty",
          selector: "p",
          label: { simple: "The paragraph has words in it", standard: "The p has text content" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Same as the title. Words go in the middle.",
            standard: "Text content sits between `<p>` and `</p>`.",
          },
        },
      ],
      xp: 40,
    }),
    s({
      id: "h2-section",
      task: {
        simple: "Add a smaller heading that says What We Sell.",
        standard: "Add a second-level heading reading What We Sell.",
      },
      inputMode: "guided",
      files: {
        "index.html": page(
          "    <h1>Aling Nena's Store</h1>\n    <p>Open every day from 6am to 10pm.</p>\n    \n",
        ),
      },
      activeFile: "index.html",
      tests: [
        {
          id: "h2-exists",
          kind: "exists",
          selector: "h2",
          label: { simple: "There is a smaller heading", standard: "An h2 element exists" },
        },
        {
          id: "h2-text",
          kind: "text-contains",
          selector: "h2",
          value: "What We Sell",
          label: {
            simple: "It says What We Sell",
            standard: "The h2 contains What We Sell",
          },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "h2 is smaller than h1. Headings go from h1 down to h6.",
            standard: "Heading levels run h1 through h6 and describe rank, not size.",
          },
        },
        {
          level: 2,
          text: {
            simple: "Type: <h2>What We Sell</h2>",
            standard: "`<h2>What We Sell</h2>`",
          },
        },
      ],
      xp: 50,
    }),
    s({
      id: "ul-block",
      task: {
        simple: "A list needs a container. Add one.",
        standard: "Add an unordered list element below the heading.",
      },
      inputMode: "tap-to-build",
      files: {
        "index.html": page(
          "    <h1>Aling Nena's Store</h1>\n    <p>Open every day from 6am to 10pm.</p>\n    <h2>What We Sell</h2>\n    \n",
        ),
      },
      activeFile: "index.html",
      slotLine: 10,
      blocks: ["<ul></ul>", "<li></li>", "<p></p>", "<table></table>"],
      correctBlock: "<ul></ul>",
      tests: [
        {
          id: "ul-exists",
          kind: "exists",
          selector: "ul",
          label: { simple: "There is a list", standard: "A ul element exists" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "ul means unordered list. It holds the items.",
            standard: "`ul` is an unordered list; items go inside it.",
          },
        },
      ],
      xp: 50,
    }),
    s({
      id: "li-items",
      task: {
        simple: "Put three things in the list. Each one goes in its own <li></li>.",
        standard: "Add three list items inside the ul.",
      },
      inputMode: "guided",
      files: {
        "index.html": page(
          "    <h1>Aling Nena's Store</h1>\n    <p>Open every day from 6am to 10pm.</p>\n    <h2>What We Sell</h2>\n    <ul>\n      \n    </ul>\n",
        ),
      },
      activeFile: "index.html",
      highlightToken: "<ul>",
      tests: [
        {
          id: "li-count",
          kind: "count",
          selector: "li",
          atLeast: 3,
          label: { simple: "The list has three things", standard: "There are 3 li elements" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "li means list item. You need three of them.",
            standard: "Each `li` is one item. Nest them inside the `ul`.",
          },
        },
        {
          level: 2,
          text: {
            simple: "Like this: <li>Rice</li> then two more on their own lines.",
            standard: "`<li>Rice</li>`, `<li>Eggs</li>`, `<li>Coffee</li>`",
          },
        },
      ],
      xp: 60,
    }),
    s({
      id: "img-block",
      task: {
        simple: "Add a picture of the store.",
        standard: "Add an image element below the list.",
      },
      inputMode: "tap-to-build",
      files: {
        "index.html": page(
          "    <h1>Aling Nena's Store</h1>\n    <h2>What We Sell</h2>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n      <li>Coffee</li>\n    </ul>\n    \n",
        ),
      },
      activeFile: "index.html",
      slotLine: 14,
      blocks: ['<img src="store.png">', "<p></p>", "<li></li>", "<br>"],
      correctBlock: '<img src="store.png">',
      tests: [
        {
          id: "img-exists",
          kind: "exists",
          selector: "img",
          label: { simple: "The page has a picture", standard: "An img element exists" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "img is short for image. src says which picture to show.",
            standard: "`img` embeds an image; `src` is the source path.",
          },
        },
      ],
      xp: 50,
    }),
    s({
      id: "img-alt",
      task: {
        simple:
          'Give the picture a name. Add alt="Aling Nena\'s store front" inside the tag. People who cannot see the picture will hear this name instead.',
        standard:
          "Add an `alt` attribute describing the image. Screen readers announce it, and it displays if the image fails to load.",
      },
      inputMode: "guided",
      files: {
        "index.html": page(
          "    <h1>Aling Nena's Store</h1>\n    <h2>What We Sell</h2>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n      <li>Coffee</li>\n    </ul>\n    <img src=\"store.png\">\n",
        ),
      },
      activeFile: "index.html",
      highlightToken: "<img",
      tests: [
        {
          id: "img-alt",
          kind: "attr",
          selector: "img",
          attr: "alt",
          nonEmpty: true,
          label: { simple: "The picture has a name", standard: "The img has a non-empty alt" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "It goes inside the pointy brackets, after src.",
            standard: "Attributes live inside the opening tag, separated by spaces.",
          },
        },
        {
          level: 2,
          text: {
            simple: 'Add a space then alt="Aling Nena\'s store front" before the >',
            standard: 'Add `alt="Aling Nena\'s store front"` before the closing `>`.',
          },
        },
      ],
      xp: 60,
    }),
    s({
      id: "anchor",
      task: {
        simple: "Add a link to the map. A link uses <a> and needs an href.",
        standard: "Add an anchor element with an href attribute.",
      },
      inputMode: "guided",
      files: {
        "index.html": page(
          "    <h1>Aling Nena's Store</h1>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n      <li>Coffee</li>\n    </ul>\n    <img src=\"store.png\" alt=\"Store front\">\n    \n",
        ),
      },
      activeFile: "index.html",
      tests: [
        {
          id: "a-exists",
          kind: "exists",
          selector: "a",
          label: { simple: "There is a link", standard: "An a element exists" },
        },
        {
          id: "a-href",
          kind: "attr",
          selector: "a",
          attr: "href",
          nonEmpty: true,
          label: { simple: "The link points somewhere", standard: "The anchor has an href" },
        },
        {
          id: "a-text",
          kind: "text-not-empty",
          selector: "a",
          label: { simple: "The link has words", standard: "The anchor has text content" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "a means anchor. href is where it goes.",
            standard: "`<a href=\"...\">text</a>`",
          },
        },
        {
          level: 2,
          text: {
            simple: 'Try: <a href="https://example.com">Find us</a>',
            standard: '`<a href="https://example.com">Find us</a>`',
          },
        },
      ],
      xp: 60,
    }),
    s({
      id: "sectioning",
      task: {
        simple: "Wrap the title in a <header> so the page has clear parts.",
        standard: "Wrap the heading in a header element. Semantic tags describe meaning.",
      },
      inputMode: "guided",
      files: {
        "index.html": page(
          "    <h1>Aling Nena's Store</h1>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n    </ul>\n",
        ),
      },
      activeFile: "index.html",
      highlightToken: "<h1>",
      tests: [
        {
          id: "header-exists",
          kind: "exists",
          selector: "header",
          label: { simple: "The page has a header part", standard: "A header element exists" },
        },
        {
          id: "h1-in-header",
          kind: "exists",
          selector: "header h1",
          label: {
            simple: "The title is inside the header",
            standard: "The h1 is nested inside the header",
          },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Put <header> before the title and </header> after it.",
            standard: "Wrap the `h1`: `<header>` … `</header>`.",
          },
        },
      ],
      xp: 60,
    }),
    s({
      id: "form-input",
      task: {
        simple: "Add a form so people can send an order. Put one input inside it.",
        standard: "Add a form element containing a text input.",
      },
      inputMode: "guided",
      files: {
        "index.html": page(
          "    <header>\n      <h1>Aling Nena's Store</h1>\n    </header>\n    <h2>Order</h2>\n    \n",
        ),
      },
      activeFile: "index.html",
      tests: [
        {
          id: "form-exists",
          kind: "exists",
          selector: "form",
          label: { simple: "There is a form", standard: "A form element exists" },
        },
        {
          id: "input-exists",
          kind: "exists",
          selector: "form input",
          label: { simple: "The form has a box to type in", standard: "The form contains an input" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "A form holds the boxes people fill in.",
            standard: "`<form>` groups controls; `<input>` is one control.",
          },
        },
        {
          level: 2,
          text: {
            simple: 'Try: <form>\n  <input type="text">\n</form>',
            standard: '`<form><input type="text"></form>`',
          },
        },
      ],
      xp: 70,
    }),
    s({
      id: "label",
      task: {
        simple:
          "A box with no label is confusing. Add a <label> that says what to type.",
        standard:
          "Add a label for the input. Unlabelled inputs fail accessibility checks.",
      },
      inputMode: "guided",
      files: {
        "index.html": page(
          '    <h2>Order</h2>\n    <form>\n      \n      <input type="text" id="item">\n    </form>\n',
        ),
      },
      activeFile: "index.html",
      highlightToken: "<form>",
      tests: [
        {
          id: "label-exists",
          kind: "exists",
          selector: "label",
          label: { simple: "There is a label", standard: "A label element exists" },
        },
        {
          id: "label-for",
          kind: "attr-equals",
          selector: "label",
          attr: "for",
          value: "item",
          label: {
            simple: "The label points at the box",
            standard: "The label's for matches the input id",
          },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "The label's for must match the box's id. Both say item.",
            standard: "`label[for]` must equal the input's `id`.",
          },
        },
        {
          level: 2,
          text: {
            simple: 'Try: <label for="item">What do you need?</label>',
            standard: '`<label for="item">What do you need?</label>`',
          },
        },
      ],
      xp: 70,
    }),
    s({
      id: "button",
      task: {
        simple: "Add a button that says Send Order.",
        standard: "Add a submit button to the form.",
      },
      inputMode: "guided",
      files: {
        "index.html": page(
          '    <form>\n      <label for="item">What do you need?</label>\n      <input type="text" id="item">\n      \n    </form>\n',
        ),
      },
      activeFile: "index.html",
      tests: [
        {
          id: "button-exists",
          kind: "exists",
          selector: "form button",
          label: { simple: "The form has a button", standard: "The form contains a button" },
        },
        {
          id: "button-text",
          kind: "text-contains",
          selector: "button",
          value: "Send Order",
          label: { simple: "It says Send Order", standard: "The button reads Send Order" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Words go between <button> and </button>.",
            standard: "`<button>Send Order</button>`",
          },
        },
      ],
      xp: 70,
    }),
    s({
      id: "footer",
      task: {
        simple: "Add a <footer> at the bottom with the opening hours.",
        standard: "Add a footer element containing the opening hours.",
      },
      inputMode: "guided",
      files: {
        "index.html": page(
          '    <header>\n      <h1>Aling Nena\'s Store</h1>\n    </header>\n    <form>\n      <label for="item">What do you need?</label>\n      <input type="text" id="item">\n      <button>Send Order</button>\n    </form>\n    \n',
        ),
      },
      activeFile: "index.html",
      tests: [
        {
          id: "footer-exists",
          kind: "exists",
          selector: "footer",
          label: { simple: "The page has a bottom part", standard: "A footer element exists" },
        },
        {
          id: "footer-text",
          kind: "text-not-empty",
          selector: "footer",
          label: { simple: "The footer has words", standard: "The footer has text content" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Same shape as header, but at the bottom.",
            standard: "`<footer>Open 6am to 10pm daily</footer>`",
          },
        },
      ],
      xp: 100,
    }),
    s({
      id: "main-region",
      task: {
        simple: "Put the order heading and form inside a main part.",
        standard: "Wrap the order heading and form in a main element.",
      },
      inputMode: "guided",
      files: solved(ORDER_FOOTER_BODY),
      activeFile: "index.html",
      concepts: [
        {
          id: "main-element",
          term: "main",
          definition: {
            simple: "The main element holds the page's central content.",
            standard: "The main element identifies the primary content of a document.",
          },
          analogy: {
            simple: "A store has a sales area between its sign and closing notice. Main marks that working area.",
            standard: "It is like the sales floor between the storefront sign and the closing-hours notice.",
          },
          visual: {
            kind: "diagram",
            diagram: {
              alt: {
                simple: "The page has a header, a main part, and a footer in that order.",
                standard: "Document structure with header, main, and footer regions.",
              },
              columns: 1,
              nodes: [
                { id: "header", label: "Header", note: "Store name", tone: "ghost" },
                { id: "main", label: "Main", note: "Order form", tone: "accent" },
                { id: "footer", label: "Footer", note: "Opening hours", tone: "ghost" },
              ],
              arrows: [
                { from: "header", to: "main" },
                { from: "main", to: "footer" },
              ],
            },
          },
          proof: {
            simple: "You will move the order area into the page's main part.",
            standard: "You will place the order heading and form inside main.",
          },
        },
      ],
      tests: [
        {
          id: "main-exists",
          kind: "exists",
          selector: "main",
          label: { simple: "The page has a main part", standard: "A main element exists" },
        },
        {
          id: "form-in-main",
          kind: "exists",
          selector: "main form",
          label: {
            simple: "The order form is inside main",
            standard: "The form is nested inside main",
          },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "The new part starts after header and ends before footer.",
            standard: "The primary page content belongs between the header and footer.",
          },
        },
        {
          level: 2,
          text: {
            simple: "Put <main> before the h2 and </main> after the form.",
            standard: "Wrap the h2 and form with `<main>` and `</main>`.",
          },
        },
      ],
      xp: 80,
    }),
    s({
      id: "required-input",
      task: {
        simple: "Make the order box required before the form can send.",
        standard: "Add the required attribute to the order input.",
      },
      inputMode: "guided",
      files: solved(MAIN_BODY),
      activeFile: "index.html",
      concepts: [
        {
          id: "required-attribute",
          term: "required",
          definition: {
            simple: "Required tells the browser that a box cannot stay empty.",
            standard: "The required attribute blocks form submission when a control is empty.",
          },
          analogy: {
            simple: "It is like an order slip that must name an item before the clerk accepts it.",
            standard: "It works like a required line on an order slip: the clerk cannot accept a blank one.",
          },
          visual: {
            kind: "diagram",
            diagram: {
              alt: {
                simple: "An empty required box stops the form. A filled box can continue.",
                standard: "Required input validation blocks an empty value and accepts a filled value.",
              },
              columns: 2,
              nodes: [
                { id: "empty", label: "Empty box", note: "Stop", tone: "accent" },
                { id: "filled", label: "Item entered", note: "Continue", tone: "box" },
              ],
              arrows: [{ from: "empty", to: "filled" }],
            },
          },
          proof: {
            simple: "You will make the browser stop an empty order.",
            standard: "You will require a value before the form can submit.",
          },
        },
      ],
      tests: [
        {
          id: "input-required",
          kind: "source-matches",
          file: "index.html",
          pattern: "<input[^>]*\\brequired\\b[^>]*>",
          label: {
            simple: "The order box must be filled",
            standard: "The input has the required attribute",
          },
          because: {
            simple: "Add required inside the order input tag.",
            standard: "The order input needs the required Boolean attribute.",
          },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "This setting goes inside the input tag and needs no value.",
            standard: "This Boolean attribute belongs inside the input's opening tag.",
          },
        },
        {
          level: 2,
          text: {
            simple: "Add required before the final > in the input tag.",
            standard: "Use `<input type=\"text\" id=\"item\" required>`.",
          },
        },
      ],
      xp: 70,
    }),
    s({
      id: "input-name",
      task: {
        simple: "Give the order box the name item.",
        standard: "Add name=\"item\" to identify the input's submitted value.",
      },
      inputMode: "guided",
      files: solved(REQUIRED_BODY),
      activeFile: "index.html",
      concepts: [
        {
          id: "name-attribute",
          term: "name",
          definition: {
            simple: "A name tells the form what a box's answer is called.",
            standard: "The name attribute labels a control's value in submitted form data.",
          },
          analogy: {
            simple: "An order slip has Item beside a blank line. Name is that printed label.",
            standard: "It is the printed field name on an order slip, paired with the customer's answer.",
          },
          visual: {
            kind: "diagram",
            diagram: {
              alt: {
                simple: "The form pairs the name item with the value rice.",
                standard: "Submitted form data pairs the field name item with the value rice.",
              },
              columns: 2,
              nodes: [
                { id: "name", label: "Name", note: "item", tone: "accent" },
                { id: "value", label: "Answer", note: "rice", tone: "box" },
              ],
              arrows: [{ from: "name", to: "value", label: "paired with" }],
            },
          },
          proof: {
            simple: "You will give the order answer a name.",
            standard: "You will identify the input value as item.",
          },
        },
      ],
      tests: [
        {
          id: "input-name-item",
          kind: "attr-equals",
          selector: "form input",
          attr: "name",
          value: "item",
          label: {
            simple: "The order box is named item",
            standard: "The input name equals item",
          },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Add another setting inside the input tag.",
            standard: "The form field identifier belongs on the input element.",
          },
        },
        {
          level: 2,
          text: {
            simple: "Add name=\"item\" inside the input tag.",
            standard: "Add `name=\"item\"` before the input tag closes.",
          },
        },
      ],
      xp: 70,
    }),
    s({
      id: "submit-type",
      task: {
        simple: "Tell the button that it sends the form.",
        standard: "Set the button type to submit.",
      },
      inputMode: "guided",
      files: solved(NAMED_INPUT_BODY),
      activeFile: "index.html",
      tests: [
        {
          id: "button-submit-type",
          kind: "attr-equals",
          selector: "form button",
          attr: "type",
          value: "submit",
          label: {
            simple: "The button sends the form",
            standard: "The button type equals submit",
          },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Add a type setting inside the button's opening tag.",
            standard: "Button behavior is declared with its type attribute.",
          },
        },
        {
          level: 2,
          text: {
            simple: "Change the opening tag to <button type=\"submit\">.",
            standard: "Use `<button type=\"submit\">Send Order</button>`.",
          },
        },
      ],
      xp: 60,
    }),
    s({
      id: "fieldset",
      task: {
        simple: "Group the order controls inside a fieldset.",
        standard: "Wrap the form controls in a fieldset element.",
      },
      inputMode: "guided",
      files: solved(SUBMIT_TYPE_BODY),
      activeFile: "index.html",
      concepts: [
        {
          id: "fieldset-element",
          term: "fieldset",
          definition: {
            simple: "A fieldset keeps related form boxes and buttons together.",
            standard: "A fieldset groups related controls within a form.",
          },
          analogy: {
            simple: "It is like drawing one box around every line of an order slip.",
            standard: "It works like a border around one related section of a paper form.",
          },
          visual: {
            kind: "diagram",
            diagram: {
              alt: {
                simple: "One fieldset contains the label, order box, and send button.",
                standard: "A fieldset groups a label, input, and submit button.",
              },
              columns: 3,
              nodes: [
                { id: "label", label: "Label", tone: "box" },
                { id: "input", label: "Input", tone: "box" },
                { id: "button", label: "Button", tone: "box" },
                { id: "group", label: "Fieldset", note: "one group", tone: "accent" },
              ],
              arrows: [
                { from: "label", to: "group" },
                { from: "input", to: "group" },
                { from: "button", to: "group" },
              ],
            },
          },
          proof: {
            simple: "You will place all three order controls in one group.",
            standard: "You will group the order controls with fieldset.",
          },
        },
      ],
      tests: [
        {
          id: "fieldset-exists",
          kind: "exists",
          selector: "form fieldset",
          label: {
            simple: "The form has a group",
            standard: "The form contains a fieldset",
          },
        },
        {
          id: "input-in-fieldset",
          kind: "exists",
          selector: "fieldset input",
          label: {
            simple: "The order box is inside the group",
            standard: "The input is nested inside fieldset",
          },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "The group starts before the label and ends after the button.",
            standard: "The fieldset should contain every existing form control.",
          },
        },
        {
          level: 2,
          text: {
            simple: "Put <fieldset> before the label and </fieldset> after the button.",
            standard: "Wrap the label, input, and button with `<fieldset>` and `</fieldset>`.",
          },
        },
      ],
      xp: 80,
    }),
    s({
      id: "legend",
      task: {
        simple: "Name the group Order details with a legend.",
        standard: "Add a legend reading Order details inside the fieldset.",
      },
      inputMode: "guided",
      files: solved(FIELDSET_BODY),
      activeFile: "index.html",
      concepts: [
        {
          id: "legend-element",
          term: "legend",
          definition: {
            simple: "A legend gives a fieldset a short name.",
            standard: "A legend provides an accessible caption for a fieldset.",
          },
          analogy: {
            simple: "It is the title printed at the top of one part of an order slip.",
            standard: "It is like the heading printed on a boxed section of a paper form.",
          },
          visual: {
            kind: "diagram",
            diagram: {
              alt: {
                simple: "Order details appears as the name above the grouped form controls.",
                standard: "The legend Order details captions the fieldset and its controls.",
              },
              columns: 1,
              nodes: [
                { id: "legend", label: "Order details", note: "legend", tone: "accent" },
                { id: "group", label: "Order controls", note: "fieldset", tone: "box" },
              ],
              arrows: [{ from: "legend", to: "group", label: "names" }],
            },
          },
          proof: {
            simple: "You will give the order group a name people can see and hear.",
            standard: "You will label the fieldset with a visible, accessible legend.",
          },
        },
      ],
      tests: [
        {
          id: "legend-exists",
          kind: "exists",
          selector: "form fieldset legend",
          label: {
            simple: "The group has a name",
            standard: "The fieldset contains a legend",
          },
        },
        {
          id: "legend-text",
          kind: "text-contains",
          selector: "legend",
          value: "Order details",
          label: {
            simple: "The group is named Order details",
            standard: "The legend reads Order details",
          },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "The group's name goes first, before its label and box.",
            standard: "A fieldset caption belongs immediately after its opening tag.",
          },
        },
        {
          level: 2,
          text: {
            simple: "Add <legend>Order details</legend> after <fieldset>.",
            standard: "Place `<legend>Order details</legend>` first inside the fieldset.",
          },
        },
      ],
      xp: 80,
    }),
    s({
      id: "quantity-field",
      task: {
        simple: "Add a quantity box with a label that asks How many?",
        standard: "Add a labelled quantity input to the order form.",
      },
      inputMode: "guided",
      files: solved(LEGEND_BODY),
      activeFile: "index.html",
      tests: [
        {
          id: "quantity-input-exists",
          kind: "exists",
          selector: "fieldset input#quantity",
          label: {
            simple: "The order group has a quantity box",
            standard: "The fieldset contains the quantity input",
          },
        },
        {
          id: "quantity-label-exists",
          kind: "exists",
          selector: 'label[for="quantity"]',
          label: {
            simple: "The quantity box has a label",
            standard: "A label points to the quantity input",
          },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Add the new label and box before the send button.",
            standard: "Place the new label and input before the submit button.",
          },
        },
        {
          level: 2,
          text: {
            simple: "Use quantity for both the label's for and the box's id.",
            standard: "Pair `for=\"quantity\"` with `id=\"quantity\"` and add `name=\"quantity\"`.",
          },
        },
      ],
      xp: 70,
    }),
    s({
      id: "quantity-number",
      task: {
        simple: "Make the quantity box accept numbers.",
        standard: "Change the quantity input type to number.",
      },
      inputMode: "guided",
      files: solved(QUANTITY_BODY),
      activeFile: "index.html",
      concepts: [
        {
          id: "number-input",
          term: "number input",
          definition: {
            simple: "A number input is a box made for numbers.",
            standard: "An input with type number accepts numeric values and shows number controls.",
          },
          analogy: {
            simple: "A quantity line expects a count, not an item name.",
            standard: "It is like a quantity field on an order slip that expects a numeric count.",
          },
          visual: {
            kind: "diagram",
            diagram: {
              alt: {
                simple: "The quantity box accepts the number three.",
                standard: "A number input receives the numeric quantity 3.",
              },
              columns: 2,
              nodes: [
                { id: "value", label: "3", note: "number", tone: "accent" },
                { id: "input", label: "Quantity", note: "number input", tone: "box" },
              ],
              arrows: [{ from: "value", to: "input", label: "fits" }],
            },
          },
          proof: {
            simple: "You will make the quantity box expect a number.",
            standard: "You will set the quantity control to the number input type.",
          },
        },
      ],
      tests: [
        {
          id: "quantity-number-type",
          kind: "attr-equals",
          selector: "input#quantity",
          attr: "type",
          value: "number",
          label: {
            simple: "The quantity box accepts numbers",
            standard: "The quantity input type equals number",
          },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Change one setting inside the quantity input tag.",
            standard: "The input type controls which values the field expects.",
          },
        },
        {
          level: 2,
          text: {
            simple: "Change type=\"text\" to type=\"number\" on the quantity box.",
            standard: "Set the quantity input to `type=\"number\"`.",
          },
        },
      ],
      xp: 70,
    }),
    s({
      id: "quantity-minimum",
      task: {
        simple: "Set the smallest quantity to 1.",
        standard: "Set the quantity input's minimum value to 1.",
      },
      inputMode: "guided",
      files: solved(NUMBER_BODY),
      activeFile: "index.html",
      concepts: [
        {
          id: "min-attribute",
          term: "min",
          definition: {
            simple: "Min sets the smallest number a box accepts.",
            standard: "The min attribute sets the lowest valid value for a numeric input.",
          },
          analogy: {
            simple: "An order needs at least one item. Zero is too small.",
            standard: "It works like a store rule that an order must contain at least one item.",
          },
          visual: {
            kind: "diagram",
            diagram: {
              alt: {
                simple: "Zero stops, while one can continue.",
                standard: "A minimum of 1 rejects 0 and accepts 1.",
              },
              columns: 2,
              nodes: [
                { id: "zero", label: "0", note: "too small", tone: "accent" },
                { id: "one", label: "1", note: "minimum", tone: "box" },
              ],
              arrows: [{ from: "zero", to: "one", label: "start here" }],
            },
          },
          proof: {
            simple: "You will stop quantities smaller than one.",
            standard: "You will set 1 as the lowest valid quantity.",
          },
        },
      ],
      tests: [
        {
          id: "quantity-minimum-one",
          kind: "attr-equals",
          selector: "input#quantity",
          attr: "min",
          value: "1",
          label: {
            simple: "The smallest quantity is 1",
            standard: "The quantity minimum equals 1",
          },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Add a setting for the lowest allowed number.",
            standard: "Numeric inputs use an attribute to declare their lowest valid value.",
          },
        },
        {
          level: 2,
          text: {
            simple: "Add min=\"1\" inside the quantity input tag.",
            standard: "Add `min=\"1\"` to the quantity input.",
          },
        },
      ],
      xp: 70,
    }),
    s({
      id: "pickup-select",
      task: {
        simple: "Add a pickup-time menu with a label.",
        standard: "Add a labelled select menu for the pickup time.",
      },
      inputMode: "guided",
      files: solved(MINIMUM_BODY),
      activeFile: "index.html",
      concepts: [
        {
          id: "select-element",
          term: "select",
          definition: {
            simple: "A select shows a menu of choices.",
            standard: "A select element lets someone choose one value from a menu.",
          },
          analogy: {
            simple: "A store sign lists pickup times. You choose one.",
            standard: "It is like choosing one pickup window from a short store schedule.",
          },
          visual: {
            kind: "diagram",
            diagram: {
              alt: {
                simple: "The Pickup time label names its menu.",
                standard: "A label identifies the pickup-time select menu.",
              },
              columns: 2,
              nodes: [
                { id: "label", label: "Pickup time", note: "label", tone: "accent" },
                { id: "select", label: "Choose", note: "select", tone: "box" },
              ],
              arrows: [{ from: "label", to: "select", label: "names" }],
            },
          },
          proof: {
            simple: "You will add a menu for the pickup time.",
            standard: "You will add and label the pickup-time select control.",
          },
        },
      ],
      tests: [
        {
          id: "pickup-select-exists",
          kind: "exists",
          selector: "select#pickup",
          label: {
            simple: "The form has a pickup menu",
            standard: "The pickup select exists",
          },
        },
        {
          id: "pickup-label-exists",
          kind: "exists",
          selector: 'label[for="pickup"]',
          label: {
            simple: "The pickup menu has a label",
            standard: "A label points to the pickup select",
          },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Add the menu after the quantity box and before the button.",
            standard: "Place the labelled menu after the quantity input.",
          },
        },
        {
          level: 2,
          text: {
            simple: "Pair for=\"pickup\" with a select that has id=\"pickup\".",
            standard: "Use a label for pickup and `<select id=\"pickup\" name=\"pickup\"></select>`.",
          },
        },
      ],
      xp: 80,
    }),
    s({
      id: "pickup-options",
      task: {
        simple: "Give the pickup menu three time choices.",
        standard: "Add Morning, Afternoon, and Evening options to the pickup menu.",
      },
      inputMode: "guided",
      files: solved(PICKUP_SELECT_BODY),
      activeFile: "index.html",
      concepts: [
        {
          id: "option-element",
          term: "option",
          definition: {
            simple: "An option is one choice inside a select menu.",
            standard: "Each option element defines one choice within a select menu.",
          },
          analogy: {
            simple: "Each pickup time is one line on a small menu.",
            standard: "Each option is like one available time printed on the store schedule.",
          },
          visual: {
            kind: "diagram",
            diagram: {
              alt: {
                simple: "The pickup menu contains three time choices.",
                standard: "The select menu contains Morning, Afternoon, and Evening options.",
              },
              columns: 3,
              nodes: [
                { id: "morning", label: "Morning", tone: "box" },
                { id: "afternoon", label: "Afternoon", tone: "accent" },
                { id: "evening", label: "Evening", tone: "box" },
                { id: "menu", label: "Pickup menu", note: "select", tone: "ghost" },
              ],
              arrows: [
                { from: "morning", to: "menu" },
                { from: "afternoon", to: "menu" },
                { from: "evening", to: "menu" },
              ],
            },
          },
          proof: {
            simple: "You will put three times inside the pickup menu.",
            standard: "You will add three option elements to the pickup select.",
          },
        },
      ],
      tests: [
        {
          id: "pickup-has-three-options",
          kind: "count",
          selector: "select#pickup option",
          atLeast: 3,
          label: {
            simple: "The pickup menu has three choices",
            standard: "The pickup select contains at least three options",
          },
        },
        {
          id: "pickup-has-morning",
          kind: "text-contains",
          selector: "select#pickup",
          value: "Morning",
          label: {
            simple: "Morning is a pickup choice",
            standard: "The pickup select includes Morning",
          },
        },
        {
          id: "pickup-has-afternoon",
          kind: "text-contains",
          selector: "select#pickup",
          value: "Afternoon",
          label: {
            simple: "Afternoon is a pickup choice",
            standard: "The pickup select includes Afternoon",
          },
        },
        {
          id: "pickup-has-evening",
          kind: "text-contains",
          selector: "select#pickup",
          value: "Evening",
          label: {
            simple: "Evening is a pickup choice",
            standard: "The pickup select includes Evening",
          },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Each choice goes inside the pickup menu.",
            standard: "Place each time choice between the select tags.",
          },
        },
        {
          level: 2,
          text: {
            simple: "Wrap each time in its own <option> and </option> tags.",
            standard: "Add one option each for Morning, Afternoon, and Evening.",
          },
        },
      ],
      xp: 80,
    }),
    s({
      id: "order-notes",
      task: {
        simple: "Add a larger box for order notes.",
        standard: "Add a labelled textarea for order notes.",
      },
      inputMode: "guided",
      files: solved(PICKUP_OPTIONS_BODY),
      activeFile: "index.html",
      concepts: [
        {
          id: "textarea-element",
          term: "textarea",
          definition: {
            simple: "A textarea is a larger box for longer writing.",
            standard: "A textarea is a multi-line form control for longer text.",
          },
          analogy: {
            simple: "It is the notes space at the bottom of an order slip.",
            standard: "It works like the open notes area on a paper order form.",
          },
          visual: {
            kind: "diagram",
            diagram: {
              alt: {
                simple: "The Order notes label names a larger writing box.",
                standard: "A label identifies the multi-line order notes textarea.",
              },
              columns: 2,
              nodes: [
                { id: "label", label: "Order notes", note: "label", tone: "accent" },
                { id: "textarea", label: "Leave at gate", note: "textarea", tone: "box" },
              ],
              arrows: [{ from: "label", to: "textarea", label: "names" }],
            },
          },
          proof: {
            simple: "You will add room for a longer order note.",
            standard: "You will add and label a textarea for order notes.",
          },
        },
      ],
      tests: [
        {
          id: "notes-textarea-exists",
          kind: "exists",
          selector: "textarea#notes",
          label: {
            simple: "The form has an order notes box",
            standard: "The order notes textarea exists",
          },
        },
        {
          id: "notes-label-exists",
          kind: "exists",
          selector: 'label[for="notes"]',
          label: {
            simple: "The notes box has a label",
            standard: "A label points to the notes textarea",
          },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Add the notes label and box before the send button.",
            standard: "Place the labelled notes control before the submit button.",
          },
        },
        {
          level: 2,
          text: {
            simple: "Pair for=\"notes\" with <textarea id=\"notes\" name=\"notes\"></textarea>.",
            standard: "Add a notes label and `<textarea id=\"notes\" name=\"notes\"></textarea>`.",
          },
        },
      ],
      xp: 80,
    }),
  ],
};
