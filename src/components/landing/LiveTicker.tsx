"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, MessageSquare, RefreshCw, MousePointer2 } from "lucide-react";

interface WorkflowDemoStep {
  id: string;
  stepNum: string;
  stepName: string;
  title: string;
  source: string;
  location: string;
  query: string;
  intentScore: number;
  category: string;
  whatsappPreview: string;
  timestamp: string;
}

const DEMO_STEPS: WorkflowDemoStep[] = [
  {
    id: "step-1",
    stepNum: "01",
    stepName: "Social Signal",
    title: "Raw Inquiry Detected",
    source: "Facebook Public Group",
    location: "Ibadan, Nigeria",
    query: "Please who sells quality Aso-Oke in Ibadan? Need urgently for next Saturday wedding.",
    intentScore: 98,
    category: "Apparel & Traditional Fabrics",
    whatsappPreview: "🎯 Direct Lead: Buyer actively seeking urgent Aso-Oke in Ibadan. High purchase urgency.",
    timestamp: "18 seconds ago",
  },
  {
    id: "step-2",
    stepNum: "02",
    stepName: "Intent Detected",
    title: "AI Intent Verification",
    source: "Instagram Public Comment",
    location: "Lagos (VI / Lekki), Nigeria",
    query: "Who has original glueless frontal wig 24 inches available for pickup today in Lekki?",
    intentScore: 95,
    category: "Beauty & Hair",
    whatsappPreview: "🎯 Direct Lead: Customer in Lekki searching for 24-inch frontal wig for same-day pickup.",
    timestamp: "42 seconds ago",
  },
  {
    id: "step-3",
    stepNum: "03",
    stepName: "Qualified Buyer",
    title: "Dialect & Product Matching",
    source: "Twitter / X Post",
    location: "Accra, Ghana",
    query: "Looking for trusted seller with brand new MacBook M3 Pro in stock in Accra.",
    intentScore: 94,
    category: "Consumer Electronics",
    whatsappPreview: "🎯 Direct Lead: Tech buyer in Accra seeking brand new MacBook M3 Pro stock.",
    timestamp: "1 minute ago",
  },
  {
    id: "step-4",
    stepNum: "04",
    stepName: "WhatsApp Delivery",
    title: "Dispatched Lead Card",
    source: "TikTok Video Comment",
    location: "Nairobi, Kenya",
    query: "Wapi ninaweza kupata 5kVA solar inverter and battery package for home in Karen?",
    intentScore: 96,
    category: "Solar & Clean Energy",
    whatsappPreview: "🎯 Direct Lead: Nairobi homeowner looking for 5kVA solar battery installation in Karen.",
    timestamp: "2 minutes ago",
  },
];

export function LiveTicker() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DEMO_STEPS.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const current = DEMO_STEPS[activeIndex];

  return (
    <section id="live-scanner" className="py-24 bg-[#120A2B] text-white border-y border-purple-900/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-2">
            Product Demonstration
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            How Hunter Detects Active Buyer Intent
          </h2>
          <p className="text-purple-200/70 text-sm sm:text-base mt-2">
            Watch how Hunter processes conversational requests into qualified WhatsApp opportunities in under 60 seconds.
          </p>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Step Selection Tabs (Left Column) */}
          <div className="lg:col-span-5 space-y-2.5 relative">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-semibold text-purple-300/80 uppercase tracking-wider">
                Discovery Workflow
              </span>
              <button
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                className="text-[11px] text-brand-accent hover:text-white flex items-center gap-1 font-medium transition-colors"
              >
                <RefreshCw className={`w-3 h-3 ${isAutoPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "8s" }} />
                {isAutoPlaying ? "Auto-Demo Playing" : "Paused"}
              </button>
            </div>

            {DEMO_STEPS.map((step, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border relative flex flex-col gap-1.5 ${
                    isSelected
                      ? "bg-white/[0.08] border-brand-accent shadow-lg ring-1 ring-brand-accent/40"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/15"
                  }`}
                >
                  {/* Visual Cursor Indicator on Active Item */}
                  {isSelected && (
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 bg-brand-purple text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md animate-pulse">
                      <MousePointer2 className="w-3 h-3" />
                      <span>Active</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-brand-accent">{step.stepNum} · {step.stepName}</span>
                    <span className="text-[10px] text-purple-300/60 font-mono">{step.timestamp}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    {step.title}
                  </p>
                  <p className="text-xs text-purple-200/70 line-clamp-1">
                    &ldquo;{step.query}&rdquo;
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Signal Inspection Console */}
          <div className="lg:col-span-7 bg-[#170C38] border border-purple-500/25 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {/* Status Bar */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-purple-500/20 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
                <span className="font-bold text-white uppercase tracking-wider">Step {current.stepNum}: {current.stepName}</span>
              </div>
              <span className="text-purple-300/70 font-mono text-[11px]">{current.source}</span>
            </div>

            <div className="space-y-4">
              {/* Detected Post Details */}
              <div>
                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block mb-1.5">
                  Customer Social Media Inquiry
                </span>
                <div className="p-4 rounded-2xl bg-[#0F0726] border border-purple-500/20">
                  <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                    &ldquo;{current.query}&rdquo;
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-purple-300/70 pt-2 border-t border-white/5">
                    <span><strong>Location:</strong> {current.location}</span>
                    <span>·</span>
                    <span><strong>Category:</strong> {current.category}</span>
                  </div>
                </div>
              </div>

              {/* Intent Scoring */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-purple-900/20 border border-purple-500/20">
                  <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block mb-0.5">
                    Purchase Urgency
                  </span>
                  <p className="text-xl font-bold text-emerald-400 font-mono">
                    {current.intentScore}% Score
                  </p>
                  <span className="text-[10px] text-purple-300/70">Verified commercial intent</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-900/20 border border-purple-500/20">
                  <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block mb-0.5">
                    Delivery Speed
                  </span>
                  <p className="text-xl font-bold text-brand-accent font-mono">
                    &lt; 60s
                  </p>
                  <span className="text-[10px] text-purple-300/70">Sent directly to WhatsApp</span>
                </div>
              </div>

              {/* WhatsApp Lead Delivery Preview */}
              <div>
                <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Delivered WhatsApp Card Preview
                </span>
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-100">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
                      Hunter Lead Alert
                    </span>
                    <span className="text-[10px] text-emerald-400/80 font-mono">Instant Dispatch</span>
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
