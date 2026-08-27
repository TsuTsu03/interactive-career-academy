/**
 * css-topics.mjs - the CSS the course teaches, as data.
 *
 * WHY THIS IS CURATED AND NOT GENERATED
 *
 * The same lesson the HTML harness learned the hard way applies here twice
 * over. Asked to define `<b>`, a 7B wrote the definition of `<strong>`; asked
 * for CSS it will happily assert that `align-items` centres horizontally, or
 * that `padding: 16px` computes to `16 px`. CSS is worse than HTML for this
 * because the tests compare against exactly what `getComputedStyle` returns,
 * so a plausible-looking wrong value does not fail loudly - it produces a step
 * whose test can never pass.
 *
 * So every value here is fixed, and so is the way it is checked. The model
 * gets the setting and the words; it never touches a property, a value, or a
 * selector.
 *
 * HOW A TOPIC BECOMES A PROJECT
 *
 * One topic is one project: a fixture to style and an ordered list of
 * declarations, one per step, each building on the last. `computed` is what
 * the grading frame reads back, which is often not what was written - colours
 * come back as `rgb()`, and shorthand properties have to be read through one
 * of their longhands.
 *
 * `check: "source"` is for anything the static grading frame cannot see: media
 * queries, pseudo-classes, and `@` rules never apply in it, so those are
 * matched against the stylesheet text instead. That is the same escape hatch
 * the hand-authored CSS steps already use, and its limit is the same: it
 * proves the rule was written, not that it took effect.
 */

/**
 * Fixtures a topic can be taught against. Each is a small piece of markup the
 * learner styles; `root` is the class the rules target, and `slots` are the
 * strings the model fills in.
 */
export const CSS_FIXTURES = {
  card: {
    root: "info-card",
    slots: ["heading", "line1", "line2"],
    html: (s) => `<article class="info-card">
  <h2>${s[0]}</h2>
  <p>${s[1]}</p>
  <p class="info-detail">${s[2]}</p>
</article>`,
  },
  row: {
    root: "price-row",
    slots: ["label", "amount"],
    html: (s) => `<div class="price-row">
  <span class="price-name">${s[0]}</span>
  <span class="price-amount">${s[1]}</span>
</div>`,
  },
  list: {
    root: "item-list",
    slots: ["heading", "item1", "item2", "item3"],
    html: (s) => `<section class="item-list">
  <h2>${s[0]}</h2>
  <ul>
    <li>${s[1]}</li>
    <li>${s[2]}</li>
    <li>${s[3]}</li>
  </ul>
</section>`,
  },
  banner: {
    root: "notice-banner",
    slots: ["heading", "message"],
    html: (s) => `<aside class="notice-banner">
  <h2>${s[0]}</h2>
  <p>${s[1]}</p>
</aside>`,
  },
  grid: {
    root: "stall-grid",
    slots: ["item1", "item2", "item3", "item4"],
    html: (s) => `<section class="stall-grid">
  <article class="stall-cell">${s[0]}</article>
  <article class="stall-cell">${s[1]}</article>
  <article class="stall-cell">${s[2]}</article>
  <article class="stall-cell">${s[3]}</article>
</section>`,
  },
};

/**
 * The curriculum, in teaching order. Each entry becomes one project.
 *
 * `decl` is what the learner writes. `computed` is what the grading frame
 * reads back for `prop`, or the property named in `readProp` when the written
 * property is a shorthand the browser expands.
 */
export const CSS_TOPICS = [
  {
    id: "box-spacing", noun: "card", fixture: "card", label: "spacing inside a card",
    steps: [
      { prop: "padding", decl: "16px", readProp: "padding-top", computed: "16px", readable: "16 pixels", task: "Give the card room inside its edges.", hint1: "Use a pixel value for the inside room.", hint2: "Write 16px after the colon." },
      { prop: "background-color", decl: "#ffffff", computed: "rgb(255, 255, 255)", readable: "white", task: "Make the card stand out from the page.", hint1: "Use the white colour code.", hint2: "Write #ffffff after the colon." },
      { prop: "border-radius", decl: "12px", readProp: "border-top-left-radius", computed: "12px", readable: "12 pixels", task: "Soften the corners of the card.", hint1: "Use a pixel value for the corner curve.", hint2: "Write 12px after the colon." },
      { prop: "margin-bottom", decl: "24px", computed: "24px", readable: "24 pixels", task: "Leave space below the card.", hint1: "Use a pixel value for the gap below.", hint2: "Write 24px after the colon." },
      { prop: "max-width", decl: "400px", computed: "400px", readable: "400 pixels", task: "Stop the card growing too wide to read.", hint1: "Use a pixel value for the widest it may get.", hint2: "Write 400px after the colon." },
    ],
  },
  {
    id: "borders", noun: "notice", fixture: "banner", label: "a bordered notice",
    steps: [
      { prop: "border-left-width", decl: "4px", computed: "4px", readable: "4 pixels", task: "Give the notice a thick stripe down its left side.", hint1: "Use a pixel value for the stripe width.", hint2: "Write 4px after the colon." },
      { prop: "border-left-style", decl: "solid", computed: "solid", readable: "a solid line", task: "Make the left stripe a solid line.", hint1: "Use the plain unbroken line style.", hint2: "Write solid after the colon." },
      { prop: "border-left-color", decl: "#b45309", computed: "rgb(180, 83, 9)", readable: "amber", task: "Colour the stripe amber so it reads as a warning.", hint1: "Use the amber colour code named in the task.", hint2: "Write #b45309 after the colon." },
      { prop: "background-color", decl: "#fffbeb", computed: "rgb(255, 251, 235)", readable: "pale amber", task: "Tint the notice background to match the stripe.", hint1: "Use the pale amber code.", hint2: "Write #fffbeb after the colon." },
      { prop: "padding-left", decl: "16px", computed: "16px", readable: "16 pixels", task: "Keep the words clear of the stripe.", hint1: "Use a pixel value for the space after the stripe.", hint2: "Write 16px after the colon." },
    ],
  },
  {
    id: "typography", noun: "card text", fixture: "card", label: "readable text",
    steps: [
      { prop: "font-size", decl: "18px", computed: "18px", readable: "18 pixels", task: "Make the card text large enough to read on a phone.", hint1: "Use a pixel value for the text size.", hint2: "Write 18px after the colon." },
      { prop: "line-height", decl: "1.6", computed: "28.8px", readable: "1.6 times the text size", task: "Open up the space between lines.", hint1: "Use a number with no unit.", hint2: "Write 1.6 after the colon." },
      { prop: "color", decl: "#1f2937", computed: "rgb(31, 41, 55)", readable: "dark slate", task: "Darken the words so they have enough contrast.", hint1: "Use the dark slate code named in the task.", hint2: "Write #1f2937 after the colon." },
      { prop: "font-weight", decl: "500", computed: "500", readable: "medium", task: "Give the card text a little more weight.", hint1: "Use the medium weight number.", hint2: "Write 500 after the colon." },
      { prop: "letter-spacing", decl: "0.2px", computed: "0.2px", readable: "0.2 pixels", task: "Loosen the letters very slightly.", hint1: "Use a small pixel value.", hint2: "Write 0.2px after the colon." },
    ],
  },
  {
    id: "flex-row", noun: "row", fixture: "row", label: "a row that lines up",
    steps: [
      { prop: "display", decl: "flex", computed: "flex", readable: "a flex row", task: "Put the label and the amount on one line.", hint1: "Use the display value that lays children out in a row.", hint2: "Write flex after the colon." },
      { prop: "justify-content", decl: "space-between", computed: "space-between", readable: "pushed apart", task: "Push the amount to the far right.", hint1: "Use the value that puts all spare space between the two.", hint2: "Write space-between after the colon." },
      { prop: "align-items", decl: "center", computed: "center", readable: "centred across", task: "Line the two up through their middles.", hint1: "Use the value that centres children across the row.", hint2: "Write center after the colon." },
      { prop: "gap", decl: "12px", readProp: "column-gap", computed: "12px", readable: "12 pixels", task: "Keep a minimum gap between the two.", hint1: "Use a pixel value for the gap.", hint2: "Write 12px after the colon." },
      { prop: "padding", decl: "12px", readProp: "padding-top", computed: "12px", readable: "12 pixels", task: "Give the row room inside.", hint1: "Use a pixel value for the inside room.", hint2: "Write 12px after the colon." },
    ],
  },
  {
    id: "flex-column", noun: "list", fixture: "list", label: "a stacked list",
    steps: [
      { prop: "display", decl: "flex", computed: "flex", readable: "a flex box", task: "Take control of how the list stacks.", hint1: "Use the display value that lets you control direction and gaps.", hint2: "Write flex after the colon." },
      { prop: "flex-direction", decl: "column", computed: "column", readable: "top to bottom", task: "Stack the heading and the list top to bottom.", hint1: "Use the direction value that runs down the page.", hint2: "Write column after the colon." },
      { prop: "gap", decl: "8px", readProp: "row-gap", computed: "8px", readable: "8 pixels", task: "Space the stacked parts evenly.", hint1: "Use a pixel value for the gap.", hint2: "Write 8px after the colon." },
      { prop: "background-color", decl: "#f8fafc", computed: "rgb(248, 250, 252)", readable: "pale grey", task: "Tint the list so it reads as one block.", hint1: "Use the pale grey code.", hint2: "Write #f8fafc after the colon." },
      { prop: "padding", decl: "16px", readProp: "padding-top", computed: "16px", readable: "16 pixels", task: "Keep the list clear of its own edges.", hint1: "Use a pixel value for the inside room.", hint2: "Write 16px after the colon." },
    ],
  },
  {
    id: "grid", noun: "grid", fixture: "grid", label: "a grid of cells",
    steps: [
      { prop: "display", decl: "grid", computed: "grid", readable: "a grid", task: "Lay the stalls out as a grid.", hint1: "Use the display value made for rows and columns together.", hint2: "Write grid after the colon." },
      { prop: "grid-template-columns", decl: "1fr 1fr", computed: null, check: "source", pattern: "grid-template-columns\\s*:\\s*1fr\\s+1fr", because: "Two equal column tracks are written as 1fr 1fr.", readable: "two equal columns", task: "Give the grid two equal columns.", hint1: "Name two equal fractions of the free space.", hint2: "Write 1fr 1fr after the colon." },
      { prop: "gap", decl: "12px", readProp: "row-gap", computed: "12px", readable: "12 pixels", task: "Space the cells apart.", hint1: "Use a pixel value for the gap.", hint2: "Write 12px after the colon." },
      { prop: "padding", decl: "12px", readProp: "padding-top", computed: "12px", readable: "12 pixels", task: "Keep the cells clear of the outer edge.", hint1: "Use a pixel value for the inside room.", hint2: "Write 12px after the colon." },
      { prop: "background-color", decl: "#f1f5f9", computed: "rgb(241, 245, 249)", readable: "light grey", task: "Tint the grid so the cells read as a set.", hint1: "Use the light grey code.", hint2: "Write #f1f5f9 after the colon." },
    ],
  },
  {
    id: "responsive", noun: "card", fixture: "card", label: "a card that fits a phone",
    steps: [
      { prop: "max-width", decl: "480px", computed: "480px", readable: "480 pixels", task: "Cap how wide the card can grow.", hint1: "Use a pixel value for the widest it may get.", hint2: "Write 480px after the colon." },
      { prop: "width", decl: "100%", computed: null, check: "source", pattern: "width\\s*:\\s*100%", because: "A full-width value lets the card shrink on a narrow screen.", readable: "the full width available", task: "Let the card shrink to fit a narrow screen.", hint1: "Use a percentage of the space available.", hint2: "Write 100% after the colon." },
      { prop: "padding", decl: "16px", readProp: "padding-top", computed: "16px", readable: "16 pixels", task: "Give the card room inside.", hint1: "Use a pixel value for the inside room.", hint2: "Write 16px after the colon." },
      { prop: "font-size", decl: "16px", computed: "16px", readable: "16 pixels", task: "Set a comfortable reading size.", hint1: "Use a pixel value for the text size.", hint2: "Write 16px after the colon." },
      { prop: "box-sizing", decl: "border-box", computed: "border-box", readable: "border box", task: "Count the padding inside the width, not on top of it.", hint1: "Use the sizing value that includes padding and border.", hint2: "Write border-box after the colon." },
    ],
  },
  {
    id: "shadow-depth", noun: "card", fixture: "card", label: "a card that lifts off the page",
    steps: [
      { prop: "background-color", decl: "#ffffff", computed: "rgb(255, 255, 255)", readable: "white", task: "Make the card white so a shadow will show.", hint1: "Use the white colour code.", hint2: "Write #ffffff after the colon." },
      { prop: "border-radius", decl: "10px", readProp: "border-top-left-radius", computed: "10px", readable: "10 pixels", task: "Round the card corners.", hint1: "Use a pixel value for the corner curve.", hint2: "Write 10px after the colon." },
      { prop: "box-shadow", decl: "0 1px 3px rgba(15, 23, 42, 0.2)", computed: null, check: "source", pattern: "box-shadow\\s*:\\s*0\\s+1px\\s+3px", because: "The shadow needs an offset, a blur, and a colour.", readable: "a soft shadow", task: "Lift the card slightly off the page.", hint1: "A shadow needs a sideways offset, a downward offset, a blur, and a colour.", hint2: "Write 0 1px 3px rgba(15, 23, 42, 0.2) after the colon." },
      { prop: "padding", decl: "20px", readProp: "padding-top", computed: "20px", readable: "20 pixels", task: "Give the lifted card room inside.", hint1: "Use a pixel value for the inside room.", hint2: "Write 20px after the colon." },
      { prop: "border", decl: "1px solid #e2e8f0", readProp: "border-top-width", computed: "1px", readable: "a thin grey edge", task: "Add a faint edge so the card reads on a white page.", hint1: "A border needs a width, a style, and a colour.", hint2: "Write 1px solid #e2e8f0 after the colon." },
    ],
  },
  {
    id: "alignment", noun: "notice", fixture: "banner", label: "centred text",
    steps: [
      { prop: "text-align", decl: "center", computed: "center", readable: "centred", task: "Centre the words in the notice.", hint1: "Use the alignment value that puts text in the middle.", hint2: "Write center after the colon." },
      { prop: "margin-left", decl: "auto", computed: null, check: "source", pattern: "margin-left\\s*:\\s*auto", because: "An automatic left margin is half of centring a block.", readable: "shared automatically", task: "Let the browser share the space on the left.", hint1: "Use the value that lets the browser decide.", hint2: "Write auto after the colon." },
      { prop: "margin-right", decl: "auto", computed: null, check: "source", pattern: "margin-right\\s*:\\s*auto", because: "With both margins automatic, the block sits in the middle.", readable: "shared automatically", task: "Do the same on the right so the notice sits in the middle.", hint1: "Use the same value as the left side.", hint2: "Write auto after the colon." },
      { prop: "max-width", decl: "360px", computed: "360px", readable: "360 pixels", task: "Give the notice a width to be centred within.", hint1: "Use a pixel value for the widest it may get.", hint2: "Write 360px after the colon." },
      { prop: "padding", decl: "16px", readProp: "padding-top", computed: "16px", readable: "16 pixels", task: "Give the centred notice room inside.", hint1: "Use a pixel value for the inside room.", hint2: "Write 16px after the colon." },
    ],
  },
  {
    id: "overflow-text", noun: "row", fixture: "row", label: "text that will not overflow",
    steps: [
      { prop: "display", decl: "flex", computed: "flex", readable: "a flex row", task: "Put the two parts of the row on one line.", hint1: "Use the display value that lays children out in a row.", hint2: "Write flex after the colon." },
      { prop: "overflow", decl: "hidden", computed: "hidden", readable: "clipped", task: "Stop long text spilling out of the row.", hint1: "Use the value that clips anything past the edge.", hint2: "Write hidden after the colon." },
      { prop: "white-space", decl: "nowrap", computed: "nowrap", readable: "kept on one line", task: "Keep the row on a single line.", hint1: "Use the value that refuses to wrap.", hint2: "Write nowrap after the colon." },
      { prop: "text-overflow", decl: "ellipsis", computed: "ellipsis", readable: "ends with dots", task: "Show three dots where the text is cut off.", hint1: "Use the value that ends clipped text with dots.", hint2: "Write ellipsis after the colon." },
      { prop: "gap", decl: "8px", readProp: "column-gap", computed: "8px", readable: "8 pixels", task: "Keep a gap between the two parts.", hint1: "Use a pixel value for the gap.", hint2: "Write 8px after the colon." },
    ],
  },
  {
    id: "position", noun: "notice", fixture: "banner", label: "a badge pinned to a corner",
    steps: [
      { prop: "position", decl: "relative", computed: "relative", readable: "positioned", task: "Make the notice the anchor for anything pinned to it.", hint1: "Use the position value that keeps an element in place but anchors its children.", hint2: "Write relative after the colon." },
      { prop: "padding-top", decl: "28px", computed: "28px", readable: "28 pixels", task: "Leave room at the top for a pinned badge.", hint1: "Use a pixel value for the space above.", hint2: "Write 28px after the colon." },
      { prop: "min-height", decl: "80px", computed: "80px", readable: "80 pixels", task: "Stop the notice collapsing when it is short.", hint1: "Use a pixel value for the shortest it may be.", hint2: "Write 80px after the colon." },
      { prop: "background-color", decl: "#eff6ff", computed: "rgb(239, 246, 255)", readable: "pale blue", task: "Tint the notice so the badge will stand out.", hint1: "Use the pale blue code.", hint2: "Write #eff6ff after the colon." },
      { prop: "border-radius", decl: "8px", readProp: "border-top-left-radius", computed: "8px", readable: "8 pixels", task: "Round the notice corners.", hint1: "Use a pixel value for the corner curve.", hint2: "Write 8px after the colon." },
    ],
  },
  {
    id: "custom-properties", noun: "card", fixture: "card", label: "reusable colour names",
    steps: [
      { prop: "--card-ink", decl: "#0f172a", computed: null, check: "source", pattern: "--card-ink\\s*:\\s*#0f172a", because: "A custom property starts with two dashes and holds a value for later.", readable: "a stored colour", task: "Store the card ink colour under a name you can reuse.", hint1: "A name you invent starts with two dashes.", hint2: "Write #0f172a after the colon." },
      { prop: "color", decl: "var(--card-ink)", computed: "rgb(15, 23, 42)", readable: "the stored ink colour", task: "Use the stored colour for the card text.", hint1: "Read a stored value with var and the name in brackets.", hint2: "Write var(--card-ink) after the colon." },
      { prop: "--card-pad", decl: "18px", computed: null, check: "source", pattern: "--card-pad\\s*:\\s*18px", because: "Spacing can be stored under a name in the same way a colour can.", readable: "a stored size", task: "Store the card spacing under a name too.", hint1: "Use two dashes, then a pixel value.", hint2: "Write 18px after the colon." },
      { prop: "padding", decl: "var(--card-pad)", readProp: "padding-top", computed: "18px", readable: "the stored spacing", task: "Use the stored spacing for the card padding.", hint1: "Read the stored value with var.", hint2: "Write var(--card-pad) after the colon." },
      { prop: "border-radius", decl: "10px", readProp: "border-top-left-radius", computed: "10px", readable: "10 pixels", task: "Round the card corners.", hint1: "Use a pixel value for the corner curve.", hint2: "Write 10px after the colon." },
    ],
  },
];
