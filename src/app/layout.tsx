import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

// Set NEXT_PUBLIC_SITE_URL to the live domain; the fallback keeps local builds working.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const title = `${site.name} | ${site.tagline} in ${site.city}`;
const description = `Hausmeisterservice und Haustechnik für Mehrfamilienhäuser, Wohnanlagen und Gewerbeobjekte in ${site.region}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: site.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

// "Mo–Fr 7:00–17:00 Uhr" becomes the schema.org form "Mo-Fr 07:00-17:00".
function toOpeningHours(hours: string) {
  return hours
    .replace(/[–—]/g, "-")
    .replace(/\s*Uhr\s*/g, "")
    .replace(/\b(\d):/g, "0$1:")
    .trim();
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  description,
  url: siteUrl,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.zip,
    addressLocality: site.address.city,
    addressCountry: "DE",
  },
  areaServed: site.region,
  openingHours: toOpeningHours(site.hours),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${outfit.variable} antialiased`}>
      <body className="grain min-h-dvh">
        <a
          href="#inhalt"
          className="fixed top-4 left-4 z-[70] -translate-y-24 rounded-full bg-signal px-5 py-3 text-sm font-medium text-night shadow-tinted transition-transform duration-300 ease-spring focus:translate-y-0 active:scale-[0.98]"
        >
          Zum Inhalt springen
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
