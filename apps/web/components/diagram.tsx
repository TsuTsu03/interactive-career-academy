"use client";

import { type Diagram } from "@/lib/lesson-ir";

/**
 * Renders an authored diagram from structured data.
 *
 * Not arbitrary SVG. The lesson supplies boxes, arrows, and labels, and this
 * component decides how they look, so diagrams stay tiny, themeable, and
 * consistent, and a lesson can never inject markup.
 *
 * Anything the learner can actually see in the browser should be a live demo
 * instead. This is for the things they cannot see: how a request travels,
 * what a variable holds, which rule matches which element.
 */

const NODE_W = 132;
const NODE_H = 56;
const GAP_X = 42;
const GAP_Y = 46;

export function DiagramView({ diagram }: { diagram: Diagram }) {
  const cols = Math.max(1, diagram.columns);
  const rows = Math.ceil(diagram.nodes.length / cols);

  const pos = new Map<string, { x: number; y: number }>();
  diagram.nodes.forEach((n, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    pos.set(n.id, {
      x: col * (NODE_W + GAP_X),
      y: row * (NODE_H + GAP_Y),
    });
  });

  const width = cols * NODE_W + (cols - 1) * GAP_X;
  const height = rows * NODE_H + (rows - 1) * GAP_Y;

  return (
    <figure className="my-4">
      <div className="overflow-x-auto rounded-lg border border-hairline bg-void p-4">
        <svg
          viewBox={`-8 -8 ${width + 16} ${height + 16}`}
          width={width + 16}
          height={height + 16}
          role="img"
          aria-label={diagram.alt}
          className="max-w-full"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-ash)" />
            </marker>
          </defs>

          {diagram.arrows.map((a, i) => {
            const from = pos.get(a.from);
            const to = pos.get(a.to);
            if (!from || !to) return null;

            const sameRow = from.y === to.y;
            const x1 = sameRow ? from.x + NODE_W : from.x + NODE_W / 2;
            const y1 = sameRow ? from.y + NODE_H / 2 : from.y + NODE_H;
            const x2 = sameRow ? to.x : to.x + NODE_W / 2;
            const y2 = sameRow ? to.y + NODE_H / 2 : to.y;

            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--color-ash)"
                  strokeWidth="1.5"
                  markerEnd="url(#arrowhead)"
                />
                {a.label ? (
                  <text
                    x={(x1 + x2) / 2}
                    y={(y1 + y2) / 2 - 6}
                    textAnchor="middle"
                    fill="var(--color-ash)"
                    fontSize="11"
                    fontFamily="var(--font-mono)"
                  >
                    {a.label}
                  </text>
                ) : null}
              </g>
            );
          })}

          {diagram.nodes.map((n) => {
            const p = pos.get(n.id);
            if (!p) return null;
            const accent = n.tone === "accent";
            const ghost = n.tone === "ghost";
            return (
              <g key={n.id}>
                <rect
                  x={p.x}
                  y={p.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="4"
                  fill={accent ? "color-mix(in srgb, var(--color-voltage) 10%, var(--color-panel))" : "var(--color-panel)"}
                  stroke={accent ? "var(--color-voltage)" : ghost ? "var(--color-hairline)" : "var(--color-ash)"}
                  strokeWidth={accent ? 2 : 1.5}
                  strokeDasharray={ghost ? "4 4" : undefined}
                />
                <text
                  x={p.x + NODE_W / 2}
                  y={p.y + (n.note ? NODE_H / 2 - 4 : NODE_H / 2 + 4)}
                  textAnchor="middle"
                  fill={accent ? "var(--color-voltage)" : ghost ? "var(--color-ash)" : "var(--color-chalk)"}
                  fontSize="13"
                  fontWeight={accent ? 700 : 500}
                >
                  {n.label}
                </text>
                {n.note ? (
                  <text
                    x={p.x + NODE_W / 2}
                    y={p.y + NODE_H / 2 + 14}
                    textAnchor="middle"
                    fill="var(--color-ash)"
                    fontSize="11"
                    fontFamily="var(--font-mono)"
                  >
                    {n.note}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}
