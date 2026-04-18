"use client";

import { ThemeProvider } from "@/components/layout/ThemeContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
