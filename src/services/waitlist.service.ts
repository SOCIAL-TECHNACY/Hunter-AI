import type { WaitlistEntry, JoinWaitlistPayload } from "@/types/waitlist";
import { WaitlistRepository } from "@/repositories/waitlist.repository";
import { EmailService } from "@/services/email.service";
import { buildReferralUrl } from "@/lib/utils/code-generator";
import { APP_URL } from "@/lib/constants";

interface JoinResult {
  success: boolean;
  entry?: WaitlistEntry;
  error?: string;
}

export class WaitlistService {
  private readonly repository = new WaitlistRepository();
  private readonly emailService = new EmailService();

  async join(payload: JoinWaitlistPayload): Promise<JoinResult> {
    const [emailConflict, whatsappConflict] = await Promise.all([
      this.repository.findByEmail(payload.email),
      this.repository.findByWhatsApp(payload.whatsapp),
    ]);

    if (emailConflict) {
      return { success: false, error: "This email is already on the waitlist." };
    }

    if (whatsappConflict) {
      return { success: false, error: "This WhatsApp number is already registered." };
    }

    if (payload.referralCode) {
      const referrer = await this.repository.findByReferralCode(payload.referralCode);
      if (!referrer) {
        return { success: false, error: "The referral code entered is invalid." };
      }
    }

    const entry = await this.repository.create(payload);
    const referralUrl = buildReferralUrl(entry.referralCode, APP_URL);

    await this.emailService.sendWelcome({ entry, referralUrl });
    await this.emailService.notifyAdmin({ entry, referralUrl });

    return { success: true, entry };
  }

  async getReferralEntry(code: string): Promise<WaitlistEntry | null> {
    return this.repository.findByReferralCode(code);
  }
}
