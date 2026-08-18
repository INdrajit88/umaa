import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "umaa (উমা) | Durga Puja 2026 Countdown & Music Experience";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0E",
          backgroundImage:
            "radial-gradient(circle at 50% 30%, #3D1C06 0%, #150A04 45%, #050508 100%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          padding: "60px 40px",
        }}
      >
        {/* Subtle Decorative Golden Border */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            borderRadius: "32px",
            border: "2px solid rgba(255, 209, 102, 0.25)",
            pointerEvents: "none",
          }}
        />

        {/* Brand Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 24px",
            borderRadius: "9999px",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#34D399",
            }}
          />
          <span
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              letterSpacing: "0.15em",
              color: "#FFFFFF",
              textTransform: "uppercase",
            }}
          >
            umaa • শারদোৎসব ২০২৬
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: "80px",
            fontWeight: "900",
            color: "#FFD166",
            marginBottom: "12px",
            textAlign: "center",
            letterSpacing: "-0.02em",
            textShadow: "0 4px 24px rgba(255, 209, 102, 0.4)",
          }}
        >
          মা আসছেন
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "32px",
            color: "#E2E8F0",
            marginBottom: "36px",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          ঢাকের তালে, কাশফুলের হাওয়ায়
        </div>

        {/* Highlights Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginTop: "8px",
          }}
        >
          <div
            style={{
              padding: "10px 24px",
              borderRadius: "16px",
              backgroundColor: "rgba(255, 209, 102, 0.12)",
              border: "1px solid rgba(255, 209, 102, 0.3)",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#FFD166",
            }}
          >
            ⏳ Live Countdown
          </div>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: "16px",
              backgroundColor: "rgba(52, 211, 153, 0.12)",
              border: "1px solid rgba(52, 211, 153, 0.3)",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#34D399",
            }}
          >
            🎵 17 Curated Pujo Songs
          </div>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#F8FAFC",
            }}
          >
            ✨ umaa.tech
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
