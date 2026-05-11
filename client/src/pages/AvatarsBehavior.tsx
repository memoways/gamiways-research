/**
 * AvatarsBehavior.tsx — GamiWays Research Portal
 * Page: Avatar Behavior & Emotional Design
 * Fusion de : Avatar Behavior & Expressiveness + Emotional Toolbox & Character Design
 * Objectif : structurer les enjeux pour une expérience temps réel vivante, organique, crédible
 * Design: Technical Blueprint
 * i18n: EN / FR via LangContext
 */
import { useState, useMemo } from "react";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import SectionHeader from "@/components/SectionHeader";
import DiagramModal from "@/components/DiagramModal";
import VideoPipelineDiagram from "@/components/diagrams/VideoPipelineDiagram";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

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

type SortDir = "asc" | "desc";
type EmotKey = "name" | "configurable" | "creator" | "realtime";

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ChevronsUpDown className="w-3 h-3 opacity-40" />;
  return dir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
}

export default function AvatarsBehavior() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";
  const [sort, setSort] = useState<{ key: EmotKey; dir: SortDir }>({ key: "name", dir: "asc" });

  // --- 4 dimensions de l'expérience vivante ---
  const behaviorDimensions = [
    {
      title: isFr ? "Extraction comportementale depuis archives" : "Behavioral extraction from archives",
      desc: isFr
        ? "Extraire des patterns comportementaux individuels depuis des vidéos existantes — sans nouvelles sessions de capture. Identifier le répertoire de micro-expressions, le vocabulaire gestuel, les relations temporelles geste-parole, les habitudes posturales."
        : "Extract individual behavioral patterns from existing videos — without new capture sessions. Identify micro-expression repertoire, gestural vocabulary, gesture-speech temporal relationships, and postural habits.",
      question: isFr
        ? "Peut-on extraire automatiquement le vocabulaire gestuel d'un individu depuis des images non contrôlées ?"
        : "Can we automatically extract an individual's gestural vocabulary from uncontrolled footage?",
      accent: "oklch(0.72 0.18 50)",
    },
    {
      title: isFr ? "Langage corporel cohérent et coordonné" : "Coherent and coordinated body language",
      desc: isFr
        ? "Aller au-delà du lip-sync. Générer un comportement corporel coordonné : synchronisé avec le contenu de la parole et le ton émotionnel, culturellement approprié, cohérent avec la personnalité définie. La plupart des systèmes actuels se concentrent sur le visage uniquement — le corps est absent ou issu d'une bibliothèque de templates."
        : "Go beyond lip-sync. Generate coordinated body behavior: synchronized with speech content and emotional tone, culturally appropriate, consistent with the defined personality. Most current systems focus on the face only — the body is absent or from a template library.",
      question: isFr
        ? "Comment assurer que le langage corporel, les expressions faciales et la prosodie racontent la même histoire émotionnelle simultanément ?"
        : "How to ensure body language, facial expressions, and prosody tell the same emotional story simultaneously?",
      accent: "oklch(0.65 0.18 145)",
    },
    {
      title: isFr ? "Voix expressive et empreinte prosodique" : "Expressive voice and prosodic fingerprint",
      desc: isFr
        ? "Générer une parole capturant non seulement le timbre vocal mais l'empreinte prosodique : rythme, patterns d'emphase, distribution des pauses, modulation émotionnelle. La voix doit correspondre à l'état émotionnel de l'avatar à chaque instant."
        : "Generate speech capturing not only vocal timbre but the prosodic fingerprint: rhythm, emphasis patterns, pause distribution, emotional modulation. The voice must match the avatar's emotional state at every moment.",
      question: isFr
        ? "Quelle quantité d'audio source est nécessaire pour capturer l'individualité prosodique ? Minutes ou heures ?"
        : "How much source audio is needed to capture prosodic individuality? Minutes or hours?",
      accent: "oklch(0.60 0.20 25)",
    },
    {
      title: isFr ? "Performance temps réel sous contrainte de latence" : "Real-time performance under latency constraints",
      desc: isFr
        ? "Approches : base pré-rendue + lip-sync temps réel, distillation de modèle, cache intelligent, dégradation gracieuse. L'objectif est un avatar personnalisé acceptable à moins de 500ms sur hardware accessible — quantification, pruning et distillation sont les leviers principaux."
        : "Approaches: pre-rendered base + real-time lip-sync, model distillation, intelligent cache, graceful degradation. The goal is an acceptable personalized avatar at under 500ms on accessible hardware — quantization, pruning, and distillation are the main levers.",
      question: isFr
        ? "Peut-on exploiter la quantification, le pruning ou la distillation pour rendre la génération temps réel faisable sur GPU accessible (A10G) ?"
        : "Can quantization, pruning, or distillation make real-time generation feasible on accessible GPU (A10G)?",
      accent: "oklch(0.55 0.20 200)",
    },
  ];

  // --- 3 piliers de la couche émotionnelle ---
  const emotionalPillars = [
    {
      title: isFr ? "Répertoire émotionnel" : "Emotional repertoire",
      desc: isFr
        ? "Définir un ensemble d'états émotionnels discrets et continus pour chaque personnage. Chaque état encode : expression faciale, prosodie vocale, cadence, posture, micro-comportements. Le répertoire est la fondation de toute cohérence émotionnelle dans la durée."
        : "Define a set of discrete and continuous emotional states per character. Each state encodes: facial expression, vocal prosody, cadence, posture, micro-behaviors. The repertoire is the foundation of all emotional coherence over time.",
      accent: "oklch(0.72 0.18 50)",
    },
    {
      title: isFr ? "Transitions fluides et cohérence dans la durée" : "Smooth transitions and long-term coherence",
      desc: isFr
        ? "Les transitions entre états émotionnels doivent être fluides, cohérentes avec la personnalité, et ne pas créer de ruptures perceptibles. Le défi est d'éviter l'effet 'uncanny valley émotionnel' — quand l'avatar change d'état de façon abrupte ou incohérente avec son histoire."
        : "Transitions between emotional states must be smooth, personality-consistent, and not create perceptible breaks. The challenge is avoiding the 'emotional uncanny valley' — when the avatar shifts state abruptly or inconsistently with its history.",
      accent: "oklch(0.65 0.18 145)",
    },
    {
      title: isFr ? "Activation contextuelle en temps réel" : "Real-time contextual activation",
      desc: isFr
        ? "L'état émotionnel est activé par le contenu de la conversation, l'historique de l'interaction et les signaux de l'utilisateur (ton, rythme, contenu). Cela nécessite une détection temps réel des signaux émotionnels entrants — sans introduire de latence perceptible."
        : "Emotional state is activated by conversation content, interaction history, and user signals (tone, rhythm, content). This requires real-time detection of incoming emotional signals — without introducing perceptible latency.",
      accent: "oklch(0.60 0.20 25)",
    },
  ];

  // --- Questions ouvertes ---
  const openQuestions = isFr
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

  // --- Données tableau concurrentiel ---
  const competitorRows = useMemo(() => [
    { name: "Tavus (Raven-1)", configurable: isFr ? "✓ Partiel" : "✓ Partial", creator: isFr ? "✗ Implicite" : "✗ Implicit", realtime: "✓", note: isFr ? "Perception émotionnelle entrante (Raven-1), pas de toolbox créateur" : "Incoming emotional perception (Raven-1), no creator toolbox" },
    { name: "LemonSlice (LS-2.1)", configurable: isFr ? "✓ Partiel" : "✓ Partial", creator: "✓ API", realtime: "✓", note: isFr ? "Emotion API + Action API, mais pas de design de répertoire" : "Emotion API + Action API, but no repertoire design" },
    { name: "Anam", configurable: isFr ? "✓ Partiel" : "✓ Partial", creator: isFr ? "✗ Implicite" : "✗ Implicit", realtime: "✓", note: isFr ? "Intelligence émotionnelle intégrée, non configurable" : "Built-in emotional intelligence, not configurable" },
    { name: "HeyGen, Simli, D-ID", configurable: "✗", creator: "✗", realtime: "✓", note: isFr ? "Lip-sync uniquement, pas de couche émotionnelle" : "Lip-sync only, no emotional layer" },
    { name: isFr ? "Système cible (hypothèse)" : "Target system (hypothesis)", configurable: isFr ? "✓ Complet" : "✓ Full", creator: "✓ Toolbox", realtime: "✓", note: isFr ? "Répertoire + transitions + activation contextuelle + direction acteur — à valider" : "Repertoire + transitions + contextual activation + actor direction — to be validated" },
  ].sort((a, b) => {
    const d = sort.dir === "asc" ? 1 : -1;
    const av = (a as Record<string, string>)[sort.key] ?? "";
    const bv = (b as Record<string, string>)[sort.key] ?? "";
    return d * String(av).localeCompare(String(bv));
  }), [sort, isFr]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        <SectionHeader
          title={isFr ? "Comportement Avatar & Design Émotionnel" : "Avatar Behavior & Emotional Design"}
          subtitle={isFr
            ? "Structurer les enjeux pour une expérience temps réel vivante, organique, crédible — qui tient dans la durée."
            : "Structuring the challenges for a real-time experience that feels alive, organic, and credible — and holds up over time."}
          accent="orange"
        />

        {/* Enjeu central */}
        <div className="mb-6 p-4 border border-slate-200 rounded-lg bg-white">
          <p className="text-sm text-slate-700 font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Deux flux, un seul enjeu" : "Two streams, one challenge"}
          </p>
          <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? <>Le système sépare strictement l'analyse des sources vidéo (<strong>Flux A</strong>, offline, non-critique) de la construction de l'avatar (<strong>Flux B</strong>, enjeu principal). La vidéo d'entraînement n'est jamais jouée dans l'expérience. Le défi est de rendre le Flux B assez rapide pour respecter le budget latence de l'expérience temps réel, tout en maintenant une cohérence comportementale et émotionnelle sur toute la durée de l'interaction.</>
              : <>The system strictly separates video source analysis (<strong>Stream A</strong>, offline, non-critical) from avatar construction (<strong>Stream B</strong>, main challenge). Avatar training video is never played in the experience. The challenge is making Stream B fast enough to meet the real-time latency budget, while maintaining behavioral and emotional coherence throughout the entire interaction.</>
            }
          </p>
          <div className="mt-3 flex gap-2 flex-wrap text-xs font-mono">
            <span className="px-2 py-1 rounded" style={{ background: "#dcfce7", color: "#16a34a" }}>
              {isFr ? "Flux A : Analyse vidéo — offline, non-critique" : "Stream A: Video analysis — offline, non-critical"}
            </span>
            <span className="px-2 py-1 rounded" style={{ background: "#fee2e2", color: "#dc2626" }}>
              {isFr ? "Flux B : Construction avatar — enjeu principal temps réel" : "Stream B: Avatar construction — main real-time challenge"}
            </span>
          </div>
        </div>

        {/* Diagramme */}
        <div className="mb-8">
          <DiagramModal title={isFr ? "Pipeline Vidéo — Double Flux (Analyse & Avatar)" : "Video Pipeline — Dual Stream (Analysis & Avatar)"}>
            <VideoPipelineDiagram />
          </DiagramModal>
        </div>

        {/* Section 1 : 4 dimensions de l'expérience vivante */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-700 mb-1 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Les quatre dimensions de l'expérience vivante" : "The four dimensions of a living experience"}
          </h3>
          <p className="text-xs text-slate-500 mb-4" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Pour qu'un avatar soit perçu comme vivant et crédible, quatre dimensions doivent être adressées simultanément — et non séquentiellement."
              : "For an avatar to be perceived as alive and credible, four dimensions must be addressed simultaneously — not sequentially."}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {behaviorDimensions.map((dim, i) => (
              <div key={i} className="border border-slate-200 rounded p-4 bg-white">
                <h4 className="font-semibold text-slate-900 mb-2 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {dim.title}
                </h4>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {dim.desc}
                </p>
                <div className="border-t border-slate-100 pt-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? "Question clé :" : "Key question:"}
                  </span>
                  <p className="text-xs text-slate-500 mt-1 italic" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {dim.question}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2 : Couche émotionnelle */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-700 mb-1 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "La couche émotionnelle : ce qui fait tenir l'expérience dans la durée" : "The emotional layer: what makes the experience hold up over time"}
          </h3>
          <p className="text-xs text-slate-500 mb-4" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Un avatar conversationnel ne se réduit pas à un visage qui parle. La fidélité comportementale exige une couche de conception émotionnelle explicite : définir, encoder et activer un répertoire d'états cohérents avec la personnalité du personnage, son histoire et le contexte de l'interaction."
              : "A conversational avatar is not just a talking face. Behavioral fidelity requires an explicit emotional design layer: defining, encoding, and activating a repertoire of states consistent with the character's personality, history, and interaction context."}
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {emotionalPillars.map((pillar, i) => (
              <div key={i} className="border border-slate-200 rounded p-4 bg-white">
                <div className="w-2 h-2 rounded-full mb-3" style={{ background: pillar.accent }} />
                <h4 className="font-semibold text-slate-900 mb-2 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {pillar.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Différenciateur clé */}
        <div className="border-l-4 pl-4 py-3 bg-white rounded-r-lg border border-slate-200 mb-8" style={{ borderLeftColor: "oklch(0.72 0.18 50)" }}>
          <p className="text-xs font-semibold text-slate-700 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Différenciateur clé" : "Key differentiator"}
          </p>
          <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Aucune plateforme commerciale actuelle ne propose un système de conception émotionnelle explicite et configurable par le créateur. La plupart laissent le LLM décider implicitement de l'état émotionnel, sans contrôle ni cohérence garantie. La question est de déterminer si une boîte à outils émotionnelle inspirée des méthodes de direction d'acteurs est techniquement réalisable, et à quel coût de conception et d'implémentation."
              : "No current commercial platform offers an explicit, creator-configurable emotional design system. Most leave the LLM to implicitly decide emotional state, without guaranteed control or coherence. The question is whether an emotional toolbox inspired by actor direction methods is technically feasible, and at what design and implementation cost."}
          </p>
        </div>

        {/* Tableau concurrentiel */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Paysage concurrentiel — Emotional AI" : "Competitive landscape — Emotional AI"}
          </h3>
          <div className="overflow-x-auto">
            <p className="text-xs text-slate-400 mb-2 font-mono">{isFr ? "Cliquez sur un en-tête pour trier" : "Click a header to sort"}</p>
            <table className="data-table">
              <thead>
                <tr>
                  {([
                    { key: "name" as EmotKey, label: isFr ? "Plateforme" : "Platform" },
                    { key: "configurable" as EmotKey, label: isFr ? "Émotions configurables" : "Configurable emotions" },
                    { key: "creator" as EmotKey, label: isFr ? "Contrôle créateur" : "Creator control" },
                    { key: "realtime" as EmotKey, label: isFr ? "Temps réel" : "Real-time" },
                  ] as const).map(({ key, label }) => (
                    <th key={key} className="cursor-pointer select-none" onClick={() => setSort(prev => prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" })}>
                      <span className="inline-flex items-center gap-1">{label}<SortIcon active={sort.key === key} dir={sort.dir} /></span>
                    </th>
                  ))}
                  <th>{isFr ? "Note" : "Note"}</th>
                </tr>
              </thead>
              <tbody>
                {competitorRows.map((row) => (
                  <tr key={row.name}>
                    <td className="font-semibold text-sm text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{row.name}</td>
                    <td className="text-xs text-slate-600">{row.configurable}</td>
                    <td className="text-xs text-slate-600">{row.creator}</td>
                    <td className="text-xs text-slate-600">{row.realtime}</td>
                    <td className="text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Questions ouvertes */}
        <Accordion label="Open questions — Behavior & emotional design" labelFr="Questions ouvertes — Comportement & design émotionnel" isFr={isFr}>
          <div className="pt-3 space-y-2">
            {openQuestions.map((q, i) => (
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
            {isFr ? "← Défis Techniques" : "← Technical Challenges"}
          </InternalLink>
          <InternalLink to="/avatars" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "Comparatif Plateformes Avatars →" : "Avatar Platforms Comparison →"}
          </InternalLink>
        </div>

      </div>
    </div>
  );
}
