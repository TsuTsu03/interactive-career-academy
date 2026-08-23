import type { Course, Step } from "@/lib/lesson-ir";

/** Course 2 — Learn CSS by Building a Jeepney Route Card. */

let n = 0;

const HTML = `<div class="card">
  <h1 class="route">Cubao to Katipunan</h1>
  <p class="fare">Fare: 13 pesos</p>
  <ul class="stops">
    <li>Aurora Boulevard</li>
    <li>Anonas</li>
    <li>Katipunan</li>
  </ul>
</div>`;

const css = (body: string) => body;

interface StepReference {
  estimatedMinutes: number;
  solution: Record<string, string>;
}

const solved = (styles: string): Record<string, string> => ({
  "index.html": HTML,
  "styles.css": css(styles),
});

/** Authored proof for every step. Missing entries stop the course from loading. */
const references = {
  "first-rule": {
    estimatedMinutes: 5,
    solution: solved("body {\n  background-color: #f4f4f5;\n}"),
  },
  "class-selector": {
    estimatedMinutes: 5,
    solution: solved(
      "body {\n  background-color: #f4f4f5;\n}\n\n.card {\n  background-color: white;\n}",
    ),
  },
  padding: {
    estimatedMinutes: 4,
    solution: solved(
      "body {\n  background-color: #f4f4f5;\n}\n\n.card {\n  background-color: white;\n  padding: 24px;\n}",
    ),
  },
  "radius-shadow": {
    estimatedMinutes: 4,
    solution: solved(
      "body {\n  background-color: #f4f4f5;\n}\n\n.card {\n  background-color: white;\n  padding: 24px;\n  border-radius: 12px;\n}",
    ),
  },
  "font-size": {
    estimatedMinutes: 4,
    solution: solved(
      ".card {\n  background-color: white;\n  padding: 24px;\n  border-radius: 12px;\n}\n\n.route {\n  font-size: 32px;\n}",
    ),
  },
  colour: {
    estimatedMinutes: 4,
    solution: solved(
      ".card {\n  background-color: white;\n  padding: 24px;\n}\n\n.route {\n  font-size: 32px;\n}\n\n.fare {\n  color: teal;\n}",
    ),
  },
  "font-weight": {
    estimatedMinutes: 4,
    solution: solved(
      ".card {\n  padding: 24px;\n}\n\n.route {\n  font-size: 32px;\n}\n\n.fare {\n  color: teal;\n  font-weight: bold;\n}",
    ),
  },
  "max-width-centre": {
    estimatedMinutes: 4,
    solution: solved(
      ".card {\n  background-color: white;\n  padding: 24px;\n  border-radius: 12px;\n  max-width: 360px;\n}",
    ),
  },
  "list-style": {
    estimatedMinutes: 4,
    solution: solved(
      ".card {\n  padding: 24px;\n}\n\n.stops {\n  list-style-type: none;\n}",
    ),
  },
  "flex-row": {
    estimatedMinutes: 5,
    solution: solved(
      ".card {\n  padding: 24px;\n}\n\n.stops {\n  list-style-type: none;\n  display: flex;\n}",
    ),
  },
  gap: {
    estimatedMinutes: 4,
    solution: solved(
      ".stops {\n  list-style-type: none;\n  display: flex;\n  gap: 12px;\n}",
    ),
  },
  hover: {
    estimatedMinutes: 6,
    solution: solved(
      ".card {\n  background-color: white;\n  padding: 24px;\n  border-radius: 12px;\n  border: 2px solid transparent;\n}\n\n.card:hover {\n  border: 2px solid teal;\n}",
    ),
  },
} satisfies Record<string, StepReference>;

const s = (step: Omit<Step, "index" | "kind">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web" };
};

export const cssCourse: Course = {
  id: "css-basics",
  order: 2,
  title: "Learn CSS by Building a Jeepney Route Card",
  project: "Jeepney Route Card",
  kind: "web",
  requires: ["html-basics"],
  summary: {
    simple: "Now make it look good. Colours, spacing, fonts, and layout.",
    standard: "Presentation. Selectors, the box model, colour, typography, and flexbox.",
  },
  steps: [
    s({
      id: "first-rule",
      task: {
        simple: "Make the page light grey. Type #f4f4f5 after the colon.",
        standard: "Set the body background-color to #f4f4f5.",
      },
      inputMode: "guided",
      files: { "index.html": HTML, "styles.css": css("body {\n  background-color: ;\n}") },
      activeFile: "styles.css",
      highlightToken: "background-color: ;",
      tests: [
        {
          id: "body-bg",
          kind: "style",
          selector: "body",
          prop: "background-color",
          equals: "rgb(244, 244, 245)",
          readable: "light grey",
          label: { simple: "The page is light grey", standard: "body background-color is #f4f4f5" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "A rule is: what to change, then a colon, then the value, then a semicolon.",
            standard: "Declarations are `property: value;` inside a selector block.",
          },
        },
      ],
      xp: 40,
    }),
    s({
      id: "class-selector",
      task: {
        simple:
          "Make the card white. A dot means class, so .card picks the box with class=\"card\".",
        standard: "Add a rule for the .card class setting background-color to white.",
      },
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css("body {\n  background-color: #f4f4f5;\n}\n\n"),
      },
      activeFile: "styles.css",
      concepts: [
        {
          id: "class",
          term: "class",
          definition: {
            simple:
              "A class is a name you give to something so you can style it. Many things can share the same name.",
            standard:
              "A class is a reusable identifier on an element. A rule written for that class applies to every element carrying it.",
          },
          analogy: {
            simple:
              "Like writing FRAGILE on a box. The word does nothing by itself. It tells whoever handles it how to treat that box. Every box with the same word gets treated the same way.",
            standard:
              "Like a FRAGILE label on a box: the word carries no behaviour on its own, but every box wearing it is handled the same way.",
          },
          visual: {
            kind: "live-demo",
            files: {
              "index.html":
                '<p class="tag">I have the class</p>\n<p>I do not</p>\n<p class="tag">I have it too</p>',
              "styles.css":
                ".tag {\n  background: #ffe9d6;\n  border-left: 4px solid #c2410c;\n  padding: 8px 12px;\n}",
            },
            caption: {
              simple: "One rule. Two of these three have the name, so two of them change.",
              standard: "A single .tag rule applies to every element carrying that class.",
            },
          },
          proof: {
            simple: "You are about to write a rule for .card and watch the box change.",
            standard: "You will write a .card rule and see it take effect.",
          },
        },
      ],
      tests: [
        {
          id: "card-bg",
          kind: "style",
          selector: ".card",
          prop: "background-color",
          equals: "rgb(255, 255, 255)",
          readable: "white",
          label: { simple: "The card is white", standard: ".card background-color is white" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Write .card then curly braces, then the rule inside.",
            standard: "`.card { background-color: white; }`",
          },
        },
      ],
      xp: 50,
    }),
    s({
      id: "padding",
      task: {
        simple: "The words are touching the edges. Push them in with 24 pixels of padding.",
        standard: "Add 24px of padding to .card. Padding is space inside the box.",
      },
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          "body {\n  background-color: #f4f4f5;\n}\n\n.card {\n  background-color: white;\n}",
        ),
      },
      activeFile: "styles.css",
      highlightToken: "background-color: white;",
      tests: [
        {
          id: "card-padding",
          kind: "style",
          selector: ".card",
          prop: "padding-top",
          equals: "24px",
          readable: "24 pixels",
          label: { simple: "The card has space inside", standard: ".card padding is 24px" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Padding is space inside the box. Margin is space outside it.",
            standard: "Box model: padding is inside the border, margin is outside.",
          },
        },
      ],
      xp: 50,
    }),
    s({
      id: "radius-shadow",
      task: {
        simple: "Round the card corners by 12 pixels.",
        standard: "Add a 12px border-radius to .card.",
      },
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          "body {\n  background-color: #f4f4f5;\n}\n\n.card {\n  background-color: white;\n  padding: 24px;\n}",
        ),
      },
      activeFile: "styles.css",
      tests: [
        {
          id: "card-radius",
          kind: "style",
          selector: ".card",
          prop: "border-radius",
          equals: "12px",
          readable: "12 pixels",
          label: { simple: "The card has round corners", standard: ".card border-radius is 12px" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Bigger number, rounder corners.",
            standard: "`border-radius: 12px;`",
          },
        },
      ],
      xp: 50,
    }),
    s({
      id: "font-size",
      task: {
        simple: "Make the route name big. Change 16 to 32.",
        standard: "Set .route font-size to 32px.",
      },
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          ".card {\n  background-color: white;\n  padding: 24px;\n  border-radius: 12px;\n}\n\n.route {\n  font-size: 16px;\n}",
        ),
      },
      activeFile: "styles.css",
      highlightToken: "16px",
      tests: [
        {
          id: "route-size",
          kind: "style",
          selector: ".route",
          prop: "font-size",
          equals: "32px",
          readable: "32 pixels",
          label: { simple: "The route name is big", standard: ".route font-size is 32px" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "Only the number changes. Leave px alone.",
            standard: "Replace the numeric part; keep the unit.",
          },
        },
      ],
      xp: 50,
    }),
    s({
      id: "colour",
      task: {
        simple: "Make the fare teal so it stands out. Use the colour teal.",
        standard: "Set .fare colour to teal.",
      },
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          ".card {\n  background-color: white;\n  padding: 24px;\n}\n\n.route {\n  font-size: 32px;\n}\n\n.fare {\n}",
        ),
      },
      activeFile: "styles.css",
      highlightToken: ".fare {",
      tests: [
        {
          id: "fare-colour",
          kind: "style",
          selector: ".fare",
          prop: "color",
          equals: "rgb(0, 128, 128)",
          readable: "teal",
          label: { simple: "The fare is teal", standard: ".fare colour is teal" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "color changes the words. background-color changes behind them.",
            standard: "`color` sets text colour; `background-color` sets the fill.",
          },
        },
      ],
      xp: 50,
    }),
    s({
      id: "font-weight",
      task: {
        simple: "Make the fare bold.",
        standard: "Set .fare font-weight to bold.",
      },
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          ".card {\n  padding: 24px;\n}\n\n.route {\n  font-size: 32px;\n}\n\n.fare {\n  color: teal;\n}",
        ),
      },
      activeFile: "styles.css",
      tests: [
        {
          id: "fare-bold",
          kind: "style",
          selector: ".fare",
          prop: "font-weight",
          equals: "700",
          readable: "bold",
          label: { simple: "The fare is bold", standard: ".fare font-weight is bold" },
        },
      ],
      hints: [
        {
          level: 1,
          text: { simple: "font-weight: bold;", standard: "`font-weight: bold;` equals 700." },
        },
      ],
      xp: 50,
    }),
    s({
      id: "max-width-centre",
      task: {
        simple: "Stop the card from stretching. Make it 360 pixels wide at most.",
        standard: "Set .card max-width to 360px.",
      },
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          ".card {\n  background-color: white;\n  padding: 24px;\n  border-radius: 12px;\n}",
        ),
      },
      activeFile: "styles.css",
      tests: [
        {
          id: "card-maxw",
          kind: "style",
          selector: ".card",
          prop: "max-width",
          equals: "360px",
          readable: "360 pixels",
          label: { simple: "The card is not too wide", standard: ".card max-width is 360px" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "max-width means never wider than this.",
            standard: "`max-width` caps the used width.",
          },
        },
      ],
      xp: 60,
    }),
    s({
      id: "list-style",
      task: {
        simple: "Remove the bullet points from the stops list.",
        standard: "Set .stops list-style-type to none.",
      },
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(".card {\n  padding: 24px;\n}\n\n.stops {\n}"),
      },
      activeFile: "styles.css",
      highlightToken: ".stops {",
      tests: [
        {
          id: "stops-nobullet",
          kind: "style",
          selector: ".stops",
          prop: "list-style-type",
          equals: "none",
          readable: "no bullets",
          label: { simple: "The bullets are gone", standard: ".stops list-style-type is none" },
        },
      ],
      hints: [
        {
          level: 1,
          text: { simple: "list-style-type: none;", standard: "`list-style-type: none;`" },
        },
      ],
      xp: 60,
    }),
    s({
      id: "flex-row",
      task: {
        simple:
          "Put the stops side by side instead of stacked. Use display: flex on the list.",
        standard: "Make .stops a flex container so the items lay out in a row.",
      },
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          ".card {\n  padding: 24px;\n}\n\n.stops {\n  list-style-type: none;\n}",
        ),
      },
      activeFile: "styles.css",
      tests: [
        {
          id: "stops-flex",
          kind: "style",
          selector: ".stops",
          prop: "display",
          equals: "flex",
          readable: "flex",
          label: { simple: "The stops sit side by side", standard: ".stops display is flex" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "flex lays children out in a row by default.",
            standard: "`display: flex;` establishes a flex formatting context.",
          },
        },
      ],
      xp: 70,
    }),
    s({
      id: "gap",
      task: {
        simple: "The stops are squashed together. Put 12 pixels of gap between them.",
        standard: "Add a 12px gap to the flex container.",
      },
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          ".stops {\n  list-style-type: none;\n  display: flex;\n}",
        ),
      },
      activeFile: "styles.css",
      tests: [
        {
          id: "stops-gap",
          kind: "style",
          selector: ".stops",
          prop: "column-gap",
          equals: "12px",
          readable: "12 pixels",
          label: { simple: "There is space between stops", standard: ".stops gap is 12px" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: "gap: 12px; is easier than putting margin on every item.",
            standard: "`gap` spaces flex items without margin collapsing issues.",
          },
        },
      ],
      xp: 70,
    }),
    s({
      id: "hover",
      task: {
        simple:
          "Last one. Make the card lift when the mouse is over it. Add a rule for .card:hover with a teal border.",
        standard: "Add a :hover state to .card setting a 2px solid teal border.",
      },
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          ".card {\n  background-color: white;\n  padding: 24px;\n  border-radius: 12px;\n  border: 2px solid transparent;\n}\n\n",
        ),
      },
      activeFile: "styles.css",
      tests: [
        {
          id: "hover-rule",
          kind: "source-matches",
          file: "styles.css",
          pattern: "\\.card:hover\\s*\\{[^}]*border",
          flags: "s",
          because: {
            simple: "You need a rule that starts with .card:hover and sets a border.",
            standard: "Expected a `.card:hover` rule containing a `border` declaration.",
          },
          label: { simple: "The card reacts to the mouse", standard: "A .card:hover rule exists" },
        },
      ],
      hints: [
        {
          level: 1,
          text: {
            simple: ":hover means while the mouse is on it.",
            standard: "`:hover` is a pseudo-class for pointer hover state.",
          },
        },
        {
          level: 2,
          text: {
            simple: ".card:hover {\n  border: 2px solid teal;\n}",
            standard: "`.card:hover { border: 2px solid teal; }`",
          },
        },
      ],
      xp: 100,
    }),
  ],
};
