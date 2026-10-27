import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: ${site.tagline} in ${site.region}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview built from site.ts, so a rebrand updates it automatically.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0f1b2d",
          backgroundImage: "radial-gradient(60% 80% at 0% 100%, rgba(35,64,122,0.7), transparent 70%)",
          color: "#f6f7f4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 32 32">
            <path d="M6 15.5 16 7l10 8.5V26H6z" fill="none" stroke="#f6f7f4" strokeWidth="2" strokeLinejoin="round" />
            <path
              d="M19.2 13.4a3.2 3.2 0 0 0-4 4l-4 4a1.3 1.3 0 0 0 1.9 1.9l4-4a3.2 3.2 0 0 0 4-4l-1.9 1.9-1.6-.3-.3-1.6z"
              fill="#ffc83d"
            />
          </svg>
          <span style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1 }}>{site.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 960 }}>{site.tagline}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 32 }}>
            <span style={{ width: 14, height: 14, borderRadius: 7, background: "#ffc83d" }} />
            <span style={{ fontSize: 32, color: "#8e9bae" }}>{site.region}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
