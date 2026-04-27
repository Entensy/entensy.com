"use client";

import { useState, useEffect, useLayoutEffect } from "react";
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

export default function HomePage() {
  const locale = useLocale();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Runs before first paint — skips loading screen on return visits without a visible flash
  useLayoutEffect(() => {
    const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isReload = navEntry?.type === "reload";
    const lastLocale = window.sessionStorage.getItem(SESSION_LOCALE_KEY);
    const alreadyLoaded = !isReload && lastLocale === locale;
    if (alreadyLoaded) {
      setIsLoaded(true);
      setShowContent(true);
    }
  }, [locale]);

  // Lock scroll while loading screen is active.
  // Use overflow-y: scroll (not hidden) so the scrollbar gutter stays reserved — prevents layout shift in RTL
  // where the scrollbar is on the left side. Pointer events are already disabled, so user can't actually scroll.
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflowY = "scroll";
      document.body.style.pointerEvents = "none";
    } else {
      document.body.style.overflowY = "";
      document.body.style.pointerEvents = "";
    }
    return () => {
      document.body.style.overflowY = "";
      document.body.style.pointerEvents = "";
    };
  }, [isLoaded]);

  const handleLoadingComplete = () => {
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
