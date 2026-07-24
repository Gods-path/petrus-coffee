# Petrus Coffee — Style Guide

The brand foundations behind every screen. This document is the *why*; the
[design tokens](./tokens/) are the *values*; the [component specs](./components.md)
are the *how*. When they disagree, this guide wins and the others get corrected.

> **Stack:** Next.js (App Router) · React · TypeScript · Tailwind CSS v4.
> Tokens are consumed as Tailwind utilities (from [`tokens/theme.css`](./tokens/theme.css))
> and, where dynamic, as CSS variables (from [`tokens/tokens.css`](./tokens/tokens.css)).

---

## 1. Brand in one line

**A cosy neighbourhood coffee house in Douala that puts Cameroonian coffee first.**
Warm, elegant, and unhurried — a wood-lined room built for lingering, where an
elegant serif headline and honest photography do the talking.

Three words to design against: **warm · elegant · rooted**.

---

## 2. Color

An earthy palette drawn from coffee and natural wood: a deep **Espresso** brown,
warm **Cream** paper, a **Caramel** accent, and a near-black **roasted-bean** dark
for full-bleed bands. Sections alternate cream → white → roasted-bean; that
alternation is the page's rhythm.

### Core roles

| Role | Token | Value | Use |
|------|-------|-------|-----|
| Primary | `primary` | `#5C3A21` | CTAs, active states, price text, links |
| Primary hover | `primary-hover` | `#4A2E19` | hover on primary |
| Page canvas | `background` | `#F5EDE1` | default page background (warm cream) |
| Card surface | `surface` | `#FFFFFF` | menu cards, floating panels |
| Cream panel | `surface-cream` | `#FBF6EC` | soft inset panels, inputs |
| Inverse surface | `surface-inverse` | `#2E1E14` | full-bleed roasted-bean bands (events, footer) |
| Heading | `heading` | `#2E1E14` | display type |
| Body text | `text` | `#3B2A1E` | paragraphs |
| Muted text | `text-muted` | `#7A6A5A` | captions, secondary copy |
| Accent | `accent` | `#C08A3E` | eyebrow marks, small warm highlights, event tags |
| Wood / Leaf | `wood` `#A9744F` / `leaf` `#6B7A4F` | | tertiary warmth & a small botanical accent |

Full ramps (`espresso`, `cream`, `caramel`, `wood`, `olive`) live in the
[tokens](./tokens/tokens.json). **Use semantic roles in components, not raw ramp
steps** — a rebrand should only touch the semantic block.

### Two surface modes

Every component is specified for both contexts:

- **On paper** (cream/white background): ink text, espresso primary, soft shadows.
- **On dark** (roasted-bean band): cream text (`on-inverse` `#F5EDE1`), muted
  `on-inverse-muted` `#C7A87F`, the caramel accent for small marks, and the
  `inverse` button (cream fill, espresso text). Never place `text-muted` ink on dark.

### Contrast & accessibility

- Body text (`text` on `background`/`surface`) and `on-primary` cream on `primary`
  both clear **WCAG AA 4.5:1**. `on-inverse` cream on roasted-bean clears AA.
- Caramel `accent` on cream passes AA only at **large/bold sizes** — reserve it for
  eyebrow marks, tags, and short labels, never body text or thin small text.
- The focus ring is `caramel-600` `#A5722C`, chosen because it stays visible on
  **both** cream and roasted-bean.
- Never signal meaning with color alone. Price = colour **and** bold. Badges carry
  text. Errors = colour **and** text (and `role="alert"`).

---

## 3. Typography

Two families, three jobs. The pairing — an elegant optical serif against a humanist
workhorse — is the brand's warmth made visible. Treat the display face with restraint.

| Role | Family | Weights | Where |
|------|--------|---------|-------|
| **Display** | **Fraunces** (serif, `opsz`) | 400–900 | hero, section titles, card & event titles — **sentence case** |
| **Body / UI** | **Manrope** | 400–800 | paragraphs, buttons, nav, forms |
| **Label / data** | Manrope, uppercase + `tracking-label` | 700 | eyebrows, category tabs, stat/price labels |

Both are on Google Fonts, loaded with `next/font/google` (see
[components.md → Setup](./components.md#setup)) — no layout shift, no runtime request.

### Type scale

Display sizes are **fluid** (`clamp`) so the headline stays elegant on desktop and
controlled on mobile.

| Token | Size | Line-height | Typical use |
|-------|------|-------------|-------------|
| `display-2xl` | `clamp(3rem → 6.5rem)` | 1.02 | hero headline |
| `display-xl` | `clamp(2.5rem → 5rem)` | 1.03 | page headers (Menu, About) |
| `display-lg` | `clamp(2rem → 3.5rem)` | 1.05 | section titles |
| `display-md` | `clamp(1.6rem → 2.4rem)` | 1.1 | category titles, sub-heroes |
| `text-3xl…base` | 1.875 → 1rem | 1.15–1.55 | Manrope headings & lead copy |
| `text-sm / xs` | 0.875 / 0.75rem | 1.5 | secondary, captions |
| `text-2xs` | 0.6875rem | +`tracking-label` 0.16em | uppercase labels & eyebrows |

### Rules

- **Display is a serif in sentence case** — never uppercase, never Manrope. Set it
  at `font-semibold` (600) for most headings; reserve heavier weights for the hero.
- **Body copy** is Manrope **500** (the base weight) — warm against paper. Max line
  length ~66ch.
- **Eyebrows** are label-styled: a small caramel dot + uppercase tracked text
  (`Eyebrow` component). Use them to orient, not to decorate.

---

## 4. Layout & grid

- **Container:** max `1200px`, side gutter `clamp(1rem, 4vw, 2.5rem)`, centered
  (`Container` component).
- **Grid:** product/menu grids are 3-up (`lg`), 2-up (`sm`), 1-up (mobile).
- **Section rhythm:** vertical padding `section-py` = `clamp(3.5rem, 8vw, 7rem)`
  (`Section` component).
- **Spacing:** 4px base unit. Inside components step in 4/8px; between components
  16/24px; between sections use `section-py`.
- **Radii are soft:** cards `radius-lg` (1.25rem), panels/media `radius-xl`/`2xl`,
  buttons & tabs `radius-pill`. Softness is part of the cosy feel.

---

## 5. Signature — warm alternating bands + the bean-dot eyebrow

The site is remembered by two quiet, consistent devices rather than one loud one:

1. **Alternating warm bands.** Cream → white → **roasted-bean dark** sections, each
   a full-bleed change of temperature. The dark bands (events, footer, page headers)
   are where the brand feels most like an evening in the café.
2. **The bean-dot eyebrow.** Every section is introduced by a small caramel dot +
   uppercase label. It's the recurring "stitch" that ties pages together.

Rules of restraint:
- Spend boldness on **photography and the serif headline**, not on effects.
- One accent colour per screen (caramel). Don't add competing bright hues.
- Decorative art (hero overlay, blurred glow, bean detail) is always `aria-hidden`.

---

## 6. Imagery & iconography

- **Food & drink:** warm, appetising photography on a 4:3 card, soft shadow
  (`shadow-sm → md` on hover). All site imagery is Pexels, hotlinked via `next/image`.
- **Atmosphere:** wood-lined interiors, Cameroonian coffee farms, live-music nights,
  people gathering — chosen to reflect Douala, not a generic café.
- **Icons:** [`lucide-react`](https://lucide.dev), ~1.75px stroke, 24px grid. Their
  geometry sits well with Manrope. Decorative icons get `aria-hidden`.
- **Alt text:** every meaningful image has descriptive `alt`; purely decorative
  images (hero background, glows) use `alt=""`.

---

## 7. Motion

Calm by default; one staged entrance on the hero.

| Intent | Duration | Easing |
|--------|----------|--------|
| Hover / press feedback | `fast` 150ms | `ease-out` |
| Enter / reveal | `base` 260ms | `ease-emphasized` |
| Image zoom on hover | `slow` 400ms | `ease-out` |

- **Hover:** buttons lift `translateY(-1px)`; cards raise shadow and images scale ~1.04.
- **Hero:** a single staged rise-in (`.animate-rise`, staggered delays), then stop.
- **Reduced motion:** honoured globally — token durations collapse to ~0 and
  `.animate-rise` / smooth-scroll are disabled ([tokens.css](./tokens/tokens.css),
  [globals.css](../../app/globals.css)).

---

## 8. Voice & copy

Plain, warm, confident — an experience described in the customer's words.

- **Sentence case** everywhere (the serif is sentence case by form).
- **Active, literal labels** that name the outcome: `Reserve a Table`, `View the menu`,
  `Confirm reservation` — kept consistent through the flow (reserve → "Table noted").
- **Describe, don't sell, in UI copy.** "Chilled hibiscus juice," not "an
  unforgettable journey." Save warmth for the story and hero.
- **Empty & error states give direction:** the reservation form says _"Please fill in
  every field so we can hold your table,"_ not a vague apology.
- **Local specificity earns trust:** real neighbourhoods (Bonapriso), real dishes
  (ndolé, puff-puff), prices in **FCFA**.

---

## 9. Accessibility floor (non-negotiable)

Every component ships meeting all of these, or it isn't done:

- **Contrast:** AA for text and meaningful UI (see §2).
- **Keyboard:** everything operable; visible focus is the 2px caramel ring
  (`:focus-visible` in [theme.css](./tokens/theme.css)) — never removed. The
  reservation dialog traps focus, closes on `Esc`, and restores focus to its trigger.
- **Targets:** interactive hit area ≥ **44×44px** (pills/buttons meet this via height).
- **Semantics:** real `<button>`/`<a>`, one `<h1>` per page, labelled inputs,
  `<dl>` for stats, `aria-hidden` on decorative art, a skip-to-content link.
- **Motion & zoom:** reduced-motion respected; layout survives 200% zoom and 320px width.

---

## 10. Do / Don't

| ✅ Do | ❌ Don't |
|------|---------|
| Set headings in Fraunces, sentence case | Set headings uppercase or in Manrope |
| Alternate cream / white / roasted-bean bands | Put three accent colours on one screen |
| Introduce sections with the bean-dot eyebrow | Scatter decorative effects for their own sake |
| Keep caramel to eyebrows, tags & short labels | Use caramel for body text or thin small text |
| Pill buttons with 44px+ hit area, visible focus | Tiny buttons or removed focus rings |
| Give every meaningful image descriptive alt | Leave content images with empty/again alt |
