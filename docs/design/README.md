# Petrus Coffee — Design System

A complete, code-ready design system for the Petrus Coffee site: brand foundations,
design tokens, and component specs, derived from the reference designs in
[`references/`](./references/) and built to the [frontend-design](https://github.com/anthropics/claude-code)
skill's principles.

**Target stack:** Next.js (App Router) · React · TypeScript · **Tailwind CSS v4**.

> ℹ️ The repo had no existing code to detect a stack from, so Next.js + Tailwind v4
> was chosen as the target (confirmed with the requester). Tokens are also exported
> as framework-agnostic CSS variables and DTCG JSON, so the system ports cleanly if
> the stack changes.

---

## What's here

| File | What it is |
|------|-----------|
| [`style-guide.md`](./style-guide.md) | Brand foundations — color, typography, layout, the signature torn-paper divider, motion, voice, accessibility. **Start here.** |
| [`components.md`](./components.md) | Component specs with React/TSX + Tailwind reference implementations. |
| [`tokens/tokens.json`](./tokens/tokens.json) | Machine-readable source of truth (DTCG format — feeds Style Dictionary / Tokens Studio). |
| [`tokens/tokens.css`](./tokens/tokens.css) | Framework-agnostic CSS custom properties (reference + semantic layers). |
| [`tokens/theme.css`](./tokens/theme.css) | Tailwind v4 `@theme` — generates all the `bg-primary` / `text-heading` / `rounded-pill` utilities. |
| [`references/`](./references/) | Source design comps this system is drawn from. |

---

## The design in 30 seconds

- **Personality:** a cosy Douala coffee house that puts Cameroonian coffee first —
  **warm · elegant · rooted**.
- **Color:** Espresso `#5C3A21` primary on warm Cream `#F5EDE1` paper, roasted-bean
  `#2E1E14` for type and dark bands, a single Caramel `#C08A3E` accent. Sections
  alternate cream → white → roasted-bean.
- **Type:** **Fraunces** (elegant optical serif, sentence case) for display,
  **Manrope** for body/UI, uppercase-tracked Manrope for labels/data.
- **Signature:** warm **alternating bands** + the **caramel bean-dot eyebrow** that
  introduces every section; boldness is spent on photography and the serif headline.

---

## Getting started (Next.js + Tailwind v4)

1. **Load the fonts** with `next/font/google` (Fraunces + Manrope) in `app/layout.tsx`
   — see [components.md → Setup](./components.md#setup).
2. **Wire the theme** in `app/globals.css`:
   ```css
   @import "tailwindcss";
   @import "../docs/design/tokens/theme.css";
   ```
   (Adjust the relative path to wherever `docs/` sits from your CSS file. Consider
   copying `theme.css` into the app's `styles/` and treating this repo copy as the
   canonical source it's generated from.)
3. **Build components** from [`components.md`](./components.md), using semantic
   utilities (`bg-primary`, `text-heading`, `rounded-pill`, `shadow-md`) rather than
   raw ramp steps.
4. For **dynamic / runtime** values, read the CSS variables from
   [`tokens/tokens.css`](./tokens/tokens.css).

---

## Token layering (important)

Tokens are in two layers — **always consume the semantic layer** in product code:

```
reference  →  espresso-600, cream-200, caramel-500 …  (raw palette, don't use directly)
semantic   →  primary, background, heading, accent …   (roles — use THESE)
```

A rebrand then touches only the semantic block; component code never changes.

---

## Conventions this system assumes

- A `cn()` helper (`clsx` + `tailwind-merge`) at `lib/cn.ts`.
- Icons from [`lucide-react`](https://lucide.dev) (geometry matches Manrope).
- Server components by default; `"use client"` only where noted.

## Accessibility floor (non-negotiable)

AA contrast · visible 2px caramel focus ring (never removed) · ≥44px targets ·
real semantics · reduced-motion respected · works at 320px & 200% zoom. Full detail
in [style-guide §9](./style-guide.md#9-accessibility-floor-non-negotiable).

---

## A note on the references & this re-skin

The original comps in [`references/`](./references/) used Starbucks branding as a
placeholder (green/cream, condensed poster type). This system deliberately **does not**
reproduce any Starbucks trademark. It was then **re-skinned** to Petrus Coffee's own
brief — a cosy Douala café with an **earthy coffee/wood** palette and an elegant
**Fraunces** serif — so the current tokens intentionally diverge from those green comps.
Swap in Petrus' own logo and photography as they become available.
