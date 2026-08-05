-- ==========================================================
-- HUNTER AI (By Social Technancy) - Database Initial Schema
-- Phase 0: Waitlist + SaaS Forward Compatibility
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. WAITLIST TABLE (Phase 0 Core + SaaS Onboarding Fields)
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_name TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    whatsapp TEXT UNIQUE NOT NULL,
    business_niche TEXT NOT NULL,
    business_description TEXT,
    ideal_customer TEXT,
    city TEXT NOT NULL,
    location TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Nigeria',
    platforms JSONB DEFAULT '["instagram", "facebook"]'::jsonb,
    languages JSONB DEFAULT '["pidgin", "english"]'::jsonb,
    source TEXT DEFAULT 'direct',
    referral_code TEXT UNIQUE NOT NULL,
    referred_by TEXT REFERENCES public.waitlist(referral_code) ON DELETE SET NULL,
    referrals_count INT DEFAULT 0,
    points INT DEFAULT 10, -- Base points given on registration
    position INT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active', 'onboarded')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_whatsapp ON public.waitlist(whatsapp);
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON public.waitlist(referral_code);
CREATE INDEX IF NOT EXISTS idx_waitlist_referred_by ON public.waitlist(referred_by);
CREATE INDEX IF NOT EXISTS idx_waitlist_position ON public.waitlist(position);
CREATE INDEX IF NOT EXISTS idx_waitlist_points ON public.waitlist(points DESC);

-- 2. FUTURE SAAS TABLES (Forward Compatibility)

-- User Profiles (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone_number TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'tenant_owner')),
    waitlist_id UUID REFERENCES public.waitlist(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tenants (Multi-tenant SaaS Support)
CREATE TABLE IF NOT EXISTS public.tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE RESTRICT,
    niche TEXT,
    country TEXT DEFAULT 'Nigeria',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
    plan_tier TEXT DEFAULT 'starter' CHECK (plan_tier IN ('starter', 'hustler', 'boss', 'enterprise')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'canceled', 'trialing')),
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hunter Jobs (Social media lead crawling jobs)
CREATE TABLE IF NOT EXISTS public.hunter_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
    query_keywords JSONB NOT NULL,
    target_platforms JSONB NOT NULL,
    target_locations JSONB NOT NULL,
    status TEXT DEFAULT 'running' CHECK (status IN ('idle', 'running', 'paused', 'completed')),
    last_run_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads (Discovered buyers)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
    job_id UUID REFERENCES public.hunter_jobs(id) ON DELETE SET NULL,
    platform TEXT NOT NULL,
    customer_name TEXT,
    customer_handle TEXT,
    post_url TEXT,
    query_match TEXT,
    sentiment_score FLOAT,
    intent_level TEXT CHECK (intent_level IN ('high', 'medium', 'low')),
    raw_text TEXT,
    whatsapp_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. FUNCTIONS AND TRIGGERS

-- Function to handle referral points and position bump
CREATE OR REPLACE FUNCTION public.handle_new_referral()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.referred_by IS NOT NULL THEN
        -- Update referrer's points (+100 pts per referral) and count
        UPDATE public.waitlist
        SET 
            referrals_count = referrals_count + 1,
            points = points + 100,
            updated_at = NOW()
        WHERE referral_code = NEW.referred_by;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on waitlist insertion
DROP TRIGGER IF EXISTS trigger_handle_new_referral ON public.waitlist;
CREATE TRIGGER trigger_handle_new_referral
    AFTER INSERT ON public.waitlist
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_referral();

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hunter_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow public to insert into waitlist
CREATE POLICY "Public can insert into waitlist" 
    ON public.waitlist FOR INSERT 
    WITH CHECK (true);

-- Allow public to read basic waitlist info (for position calculation)
CREATE POLICY "Public can read waitlist" 
    ON public.waitlist FOR SELECT 
    USING (true);

-- Allow admin full access to waitlist
CREATE POLICY "Admin full access to waitlist"
    ON public.waitlist FOR ALL
    USING (true);
