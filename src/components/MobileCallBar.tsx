"use client";

import { useEffect, useState } from "react";
import { PhoneIcon, SirenIcon } from "@phosphor-icons/react";
import { site } from "@/content/site";

// Sections the bar must never cover: hero, contact form and the footer CTA.
const HIDE_ON = ["#top", "#kontakt", "footer"];

export function MobileCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = HIDE_ON.map((s) => document.querySelector(s)).filter((el): el is Element => el !== null);
    const inView = new Set<Element>();

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inView.add(entry.target);
        else inView.delete(entry.target);
      }
      setVisible(inView.size === 0);
    });

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-[translate,opacity] duration-500 ease-spring motion-reduce:transition-none md:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <nav
        aria-label="Schnellkontakt"
        className="grid grid-cols-2 gap-2 rounded-[1.5rem] bg-night/95 p-1.5 shadow-[0_10px_30px_-10px_rgba(15,27,45,0.5)] ring-1 ring-white/10 backdrop-blur"
      >
        <a
          href={site.phoneHref}
          className="flex items-center justify-center gap-2 rounded-[calc(1.5rem-0.375rem)] bg-white/10 py-3.5 text-[15px] font-medium text-white active:scale-[0.97]"
        >
          <PhoneIcon size={18} weight="light" aria-hidden />
          Anrufen
        </a>
        <a
          href={site.emergencyPhoneHref}
          className="flex items-center justify-center gap-2 rounded-[calc(1.5rem-0.375rem)] bg-signal py-3.5 text-[15px] font-medium text-night active:scale-[0.97]"
        >
          <SirenIcon size={18} weight="light" aria-hidden />
          Notdienst
        </a>
      </nav>
    </div>
  );
}
