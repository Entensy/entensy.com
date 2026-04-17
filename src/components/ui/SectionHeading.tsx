"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
  titleClassName?: string;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  className,
  align = "center",
  titleClassName,
}: SectionHeadingProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";

  useGSAP(() => {
    if (!titleRef.current) return;

    if (isRtlLocale) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 88%",
            toggleActions: "play none play reset",
          },
        }
      );
      return;
    }

    const split = new SplitText(titleRef.current, { type: "words" });

    gsap.from(split.words, {
      opacity: 0,
      y: 32,
      stagger: 0.06,
      duration: 0.62,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 85%",
        toggleActions: "play none restart reset",
      },
    });

    return () => split.revert();
  }, { scope: containerRef, dependencies: [isRtlLocale, title] });

  const alignClass =
    align === "center"
      ? "text-center items-center"
      : align === "right"
      ? "text-end items-end"
      : "text-start items-start";

  return (
    <div
      ref={containerRef}
      className={cn("flex flex-col gap-4 mb-16", alignClass, className)}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold",
            isRtlLocale ? "" : "tracking-widest uppercase"
          )}
          style={{
            background: "rgba(252,0,42,0.1)",
            border: "1px solid rgba(252,0,42,0.25)",
            color: "#FC002A",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"
            aria-hidden
          />
          {badge}
        </motion.div>
      )}

      <h2
        ref={titleRef}
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight",
          isRtlLocale ? "overflow-visible" : "overflow-hidden",
          "heading-glass",
          titleClassName
        )}
        style={{ perspective: "500px" }}
      >
        {title}
      </h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn(
            "max-w-2xl text-base md:text-lg leading-relaxed",
            "text-(--text-secondary)"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
