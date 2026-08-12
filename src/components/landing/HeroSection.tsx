"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DiscoveryNode {
  category: string;
  location: string;
  query: string;
  score: string;
  position: string;
  delay: number;
}

const DISCOVERY_NODES: DiscoveryNode[] = [
  {
    category: "Apparel & Fabrics",
    location: "Lagos, NG",
    query: "Looking for wholesale Aso-Oke supplier",
    score: "96% Intent",
    position: "top-4 left-0 sm:-left-6 lg:-left-16",
    delay: 0.2,
  },
  {
    category: "Consumer Tech",
    location: "Accra, GH",
    query: "Need brand new MacBook Pro in Accra",
    score: "93% Intent",
    position: "top-8 right-0 sm:-right-6 lg:-right-16",
    delay: 0.4,
  },
  {
    category: "Catering & Events",
    location: "Abuja, NG",
    query: "Urgent catering for 50 people Saturday",
    score: "95% Intent",
    position: "bottom-8 left-0 sm:-left-4 lg:-left-12",
    delay: 0.6,
  },
  {
    category: "Solar & Clean Energy",
    location: "Nairobi, KE",
    query: "5kVA inverter package installer Nairobi",
    score: "91% Intent",
    position: "bottom-4 right-0 sm:-right-4 lg:-right-12",
    delay: 0.8,
  },
];

export function HeroSection() {
  const scrollToForm = () =>
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-[#0D0820] text-white overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
        {/* Main Headline — No badges above */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6 max-w-4xl mx-auto">
          Find Buyers{" "}
          <span className="font-serif italic font-normal text-gradient inline-block pr-2 sm:pr-3">
            Before
          </span>
          <br />
          They Find You.
        </h1>

        {/* Short Value Proposition */}
        <p className="text-base sm:text-lg lg:text-xl text-purple-200/80 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Hunter scans social platforms 24/7 to detect people actively looking for what you sell, then delivers verified buyer leads directly to your WhatsApp.
        </p>

        {/* Primary Clear CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Button
            size="lg"
            onClick={scrollToForm}
            className="w-full sm:w-auto text-base font-semibold px-8 py-4 shadow-xl shadow-brand-purple/30 group"
          >
            <span>Get Early Access</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Small Supporting Trust Line */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-purple-300/70 mb-16">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-emerald" />
            Free early access
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-purple-300" />
            No credit card required
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-brand-accent" />
            Direct WhatsApp delivery
          </span>
        </div>

        {/* Purposeful Buyer Discovery Visual Architecture */}
        <div className="relative max-w-3xl mx-auto mt-4 pt-6">
          {/* Central Circular Discovery Console with Continuous Orbital Rotation */}
          <div className="relative mx-auto w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
            {/* Outer Orbit Track with subtle beacon points */}
            <div className="absolute inset-0 rounded-full border border-purple-500/20 motion-safe:animate-orbit-slow">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-accent shadow-sm" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
            </div>

            {/* Middle Counter-Rotating Ring */}
            <div className="absolute inset-4 rounded-full border border-dashed border-purple-400/25 motion-safe:animate-orbit-reverse">
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-purple" />
            </div>

            {/* Inner Static Boundary Ring */}
            <div className="absolute inset-9 rounded-full border border-purple-500/20" />

            {/* Slow purposeful sweep line */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none motion-safe:animate-radar-sweep"
              style={{
                background: "conic-gradient(from 0deg, rgba(142, 100, 255, 0.18) 0deg, transparent 60deg, transparent 360deg)",
              }}
            />

            {/* Central Hunter Core Node */}
            <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-brand-purple to-brand-dark p-0.5 shadow-2xl shadow-brand-purple/40 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#12082B] flex flex-col items-center justify-center p-3 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-white">Hunter</span>
                <span className="text-[10px] text-brand-accent font-medium mt-0.5">Active Scan</span>
              </div>
            </div>
          </div>

          {/* Surrounding Purposeful Intent Nodes (Visible on Tablet & Desktop) */}
          <div className="hidden md:block">
            {DISCOVERY_NODES.map((node) => (
              <motion.div
                key={node.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: node.delay, duration: 0.6 }}
                className={`absolute ${node.position} z-20 text-left bg-[#140B2E]/90 border border-purple-500/20 backdrop-blur-md rounded-2xl p-3.5 max-w-[240px] shadow-lg`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wide">
                    {node.category}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    {node.score}
                  </span>
                </div>
                <p className="text-xs text-white font-medium line-clamp-1 mb-1">
                  &ldquo;{node.query}&rdquo;
                </p>
                <span className="text-[10px] text-purple-300/60 block">{node.location}</span>
              </motion.div>
            ))}
          </div>

          {/* Mobile Intent Node Strip */}
          <div className="md:hidden mt-6 grid grid-cols-1 gap-2.5 text-left">
            {DISCOVERY_NODES.slice(0, 2).map((node) => (
              <div
                key={node.category}
                className="bg-[#140B2E]/80 border border-purple-500/20 rounded-xl p-3 text-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-brand-accent text-[11px]">{node.category}</span>
                  <span className="text-[10px] font-bold text-emerald-400">{node.score}</span>
                </div>
                <p className="text-white font-medium">&ldquo;{node.query}&rdquo;</p>
                <span className="text-[10px] text-purple-300/60 mt-0.5 block">{node.location}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
