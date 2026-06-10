import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import os from "os";
import path from "path";
import { sendApplicationEmail } from "@/lib/email";
import { buildWhatsAppMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n/translations";

/** Best-effort local backup; never blocks submission (Vercel FS is read-only). */
async function persistApplicationBackup(
  appId: string,
  application: object,
  photoBuffer?: Buffer,
  photoFilename?: string
) {
  try {
    const uploadsDir = path.join(os.tmpdir(), "bice-applications");
    await mkdir(uploadsDir, { recursive: true });
    await writeFile(
      path.join(uploadsDir, `${appId}.json`),
      JSON.stringify(application, null, 2)
    );
    if (photoBuffer && photoFilename) {
      await writeFile(path.join(uploadsDir, photoFilename), photoBuffer);
    }
  } catch (error) {
    console.warn("Application backup skipped:", error);
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const age = formData.get("age") as string;
    const city = formData.get("city") as string;
    const experienceArea = formData.get("experienceArea") as string;
    const experience = formData.get("experience") as string;
    const phone = formData.get("phone") as string;
    const deliveryMethod = (formData.get("deliveryMethod") as string) || "email";
    const locale = (formData.get("locale") as Locale) || "tr";
    const photo = formData.get("photo") as File | null;

    if (
      !firstName ||
      !lastName ||
      !age ||
      !city ||
      !experienceArea ||
      !experience ||
      !phone
    ) {
      return NextResponse.json(
        { error: "Tüm zorunlu alanları doldurunuz" },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();
    const application = {
      firstName,
      lastName,
      age: Number(age),
      city,
      experienceArea,
      experience,
      phone,
      deliveryMethod,
      submittedAt,
    };

    const timestamp = Date.now();
    const appId = `${timestamp}-${firstName.toLowerCase()}-${lastName.toLowerCase()}`;

    let photoBuffer: Buffer | undefined;
    let photoFilename: string | undefined;
    let photoMimeType: string | undefined;

    if (photo && photo.size > 0) {
      const bytes = await photo.arrayBuffer();
      photoBuffer = Buffer.from(bytes);
      photoMimeType = photo.type;
      const ext = photo.name.split(".").pop() || "jpg";
      photoFilename = `basvuru-${appId}.${ext}`;
    }

    await persistApplicationBackup(appId, application, photoBuffer, photoFilename);

    const whatsappMessage = buildWhatsAppMessage(application, locale);
    const whatsappUrl = getWhatsAppUrl(whatsappMessage);

    let emailSent = false;

    if (deliveryMethod === "email") {
      const emailResult = await sendApplicationEmail({
        ...application,
        submittedAt,
        photoBuffer,
        photoFilename,
        photoMimeType,
      });
      emailSent = emailResult.sent;

      if (!emailSent) {
        return NextResponse.json({
          success: true,
          id: appId,
          emailSent: false,
          whatsappUrl,
          fallbackToWhatsapp: true,
        });
      }
    }

    return NextResponse.json({
      success: true,
      id: appId,
      emailSent: deliveryMethod === "email" ? emailSent : false,
      whatsappUrl: deliveryMethod === "whatsapp" ? whatsappUrl : undefined,
      deliveryMethod,
    });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Başvuru işlenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
