"use client";

import { useState } from "react";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { LiveTicker } from "@/components/landing/LiveTicker";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { BatchTimeline } from "@/components/landing/BatchTimeline";
import { ComingSoonSection } from "@/components/landing/ComingSoonSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { SuccessView } from "@/components/waitlist/SuccessView";
import type { WaitlistEntry } from "@/types/waitlist";

interface HomePageProps {
  searchParams?: { ref?: string };
}

export default function HomePage({ searchParams }: HomePageProps) {
  const [successEntry, setSuccessEntry] = useState<WaitlistEntry | null>(null);
  const referralCode = searchParams?.ref ?? "";

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <LiveTicker />
        <HowItWorks />
        <BenefitsSection />
        <BatchTimeline />
        <ComingSoonSection />
        <Testimonials />
        <FAQSection />

        {successEntry ? (
          <SuccessView entry={successEntry} />
        ) : (
          <WaitlistForm
            defaultReferralCode={referralCode}
            onSuccess={setSuccessEntry}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
