"use client";

import { useRef } from "react";
import { useTheme } from "@/components/layout/ThemeContext";
import { useHoverCapable } from "@/hooks/useHoverCapable";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const canHover = useHoverCapable();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    const btn = buttonRef.current;
    const newTheme = isDark ? "light" : "dark";
    const newBg = newTheme === "dark" ? "#0D0A1E" : "#F5F5F8";

    if (!btn || !document.startViewTransition) {
      // Fallback: ripple via DOM overlay
      const rect = btn?.getBoundingClientRect();
      const x = rect ? Math.round(rect.left + rect.width / 2) : window.innerWidth - 40;
      const y = rect ? Math.round(rect.top + rect.height / 2) : window.innerHeight - 40;

      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position:fixed;inset:0;z-index:99997;
        background:${newBg};
        clip-path:circle(0px at ${x}px ${y}px);
        pointer-events:none;
        will-change:clip-path;
      `;
      document.body.appendChild(overlay);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          overlay.style.transition = "clip-path 0.55s cubic-bezier(0.22,1,0.36,1)";
          overlay.style.clipPath = `circle(200vmax at ${x}px ${y}px)`;
        });
      });

      overlay.addEventListener(
        "transitionend",
        () => {
          // Freeze all CSS transitions so nothing lags behind the reveal
          document.documentElement.classList.add("theme-switching");
          setTheme(newTheme);
          // Two rAF: first lets React apply the new class, second lets browser paint
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              document.documentElement.classList.remove("theme-switching");
              overlay.remove();
            });
          });
        },
        { once: true }
      );
      return;
    }

    // Native View Transitions API — smoother in supported browsers
    document.startViewTransition(() => {
      document.documentElement.classList.add("theme-switching");
      setTheme(newTheme);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.documentElement.classList.remove("theme-switching");
        });
      });
    });
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-9000 w-12 h-12 rounded-full glass-card theme-toggle-btn flex items-center justify-center shadow-lg"
      style={{ border: "1px solid rgba(252,0,42,0.3)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { delay: 1, type: "spring", stiffness: 270, damping: 20 },
        y: { delay: 1, type: "spring", stiffness: 270, damping: 20 },
        scale: { type: "spring", stiffness: 420, damping: 18 },
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Moon size={18} className="text-gold" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Sun size={18} className="text-gold" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
