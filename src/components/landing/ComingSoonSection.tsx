"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const PRODUCT_STAGES = [
  {
    stage: "DISCOVER",
    phase: "Available at Launch",
    title: "Multi-Platform Ingestion",
    description:
      "Automated scanning across social channels to capture customer buying inquiries within seconds of being posted.",
    highlights: ["Facebook Groups & Pages", "Instagram Comments", "TikTok Video Inquiries", "Twitter / X Requests"],
  },
  {
    stage: "QUALIFY",
    phase: "Available at Launch",
    title: "Local Language Parsing",
    description:
      "Natural language understanding filters out spam and accurately scores purchase intent in Nigerian Pidgin and regional dialects.",
    highlights: ["African Dialects Support", "Intent Scoring Engine", "Negative Keyword Filtering", "Geographic Localization"],
  },
  {
    stage: "DELIVER",
    phase: "Available at Launch",
    title: "Direct WhatsApp Dispatch",
    description:
      "Structured buyer lead cards sent directly to your existing WhatsApp number with one-tap contact shortcuts.",
    highlights: ["< 60s Lead Dispatch", "Customer Profile Links", "Contextual Inquiry Details", "Zero Extra App Installs"],
  },
  {
    stage: "CONVERT",
    phase: "Roadmap Feature",
    title: "AI Auto-Closer & Catalog Sync",
    description:
      "Future capability to automatically answer pricing queries, check product stock levels, and collect payments directly in chat.",
    highlights: ["Automated WhatsApp Replies", "Live Inventory Sync", "Payment Link Generation", "CRM Analytics Dashboard"],
  },
];

export function ComingSoonSection() {
  const scrollToForm = () =>
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="py-24 bg-[#F8F6FE] text-slate-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
            Product Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1033] tracking-tight mb-4">
            How Hunter Evolves
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Hunter is built to support the entire customer acquisition journey — starting from initial discovery to automated transaction closing.
          </p>
        </div>

        {/* Pipeline Evolution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {PRODUCT_STAGES.map(({ stage, phase, title, description, highlights }, i) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-brand-purple bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                    {stage}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">{phase}</span>
                </div>

                <h3 className="text-base font-bold text-[#1A1033] mb-2">
                  {title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-1.5">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Founder Pricing Reassurance */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 border border-purple-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1A1033] mb-1">
              Pricing Announced at MVP Launch
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Waitlist members receive priority onboarding and locked-in founder discount rates when commercial plans go live.
            </p>
          </div>
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold bg-brand-purple text-white hover:bg-brand-purple-hover transition-colors flex items-center justify-center gap-1.5 flex-shrink-0 shadow-sm"
          >
            Join the Waitlist <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
