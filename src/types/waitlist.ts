export interface WaitlistEntry {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  whatsapp: string;
  businessNiche: string;
  businessDescription?: string;
  idealCustomer?: string;
  city: string;
  location: string;
  country: string;
  platforms: string[];
  languages: string[];
  source?: string;
  referralCode: string;
  referredBy?: string;
  referralsCount: number;
  points: number;
  position: number;
  status: 'pending' | 'approved' | 'active' | 'onboarded';
  createdAt: string;
  updatedAt: string;
}

export interface JoinWaitlistPayload {
  businessName: string;
  ownerName: string;
  email: string;
  whatsapp: string;
  businessNiche: string;
  businessDescription?: string;
  idealCustomer?: string;
  city: string;
  location: string;
  country: string;
  platforms?: string[];
  languages?: string[];
  source?: string;
  referralCode?: string;
}

export interface WaitlistStats {
  totalCount: number;
  byLocation: Record<string, number>;
  byNiche: Record<string, number>;
  totalReferrals: number;
  averagePoints: number;
}

export interface BatchInfo {
  batchNumber: number;
  capacity: number;
  startDate: string;
  status: 'boarding' | 'next' | 'queued' | 'completed';
}
