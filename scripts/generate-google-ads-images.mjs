import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public/images/google-ads");

const BRAND = {
  bgDark: "#0a0a0f",
  bgNight: "#0f172a",
  gold: "#fbbf24",
  goldLight: "#fcd34d",
  white: "#f8fafc",
  muted: "#cbd5e1",
};

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function overlaySvg({ width, height, lines, subtitle, badge }) {
  const centerX = width / 2;
  const titleSize = width >= 1000 ? 54 : 44;
  const subtitleSize = width >= 1000 ? 28 : 24;
  const lineHeight = titleSize + 12;

  const titleYStart =
    height / 2 - ((lines.length - 1) * lineHeight) / 2 - (subtitle ? 24 : 0);

  const titleNodes = lines
    .map((line, index) => {
      const y = titleYStart + index * lineHeight;
      return `<text x="${centerX}" y="${y}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${titleSize}" font-weight="700" fill="${BRAND.gold}">${escapeXml(line)}</text>`;
    })
    .join("\n");

  const subtitleNode = subtitle
    ? `<text x="${centerX}" y="${titleYStart + lines.length * lineHeight + 18}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${subtitleSize}" fill="${BRAND.muted}">${escapeXml(subtitle)}</text>`
    : "";

  const badgeNode = badge
    ? `<rect x="${centerX - 180}" y="36" width="360" height="42" rx="21" fill="rgba(251,191,36,0.15)" stroke="${BRAND.gold}" stroke-width="2"/>
       <text x="${centerX}" y="64" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="${BRAND.goldLight}">${escapeXml(badge)}</text>`
    : "";

  const brandNode = `<text x="${centerX}" y="${height - 42}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="22" letter-spacing="4" fill="${BRAND.goldLight}">BİCE MENAJERLİK</text>`;

  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${BRAND.bgDark}" stop-opacity="0.88"/>
          <stop offset="100%" stop-color="${BRAND.bgNight}" stop-opacity="0.92"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stop-color="${BRAND.gold}" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="${BRAND.bgDark}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect width="100%" height="100%" fill="url(#glow)"/>
      ${badgeNode}
      ${titleNodes}
      ${subtitleNode}
      ${brandNode}
    </svg>
  `);
}

async function createFromPhoto(source, output, width, height, content) {
  const resized = await sharp(path.join(root, source))
    .resize(width, height, { fit: "cover", position: "center" })
    .toBuffer();

  const overlay = overlaySvg({ width, height, ...content });

  await sharp(resized)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(output);
}

async function createGradient(output, width, height, content) {
  const gradient = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="base" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${BRAND.bgDark}"/>
          <stop offset="50%" stop-color="${BRAND.bgNight}"/>
          <stop offset="100%" stop-color="#111827"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#base)"/>
    </svg>
  `);

  const overlay = overlaySvg({ width, height, ...content });

  await sharp(gradient)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(output);
}

const assets = [
  // 4 yatay (1.91:1) — 1200×628
  {
    file: "landscape-kons-ilanlari.jpg",
    width: 1200,
    height: 628,
    type: "photo",
    source: "public/images/kons-banner.jpg",
    content: {
      badge: "GÜVENİLİR MENAJERLİK AJANSI",
      lines: ["Kons Bayan İş İlanları"],
      subtitle: "Günlük ödeme · Yatılı konaklama · 58 il",
    },
  },
  {
    file: "landscape-gunluk-odeme.jpg",
    width: 1200,
    height: 628,
    type: "photo",
    source: "public/images/hero.jpg",
    content: {
      badge: "HEMEN BAŞVUR",
      lines: ["Günlük Ödeme", "Yatılı Konaklama"],
      subtitle: "Aylık 7.000 - 12.000 TL kazanç imkanı",
    },
  },
  {
    file: "landscape-58-il.jpg",
    width: 1200,
    height: 628,
    type: "gradient",
    content: {
      badge: "2015'TEN BERİ",
      lines: ["58 İlde İş İmkanı"],
      subtitle: "İstanbul · Ankara · İzmir · Samsun · Tokat",
    },
  },
  {
    file: "landscape-gazino-pavyon.jpg",
    width: 1200,
    height: 628,
    type: "photo",
    source: "public/images/about.jpg",
    content: {
      badge: "RESMİ MENAJERLİK",
      lines: ["Gazino & Pavyon İlanları"],
      subtitle: "Gece kulübü · Kons · Solist · Garson",
    },
  },
  // 4 kare (1:1) — 1200×1200
  {
    file: "square-hemen-basvur.jpg",
    width: 1200,
    height: 1200,
    type: "gradient",
    content: {
      badge: "RESMİ AJANS",
      lines: ["Hemen", "Başvur"],
      subtitle: "24 saat içinde dönüş garantisi",
    },
  },
  {
    file: "square-guven.jpg",
    width: 1200,
    height: 1200,
    type: "photo",
    source: "public/images/about.jpg",
    content: {
      badge: "10 YIL GÜVEN",
      lines: ["Güvenilir", "Menajerlik"],
      subtitle: "2500+ başarılı yerleştirme",
    },
  },
  {
    file: "square-maas.jpg",
    width: 1200,
    height: 1200,
    type: "gradient",
    content: {
      badge: "YÜKSEK KAZANÇ",
      lines: ["7.000-12.000 TL"],
      subtitle: "Günlük ödeme · Yatılı konaklama",
    },
  },
  {
    file: "square-kons-bayan.jpg",
    width: 1200,
    height: 1200,
    type: "photo",
    source: "public/images/kons-banner.jpg",
    content: {
      badge: "BAYAN KONS",
      lines: ["İş İlanları"],
      subtitle: "Gizlilik garantili · WhatsApp başvuru",
    },
  },
  // 2 dikey (4:5) — 960×1200
  {
    file: "portrait-gunluk-odeme.jpg",
    width: 960,
    height: 1200,
    type: "photo",
    source: "public/images/hero.jpg",
    content: {
      badge: "GÜNLÜK ÖDEME",
      lines: ["7.000-12.000 TL", "Yatılı Konaklama"],
      subtitle: "Kons bayan iş ilanları · Bice Menajerlik",
    },
  },
  {
    file: "portrait-whatsapp-basvur.jpg",
    width: 960,
    height: 1200,
    type: "gradient",
    content: {
      badge: "GİZLİLİK GARANTİLİ",
      lines: ["WhatsApp'tan", "Hemen Başvur"],
      subtitle: "Kons · Gazino · Pavyon · Gece kulübü",
    },
  },
];

await mkdir(outDir, { recursive: true });

const manifest = [];

for (const asset of assets) {
  const output = path.join(outDir, asset.file);

  if (asset.type === "photo") {
    await createFromPhoto(
      asset.source,
      output,
      asset.width,
      asset.height,
      asset.content,
    );
  } else {
    await createGradient(output, asset.width, asset.height, asset.content);
  }

  const meta = await sharp(output).metadata();
  manifest.push({
    file: asset.file,
    width: meta.width,
    height: meta.height,
    ratio: (meta.width / meta.height).toFixed(2),
    path: `/images/google-ads/${asset.file}`,
  });

  console.log(`✓ ${asset.file} (${meta.width}x${meta.height})`);
}

await writeFile(
  path.join(outDir, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);

console.log(`\nCreated ${assets.length} images in public/images/google-ads/`);
