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
  private resend: Resend | null = null;
  private readonly adminEmail: string;
  private readonly fromAddress = "Hunter AI <no-reply@socialtechnancy.com>";

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey && apiKey !== "your-resend-api-key-here" && apiKey.startsWith("re_")) {
      try {
        this.resend = new Resend(apiKey);
      } catch (err) {
        console.warn("[EmailService] Failed to initialize Resend client:", err);
      }
    }
    this.adminEmail = process.env.ADMIN_EMAIL ?? "admin@socialtechnancy.com";
  }

  async sendWelcome(ctx: EmailContext): Promise<SendResult> {
    if (!this.resend) {
      return { success: false, error: "Resend not configured" };
    }
    try {
      const { subject, html } = welcomeEmailTemplate(ctx.entry, ctx.referralUrl);
      return await this.send({ to: ctx.entry.email, subject, html });
    } catch (err) {
      console.warn("[EmailService] sendWelcome failed (non-blocking):", err);
      return { success: false, error: "Email delivery failed" };
    }
  }

  async notifyAdmin(ctx: EmailContext): Promise<SendResult> {
    if (!this.resend) {
      return { success: false, error: "Resend not configured" };
    }
    try {
      const { subject, html } = adminNotificationTemplate(ctx.entry, ctx.referralUrl);
      return await this.send({ to: this.adminEmail, subject, html });
    } catch (err) {
      console.warn("[EmailService] notifyAdmin failed (non-blocking):", err);
      return { success: false, error: "Email delivery failed" };
    }
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
    if (!this.resend) {
      return { success: false, error: "Resend client not active" };
    }
    try {
      const { error } = await this.resend.emails.send({
        from: this.fromAddress,
        to,
        subject,
        html,
      });

      if (error) {
        console.warn("[EmailService] Resend API error (non-fatal):", error.message);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.warn("[EmailService] Email send error (non-fatal):", message);
      return { success: false, error: message };
    }
  }
}
