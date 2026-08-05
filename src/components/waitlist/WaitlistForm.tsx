"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Target } from "lucide-react";
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
    <motion.section
      id="waitlist-form"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-24"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-accent flex items-center justify-center mx-auto mb-4">
            <Target className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Claim Your Spot
          </h2>
          <p className="text-purple-300/70">
            Join the waitlist and get first access when Hunter AI launches.
          </p>
        </div>

        <div className="bg-glass rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* Root error */}
            {errors.root && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                {errors.root.message}
              </div>
            )}

            {/* Business info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="businessName"
                label="Business Name *"
                placeholder="e.g. Adeyemi Fashion House"
                error={errors.businessName?.message}
                {...register("businessName")}
              />
              <Input
                id="ownerName"
                label="Your Full Name *"
                placeholder="e.g. Chioma Adeyemi"
                error={errors.ownerName?.message}
                {...register("ownerName")}
              />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="email"
                type="email"
                label="Email Address *"
                placeholder="chioma@email.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                id="whatsapp"
                type="tel"
                label="WhatsApp Number *"
                placeholder="+234 801 234 5678"
                hint="Leads will be sent to this number"
                error={errors.whatsapp?.message}
                {...register("whatsapp")}
              />
            </div>

            {/* Niche */}
            <Select
              id="businessNiche"
              label="Business Niche *"
              placeholder="Select your niche..."
              options={NICHE_OPTIONS}
              error={errors.businessNiche?.message}
              {...register("businessNiche")}
            />

            {/* Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                id="country"
                label="Country *"
                options={COUNTRY_OPTIONS}
                error={errors.country?.message}
                {...register("country")}
              />
              <Input
                id="city"
                label="City *"
                placeholder="e.g. Lagos"
                error={errors.city?.message}
                {...register("city")}
              />
            </div>

            <Input
              id="location"
              label="Area / Neighborhood *"
              placeholder="e.g. Surulere, Lagos Island, Victoria Island..."
              hint="Where most of your customers are located"
              error={errors.location?.message}
              {...register("location")}
            />

            {/* Referral */}
            <Input
              id="referralCode"
              label="Referral Code (optional)"
              placeholder="e.g. ADEY-SALEMAX123"
              hint="Got this from a friend? Enter their code to give them points"
              error={errors.referralCode?.message}
              {...register("referralCode")}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
            >
              Secure My Spot on the Waitlist
            </Button>

            <p className="text-center text-xs text-purple-400/60">
              No spam. No credit card. Just your spot in the queue.
            </p>
          </form>
        </div>
      </div>
    </motion.section>
  );
}
