"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import type { LucideIcon } from "lucide-react";
import {
  Code2, Globe, Smartphone, Palette, Brain,
  Kanban, Wrench, BarChart3, RefreshCw, Rocket,
} from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/services-data";
import { useCardBorder } from "@/hooks/useCardBorder";
import { staggerContainerVariant, cardEntranceVariant, viewportOnce } from "@/lib/animations";

const iconMap: Record<string, LucideIcon> = {
  Code2, Globe, Smartphone, Palette, Brain,
  Kanban, Wrench, BarChart3, RefreshCw, Rocket,
};

const serviceTagMap: Record<string, string> = {
  "custom-software": "Custom",
  "web-app": "Web",
  "mobile-app": "Mobile",
  "ui-ux": "Design",
  "tech-consulting": "Strategy",
  "agile-pm": "Agile",
  "maintenance": "Support",
  "business-analysis": "Analytics",
  "modernization": "Transform",
  "mvp": "Launch",
};

const CSS = `
  .svc-shell .card-border-ring {
    opacity: 0.45;
    transition: opacity 0.25s ease, filter 0.25s ease;
  }
  @media (hover: hover) {
    .svc-shell:hover .card-border-ring {
      opacity: 1;
      filter: saturate(1.5) brightness(1.4);
    }
  }
  .svc-shell:active .card-border-ring {
    opacity: 1;
    filter: saturate(1.5) brightness(1.4);
  }
`;

const WATERMARK_POSITIONS = [
  { left: "4%",  top: "8%",  dur: "18s", delay: "0s"   },
  { left: "20%", top: "4%",  dur: "22s", delay: "1.2s" },
  { left: "38%", top: "14%", dur: "16s", delay: "3s"   },
  { left: "58%", top: "6%",  dur: "20s", delay: "0.8s" },
  { left: "76%", top: "12%", dur: "24s", delay: "2.2s" },
  { left: "92%", top: "30%", dur: "17s", delay: "4s"   },
  { left: "88%", top: "60%", dur: "19s", delay: "1s"   },
  { left: "68%", top: "80%", dur: "21s", delay: "3.5s" },
  { left: "44%", top: "88%", dur: "15s", delay: "5s"   },
  { left: "22%", top: "76%", dur: "23s", delay: "2s"   },
  { left: "6%",  top: "55%", dur: "18s", delay: "0.5s" },
  { left: "32%", top: "42%", dur: "20s", delay: "4.5s" },
];

// Individual card that has its own useCardBorder hook
function ServiceCard({
  service,
  index,
  tag,
  padded,
  centeringClass,
  isRtl,
  t,
}: {
  service: (typeof services)[number];
  index: number;
  tag: string;
  padded: string;
  centeringClass: string;
  isRtl: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  const Icon = iconMap[service.icon];
  const shellRef = useRef<HTMLDivElement>(null);
  const { handleBorderMouseMove, handleBorderMouseLeave } = useCardBorder(
    shellRef as React.RefObject<HTMLElement | null>
  );

  return (
    <motion.div
      variants={cardEntranceVariant}
      custom={index}
      className={`col-span-1 h-full ${centeringClass}`}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <TiltCard tiltMaxAngle={10}>
        <div
          ref={shellRef}
          className="svc-shell relative rounded-2xl p-px overflow-hidden h-full"
          style={{ background: "transparent" }}
          onMouseMove={handleBorderMouseMove}
          onMouseLeave={handleBorderMouseLeave}
        >
          {/* JS-driven border ring */}
          <div
            className="card-border-ring rounded-2xl"
            style={{ "--ring-color": service.color + "65", "--ring-color-light": service.color + "40" } as React.CSSProperties}
          />

          {/* Card body */}
          <div
            className="svc-card relative h-68 p-5 pb-12 rounded-2xl overflow-hidden flex flex-col gap-3 transition-[box-shadow,border-color] duration-300"
            style={{
              background: "rgba(14, 10, 32, 0.88)",
              border: `1px solid ${service.color}12`,
            } as React.CSSProperties}
          >
            <div
              className="card-cursor-glow"
              style={{
                width: "220px", height: "220px",
                top: "calc(50% - 110px)", left: "calc(50% - 110px)",
                "--cursor-color": service.color + "30",
              } as React.CSSProperties}
            />

            {/* Diagonal corner accent — top-left in LTR, top-right in RTL */}
            <div
              className={`absolute top-0 pointer-events-none overflow-hidden ${isRtl ? "right-0 rounded-tr-2xl" : "left-0 rounded-tl-2xl"}`}
              style={{ width: "68%", height: "60%" }}
            >
              {/* Main fill */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(${isRtl ? "225deg" : "135deg"}, ${service.color}32 0%, ${service.color}14 38%, transparent 60%)`,
                  clipPath: isRtl ? "polygon(0 0, 100% 0, 100% 100%)" : "polygon(0 0, 100% 0, 0 100%)",
                }}
              />
              {/* Bright edge shimmer */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(${isRtl ? "225deg" : "135deg"}, ${service.color}65 0%, ${service.color}18 10%, transparent 22%)`,
                  clipPath: isRtl ? "polygon(0 0, 100% 0, 100% 100%)" : "polygon(0 0, 100% 0, 0 100%)",
                }}
              />
            </div>

            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 4 }}
              whileTap={{ scale: 1.1, rotate: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 relative z-10"
              style={{
                background: `${service.color}18`,
                border: `1px solid ${service.color}35`,
              }}
            >
              {Icon && (
                <Icon size={22} style={{ color: service.color }} strokeWidth={1.8} />
              )}
            </motion.div>

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1 relative z-10">
              <h3
                className="text-sm font-bold leading-snug heading-glass"
              >
                {t(service.titleKey as Parameters<typeof t>[0])}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{
                  color: "var(--text-muted)",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {t(service.descKey as Parameters<typeof t>[0])}
              </p>
            </div>

            {/* Decorative index number */}
            <span
              className="absolute bottom-3 right-4 text-5xl font-black leading-none pointer-events-none select-none z-10"
              style={{ color: service.color, opacity: 0.07 }}
            >
              {padded}
            </span>

            {/* Tag pill */}
            {tag && (
              <span
                className="absolute bottom-4 left-5 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full z-10 force-ltr"
                dir="ltr"
                style={{
                  background: `${service.color}18`,
                  color: service.color,
                  border: `1px solid ${service.color}35`,
                }}
              >
                {tag}
              </span>
            )}

            {/* Bottom accent line */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 rounded-full z-10"
              initial={{ width: "0%" }}
              whileHover={{ width: "100%" }}
              whileTap={{ width: "100%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                background: `linear-gradient(90deg, ${service.gradientFrom}, ${service.gradientTo})`,
              }}
            />
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function ServicesSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";
  const columnsOnDesktop = 3;
  const columnsOnTablet = 2;
  const lastRowRemainder = services.length % columnsOnDesktop;
  const lastRowRemainderSm = services.length % columnsOnTablet;

  return (
    <>
      <style>{CSS}</style>
      <section
        id="services"
        className="section-wrapper relative"
        style={{ background: "var(--bg-primary)" }}
        dir={isRtlLocale ? "rtl" : "ltr"}
      >
        {/* ── Background ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Dot grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />

          {/* Ambient orbs */}
          <div className="absolute bg-drift-xy" style={{ top: "-10%", left: "-8%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(244,63,94,0.09) 0%, transparent 65%)", filter: "blur(50px)", borderRadius: "50%", "--dur": "20s", "--delay": "0s" } as React.CSSProperties} />
          <div className="absolute bg-drift-y" style={{ bottom: "-8%", right: "-6%", width: "44vw", height: "44vw", background: "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)", filter: "blur(50px)", borderRadius: "50%", "--dur": "17s", "--delay": "3s" } as React.CSSProperties} />
          <div className="absolute bg-scale-pulse" style={{ top: "30%", left: "36%", width: "38vw", height: "38vw", background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)", filter: "blur(60px)", borderRadius: "50%", "--dur": "13s", "--delay": "6s" } as React.CSSProperties} />

          {/* Floating icon watermarks */}
          {WATERMARK_POSITIONS.map((pos, idx) => {
            const icons = [Code2, Globe, Smartphone, Palette, Brain, Wrench];
            const colors = ["#F43F5E", "#7C3AED", "#C9A84C", "#3B82F6", "#10B981", "#F59E0B"];
            const Icon = icons[idx % icons.length];
            const color = colors[idx % colors.length];
            return (
              <div key={idx} className="absolute bg-drift-y pointer-events-none" style={{ left: pos.left, top: pos.top, opacity: 0.045, color, "--dur": pos.dur, "--delay": pos.delay } as React.CSSProperties}>
                <Icon size={60} />
              </div>
            );
          })}
        </div>

        <div className="section-inner relative z-10">
          <SectionHeading
            badge={t("services.badge")}
            title={t("services.title")}
            subtitle={t("services.subtitle")}
          />

          <motion.div
            variants={staggerContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {services.map((service, index) => {
              const tag = serviceTagMap[service.id] ?? "";
              const padded = String(index + 1).padStart(2, "0");
              const isLast = index === services.length - 1;
              const isSecondLast = index === services.length - 2;
              const smCenter = lastRowRemainderSm === 1 && isLast
                ? "sm:col-span-2 sm:justify-self-center sm:w-[calc(50%-0.625rem)]"
                : "";
              const lgCenter =
                lastRowRemainder === 1 && isLast
                  ? "lg:col-start-2"
                  : lastRowRemainder === 2 && isSecondLast
                  ? "lg:col-start-1"
                  : lastRowRemainder === 2 && isLast
                  ? "lg:col-start-3"
                  : "";
              const centeringClass = `${smCenter} ${lgCenter}`.trim();

              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  tag={tag}
                  padded={padded}
                  centeringClass={centeringClass}
                  isRtl={isRtlLocale}
                  t={t}
                />
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
