"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  variant?: "light" | "dark";
  defaultOpenIndex?: number | null;
}

export function Accordion({ items, variant = "light", defaultOpenIndex = 0 }: AccordionProps) {
  const initialOpenId =
    defaultOpenIndex !== null && defaultOpenIndex !== undefined && items[defaultOpenIndex]
      ? items[defaultOpenIndex].id
      : null;

  const [openId, setOpenId] = useState<string | null>(initialOpenId);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));
  const isLight = variant === "light";

  return (
    <div className="space-y-3.5">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-2xl transition-all duration-200 overflow-hidden",
              isLight
                ? cn(
                    "bg-white border shadow-sm",
                    isOpen
                      ? "border-brand-purple/50 ring-2 ring-brand-purple/10 shadow-md"
                      : "border-purple-100 hover:border-brand-purple/30"
                  )
                : cn(
                    "bg-brand-dark/70 border",
                    isOpen ? "border-brand-accent/50 bg-white/8" : "border-white/10 bg-white/5"
                  )
            )}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between px-6 py-4.5 text-left transition-colors"
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "font-bold text-base pr-4",
                  isLight ? (isOpen ? "text-brand-purple" : "text-[#1A1033]") : "text-white"
                )}
              >
                {item.question}
              </span>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300",
                  isLight ? "bg-purple-50 text-brand-purple" : "bg-white/10 text-brand-accent",
                  isOpen && "rotate-180 bg-brand-purple text-white"
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-1">
                <p
                  className={cn(
                    "text-sm leading-relaxed",
                    isLight ? "text-slate-600" : "text-purple-300/80"
                  )}
                >
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export type { AccordionItem };
