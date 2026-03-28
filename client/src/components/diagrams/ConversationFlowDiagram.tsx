/*
 * ConversationFlowDiagram — Conversational exchange sequence diagram
 * i18n: EN (default) / FR via useLang
 * Size: +35% from original
 */
import { useLang } from "@/contexts/LangContext";

export default function ConversationFlowDiagram() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  const ACTORS = [
    { id: "user",   label: isFr ? "Utilisateur" : "User",          color: "#64748b", x: 55 },
    { id: "asr",    label: "ASR/STT",                               color: "#0891b2", x: 175 },
    { id: "orch",   label: isFr ? "Orchestrateur" : "Orchestrator", color: "#7c3aed", x: 325 },
    { id: "mem",    label: isFr ? "Mémoire" : "Memory",             color: "#16a34a", x: 475 },
    { id: "llm",    label: "LLM",                                   color: "#d97706", x: 620 },
    { id: "tts",    label: "TTS",                                   color: "#0891b2", x: 765 },
    { id: "avatar", label: "Avatar",                                color: "#dc2626", x: 910 },
  ];

  const MESSAGES = [
    { from: "user",   to: "asr",    label: isFr ? "Parole (audio)" : "Speech (audio)",        timing: "t=0",       y: 130, color: "#64748b" },
    { from: "asr",    to: "orch",   label: isFr ? "Texte transcrit" : "Transcribed text",      timing: "+300ms",    y: 170, color: "#0891b2" },
    { from: "orch",   to: "mem",    label: isFr ? "Requête contexte" : "Context query",        timing: "+350ms",    y: 210, color: "#7c3aed" },
    { from: "mem",    to: "orch",   label: isFr ? "Contexte + profil" : "Context + profile",   timing: "+400ms",    y: 250, color: "#16a34a", dashed: true },
    { from: "orch",   to: "llm",    label: isFr ? "Prompt enrichi" : "Enriched prompt",        timing: "+420ms",    y: 295, color: "#7c3aed" },
    { from: "llm",    to: "orch",   label: isFr ? "Réponse (stream)" : "Response (stream)",    timing: "+900ms",    y: 345, color: "#d97706", dashed: true },
    { from: "orch",   to: "tts",    label: isFr ? "Texte → synthèse" : "Text → synthesis",    timing: "+950ms",    y: 385, color: "#7c3aed" },
    { from: "orch",   to: "mem",    label: isFr ? "Mise à jour mémoire" : "Memory update",     timing: "+960ms",    y: 425, color: "#7c3aed" },
    { from: "tts",    to: "avatar", label: isFr ? "Audio + phonèmes" : "Audio + phonemes",     timing: "+1100ms",   y: 465, color: "#0891b2" },
    { from: "avatar", to: "user",   label: isFr ? "Vidéo + audio sync" : "Video + audio sync", timing: "+1500ms ✓", y: 520, color: "#dc2626", isTarget: true },
  ];

  const W = 1020;
  const H = 600;
  const ACTOR_Y = 55;
  const ACTOR_BOX_W = 95;
  const ACTOR_BOX_H = 38;

  function actorX(id: string) { return ACTORS.find(a => a.id === id)?.x ?? 0; }

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {/* Title */}
        <text x="20" y="24" fontSize="13" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
          {isFr
            ? "DIAGRAMME DE SÉQUENCE — ÉCHANGE CONVERSATIONNEL (CIBLE <2s)"
            : "SEQUENCE DIAGRAM — CONVERSATIONAL EXCHANGE (TARGET <2s)"}
        </text>

        {/* Actor boxes + lifelines */}
        {ACTORS.map((actor) => (
          <g key={actor.id}>
            <rect x={actor.x - ACTOR_BOX_W / 2} y={ACTOR_Y} width={ACTOR_BOX_W} height={ACTOR_BOX_H} rx={4} fill={actor.color} opacity="0.9" />
            <text x={actor.x} y={ACTOR_Y + 24} textAnchor="middle" fontSize="12" fontWeight="600" fill="white" fontFamily="'Space Grotesk', sans-serif">
              {actor.label}
            </text>
            <line x1={actor.x} y1={ACTOR_Y + ACTOR_BOX_H} x2={actor.x} y2={H - 45} stroke={actor.color} strokeWidth="1.5" strokeDasharray="4,4" opacity="0.3" />
          </g>
        ))}

        {/* Messages */}
        {MESSAGES.map((msg, i) => {
          const fromX = actorX(msg.from);
          const toX = actorX(msg.to);
          const isLeft = toX < fromX;
          return (
            <g key={i}>
              <line x1={fromX} y1={msg.y} x2={toX} y2={msg.y} stroke={msg.color} strokeWidth={msg.isTarget ? 2.5 : 2} strokeDasharray={(msg as any).dashed ? "6,4" : undefined} opacity={msg.isTarget ? 1 : 0.8} />
              {isLeft ? (
                <polygon points={`${toX + 10},${msg.y - 5} ${toX},${msg.y} ${toX + 10},${msg.y + 5}`} fill={msg.color} opacity={msg.isTarget ? 1 : 0.8} />
              ) : (
                <polygon points={`${toX - 10},${msg.y - 5} ${toX},${msg.y} ${toX - 10},${msg.y + 5}`} fill={msg.color} opacity={msg.isTarget ? 1 : 0.8} />
              )}
              <text x={(fromX + toX) / 2} y={msg.y - 7} textAnchor="middle" fontSize="11" fill={msg.isTarget ? msg.color : "#374151"} fontWeight={msg.isTarget ? "700" : "400"} fontFamily="'Space Grotesk', sans-serif">
                {msg.label}
              </text>
              <rect x={20} y={msg.y - 12} width={78} height={18} rx={3} fill={msg.isTarget ? msg.color : "#f1f5f9"} />
              <text x={59} y={msg.y + 2} textAnchor="middle" fontSize="11" fill={msg.isTarget ? "white" : "#64748b"} fontFamily="'JetBrains Mono', monospace" fontWeight={msg.isTarget ? "700" : "400"}>
                {msg.timing}
              </text>
            </g>
          );
        })}

        {/* Bottom note */}
        <text x={W / 2} y={H - 12} textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
          {isFr
            ? "Timings cibles · Parallélisation TTS+Avatar possible · Streaming LLM → TTS sans attendre fin de génération"
            : "Target timings · TTS+Avatar parallelization possible · LLM → TTS streaming without waiting for full generation"}
        </text>
      </svg>
    </div>
  );
}
