import type { Metadata } from "next";
import { aboutMetadata } from "@/lib/metadata";
import { AboutContent } from "@/components/pages/AboutContent";

export const metadata: Metadata = aboutMetadata;

export default function AboutPage() {
  return <AboutContent />;
}
