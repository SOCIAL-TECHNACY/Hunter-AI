"use client";

import { motion } from "framer-motion";
import { Sparkles, BellRing, Check, ArrowRight } from "lucide-react";

const UPCOMING_CAPABILITIES = [
  {
    icon: "⚡",
    title: "AI Auto-Closer for WhatsApp",
    desc: "Autonomous conversational AI to answer buyer queries, share product catalogs, and confirm orders directly.",
  },
  {
    icon: "📊",
    title: "Conversion & Revenue Analytics",
    desc: "Real-time visibility into lead volume, response speeds, closed revenue, and top-performing social channels.",
  },
  {
    icon: "🎯",
    title: "Hyper-Targeted Geofencing",
    desc: "Filter buyer leads by exact local neighborhoods (e.g. Lekki, Ikeja, Westlands, East Legon, Sandton).",
  },
  {
    icon: "💬",
    title: "Unified Social Commerce Inbox",
    desc: "Manage leads from Facebook, Instagram, WhatsApp, and TikTok in a single streamlined dashboard.",
  },
  {
    icon: "📦",
    title: "Inventory Stock Sync",
    desc: "Connect your inventory so Hunter AI automatically prioritizes in-stock items and pauses sold-out goods.",
  },
  {
    icon: "🌍",
    title: "Pan-African Expansion Engine",
    desc: "Seamless cross-border buyer discovery across 15+ African economies and 30+ regional languages.",
  },
];

export function ComingSoonSection() {
  const scrollToForm = () =>
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="py-24 bg-[#F8F6FE] text-slate-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand-purple text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200">
            <Sparkles className="w-3.5 h-3.5" />
            Phase 1 & 2 Roadmap Preview
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1033] tracking-tight mb-4">
            The Complete SaaS is <span className="text-gradient-purple font-serif italic">Coming Soon</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Pricing and full platform access will be officially announced after our private MVP rollout. Waitlist members are guaranteed locked-in founder pricing.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {UPCOMING_CAPABILITIES.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="bg-white rounded-3xl p-6 border border-purple-100 shadow-md shadow-purple-950/5 hover:border-brand-purple/40 hover:shadow-lg transition-all duration-300"
            >
              <span className="text-3xl mb-4 block">{icon}</span>
              <h3 className="text-lg font-bold text-[#1A1033] mb-2">
                {title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Founder Pricing Guarantee Banner */}
        <div className="rounded-3xl bg-white p-8 sm:p-10 border border-purple-200 shadow-xl shadow-purple-950/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center flex-shrink-0 mt-1">
              <BellRing className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#1A1033] mb-1.5">
                Be First in Line When Pricing is Announced
              </h3>
              <p className="text-slate-600 text-sm max-w-xl leading-relaxed">
                Founding members receive locked-in lifetime discounted rates, priority feature requests, and 1-on-1 WhatsApp onboarding.
              </p>
            </div>
          </div>

          <button
            onClick={scrollToForm}
            className="w-full md:w-auto px-7 py-3.5 rounded-full text-sm font-bold bg-brand-purple text-white hover:bg-brand-purple-hover transition-all duration-200 shadow-md shadow-brand-purple/30 flex items-center justify-center gap-2 flex-shrink-0"
          >
            Lock in Founder Status <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
