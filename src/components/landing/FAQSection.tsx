"use client";

import { Accordion, type AccordionItem } from "@/components/ui/Accordion";

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "q1",
    question: "Which platforms does Hunter AI monitor?",
    answer:
      "Hunter AI currently monitors Facebook (groups and pages), Instagram, TikTok, Twitter/X, and public WhatsApp groups. We're adding Telegram, Snapchat, and YouTube comments in Phase 2.",
  },
  {
    id: "q2",
    question: "Does it understand Pidgin, Hausa, Igbo, or Yoruba?",
    answer:
      "Yes. Our AI is trained on African languages and dialects including Nigerian Pidgin, Yoruba, Igbo, Hausa, Swahili, Twi, and French. It continuously improves with each search.",
  },
  {
    id: "q3",
    question: "How do leads reach me?",
    answer:
      "Leads are delivered directly to your WhatsApp number as structured cards — including the buyer's post, their handle, and a link to their profile. You can reply directly from your phone.",
  },
  {
    id: "q4",
    question: "When will full access be available?",
    answer:
      "We are currently in Phase 0 (Waitlist). Batch 1 (Founding Members) will receive access first. Pricing will be announced after the MVP launch. Waitlist members are guaranteed priority access.",
  },
  {
    id: "q5",
    question: "How does the referral system work?",
    answer:
      "Every person you refer earns you 100 points and moves you up the queue. If you refer 3 or more businesses, you unlock early access regardless of your original queue position. Your referral link is available on your waitlist confirmation page.",
  },
  {
    id: "q6",
    question: "Is Hunter AI only for Nigerian businesses?",
    answer:
      "No! We're built for all of Africa. We currently support businesses in Nigeria, Ghana, Kenya, Tanzania, Senegal, Ivory Coast, and South Africa, with more countries being added continuously.",
  },
  {
    id: "q7",
    question: "Do I need any technical skills to use it?",
    answer:
      "Zero technical skills required. If you can use WhatsApp, you can use Hunter AI. We designed it specifically for small and medium business owners who need results, not complexity.",
  },
  {
    id: "q8",
    question: "What is Social Technancy?",
    answer:
      "Social Technancy is the company building Hunter AI. We're a technology company focused on creating AI-powered tools specifically designed for African businesses and the unique way commerce works across the continent.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-4xl font-bold text-white mb-4">
            Common Questions
          </h2>
          <p className="text-purple-300/70">
            Everything you need to know about Hunter AI and the waitlist.
          </p>
        </div>

        <Accordion items={FAQ_ITEMS} />
      </div>
    </section>
  );
}
