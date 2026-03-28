/*
 * ProductArchDiagram — DigiDouble product architecture
 * i18n: EN (default) / FR via useLang
 */
import { useLang } from "@/contexts/LangContext";

export default function ProductArchDiagram() {
  const { lang } = useLang();
  const isFr = lang === "fr";
  const W = 1026;
  const H = 459;

  const engineComponents = [
    { x: 60,  label: isFr ? "Éditeur de Nœuds" : "Node Editor",      sub: isFr ? "Graphe conversationnel" : "Conversational graph",  color: "#0891b2" },
    { x: 200, label: isFr ? "Mémoire IA" : "AI Memory",               sub: isFr ? "3 couches (R&D)" : "3 layers (R&D)",   color: "#7c3aed" },
    { x: 340, label: isFr ? "Orchestration" : "Orchestration",        sub: isFr ? "Déterministe + Organique" : "Deterministic + Organic", color: "#0f172a" },
    { x: 480, label: "Avatar Engine",                                  sub: isFr ? "Génération temps réel" : "Real-time generation",   color: "#dc2626" },
    { x: 620, label: "Multi-Stream",                                   sub: isFr ? "5 flux synchronisés" : "5 synced streams",         color: "#16a34a" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {/* Title */}
        <text x="20" y="18" fontSize="10" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
          {isFr ? "ARCHITECTURE PRODUIT — DEUX MODES, UN MOTEUR PARTAGÉ" : "PRODUCT ARCHITECTURE — TWO MODES, ONE SHARED ENGINE"}
        </text>

        {/* Edugami box */}
        <rect x={40} y={36} width={300} height={100} rx={4} fill="#eff6ff" stroke="#0891b2" strokeWidth="1.5" />
        <rect x={40} y={36} width={4} height={100} rx={2} fill="#0891b2" />
        <text x={60} y={56} fontSize="10" fontWeight="700" fill="#0891b2" fontFamily="'JetBrains Mono', monospace">MODE 01 — EDUGAMI</text>
        <text x={60} y={72} fontSize="11" fontWeight="600" fill="#0f172a">
          {isFr ? "Pédagogique / \"Lean Forward\"" : "Pedagogical / \"Lean Forward\""}
        </text>
        <text x={60} y={88} fontSize="9" fill="#64748b">
          {isFr ? "Avatar tuteur · Vidéo illustrative · Quiz" : "Tutor avatar · Illustrative video · Quiz"}
        </text>
        <text x={60} y={104} fontSize="9" fill="#64748b">
          {isFr ? "EdTech · Patrimoine · Formation corporate" : "EdTech · Heritage · Corporate training"}
        </text>
        <text x={60} y={120} fontSize="9" fill="#0891b2" fontFamily="'JetBrains Mono', monospace">
          {isFr ? "Contrôle pédagogique: FORT" : "Pedagogical control: STRONG"}
        </text>

        {/* Storygami box */}
        <rect x={420} y={36} width={300} height={100} rx={4} fill="#fffbeb" stroke="#d97706" strokeWidth="1.5" />
        <rect x={420} y={36} width={4} height={100} rx={2} fill="#d97706" />
        <text x={440} y={56} fontSize="10" fontWeight="700" fill="#d97706" fontFamily="'JetBrains Mono', monospace">MODE 02 — STORYGAMI</text>
        <text x={440} y={72} fontSize="11" fontWeight="600" fill="#0f172a">
          {isFr ? "Narratif / \"Lean Back\"" : "Narrative / \"Lean Back\""}
        </text>
        <text x={440} y={88} fontSize="9" fill="#64748b">
          {isFr ? "Avatar personnage · Plein écran · Navigation vocale" : "Character avatar · Full screen · Voice navigation"}
        </text>
        <text x={440} y={104} fontSize="9" fill="#64748b">
          {isFr ? "Cinéma · Gaming · Économie créative" : "Cinema · Gaming · Creative economy"}
        </text>
        <text x={440} y={120} fontSize="9" fill="#d97706" fontFamily="'JetBrains Mono', monospace">
          {isFr ? "Liberté narrative: FORTE" : "Narrative freedom: STRONG"}
        </text>

        {/* Continuum arrow */}
        <line x1={340} y1={86} x2={420} y2={86} stroke="#cbd5e1" strokeWidth="1.5" />
        <polygon points="414,82 420,86 414,90" fill="#94a3b8" />
        <polygon points="346,82 340,86 346,90" fill="#94a3b8" />
        <text x={380} y={80} textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">CONTINUUM</text>
        <text x={380} y={96} textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">0–100%</text>

        {/* Arrows down */}
        <line x1={190} y1={136} x2={190} y2={170} stroke="#0891b2" strokeWidth="1.5" strokeDasharray="4,2" opacity="0.5" />
        <polygon points="186,164 190,170 194,164" fill="#0891b2" opacity="0.5" />
        <line x1={570} y1={136} x2={570} y2={170} stroke="#d97706" strokeWidth="1.5" strokeDasharray="4,2" opacity="0.5" />
        <polygon points="566,164 570,170 574,164" fill="#d97706" opacity="0.5" />

        {/* Shared engine */}
        <rect x={40} y={170} width={680} height={130} rx={4} fill="#f8fafc" stroke="#334155" strokeWidth="2" />
        <text x={380} y={190} textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155" fontFamily="'JetBrains Mono', monospace">
          {isFr ? "MOTEUR PARTAGÉ — DigiDouble Core" : "SHARED ENGINE — DigiDouble Core"}
        </text>

        {engineComponents.map((comp) => (
          <g key={comp.label}>
            <rect x={comp.x} y={200} width={120} height={60} rx={3} fill="white" stroke={comp.color} strokeWidth="1" />
            <rect x={comp.x} y={200} width={120} height={3} rx={1} fill={comp.color} />
            <text x={comp.x + 60} y={222} textAnchor="middle" fontSize="10" fontWeight="600" fill="#0f172a">
              {comp.label}
            </text>
            <text x={comp.x + 60} y={238} textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
              {comp.sub}
            </text>
            {comp.x < 620 && (
              <line x1={comp.x + 120} y1={230} x2={comp.x + 140} y2={230} stroke="#e2e8f0" strokeWidth="1" />
            )}
          </g>
        ))}

        {/* Infrastructure bar */}
        <rect x={60} y={272} width={660} height={20} rx={3} fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
        <text x={390} y={286} textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="'JetBrains Mono', monospace">
          {isFr
            ? "Infrastructure souveraine: Exoscale GPU (CH) · ASR Audiogami · WebRTC · PostgreSQL"
            : "Sovereign infrastructure: Exoscale GPU (CH) · Audiogami ASR · WebRTC · PostgreSQL"}
        </text>

        {/* Bottom note */}
        <text x={380} y={330} textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
          {isFr
            ? "Analogie: Final Cut Pro — puissant ET utilisable par des créateurs non-techniques"
            : "Analogy: Final Cut Pro — powerful AND usable by non-technical creators"}
        </text>
      </svg>
    </div>
  );
}
