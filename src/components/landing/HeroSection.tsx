"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { APP_NAME } from "@/lib/constants";

const STATS = [
  { icon: Users, value: "2,400+", label: "Businesses on waitlist" },
  { icon: TrendingUp, value: "87%", label: "Avg. lead conversion" },
  { icon: Zap, value: "< 60s", label: "First lead delivered" },
];

const AVATARS = ["🧑🏿‍💼", "👩🏾‍💻", "🧕🏾", "👨🏽‍🍳", "👩🏿‍🔬"];

export function HeroSection() {
  const scrollToForm = () =>
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-purple/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-accent/10 blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-24 text-center">
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Badge variant="purple" className="text-sm py-1.5 px-4">
            <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
            Live Waitlist — Founding Member Spots Open
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6"
        >
          Find Buyers{" "}
          <span className="text-gradient font-serif italic">Before</span>
          <br />
          They Find You.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-purple-300/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {APP_NAME} scans social media 24/7 to find people actively looking for what your business
          sells — and delivers them directly to your WhatsApp inbox.
        </motion.p>

        {/* Social proof + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {AVATARS.map((emoji, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-brand-purple/30 border-2 border-brand-dark flex items-center justify-center text-base"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-sm text-purple-300">
              <strong className="text-white">2,400+</strong> businesses joined
            </p>
          </div>
          <Button size="lg" onClick={scrollToForm}>
            Secure Your Spot <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="bg-glass rounded-2xl px-6 py-4 flex flex-col items-center gap-1"
            >
              <Icon className="w-5 h-5 text-brand-accent mb-1" />
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-purple-400 text-center">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
