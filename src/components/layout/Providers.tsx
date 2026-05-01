"use client";

import { useEffect } from "react";
import { ThemeProvider } from "@/components/layout/ThemeContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Prevent browser from restoring scroll position on refresh/back-navigation
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return <ThemeProvider>{children}</ThemeProvider>;
}
