"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { cn } from "@/lib/utils";

// Square 14×14 viewBox — left endpoints swing, right endpoints stay put.
// Top line left swings down  → "/" = (2,12)→(12,2)
// Bottom line left swings up → "\" = (2,2)→(12,12)   crossing at center (7,7).
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  const t = { duration: 0.35, ease: [0.22, 1, 0.36, 1] } as const;
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <motion.line stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        initial={{ x1: 1, y1: 2,  x2: 13, y2: 2  }}
        animate={isOpen ? { x1: 2, y1: 12, x2: 12, y2: 2  } : { x1: 1, y1: 2,  x2: 13, y2: 2  }} transition={t} />
      <motion.line stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        initial={{ opacity: 1, x1: 1, y1: 7, x2: 13, y2: 7 }}
        animate={isOpen ? { opacity: 0, x1: 7, y1: 7, x2: 7, y2: 7 } : { opacity: 1, x1: 1, y1: 7, x2: 13, y2: 7 }} transition={{ duration: 0.2 }} />
      <motion.line stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        initial={{ x1: 1, y1: 12, x2: 13, y2: 12 }}
        animate={isOpen ? { x1: 2, y1: 2,  x2: 12, y2: 12 } : { x1: 1, y1: 12, x2: 13, y2: 12 }} transition={t} />
    </svg>
  );
}

const navLinks = [
  { key: "home", href: "#home" },
  { key: "services", href: "#services" },
  { key: "solutions", href: "#solutions" },
  { key: "stacks", href: "#stacks" },
  { key: "portfolio", href: "#portfolio" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
];

const TRANSITION = { type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] } as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [linksOverflow, setLinksOverflow] = useState(false);
  const overflowRef = useRef(false);
  const navRef = useRef<HTMLDivElement>(null);
  const linksListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 1);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = linksListRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const check = () => {
      clearTimeout(timer);
      // 150ms debounce: spring animations fire resize events continuously for ~500ms,
      // so this only runs once the nav has settled — prevents mid-animation state flips
      // that cause secondary layout shifts (e.g. language button jumping).
      timer = setTimeout(() => {
        const children = Array.from(el.children);
        const T = children.reduce((sum, c) => sum + (c as HTMLElement).offsetWidth, 0)
          + (children.length - 1) * 8; // include gap-2

        // Normalize: if hamburger is visible it took 46px from the ul — add it back
        const normalized = el.clientWidth + (overflowRef.current ? 46 : 0);
        const newOverflow = T > normalized;

        if (newOverflow !== overflowRef.current) { overflowRef.current = newOverflow; setLinksOverflow(newOverflow); }
      }, 150);
    };
    const obs = new ResizeObserver(check);
    obs.observe(el);
    return () => { obs.disconnect(); clearTimeout(timer); };
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMobileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={navRef} dir={isRtlLocale ? "rtl" : "ltr"}>
      <header className="fixed inset-x-0 top-0 z-8001 pointer-events-none">
        {/* Outer spring-animated wrapper — drives the floating gap */}
        <motion.div
          className="pointer-events-auto flex justify-center"
          animate={{
            paddingTop: scrolled ? "1.25rem" : "0rem",
            paddingLeft: scrolled ? "1.5rem" : "0rem",
            paddingRight: scrolled ? "1.5rem" : "0rem",
          }}
          transition={TRANSITION}
        >
          {/* Inner nav */}
          <motion.nav
            className="navbar-pill-bg w-full mx-auto relative"
            style={{ minWidth: 0 }}
            onClick={() => mobileOpen && setTimeout(() => setMobileOpen(false), 120)}
            initial={{ maxWidth: 1280, borderRadius: 14, paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
            animate={{
              maxWidth: scrolled ? (isRtlLocale ? 1260 : 1160) : 1280,
              paddingTop: scrolled ? "0.65rem" : "1rem",
              paddingBottom: scrolled ? "0.65rem" : "1rem",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
              borderRadius: scrolled ? 9999 : 14,
            }}
            transition={TRANSITION}
          >
            {/* Glass layer — all visual props here, faded as one via Framer Motion opacity */}
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                borderRadius: "inherit",
                background: "var(--nav-glass-bg)",
                boxShadow: "var(--nav-glass-shadow)",
                backdropFilter: "blur(12px) saturate(120%)",
                WebkitBackdropFilter: "blur(12px) saturate(120%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: scrolled ? 1 : 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Content — above glass layer */}
            <div className="relative z-10 flex items-center justify-between gap-4 w-full min-w-0">

              {/* Logo */}
              <motion.a
                href="#home"
                onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
                className="flex items-center gap-2 shrink-0 group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
              >
                <Image
                  src="/images/logo.png"
                  alt="ENTENSY"
                  width={120}
                  height={36}
                  className="h-5 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <span
                  className="navbar-brand-name text-sm font-black select-none max-[360px]:hidden"
                  style={{ letterSpacing: "0.18em" }}
                >
                  {t("brand")}
                </span>
              </motion.a>

              {/* Desktop Links — hidden when ResizeObserver detects overflow */}
              <ul
                ref={linksListRef}
                className={cn(
                  "flex flex-1 min-w-0 justify-center items-center gap-2 flex-nowrap",
                  linksOverflow ? "invisible pointer-events-none w-0 overflow-hidden" : "visible"
                )}
              >
                {navLinks.map((link) => (
                  <li key={link.key}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={cn(
                        "navbar-link-text relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors duration-200 whitespace-nowrap hover:text-brand",
                        activeSection === link.href.replace("#", "")
                          ? "text-brand"
                          : "text-(--text-muted)"
                      )}
                    >
                      {t(link.key as Parameters<typeof t>[0])}
                      {activeSection === link.href.replace("#", "") && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-0 rounded-full bg-brand/10"
                          transition={TRANSITION}
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Right side — always LTR so buttons never flip outside the nav in RTL pages */}
              <div className="flex items-center gap-2.5 shrink-0" dir="ltr">
                {isRtlLocale && linksOverflow && (
                  <button
                    className={cn("navbar-icon-btn w-9 h-9 flex items-center justify-center rounded-full", mobileOpen && "navbar-icon-btn--open")}
                    onClick={(e) => { e.stopPropagation(); setMobileOpen((v) => !v); }}
                    aria-label="Toggle mobile menu"
                  >
                    <HamburgerIcon isOpen={mobileOpen} />
                  </button>
                )}

                {isRtlLocale && <LanguageSwitcher />}

                <motion.button
                  onClick={() => handleNavClick("#contact")}
                  className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white whitespace-nowrap"
                  style={{ background: "#FC002A", boxShadow: "0 0 18px rgba(252,0,42,0.22)" }}
                  whileHover={{ scale: 1.03, y: -1, background: "#D4001F", boxShadow: "0 0 24px rgba(252,0,42,0.38)" }}
                  whileTap={{ scale: 0.97, y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {t("get_started")}
                </motion.button>

                {!isRtlLocale && <LanguageSwitcher />}

                {!isRtlLocale && linksOverflow && (
                  <button
                    className={cn("navbar-icon-btn w-9 h-9 flex items-center justify-center rounded-full", mobileOpen && "navbar-icon-btn--open")}
                    onClick={(e) => { e.stopPropagation(); setMobileOpen((v) => !v); }}
                    aria-label="Toggle mobile menu"
                  >
                    <HamburgerIcon isOpen={mobileOpen} />
                  </button>
                )}
              </div>

            </div>
          </motion.nav>
        </motion.div>
      </header>

      {/* Mobile dropdown */}
      <motion.div
        className="fixed z-8002 pointer-events-none"
        animate={{
          top: scrolled ? "5.3rem" : "4.75rem",
          left: scrolled ? "1.5rem" : "0.75rem",
          right: scrolled ? "1.5rem" : "0.75rem",
        }}
        transition={TRANSITION}
      >
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto"
              style={{
                background: "color-mix(in srgb, var(--bg-primary) 94%, transparent)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid var(--glass-border)",
                borderRadius: "1.25rem",
                boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
              }}
            >
              <div className="flex flex-col gap-1 p-4">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.key}
                    initial={{ opacity: 0, x: isRtlLocale ? 16 : -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl text-sm font-semibold transition-colors duration-150 text-center",
                      activeSection === link.href.replace("#", "")
                        ? "text-brand bg-brand/08"
                        : "hover:text-brand"
                    )}
                    style={{
                      color: activeSection === link.href.replace("#", "")
                        ? "#FC002A"
                        : "var(--text-secondary)",
                    }}
                  >
                    {t(link.key as Parameters<typeof t>[0])}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.04 + 0.08 }}
                  onClick={() => handleNavClick("#contact")}
                  className="mt-2 w-full px-4 py-2.5 rounded-full text-white text-sm font-semibold text-center"
                  style={{ background: "#FC002A" }}
                >
                  {t("get_started")}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
