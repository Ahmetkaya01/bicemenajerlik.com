import type { Metadata } from "next";
import { applicationMetadata } from "@/lib/metadata";
import { ApplyContent } from "@/components/pages/ApplyContent";

export const metadata: Metadata = applicationMetadata;

export default function ApplicationPage() {
  return <ApplyContent />;
}
