"use client";

import { useRef, useState } from "react";

/**
 * The certificate itself, drawn once as SVG.
 *
 * One design, always light. A certificate is a document a learner shows to
 * somebody else — it is printed, attached, and posted — so it does not follow
 * the reader's theme the way the app's screens do. The colours here are fixed
 * rather than tokens for exactly that reason.
 *
 * SVG rather than HTML because it gives one source of truth for all three
 * outputs: the page, the PNG, and the print. The PNG is that same markup drawn
 * to a canvas; the print stylesheet shows this element and hides the rest.
 */

const WIDTH = 1200;
const HEIGHT = 850;
const INK = "#0d1526";
const MUTED = "#4a5568";
const LINE = "#c9d2e3";
const PAPER = "#ffffff";
const ACCENT = "#002576";
const FONT = "Inter, 'Segoe UI', Helvetica, Arial, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, 'Courier New', monospace";

function nameSize(name: string): number {
  if (name.length > 40) return 34;
  if (name.length > 28) return 42;
  return 52;
}

export function CertificateCard({
  name,
  code,
  issuedAt,
  credential = "Front-End Development Certificate of Completion"
}: {
  name: string;
  code?: string;
  issuedAt?: string;
  credential?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [busy, setBusy] = useState(false);
  const fileName = `codedaddy-certificate-${(name || "learner").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "learner"}`;

  const downloadPng = async () => {
    const node = svgRef.current;
    if (!node || busy) return;
    setBusy(true);
    try {
      const markup = new XMLSerializer().serializeToString(node);
      const source = URL.createObjectURL(new Blob([markup], { type: "image/svg+xml;charset=utf-8" }));
      const image = new Image();
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("render failed"));
        image.src = source;
      });
      // Twice the drawing size, so the file stays sharp when it is scaled up
      // in a document or a profile page.
      const canvas = document.createElement("canvas");
      canvas.width = WIDTH * 2;
      canvas.height = HEIGHT * 2;
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = PAPER;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
      URL.revokeObjectURL(source);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) return;
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = `${fileName}.png`;
      link.click();
      URL.revokeObjectURL(href);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="certificate-sheet overflow-hidden rounded-xl border border-hairline bg-white">
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          width="100%"
          role="img"
          aria-label={`${credential} presented to ${name}`}
          style={{ display: "block" }}
        >
          <rect width={WIDTH} height={HEIGHT} fill={PAPER} />
          <rect x="28" y="28" width={WIDTH - 56} height={HEIGHT - 56} fill="none" stroke={ACCENT} strokeWidth="3" />
          <rect x="44" y="44" width={WIDTH - 88} height={HEIGHT - 88} fill="none" stroke={LINE} strokeWidth="1" />

          <text x={WIDTH / 2} y="150" textAnchor="middle" fontFamily={MONO} fontSize="17" letterSpacing="5" fill={ACCENT}>
            CODEDADDY
          </text>
          <text x={WIDTH / 2} y="188" textAnchor="middle" fontFamily={MONO} fontSize="14" letterSpacing="3" fill={MUTED}>
            FRONT-END DEVELOPMENT
          </text>

          <text x={WIDTH / 2} y="285" textAnchor="middle" fontFamily={FONT} fontSize="58" fontWeight="700" fill={INK}>
            Certificate of Completion
          </text>

          <line x1="300" y1="330" x2={WIDTH - 300} y2="330" stroke={LINE} strokeWidth="1" />

          <text x={WIDTH / 2} y="400" textAnchor="middle" fontFamily={FONT} fontSize="19" fill={MUTED}>
            Presented to
          </text>
          <text x={WIDTH / 2} y="470" textAnchor="middle" fontFamily={FONT} fontSize={nameSize(name)} fontWeight="700" fill={INK}>
            {name}
          </text>

          <text x={WIDTH / 2} y="540" textAnchor="middle" fontFamily={FONT} fontSize="19" fill={MUTED}>
            for completing all ten guided courses and five authored,
          </text>
          <text x={WIDTH / 2} y="570" textAnchor="middle" fontFamily={FONT} fontSize="19" fill={MUTED}>
            browser-checked capstone projects.
          </text>

          <line x1="120" y1="650" x2={WIDTH - 120} y2="650" stroke={LINE} strokeWidth="1" />

          <text x="120" y="690" fontFamily={MONO} fontSize="13" fill={MUTED}>
            {issuedAt ? `ISSUED ${issuedAt}` : "PREVIEW — NOT YET ISSUED"}
          </text>
          <text x={WIDTH - 120} y="690" textAnchor="end" fontFamily={MONO} fontSize="13" fill={MUTED}>
            {code ? `VERIFY /certificate/${code}` : "VERIFICATION CODE ON ISSUE"}
          </text>

          <text x={WIDTH / 2} y="762" textAnchor="middle" fontFamily={FONT} fontSize="14" fill={MUTED}>
            Certificate of Completion only. Not accreditation, employment readiness, or
          </text>
          <text x={WIDTH / 2} y="786" textAnchor="middle" fontFamily={FONT} fontSize="14" fill={MUTED}>
            independent competency certification. The linked portfolio is the inspectable evidence.
          </text>
        </svg>
      </div>

      <div className="certificate-actions mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void downloadPng()}
          disabled={busy}
          className="min-h-11 rounded-lg bg-primary px-5 font-mono text-[12px] font-bold text-on-primary disabled:opacity-50"
        >
          {busy ? "Preparing…" : "Download PNG"}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="min-h-11 rounded-lg border border-primary px-5 font-mono text-[12px] font-bold text-primary"
        >
          Download PDF
        </button>
        <p className="w-full text-[13px] leading-relaxed text-ash">
          PDF uses your browser&apos;s print dialog: choose <strong>Save as PDF</strong> as the destination. Only the certificate is printed.
        </p>
      </div>
    </div>
  );
}
