import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont() {
  const fontPath = path.join(process.cwd(), "node_modules/@fontsource/vazirmatn/files/vazirmatn-arabic-700-normal.woff");
  return fs.readFile(fontPath);
}

export default async function OpengraphImage() {
  const fontData = await loadFont();
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
          background: "linear-gradient(135deg, #0c4a6e 0%, #0284c7 60%, #38bdf8 100%)",
          color: "white",
          fontFamily: "Vazirmatn",
        }}
      >
        <div style={{ fontSize: 88, display: "flex" }}>یکاسنج</div>
        <div style={{ fontSize: 32, marginTop: 20, opacity: 0.9, display: "flex" }}>مبدل آنی یکاهای فیزیک</div>
      </div>
    ),
    { ...size, fonts: [{ name: "Vazirmatn", data: fontData, weight: 700, style: "normal" }] },
  );
}
