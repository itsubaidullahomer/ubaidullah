import type { Project } from "../types";

export const nobukoJapan: Project = {
  slug: "nobuko-japan",
  title: "Nobuko Japan",
  tagline:
    "Multi-provider AI voice agent and live supervision platform for a Tokyo-based used-vehicle exporter.",
  role: "AI Voice Agent Developer & Full-Stack Engineer",
  company: "Nobuko Japan",
  period: "Mar 2026 — Present",
  status: "in-progress",
  featured: true,
  cover: "/work/nobuko-cover.svg",
  accent: "#FF6B6B",

  summary:
    "Nobuko Japan is a Tokyo-based used-vehicle exporter shipping to the UK, Ireland, Cyprus, and Pakistan. The existing team maintains the legacy CRM; I own AI and automation end-to-end — frontend, backend, infra, and the model-routing decisions in between. Currently in demo phase, validating before the full production rollout.",

  problem:
    "Sales calls were a bottleneck. A small team couldn't reach enough prospects, every call quality depended on which agent picked up, and there was no systematic way to learn from what went well or badly. They needed AI that could make outbound calls at scale, with human agents supervising in real time and a complete audit trail of every interaction.",

  approach:
    "Built a pluggable voice agent architecture where any voice model can be swapped in. Currently runs Gemini Live as one pipeline and a custom pipeline I built combining ElevenLabs TTS with separate transcription models. Users pick the model, the voice, and bring their own API keys — so when a better model launches, we can A/B test it in minutes instead of rewriting the system. On top of that, human agents can listen to live calls, see the streaming transcript, inject context from a sidebar to steer the AI mid-call, or take over entirely. Campaigns import contacts from Excel and launch outbound calls at scale through the company's SIP server.",

  outcome:
    "Demo platform handling outbound calling, live supervision, and full audit trails for every interaction. Every call's audio, transcript, exact prompt used, supervisor actions, and QA reviews are stored — mistakes get flagged and fed back into prompt improvements. The provider-agnostic design means the platform stays competitive as the voice AI landscape shifts every few months.",

  metrics: [
    { value: "2+", label: "Voice pipelines", detail: "Gemini Live + custom ElevenLabs + STT pipeline" },
    { value: "1", label: "Engineer", detail: "owning AI, automation, frontend & backend" },
    { value: "100%", label: "Audit coverage", detail: "audio, transcript, prompt, supervisor actions" },
    { value: "4", label: "Export markets", detail: "UK, Ireland, Cyprus, Pakistan" },
  ],

  responsibilities: [
    "Designed a pluggable multi-provider voice agent — any voice model can be swapped in; users pick model, voice, and bring their own API keys.",
    "Built a custom voice pipeline combining ElevenLabs TTS with separate transcription models, alongside the Gemini Live pipeline.",
    "Implemented live agent supervision — human agents hear AI calls in real time, see live transcripts, inject context to steer the AI mid-call, or take over.",
    "Built the campaign system — sales agents import contacts from Excel, build outbound campaigns, and launch via the company's SIP server.",
    "Designed the audit-trail data model so every call is reproducible: audio, transcript, exact prompt, supervisor actions, and QA review.",
  ],

  stack: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "WebSockets",
    "SIP",
    "Gemini Live",
    "ElevenLabs",
    "STT / TTS",
    "Prompt engineering",
  ],

  architecture: {
    nodes: [
      { id: "sales",      label: "Sales agent",       kind: "client",   x: 8,  y: 25 },
      { id: "supervisor", label: "Supervisor",        kind: "client",   x: 8,  y: 75 },
      { id: "web",        label: "React Web App",     kind: "service",  x: 28, y: 50 },
      { id: "api",        label: "Express API",       kind: "service",  x: 48, y: 78 },
      { id: "voice",      label: "Voice Orchestrator", kind: "ai",      x: 48, y: 28 },
      { id: "gemini",     label: "Gemini Live",       kind: "external", x: 72, y: 12 },
      { id: "eleven",     label: "ElevenLabs + STT",  kind: "external", x: 72, y: 38 },
      { id: "sip",        label: "SIP Server",        kind: "service",  x: 72, y: 65 },
      { id: "mongo",      label: "MongoDB",           kind: "data",     x: 72, y: 88 },
      { id: "prospect",   label: "Prospect",          kind: "external", x: 94, y: 65 },
    ],
    edges: [
      { from: "sales",      to: "web" },
      { from: "supervisor", to: "web", label: "live supervise" },
      { from: "web",        to: "voice", label: "stream" },
      { from: "web",        to: "api" },
      { from: "voice",      to: "gemini" },
      { from: "voice",      to: "eleven" },
      { from: "voice",      to: "sip" },
      { from: "sip",        to: "prospect" },
      { from: "voice",      to: "mongo", label: "audit" },
      { from: "api",        to: "mongo" },
    ],
  },
};
