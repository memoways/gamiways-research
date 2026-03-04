/*
 * AvatarBehaviorDiagram — Pipeline extraction comportementale → génération avatar
 * Visualise: Archives vidéo → Extraction → Modèle comportemental → Génération temps réel
 */

export default function AvatarBehaviorDiagram() {
  const W = 760;
  const H = 300;

  const phases = [
    {
      id: "P1",
      label: "Archives Vidéo",
      sublabel: "Source",
      items: ["Vidéos existantes", "Angles variables", "Éclairage non contrôlé"],
      color: "#64748b",
      bg: "#f8fafc",
      x: 20,
      w: 130,
    },
    {
      id: "P2",
      label: "Extraction",
      sublabel: "Analyse comportementale",
      items: ["Micro-expressions", "Vocabulaire gestuel", "Patterns posturaux", "Prosodie individuelle"],
      color: "#0891b2",
      bg: "#eff6ff",
      x: 200,
      w: 150,
    },
    {
      id: "P3",
      label: "Modèle Comportemental",
      sublabel: "Représentation individuelle",
      items: ["SLM fine-tuné", "LoRA adapters", "Encodeur prosodique", "Bibliothèque gestes"],
      color: "#7c3aed",
      bg: "#f5f3ff",
      x: 400,
      w: 160,
    },
    {
      id: "P4",
      label: "Génération Temps Réel",
      sublabel: "Cible: <500ms",
      items: ["Lip-sync + corps", "Cohérence émotionnelle", "TTS personnalisé", "Streaming vidéo"],
      color: "#16a34a",
      bg: "#f0fdf4",
      x: 610,
      w: 130,
    },
  ];

  const BOX_H = 180;
  const Y_BOX = 50;

  // Research challenges below
  const challenges = [
    { x: 200, label: "Extraction depuis\nimages non contrôlées ?", color: "#0891b2" },
    { x: 400, label: "Quantité audio/vidéo\nnécessaire ?", color: "#7c3aed" },
    { x: 610, label: "Compute minimal\npour <500ms ?", color: "#dc2626" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {/* Title */}
        <text x="20" y="18" fontSize="10" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
          PIPELINE AVATAR EXPRESSIF — EXTRACTION COMPORTEMENTALE → GÉNÉRATION TEMPS RÉEL
        </text>

        {/* Phases */}
        {phases.map((phase, i) => (
          <g key={phase.id}>
            {/* Arrow between phases */}
            {i < phases.length - 1 && (
              <g>
                <line
                  x1={phase.x + phase.w}
                  y1={Y_BOX + BOX_H / 2}
                  x2={phases[i + 1].x}
                  y2={Y_BOX + BOX_H / 2}
                  stroke={phase.color}
                  strokeWidth="1.5"
                  strokeDasharray={i === 0 ? "4,2" : undefined}
                  opacity="0.6"
                />
                <polygon
                  points={`${phases[i + 1].x - 6},${Y_BOX + BOX_H / 2 - 4} ${phases[i + 1].x},${Y_BOX + BOX_H / 2} ${phases[i + 1].x - 6},${Y_BOX + BOX_H / 2 + 4}`}
                  fill={phase.color}
                  opacity="0.6"
                />
                {/* Research challenge question */}
                {challenges.find(c => c.x === phases[i + 1].x) && (() => {
                  const ch = challenges.find(c => c.x === phases[i + 1].x)!;
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

            {/* Box */}
            <rect
              x={phase.x}
              y={Y_BOX}
              width={phase.w}
              height={BOX_H}
              rx={4}
              fill={phase.bg}
              stroke={phase.color}
              strokeWidth={phase.id === "P4" ? 2 : 1.5}
            />
            {/* Top accent */}
            <rect x={phase.x} y={Y_BOX} width={phase.w} height={3} rx={1} fill={phase.color} />

            {/* Phase ID */}
            <text x={phase.x + 10} y={Y_BOX + 18} fontSize="9" fontWeight="700" fill={phase.color} fontFamily="'JetBrains Mono', monospace">
              {phase.id}
            </text>

            {/* Label */}
            <text x={phase.x + 10} y={Y_BOX + 34} fontSize="10" fontWeight="600" fill="#0f172a">
              {phase.label}
            </text>

            {/* Sublabel */}
            <text x={phase.x + 10} y={Y_BOX + 48} fontSize="8" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
              {phase.sublabel}
            </text>

            {/* Divider */}
            <line x1={phase.x + 8} y1={Y_BOX + 56} x2={phase.x + phase.w - 8} y2={Y_BOX + 56} stroke="#e2e8f0" strokeWidth="1" />

            {/* Items */}
            {phase.items.map((item, j) => (
              <g key={item}>
                <circle cx={phase.x + 14} cy={Y_BOX + 68 + j * 22} r={2} fill={phase.color} opacity="0.7" />
                <text x={phase.x + 22} y={Y_BOX + 72 + j * 22} fontSize="8.5" fill="#475569">
                  {item}
                </text>
              </g>
            ))}
          </g>
        ))}

        {/* Bottom: "Uncanny valley" note */}
        <rect x={20} y={H - 30} width={W - 40} height={20} rx={3} fill="#fef2f2" />
        <text x={W / 2} y={H - 16} textAnchor="middle" fontSize="9" fill="#dc2626" fontFamily="'JetBrains Mono', monospace">
          ⚠ Vallée de l'étrange de la familiarité — les utilisateurs reconnaissent le visage mais pas le comportement → destruction de la suspension d'incrédulité
        </text>
      </svg>
    </div>
  );
}
