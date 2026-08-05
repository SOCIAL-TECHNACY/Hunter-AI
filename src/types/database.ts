export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string;
          business_name: string;
          owner_name: string;
          email: string;
          whatsapp: string;
          business_niche: string;
          business_description: string | null;
          ideal_customer: string | null;
          city: string;
          location: string;
          country: string;
          platforms: Json;
          languages: Json;
          source: string | null;
          referral_code: string;
          referred_by: string | null;
          referrals_count: number;
          points: number;
          position: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_name: string;
          owner_name: string;
          email: string;
          whatsapp: string;
          business_niche: string;
          business_description?: string | null;
          ideal_customer?: string | null;
          city: string;
          location: string;
          country?: string;
          platforms?: Json;
          languages?: Json;
          source?: string | null;
          referral_code: string;
          referred_by?: string | null;
          referrals_count?: number;
          points?: number;
          position: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_name?: string;
          owner_name?: string;
          email?: string;
          whatsapp?: string;
          business_niche?: string;
          business_description?: string | null;
          ideal_customer?: string | null;
          city?: string;
          location?: string;
          country?: string;
          platforms?: Json;
          languages?: Json;
          source?: string | null;
          referral_code?: string;
          referred_by?: string | null;
          referrals_count?: number;
          points?: number;
          position?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone_number: string | null;
          avatar_url: string | null;
          role: string;
          waitlist_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone_number?: string | null;
          avatar_url?: string | null;
          role?: string;
          waitlist_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone_number?: string | null;
          avatar_url?: string | null;
          role?: string;
          waitlist_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
