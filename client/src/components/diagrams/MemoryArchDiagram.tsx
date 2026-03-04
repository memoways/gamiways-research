/*
 * MemoryArchDiagram — 3-layer conversational memory architecture
 * i18n: EN (default) / FR via useLang
 */
import { useLang } from "@/contexts/LangContext";

export default function MemoryArchDiagram() {
  const { lang } = useLang();
  const isFr = lang === "fr";
  const W = 760;
  const H = 320;

  const layers = [
    {
      id: "L1",
      label: "LAYER 1",
      sublabel: isFr ? "Mémoire de Nœud" : "Node Memory",
      type: isFr ? "Court terme" : "Short-term",
      storage: "LLM Context Window",
      cost: isFr ? "Coût: ÉLEVÉ" : "Cost: HIGH",
      costColor: "#dc2626",
      items: isFr
        ? ["Conversation actuelle", "Variables nœud", "État émotionnel"]
        : ["Current conversation", "Node variables", "Emotional state"],
      color: "#dc2626",
      bg: "#fef2f2",
      x: 40,
    },
    {
      id: "L2",
      label: "LAYER 2",
      sublabel: isFr ? "Mémoire de Session" : "Session Memory",
      type: isFr ? "Moyen terme" : "Medium-term",
      storage: "Vector DB / RAG",
      cost: isFr ? "Coût: MOYEN" : "Cost: MEDIUM",
      costColor: "#d97706",
      items: isFr
        ? ["Chemin nœuds visités", "Score progression", "Historique résumé"]
        : ["Visited node path", "Progression score", "Summarized history"],
      color: "#d97706",
      bg: "#fffbeb",
      x: 280,
    },
    {
      id: "L3",
      label: "LAYER 3",
      sublabel: isFr ? "Mémoire Utilisateur" : "User Memory",
      type: isFr ? "Long terme" : "Long-term",
      storage: "PostgreSQL + SLM",
      cost: isFr ? "Coût: FAIBLE" : "Cost: LOW",
      costColor: "#16a34a",
      items: isFr
        ? ["Profil apprentissage", "Sessions historiques", "Patterns inter-sessions"]
        : ["Learning profile", "Historical sessions", "Cross-session patterns"],
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
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {/* Title */}
        <text x="20" y="18" fontSize="10" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
          {isFr ? "ARCHITECTURE MÉMOIRE CONVERSATIONNELLE — 3 COUCHES" : "CONVERSATIONAL MEMORY ARCHITECTURE — 3 LAYERS"}
        </text>

        {/* LLM central node */}
        <rect x={W / 2 - 55} y={Y_BOX + 70} width={110} height={44} rx={4} fill="#0f172a" stroke="#334155" strokeWidth="1" />
        <text x={W / 2} y={Y_BOX + 88} textAnchor="middle" fontSize="11" fontWeight="700" fill="#f8fafc">LLM / Agent</text>
        <text x={W / 2} y={Y_BOX + 102} textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
          {isFr ? "Orchestrateur" : "Orchestrator"}
        </text>

        {layers.map((layer, i) => {
          const llmCx = W / 2;
          const boxRight = layer.x + BOX_W;
          const boxLeft = layer.x;
          const boxMid = layer.x + BOX_W / 2;
          let arrowPath = "";
          let arrowTip = { x: 0, y: 0, dir: "left" as "left" | "right" | "up" };

          if (i === 0) {
            arrowPath = `M ${llmCx - 55} ${Y_BOX + 92} L ${boxRight} ${Y_BOX + 92}`;
            arrowTip = { x: boxRight, y: Y_BOX + 92, dir: "right" };
          } else if (i === 1) {
            arrowPath = `M ${llmCx} ${Y_BOX + 114} L ${llmCx} ${Y_BOX + BOX_H + 20} L ${boxMid} ${Y_BOX + BOX_H + 20} L ${boxMid} ${Y_BOX + BOX_H}`;
            arrowTip = { x: boxMid, y: Y_BOX + BOX_H, dir: "up" };
          } else {
            arrowPath = `M ${llmCx + 55} ${Y_BOX + 92} L ${boxLeft} ${Y_BOX + 92}`;
            arrowTip = { x: boxLeft, y: Y_BOX + 92, dir: "left" };
          }

          return (
            <g key={layer.id}>
              <path d={arrowPath} stroke={layer.color} strokeWidth="1.5" fill="none" strokeDasharray="5,3" opacity="0.6" />
              {arrowTip.dir === "right" && (
                <polygon points={`${arrowTip.x - 6},${arrowTip.y - 4} ${arrowTip.x},${arrowTip.y} ${arrowTip.x - 6},${arrowTip.y + 4}`} fill={layer.color} opacity="0.6" />
              )}
              {arrowTip.dir === "left" && (
                <polygon points={`${arrowTip.x + 6},${arrowTip.y - 4} ${arrowTip.x},${arrowTip.y} ${arrowTip.x + 6},${arrowTip.y + 4}`} fill={layer.color} opacity="0.6" />
              )}
              {arrowTip.dir === "up" && (
                <polygon points={`${arrowTip.x - 4},${arrowTip.y + 6} ${arrowTip.x},${arrowTip.y} ${arrowTip.x + 4},${arrowTip.y + 6}`} fill={layer.color} opacity="0.6" />
              )}

              <rect x={layer.x} y={Y_BOX} width={BOX_W} height={BOX_H} rx={4} fill={layer.bg} stroke={layer.color} strokeWidth="1.5" />
              <rect x={layer.x} y={Y_BOX} width={4} height={BOX_H} rx={2} fill={layer.color} />
              <text x={layer.x + 14} y={Y_BOX + 18} fontSize="10" fontWeight="700" fill={layer.color} fontFamily="'JetBrains Mono', monospace">{layer.id}</text>
              <text x={layer.x + 14} y={Y_BOX + 34} fontSize="11" fontWeight="600" fill="#0f172a">{layer.sublabel}</text>
              <text x={layer.x + 14} y={Y_BOX + 48} fontSize="9" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">{layer.type}</text>
              <line x1={layer.x + 10} y1={Y_BOX + 56} x2={layer.x + BOX_W - 10} y2={Y_BOX + 56} stroke="#e2e8f0" strokeWidth="1" />
              {layer.items.map((item, j) => (
                <g key={item}>
                  <circle cx={layer.x + 18} cy={Y_BOX + 70 + j * 20} r={2.5} fill={layer.color} opacity="0.7" />
                  <text x={layer.x + 26} y={Y_BOX + 74 + j * 20} fontSize="9" fill="#475569">{item}</text>
                </g>
              ))}
              <rect x={layer.x + 10} y={Y_BOX + BOX_H - 46} width={BOX_W - 20} height={18} rx={3} fill="#f1f5f9" />
              <text x={layer.x + BOX_W / 2} y={Y_BOX + BOX_H - 33} textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="'JetBrains Mono', monospace">{layer.storage}</text>
              <text x={layer.x + BOX_W / 2} y={Y_BOX + BOX_H - 10} textAnchor="middle" fontSize="9" fontWeight="700" fill={layer.costColor} fontFamily="'JetBrains Mono', monospace">{layer.cost}</text>
            </g>
          );
        })}

        {/* Bottom note */}
        <text x={W / 2} y={H - 10} textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
          {isFr
            ? "Objectif: -90% tokens context window · +26% précision (Mem0, 2025)"
            : "Goal: -90% context window tokens · +26% accuracy (Mem0, 2025)"}
        </text>
      </svg>
    </div>
  );
}
