# AGENTS.md — ENTENSY Website

> Project built solely by **Andra**. All decisions here reflect his intentions.

---

## Critical: Read Before Writing Any Code

### Next.js version
This project uses **Next.js 16.2** with the **App Router**. This version has breaking changes from Next.js 13/14/15:
- `generateMetadata` must be `async` and receive `params` as a `Promise<{ locale: string }>`
- `export const metadata` is static and **cannot** be used in locale layouts (no access to `params`)
- `params` in layouts and pages must be awaited: `const { locale } = await params`
- Server components use `getTranslations`, client components use `useTranslations`
- Do NOT use `next/headers` patterns from older versions

### React version
This project uses **React 19**. Key differences:
- `useState` setters in `useEffect` must be deferred if called synchronously on mount
- Variable reassignment inside JSX (including inside IIFEs) triggers a lint error
- Use `Promise.resolve().then(...)` to defer synchronous state updates in effects

### Tailwind version
This project uses **Tailwind CSS v4**. Key differences from v3:
- `bg-gradient-to-r` → `bg-linear-to-r`
- `flex-shrink-0` → `shrink-0`
- `end-0` → `inset-e-0`
- Arbitrary brackets for known scale values are wrong: use `w-175` not `w-[700px]`
- CSS variables: `text-(--my-var)` not `text-[var(--my-var)]`
- Custom color tokens defined in `@theme` in `globals.css` — use `text-brand`, `bg-brand`, `text-gold`, `bg-gold`

---

## Project Overview

**ENTENSY** is a software development and tech consulting company website. Single-page marketing site with 8 sections, multilingual (English, Arabic, Kurdish), and full RTL layout support.

- **Framework:** Next.js 16.2 App Router
- **Language:** TypeScript 5
- **Package manager:** pnpm (never use npm or yarn)
- **Styling:** Tailwind CSS v4 + CSS custom properties
- **Animation:** Framer Motion 12, GSAP 3 with SplitText and ScrollTrigger
- **i18n:** next-intl 4 — locales: `en`, `ar`, `ckb`
- **Theme:** Dark/light with CSS variables, toggled by class on `<html>`

---

## File Structure (What Lives Where)

```
src/
├── app/
│   ├── layout.tsx                  Root layout — minimal, no locale awareness
│   ├── globals.css                 ALL global CSS, @theme tokens, keyframes, utilities
│   ├── not-found.tsx               Global 404 (no locale context, no useTranslations)
│   └── [locale]/
│       ├── layout.tsx              Locale layout — providers, generateMetadata, fonts
│       ├── page.tsx                Single page — imports and stacks all sections
│       └── not-found.tsx           404 within a locale route
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              Navigation bar
│   │   ├── Footer.tsx              Footer
│   │   ├── LoadingScreen.tsx       Intro animation (session-gated)
│   │   ├── Providers.tsx           Client provider wrapper
│   │   └── ThemeContext.tsx        Dark/light theme context
│   │
│   ├── sections/                   One file per page section
│   │   ├── HomeSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── SolutionsSection.tsx
│   │   ├── StacksSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── SocialsSection.tsx
│   │
│   └── ui/                         Reusable UI primitives
│       ├── AnimatedButton.tsx      Button component (primary/secondary/ghost/outline)
│       ├── SectionHeading.tsx      Badge + GSAP-animated title + subtitle
│       ├── TiltCard.tsx            3D tilt wrapper
│       ├── GlassCard.tsx           Glassmorphism wrapper
│       ├── LanguageSwitcher.tsx    Language dropdown in navbar
│       ├── ThemeToggle.tsx         Dark/light button (fixed bottom-right)
│       ├── GlobeBackground.tsx     Three.js wireframe globe
│       └── ParticleBackground.tsx  tsParticles background
│
├── hooks/
│   ├── useCardBorder.ts            GSAP border spotlight + cursor glow per card
│   └── useMousePosition.ts         Normalized mouse {x, y} 0–1
│
├── i18n/
│   ├── routing.ts                  Locale list — add new locales here
│   ├── request.ts                  next-intl server config
│   └── messages/
│       ├── en.json                 English (LTR)
│       ├── ar.json                 Arabic (RTL)
│       └── ckb.json                Kurdish Sorani (RTL)
│
└── lib/
    ├── animations.ts               Shared Framer Motion variants
    ├── utils.ts                    cn(), clamp(), lerp(), mapRange()
    ├── card-border.ts              Card border helpers
    ├── icon-registry.ts            Explicit icon imports + devicon SVGs (used by Stacks/Portfolio)
    ├── services-data.ts            Services content (10 items)
    ├── solutions-data.ts           Solutions content (13 items)
    ├── stacks-data.ts              Tech stacks content (39 items, 7 categories)
    └── portfolio-data.ts           Portfolio projects (7 items)
```

---

## Hard Rules

### Never break these
1. **Every translation key must exist in all three message files** — `en.json`, `ar.json`, `ckb.json`. Missing keys crash the build.
2. **Never use `export const metadata` in `[locale]/layout.tsx`** — use `export async function generateMetadata({ params })` instead.
3. **Never install npm packages with `npm` or `yarn`** — use `pnpm add`.
4. **Never mutate a `let` variable inside JSX or inside a render-time function** — React 19 flags this. Compute at module level using `reduce` or `map`.
5. **Never use CSS `preserve-3d`** on card wrappers — it breaks pointer events on interactive children (buttons, links). The `TiltCard` component intentionally uses flat stacking context.
6. **Never use semi-transparent colors for heading text in RTL** — Arabic letter joints overlap and the alpha multiplication darkens the connection points. Use fully opaque colors for `.heading-glass`.

### Code style
- No comments explaining what code does — only add a comment when the WHY is non-obvious
- No unused imports, dead code, or backwards-compat shims
- No defensive error handling for cases that can't happen
- No extra abstractions beyond what the task requires
- Keep section data in `src/lib/*-data.ts`, never inline content arrays in components

---

## RTL Implementation

RTL is applied per-section via `dir="rtl"` on the section's root element, not globally on `<html>` at layout time (the locale layout doesn't set dir — each section handles itself).

### RTL detection
```tsx
const locale = useLocale();
const isRtlLocale = locale === "ar" || locale === "ckb";
// then: dir={isRtlLocale ? "rtl" : "ltr"}
```

### Key RTL patterns

| Pattern | LTR | RTL |
|---|---|---|
| Card corner accent position | `left-0 rounded-tl-2xl` | `right-0 rounded-tr-2xl` |
| Card corner gradient direction | `135deg` | `225deg` |
| Card corner clipPath | `polygon(0 0, 100% 0, 0 100%)` | `polygon(0 0, 100% 0, 100% 100%)` |
| Arrow icons | normal | `className="rtl-arrow"` (scaleX(-1)) |
| Phone numbers / numeric values | normal | `dir="ltr"` + `.force-ltr` class |
| Tag pills (Latin text) | normal | `dir="ltr"` |
| Flex row direction | default | `flex-row-reverse` or `rtl:` variant |
| Text alignment | `text-start` | inherits from `dir="rtl"` |

### CSS helpers in globals.css
```css
.force-ltr  { direction: ltr; unicode-bidi: isolate; }
.rtl-arrow  { /* scaleX(-1) applied via [dir="rtl"] .rtl-arrow selector */ }
```

---

## Theming System

Theme is a `dark` class on `<html>`, managed by `ThemeContext`. All colors are CSS custom properties.

### Available CSS variables
```
--bg-primary, --bg-secondary
--text-primary, --text-secondary, --text-muted
--border-color
--glass-bg, --glass-border
```

### Adding a theme-aware style
```tsx
// ✅ correct
style={{ background: "var(--bg-primary)", color: "var(--text-secondary)" }}

// ❌ wrong — hardcoded, breaks light mode
style={{ background: "#0D0A1E", color: "rgba(200,196,240,0.7)" }}
```

Light mode overrides go in `globals.css` under `:root:not(.dark)`:
```css
:root:not(.dark) .my-element {
  --text-muted: rgba(13,10,30,0.62);
}
```

---

## Animation Patterns

### Framer Motion
Import shared variants from `src/lib/animations.ts`:
```tsx
import { staggerContainerVariant, cardEntranceVariant, fadeUpVariant, viewportOnce } from "@/lib/animations";

// stagger parent
<motion.div variants={staggerContainerVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>
  // stagger children with custom delay
  <motion.div variants={cardEntranceVariant} custom={index}>...</motion.div>
</motion.div>
```

### GSAP
- `useGSAP` from `@gsap/react` for component-scoped animations (auto-cleans on unmount)
- Register plugins once per file: `gsap.registerPlugin(ScrollTrigger, SplitText)`
- Use `{ scope: containerRef }` to scope selectors to a component subtree

### Card border orbit
```tsx
const shellRef = useRef<HTMLDivElement>(null);
const { handleBorderMouseMove, handleBorderMouseLeave } = useCardBorder(
  shellRef as React.RefObject<HTMLElement | null>
);
// on the shell div:
onMouseMove={handleBorderMouseMove}
onMouseLeave={handleBorderMouseLeave}
```
The hook normalizes orbit speed so all card sizes animate at ~60 px/s regardless of dimensions.

---

## Adding Content

### New portfolio project
1. Add entry to `src/lib/portfolio-data.ts`
2. Add `portfolio.projects.my_key.title` and `.desc` to all three message files
3. Drop project image in `public/images/projects/` (optional — gradient is used if omitted)

### New service
1. Add entry to `src/lib/services-data.ts` (icon must be a Lucide icon name)
2. Add the icon to `iconMap` in `ServicesSection.tsx`
3. Add `services.items.my_key.title` and `.desc` to all three message files

### New solution
1. Add entry to `src/lib/solutions-data.ts` (icon must be a `react-icons/fi` name)
2. Add to `iconMap` in `SolutionsSection.tsx`
3. Add id → tag mapping in `solutionTagMap` in `SolutionsSection.tsx`
4. Add `solutions.items.my_key.title` and `.desc` to all three message files

### New tech stack icon
1. If the icon exists in `react-icons/si` or `react-icons/fa`, import it in `src/lib/icon-registry.ts` and add to the registry object
2. If the icon is missing or wrong, use devicon: extract the SVG body from `node_modules/@iconify-json/devicon/icons.json` and create a component with `makeSvg()` in the registry
3. Use the registry key as the `icon` field in `stacks-data.ts`

### New locale
1. `src/i18n/routing.ts` — add locale code to `locales` array
2. `src/i18n/messages/xx.json` — copy `en.json`, translate all values
3. All existing message files — add `"xx": "Label"` under `lang`
4. `src/components/ui/LanguageSwitcher.tsx` — add `{ code: "xx", dir: "ltr" | "rtl" }` to `languages`

---

## Resend Integration

The contact form posts to `POST /api/send` (`src/app/api/send/route.ts`), which uses the Resend SDK server-side.

```
RESEND_API_KEY=re_...    # server-side only — never NEXT_PUBLIC_ prefix
```

- Domain `entensy.com` must be verified in the Resend dashboard before sending
- All mail delivered to `contact@entensy.com`; `replyTo` is the sender's address
- Add `RESEND_API_KEY` to Vercel → Settings → Environment Variables

---

## Brand Tokens

| Token | Hex | Tailwind class |
|---|---|---|
| Brand red | `#FC002A` | `text-brand`, `bg-brand`, `border-brand` |
| Gold | `#C9A84C` | `text-gold`, `bg-gold`, `border-gold` |
| Dark bg | `#0D0A1E` | `var(--bg-primary)` in dark |
| Dark surface | `#110C2A` | `var(--bg-secondary)` in dark |

Defined in `globals.css` `@theme` block — change there to propagate everywhere.
