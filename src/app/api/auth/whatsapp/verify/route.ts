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
    const code = typeof body === "object" && body && "code" in body ? (body as any).code : undefined;

    const e164 = typeof phone === "string" ? normalizeE164(phone) : null;
    const otp = typeof code === "string" ? code.trim() : "";

    if (!e164) {
      return NextResponse.json(
        { ok: false, error: "Enter phone number in +E164 format (example: +919876543210)." },
        { status: 400 },
      );
    }
    if (!/^\d{4,10}$/.test(otp)) {
      return NextResponse.json({ ok: false, error: "Enter the OTP code." }, { status: 400 });
    }

    const accountSid = requireEnv("TWILIO_ACCOUNT_SID");
    const authToken = requireEnv("TWILIO_AUTH_TOKEN");
    const verifyServiceSid = requireEnv("TWILIO_VERIFY_SERVICE_SID");
    const whatsappFrom = requireEnv("TWILIO_WHATSAPP_FROM");

    const client = twilio(accountSid, authToken);
    const check = await client.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({ to: toWhatsAppAddress(e164), code: otp });

    if (check.status !== "approved") {
      return NextResponse.json({ ok: false, error: "Invalid OTP." }, { status: 401 });
    }

    const to = toWhatsAppAddress(e164);
    await client.messages.create({
      from: whatsappFrom,
      to,
      body: "Welcome! You have successfully logged in.",
    });

    const res = NextResponse.json({ ok: true });
    res.cookies.set("auth_phone", e164, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to verify OTP.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

