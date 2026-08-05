import { z } from "zod";
import { AFRICAN_COUNTRIES, BUSINESS_NICHES } from "@/lib/constants";

export const joinWaitlistSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must be under 100 characters"),
  ownerName: z
    .string()
    .min(2, "Your name must be at least 2 characters")
    .max(80, "Your name must be under 80 characters"),
  email: z.string().email("Enter a valid email address"),
  whatsapp: z
    .string()
    .min(7, "Enter a valid WhatsApp number")
    .max(20, "WhatsApp number is too long")
    .regex(/^\+?[0-9\s\-().]+$/, "Enter a valid phone number"),
  businessNiche: z.enum(BUSINESS_NICHES, {
    errorMap: () => ({ message: "Select a valid business niche" }),
  }),
  businessDescription: z.string().max(500).optional(),
  idealCustomer: z.string().max(300).optional(),
  city: z.string().min(2, "Enter your city").max(80, "City name is too long"),
  location: z.string().min(2, "Enter your location / area").max(100),
  country: z.enum(AFRICAN_COUNTRIES, {
    errorMap: () => ({ message: "Select a valid country" }),
  }),
  referralCode: z.string().optional(),
});

export type JoinWaitlistFormData = z.infer<typeof joinWaitlistSchema>;
