const ADJECTIVES = ["swift", "sharp", "bold", "peak", "nova", "apex", "hunt", "lead", "sale", "rich"];
const NOUNS = ["pro", "ace", "fx", "hub", "win", "max", "biz", "hq", "lab", "ai"];

export function generateReferralCode(businessName: string): string {
  const prefix = businessName
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase()
    .slice(0, 4)
    .padEnd(4, "X");

  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)].toUpperCase();
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)].toUpperCase();
  const suffix = Math.floor(100 + Math.random() * 900).toString();

  return `${prefix}-${adj}${noun}${suffix}`;
}

export function buildReferralUrl(code: string, appUrl: string): string {
  const base = appUrl.endsWith("/") ? appUrl.slice(0, -1) : appUrl;
  return `${base}/r/${code}`;
}
