import nodemailer from "nodemailer";

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;

  if (!host || !user || !pass || !from) {
    return null;
  }

  return { host, port, secure, user, pass, from };
}

function createTransport(config: NonNullable<ReturnType<typeof getSmtpConfig>>, authMethod?: "PLAIN" | "LOGIN") {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: !config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    authMethod,
  });
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const config = getSmtpConfig();

  if (!config) {
    console.log("[mail] SMTP non configuré — email non envoyé", {
      to: options.to,
      subject: options.subject,
    });
    return { success: false, reason: "smtp_not_configured" as const };
  }

  try {
    const transporter = createTransport(config, "PLAIN");
    await transporter.sendMail({
      from: config.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });
  } catch (error) {
    const isAuthError = typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === "EAUTH";
    const isOvhHost = /ovh\.net$/i.test(config.host);

    if (!isAuthError || !isOvhHost) {
      throw error;
    }

    // OVH can reject AUTH PLAIN; retry with LOGIN on the recommended host.
    const fallbackConfig = {
      ...config,
      host: "smtp.mail.ovh.net",
      port: 587,
      secure: false,
    };

    const fallbackTransporter = createTransport(fallbackConfig, "LOGIN");
    await fallbackTransporter.sendMail({
      from: config.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });
  }

  return { success: true as const };
}
