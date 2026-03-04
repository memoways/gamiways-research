/*
 * ResearchGapDiagram — Matrice des gaps de recherche
 * Visualise: Urgence × Difficulté pour chaque gap identifié
 */

interface GapEntry {
  label: string;
  urgency: number;   // 1–5
  difficulty: number; // 1–5
  color: string;
  abbrev: string;
}

const gaps: GapEntry[] = [
  { abbrev: "MEM", label: "Mémoire conversationnelle", urgency: 5, difficulty: 4, color: "#0891b2" },
  { abbrev: "AVA", label: "Fidélité comportementale avatar", urgency: 5, difficulty: 5, color: "#dc2626" },
  { abbrev: "TTS", label: "TTS prosodique personnalisé", urgency: 4, difficulty: 4, color: "#d97706" },
  { abbrev: "LAT", label: "Latence avatar end-to-end", urgency: 5, difficulty: 5, color: "#dc2626" },
  { abbrev: "ORC", label: "Orchestration déterministe-organique", urgency: 4, difficulty: 3, color: "#7c3aed" },
  { abbrev: "SYN", label: "Synchronisation multi-flux", urgency: 3, difficulty: 3, color: "#16a34a" },
];

export default function ResearchGapDiagram() {
  const W = 520;
  const H = 360;
  const PAD = 60;
  const PLOT_W = W - PAD * 2;
  const PLOT_H = H - PAD * 2 - 30;

  function plotX(urgency: number) {
    return PAD + ((urgency - 1) / 4) * PLOT_W;
  }
  function plotY(difficulty: number) {
    return PAD + 20 + ((5 - difficulty) / 4) * PLOT_H;
  }

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {/* Title */}
        <text x="20" y="18" fontSize="10" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
          MATRICE GAPS DE RECHERCHE — URGENCE × DIFFICULTÉ
        </text>

        {/* Quadrant backgrounds */}
        {/* Top-right: Critique (haute urgence + haute difficulté) */}
        <rect x={PAD + PLOT_W / 2} y={PAD + 20} width={PLOT_W / 2} height={PLOT_H / 2} fill="#fef2f2" opacity="0.5" />
        <text x={PAD + PLOT_W * 0.75} y={PAD + 36} textAnchor="middle" fontSize="9" fill="#dc2626" fontFamily="'JetBrains Mono', monospace" opacity="0.7">CRITIQUE</text>

        {/* Top-left: Difficile mais moins urgent */}
        <rect x={PAD} y={PAD + 20} width={PLOT_W / 2} height={PLOT_H / 2} fill="#fffbeb" opacity="0.5" />
        <text x={PAD + PLOT_W * 0.25} y={PAD + 36} textAnchor="middle" fontSize="9" fill="#d97706" fontFamily="'JetBrains Mono', monospace" opacity="0.7">COMPLEXE</text>

        {/* Bottom-right: Urgent mais accessible */}
        <rect x={PAD + PLOT_W / 2} y={PAD + 20 + PLOT_H / 2} width={PLOT_W / 2} height={PLOT_H / 2} fill="#f0fdf4" opacity="0.5" />
        <text x={PAD + PLOT_W * 0.75} y={PAD + 20 + PLOT_H * 0.75 + 6} textAnchor="middle" fontSize="9" fill="#16a34a" fontFamily="'JetBrains Mono', monospace" opacity="0.7">PRIORITAIRE</text>

        {/* Bottom-left: Moins urgent + accessible */}
        <rect x={PAD} y={PAD + 20 + PLOT_H / 2} width={PLOT_W / 2} height={PLOT_H / 2} fill="#f8fafc" opacity="0.5" />
        <text x={PAD + PLOT_W * 0.25} y={PAD + 20 + PLOT_H * 0.75 + 6} textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" opacity="0.7">SECONDAIRE</text>

        {/* Axes */}
        {/* X axis */}
        <line x1={PAD} y1={PAD + 20 + PLOT_H} x2={PAD + PLOT_W + 10} y2={PAD + 20 + PLOT_H} stroke="#334155" strokeWidth="1.5" />
        <polygon points={`${PAD + PLOT_W + 10},${PAD + 20 + PLOT_H - 4} ${PAD + PLOT_W + 16},${PAD + 20 + PLOT_H} ${PAD + PLOT_W + 10},${PAD + 20 + PLOT_H + 4}`} fill="#334155" />
        <text x={PAD + PLOT_W / 2} y={PAD + 20 + PLOT_H + 20} textAnchor="middle" fontSize="10" fill="#374151" fontWeight="500">
          Urgence →
        </text>
        {/* X ticks */}
        {[1, 2, 3, 4, 5].map((v) => (
          <text key={v} x={plotX(v)} y={PAD + 20 + PLOT_H + 14} textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">{v}</text>
        ))}

        {/* Y axis */}
        <line x1={PAD} y1={PAD + 20 + PLOT_H} x2={PAD} y2={PAD + 10} stroke="#334155" strokeWidth="1.5" />
        <polygon points={`${PAD - 4},${PAD + 10} ${PAD},${PAD + 4} ${PAD + 4},${PAD + 10}`} fill="#334155" />
        <text
          x={PAD - 30}
          y={PAD + 20 + PLOT_H / 2}
          textAnchor="middle"
          fontSize="10"
          fill="#374151"
          fontWeight="500"
          transform={`rotate(-90, ${PAD - 30}, ${PAD + 20 + PLOT_H / 2})`}
        >
          Difficulté →
        </text>
        {/* Y ticks */}
        {[1, 2, 3, 4, 5].map((v) => (
          <text key={v} x={PAD - 8} y={plotY(v) + 4} textAnchor="end" fontSize="8" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">{v}</text>
        ))}

        {/* Quadrant dividers */}
        <line x1={PAD + PLOT_W / 2} y1={PAD + 20} x2={PAD + PLOT_W / 2} y2={PAD + 20 + PLOT_H} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,2" />
        <line x1={PAD} y1={PAD + 20 + PLOT_H / 2} x2={PAD + PLOT_W} y2={PAD + 20 + PLOT_H / 2} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,2" />

        {/* Data points */}
        {gaps.map((gap) => {
          const x = plotX(gap.urgency);
          const y = plotY(gap.difficulty);
          return (
            <g key={gap.abbrev}>
              <circle cx={x} cy={y} r={18} fill={gap.color} fillOpacity="0.15" stroke={gap.color} strokeWidth="1.5" />
              <text x={x} y={y - 2} textAnchor="middle" fontSize="10" fontWeight="700" fill={gap.color} fontFamily="'JetBrains Mono', monospace">
                {gap.abbrev}
              </text>
              <text x={x} y={y + 10} textAnchor="middle" fontSize="7" fill={gap.color} fontFamily="'JetBrains Mono', monospace">
                {gap.urgency}/{gap.difficulty}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${PAD}, ${H - 28})`}>
          {gaps.map((gap, i) => (
            <g key={gap.abbrev} transform={`translate(${i * 80}, 0)`}>
              <circle cx="8" cy="8" r="6" fill={gap.color} fillOpacity="0.2" stroke={gap.color} strokeWidth="1.5" />
              <text x="8" y="12" textAnchor="middle" fontSize="7" fontWeight="700" fill={gap.color} fontFamily="'JetBrains Mono', monospace">
                {gap.abbrev}
              </text>
            </g>
          ))}
        </g>
        <g transform={`translate(${PAD}, ${H - 12})`}>
          {gaps.map((gap, i) => (
            <text key={gap.abbrev} x={i * 80 + 8} y="0" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="'JetBrains Mono', monospace">
              {gap.label.split(" ")[0]}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
