"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  resolvedTheme: Theme;
  setTheme: (t: Theme) => void;
}>({
  theme: "dark",
  resolvedTheme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start with "dark" so SSR and client initial render match.
  // The inline script in layout.tsx already applied the correct class to <html>
  // before React hydrates, so CSS-variable-based styling is correct immediately.
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const actual = document.documentElement.classList.contains("dark") ? "dark" : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (actual !== theme) setThemeState(actual);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("entensy-theme", t);
    document.documentElement.classList.toggle("dark", t === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme: theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
