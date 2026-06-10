"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeSection from "@/components/sections/HomeSection";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LoadingScreen from "@/components/layout/LoadingScreen";

// Below-fold sections — split into separate JS chunks, fetched in parallel on load
const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection"),
);
const SolutionsSection = dynamic(
  () => import("@/components/sections/SolutionsSection"),
);
const StacksSection = dynamic(
  () => import("@/components/sections/StacksSection"),
);
const PortfolioSection = dynamic(
  () => import("@/components/sections/PortfolioSection"),
);
const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection"),
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
);
const SocialsSection = dynamic(
  () => import("@/components/sections/SocialsSection"),
);

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Drive progress bar to 95% over FILL_MS using setInterval (fires in any tab
  // visibility state, unlike requestAnimationFrame which is throttled when backgrounded),
  // then jump to 100% once sections are loaded and the minimum time has passed.
  useEffect(() => {
    const FILL_MS = 1000;
    const start = Date.now();
    let canceled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const intervalId = setInterval(() => {
      if (canceled) { clearInterval(intervalId); return; }
      const pct = Math.min(95, Math.round(((Date.now() - start) / FILL_MS) * 95));
      setLoadProgress(pct);
      if (pct >= 95) clearInterval(intervalId);
    }, 50);

    Promise.allSettled([
      import("@/components/sections/ServicesSection"),
      import("@/components/sections/SolutionsSection"),
      import("@/components/sections/StacksSection"),
      import("@/components/sections/PortfolioSection"),
      import("@/components/sections/AboutSection"),
      import("@/components/sections/ContactSection"),
      import("@/components/sections/SocialsSection"),
    ]).then(() => {
      const wait = Math.max(0, FILL_MS - (Date.now() - start));
      timeoutId = setTimeout(() => { setLoadProgress(100); }, wait);
    });

    return () => {
      canceled = true;
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleLoadingComplete = useCallback(() => {
    document.getElementById("lang-switch-cover")?.remove();
    setIsLoaded(true);
    setTimeout(() => setShowContent(true), 80);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {!isLoaded && (
        <LoadingScreen
          progress={loadProgress}
          onComplete={handleLoadingComplete}
        />
      )}

      {/* Theme Toggle (fixed bottom-right) */}
      <ThemeToggle />

      {/* Main Content */}
      <div
        id="page-content"
        suppressHydrationWarning
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}>
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
