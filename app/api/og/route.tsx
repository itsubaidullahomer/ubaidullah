import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? site.name;
  const subtitle = searchParams.get("subtitle") ?? site.role;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#07080c",
        backgroundImage:
          "linear-gradient(rgba(242,241,236,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(242,241,236,0.06) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        color: "#f2f1ec",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 18,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#9a9ba5",
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: 999, background: "#4fe3a3" }} />
        <div>{site.name}</div>
        <div style={{ marginLeft: "auto", color: "#5d5e69" }}>itsubaidullahomer.com</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            fontSize: 84,
            lineHeight: 1,
            letterSpacing: "-0.035em",
            fontWeight: 500,
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 28, color: "#9a9ba5", display: "flex", maxWidth: 900 }}>
          {subtitle}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 16,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#5d5e69",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 2, background: "#ff4d1c" }} />
          {site.role} · {site.availability}
        </div>
        <div>{site.location}</div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
