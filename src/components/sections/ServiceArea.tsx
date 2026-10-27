"use client";

import { useRef } from "react";
import { MapPinIcon } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { areas, site } from "@/content/site";

export function ServiceArea() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ".sa-map", start: "top 80%", once: true },
        });
        tl.from(".sa-radius", { scale: 0.6, autoAlpha: 0, transformOrigin: "50% 50%", duration: 1.4, ease: "expo.out" })
          .from(".sa-river", { autoAlpha: 0, duration: 1, ease: "power2.out" }, "-=1.1")
          .from(
            ".sa-dot",
            { scale: 0, transformOrigin: "50% 50%", duration: 0.6, stagger: 0.05, ease: "back.out(3)" },
            "-=0.8",
          );

        gsap.from(".sa-item", {
          y: 20,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.04,
          scrollTrigger: { trigger: ".sa-list", start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="einsatzgebiet" ref={root} aria-labelledby="sa-title" className="bg-paper py-20 text-night md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-14 md:px-8">
        <div className="sa-map relative mx-auto w-full max-w-md md:max-w-none">
          <svg viewBox="0 0 400 400" className="block h-auto w-full" role="img" aria-label={`Stilisierte Karte des Einsatzgebiets rund um ${site.city}`}>
            <rect width="400" height="400" rx="28" fill="var(--concrete)" />
            {/* faint grid */}
            {[80, 160, 240, 320].map((p) => (
              <g key={p} stroke="rgba(15,27,45,0.05)" strokeWidth="1">
                <line x1={p} y1="0" x2={p} y2="400" />
                <line x1="0" y1={p} x2="400" y2={p} />
              </g>
            ))}

            {/* service radius */}
            <circle className="sa-radius" cx="200" cy="200" r="150" fill="rgba(255,200,61,0.12)" stroke="var(--signal)" strokeWidth="1.5" strokeDasharray="4 6" />

            {/* Rhein, abstracted */}
            <path
              className="sa-river"
              d="M318 400C276 344 236 300 240 256S212 218 216 186 238 128 228 84 204 26 196 0"
              fill="none"
              stroke="var(--workblue)"
              strokeOpacity="0.35"
              strokeWidth="12"
              strokeLinecap="round"
            />

            {areas.list.map((a, i) => (
              <circle
                key={a.name}
                className="sa-dot"
                cx={a.x}
                cy={a.y}
                r={i === 0 ? 7 : 4.5}
                fill={i === 0 ? "var(--night)" : "var(--workblue)"}
                stroke="#fff"
                strokeWidth="2"
              />
            ))}
            <text x="200" y="228" textAnchor="middle" fontSize="13" fontWeight="500" fill="var(--night)">
              {site.city}
            </text>
            <text x="252" y="336" fontSize="11" fill="var(--workblue)" opacity="0.7">
              Rhein
            </text>
          </svg>
        </div>

        <div>
          <h2 id="sa-title" className="text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.05] font-medium tracking-[-0.03em]">
            Einsatzgebiet
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-night/65">{areas.radius}</p>

          <ul className="sa-list mt-8 grid grid-cols-1 border-t border-night/10 sm:grid-cols-2 sm:gap-x-8">
            {areas.list.map((a) => (
              <li key={a.name} className="sa-item flex items-center gap-3 border-b border-night/10 py-3.5 text-[15px] text-night/80">
                <MapPinIcon size={18} weight="light" className="shrink-0 text-workblue" aria-hidden />
                {a.name}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-night/55">Ihr Ort fehlt? Fragen Sie uns trotzdem, wir prüfen das gerne.</p>
        </div>
      </div>
    </section>
  );
}
