// ============================================================
// PricingComparison.tsx — DigiDouble Research Portal
// Comparaison tarifaire en $/minute de toutes les plateformes
// Design: Modernist Technical — monospace accents, clean grids
// ============================================================

import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { platforms } from "@/lib/platformData";
import InternalLink from "@/components/InternalLink";
import { Link } from "wouter";
import {
  DollarSign,
  ArrowUpDown,
  Shield,
  Zap,
  ExternalLink,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";

type SortKey = "costPerMin" | "latencyMs" | "sovereigntyScore" | "qualityScore" | "digiDoubleScore";

export default function PricingComparison() {
  const { lang } = useLang();
  const [sortKey, setSortKey] = useState<SortKey>("costPerMin");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = [...platforms].sort((a, b) => {
    const va = a[sortKey] as number;
    const vb = b[sortKey] as number;
    return sortDir === "asc" ? va - vb : vb - va;
  });

  const maxCost = Math.max(...platforms.map((p) => p.costPerMin));

  const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
    <button
      onClick={() => handleSort(k)}
      className={`flex items-center gap-1 text-xs font-mono uppercase tracking-wider transition-colors ${
        sortKey === k ? "text-slate-900 font-bold" : "text-slate-400 hover:text-slate-700"
      }`}
    >
      {label}
      <ArrowUpDown className="w-3 h-3" />
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-4">
          <InternalLink to="/state-of-art" className="flex items-center gap-1 text-slate-500 hover:text-slate-900 text-sm transition-colors">
            ← {lang === "fr" ? "État de l'Art" : "State of the Art"}
          </InternalLink>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-medium text-slate-900">
            {lang === "fr" ? "Comparaison tarifaire" : "Pricing Comparison"}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-8">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">
            {lang === "fr" ? "Analyse économique" : "Economic Analysis"}
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            {lang === "fr"
              ? "Comparaison tarifaire — $/minute"
              : "Pricing Comparison — $/minute"}
          </h1>
          <p className="text-slate-500 max-w-2xl">
            {lang === "fr"
              ? "Toutes les plateformes comparées sur la base du coût par minute d'interaction en temps réel. Les coûts cachés (TTS, LLM, infrastructure) sont indiqués séparément."
              : "All platforms compared on the basis of cost per minute of real-time interaction. Hidden costs (TTS, LLM, infrastructure) are noted separately."}
          </p>
        </div>

        {/* Visual bar chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
          <h2 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-6">
            {lang === "fr" ? "Coût par minute — vue graphique" : "Cost per minute — visual overview"}
          </h2>
          <div className="space-y-3">
            {[...platforms]
              .sort((a, b) => a.costPerMin - b.costPerMin)
              .map((p) => {
                const pct = (p.costPerMin / maxCost) * 100;
                const isAsync = p.latencyMs >= 10000;
                const barColor =
                  p.costPerMin < 0.05
                    ? "bg-emerald-500"
                    : p.costPerMin < 0.15
                    ? "bg-blue-500"
                    : p.costPerMin < 0.30
                    ? "bg-amber-500"
                    : "bg-red-400";
                return (
                  <div key={p.id} className="flex items-center gap-3">
                    <Link href={`/platform/${p.id}`}>
                      <span className="w-36 text-sm font-medium text-slate-700 hover:text-slate-900 hover:underline cursor-pointer flex-shrink-0 truncate">
                        {p.name}
                      </span>
                    </Link>
                    <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                      {isAsync ? (
                        <div className="h-full bg-slate-300 rounded-full flex items-center px-2">
                          <span className="text-xs text-slate-500 font-mono">async</span>
                        </div>
                      ) : (
                        <div
                          className={`h-full ${barColor} rounded-full transition-all duration-500`}
                          style={{ width: `${Math.max(pct, 3)}%` }}
                        />
                      )}
                    </div>
                    <span className="w-28 text-right text-sm font-mono font-bold text-slate-800 flex-shrink-0">
                      {isAsync ? "~$2+/min" : `$${p.costPerMin.toFixed(3)}/min`}
                    </span>
                  </div>
                );
              })}
          </div>
          <div className="mt-4 flex gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> {lang === "fr" ? "< $0.05" : "< $0.05"}</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> $0.05–$0.15</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> $0.15–$0.30</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-400 inline-block" /> {lang === "fr" ? "> $0.30" : "> $0.30"}</span>
          </div>
        </div>

        {/* Detailed table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest">
              {lang === "fr" ? "Tableau comparatif détaillé" : "Detailed comparison table"}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === "fr" ? "Cliquer sur les en-têtes pour trier" : "Click headers to sort"}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left py-3 px-4 text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {lang === "fr" ? "Plateforme" : "Platform"}
                  </th>
                  <th className="py-3 px-4">
                    <SortBtn k="costPerMin" label={lang === "fr" ? "$/min" : "$/min"} />
                  </th>
                  <th className="py-3 px-4">
                    <SortBtn k="latencyMs" label={lang === "fr" ? "Latence" : "Latency"} />
                  </th>
                  <th className="py-3 px-4">
                    <SortBtn k="sovereigntyScore" label={lang === "fr" ? "Souveraineté" : "Sovereignty"} />
                  </th>
                  <th className="py-3 px-4">
                    <SortBtn k="qualityScore" label={lang === "fr" ? "Qualité" : "Quality"} />
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {lang === "fr" ? "On-premise" : "On-premise"}
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {lang === "fr" ? "Gratuit" : "Free tier"}
                  </th>
                  <th className="py-3 px-4">
                    <SortBtn k="digiDoubleScore" label="DigiDouble" />
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {lang === "fr" ? "Détails" : "Details"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((p) => {
                  const isAsync = p.latencyMs >= 10000;
                  const costColor =
                    p.costPerMin < 0.05
                      ? "text-emerald-700 font-bold"
                      : p.costPerMin < 0.15
                      ? "text-blue-700 font-bold"
                      : p.costPerMin < 0.30
                      ? "text-amber-700 font-bold"
                      : "text-red-600 font-bold";
                  return (
                    <tr
                      key={p.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      onMouseEnter={() => setHoveredId(p.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <td className="py-3 px-4">
                        <div>
                          <Link href={`/platform/${p.id}`}>
                            <span className="font-semibold text-slate-800 hover:text-slate-900 hover:underline cursor-pointer">
                              {p.name}
                            </span>
                          </Link>
                          <p className="text-xs text-slate-400 mt-0.5">{p.model}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <span className={`font-mono text-sm ${costColor}`}>
                            {isAsync ? "~$2+/min" : `$${p.costPerMin.toFixed(3)}`}
                          </span>
                          <p className="text-xs text-slate-400 mt-0.5 max-w-[160px] leading-tight">{p.costPerMinNote}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-sm text-slate-700">
                        {isAsync ? (
                          <span className="text-slate-400">async</span>
                        ) : (
                          <span className={p.latencyMs < 300 ? "text-emerald-700" : p.latencyMs < 600 ? "text-amber-700" : "text-red-600"}>
                            ~{p.latencyMs}ms
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < p.sovereigntyScore
                                  ? p.sovereigntyScore >= 4
                                    ? "bg-emerald-500"
                                    : p.sovereigntyScore >= 3
                                    ? "bg-amber-500"
                                    : "bg-red-400"
                                  : "bg-slate-200"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-slate-400 font-mono ml-1">{p.sovereigntyScore}/5</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-sm text-slate-700">{p.qualityScore}/10</td>
                      <td className="py-3 px-4">
                        {p.onPremise ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-300" />
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {p.pricing.freeTier ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-300" />
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold font-mono ${
                              p.digiDoubleScore >= 9
                                ? "bg-emerald-100 text-emerald-700"
                                : p.digiDoubleScore >= 7
                                ? "bg-blue-100 text-blue-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {p.digiDoubleScore}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/platform/${p.id}`}>
                          <span className="text-xs text-slate-500 hover:text-slate-900 underline cursor-pointer">
                            {lang === "fr" ? "Voir détails →" : "View details →"}
                          </span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key insights */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: DollarSign,
              color: "bg-emerald-50 border-emerald-200",
              iconColor: "text-emerald-600",
              title: lang === "fr" ? "Plus économique" : "Most affordable",
              content: lang === "fr"
                ? "Simli ($0.009/min) et bitHuman Essence ($0.01/min) offrent le meilleur rapport qualité-prix pour le rendu vidéo temps réel."
                : "Simli ($0.009/min) and bitHuman Essence ($0.01/min) offer the best price-performance ratio for real-time video rendering.",
            },
            {
              icon: Shield,
              color: "bg-blue-50 border-blue-200",
              iconColor: "text-blue-600",
              title: lang === "fr" ? "Meilleure souveraineté" : "Best sovereignty",
              content: lang === "fr"
                ? "bitHuman (on-premise CPU) et Beyond Presence (Munich, EU) sont les seules options avec déploiement souverain européen."
                : "bitHuman (on-premise CPU) and Beyond Presence (Munich, EU) are the only options with sovereign European deployment.",
            },
            {
              icon: Zap,
              color: "bg-amber-50 border-amber-200",
              iconColor: "text-amber-600",
              title: lang === "fr" ? "Meilleur équilibre" : "Best balance",
              content: lang === "fr"
                ? "Anam.ai (180ms, $0.12/min) et Beyond Presence (250ms, $0.175/min) offrent le meilleur équilibre latence/coût/souveraineté."
                : "Anam.ai (180ms, $0.12/min) and Beyond Presence (250ms, $0.175/min) offer the best latency/cost/sovereignty balance.",
            },
          ].map((insight) => (
            <div key={insight.title} className={`border rounded-xl p-5 ${insight.color}`}>
              <div className="flex items-center gap-2 mb-3">
                <insight.icon className={`w-5 h-5 ${insight.iconColor}`} />
                <h3 className="text-sm font-bold text-slate-800">{insight.title}</h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{insight.content}</p>
            </div>
          ))}
        </div>

        {/* Note on hidden costs */}
        <div className="bg-slate-100 border border-slate-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-1">
                {lang === "fr" ? "Note sur les coûts réels" : "Note on real costs"}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {lang === "fr"
                  ? "Le coût $/minute affiché ne concerne que la couche de rendu vidéo avatar. Pour les plateformes sans LLM/TTS intégré (Simli, bitHuman), il faut ajouter les coûts d'API LLM (~$0.002–$0.01/min pour GPT-4o Mini) et TTS (~$0.003–$0.015/min pour ElevenLabs). Le coût total réel d'une solution complète varie entre $0.02/min (Simli + LLM open-source) et $0.50+/min (Tavus Growth + ElevenLabs premium)."
                  : "The $/minute cost shown covers only the avatar video rendering layer. For platforms without integrated LLM/TTS (Simli, bitHuman), add LLM API costs (~$0.002–$0.01/min for GPT-4o Mini) and TTS (~$0.003–$0.015/min for ElevenLabs). The real total cost of a complete solution ranges from $0.02/min (Simli + open-source LLM) to $0.50+/min (Tavus Growth + ElevenLabs premium)."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
