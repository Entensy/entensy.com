"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "@/components/layout/ThemeContext";
import SectionHeading from "@/components/ui/SectionHeading";
import { stackCategories } from "@/lib/stacks-data";
import { iconRegistry } from "@/lib/icon-registry";
import { viewportOnce } from "@/lib/animations";
import { useHoverCapable } from "@/hooks/useHoverCapable";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// 21 evenly distributed watermark positions covering 0-95% range in both axes
const WATERMARK_POSITIONS: { left: string; top: string }[] = [
  { left: "5%", top: "8%" },
  { left: "20%", top: "5%" },
  { left: "38%", top: "12%" },
  { left: "55%", top: "4%" },
  { left: "72%", top: "10%" },
  { left: "88%", top: "6%" },
  { left: "10%", top: "30%" },
  { left: "28%", top: "38%" },
  { left: "47%", top: "28%" },
  { left: "63%", top: "35%" },
  { left: "80%", top: "32%" },
  { left: "93%", top: "42%" },
  { left: "3%", top: "55%" },
  { left: "18%", top: "62%" },
  { left: "36%", top: "58%" },
  { left: "53%", top: "68%" },
  { left: "70%", top: "60%" },
  { left: "85%", top: "70%" },
  { left: "12%", top: "82%" },
  { left: "42%", top: "88%" },
  { left: "68%", top: "85%" },
];

type TechItem = (typeof stackCategories)[number]["items"][number];

function TechBadge({
  tech,
  index,
  isDark,
  canHover,
  badgeBaseColor,
  badgeBaseBg,
  badgeBaseBorder,
}: {
  tech: TechItem;
  index: number;
  isDark: boolean;
  canHover: boolean;
  badgeBaseColor: string;
  badgeBaseBg: string;
  badgeBaseBorder: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useScrollReveal(ref as React.RefObject<Element | null>);

  const techColor =
    tech.name === "Next.js" ? (isDark ? "#FFFFFF" : "#111111") : tech.color;
  const techBgColor =
    tech.name === "Next.js"
      ? isDark
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.06)"
      : tech.bgColor;
  const Icon = tech.icon ? iconRegistry[tech.icon] : undefined;

  const variant = {
    below: { opacity: 0, scale: 0.8, y: 20 },
    above: {
      opacity: 0,
      y: -14,
      scale: 0.97,
      transition: { duration: 0.22, ease: "easeIn" as const },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: index * 0.04,
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial='below'
      animate={state}
      className='stack-badge'
      style={{
        color: badgeBaseColor,
        background: badgeBaseBg,
        borderColor: badgeBaseBorder,
      }}
      transition={{
        color: { duration: 0.18, ease: "easeOut" },
        background: { duration: 0.18, ease: "easeOut" },
        borderColor: { duration: 0.18, ease: "easeOut" },
        boxShadow: { duration: 0.18, ease: "easeOut" },
      }}
      whileHover={
        canHover
          ? {
              scale: 1.05,
              color: techColor,
              background: techBgColor,
              borderColor: `${techColor}55`,
              boxShadow: `0 0 18px ${techColor}70, 0 4px 22px ${techColor}35`,
              transition: { duration: 0.15, ease: "easeOut" },
            }
          : {}
      }
      whileTap={{
        scale: 1.05,
        color: techColor,
        background: techBgColor,
        borderColor: `${techColor}55`,
        boxShadow: `0 0 18px ${techColor}70, 0 4px 22px ${techColor}35`,
        transition: { duration: 0.15, ease: "easeOut" },
      }}>
      {Icon && (
        <Icon style={{ color: techColor, fontSize: "1.1rem", flexShrink: 0 }} />
      )}
      <span>{tech.name}</span>
    </motion.div>
  );
}

export default function StacksSection() {
  const t = useTranslations("stacks");
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const canHover = useHoverCapable();
  const [activeCategory, setActiveCategory] = useState(stackCategories[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const badgesContentRef = useRef<HTMLDivElement>(null);
  const [badgesHeight, setBadgesHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const el = badgesContentRef.current;
    if (!el) return;
    setBadgesHeight(el.offsetHeight);
    const ro = new ResizeObserver(() => setBadgesHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [activeCategory]);

  const badgeBaseColor = isDark
    ? "rgba(248,248,255,0.65)"
    : "rgba(13,10,30,0.65)";
  const badgeBaseBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(13,10,30,0.05)";
  const badgeBaseBorder = isDark
    ? "rgba(255,255,255,0.08)"
    : "rgba(13,10,30,0.10)";

  const currentCategory = stackCategories.find((c) => c.id === activeCategory)!;

  const allItems = stackCategories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, catColor: cat.color })),
  );

  return (
    <section
      id='stacks'
      ref={sectionRef}
      className='section-wrapper stacks-section-wrapper relative'
      style={{ background: "var(--bg-secondary)" }}
      dir={isRtlLocale ? "rtl" : "ltr"}>
      {/* Radial gradient pulse at section center - CSS-driven */}
      <div
        className='absolute inset-0 z-0 pointer-events-none bg-scale-pulse'
        style={
          {
            background:
              "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(49,120,198,0.12) 0%, rgba(97,218,251,0.06) 40%, transparent 70%)",
            "--dur": "6s",
            "--delay": "0s",
          } as React.CSSProperties
        }
      />

      {/* Floating icon watermarks - CSS-driven */}
      <div className='absolute inset-0 z-0 overflow-hidden pointer-events-none'>
        {WATERMARK_POSITIONS.map((pos, idx) => {
          const item = allItems[idx % allItems.length];
          const Icon = iconRegistry[item.icon];
          if (!Icon) return null;
          const dur = `${7 + (idx % 5)}s`;
          const delay = `${(idx * 0.37) % 4}s`;
          return (
            <div
              key={idx}
              className='absolute bg-drift-y'
              style={
                {
                  left: pos.left,
                  top: pos.top,
                  color: item.color,
                  opacity: 0.045,
                  fontSize: "3.75rem",
                  "--dur": dur,
                  "--delay": delay,
                } as React.CSSProperties
              }>
              <Icon />
            </div>
          );
        })}
      </div>

      <div className='section-inner relative z-10'>
        <SectionHeading
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        {/* Category Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-14 ${isRtlLocale ? "" : "force-ltr"}`}
          dir={isRtlLocale ? "rtl" : "ltr"}>
          {stackCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className='relative px-5 py-2.5 rounded-full text-sm font-semibold'
                style={{
                  border: `1px solid ${isActive ? cat.color + "50" : "var(--border-color)"}`,
                }}
                initial={{
                  opacity: 0,
                  y: -12,
                  color: "var(--text-muted)",
                  background: "rgba(255,255,255,0)",
                  boxShadow: "0 0 0px rgba(0,0,0,0)",
                }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{
                  color: isActive ? cat.color : "var(--text-muted)",
                  background: isActive
                    ? `${cat.color}20`
                    : "rgba(255,255,255,0)",
                  boxShadow: isActive
                    ? `0 0 12px ${cat.color}30`
                    : "0 0 0px rgba(0,0,0,0)",
                }}
                viewport={{
                  once: false,
                  margin: "-15% 0px -5% 0px",
                  amount: 0.05,
                }}
                transition={{
                  delay: stackCategories.indexOf(cat) * 0.06,
                  duration: 0.35,
                  ease: "easeOut",
                }}
                whileHover={!isActive && canHover ? { scale: 1.04 } : {}}
                whileTap={{
                  scale: 1.05,
                  background: `${cat.color}18`,
                  color: cat.color,
                  boxShadow: `0 0 14px ${cat.color}50`,
                  transition: { duration: 0.15, ease: "easeOut" },
                }}>
                {t(`categories.${cat.id}` as Parameters<typeof t>[0])}
                {isActive && (
                  <motion.span
                    layoutId='cat-indicator'
                    className='absolute inset-0 rounded-full'
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

        {/* Tech badges grid */}
        <motion.div
          initial={false}
          animate={{ height: badgesHeight ?? "auto" }}
          transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.9 }}
          className=''>
          <div ref={badgesContentRef}>
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className='flex flex-wrap justify-center gap-4 force-ltr'
              dir='ltr'>
              {currentCategory.items.map((tech, index) => (
                <TechBadge
                  key={tech.name}
                  tech={tech}
                  index={index}
                  isDark={isDark}
                  canHover={canHover}
                  badgeBaseColor={badgeBaseColor}
                  badgeBaseBg={badgeBaseBg}
                  badgeBaseBorder={badgeBaseBorder}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Category color bar */}
        <motion.div
          className='mt-12 flex justify-center'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}>
          <div className='flex gap-1.5'>
            {stackCategories.map((cat) => (
              <motion.div
                key={cat.id}
                className='h-1 rounded-full cursor-pointer'
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
