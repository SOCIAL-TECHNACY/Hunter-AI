"use client";

import { motion } from "framer-motion";
import { Bell, Sparkles } from "lucide-react";

const UPCOMING_FEATURES = [
  { emoji: "🤖", title: "AI WhatsApp Closer", desc: "Auto-reply to leads and close sales without lifting a finger" },
  { emoji: "📊", title: "Sales Analytics Dashboard", desc: "Track conversions, revenue, and lead quality in real time" },
  { emoji: "🎯", title: "Targeted Campaigns", desc: "Push your product to buyers in specific cities or demographics" },
  { emoji: "🔗", title: "Multi-Platform Inbox", desc: "Unified inbox for all social media messages and leads" },
  { emoji: "📦", title: "Inventory Integration", desc: "Connect your stock levels and auto-pause when sold out" },
  { emoji: "🌍", title: "Pan-Africa Expansion", desc: "Coverage across 15+ African markets and 30+ languages" },
];

export function ComingSoonSection() {
  return (
    <section className="py-24 relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-accent/10 blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/20 text-purple-300 text-sm font-semibold border border-brand-accent/30 mb-6">
            <Sparkles className="w-4 h-4 text-brand-accent" />
            After MVP Launch
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            The Full Power Is{" "}
            <span className="text-gradient">Coming Soon</span>
          </h2>
          <p className="text-purple-300/70 text-lg max-w-xl mx-auto">
            Pricing and full feature access will be announced after the MVP launch. 
            Founding members get first access and guaranteed best prices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {UPCOMING_FEATURES.map(({ emoji, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-glass rounded-2xl p-5 relative overflow-hidden group"
            >
              {/* Blur overlay for "coming soon" feel */}
              <div className="absolute inset-0 bg-white/2 backdrop-blur-[1px] rounded-2xl opacity-0 group-hover:opacity-0" />
              <div className="relative">
                <span className="text-3xl mb-3 block">{emoji}</span>
                <h3 className="font-bold text-white mb-1">{title}</h3>
                <p className="text-sm text-purple-300/60 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Notify CTA */}
        <div className="bg-glass rounded-2xl p-8 text-center border border-brand-accent/20">
          <Bell className="w-8 h-8 text-brand-accent mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">
            Be the first to know when pricing drops
          </h3>
          <p className="text-purple-300/70 text-sm mb-6">
            Join the waitlist now and we&apos;ll notify you the moment full access and pricing is live.
            Founding members get locked-in founder rates — no price increases, ever.
          </p>
          <button
            onClick={() =>
              document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-gradient-to-r from-brand-purple to-brand-accent text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Join Waitlist — Get Founder Pricing
          </button>
        </div>
      </div>
    </section>
  );
}
