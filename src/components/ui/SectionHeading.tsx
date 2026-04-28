"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { revealVariant } from "@/lib/animations";

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
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";

  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const badgeState = useScrollReveal(badgeRef as React.RefObject<Element | null>);
  const titleState = useScrollReveal(titleRef as React.RefObject<Element | null>);
  const subtitleState = useScrollReveal(subtitleRef as React.RefObject<Element | null>);

  const alignClass =
    align === "center"
      ? "text-center items-center"
      : align === "right"
      ? "text-end items-end"
      : "text-start items-start";

  return (
    <div className={cn("flex flex-col gap-4 mb-16", alignClass, className)}>
      {badge && (
        <motion.div
          ref={badgeRef}
          variants={revealVariant}
          initial="below"
          animate={badgeState}
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

      <motion.h2
        ref={titleRef}
        variants={revealVariant}
        initial="below"
        animate={titleState}
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight",
          "heading-glass",
          titleClassName
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          ref={subtitleRef}
          variants={revealVariant}
          initial="below"
          animate={subtitleState}
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
