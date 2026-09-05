import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

async function loadFont() {
  const fontPath = path.join(process.cwd(), "node_modules/@fontsource/vazirmatn/files/vazirmatn-arabic-700-normal.woff");
  return fs.readFile(fontPath);
}

export default async function Icon() {
  const fontData = await loadFont();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0284c7",
          borderRadius: 7,
          color: "white",
          fontSize: 20,
          fontFamily: "Vazirmatn",
        }}
      >
        ی
      </div>
    ),
    { ...size, fonts: [{ name: "Vazirmatn", data: fontData, weight: 700, style: "normal" }] },
  );
}
