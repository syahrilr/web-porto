import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: 80, background: "#0f172a" }}>
        <div style={{ fontSize: 72, fontWeight: 700, color: "#e2e8f0" }}>{profile.name}</div>
        <div style={{ fontSize: 40, color: "#5eead4", marginTop: 16 }}>{profile.role}</div>
        <div style={{ fontSize: 30, color: "#94a3b8", marginTop: 32, maxWidth: 900 }}>{profile.tagline}</div>
      </div>
    ),
    size,
  );
}
