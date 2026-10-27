"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";

const SEEN_KEY = "intro-seen";
const PLAY_STYLE_ID = "intro-play";

// Runs while the HTML is parsed, before first paint. The overlay is display:none by default
// (so it never shows without JavaScript); on a first visit without reduced motion this
// unhides it via a style tag in <head>, so repeat visitors never see a flash of it.
// The CSS animation is a safety net: if the script bundle never loads, the overlay still
// slides away on its own instead of covering the page.
const playCss =
  "#intro{display:flex;animation:intro-fallback .6s cubic-bezier(.76,0,.24,1) 4s forwards}" +
  "@keyframes intro-fallback{to{transform:translateY(-100%);visibility:hidden}}";
const bootScript = `try{if(!sessionStorage.getItem("${SEEN_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){var s=document.createElement("style");s.id="${PLAY_STYLE_ID}";s.textContent=${JSON.stringify(playCss)};document.head.appendChild(s)}}catch(e){}`;

const letters = Array.from(site.name);

export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const finish = () => {
        document.getElementById(PLAY_STYLE_ID)?.remove();
        setDone(true);
      };

      // Late hydration: the CSS fallback is already sliding the overlay away, so let it finish.
      if (!document.getElementById(PLAY_STYLE_ID) || performance.now() > 3500) {
        finish();
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          // Private mode or blocked storage: the intro simply plays again next time.
        }

        // GSAP takes over from the CSS fallback. Start states live in the markup, so nothing flashes.
        gsap.set(root.current, { animation: "none" });
        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: finish });
        tl.fromTo(".intro-roof", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power4.out" })
          .fromTo(".intro-door", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power4.out" }, 0.35)
          .fromTo(".intro-letter", { yPercent: 110 }, { yPercent: 0, duration: 0.7, stagger: 0.035 }, 0.2)
          .fromTo(".intro-tagline", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: "power4.out" }, 0.65)
          .fromTo(".intro-line", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power4.inOut" }, 0.7)
          .addLabel("exit", 1.2)
          .to(root.current, { yPercent: -100, duration: 0.6, ease: "power4.inOut" }, "exit");

        // Click, Escape or Enter jumps straight to the exit slide.
        const skip = () => {
          if (tl.time() < tl.labels.exit) tl.seek("exit");
        };
        const onKey = (e: KeyboardEvent) => {
          if (e.key === "Escape" || e.key === "Enter") skip();
        };
        const el = root.current;
        el?.addEventListener("click", skip);
        window.addEventListener("keydown", onKey);

        return () => {
          el?.removeEventListener("click", skip);
          window.removeEventListener("keydown", onKey);
        };
      });

      // The boot script already checks this, but the setting can change before hydration.
      mm.add("(prefers-reduced-motion: reduce)", finish);
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      id="intro"
      aria-hidden
      className="fixed inset-0 z-[65] hidden cursor-pointer flex-col items-center justify-center bg-night px-4 text-white"
    >
      <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      <svg width="56" height="56" viewBox="0 0 26 26" fill="none" className="text-white/80">
        <path
          className="intro-roof"
          d="M3 12 13 4l10 8v10H3z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
        />
        <rect
          className="intro-door"
          x="10"
          y="14"
          width="6"
          height="8"
          fill="var(--signal)"
          opacity={0}
        />
      </svg>

      {/* Each letter rises out of a clip mask; the bottom padding keeps descenders inside it. */}
      <p className="mt-8 flex overflow-hidden pb-[0.08em] text-[clamp(3rem,11vw,8rem)] leading-none font-medium tracking-[-0.045em]">
        {letters.map((char, i) => (
          <span key={i} className="intro-letter inline-block [transform:translateY(110%)]">
            {char}
          </span>
        ))}
      </p>
      <p className="intro-tagline mt-5 [transform:translateY(0.75rem)] text-base text-white/60 opacity-0 md:text-lg">{site.tagline}</p>
      <span className="mt-8 block h-px w-40 overflow-hidden bg-white/10 md:w-56">
        <span className="intro-line block h-full w-full origin-left [transform:scaleX(0)] bg-signal" />
      </span>
    </div>
  );
}
