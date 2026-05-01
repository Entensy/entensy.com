"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

// Cloudflare Turnstile global type
declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "invisible";
        },
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

interface TurnstileProps {
  siteKey: string;
  onToken: (token: string) => void;
  onExpire?: () => void;
  onScriptError?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "invisible";
}

export default function Turnstile({
  siteKey,
  onToken,
  onExpire,
  onScriptError,
  theme = "auto",
  size = "invisible",
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Keep latest callbacks in refs so the widget always calls the current version
  // without the effect having to re-run (and tear down the widget) on every render.
  const onTokenRef = useRef(onToken);
  const onExpireRef = useRef(onExpire);
  const onScriptErrorRef = useRef(onScriptError);
  useLayoutEffect(() => {
    onTokenRef.current = onToken;
    onExpireRef.current = onExpire;
    onScriptErrorRef.current = onScriptError;
  });

  useEffect(() => {
    const render = () => {
      if (!containerRef.current || !window.turnstile) return;
      if (widgetIdRef.current) return; // already rendered
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => onTokenRef.current(token),
        "expired-callback": () => onExpireRef.current?.(),
        "error-callback": () => onScriptErrorRef.current?.(),
        theme,
        size,
      });
    };

    if (window.turnstile) {
      render();
    } else {
      // Lazy-load the Turnstile script only when the form is in view
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = render;
      script.onerror = () => onScriptErrorRef.current?.();
      document.head.appendChild(script);
    }

    // Always clean up - whether the widget was rendered immediately or after script load
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, theme, size]);

  // Invisible mode renders no visible UI - keep in DOM so Cloudflare can attach its iframe
  return (
    <div
      ref={containerRef}
      aria-hidden='true'
      style={
        size === "invisible" ? { display: "none" } : { marginTop: "0.25rem" }
      }
    />
  );
}
