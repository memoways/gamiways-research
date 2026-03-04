/*
 * RadarCompareDiagram — Comparatif radar des plateformes avatar
 * Axes: Qualité, Latence, Coût, Souveraineté, Conversation, Corps
 */

interface Platform {
  name: string;
  color: string;
  scores: number[]; // [Qualité, Latence, Coût, Souveraineté, Conversation, Corps] 0–10
}

const platforms: Platform[] = [
  { name: "HeyGen", color: "#64748b", scores: [9, 7, 3, 1, 2, 2] },
  { name: "NVIDIA ACE", color: "#16a34a", scores: [9, 10, 2, 3, 9, 9] },
  { name: "DigiDouble (cible)", color: "#0891b2", scores: [8, 8, 7, 10, 9, 7] },
  { name: "HeyGem OS", color: "#d97706", scores: [6, 3, 8, 10, 3, 1] },
];

const axes = ["Qualité visuelle", "Latence", "Coût/accessibilité", "Souveraineté", "Conversation IA", "Langage corporel"];

function polarToCart(angle: number, r: number, cx: number, cy: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

export default function RadarCompareDiagram() {
  const CX = 200;
  const CY = 190;
  const R = 130;
  const N = axes.length;
  const angleStep = 360 / N;

  const gridLevels = [2, 4, 6, 8, 10];

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 580 400"
        width="100%"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {/* Title */}
        <text x="20" y="18" fontSize="10" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
          COMPARATIF RADAR — PLATEFORMES AVATAR
        </text>

        {/* Grid circles */}
        {gridLevels.map((level) => {
          const r = (level / 10) * R;
          const points = Array.from({ length: N }, (_, i) => {
            const pt = polarToCart(i * angleStep, r, CX, CY);
            return `${pt.x},${pt.y}`;
          }).join(" ");
          return (
            <g key={level}>
              <polygon points={points} fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <text x={CX + 3} y={CY - r + 3} fontSize="8" fill="#cbd5e1" fontFamily="'JetBrains Mono', monospace">
                {level}
              </text>
            </g>
          );
        })}

        {/* Axis lines */}
        {axes.map((axis, i) => {
          const pt = polarToCart(i * angleStep, R, CX, CY);
          const labelPt = polarToCart(i * angleStep, R + 22, CX, CY);
          return (
            <g key={axis}>
              <line x1={CX} y1={CY} x2={pt.x} y2={pt.y} stroke="#e2e8f0" strokeWidth="1" />
              <text
                x={labelPt.x}
                y={labelPt.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fill="#64748b"
                fontWeight="500"
              >
                {axis}
              </text>
            </g>
          );
        })}

        {/* Platform polygons */}
        {platforms.map((platform) => {
          const points = platform.scores.map((score, i) => {
            const r = (score / 10) * R;
            const pt = polarToCart(i * angleStep, r, CX, CY);
            return `${pt.x},${pt.y}`;
          }).join(" ");
          return (
            <polygon
              key={platform.name}
              points={points}
              fill={platform.color}
              fillOpacity="0.12"
              stroke={platform.color}
              strokeWidth={platform.name.includes("DigiDouble") ? 2.5 : 1.5}
              strokeDasharray={platform.name.includes("DigiDouble") ? undefined : "4,2"}
            />
          );
        })}

        {/* DigiDouble dots */}
        {platforms.find(p => p.name.includes("DigiDouble"))?.scores.map((score, i) => {
          const r = (score / 10) * R;
          const pt = polarToCart(i * angleStep, r, CX, CY);
          return <circle key={i} cx={pt.x} cy={pt.y} r={3} fill="#0891b2" />;
        })}

        {/* Legend */}
        <g transform="translate(420, 60)">
          <text x="0" y="0" fontSize="10" fontWeight="600" fill="#0f172a">Légende</text>
          {platforms.map((p, i) => (
            <g key={p.name} transform={`translate(0, ${20 + i * 24})`}>
              <line x1="0" y1="8" x2="20" y2="8"
                stroke={p.color} strokeWidth={p.name.includes("DigiDouble") ? 2.5 : 1.5}
                strokeDasharray={p.name.includes("DigiDouble") ? undefined : "4,2"} />
              <circle cx="10" cy="8" r={p.name.includes("DigiDouble") ? 4 : 3} fill={p.color} fillOpacity={p.name.includes("DigiDouble") ? 1 : 0.5} />
              <text x="26" y="12" fontSize="10" fill="#374151" fontWeight={p.name.includes("DigiDouble") ? "600" : "400"}>
                {p.name}
              </text>
            </g>
          ))}
          <text x="0" y={20 + platforms.length * 24 + 20} fontSize="8" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
            DigiDouble = cible R&D
          </text>
          <text x="0" y={20 + platforms.length * 24 + 34} fontSize="8" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
            (pas encore atteinte)
          </text>
        </g>

        {/* Bottom note */}
        <text x={CX} y={380} textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
          Scores normalisés /10 · Évaluation qualitative · Latence = score inversé (10 = &lt;100ms)
        </text>
      </svg>
    </div>
  );
}
