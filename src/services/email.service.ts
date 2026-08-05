import { Resend } from "resend";
import type { WaitlistEntry } from "@/types/waitlist";
import {
  welcomeEmailTemplate,
  adminNotificationTemplate,
  weeklyUpdateTemplate,
  launchReminderTemplate,
  referralMilestoneTemplate,
  queuePositionUpdateTemplate,
} from "@/lib/email/templates";

interface EmailContext {
  entry: WaitlistEntry;
  referralUrl: string;
}

interface SendResult {
  success: boolean;
  error?: string;
}

export class EmailService {
  private readonly resend: Resend;
  private readonly adminEmail: string;
  private readonly fromAddress = "Hunter AI <no-reply@socialtechnancy.com>";

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.adminEmail = process.env.ADMIN_EMAIL ?? "admin@socialtechnancy.com";
  }

  async sendWelcome(ctx: EmailContext): Promise<SendResult> {
    const { subject, html } = welcomeEmailTemplate(ctx.entry, ctx.referralUrl);
    return this.send({ to: ctx.entry.email, subject, html });
  }

  async notifyAdmin(ctx: EmailContext): Promise<SendResult> {
    const { subject, html } = adminNotificationTemplate(ctx.entry, ctx.referralUrl);
    return this.send({ to: this.adminEmail, subject, html });
  }

  async sendWeeklyUpdate(to: string, entry: WaitlistEntry, referralUrl: string): Promise<SendResult> {
    const { subject, html } = weeklyUpdateTemplate(entry, referralUrl);
    return this.send({ to, subject, html });
  }

  async sendLaunchReminder(to: string, entry: WaitlistEntry): Promise<SendResult> {
    const { subject, html } = launchReminderTemplate(entry);
    return this.send({ to, subject, html });
  }

  async sendReferralMilestone(to: string, entry: WaitlistEntry, referralUrl: string): Promise<SendResult> {
    const { subject, html } = referralMilestoneTemplate(entry, referralUrl);
    return this.send({ to, subject, html });
  }

  async sendQueuePositionUpdate(to: string, entry: WaitlistEntry): Promise<SendResult> {
    const { subject, html } = queuePositionUpdateTemplate(entry);
    return this.send({ to, subject, html });
  }

  private async send({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }): Promise<SendResult> {
    try {
      const { error } = await this.resend.emails.send({
        from: this.fromAddress,
        to,
        subject,
        html,
      });

      if (error) {
        console.error("[EmailService] Resend error:", error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("[EmailService] Unexpected error:", message);
      return { success: false, error: message };
    }
  }
}
