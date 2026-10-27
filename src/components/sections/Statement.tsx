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
    <section ref={root} className="bg-paper py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-4">
        <p className="statement-text mx-auto max-w-5xl text-center text-3xl leading-[1.18] font-medium tracking-tight text-night md:text-5xl">
          {words.map((word, i) => (
            <span key={i} className="statement-word">
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
