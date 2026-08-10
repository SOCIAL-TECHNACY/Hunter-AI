"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Lock, Users, ArrowRight } from "lucide-react";
import { BATCH_TIMELINE } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

export function BatchTimeline() {
  const scrollToForm = () =>
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="early-access" className="py-24 bg-white text-slate-900 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand-purple text-xs font-bold tracking-widest uppercase mb-3">
            Phased Rollout Schedule
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1033] tracking-tight mb-4">
            Early Access <span className="text-gradient-purple font-serif italic">Batches</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Access is granted in controlled cohorts to guarantee lightning-fast lead delivery speeds and dedicated onboarding for every business.
          </p>
        </div>

        {/* Batch Cards */}
        <div className="space-y-4">
          {BATCH_TIMELINE.map((batch, i) => {
            const isBoarding = batch.status === "boarding";

            return (
              <motion.div
                key={batch.batchNumber}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className={cn(
                  "rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200 border",
                  isBoarding
                    ? "bg-[#FAF9FF] border-brand-purple/40 shadow-lg shadow-purple-950/5 ring-2 ring-brand-purple/20"
                    : "bg-white border-slate-200/80 shadow-sm opacity-80"
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
                      isBoarding
                        ? "bg-brand-emerald/15 text-brand-emerald"
                        : "bg-slate-100 text-slate-400"
                    )}
                  >
                    {isBoarding ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-extrabold text-lg text-[#1A1033]">
                        {batch.label}
                      </h3>
                      {isBoarding && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-emerald/15 text-emerald-700 border border-brand-emerald/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                          Boarding Now
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      Capacity: {batch.capacity} verified businesses · Window: {batch.startDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  {isBoarding ? (
                    <button
                      onClick={scrollToForm}
                      className="w-full sm:w-auto text-xs font-bold text-brand-purple hover:text-brand-purple-hover flex items-center justify-center sm:justify-start gap-1 py-2 px-4 rounded-xl bg-purple-100 hover:bg-purple-200 transition-colors"
                    >
                      Claim Spot <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Queued
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Jump queue callout card */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-brand-light to-purple-50 border border-purple-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A1033]">
                Want to skip straight to Batch 1?
              </p>
              <p className="text-xs text-slate-600">
                Refer 3 other business owners to jump to the front of the queue immediately.
              </p>
            </div>
          </div>
          <button
            onClick={scrollToForm}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold bg-brand-purple text-white hover:bg-brand-purple-hover transition-colors shadow-sm"
          >
            Get Referral Code
          </button>
        </div>
      </div>
    </section>
  );
}
