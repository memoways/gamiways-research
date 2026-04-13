/*
 * OrchestrationDiagram — DigiDouble Research Portal
 * Shows the Orchestration Freedom Degree continuum: 0% (scripted) → 90%+ (open)
 * With Pedagogical / Narrative mode mapping and node-level freedom concept
 * i18n: EN (default) / FR via useLang
 * Size: +35% from original
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

  const stepW = 200;
  const stepH = 135;
  const startX = 27;
  const stepY = 81;
  const gap = 16;
  const totalW = steps.length * (stepW + gap) - gap;

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${totalW + startX * 2} 420`} className="w-full" style={{ fontFamily: "'Space Grotesk', sans-serif", minWidth: "auto" }}>

        {/* ── Title ── */}
        <text x={(totalW + startX * 2) / 2} y="28" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.5">
          {isFr ? "DEGRÉ DE LIBERTÉ — PAR NŒUD DE CONVERSATION" : "FREEDOM DEGREE — PER CONVERSATION NODE"}
        </text>
        <text x={(totalW + startX * 2) / 2} y="50" textAnchor="middle" fontSize="11" fill="#64748b">
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
        <rect x={startX} y={stepY - 11} width={totalW} height="5" rx="3" fill="url(#freedomGrad)" opacity="0.5" />

        {/* ── Steps ── */}
        {steps.map((s, i) => {
          const x = startX + i * (stepW + gap);
          const lines = s.desc.split("\n");
          return (
            <g key={i}>
              <rect x={x} y={stepY} width={stepW} height={stepH} rx="6" fill={s.bg} stroke={s.border} strokeWidth="2" />
              <text x={x + stepW / 2} y={stepY + 38} textAnchor="middle" fontSize="27" fontWeight="900" fill={s.color} fontFamily="'JetBrains Mono', monospace">{s.pct}</text>
              <text x={x + stepW / 2} y={stepY + 65} textAnchor="middle" fontSize="13" fontWeight="700" fill={s.color}>{s.label}</text>
              {lines.map((line, li) => (
                <text key={li} x={x + stepW / 2} y={stepY + 88 + li * 19} textAnchor="middle" fontSize="10" fill="#475569">{line}</text>
              ))}
              {i < steps.length - 1 && (
                <text x={x + stepW + gap / 2} y={stepY + stepH / 2 + 5} textAnchor="middle" fontSize="16" fill="#94a3b8">→</text>
              )}
            </g>
          );
        })}

        {/* ── Pedagogical mode bracket ── */}
        {(() => {
          const eduW = 2 * (stepW + gap) - gap + stepW * 0.5;
          return (
            <g>
              <rect x={startX} y={stepY + stepH + 24} width={eduW} height="70" rx="5" fill="#eff6ff" stroke="#0891b2" strokeWidth="2" />
              <text x={startX + eduW / 2} y={stepY + stepH + 46} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0891b2" fontFamily="'JetBrains Mono', monospace">
                {isFr ? "MODE PÉDAGOGIQUE" : "PEDAGOGICAL MODE"}
              </text>
              <text x={startX + eduW / 2} y={stepY + stepH + 64} textAnchor="middle" fontSize="11" fill="#475569">
                {isFr ? "0–50% · Couverture contenu obligatoire · Contrôle pédagogique fort" : "0–50% · Mandatory content coverage · Strong pedagogical control"}
              </text>
              <text x={startX + eduW / 2} y={stepY + stepH + 82} textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="'JetBrains Mono', monospace">
                {isFr ? "L'IA adapte le ton, pas le contenu" : "AI adapts tone, not content"}
              </text>
            </g>
          );
        })()}

        {/* ── Narrative mode bracket ── */}
        {(() => {
          const storyStartX = startX + 2 * (stepW + gap);
          const storyWidth = 2 * (stepW + gap) + stepW - gap;
          return (
            <g>
              <rect x={storyStartX} y={stepY + stepH + 24} width={storyWidth} height="70" rx="5" fill="#fffbeb" stroke="#d97706" strokeWidth="2" />
              <text x={storyStartX + storyWidth / 2} y={stepY + stepH + 46} textAnchor="middle" fontSize="12" fontWeight="700" fill="#d97706" fontFamily="'JetBrains Mono', monospace">
                {isFr ? "MODE NARRATIF" : "NARRATIVE MODE"}
              </text>
              <text x={storyStartX + storyWidth / 2} y={stepY + stepH + 64} textAnchor="middle" fontSize="11" fill="#475569">
                {isFr ? "50–90%+ · Limites de sujet seulement · Personnalité du personnage" : "50–90%+ · Topic boundaries only · Character personality"}
              </text>
              <text x={storyStartX + storyWidth / 2} y={stepY + stepH + 82} textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="'JetBrains Mono', monospace">
                {isFr ? "L'IA pilote l'évolution narrative" : "AI drives narrative evolution"}
              </text>
            </g>
          );
        })()}

        {/* ── Research challenge note ── */}
        <rect x={startX} y={stepY + stepH + 108} width={totalW} height="40" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
        <text x={(totalW + startX * 2) / 2} y={stepY + stepH + 126} textAnchor="middle" fontSize="11" fill="#475569">
          {isFr
            ? "Défi R&D : garantir la couverture du contenu obligatoire (déterministe) tout en maintenant la naturalité conversationnelle (organique)"
            : "R&D challenge: guarantee mandatory content coverage (deterministic) while maintaining conversational naturalness (organic)"}
        </text>
        <text x={(totalW + startX * 2) / 2} y={stepY + stepH + 142} textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
          {isFr ? "Hypothèse H4 — Axe 3" : "Hypothesis H4 — Axis 3"}
        </text>
      </svg>
    </div>
  );
}
