import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  message: z.string().min(10).max(5000),
  turnstileToken: z.string().min(1).nullable().optional(),
});

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const { name, email, message, turnstileToken } = parsed.data;

  // Verify Turnstile token before sending the email
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (secretKey) {
    if (!turnstileToken) {
      return NextResponse.json({ ok: false, error: "captcha" }, { status: 400 });
    }
    try {
      const verification = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ secret: secretKey, response: turnstileToken }),
        }
      );
      const result = (await verification.json()) as { success: boolean };
      if (!result.success) {
        return NextResponse.json({ ok: false, error: "captcha" }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ ok: false, error: "captcha" }, { status: 503 });
    }
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "ENTENSY Contact <contact@entensy.com>",
    to: "contact@entensy.com",
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
