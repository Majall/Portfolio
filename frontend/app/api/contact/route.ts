// app/api/contact/route.ts
// Contact form API endpoint — supports Resend (primary) or Nodemailer (fallback)

import { NextRequest, NextResponse } from "next/server";

// ----- Types -----

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

interface ValidationError {
  field: string;
  message: string;
}

// ----- Validation -----

function validate(body: Partial<ContactPayload>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!body.name || body.name.trim().length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters." });
  }

  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push({ field: "email", message: "A valid email is required." });
  }

  if (!body.message || body.message.trim().length < 10) {
    errors.push({ field: "message", message: "Message must be at least 10 characters." });
  }

  // Prevent excessively long inputs
  if (body.name && body.name.length > 100) {
    errors.push({ field: "name", message: "Name is too long." });
  }
  if (body.message && body.message.length > 2000) {
    errors.push({ field: "message", message: "Message must be under 2000 characters." });
  }

  return errors;
}

// ----- Send Email via Resend -----

async function sendWithResend(payload: ContactPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [process.env.EMAIL_TO || process.env.EMAIL_USER!],
      reply_to: payload.email,
      subject: payload.subject
        ? `[Portfolio] ${payload.subject}`
        : `[Portfolio] New message from ${payload.name}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #63b3ed;">New Portfolio Message</h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #718096;">From:</td><td><strong>${payload.name}</strong> (${payload.email})</td></tr>
            <tr><td style="padding: 8px 0; color: #718096;">Subject:</td><td>${payload.subject || "(none)"}</td></tr>
          </table>
          <hr style="border-color: #2d3748; margin: 16px 0;" />
          <p style="white-space: pre-wrap; line-height: 1.7;">${payload.message}</p>
        </div>
      `,
    }),
  });

  return res.ok;
}

// ----- Send Email via Nodemailer -----

async function sendWithNodemailer(payload: ContactPayload): Promise<boolean> {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  if (!emailUser || !emailPass) return false;

  // Dynamically import nodemailer (only available server-side)
  const nodemailer = await import("nodemailer");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: emailUser, pass: emailPass },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${emailUser}>`,
      to: emailUser,
      replyTo: payload.email,
      subject: payload.subject
        ? `[Portfolio] ${payload.subject}`
        : `[Portfolio] New message from ${payload.name}`,
      text: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
      html: `<p><strong>From:</strong> ${payload.name} (${payload.email})</p><p>${payload.message}</p>`,
    });
    return true;
  } catch {
    return false;
  }
}

// ----- Optional: Save to MongoDB -----

async function saveToMongo(payload: ContactPayload): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return;

  try {
    const { MongoClient } = await import("mongodb");
    const client = new MongoClient(uri);
    await client.connect();
    await client.db("portfolio").collection("messages").insertOne({
      ...payload,
      createdAt: new Date(),
      read: false,
    });
    await client.close();
  } catch (err) {
    // Don't fail the request if DB save fails — email is the primary channel
    console.error("MongoDB save failed:", err);
  }
}

// ----- Simple in-memory rate limiting -----
// For production, use Redis or Upstash

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;         // max requests
const RATE_WINDOW = 60 * 1000; // per 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

// ============================================================
// ROUTE HANDLER
// ============================================================

export async function POST(req: NextRequest) {
  // Get IP for rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "unknown";

  // Rate limit check
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  // Parse body
  let body: Partial<ContactPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Validate
  const errors = validate(body);
  if (errors.length > 0) {
    return NextResponse.json(
      { success: false, errors },
      { status: 422 }
    );
  }

  const payload = body as ContactPayload;

  // Try to send email (Resend → Nodemailer fallback)
  let emailSent = await sendWithResend(payload);
  if (!emailSent) {
    emailSent = await sendWithNodemailer(payload);
  }

  // Save to MongoDB (fire-and-forget)
  saveToMongo(payload);

  if (!emailSent) {
    // If no email provider is configured, still succeed in dev
    if (process.env.NODE_ENV === "development") {
      console.log("📧 [DEV] Contact form submission:", payload);
      return NextResponse.json({ success: true, dev: true });
    }
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try emailing directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

// Only allow POST
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
