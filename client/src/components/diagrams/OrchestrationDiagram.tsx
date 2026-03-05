/*
 * OrchestrationDiagram — DigiDouble Research Portal
 * Shows the Orchestration Freedom Degree continuum: 0% (scripted) → 90%+ (open)
 * With Edugami / Storygami mapping and node-level freedom concept
 * i18n: EN (default) / FR via useLang
 */
import { useLang } from "@/contexts/LangContext";

export default function OrchestrationDiagram() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const steps = [
    {
      pct: "0%",
      label: isFr ? "Scripté" : "Scripted",
      desc: isFr ? "Séquence fixe\nSans IA" : "Fixed sequence\nNo AI generation",
      color: "#721c24", bg: "#f8d7da", border: "#721c24",
    },
    {
      pct: "30%",
      label: isFr ? "Guidé" : "Guided",
      desc: isFr ? "Contenu obligatoire\nIA reformule seulement" : "Mandatory content\nAI rephrases only",
      color: "#856404", bg: "#fff3cd", border: "#856404",
    },
    {
      pct: "50%",
      label: isFr ? "Équilibré" : "Balanced",
      desc: isFr ? "Contraintes dures + douces\nIA s'adapte à l'utilisateur" : "Hard + soft constraints\nAI adapts to user",
      color: "#004085", bg: "#cce5ff", border: "#004085",
    },
    {
      pct: "70%",
      label: isFr ? "Créatif" : "Creative",
      desc: isFr ? "Peu de contraintes\nIA pilote le dialogue" : "Few constraints\nAI drives dialogue",
      color: "#155724", bg: "#d4edda", border: "#28a745",
    },
    {
      pct: "90%+",
      label: isFr ? "Ouvert" : "Open",
      desc: isFr ? "Limites de sujet seulement\nIA conversationnelle complète" : "Topic boundaries only\nFull conversational AI",
      color: "#0a3622", bg: "#c3e6cb", border: "#155724",
    },
  ];

  const stepW = 148;
  const stepH = 100;
  const startX = 20;
  const stepY = 60;
  const gap = 12;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 820 310" className="w-full" style={{ fontFamily: "'Space Grotesk', sans-serif", minWidth: 680 }}>

        {/* ── Title ── */}
        <text x="410" y="22" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.5">
          {isFr ? "DEGRÉ DE LIBERTÉ — PAR NŒUD DE CONVERSATION" : "FREEDOM DEGREE — PER CONVERSATION NODE"}
        </text>
        <text x="410" y="38" textAnchor="middle" fontSize="7.5" fill="#64748b">
          {isFr ? "Chaque nœud définit son propre équilibre déterministe ↔ organique" : "Each node defines its own deterministic ↔ organic balance"}
        </text>

        {/* ── Gradient bar ── */}
        <defs>
          <linearGradient id="freedomGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#721c24" />
            <stop offset="25%" stopColor="#856404" />
            <stop offset="50%" stopColor="#004085" />
            <stop offset="75%" stopColor="#155724" />
            <stop offset="100%" stopColor="#0a3622" />
          </linearGradient>
        </defs>
        <rect x={startX} y={stepY - 8} width={steps.length * (stepW + gap) - gap} height="4" rx="2" fill="url(#freedomGrad)" opacity="0.5" />

        {/* ── Steps ── */}
        {steps.map((s, i) => {
          const x = startX + i * (stepW + gap);
          const lines = s.desc.split("\n");
          return (
            <g key={i}>
              {/* Step box */}
              <rect x={x} y={stepY} width={stepW} height={stepH} rx="5" fill={s.bg} stroke={s.border} strokeWidth="1.5" />
              {/* Percentage */}
              <text x={x + stepW / 2} y={stepY + 28} textAnchor="middle" fontSize="20" fontWeight="900" fill={s.color} fontFamily="'JetBrains Mono', monospace">{s.pct}</text>
              {/* Label */}
              <text x={x + stepW / 2} y={stepY + 48} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={s.color}>{s.label}</text>
              {/* Description lines */}
              {lines.map((line, li) => (
                <text key={li} x={x + stepW / 2} y={stepY + 65 + li * 14} textAnchor="middle" fontSize="7.5" fill="#475569">{line}</text>
              ))}
              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <text x={x + stepW + gap / 2} y={stepY + stepH / 2 + 4} textAnchor="middle" fontSize="12" fill="#94a3b8">→</text>
              )}
            </g>
          );
        })}

        {/* ── Edugami / Storygami mapping ── */}
        <rect x={startX} y={stepY + stepH + 18} width={2 * (stepW + gap) - gap + stepW * 0.5} height="52" rx="4" fill="#eff6ff" stroke="#0891b2" strokeWidth="1.5" />
        <text x={startX + (2 * (stepW + gap) - gap + stepW * 0.5) / 2} y={stepY + stepH + 34} textAnchor="middle" fontSize="8" fontWeight="700" fill="#0891b2" fontFamily="'JetBrains Mono', monospace">EDUGAMI — {isFr ? "Mode Pédagogique" : "Pedagogical Mode"}</text>
        <text x={startX + (2 * (stepW + gap) - gap + stepW * 0.5) / 2} y={stepY + stepH + 48} textAnchor="middle" fontSize="7.5" fill="#475569">{isFr ? "0–50% · Couverture contenu obligatoire · Contrôle pédagogique fort" : "0–50% · Mandatory content coverage · Strong pedagogical control"}</text>
        <text x={startX + (2 * (stepW + gap) - gap + stepW * 0.5) / 2} y={stepY + stepH + 62} textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="'JetBrains Mono', monospace">{isFr ? "L'IA adapte le ton, pas le contenu" : "AI adapts tone, not content"}</text>

        {/* Storygami bracket */}
        {(() => {
          const storyStartX = startX + 2 * (stepW + gap);
          const storyWidth = 2 * (stepW + gap) + stepW - gap;
          return (
            <g>
              <rect x={storyStartX} y={stepY + stepH + 18} width={storyWidth} height="52" rx="4" fill="#fffbeb" stroke="#d97706" strokeWidth="1.5" />
              <text x={storyStartX + storyWidth / 2} y={stepY + stepH + 34} textAnchor="middle" fontSize="8" fontWeight="700" fill="#d97706" fontFamily="'JetBrains Mono', monospace">STORYGAMI — {isFr ? "Mode Narratif" : "Narrative Mode"}</text>
              <text x={storyStartX + storyWidth / 2} y={stepY + stepH + 48} textAnchor="middle" fontSize="7.5" fill="#475569">{isFr ? "50–90%+ · Limites de sujet seulement · Personnalité du personnage" : "50–90%+ · Topic boundaries only · Character personality"}</text>
              <text x={storyStartX + storyWidth / 2} y={stepY + stepH + 62} textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="'JetBrains Mono', monospace">{isFr ? "L'IA pilote l'évolution narrative" : "AI drives narrative evolution"}</text>
            </g>
          );
        })()}

        {/* ── Research challenge note ── */}
        <rect x={startX} y={stepY + stepH + 82} width={steps.length * (stepW + gap) - gap} height="30" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        <text x="410" y={stepY + stepH + 97} textAnchor="middle" fontSize="7.5" fill="#475569">
          {isFr
            ? "Défi R&D : garantir la couverture du contenu obligatoire (déterministe) tout en maintenant la naturalité conversationnelle (organique) — sans dégrader l'une ou l'autre"
            : "R&D challenge: guarantee mandatory content coverage (deterministic) while maintaining conversational naturalness (organic) — without degrading either dimension"}
        </text>
        <text x="410" y={stepY + stepH + 110} textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
          {isFr ? "Hypothèse H4 — Axe 3 IDIAP" : "Hypothesis H4 — Axis 3 IDIAP"}
        </text>
      </svg>
    </div>
  );
}
