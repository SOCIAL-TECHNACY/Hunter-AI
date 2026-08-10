"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Share2, Users, Sparkles, Trophy, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";
import { buildReferralUrl } from "@/lib/utils/code-generator";
import { formatPosition } from "@/lib/utils/formatters";
import { getRankTier } from "@/lib/utils/referral-calculator";
import { APP_URL, APP_NAME } from "@/lib/constants";
import type { WaitlistEntry } from "@/types/waitlist";

interface SuccessViewProps {
  entry: WaitlistEntry;
}

export function SuccessView({ entry }: SuccessViewProps) {
  const [copied, setCopied] = useState(false);
  const referralUrl = buildReferralUrl(entry.referralCode, APP_URL);
  const rank = getRankTier(entry.points);

  useEffect(() => {
    // Elegant, subtle celebration burst
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#5E35B1", "#8E64FF", "#10B981", "#FFD700"],
    });
  }, []);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! I just secured my spot on the ${APP_NAME} waitlist 🎯\n\n` +
        `${APP_NAME} automatically finds customers on social media who are actively searching for what you sell — and delivers them directly to your WhatsApp!\n\n` +
        `Claim your spot through my link:\n${referralUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <section className="py-24 bg-[#0D0820] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-brand-purple/20 blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-xl mx-auto px-4 sm:px-6 relative z-10"
      >
        <div className="bg-white rounded-3xl p-7 sm:p-10 text-center shadow-2xl shadow-purple-950/50 border border-purple-100">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-brand-emerald text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Registration Confirmed
          </div>

          <h2 className="text-3xl font-extrabold text-[#1A1033] tracking-tight mb-2">
            You&apos;re on the List! 🎉
          </h2>
          <p className="text-slate-600 text-sm mb-8">
            Welcome, <strong className="text-slate-900">{entry.ownerName.split(" ")[0]}</strong>!{" "}
            <span className="text-brand-purple font-semibold">{entry.businessName}</span> has been assigned a priority spot in our queue.
          </p>

          {/* Position & Points Card */}
          <div className="bg-[#FAF9FF] border border-purple-100 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 divide-x divide-purple-100">
              <div className="text-center pr-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Queue Position
                </p>
                <p className="text-4xl sm:text-5xl font-black text-[#1A1033] tracking-tight font-mono">
                  {formatPosition(entry.position)}
                </p>
              </div>
              <div className="text-center pl-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  Your Rank
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-brand-purple tracking-tight">
                  {rank}
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{entry.points} pts earned</p>
              </div>
            </div>
          </div>

          {/* Referral Code Box */}
          <div className="rounded-2xl bg-purple-50/80 border border-purple-200/90 p-4 mb-6">
            <p className="text-[11px] font-bold text-brand-purple uppercase tracking-wider mb-1.5">
              Your Personal Referral Code
            </p>
            <p className="text-2xl font-mono font-extrabold text-[#1A1033] tracking-widest">
              {entry.referralCode}
            </p>
          </div>

          {/* Referral Link Box with Copy Button */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 mb-6">
            <p className="flex-1 text-xs text-slate-600 font-mono truncate text-left pl-2">
              {referralUrl}
            </p>
            <button
              onClick={copyToClipboard}
              className="flex-shrink-0 px-3 py-2 rounded-lg bg-brand-purple text-white text-xs font-bold hover:bg-brand-purple-hover transition-colors flex items-center gap-1.5 shadow-sm"
              title="Copy referral URL"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Move up queue explanation banner */}
          <div className="rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 p-4 mb-6 text-left flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-emerald/15 text-brand-emerald flex items-center justify-center flex-shrink-0 mt-0.5">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-950 mb-0.5">
                Move Up the Queue Faster
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Earn <strong>+100 points</strong> for every business you invite. Refer <strong>3 businesses</strong> to jump straight to Batch 1 access.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              size="md"
              className="w-full justify-center shadow-lg shadow-brand-purple/20"
              onClick={shareOnWhatsApp}
            >
              <Share2 className="w-4 h-4" />
              Share on WhatsApp
            </Button>
            <Button
              variant="outline"
              size="md"
              className="w-full justify-center border-purple-200 text-brand-purple hover:bg-purple-50"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="w-4 h-4 text-brand-emerald" /> : <Copy className="w-4 h-4" />}
              {copied ? "Link Copied" : "Copy Link"}
            </Button>
          </div>

          <p className="text-xs text-slate-400 mt-5">
            Confirmation email dispatched. Check your inbox for queue updates.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
