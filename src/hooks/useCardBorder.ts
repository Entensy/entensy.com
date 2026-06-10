"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";

// ---- Shared orbit clock ----
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

const SPOTLIGHT_SPEED_IN = 1200; // px/s - snappy approach to cursor/tap point

// ---- Hook ----

export function useCardBorder(shellRef: React.RefObject<HTMLElement | null>) {
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(false);
  const lastTouchRef = useRef(0);
  const returnTweenRef = useRef<gsap.core.Tween | null>(null);
  const wRef = useRef(0);
  const hRef = useRef(0);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const ring = shell.querySelector<HTMLElement>(".card-border-ring");
    if (!ring) return;

    acquireOrbit();

    // Cache dimensions — reading offsetWidth/offsetHeight every tick forces layout
    wRef.current = shell.offsetWidth;
    hRef.current = shell.offsetHeight;
    const ro = new ResizeObserver(() => {
      wRef.current = shell.offsetWidth;
      hRef.current = shell.offsetHeight;
    });
    ro.observe(shell);

    // Skip tick when card is off-screen — 100px buffer so ring is already
    // in position when the card scrolls into view
    const vio = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { rootMargin: "100px 0px 100px 0px", threshold: 0 },
    );
    vio.observe(shell);

    const tick = () => {
      if (!isVisibleRef.current || isHoveringRef.current) return;
      const W = wRef.current;
      const H = hRef.current;
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
      vio.disconnect();
      ro.disconnect();
      gsap.ticker.remove(tick);
      releaseOrbit();
    };
  }, [shellRef]);

  // Reads the current orbit position from sharedProxy so we can animate to/from it.
  const getOrbitPos = useCallback((_shell: HTMLElement) => {
    const W = wRef.current;
    const H = hRef.current;
    const perim = 2 * (W + H);
    const pos = (sharedProxy.t % 1) * perim;
    if (pos < W) return { mx: pos, my: 0 };
    if (pos < W + H) return { mx: W, my: pos - W };
    if (pos < 2 * W + H) return { mx: W - (pos - W - H), my: H };
    return { mx: 0, my: H - (pos - 2 * W - H) };
  }, []);

  const handleBorderMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      // iOS fires fake mousemove after touchend - ignore events within 600 ms of a touch
      if (Date.now() - lastTouchRef.current < 600) return;
      const shell = shellRef.current;
      if (!shell) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const ring = shell.querySelector<HTMLElement>(".card-border-ring");
      const cursorGlow = shell.querySelector<HTMLElement>(".card-cursor-glow");

      if (!isHoveringRef.current) {
        // First entry: kill any in-progress return tween, then animate from orbit to cursor
        if (returnTweenRef.current) {
          returnTweenRef.current.kill();
          returnTweenRef.current = null;
        }
        isHoveringRef.current = true;

        if (ring) {
          const { mx: fromMx, my: fromMy } = getOrbitPos(shell);
          const dist = Math.hypot(mx - fromMx, my - fromMy);
          const duration = Math.max(0.1, Math.min(0.35, dist / SPOTLIGHT_SPEED_IN));
          const proxy = { mx: fromMx, my: fromMy };
          gsap.to(proxy, {
            mx, my, duration,
            ease: "power2.out",
            overwrite: "auto",
            onUpdate: () => {
              ring.style.setProperty("--mx", proxy.mx + "px");
              ring.style.setProperty("--my", proxy.my + "px");
            },
          });
        }
      } else {
        // Already hovering: follow cursor directly
        if (ring) {
          ring.style.setProperty("--mx", mx + "px");
          ring.style.setProperty("--my", my + "px");
        }
      }

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
    [shellRef, getOrbitPos]
  );

  const handleBorderMouseLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const ring = shell.querySelector<HTMLElement>(".card-border-ring");
    const cursorGlow = shell.querySelector<HTMLElement>(".card-cursor-glow");

    if (cursorGlow) {
      gsap.to(cursorGlow, { opacity: 0, duration: 0.35, ease: "power1.in", overwrite: "auto" });
    }

    if (ring) {
      const fromMx = parseFloat(ring.style.getPropertyValue("--mx") || "0");
      const fromMy = parseFloat(ring.style.getPropertyValue("--my") || "0");
      const proxy = { p: 0 };
      returnTweenRef.current = gsap.to(proxy, {
        p: 1,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto",
        onUpdate: () => {
          // Re-read the live orbit position every frame so we always land on it
          const { mx: toMx, my: toMy } = getOrbitPos(shell);
          ring.style.setProperty("--mx", (fromMx + (toMx - fromMx) * proxy.p) + "px");
          ring.style.setProperty("--my", (fromMy + (toMy - fromMy) * proxy.p) + "px");
        },
        onComplete: () => {
          returnTweenRef.current = null;
          isHoveringRef.current = false;
        },
      });
    } else {
      isHoveringRef.current = false;
    }
  }, [shellRef, getOrbitPos]);

  // Smoothly animates the spotlight from its current orbit position to the touch point.
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLElement>) => {
    const shell = shellRef.current;
    if (!shell) return;
    const touch = e.touches[0];
    const rect = shell.getBoundingClientRect();
    const targetMx = touch.clientX - rect.left;
    const targetMy = touch.clientY - rect.top;

    // Kill any in-progress return animation so its onComplete never fires
    if (returnTweenRef.current) {
      returnTweenRef.current.kill();
      returnTweenRef.current = null;
    }

    // Pause orbit tick immediately
    isHoveringRef.current = true;

    const ring = shell.querySelector<HTMLElement>(".card-border-ring");
    const cursorGlow = shell.querySelector<HTMLElement>(".card-cursor-glow");

    if (ring) {
      // Start from wherever the orbit is right now
      const { mx: fromMx, my: fromMy } = getOrbitPos(shell);
      const dist = Math.hypot(targetMx - fromMx, targetMy - fromMy);
      const duration = Math.max(0.1, Math.min(0.35, dist / SPOTLIGHT_SPEED_IN));
      const proxy = { mx: fromMx, my: fromMy };
      gsap.to(proxy, {
        mx: targetMx,
        my: targetMy,
        duration,
        ease: "power2.out",
        overwrite: "auto",
        onUpdate: () => {
          ring.style.setProperty("--mx", proxy.mx + "px");
          ring.style.setProperty("--my", proxy.my + "px");
        },
      });
    }

    if (cursorGlow) {
      const dist = Math.hypot(targetMx - rect.width / 2, targetMy - rect.height / 2);
      const duration = Math.max(0.1, Math.min(0.35, dist / SPOTLIGHT_SPEED_IN));
      gsap.to(cursorGlow, {
        x: targetMx - rect.width / 2,
        y: targetMy - rect.height / 2,
        opacity: 1,
        duration,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [shellRef, getOrbitPos]);

  // Smoothly animates the spotlight back to the current orbit position, then hands off to the tick.
  // Also records the timestamp to block iOS's simulated mousemove.
  const handleTouchEnd = useCallback(() => {
    lastTouchRef.current = Date.now();
    const shell = shellRef.current;
    if (!shell) return;

    const ring = shell.querySelector<HTMLElement>(".card-border-ring");
    const cursorGlow = shell.querySelector<HTMLElement>(".card-cursor-glow");

    if (cursorGlow) {
      gsap.to(cursorGlow, { opacity: 0, duration: 0.35, ease: "power1.in", overwrite: "auto" });
    }

    if (ring) {
      const fromMx = parseFloat(ring.style.getPropertyValue("--mx") || "0");
      const fromMy = parseFloat(ring.style.getPropertyValue("--my") || "0");
      const proxy = { p: 0 };
      returnTweenRef.current = gsap.to(proxy, {
        p: 1,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto",
        onUpdate: () => {
          const { mx: toMx, my: toMy } = getOrbitPos(shell);
          ring.style.setProperty("--mx", (fromMx + (toMx - fromMx) * proxy.p) + "px");
          ring.style.setProperty("--my", (fromMy + (toMy - fromMy) * proxy.p) + "px");
        },
        onComplete: () => {
          returnTweenRef.current = null;
          isHoveringRef.current = false;
        },
      });
    } else {
      isHoveringRef.current = false;
    }
  }, [shellRef, getOrbitPos]);

  return { handleBorderMouseMove, handleBorderMouseLeave, handleTouchStart, handleTouchEnd };
}
