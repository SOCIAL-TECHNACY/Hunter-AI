import type { WaitlistEntry, JoinWaitlistPayload, WaitlistStats } from "@/types/waitlist";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { generateReferralCode } from "@/lib/utils/code-generator";
import { BASE_REGISTRATION_POINTS } from "@/lib/utils/referral-calculator";

function mapRowToEntry(row: Record<string, unknown>): WaitlistEntry {
  return {
    id: row.id as string,
    businessName: row.business_name as string,
    ownerName: row.owner_name as string,
    email: row.email as string,
    whatsapp: row.whatsapp as string,
    businessNiche: row.business_niche as string,
    businessDescription: (row.business_description as string) ?? undefined,
    idealCustomer: (row.ideal_customer as string) ?? undefined,
    city: row.city as string,
    location: row.location as string,
    country: row.country as string,
    platforms: (row.platforms as string[]) ?? [],
    languages: (row.languages as string[]) ?? [],
    source: (row.source as string) ?? undefined,
    referralCode: row.referral_code as string,
    referredBy: (row.referred_by as string) ?? undefined,
    referralsCount: (row.referrals_count as number) ?? 0,
    points: (row.points as number) ?? BASE_REGISTRATION_POINTS,
    position: (row.position as number) ?? 1,
    status: (row.status as WaitlistEntry["status"]) ?? "pending",
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export class WaitlistRepository {
  private get db() {
    return createSupabaseAdminClient();
  }

  async findByEmail(email: string): Promise<WaitlistEntry | null> {
    const res = await (this.db
      .from("waitlist")
      .select("*")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle() as unknown as Promise<{ data: Record<string, unknown> | null; error: { message: string } | null }>);

    if (res.error) {
      console.warn("[WaitlistRepository] findByEmail error:", res.error.message);
      return null;
    }
    if (!res.data) return null;
    return mapRowToEntry(res.data);
  }

  async findByWhatsApp(whatsapp: string): Promise<WaitlistEntry | null> {
    const res = await (this.db
      .from("waitlist")
      .select("*")
      .eq("whatsapp", whatsapp.trim())
      .maybeSingle() as unknown as Promise<{ data: Record<string, unknown> | null; error: { message: string } | null }>);

    if (res.error) {
      console.warn("[WaitlistRepository] findByWhatsApp error:", res.error.message);
      return null;
    }
    if (!res.data) return null;
    return mapRowToEntry(res.data);
  }

  async findByReferralCode(code: string): Promise<WaitlistEntry | null> {
    const res = await (this.db
      .from("waitlist")
      .select("*")
      .eq("referral_code", code.trim().toUpperCase())
      .maybeSingle() as unknown as Promise<{ data: Record<string, unknown> | null; error: { message: string } | null }>);

    if (res.error) {
      console.warn("[WaitlistRepository] findByReferralCode error:", res.error.message);
      return null;
    }
    if (!res.data) return null;
    return mapRowToEntry(res.data);
  }

  async getNextPosition(): Promise<number> {
    try {
      const { count, error } = await this.db
        .from("waitlist")
        .select("*", { count: "exact", head: true });

      if (error) {
        console.warn("[WaitlistRepository] getNextPosition count error:", error.message);
        return 1;
      }
      return (count ?? 0) + 1;
    } catch {
      return 1;
    }
  }

  async create(payload: JoinWaitlistPayload): Promise<WaitlistEntry> {
    const position = await this.getNextPosition();
    const referralCode = generateReferralCode(payload.businessName);

    const insertData = {
      business_name: payload.businessName.trim(),
      owner_name: payload.ownerName.trim(),
      email: payload.email.trim().toLowerCase(),
      whatsapp: payload.whatsapp.trim(),
      business_niche: payload.businessNiche,
      business_description: payload.businessDescription?.trim() ?? null,
      ideal_customer: payload.idealCustomer?.trim() ?? null,
      city: payload.city.trim(),
      location: payload.location.trim(),
      country: payload.country || "Nigeria",
      platforms: payload.platforms ?? ["instagram", "facebook"],
      languages: payload.languages ?? ["pidgin", "english"],
      source: payload.source ?? "landing_page",
      referral_code: referralCode,
      referred_by: payload.referralCode?.trim().toUpperCase() ?? null,
      referrals_count: 0,
      points: BASE_REGISTRATION_POINTS,
      position,
      status: "pending",
    };

    const res = await (this.db
      .from("waitlist")
      .insert(insertData as never)
      .select("*")
      .single() as unknown as Promise<{ data: Record<string, unknown> | null; error: { message: string; code?: string } | null }>);

    if (res.error) {
      console.error("[WaitlistRepository] create insert error:", res.error);
      if (res.error.message?.includes("waitlist_email_key") || res.error.message?.includes("email")) {
        throw new Error("This email is already on the waitlist.");
      }
      if (res.error.message?.includes("waitlist_whatsapp_key") || res.error.message?.includes("whatsapp")) {
        throw new Error("This WhatsApp number is already registered on the waitlist.");
      }
      throw new Error(res.error.message || "Failed to save waitlist registration.");
    }

    if (!res.data) throw new Error("Failed to retrieve created waitlist entry.");
    return mapRowToEntry(res.data);
  }

  async listAll(page = 1, pageSize = 50): Promise<{ entries: WaitlistEntry[]; total: number }> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const res = await (this.db
      .from("waitlist")
      .select("*", { count: "exact" })
      .order("position", { ascending: true })
      .range(from, to) as unknown as Promise<{ data: Record<string, unknown>[] | null; count: number | null; error: { message: string } | null }>);

    if (res.error) {
      console.error("[WaitlistRepository] listAll error:", res.error.message);
      return { entries: [], total: 0 };
    }

    return {
      entries: (res.data ?? []).map((row) => mapRowToEntry(row)),
      total: res.count ?? 0,
    };
  }

  async getStats(): Promise<WaitlistStats> {
    const res = await (this.db
      .from("waitlist")
      .select("location, business_niche, referrals_count, points") as unknown as Promise<{ data: Record<string, unknown>[] | null; error: { message: string } | null }>);

    if (res.error) {
      console.error("[WaitlistRepository] getStats error:", res.error.message);
      return {
        totalCount: 0,
        byLocation: {},
        byNiche: {},
        totalReferrals: 0,
        averagePoints: 0,
      };
    }

    const rows = res.data ?? [];
    const byLocation: Record<string, number> = {};
    const byNiche: Record<string, number> = {};
    let totalReferrals = 0;
    let totalPoints = 0;

    for (const row of rows) {
      const loc = (row.location as string) ?? "Unknown";
      const niche = (row.business_niche as string) ?? "Unknown";
      byLocation[loc] = (byLocation[loc] ?? 0) + 1;
      byNiche[niche] = (byNiche[niche] ?? 0) + 1;
      totalReferrals += (row.referrals_count as number) ?? 0;
      totalPoints += (row.points as number) ?? 0;
    }

    return {
      totalCount: rows.length,
      byLocation,
      byNiche,
      totalReferrals,
      averagePoints: rows.length > 0 ? Math.round(totalPoints / rows.length) : 0,
    };
  }
}
