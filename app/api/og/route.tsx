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
        padding: "80px",
        background: "#08080B",
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(75, 107, 251, 0.35), transparent 50%), radial-gradient(circle at 80% 80%, rgba(184, 84, 251, 0.3), transparent 55%), radial-gradient(circle at 60% 30%, rgba(84, 251, 229, 0.2), transparent 50%)",
        color: "#F5F5F7",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <img
          src={new URL("/images/avatar.png", req.url).toString()}
          width={48}
          height={48}
          style={{ borderRadius: 999 }}
          alt=""
        />
        <div style={{ fontSize: 24, opacity: 0.7 }}>{site.name}</div>
        <div style={{ marginLeft: "auto", fontSize: 18, opacity: 0.5 }}>itsubaidullahomer.com</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 80,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            fontWeight: 500,
            maxWidth: 980,
            display: "flex",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 28, opacity: 0.6, display: "flex" }}>{subtitle}</div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 16,
          opacity: 0.45,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "#C7F284",
          }}
        />
        Senior Product Engineer · Available for select work
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
