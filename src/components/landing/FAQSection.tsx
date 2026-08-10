"use client";

import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { HelpCircle } from "lucide-react";

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "q1",
    question: "Which social media platforms does Hunter AI monitor?",
    answer:
      "Hunter AI currently monitors public inquiries and posts across Facebook (groups and pages), Instagram comments/posts, TikTok comments, Twitter/X, and public WhatsApp business groups. Telegram and YouTube commerce comments are scheduled for Phase 2.",
  },
  {
    id: "q2",
    question: "Does Hunter AI understand Pidgin and local African dialects?",
    answer:
      "Yes. Our natural language detection engine is specifically trained on African expressions including Nigerian Pidgin, Yoruba, Igbo, Hausa, Swahili, Sheng, Twi, and French to capture conversational buyer intent that standard tools miss.",
  },
  {
    id: "q3",
    question: "How are buyer leads delivered to my business?",
    answer:
      "Within 60 seconds of a customer posting an inquiry, a structured lead card is sent directly to your WhatsApp number. The card includes the buyer's exact query, their profile link, location, and a 1-tap button to reply directly.",
  },
  {
    id: "q4",
    question: "When will full access be available and how much will it cost?",
    answer:
      "We are currently in Phase 0 (Waitlist). Early access begins with Batch 1 (Founding Members). Official SaaS pricing will be announced after the private MVP launch. Waitlist members receive guaranteed lifetime founder discounts.",
  },
  {
    id: "q5",
    question: "How does the referral and points system work?",
    answer:
      "Joining awards you 10 base points. Each business you refer gives you +100 points, boosting your position on the leaderboard. Referring 3 or more businesses unlocks automatic early access in Batch 1.",
  },
  {
    id: "q6",
    question: "Is Hunter AI only for Nigerian businesses?",
    answer:
      "No. Hunter AI is built for all of Africa. We currently support businesses across Nigeria, Ghana, Kenya, Tanzania, Senegal, Ivory Coast, and South Africa.",
  },
  {
    id: "q7",
    question: "Do I need technical skills or complex software to use Hunter AI?",
    answer:
      "Zero technical skills required. If you know how to chat on WhatsApp, you already know how to use Hunter AI. There are no complicated dashboards or CRM software to learn.",
  },
  {
    id: "q8",
    question: "What is Social Technancy?",
    answer:
      "Social Technancy is the technology company behind Hunter AI. We build modern, AI-powered software designed specifically for African businesses and the unique ways commerce operates across the continent.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-[#F8F6FE] text-slate-900 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand-purple text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1033] tracking-tight mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Common questions regarding Hunter AI, waitlist priority, and our upcoming launch.
          </p>
        </div>

        <Accordion items={FAQ_ITEMS} variant="light" />
      </div>
    </section>
  );
}
