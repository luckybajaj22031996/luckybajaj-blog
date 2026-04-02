import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lucky Bajaj — Stories about small beautiful things";
export const size = { width: 1200, height: 630 };
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
          backgroundColor: "#FAFAFA",
          fontFamily: "Courier New, monospace",
        }}
      >
        {/* Vermillion circle */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            backgroundColor: "#E63920",
            marginBottom: 48,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#171717",
            letterSpacing: "-0.01em",
            marginBottom: 16,
          }}
        >
          Lucky Bajaj
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 20,
            color: "#737373",
            letterSpacing: "0.05em",
          }}
        >
          Stories about small beautiful things
        </div>
      </div>
    ),
    { ...size }
  );
}
