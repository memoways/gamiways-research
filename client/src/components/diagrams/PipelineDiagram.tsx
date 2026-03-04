/*
 * PipelineDiagram — Flux conversationnel end-to-end
 * Visualise le pipeline : Utilisateur → ASR → LLM → TTS → Avatar → Utilisateur
 * Design: Technical Blueprint, SVG inline, couleurs sémantiques
 */

interface Stage {
  id: string;
  label: string;
  sublabel: string;
  current: string;
  target: string;
  color: string;
  isBottleneck?: boolean;
}

const stages: Stage[] = [
  { id: "user-in", label: "Utilisateur", sublabel: "Parole", current: "—", target: "—", color: "#64748b" },
  { id: "asr", label: "ASR / STT", sublabel: "Audiogami", current: "2–5s", target: "300ms", color: "#0891b2" },
  { id: "routing", label: "Routing", sublabel: "Orchestration", current: "1–2s", target: "200ms", color: "#0891b2" },
  { id: "llm", label: "LLM", sublabel: "Mémoire + RAG", current: "3–8s", target: "500ms", color: "#d97706" },
  { id: "tts", label: "TTS", sublabel: "Synthèse vocale", current: "2–4s", target: "200ms", color: "#0891b2" },
  { id: "avatar", label: "Avatar", sublabel: "Génération vidéo", current: "5–15s", target: "500ms", color: "#dc2626", isBottleneck: true },
  { id: "user-out", label: "Utilisateur", sublabel: "Réponse", current: "—", target: "—", color: "#64748b" },
];

export default function PipelineDiagram() {
  const BOX_W = 90;
  const BOX_H = 64;
  const GAP = 36;
  const TOTAL_W = stages.length * BOX_W + (stages.length - 1) * GAP;
  const SVG_H = 180;
  const Y_CENTER = 70;

  return (
    <div className="w-full overflow-x-auto">
      <div style={{ minWidth: `${TOTAL_W + 40}px` }}>
        <svg
          viewBox={`0 0 ${TOTAL_W + 40} ${SVG_H}`}
          width="100%"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {/* Title */}
          <text x="20" y="18" fontSize="10" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
            PIPELINE CONVERSATIONNEL END-TO-END
          </text>

          {stages.map((stage, i) => {
            const x = 20 + i * (BOX_W + GAP);
            const isEndpoint = stage.id === "user-in" || stage.id === "user-out";

            return (
              <g key={stage.id}>
                {/* Arrow between stages */}
                {i < stages.length - 1 && (
                  <g>
                    <line
                      x1={x + BOX_W}
                      y1={Y_CENTER + BOX_H / 2}
                      x2={x + BOX_W + GAP}
                      y2={Y_CENTER + BOX_H / 2}
                      stroke={stage.isBottleneck ? "#dc2626" : "#cbd5e1"}
                      strokeWidth={stage.isBottleneck ? 2 : 1.5}
                      strokeDasharray={stage.isBottleneck ? "4,2" : undefined}
                    />
                    {/* Arrowhead */}
                    <polygon
                      points={`${x + BOX_W + GAP},${Y_CENTER + BOX_H / 2 - 4} ${x + BOX_W + GAP + 6},${Y_CENTER + BOX_H / 2} ${x + BOX_W + GAP},${Y_CENTER + BOX_H / 2 + 4}`}
                      fill={stage.isBottleneck ? "#dc2626" : "#94a3b8"}
                    />
                  </g>
                )}

                {/* Box */}
                <rect
                  x={x}
                  y={Y_CENTER}
                  width={BOX_W}
                  height={BOX_H}
                  rx={isEndpoint ? 32 : 4}
                  fill={isEndpoint ? "#f1f5f9" : stage.isBottleneck ? "#fef2f2" : "#f8fafc"}
                  stroke={stage.isBottleneck ? "#dc2626" : stage.color}
                  strokeWidth={stage.isBottleneck ? 2 : 1}
                />

                {/* Bottleneck indicator */}
                {stage.isBottleneck && (
                  <text x={x + BOX_W / 2} y={Y_CENTER - 8} textAnchor="middle" fontSize="9" fill="#dc2626" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
                    ⚠ BOTTLENECK
                  </text>
                )}

                {/* Stage label */}
                <text
                  x={x + BOX_W / 2}
                  y={Y_CENTER + 20}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill={isEndpoint ? "#64748b" : stage.isBottleneck ? "#dc2626" : "#0f172a"}
                >
                  {stage.label}
                </text>

                {/* Sublabel */}
                <text
                  x={x + BOX_W / 2}
                  y={Y_CENTER + 34}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#94a3b8"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {stage.sublabel}
                </text>

                {/* Current latency */}
                {!isEndpoint && (
                  <>
                    <text
                      x={x + BOX_W / 2}
                      y={Y_CENTER + 50}
                      textAnchor="middle"
                      fontSize="9"
                      fill={stage.isBottleneck ? "#dc2626" : "#64748b"}
                      fontFamily="'JetBrains Mono', monospace"
                      fontWeight="600"
                    >
                      {stage.current}
                    </text>
                    {/* Target below */}
                    <text
                      x={x + BOX_W / 2}
                      y={Y_CENTER + BOX_H + 16}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#16a34a"
                      fontFamily="'JetBrains Mono', monospace"
                    >
                      → {stage.target}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* Legend */}
          <g transform={`translate(20, ${SVG_H - 22})`}>
            <rect x="0" y="0" width="8" height="8" fill="#f8fafc" stroke="#0891b2" strokeWidth="1" rx="1" />
            <text x="12" y="8" fontSize="9" fill="#64748b" fontFamily="'JetBrains Mono', monospace">Latence actuelle</text>
            <text x="12" y="18" fontSize="9" fill="#16a34a" fontFamily="'JetBrains Mono', monospace">→ Cible</text>
            <rect x="110" y="0" width="8" height="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" rx="1" />
            <text x="122" y="8" fontSize="9" fill="#dc2626" fontFamily="'JetBrains Mono', monospace">Goulot d'étranglement</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
