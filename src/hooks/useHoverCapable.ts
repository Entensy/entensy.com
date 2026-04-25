"use client";

import { useState, useEffect } from "react";

// Returns true only on devices that support real hover (mouse/trackpad).
// On touch-only devices returns false so whileHover props can be skipped,
// preventing Framer Motion hover state from getting stuck after tap.
export function useHoverCapable(): boolean {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);
  return canHover;
}
