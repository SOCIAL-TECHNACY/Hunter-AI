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
      .eq("email", email)
      .maybeSingle() as unknown as Promise<{ data: Record<string, unknown> | null; error: { message: string } | null }>);

    if (res.error) throw new Error(res.error.message);
    if (!res.data) return null;
    return mapRowToEntry(res.data);
  }

  async findByWhatsApp(whatsapp: string): Promise<WaitlistEntry | null> {
    const res = await (this.db
      .from("waitlist")
      .select("*")
      .eq("whatsapp", whatsapp)
      .maybeSingle() as unknown as Promise<{ data: Record<string, unknown> | null; error: { message: string } | null }>);

    if (res.error) throw new Error(res.error.message);
    if (!res.data) return null;
    return mapRowToEntry(res.data);
  }

  async findByReferralCode(code: string): Promise<WaitlistEntry | null> {
    const res = await (this.db
      .from("waitlist")
      .select("*")
      .eq("referral_code", code)
      .maybeSingle() as unknown as Promise<{ data: Record<string, unknown> | null; error: { message: string } | null }>);

    if (res.error) throw new Error(res.error.message);
    if (!res.data) return null;
    return mapRowToEntry(res.data);
  }

  async getNextPosition(): Promise<number> {
    const { count, error } = await this.db
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (error) throw new Error(error.message);
    return (count ?? 0) + 1;
  }

  async create(payload: JoinWaitlistPayload): Promise<WaitlistEntry> {
    const position = await this.getNextPosition();
    const referralCode = generateReferralCode(payload.businessName);

    const insertData = {
      business_name: payload.businessName,
      owner_name: payload.ownerName,
      email: payload.email,
      whatsapp: payload.whatsapp,
      business_niche: payload.businessNiche,
      business_description: payload.businessDescription ?? null,
      ideal_customer: payload.idealCustomer ?? null,
      city: payload.city,
      location: payload.location,
      country: payload.country,
      platforms: payload.platforms ?? ["instagram", "facebook"],
      languages: payload.languages ?? ["pidgin", "english"],
      source: payload.source ?? "direct",
      referral_code: referralCode,
      referred_by: payload.referralCode ?? null,
      referrals_count: 0,
      points: BASE_REGISTRATION_POINTS,
      position,
      status: "pending",
    };

    const res = await (this.db
      .from("waitlist")
      .insert(insertData as never)
      .select("*")
      .single() as unknown as Promise<{ data: Record<string, unknown> | null; error: { message: string } | null }>);

    if (res.error) throw new Error(res.error.message);
    if (!res.data) throw new Error("Failed to insert waitlist entry.");
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

    if (res.error) throw new Error(res.error.message);

    return {
      entries: (res.data ?? []).map((row) => mapRowToEntry(row)),
      total: res.count ?? 0,
    };
  }

  async getStats(): Promise<WaitlistStats> {
    const res = await (this.db
      .from("waitlist")
      .select("location, business_niche, referrals_count, points") as unknown as Promise<{ data: Record<string, unknown>[] | null; error: { message: string } | null }>);

    if (res.error) throw new Error(res.error.message);

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
