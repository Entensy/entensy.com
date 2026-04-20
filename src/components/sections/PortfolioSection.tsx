"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useTranslations, useLocale } from "next-intl";
import { ExternalLink } from "lucide-react";
import {
  SiGithub,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiTypescript,
  SiNodedotjs,
  SiLaravel,
  SiGraphql,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiTailwindcss,
  SiPrisma,
} from "react-icons/si";
import { FiServer } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { useCardBorder } from "@/hooks/useCardBorder";
import { portfolioProjects } from "@/lib/portfolio-data";

// Per-technology color map — normalized to avoid invisible whites/near-blacks
const stackColors: Record<string, string> = {
  "React":         "#61DAFB",
  "Next.js":       "#A8A8B8",
  "Vue.js":        "#4FC08D",
  "TypeScript":    "#4A90D9",
  "Node.js":       "#4CAF50",
  "Laravel":       "#FF4D4D",
  "GraphQL":       "#E10098",
  "PostgreSQL":    "#4A8DB5",
  "MySQL":         "#5B96C2",
  "Docker":        "#2496ED",
  "Tailwind CSS":  "#06B6D4",
  "Prisma":        "#5FC9BE",
  "React Native":  "#61DAFB",
  "REST API":      "#FF7A50",
  "Python":        "#5A9FD4",
  "Java":          "#F09030",
  "Go":            "#29BCD8",
  "PHP":           "#9090D0",
  "Kubernetes":    "#4A8FE0",
  "AWS":           "#FF9900",
};
const getStackColor = (name: string) => stackColors[name] ?? "#8B5CF6";

const stackIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "Vue.js": SiVuedotjs,
  "TypeScript": SiTypescript,
  "Node.js": SiNodedotjs,
  "Laravel": SiLaravel,
  "GraphQL": SiGraphql,
  "PostgreSQL": SiPostgresql,
  "MySQL": SiMysql,
  "Docker": SiDocker,
  "Tailwind CSS": SiTailwindcss,
  "Prisma": SiPrisma,
  "React Native": SiReact,
  "REST API": FiServer,
};

const CSS = `
  .portfolio-shell .card-border-ring {
    opacity: 0.28;
    transition: opacity 0.3s ease, filter 0.3s ease;
  }
  .portfolio-shell:hover .card-border-ring {
    opacity: 0.9;
    filter: saturate(1.3) brightness(1.25);
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

function PortfolioCard({
  project,
  uniqueKey,
  t,
  isRtlLocale,
  onScrollStop,
  onScrollPlay,
}: {
  project: (typeof portfolioProjects)[number];
  uniqueKey: string;
  t: ReturnType<typeof useTranslations>;
  isRtlLocale: boolean;
  onScrollStop: () => void;
  onScrollPlay: () => void;
}) {
  const [hoveredGithub, setHoveredGithub] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const { handleBorderMouseMove, handleBorderMouseLeave } = useCardBorder(
    shellRef as React.RefObject<HTMLElement | null>
  );

  return (
    <div
      className="py-3"
      onMouseEnter={onScrollStop}
      onMouseLeave={onScrollPlay}
    >
      <TiltCard tiltMaxAngle={8} scale={1.01}>
        <div
          ref={shellRef}
          className="portfolio-shell relative rounded-2xl p-px overflow-hidden h-full"
          style={{ background: "transparent" }}
          onMouseMove={handleBorderMouseMove}
          onMouseLeave={handleBorderMouseLeave}
        >
          {/* Border ring */}
          <div
            className="card-border-ring rounded-2xl"
            style={{ "--ring-color": "rgba(139,92,246,0.7)", "--ring-color-light": "rgba(88,28,220,0.30)" } as React.CSSProperties}
          />

          {/* Card content */}
          <div
            className="portfolio-card-body relative h-full flex flex-col overflow-hidden"
            style={{
              background: "rgba(13, 10, 30, 0.88)",
              borderRadius: "inherit",
              minHeight: "520px",
            }}
          >
            {/* Image / Gradient placeholder */}
            <div
              className={`h-52 shrink-0 flex items-center justify-center bg-linear-to-br ${project.gradient}`}
              style={{ position: "relative", overflow: "hidden" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-black opacity-20 text-white">
                  {t(project.titleKey as Parameters<typeof t>[0])
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
              <div
                className="portfolio-img-overlay absolute bottom-0 left-0 right-0 h-16"
                style={{
                  background:
                    "linear-gradient(to top, rgba(13,10,30,0.85), transparent)",
                }}
              />
            </div>

            <div
              className="card-cursor-glow"
              style={{
                width: "240px", height: "240px",
                top: "calc(50% - 120px)", left: "calc(50% - 120px)",
                "--cursor-color": "rgba(139,92,246,0.25)",
              } as React.CSSProperties}
            />

            {/* Content */}
            <div
              className="flex-1 p-5 flex flex-col gap-3 relative z-10"
              dir={isRtlLocale ? "rtl" : "ltr"}
            >
              <h3
                className="text-sm font-bold leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {t(project.titleKey as Parameters<typeof t>[0])}
              </h3>
              <p
                className="text-xs leading-relaxed flex-1"
                style={{ color: "var(--text-muted)" }}
              >
                {t(project.descKey as Parameters<typeof t>[0])}
              </p>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-1.5 force-ltr" dir="ltr">
                {project.stacks.map((stack) => {
                  const StackIcon = stackIcons[stack];
                  const color = getStackColor(stack);
                  return (
                    <motion.span
                      key={stack}
                      className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full cursor-default"
                      style={{
                        background: `${color}12`,
                        border: `1px solid ${color}28`,
                        color,
                      }}
                      whileHover={{
                        scale: 1.08,
                        boxShadow: `0 0 10px ${color}80, 0 0 20px ${color}30`,
                        background: `${color}22`,
                        borderColor: `${color}55`,
                      }}
                      transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    >
                      {StackIcon && <StackIcon style={{ fontSize: "0.72rem" }} />}
                      {stack}
                    </motion.span>
                  );
                })}
              </div>

              {/* Action buttons */}
              <div className={`flex items-center gap-2 pt-1 ${isRtlLocale ? "flex-row-reverse" : ""}`}>
                <AnimatedButton
                  variant={project.visitUrl ? "outline" : "ghost"}
                  size="sm"
                  disabled={!project.visitUrl}
                  href={project.visitUrl ?? undefined}
                  icon={<ExternalLink size={13} />}
                  className="flex-1 text-xs"
                >
                  {project.visitUrl ? t("visit") : t("unavailable")}
                </AnimatedButton>

                <motion.a
                  href={project.githubUrl ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`portfolio-github-btn w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 ${
                    project.githubUrl ? "" : "opacity-25 pointer-events-none"
                  }`}
                  style={{
                    background: hoveredGithub
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: hoveredGithub ? "0 0 10px rgba(255,255,255,0.1)" : "none",
                  }}
                  onMouseEnter={() => project.githubUrl && setHoveredGithub(true)}
                  onMouseLeave={() => setHoveredGithub(false)}
                  whileHover={project.githubUrl ? { scale: 1.1, y: -1 } : {}}
                  whileTap={project.githubUrl ? { scale: 0.96 } : {}}
                  transition={{ type: "spring", stiffness: 220, damping: 14 }}
                  aria-label={t("source_code")}
                  aria-disabled={!project.githubUrl}
                >
                  <SiGithub
                    style={{
                      color: hoveredGithub ? "rgba(230,226,255,0.9)" : "var(--text-muted)",
                      fontSize: "0.9rem",
                      transition: "color 0.2s ease",
                    }}
                  />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}

export default function PortfolioSection() {
  const t = useTranslations("portfolio");
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";

  const autoScrollPlugin = useRef(
    AutoScroll({
      speed: 0.6,
      startDelay: 0,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      direction: isRtlLocale ? "backward" : "forward",
    })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [autoScrollPlugin.current]
  );

  const stopScroll = useCallback(() => {
    emblaApi?.plugins()?.autoScroll?.stop();
  }, [emblaApi]);

  const startScroll = useCallback(() => {
    emblaApi?.plugins()?.autoScroll?.play();
  }, [emblaApi]);

  // Triple the projects so Embla has enough slides for seamless looping
  const allProjects = [...portfolioProjects, ...portfolioProjects, ...portfolioProjects];

  return (
    <>
      <style>{CSS}</style>
      <section
        id="portfolio"
        className="section-wrapper relative overflow-visible"
        style={{ background: "var(--bg-primary)" }}
        dir={isRtlLocale ? "rtl" : "ltr"}
      >
        {/* ── Background ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Dot grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />

          {/* Ambient orbs */}
          <div className="absolute bg-drift-xy" style={{ top: "-10%", left: "-5%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)", filter: "blur(40px)", borderRadius: "50%", "--dur": "20s", "--delay": "0s" } as React.CSSProperties} />
          <div className="absolute bg-drift-y" style={{ bottom: "-8%", right: "-5%", width: "45vw", height: "45vw", background: "radial-gradient(circle, rgba(244,63,94,0.09) 0%, transparent 65%)", filter: "blur(40px)", borderRadius: "50%", "--dur": "17s", "--delay": "3s" } as React.CSSProperties} />
          <div className="absolute bg-scale-pulse" style={{ top: "30%", left: "35%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)", filter: "blur(50px)", borderRadius: "50%", "--dur": "13s", "--delay": "6s" } as React.CSSProperties} />

          {/* Floating icon watermarks */}
          {WATERMARK_POSITIONS.map((pos, idx) => {
            const icons = [SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiDocker, SiTailwindcss, SiGraphql];
            const colors = ["#61DAFB", "#A8A8B8", "#4A90D9", "#4CAF50", "#2496ED", "#06B6D4", "#E10098"];
            const Icon = icons[idx % icons.length];
            const color = colors[idx % colors.length];
            return (
              <div key={idx} className="absolute bg-drift-y pointer-events-none" style={{ left: pos.left, top: pos.top, opacity: 0.04, color, fontSize: "3.75rem", "--dur": pos.dur, "--delay": pos.delay } as React.CSSProperties}>
                <Icon />
              </div>
            );
          })}
        </div>

        <div className="section-inner relative z-10">
          <SectionHeading
            badge={t("badge")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </div>

        {/* ── Full-width carousel with CSS mask fade ── */}
        <div className="relative z-10 w-full mt-2 embla">
          <div ref={emblaRef} className="embla__viewport">
            <div className="embla__container">
              {allProjects.map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className="embla__slide shrink-0"
                  style={{ overflow: "visible" }}
                >
                  <PortfolioCard
                    project={project}
                    uniqueKey={`${project.id}-${index}`}
                    t={t}
                    isRtlLocale={isRtlLocale}
                    onScrollStop={stopScroll}
                    onScrollPlay={startScroll}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
