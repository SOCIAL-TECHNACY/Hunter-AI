export const APP_NAME = "Hunter AI";
export const BRAND_NAME = "Social Technancy";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://socialtechnancy.com";

export const BUSINESS_NICHES = [
  "Fashion & Clothing",
  "Food & Beverages",
  "Electronics & Gadgets",
  "Beauty & Cosmetics",
  "Health & Wellness",
  "Real Estate & Property",
  "Education & Training",
  "Logistics & Delivery",
  "Agriculture & Farm Produce",
  "Auto Parts & Mechanics",
  "Legal & Consulting",
  "Event Planning & Catering",
  "Furniture & Home Decor",
  "Pharmacy & Medical Supplies",
  "Other",
] as const;

export const AFRICAN_COUNTRIES = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "Tanzania",
  "Uganda",
  "Senegal",
  "Ivory Coast",
  "Ethiopia",
  "Other",
] as const;

export const PLATFORM_OPTIONS = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitter", label: "X (Twitter)" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
] as const;

export const LANGUAGE_OPTIONS = [
  { value: "pidgin", label: "Pidgin English" },
  { value: "english", label: "English" },
  { value: "yoruba", label: "Yoruba" },
  { value: "igbo", label: "Igbo" },
  { value: "hausa", label: "Hausa" },
  { value: "swahili", label: "Swahili" },
  { value: "twi", label: "Twi" },
  { value: "french", label: "French" },
] as const;

export const BATCH_TIMELINE = [
  {
    batchNumber: 1,
    label: "Batch 1 — Founding Members",
    capacity: 100,
    startDate: "2025-03-01",
    status: "boarding" as const,
  },
  {
    batchNumber: 2,
    label: "Batch 2 — Early Access",
    capacity: 200,
    startDate: "2025-04-01",
    status: "next" as const,
  },
  {
    batchNumber: 3,
    label: "Batch 3 — General Waitlist",
    capacity: 500,
    startDate: "2025-05-01",
    status: "queued" as const,
  },
];
