"use client";

import { useRef } from "react";
import { ChatCircleTextIcon, FileTextIcon, HandshakeIcon, MapPinIcon } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";

const steps = [
  {
    title: "Anfrage",
    text: "Sie schreiben uns über das Formular oder rufen kurz an. Wir fragen nach Objekt, Größe und den Aufgaben, die Ihnen gerade Arbeit machen.",
    detail: "Formular oder Anruf",
    Icon: ChatCircleTextIcon,
  },
  {
    title: "Objektbegehung vor Ort",
    text: "Wir sehen uns Ihr Objekt gemeinsam an: Keller, Technik, Treppenhaus, Außenanlage. So kalkulieren wir nach dem tatsächlichen Aufwand, nicht nach Schätzung.",
    detail: "Kostenlos, ca. 45 Minuten",
    Icon: MapPinIcon,
  },
  {
    title: "Festpreis-Angebot",
    text: "Sie erhalten ein Leistungsverzeichnis, in dem jede Aufgabe mit Turnus steht, und eine feste monatliche Pauschale. Keine versteckten Stundenzettel.",
    detail: "Leistungsverzeichnis, monatliche Pauschale",
    Icon: FileTextIcon,
  },
  {
    title: "Betreuung startet",
    text: "Ihr fester Ansprechpartner übernimmt das Objekt. Nach jedem Einsatz erhalten Sie ein digitales Protokoll mit Fotos, Uhrzeit und erledigten Punkten.",
    detail: "Fester Ansprechpartner, digitale Protokolle",
    Icon: HandshakeIcon,
  },
] as const;

export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop only: pin the heading column while the step cards scroll past.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const grid = root.current!.querySelector<HTMLElement>(".process-grid")!;
        const left = root.current!.querySelector<HTMLElement>(".process-left")!;
        const range = () => `+=${Math.max(0, grid.offsetHeight - left.offsetHeight)}`;

        gsap.fromTo(
          ".process-fill",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: grid,
              start: "top 128px",
              end: range,
              scrub: true,
              pin: left,
              pinSpacing: false,
              invalidateOnRefresh: true,
            },
          },
        );

        gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
          gsap.from(step, {
            y: 60,
            autoAlpha: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: step, start: "top 85%", once: true },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".process-fill", { scaleY: 1 });
        gsap.set(".process-step", { autoAlpha: 1, y: 0 });
      });
    },
    { scope: root },
  );

  return (
    <section id="ablauf" ref={root} className="bg-concrete py-32 md:py-48">
      <div className="process-grid mx-auto grid max-w-6xl gap-14 px-4 md:grid-cols-2 md:gap-20">
        <div className="process-left self-start">
          <p className="text-sm font-medium text-workblue">Ablauf</p>
          <h2 className="mt-4 text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-night md:text-6xl">
            So starten wir zusammen
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-night/65">
            Von der ersten Nachricht bis zum ersten Rundgang vergehen in der Regel zwei bis drei Wochen. Fragen
            beantworten wir direkt unter{" "}
            <a href={site.phoneHref} className="whitespace-nowrap text-night underline decoration-signal decoration-2 underline-offset-4">
              {site.phone}
            </a>
            .
          </p>

          <div aria-hidden className="relative mt-14 hidden h-56 w-px bg-night/15 md:block">
            <div className="process-fill absolute inset-0 origin-top bg-workblue" />
            <div className="absolute -left-[3px] top-0 size-[7px] rounded-full bg-workblue" />
          </div>
        </div>

        <ol className="space-y-6 md:space-y-10">
          {steps.map((step, i) => (
            <li key={step.title} className="process-step">
              <div className="rounded-[1.75rem] bg-night/[0.03] p-1.5 ring-1 ring-night/10">
                <div className="flex flex-col rounded-[calc(1.75rem-0.375rem)] bg-paper p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_24px_48px_-32px_rgba(15,27,45,0.35)] md:min-h-[26rem] md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="text-6xl leading-none font-medium tracking-[-0.04em] text-night/15 tabular-nums md:text-7xl">
                      {i + 1}
                    </span>
                    <span className="flex size-12 items-center justify-center rounded-full bg-night text-signal">
                      <step.Icon size={22} weight="light" aria-hidden />
                    </span>
                  </div>
                  <h3 className="mt-10 text-2xl font-medium tracking-tight text-night md:mt-auto md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-night/65 md:text-lg">{step.text}</p>
                  <p className="mt-6 inline-flex self-start rounded-full bg-concrete px-4 py-1.5 text-sm text-night/80">
                    {step.detail}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
