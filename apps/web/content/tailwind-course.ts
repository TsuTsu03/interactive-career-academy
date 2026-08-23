import type { Course, Step } from "@/lib/lesson-ir";

/**
 * Course 4 — Learn Tailwind CSS by Building a Turo-Turo Menu Card.
 *
 * Tailwind is CSS the learner already knows, spelled as class names instead
 * of rules. Each step's `styles.css` is readonly and contains only the exact
 * utility rules that step teaches, hand-written to match real Tailwind v4
 * values. This is deliberately NOT a general-purpose Tailwind runtime: no
 * change to lib/grading.ts or the sandbox model was needed, because the
 * "compiled" CSS a real Tailwind build would produce is just... CSS, and
 * `buildDocument` already renders `files["styles.css"]` verbatim. See
 * AGENTS.md section 1.1 — this course does not touch the guarded files.
 *
 * `hover:` and other state-variant classes cannot be observed by the static
 * grading frame (no real pointer event fires there), so those steps use
 * `source-matches` on the class name itself, the same technique the CSS
 * course already uses for `:hover`.
 */

let n = 0;

/**
 * Real Tailwind ships a Preflight reset that removes the browser's default
 * heading weight, so utility classes are the only source of styling. Without
 * it, a bare <h1> already renders bold via the user-agent stylesheet, and the
 * font-weight step's test passes before the learner does anything — a real
 * bug the authoring harness caught. Only steps 1 and 2 need this: from step 3
 * onward the h1 always carries font-bold in the narrative, which sets 700
 * unconditionally regardless of any reset.
 */
const H1_RESET = "h1 {\n  font-weight: 400;\n}\n\n";

const references = {
  "utility-class": {
    estimatedMinutes: 5,
    solution: {
      "index.html": '<h1 class="text-2xl">Turo-Turo Menu</h1>',
      "styles.css": H1_RESET + ".text-2xl {\n  font-size: 1.5rem;\n}",
    },
  },
  "font-weight": {
    estimatedMinutes: 4,
    solution: {
      "index.html": '<h1 class="text-2xl font-bold">Turo-Turo Menu</h1>',
      "styles.css":
        H1_RESET + ".text-2xl {\n  font-size: 1.5rem;\n}\n\n.font-bold {\n  font-weight: 700;\n}",
    },
  },
  color: {
    estimatedMinutes: 4,
    solution: {
      "index.html": '<h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>',
      "styles.css":
        ".text-2xl {\n  font-size: 1.5rem;\n}\n\n.font-bold {\n  font-weight: 700;\n}\n\n.text-orange-600 {\n  color: #ea580c;\n}",
    },
  },
  spacing: {
    estimatedMinutes: 5,
    solution: {
      "index.html":
        '<div class="p-4">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n</div>',
      "styles.css": ".p-4 {\n  padding: 1rem;\n}",
    },
  },
  rounded: {
    estimatedMinutes: 4,
    solution: {
      "index.html":
        '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n</div>',
      "styles.css": ".rounded-lg {\n  border-radius: 0.5rem;\n}\n\n.bg-white {\n  background-color: #ffffff;\n}",
    },
  },
  "menu-item": {
    estimatedMinutes: 5,
    solution: {
      "index.html":
        '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n  <div class="flex">\n    <p>Adobo Rice</p>\n    <p>75</p>\n  </div>\n</div>',
      "styles.css": ".flex {\n  display: flex;\n}",
    },
  },
  "justify-between": {
    estimatedMinutes: 6,
    solution: {
      "index.html":
        '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n  <div class="flex justify-between">\n    <p>Adobo Rice</p>\n    <p>75</p>\n  </div>\n</div>',
      "styles.css":
        ".flex {\n  display: flex;\n}\n\n.justify-between {\n  justify-content: space-between;\n}",
    },
  },
  gap: {
    estimatedMinutes: 5,
    solution: {
      "index.html":
        '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n  <div class="flex flex-col gap-3">\n    <div class="flex justify-between">\n      <p>Adobo Rice</p>\n      <p>75</p>\n    </div>\n    <div class="flex justify-between">\n      <p>Pancit Bihon</p>\n      <p>65</p>\n    </div>\n  </div>\n</div>',
      "styles.css":
        ".flex {\n  display: flex;\n}\n\n.flex-col {\n  flex-direction: column;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.gap-3 {\n  gap: 0.75rem;\n}",
    },
  },
  "hover-state": {
    estimatedMinutes: 6,
    solution: {
      "index.html":
        '<div class="p-4 rounded-lg bg-white">\n  <div class="flex justify-between hover:bg-orange-50">\n    <p>Adobo Rice</p>\n    <p>75</p>\n  </div>\n</div>',
      "styles.css":
        ".flex {\n  display: flex;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.hover\\:bg-orange-50:hover {\n  background-color: #fff7ed;\n}",
    },
  },
  "max-width": {
    estimatedMinutes: 4,
    solution: {
      "index.html":
        '<div class="max-w-sm p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n</div>',
      "styles.css": ".max-w-sm {\n  max-width: 24rem;\n}",
    },
  },
  caption: {
    estimatedMinutes: 4,
    solution: {
      "index.html":
        '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n  <p class="text-sm text-gray-500">Open 10am to 8pm</p>\n</div>',
      "styles.css":
        ".text-sm {\n  font-size: 0.875rem;\n}\n\n.text-gray-500 {\n  color: #6b7280;\n}",
    },
  },
  finish: {
    estimatedMinutes: 6,
    solution: {
      "index.html":
        '<div class="max-w-sm rounded-2xl shadow-lg bg-white p-6">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n  <p class="text-sm text-gray-500">Open 10am to 8pm</p>\n</div>',
      "styles.css":
        ".max-w-sm {\n  max-width: 24rem;\n}\n\n.rounded-2xl {\n  border-radius: 1rem;\n}\n\n.bg-white {\n  background-color: #ffffff;\n}\n\n.p-6 {\n  padding: 1.5rem;\n}",
    },
  },
} satisfies Record<string, { estimatedMinutes: number; solution: Record<string, string> }>;

const s = (step: Omit<Step, "index" | "kind">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for Tailwind step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web" };
};

export const tailwindCourse: Course = {
  id: "tailwind-basics",
  order: 4,
  title: "Learn Tailwind CSS by Building a Turo-Turo Menu Card",
  project: "Turo-Turo Menu Card",
  kind: "web",
  requires: ["css-basics"],
  summary: {
    simple:
      "You already know CSS. Now learn to write it as short class names instead of rules.",
    standard:
      "Utility-first CSS. The same properties you already know, applied through composable class names.",
  },
  steps: [
    s({
      id: "utility-class",
      task: {
        simple: "Make the title big. Add the class text-2xl to the h1.",
        standard: "Apply the text-2xl utility class to the heading.",
      },
      inputMode: "tap-to-build",
      files: {
        // Blank at the slot: placeBlock only fills a blank line, and inserts
        // below a non-blank one (AGENTS.md rule 1.5). Starting with real
        // content here would leave two <h1> elements after tapping.
        "index.html": "",
        "styles.css": H1_RESET + ".text-2xl {\n  font-size: 1.5rem;\n}",
      },
      activeFile: "index.html",
      slotLine: 1,
      blocks: [
        '<h1 class="text-2xl">Turo-Turo Menu</h1>',
        '<h1 id="text-2xl">Turo-Turo Menu</h1>',
        "<h1>Turo-Turo Menu</h1>",
        '<h1 style="text-2xl">Turo-Turo Menu</h1>',
      ],
      correctBlock: '<h1 class="text-2xl">Turo-Turo Menu</h1>',
      concepts: [
        {
          id: "utility-class",
          term: "utility class",
          definition: {
            simple:
              "A utility class is a class name that already has one job built in. Add text-2xl and the browser already knows to make the text big. You do not write a CSS rule yourself.",
            standard:
              "A utility class is a pre-defined class whose CSS rule already exists in the stylesheet. Applying it does the styling; you never write the rule.",
          },
          analogy: {
            simple:
              "Like ordering by number at a carinderia. You do not describe the dish, you say '5', and the cook already knows exactly what that means.",
            standard:
              "Like a menu numbered by item: naming the number invokes the whole prepared recipe, rather than describing the dish from scratch.",
          },
          visual: {
            kind: "diagram",
            diagram: {
              alt: {
                simple: "Two ways to make text big: your own rule, or one ready-made class.",
                standard: "Custom rule versus utility class, same resulting style.",
              },
              columns: 2,
              nodes: [
                { id: "custom", label: "Your own rule", note: "h1 { font-size: 24px; }", tone: "ghost" },
                { id: "utility", label: "Ready-made class", note: "text-2xl", tone: "accent" },
              ],
              arrows: [],
            },
          },
          proof: {
            simple: "Add text-2xl and watch the title grow, with no rule of your own.",
            standard: "You will apply text-2xl and see the computed font-size change.",
          },
        },
      ],
      tests: [
        {
          id: "h1-2xl",
          kind: "style",
          selector: "h1",
          prop: "font-size",
          equals: "24px",
          readable: "24 pixels",
          label: { simple: "The title is big", standard: "h1 font-size is 24px" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Tap the block with class=\"text-2xl\" in it.",
            standard: "Select the block that adds the text-2xl class.",
          },
        },
      ],
      xp: 40,
    }),
    s({
      id: "font-weight",
      task: {
        simple: "Make the title bold. Add font-bold, right after text-2xl.",
        standard: "Add the font-bold utility alongside text-2xl.",
      },
      inputMode: "guided",
      files: {
        "index.html": '<h1 class="text-2xl">Turo-Turo Menu</h1>',
        "styles.css":
          H1_RESET + ".text-2xl {\n  font-size: 1.5rem;\n}\n\n.font-bold {\n  font-weight: 700;\n}",
      },
      activeFile: "index.html",
      highlightToken: "text-2xl",
      tests: [
        {
          id: "h1-bold",
          kind: "style",
          selector: "h1",
          prop: "font-weight",
          equals: "700",
          readable: "bold",
          label: { simple: "The title is bold", standard: "h1 font-weight is 700" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Two classes can sit in the same quotes, with a space between.",
            standard: 'Multiple utilities separate by a space: class="text-2xl font-bold".',
          },
        },
      ],
      xp: 40,
    }),
    s({
      id: "color",
      task: {
        simple: "Make the title orange. Add text-orange-600.",
        standard: "Add the text-orange-600 colour utility.",
      },
      inputMode: "guided",
      files: {
        "index.html": '<h1 class="text-2xl font-bold">Turo-Turo Menu</h1>',
        "styles.css":
          ".text-2xl {\n  font-size: 1.5rem;\n}\n\n.font-bold {\n  font-weight: 700;\n}\n\n.text-orange-600 {\n  color: #ea580c;\n}",
      },
      activeFile: "index.html",
      highlightToken: "font-bold",
      tests: [
        {
          id: "h1-orange",
          kind: "style",
          selector: "h1",
          prop: "color",
          equals: "rgb(234, 88, 12)",
          readable: "orange",
          label: { simple: "The title is orange", standard: "h1 colour is orange-600" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Tailwind colour classes end in a number. 600 is a medium-strong shade.",
            standard: "Tailwind colour scales run 50 (lightest) to 950 (darkest).",
          },
        },
      ],
      xp: 40,
    }),
    s({
      id: "spacing",
      task: {
        simple: "Wrap everything in a div with p-4, so there is room around the edges.",
        standard: "Wrap the heading in a div carrying the p-4 padding utility.",
      },
      inputMode: "guided",
      files: {
        "index.html": '<h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>',
        "styles.css": ".p-4 {\n  padding: 1rem;\n}",
      },
      activeFile: "index.html",
      tests: [
        {
          id: "wrap-padding",
          kind: "style",
          selector: ".p-4",
          prop: "padding-top",
          equals: "16px",
          readable: "16 pixels",
          label: { simple: "There is space around everything", standard: ".p-4 padding is 16px" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: 'Try: <div class="p-4"> ... </div>',
            standard: "p is padding, and Tailwind's numbers are steps of 0.25rem: 4 means 1rem.",
          },
        },
      ],
      xp: 50,
    }),
    s({
      id: "rounded",
      task: {
        simple: "Give the wrapper a white background and round corners. Add bg-white rounded-lg.",
        standard: "Add bg-white and rounded-lg to the wrapper div.",
      },
      inputMode: "guided",
      files: {
        "index.html":
          '<div class="p-4">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n</div>',
        "styles.css":
          ".p-4 {\n  padding: 1rem;\n}\n\n.rounded-lg {\n  border-radius: 0.5rem;\n}\n\n.bg-white {\n  background-color: #ffffff;\n}",
      },
      activeFile: "index.html",
      highlightToken: 'class="p-4"',
      tests: [
        {
          id: "wrap-white",
          kind: "style",
          selector: ".p-4",
          prop: "background-color",
          equals: "rgb(255, 255, 255)",
          readable: "white",
          label: { simple: "The card is white", standard: "wrapper background is white" },
        },
        {
          id: "wrap-rounded",
          kind: "style",
          selector: ".p-4",
          prop: "border-radius",
          equals: "8px",
          readable: "8 pixels",
          label: { simple: "The corners are round", standard: "wrapper border-radius is 8px" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: 'class="p-4 bg-white rounded-lg", all in one string.',
            standard: "Order inside the class attribute never matters.",
          },
        },
      ],
      xp: 50,
    }),
    s({
      id: "menu-item",
      task: {
        simple: "Add a name and a price below the title, each on its own line.",
        standard: "Add a menu item row with a name and a price paragraph.",
      },
      inputMode: "guided",
      files: {
        "index.html":
          '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n</div>',
        "styles.css": ".flex {\n  display: flex;\n}",
      },
      activeFile: "index.html",
      highlightToken: "</h1>",
      tests: [
        {
          id: "has-two-p",
          kind: "count",
          selector: "p",
          atLeast: 2,
          label: { simple: "There is a name and a price", standard: "Two paragraphs exist" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Add <p>Adobo Rice</p> and <p>75</p> after the title.",
            standard: "Two sibling <p> elements are enough for this step.",
          },
        },
      ],
      xp: 40,
    }),
    s({
      id: "justify-between",
      task: {
        simple:
          "Put the name on the left and the price on the right. Wrap them in a div with flex justify-between.",
        standard: "Wrap the pair in a flex container using justify-between.",
      },
      inputMode: "guided",
      files: {
        "index.html":
          '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n  <p>Adobo Rice</p>\n  <p>75</p>\n</div>',
        "styles.css":
          ".flex {\n  display: flex;\n}\n\n.justify-between {\n  justify-content: space-between;\n}",
      },
      activeFile: "index.html",
      concepts: [
        {
          id: "justify-between",
          term: "justify-between",
          definition: {
            simple:
              "justify-between pushes the first thing to the start and the last thing to the end, with space in the middle.",
            standard:
              "justify-content: space-between distributes flex children with equal space between them, none at the outer edges.",
          },
          analogy: {
            simple:
              "Like two people sitting at opposite ends of a long bench. Whatever bench, however long, one sits at each end.",
            standard:
              "Like guests seated at opposite ends of a table regardless of the table's length: the ends anchor, the middle stretches.",
          },
          visual: {
            kind: "live-demo",
            files: {
              "index.html":
                '<div style="display:flex;justify-content:space-between;border:1px dashed #999;padding:8px;">\n  <span>Adobo Rice</span>\n  <span>75</span>\n</div>',
              "styles.css": "",
            },
            caption: {
              simple: "The name sits at the left edge, the price at the right, no matter the gap.",
              standard: "justify-content: space-between in action.",
            },
          },
          proof: {
            simple: "You are about to put a name and a price on opposite ends of one row.",
            standard: "You will apply flex and justify-between to a two-child container.",
          },
        },
      ],
      tests: [
        {
          id: "row-flex",
          kind: "style",
          selector: ".justify-between",
          prop: "display",
          equals: "flex",
          readable: "flex",
          label: { simple: "The row is side by side", standard: "Row display is flex" },
        },
        {
          id: "row-between",
          kind: "style",
          selector: ".justify-between",
          prop: "justify-content",
          equals: "space-between",
          readable: "space-between",
          label: { simple: "Name and price are pushed apart", standard: "justify-content is space-between" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: 'Wrap both <p> tags: <div class="flex justify-between"> ... </div>',
            standard: "Both utilities go on the same wrapping div.",
          },
        },
      ],
      xp: 60,
    }),
    s({
      id: "gap",
      task: {
        simple:
          "Add a second menu item the same way. Wrap both rows in a div with flex flex-col gap-3.",
        standard: "Stack a second row and wrap both in a flex-col container with gap-3.",
      },
      inputMode: "guided",
      files: {
        "index.html":
          '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n  <div class="flex justify-between">\n    <p>Adobo Rice</p>\n    <p>75</p>\n  </div>\n</div>',
        "styles.css":
          ".flex {\n  display: flex;\n}\n\n.flex-col {\n  flex-direction: column;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.gap-3 {\n  gap: 0.75rem;\n}",
      },
      activeFile: "index.html",
      tests: [
        {
          id: "two-rows",
          kind: "count",
          selector: ".justify-between",
          atLeast: 2,
          label: { simple: "There are two menu rows", standard: "Two justify-between rows exist" },
        },
        {
          id: "stack-gap",
          kind: "style",
          selector: ".gap-3",
          prop: "gap",
          equals: "12px",
          readable: "12 pixels",
          label: { simple: "The rows have space between them", standard: "Stack gap is 12px" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "The new wrapper goes around both rows, not inside either one.",
            standard: 'Outer div: class="flex flex-col gap-3", containing the two row divs.',
          },
        },
      ],
      xp: 60,
    }),
    s({
      id: "hover-state",
      task: {
        simple:
          "Make a menu row light up when the mouse is over it. Add hover:bg-orange-50 to one row's classes.",
        standard: "Add the hover:bg-orange-50 state variant to one menu row.",
      },
      inputMode: "guided",
      files: {
        "index.html":
          '<div class="p-4 rounded-lg bg-white">\n  <div class="flex justify-between">\n    <p>Adobo Rice</p>\n    <p>75</p>\n  </div>\n</div>',
        "styles.css":
          ".flex {\n  display: flex;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.hover\\:bg-orange-50:hover {\n  background-color: #fff7ed;\n}",
      },
      activeFile: "index.html",
      highlightToken: "justify-between",
      concepts: [
        {
          id: "state-variant",
          term: "state variant",
          definition: {
            simple:
              "A word before a colon that means 'only when.' hover:bg-orange-50 means: turn the background orange only while the mouse is over it.",
            standard:
              "A state variant prefixes a utility with a condition, applying that utility's rule only while the condition holds.",
          },
          analogy: {
            simple:
              "Like a motion-sensor light. It does nothing until someone walks near, then switches on by itself.",
            standard:
              "Like a motion-activated light: the fixture is always there, but the circuit only closes under one condition.",
          },
          visual: {
            kind: "diagram",
            diagram: {
              alt: {
                simple: "hover: in front of a class name means the class only applies on hover.",
                standard: "Anatomy of a state variant: prefix, colon, utility.",
              },
              columns: 3,
              nodes: [
                { id: "prefix", label: "Condition", note: "hover:", tone: "accent" },
                { id: "colon", label: "Separator", note: ":", tone: "ghost" },
                { id: "utility", label: "Utility", note: "bg-orange-50", tone: "box" },
              ],
              arrows: [
                { from: "prefix", to: "colon" },
                { from: "colon", to: "utility" },
              ],
            },
          },
          proof: {
            simple: "You are about to make a row change colour only while the mouse sits on it.",
            standard: "You will add a hover: variant and confirm it compiles to a :hover rule.",
          },
        },
      ],
      tests: [
        {
          id: "has-hover-class",
          kind: "source-matches",
          file: "index.html",
          pattern: "hover:bg-orange-50",
          because: {
            simple: "The class hover:bg-orange-50 needs to be on one of the rows.",
            standard: "Expected the literal class hover:bg-orange-50 in the markup.",
          },
          label: { simple: "A row reacts to the mouse", standard: "hover:bg-orange-50 is present" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "The hover word goes right inside the same quotes as the other classes.",
            standard: "State variants live in the same class attribute as the base utilities.",
          },
        },
        {
          level: 2,
          text: {
            simple: 'Add it after the others: class="flex justify-between hover:bg-orange-50"',
            standard: 'class="flex justify-between hover:bg-orange-50"',
          },
        },
      ],
      xp: 60,
    }),
    s({
      id: "max-width",
      task: {
        simple: "Stop the card stretching too wide. Add max-w-sm to the outer wrapper.",
        standard: "Add max-w-sm to the outer wrapper div.",
      },
      inputMode: "guided",
      files: {
        "index.html":
          '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n</div>',
        "styles.css": ".max-w-sm {\n  max-width: 24rem;\n}",
      },
      activeFile: "index.html",
      highlightToken: 'class="p-4',
      tests: [
        {
          id: "wrap-maxw",
          kind: "style",
          selector: ".max-w-sm",
          prop: "max-width",
          equals: "384px",
          readable: "384 pixels",
          label: { simple: "The card is not too wide", standard: "wrapper max-width is 384px" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "sm is one size in Tailwind's width scale: xs, sm, md, lg, and up.",
            standard: "Tailwind's max-width scale runs xs through 7xl.",
          },
        },
      ],
      xp: 50,
    }),
    s({
      id: "caption",
      task: {
        simple: "Add a small grey line under the title saying when you are open.",
        standard: "Add a caption paragraph styled text-sm text-gray-500.",
      },
      inputMode: "guided",
      files: {
        "index.html":
          '<div class="p-4 rounded-lg bg-white">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n</div>',
        "styles.css":
          ".text-sm {\n  font-size: 0.875rem;\n}\n\n.text-gray-500 {\n  color: #6b7280;\n}",
      },
      activeFile: "index.html",
      highlightToken: "</h1>",
      tests: [
        {
          id: "caption-small",
          kind: "style",
          selector: ".text-sm",
          prop: "font-size",
          equals: "14px",
          readable: "14 pixels",
          label: { simple: "The line is small", standard: "caption font-size is 14px" },
        },
        {
          id: "caption-grey",
          kind: "style",
          selector: ".text-sm",
          prop: "color",
          equals: "rgb(107, 114, 128)",
          readable: "grey",
          label: { simple: "The line is grey", standard: "caption colour is grey" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: 'Try: <p class="text-sm text-gray-500">Open 10am to 8pm</p>',
            standard: "Both utilities can sit on the same element.",
          },
        },
      ],
      xp: 50,
    }),
    s({
      id: "finish",
      task: {
        simple:
          "Last one. Give the outer wrapper a bigger shadow and rounder corners: rounded-2xl shadow-lg p-6.",
        standard: "Upgrade the wrapper to rounded-2xl, shadow-lg, and p-6.",
      },
      inputMode: "guided",
      files: {
        "index.html":
          '<div class="max-w-sm rounded-lg bg-white p-4">\n  <h1 class="text-2xl font-bold text-orange-600">Turo-Turo Menu</h1>\n  <p class="text-sm text-gray-500">Open 10am to 8pm</p>\n</div>',
        "styles.css":
          ".max-w-sm {\n  max-width: 24rem;\n}\n\n.rounded-2xl {\n  border-radius: 1rem;\n}\n\n.bg-white {\n  background-color: #ffffff;\n}\n\n.p-6 {\n  padding: 1.5rem;\n}",
      },
      activeFile: "index.html",
      highlightToken: "rounded-lg bg-white p-4",
      tests: [
        {
          id: "final-rounded",
          kind: "style",
          selector: ".max-w-sm",
          prop: "border-radius",
          equals: "16px",
          readable: "16 pixels",
          label: { simple: "The corners are rounder now", standard: "wrapper border-radius is 16px" },
        },
        {
          id: "final-padding",
          kind: "style",
          selector: ".max-w-sm",
          prop: "padding-top",
          equals: "24px",
          readable: "24 pixels",
          label: { simple: "There is more room inside", standard: "wrapper padding is 24px" },
        },
        {
          id: "final-shadow",
          kind: "source-matches",
          file: "index.html",
          pattern: "shadow-lg",
          because: {
            simple: "The class shadow-lg needs to be on the wrapper.",
            standard: "Expected the literal class shadow-lg in the markup.",
          },
          label: { simple: "The card lifts off the page", standard: "shadow-lg is present" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Replace rounded-lg with rounded-2xl, and p-4 with p-6, then add shadow-lg.",
            standard: "rounded-2xl, p-6, and shadow-lg all replace or extend the existing utilities.",
          },
        },
      ],
      xp: 100,
    }),
  ],
};
