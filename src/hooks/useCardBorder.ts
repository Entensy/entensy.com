"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Card border spotlight + cursor glow hook.
 * Idle: spotlight orbits the perimeter (10 s/rev) via CSS --mx/--my.
 * Hover: orbit pauses, spotlight snaps to cursor; cursor glow follows mouse.
 * Leave: orbit resumes; cursor glow fades.
 */
export function useCardBorder(shellRef: React.RefObject<HTMLElement | null>) {
  const idleAnimRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const ring = shell.querySelector<HTMLElement>(".card-border-ring");

    // Border spotlight: orbits the card perimeter via CSS custom properties
    if (ring) {
      const W = shell.offsetWidth;
      const H = shell.offsetHeight;
      const perim = 2 * (W + H);
      // Normalize to ~60 px/s so all card sizes orbit at the same angular speed
      const duration = Math.max(6, perim / 60);
      const proxy = { t: 0 };
      idleAnimRef.current = gsap.to(proxy, {
        t: 1,
        duration,
        repeat: -1,
        ease: "none",
        onUpdate() {
          const perim = 2 * (shell.offsetWidth + shell.offsetHeight);
          const dist = proxy.t % 1;
          const pos = dist * perim;
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
        },
      });
    }

    return () => {
      idleAnimRef.current?.kill();
      idleAnimRef.current = null;
    };
  }, [shellRef]);

  // Hover: pause idle orbit, snap spotlight to cursor, move cursor glow
  const handleBorderMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const shell = shellRef.current;
      if (!shell) return;

      idleAnimRef.current?.pause();

      const rect = e.currentTarget.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const W = rect.width;
      const H = rect.height;

      const ring = shell.querySelector<HTMLElement>(".card-border-ring");
      if (ring) {
        ring.style.setProperty("--mx", mx + "px");
        ring.style.setProperty("--my", my + "px");
      }

      const cursorGlow = shell.querySelector<HTMLElement>(".card-cursor-glow");
      if (cursorGlow) {
        gsap.to(cursorGlow, {
          x: mx - W / 2,
          y: my - H / 2,
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    },
    [shellRef]
  );

  // Leave: resume orbit, fade cursor glow
  const handleBorderMouseLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell) return;

    idleAnimRef.current?.resume();

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
