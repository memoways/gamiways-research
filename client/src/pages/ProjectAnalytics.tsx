/**
 * ProjectAnalytics.tsx — GamiWays Research Portal
 * PostHog analytics dashboard for the 3 GamiWays prototypes.
 *
 * Tabs: Dilemme Light | Dilemme Flowise | AVA
 * Period selector: 30d | 90d | all
 * Granularity: weekly
 * Data: fetched via tRPC → backend PostHog proxy (API key never exposed client-side)
 */

import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { useLang } from "@/contexts/LangContext";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RefreshCw, AlertCircle, BarChart2, Activity, Mic, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type Period = "30d" | "90d" | "all";

type Row = Record<string, unknown>;

// ── Colour palette ────────────────────────────────────────────────────────────

const C = {
  blue: "oklch(0.55 0.20 200)",
  blueLight: "oklch(0.72 0.18 200)",
  amber: "oklch(0.72 0.18 50)",
  amberLight: "oklch(0.85 0.14 50)",
  green: "oklch(0.60 0.18 145)",
  red: "oklch(0.60 0.22 25)",
  slate: "oklch(0.55 0.02 240)",
  slateLight: "oklch(0.80 0.02 240)",
};

const RECHARTS_BLUE = "#3b82f6";
const RECHARTS_BLUE_LIGHT = "#93c5fd";
const RECHARTS_AMBER = "#f59e0b";
const RECHARTS_AMBER_LIGHT = "#fcd34d";
const RECHARTS_GREEN = "#22c55e";
const RECHARTS_RED = "#ef4444";
const RECHARTS_SLATE = "#94a3b8";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatWeek(raw: unknown): string {
  if (!raw) return "";
  const s = String(raw);
  // PostHog returns ISO date string like "2025-01-06T00:00:00"
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function round1(v: unknown): number | null {
  const n = Number(v);
  return isNaN(n) ? null : Math.round(n * 10) / 10;
}

function msToMs(v: unknown): number | null {
  return round1(v);
}

/**
 * Format a timestamp as "HH:MM" for today's dates or "DD/MM HH:MM" otherwise.
 */
function formatTimestamp(raw: unknown): string {
  if (!raw) return "";
  const s = String(raw);
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  const now = new Date();
  const isToday =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  if (isToday) return `${hh}:${mm}`;
  const dd = String(d.getDate()).padStart(2, "0");
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mo} ${hh}:${mm}`;
}

// Latency bar colors
const BAR_CONNECT = "#3b82f6";
const BAR_PRE_TTFT = "#a78bfa";
const BAR_STREAM = "#22c55e";
const BAR_RECORDING = "#3b82f6";
const BAR_STT = "#06b6d4";
const BAR_LLM_TTS = "#f59e0b";

// ── Sub-components ────────────────────────────────────────────────────────────

/**
 * Stacked horizontal latency bar for a single Flowise pipeline session.
 * Dark-themed row showing: connect (blue) / pre-ttft (purple) / stream (green).
 */
function SessionLatencyBar({
  connect_ms,
  ttft_ms,
  stream_ms,
  total_ms,
  timestamp,
  chat_id,
  nodes,
  tools,
  token_count,
  trace_id,
  success,
}: {
  connect_ms: number | null;
  ttft_ms: number | null;
  stream_ms: number | null;
  total_ms: number | null;
  timestamp: unknown;
  chat_id: unknown;
  nodes: number | null;
  tools: number | null;
  token_count: number | null;
  trace_id: unknown;
  success: unknown;
}) {
  const [expanded, setExpanded] = useState(false);

  const pre_ttft_ms = ttft_ms !== null && connect_ms !== null ? ttft_ms - connect_ms : null;
  const safe_total = total_ms ?? 1;

  const connectPct = connect_ms !== null ? (connect_ms / safe_total) * 100 : 0;
  const preTtftPct = pre_ttft_ms !== null ? (pre_ttft_ms / safe_total) * 100 : 0;
  const streamPct = stream_ms !== null ? (stream_ms / safe_total) * 100 : 0;

  const isSuccess = String(success) === "true" || String(success) === "True";

  return (
    <div
      style={{ background: "#0f172a", borderRadius: 8, marginBottom: 6, padding: "10px 12px", border: "1px solid #1e293b" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ color: "#94a3b8", fontSize: 11, fontFamily: "monospace", minWidth: 90 }}>
          {formatTimestamp(timestamp)}
        </span>
        <span style={{ color: "#64748b", fontSize: 10, fontFamily: "monospace", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {String(chat_id ?? "").slice(0, 12)}…
        </span>
        <span
          style={{
            fontSize: 10,
            color: isSuccess ? "#22c55e" : "#ef4444",
            fontFamily: "monospace",
            marginRight: 4,
          }}
        >
          {isSuccess ? "✓" : "✗"}
        </span>
        <span style={{ color: "#e2e8f0", fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, minWidth: 65, textAlign: "right" }}>
          {total_ms !== null ? `${Math.round(total_ms)} ms` : "—"}
        </span>
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{ color: "#475569", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Stacked bar */}
      <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", background: "#1e293b" }}>
        {connect_ms !== null && connectPct > 0 && (
          <div style={{ width: `${connectPct}%`, background: BAR_CONNECT, transition: "width 0.3s" }} title={`Connect: ${Math.round(connect_ms)} ms`} />
        )}
        {pre_ttft_ms !== null && preTtftPct > 0 && (
          <div style={{ width: `${preTtftPct}%`, background: BAR_PRE_TTFT, transition: "width 0.3s" }} title={`Pré-TTFT: ${Math.round(pre_ttft_ms)} ms`} />
        )}
        {stream_ms !== null && streamPct > 0 && (
          <div style={{ width: `${streamPct}%`, background: BAR_STREAM, transition: "width 0.3s" }} title={`Stream: ${Math.round(stream_ms)} ms`} />
        )}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div style={{ marginTop: 8, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <span style={{ color: BAR_CONNECT, fontSize: 10, fontFamily: "monospace" }}>
            Connect: {connect_ms !== null ? `${Math.round(connect_ms)} ms` : "—"}
          </span>
          <span style={{ color: BAR_PRE_TTFT, fontSize: 10, fontFamily: "monospace" }}>
            Pré-TTFT: {pre_ttft_ms !== null ? `${Math.round(pre_ttft_ms)} ms` : "—"}
          </span>
          <span style={{ color: BAR_STREAM, fontSize: 10, fontFamily: "monospace" }}>
            Stream: {stream_ms !== null ? `${Math.round(stream_ms)} ms` : "—"}
          </span>
          {nodes !== null && (
            <span style={{ color: "#94a3b8", fontSize: 10, fontFamily: "monospace" }}>
              Nodes: {nodes}
            </span>
          )}
          {tools !== null && (
            <span style={{ color: "#94a3b8", fontSize: 10, fontFamily: "monospace" }}>
              Tools: {tools}
            </span>
          )}
          {token_count !== null && (
            <span style={{ color: "#94a3b8", fontSize: 10, fontFamily: "monospace" }}>
              Tokens: {token_count}
            </span>
          )}
          {trace_id && String(trace_id) !== "null" && (
            <span style={{ color: "#475569", fontSize: 10, fontFamily: "monospace" }}>
              Trace: {String(trace_id).slice(0, 16)}…
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Stacked horizontal latency bar for a single Dilemme Light voice turn.
 * Dark-themed row showing: recording (blue) / STT (cyan) / LLM+TTS (amber).
 */
function TurnLatencyBar({
  session_id,
  turn_index,
  recording_ms,
  stt_ms,
  stt_to_complete_ms,
  total_ms,
  timestamp,
}: {
  session_id: unknown;
  turn_index: number | null;
  recording_ms: number | null;
  stt_ms: number | null;
  stt_to_complete_ms: number | null;
  total_ms: number | null;
  timestamp: unknown;
}) {
  const [expanded, setExpanded] = useState(false);

  // LLM+TTS = total - stt_to_complete
  const llm_tts_ms =
    total_ms !== null && stt_to_complete_ms !== null ? total_ms - stt_to_complete_ms : null;

  const safe_total = total_ms ?? 1;
  const recPct = recording_ms !== null ? (recording_ms / safe_total) * 100 : 0;
  const sttPct = stt_ms !== null ? (stt_ms / safe_total) * 100 : 0;
  const llmPct = llm_tts_ms !== null ? Math.max(0, (llm_tts_ms / safe_total) * 100) : 0;

  const shortSession = String(session_id ?? "").slice(0, 8);

  return (
    <div
      style={{ background: "#0f172a", borderRadius: 8, marginBottom: 6, padding: "10px 12px", border: "1px solid #1e293b" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ color: "#94a3b8", fontSize: 11, fontFamily: "monospace", minWidth: 90 }}>
          {formatTimestamp(timestamp)}
        </span>
        <span style={{ color: "#64748b", fontSize: 10, fontFamily: "monospace" }}>
          {shortSession}…
        </span>
        {turn_index !== null && (
          <span style={{ color: "#475569", fontSize: 10, fontFamily: "monospace" }}>
            #{turn_index}
          </span>
        )}
        <span style={{ flex: 1 }} />
        <span style={{ color: "#e2e8f0", fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, minWidth: 65, textAlign: "right" }}>
          {total_ms !== null ? `${Math.round(total_ms)} ms` : "—"}
        </span>
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{ color: "#475569", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Stacked bar */}
      <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", background: "#1e293b" }}>
        {recording_ms !== null && recPct > 0 && (
          <div style={{ width: `${recPct}%`, background: BAR_RECORDING }} title={`Enregistrement: ${Math.round(recording_ms)} ms`} />
        )}
        {stt_ms !== null && sttPct > 0 && (
          <div style={{ width: `${sttPct}%`, background: BAR_STT }} title={`STT: ${Math.round(stt_ms)} ms`} />
        )}
        {llm_tts_ms !== null && llmPct > 0 && (
          <div style={{ width: `${llmPct}%`, background: BAR_LLM_TTS }} title={`LLM+TTS: ${Math.round(llm_tts_ms)} ms`} />
        )}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div style={{ marginTop: 8, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <span style={{ color: BAR_RECORDING, fontSize: 10, fontFamily: "monospace" }}>
            Enreg.: {recording_ms !== null ? `${Math.round(recording_ms)} ms` : "—"}
          </span>
          <span style={{ color: BAR_STT, fontSize: 10, fontFamily: "monospace" }}>
            STT: {stt_ms !== null ? `${Math.round(stt_ms)} ms` : "—"}
          </span>
          <span style={{ color: BAR_LLM_TTS, fontSize: 10, fontFamily: "monospace" }}>
            LLM+TTS: {llm_tts_ms !== null ? `${Math.round(llm_tts_ms)} ms` : "—"}
          </span>
          {stt_to_complete_ms !== null && (
            <span style={{ color: "#94a3b8", fontSize: 10, fontFamily: "monospace" }}>
              STT total: {Math.round(stt_to_complete_ms)} ms
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 mt-6"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {children}
    </h3>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
  isEmpty,
  isLoading,
  error,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  isEmpty?: boolean;
  isLoading?: boolean;
  error?: string | null;
}) {
  return (
    <div className="border border-slate-200 rounded-xl bg-white p-5">
      <div className="mb-4">
        <div
          className="text-sm font-bold text-slate-800"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            className="text-xs text-slate-400 mt-0.5"
            style={{ fontFamily: "'Source Serif 4', serif" }}
          >
            {subtitle}
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-40 text-slate-300">
          <RefreshCw size={20} className="animate-spin" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 h-40 text-red-400 text-xs">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      ) : isEmpty ? (
        <div className="flex items-center justify-center h-40 text-slate-300 text-xs">
          Aucune donnée pour cette période
        </div>
      ) : (
        children
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: string | number | null;
  unit?: string;
  color?: string;
}) {
  return (
    <div className="border border-slate-200 rounded-xl bg-white p-4">
      <div
        className="text-2xl font-black mb-1"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: color ?? C.blue,
          letterSpacing: "-0.03em",
        }}
      >
        {value !== null && value !== undefined ? (
          <>
            {value}
            {unit && (
              <span className="text-sm font-normal text-slate-400 ml-1">{unit}</span>
            )}
          </>
        ) : (
          <span className="text-slate-300">—</span>
        )}
      </div>
      <div
        className="text-xs text-slate-500 leading-snug"
        style={{ fontFamily: "'Source Serif 4', serif" }}
      >
        {label}
      </div>
    </div>
  );
}

// ── Period selector ───────────────────────────────────────────────────────────

function PeriodSelector({
  value,
  onChange,
  isFr,
}: {
  value: Period;
  onChange: (p: Period) => void;
  isFr: boolean;
}) {
  const options: { value: Period; label: string }[] = [
    { value: "30d", label: isFr ? "30 jours" : "30 days" },
    { value: "90d", label: isFr ? "90 jours" : "90 days" },
    { value: "all", label: isFr ? "Tout" : "All" },
  ];

  return (
    <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
            value === o.value
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ── Tab: Dilemme Light ────────────────────────────────────────────────────────

function DilemmeLight({ period, isFr }: { period: Period; isFr: boolean }) {
  const [turnSort, setTurnSort] = useState<"recent" | "slowest" | "mic">("recent");
  const [turnLimit, setTurnLimit] = useState(20);

  const { data: phase1, isLoading: l1, error: e1 } = trpc.posthog.dilemmeLightTtsPhase1.useQuery({ period });
  const { data: phase2, isLoading: l2, error: e2 } = trpc.posthog.dilemmeLightTtsPhase2.useQuery({ period });
  const { data: voice, isLoading: lv, error: ev } = trpc.posthog.dilemmeLightVoiceTurn.useQuery({ period });
  const { data: welcome, isLoading: lw, error: ew } = trpc.posthog.dilemmeLightWelcome.useQuery({ period });
  const { data: sessions, isLoading: ls, error: es } = trpc.posthog.dilemmeLightSessions.useQuery({ period });
  const { data: recentTurns, isLoading: lrt, error: ert } = trpc.posthog.dilemmeLightRecentTurns.useQuery({ period, limit: turnLimit });
  const { data: phaseTrends, isLoading: lpt, error: ept } = trpc.posthog.dilemmeLightPhaseTrends.useQuery({ period });

  // ── Derived stats ──────────────────────────────────────────────────────────

  const totalSessions = sessions?.reduce((acc, r) => acc + (Number(r.sessions) || 0), 0) ?? null;
  const avgDuration = sessions && sessions.length > 0
    ? round1(sessions.reduce((acc, r) => acc + (Number(r.avg_duration_s) || 0), 0) / sessions.length)
    : null;
  // avgDuration from PostHog may be in seconds already (property duration_seconds)
  // If the value looks like it's in ms (>1000), divide by 1000
  const avgDurationDisplay = avgDuration !== null && avgDuration > 1000 ? round1(avgDuration / 1000) : avgDuration;
  const avgActions = sessions && sessions.length > 0
    ? round1(sessions.reduce((acc, r) => acc + (Number(r.avg_actions) || 0), 0) / sessions.length)
    : null;

  // ── Chart data ─────────────────────────────────────────────────────────────

  const phase1Data = (phase1 ?? []).map((r) => ({
    week: formatWeek(r.week),
    p50: msToMs(r.p50),
    p95: msToMs(r.p95),
    n: Number(r.n),
  }));

  const voiceData = (voice ?? []).map((r) => ({
    week: formatWeek(r.week),
    total_p50: msToMs(r.total_p50),
    total_p95: msToMs(r.total_p95),
    stt_p50: msToMs(r.stt_p50),
    stt_p95: msToMs(r.stt_p95),
  }));

  // Recent turns sorted
  const sortedTurns = [...(recentTurns ?? [])].sort((a, b) => {
    if (turnSort === "slowest") return (Number(b.total_ms) || 0) - (Number(a.total_ms) || 0);
    if (turnSort === "mic") return (Number(b.recording_ms) || 0) - (Number(a.recording_ms) || 0);
    // recent: already sorted DESC by timestamp from API, preserve
    return 0;
  });

  // Phase trends for DilemmeLight
  const lightPhaseTrendsData = (phaseTrends ?? []).map((r) => ({
    week: formatWeek(r.week),
    total_p50: msToMs(r.total_p50),
    stt_p50: msToMs(r.stt_p50),
    rec_p50: msToMs(r.rec_p50),
  }));

  // Summary stats from recent turns
  const turnTotalValues = (recentTurns ?? []).map((r) => Number(r.total_ms)).filter((v) => !isNaN(v) && v > 0);
  const turnSttValues = (recentTurns ?? []).map((r) => Number(r.stt_ms)).filter((v) => !isNaN(v) && v > 0);
  const turnMedianTotal = turnTotalValues.length > 0
    ? Math.round(turnTotalValues.sort((a, b) => a - b)[Math.floor(turnTotalValues.length / 2)])
    : null;
  const turnMedianStt = turnSttValues.length > 0
    ? Math.round(turnSttValues.sort((a, b) => a - b)[Math.floor(turnSttValues.length / 2)])
    : null;

  // Welcome: split by cache hit / miss
  const welcomeWeeks = Array.from(new Set((welcome ?? []).map((r) => formatWeek(r.week))));
  const welcomeData = welcomeWeeks.map((week) => {
    const hit = (welcome ?? []).find((r) => formatWeek(r.week) === week && String(r.cache_hit) === "True");
    const miss = (welcome ?? []).find((r) => formatWeek(r.week) === week && String(r.cache_hit) === "False");
    return {
      week,
      hit_p50: hit ? msToMs(hit.p50) : null,
      miss_p50: miss ? msToMs(miss.p50) : null,
    };
  });

  const sessionData = (sessions ?? []).map((r) => ({
    week: formatWeek(r.week),
    sessions: Number(r.sessions),
    avg_duration_s: round1(r.avg_duration_s),
  }));

  return (
    <div>
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          label={isFr ? "Sessions totales" : "Total sessions"}
          value={totalSessions}
          color={C.blue}
        />
        <StatCard
          label={isFr ? "Durée moy. session" : "Avg session duration"}
          value={avgDurationDisplay}
          unit="s"
          color={C.blue}
        />
        <StatCard
          label={isFr ? "Actions moy. / session" : "Avg actions / session"}
          value={avgActions}
          color={C.blue}
        />
      </div>

      {/* TTS Phase 1 latency */}
      <SectionTitle>{isFr ? "Latence TTS Phase 1 (ms)" : "TTS Phase 1 Latency (ms)"}</SectionTitle>
      <ChartCard
        title={isFr ? "TTS Phase 1 — p50 / p95 hebdomadaire" : "TTS Phase 1 — weekly p50 / p95"}
        subtitle={isFr ? "Temps jusqu'au premier audio TTS (event tts_phase1_ready)" : "Time to first TTS audio (event tts_phase1_ready)"}
        isLoading={l1}
        error={e1 ? String(e1) : null}
        isEmpty={!phase1Data.length}
      >
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={phase1Data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} unit="ms" width={55} />
            <Tooltip formatter={(v: unknown) => [`${v} ms`]} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="p50" stroke={RECHARTS_BLUE} strokeWidth={2} dot={false} name="p50" />
            <Line type="monotone" dataKey="p95" stroke={RECHARTS_BLUE_LIGHT} strokeWidth={2} dot={false} strokeDasharray="4 2" name="p95" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Voice turn latency */}
      <SectionTitle>{isFr ? "Latence tour de parole (ms)" : "Voice Turn Latency (ms)"}</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <ChartCard
          title={isFr ? "Latence totale tour — p50 / p95" : "Total turn latency — p50 / p95"}
          subtitle={isFr ? "STT + LLM + TTS (event voice_turn_complete)" : "STT + LLM + TTS (event voice_turn_complete)"}
          isLoading={lv}
          error={ev ? String(ev) : null}
          isEmpty={!voiceData.length}
        >
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={voiceData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} unit="ms" width={60} />
              <Tooltip formatter={(v: unknown) => [`${v} ms`]} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="total_p50" stroke={RECHARTS_BLUE} strokeWidth={2} dot={false} name="total p50" />
              <Line type="monotone" dataKey="total_p95" stroke={RECHARTS_BLUE_LIGHT} strokeWidth={2} dot={false} strokeDasharray="4 2" name="total p95" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title={isFr ? "Latence STT — p50 / p95" : "STT Latency — p50 / p95"}
          subtitle={isFr ? "Reconnaissance vocale seule (stt_latency_ms)" : "Speech recognition only (stt_latency_ms)"}
          isLoading={lv}
          error={ev ? String(ev) : null}
          isEmpty={!voiceData.length}
        >
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={voiceData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} unit="ms" width={60} />
              <Tooltip formatter={(v: unknown) => [`${v} ms`]} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="stt_p50" stroke={RECHARTS_GREEN} strokeWidth={2} dot={false} name="STT p50" />
              <Line type="monotone" dataKey="stt_p95" stroke="#86efac" strokeWidth={2} dot={false} strokeDasharray="4 2" name="STT p95" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Welcome audio */}
      <SectionTitle>{isFr ? "Audio de bienvenue — cache hit vs miss" : "Welcome Audio — cache hit vs miss"}</SectionTitle>
      <ChartCard
        title={isFr ? "Latence audio de bienvenue (p50)" : "Welcome audio latency (p50)"}
        subtitle={isFr ? "Pré-généré (hit) vs généré à la volée (miss)" : "Pre-generated (hit) vs on-the-fly (miss)"}
        isLoading={lw}
        error={ew ? String(ew) : null}
        isEmpty={!welcomeData.length}
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={welcomeData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} unit="ms" width={55} />
            <Tooltip formatter={(v: unknown) => [`${v} ms`]} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="hit_p50" fill={RECHARTS_GREEN} name={isFr ? "Cache hit p50" : "Cache hit p50"} radius={[3, 3, 0, 0]} />
            <Bar dataKey="miss_p50" fill={RECHARTS_AMBER} name={isFr ? "Cache miss p50" : "Cache miss p50"} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Sessions */}
      <SectionTitle>{isFr ? "Sessions hebdomadaires" : "Weekly Sessions"}</SectionTitle>
      <ChartCard
        title={isFr ? "Sessions et durée moyenne" : "Sessions and average duration"}
        subtitle={isFr ? "Nombre de sessions terminées par semaine (event session_ended)" : "Completed sessions per week (event session_ended)"}
        isLoading={ls}
        error={es ? String(es) : null}
        isEmpty={!sessionData.length}
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={sessionData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "#94a3b8" }} unit="s" width={50} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar yAxisId="left" dataKey="sessions" fill={RECHARTS_BLUE} name={isFr ? "Sessions" : "Sessions"} radius={[3, 3, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="avg_duration_s" stroke={RECHARTS_AMBER} strokeWidth={2} dot={false} name={isFr ? "Durée moy. (s)" : "Avg duration (s)"} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Phase 2 note */}
      <div className="mt-4 text-xs text-slate-400 border border-slate-100 rounded-lg p-3 bg-slate-50" style={{ fontFamily: "'Source Serif 4', serif" }}>
        <strong className="text-slate-500">Note :</strong>{" "}
        {isFr
          ? "Les données TTS Phase 2 (event tts_phase2_ready) sont disponibles mais non affichées ici pour simplifier la lecture. Elles montrent le delta phase1→phase2 (propriété phase1_to_phase2_ms)."
          : "TTS Phase 2 data (event tts_phase2_ready) is available but not displayed here for readability. It shows the phase1→phase2 delta (property phase1_to_phase2_ms)."}
      </div>
    </div>
  );
}

// ── Tab: Dilemme Flowise ──────────────────────────────────────────────────────

function DilemmeFlowise({ period, isFr }: { period: Period; isFr: boolean }) {
  const { data: tts, isLoading: lt, error: et } = trpc.posthog.dilemmeFlowiseTts.useQuery({ period });
  const { data: sessions, isLoading: ls, error: es } = trpc.posthog.dilemmeFlowiseSessions.useQuery({ period });
  const { data: requests, isLoading: lr, error: er } = trpc.posthog.dilemmeFlowiseTtsRequests.useQuery({ period });

  // ── Derived stats ──────────────────────────────────────────────────────────

  const totalSessions = sessions?.reduce((acc, r) => acc + (Number(r.sessions) || 0), 0) ?? null;
  const avgDuration = sessions && sessions.length > 0
    ? round1(sessions.reduce((acc, r) => acc + (Number(r.avg_duration_s) || 0), 0) / sessions.length)
    : null;
  const totalTtsRequests = requests?.reduce((acc, r) => acc + (Number(r.tts_requests) || 0), 0) ?? null;

  // ── Chart data ─────────────────────────────────────────────────────────────

  // TTS latency: split by cache hit / miss
  const ttsWeeks = Array.from(new Set((tts ?? []).map((r) => formatWeek(r.week))));
  const ttsData = ttsWeeks.map((week) => {
    const hit = (tts ?? []).find((r) => formatWeek(r.week) === week && String(r.cache_hit) === "True");
    const miss = (tts ?? []).find((r) => formatWeek(r.week) === week && String(r.cache_hit) === "False");
    return {
      week,
      hit_p50: hit ? msToMs(hit.p50) : null,
      hit_p95: hit ? msToMs(hit.p95) : null,
      miss_p50: miss ? msToMs(miss.p50) : null,
      miss_p95: miss ? msToMs(miss.p95) : null,
    };
  });

  const sessionData = (sessions ?? []).map((r) => ({
    week: formatWeek(r.week),
    sessions: Number(r.sessions),
    avg_duration_s: round1(r.avg_duration_s),
  }));

  const requestData = (requests ?? []).map((r) => ({
    week: formatWeek(r.week),
    tts_requests: Number(r.tts_requests),
    avg_chars: round1(r.avg_chars),
  }));

  return (
    <div>
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          label={isFr ? "Sessions totales" : "Total sessions"}
          value={totalSessions}
          color={C.amber}
        />
        <StatCard
          label={isFr ? "Durée moy. session" : "Avg session duration"}
          value={avgDuration}
          unit="s"
          color={C.amber}
        />
        <StatCard
          label={isFr ? "Requêtes TTS totales" : "Total TTS requests"}
          value={totalTtsRequests}
          color={C.amber}
        />
      </div>

      {/* TTS latency */}
      <SectionTitle>{isFr ? "Latence TTS — cache hit vs miss (ms)" : "TTS Latency — cache hit vs miss (ms)"}</SectionTitle>
      <ChartCard
        title={isFr ? "TTS latency p50 — cache hit vs miss" : "TTS latency p50 — cache hit vs miss"}
        subtitle={isFr ? "Event tts_completed — propriété latencyMs" : "Event tts_completed — property latencyMs"}
        isLoading={lt}
        error={et ? String(et) : null}
        isEmpty={!ttsData.length}
      >
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={ttsData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} unit="ms" width={55} />
            <Tooltip formatter={(v: unknown) => [`${v} ms`]} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="hit_p50" stroke={RECHARTS_GREEN} strokeWidth={2} dot={false} name="Cache hit p50" />
            <Line type="monotone" dataKey="miss_p50" stroke={RECHARTS_AMBER} strokeWidth={2} dot={false} name="Cache miss p50" />
            <Line type="monotone" dataKey="miss_p95" stroke={RECHARTS_AMBER_LIGHT} strokeWidth={1.5} dot={false} strokeDasharray="4 2" name="Cache miss p95" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Sessions */}
      <SectionTitle>{isFr ? "Sessions hebdomadaires" : "Weekly Sessions"}</SectionTitle>
      <ChartCard
        title={isFr ? "Sessions et durée moyenne" : "Sessions and average duration"}
        subtitle={isFr ? "Event session_complete — propriété durationMs" : "Event session_complete — property durationMs"}
        isLoading={ls}
        error={es ? String(es) : null}
        isEmpty={!sessionData.length}
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={sessionData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "#94a3b8" }} unit="s" width={50} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar yAxisId="left" dataKey="sessions" fill={RECHARTS_AMBER} name={isFr ? "Sessions" : "Sessions"} radius={[3, 3, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="avg_duration_s" stroke={RECHARTS_BLUE} strokeWidth={2} dot={false} name={isFr ? "Durée moy. (s)" : "Avg duration (s)"} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* TTS requests */}
      <SectionTitle>{isFr ? "Requêtes TTS hebdomadaires" : "Weekly TTS Requests"}</SectionTitle>
      <ChartCard
        title={isFr ? "Volume de requêtes TTS et longueur moyenne" : "TTS request volume and average length"}
        subtitle={isFr ? "Event tts_requested — propriété charCount" : "Event tts_requested — property charCount"}
        isLoading={lr}
        error={er ? String(er) : null}
        isEmpty={!requestData.length}
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={requestData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "#94a3b8" }} unit=" ch" width={55} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar yAxisId="left" dataKey="tts_requests" fill={RECHARTS_AMBER} name={isFr ? "Requêtes TTS" : "TTS requests"} radius={[3, 3, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="avg_chars" stroke={RECHARTS_SLATE} strokeWidth={2} dot={false} name={isFr ? "Chars moy." : "Avg chars"} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

// ── Tab: AVA ──────────────────────────────────────────────────────────────────

const PIE_COLORS = [RECHARTS_BLUE, RECHARTS_AMBER, RECHARTS_GREEN, RECHARTS_RED, RECHARTS_SLATE, "#a78bfa", "#f472b6"];

function AVA({ period, isFr }: { period: Period; isFr: boolean }) {
  const { data: sessions, isLoading: ls, error: es } = trpc.posthog.avaSessions.useQuery({ period });
  const { data: characters, isLoading: lc, error: ec } = trpc.posthog.avaCharacters.useQuery({ period });
  const { data: phases, isLoading: lp, error: ep } = trpc.posthog.avaPhases.useQuery({ period });
  const { data: modality, isLoading: lm, error: em } = trpc.posthog.avaVoiceModality.useQuery({ period });

  // ── Derived stats ──────────────────────────────────────────────────────────

  const totalStarts = sessions?.filter((r) => r.event === "game_started").reduce((acc, r) => acc + (Number(r.n) || 0), 0) ?? null;
  const totalEnds = sessions?.filter((r) => r.event === "game_over").reduce((acc, r) => acc + (Number(r.n) || 0), 0) ?? null;
  const completionRate = totalStarts && totalEnds && totalStarts > 0
    ? Math.round((totalEnds / totalStarts) * 100)
    : null;

  // ── Chart data ─────────────────────────────────────────────────────────────

  // Sessions: pivot by event
  const sessionWeeks = Array.from(new Set((sessions ?? []).map((r) => formatWeek(r.week))));
  const sessionData = sessionWeeks.map((week) => {
    const started = (sessions ?? []).find((r) => formatWeek(r.week) === week && r.event === "game_started");
    const ended = (sessions ?? []).find((r) => formatWeek(r.week) === week && r.event === "game_over");
    return {
      week,
      started: started ? Number(started.n) : 0,
      ended: ended ? Number(ended.n) : 0,
    };
  });

  const charData = (characters ?? []).map((r) => ({
    name: String(r.character || "unknown"),
    value: Number(r.n),
  }));

  const phaseData = (phases ?? []).map((r) => ({
    name: String(r.phase || "unknown"),
    value: Number(r.n),
  }));

  const modalityData = (modality ?? []).map((r) => ({
    name: String(r.modality || "unknown"),
    value: Number(r.n),
  }));

  return (
    <div>
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          label={isFr ? "Parties démarrées" : "Games started"}
          value={totalStarts}
          color={C.green}
        />
        <StatCard
          label={isFr ? "Parties terminées" : "Games completed"}
          value={totalEnds}
          color={C.green}
        />
        <StatCard
          label={isFr ? "Taux de complétion" : "Completion rate"}
          value={completionRate}
          unit="%"
          color={C.green}
        />
      </div>

      {/* Sessions weekly */}
      <SectionTitle>{isFr ? "Sessions hebdomadaires" : "Weekly Sessions"}</SectionTitle>
      <ChartCard
        title={isFr ? "Parties démarrées vs terminées" : "Games started vs completed"}
        subtitle={isFr ? "Events game_started et game_over" : "Events game_started and game_over"}
        isLoading={ls}
        error={es ? String(es) : null}
        isEmpty={!sessionData.length}
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={sessionData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="started" fill={RECHARTS_BLUE} name={isFr ? "Démarrées" : "Started"} radius={[3, 3, 0, 0]} />
            <Bar dataKey="ended" fill={RECHARTS_GREEN} name={isFr ? "Terminées" : "Completed"} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Pie charts row */}
      <SectionTitle>{isFr ? "Distributions" : "Distributions"}</SectionTitle>
      <div className="grid sm:grid-cols-3 gap-4">
        {/* Characters */}
        <ChartCard
          title={isFr ? "Personnages sélectionnés" : "Characters selected"}
          subtitle={isFr ? "Event character_selected" : "Event character_selected"}
          isLoading={lc}
          error={ec ? String(ec) : null}
          isEmpty={!charData.length}
        >
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={charData} cx="50%" cy="50%" outerRadius={65} dataKey="value" label={({ name, percent }) => `${name} ${Math.round((percent ?? 0) * 100)}%`} labelLine={false} fontSize={10}>
                {charData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Phases */}
        <ChartCard
          title={isFr ? "Phases atteintes" : "Phases reached"}
          subtitle={isFr ? "Event phase_changed" : "Event phase_changed"}
          isLoading={lp}
          error={ep ? String(ep) : null}
          isEmpty={!phaseData.length}
        >
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={phaseData} cx="50%" cy="50%" outerRadius={65} dataKey="value" label={({ name, percent }) => `${name} ${Math.round((percent ?? 0) * 100)}%`} labelLine={false} fontSize={10}>
                {phaseData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Voice modality */}
        <ChartCard
          title={isFr ? "Modalité vocale" : "Voice modality"}
          subtitle={isFr ? "Event voice_modality_assigned" : "Event voice_modality_assigned"}
          isLoading={lm}
          error={em ? String(em) : null}
          isEmpty={!modalityData.length}
        >
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={modalityData} cx="50%" cy="50%" outerRadius={65} dataKey="value" label={({ name, percent }) => `${name} ${Math.round((percent ?? 0) * 100)}%`} labelLine={false} fontSize={10}>
                {modalityData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-4 text-xs text-slate-400 border border-slate-100 rounded-lg p-3 bg-slate-50" style={{ fontFamily: "'Source Serif 4', serif" }}>
        <strong className="text-slate-500">Note :</strong>{" "}
        {isFr
          ? "AVA ne collecte pas de métriques de latence (pas de pipeline STT/TTS instrumenté dans ce prototype). Les données disponibles couvrent uniquement les événements de progression de jeu."
          : "AVA does not collect latency metrics (no instrumented STT/TTS pipeline in this prototype). Available data covers game progression events only."}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

type TabId = "dilemme-light" | "dilemme-flowise" | "ava";

const TABS: { id: TabId; labelFr: string; labelEn: string; icon: React.ElementType; color: string }[] = [
  { id: "dilemme-light", labelFr: "Dilemme Light", labelEn: "Dilemme Light", icon: Activity, color: C.blue },
  { id: "dilemme-flowise", labelFr: "Dilemme Flowise", labelEn: "Dilemme Flowise", icon: BarChart2, color: C.amber },
  { id: "ava", labelFr: "AVA", labelEn: "AVA", icon: Mic, color: C.green },
];

export default function ProjectAnalytics() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const [activeTab, setActiveTab] = useState<TabId>("dilemme-light");
  const [period, setPeriod] = useState<Period>("30d");
  const [refreshKey, setRefreshKey] = useState(0);

  const utils = trpc.useUtils();

  const handleRefresh = useCallback(async () => {
    await utils.posthog.invalidate();
    setRefreshKey((k) => k + 1);
  }, [utils]);

  const activeTabMeta = TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-white">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <section className="border-b border-slate-200 py-10 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  {isFr ? "The Project" : "The Project"}
                </span>
                <span className="text-slate-300">·</span>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{
                    background: "oklch(0.97 0.02 200)",
                    color: "oklch(0.55 0.20 200)",
                  }}
                >
                  PostHog Analytics
                </span>
              </div>
              <h1
                className="text-3xl font-black text-slate-900 mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}
              >
                {isFr ? "Usage & Latence" : "Usage & Latency"}
              </h1>
              <p
                className="text-sm text-slate-500 max-w-xl"
                style={{ fontFamily: "'Source Serif 4', serif" }}
              >
                {isFr
                  ? "Données PostHog en temps réel pour les 3 prototypes GamiWays. Granularité hebdomadaire. Les données sont proxifiées côté serveur — la clé API n'est jamais exposée côté client."
                  : "Real-time PostHog data for the 3 GamiWays prototypes. Weekly granularity. Data is proxied server-side — the API key is never exposed client-side."}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <PeriodSelector value={period} onChange={setPeriod} isFr={isFr} />
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <RefreshCw size={13} />
                {isFr ? "Actualiser" : "Refresh data"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tabs ────────────────────────────────────────────────────────────── */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-0">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-bold border-b-2 transition-all ${
                    isActive
                      ? "border-current text-slate-900"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    borderColor: isActive ? tab.color : undefined,
                    color: isActive ? tab.color : undefined,
                  }}
                >
                  <Icon size={14} />
                  {isFr ? tab.labelFr : tab.labelEn}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Tab badge */}
        <div className="flex items-center gap-2 mb-6">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: activeTabMeta.color }}
          />
          <span
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: activeTabMeta.color, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {isFr ? activeTabMeta.labelFr : activeTabMeta.labelEn}
          </span>
          <span className="text-slate-300 text-xs">·</span>
          <span className="text-xs text-slate-400 font-mono">
            {period === "30d"
              ? isFr ? "30 derniers jours" : "last 30 days"
              : period === "90d"
              ? isFr ? "90 derniers jours" : "last 90 days"
              : isFr ? "toutes les données" : "all data"}
          </span>
        </div>

        {/* Tab panels */}
        <div key={`${activeTab}-${period}-${refreshKey}`}>
          {activeTab === "dilemme-light" && <DilemmeLight period={period} isFr={isFr} />}
          {activeTab === "dilemme-flowise" && <DilemmeFlowise period={period} isFr={isFr} />}
          {activeTab === "ava" && <AVA period={period} isFr={isFr} />}
        </div>

        {/* Footer note */}
        <div
          className="mt-10 pt-6 border-t border-slate-100 text-xs text-slate-400"
          style={{ fontFamily: "'Source Serif 4', serif" }}
        >
          {isFr
            ? "Données issues de PostHog (EU) via proxy backend sécurisé. Granularité : semaine ISO. Seules les données réelles sont affichées — aucune estimation ni valeur inventée."
            : "Data sourced from PostHog (EU) via secure backend proxy. Granularity: ISO week. Only real data is displayed — no estimates or invented values."}
        </div>
      </main>
    </div>
  );
}
