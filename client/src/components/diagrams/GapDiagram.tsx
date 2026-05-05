/*
 * GapDiagram — GamiWays Research Portal
 * Visual: 6 required criteria × 4 solution categories — hover for details
 * Design: same style as ProductArchDiagram — monospace labels, color-coded cells, tooltip on hover
 * Philosophy: editorial minimalism — Bauhaus grid, functional whitespace
 */
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";

interface Criterion {
  id: string;
  label: string;
  labelFr: string;
  icon: string;
  color: string;
  description: string;
  descriptionFr: string;
  rdRequired: boolean;
}

interface SolutionCategory {
  id: string;
  label: string;
  labelFr: string;
  examples: string;
  coverage: Record<string, "full" | "partial" | "none">;
  tooltip: string;
  tooltipFr: string;
}

const criteria: Criterion[] = [
  {
    id: "realtime",
    label: "Real-time",
    labelFr: "Temps réel",
    icon: "⚡",
    color: "oklch(0.60 0.20 25)",
    description: "Avatar response under 2s end-to-end. Current bottleneck: 6–12s.",
    descriptionFr: "Réponse avatar sous 2s de bout en bout. Goulot actuel : 6–12s.",
    rdRequired: true,
  },
  {
    id: "behavioral",
    label: "Behavioral fidelity",
    labelFr: "Fidélité comportementale",
    icon: "🎭",
    color: "oklch(0.72 0.18 50)",
    description: "Micro-expressions, gestures, speech rhythm extracted from 10min of video.",
    descriptionFr: "Micro-expressions, gestes, rythme vocal extraits de 10min de vidéo.",
    rdRequired: true,
  },
  {
    id: "sovereignty",
    label: "Data sovereignty",
    labelFr: "Souveraineté des données",
    icon: "🔒",
    color: "oklch(0.55 0.18 145)",
    description: "Swiss-hosted, no third-party data transfer, GDPR-compliant by design.",
    descriptionFr: "Hébergement suisse, aucun transfert de données tiers, RGPD by design.",
    rdRequired: false,
  },
  {
    id: "memory",
    label: "Conversational memory",
    labelFr: "Mémoire conversationnelle",
    icon: "🧠",
    color: "oklch(0.72 0.18 200)",
    description: "3-layer memory (working / episodic / semantic) across sessions of days or weeks.",
    descriptionFr: "Mémoire 3 couches (travail / épisodique / sémantique) sur des sessions de jours ou semaines.",
    rdRequired: true,
  },
  {
    id: "narrative",
    label: "Narrative control",
    labelFr: "Contrôle narratif",
    icon: "🎬",
    color: "oklch(0.60 0.18 280)",
    description: "Node editor for deterministic + organic conversation flows. Pedagogical mode / Narrative mode.",
    descriptionFr: "Éditeur de nœuds pour des flux conversationnels déterministes + organiques. Mode pédagogique / Mode narratif.",
    rdRequired: false,
  },
  {
    id: "emotional_perception",
    label: "Emotional perception",
    labelFr: "Perception émotionnelle",
    icon: "👁️",
    color: "oklch(0.65 0.18 280)",
    description: "Real-time multimodal perception: tone, expression, gaze, posture → NL context for LLM. Raven-1 reference: audio < 100ms, AV context < 300ms.",
    descriptionFr: "Perception multimodale temps réel : ton, expression, regard, posture → contexte NL pour LLM. Référence Raven-1 : audio < 100ms, contexte AV < 300ms.",
    rdRequired: true,
  },
  {
    id: "multi_style",
    label: "Multi-style avatar",
    labelFr: "Avatar multi-style",
    icon: "🎨",
    color: "oklch(0.55 0.20 320)",
    description: "Support for non-photorealistic avatar styles: cartoons, mascots, animals, stylized characters — same real-time model. Only LemonSlice (LS-2.1) covers this commercially.",
    descriptionFr: "Support de styles d'avatars non-photoréalistes : cartoons, mascottes, animaux, personnages stylisés — même modèle temps réel. Seul LemonSlice (LS-2.1) couvre cela commercialement.",
    rdRequired: false,
  },
];

const solutionCategories: SolutionCategory[] = [
  {
    id: "commercial",
    label: "Commercial platforms",
    labelFr: "Plateformes commerciales",
    examples: "HeyGen · Tavus · Synthesia · D-ID",
    coverage: {
      realtime: "partial",
      behavioral: "none",
      sovereignty: "none",
      memory: "none",
      narrative: "none",
      emotional_perception: "partial",
      multi_style: "none",
    },
    tooltip: "Good visual quality, but 6–15s latency, no sovereignty, no memory, no narrative control. Only Tavus (Raven-1) offers real-time emotional perception among commercial platforms. None support non-photorealistic styles.",
    tooltipFr: "Bonne qualité visuelle, mais latence 6–15s, aucune souveraineté, pas de mémoire ni de contrôle narratif. Seul Tavus (Raven-1) offre la perception émotionnelle temps réel. Aucune ne supporte les styles non-photoréalistes.",
  },
  {
    id: "opensource",
    label: "Open-source models",
    labelFr: "Modèles open-source",
    examples: "SadTalker · Wav2Lip · MuseTalk · Simli",
    coverage: {
      realtime: "partial",
      behavioral: "partial",
      sovereignty: "full",
      memory: "none",
      narrative: "none",
      emotional_perception: "none",
      multi_style: "partial",
    },
    tooltip: "Sovereignty possible, partial latency gains, but no memory, no narrative, limited behavioral fidelity. Some open-source models support stylized characters (partial).",
    tooltipFr: "Souveraineté possible, gains de latence partiels, mais pas de mémoire, pas de narratif. Certains modèles open-source supportent des personnages stylisés (partiel).",
  },
  {
    id: "research",
    label: "Academic prototypes",
    labelFr: "Prototypes académiques",
    examples: "VASA-1 · AvatarForcing · A²-LLM",
    coverage: {
      realtime: "partial",
      behavioral: "full",
      sovereignty: "partial",
      memory: "partial",
      narrative: "none",
      emotional_perception: "partial",
      multi_style: "partial",
    },
    tooltip: "Strong behavioral fidelity research, but not production-ready, no narrative control, no integrated memory. Some academic work on stylized avatar generation (partial).",
    tooltipFr: "Forte recherche sur la fidélité comportementale, mais pas prêt pour la production, pas de contrôle narratif. Quelques travaux académiques sur les avatars stylisés (partiel).",
  },
  {
    id: "lemonslice",
    label: "LemonSlice (LS-2.1)",
    labelFr: "LemonSlice (LS-2.1)",
    examples: "Dec 2025 · $10.5M YC+Matrix · 20B DiT · 20 FPS",
    coverage: {
      realtime: "partial",
      behavioral: "partial",
      sovereignty: "none",
      memory: "none",
      narrative: "none",
      emotional_perception: "partial",
      multi_style: "full",
    },
    tooltip: "LemonSlice-2 (Dec 2025): 20B Video DiT, 20 FPS single GPU, zero-shot from 1 photo. LS-2.1 adds real-time emotion + action triggering. UNIQUE: only commercial platform supporting cartoons, mascots, animals alongside photorealistic humans. ~3s hosted latency. No sovereignty, no memory, no narrative.",
    tooltipFr: "LemonSlice-2 (déc. 2025) : DiT vidéo 20B, 20 FPS sur GPU unique, zero-shot depuis 1 photo. LS-2.1 ajoute déclenchement émotions + actions temps réel. UNIQUE : seule plateforme commerciale supportant cartoons, mascottes, animaux + humains photoréalistes. Latence ~3s (hosted). Pas de souveraineté, pas de mémoire, pas de narratif.",
  },
  {
    id: "gamiways",
    label: "GamiWays target",
    labelFr: "Cible GamiWays",
    examples: "Memoways × Gamilab — R&D 2025–2028",
    coverage: {
      realtime: "full",
      behavioral: "full",
      sovereignty: "full",
      memory: "full",
      narrative: "full",
      emotional_perception: "full",
      multi_style: "full",
    },
    tooltip: "The only combination targeting all 7 criteria simultaneously, including sovereign real-time emotional perception and multi-style avatar support — no existing solution covers this. Requires fundamental R&D on 4 axes.",
    tooltipFr: "La seule combinaison ciblant les 7 critères simultanément, y compris la perception émotionnelle souveraine et le support multi-style — aucune solution existante ne couvre cela. Nécessite une R&D fondamentale sur 4 axes.",
  },
];

const coverageConfig = {
  full: {
    bg: "oklch(0.96 0.06 145)",
    border: "oklch(0.55 0.18 145)",
    text: "oklch(0.35 0.15 145)",
    symbol: "✓",
    label: "Yes",
    labelFr: "Oui",
  },
  partial: {
    bg: "oklch(0.97 0.05 75)",
    border: "oklch(0.75 0.16 75)",
    text: "oklch(0.50 0.14 75)",
    symbol: "~",
    label: "Partial",
    labelFr: "Partiel",
  },
  none: {
    bg: "oklch(0.97 0.03 25)",
    border: "oklch(0.75 0.10 25)",
    text: "oklch(0.55 0.14 25)",
    symbol: "✗",
    label: "No",
    labelFr: "Non",
  },
};

export default function GapDiagram() {
  const { lang } = useLang();
  const isFr = lang === "fr";
  const [hoveredCell, setHoveredCell] = useState<{ row: string; col: string } | null>(null);
  const [hoveredCriterion, setHoveredCriterion] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

  const handleCellEnter = (e: React.MouseEvent, catId: string, critId: string) => {
    setHoveredCell({ row: catId, col: critId });
    const cat = solutionCategories.find(c => c.id === catId)!;
    const crit = criteria.find(c => c.id === critId)!;
    const cov = coverageConfig[cat.coverage[critId]];
    const content = `${isFr ? crit.labelFr : crit.label} — ${isFr ? cat.labelFr : cat.label}\n${isFr ? cov.labelFr : cov.label}: ${isFr ? crit.descriptionFr : crit.description}`;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({ x: rect.left + rect.width / 2, y: rect.top - 8, content });
  };

  const handleCellLeave = () => {
    setHoveredCell(null);
    setTooltip(null);
  };

  const isGamiWays = (catId: string) => catId === "gamiways";

  return (
    <div className="relative">
      {/* Label */}
      <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {isFr ? "COUVERTURE DES CRITÈRES PAR CATÉGORIE DE SOLUTION" : "CRITERIA COVERAGE BY SOLUTION CATEGORY"}
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <div style={{ minWidth: "640px" }}>
          {/* Header row — criteria */}
          <div className="grid mb-1" style={{ gridTemplateColumns: "200px repeat(7, 1fr)", gap: "4px" }}>
            {/* Empty top-left */}
            <div />
            {criteria.map((crit) => (
              <div
                key={crit.id}
                className="flex flex-col items-center justify-center p-2 rounded cursor-default transition-all duration-150"
                style={{
                  background: hoveredCriterion === crit.id || hoveredCell?.col === crit.id
                    ? `oklch(from ${crit.color} l c h / 0.10)`
                    : "oklch(0.97 0.01 240)",
                  border: `1px solid ${hoveredCriterion === crit.id || hoveredCell?.col === crit.id ? crit.color : "oklch(0.90 0.01 240)"}`,
                }}
                onMouseEnter={() => setHoveredCriterion(crit.id)}
                onMouseLeave={() => setHoveredCriterion(null)}
                title={isFr ? crit.descriptionFr : crit.description}
              >
                <span className="text-lg mb-1">{crit.icon}</span>
                <span
                  className="text-xs font-semibold text-center leading-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: crit.color, fontSize: "10px" }}
                >
                  {isFr ? crit.labelFr : crit.label}
                </span>
                {crit.rdRequired && (
                  <span
                    className="mt-1 px-1 rounded text-white font-mono"
                    style={{ fontSize: "8px", background: "oklch(0.55 0.18 25)" }}
                  >
                    R&D
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Data rows — solution categories */}
          {solutionCategories.map((cat) => (
            <div
              key={cat.id}
              className="grid mb-1"
              style={{ gridTemplateColumns: "200px repeat(7, 1fr)", gap: "4px" }}
            >
              {/* Row label */}
              <div
                className="flex flex-col justify-center px-3 py-2 rounded cursor-default transition-all duration-150"
                style={{
                  background: isGamiWays(cat.id)
                    ? "oklch(0.12 0.02 240)"
                    : hoveredCategory === cat.id
                      ? "oklch(0.95 0.01 240)"
                      : "oklch(0.98 0.005 240)",
                  border: isGamiWays(cat.id)
                    ? "1.5px solid oklch(0.72 0.18 200)"
                    : "1px solid oklch(0.90 0.01 240)",
                }}
                onMouseEnter={() => setHoveredCategory(cat.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                title={isFr ? cat.tooltipFr : cat.tooltip}
              >
                <span
                  className="font-semibold text-xs leading-tight"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: isGamiWays(cat.id) ? "oklch(0.72 0.18 200)" : "oklch(0.30 0.02 240)",
                    fontSize: "11px",
                  }}
                >
                  {isFr ? cat.labelFr : cat.label}
                </span>
                <span
                  className="text-slate-400 leading-tight mt-0.5"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
                    color: isGamiWays(cat.id) ? "oklch(0.55 0.05 200)" : undefined }}
                >
                  {cat.examples}
                </span>
              </div>

              {/* Coverage cells */}
              {criteria.map((crit) => {
                const cov = coverageConfig[cat.coverage[crit.id]];
                const isHovered = hoveredCell?.row === cat.id && hoveredCell?.col === crit.id;
                const isRowHovered = hoveredCategory === cat.id;
                const isColHovered = hoveredCriterion === crit.id;
                return (
                  <div
                    key={crit.id}
                    className="flex flex-col items-center justify-center rounded cursor-default transition-all duration-150"
                    style={{
                      padding: "10px 4px",
                      background: isGamiWays(cat.id) && cat.coverage[crit.id] === "full"
                        ? "oklch(0.93 0.08 145)"
                        : isHovered || isRowHovered || isColHovered
                          ? cov.bg
                          : "oklch(0.985 0.005 240)",
                      border: isHovered
                        ? `2px solid ${cov.border}`
                        : isGamiWays(cat.id)
                          ? `1.5px solid ${cov.border}`
                          : `1px solid oklch(0.90 0.01 240)`,
                      transform: isHovered ? "scale(1.04)" : "scale(1)",
                    }}
                    onMouseEnter={(e) => handleCellEnter(e, cat.id, crit.id)}
                    onMouseLeave={handleCellLeave}
                  >
                    <span
                      className="font-bold font-mono"
                      style={{
                        fontSize: "16px",
                        color: cov.text,
                        lineHeight: 1,
                      }}
                    >
                      {cov.symbol}
                    </span>
                    <span
                      className="mt-1 font-mono"
                      style={{ fontSize: "8px", color: cov.text, opacity: 0.8 }}
                    >
                      {isFr ? cov.labelFr : cov.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-slate-100">
        {(["full", "partial", "none"] as const).map((key) => {
          const c = coverageConfig[key];
          return (
            <div key={key} className="flex items-center gap-1.5">
              <span
                className="w-5 h-5 flex items-center justify-center rounded font-mono font-bold text-xs"
                style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
              >
                {c.symbol}
              </span>
              <span className="text-xs text-slate-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {isFr ? c.labelFr : c.label}
              </span>
            </div>
          );
        })}
        <div className="flex items-center gap-1.5 ml-auto">
          <span
            className="px-1.5 py-0.5 rounded text-white font-mono font-bold"
            style={{ fontSize: "9px", background: "oklch(0.55 0.18 25)" }}
          >
            R&D
          </span>
          <span className="text-xs text-slate-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {isFr ? "Axe de recherche fondamentale" : "Fundamental research axis"}
          </span>
        </div>
      </div>

      {/* Floating tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div
            className="rounded px-3 py-2 shadow-xl max-w-xs"
            style={{
              background: "oklch(0.12 0.02 240)",
              border: "1px solid oklch(0.25 0.02 240)",
              color: "white",
            }}
          >
            {tooltip.content.split("\n").map((line, i) => (
              <p
                key={i}
                className={i === 0 ? "font-semibold text-xs mb-1" : "text-xs text-slate-300 leading-relaxed"}
                style={{ fontFamily: i === 0 ? "'Space Grotesk', sans-serif" : "'Source Serif 4', serif" }}
              >
                {line}
              </p>
            ))}
          </div>
          {/* Arrow */}
          <div
            className="mx-auto"
            style={{
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid oklch(0.25 0.02 240)",
              marginTop: "-1px",
            }}
          />
        </div>
      )}
    </div>
  );
}
