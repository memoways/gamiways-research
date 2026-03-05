/*
 * TargetArchDiagram — DigiDouble Research Portal
 * Shows the target architecture: Gamilab (green) → IDIAP R&D (blue) → Memoways (yellow) → Experience
 * i18n: EN (default) / FR via useLang
 */
import { useLang } from "@/contexts/LangContext";

export default function TargetArchDiagram() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 860 340" className="w-full" style={{ fontFamily: "'Space Grotesk', sans-serif", minWidth: 680 }}>

        {/* ── Legend ── */}
        <rect x="10" y="8" width="10" height="10" rx="2" fill="#d4edda" stroke="#28a745" strokeWidth="1" />
        <text x="24" y="17" fontSize="7" fill="#155724" fontFamily="'JetBrains Mono', monospace">{isFr ? "Disponible" : "Available"}</text>
        <rect x="90" y="8" width="10" height="10" rx="2" fill="#cce5ff" stroke="#004085" strokeWidth="1" />
        <text x="104" y="17" fontSize="7" fill="#004085" fontFamily="'JetBrains Mono', monospace">R&D IDIAP</text>
        <rect x="175" y="8" width="10" height="10" rx="2" fill="#fff3cd" stroke="#856404" strokeWidth="1" />
        <text x="189" y="17" fontSize="7" fill="#856404" fontFamily="'JetBrains Mono', monospace">{isFr ? "Interne Memoways" : "Memoways Internal"}</text>
        <rect x="300" y="8" width="10" height="10" rx="2" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="314" y="17" fontSize="7" fill="#dc2626" fontFamily="'JetBrains Mono', monospace">{isFr ? "Goulot critique" : "Critical bottleneck"}</text>

        {/* ── ROW 1: User + Sovereign Input ── */}
        {/* User */}
        <rect x="10" y="50" width="70" height="55" rx="4" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
        <text x="45" y="74" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">{isFr ? "UTILISATEUR" : "USER"}</text>
        <text x="45" y="87" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">{isFr ? "Voix / Texte" : "Voice / Text"}</text>

        <line x1="80" y1="77" x2="100" y2="77" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#a1)" />

        {/* Sovereign ASR block */}
        <rect x="100" y="35" width="200" height="85" rx="5" fill="#d4edda" stroke="#28a745" strokeWidth="1.5" />
        <text x="200" y="55" textAnchor="middle" fontSize="7" fontWeight="700" letterSpacing="1" fill="#155724" fontFamily="'JetBrains Mono', monospace">{isFr ? "DISPONIBLE — Gamilab / Audiogami" : "AVAILABLE — Gamilab / Audiogami"}</text>
        <text x="200" y="72" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#155724">{isFr ? "ASR + STT Souverain" : "Sovereign ASR + STT"}</text>
        <text x="200" y="86" textAnchor="middle" fontSize="7.5" fill="#475569">{isFr ? "Hébergé en Suisse · HITL optionnel" : "Swiss-hosted · HITL optional"}</text>
        <text x="200" y="99" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="'JetBrains Mono', monospace">~300ms target</text>

        <line x1="300" y1="77" x2="320" y2="77" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#a1)" />

        {/* ── ROW 2: R&D Block ── */}
        <rect x="320" y="30" width="380" height="100" rx="5" fill="#cce5ff" stroke="#004085" strokeWidth="1.5" />
        <text x="510" y="48" textAnchor="middle" fontSize="7" fontWeight="700" letterSpacing="1" fill="#004085" fontFamily="'JetBrains Mono', monospace">{isFr ? "R&D — IDIAP + INNOSUISSE" : "R&D — IDIAP + INNOSUISSE"}</text>

        {/* Axis 1: Memory */}
        <rect x="330" y="55" width="82" height="65" rx="3" fill="white" stroke="#004085" strokeWidth="1" />
        <text x="371" y="73" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#004085" fontFamily="'JetBrains Mono', monospace">{isFr ? "AXE 1" : "AXIS 1"}</text>
        <text x="371" y="85" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f172a">{isFr ? "Mémoire" : "Memory"}</text>
        <text x="371" y="97" textAnchor="middle" fontSize="6.5" fill="#475569">{isFr ? "3 couches" : "3-layer arch."}</text>
        <text x="371" y="109" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily="'JetBrains Mono', monospace">Elena Epure</text>

        {/* Axis 2a: TTS */}
        <rect x="422" y="55" width="82" height="65" rx="3" fill="white" stroke="#004085" strokeWidth="1" />
        <text x="463" y="73" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#004085" fontFamily="'JetBrains Mono', monospace">{isFr ? "AXE 2a" : "AXIS 2a"}</text>
        <text x="463" y="85" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f172a">{isFr ? "TTS Expressif" : "Expressive TTS"}</text>
        <text x="463" y="97" textAnchor="middle" fontSize="6.5" fill="#475569">{isFr ? "Prosodique perso." : "Personalized prosody"}</text>
        <text x="463" y="109" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily="'JetBrains Mono', monospace">M. Magimai-Doss</text>

        {/* Axis 2b: Avatar — bottleneck */}
        <rect x="514" y="50" width="82" height="75" rx="3" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
        <text x="555" y="68" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#dc2626" fontFamily="'JetBrains Mono', monospace">{isFr ? "AXE 2b ⚠" : "AXIS 2b ⚠"}</text>
        <text x="555" y="80" textAnchor="middle" fontSize="8" fontWeight="700" fill="#dc2626">{isFr ? "Génération Avatar" : "Avatar Generation"}</text>
        <text x="555" y="92" textAnchor="middle" fontSize="6.5" fill="#7f1d1d">{isFr ? "Fidélité comportementale" : "Behavioral fidelity"}</text>
        <text x="555" y="104" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily="'JetBrains Mono', monospace">M. Magimai-Doss</text>
        <text x="555" y="116" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#dc2626" fontFamily="'JetBrains Mono', monospace">⚠ &lt;500ms target</text>

        {/* Axis 3: Orchestration */}
        <rect x="606" y="55" width="84" height="65" rx="3" fill="white" stroke="#004085" strokeWidth="1" />
        <text x="648" y="73" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#004085" fontFamily="'JetBrains Mono', monospace">{isFr ? "AXE 3" : "AXIS 3"}</text>
        <text x="648" y="85" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f172a">{isFr ? "Orchestration" : "Orchestration"}</text>
        <text x="648" y="97" textAnchor="middle" fontSize="6.5" fill="#475569">{isFr ? "Déterministe-organique" : "Deterministic-organic"}</text>
        <text x="648" y="109" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily="'JetBrains Mono', monospace">{isFr ? "Défi architecture" : "Architecture challenge"}</text>

        <line x1="700" y1="80" x2="720" y2="80" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#a1)" />

        {/* ── ROW 3: Memoways Internal ── */}
        <rect x="720" y="35" width="130" height="90" rx="5" fill="#fff3cd" stroke="#856404" strokeWidth="1.5" />
        <text x="785" y="52" textAnchor="middle" fontSize="6.5" fontWeight="700" letterSpacing="1" fill="#856404" fontFamily="'JetBrains Mono', monospace">{isFr ? "INTERNE — Memoways" : "INTERNAL — Memoways"}</text>
        <text x="785" y="67" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#856404">{isFr ? "Node Editor" : "Node Editor"}</text>
        <text x="785" y="80" textAnchor="middle" fontSize="7.5" fill="#475569">{isFr ? "Graphe conversationnel" : "Conversation graph"}</text>
        <text x="785" y="93" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#856404">{isFr ? "Player Configurable" : "Configurable Player"}</text>
        <text x="785" y="106" textAnchor="middle" fontSize="7.5" fill="#475569">Edugami / Storygami</text>

        {/* ── EXPERIENCE ── */}
        <line x1="785" y1="125" x2="785" y2="155" stroke="#0891b2" strokeWidth="2" markerEnd="url(#aBlue)" />
        <rect x="720" y="155" width="130" height="55" rx="4" fill="#eff6ff" stroke="#0891b2" strokeWidth="2" />
        <text x="785" y="178" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0891b2">{isFr ? "EXPÉRIENCE" : "EXPERIENCE"}</text>
        <text x="785" y="192" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0891b2" fontFamily="'JetBrains Mono', monospace">&lt;2s {isFr ? "cible" : "target"}</text>

        {/* ── Latency timeline at bottom ── */}
        <rect x="10" y="250" width="840" height="70" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        <text x="430" y="268" textAnchor="middle" fontSize="7" fontWeight="700" fill="#64748b" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">{isFr ? "BUDGET LATENCE CIBLE" : "TARGET LATENCY BUDGET"}</text>

        {/* Latency bars */}
        {[
          { x: 20, w: 60, label: "ASR+STT", val: "<300ms", color: "#16a34a" },
          { x: 90, w: 80, label: isFr ? "Orchestration" : "Orchestration", val: "<200ms", color: "#0891b2" },
          { x: 180, w: 100, label: "SLM+LLM", val: "<500ms", color: "#0891b2" },
          { x: 290, w: 80, label: "TTS", val: "<200ms", color: "#0891b2" },
          { x: 380, w: 200, label: isFr ? "Avatar (R&D)" : "Avatar (R&D)", val: "<500ms", color: "#dc2626" },
          { x: 590, w: 60, label: "Streaming", val: "<300ms", color: "#16a34a" },
        ].map((b, i) => (
          <g key={i}>
            <rect x={b.x + 10} y="275" width={b.w} height="18" rx="2" fill={b.color} opacity="0.15" stroke={b.color} strokeWidth="1" />
            <text x={b.x + 10 + b.w / 2} y="287" textAnchor="middle" fontSize="6.5" fontWeight="700" fill={b.color} fontFamily="'JetBrains Mono', monospace">{b.val}</text>
            <text x={b.x + 10 + b.w / 2} y="305" textAnchor="middle" fontSize="6" fill="#64748b">{b.label}</text>
          </g>
        ))}

        <text x="680" y="287" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0891b2" fontFamily="'JetBrains Mono', monospace">= &lt;2s</text>
        <text x="680" y="305" textAnchor="middle" fontSize="7" fill="#64748b">{isFr ? "total cible" : "total target"}</text>

        {/* ── Arrow markers ── */}
        <defs>
          <marker id="a1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
          </marker>
          <marker id="aBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#0891b2" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
