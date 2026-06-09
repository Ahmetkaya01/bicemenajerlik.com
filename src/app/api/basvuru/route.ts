import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { sendApplicationEmail } from "@/lib/email";
import { buildWhatsAppMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n/translations";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const age = formData.get("age") as string;
    const city = formData.get("city") as string;
    const height = formData.get("height") as string;
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
      !height ||
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
      height: Number(height),
      experienceArea,
      experience,
      phone,
      deliveryMethod,
      submittedAt,
    };

    const uploadsDir = path.join(process.cwd(), "data", "applications");
    await mkdir(uploadsDir, { recursive: true });

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
      await writeFile(path.join(uploadsDir, photoFilename), photoBuffer);
    }

    const dataPath = path.join(uploadsDir, `${appId}.json`);
    await writeFile(dataPath, JSON.stringify(application, null, 2));

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
