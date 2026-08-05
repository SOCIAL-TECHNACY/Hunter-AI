import { Target } from "lucide-react";
import { APP_NAME, BRAND_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-accent flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-white leading-none">{APP_NAME}</p>
              <p className="text-[10px] text-purple-400 tracking-widest uppercase mt-0.5">
                {BRAND_NAME}
              </p>
            </div>
          </div>

          <p className="text-purple-500 text-sm text-center">
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-purple-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
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
