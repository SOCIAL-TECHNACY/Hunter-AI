"use client";

import { motion } from "framer-motion";
import { MessageSquare, Languages, ShieldCheck, Globe, Clock } from "lucide-react";

const CAPABILITIES = [
  {
    icon: Languages,
    title: "African Dialect & Slang Comprehension",
    description:
      "Trained on conversational African commerce including Nigerian Pidgin, Yoruba, Igbo, Hausa, Sheng, Swahili, Twi, and French.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp-First Delivery",
    description:
      "Zero complicated CRM software to install. Verified lead cards are delivered directly to your existing WhatsApp number.",
  },
  {
    icon: ShieldCheck,
    title: "High-Intent Intent Filtering",
    description:
      "Filters out casual browsers, spam, and non-buyers. Only people actively requesting to purchase reach your inbox.",
  },
  {
    icon: Globe,
    title: "Multi-Platform Coverage",
    description:
      "Monitors buyer inquiries simultaneously across Facebook Groups, Instagram comments, TikTok, and X.",
  },
  {
    icon: Clock,
    title: "Continuous 24/7 Scanning",
    description:
      "Never miss a customer inquiry, even during late-night and early-morning hours when other sellers are offline.",
  },
];

export function BenefitsSection() {
  return (
    <section id="capabilities" className="py-24 bg-[#F4F0FF] text-slate-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Editorial Split-Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Big Editorial Statement */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="text-brand-purple text-xs font-bold uppercase tracking-wider mb-3">
              Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1033] tracking-tight leading-[1.12] mb-6">
              Built for How Africa Actually{" "}
              <span className="font-serif italic font-normal text-brand-purple inline-block pr-1">
                Buys.
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Traditional enterprise software assumes customers use email and web forms. African commerce thrives on social media posts, group comments, and direct WhatsApp conversations.
            </p>
            <div className="p-5 rounded-2xl bg-white border border-purple-200 shadow-sm">
              <p className="text-xs font-semibold text-[#1A1033] mb-1">
                Why Direct Social Discovery Wins
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reaching a buyer within minutes of their inquiry yields up to 4x higher closing rates compared to running passive paid ads.
              </p>
            </div>
          </div>

          {/* Right Column: Clean Structured Capability List */}
          <div className="lg:col-span-7 space-y-4">
            {CAPABILITIES.map(({ icon: Icon, title, description }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:border-brand-purple/40 hover:shadow-md transition-all duration-200 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-brand-purple flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1A1033] mb-1.5">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
