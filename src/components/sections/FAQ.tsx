"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { faq, site } from "@/content/site";

import { SectionBackdrop } from "@/components/SectionBackdrop";
export function FAQ() {
  const root = useRef<HTMLElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".faq-item", {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".faq-list", start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  // Fade the desktop answer in whenever the selection changes.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        gsap.fromTo(".faq-answer", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: "power4.out" });
      });
    },
    { scope: root, dependencies: [active] },
  );

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = faq.length - 1;
    const next =
      e.key === "ArrowDown" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowUp" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <section id="faq" ref={root} aria-labelledby="faq-title" className="relative isolate bg-paper pb-20 text-night md:pb-28">
      <SectionBackdrop variant="blueprint" />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <h2 id="faq-title" className="text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.05] font-medium tracking-[-0.03em] text-balance">
            Häufige Fragen von Verwaltungen
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-night/65">
            Ihre Frage ist nicht dabei? Rufen Sie uns an unter{" "}
            <a href={site.phoneHref} className="whitespace-nowrap text-workblue underline-offset-4 hover:underline">
              {site.phone}
            </a>
            .
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-12 md:gap-8">
          <ol className="faq-list border-t border-night/10 md:col-span-5">
            {faq.map((item, i) => {
              const selected = i === active;
              return (
                <li key={item.q} className="faq-item border-b border-night/10">
                  {/* Mobile: question and answer stacked, nothing to select */}
                  <div className="py-6 md:hidden">
                    <h3 className="text-lg font-medium tracking-[-0.01em]">{item.q}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-night/65">{item.a}</p>
                  </div>

                  {/* Desktop: the question selects the answer shown on the right */}
                  <button
                    ref={(el) => {
                      buttons.current[i] = el;
                    }}
                    type="button"
                    id={`faq-q-${i}`}
                    aria-controls="faq-answer"
                    aria-expanded={selected}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={`group hidden w-full items-center gap-5 py-5 text-left text-lg tracking-[-0.01em] transition-colors duration-300 md:flex ${
                      selected ? "text-night" : "text-night/55 hover:text-night"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`h-px shrink-0 bg-workblue transition-[width] duration-500 ease-spring ${selected ? "w-8" : "w-3 bg-night/25"}`}
                    />
                    <span className={selected ? "font-medium" : ""}>{item.q}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="hidden md:col-span-6 md:col-start-7 md:block">
            <div
              id="faq-answer"
              role="region"
              aria-live="polite"
              aria-labelledby={`faq-q-${active}`}
              className="sticky top-28 rounded-[1.75rem] bg-concrete/70 p-1.5 ring-1 ring-night/5"
            >
              <div className="faq-answer rounded-[calc(1.75rem-0.375rem)] bg-white p-9 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_2px_rgba(15,27,45,0.04)] lg:p-12">
                <p className="text-sm text-workblue tabular-nums">
                  Frage {active + 1} von {faq.length}
                </p>
                <h3 className="mt-4 text-2xl font-medium tracking-[-0.02em] text-balance">{faq[active].q}</h3>
                <p className="mt-5 text-lg leading-relaxed text-night/70">{faq[active].a}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
