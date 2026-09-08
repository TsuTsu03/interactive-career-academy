/**
 * Lesson intermediate representation.
 *
 * Authored content is compiled to this shape in CI and shipped as data.
 * The application never evaluates MDX or any authored source at runtime.
 * See PLAN.md sections 5 and 8.
 */

/**
 * One clear, patient learner-facing voice. `Copy` remains as a semantic alias
 * so lesson fields stay easy to identify, not as a second rendering system.
 */
export type Copy = string;

/* ------------------------------------------------------------------ */
/* Concepts                                                            */
/*                                                                     */
/* Every new idea is introduced in four forms at once. This is dual    */
/* coding, not learning styles: the evidence does not support matching */
/* instruction to a learner's stated preference, and does support      */
/* giving everyone the same idea in several forms.                     */
/* PLAN.md section 5.                                                  */
/* ------------------------------------------------------------------ */

/**
 * A diagram, authored as data rather than as arbitrary SVG.
 *
 * The primitives are deliberately few. Anything the learner can actually see
 * in the browser should be a live demo instead, because the browser is a
 * better illustration than a drawing and it cannot go stale.
 */
export interface Diagram {
  /** Rendered above the diagram for screen readers and when images are off. */
  alt: Copy;
  nodes: DiagramNode[];
  arrows: DiagramArrow[];
  /** Grid columns the nodes are laid out across. Keeps authoring simple. */
  columns: number;
}

export interface DiagramNode {
  id: string;
  label: string;
  /** `box` is neutral, `accent` is the thing being taught, `ghost` is context. */
  tone?: "box" | "accent" | "ghost";
  /** Optional monospace sub-label, e.g. a value or a tag name. */
  note?: string;
}

export interface DiagramArrow {
  from: string;
  to: string;
  label?: string;
}

/**
 * The four representations of one idea. All four are required; a concept with
 * a missing form is rejected by the authoring harness rather than shipped.
 */
export interface Concept {
  id: string;
  /** The word being introduced, e.g. "class", "variable", "request". */
  term: string;
  /** 1. What it is, in plain words. */
  definition: Copy;
  /** 2. Something from ordinary life that behaves the same way. */
  analogy: Copy;
  /**
   * 3. The picture. Either a small authored diagram for things you cannot
   * see, or a live demo for things you can. Live demos are preferred.
   */
  visual:
    | { kind: "diagram"; diagram: Diagram }
    | {
        kind: "live-demo";
        /** Rendered in an isolated frame beside the explanation. */
        files: Record<string, string>;
        caption: Copy;
      };
  /** 4. What the learner is about to do that proves it. One sentence. */
  proof: Copy;
}

export type InputMode = "tap-to-build" | "fill-blank" | "guided" | "free";

/**
 * Deterministic browser capabilities available to JavaScript lessons.
 *
 * Real network and browser storage are deliberately unavailable inside the
 * opaque runner. These plain-data fixtures let a lesson practise the real
 * `fetch` and `localStorage` APIs without reaching the platform origin or an
 * external service. The runner owns the small in-memory implementations.
 */
export interface RuntimeFixtures {
  fetch?: Record<
    string,
    {
      status: number;
      body: unknown;
      headers?: Record<string, string>;
    }
  >;
  storage?: Record<string, string>;
}

/**
 * How a step is run and checked.
 *
 * `web` renders HTML and CSS and asserts against the resulting document.
 * `js` executes the learner's script in an isolated frame and asserts against
 * its console output, its declared values, and its source.
 * `react` renders a learner component inside a disposable opaque-origin frame
 * and checks the DOM snapshot inside that frame through typed messages.
 * `sql` runs the learner's query against an in-memory SQLite database, built
 * fresh from the step's `sqlSeed`, and asserts against the rows it returned.
 */
export type StepKind = "web" | "js" | "react" | "sql";

/**
 * Deterministic assertions. Each kind is a closed variant so a lesson can
 * never smuggle executable code into the grader.
 */
export type TestSpec =
  // --- Document assertions (web steps) ---
  | { id: string; label: Copy; kind: "exists"; selector: string }
  | { id: string; label: Copy; kind: "count"; selector: string; atLeast: number }
  | { id: string; label: Copy; kind: "text-not-empty"; selector: string }
  | { id: string; label: Copy; kind: "text-equals"; selector: string; value: string }
  | { id: string; label: Copy; kind: "text-contains"; selector: string; value: string }
  | {
      id: string;
      label: Copy;
      kind: "style";
      selector: string;
      prop: string;
      equals: string;
      /** Shown to the learner instead of the raw CSS value. */
      readable?: string;
    }
  | { id: string; label: Copy; kind: "attr"; selector: string; attr: string; nonEmpty: true }
  | {
      id: string;
      label: Copy;
      kind: "attr-equals";
      selector: string;
      attr: string;
      value: string;
    }

  // --- Script assertions (js steps) ---
  /** The learner's script printed these lines, in order, via console.log. */
  | { id: string; label: Copy; kind: "js-logs"; values: string[] }
  /** Evaluating this expression in the learner's scope yields `equals`. */
  | { id: string; label: Copy; kind: "js-value"; expression: string; equals: unknown }
  /** Calling this function with these arguments returns `equals`. */
  | {
      id: string;
      label: Copy;
      kind: "js-returns";
      fn: string;
      args: unknown[];
      equals: unknown;
    }
  /** The script ran without throwing. */
  | { id: string; label: Copy; kind: "js-runs" }

  // --- React assertions (react steps) ---
  | { id: string; label: Copy; kind: "react-exists"; selector: string }
  | {
      id: string;
      label: Copy;
      kind: "react-text-equals";
      selector: string;
      value: string;
    }
  | {
      id: string;
      label: Copy;
      kind: "react-attr-equals";
      selector: string;
      attr: string;
      value: string;
    }
  | {
      id: string;
      label: Copy;
      kind: "react-click-text-equals";
      clickSelector: string;
      selector: string;
      value: string;
    }
  | {
      id: string;
      label: Copy;
      kind: "react-click-attr-equals";
      clickSelector: string;
      selector: string;
      attr: string;
      value: string;
    }
  | {
      id: string;
      label: Copy;
      kind: "react-input-text-equals";
      inputSelector: string;
      inputValue: string;
      selector: string;
      value: string;
    }
  | {
      id: string;
      label: Copy;
      kind: "react-document-title-equals";
      value: string;
    }
  | {
      id: string;
      label: Copy;
      kind: "react-click-focus-equals";
      clickSelector: string;
      selector: string;
    }

  // --- Page assertions: the document *after* the learner's script ran ---
  /**
   * These differ from the plain `exists` / `text-equals` family above, which
   * describe the markup the learner wrote and are checked in a frame where
   * nothing executes. A lesson about `addEventListener` cannot be graded
   * there, because the script never runs. These are checked in the page
   * runner instead: an `allow-scripts` frame that loads the markup, runs
   * `script.js`, and only then asserts. See `lib/page-runner.ts`.
   *
   * Every variant is plain data, exactly as rule 1.7 requires. Nothing here
   * carries a function or a string that gets evaluated.
   */
  | { id: string; label: Copy; kind: "page-exists"; selector: string }
  | { id: string; label: Copy; kind: "page-text-equals"; selector: string; value: string }
  | {
      id: string;
      label: Copy;
      kind: "page-attr-equals";
      selector: string;
      attr: string;
      value: string;
    }
  | { id: string; label: Copy; kind: "page-class-contains"; selector: string; value: string }
  | { id: string; label: Copy; kind: "page-class-not-contains"; selector: string; value: string }
  /** Clicks `clickSelector`, then reads `selector`. Proves a handler ran. */
  | {
      id: string;
      label: Copy;
      kind: "page-click-text-equals";
      clickSelector: string;
      selector: string;
      value: string;
    }
  | {
      id: string;
      label: Copy;
      kind: "page-click-attr-equals";
      clickSelector: string;
      selector: string;
      attr: string;
      value: string;
    }
  | {
      id: string;
      label: Copy;
      kind: "page-click-class-contains";
      clickSelector: string;
      selector: string;
      value: string;
    }
  /** Types into `inputSelector`, fires input and change, then reads `selector`. */
  | {
      id: string;
      label: Copy;
      kind: "page-input-text-equals";
      inputSelector: string;
      selector: string;
      type: string;
      value: string;
    }

  // --- SQL assertions (sql steps) ---
  /**
   * These describe the database after the learner's SQL ran, and the rows it
   * returned. They are checked in `lib/sql-runner.ts`, which builds a fresh
   * in-memory SQLite database from the step's `sqlSeed` every time, so a
   * result is a fact about the query and never about a previous step.
   *
   * `resultIndex` selects which returned result set to assert against, for
   * the rare step that runs more than one statement. It defaults to 0.
   */
  /** The SQL ran without an error. The floor check for any query step. */
  | { id: string; label: Copy; kind: "sql-runs" }
  /** The rows returned, exactly, in order. Order-sensitive on purpose: a step
   * that asks for sorting is only correct if the sorting is there. */
  | {
      id: string;
      label: Copy;
      kind: "sql-rows-equal";
      rows: unknown[][];
      resultIndex?: number;
      /** Set when the step has not taught ORDER BY yet. */
      ignoreOrder?: boolean;
    }
  /** One expected row appears among the rows returned. */
  | { id: string; label: Copy; kind: "sql-row-contains"; row: unknown[]; resultIndex?: number }
  /** Exactly this many rows came back. */
  | { id: string; label: Copy; kind: "sql-row-count"; count: number; resultIndex?: number }
  /** The result has these columns, in this order. Checks SELECT lists and aliases. */
  | { id: string; label: Copy; kind: "sql-columns-equal"; columns: string[]; resultIndex?: number }
  /** A single cell equals this value. For aggregates: one COUNT, one SUM. */
  | {
      id: string;
      label: Copy;
      kind: "sql-value-equals";
      row: number;
      column: number;
      value: unknown;
      resultIndex?: number;
    }
  /** The named table exists after the statement ran. For CREATE TABLE steps. */
  | { id: string; label: Copy; kind: "sql-table-exists"; table: string }

  // --- Source assertions (any kind) ---
  /**
   * The source matches this pattern. Used for teaching syntax the result
   * alone cannot prove, such as "use const" or "write a for loop".
   * Stored as a string and compiled with `new RegExp` inside the grader only.
   */
  | {
      id: string;
      label: Copy;
      kind: "source-matches";
      file: string;
      pattern: string;
      flags?: string;
      /** Explains the requirement without leaking the exact answer. */
      because: Copy;
    };

export interface Hint {
  level: number;
  text: Copy;
}

export interface Step {
  id: string;
  /** 1-based position shown to the learner as "Step N of M". */
  index: number;
  task: Copy;
  kind: StepKind;
  inputMode: InputMode;
  /** Starting code for this step, keyed by filename. */
  files: Record<string, string>;
  activeFile: string;
  /** Lines the learner may not edit, 1-based. */
  readonlyLines?: number[];
  /** Substring in the active file to ring in Voltage as the thing to change. */
  highlightToken?: string;
  /**
   * `sql` steps only. Authored SQL that builds the starting database, run
   * before the learner's query every time, in a database that is thrown away
   * afterwards. The learner never sees or edits it, which is why it is a
   * field of its own rather than another entry in `files`.
   */
  sqlSeed?: string;
  /** tap-to-build only: the tray contents and which one is correct. */
  blocks?: string[];
  correctBlock?: string;
  /** tap-to-build only: the placeholder line the block lands on, 1-based. */
  slotLine?: number;
  tests: TestSpec[];
  hints: Hint[];
  xp: number;
  /**
   * Code that should make every test pass.
   *
   * Required for any drafted step. The harness uses it for the two checks
   * that matter: the solution must pass, and the *starting* code must fail.
   * A step whose tests already pass before the learner touches anything
   * teaches nothing, and that is the single most common way a generated
   * lesson is silently worthless.
   */
  solution?: Record<string, string>;
  /**
   * Ids of concepts introduced for the first time by this step, resolved
   * against the global registry in `content/concepts.ts`. Shown above the
   * task before the learner is asked to do anything, so a new word is never
   * used before it has been explained. Most steps introduce none.
   *
   * Concepts are global, not per-course, because the same word (e.g.
   * "class") can recur in a later course. A shared id means it is defined
   * once, reviewed once, and never drifts into two different wordings.
   * PLAN.md section 5.
   */
  conceptIds?: string[];
  /** Authored estimate in minutes, used for pacing and for the harness. */
  estimatedMinutes?: number;
  /** The project (within this course) this step belongs to. See `Project`. */
  projectId: string;
  /** Optional deterministic APIs for JavaScript lessons. Plain data only. */
  runtimeFixtures?: RuntimeFixtures;
}

/**
 * One finished, shareable build within a course. A course is many small
 * projects, freeCodeCamp style, not one project stretched across thousands
 * of steps: nobody survives step 900 of the same card. The learner never
 * starts a project from a blank file — each step begins where the last one
 * ended, but that continuity is scoped to the project, not the whole course.
 *
 * Finishing a project is a milestone: a named completion moment and a
 * shareable artifact, not a gate. Projects do not lock each other beyond the
 * course's existing linear step order, and they do not themselves issue a
 * certificate — only the five independent capstone projects behind the v1
 * Front-End Development certificate do that. PLAN.md sections 4 and 6.
 */
export interface Project {
  id: string;
  /** "Sari-Sari Store Page" — shown on the course map and the completion screen. */
  title: string;
}

/**
 * A course is many small projects built across many small steps, the way
 * freeCodeCamp structures its curriculum. The learner never starts from a
 * blank file mid-project: each step begins where the last one ended.
 */
export interface Course {
  id: string;
  /** "Learn HTML by Building a Sari-Sari Store Page" */
  title: string;
  /** The first project's name, for the map: "Sari-Sari Store Page" */
  project: string;
  /** Every project in this course, in order. Every step's `projectId` must match one. */
  projects: Project[];
  order: number;
  summary: Copy;
  /** Course ids that should be finished first. */
  requires: string[];
  kind: StepKind;
  steps: Step[];
}

export interface Program {
  id: string;
  title: string;
  summary: Copy;
  /** Course ids in the order shown inside this program. */
  courseIds: string[];
}

export interface Curriculum {
  id: string;
  title: string;
  programs: Program[];
  courses: Course[];
}

export function copy(c: Copy): string {
  return c;
}

export function totalXp(course: Course): number {
  return course.steps.reduce((n, s) => n + s.xp, 0);
}
