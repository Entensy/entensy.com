"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMaxAngle?: number;
  scale?: number;
}

const reset = (el: HTMLDivElement | null) => {
  gsap.to(el, {
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    duration: 0.5,
    ease: "power3.out",
    overwrite: "auto",
  });
};

export default function TiltCard({
  children,
  className,
  tiltMaxAngle = 8,
  scale = 1.02,
}: TiltCardProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const isTouching = useRef(false);
  const touchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (touchTimer.current) clearTimeout(touchTimer.current); }, []);

  const tiltTo = (rect: DOMRect, clientX: number, clientY: number) => {
    const cx = (clientX - rect.left) / rect.width - 0.5;
    const cy = (clientY - rect.top) / rect.height - 0.5;
    gsap.to(innerRef.current, {
      rotateY: cx * tiltMaxAngle * 2,
      rotateX: -cy * tiltMaxAngle * 2,
      scale,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouching.current) return;
    tiltTo(e.currentTarget.getBoundingClientRect(), e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    if (isTouching.current) return;
    reset(innerRef.current);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isTouching.current = true;
    const touch = e.touches[0];
    tiltTo(e.currentTarget.getBoundingClientRect(), touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    tiltTo(e.currentTarget.getBoundingClientRect(), touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    reset(innerRef.current);
    if (touchTimer.current) clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => { isTouching.current = false; }, 300);
  };

  return (
    <div
      className={cn("tilt-card h-full", className)}
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div
        ref={innerRef}
        className="tilt-card-inner h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}
