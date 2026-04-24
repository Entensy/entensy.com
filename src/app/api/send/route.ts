import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, message, turnstileToken } = await request.json();

  // Verify Turnstile token before sending the email
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (secretKey) {
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
