import Link from "next/link";
import { PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import { ArrowButton } from "@/components/ArrowButton";
import { nav, site } from "@/content/site";

// cacheComponents is enabled, so reading the clock has to happen inside a cached scope.
async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const footerLink =
  "justify-self-start text-white/70 transition-[color,scale] duration-300 hover:text-white active:scale-[0.98]";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-night text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-1/2 h-[60vh] w-[70vw] -translate-x-1/2 rounded-full bg-workblue/35 blur-[120px]" />
      </div>

      {/* Closing call to action */}
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-24 md:pt-48 md:pb-32">
        <h2 className="max-w-5xl text-[clamp(3rem,9vw,8.5rem)] leading-[0.95] font-medium tracking-[-0.045em]">
          Ihr Haus.
          <br />
          <span className="text-white/50">Unsere Sorge.</span>
        </h2>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ArrowButton href="#kontakt">Angebot anfragen</ArrowButton>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-3 rounded-full px-6 py-4 text-base text-white/85 ring-1 ring-white/20 transition-[background-color,scale] duration-300 ease-spring hover:bg-white/10 active:scale-[0.98]"
          >
            <PhoneIcon size={18} weight="light" aria-hidden />
            {site.phone}
          </a>
        </div>
      </div>

      {/* Footer row */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-10 border-t border-white/10 py-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/#top" className="inline-flex items-center gap-2.5 rounded-full text-lg font-semibold tracking-tight transition-[opacity,scale] duration-300 hover:opacity-80 active:scale-[0.98]">
              <Logo />
              <span>{site.name}</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
              {site.tagline} in {site.region}.
            </p>
          </div>

          <nav aria-label="Fußzeile" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
            {nav.map((item) => (
              <Link key={item.href} href={`/${item.href}`} className={footerLink}>
                {item.label}
              </Link>
            ))}
            <Link href="/impressum" className={footerLink}>
              Impressum
            </Link>
            <Link href="/datenschutz" className={footerLink}>
              Datenschutz
            </Link>
          </nav>
        </div>

        <p className="border-t border-white/10 py-6 text-sm text-white/45">
          &copy; <CurrentYear /> {site.name}. Alle Rechte vorbehalten.
        </p>
      </div>

      {/* Decorative outlined wordmark */}
      <div aria-hidden className="pointer-events-none -mb-[0.22em] select-none text-center leading-none">
        <span className="inline-block text-[clamp(5rem,19vw,20rem)] font-semibold tracking-[-0.05em] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.16)]">
          {site.name}
        </span>
      </div>
    </footer>
  );
}

function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <path d="M3 12 13 4l10 8v10H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="10" y="14" width="6" height="8" fill="var(--signal)" />
    </svg>
  );
}
