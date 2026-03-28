/**
 * PositioningDiagram — DigiDouble Research Portal
 * Scatter plot 2D : Latence (X) × Souveraineté (Y)
 * 11 solutions positionnées avec tooltip interactif
 * Design: Technical Blueprint — Space Grotesk + Source Serif 4
 */
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Solution {
  name: string;
  nameFr?: string;
  // x: latency score (0=very slow, 10=near-instant)
  // y: sovereignty score (0=no sovereignty, 10=full sovereignty)
  x: number;
  y: number;
  category: "commercial" | "opensource" | "research" | "digidouble" | "target";
  latencyLabel: string;
  sovereigntyLabel: string;
  sovereigntyLabelFr?: string;
  cost: string;
  note: string;
  noteFr?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const solutions: Solution[] = [
  {
    name: "Beyond Presence",
    x: 9.8,
    y: 1.5,
    category: "commercial",
    latencyLabel: "<100ms",
    sovereigntyLabel: "None",
    sovereigntyLabelFr: "Aucune",
    cost: "Enterprise",
    note: "Hyper-realistic, proprietary infra. Genesis 2 coming.",
    noteFr: "Hyper-réaliste, infra propriétaire. Genesis 2 à venir.",
  },
  {
    name: "NVIDIA ACE",
    x: 9.8,
    y: 2.0,
    category: "commercial",
    latencyLabel: "<100ms",
    sovereigntyLabel: "None",
    sovereigntyLabelFr: "Aucune",
    cost: "NVIDIA infra",
    note: "Full suite (ASR+LLM+Avatar). NVIDIA lock-in.",
    noteFr: "Suite complète (ASR+LLM+Avatar). Lock-in NVIDIA.",
  },
  {
    name: "Simli Trinity-1",
    x: 9.2,
    y: 1.5,
    category: "commercial",
    latencyLabel: "<300ms",
    sovereigntyLabel: "None",
    sovereigntyLabelFr: "Aucune",
    cost: "$0.009/min",
    note: "Cheapest on market. Gaussian Splatting. YC-backed.",
    noteFr: "Le moins cher. Gaussian Splatting. YC-backed.",
  },
  {
    name: "Runway Characters",
    x: 8.5,
    y: 1.5,
    category: "commercial",
    latencyLabel: "<500ms",
    sovereigntyLabel: "None",
    sovereigntyLabelFr: "Aucune",
    cost: "$0.20/min",
    note: "March 2026. Single image → avatar. WebRTC GWM-1.",
    noteFr: "Mars 2026. Image unique → avatar. WebRTC GWM-1.",
  },
  {
    name: "Anam",
    x: 8.0,
    y: 1.5,
    category: "commercial",
    latencyLabel: "Good",
    sovereigntyLabel: "None",
    sovereigntyLabelFr: "Aucune",
    cost: "~$0.18/min",
    note: "Emotional intelligence. Ex-Synthesia founders.",
    noteFr: "Intelligence émotionnelle. Fondateurs ex-Synthesia.",
  },
  {
    name: "D-ID V4",
    x: 7.5,
    y: 2.5,
    category: "commercial",
    latencyLabel: "Improved V4",
    sovereigntyLabel: "VPC option",
    sovereigntyLabelFr: "Option VPC",
    cost: "~$0.35/min",
    note: "March 2026. LLM agents. VPC/on-prem option.",
    noteFr: "Mars 2026. Agents LLM. Option VPC/on-prem.",
  },
  {
    name: "HeyGen",
    x: 5.5,
    y: 1.0,
    category: "commercial",
    latencyLabel: "2–5s",
    sovereigntyLabel: "None",
    sovereigntyLabelFr: "Aucune",
    cost: "High",
    note: "Market leader. Real-time streaming. US cloud.",
    noteFr: "Leader marché. Streaming temps réel. Cloud US.",
  },
  {
    name: "HeyGem OS",
    x: 3.5,
    y: 7.5,
    category: "opensource",
    latencyLabel: "5–15s",
    sovereigntyLabel: "Full (self-hosted)",
    sovereigntyLabelFr: "Totale (self-hosted)",
    cost: "GPU Exoscale",
    note: "Used by DigiDouble. Docker. 30% gain on Arch Linux.",
    noteFr: "Utilisé par DigiDouble. Docker. +30% perf Arch Linux.",
  },
  {
    name: "bitHuman",
    x: 6.5,
    y: 5.5,
    category: "commercial",
    latencyLabel: "Average",
    sovereigntyLabel: "Partial (self-hosted)",
    sovereigntyLabelFr: "Partielle (self-hosted)",
    cost: "$0.01/min self-hosted",
    note: "World's first CPU avatar. Self-hosted possible.",
    noteFr: "Premier avatar CPU mondial. Self-hosted possible.",
  },
  {
    name: "SoulX-FlashTalk",
    x: 8.8,
    y: 1.0,
    category: "research",
    latencyLabel: "0.87s startup",
    sovereigntyLabel: "None (research)",
    sovereigntyLabelFr: "Aucune (recherche)",
    cost: "8xH800",
    note: "14B DiT. Sub-second startup. arXiv 2512.23379.",
    noteFr: "14B DiT. Démarrage sub-seconde. arXiv 2512.23379.",
  },
  {
    name: "AvatarForcing",
    x: 9.0,
    y: 1.0,
    category: "research",
    latencyLabel: "Real-time",
    sovereigntyLabel: "None (research)",
    sovereigntyLabelFr: "Aucune (recherche)",
    cost: "Research GPU",
    note: "1-step streaming diffusion. arXiv 2603.14331.",
    noteFr: "Diffusion streaming 1-step. arXiv 2603.14331.",
  },
  {
    name: "DigiDouble",
    nameFr: "DigiDouble (actuel)",
    x: 3.0,
    y: 8.5,
    category: "digidouble",
    latencyLabel: "6–12s",
    sovereigntyLabel: "Full (Swiss GPU)",
    sovereigntyLabelFr: "Totale (GPU suisse)",
    cost: "Exoscale GPU",
    note: "Current state. HeyGem OS. Swiss infrastructure.",
    noteFr: "État actuel. HeyGem OS. Infrastructure suisse.",
  },
  {
    name: "DigiDouble R&D",
    nameFr: "DigiDouble (cible R&D)",
    x: 8.0,
    y: 8.5,
    category: "target",
    latencyLabel: "<2s",
    sovereigntyLabel: "Full (Swiss GPU)",
    sovereigntyLabelFr: "Totale (GPU suisse)",
    cost: "Sovereign GPU",
    note: "Axis 1 R&D target. The gap to fill.",
    noteFr: "Cible Axe 1 R&D. Le gap à combler.",
  },
];

// ─── Category config ──────────────────────────────────────────────────────────

const categoryConfig = {
  commercial: { color: "oklch(0.72 0.18 200)", label: "Commercial", labelFr: "Commercial", shape: "circle" },
  opensource: { color: "oklch(0.65 0.18 145)", label: "Open-source", labelFr: "Open-source", shape: "square" },
  research: { color: "oklch(0.75 0.16 75)", label: "Research", labelFr: "Recherche", shape: "diamond" },
  digidouble: { color: "oklch(0.60 0.20 25)", label: "DigiDouble (current)", labelFr: "DigiDouble (actuel)", shape: "star" },
  target: { color: "oklch(0.45 0.22 145)", label: "DigiDouble (R&D target)", labelFr: "DigiDouble (cible R&D)", shape: "star" },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function PositioningDiagram() {
  const { lang } = useLang();
  const isFr = lang === "fr";
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);

  // SVG viewport
  const W = 600;
  const H = 420;
  const PAD = { top: 30, right: 30, bottom: 60, left: 60 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  // Map data coords (0–10) to SVG coords
  const toSvgX = (v: number) => PAD.left + (v / 10) * plotW;
  const toSvgY = (v: number) => PAD.top + plotH - (v / 10) * plotH;

  // Grid lines
  const gridLines = [0, 2, 4, 6, 8, 10];

  const hoveredSolution = solutions.find((s) => s.name === hovered);

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 px-1">
        {(Object.entries(categoryConfig) as [keyof typeof categoryConfig, typeof categoryConfig[keyof typeof categoryConfig]][]).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm shrink-0"
              style={{
                background: cfg.color,
                borderRadius: key === "commercial" ? "50%" : key === "research" ? "0" : key === "opensource" ? "2px" : "50%",
                transform: key === "research" ? "rotate(45deg)" : undefined,
              }}
            />
            <span className="text-xs text-slate-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? cfg.labelFr : cfg.label}
            </span>
          </div>
        ))}
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full max-w-2xl mx-auto"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {/* Background */}
          <rect x={PAD.left} y={PAD.top} width={plotW} height={plotH} fill="oklch(0.98 0.005 200)" rx="4" />

          {/* Quadrant shading */}
          {/* Top-right: ideal zone (high latency score + high sovereignty) */}
          <rect
            x={toSvgX(5)} y={PAD.top}
            width={toSvgX(10) - toSvgX(5)} height={toSvgY(5) - PAD.top}
            fill="oklch(0.65 0.18 145 / 0.06)"
          />
          <text x={toSvgX(7.5)} y={PAD.top + 14} textAnchor="middle" fontSize="9" fill="oklch(0.65 0.18 145)" fontWeight="600" letterSpacing="0.05em">
            {isFr ? "ZONE IDÉALE" : "IDEAL ZONE"}
          </text>

          {/* Bottom-left: current DigiDouble problem zone */}
          <rect
            x={PAD.left} y={toSvgY(5)}
            width={toSvgX(5) - PAD.left} height={plotH - (toSvgY(5) - PAD.top)}
            fill="oklch(0.60 0.20 25 / 0.04)"
          />
          <text x={toSvgX(2.5)} y={toSvgY(0) - 6} textAnchor="middle" fontSize="9" fill="oklch(0.60 0.20 25 / 0.7)" fontWeight="600" letterSpacing="0.05em">
            {isFr ? "ZONE PROBLÈME" : "PROBLEM ZONE"}
          </text>

          {/* Grid lines */}
          {gridLines.map((v) => (
            <g key={v}>
              <line x1={toSvgX(v)} y1={PAD.top} x2={toSvgX(v)} y2={PAD.top + plotH} stroke="oklch(0.85 0.01 200)" strokeWidth="0.5" />
              <line x1={PAD.left} y1={toSvgY(v)} x2={PAD.left + plotW} y2={toSvgY(v)} stroke="oklch(0.85 0.01 200)" strokeWidth="0.5" />
            </g>
          ))}

          {/* Axis lines */}
          <line x1={PAD.left} y1={PAD.top + plotH} x2={PAD.left + plotW} y2={PAD.top + plotH} stroke="oklch(0.7 0.02 200)" strokeWidth="1" />
          <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + plotH} stroke="oklch(0.7 0.02 200)" strokeWidth="1" />

          {/* X axis labels */}
          <text x={PAD.left} y={PAD.top + plotH + 18} textAnchor="middle" fontSize="8" fill="oklch(0.60 0.02 200)">
            {isFr ? "Lent" : "Slow"}
          </text>
          <text x={PAD.left + plotW} y={PAD.top + plotH + 18} textAnchor="middle" fontSize="8" fill="oklch(0.60 0.02 200)">
            {isFr ? "Rapide" : "Fast"}
          </text>
          <text x={PAD.left + plotW / 2} y={PAD.top + plotH + 36} textAnchor="middle" fontSize="10" fill="oklch(0.45 0.04 200)" fontWeight="600" letterSpacing="0.04em">
            {isFr ? "LATENCE  →  RAPIDITÉ" : "LATENCY  →  SPEED"}
          </text>

          {/* Y axis labels */}
          <text
            x={16}
            y={PAD.top + plotH}
            textAnchor="middle"
            fontSize="8"
            fill="oklch(0.60 0.02 200)"
            transform={`rotate(-90, 16, ${PAD.top + plotH / 2})`}
          >
            {isFr ? "Dépendant" : "Dependent"}
          </text>
          <text
            x={16}
            y={PAD.top}
            textAnchor="middle"
            fontSize="8"
            fill="oklch(0.60 0.02 200)"
            transform={`rotate(-90, 16, ${PAD.top + plotH / 2})`}
          >
            {isFr ? "Souverain" : "Sovereign"}
          </text>
          <text
            x={14}
            y={PAD.top + plotH / 2}
            textAnchor="middle"
            fontSize="10"
            fill="oklch(0.45 0.04 200)"
            fontWeight="600"
            letterSpacing="0.04em"
            transform={`rotate(-90, 14, ${PAD.top + plotH / 2})`}
          >
            {isFr ? "SOUVERAINETÉ  →" : "SOVEREIGNTY  →"}
          </text>

          {/* Arrow from DigiDouble current → target */}
          {(() => {
            const cur = solutions.find((s) => s.category === "digidouble")!;
            const tgt = solutions.find((s) => s.category === "target")!;
            const x1 = toSvgX(cur.x) + 8;
            const y1 = toSvgY(cur.y);
            const x2 = toSvgX(tgt.x) - 10;
            const y2 = toSvgY(tgt.y);
            return (
              <g>
                <defs>
                  <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="3" refY="2" orient="auto">
                    <polygon points="0 0, 6 2, 0 4" fill="oklch(0.45 0.22 145)" />
                  </marker>
                </defs>
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="oklch(0.45 0.22 145)"
                  strokeWidth="1.5"
                  strokeDasharray="5,3"
                  markerEnd="url(#arrowhead)"
                />
                <text
                  x={(x1 + x2) / 2}
                  y={(y1 + y2) / 2 - 6}
                  textAnchor="middle"
                  fontSize="8"
                  fill="oklch(0.45 0.22 145)"
                  fontWeight="700"
                  letterSpacing="0.03em"
                >
                  {isFr ? "OBJECTIF R&D" : "R&D TARGET"}
                </text>
              </g>
            );
          })()}

          {/* Data points */}
          {solutions.map((s) => {
            const cx = toSvgX(s.x);
            const cy = toSvgY(s.y);
            const cfg = categoryConfig[s.category];
            const isHovered = hovered === s.name;
            const r = s.category === "digidouble" || s.category === "target" ? 9 : 7;

            return (
              <g
                key={s.name}
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => {
                  setHovered(s.name);
                  const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                  setTooltip({ x: cx, y: cy });
                }}
                onMouseLeave={() => {
                  setHovered(null);
                  setTooltip(null);
                }}
              >
                {/* Glow for DigiDouble */}
                {(s.category === "digidouble" || s.category === "target") && (
                  <circle cx={cx} cy={cy} r={r + 5} fill={cfg.color} opacity="0.15" />
                )}

                {/* Shape */}
                {s.category === "research" ? (
                  <rect
                    x={cx - r * 0.75}
                    y={cy - r * 0.75}
                    width={r * 1.5}
                    height={r * 1.5}
                    fill={cfg.color}
                    opacity={isHovered ? 1 : 0.85}
                    transform={`rotate(45, ${cx}, ${cy})`}
                    stroke="white"
                    strokeWidth="1.5"
                  />
                ) : s.category === "opensource" ? (
                  <rect
                    x={cx - r * 0.8}
                    y={cy - r * 0.8}
                    width={r * 1.6}
                    height={r * 1.6}
                    fill={cfg.color}
                    opacity={isHovered ? 1 : 0.85}
                    rx="2"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                ) : (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={cfg.color}
                    opacity={isHovered ? 1 : 0.85}
                    stroke="white"
                    strokeWidth={s.category === "target" ? 2.5 : 1.5}
                    strokeDasharray={s.category === "target" ? "3,2" : undefined}
                  />
                )}

                {/* Label */}
                <text
                  x={cx}
                  y={cy - r - 4}
                  textAnchor="middle"
                  fontSize={s.category === "digidouble" || s.category === "target" ? "8.5" : "7.5"}
                  fontWeight={s.category === "digidouble" || s.category === "target" ? "700" : "500"}
                  fill={isHovered ? cfg.color : "oklch(0.35 0.04 200)"}
                >
                  {isFr && s.nameFr ? s.nameFr : s.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Tooltip panel */}
      {hoveredSolution && (
        <div
          className="mt-3 border rounded-lg p-4 transition-all"
          style={{
            borderColor: categoryConfig[hoveredSolution.category].color + "44",
            background: categoryConfig[hoveredSolution.category].color + "08",
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                  style={{
                    background: categoryConfig[hoveredSolution.category].color + "18",
                    color: categoryConfig[hoveredSolution.category].color,
                  }}
                >
                  {isFr
                    ? categoryConfig[hoveredSolution.category].labelFr
                    : categoryConfig[hoveredSolution.category].label}
                </span>
                <span className="font-bold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr && hoveredSolution.nameFr ? hoveredSolution.nameFr : hoveredSolution.name}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr && hoveredSolution.noteFr ? hoveredSolution.noteFr : hoveredSolution.note}
              </p>
            </div>
            <div className="shrink-0 text-right space-y-1">
              <div>
                <div className="text-xs text-slate-400 font-mono">{isFr ? "Latence" : "Latency"}</div>
                <div
                  className="text-sm font-bold font-mono"
                  style={{ color: categoryConfig[hoveredSolution.category].color }}
                >
                  {hoveredSolution.latencyLabel}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono">{isFr ? "Souveraineté" : "Sovereignty"}</div>
                <div className="text-xs font-mono text-slate-600">
                  {isFr && hoveredSolution.sovereigntyLabelFr
                    ? hoveredSolution.sovereigntyLabelFr
                    : hoveredSolution.sovereigntyLabel}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono">{isFr ? "Coût" : "Cost"}</div>
                <div className="text-xs font-mono text-slate-600">{hoveredSolution.cost}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instruction */}
      {!hoveredSolution && (
        <p className="text-xs text-slate-400 text-center mt-2 italic" style={{ fontFamily: "'Source Serif 4', serif" }}>
          {isFr ? "Survolez un point pour voir les détails" : "Hover a point to see details"}
        </p>
      )}
    </div>
  );
}
