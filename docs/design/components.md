# Petrus Coffee — Component Specs

Reusable UI for **Next.js (App Router) · React · TypeScript · Tailwind CSS v4**.
This documents the components that ship in the app, under [`components/`](../../components/),
with the conventions the **design-enforcer** checks against.

Snippets use the semantic Tailwind utilities generated from
[`tokens/theme.css`](./tokens/theme.css) — `bg-primary`, `text-heading`,
`text-on-inverse`, `rounded-pill`, `shadow-md`, `text-accent-strong`, etc. **Prefer
semantic roles over raw ramp steps** (`bg-primary`, not `bg-espresso-600`); the raw
`espresso-*` / `cream-*` scales exist for one-off shading only.

Conventions:
- `cn()` = `clsx` + `tailwind-merge`, at [`lib/cn.ts`](../../lib/cn.ts).
- Icons from [`lucide-react`](https://lucide.dev); decorative ones get `aria-hidden`.
- Server components by default; a file is `"use client"` only when it holds state.

---

## Setup

### Fonts — [`app/layout.tsx`](../../app/layout.tsx)

```tsx
import { Fraunces, Manrope } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["400","500","600","700","900"],
  style: ["normal","italic"], variable: "--font-fraunces", display: "swap" });
const manrope  = Manrope({ subsets: ["latin"], weight: ["400","500","600","700","800"],
  variable: "--font-manrope", display: "swap" });
// <html className={`${fraunces.variable} ${manrope.variable}`}>
```

### Theme wiring — [`app/globals.css`](../../app/globals.css)

```css
@import "tailwindcss";
@import "../docs/design/tokens/theme.css";
@theme {
  --font-display: var(--font-fraunces), Georgia, serif;
  --font-sans: var(--font-manrope), ui-sans-serif, system-ui, sans-serif;
}
```

---

## Primitives

### Container — [`components/ui/Container.tsx`](../../components/ui/Container.tsx)
Centered page width: `max-w-[var(--container-max)]` (1200px) with fluid gutters. Wrap
page content in it (Section applies it automatically).

### Section — [`components/ui/Section.tsx`](../../components/ui/Section.tsx)
Full-bleed band with standard `section-py` rhythm and a `tone`:
`cream` (default canvas) · `surface` (white) · `sunken` · `inverse` (roasted-bean,
switches text to `on-inverse`). Compose pages by alternating tones (§5 of the guide).

### Button — [`components/ui/Button.tsx`](../../components/ui/Button.tsx)
Full **pill**. Export `buttonClasses(variant, size, className)` so a `<Link>` can look
identical to `<button>`.

| Variant | Fill / text | Use |
|---------|-------------|-----|
| `primary` | `bg-primary` → `primary-hover`, `text-on-primary` | main CTA on paper |
| `secondary` | `bg-surface` + `border-strong`, `text-heading` | secondary on paper |
| `ghost` | transparent + `border`, `text-heading` | low-emphasis |
| `inverse` | `bg-surface-cream`, `text-primary` | primary action **on dark bands / images** |

Sizes: `sm` 36px · `md` 44px · `lg` 52px (heights meet the 44px target from `md`).
States: hover lifts `-translate-y-px` + darkens (150ms); `:focus-visible` caramel ring
(inherited base layer); `disabled:opacity-50`.

### Badge — [`components/ui/Badge.tsx`](../../components/ui/Badge.tsx)
Menu status tag, colour-keyed by label but always carrying text:
`Popular` (caramel) · `House Favourite` (espresso) · `New` (olive) · `Seasonal` (wood).

### Eyebrow — [`components/ui/Eyebrow.tsx`](../../components/ui/Eyebrow.tsx)
The signature section marker: a caramel dot + uppercase `tracking-label` text.
`tone="inverse"` for dark bands. This is the recurring "stitch" (§5).

### SectionHeading — [`components/ui/SectionHeading.tsx`](../../components/ui/SectionHeading.tsx)
`eyebrow?` + Fraunces `title` (`display-lg`) + optional `intro`. `align` and `tone`
(`inverse`) props. Renders an `<h2>`.

---

## Composite components

### SiteHeader — [`components/site/SiteHeader.tsx`](../../components/site/SiteHeader.tsx) `"use client"`
Sticky, translucent cream bar (`bg-background/85 backdrop-blur`). Logo, primary nav
with `aria-current` active state via `usePathname()`, a `ReserveDialog` trigger, and a
mobile hamburger (`aria-expanded`/`aria-controls`) revealing a stacked menu.

### SiteFooter — [`components/site/SiteFooter.tsx`](../../components/site/SiteFooter.tsx)
Roasted-bean band: brand blurb + reserve CTA, nav & socials, visit info and hours
(from [`data/site.ts`](../../data/site.ts)). Text `on-inverse`, muted `on-inverse-muted`,
caramel icons, links hover to white.

### ReserveDialog — [`components/home/ReserveDialog.tsx`](../../components/home/ReserveDialog.tsx) `"use client"`
Accessible modal reservation form; **client-side only** (no network). Trigger button
takes `variant`/`size`/`label` so it drops into the header, hero, footer, and CTA.
- Fields: **name, party size, preferred date, preferred time** — all required.
- `role="dialog"` `aria-modal`, labelled by title + described by subtitle; focus moves
  to the first field on open, **Tab is trapped**, `Esc` closes, backdrop click closes,
  focus is **restored to the trigger** on close; body scroll locked while open.
- Validates required fields + not-in-the-past date; errors via `role="alert"`.
  On success shows an inline confirmation summarising name/party/date/time.

### MenuItemCard — [`components/menu/MenuItemCard.tsx`](../../components/menu/MenuItemCard.tsx)
White `radius-lg` card: 4:3 `next/image` (with `Badge` overlay), Fraunces name, muted
description, `text-primary` bold price via `formatPrice()` (FCFA). Hover raises shadow
and scales the image. Used by both the Menu page and homepage popular items.

### MenuCategoryNav — [`components/menu/MenuCategoryNav.tsx`](../../components/menu/MenuCategoryNav.tsx) `"use client"`
Sticky, horizontally-scrollable pill nav of category jump-links. Active pill tracked
with an `IntersectionObserver` scrollspy; `slugify` shared via
[`lib/slug.ts`](../../lib/slug.ts) (a client-safe module — never import server-only
`lib/menu.ts` into a client component).

### Home sections — [`components/home/`](../../components/home/)
`Hero` (full-bleed background `Image` + warm overlay + staged `.animate-rise` copy and
buttons), `PopularItems` (badged items from `getPopularItems()`), `StoryTeaser`,
`EventsSection` (dark band, cards from [`data/events.ts`](../../data/events.ts)),
`ReserveCTA`.

---

## Data & helpers

| File | Role |
|------|------|
| [`lib/menu.ts`](../../lib/menu.ts) | **server-only** — reads `docs/menu-items.csv` at build (`papaparse`), groups by `CATEGORY_ORDER`, `getPopularItems()`, `formatPrice()` |
| [`lib/slug.ts`](../../lib/slug.ts) | client-safe `slugify()` |
| [`lib/cn.ts`](../../lib/cn.ts) | class merge |
| [`data/site.ts`](../../data/site.ts) | name, address, hours, socials, nav |
| [`data/events.ts`](../../data/events.ts) | recurring events |

---

## Component index

| Component | Client? | Key tokens | Notes |
|-----------|---------|-----------|-------|
| `Button` / `buttonClasses` | no | `primary`, `radius-pill` | 4 variants × 3 sizes; 44px target |
| `Container` / `Section` | no | `container-max`, tone bands | alternate tones for rhythm |
| `Eyebrow` / `SectionHeading` | no | `accent`, `display-lg` | bean-dot signature marker |
| `Badge` | no | `accent`/`primary`/`leaf`/`wood` | text + colour, never colour alone |
| `SiteHeader` | yes | `background/85`, `primary` | sticky, `aria-current`, mobile menu |
| `SiteFooter` | no | `surface-inverse`, `on-inverse` | dark band |
| `ReserveDialog` | yes | `surface`, `radius-2xl` | focus-trap, `Esc`, restore focus |
| `MenuItemCard` | no | `surface`, `radius-lg`, `primary` | 4:3 image, FCFA price, hover lift |
| `MenuCategoryNav` | yes | `primary`, `surface-cream` | scrollspy jump-nav |
| `Hero` | no | `display-2xl`, overlay | one staged `.animate-rise` only |
| `EventsSection` | no | `surface-inverse`, `accent` | event cards on dark |
