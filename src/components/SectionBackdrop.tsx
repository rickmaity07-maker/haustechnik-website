// Decorative section backgrounds in the site's blueprint language. Drop one in as the first
// child of a section that has `relative isolate`. Everything is inline SVG and CSS (no image
// files), sits behind the content (-z-10), ignores the pointer and is hidden from screen readers.
// Coordinates are rounded to 1 decimal so server and browser render identical markup.

type Variant = "dots" | "house" | "route" | "sheet" | "contours" | "blueprint" | "glow";

const ink = "#23407a";
const r1 = (n: number) => Math.round(n * 10) / 10;

// Soft wavy rings for the contour (map) variant.
function contourPath(cx: number, cy: number, rx: number, ry: number, seed: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    const wobble = 1 + 0.08 * Math.sin(a * 3 + seed) + 0.05 * Math.sin(a * 5 + seed * 2);
    pts.push(`${r1(cx + Math.cos(a) * rx * wobble)} ${r1(cy + Math.sin(a) * ry * wobble)}`);
  }
  return `M${pts.join("L")}Z`;
}

const fadeEdges = "[mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]";

export function SectionBackdrop({ variant, className = "" }: { variant: Variant; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {variant === "dots" && (
        <>
          <div
            className={`absolute inset-0 ${fadeEdges}`}
            style={{ backgroundImage: `radial-gradient(${ink}33 1.2px, transparent 1.2px)`, backgroundSize: "22px 22px" }}
          />
          <div className="absolute top-1/2 right-[-8%] h-[140%] w-[35%] -translate-y-1/2 rounded-full bg-signal/10 blur-[100px]" />
        </>
      )}

      {variant === "house" && (
        <>
          <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
            <g stroke={ink} fill="none" strokeLinejoin="round">
              <path d="M240 560V250L600 40l360 210v310" strokeOpacity=".09" strokeWidth="2" />
              <path d="M200 270 600 20l400 250" strokeOpacity=".07" strokeWidth="1.5" />
              <path d="M540 560V420h120v140" strokeOpacity=".08" strokeWidth="1.5" />
              <path d="M120 560h960" strokeOpacity=".1" strokeWidth="1.5" />
              <circle cx="600" cy="200" r="36" strokeOpacity=".07" strokeWidth="1.5" />
            </g>
          </svg>
          <div className="absolute top-[15%] left-1/2 h-[60%] w-[50%] -translate-x-1/2 rounded-full bg-signal/[0.08] blur-[110px]" />
        </>
      )}

      {variant === "route" && (
        <>
          <div
            className={`absolute inset-0 ${fadeEdges}`}
            style={{
              backgroundImage: `linear-gradient(${ink}0d 1px, transparent 1px), linear-gradient(90deg, ${ink}0d 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />
          <svg viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
            <path
              d="M-20 120C200 120 260 300 460 300S760 140 900 260 980 560 1220 600"
              stroke={ink}
              strokeOpacity=".18"
              strokeWidth="2.5"
              strokeDasharray="2 12"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M-20 700C240 640 420 820 700 760s380-60 540 20" stroke={ink} strokeOpacity=".08" strokeWidth="2" fill="none" />
            {[
              [460, 300],
              [900, 260],
              [1060, 520],
            ].map(([x, y]) => (
              <g key={x} transform={`translate(${x} ${y})`}>
                <circle r="14" fill="var(--signal)" fillOpacity=".25" />
                <circle r="5" fill="var(--signal)" fillOpacity=".8" />
              </g>
            ))}
          </svg>
          <div className="absolute right-[-10%] bottom-[-10%] h-[50%] w-[40%] rounded-full bg-workblue/10 blur-[120px]" />
        </>
      )}

      {variant === "sheet" && (
        <>
          <div
            className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
            style={{ backgroundImage: `linear-gradient(${ink}12 1px, transparent 1px)`, backgroundSize: "100% 34px" }}
          />
          <div className="absolute inset-y-0 left-[6%] w-px bg-[#e8a07e]/30 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <svg viewBox="0 0 1200 800" preserveAspectRatio="xMaxYMin slice" className="absolute inset-0 h-full w-full">
            <g stroke={ink} strokeOpacity=".14" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {[140, 210, 280, 350].map((y) => (
                <g key={y}>
                  <path d={`M960 ${y}l12 12 22-26`} />
                  <path d={`M1020 ${y + 2}h140`} strokeOpacity=".08" />
                </g>
              ))}
            </g>
          </svg>
          <div className="absolute top-[-15%] left-[20%] h-[60%] w-[50%] rounded-full bg-signal/10 blur-[120px]" />
        </>
      )}

      {variant === "contours" && (
        <>
          <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className={`absolute inset-0 h-full w-full ${fadeEdges}`}>
            <g stroke={ink} fill="none" strokeWidth="1.2">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <path key={`a${i}`} d={contourPath(260, 560, 60 * i, 40 * i, i)} strokeOpacity={0.09 + i * 0.016} />
              ))}
              {[1, 2, 3, 4, 5].map((i) => (
                <path key={`b${i}`} d={contourPath(1000, 180, 55 * i, 38 * i, i + 3)} strokeOpacity={0.09 + i * 0.016} />
              ))}
            </g>
          </svg>
          <div className="absolute top-[20%] left-[-10%] h-[60%] w-[40%] rounded-full bg-workblue/10 blur-[120px]" />
        </>
      )}

      {variant === "blueprint" && (
        <>
          <div
            className={`absolute inset-0 ${fadeEdges}`}
            style={{
              backgroundImage: `linear-gradient(${ink}0f 1px, transparent 1px), linear-gradient(90deg, ${ink}0f 1px, transparent 1px), linear-gradient(${ink}08 1px, transparent 1px), linear-gradient(90deg, ${ink}08 1px, transparent 1px)`,
              backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
            }}
          />
          <svg viewBox="0 0 1200 800" preserveAspectRatio="xMaxYMin slice" className="absolute inset-0 h-full w-full">
            <g stroke={ink} strokeOpacity=".16" strokeWidth="1.5" fill="none">
              {/* staircase section, top right */}
              <path d="M880 420h60v-40h60v-40h60v-40h60v-40h60" />
              <path d="M880 440l300-180" strokeOpacity=".08" />
              <path d="M860 420v120h360" strokeOpacity=".1" />
              <path d="M1180 120a60 60 0 0 0-60 60" strokeOpacity=".1" />
            </g>
          </svg>
          <div className="absolute bottom-[-20%] left-[10%] h-[60%] w-[45%] rounded-full bg-signal/[0.08] blur-[120px]" />
        </>
      )}

      {variant === "glow" && (
        <>
          <div className="absolute top-[-20%] left-[-10%] h-[80%] w-[55%] rounded-full bg-workblue/15 blur-[130px]" />
          <div className="absolute right-[-10%] bottom-[-20%] h-[70%] w-[45%] rounded-full bg-signal/15 blur-[130px]" />
          <div
            className={`absolute inset-0 ${fadeEdges}`}
            style={{ backgroundImage: `radial-gradient(${ink}26 1px, transparent 1px)`, backgroundSize: "28px 28px" }}
          />
        </>
      )}
    </div>
  );
}
