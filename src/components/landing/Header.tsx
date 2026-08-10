"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { APP_NAME, BRAND_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Live Scanner", href: "#live-scanner" },
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
        "fixed top-0 inset-x-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-[#0D0820]/95 backdrop-blur-md border-b border-purple-900/30 shadow-md"
          : "bg-transparent border-b border-white/5"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-md shadow-brand-purple/30">
            H
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-base tracking-tight leading-none">
              {APP_NAME}
            </span>
            <span className="text-[10px] text-purple-300/70 font-medium tracking-wider uppercase mt-1">
              by {BRAND_NAME}
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-wider text-purple-200/80 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center">
          <Button
            size="sm"
            onClick={scrollToWaitlist}
            className="text-xs uppercase tracking-wider font-semibold px-5 py-2.5"
          >
            Get Early Access
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-purple-200 hover:text-white transition-colors"
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
          "md:hidden overflow-hidden transition-all duration-200 ease-in-out border-b border-purple-900/30",
          mobileOpen ? "max-h-96 opacity-100 bg-[#0D0820]/95 backdrop-blur-xl shadow-xl" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 px-3 rounded-lg text-sm font-medium text-purple-200 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            <Button size="md" className="w-full justify-center text-xs uppercase tracking-wider font-bold" onClick={scrollToWaitlist}>
              Get Early Access <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
