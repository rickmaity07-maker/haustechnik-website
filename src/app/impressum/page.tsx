import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Impressum | ${site.name}`,
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <main className="min-h-dvh bg-paper px-4 py-24 md:py-32">
      <article className="mx-auto max-w-3xl text-night">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-night/80 ring-1 ring-night/10 transition-colors duration-300 hover:text-night"
        >
          <ArrowLeftIcon size={16} weight="light" aria-hidden />
          Zur Startseite
        </Link>

        <h1 className="mt-12 text-4xl leading-[1.05] font-medium tracking-[-0.03em] md:text-6xl">Impressum</h1>

        <TemplateNotice />

        <Block title="Angaben gemäß § 5 DDG">
          <p>
            {site.name} {site.tagline}
            <br />
            Inhaber: {site.owner}
            <br />
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city}
          </p>
          <p>Rechtsform: [Einzelunternehmen / GmbH / UG, bitte ergänzen]</p>
        </Block>

        <Block title="Vertreten durch">
          <p>{site.owner} [bei Gesellschaften: Geschäftsführer bzw. vertretungsberechtigte Personen eintragen]</p>
        </Block>

        <Block title="Kontakt">
          <p>
            Telefon: <a href={site.phoneHref}>{site.phone}</a>
            <br />
            E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </Block>

        <Block title="Registereintrag">
          <p>
            Eintragung im Handelsregister: [falls vorhanden]
            <br />
            Registergericht: [Amtsgericht {site.address.city}]
            <br />
            Registernummer: [HRB 00000]
          </p>
        </Block>

        <Block title="Umsatzsteuer-ID">
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: [DE000000000]</p>
        </Block>

        <Block title="Berufsrechtliche Angaben">
          <p>
            Zuständige Kammer: [Handwerkskammer bzw. IHK, bitte ergänzen]
            <br />
            Eintragung in die Handwerksrolle: [falls zutreffend, mit Gewerk und Nummer]
            <br />
            Gesetzliche Berufsbezeichnung und verliehen in: [falls zutreffend]
          </p>
        </Block>

        <Block title="Berufshaftpflichtversicherung">
          <p>
            Name und Sitz des Versicherers: [bitte ergänzen]
            <br />
            Geltungsraum der Versicherung: [z. B. Deutschland]
          </p>
        </Block>

        <Block title="Redaktionell verantwortlich nach § 18 Abs. 2 MStV">
          <p>
            {site.owner}
            <br />
            {site.address.street}, {site.address.zip} {site.address.city}
          </p>
        </Block>

        <Block title="Verbraucherstreitbeilegung">
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen. [Bitte prüfen und ggf. anpassen.]
          </p>
        </Block>

        <Block title="Haftung für Inhalte und Links">
          <p>
            Wir erstellen die Inhalte dieser Website mit Sorgfalt, übernehmen jedoch keine Gewähr für Vollständigkeit
            und Aktualität. Für Inhalte verlinkter externer Seiten sind ausschließlich deren Betreiber verantwortlich.
            Bei Bekanntwerden von Rechtsverletzungen entfernen wir entsprechende Inhalte oder Links umgehend.
          </p>
        </Block>
      </article>
    </main>
  );
}

function TemplateNotice() {
  return (
    <div className="mt-10 rounded-[1.75rem] bg-signal/25 p-1.5 ring-1 ring-signal/60">
      <div className="rounded-[calc(1.75rem-0.375rem)] bg-paper p-5 text-[15px] leading-relaxed text-night/80 md:p-6">
        <p className="font-medium text-night">Vorlage, bitte vor Veröffentlichung vervollständigen.</p>
        <p className="mt-1">
          Dieses Impressum ist ein Muster. Alle Angaben in eckigen Klammern müssen durch die tatsächlichen Daten Ihres
          Unternehmens ersetzt werden. Lassen Sie den finalen Text rechtlich prüfen.
        </p>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 border-t border-night/10 pt-8">
      <h2 className="text-xl font-medium tracking-tight md:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-night/75 [&_a]:text-night [&_a]:underline [&_a]:decoration-signal [&_a]:decoration-2 [&_a]:underline-offset-4">
        {children}
      </div>
    </section>
  );
}
