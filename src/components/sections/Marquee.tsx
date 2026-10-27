const terms = [
  "Hausmeisterservice",
  "Haustechnik",
  "Heizungswartung",
  "Treppenhausreinigung",
  "Grünpflege",
  "Winterdienst",
  "Kleinreparaturen",
  "Objektkontrolle",
  "Mieterwechsel",
  "Müllservice",
];

function HouseGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[0.45em] shrink-0 text-signal" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
      <path d="M3 11 12 3l9 8" />
      <path d="M5.5 9v12h13V9" />
      <path d="M10 21v-6h4v6" />
    </svg>
  );
}

function WrenchGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[0.45em] shrink-0 text-signal" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14.5 4.5a4.5 4.5 0 0 0 5 6.2L20.6 12 12 20.6a2.1 2.1 0 0 1-3-3L17.6 9l-1.3-1.1a4.5 4.5 0 0 1-1.8-3.4Z" />
      <path d="M14.5 4.5 17 2l2 3 3 2-2.5 2.5" />
    </svg>
  );
}

// One full pass of the list. Rendered twice per row so translateX(-50%) loops seamlessly.
function Row({ outlined, hidden }: { outlined?: boolean; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {terms.map((term, i) => (
        <li key={term} className="flex items-center">
          <span
            className={
              outlined
                ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]"
                : "text-white/80"
            }
          >
            {term}
          </span>
          <span className="mx-[0.6em] flex items-center">{i % 2 === 0 ? <HouseGlyph /> : <WrenchGlyph />}</span>
        </li>
      ))}
    </ul>
  );
}

export function Marquee() {
  return (
    <section aria-label="Unsere Leistungen im Überblick" className="relative overflow-hidden border-t border-white/10 bg-night py-8 md:py-12">
      <div className="group flex flex-col gap-3 text-4xl font-light tracking-[-0.02em] whitespace-nowrap md:gap-5 md:text-6xl">
        <div className="flex w-max animate-[marquee_48s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          <Row />
          <Row hidden />
        </div>
        <div aria-hidden className="flex w-max animate-[marquee_56s_linear_infinite_reverse] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          <Row outlined />
          <Row outlined />
        </div>
      </div>
    </section>
  );
}
