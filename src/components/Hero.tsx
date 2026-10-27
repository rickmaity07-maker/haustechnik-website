"use client";

import { useRef, useState } from "react";
import { WrenchIcon } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { hotspots, site } from "@/content/site";
import { ArrowButton } from "./ArrowButton";

const W = 1200;
const H = 560;

// Window grid: three floors, four windows each side of the stairwell.
const floors = [110, 215, 320];
const cols = [228, 308, 388, 468, 682, 762, 842, 922];
const windows = floors.flatMap((y) => cols.map((x) => ({ x, y: y + 24 })));

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>("heizung");
  const current = hotspots.find((h) => h.id === active) ?? hotspots[0];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".hero-inner", { autoAlpha: 1 });
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".hero-line > span", { yPercent: 110, duration: 1.2, stagger: 0.12 })
          .from(".hero-pill", { scale: 0, rotate: -30, duration: 0.9, ease: "back.out(2)" }, "-=0.7")
          .from(".hero-fade", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.1 }, "-=0.6")
          .fromTo(
            ".draw",
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.8, stagger: 0.04, ease: "power2.inOut" },
            "-=0.9",
          )
          .to(".win-lit", { opacity: 1, duration: 0.25, stagger: { each: 0.05, from: "random" } }, "-=0.6")
          .from(".hotspot", { scale: 0, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: "back.out(3)" }, "-=0.3");

        // Windows switch on and off at random, like a lived-in house at dusk.
        const flicker = gsap.delayedCall(3.5, function loop() {
          const all = gsap.utils.toArray<SVGRectElement>(".win");
          const pick = all[Math.floor(Math.random() * all.length)];
          const lit = Number(gsap.getProperty(pick, "opacity")) > 0.5;
          gsap.to(pick, { opacity: lit ? 0 : 1, duration: 0.4 });
          flicker.restart(true);
        });
        gsap.delayedCall(0, () => flicker.restart(true));

        gsap.to(".hero-building", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-copy", {
          autoAlpha: 0,
          y: -60,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "45% top", scrub: true },
        });

        return () => flicker.kill();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-inner", { autoAlpha: 1 });
        gsap.set(".draw", { strokeDashoffset: 0 });
        gsap.set(".win-lit", { opacity: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative isolate overflow-hidden bg-night pt-36 text-white md:pt-44"
    >
      {/* ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-1/2 h-[70vh] w-[80vw] -translate-x-1/2 rounded-full bg-workblue/50 blur-[120px]" />
        <div className="absolute right-[5%] bottom-[10%] h-[30vh] w-[30vw] rounded-full bg-signal/15 blur-[120px]" />
      </div>

      <div className="hero-inner invisible">
        <div className="hero-copy mx-auto flex max-w-6xl flex-col items-center px-4 text-center">
          <h1 className="text-[clamp(2.6rem,6vw,5.75rem)] leading-[1.02] font-medium tracking-[-0.035em]">
            <span className="hero-line block overflow-hidden pb-[0.08em]">
              <span className="block">Wir kümmern uns um Ihr Haus.</span>
            </span>
            <span className="hero-line block overflow-hidden pb-[0.08em]">
              <span className="block text-white/55">
                Vom Heizungskeller
                <span className="hero-pill mx-3 inline-flex h-[0.8em] w-[1.7em] translate-y-[-0.06em] items-center justify-center rounded-full bg-signal align-middle text-night">
                  <WrenchIcon weight="light" className="size-[0.5em]" aria-hidden />
                </span>
                bis zur Dachrinne.
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
            Hausmeisterservice und Haustechnik für Mehrfamilienhäuser, Wohnanlagen und Gewerbeobjekte in{" "}
            {site.region}. Ein fester Ansprechpartner, feste Termine, saubere Dokumentation.
          </p>

          <div className="hero-fade mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <ArrowButton href="#kontakt">Angebot anfragen</ArrowButton>
            <a
              href={site.emergencyPhoneHref}
              className="inline-flex items-center gap-3 rounded-full px-6 py-4 text-base text-white/85 ring-1 ring-white/20 transition-colors duration-300 hover:bg-white/10"
            >
              <span className="relative flex size-2.5">
                <span className="absolute inset-0 animate-[ping-soft_2s_ease-out_infinite] rounded-full bg-signal" />
                <span className="relative size-2.5 rounded-full bg-signal" />
              </span>
              24h Notdienst {site.emergencyPhone}
            </a>
          </div>
        </div>

        {/* Building cross-section */}
        <div className="hero-building relative mx-auto mt-16 w-full max-w-6xl px-4 md:mt-20">
          <div className="relative">
            <Building />

            {hotspots.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => setActive(h.id)}
                onMouseEnter={() => setActive(h.id)}
                aria-pressed={active === h.id}
                aria-label={h.title}
                style={{ left: `${(h.x / W) * 100}%`, top: `${(h.y / H) * 100}%` }}
                className="hotspot absolute flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:size-11"
              >
                <span
                  className={`absolute inset-1 rounded-full bg-signal ${active === h.id ? "" : "animate-[ping-soft_2.4s_ease-out_infinite]"}`}
                />
                <span
                  className={`relative size-3.5 rounded-full ring-4 transition-all duration-500 ease-spring md:size-4 ${active === h.id ? "scale-125 bg-white ring-signal" : "bg-signal ring-night/60"}`}
                />
              </button>
            ))}
          </div>

          <div className="relative z-10 mx-auto -mt-4 max-w-md px-2 pb-14 md:absolute md:top-6 md:left-8 md:mt-0 md:max-w-xs md:p-0">
            <div className="rounded-[1.75rem] bg-white/5 p-1.5 ring-1 ring-white/10 backdrop-blur-md">
              <div
                key={current.id}
                className="animate-[fadein_0.5s_cubic-bezier(0.32,0.72,0,1)] rounded-[calc(1.75rem-0.375rem)] bg-night/80 p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                aria-live="polite"
              >
                <p className="text-sm text-signal">{current.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-white/80">{current.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Building() {
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

      {windows.map((w, i) => (
        <g key={i}>
          <rect className="draw" x={w.x} y={w.y} width="50" height="58" rx="3" {...thin} />
          <rect
            className={`win ${i % 3 !== 1 ? "win-lit" : ""}`}
            x={w.x + 3}
            y={w.y + 3}
            width="44"
            height="52"
            rx="2"
            fill="var(--signal)"
            opacity="0"
            style={{ filter: "drop-shadow(0 0 14px rgba(255,200,61,0.55))" }}
          />
        </g>
      ))}
    </svg>
  );
}
