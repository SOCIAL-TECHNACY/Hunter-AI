"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Share2, Users } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
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
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#5E35B1", "#8E64FF", "#10B981", "#ffffff"],
    });
  }, []);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! I just secured my spot on the ${APP_NAME} waitlist 🎯\n\n` +
        `${APP_NAME} finds customers on social media who are actively looking for what you sell — and delivers them to your WhatsApp!\n\n` +
        `Join through my link and we both move up the queue:\n${referralUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="max-w-lg mx-auto px-4 py-12"
    >
      <div className="bg-glass rounded-3xl p-8 text-center border border-brand-accent/30 glow-purple">
        {/* Emoji celebration */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-6xl mb-4"
        >
          🎉
        </motion.div>

        <Badge variant="emerald" className="mb-4 mx-auto">
          <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
          You&apos;re on the list!
        </Badge>

        <h2 className="text-3xl font-extrabold text-white mb-2">
          Welcome, {entry.ownerName.split(" ")[0]}!
        </h2>
        <p className="text-purple-300/70 mb-6">
          {entry.businessName} is now on the {APP_NAME} waitlist.
        </p>

        {/* Position card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-purple-400 uppercase tracking-wider mb-1">Queue Position</p>
              <p className="text-4xl font-black text-white">{formatPosition(entry.position)}</p>
            </div>
            <div>
              <p className="text-xs text-purple-400 uppercase tracking-wider mb-1">Your Rank</p>
              <p className="text-2xl font-bold text-brand-accent">{rank}</p>
              <p className="text-xs text-purple-500">{entry.points} pts</p>
            </div>
          </div>
        </div>

        {/* Referral code display */}
        <div className="bg-brand-purple/20 border border-brand-purple/30 rounded-xl p-4 mb-5">
          <p className="text-xs text-purple-400 uppercase tracking-wider mb-1">Your Referral Code</p>
          <p className="text-xl font-mono font-bold text-white tracking-widest">
            {entry.referralCode}
          </p>
        </div>

        {/* Referral URL */}
        <div className="bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 p-3 mb-5">
          <p className="flex-1 text-xs text-purple-300 truncate text-left">{referralUrl}</p>
          <button
            onClick={copyToClipboard}
            className="flex-shrink-0 p-2 rounded-lg bg-brand-purple/30 hover:bg-brand-purple/50 transition-colors"
            title="Copy link"
          >
            {copied ? (
              <Check className="w-4 h-4 text-brand-emerald" />
            ) : (
              <Copy className="w-4 h-4 text-purple-300" />
            )}
          </button>
        </div>

        {/* Jump the queue hint */}
        <div className="bg-brand-emerald/10 border border-brand-emerald/20 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm font-semibold text-emerald-300 mb-1 flex items-center gap-2">
            <Users className="w-4 h-4" /> Jump the Queue!
          </p>
          <p className="text-xs text-emerald-300/70 leading-relaxed">
            Each business you refer earns you <strong>+100 points</strong> and moves you closer to early
            access. Refer 3+ businesses to skip straight to the front.
          </p>
        </div>

        {/* Share buttons */}
        <div className="flex flex-col gap-3">
          <Button variant="primary" size="md" className="w-full" onClick={shareOnWhatsApp}>
            <Share2 className="w-4 h-4" />
            Share on WhatsApp
          </Button>
          <Button variant="secondary" size="md" className="w-full" onClick={copyToClipboard}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Referral Link"}
          </Button>
        </div>

        <p className="text-xs text-purple-500 mt-4">
          Check your email for your confirmation and referral details.
        </p>
      </div>
    </motion.div>
  );
}
