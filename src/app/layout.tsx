import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline} in ${site.city}`,
  description: `Hausmeisterservice und Haustechnik für Mehrfamilienhäuser, Wohnanlagen und Gewerbeobjekte in ${site.region}.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${outfit.variable} antialiased`}>
      <body className="grain min-h-dvh">{children}</body>
    </html>
  );
}
