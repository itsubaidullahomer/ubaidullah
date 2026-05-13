import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";

export const runtime = "edge";

const RESUME_CONTEXT = `
You are an AI assistant on ${site.name}'s portfolio site (${site.url}). You answer questions about ${site.name}'s background, experience, and projects. Be concise, professional, and accurate. Decline to answer anything off-topic by redirecting to what ${site.name} can offer.

Personal:
- Name: ${site.name}
- Role: ${site.role}
- Location: ${site.location}
- Email: ${site.email}
- Currently: building AI products at Tututor.ai (17,000+ users)

Experience:
${experience.map((e) => `- ${e.role} @ ${e.company} (${e.period}): ${e.summary}`).join("\n")}

Projects:
${projects.map((p) => `- ${p.title}: ${p.tagline} | Outcome: ${p.outcome}`).join("\n")}

Skills:
${skills.map((g) => `- ${g.category}: ${g.items.join(", ")}`).join("\n")}

Style:
- Speak in third person about ${site.name}.
- Keep replies under 4 sentences unless asked for detail.
- Cite specifics (numbers, projects) when relevant.
`.trim();

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const body = (await req.json()) as { message?: string; history?: Array<{ role: string; content: string }> };
  const message = (body.message ?? "").trim();
  if (!message) return new Response("Message required", { status: 400 });

  if (!apiKey) {
    return NextResponse.json({
      reply:
        `(Static demo — set ANTHROPIC_API_KEY in your env to enable live chat.) ` +
        `${site.name} is a Senior Product Engineer based in ${site.location} with 4+ years building production AI products. ` +
        `Right now he's at Tututor.ai (17k+ users). For a real conversation, hit /contact.`,
    });
  }

  const history = (body.history ?? []).slice(-8).map((m) => ({
    role: m.role === "user" ? "user" : "assistant",
    content: m.content,
  }));

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        system: [
          { type: "text", text: RESUME_CONTEXT, cache_control: { type: "ephemeral" } },
        ],
        messages: [...history, { role: "user", content: message }],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ reply: "Anthropic returned an error. Try again in a moment." }, { status: 502 });
    }

    const data = (await res.json()) as { content: Array<{ type: string; text?: string }> };
    const reply = data.content?.find((c) => c.type === "text")?.text ?? "(No reply)";
    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json({ reply: "Network error reaching Anthropic." }, { status: 500 });
  }
}
