"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMaxAngle?: number;
  scale?: number;
}

export default function TiltCard({
  children,
  className,
  tiltMaxAngle = 8,
  scale = 1.02,
}: TiltCardProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(innerRef.current, {
      rotateY: cx * tiltMaxAngle * 2,
      rotateX: -cy * tiltMaxAngle * 2,
      scale,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(innerRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      className={cn("tilt-card h-full", className)}
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={innerRef}
        className="tilt-card-inner h-full"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  );
}
