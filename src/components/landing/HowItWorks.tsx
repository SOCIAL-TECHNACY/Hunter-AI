"use client";

import { motion } from "framer-motion";
import { Search, Filter, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";

const WORKFLOW_STEPS = [
  {
    num: "01",
    label: "Discovery",
    title: "Continuous Social Scanning",
    desc: "Hunter monitors public buyer requests across Facebook, Instagram, TikTok, and X in real time.",
    metric: "5 Platforms Scanned",
  },
  {
    num: "02",
    label: "Qualification",
    title: "Buyer Intent Verification",
    desc: "Proprietary natural language filters parse local dialects, eliminate spam, and verify ready-to-buy intent.",
    metric: "Spam & Noise Filtered",
  },
  {
    num: "03",
    label: "Delivery",
    title: "Instant WhatsApp Alert",
    desc: "A clean, structured lead card arrives directly in your WhatsApp inbox with buyer contact details and query context.",
    metric: "< 60s Lead Dispatch",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
            The Product Workflow
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1033] tracking-tight mb-4">
            From Social Post to Closed Deal
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Hunter automates the entire top-of-funnel customer discovery process so you can focus on closing deals.
          </p>
        </div>

        {/* Workflow Pipeline (Horizontal on desktop, vertical on mobile) */}
        <div className="relative">
          {/* Connector Line on Desktop */}
          <div className="hidden lg:block absolute top-12 left-8 right-8 h-0.5 bg-purple-100 -z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {WORKFLOW_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex flex-col bg-[#FAF9FF] rounded-3xl p-7 border border-purple-100 shadow-sm hover:border-brand-purple/40 hover:shadow-md transition-all duration-200"
              >
                {/* Step badge & number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="w-10 h-10 rounded-xl bg-brand-purple text-white flex items-center justify-center font-bold text-sm font-mono shadow-sm">
                    {step.num}
                  </span>
                  <span className="text-xs font-semibold text-brand-purple uppercase tracking-wider bg-purple-100 px-3 py-1 rounded-full">
                    {step.label}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1A1033] mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  {step.desc}
                </p>

                {/* Metric pill */}
                <div className="pt-4 border-t border-purple-100 flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                  <span>{step.metric}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
