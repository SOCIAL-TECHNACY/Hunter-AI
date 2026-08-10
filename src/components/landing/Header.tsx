"use client";

import { useState, useEffect } from "react";
import { Menu, X, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { APP_NAME, BRAND_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Hunter", href: "#benefits" },
  { label: "Live Radar", href: "#live-radar" },
  { label: "Early Access", href: "#early-access" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    setMobileOpen(false);
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0D0820]/90 backdrop-blur-md border-b border-purple-900/30 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-white/5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-accent p-0.5 shadow-md shadow-brand-purple/40 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
            <div className="w-full h-full rounded-[10px] bg-brand-dark/90 flex items-center justify-center">
              <Target className="w-5 h-5 text-brand-accent group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-base sm:text-lg tracking-tight">
                {APP_NAME}
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-brand-purple/30 text-purple-300 border border-brand-purple/40">
                Phase 0
              </span>
            </div>
            <span className="text-[10px] text-purple-300/70 font-semibold tracking-widest uppercase -mt-0.5">
              by {BRAND_NAME}
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-purple-200/80 hover:text-white transition-colors duration-200 hover:scale-105"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            size="sm"
            onClick={scrollToWaitlist}
            className="shadow-md shadow-brand-purple/30 text-sm font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Join Waitlist
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-xl text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-purple-900/30",
          mobileOpen ? "max-h-96 opacity-100 bg-[#0D0820]/95 backdrop-blur-xl shadow-2xl" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 px-3 rounded-lg text-sm font-medium text-purple-200 hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <Button size="md" className="w-full justify-center" onClick={scrollToWaitlist}>
              <Sparkles className="w-4 h-4 mr-1.5" />
              Secure Your Spot
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
