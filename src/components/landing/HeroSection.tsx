"use client";

import { motion } from "framer-motion";
import { ArrowRight, Radar, Sparkles, ShieldCheck, Zap, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { APP_NAME } from "@/lib/constants";

const STATS = [
  { value: "2,400+", label: "Businesses in queue" },
  { value: "87%", label: "Lead-to-sale rate" },
  { value: "< 60s", label: "Delivery to WhatsApp" },
];

const SIGNALS = [
  {
    platform: "Instagram",
    text: "Who sells luxury wig glueless in VI?",
    location: "Lagos, NG",
    delay: 0.8,
    position: "top-12 -left-6 sm:-left-12 lg:-left-20",
    icon: "📸",
  },
  {
    platform: "TikTok",
    text: "Need affordable solar inverter package urgently",
    location: "Nairobi, KE",
    delay: 1.2,
    position: "bottom-16 -right-6 sm:-right-12 lg:-right-16",
    icon: "⚡",
  },
];

export function HeroSection() {
  const scrollToForm = () =>
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#0D0820]">
      {/* Sophisticated atmospheric background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(#8E64FF 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Concentric radar rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-purple-500/10 rounded-full animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] border border-purple-500/15 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] border border-brand-purple/20 rounded-full" />

        {/* Soft radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-brand-purple/25 via-brand-accent/15 to-transparent blur-[140px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
        {/* Live founding member badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-purple-400/20 backdrop-blur-md mb-8 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-emerald" />
          </span>
          <span className="text-xs font-semibold text-purple-200 tracking-wide">
            Phase 0 Waitlist — Founding Member Allocation Open
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6 max-w-4xl mx-auto"
        >
          Find Buyers{" "}
          <span className="font-serif italic font-normal text-gradient">Before</span>
          <br className="hidden sm:block" />
          {" "}They Find You.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg lg:text-xl text-purple-200/80 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          {APP_NAME} monitors social media 24/7 to detect ready-to-buy customers asking for what you sell — and delivers qualified leads straight to your WhatsApp.
        </motion.p>

        {/* Floating Simulated Signal Detection Badges (Desktop & Tablet) */}
        <div className="relative max-w-xl mx-auto">
          {SIGNALS.map((sig, idx) => (
            <motion.div
              key={sig.platform}
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { delay: sig.delay, duration: 0.5 },
                scale: { delay: sig.delay, duration: 0.5 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 1.5 },
              }}
              className={`hidden md:flex absolute ${sig.position} z-20 items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-brand-dark/90 border border-purple-500/30 backdrop-blur-md shadow-xl text-left max-w-xs pointer-events-none`}
            >
              <span className="text-xl flex-shrink-0">{sig.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider">
                    {sig.platform}
                  </span>
                  <span className="text-[10px] text-purple-400">· {sig.location}</span>
                </div>
                <p className="text-xs text-white font-medium truncate">{sig.text}</p>
              </div>
            </motion.div>
          ))}

          {/* Primary CTA & Guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <Button
              size="lg"
              onClick={scrollToForm}
              className="w-full sm:w-auto text-base font-semibold shadow-xl shadow-brand-purple/40 hover:shadow-brand-purple/60 group"
            >
              <Radar className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Claim Founding Member Access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Micro Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-6 text-xs text-purple-300/70 mb-12"
        >
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-emerald" />
            No credit card required
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-brand-accent" />
            Zero app installation needed
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            Instant WhatsApp setup
          </span>
        </motion.div>

        {/* Highlight Stats Pill Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto"
        >
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-sm hover:border-purple-400/30 transition-colors"
            >
              <p className="text-2xl sm:text-3xl font-extrabold text-white mb-0.5 tracking-tight font-sans">
                {value}
              </p>
              <p className="text-xs text-purple-300/80 font-medium">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
