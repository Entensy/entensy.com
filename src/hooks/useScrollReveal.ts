"use client";
import { useEffect, useRef, useState } from "react";

export type RevealState = "below" | "visible" | "above";

// Direction-aware scroll hook.
// "below"  — element hasn't entered the viewport yet (or exited from the bottom on scroll-up)
// "visible" — element is in the active trigger zone
// "above"   — element has been scrolled past the top (exits then re-enters from the top when user scrolls back)
//
// rootMargin: shrinks the effective viewport so:
//   - entrance fires when element is ~8% into the viewport from the bottom
//   - exit fires when element has mostly left the top (~15% of viewport still showing)
// This gives entrance animations a natural lead-in and prevents the top-edge flicker.
export function useScrollReveal(
  ref: React.RefObject<Element | null>,
  rootMargin = "-5% 0px 10% 0px"
): RevealState {
  const [state, setState] = useState<RevealState>("below");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
        } else {
          // Use rootBounds (virtual viewport with rootMargin applied) so small elements
          // that exit the top margin zone while still inside the actual viewport are
          // correctly classified as "above" rather than "below".
          const isAbove = entry.rootBounds
            ? entry.boundingClientRect.bottom < entry.rootBounds.top
            : entry.boundingClientRect.top < 0;
          setState(isAbove ? "above" : "below");
        }
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // rootMargin intentionally stable — consumers pass a literal string
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
