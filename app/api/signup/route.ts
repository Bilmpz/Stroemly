import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return Response.json({ ok: false, error: "Email mangler" }, { status: 400 });
    }

    // simpel email check
    const clean = email.trim().toLowerCase();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean);
    if (!emailOk) {
      return Response.json({ ok: false, error: "Ugyldig email" }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || "465");
    const secure = (process.env.SMTP_SECURE || "true") === "true";
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    const mailTo = process.env.MAIL_TO;
    const mailFrom = process.env.MAIL_FROM || user;

    if (!host || !user || !pass || !mailTo || !mailFrom) {
      return Response.json(
        { ok: false, error: "Server mail-konfiguration mangler (.env.local)" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: "Ny Strømly signup (Lancering 2026)",
      text: `Ny signup:\n\nEmail: ${clean}\nTid: ${new Date().toISOString()}\n`,
      html: `
        <div style="font-family: ui-sans-serif, system-ui; line-height:1.5">
          <h2>Ny Strømly signup</h2>
          <p><b>Email:</b> ${clean}</p>
          <p><b>Tid:</b> ${new Date().toISOString()}</p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false, error: "Noget gik galt" }, { status: 500 });
  }
}