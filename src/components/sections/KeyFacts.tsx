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

        gsap.from(".kf-bar", {
          scaleX: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.1,
          delay: 0.4,
          scrollTrigger: { trigger: ".kf-grid", start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="kf-title" className="bg-paper py-12 text-night md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-center gap-5">
          <h2 id="kf-title" className="shrink-0 text-base font-medium text-night/70">
            {site.name} in Zahlen
          </h2>
          <span aria-hidden className="h-px flex-1 bg-night/10" />
        </div>

        {/* One row from md up, 2x2 below. Dividers are borders, so no column is ever left empty. */}
        <dl className="kf-grid mt-8 grid grid-cols-2 md:mt-10 md:grid-cols-4">
          {facts.map((fact, i) => {
            const value = fact.value === "founded" ? years : fact.value;
            return (
              <div
                key={fact.label}
                className={`kf-item flex min-w-0 flex-col-reverse border-night/10 md:px-8 md:pt-0 md:first:pl-0 md:last:pr-0 ${
                  i % 2 === 1 ? "border-l pl-5" : "pr-5"
                } ${i >= 2 ? "mt-8 border-t pt-8 md:mt-0 md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
              >
                <dt className="mt-4 text-sm leading-snug text-night/60 md:text-[15px]">{fact.label}</dt>
                <dd className="text-[clamp(2.25rem,4.6vw,3.75rem)] leading-none font-medium tracking-[-0.04em] whitespace-nowrap tabular-nums">
                  {fact.prefix && <span className="text-[0.45em] tracking-normal text-night/55">{fact.prefix}</span>}
                  {/* Limits like "unter 60 Min." stay static: counting up from 0 reads oddly. */}
                  <span className={fact.prefix ? undefined : "kf-num"} data-value={value}>
                    {format(value)}
                  </span>
                  {fact.suffix && <span className="text-[0.45em] tracking-normal text-workblue">{fact.suffix}</span>}
                  <span aria-hidden className="kf-bar mt-4 block h-0.5 w-8 origin-left bg-signal" />
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
