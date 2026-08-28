import { ImageResponse } from "next/og";

export const alt =
  "CodeDaddy — learn web development by building Philippines-first projects in your browser";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time from the Manila Modernist tokens, so the share card
 * carries no extra binary in the repo and cannot drift from the brand colours.
 * Plain shapes and text only: this file ships nothing to the learner's browser.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f7fafc",
          padding: 72,
          borderTop: "24px solid #002576",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 12,
              backgroundColor: "#002576",
            }}
          />
          <div style={{ fontSize: 40, fontWeight: 700, color: "#002576" }}>CodeDaddy</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 700, color: "#181c1e", lineHeight: 1.1 }}>
            Learn web development by building for real life
          </div>
          <div style={{ fontSize: 32, color: "#444653", lineHeight: 1.35 }}>
            Ten courses. 2,760 small steps. Sari-sari stores, jeepney terminals, and barangay
            services you build in the browser.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["HTML", "CSS", "JavaScript", "React", "TypeScript"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 999,
                backgroundColor: "#dce1ff",
                color: "#00164f",
                fontSize: 26,
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
