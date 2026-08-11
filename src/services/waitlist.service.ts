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
    // 1. Check for duplicates
    try {
      const [emailConflict, whatsappConflict] = await Promise.all([
        this.repository.findByEmail(payload.email),
        this.repository.findByWhatsApp(payload.whatsapp),
      ]);

      if (emailConflict) {
        return { success: false, error: "This email is already on the waitlist." };
      }

      if (whatsappConflict) {
        return { success: false, error: "This WhatsApp number is already registered on the waitlist." };
      }
    } catch (checkErr) {
      console.warn("[WaitlistService] Pre-check warning:", checkErr);
      // Proceed to create if check had non-fatal issue; database UNIQUE constraints will enforce uniqueness
    }

    // 2. Validate referral code if provided
    if (payload.referralCode) {
      try {
        const referrer = await this.repository.findByReferralCode(payload.referralCode);
        if (!referrer) {
          return { success: false, error: "The referral code entered is invalid." };
        }
      } catch (refErr) {
        console.warn("[WaitlistService] Referrer check warning:", refErr);
      }
    }

    // 3. Create entry in database
    const entry = await this.repository.create(payload);
    const referralUrl = buildReferralUrl(entry.referralCode, APP_URL);

    // 4. Asynchronous non-blocking notifications
    // Email delivery must NEVER block or fail a successful database registration
    Promise.allSettled([
      this.emailService.sendWelcome({ entry, referralUrl }),
      this.emailService.notifyAdmin({ entry, referralUrl }),
    ]).catch((emailErr) => {
      console.warn("[WaitlistService] Non-fatal notification error:", emailErr);
    });

    return { success: true, entry };
  }

  async getReferralEntry(code: string): Promise<WaitlistEntry | null> {
    return this.repository.findByReferralCode(code);
  }
}
