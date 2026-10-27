"use client";

import { useRef } from "react";
import Image from "next/image";
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

type Item = { icon?: Icon; label: string };

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

const gruen: Item[] = [{ label: "Rasenschnitt" }, { label: "Heckenschnitt" }, { label: "Laub" }];
const winter: Item[] = [{ label: "Räumen" }, { label: "Streuen" }, { label: "Einsatzprotokoll" }];

// Photo slots. The SVGs in public/images/ are placeholders: save your own photos as
// public/images/leistungen-<name>.jpg (same names) and set PHOTO_EXT to "jpg".
// Shown at 4:3, at least 1200 px wide; next/image takes care of resizing.
const PHOTO_EXT = "svg";
const photo = (name: string) => `/images/leistungen-${name}.${PHOTO_EXT}`;

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
      });
    },
    { scope: root },
  );

  return (
    <section id="leistungen" ref={root} className="bg-paper py-20 text-night md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2 className="text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.05] font-medium tracking-[-0.03em] text-balance lg:col-span-7">
            Alles, was ein Haus im Alltag braucht.
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-night/65 lg:col-span-5 lg:pb-1">
            Technik, Pflege und Ordnung aus einer Hand. {site.name} betreut Ihre Objekte in {site.region} mit
            festen Intervallen und einem Protokoll nach jedem Einsatz.
          </p>
        </div>

        <div className="svc-grid mt-10 grid grid-cols-1 gap-4 md:mt-14 lg:grid-cols-12">
          {/* A: Haustechnik, horizontal: photo left, text and chips right */}
          <Card className="lg:col-span-7" dark>
            <div className="grid gap-5 md:grid-cols-[45%_1fr] md:gap-7">
              <Photo
                src={photo("haustechnik")}
                alt="Heizungsrohre und Manometer im Technikraum eines Mehrfamilienhauses"
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 100vw"
                dark
              />
              <div className="flex flex-col px-3 pb-3 md:px-0 md:pt-3 md:pr-3">
                <CardHead icon={WrenchIcon} title="Haustechnik" dark>
                  Wartung und kleine Reparaturen, bevor aus einem Tropfen ein Wasserschaden wird.
                </CardHead>
                <Chips items={technik} dark className="mt-6 md:mt-auto md:pt-6" />
              </div>
            </div>
          </Card>

          {/* B: Hausmeisterservice. In the narrow lg column the photo moves up beside the text
              and the chips run full width below, so neither column ends in a gap. */}
          <Card className="lg:col-span-5">
            <div className="grid gap-5 md:grid-cols-[45%_1fr] md:gap-x-7 lg:grid-cols-[1fr_40%] lg:gap-x-5">
              <Photo
                src={photo("hausmeisterservice")}
                alt="Gepflegte Mehrfamilienhäuser mit sauberem Eingangsbereich"
                sizes="(min-width: 1024px) 200px, (min-width: 768px) 45vw, 100vw"
                className="md:row-span-2 lg:col-start-2 lg:row-span-1 lg:row-start-1"
              />
              <div className="px-3 md:px-0 md:pt-3 md:pr-3 lg:col-start-1 lg:row-start-1 lg:pr-0 lg:pl-3">
                <CardHead icon={HouseLineIcon} title="Hausmeisterservice">
                  Regelmäßige Rundgänge, kurze Wege, ein Gesicht, das Ihre Mieter kennen.
                </CardHead>
              </div>
              <Chips items={hausmeister} className="px-3 pb-3 md:px-0 md:pr-3 lg:col-span-2 lg:px-3" />
            </div>
          </Card>

          {/* C: Grünpflege */}
          <Card className="lg:col-span-6">
            <Split
              src={photo("gruenpflege")}
              alt="Geschnittene Hecken und gemähter Rasen einer Wohnanlage"
              icon={PlantIcon}
              title="Grünpflege"
              items={gruen}
            >
              Rasen, Hecken, Beete und Laub. Der Außenbereich bleibt gepflegt, Saison für Saison.
            </Split>
          </Card>

          {/* D: Winterdienst */}
          <Card className="lg:col-span-6">
            <Split
              src={photo("winterdienst")}
              alt="Geräumter und gestreuter Gehweg im Winter"
              icon={SnowflakeIcon}
              title="Winterdienst"
              items={winter}
            >
              Räum- und Streupflicht dokumentiert, mit Uhrzeit und Einsatzprotokoll für Ihre Haftung.
            </Split>
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
        className={`h-full rounded-[calc(1.75rem-0.375rem)] p-3 ${
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

// Image left, text right from md up; stacked on mobile.
function Split({
  src,
  alt,
  icon,
  title,
  items,
  children,
}: {
  src: string;
  alt: string;
  icon: Icon;
  title: string;
  items: Item[];
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-[45%_1fr] md:gap-7">
      <Photo src={src} alt={alt} sizes="(min-width: 1024px) 270px, (min-width: 768px) 45vw, 100vw" />
      <div className="flex flex-col px-3 pb-3 md:px-0 md:pt-3 md:pr-3">
        <CardHead icon={icon} title={title}>
          {children}
        </CardHead>
        <Chips items={items} className="mt-6 md:mt-auto md:pt-6" />
      </div>
    </div>
  );
}

// Fixed 4:3 frame; the radius is the core radius minus the core padding, so it stays concentric.
function Photo({
  src,
  alt,
  sizes,
  className = "",
  dark,
  children,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  dark?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative aspect-[4/3] self-start overflow-hidden rounded-[calc(1.75rem-0.375rem-0.75rem)] ${dark ? "bg-white/5" : "bg-concrete"} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-1000 ease-spring group-hover:scale-[1.03]"
      />
      {children}
    </div>
  );
}

function CardHead({ icon: I, title, children, dark }: { icon: Icon; title: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-full transition-transform duration-700 ease-spring group-hover:scale-105 ${
            dark ? "bg-white/10 text-signal" : "bg-night text-white"
          }`}
        >
          <I size={20} weight="light" aria-hidden />
        </span>
        <h3 className="min-w-0 text-2xl font-medium tracking-[-0.02em] hyphens-auto">{title}</h3>
      </div>
      <p className={`mt-4 max-w-md text-[15px] leading-relaxed ${dark ? "text-white/65" : "text-night/60"}`}>{children}</p>
    </div>
  );
}

function Chips({ items, dark, className = "" }: { items: Item[]; dark?: boolean; className?: string }) {
  return (
    <ul className={`flex flex-wrap content-start gap-2 ${className}`}>
      {items.map(({ icon: I, label }) => (
        <li
          key={label}
          className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm ring-1 ${
            dark ? "bg-white/[0.06] text-white/85 ring-white/10" : "bg-paper text-night/80 ring-night/5"
          }`}
        >
          {I && <I size={18} weight="light" className={dark ? "text-signal" : "text-workblue"} aria-hidden />}
          {label}
        </li>
      ))}
    </ul>
  );
}
