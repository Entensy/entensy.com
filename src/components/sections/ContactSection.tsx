"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations, useLocale } from "next-intl";
import {
  Mail,
  Phone,
  Clock,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedButton from "@/components/ui/AnimatedButton";
import {
  fadeUpVariant,
  slideInLeftVariant,
  slideInRightVariant,
  viewportOnce,
} from "@/lib/animations";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = { name: string; email: string; message: string };
type FormStatus = "idle" | "sending" | "success" | "error";

// ─── Contact info ─────────────────────────────────────────────────────────────

const contactInfo = [
  {
    icon: Mail,
    labelKey: "info.email_label",
    valueKey: "info.email_value",
    href: "mailto:contact@entensy.com",
    clickable: true,
  },
  {
    icon: Phone,
    labelKey: "info.phone_label",
    valueKey: "info.phone_value",
    href: "tel:+9647708625008",
    clickable: true,
  },
  {
    icon: Clock,
    labelKey: "info.hours_label",
    valueKey: "info.hours_value",
    href: null,
    clickable: false,
  },
  {
    icon: MessageCircle,
    labelKey: "info.response_label",
    valueKey: "info.response_value",
    href: null,
    clickable: false,
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const isRtlLocale = locale === "ar" || locale === "ckb";
  const [status, setStatus] = useState<FormStatus>("idle");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(
      z.object({
        name: z.string().min(2, t("form.error_name")),
        email: z.string().email(t("form.error_email")),
        message: z.string().min(10, t("form.error_message")),
      })
    ),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="section-wrapper relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
      dir={isRtlLocale ? "rtl" : "ltr"}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        {/* Floating icon watermarks */}
        {[
          { left: "4%",  top: "8%",  dur: "18s", delay: "0s"   },
          { left: "20%", top: "72%", dur: "22s", delay: "1.2s" },
          { left: "38%", top: "14%", dur: "16s", delay: "3s"   },
          { left: "58%", top: "82%", dur: "20s", delay: "0.8s" },
          { left: "76%", top: "12%", dur: "24s", delay: "2.2s" },
          { left: "92%", top: "55%", dur: "17s", delay: "4s"   },
          { left: "88%", top: "28%", dur: "19s", delay: "1s"   },
          { left: "68%", top: "88%", dur: "21s", delay: "3.5s" },
          { left: "44%", top: "45%", dur: "15s", delay: "5s"   },
          { left: "12%", top: "50%", dur: "23s", delay: "2s"   },
        ].map((pos, idx) => {
          const icons = [Mail, Phone, MessageCircle, Send, Clock];
          const colors = ["#FC002A", "#C9A84C", "#7C3AED", "#3B82F6", "#10B981"];
          const Icon = icons[idx % icons.length];
          const color = colors[idx % colors.length];
          return (
            <div key={idx} className="absolute bg-drift-y pointer-events-none" style={{ left: pos.left, top: pos.top, opacity: 0.045, color, "--dur": pos.dur, "--delay": pos.delay } as React.CSSProperties}>
              <Icon size={60} />
            </div>
          );
        })}

        {/* Split ambient light: red left, gold right */}
        <div
          className="absolute inset-y-0 left-0 w-1/2"
          style={{
            background:
              "radial-gradient(ellipse at 0% 50%, rgba(252,0,42,0.12) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/2"
          style={{
            background:
              "radial-gradient(ellipse at 100% 50%, rgba(201,168,76,0.08) 0%, transparent 65%)",
          }}
        />

        {/* Circuit-board diagonal line pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                60deg,
                transparent,
                transparent 38px,
                rgba(252,0,42,0.025) 38px,
                rgba(252,0,42,0.025) 39px
              ),
              repeating-linear-gradient(
                -60deg,
                transparent,
                transparent 38px,
                rgba(252,0,42,0.018) 38px,
                rgba(252,0,42,0.018) 39px
              )
            `,
          }}
        />

        {/* Floating geometric shapes */}
        {/* Diamond top-right */}
        <div
          className="absolute"
          style={{
            top: "8%",
            right: "6%",
            width: "80px",
            height: "80px",
            border: "1px solid rgba(252,0,42,0.12)",
            transform: "rotate(45deg)",
            animation: "float-contact 14s ease-in-out infinite",
          }}
        />
        {/* Diamond bottom-left */}
        <div
          className="absolute"
          style={{
            bottom: "10%",
            left: "4%",
            width: "56px",
            height: "56px",
            border: "1px solid rgba(201,168,76,0.12)",
            transform: "rotate(45deg)",
            animation: "float-contact 18s ease-in-out infinite 2s",
          }}
        />
        {/* Hexagon-like (rotated square) center-right */}
        <div
          className="absolute"
          style={{
            top: "45%",
            right: "2%",
            width: "44px",
            height: "44px",
            border: "1px solid rgba(124,58,237,0.10)",
            transform: "rotate(22deg)",
            animation: "float-contact 22s ease-in-out infinite 4s",
            borderRadius: "6px",
          }}
        />
      </div>

      {/* ── CSS for focus and animations ── */}
      <style>{`
        .contact-input {
          border-radius: 0.75rem !important;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
        }
        .contact-input::placeholder {
          color: var(--text-muted);
        }
        .contact-input:hover {
          border-color: rgba(255, 255, 255, 0.18) !important;
          background: rgba(255, 255, 255, 0.055) !important;
        }
        .contact-input:focus {
          border-color: rgba(252, 0, 42, 0.5) !important;
          background: rgba(252, 0, 42, 0.04) !important;
          box-shadow: 0 0 0 3px rgba(252, 0, 42, 0.12), 0 0 16px rgba(252, 0, 42, 0.08);
          outline: none;
        }
        @keyframes float-contact {
          0%, 100% { transform: rotate(45deg) translateY(0px); }
          50% { transform: rotate(45deg) translateY(-14px); }
        }
      `}</style>

      <div className="section-inner relative z-10">
        <SectionHeading
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ── Contact Form ── */}
          <motion.div
            variants={slideInLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="rounded-2xl p-8"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(16px)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
              noValidate
            >
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {t("form.name")}
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder={t("form.name_placeholder")}
                  className="contact-input w-full px-4 py-3 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${
                      errors.name ? "rgba(252,0,42,0.5)" : "var(--glass-border)"
                    }`,
                    color: "var(--text-primary)",
                  }}
                />
                {errors.name && (
                  <span className="text-xs text-brand">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {t("form.email")}
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder={t("form.email_placeholder")}
                  className="contact-input w-full px-4 py-3 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${
                      errors.email ? "rgba(252,0,42,0.5)" : "var(--glass-border)"
                    }`,
                    color: "var(--text-primary)",
                  }}
                />
                {errors.email && (
                  <span className="text-xs text-brand">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {t("form.message")}
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder={t("form.message_placeholder")}
                  className="contact-input w-full px-4 py-3 text-sm resize-none"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${
                      errors.message ? "rgba(252,0,42,0.5)" : "var(--glass-border)"
                    }`,
                    color: "var(--text-primary)",
                  }}
                />
                {errors.message && (
                  <span className="text-xs text-brand">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit — styled exactly like navbar "Get Started" */}
              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white"
                style={{
                  background: "#FC002A",
                  boxShadow: "0 0 18px rgba(252,0,42,0.22)",
                  opacity: status === "sending" ? 0.7 : 1,
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                }}
                whileHover={status !== "sending" ? {
                  y: -1,
                  background: "#D4001F",
                  boxShadow: "0 0 24px rgba(252,0,42,0.38)",
                } : {}}
                whileTap={status !== "sending" ? { scale: 0.97, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {status === "sending" ? (
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <Send size={16} />
                )}
                {status === "sending" ? t("form.sending") : t("form.send")}
              </motion.button>

              {/* Status feedback */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl text-sm"
                    style={{
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      color: "#10B981",
                    }}
                  >
                    <CheckCircle size={16} />
                    {t("form.success")}
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl text-sm"
                    style={{
                      background: "rgba(252,0,42,0.1)",
                      border: "1px solid rgba(252,0,42,0.3)",
                      color: "#FC002A",
                    }}
                  >
                    <AlertCircle size={16} />
                    {t("form.error")}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* ── Contact Info ── */}
          <motion.div
            variants={slideInRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-6"
          >
            {/* Info cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map(({ icon: Icon, labelKey, valueKey, href, clickable }, i) => (
                <motion.div
                  key={labelKey}
                  variants={fadeUpVariant}
                  className="p-5 rounded-2xl flex items-start gap-4 overflow-hidden"
                  style={{
                    background: "var(--glass-bg)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid var(--glass-border)",
                    cursor: clickable ? "pointer" : "default",
                    transformOrigin: "bottom center",
                    transformPerspective: 800,
                  }}
                  animate={hoveredCard === i ? {
                    rotateX: -4,
                    y: -6,
                    boxShadow: "0 16px 32px rgba(0,0,0,0.28)",
                    borderColor: "rgba(252,0,42,0.22)",
                  } : {
                    rotateX: 0,
                    y: 0,
                    boxShadow: "0 0px 0px rgba(0,0,0,0)",
                    borderColor: "var(--glass-border)",
                  }}
                  onPointerEnter={(e) => { if (e.pointerType !== "touch") setHoveredCard(i); }}
                  onPointerLeave={() => setHoveredCard(null)}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                    style={{ background: "rgba(252,0,42,0.08)" }}
                  >
                    <Icon size={18} style={{ color: "#FC002A" }} />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {t(labelKey as Parameters<typeof t>[0])}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className={`text-sm font-medium hover:text-brand transition-colors truncate block heading-glass${isRtlLocale && href.startsWith("tel:") ? " force-ltr" : ""}`}
                      >
                        {t(valueKey as Parameters<typeof t>[0])}
                      </a>
                    ) : (
                      <p
                        className="text-sm font-medium heading-glass"
                      >
                        {t(valueKey as Parameters<typeof t>[0])}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* "Let's build" decorative card */}
            <motion.div
              variants={fadeUpVariant}
              className="flex-1 p-8 rounded-2xl flex flex-col gap-4 justify-center relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(252,0,42,0.08) 0%, rgba(201,168,76,0.05) 100%)",
                border: "1px solid rgba(252,0,42,0.15)",
                minHeight: "160px",
              }}
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-20" />
              {/* Split ambient echo */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 80% 80%, rgba(201,168,76,0.12) 0%, transparent 60%)",
                }}
              />
              <div className="relative z-10">
                <h3
                  className="text-2xl font-black mb-2 heading-glass"
                >
                  {t("cta_card_title")}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {t("cta_card_desc")}
                </p>
              </div>
              <div
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-30 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, #FC002A 0%, transparent 70%)",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
