/*
 * Research — DigiDouble Research Portal
 * Design: schema-first, details in accordion/toggle
 * Sections: Latency (BeforeAfter) → Memory (3-layer) → Avatar → Partnership
 * i18n: EN (default) / FR via LangContext
 */
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import BeforeAfterDiagram from "@/components/diagrams/BeforeAfterDiagram";
import MemoryArchDiagram from "@/components/diagrams/MemoryArchDiagram";
import AvatarBehaviorDiagram from "@/components/diagrams/AvatarBehaviorDiagram";
import ResearchAxesDiagram from "@/components/diagrams/ResearchAxesDiagram";
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

  const memoryLayers = [
    {
      id: "L1",
      name: isFr ? "Mémoire de Travail" : "Working Memory",
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
      name: isFr ? "Mémoire Épisodique" : "Episodic Memory",
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
      name: isFr ? "Mémoire Sémantique" : "Semantic Memory",
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
        ? "Générer une parole capturant non seulement le timbre vocal mais l'empreinte prosodique : rythme, patterns d'emphase, distribution des pauses, modulation émotionnelle."
        : "Generate speech capturing not only vocal timbre but the prosodic fingerprint: rhythm, emphasis patterns, pause distribution, emotional modulation.",
      challenge: isFr
        ? "Quelle quantité d'audio source est nécessaire pour capturer l'individualité prosodique ? Minutes ou heures ?"
        : "How much source audio is needed to capture prosodic individuality? Minutes or hours?",
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

  const openQuestionsMemory = isFr
    ? [
        "Comment compresser l'historique de conversation tout en préservant les informations critiques (progression pédagogique, contexte émotionnel, engagements factuels) ?",
        "Que faut-il retenir vs. archiver vs. supprimer aux transitions de nœuds ?",
        "Mémoire individuelle vs. collective : apprendre des patterns inter-utilisateurs ou garder la mémoire strictement individuelle (vie privée) ?",
        "Quand un utilisateur revient après des jours, comment restaurer juste assez de contexte pour une continuation naturelle ?",
        "Comment détecter et classifier les styles d'interaction depuis les signaux conversationnels ?",
      ]
    : [
        "How to compress conversation history while preserving critical information (pedagogical progression, emotional context, factual commitments)?",
        "What to retain vs. archive vs. discard at node transitions?",
        "Individual vs. collective memory: learn from cross-user patterns or keep memory strictly individual (privacy)?",
        "When a user returns after days, how to restore just enough context for natural continuation?",
        "How to detect and classify interaction styles from conversational signals?",
      ];

  const openQuestionsAvatar = isFr
    ? [
        "Peut-on extraire automatiquement le vocabulaire gestuel d'un individu depuis des images non contrôlées ?",
        "Comment assurer que le langage corporel, les expressions faciales et la prosodie racontent la même histoire émotionnelle simultanément ?",
        "Quel est le compute minimal pour une génération d'avatar personnalisé acceptable à <500ms ?",
        "Comment mesurer objectivement l'authenticité comportementale au-delà de la similarité visuelle ?",
        "Peut-on exploiter la quantification, le pruning ou la distillation pour rendre la génération temps réel faisable ?",
      ]
    : [
        "Can we automatically extract an individual's gestural vocabulary from uncontrolled footage?",
        "How to ensure body language, facial expressions, and prosody tell the same emotional story simultaneously?",
        "What is the minimum compute for acceptable personalized avatar generation at <500ms?",
        "How to objectively measure behavioral authenticity beyond visual similarity?",
        "Can quantization, pruning, or distillation make real-time generation feasible on accessible hardware?",
      ];

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

  return (
    <div className="min-h-screen pt-16">
      {/* Page header */}
      <div className="border-b border-slate-200 py-10">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">02</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-mono text-slate-400">
              {isFr ? "Défis de Recherche — IDIAP" : "Research Challenges — IDIAP"}
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}>
            {isFr ? "Défis de Recherche Fondamentale" : "Fundamental Research Challenges"}
          </h1>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Deux axes primaires pour la collaboration IDIAP : mémoire conversationnelle longue durée et génération d'avatars expressifs personnalisés."
              : "Two primary axes for IDIAP collaboration: long-duration conversational memory and personalized expressive avatar generation."}
          </p>
        </div>
      </div>

      <div className="container max-w-4xl py-14 space-y-20">

        {/* ── OVERVIEW: 3 AXES ─────────────────────────────────────────────── */}
        <section>
          <SectionDivider number="01" title="Overview — 3 Research Axes" titleFr="Vue d'ensemble — 3 Axes de Recherche" isFr={isFr} />
          <p className="text-sm text-slate-500 mb-6 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Cliquer sur un axe pour les détails techniques et les hypothèses."
              : "Click an axis to expand technical details and hypotheses."}
          </p>
          <ResearchAxesDiagram />
        </section>

        {/* ── SECTION 1: LATENCY ───────────────────────────────────────────── */}
        <section>
          <SectionDivider number="02" title="Latency — Before & After" titleFr="Latence — Avant & Après" isFr={isFr} />
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Le goulot : génération vidéo avatar (5–10s)" : "The bottleneck: avatar video generation (5–10s)"}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Hover sur chaque composant pour les détails. La ligne rouge = goulot principal."
                : "Hover over each component for details. The red block = main bottleneck."}
            </p>
          </div>
          <BeforeAfterDiagram />
          <Accordion label="Approaches to solve the bottleneck" labelFr="Approches pour résoudre le goulot" isFr={isFr}>
            <div className="pt-3 space-y-3">
              {[
                {
                  label: isFr ? "Distillation du modèle de diffusion" : "Diffusion model distillation",
                  desc: isFr ? "Réduire le modèle de diffusion (ex. HeyGem OS) via distillation progressive. Cible : 4–8 steps vs 20–50 actuels. Perte qualité acceptable si <5% sur SSIM." : "Reduce the diffusion model (e.g. HeyGem OS) via progressive distillation. Target: 4–8 steps vs current 20–50. Acceptable quality loss if <5% on SSIM.",
                  color: "oklch(0.60 0.20 25)",
                },
                {
                  label: isFr ? "Cache intelligent + pré-rendu" : "Intelligent cache + pre-rendering",
                  desc: isFr ? "Pré-rendre les segments vidéo les plus probables (expressions neutres, transitions) et les assembler en temps réel. Réduction effective de 70% des frames à générer." : "Pre-render the most probable video segments (neutral expressions, transitions) and assemble them in real-time. Effective 70% reduction in frames to generate.",
                  color: "oklch(0.75 0.16 75)",
                },
                {
                  label: isFr ? "Pipeline streaming LLM → TTS → Avatar" : "Streaming pipeline LLM → TTS → Avatar",
                  desc: isFr ? "Démarrer la génération TTS dès les premiers tokens LLM, démarrer la génération avatar dès les premiers chunks audio. Parallélisation des étapes séquentielles." : "Start TTS generation from first LLM tokens, start avatar generation from first audio chunks. Parallelization of sequential steps.",
                  color: "oklch(0.65 0.18 145)",
                },
                {
                  label: isFr ? "Dégradation gracieuse" : "Graceful degradation",
                  desc: isFr ? "Si la latence dépasse le seuil : vidéo complète → visage seul → avatar stylisé → audio seul. L'utilisateur reçoit toujours une réponse dans les 2s." : "If latency exceeds threshold: full video → face only → stylized avatar → audio only. User always receives a response within 2s.",
                  color: "oklch(0.72 0.18 200)",
                },
              ].map((item) => (
                <div key={item.label} className="border-l-2 pl-3" style={{ borderColor: item.color }}>
                  <div className="text-xs font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: item.color }}>{item.label}</div>
                  <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </section>

        {/* ── SECTION 2: MEMORY ────────────────────────────────────────────── */}
        <section>
          <SectionDivider number="03" title="Axis 1 — Conversational Memory" titleFr="Axe 1 — Mémoire Conversationnelle" isFr={isFr} />
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Architecture mémoire 3 couches" : "3-layer memory architecture"}
            </h2>
            <p className="text-sm text-slate-400 font-mono mb-4">Dr. Petr Motlicek · IDIAP</p>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Maintenir la cohérence sur des sessions 1h+ sans exploser le contexte LLM. Mem0 (2025) : −90% tokens, +26% précision."
                : "Maintain coherence over 1h+ sessions without exploding LLM context. Mem0 (2025): −90% tokens, +26% accuracy."}
            </p>
          </div>

          {/* Memory diagram */}
          <div className="border border-slate-200 rounded-lg p-5 bg-white mb-4">
            <MemoryArchDiagram />
          </div>

          {/* 3-layer cards */}
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
                  <div className="border-t border-slate-100 pt-2 flex justify-between">
                    <span className="text-xs text-slate-400 font-mono">{layer.storage}</span>
                    <span className="text-xs font-mono" style={{
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

          <Accordion label="Open research questions — Memory" labelFr="Questions de recherche ouvertes — Mémoire" isFr={isFr}>
            <div className="pt-3 space-y-2">
              {openQuestionsMemory.map((q, i) => (
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
          <SectionDivider number="04" title="Axis 2 — Expressive Avatar & TTS" titleFr="Axe 2 — Avatar Expressif & TTS" isFr={isFr} />
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Au-delà du lip-sync : fidélité comportementale" : "Beyond lip-sync: behavioral fidelity"}
            </h2>
            <p className="text-sm text-slate-400 font-mono mb-4">Dr. Mathew Magimai-Doss · IDIAP</p>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Les plateformes actuelles produisent des \"têtes parlantes uniformisées\" — visuellement photorealistic mais comportementalement génériques. Cela crée une vallée de l'étrange de la familiarité."
                : "Current platforms produce \"standardized talking heads\" — visually photorealistic but behaviorally generic. This creates an uncanny valley of familiarity."}
            </p>
          </div>

          {/* Avatar diagram */}
          <div className="border border-slate-200 rounded-lg p-5 bg-white mb-4">
            <AvatarBehaviorDiagram />
          </div>

          {/* Sub-axes */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {avatarResearch.map((sub) => (
              <div key={sub.id} className="border border-slate-200 rounded p-4">
                <div className="text-xs font-bold mb-1 font-mono" style={{ color: "oklch(0.72 0.18 50)" }}>AXE 2{sub.id}</div>
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

          <Accordion label="Open research questions — Avatar" labelFr="Questions de recherche ouvertes — Avatar" isFr={isFr}>
            <div className="pt-3 space-y-2">
              {openQuestionsAvatar.map((q, i) => (
                <div key={i} className="flex gap-3 p-2 rounded">
                  <span className="text-xs font-bold shrink-0 mt-0.5 font-mono" style={{ color: "oklch(0.72 0.18 50)" }}>Q{i + 1}</span>
                  <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{q}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </section>

        {/* ── SECTION 4: PARTNERSHIP ───────────────────────────────────────── */}
        <section>
          <SectionDivider number="05" title="IDIAP Partnership — Mutual Contributions" titleFr="Partenariat IDIAP — Apports Mutuels" isFr={isFr} />
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
                {isFr ? "DigiDouble attend de l'IDIAP" : "DigiDouble expects from IDIAP"}
              </h3>
              <div className="space-y-2">
                {idiapExpectations.map((item) => (
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
