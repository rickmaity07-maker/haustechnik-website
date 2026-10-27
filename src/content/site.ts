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
  { label: "Jahreskreis", href: "#jahreskreis" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

// Hotspots on the hero building cross-section. x/y are SVG coordinates (viewBox 0 0 1200 560).
export const hotspots = [
  {
    id: "dach",
    x: 600,
    y: 62,
    title: "Dach & Dachrinne",
    text: "Dachrinnen reinigen, Sichtkontrolle nach Sturm, Schneelast im Blick behalten.",
  },
  {
    id: "wohnung",
    x: 340,
    y: 250,
    title: "Wohnungen",
    text: "Kleinreparaturen, tropfende Armaturen, klemmende Türen, Wohnungsübergaben beim Mieterwechsel.",
  },
  {
    id: "treppenhaus",
    x: 600,
    y: 300,
    title: "Treppenhaus",
    text: "Reinigung, Beleuchtung, Rauchwarnmelder und Brandschutztüren regelmäßig prüfen.",
  },
  {
    id: "heizung",
    x: 845,
    y: 470,
    title: "Heizungskeller",
    text: "Heizung und Warmwasser überwachen, Störungen beheben, Zählerstände ablesen.",
  },
  {
    id: "aussen",
    x: 1085,
    y: 418,
    title: "Außenanlage",
    text: "Grünpflege, Mülltonnen-Service, Laub im Herbst und Winterdienst ab dem ersten Frost.",
  },
] as const;
