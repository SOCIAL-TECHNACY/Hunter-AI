"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Globe, TrendingUp, Phone, Cpu } from "lucide-react";

const BENEFITS = [
  {
    icon: Clock,
    title: "Works While You Sleep",
    description:
      "Hunter AI runs 24/7 so you never miss a buyer even at 3am when your competitors are offline.",
  },
  {
    icon: Globe,
    title: "Multi-Platform Coverage",
    description:
      "Facebook, Instagram, TikTok, Twitter, Telegram and WhatsApp groups — all scanned simultaneously.",
  },
  {
    icon: Phone,
    title: "Delivered to WhatsApp",
    description:
      "No apps to learn. Leads arrive directly in your WhatsApp as clean, actionable cards.",
  },
  {
    icon: TrendingUp,
    title: "Speaks Your Language",
    description:
      "Understands Pidgin, Yoruba, Igbo, Hausa, Swahili, Twi, and 20+ African dialects to find more buyers.",
  },
  {
    icon: Shield,
    title: "Verified Intent Only",
    description:
      "AI filters out spam and non-buyers. Only people actively looking to purchase reach your inbox.",
  },
  {
    icon: Cpu,
    title: "Learns Your Business",
    description:
      "The more you use it, the smarter it gets. Hunter AI adapts to your niche and customer patterns.",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Why Hunter AI
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Built for African{" "}
            <span className="text-gradient">Hustle Culture</span>
          </h2>
          <p className="text-purple-300/70 text-lg max-w-xl mx-auto">
            No cold calling. No ads budget. Just warm, ready-to-buy customers delivered to you automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-glass rounded-2xl p-6 hover:border-brand-accent/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-purple/20 flex items-center justify-center mb-4 group-hover:bg-brand-purple/30 transition-colors">
                <Icon className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
              <p className="text-purple-300/70 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
