"use client";

import { useRef, useState } from "react";
import { ChatCircleTextIcon, FileTextIcon, HandshakeIcon, MapPinIcon } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";

import { SectionBackdrop } from "@/components/SectionBackdrop";
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
    detail: "Leistungsverzeichnis, Pauschale",
    Icon: FileTextIcon,
  },
  {
    title: "Betreuung startet",
    text: "Ihr fester Ansprechpartner übernimmt das Objekt. Nach jedem Einsatz erhalten Sie ein digitales Protokoll mit Fotos, Uhrzeit und erledigten Punkten.",
    detail: "Digitale Protokolle",
    Icon: HandshakeIcon,
  },
] as const;

const outline = "text-transparent [-webkit-text-stroke:1.5px_var(--stroke)]";

export function Process() {
  const root = useRef<HTMLElement>(null);
  // -1 = no step reached yet (and the permanent state under reduced motion).
  const [active, setActive] = useState(-1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const list = root.current!.querySelector<HTMLElement>(".process-list")!;

        // The line fills while the list passes the middle of the viewport.
        gsap.fromTo(
          ".process-fill",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: list, start: "top 55%", end: "bottom 55%", scrub: 0.6 },
          },
        );

        gsap.utils.toArray<HTMLElement>(".process-step").forEach((step, i) => {
          gsap.from(step, {
            y: 40,
            autoAlpha: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: step, start: "top 88%", once: true },
          });

          // The step crossing the middle of the viewport becomes the active one.
          gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: "top 55%",
              end: "bottom 55%",
              onEnter: () => setActive(i),
              onEnterBack: () => setActive(i),
              onLeaveBack: () => i === 0 && setActive(-1),
            },
          });
        });
      });

      // Desktop only: pin the heading column while the step rows scroll past.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const grid = root.current!.querySelector<HTMLElement>(".process-grid")!;
        const left = root.current!.querySelector<HTMLElement>(".process-left")!;

        gsap.timeline({
          scrollTrigger: {
            trigger: grid,
            start: "top 112px",
            end: () => `+=${Math.max(0, grid.offsetHeight - left.offsetHeight)}`,
            pin: left,
            pinSpacing: false,
            invalidateOnRefresh: true,
          },
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
    <section id="ablauf" ref={root} className="relative isolate bg-concrete py-20 md:py-28">
      <SectionBackdrop variant="route" />
      <div className="process-grid mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-[0.8fr_1.6fr] md:gap-14 md:px-8 lg:gap-20">
        <div className="process-left self-start">
          <p className="text-sm font-medium text-workblue">Ablauf</p>
          <h2 className="mt-4 text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-balance text-night md:text-5xl lg:text-6xl">
            So starten wir zusammen
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-night/65">
            Von der ersten Nachricht bis zum ersten Rundgang vergehen in der Regel zwei bis drei Wochen. Fragen
            beantworten wir direkt unter{" "}
            <a
              href={site.phoneHref}
              className="inline-block whitespace-nowrap text-night underline decoration-signal decoration-2 underline-offset-4 transition-[color,scale] duration-300 hover:text-workblue active:scale-[0.98]"
            >
              {site.phone}
            </a>
            .
          </p>

          {/* Progress line with one marker per step */}
          <div aria-hidden className="relative mt-10 hidden h-56 w-px bg-night/15 md:block">
            <div className="process-fill absolute inset-0 origin-top bg-workblue" />
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="absolute -left-[5px] size-[11px] -translate-y-1/2"
                style={{ top: `${(i / (steps.length - 1)) * 100}%` }}
              >
                <span className="absolute inset-0 rounded-full bg-concrete ring-1 ring-night/25" />
                <span
                  className={`absolute inset-0 rounded-full bg-signal ring-2 ring-night transition-[opacity,scale] duration-500 ease-spring ${
                    i <= active ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-6 -translate-y-1/2 text-sm whitespace-nowrap text-night transition-opacity duration-500 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <ol className="process-list space-y-3 md:space-y-4">
          {steps.map((step, i) => {
            const on = i === active;
            return (
              <li key={step.title} className="process-step" aria-current={on ? "step" : undefined}>
                <div
                  className={`rounded-[1.75rem] bg-night/[0.03] p-1.5 ring-1 ring-night/10 transition-transform duration-700 ease-spring ${
                    on ? "-translate-y-1.5" : ""
                  }`}
                >
                  <div className="relative grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 rounded-[calc(1.75rem-0.375rem)] bg-paper p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_24px_48px_-32px_rgba(15,27,45,0.35)] md:gap-x-8 md:p-7 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                    {/* Lifted shadow, faded in on the active step */}
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 rounded-[inherit] shadow-[0_32px_56px_-28px_rgba(15,27,45,0.45)] transition-opacity duration-700 ${
                        on ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Outlined number: a signal-yellow copy fades in over the grey one */}
                    <span
                      aria-hidden
                      className="relative row-span-2 self-start text-6xl leading-[0.85] font-semibold tracking-[-0.05em] tabular-nums md:text-8xl lg:row-span-1 lg:self-center"
                    >
                      <span className={outline} style={{ "--stroke": "rgba(15,27,45,0.22)" } as React.CSSProperties}>
                        {i + 1}
                      </span>
                      <span
                        className={`absolute inset-0 ${outline} transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}
                        style={{ "--stroke": "var(--signal)" } as React.CSSProperties}
                      >
                        {i + 1}
                      </span>
                    </span>

                    <div className="relative min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-night text-signal">
                          <step.Icon size={20} weight="light" aria-hidden />
                        </span>
                        <h3 className="text-xl font-medium tracking-tight text-night md:text-2xl">
                          <span className="sr-only">Schritt {i + 1}: </span>
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-night/65 md:text-base">{step.text}</p>
                    </div>

                    <p className="relative col-start-2 inline-flex self-start justify-self-start rounded-full bg-concrete px-4 py-1.5 text-sm text-night/80 lg:col-start-3 lg:self-center lg:justify-self-end lg:whitespace-nowrap">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
