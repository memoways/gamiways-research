/**
 * VoiceScoring.tsx — GamiWays Research Portal
 * Outil de scoring personnalisé : pondérer les critères, obtenir un classement dynamique
 * Design: Technical Blueprint — sliders, ranked cards, presets
 * i18n: EN / FR via LangContext
 */
import { useState, useMemo, useCallback, useEffect } from "react";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import { getTTSData, type TTSData } from "@/lib/ttsData";
import { getSTTData, type STTData } from "@/lib/sttData";
import { ttsStrategicData, sttStrategicData } from "@/lib/strategicData";
import { ChevronLeft, RotateCcw, Sliders, Trophy, Info, Link2, Check, Home, ChevronRight } from "lucide-react";
import GlossaryLink from "@/components/GlossaryLink";

// ─── Types ──────────────────────────────────────────────────────────────

interface TTSWeights {
  quality: number;
  latency: number;
  voiceCloning: number;
  expressiveness: number;
  sovereignty: number;
  pricing: number;
  multilingual: number;
}

interface STTWeights {
  accuracy: number;
  latency: number;
  multilingual: number;
  sovereignty: number;
  pricing: number;
  streaming: number;
}

type PipelineMode = "tts" | "stt";

interface Preset {
  id: string;
  label: string;
  labelFr: string;
  desc: string;
  descFr: string;
  icon: string;
  ttsWeights: TTSWeights;
  sttWeights: STTWeights;
}

// ─── Default weights ──────────────────────────────────────────────────────────────

const DEFAULT_TTS_WEIGHTS: TTSWeights = { quality: 5, latency: 5, voiceCloning: 5, expressiveness: 5, sovereignty: 5, pricing: 5, multilingual: 5 };
const DEFAULT_STT_WEIGHTS: STTWeights = { accuracy: 5, latency: 5, multilingual: 5, sovereignty: 5, pricing: 5, streaming: 5 };

// ─── URL helpers ──────────────────────────────────────────────────────────────

const TTS_KEYS: (keyof TTSWeights)[] = ["quality","latency","voiceCloning","expressiveness","sovereignty","pricing","multilingual"];
const STT_KEYS: (keyof STTWeights)[] = ["accuracy","latency","multilingual","sovereignty","pricing","streaming"];

function encodeWeights(tts: TTSWeights, stt: STTWeights, mode: PipelineMode): string {
  const ttsStr = TTS_KEYS.map((k) => tts[k]).join("-");
  const sttStr = STT_KEYS.map((k) => stt[k]).join("-");
  const params = new URLSearchParams({ tts: ttsStr, stt: sttStr, mode });
  return `${window.location.origin}/voice/scoring?${params.toString()}`;
}

function decodeWeightsFromURL(): { tts: TTSWeights | null; stt: STTWeights | null; mode: PipelineMode | null } {
  const params = new URLSearchParams(window.location.search);
  const ttsRaw = params.get("tts");
  const sttRaw = params.get("stt");
  const modeRaw = params.get("mode");
  let tts: TTSWeights | null = null;
  let stt: STTWeights | null = null;
  if (ttsRaw) {
    const vals = ttsRaw.split("-").map(Number);
    if (vals.length === TTS_KEYS.length && vals.every((v) => !isNaN(v) && v >= 0 && v <= 10)) {
      tts = Object.fromEntries(TTS_KEYS.map((k, i) => [k, vals[i]])) as unknown as TTSWeights;
    }
  }
  if (sttRaw) {
    const vals = sttRaw.split("-").map(Number);
    if (vals.length === STT_KEYS.length && vals.every((v) => !isNaN(v) && v >= 0 && v <= 10)) {
      stt = Object.fromEntries(STT_KEYS.map((k, i) => [k, vals[i]])) as unknown as STTWeights;
    }
  }
  return { tts, stt, mode: (modeRaw === "tts" || modeRaw === "stt") ? modeRaw : null };
}

function getInitialState() {
  const { tts, stt, mode } = decodeWeightsFromURL();
  return {
    ttsWeights: tts ?? DEFAULT_TTS_WEIGHTS,
    sttWeights: stt ?? DEFAULT_STT_WEIGHTS,
    mode: mode ?? ("tts" as PipelineMode),
    fromUrl: !!(tts || stt),
  };
}

// ─── Presets ─────────────────────────────────────────────────────────────────

const PRESETS: Preset[] = [
  {
    id: "mvp",
    label: "MVP / Prototype",
    labelFr: "MVP / Prototype",
    desc: "Speed to market, quality first, sovereignty secondary",
    descFr: "Vitesse de mise sur le marché, qualité avant tout, souveraineté secondaire",
    icon: "🚀",
    ttsWeights: { quality: 9, latency: 8, voiceCloning: 7, expressiveness: 7, sovereignty: 2, pricing: 5, multilingual: 4 },
    sttWeights: { accuracy: 8, latency: 9, multilingual: 5, sovereignty: 2, pricing: 5, streaming: 9 },
  },
  {
    id: "sovereign",
    label: "Sovereign / Regulated",
    labelFr: "Souverain / Réglementé",
    desc: "GDPR / nLPD compliance, on-premise, EU data residency",
    descFr: "Conformité RGPD / nLPD, on-premise, résidence données UE",
    icon: "🛡️",
    ttsWeights: { quality: 6, latency: 6, voiceCloning: 5, expressiveness: 4, sovereignty: 10, pricing: 5, multilingual: 4 },
    sttWeights: { accuracy: 7, latency: 6, multilingual: 4, sovereignty: 10, pricing: 5, streaming: 6 },
  },
  {
    id: "cost",
    label: "Cost Optimized",
    labelFr: "Optimisé Coût",
    desc: "Scale at lowest cost, open-source preferred",
    descFr: "Mise à l'échelle au coût minimal, open-source privilégié",
    icon: "💰",
    ttsWeights: { quality: 5, latency: 5, voiceCloning: 4, expressiveness: 3, sovereignty: 5, pricing: 10, multilingual: 3 },
    sttWeights: { accuracy: 6, latency: 5, multilingual: 4, sovereignty: 5, pricing: 10, streaming: 5 },
  },
  {
    id: "realtime",
    label: "Real-time Agent",
    labelFr: "Agent Temps Réel",
    desc: "Sub-500ms pipeline, streaming-first, low latency",
    descFr: "Pipeline <500ms, streaming-first, latence minimale",
    icon: "⚡",
    ttsWeights: { quality: 6, latency: 10, voiceCloning: 3, expressiveness: 5, sovereignty: 4, pricing: 5, multilingual: 3 },
    sttWeights: { accuracy: 6, latency: 10, multilingual: 4, sovereignty: 4, pricing: 5, streaming: 10 },
  },
  {
    id: "multilingual",
    label: "Multilingual / Global",
    labelFr: "Multilingue / Global",
    desc: "Wide language coverage, Swiss German, FR, DE, EN",
    descFr: "Large couverture linguistique, suisse-allemand, FR, DE, EN",
    icon: "🌍",
    ttsWeights: { quality: 7, latency: 5, voiceCloning: 5, expressiveness: 5, sovereignty: 4, pricing: 5, multilingual: 10 },
    sttWeights: { accuracy: 7, latency: 5, multilingual: 10, sovereignty: 4, pricing: 5, streaming: 6 },
  },
  {
    id: "gamiways",
    label: "GamiWays Phase 2",
    labelFr: "GamiWays Phase 2",
    desc: "Balanced: quality + sovereignty + real-time for Swiss deployment",
    descFr: "Équilibré : qualité + souveraineté + temps réel pour déploiement suisse",
    icon: "🎯",
    ttsWeights: { quality: 8, latency: 8, voiceCloning: 9, expressiveness: 7, sovereignty: 8, pricing: 5, multilingual: 6 },
    sttWeights: { accuracy: 8, latency: 8, multilingual: 7, sovereignty: 8, pricing: 5, streaming: 9 },
  },
];

// ─── Scoring helpers ──────────────────────────────────────────────────────────

function computeTTSScore(tts: TTSData, w: TTSWeights): number {
  const total = w.quality + w.latency + w.voiceCloning + w.expressiveness + w.sovereignty + w.pricing + w.multilingual;
  if (total === 0) return 0;
  return (
    tts.score.quality * w.quality +
    tts.score.latency * w.latency +
    tts.score.voiceCloning * w.voiceCloning +
    tts.score.expressiveness * w.expressiveness +
    tts.score.sovereignty * w.sovereignty +
    tts.score.pricing * w.pricing +
    tts.score.multilingual * w.multilingual
  ) / total;
}

function computeSTTScore(stt: STTData, w: STTWeights): number {
  const total = w.accuracy + w.latency + w.multilingual + w.sovereignty + w.pricing + w.streaming;
  if (total === 0) return 0;
  return (
    stt.score.accuracy * w.accuracy +
    stt.score.latency * w.latency +
    stt.score.multilingual * w.multilingual +
    stt.score.sovereignty * w.sovereignty +
    stt.score.pricing * w.pricing +
    stt.score.streaming * w.streaming
  ) / total;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function WeightSlider({
  label, labelFr, value, onChange, isFr, color, glossaryTerm,
}: {
  label: string; labelFr: string; value: number;
  onChange: (v: number) => void; isFr: boolean; color: string; glossaryTerm?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-700 flex items-center gap-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {isFr ? labelFr : label}
          {glossaryTerm && <GlossaryLink term={glossaryTerm} />}
        </span>
        <span
          className="text-xs font-bold font-mono w-6 text-right"
          style={{ color }}
        >
          {value}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${color} 0%, ${color} ${value * 10}%, #e2e8f0 ${value * 10}%, #e2e8f0 100%)`,
            accentColor: color,
          }}
        />
      </div>
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-lg">🥇</span>;
  if (rank === 2) return <span className="text-lg">🥈</span>;
  if (rank === 3) return <span className="text-lg">🥉</span>;
  return (
    <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 font-mono">
      {rank}
    </span>
  );
}

function ScoreBar({ value, max = 10, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="relative h-1.5 bg-slate-100 rounded-full overflow-hidden flex-1">
      <div
        className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
        style={{ width: `${(value / max) * 100}%`, background: color }}
      />
    </div>
  );
}

function StrategicBadge({ toolId, type }: { toolId: string; type: "tts" | "stt" }) {
  const data = type === "tts" ? ttsStrategicData[toolId] : sttStrategicData[toolId];
  if (!data) return null;
  const lockColors = { high: "#dc2626", medium: "#d97706", low: "#16a34a" };
  const sovColors = { high: "#16a34a", medium: "#d97706", low: "#dc2626" };
  return (
    <div className="flex items-center gap-2 flex-wrap mt-1">
      <span
        className="text-xs px-1.5 py-0.5 rounded font-medium"
        style={{ background: `${sovColors[data.sovereigntyFit]}15`, color: sovColors[data.sovereigntyFit], border: `1px solid ${sovColors[data.sovereigntyFit]}30` }}
      >
        Sov. {data.sovereigntyFit}
      </span>
      <span
        className="text-xs px-1.5 py-0.5 rounded font-medium"
        style={{ background: `${lockColors[data.lockInRisk]}15`, color: lockColors[data.lockInRisk], border: `1px solid ${lockColors[data.lockInRisk]}30` }}
      >
        Lock-in {data.lockInRisk}
      </span>
    </div>
  );
}

// ─── TTS Ranked Card ─────────────────────────────────────────────────────────

function TTSRankedCard({ tts, rank, score, weights, isFr }: {
  tts: TTSData; rank: number; score: number; weights: TTSWeights; isFr: boolean;
}) {
  const accentColor = tts.category === "cloud-api" ? "oklch(0.72 0.18 200)" : "oklch(0.65 0.18 145)";
  const catLabel = tts.category === "cloud-api" ? (isFr ? "API Cloud" : "Cloud API") : "Open Source";

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-300 p-4 ${rank <= 3 ? "shadow-md border-slate-200" : "border-slate-100"}`}
      style={rank === 1 ? { borderColor: "oklch(0.75 0.15 75)", boxShadow: "0 0 0 2px oklch(0.75 0.15 75 / 0.15)" } : {}}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 flex flex-col items-center gap-1 pt-0.5">
          <RankBadge rank={rank} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: accentColor + "22", color: accentColor }}>
                  {catLabel}
                </span>
                <h4 className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {tts.name}
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 leading-snug" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {tts.tagline}
              </p>
              <StrategicBadge toolId={tts.id} type="tts" />
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xl font-bold font-mono" style={{ color: accentColor }}>
                {score.toFixed(1)}
              </div>
              <div className="text-xs text-slate-400">/10</div>
            </div>
          </div>

          {/* Score breakdown */}
          <div className="mt-2 space-y-1">
            {([
              { key: "quality", label: "Quality", labelFr: "Qualité", color: "oklch(0.72 0.18 200)" },
              { key: "latency", label: "Latency", labelFr: "Latence", color: "oklch(0.65 0.18 145)" },
              { key: "voiceCloning", label: "Cloning", labelFr: "Clonage", color: "oklch(0.72 0.18 280)" },
              { key: "sovereignty", label: "Sovereignty", labelFr: "Souveraineté", color: "oklch(0.72 0.18 25)" },
              { key: "pricing", label: "Pricing", labelFr: "Prix", color: "oklch(0.65 0.18 145)" },
            ] as { key: keyof TTSWeights; label: string; labelFr: string; color: string }[]).filter(
              (c) => weights[c.key] > 0
            ).map(({ key, label, labelFr, color }) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-xs text-slate-400 w-16 shrink-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? labelFr : label}
                  <span className="text-slate-300 ml-0.5">×{weights[key]}</span>
                </span>
                <ScoreBar value={tts.score[key as keyof typeof tts.score] as number} color={color} />
                <span className="text-xs font-mono text-slate-500 w-4 text-right">
                  {tts.score[key as keyof typeof tts.score]}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-mono text-slate-400">{tts.ttfaMs}ms TTFA</span>
            {tts.eloScore > 0 && <span className="text-xs font-mono text-amber-600">ELO {tts.eloScore}</span>}
            <span className="text-xs font-mono text-slate-300">{tts.license}</span>
            <div className="ml-auto">
              <InternalLink to={`/tts/${tts.id}`} className="text-xs font-mono text-cyan-600 hover:text-cyan-800 underline">
                {isFr ? "Fiche →" : "Details →"}
              </InternalLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STT Ranked Card ─────────────────────────────────────────────────────────

function STTRankedCard({ stt, rank, score, weights, isFr }: {
  stt: STTData; rank: number; score: number; weights: STTWeights; isFr: boolean;
}) {
  const accentColor = stt.category === "cloud-api" ? "oklch(0.72 0.18 50)" : "oklch(0.65 0.18 145)";
  const catLabel = stt.category === "cloud-api" ? (isFr ? "API Cloud" : "Cloud API") : "Open Source";

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-300 p-4 ${rank <= 3 ? "shadow-md border-slate-200" : "border-slate-100"}`}
      style={rank === 1 ? { borderColor: "oklch(0.75 0.15 50)", boxShadow: "0 0 0 2px oklch(0.75 0.15 50 / 0.15)" } : {}}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 flex flex-col items-center gap-1 pt-0.5">
          <RankBadge rank={rank} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: accentColor + "22", color: accentColor }}>
                  {catLabel}
                </span>
                <h4 className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {stt.name}
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 leading-snug" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {stt.tagline}
              </p>
              <StrategicBadge toolId={stt.id} type="stt" />
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xl font-bold font-mono" style={{ color: accentColor }}>
                {score.toFixed(1)}
              </div>
              <div className="text-xs text-slate-400">/10</div>
            </div>
          </div>

          {/* Score breakdown */}
          <div className="mt-2 space-y-1">
            {([
              { key: "accuracy", label: "Accuracy", labelFr: "Précision", color: "oklch(0.72 0.18 50)" },
              { key: "latency", label: "Latency", labelFr: "Latence", color: "oklch(0.65 0.18 145)" },
              { key: "multilingual", label: "Multilingual", labelFr: "Multilingue", color: "oklch(0.72 0.18 230)" },
              { key: "sovereignty", label: "Sovereignty", labelFr: "Souveraineté", color: "oklch(0.72 0.18 25)" },
              { key: "pricing", label: "Pricing", labelFr: "Prix", color: "oklch(0.65 0.18 145)" },
              { key: "streaming", label: "Streaming", labelFr: "Streaming", color: "oklch(0.72 0.18 200)" },
            ] as { key: keyof STTWeights; label: string; labelFr: string; color: string }[]).filter(
              (c) => weights[c.key] > 0
            ).map(({ key, label, labelFr, color }) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-xs text-slate-400 w-16 shrink-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? labelFr : label}
                  <span className="text-slate-300 ml-0.5">×{weights[key]}</span>
                </span>
                <ScoreBar value={stt.score[key as keyof typeof stt.score] as number} color={color} />
                <span className="text-xs font-mono text-slate-500 w-4 text-right">
                  {stt.score[key as keyof typeof stt.score]}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            {stt.wer > 0 && <span className="text-xs font-mono text-slate-400">WER {stt.wer}%</span>}
            <span className="text-xs font-mono text-slate-400">{stt.latencyMs}ms</span>
            <div className="ml-auto">
              <InternalLink to={`/voice/stt/${stt.id}`} className="text-xs font-mono text-orange-600 hover:text-orange-800 underline">
                {isFr ? "Fiche →" : "Details →"}
              </InternalLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function VoiceScoring() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  // ─ Init from URL if present
  const [mode, setMode] = useState<PipelineMode>(() => getInitialState().mode);
  const [ttsWeights, setTtsWeights] = useState<TTSWeights>(() => getInitialState().ttsWeights);
  const [sttWeights, setSttWeights] = useState<STTWeights>(() => getInitialState().sttWeights);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Detect if loaded from a shared URL
  const [fromUrl] = useState(() => getInitialState().fromUrl);

  // Sync URL on weight changes (replace state, no history entry)
  useEffect(() => {
    const url = encodeWeights(ttsWeights, sttWeights, mode);
    window.history.replaceState(null, "", url);
  }, [ttsWeights, sttWeights, mode]);

  const copyLink = useCallback(() => {
    const url = encodeWeights(ttsWeights, sttWeights, mode);
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [ttsWeights, sttWeights, mode]);

  const allTTS = useMemo(() => getTTSData(), []);
  const allSTT = useMemo(() => getSTTData(), []);

  const rankedTTS = useMemo(() => {
    return [...allTTS]
      .map((t) => ({ tool: t, score: computeTTSScore(t, ttsWeights) }))
      .sort((a, b) => b.score - a.score);
  }, [allTTS, ttsWeights]);

  const rankedSTT = useMemo(() => {
    return [...allSTT]
      .map((s) => ({ tool: s, score: computeSTTScore(s, sttWeights) }))
      .sort((a, b) => b.score - a.score);
  }, [allSTT, sttWeights]);

  function applyPreset(preset: Preset) {
    setTtsWeights(preset.ttsWeights);
    setSttWeights(preset.sttWeights);
    setActivePreset(preset.id);
  }

  function resetWeights() {
    setTtsWeights(DEFAULT_TTS_WEIGHTS);
    setSttWeights(DEFAULT_STT_WEIGHTS);
    setActivePreset(null);
  }

  function updateTTS(key: keyof TTSWeights, value: number) {
    setTtsWeights((prev) => ({ ...prev, [key]: value }));
    setActivePreset(null);
  }

  function updateSTT(key: keyof STTWeights, value: number) {
    setSttWeights((prev) => ({ ...prev, [key]: value }));
    setActivePreset(null);
  }

  const ttsSliders: { key: keyof TTSWeights; label: string; labelFr: string; color: string; glossaryTerm?: string }[] = [
    { key: "quality", label: "Voice Quality", labelFr: "Qualité vocale", color: "oklch(0.72 0.18 200)", glossaryTerm: "ELO Score" },
    { key: "latency", label: "Latency (TTFA)", labelFr: "Latence (TTFA)", color: "oklch(0.65 0.18 145)", glossaryTerm: "TTFA" },
    { key: "voiceCloning", label: "Voice Cloning", labelFr: "Clonage vocal", color: "oklch(0.72 0.18 280)", glossaryTerm: "Voice Cloning" },
    { key: "expressiveness", label: "Expressiveness", labelFr: "Expressivité", color: "oklch(0.72 0.18 50)", glossaryTerm: "Prosody" },
    { key: "sovereignty", label: "Data Sovereignty", labelFr: "Souveraineté données", color: "oklch(0.72 0.18 25)", glossaryTerm: "Sovereignty" },
    { key: "pricing", label: "Cost / Pricing", labelFr: "Coût / Prix", color: "oklch(0.65 0.18 145)" },
    { key: "multilingual", label: "Multilingual", labelFr: "Multilingue", color: "oklch(0.72 0.18 230)" },
  ];

  const sttSliders: { key: keyof STTWeights; label: string; labelFr: string; color: string; glossaryTerm?: string }[] = [
    { key: "accuracy", label: "Accuracy (WER)", labelFr: "Précision (WER)", color: "oklch(0.72 0.18 50)", glossaryTerm: "WER" },
    { key: "latency", label: "Latency (streaming)", labelFr: "Latence (streaming)", color: "oklch(0.65 0.18 145)", glossaryTerm: "TTFA" },
    { key: "multilingual", label: "Multilingual", labelFr: "Multilingue", color: "oklch(0.72 0.18 230)" },
    { key: "sovereignty", label: "Data Sovereignty", labelFr: "Souveraineté données", color: "oklch(0.72 0.18 25)", glossaryTerm: "Sovereignty" },
    { key: "pricing", label: "Cost / Pricing", labelFr: "Coût / Prix", color: "oklch(0.65 0.18 145)" },
    { key: "streaming", label: "Real-time Streaming", labelFr: "Streaming temps réel", color: "oklch(0.72 0.18 200)", glossaryTerm: "Streaming" },
  ];

  const currentWeights = mode === "tts" ? ttsWeights : sttWeights;
  const currentSliders = mode === "tts" ? ttsSliders : sttSliders;

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        {/* Header compact */}
        <div className="mb-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Classement personnalisé des outils Voice" : "Custom Voice Tool Ranking"}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? "Pondérez les critères selon votre contexte et obtenez un classement dynamique TTS / STT."
                  : "Weight criteria to your context and get a dynamic TTS / STT ranking."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {fromUrl && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-violet-50 border border-violet-200 text-xs text-violet-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <Link2 className="w-3 h-3 shrink-0" />
                <span>{isFr ? "Config. partagée" : "Shared config"}</span>
              </div>
            )}
            <button
              onClick={copyLink}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all shrink-0 ${
                copied
                  ? "bg-green-50 border-green-300 text-green-700"
                  : "bg-white border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50"
              }`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {copied
                ? <><Check className="w-3.5 h-3.5" />{isFr ? "Copié !" : "Copied!"}</>
                : <><Link2 className="w-3.5 h-3.5" />{isFr ? "Copier le lien" : "Copy link"}</>}
            </button>
          </div>
        </div>

        {/* Main layout: left panel (presets + mode + sliders) + right results */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,1fr)_2fr] gap-4 items-start">

          {/* ── Left panel: presets + mode + sliders (sticky on md+) ── */}
          <div className="md:sticky md:top-20 space-y-4 md:max-h-[calc(100vh-5.5rem)] md:overflow-y-auto pb-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

              {/* Presets */}
              <div className="p-4 border-b border-slate-100">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Profils prédéfinis" : "Preset Profiles"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        activePreset === preset.id
                          ? "bg-slate-900 text-white border-slate-900 shadow-md"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-white hover:shadow-sm"
                      }`}
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      <span>{preset.icon}</span>
                      <span>{isFr ? preset.labelFr : preset.label}</span>
                    </button>
                  ))}
                  <button
                    onClick={resetWeights}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-all"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <RotateCcw className="w-3 h-3" />
                    {isFr ? "Réinitialiser" : "Reset"}
                  </button>
                </div>
                {activePreset && (
                  <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-500">
                    <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-violet-400" />
                    <span>
                      {isFr
                        ? PRESETS.find((p) => p.id === activePreset)?.descFr
                        : PRESETS.find((p) => p.id === activePreset)?.desc}
                    </span>
                  </div>
                )}
              </div>

              {/* Mode tabs — STT first */}
              <div className="flex border-b border-slate-200">
                {(["stt", "tts"] as PipelineMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors -mb-px ${
                      mode === m
                        ? m === "stt" ? "border-orange-500 text-orange-700 bg-orange-50" : "border-violet-500 text-violet-700 bg-violet-50"
                        : "border-transparent text-slate-500 hover:text-slate-700 bg-white"
                    }`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {m === "stt"
                        ? (isFr ? "STT — Reconnaissance" : "STT — Speech")
                        : (isFr ? "TTS — Synthèse" : "TTS — Voice")}
                      <span className="ml-1 font-mono opacity-50">
                        ({m === "stt" ? allSTT.length : allTTS.length})
                      </span>
                  </button>
                ))}
              </div>

              {/* Sliders */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? "Pondération des critères" : "Criteria Weights"}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">0–10</span>
                </div>
                <div className="space-y-4">
                  {currentSliders.map(({ key, label, labelFr, color, glossaryTerm }) => (
                    <WeightSlider
                      key={key}
                      label={label}
                      labelFr={labelFr}
                      value={currentWeights[key as keyof typeof currentWeights]}
                      onChange={(v) => mode === "tts" ? updateTTS(key as keyof TTSWeights, v) : updateSTT(key as keyof STTWeights, v)}
                      isFr={isFr}
                      color={color}
                      glossaryTerm={glossaryTerm}
                    />
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isFr
                      ? "Chaque critère est noté de 0 à 10. Un poids de 0 exclut le critère du calcul. Le score final est la moyenne pondérée."
                      : "Each criterion is scored 0–10. A weight of 0 excludes the criterion from the calculation. The final score is the weighted average."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Ranked results ── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {mode === "tts"
                  ? (isFr ? `Classement TTS — ${allTTS.length} outils` : `TTS Ranking — ${allTTS.length} tools`)
                  : (isFr ? `Classement STT — ${allSTT.length} outils` : `STT Ranking — ${allSTT.length} tools`)}
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {isFr ? "Trié par score pondéré" : "Sorted by weighted score"}
              </span>
            </div>

            <div className="space-y-3">
              {mode === "tts"
                ? rankedTTS.map(({ tool, score }, i) => (
                    <TTSRankedCard
                      key={tool.id}
                      tts={tool}
                      rank={i + 1}
                      score={score}
                      weights={ttsWeights}
                      isFr={isFr}
                    />
                  ))
                : rankedSTT.map(({ tool, score }, i) => (
                    <STTRankedCard
                      key={tool.id}
                      stt={tool}
                      rank={i + 1}
                      score={score}
                      weights={sttWeights}
                      isFr={isFr}
                    />
                  ))}
            </div>

            {/* Methodology note */}
            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                <span className="font-semibold text-slate-700">{isFr ? "Méthodologie : " : "Methodology: "}</span>
                {isFr
                  ? "Les scores bruts (1–10) sont issus de benchmarks publics (Artificial Analysis ELO, WER Koenecke, TTFA mesurés). La pondération est appliquée via une moyenne pondérée. Les badges souveraineté et lock-in proviennent de l'analyse stratégique GamiWays."
                  : "Raw scores (1–10) are sourced from public benchmarks (Artificial Analysis ELO, Koenecke WER, measured TTFA). Weighting is applied via weighted average. Sovereignty and lock-in badges come from the GamiWays strategic analysis."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
