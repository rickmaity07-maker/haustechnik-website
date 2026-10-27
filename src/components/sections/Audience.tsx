"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Client = {
  id: string;
  title: string;
  text: string;
  Art: () => React.JSX.Element;
};

const clients: Client[] = [
  {
    id: "verwaltung",
    title: "Hausverwaltungen",
    text: "Sie bekommen einen festen Ansprechpartner für alle Objekte im Bestand. Mängel melden wir mit Foto und Standort, Aufträge bestätigen wir schriftlich. Am Monatsende liegt ein sauberes Protokoll pro Liegenschaft vor.",
    Art: VerwaltungArt,
  },
  {
    id: "weg",
    title: "Eigentümergemeinschaften (WEG)",
    text: "Transparente Leistungsverzeichnisse, die in jede Eigentümerversammlung passen. Wir dokumentieren Wartungen und Verkehrssicherung so, dass Beirat und Verwaltung jederzeit nachvollziehen können, was erledigt wurde.",
    Art: WegArt,
  },
  {
    id: "vermieter",
    title: "Private Vermieter",
    text: "Sie müssen nicht selbst vorbeifahren. Wir übernehmen Treppenhaus, Mülltonnen und kleine Reparaturen und begleiten den Mieterwechsel mit Übergabeprotokoll und Zählerständen.",
    Art: VermieterArt,
  },
  {
    id: "gewerbe",
    title: "Gewerbeobjekte",
    text: "Feste Einsatzzeiten außerhalb Ihrer Öffnungszeiten, damit der Betrieb ungestört läuft. Haustechnik, Außenanlagen und Winterdienst sind in einem Vertrag gebündelt, mit klaren Reaktionszeiten.",
    Art: GewerbeArt,
  },
];

export function Audience() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".aud-reveal", {
          y: 60,
          autoAlpha: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    // Seasons follows directly on the same night background, so the bottom padding is halved
    // and Seasons drops most of its top padding: the two read as one continuous dark band.
    <section id="fuer-wen" ref={root} className="relative overflow-hidden bg-night pt-32 pb-12 text-white md:pt-48 md:pb-16">
      <div aria-hidden className="pointer-events-none absolute top-1/3 left-[-10%] h-[40vh] w-[50vw] rounded-full bg-workblue/40 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="aud-reveal max-w-2xl">
          <h2 className="text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.05] font-medium tracking-[-0.03em]">
            Für wen wir arbeiten
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/65">
            Jedes Objekt hat andere Verantwortliche. Wir richten Abläufe und Berichte danach aus, wer am Ende
            Rechenschaft ablegen muss.
          </p>
        </div>

        {/* Desktop: horizontal accordion */}
        <div className="mt-16 hidden h-[30rem] gap-3 md:mt-20 md:flex">
          {clients.map((c, i) => {
            const open = active === i;
            return (
              <button
                key={c.id}
                type="button"
                aria-expanded={open}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`aud-reveal group relative min-w-[5.5rem] basis-0 overflow-hidden rounded-[1.75rem] p-1.5 text-left ring-1 transition-[flex-grow,background-color,scale] duration-700 ease-spring active:scale-[0.98] ${
                  open ? "grow-[5] bg-white/8 ring-white/15" : "grow bg-white/4 ring-white/10 hover:bg-white/6"
                }`}
              >
                <span className="relative block h-full overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-night/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                  {/* collapsed: vertical title */}
                  <span
                    aria-hidden
                    className={`absolute inset-y-8 left-1/2 flex -translate-x-1/2 rotate-180 items-center gap-4 text-xl font-medium whitespace-nowrap text-white/80 transition-opacity duration-500 [writing-mode:vertical-rl] ${
                      open ? "opacity-0" : "opacity-100 delay-200"
                    }`}
                  >
                    {c.title}
                    <span className="size-2 rounded-full bg-signal" />
                  </span>

                  {/* expanded: fixed width so text never reflows while the slice grows */}
                  <span
                    className={`absolute inset-0 flex w-[34rem] max-w-none flex-col justify-between p-8 transition-[opacity,translate] duration-700 ease-spring lg:w-[40rem] ${
                      open ? "translate-y-0 opacity-100 delay-150" : "pointer-events-none translate-y-4 opacity-0"
                    }`}
                  >
                    <span className="block w-40 text-signal lg:w-48">
                      <c.Art />
                    </span>
                    <span className="block max-w-md">
                      <span className="block text-3xl font-medium tracking-[-0.02em]">{c.title}</span>
                      <span className="mt-4 block text-base leading-relaxed text-white/70">{c.text}</span>
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile: stacked list, everything open */}
        <ul className="mt-16 flex flex-col gap-3 md:hidden">
          {clients.map((c) => (
            <li key={c.id} className="aud-reveal rounded-[1.75rem] bg-white/5 p-1.5 ring-1 ring-white/10">
              <div className="rounded-[calc(1.75rem-0.375rem)] bg-night/60 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                <div className="w-28 text-signal">
                  <c.Art />
                </div>
                <h3 className="mt-6 text-2xl font-medium tracking-[-0.02em]">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const soft = { ...stroke, stroke: "rgba(255,255,255,0.45)" };

// Two buildings and a clipboard: many properties, one report.
function VerwaltungArt() {
  return (
    <svg viewBox="0 0 160 100" className="block h-auto w-full" aria-hidden>
      <path d="M8 92h144" {...soft} />
      <path d="M20 92V30h34v62M54 92V46h30v46" {...soft} />
      {[38, 52, 66].map((y) => (
        <path key={y} d={`M28 ${y}h6M40 ${y}h6`} {...soft} />
      ))}
      <path d="M62 58h6M72 58h6M62 72h6M72 72h6" {...soft} />
      <rect x="102" y="24" width="44" height="58" rx="5" {...stroke} />
      <path d="M114 24v-6h20v6M112 42l4 4 8-8M112 58l4 4 8-8M130 44h8M130 60h8" {...stroke} />
    </svg>
  );
}

// Several roofs sharing one plot: the community of owners.
function WegArt() {
  return (
    <svg viewBox="0 0 160 100" className="block h-auto w-full" aria-hidden>
      <path d="M8 92h144" {...soft} />
      <path d="M18 92V54l22-18 22 18v38" {...soft} />
      <path d="M98 92V54l22-18 22 18v38" {...soft} />
      <path d="M52 92V44l28-22 28 22v48" {...stroke} />
      <path d="M72 92V70h16v22" {...stroke} />
      <circle cx="80" cy="50" r="6" {...stroke} />
    </svg>
  );
}

// A single house and its key.
function VermieterArt() {
  return (
    <svg viewBox="0 0 160 100" className="block h-auto w-full" aria-hidden>
      <path d="M8 92h144" {...soft} />
      <path d="M24 92V48l36-28 36 28v44" {...soft} />
      <path d="M50 92V68h20v24" {...soft} />
      <circle cx="116" cy="56" r="12" {...stroke} />
      <circle cx="116" cy="56" r="4" {...stroke} />
      <path d="M128 56h22M142 56v8M148 56v6" {...stroke} />
    </svg>
  );
}

// Storefront with awning and a clock: work outside opening hours.
function GewerbeArt() {
  return (
    <svg viewBox="0 0 160 100" className="block h-auto w-full" aria-hidden>
      <path d="M8 92h144" {...soft} />
      <path d="M20 92V44h88v48" {...soft} />
      <path d="M16 44l8-16h80l8 16M16 44q8 8 16 0 8 8 16 0 8 8 16 0 8 8 16 0 8 8 16 0 8 8 16 0" {...soft} />
      <path d="M30 92V62h22v30M62 62h36v18H62Z" {...soft} />
      <circle cx="132" cy="40" r="16" {...stroke} />
      <path d="M132 30v10l7 5" {...stroke} />
    </svg>
  );
}
