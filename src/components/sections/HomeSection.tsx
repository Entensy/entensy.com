"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import AnimatedButton from "@/components/ui/AnimatedButton";

const GlobeBackground = dynamic(
  () => import("@/components/ui/GlobeBackground"),
  { ssr: false }
);

gsap.registerPlugin(SplitText, ScrollTrigger);

const floatingBadges = [
  { key: "floating_1", delay: 0,   x: "-10%", y: "30%", rtlX: null   },
  { key: "floating_2", delay: 0.3, x: "80%",  y: "20%", rtlX: "20%"  },
  { key: "floating_3", delay: 0.6, x: "-8%",  y: "70%", rtlX: null   },
  { key: "floating_4", delay: 0.9, x: "78%",  y: "65%", rtlX: "22%"  },
];

// Mouse icon SVG scroll indicator
function MouseScrollIcon() {
  return (
    <svg width="22" height="34" viewBox="0 0 22 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="20" height="32" rx="10" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      <motion.rect
        x="10" y="7" width="2" height="6" rx="1"
        fill="currentColor"
        animate={{ y: [7, 13, 7] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function HomeSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [globeVisible, setGlobeVisible] = useState(true);

  useEffect(() => {
    // RTL: use Framer Motion (see JSX below) — skip GSAP to avoid stale ref issues
    if (isRtlLocale) return;

    // LTR only: char-by-char animation on plain-text lines (not gradient word)
    const targets = [line1Ref.current, line3Ref.current].filter(Boolean);
    if (!targets.length) return;

    const splits = targets.map((el) => new SplitText(el!, { type: "chars" }));
    const allChars = splits.flatMap((s) => s.chars);

    const tl = gsap.timeline({ delay: 0.3 });
    tl.from(allChars, {
      opacity: 0,
      y: 50,
      rotateX: -30,
      stagger: 0.025,
      duration: 0.7,
      ease: "power3.out",
    });

    return () => {
      splits.forEach((s) => s.revert());
      tl.kill();
    };
  }, [isRtlLocale]);

  // Pause globe rendering when section is off-screen
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setGlobeVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
      dir={isRtlLocale ? "rtl" : "ltr"}
    >
      {/* Globe background — only mounted while section is visible */}
      {globeVisible && (
        <div className="absolute inset-0 z-0">
          <GlobeBackground showIcosahedron opacity={0.85} />
        </div>
      )}

      {/* Deep radial gradient */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(252,0,42,0.07) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(255,255,255,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Floating badges — RTL: only floating_2 and floating_4 mirrored to left edge */}
      {floatingBadges
        .filter((badge) => !isRtlLocale || badge.rtlX !== null)
        .map((badge) => (
        <motion.div
          key={badge.key}
          className="absolute hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold glass-card z-20 bg-drift-y"
          style={{
            left: isRtlLocale ? badge.rtlX! : badge.x,
            top: badge.y,
            background: "color-mix(in srgb, var(--bg-primary) 80%, transparent)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(252,0,42,0.2)",
            color: "var(--text-secondary)",
            "--dur": `${4 + badge.delay}s`,
            "--delay": `${badge.delay + 1.5}s`,
          } as React.CSSProperties}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { delay: badge.delay + 1.5, duration: 0.6 },
            scale: { delay: badge.delay + 1.5, duration: 0.6 },
          }}
        >
          {isRtlLocale ? (
            <>{t(badge.key as Parameters<typeof t>[0])} <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" /></>
          ) : (
            <><span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" /> {t(badge.key as Parameters<typeof t>[0])}</>
          )}
        </motion.div>
      ))}

      {/* Main content — pt-24 ensures content doesn't crowd the navbar */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 px-[clamp(1.25rem,5vw,5rem)] max-w-5xl mx-auto w-full pt-28 md:pt-32 pb-28 md:pb-24">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold ${
            isRtlLocale ? "" : "tracking-widest uppercase"
          }`}
          style={{
            background: "rgba(252,0,42,0.08)",
            border: "1px solid rgba(252,0,42,0.2)",
            color: "rgba(252,0,42,0.9)",
          }}
        >
          <Sparkles size={12} />
          {t("badge")}
        </motion.div>

        {/* Headline — gradient word animated separately (not via SplitText) */}
        <div className="overflow-visible">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight"
          >
            {/* headline_1 — LTR: GSAP chars; RTL: Framer Motion fade */}
            {t("headline_1") && (
              <>
                {isRtlLocale ? (
                  <motion.span
                    className="heading-glass"
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.58, ease: "easeOut" }}
                  >
                    {t("headline_1")}{" "}
                  </motion.span>
                ) : (
                  <span ref={line1Ref} className="heading-glass">
                    {t("headline_1")}{" "}
                  </span>
                )}
              </>
            )}
            <motion.span
              className="gradient-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
            >
              {t("headline_2")}
            </motion.span>
            <br />
            {/* headline_3 — LTR: GSAP chars; RTL: Framer Motion fade */}
            {isRtlLocale ? (
              <motion.span
                className="heading-glass"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.58, ease: "easeOut" }}
              >
                {t("headline_3")}
              </motion.span>
            ) : (
              <span ref={line3Ref} className="heading-glass">
                {t("headline_3")}
              </span>
            )}
          </h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="max-w-3xl text-sm md:text-base lg:text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {t("subheadline")}
        </motion.p>

        {/* CTAs — RTL: ghost first, then primary (reversed visual order) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className={`flex flex-col sm:flex-row gap-4 ${isRtlLocale ? "sm:flex-row-reverse" : ""}`}
        >
          <AnimatedButton
            variant="primary"
            size="lg"
            icon={isRtlLocale ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            iconPosition={isRtlLocale ? "left" : "right"}
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
          >
            {t("cta_primary")}
          </AnimatedButton>
          <AnimatedButton
            variant="ghost"
            size="lg"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            {t("cta_secondary")}
          </AnimatedButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-12 pt-2"
        >
          {[
            { value: "50+", label: t("stats.projects") },
            { value: "5+", label: t("stats.years") },
            { value: "10+", label: t("stats.services") },
            { value: "3", label: t("stats.languages") },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-black" style={{ color: "#FC002A" }}>
                {stat.value}
              </span>
              <span className="text-xs font-medium tracking-wide" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 px-3 py-2 rounded-full"
        style={{ color: "var(--text-muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.52 }}
        transition={{ delay: 2, duration: 0.6 }}
        whileHover={{ opacity: 1 }}
        onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
        aria-label={t("scroll_hint")}
      >
        <MouseScrollIcon />
        <span
          className={`text-[9px] font-medium whitespace-nowrap ${
            isRtlLocale ? "" : "tracking-[0.22em] uppercase"
          }`}
        >
          {t("scroll_hint")}
        </span>
      </motion.button>

      {/* Bottom fade — uses bg-primary so it blends with the next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-2 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--bg-primary) 0%, rgba(255,255,255,0) 100%)" }}
      />
    </section>
  );
}
