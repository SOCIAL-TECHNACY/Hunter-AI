"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, MessageSquare, RefreshCw } from "lucide-react";

interface Signal {
  id: string;
  source: string;
  sourceType: string;
  location: string;
  query: string;
  intentScore: number;
  category: string;
  whatsappPreview: string;
  status: string;
  timestamp: string;
}

const SIGNALS_FEED: Signal[] = [
  {
    id: "sig-01",
    source: "Facebook Public Group",
    sourceType: "Group Post",
    location: "Ibadan, Nigeria",
    query: "Please who sells quality Aso-Oke in Ibadan? Need urgently for next Saturday wedding.",
    intentScore: 98,
    category: "Apparel & Fabrics",
    whatsappPreview: "🎯 Direct Lead: Buyer looking for urgent Aso-Oke in Ibadan. High purchase urgency.",
    status: "Lead Dispatched",
    timestamp: "12 seconds ago",
  },
  {
    id: "sig-02",
    source: "Instagram Public Comment",
    sourceType: "Public Comment",
    location: "Lagos (VI / Lekki), Nigeria",
    query: "Who has original glueless frontal wig 24 inches available for pickup today in Lekki?",
    intentScore: 95,
    category: "Beauty & Hair",
    whatsappPreview: "🎯 Direct Lead: Customer in Lekki searching for 24-inch frontal wig for same-day pickup.",
    status: "Lead Dispatched",
    timestamp: "38 seconds ago",
  },
  {
    id: "sig-03",
    source: "Twitter / X Post",
    sourceType: "Public Inquiry",
    location: "Accra, Ghana",
    query: "Looking for trusted seller with brand new MacBook M3 Pro in stock in Accra.",
    intentScore: 93,
    category: "Consumer Tech",
    whatsappPreview: "🎯 Direct Lead: Tech buyer in Accra seeking brand new MacBook M3 Pro stock.",
    status: "Lead Dispatched",
    timestamp: "1 minute ago",
  },
  {
    id: "sig-04",
    source: "TikTok Video Comment",
    sourceType: "Inquiry Comment",
    location: "Nairobi, Kenya",
    query: "Wapi ninaweza kupata 5kVA solar inverter and lithium battery package for home in Karen?",
    intentScore: 96,
    category: "Solar & Energy",
    whatsappPreview: "🎯 Direct Lead: Nairobi homeowner looking for 5kVA solar battery installation.",
    status: "Lead Dispatched",
    timestamp: "2 minutes ago",
  },
  {
    id: "sig-05",
    source: "Facebook Marketplace",
    sourceType: "Buyer Request",
    location: "Abuja, Nigeria",
    query: "Need a caterer for 40 persons corporate luncheon this Thursday in Central Area Abuja.",
    intentScore: 97,
    category: "Catering & Events",
    whatsappPreview: "🎯 Direct Lead: Corporate organizer in Abuja requesting 40-person lunch catering.",
    status: "Lead Dispatched",
    timestamp: "3 minutes ago",
  },
];

export function LiveTicker() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SIGNALS_FEED.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const current = SIGNALS_FEED[activeIndex];

  return (
    <section id="live-scanner" className="py-20 bg-[#120A2B] text-white border-y border-purple-900/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-2">
            Live Product Demonstration
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            How Hunter Detects Active Buyer Intent
          </h2>
          <p className="text-purple-200/70 text-sm sm:text-base mt-2">
            This live console shows how Hunter parses social media posts, calculates buying intent, and formats leads for WhatsApp delivery.
          </p>
        </div>

        {/* Live Hunter Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Signal Selection Panel (Left Column) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-semibold text-purple-300/80 uppercase tracking-wider">
                Detected Signals Stream
              </span>
              <button
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                className="text-[11px] text-brand-accent hover:text-white flex items-center gap-1 font-medium transition-colors"
              >
                <RefreshCw className={`w-3 h-3 ${isAutoPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "8s" }} />
                {isAutoPlaying ? "Auto-Scanning" : "Paused"}
              </button>
            </div>

            {SIGNALS_FEED.map((sig, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={sig.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 border flex flex-col gap-1.5 ${
                    isSelected
                      ? "bg-white/[0.08] border-brand-accent/60 shadow-md ring-1 ring-brand-accent/30"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white tracking-tight">{sig.category}</span>
                    <span className="text-[10px] text-purple-300/60">{sig.timestamp}</span>
                  </div>
                  <p className="text-xs text-purple-200/90 line-clamp-1 font-medium">
                    &ldquo;{sig.query}&rdquo;
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-purple-300/60 pt-0.5">
                    <span>{sig.location}</span>
                    <span className="text-emerald-400 font-semibold">{sig.intentScore}% Intent</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Inspection & WhatsApp Delivery Console (Right Column) */}
          <div className="lg:col-span-7 bg-[#170C38] border border-purple-500/25 rounded-2xl p-6 sm:p-7 shadow-2xl">
            {/* Top Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-purple-500/20 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
                <span className="font-bold text-white uppercase tracking-wide">Inspection Workspace</span>
              </div>
              <span className="text-purple-300/70 font-mono text-[11px]">{current.id} · {current.timestamp}</span>
            </div>

            {/* Signal Details */}
            <div className="space-y-4">
              {/* Raw Post Query Box */}
              <div>
                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block mb-1.5">
                  1. Raw Post Detected on {current.source}
                </span>
                <div className="p-4 rounded-xl bg-[#0F0726] border border-purple-500/20">
                  <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                    &ldquo;{current.query}&rdquo;
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-purple-300/70 pt-2 border-t border-white/5">
                    <span><strong>Location:</strong> {current.location}</span>
                    <span>·</span>
                    <span><strong>Type:</strong> {current.sourceType}</span>
                  </div>
                </div>
              </div>

              {/* Hunter Qualification Box */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-purple-900/20 border border-purple-500/20">
                  <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block mb-1">
                    Intent Verification
                  </span>
                  <p className="text-xl font-bold text-emerald-400 font-mono">
                    {current.intentScore}% Score
                  </p>
                  <span className="text-[10px] text-purple-300/70">Casual noise filtered out</span>
                </div>
                <div className="p-3.5 rounded-xl bg-purple-900/20 border border-purple-500/20">
                  <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block mb-1">
                    Match Category
                  </span>
                  <p className="text-sm font-bold text-white truncate">
                    {current.category}
                  </p>
                  <span className="text-[10px] text-purple-300/70">Matched to merchant inventory</span>
                </div>
              </div>

              {/* Formatted WhatsApp Lead Delivery Preview */}
              <div>
                <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  2. Dispatched Lead Delivered to Seller&apos;s WhatsApp
                </span>
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-100">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
                      Hunter Lead Alert
                    </span>
                    <span className="text-[10px] text-emerald-400/80 font-mono">&lt; 45s Delivery</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-emerald-100/90 font-medium">
                    {current.whatsappPreview}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
