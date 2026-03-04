/*
 * Research — DigiDouble Research Portal
 * Page: Research Challenges for IDIAP
 * Design: Technical Blueprint, numbered sections, flow diagrams
 * i18n: EN (default) / FR via LangContext
 */
import SectionHeader from "@/components/SectionHeader";
import PipelineDiagram from "@/components/diagrams/PipelineDiagram";
import MemoryArchDiagram from "@/components/diagrams/MemoryArchDiagram";
import AvatarBehaviorDiagram from "@/components/diagrams/AvatarBehaviorDiagram";
import ConversationFlowDiagram from "@/components/diagrams/ConversationFlowDiagram";
import { useLang } from "@/contexts/LangContext";

const latencyPipeline = [
  { stage: "ASR+STT", current: "2–5s", target: "300ms", currentPct: 18, targetPct: 15 },
  { stage: "Routing", current: "1–2s", target: "200ms", currentPct: 10, targetPct: 10 },
  { stage: "LLM", current: "3–8s", target: "500ms", currentPct: 28, targetPct: 25 },
  { stage: "TTS", current: "2–4s", target: "200ms", currentPct: 16, targetPct: 10 },
  { stage: "Avatar", current: "5–15s", target: "500ms", currentPct: 42, targetPct: 25 },
  { stage: "Network", current: "2–5s", target: "300ms", currentPct: 16, targetPct: 15 },
];

export default function Research() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const memoryHypotheses = [
    {
      id: "H1",
      title: isFr ? "RAG Dynamique seul" : "Dynamic RAG only",
      pros: isFr ? "Flexible, économique pour la récupération" : "Flexible, cost-effective for retrieval",
      cons: isFr ? "Peut manquer un contexte non sémantiquement proche. Pas de personnalité 'intégrée'." : "May miss non-semantically close context. No 'integrated' personality.",
      complexity: isFr ? "Faible" : "Low",
      cost: isFr ? "Faible" : "Low",
    },
    {
      id: "H2",
      title: "LoRA/adapters + RAG",
      pros: isFr ? "Personnalité stable à faible coût d'inférence. Mémoire dynamique reste flexible." : "Stable personality at low inference cost. Dynamic memory remains flexible.",
      cons: isFr ? "Nécessite un pipeline d'entraînement. Mises à jour de personnalité = réentraînement." : "Requires a training pipeline. Personality updates = retraining.",
      complexity: isFr ? "Moyenne" : "Medium",
      cost: isFr ? "Moyen" : "Medium",
    },
    {
      id: "H3",
      title: isFr ? "SLM distillé par avatar + RAG" : "Avatar-distilled SLM + RAG",
      pros: isFr ? "Coût d'inférence minimal. Personnalité la plus cohérente. Réponse la plus rapide." : "Minimal inference cost. Most coherent personality. Fastest response.",
      cons: isFr ? "Coût d'entraînement initial élevé. Moins flexible pour itération rapide." : "High initial training cost. Less flexible for rapid iteration.",
      complexity: isFr ? "Élevée" : "High",
      cost: isFr ? "Élevé initial" : "High initial",
    },
    {
      id: "H4",
      title: isFr ? "Hybride multi-couches" : "Multi-layer hybrid",
      pros: isFr ? "Meilleur de tous les mondes : SLM pour la base, LoRA pour l'adaptation, RAG pour le contexte dynamique." : "Best of all worlds: SLM for base, LoRA for adaptation, RAG for dynamic context.",
      cons: isFr ? "Complexité. Effets d'interaction entre couches mal compris." : "Complexity. Inter-layer interaction effects poorly understood.",
      complexity: isFr ? "Très élevée" : "Very high",
      cost: isFr ? "Élevé" : "High",
    },
  ];

  const memoryLayers = [
    {
      id: "L1",
      name: isFr ? "LAYER 1 — Mémoire de Nœud" : "LAYER 1 — Node Memory",
      type: isFr ? "Court terme" : "Short term",
      color: "oklch(0.60 0.20 25)",
      storage: "LLM Context Window",
      cost: isFr ? "Élevé" : "High",
      items: isFr
        ? ["Contexte conversation actuel", "Variables spécifiques au nœud", "Tracker des concepts couverts", "Détection état émotionnel", "Oubli sélectif à la sortie"]
        : ["Current conversation context", "Node-specific variables", "Covered concepts tracker", "Emotional state detection", "Selective forgetting on exit"],
    },
    {
      id: "L2",
      name: isFr ? "LAYER 2 — Mémoire de Session" : "LAYER 2 — Session Memory",
      type: isFr ? "Moyen terme" : "Medium term",
      color: "oklch(0.75 0.16 75)",
      storage: "Vector DB / RAG",
      cost: isFr ? "Moyen" : "Medium",
      items: isFr
        ? ["Chemin des nœuds visités", "Score de progression global", "Suivi du niveau d'engagement", "Décisions et branches prises", "Historique conversation résumé"]
        : ["Path of visited nodes", "Global progression score", "Engagement level tracking", "Decisions and branches taken", "Summarized conversation history"],
    },
    {
      id: "L3",
      name: isFr ? "LAYER 3 — Mémoire Utilisateur" : "LAYER 3 — User Memory",
      type: isFr ? "Long terme" : "Long term",
      color: "oklch(0.65 0.18 145)",
      storage: "PostgreSQL + SLM",
      cost: isFr ? "Faible" : "Low",
      items: isFr
        ? ["Profil d'apprentissage + préférences", "Résumé sessions historiques", "Niveau de connaissance par sujet", "Style d'interaction détecté", "Patterns inter-sessions"]
        : ["Learning profile + preferences", "Historical session summaries", "Knowledge level by topic", "Detected interaction style", "Inter-session patterns"],
    },
  ];

  const avatarResearch = [
    {
      id: "2a",
      title: isFr ? "Extraction Comportementale depuis Archives" : "Behavioral Extraction from Archives",
      desc: isFr
        ? "Extraire des patterns comportementaux individuels depuis des vidéos existantes — sans nouvelles sessions de capture. Identifier : répertoire de micro-expressions, vocabulaire gestuel, relations temporelles geste-parole, habitudes posturales."
        : "Extract individual behavioral patterns from existing videos — without new capture sessions. Identify: micro-expression repertoire, gestural vocabulary, gesture-speech temporal relationships, postural habits.",
      challenge: isFr
        ? "Peut-on extraire automatiquement le vocabulaire gestuel d'un individu depuis des images non contrôlées (angles variables, éclairage, contextes) ?"
        : "Can we automatically extract an individual's gestural vocabulary from uncontrolled footage (variable angles, lighting, contexts)?",
    },
    {
      id: "2b",
      title: isFr ? "Génération de Langage Corporel Cohérent" : "Coherent Body Language Generation",
      desc: isFr
        ? "Aller au-delà du lip-sync. Générer un comportement corporel coordonné : synchronisé avec le contenu de la parole et le ton émotionnel, culturellement approprié, cohérent avec la personnalité définie."
        : "Go beyond lip-sync. Generate coordinated body behavior: synchronized with speech content and emotional tone, culturally appropriate, consistent with the defined personality.",
      challenge: isFr
        ? "La plupart des systèmes actuels se concentrent sur le visage uniquement. Le corps est absent ou issu d'une bibliothèque de templates, créant un décalage uncanny."
        : "Most current systems focus on the face only. The body is absent or from a template library, creating an uncanny mismatch.",
    },
    {
      id: "2c",
      title: isFr ? "TTS Expressif Personnalisé" : "Personalized Expressive TTS",
      desc: isFr
        ? "Générer une parole capturant non seulement le timbre vocal mais l'empreinte prosodique : rythme, patterns d'emphase, distribution des pauses, modulation émotionnelle."
        : "Generate speech capturing not only vocal timbre but the prosodic fingerprint: rhythm, emphasis patterns, pause distribution, emotional modulation.",
      challenge: isFr
        ? "Quelle quantité d'audio source est nécessaire pour capturer l'individualité prosodique ? Minutes ou heures de référence ?"
        : "How much source audio is needed to capture prosodic individuality? Minutes or hours of reference?",
    },
    {
      id: "2d",
      title: isFr ? "Optimisation Coût / Qualité / Latence" : "Cost / Quality / Latency Optimization",
      desc: isFr
        ? "Approches : base pré-rendue + lip-sync temps réel, distillation de modèle, cache intelligent, dégradation gracieuse (vidéo complète → visage → avatar stylisé → audio seul)."
        : "Approaches: pre-rendered base + real-time lip-sync, model distillation, intelligent cache, graceful degradation (full video → face → stylized avatar → audio only).",
      challenge: isFr
        ? "Quel est le compute minimal pour une génération d'avatar personnalisé acceptable à <500ms ?"
        : "What is the minimum compute for acceptable personalized avatar generation at <500ms?",
    },
  ];

  const openQuestions = {
    axis1: isFr
      ? [
          "Comment compresser l'historique de conversation tout en préservant les informations critiques (progression pédagogique, contexte émotionnel, engagements factuels) ?",
          "Que faut-il retenir vs. archiver vs. supprimer aux transitions de nœuds ? Quelles métriques définissent une 'information critique' ?",
          "Mémoire individuelle vs. collective : le système doit-il apprendre des patterns inter-utilisateurs (améliorer les recommandations) ou garder la mémoire strictement individuelle (vie privée) ?",
          "Quand un utilisateur revient après des jours, comment restaurer juste assez de contexte pour une continuation naturelle sans saturer la fenêtre contextuelle ?",
          "Comment détecter et classifier les styles d'interaction depuis les signaux conversationnels ?",
        ]
      : [
          "How to compress conversation history while preserving critical information (pedagogical progression, emotional context, factual commitments)?",
          "What to retain vs. archive vs. discard at node transitions? What metrics define 'critical information'?",
          "Individual vs. collective memory: should the system learn from cross-user patterns (improve recommendations) or keep memory strictly individual (privacy)?",
          "When a user returns after days, how to restore just enough context for natural continuation without saturating the context window?",
          "How to detect and classify interaction styles from conversational signals?",
        ],
    axis2: isFr
      ? [
          "Peut-on extraire automatiquement le vocabulaire gestuel d'un individu depuis des images non contrôlées ?",
          "Comment assurer que le langage corporel, les expressions faciales et la prosodie racontent la même histoire émotionnelle simultanément ?",
          "Quelle est la faisabilité temps réel : compute minimal pour une génération d'avatar personnalisé acceptable à <500ms ?",
          "Comment mesurer objectivement l'authenticité comportementale au-delà de la similarité visuelle ?",
          "Peut-on exploiter la quantification, le pruning ou la distillation pour rendre la génération temps réel faisable sur hardware accessible ?",
        ]
      : [
          "Can we automatically extract an individual's gestural vocabulary from uncontrolled footage?",
          "How to ensure body language, facial expressions, and prosody tell the same emotional story simultaneously?",
          "What is the real-time feasibility: minimum compute for acceptable personalized avatar generation at <500ms?",
          "How to objectively measure behavioral authenticity beyond visual similarity?",
          "Can quantization, pruning, or distillation make real-time generation feasible on accessible hardware?",
        ],
  };

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

  const idiapExpectations = isFr
    ? [
        "Recherche fondamentale sur les architectures mémoire pour IA conversationnelle longue durée",
        "Recherche en synthèse vocale pour TTS personnalisé, expressif, temps réel",
        "Frameworks d'évaluation — métriques scientifiques pour authenticité comportementale et engagement",
        "Publications dans les venues pertinentes (Interspeech, SIGDIAL, ACL, CHI, CVPR)",
        "Capacité PhD/postdoc pour avancer ces axes sur la durée du projet",
      ]
    : [
        "Fundamental research on memory architectures for long-duration conversational AI",
        "Research in speech synthesis for personalized, expressive, real-time TTS",
        "Evaluation frameworks — scientific metrics for behavioral authenticity and engagement",
        "Publications in relevant venues (Interspeech, SIGDIAL, ACL, CHI, CVPR)",
        "PhD/postdoc capacity to advance these axes over the project duration",
      ];

  const scientificOutputs = isFr
    ? [
        "Publications peer-reviewed dans les venues top-tier",
        "Outils open-source, modèles et datasets annotés (conformes RGPD)",
        "Benchmarks reproductibles pour l'authenticité comportementale des avatars",
        "Architecture de référence pour IA conversationnelle efficiente en mémoire",
        "Prototypes démontrés évalués avec utilisateurs réels",
      ]
    : [
        "Peer-reviewed publications in top-tier venues",
        "Open-source tools, models, and annotated datasets (GDPR-compliant)",
        "Reproducible benchmarks for avatar behavioral authenticity",
        "Reference architecture for memory-efficient conversational AI",
        "Demonstrated prototypes evaluated with real users",
      ];

  return (
    <div className="min-h-screen pt-20">
      {/* Page header */}
      <div className="border-b border-slate-200 py-8">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">02</span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-mono text-slate-400">
                {isFr ? "Défis de Recherche — IDIAP" : "Research Challenges — IDIAP"}
              </span>
            </div>
            <h1
              className="text-3xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.025em" }}
            >
              {isFr ? "Défis de Recherche Fondamentale" : "Fundamental Research Challenges"}
            </h1>
            <p
              className="text-base text-slate-600 leading-relaxed"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              {isFr
                ? "Ce document détaille les axes de recherche pour lesquels DigiDouble sollicite la collaboration de l'IDIAP dans le cadre d'un projet Innosuisse. Les deux axes primaires concernent la mémoire conversationnelle longue durée et la génération d'avatars expressifs personnalisés."
                : "This document details the research axes for which DigiDouble seeks IDIAP collaboration within an Innosuisse project. The two primary axes concern long-duration conversational memory and personalized expressive avatar generation."
              }
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">

        {/* Latency Challenge */}
        <section className="mb-16">
          <SectionHeader
            number="01"
            title={isFr ? "Le Défi de Latence" : "The Latency Challenge"}
            subtitle={isFr ? "Une réduction de 10–20× est nécessaire pour atteindre un flux conversationnel naturel." : "A 10–20× reduction is needed to achieve natural conversational flow."}
            accent="red"
          />

          <div className="border border-slate-200 rounded p-4 bg-white mb-6">
            <PipelineDiagram />
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Diagramme de séquence — Cible <2s" : "Sequence Diagram — Target <2s"}
            </h3>
            <div className="border border-slate-200 rounded p-4 bg-white">
              <ConversationFlowDiagram />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="callout-danger">
              <div className="text-xs font-bold mb-2" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.45 0.20 25)" }}>
                {isFr ? "ÉTAT ACTUEL — 15–40 secondes" : "CURRENT STATE — 15–40 seconds"}
              </div>
              <div className="space-y-2">
                {latencyPipeline.map((s) => (
                  <div key={s.stage}>
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-xs font-medium text-slate-700" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.stage}</span>
                      <span className="text-xs text-slate-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.current}</span>
                    </div>
                    <div className="latency-bar">
                      <div className="latency-fill" style={{ width: `${s.currentPct}%`, background: "oklch(0.60 0.20 25)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="callout-success">
              <div className="text-xs font-bold mb-2" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.45 0.18 145)" }}>
                {isFr ? "CIBLE — sous 2 secondes" : "TARGET — under 2 seconds"}
              </div>
              <div className="space-y-2">
                {latencyPipeline.map((s) => (
                  <div key={s.stage}>
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-xs font-medium text-slate-700" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.stage}</span>
                      <span className="text-xs font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.45 0.18 145)" }}>{s.target}</span>
                    </div>
                    <div className="latency-bar">
                      <div className="latency-fill" style={{ width: `${s.targetPct}%`, background: "oklch(0.65 0.18 145)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="callout-warning">
            <p className="text-sm font-semibold text-slate-800 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Goulot d'étranglement principal : génération vidéo avatar" : "Main bottleneck: avatar video generation"}
            </p>
            <p className="text-sm text-slate-700" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? <>Actuellement 5–15s via APIs externes, cible 200–500ms avec modèles internalisés. Cette contrainte unique pilote toutes les décisions architecturales. La réduction requise est de <strong>10–20×</strong> sur l'ensemble du pipeline.</>
                : <>Currently 5–15s via external APIs, target 200–500ms with internalized models. This single constraint drives all architectural decisions. The required reduction is <strong>10–20×</strong> across the entire pipeline.</>
              }
            </p>
          </div>
        </section>

        {/* Axis 1 — Conversational Memory */}
        <section className="mb-16">
          <SectionHeader
            number="02"
            title={isFr ? "Axe 1 — Architecture Mémoire Conversationnelle" : "Axis 1 — Conversational Memory Architecture"}
            subtitle="Dr. Elena Epure · Language & Information Technologies, IDIAP"
            accent="cyan"
          />

          <div className="mb-6">
            <div className="callout-danger mb-4">
              <p className="text-sm font-semibold text-slate-800 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Le problème fondamental" : "The fundamental problem"}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? <>Un avatar doit maintenir la cohérence sur des <strong>sessions longues (1h+)</strong> et des <strong>sessions multiples sur des jours ou semaines</strong>. Les approches naïves échouent : garder l'historique complet dans le contexte LLM est prohibitivement coûteux. Tronquer l'historique détruit la continuité. Le défi : atteindre la <strong>richesse contextuelle</strong> de l'historique complet avec le <strong>coût et la vitesse</strong> d'un contexte minimal.</>
                  : <>An avatar must maintain coherence over <strong>long sessions (1h+)</strong> and <strong>multiple sessions over days or weeks</strong>. Naive approaches fail: keeping the full history in the LLM context is prohibitively expensive. Truncating history destroys continuity. The challenge: achieve the <strong>contextual richness</strong> of full history with the <strong>cost and speed</strong> of minimal context.</>
                }
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-base font-semibold text-slate-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Architecture Mémoire — Vue Système" : "Memory Architecture — System View"}
              </h3>
              <div className="border border-slate-200 rounded p-4 bg-white">
                <MemoryArchDiagram />
              </div>
            </div>

            <h3 className="text-base font-semibold text-slate-900 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Modèle Mémoire à Trois Couches" : "Three-Layer Memory Model"}
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {memoryLayers.map((layer) => (
                <div key={layer.id} className="border border-slate-200 rounded overflow-hidden">
                  <div className="px-4 py-3" style={{ borderLeft: `4px solid ${layer.color}`, background: `${layer.color}0a` }}>
                    <div className="text-xs font-bold mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace", color: layer.color }}>
                      {layer.id}
                    </div>
                    <div className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {layer.name.split(" — ")[1]}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {layer.type}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-1 mb-3">
                      {layer.items.map((item) => (
                        <div key={item} className="flex gap-2">
                          <span className="text-xs mt-0.5" style={{ color: layer.color }}>·</span>
                          <span className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-slate-100 pt-2 flex justify-between">
                      <span className="text-xs text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{layer.storage}</span>
                      <span className="text-xs font-semibold" style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: (layer.cost === "Élevé" || layer.cost === "High") ? "oklch(0.60 0.20 25)"
                          : (layer.cost === "Moyen" || layer.cost === "Medium") ? "oklch(0.75 0.16 75)"
                          : "oklch(0.65 0.18 145)",
                      }}>
                        {isFr ? "Coût" : "Cost"}: {layer.cost}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-base font-semibold text-slate-900 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Hypothèses à Explorer" : "Hypotheses to Explore"}
            </h3>
            <div className="overflow-x-auto mb-6">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{isFr ? "Hypothèse" : "Hypothesis"}</th>
                    <th>{isFr ? "Approche" : "Approach"}</th>
                    <th>{isFr ? "Avantages" : "Advantages"}</th>
                    <th>{isFr ? "Inconvénients" : "Drawbacks"}</th>
                    <th>{isFr ? "Complexité" : "Complexity"}</th>
                    <th>{isFr ? "Coût" : "Cost"}</th>
                  </tr>
                </thead>
                <tbody>
                  {memoryHypotheses.map((h) => (
                    <tr key={h.id}>
                      <td><span className="font-bold text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 200)" }}>{h.id}</span></td>
                      <td className="font-medium text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem" }}>{h.title}</td>
                      <td className="text-slate-600 text-xs" style={{ fontFamily: "'Source Serif 4', serif" }}>{h.pros}</td>
                      <td className="text-slate-600 text-xs" style={{ fontFamily: "'Source Serif 4', serif" }}>{h.cons}</td>
                      <td>
                        <span className="text-xs font-mono" style={{
                          color: (h.complexity === "Faible" || h.complexity === "Low") ? "oklch(0.65 0.18 145)"
                            : (h.complexity === "Moyenne" || h.complexity === "Medium") ? "oklch(0.75 0.16 75)"
                            : "oklch(0.60 0.20 25)",
                        }}>{h.complexity}</span>
                      </td>
                      <td><span className="text-xs font-mono text-slate-500">{h.cost}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-base font-semibold text-slate-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Questions de Recherche Ouvertes" : "Open Research Questions"}
            </h3>
            <div className="space-y-2">
              {openQuestions.axis1.map((q, i) => (
                <div key={i} className="flex gap-3 p-3 border border-slate-100 rounded bg-slate-50">
                  <span className="text-xs font-bold shrink-0 mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 200)" }}>Q{i + 1}</span>
                  <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{q}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Axis 2 — Avatar & TTS */}
        <section className="mb-16">
          <SectionHeader
            number="03"
            title={isFr ? "Axe 2 — Avatar Expressif & Parole Personnalisée" : "Axis 2 — Expressive Avatar & Personalized Speech"}
            subtitle="Dr. Mathew Magimai-Doss · Speech & Audio Processing, IDIAP"
            accent="orange"
          />

          <div className="border border-slate-200 rounded p-4 bg-white mb-6">
            <AvatarBehaviorDiagram />
          </div>

          <div className="callout-warning mb-6">
            <p className="text-sm font-semibold text-slate-800 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Le gap de fidélité comportementale" : "The behavioral fidelity gap"}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? <>Les plateformes actuelles produisent des <strong>"têtes parlantes uniformisées"</strong> — visuellement photorealistic mais comportementalement génériques. Les utilisateurs familiers d'une personne source rapportent systématiquement que les avatars générés par API "ne semblent pas justes" — ils reconnaissent le visage mais pas le comportement. Cela crée une <strong>vallée de l'étrange de la familiarité</strong> qui détruit la suspension d'incrédulité.</>
                : <>Current platforms produce <strong>"standardized talking heads"</strong> — visually photorealistic but behaviorally generic. Users familiar with a source person consistently report that API-generated avatars "don't seem right" — they recognize the face but not the behavior. This creates an <strong>uncanny valley of familiarity</strong> that destroys suspension of disbelief.</>
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {avatarResearch.map((sub) => (
              <div key={sub.id} className="border border-slate-200 rounded p-4">
                <div className="text-xs font-bold mb-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 50)" }}>
                  AXE 2{sub.id}
                </div>
                <h4 className="font-semibold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9375rem" }}>
                  {sub.title}
                </h4>
                <p className="text-sm text-slate-600 mb-3 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {sub.desc}
                </p>
                <div className="border-t border-slate-100 pt-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? "Question clé :" : "Key question:"}
                  </span>
                  <p className="text-xs text-slate-600 mt-1 italic" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {sub.challenge}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-base font-semibold text-slate-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Questions de Recherche Ouvertes" : "Open Research Questions"}
          </h3>
          <div className="space-y-2">
            {openQuestions.axis2.map((q, i) => (
              <div key={i} className="flex gap-3 p-3 border border-slate-100 rounded bg-slate-50">
                <span className="text-xs font-bold shrink-0 mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 50)" }}>Q{i + 1}</span>
                <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{q}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partnership */}
        <section className="mb-16">
          <SectionHeader
            number="04"
            title={isFr ? "Partenariat IDIAP — Apports Mutuels" : "IDIAP Partnership — Mutual Contributions"}
            accent="green"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Ce que DigiDouble apporte" : "What DigiDouble brings"}
              </h3>
              <div className="space-y-2">
                {digiDoubleContributions.map((item) => (
                  <div key={item} className="flex gap-2 p-2 border-l-2 border-green-300 pl-3">
                    <span className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Ce que DigiDouble attend de l'IDIAP" : "What DigiDouble expects from IDIAP"}
              </h3>
              <div className="space-y-2">
                {idiapExpectations.map((item) => (
                  <div key={item} className="flex gap-2 p-2 border-l-2 border-cyan-300 pl-3">
                    <span className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 callout-info">
            <h4 className="text-sm font-semibold text-slate-800 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Outputs scientifiques attendus" : "Expected Scientific Outputs"}
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {scientificOutputs.map((item) => (
                <div key={item} className="flex gap-2">
                  <span className="text-xs mt-0.5" style={{ color: "oklch(0.72 0.18 200)" }}>→</span>
                  <span className="text-xs text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
