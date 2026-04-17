"use client";

import { useState, useRef, useEffect, useTransition, useCallback } from "react";
import { createPortal } from "react-dom";
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
  const tLang = useTranslations("lang");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
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

    const nextPath = buildLocalePath(code);
    router.prefetch(nextPath);
    startTransition(() => {
      router.replace(nextPath, { scroll: false });
    });
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
    <>
      {isPending && typeof document !== "undefined" &&
        createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(8,6,20,0.55)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "3px solid rgba(252,0,42,0.18)",
                borderTopColor: "#FC002A",
              }}
            />
          </motion.div>,
          document.body,
        )}
    <div ref={ref} className="relative z-9001">
      {/* Trigger: globe icon only */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="lang-globe-btn flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
        disabled={isPending}
        style={{
          background: open ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)",
          border: open ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.09)",
          color: open ? "rgba(230,226,255,0.92)" : "rgba(200,196,240,0.55)",
          opacity: isPending ? 0.6 : 1,
        }}
        whileHover={{
          scale: 1.05,
          background: "rgba(255,255,255,0.1)",
          borderColor: "rgba(255,255,255,0.18)",
        }}
        whileTap={{ scale: 0.94 }}
        aria-label="Switch language"
        aria-expanded={open}
      >
        <Globe size={15} />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full mt-2 inset-e-0 min-w-32.5 rounded-xl overflow-hidden shadow-2xl"
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
                  disabled={isPending}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors duration-150"
                  style={{
                    color: lang.code === locale ? "#FC002A" : "var(--text-secondary)",
                    background: lang.code === locale ? "rgba(252,0,42,0.08)" : "transparent",
                    direction: "ltr", // dropdown always LTR for readability
                  }}
                  onMouseEnter={(e) => {
                    if (lang.code !== locale) {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (lang.code !== locale) {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    }
                  }}
                >
                  <span>{tLang(lang.code as Parameters<typeof tLang>[0])}</span>
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
    </>
  );
}
