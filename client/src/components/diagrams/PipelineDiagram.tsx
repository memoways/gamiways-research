/*
 * PipelineDiagram — Conversational pipeline end-to-end
 * i18n: EN (default) / FR via useLang
 * Size: +35% from original
 */
import { useLang } from "@/contexts/LangContext";

export default function PipelineDiagram() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  const stages = [
    { id: "user-in",  label: isFr ? "Utilisateur" : "User",       sublabel: isFr ? "Parole" : "Speech",          current: "—",     target: "—",     color: "#64748b" },
    { id: "asr",      label: "ASR / STT",                          sublabel: "Audiogami",                          current: "2–5s",  target: "300ms", color: "#0891b2" },
    { id: "routing",  label: "Routing",                            sublabel: "Orchestration",                      current: "1–2s",  target: "200ms", color: "#0891b2" },
    { id: "llm",      label: "LLM",                                sublabel: isFr ? "Mémoire + RAG" : "Memory + RAG", current: "3–8s", target: "500ms", color: "#d97706" },
    { id: "tts",      label: "TTS",                                sublabel: isFr ? "Synthèse vocale" : "Voice synthesis", current: "2–4s", target: "200ms", color: "#0891b2" },
    { id: "avatar",   label: "Avatar",                             sublabel: isFr ? "Génération vidéo" : "Video generation", current: "5–15s", target: "500ms", color: "#dc2626", isBottleneck: true },
    { id: "user-out", label: isFr ? "Utilisateur" : "User",       sublabel: isFr ? "Réponse" : "Response",        current: "—",     target: "—",     color: "#64748b" },
  ];

  const BOX_W = 122;
  const BOX_H = 86;
  const GAP = 48;
  const TOTAL_W = stages.length * BOX_W + (stages.length - 1) * GAP;
  const SVG_H = 240;
  const Y_CENTER = 88;

  return (
    <div className="w-full overflow-hidden">
      <div style={{ minWidth: `${TOTAL_W + 40}px` }}>
        <svg
          viewBox={`0 0 ${TOTAL_W + 40} ${SVG_H}`}
          width="100%"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {/* Title */}
          <text x="20" y="22" fontSize="13" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
            {isFr ? "PIPELINE CONVERSATIONNEL END-TO-END" : "CONVERSATIONAL PIPELINE END-TO-END"}
          </text>

          {stages.map((stage, i) => {
            const x = 20 + i * (BOX_W + GAP);
            const isEndpoint = stage.id === "user-in" || stage.id === "user-out";

            return (
              <g key={stage.id}>
                {i < stages.length - 1 && (
                  <g>
                    <line
                      x1={x + BOX_W} y1={Y_CENTER + BOX_H / 2}
                      x2={x + BOX_W + GAP} y2={Y_CENTER + BOX_H / 2}
                      stroke={stage.isBottleneck ? "#dc2626" : "#cbd5e1"}
                      strokeWidth={stage.isBottleneck ? 2.5 : 2}
                      strokeDasharray={stage.isBottleneck ? "5,3" : undefined}
                    />
                    <polygon
                      points={`${x + BOX_W + GAP},${Y_CENTER + BOX_H / 2 - 5} ${x + BOX_W + GAP + 8},${Y_CENTER + BOX_H / 2} ${x + BOX_W + GAP},${Y_CENTER + BOX_H / 2 + 5}`}
                      fill={stage.isBottleneck ? "#dc2626" : "#94a3b8"}
                    />
                  </g>
                )}

                <rect
                  x={x} y={Y_CENTER} width={BOX_W} height={BOX_H}
                  rx={isEndpoint ? 43 : 5}
                  fill={isEndpoint ? "#f1f5f9" : stage.isBottleneck ? "#fef2f2" : "#f8fafc"}
                  stroke={stage.isBottleneck ? "#dc2626" : stage.color}
                  strokeWidth={stage.isBottleneck ? 2.5 : 1.5}
                />

                {stage.isBottleneck && (
                  <text x={x + BOX_W / 2} y={Y_CENTER - 10} textAnchor="middle" fontSize="12" fill="#dc2626" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
                    ⚠ BOTTLENECK
                  </text>
                )}

                <text x={x + BOX_W / 2} y={Y_CENTER + 26} textAnchor="middle" fontSize="14" fontWeight="600"
                  fill={isEndpoint ? "#64748b" : stage.isBottleneck ? "#dc2626" : "#0f172a"}>
                  {stage.label}
                </text>

                <text x={x + BOX_W / 2} y={Y_CENTER + 44} textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
                  {stage.sublabel}
                </text>

                {!isEndpoint && (
                  <>
                    <text x={x + BOX_W / 2} y={Y_CENTER + 64} textAnchor="middle" fontSize="12"
                      fill={stage.isBottleneck ? "#dc2626" : "#64748b"} fontFamily="'JetBrains Mono', monospace" fontWeight="600">
                      {stage.current}
                    </text>
                    <text x={x + BOX_W / 2} y={Y_CENTER + BOX_H + 22} textAnchor="middle" fontSize="12" fill="#16a34a" fontFamily="'JetBrains Mono', monospace">
                      → {stage.target}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* Legend */}
          <g transform={`translate(20, ${SVG_H - 28})`}>
            <rect x="0" y="0" width="10" height="10" fill="#f8fafc" stroke="#0891b2" strokeWidth="1.5" rx="1" />
            <text x="15" y="10" fontSize="11" fill="#64748b" fontFamily="'JetBrains Mono', monospace">
              {isFr ? "Latence actuelle" : "Current latency"}
            </text>
            <text x="15" y="23" fontSize="11" fill="#16a34a" fontFamily="'JetBrains Mono', monospace">
              {isFr ? "→ Cible" : "→ Target"}
            </text>
            <rect x="145" y="0" width="10" height="10" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" rx="1" />
            <text x="160" y="10" fontSize="11" fill="#dc2626" fontFamily="'JetBrains Mono', monospace">
              {isFr ? "Goulot d'étranglement" : "Bottleneck"}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
