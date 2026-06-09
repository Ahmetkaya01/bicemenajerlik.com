import { ImageResponse } from "next/og";

export const alt =
  "Bice Menajerlik | Güvenilir Organizasyon Kadrosu ve Menajerlik Hizmeti";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a1520 50%, #0f0a14 100%)",
          color: "#f5f0e8",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.35em",
            color: "#c9a227",
            marginBottom: 24,
            fontWeight: 700,
          }}
        >
          BICE MENAJERLİK
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 900,
            marginBottom: 28,
          }}
        >
          Güvenilir Organizasyon Kadrosu ile Menajerlik Hizmeti
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#a8a29e",
            maxWidth: 820,
            lineHeight: 1.4,
          }}
        >
          58 ilde Gazino & Gece Kulübü personeli iş ilanları
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #c9a227, #e8d48b, #c9a227)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
