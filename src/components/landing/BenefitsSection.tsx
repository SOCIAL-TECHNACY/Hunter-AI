"use client";

import { motion } from "framer-motion";
import { Clock, Globe2, PhoneCall, Languages, ShieldCheck, Cpu } from "lucide-react";

const BENEFITS = [
  {
    icon: Clock,
    title: "Always Hunting While You Sleep",
    description:
      "Hunter AI stays awake 24/7, catching early morning and late night buyer requests when your competition is offline.",
  },
  {
    icon: Languages,
    title: "Trained on African Dialects",
    description:
      "Understands Nigerian Pidgin, Yoruba, Igbo, Hausa, Sheng, Swahili, Twi, and French to spot genuine local demand.",
  },
  {
    icon: PhoneCall,
    title: "Zero Apps. 100% WhatsApp.",
    description:
      "No complicated CRM software to install. Leads arrive as pre-formatted cards directly on your WhatsApp phone number.",
  },
  {
    icon: Globe2,
    title: "Multi-Platform Coverage",
    description:
      "Simultaneously tracks public buyer posts across Facebook Groups, Instagram comments, TikTok, and Twitter/X.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Intent Filtering",
    description:
      "Proprietary AI filters out casual browsers, spam, and sellers. Only customers ready to buy reach your notifications.",
  },
  {
    icon: Cpu,
    title: "Self-Learning Precision",
    description:
      "Hunter AI learns your specific inventory, price ranges, and target cities over time to deliver higher quality leads.",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-24 bg-[#F4F0FF] relative overflow-hidden">
      {/* Decorative subtle gradient */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-300/30 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand-purple text-xs font-bold tracking-widest uppercase mb-3">
            Why Hunter AI
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1033] tracking-tight mb-4">
            Engineered for African <span className="text-gradient-purple font-serif italic">Commerce</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Built specifically around the way real business happens across Lagos, Nairobi, Accra, Johannesburg, and beyond.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white rounded-3xl p-7 border border-purple-200/70 shadow-md shadow-purple-950/5 hover:border-brand-purple hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mb-5 shadow-sm">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1033] mb-2.5">
                {title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
