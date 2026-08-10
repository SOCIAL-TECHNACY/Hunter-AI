"use client";

import { Accordion, type AccordionItem } from "@/components/ui/Accordion";

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "q1",
    question: "Which social media platforms does Hunter monitor?",
    answer:
      "Hunter monitors public buyer inquiries and posts across Facebook (groups and pages), Instagram comments, TikTok, and Twitter/X. WhatsApp group listening and Telegram channels are supported for public discovery.",
  },
  {
    id: "q2",
    question: "How does Hunter handle Pidgin and local African dialects?",
    answer:
      "Our natural language models are specifically trained on conversational African commerce, including Nigerian Pidgin, Yoruba, Igbo, Hausa, Sheng, Swahili, Twi, and French. This ensures you catch everyday buyer inquiries that standard keywords overlook.",
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
    question: "How does the referral system work?",
    answer:
      "Joining the waitlist gives you 10 base points. Every business that registers using your unique referral code awards you 100 points. Referring 3 businesses automatically unlocks priority Batch 1 access.",
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
            Frequently Asked Questions
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1033] tracking-tight">
            Common Questions
          </h2>
        </div>

        <Accordion items={FAQ_ITEMS} variant="light" />
      </div>
    </section>
  );
}
