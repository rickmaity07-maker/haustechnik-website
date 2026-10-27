"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const SEEN_KEY = "intro-seen";
const PLAY_STYLE_ID = "intro-play";
const ease = "cubic-bezier(.16,1,.3,1)";
const easeInOut = "cubic-bezier(.76,0,.24,1)";

// The whole sequence is CSS, injected before first paint by the boot script below, so it
// plays even while JavaScript is still loading (slow phones, dev mode). JavaScript only adds
// skipping and removes the overlay at the end. Total: about 4.5 s (name fully readable from about 1.6 s to 3.6 s).
const playCss = [
  `#intro{display:flex;animation:intro-exit .9s ${easeInOut} 3.6s forwards}`,
  `#intro.intro-skip{animation:intro-exit .5s ${easeInOut} 0s forwards}`,
  `#intro .intro-roof{animation:intro-draw 1.1s ${ease} .2s forwards}`,
  `#intro .intro-wrench{animation:intro-pop .7s ${ease} .9s forwards}`,
  `#intro .intro-letter{animation:intro-rise 1s ${ease} forwards;animation-delay:calc(.8s + var(--i) * 70ms)}`,
  `#intro .intro-tagline{animation:intro-up .8s ${ease} 1.7s forwards}`,
  `#intro .intro-line{animation:intro-grow 1.6s ${easeInOut} 1.8s forwards}`,
  "@keyframes intro-draw{to{stroke-dashoffset:0}}",
  "@keyframes intro-pop{to{opacity:1;transform:none}}",
  "@keyframes intro-rise{to{transform:none}}",
  "@keyframes intro-up{to{opacity:1;transform:none}}",
  "@keyframes intro-grow{to{transform:none}}",
  "@keyframes intro-exit{to{transform:translateY(-100%);visibility:hidden}}",
].join("");

// Add ?intro to the URL to replay it (handy while reviewing; normally it plays once per tab).
const bootScript = `try{if((!sessionStorage.getItem("${SEEN_KEY}")||/[?&]intro\\b/.test(location.search))&&!matchMedia("(prefers-reduced-motion: reduce)").matches){sessionStorage.setItem("${SEEN_KEY}","1");var s=document.createElement("style");s.id="${PLAY_STYLE_ID}";s.textContent=${JSON.stringify(playCss)};document.head.appendChild(s)}}catch(e){}`;

const letters = Array.from(site.name);

export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    // Repeat visit or reduced motion: the boot script never unhid the overlay.
    if (!el || !document.getElementById(PLAY_STYLE_ID)) {
      setDone(true);
      return;
    }
    const finish = (e: AnimationEvent) => {
      if (e.target !== el || e.animationName !== "intro-exit") return;
      document.getElementById(PLAY_STYLE_ID)?.remove();
      setDone(true);
    };
    const skip = () => el.classList.add("intro-skip");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") skip();
    };
    el.addEventListener("animationend", finish);
    el.addEventListener("click", skip);
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("animationend", finish);
      el.removeEventListener("click", skip);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      id="intro"
      aria-hidden
      className="fixed inset-0 z-[65] hidden cursor-pointer flex-col items-center justify-center bg-night px-4 text-white"
    >
      <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      {/* Same mark as Logo.tsx: the house draws itself, then the wrench drops in. */}
      <svg viewBox="0 0 32 32" fill="none" className="size-16 md:size-20" aria-hidden>
        <path
          className="intro-roof"
          d="M5 15.5 16 6l11 9.5V27H5z"
          stroke="var(--paper)"
          strokeWidth="1.6"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
        />
        <path
          className="intro-wrench"
          style={{ opacity: 0, transform: "translateY(-4px) scale(.8)", transformOrigin: "16px 18px" }}
          d="M19.2 13.4a3.2 3.2 0 0 0-4 4l-4 4a1.3 1.3 0 0 0 1.9 1.9l4-4a3.2 3.2 0 0 0 4-4l-1.9 1.9-1.6-.3-.3-1.6z"
          fill="var(--signal)"
        />
      </svg>

      {/* Each letter rises out of a clip mask; the bottom padding keeps descenders inside it. */}
      <p className="mt-7 flex overflow-hidden pb-[0.1em] text-[clamp(3.25rem,12vw,9rem)] leading-none font-semibold tracking-[-0.045em]">
        {letters.map((char, i) => (
          <span
            key={i}
            className="intro-letter inline-block"
            style={{ transform: "translateY(110%)", ["--i" as string]: i }}
          >
            {char}
          </span>
        ))}
      </p>
      <p
        className="intro-tagline mt-5 text-base text-white/65 md:text-lg"
        style={{ opacity: 0, transform: "translateY(0.75rem)" }}
      >
        {site.tagline} · {site.region}
      </p>
      <span className="mt-9 block h-px w-40 overflow-hidden bg-white/10 md:w-64">
        <span className="intro-line block h-full w-full origin-left bg-signal" style={{ transform: "scaleX(0)" }} />
      </span>
    </div>
  );
}
