"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import {
  Clock, Code2, Layers, Star,
  Users, Zap, Target, ArrowRight,
  Kanban, Cloud, Shield, Truck, MessageCircle, BarChart3,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTheme } from "@/components/layout/ThemeContext";
import {
  staggerContainerVariant,
  fadeUpVariant,
  viewportOnce,
} from "@/lib/animations";

const GlobeBackground = dynamic(
  () => import("@/components/ui/GlobeBackground"),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { valueKey: "stats.years",        labelKey: "stats.years_label",        color: "#F43F5E", Icon: Clock  },
  { valueKey: "stats.projects",     labelKey: "stats.projects_label",     color: "#C9A84C", Icon: Code2  },
  { valueKey: "stats.services",     labelKey: "stats.services_label",     color: "#7C3AED", Icon: Layers },
  { valueKey: "stats.satisfaction", labelKey: "stats.satisfaction_label", color: "#10B981", Icon: Star   },
] as const;

// Unique color per capability for visual variety
const capabilityColors = [
  "#F43F5E", // agile
  "#7C3AED", // architecture
  "#3178C6", // fullstack
  "#06B6D4", // cloud
  "#E1306C", // user_centered
  "#F59E0B", // performance
  "#10B981", // security
  "#6366F1", // delivery
  "#C9A84C", // communication
  "#FF6C37", // data_driven
];

// Three core pillars with icons and accent colors
const pillars = [
  {
    key: "who",
    number: "01",
    color: "#F43F5E",
    Icon: Users,
    accentBg: "rgba(244,63,94,0.06)",
    shapeBorder: "rgba(244,63,94,0.18)",
  },
  {
    key: "how",
    number: "02",
    color: "#C9A84C",
    Icon: Zap,
    accentBg: "rgba(201,168,76,0.06)",
    shapeBorder: "rgba(201,168,76,0.18)",
  },
  {
    key: "why",
    number: "03",
    color: "#7C3AED",
    Icon: Target,
    accentBg: "rgba(124,58,237,0.06)",
    shapeBorder: "rgba(124,58,237,0.18)",
  },
] as const;

const capabilities = [
  { key: "capabilities.agile",        Icon: Kanban        },
  { key: "capabilities.architecture", Icon: Layers        },
  { key: "capabilities.fullstack",    Icon: Code2         },
  { key: "capabilities.cloud",        Icon: Cloud         },
  { key: "capabilities.user_centered",Icon: Users         },
  { key: "capabilities.performance",  Icon: Zap           },
  { key: "capabilities.security",     Icon: Shield        },
  { key: "capabilities.delivery",     Icon: Truck         },
  { key: "capabilities.communication",Icon: MessageCircle },
  { key: "capabilities.data_driven",  Icon: BarChart3     },
];


const WATERMARK_POSITIONS = [
  { left: "4%",  top: "8%",  dur: "18s", delay: "0s"   },
  { left: "20%", top: "4%",  dur: "22s", delay: "1.2s" },
  { left: "38%", top: "14%", dur: "16s", delay: "3s"   },
  { left: "58%", top: "6%",  dur: "20s", delay: "0.8s" },
  { left: "76%", top: "12%", dur: "24s", delay: "2.2s" },
  { left: "92%", top: "30%", dur: "17s", delay: "4s"   },
  { left: "88%", top: "60%", dur: "19s", delay: "1s"   },
  { left: "68%", top: "80%", dur: "21s", delay: "3.5s" },
  { left: "44%", top: "88%", dur: "15s", delay: "5s"   },
  { left: "22%", top: "76%", dur: "23s", delay: "2s"   },
  { left: "6%",  top: "55%", dur: "18s", delay: "0.5s" },
  { left: "32%", top: "42%", dur: "20s", delay: "4.5s" },
];

// ─── Pillar Card ──────────────────────────────────────────────────────────────

function PillarCard({
  pillar,
  t,
}: {
  pillar: (typeof pillars)[number];
  t: ReturnType<typeof useTranslations>;
}) {
  const [hovered, setHovered] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const cardBg      = isDark ? "rgba(13,10,30,0.88)"       : "rgba(255,255,255,0.82)";
  const shadowBase  = isDark
    ? `0 0 0 1px rgba(255,255,255,0.05), 0 8px 40px ${pillar.color}08`
    : `0 0 0 1px rgba(13,10,30,0.07), 0 6px 32px rgba(13,10,30,0.05)`;
  const shadowHover = isDark
    ? `0 0 0 1px ${pillar.color}35, 0 14px 52px ${pillar.color}18`
    : `0 0 0 1px ${pillar.color}55, 0 14px 52px ${pillar.color}14`;

  return (
      <motion.div
        className="relative rounded-2xl overflow-hidden flex flex-col h-full cursor-default"
        style={{ background: cardBg, boxShadow: shadowBase }}
        animate={{
          boxShadow: hovered ? shadowHover : shadowBase,
          y: hovered ? -4 : 0,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
        onTouchCancel={() => setHovered(false)}
      >
        {/* Diagonal top-left slash */}
        <div className="absolute top-0 left-0 pointer-events-none rounded-tl-2xl overflow-hidden" style={{ width: "68%", height: "55%" }}>
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${pillar.color}30 0%, ${pillar.color}10 40%, transparent 60%)`,
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${pillar.color}60 0%, ${pillar.color}15 10%, transparent 22%)`,
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
            }}
          />
        </div>

        {/* Top gradient line — fades in from center, not single color */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${pillar.color}80 35%, ${pillar.color}80 65%, transparent 100%)`,
          }}
        />

        {/* Watermark number */}
        <span
          className="absolute bottom-4 right-5 font-black leading-none pointer-events-none select-none"
          style={{ fontSize: "6.5rem", color: pillar.color, opacity: 0.055, lineHeight: 1 }}
        >
          {pillar.number}
        </span>

        {/* Content */}
        <div className="relative flex-1 p-7 flex flex-col gap-4 z-10">
          {/* Icon + number row */}
          <div className="flex items-start justify-between gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: `${pillar.color}15`,
                border: `1px solid ${pillar.color}28`,
                boxShadow: `0 0 22px ${pillar.color}1e`,
              }}
            >
              <pillar.Icon size={24} style={{ color: pillar.color }} strokeWidth={1.6} />
            </div>
            <span
              className="text-4xl font-black leading-none"
              style={{ color: pillar.color, opacity: 0.28 }}
            >
              {pillar.number}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-black" style={{ color: pillar.color }}>
            {t(`pillars.${pillar.key}.title` as Parameters<typeof t>[0])}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
            {t(`pillars.${pillar.key}.desc` as Parameters<typeof t>[0])}
          </p>

          {/* Bottom line — animates width on hover */}
          <motion.div
            className="h-px rounded-full"
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ background: `linear-gradient(90deg, ${pillar.color}, ${pillar.color}50, transparent)` }}
          />
        </div>
      </motion.div>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────

function CounterValue({ value, color }: { value: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState("0");

  useGSAP(
    () => {
      const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
      const suffix = value.replace(/[0-9.]/g, "");

      if (isNaN(numeric)) {
        setDisplayed(value);
        return;
      }

      const obj = { val: 0 };
      gsap.to(obj, {
        val: numeric,
        duration: 2.2,
        ease: "power2.out",
        onUpdate: () => {
          setDisplayed(
            (numeric % 1 === 0
              ? Math.floor(obj.val).toString()
              : obj.val.toFixed(0)) + suffix
          );
        },
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref, dependencies: [value] }
  );

  return (
    <span
      ref={ref}
      className="text-4xl md:text-5xl font-black tabular-nums relative z-10 force-ltr"
      dir="ltr"
      style={{ color }}
    >
      {displayed}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AboutSection() {
  const t = useTranslations("about");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const panelBg      = isDark ? "rgba(13,10,30,0.88)"      : "rgba(255,255,255,0.82)";
  const panelShadow  = isDark ? "0 0 0 1px rgba(255,255,255,0.05)" : "0 0 0 1px rgba(13,10,30,0.07), 0 4px 24px rgba(13,10,30,0.05)";
  const dividerBg    = isDark ? "rgba(255,255,255,0.05)"    : "rgba(13,10,30,0.06)";
  const cellBg       = isDark ? "rgba(13,10,30,0.88)"       : "rgba(255,255,255,0.82)";

  const ctaCardRef = useRef<HTMLDivElement>(null);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [ctaMouse, setCtaMouse] = useState({ x: 50, y: 50 });

  const handleCtaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ctaCardRef.current) return;
    const rect = ctaCardRef.current.getBoundingClientRect();
    setCtaMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section
        id="about"
        className="section-wrapper relative overflow-hidden"
        style={{ background: "var(--bg-primary)" }}
        dir={isRtlLocale ? "rtl" : "ltr"}
      >
        {/* ── Background ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Dot grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />

          {/* Ambient orbs */}
          <div className="absolute bg-drift-xy" style={{ top: "-5%", left: "-8%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(244,63,94,0.09) 0%, transparent 65%)", filter: "blur(50px)", borderRadius: "50%", "--dur": "14s", "--delay": "0s" } as React.CSSProperties} />
          <div className="absolute bg-drift-y" style={{ bottom: "0%", right: "-8%", width: "45vw", height: "45vw", background: "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)", filter: "blur(50px)", borderRadius: "50%", "--dur": "16s", "--delay": "2s" } as React.CSSProperties} />
          <div className="absolute bg-scale-pulse" style={{ top: "40%", left: "40%", width: "35vw", height: "35vw", background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)", filter: "blur(60px)", borderRadius: "50%", "--dur": "10s", "--delay": "4s" } as React.CSSProperties} />

          {/* Floating icon watermarks */}
          {WATERMARK_POSITIONS.map((pos, idx) => {
            const icons = [Users, Zap, Target, Star, Layers, Code2];
            const colors = ["#F43F5E", "#C9A84C", "#7C3AED", "#10B981", "#3B82F6", "#F59E0B"];
            const Icon = icons[idx % icons.length];
            const color = colors[idx % colors.length];
            return (
              <div key={idx} className="absolute bg-drift-y pointer-events-none" style={{ left: pos.left, top: pos.top, opacity: 0.045, color, "--dur": pos.dur, "--delay": pos.delay } as React.CSSProperties}>
                <Icon size={60} />
              </div>
            );
          })}
        </div>

        {/* ── Content ── */}
        <div className="section-inner relative z-10">
          <SectionHeading
            badge={t("badge")}
            title={t("title")}
            subtitle={t("subtitle")}
          />

          {/* ── Identity Banner ── */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="about-banner w-full mb-14 rounded-3xl overflow-hidden relative"
            style={{
              background:
                "linear-gradient(135deg, rgba(244,63,94,0.08) 0%, rgba(13,10,30,0.9) 40%, rgba(124,58,237,0.08) 100%)",
              border: "1px solid rgba(244,63,94,0.18)",
            }}
          >
            {/* Inner grid pattern */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(244,63,94,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(244,63,94,0.035) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            {/* Static layered gradient mesh — zero animation cost */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(244,63,94,0.08) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 80% 40%, rgba(124,58,237,0.07) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 40% at 50% 100%, rgba(201,168,76,0.06) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-0">
              {/* Left: logo identity */}
              <div className="flex flex-col items-center justify-center px-12 py-10 lg:py-14 gap-4 min-w-56 lg:border-r border-[rgba(244,63,94,0.15)]">
                <Image
                  src="/images/logo.png"
                  alt="ENTENSY"
                  width={180}
                  height={54}
                  className="h-12 md:h-14 w-auto object-contain"
                  priority
                />
                <div className="text-center">
                  <p
                    className="text-xl md:text-2xl font-black tracking-[0.28em] uppercase force-ltr heading-glass"
                  >
                    {tNav("brand")}
                  </p>
                  <p
                    className="text-xs font-semibold tracking-widest mt-1 uppercase force-ltr"
                    style={{ color: "rgba(244,63,94,0.75)" }}
                  >
                    {t("motto")}
                  </p>
                </div>

                {/* Achievement badges */}
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {(["labels.tag_quality", "labels.tag_tailored", "labels.tag_global"] as const).map((key) => (
                    <span
                      key={key}
                      className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(244,63,94,0.1)",
                        border: "1px solid rgba(244,63,94,0.25)",
                        color: "rgba(244,63,94,0.9)",
                      }}
                    >
                      {t(key as Parameters<typeof t>[0])}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: condensed company description */}
              <div className="flex flex-col justify-center px-8 md:px-12 py-10 md:py-14 flex-1">
                <div
                  className="w-10 h-0.5 mb-5"
                  style={{ background: "rgba(244,63,94,0.55)" }}
                />
                <p
                  className="text-sm md:text-base leading-relaxed mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {t("pillars.who.desc")}
                </p>

                {/* Key points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {([
                    { icon: Zap,    key: "labels.kp_agile"       },
                    { icon: Target, key: "labels.kp_tailored"    },
                    { icon: Users,  key: "labels.kp_partnership" },
                    { icon: Star,   key: "labels.kp_excellence"  },
                  ] as const).map(({ icon: Icon, key }) => (
                    <div
                      key={key}
                      className="flex items-center gap-2.5 text-xs font-semibold"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Icon size={14} style={{ color: "#F43F5E", flexShrink: 0 }} strokeWidth={2} />
                      <span>{t(key as Parameters<typeof t>[0])}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Stats Row — unified spectrum panel ── */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-14 rounded-2xl overflow-hidden"
            style={{ background: panelBg, boxShadow: panelShadow }}
          >
            {/* Multi-color spectrum bar across the top */}
            <div
              className="h-0.5 w-full"
              style={{
                background: `linear-gradient(90deg, ${stats[0].color} 0%, ${stats[1].color} 33%, ${stats[2].color} 66%, ${stats[3].color} 100%)`,
              }}
            />

            <motion.div
              variants={staggerContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-2 md:grid-cols-4 gap-px"
              style={{ background: dividerBg }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.valueKey}
                  variants={fadeUpVariant}
                  className="relative flex flex-col items-center gap-3 text-center py-9 px-5"
                  style={{ background: cellBg }}
                >
                  {/* Per-stat radial glow from top */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 90% 110% at 50% 0%, ${stat.color}0e 0%, transparent 65%)`,
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${stat.color}14`,
                      border: `1px solid ${stat.color}30`,
                      boxShadow: `0 0 18px ${stat.color}18`,
                    }}
                  >
                    <stat.Icon size={18} style={{ color: stat.color }} strokeWidth={1.8} />
                  </div>

                  <CounterValue
                    value={t(stat.valueKey as Parameters<typeof t>[0])}
                    color={stat.color}
                  />

                  <span
                    className="text-xs font-semibold tracking-wide leading-snug"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t(stat.labelKey as Parameters<typeof t>[0])}
                  </span>

                  {/* Animated bottom accent — sweeps in on scroll */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.9, ease: "easeOut" }}
                    style={{
                      background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Three Pillars ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.key}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={i}
                className="h-full"
              >
                <PillarCard pillar={pillar} t={t} />
              </motion.div>
            ))}
          </div>

          {/* ── Capabilities ── */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="about-capabilities-panel rounded-2xl p-8"
            style={{
              background: "rgba(13,10,30,0.88)",
              border: "1px solid var(--glass-border)",
            }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(244,63,94,0.12)", border: "1px solid rgba(244,63,94,0.25)" }}
              >
                <Layers size={14} style={{ color: "#F43F5E" }} strokeWidth={2} />
              </div>
              <span className="text-sm font-bold heading-glass">
                {t("labels.capabilities")}
              </span>
            </div>

            {/* 5-column icon tile grid */}
            <motion.div
              variants={staggerContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
            >
              {capabilities.map((cap, capIdx) => {
                const CapIcon = cap.Icon;
                const capColor = capabilityColors[capIdx % capabilityColors.length];
                // Center last tile when alone in its row (sm: 3-col, 10%3=1)
                const capLastRow3Rem = capabilities.length % 3;
                const isLastCap = capIdx === capabilities.length - 1;
                const capCenter = capLastRow3Rem === 1 && isLastCap
                  ? "sm:col-span-3 lg:col-span-1 sm:mx-auto sm:w-1/3 lg:w-auto lg:mx-0"
                  : "";
                return (
                  <motion.div
                    key={cap.key}
                    variants={fadeUpVariant}
                    className={`rounded-xl px-3 py-4 flex flex-col items-center gap-2 text-center cursor-default relative overflow-hidden ${capCenter}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 1.03, y: -1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    style={{
                      background: `${capColor}0a`,
                      border: `1px solid ${capColor}25`,
                    }}
                  >
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      whileTap={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${capColor}18 0%, transparent 70%)`,
                      }}
                    />
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative z-10"
                      style={{
                        background: `${capColor}14`,
                        border: `1px solid ${capColor}30`,
                        boxShadow: `0 0 16px ${capColor}18`,
                      }}
                    >
                      <CapIcon size={18} style={{ color: capColor }} strokeWidth={1.8} />
                    </div>
                    <span className="text-xs font-semibold leading-snug relative z-10" style={{ color: "var(--text-muted)" }}>
                      {t(cap.key as Parameters<typeof t>[0])}
                    </span>
                    {/* Bottom accent line on hover */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 rounded-full z-10"
                      initial={{ width: "0%" }}
                      whileHover={{ width: "100%" }}
                      whileTap={{ width: "100%" }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      style={{ background: capColor }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ── CTA Strip ── */}
          <motion.div
            ref={ctaCardRef}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="about-cta-strip mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl p-8 md:p-10 relative overflow-hidden cursor-default"
            style={{
              background: "rgba(13,10,30,0.88)",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "rgba(244,63,94,0.22)",
            }}
            whileHover={{
              y: -6,
              borderColor: "rgba(244,63,94,0.62)",
              boxShadow: "0 28px 64px rgba(244,63,94,0.22), 0 8px 32px rgba(244,63,94,0.14)",
            }}
            whileTap={{
              scale: 0.98,
              borderColor: "rgba(244,63,94,0.62)",
              boxShadow: "0 12px 40px rgba(244,63,94,0.20), 0 4px 16px rgba(244,63,94,0.12)",
            }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            onMouseMove={handleCtaMouseMove}
          >
            {/* Multi-layered gradient mesh */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 80% at 10% 50%, rgba(244,63,94,0.12) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 90% 50%, rgba(124,58,237,0.10) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(201,168,76,0.07) 0%, transparent 60%)" }} />
              <div className="absolute inset-0 bg-grid-pattern opacity-8" />
            </div>

            {/* Cursor-following spotlight — pure CSS transition, no Framer needed */}
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                opacity: ctaHovered ? 1 : 0,
                transition: "opacity 0.25s ease",
                background: `radial-gradient(circle 380px at ${ctaMouse.x}% ${ctaMouse.y}%, rgba(244,63,94,0.13) 0%, rgba(124,58,237,0.07) 45%, transparent 70%)`,
              }}
            />

            {/* Left side: icon + text */}
            <div className="relative z-10 flex items-center gap-5">
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                animate={{
                  background: ctaHovered ? "rgba(244,63,94,0.24)" : "rgba(244,63,94,0.14)",
                  boxShadow: ctaHovered
                    ? "0 0 42px rgba(244,63,94,0.40), 0 0 16px rgba(244,63,94,0.22)"
                    : "0 0 28px rgba(244,63,94,0.18)",
                }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{ border: "1px solid rgba(244,63,94,0.32)" }}
              >
                <motion.div
                  animate={{ x: ctaHovered ? (isRtlLocale ? -4 : 4) : 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 16 }}
                >
                  <ArrowRight size={22} style={{ color: "#F43F5E" }} strokeWidth={2.5} className="rtl-arrow" />
                </motion.div>
              </motion.div>
              <div>
                <p className="text-xl md:text-2xl font-black heading-glass">
                  {t("cta_title")}
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                  {t("cta_subtitle")}
                </p>
              </div>
            </div>

            {/* Right side: CTA button */}
            <motion.button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="relative z-10 flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold text-white shrink-0"
              style={{
                background: "linear-gradient(135deg, #F43F5E, #C8001F)",
                boxShadow: "0 4px 20px rgba(244,63,94,0.35)",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 28px rgba(244,63,94,0.5)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {t("cta_action")}
              <ArrowRight size={16} className="rtl-arrow" />
            </motion.button>
          </motion.div>
        </div>
    </section>
  );
}
