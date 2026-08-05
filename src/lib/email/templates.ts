import type { WaitlistEntry } from "@/types/waitlist";
import { formatPosition } from "@/lib/utils/formatters";
import { APP_NAME, BRAND_NAME } from "@/lib/constants";

const baseStyles = `
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background: #0d0820;
  color: #e5e0ff;
  margin: 0;
  padding: 0;
`;

const containerStyles = `
  max-width: 600px;
  margin: 0 auto;
  background: #1a1033;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #3b1f8c;
`;

const headerStyles = `
  background: linear-gradient(135deg, #5E35B1 0%, #3b1f8c 100%);
  padding: 40px 32px;
  text-align: center;
`;

const bodyStyles = `
  padding: 32px;
`;

const footerStyles = `
  padding: 24px 32px;
  border-top: 1px solid #2d1f5e;
  text-align: center;
  font-size: 12px;
  color: #7c6db5;
`;

function layout(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
    <body style="${baseStyles}">
      <div style="padding: 24px;">
        <div style="${containerStyles}">
          <div style="${headerStyles}">
            <p style="margin:0;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#a78bfa;margin-bottom:8px;">${BRAND_NAME}</p>
            <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;">${APP_NAME} 🎯</h1>
          </div>
          <div style="${bodyStyles}">${content}</div>
          <div style="${footerStyles}">
            <p style="margin:0;">© ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.</p>
            <p style="margin:8px 0 0;">You received this because you joined the ${APP_NAME} waitlist.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function welcomeEmailTemplate(
  entry: WaitlistEntry,
  referralUrl: string
): { subject: string; html: string } {
  const subject = `🎉 You're #${entry.position} on the ${APP_NAME} waitlist!`;
  const html = layout(`
    <h2 style="color:#a78bfa;margin-top:0;">Welcome aboard, ${entry.ownerName}! 🚀</h2>
    <p style="color:#c4b5fd;line-height:1.7;">
      You just secured your spot on the <strong>${APP_NAME}</strong> waitlist. 
      We're building the most powerful AI-powered customer hunter for African businesses — 
      and you're one of the first to get access.
    </p>

    <div style="background:#2d1f5e;border-radius:12px;padding:24px;margin:24px 0;text-align:center;">
      <p style="margin:0 0 4px;color:#a78bfa;font-size:13px;letter-spacing:2px;text-transform:uppercase;">Your Queue Position</p>
      <p style="margin:0;font-size:56px;font-weight:900;color:#ffffff;">${formatPosition(entry.position)}</p>
      <p style="margin:8px 0 0;color:#7c6db5;font-size:14px;">Out of thousands who applied</p>
    </div>

    <div style="background:#1e1244;border-radius:12px;padding:20px;margin:20px 0;">
      <p style="margin:0 0 8px;color:#a78bfa;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Your Referral Code</p>
      <p style="margin:0;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:3px;font-family:monospace;">${entry.referralCode}</p>
    </div>

    <p style="color:#c4b5fd;line-height:1.7;">
      <strong style="color:#fff;">Jump the queue!</strong> Every business you refer earns you <strong style="color:#a78bfa;">+100 points</strong> and moves you closer to early access.
    </p>

    <div style="margin:24px 0;text-align:center;">
      <a href="${referralUrl}" 
        style="display:inline-block;background:linear-gradient(135deg,#5E35B1,#8E64FF);color:#fff;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:700;font-size:16px;">
        Share Your Referral Link →
      </a>
    </div>

    <p style="color:#7c6db5;font-size:13px;word-break:break-all;">Or copy: ${referralUrl}</p>
  `);

  return { subject, html };
}

export function adminNotificationTemplate(
  entry: WaitlistEntry,
  referralUrl: string
): { subject: string; html: string } {
  const subject = `[${APP_NAME}] New Signup #${entry.position} — ${entry.businessName}`;
  const html = layout(`
    <h2 style="color:#a78bfa;margin-top:0;">New Waitlist Registration 🎯</h2>
    <table style="width:100%;border-collapse:collapse;">
      ${[
        ["Position", `#${entry.position}`],
        ["Business", entry.businessName],
        ["Owner", entry.ownerName],
        ["Niche", entry.businessNiche],
        ["Email", entry.email],
        ["WhatsApp", entry.whatsapp],
        ["City", entry.city],
        ["Country", entry.country],
        ["Referred By", entry.referredBy ?? "—"],
        ["Source", entry.source ?? "direct"],
        ["Referral Code", entry.referralCode],
      ]
        .map(
          ([label, value]) => `
          <tr>
            <td style="padding:10px 12px;color:#7c6db5;font-size:13px;border-bottom:1px solid #2d1f5e;width:40%;">${label}</td>
            <td style="padding:10px 12px;color:#e5e0ff;font-size:13px;border-bottom:1px solid #2d1f5e;">${value}</td>
          </tr>`
        )
        .join("")}
    </table>
    <p style="margin-top:20px;color:#7c6db5;font-size:12px;">Referral URL: ${referralUrl}</p>
  `);

  return { subject, html };
}

export function weeklyUpdateTemplate(
  entry: WaitlistEntry,
  referralUrl: string
): { subject: string; html: string } {
  const subject = `📊 Your ${APP_NAME} weekly update — ${entry.referralsCount} referrals so far`;
  const html = layout(`
    <h2 style="color:#a78bfa;margin-top:0;">Your Weekly Progress, ${entry.ownerName}!</h2>
    <p style="color:#c4b5fd;line-height:1.7;">Here's how you're doing on the ${APP_NAME} waitlist:</p>
    <div style="display:flex;gap:16px;margin:24px 0;">
      <div style="flex:1;background:#2d1f5e;border-radius:12px;padding:20px;text-align:center;">
        <p style="margin:0 0 4px;color:#a78bfa;font-size:12px;text-transform:uppercase;">Position</p>
        <p style="margin:0;font-size:36px;font-weight:900;color:#fff;">#${entry.position}</p>
      </div>
      <div style="flex:1;background:#2d1f5e;border-radius:12px;padding:20px;text-align:center;">
        <p style="margin:0 0 4px;color:#a78bfa;font-size:12px;text-transform:uppercase;">Referrals</p>
        <p style="margin:0;font-size:36px;font-weight:900;color:#fff;">${entry.referralsCount}</p>
      </div>
      <div style="flex:1;background:#2d1f5e;border-radius:12px;padding:20px;text-align:center;">
        <p style="margin:0 0 4px;color:#a78bfa;font-size:12px;text-transform:uppercase;">Points</p>
        <p style="margin:0;font-size:36px;font-weight:900;color:#fff;">${entry.points}</p>
      </div>
    </div>
    <div style="text-align:center;margin-top:24px;">
      <a href="${referralUrl}" style="display:inline-block;background:linear-gradient(135deg,#5E35B1,#8E64FF);color:#fff;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:700;">
        Keep Referring →
      </a>
    </div>
  `);
  return { subject, html };
}

export function launchReminderTemplate(
  entry: WaitlistEntry
): { subject: string; html: string } {
  const subject = `🚀 ${APP_NAME} launches soon — you're #${entry.position}!`;
  const html = layout(`
    <h2 style="color:#a78bfa;margin-top:0;">We're almost live, ${entry.ownerName}! 🎉</h2>
    <p style="color:#c4b5fd;line-height:1.7;">
      The wait is almost over. ${APP_NAME} is launching very soon and you're currently at 
      position <strong style="color:#fff;">#${entry.position}</strong>.
    </p>
    <p style="color:#c4b5fd;line-height:1.7;">
      Get ready to start finding customers on autopilot. Your ${entry.businessName} is about to grow.
    </p>
  `);
  return { subject, html };
}

export function referralMilestoneTemplate(
  entry: WaitlistEntry,
  referralUrl: string
): { subject: string; html: string } {
  const subject = `🏆 Congrats! You just hit ${entry.referralsCount} referrals on ${APP_NAME}!`;
  const html = layout(`
    <h2 style="color:#a78bfa;margin-top:0;">Milestone unlocked, ${entry.ownerName}! 🏆</h2>
    <p style="color:#c4b5fd;line-height:1.7;">
      You've referred <strong style="color:#fff;">${entry.referralsCount} businesses</strong> to ${APP_NAME}! 
      That's incredible! You now have <strong style="color:#a78bfa;">${entry.points} points</strong>.
    </p>
    <div style="text-align:center;margin-top:24px;">
      <a href="${referralUrl}" style="display:inline-block;background:linear-gradient(135deg,#5E35B1,#8E64FF);color:#fff;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:700;">
        Share Again →
      </a>
    </div>
  `);
  return { subject, html };
}

export function queuePositionUpdateTemplate(
  entry: WaitlistEntry
): { subject: string; html: string } {
  const subject = `📈 Queue update — you're now #${entry.position} on ${APP_NAME}!`;
  const html = layout(`
    <h2 style="color:#a78bfa;margin-top:0;">You moved up the queue! 📈</h2>
    <p style="color:#c4b5fd;line-height:1.7;">
      Great news, ${entry.ownerName}! Your referrals are paying off. 
      You're now at position <strong style="color:#fff;">#${entry.position}</strong>.
    </p>
    <div style="background:#2d1f5e;border-radius:12px;padding:24px;margin:24px 0;text-align:center;">
      <p style="margin:0;font-size:56px;font-weight:900;color:#ffffff;">${formatPosition(entry.position)}</p>
    </div>
  `);
  return { subject, html };
}
