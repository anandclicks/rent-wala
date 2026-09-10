function normalizeMobile(mobile) {
  const digits = mobile.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  return digits;
}

export async function sendOtpSms(mobile, code) {
  const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SMS_SENDER || "PRWALA";

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.log(`[DEV OTP SMS] ${mobile}: ${code}`);
      return { ok: true, dev: true };
    }
    throw new Error("BREVO_API_KEY is not configured");
  }

  const res = await fetch("https://api.brevo.com/v3/transactionalSMS/sms", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender,
      recipient: normalizeMobile(mobile),
      content: `Your Property Rent Wala OTP is ${code}. Valid for 10 minutes. Do not share.`,
      type: "transactional",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Brevo SMS failed: ${err}`);
  }
  return { ok: true };
}

export async function sendOtpEmail(email, name, code) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_EMAIL_SENDER;
  const senderName = process.env.BREVO_EMAIL_SENDER_NAME || "Property Rent Wala";

  if (!apiKey || !senderEmail) {
    if (process.env.NODE_ENV === "development") {
      console.log(`[DEV OTP EMAIL] ${email}: ${code}`);
      return { ok: true, dev: true };
    }
    return { ok: false, skipped: true };
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email, name: name || email }],
      subject: "Your Property Rent Wala verification code",
      htmlContent: `<p>Hi ${name || "there"},</p><p>Your OTP is <strong>${code}</strong>. It expires in 10 minutes.</p>`,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Brevo email failed: ${err}`);
  }
  return { ok: true };
}
