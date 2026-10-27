"use client";

import { useRef } from "react";
import {
  BroomIcon,
  DropIcon,
  GaugeIcon,
  HouseLineIcon,
  LightbulbIcon,
  LightningIcon,
  PlantIcon,
  SnowflakeIcon,
  ThermometerIcon,
  TrashIcon,
  WrenchIcon,
  type Icon,
} from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";

type Item = { icon: Icon; label: string };

const technik: Item[] = [
  { icon: ThermometerIcon, label: "Heizung" },
  { icon: DropIcon, label: "Sanitär" },
  { icon: LightningIcon, label: "Elektro-Kleinarbeiten" },
  { icon: GaugeIcon, label: "Zählerablesung" },
];

const hausmeister: Item[] = [
  { icon: HouseLineIcon, label: "Objektbetreuung" },
  { icon: BroomIcon, label: "Treppenhaus" },
  { icon: TrashIcon, label: "Müllservice" },
  { icon: LightbulbIcon, label: "Beleuchtung" },
];

// Needle angle in degrees at rest. The gauge reads "warm, everything in range".
const NEEDLE_END = 38;

export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".svc-card", {
          y: 60,
          autoAlpha: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".svc-grid", start: "top 80%", once: true },
        });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: ".svc-gauge", start: "top 85%", once: true },
          delay: 0.3,
        });
        tl.from(".svc-tick", { autoAlpha: 0, duration: 0.4, stagger: 0.04, ease: "power2.out" })
          .fromTo(
            ".svc-needle",
            { rotation: -120 },
            { rotation: NEEDLE_END, svgOrigin: "160 112", duration: 2, ease: "elastic.out(1, 0.45)" },
            "-=0.2",
          )
          .from(".svc-flow", { x: -150, autoAlpha: 0, duration: 1.2, stagger: 0.15, ease: "expo.out" }, "-=1.6")
          .from(".svc-flame", { scale: 0, transformOrigin: "50% 100%", duration: 0.7, ease: "back.out(3)" }, "-=1");
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".svc-needle", { rotation: NEEDLE_END, svgOrigin: "160 112" });
      });
    },
    { scope: root },
  );

  return (
    <section id="leistungen" ref={root} className="bg-paper py-32 text-night md:py-48">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <h2 className="text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.05] font-medium tracking-[-0.03em] text-balance">
            Alles, was ein Haus im Alltag braucht.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-night/65">
            Technik, Pflege und Ordnung aus einer Hand. {site.name} betreut Ihre Objekte in {site.region} mit
            festen Intervallen und einem Protokoll nach jedem Einsatz.
          </p>
        </div>

        <div className="svc-grid mt-16 grid grid-flow-dense grid-cols-1 gap-4 md:mt-20 md:grid-cols-4 md:grid-rows-2">
          {/* A: Haustechnik */}
          <Card className="md:col-span-2 md:row-span-2" dark>
            <div className="flex h-full flex-col">
              <CardHead icon={WrenchIcon} title="Haustechnik" dark>
                Wartung und kleine Reparaturen, bevor aus einem Tropfen ein Wasserschaden wird.
              </CardHead>
              <div className="relative my-8 flex flex-1 items-center justify-center overflow-hidden">
                <div className="w-full max-w-sm transition-transform duration-700 ease-spring group-hover:scale-105">
                  <GaugeIllustration />
                </div>
              </div>
              <ItemList items={technik} dark />
            </div>
          </Card>

          {/* B: Hausmeisterservice */}
          <Card className="md:col-span-2">
            <CardHead icon={HouseLineIcon} title="Hausmeisterservice">
              Regelmäßige Rundgänge, kurze Wege, ein Gesicht, das Ihre Mieter kennen.
            </CardHead>
            <ItemList items={hausmeister} className="mt-8" />
          </Card>

          {/* C: Grünpflege */}
          <Card>
            <CardHead icon={PlantIcon} title="Grünpflege">
              Rasen, Hecken, Beete und Laub. Der Außenbereich bleibt gepflegt, Saison für Saison.
            </CardHead>
          </Card>

          {/* D: Winterdienst */}
          <Card>
            <CardHead icon={SnowflakeIcon} title="Winterdienst">
              Räum- und Streupflicht dokumentiert, mit Uhrzeit und Einsatzprotokoll für Ihre Haftung.
            </CardHead>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({ children, className = "", dark }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <article
      className={`svc-card group rounded-[1.75rem] p-1.5 ring-1 ${dark ? "bg-night/5 ring-night/10" : "bg-concrete/70 ring-night/5"} ${className}`}
    >
      <div
        className={`h-full rounded-[calc(1.75rem-0.375rem)] p-7 md:p-9 ${
          dark
            ? "bg-night text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
            : "bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_2px_rgba(15,27,45,0.04)]"
        }`}
      >
        {children}
      </div>
    </article>
  );
}

function CardHead({ icon: I, title, children, dark }: { icon: Icon; title: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div>
      <span
        className={`flex size-12 items-center justify-center rounded-full transition-transform duration-700 ease-spring group-hover:scale-105 ${
          dark ? "bg-white/10 text-signal" : "bg-night text-white"
        }`}
      >
        <I size={22} weight="light" aria-hidden />
      </span>
      <h3 className="mt-6 text-2xl font-medium tracking-[-0.02em] md:text-3xl">{title}</h3>
      <p className={`mt-3 max-w-md text-[15px] leading-relaxed md:text-base ${dark ? "text-white/65" : "text-night/60"}`}>
        {children}
      </p>
    </div>
  );
}

function ItemList({ items, dark, className = "" }: { items: Item[]; dark?: boolean; className?: string }) {
  return (
    <ul className={`grid grid-cols-1 gap-2 sm:grid-cols-2 ${className}`}>
      {items.map(({ icon: I, label }) => (
        <li
          key={label}
          className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] ${dark ? "bg-white/5 text-white/85" : "bg-paper text-night/80"}`}
        >
          <I size={20} weight="light" className={dark ? "text-signal" : "text-workblue"} aria-hidden />
          {label}
        </li>
      ))}
    </ul>
  );
}

// Boiler pressure gauge with a feed pipe. Only transforms and opacity are animated.
function GaugeIllustration() {
  const ticks = Array.from({ length: 11 }, (_, i) => -120 + i * 24);

  return (
    <svg viewBox="0 0 320 250" className="svc-gauge block h-auto w-full" role="img" aria-label="Manometer einer Heizungsanlage im grünen Bereich">
      {/* feed pipe with flowing water */}
      <path d="M160 212v14" stroke="rgba(255,255,255,0.22)" strokeWidth="10" />
      <path d="M14 230h292" stroke="rgba(255,255,255,0.22)" strokeWidth="10" strokeLinecap="round" />
      <clipPath id="svc-pipe">
        <rect x="14" y="227" width="292" height="6" rx="3" />
      </clipPath>
      <g clipPath="url(#svc-pipe)">
        <rect className="svc-flow" x="14" y="227" width="140" height="6" rx="3" fill="var(--signal)" opacity="0.7" />
        <rect className="svc-flow" x="166" y="227" width="140" height="6" rx="3" fill="var(--signal)" opacity="0.7" />
      </g>

      {/* housing */}
      <circle cx="160" cy="112" r="100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <circle cx="160" cy="112" r="88" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />

      {/* operating range */}
      <path d="M180.5 55.6A60 60 0 0 1 212 82" fill="none" stroke="var(--signal)" strokeWidth="5" strokeLinecap="round" opacity="0.85" />

      {ticks.map((a, i) => (
        <line
          key={a}
          className="svc-tick"
          x1="160"
          y1={i % 5 === 0 ? 30 : 34}
          x2="160"
          y2="44"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth={i % 5 === 0 ? 2 : 1}
          transform={`rotate(${a} 160 112)`}
        />
      ))}

      {/* small flame and unit inside the dial */}
      <path
        className="svc-flame"
        d="M160 160c-6-4-7-9-3-15 1 4 3 5 5 5-1-5 1-9 5-12 0 6 4 9 4 13 0 5-4 9-11 9Z"
        fill="var(--signal)"
      />
      <text x="160" y="180" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="11" letterSpacing="1">
        bar
      </text>

      {/* needle, drawn pointing straight up and rotated around the hub */}
      <g className="svc-needle" transform={`rotate(${NEEDLE_END} 160 112)`}>
        <path d="M157.5 114 160 38l2.5 76Z" fill="#fff" />
      </g>
      <circle cx="160" cy="112" r="8" fill="var(--night)" stroke="#fff" strokeWidth="1.4" />
    </svg>
  );
}
