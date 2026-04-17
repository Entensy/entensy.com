"use client";

import { createContext, useContext, useState } from "react";

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

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("entensy-theme") === "light" ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);

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
