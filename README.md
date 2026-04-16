# Boaz Fitness Studios

A members-only club marketing site for Boaz Fitness Studios — a private club on the Upper East Side of New York for training, recovery, and community.

Built as a presentation demo with a "quiet luxury" aesthetic: predominantly dark, restrained use of warm gold, editorial typography, generous whitespace.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS with CSS variables for all design tokens
- Framer Motion for restrained, on-scroll reveals and page transitions
- Lucide React for iconography
- `next/font/google` for Cormorant Garamond (display) and Inter (UI)
- Unsplash hotlinks routed through `next/image`

## Run locally

```bash
npm install
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Build & deploy

```bash
npm run build
npm run start
```

### Deploying to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, create a new project and import the repository.
3. Framework preset is detected as **Next.js** — defaults will work as-is.
4. No environment variables are required.

The site is Vercel-ready out of the box.

## Editing content and imagery

Everything user-facing is centralized for easy editing:

- **Copy:** `lib/copy.ts` — all marketing strings, tagline, page titles, body paragraphs, service names and descriptions.
- **Images:** `lib/images.ts` — every Unsplash photo used across the site, referenced by key. Swap the photo ID in the `base(...)` helper to change an image.
- **Design tokens:** `app/globals.css` — color variables (`--obsidian`, `--gold`, `--ivory`, etc.), grain overlay, hairline utilities, form styles. Change a token here and the change propagates everywhere.
- **Tailwind theme:** `tailwind.config.ts` — exposes the CSS variables as Tailwind colors and adds typography / spacing extensions.

## Project structure

```
/app
  layout.tsx           Root layout — fonts, header, footer, page transition
  globals.css          Tokens, base styles, grain overlay, form styles
  page.tsx             Home
  /about/page.tsx
  /services/page.tsx
  /contact/page.tsx
  /members/page.tsx
/components
  /brand               Wordmark + Monogram (inline SVG)
  /layout              Header, Footer, MobileMenu, PageTransition
  /sections            Page-level section components
  /ui                  Button, Eyebrow, SectionHeading, NumberedMarker,
                       HairlineDivider, GrainOverlay, EditorialImage,
                       InquiryForm, MapEmbed, Reveal
/lib
  copy.ts              All marketing copy
  images.ts            All Unsplash image URLs
/public
  favicon.svg          Monogram favicon
  apple-touch-icon.svg
```

## Design system highlights

- **Colors:** Obsidian + charcoal surfaces, ivory text, warm gold (#f0bc00) used only as accent — hairlines, a single primary CTA per section, hover transitions.
- **Typography:** Cormorant Garamond 500 for display, Inter 400/500 for UI. Italic accents used within display headings to create editorial rhythm.
- **Motion:** 600ms ease-out scroll reveals with 30–40px translate. 400ms cross-fade between routes. `prefers-reduced-motion` fully respected.
- **Accessibility:** 2px gold focus rings at 4px offset, WCAG AA contrast on all text, keyboard-navigable mobile menu with focus trap, semantic heading order, meaningful alt text on all images.

## Notes

- The inquiry form on `/contact` shows a success state in place — a backend is not wired. The submit handler in `components/ui/InquiryForm.tsx` is the place to add one.
- The members portal at `/members` is a placeholder UI. No auth is wired.
- Google Maps is embedded via a public URL with no API key required for demo purposes. Replace the coordinates in `components/ui/MapEmbed.tsx` to point at the real address.
