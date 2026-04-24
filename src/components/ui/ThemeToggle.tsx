"use client";

import { useRef } from "react";
import { useTheme } from "@/components/layout/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    const btn = buttonRef.current;
    const newTheme = isDark ? "light" : "dark";
    const newBg = newTheme === "dark" ? "#0D0A1E" : "#F5F5F8";

    const rect = btn?.getBoundingClientRect();
    const x = rect ? Math.round(rect.left + rect.width / 2) : window.innerWidth - 40;
    const y = rect ? Math.round(rect.top + rect.height / 2) : window.innerHeight - 40;

    // Ripple overlay expands from the button, theme swap happens beneath it
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
        document.documentElement.classList.add("theme-switching");
        setTheme(newTheme);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.documentElement.classList.remove("theme-switching");
            overlay.remove();
          });
        });
      },
      { once: true }
    );
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-9000 w-12 h-12 rounded-full glass-card flex items-center justify-center shadow-lg"
      style={{
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.75)",
        border: "1px solid rgba(252,0,42,0.3)",
      }}
      whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(252,0,42,0.25)" }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 270, damping: 20 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* popLayout: exit and enter animate simultaneously — no visibility gap */}
      <AnimatePresence mode="popLayout" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: "#C9A84C", display: "flex" }}
          >
            <Moon size={18} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: "#C9A84C", display: "flex" }}
          >
            <Sun size={18} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
