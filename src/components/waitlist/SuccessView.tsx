"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Share2, Users, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";
import { buildReferralUrl } from "@/lib/utils/code-generator";
import { formatPosition } from "@/lib/utils/formatters";
import { APP_URL, APP_NAME } from "@/lib/constants";
import type { WaitlistEntry } from "@/types/waitlist";

interface SuccessViewProps {
  entry: WaitlistEntry;
}

export function SuccessView({ entry }: SuccessViewProps) {
  const [copied, setCopied] = useState(false);
  const referralUrl = buildReferralUrl(entry.referralCode, APP_URL);

  useEffect(() => {
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 },
      colors: ["#5E35B1", "#8E64FF", "#10B981"],
    });
  }, []);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! I just secured my spot on the ${APP_NAME} early access waitlist 🎯\n\n` +
        `${APP_NAME} automatically finds customers on social media who are actively searching for what you sell — and delivers them directly to your WhatsApp!\n\n` +
        `Claim your 7 days of early access at launch through my link:\n${referralUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <section className="py-24 bg-[#0D0820] relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-xl mx-auto px-4 sm:px-6 relative z-10"
      >
        <div className="bg-white rounded-3xl p-7 sm:p-10 text-center shadow-2xl shadow-purple-950/40 border border-purple-100">
          {/* Badge */}
          <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-brand-emerald text-xs font-bold uppercase tracking-wider mb-4">
            Registration Confirmed
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1033] tracking-tight mb-2">
            You&apos;re on the List! 🎉
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mb-8">
            Welcome, <strong className="text-slate-900">{entry.ownerName.split(" ")[0]}</strong>!{" "}
            <span className="text-brand-purple font-semibold">{entry.businessName}</span> is registered for <strong>7 days of early access</strong> at launch.
          </p>

          {/* Position Card */}
          <div className="bg-[#FAF9FF] border border-purple-100 rounded-2xl p-6 mb-6">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Your Queue Position
            </p>
            <p className="text-5xl sm:text-6xl font-black text-[#1A1033] tracking-tight font-mono mb-2">
              {formatPosition(entry.position)}
            </p>
            <div className="flex items-center justify-center gap-1.5 text-xs text-brand-purple font-semibold">
              <ShieldCheck className="w-4 h-4 text-brand-emerald" />
              <span>7 Full Days Access Guaranteed at Launch</span>
            </div>
          </div>

          {/* Referral Code Box */}
          <div className="rounded-2xl bg-purple-50/80 border border-purple-200/90 p-4 mb-6">
            <p className="text-[11px] font-bold text-brand-purple uppercase tracking-wider mb-1.5">
              Your Unique Referral Code
            </p>
            <p className="text-2xl font-mono font-extrabold text-[#1A1033] tracking-widest">
              {entry.referralCode}
            </p>
          </div>

          {/* Referral Link Box */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 mb-6">
            <p className="flex-1 text-xs text-slate-600 font-mono truncate text-left pl-2">
              {referralUrl}
            </p>
            <button
              onClick={copyToClipboard}
              className="flex-shrink-0 px-3 py-2 rounded-lg bg-brand-purple text-white text-xs font-bold hover:bg-brand-purple-hover transition-colors flex items-center gap-1.5 shadow-sm"
              title="Copy referral link"
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

          {/* Referral Sharing Callout */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 mb-6 text-left flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center flex-shrink-0 mt-0.5">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 mb-0.5">
                Invite Fellow Business Owners
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Share your referral link with other merchants so they can also claim 7 full days of access when Hunter launches.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              size="md"
              className="w-full justify-center shadow-md shadow-brand-purple/20"
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
        </div>
      </motion.div>
    </section>
  );
}
