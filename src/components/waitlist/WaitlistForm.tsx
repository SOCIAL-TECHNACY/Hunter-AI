"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Users } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { joinWaitlistSchema, type JoinWaitlistFormData } from "@/lib/validations/waitlist";
import { joinWaitlistAction } from "@/actions/waitlist";
import { BUSINESS_NICHES, AFRICAN_COUNTRIES } from "@/lib/constants";
import type { WaitlistEntry } from "@/types/waitlist";

interface WaitlistFormProps {
  defaultReferralCode?: string;
  onSuccess: (entry: WaitlistEntry) => void;
}

const NICHE_OPTIONS = BUSINESS_NICHES.map((n) => ({ value: n, label: n }));
const COUNTRY_OPTIONS = AFRICAN_COUNTRIES.map((c) => ({ value: c, label: c }));

export function WaitlistForm({ defaultReferralCode, onSuccess }: WaitlistFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<JoinWaitlistFormData>({
    resolver: zodResolver(joinWaitlistSchema),
    defaultValues: {
      country: "Nigeria",
      referralCode: defaultReferralCode ?? "",
    },
  });

  const onSubmit = async (data: JoinWaitlistFormData) => {
    const result = await joinWaitlistAction(data);

    if (!result.success) {
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, messages]) => {
          setError(field as keyof JoinWaitlistFormData, {
            type: "server",
            message: (messages as string[])[0],
          });
        });
      } else {
        setError("root", { type: "server", message: result.error });
      }
      return;
    }

    if (result.data) {
      onSuccess(result.data);
    }
  };

  return (
    <section id="waitlist-form" className="py-24 bg-[#0D0820] relative">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Secure Your Early Access
          </h2>
          <p className="text-purple-200/80 text-sm sm:text-base max-w-md mx-auto">
            Get 7 full days of access at launch. Free to join and takes less than 60 seconds.
          </p>
        </div>

        {/* Elevated Pristine White Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-950/40 border border-purple-100"
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 sm:space-y-5">
            {/* Global Error */}
            {errors.root && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                {errors.root.message}
              </div>
            )}

            {/* Business Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="businessName"
                label="Business Name *"
                placeholder="e.g. Adeyemi Fashion House"
                variant="light"
                error={errors.businessName?.message}
                {...register("businessName")}
              />
              <Input
                id="ownerName"
                label="Your Full Name *"
                placeholder="e.g. Chioma Adeyemi"
                variant="light"
                error={errors.ownerName?.message}
                {...register("ownerName")}
              />
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="email"
                type="email"
                label="Email Address *"
                placeholder="chioma@business.com"
                variant="light"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                id="whatsapp"
                type="tel"
                label="WhatsApp Number *"
                placeholder="+234 801 234 5678"
                hint="Leads are dispatched to this number"
                variant="light"
                error={errors.whatsapp?.message}
                {...register("whatsapp")}
              />
            </div>

            {/* Business Niche */}
            <Select
              id="businessNiche"
              label="Business Category *"
              placeholder="Select your business category..."
              options={NICHE_OPTIONS}
              variant="light"
              error={errors.businessNiche?.message}
              {...register("businessNiche")}
            />

            {/* Country and City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                id="country"
                label="Country *"
                options={COUNTRY_OPTIONS}
                variant="light"
                error={errors.country?.message}
                {...register("country")}
              />
              <Input
                id="city"
                label="City *"
                placeholder="e.g. Lagos, Nairobi, Accra"
                variant="light"
                error={errors.city?.message}
                {...register("city")}
              />
            </div>

            {/* Neighborhood / Target Location */}
            <Input
              id="location"
              label="Target Area / Neighborhood *"
              placeholder="e.g. Lekki Phase 1, Surulere, Westlands..."
              hint="Where most of your customers are located"
              variant="light"
              error={errors.location?.message}
              {...register("location")}
            />

            {/* Referral Code */}
            <Input
              id="referralCode"
              label="Referral Code (optional)"
              placeholder="e.g. ADEY-SALEMAX123"
              hint="Enter your referrer's code to give them +100 points"
              variant="light"
              error={errors.referralCode?.message}
              {...register("referralCode")}
            />

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                size="lg"
                className="w-full text-base font-bold py-4 shadow-lg shadow-brand-purple/25 group"
                isLoading={isSubmitting}
              >
                <span>Claim Your Spot on the Waitlist</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Small Privacy & Trust Footnote */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
              <span className="flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
                No credit card required
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Zap className="w-3.5 h-3.5 text-brand-purple" />
                7 days access at launch
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                Instant queue placement
              </span>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
