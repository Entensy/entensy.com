import type { Variants } from "framer-motion";

// ---- Legacy variants ----
// Still used by elements that rely on whileInView (GSAP headings, CTA strips, etc.)

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainerVariant: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const cardEntranceVariant: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideInLeftVariant: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideInRightVariant: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scalePopVariant: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

// ─── Directional reveal variants ─────────────────────────────────────────────
// Three animation states, used with useScrollReveal:
//   animate={revealState}  initial="below"
//
// "below"   entry from bottom (first scroll-down): fade + rise up
// "visible" in the trigger zone: fully shown
// "above"   exited/re-entering from top: snap out up quickly,
//           then fade in gently on scroll-back-up
//
// Exit transitions (to "above") are short so the element clears the viewport
// edge before the user notices; entrance is leisurely for polish.

export const revealVariant: Variants = {
  below: { opacity: 0, y: 28 },
  above: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.22, ease: "easeIn" },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export const cardRevealVariant: Variants = {
  below: { opacity: 0, y: 34, scale: 0.97 },
  above: {
    opacity: 0,
    y: -14,
    scale: 0.97,
    transition: { duration: 0.22, ease: "easeIn" },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// Stagger parent — place on a motion.div wrapping multiple reveal children.
// Stagger only fires on entrance ("visible"); exit is simultaneous (fast).
export const staggerRevealContainer: Variants = {
  below: {},
  above: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.02 },
  },
};

// Slide in from left on first entry (scroll-down), fade from above on re-entry.
// Exit is always a quick fade-up so there's no jarring leftward snap on scroll-up.
export const slideRevealLeftVariant: Variants = {
  below: { opacity: 0, x: -50, y: 0 },
  above: {
    opacity: 0,
    x: 0,
    y: -16,
    transition: { duration: 0.22, ease: "easeIn" },
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideRevealRightVariant: Variants = {
  below: { opacity: 0, x: 50, y: 0 },
  above: {
    opacity: 0,
    x: 0,
    y: -16,
    transition: { duration: 0.22, ease: "easeIn" },
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Viewport config for whileInView ─────────────────────────────────────────
// margin: exit when ~15% of viewport height is still showing at the top
//         (prevents top-edge flicker); enter when element is 8% into
//         the viewport from the bottom (natural lead-in before fully visible).
// amount: 0.05 avoids sub-pixel jitter at the exact threshold boundary.
export const viewportOnce = { once: false, margin: "-15% 0px -5% 0px", amount: 0.05 };
