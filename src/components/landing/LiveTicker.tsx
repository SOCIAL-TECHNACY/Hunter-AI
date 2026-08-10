"use client";

import { useState } from "react";
import { Radar, ExternalLink, Radio } from "lucide-react";

interface LeadSignal {
  emoji: string;
  query: string;
  intent: string;
  platform: string;
  location: string;
  time: string;
}

const LIVE_LEADS: LeadSignal[] = [
  {
    emoji: "👗",
    query: "Who sells quality Aso-Oke in Ibadan? Need for wedding next week urgently!",
    intent: "Fashion / Traditional Wear",
    platform: "Facebook Group",
    location: "Ibadan, NG",
    time: "32s ago",
  },
  {
    emoji: "📱",
    query: "Looking for brand new iPhone 15 Pro Max 256GB physical SIM Accra",
    intent: "Electronics & Gadgets",
    platform: "Twitter / X",
    location: "Accra, GH",
    time: "1m ago",
  },
  {
    emoji: "🥘",
    query: "Anyone know a caterer for 50 guests corporate lunch in Westlands?",
    intent: "Food & Catering",
    platform: "Instagram",
    location: "Nairobi, KE",
    time: "2m ago",
  },
  {
    emoji: "🚗",
    query: "Reliable auto mechanic for Honda Accord 2018 gearbox around Surulere?",
    intent: "Automotive Services",
    platform: "WhatsApp Group",
    location: "Lagos, NG",
    time: "3m ago",
  },
  {
    emoji: "💄",
    query: "Wapi nitapata skin care products original za CeraVe na The Ordinary?",
    intent: "Beauty & Wellness",
    platform: "TikTok",
    location: "Nairobi, KE",
    time: "4m ago",
  },
  {
    emoji: "🏢",
    query: "Need 2-bedroom serviced apartment Lekki Phase 1 for 3 months lease",
    intent: "Real Estate & Shortlets",
    platform: "Facebook Marketplace",
    location: "Lagos, NG",
    time: "5m ago",
  },
  {
    emoji: "📦",
    query: "Who dey do fast dispatch delivery from Ikeja to Trade Fair today?",
    intent: "Logistics & Delivery",
    platform: "Twitter / X",
    location: "Lagos, NG",
    time: "6m ago",
  },
];

export function LiveTicker() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="live-radar" className="py-20 bg-[#120A2B] border-y border-purple-900/30 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-purple/15 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/15 border border-brand-emerald/30 text-emerald-300 text-xs font-semibold mb-3">
              <Radio className="w-3.5 h-3.5 text-brand-emerald animate-pulse" />
              Live Buying Signal Radar
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Real African Buyers. <span className="text-gradient">Active Now.</span>
            </h2>
            <p className="text-purple-200/70 text-sm sm:text-base mt-2 max-w-xl">
              Hunter AI constantly analyzes posts across social platforms, filtering high-intent inquiries from casual chatter.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-purple-300/60 self-start md:self-auto">
            <Radar className="w-4 h-4 text-brand-accent animate-spin" style={{ animationDuration: "12s" }} />
            <span>Scanning 5 social platforms · 24/7</span>
          </div>
        </div>

        {/* Live Signal Feed Container */}
        <div
          className="relative rounded-2xl bg-brand-dark/70 border border-purple-500/20 p-2 overflow-hidden shadow-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top and bottom gradient fade overlays */}
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-brand-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-brand-dark to-transparent z-10 pointer-events-none" />

          {/* Scrolling track */}
          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {LIVE_LEADS.map((lead, i) => (
              <div
                key={i}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-brand-accent/40 hover:bg-white/[0.06] transition-all duration-200"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <span className="text-2xl p-2 rounded-xl bg-purple-900/30 border border-purple-500/20 flex-shrink-0">
                    {lead.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white group-hover:text-purple-100 transition-colors line-clamp-2 sm:line-clamp-1">
                      &ldquo;{lead.query}&rdquo;
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                      <span className="font-semibold text-brand-accent px-2 py-0.5 rounded bg-brand-purple/20">
                        {lead.platform}
                      </span>
                      <span className="text-purple-400">· {lead.location}</span>
                      <span className="text-purple-400/80 font-medium">· {lead.intent}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pl-11 sm:pl-0 flex-shrink-0">
                  <span className="text-xs text-purple-400/80 font-mono">{lead.time}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-emerald bg-brand-emerald/10 px-2.5 py-1 rounded-full border border-brand-emerald/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                    High Intent
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-purple-300/50 mt-4">
          Hover feed to inspect leads · Data simulated based on real customer discovery patterns
        </p>
      </div>
    </section>
  );
}
