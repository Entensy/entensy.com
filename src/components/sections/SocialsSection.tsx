"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";
import SectionHeading from "@/components/ui/SectionHeading";
import { useCardBorder } from "@/hooks/useCardBorder";
import {
  staggerContainerVariant,
  cardEntranceVariant,
  viewportOnce,
} from "@/lib/animations";

// Official brand colors & correct gradients
const socialLinks = [
  {
    id: "facebook",
    icon: FaFacebook,
    label: "Facebook",
    handle: "@entensy",
    href: "https://facebook.com/entensy",
    color: "#1877F2",
    iconColor: "#1877F2",
    bgFrom: "rgba(24,119,242,0.14)",
    bgTo: "rgba(24,119,242,0.05)",
    bgHoverFrom: "rgba(24,119,242,0.28)",
    bgHoverTo: "rgba(24,119,242,0.12)",
    shadowColor: "rgba(24,119,242,0.28)",
    borderBase: "rgba(24,119,242,0.18)",
    borderHover: "rgba(24,119,242,0.5)",
  },
  {
    id: "instagram",
    icon: FaInstagram,
    label: "Instagram",
    handle: "@entensy",
    href: "https://instagram.com/entensy",
    color: "#E1306C",
    iconColor: "url(#ig-gradient)",
    bgFrom: "rgba(252,175,69,0.08)",
    bgTo: "rgba(131,58,180,0.08)",
    bgHoverFrom: "rgba(252,175,69,0.18)",
    bgHoverTo: "rgba(131,58,180,0.16)",
    shadowColor: "rgba(225,48,108,0.28)",
    borderBase: "rgba(225,48,108,0.2)",
    borderHover: "rgba(225,48,108,0.5)",
  },
  {
    id: "x",
    icon: FaXTwitter,
    label: "X (Twitter)",
    handle: "@entensy",
    href: "https://x.com/entensy",
    color: "#E7E9EA",
    iconColor: "#E7E9EA",
    bgFrom: "rgba(231,233,234,0.08)",
    bgTo: "rgba(100,100,100,0.04)",
    bgHoverFrom: "rgba(231,233,234,0.15)",
    bgHoverTo: "rgba(120,120,120,0.08)",
    shadowColor: "rgba(231,233,234,0.18)",
    borderBase: "rgba(231,233,234,0.12)",
    borderHover: "rgba(231,233,234,0.32)",
  },
  {
    id: "tiktok",
    icon: FaTiktok,
    label: "TikTok",
    handle: "@entensy",
    href: "https://tiktok.com/@entensy",
    // Official TikTok: black icon, red/cyan accents
    color: "#EE1D52",
    iconColor: "#010101",
    bgFrom: "rgba(238,29,82,0.08)",
    bgTo: "rgba(105,201,208,0.06)",
    bgHoverFrom: "rgba(238,29,82,0.18)",
    bgHoverTo: "rgba(105,201,208,0.12)",
    shadowColor: "rgba(238,29,82,0.22)",
    borderBase: "rgba(238,29,82,0.16)",
    borderHover: "rgba(238,29,82,0.45)",
  },
  {
    id: "youtube",
    icon: FaYoutube,
    label: "YouTube",
    handle: "@entensy",
    href: "https://youtube.com/@entensy",
    color: "#FF0000",
    iconColor: "#FF0000",
    bgFrom: "rgba(255,0,0,0.12)",
    bgTo: "rgba(200,0,0,0.04)",
    bgHoverFrom: "rgba(255,0,0,0.24)",
    bgHoverTo: "rgba(200,0,0,0.10)",
    shadowColor: "rgba(255,0,0,0.25)",
    borderBase: "rgba(255,0,0,0.16)",
    borderHover: "rgba(255,0,0,0.45)",
  },
  {
    id: "linkedin",
    icon: FaLinkedin,
    label: "LinkedIn",
    handle: "@entensy",
    href: "https://linkedin.com/company/entensy",
    color: "#0A66C2",
    iconColor: "#0A66C2",
    bgFrom: "rgba(10,102,194,0.14)",
    bgTo: "rgba(10,102,194,0.05)",
    bgHoverFrom: "rgba(10,102,194,0.28)",
    bgHoverTo: "rgba(10,102,194,0.12)",
    shadowColor: "rgba(10,102,194,0.28)",
    borderBase: "rgba(10,102,194,0.18)",
    borderHover: "rgba(10,102,194,0.5)",
  },
];

// Watermark icon positions (18 distributed across the section)
const WATERMARK_POSITIONS = [
  { left: "4%",  top: "8%",  dur: "18s", delay: "0s"   },
  { left: "18%", top: "72%", dur: "22s", delay: "1.5s" },
  { left: "32%", top: "20%", dur: "16s", delay: "3s"   },
  { left: "45%", top: "82%", dur: "20s", delay: "0.8s" },
  { left: "58%", top: "12%", dur: "24s", delay: "2.2s" },
  { left: "72%", top: "65%", dur: "17s", delay: "4s"   },
  { left: "84%", top: "28%", dur: "19s", delay: "1s"   },
  { left: "92%", top: "78%", dur: "21s", delay: "3.5s" },
  { left: "10%", top: "45%", dur: "15s", delay: "5s"   },
  { left: "24%", top: "90%", dur: "23s", delay: "2s"   },
  { left: "38%", top: "50%", dur: "18s", delay: "0.5s" },
  { left: "52%", top: "35%", dur: "20s", delay: "4.5s" },
  { left: "65%", top: "88%", dur: "16s", delay: "1.8s" },
  { left: "78%", top: "42%", dur: "22s", delay: "3s"   },
  { left: "88%", top: "10%", dur: "19s", delay: "0.2s" },
  { left: "14%", top: "28%", dur: "17s", delay: "6s"   },
  { left: "50%", top: "60%", dur: "21s", delay: "2.8s" },
  { left: "75%", top: "18%", dur: "23s", delay: "1.2s" },
];

// Follow pill positions
const FOLLOW_POSITIONS = [
  { left: "8%",  top: "35%", dur: "20s", delay: "2s"   },
  { left: "30%", top: "55%", dur: "17s", delay: "5s"   },
  { left: "55%", top: "22%", dur: "22s", delay: "1s"   },
  { left: "70%", top: "78%", dur: "19s", delay: "3s"   },
  { left: "86%", top: "48%", dur: "21s", delay: "4s"   },
  { left: "42%", top: "68%", dur: "18s", delay: "0.5s" },
];

const CSS = `
  .soc-shell .card-border-ring {
    opacity: 0.45;
    transition: opacity 0.25s ease, filter 0.25s ease;
  }
  .soc-shell:hover .card-border-ring {
    opacity: 1;
    filter: saturate(1.5) brightness(1.4);
  }
`;

// SVG gradient def for Instagram icon
const InstagramGradientDef = () => (
  <svg width="0" height="0" style={{ position: "absolute" }}>
    <defs>
      <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#FCAF45" />
        <stop offset="35%"  stopColor="#E1306C" />
        <stop offset="70%"  stopColor="#833AB4" />
        <stop offset="100%" stopColor="#5851DB" />
      </linearGradient>
    </defs>
  </svg>
);

function SocialCard({
  social,
  followText,
}: {
  social: (typeof socialLinks)[number];
  followText: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const { handleBorderMouseMove, handleBorderMouseLeave } = useCardBorder(
    shellRef as React.RefObject<HTMLElement | null>
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    handleBorderMouseLeave();
  }, [handleBorderMouseLeave]);

  const Icon = social.icon;
  const isTikTok = social.id === "tiktok";

  return (
    <motion.div
      ref={shellRef}
      className="soc-shell relative rounded-2xl p-px overflow-hidden h-full"
      style={{ background: "transparent" }}
      onMouseMove={handleBorderMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className="card-border-ring rounded-2xl"
        style={{ "--ring-color": social.color + "62", "--ring-color-light": social.color + "42" } as React.CSSProperties}
      />

      <a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="soc-card relative h-54 rounded-2xl flex flex-col items-center justify-center gap-3 text-center overflow-hidden"
        style={{
          background: isHovered
            ? `linear-gradient(160deg, ${social.bgHoverFrom}, ${social.bgHoverTo})`
            : `linear-gradient(160deg, ${social.bgFrom}, ${social.bgTo})`,
          border: `1px solid ${isHovered ? social.borderHover : social.borderBase}`,
          boxShadow: isHovered
            ? `0 16px 40px ${social.shadowColor}, inset 0 0 0 1px ${social.color}15`
            : `0 6px 20px ${social.shadowColor.replace(/[\d.]+\)$/, "0.1)")}`,
          transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        } as React.CSSProperties}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="card-orbit-glow"
          style={{
            display: "none",
            "--orbit-color": social.color + "1e",
          } as React.CSSProperties}
        />
        <div
          className="card-cursor-glow"
          style={{
            width: "190px", height: "190px",
            top: "calc(50% - 95px)", left: "calc(50% - 95px)",
            "--cursor-color": social.color + "28",
          } as React.CSSProperties}
        />

        {/* Radial glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0.4 }}
          transition={{ duration: 0.25 }}
          style={{
            background: `radial-gradient(circle at 50% 38%, ${social.color}20 0%, transparent 68%)`,
          }}
        />

        {/* Icon */}
        <motion.div
          animate={isHovered ? { scale: 1.15, rotate: [-3, 3, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.35 }}
          className="relative z-10"
        >
          {social.id === "instagram" ? (
            <>
              <InstagramGradientDef />
              <Icon
                style={{
                  fontSize: "2.1rem",
                  fill: "url(#ig-gradient)",
                  filter: isHovered
                    ? "drop-shadow(0 0 10px rgba(225,48,108,0.7))"
                    : "drop-shadow(0 0 4px rgba(225,48,108,0.4))",
                }}
              />
            </>
          ) : (
            <Icon
              className={isTikTok ? "soc-tiktok-icon" : social.id === "x" ? "soc-x-icon" : ""}
              style={{
                color: social.iconColor,
                fontSize: "2.1rem",
                filter: isHovered
                  ? `drop-shadow(0 0 10px ${social.color}cc)`
                  : `drop-shadow(0 0 4px ${social.color}66)`,
              }}
            />
          )}
        </motion.div>

        {/* Label */}
        <div className="flex flex-col gap-0.5 relative z-10">
          <span className="text-xs font-bold heading-glass">
            {social.label}
          </span>
          <span className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
            {social.handle}
          </span>
        </div>

        {/* Follow badge */}
        <motion.span
          className={`relative z-10${social.id === "x" ? " soc-x-follow" : ""}`}
          whileHover={{ scale: 1.12, boxShadow: `0 0 16px ${social.color}70` }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 280, damping: 14 }}
          style={{
            borderRadius: "9999px",
            fontSize: "10px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "5px 12px",
            background: `${social.color}1c`,
            color: social.color,
            border: `1px solid ${social.color}45`,
            cursor: "pointer",
            display: "inline-block",
          }}
        >
          {followText}
        </motion.span>
      </a>
    </motion.div>
  );
}

export default function SocialsSection() {
  const t = useTranslations("socials");
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";

  // Cycle through social icons for watermarks
  const allIcons = [FaFacebook, FaInstagram, FaXTwitter, FaTiktok, FaYoutube, FaLinkedin];
  const iconColors = ["#1877F2", "#E1306C", "#E7E9EA", "#EE1D52", "#FF0000", "#0A66C2"];

  return (
    <>
      <style>{CSS}</style>
      <section
        id="socials"
        className="section-wrapper relative overflow-hidden"
        style={{ background: "var(--bg-primary)" }}
        dir={isRtlLocale ? "rtl" : "ltr"}
      >
        {/* ── Background ── */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Dot grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />

          {/* Floating social icon watermarks */}
          {WATERMARK_POSITIONS.map((pos, i) => {
            const WmIcon = allIcons[i % allIcons.length];
            const wmColor = iconColors[i % iconColors.length];
            return (
              <div
                key={i}
                className="absolute bg-drift-y"
                style={{
                  left: pos.left,
                  top: pos.top,
                  opacity: 0.045,
                  color: wmColor,
                  fontSize: "3.2rem",
                  lineHeight: 1,
                  "--dur": pos.dur,
                  "--delay": pos.delay,
                } as React.CSSProperties}
              >
                <WmIcon />
              </div>
            );
          })}

          {/* Floating "Follow" pill watermarks */}
          {FOLLOW_POSITIONS.map((pos, i) => (
            <div
              key={`follow-${i}`}
              className="absolute bg-drift-y"
              style={{
                left: pos.left,
                top: pos.top,
                opacity: 0.06,
                "--dur": pos.dur,
                "--delay": pos.delay,
              } as React.CSSProperties}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  border: "1px solid color-mix(in srgb, var(--text-primary) 18%, transparent)",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "color-mix(in srgb, var(--text-primary) 55%, transparent)",
                  whiteSpace: "nowrap",
                }}
              >
                {t("follow")} ✓
              </span>
            </div>
          ))}

          {/* Ambient platform orbs — CSS-driven */}
          {[
            { color: "rgba(24,119,242,0.10)",  left: "5%",  top: "20%", size: "24vw", dur: "18s", delay: "0s"   },
            { color: "rgba(225,48,108,0.09)",   left: "28%", top: "75%", size: "22vw", dur: "22s", delay: "2s"   },
            { color: "rgba(255,0,0,0.08)",      left: "88%", top: "28%", size: "20vw", dur: "20s", delay: "4s"   },
          ].map((obj, i) => (
            <div
              key={`orb-${i}`}
              className="absolute rounded-full bg-scale-pulse"
              style={{
                width: obj.size,
                height: obj.size,
                left: obj.left,
                top: obj.top,
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(circle, ${obj.color}, transparent 72%)`,
                filter: "blur(48px)",
                "--dur": obj.dur,
                "--delay": obj.delay,
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="section-inner relative z-10">
          <SectionHeading
            badge={t("badge")}
            title={t("title")}
            subtitle={t("subtitle")}
          />

          <motion.div
            variants={staggerContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5"
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.id}
                variants={cardEntranceVariant}
                custom={index}
                className="h-full"
              >
                <SocialCard social={social} followText={t("follow")} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
