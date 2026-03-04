/*
 * Research — DigiDouble Research Portal
 * Page: Défis de Recherche pour IDIAP
 * Design: Technical Blueprint, sections numérotées, diagrammes de flux en CSS
 */
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";

const latencyPipeline = [
  { stage: "ASR+STT", current: "2–5s", target: "300ms", currentPct: 18, targetPct: 15 },
  { stage: "Routing", current: "1–2s", target: "200ms", currentPct: 10, targetPct: 10 },
  { stage: "LLM", current: "3–8s", target: "500ms", currentPct: 28, targetPct: 25 },
  { stage: "TTS", current: "2–4s", target: "200ms", currentPct: 16, targetPct: 10 },
  { stage: "Avatar", current: "5–15s", target: "500ms", currentPct: 42, targetPct: 25 },
  { stage: "Network", current: "2–5s", target: "300ms", currentPct: 16, targetPct: 15 },
];

const memoryHypotheses = [
  {
    id: "H1",
    title: "RAG Dynamique seul",
    pros: "Flexible, économique pour la récupération",
    cons: "Peut manquer un contexte non sémantiquement proche. Pas de personnalité 'intégrée'.",
    complexity: "Faible",
    cost: "Faible",
  },
  {
    id: "H2",
    title: "LoRA/adapters + RAG",
    pros: "Personnalité stable à faible coût d'inférence. Mémoire dynamique reste flexible.",
    cons: "Nécessite un pipeline d'entraînement. Mises à jour de personnalité = réentraînement.",
    complexity: "Moyenne",
    cost: "Moyen",
  },
  {
    id: "H3",
    title: "SLM distillé par avatar + RAG",
    pros: "Coût d'inférence minimal. Personnalité la plus cohérente. Réponse la plus rapide.",
    cons: "Coût d'entraînement initial élevé. Moins flexible pour itération rapide.",
    complexity: "Élevée",
    cost: "Élevé initial",
  },
  {
    id: "H4",
    title: "Hybride multi-couches",
    pros: "Meilleur de tous les mondes : SLM pour la base, LoRA pour l'adaptation, RAG pour le contexte dynamique.",
    cons: "Complexité. Effets d'interaction entre couches mal compris.",
    complexity: "Très élevée",
    cost: "Élevé",
  },
];

const memoryLayers = [
  {
    id: "L1",
    name: "LAYER 1 — Mémoire de Nœud",
    type: "Court terme",
    color: "oklch(0.60 0.20 25)",
    storage: "LLM Context Window",
    cost: "Élevé",
    items: ["Contexte conversation actuel", "Variables spécifiques au nœud", "Tracker des concepts couverts", "Détection état émotionnel", "Oubli sélectif à la sortie"],
  },
  {
    id: "L2",
    name: "LAYER 2 — Mémoire de Session",
    type: "Moyen terme",
    color: "oklch(0.75 0.16 75)",
    storage: "Vector DB / RAG",
    cost: "Moyen",
    items: ["Chemin des nœuds visités", "Score de progression global", "Suivi du niveau d'engagement", "Décisions et branches prises", "Historique conversation résumé"],
  },
  {
    id: "L3",
    name: "LAYER 3 — Mémoire Utilisateur",
    type: "Long terme",
    color: "oklch(0.65 0.18 145)",
    storage: "PostgreSQL + SLM",
    cost: "Faible",
    items: ["Profil d'apprentissage + préférences", "Résumé sessions historiques", "Niveau de connaissance par sujet", "Style d'interaction détecté", "Patterns inter-sessions"],
  },
];

const avatarResearch = [
  {
    id: "2a",
    title: "Extraction Comportementale depuis Archives",
    desc: "Extraire des patterns comportementaux individuels depuis des vidéos existantes — sans nouvelles sessions de capture. Identifier : répertoire de micro-expressions, vocabulaire gestuel, relations temporelles geste-parole, habitudes posturales.",
    challenge: "Peut-on extraire automatiquement le vocabulaire gestuel d'un individu depuis des images non contrôlées (angles variables, éclairage, contextes) ?",
  },
  {
    id: "2b",
    title: "Génération de Langage Corporel Cohérent",
    desc: "Aller au-delà du lip-sync. Générer un comportement corporel coordonné : synchronisé avec le contenu de la parole et le ton émotionnel, culturellement approprié, cohérent avec la personnalité définie.",
    challenge: "La plupart des systèmes actuels se concentrent sur le visage uniquement. Le corps est absent ou issu d'une bibliothèque de templates, créant un décalage uncanny.",
  },
  {
    id: "2c",
    title: "TTS Expressif Personnalisé",
    desc: "Générer une parole capturant non seulement le timbre vocal mais l'empreinte prosodique : rythme, patterns d'emphase, distribution des pauses, modulation émotionnelle.",
    challenge: "Quelle quantité d'audio source est nécessaire pour capturer l'individualité prosodique ? Minutes ou heures de référence ?",
  },
  {
    id: "2d",
    title: "Optimisation Coût / Qualité / Latence",
    desc: "Approches : base pré-rendue + lip-sync temps réel, distillation de modèle, cache intelligent, dégradation gracieuse (vidéo complète → visage → avatar stylisé → audio seul).",
    challenge: "Quel est le compute minimal pour une génération d'avatar personnalisé acceptable à <500ms ?",
  },
];

const openQuestions = {
  axis1: [
    "Comment compresser l'historique de conversation tout en préservant les informations critiques (progression pédagogique, contexte émotionnel, engagements factuels) ?",
    "Que faut-il retenir vs. archiver vs. supprimer aux transitions de nœuds ? Quelles métriques définissent une 'information critique' ?",
    "Mémoire individuelle vs. collective : le système doit-il apprendre des patterns inter-utilisateurs (améliorer les recommandations) ou garder la mémoire strictement individuelle (vie privée) ?",
    "Quand un utilisateur revient après des jours, comment restaurer juste assez de contexte pour une continuation naturelle sans saturer la fenêtre contextuelle ?",
    "Comment détecter et classifier les styles d'interaction depuis les signaux conversationnels ?",
  ],
  axis2: [
    "Peut-on extraire automatiquement le vocabulaire gestuel d'un individu depuis des images non contrôlées ?",
    "Comment assurer que le langage corporel, les expressions faciales et la prosodie racontent la même histoire émotionnelle simultanément ?",
    "Quelle est la faisabilité temps réel : compute minimal pour une génération d'avatar personnalisé acceptable à <500ms ?",
    "Comment mesurer objectivement l'authenticité comportementale au-delà de la similarité visuelle ?",
    "Peut-on exploiter la quantification, le pruning ou la distillation pour rendre la génération temps réel faisable sur hardware accessible ?",
  ],
};

export default function Research() {
  return (
    <div className="min-h-screen pt-20">
      {/* Page header */}
      <div className="border-b border-slate-200 py-8">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">02</span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-mono text-slate-400">Défis de Recherche — IDIAP</span>
            </div>
            <h1
              className="text-3xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.025em" }}
            >
              Défis de Recherche Fondamentale
            </h1>
            <p
              className="text-base text-slate-600 leading-relaxed"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              Ce document détaille les axes de recherche pour lesquels DigiDouble sollicite la collaboration de l'IDIAP dans le cadre d'un projet Innosuisse. Les deux axes primaires concernent la mémoire conversationnelle longue durée et la génération d'avatars expressifs personnalisés.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">

        {/* Latency Challenge */}
        <section className="mb-16">
          <SectionHeader
            number="01"
            title="Le Défi de Latence"
            subtitle="Une réduction de 10–20× est nécessaire pour atteindre un flux conversationnel naturel."
            accent="red"
          />

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="callout-danger">
              <div
                className="text-xs font-bold mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.45 0.20 25)" }}
              >
                ÉTAT ACTUEL — 15–40 secondes
              </div>
              <div className="space-y-2">
                {latencyPipeline.map((s) => (
                  <div key={s.stage}>
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-xs font-medium text-slate-700" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {s.stage}
                      </span>
                      <span className="text-xs text-slate-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {s.current}
                      </span>
                    </div>
                    <div className="latency-bar">
                      <div
                        className="latency-fill"
                        style={{
                          width: `${s.currentPct}%`,
                          background: "oklch(0.60 0.20 25)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="callout-success">
              <div
                className="text-xs font-bold mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.45 0.18 145)" }}
              >
                CIBLE — sous 2 secondes
              </div>
              <div className="space-y-2">
                {latencyPipeline.map((s) => (
                  <div key={s.stage}>
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-xs font-medium text-slate-700" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {s.stage}
                      </span>
                      <span className="text-xs font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.45 0.18 145)" }}>
                        {s.target}
                      </span>
                    </div>
                    <div className="latency-bar">
                      <div
                        className="latency-fill"
                        style={{
                          width: `${s.targetPct}%`,
                          background: "oklch(0.65 0.18 145)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="callout-warning">
            <p
              className="text-sm font-semibold text-slate-800 mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Goulot d'étranglement principal : génération vidéo avatar
            </p>
            <p
              className="text-sm text-slate-700"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              Actuellement 5–15s via APIs externes, cible 200–500ms avec modèles internalisés. Cette contrainte unique pilote toutes les décisions architecturales. La réduction requise est de <strong>10–20×</strong> sur l'ensemble du pipeline.
            </p>
          </div>
        </section>

        {/* Axis 1 — Conversational Memory */}
        <section className="mb-16">
          <SectionHeader
            number="02"
            title="Axe 1 — Architecture Mémoire Conversationnelle"
            subtitle="Dr. Elena Epure · Language & Information Technologies, IDIAP"
            accent="cyan"
          />

          <div className="mb-6">
            <div className="callout-danger mb-4">
              <p
                className="text-sm font-semibold text-slate-800 mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Le problème fondamental
              </p>
              <p
                className="text-sm text-slate-700 leading-relaxed"
                style={{ fontFamily: "'Source Serif 4', serif" }}
              >
                Un avatar doit maintenir la cohérence sur des <strong>sessions longues (1h+)</strong> et des <strong>sessions multiples sur des jours ou semaines</strong>. Les approches naïves échouent : garder l'historique complet dans le contexte LLM est prohibitivement coûteux. Tronquer l'historique détruit la continuité. Le défi : atteindre la <strong>richesse contextuelle</strong> de l'historique complet avec le <strong>coût et la vitesse</strong> d'un contexte minimal.
              </p>
            </div>

            {/* Memory layers */}
            <h3
              className="text-base font-semibold text-slate-900 mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Modèle Mémoire à Trois Couches
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {memoryLayers.map((layer) => (
                <div
                  key={layer.id}
                  className="border border-slate-200 rounded overflow-hidden"
                >
                  <div
                    className="px-4 py-3"
                    style={{ borderLeft: `4px solid ${layer.color}`, background: `${layer.color}0a` }}
                  >
                    <div
                      className="text-xs font-bold mb-0.5"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: layer.color }}
                    >
                      {layer.id}
                    </div>
                    <div
                      className="text-sm font-semibold text-slate-900"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
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
                      <span className="text-xs text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {layer.storage}
                      </span>
                      <span
                        className="text-xs font-semibold"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          color: layer.cost === "Élevé" ? "oklch(0.60 0.20 25)" : layer.cost === "Moyen" ? "oklch(0.75 0.16 75)" : "oklch(0.65 0.18 145)",
                        }}
                      >
                        Coût: {layer.cost}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hypotheses */}
            <h3
              className="text-base font-semibold text-slate-900 mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Hypothèses à Explorer
            </h3>
            <div className="overflow-x-auto mb-6">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Hypothèse</th>
                    <th>Approche</th>
                    <th>Avantages</th>
                    <th>Inconvénients</th>
                    <th>Complexité</th>
                    <th>Coût</th>
                  </tr>
                </thead>
                <tbody>
                  {memoryHypotheses.map((h) => (
                    <tr key={h.id}>
                      <td>
                        <span
                          className="font-bold text-xs"
                          style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 200)" }}
                        >
                          {h.id}
                        </span>
                      </td>
                      <td className="font-medium text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem" }}>
                        {h.title}
                      </td>
                      <td className="text-slate-600 text-xs" style={{ fontFamily: "'Source Serif 4', serif" }}>
                        {h.pros}
                      </td>
                      <td className="text-slate-600 text-xs" style={{ fontFamily: "'Source Serif 4', serif" }}>
                        {h.cons}
                      </td>
                      <td>
                        <span
                          className="text-xs font-mono"
                          style={{
                            color: h.complexity === "Faible" ? "oklch(0.65 0.18 145)"
                              : h.complexity === "Moyenne" ? "oklch(0.75 0.16 75)"
                              : "oklch(0.60 0.20 25)",
                          }}
                        >
                          {h.complexity}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs font-mono text-slate-500">{h.cost}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Open questions */}
            <h3
              className="text-base font-semibold text-slate-900 mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Questions de Recherche Ouvertes
            </h3>
            <div className="space-y-2">
              {openQuestions.axis1.map((q, i) => (
                <div key={i} className="flex gap-3 p-3 border border-slate-100 rounded bg-slate-50">
                  <span
                    className="text-xs font-bold shrink-0 mt-0.5"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 200)" }}
                  >
                    Q{i + 1}
                  </span>
                  <p
                    className="text-sm text-slate-700 leading-relaxed"
                    style={{ fontFamily: "'Source Serif 4', serif" }}
                  >
                    {q}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Axis 2 — Avatar & TTS */}
        <section className="mb-16">
          <SectionHeader
            number="03"
            title="Axe 2 — Avatar Expressif & Parole Personnalisée"
            subtitle="Dr. Mathew Magimai-Doss · Speech & Audio Processing, IDIAP"
            accent="orange"
          />

          <div className="callout-warning mb-6">
            <p
              className="text-sm font-semibold text-slate-800 mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Le gap de fidélité comportementale
            </p>
            <p
              className="text-sm text-slate-700 leading-relaxed"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              Les plateformes actuelles produisent des <strong>"têtes parlantes uniformisées"</strong> — visuellement photorealistic mais comportementalement génériques. Les utilisateurs familiers d'une personne source rapportent systématiquement que les avatars générés par API "ne semblent pas justes" — ils reconnaissent le visage mais pas le comportement. Cela crée une <strong>vallée de l'étrange de la familiarité</strong> qui détruit la suspension d'incrédulité.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {avatarResearch.map((sub) => (
              <div key={sub.id} className="border border-slate-200 rounded p-4">
                <div
                  className="text-xs font-bold mb-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 50)" }}
                >
                  AXE 2{sub.id}
                </div>
                <h4
                  className="font-semibold text-slate-900 mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9375rem" }}
                >
                  {sub.title}
                </h4>
                <p
                  className="text-sm text-slate-600 mb-3 leading-relaxed"
                  style={{ fontFamily: "'Source Serif 4', serif" }}
                >
                  {sub.desc}
                </p>
                <div className="border-t border-slate-100 pt-2">
                  <span
                    className="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Question clé :
                  </span>
                  <p
                    className="text-xs text-slate-600 mt-1 italic"
                    style={{ fontFamily: "'Source Serif 4', serif" }}
                  >
                    {sub.challenge}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h3
            className="text-base font-semibold text-slate-900 mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Questions de Recherche Ouvertes
          </h3>
          <div className="space-y-2">
            {openQuestions.axis2.map((q, i) => (
              <div key={i} className="flex gap-3 p-3 border border-slate-100 rounded bg-slate-50">
                <span
                  className="text-xs font-bold shrink-0 mt-0.5"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 50)" }}
                >
                  Q{i + 1}
                </span>
                <p
                  className="text-sm text-slate-700 leading-relaxed"
                  style={{ fontFamily: "'Source Serif 4', serif" }}
                >
                  {q}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Partnership */}
        <section className="mb-16">
          <SectionHeader
            number="04"
            title="Partenariat IDIAP — Apports Mutuels"
            accent="green"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3
                className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Ce que DigiDouble apporte
              </h3>
              <div className="space-y-2">
                {[
                  "Pipeline ASR souverain (Audiogami) — opérationnel, hébergé en Suisse",
                  "Expertise multi-stream — 14 ans de livraison multimédia synchronisée",
                  "Deux prototypes validés avec tests utilisateurs réels et retours documentés",
                  "Expertise domaine en conception narrative interactive et structuration pédagogique",
                  "Infrastructure GPU suisse — partenariat Exoscale pour compute souverain",
                ].map((item) => (
                  <div key={item} className="flex gap-2 p-2 border-l-2 border-green-300 pl-3">
                    <span className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3
                className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Ce que DigiDouble attend de l'IDIAP
              </h3>
              <div className="space-y-2">
                {[
                  "Recherche fondamentale sur les architectures mémoire pour IA conversationnelle longue durée",
                  "Recherche en synthèse vocale pour TTS personnalisé, expressif, temps réel",
                  "Frameworks d'évaluation — métriques scientifiques pour authenticité comportementale et engagement",
                  "Publications dans les venues pertinentes (Interspeech, SIGDIAL, ACL, CHI, CVPR)",
                  "Capacité PhD/postdoc pour avancer ces axes sur la durée du projet",
                ].map((item) => (
                  <div key={item} className="flex gap-2 p-2 border-l-2 border-cyan-300 pl-3">
                    <span className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 callout-info">
            <h4
              className="text-sm font-semibold text-slate-800 mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Outputs scientifiques attendus
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "Publications peer-reviewed dans les venues top-tier",
                "Outils open-source, modèles et datasets annotés (conformes RGPD)",
                "Benchmarks reproductibles pour l'authenticité comportementale des avatars",
                "Architecture de référence pour IA conversationnelle efficiente en mémoire",
                "Prototypes démontrés évalués avec utilisateurs réels",
              ].map((item) => (
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
