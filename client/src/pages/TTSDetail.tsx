// ============================================================
// TTSDetail.tsx — DigiDouble Research Portal
// Page détaillée par solution TTS / Voice-to-Voice
// Design: Modernist Technical — monospace accents, clean grids
// ============================================================

import { useParams } from "wouter";
import { useLang } from "@/contexts/LangContext";
import { getTTSById } from "@/lib/ttsData";
import InternalLink from "@/components/InternalLink";
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  ExternalLink,
  Mic,
  Zap,
  DollarSign,
  Shield,
  Globe,
  Code2,
  Brain,
  Layers,
  Radio,
  Cpu,
} from "lucide-react";
import { StrategicAnalysis } from "@/components/StrategicAnalysis";
import { ttsStrategicData } from "@/lib/strategicData";

const ScoreBar = ({ value, max = 10, color }: { value: number; max?: number; color: string }) => (
  <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
    <div
      className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
      style={{ width: `${(value / max) * 100}%`, background: color }}
    />
  </div>
);

const ScoreDots = ({ score, max = 10, color }: { score: number; max?: number; color: string }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: max }).map((_, i) => (
      <div
        key={i}
        className="w-2 h-2 rounded-full transition-all"
        style={{ background: i < score ? color : "oklch(0.92 0 0)" }}
      />
    ))}
    <span className="text-xs text-slate-400 ml-1 font-mono">{score}/{max}</span>
  </div>
);

const BoolBadge = ({ value, trueLabel = "Yes", falseLabel = "No" }: { value: boolean; trueLabel?: string; falseLabel?: string }) =>
  value ? (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
      <CheckCircle className="w-3 h-3" /> {trueLabel}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
      <XCircle className="w-3 h-3" /> {falseLabel}
    </span>
  );

const SectionTitle = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center flex-shrink-0">
      <Icon className="w-4 h-4 text-white" />
    </div>
    <h2 className="text-base font-bold text-slate-900 uppercase tracking-widest font-mono">
      {title}
    </h2>
  </div>
);

const categoryColors: Record<string, { bg: string; text: string; border: string; label: string; labelFr: string }> = {
  "cloud-api": { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200", label: "Cloud API", labelFr: "API Cloud" },
  "open-source": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", label: "Open Source", labelFr: "Open Source" },
  "voice-to-voice": { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", label: "Voice-to-Voice", labelFr: "Voix-à-Voix" },
};

export default function TTSDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLang();
  const isFr = lang === "fr";
  const tts = getTTSById(id || "");

  if (!tts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">{isFr ? "Solution introuvable." : "Solution not found."}</p>
          <InternalLink to="/voice/tts">
            <span className="text-cyan-600 hover:underline text-sm font-mono">← {isFr ? "Retour à l'État de l'Art" : "Back to State of the Art"}</span>
          </InternalLink>
        </div>
      </div>
    );
  }

  const catStyle = categoryColors[tts.category] || categoryColors["cloud-api"];
  const scoreColors: Record<string, string> = {
    quality: "oklch(0.72 0.18 200)",
    latency: "oklch(0.65 0.18 145)",
    voiceCloning: "oklch(0.72 0.18 280)",
    expressiveness: "oklch(0.72 0.18 50)",
    sovereignty: "oklch(0.72 0.18 25)",
    pricing: "oklch(0.65 0.18 145)",
    multilingual: "oklch(0.72 0.18 230)",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-14 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <InternalLink
            to="/voice/tts"
            className="cta-back"
          >
            <ChevronLeft className="w-4 h-4" />
            {isFr ? "Retour" : "Back"}
          </InternalLink>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-mono text-slate-500 hidden sm:block">
            {isFr ? "État de l'Art" : "State of the Art"}
          </span>
          <span className="text-slate-300 hidden sm:block">/</span>
          <span className="text-sm font-semibold text-slate-900 truncate">{tts.name}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
                  {isFr ? catStyle.labelFr : catStyle.label}
                </span>
                {tts.eloRank > 0 && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                    #{tts.eloRank} Artificial Analysis
                  </span>
                )}
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {tts.license}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {tts.name}
              </h1>
              <p className="text-sm text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {tts.tagline}
              </p>
            </div>
            <div className="flex gap-2">
              <a href={tts.homepageUrl} target="_blank" rel="noopener noreferrer"
                className="cta-secondary">
                <ExternalLink className="w-4 h-4" /> {isFr ? "Site" : "Website"}
              </a>
              <a href={tts.docsUrl} target="_blank" rel="noopener noreferrer"
                className="cta-primary">
                <Code2 className="w-4 h-4" /> Docs
              </a>
            </div>
          </div>

          {/* Key metrics row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            <div className="text-center">
              <div className="text-xl font-bold font-mono text-slate-900">{tts.ttfaMs}ms</div>
              <div className="text-xs text-slate-400 mt-0.5">{isFr ? "TTFA (meilleur cas)" : "TTFA (best case)"}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold font-mono text-slate-900">{tts.ttfaMsTypical}ms</div>
              <div className="text-xs text-slate-400 mt-0.5">{isFr ? "TTFA (typique)" : "TTFA (typical)"}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold font-mono text-slate-900">
                {tts.pricePerMChar > 0 ? `$${tts.pricePerMChar}/1M` : isFr ? "Gratuit" : "Free"}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{isFr ? "Prix par million de chars" : "Price per million chars"}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold font-mono text-slate-900">
                {tts.eloScore > 0 ? tts.eloScore : "—"}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">ELO Score</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column — scores + specs */}
          <div className="space-y-5">
            {/* Scores */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <SectionTitle icon={Layers} title={isFr ? "Scores comparatifs" : "Comparative Scores"} />
              <div className="space-y-3">
                {[
                  { key: "quality", label: isFr ? "Qualité vocale" : "Voice quality", color: scoreColors.quality },
                  { key: "latency", label: isFr ? "Latence" : "Latency", color: scoreColors.latency },
                  { key: "voiceCloning", label: isFr ? "Clonage vocal" : "Voice cloning", color: scoreColors.voiceCloning },
                  { key: "expressiveness", label: isFr ? "Expressivité" : "Expressiveness", color: scoreColors.expressiveness },
                  { key: "sovereignty", label: isFr ? "Souveraineté" : "Sovereignty", color: scoreColors.sovereignty },
                  { key: "pricing", label: isFr ? "Accessibilité prix" : "Price accessibility", color: scoreColors.pricing },
                  { key: "multilingual", label: isFr ? "Multilingue" : "Multilingual", color: scoreColors.multilingual },
                ].map(({ key, label, color }) => (
                  <div key={key}>
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{label}</span>
                      <span className="font-mono">{tts.score[key as keyof typeof tts.score]}/10</span>
                    </div>
                    <ScoreBar value={tts.score[key as keyof typeof tts.score]} color={color} />
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <SectionTitle icon={Cpu} title={isFr ? "Architecture" : "Architecture"} />
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">{isFr ? "Architecture" : "Architecture"}</span>
                  <span className="font-mono text-slate-700 text-right max-w-[60%]">{tts.architecture}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isFr ? "Paramètres" : "Parameters"}</span>
                  <span className="font-mono text-slate-700">{tts.params}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isFr ? "Langues" : "Languages"}</span>
                  <span className="font-mono text-slate-700">{tts.languages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isFr ? "Auto-hébergeable" : "Self-hostable"}</span>
                  <BoolBadge value={tts.selfHostable} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Streaming</span>
                  <BoolBadge value={tts.streaming} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                </div>
              </div>
            </div>

            {/* DigiDouble relevance */}
            <div className="bg-slate-900 rounded-xl p-5 text-white">
              <div className="text-xs font-mono font-bold text-cyan-400 mb-2 uppercase tracking-wider">DigiDouble</div>
              <div className="text-xs font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {tts.digiDoubleAxis}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr ? tts.digiDoubleRelevanceFr : tts.digiDoubleRelevance}
              </p>
            </div>
          </div>

          {/* Right column — details */}
          <div className="lg:col-span-2 space-y-5">
            {/* Description */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <SectionTitle icon={Brain} title={isFr ? "Analyse" : "Analysis"} />
              <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr ? tts.descriptionFr : tts.description}
              </p>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-emerald-200 p-5 shadow-sm">
                <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3 font-mono">
                  {isFr ? "Points forts" : "Strengths"}
                </h3>
                <ul className="space-y-2">
                  {(isFr ? tts.strengthsFr : tts.strengths).map((s, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl border border-red-200 p-5 shadow-sm">
                <h3 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3 font-mono">
                  {isFr ? "Limitations" : "Weaknesses"}
                </h3>
                <ul className="space-y-2">
                  {(isFr ? tts.weaknessesFr : tts.weaknesses).map((w, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Capabilities */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <SectionTitle icon={Mic} title={isFr ? "Capacités vocales" : "Voice Capabilities"} />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? "Clonage vocal" : "Voice Cloning"}
                    </span>
                    <BoolBadge value={tts.voiceCloning} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {tts.voiceCloningDetail}
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? "Contrôle émotion" : "Emotion Control"}
                    </span>
                    <BoolBadge value={tts.emotionControl} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {tts.emotionDetail}
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Streaming
                    </span>
                    <BoolBadge value={tts.streaming} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {tts.streamingDetail}
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? "Données lip-sync" : "Lip-sync Data"}
                    </span>
                    <BoolBadge value={tts.lipsyncData} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {tts.lipsyncDetail}
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <SectionTitle icon={DollarSign} title={isFr ? "Tarification" : "Pricing"} />
              <div className="grid sm:grid-cols-3 gap-3 mb-3">
                <div className="bg-slate-50 rounded p-3">
                  <div className="text-xs text-slate-500 mb-1">{isFr ? "Prix / 1M chars" : "Price / 1M chars"}</div>
                  <div className="text-base font-bold font-mono text-slate-900">
                    {tts.pricePerMChar > 0 ? `$${tts.pricePerMChar}` : isFr ? "Gratuit" : "Free"}
                  </div>
                </div>
                <div className="bg-slate-50 rounded p-3">
                  <div className="text-xs text-slate-500 mb-1">{isFr ? "Prix / minute" : "Price / minute"}</div>
                  <div className="text-base font-bold font-mono text-slate-900">
                    {tts.pricePerMin > 0 ? `$${tts.pricePerMin.toFixed(4)}` : isFr ? "Gratuit" : "Free"}
                  </div>
                </div>
                <div className="bg-slate-50 rounded p-3">
                  <div className="text-xs text-slate-500 mb-1">{isFr ? "Offre gratuite" : "Free tier"}</div>
                  <div className="text-sm font-mono text-slate-700">{tts.freeTier}</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {tts.priceNote}
              </p>
            </div>

            {/* Sovereignty */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <SectionTitle icon={Shield} title={isFr ? "Souveraineté & Conformité" : "Sovereignty & Compliance"} />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? "On-premise" : "On-premise"}
                    </span>
                    <BoolBadge value={tts.onPremise} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {tts.onPremiseDetail}
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      GDPR
                    </span>
                    <BoolBadge value={tts.gdprCompliant} trueLabel={isFr ? "Conforme" : "Compliant"} falseLabel="No" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {isFr ? "Résidence des données : " : "Data residency: "}{tts.dataResidency}
                  </p>
                </div>
              </div>
            </div>

            {/* Strategic Analysis */}
            {ttsStrategicData[tts.id] && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <StrategicAnalysis data={ttsStrategicData[tts.id]} toolName={tts.name} />
              </div>
            )}

            {/* Back button bottom */}
            <div className="flex items-center justify-between pt-2">
              <InternalLink
                to="/voice/tts"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                {isFr ? "Retour à l'État de l'Art" : "Back to State of the Art"}
              </InternalLink>
            </div>

            {/* Benchmark reference */}
            {tts.benchmarkRef && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs text-amber-700" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  <strong>{isFr ? "Source benchmark : " : "Benchmark source: "}</strong>{tts.benchmarkRef}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

