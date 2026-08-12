"use client";

import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { MessageSquare, Search, ShieldCheck } from "lucide-react";

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "q1",
    question: "Which social media platforms does Hunter monitor?",
    answer:
      "Hunter monitors public buyer inquiries and requests across Facebook (groups and pages), Instagram comments, TikTok, and Twitter/X. Public WhatsApp business groups and Telegram channels are supported for public discovery.",
  },
  {
    id: "q2",
    question: "How does Hunter handle Pidgin and local African dialects?",
    answer:
      "Our natural language models are trained on conversational African commerce, including Nigerian Pidgin, Yoruba, Igbo, Hausa, Sheng, Swahili, Twi, and French, ensuring you catch everyday buyer inquiries that standard keywords overlook.",
  },
  {
    id: "q3",
    question: "How are buyer leads delivered to my business?",
    answer:
      "When a qualified inquiry is detected, Hunter formats an actionable lead card and delivers it directly to your WhatsApp. The alert includes the customer's query, profile link, and location so you can reply directly from your phone.",
  },
  {
    id: "q4",
    question: "What are the benefits of joining the early access waitlist?",
    answer:
      "Waitlist members receive 7 full days of access at launch (public signups get 3 days), priority queue placement, and locked-in founder pricing when commercial plans go live.",
  },
  {
    id: "q5",
    question: "How does the referral link work?",
    answer:
      "Upon registration, you receive a unique referral link. Sharing this link with other merchants allows them to secure 7 full days of early access at launch and join your merchant network.",
  },
  {
    id: "q6",
    question: "Is Hunter available outside of Nigeria?",
    answer:
      "Yes. Hunter supports businesses across Nigeria, Ghana, Kenya, Tanzania, Senegal, Ivory Coast, and South Africa.",
  },
  {
    id: "q7",
    question: "Do I need any technical skills or software setup?",
    answer:
      "No. If you can use WhatsApp, you can use Hunter. There are no complex dashboards or CRM systems required to receive and close leads.",
  },
  {
    id: "q8",
    question: "What is Social Technancy?",
    answer:
      "Social Technancy is the technology company behind Hunter. We engineer modern software infrastructure specifically tailored to the unique dynamics of African commerce.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-[#F8F6FE] text-slate-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading + Minimal Discovery Diagram */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
              Common Inquiries
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1033] tracking-tight mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              Everything you need to know about lead hunting, local dialect comprehension, WhatsApp delivery, and waitlist access.
            </p>

            {/* Minimal Discovery Flow Diagram */}
            <div className="p-6 rounded-3xl bg-white border border-purple-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-brand-purple flex items-center justify-center flex-shrink-0">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1033]">1. Social Ingestion</p>
                  <p className="text-[11px] text-slate-500">Public inquiries scanned 24/7</p>
                </div>
              </div>

              <div className="w-px h-4 bg-purple-200 ml-4" />

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1033]">2. Intent Qualification</p>
                  <p className="text-[11px] text-slate-500">Spam filtered · Dialect scored</p>
                </div>
              </div>

              <div className="w-px h-4 bg-purple-200 ml-4" />

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-purple text-white flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1033]">3. WhatsApp Delivery</p>
                  <p className="text-[11px] text-slate-500">Delivered directly to your phone</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Accordion */}
          <div className="lg:col-span-7">
            <Accordion items={FAQ_ITEMS} variant="light" defaultOpenIndex={0} />
          </div>
        </div>
      </div>
    </section>
  );
}
