/*
 * ResearchGapDiagram — Research gap matrix: Urgency × Difficulty
 * Interactive tooltip: rich details on hover (description, axis, metrics, status)
 * i18n: EN (default) / FR via useLang
 */
import { useState, useRef, useCallback } from "react";
import { useLang } from "@/contexts/LangContext";

interface GapPoint {
  abbrev: string;
  label: string;
  labelFr: string;
  urgency: number;
  difficulty: number;
  color: string;
  axis: string;
  axisFr: string;
  status: string;
  statusFr: string;
  description: string;
  descriptionFr: string;
  sota: string;
  sotaFr: string;
  target: string;
  targetFr: string;
  rdLink: string;
}

const gaps: GapPoint[] = [
  {
    abbrev: "AVA",
    label: "Avatar behavioral fidelity",
    labelFr: "Fidélité comportementale avatar",
    urgency: 5,
    difficulty: 5,
    color: "#dc2626",
    axis: "Axis 2b",
    axisFr: "Axe 2b",
    status: "Critical — no solution exists",
    statusFr: "Critique — aucune solution existante",
    description: "No current solution can reproduce the specific behavioral repertoire of a real person (micro-expressions, gesture rhythm, prosodic fingerprint) in real time. Existing avatars are generic or pre-recorded.",
    descriptionFr: "Aucune solution actuelle ne peut reproduire le répertoire comportemental spécifique d'une personne réelle (micro-expressions, rythme gestuel, empreinte prosodique) en temps réel. Les avatars existants sont génériques ou pré-enregistrés.",
    sota: "BeyondPresence Genesis 2 (announced), NVIDIA ACE (gaming only)",
    sotaFr: "BeyondPresence Genesis 2 (annoncé), NVIDIA ACE (gaming uniquement)",
    target: "FID < 0.15 on facial sequences, behavioral consistency > 85%",
    targetFr: "FID < 0.15 sur séquences faciales, cohérence comportementale > 85%",
    rdLink: "/research",
  },
  {
    abbrev: "LAT",
    label: "Avatar end-to-end latency",
    labelFr: "Latence avatar end-to-end",
    urgency: 5,
    difficulty: 4.4,
    color: "#ea580c",
    axis: "Axis 1",
    axisFr: "Axe 1",
    status: "Critical — 6–12s current vs <2s target",
    statusFr: "Critique — 6–12s actuel vs cible <2s",
    description: "The video generation step (avatar rendering) is the main bottleneck: 5–10s alone. Cognitive fluency requires <2s total. No open-source sovereign solution achieves this. Commercial solutions (Simli <300ms, BeyondPresence <100ms) sacrifice sovereignty.",
    descriptionFr: "L'étape de génération vidéo (rendu avatar) est le principal goulot d'étranglement : 5–10s à elle seule. La fluidité cognitive exige <2s au total. Aucune solution open-source souveraine n'y parvient. Les solutions commerciales (Simli <300ms, BeyondPresence <100ms) sacrifient la souveraineté.",
    sota: "Simli Trinity-1 (<300ms), BeyondPresence (<100ms) — both non-sovereign",
    sotaFr: "Simli Trinity-1 (<300ms), BeyondPresence (<100ms) — non souverains",
    target: "TTFA < 500ms, TTFR < 200ms, total < 2s on sovereign GPU",
    targetFr: "TTFA < 500ms, TTFR < 200ms, total < 2s sur GPU souverain",
    rdLink: "/research",
  },
  {
    abbrev: "MEM",
    label: "Conversational memory",
    labelFr: "Mémoire conversationnelle",
    urgency: 4.6,
    difficulty: 4,
    color: "#0891b2",
    axis: "Axis 1",
    axisFr: "Axe 1",
    status: "High priority — 3-layer architecture needed",
    statusFr: "Haute priorité — architecture 3 couches nécessaire",
    description: "Current LLMs lose context after ~8k tokens. DigiDouble requires coherence over 1h+ sessions and across multiple sessions (days/weeks). A 3-layer memory architecture (working / episodic / semantic) with RAG retrieval is the proposed solution.",
    descriptionFr: "Les LLMs actuels perdent le contexte après ~8k tokens. DigiDouble exige une cohérence sur des sessions 1h+ et sur plusieurs sessions (jours/semaines). Une architecture mémoire 3 couches (working / épisodique / sémantique) avec récupération RAG est la solution proposée.",
    sota: "MemGPT (episodic), Zep (graph memory), LangGraph (state management)",
    sotaFr: "MemGPT (épisodique), Zep (mémoire graphe), LangGraph (gestion d'état)",
    target: "Session coherence > 95% over 1h, cross-session recall > 80%",
    targetFr: "Cohérence session > 95% sur 1h, rappel inter-sessions > 80%",
    rdLink: "/research",
  },
  {
    abbrev: "TTS",
    label: "Personalized prosodic TTS",
    labelFr: "TTS prosodique personnalisé",
    urgency: 4,
    difficulty: 4,
    color: "#d97706",
    axis: "Axis 2a",
    axisFr: "Axe 2a",
    status: "High — prosodic fingerprint not solved",
    statusFr: "Élevé — empreinte prosodique non résolue",
    description: "Existing TTS (ElevenLabs, Coqui, StyleTTS2) can clone a voice timbre but not its prosodic fingerprint: individual rhythm, pause patterns, emphasis style. DigiDouble needs to reproduce how a specific person speaks, not just their voice.",
    descriptionFr: "Les TTS existants (ElevenLabs, Coqui, StyleTTS2) peuvent cloner un timbre vocal mais pas son empreinte prosodique : rythme individuel, patterns de pauses, style d'emphase. DigiDouble doit reproduire comment une personne spécifique parle, pas seulement sa voix.",
    sota: "StyleTTS2 (MOS 4.3), ElevenLabs (voice cloning), Coqui XTTS-v2",
    sotaFr: "StyleTTS2 (MOS 4.3), ElevenLabs (clonage vocal), Coqui XTTS-v2",
    target: "MOS > 4.0, DTW prosodic distance < 0.15 vs reference speaker",
    targetFr: "MOS > 4.0, distance prosodique DTW < 0.15 vs locuteur référence",
    rdLink: "/research",
  },
  {
    abbrev: "ORC",
    label: "Deterministic-organic orchestration",
    labelFr: "Orchestration déterministe-organique",
    urgency: 4,
    difficulty: 3,
    color: "#7c3aed",
    axis: "Axis 3",
    axisFr: "Axe 3",
    status: "Priority — no existing framework",
    statusFr: "Prioritaire — aucun framework existant",
    description: "No existing framework combines deterministic narrative control (scripted sequences, pedagogical constraints) with organic LLM-driven conversation. DigiDouble needs a continuum 0–100% between full script and full improvisation, manageable by non-technical creators.",
    descriptionFr: "Aucun framework existant ne combine contrôle narratif déterministe (séquences scriptées, contraintes pédagogiques) avec conversation organique pilotée par LLM. DigiDouble a besoin d'un continuum 0–100% entre script complet et improvisation totale, gérable par des créateurs non techniques.",
    sota: "LangGraph (state), Flowise (visual), Haystack (pipeline) — none combine both",
    sotaFr: "LangGraph (état), Flowise (visuel), Haystack (pipeline) — aucun ne combine les deux",
    target: "Node editor supporting deterministic/organic blend, <200ms orchestration latency",
    targetFr: "Éditeur de nœuds supportant le mélange déterministe/organique, latence orchestration <200ms",
    rdLink: "/research",
  },
  {
    abbrev: "SYN",
    label: "Multi-stream synchronization",
    labelFr: "Synchronisation multi-flux",
    urgency: 3,
    difficulty: 3,
    color: "#16a34a",
    axis: "Internal R&D",
    axisFr: "R&D Interne",
    status: "Secondary — Memoways expertise",
    statusFr: "Secondaire — expertise Memoways",
    description: "DigiDouble requires synchronization of 5 simultaneous streams (video avatar, voice, subtitles, quiz overlays, chapter markers) with <100ms drift. Memoways' 14 years of multimedia experience provides a strong foundation; this is internal R&D, not academic research.",
    descriptionFr: "DigiDouble exige la synchronisation de 5 flux simultanés (vidéo avatar, voix, sous-titres, overlays quiz, marqueurs de chapitre) avec une dérive <100ms. Les 14 ans d'expérience multimédia de Memoways fournissent une base solide ; c'est de la R&D interne, pas de la recherche académique.",
    sota: "WebRTC (native sync), HLS (adaptive), Memoways Node Editor (proprietary)",
    sotaFr: "WebRTC (sync native), HLS (adaptatif), Node Editor Memoways (propriétaire)",
    target: "< 100ms drift across 5 streams, 99.9% sync reliability",
    targetFr: "< 100ms de dérive sur 5 flux, fiabilité de sync 99.9%",
    rdLink: "/project",
  },
];

export default function ResearchGapDiagram() {
  const { lang } = useLang();
  const isFr = lang === "fr";
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // SVG canvas dimensions
  const W = 760;
  const H = 420;
  const PAD_L = 72;
  const PAD_R = 30;
  const PAD_T = 48;
  const PAD_B = 52;
  const PLOT_W = W - PAD_L - PAD_R;
  const PLOT_H = H - PAD_T - PAD_B;

  function px(urgency: number) { return PAD_L + ((urgency - 1) / 4) * PLOT_W; }
  function py(difficulty: number) { return PAD_T + ((5 - difficulty) / 4) * PLOT_H; }

  const hoveredGap = gaps.find((g) => g.abbrev === hovered);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div className="w-full" ref={containerRef}>
      {/* Main SVG chart */}
      <div className="w-full overflow-hidden rounded-lg border border-slate-100 relative" style={{ background: "oklch(0.99 0.003 200)" }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ fontFamily: "'Space Grotesk', sans-serif", display: "block" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { setHovered(null); setTooltipPos(null); }}
        >
          {/* Quadrant backgrounds */}
          <rect x={PAD_L + PLOT_W / 2} y={PAD_T} width={PLOT_W / 2} height={PLOT_H / 2} fill="#fef2f2" opacity="0.6" />
          <rect x={PAD_L} y={PAD_T} width={PLOT_W / 2} height={PLOT_H / 2} fill="#fffbeb" opacity="0.5" />
          <rect x={PAD_L + PLOT_W / 2} y={PAD_T + PLOT_H / 2} width={PLOT_W / 2} height={PLOT_H / 2} fill="#f0fdf4" opacity="0.5" />
          <rect x={PAD_L} y={PAD_T + PLOT_H / 2} width={PLOT_W / 2} height={PLOT_H / 2} fill="#f8fafc" opacity="0.4" />

          {/* Quadrant labels */}
          <text x={PAD_L + PLOT_W * 0.76} y={PAD_T + 18} textAnchor="middle" fontSize="11" fill="#dc2626" fontFamily="'JetBrains Mono', monospace" opacity="0.75" letterSpacing="1">
            {isFr ? "CRITIQUE" : "CRITICAL"}
          </text>
          <text x={PAD_L + PLOT_W * 0.24} y={PAD_T + 18} textAnchor="middle" fontSize="11" fill="#d97706" fontFamily="'JetBrains Mono', monospace" opacity="0.75" letterSpacing="1">
            {isFr ? "COMPLEXE" : "COMPLEX"}
          </text>
          <text x={PAD_L + PLOT_W * 0.76} y={PAD_T + PLOT_H - 10} textAnchor="middle" fontSize="11" fill="#16a34a" fontFamily="'JetBrains Mono', monospace" opacity="0.75" letterSpacing="1">
            {isFr ? "PRIORITAIRE" : "PRIORITY"}
          </text>
          <text x={PAD_L + PLOT_W * 0.24} y={PAD_T + PLOT_H - 10} textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" opacity="0.75" letterSpacing="1">
            {isFr ? "SECONDAIRE" : "SECONDARY"}
          </text>

          {/* Grid lines */}
          {[1, 2, 3, 4, 5].map((v) => (
            <line key={`gx${v}`} x1={px(v)} y1={PAD_T} x2={px(v)} y2={PAD_T + PLOT_H} stroke="#e2e8f0" strokeWidth="1" />
          ))}
          {[1, 2, 3, 4, 5].map((v) => (
            <line key={`gy${v}`} x1={PAD_L} y1={py(v)} x2={PAD_L + PLOT_W} y2={py(v)} stroke="#e2e8f0" strokeWidth="1" />
          ))}

          {/* Quadrant dividers */}
          <line x1={PAD_L + PLOT_W / 2} y1={PAD_T} x2={PAD_L + PLOT_W / 2} y2={PAD_T + PLOT_H} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6,3" />
          <line x1={PAD_L} y1={PAD_T + PLOT_H / 2} x2={PAD_L + PLOT_W} y2={PAD_T + PLOT_H / 2} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6,3" />

          {/* X axis */}
          <line x1={PAD_L} y1={PAD_T + PLOT_H} x2={PAD_L + PLOT_W + 14} y2={PAD_T + PLOT_H} stroke="#334155" strokeWidth="2" />
          <polygon points={`${PAD_L + PLOT_W + 14},${PAD_T + PLOT_H - 5} ${PAD_L + PLOT_W + 22},${PAD_T + PLOT_H} ${PAD_L + PLOT_W + 14},${PAD_T + PLOT_H + 5}`} fill="#334155" />
          {[1, 2, 3, 4, 5].map((v) => (
            <g key={`xt${v}`}>
              <line x1={px(v)} y1={PAD_T + PLOT_H} x2={px(v)} y2={PAD_T + PLOT_H + 5} stroke="#94a3b8" strokeWidth="1" />
              <text x={px(v)} y={PAD_T + PLOT_H + 18} textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">{v}</text>
            </g>
          ))}
          <text x={PAD_L + PLOT_W / 2} y={H - 6} textAnchor="middle" fontSize="12" fill="#374151" fontWeight="600">
            {isFr ? "Urgence →" : "Urgency →"}
          </text>

          {/* Y axis */}
          <line x1={PAD_L} y1={PAD_T + PLOT_H} x2={PAD_L} y2={PAD_T - 8} stroke="#334155" strokeWidth="2" />
          <polygon points={`${PAD_L - 5},${PAD_T - 8} ${PAD_L},${PAD_T - 17} ${PAD_L + 5},${PAD_T - 8}`} fill="#334155" />
          {[1, 2, 3, 4, 5].map((v) => (
            <g key={`yt${v}`}>
              <line x1={PAD_L - 5} y1={py(v)} x2={PAD_L} y2={py(v)} stroke="#94a3b8" strokeWidth="1" />
              <text x={PAD_L - 10} y={py(v) + 4} textAnchor="end" fontSize="11" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">{v}</text>
            </g>
          ))}
          <text x={18} y={PAD_T + PLOT_H / 2} textAnchor="middle" fontSize="12" fill="#374151" fontWeight="600"
            transform={`rotate(-90, 18, ${PAD_T + PLOT_H / 2})`}>
            {isFr ? "Difficulté →" : "Difficulty →"}
          </text>

          {/* Data points */}
          {gaps.map((gap) => {
            const x = px(gap.urgency);
            const y = py(gap.difficulty);
            const isHov = hovered === gap.abbrev;
            const r = isHov ? 30 : 22;
            return (
              <g
                key={gap.abbrev}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHovered(gap.abbrev)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Glow ring on hover */}
                {isHov && (
                  <circle cx={x} cy={y} r={r + 8} fill={gap.color} fillOpacity="0.08" />
                )}
                <circle
                  cx={x} cy={y} r={r}
                  fill={gap.color} fillOpacity={isHov ? 0.22 : 0.13}
                  stroke={gap.color} strokeWidth={isHov ? 2.5 : 2}
                  style={{ transition: "r 0.15s ease, fill-opacity 0.15s ease" }}
                />
                <text x={x} y={y - 3} textAnchor="middle" fontSize={isHov ? "13" : "12"} fontWeight="800" fill={gap.color} fontFamily="'JetBrains Mono', monospace">
                  {gap.abbrev}
                </text>
                <text x={x} y={y + 11} textAnchor="middle" fontSize="9.5" fill={gap.color} fontFamily="'JetBrains Mono', monospace" opacity="0.85">
                  {gap.urgency}/{gap.difficulty}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating tooltip — positioned near cursor */}
        {hoveredGap && tooltipPos && (
          <div
            className="absolute z-30 pointer-events-none"
            style={{
              left: tooltipPos.x + 16,
              top: tooltipPos.y - 10,
              // Flip left if too close to right edge
              transform: tooltipPos.x > 480 ? "translateX(calc(-100% - 32px))" : "none",
              maxWidth: "300px",
            }}
          >
            <div
              className="rounded-lg border shadow-xl p-4"
              style={{
                background: "white",
                borderColor: `${hoveredGap.color}40`,
                borderLeftWidth: "3px",
                borderLeftColor: hoveredGap.color,
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black flex-shrink-0"
                      style={{ background: `${hoveredGap.color}18`, color: hoveredGap.color, border: `1.5px solid ${hoveredGap.color}50`, fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {hoveredGap.abbrev}
                    </span>
                    <span className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? hoveredGap.labelFr : hoveredGap.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 ml-9">
                    <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: `${hoveredGap.color}12`, color: hoveredGap.color }}>
                      {isFr ? hoveredGap.axisFr : hoveredGap.axis}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      U:{hoveredGap.urgency} · D:{hoveredGap.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status badge */}
              <div className="text-xs font-semibold mb-2 px-2 py-1 rounded" style={{ background: `${hoveredGap.color}10`, color: hoveredGap.color, fontFamily: "'JetBrains Mono', monospace" }}>
                {isFr ? hoveredGap.statusFr : hoveredGap.status}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-3" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr ? hoveredGap.descriptionFr : hoveredGap.description}
              </p>

              {/* SOTA */}
              <div className="mb-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {isFr ? "Meilleur SOTA" : "Best SOTA"}
                </div>
                <div className="text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr ? hoveredGap.sotaFr : hoveredGap.sota}
                </div>
              </div>

              {/* Target */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: hoveredGap.color, fontFamily: "'JetBrains Mono', monospace" }}>
                  {isFr ? "Cible R&D" : "R&D Target"}
                </div>
                <div className="text-xs font-mono" style={{ color: hoveredGap.color }}>
                  {isFr ? hoveredGap.targetFr : hoveredGap.target}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend — clean grid below */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {gaps.map((gap) => (
          <div
            key={gap.abbrev}
            className="flex items-center gap-2 px-3 py-2 rounded border cursor-pointer transition-all duration-100"
            style={{
              borderColor: hovered === gap.abbrev ? `${gap.color}60` : "#e2e8f0",
              background: hovered === gap.abbrev ? `${gap.color}08` : "transparent",
            }}
            onMouseEnter={() => setHovered(gap.abbrev)}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black flex-shrink-0"
              style={{ background: `${gap.color}18`, color: gap.color, border: `1.5px solid ${gap.color}50`, fontFamily: "'JetBrains Mono', monospace" }}
            >
              {gap.abbrev}
            </span>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-700 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? gap.labelFr : gap.label}
              </div>
              <div className="text-xs font-mono opacity-60" style={{ color: gap.color }}>{isFr ? gap.axisFr : gap.axis}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Instruction hint */}
      <p className="text-xs text-slate-400 mt-2 text-center italic" style={{ fontFamily: "'Source Serif 4', serif" }}>
        {isFr ? "Survolez chaque point pour afficher les détails du gap de recherche" : "Hover each point to display research gap details"}
      </p>
    </div>
  );
}
