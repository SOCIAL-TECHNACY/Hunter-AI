import { APP_NAME, BRAND_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-purple-900/30 bg-[#080414] py-14 text-purple-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand Info */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-md shadow-brand-purple/30">
              H
            </div>
            <div>
              <p className="font-bold text-white text-base tracking-tight">{APP_NAME}</p>
              <p className="text-xs text-purple-400 font-medium">
                Find the customers already looking for what you sell. Built by <strong className="text-white">{BRAND_NAME}</strong>.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-purple-400/60">
            <p>© {new Date().getFullYear()} {BRAND_NAME}. Built for African commerce.</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-purple-300 font-medium">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#capabilities" className="hover:text-white transition-colors">
              Capabilities
            </a>
            <a href="#early-access" className="hover:text-white transition-colors">
              Early Access
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
