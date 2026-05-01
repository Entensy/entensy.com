"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(252,0,42,0.10) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute -top-20 -left-20 w-100 h-100 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(97,78,198,0.09) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-100 h-100 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(97,78,198,0.09) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-5 px-6 max-w-xl mx-auto w-full">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-2"
        >
          <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="ENTENSY"
            width={120}
            height={36}
            className="h-7 w-auto object-contain"
            priority
          />
          <span
            className="text-sm font-black select-none"
            style={{ color: "rgba(218,213,255,0.75)", letterSpacing: "0.18em" }}
          >
            ENTENSY
          </span>
          </Link>
        </motion.div>

        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="block text-[9rem] sm:text-[12rem] font-black leading-none select-none"
            style={{
              color: "#FC002A",
              textShadow:
                "0 0 60px rgba(252,0,42,0.45), 0 0 120px rgba(252,0,42,0.20), 0 0 2px rgba(252,0,42,0.9)",
            }}
          >
            404
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="w-16 h-px"
          style={{ background: "rgba(252,0,42,0.45)" }}
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="heading-glass text-2xl sm:text-3xl font-black tracking-tight"
        >
          Page Not Found
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-sm sm:text-base leading-relaxed max-w-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 mt-2"
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #FC002A, #C8001F)",
              boxShadow: "0 4px 20px rgba(252,0,42,0.35)",
            }}
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <Link
            href="/#contact"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-colors hover:border-[rgba(252,0,42,0.4)]"
            style={{
              color: "var(--text-secondary)",
              borderColor: "var(--border-color)",
            }}
          >
            Contact Us
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)" }}
      />
    </div>
  );
}
