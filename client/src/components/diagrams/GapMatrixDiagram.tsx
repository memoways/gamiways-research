/*
 * GapMatrixDiagram — DigiDouble Research Portal
 * Visual: 5 criteria × N solutions matrix with hover details
 * Design: compact grid, color-coded cells, hover for explanation
 */
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";

type CellValue = "full" | "partial" | "none" | "rd";

interface Solution {
  name: string;
  category: string;
  categoryFr: string;
  cells: Record<string, CellValue>;
}

interface Criterion {
  id: string;
  label: string;
  labelFr: string;
  tooltip: string;
  tooltipFr: string;
}

const criteria: Criterion[] = [
  {
    id: "realtime",
    label: "Real-time <2s",
    labelFr: "Temps réel <2s",
    tooltip: "Full conversational exchange under 2 seconds end-to-end",
    tooltipFr: "Échange conversationnel complet en moins de 2 secondes end-to-end",
  },
  {
    id: "behavioral",
    label: "Behavioral fidelity",
    labelFr: "Fidélité comportementale",
    tooltip: "Avatar behaves like the specific person (micro-expressions, gestures, rhythm)",
    tooltipFr: "L'avatar se comporte comme la personne spécifique (micro-expressions, gestes, rythme)",
  },
  {
    id: "sovereignty",
    label: "Sovereignty",
    labelFr: "Souveraineté",
    tooltip: "Data hosted in Switzerland/EU, no US platform dependency, no censorship",
    tooltipFr: "Données hébergées en Suisse/UE, pas de dépendance aux plateformes US, pas de censure",
  },
  {
    id: "memory",
    label: "Conv. memory",
    labelFr: "Mémoire conv.",
    tooltip: "Maintains coherence over 1h+ sessions and multiple sessions over days/weeks",
    tooltipFr: "Maintient la cohérence sur des sessions 1h+ et des sessions multiples sur jours/semaines",
  },
  {
    id: "narrative",
    label: "Narrative control",
    labelFr: "Contrôle narratif",
    tooltip: "Creator can define deterministic/organic balance, pedagogical constraints, story arcs",
    tooltipFr: "Le créateur peut définir l'équilibre déterministe/organique, les contraintes pédagogiques, les arcs narratifs",
  },
];

const solutions: Solution[] = [
  {
    name: "HeyGen",
    category: "Commercial",
    categoryFr: "Commercial",
    cells: { realtime: "partial", behavioral: "none", sovereignty: "none", memory: "none", narrative: "none" },
  },
  {
    name: "Synthesia",
    category: "Commercial",
    categoryFr: "Commercial",
    cells: { realtime: "none", behavioral: "none", sovereignty: "none", memory: "none", narrative: "partial" },
  },
  {
    name: "NVIDIA ACE",
    category: "Enterprise",
    categoryFr: "Enterprise",
    cells: { realtime: "full", behavioral: "partial", sovereignty: "none", memory: "none", narrative: "none" },
  },
  {
    name: "Beyond Presence",
    category: "Enterprise",
    categoryFr: "Enterprise",
    cells: { realtime: "full", behavioral: "none", sovereignty: "none", memory: "none", narrative: "none" },
  },
  {
    name: "HeyGem OS",
    category: "Open Source",
    categoryFr: "Open Source",
    cells: { realtime: "none", behavioral: "none", sovereignty: "full", memory: "none", narrative: "none" },
  },
  {
    name: "DigiDouble",
    category: "Target",
    categoryFr: "Cible",
    cells: { realtime: "rd", behavioral: "rd", sovereignty: "full", memory: "rd", narrative: "full" },
  },
];

const cellConfig: Record<CellValue, { color: string; bg: string; label: string; labelFr: string; icon: string }> = {
  full: { color: "oklch(0.45 0.18 145)", bg: "oklch(0.95 0.06 145)", label: "Yes", labelFr: "Oui", icon: "✓" },
  partial: { color: "oklch(0.65 0.16 75)", bg: "oklch(0.97 0.04 75)", label: "Partial", labelFr: "Partiel", icon: "◐" },
  none: { color: "oklch(0.70 0.01 286)", bg: "oklch(0.96 0.004 286)", label: "No", labelFr: "Non", icon: "✗" },
  rd: { color: "oklch(0.60 0.20 25)", bg: "oklch(0.98 0.02 25)", label: "R&D", labelFr: "R&D", icon: "⚗" },
};

export default function GapMatrixDiagram() {
  const { lang } = useLang();
  const [hoveredCell, setHoveredCell] = useState<{ sol: string; crit: string } | null>(null);
  const [hoveredCrit, setHoveredCrit] = useState<string | null>(null);
  const isFr = lang === "fr";

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse" style={{ minWidth: "700px" }}>
        <thead>
          <tr>
            <th className="text-left py-3 pr-4 text-sm font-mono text-slate-400 font-normal w-40">
              {isFr ? "Solution" : "Solution"}
            </th>
            {criteria.map((c) => (
              <th
                key={c.id}
                className="text-center py-3 px-3 relative cursor-default"
                onMouseEnter={() => setHoveredCrit(c.id)}
                onMouseLeave={() => setHoveredCrit(null)}
              >
                <div className="text-sm font-semibold text-slate-700 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? c.labelFr : c.label}
                </div>
                {hoveredCrit === c.id && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-20 w-52 rounded border border-slate-200 bg-white shadow-lg p-2 text-sm text-slate-600 text-left font-normal"
                    style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {isFr ? c.tooltipFr : c.tooltip}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {solutions.map((sol) => (
            <tr
              key={sol.name}
              className={sol.name === "DigiDouble" ? "border-t-2" : "border-t border-slate-100"}
              style={sol.name === "DigiDouble" ? { borderTopColor: "oklch(0.60 0.20 25)" } : {}}
            >
              <td className="py-3 pr-4">
                <div className="font-semibold text-slate-900 text-base" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {sol.name}
                </div>
                <div className="text-sm text-slate-400 font-mono">{isFr ? sol.categoryFr : sol.category}</div>
              </td>
              {criteria.map((c) => {
                const val = sol.cells[c.id];
                const cfg = cellConfig[val];
                const isHov = hoveredCell?.sol === sol.name && hoveredCell?.crit === c.id;
                return (
                  <td
                    key={c.id}
                    className="text-center py-3 px-3 relative cursor-default"
                    onMouseEnter={() => setHoveredCell({ sol: sol.name, crit: c.id })}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded text-lg font-bold transition-all duration-150"
                      style={{
                        color: cfg.color,
                        background: isHov ? cfg.bg : "transparent",
                        border: isHov ? `1px solid ${cfg.color}40` : "1px solid transparent",
                      }}
                    >
                      {cfg.icon}
                    </div>
                    {isHov && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-20 w-44 rounded border border-slate-200 bg-white shadow-lg p-2 text-sm text-slate-600 text-left"
                        style={{ fontFamily: "'Source Serif 4', serif" }}>
                        <span className="font-bold" style={{ color: cfg.color }}>{isFr ? cfg.labelFr : cfg.label}</span>
                        {val === "rd" && <span> — {isFr ? "Objectif de recherche" : "Research objective"}</span>}
                        {val === "partial" && <span> — {isFr ? "Capacité limitée" : "Limited capability"}</span>}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Legend */}
      <div className="flex gap-5 mt-5 flex-wrap">
        {(Object.entries(cellConfig) as [CellValue, typeof cellConfig[CellValue]][]).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="text-lg" style={{ color: cfg.color }}>{cfg.icon}</span>
            <span className="text-sm text-slate-500 font-mono">{isFr ? cfg.labelFr : cfg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
