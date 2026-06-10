"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  FiGlobe,
  FiLayers,
  FiShoppingCart,
  FiCalendar,
  FiGrid,
  FiDatabase,
  FiCloud,
  FiSmartphone,
  FiTool,
  FiFlag,
  FiBriefcase,
  FiZap,
  FiSettings,
} from "react-icons/fi";
import TiltCard from "@/components/ui/TiltCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { solutions } from "@/lib/solutions-data";
import { useCardBorder } from "@/hooks/useCardBorder";
import { cardRevealVariant } from "@/lib/animations";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type IconComponent = React.FC<{
  style?: React.CSSProperties;
  className?: string;
}>;

const iconMap: Record<string, IconComponent> = {
  FiGlobe,
  FiLayers,
  FiShoppingCart,
  FiCalendar,
  FiGrid,
  FiDatabase,
  FiCloud,
  FiSmartphone,
  FiTool,
  FiFlag,
  FiBriefcase,
  FiZap,
  FiSettings,
};

const solutionTagKeyMap: Record<string, string> = {
  "business-websites": "business_websites",
  "company-portals": "company_portals",
  ecommerce: "ecommerce",
  booking: "booking",
  dashboards: "dashboards",
  "crm-erp": "crm_erp",
  saas: "saas",
  "mobile-apps": "mobile_apps",
  "internal-tools": "internal_tools",
  government: "government",
  branding: "branding",
  "mvp-startup": "mvp_startup",
  maintenance: "maintenance",
};

const CSS = `
  .sol-shell .card-border-ring {
    opacity: 0.45;
    transition: opacity 0.25s ease, filter 0.25s ease;
  }
  @media (hover: hover) {
    .sol-shell:hover .card-border-ring { opacity: 1; filter: saturate(1.5) brightness(1.4); }
    .sol-shell:hover .sol-icon { transform: scale(1.1) rotate(-5deg); }
  }
  .sol-icon { transition: transform 0.25s cubic-bezier(0.22,1,0.36,1); }
  .sol-shell.is-pressed .sol-icon { transform: scale(1.1) rotate(-5deg); }
`;

const WATERMARK_POSITIONS = [
  { left: "4%", top: "8%", dur: "18s", delay: "0s" },
  { left: "20%", top: "4%", dur: "22s", delay: "1.2s" },
  { left: "38%", top: "14%", dur: "16s", delay: "3s" },
  { left: "58%", top: "6%", dur: "20s", delay: "0.8s" },
  { left: "76%", top: "12%", dur: "24s", delay: "2.2s" },
  { left: "92%", top: "30%", dur: "17s", delay: "4s" },
  { left: "88%", top: "60%", dur: "19s", delay: "1s" },
  { left: "68%", top: "80%", dur: "21s", delay: "3.5s" },
  { left: "44%", top: "88%", dur: "15s", delay: "5s" },
  { left: "22%", top: "76%", dur: "23s", delay: "2s" },
  { left: "6%", top: "55%", dur: "18s", delay: "0.5s" },
  { left: "32%", top: "42%", dur: "20s", delay: "4.5s" },
];

function SolutionCard({
  solution,
  tag,
  padded,
  centerClass,
  isRtl,
  t,
}: {
  solution: (typeof solutions)[number];
  tag: string;
  padded: string;
  centerClass: string;
  isRtl: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  const Icon = iconMap[solution.icon];
  const shellRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardState = useScrollReveal(cardRef as React.RefObject<Element | null>);
  const {
    handleBorderMouseMove,
    handleBorderMouseLeave,
    handleTouchStart,
    handleTouchEnd,
  } = useCardBorder(shellRef as React.RefObject<HTMLElement | null>);

  const colSpan = solution.size === "large" ? "lg:col-span-2" : "col-span-1";

  return (
    <motion.div
      ref={cardRef}
      variants={cardRevealVariant}
      initial='below'
      animate={cardState}
      className={`${colSpan} ${centerClass} h-full`}
      style={{ backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <TiltCard tiltMaxAngle={8}>
        <div
          ref={shellRef}
          className='sol-shell relative rounded-2xl p-px overflow-hidden h-full'
          style={{ background: "transparent" }}
          onMouseMove={handleBorderMouseMove}
          onMouseLeave={handleBorderMouseLeave}
          onTouchStart={(e) => {
            shellRef.current?.classList.add("is-pressed");
            handleTouchStart(e);
          }}
          onTouchEnd={() => {
            shellRef.current?.classList.remove("is-pressed");
            handleTouchEnd();
          }}
          onTouchCancel={() =>
            shellRef.current?.classList.remove("is-pressed")
          }>
          {/* JS-driven border ring */}
          <div
            className='card-border-ring rounded-2xl'
            style={
              {
                "--ring-color": solution.color + "60",
                "--ring-color-light": solution.color + "38",
              } as React.CSSProperties
            }
          />

          {/* Card body */}
          <div
            className='sol-card relative h-62 p-5 pb-12 rounded-2xl overflow-hidden flex flex-col gap-3 transition-[box-shadow,border-color] duration-300'
            style={
              {
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.09)",
                boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.07)",
              } as React.CSSProperties
            }>
            <div
              className='card-cursor-glow'
              style={
                {
                  width: "210px",
                  height: "210px",
                  top: "calc(50% - 105px)",
                  left: "calc(50% - 105px)",
                  "--cursor-color": solution.color + "28",
                } as React.CSSProperties
              }
            />

            {/* Diagonal corner accent - top-left in LTR, top-right in RTL */}
            <div
              className={`absolute top-0 pointer-events-none overflow-hidden ${isRtl ? "right-0 rounded-tr-2xl" : "left-0 rounded-tl-2xl"}`}
              style={{ width: "68%", height: "60%" }}>
              {/* Main fill */}
              <div
                className='absolute inset-0'
                style={{
                  background: `linear-gradient(${isRtl ? "225deg" : "135deg"}, ${solution.color}32 0%, ${solution.color}14 38%, transparent 60%)`,
                  clipPath: isRtl
                    ? "polygon(0 0, 100% 0, 100% 100%)"
                    : "polygon(0 0, 100% 0, 0 100%)",
                }}
              />
              {/* Bright edge shimmer */}
              <div
                className='absolute inset-0'
                style={{
                  background: `linear-gradient(${isRtl ? "225deg" : "135deg"}, ${solution.color}65 0%, ${solution.color}18 10%, transparent 22%)`,
                  clipPath: isRtl
                    ? "polygon(0 0, 100% 0, 100% 100%)"
                    : "polygon(0 0, 100% 0, 0 100%)",
                }}
              />
            </div>

            {/* Icon + featured badge row */}
            <div className='flex items-start justify-between gap-3 relative z-10'>
              <div
                className='sol-icon w-11 h-11 rounded-xl flex items-center justify-center shrink-0'
                style={{
                  background: `${solution.color}18`,
                  border: `1px solid ${solution.color}30`,
                }}>
                {Icon && (
                  <Icon style={{ color: solution.color, fontSize: "1.2rem" }} />
                )}
              </div>

              {solution.size === "large" && (
                <span
                  className='text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full'
                  style={{
                    background: `${solution.color}15`,
                    color: solution.color,
                    border: `1px solid ${solution.color}28`,
                  }}>
                  {t("solutions.featured")}
                </span>
              )}
            </div>

            {/* Content */}
            <div className='flex flex-col gap-2 flex-1 relative z-10'>
              <h3 className='text-sm font-bold leading-snug heading-glass'>
                {t(solution.titleKey as Parameters<typeof t>[0])}
              </h3>
              <p
                className='text-xs leading-relaxed'
                style={{
                  color: "var(--text-muted)",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                {t(solution.descKey as Parameters<typeof t>[0])}
              </p>
            </div>

            {/* Decorative index number */}
            <span
              className={`absolute bottom-3 text-5xl font-black leading-none pointer-events-none select-none z-10 ${isRtl ? "left-4" : "right-4"}`}
              style={{ color: solution.color, opacity: 0.07 }}>
              {padded}
            </span>

            {/* Tag pill */}
            {tag && (
              <span
                className={`absolute bottom-4 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full z-10 force-ltr ${isRtl ? "right-5" : "left-5"}`}
                dir='ltr'
                style={{
                  background: `${solution.color}18`,
                  color: solution.color,
                  border: `1px solid ${solution.color}35`,
                }}>
                {tag}
              </span>
            )}

            {/* Bottom accent line */}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

// Computed once at module level - solutions is a static constant
const lgAlone: boolean[] = solutions.reduce<{
  result: boolean[];
  cols: number;
}>(
  ({ result, cols }, s, i) => {
    const w = s.size === "large" ? 2 : 1;
    const next = cols + w > 3 ? w : cols + w;
    result.push(i === solutions.length - 1 && next === w && w === 1);
    return { result, cols: next };
  },
  { result: [], cols: 0 },
).result;

export default function SolutionsSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";

  return (
    <>
      <style>{CSS}</style>
      <section
        id='solutions'
        className='section-wrapper relative'
        style={{ background: "var(--bg-primary)" }}
        dir={isRtlLocale ? "rtl" : "ltr"}>
        {/* ── Background ── */}
        <div className='absolute inset-0 z-0 pointer-events-none overflow-hidden'>
          {/* Dot grid */}
          <div className='absolute inset-0 bg-grid-pattern opacity-20' />

          {/* Ambient orbs */}
          <div
            className='absolute bg-drift-xy'
            style={
              {
                top: "-15%",
                left: "-10%",
                width: "55vw",
                height: "55vw",
                background:
                  "radial-gradient(circle, rgba(225,29,72,0.065) 0%, rgba(225,29,72,0.022) 50%, transparent 75%)",
                borderRadius: "50%",
                "--dur": "18s",
                "--delay": "0s",
              } as React.CSSProperties
            }
          />
          <div
            className='absolute bg-drift-y'
            style={
              {
                bottom: "-10%",
                right: "-8%",
                width: "50vw",
                height: "50vw",
                background:
                  "radial-gradient(circle, rgba(124,58,237,0.072) 0%, rgba(124,58,237,0.025) 50%, transparent 75%)",
                borderRadius: "50%",
                "--dur": "15s",
                "--delay": "4s",
              } as React.CSSProperties
            }
          />
          <div
            className='absolute bg-scale-pulse'
            style={
              {
                top: "25%",
                left: "38%",
                width: "38vw",
                height: "38vw",
                background:
                  "radial-gradient(circle, rgba(217,119,6,0.048) 0%, rgba(217,119,6,0.016) 50%, transparent 80%)",
                borderRadius: "50%",
                "--dur": "12s",
                "--delay": "7s",
              } as React.CSSProperties
            }
          />

          {/* Floating icon watermarks */}
          {WATERMARK_POSITIONS.map((pos, idx) => {
            const icons = [
              FiGlobe,
              FiLayers,
              FiShoppingCart,
              FiCalendar,
              FiCloud,
              FiSmartphone,
            ];
            const colors = [
              "#E11D48",
              "#7C3AED",
              "#D97706",
              "#0EA5E9",
              "#10B981",
              "#F59E0B",
            ];
            const Icon = icons[idx % icons.length];
            const color = colors[idx % colors.length];
            return (
              <div
                key={idx}
                className='absolute bg-drift-y pointer-events-none'
                style={
                  {
                    left: pos.left,
                    top: pos.top,
                    opacity: 0.045,
                    color,
                    fontSize: "3.75rem",
                    "--dur": pos.dur,
                    "--delay": pos.delay,
                  } as React.CSSProperties
                }>
                <Icon />
              </div>
            );
          })}
        </div>

        <div className='section-inner relative z-10'>
          <SectionHeading
            badge={t("solutions.badge")}
            title={t("solutions.title")}
            subtitle={t("solutions.subtitle")}
          />

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-auto'>
            {solutions.map((solution, index) => {
              const tagKey = solutionTagKeyMap[solution.id];
              const tag = tagKey
                ? t(`solutions.tags.${tagKey}` as Parameters<typeof t>[0])
                : "";
              const padded = String(index + 1).padStart(2, "0");
              const centerClass = lgAlone[index]
                ? "sm:col-span-2 lg:col-span-3 xl:col-span-1"
                : "";
              return (
                <SolutionCard
                  key={solution.id}
                  solution={solution}
                  tag={tag}
                  padded={padded}
                  centerClass={centerClass}
                  isRtl={isRtlLocale}
                  t={t}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
