/*
 * ResearchAxesDiagram — DigiDouble Research Portal
 * Visual: 3 research axes as interactive cards with key metrics + accordion details
 * Design: icon + metric + 1-line summary, expandable details
 */
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Axis {
  number: string;
  icon: React.ReactNode;
  title: string;
  titleFr: string;
  metric: string;
  metricLabel: string;
  metricLabelFr: string;
  color: string;
  summary: string;
  summaryFr: string;
  researcher: string;
  details: string[];
  detailsFr: string[];
  hypotheses: { id: string; text: string; textFr: string }[];
}

const axes: Axis[] = [
  {
    number: "01",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" stroke="oklch(0.60 0.20 25)" strokeWidth="1.5" fill="oklch(0.98 0.02 25)" />
        <line x1="6" y1="14" x2="22" y2="14" stroke="oklch(0.60 0.20 25)" strokeWidth="1.5" />
        <polygon points="19,10 23,14 19,18" fill="oklch(0.60 0.20 25)" />
        <text x="9" y="12" fontSize="5" fill="oklch(0.60 0.20 25)" fontFamily="monospace">6s</text>
        <text x="9" y="19" fontSize="5" fill="oklch(0.45 0.18 145)" fontFamily="monospace">&lt;2s</text>
      </svg>
    ),
    title: "End-to-End Latency",
    titleFr: "Latence End-to-End",
    metric: "6–10×",
    metricLabel: "reduction required",
    metricLabelFr: "réduction requise",
    color: "oklch(0.60 0.20 25)",
    summary: "Avatar generation is the main bottleneck (5–10s). Target: <2s total via distillation + streaming.",
    summaryFr: "La génération avatar est le goulot principal (5–10s). Cible : <2s total via distillation + streaming.",
    researcher: "Dr. Petr Motlicek · IDIAP",
    details: [
      "Current pipeline: ASR (300ms) + LLM (800ms) + TTS (300ms) + Avatar (5–10s) + WebRTC (50ms) = 6–12s",
      "Target: each component under 500ms, avatar under 500ms via R&D",
      "Approach: streaming pipeline (LLM → TTS → Avatar in parallel), model distillation, intelligent caching",
      "Hypothesis H1: streaming pipeline reduces latency by 60%",
    ],
    detailsFr: [
      "Pipeline actuel : ASR (300ms) + LLM (800ms) + TTS (300ms) + Avatar (5–10s) + WebRTC (50ms) = 6–12s",
      "Cible : chaque composant sous 500ms, avatar sous 500ms via R&D",
      "Approche : pipeline streaming (LLM → TTS → Avatar en parallèle), distillation de modèles, cache intelligent",
      "Hypothèse H1 : le pipeline streaming réduit la latence de 60%",
    ],
    hypotheses: [
      { id: "H1", text: "Streaming pipeline (LLM → TTS → Avatar) reduces latency by 60%", textFr: "Le pipeline streaming réduit la latence de 60%" },
    ],
  },
  {
    number: "02",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" stroke="oklch(0.72 0.18 200)" strokeWidth="1.5" fill="oklch(0.97 0.02 200)" />
        {/* 3 layers */}
        <rect x="7" y="8" width="14" height="3" rx="1" fill="oklch(0.72 0.18 200)" opacity="0.9" />
        <rect x="7" y="12.5" width="14" height="3" rx="1" fill="oklch(0.72 0.18 200)" opacity="0.6" />
        <rect x="7" y="17" width="14" height="3" rx="1" fill="oklch(0.72 0.18 200)" opacity="0.3" />
      </svg>
    ),
    title: "Conversational Memory",
    titleFr: "Mémoire Conversationnelle",
    metric: "−90%",
    metricLabel: "token reduction (Mem0)",
    metricLabelFr: "réduction tokens (Mem0)",
    color: "oklch(0.72 0.18 200)",
    summary: "Maintain coherence over 1h+ sessions without exploding LLM context. 3-layer architecture.",
    summaryFr: "Maintenir la cohérence sur des sessions 1h+ sans exploser le contexte LLM. Architecture 3 couches.",
    researcher: "Dr. Petr Motlicek · IDIAP",
    details: [
      "Problem: naive approaches fail — full history is too expensive, truncation destroys continuity",
      "Solution: 3-layer memory — Working (in-context), Episodic (vector DB), Semantic (PostgreSQL)",
      "Mem0 (2025): +26% accuracy, −91% latency, −90% tokens vs baseline",
      "Challenge: adapt to avatar-specific multi-session context (days/weeks)",
      "Hypothesis H2: 3-layer memory reduces context by 90% while maintaining 95% coherence",
    ],
    detailsFr: [
      "Problème : les approches naïves échouent — l'historique complet est trop coûteux, la troncature détruit la continuité",
      "Solution : mémoire 3 couches — Travail (in-context), Épisodique (vector DB), Sémantique (PostgreSQL)",
      "Mem0 (2025) : +26% précision, −91% latence, −90% tokens vs baseline",
      "Défi : adapter au contexte multi-sessions spécifique à l'avatar (jours/semaines)",
      "Hypothèse H2 : la mémoire 3 couches réduit le contexte de 90% tout en maintenant 95% de cohérence",
    ],
    hypotheses: [
      { id: "H2", text: "3-layer memory reduces context by 90% while maintaining 95% coherence", textFr: "La mémoire 3 couches réduit le contexte de 90% tout en maintenant 95% de cohérence" },
    ],
  },
  {
    number: "03",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" stroke="oklch(0.72 0.18 50)" strokeWidth="1.5" fill="oklch(0.97 0.02 50)" />
        {/* Face */}
        <circle cx="14" cy="12" r="4" stroke="oklch(0.72 0.18 50)" strokeWidth="1.2" fill="none" />
        <circle cx="12.5" cy="11.5" r="0.8" fill="oklch(0.72 0.18 50)" />
        <circle cx="15.5" cy="11.5" r="0.8" fill="oklch(0.72 0.18 50)" />
        <path d="M12 13.5 Q14 15 16 13.5" stroke="oklch(0.72 0.18 50)" strokeWidth="0.8" fill="none" />
        {/* Body */}
        <path d="M10 18 Q14 16 18 18" stroke="oklch(0.72 0.18 50)" strokeWidth="1.2" fill="none" />
        <line x1="14" y1="16" x2="14" y2="21" stroke="oklch(0.72 0.18 50)" strokeWidth="1.2" />
      </svg>
    ),
    title: "Expressive Avatar & Behavioral Fidelity",
    titleFr: "Avatar Expressif & Fidélité Comportementale",
    metric: "80%",
    metricLabel: "behavioral fidelity target",
    metricLabelFr: "fidélité comportementale cible",
    color: "oklch(0.72 0.18 50)",
    summary: "Beyond lip-sync: extract micro-expressions, gestures, posture from video archives.",
    summaryFr: "Au-delà du lip-sync : extraire micro-expressions, gestes, posture depuis les archives vidéo.",
    researcher: "Dr. Mathew Magimai-Doss · IDIAP",
    details: [
      "Problem: current avatars look like the person but don't behave like them — uncanny valley of familiarity",
      "Goal: extract behavioral fingerprint from 10min of video (micro-expressions, gestural vocabulary, speech rhythm)",
      "VASA-1 (Microsoft, 2024): 40 FPS, nuanced expressions — not commercialized",
      "A²-LLM (2026): end-to-end audio-avatar LLM, emotionally rich facial movements",
      "Hypothesis H3: behavioral extraction from 10min video achieves 80% fidelity",
    ],
    detailsFr: [
      "Problème : les avatars actuels ressemblent à la personne mais ne se comportent pas comme elle — vallée de l'étrange de la familiarité",
      "Objectif : extraire l'empreinte comportementale depuis 10min de vidéo (micro-expressions, vocabulaire gestuel, rythme de parole)",
      "VASA-1 (Microsoft, 2024) : 40 FPS, expressions nuancées — non commercialisé",
      "A²-LLM (2026) : LLM audio-avatar end-to-end, mouvements faciaux émotionnellement riches",
      "Hypothèse H3 : l'extraction comportementale depuis 10min de vidéo atteint 80% de fidélité",
    ],
    hypotheses: [
      { id: "H3", text: "Behavioral extraction from 10min video achieves 80% fidelity", textFr: "L'extraction comportementale depuis 10min de vidéo atteint 80% de fidélité" },
    ],
  },
];

interface Props {
  lang?: "en" | "fr";
}

export default function ResearchAxesDiagram({ lang = "en" }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const isFr = lang === "fr";

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {axes.map((axis, i) => (
        <div
          key={axis.number}
          className="border border-slate-200 rounded-lg overflow-hidden"
          style={{ borderTopColor: axis.color, borderTopWidth: "3px" }}
        >
          {/* Header */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {axis.icon}
                <div>
                  <div className="text-xs font-mono text-slate-400">{axis.number}</div>
                  <div className="font-bold text-slate-900 text-sm leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? axis.titleFr : axis.title}
                  </div>
                </div>
              </div>
            </div>

            {/* Key metric */}
            <div className="mb-3 p-3 rounded" style={{ background: `oklch(from ${axis.color} l c h / 0.06)` }}>
              <div className="text-2xl font-bold font-mono" style={{ color: axis.color }}>{axis.metric}</div>
              <div className="text-xs text-slate-500 font-mono">{isFr ? axis.metricLabelFr : axis.metricLabel}</div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-3" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr ? axis.summaryFr : axis.summary}
            </p>

            <div className="text-xs text-slate-400 font-mono mb-3">{axis.researcher}</div>

            {/* Hypotheses */}
            {axis.hypotheses.map((h) => (
              <div key={h.id} className="flex gap-2 mb-1">
                <span className="text-xs font-bold font-mono shrink-0" style={{ color: axis.color }}>{h.id}</span>
                <span className="text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr ? h.textFr : h.text}
                </span>
              </div>
            ))}
          </div>

          {/* Accordion toggle */}
          <button
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-2.5 border-t border-slate-100 text-xs font-medium transition-colors hover:bg-slate-50"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: axis.color }}
          >
            <span>{isFr ? "Détails techniques" : "Technical details"}</span>
            {expanded === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {expanded === i && (
            <div className="px-5 pb-4 border-t border-slate-100 bg-slate-50">
              <ul className="mt-3 space-y-2">
                {(isFr ? axis.detailsFr : axis.details).map((d, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-xs shrink-0 mt-0.5" style={{ color: axis.color }}>·</span>
                    <span className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
