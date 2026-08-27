/**
 * tw-topics.mjs - the Tailwind utilities the course still has to teach.
 *
 * WHY THE CSS RULE IS WRITTEN OUT HERE
 *
 * This course does not run Tailwind. Each step ships the one hand-written CSS
 * rule that the utility it teaches would compile to, and the grading frame
 * reads that back the same way it reads any other stylesheet - see the note at
 * the top of content/tailwind-course.ts. So a utility is only teachable here
 * if its real Tailwind output is known exactly: `p-4` is `padding: 1rem`, not
 * `16px` and not `1em`, and `text-2xl` carries a line height as well as a size.
 *
 * A model cannot supply that. It can guess a plausible rule, and a plausible
 * rule produces a lesson that teaches the wrong CSS under the right class
 * name, which is worse than teaching nothing. So the class, the rule, and the
 * expected computed value are all fixed here, and the model writes only the
 * words on the page.
 *
 * `check: "source"` is for a utility whose effect the static grading frame
 * cannot read back - a shorthand that expands to several properties, or a
 * state variant that needs a real pointer. Those are matched against the class
 * list instead, which is what the hand-authored steps already do.
 */

/**
 * Elements a topic can be taught against. `tag` and `text` make the fixture;
 * `slots` are what the model fills in.
 */
export const TW_FIXTURES = {
  card: { tag: "article", slots: ["a heading of two or three words"], text: (s) => s[0] },
  notice: { tag: "aside", slots: ["a one-sentence notice under 10 words"], text: (s) => s[0] },
  row: { tag: "div", slots: ["an item name", "a price like PHP 85"], text: (s) => `${s[0]} - ${s[1]}` },
  badge: { tag: "span", slots: ["a status word, one or two words"], text: (s) => s[0] },
};

export const TW_TOPICS = [
  {
    id: "spacing-size", label: "spacing and size utilities", fixture: "card",
    steps: [
      { cls: "max-w-sm", rule: ".max-w-sm {\n  max-width: 24rem;\n}", prop: "max-width", computed: "384px", readable: "384 pixels", task: "Stop the card growing too wide to read.", hint: "Add the small max-width utility." },
      { cls: "p-4", rule: ".p-4 {\n  padding: 1rem;\n}", prop: "padding-top", computed: "16px", readable: "16 pixels", task: "Give the card room inside.", hint: "Add the four-step padding utility." },
      { cls: "mb-6", rule: ".mb-6 {\n  margin-bottom: 1.5rem;\n}", prop: "margin-bottom", computed: "24px", readable: "24 pixels", task: "Leave space below the card.", hint: "Add the six-step bottom-margin utility." },
      { cls: "mt-2", rule: ".mt-2 {\n  margin-top: 0.5rem;\n}", prop: "margin-top", computed: "8px", readable: "8 pixels", task: "Leave a small space above the card.", hint: "Add the two-step top-margin utility." },
      { cls: "px-6", rule: ".px-6 {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}", check: "source", readable: "wider side padding", task: "Widen the room on the left and right only.", hint: "Add the six-step horizontal padding utility." },
    ],
  },
  {
    id: "colour-surface", label: "colour utilities", fixture: "notice",
    steps: [
      { cls: "bg-amber-50", rule: ".bg-amber-50 {\n  background-color: #fffbeb;\n}", prop: "background-color", computed: "rgb(255, 251, 235)", readable: "pale amber", task: "Give the notice a pale amber surface.", hint: "Add the lightest amber background utility." },
      { cls: "text-amber-900", rule: ".text-amber-900 {\n  color: #78350f;\n}", prop: "color", computed: "rgb(120, 53, 15)", readable: "dark amber", task: "Darken the notice words so they have enough contrast.", hint: "Add the darkest amber text utility." },
      { cls: "p-4", rule: ".p-4 {\n  padding: 1rem;\n}", prop: "padding-top", computed: "16px", readable: "16 pixels", task: "Give the notice room inside.", hint: "Add the four-step padding utility." },
      { cls: "rounded-lg", rule: ".rounded-lg {\n  border-radius: 0.5rem;\n}", prop: "border-top-left-radius", computed: "8px", readable: "8 pixels", task: "Round the notice corners.", hint: "Add the large corner-radius utility." },
      { cls: "border-amber-200", rule: ".border-amber-200 {\n  border: 1px solid #fde68a;\n}", check: "source", readable: "a faint amber edge", task: "Give the notice a faint amber edge.", hint: "Add the light amber border utility." },
    ],
  },
  {
    id: "type-scale", label: "text utilities", fixture: "card",
    steps: [
      { cls: "text-xl", rule: ".text-xl {\n  font-size: 1.25rem;\n}", prop: "font-size", computed: "20px", readable: "20 pixels", task: "Make the card heading larger.", hint: "Add the extra-large text-size utility." },
      { cls: "font-semibold", rule: ".font-semibold {\n  font-weight: 600;\n}", prop: "font-weight", computed: "600", readable: "semibold", task: "Give the heading more weight.", hint: "Add the semibold weight utility." },
      { cls: "leading-relaxed", rule: ".leading-relaxed {\n  line-height: 1.625;\n}", prop: "line-height", computed: "32.5px", readable: "relaxed line spacing", task: "Open up the space between lines.", hint: "Add the relaxed line-height utility." },
      { cls: "tracking-wide", rule: ".tracking-wide {\n  letter-spacing: 0.025em;\n}", prop: "letter-spacing", computed: "0.5px", readable: "wide letter spacing", task: "Loosen the letters slightly.", hint: "Add the wide letter-spacing utility." },
      { cls: "text-center", rule: ".text-center {\n  text-align: center;\n}", prop: "text-align", computed: "center", readable: "centred", task: "Centre the heading.", hint: "Add the centred text utility." },
    ],
  },
  {
    id: "flex-row", label: "flex layout utilities", fixture: "row",
    steps: [
      { cls: "flex", rule: ".flex {\n  display: flex;\n}", prop: "display", computed: "flex", readable: "a flex row", task: "Put the name and the price on one line.", hint: "Add the flex display utility." },
      { cls: "justify-between", rule: ".justify-between {\n  justify-content: space-between;\n}", prop: "justify-content", computed: "space-between", readable: "pushed apart", task: "Push the price to the far right.", hint: "Add the space-between utility." },
      { cls: "items-center", rule: ".items-center {\n  align-items: center;\n}", prop: "align-items", computed: "center", readable: "centred across", task: "Line the two up through their middles.", hint: "Add the centred cross-axis utility." },
      { cls: "gap-3", rule: ".gap-3 {\n  gap: 0.75rem;\n}", prop: "column-gap", computed: "12px", readable: "12 pixels", task: "Keep a minimum gap between them.", hint: "Add the three-step gap utility." },
      { cls: "p-3", rule: ".p-3 {\n  padding: 0.75rem;\n}", prop: "padding-top", computed: "12px", readable: "12 pixels", task: "Give the row room inside.", hint: "Add the three-step padding utility." },
    ],
  },
  {
    id: "badge-shape", label: "utilities that shape a small label", fixture: "badge",
    steps: [
      { cls: "inline-block", rule: ".inline-block {\n  display: inline-block;\n}", prop: "display", computed: "inline-block", readable: "an inline block", task: "Let the badge take padding while staying in the line of text.", hint: "Add the inline-block display utility." },
      { cls: "px-2", rule: ".px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}", check: "source", readable: "side padding", task: "Give the badge room on its left and right.", hint: "Add the two-step horizontal padding utility." },
      { cls: "py-1", rule: ".py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}", check: "source", readable: "top and bottom padding", task: "Give the badge a little room above and below.", hint: "Add the one-step vertical padding utility." },
      { cls: "rounded-full", rule: ".rounded-full {\n  border-radius: 9999px;\n}", prop: "border-top-left-radius", computed: "9999px", readable: "fully rounded ends", task: "Round the badge into a pill shape.", hint: "Add the fully-rounded utility." },
      { cls: "text-sm", rule: ".text-sm {\n  font-size: 0.875rem;\n}", prop: "font-size", computed: "14px", readable: "14 pixels", task: "Make the badge text smaller than the words around it.", hint: "Add the small text-size utility." },
    ],
  },
];
