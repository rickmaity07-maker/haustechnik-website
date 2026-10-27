"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const seasons = [
  {
    name: "Frühling",
    months: "März bis Mai",
    tint: "#9fb3a6",
    tasks: ["Grünschnitt", "Dachrinnen", "Außenanlagen-Check"],
    text: "Nach dem Winter sehen wir nach, was Frost und Sturm hinterlassen haben, und bringen Beete, Wege und Rinnen in Ordnung.",
    Art: Sprout,
  },
  {
    name: "Sommer",
    months: "Juni bis August",
    tint: "#ffc83d",
    tasks: ["Rasen", "Bewässerung", "Spielplatzkontrolle"],
    text: "Regelmäßiger Rasenschnitt, Bewässerung in Hitzeperioden und die dokumentierte Sichtkontrolle der Spielgeräte.",
    Art: Sun,
  },
  {
    name: "Herbst",
    months: "September bis November",
    tint: "#c8875a",
    tasks: ["Laub", "Heizung startklar", "Rückstauklappen"],
    text: "Wege bleiben frei von Laub, die Heizung läuft vor der ersten kalten Nacht, Rückstauklappen sind geprüft.",
    Art: Leaf,
  },
  {
    name: "Winter",
    months: "Dezember bis Februar",
    tint: "#a9cbe0",
    tasks: ["Räum- und Streudienst ab 6 Uhr", "Frostschutz", "Heizungsüberwachung"],
    text: "Gehwege sind geräumt, bevor die ersten Bewohner das Haus verlassen. Leitungen und Heizung behalten wir im Blick.",
    Art: Snowflake,
  },
] as const;

// Each card stops this far below the viewport top, plus 2rem per card, so the stack stays readable.
const TOP_REM = 6;
const STEP_REM = 2;

export function Seasons() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Stacking cards. Main uses overflow-x: hidden, which disables CSS position: sticky
      // for descendants, so the sticky behaviour is done with ScrollTrigger pins instead.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".season-card");
        const rem = () => parseFloat(getComputedStyle(document.documentElement).fontSize);
        const top = (i: number) => (TOP_REM + i * STEP_REM) * rem();
        const last = cards[cards.length - 1];

        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;

          ScrollTrigger.create({
            trigger: card,
            start: () => `top ${top(i)}px`,
            endTrigger: last,
            end: () => `top ${top(cards.length - 1)}px`,
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });

          const next = cards[i + 1];
          const scrub = {
            trigger: next,
            start: "top bottom",
            end: () => `top ${top(i + 1)}px`,
            scrub: true,
            invalidateOnRefresh: true,
          };
          gsap.to(card.querySelector(".season-inner"), { scale: 0.94, ease: "power2.in", scrollTrigger: scrub });
          gsap.to(card.querySelector(".season-dim"), { opacity: 0.55, ease: "power2.in", scrollTrigger: { ...scrub } });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".season-inner", { scale: 1 });
        gsap.set(".season-dim", { opacity: 0 });
      });
    },
    { scope: root },
  );

  return (
    <section id="jahreskreis" ref={root} className="relative isolate bg-night pt-8 pb-20 text-white md:pt-12 md:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] h-[50vh] w-[50vw] rounded-full bg-workblue/40 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-signal">Jahreskreis</p>
          <h2 className="mt-4 text-4xl leading-[1.05] font-medium tracking-[-0.03em] md:text-6xl">
            Das ganze Jahr im Blick
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/65">
            Jede Jahreszeit bringt eigene Aufgaben. Wir planen sie im Voraus, damit nichts liegen bleibt.
          </p>
        </div>

        <div className="mt-10 space-y-6 md:mt-14">
          {seasons.map((s, i) => (
            <article key={s.name} className="season-card relative" style={{ zIndex: i + 1 }}>
              <div
                className="season-inner relative origin-top rounded-[1.75rem] p-1.5 ring-1 ring-white/10"
                style={{ backgroundColor: `color-mix(in srgb, ${s.tint} 10%, var(--night))` }}
              >
                <div
                  className="relative grid gap-8 overflow-hidden rounded-[calc(1.75rem-0.375rem)] p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] md:grid-cols-[1.2fr_1fr] md:p-10"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${s.tint} 14%, #13213a)`,
                    backgroundImage: `radial-gradient(120% 90% at 100% 0%, color-mix(in srgb, ${s.tint} 22%, transparent), transparent 60%)`,
                  }}
                >
                  <div className="flex flex-col">
                    <p className="text-sm text-white/55">{s.months}</p>
                    <h3 className="mt-2 text-4xl font-medium tracking-[-0.03em] md:text-5xl" style={{ color: s.tint }}>
                      {s.name}
                    </h3>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 md:text-lg">{s.text}</p>
                    <ul className="mt-8 flex flex-wrap gap-2 md:mt-auto md:pt-10">
                      {s.tasks.map((t) => (
                        <li key={t} className="rounded-full bg-white/[0.06] px-4 py-2 text-sm text-white/85 ring-1 ring-white/10">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-center md:justify-end" style={{ color: s.tint }}>
                    <s.Art />
                  </div>
                </div>
                <div aria-hidden className="season-dim pointer-events-none absolute inset-0 rounded-[1.75rem] bg-night opacity-0" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const art = "h-auto w-40 md:w-64";
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Sprout() {
  return (
    <svg viewBox="0 0 200 200" className={art} aria-hidden>
      <circle cx="100" cy="100" r="88" {...stroke} strokeOpacity={0.2} />
      <path d="M40 160h120" {...stroke} strokeOpacity={0.5} />
      <path d="M100 160v-62" {...stroke} />
      <path d="M100 110c-4-26-24-38-48-36 2 24 20 38 48 36z" {...stroke} fill="currentColor" fillOpacity={0.15} />
      <path d="M100 98c4-30 26-44 54-42-2 28-24 44-54 42z" {...stroke} fill="currentColor" fillOpacity={0.25} />
      <path d="M70 160c4-6 10-6 14 0M118 160c4-6 10-6 14 0" {...stroke} strokeOpacity={0.5} />
    </svg>
  );
}

function Sun() {
  const rays = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
  return (
    <svg viewBox="0 0 200 200" className={art} aria-hidden>
      <circle cx="100" cy="100" r="88" {...stroke} strokeOpacity={0.2} />
      <circle cx="100" cy="100" r="34" {...stroke} fill="currentColor" fillOpacity={0.25} />
      {rays.map((deg) => (
        <path key={deg} d="M100 50V36" {...stroke} transform={`rotate(${deg} 100 100)`} />
      ))}
    </svg>
  );
}

function Leaf() {
  return (
    <svg viewBox="0 0 200 200" className={art} aria-hidden>
      <circle cx="100" cy="100" r="88" {...stroke} strokeOpacity={0.2} />
      <path d="M58 148c-6-62 34-100 92-102 4 64-34 104-92 102z" {...stroke} fill="currentColor" fillOpacity={0.22} />
      <path d="M50 158 140 60" {...stroke} />
      <path d="M86 118l-4-26M104 98l-2-24M86 118l26 2M104 98l24 2" {...stroke} strokeOpacity={0.6} />
    </svg>
  );
}

function Snowflake() {
  const arms = [0, 60, 120];
  return (
    <svg viewBox="0 0 200 200" className={art} aria-hidden>
      <circle cx="100" cy="100" r="88" {...stroke} strokeOpacity={0.2} />
      {arms.map((deg) => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          <path d="M100 36v128" {...stroke} />
          <path d="M88 48l12 12 12-12M88 152l12-12 12 12M90 70l10 10 10-10M90 130l10-10 10 10" {...stroke} strokeOpacity={0.7} />
        </g>
      ))}
      <circle cx="100" cy="100" r="8" {...stroke} fill="currentColor" fillOpacity={0.3} />
    </svg>
  );
}
