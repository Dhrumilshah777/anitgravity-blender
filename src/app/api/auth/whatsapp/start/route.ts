import { NextResponse } from "next/server";
import twilio from "twilio";

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function normalizeE164(input: string) {
  const raw = input.trim();
  if (!raw) return null;
  if (!raw.startsWith("+")) return null;
  if (!/^\+[1-9]\d{6,14}$/.test(raw)) return null;
  return raw;
}

function toWhatsAppAddress(e164: string) {
  return `whatsapp:${e164}`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as unknown;
    const phone = typeof body === "object" && body && "phone" in body ? (body as any).phone : undefined;
    const e164 = typeof phone === "string" ? normalizeE164(phone) : null;
    if (!e164) {
      return NextResponse.json(
        { ok: false, error: "Enter phone number in +E164 format (example: +919876543210)." },
        { status: 400 },
      );
    }

    const accountSid = requireEnv("TWILIO_ACCOUNT_SID");
    const authToken = requireEnv("TWILIO_AUTH_TOKEN");
    const verifyServiceSid = requireEnv("TWILIO_VERIFY_SERVICE_SID");

    const client = twilio(accountSid, authToken);
    await client.verify.v2
      .services(verifyServiceSid)
      .verifications.create({ to: toWhatsAppAddress(e164), channel: "whatsapp" });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send OTP.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

