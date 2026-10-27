import type { Metadata } from "next";
import Link from "next/link";
import { PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import { ArrowButton } from "@/components/ArrowButton";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Seite nicht gefunden | ${site.name}`,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="inhalt" className="relative isolate flex min-h-dvh items-center overflow-hidden bg-night px-4 py-24 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-[-20%] left-[-10%] h-[60vh] w-[60vw] rounded-full bg-workblue/40 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-full text-lg font-semibold tracking-tight transition-opacity duration-300 hover:opacity-80 active:scale-[0.98]"
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
            <path d="M3 12 13 4l10 8v10H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <rect x="10" y="14" width="6" height="8" fill="var(--signal)" />
          </svg>
          {site.name}
        </Link>

        <p className="mt-20 text-sm font-medium text-signal">Fehler 404</p>
        <h1 className="mt-4 text-[clamp(2.6rem,7vw,5.5rem)] leading-[1] font-medium tracking-[-0.04em]">
          Diese Seite gibt es nicht.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
          Vielleicht hat sich die Adresse geändert oder ein Tippfehler hat sich eingeschlichen. Auf der Startseite finden
          Sie alle Leistungen, oder Sie schreiben uns direkt.
        </p>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ArrowButton href="/">Zur Startseite</ArrowButton>
          <ArrowButton href="/#kontakt" variant="ghost">
            Kontakt aufnehmen
          </ArrowButton>
        </div>

        <a
          href={site.phoneHref}
          className="mt-10 inline-flex items-center gap-3 rounded-full text-white/75 transition-colors duration-300 hover:text-white active:scale-[0.98]"
        >
          <PhoneIcon size={18} weight="light" aria-hidden />
          Lieber anrufen? {site.phone}
        </a>
      </div>
    </main>
  );
}
