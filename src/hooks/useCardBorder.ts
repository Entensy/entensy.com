"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";

// ─── Shared orbit clock ────────────────────────────────────────────────────────
// One tween drives all cards. Each card reads from sharedProxy.t via a ticker
// so they're always in the same phase regardless of mount order/timing.

const sharedProxy = { t: 0 };
let sharedTween: gsap.core.Tween | null = null;
let refCount = 0;

function acquireOrbit() {
  refCount++;
  if (!sharedTween) {
    sharedTween = gsap.to(sharedProxy, {
      t: 1,
      duration: 10,
      repeat: -1,
      ease: "none",
    });
  }
}

function releaseOrbit() {
  refCount--;
  if (refCount === 0 && sharedTween) {
    sharedTween.kill();
    sharedTween = null;
    sharedProxy.t = 0;
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCardBorder(shellRef: React.RefObject<HTMLElement | null>) {
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const ring = shell.querySelector<HTMLElement>(".card-border-ring");
    if (!ring) return;

    acquireOrbit();

    const tick = () => {
      if (isHoveringRef.current) return;
      const W = shell.offsetWidth;
      const H = shell.offsetHeight;
      const perim = 2 * (W + H);
      const pos = (sharedProxy.t % 1) * perim;
      let mx: number, my: number;
      if (pos < W) {
        mx = pos; my = 0;
      } else if (pos < W + H) {
        mx = W; my = pos - W;
      } else if (pos < 2 * W + H) {
        mx = W - (pos - W - H); my = H;
      } else {
        mx = 0; my = H - (pos - 2 * W - H);
      }
      ring.style.setProperty("--mx", mx + "px");
      ring.style.setProperty("--my", my + "px");
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      releaseOrbit();
    };
  }, [shellRef]);

  const handleBorderMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const shell = shellRef.current;
      if (!shell) return;
      isHoveringRef.current = true;

      const rect = e.currentTarget.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const ring = shell.querySelector<HTMLElement>(".card-border-ring");
      if (ring) {
        ring.style.setProperty("--mx", mx + "px");
        ring.style.setProperty("--my", my + "px");
      }

      const cursorGlow = shell.querySelector<HTMLElement>(".card-cursor-glow");
      if (cursorGlow) {
        gsap.to(cursorGlow, {
          x: mx - rect.width / 2,
          y: my - rect.height / 2,
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    },
    [shellRef]
  );

  const handleBorderMouseLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell) return;
    isHoveringRef.current = false;

    const cursorGlow = shell.querySelector<HTMLElement>(".card-cursor-glow");
    if (cursorGlow) {
      gsap.to(cursorGlow, {
        opacity: 0,
        duration: 0.35,
        ease: "power1.in",
        overwrite: "auto",
      });
    }
  }, [shellRef]);

  return { handleBorderMouseMove, handleBorderMouseLeave };
}
