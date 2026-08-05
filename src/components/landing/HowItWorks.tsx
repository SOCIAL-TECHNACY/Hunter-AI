"use client";

import { motion } from "framer-motion";
import { Search, MessageSquare, Repeat } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Hunter Scans Social Media",
    description:
      "Hunter AI monitors Facebook, Instagram, TikTok, Twitter and WhatsApp groups 24/7, identifying posts from people actively searching for your product.",
    example: {
      platform: "Facebook Group",
      text: "📦 Please who sells quality aso-oke in Ibadan? Need urgently for next Saturday owambe.",
      time: "Just now",
    },
  },
  {
    step: "02",
    icon: MessageSquare,
    title: "You Get the Lead Instantly",
    description:
      "A clean lead card arrives in your WhatsApp with the buyer's post, contact info, and platform — no tech skills needed. Just reply and sell.",
    example: {
      platform: "WhatsApp",
      text: "🎯 New lead for your business!\nBuyer: @omowunmi_looks\nLooking for: Aso-oke fabric in Ibadan\nPlatform: Facebook",
      time: "< 60 seconds",
    },
  },
  {
    step: "03",
    icon: Repeat,
    title: "Close Sales. Scale Up.",
    description:
      "Connect directly with buyers who already want what you sell. No cold calling. No guessing. Just warm leads delivered while you sleep.",
    example: {
      platform: "Your Phone",
      text: "💰 Sale closed!\nBuyer purchased 3 yards of aso-oke.\nRevenue: ₦45,000\nTime from lead to sale: 22 minutes",
      time: "Today",
    },
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            From Social Media Post to{" "}
            <span className="text-gradient">Your WhatsApp</span>
          </h2>
          <p className="text-purple-300/70 text-lg max-w-xl mx-auto">
            Three simple steps that transform social media noise into ready-to-buy customers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {STEPS.map(({ step, icon: Icon, title, description, example }, i) => (
            <motion.div
              key={step}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative"
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(100%+0px)] w-8 h-px bg-gradient-to-r from-brand-accent/50 to-transparent" />
              )}

              <div className="bg-glass rounded-2xl p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-4xl font-black text-brand-purple/30 leading-none">
                    {step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand-accent" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-purple-300/70 text-sm leading-relaxed mb-5">{description}</p>

                {/* Lead card mockup */}
                <div className="mt-auto bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
                    <span className="text-xs text-brand-emerald font-medium">{example.platform}</span>
                    <span className="text-xs text-purple-500 ml-auto">{example.time}</span>
                  </div>
                  <p className="text-xs text-purple-200 leading-relaxed whitespace-pre-line">
                    {example.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
