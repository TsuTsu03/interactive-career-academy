import { type Diagram, type DiagramArrow } from "@/lib/lesson-ir";

/**
 * Renders an authored diagram from structured data.
 *
 * Not arbitrary SVG. The lesson supplies boxes, arrows, and labels, and this
 * component decides how they look, so diagrams stay tiny, themeable, and
 * consistent, and a lesson can never inject markup.
 *
 * The layout reads top to bottom rather than left to right. Diagrams live in
 * the instruction column, which is around 300 pixels wide on a phone and not
 * much more beside the editor. A three-across row scaled down to fit that
 * width put the labels at roughly eight pixels — present, unreadable, and
 * therefore not teaching anything. Stacked, every box gets the full column,
 * the text is real text that wraps and follows the reader's font size, and
 * the order still carries the sequence.
 *
 * Anything the learner can actually see in the browser should be a live demo
 * instead. This is for the things they cannot see: how a request travels,
 * what a variable holds, which rule matches which element.
 */

function boxTone(tone: Diagram["nodes"][number]["tone"]): string {
  if (tone === "accent") return "border-voltage bg-voltage/10 text-voltage";
  if (tone === "ghost") return "border-dashed border-hairline text-ash";
  return "border-ash text-chalk";
}

/** The line and chevron between two stacked boxes, with the arrow's own label. */
function Connector({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 py-1 pl-[22px]">
      <span aria-hidden="true" className="flex flex-col items-center">
        <span className="h-3 w-px bg-ash" />
        <span className="-mt-px block h-0 w-0 border-x-4 border-t-[6px] border-x-transparent border-t-ash" />
      </span>
      {label ? <span className="font-mono text-[11px] text-ash">{label}</span> : null}
    </div>
  );
}

export function DiagramView({ diagram }: { diagram: Diagram }) {
  const order = new Map(diagram.nodes.map((node, index) => [node.id, index]));

  // An arrow between neighbours becomes the connector between their boxes.
  // Anything else — a branch, or a jump back — is listed underneath, so a
  // vertical stack never silently drops a relationship the author wrote.
  const between = new Map<number, string | undefined>();
  const extra: DiagramArrow[] = [];

  for (const arrow of diagram.arrows) {
    const from = order.get(arrow.from);
    const to = order.get(arrow.to);
    if (from !== undefined && to === from + 1 && !between.has(from)) {
      between.set(from, arrow.label);
    } else if (from !== undefined && to !== undefined) {
      extra.push(arrow);
    }
  }

  const labelFor = (id: string) =>
    diagram.nodes.find((node) => node.id === id)?.label ?? id;

  return (
    <figure className="my-4 rounded-lg border border-hairline bg-void p-4">
      <figcaption className="sr-only">{diagram.alt}</figcaption>

      <ol>
        {diagram.nodes.map((node, index) => (
          <li key={node.id}>
            <div className={`rounded border-2 px-3 py-2 ${boxTone(node.tone)}`}>
              <p className={`text-[14px] leading-snug ${node.tone === "accent" ? "font-bold" : "font-medium"}`}>
                {node.label}
              </p>
              {node.note ? (
                <p className="mt-1 font-mono text-[12px] leading-snug text-ash">{node.note}</p>
              ) : null}
            </div>
            {index < diagram.nodes.length - 1 ? <Connector label={between.get(index)} /> : null}
          </li>
        ))}
      </ol>

      {extra.length > 0 ? (
        <ul className="mt-3 space-y-1 border-t border-hairline pt-3 font-mono text-[11px] text-ash">
          {extra.map((arrow, index) => (
            <li key={index}>
              {labelFor(arrow.from)} → {labelFor(arrow.to)}
              {arrow.label ? `: ${arrow.label}` : ""}
            </li>
          ))}
        </ul>
      ) : null}
    </figure>
  );
}
