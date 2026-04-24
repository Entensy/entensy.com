"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import * as SiIcons from "react-icons/si";
import { useTheme } from "@/components/layout/ThemeContext";
import SectionHeading from "@/components/ui/SectionHeading";
import { stackCategories } from "@/lib/stacks-data";
import { staggerContainerVariant, viewportOnce } from "@/lib/animations";

type IconComp = React.FC<{ style?: React.CSSProperties; className?: string; fontSize?: string }>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SiIconsAny = SiIcons as Record<string, IconComp>;

// 21 evenly distributed watermark positions covering 0–95% range in both axes
const WATERMARK_POSITIONS: { left: string; top: string }[] = [
  { left: "5%",  top: "8%"  },
  { left: "20%", top: "5%"  },
  { left: "38%", top: "12%" },
  { left: "55%", top: "4%"  },
  { left: "72%", top: "10%" },
  { left: "88%", top: "6%"  },
  { left: "10%", top: "30%" },
  { left: "28%", top: "38%" },
  { left: "47%", top: "28%" },
  { left: "63%", top: "35%" },
  { left: "80%", top: "32%" },
  { left: "93%", top: "42%" },
  { left: "3%",  top: "55%" },
  { left: "18%", top: "62%" },
  { left: "36%", top: "58%" },
  { left: "53%", top: "68%" },
  { left: "70%", top: "60%" },
  { left: "85%", top: "70%" },
  { left: "12%", top: "82%" },
  { left: "42%", top: "88%" },
  { left: "68%", top: "85%" },
];

export default function StacksSection() {
  const t = useTranslations("stacks");
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [activeCategory, setActiveCategory] = useState(stackCategories[0].id);
  const sectionRef = useRef<HTMLElement>(null);

  // Base badge color is theme-aware — Framer reads this as the from-value for whileHover
  const badgeBaseColor = isDark ? "rgba(248,248,255,0.65)" : "rgba(13,10,30,0.65)";
  const badgeBaseBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(13,10,30,0.05)";
  const badgeBaseBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(13,10,30,0.10)";

  const currentCategory = stackCategories.find((c) => c.id === activeCategory)!;

  // Collect all tech items for watermarks (one per position slot, cycling through categories)
  const allItems = stackCategories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, catColor: cat.color }))
  );

  return (
    <section
      id="stacks"
      ref={sectionRef}
      className="section-wrapper stacks-section-wrapper relative"
      style={{ background: "var(--bg-secondary)" }}
      dir={isRtlLocale ? "rtl" : "ltr"}
    >
      {/* ── Radial gradient pulse at section center — CSS-driven ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-scale-pulse"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(49,120,198,0.12) 0%, rgba(97,218,251,0.06) 40%, transparent 70%)",
          "--dur": "6s",
          "--delay": "0s",
        } as React.CSSProperties}
      />

      {/* ── Floating icon watermarks — CSS-driven ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {WATERMARK_POSITIONS.map((pos, idx) => {
          const item = allItems[idx % allItems.length];
          const Icon = SiIconsAny[item.icon];
          if (!Icon) return null;
          const dur = `${7 + (idx % 5)}s`;
          const delay = `${(idx * 0.37) % 4}s`;
          return (
            <div
              key={idx}
              className="absolute bg-drift-y"
              style={{
                left: pos.left,
                top: pos.top,
                color: item.color,
                opacity: 0.045,
                fontSize: "3.75rem",
                "--dur": dur,
                "--delay": delay,
              } as React.CSSProperties}
            >
              <Icon />
            </div>
          );
        })}
      </div>

      <div className="section-inner relative z-10">
        <SectionHeading
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        {/* ── Category Tabs ── */}
        <div className={`flex flex-wrap justify-center gap-2 mb-14 ${isRtlLocale ? "" : "force-ltr"}`} dir={isRtlLocale ? "rtl" : "ltr"}>
          {stackCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200"
                style={{
                  color: isActive ? cat.color : "var(--text-muted)",
                  background: isActive ? `${cat.color}20` : "rgba(255,255,255,0)",
                  border: `1px solid ${isActive ? cat.color + "50" : "var(--border-color)"}`,
                  boxShadow: isActive ? `0 0 12px ${cat.color}30` : "0 0 0px rgba(0,0,0,0)",
                }}
                whileHover={
                  isActive
                    ? {}
                    : {
                        scale: 1.04,
                        background: `${cat.color}12`,
                        color: cat.color,
                        borderColor: `${cat.color}30`,
                      }
                }
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
                whileTap={{ scale: 0.96 }}
              >
                {t(`categories.${cat.id}` as Parameters<typeof t>[0])}
                {isActive && (
                  <motion.span
                    layoutId="cat-indicator"
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow: `0 0 18px ${cat.color}40, inset 0 0 8px ${cat.color}10`,
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* ── Tech badges grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            variants={staggerContainerVariant}
            className="flex flex-wrap justify-center gap-4 force-ltr"
            dir="ltr"
          >
            {currentCategory.items.map((tech, index) => {
              const Icon = tech.icon ? SiIconsAny[tech.icon] : undefined;
              // Next.js icon is white by design; swap to near-black in light mode
              const techColor = tech.name === "Next.js"
                ? (isDark ? "#FFFFFF" : "#111111")
                : tech.color;
              const techBgColor = tech.name === "Next.js"
                ? (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)")
                : tech.bgColor;

              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8, y: 20, color: badgeBaseColor, background: badgeBaseBg, borderColor: badgeBaseBorder }}
                  animate={{ opacity: 1, scale: 1, y: 0, color: badgeBaseColor, background: badgeBaseBg, borderColor: badgeBaseBorder }}
                  className="stack-badge"
                  transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.09,
                    y: -3,
                    color: techColor,
                    background: techBgColor,
                    borderColor: `${techColor}55`,
                    boxShadow: `0 0 18px ${techColor}70, 0 4px 22px ${techColor}35`,
                    transition: {
                      color: { duration: 0.18, ease: "easeOut" },
                      background: { duration: 0.18, ease: "easeOut" },
                      borderColor: { duration: 0.18, ease: "easeOut" },
                      boxShadow: { duration: 0.18, ease: "easeOut" },
                      scale: { type: "spring", stiffness: 500, damping: 22 },
                      y: { type: "spring", stiffness: 500, damping: 22 },
                    },
                  }}
                >
                  {Icon && (
                    <Icon
                      style={{
                        color: techColor,
                        fontSize: "1.1rem",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <span>{tech.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── Category color bar ── */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
        >
          <div className="flex gap-1.5">
            {stackCategories.map((cat) => (
              <motion.div
                key={cat.id}
                className="h-1 rounded-full cursor-pointer"
                style={{
                  background: cat.color,
                  width: activeCategory === cat.id ? "2.5rem" : "0.5rem",
                  opacity: activeCategory === cat.id ? 1 : 0.3,
                }}
                animate={{
                  width: activeCategory === cat.id ? "2.5rem" : "0.5rem",
                }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
