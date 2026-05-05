/*
 * TargetArchDiagram — GamiWays Research Portal
 * Shows the target architecture: Gamilab (green) → R&D (blue) → Memoways (yellow) → Experience
 * i18n: EN (default) / FR via useLang
 * Fix: removed scale(1.35) transform that caused right overflow; recalculated viewBox to fit content.
 */
import { useLang } from "@/contexts/LangContext";

export default function TargetArchDiagram() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  // All coordinates are native (no scale transform).
  // Total content width: USER(80) + arrow(20) + ASR(200) + arrow(20) + RD(380) + arrow(20) + Memoways(130) + margin = ~870
  // Total content height: legend(30) + blocks(130) + experience(80) + latency(90) + margins = ~360
  const W = 880;
  const H = 360;

  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ fontFamily: "'Space Grotesk', sans-serif", display: "block" }}
      >
        <defs>
          <marker id="ta1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
          </marker>
          <marker id="taBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#0891b2" />
          </marker>
        </defs>

        {/* ── Legend ── */}
        <rect x="10" y="8" width="10" height="10" rx="2" fill="#d4edda" stroke="#28a745" strokeWidth="1" />
        <text x="24" y="17" fontSize="7" fill="#155724" fontFamily="'JetBrains Mono', monospace">{isFr ? "Disponible" : "Available"}</text>
        <rect x="90" y="8" width="10" height="10" rx="2" fill="#cce5ff" stroke="#004085" strokeWidth="1" />
        <text x="104" y="17" fontSize="7" fill="#004085" fontFamily="'JetBrains Mono', monospace">R&D</text>
        <rect x="155" y="8" width="10" height="10" rx="2" fill="#fff3cd" stroke="#856404" strokeWidth="1" />
        <text x="169" y="17" fontSize="7" fill="#856404" fontFamily="'JetBrains Mono', monospace">{isFr ? "Interne Memoways" : "Memoways Internal"}</text>
        <rect x="290" y="8" width="10" height="10" rx="2" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="304" y="17" fontSize="7" fill="#dc2626" fontFamily="'JetBrains Mono', monospace">{isFr ? "Goulot critique" : "Critical bottleneck"}</text>

        {/* ── USER block ── */}
        <rect x="10" y="38" width="70" height="55" rx="4" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
        <text x="45" y="62" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">{isFr ? "UTIL." : "USER"}</text>
        <text x="45" y="75" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">{isFr ? "Voix/Texte" : "Voice/Text"}</text>
        <line x1="80" y1="65" x2="98" y2="65" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ta1)" />

        {/* ── Sovereign ASR block ── */}
        <rect x="100" y="28" width="190" height="80" rx="5" fill="#d4edda" stroke="#28a745" strokeWidth="1.5" />
        <text x="195" y="46" textAnchor="middle" fontSize="7" fontWeight="700" letterSpacing="1" fill="#155724" fontFamily="'JetBrains Mono', monospace">{isFr ? "DISPONIBLE — Gamilab" : "AVAILABLE — Gamilab"}</text>
        <text x="195" y="61" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#155724">{isFr ? "ASR + STT Souverain" : "Sovereign ASR + STT"}</text>
        <text x="195" y="75" textAnchor="middle" fontSize="7.5" fill="#475569">{isFr ? "Hébergé en Suisse · HITL opt." : "Swiss-hosted · HITL optional"}</text>
        <text x="195" y="88" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="'JetBrains Mono', monospace">~300ms target</text>
        <line x1="290" y1="68" x2="308" y2="68" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ta1)" />

        {/* ── R&D Block ── */}
        <rect x="310" y="24" width="370" height="100" rx="5" fill="#cce5ff" stroke="#004085" strokeWidth="1.5" />
        <text x="495" y="40" textAnchor="middle" fontSize="7" fontWeight="700" letterSpacing="1" fill="#004085" fontFamily="'JetBrains Mono', monospace">R&D</text>

        {/* Axis 1: Memory */}
        <rect x="320" y="48" width="78" height="65" rx="3" fill="white" stroke="#004085" strokeWidth="1" />
        <text x="359" y="64" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#004085" fontFamily="'JetBrains Mono', monospace">{isFr ? "AXE 1" : "AXIS 1"}</text>
        <text x="359" y="76" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f172a">{isFr ? "Mémoire" : "Memory"}</text>
        <text x="359" y="88" textAnchor="middle" fontSize="6.5" fill="#475569">{isFr ? "3 couches" : "3-layer arch."}</text>

        {/* Axis 2a: TTS */}
        <rect x="408" y="48" width="78" height="65" rx="3" fill="white" stroke="#004085" strokeWidth="1" />
        <text x="447" y="64" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#004085" fontFamily="'JetBrains Mono', monospace">{isFr ? "AXE 2a" : "AXIS 2a"}</text>
        <text x="447" y="76" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f172a">{isFr ? "TTS Expressif" : "Expressive TTS"}</text>
        <text x="447" y="88" textAnchor="middle" fontSize="6.5" fill="#475569">{isFr ? "Prosodique perso." : "Personalized prosody"}</text>

        {/* Axis 2b: Avatar — bottleneck */}
        <rect x="496" y="44" width="80" height="72" rx="3" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
        <text x="536" y="60" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#dc2626" fontFamily="'JetBrains Mono', monospace">{isFr ? "AXE 2b ⚠" : "AXIS 2b ⚠"}</text>
        <text x="536" y="72" textAnchor="middle" fontSize="8" fontWeight="700" fill="#dc2626">{isFr ? "Génération Avatar" : "Avatar Generation"}</text>
        <text x="536" y="84" textAnchor="middle" fontSize="6.5" fill="#7f1d1d">{isFr ? "Fidélité comportementale" : "Behavioral fidelity"}</text>
        <text x="536" y="108" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#dc2626" fontFamily="'JetBrains Mono', monospace">⚠ &lt;500ms target</text>

        {/* Axis 3: Orchestration */}
        <rect x="586" y="48" width="84" height="65" rx="3" fill="white" stroke="#004085" strokeWidth="1" />
        <text x="628" y="64" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#004085" fontFamily="'JetBrains Mono', monospace">{isFr ? "AXE 3" : "AXIS 3"}</text>
        <text x="628" y="76" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f172a">{isFr ? "Orchestration" : "Orchestration"}</text>
        <text x="628" y="88" textAnchor="middle" fontSize="6.5" fill="#475569">{isFr ? "Déterministe-organique" : "Deterministic-organic"}</text>
        <text x="628" y="100" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily="'JetBrains Mono', monospace">{isFr ? "Défi architecture" : "Architecture challenge"}</text>

        <line x1="680" y1="74" x2="698" y2="74" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ta1)" />

        {/* ── Memoways Internal ── */}
        <rect x="700" y="28" width="130" height="90" rx="5" fill="#fff3cd" stroke="#856404" strokeWidth="1.5" />
        <text x="765" y="46" textAnchor="middle" fontSize="6.5" fontWeight="700" letterSpacing="1" fill="#856404" fontFamily="'JetBrains Mono', monospace">{isFr ? "INTERNE — Memoways" : "INTERNAL — Memoways"}</text>
        <text x="765" y="61" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#856404">{isFr ? "Node Editor" : "Node Editor"}</text>
        <text x="765" y="74" textAnchor="middle" fontSize="7.5" fill="#475569">{isFr ? "Graphe conversationnel" : "Conversation graph"}</text>
        <text x="765" y="87" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#856404">{isFr ? "Player Configurable" : "Configurable Player"}</text>
        <text x="765" y="100" textAnchor="middle" fontSize="7.5" fill="#475569">Mode pédagogique / Mode narratif</text>

        {/* ── EXPERIENCE ── */}
        <line x1="765" y1="118" x2="765" y2="138" stroke="#0891b2" strokeWidth="2" markerEnd="url(#taBlue)" />
        <rect x="700" y="140" width="130" height="50" rx="4" fill="#eff6ff" stroke="#0891b2" strokeWidth="2" />
        <text x="765" y="162" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0891b2">{isFr ? "EXPÉRIENCE" : "EXPERIENCE"}</text>
        <text x="765" y="178" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0891b2" fontFamily="'JetBrains Mono', monospace">&lt;2s {isFr ? "cible" : "target"}</text>

        {/* ── Latency timeline at bottom ── */}
        <rect x="10" y="210" width="860" height="130" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        <text x="440" y="228" textAnchor="middle" fontSize="7" fontWeight="700" fill="#64748b" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">{isFr ? "BUDGET LATENCE CIBLE" : "TARGET LATENCY BUDGET"}</text>

        {[
          { x: 20,  w: 80,  label: "ASR+STT",                             val: "<300ms", color: "#16a34a" },
          { x: 110, w: 100, label: isFr ? "Orchestration" : "Orchestration", val: "<200ms", color: "#0891b2" },
          { x: 220, w: 120, label: "SLM+LLM",                             val: "<500ms", color: "#0891b2" },
          { x: 350, w: 100, label: "TTS",                                  val: "<200ms", color: "#0891b2" },
          { x: 460, w: 220, label: isFr ? "Avatar (R&D)" : "Avatar (R&D)", val: "<500ms", color: "#dc2626" },
          { x: 690, w: 80,  label: "Streaming",                            val: "<300ms", color: "#16a34a" },
        ].map((b, i) => (
          <g key={i}>
            <rect x={b.x + 10} y="238" width={b.w} height="22" rx="2" fill={b.color} opacity="0.15" stroke={b.color} strokeWidth="1" />
            <text x={b.x + 10 + b.w / 2} y="253" textAnchor="middle" fontSize="7" fontWeight="700" fill={b.color} fontFamily="'JetBrains Mono', monospace">{b.val}</text>
            <text x={b.x + 10 + b.w / 2} y="278" textAnchor="middle" fontSize="6.5" fill="#64748b">{b.label}</text>
          </g>
        ))}

        <text x="810" y="253" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0891b2" fontFamily="'JetBrains Mono', monospace">= &lt;2s</text>
        <text x="810" y="278" textAnchor="middle" fontSize="7" fill="#64748b">{isFr ? "total cible" : "total target"}</text>

        {/* Latency bar labels */}
        <text x="440" y="320" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
          {isFr ? "Toutes les valeurs sont des cibles R&D — benchmarks end-to-end prévus printemps 2026" : "All values are R&D targets — end-to-end benchmarks planned spring 2026"}
        </text>
      </svg>
    </div>
  );
}
