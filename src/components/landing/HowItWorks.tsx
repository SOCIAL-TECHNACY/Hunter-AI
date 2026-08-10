"use client";

import { motion } from "framer-motion";
import { Search, MessageSquare, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Continuous Social Scanning",
    description:
      "Hunter AI scans public posts, inquiries, and buyer groups on Facebook, Instagram, TikTok, and Twitter 24/7 across African markets.",
    preview: {
      type: "Post Detected",
      platform: "Facebook Public Group",
      content: "“Please who sells quality Aso-Oke in Ibadan? Urgent for Saturday wedding.”",
      badge: "Buyer Intent 98%",
    },
  },
  {
    step: "02",
    icon: MessageSquare,
    title: "Delivered to WhatsApp Instantly",
    description:
      "Within 60 seconds of a buyer posting, Hunter AI parses their requirements, verifies intent, and delivers an actionable lead card to your WhatsApp.",
    preview: {
      type: "WhatsApp Card",
      platform: "Hunter AI Bot",
      content: "🎯 Direct Lead: Buyer @funke_style searching for Aso-Oke. Tap to reply directly.",
      badge: "Delivered in 42s",
    },
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "Close Deals While Competitors Sleep",
    description:
      "Reach warm buyers first before they walk into another shop. Connect directly with people who already have their money out.",
    preview: {
      type: "Closed Sale",
      platform: "Your Phone",
      content: "💰 Payment received: ₦65,000 for 4 bundles. Sale closed in under 20 minutes.",
      badge: "Verified Conversion",
    },
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white text-slate-900 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand-purple text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200">
            <Sparkles className="w-3.5 h-3.5" />
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1033] tracking-tight mb-4">
            From Social Media Inquiries to{" "}
            <span className="text-gradient-purple font-serif italic">Your WhatsApp</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Turn social media noise into qualified sales without running expensive ads or endless cold messaging.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {STEPS.map(({ step, icon: Icon, title, description, preview }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="group relative flex flex-col bg-[#FAF9FF] rounded-3xl p-7 border border-purple-100/90 shadow-lg shadow-purple-950/5 hover:shadow-xl hover:border-brand-purple/40 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Step indicator header */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-black text-brand-purple/20 group-hover:text-brand-purple/40 transition-colors font-mono">
                  {step}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center group-hover:bg-brand-purple group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              {/* Title and Description */}
              <h3 className="text-xl font-bold text-[#1A1033] mb-3 group-hover:text-brand-purple transition-colors">
                {title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                {description}
              </p>

              {/* Simulated UI Card */}
              <div className="mt-auto rounded-2xl bg-white p-4 border border-purple-100 shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
                  <span className="text-[11px] font-bold text-brand-purple uppercase tracking-wider">
                    {preview.platform}
                  </span>
                  <span className="text-[10px] font-semibold text-brand-emerald bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {preview.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {preview.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
