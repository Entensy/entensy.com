"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { cardEntranceVariant } from "@/lib/animations";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  animate = true,
  delay = 0,
  style,
  onClick,
}: GlassCardProps) {
  const Component = animate ? motion.div : "div";

  const motionProps = animate
    ? {
        variants: cardEntranceVariant,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-60px" },
        transition: { delay },
      }
    : {};

  return (
    <Component
      className={cn("glass-card", className)}
      style={style}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Component>
  );
}
