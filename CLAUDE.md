@AGENTS.md

# CLAUDE.md — ENTENSY Website

> Project built solely by **Andra**. All decisions here reflect his intentions.

---

## Project Identity

- **Product:** ENTENSY company marketing website
- **Stack:** Next.js 16.2 · React 19 · TypeScript 5 · Tailwind CSS v4 · pnpm
- **Locales:** `en` (default), `ar` (RTL), `ckb` Kurdish Sorani (RTL)
- **URL:** https://entensy.com

---

## Commands

```bash
pnpm dev        # development server — http://localhost:3000
pnpm build      # production build (run this before committing to catch type errors)
pnpm start      # production server
pnpm lint       # ESLint
```

---

## Architecture Overview

### Routing
- **next-intl** handles all locale routing via `src/middleware.ts` + `src/i18n/routing.ts`
- All pages live under `src/app/[locale]/` — never create pages outside this directory
- The root `src/app/layout.tsx` is a minimal pass-through. Real layout is in `src/app/[locale]/layout.tsx`
- `generateMetadata` in `[locale]/layout.tsx` is async and uses `getTranslations` for locale-aware tab titles

### Page Assembly
- `src/app/[locale]/page.tsx` is the single page — it stacks all sections vertically
- Section order: Home → Services → Solutions → Stacks → Portfolio → About → Contact → Socials
- LoadingScreen shows on first visit only (session-gated via `sessionStorage`)

### Theming
- `ThemeContext.tsx` manages dark/light with a ripple/clip-path transition animation
- CSS custom properties (not Tailwind's `dark:` prefix) handle all theme colors
- Light mode overrides live in `globals.css` under `:root:not(.dark)` selectors
- Never hardcode `#0D0A1E` or white — always use `var(--bg-primary)`, `var(--text-primary)`, etc.

### Styling Rules
- **Tailwind v4** — use canonical classes: `shrink-0` not `flex-shrink-0`, `bg-linear-to-r` not `bg-gradient-to-r`
- Brand colors as Tailwind utilities: `text-brand` (`#FC002A`), `text-gold` (`#C9A84C`) — defined in `@theme` in `globals.css`
- CSS variable shorthand: `text-(--text-secondary)` not `text-[var(--text-secondary)]`
- Numeric z-index without brackets: `z-8000` not `z-[8000]`
- Arbitrary pixel sizes use Tailwind scale: `w-175` not `w-[700px]`, `h-62` not `h-[248px]`

---

## Internationalization (i18n)

### How it works
- `useTranslations("namespace")` in client components
- `getTranslations({ locale, namespace })` in server components / `generateMetadata`
- Every translation key must exist in **all three** files: `en.json`, `ar.json`, `ckb.json`

### Translation file locations
```
src/i18n/messages/en.json    English
src/i18n/messages/ar.json    Arabic (RTL)
src/i18n/messages/ckb.json   Kurdish Sorani (RTL)
```

### Namespace map
| Namespace | Used in |
|---|---|
| `nav` | Navbar, Footer (brand name lives here as `nav.brand`) |
| `home` | HomeSection |
| `services` | ServicesSection |
| `solutions` | SolutionsSection |
| `stacks` | StacksSection |
| `portfolio` | PortfolioSection |
| `about` | AboutSection |
| `contact` | ContactSection |
| `footer` | Footer |
| `socials` | SocialsSection |
| `loading` | LoadingScreen |
| `notFound` | 404 pages |
| `lang` | LanguageSwitcher labels |
| `meta` | generateMetadata (tab title, description, OG) |

### RTL support conventions
- Each section gets `dir={isRtlLocale ? "rtl" : "ltr"}` on its root element
- `isRtlLocale` is always `locale === "ar" || locale === "ckb"`
- `.force-ltr` class (defined in globals.css): `direction: ltr; unicode-bidi: isolate` — use for phone numbers, numeric values, tag pills
- `.rtl-arrow` class: `transform: scaleX(-1)` in RTL — use on directional arrow icons
- Card diagonal accents: `left-0 rounded-tl-2xl` in LTR, `right-0 rounded-tr-2xl` in RTL
- `clipPath` for LTR triangle: `"polygon(0 0, 100% 0, 0 100%)"` — RTL: `"polygon(0 0, 100% 0, 100% 100%)"`
- gradient direction: `135deg` in LTR, `225deg` in RTL
- Letter-spacing and `uppercase` are automatically suppressed for RTL via `[dir="rtl"]` rules in globals.css — do not fight this

---

## Data Files (Content)

All content data is **separated from components** into `src/lib/`:

| File | What it holds | Key fields |
|---|---|---|
| `services-data.ts` | 10 services | `icon` (Lucide name), `color`, `gradientFrom/To`, `titleKey`, `descKey` |
| `solutions-data.ts` | 13 solutions | `icon` (react-icons/fi name), `color`, `size` (`small`/`medium`/`large`), `titleKey`, `descKey` |
| `stacks-data.ts` | 39 tech items in 7 categories | `icon` (key in `icon-registry.ts`), `color`, `level` |
| `icon-registry.ts` | Explicit icon imports + custom devicon SVGs | Used by StacksSection and PortfolioSection |
| `portfolio-data.ts` | 7 portfolio projects | `image?`, `gradient`, `stacks[]`, `visitUrl?`, `githubUrl?`, `titleKey`, `descKey` |

When adding a new item to any of these files, **also add translation keys** to all three `messages/*.json` files.

---

## Component Patterns

### Section structure
Every section follows this pattern:
```tsx
export default function XSection() {
  const t = useTranslations("x");
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";

  return (
    <section id="x" className="section-wrapper relative" dir={isRtlLocale ? "rtl" : "ltr"}>
      <div className="section-inner relative z-10">
        <SectionHeading badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
        {/* content */}
      </div>
    </section>
  );
}
```

### Card border spotlight
- Use `useCardBorder(shellRef)` hook for the orbiting border spotlight effect
- The hook normalizes orbit speed by perimeter (`duration = perim / 60`) so all card sizes animate at the same angular velocity
- The shell div needs `onMouseMove={handleBorderMouseMove}` and `onMouseLeave={handleBorderMouseLeave}`
- Inside the shell: `<div className="card-border-ring" style={{ "--ring-color": color + "65" }} />`
- Cursor glow: `<div className="card-cursor-glow" style={{ "--cursor-color": color + "28" }} />`

### Animation variants
Shared variants live in `src/lib/animations.ts`:
- `staggerContainerVariant` — parent that staggers children
- `cardEntranceVariant` — used with `custom={index}` for delayed card entrance
- `fadeUpVariant` — simple fade + slide up
- `viewportOnce` — `{ once: true, margin: "-50px" }` viewport config

### TiltCard
Wrap any card in `<TiltCard tiltMaxAngle={8}>` for 3D tilt on hover. Uses CSS transform, not `react-parallax-tilt`, to avoid pointer-event issues with preserve-3d stacking contexts.

---

## Known Gotchas & Rules

### Never do these
- **Never** hardcode color hex values as Tailwind arbitrary values when a token exists (`text-brand` not `text-[#FC002A]`)
- **Never** use `export const metadata` in `[locale]/layout.tsx` — it must be `export async function generateMetadata()` to access locale
- **Never** mutate a `let` variable inside JSX (React 19 strict render rule) — move computations to module level or component body before `return`
- **Never** use `flex-shrink-0`, `bg-gradient-to-r/br`, `end-0` — use `shrink-0`, `bg-linear-to-r/br`, `inset-e-0`
- **Never** add `// comments` explaining what the code does — only add comments for non-obvious WHY
- **Never** add error handling for impossible cases — trust the type system
- **Never** create a new file when the change belongs in an existing one

### Always do these
- Run `pnpm build` after non-trivial changes — catches TypeScript errors that dev server misses
- When adding a translation key, add it to **all three** message files immediately
- When adding a tech stack icon, add the import and registry entry to `src/lib/icon-registry.ts`, then use the key in `stacks-data.ts`. For icons missing from react-icons, use a devicon inline SVG via `makeSvg()` in the registry.
- When a card changes size (large vs normal), verify the `lgAlone` / last-row centering logic still works
- Keep data in `src/lib/*-data.ts` files — never inline content arrays inside section components

### React 19 specific
- `useState` setter calls in `useEffect` must be deferred with `Promise.resolve().then(...)` if they happen synchronously on mount (see `page.tsx`)
- Variable reassignment inside render or JSX (even in IIFEs) triggers a lint error — use `reduce` or `map` at module level instead

### next-intl specific
- Client components use `useTranslations` and `useLocale` hooks
- Server components and `generateMetadata` use `getTranslations({ locale, namespace })`
- `getMessages()` is called once in the locale layout and passed to `NextIntlClientProvider`

---

## CSS Architecture

### CSS variables (defined in globals.css)
```
--bg-primary        page background
--bg-secondary      footer, cards (slightly lighter/darker)
--text-primary      headings
--text-secondary    body text
--text-muted        captions, labels
--border-color      card borders
--glass-bg          frosted glass background
--glass-border      frosted glass border
```

### Key utility classes (globals.css)
```
.section-wrapper    full-width section with standard vertical padding
.section-inner      max-width container, centered, horizontal padding
.heading-glass      semi-transparent heading color (opaque to avoid RTL joint darkening)
.force-ltr          direction: ltr; unicode-bidi: isolate
.rtl-arrow          scaleX(-1) in RTL context
.card-border-ring   GSAP-driven spotlight border
.card-cursor-glow   cursor-following radial glow
.bg-drift-y         vertical floating animation
.bg-drift-xy        diagonal floating animation
.bg-scale-pulse     scale breathing animation
```

### Light mode
Light mode overrides use `:root:not(.dark)` selectors, NOT Tailwind's `dark:` prefix. The theme is controlled by a `dark` class on `<html>`, managed by `ThemeContext`.

---

## File Quick-Reference

| Task | File(s) |
|---|---|
| Add a portfolio project | `src/lib/portfolio-data.ts` + all 3 message files |
| Add a service | `src/lib/services-data.ts` + all 3 message files + `iconMap` in `ServicesSection.tsx` |
| Add a solution | `src/lib/solutions-data.ts` + all 3 message files + `solutionTagMap` in `SolutionsSection.tsx` |
| Edit navbar links | `const navLinks` in `Navbar.tsx` |
| Edit brand name | `nav.brand` in all 3 message files |
| Edit tab title / OG | `meta.*` in all 3 message files |
| Edit contact email/phone | `contactInfo` array in `ContactSection.tsx` + `contact.info.*` in message files |
| Add a new locale | `routing.ts` + new `messages/xx.json` + `languages` array in `LanguageSwitcher.tsx` + `lang.xx` in all existing message files |
| Change brand red color | `--color-brand` in `globals.css` `@theme` block |
| Change gold color | `--color-gold` in `globals.css` `@theme` block |
| Change section order | import order in `src/app/[locale]/page.tsx` |
| Edit 404 page (global) | `src/app/not-found.tsx` |
| Edit 404 page (locale) | `src/app/[locale]/not-found.tsx` |
| Edit loading screen | `src/components/layout/LoadingScreen.tsx` |
| Edit animations | `src/lib/animations.ts` |

---

## Commit Style

Group commits by feature, not by file. Examples:
- `feat: add portfolio project card for X`
- `fix: phone number rendering in RTL mode`
- `feat: add French locale`
- `chore: update Resend API key`

Always append:
```
Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
