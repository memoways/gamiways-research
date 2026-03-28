/*
 * ResearchGapDiagram — Research gap matrix: Urgency × Difficulty
 * Rewritten: no text overlap, proper legend below, full-width layout
 * i18n: EN (default) / FR via useLang
 */
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";

export default function ResearchGapDiagram() {
  const { lang } = useLang();
  const isFr = lang === "fr";
  const [hovered, setHovered] = useState<string | null>(null);

  const gaps = [
    {
      abbrev: "AVA",
      label: isFr ? "Fidélité comportementale avatar" : "Avatar behavioral fidelity",
      urgency: 5,
      difficulty: 5,
      color: "#dc2626",
      axis: isFr ? "Axe 2b" : "Axis 2b",
    },
    {
      abbrev: "LAT",
      label: isFr ? "Latence avatar end-to-end" : "Avatar end-to-end latency",
      urgency: 5,
      difficulty: 4.4,
      color: "#ea580c",
      axis: isFr ? "Axe 1" : "Axis 1",
    },
    {
      abbrev: "MEM",
      label: isFr ? "Mémoire conversationnelle" : "Conversational memory",
      urgency: 4.6,
      difficulty: 4,
      color: "#0891b2",
      axis: isFr ? "Axe 1" : "Axis 1",
    },
    {
      abbrev: "TTS",
      label: isFr ? "TTS prosodique personnalisé" : "Personalized prosodic TTS",
      urgency: 4,
      difficulty: 4,
      color: "#d97706",
      axis: isFr ? "Axe 2a" : "Axis 2a",
    },
    {
      abbrev: "ORC",
      label: isFr ? "Orchestration déterministe-organique" : "Deterministic-organic orchestration",
      urgency: 4,
      difficulty: 3,
      color: "#7c3aed",
      axis: isFr ? "Axe 3" : "Axis 3",
    },
    {
      abbrev: "SYN",
      label: isFr ? "Synchronisation multi-flux" : "Multi-stream synchronization",
      urgency: 3,
      difficulty: 3,
      color: "#16a34a",
      axis: isFr ? "Interne" : "Internal",
    },
  ];

  // SVG canvas dimensions — wide for readability
  const W = 760;
  const H = 420;
  const PAD_L = 72;
  const PAD_R = 30;
  const PAD_T = 48;
  const PAD_B = 52;
  const PLOT_W = W - PAD_L - PAD_R;
  const PLOT_H = H - PAD_T - PAD_B;

  function px(urgency: number) { return PAD_L + ((urgency - 1) / 4) * PLOT_W; }
  function py(difficulty: number) { return PAD_T + ((5 - difficulty) / 4) * PLOT_H; }

  const hoveredGap = gaps.find((g) => g.abbrev === hovered);

  return (
    <div className="w-full">
      {/* Main SVG chart */}
      <div className="w-full overflow-hidden rounded-lg border border-slate-100" style={{ background: "oklch(0.99 0.003 200)" }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ fontFamily: "'Space Grotesk', sans-serif", display: "block" }}>

          {/* Quadrant backgrounds */}
          {/* CRITICAL — top right */}
          <rect x={PAD_L + PLOT_W / 2} y={PAD_T} width={PLOT_W / 2} height={PLOT_H / 2} fill="#fef2f2" opacity="0.6" />
          {/* COMPLEX — top left */}
          <rect x={PAD_L} y={PAD_T} width={PLOT_W / 2} height={PLOT_H / 2} fill="#fffbeb" opacity="0.5" />
          {/* PRIORITY — bottom right */}
          <rect x={PAD_L + PLOT_W / 2} y={PAD_T + PLOT_H / 2} width={PLOT_W / 2} height={PLOT_H / 2} fill="#f0fdf4" opacity="0.5" />
          {/* SECONDARY — bottom left */}
          <rect x={PAD_L} y={PAD_T + PLOT_H / 2} width={PLOT_W / 2} height={PLOT_H / 2} fill="#f8fafc" opacity="0.4" />

          {/* Quadrant labels — positioned safely in corners */}
          <text x={PAD_L + PLOT_W * 0.76} y={PAD_T + 18} textAnchor="middle" fontSize="11" fill="#dc2626" fontFamily="'JetBrains Mono', monospace" opacity="0.75" letterSpacing="1">
            {isFr ? "CRITIQUE" : "CRITICAL"}
          </text>
          <text x={PAD_L + PLOT_W * 0.24} y={PAD_T + 18} textAnchor="middle" fontSize="11" fill="#d97706" fontFamily="'JetBrains Mono', monospace" opacity="0.75" letterSpacing="1">
            {isFr ? "COMPLEXE" : "COMPLEX"}
          </text>
          <text x={PAD_L + PLOT_W * 0.76} y={PAD_T + PLOT_H - 10} textAnchor="middle" fontSize="11" fill="#16a34a" fontFamily="'JetBrains Mono', monospace" opacity="0.75" letterSpacing="1">
            {isFr ? "PRIORITAIRE" : "PRIORITY"}
          </text>
          <text x={PAD_L + PLOT_W * 0.24} y={PAD_T + PLOT_H - 10} textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" opacity="0.75" letterSpacing="1">
            {isFr ? "SECONDAIRE" : "SECONDARY"}
          </text>

          {/* Grid lines */}
          {[1, 2, 3, 4, 5].map((v) => (
            <line key={`gx${v}`} x1={px(v)} y1={PAD_T} x2={px(v)} y2={PAD_T + PLOT_H} stroke="#e2e8f0" strokeWidth="1" />
          ))}
          {[1, 2, 3, 4, 5].map((v) => (
            <line key={`gy${v}`} x1={PAD_L} y1={py(v)} x2={PAD_L + PLOT_W} y2={py(v)} stroke="#e2e8f0" strokeWidth="1" />
          ))}

          {/* Quadrant dividers — slightly stronger */}
          <line x1={PAD_L + PLOT_W / 2} y1={PAD_T} x2={PAD_L + PLOT_W / 2} y2={PAD_T + PLOT_H} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6,3" />
          <line x1={PAD_L} y1={PAD_T + PLOT_H / 2} x2={PAD_L + PLOT_W} y2={PAD_T + PLOT_H / 2} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6,3" />

          {/* X axis */}
          <line x1={PAD_L} y1={PAD_T + PLOT_H} x2={PAD_L + PLOT_W + 14} y2={PAD_T + PLOT_H} stroke="#334155" strokeWidth="2" />
          <polygon
            points={`${PAD_L + PLOT_W + 14},${PAD_T + PLOT_H - 5} ${PAD_L + PLOT_W + 22},${PAD_T + PLOT_H} ${PAD_L + PLOT_W + 14},${PAD_T + PLOT_H + 5}`}
            fill="#334155"
          />
          {/* X axis ticks + labels */}
          {[1, 2, 3, 4, 5].map((v) => (
            <g key={`xt${v}`}>
              <line x1={px(v)} y1={PAD_T + PLOT_H} x2={px(v)} y2={PAD_T + PLOT_H + 5} stroke="#94a3b8" strokeWidth="1" />
              <text x={px(v)} y={PAD_T + PLOT_H + 18} textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">{v}</text>
            </g>
          ))}
          <text x={PAD_L + PLOT_W / 2} y={H - 6} textAnchor="middle" fontSize="12" fill="#374151" fontWeight="600">
            {isFr ? "Urgence →" : "Urgency →"}
          </text>

          {/* Y axis */}
          <line x1={PAD_L} y1={PAD_T + PLOT_H} x2={PAD_L} y2={PAD_T - 8} stroke="#334155" strokeWidth="2" />
          <polygon
            points={`${PAD_L - 5},${PAD_T - 8} ${PAD_L},${PAD_T - 17} ${PAD_L + 5},${PAD_T - 8}`}
            fill="#334155"
          />
          {/* Y axis ticks + labels */}
          {[1, 2, 3, 4, 5].map((v) => (
            <g key={`yt${v}`}>
              <line x1={PAD_L - 5} y1={py(v)} x2={PAD_L} y2={py(v)} stroke="#94a3b8" strokeWidth="1" />
              <text x={PAD_L - 10} y={py(v) + 4} textAnchor="end" fontSize="11" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">{v}</text>
            </g>
          ))}
          <text
            x={18}
            y={PAD_T + PLOT_H / 2}
            textAnchor="middle"
            fontSize="12"
            fill="#374151"
            fontWeight="600"
            transform={`rotate(-90, 18, ${PAD_T + PLOT_H / 2})`}
          >
            {isFr ? "Difficulté →" : "Difficulty →"}
          </text>

          {/* Data points — rendered as React SVG with mouse events */}
          {gaps.map((gap) => {
            const x = px(gap.urgency);
            const y = py(gap.difficulty);
            const isHov = hovered === gap.abbrev;
            const r = isHov ? 28 : 22;
            return (
              <g
                key={gap.abbrev}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHovered(gap.abbrev)}
                onMouseLeave={() => setHovered(null)}
              >
                <circle cx={x} cy={y} r={r} fill={gap.color} fillOpacity={isHov ? 0.25 : 0.15} stroke={gap.color} strokeWidth={isHov ? 2.5 : 2} />
                <text x={x} y={y - 3} textAnchor="middle" fontSize="12" fontWeight="800" fill={gap.color} fontFamily="'JetBrains Mono', monospace">
                  {gap.abbrev}
                </text>
                <text x={x} y={y + 11} textAnchor="middle" fontSize="9.5" fill={gap.color} fontFamily="'JetBrains Mono', monospace" opacity="0.85">
                  {gap.urgency}/{gap.difficulty}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Tooltip — shown below chart when hovering */}
      <div
        className="mt-2 px-4 py-2.5 rounded border text-sm transition-all duration-150"
        style={{
          minHeight: "40px",
          borderColor: hoveredGap ? `${hoveredGap.color}40` : "#e2e8f0",
          background: hoveredGap ? `${hoveredGap.color}08` : "transparent",
          color: hoveredGap ? hoveredGap.color : "#94a3b8",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {hoveredGap ? (
          <span>
            <strong>{hoveredGap.abbrev}</strong> — {hoveredGap.label}
            <span className="ml-3 text-xs opacity-70 font-mono">{hoveredGap.axis} · {isFr ? "Urgence" : "Urgency"} {hoveredGap.urgency}/5 · {isFr ? "Difficulté" : "Difficulty"} {hoveredGap.difficulty}/5</span>
          </span>
        ) : (
          <span className="italic text-xs">{isFr ? "Survoler un point pour les détails" : "Hover a point for details"}</span>
        )}
      </div>

      {/* Legend — clean grid below */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {gaps.map((gap) => (
          <div
            key={gap.abbrev}
            className="flex items-center gap-2 px-3 py-2 rounded border cursor-pointer transition-all duration-100"
            style={{
              borderColor: hovered === gap.abbrev ? `${gap.color}60` : "#e2e8f0",
              background: hovered === gap.abbrev ? `${gap.color}08` : "transparent",
            }}
            onMouseEnter={() => setHovered(gap.abbrev)}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black flex-shrink-0"
              style={{ background: `${gap.color}18`, color: gap.color, border: `1.5px solid ${gap.color}50`, fontFamily: "'JetBrains Mono', monospace" }}
            >
              {gap.abbrev}
            </span>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-700 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {gap.label}
              </div>
              <div className="text-xs font-mono opacity-60" style={{ color: gap.color }}>{gap.axis}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
