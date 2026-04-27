"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

// Omit conflicting Framer Motion event handlers from HTML button props
type SafeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"
>;

interface AnimatedButtonProps extends SafeButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#FC002A] text-white shadow-[0_0_22px_rgba(252,0,42,0.28)]",
  secondary:
    "bg-[#C9A84C] text-[#0D0A1E] shadow-[0_0_22px_rgba(201,168,76,0.28)]",
  ghost:
    "bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[rgba(252,0,42,0.45)] hover:bg-[rgba(252,0,42,0.05)]",
  outline:
    "bg-transparent text-[#FC002A] border border-[#FC002A] hover:bg-[rgba(252,0,42,0.12)] hover:text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "right",
      className,
      disabled,
      children,
      href,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const content = (
      <>
        {/* Shimmer overlay */}
        <span
          className="absolute inset-0 overflow-hidden rounded-[inherit]"
          aria-hidden
        >
          <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </span>

        {/* Icon left */}
        {icon && iconPosition === "left" && (
          <span className="relative z-10 shrink-0">{icon}</span>
        )}

        {/* Label */}
        <span className="relative z-10 font-semibold tracking-wide">
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              {children}
            </span>
          ) : (
            children
          )}
        </span>

        {/* Icon right */}
        {icon && iconPosition === "right" && !loading && (
          <span className="relative z-10 shrink-0">{icon}</span>
        )}
      </>
    );

    const commonClassName = cn(
      "relative group inline-flex items-center justify-center gap-2 rounded-full font-medium overflow-hidden transition-colors duration-300 will-change-transform",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC002A] focus-visible:ring-offset-2",
      "select-none",
      variantStyles[variant],
      sizeStyles[size],
      isDisabled
        ? "opacity-40 pointer-events-none cursor-not-allowed"
        : "cursor-pointer",
      className
    );

    const isPrimary = variant === "primary";
    const isSecondary = variant === "secondary";
    const hoverAnim =
      isPrimary || isSecondary
        ? { scale: 1.03, y: -1, filter: "brightness(0.88)" }
        : { scale: 1.04, y: -1.5 };
    const tapAnim = { scale: 0.97, y: 0 };
    const springTransition = { type: "spring", stiffness: 400, damping: 20 };

    if (href && !isDisabled) {
      return (
        <motion.a
          href={href}
          className={commonClassName}
          whileHover={hoverAnim}
          whileTap={tapAnim}
          transition={springTransition}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={commonClassName}
        disabled={isDisabled}
        whileHover={isDisabled ? {} : hoverAnim}
        whileTap={isDisabled ? {} : tapAnim}
        transition={springTransition}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
export default AnimatedButton;
