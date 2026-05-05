/**
 * GamiWaysArchitecture.tsx — GamiWays Research Portal
 * Page: Target Architecture (extracted from Research section 01)
 * Context: GamiWays project — part of "The Project" menu
 * Design: Technical Blueprint
 * i18n: EN / FR via LangContext
 */
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import SectionHeader from "@/components/SectionHeader";
import TargetArchDiagram from "@/components/diagrams/TargetArchDiagram";
import DiagramModal from "@/components/DiagramModal";

export default function GamiWaysArchitecture() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const cognitiveThresholds = [
    {
      ms: "<500ms",
      label: isFr ? "Fluidité perceptive" : "Perceptive fluidity",
      desc: isFr
        ? "Seuil de fluidité perceptive. L'utilisateur perçoit un léger délai mais l'interaction reste naturelle. Cible pour TTS first audio."
        : "Perceptive fluidity threshold. User perceives slight delay but interaction remains natural. Target for TTS first audio.",
      color: "oklch(0.65 0.18 145)",
      achievable: true,
    },
    {
      ms: "1s",
      label: isFr ? "Acceptable" : "Acceptable",
      desc: isFr
        ? "Seuil de confort conversationnel. Au-delà, l'utilisateur commence à anticiper l'attente. Cible pour TTFB (premier frame vidéo)."
        : "Conversational comfort threshold. Beyond this, users start anticipating the wait. Target for TTFB (first video frame).",
      color: "oklch(0.75 0.16 75)",
      achievable: true,
    },
    {
      ms: "2s",
      label: isFr ? "Limite naturelle" : "Natural limit",
      desc: isFr
        ? "Seuil de naturalité conversationnelle (Nielsen 1993, validé par les recherches en dialogue humain). Au-delà, la conversation devient une série d'attentes. Cible TTFR GamiWays."
        : "Conversational naturalness threshold (Nielsen 1993, validated by human dialogue research). Beyond this, conversation becomes a series of waits. GamiWays TTFR target.",
      color: "oklch(0.75 0.16 75)",
      achievable: false,
    },
    {
      ms: "6–12s",
      label: isFr ? "Rupture d'engagement" : "Engagement break",
      desc: isFr
        ? "Latence actuelle de GamiWays (HeyGem OS). L'utilisateur perd le fil, l'avatar cesse d'être une présence. Taux d'abandon élevé. C'est le problème à résoudre."
        : "Current GamiWays latency (HeyGem OS). User loses the thread, avatar stops being a presence. High drop-off rate. This is the problem to solve.",
      color: "oklch(0.60 0.20 25)",
      achievable: false,
    },
  ];

  const blocks = [
    {
      color: "oklch(0.65 0.18 145)",
      label: isFr ? "Disponible" : "Available",
      desc: isFr ? "Solutions commerciales ou open-source matures" : "Mature commercial or open-source solutions",
    },
    {
      color: "oklch(0.55 0.20 200)",
      label: "R&D",
      desc: isFr ? "Défi technique central — cœur de la feuille de route Gamilab" : "Core technical challenge — at the heart of Gamilab's roadmap",
    },
    {
      color: "oklch(0.75 0.16 75)",
      label: isFr ? "Interne Memoways" : "Memoways internal",
      desc: isFr ? "Expertise et infrastructure existantes (14 ans)" : "Existing expertise and infrastructure (14 years)",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sub-nav */}
      <div className="bg-white border-b border-slate-100 sticky top-14 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-1 text-xs">
          <InternalLink to="/research" className="text-xs font-mono text-slate-400 hover:text-slate-700 transition-colors">
            {isFr ? "← Défis Techniques" : "← Technical Challenges"}
          </InternalLink>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Architecture Cible" : "Target Architecture"}
          </span>
          <div className="ml-auto">
            <InternalLink to="/voice/pipeline" className="text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors">
              {isFr ? "→ Pipeline Phase 1" : "→ Pipeline Phase 1"}
            </InternalLink>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader
          number="01"
          title={isFr ? "Architecture Cible" : "Target Architecture"}
          subtitle={isFr
            ? "Vue d'ensemble des blocs architecturaux : disponibles (vert), R&D requis (bleu), internes Memoways (jaune). Le budget latence <2s structure tous les choix."
            : "Overview of architectural blocks: available (green), R&D required (blue), Memoways internal (yellow). The <2s latency budget structures all choices."}
          accent="cyan"
        />

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-6">
          {blocks.map((b) => (
            <div key={b.label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white">
              <div className="w-3 h-3 rounded-sm" style={{ background: b.color }} />
              <span className="text-xs font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: b.color }}>{b.label}</span>
              <span className="text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>{b.desc}</span>
            </div>
          ))}
        </div>

        {/* Architecture diagram */}
        <div className="mb-8">
          <DiagramModal title="Target Architecture — Available, R&D Gap, Internal">
            <TargetArchDiagram />
          </DiagramModal>
        </div>

        {/* Latency constraint */}
        <div className="mb-8 p-5 border-l-4 rounded-r-lg bg-white border border-slate-200" style={{ borderLeftColor: "oklch(0.60 0.20 25)" }}>
          <h2 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
            {isFr ? "La contrainte latence <2s structure tout" : "The <2s latency constraint structures everything"}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "La latence n'est pas qu'un problème technique — c'est un problème d'expérience utilisateur. Au-delà de 2 secondes, l'utilisateur perd le fil de sa pensée, l'avatar cesse d'être une présence et devient un outil. L'objectif de GamiWays est de franchir le seuil de naturalité conversationnelle : <2s end-to-end, avec un premier son dans les 500ms."
              : "Latency is not just a technical problem — it is a user experience problem. Beyond 2 seconds, users lose their train of thought, the avatar stops being a presence and becomes a tool. GamiWays's goal is to cross the conversational naturalness threshold: <2s end-to-end, with first sound within 500ms."}
          </p>
        </div>

        {/* Cognitive thresholds table */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Seuils cognitifs de la latence perceptive" : "Cognitive thresholds of perceptive latency"}
          </h3>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{isFr ? "Seuil" : "Threshold"}</th>
                  <th>{isFr ? "Qualification" : "Qualification"}</th>
                  <th>{isFr ? "Impact UX" : "UX Impact"}</th>
                  <th>{isFr ? "Atteignable" : "Achievable"}</th>
                </tr>
              </thead>
              <tbody>
                {cognitiveThresholds.map((th) => (
                  <tr key={th.ms}>
                    <td>
                      <span className="text-sm font-black font-mono" style={{ color: th.color }}>{th.ms}</span>
                    </td>
                    <td>
                      <span className="text-xs font-bold" style={{ color: th.color, fontFamily: "'Space Grotesk', sans-serif" }}>{th.label}</span>
                    </td>
                    <td className="text-xs text-slate-600 max-w-xs" style={{ fontFamily: "'Source Serif 4', serif" }}>{th.desc}</td>
                    <td>
                      {th.achievable
                        ? <span className="text-xs font-bold" style={{ color: "oklch(0.65 0.18 145)" }}>✓ {isFr ? "Oui" : "Yes"}</span>
                        : (th.ms === "<2s" || th.ms === "2s"
                            ? <span className="text-xs font-bold" style={{ color: "oklch(0.75 0.16 75)" }}>{isFr ? "Objectif R&D" : "R&D Goal"}</span>
                            : <span className="text-xs font-bold" style={{ color: "oklch(0.60 0.20 25)" }}>{isFr ? "Problème actuel" : "Current problem"}</span>)
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-3">
          <InternalLink to="/research" className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-4 py-2 transition-all hover:opacity-90" style={{ background: 'oklch(0.55 0.20 200)', fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "← Défis Techniques" : "← Technical Challenges"}
          </InternalLink>
          <InternalLink to="/voice/pipeline" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "Pipeline Phase 1 →" : "Pipeline Phase 1 →"}
          </InternalLink>
          <InternalLink to="/research/gaps" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "Opportunités & Lacunes →" : "Opportunities & Gaps →"}
          </InternalLink>
        </div>
      </div>
    </div>
  );
}
