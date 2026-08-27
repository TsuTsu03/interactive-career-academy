import type { Concept } from "@/lib/lesson-ir";

/**
 * The global concept registry.
 *
 * Every concept a course teaches lives here once, keyed by id, and every
 * step that introduces or reuses it points at that id via `Step.conceptIds`.
 * A concept is never inlined into a step: the same word taught in one
 * course (e.g. "class" in Learn CSS) must mean exactly one thing when a
 * later course references it again, and spaced review needs one stable id
 * to schedule against across every course, not a copy per course.
 *
 * PLAN.md section 5. Enforced by `lib/harness.ts`.
 */
export const concepts: Record<string, Concept> = {
  // --- Learn HTML by Building a Sari-Sari Store Page ---

  element: {
    id: "element",
    term: "element",
    definition: "An element is one piece of a page. A heading is an element. A picture is an element.",
    analogy: "Think of a labelled box. The opening tag is the label on the front. The closing tag is the tape on the bottom. Whatever you put between them is what the box holds.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "An element has three parts: an opening tag, the words inside, and a closing tag.",
        columns: 3,
        nodes: [
          { id: "open", label: "Opening tag", note: "<h1>", tone: "accent" },
          { id: "text", label: "What's inside", note: "Hello", tone: "box" },
          { id: "close", label: "Closing tag", note: "</h1>", tone: "accent" },
        ],
        arrows: [],
      },
    },
    proof: "You are about to write your first element and see it appear.",
  },

  "main-element": {
    id: "main-element",
    term: "main",
    definition: "main marks the one part of the page that is the actual point of the page.",
    analogy: "Like the food counter in a store. The sign out front and the hours sign by the door matter, but the counter is why you came in.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "A page has a header, a main part, and a footer.",
        columns: 3,
        nodes: [
          { id: "header", label: "Header", note: "Store name", tone: "ghost" },
          { id: "main", label: "Main", note: "Order form", tone: "accent" },
          { id: "footer", label: "Footer", note: "Opening hours", tone: "ghost" },
        ],
        arrows: [],
      },
    },
    proof: "You are about to wrap the order form in main.",
  },

  "required-attribute": {
    id: "required-attribute",
    term: "required",
    definition: "required means the box cannot stay empty. The form refuses to send until it is filled in.",
    analogy: "Like a turnstile that will not turn until you put in a coin. Nothing happens until the box is filled.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "An empty required box stops the form. A filled one lets it continue.",
        columns: 2,
        nodes: [
          { id: "empty", label: "Empty box", note: "Stop", tone: "accent" },
          { id: "filled", label: "Item entered", note: "Continue", tone: "box" },
        ],
        arrows: [],
      },
    },
    proof: "You are about to make an input required and try submitting it empty.",
  },

  "name-attribute": {
    id: "name-attribute",
    term: "name",
    definition: "name is the label the form uses to remember which answer is which when it is sent.",
    analogy: "Like writing your name on a form field at a government office. Without it, nobody can tell whose answer is whose.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": '<input name="quantity" value="2" />',
        "styles.css": "",
      },
      caption: "This box's answer will be remembered as 'quantity'.",
    },
    proof: "You are about to give an input a name so its answer can be identified.",
  },

  "fieldset-element": {
    id: "fieldset-element",
    term: "fieldset",
    definition: "fieldset draws a box around a group of related questions.",
    analogy: "Like a section header on a paper form that puts a line around 'Contact Details' so you know those boxes belong together.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html":
          "<fieldset>\n  <legend>Contact</legend>\n  <input />\n</fieldset>",
        "styles.css": "",
      },
      caption: "A border appears around the group automatically.",
    },
    proof: "You are about to group related fields inside a fieldset.",
  },

  "legend-element": {
    id: "legend-element",
    term: "legend",
    definition: "legend is the title of a fieldset group, shown right on its border.",
    analogy: "Like the label printed on a folder tab, right where the border of the folder is.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html":
          "<fieldset>\n  <legend>Order Details</legend>\n  <input />\n</fieldset>",
        "styles.css": "",
      },
      caption: "The words 'Order Details' sit on the fieldset's own border.",
    },
    proof: "You are about to add a legend naming a group of fields.",
  },

  "number-input": {
    id: "number-input",
    term: "number input",
    definition: "type=\"number\" only lets someone type digits, with up and down arrows to change the count.",
    analogy: "Like a quantity dial at a self-checkout that only counts up or down, never letters.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": '<input type="number" value="1" />',
        "styles.css": "",
      },
      caption: "Try typing a letter into it — nothing happens.",
    },
    proof: "You are about to make a quantity box that only accepts numbers.",
  },

  "min-attribute": {
    id: "min-attribute",
    term: "min",
    definition: "min sets the smallest number a number box will allow.",
    analogy: "Like a store's 'minimum order: 1 sack' sign. You cannot go below it.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": '<input type="number" min="1" value="1" />',
        "styles.css": "",
      },
      caption: "The down arrow stops working once it reaches 1.",
    },
    proof: "You are about to stop the quantity box from going below 1.",
  },

  "select-element": {
    id: "select-element",
    term: "select",
    definition: "select makes a dropdown box where the learner picks one choice from a list.",
    analogy: "Like a jeepney signboard with a fixed list of destinations. You pick one, not write your own.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html":
          "<select>\n  <option>Small</option>\n  <option>Large</option>\n</select>",
        "styles.css": "",
      },
      caption: "Click it — a list of choices drops down.",
    },
    proof: "You are about to add a dropdown with a fixed set of choices.",
  },

  "option-element": {
    id: "option-element",
    term: "option",
    definition: "option is one choice inside a select dropdown.",
    analogy: "Like one destination printed on the jeepney signboard.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<select>\n  <option>Cash</option>\n  <option>GCash</option>\n</select>",
        "styles.css": "",
      },
      caption: "Two options, two choices in the dropdown.",
    },
    proof: "You are about to add a choice to a dropdown.",
  },

  "textarea-element": {
    id: "textarea-element",
    term: "textarea",
    definition: "textarea is a bigger box for typing more than one line, like a note.",
    analogy: "Like the blank space for 'special instructions' on a delivery form, not a single-line box.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<textarea>Leave at the gate.</textarea>",
        "styles.css": "",
      },
      caption: "It grows tall enough for a note, unlike a normal input.",
    },
    proof: "You are about to add a box for order notes.",
  },

  checkbox: {
    id: "checkbox",
    term: "checkbox",
    definition: "A checkbox is a box you tick to say yes to something. Empty means no, ticked means yes.",
    analogy: "Like a tick box on a delivery form for 'Fragile.' Empty until someone ticks it; nothing else changes what it means.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<label><input type=\"checkbox\" /> I agree</label>",
        "styles.css": "",
      },
      caption: "Click it — the box fills in.",
    },
    proof: "You are about to add a checkbox the learner must tick before sending the order.",
  },

  "radio-button": {
    id: "radio-button",
    term: "radio button",
    definition: "A radio button is one choice in a group where only one can be picked at a time.",
    analogy: "Like old car radio station buttons. Press one, the others pop back out. Only one plays at a time.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html":
          '<label><input type="radio" name="pay" /> Cash</label>\n<label><input type="radio" name="pay" /> GCash</label>',
        "styles.css": "",
      },
      caption: "Pick one — the other unpicks itself automatically.",
    },
    proof: "You are about to add two payment choices where picking one clears the other.",
  },

  "placeholder-attribute": {
    id: "placeholder-attribute",
    term: "placeholder",
    definition: "placeholder is grey example text that shows inside an empty box and disappears once you start typing.",
    analogy: "Like the faint printed example on a paper form: 'e.g. Juan Dela Cruz.' It is not an answer, just a hint.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": '<input placeholder="e.g. rice, eggs" />',
        "styles.css": "",
      },
      caption: "Grey text shows until you click and type.",
    },
    proof: "You are about to add an example hint inside the item box.",
  },

  table: {
    id: "table",
    term: "table",
    definition: "A table is rows and columns of information, like item names next to their prices.",
    analogy: "Like a printed price list at a store: one column for the item, one column for the price, lined up in rows.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html":
          "<table>\n  <tr><th>Item</th><th>Price</th></tr>\n  <tr><td>Rice</td><td>58</td></tr>\n</table>",
        "styles.css": "table, td, th { border: 1px solid #999; padding: 4px 8px; }",
      },
      caption: "Rows and columns line up automatically once they share a table.",
    },
    proof: "You are about to start a price list using a table.",
  },

  "ordered-list": {
    id: "ordered-list",
    term: "ordered list",
    definition: "An ordered list numbers its items automatically: 1, 2, 3. Use it when the order matters.",
    analogy: "Like numbered steps on a recipe card. Do them in order, and the numbers are printed for you.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<ol>\n  <li>Choose your items</li>\n  <li>Tell the cashier</li>\n  <li>Pay on pickup</li>\n</ol>",
        "styles.css": "",
      },
      caption: "The numbers 1, 2, 3 appear on their own — nobody typed them.",
    },
    proof: "You are about to add numbered ordering steps.",
  },

  blockquote: {
    id: "blockquote",
    term: "blockquote",
    definition: "blockquote marks words that are someone else's, not the page author's own.",
    analogy: "Like putting someone's exact words in quotation marks in an essay, so nobody thinks you wrote them.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<blockquote>Best rice prices in Divisoria!</blockquote>",
        "styles.css": "blockquote { border-left: 3px solid #999; padding-left: 12px; font-style: italic; }",
      },
      caption: "It reads as a quote, set apart from the rest of the page.",
    },
    proof: "You are about to add a customer's own words as a quote.",
  },

  "figure-element": {
    id: "figure-element",
    term: "figure",
    definition: "figure groups an image with its own caption, so the two always travel together.",
    analogy: "Like a framed photo with a small printed caption glued to the frame. Move the frame, the caption moves with it.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html":
          '<figure>\n  <img src="store.png" alt="Aling Nena\'s store front" />\n  <figcaption>Our store since 1998</figcaption>\n</figure>',
        "styles.css": "",
      },
      caption: "The image and its caption are now one grouped unit.",
    },
    proof: "You are about to caption the store photo.",
  },

  "address-element": {
    id: "address-element",
    term: "address",
    definition: "address marks contact information for whoever the page is about.",
    analogy: "Like the contact box printed at the bottom of a flyer: phone number, location, nothing else belongs there.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<address>Call 0917-000-0000, Barangay San Roque</address>",
        "styles.css": "",
      },
      caption: "Browsers render it italic by default — a small visual signal of its special meaning.",
    },
    proof: "You are about to add the store's contact details.",
  },

  "article-element": {
    id: "article-element",
    term: "article",
    definition: "An article holds one complete piece of content that makes sense on its own, like a notice or news story.",
    analogy: "Like one paper notice on a community board. You can take it down, move it, or read it without needing the other notices.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<article>\n  <h2>Water Service Notice</h2>\n  <p>Service stops from 9am to 1pm.</p>\n</article>",
        "styles.css": "article { border: 2px solid #0f766e; padding: 12px; }",
      },
      caption: "The border shows one notice grouped as a complete piece.",
    },
    proof: "You are about to start a water notice inside an article.",
  },

  "time-element": {
    id: "time-element",
    term: "time element",
    definition: "A time element marks a date or time so the browser knows those words describe when something happens.",
    analogy: "Like circling a date and time on a paper calendar. The circle tells you that these words are when something happens.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<p>Water service stops <time>Monday, 9am to 1pm</time>.</p>",
        "styles.css": "time { background: #fef3c7; padding: 2px 4px; }",
      },
      caption: "The highlighted words are the notice's service time.",
    },
    proof: "You are about to mark the service period with a time tag.",
  },

  "datetime-attribute": {
    id: "datetime-attribute",
    term: "datetime attribute",
    definition: "The datetime attribute gives a time tag a computer-readable date and time, even when people read friendlier words.",
    analogy: "Like writing a clear date on the back of a photo. The front can say Monday morning. The back records the exact date.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "A friendly time label connects to an exact datetime value for computers.",
        columns: 2,
        nodes: [
          { id: "label", label: "People read", note: "Monday, 9am", tone: "accent" },
          { id: "value", label: "Computers read", note: "2026-08-24T09:00", tone: "box" },
        ],
        arrows: [{ from: "label", to: "value" }],
      },
    },
    proof: "You are about to add the notice's exact start value to its time tag.",
  },

  "nav-element": {
    id: "nav-element",
    term: "navigation element",
    definition: "nav groups links that help people move around a page.",
    analogy: "Like a sign above jeepney stops. It groups the names that help riders choose where to go.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<nav>\n  <a href=\"#palengke\">Palengke</a>\n</nav>\n<h2 id=\"palengke\">Palengke</h2>",
        "styles.css": "nav { border: 2px solid #0f766e; padding: 8px; }",
      },
      caption: "The border groups the route link as navigation.",
    },
    proof: "You are about to start a route guide inside nav.",
  },

  "fragment-link": {
    id: "fragment-link",
    term: "fragment link",
    definition: "A fragment link jumps to a matching id somewhere else on the same page.",
    analogy: "Like a book's contents page. Choose a heading, and it takes you straight to that part of the book.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "A Palengke link points to the Palengke heading on the same page.",
        columns: 2,
        nodes: [
          { id: "link", label: "Route link", note: "#palengke", tone: "accent" },
          { id: "target", label: "Stop heading", note: "id=palengke", tone: "box" },
        ],
        arrows: [{ from: "link", to: "target" }],
      },
    },
    proof: "You are about to link the route guide to Palengke.",
  },

  "id-attribute": {
    id: "id-attribute",
    term: "id attribute",
    definition: "An id gives one element one unique name. A page link can use that name as its target.",
    analogy: "Like a route-stop sign with one exact name. Riders can point to that sign and nobody mixes it up with another stop.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "The id name on the heading matches the name in the page link.",
        columns: 2,
        nodes: [
          { id: "hash", label: "Link target", note: "#palengke", tone: "ghost" },
          { id: "id", label: "Heading id", note: "palengke", tone: "accent" },
        ],
        arrows: [{ from: "hash", to: "id" }],
      },
    },
    proof: "You are about to name the Palengke heading for the route link.",
  },

  "details-element": {
    id: "details-element",
    term: "details element",
    definition: "details holds extra content people can open or close when they want it.",
    analogy: "Like a folded menu card. You see its label first, then open it when you want the full list.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<details>\n  <summary>Today's dishes</summary>\n  <p>Chicken adobo: PHP 85</p>\n</details>",
        "styles.css": "details { border: 2px solid #b45309; padding: 8px; }",
      },
      caption: "Click the label to open or close the dish details.",
    },
    proof: "You are about to start a menu inside details.",
  },

  "summary-element": {
    id: "summary-element",
    term: "summary element",
    definition: "summary is the label people click to open or close a details box.",
    analogy: "Like a folder tab. Its words tell you what is inside, and pulling the tab opens the folder.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<details>\n  <summary>Today's dishes</summary>\n  <p>Chicken adobo: PHP 85</p>\n</details>",
        "styles.css": "summary { color: #9a3412; font-weight: 700; cursor: pointer; }",
      },
      caption: "Today's dishes is the label people click.",
    },
    proof: "You are about to add the menu's clickable label.",
  },

  "open-attribute": {
    id: "open-attribute",
    term: "open attribute",
    definition: "The open attribute makes a details box show its content when the page first loads.",
    analogy: "Like leaving a menu already unfolded on the counter, so people see the dishes right away.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "A closed details tag becomes open when it has the open attribute.",
        columns: 2,
        nodes: [
          { id: "closed", label: "Starts closed", note: "<details>", tone: "ghost" },
          { id: "open", label: "Starts open", note: "<details open>", tone: "accent" },
        ],
        arrows: [{ from: "closed", to: "open" }],
      },
    },
    proof: "You are about to show the menu when the page opens.",
  },

  "definition-list": {
    id: "definition-list",
    term: "definition list",
    definition: "A definition list pairs fact names with their values.",
    analogy: "Like a recipe card with labels on the left and answers beside them: Cooking time, 30 minutes.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "Cooking time and 30 minutes form one pair in a recipe facts list.",
        columns: 2,
        nodes: [
          { id: "term", label: "Fact name", note: "Cooking time", tone: "accent" },
          { id: "value", label: "Value", note: "30 minutes", tone: "box" },
        ],
        arrows: [{ from: "term", to: "value" }],
      },
    },
    proof: "You are about to start a list of Adobo recipe facts.",
  },

  "term-element": {
    id: "term-element",
    term: "term element",
    definition: "dt names one fact in a definition list.",
    analogy: "Like the printed label on a recipe card: Cooking time tells you what the next value means.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<dl>\n  <dt>Cooking time</dt>\n  <dd>30 minutes</dd>\n</dl>",
        "styles.css": "dt { font-weight: 700; color: #9a3412; }",
      },
      caption: "Cooking time is the fact name, shown in bold.",
    },
    proof: "You are about to name the cooking-time fact.",
  },

  "description-element": {
    id: "description-element",
    term: "description element",
    definition: "dd gives the value for the fact name before it.",
    analogy: "Like filling in the blank beside a label on a recipe card. Cooking time gets the answer 30 minutes.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<dl>\n  <dt>Cooking time</dt>\n  <dd>30 minutes</dd>\n</dl>",
        "styles.css": "dd { color: #166534; }",
      },
      caption: "30 minutes is the answer for Cooking time.",
    },
    proof: "You are about to give Cooking time its value.",
  },

  "abbreviation-element": {
    id: "abbreviation-element",
    term: "abbreviation element",
    definition: "abbr marks a short form of a longer name.",
    analogy: "Like a badge that says BHW while the full role is written on its back.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<p>The <abbr title=\"Barangay Health Worker\">BHW</abbr> clinic is open.</p>",
        "styles.css": "abbr { text-decoration: underline dotted; text-underline-offset: 3px; }",
      },
      caption: "The dotted underline tells you BHW has more meaning.",
    },
    proof: "You are about to mark BHW as a short form.",
  },

  "title-attribute": {
    id: "title-attribute",
    term: "title attribute",
    definition: "title adds extra words when someone points at an element.",
    analogy: "Like turning over a name badge to read the person's full role.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "BHW connects to its full name, Barangay Health Worker.",
        columns: 2,
        nodes: [
          { id: "short", label: "Short text", note: "BHW", tone: "accent" },
          { id: "full", label: "Title value", note: "Barangay Health Worker", tone: "box" },
        ],
        arrows: [{ from: "short", to: "full", label: "title" }],
      },
    },
    proof: "You are about to give BHW its full name.",
  },

  "mark-element": {
    id: "mark-element",
    term: "mark element",
    definition: "mark highlights text that matters in its current context.",
    analogy: "Like a yellow highlighter over the one detail people should notice.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<p><mark>Free</mark> check-ups are available.</p>",
        "styles.css": "mark { padding: 2px 4px; }",
      },
      caption: "Free stands out from the rest of the announcement.",
    },
    proof: "You are about to highlight the free check-ups.",
  },

  "deletion-element": {
    id: "deletion-element",
    term: "deletion element",
    definition: "del shows text that was removed but still needs to be seen.",
    analogy: "Like crossing out a wrong date on a paper notice instead of hiding it.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<p><del>Saturday clinic</del></p>",
        "styles.css": "del { color: #991b1b; }",
      },
      caption: "The old clinic day stays readable with a line through it.",
    },
    proof: "You are about to show the removed clinic day.",
  },

  "insertion-element": {
    id: "insertion-element",
    term: "insertion element",
    definition: "ins shows text that was added to a message.",
    analogy: "Like writing the corrected date beside a crossed-out one.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<p><ins>Sunday clinic</ins></p>",
        "styles.css": "ins { color: #166534; }",
      },
      caption: "The new clinic day is shown as an added detail.",
    },
    proof: "You are about to add the corrected clinic day.",
  },

  "keyboard-input-element": {
    id: "keyboard-input-element",
    term: "keyboard input element",
    definition: "kbd marks text a person should type or press on a keyboard.",
    analogy: "Like putting a box around the exact key on a computer-shop instruction card.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<p>Press <kbd>Enter</kbd> to join the network.</p>",
        "styles.css": "kbd { border: 1px solid #475569; border-radius: 3px; padding: 1px 4px; }",
      },
      caption: "Enter looks like a key you can press.",
    },
    proof: "You are about to mark the Enter key.",
  },

  "code-element": {
    id: "code-element",
    term: "code element",
    definition: "code marks a short piece of computer text, such as an access code.",
    analogy: "Like printing an access code in a special typeface so people copy every character exactly.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<p><code>WIFI-2026</code> is the access code.</p>",
        "styles.css": "code { background: #e2e8f0; padding: 2px 4px; }",
      },
      caption: "The access value is set apart from the sentence.",
    },
    proof: "You are about to mark the access code.",
  },

  "sample-output-element": {
    id: "sample-output-element",
    term: "sample output element",
    definition: "samp marks a result that a computer shows.",
    analogy: "Like copying the exact message a screen shows after a task finishes.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<p>Status: <samp>Connected</samp>.</p>",
        "styles.css": "samp { color: #166534; font-weight: 700; }",
      },
      caption: "Connected is shown as the computer's result.",
    },
    proof: "You are about to mark the connection result.",
  },

  "progress-element": {
    id: "progress-element",
    term: "progress element",
    definition: "progress shows how much work is finished on the way to a goal.",
    analogy: "Like filling boxes on a packing checklist until every relief pack is ready.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<label>Relief packs: <progress value=\"4\" max=\"10\">4 of 10 packs</progress></label>",
        "styles.css": "progress { accent-color: #0f766e; }",
      },
      caption: "Four of ten packs are ready, so the bar is partly full.",
    },
    proof: "You are about to add a bar for packs being prepared.",
  },

  "value-attribute": {
    id: "value-attribute",
    term: "value attribute",
    definition: "value gives a progress bar or meter its current number.",
    analogy: "Like writing 4 on a packing board to show how many boxes are ready now.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "The current value 4 is compared with the total 10.",
        columns: 2,
        nodes: [
          { id: "current", label: "Current", note: "value=4", tone: "accent" },
          { id: "total", label: "Goal", note: "max=10", tone: "box" },
        ],
        arrows: [{ from: "current", to: "total", label: "out of" }],
      },
    },
    proof: "You are about to set the current pack count.",
  },

  "max-attribute": {
    id: "max-attribute",
    term: "max attribute",
    definition: "max gives a progress bar or meter the number that means full.",
    analogy: "Like writing 10 as the last box on a packing board, so 4 has a clear meaning.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "A current value of 4 points toward a full value of 10.",
        columns: 2,
        nodes: [
          { id: "current", label: "Current", note: "4", tone: "box" },
          { id: "full", label: "Full", note: "max=10", tone: "accent" },
        ],
        arrows: [{ from: "current", to: "full", label: "toward" }],
      },
    },
    proof: "You are about to set the full pack goal.",
  },

  "meter-element": {
    id: "meter-element",
    term: "meter element",
    definition: "meter shows the current level of something inside a fixed range.",
    analogy: "Like looking at a water tank gauge to see how full it is right now.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": "<label>Water level: <meter value=\"60\" max=\"100\">Water level</meter></label>",
        "styles.css": "meter { accent-color: #2563eb; }",
      },
      caption: "The meter shows water at sixty out of one hundred.",
    },
    proof: "You are about to add a meter for the water level.",
  },

  "picture-element": {
    id: "picture-element",
    term: "picture element",
    definition: "picture holds different image choices for different screens.",
    analogy: "Like packing a small photo and a large photo, then choosing the one that fits the space.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "A small-screen photo and a normal photo lead into one weather image.",
        columns: 2,
        nodes: [
          { id: "small", label: "Small screen", note: "rain-small.jpg", tone: "accent" },
          { id: "default", label: "Default", note: "rain.jpg", tone: "box" },
        ],
        arrows: [{ from: "small", to: "default", label: "or" }],
      },
    },
    proof: "You are about to group weather photo choices.",
  },

  "source-element": {
    id: "source-element",
    term: "source element",
    definition: "source gives picture an image choice the browser can use.",
    analogy: "Like putting a smaller copy of a photo in the same folder as the original.",
    visual: {
      kind: "live-demo",
      files: { "index.html": "<picture>\n  <source srcset=\"rain-small.jpg\">\n  <img src=\"rain.jpg\" alt=\"Rain clouds\">\n</picture>", "styles.css": "img { max-width: 100%; }" },
      caption: "The source gives the browser another weather photo to choose.",
    },
    proof: "You are about to add the small weather photo source.",
  },

  "media-attribute": {
    id: "media-attribute",
    term: "media attribute",
    definition: "media tells a source when its image choice should be used.",
    analogy: "Like a note that says use the small photo only on a narrow display.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "A screen narrower than 600 pixels points to the small rain photo.",
        columns: 2,
        nodes: [
          { id: "screen", label: "Narrow screen", note: "600px or less", tone: "accent" },
          { id: "source", label: "Photo choice", note: "rain-small.jpg", tone: "box" },
        ],
        arrows: [{ from: "screen", to: "source", label: "uses" }],
      },
    },
    proof: "You are about to set when the small photo is used.",
  },

  "loading-attribute": {
    id: "loading-attribute",
    term: "loading attribute",
    definition: "loading can tell the browser to wait before fetching an image.",
    analogy: "Like waiting to bring out a photo album until someone reaches that part of the shelf.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "A reader scrolls toward a photo, then the browser loads it.",
        columns: 2,
        nodes: [
          { id: "wait", label: "Wait", note: "loading=lazy", tone: "accent" },
          { id: "load", label: "Load", note: "near the screen", tone: "box" },
        ],
        arrows: [{ from: "wait", to: "load" }],
      },
    },
    proof: "You are about to delay the weather photo load.",
  },

  "video-element": {
    id: "video-element",
    term: "video element",
    definition: "video puts a movie or recording on a web page.",
    analogy: "Like putting a small TV screen inside a community notice.",
    visual: { kind: "live-demo", files: { "index.html": "<video controls><source src=\"water-notice.mp4\" type=\"video/mp4\"></video>", "styles.css": "video { max-width: 100%; }" }, caption: "The controls let a visitor start and pause the notice." },
    proof: "You are about to add the water notice player.",
  },

  "controls-attribute": {
    id: "controls-attribute",
    term: "controls attribute",
    definition: "controls gives a video its play, pause, and volume buttons.",
    analogy: "Like putting play and pause buttons below a small community TV.",
    visual: { kind: "diagram", diagram: { alt: "A video player connects to play, pause, and volume controls.", columns: 2, nodes: [{ id: "video", label: "Video", note: "water notice", tone: "box" }, { id: "controls", label: "Controls", note: "play · pause · volume", tone: "accent" }], arrows: [{ from: "video", to: "controls" }] } },
    proof: "You are about to let people control the notice video.",
  },

  "track-element": {
    id: "track-element",
    term: "track element",
    definition: "track adds timed text, such as captions, to a video.",
    analogy: "Like giving a video a written script that appears at the right moment.",
    visual: { kind: "live-demo", files: { "index.html": "<video controls>\n  <track kind=\"captions\" src=\"water-notice-en.vtt\" srclang=\"en\" label=\"English captions\">\n</video>", "styles.css": "video { min-height: 80px; background: #0f172a; }" }, caption: "The captions track gives the player words to show with the notice." },
    proof: "You are about to add English captions.",
  },

  "default-attribute": {
    id: "default-attribute",
    term: "default attribute",
    definition: "default tells the browser which text track to start with.",
    analogy: "Like opening a notice with English captions already selected.",
    visual: { kind: "diagram", diagram: { alt: "English captions are selected when the water notice video starts.", columns: 2, nodes: [{ id: "start", label: "Video starts", tone: "box" }, { id: "captions", label: "English captions", note: "default", tone: "accent" }], arrows: [{ from: "start", to: "captions", label: "shows" }] } },
    proof: "You are about to make captions start on.",
  },

  "audio-element": {
    id: "audio-element",
    term: "audio element",
    definition: "audio puts a sound recording on a web page.",
    analogy: "Like placing a small radio inside a community notice.",
    visual: { kind: "live-demo", files: { "index.html": "<audio controls><source src=\"radio-update.mp3\" type=\"audio/mpeg\"></audio>", "styles.css": "audio { max-width: 100%; }" }, caption: "The browser shows audio controls for the radio update." },
    proof: "You are about to add a radio update player.",
  },

  "preload-attribute": {
    id: "preload-attribute",
    term: "preload attribute",
    definition: "preload tells the browser what audio data to get first.",
    analogy: "Like reading a radio program's title before playing the whole recording.",
    visual: { kind: "diagram", diagram: { alt: "The browser gets audio details before the full radio update.", columns: 2, nodes: [{ id: "setting", label: "preload", note: "metadata", tone: "accent" }, { id: "details", label: "Audio details", note: "title · length", tone: "box" }], arrows: [{ from: "setting", to: "details", label: "gets first" }] } },
    proof: "You are about to load only audio details first.",
  },

  "list-attribute": {
    id: "list-attribute",
    term: "list attribute",
    definition: "list links an input box to its choice box.",
    analogy: "Like writing a jeepney route number on a sign that points to its stops.",
    visual: { kind: "diagram", diagram: { alt: "An input box points to the stop choice box named stops.", columns: 2, nodes: [{ id: "input", label: "Input", note: "list=stops", tone: "accent" }, { id: "choices", label: "Stop choices", note: "id=stops", tone: "box" }], arrows: [{ from: "input", to: "choices", label: "uses" }] } },
    proof: "You are about to connect the stop box to its choices.",
  },

  "datalist-element": {
    id: "datalist-element",
    term: "datalist element",
    definition: "datalist holds choices that an input can suggest.",
    analogy: "Like a jeepney stop board that suggests where the route can go.",
    visual: { kind: "live-demo", files: { "index.html": "<label for=\"stop\">Choose a stop</label>\n<input id=\"stop\" list=\"stops\">\n<datalist id=\"stops\">\n  <option value=\"Palengke\">\n  <option value=\"Terminal\">\n</datalist>" }, caption: "The stop box can suggest Palengke or Terminal." },
    proof: "You are about to add the stop choice box.",
  },

  "telephone-link": {
    id: "telephone-link",
    term: "telephone link",
    definition: "A telephone link tells a device which number to call.",
    analogy: "Like writing a phone number on a call button.",
    visual: { kind: "diagram", diagram: { alt: "A Call 117 link points to the number 117.", columns: 2, nodes: [{ id: "link", label: "Call 117", note: "link text", tone: "box" }, { id: "phone", label: "117", note: "tel:117", tone: "accent" }], arrows: [{ from: "link", to: "phone", label: "calls" }] } },
    proof: "You are about to link the emergency phone number.",
  },

  "mailto-link": {
    id: "mailto-link",
    term: "mailto link",
    definition: "A mailto link opens an email message to an address.",
    analogy: "Like writing the recipient on a blank email envelope.",
    visual: { kind: "diagram", diagram: { alt: "An email link points to the barangay help email address.", columns: 2, nodes: [{ id: "link", label: "Email the barangay", tone: "box" }, { id: "mail", label: "Help email", note: "mailto:...", tone: "accent" }], arrows: [{ from: "link", to: "mail", label: "opens" }] } },
    proof: "You are about to link the barangay help email.",
  },

  "download-attribute": {
    id: "download-attribute",
    term: "download attribute",
    definition: "download asks the browser to save a linked file.",
    analogy: "Like putting a save-this-copy note on a bulletin.",
    visual: { kind: "diagram", diagram: { alt: "A bulletin PDF link points to a saved file.", columns: 2, nodes: [{ id: "link", label: "Bulletin link", note: "download", tone: "accent" }, { id: "file", label: "Saved PDF", tone: "box" }], arrows: [{ from: "link", to: "file", label: "saves" }] } },
    proof: "You are about to make the bulletin file saveable.",
  },

  "aside-element": {
    id: "aside-element",
    term: "aside element",
    definition: "aside holds related information beside the main page content.",
    analogy: "Like a safety note pinned beside a barangay notice.",
    visual: { kind: "diagram", diagram: { alt: "A main notice sits beside a safety tip.", columns: 2, nodes: [{ id: "main", label: "Main notice", tone: "box" }, { id: "aside", label: "Safety tip", note: "aside", tone: "accent" }], arrows: [{ from: "main", to: "aside", label: "related" }] } },
    proof: "You are about to add a box for a safety tip.",
  },

  "data-element": {
    id: "data-element",
    term: "data element",
    definition: "data shows a value people read and a value computers use.",
    analogy: "Like a market price sign with a big price and a stock number behind it.",
    visual: { kind: "diagram", diagram: { alt: "PHP 58 points to the number 58 for a computer.", columns: 2, nodes: [{ id: "text", label: "PHP 58", note: "shown", tone: "box" }, { id: "value", label: "58", note: "value", tone: "accent" }], arrows: [{ from: "text", to: "value", label: "means" }] } },
    proof: "You are about to add a readable rice price.",
  },

  "dialog-element": {
    id: "dialog-element",
    term: "dialog element",
    definition: "dialog is a box for an important message that needs attention.",
    analogy: "Like a barangay official stepping forward with a message everyone needs to see.",
    visual: { kind: "live-demo", files: { "index.html": "<dialog open>\n  <h2>Flood Warning</h2>\n  <p>Evacuate to Barangay Hall now.</p>\n</dialog>" }, caption: "The warning appears in its own message box." },
    proof: "You are about to add an emergency alert box.",
  },

  "search-element": {
    id: "search-element",
    term: "search element",
    definition: "search marks the part of a page used to find or filter things.",
    analogy: "Like the desk at a barangay hall where people ask where a service is.",
    visual: { kind: "diagram", diagram: { alt: "A search area contains a search box and a service question.", columns: 2, nodes: [{ id: "region", label: "Search area", note: "search", tone: "accent" }, { id: "input", label: "Find a service", note: "input", tone: "box" }], arrows: [{ from: "region", to: "input", label: "contains" }] } },
    proof: "You are about to mark a service search area.",
  },

  "search-input": {
    id: "search-input",
    term: "search input",
    definition: "A search input is a text box made for typing a search question.",
    analogy: "Like the question box at a help desk where you write what you need.",
    visual: { kind: "live-demo", files: { "index.html": "<label for=\"service\">Find a service</label>\n<input type=\"search\" id=\"service\" placeholder=\"Health center\">" }, caption: "The search box shows an example service." },
    proof: "You are about to add a box for a service search.",
  },

  "optgroup-element": {
    id: "optgroup-element",
    term: "option group",
    definition: "optgroup puts related choices together inside a choice box.",
    analogy: "Like one section of a turo-turo counter marked Main dishes.",
    visual: { kind: "diagram", diagram: { alt: "A meal choices box has a Main dishes group with Adobo and Sinigang.", columns: 3, nodes: [{ id: "select", label: "Meal choices", note: "select", tone: "ghost" }, { id: "group", label: "Main dishes", note: "optgroup", tone: "accent" }, { id: "options", label: "Adobo, Sinigang", note: "options", tone: "box" }], arrows: [{ from: "select", to: "group" }, { from: "group", to: "options" }] } },
    proof: "You are about to group two meal choices.",
  },

  "caption-element": {
    id: "caption-element",
    term: "table caption",
    definition: "A table caption is a title that explains a whole table.",
    analogy: "Like a sign above a palengke price board.",
    visual: { kind: "diagram", diagram: { alt: "Palengke Prices sits above a table row for Tomatoes and PHP 90.", columns: 2, nodes: [{ id: "caption", label: "Palengke Prices", note: "caption", tone: "accent" }, { id: "table", label: "Tomatoes | PHP 90", note: "table", tone: "box" }], arrows: [{ from: "caption", to: "table", label: "names" }] } },
    proof: "You are about to name a market price table.",
  },

  "autocomplete-attribute": {
    id: "autocomplete-attribute",
    term: "autocomplete attribute",
    definition: "autocomplete tells a browser what saved detail can help fill a box.",
    analogy: "Like telling a barangay clerk this blank is for a person's name, so they can find it faster.",
    visual: { kind: "diagram", diagram: { alt: "A name box marked autocomplete=name receives a saved name suggestion.", columns: 2, nodes: [{ id: "input", label: "Your name", note: "autocomplete=name", tone: "accent" }, { id: "saved", label: "Saved name", note: "browser suggestion", tone: "box" }], arrows: [{ from: "saved", to: "input", label: "suggests" }] } },
    proof: "You are about to let a browser suggest a saved name.",
  },

  "file-input": {
    id: "file-input",
    term: "file input",
    definition: "A file input lets someone choose a file from their device.",
    analogy: "Like a document tray where someone picks one paper to hand over.",
    visual: { kind: "live-demo", files: { "index.html": "<label for=\"proof\">Upload proof</label>\n<input type=\"file\" id=\"proof\">" }, caption: "The browser shows a box for choosing a file." },
    proof: "You are about to add a box for choosing a file.",
  },

  "accept-attribute": {
    id: "accept-attribute",
    term: "accept attribute",
    definition: "accept suggests which file types belong in a file box.",
    analogy: "Like a document tray label that says PDF only.",
    visual: { kind: "diagram", diagram: { alt: "A file box marked .pdf points to a PDF document choice.", columns: 2, nodes: [{ id: "input", label: "Upload proof", note: "accept=.pdf", tone: "accent" }, { id: "pdf", label: "Proof.pdf", note: "allowed type", tone: "box" }], arrows: [{ from: "input", to: "pdf", label: "allows" }] } },
    proof: "You are about to guide a file box toward PDFs.",
  },

  // --- Learn CSS by Building a Jeepney Route Card ---

  "cursor-property": {
    id: "cursor-property",
    term: "cursor property",
    definition: "The cursor property chooses the mouse shape over an element.",
    analogy: "Like a small hand sign that says this button can be pressed.",
    visual: { kind: "live-demo", files: { "index.html": "<button class=\"order-button\">Order a meal</button>", "styles.css": ".order-button { cursor: pointer; padding: 12px; }" }, caption: "Moving over the button shows a pointing hand." },
    proof: "You are about to show a pointer over an order button.",
  },

  "inline-flex": {
    id: "inline-flex",
    term: "inline flex",
    definition: "inline-flex keeps a small group in a row without making it fill the whole line.",
    analogy: "Like a tiny sign that keeps its dot and words together without taking the whole notice board.",
    visual: { kind: "diagram", diagram: { alt: "A green dot and Open now stay together in one small row.", columns: 2, nodes: [{ id: "dot", label: "green dot", note: "status", tone: "accent" }, { id: "text", label: "Open now", note: "words", tone: "box" }], arrows: [{ from: "dot", to: "text", label: "same row" }] } },
    proof: "You are about to keep a status dot and words together.",
  },

  selector: {
    id: "selector",
    term: "selector",
    definition: "A selector is the part of a CSS rule that says which thing on the page to style.",
    analogy: "Like calling out a name in a crowded room. Say 'body' and only the body listens. Say '.card' and only the boxes wearing that name listen.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "A selector points at the thing a rule will style.",
        columns: 2,
        nodes: [
          { id: "sel", label: "Selector", note: "body", tone: "accent" },
          { id: "target", label: "What it picks", note: "<body>", tone: "box" },
        ],
        arrows: [{ from: "sel", to: "target" }],
      },
    },
    proof: "You are about to write body as a selector and watch the whole page respond.",
  },

  declaration: {
    id: "declaration",
    term: "declaration",
    definition: "A declaration is one instruction inside a rule: what to change, a colon, the new value, a semicolon.",
    analogy: "Like one line on an order slip: 'colour: teal.' One line, one instruction.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "A declaration has a property, a colon, a value, and a semicolon.",
        columns: 4,
        nodes: [
          { id: "prop", label: "Property", note: "color", tone: "accent" },
          { id: "colon", label: "", note: ":", tone: "ghost" },
          { id: "val", label: "Value", note: "teal", tone: "box" },
          { id: "semi", label: "", note: ";", tone: "ghost" },
        ],
        arrows: [],
      },
    },
    proof: "You are about to write your first declaration inside a rule.",
  },

  "box-model": {
    id: "box-model",
    term: "box model",
    definition: "Every element is a box. Padding is space inside the box's edge. Margin is space outside it.",
    analogy: "Like a parcel: padding is the bubble wrap inside the box, margin is the gap you leave between it and the next parcel on the shelf.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "Content, then padding around it, then margin around that.",
        columns: 3,
        nodes: [
          { id: "content", label: "Content", tone: "accent" },
          { id: "padding", label: "Padding", note: "inside", tone: "box" },
          { id: "margin", label: "Margin", note: "outside", tone: "ghost" },
        ],
        arrows: [
          { from: "content", to: "padding" },
          { from: "padding", to: "margin" },
        ],
      },
    },
    proof: "You are about to add padding and watch the space open up inside the card.",
  },

  class: {
    id: "class",
    term: "class",
    definition: "A class is a name you give to something so you can style it. Many things can share the same name.",
    analogy: "Like writing FRAGILE on a box. The word does nothing by itself. It tells whoever handles it how to treat that box. Every box with the same word gets treated the same way.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html":
          '<p class="tag">I have the class</p>\n<p>I do not</p>\n<p class="tag">I have it too</p>',
        "styles.css":
          ".tag {\n  background: #ffe9d6;\n  border-left: 4px solid #c2410c;\n  padding: 8px 12px;\n}",
      },
      caption: "One rule. Two of these three have the name, so two of them change.",
    },
    proof: "You are about to write a rule for .card and watch the box change.",
  },

  // --- Learn JavaScript by Building a Palengke Price Counter ---

  variable: {
    id: "variable",
    term: "variable",
    definition: "A variable is a named place that remembers a value so you can use it again later.",
    analogy: "Like a labelled jar on a shelf. Write 'price' on the jar, put 25 inside. Anywhere later you say 'price', you get what's in that jar.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "A variable is a name pointing at a value.",
        columns: 2,
        nodes: [
          { id: "name", label: "Name", note: "price", tone: "accent" },
          { id: "value", label: "Value", note: "25", tone: "box" },
        ],
        arrows: [{ from: "name", to: "value" }],
      },
    },
    proof: "You are about to make a variable called price and give it a value.",
  },

  function: {
    id: "function",
    term: "function",
    definition: "A function is a reusable block of steps you can run whenever you need it, by its name.",
    analogy: "Like a recipe card. You write it once. Every time you follow it, you get the same dish, and you can hand it different ingredients each time.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "A function takes an input, does work, and gives back an output.",
        columns: 3,
        nodes: [
          { id: "in", label: "Input", note: "n", tone: "ghost" },
          { id: "body", label: "double(n)", note: "n * 2", tone: "accent" },
          { id: "out", label: "Output", note: "return", tone: "box" },
        ],
        arrows: [
          { from: "in", to: "body" },
          { from: "body", to: "out" },
        ],
      },
    },
    proof: "You are about to write a function and call it with a number.",
  },

  array: {
    id: "array",
    term: "array",
    definition: "An array is a single list that holds many values in order.",
    analogy: "Like a row of sacks at a palengke stall, each one holding a price, all lined up so you can point at the first, second, or third.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "An array holds several values in numbered slots starting at 0.",
        columns: 3,
        nodes: [
          { id: "0", label: "Index 0", note: "25", tone: "accent" },
          { id: "1", label: "Index 1", note: "40", tone: "box" },
          { id: "2", label: "Index 2", note: "15", tone: "box" },
        ],
        arrows: [],
      },
    },
    proof: "You are about to make a list of prices and read one back by its position.",
  },

  loop: {
    id: "loop",
    term: "loop",
    definition: "A loop repeats the same steps once for every item in a list, without you writing them out each time.",
    analogy: "Like a vendor calling out the price of every sack on the table, one by one, using the exact same shout each time.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "A loop runs the same step once for each item in a list.",
        columns: 2,
        nodes: [
          { id: "list", label: "List", note: "[25, 40, 15]", tone: "ghost" },
          { id: "body", label: "console.log(price)", note: "runs 3 times", tone: "accent" },
        ],
        arrows: [{ from: "list", to: "body" }],
      },
    },
    proof: "You are about to print every price in the list using one loop instead of three lines.",
  },

  // --- Learn Tailwind CSS by Building a Turo-Turo Menu Card ---

  "utility-class": {
    id: "utility-class",
    term: "utility class",
    definition: "A utility class is a class name that already has one job built in. Add text-2xl and the browser already knows to make the text big. You do not write a CSS rule yourself.",
    analogy: "Like ordering by number at a carinderia. You do not describe the dish, you say '5', and the cook already knows exactly what that means.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "Two ways to make text big: your own rule, or one ready-made class.",
        columns: 2,
        nodes: [
          { id: "custom", label: "Your own rule", note: "h1 { font-size: 24px; }", tone: "ghost" },
          { id: "utility", label: "Ready-made class", note: "text-2xl", tone: "accent" },
        ],
        arrows: [],
      },
    },
    proof: "Add text-2xl and watch the title grow, with no rule of your own.",
  },

  "justify-between": {
    id: "justify-between",
    term: "justify-between",
    definition: "justify-between pushes the first thing to the start and the last thing to the end, with space in the middle.",
    analogy: "Like two people sitting at opposite ends of a long bench. Whatever bench, however long, one sits at each end.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html":
          '<div style="display:flex;justify-content:space-between;border:1px dashed #999;padding:8px;">\n  <span>Adobo Rice</span>\n  <span>75</span>\n</div>',
        "styles.css": "",
      },
      caption: "The name sits at the left edge, the price at the right, no matter the gap.",
    },
    proof: "You are about to put a name and a price on opposite ends of one row.",
  },

  "state-variant": {
    id: "state-variant",
    term: "state variant",
    definition: "A word before a colon that means 'only when.' hover:bg-orange-50 means: turn the background orange only while the mouse is over it.",
    analogy: "Like a motion-sensor light. It does nothing until someone walks near, then switches on by itself.",
    visual: {
      kind: "diagram",
      diagram: {
        alt: "hover: in front of a class name means the class only applies on hover.",
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
    proof: "You are about to make a row change colour only while the mouse sits on it.",
  },

  "margin-property": {
    id: "margin-property",
    term: "margin",
    definition: "Margin is empty space outside a box.",
    analogy: "Like the clear space around a plate, so it does not touch the next plate.",
    visual: {
      kind: "live-demo",
      files: {
        "index.html": '<div class="label">Receipt</div>',
        "styles.css": ".label { margin: 0 auto; max-width: 120px; border: 1px solid teal; padding: 8px; }",
      },
      caption: "The box has the same empty space on both sides.",
    },
    proof: "You will centre a receipt without changing its width.",
  },

  "flex-container": {
    id: "flex-container",
    term: "flex container",
    definition: "A flex container puts its direct children in a row by default.",
    analogy: "Like placing food trays on one counter instead of stacking them on the floor.",
    visual: {
      kind: "live-demo",
      files: { "index.html": '<div class="row"><span>Adobo</span><strong>85</strong></div>', "styles.css": ".row { display: flex; border: 1px dashed teal; padding: 8px; gap: 12px; }" },
      caption: "The food name and price now sit on one line.",
    },
    proof: "You will put a food name and price on one row.",
  },

  "justify-content": {
    id: "justify-content",
    term: "justify-content",
    definition: "justify-content decides where items sit across a flex row.",
    analogy: "Like choosing where plates go across a long counter.",
    visual: {
      kind: "live-demo",
      files: { "index.html": '<div class="row"><span>Adobo</span><strong>85</strong></div>', "styles.css": ".row { display: flex; justify-content: space-between; border: 1px dashed teal; padding: 8px; }" },
      caption: "The food stays left while the price moves right.",
    },
    proof: "You will put the food and price at opposite sides of a row.",
  },

  "align-items": {
    id: "align-items",
    term: "align-items",
    definition: "align-items lines flex items up from top to bottom.",
    analogy: "Like making different-height food containers sit on the same shelf level.",
    visual: {
      kind: "live-demo",
      files: { "index.html": '<div class="row"><span>Chicken adobo</span><strong>PHP 85</strong></div>', "styles.css": ".row { display: flex; align-items: center; height: 72px; border: 1px dashed teal; padding: 8px; }" },
      caption: "Both parts sit in the middle of the tall row.",
    },
    proof: "You will line up a food name and price in the middle of their row.",
  },

  "line-height": {
    id: "line-height",
    term: "line height",
    definition: "Line height is the room from one line of words to the next.",
    analogy: "Like leaving enough room between lines in a notebook so the words do not crowd.",
    visual: {
      kind: "live-demo",
      files: { "index.html": '<p class="notice">Water returns at 5 PM. Bring a container if you need one.</p>', "styles.css": ".notice { line-height: 1.5; max-width: 220px; border: 1px dashed teal; padding: 8px; }" },
      caption: "The two lines have enough room to read clearly.",
    },
    proof: "You will give a short notice readable space between its lines.",
  },

  "grid-container": {
    id: "grid-container",
    term: "grid container",
    definition: "A grid container arranges its direct children in rows and columns.",
    analogy: "Like putting vegetables into square spaces in a market tray.",
    visual: { kind: "live-demo", files: { "index.html": '<div class="grid"><span>Tomato</span><span>Okra</span><span>Eggplant</span></div>', "styles.css": ".grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; } .grid span { border: 1px dashed teal; padding: 8px; }" }, caption: "The vegetables sit in tidy square spaces." },
    proof: "You will put produce stalls into a grid.",
  },

  "grid-template-columns": {
    id: "grid-template-columns",
    term: "grid template columns",
    definition: "grid-template-columns says how many columns a grid has and how wide they are.",
    analogy: "Like deciding how many baskets fit across one shelf.",
    visual: { kind: "live-demo", files: { "index.html": '<div class="grid"><span>Tomato</span><span>Okra</span><span>Eggplant</span></div>', "styles.css": ".grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; } .grid span { border: 1px dashed teal; padding: 8px; }" }, caption: "Two equal columns share the available room." },
    proof: "You will make two equal spaces for produce stalls.",
  },

  "media-query": {
    id: "media-query",
    term: "media query",
    definition: "A media query changes styles only when the screen matches a rule.",
    analogy: "Like opening another checkout line only when the market gets busy.",
    visual: { kind: "diagram", diagram: { alt: "A narrow screen shows two columns; a wide screen shows three.", columns: 2, nodes: [{ id: "narrow", label: "Narrow", note: "2 columns", tone: "ghost" }, { id: "wide", label: "640px or wider", note: "3 columns", tone: "accent" }], arrows: [{ from: "narrow", to: "wide", label: "screen grows" }] } },
    proof: "You will give a wide screen one more produce column.",
  },

  "inline-block": {
    id: "inline-block",
    term: "inline block",
    definition: "An inline block stays with text but can have box size and padding.",
    analogy: "Like a label stuck in a sentence that still has its own padded shape.",
    visual: { kind: "live-demo", files: { "index.html": '<p>Need help? <a class="link" href="#">Call 117</a></p>', "styles.css": ".link { display: inline-block; background: #b91c1c; color: white; padding: 8px; }" }, caption: "The link sits with the sentence but has padding and a coloured box." },
    proof: "You will give an emergency link a real button-like shape.",
  },

  "focus-visible": {
    id: "focus-visible",
    term: "focus visible",
    definition: "focus-visible styles the item a keyboard user is on.",
    analogy: "Like a bright marker showing which menu item you can choose with the keyboard.",
    visual: { kind: "diagram", diagram: { alt: "A keyboard user tabs to Call 117 and sees a dark outline.", columns: 3, nodes: [{ id: "tab", label: "Tab key", note: "keyboard move", tone: "ghost" }, { id: "link", label: "Call 117", note: "focused link", tone: "accent" }, { id: "outline", label: "Outline", note: "easy to see", tone: "box" }], arrows: [{ from: "tab", to: "link" }, { from: "link", to: "outline" }] } },
    proof: "You will make keyboard focus visible on an emergency link.",
  },

  "constant": {
    id: "constant",
    term: "constant",
    definition: "A constant is a named value you do not plan to change.",
    analogy: "Like writing the official fare on a sign. You can read it many times, but you do not rub it out for each rider.",
    visual: { kind: "diagram", diagram: { alt: "The name fare points to 13 and has a lock symbol.", columns: 2, nodes: [{ id: "name", label: "fare", note: "constant name", tone: "accent" }, { id: "value", label: "13", note: "fixed value", tone: "box" }], arrows: [{ from: "name", to: "value", label: "const" }] } },
    proof: "You will store the official jeepney fare in a constant.",
  },

  "strict-equality": {
    id: "strict-equality",
    term: "strict equality",
    definition: "Three equals signs ask if two values are exactly the same.",
    analogy: "Like checking whether a 13-peso coin amount matches the fare sign exactly, not almost.",
    visual: { kind: "diagram", diagram: { alt: "13 equals 13 gives true; 20 equals 13 gives false.", columns: 3, nodes: [{ id: "amount", label: "amount", note: "13 or 20", tone: "ghost" }, { id: "check", label: "=== fare", note: "exact check", tone: "accent" }, { id: "answer", label: "true / false", note: "answer", tone: "box" }], arrows: [{ from: "amount", to: "check" }, { from: "check", to: "answer" }] } },
    proof: "You will check whether a rider gave the exact fare.",
  },

  "responsive-variant": {
    id: "responsive-variant",
    term: "responsive variant",
    definition: "A responsive variant puts a class into effect only at a chosen screen size.",
    analogy: "Like putting out a bigger sign only when there is enough wall space.",
    visual: { kind: "diagram", diagram: { alt: "Small screen keeps normal text; wider screen applies text-base.", columns: 3, nodes: [{ id: "small", label: "Small screen", note: "normal text", tone: "ghost" }, { id: "prefix", label: "sm:", note: "screen rule", tone: "accent" }, { id: "wide", label: "Wider screen", note: "text-base", tone: "box" }], arrows: [{ from: "small", to: "prefix" }, { from: "prefix", to: "wide" }] } },
    proof: "You will make a status badge change its text size only on a wider screen.",
  },

  "array-includes": {
    id: "array-includes",
    term: "includes",
    definition: "includes asks if a list has one exact thing inside it.",
    analogy: "Like checking a paper waiting list to see whether one name is written there.",
    visual: { kind: "diagram", diagram: { alt: "The queue has Lia, Noel, Pia. Checking Noel gives true.", columns: 3, nodes: [{ id: "list", label: "queue", note: "Lia, Noel, Pia", tone: "ghost" }, { id: "ask", label: "includes(Noel)", note: "search", tone: "accent" }, { id: "answer", label: "true", note: "found", tone: "box" }], arrows: [{ from: "list", to: "ask" }, { from: "ask", to: "answer" }] } },
    proof: "You will check whether Noel is waiting in the queue.",
  },

  "array-index-of": {
    id: "array-index-of",
    term: "indexOf",
    definition: "indexOf gives the number where something first appears in a list.",
    analogy: "Like counting places in a waiting list from zero until you reach a name.",
    visual: { kind: "diagram", diagram: { alt: "Lia is 0, Noel is 1, and Pia is 2 in the queue.", columns: 3, nodes: [{ id: "lia", label: "0", note: "Lia", tone: "ghost" }, { id: "noel", label: "1", note: "Noel", tone: "ghost" }, { id: "pia", label: "2", note: "Pia", tone: "accent" }], arrows: [{ from: "lia", to: "noel" }, { from: "noel", to: "pia" }] } },
    proof: "You will find Pia's number in the queue.",
  },

  "box-sizing": {
    id: "box-sizing",
    term: "box sizing",
    definition: "box-sizing chooses whether padding adds to a box width or stays inside it.",
    analogy: "Like deciding whether the foam around a packed item must fit inside the box or makes the box wider.",
    visual: { kind: "diagram", diagram: { alt: "A 100% field with border-box keeps its padding inside the form edge.", columns: 3, nodes: [{ id: "form", label: "Form", note: "360px wide", tone: "ghost" }, { id: "field", label: "Field", note: "width: 100%", tone: "accent" }, { id: "inside", label: "Padding inside", note: "border-box", tone: "box" }], arrows: [{ from: "form", to: "field" }, { from: "field", to: "inside" }] } },
    proof: "You will keep field padding inside a full-width request form.",
  },

  "object": {
    id: "object",
    term: "object",
    definition: "An object keeps related named values together.",
    analogy: "Like one price tag that has both the item name and its price.",
    visual: { kind: "diagram", diagram: { alt: "One item box has name Coffee and price 12 inside it.", columns: 3, nodes: [{ id: "item", label: "item", note: "one object", tone: "accent" }, { id: "name", label: "name", note: "Coffee", tone: "box" }, { id: "price", label: "price", note: "12", tone: "box" }], arrows: [{ from: "item", to: "name" }, { from: "item", to: "price" }] } },
    proof: "You will keep one sari-sari item name and price together.",
  },

  "property-access": {
    id: "property-access",
    term: "property access",
    definition: "A dot lets you read one named value from an object.",
    analogy: "Like opening the price part of one item's tag instead of reading every detail.",
    visual: { kind: "diagram", diagram: { alt: "item.name points to Coffee and item.price points to 12.", columns: 3, nodes: [{ id: "item", label: "item", note: "object", tone: "ghost" }, { id: "dot", label: ".name", note: "choose field", tone: "accent" }, { id: "coffee", label: "Coffee", note: "result", tone: "box" }], arrows: [{ from: "item", to: "dot" }, { from: "dot", to: "coffee" }] } },
    proof: "You will read a product name and price from one item object.",
  },

  "flex-wrap": {
    id: "flex-wrap",
    term: "flex wrap",
    definition: "flex-wrap lets flex items move to a new line when one row is full.",
    analogy: "Like moving extra service desks to a second row when the counter is full.",
    visual: { kind: "diagram", diagram: { alt: "Wide screen has three service cards in one row; narrow screen moves one card below.", columns: 3, nodes: [{ id: "one", label: "Health", note: "row one", tone: "ghost" }, { id: "two", label: "Permit", note: "row one", tone: "ghost" }, { id: "three", label: "Help", note: "new row if needed", tone: "accent" }], arrows: [{ from: "one", to: "two" }, { from: "two", to: "three", label: "wrap" }] } },
    proof: "You will let a service card move to the next line on a narrow screen.",
  },

  "flex-grow": {
    id: "flex-grow",
    term: "flex grow",
    definition: "flex-grow says how much extra row space an item may take.",
    analogy: "Like giving every service desk an equal share of an empty counter.",
    visual: { kind: "diagram", diagram: { alt: "Three service cards each have flex: 1, so they share the row equally.", columns: 3, nodes: [{ id: "one", label: "1", note: "Health", tone: "accent" }, { id: "two", label: "1", note: "Permit", tone: "accent" }, { id: "three", label: "1", note: "Help", tone: "accent" }], arrows: [] } },
    proof: "You will let each service card share the open row space.",
  },

  "remainder-operator": {
    id: "remainder-operator",
    term: "remainder operator",
    definition: "The percent sign gives what is left after dividing evenly.",
    analogy: "Like sharing 500 pesos among three people and seeing the 2 pesos that do not fit into equal piles.",
    visual: { kind: "diagram", diagram: { alt: "500 split into three equal piles leaves 2 pesos outside the piles.", columns: 3, nodes: [{ id: "total", label: "500", note: "budget", tone: "ghost" }, { id: "groups", label: "3 groups", note: "equal split", tone: "accent" }, { id: "left", label: "2", note: "remainder", tone: "box" }], arrows: [{ from: "total", to: "groups" }, { from: "groups", to: "left" }] } },
    proof: "You will find the pesos left after sharing a budget evenly.",
  },

  "text-align": {
    id: "text-align",
    term: "text align",
    definition: "text-align chooses which side text lines up with inside its box.",
    analogy: "Like choosing which edge of a price tag every number touches.",
    visual: { kind: "diagram", diagram: { alt: "Rice 58 and Eggs 96 have their numbers lined up on the right edge.", columns: 2, nodes: [{ id: "names", label: "Rice / Eggs", note: "left", tone: "ghost" }, { id: "prices", label: "58 / 96", note: "right edge", tone: "accent" }], arrows: [{ from: "names", to: "prices", label: "price row" }] } },
    proof: "You will line up market prices on one right edge.",
  },

  "tabular-numbers": {
    id: "tabular-numbers",
    term: "tabular numbers",
    definition: "Tabular numbers give every digit the same width, so columns look tidy.",
    analogy: "Like putting every coin in the same-size slot in a cash tray.",
    visual: { kind: "diagram", diagram: { alt: "58 and 96 take equal digit spaces and line up in a column.", columns: 2, nodes: [{ id: "normal", label: "58", note: "uneven figures", tone: "ghost" }, { id: "table", label: "96", note: "equal figure widths", tone: "accent" }], arrows: [{ from: "normal", to: "table", label: "tabular-nums" }] } },
    proof: "You will make a market price column easier to scan.",
  },

  "math-round": {
    id: "math-round",
    term: "Math.round",
    definition: "Math.round changes a decimal to the nearest whole number.",
    analogy: "Like choosing the closest whole peso when you cannot give centavos.",
    visual: { kind: "diagram", diagram: { alt: "83.6 moves up to 84 because it is closer to 84.", columns: 3, nodes: [{ id: "raw", label: "83.6", note: "decimal", tone: "ghost" }, { id: "round", label: "Math.round", note: "nearest", tone: "accent" }, { id: "whole", label: "84", note: "whole peso", tone: "box" }], arrows: [{ from: "raw", to: "round" }, { from: "round", to: "whole" }] } },
    proof: "You will round a decimal fare to the nearest peso.",
  },

  "math-floor": {
    id: "math-floor",
    term: "Math.floor",
    definition: "Math.floor drops the decimal and goes down to the lower whole number.",
    analogy: "Like stepping down to the whole floor below, never up to the next floor.",
    visual: { kind: "diagram", diagram: { alt: "83.6 goes down to 83 with Math.floor.", columns: 3, nodes: [{ id: "raw", label: "83.6", note: "decimal", tone: "ghost" }, { id: "floor", label: "Math.floor", note: "down", tone: "accent" }, { id: "whole", label: "83", note: "lower peso", tone: "box" }], arrows: [{ from: "raw", to: "floor" }, { from: "floor", to: "whole" }] } },
    proof: "You will find the whole-peso fare below a decimal amount.",
  },

  "string-trim": {
    id: "string-trim",
    term: "trim",
    definition: "trim removes empty space at the start and end of text.",
    analogy: "Like cutting the blank edges off a name label while keeping the name itself.",
    visual: { kind: "diagram", diagram: { alt: "Two blank spaces, Ana, two blank spaces becomes Ana.", columns: 3, nodes: [{ id: "raw", label: "  Ana  ", note: "extra edges", tone: "ghost" }, { id: "trim", label: "trim()", note: "clean", tone: "accent" }, { id: "clean", label: "Ana", note: "result", tone: "box" }], arrows: [{ from: "raw", to: "trim" }, { from: "trim", to: "clean" }] } },
    proof: "You will clean unwanted spaces from a typed name.",
  },

  "string-uppercase": {
    id: "string-uppercase",
    term: "toUpperCase",
    definition: "toUpperCase changes letters to capital letters.",
    analogy: "Like rewriting a name on a form with capital letters for easy reading.",
    visual: { kind: "diagram", diagram: { alt: "Ana becomes ANA after toUpperCase.", columns: 3, nodes: [{ id: "name", label: "Ana", note: "mixed case", tone: "ghost" }, { id: "upper", label: "toUpperCase()", note: "capitalise", tone: "accent" }, { id: "result", label: "ANA", note: "uppercase", tone: "box" }], arrows: [{ from: "name", to: "upper" }, { from: "upper", to: "result" }] } },
    proof: "You will make a cleaned name easier to read on a list.",
  },

  "css-custom-property": {
    id: "css-custom-property",
    term: "custom property",
    definition: "A custom property is a CSS value with a name you can reuse.",
    analogy: "Like writing the official teal paint name on a label so every sign uses the same colour.",
    visual: { kind: "diagram", diagram: { alt: "The name --barangay-teal points to one teal colour value.", columns: 2, nodes: [{ id: "name", label: "--barangay-teal", note: "name", tone: "accent" }, { id: "value", label: "#0f766e", note: "colour", tone: "box" }], arrows: [{ from: "name", to: "value" }] } },
    proof: "You will name the holiday note's teal colour once.",
  },

  "css-var": {
    id: "css-var",
    term: "var function",
    definition: "var reads a named custom property and uses its value.",
    analogy: "Like asking for the paint can by its label instead of mixing teal again.",
    visual: { kind: "diagram", diagram: { alt: "The note colour uses var(--barangay-teal), which reads the stored teal value.", columns: 3, nodes: [{ id: "rule", label: "color", note: "needs value", tone: "ghost" }, { id: "var", label: "var(...) ", note: "look up", tone: "accent" }, { id: "value", label: "#0f766e", note: "teal", tone: "box" }], arrows: [{ from: "rule", to: "var" }, { from: "var", to: "value" }] } },
    proof: "You will use the same named teal on holiday text.",
  },

  "css-transition": {
    id: "css-transition",
    term: "transition",
    definition: "A transition makes one CSS value change smoothly over a short time.",
    analogy: "Like moving a paper note gently instead of teleporting it to a new spot.",
    visual: { kind: "diagram", diagram: { alt: "An alert card starts still, then moves a tiny bit over 150 milliseconds.", columns: 3, nodes: [{ id: "start", label: "Still", note: "start", tone: "ghost" }, { id: "move", label: "150ms", note: "transition", tone: "accent" }, { id: "end", label: "2px up", note: "end", tone: "box" }], arrows: [{ from: "start", to: "move" }, { from: "move", to: "end" }] } },
    proof: "You will make a small transform change feel smooth.",
  },

  "css-transform": {
    id: "css-transform",
    term: "transform",
    definition: "transform moves, turns, or scales an element without changing its layout space.",
    analogy: "Like lifting a paper card a little above the table without moving the table slots around it.",
    visual: { kind: "diagram", diagram: { alt: "A card moves up two pixels while its empty layout spot stays in place.", columns: 2, nodes: [{ id: "slot", label: "Layout slot", note: "stays", tone: "ghost" }, { id: "card", label: "Card", note: "-2px up", tone: "accent" }], arrows: [{ from: "slot", to: "card", label: "transform" }] } },
    proof: "You will lift an alert card with a transform-only hover effect.",
  },

  "prefers-reduced-motion": {
    id: "prefers-reduced-motion",
    term: "prefers reduced motion",
    definition: "This setting tells a site that a person wants less movement on screen.",
    analogy: "Like using quiet mode on a phone so it does less extra activity.",
    visual: { kind: "diagram", diagram: { alt: "Normal setting allows a small movement; reduced motion keeps the card still.", columns: 2, nodes: [{ id: "normal", label: "Normal", note: "small movement", tone: "ghost" }, { id: "reduce", label: "Reduced motion", note: "still card", tone: "accent" }], arrows: [{ from: "normal", to: "reduce", label: "preference" }] } },
    proof: "You will keep an alert still for people who choose less motion.",
  },

  "array-filter": {
    id: "array-filter",
    term: "filter",
    definition: "filter makes a new list containing only the items that pass a check.",
    analogy: "Like keeping only the empty shelf labels when checking a store.",
    visual: { kind: "diagram", diagram: { alt: "Stocks 3, 0, 5 go through an isSoldOut check and only 0 remains.", columns: 3, nodes: [{ id: "all", label: "3, 0, 5", note: "all stock", tone: "ghost" }, { id: "check", label: "isSoldOut", note: "stock is 0", tone: "accent" }, { id: "kept", label: "0", note: "sold out", tone: "box" }], arrows: [{ from: "all", to: "check" }, { from: "check", to: "kept" }] } },
    proof: "You will make a list containing only sold-out stock counts.",
  },

  "array-map": {
    id: "array-map",
    term: "map",
    definition: "map makes a new list by changing every item in an old list.",
    analogy: "Like making a new price sheet where every old price gets 10 pesos added.",
    visual: { kind: "diagram", diagram: { alt: "Prices 40, 70, 55 go through addTen and become 50, 80, 65.", columns: 3, nodes: [{ id: "old", label: "40, 70, 55", note: "old prices", tone: "ghost" }, { id: "rule", label: "addTen", note: "each item", tone: "accent" }, { id: "new", label: "50, 80, 65", note: "new prices", tone: "box" }], arrows: [{ from: "old", to: "rule" }, { from: "rule", to: "new" }] } },
    proof: "You will make a new price list with 10 added to every price.",
  },

  "text-transform": {
    id: "text-transform",
    term: "text transform",
    definition: "text-transform changes the letter shape without changing the words you wrote.",
    analogy: "Like using block letters on a sign while the message stays the same.",
    visual: { kind: "diagram", diagram: { alt: "Community update displays as COMMUNITY UPDATE.", columns: 2, nodes: [{ id: "normal", label: "Community update", note: "written text", tone: "ghost" }, { id: "upper", label: "COMMUNITY UPDATE", note: "displayed text", tone: "accent" }], arrows: [{ from: "normal", to: "upper", label: "uppercase" }] } },
    proof: "You will make a small update label look like a clear announcement label.",
  },

  "letter-spacing": {
    id: "letter-spacing",
    term: "letter spacing",
    definition: "Letter spacing adds or removes space between letters.",
    analogy: "Like leaving a tiny gap between stamped letters on a notice.",
    visual: { kind: "diagram", diagram: { alt: "UPDATE with small spaces between letters looks like a label.", columns: 2, nodes: [{ id: "tight", label: "UPDATE", note: "normal", tone: "ghost" }, { id: "spaced", label: "U P D A T E", note: "extra gap", tone: "accent" }], arrows: [{ from: "tight", to: "spaced", label: "spacing" }] } },
    proof: "You will add a small readable gap to a capital-letter label.",
  },

  "tracking-utility": {
    id: "tracking-utility",
    term: "tracking utility",
    definition: "A tracking utility changes the space between letters with one class name.",
    analogy: "Like choosing a label stamp that leaves a small gap between letters.",
    visual: { kind: "diagram", diagram: { alt: "Clinic hours changes from close letters to letters with a small gap.", columns: 2, nodes: [{ id: "plain", label: "CLINIC HOURS", note: "normal", tone: "ghost" }, { id: "wide", label: "C L I N I C H O U R S", note: "tracking-wide", tone: "accent" }], arrows: [{ from: "plain", to: "wide", label: "tracking" }] } },
    proof: "You will add a small gap between clinic label letters.",
  },

  "css-clamp": {
    id: "css-clamp",
    term: "clamp",
    definition: "clamp lets a size grow and shrink but never below or above limits you choose.",
    analogy: "Like a folding sign that can grow with the wall space but cannot become too small or too huge.",
    visual: { kind: "diagram", diagram: { alt: "Heading size starts at 24px, can follow the screen, and stops at 48px.", columns: 3, nodes: [{ id: "min", label: "24px", note: "minimum", tone: "ghost" }, { id: "fluid", label: "5vw", note: "flexible", tone: "accent" }, { id: "max", label: "48px", note: "maximum", tone: "box" }], arrows: [{ from: "min", to: "fluid" }, { from: "fluid", to: "max" }] } },
    proof: "You will make an announcement heading adapt without getting too small or too large.",
  },

  "ch-unit": {
    id: "ch-unit",
    term: "ch unit",
    definition: "The ch unit is roughly the width of one character in the current font.",
    analogy: "Like measuring a line by about how many letters can fit on it.",
    visual: { kind: "diagram", diagram: { alt: "A 20ch heading box fits about twenty character widths on one line.", columns: 2, nodes: [{ id: "letters", label: "20 characters", note: "reading measure", tone: "ghost" }, { id: "box", label: "20ch", note: "max width", tone: "accent" }], arrows: [{ from: "letters", to: "box" }] } },
    proof: "You will keep an announcement heading at a readable line length.",
  },

  "array-reduce": {
    id: "array-reduce",
    term: "reduce",
    definition: "reduce combines every item in a list into one result.",
    analogy: "Like adding coins from each donation box into one total jar.",
    visual: { kind: "diagram", diagram: { alt: "Donations 50, 100, and 25 combine into one total of 175.", columns: 3, nodes: [{ id: "list", label: "50, 100, 25", note: "donations", tone: "ghost" }, { id: "add", label: "add", note: "combine", tone: "accent" }, { id: "total", label: "175", note: "one total", tone: "box" }], arrows: [{ from: "list", to: "add" }, { from: "add", to: "total" }] } },
    proof: "You will combine several donations into one total.",
  },

  "array-join": {
    id: "array-join",
    term: "join",
    definition: "join connects all items in a list into one piece of text.",
    analogy: "Like putting two words on one barangay notice line with a space between them.",
    visual: { kind: "diagram", diagram: { alt: "Flood and warning join with a space to make Flood warning.", columns: 3, nodes: [{ id: "words", label: "Flood, warning", note: "list", tone: "ghost" }, { id: "space", label: "space", note: "separator", tone: "accent" }, { id: "notice", label: "Flood warning", note: "text", tone: "box" }], arrows: [{ from: "words", to: "space" }, { from: "space", to: "notice" }] } },
    proof: "You will join two notice words with a space.",
  },

  "object-keys": {
    id: "object-keys",
    term: "object keys",
    definition: "Object.keys makes a list of the names used for details in an object.",
    analogy: "Like reading the labels on two drawers before opening them.",
    visual: { kind: "diagram", diagram: { alt: "A contact has office and phone details, and Object.keys makes a list with those two names.", columns: 3, nodes: [{ id: "contact", label: "contact", note: "office, phone", tone: "ghost" }, { id: "keys", label: "Object.keys", note: "read names", tone: "accent" }, { id: "list", label: "office, phone", note: "array", tone: "box" }], arrows: [{ from: "contact", to: "keys" }, { from: "keys", to: "list" }] } },
    proof: "You will list the detail names in a contact.",
  },

  "object-values": {
    id: "object-values",
    term: "object values",
    definition: "Object.values makes a list of the details stored in an object.",
    analogy: "Like opening two labelled drawers and listing what is inside them.",
    visual: { kind: "diagram", diagram: { alt: "A shelter has Mila and 40 as details, and Object.values makes a list with those two values.", columns: 3, nodes: [{ id: "shelter", label: "shelter", note: "Mila, 40", tone: "ghost" }, { id: "values", label: "Object.values", note: "read details", tone: "accent" }, { id: "list", label: "Mila, 40", note: "array", tone: "box" }], arrows: [{ from: "shelter", to: "values" }, { from: "values", to: "list" }] } },
    proof: "You will list the lead and seat count from a shelter.",
  },

  "object-entries": {
    id: "object-entries",
    term: "object entries",
    definition: "Object.entries makes pairs from each name and detail in an object.",
    analogy: "Like making small name tags. Each tag keeps a label and its matching detail together.",
    visual: { kind: "diagram", diagram: { alt: "Clinic hours have open with 8 AM and close with 5 PM. Object.entries makes two pairs.", columns: 3, nodes: [{ id: "hours", label: "hours", note: "open, close", tone: "ghost" }, { id: "entries", label: "Object.entries", note: "make pairs", tone: "accent" }, { id: "pairs", label: "open + 8 AM", note: "pair", tone: "box" }], arrows: [{ from: "hours", to: "entries" }, { from: "entries", to: "pairs" }] } },
    proof: "You will make pairs from clinic hour names and times.",
  },

  "object-property-update": {
    id: "object-property-update",
    term: "object property update",
    definition: "You can change one detail in an object by giving its dot name a new value.",
    analogy: "Like changing Draft to Ready on one line of a permit form.",
    visual: { kind: "diagram", diagram: { alt: "A permit status changes from Draft to Ready while its name stays Ari.", columns: 3, nodes: [{ id: "permit", label: "permit", note: "Ari, Draft", tone: "ghost" }, { id: "update", label: ".status = Ready", note: "change one", tone: "accent" }, { id: "ready", label: "permit", note: "Ari, Ready", tone: "box" }], arrows: [{ from: "permit", to: "update" }, { from: "update", to: "ready" }] } },
    proof: "You will change a permit from Draft to Ready.",
  },

  "for-in-loop": {
    id: "for-in-loop",
    term: "for...in loop",
    definition: "A for...in loop gives you each named detail in an object, one at a time.",
    analogy: "Like reading each label on a barangay desk board, one after another.",
    visual: { kind: "diagram", diagram: { alt: "A desk object sends health then permit through a for...in loop.", columns: 3, nodes: [{ id: "desks", label: "desks", note: "health, permit", tone: "ghost" }, { id: "loop", label: "for...in", note: "each name", tone: "accent" }, { id: "name", label: "health", note: "then permit", tone: "box" }], arrows: [{ from: "desks", to: "loop" }, { from: "loop", to: "name" }] } },
    proof: "You will print each desk name from one object.",
  },

  "bracket-notation": {
    id: "bracket-notation",
    term: "bracket notation",
    definition: "Bracket notation reads an object detail by putting its name in square brackets.",
    analogy: "Like using the health label to open the matching drawer on a desk board.",
    visual: { kind: "diagram", diagram: { alt: "desks with health in square brackets gives the number 117.", columns: 3, nodes: [{ id: "desks", label: "desks", note: "health: 117", tone: "ghost" }, { id: "brackets", label: "[health]", note: "choose label", tone: "accent" }, { id: "number", label: "117", note: "result", tone: "box" }], arrows: [{ from: "desks", to: "brackets" }, { from: "brackets", to: "number" }] } },
    proof: "You will read the health desk number with square brackets.",
  },

  "array-destructuring": {
    id: "array-destructuring",
    term: "array destructuring",
    definition: "Array destructuring takes list items into named variables in one step.",
    analogy: "Like giving each hotline number its own labelled card as you take it from a list.",
    visual: { kind: "diagram", diagram: { alt: "A list with 117 and 911 becomes health 117 and emergency 911.", columns: 3, nodes: [{ id: "list", label: "117, 911", note: "hotlines", tone: "ghost" }, { id: "pattern", label: "[health, emergency]", note: "unpack", tone: "accent" }, { id: "names", label: "health, emergency", note: "named values", tone: "box" }], arrows: [{ from: "list", to: "pattern" }, { from: "pattern", to: "names" }] } },
    proof: "You will put each hotline number into its own name.",
  },

  "array-is-array": {
    id: "array-is-array",
    term: "array check",
    definition: "Array.isArray tells you whether a value is a list.",
    analogy: "Like checking if a folder holds a list of service cards before using it.",
    visual: { kind: "diagram", diagram: { alt: "A list with Health and Permit goes into Array.isArray and gets the answer true.", columns: 3, nodes: [{ id: "list", label: "Health, Permit", note: "array", tone: "ghost" }, { id: "check", label: "Array.isArray", note: "check", tone: "accent" }, { id: "answer", label: "true", note: "is a list", tone: "box" }], arrows: [{ from: "list", to: "check" }, { from: "check", to: "answer" }] } },
    proof: "You will check whether service names are a list.",
  },

  "array-find": {
    id: "array-find",
    term: "find",
    definition: "find gives you the first item in a list that passes a check.",
    analogy: "Like looking through a contact board until you reach the Help desk card.",
    visual: { kind: "diagram", diagram: { alt: "Three desk names pass through an isHelp check; Help desk is kept.", columns: 3, nodes: [{ id: "list", label: "three desks", note: "contacts", tone: "ghost" }, { id: "check", label: "isHelp", note: "check each", tone: "accent" }, { id: "match", label: "Help desk", note: "first match", tone: "box" }], arrows: [{ from: "list", to: "check" }, { from: "check", to: "match" }] } },
    proof: "You will find one contact name from a list.",
  },

  "array-some": {
    id: "array-some",
    term: "some",
    definition: "some checks whether at least one item in a list passes a test.",
    analogy: "Like checking if at least one shelf in a store is empty.",
    visual: { kind: "diagram", diagram: { alt: "Stock counts 4, 0, and 2 go through isSoldOut and the answer is true because 0 is sold out.", columns: 3, nodes: [{ id: "list", label: "4, 0, 2", note: "stock", tone: "ghost" }, { id: "check", label: "isSoldOut", note: "check each", tone: "accent" }, { id: "answer", label: "true", note: "one matches", tone: "box" }], arrows: [{ from: "list", to: "check" }, { from: "check", to: "answer" }] } },
    proof: "You will check whether any stock count is sold out.",
  },

  "text-decoration-thickness": {
    id: "text-decoration-thickness",
    term: "underline thickness",
    definition: "Underline thickness controls how wide an underline line looks.",
    analogy: "Like choosing a thin or thick pen for a line under a notice.",
    visual: { kind: "diagram", diagram: { alt: "The same notice link has a thin underline, then a clear 2-pixel underline.", columns: 2, nodes: [{ id: "thin", label: "thin line", note: "default", tone: "ghost" }, { id: "clear", label: "2px line", note: "visible", tone: "accent" }], arrows: [{ from: "thin", to: "clear", label: "thickness" }] } },
    proof: "You will make a notice link underline easier to see.",
  },

  "text-underline-offset": {
    id: "text-underline-offset",
    term: "underline offset",
    definition: "Underline offset moves the underline farther from the letters.",
    analogy: "Like leaving a small space between a signature and the line below it.",
    visual: { kind: "diagram", diagram: { alt: "A link underline moves four pixels down from the letters.", columns: 2, nodes: [{ id: "text", label: "Read notice", note: "words", tone: "ghost" }, { id: "line", label: "underline", note: "4px below", tone: "accent" }], arrows: [{ from: "text", to: "line", label: "offset" }] } },
    proof: "You will give a notice link underline some space from its words.",
  },

  "array-every": {
    id: "array-every",
    term: "every",
    definition: "every checks that all items in a list pass a test.",
    analogy: "Like checking that every payment slip has an amount on it.",
    visual: { kind: "diagram", diagram: { alt: "Payments 20, 50, and 35 go through isPaid and the answer is true because all are above zero.", columns: 3, nodes: [{ id: "list", label: "20, 50, 35", note: "payments", tone: "ghost" }, { id: "check", label: "isPaid", note: "check all", tone: "accent" }, { id: "answer", label: "true", note: "all pass", tone: "box" }], arrows: [{ from: "list", to: "check" }, { from: "check", to: "answer" }] } },
    proof: "You will check that every payment has a positive amount.",
  },

  "object-destructuring": {
    id: "object-destructuring",
    term: "object destructuring",
    definition: "Object destructuring takes named details into variables in one step.",
    analogy: "Like taking contact cards from a folder and giving each one a label.",
    visual: { kind: "diagram", diagram: { alt: "An emergency card with Mia and 911 becomes contact Mia and number 911.", columns: 3, nodes: [{ id: "card", label: "emergency", note: "Mia, 911", tone: "ghost" }, { id: "pattern", label: "{ contact, number }", note: "unpack", tone: "accent" }, { id: "names", label: "contact, number", note: "named values", tone: "box" }], arrows: [{ from: "card", to: "pattern" }, { from: "pattern", to: "names" }] } },
    proof: "You will put emergency details into two named variables.",
  },

  "default-parameter": {
    id: "default-parameter",
    term: "default parameter",
    definition: "A default parameter gives a function a value when none is sent.",
    analogy: "Like greeting a visitor as Neighbor when they did not share a name.",
    visual: { kind: "diagram", diagram: { alt: "welcome with Mia says Welcome, Mia. welcome with no name says Welcome, Neighbor.", columns: 3, nodes: [{ id: "call", label: "welcome()", note: "no name", tone: "ghost" }, { id: "fallback", label: "name = Neighbor", note: "default", tone: "accent" }, { id: "message", label: "Welcome, Neighbor", note: "result", tone: "box" }], arrows: [{ from: "call", to: "fallback" }, { from: "fallback", to: "message" }] } },
    proof: "You will make a welcome work with or without a name.",
  },

  "object-has-own": {
    id: "object-has-own",
    term: "own property check",
    definition: "Object.hasOwn checks if an object has one named detail.",
    analogy: "Like checking if a service board has a health card on it.",
    visual: { kind: "diagram", diagram: { alt: "A service board with health and permit is checked for health and answers true.", columns: 3, nodes: [{ id: "board", label: "services", note: "health, permit", tone: "ghost" }, { id: "check", label: "hasOwn(health)", note: "look up", tone: "accent" }, { id: "answer", label: "true", note: "present", tone: "box" }], arrows: [{ from: "board", to: "check" }, { from: "check", to: "answer" }] } },
    proof: "You will check if health is on the service board.",
  },

  "spread-syntax": {
    id: "spread-syntax",
    term: "spread syntax",
    definition: "Spread syntax takes items out of a list into a new list.",
    analogy: "Like taking names from two shift sheets and placing them on one roster.",
    visual: { kind: "diagram", diagram: { alt: "Mia and Ari from one list plus Noel from another make one three-name roster.", columns: 3, nodes: [{ id: "weekday", label: "Mia, Ari", note: "weekday", tone: "ghost" }, { id: "spread", label: "...", note: "unpack", tone: "accent" }, { id: "roster", label: "Mia, Ari, Noel", note: "roster", tone: "box" }], arrows: [{ from: "weekday", to: "spread" }, { from: "spread", to: "roster" }] } },
    proof: "You will combine two volunteer lists into one roster.",
  },

  "number-conversion": {
    id: "number-conversion",
    term: "number conversion",
    definition: "Number turns number-like text into a number value.",
    analogy: "Like reading the digits on a donation slip as an amount you can add.",
    visual: { kind: "diagram", diagram: { alt: "Text 125 goes through Number and becomes the number 125.", columns: 3, nodes: [{ id: "text", label: "125", note: "text", tone: "ghost" }, { id: "number", label: "Number()", note: "convert", tone: "accent" }, { id: "value", label: "125", note: "number", tone: "box" }], arrows: [{ from: "text", to: "number" }, { from: "number", to: "value" }] } },
    proof: "You will turn donation text into a number to compare.",
  },

  "text-includes": {
    id: "text-includes",
    term: "text includes check",
    definition: "Text includes checks if letters or a word appear inside text.",
    analogy: "Like checking if a visitor line on a logbook contains one name.",
    visual: { kind: "diagram", diagram: { alt: "Mila Santos goes through an includes Mila check and answers true.", columns: 3, nodes: [{ id: "name", label: "Mila Santos", note: "visitor", tone: "ghost" }, { id: "check", label: "includes(Mila)", note: "search text", tone: "accent" }, { id: "answer", label: "true", note: "found", tone: "box" }], arrows: [{ from: "name", to: "check" }, { from: "check", to: "answer" }] } },
    proof: "You will check if Mila appears in a visitor name.",
  },

  "array-sort": {
    id: "array-sort",
    term: "sort",
    definition: "sort puts list items into an order.",
    analogy: "Like arranging supply cards by their names before counting them.",
    visual: { kind: "diagram", diagram: { alt: "Water, Rice, and Blanket go through sort and become Blanket, Rice, Water.", columns: 3, nodes: [{ id: "before", label: "Water, Rice, Blanket", note: "before", tone: "ghost" }, { id: "sort", label: "sort()", note: "order", tone: "accent" }, { id: "after", label: "Blanket, Rice, Water", note: "after", tone: "box" }], arrows: [{ from: "before", to: "sort" }, { from: "sort", to: "after" }] } },
    proof: "You will sort three supply names into letter order.",
  },

  "arrow-function": {
    id: "arrow-function",
    term: "arrow function",
    definition: "An arrow function is a short way to make a function.",
    analogy: "Like a short sign that points straight from a request to an answer.",
    visual: { kind: "diagram", diagram: { alt: "Empty brackets and an arrow point to the Clean-up day message.", columns: 3, nodes: [{ id: "call", label: "announce()", note: "call", tone: "ghost" }, { id: "arrow", label: "() =>", note: "function", tone: "accent" }, { id: "message", label: "Clean-up day", note: "result", tone: "box" }], arrows: [{ from: "call", to: "arrow" }, { from: "arrow", to: "message" }] } },
    proof: "You will make an arrow function for an event message.",
  },

  "rest-parameter": {
    id: "rest-parameter",
    term: "rest parameter",
    definition: "A rest parameter gathers many function inputs into one list.",
    analogy: "Like collecting every attendee name handed to a registration desk into one list.",
    visual: { kind: "diagram", diagram: { alt: "Mia, Ari, and Noel go into ...names and become one three-name list.", columns: 3, nodes: [{ id: "names", label: "Mia, Ari, Noel", note: "arguments", tone: "ghost" }, { id: "rest", label: "...names", note: "gather", tone: "accent" }, { id: "list", label: "three names", note: "array", tone: "box" }], arrows: [{ from: "names", to: "rest" }, { from: "rest", to: "list" }] } },
    proof: "You will count however many attendee names are given.",
  },
  "array-for-each": {
    id: "array-for-each", term: "forEach", definition: "forEach runs the same action for every list item.", analogy: "Like reading each reminder card aloud, one after another.", visual: { kind: "diagram", diagram: { alt: "Two reminder cards go through forEach and both get printed.", columns: 3, nodes: [{ id: "list", label: "two reminders", note: "array", tone: "ghost" }, { id: "loop", label: "forEach", note: "each item", tone: "accent" }, { id: "logs", label: "two logs", note: "printed", tone: "box" }], arrows: [{ from: "list", to: "loop" }, { from: "loop", to: "logs" }] } }, proof: "You will print every event reminder." },
  "array-reverse": {
    id: "array-reverse",
    term: "reverse",
    definition: "reverse flips the order of items in a list.",
    analogy: "Like reading a stack of notice cards from the last card back to the first.",
    visual: { kind: "diagram", diagram: { alt: "Meeting, Cleanup, and Clinic become Clinic, Cleanup, and Meeting after reverse.", columns: 3, nodes: [{ id: "before", label: "Meeting, Cleanup, Clinic", note: "first to last", tone: "ghost" }, { id: "reverse", label: "reverse()", note: "flip order", tone: "accent" }, { id: "after", label: "Clinic, Cleanup, Meeting", note: "last to first", tone: "box" }], arrows: [{ from: "before", to: "reverse" }, { from: "reverse", to: "after" }] } },
    proof: "You will flip the order of three barangay notices.",
  },
  "array-slice": {
    id: "array-slice",
    term: "slice",
    definition: "slice copies a chosen part of a list into a new list.",
    analogy: "Like taking the first two cards from a stack of barangay notices while leaving the stack whole.",
    visual: { kind: "diagram", diagram: { alt: "Meeting, Cleanup, and Clinic go through slice from 0 to 2 and become Meeting and Cleanup.", columns: 3, nodes: [{ id: "all", label: "Meeting, Cleanup, Clinic", note: "three notices", tone: "ghost" }, { id: "slice", label: "slice(0, 2)", note: "copy part", tone: "accent" }, { id: "part", label: "Meeting, Cleanup", note: "first two", tone: "box" }], arrows: [{ from: "all", to: "slice" }, { from: "slice", to: "part" }] } },
    proof: "You will copy the first two notices into a shorter list.",
  },
  "array-concat": {
    id: "array-concat",
    term: "concat",
    definition: "concat joins two lists into one new list.",
    analogy: "Like placing the morning and afternoon notice stacks together in one tray.",
    visual: { kind: "diagram", diagram: { alt: "Two morning tags and one afternoon tag go through concat and become one three-tag list.", columns: 3, nodes: [{ id: "lists", label: "2 tags + 1 tag", note: "two lists", tone: "ghost" }, { id: "concat", label: "concat()", note: "join lists", tone: "accent" }, { id: "joined", label: "3 tags", note: "one list", tone: "box" }], arrows: [{ from: "lists", to: "concat" }, { from: "concat", to: "joined" }] } },
    proof: "You will join two barangay notice lists into one list.",
  },
  "array-flat": {
    id: "array-flat",
    term: "flat",
    definition: "flat opens lists inside a list and puts their items into one level.",
    analogy: "Like emptying two small relief boxes into one larger supply box.",
    visual: { kind: "diagram", diagram: { alt: "A medicine and water list plus a rice list go through flat and become one medicine, water, rice list.", columns: 3, nodes: [{ id: "groups", label: "[Medicine, Water], [Rice]", note: "lists inside", tone: "ghost" }, { id: "flat", label: "flat()", note: "open lists", tone: "accent" }, { id: "one-list", label: "Medicine, Water, Rice", note: "one level", tone: "box" }], arrows: [{ from: "groups", to: "flat" }, { from: "flat", to: "one-list" }] } },
    proof: "You will combine supply groups into one supply list.",
  },
  "array-at": {
    id: "array-at",
    term: "at",
    definition: "at reads one item from a list by its position, including a position from the end.",
    analogy: "Like taking the last notice card from a stack without counting every card first.",
    visual: { kind: "diagram", diagram: { alt: "Meeting, Clinic, Cleanup go through at negative one and return Cleanup, the last item.", columns: 3, nodes: [{ id: "list", label: "Meeting, Clinic, Cleanup", note: "three notices", tone: "ghost" }, { id: "at", label: "at(-1)", note: "last item", tone: "accent" }, { id: "last", label: "Cleanup", note: "latest", tone: "box" }], arrows: [{ from: "list", to: "at" }, { from: "at", to: "last" }] } },
    proof: "You will read the last item in a barangay notice list.",
  },
  "string-starts-with": {
    id: "string-starts-with",
    term: "startsWith",
    definition: "startsWith checks whether text begins with the text you give it.",
    analogy: "Like checking whether a hotline card begins with the area number you need.",
    visual: { kind: "diagram", diagram: { alt: "The hotline 117 goes through startsWith 1 and returns true.", columns: 3, nodes: [{ id: "number", label: "117", note: "hotline", tone: "ghost" }, { id: "check", label: "startsWith(1)", note: "beginning", tone: "accent" }, { id: "answer", label: "true", note: "starts with 1", tone: "box" }], arrows: [{ from: "number", to: "check" }, { from: "check", to: "answer" }] } },
    proof: "You will check how a barangay hotline number begins.",
  },
  "string-ends-with": {
    id: "string-ends-with",
    term: "endsWith",
    definition: "endsWith checks whether text finishes with the text you give it.",
    analogy: "Like checking whether a permit card finishes with the current year.",
    visual: { kind: "diagram", diagram: { alt: "Permit A-2026 goes through endsWith 2026 and returns true.", columns: 3, nodes: [{ id: "permit", label: "A-2026", note: "permit code", tone: "ghost" }, { id: "check", label: "endsWith(2026)", note: "ending", tone: "accent" }, { id: "answer", label: "true", note: "ends with 2026", tone: "box" }], arrows: [{ from: "permit", to: "check" }, { from: "check", to: "answer" }] } },
    proof: "You will check how a barangay permit code ends.",
  },
  "string-replace": {
    id: "string-replace",
    term: "replace",
    definition: "replace makes new text with one matching part changed.",
    analogy: "Like changing an old year on a barangay notice before posting its new version.",
    visual: { kind: "diagram", diagram: { alt: "Meeting 2025 goes through replace 2025 with 2026 and becomes Meeting 2026.", columns: 3, nodes: [{ id: "old", label: "Meeting 2025", note: "old notice", tone: "ghost" }, { id: "replace", label: "replace()", note: "change year", tone: "accent" }, { id: "new", label: "Meeting 2026", note: "new notice", tone: "box" }], arrows: [{ from: "old", to: "replace" }, { from: "replace", to: "new" }] } },
    proof: "You will update a year in a barangay notice.",
  },
  "string-pad-start": {
    id: "string-pad-start",
    term: "padStart",
    definition: "padStart adds text at the beginning until text reaches a chosen length.",
    analogy: "Like adding zeroes before a small ticket number so every barangay queue card has the same width.",
    visual: { kind: "diagram", diagram: { alt: "Ticket 7 goes through padStart to length three with zeroes and becomes 007.", columns: 3, nodes: [{ id: "ticket", label: "7", note: "ticket", tone: "ghost" }, { id: "pad", label: "padStart(3, 0)", note: "add zeroes", tone: "accent" }, { id: "code", label: "007", note: "three digits", tone: "box" }], arrows: [{ from: "ticket", to: "pad" }, { from: "pad", to: "code" }] } },
    proof: "You will format a short barangay queue ticket code.",
  },
  "math-max": {
    id: "math-max",
    term: "Math.max",
    definition: "Math.max gives the largest number from the numbers you give it.",
    analogy: "Like checking every barangay donation slip and keeping the biggest amount.",
    visual: { kind: "diagram", diagram: { alt: "Three donation amounts go through Math.max and return 250, the largest amount.", columns: 3, nodes: [{ id: "amounts", label: "100, 250, 175", note: "donations", tone: "ghost" }, { id: "max", label: "Math.max", note: "largest", tone: "accent" }, { id: "highest", label: "250", note: "highest donation", tone: "box" }], arrows: [{ from: "amounts", to: "max" }, { from: "max", to: "highest" }] } },
    proof: "You will find the largest amount in a barangay donation list.",
  },
  "math-min": {
    id: "math-min",
    term: "Math.min",
    definition: "Math.min gives the smallest number from the numbers you give it.",
    analogy: "Like reading several barangay water-tank levels and noticing the lowest one.",
    visual: { kind: "diagram", diagram: { alt: "Three water levels go through Math.min and return 45, the lowest level.", columns: 3, nodes: [{ id: "levels", label: "80, 45, 60", note: "water levels", tone: "ghost" }, { id: "min", label: "Math.min", note: "smallest", tone: "accent" }, { id: "lowest", label: "45", note: "lowest level", tone: "box" }], arrows: [{ from: "levels", to: "min" }, { from: "min", to: "lowest" }] } },
    proof: "You will find the lowest level in a barangay water-tank list.",
  },
  "math-ceil": {
    id: "math-ceil",
    term: "Math.ceil",
    definition: "Math.ceil moves a number with a decimal up to the next full number.",
    analogy: "If 13 families need five relief packs per box, 2.6 boxes must become 3 full boxes.",
    visual: { kind: "diagram", diagram: { alt: "Thirteen families divided by five packs per box becomes 2.6, then Math.ceil returns three boxes.", columns: 3, nodes: [{ id: "amount", label: "13 / 5 = 2.6", note: "box count", tone: "ghost" }, { id: "ceil", label: "Math.ceil", note: "round up", tone: "accent" }, { id: "boxes", label: "3", note: "full boxes", tone: "box" }], arrows: [{ from: "amount", to: "ceil" }, { from: "ceil", to: "boxes" }] } },
    proof: "You will count enough relief boxes for every barangay family.",
  },
  "math-abs": {
    id: "math-abs",
    term: "Math.abs",
    definition: "Math.abs gives a number without its plus or minus sign.",
    analogy: "Like seeing that a barangay desk is short by PHP 23 and keeping only the amount still needed.",
    visual: { kind: "diagram", diagram: { alt: "Negative 23 goes through Math.abs and becomes positive 23.", columns: 3, nodes: [{ id: "difference", label: "-23", note: "short amount", tone: "ghost" }, { id: "abs", label: "Math.abs", note: "remove sign", tone: "accent" }, { id: "amount", label: "23", note: "collect", tone: "box" }], arrows: [{ from: "difference", to: "abs" }, { from: "abs", to: "amount" }] } },
    proof: "You will find the positive amount a barangay desk still needs to collect.",
  },
  "number-is-integer": {
    id: "number-is-integer",
    term: "Number.isInteger",
    definition: "Number.isInteger checks whether a number has no decimal part.",
    analogy: "Like checking whether 18 relief packs fill six-packs of boxes with nothing left over.",
    visual: { kind: "diagram", diagram: { alt: "Eighteen divided by six goes through Number.isInteger and returns true because the result is three with no decimal part.", columns: 3, nodes: [{ id: "count", label: "18 / 6 = 3", note: "box count", tone: "ghost" }, { id: "integer", label: "Number.isInteger", note: "no decimal", tone: "accent" }, { id: "answer", label: "true", note: "whole boxes", tone: "box" }], arrows: [{ from: "count", to: "integer" }, { from: "integer", to: "answer" }] } },
    proof: "You will check whether barangay relief packs fill whole boxes.",
  },
  "number-to-fixed": {
    id: "number-to-fixed",
    term: "toFixed",
    definition: "toFixed makes a number into text with the number of decimal places you choose.",
    analogy: "Like writing 12.50 on a barangay store price tag so every price shows a full money amount clearly.",
    visual: { kind: "diagram", diagram: { alt: "The price 12.5 goes through toFixed with two decimal places and becomes the text 12.50.", columns: 3, nodes: [{ id: "price", label: "12.5", note: "number", tone: "ghost" }, { id: "fixed", label: "toFixed(2)", note: "two decimals", tone: "accent" }, { id: "text", label: "12.50", note: "price text", tone: "box" }], arrows: [{ from: "price", to: "fixed" }, { from: "fixed", to: "text" }] } },
    proof: "You will show a barangay store price with two decimal places.",
  },
  "number-parse-float": {
    id: "number-parse-float",
    term: "Number.parseFloat",
    definition: "Number.parseFloat reads a decimal number from text.",
    analogy: "Like reading 18.75 from a barangay water-meter note so you can compare it as a number.",
    visual: { kind: "diagram", diagram: { alt: "The text 18.75 goes through Number.parseFloat and becomes the number 18.75.", columns: 3, nodes: [{ id: "text", label: "18.75", note: "text", tone: "ghost" }, { id: "parse", label: "Number.parseFloat", note: "read number", tone: "accent" }, { id: "number", label: "18.75", note: "number", tone: "box" }], arrows: [{ from: "text", to: "parse" }, { from: "parse", to: "number" }] } },
    proof: "You will compare a barangay water-meter reading after reading it from text.",
  },
  "string-split": {
    id: "string-split",
    term: "split",
    definition: "split makes a list by separating text wherever it finds the text you choose.",
    analogy: "Like cutting a barangay notice into word cards at each space.",
    visual: { kind: "diagram", diagram: { alt: "Clinic opens Monday goes through split at a space and becomes a three-word list.", columns: 3, nodes: [{ id: "notice", label: "Clinic opens Monday", note: "notice", tone: "ghost" }, { id: "split", label: "split(space)", note: "separate", tone: "accent" }, { id: "words", label: "Clinic, opens, Monday", note: "word list", tone: "box" }], arrows: [{ from: "notice", to: "split" }, { from: "split", to: "words" }] } },
    proof: "You will count the words in a barangay clinic notice.",
  },
  "string-repeat": {
    id: "string-repeat",
    term: "repeat",
    definition: "repeat makes text appear again the number of times you choose.",
    analogy: "Like writing three alert marks beside a barangay flood notice.",
    visual: { kind: "diagram", diagram: { alt: "One alert mark goes through repeat three and becomes three alert marks.", columns: 3, nodes: [{ id: "mark", label: "!", note: "one mark", tone: "ghost" }, { id: "repeat", label: "repeat(3)", note: "three times", tone: "accent" }, { id: "marks", label: "!!!", note: "three marks", tone: "box" }], arrows: [{ from: "mark", to: "repeat" }, { from: "repeat", to: "marks" }] } },
    proof: "You will make an alert banner for a barangay flood notice.",
  },
  "string-substring": {
    id: "string-substring",
    term: "substring",
    definition: "substring reads a section of text between the positions you choose.",
    analogy: "Like reading only the first four letters on a barangay permit code.",
    visual: { kind: "diagram", diagram: { alt: "BRGY-2026-001 goes through substring from zero to four and becomes BRGY.", columns: 3, nodes: [{ id: "code", label: "BRGY-2026-001", note: "permit code", tone: "ghost" }, { id: "substring", label: "substring(0, 4)", note: "first four", tone: "accent" }, { id: "prefix", label: "BRGY", note: "prefix", tone: "box" }], arrows: [{ from: "code", to: "substring" }, { from: "substring", to: "prefix" }] } },
    proof: "You will read the prefix from a barangay permit code.",
  },
  "string-replace-all": {
    id: "string-replace-all",
    term: "replaceAll",
    definition: "replaceAll makes new text by changing every copy of the text you choose.",
    analogy: "Like clearing each double space in a barangay clinic notice before you post it.",
    visual: { kind: "diagram", diagram: { alt: "A clinic notice with double spaces goes through replaceAll and becomes a notice with single spaces.", columns: 3, nodes: [{ id: "notice", label: "Clinic  opens  Monday", note: "extra spaces", tone: "ghost" }, { id: "replace", label: "replaceAll", note: "two spaces to one", tone: "accent" }, { id: "clean", label: "Clinic opens Monday", note: "clean notice", tone: "box" }], arrows: [{ from: "notice", to: "replace" }, { from: "replace", to: "clean" }] } },
    proof: "You will remove extra spaces from a barangay clinic notice.",
  },
  "string-char-at": {
    id: "string-char-at",
    term: "charAt",
    definition: "charAt reads one letter from the text position you choose.",
    analogy: "Like reading only the first letter of a barangay flood notice.",
    visual: { kind: "diagram", diagram: { alt: "Flood alert goes through charAt at zero and returns F, its first letter.", columns: 3, nodes: [{ id: "notice", label: "Flood alert", note: "notice text", tone: "ghost" }, { id: "character", label: "charAt(0)", note: "first position", tone: "accent" }, { id: "letter", label: "F", note: "first letter", tone: "box" }], arrows: [{ from: "notice", to: "character" }, { from: "character", to: "letter" }] } },
    proof: "You will read the first letter of a barangay flood notice.",
  },
  "string-trim-end": {
    id: "string-trim-end",
    term: "trimEnd",
    definition: "trimEnd removes blank spaces at the end of text.",
    analogy: "Like erasing blank space after a barangay clinic notice before you post it.",
    visual: { kind: "diagram", diagram: { alt: "A clinic notice with spaces after Monday goes through trimEnd and keeps only the words.", columns: 3, nodes: [{ id: "notice", label: "Clinic opens Monday", note: "spaces after it", tone: "ghost" }, { id: "trim", label: "trimEnd", note: "clear end", tone: "accent" }, { id: "clean", label: "Clinic opens Monday", note: "no extra end spaces", tone: "box" }], arrows: [{ from: "notice", to: "trim" }, { from: "trim", to: "clean" }] } },
    proof: "You will remove spaces after a barangay clinic notice.",
  },
  "string-trim-start": {
    id: "string-trim-start",
    term: "trimStart",
    definition: "trimStart removes blank spaces at the start of text.",
    analogy: "Like erasing blank space before a barangay clinic notice before you post it.",
    visual: { kind: "diagram", diagram: { alt: "A clinic notice with spaces before Clinic goes through trimStart and keeps only the words.", columns: 3, nodes: [{ id: "notice", label: "Clinic opens Monday", note: "spaces before it", tone: "ghost" }, { id: "trim", label: "trimStart", note: "clear start", tone: "accent" }, { id: "clean", label: "Clinic opens Monday", note: "no extra start spaces", tone: "box" }], arrows: [{ from: "notice", to: "trim" }, { from: "trim", to: "clean" }] } },
    proof: "You will remove spaces before a barangay clinic notice.",
  },
  "string-to-lower-case": {
    id: "string-to-lower-case",
    term: "toLowerCase",
    definition: "toLowerCase changes every letter in text to a small letter.",
    analogy: "Like rewriting a capital-letter barangay clinic notice with smaller letters.",
    visual: { kind: "diagram", diagram: { alt: "A capital-letter clinic notice goes through toLowerCase and becomes a small-letter notice.", columns: 3, nodes: [{ id: "notice", label: "CLINIC OPENS MONDAY", note: "capital letters", tone: "ghost" }, { id: "lower", label: "toLowerCase", note: "make small", tone: "accent" }, { id: "quiet", label: "clinic opens monday", note: "small letters", tone: "box" }], arrows: [{ from: "notice", to: "lower" }, { from: "lower", to: "quiet" }] } },
    proof: "You will change a barangay clinic notice to small letters.",
  },
  "string-last-index-of": {
    id: "string-last-index-of",
    term: "lastIndexOf",
    definition: "lastIndexOf finds the place where text appears for the last time.",
    analogy: "Like finding the last space between words on a barangay clinic notice.",
    visual: { kind: "diagram", diagram: { alt: "Clinic opens Monday goes through lastIndexOf for a space and returns 12, the place of its last space.", columns: 3, nodes: [{ id: "notice", label: "Clinic opens Monday", note: "notice text", tone: "ghost" }, { id: "last", label: "lastIndexOf(space)", note: "last space", tone: "accent" }, { id: "place", label: "12", note: "last-space place", tone: "box" }], arrows: [{ from: "notice", to: "last" }, { from: "last", to: "place" }] } },
    proof: "You will find the last space in a barangay clinic notice.",
  },
  "array-from": {
    id: "array-from",
    term: "Array.from",
    definition: "Array.from makes a list from each letter in a piece of text.",
    analogy: "Like putting each letter of a barangay flood notice onto its own card.",
    visual: { kind: "diagram", diagram: { alt: "Flood goes through Array.from and becomes a list with F, l, o, o, and d.", columns: 3, nodes: [{ id: "notice", label: "Flood", note: "notice text", tone: "ghost" }, { id: "from", label: "Array.from", note: "make list", tone: "accent" }, { id: "letters", label: "F, l, o, o, d", note: "letter list", tone: "box" }], arrows: [{ from: "notice", to: "from" }, { from: "from", to: "letters" }] } },
    proof: "You will make a list from the letters of a barangay flood notice.",
  },
  "array-fill": {
    id: "array-fill",
    term: "fill",
    definition: "fill replaces every item in a list with the value you choose.",
    analogy: "Like writing Taken on every seat label for a barangay meeting.",
    visual: { kind: "diagram", diagram: { alt: "Three Open seat labels go through fill with Taken and become three Taken labels.", columns: 3, nodes: [{ id: "seats", label: "Open, Open, Open", note: "seat labels", tone: "ghost" }, { id: "fill", label: "fill(Taken)", note: "every spot", tone: "accent" }, { id: "taken", label: "Taken, Taken, Taken", note: "updated seats", tone: "box" }], arrows: [{ from: "seats", to: "fill" }, { from: "fill", to: "taken" }] } },
    proof: "You will mark every seat at a barangay meeting as taken.",
  },
  "array-keys": {
    id: "array-keys",
    term: "keys",
    definition: "keys reads the number of every position in a list.",
    analogy: "Like numbering each seat for a barangay meeting from zero onward.",
    visual: { kind: "diagram", diagram: { alt: "The seat labels A, B, and C go through keys and become the seat numbers zero, one, and two.", columns: 3, nodes: [{ id: "seats", label: "A, B, C", note: "seat labels", tone: "ghost" }, { id: "keys", label: "keys()", note: "read positions", tone: "accent" }, { id: "numbers", label: "0, 1, 2", note: "seat numbers", tone: "box" }], arrows: [{ from: "seats", to: "keys" }, { from: "keys", to: "numbers" }] } },
    proof: "You will make a list of seat numbers for a barangay meeting.",
  },
  "array-entries": {
    id: "array-entries",
    term: "entries",
    definition: "entries pairs each list number with the item at that number.",
    analogy: "Like writing each barangay meeting seat number beside its letter label.",
    visual: { kind: "diagram", diagram: { alt: "The seat labels A and B go through entries and become the pairs zero A and one B.", columns: 3, nodes: [{ id: "seats", label: "A, B", note: "seat labels", tone: "ghost" }, { id: "entries", label: "entries()", note: "pair number and label", tone: "accent" }, { id: "pairs", label: "0-A, 1-B", note: "seat pairs", tone: "box" }], arrows: [{ from: "seats", to: "entries" }, { from: "entries", to: "pairs" }] } },
    proof: "You will make seat number-and-label pairs for a barangay meeting.",
  },
  "array-shift": {
    id: "array-shift",
    term: "shift",
    definition: "shift removes and returns the first item in a list.",
    analogy: "Like calling the first person from a barangay meeting seat list and crossing out that name.",
    visual: { kind: "diagram", diagram: { alt: "Ana, Ben, and Cia go through shift; Ana is returned and Ben and Cia remain in the list.", columns: 3, nodes: [{ id: "seats", label: "Ana, Ben, Cia", note: "seat list", tone: "ghost" }, { id: "shift", label: "shift()", note: "take first", tone: "accent" }, { id: "next", label: "Ana", note: "next seat", tone: "box" }], arrows: [{ from: "seats", to: "shift" }, { from: "shift", to: "next" }] } },
    proof: "You will call the first name from a barangay seat list.",
  },
  "array-unshift": {
    id: "array-unshift",
    term: "unshift",
    definition: "unshift adds an item to the start of a list.",
    analogy: "Like adding Ana to the front of a barangay meeting seat list.",
    visual: { kind: "diagram", diagram: { alt: "Ben and Cia go through unshift with Ana and become Ana, Ben, and Cia.", columns: 3, nodes: [{ id: "seats", label: "Ben, Cia", note: "seat list", tone: "ghost" }, { id: "unshift", label: "unshift(Ana)", note: "add to start", tone: "accent" }, { id: "updated", label: "Ana, Ben, Cia", note: "new seat list", tone: "box" }], arrows: [{ from: "seats", to: "unshift" }, { from: "unshift", to: "updated" }] } },
    proof: "You will add Ana to the start of a barangay seat list.",
  },
  "array-pop": {
    id: "array-pop",
    term: "pop",
    definition: "pop removes and returns the last item in a list.",
    analogy: "Like calling the last person from a barangay meeting seat list and crossing out that name.",
    visual: { kind: "diagram", diagram: { alt: "Ana, Ben, and Cia go through pop; Cia is returned and Ana and Ben remain in the list.", columns: 3, nodes: [{ id: "seats", label: "Ana, Ben, Cia", note: "seat list", tone: "ghost" }, { id: "pop", label: "pop()", note: "take last", tone: "accent" }, { id: "last", label: "Cia", note: "last seat", tone: "box" }], arrows: [{ from: "seats", to: "pop" }, { from: "pop", to: "last" }] } },
    proof: "You will call the last name from a barangay seat list.",
  },
  "array-push": {
    id: "array-push",
    term: "push",
    definition: "push adds an item to the end of a list.",
    analogy: "Like adding one person to the end of a barangay meeting seat list.",
    visual: { kind: "diagram", diagram: { alt: "Ana and Ben go through push with Cia; Cia appears at the end of the seat list.", columns: 3, nodes: [{ id: "seats", label: "Ana, Ben", note: "seat list", tone: "ghost" }, { id: "push", label: "push(Cia)", note: "add to end", tone: "accent" }, { id: "joined", label: "Ana, Ben, Cia", note: "new seat list", tone: "box" }], arrows: [{ from: "seats", to: "push" }, { from: "push", to: "joined" }] } },
    proof: "You will add a name to the end of a barangay seat list.",
  },
  "array-splice": {
    id: "array-splice",
    term: "splice",
    definition: "splice can remove an item from a chosen spot in a list.",
    analogy: "Like removing one person from the middle of a barangay meeting seat list.",
    visual: { kind: "diagram", diagram: { alt: "Ana, Ben, and Cia go through splice at Ben's spot; Ana and Cia remain in the seat list.", columns: 3, nodes: [{ id: "seats", label: "Ana, Ben, Cia", note: "seat list", tone: "ghost" }, { id: "splice", label: "splice(1, 1)", note: "remove one", tone: "accent" }, { id: "changed", label: "Ana, Cia", note: "new seat list", tone: "box" }], arrows: [{ from: "seats", to: "splice" }, { from: "splice", to: "changed" }] } },
    proof: "You will remove a name from the middle of a barangay seat list.",
  },
  "array-last-index-of": {
    id: "array-last-index-of",
    term: "lastIndexOf",
    definition: "lastIndexOf gives the final place where an item appears in a list.",
    analogy: "Like checking the final time Ana appears on a barangay meeting seat list.",
    visual: { kind: "diagram", diagram: { alt: "Ana, Ben, and Ana go through lastIndexOf for Ana; the final Ana is at place 2.", columns: 3, nodes: [{ id: "seats", label: "Ana, Ben, Ana", note: "seat list", tone: "ghost" }, { id: "find", label: "lastIndexOf(Ana)", note: "find final place", tone: "accent" }, { id: "place", label: "2", note: "last place", tone: "box" }], arrows: [{ from: "seats", to: "find" }, { from: "find", to: "place" }] } },
    proof: "You will find the final place for a repeated name in a barangay seat list.",
  },
  "array-find-last": {
    id: "array-find-last",
    term: "findLast",
    definition: "findLast returns the final list item that passes the check you give it.",
    analogy: "Like reading a barangay seat list from the end until you find the final open seat.",
    visual: { kind: "diagram", diagram: { alt: "Open, Taken, and Open go through findLast with an open-seat check and return the final Open status.", columns: 3, nodes: [{ id: "seats", label: "Open, Taken, Open", note: "seat statuses", tone: "ghost" }, { id: "find", label: "findLast", note: "final match", tone: "accent" }, { id: "last", label: "Open", note: "last open seat", tone: "box" }], arrows: [{ from: "seats", to: "find" }, { from: "find", to: "last" }] } },
    proof: "You will find the final open seat in a barangay meeting list.",
  },
  "array-find-last-index": {
    id: "array-find-last-index",
    term: "findLastIndex",
    definition: "findLastIndex gives the position of the final list item that passes the check you give it.",
    analogy: "Like reading a barangay seat list from the end until you find the final open seat, then writing its place number.",
    visual: { kind: "diagram", diagram: { alt: "Open, Taken, and Open go through findLastIndex with an open-seat check and return 2, the final open seat's position.", columns: 3, nodes: [{ id: "seats", label: "Open, Taken, Open", note: "seat statuses", tone: "ghost" }, { id: "find", label: "findLastIndex", note: "final position", tone: "accent" }, { id: "position", label: "2", note: "last open place", tone: "box" }], arrows: [{ from: "seats", to: "find" }, { from: "find", to: "position" }] } },
    proof: "You will find the final open seat position in a barangay meeting list.",
  },
  "optional-chaining": {
    id: "optional-chaining",
    term: "optional chaining",
    definition: "Optional chaining reads a value only when the part before it exists, so the code can avoid an error when a detail is missing.",
    analogy: "Like checking that a barangay desk has a health card before reading the phone number printed on it.",
    visual: { kind: "diagram", diagram: { alt: "A desk with a health card goes through optional chaining and returns phone number 117; a missing health card would stop safely instead of causing an error.", columns: 3, nodes: [{ id: "desk", label: "health: phone 117", note: "desk details", tone: "ghost" }, { id: "safe", label: "health?.phone", note: "read safely", tone: "accent" }, { id: "phone", label: "117", note: "health phone", tone: "box" }], arrows: [{ from: "desk", to: "safe" }, { from: "safe", to: "phone" }] } },
    proof: "You will read a barangay health desk phone number without assuming every detail exists.",
  },
  "nullish-coalescing": {
    id: "nullish-coalescing",
    term: "nullish coalescing",
    definition: "Nullish coalescing uses a fallback value when the value before it is missing.",
    analogy: "Like showing No number listed on a barangay desk card when no health phone was written there.",
    visual: { kind: "diagram", diagram: { alt: "A missing health phone goes through two question marks and becomes the fallback message No number listed.", columns: 3, nodes: [{ id: "missing", label: "missing phone", note: "no value", tone: "ghost" }, { id: "fallback", label: "??", note: "use fallback", tone: "accent" }, { id: "message", label: "No number listed", note: "helpful text", tone: "box" }], arrows: [{ from: "missing", to: "fallback" }, { from: "fallback", to: "message" }] } },
    proof: "You will show a helpful health-phone message when a barangay desk has no number.",
  },
  "typeof-operator": {
    id: "typeof-operator",
    term: "typeof",
    definition: "typeof tells you what kind of value something is, such as text or a number.",
    analogy: "Like checking whether a barangay hotline card holds written words or a count before you use it.",
    visual: { kind: "diagram", diagram: { alt: "The text 117 goes through typeof and returns string, showing that it is text rather than a number.", columns: 3, nodes: [{ id: "hotline", label: "117", note: "text in quotes", tone: "ghost" }, { id: "check", label: "typeof", note: "check value kind", tone: "accent" }, { id: "type", label: "string", note: "text value", tone: "box" }], arrows: [{ from: "hotline", to: "check" }, { from: "check", to: "type" }] } },
    proof: "You will check whether a barangay hotline is stored as text.",
  },
  "object-from-entries": {
    id: "object-from-entries",
    term: "Object.fromEntries",
    definition: "Object.fromEntries turns a list of name-and-value pairs into a record.",
    analogy: "Like taking two labelled lines from a barangay contact form and turning them into one filled contact card.",
    visual: { kind: "diagram", diagram: { alt: "Office Barangay Hall and phone 117 pairs go through Object.fromEntries and become one contact record.", columns: 3, nodes: [{ id: "pairs", label: "office, Hall; phone, 117", note: "detail pairs", tone: "ghost" }, { id: "make", label: "Object.fromEntries", note: "make record", tone: "accent" }, { id: "contact", label: "contact", note: "office and phone", tone: "box" }], arrows: [{ from: "pairs", to: "make" }, { from: "make", to: "contact" }] } },
    proof: "You will build a barangay contact record from its office and phone pairs.",
  },
  "conditional-expression": {
    id: "conditional-expression",
    term: "conditional expression",
    definition: "A conditional expression chooses one value when its condition is true and another when it is false.",
    analogy: "Like choosing an umbrella when rain is falling and choosing a walk outside when it is not.",
    visual: { kind: "diagram", diagram: { alt: "The true rain answer goes through a short conditional choice and returns Bring an umbrella; a false answer would return Walk outside.", columns: 3, nodes: [{ id: "rain", label: "is raining", note: "true", tone: "ghost" }, { id: "choice", label: "? :", note: "short choice", tone: "accent" }, { id: "plan", label: "umbrella", note: "rain plan", tone: "box" }], arrows: [{ from: "rain", to: "choice" }, { from: "choice", to: "plan" }] } },
    proof: "You will choose a barangay rain plan in one line of code.",
  },
  "logical-and": {
    id: "logical-and",
    term: "logical AND",
    definition: "Logical AND uses two ampersands and is true only when both checks are true.",
    analogy: "Like entering a barangay desk only when you have an ID and the desk is open.",
    visual: { kind: "diagram", diagram: { alt: "An ID check and an open-desk check both go through two ampersands and return true because both checks are true.", columns: 3, nodes: [{ id: "checks", label: "ID, desk open", note: "both true", tone: "ghost" }, { id: "and", label: "&&", note: "need both", tone: "accent" }, { id: "entry", label: "true", note: "can enter", tone: "box" }], arrows: [{ from: "checks", to: "and" }, { from: "and", to: "entry" }] } },
    proof: "You will check whether a visitor has both an ID and an open desk.",
  },
  "logical-or": {
    id: "logical-or",
    term: "logical OR",
    definition: "Logical OR uses two vertical lines and is true when either check is true.",
    analogy: "Like finding help at a barangay health desk or a service desk: one open desk is enough.",
    visual: { kind: "diagram", diagram: { alt: "A closed health desk and an open service desk go through two vertical lines and return true because one desk is open.", columns: 3, nodes: [{ id: "desks", label: "health, service", note: "false, true", tone: "ghost" }, { id: "or", label: "||", note: "either works", tone: "accent" }, { id: "help", label: "true", note: "help available", tone: "box" }], arrows: [{ from: "desks", to: "or" }, { from: "or", to: "help" }] } },
    proof: "You will check whether either barangay help desk is open.",
  },
  "logical-not": {
    id: "logical-not",
    term: "logical NOT",
    definition: "Logical NOT uses an exclamation mark to reverse a true or false answer.",
    analogy: "Like a barangay desk sign that changes Open to Closed when you read it the other way around.",
    visual: { kind: "diagram", diagram: { alt: "The false desk-open answer goes through an exclamation mark and becomes the true desk-closed answer.", columns: 3, nodes: [{ id: "open", label: "desk open", note: "false", tone: "ghost" }, { id: "not", label: "!", note: "reverse answer", tone: "accent" }, { id: "closed", label: "desk closed", note: "true", tone: "box" }], arrows: [{ from: "open", to: "not" }, { from: "not", to: "closed" }] } },
    proof: "You will turn a closed-desk answer into a clear true-or-false check.",
  },
  "cite-element": {
    id: "cite-element",
    term: "cite element",
    definition: "The cite element marks the title of a creative work or record that supports what a page says.",
    analogy: "Like writing the name of the barangay record book below a history note so people know which record it came from.",
    visual: { kind: "diagram", diagram: { alt: "A flood-history reminder goes through a cite element and shows the record title Barangay San Roque Records below it.", columns: 3, nodes: [{ id: "reminder", label: "Flood history", note: "page reminder", tone: "ghost" }, { id: "cite", label: "cite", note: "mark record title", tone: "accent" }, { id: "record", label: "San Roque Records", note: "supporting record", tone: "box" }], arrows: [{ from: "reminder", to: "cite" }, { from: "cite", to: "record" }] } },
    proof: "You will name the barangay record that supports a flood-history reminder.",
  },
  "outline-offset": {
    id: "outline-offset",
    term: "outline offset",
    definition: "The outline-offset property leaves space between an outline and the element it marks.",
    analogy: "Like leaving a clear gap between a barangay notice and its border so the notice stays easy to see.",
    visual: { kind: "diagram", diagram: { alt: "A focused office-hours link gets an outline offset, leaving a clear gap between the words and the focus outline.", columns: 3, nodes: [{ id: "link", label: "Office hours", note: "focused link", tone: "ghost" }, { id: "offset", label: "outline-offset", note: "add a gap", tone: "accent" }, { id: "outline", label: "clear outline", note: "easy to see", tone: "box" }], arrows: [{ from: "link", to: "offset" }, { from: "offset", to: "outline" }] } },
    proof: "You will leave clear space around a keyboard-focus outline on a barangay link.",
  },
  "abbr-element": {
    id: "abbr-element",
    term: "abbr element",
    definition: "The abbr element marks a shortened word and can hold its full meaning for people who need it.",
    analogy: "Like putting the full name beside a barangay office's short label so a new visitor understands it.",
    visual: { kind: "diagram", diagram: { alt: "The short name BHW goes through an abbr element and connects to the full meaning Barangay Health Worker.", columns: 3, nodes: [{ id: "short", label: "BHW", note: "short name", tone: "ghost" }, { id: "abbr", label: "abbr", note: "mark short form", tone: "accent" }, { id: "meaning", label: "Health Worker", note: "full meaning", tone: "box" }], arrows: [{ from: "short", to: "abbr" }, { from: "abbr", to: "meaning" }] } },
    proof: "You will show the full meaning of a barangay short name.",
  },
  "print-media-query": {
    id: "print-media-query",
    term: "print media query",
    definition: "A print media query applies CSS only when someone prints the page.",
    analogy: "Like preparing a clean paper version of a barangay notice while keeping the screen version useful too.",
    visual: { kind: "diagram", diagram: { alt: "A water notice goes through a print media query and becomes a black-text paper version while the screen version stays separate.", columns: 3, nodes: [{ id: "notice", label: "Water notice", note: "screen page", tone: "ghost" }, { id: "print", label: "@media print", note: "when printing", tone: "accent" }, { id: "paper", label: "black text", note: "paper version", tone: "box" }], arrows: [{ from: "notice", to: "print" }, { from: "print", to: "paper" }] } },
    proof: "You will make a barangay water notice clearer on paper.",
  },
  "page-at-rule": {
    id: "page-at-rule",
    term: "page rule",
    definition: "The @page rule sets page-level details such as margins for printed pages.",
    analogy: "Like leaving a clear border around a printed barangay notice so no words reach the paper edge.",
    visual: { kind: "diagram", diagram: { alt: "A printed water notice goes through an at-page rule and receives a clear 16-millimetre margin around the paper edge.", columns: 3, nodes: [{ id: "paper", label: "Printed notice", note: "paper page", tone: "ghost" }, { id: "page", label: "@page", note: "set paper edge", tone: "accent" }, { id: "margin", label: "16mm margin", note: "clear border", tone: "box" }], arrows: [{ from: "paper", to: "page" }, { from: "page", to: "margin" }] } },
    proof: "You will leave a clear paper margin around a barangay notice.",
  },
  "q-element": {
    id: "q-element",
    term: "q element",
    definition: "The q element marks a short quotation within a sentence or a small reminder.",
    analogy: "Like putting quotation marks around a short line from a barangay notice so readers know those exact words matter.",
    visual: { kind: "diagram", diagram: { alt: "The short reminder Bring your ID goes through a q element and appears as a clearly quoted reminder.", columns: 3, nodes: [{ id: "words", label: "Bring your ID", note: "short reminder", tone: "ghost" }, { id: "q", label: "q", note: "mark quote", tone: "accent" }, { id: "quote", label: "quoted words", note: "exact reminder", tone: "box" }], arrows: [{ from: "words", to: "q" }, { from: "q", to: "quote" }] } },
    proof: "You will mark a short barangay reminder as a quote.",
  },
  "prefers-color-scheme": {
    id: "prefers-color-scheme",
    term: "prefers color scheme",
    definition: "The prefers-color-scheme media query lets CSS respond to a person's light or dark device setting.",
    analogy: "Like using a darker barangay notice board at night because the community asked for gentler colours after dark.",
    visual: { kind: "diagram", diagram: { alt: "A device set to dark goes through a prefers-color-scheme media query and receives a dark night notice.", columns: 3, nodes: [{ id: "setting", label: "dark setting", note: "device choice", tone: "ghost" }, { id: "media", label: "prefers-color-scheme", note: "check setting", tone: "accent" }, { id: "notice", label: "dark notice", note: "night colours", tone: "box" }], arrows: [{ from: "setting", to: "media" }, { from: "media", to: "notice" }] } },
    proof: "You will make a barangay notice respond to a dark device setting.",
  },
  "color-scheme": {
    id: "color-scheme",
    term: "color scheme",
    definition: "The color-scheme property tells the browser whether an area uses light or dark colours.",
    analogy: "Like labelling a barangay notice board as a night board so the nearby browser controls can match its dark surface.",
    visual: { kind: "diagram", diagram: { alt: "A dark night notice goes through the color-scheme property and tells the browser to use dark-colour controls nearby.", columns: 3, nodes: [{ id: "notice", label: "dark notice", note: "dark surface", tone: "ghost" }, { id: "scheme", label: "color-scheme", note: "name dark", tone: "accent" }, { id: "browser", label: "dark controls", note: "matching browser UI", tone: "box" }], arrows: [{ from: "notice", to: "scheme" }, { from: "scheme", to: "browser" }] } },
    proof: "You will tell the browser that a barangay notice uses dark colours.",
  },
  "i-element": {
    id: "i-element",
    term: "i element",
    definition: "Makes text italicized.",
    analogy: "Like whispering something softly.",
    visual: { kind: "diagram", diagram: { alt: "A notice with important health tips in italics.", columns: 3, nodes: [{ id: "words", label: "important", note: "plain words", tone: "ghost" }, { id: "tag", label: "i", note: "italic", tone: "accent" }, { id: "result", label: "Italic", note: "shown to readers", tone: "box" }], arrows: [{ from: "words", to: "tag" }, { from: "tag", to: "result" }] } },
    proof: "You will make the words 'important' appear in italics.",
  },
  "b-element": {
    id: "b-element",
    term: "bold element",
    definition: "Make text bold for emphasis.",
    analogy: "It's like when you shout something loudly in real life.",
    visual: { kind: "diagram", diagram: { alt: "A picture of a jeepney with routes written in bold letters.", columns: 3, nodes: [{ id: "words", label: "Important words", note: "plain words", tone: "ghost" }, { id: "tag", label: "b", note: "bold", tone: "accent" }, { id: "result", label: "Bold", note: "shown to readers", tone: "box" }], arrows: [{ from: "words", to: "tag" }, { from: "tag", to: "result" }] } },
    proof: "You will mark the important words on the jeepney route notice.",
  },
  "sub-element": {
    id: "sub-element",
    term: "sub element",
    definition: "Makes small text for chemical formulas or numbers.",
    analogy: "Think of it like a tiny print used in recipes.",
    visual: { kind: "diagram", diagram: { alt: "A close-up view of the notice showing the small number.", columns: 3, nodes: [{ id: "words", label: "1/4", note: "plain words", tone: "ghost" }, { id: "tag", label: "sub", note: "subscript", tone: "accent" }, { id: "result", label: "Subscript", note: "shown to readers", tone: "box" }], arrows: [{ from: "words", to: "tag" }, { from: "tag", to: "result" }] } },
    proof: "You will mark the correct way to write '1/4' as subscript.",
  },
  "em-element": {
    id: "em-element",
    term: "em element",
    definition: "The em element marks a word said with stress, changing the meaning of the sentence.",
    analogy: "When you see a sale sign on a product, it means the price has changed.",
    visual: { kind: "diagram", diagram: { alt: "A list of products with one item marked as 'Discounted!'", columns: 3, nodes: [{ id: "words", label: "Discounted!", note: "plain words", tone: "ghost" }, { id: "tag", label: "em", note: "stressed word", tone: "accent" }, { id: "result", label: "Stressed word", note: "shown to readers", tone: "box" }], arrows: [{ from: "words", to: "tag" }, { from: "tag", to: "result" }] } },
    proof: "You will mark the word 'Discounted' on the product list. It shows the price is lower now.",
  },
  "span-element": {
    id: "span-element",
    term: "span element",
    definition: "The span element marks a small piece of text so it can be styled, without giving it any meaning.",
    analogy: "Underlining important words in a recipe.",
    visual: { kind: "diagram", diagram: { alt: "A sample water bill with 'Metered Amount' underlined.", columns: 3, nodes: [{ id: "words", label: "Metered Amount", note: "plain words", tone: "ghost" }, { id: "tag", label: "span", note: "small piece of text", tone: "accent" }, { id: "result", label: "Small piece of text", note: "shown to readers", tone: "box" }], arrows: [{ from: "words", to: "tag" }, { from: "tag", to: "result" }] } },
    proof: "Mark the words 'Metered Amount' on your water bill.",
  },
  "pre-element": {
    id: "pre-element",
    term: "pre element",
    definition: "The pre element keeps the spaces and line breaks exactly as they were typed.",
    analogy: "Like when you write a letter, you keep your lines straight and spaces even.",
    visual: { kind: "diagram", diagram: { alt: "Laundry shop receipt with neatly spaced and broken lines.", columns: 3, nodes: [{ id: "words", label: "Pre keeps it just like that.", note: "plain words", tone: "ghost" }, { id: "tag", label: "pre", note: "preformatted text", tone: "accent" }, { id: "result", label: "Preformatted text", note: "shown to readers", tone: "box" }], arrows: [{ from: "words", to: "tag" }, { from: "tag", to: "result" }] } },
    proof: "You will mark the words 'Pre keeps it just like that.' on the receipt.",
  },
  "thead-element": {
    id: "thead-element",
    term: "thead element",
    definition: "The thead element groups the header rows of a table.",
    analogy: "The table's header like a title card in a movie.",
    visual: { kind: "diagram", diagram: { alt: "A table with a header row and several data rows, labeled Month.", columns: 3, nodes: [{ id: "words", label: "thMonthth", note: "plain words", tone: "ghost" }, { id: "tag", label: "thead", note: "table head", tone: "accent" }, { id: "result", label: "Table head", note: "shown to readers", tone: "box" }], arrows: [{ from: "words", to: "tag" }, { from: "tag", to: "result" }] } },
    proof: "You will mark the words Month on the table header row.",
  },
  "tbody-element": {
    id: "tbody-element",
    term: "tbody element",
    definition: "The tbody element groups the main rows of a table.",
    analogy: "List your groceries in a grocery list.",
    visual: { kind: "diagram", diagram: { alt: "A list of items with prices, grouped together.", columns: 3, nodes: [{ id: "words", label: "Water usage per month", note: "plain words", tone: "ghost" }, { id: "tag", label: "tbody", note: "table body", tone: "accent" }, { id: "result", label: "Table body", note: "shown to readers", tone: "box" }], arrows: [{ from: "words", to: "tag" }, { from: "tag", to: "result" }] } },
    proof: "You will mark the words 'Water usage per month' on the water bill.",
  },
  "tfoot-element": {
    id: "tfoot-element",
    term: "tfoot element",
    definition: "The tfoot element groups the summary rows of a table, such as a total.",
    analogy: "The bottom of a checkbook where you write the total amount.",
    visual: { kind: "diagram", diagram: { alt: "A line at the bottom of a list showing a grand total.", columns: 3, nodes: [{ id: "words", label: "TOTAL: ₱100.00", note: "plain words", tone: "ghost" }, { id: "tag", label: "tfoot", note: "table footer", tone: "accent" }, { id: "result", label: "Table footer", note: "shown to readers", tone: "box" }], arrows: [{ from: "words", to: "tag" }, { from: "tag", to: "result" }] } },
    proof: "Mark 'TOTAL' on the right side of the page.",
  },
  "u-element": {
    id: "u-element",
    term: "u element",
    definition: "The u element marks a word that is spelled wrong or needs attention, shown underlined.",
    analogy: "A red pen underlining a mistake in your homework.",
    visual: { kind: "diagram", diagram: { alt: "An old health center sign with a red pen underlining a misspelled 'flu'.", columns: 3, nodes: [{ id: "words", label: "misspelled word or important note", note: "plain words", tone: "ghost" }, { id: "tag", label: "u", note: "marked word", tone: "accent" }, { id: "result", label: "Marked word", note: "shown to readers", tone: "box" }], arrows: [{ from: "words", to: "tag" }, { from: "tag", to: "result" }] } },
    proof: "You will mark the misspelled word 'flu' on this notice.",
  },
  "sup-element": {
    id: "sup-element",
    term: "sup element",
    definition: "The sup element raises text above the line, used in things like 1st and footnote marks.",
    analogy: "The footnotes in your storybook that explain things.",
    visual: { kind: "diagram", diagram: { alt: "A water meter with a reading marked as 1st.", columns: 3, nodes: [{ id: "words", label: "1st", note: "plain words", tone: "ghost" }, { id: "tag", label: "sup", note: "superscript", tone: "accent" }, { id: "result", label: "Superscript", note: "shown to readers", tone: "box" }], arrows: [{ from: "words", to: "tag" }, { from: "tag", to: "result" }] } },
    proof: "You will mark the words 1st on the water bill.",
  },
  "dfn-element": {
    id: "dfn-element",
    term: "dfn element",
    definition: "The dfn element marks the word a sentence is defining.",
    analogy: "Pointing at an object while naming it.",
    visual: { kind: "diagram", diagram: { alt: "A picture of a tilapia fish with its name 'Tilapia' written below it.", columns: 3, nodes: [{ id: "words", label: "Tilapia", note: "plain words", tone: "ghost" }, { id: "tag", label: "dfn", note: "term being defined", tone: "accent" }, { id: "result", label: "Term being defined", note: "shown to readers", tone: "box" }], arrows: [{ from: "words", to: "tag" }, { from: "tag", to: "result" }] } },
    proof: "You will mark 'Tilapia' on the fish stall sign.",
  },
  "menu-element": {
    id: "menu-element",
    term: "menu element",
    definition: "The menu element holds a list of buttons or commands.",
    analogy: "Buttons on a TV remote control.",
    visual: { kind: "diagram", diagram: { alt: "Image of a turo-turo menu with 'Pay', 'Cancel', and 'Help' options.", columns: 3, nodes: [{ id: "words", label: "Pay, Cancel, Help", note: "plain words", tone: "ghost" }, { id: "tag", label: "menu", note: "list of commands", tone: "accent" }, { id: "result", label: "List of commands", note: "shown to readers", tone: "box" }], arrows: [{ from: "words", to: "tag" }, { from: "tag", to: "result" }] } },
    proof: "You will mark the words 'Pay' and 'Cancel' on the menu buttons.",
  },
};

export function conceptById(id: string): Concept | undefined {
  return concepts[id];
}

export function resolveConcepts(ids: string[] | undefined): Concept[] {
  if (!ids?.length) return [];
  return ids.map((id) => concepts[id]).filter((c): c is Concept => Boolean(c));
}
