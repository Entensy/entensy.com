"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Generated once at module level — Math.random() must not run during render
// Reduced from 1800 → 600 points for ~65% GPU savings with no visible difference
const GLOBE_POSITIONS = (() => {
  const count = 600;
  const positions = new Float32Array(count * 3);
  const radius = 1.4;
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
})();

function GlobePoints() {
  const ref = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.08;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={GLOBE_POSITIONS} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#FC002A"
        size={0.005}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

function GlobeWireframe() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.z += delta * 0.01;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.4, 24, 24]} />
      <meshBasicMaterial
        color="#FC002A"
        wireframe
        transparent
        opacity={0.04}
      />
    </mesh>
  );
}

function FloatingIcosahedron() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15;
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.6, 1]} />
      <meshBasicMaterial color="#C9A84C" wireframe transparent opacity={0.25} />
    </mesh>
  );
}

interface GlobeBackgroundProps {
  showIcosahedron?: boolean;
  opacity?: number;
}

export default function GlobeBackground({
  showIcosahedron = false,
  opacity = 1,
}: GlobeBackgroundProps) {
  // Suppress THREE.Clock deprecation warning emitted by @react-three/fiber internals
  useEffect(() => {
    const originalWarn = console.warn.bind(console);
    console.warn = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
      originalWarn(...args);
    };
    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: typeof window !== "undefined" && window.innerWidth >= 768, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <GlobeWireframe />
        <GlobePoints />
        {showIcosahedron && <FloatingIcosahedron />}
      </Canvas>
    </div>
  );
}
