/*
 * Research — DigiDouble Research Portal
 * Design: schema-first, details in accordion/toggle
 * Focus: Latency as the central UX problem → Memory → Avatar → Orchestration
 * Axes: Axis 1 = Latency & UX fluidity, Axis 2 = Avatar behavior, Axis 3 = Orchestration
 * i18n: EN (default) / FR via LangContext
 *
 * Corrections vs previous version:
 * - Unified "Axis 1" (was split into two separate "Axis 1" sections)
 * - Harmonized latency values: 6–12s everywhere (not 5–10s)
 * - Removed duplicate open questions (avatarResearch.challenge ≠ openQuestionsAvatar)
 * - Recentered on UX impact of latency (not just technical metrics)
 * - Condensed Partnership section
 * - Added UX latency metrics: TTFR, TTFA, TTFB
 */
import { useState } from "react";
import InternalLink from "@/components/InternalLink";
import { ChevronDown, ChevronUp } from "lucide-react";
import MemoryArchDiagram from "@/components/diagrams/MemoryArchDiagram";
import VideoPipelineDiagram from "@/components/diagrams/VideoPipelineDiagram";
import ConversationFlowDiagram from "@/components/diagrams/ConversationFlowDiagram";
import TargetArchDiagram from "@/components/diagrams/TargetArchDiagram";
import OrchestrationDiagram from "@/components/diagrams/OrchestrationDiagram";
import DiagramModal from "@/components/DiagramModal";
import PositioningDiagram from "@/components/diagrams/PositioningDiagram";
import { useLang } from "@/contexts/LangContext";

function SectionDivider({ number, title, titleFr, isFr }: { number: string; title: string; titleFr: string; isFr: boolean }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-xs font-mono text-slate-300 shrink-0">{number}</span>
      <div className="h-px flex-1 bg-slate-200" />
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 shrink-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {isFr ? titleFr : title}
      </span>
      <div className="h-px w-8 bg-slate-200" />
    </div>
  );
}

function Accordion({ label, labelFr, isFr, children }: { label: string; labelFr: string; isFr: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors rounded"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <span>{isFr ? labelFr : label}</span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-slate-100 bg-slate-50">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Research() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  // ── AXIS 1: LATENCY ───────────────────────────────────────────────────────

  const uxMetrics = [
    {
      id: "TTFR",
      name: isFr ? "Time to First Response" : "Time to First Response",
      current: "6–12s",
      target: "<2s",
      impact: isFr
        ? "Au-delà de 2s, l'utilisateur perd le fil de sa pensée. La conversation devient une série d'attentes, pas un échange naturel."
        : "Beyond 2s, users lose their train of thought. The conversation becomes a series of waits, not a natural exchange.",
      color: "oklch(0.60 0.20 25)",
    },
    {
      id: "TTFA",
      name: isFr ? "Time to First Audio" : "Time to First Audio",
      current: "3–6s",
      target: "<500ms",
      impact: isFr
        ? "L'audio doit précéder ou accompagner la vidéo. Un silence prolongé avant la parole brise l'illusion de présence."
        : "Audio must precede or accompany video. Prolonged silence before speech breaks the illusion of presence.",
      color: "oklch(0.75 0.16 75)",
    },
    {
      id: "TTFB",
      name: isFr ? "Time to First Frame" : "Time to First Frame",
      current: "5–10s",
      target: "<1s",
      impact: isFr
        ? "Le premier frame vidéo doit apparaître dans la seconde. Un avatar figé pendant que l'audio joue crée une dissonance cognitive."
        : "The first video frame must appear within a second. A frozen avatar while audio plays creates cognitive dissonance.",
      color: "oklch(0.72 0.18 200)",
    },
  ];

  const cognitiveThresholds = [
    {
      ms: "100ms",
      label: isFr ? "Instantan\u00e9" : "Instantaneous",
      desc: isFr
        ? "Seuil de r\u00e9ponse 'imm\u00e9diate'. L'utilisateur ne per\u00e7oit aucun d\u00e9lai. Cible pour les micro-interactions (clic, hover)."
        : "'Immediate' response threshold. User perceives no delay. Target for micro-interactions (click, hover).",
      color: "oklch(0.65 0.18 145)",
      achievable: true,
    },
    {
      ms: "300ms",
      label: isFr ? "Fluide" : "Fluid",
      desc: isFr
        ? "Seuil de fluidit\u00e9 perceptive. L'utilisateur per\u00e7oit un l\u00e9ger d\u00e9lai mais l'interaction reste naturelle. Cible pour TTS first audio."
        : "Perceptive fluidity threshold. User perceives slight delay but interaction remains natural. Target for TTS first audio.",
      color: "oklch(0.65 0.18 145)",
      achievable: true,
    },
    {
      ms: "1s",
      label: isFr ? "Acceptable" : "Acceptable",
      desc: isFr
        ? "Seuil de confort conversationnel. Au-del\u00e0, l'utilisateur commence \u00e0 anticiper l'attente. Cible pour TTFB (premier frame vid\u00e9o)."
        : "Conversational comfort threshold. Beyond this, users start anticipating the wait. Target for TTFB (first video frame).",
      color: "oklch(0.75 0.16 75)",
      achievable: true,
    },
    {
      ms: "2s",
      label: isFr ? "Limite naturelle" : "Natural limit",
      desc: isFr
        ? "Seuil de naturalit\u00e9 conversationnelle (Nielsen 1993, valid\u00e9 par les recherches en dialogue humain). Au-del\u00e0, la conversation devient une s\u00e9rie d'attentes. Cible TTFR DigiDouble."
        : "Conversational naturalness threshold (Nielsen 1993, validated by human dialogue research). Beyond this, conversation becomes a series of waits. DigiDouble TTFR target.",
      color: "oklch(0.75 0.16 75)",
      achievable: false,
    },
    {
      ms: "6\u201312s",
      label: isFr ? "Rupture d'engagement" : "Engagement break",
      desc: isFr
        ? "Latence actuelle de DigiDouble (HeyGem OS). L'utilisateur perd le fil, l'avatar cesse d'\u00eatre une pr\u00e9sence. Taux d'abandon \u00e9lev\u00e9. C'est le probl\u00e8me \u00e0 r\u00e9soudre."
        : "Current DigiDouble latency (HeyGem OS). User loses the thread, avatar stops being a presence. High drop-off rate. This is the problem to solve.",
      color: "oklch(0.60 0.20 25)",
      achievable: false,
    },
  ];

  const competitorLatencyBenchmark = [
    { name: "Beyond Presence", latency: "<100ms", type: isFr ? "Commercial" : "Commercial", sovereign: false, cost: "Enterprise", note: isFr ? "Infra propri\u00e9taire" : "Proprietary infra" },
    { name: "NVIDIA ACE", latency: "<100ms", type: isFr ? "Commercial" : "Commercial", sovereign: false, cost: "NVIDIA infra", note: isFr ? "Lock-in NVIDIA" : "NVIDIA lock-in" },
    { name: "Simli Trinity-1", latency: "<300ms", type: isFr ? "Commercial" : "Commercial", sovereign: false, cost: "$0.009/min", note: "Gaussian Splatting" },
    { name: "Anam", latency: isFr ? "Bonne" : "Good", type: isFr ? "Commercial" : "Commercial", sovereign: false, cost: "~$0.18/min", note: "WebRTC Pion" },
    { name: "Runway Characters", latency: "<500ms", type: isFr ? "Commercial" : "Commercial", sovereign: false, cost: "$0.20/min", note: "WebRTC GWM-1" },
    { name: "D-ID V4", latency: isFr ? "Am\u00e9lior\u00e9e V4" : "Improved V4", type: isFr ? "Commercial" : "Commercial", sovereign: false, cost: "~$0.35/min", note: "WebRTC Janus" },
    { name: "HeyGen", latency: "2\u20135s", type: isFr ? "Commercial" : "Commercial", sovereign: false, cost: isFr ? "\u00c9lev\u00e9" : "High", note: "Streaming" },
    { name: isFr ? "DigiDouble (actuel)" : "DigiDouble (current)", latency: "6\u201312s", type: isFr ? "Open-source" : "Open-source", sovereign: true, cost: isFr ? "GPU Exoscale" : "Exoscale GPU", note: "HeyGem OS" },
    { name: isFr ? "DigiDouble (cible R&D)" : "DigiDouble (R&D target)", latency: "<2s", type: "R&D", sovereign: true, cost: isFr ? "GPU souverain" : "Sovereign GPU", note: isFr ? "Axe 1 R&D" : "Axis 1 R&D" },
    { name: "SoulX-FlashTalk", latency: "0.87s startup", type: isFr ? "Recherche" : "Research", sovereign: false, cost: "8xH800", note: "14B DiT" },
    { name: "AvatarForcing", latency: isFr ? "Temps r\u00e9el" : "Real-time", type: isFr ? "Recherche" : "Research", sovereign: false, cost: isFr ? "GPU recherche" : "Research GPU", note: "1-step diffusion" },
  ];

  const personalizationMetrics = [
    {
      id: "PM1",
      name: isFr ? "Coh\u00e9rence prosodique" : "Prosodic coherence",
      desc: isFr
        ? "La voix g\u00e9n\u00e9r\u00e9e correspond-elle \u00e0 l'empreinte prosodique individuelle (rythme, emphase, pauses) ? M\u00e9trique : MOS + DTW sur patterns de pauses."
        : "Does the generated voice match the individual prosodic fingerprint (rhythm, emphasis, pauses)? Metric: MOS + DTW on pause patterns.",
      color: "oklch(0.72 0.18 200)",
    },
    {
      id: "PM2",
      name: isFr ? "Fid\u00e9lit\u00e9 comportementale" : "Behavioral fidelity",
      desc: isFr
        ? "Les micro-expressions et gestes correspondent-ils au r\u00e9pertoire comportemental extrait ? M\u00e9trique : FID (Fr\u00e9chet Inception Distance) adapt\u00e9 aux s\u00e9quences faciales."
        : "Do micro-expressions and gestures match the extracted behavioral repertoire? Metric: FID (Fr\u00e9chet Inception Distance) adapted to facial sequences.",
      color: "oklch(0.72 0.18 50)",
    },
    {
      id: "PM3",
      name: isFr ? "Engagement conversationnel" : "Conversational engagement",
      desc: isFr
        ? "L'utilisateur maintient-il l'engagement sur la dur\u00e9e ? M\u00e9triques : dur\u00e9e session, taux de compl\u00e9tion, score de naturalit\u00e9 subjective (Likert 1\u20135)."
        : "Does the user maintain engagement over time? Metrics: session duration, completion rate, subjective naturalness score (Likert 1\u20135).",
      color: "oklch(0.65 0.18 145)",
    },
    {
      id: "PM4",
      name: isFr ? "Pr\u00e9cision m\u00e9morielle" : "Memory accuracy",
      desc: isFr
        ? "L'avatar rappelle-t-il correctement les informations pertinentes des sessions pr\u00e9c\u00e9dentes ? M\u00e9trique : LoCoMo benchmark (Snap Research 2024)."
        : "Does the avatar correctly recall relevant information from previous sessions? Metric: LoCoMo benchmark (Snap Research 2024).",
      color: "oklch(0.60 0.20 25)",
    },
  ];

  const latencyApproaches = [
    {
      label: isFr ? "Streaming LLM → TTS → Avatar en pipeline" : "Streaming LLM → TTS → Avatar pipeline",
      desc: isFr
        ? "Démarrer la génération TTS dès les premiers tokens LLM, démarrer la génération avatar dès les premiers chunks audio. Chaque étape démarre avant que la précédente soit terminée. Gain estimé : −40% latence totale."
        : "Start TTS generation from the first LLM tokens, start avatar generation from the first audio chunks. Each stage starts before the previous one finishes. Estimated gain: −40% total latency.",
      color: "oklch(0.65 0.18 145)",
      hypothesis: "H1",
    },
    {
      label: isFr ? "Distillation du modèle de diffusion" : "Diffusion model distillation",
      desc: isFr
        ? "Réduire le modèle de diffusion (ex. HeyGem OS) via distillation progressive. Cible : 4–8 steps vs 20–50 actuels. Perte qualité acceptable si <5% sur SSIM. Gain estimé : −60% temps de génération vidéo."
        : "Reduce the diffusion model (e.g. HeyGem OS) via progressive distillation. Target: 4–8 steps vs current 20–50. Acceptable quality loss if <5% on SSIM. Estimated gain: −60% video generation time.",
      color: "oklch(0.60 0.20 25)",
      hypothesis: "H1b",
    },
    {
      label: isFr ? "Cache intelligent + pré-rendu prédictif" : "Intelligent cache + predictive pre-rendering",
      desc: isFr
        ? "Pré-rendre les segments vidéo les plus probables (expressions neutres, transitions, écoute active) et les assembler en temps réel. Réduction effective de 70% des frames à générer à la volée."
        : "Pre-render the most probable video segments (neutral expressions, transitions, active listening) and assemble them in real-time. Effective 70% reduction in frames to generate on-the-fly.",
      color: "oklch(0.75 0.16 75)",
      hypothesis: "H1c",
    },
    {
      label: isFr ? "Dégradation gracieuse adaptative" : "Adaptive graceful degradation",
      desc: isFr
        ? "Si la latence dépasse le seuil : vidéo complète → visage seul → avatar stylisé → audio seul. L'utilisateur reçoit toujours une réponse dans les 2s. La qualité s'adapte à la charge GPU disponible."
        : "If latency exceeds threshold: full video → face only → stylized avatar → audio only. User always receives a response within 2s. Quality adapts to available GPU load.",
      color: "oklch(0.72 0.18 200)",
      hypothesis: "H1d",
    },
  ];

  const latencyOpenQuestions = isFr
    ? [
        "Quel est le seuil de latence perceptible par l'utilisateur dans un contexte d'avatar conversationnel ? 200ms ? 500ms ? 1s ?",
        "Comment mesurer objectivement la fluidité conversationnelle (TTFR, TTFA, TTFB) dans un contexte d'avatar vidéo ?",
        "La dégradation gracieuse (audio seul si GPU saturé) est-elle acceptable pour l'utilisateur, ou brise-t-elle l'engagement ?",
        "Peut-on atteindre <2s TTFR avec un pipeline souverain (pas de CDN US) hébergé en Suisse ?",
        "Le streaming LLM→TTS→Avatar peut-il être implémenté sans introduire de désynchronisation audio/vidéo ?",
      ]
    : [
        "What is the perceptible latency threshold for users in a conversational avatar context? 200ms? 500ms? 1s?",
        "How to objectively measure conversational fluidity (TTFR, TTFA, TTFB) in a video avatar context?",
        "Is graceful degradation (audio only if GPU saturated) acceptable to users, or does it break engagement?",
        "Can <2s TTFR be achieved with a sovereign pipeline (no US CDN) hosted in Switzerland?",
        "Can streaming LLM→TTS→Avatar be implemented without introducing audio/video desynchronization?",
      ];

  // ── AXIS 1b: MEMORY ───────────────────────────────────────────────────────

  const memoryLayers = [
    {
      id: "L1",
      name: isFr ? "Mémoire de Travail" : "Working Memory",
      type: isFr ? "Court terme · Session active" : "Short term · Active session",
      color: "oklch(0.60 0.20 25)",
      storage: "LLM Context Window",
      cost: isFr ? "Élevé" : "High",
      latencyImpact: isFr ? "Nul (déjà en contexte)" : "None (already in context)",
      items: isFr
        ? ["Contexte conversation actuel", "Variables spécifiques au nœud", "Tracker des concepts couverts", "Détection état émotionnel", "Oubli sélectif à la sortie du nœud"]
        : ["Current conversation context", "Node-specific variables", "Covered concepts tracker", "Emotional state detection", "Selective forgetting on node exit"],
    },
    {
      id: "L2",
      name: isFr ? "Mémoire Épisodique" : "Episodic Memory",
      type: isFr ? "Moyen terme · Multi-nœuds" : "Medium term · Multi-node",
      color: "oklch(0.75 0.16 75)",
      storage: "Vector DB / RAG",
      cost: isFr ? "Moyen" : "Medium",
      latencyImpact: isFr ? "+50–200ms (retrieval)" : "+50–200ms (retrieval)",
      items: isFr
        ? ["Chemin des nœuds visités", "Score de progression global", "Suivi du niveau d'engagement", "Décisions et branches prises", "Historique conversation résumé"]
        : ["Path of visited nodes", "Global progression score", "Engagement level tracking", "Decisions and branches taken", "Summarized conversation history"],
    },
    {
      id: "L3",
      name: isFr ? "Mémoire Sémantique" : "Semantic Memory",
      type: isFr ? "Long terme · Multi-sessions" : "Long term · Multi-session",
      color: "oklch(0.65 0.18 145)",
      storage: "PostgreSQL + SLM",
      cost: isFr ? "Faible" : "Low",
      latencyImpact: isFr ? "+10–50ms (SQL query)" : "+10–50ms (SQL query)",
      items: isFr
        ? ["Profil d'apprentissage + préférences", "Résumé sessions historiques", "Niveau de connaissance par sujet", "Style d'interaction détecté", "Patterns inter-sessions"]
        : ["Learning profile + preferences", "Historical session summaries", "Knowledge level by topic", "Detected interaction style", "Inter-session patterns"],
    },
  ];

  const memoryOpenQuestions = isFr
    ? [
        "Comment compresser l'historique de conversation tout en préservant les informations critiques (progression pédagogique, contexte émotionnel, engagements factuels) sans ajouter de latence perceptible ?",
        "Que faut-il retenir vs. archiver vs. supprimer aux transitions de nœuds pour minimiser le contexte LLM ?",
        "Mémoire individuelle vs. collective : apprendre des patterns inter-utilisateurs ou garder la mémoire strictement individuelle (vie privée) ?",
        "Quand un utilisateur revient après des jours, comment restaurer juste assez de contexte pour une continuation naturelle sans ralentir le démarrage de session ?",
        "Comment détecter et classifier les styles d'interaction depuis les signaux conversationnels en temps réel ?",
      ]
    : [
        "How to compress conversation history while preserving critical information (pedagogical progression, emotional context, factual commitments) without adding perceptible latency?",
        "What to retain vs. archive vs. discard at node transitions to minimize LLM context?",
        "Individual vs. collective memory: learn from cross-user patterns or keep memory strictly individual (privacy)?",
        "When a user returns after days, how to restore just enough context for natural continuation without slowing session startup?",
        "How to detect and classify interaction styles from conversational signals in real-time?",
      ];

  // ── AXIS 2: AVATAR ────────────────────────────────────────────────────────

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

  // ── PARTNERSHIP ───────────────────────────────────────────────────────────

  const digiDoubleContributions = isFr
    ? [
        "Pipeline ASR souverain (Audiogami) — opérationnel, hébergé en Suisse",
        "Expertise multi-stream — 14 ans de livraison multimédia synchronisée",
        "Deux prototypes validés avec tests utilisateurs réels et retours documentés",
        "Expertise domaine en conception narrative interactive et structuration pédagogique",
        "Infrastructure GPU suisse — partenariat Exoscale pour compute souverain",
      ]
    : [
        "Sovereign ASR pipeline (Audiogami) — operational, Swiss-hosted",
        "Multi-stream expertise — 14 years of synchronized multimedia delivery",
        "Two validated prototypes with real user testing and documented feedback",
        "Domain expertise in interactive narrative design and pedagogical structuring",
        "Swiss GPU infrastructure — Exoscale partnership for sovereign compute",
      ];

  const researchExpectations = isFr
    ? [
        "Recherche fondamentale sur les architectures mémoire pour IA conversationnelle longue durée",
        "Recherche en synthèse vocale pour TTS personnalisé, expressif, temps réel",
        "Frameworks d'évaluation — métriques scientifiques pour authenticité comportementale et engagement",
        "Publications dans les venues pertinentes (Interspeech, SIGDIAL, ACL, CHI, CVPR)",
        "Capacité PhD/postdoc pour avancer ces axes sur la durée du projet",
      ]
    : [
        "Fundamental research on memory architectures for long-duration conversational AI",
        "Research on speech synthesis for personalized, expressive, real-time TTS",
        "Evaluation frameworks — scientific metrics for behavioral authenticity and engagement",
        "Publications in relevant venues (Interspeech, SIGDIAL, ACL, CHI, CVPR)",
        "PhD/postdoc capacity to advance these axes over the project duration",
      ];

  return (
    <div className="min-h-screen pt-16">
      {/* Page header */}
      <div className="border-b border-slate-200 py-10">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">02</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-mono text-slate-400">
              {isFr ? "Défis de Recherche" : "Research Challenges"}
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}>
            {isFr ? "Défis de Recherche Fondamentale" : "Fundamental Research Challenges"}
          </h1>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Trois axes de recherche, tous convergent vers un objectif central : une expérience conversationnelle fluide, personnalisée et proche du temps réel."
              : "Three research axes, all converging toward a central goal: a fluid, personalized, near-real-time conversational experience."}
          </p>
          {/* Axis overview pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { label: isFr ? "Axe 1 — Latence & UX" : "Axis 1 — Latency & UX", color: "oklch(0.60 0.20 25)" },
              { label: isFr ? "Axe 2 — Comportement Avatar" : "Axis 2 — Avatar Behavior", color: "oklch(0.72 0.18 50)" },
              { label: isFr ? "Axe 3 — Orchestration" : "Axis 3 — Orchestration", color: "oklch(0.65 0.18 145)" },
            ].map((ax) => (
              <span key={ax.label} className="text-xs font-mono font-bold px-3 py-1 rounded-full" style={{ background: ax.color + "18", color: ax.color, border: `1px solid ${ax.color}44` }}>
                {ax.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container max-w-4xl py-14 space-y-20">

        {/* ── OVERVIEW: TARGET ARCHITECTURE ────────────────────────────────── */}
        <section>
          <SectionDivider number="01" title="Target Architecture" titleFr="Architecture Cible" isFr={isFr} />
          <p className="text-sm text-slate-500 mb-6 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Architecture cible : blocs disponibles (vert), R&D requis (bleu), interne Memoways (jaune). Le budget latence cible de <2s est la contrainte qui structure tous les choix architecturaux."
              : "Target architecture: available blocks (green), R&D required (blue), Memoways internal (yellow). The <2s target latency budget is the constraint that structures all architectural choices."}
          </p>
          <DiagramModal title="Target Architecture — Available, R&D Gap, Internal">
            <TargetArchDiagram />
          </DiagramModal>
        </section>

        {/* ── SECTION 1: LATENCY & UX ──────────────────────────────────────── */}
        <section>
          <SectionDivider number="02" title="Axis 1 — Latency & UX Fluidity" titleFr="Axe 1 — Latence & Fluidité UX" isFr={isFr} />

          {/* UX framing */}
          <div className="mb-6 p-5 border-l-4 rounded-r-lg" style={{ borderColor: "oklch(0.60 0.20 25)", background: "oklch(0.97 0.02 25)" }}>
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "6–12 secondes brisent l'illusion de présence" : "6–12 seconds break the illusion of presence"}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "La latence n'est pas qu'un problème technique — c'est un problème d'expérience utilisateur. Au-delà de 2 secondes, l'utilisateur perd le fil de sa pensée, l'avatar cesse d'être une présence et devient un outil. L'objectif de DigiDouble est de franchir le seuil de naturalité conversationnelle : <2s end-to-end, avec un premier son dans les 500ms."
                : "Latency is not just a technical problem — it is a user experience problem. Beyond 2 seconds, users lose their train of thought, the avatar stops being a presence and becomes a tool. DigiDouble's goal is to cross the conversational naturalness threshold: <2s end-to-end, with first sound within 500ms."}
            </p>
          </div>

          {/* Cognitive thresholds */}
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Seuils cognitifs de la latence perceptive" : "Cognitive thresholds of perceptive latency"}
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{isFr ? "Seuil" : "Threshold"}</th>
                  <th>{isFr ? "Qualification" : "Qualification"}</th>
                  <th>{isFr ? "Impact UX" : "UX Impact"}</th>
                  <th>{isFr ? "Atteignable (DD)" : "Achievable (DD)"}</th>
                </tr>
              </thead>
              <tbody>
                {cognitiveThresholds.map((t) => (
                  <tr key={t.ms}>
                    <td>
                      <span className="text-sm font-black font-mono" style={{ color: t.color }}>{t.ms}</span>
                    </td>
                    <td>
                      <span className="text-xs font-bold" style={{ color: t.color, fontFamily: "'Space Grotesk', sans-serif" }}>{t.label}</span>
                    </td>
                    <td className="text-xs text-slate-600 max-w-xs" style={{ fontFamily: "'Source Serif 4', serif" }}>{t.desc}</td>
                    <td>
                      {t.achievable
                        ? <span className="text-xs font-bold" style={{ color: "oklch(0.65 0.18 145)" }}>✓ {isFr ? "Oui" : "Yes"}</span>
                        : (t.ms === "<2s" || t.ms === "2s"
                            ? <span className="text-xs font-bold" style={{ color: "oklch(0.75 0.16 75)" }}>{isFr ? "Objectif R&D" : "R&D Goal"}</span>
                            : <span className="text-xs font-bold" style={{ color: "oklch(0.60 0.20 25)" }}>{isFr ? "Problème actuel" : "Current problem"}</span>)
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Competitor latency benchmark */}
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Benchmark latence comparatif (mars 2026)" : "Comparative latency benchmark (March 2026)"}
          </h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? <>Données issues de l'analyse de 11 solutions. Fiches techniques complètes dans l'<InternalLink to="/state-of-art">État de l'Art</InternalLink>.</>
              : <>Data from analysis of 11 solutions. Full technical profiles in <InternalLink to="/state-of-art">State of the Art</InternalLink>.</>
            }
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{isFr ? "Solution" : "Solution"}</th>
                  <th>{isFr ? "Latence" : "Latency"}</th>
                  <th>{isFr ? "Type" : "Type"}</th>
                  <th>{isFr ? "Souverain" : "Sovereign"}</th>
                  <th>{isFr ? "Coût" : "Cost"}</th>
                  <th>{isFr ? "Note" : "Note"}</th>
                </tr>
              </thead>
              <tbody>
                {competitorLatencyBenchmark.map((c) => (
                  <tr key={c.name} style={{
                    background: c.name.includes("DigiDouble") && c.name.includes(isFr ? "cible" : "target")
                      ? "oklch(0.97 0.03 145)"
                      : c.name.includes("DigiDouble") ? "oklch(0.97 0.03 25)" : undefined,
                  }}>
                    <td>
                      <span className="text-sm font-semibold" style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: c.name.includes("DigiDouble") ? "oklch(0.45 0.18 200)" : undefined,
                      }}>{c.name}</span>
                    </td>
                    <td>
                      <span className="text-xs font-bold font-mono" style={{
                        color: (c.latency.includes("100ms") || c.latency.includes("300ms") || c.latency.includes("500ms") || c.latency.includes("<2s") || c.latency.includes("0.87s") || c.latency.includes("réel") || c.latency.includes("Real") || c.latency.includes("Bonne") || c.latency.includes("Good") || c.latency.includes("Amélior") || c.latency.includes("Improved"))
                          ? "oklch(0.65 0.18 145)"
                          : (c.latency.includes("2–5s"))
                          ? "oklch(0.75 0.16 75)"
                          : "oklch(0.60 0.20 25)",
                      }}>{c.latency}</span>
                    </td>
                    <td><span className="text-xs text-slate-500 font-mono">{c.type}</span></td>
                    <td><span style={{ color: c.sovereign ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{c.sovereign ? "✓" : "✗"}</span></td>
                    <td><span className="text-xs font-mono text-slate-600">{c.cost}</span></td>
                    <td><span className="text-xs text-slate-400 font-mono">{c.note}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Positioning diagram */}
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Positionnement concurrentiel : Latence × Souveraineté" : "Competitive positioning: Latency × Sovereignty"}
          </h3>
          <div className="border border-slate-200 rounded-lg p-5 mb-8" style={{ background: "oklch(0.99 0.003 200)" }}>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Le gap DigiDouble est visible : les solutions rapides n'ont pas de souveraineté, les solutions souveraines ne sont pas rapides. L'objectif R&D est de combler ce gap (flèche pointillée)."
                : "The DigiDouble gap is visible: fast solutions have no sovereignty, sovereign solutions are not fast. The R&D goal is to bridge this gap (dashed arrow)."}
            </p>
            <PositioningDiagram />
          </div>

          {/* UX metrics */}
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Métriques UX cibles" : "Target UX metrics"}
          </h3>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {uxMetrics.map((m) => (
              <div key={m.id} className="border border-slate-200 rounded overflow-hidden">
                <div className="px-4 py-3" style={{ borderLeft: `4px solid ${m.color}`, background: `${m.color}0a` }}>
                  <div className="text-xs font-bold font-mono mb-0.5" style={{ color: m.color }}>{m.id}</div>
                  <div className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m.name}</div>
                </div>
                <div className="p-4">
                  <div className="flex gap-4 mb-3">
                    <div>
                      <div className="text-xs text-slate-400 font-mono mb-0.5">{isFr ? "Actuel" : "Current"}</div>
                      <div className="text-lg font-black font-mono" style={{ color: "oklch(0.60 0.20 25)" }}>{m.current}</div>
                    </div>
                    <div className="text-slate-300 self-center">→</div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono mb-0.5">{isFr ? "Cible" : "Target"}</div>
                      <div className="text-lg font-black font-mono" style={{ color: "oklch(0.65 0.18 145)" }}>{m.target}</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{m.impact}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Conversation flow diagram */}
          <div className="mb-4">
            <p className="text-sm text-slate-500 mb-3 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Séquence complète d'un échange conversationnel avec budget latence par composant. Le goulot principal est la génération vidéo avatar (5–8s sur le total 6–12s)."
                : "Complete sequence of a conversational exchange with latency budget per component. The main bottleneck is avatar video generation (5–8s out of the 6–12s total)."}
            </p>
          </div>
          <DiagramModal title="Conversation Flow — Latency Sequence Diagram">
            <ConversationFlowDiagram />
          </DiagramModal>

          {/* Approaches */}
          <Accordion label="4 technical approaches to solve the bottleneck" labelFr="4 approches techniques pour résoudre le goulot" isFr={isFr}>
            <div className="pt-3 space-y-4">
              {latencyApproaches.map((item) => (
                <div key={item.label} className="border-l-2 pl-3" style={{ borderColor: item.color }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: item.color + "18", color: item.color }}>{item.hypothesis}</span>
                    <div className="text-xs font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: item.color }}>{item.label}</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion label="Open research questions — Latency & UX" labelFr="Questions de recherche ouvertes — Latence & UX" isFr={isFr}>
            <div className="pt-3 space-y-2">
              {latencyOpenQuestions.map((q, i) => (
                <div key={i} className="flex gap-3 p-2 rounded">
                  <span className="text-xs font-bold shrink-0 mt-0.5 font-mono" style={{ color: "oklch(0.60 0.20 25)" }}>Q{i + 1}</span>
                  <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{q}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </section>

        {/* ── SECTION 2: MEMORY ────────────────────────────────────────────── */}
        <section>
          <SectionDivider number="03" title="Axis 1b — Conversational Memory & Personalization" titleFr="Axe 1b — Mémoire & Personnalisation" isFr={isFr} />
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Mémoire 3 couches : cohérence sans surcharge contexte" : "3-layer memory: coherence without context overload"}
            </h2>
            <p className="text-sm text-slate-400 font-mono mb-4">Speech & Audio Processing</p>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "La mémoire est un sous-problème de la latence : chaque couche de mémoire doit être accessible sans ajouter de délai perceptible. Mem0 (2025) démontre −90% tokens, +26% précision — mais l'impact sur la latence de génération reste à mesurer dans notre contexte."
                : "Memory is a sub-problem of latency: each memory layer must be accessible without adding perceptible delay. Mem0 (2025) demonstrates −90% tokens, +26% accuracy — but the impact on generation latency remains to be measured in our context."}
            </p>
          </div>

          {/* Memory diagram */}
          <DiagramModal title="Memory Architecture — 3-Layer Model">
            <MemoryArchDiagram />
          </DiagramModal>

          {/* 3-layer cards with latency impact */}
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {memoryLayers.map((layer) => (
              <div key={layer.id} className="border border-slate-200 rounded overflow-hidden">
                <div className="px-4 py-3" style={{ borderLeft: `4px solid ${layer.color}`, background: `${layer.color}0a` }}>
                  <div className="text-xs font-bold mb-0.5 font-mono" style={{ color: layer.color }}>{layer.id}</div>
                  <div className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{layer.name}</div>
                  <div className="text-xs text-slate-400 font-mono">{layer.type}</div>
                </div>
                <div className="p-4">
                  <div className="space-y-1 mb-3">
                    {layer.items.map((item) => (
                      <div key={item} className="flex gap-2">
                        <span className="text-xs mt-0.5" style={{ color: layer.color }}>·</span>
                        <span className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 pt-2 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-400 font-mono">{layer.storage}</span>
                      <span className="text-xs font-mono" style={{
                        color: (layer.cost === "Élevé" || layer.cost === "High") ? "oklch(0.60 0.20 25)"
                          : (layer.cost === "Moyen" || layer.cost === "Medium") ? "oklch(0.75 0.16 75)"
                          : "oklch(0.65 0.18 145)",
                      }}>
                        {isFr ? "Coût" : "Cost"}: {layer.cost}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      <span className="text-slate-500">{isFr ? "Latence ajoutée" : "Added latency"}: </span>
                      {layer.latencyImpact}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Personalization metrics */}
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 mt-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Métriques de personnalisation & évaluation" : "Personalization & evaluation metrics"}
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {personalizationMetrics.map((m) => (
              <div key={m.id} className="border border-slate-200 rounded p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: m.color + "18", color: m.color }}>{m.id}</span>
                  <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m.name}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{m.desc}</p>
              </div>
            ))}
          </div>

          <Accordion label="Open research questions — Memory & Personalization" labelFr="Questions de recherche ouvertes — Mémoire & Personnalisation" isFr={isFr}>
            <div className="pt-3 space-y-2">
              {memoryOpenQuestions.map((q, i) => (
                <div key={i} className="flex gap-3 p-2 rounded">
                  <span className="text-xs font-bold shrink-0 mt-0.5 font-mono" style={{ color: "oklch(0.72 0.18 200)" }}>Q{i + 1}</span>
                  <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{q}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </section>

        {/* ── SECTION 3: AVATAR ────────────────────────────────────────────── */}
        <section>
          <SectionDivider number="04" title="Axis 2 — Avatar Behavior & Expressiveness" titleFr="Axe 2 — Comportement & Expressivité Avatar" isFr={isFr} />
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Deux flux indépendants, une sortie dual-stream" : "Two independent streams, one dual-stream output"}
            </h2>
            <p className="text-sm text-slate-400 font-mono mb-2">Computer Vision & Speech</p>
            <p className="text-sm text-slate-500 leading-relaxed max-w-3xl mb-2" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Le système sépare strictement l'analyse des sources vidéo (Flux A, offline, non-critique) de la construction de l'avatar (Flux B, R&D principal). La vidéo d'entraînement de l'avatar n'est jamais jouée dans l'expérience. Le défi de l'Axe 2 est de rendre le Flux B assez rapide pour respecter le budget latence de l'Axe 1."
                : "The system strictly separates source video analysis (Stream A, offline, non-critical) from avatar construction (Stream B, main R&D). The avatar training video is never played in the experience. Axis 2's challenge is making Stream B fast enough to meet Axis 1's latency budget."}
            </p>
            <div className="flex flex-wrap gap-3 mb-4 text-xs font-mono">
              <span className="px-2 py-1 rounded" style={{ background: "#dcfce7", color: "#15803d" }}>{isFr ? "Flux A : Analyse offline — standard, non-critique" : "Stream A: Offline analysis — standard, non-critical"}</span>
              <span className="px-2 py-1 rounded" style={{ background: "#fee2e2", color: "#dc2626" }}>{isFr ? "Flux B : Construction avatar — enjeu R&D principal (Axe 2b)" : "Stream B: Avatar construction — main R&D challenge (Axis 2b)"}</span>
              <span className="px-2 py-1 rounded" style={{ background: "#eff6ff", color: "#0891b2" }}>{isFr ? "Sortie : Dual-stream synchronisé — expertise interne" : "Output: Synchronized dual-stream — internal expertise"}</span>
            </div>
          </div>

          {/* Video Pipeline diagram */}
          <DiagramModal title="Video Pipeline — Dual Stream (Analysis & Avatar)">
            <VideoPipelineDiagram />
          </DiagramModal>

          {/* Sub-axes */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {avatarResearch.map((sub) => (
              <div key={sub.id} className="border border-slate-200 rounded p-4">
                <div className="text-xs font-bold mb-1 font-mono" style={{ color: "oklch(0.72 0.18 50)" }}>AXE 2{sub.id.toUpperCase()}</div>
                <h4 className="font-semibold text-slate-900 mb-2 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{sub.title}</h4>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{sub.desc}</p>
                <div className="border-t border-slate-100 pt-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? "Question clé :" : "Key question:"}
                  </span>
                  <p className="text-xs text-slate-500 mt-1 italic" style={{ fontFamily: "'Source Serif 4', serif" }}>{sub.challenge}</p>
                </div>
              </div>
            ))}
          </div>

          <Accordion label="Open research questions — Avatar behavior" labelFr="Questions de recherche ouvertes — Comportement avatar" isFr={isFr}>
            <div className="pt-3 space-y-2">
              {avatarOpenQuestions.map((q, i) => (
                <div key={i} className="flex gap-3 p-2 rounded">
                  <span className="text-xs font-bold shrink-0 mt-0.5 font-mono" style={{ color: "oklch(0.72 0.18 50)" }}>Q{i + 1}</span>
                  <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{q}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </section>

        {/* ── SECTION 4: ORCHESTRATION ──────────────────────────────────────── */}
        <section>
          <SectionDivider number="05" title="Axis 3 — Orchestration Freedom Degree" titleFr="Axe 3 — Degré de Liberté d'Orchestration" isFr={isFr} />
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Déterministe vs organique : le trilemme de l'orchestration" : "Deterministic vs organic: the orchestration trilemma"}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl mb-4" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Chaque nœud de conversation peut définir son propre degré de liberté (0% = scripté, 90%+ = IA libre). Le défi R&D : garantir la couverture du contenu obligatoire tout en maintenant la naturalité conversationnelle — et sans ajouter de latence due à la décision d'orchestration."
                : "Each conversation node can define its own freedom degree (0% = scripted, 90%+ = free AI). The R&D challenge: guarantee mandatory content coverage while maintaining conversational naturalness — and without adding latency from the orchestration decision."}
            </p>
          </div>
          <DiagramModal title="Orchestration Freedom Degree — 0% to 90%+">
            <OrchestrationDiagram />
          </DiagramModal>
        </section>

        {/* ── SECTION 5: PARTNERSHIP ──────────────────────────────────────── */}
        <section>
          <SectionDivider number="06" title="Research Collaboration — Mutual Contributions" titleFr="Collaboration de Recherche — Apports Mutuels" isFr={isFr} />
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "DigiDouble apporte" : "DigiDouble brings"}
              </h3>
              <div className="space-y-2">
                {digiDoubleContributions.map((item) => (
                  <div key={item} className="flex gap-2 p-2 border-l-2 border-slate-300 pl-3">
                    <span className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "DigiDouble recherche" : "DigiDouble seeks"}
              </h3>
              <div className="space-y-2">
                {researchExpectations.map((item) => (
                  <div key={item} className="flex gap-2 p-2 border-l-2 pl-3" style={{ borderColor: "oklch(0.72 0.18 200)" }}>
                    <span className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
