"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle2, MessageSquare, RefreshCw, MousePointer2, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  processingLabel: string;
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
    processingLabel: "Scanning public social feeds & group inquiries...",
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
    processingLabel: "Evaluating buyer intent & purchase timeline...",
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
    processingLabel: "Matching local dialect, location & merchant catalog...",
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
    processingLabel: "Formatting and dispatching WhatsApp lead card...",
  },
];

export function LiveTicker() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingIndex, setProcessingIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerStepTransition = (targetIndex: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsProcessing(true);
    setProcessingIndex(targetIndex);

    timeoutRef.current = setTimeout(() => {
      setActiveIndex(targetIndex);
      setIsProcessing(false);
    }, 1400);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % DEMO_STEPS.length;
      triggerStepTransition(nextIndex);
    }, 5500);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isAutoPlaying, activeIndex]);

  const current = DEMO_STEPS[activeIndex];
  const targetStep = DEMO_STEPS[processingIndex];

  return (
    <section id="live-scanner" className="py-24 bg-[#120A2B] text-white border-y border-purple-900/30 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
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
                title="Toggle auto-play"
              >
                <RefreshCw className={`w-3 h-3 ${isAutoPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "8s" }} />
                {isAutoPlaying ? "Auto-Demo Playing" : "Paused"}
              </button>
            </div>

            {DEMO_STEPS.map((step, idx) => {
              const isSelected = idx === (isProcessing ? processingIndex : activeIndex);
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    triggerStepTransition(idx);
                  }}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border relative flex flex-col gap-1.5 ${
                    isSelected
                      ? "bg-white/[0.08] border-brand-accent shadow-lg ring-1 ring-brand-accent/40"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/15"
                  }`}
                >
                  {/* Clearly visible cursor indicator */}
                  {isSelected && (
                    <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-brand-purple border border-purple-300/30 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md z-20">
                      <MousePointer2 className="w-3 h-3 text-brand-accent animate-bounce" />
                      <span>{isProcessing ? "Processing" : "Active"}</span>
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
          <div className="lg:col-span-7 bg-[#170C38] border border-purple-500/25 rounded-3xl p-6 sm:p-8 shadow-2xl min-h-[380px] flex flex-col justify-between relative overflow-hidden">
            <AnimatePresence mode="wait">
              {isProcessing ? (
                /* Meaningful Product-Style Processing / Scanning State */
                <motion.div
                  key="processing-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-5"
                >
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-purple-500/30 motion-safe:animate-ping" />
                    <div className="relative w-12 h-12 rounded-2xl bg-brand-purple/30 border border-brand-accent/40 flex items-center justify-center text-brand-accent">
                      <Activity className="w-6 h-6 animate-pulse text-brand-accent" />
                    </div>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/20 border border-purple-400/30 text-brand-accent text-xs font-mono font-semibold mb-2">
                      <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
                      Step {targetStep.stepNum}: {targetStep.stepName}
                    </div>
                    <p className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {targetStep.processingLabel}
                    </p>
                  </div>

                  {/* Signal scanning progress sweep line */}
                  <div className="w-48 sm:w-64 h-1.5 rounded-full bg-purple-950 overflow-hidden border border-purple-800/40 relative">
                    <motion.div
                      className="h-full bg-gradient-to-r from-brand-purple via-brand-accent to-emerald-400 rounded-full"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              ) : (
                /* Completed State Details */
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  {/* Status Bar */}
                  <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-purple-500/20 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-emerald" />
                      <span className="font-bold text-white uppercase tracking-wider">
                        Step {current.stepNum}: {current.stepName}
                      </span>
                    </div>
                    <span className="text-purple-300/70 font-mono text-[11px]">{current.source}</span>
                  </div>

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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
