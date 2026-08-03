import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public/images");
const logoPath = path.join(outDir, "bice-logo-gold.png");

const W = 1080;
const H = 2200;

const LOGO_W = 500;
const LOGO_TOP = 52;
/** Content starts below the logo block (extra gap for WhatsApp readability) */
const CONTENT_TOP = LOGO_TOP + Math.round(LOGO_W * (258 / 528)) + 56;

/** Match site tokens from src/app/globals.css */
const COLORS = {
  bg: "#0a0a0f",
  night: "#0f172a",
  gold: "#fbbf24",
  goldMid: "#f59e0b",
  goldLight: "#fcd34d",
  silver: "#cbd5e1",
  white: "#f8fafc",
  glassBorder: "rgba(251,191,36,0.15)",
  glassFill: "rgba(15,23,42,0.85)",
};

const HEADING =
  "Bice Menajerlik Ailesine, Yeni Çalışma Arkadaşlarımıza ve Kıymetli İş Ortaklarımıza";

const PARAGRAPHS = [
  "Bice Menajerlik olarak bizler, yalnızca bir ajans değil; güveni, dürüstlüğü ve profesyonelliği ilke edinmiş büyük bir aileyiz.",
  "Sektördeki varlık sebebimiz; emeğiyle değer üreten çalışma arkadaşlarımız ve bu emeğe saygı duyan kıymetli iş ortaklarımızdır. Bizim için en önemli öncelik, her zaman sizlerin huzurlu, güvenli ve saygı çerçevesinde çalışabileceği ortamlar oluşturmaktır.",
  "Birlikte attığımız her adım, yalnızca bir iş ortaklığını değil; karşılıklı güveni, saygıyı ve uzun vadeli dayanışmayı temsil etmektedir. Mekanlarla yaşadığımız tüm fikir ayrılıklarının tek nedeni, çalışma arkadaşlarımızın haklarını korumak ve dürüst iş ortaklarımızın kalite standartlarını tavizsiz şekilde savunmaktır.",
  "Hayata geçireceğimiz Türkiye genelini kapsayan web sitesi de bu vizyonun en önemli parçalarından biridir. Bu platform sayesinde çalışma arkadaşlarımız güvenilir mekanları daha kolay ayırt edebilecek, işini dürüst ve profesyonel yapan işletmeler ise hak ettikleri değeri görerek kalite standartlarını daha güçlü şekilde ortaya koyabilecektir.",
  "Bizim için hiçbir maddi kazanç; çalışma arkadaşlarımızın huzurundan, güvenliğinden ve iş ortaklarımızla kurduğumuz karşılıklı güvenden daha değerli değildir.",
  "Bu vizyonu paylaşan, emeğiyle ailemizi büyüten ve bize güvenen tüm çalışma arkadaşlarımıza ve kıymetli iş ortaklarımıza gönülden teşekkür ediyoruz.",
];

const CLOSING = [
  "İyi ki bu yolculukta bizimlesiniz.",
  "Birlikte daha güvenli, daha güçlü ve daha saygın bir sektör inşa edeceğimize yürekten inanıyoruz.",
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** Approximate wrap for Arial/Helvetica at given fontSize. */
function wrapText(text, maxWidthPx, fontSize) {
  const avgChar = fontSize * 0.52;
  const maxChars = Math.floor(maxWidthPx / avgChar);
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function textBlock(lines, { x, y, fontSize, fill, fontWeight = "400", lineHeight = 1.45, letterSpacing = 0 }) {
  const lh = fontSize * lineHeight;
  return lines
    .map((line, i) => {
      const yy = y + i * lh;
      return `<text x="${x}" y="${yy}" text-anchor="middle" font-family="Arial, Helvetica, 'Segoe UI', sans-serif" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fill}" letter-spacing="${letterSpacing}">${escapeXml(line)}</text>`;
    })
    .join("\n");
}

function buildSvg() {
  const marginX = 70;
  const contentWidth = W - marginX * 2;
  const cx = W / 2;

  const bodySize = 29;
  const headingSize = 32;
  const closingSize = 29;
  const bodyLh = 1.4;
  const paraGap = 22;

  let y = CONTENT_TOP;
  const chunks = [];

  const headingLines = wrapText(HEADING, contentWidth - 20, headingSize);
  chunks.push(
    textBlock(headingLines, {
      x: cx,
      y,
      fontSize: headingSize,
      fill: COLORS.white,
      fontWeight: "600",
      lineHeight: 1.4,
    }),
  );
  y += headingLines.length * headingSize * 1.4 + paraGap + 4;

  for (const para of PARAGRAPHS) {
    const lines = wrapText(para, contentWidth, bodySize);
    chunks.push(
      textBlock(lines, {
        x: cx,
        y,
        fontSize: bodySize,
        fill: COLORS.silver,
        lineHeight: bodyLh,
      }),
    );
    y += lines.length * bodySize * bodyLh + paraGap;
  }

  y += 2;
  for (const line of CLOSING) {
    const lines = wrapText(line, contentWidth, closingSize);
    chunks.push(
      textBlock(lines, {
        x: cx,
        y,
        fontSize: closingSize,
        fill: COLORS.goldLight,
        fontWeight: "500",
        lineHeight: 1.45,
      }),
    );
    y += lines.length * closingSize * 1.45 + 8;
  }

  const footerY = Math.max(y + 40, H - 180);

  const noise = Array.from({ length: 80 }, (_, i) => {
    const nx = ((i * 137) % (W - 40)) + 20;
    const ny = ((i * 97) % (H - 40)) + 20;
    const o = 0.03 + (i % 5) * 0.01;
    return `<circle cx="${nx}" cy="${ny}" r="1" fill="#ffffff" opacity="${o}"/>`;
  }).join("");

  const logoH = Math.round(LOGO_W * (258 / 528));
  const logoLeft = Math.round((W - LOGO_W) / 2);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${COLORS.bg}"/>
      <stop offset="55%" stop-color="${COLORS.night}"/>
      <stop offset="100%" stop-color="${COLORS.bg}"/>
    </linearGradient>
    <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${COLORS.gold}"/>
      <stop offset="50%" stop-color="${COLORS.goldMid}"/>
      <stop offset="100%" stop-color="${COLORS.goldLight}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="18%" r="55%">
      <stop offset="0%" stop-color="${COLORS.gold}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="${COLORS.bg}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  ${noise}

  <!-- Double gold border (site gold gradient) -->
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="url(#goldStroke)" stroke-width="1.5" opacity="0.75"/>
  <rect x="38" y="38" width="${W - 76}" height="${H - 76}" fill="none" stroke="${COLORS.gold}" stroke-width="2" opacity="0.9"/>

  <!-- Glass logo plate -->
  <rect x="${logoLeft - 16}" y="${LOGO_TOP - 8}" width="${LOGO_W + 32}" height="${logoH + 16}" rx="12" fill="${COLORS.glassFill}" stroke="${COLORS.glassBorder}" stroke-width="1.5"/>

  ${chunks.join("\n")}

  <line x1="120" y1="${footerY}" x2="${W - 120}" y2="${footerY}" stroke="url(#goldStroke)" stroke-width="1.2" opacity="0.85"/>

  <g transform="translate(0, ${footerY + 22})">
    <g transform="translate(${cx - 272}, 2)" fill="none" stroke="${COLORS.gold}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="0" width="11" height="18" rx="2"/>
      <circle cx="7.5" cy="14.5" r="0.8" fill="${COLORS.gold}" stroke="none"/>
    </g>
    <text x="${cx - 270}" y="18" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="${COLORS.silver}">İletişim: +90 530 373 39 89</text>
    <text x="${cx + 12}" y="18" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="${COLORS.gold}">|</text>
    <g transform="translate(${cx + 30}, 3)" fill="none" stroke="${COLORS.gold}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <rect x="0" y="2" width="16" height="12" rx="1.5"/>
      <path d="M0 4 L8 10 L16 4"/>
    </g>
    <text x="${cx + 52}" y="18" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="${COLORS.silver}">bicemenajerliktr@gmail.com</text>
  </g>

  <g transform="translate(0, ${footerY + 58})">
    <g transform="translate(${cx - 118}, 0)" fill="none" stroke="${COLORS.goldLight}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 0 C4.7 0 2 2.7 2 6 c0 4.5 6 10 6 10 s6-5.5 6-10 c0-3.3-2.7-6-6-6z"/>
      <circle cx="8" cy="6" r="2"/>
    </g>
    <text x="${cx}" y="16" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="${COLORS.goldLight}">Türkiye Geneli Hizmet</text>
  </g>

  <g transform="translate(0, ${footerY + 96})">
    <g transform="translate(${cx - 224}, 1)" fill="none" stroke="${COLORS.gold}" stroke-width="1.5">
      <circle cx="8" cy="8" r="7"/>
      <ellipse cx="8" cy="8" rx="3.2" ry="7"/>
      <path d="M1 8h14 M8 1c2.2 2.2 2.2 11.8 0 14 M8 1c-2.2 2.2-2.2 11.8 0 14"/>
    </g>
    <text x="${cx - 96}" y="16" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="${COLORS.silver}">bicemenajerlik.com</text>
    <text x="${cx + 22}" y="16" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="${COLORS.gold}">|</text>
    <g transform="translate(${cx + 42}, 1)" fill="none" stroke="${COLORS.gold}" stroke-width="1.5">
      <circle cx="8" cy="8" r="7"/>
      <ellipse cx="8" cy="8" rx="3.2" ry="7"/>
      <path d="M1 8h14 M8 1c2.2 2.2 2.2 11.8 0 14 M8 1c-2.2 2.2-2.2 11.8 0 14"/>
    </g>
    <text x="${cx + 168}" y="16" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="${COLORS.silver}">konsburada.com</text>
  </g>

  <g fill="${COLORS.goldLight}" opacity="0.95">
    <polygon points="${W - 70},${H - 86} ${W - 67.5},${H - 79} ${W - 60},${H - 79} ${W - 66},${H - 75} ${W - 63.5},${H - 68} ${W - 70},${H - 72.5} ${W - 76.5},${H - 68} ${W - 74},${H - 75} ${W - 80},${H - 79} ${W - 72.5},${H - 79}"/>
    <polygon points="${W - 52},${H - 70} ${W - 50.5},${H - 66} ${W - 46},${H - 66} ${W - 49.5},${H - 63.5} ${W - 48},${H - 59.5} ${W - 52},${H - 62} ${W - 56},${H - 59.5} ${W - 54.5},${H - 63.5} ${W - 58},${H - 66} ${W - 53.5},${H - 66}" opacity="0.85"/>
    <polygon points="${W - 84},${H - 64} ${W - 83},${H - 61.5} ${W - 80},${H - 61.5} ${W - 82.5},${H - 60} ${W - 81.5},${H - 57.5} ${W - 84},${H - 59} ${W - 86.5},${H - 57.5} ${W - 85.5},${H - 60} ${W - 88},${H - 61.5} ${W - 85},${H - 61.5}" opacity="0.7"/>
  </g>
</svg>`;
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const logoH = Math.round(LOGO_W * (258 / 528));
  const logoLeft = Math.round((W - LOGO_W) / 2);

  const logoBuffer = await sharp(logoPath)
    .resize(LOGO_W, logoH, {
      fit: "contain",
      background: { r: 15, g: 23, b: 42, alpha: 1 },
    })
    .png()
    .toBuffer();

  const svg = Buffer.from(buildSvg());
  const outPath = path.join(outDir, "bice-duyuru-aile-ortaklar.png");

  await sharp(svg)
    .composite([{ input: logoBuffer, top: LOGO_TOP, left: logoLeft }])
    .png({ compressionLevel: 8 })
    .toFile(outPath);

  console.log(`Wrote ${outPath} (logo: ${LOGO_W}x${logoH} @ ${logoLeft},${LOGO_TOP})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
