"use client";

import { useState, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeSection from "@/components/sections/HomeSection";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LoadingScreen from "@/components/layout/LoadingScreen";

// Below-fold sections — split into separate JS chunks, fetched in parallel on load
const ServicesSection  = dynamic(() => import("@/components/sections/ServicesSection"));
const SolutionsSection = dynamic(() => import("@/components/sections/SolutionsSection"));
const StacksSection    = dynamic(() => import("@/components/sections/StacksSection"));
const PortfolioSection = dynamic(() => import("@/components/sections/PortfolioSection"));
const AboutSection     = dynamic(() => import("@/components/sections/AboutSection"));
const ContactSection   = dynamic(() => import("@/components/sections/ContactSection"));
const SocialsSection   = dynamic(() => import("@/components/sections/SocialsSection"));

const SESSION_LOCALE_KEY = "entensy:loaded-locale";

const LANG_SWITCHING_KEY = "entensy:lang-switching";

// Runs synchronously during the first render (before any commit or paint).
// Returns true when the loading screen should be skipped.
// Always shows on: hard reload, first ever visit, language switch.
function shouldSkipLoading(): boolean {
  if (typeof window === "undefined") return false; // SSR — always show
  // Language switcher sets this flag before navigating — always show the loading screen
  if (window.sessionStorage.getItem(LANG_SWITCHING_KEY)) {
    window.sessionStorage.removeItem(LANG_SWITCHING_KEY);
    return false;
  }
  const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  const isReload = navEntry?.type === "reload";
  return !isReload && !!window.sessionStorage.getItem(SESSION_LOCALE_KEY);
}

export default function HomePage() {
  const locale = useLocale();
  // Lazy initializer runs synchronously on first render. If it returns true, isLoaded/showContent
  // start as true and the LoadingScreen is never added to the tree at all — no AnimatePresence
  // exit flash, no layout shift, no scroll-lock flicker.
  const [isLoaded, setIsLoaded] = useState(shouldSkipLoading);
  const [showContent, setShowContent] = useState(shouldSkipLoading);

  // Lock scroll before first paint on every case that shows the loading screen.
  // The inline script in layout.tsx covers hard loads; this useLayoutEffect covers SPA navigations
  // (language switches) where the inline script doesn't re-run.
  useLayoutEffect(() => {
    if (!isLoaded) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.pointerEvents = "none";
    } else {
      document.documentElement.style.overflow = "";
      document.documentElement.style.pointerEvents = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.pointerEvents = "";
      document.getElementById("lang-switch-cover")?.remove();
    };
  }, [isLoaded]);

  const handleLoadingComplete = () => {
    document.getElementById("lang-switch-cover")?.remove();
    window.sessionStorage.setItem(SESSION_LOCALE_KEY, locale);
    setIsLoaded(true);
    setTimeout(() => setShowContent(true), 80);
  };

  return (
    <>
      {/* Loading Screen */}
      {!isLoaded && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Theme Toggle (fixed bottom-right) */}
      <ThemeToggle />

      {/* Main Content */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <Navbar />

        <main>
          <HomeSection />
          <ServicesSection />
          <SolutionsSection />
          <StacksSection />
          <PortfolioSection />
          <AboutSection />
          <ContactSection />
          <SocialsSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
