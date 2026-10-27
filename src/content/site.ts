// All business details live here. Change this file to rebrand the template.

export const site = {
  name: "Hauswacht",
  tagline: "Hausmeisterservice & Haustechnik",
  city: "Köln",
  region: "Köln, Bonn und Rhein-Erft-Kreis",
  phone: "0221 123 456 0",
  phoneHref: "tel:+492211234560",
  emergencyPhone: "0221 123 456 99",
  emergencyPhoneHref: "tel:+4922112345699",
  email: "service@hauswacht-koeln.de",
  address: {
    street: "Musterstraße 12",
    zip: "50667",
    city: "Köln",
  },
  hours: "Mo–Fr 7:00–17:00 Uhr",
  owner: "Max Mustermann",
  founded: 2009,
} as const;

export const nav = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Für wen", href: "#fuer-wen" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Preise", href: "#preise" },
  { label: "Einsatzgebiet", href: "#einsatzgebiet" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

// Hero copy. Keep it short: headline up to 6 words, subline up to 12 words, three trust items.
export const hero = {
  headline: "Ihr Haus in guten Händen.",
  subline: `Hausmeisterservice und Haustechnik für ${site.city} und Umgebung.`,
  trust: [`Seit ${site.founded}`, "Fester Ansprechpartner", "Feste Termine"],
} as const;

// Hotspots on the hero building cross-section. x/y are SVG coordinates (viewBox 0 0 1200 560).
export const hotspots = [
  { id: "dach", x: 600, y: 62, title: "Dach & Dachrinne", text: "Rinnen reinigen und nach jedem Sturm nachsehen." },
  { id: "wohnung", x: 340, y: 250, title: "Wohnungen", text: "Kleinreparaturen und Übergaben beim Mieterwechsel." },
  { id: "treppenhaus", x: 600, y: 300, title: "Treppenhaus", text: "Sauber, hell und mit geprüften Rauchmeldern." },
  { id: "heizung", x: 845, y: 470, title: "Heizungskeller", text: "Heizung und Warmwasser im Blick, Störungen behoben." },
  { id: "aussen", x: 1085, y: 418, title: "Außenanlage", text: "Grünpflege, Mülltonnen und Winterdienst." },
] as const;

// Beispielwerte, vor Veröffentlichung anpassen
// value "founded" wird in der Komponente als Jahre seit site.founded berechnet.
export type Fact = { value: number | "founded"; prefix?: string; suffix?: string; label: string };

export const facts: readonly Fact[] = [
  { value: "founded", suffix: " Jahre", label: "Erfahrung in der Objektbetreuung" },
  { value: 1240, label: "Betreute Wohneinheiten" },
  { value: 60, prefix: "unter ", suffix: " Min.", label: "Reaktionszeit im Notdienst" },
  { value: 380, label: "Einsätze pro Monat" },
];

// Beispielwerte, vor Veröffentlichung anpassen
export const contactPerson = {
  name: "Max Mustermann",
  role: "Inhaber und Objektleiter",
  intro:
    "Ich nehme Ihre Anfrage persönlich entgegen, komme zur kostenlosen Objektbegehung und bleibe danach Ihr fester Ansprechpartner für jedes Haus, das wir für Sie betreuen.",
  phone: site.phone,
  phoneHref: site.phoneHref,
  image: "/images/ansprechpartner.svg",
} as const;

// Beispielwerte, vor Veröffentlichung anpassen
export type PricingPackage = {
  name: string;
  price: number;
  description: string;
  items: readonly string[];
  recommended?: boolean;
};

export const pricing: {
  unit: string;
  vatNote: string;
  packages: readonly PricingPackage[];
} = {
  unit: "pro Hauseingang und Monat",
  vatNote: "zzgl. 19 % MwSt.",
  packages: [
    {
      name: "Basis",
      price: 89,
      description: "Für kleinere Objekte, bei denen regelmäßig jemand nach dem Rechten sieht.",
      items: [
        "Wöchentlicher Objektrundgang",
        "Kontrolle von Beleuchtung und Türen",
        "Mülltonnen-Service",
        "Digitales Protokoll nach jedem Einsatz",
      ],
    },
    {
      name: "Komplett",
      price: 149,
      description: "Der Hausmeisterservice für Mehrfamilienhäuser, rundum betreut.",
      recommended: true,
      items: [
        "Alle Leistungen aus Basis",
        "Treppenhausreinigung",
        "Grünpflege und Laubbeseitigung",
        "Winterdienst mit Einsatzprotokoll",
        "Kleinreparaturen bis 15 Minuten",
      ],
    },
    {
      name: "Komplett plus Technik",
      price: 219,
      description: "Hausmeister und Haustechnik aus einer Hand, mit Notdienst.",
      items: [
        "Alle Leistungen aus Komplett",
        "Kontrolle von Heizung und Warmwasser",
        "Prüfung der Rauchwarnmelder",
        "Zählerablesung",
        "Notdienst rund um die Uhr",
        "Fester Ansprechpartner für Technik",
      ],
    },
  ],
};

// Beispielwerte, vor Veröffentlichung anpassen
// x/y sind Koordinaten auf der stilisierten Karte (viewBox 0 0 400 400, Köln-Mitte bei 200/200).
export const areas = {
  radius: "Im Umkreis von rund 25 km um Köln sind wir für Sie im Einsatz.",
  list: [
    { name: "Köln-Innenstadt", x: 200, y: 200 },
    { name: "Köln-Ehrenfeld", x: 166, y: 184 },
    { name: "Köln-Lindenthal", x: 158, y: 214 },
    { name: "Köln-Nippes", x: 192, y: 156 },
    { name: "Köln-Deutz", x: 232, y: 206 },
    { name: "Köln-Mülheim", x: 244, y: 166 },
    { name: "Köln-Rodenkirchen", x: 212, y: 254 },
    { name: "Köln-Porz", x: 268, y: 264 },
    { name: "Leverkusen", x: 262, y: 100 },
    { name: "Bergisch Gladbach", x: 316, y: 164 },
    { name: "Frechen", x: 108, y: 224 },
    { name: "Hürth", x: 146, y: 274 },
  ],
} as const;

// Beispielwerte, vor Veröffentlichung anpassen
export const faq = [
  {
    q: "Wie lange läuft ein Vertrag?",
    a: "Die Mindestlaufzeit beträgt zwölf Monate. Danach verlängert sich der Vertrag jeweils um ein Jahr, sofern er nicht gekündigt wird.",
  },
  {
    q: "Wie kann ich kündigen?",
    a: "Mit einer Frist von drei Monaten zum Ende der Laufzeit, schriftlich per Brief oder E-Mail. Wird das Objekt verkauft, finden wir gemeinsam eine faire Lösung.",
  },
  {
    q: "Bekomme ich Protokolle über die Einsätze?",
    a: "Ja. Nach jedem Einsatz erhalten Sie ein digitales Protokoll mit Datum, Uhrzeit, erledigten Aufgaben und Fotos. Beim Winterdienst dient es als Nachweis Ihrer Verkehrssicherungspflicht.",
  },
  {
    q: "Wann ist der Notdienst erreichbar?",
    a: `Im Paket Komplett plus Technik rund um die Uhr, auch an Wochenenden und Feiertagen, unter ${site.emergencyPhone}. In den anderen Paketen während unserer Servicezeiten ${site.hours}.`,
  },
  {
    q: "Wie sind Schäden abgesichert?",
    a: "Wir haben eine Betriebshaftpflichtversicherung mit einer Deckungssumme von 5 Mio. Euro. Den Versicherungsnachweis senden wir Ihnen vor Vertragsbeginn zu.",
  },
  {
    q: "Kann über das Hausgeld abgerechnet werden?",
    a: "Ja. Unsere Rechnungen sind nach Leistungsarten aufgeschlüsselt und lassen sich direkt in die Hausgeld- und Nebenkostenabrechnung übernehmen. Haushaltsnahe Dienstleistungen weisen wir gesondert aus.",
  },
  {
    q: "Wie schnell kann die Betreuung beginnen?",
    a: "In der Regel zwei bis drei Wochen nach der kostenlosen Objektbegehung. Wechseln Sie den Dienstleister, stimmen wir den Start auf das Ende Ihres bisherigen Vertrags ab.",
  },
] as const;
