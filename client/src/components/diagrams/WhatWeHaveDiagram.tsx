/*
 * WhatWeHaveDiagram — DigiDouble Research Portal
 * Shows: Available (green) vs Gap/R&D (blue) vs Internal expertise (yellow)
 * Full pipeline: USER → Sovereign ASR → [GAP: Orchestration/Memory/LLM/TTS/Avatar] → Multi-Stream → EXPERIENCE
 * i18n: EN (default) / FR via useLang
 */
import { useLang } from "@/contexts/LangContext";

export default function WhatWeHaveDiagram() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const labels = {
    user: isFr ? "UTILISATEUR" : "USER",
    userSub: isFr ? "Voix / Texte" : "Voice / Text",
    available: isFr ? "DISPONIBLE" : "AVAILABLE",
    gap: isFr ? "GAP — R&D Requis" : "GAP — R&D Required",
    internal: isFr ? "EXPERTISE INTERNE" : "INTERNAL EXPERTISE",
    experience: isFr ? "EXPÉRIENCE" : "EXPERIENCE",
    experienceSub: isFr ? "Cible <2s" : "Target <2s",
    asr: isFr ? "ASR Souverain\nAudiogami" : "Sovereign ASR\nAudiogami",
    asrSub: isFr ? "Hébergé CH · Production" : "Swiss-hosted · Production",
    orch: isFr ? "Orchestration" : "Orchestration",
    orchSub: isFr ? "Agentique" : "Agentic",
    mem: isFr ? "Mémoire" : "Memory",
    memSub: isFr ? "Long terme" : "Long-term",
    llm: "LLM / SLM",
    llmSub: isFr ? "Génération" : "Generation",
    tts: "TTS",
    ttsSub: isFr ? "Voix expressive" : "Expressive voice",
    avatar: isFr ? "Avatar" : "Avatar",
    avatarSub: isFr ? "⚠ Goulot" : "⚠ Bottleneck",
    multistream: isFr ? "Sync Multi-Stream\n5 flux · <100ms" : "Multi-Stream Sync\n5 streams · <100ms",
    gamilab: "Gamilab",
    memoways: "Memoways",
    idiap: "IDIAP R&D",
    innosuisse: "Innosuisse",
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 1215 432" className="w-full" style={{ fontFamily: "'Space Grotesk', sans-serif", minWidth: 945 }}>
        <g transform="scale(1.35) translate(0, 0)">

        {/* ── Background zones ── */}
        {/* Available zone (green) */}
        <rect x="135" y="81" width="209" height="270" rx="8" fill="#d4edda" stroke="#28a745" strokeWidth="2" />
        <text x="239" y="70" textAnchor="middle" fontSize="9.5" fontWeight="700" letterSpacing="1" fill="#155724" fontFamily="'JetBrains Mono', monospace">✅ {labels.available}</text>

        {/* GAP zone (blue) */}
        <rect x="371" y="81" width="500" height="270" rx="8" fill="#cce5ff" stroke="#004085" strokeWidth="2" />
        <text x="621" y="70" textAnchor="middle" fontSize="9.5" fontWeight="700" letterSpacing="1" fill="#004085" fontFamily="'JetBrains Mono', monospace">🔴 {labels.gap}</text>

        {/* Internal zone (yellow) */}
        <rect x="898" y="81" width="209" height="270" rx="8" fill="#fff3cd" stroke="#856404" strokeWidth="2" />
        <text x="1002" y="70" textAnchor="middle" fontSize="9.5" fontWeight="700" letterSpacing="1" fill="#856404" fontFamily="'JetBrains Mono', monospace">✅ {labels.internal}</text>

        {/* ── USER node ── */}
        <rect x="13" y="162" width="97" height="81" rx="5" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
        <text x="61" y="193" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">{labels.user}</text>
        <text x="61" y="211" textAnchor="middle" fontSize="9.5" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">{labels.userSub}</text>
        {/* Scale note: viewBox already scaled 1.35x from original 900x320 */}

        {/* Arrow USER → ASR */}
        <line x1="82" y1="150" x2="108" y2="150" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arr)" />

        {/* ── ASR block ── */}
        <rect x="110" y="100" width="133" height="100" rx="4" fill="white" stroke="#28a745" strokeWidth="1.5" />
        <text x="177" y="128" textAnchor="middle" fontSize="9" fontWeight="700" fill="#155724">Sovereign ASR</text>
        <text x="177" y="142" textAnchor="middle" fontSize="8" fontWeight="600" fill="#155724">Audiogami</text>
        <text x="177" y="158" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="'JetBrains Mono', monospace">Swiss-hosted</text>
        <text x="177" y="170" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="'JetBrains Mono', monospace">Production-grade</text>
        {/* Gamilab badge */}
        <rect x="130" y="182" width="94" height="14" rx="3" fill="#d4edda" stroke="#28a745" strokeWidth="0.5" />
        <text x="177" y="192" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#155724" fontFamily="'JetBrains Mono', monospace">{labels.gamilab}</text>

        {/* Arrow ASR → GAP */}
        <line x1="243" y1="150" x2="283" y2="150" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arr)" />

        {/* ── GAP blocks (5 sub-blocks) ── */}
        {/* Orchestration */}
        <rect x="285" y="90" width="60" height="70" rx="3" fill="white" stroke="#004085" strokeWidth="1" />
        <text x="315" y="118" textAnchor="middle" fontSize="8" fontWeight="700" fill="#004085">{labels.orch}</text>
        <text x="315" y="130" textAnchor="middle" fontSize="6.5" fill="#475569" fontFamily="'JetBrains Mono', monospace">{labels.orchSub}</text>

        {/* Memory */}
        <rect x="355" y="90" width="60" height="70" rx="3" fill="white" stroke="#004085" strokeWidth="1" />
        <text x="385" y="118" textAnchor="middle" fontSize="8" fontWeight="700" fill="#004085">{labels.mem}</text>
        <text x="385" y="130" textAnchor="middle" fontSize="6.5" fill="#475569" fontFamily="'JetBrains Mono', monospace">{labels.memSub}</text>

        {/* LLM */}
        <rect x="425" y="90" width="60" height="70" rx="3" fill="white" stroke="#004085" strokeWidth="1" />
        <text x="455" y="118" textAnchor="middle" fontSize="8" fontWeight="700" fill="#004085">{labels.llm}</text>
        <text x="455" y="130" textAnchor="middle" fontSize="6.5" fill="#475569" fontFamily="'JetBrains Mono', monospace">{labels.llmSub}</text>

        {/* TTS */}
        <rect x="495" y="90" width="60" height="70" rx="3" fill="white" stroke="#004085" strokeWidth="1" />
        <text x="525" y="118" textAnchor="middle" fontSize="8" fontWeight="700" fill="#004085">{labels.tts}</text>
        <text x="525" y="130" textAnchor="middle" fontSize="6.5" fill="#475569" fontFamily="'JetBrains Mono', monospace">{labels.ttsSub}</text>

        {/* Avatar — bottleneck (red) */}
        <rect x="565" y="85" width="68" height="80" rx="3" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
        <text x="599" y="116" textAnchor="middle" fontSize="8" fontWeight="700" fill="#dc2626">{labels.avatar}</text>
        <text x="599" y="130" textAnchor="middle" fontSize="7" fontWeight="700" fill="#dc2626" fontFamily="'JetBrains Mono', monospace">{labels.avatarSub}</text>
        <text x="599" y="143" textAnchor="middle" fontSize="6.5" fill="#7f1d1d" fontFamily="'JetBrains Mono', monospace">5–15s now</text>
        <text x="599" y="155" textAnchor="middle" fontSize="6.5" fill="#16a34a" fontFamily="'JetBrains Mono', monospace">&lt;500ms target</text>

        {/* IDIAP badge */}
        <rect x="300" y="175" width="55" height="14" rx="3" fill="#cce5ff" stroke="#004085" strokeWidth="0.5" />
        <text x="327" y="185" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#004085" fontFamily="'JetBrains Mono', monospace">{labels.idiap}</text>
        <rect x="363" y="175" width="60" height="14" rx="3" fill="#cce5ff" stroke="#004085" strokeWidth="0.5" />
        <text x="393" y="185" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#004085" fontFamily="'JetBrains Mono', monospace">{labels.innosuisse}</text>

        {/* Arrows between GAP blocks */}
        <line x1="345" y1="125" x2="353" y2="125" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrSm)" />
        <line x1="415" y1="125" x2="423" y2="125" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrSm)" />
        <line x1="485" y1="125" x2="493" y2="125" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrSm)" />
        <line x1="555" y1="125" x2="563" y2="125" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#arrRed)" />

        {/* Arrow GAP → Internal */}
        <line x1="633" y1="150" x2="673" y2="150" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arr)" />

        {/* ── Internal block ── */}
        <rect x="675" y="100" width="133" height="100" rx="4" fill="white" stroke="#856404" strokeWidth="1.5" />
        <text x="742" y="128" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#856404">Multi-Stream Sync</text>
        <text x="742" y="142" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="#856404">5 streams · &lt;100ms</text>
        <text x="742" y="158" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="'JetBrains Mono', monospace">14y multimedia exp.</text>
        <text x="742" y="170" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="'JetBrains Mono', monospace">Node editor · Player</text>
        {/* Memoways badge */}
        <rect x="695" y="182" width="94" height="14" rx="3" fill="#fff3cd" stroke="#856404" strokeWidth="0.5" />
        <text x="742" y="192" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#856404" fontFamily="'JetBrains Mono', monospace">{labels.memoways}</text>

        {/* Arrow Internal → EXPERIENCE */}
        <line x1="808" y1="150" x2="828" y2="150" stroke="#0891b2" strokeWidth="2" markerEnd="url(#arrBlue)" />

        {/* ── EXPERIENCE node ── */}
        <rect x="830" y="118" width="62" height="64" rx="4" fill="#eff6ff" stroke="#0891b2" strokeWidth="2" />
        <text x="861" y="143" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0891b2">{labels.experience}</text>
        <text x="861" y="157" textAnchor="middle" fontSize="7" fontWeight="700" fill="#0891b2" fontFamily="'JetBrains Mono', monospace">{labels.experienceSub}</text>

        {/* ── Research axes labels at bottom ── */}
        <text x="315" y="220" textAnchor="middle" fontSize="6.5" fill="#004085" fontFamily="'JetBrains Mono', monospace">{isFr ? "Axe 3" : "Axis 3"}</text>
        <text x="385" y="220" textAnchor="middle" fontSize="6.5" fill="#004085" fontFamily="'JetBrains Mono', monospace">{isFr ? "Axe 1" : "Axis 1"}</text>
        <text x="455" y="220" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="'JetBrains Mono', monospace">External</text>
        <text x="525" y="220" textAnchor="middle" fontSize="6.5" fill="#004085" fontFamily="'JetBrains Mono', monospace">{isFr ? "Axe 2a" : "Axis 2a"}</text>
        <text x="599" y="220" textAnchor="middle" fontSize="6.5" fill="#dc2626" fontFamily="'JetBrains Mono', monospace">{isFr ? "Axe 2b ⚠" : "Axis 2b ⚠"}</text>

        {/* ── Arrow markers ── */}
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
          </marker>
          <marker id="arrSm" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="#94a3b8" />
          </marker>
          <marker id="arrRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" />
          </marker>
          <marker id="arrBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#0891b2" />
          </marker>
        </defs>
        </g>
      </svg>
    </div>
  );
}
