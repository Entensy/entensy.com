"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { cn } from "@/lib/utils";

const navLinks = [
  { key: "home", href: "#home" },
  { key: "services", href: "#services" },
  { key: "solutions", href: "#solutions" },
  { key: "stacks", href: "#stacks" },
  { key: "portfolio", href: "#portfolio" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
];

const SPRING = { type: "spring", stiffness: 220, damping: 30 } as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [linksOverflow, setLinksOverflow] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const linksListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // RTL text is longer — use xl (1280) breakpoint; LTR uses lg (1024)
  useEffect(() => {
    const bp = isRtlLocale ? 1280 : 1024;
    let rafId: number;
    const check = () => {
      if (window.innerWidth < bp) { setLinksOverflow(false); return; }
      const ul = linksListRef.current;
      if (!ul) return;
      const saved = ul.style.display;
      ul.style.display = "";
      const overflows = ul.scrollWidth > ul.clientWidth + 16;
      ul.style.display = saved;
      setLinksOverflow(overflows);
    };
    const onResize = () => { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(check); };
    window.addEventListener("resize", onResize);
    check();
    return () => { window.removeEventListener("resize", onResize); cancelAnimationFrame(rafId); };
  }, [isRtlLocale]);

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

  // Desktop links breakpoint class — wider for RTL
  const desktopLinksClass = isRtlLocale ? "hidden xl:flex" : "hidden lg:flex";
  const hamburgerHideClass = isRtlLocale ? "xl:hidden" : "lg:hidden";
  return (
    <div ref={navRef} dir={isRtlLocale ? "rtl" : "ltr"}>
      <header className="fixed inset-x-0 top-0 z-8000 pointer-events-none">
        {/* Outer spring-animated wrapper — drives the floating gap */}
        <motion.div
          className="pointer-events-auto flex justify-center"
          animate={{
            paddingTop: scrolled ? "1.25rem" : "0rem",
            paddingLeft: scrolled ? "1rem" : "0rem",
            paddingRight: scrolled ? "1rem" : "0rem",
          }}
          transition={SPRING}
        >
          {/* Inner nav — spring-animates shape, size, shadow */}
          <motion.nav
            className={cn(
              "navbar-pill-bg w-full mx-auto flex items-center justify-between gap-4",
              scrolled ? "navbar-scrolled" : ""
            )}
            initial={{ maxWidth: 1280, borderRadius: 14 }}
            animate={{
              // All padding in one place — avoids style/animate split causing RTL jumps
              maxWidth: scrolled ? (isRtlLocale ? 1260 : 1160) : 1280,
              paddingTop: scrolled ? "0.65rem" : "1rem",
              paddingBottom: scrolled ? "0.65rem" : "1rem",
              paddingLeft: scrolled ? "1.5rem" : "1.25rem",
              paddingRight: scrolled ? "1.5rem" : "1.25rem",
              borderRadius: scrolled ? 9999 : 14,
            }}
            transition={SPRING}
          >
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
                className="navbar-brand-name text-sm font-black select-none"
                style={{ color: "rgba(218, 213, 255, 0.82)", letterSpacing: "0.18em" }}
              >
                {t("brand")}
              </span>
            </motion.a>

            {/* Desktop Links */}
            <ul
              ref={linksListRef}
              className={cn(desktopLinksClass, "items-center gap-2 flex-nowrap")}
              style={{ display: linksOverflow ? "none" : undefined }}
            >
              {navLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "navbar-link-text relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors duration-200 whitespace-nowrap",
                      activeSection === link.href.replace("#", "")
                        ? "text-brand"
                        : "hover:text-[rgba(230,226,255,0.88)]"
                    )}
                    style={{
                      color: activeSection === link.href.replace("#", "")
                        ? "#FC002A"
                        : "rgba(200, 196, 240, 0.62)",
                    }}
                  >
                    {t(link.key as Parameters<typeof t>[0])}
                    {activeSection === link.href.replace("#", "") && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-full bg-brand/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Right side — always LTR so buttons never flip outside the nav in RTL pages */}
            <div className="flex items-center gap-2.5 shrink-0" dir="ltr">
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
              <LanguageSwitcher />

              {/* Hamburger — also shown when desktop links overflow */}
              <motion.button
                className={cn(hamburgerHideClass, "w-9 h-9 flex items-center justify-center rounded-full")}
                style={{
                  display: linksOverflow ? "flex" : undefined,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
                onClick={() => setMobileOpen((v) => !v)}
                whileTap={{ scale: 0.96 }}
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                      <X size={16} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                      <Menu size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.nav>
        </motion.div>
      </header>

      {/* Mobile dropdown */}
      <div
        className="fixed z-7999 pointer-events-none"
        style={{
          top: scrolled ? "calc(1.25rem + 56px + 8px)" : "calc(56px + 8px)",
          left: scrolled ? "50%" : "clamp(0.75rem, 4vw, 2rem)",
          right: scrolled ? "auto" : "clamp(0.75rem, 4vw, 2rem)",
          width: scrolled ? "min(64rem, calc(100vw - 2rem))" : undefined,
          transform: scrolled ? "translateX(-50%)" : undefined,
        }}
      >
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto"
              style={{
                background: "color-mix(in srgb, var(--bg-primary) 94%, transparent)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.09)",
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
                        : "hover:bg-white/05 hover:text-brand"
                    )}
                    style={{
                      color: activeSection === link.href.replace("#", "")
                        ? "#FC002A"
                        : "rgba(200,196,240,0.7)",
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
      </div>
    </div>
  );
}
