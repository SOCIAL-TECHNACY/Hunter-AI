"use server";

import { WaitlistRepository } from "@/repositories/waitlist.repository";

const repository = new WaitlistRepository();

export async function getAdminWaitlistAction(page = 1, pageSize = 50) {
  try {
    const result = await repository.listAll(page, pageSize);
    return { success: true, data: result };
  } catch (err) {
    const message = err instanceof Error ? err.message : "An unexpected error occurred.";
    console.error("[getAdminWaitlistAction]", message);
    return { success: false, error: "Failed to fetch waitlist data." };
  }
}

export async function getAdminStatsAction() {
  try {
    const stats = await repository.getStats();
    return { success: true, data: stats };
  } catch (err) {
    const message = err instanceof Error ? err.message : "An unexpected error occurred.";
    console.error("[getAdminStatsAction]", message);
    return { success: false, error: "Failed to fetch stats." };
  }
}
