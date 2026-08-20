#!/usr/bin/env node
/**
 * Kampanya 23991328696 optimizasyon paketini yazdırır.
 * Kullanım: node scripts/print-google-ads-optimization.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(
  readFileSync(
    path.join(root, "scripts/google-ads-campaign-23991328696.json"),
    "utf8",
  ),
);

console.log("═".repeat(60));
console.log(`Kampanya ID: ${data.campaignId}`);
console.log(`Hedef: Reklam gücü MÜKEMMEL · Optimizasyon skoru 100`);
console.log("═".repeat(60));

console.log("\n▶ BAŞLIKLAR (15 adet — hepsini Ads'e yapıştırın)\n");
data.headlines.forEach((h, i) => console.log(`${String(i + 1).padStart(2, "0")}. ${h}`));

console.log("\n▶ AÇIKLAMALAR (4 adet)\n");
data.descriptions.forEach((d, i) => console.log(`${i + 1}. ${d}`));

console.log("\n▶ SİTE BAĞLANTILARI\n");
for (const s of data.sitelinks) {
  console.log(`• ${s.text} → ${s.url}`);
  console.log(`  ${s.description1} | ${s.description2}`);
}

console.log("\n▶ CALLOUT'LAR\n");
console.log(data.callouts.join(" · "));

console.log("\n▶ YAPILANDIRILMIŞ SNIPPET\n");
console.log(`${data.structuredSnippets.header}: ${data.structuredSnippets.values.join(", ")}`);

console.log("\n▶ GÖRSEL / VİDEO (Ads → Varlıklar → Yükle)\n");
for (const img of data.imageAssets) console.log(`  ${img}`);
for (const vid of data.videoAssets) console.log(`  ${vid}`);

console.log("\n▶ NEGATİF ANAHTAR KELİMELER\n");
console.log(data.negativeKeywords.join(", "));

console.log("\n▶ OPTİMİZASYON SKORU 100 İÇİN\n");
for (const item of data.optimizationScoreActions) {
  const tag = item.action === "APPLY" ? "✓ UYGULA" : "✗ REDDET";
  console.log(`${tag} [${item.impact}] ${item.recommendation}`);
}

console.log("\n▶ VERCEL ENV (dönüşüm izleme — kritik)\n");
for (const [key, hint] of Object.entries(data.vercelEnvRequired)) {
  console.log(`${key}=${hint.startsWith("AW-") ? hint : `<${hint}>`}`);
}

console.log("\n" + "═".repeat(60));
console.log("Final URL:", data.finalUrl);
console.log("═".repeat(60));
