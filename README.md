# Hauswacht – Website-Vorlage für Hausmeisterservice & Haustechnik

A German one-page website template for caretaker and building-services companies
(Hausmeisterservice, Haustechnik, Grünpflege, Winterdienst). Built with Next.js 16,
React 19, Tailwind CSS 4 and GSAP.

## Highlights

- **Brand intro**: the company name reveals itself on first visit (about 4.5 s, skippable, never shown with reduced motion).
- **Interactive hero**: a building cross-section where visitors switch window lights on and off; idle lights move between flats.
- **Interactive pressure gauge** in the Haustechnik card: drag the needle or use the arrow keys, with a live status.
- **Sections that sell**: services, key figures, process, fixed monthly price packages, service-area map, FAQ, contact person, contact form with German validation.
- **Mobile call bar** with phone and 24 h emergency number.
- **Technical finish**: German 404 page, skip link, Open Graph image, JSON-LD (`HomeAndConstructionBusiness`), reduced-motion support throughout.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Add `?intro` to the URL to replay the intro.

## Make it yours

| What | Where |
|---|---|
| Company name, phone, address, hours, region | `src/content/site.ts` (`site`) |
| Figures, prices, service areas, FAQ, contact person | `src/content/site.ts` (blocks marked *Beispielwerte*) |
| Photos | replace the SVGs in `public/images/` with JPGs of the same name (see comments in `Services.tsx`) |
| Colours | design tokens in `src/app/globals.css` |
| Site URL for metadata | environment variable `NEXT_PUBLIC_SITE_URL` |
| Contact form backend | marked comment in `src/components/sections/Contact.tsx` |

**Before going live:** replace every example value, and complete the Impressum (`/impressum`) and
Datenschutz (`/datenschutz`) pages. They are templates, not legal advice.

## Scripts

- `npm run dev`: development server
- `npm run build`: production build
- `npm run start`: serve the production build
- `npm run lint`: ESLint
