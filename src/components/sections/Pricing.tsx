"use client";

import { useRef } from "react";
import { CheckIcon, MapPinIcon } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArrowButton } from "@/components/ArrowButton";
import { pricing } from "@/content/site";

// Shared terms, matching the contract answers in the FAQ.
const allPackages = ["12 Monate Mindestlaufzeit", "danach jährlich kündbar", "Protokoll nach jedem Einsatz"];

export function Pricing() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".pr-card", {
          y: 60,
          autoAlpha: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".pr-grid", start: "top 80%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="preise" ref={root} className="bg-concrete py-20 text-night md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* One header row on desktop, so the cards start high enough to be seen together with the heading */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end md:gap-8">
          <h2 className="text-[clamp(2.2rem,4.2vw,3.75rem)] leading-[1.05] font-medium tracking-[-0.03em] text-balance md:col-span-7">
            Feste Pauschalen statt Stundenzettel
          </h2>
          <div className="md:col-span-5">
            <p className="text-lg leading-relaxed text-night/65">
              Sie wissen vorher, was die Betreuung kostet. Abgerechnet wird monatlich {pricing.unit}, ohne versteckte
              Anfahrts- oder Materialpauschalen.
            </p>
            <p className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-white/70 py-1.5 pr-4 pl-1.5 text-sm text-night/80 ring-1 ring-night/10">
              <span className="flex size-6 items-center justify-center rounded-full bg-night text-signal">
                <MapPinIcon size={13} weight="fill" aria-hidden />
              </span>
              Vorab: kostenlose Objektbegehung vor Ort
            </p>
          </div>
        </div>

        <div className="pr-grid mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-3">
          {pricing.packages.map((pkg) => {
            const hi = pkg.recommended;
            return (
              <article
                key={pkg.name}
                aria-label={hi ? `${pkg.name}, empfohlen` : pkg.name}
                className={`pr-card rounded-[1.75rem] p-1.5 ring-1 ${hi ? "bg-night/5 ring-night/10" : "bg-white/50 ring-night/5"}`}
              >
                <div
                  className={`flex h-full flex-col rounded-[calc(1.75rem-0.375rem)] p-7 md:p-8 ${
                    hi
                      ? "bg-night text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                      : "bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_2px_rgba(15,27,45,0.04)]"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-medium tracking-[-0.02em] md:text-2xl">{pkg.name}</h3>
                    {hi && <span className="text-sm font-medium text-signal">Empfohlen</span>}
                  </div>
                  <p className={`mt-3 text-[15px] leading-relaxed ${hi ? "text-white/65" : "text-night/60"}`}>
                    {pkg.description}
                  </p>

                  <p className="mt-6 flex items-baseline gap-2">
                    <span className={`text-base ${hi ? "text-white/60" : "text-night/55"}`}>ab</span>
                    <span className="text-5xl font-medium tracking-[-0.04em] tabular-nums">{pkg.price} €</span>
                  </p>
                  <p className={`mt-2 text-sm ${hi ? "text-white/55" : "text-night/50"}`}>
                    {pricing.unit}, {pricing.vatNote}
                  </p>

                  <ul className={`mt-6 space-y-3 border-t pt-6 ${hi ? "border-white/10" : "border-night/10"}`}>
                    {pkg.items.map((item) => (
                      <li key={item} className={`flex gap-3 text-[15px] ${hi ? "text-white/85" : "text-night/80"}`}>
                        <CheckIcon
                          size={18}
                          weight="bold"
                          className={`mt-0.5 shrink-0 ${hi ? "text-signal" : "text-workblue"}`}
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* mt-auto pins the button to the bottom so all three line up */}
                  <div className="mt-auto pt-8">
                    <ArrowButton href="#kontakt" variant={hi ? "signal" : "dark"}>
                      Begehung anfragen
                    </ArrowButton>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-night/75">
          <li className="font-medium text-night">Alle Pakete:</li>
          {allPackages.map((item, i) => (
            <li key={item} className="inline-flex items-center gap-3">
              {i > 0 && <span aria-hidden className="size-1 rounded-full bg-night/30" />}
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-night/55">
          Die Preise sind Richtwerte. Den endgültigen Preis nennen wir Ihnen nach der kostenlosen Objektbegehung, wenn wir
          Größe, Außenflächen und Technik Ihres Hauses kennen.
        </p>
      </div>
    </section>
  );
}
