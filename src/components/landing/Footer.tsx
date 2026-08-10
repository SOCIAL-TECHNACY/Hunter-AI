import { Target, Heart } from "lucide-react";
import { APP_NAME, BRAND_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-purple-900/30 bg-[#080414] py-14 text-purple-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-accent p-0.5 shadow-md shadow-brand-purple/30 flex items-center justify-center">
              <div className="w-full h-full rounded-[10px] bg-brand-dark flex items-center justify-center">
                <Target className="w-5 h-5 text-brand-accent" />
              </div>
            </div>
            <div>
              <p className="font-extrabold text-white text-base tracking-tight">{APP_NAME}</p>
              <p className="text-xs text-purple-400 font-medium">
                AI-Powered Customer Discovery by <strong className="text-white">{BRAND_NAME}</strong>
              </p>
            </div>
          </div>

          {/* Copyright & Made for Africa */}
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-xs text-purple-300/70">
              © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
            </p>
            <p className="text-[11px] text-purple-400/50 flex items-center gap-1">
              Built for African Hustle Culture <Heart className="w-3 h-3 text-brand-accent fill-brand-accent" />
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-purple-300 font-medium">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#early-access" className="hover:text-white transition-colors">
              Batches
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a href="mailto:hello@socialtechnancy.com" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
