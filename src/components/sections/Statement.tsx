"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const text =
  "Ein Haus funktioniert, wenn niemand darüber nachdenken muss. Dafür sind wir da: feste Ansprechpartner, feste Rundgänge und ein Protokoll nach jedem Einsatz.";
const words = text.split(" ");

export function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Words light up one after another while the paragraph scrolls through the viewport.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".statement-word",
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: { trigger: ".statement-text", start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".statement-word", { opacity: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Unser Anspruch" className="bg-paper pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="mx-auto max-w-7xl px-4">
        {/* Hairlines and a single house mark frame the paragraph as a pause between two paper sections. */}
        <div aria-hidden className="mx-auto mb-10 flex max-w-5xl items-center gap-5 md:mb-14">
          <span className="h-px flex-1 bg-night/10" />
          <svg width="28" height="28" viewBox="0 0 26 26" fill="none" className="text-night/40">
            <path d="M3 12 13 4l10 8v10H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            <rect x="10" y="14" width="6" height="8" fill="var(--signal)" />
          </svg>
          <span className="h-px flex-1 bg-night/10" />
        </div>
        <p className="statement-text mx-auto max-w-5xl text-center text-3xl leading-[1.18] font-medium tracking-tight text-balance text-night md:text-5xl">
          {words.map((word, i) => (
            <span key={i} className="statement-word">
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
        <div aria-hidden className="mx-auto mt-10 h-px max-w-5xl bg-night/10 md:mt-14" />
      </div>
    </section>
  );
}
