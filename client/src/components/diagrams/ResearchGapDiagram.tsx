/*
 * ResearchGapDiagram — Research gap matrix: Urgency × Difficulty
 * i18n: EN (default) / FR via useLang
 * Size: +35% from original
 */
import { useLang } from "@/contexts/LangContext";

export default function ResearchGapDiagram() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  const gaps = [
    { abbrev: "MEM", label: isFr ? "Mémoire conversationnelle" : "Conversational memory",          urgency: 5, difficulty: 4, color: "#0891b2" },
    { abbrev: "AVA", label: isFr ? "Fidélité comportementale avatar" : "Avatar behavioral fidelity", urgency: 5, difficulty: 5, color: "#dc2626" },
    { abbrev: "TTS", label: isFr ? "TTS prosodique personnalisé" : "Personalized prosodic TTS",     urgency: 4, difficulty: 4, color: "#d97706" },
    { abbrev: "LAT", label: isFr ? "Latence avatar end-to-end" : "Avatar end-to-end latency",       urgency: 5, difficulty: 5, color: "#dc2626" },
    { abbrev: "ORC", label: isFr ? "Orchestration déterministe-organique" : "Deterministic-organic orchestration", urgency: 4, difficulty: 3, color: "#7c3aed" },
    { abbrev: "SYN", label: isFr ? "Synchronisation multi-flux" : "Multi-stream synchronization",   urgency: 3, difficulty: 3, color: "#16a34a" },
  ];

  const W = 702;
  const H = 486;
  const PAD = 81;
  const PLOT_W = W - PAD * 2;
  const PLOT_H = H - PAD * 2 - 40;

  function plotX(urgency: number) { return PAD + ((urgency - 1) / 4) * PLOT_W; }
  function plotY(difficulty: number) { return PAD + 27 + ((5 - difficulty) / 4) * PLOT_H; }

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {/* Title */}
        <text x="20" y="24" fontSize="13" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
          {isFr ? "MATRICE GAPS DE RECHERCHE — URGENCE × DIFFICULTÉ" : "RESEARCH GAP MATRIX — URGENCY × DIFFICULTY"}
        </text>

        {/* Quadrant backgrounds */}
        <rect x={PAD + PLOT_W / 2} y={PAD + 27} width={PLOT_W / 2} height={PLOT_H / 2} fill="#fef2f2" opacity="0.5" />
        <text x={PAD + PLOT_W * 0.75} y={PAD + 48} textAnchor="middle" fontSize="12" fill="#dc2626" fontFamily="'JetBrains Mono', monospace" opacity="0.7">
          {isFr ? "CRITIQUE" : "CRITICAL"}
        </text>

        <rect x={PAD} y={PAD + 27} width={PLOT_W / 2} height={PLOT_H / 2} fill="#fffbeb" opacity="0.5" />
        <text x={PAD + PLOT_W * 0.25} y={PAD + 48} textAnchor="middle" fontSize="12" fill="#d97706" fontFamily="'JetBrains Mono', monospace" opacity="0.7">
          {isFr ? "COMPLEXE" : "COMPLEX"}
        </text>

        <rect x={PAD + PLOT_W / 2} y={PAD + 27 + PLOT_H / 2} width={PLOT_W / 2} height={PLOT_H / 2} fill="#f0fdf4" opacity="0.5" />
        <text x={PAD + PLOT_W * 0.75} y={PAD + 27 + PLOT_H * 0.75 + 8} textAnchor="middle" fontSize="12" fill="#16a34a" fontFamily="'JetBrains Mono', monospace" opacity="0.7">
          {isFr ? "PRIORITAIRE" : "PRIORITY"}
        </text>

        <rect x={PAD} y={PAD + 27 + PLOT_H / 2} width={PLOT_W / 2} height={PLOT_H / 2} fill="#f8fafc" opacity="0.5" />
        <text x={PAD + PLOT_W * 0.25} y={PAD + 27 + PLOT_H * 0.75 + 8} textAnchor="middle" fontSize="12" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" opacity="0.7">
          {isFr ? "SECONDAIRE" : "SECONDARY"}
        </text>

        {/* X axis */}
        <line x1={PAD} y1={PAD + 27 + PLOT_H} x2={PAD + PLOT_W + 14} y2={PAD + 27 + PLOT_H} stroke="#334155" strokeWidth="2" />
        <polygon points={`${PAD + PLOT_W + 14},${PAD + 27 + PLOT_H - 5} ${PAD + PLOT_W + 22},${PAD + 27 + PLOT_H} ${PAD + PLOT_W + 14},${PAD + 27 + PLOT_H + 5}`} fill="#334155" />
        <text x={PAD + PLOT_W / 2} y={PAD + 27 + PLOT_H + 27} textAnchor="middle" fontSize="13" fill="#374151" fontWeight="500">
          {isFr ? "Urgence →" : "Urgency →"}
        </text>
        {[1, 2, 3, 4, 5].map((v) => (
          <text key={v} x={plotX(v)} y={PAD + 27 + PLOT_H + 19} textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">{v}</text>
        ))}

        {/* Y axis */}
        <line x1={PAD} y1={PAD + 27 + PLOT_H} x2={PAD} y2={PAD + 14} stroke="#334155" strokeWidth="2" />
        <polygon points={`${PAD - 5},${PAD + 14} ${PAD},${PAD + 5} ${PAD + 5},${PAD + 14}`} fill="#334155" />
        <text x={PAD - 40} y={PAD + 27 + PLOT_H / 2} textAnchor="middle" fontSize="13" fill="#374151" fontWeight="500"
          transform={`rotate(-90, ${PAD - 40}, ${PAD + 27 + PLOT_H / 2})`}>
          {isFr ? "Difficulté →" : "Difficulty →"}
        </text>
        {[1, 2, 3, 4, 5].map((v) => (
          <text key={v} x={PAD - 11} y={plotY(v) + 5} textAnchor="end" fontSize="11" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">{v}</text>
        ))}

        {/* Quadrant dividers */}
        <line x1={PAD + PLOT_W / 2} y1={PAD + 27} x2={PAD + PLOT_W / 2} y2={PAD + 27 + PLOT_H} stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="5,3" />
        <line x1={PAD} y1={PAD + 27 + PLOT_H / 2} x2={PAD + PLOT_W} y2={PAD + 27 + PLOT_H / 2} stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="5,3" />

        {/* Data points */}
        {gaps.map((gap) => {
          const x = plotX(gap.urgency);
          const y = plotY(gap.difficulty);
          return (
            <g key={gap.abbrev}>
              <circle cx={x} cy={y} r={24} fill={gap.color} fillOpacity="0.15" stroke={gap.color} strokeWidth="2" />
              <text x={x} y={y - 2} textAnchor="middle" fontSize="13" fontWeight="700" fill={gap.color} fontFamily="'JetBrains Mono', monospace">{gap.abbrev}</text>
              <text x={x} y={y + 13} textAnchor="middle" fontSize="10" fill={gap.color} fontFamily="'JetBrains Mono', monospace">{gap.urgency}/{gap.difficulty}</text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${PAD}, ${H - 38})`}>
          {gaps.map((gap, i) => (
            <g key={gap.abbrev} transform={`translate(${i * 108}, 0)`}>
              <circle cx="11" cy="11" r="8" fill={gap.color} fillOpacity="0.2" stroke={gap.color} strokeWidth="2" />
              <text x="11" y="15" textAnchor="middle" fontSize="9" fontWeight="700" fill={gap.color} fontFamily="'JetBrains Mono', monospace">{gap.abbrev}</text>
            </g>
          ))}
        </g>
        <g transform={`translate(${PAD}, ${H - 16})`}>
          {gaps.map((gap, i) => (
            <text key={gap.abbrev} x={i * 108 + 11} y="0" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="'JetBrains Mono', monospace">
              {gap.label.split(" ")[0]}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
