/**
 * StrategicAnalysis.tsx — DigiDouble Research Portal
 * Composant d'analyse stratégique et business pour les outils Voice Pipeline
 * Design: Space Grotesk, dark slate sections, accent amber/teal
 * Inspired by: Rokosbas "ElevenLabs Goes Off-Cloud" (April 2026)
 */
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import {
  Shield,
  TrendingUp,
  AlertTriangle,
  Target,
  Building2,
  Zap,
  Lock,
  Globe,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import type { StrategicData } from "@/lib/strategicData";

// Re-export for backward compat
export type { StrategicData };

// Legacy local interface kept for type safety — now replaced by import above
interface _LegacyStrategicData {
  // A. Strategic Positioning
  infrastructureSpectrum: "cloud-only" | "cloud-vpc" | "cloud-onpremise" | "full-spectrum" | "open-source";
  targetCustomer: string; // e.g. "Developer / SMB"
  coreValueProp: string;  // 1-2 sentences
  coreValuePropFr: string;
  // B. Competitive Moat
  moatFactors: string[];      // 2-3 bullet points
  moatFactorsFr: string[];
  mainVulnerability: string;
  mainVulnerabilityFr: string;
  // C. Regulatory & Sovereignty
  dataResidencyOptions: string[];  // e.g. ["US", "EU", "India"]
  complianceCerts: string[];       // e.g. ["SOC2", "HIPAA", "GDPR"]
  onPremiseAvailable: boolean;
  onPremiseTier: string;           // e.g. "Enterprise only", "All plans", "N/A"
  euAiActNote: string;
  euAiActNoteFr: string;
  // D. Go-to-Market & Business Model
  pricingModel: string;            // e.g. "Usage-based (credits)", "Subscription + usage"
  keyPartnerships: string[];       // e.g. ["Google Cloud", "IBM WatsonX"]
  fundingStage: string;            // e.g. "Series D — $500M (Feb 2026)", "Open-source / no funding"
  recentMoves: string[];           // 2-3 recent strategic moves
  recentMovesFr: string[];
  // E. DigiDouble Strategic Questions
  sovereigntyFit: "high" | "medium" | "low";
  sovereigntyNote: string;
  sovereigntyNoteFr: string;
  lockInRisk: "high" | "medium" | "low";
  lockInNote: string;
  lockInNoteFr: string;
  buildVsBuy: string;
  buildVsBuyFr: string;
  roadmapAlignment: string;
  roadmapAlignmentFr: string;
  // F. Market Dynamics
  openSourceThreat: "high" | "medium" | "low";
  openSourceNote: string;
  openSourceNoteFr: string;
  pricingTrajectory: "rising" | "stable" | "falling" | "commoditizing";
  acquisitionSignal: string;
  acquisitionSignalFr: string;
  // Headline
  headlineInsight: string;
  headlineInsightFr: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _Unused = _LegacyStrategicData;

interface Props {
  data: StrategicData;
  toolName: string;
}

const SPECTRUM_LABELS: Record<string, { label: string; labelFr: string; color: string }> = {
  "cloud-only":       { label: "Cloud SaaS only",          labelFr: "Cloud SaaS uniquement",     color: "bg-blue-100 text-blue-800" },
  "cloud-vpc":        { label: "Cloud + VPC",               labelFr: "Cloud + VPC",               color: "bg-indigo-100 text-indigo-800" },
  "cloud-onpremise":  { label: "Cloud + On-premise",        labelFr: "Cloud + On-premise",        color: "bg-violet-100 text-violet-800" },
  "full-spectrum":    { label: "Full spectrum (cloud → on-device)", labelFr: "Spectre complet (cloud → on-device)", color: "bg-emerald-100 text-emerald-800" },
  "open-source":      { label: "Open-source / self-hosted", labelFr: "Open-source / auto-hébergé", color: "bg-teal-100 text-teal-800" },
};

const RISK_COLORS = {
  high:   "text-red-600 bg-red-50 border-red-200",
  medium: "text-amber-600 bg-amber-50 border-amber-200",
  low:    "text-emerald-600 bg-emerald-50 border-emerald-200",
};

const RISK_LABELS = {
  high:   { en: "High", fr: "Élevé" },
  medium: { en: "Medium", fr: "Moyen" },
  low:    { en: "Low", fr: "Faible" },
};

const TRAJECTORY_LABELS = {
  rising:        { en: "Rising ↑", fr: "En hausse ↑", color: "text-red-600" },
  stable:        { en: "Stable →", fr: "Stable →", color: "text-slate-600" },
  falling:       { en: "Falling ↓", fr: "En baisse ↓", color: "text-emerald-600" },
  commoditizing: { en: "Commoditizing ↓↓", fr: "Commoditisation ↓↓", color: "text-amber-600" },
};

function MarkdownBullets({ text }: { text: string }) {
  const lines = text.split("\n").filter(l => l.trim());
  return (
    <ul className="space-y-1.5">
      {lines.map((line, i) => {
        const clean = line.replace(/^[-•*]\s*/, "").trim();
        if (!clean) return null;
        return (
          <li key={i} className="flex gap-2 text-sm text-slate-700 leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
            <span>{clean}</span>
          </li>
        );
      })}
    </ul>
  );
}

function RiskBadge({ level, lang }: { level: "high" | "medium" | "low"; lang: "en" | "fr" }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${RISK_COLORS[level]}`}>
      {RISK_LABELS[level][lang]}
    </span>
  );
}

export function StrategicAnalysis({ data, toolName }: Props) {
  const { lang: langCode } = useLang();
  const isFr = langCode === "fr";
  const lang = langCode;
  const [expanded, setExpanded] = useState(false);

  const spectrum = SPECTRUM_LABELS[data.infrastructureSpectrum] ?? SPECTRUM_LABELS["cloud-only"];
  const trajectory = TRAJECTORY_LABELS[data.pricingTrajectory];

  return (
    <section className="mt-10 border-t border-slate-200 pt-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">
              {isFr ? "Analyse stratégique & business" : "Strategic & Business Analysis"}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? `Positionnement de ${toolName}` : `${toolName} — Strategic Positioning`}
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            {isFr
              ? "Au-delà des specs techniques : où se positionne cet outil dans l'écosystème, quels sont les risques et les enjeux stratégiques pour DigiDouble ?"
              : "Beyond technical specs: where does this tool sit in the ecosystem, what are the risks and strategic implications for DigiDouble?"}
          </p>
        </div>
      </div>

      {/* Headline Insight */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <div className="flex gap-3">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-amber-900 leading-relaxed">
            {isFr ? data.headlineInsightFr : data.headlineInsight}
          </p>
        </div>
      </div>

      {/* Quick Badges Row */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-slate-400" />
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${spectrum.color}`}>
            {isFr ? spectrum.labelFr : spectrum.label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-600">
            {isFr ? "Risque lock-in :" : "Lock-in risk:"}
          </span>
          <RiskBadge level={data.lockInRisk} lang={lang} />
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-600">
            {isFr ? "Souveraineté :" : "Sovereignty fit:"}
          </span>
          <RiskBadge level={data.sovereigntyFit} lang={lang} />
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-600">
            {isFr ? "Menace open-source :" : "Open-source threat:"}
          </span>
          <RiskBadge level={data.openSourceThreat} lang={lang} />
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-600">
            {isFr ? "Prix :" : "Pricing:"}
          </span>
          <span className={`text-xs font-semibold ${trajectory.color}`}>
            {isFr ? trajectory.fr : trajectory.en}
          </span>
        </div>
      </div>

      {/* Main Grid — always visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* A. Strategic Positioning */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-semibold text-slate-800">
              {isFr ? "A. Positionnement stratégique" : "A. Strategic Positioning"}
            </h3>
          </div>
          <p className="text-sm text-slate-600 mb-2 leading-relaxed">
            <span className="font-medium text-slate-700">
              {isFr ? "Client cible : " : "Target customer: "}
            </span>
            {data.targetCustomer}
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            {isFr ? data.coreValuePropFr : data.coreValueProp}
          </p>
        </div>

        {/* B. Competitive Moat */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-800">
              {isFr ? "B. Avantage concurrentiel" : "B. Competitive Moat"}
            </h3>
          </div>
          <MarkdownBullets text={(isFr ? data.moatFactorsFr : data.moatFactors).join("\n")} />
          <div className="mt-3 pt-3 border-t border-slate-200">
            <div className="flex gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">
                <span className="font-semibold">{isFr ? "Vulnérabilité : " : "Vulnerability: "}</span>
                {isFr ? data.mainVulnerabilityFr : data.mainVulnerability}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DigiDouble Strategic Questions — always visible */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="w-4 h-4 text-teal-700" />
          <h3 className="text-sm font-semibold text-teal-800">
            {isFr ? "E. Questions stratégiques pour DigiDouble" : "E. Strategic Questions for DigiDouble"}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-teal-700 mb-1">
              {isFr ? "Fit souveraineté" : "Sovereignty fit"}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {isFr ? data.sovereigntyNoteFr : data.sovereigntyNote}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-teal-700 mb-1">
              {isFr ? "Build vs. Buy" : "Build vs. Buy"}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {isFr ? data.buildVsBuyFr : data.buildVsBuy}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-teal-700 mb-1">
              {isFr ? "Risque de lock-in" : "Lock-in risk"}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {isFr ? data.lockInNoteFr : data.lockInNote}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-teal-700 mb-1">
              {isFr ? "Alignement roadmap" : "Roadmap alignment"}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {isFr ? data.roadmapAlignmentFr : data.roadmapAlignment}
            </p>
          </div>
        </div>
      </div>

      {/* Expandable: C, D, F */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-4"
      >
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {expanded
          ? (isFr ? "Masquer les détails (réglementaire, GTM, dynamiques marché)" : "Hide details (regulatory, GTM, market dynamics)")
          : (isFr ? "Voir les détails (réglementaire, GTM, dynamiques marché)" : "Show details (regulatory, GTM, market dynamics)")}
      </button>

      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* C. Regulatory */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-violet-600" />
              <h3 className="text-sm font-semibold text-slate-800">
                {isFr ? "C. Réglementaire & Souveraineté" : "C. Regulatory & Sovereignty"}
              </h3>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">
                  {isFr ? "Résidence des données" : "Data residency"}
                </p>
                <div className="flex flex-wrap gap-1">
                  {data.dataResidencyOptions.map(r => (
                    <span key={r} className="text-xs bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600">{r}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">
                  {isFr ? "Certifications" : "Certifications"}
                </p>
                <div className="flex flex-wrap gap-1">
                  {data.complianceCerts.length > 0
                    ? data.complianceCerts.map(c => (
                        <span key={c} className="text-xs bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-emerald-700">{c}</span>
                      ))
                    : <span className="text-xs text-slate-400">{isFr ? "Non certifié" : "Not certified"}</span>
                  }
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">
                  {isFr ? "On-premise" : "On-premise"}
                </p>
                <p className="text-xs text-slate-600">{data.onPremiseTier}</p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <p className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-700">EU AI Act: </span>
                  {isFr ? data.euAiActNoteFr : data.euAiActNote}
                </p>
              </div>
            </div>
          </div>

          {/* D. GTM & Business Model */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-semibold text-slate-800">
                {isFr ? "D. Go-to-Market & Business" : "D. Go-to-Market & Business"}
              </h3>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">
                  {isFr ? "Modèle tarifaire" : "Pricing model"}
                </p>
                <p className="text-xs text-slate-600">{data.pricingModel}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">
                  {isFr ? "Financement" : "Funding"}
                </p>
                <p className="text-xs text-slate-600">{data.fundingStage}</p>
              </div>
              {data.keyPartnerships.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">
                    {isFr ? "Partenariats clés" : "Key partnerships"}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {data.keyPartnerships.map(p => (
                      <span key={p} className="text-xs bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600">{p}</span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">
                  {isFr ? "Mouvements récents" : "Recent moves"}
                </p>
                <MarkdownBullets text={(isFr ? data.recentMovesFr : data.recentMoves).join("\n")} />
              </div>
            </div>
          </div>

          {/* F. Market Dynamics */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-orange-600" />
              <h3 className="text-sm font-semibold text-slate-800">
                {isFr ? "F. Dynamiques de marché 2025–2026" : "F. Market Dynamics 2025–2026"}
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">
                  {isFr ? "Menace open-source" : "Open-source threat"}
                </p>
                <div className="flex items-center gap-2 mb-1">
                  <RiskBadge level={data.openSourceThreat} lang={lang} />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isFr ? data.openSourceNoteFr : data.openSourceNote}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">
                  {isFr ? "Trajectoire des prix" : "Pricing trajectory"}
                </p>
                <span className={`text-sm font-semibold ${trajectory.color}`}>
                  {isFr ? trajectory.fr : trajectory.en}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-500 mb-1">
                  {isFr ? "Signaux M&A" : "M&A signals"}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isFr ? data.acquisitionSignalFr : data.acquisitionSignal}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
