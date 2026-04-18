"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeSection from "@/components/sections/HomeSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import StacksSection from "@/components/sections/StacksSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import SocialsSection from "@/components/sections/SocialsSection";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LoadingScreen from "@/components/layout/LoadingScreen";

const SESSION_LOADED_KEY = "entensy:first-load-complete";

export default function HomePage() {
  const [ready, setReady] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Defer setState out of the synchronous effect body (React 19 rule)
    Promise.resolve().then(() => {
      const hasLoadedBefore = window.sessionStorage.getItem(SESSION_LOADED_KEY) === "1";
      setIsLoaded(hasLoadedBefore);
      setShowContent(hasLoadedBefore);
      setReady(true);
    });
  }, []);

  // Lock scroll and pointer events while loading screen is active
  useEffect(() => {
    if (!ready) return;

    if (!isLoaded) {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    };
  }, [isLoaded, ready]);

  const handleLoadingComplete = () => {
    window.sessionStorage.setItem(SESSION_LOADED_KEY, "1");
    setIsLoaded(true);
    setTimeout(() => setShowContent(true), 80);
  };

  if (!ready) return null;

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
