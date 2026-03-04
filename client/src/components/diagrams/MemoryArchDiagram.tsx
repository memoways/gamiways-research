/*
 * MemoryArchDiagram — Architecture mémoire conversationnelle 3 couches
 * Visualise : Layer 1 (context window) → Layer 2 (vector DB) → Layer 3 (SLM/PostgreSQL)
 * avec flux de données entre couches et coûts
 */

export default function MemoryArchDiagram() {
  const W = 760;
  const H = 320;

  const layers = [
    {
      id: "L1",
      label: "LAYER 1",
      sublabel: "Mémoire de Nœud",
      type: "Court terme",
      storage: "LLM Context Window",
      cost: "Coût: ÉLEVÉ",
      costColor: "#dc2626",
      items: ["Conversation actuelle", "Variables nœud", "État émotionnel"],
      color: "#dc2626",
      bg: "#fef2f2",
      x: 40,
    },
    {
      id: "L2",
      label: "LAYER 2",
      sublabel: "Mémoire de Session",
      type: "Moyen terme",
      storage: "Vector DB / RAG",
      cost: "Coût: MOYEN",
      costColor: "#d97706",
      items: ["Chemin nœuds visités", "Score progression", "Historique résumé"],
      color: "#d97706",
      bg: "#fffbeb",
      x: 280,
    },
    {
      id: "L3",
      label: "LAYER 3",
      sublabel: "Mémoire Utilisateur",
      type: "Long terme",
      storage: "PostgreSQL + SLM",
      cost: "Coût: FAIBLE",
      costColor: "#16a34a",
      items: ["Profil apprentissage", "Sessions historiques", "Patterns inter-sessions"],
      color: "#16a34a",
      bg: "#f0fdf4",
      x: 520,
    },
  ];

  const BOX_W = 200;
  const BOX_H = 200;
  const Y_BOX = 60;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {/* Title */}
        <text x="20" y="18" fontSize="10" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
          ARCHITECTURE MÉMOIRE CONVERSATIONNELLE — 3 COUCHES
        </text>

        {/* LLM central node */}
        <rect x={W / 2 - 55} y={Y_BOX + 70} width={110} height={44} rx={4}
          fill="#0f172a" stroke="#334155" strokeWidth="1" />
        <text x={W / 2} y={Y_BOX + 88} textAnchor="middle" fontSize="11" fontWeight="700" fill="#f8fafc">
          LLM / Agent
        </text>
        <text x={W / 2} y={Y_BOX + 102} textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
          Orchestrateur
        </text>

        {layers.map((layer, i) => {
          const cx = layer.x + BOX_W / 2;
          // Arrow from LLM to layer
          const llmCx = W / 2;
          const llmY = Y_BOX + 70;
          const boxRight = layer.x + BOX_W;
          const boxLeft = layer.x;
          const boxMid = layer.x + BOX_W / 2;

          // Determine arrow path
          let arrowPath = "";
          let arrowTip = { x: 0, y: 0, dir: "left" as "left" | "right" | "up" };

          if (i === 0) {
            // L1: LLM left side → L1 right side
            arrowPath = `M ${llmCx - 55} ${Y_BOX + 92} L ${boxRight} ${Y_BOX + 92}`;
            arrowTip = { x: boxRight, y: Y_BOX + 92, dir: "right" };
          } else if (i === 1) {
            // L2: LLM bottom → L2 top
            arrowPath = `M ${llmCx} ${Y_BOX + 114} L ${llmCx} ${Y_BOX + BOX_H + 20} L ${boxMid} ${Y_BOX + BOX_H + 20} L ${boxMid} ${Y_BOX + BOX_H}`;
            arrowTip = { x: boxMid, y: Y_BOX + BOX_H, dir: "up" };
          } else {
            // L3: LLM right side → L3 left side
            arrowPath = `M ${llmCx + 55} ${Y_BOX + 92} L ${boxLeft} ${Y_BOX + 92}`;
            arrowTip = { x: boxLeft, y: Y_BOX + 92, dir: "left" };
          }

          const arrowColor = layer.color + "80";

          return (
            <g key={layer.id}>
              {/* Connection arrow */}
              <path d={arrowPath} stroke={layer.color} strokeWidth="1.5" fill="none" strokeDasharray="5,3" opacity="0.6" />
              {/* Arrowhead */}
              {arrowTip.dir === "right" && (
                <polygon
                  points={`${arrowTip.x - 6},${arrowTip.y - 4} ${arrowTip.x},${arrowTip.y} ${arrowTip.x - 6},${arrowTip.y + 4}`}
                  fill={layer.color} opacity="0.6"
                />
              )}
              {arrowTip.dir === "left" && (
                <polygon
                  points={`${arrowTip.x + 6},${arrowTip.y - 4} ${arrowTip.x},${arrowTip.y} ${arrowTip.x + 6},${arrowTip.y + 4}`}
                  fill={layer.color} opacity="0.6"
                />
              )}
              {arrowTip.dir === "up" && (
                <polygon
                  points={`${arrowTip.x - 4},${arrowTip.y + 6} ${arrowTip.x},${arrowTip.y} ${arrowTip.x + 4},${arrowTip.y + 6}`}
                  fill={layer.color} opacity="0.6"
                />
              )}

              {/* Layer box */}
              <rect
                x={layer.x} y={Y_BOX} width={BOX_W} height={BOX_H}
                rx={4} fill={layer.bg} stroke={layer.color} strokeWidth="1.5"
              />
              {/* Left accent bar */}
              <rect x={layer.x} y={Y_BOX} width={4} height={BOX_H} rx={2} fill={layer.color} />

              {/* Layer ID */}
              <text x={layer.x + 14} y={Y_BOX + 18} fontSize="10" fontWeight="700" fill={layer.color} fontFamily="'JetBrains Mono', monospace">
                {layer.id}
              </text>
              {/* Label */}
              <text x={layer.x + 14} y={Y_BOX + 34} fontSize="11" fontWeight="600" fill="#0f172a">
                {layer.sublabel}
              </text>
              {/* Type */}
              <text x={layer.x + 14} y={Y_BOX + 48} fontSize="9" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
                {layer.type}
              </text>

              {/* Divider */}
              <line x1={layer.x + 10} y1={Y_BOX + 56} x2={layer.x + BOX_W - 10} y2={Y_BOX + 56} stroke="#e2e8f0" strokeWidth="1" />

              {/* Items */}
              {layer.items.map((item, j) => (
                <g key={item}>
                  <circle cx={layer.x + 18} cy={Y_BOX + 70 + j * 20} r={2.5} fill={layer.color} opacity="0.7" />
                  <text x={layer.x + 26} y={Y_BOX + 74 + j * 20} fontSize="9" fill="#475569">
                    {item}
                  </text>
                </g>
              ))}

              {/* Storage */}
              <rect x={layer.x + 10} y={Y_BOX + BOX_H - 46} width={BOX_W - 20} height={18} rx={3} fill="#f1f5f9" />
              <text x={layer.x + BOX_W / 2} y={Y_BOX + BOX_H - 33} textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="'JetBrains Mono', monospace">
                {layer.storage}
              </text>

              {/* Cost */}
              <text x={layer.x + BOX_W / 2} y={Y_BOX + BOX_H - 10} textAnchor="middle" fontSize="9" fontWeight="700" fill={layer.costColor} fontFamily="'JetBrains Mono', monospace">
                {layer.cost}
              </text>
            </g>
          );
        })}

        {/* Bottom label: total latency */}
        <text x={W / 2} y={H - 10} textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
          Objectif: -90% tokens context window · +26% précision (Mem0, 2025)
        </text>
      </svg>
    </div>
  );
}
