import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Supabase Server Client
 * Uses SUPABASE_SERVICE_ROLE_KEY if configured; otherwise gracefully falls back to
 * NEXT_PUBLIC_SUPABASE_ANON_KEY for all waitlist operations.
 */
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ygpwmanoosdmxybxvjsv.supabase.co";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_hM2xrjr3rSEYYW2d6F6S1w_bX5gAUt7";

  const key =
    serviceRoleKey && serviceRoleKey !== "your-service-role-key-here" && serviceRoleKey.length > 20
      ? serviceRoleKey
      : anonKey;

  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
