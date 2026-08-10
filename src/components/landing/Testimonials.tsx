"use client";

import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Chioma Adeyemi",
    role: "Founder, House of Silk & Lace",
    location: "Lagos, Nigeria",
    avatar: "👩🏾‍💼",
    quote:
      "I used to spend 3 hours every night scrolling Instagram and Facebook looking for customers. With Hunter AI, verified leads come directly to my WhatsApp every morning. My revenue doubled in two weeks.",
  },
  {
    name: "Kwame Asante",
    role: "CEO, Asante Electronics",
    location: "Accra, Ghana",
    avatar: "👨🏿‍💻",
    quote:
      "Within 24 hours of beta access, I received 8 leads looking for specific MacBook models in Accra. Closed 3 sales the very same week without spending a single cedi on paid ads.",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Head Chef, Spice Palace Catering",
    location: "Abuja, Nigeria",
    avatar: "🧕🏾",
    quote:
      "Hunter AI understands Nigerian Pidgin and Hausa flawlessly! It caught a corporate event planner asking for 200 boxed lunches that I would have completely missed on Twitter.",
  },
  {
    name: "James Ochieng",
    role: "Director, Rift Valley Solar",
    location: "Nairobi, Kenya",
    avatar: "🧑🏿‍🔧",
    quote:
      "In Nairobi, speed is everything. Hunter AI alerts us within 60 seconds of a customer asking for solar battery backups. We are always the first company to reply.",
  },
  {
    name: "Amara Diallo",
    role: "Owner, Dakar Glamour Studio",
    location: "Dakar, Senegal",
    avatar: "💆🏾‍♀️",
    quote:
      "We no longer post and pray. Hunter AI hunts for active buyer demand across social networks and delivers them straight to our WhatsApp chat. It is indispensable.",
  },
  {
    name: "Emeka Okafor",
    role: "Managing Partner, Swift Logistics",
    location: "Port Harcourt, Nigeria",
    avatar: "🚚",
    quote:
      "Anyone asking for same-day haulage in PH, Hunter AI detects it. We have closed over 35 new commercial contracts this month alone.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand-purple text-xs font-bold tracking-widest uppercase mb-3">
            Real Impact & Social Proof
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1033] tracking-tight mb-4">
            Loved by African <span className="text-gradient-purple font-serif italic">Entrepreneurs</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Hear from African merchants and service providers testing Hunter AI across 6 commercial hubs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, role, location, avatar, quote }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="bg-[#FAF9FF] rounded-3xl p-7 border border-purple-100/90 shadow-md shadow-purple-950/5 flex flex-col justify-between hover:border-brand-purple/40 hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-medium">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-purple-100">
                <div className="w-11 h-11 rounded-2xl bg-white border border-purple-200 flex items-center justify-center text-2xl shadow-sm">
                  {avatar}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-sm text-[#1A1033] truncate">{name}</p>
                    <BadgeCheck className="w-4 h-4 text-brand-purple flex-shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 truncate">{role} · {location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
