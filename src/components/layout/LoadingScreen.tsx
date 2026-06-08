"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useLocale, useTranslations } from "next-intl";

interface LoadingScreenProps {
  progress: number; // 0–100, driven by real section-import progress
  onComplete: () => void;
}

export default function LoadingScreen({ progress, onComplete }: LoadingScreenProps) {
  const t = useTranslations("loading");
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const logoImgRef = useRef<HTMLDivElement>(null);
  const [exiting, setExiting] = useState(false);

  // Logo + tagline entry animation — cosmetic, fixed duration
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (logoImgRef.current)
        gsap.set(logoImgRef.current, { opacity: 0, y: 40, scale: 0.82 });
      if (taglineRef.current)
        gsap.set(taglineRef.current, { opacity: 0, y: 16 });

      const tl = gsap.timeline();

      if (logoImgRef.current) {
        tl.to(logoImgRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (taglineRef.current) {
        tl.to(
          taglineRef.current,
          { opacity: 0.6, y: 0, duration: 0.45, ease: "power2.out" },
          "-=0.3",
        );
      }
    });

    return () => ctx.revert();
  }, [isRtlLocale]);

  // Exit when real progress reaches 100%
  useEffect(() => {
    if (progress < 100) return;
    const holdTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 700);
    }, 400);
    return () => clearTimeout(holdTimer);
  }, [progress, onComplete]);

  const displayProgress = isRtlLocale
    ? "٪" +
      String(progress).replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)])
    : `${progress}%`;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className='loading-screen'
          dir={isRtlLocale ? "rtl" : "ltr"}
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}>
          {/* Background grid */}
          <div className='absolute inset-0 bg-grid-pattern opacity-20' />

          {/* Radial glow */}
          <div
            className='absolute inset-0'
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(252,0,42,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Floating rings */}
          <div
            className='absolute w-64 h-64 rounded-full border border-brand/10 animate-spin-slow'
            style={{ animationDuration: "20s" }}
          />
          <div
            className='absolute w-96 h-96 rounded-full border border-gold/6 animate-spin-slow'
            style={{ animationDuration: "30s", animationDirection: "reverse" }}
          />

          {/* Content */}
          <div className='relative z-10 flex flex-col items-center gap-8 px-8'>
            {/* Logo */}
            <div className='flex flex-col items-center gap-6'>
              <div ref={logoImgRef} className='flex items-center justify-center'>
                <Image
                  src='/images/logo.png'
                  alt='ENTENSY'
                  width={240}
                  height={72}
                  className='h-10 md:h-12 w-auto object-contain'
                  priority
                />
              </div>

              <p
                ref={taglineRef}
                className={`text-sm font-medium opacity-60 ${
                  isRtlLocale ? "" : "tracking-[0.35em] uppercase"
                }`}
                style={{ color: "var(--text-secondary)" }}>
                {t("tagline")}
              </p>
            </div>

            {/* Progress bar */}
            <div className='w-48 md:w-64 flex flex-col items-center gap-6'>
              <div
                className='w-full h-0.5 rounded-full overflow-hidden'
                style={{ background: "var(--border-color)" }}>
                <div
                  className='h-full rounded-full'
                  style={{
                    width: `${progress}%`,
                    transition: "width 0.45s cubic-bezier(0.4,0,0.2,1)",
                    background:
                      "linear-gradient(90deg, #FC002A, #C9A84C, #FC002A)",
                    backgroundSize: "200% 100%",
                    animation: "aurora 2s linear infinite",
                  }}
                />
              </div>
              <span
                className='text-xs font-medium tabular-nums'
                dir='ltr'
                style={{
                  color: "var(--text-muted)",
                  unicodeBidi: "bidi-override",
                }}>
                {displayProgress}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
