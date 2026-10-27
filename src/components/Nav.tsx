"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Logo } from "./Logo";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 md:top-6">
        <nav
          aria-label="Hauptnavigation"
          className="flex w-full max-w-5xl items-center justify-between gap-6 rounded-full bg-night/75 py-2 pr-2 pl-5 text-white shadow-[0_20px_60px_-20px_rgba(15,27,45,0.5)] ring-1 ring-white/10 backdrop-blur-xl"
        >
          <a href="#top" aria-label={`${site.name}, zum Seitenanfang`} className="flex items-center">
            <Logo size="sm" variant="onDark" />
          </a>

          <ul className="hidden items-center gap-1 text-sm text-white/75 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#kontakt"
              className="hidden rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-night transition-transform duration-500 ease-spring hover:scale-[1.03] active:scale-[0.97] sm:inline-flex"
            >
              Angebot anfragen
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              className="relative z-50 flex size-11 items-center justify-center rounded-full bg-white/10 lg:hidden"
            >
              <span
                className={`absolute h-px w-5 bg-white transition-transform duration-500 ease-spring ${open ? "rotate-45" : "-translate-y-1.5"}`}
              />
              <span
                className={`absolute h-px w-5 bg-white transition-transform duration-500 ease-spring ${open ? "-rotate-45" : "translate-y-1.5"}`}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-30 flex flex-col justify-end bg-night/90 px-6 pb-12 backdrop-blur-3xl transition-opacity duration-500 ease-spring lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      >
        <ul className="space-y-2">
          {nav.map((item, i) => (
            <li key={item.href} className="overflow-hidden">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
                className={`block text-5xl font-medium tracking-tight text-white transition-all duration-700 ease-spring ${open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={site.emergencyPhoneHref}
          tabIndex={open ? 0 : -1}
          className="mt-10 text-lg text-signal"
        >
          Notdienst {site.emergencyPhone}
        </a>
      </div>
    </>
  );
}
