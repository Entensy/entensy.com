"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { revealVariant } from "@/lib/animations";

export default function Footer() {
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";

  const currentYear = new Date().getFullYear();

  const logoRef    = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const navRef     = useRef<HTMLElement>(null);
  const copyRef    = useRef<HTMLParagraphElement>(null);

  // Footer sits at the very bottom of the page — remove the -8% bottom threshold so
  // elements trigger as soon as they enter the viewport, not 8% deep into it.
  const footerMargin = "-15% 0px 0px 0px";
  const logoState    = useScrollReveal(logoRef,    footerMargin);
  const taglineState = useScrollReveal(taglineRef, footerMargin);
  const navState     = useScrollReveal(navRef,     footerMargin);
  const copyState    = useScrollReveal(copyRef,    footerMargin);

  const navLinks = [
    { key: "services", href: "#services" },
    { key: "solutions", href: "#solutions" },
    { key: "stacks", href: "#stacks" },
    { key: "portfolio", href: "#portfolio" },
    { key: "about", href: "#about" },
    { key: "contact", href: "#contact" },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
      dir={isRtlLocale ? "rtl" : "ltr"}
    >
      {/* Top border gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(252,0,42,0.4), rgba(201,168,76,0.4), transparent)",
        }}
      />

      <div
        className="section-inner py-12 px-[clamp(1.25rem,5vw,5rem)]"
        style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      >
        <div className={`flex flex-col ${isRtlLocale ? "lg:flex-row-reverse" : "lg:flex-row"} items-center justify-between gap-8`}>
          {/* Logo + tagline */}
          <div className={`flex flex-col items-center ${isRtlLocale ? "lg:items-end" : "lg:items-start"} gap-3`}>
            <motion.div
              ref={logoRef}
              variants={revealVariant}
              initial="below"
              animate={logoState}
              className={`flex items-center gap-2 ${isRtlLocale ? "flex-row-reverse" : ""}`}
            >
              <Image
                src="/images/logo.png"
                alt="ENTENSY"
                width={100}
                height={30}
                className="h-5 w-auto object-contain"
              />
              <span className="text-lg font-black tracking-tight heading-glass">
                {tNav("brand")}
              </span>
            </motion.div>
            <motion.p
              ref={taglineRef}
              variants={revealVariant}
              initial="below"
              animate={taglineState}
              className="text-xs font-medium tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {tFooter("tagline")}
            </motion.p>
          </div>

          {/* Nav links */}
          <motion.nav
            ref={navRef}
            variants={revealVariant}
            initial="below"
            animate={navState}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-xs font-medium transition-colors duration-200 text-(--text-muted) hover:text-brand active:text-brand-dark"
              >
                {tNav(link.key as Parameters<typeof tNav>[0])}
              </a>
            ))}
          </motion.nav>

          {/* Copyright */}
          <motion.p
            ref={copyRef}
            variants={revealVariant}
            initial="below"
            animate={copyState}
            className={`text-xs text-center ${isRtlLocale ? "lg:text-start" : "lg:text-end"}`}
            style={{ color: "var(--text-muted)" }}
          >
            © {currentYear} {tNav("brand")}. {tFooter("rights")}
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
