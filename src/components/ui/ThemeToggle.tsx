"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "@/components/layout/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const btn = buttonRef.current;
    const newTheme = isDark ? "light" : "dark";
    const newBg = newTheme === "dark" ? "#0D0A1E" : "#F5F5F8";

    if (!btn || !document.startViewTransition) {
      // Fallback: scale-based ripple — transform:scale runs on the compositor,
      // no per-frame repaint even when backdrop-filter elements exist below.
      const rect = btn?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
      const y = rect ? rect.top + rect.height / 2 : window.innerHeight - 40;

      // Scale needed so a 4px circle covers the farthest viewport corner
      const maxDist = Math.max(
        Math.hypot(x, y),
        Math.hypot(window.innerWidth - x, y),
        Math.hypot(x, window.innerHeight - y),
        Math.hypot(window.innerWidth - x, window.innerHeight - y),
      );
      const scale = Math.ceil(maxDist / 2) + 1;

      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position:fixed;
        left:${x}px;top:${y}px;
        width:4px;height:4px;
        border-radius:50%;
        transform:translate(-50%,-50%) scale(1);
        transform-origin:center;
        z-index:99997;
        background:${newBg};
        pointer-events:none;
        will-change:transform;
      `;
      document.body.appendChild(overlay);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          overlay.style.transition = "transform 0.55s cubic-bezier(0.22,1,0.36,1)";
          overlay.style.transform = `translate(-50%,-50%) scale(${scale})`;
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
        { once: true },
      );
      return;
    }

    const html = document.documentElement;

    document.startViewTransition(() => {
      html.classList.add("theme-switching");
      setTheme(newTheme);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          html.classList.remove("theme-switching");
        });
      });
    });
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleToggle}
      className='fixed bottom-6 right-6 z-9000 w-12 h-12 rounded-full glass-card theme-toggle-btn flex items-center justify-center shadow-lg'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { delay: 1, type: "spring", stiffness: 270, damping: 20 },
        y: { delay: 1, type: "spring", stiffness: 270, damping: 20 },
        scale: { type: "spring", stiffness: 420, damping: 18 },
      }}
      aria-label='Toggle theme'
      suppressHydrationWarning>
      <AnimatePresence mode='wait'>
        {mounted && isDark ? (
          <motion.div
            key='moon'
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
            <Moon size={18} className='text-gold' />
          </motion.div>
        ) : mounted ? (
          <motion.div
            key='sun'
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
            <Sun size={18} className='text-gold' />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.button>
  );
}
