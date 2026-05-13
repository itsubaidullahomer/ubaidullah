"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What's his React experience?",
  "Has he shipped AI to real users?",
  "Tell me about Tututor.ai.",
  "What's he best at?",
];

export function AskResume() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: messages }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply ?? "(No reply)" }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Network error. Try again." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="glass relative overflow-hidden rounded-[var(--radius-glass)]">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-accent text-[var(--accent-fg)]">
          <Sparkles className="h-4 w-4" strokeWidth={2} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-fg">Ask my resume</div>
          <div className="text-xs text-fg-muted">Powered by Claude · cached system prompt</div>
        </div>
        <div className="hidden items-center gap-1.5 text-[11px] text-fg-subtle md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Live
        </div>
      </div>

      <div ref={scrollRef} className="h-[400px] space-y-4 overflow-y-auto px-5 py-5">
        {messages.length === 0 && (
          <div className="space-y-4">
            <p className="text-sm text-fg-muted leading-relaxed">
              Ask anything about Ubaidullah's experience, projects, or skills. The system prompt is cached, so replies are fast and cheap.
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-fg-muted transition-all hover:border-fg-muted hover:text-fg"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "flex",
              m.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-accent text-[var(--accent-fg)]"
                  : "border border-border bg-[var(--glass-tint)] text-fg",
              )}
            >
              {m.content}
            </div>
          </div>
        ))}
        {busy && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-border bg-[var(--glass-tint)] px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fg-muted" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fg-muted" style={{ animationDelay: "0.15s" }} />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fg-muted" style={{ animationDelay: "0.3s" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-3 border-t border-border px-5 py-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything…"
          className="w-full bg-transparent text-sm text-fg placeholder:text-fg-subtle focus:outline-none"
          disabled={busy}
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="grid h-8 w-8 place-items-center rounded-full bg-accent text-[var(--accent-fg)] transition-opacity disabled:opacity-40"
          aria-label="Send message"
        >
          <Send className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </form>
    </div>
  );
}
