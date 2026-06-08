"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";

// Order: English -> Kurdish -> Arabic
const languages = [
  { code: "en", dir: "ltr" },
  { code: "ckb", dir: "rtl" },
  { code: "ar", dir: "rtl" },
] as const;

// Mirrors the localePrefix.prefixes in src/i18n/routing.ts
const URL_PREFIXES: Record<string, string> = { ckb: "ku" };

export default function LanguageSwitcher() {
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";
  const tLang = useTranslations("lang");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const switchLocale = (code: string) => {
    if (code === locale) {
      setOpen(false);
      return;
    }

    // Cover the current page instantly while the new page loads
    const cover = document.createElement("div");
    cover.id = "lang-switch-cover";
    cover.style.cssText =
      "position:fixed;inset:0;z-index:9998;background:var(--bg-primary);";
    document.body.appendChild(cover);

    // Hard navigation so page.tsx re-mounts fresh and the loading screen
    // runs on every locale switch.
    const segs = window.location.pathname.split("/");
    segs[1] = URL_PREFIXES[code] ?? code;
    window.location.replace(segs.join("/") + window.location.search);
    setOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className='relative z-9001'>
      {/* Trigger: globe icon only */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`navbar-icon-btn flex items-center justify-center w-9 h-9 rounded-full${open ? " navbar-icon-btn--open" : ""}`}
        aria-label='Switch language'
        aria-expanded={open}>
        <Globe size={15} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute top-full mt-4 min-w-36 rounded-xl overflow-hidden shadow-2xl ${isRtlLocale ? "left-0" : "right-0"}`}
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              backdropFilter: "blur(16px)",
            }}>
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => switchLocale(lang.code)}
                  className='w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors duration-150'
                  style={{
                    color:
                      lang.code === locale
                        ? "#FC002A"
                        : "var(--text-secondary)",
                    background:
                      lang.code === locale
                        ? "rgba(252,0,42,0.08)"
                        : "transparent",
                    direction: "ltr", // dropdown always LTR for readability
                  }}
                  onMouseEnter={(e) => {
                    if (lang.code !== locale) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "var(--glass-bg)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (lang.code !== locale) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                    }
                  }}>
                  <span
                    style={{
                      fontFamily: "var(--font-notoSans), system-ui, sans-serif",
                    }}>
                    {tLang(lang.code as Parameters<typeof tLang>[0])}
                  </span>
                  {lang.code === locale && (
                    <span
                      className='w-1.5 h-1.5 rounded-full'
                      style={{ background: "#FC002A" }}
                    />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
