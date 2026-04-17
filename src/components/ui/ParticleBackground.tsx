"use client";

import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useState, useEffect } from "react";

interface ParticleBackgroundProps {
  variant?: "default" | "dense" | "sparse" | "network";
  className?: string;
}

let engineInitialized = false;
let initPromise: Promise<void> | null = null;

export default function ParticleBackground({
  variant = "default",
  className = "",
}: ParticleBackgroundProps) {
  // Lazy initializer: if engine already loaded (module-level flag), start as true
  const [init, setInit] = useState(() => engineInitialized);

  useEffect(() => {
    if (engineInitialized) return; // already initialized, useState handled it
    if (!initPromise) {
      initPromise = initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
    }
    // setInit inside .then() is async — not synchronous in the effect body
    initPromise.then(() => {
      engineInitialized = true;
      setInit(true);
    });
  }, []);

  const particleConfigs = {
    default: {
      number: { value: 35, density: { enable: true, value_area: 900 } },
      size: { value: { min: 1, max: 2.5 } },
      opacity: { value: { min: 0.1, max: 0.3 } },
    },
    dense: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      size: { value: { min: 1, max: 2 } },
      opacity: { value: { min: 0.15, max: 0.4 } },
    },
    sparse: {
      number: { value: 20, density: { enable: true, value_area: 1000 } },
      size: { value: { min: 1.5, max: 3 } },
      opacity: { value: { min: 0.05, max: 0.2 } },
    },
    network: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      size: { value: { min: 1, max: 2 } },
      opacity: { value: { min: 0.2, max: 0.5 } },
    },
  };

  const config = particleConfigs[variant];

  if (!init) return null;

  return (
    <Particles
      id={`particles-${variant}`}
      className={`absolute inset-0 ${className}`}
      options={{
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: variant === "network" ? "grab" : "repulse",
            },
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.4 } },
            repulse: { distance: 80 },
          },
        },
        particles: {
          color: { value: ["#FC002A", "#C9A84C", "#7C3AED", "#ffffff"] },
          links:
            variant === "network"
              ? {
                  enable: true,
                  distance: 130,
                  color: "#FC002A",
                  opacity: 0.1,
                  width: 1,
                }
              : { enable: false },
          move: {
            enable: true,
            speed: { min: 0.3, max: 0.8 },
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          number: config.number,
          opacity: config.opacity,
          shape: { type: ["circle", "triangle"] },
          size: config.size,
        },
        detectRetina: true,
        background: { color: "transparent" },
      }}
    />
  );
}
