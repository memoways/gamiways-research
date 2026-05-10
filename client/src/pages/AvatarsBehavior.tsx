/**
 * AvatarsBehavior.tsx — GamiWays Research Portal
 * Page: Axis 2 — Avatar Behavior & Expressiveness (extracted from Research section 04)
 * Context: GamiWays R&D — part of the "GamiWays" menu
 * Design: Technical Blueprint
 * i18n: EN / FR via LangContext
 */
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import SectionHeader from "@/components/SectionHeader";
import DiagramModal from "@/components/DiagramModal";
import VideoPipelineDiagram from "@/components/diagrams/VideoPipelineDiagram";
import { ChevronDown, ChevronUp, Home, ChevronRight } from "lucide-react";

function Accordion({ label, labelFr, isFr, children }: { label: string; labelFr: string; isFr: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded mt-4">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors rounded" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <span>{isFr ? labelFr : label}</span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && <div className="px-4 pb-4 border-t border-slate-100 bg-slate-50">{children}</div>}
    </div>
  );
}

export default function AvatarsBehavior() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const avatarResearch = [
    {
      id: "2a",
      title: isFr ? "Extraction Comportementale depuis Archives" : "Behavioral Extraction from Archives",
      desc: isFr
        ? "Extraire des patterns comportementaux individuels depuis des vidéos existantes — sans nouvelles sessions de capture. Identifier : répertoire de micro-expressions, vocabulaire gestuel, relations temporelles geste-parole, habitudes posturales."
        : "Extract individual behavioral patterns from existing videos — without new capture sessions. Identify: micro-expression repertoire, gestural vocabulary, gesture-speech temporal relationships, postural habits.",
      challenge: isFr
        ? "Peut-on extraire automatiquement le vocabulaire gestuel d'un individu depuis des images non contrôlées ?"
        : "Can we automatically extract an individual's gestural vocabulary from uncontrolled footage?",
    },
    {
      id: "2b",
      title: isFr ? "Génération de Langage Corporel Cohérent" : "Coherent Body Language Generation",
      desc: isFr
        ? "Aller au-delà du lip-sync. Générer un comportement corporel coordonné : synchronisé avec le contenu de la parole et le ton émotionnel, culturellement approprié, cohérent avec la personnalité définie."
        : "Go beyond lip-sync. Generate coordinated body behavior: synchronized with speech content and emotional tone, culturally appropriate, consistent with the defined personality.",
      challenge: isFr
        ? "La plupart des systèmes actuels se concentrent sur le visage uniquement. Le corps est absent ou issu d'une bibliothèque de templates."
        : "Most current systems focus on the face only. The body is absent or from a template library.",
    },
    {
      id: "2c",
      title: isFr ? "TTS Expressif Personnalisé" : "Personalized Expressive TTS",
      desc: isFr
        ? "Générer une parole capturant non seulement le timbre vocal mais l'empreinte prosodique : rythme, patterns d'emphase, distribution des pauses, modulation émotionnelle. La voix doit correspondre à l'état émotionnel de l'avatar."
        : "Generate speech capturing not only vocal timbre but the prosodic fingerprint: rhythm, emphasis patterns, pause distribution, emotional modulation. The voice must match the avatar's emotional state.",
      challenge: isFr
        ? "Quelle quantité d'audio source est nécessaire pour capturer l'individualité prosodique ? Minutes ou heures ?"
        : "How much source audio is needed to capture prosodic individuality? Minutes or hours?",
    },
    {
      id: "2d",
      title: isFr ? "Optimisation Coût / Qualité / Latence" : "Cost / Quality / Latency Optimization",
      desc: isFr
        ? "Approches : base pré-rendue + lip-sync temps réel, distillation de modèle, cache intelligent, dégradation gracieuse. L'objectif est un avatar personnalisé acceptable à <500ms sur hardware accessible."
        : "Approaches: pre-rendered base + real-time lip-sync, model distillation, intelligent cache, graceful degradation. The goal is an acceptable personalized avatar at <500ms on accessible hardware.",
      challenge: isFr
        ? "Quel est le compute minimal pour une génération d'avatar personnalisé acceptable à <500ms ?"
        : "What is the minimum compute for acceptable personalized avatar generation at <500ms?",
    },
  ];

  const avatarOpenQuestions = isFr
    ? [
        "Comment assurer que le langage corporel, les expressions faciales et la prosodie racontent la même histoire émotionnelle simultanément ?",
        "Quel est le compute minimal pour une génération d'avatar personnalisé acceptable à <500ms ?",
        "Comment mesurer objectivement l'authenticité comportementale au-delà de la similarité visuelle ?",
        "Peut-on exploiter la quantification, le pruning ou la distillation pour rendre la génération temps réel faisable sur GPU accessible (A10G) ?",
        "La synchronisation audio/vidéo peut-elle être maintenue sous contrainte de latence variable du réseau ?",
      ]
    : [
        "How to ensure body language, facial expressions, and prosody tell the same emotional story simultaneously?",
        "What is the minimum compute for acceptable personalized avatar generation at <500ms?",
        "How to objectively measure behavioral authenticity beyond visual similarity?",
        "Can quantization, pruning, or distillation make real-time generation feasible on accessible GPU (A10G)?",
        "Can audio/video synchronization be maintained under variable network latency constraints?",
      ];

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader
          number="04"
          title={isFr ? "Axe 2 — Comportement & Expressivité Avatar" : "Axis 2 — Avatar Behavior & Expressiveness"}
          subtitle={isFr
            ? "Aller au-delà du lip-sync : extraction comportementale, langage corporel cohérent, TTS expressif et optimisation latence."
            : "Going beyond lip-sync: behavioral extraction, coherent body language, expressive TTS, and latency optimization."}
          accent="orange"
        />

        {/* Architecture note */}
        <div className="mb-6 p-4 border border-slate-200 rounded-lg bg-white">
          <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? <>Le système sépare strictement l'analyse des sources vidéo (<strong>Flux A</strong>, offline, non-critique) de la construction de l'avatar (<strong>Flux B</strong>, R&D principal). La vidéo d'entraînement de l'avatar n'est jamais jouée dans l'expérience. Le défi de l'Axe 2 est de rendre le Flux B assez rapide pour respecter le budget latence de l'Axe 1.</>
              : <>The system strictly separates video source analysis (<strong>Stream A</strong>, offline, non-critical) from avatar construction (<strong>Stream B</strong>, main R&D). Avatar training video is never played in the experience. The Axis 2 challenge is making Stream B fast enough to meet the Axis 1 latency budget.</>
            }
          </p>
          <div className="mt-3 flex gap-2 flex-wrap text-xs font-mono">
            <span className="px-2 py-1 rounded" style={{ background: "#dcfce7", color: "#16a34a" }}>
              {isFr ? "Flux A : Analyse vidéo — offline, non-critique" : "Stream A: Video analysis — offline, non-critical"}
            </span>
            <span className="px-2 py-1 rounded" style={{ background: "#fee2e2", color: "#dc2626" }}>
              {isFr ? "Flux B : Construction avatar — enjeu R&D principal (Axe 2b)" : "Stream B: Avatar construction — main R&D challenge (Axis 2b)"}
            </span>
          </div>
        </div>

        {/* Diagram */}
        <div className="mb-6">
          <DiagramModal title="Video Pipeline — Dual Stream (Analysis & Avatar)">
            <VideoPipelineDiagram />
          </DiagramModal>
        </div>

        {/* Sub-axes */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {avatarResearch.map((sub) => (
            <div key={sub.id} className="border border-slate-200 rounded p-4 bg-white">
              <div className="text-xs font-bold mb-1 font-mono" style={{ color: "oklch(0.72 0.18 50)" }}>
                AXE 2{sub.id.toUpperCase()}
              </div>
              <h4 className="font-semibold text-slate-900 mb-2 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {sub.title}
              </h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {sub.desc}
              </p>
              <div className="border-t border-slate-100 pt-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Question clé :" : "Key question:"}
                </span>
                <p className="text-xs text-slate-500 mt-1 italic" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {sub.challenge}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Open questions */}
        <Accordion label="Open research questions — Avatar behavior" labelFr="Questions de recherche ouvertes — Comportement avatar" isFr={isFr}>
          <div className="pt-3 space-y-2">
            {avatarOpenQuestions.map((q, i) => (
              <div key={i} className="flex gap-3 p-2 rounded">
                <span className="text-xs font-bold shrink-0 mt-0.5 font-mono" style={{ color: "oklch(0.72 0.18 50)" }}>
                  Q{i + 1}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {q}
                </p>
              </div>
            ))}
          </div>
        </Accordion>

        {/* Navigation */}
        <div className="mt-8 flex flex-wrap gap-3">
          <InternalLink to="/research" className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-4 py-2 transition-all hover:opacity-90" style={{ background: 'oklch(0.55 0.20 200)', fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "← Research Challenges" : "← Research Challenges"}
          </InternalLink>
          <InternalLink to="/research/emotional" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "Boîte à Outils Émotionnelle →" : "Emotional Toolbox →"}
          </InternalLink>
          <InternalLink to="/avatars" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "Avatars Vidéo Streaming →" : "Streaming Video Avatars →"}
          </InternalLink>
        </div>
      </div>
    </div>
  );
}
