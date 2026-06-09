import nodemailer from "nodemailer";
import { SITE_CONFIG } from "./constants";

export interface ApplicationEmailData {
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  height: number;
  experienceArea: string;
  experience: string;
  phone: string;
  submittedAt: string;
  photoBuffer?: Buffer;
  photoFilename?: string;
  photoMimeType?: string;
}

export async function sendApplicationEmail(
  data: ApplicationEmailData
): Promise<{ sent: boolean; error?: string }> {
  const smtpUser = process.env.SMTP_USER ?? SITE_CONFIG.email;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpPass) {
    return { sent: false, error: "SMTP not configured" };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const html = `
    <h2>Yeni Başvuru - Bice Menajerlik</h2>
    <table style="border-collapse:collapse;width:100%;max-width:500px;">
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>İsim</strong></td><td style="padding:8px;border:1px solid #ddd;">${data.firstName}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Soyisim</strong></td><td style="padding:8px;border:1px solid #ddd;">${data.lastName}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Yaş</strong></td><td style="padding:8px;border:1px solid #ddd;">${data.age}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Şehir</strong></td><td style="padding:8px;border:1px solid #ddd;">${data.city}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Boy</strong></td><td style="padding:8px;border:1px solid #ddd;">${data.height} cm</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Deneyim Alanı</strong></td><td style="padding:8px;border:1px solid #ddd;">${data.experienceArea}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Telefon</strong></td><td style="padding:8px;border:1px solid #ddd;">${data.phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Deneyim</strong></td><td style="padding:8px;border:1px solid #ddd;">${data.experience}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Tarih</strong></td><td style="padding:8px;border:1px solid #ddd;">${data.submittedAt}</td></tr>
    </table>
  `;

  const attachments = data.photoBuffer
    ? [
        {
          filename: data.photoFilename ?? "basvuru-foto.jpg",
          content: data.photoBuffer,
          contentType: data.photoMimeType ?? "image/jpeg",
        },
      ]
    : [];

  await transporter.sendMail({
    from: `"Bice Menajerlik" <${smtpUser}>`,
    to: SITE_CONFIG.email,
    replyTo: data.phone.includes("@") ? data.phone : undefined,
    subject: `Yeni Başvuru: ${data.firstName} ${data.lastName} - ${data.city}`,
    html,
    attachments,
  });

  return { sent: true };
}
