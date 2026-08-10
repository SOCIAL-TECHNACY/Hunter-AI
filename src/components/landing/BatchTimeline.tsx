"use client";

import { motion } from "framer-motion";
import { Users, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { BATCH_TIMELINE } from "@/lib/constants";

export function BatchTimeline() {
  const scrollToForm = () =>
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="early-access" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
            Early Access Incentive
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1033] tracking-tight mb-4">
            Join the Waitlist. Get 7 Days at Launch.
          </h2>
          <p className="text-slate-600 text-base">
            Businesses that register on the waitlist receive <strong>7 full days of early access</strong> upon launch. Public accounts created post-launch will receive 3 days.
          </p>
        </div>

        {/* Access Comparison Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="p-6 rounded-2xl bg-[#FAF9FF] border border-brand-purple/30 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-brand-purple bg-purple-100 px-3 py-1 rounded-full inline-block mb-3">
                Waitlist Members
              </span>
              <p className="text-3xl font-extrabold text-[#1A1033] mb-1 font-mono">7 Days Access</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full access to lead hunting, real-time WhatsApp delivery, and locked-in founder pricing at commercial launch.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-purple-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-brand-emerald" />
              Guaranteed Priority Queue Spot
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 opacity-75 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 bg-slate-200 px-3 py-1 rounded-full inline-block mb-3">
                Post-Launch Public
              </span>
              <p className="text-3xl font-extrabold text-slate-700 mb-1 font-mono">3 Days Access</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Standard access period with standard subscription rates and general support queue.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Clock className="w-4 h-4 text-slate-400" />
              Subject to queue availability
            </div>
          </div>
        </div>

        {/* Cohort Progression List */}
        <div className="space-y-3 mb-10">
          {BATCH_TIMELINE.map((batch, i) => {
            const isBoarding = batch.status === "boarding";
            return (
              <motion.div
                key={batch.batchNumber}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className={`p-4 sm:p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isBoarding
                    ? "bg-white border-brand-purple/40 shadow-sm"
                    : "bg-slate-50/50 border-slate-200/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                    isBoarding ? "bg-brand-purple text-white" : "bg-slate-200 text-slate-600"
                  }`}>
                    0{batch.batchNumber}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#1A1033]">{batch.label}</p>
                    <p className="text-xs text-slate-500">
                      Capacity: {batch.capacity} merchants · Allocation: {batch.startDate}
                    </p>
                  </div>
                </div>

                <span className={`text-xs font-semibold px-3 py-1 rounded-full self-start sm:self-auto ${
                  isBoarding ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
                }`}>
                  {isBoarding ? "Open for Registration" : "Queued"}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Referral Callout */}
        <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-brand-purple text-white flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1A1033]">
                Refer 3 businesses to skip the queue
              </p>
              <p className="text-xs text-slate-600">
                Every confirmed referral earns you 100 points and moves you up the access list.
              </p>
            </div>
          </div>
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-purple text-white hover:bg-brand-purple-hover transition-colors flex items-center justify-center gap-1.5 flex-shrink-0 shadow-sm"
          >
            Claim Your 7 Days <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
