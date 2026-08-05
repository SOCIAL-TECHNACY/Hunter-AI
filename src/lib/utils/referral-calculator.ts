/** Base points awarded on waitlist registration */
export const BASE_REGISTRATION_POINTS = 10;

/** Points awarded per successful referral */
export const REFERRAL_POINTS = 100;

/** Points awarded for completing business profile */
export const PROFILE_COMPLETE_POINTS = 50;

export interface PointsLedger {
  registration: number;
  referrals: number;
  profileCompletion: number;
  total: number;
}

export function calculatePoints(referralCount: number, hasFullProfile: boolean): PointsLedger {
  const referrals = referralCount * REFERRAL_POINTS;
  const profileCompletion = hasFullProfile ? PROFILE_COMPLETE_POINTS : 0;

  return {
    registration: BASE_REGISTRATION_POINTS,
    referrals,
    profileCompletion,
    total: BASE_REGISTRATION_POINTS + referrals + profileCompletion,
  };
}

export function getRankTier(points: number): string {
  if (points >= 510) return "Legend";
  if (points >= 310) return "Boss";
  if (points >= 210) return "Hustler";
  if (points >= 110) return "Starter";
  return "Rookie";
}
