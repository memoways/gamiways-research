// ============================================================
// PlatformDetail.tsx — GamiWays Research Portal
// Page détaillée par plateforme : customisation, API, pricing
// Design: Modernist Technical — monospace accents, clean grids
// ============================================================

import { useParams } from "wouter";
import { useLang } from "@/contexts/LangContext";
import { getPlatform } from "@/lib/platformData";
import InternalLink from "@/components/InternalLink";
import {
  ExternalLink,
  ChevronLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Globe,
  Code2,
  DollarSign,
  Shield,
  Zap,
  Brain,
  Layers,
  Video,
  Cpu,
} from "lucide-react";

const ScoreDot = ({ score, max = 10 }: { score: number; max?: number }) => {
  const pct = (score / max) * 100;
  const color =
    pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-red-400";
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${i < score ? color : "bg-slate-200"}`}
        />
      ))}
      <span className="text-xs text-slate-500 ml-1 font-mono">
        {score}/{max}
      </span>
    </div>
  );
};

const BoolBadge = ({ value, trueLabel = "Yes", falseLabel = "No" }: { value: boolean; trueLabel?: string; falseLabel?: string }) =>
  value ? (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
      <CheckCircle className="w-3 h-3" /> {trueLabel}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
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

export default function PlatformDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLang();
  const platform = getPlatform(id || "");

  if (!platform) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">
            {lang === "fr" ? "Plateforme introuvable." : "Platform not found."}
          </p>
          <InternalLink to="/avatars">
            {lang === "fr" ? "← Retour à l'État de l'Art" : "← Back to State of the Art"}
          </InternalLink>
        </div>
      </div>
    );
  }

  const c = platform.customisation;
  const t = platform.training;
  const a = platform.api;
  const p = platform.pricing;

  const customisationItems = [
    { key: "rag", label: lang === "fr" ? "RAG / Base de connaissances" : "RAG / Knowledge Base", value: c.rag, detail: c.ragDetail },
    { key: "behavior", label: lang === "fr" ? "Comportement & personnalité" : "Behavior & Personality", value: c.behavior, detail: c.behaviorDetail },
    { key: "bodyLanguage", label: lang === "fr" ? "Langage corporel & gestes" : "Body Language & Gestures", value: c.bodyLanguage, detail: c.bodyLanguageDetail },
    { key: "expressions", label: lang === "fr" ? "Expressions faciales" : "Facial Expressions", value: c.expressions, detail: c.expressionsDetail },
    { key: "voice", label: lang === "fr" ? "Voix & clonage vocal" : "Voice & Voice Cloning", value: c.voice, detail: c.voiceDetail },
    { key: "personaFineTuning", label: lang === "fr" ? "Fine-tuning du persona" : "Persona Fine-Tuning", value: c.personaFineTuning, detail: c.personaFineTuningDetail },
  ];

  const sovereigntyColor =
    platform.sovereigntyScore >= 4
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : platform.sovereigntyScore >= 3
      ? "text-amber-700 bg-amber-50 border-amber-200"
      : "text-red-700 bg-red-50 border-red-200";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest">
                  {platform.category}
                </span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded border ${sovereigntyColor}`}>
                  {lang === "fr" ? "Souveraineté" : "Sovereignty"} {platform.sovereigntyScore}/5
                </span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">{platform.name}</h1>
              <p className="text-slate-500 text-lg">{platform.tagline}</p>
            </div>
            <div className="flex gap-3">
              <a
                href={platform.homepageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary"
              >
                <Globe className="w-4 h-4" />
                {lang === "fr" ? "Site web" : "Website"}
              </a>
              <a
                href={platform.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary"
              >
                <Code2 className="w-4 h-4" />
                {lang === "fr" ? "Documentation API" : "API Docs"}
              </a>
            </div>
          </div>

          {/* Key metrics row */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: lang === "fr" ? "Latence TTFR" : "TTFR Latency",
                value: platform.latencyMs >= 10000 ? "Async" : `~${platform.latencyMs}ms`,
                sub: lang === "fr" ? "temps réel" : "real-time",
                color: platform.latencyMs < 300 ? "text-emerald-600" : platform.latencyMs < 600 ? "text-amber-600" : "text-red-500",
              },
              {
                label: lang === "fr" ? "Coût / minute" : "Cost / minute",
                value: platform.latencyMs >= 10000 ? "~$2+/min" : `$${platform.costPerMin.toFixed(3)}/min`,
                sub: lang === "fr" ? "temps réel" : "real-time",
                color: "text-slate-900",
              },
              {
                label: lang === "fr" ? "Qualité visuelle" : "Visual Quality",
                value: `${platform.qualityScore}/10`,
                sub: lang === "fr" ? "score estimé" : "estimated score",
                color: "text-slate-900",
              },
              {
                label: lang === "fr" ? "Protocoles" : "Protocols",
                value: platform.protocol.join(", "),
                sub: "",
                color: "text-slate-600",
              },
            ].map((m) => (
              <div key={m.label} className="bg-white border border-slate-200 rounded-lg p-4">
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-1">{m.label}</p>
                <p className={`text-xl font-bold font-mono ${m.color}`}>{m.value}</p>
                {m.sub && <p className="text-xs text-slate-400 mt-0.5">{m.sub}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Grid layout */}
        <div className="space-y-8">

          {/* 1. Avatar Customisation */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <SectionTitle icon={Brain} title={lang === "fr" ? "Personnalisation de l'avatar" : "Avatar Customisation"} />
            <div className="space-y-4">
              {customisationItems.map((item) => (
                <div key={item.key} className="flex gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="flex-shrink-0 pt-0.5">
                    {item.value ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-300" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 mb-1">{item.label}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Video Training */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <SectionTitle icon={Video} title={lang === "fr" ? "Entraînement de l'avatar" : "Avatar Training"} />
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                {[
                  { label: lang === "fr" ? "Vidéo requise" : "Video required", value: <BoolBadge value={t.videoRequired} trueLabel={lang === "fr" ? "Oui" : "Yes"} falseLabel={lang === "fr" ? "Non (image suffisante)" : "No (image sufficient)"} /> },
                  { label: lang === "fr" ? "Durée" : "Duration", value: <span className="text-sm font-mono text-slate-800">{t.videoDuration}</span> },
                  { label: lang === "fr" ? "Résolution" : "Resolution", value: <span className="text-sm font-mono text-slate-800">{t.videoResolution}</span> },
                  { label: lang === "fr" ? "Format" : "Format", value: <span className="text-sm font-mono text-slate-800">{t.videoFormat}</span> },
                  { label: lang === "fr" ? "Consentement requis" : "Consent required", value: <BoolBadge value={t.consentRequired} trueLabel={lang === "fr" ? "Oui (obligatoire)" : "Yes (mandatory)"} falseLabel={lang === "fr" ? "Non" : "No"} /> },
                  { label: lang === "fr" ? "Temps de traitement" : "Processing time", value: <span className="text-sm font-mono text-slate-800">{t.trainingTime}</span> },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-slate-500">{row.label}</span>
                    {row.value}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  {lang === "fr" ? "Bonnes pratiques" : "Best Practices"}
                </p>
                <ul className="space-y-2">
                  {t.bestPractices.map((bp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-slate-400 font-mono text-xs mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, "0")}.</span>
                      {bp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 3. API Analysis */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <SectionTitle icon={Code2} title={lang === "fr" ? "Analyse API" : "API Analysis"} />
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    {lang === "fr" ? "Protocoles" : "Protocols"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {a.protocols.map((proto) => (
                      <span key={proto} className="text-xs font-mono font-medium px-2 py-1 bg-slate-100 text-slate-700 rounded">
                        {proto}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">SDKs</p>
                  <div className="flex flex-wrap gap-2">
                    {a.sdks.map((sdk) => (
                      <span key={sdk} className="text-xs font-mono font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded border border-blue-100">
                        {sdk}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Webhooks</span>
                  <BoolBadge value={a.webhooks} />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                    {lang === "fr" ? "Sessions simultanées" : "Concurrent Sessions"}
                  </p>
                  <p className="text-sm text-slate-700 font-mono">{a.concurrentSessions}</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                    {lang === "fr" ? "Limites de débit" : "Rate Limits"}
                  </p>
                  <p className="text-sm text-slate-700">{a.rateLimits}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    {lang === "fr" ? "Fonctionnalités clés" : "Key Features"}
                  </p>
                  <ul className="space-y-1.5">
                    {a.keyFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    {lang === "fr" ? "Contraintes API" : "API Constraints"}
                  </p>
                  <ul className="space-y-1.5">
                    {a.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Pricing */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <SectionTitle icon={DollarSign} title={lang === "fr" ? "Modèle tarifaire" : "Pricing Model"} />
            <div className="mb-4">
              <span className="text-sm text-slate-600">
                {lang === "fr" ? "Modèle : " : "Model: "}
                <strong>{p.model}</strong>
              </span>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 pr-4 text-xs font-mono text-slate-400 uppercase tracking-wider">
                      {lang === "fr" ? "Plan" : "Plan"}
                    </th>
                    <th className="text-left py-2 pr-4 text-xs font-mono text-slate-400 uppercase tracking-wider">
                      {lang === "fr" ? "Prix" : "Price"}
                    </th>
                    <th className="text-left py-2 pr-4 text-xs font-mono text-slate-400 uppercase tracking-wider">
                      {lang === "fr" ? "Minutes incluses" : "Included minutes"}
                    </th>
                    <th className="text-left py-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
                      {lang === "fr" ? "Dépassement" : "Overage"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {p.tiers.map((tier) => (
                    <tr key={tier.name} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-2.5 pr-4 font-medium text-slate-800">{tier.name}</td>
                      <td className="py-2.5 pr-4 font-mono text-slate-700">{tier.price}</td>
                      <td className="py-2.5 pr-4 text-slate-600">{tier.minutes}</td>
                      <td className="py-2.5 text-slate-600">{tier.overage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <BoolBadge value={p.freeTier} trueLabel={lang === "fr" ? "Offre gratuite" : "Free tier"} falseLabel={lang === "fr" ? "Pas d'offre gratuite" : "No free tier"} />
              </div>
              <div className="flex items-center gap-2">
                <BoolBadge value={platform.onPremise} trueLabel={lang === "fr" ? "On-premise disponible" : "On-premise available"} falseLabel={lang === "fr" ? "Cloud uniquement" : "Cloud only"} />
              </div>
              <div className="flex items-center gap-2">
                <BoolBadge value={p.enterpriseCustom} trueLabel={lang === "fr" ? "Tarif Enterprise" : "Enterprise pricing"} falseLabel="N/A" />
              </div>
            </div>
            {p.hiddenCosts.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-xs font-mono font-semibold text-amber-700 uppercase tracking-wider mb-2">
                  {lang === "fr" ? "Coûts cachés / à surveiller" : "Hidden costs / watch out"}
                </p>
                <ul className="space-y-1">
                  {p.hiddenCosts.map((hc, i) => (
                    <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {hc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 5. Sovereignty & Hosting */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <SectionTitle icon={Shield} title={lang === "fr" ? "Souveraineté & Hébergement" : "Sovereignty & Hosting"} />
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                    {lang === "fr" ? "Score de souveraineté" : "Sovereignty Score"}
                  </p>
                  <ScoreDot score={platform.sovereigntyScore} max={5} />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                    {lang === "fr" ? "Hébergement" : "Hosting"}
                  </p>
                  <p className="text-sm text-slate-700">{platform.hosting}</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">GDPR</p>
                    <BoolBadge value={platform.gdpr} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">On-premise</p>
                    <BoolBadge value={platform.onPremise} />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  {lang === "fr" ? "Détail souveraineté" : "Sovereignty detail"}
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">{platform.sovereigntyNote}</p>
              </div>
            </div>
          </div>

          {/* 6. General Constraints */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <SectionTitle icon={AlertCircle} title={lang === "fr" ? "Contraintes & Limites" : "Constraints & Limits"} />
            <ul className="grid sm:grid-cols-2 gap-3">
              {platform.constraints.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* 7. GamiWays Relevance */}
          <div className="bg-slate-900 text-white rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm font-bold uppercase tracking-widest font-mono text-slate-300">
                {lang === "fr" ? "Pertinence pour GamiWays" : "GamiWays Relevance"}
              </h2>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <p className="text-xs text-slate-400 font-mono mb-1">
                  {lang === "fr" ? "Score" : "Score"}
                </p>
                <p className="text-4xl font-bold text-white font-mono">
                  {platform.digiDoubleScore}
                  <span className="text-xl text-slate-400">/10</span>
                </p>
              </div>
              <p className="text-slate-300 leading-relaxed">{platform.digiDoubleRelevance}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700 flex gap-4">
              <InternalLink to="/avatars" className="text-slate-400 hover:text-white text-sm transition-colors">
                {lang === "fr" ? "← Retour à l'État de l'Art" : "← Back to State of the Art"}
              </InternalLink>
              <InternalLink to="/research" className="text-slate-400 hover:text-white text-sm transition-colors">
                {lang === "fr" ? "Défis de Recherche →" : "Research Challenges →"}
              </InternalLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
