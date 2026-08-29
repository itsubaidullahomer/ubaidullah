"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  DatabaseZap,
  Gauge,
  HeartPulse,
  ShieldAlert,
  Skull,
  Timer,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/cn";

/* ────────────────────────────────────────────────────────────────────
   The Failure Lab — a deterministic, fully client-side simulation of
   the resilience patterns behind production LLM features: streaming,
   retry with backoff, provider failover with checkpointed resume,
   latency budgets, and a cached last resort. No API keys involved;
   the point is the state machine, not the model.
   ──────────────────────────────────────────────────────────────────── */

type ProviderId = "openai" | "anthropic" | "google";
type ProviderStatus = "healthy" | "limited" | "down";

const PROVIDERS: Array<{ id: ProviderId; label: string; model: string; color: string }> = [
  { id: "openai", label: "OpenAI", model: "gpt-5.2", color: "#54FBE5" },
  { id: "anthropic", label: "Anthropic", model: "claude-sonnet-5", color: "#C7F284" },
  { id: "google", label: "Google", model: "gemini-3-flash", color: "#7AC5FF" },
];

const PROMPTS: Array<{ id: string; label: string; answer: string }> = [
  {
    id: "failover",
    label: "What happens when a provider dies mid-answer?",
    answer:
      "Press the red button and you'll find out. Every chunk of this answer gets written to state as it lands, so the text you're reading doesn't belong to the connection that produced it. If the provider dies halfway through, the client notices the stall, waits a moment, retries, and then hands the rest of the job to the next model in the chain, picking up from the last chunk that made it through. You get a small seam in the middle of a sentence instead of an error screen. Writing the part that streams tokens takes an afternoon. Writing the part that survives the four seconds where nothing streams is the actual work. So go ahead, kill me while I'm talking.",
  },
  {
    id: "why",
    label: "Why design for failure first?",
    answer:
      "Because with anything built on a model, failure isn't rare. Providers rate limit you on your best traffic day. Latency spikes at nine in the morning when thirty students in the same classroom open the same tutor. If you build the happy path first, every one of those becomes an incident you handle at night. If you build the failure path first, they turn into ordinary behavior: a retry nobody notices, a fallback model that sounds slightly different, a cached answer with a label on it. That's most of the reason teachers kept using Tututor. The app stayed usable on the days the model didn't.",
  },
  {
    id: "long",
    label: "Stream something long I can sabotage.",
    answer:
      "Happy to oblige. Here is a long one, so take your time with the controls on the right. A streaming pipeline has roughly three layers, and all of them can fail. There's the connection carrying the tokens, which usually doesn't throw an error so much as go quiet, so you end up watching for stalls rather than exceptions. There's the part that decides which provider gets the request, how long to wait, when to retry and when to stop trying, which should be boring and easy to read, and which is why it prints everything it does into the log below. And then there's what the person actually sees while all of that is going on: whether the page still responds, whether the half-finished answer survives, whether the fallback is labeled honestly or quietly pretends to be fresh. The first layer is the one everybody builds. The third is the one that gets improvised at midnight during an outage. Anyway, the red button is still there.",
  },
];

const CACHED_ANSWER =
  "Every provider is down, so this one comes from cache. It's older than it should be and it says so, which is still better than a spinner that never stops. Bring a provider back and ask again for a live answer.";

type Segment = { provider: ProviderId | "cache"; text: string; resumed: boolean };

type AssistantMsg = {
  id: number;
  role: "assistant";
  segments: Segment[];
  status: "connecting" | "streaming" | "done" | "cached";
  stats?: string;
};
type UserMsg = { id: number; role: "user"; text: string };
type Msg = UserMsg | AssistantMsg;

type LogLevel = "info" | "ok" | "warn" | "err" | "chaos";
type LogLine = { id: number; t: number; level: LogLevel; text: string };

type ProviderState = { status: ProviderStatus; cooldownUntil: number };

const TICK_MS = 90;
const BASE_TTFT = 700;
const COOLDOWN_MS = 8000;

let uid = 0;

export function FailureLab() {
  const [providers, setProviders] = useState<Record<ProviderId, ProviderState>>({
    openai: { status: "healthy", cooldownUntil: 0 },
    anthropic: { status: "healthy", cooldownUntil: 0 },
    google: { status: "healthy", cooldownUntil: 0 },
  });
  const [activeId, setActiveId] = useState<ProviderId | null>(null);
  const [transcript, setTranscript] = useState<Msg[]>([]);
  const [log, setLog] = useState<LogLine[]>([]);
  const [slow, setSlow] = useState(false);
  const [running, setRunning] = useState(false);
  const [metrics, setMetrics] = useState({ ttft: 0, tps: 0, tokens: 0, failovers: 0 });
  const [now, setNow] = useState(0);

  // Engine refs — the stream loop reads these to avoid stale closures.
  const providersRef = useRef(providers);
  const slowRef = useRef(false);
  const runningRef = useRef(false);
  const attemptSeq = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const emissionsRef = useRef<Array<{ t: number; n: number }>>([]);
  const startRef = useRef(0);
  const runStartRef = useRef(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startRef.current = performance.now();
    addLog("info", "lab online, 3 providers registered, all healthy");
    addLog("info", "pick a question, then try to break the stream");
    // Housekeeping: heal cooldowns, refresh tok/s + countdown displays.
    const h = setInterval(() => {
      const t = performance.now();
      setNow(t);
      const win = emissionsRef.current.filter((e) => t - e.t < 2000);
      emissionsRef.current = win;
      setMetrics((m) => ({ ...m, tps: Math.round(win.reduce((s, e) => s + e.n, 0) / 2) }));
      const cur = providersRef.current;
      (Object.keys(cur) as ProviderId[]).forEach((id) => {
        if (cur[id].status === "limited" && t > cur[id].cooldownUntil) {
          setProvider(id, { status: "healthy", cooldownUntil: 0 });
          addLog("ok", `${id}: rate-limit cooldown elapsed → healthy`);
        }
      });
    }, 400);
    return () => {
      clearInterval(h);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [transcript]);
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [log]);

  function setProvider(id: ProviderId, next: ProviderState) {
    providersRef.current = { ...providersRef.current, [id]: next };
    setProviders(providersRef.current);
  }

  function addLog(level: LogLevel, text: string) {
    const t = performance.now() - startRef.current;
    setLog((l) => [...l.slice(-160), { id: uid++, t, level, text }]);
  }

  const firstHealthy = useCallback((after?: ProviderId): ProviderId | null => {
    const order = PROVIDERS.map((p) => p.id);
    const start = after ? order.indexOf(after) + 1 : 0;
    for (let i = start; i < order.length; i++) {
      if (providersRef.current[order[i]].status === "healthy") return order[i];
    }
    return null;
  }, []);

  function patchAssistant(id: number, patch: (m: AssistantMsg) => AssistantMsg) {
    setTranscript((tr) => tr.map((m) => (m.role === "assistant" && m.id === id ? patch(m) : m)));
  }

  /* ── Run lifecycle ─────────────────────────────────────────────── */

  function ask(promptId: string) {
    if (runningRef.current) return;
    const prompt = PROMPTS.find((p) => p.id === promptId);
    if (!prompt) return;
    const words = prompt.answer.split(" ");
    const msgId = uid++;
    setTranscript((tr) => [
      ...tr.slice(-6),
      { id: uid++, role: "user", text: prompt.label },
      { id: msgId, role: "assistant", segments: [], status: "connecting" },
    ]);
    runningRef.current = true;
    setRunning(true);
    runStartRef.current = performance.now();
    setMetrics({ ttft: 0, tps: 0, tokens: 0, failovers: 0 });
    const provider = firstHealthy();
    if (!provider) {
      serveCached(msgId);
      return;
    }
    addLog("info", `request accepted → routing to ${provider}`);
    attempt(msgId, words, provider, 0, 0);
  }

  function attempt(
    msgId: number,
    words: string[],
    provider: ProviderId,
    offset: number,
    failovers: number,
  ) {
    const my = ++attemptSeq.current;
    setActiveId(provider);
    const model = PROVIDERS.find((p) => p.id === provider)!.model;
    patchAssistant(msgId, (m) => ({ ...m, status: "connecting" }));
    addLog(
      "info",
      `${provider}: opening stream (${model})${offset ? ` from token ${offset}` : ""}`,
    );

    const ttft = (BASE_TTFT + Math.random() * 400) * (slowRef.current ? 3.5 : 1);
    const t0 = performance.now();

    timerRef.current = setTimeout(() => {
      if (my !== attemptSeq.current) return;
      // Provider may have been killed while connecting.
      if (providersRef.current[provider].status !== "healthy") {
        failFrom(msgId, words, provider, offset, failovers, "connection refused");
        return;
      }
      const measured = Math.round(performance.now() - t0);
      setMetrics((m) => ({ ...m, ttft: measured, failovers }));
      addLog(
        measured > 1800 ? "warn" : "ok",
        `${provider}: first token in ${measured}ms${measured > 1800 ? " (over latency budget)" : ""}`,
      );
      patchAssistant(msgId, (m) => ({
        ...m,
        status: "streaming",
        segments: [...m.segments, { provider, text: "", resumed: offset > 0 }],
      }));

      let i = offset;
      intervalRef.current = setInterval(
        () => {
          if (my !== attemptSeq.current) return;
          const st = providersRef.current[provider].status;
          if (st !== "healthy") {
            if (intervalRef.current) clearInterval(intervalRef.current);
            failFrom(
              msgId,
              words,
              provider,
              i,
              failovers,
              st === "limited" ? "429 rate_limit_exceeded" : `stream died at token ${i}`,
            );
            return;
          }
          const burst = slowRef.current ? 1 : 1 + Math.floor(Math.random() * 3);
          const chunk = words.slice(i, i + burst);
          i += chunk.length;
          emissionsRef.current.push({ t: performance.now(), n: chunk.length });
          setMetrics((m) => ({ ...m, tokens: i }));
          patchAssistant(msgId, (m) => {
            const segs = [...m.segments];
            const last = segs[segs.length - 1];
            segs[segs.length - 1] = { ...last, text: (last.text + " " + chunk.join(" ")).trim() };
            return { ...m, segments: segs };
          });
          if (i >= words.length) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            const total = ((performance.now() - runStartRef.current) / 1000).toFixed(1);
            runningRef.current = false;
            setRunning(false);
            setActiveId(null);
            addLog(
              "ok",
              `${provider}: stream complete, ${words.length} tokens, ${failovers} failover${failovers === 1 ? "" : "s"}`,
            );
            patchAssistant(msgId, (m) => ({
              ...m,
              status: "done",
              stats: `${model} · ${words.length} tokens · ${failovers} failover${failovers === 1 ? "" : "s"} · ${total}s total`,
            }));
          }
        },
        TICK_MS * (slowRef.current ? 2.4 : 1),
      );
    }, ttft);
  }

  function failFrom(
    msgId: number,
    words: string[],
    provider: ProviderId,
    offset: number,
    failovers: number,
    reason: string,
  ) {
    addLog("err", `${provider}: ${reason}`);
    const next = firstHealthy(provider) ?? firstHealthy();
    if (!next || next === provider) {
      serveCached(msgId);
      return;
    }
    const backoff = 900;
    addLog(
      "warn",
      `backing off ${backoff}ms → failing over to ${next} (resume at token ${offset})`,
    );
    setMetrics((m) => ({ ...m, failovers: failovers + 1 }));
    timerRef.current = setTimeout(
      () => attempt(msgId, words, next, offset, failovers + 1),
      backoff,
    );
  }

  function serveCached(msgId: number) {
    attemptSeq.current++;
    addLog("err", "all providers unavailable");
    addLog("warn", "degrading gracefully → serving cached answer, honestly labeled");
    runningRef.current = false;
    setRunning(false);
    setActiveId(null);
    patchAssistant(msgId, (m) => ({
      ...m,
      status: "cached",
      segments: [...m.segments, { provider: "cache", text: CACHED_ANSWER, resumed: false }],
      stats: "served from cache · 0 live tokens",
    }));
  }

  /* ── Chaos controls ────────────────────────────────────────────── */

  function chaosTarget(): ProviderId | null {
    return activeId ?? firstHealthy();
  }

  function killProvider() {
    const id = chaosTarget();
    if (!id) return;
    setProvider(id, { status: "down", cooldownUntil: 0 });
    addLog("chaos", `chaos: ${id} killed${runningRef.current ? " mid-stream" : ""}`);
  }

  function rateLimit() {
    const id = chaosTarget();
    if (!id) return;
    setProvider(id, { status: "limited", cooldownUntil: performance.now() + COOLDOWN_MS });
    addLog("chaos", `chaos: ${id} returned 429, cooling down for ${COOLDOWN_MS / 1000}s`);
  }

  function toggleSlow() {
    slowRef.current = !slowRef.current;
    setSlow(slowRef.current);
    addLog(
      "chaos",
      slowRef.current
        ? "chaos: network degraded, TTFT ×3.5, throughput ÷3"
        : "network restored to normal",
    );
  }

  function restoreAll() {
    (Object.keys(providersRef.current) as ProviderId[]).forEach((id) =>
      setProvider(id, { status: "healthy", cooldownUntil: 0 }),
    );
    if (slowRef.current) toggleSlow();
    addLog("ok", "all providers restored");
  }

  /* ── Render ────────────────────────────────────────────────────── */

  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}.${String(Math.floor(ms % 1000)).padStart(3, "0")}`;
  };

  const LOG_COLOR: Record<LogLevel, string> = {
    info: "text-fg-muted",
    ok: "text-[color:var(--accent)]",
    warn: "text-[#FEBC2E]",
    err: "text-[#FF6B6B]",
    chaos: "text-[#B854FB]",
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* ── The product surface ── */}
        <div className="glass relative flex flex-col overflow-hidden rounded-[var(--radius-glass)]">
          <div className="border-border flex items-center gap-3 border-b px-5 py-3.5">
            <div className="bg-accent grid h-8 w-8 place-items-center rounded-full text-[var(--accent-fg)]">
              <Zap className="h-4 w-4" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <div className="text-fg text-sm font-medium">Resilient AI surface</div>
              <div className="text-fg-muted text-xs">what the end user sees</div>
            </div>
            <div className="text-fg-subtle flex items-center gap-1.5 text-[11px]">
              <span
                className={cn("h-1.5 w-1.5 rounded-full", running ? "bg-[#FEBC2E]" : "bg-accent")}
              />
              {running ? "streaming" : "idle"}
            </div>
          </div>

          <div ref={chatRef} className="h-[380px] space-y-4 overflow-y-auto px-5 py-5 md:h-[420px]">
            {transcript.length === 0 && (
              <p className="text-fg-muted text-sm leading-relaxed">
                Pick a question. While the answer is streaming, use the console on the right to kill
                whichever provider is serving it, and watch what happens to the answer.
              </p>
            )}
            {transcript.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <div className="bg-accent max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed text-[var(--accent-fg)]">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex justify-start">
                  <div
                    className={cn(
                      "text-fg max-w-[92%] rounded-2xl border px-4 py-3 text-sm leading-relaxed",
                      m.status === "cached"
                        ? "border-dashed border-[#FEBC2E]/50 bg-[#FEBC2E]/5"
                        : "border-border bg-[var(--glass-tint)]",
                    )}
                  >
                    {m.status === "connecting" && (
                      <span className="text-fg-muted inline-flex items-center gap-2">
                        <span className="bg-fg-muted h-1.5 w-1.5 animate-pulse rounded-full" />
                        connecting…
                      </span>
                    )}
                    {m.segments.map((seg, i) => (
                      <span key={i}>
                        {seg.resumed && (
                          <span className="border-border text-fg-muted mx-1 inline-flex translate-y-[-1px] items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px]">
                            <Zap className="h-2.5 w-2.5 text-[color:var(--accent)]" />
                            resumed via{" "}
                            {PROVIDERS.find((p) => p.id === seg.provider)?.label ?? "cache"}
                          </span>
                        )}
                        {seg.provider === "cache" && (
                          <span className="mr-1.5 inline-flex translate-y-[-1px] items-center gap-1 rounded-full border border-[#FEBC2E]/50 px-2 py-0.5 font-mono text-[10px] text-[#FEBC2E]">
                            <DatabaseZap className="h-2.5 w-2.5" />
                            cached
                          </span>
                        )}
                        {seg.text}{" "}
                      </span>
                    ))}
                    {m.status === "streaming" && (
                      <span className="bg-accent ml-0.5 inline-block h-4 w-[7px] translate-y-[3px] animate-pulse" />
                    )}
                    {m.stats && (
                      <div className="border-border text-fg-subtle mt-2 border-t pt-2 font-mono text-[10px]">
                        {m.stats}
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="border-border border-t px-5 py-3.5">
            <div className="flex flex-wrap gap-2">
              {PROMPTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => ask(p.id)}
                  disabled={running}
                  className="border-border text-fg-muted hover:border-fg-muted hover:text-fg rounded-full border px-3 py-1.5 text-xs transition-all disabled:pointer-events-none disabled:opacity-40"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Chaos console ── */}
        <div className="glass relative flex flex-col overflow-hidden rounded-[var(--radius-glass)]">
          <div className="border-border flex items-center gap-3 border-b px-5 py-3.5">
            <div className="border-border text-fg-muted grid h-8 w-8 place-items-center rounded-full border">
              <ShieldAlert className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-fg text-sm font-medium">Chaos console</div>
              <div className="text-fg-muted text-xs">what the engineer planned for</div>
            </div>
          </div>

          <div className="flex-1 space-y-5 px-5 py-5">
            {/* Provider rail */}
            <div className="space-y-2">
              {PROVIDERS.map((p) => {
                const st = providers[p.id];
                const active = activeId === p.id;
                const cooldown =
                  st.status === "limited"
                    ? Math.max(0, Math.ceil((st.cooldownUntil - now) / 1000))
                    : 0;
                return (
                  <div
                    key={p.id}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-colors",
                      active
                        ? "border-[color:var(--accent)]/60 bg-[var(--glass-highlight)]"
                        : "border-border",
                    )}
                  >
                    <span
                      className={cn(
                        "h-2 w-2 shrink-0 rounded-full",
                        st.status === "healthy" && "bg-accent",
                        st.status === "limited" && "bg-[#FEBC2E]",
                        st.status === "down" && "bg-[#FF6B6B]",
                        active && "animate-pulse",
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-fg text-[13px] font-medium">{p.label}</div>
                      <div className="text-fg-subtle truncate font-mono text-[10px]">{p.model}</div>
                    </div>
                    <span className="text-fg-muted font-mono text-[10px] tracking-wide uppercase">
                      {active
                        ? "active"
                        : st.status === "limited"
                          ? `429 · ${cooldown}s`
                          : st.status}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Chaos buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={killProvider}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#FF6B6B]/40 px-3 py-2 text-xs font-medium text-[#FF6B6B] transition-all hover:border-[#FF6B6B] hover:bg-[#FF6B6B]/10"
              >
                <Skull className="h-3.5 w-3.5" strokeWidth={2} />
                Kill provider
              </button>
              <button
                onClick={rateLimit}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#FEBC2E]/40 px-3 py-2 text-xs font-medium text-[#FEBC2E] transition-all hover:border-[#FEBC2E] hover:bg-[#FEBC2E]/10"
              >
                <Gauge className="h-3.5 w-3.5" strokeWidth={2} />
                Rate limit
              </button>
              <button
                onClick={toggleSlow}
                className={cn(
                  "inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-all",
                  slow
                    ? "border-[#B854FB] bg-[#B854FB]/10 text-[#B854FB]"
                    : "border-[#B854FB]/40 text-[#B854FB] hover:border-[#B854FB] hover:bg-[#B854FB]/10",
                )}
              >
                <Timer className="h-3.5 w-3.5" strokeWidth={2} />
                {slow ? "Network: slow" : "Slow network"}
              </button>
              <button
                onClick={restoreAll}
                className="border-border text-fg-muted hover:border-accent hover:text-accent inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-all"
              >
                <HeartPulse className="h-3.5 w-3.5" strokeWidth={2} />
                Restore all
              </button>
            </div>

            {/* Telemetry */}
            <div className="border-border grid grid-cols-4 gap-2 border-t pt-4">
              {[
                { label: "TTFT", value: metrics.ttft ? `${metrics.ttft}ms` : "—" },
                { label: "tok/s", value: metrics.tps || "—" },
                { label: "tokens", value: metrics.tokens || "—" },
                { label: "failovers", value: metrics.failovers },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-fg font-mono text-lg leading-none">{s.value}</div>
                  <div className="text-fg-subtle mt-1 text-[10px] tracking-wide uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Event log ── */}
      <div className="glass relative overflow-hidden rounded-[var(--radius-glass)]">
        <div className="border-border flex items-center gap-2 border-b px-5 py-3">
          <Activity className="text-fg-muted h-3.5 w-3.5" strokeWidth={2} />
          <span className="text-fg text-xs font-medium">Event log</span>
          <span className="text-fg-subtle ml-auto font-mono text-[10px]">
            the state machine, thinking out loud
          </span>
        </div>
        <div
          ref={logRef}
          className="h-40 overflow-y-auto px-5 py-3 font-mono text-[11px] leading-relaxed"
        >
          {log.map((l) => (
            <div key={l.id} className="flex gap-3">
              <span className="text-fg-subtle shrink-0">{fmt(l.t)}</span>
              <span className={LOG_COLOR[l.level]}>{l.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
