"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";

// Order: English → Kurdish → Arabic
const languages = [
  { code: "en", dir: "ltr" },
  { code: "ckb", dir: "rtl" },
  { code: "ar", dir: "rtl" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";
  const tLang = useTranslations("lang");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const buildLocalePath = useCallback((code: string) => {
    const segments = pathname.split("/");
    segments[1] = code;
    const query = searchParams.toString();
    return `${segments.join("/")}${query ? `?${query}` : ""}`;
  }, [pathname, searchParams]);

  const switchLocale = (code: string) => {
    if (code === locale) {
      setOpen(false);
      return;
    }

    // Cover the current page instantly — loading screen (z-9999) takes over once the new component mounts
    const cover = document.createElement("div");
    cover.id = "lang-switch-cover";
    cover.style.cssText = "position:fixed;inset:0;z-index:9998;background:var(--bg-primary);";
    document.body.appendChild(cover);

    window.sessionStorage.setItem("entensy:lang-switching", "1");
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.pointerEvents = "none";

    router.replace(buildLocalePath(code), { scroll: false });
    setOpen(false);
  };

  useEffect(() => {
    languages.forEach((lang) => {
      if (lang.code !== locale) {
        router.prefetch(buildLocalePath(lang.code));
      }
    });
  }, [buildLocalePath, locale, router]);

  // Close on outside click
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
    <div ref={ref} className="relative z-9001">
      {/* Trigger: globe icon only */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`navbar-icon-btn flex items-center justify-center w-9 h-9 rounded-full${open ? " navbar-icon-btn--open" : ""}`}
        aria-label="Switch language"
        aria-expanded={open}
      >
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
            className={`absolute top-full mt-2 min-w-32.5 rounded-xl overflow-hidden shadow-2xl ${isRtlLocale ? "left-0" : "right-0"}`}
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              backdropFilter: "blur(16px)",
            }}
          >
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => switchLocale(lang.code)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors duration-150"
                  style={{
                    color: lang.code === locale ? "#FC002A" : "var(--text-secondary)",
                    background: lang.code === locale ? "rgba(252,0,42,0.08)" : "transparent",
                    direction: "ltr", // dropdown always LTR for readability
                  }}
                  onMouseEnter={(e) => {
                    if (lang.code !== locale) {
                      (e.currentTarget as HTMLButtonElement).style.background = "var(--glass-bg)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (lang.code !== locale) {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    }
                  }}
                >
                  <span style={{ fontFamily: "var(--font-notoSans), system-ui, sans-serif" }}>
                    {tLang(lang.code as Parameters<typeof tLang>[0])}
                  </span>
                  {lang.code === locale && (
                    <span
                      className="w-1.5 h-1.5 rounded-full"
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
