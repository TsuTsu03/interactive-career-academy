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
      { prop: "border-left-width", decl: "4px", computed: null, check: "source", pattern: "border-left-width\\s*:\\s*4px", because: "The stripe width must be written even before its line style makes it visible.", readable: "4 pixels", task: "Give the notice a thick stripe down its left side.", hint1: "Use a pixel value for the stripe width.", hint2: "Write 4px after the colon." },
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
      { prop: "font-size", decl: "16px", computed: null, check: "source", pattern: "font-size\\s*:\\s*16px", because: "The declaration must be written even though 16 pixels matches the browser default.", readable: "16 pixels", task: "Set a comfortable reading size.", hint1: "Use a pixel value for the text size.", hint2: "Write 16px after the colon." },
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
    id: "backgrounds", noun: "banner", fixture: "banner", label: "a tinted banner",
    steps: [
      { prop: "background-color", decl: "#ecfdf5", computed: "rgb(236, 253, 245)", readable: "pale green", task: "Tint the banner pale green.", hint1: "Use the pale green code named in the task.", hint2: "Write #ecfdf5 after the colon." },
      { prop: "background-image", decl: "linear-gradient(#ecfdf5, #d1fae5)", computed: null, check: "source", pattern: "background-image\\s*:\\s*linear-gradient", because: "A gradient names the colours it fades between.", readable: "a colour that fades down", task: "Fade the banner from its top colour into a deeper one.", hint1: "Name the two colours the fade runs between.", hint2: "Write linear-gradient(#ecfdf5, #d1fae5) after the colon." },
      { prop: "background-clip", decl: "padding-box", computed: "padding-box", readable: "kept inside the padding", task: "Stop the background running under the border.", hint1: "Name the box the background should stop at.", hint2: "Write padding-box after the colon." },
      { prop: "padding", decl: "18px", readProp: "padding-top", computed: "18px", readable: "18 pixels", task: "Give the banner room inside.", hint1: "Use a pixel value for the inside room.", hint2: "Write 18px after the colon." },
      { prop: "border-radius", decl: "8px", readProp: "border-top-left-radius", computed: "8px", readable: "8 pixels", task: "Round the banner corners.", hint1: "Use a pixel value for the corner curve.", hint2: "Write 8px after the colon." },
    ],
  },
  {
    id: "units", noun: "card", fixture: "card", label: "sizes that scale",
    steps: [
      { prop: "font-size", decl: "1rem", computed: null, check: "source", pattern: "font-size\\s*:\\s*1rem", because: "The written rem unit is the lesson; its computed value matches the browser default size.", readable: "one root size", task: "Size the card text from the page setting instead of a fixed number.", hint1: "Use the unit that means one root font size.", hint2: "Write 1rem after the colon." },
      { prop: "padding", decl: "1.25rem", readProp: "padding-top", computed: "20px", readable: "1.25 root sizes", task: "Set the inside room in the same scaling unit.", hint1: "Use a rem value a little over one.", hint2: "Write 1.25rem after the colon." },
      { prop: "max-width", decl: "30rem", computed: "480px", readable: "30 root sizes", task: "Cap the card width in the same unit.", hint1: "Use a rem value for the widest it may get.", hint2: "Write 30rem after the colon." },
      { prop: "line-height", decl: "1.5", computed: "24px", readable: "1.5 times the text size", task: "Space the lines relative to the text size.", hint1: "Use a number with no unit.", hint2: "Write 1.5 after the colon." },
      { prop: "border-radius", decl: "0.5rem", readProp: "border-top-left-radius", computed: "8px", readable: "half a root size", task: "Round the corners in the same scaling unit.", hint1: "Use a rem value below one.", hint2: "Write 0.5rem after the colon." },
    ],
  },
  {
    id: "list-styling", noun: "list", fixture: "list", selector: ".item-list ul", label: "a tidy list",
    steps: [
      { prop: "list-style-type", decl: "none", computed: "none", readable: "no bullets", task: "Take the bullets off the list.", hint1: "Use the value that means no marker at all.", hint2: "Write none after the colon." },
      { prop: "padding-left", decl: "0px", computed: "0px", readable: "no left indent", task: "Remove the indent the bullets left behind.", hint1: "Use zero pixels.", hint2: "Write 0px after the colon." },
      { prop: "background-color", decl: "#f8fafc", computed: "rgb(248, 250, 252)", readable: "pale grey", task: "Tint the list so it reads as one block.", hint1: "Use the pale grey code.", hint2: "Write #f8fafc after the colon." },
      { prop: "border-radius", decl: "8px", readProp: "border-top-left-radius", computed: "8px", readable: "8 pixels", task: "Round the list corners.", hint1: "Use a pixel value for the corner curve.", hint2: "Write 8px after the colon." },
      { prop: "padding-top", decl: "12px", computed: "12px", readable: "12 pixels", task: "Keep the first item clear of the top edge.", hint1: "Use a pixel value for the space above.", hint2: "Write 12px after the colon." },
    ],
  },
  {
    id: "hover-state", noun: "row", fixture: "row", label: "a row that answers the pointer",
    steps: [
      { prop: "padding", decl: "12px", readProp: "padding-top", computed: "12px", readable: "12 pixels", task: "Give the row room inside.", hint1: "Use a pixel value for the inside room.", hint2: "Write 12px after the colon." },
      { prop: "cursor", decl: "pointer", computed: "pointer", readable: "a pointing hand", task: "Show that the row can be clicked.", hint1: "Use the cursor value that shows a pointing hand.", hint2: "Write pointer after the colon." },
      { prop: "transition-property", decl: "background-color", computed: "background-color", readable: "a smooth colour change", task: "Name what should change smoothly rather than snapping.", hint1: "Name the property that will change.", hint2: "Write background-color after the colon." },
      { prop: "transition-duration", decl: "150ms", computed: "0.15s", readable: "150 milliseconds", task: "Set how long that change takes.", hint1: "Use a value in milliseconds.", hint2: "Write 150ms after the colon." },
      { prop: "transition-timing-function", decl: "ease-out", computed: "ease-out", readable: "quick then gentle", task: "Make the change start quickly and settle gently.", hint1: "Use the timing value that eases at the end.", hint2: "Write ease-out after the colon." },
    ],
  },
  {
    id: "grid-repeat", noun: "grid", fixture: "grid", label: "cells that line up in rows",
    steps: [
      { prop: "display", decl: "grid", computed: "grid", readable: "a grid", task: "Lay the cells out as a grid.", hint1: "Use the display value made for rows and columns together.", hint2: "Write grid after the colon." },
      { prop: "grid-template-columns", decl: "repeat(2, 1fr)", computed: null, check: "source", pattern: "grid-template-columns\\s*:\\s*repeat\\(2,\\s*1fr\\)", because: "Repeat asks for the same track twice without writing it twice.", readable: "two repeated columns", task: "Ask for two equal columns without writing the track twice.", hint1: "Use the function that repeats a track a number of times.", hint2: "Write repeat(2, 1fr) after the colon." },
      { prop: "row-gap", decl: "10px", computed: "10px", readable: "10 pixels between rows", task: "Space the rows apart.", hint1: "Use a pixel value for the gap between rows.", hint2: "Write 10px after the colon." },
      { prop: "column-gap", decl: "16px", computed: "16px", readable: "16 pixels between columns", task: "Use a wider gap between the columns.", hint1: "Use a pixel value for the gap between columns.", hint2: "Write 16px after the colon." },
      { prop: "align-items", decl: "stretch", computed: "stretch", readable: "cells of equal height", task: "Make every cell in a row the same height.", hint1: "Use the value that stretches children to fill the row.", hint2: "Write stretch after the colon." },
    ],
  },
  {
    id: "opacity-layer", noun: "notice", fixture: "banner", label: "a notice that sits above the page",
    steps: [
      { prop: "padding", decl: "16px", readProp: "padding-top", computed: "16px", readable: "16 pixels", task: "Give the notice room inside.", hint1: "Use a pixel value for the inside room.", hint2: "Write 16px after the colon." },
      { prop: "opacity", decl: "0.95", computed: "0.95", readable: "very slightly see-through", task: "Soften the notice very slightly.", hint1: "Use a number just below one.", hint2: "Write 0.95 after the colon." },
      { prop: "z-index", decl: "10", computed: "10", readable: "stacked above", task: "Keep the notice above anything it overlaps.", hint1: "Use a whole number; higher sits on top.", hint2: "Write 10 after the colon." },
      { prop: "position", decl: "relative", computed: "relative", readable: "positioned", task: "Give the stacking order something to apply to.", hint1: "Stacking only applies to a positioned element.", hint2: "Write relative after the colon." },
      { prop: "background-color", decl: "#fef2f2", computed: "rgb(254, 242, 242)", readable: "pale red", task: "Tint the notice so it reads as urgent.", hint1: "Use the pale red code.", hint2: "Write #fef2f2 after the colon." },
    ],
  },
  {
    id: "text-detail", noun: "card text", fixture: "card", label: "text with fine control",
    steps: [
      { prop: "text-transform", decl: "uppercase", computed: "uppercase", readable: "capital letters", task: "Put the card text in capitals.", hint1: "Use the value that makes every letter a capital.", hint2: "Write uppercase after the colon." },
      { prop: "font-style", decl: "normal", computed: null, check: "source", pattern: "font-style\\s*:\\s*normal", because: "The declaration must be present even though upright text is the browser default.", readable: "upright", task: "Keep the text upright rather than slanted.", hint1: "Use the value that means not italic.", hint2: "Write normal after the colon." },
      { prop: "text-decoration-line", decl: "underline", computed: "underline", readable: "underlined", task: "Underline the card text.", hint1: "Use the value that draws a line under the words.", hint2: "Write underline after the colon." },
      { prop: "text-indent", decl: "8px", computed: "8px", readable: "8 pixels of indent", task: "Indent the first line.", hint1: "Use a pixel value for the first-line indent.", hint2: "Write 8px after the colon." },
      { prop: "word-spacing", decl: "1px", computed: "1px", readable: "1 pixel between words", task: "Loosen the gaps between words slightly.", hint1: "Use a small pixel value.", hint2: "Write 1px after the colon." },
    ],
  },
  {
    id: "sizing-limits", noun: "card", fixture: "card", label: "a card with size limits",
    steps: [
      { prop: "min-width", decl: "240px", computed: "240px", readable: "240 pixels", task: "Stop the card shrinking below a readable width.", hint1: "Use a pixel value for the narrowest it may get.", hint2: "Write 240px after the colon." },
      { prop: "max-width", decl: "520px", computed: "520px", readable: "520 pixels", task: "Stop the card growing past a comfortable line length.", hint1: "Use a pixel value for the widest it may get.", hint2: "Write 520px after the colon." },
      { prop: "min-height", decl: "120px", computed: "120px", readable: "120 pixels", task: "Keep the card from collapsing when it holds little text.", hint1: "Use a pixel value for the shortest it may be.", hint2: "Write 120px after the colon." },
      { prop: "box-sizing", decl: "border-box", computed: "border-box", readable: "border box", task: "Count the padding inside those limits rather than on top of them.", hint1: "Use the sizing value that includes padding and border.", hint2: "Write border-box after the colon." },
      { prop: "padding", decl: "20px", readProp: "padding-top", computed: "20px", readable: "20 pixels", task: "Give the card room inside its limits.", hint1: "Use a pixel value for the inside room.", hint2: "Write 20px after the colon." },
    ],
  },
  {
    id: "pseudo-elements", noun: "notice", fixture: "banner", label: "a label added without markup",
    steps: [
      { prop: "position", decl: "relative", computed: "relative", readable: "positioned", task: "Make the notice the anchor for a label added by CSS.", hint1: "An added label is placed against a positioned element.", hint2: "Write relative after the colon." },
      { prop: "padding-top", decl: "32px", computed: "32px", readable: "32 pixels", task: "Leave room at the top for a label that is not in the HTML.", hint1: "Use a pixel value for the space above.", hint2: "Write 32px after the colon." },
      { prop: "content", sel: "::before", decl: "'Notice'", computed: null, check: "source", pattern: "::before\\s*\\{[^}]*content\\s*:\\s*'Notice'", because: "An added element needs content before the browser will draw it.", readable: "a label added by CSS", task: "Add the word Notice above the heading without touching the HTML.", hint1: "The added-element rule is open; give it something to say.", hint2: "Write 'Notice' after the colon, quotes included." },
      { prop: "color", sel: "::before", decl: "#b45309", computed: null, check: "source", pattern: "::before\\s*\\{[^}]*color\\s*:\\s*#b45309", because: "The added label takes a colour of its own.", readable: "an amber label", task: "Colour the added label amber.", hint1: "Set the colour inside the added-element rule.", hint2: "Write #b45309 after the colon." },
      { prop: "background-color", decl: "#fffbeb", computed: "rgb(255, 251, 235)", readable: "pale amber", task: "Tint the notice to match its label.", hint1: "Use the pale amber code.", hint2: "Write #fffbeb after the colon." },
    ],
  },
  {
    id: "flex-wrap", noun: "grid", fixture: "grid", label: "items that wrap on a narrow screen",
    steps: [
      { prop: "display", decl: "flex", computed: "flex", readable: "a flex box", task: "Lay the stalls out in a flexible row.", hint1: "Use the display value that lays children out in a row.", hint2: "Write flex after the colon." },
      { prop: "flex-wrap", decl: "wrap", computed: "wrap", readable: "wrapping onto new lines", task: "Let the stalls drop to the next line instead of squeezing.", hint1: "Use the value that allows a new line.", hint2: "Write wrap after the colon." },
      { prop: "gap", decl: "12px", readProp: "row-gap", computed: "12px", readable: "12 pixels", task: "Space the stalls apart in both directions.", hint1: "Use a pixel value for the gap.", hint2: "Write 12px after the colon." },
      { prop: "justify-content", decl: "flex-start", computed: "flex-start", readable: "packed to the start", task: "Keep the stalls packed to the left of each line.", hint1: "Use the value that packs children at the start.", hint2: "Write flex-start after the colon." },
      { prop: "align-content", decl: "flex-start", computed: "flex-start", readable: "lines packed to the top", task: "Keep the wrapped lines packed to the top.", hint1: "Use the value that packs the lines at the start.", hint2: "Write flex-start after the colon." },
    ],
  },
  {
    id: "fluid-sizing", noun: "card", fixture: "card", label: "sizes that adjust themselves",
    steps: [
      { prop: "width", decl: "min(100%, 480px)", computed: null, check: "source", pattern: "width\\s*:\\s*min\\(\\s*100%\\s*,\\s*480px\\s*\\)", because: "min takes whichever of the two is smaller, so the card fits a phone and stops at 480px on a laptop.", readable: "whichever is smaller", task: "Let the card fill a narrow screen but stop at 480 pixels on a wide one.", hint1: "Use the function that takes whichever value is smaller.", hint2: "Write min(100%, 480px) after the colon." },
      { prop: "font-size", decl: "clamp(14px, 4vw, 18px)", computed: null, check: "source", pattern: "font-size\\s*:\\s*clamp\\(\\s*14px\\s*,\\s*4vw\\s*,\\s*18px\\s*\\)", because: "clamp names a smallest size, a size that follows the screen, and a largest.", readable: "text between 14 and 18 pixels", task: "Let the text grow with the screen but never below 14 or above 18 pixels.", hint1: "Name the smallest size, the one that follows the screen, and the largest.", hint2: "Write clamp(14px, 4vw, 18px) after the colon." },
      { prop: "aspect-ratio", decl: "3 / 2", computed: null, check: "source", pattern: "aspect-ratio\\s*:\\s*3\\s*/\\s*2", because: "A ratio keeps the card's shape as its width changes.", readable: "a fixed shape", task: "Keep the card the same shape whatever width it takes.", hint1: "Write the width and height as a ratio with a slash.", hint2: "Write 3 / 2 after the colon." },
      { prop: "padding", decl: "16px", readProp: "padding-top", computed: "16px", readable: "16 pixels", task: "Give the card room inside.", hint1: "Use a pixel value for the inside room.", hint2: "Write 16px after the colon." },
      { prop: "box-sizing", decl: "border-box", computed: "border-box", readable: "border box", task: "Count the padding inside the width rather than on top of it.", hint1: "Use the sizing value that includes padding and border.", hint2: "Write border-box after the colon." },
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
