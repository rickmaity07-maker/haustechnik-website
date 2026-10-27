"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { hero, hotspots, site } from "@/content/site";
import { ArrowButton } from "./ArrowButton";
import { Logo } from "./Logo";

const W = 1200;
const H = 560;

// Window grid: three floors, four windows each side of the stairwell.
const floors = [110, 215, 320];
const cols = [228, 308, 388, 468, 682, 762, 842, 922];
const windows = floors.flatMap((y) => cols.map((x) => ({ x, y: y + 24 })));
const initialLights = windows.map((_, i) => i % 3 !== 1);

// Lights the visitor can switch, plus an idle "people moving around" shuffle:
// every few seconds one lit window goes dark and a dark one lights up.
// Paused while the hero is off screen, the tab is hidden, after a click, and under reduced motion.
function useLights(root: React.RefObject<HTMLElement | null>) {
  const [lit, setLit] = useState(initialLights);
  const lastTouch = useRef(0);

  const toggle = useCallback((i: number) => {
    lastTouch.current = Date.now();
    setLit((prev) => prev.map((on, j) => (j === i ? !on : on)));
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const id = window.setInterval(() => {
      if (!visible || document.hidden || Date.now() - lastTouch.current < 6000) return;
      setLit((prev) => {
        const on = prev.flatMap((v, i) => (v ? [i] : []));
        const off = prev.flatMap((v, i) => (v ? [] : [i]));
        if (!on.length || !off.length) return prev;
        const out = on[Math.floor(Math.random() * on.length)];
        const into = off[Math.floor(Math.random() * off.length)];
        return prev.map((v, i) => (i === out ? false : i === into ? true : v));
      });
    }, 2600);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [root]);

  return { lit, toggle };
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { lit, toggle } = useLights(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".hero-inner", { autoAlpha: 1 });
        // A quiet fade and rise; the Intro owns the letter-by-letter brand moment.
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from(".hero-rise", { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08 })
          .fromTo(
            ".draw",
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 2.4, stagger: 0.01, ease: "power2.inOut" },
            0.2,
          )
          .from(".win-layer", { opacity: 0, duration: 1.2, ease: "power2.out" }, "-=0.8")
          .from(".hotspot", { autoAlpha: 0, duration: 0.8, stagger: 0.1 }, "-=0.6");
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-inner", { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden bg-night pt-28 pb-16 text-white md:pt-32 md:pb-20"
    >
      {/* ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[10%] right-[-10%] h-[70vh] w-[60vw] rounded-full bg-workblue/45 blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-5%] h-[30vh] w-[30vw] rounded-full bg-signal/10 blur-[120px]" />
      </div>

      <div className="hero-inner invisible mx-auto grid w-full max-w-7xl items-center gap-14 px-4 md:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Logo size="lg" variant="onDark" className="hero-rise" />

          <h1 className="hero-rise mt-10 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] font-medium tracking-[-0.035em] text-balance md:mt-12">
            {hero.headline}
          </h1>

          <p className="hero-rise mt-5 max-w-md text-lg leading-relaxed text-white/70 md:text-xl">
            {hero.subline}
          </p>

          <div className="hero-rise mt-9 flex flex-col flex-wrap items-start gap-3 sm:flex-row sm:items-center">
            <ArrowButton href="#kontakt">Angebot anfragen</ArrowButton>
            <a
              href={site.emergencyPhoneHref}
              className="inline-flex shrink-0 items-center gap-3 rounded-full px-6 py-4 whitespace-nowrap text-base text-white/85 ring-1 ring-white/20 transition-colors duration-300 hover:bg-white/10"
            >
              <span aria-hidden className="size-2 rounded-full bg-signal" />
              24h Notdienst {site.emergencyPhone}
            </a>
          </div>

          <ul className="hero-rise mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-steel">
            {hero.trust.map((item, i) => (
              <li key={item} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden className="size-1 rounded-full bg-white/25" />}
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Building cross-section */}
        <div className="hero-building mx-auto w-full max-w-lg sm:max-w-xl lg:col-span-7 lg:max-w-none">
          <div className="relative">
            <Building lit={lit} onToggle={toggle} />
            <Hotspots />
          </div>
          <p className="hero-rise mt-3 text-center text-xs text-steel/80 lg:text-right">Tipp: Klicken Sie auf ein Fenster.</p>
        </div>
      </div>
    </section>
  );
}

// Dots only; each label shows on hover, keyboard focus or tap.
function Hotspots() {
  const [open, setOpen] = useState<string | null>(null);

  return hotspots.map((h) => {
    const isOpen = open === h.id;
    const below = h.y < 150;
    const align = h.x < 450 ? "left-0" : h.x > 750 ? "right-0" : "left-1/2 -translate-x-1/2";

    return (
      <button
        key={h.id}
        type="button"
        aria-label={h.title}
        aria-describedby={`hotspot-${h.id}`}
        onMouseEnter={() => setOpen(h.id)}
        onMouseLeave={() => setOpen(null)}
        onFocus={() => setOpen(h.id)}
        onBlur={() => setOpen(null)}
        onClick={() => setOpen(h.id)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(null)}
        style={{ left: `${(h.x / W) * 100}%`, top: `${(h.y / H) * 100}%` }}
        className={`hotspot absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${isOpen ? "z-10" : ""}`}
      >
        <span
          className={`size-3 rounded-full ring-4 transition-transform duration-500 ease-spring md:size-3.5 ${isOpen ? "scale-125 bg-white ring-signal" : "bg-signal ring-night/60"}`}
        />
        <span
          id={`hotspot-${h.id}`}
          role="tooltip"
          className={`pointer-events-none absolute w-56 rounded-2xl bg-night/90 p-4 text-left shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] ring-1 ring-white/10 backdrop-blur-md transition-[opacity,translate] duration-300 ease-spring ${align} ${below ? "top-full mt-1" : "bottom-full mb-1"} ${isOpen ? "translate-y-0 opacity-100" : `${below ? "-translate-y-1" : "translate-y-1"} opacity-0`}`}
        >
          <span className="block text-sm text-signal">{h.title}</span>
          <span className="mt-1 block text-sm leading-relaxed text-white/80">{h.text}</span>
        </span>
      </button>
    );
  });
}

function Building({ lit, onToggle }: { lit: boolean[]; onToggle: (i: number) => void }) {
  const line = { stroke: "rgba(255,255,255,0.55)", strokeWidth: 1.4, fill: "none", pathLength: 1, strokeDasharray: 1 };
  const thin = { ...line, stroke: "rgba(255,255,255,0.25)", strokeWidth: 1 };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Schnitt durch ein Mehrfamilienhaus">
      {/* basement fill */}
      <rect x="180" y="430" width="840" height="110" fill="rgba(255,255,255,0.03)" />
      {/* ground */}
      <path className="draw" d="M0 430H1200" {...line} />
      {/* roof */}
      <path className="draw" d="M160 112 600 34l440 78" {...line} />
      <path className="draw" d="M150 112h900" {...line} strokeWidth={2.2} />
      {/* body */}
      <path className="draw" d="M180 112v318M1020 112v318" {...line} />
      {floors.slice(1).map((y) => (
        <path key={y} className="draw" d={`M180 ${y}H1020`} {...thin} />
      ))}
      {/* stairwell */}
      <path className="draw" d="M550 112v318M650 112v318" {...thin} />
      <path
        className="draw"
        d="M560 420l80-30-80-30 80-30-80-30 80-30-80-30 80-30-80-30 80-30"
        {...thin}
      />
      {/* basement */}
      <path className="draw" d="M180 430v110h840V430" {...line} />
      {/* boiler + pipes */}
      <rect className="draw" x="800" y="452" width="90" height="74" rx="6" {...line} />
      <path className="draw" d="M820 452v-22M870 452v-22M890 480h70v-50" {...thin} />
      <circle className="draw" cx="845" cy="489" r="12" {...thin} />
      {/* door */}
      <path className="draw" d="M575 430v-56h50v56" {...line} />
      {/* tree */}
      <path className="draw" d="M1085 430v-70" {...line} />
      <circle className="draw" cx="1085" cy="330" r="42" {...line} />
      {/* bins */}
      <rect className="draw" x="1120" y="400" width="26" height="30" rx="3" {...thin} />
      <rect className="draw" x="1150" y="400" width="26" height="30" rx="3" {...thin} />

      {/* Windows: click or tap to switch the light. Decorative, so pointer-only (no tab stops). */}
      <g className="win-layer">
        {windows.map((w, i) => (
          <g key={i} className="group cursor-pointer" onClick={() => onToggle(i)} aria-hidden>
            <rect x={w.x} y={w.y} width="50" height="58" rx="3" fill="rgba(255,255,255,0.03)" />
            <rect
              x={w.x + 3}
              y={w.y + 3}
              width="44"
              height="52"
              rx="2"
              fill="var(--signal)"
              style={{
                opacity: lit[i] ? 0.9 : 0,
                filter: "drop-shadow(0 0 14px rgba(255,200,61,0.55))",
                transition: "opacity 600ms cubic-bezier(.16,1,.3,1)",
              }}
            />
            <rect
              className="draw transition-[stroke] duration-300 group-hover:stroke-white"
              x={w.x}
              y={w.y}
              width="50"
              height="58"
              rx="3"
              {...thin}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
