/**
 * AvatarsMarket.tsx — DigiDouble Research Portal
 * Page: Business Challenges & Market Opportunities — extracted from StateOfArt section G
 * Design: Technical Blueprint
 * i18n: EN / FR via LangContext
 */
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import SectionHeader from "@/components/SectionHeader";

export default function AvatarsMarket() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const marketOpportunity = [
    { segment: "AI Avatar Market", value2025: "$0.80B", valueTarget: "$5.93B (2032)", cagr: "33.1%", source: "MarketsAndMarkets", sourceUrl: "https://www.marketsandmarkets.com/Market-Reports/ai-avatars-market-156139465.html" },
    { segment: "Digital Human AI Avatars", value2025: "~$9.7B", valueTarget: "+$13.5B (2029)", cagr: "44%", source: "Technavio", sourceUrl: "https://www.technavio.com/report/digital-human-avatar-market-industry-analysis" },
    { segment: "Digital Human Market (2026)", value2025: "$66.98B", valueTarget: "$258.15B (2030)", cagr: "40.1%", source: "Grand View Research", sourceUrl: "https://www.grandviewresearch.com/industry-analysis/digital-avatar-market-report" },
    { segment: "Virtual Humans Market", value2025: "$43.3B", valueTarget: "$1,827B (2033)", cagr: "45.1%", source: "Allied Market Research", sourceUrl: "https://www.alliedmarketresearch.com/virtual-humans-market-A31847" },
    { segment: isFr ? "EdTech AI Avatars" : "EdTech AI Avatars", value2025: isFr ? "Émergent" : "Emerging", valueTarget: isFr ? "Fort (2029)" : "Strong (2029)", cagr: "N/A", source: isFr ? "Secteur en formation" : "Forming sector", sourceUrl: "" },
  ];

  const businessChallenges = [
    {
      title: isFr ? "Enjeu souveraineté" : "Sovereignty challenge",
      color: "oklch(0.72 0.18 200)",
      items: isFr
        ? ["Censure arbitraire des plateformes US (incident OpenAI/AVA)", "RGPD et localisation des données en Europe", "Dépendance aux APIs = fragilité et coût imprévisible", "Infrastructure EU/CH comme réponse aux enjeux de souveraineté"]
        : ["Arbitrary censorship by US platforms (OpenAI/AVA incident)", "GDPR and data localization in Europe", "API dependency = fragility and unpredictable cost", "EU/CH infrastructure as a response to sovereignty challenges"],
    },
    {
      title: isFr ? "Enjeu technologique" : "Technology challenge",
      color: "oklch(0.72 0.18 50)",
      items: isFr
        ? ["Réduction 6–10× de la latence end-to-end", "Mémoire conversationnelle sans explosion des coûts", "Fidélité comportementale au-delà du lip-sync", "Synchronisation multi-flux temps réel (<100ms)"]
        : ["6–10× reduction in end-to-end latency", "Conversational memory without cost explosion", "Behavioral fidelity beyond lip-sync", "Real-time multi-stream synchronization (<100ms)"],
    },
    {
      title: isFr ? "Enjeu marché" : "Market challenge",
      color: "oklch(0.65 0.18 145)",
      items: isFr
        ? ["Marché EdTech : 78% enseignants utilisent déjà l'IA", "Demande forte pour personnalisation à l'échelle", "Cinéma interactif : nouveau format narratif émergent", "Formation corporate : ROI mesurable sur engagement"]
        : ["EdTech market: 78% of teachers already use AI", "Strong demand for personalization at scale", "Interactive cinema: emerging new narrative format", "Corporate training: measurable ROI on engagement"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sub-nav */}
      <div className="bg-white border-b border-slate-200 sticky top-14 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
          <InternalLink to="/avatars" className="text-xs font-mono text-slate-400 hover:text-slate-700 transition-colors">
            {isFr ? "← Avatars Vidéo" : "← Video Avatars"}
          </InternalLink>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Business & Marché" : "Business & Market"}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader
          number="G"
          title={isFr ? "Enjeux Business & Opportunités de Marché" : "Business Challenges & Market Opportunities"}
          subtitle={isFr ? "Contexte économique et positionnement stratégique des avatars vidéo conversationnels (2025–2026). Évaluation neutre." : "Economic context and strategic positioning of conversational video avatars (2025–2026). Neutral evaluation."}
          accent="green"
        />

        {/* Market table */}
        <div className="overflow-x-auto mb-8">
          <table className="data-table">
            <thead>
              <tr>
                <th>{isFr ? "Segment" : "Segment"}</th>
                <th>{isFr ? "Valeur 2025" : "2025 Value"}</th>
                <th>{isFr ? "Valeur cible" : "Target value"}</th>
                <th>CAGR</th>
                <th>{isFr ? "Source" : "Source"}</th>
              </tr>
            </thead>
            <tbody>
              {marketOpportunity.map((m) => (
                <tr key={m.segment}>
                  <td className="font-medium text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m.segment}</td>
                  <td><span className="text-sm font-bold font-mono" style={{ color: "oklch(0.72 0.18 200)" }}>{m.value2025}</span></td>
                  <td><span className="text-sm font-mono text-slate-700">{m.valueTarget}</span></td>
                  <td><span className="text-sm font-bold font-mono" style={{ color: "oklch(0.65 0.18 145)" }}>{m.cagr}</span></td>
                  <td className="text-xs text-slate-400 font-mono">
                    {m.sourceUrl ? (
                      <a href={m.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "oklch(0.55 0.15 200)" }}>{m.source} ↗</a>
                    ) : m.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Business challenges */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {businessChallenges.map((section) => (
            <div key={section.title} className="border border-slate-200 rounded-lg p-4 bg-white">
              <div className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace", color: section.color }}>
                {section.title}
              </div>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item} className="flex gap-2">
                    <span className="text-xs mt-0.5 shrink-0" style={{ color: section.color }}>·</span>
                    <span className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Validity callout */}
        <div className="callout-success">
          <p className="text-sm font-semibold text-slate-800 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Validité de l'intérêt pour la recherche" : "Validity of research interest"}
          </p>
          <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "La combinaison — conversation IA + avatar photoréaliste + séquençage vidéo intelligent + contrôle narratif/pédagogique + souveraineté — n'existe dans aucune solution commerciale ou open-source actuelle. Les gaps identifiés (mémoire long-terme, fidélité comportementale, latence avatar) correspondent précisément aux frontières de la recherche académique actuelle. Cette convergence entre besoins applicatifs et frontières de la recherche est ce qui justifie un programme de recherche fondamentale dans ce domaine."
              : "The combination — AI conversation + photorealistic avatar + intelligent video sequencing + narrative/pedagogical control + sovereignty — does not exist in any current commercial or open-source solution. The identified gaps (long-term memory, behavioral fidelity, avatar latency) correspond precisely to the frontiers of current academic research. This convergence between application needs and research frontiers is what justifies a fundamental research program in this domain."
            }
          </p>
        </div>

        {/* Navigation links */}
        <div className="mt-8 flex flex-wrap gap-3">
          <InternalLink to="/avatars" className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-4 py-2 transition-all hover:opacity-90" style={{ background: 'oklch(0.55 0.20 200)', fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "← Avatars Vidéo Streaming" : "← Streaming Video Avatars"}
          </InternalLink>
          <InternalLink to="/avatars/pricing" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "Simulateur de coûts →" : "Cost simulator →"}
          </InternalLink>
        </div>
      </div>
    </div>
  );
}
