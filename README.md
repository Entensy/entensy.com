# ENTENSY — Official Company Website

> **Built solely by [Andra](https://github.com/andra7).**

The official website for **ENTENSY** — a software development and tech consulting company. A fully animated, multilingual, dark/light-mode, RTL-aware marketing site built with Next.js 16, React 19, and Tailwind CSS v4.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12, GSAP 3 (SplitText, ScrollTrigger) |
| 3D | Three.js + React Three Fiber |
| i18n | next-intl 4 |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Carousel | Embla Carousel |
| Particles | tsParticles Slim |
| Package Manager | pnpm |

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
RESEND_API_KEY=re_your_api_key
```

Get your API key from the [Resend dashboard](https://resend.com/api-keys). Verify the `entensy.com` domain in Resend before going live so emails can be sent from `contact@entensy.com`.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (minimal pass-through)
│   ├── globals.css                 # Tailwind theme, CSS variables, keyframes
│   ├── not-found.tsx               # Global 404 page
│   └── [locale]/
│       ├── layout.tsx              # Locale layout — fonts, providers, metadata
│       ├── page.tsx                # Main page (assembles all sections)
│       └── not-found.tsx           # Locale-scoped 404 page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Top navigation bar
│   │   ├── Footer.tsx              # Site footer
│   │   ├── LoadingScreen.tsx       # Animated intro loading screen
│   │   ├── Providers.tsx           # Client-side provider wrapper
│   │   └── ThemeContext.tsx        # Dark/light theme context + ripple transition
│   │
│   ├── sections/
│   │   ├── HomeSection.tsx         # Hero / landing section
│   │   ├── ServicesSection.tsx     # 10 services cards
│   │   ├── SolutionsSection.tsx    # 13 solution cards (bento grid)
│   │   ├── StacksSection.tsx       # Tech stack tabs + grid
│   │   ├── PortfolioSection.tsx    # Project carousel
│   │   ├── AboutSection.tsx        # Company identity, stats, pillars
│   │   ├── SocialsSection.tsx      # Social platform tiles
│   │   └── ContactSection.tsx      # Contact form + info cards
│   │
│   └── ui/
│       ├── AnimatedButton.tsx      # Button — primary/secondary/ghost/outline
│       ├── SectionHeading.tsx      # GSAP-animated badge + title + subtitle
│       ├── TiltCard.tsx            # 3D tilt wrapper
│       ├── GlassCard.tsx           # Glassmorphism card wrapper
│       ├── LanguageSwitcher.tsx    # Language dropdown (EN / KU / AR)
│       ├── ThemeToggle.tsx         # Dark/light toggle button
│       ├── GlobeBackground.tsx     # Three.js wireframe globe
│       └── ParticleBackground.tsx  # tsParticles animated background
│
├── hooks/
│   ├── useCardBorder.ts            # GSAP border spotlight + cursor glow
│   └── useMousePosition.ts         # Normalized mouse position
│
├── i18n/
│   ├── routing.ts                  # Locale list and default locale
│   ├── request.ts                  # next-intl server config
│   └── messages/
│       ├── en.json                 # English translations
│       ├── ar.json                 # Arabic translations (RTL)
│       └── ckb.json                # Kurdish Sorani translations (RTL)
│
└── lib/
    ├── animations.ts               # Shared Framer Motion variants
    ├── utils.ts                    # cn(), clamp(), lerp(), mapRange()
    ├── card-border.ts              # Card border effect helpers
    ├── services-data.ts            # Services content data
    ├── solutions-data.ts           # Solutions content data
    ├── stacks-data.ts              # Technology stacks data
    └── portfolio-data.ts           # Portfolio projects data
```

---

## Content Editing Guide

### Add or Edit a Portfolio Project

**File:** [`src/lib/portfolio-data.ts`](src/lib/portfolio-data.ts)

Add a new object to the `portfolioProjects` array:

```ts
{
  id: "my-new-project",
  titleKey: "projects.my_project.title",    // points to a translation key
  descKey:  "projects.my_project.desc",     // points to a translation key
  image: "/images/projects/my-project.png", // optional — place file in public/images/projects/
  gradient: "from-[#FC002A]/20 to-[#7C3AED]/20", // gradient shown when no image
  stacks: ["React", "Node.js", "PostgreSQL"],
  visitUrl: "https://example.com",           // optional — omit to show a disabled button
  githubUrl: "https://github.com/...",       // optional
},
```

Then add the matching translation strings in **all three** language files under `portfolio.projects`:

```json
"projects": {
  "my_project": {
    "title": "My New Project",
    "desc":  "Short description of what this project does."
  }
}
```

**Image naming:** drop the image into `public/images/projects/` and reference it as `/images/projects/my-project.png`. If `image` is omitted the card shows the gradient fallback.

---

### Add or Edit a Service

**File:** [`src/lib/services-data.ts`](src/lib/services-data.ts)

Each service entry uses a Lucide icon name, an accent color, and translation keys:

```ts
{
  id: "my-service",
  icon: "Code2",               // Lucide icon — must also be in iconMap inside ServicesSection.tsx
  color: "#F43F5E",
  gradientFrom: "#F43F5E",
  gradientTo: "#C9A84C",
  size: "normal",              // "normal" | "large" (large cards span 2 columns)
  titleKey: "services.items.my_service.title",
  descKey:  "services.items.my_service.desc",
}
```

---

### Add or Edit a Solution

**File:** [`src/lib/solutions-data.ts`](src/lib/solutions-data.ts)

Same structure as services but uses `react-icons/fi` icon names. The `id` must also appear in `solutionTagMap` inside `SolutionsSection.tsx` to display a tag pill on the card.

---

### Edit Translations / Add a Language

**Translation files:** [`src/i18n/messages/`](src/i18n/messages/)

| File | Language | Direction |
|---|---|---|
| `en.json` | English | LTR |
| `ckb.json` | Kurdish Sorani | RTL |
| `ar.json` | Arabic | RTL |

Every key used in the UI must exist in **all three files**. The top-level namespaces are:

| Namespace | Covers |
|---|---|
| `nav` | Navbar links, brand name, CTA label |
| `home` | Hero section |
| `services` | Services section |
| `solutions` | Solutions section |
| `stacks` | Technology stacks section |
| `portfolio` | Portfolio section and project cards |
| `about` | About section (stats, pillars, capabilities) |
| `contact` | Contact form, info cards, CTA card |
| `footer` | Footer tagline and copyright |
| `socials` | Socials section |
| `loading` | Loading screen tagline |
| `notFound` | 404 page |
| `lang` | Language switcher labels |
| `meta` | Browser tab title, description, OG tags |

**To add a new language:**

1. Create `src/i18n/messages/xx.json` with all keys copied from `en.json`
2. Add `"xx"` to the `locales` array in [`src/i18n/routing.ts`](src/i18n/routing.ts)
3. Add `"xx": "Label"` under `lang` in all three existing message files
4. Add `{ code: "xx", dir: "ltr" }` (or `"rtl"`) to the `languages` array in [`src/components/ui/LanguageSwitcher.tsx`](src/components/ui/LanguageSwitcher.tsx)

---

### Edit the Navbar

**Primary file:** [`src/components/layout/Navbar.tsx`](src/components/layout/Navbar.tsx)

| What to change | Where |
|---|---|
| Navigation links and their anchor IDs | `const navLinks` array at the top of the file |
| Brand name text | `nav.brand` key in message files |
| Scroll floating animation (size, radius, padding) | `animate={{...}}` on the `<motion.nav>` element |
| Desktop breakpoint (when hamburger appears) | `desktopLinksClass` / `hamburgerHideClass` variables |
| "Get Started" button label | `nav.get_started` in message files |

Related files pulled into the navbar:

| File | Purpose |
|---|---|
| [`src/components/ui/LanguageSwitcher.tsx`](src/components/ui/LanguageSwitcher.tsx) | Language dropdown |
| [`src/components/ui/ThemeToggle.tsx`](src/components/ui/ThemeToggle.tsx) | Dark/light toggle |

---

### Edit the Footer

**File:** [`src/components/layout/Footer.tsx`](src/components/layout/Footer.tsx)

| What | Where |
|---|---|
| Footer nav links | `navLinks` array inside the file |
| Tagline | `footer.tagline` in message files |
| Copyright text | `footer.rights` in message files |
| Brand name | `nav.brand` in message files |

---

### Edit Brand Colors

**File:** [`src/app/globals.css`](src/app/globals.css) — `@theme` block at the top

```css
@theme {
  --color-brand: #FC002A;   /* primary red  — use as text-brand, bg-brand, border-brand */
  --color-gold:  #C9A84C;   /* gold accent  — use as text-gold, bg-gold, border-gold   */
}
```

---

## Internationalization & RTL Support

The site fully supports **right-to-left** layouts for Arabic (`ar`) and Kurdish Sorani (`ckb`). RTL is applied via `dir="rtl"` on each section element. Conventions used throughout the codebase:

- Diagonal card corner accents mirror to the opposite corner in RTL
- Arrow icons use the `.rtl-arrow` CSS class (flips via `transform: scaleX(-1)`)
- Phone numbers use `.force-ltr` to prevent digit reversal in RTL context
- Tag pills use `dir="ltr"` to keep Latin labels readable
- Letter-spacing and `text-transform: uppercase` are suppressed for Arabic/Kurdish text via `[dir="rtl"]` CSS rules

---

## Sections Overview

| Section | Component | Content source |
|---|---|---|
| Hero | `HomeSection.tsx` | Translation files |
| Services | `ServicesSection.tsx` | `lib/services-data.ts` + translations |
| Solutions | `SolutionsSection.tsx` | `lib/solutions-data.ts` + translations |
| Tech Stacks | `StacksSection.tsx` | `lib/stacks-data.ts` + translations |
| Portfolio | `PortfolioSection.tsx` | `lib/portfolio-data.ts` + translations |
| About | `AboutSection.tsx` | Translation files |
| Socials | `SocialsSection.tsx` | Hardcoded links inside the component |
| Contact | `ContactSection.tsx` | Translation files + Resend |

---

## Brand Reference

| Token | Value |
|---|---|
| Primary red | `#FC002A` |
| Gold accent | `#C9A84C` |
| Dark background | `#0D0A1E` |
| Dark surface | `#110C2A` |
| Font | Montserrat (300–900) |
| Card border radius | `1rem` – `1.5rem` |
| Glass card (dark) | `rgba(255,255,255,0.03)` + `backdrop-blur(16px)` |
| Glass card (light) | `rgba(255,255,255,0.65)` + `backdrop-blur(16px)` |

---

## Deployment

The site targets **Vercel**. Push to `main` and Vercel auto-deploys.

Before deploying:
1. Add `RESEND_API_KEY` in the Vercel dashboard under **Settings → Environment Variables**
2. Run `pnpm build` locally to confirm no TypeScript or build errors

---

*Built solely by **Andra**.*
