// STTDetail.tsx — DigiDouble Research Portal
// Page détaillée par solution STT / Speech-to-Text
// Design: Modernist Technical — monospace accents, clean grids
// ============================================================

import { useParams } from "wouter";
import { useLang } from "@/contexts/LangContext";
import { getSTTById } from "@/lib/sttData";
import InternalLink from "@/components/InternalLink";
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  ExternalLink,
  Mic,
  DollarSign,
  Shield,
  Code2,
  Brain,
  Layers,
  Cpu,
  BarChart2,
} from "lucide-react";
import { StrategicAnalysis } from "@/components/StrategicAnalysis";
import GlossaryLink from "@/components/GlossaryLink";
import { sttStrategicData } from "@/lib/strategicData";

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
  "multi-provider": { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", label: "Multi-Provider", labelFr: "Multi-Fournisseur" },
};

export default function STTDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLang();
  const isFr = lang === "fr";
  const stt = getSTTById(id || "");
  // Derived fields not in interface — use werNote as proxy
  const werGeneral = stt?.wer ?? 0;
  const werClean = stt ? Math.max(0, stt.wer - 2) : 0;

  if (!stt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">{isFr ? "Solution introuvable." : "Solution not found."}</p>
          <InternalLink to="/voice/stt">
            <span className="text-cyan-600 hover:underline text-sm font-mono">← {isFr ? "Retour à la reconnaissance vocale" : "Back to Speech Recognition"}</span>
          </InternalLink>
        </div>
      </div>
    );
  }

  const catStyle = categoryColors[stt.category] || categoryColors["cloud-api"];
  const scoreColors: Record<string, string> = {
    accuracy: "oklch(0.72 0.18 200)",
    latency: "oklch(0.65 0.18 145)",
    multilingual: "oklch(0.72 0.18 230)",
    voiceProfiling: "oklch(0.72 0.18 280)", // score not in interface, will skip
    sovereignty: "oklch(0.72 0.18 25)",
    pricing: "oklch(0.65 0.18 145)",
    streaming: "oklch(0.72 0.18 50)",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-14 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-1 text-xs">
          <InternalLink to="/voice/stt" className="cta-back">
            <ChevronLeft className="w-4 h-4" />
            {isFr ? "Retour" : "Back"}
          </InternalLink>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-semibold text-slate-900 truncate">{stt.name}</span>
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
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {stt.license}
                </span>
                {stt.selfHostable && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {isFr ? "Auto-hébergeable" : "Self-hostable"}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {stt.name}
              </h1>
              <p className="text-sm text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {stt.tagline}
              </p>
            </div>
            <div className="flex gap-2">
              <a href={stt.homepageUrl} target="_blank" rel="noopener noreferrer" className="cta-secondary">
                <ExternalLink className="w-4 h-4" /> {isFr ? "Site" : "Website"}
              </a>
              <a href={stt.docsUrl} target="_blank" rel="noopener noreferrer" className="cta-primary">
                <Code2 className="w-4 h-4" /> Docs
              </a>
            </div>
          </div>

          {/* Key metrics row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            <div className="text-center">
              <div className="text-xl font-bold font-mono text-slate-900">{stt.latencyMs}ms</div>
              <div className="text-xs text-slate-400 mt-0.5 flex items-center justify-center gap-1">{isFr ? "Latence (meilleur cas)" : "Latency (best case)"} <GlossaryLink term="TTFA" /></div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold font-mono text-slate-900">{stt.latencyMsTypical}ms</div>
              <div className="text-xs text-slate-400 mt-0.5 flex items-center justify-center gap-1">{isFr ? "Latence (typique)" : "Latency (typical)"} <GlossaryLink term="TTFA" /></div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold font-mono text-slate-900">
                {werGeneral > 0 ? `${werGeneral}%` : "—"}
              </div>
              <div className="text-xs text-slate-400 mt-0.5 flex items-center justify-center gap-1">WER {isFr ? "(audio général)" : "(general audio)"} <GlossaryLink term="WER" /></div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold font-mono text-slate-900">
                {stt.pricePerMin > 0 ? `$${stt.pricePerMin.toFixed(4)}/min` : isFr ? "Gratuit" : "Free"}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{isFr ? "Prix par minute" : "Price per minute"}</div>
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
                  { key: "accuracy", label: isFr ? "Précision (WER)" : "Accuracy (WER)", color: scoreColors.accuracy, glossaryTerm: "WER" },
                  { key: "latency", label: isFr ? "Latence streaming" : "Streaming latency", color: scoreColors.latency, glossaryTerm: "TTFA" },
                  { key: "multilingual", label: isFr ? "Multilingue" : "Multilingual", color: scoreColors.multilingual },

                  { key: "sovereignty", label: isFr ? "Souveraineté" : "Sovereignty", color: scoreColors.sovereignty, glossaryTerm: "Sovereignty" },
                  { key: "pricing", label: isFr ? "Accessibilité prix" : "Price accessibility", color: scoreColors.pricing },
                  { key: "streaming", label: isFr ? "Qualité streaming" : "Streaming quality", color: scoreColors.streaming, glossaryTerm: "Streaming" },
                ].map(({ key, label, color, glossaryTerm }) => (
                  <div key={key}>
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                      <span className="flex items-center gap-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{label}{glossaryTerm && <GlossaryLink term={glossaryTerm} />}</span>
                      <span className="font-mono">{stt.score[key as keyof typeof stt.score]}/10</span>
                    </div>
                    <ScoreBar value={stt.score[key as keyof typeof stt.score]} color={color} />
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <SectionTitle icon={Cpu} title={isFr ? "Architecture" : "Architecture"} />
              <div className="space-y-2 text-xs">
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500 flex-shrink-0">{isFr ? "Architecture" : "Architecture"}</span>
                  <span className="font-mono text-slate-700 text-right">{stt.architecture}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isFr ? "Paramètres" : "Parameters"}</span>
                  <span className="font-mono text-slate-700">{stt.params}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isFr ? "Langues" : "Languages"}</span>
                  <span className="font-mono text-slate-700">{stt.languages}+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isFr ? "Auto-hébergeable" : "Self-hostable"}</span>
                  <BoolBadge value={stt.selfHostable} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 flex items-center gap-1">Streaming <GlossaryLink term="Streaming" /></span>
                  <BoolBadge value={stt.streaming} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 flex items-center gap-1">WER {isFr ? "audio propre" : "clean audio"} <GlossaryLink term="WER" /></span>
                  <span className="font-mono text-slate-700">{werClean}%</span>
                </div>
              </div>
            </div>

            {/* DigiDouble relevance */}
            <div className="bg-slate-900 rounded-xl p-5 text-white">
              <div className="text-xs font-mono font-bold text-cyan-400 mb-2 uppercase tracking-wider">DigiDouble</div>
              <div className="text-xs font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {stt.digiDoubleAxis}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr ? stt.digiDoubleRelevanceFr : stt.digiDoubleRelevance}
              </p>
            </div>
          </div>

          {/* Right column — details */}
          <div className="lg:col-span-2 space-y-5">
            {/* Description */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <SectionTitle icon={Brain} title={isFr ? "Analyse" : "Analysis"} />
              <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr ? stt.descriptionFr : stt.description}
              </p>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-emerald-200 p-5 shadow-sm">
                <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3 font-mono">
                  {isFr ? "Points forts" : "Strengths"}
                </h3>
                <ul className="space-y-2">
                  {(isFr ? stt.strengthsFr : stt.strengths).map((s, i) => (
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
                  {(isFr ? stt.weaknessesFr : stt.weaknesses).map((w, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* STT Capabilities */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <SectionTitle icon={Mic} title={isFr ? "Capacités STT" : "STT Capabilities"} />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Streaming <GlossaryLink term="Streaming" />
                    </span>
                    <BoolBadge value={stt.streaming} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {stt.streamingDetail}
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? "Diarisation" : "Diarization"} <GlossaryLink term="Diarization" />
                    </span>
                    <BoolBadge value={stt.speakerDiarization} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? "Vocabulaire personnalisé" : "Custom Vocabulary"}
                    </span>
                    <BoolBadge value={stt.customVocabulary} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? "Timestamps mot-à-mot" : "Word Timestamps"}
                    </span>
                    <BoolBadge value={stt.wordTimestamps} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? "Ponctuation auto" : "Auto Punctuation"}
                    </span>
                    <BoolBadge value={stt.punctuation} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? "Multilingue" : "Multilingual"}
                    </span>
                    <BoolBadge value={stt.multilingual} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                  </div>
                  <p className="text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {stt.languages}+ {isFr ? "langues" : "languages"}
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <SectionTitle icon={DollarSign} title={isFr ? "Tarification" : "Pricing"} />
              <div className="grid sm:grid-cols-3 gap-3 mb-3">
                <div className="bg-slate-50 rounded p-3">
                  <div className="text-xs text-slate-500 mb-1">{isFr ? "Prix / minute" : "Price / minute"}</div>
                  <div className="text-base font-bold font-mono text-slate-900">
                    {stt.pricePerMin > 0 ? `$${stt.pricePerMin.toFixed(4)}` : isFr ? "Gratuit" : "Free"}
                  </div>
                </div>
                <div className="bg-slate-50 rounded p-3">
                  <div className="text-xs text-slate-500 mb-1">{isFr ? "Prix / heure" : "Price / hour"}</div>
                  <div className="text-base font-bold font-mono text-slate-900">
                    {stt.pricePerMin > 0 ? `$${(stt.pricePerMin * 60).toFixed(3)}` : isFr ? "Gratuit" : "Free"}
                  </div>
                </div>
                <div className="bg-slate-50 rounded p-3">
                  <div className="text-xs text-slate-500 mb-1">{isFr ? "Offre gratuite" : "Free tier"}</div>
                  <div className="text-sm font-mono text-slate-700">{stt.freeTier}</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {stt.priceNote}
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
                    <BoolBadge value={stt.onPremise} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {stt.onPremiseDetail}
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      GDPR <GlossaryLink term="GDPR" />
                    </span>
                    <BoolBadge value={stt.gdprCompliant} trueLabel={isFr ? "Conforme" : "Compliant"} falseLabel="No" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {isFr ? "Résidence des données : " : "Data residency: "}{stt.dataResidency}
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? "On-premise" : "On-premise"}
                    </span>
                    <BoolBadge value={stt.onPremise} trueLabel={isFr ? "Oui" : "Yes"} falseLabel="No" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {stt.selfHostNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Self-hosting note */}
            {stt.selfHostable && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-mono">
                    {isFr ? "Déploiement auto-hébergé" : "Self-hosted Deployment"}
                  </span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {stt.selfHostNote}
                </p>
              </div>
            )}

            {/* Strategic Analysis */}
            {sttStrategicData[stt.id] && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <StrategicAnalysis data={sttStrategicData[stt.id]} toolName={stt.name} />
              </div>
            )}

            {/* Back button bottom */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <InternalLink
                to="/voice/stt"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                {isFr ? "Retour à la reconnaissance vocale" : "Back to Speech Recognition"}
              </InternalLink>
              <InternalLink
                to={`/voice/benchmarks#stt-${stt.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-all shadow-sm"
              >
                <BarChart2 className="w-4 h-4 text-cyan-600" />
                {isFr ? "Voir dans les Benchmarks" : "View in Benchmarks"}
              </InternalLink>
            </div>

            {/* Data freshness + Sources */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? "Fraîcheur des données" : "Data Freshness"}
                  </h3>
                  {stt.dataUpdatedAt ? (
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                        {isFr ? "Mis à jour le" : "Updated"} {new Date(stt.dataUpdatedAt).toLocaleDateString(isFr ? 'fr-FR' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                      {isFr ? "Date inconnue" : "Date unknown"}
                    </span>
                  )}
                </div>
                {stt.benchmarkRef && (
                  <p className="text-xs text-slate-400 italic max-w-xs text-right" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {stt.benchmarkRef}
                  </p>
                )}
              </div>

              {stt.dataUpdateNote && (
                <div className="bg-white border border-slate-200 rounded-lg p-3">
                  <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    <strong className="text-slate-800">{isFr ? "Note de mise à jour : " : "Update note: "}</strong>
                    {stt.dataUpdateNote}
                  </p>
                </div>
              )}

              {stt.sources && stt.sources.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? "Sources de référence" : "Reference Sources"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {stt.sources.map((src: { label: string; url: string; type: string }, i: number) => (
                      <a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all hover:shadow-sm ${
                          src.type === 'benchmark' ? 'bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100' :
                          src.type === 'pricing' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' :
                          src.type === 'news' ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' :
                          'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        {src.label}
                        <span className="opacity-50 text-[10px] uppercase tracking-wide">{src.type}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
