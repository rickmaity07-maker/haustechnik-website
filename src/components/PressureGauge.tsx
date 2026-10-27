"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Interactive heating-pressure gauge (0 to 4 bar). Drag the needle, use the arrow keys,
// or press "Einstellen lassen" to bring it back into the green zone.
const MIN = 0;
const MAX = 4;
const SWEEP = 120; // degrees each side of 12 o'clock
const IDEAL = 1.5;
const CX = 100;
const CY = 92;
const R = 74;

const toAngle = (v: number) => -SWEEP + ((v - MIN) / (MAX - MIN)) * SWEEP * 2;
const polar = (deg: number, r = R) => {
  const rad = (deg * Math.PI) / 180;
  // Rounded so server and browser render identical numbers (avoids a hydration mismatch).
  const round = (n: number) => Math.round(n * 100) / 100;
  return [round(CX + r * Math.sin(rad)), round(CY - r * Math.cos(rad))] as const;
};
const arc = (from: number, to: number, r = R) => {
  const [x1, y1] = polar(toAngle(from), r);
  const [x2, y2] = polar(toAngle(to), r);
  const large = toAngle(to) - toAngle(from) > 180 ? 1 : 0;
  return `M${x1} ${y1}A${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
};

function status(v: number) {
  if (v < 1) return { text: "Zu niedrig: Wasser nachfüllen.", tone: "text-[#e8a07e]" };
  if (v <= 2) return { text: "Im grünen Bereich.", tone: "text-[#9fd3ae]" };
  if (v <= 2.5) return { text: "Leicht erhöht: beobachten.", tone: "text-signal" };
  return { text: "Zu hoch: Wir kommen vorbei.", tone: "text-[#e8a07e]" };
}

export function PressureGauge() {
  const [value, setValue] = useState(2.7);
  const svg = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const tween = useRef<number | null>(null);

  const stop = () => {
    if (tween.current) cancelAnimationFrame(tween.current);
    tween.current = null;
  };

  const clamp = (v: number) => Math.round(Math.min(MAX, Math.max(MIN, v)) * 10) / 10;
  const set = useCallback((v: number) => setValue(clamp(v)), []);
  const nudge = useCallback((d: number) => setValue((v) => clamp(v + d)), []);

  const fromPointer = (e: React.PointerEvent) => {
    const box = svg.current?.getBoundingClientRect();
    if (!box) return;
    const x = ((e.clientX - box.left) / box.width) * 200 - CX;
    const y = ((e.clientY - box.top) / box.height) * 150 - CY;
    const deg = Math.max(-SWEEP, Math.min(SWEEP, (Math.atan2(x, -y) * 180) / Math.PI));
    set(MIN + ((deg + SWEEP) / (SWEEP * 2)) * (MAX - MIN));
  };

  // Smoothly bring the needle back to the ideal pressure.
  const adjust = () => {
    stop();
    const start = value;
    const t0 = performance.now();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = (t: number) => {
      const p = reduce ? 1 : Math.min(1, (t - t0) / 1200);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(Math.round((start + (IDEAL - start) * eased) * 100) / 100);
      if (p < 1) tween.current = requestAnimationFrame(step);
    };
    tween.current = requestAnimationFrame(step);
  };

  useEffect(() => stop, []);

  const s = status(value);
  const [nx, ny] = polar(toAngle(value), R - 14);

  return (
    <div className="flex flex-col items-center rounded-[calc(1.75rem-0.375rem-0.75rem)] bg-white/5 px-4 pt-4 pb-5">
      <svg
        ref={svg}
        viewBox="0 0 200 150"
        className="w-full max-w-[18rem] cursor-grab touch-none select-none active:cursor-grabbing"
        role="slider"
        tabIndex={0}
        aria-label="Heizungsdruck"
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={Math.round(value * 10) / 10}
        aria-valuetext={`${value.toFixed(1).replace(".", ",")} bar. ${s.text}`}
        onPointerDown={(e) => {
          stop();
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          fromPointer(e);
        }}
        onPointerMove={(e) => dragging.current && fromPointer(e)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        onKeyDown={(e) => {
          const delta = { ArrowUp: 0.1, ArrowRight: 0.1, ArrowDown: -0.1, ArrowLeft: -0.1, PageUp: 0.5, PageDown: -0.5 }[e.key];
          if (delta !== undefined) {
            e.preventDefault();
            stop();
            nudge(delta);
          } else if (e.key === "Home" || e.key === "End") {
            e.preventDefault();
            set(e.key === "Home" ? MIN : MAX);
          }
        }}
      >
        {/* dial */}
        <circle cx={CX} cy={CY} r={R + 12} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
        <path d={arc(0, 1)} stroke="#e8a07e" strokeOpacity=".7" strokeWidth="7" fill="none" />
        <path d={arc(1, 2)} stroke="#9fd3ae" strokeOpacity=".85" strokeWidth="7" fill="none" />
        <path d={arc(2, 2.5)} stroke="var(--signal)" strokeOpacity=".8" strokeWidth="7" fill="none" />
        <path d={arc(2.5, 4)} stroke="#e8a07e" strokeOpacity=".7" strokeWidth="7" fill="none" />
        {Array.from({ length: 41 }, (_, i) => {
          const v = i / 10;
          const major = i % 10 === 0;
          const [x1, y1] = polar(toAngle(v), R - 8);
          const [x2, y2] = polar(toAngle(v), R - (major ? 17 : 12));
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.5)" strokeWidth={major ? 1.6 : 0.7} />
          );
        })}
        {[0, 1, 2, 3, 4].map((v) => {
          const [x, y] = polar(toAngle(v), R - 27);
          return (
            <text key={v} x={x} y={y + 3} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.55)">
              {v}
            </text>
          );
        })}
        <text x={CX} y={CY + 30} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.45)">
          bar
        </text>
        {/* needle */}
        <line x1={CX} y1={CY} x2={nx} y2={ny} stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={CX} cy={CY} r="6" fill="var(--signal)" />
        <circle cx={CX} cy={CY} r="2" fill="var(--night)" />
      </svg>

      <p className="mt-1 text-3xl font-medium tracking-[-0.03em] text-white tabular-nums">
        {value.toFixed(1).replace(".", ",")} <span className="text-base text-white/55">bar</span>
      </p>
      <p className={`mt-1 min-h-[1.5rem] text-center text-sm ${s.tone}`} aria-live="polite">
        {s.text}
      </p>
      <button
        type="button"
        onClick={adjust}
        className="mt-3 rounded-full bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/15 transition-[background-color,transform] duration-300 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal active:scale-[0.98]"
      >
        Einstellen lassen
      </button>
      <p className="mt-3 text-xs text-white/45">Nadel ziehen oder Pfeiltasten nutzen</p>
    </div>
  );
}
