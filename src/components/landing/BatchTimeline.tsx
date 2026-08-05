"use client";

import { motion } from "framer-motion";
import { CheckCircle, Circle, Lock } from "lucide-react";
import { BATCH_TIMELINE } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

const STATUS_STYLES = {
  boarding: {
    badge: "bg-brand-emerald/20 text-emerald-300 border-brand-emerald/30",
    label: "Boarding Now",
    icon: CheckCircle,
    ring: "ring-brand-emerald/40",
  },
  next: {
    badge: "bg-brand-accent/20 text-purple-300 border-brand-accent/30",
    label: "Up Next",
    icon: Circle,
    ring: "ring-brand-accent/30",
  },
  queued: {
    badge: "bg-white/10 text-purple-400 border-white/10",
    label: "Queued",
    icon: Lock,
    ring: "ring-white/10",
  },
  completed: {
    badge: "bg-white/5 text-purple-500 border-white/5",
    label: "Closed",
    icon: CheckCircle,
    ring: "ring-white/5",
  },
};

export function BatchTimeline() {
  return (
    <section id="early-access" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
            7-Day Early Access
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Join the Right Batch.{" "}
            <span className="text-gradient">Skip the Queue.</span>
          </h2>
          <p className="text-purple-300/70 text-lg max-w-xl mx-auto">
            Founding members get lifetime discounts, first features, and dedicated support. Each batch closes fast.
          </p>
        </div>

        <div className="space-y-4">
          {BATCH_TIMELINE.map((batch, i) => {
            const style = STATUS_STYLES[batch.status];
            const Icon = style.icon;

            return (
              <motion.div
                key={batch.batchNumber}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={cn(
                  "bg-glass rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4",
                  batch.status === "boarding" && "ring-1 glow-sm",
                  style.ring
                )}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                      batch.status === "boarding"
                        ? "bg-brand-emerald/20"
                        : "bg-white/5"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-6 h-6",
                        batch.status === "boarding" ? "text-brand-emerald" : "text-purple-400"
                      )}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white">{batch.label}</p>
                    <p className="text-sm text-purple-400">
                      {batch.capacity} spots · Starts {batch.startDate}
                    </p>
                  </div>
                </div>

                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold border",
                    style.badge
                  )}
                >
                  {style.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-purple-400/60 text-sm mt-8">
          Refer 3 businesses to unlock early access — regardless of queue position.
        </p>
      </div>
    </section>
  );
}
