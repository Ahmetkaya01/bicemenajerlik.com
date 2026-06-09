import type { Metadata } from "next";
import { contactMetadata } from "@/lib/metadata";
import { ContactContent } from "@/components/pages/ContactContent";

export const metadata: Metadata = contactMetadata;

export default function ContactPage() {
  return <ContactContent />;
}
