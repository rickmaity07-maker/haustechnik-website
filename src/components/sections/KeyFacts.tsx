"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { facts, site } from "@/content/site";

const format = (n: number) => n.toLocaleString("de-DE");

// years is computed on the server (cached clock), so this component never reads Date itself.
export function KeyFacts({ years }: { years: number }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".kf-num").forEach((el) => {
          const target = Number(el.dataset.value);
          const counter = { v: 0 };
          gsap.to(counter, {
            v: target,
            duration: 2.2,
            ease: "expo.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
              onEnter: () => {
                el.textContent = "0";
              },
            },
            onUpdate: () => {
              el.textContent = format(Math.round(counter.v));
            },
          });
        });

        gsap.from(".kf-item", {
          y: 40,
          autoAlpha: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".kf-grid", start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="kf-title" className="bg-paper pb-24 text-night md:pb-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-12 md:gap-8 md:px-8">
        <div className="md:col-span-4">
          <h2 id="kf-title" className="text-2xl leading-tight font-medium tracking-[-0.02em] text-balance md:text-3xl">
            {site.name} in Zahlen
          </h2>
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-night/60">
            Verlässlichkeit lässt sich messen. Diese Werte stehen hinter jedem Haus, das wir betreuen.
          </p>
        </div>

        <dl className="kf-grid grid grid-cols-1 border-t border-night/10 sm:grid-cols-[1.35fr_1fr] md:col-span-8">
          {facts.map((fact, i) => {
            const value = fact.value === "founded" ? years : fact.value;
            return (
              <div
                key={fact.label}
                className={`kf-item flex flex-col-reverse gap-2 border-b border-night/10 py-8 sm:py-10 ${
                  i % 2 === 1 ? "sm:border-l sm:pl-10" : "sm:pr-10"
                } ${i === 0 ? "sm:pt-12" : ""}`}
              >
                <dt className="text-[15px] text-night/60">{fact.label}</dt>
                <dd
                  className={`font-medium tracking-[-0.04em] tabular-nums ${
                    i === 0 ? "text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.9]" : "text-[clamp(2.75rem,5vw,4.25rem)] leading-none"
                  }`}
                >
                  {fact.prefix && <span className="text-[0.45em] tracking-normal text-night/55">{fact.prefix}</span>}
                  <span className="kf-num" data-value={value}>
                    {format(value)}
                  </span>
                  {fact.suffix && <span className="text-[0.45em] tracking-normal text-workblue">{fact.suffix}</span>}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
