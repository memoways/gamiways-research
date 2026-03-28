/*
 * MemoryArchDiagram — 3-layer conversational memory architecture
 * i18n: EN (default) / FR via useLang
 * Size: +35% from original
 */
import { useLang } from "@/contexts/LangContext";

export default function MemoryArchDiagram() {
  const { lang } = useLang();
  const isFr = lang === "fr";
  const W = 1020;
  const H = 430;

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
      x: 375,
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
      x: 710,
    },
  ];

  const BOX_W = 270;
  const BOX_H = 270;
  const Y_BOX = 80;

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {/* Title */}
        <text x="20" y="24" fontSize="13" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
          {isFr ? "ARCHITECTURE MÉMOIRE CONVERSATIONNELLE — 3 COUCHES" : "CONVERSATIONAL MEMORY ARCHITECTURE — 3 LAYERS"}
        </text>

        {/* LLM central node */}
        <rect x={W / 2 - 74} y={Y_BOX + 94} width={148} height={60} rx={5} fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        <text x={W / 2} y={Y_BOX + 120} textAnchor="middle" fontSize="15" fontWeight="700" fill="#f8fafc">LLM / Agent</text>
        <text x={W / 2} y={Y_BOX + 138} textAnchor="middle" fontSize="12" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
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
            arrowPath = `M ${llmCx - 74} ${Y_BOX + 124} L ${boxRight} ${Y_BOX + 124}`;
            arrowTip = { x: boxRight, y: Y_BOX + 124, dir: "right" };
          } else if (i === 1) {
            arrowPath = `M ${llmCx} ${Y_BOX + 154} L ${llmCx} ${Y_BOX + BOX_H + 26} L ${boxMid} ${Y_BOX + BOX_H + 26} L ${boxMid} ${Y_BOX + BOX_H}`;
            arrowTip = { x: boxMid, y: Y_BOX + BOX_H, dir: "up" };
          } else {
            arrowPath = `M ${llmCx + 74} ${Y_BOX + 124} L ${boxLeft} ${Y_BOX + 124}`;
            arrowTip = { x: boxLeft, y: Y_BOX + 124, dir: "left" };
          }

          return (
            <g key={layer.id}>
              <path d={arrowPath} stroke={layer.color} strokeWidth="2" fill="none" strokeDasharray="6,4" opacity="0.6" />
              {arrowTip.dir === "right" && (
                <polygon points={`${arrowTip.x - 8},${arrowTip.y - 5} ${arrowTip.x},${arrowTip.y} ${arrowTip.x - 8},${arrowTip.y + 5}`} fill={layer.color} opacity="0.6" />
              )}
              {arrowTip.dir === "left" && (
                <polygon points={`${arrowTip.x + 8},${arrowTip.y - 5} ${arrowTip.x},${arrowTip.y} ${arrowTip.x + 8},${arrowTip.y + 5}`} fill={layer.color} opacity="0.6" />
              )}
              {arrowTip.dir === "up" && (
                <polygon points={`${arrowTip.x - 5},${arrowTip.y + 8} ${arrowTip.x},${arrowTip.y} ${arrowTip.x + 5},${arrowTip.y + 8}`} fill={layer.color} opacity="0.6" />
              )}

              <rect x={layer.x} y={Y_BOX} width={BOX_W} height={BOX_H} rx={5} fill={layer.bg} stroke={layer.color} strokeWidth="2" />
              <rect x={layer.x} y={Y_BOX} width={5} height={BOX_H} rx={3} fill={layer.color} />
              <text x={layer.x + 18} y={Y_BOX + 24} fontSize="13" fontWeight="700" fill={layer.color} fontFamily="'JetBrains Mono', monospace">{layer.id}</text>
              <text x={layer.x + 18} y={Y_BOX + 46} fontSize="14" fontWeight="600" fill="#0f172a">{layer.sublabel}</text>
              <text x={layer.x + 18} y={Y_BOX + 64} fontSize="12" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">{layer.type}</text>
              <line x1={layer.x + 12} y1={Y_BOX + 74} x2={layer.x + BOX_W - 12} y2={Y_BOX + 74} stroke="#e2e8f0" strokeWidth="1.5" />
              {layer.items.map((item, j) => (
                <g key={item}>
                  <circle cx={layer.x + 24} cy={Y_BOX + 94 + j * 27} r={3.5} fill={layer.color} opacity="0.7" />
                  <text x={layer.x + 36} y={Y_BOX + 99 + j * 27} fontSize="12" fill="#475569">{item}</text>
                </g>
              ))}
              <rect x={layer.x + 12} y={Y_BOX + BOX_H - 62} width={BOX_W - 24} height={24} rx={4} fill="#f1f5f9" />
              <text x={layer.x + BOX_W / 2} y={Y_BOX + BOX_H - 44} textAnchor="middle" fontSize="12" fill="#64748b" fontFamily="'JetBrains Mono', monospace">{layer.storage}</text>
              <text x={layer.x + BOX_W / 2} y={Y_BOX + BOX_H - 14} textAnchor="middle" fontSize="12" fontWeight="700" fill={layer.costColor} fontFamily="'JetBrains Mono', monospace">{layer.cost}</text>
            </g>
          );
        })}

        {/* Bottom note */}
        <text x={W / 2} y={H - 12} textAnchor="middle" fontSize="12" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
          {isFr
            ? "Objectif: -90% tokens context window · +26% précision (Mem0, 2025)"
            : "Goal: -90% context window tokens · +26% accuracy (Mem0, 2025)"}
        </text>
      </svg>
    </div>
  );
}
