/*
 * AvatarBehaviorDiagram — Behavioral extraction → real-time avatar generation pipeline
 * i18n: EN (default) / FR via useLang
 */
import { useLang } from "@/contexts/LangContext";

export default function AvatarBehaviorDiagram() {
  const { lang } = useLang();
  const isFr = lang === "fr";
  const W = 760;
  const H = 300;

  const phases = [
    {
      id: "P1",
      label: isFr ? "Archives Vidéo" : "Video Archives",
      sublabel: isFr ? "Source" : "Source",
      items: isFr
        ? ["Vidéos existantes", "Angles variables", "Éclairage non contrôlé"]
        : ["Existing videos", "Variable angles", "Uncontrolled lighting"],
      color: "#64748b",
      bg: "#f8fafc",
      x: 20,
      w: 130,
    },
    {
      id: "P2",
      label: isFr ? "Extraction" : "Extraction",
      sublabel: isFr ? "Analyse comportementale" : "Behavioral analysis",
      items: isFr
        ? ["Micro-expressions", "Vocabulaire gestuel", "Patterns posturaux", "Prosodie individuelle"]
        : ["Micro-expressions", "Gestural vocabulary", "Postural patterns", "Individual prosody"],
      color: "#0891b2",
      bg: "#eff6ff",
      x: 200,
      w: 150,
    },
    {
      id: "P3",
      label: isFr ? "Modèle Comportemental" : "Behavioral Model",
      sublabel: isFr ? "Représentation individuelle" : "Individual representation",
      items: isFr
        ? ["SLM fine-tuné", "LoRA adapters", "Encodeur prosodique", "Bibliothèque gestes"]
        : ["Fine-tuned SLM", "LoRA adapters", "Prosodic encoder", "Gesture library"],
      color: "#7c3aed",
      bg: "#f5f3ff",
      x: 400,
      w: 160,
    },
    {
      id: "P4",
      label: isFr ? "Génération Temps Réel" : "Real-Time Generation",
      sublabel: isFr ? "Cible: <500ms" : "Target: <500ms",
      items: isFr
        ? ["Lip-sync + corps", "Cohérence émotionnelle", "TTS personnalisé", "Streaming vidéo"]
        : ["Lip-sync + body", "Emotional coherence", "Personalized TTS", "Video streaming"],
      color: "#16a34a",
      bg: "#f0fdf4",
      x: 610,
      w: 130,
    },
  ];

  const BOX_H = 180;
  const Y_BOX = 50;

  const challenges = [
    {
      x: 200,
      label: isFr ? "Extraction depuis\nimages non contrôlées ?" : "Extraction from\nuncontrolled images?",
      color: "#0891b2",
    },
    {
      x: 400,
      label: isFr ? "Quantité audio/vidéo\nnécessaire ?" : "Required audio/video\nquantity?",
      color: "#7c3aed",
    },
    {
      x: 610,
      label: isFr ? "Compute minimal\npour <500ms ?" : "Minimal compute\nfor <500ms?",
      color: "#dc2626",
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {/* Title */}
        <text x="20" y="18" fontSize="10" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
          {isFr
            ? "PIPELINE AVATAR EXPRESSIF — EXTRACTION COMPORTEMENTALE → GÉNÉRATION TEMPS RÉEL"
            : "EXPRESSIVE AVATAR PIPELINE — BEHAVIORAL EXTRACTION → REAL-TIME GENERATION"}
        </text>

        {phases.map((phase, i) => (
          <g key={phase.id}>
            {i < phases.length - 1 && (
              <g>
                <line
                  x1={phase.x + phase.w} y1={Y_BOX + BOX_H / 2}
                  x2={phases[i + 1].x} y2={Y_BOX + BOX_H / 2}
                  stroke={phase.color} strokeWidth="1.5"
                  strokeDasharray={i === 0 ? "4,2" : undefined} opacity="0.6"
                />
                <polygon
                  points={`${phases[i + 1].x - 6},${Y_BOX + BOX_H / 2 - 4} ${phases[i + 1].x},${Y_BOX + BOX_H / 2} ${phases[i + 1].x - 6},${Y_BOX + BOX_H / 2 + 4}`}
                  fill={phase.color} opacity="0.6"
                />
                {(() => {
                  const ch = challenges.find(c => c.x === phases[i + 1].x);
                  if (!ch) return null;
                  const midX = (phase.x + phase.w + phases[i + 1].x) / 2;
                  return (
                    <g>
                      <text x={midX} y={Y_BOX + BOX_H + 24} textAnchor="middle" fontSize="8" fill={ch.color} fontFamily="'JetBrains Mono', monospace" fontStyle="italic">
                        {ch.label.split("\n")[0]}
                      </text>
                      <text x={midX} y={Y_BOX + BOX_H + 36} textAnchor="middle" fontSize="8" fill={ch.color} fontFamily="'JetBrains Mono', monospace" fontStyle="italic">
                        {ch.label.split("\n")[1]}
                      </text>
                    </g>
                  );
                })()}
              </g>
            )}

            <rect x={phase.x} y={Y_BOX} width={phase.w} height={BOX_H} rx={4} fill={phase.bg} stroke={phase.color} strokeWidth={phase.id === "P4" ? 2 : 1.5} />
            <rect x={phase.x} y={Y_BOX} width={phase.w} height={3} rx={1} fill={phase.color} />
            <text x={phase.x + 10} y={Y_BOX + 18} fontSize="9" fontWeight="700" fill={phase.color} fontFamily="'JetBrains Mono', monospace">{phase.id}</text>
            <text x={phase.x + 10} y={Y_BOX + 34} fontSize="10" fontWeight="600" fill="#0f172a">{phase.label}</text>
            <text x={phase.x + 10} y={Y_BOX + 48} fontSize="8" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">{phase.sublabel}</text>
            <line x1={phase.x + 8} y1={Y_BOX + 56} x2={phase.x + phase.w - 8} y2={Y_BOX + 56} stroke="#e2e8f0" strokeWidth="1" />
            {phase.items.map((item, j) => (
              <g key={item}>
                <circle cx={phase.x + 14} cy={Y_BOX + 68 + j * 22} r={2} fill={phase.color} opacity="0.7" />
                <text x={phase.x + 22} y={Y_BOX + 72 + j * 22} fontSize="8.5" fill="#475569">{item}</text>
              </g>
            ))}
          </g>
        ))}

        {/* Uncanny valley note */}
        <rect x={20} y={H - 30} width={W - 40} height={20} rx={3} fill="#fef2f2" />
        <text x={W / 2} y={H - 16} textAnchor="middle" fontSize="9" fill="#dc2626" fontFamily="'JetBrains Mono', monospace">
          {isFr
            ? "⚠ Vallée de l'étrange de la familiarité — les utilisateurs reconnaissent le visage mais pas le comportement → destruction de la suspension d'incrédulité"
            : "⚠ Uncanny valley of familiarity — users recognize the face but not the behavior → suspension of disbelief destroyed"}
        </text>
      </svg>
    </div>
  );
}
