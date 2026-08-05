"use client";

import { useEffect, useRef } from "react";

const LEADS = [
  { emoji: "🛍️", text: "Need Ankara fabric seller in Lagos", platform: "Facebook", time: "2m ago" },
  { emoji: "🍔", text: "Looking for small chops caterer Abuja wedding", platform: "Instagram", time: "4m ago" },
  { emoji: "💄", text: "Wapi seller wa kujua kutengeneza nywele za bandia Nairobi?", platform: "Twitter", time: "7m ago" },
  { emoji: "📱", text: "Who get iPhone 15 for sale for this group?", platform: "WhatsApp", time: "9m ago" },
  { emoji: "🏠", text: "Need 2 bedroom flat Lekki Phase 1 under 2M", platform: "Facebook", time: "11m ago" },
  { emoji: "💊", text: "Anybody know where to get genuine herbal supplements Accra?", platform: "TikTok", time: "13m ago" },
  { emoji: "🚗", text: "Looking for trusted mechanic around Surulere Lagos", platform: "Facebook", time: "15m ago" },
  { emoji: "👗", text: "Need thrift gowns seller online, budget 5k", platform: "Instagram", time: "18m ago" },
];

export function LiveTicker() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animFrame: number;
    let position = 0;

    const scroll = () => {
      position += 0.5;
      if (position >= el.scrollHeight / 2) position = 0;
      el.scrollTop = position;
      animFrame = requestAnimationFrame(scroll);
    };

    animFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const doubled = [...LEADS, ...LEADS];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-emerald/20 text-emerald-300 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
            Live Lead Feed — refreshing every 60 seconds
          </div>
          <h2 className="text-3xl font-bold text-white">
            Real Buyers. Posting Right Now.
          </h2>
          <p className="text-purple-300/70 mt-2">
            These are actual buyer signals Hunter AI detects across social media
          </p>
        </div>

        {/* Ticker container */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden h-72">
          {/* Fade overlays */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0d0820] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d0820] to-transparent z-10 pointer-events-none" />

          <div ref={scrollRef} className="overflow-hidden h-full">
            <div className="py-4 px-4 space-y-2">
              {doubled.map((lead, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/8 hover:border-brand-accent/30 transition-colors"
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{lead.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-purple-100 leading-snug line-clamp-1">
                      {lead.text}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-brand-accent font-medium">{lead.platform}</span>
                      <span className="text-xs text-purple-500">·</span>
                      <span className="text-xs text-purple-500">{lead.time}</span>
                    </div>
                  </div>
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-brand-emerald animate-pulse mt-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
