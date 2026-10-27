import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Datenschutzerklärung | ${site.name}`,
  robots: { index: false },
};

export default function DatenschutzPage() {
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

        <h1 className="mt-12 text-4xl leading-[1.05] font-medium tracking-[-0.03em] md:text-6xl">
          Datenschutzerklärung
        </h1>

        <div className="mt-10 rounded-[1.75rem] bg-signal/25 p-1.5 ring-1 ring-signal/60">
          <div className="rounded-[calc(1.75rem-0.375rem)] bg-paper p-5 text-[15px] leading-relaxed text-night/80 md:p-6">
            <p className="font-medium text-night">Vorlage, bitte vor Veröffentlichung vervollständigen.</p>
            <p className="mt-1">
              Diese Datenschutzerklärung folgt dem Aufbau der DSGVO, ersetzt aber keine Rechtsberatung. Ergänzen Sie
              Angaben in eckigen Klammern, insbesondere Hosting-Anbieter und Formular-Dienst, und lassen Sie den Text
              vor Veröffentlichung prüfen.
            </p>
          </div>
        </div>

        <Block title="1. Verantwortlicher">
          <p>Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne von Art. 4 Nr. 7 DSGVO ist:</p>
          <p>
            {site.name}, Inhaber {site.owner}
            <br />
            {site.address.street}, {site.address.zip} {site.address.city}
            <br />
            Telefon: <a href={site.phoneHref}>{site.phone}</a>
            <br />
            E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>Datenschutzbeauftragter: [falls benannt, Name und Kontakt eintragen; sonst Abschnitt entfernen]</p>
        </Block>

        <Block title="2. Überblick und Rechtsgrundlagen">
          <p>
            Wir verarbeiten personenbezogene Daten nur, soweit dies für den Betrieb dieser Website und die Bearbeitung
            Ihrer Anfragen erforderlich ist. Rechtsgrundlagen sind insbesondere:
          </p>
          <ul>
            <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung),</li>
            <li>Art. 6 Abs. 1 lit. b DSGVO (Vertrag und vorvertragliche Maßnahmen),</li>
            <li>Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung),</li>
            <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).</li>
          </ul>
        </Block>

        <Block title="3. Hosting und Server-Logfiles">
          <p>
            Diese Website wird bei [Name und Anschrift des Hosting-Anbieters] betrieben. Beim Aufruf der Seiten werden
            automatisch Informationen in Server-Logfiles gespeichert, die Ihr Browser übermittelt: IP-Adresse, Datum und
            Uhrzeit des Zugriffs, aufgerufene Seite, Referrer, Browsertyp und Betriebssystem.
          </p>
          <p>
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im
            sicheren und stabilen Betrieb der Website. Die Logfiles werden nach [7] Tagen gelöscht. Mit dem Anbieter
            besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.
          </p>
        </Block>

        <Block title="4. Kontaktformular">
          <p>
            Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten wir Ihre Angaben (Name, E-Mail-Adresse,
            optional Telefonnummer, Objektart, Anzahl Wohneinheiten, gewünschte Leistungen und Ihre Nachricht), um Ihre
            Anfrage zu bearbeiten und ein Angebot zu erstellen.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Vertragsabschluss gerichtet ist,
            im Übrigen Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO, die Sie jederzeit mit Wirkung für die Zukunft
            widerrufen können. Für den Versand nutzen wir [Name des Formular-Dienstes bzw. eigener Server].
          </p>
        </Block>

        <Block title="5. Kontakt per E-Mail oder Telefon">
          <p>
            Wenn Sie uns per E-Mail oder telefonisch kontaktieren, speichern wir Ihre Angaben zur Bearbeitung des
            Anliegens auf Grundlage von Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO. Eine Weitergabe an Dritte erfolgt nicht
            ohne Ihre Einwilligung.
          </p>
        </Block>

        <Block title="6. Schriftarten">
          <p>
            Diese Website verwendet die Schriftart Outfit. Die Schriftdateien werden lokal von unserem Server
            ausgeliefert. Beim Seitenaufruf wird keine Verbindung zu Servern von Google oder anderen Drittanbietern
            hergestellt.
          </p>
        </Block>

        <Block title="7. Cookies und Analyse">
          <p>
            Diese Website setzt keine Cookies zu Analyse- oder Marketingzwecken und verwendet keine Tracking-Dienste.
            [Falls Sie später Analyse-Tools einbinden, ergänzen Sie diesen Abschnitt und eine Einwilligungsabfrage.]
          </p>
        </Block>

        <Block title="8. Speicherdauer">
          <p>
            Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist. Anfragen,
            aus denen kein Vertrag entsteht, löschen wir spätestens nach [6 Monaten]. Gesetzliche Aufbewahrungspflichten,
            etwa nach Handels- und Steuerrecht, bleiben unberührt.
          </p>
        </Block>

        <Block title="9. Ihre Rechte">
          <p>Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
          <ul>
            <li>Auskunft (Art. 15 DSGVO)</li>
            <li>Berichtigung (Art. 16 DSGVO)</li>
            <li>Löschung (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            <li>Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
          </ul>
          <p>
            Wenden Sie sich dazu formlos an <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </Block>

        <Block title="10. Beschwerderecht bei der Aufsichtsbehörde">
          <p>
            Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Zuständig ist
            in der Regel die Behörde Ihres Wohnorts oder unseres Unternehmenssitzes: [Name und Anschrift der zuständigen
            Landesdatenschutzbehörde eintragen].
          </p>
        </Block>

        <Block title="11. Stand">
          <p>Stand dieser Datenschutzerklärung: [Monat Jahr]</p>
        </Block>
      </article>
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 border-t border-night/10 pt-8">
      <h2 className="text-xl font-medium tracking-tight md:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-night/75 [&_a]:text-night [&_a]:underline [&_a]:decoration-signal [&_a]:decoration-2 [&_a]:underline-offset-4 [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
