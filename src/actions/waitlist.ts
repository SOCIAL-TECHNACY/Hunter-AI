"use server";

import { WaitlistService } from "@/services/waitlist.service";
import { joinWaitlistSchema } from "@/lib/validations/waitlist";
import type { WaitlistEntry } from "@/types/waitlist";

const waitlistService = new WaitlistService();

export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function joinWaitlistAction(
  formData: unknown
): Promise<ActionResult<WaitlistEntry>> {
  const parsed = joinWaitlistSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the validation errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { referralCode, ...rest } = parsed.data;

  try {
    const result = await waitlistService.join({
      ...rest,
      referralCode: referralCode || undefined,
      source: "landing_page",
    });

    if (!result.success) {
      return { success: false, error: result.error || "Unable to complete registration." };
    }

    return { success: true, data: result.entry };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Registration failed. Please try again.";
    console.error("[Waitlist] joinWaitlistAction error:", message);
    return { success: false, error: message };
  }
}

export async function getReferralEntryAction(code: string): Promise<ActionResult<WaitlistEntry>> {
  if (!code) return { success: false, error: "Referral code is required." };

  try {
    const entry = await waitlistService.getReferralEntry(code);
    if (!entry) return { success: false, error: "Referral code not found." };
    return { success: true, data: entry };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to look up referral code.";
    console.error("[Waitlist] getReferralEntryAction error:", message);
    return { success: false, error: message };
  }
}
