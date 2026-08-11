import { APP_NAME, BRAND_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-purple-900/30 bg-[#080414] py-10 text-purple-300/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          {/* Left */}
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} {BRAND_NAME}. Built for African commerce.</p>
          </div>

          {/* Right */}
          <div className="text-center sm:text-right font-medium">
            <p>
              <strong className="text-white">{APP_NAME}</strong> · Powered by {BRAND_NAME}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
