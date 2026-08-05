"use client";

import { useState } from "react";
import { Menu, X, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { APP_NAME, BRAND_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Benefits", href: "#benefits" },
  { label: "Early Access", href: "#early-access" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-accent flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-bold text-white leading-none">{APP_NAME}</p>
            <p className="text-[10px] text-purple-400 tracking-widest uppercase leading-none mt-0.5">
              {BRAND_NAME}
            </p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-purple-300 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button size="sm" onClick={() => document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })}>
            Join Waitlist
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-purple-300 hover:text-white transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 pb-4 bg-glass border-t border-white/5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 px-2 text-purple-300 hover:text-white border-b border-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button
            size="sm"
            className="mt-3 w-full"
            onClick={() => {
              setMobileOpen(false);
              document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Join Waitlist
          </Button>
        </nav>
      </div>
    </header>
  );
}
