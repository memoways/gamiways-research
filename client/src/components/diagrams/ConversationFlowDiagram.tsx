/*
 * ConversationFlowDiagram — Conversational exchange sequence diagram
 * i18n: EN (default) / FR via useLang
 */
import { useLang } from "@/contexts/LangContext";

export default function ConversationFlowDiagram() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  const ACTORS = [
    { id: "user",   label: isFr ? "Utilisateur" : "User",          color: "#64748b", x: 40 },
    { id: "asr",    label: "ASR/STT",                               color: "#0891b2", x: 130 },
    { id: "orch",   label: isFr ? "Orchestrateur" : "Orchestrator", color: "#7c3aed", x: 240 },
    { id: "mem",    label: isFr ? "Mémoire" : "Memory",             color: "#16a34a", x: 350 },
    { id: "llm",    label: "LLM",                                   color: "#d97706", x: 460 },
    { id: "tts",    label: "TTS",                                   color: "#0891b2", x: 570 },
    { id: "avatar", label: "Avatar",                                color: "#dc2626", x: 680 },
  ];

  const MESSAGES = [
    { from: "user",   to: "asr",    label: isFr ? "Parole (audio)" : "Speech (audio)",        timing: "t=0",       y: 100, color: "#64748b" },
    { from: "asr",    to: "orch",   label: isFr ? "Texte transcrit" : "Transcribed text",      timing: "+300ms",    y: 130, color: "#0891b2" },
    { from: "orch",   to: "mem",    label: isFr ? "Requête contexte" : "Context query",        timing: "+350ms",    y: 160, color: "#7c3aed" },
    { from: "mem",    to: "orch",   label: isFr ? "Contexte + profil" : "Context + profile",   timing: "+400ms",    y: 190, color: "#16a34a", dashed: true },
    { from: "orch",   to: "llm",    label: isFr ? "Prompt enrichi" : "Enriched prompt",        timing: "+420ms",    y: 220, color: "#7c3aed" },
    { from: "llm",    to: "orch",   label: isFr ? "Réponse (stream)" : "Response (stream)",    timing: "+900ms",    y: 260, color: "#d97706", dashed: true },
    { from: "orch",   to: "tts",    label: isFr ? "Texte → synthèse" : "Text → synthesis",    timing: "+950ms",    y: 290, color: "#7c3aed" },
    { from: "orch",   to: "mem",    label: isFr ? "Mise à jour mémoire" : "Memory update",     timing: "+960ms",    y: 320, color: "#7c3aed" },
    { from: "tts",    to: "avatar", label: isFr ? "Audio + phonèmes" : "Audio + phonemes",     timing: "+1100ms",   y: 350, color: "#0891b2" },
    { from: "avatar", to: "user",   label: isFr ? "Vidéo + audio sync" : "Video + audio sync", timing: "+1500ms ✓", y: 390, color: "#dc2626", isTarget: true },
  ];

  const W = 760;
  const H = 460;
  const ACTOR_Y = 50;
  const ACTOR_BOX_W = 70;
  const ACTOR_BOX_H = 28;

  function actorX(id: string) { return ACTORS.find(a => a.id === id)?.x ?? 0; }

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {/* Title */}
        <text x="20" y="18" fontSize="10" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
          {isFr
            ? "DIAGRAMME DE SÉQUENCE — ÉCHANGE CONVERSATIONNEL (CIBLE <2s)"
            : "SEQUENCE DIAGRAM — CONVERSATIONAL EXCHANGE (TARGET <2s)"}
        </text>

        {/* Actor boxes + lifelines */}
        {ACTORS.map((actor) => (
          <g key={actor.id}>
            <rect x={actor.x - ACTOR_BOX_W / 2} y={ACTOR_Y} width={ACTOR_BOX_W} height={ACTOR_BOX_H} rx={3} fill={actor.color} opacity="0.9" />
            <text x={actor.x} y={ACTOR_Y + 18} textAnchor="middle" fontSize="9" fontWeight="600" fill="white" fontFamily="'Space Grotesk', sans-serif">
              {actor.label}
            </text>
            <line x1={actor.x} y1={ACTOR_Y + ACTOR_BOX_H} x2={actor.x} y2={H - 40} stroke={actor.color} strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
          </g>
        ))}

        {/* Messages */}
        {MESSAGES.map((msg, i) => {
          const fromX = actorX(msg.from);
          const toX = actorX(msg.to);
          const isLeft = toX < fromX;
          return (
            <g key={i}>
              <line x1={fromX} y1={msg.y} x2={toX} y2={msg.y} stroke={msg.color} strokeWidth={msg.isTarget ? 2 : 1.5} strokeDasharray={(msg as any).dashed ? "5,3" : undefined} opacity={msg.isTarget ? 1 : 0.8} />
              {isLeft ? (
                <polygon points={`${toX + 8},${msg.y - 4} ${toX},${msg.y} ${toX + 8},${msg.y + 4}`} fill={msg.color} opacity={msg.isTarget ? 1 : 0.8} />
              ) : (
                <polygon points={`${toX - 8},${msg.y - 4} ${toX},${msg.y} ${toX - 8},${msg.y + 4}`} fill={msg.color} opacity={msg.isTarget ? 1 : 0.8} />
              )}
              <text x={(fromX + toX) / 2} y={msg.y - 5} textAnchor="middle" fontSize="8.5" fill={msg.isTarget ? msg.color : "#374151"} fontWeight={msg.isTarget ? "700" : "400"} fontFamily="'Space Grotesk', sans-serif">
                {msg.label}
              </text>
              <rect x={20} y={msg.y - 9} width={58} height={14} rx={2} fill={msg.isTarget ? msg.color : "#f1f5f9"} />
              <text x={49} y={msg.y + 2} textAnchor="middle" fontSize="8" fill={msg.isTarget ? "white" : "#64748b"} fontFamily="'JetBrains Mono', monospace" fontWeight={msg.isTarget ? "700" : "400"}>
                {msg.timing}
              </text>
            </g>
          );
        })}

        {/* Bottom note */}
        <text x={W / 2} y={H - 10} textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
          {isFr
            ? "Timings cibles · Parallélisation TTS+Avatar possible · Streaming LLM → TTS sans attendre fin de génération"
            : "Target timings · TTS+Avatar parallelization possible · LLM → TTS streaming without waiting for full generation"}
        </text>
      </svg>
    </div>
  );
}
