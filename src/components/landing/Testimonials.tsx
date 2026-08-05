"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Chioma Adeyemi",
    role: "Fashion Boutique Owner, Lagos",
    avatar: "👩🏾‍💼",
    rating: 5,
    quote:
      "Before Hunter AI, I was spending 3 hours daily scrolling Facebook looking for customers. Now leads come to me automatically. My sales doubled in the first week.",
  },
  {
    name: "Kwame Asante",
    role: "Electronics Dealer, Accra",
    avatar: "👨🏿‍💻",
    rating: 5,
    quote:
      "I was skeptical at first. But within the first day, I got 7 leads — people actively looking for the exact phones I sell. This thing is real.",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Catering Business, Abuja",
    avatar: "🧕🏾",
    rating: 5,
    quote:
      "The platform even understands Hausa and Pidgin posts! It found a customer looking for Ramadan catering services that I would have never seen on my own.",
  },
  {
    name: "James Ochieng",
    role: "Hardware Store, Nairobi",
    avatar: "🧑🏿‍🔧",
    rating: 5,
    quote:
      "Nilikuwa nikipoteza wateja wengi kila siku. Hunter AI inanisaidia kupata watu wanaohitaji vifaa vya ujenzi Nairobi kabla hawajaamua kwenda dukani lingine.",
  },
  {
    name: "Amara Diallo",
    role: "Beauty Salon, Dakar",
    avatar: "💆🏾‍♀️",
    rating: 5,
    quote:
      "Early access changed my business. I used to post ads and pray. Now Hunter AI brings the buyers to me. My salon is fully booked every weekend.",
  },
  {
    name: "Emeka Okafor",
    role: "Logistics & Delivery, PH",
    avatar: "🚚",
    rating: 5,
    quote:
      "Person wey dey look delivery service for Port Harcourt — Hunter AI go find am for you. I don close 20+ new deals this month without spending on ads.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Social Proof
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Businesses Already{" "}
            <span className="text-gradient">Winning</span>
          </h2>
          <p className="text-purple-300/70 text-lg">
            Beta testers across Africa are already closing deals with Hunter AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map(({ name, role, avatar, rating, quote }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-glass rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-purple-200 text-sm leading-relaxed flex-1 italic">
                &ldquo;{quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-brand-purple/20 flex items-center justify-center text-xl">
                  {avatar}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{name}</p>
                  <p className="text-xs text-purple-400">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
