"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  business: string;
  location: string;
  quote: string;
  metric: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Chioma Adeyemi",
    role: "Founder & Creative Director",
    business: "Adeyemi Silk & Lace",
    location: "Lagos, Nigeria",
    quote:
      "Before Hunter, I spent three hours every evening searching Facebook groups manually. With Hunter running in the background, verified customer inquiries are delivered to my WhatsApp while I prepare orders. Our weekly sales doubled within fourteen days.",
    metric: "2x Sales Increase in 14 Days",
  },
  {
    name: "Kwame Asante",
    role: "Managing Director",
    business: "Asante Electronics",
    location: "Accra, Ghana",
    quote:
      "Within our first 48 hours of testing, we received 8 high-intent leads specifically looking for MacBook and iPhone models in Accra. We closed three sales immediately without spending any budget on paid sponsored ads.",
    metric: "3 Sales Closed in 48 Hours",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Head Chef & Owner",
    business: "Spice Palace Catering",
    location: "Abuja, Nigeria",
    quote:
      "Hunter's ability to understand Nigerian Pidgin and Hausa expressions makes all the difference. It caught an urgent corporate event inquiry for forty boxed lunches on Twitter that standard tools completely missed.",
    metric: "40-Person Corporate Contract",
  },
  {
    name: "James Ochieng",
    role: "Director",
    business: "Rift Valley Solar Systems",
    location: "Nairobi, Kenya",
    quote:
      "In commercial equipment, the first business to reply wins the deal. Hunter alerts us within sixty seconds of a customer posting about solar inverter installation anywhere in Nairobi.",
    metric: "< 60s Average Response Time",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
            Early Feedback
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1033] tracking-tight">
            Tested by Real African Merchants
          </h2>
        </div>

        {/* Large Featured Editorial Testimonial Card */}
        <div className="bg-[#FAF9FF] border border-purple-100 rounded-3xl p-8 sm:p-12 shadow-md shadow-purple-950/5 relative">
          <Quote className="w-10 h-10 text-brand-purple/20 mb-6" />

          <p className="text-lg sm:text-xl md:text-2xl font-medium text-[#1A1033] leading-relaxed mb-8">
            &ldquo;{current.quote}&rdquo;
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-purple-100">
            <div>
              <p className="font-extrabold text-base text-[#1A1033]">{current.name}</p>
              <p className="text-xs text-slate-600 font-medium">
                {current.role}, <strong className="text-slate-900">{current.business}</strong>
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{current.location}</p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <span className="text-xs font-semibold text-brand-purple bg-purple-100 px-3 py-1.5 rounded-full">
                {current.metric}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-brand-purple text-slate-700 flex items-center justify-center transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-brand-purple text-slate-700 flex items-center justify-center transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Selector Tabs */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {TESTIMONIALS.map((item, idx) => (
            <button
              key={item.business}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-brand-purple" : "w-2 bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Select testimonial from ${item.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
