import { siteConfig } from "@/lib/site-config";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;





const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (submissions.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const platform = String(body.platform || "Not specified").trim();
    const budget = String(body.budget || "Not specified").trim();
    const message = String(body.message || "").trim();


    const honeypot = String(body.company || "").trim();

    if (honeypot) {

      return NextResponse.json({ ok: true });
    }

    const errors: Record<string, string> = {};
    if (!name || name.length > 120) errors.name = "Please enter a valid name.";
    if (!EMAIL_REGEX.test(email) || email.length > 200) errors.email = "Please enter a valid email.";
    if (!message || message.length < 12 || message.length > 5000) {
      errors.message = "Please share a bit more detail (12–5000 characters).";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed.", fields: errors }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json(
        { error: "Email delivery isn't configured yet. Please email directly instead." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: `${siteConfig.name} Portfolio <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      html: `
        <h2>New project inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Platform:</strong> ${escapeHtml(platform)}</p>
        <p><strong>Budget range:</strong> ${escapeHtml(budget)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
      text: `New project inquiry\n\nName: ${name}\nEmail: ${email}\nPlatform: ${platform}\nBudget: ${budget}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        { error: "Message could not be sent right now. Please try emailing directly." },
        { status: 502 }
      );
    }



    resend.emails
      .send({
        from: `${siteConfig.name} <${fromEmail}>`,
        to: email,
        subject: `Thanks for reaching out, ${name}`,
        html: `
          <p>Hi ${escapeHtml(name)},</p>
          <p>Thanks for your message — I've received it and will reply within one business day.</p>
          <p>For reference, here's what you sent:</p>
          <blockquote>${escapeHtml(message).replace(/\n/g, "<br />")}</blockquote>
          <p>— ${siteConfig.name}</p>
        `,
        text: `Hi ${name},\n\nThanks for your message — I've received it and will reply within one business day.\n\nFor reference, here's what you sent:\n${message}\n\n— ${siteConfig.name}`,
      })
      .catch((err) => console.error("Confirmation email failed:", err));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
