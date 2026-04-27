"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useLocale, useTranslations } from "next-intl";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const t = useTranslations("loading");
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const logoImgRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let exitTimer: ReturnType<typeof setTimeout> | null = null;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setExiting(true);
          exitTimer = setTimeout(onComplete, 700);
        },
      });

      // Animate logo image
      if (logoImgRef.current) {
        tl.from(logoImgRef.current, {
          opacity: 0,
          y: 40,
          scale: 0.82,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // Animate tagline
      if (taglineRef.current) {
        tl.from(
          taglineRef.current,
          {
            opacity: 0,
            y: 16,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      // Animate progress bar
      tl.to(
        barRef.current,
        {
          width: "100%",
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: function () {
            setProgress(Math.round(this.progress() * 100));
          },
        },
        "-=0.5"
      );

      tl.to({}, { duration: 0.4 }); // hold
    });

    return () => { ctx.revert(); if (exitTimer) clearTimeout(exitTimer); };
  }, [isRtlLocale, onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="loading-screen"
          dir={isRtlLocale ? "rtl" : "ltr"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />

          {/* Radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(252,0,42,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Floating ring */}
          <div
            className="absolute w-64 h-64 rounded-full border border-brand/10 animate-spin-slow"
            style={{ animationDuration: "20s" }}
          />
          <div
            className="absolute w-96 h-96 rounded-full border border-gold/6 animate-spin-slow"
            style={{ animationDuration: "30s", animationDirection: "reverse" }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-8">
            {/* Logo */}
            <div className="flex flex-col items-center gap-4">
              <div ref={logoImgRef} className="flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="ENTENSY"
                  width={240}
                  height={72}
                  className="h-10 md:h-12 w-auto object-contain"
                  priority
                />
              </div>

              <p
                ref={taglineRef}
                className={`text-sm font-medium opacity-60 ${
                  isRtlLocale ? "" : "tracking-[0.35em] uppercase"
                }`}
                style={{ color: "var(--text-secondary)" }}
              >
                {t("tagline")}
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-48 md:w-64 flex flex-col items-center gap-3">
              <div
                className="w-full h-px rounded-full overflow-hidden"
                style={{ background: "var(--border-color)" }}
              >
                <div
                  ref={barRef}
                  className="h-full rounded-full"
                  style={{
                    width: "0%",
                    background:
                      "linear-gradient(90deg, #FC002A, #C9A84C, #FC002A)",
                    backgroundSize: "200% 100%",
                    animation: "aurora 2s linear infinite",
                  }}
                />
              </div>
              <span
                className="text-xs font-medium tabular-nums"
                style={{ color: "var(--text-muted)" }}
              >
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
