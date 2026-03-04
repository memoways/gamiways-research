/*
 * StateOfArt — DigiDouble Research Portal
 * Page: État de l'Art — Solutions existantes, benchmarks, enjeux
 * Design: Technical Blueprint, tableaux comparatifs denses, benchmarks visuels
 */
import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";
import LatencyBenchmarkDiagram from "@/components/diagrams/LatencyBenchmarkDiagram";
import RadarCompareDiagram from "@/components/diagrams/RadarCompareDiagram";
import ResearchGapDiagram from "@/components/diagrams/ResearchGapDiagram";

// ─── Data ────────────────────────────────────────────────────────────────────

const commercialPlatforms = [
  {
    name: "HeyGen",
    category: "Avatar commercial",
    realtime: true,
    bodyLanguage: "Partiel",
    conversation: false,
    sovereignty: false,
    latency: "2–5s (streaming)",
    pricing: "Élevé",
    censorship: "Risque élevé",
    notes: "Leader marché. Streaming temps réel. Censure contenu sensible. Pas de souveraineté données.",
    strengths: ["Qualité visuelle élevée", "API bien documentée", "Streaming temps réel"],
    weaknesses: ["Censure arbitraire", "Coût élevé à l'échelle", "Pas de mémoire conversationnelle", "Dépendance US"],
    score: { quality: 9, latency: 7, cost: 3, sovereignty: 1 },
  },
  {
    name: "Synthesia",
    category: "Avatar corporate",
    realtime: false,
    bodyLanguage: "Non",
    conversation: false,
    sovereignty: false,
    latency: "Minutes (pré-rendu)",
    pricing: "Moyen-élevé",
    censorship: "Risque élevé",
    notes: "Focus corporate, pré-rendu uniquement. Pas de conversation temps réel. Haute qualité visuelle.",
    strengths: ["Interface créateur simple", "Qualité visuelle stable", "Nombreux avatars"],
    weaknesses: ["Pas de temps réel", "Pas de conversation", "Censure", "Pas de personnalisation profonde"],
    score: { quality: 8, latency: 1, cost: 5, sovereignty: 1 },
  },
  {
    name: "D-ID",
    category: "Animation faciale",
    realtime: true,
    bodyLanguage: "Non",
    conversation: false,
    sovereignty: false,
    latency: "500ms–2s",
    pricing: "Moyen",
    censorship: "Risque moyen",
    notes: "Animation faciale depuis image statique. Lip-sync temps réel capable. Qualité inférieure à HeyGen.",
    strengths: ["API accessible", "Lip-sync temps réel", "Depuis image statique"],
    weaknesses: ["Qualité inférieure", "Visage uniquement", "Pas de mémoire"],
    score: { quality: 6, latency: 7, cost: 6, sovereignty: 2 },
  },
  {
    name: "Beyond Presence (Genesis 2.0)",
    category: "Avatar enterprise",
    realtime: true,
    bodyLanguage: "Partiel",
    conversation: false,
    sovereignty: false,
    latency: "<100ms",
    pricing: "Enterprise",
    censorship: "Risque moyen",
    notes: "Latence <100ms, hyper-réaliste. Streaming inference. Focus enterprise. Pas de contrôle narratif.",
    strengths: ["<100ms latence", "Hyper-réaliste", "Streaming continu"],
    weaknesses: ["Pas de contrôle narratif", "Coût enterprise", "Pas de souveraineté"],
    score: { quality: 9, latency: 10, cost: 2, sovereignty: 2 },
  },
  {
    name: "NVIDIA ACE",
    category: "Suite gaming",
    realtime: true,
    bodyLanguage: "Oui",
    conversation: true,
    sovereignty: false,
    latency: "<100ms",
    pricing: "Infrastructure NVIDIA",
    censorship: "Faible",
    notes: "Suite complète (Riva ASR, Audio2Face, NeMo LLM). <100ms pour gaming. Nécessite infrastructure NVIDIA.",
    strengths: ["<100ms latence", "Suite complète", "Langage corporel", "Conversation"],
    weaknesses: ["Lock-in NVIDIA", "Coût infrastructure", "Pas souverain", "Complexité déploiement"],
    score: { quality: 9, latency: 10, cost: 2, sovereignty: 3 },
  },
  {
    name: "Character.ai / TalkingMachines",
    category: "Entertainment",
    realtime: true,
    bodyLanguage: "Partiel",
    conversation: true,
    sovereignty: false,
    latency: "1–3s",
    pricing: "B2C",
    censorship: "Élevé",
    notes: "Diffusion autorégressive pour vidéo temps réel (2025). Focus entertainment. Censure forte.",
    strengths: ["Conversation intégrée", "Temps réel", "Large base utilisateurs"],
    weaknesses: ["Censure très forte", "Pas de contrôle créateur", "Pas d'usage professionnel"],
    score: { quality: 7, latency: 6, cost: 7, sovereignty: 1 },
  },
];

const openSourceSolutions = [
  {
    name: "HeyGem OS",
    type: "Avatar",
    latency: "5–15s",
    quality: "Bonne",
    deployment: "Docker (3 containers)",
    license: "Open Source",
    used: true,
    notes: "Utilisé par DigiDouble sur Exoscale. Gain 30% perf avec Arch Linux vs Ubuntu.",
  },
  {
    name: "SadTalker",
    type: "Talking Head",
    latency: "2–10s",
    quality: "Bonne",
    deployment: "Python/GPU",
    license: "MIT",
    used: false,
    notes: "CVPR 2023. Coefficients 3D depuis audio. Bon rapport qualité/performance.",
  },
  {
    name: "LivePortrait",
    type: "Animation faciale",
    latency: "1–3s",
    quality: "Très bonne",
    deployment: "Python/GPU",
    license: "MIT",
    used: false,
    notes: "Animation haute fidélité depuis image unique. Pas de génération audio.",
  },
  {
    name: "Wav2Lip",
    type: "Lip-sync",
    latency: "500ms–2s",
    quality: "Moyenne",
    deployment: "Python/GPU",
    license: "MIT",
    used: false,
    notes: "Lip-sync précis mais expressions limitées. Visage uniquement.",
  },
  {
    name: "VASA-1 (Microsoft)",
    type: "Talking Face",
    latency: "25ms/frame (40 FPS)",
    quality: "Excellente",
    deployment: "Recherche (non publié)",
    license: "Recherche",
    used: false,
    notes: "512×512, 40 FPS online. Expressions nuancées. Non commercialisé.",
  },
  {
    name: "StreamAvatar",
    type: "Diffusion streaming",
    latency: "Streaming",
    quality: "Très bonne",
    deployment: "Recherche",
    license: "Recherche",
    used: false,
    notes: "Décembre 2025. Modèle one-shot, génération parole et écoute naturelle.",
  },
];

const ttsComparison = [
  {
    name: "ElevenLabs",
    type: "Commercial",
    latency: "~200ms TTFA",
    quality: "Excellente",
    cloning: "Oui (court échantillon)",
    prosody: "Bonne",
    multilingual: true,
    sovereignty: false,
    notes: "Référence industrie. Clonage voix haute qualité. Coût élevé à l'échelle.",
  },
  {
    name: "Inworld TTS",
    type: "Commercial",
    latency: "130–250ms P90",
    quality: "Excellente",
    cloning: "Oui",
    prosody: "Très bonne",
    multilingual: true,
    sovereignty: false,
    notes: "ELO 1160 (Artificial Analysis 2026). Meilleur classement benchmarks indépendants.",
  },
  {
    name: "Cartesia",
    type: "Commercial",
    latency: "<100ms",
    quality: "Très bonne",
    cloning: "Oui",
    prosody: "Bonne",
    multilingual: true,
    sovereignty: false,
    notes: "Très faible latence. Bon rapport qualité/vitesse pour agents vocaux.",
  },
  {
    name: "Kokoro (OS)",
    type: "Open Source",
    latency: "<100ms",
    quality: "Bonne",
    cloning: "Non",
    prosody: "Limitée",
    multilingual: false,
    sovereignty: true,
    notes: "82M params, Apache 2.0. Très rapide, déploiement edge. Pas de clonage voix.",
  },
  {
    name: "XTTS-v2 (Coqui)",
    type: "Open Source",
    latency: "200–500ms",
    quality: "Bonne",
    cloning: "Oui (6s audio)",
    prosody: "Bonne",
    multilingual: true,
    sovereignty: true,
    notes: "Clonage voix depuis 6 secondes. Multilingue. Déploiement souverain possible.",
  },
  {
    name: "FishAudio S1-mini",
    type: "Open Source",
    latency: "300–600ms",
    quality: "Très bonne",
    cloning: "Oui (~10s audio)",
    prosody: "Très bonne",
    multilingual: true,
    sovereignty: true,
    notes: "0.5B params distillé. Expressif, contrôle émotion. 13 langues.",
  },
  {
    name: "Chatterbox-Turbo",
    type: "Open Source",
    latency: "<200ms",
    quality: "Très bonne",
    cloning: "Oui",
    prosody: "Bonne",
    multilingual: false,
    sovereignty: true,
    notes: "MIT. 350M params, 1-step decoder. Contrôle exagération émotionnelle. Benchmark favorable vs ElevenLabs.",
  },
];

const latencyBenchmarks = [
  { component: "ASR/STT (Deepgram low-latency)", best: 75, typical: 200, unit: "ms" },
  { component: "ASR/STT (Whisper local)", best: 200, typical: 500, unit: "ms" },
  { component: "LLM (GPT-4o streaming)", best: 350, typical: 800, unit: "ms" },
  { component: "LLM (SLM local quantifié)", best: 150, typical: 400, unit: "ms" },
  { component: "TTS (Cartesia streaming)", best: 80, typical: 150, unit: "ms" },
  { component: "TTS (ElevenLabs streaming)", best: 180, typical: 250, unit: "ms" },
  { component: "TTS (Kokoro local)", best: 60, typical: 120, unit: "ms" },
  { component: "Avatar (Beyond Presence)", best: 80, typical: 100, unit: "ms" },
  { component: "Avatar (HeyGen API)", best: 3000, typical: 8000, unit: "ms" },
  { component: "Avatar (HeyGem OS, GPU)", best: 2000, typical: 5000, unit: "ms" },
  { component: "Réseau (WebRTC)", best: 30, typical: 80, unit: "ms" },
];

const researchGaps = [
  {
    domain: "Mémoire conversationnelle",
    gap: "Pas de solution production-grade pour sessions 1h+ sans explosion tokens",
    sota: "Mem0 (-90% tokens, +26% précision) — mais pas validé pour avatars multi-sessions",
    opportunity: "Architecture 3 couches + distillation SLM spécifique à l'avatar",
    urgency: "Critique",
  },
  {
    domain: "Fidélité comportementale avatar",
    gap: "Avatars 'talking heads' sans langage corporel — uncanny valley de familiarité",
    sota: "VASA-1 (Microsoft) : 40 FPS, expressions nuancées — non commercialisé",
    opportunity: "Extraction comportementale depuis archives + génération corps cohérent",
    urgency: "Critique",
  },
  {
    domain: "TTS prosodique personnalisé",
    gap: "Cloner l'empreinte prosodique individuelle (rythme, emphase, pauses) reste difficile",
    sota: "FishAudio S1 : timbre + style depuis ~10s — mais prosodie profonde non capturée",
    opportunity: "Modèles prosodiques individuels depuis archives vidéo existantes",
    urgency: "Élevée",
  },
  {
    domain: "Latence avatar end-to-end",
    gap: "15–40s actuels vs <2s requis — goulot : génération vidéo avatar",
    sota: "Beyond Presence <100ms, NVIDIA ACE <100ms — mais infrastructure propriétaire",
    opportunity: "Distillation + cache intelligent + dégradation gracieuse sur GPU souverain",
    urgency: "Critique",
  },
  {
    domain: "Orchestration déterministe-organique",
    gap: "Équilibre contraintes narratives / liberté IA conversationnelle non résolu",
    sota: "Flowise + custom : possible mais fragile et technique",
    opportunity: "Éditeur de nœuds avec degrés de liberté configurables (0–100%)",
    urgency: "Élevée",
  },
  {
    domain: "Synchronisation multi-flux",
    gap: "<100ms désynchronisation entre 5 streams parallèles en conditions réelles",
    sota: "WebRTC + HLS + WebSocket — solutions partielles, pas de framework unifié",
    opportunity: "Protocole de synchronisation adaptatif basé sur 14 ans d'expertise Memoways",
    urgency: "Moyenne",
  },
];

const marketOpportunity = [
  { segment: "AI Avatar Market", value2025: "0.80B", value2032: "5.93B", cagr: "33.1%", source: "MarketsAndMarkets" },
  { segment: "Digital Human AI Avatars", value2025: "~9.7B", value2029: "+13.5B", cagr: "44%", source: "Technavio" },
  { segment: "Digital Human Market", value2026: "7.96B", value2031: "26.04B", cagr: "26.76%", source: "Mordor Intelligence" },
  { segment: "EdTech AI Avatars", value2025: "Émergent", value2029: "Fort", cagr: "N/A", source: "Secteur en formation" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScoreBar({ value, max = 10, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="latency-bar flex-1" style={{ height: "4px" }}>
        <div
          className="latency-fill"
          style={{ width: `${(value / max) * 100}%`, background: color }}
        />
      </div>
      <span className="text-xs font-mono text-slate-500 w-4">{value}</span>
    </div>
  );
}

type TabKey = "commercial" | "opensource" | "tts";

export default function StateOfArt() {
  const [activeTab, setActiveTab] = useState<TabKey>("commercial");

  return (
    <div className="min-h-screen pt-20">
      {/* Page header */}
      <div className="border-b border-slate-200 py-8">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">03</span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-mono text-slate-400">État de l'Art</span>
            </div>
            <h1
              className="text-3xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.025em" }}
            >
              État de l'Art & Analyse Comparative
            </h1>
            <p
              className="text-base text-slate-600 leading-relaxed"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              Cartographie des solutions existantes, benchmarks de latence, gaps de recherche et enjeux technologiques dans les domaines de la génération d'avatars conversationnels, de la mémoire IA et de la synthèse vocale expressive.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">

        {/* Comparatif outils */}
        <section className="mb-16">
          <SectionHeader
            number="01"
            title="Comparatif des Outils & Plateformes"
            subtitle="Évaluation des solutions existantes sur les critères clés pour DigiDouble."
            accent="cyan"
          />

          {/* Tabs */}
          <div className="flex gap-1 mb-6 border-b border-slate-200">
            {(["commercial", "opensource", "tts"] as TabKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                  activeTab === tab
                    ? "border-cyan-500 text-cyan-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {tab === "commercial" ? "Plateformes commerciales" : tab === "opensource" ? "Solutions open-source" : "TTS & Synthèse vocale"}
              </button>
            ))}
          </div>

          {/* Commercial platforms */}
          {activeTab === "commercial" && (
            <div>
              <div className="overflow-x-auto mb-6">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Plateforme</th>
                      <th>Temps réel</th>
                      <th>Corps</th>
                      <th>Conversation</th>
                      <th>Latence</th>
                      <th>Souveraineté</th>
                      <th>Censure</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commercialPlatforms.map((p) => (
                      <tr key={p.name}>
                        <td>
                          <div className="font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {p.name}
                          </div>
                          <div className="text-xs text-slate-400 font-mono">{p.category}</div>
                        </td>
                        <td>
                          <span style={{ color: p.realtime ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>
                            {p.realtime ? "✓" : "✗"}
                          </span>
                        </td>
                        <td>
                          <span className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {p.bodyLanguage}
                          </span>
                        </td>
                        <td>
                          <span style={{ color: p.conversation ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>
                            {p.conversation ? "✓" : "✗"}
                          </span>
                        </td>
                        <td>
                          <span className="text-xs font-mono text-slate-700">{p.latency}</span>
                        </td>
                        <td>
                          <span style={{ color: p.sovereignty ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>
                            {p.sovereignty ? "✓" : "✗"}
                          </span>
                        </td>
                        <td>
                          <span
                            className="text-xs"
                            style={{
                              color: p.censorship.includes("Élevé") ? "oklch(0.60 0.20 25)"
                                : p.censorship.includes("moyen") ? "oklch(0.75 0.16 75)"
                                : "oklch(0.65 0.18 145)",
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            {p.censorship}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Score cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {commercialPlatforms.map((p) => (
                  <div key={p.name} className="border border-slate-200 rounded p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div
                          className="font-semibold text-slate-900 text-sm"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {p.name}
                        </div>
                        <div className="text-xs text-slate-400 font-mono">{p.pricing}</div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          <span>Qualité</span>
                          <span>{p.score.quality}/10</span>
                        </div>
                        <ScoreBar value={p.score.quality} color="oklch(0.72 0.18 200)" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          <span>Latence</span>
                          <span>{p.score.latency}/10</span>
                        </div>
                        <ScoreBar value={p.score.latency} color="oklch(0.65 0.18 145)" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          <span>Coût/accessibilité</span>
                          <span>{p.score.cost}/10</span>
                        </div>
                        <ScoreBar value={p.score.cost} color="oklch(0.75 0.16 75)" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          <span>Souveraineté</span>
                          <span>{p.score.sovereignty}/10</span>
                        </div>
                        <ScoreBar value={p.score.sovereignty} color="oklch(0.72 0.18 50)" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {p.notes}
                    </p>
                  </div>
                ))}
              </div>

              {/* Radar diagram for commercial comparison */}
              <div className="mt-6">
                <h3
                  className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Vue radar — Comparatif multi-critères
                </h3>
                <div className="border border-slate-200 rounded p-4 bg-white">
                  <RadarCompareDiagram />
                </div>
              </div>
            </div>
          )}

          {/* Open source */}
          {activeTab === "opensource" && (
            <div>
              <div className="overflow-x-auto mb-4">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Outil</th>
                      <th>Type</th>
                      <th>Latence typique</th>
                      <th>Qualité</th>
                      <th>Déploiement</th>
                      <th>Licence</th>
                      <th>Utilisé par DD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openSourceSolutions.map((s) => (
                      <tr key={s.name}>
                        <td>
                          <div className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {s.name}
                          </div>
                        </td>
                        <td>
                          <span className="text-xs text-slate-600 font-mono">{s.type}</span>
                        </td>
                        <td>
                          <span
                            className="text-xs font-mono"
                            style={{
                              color: s.latency.includes("25ms") || s.latency.includes("500ms") ? "oklch(0.65 0.18 145)"
                                : s.latency.includes("5–15s") || s.latency.includes("2–10s") ? "oklch(0.60 0.20 25)"
                                : "oklch(0.75 0.16 75)",
                            }}
                          >
                            {s.latency}
                          </span>
                        </td>
                        <td>
                          <span className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {s.quality}
                          </span>
                        </td>
                        <td>
                          <span className="text-xs text-slate-500 font-mono">{s.deployment}</span>
                        </td>
                        <td>
                          <span className="text-xs text-slate-500 font-mono">{s.license}</span>
                        </td>
                        <td>
                          {s.used
                            ? <StatusBadge variant="available" label="OUI" />
                            : <span className="text-xs text-slate-300 font-mono">—</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="callout-info">
                <p className="text-sm text-slate-700" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  <strong>Note :</strong> Les solutions open-source permettent la souveraineté des données et l'absence de censure, au prix d'une infrastructure GPU propre et d'un investissement technique significatif. DigiDouble utilise HeyGem OS sur Exoscale (GPU suisse) avec un gain de 30% de performance via Arch Linux.
                </p>
              </div>
            </div>
          )}

          {/* TTS */}
          {activeTab === "tts" && (
            <div>
              <div className="overflow-x-auto mb-4">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Modèle TTS</th>
                      <th>Type</th>
                      <th>Latence TTFA</th>
                      <th>Qualité</th>
                      <th>Clonage voix</th>
                      <th>Prosodie</th>
                      <th>Multilingue</th>
                      <th>Souverain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ttsComparison.map((t) => (
                      <tr key={t.name}>
                        <td>
                          <div className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {t.name}
                          </div>
                        </td>
                        <td>
                          <StatusBadge
                            variant={t.type === "Commercial" ? "external" : "available"}
                            label={t.type}
                          />
                        </td>
                        <td>
                          <span
                            className="text-xs font-mono"
                            style={{
                              color: t.latency.includes("<100") || t.latency.includes("60") || t.latency.includes("80") ? "oklch(0.65 0.18 145)"
                                : t.latency.includes("200") || t.latency.includes("130") ? "oklch(0.75 0.16 75)"
                                : "oklch(0.60 0.20 25)",
                            }}
                          >
                            {t.latency}
                          </span>
                        </td>
                        <td className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.quality}</td>
                        <td className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.cloning}</td>
                        <td className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.prosody}</td>
                        <td>
                          <span style={{ color: t.multilingual ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>
                            {t.multilingual ? "✓" : "✗"}
                          </span>
                        </td>
                        <td>
                          <span style={{ color: t.sovereignty ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>
                            {t.sovereignty ? "✓" : "✗"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="callout-info">
                <p className="text-sm text-slate-700" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  <strong>Recommandation pour DigiDouble :</strong> Chatterbox-Turbo ou FishAudio S1-mini pour un déploiement souverain avec clonage voix. XTTS-v2 pour le multilingue (FR/EN/DE/IT). ElevenLabs comme référence de qualité pour les phases de validation.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Latency Benchmarks */}
        <section className="mb-16">
          <SectionHeader
            number="02"
            title="Benchmarks de Latence"
            subtitle="État de l'art des performances par composant du pipeline conversationnel (2025–2026)."
            accent="orange"
          />

          <div className="mb-4">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Composant</th>
                    <th>Best-case</th>
                    <th>Typique</th>
                    <th>Visualisation</th>
                    <th>Statut vs cible DigiDouble</th>
                  </tr>
                </thead>
                <tbody>
                  {latencyBenchmarks.map((b) => {
                    const target = b.component.includes("Avatar") ? 500 : b.component.includes("LLM") ? 500 : 300;
                    const isOnTarget = b.best <= target;
                    const maxDisplay = 10000;
                    return (
                      <tr key={b.component}>
                        <td className="text-sm font-medium text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {b.component}
                        </td>
                        <td>
                          <span
                            className="text-sm font-bold font-mono"
                            style={{ color: isOnTarget ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}
                          >
                            {b.best}{b.unit}
                          </span>
                        </td>
                        <td>
                          <span className="text-sm font-mono text-slate-500">
                            {b.typical}{b.unit}
                          </span>
                        </td>
                        <td className="w-40">
                          <div className="latency-bar">
                            <div
                              className="latency-fill"
                              style={{
                                width: `${Math.min((b.typical / maxDisplay) * 100, 100)}%`,
                                background: isOnTarget ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)",
                              }}
                            />
                          </div>
                        </td>
                        <td>
                          {isOnTarget
                            ? <StatusBadge variant="available" label="OK" />
                            : <StatusBadge variant="gap" label="À RÉDUIRE" />
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Latency benchmark diagram */}
          <div className="border border-slate-200 rounded p-4 bg-white mb-6">
            <LatencyBenchmarkDiagram />
          </div>

          <div className="callout-warning">
            <p className="text-sm font-semibold text-slate-800 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Analyse : le trilemme Qualité / Latence / Coût
            </p>
            <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
              Il est impossible d'optimiser simultanément les trois dimensions avec les approches actuelles. Les plateformes à faible latence (&lt;100ms) comme Beyond Presence ou NVIDIA ACE nécessitent une infrastructure propriétaire coûteuse. Les solutions open-source souveraines restent à 2–15s. La recherche fondamentale est nécessaire pour trouver des architectures permettant de briser ce trilemme.
            </p>
          </div>
        </section>

        {/* Research Gaps */}
        <section className="mb-16">
          <SectionHeader
            number="03"
            title="Gaps de Recherche & Opportunités"
            subtitle="Ce qui manque, ce qui existe, et où DigiDouble peut contribuer."
            accent="red"
          />

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Domaine</th>
                  <th>Gap identifié</th>
                  <th>Meilleur SOTA actuel</th>
                  <th>Opportunité DigiDouble</th>
                  <th>Urgence</th>
                </tr>
              </thead>
              <tbody>
                {researchGaps.map((g) => (
                  <tr key={g.domain}>
                    <td className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {g.domain}
                    </td>
                    <td className="text-xs text-slate-600 max-w-xs" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {g.gap}
                    </td>
                    <td className="text-xs text-slate-500 max-w-xs" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {g.sota}
                    </td>
                    <td className="text-xs max-w-xs" style={{ fontFamily: "'Source Serif 4', serif", color: "oklch(0.45 0.18 200)" }}>
                      {g.opportunity}
                    </td>
                    <td>
                      <StatusBadge
                        variant={g.urgency === "Critique" ? "gap" : g.urgency === "Élevée" ? "rd" : "target"}
                        label={g.urgency}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Research gap matrix */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3
                className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Matrice Urgence × Difficulté
              </h3>
              <div className="border border-slate-200 rounded p-4 bg-white">
                <ResearchGapDiagram />
              </div>
            </div>
            <div>
              <h3
                className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Comparatif Radar — Plateformes
              </h3>
              <div className="border border-slate-200 rounded p-4 bg-white">
                <RadarCompareDiagram />
              </div>
            </div>
          </div>
        </section>

        {/* Research Assessment */}
        <section className="mb-16">
          <SectionHeader
            number="04"
            title="Assessment de la Recherche Académique"
            subtitle="État des publications et travaux récents dans les domaines clés (2023–2026)."
            accent="cyan"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {/* Memory research */}
            <div className="border border-slate-200 rounded p-5">
              <div
                className="text-xs font-bold mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 200)" }}
              >
                DOMAINE A — Mémoire Conversationnelle
              </div>
              <div className="space-y-3">
                {[
                  {
                    ref: "LoCoMo (Snap Research, 2024)",
                    venue: "arXiv:2402.17753",
                    desc: "Benchmark machine-humain pour dialogues très long-terme. Pipeline de génération de dialogues de haute qualité. Référence pour l'évaluation.",
                    relevance: "Haute",
                  },
                  {
                    ref: "LongMemEval (2024)",
                    venue: "arXiv:2410.10813",
                    desc: "Benchmark pour capacités mémoire long-terme des assistants LLM. Ouvre la voie vers des assistants plus personnalisés.",
                    relevance: "Haute",
                  },
                  {
                    ref: "Mem0 (2025)",
                    venue: "arXiv:2504.19413",
                    desc: "+26% précision, -91% latence, -90% tokens vs baseline. Mémoire structurée persistante pour agents IA.",
                    relevance: "Très haute",
                  },
                  {
                    ref: "RAG-Driven Memory (IEEE, 2025)",
                    venue: "IEEE Access",
                    desc: "Revue des architectures mémoire RAG pour LLM conversationnels. Synthèse des approches vector DB.",
                    relevance: "Haute",
                  },
                  {
                    ref: "Conversational Agents: From RAG to LTM",
                    venue: "ACM, 2025",
                    desc: "Transition des approches RAG vers la mémoire long-terme. Gestion mémoire agentique via RL.",
                    relevance: "Haute",
                  },
                ].map((paper) => (
                  <div key={paper.ref} className="border-l-2 pl-3" style={{ borderColor: "oklch(0.72 0.18 200 / 0.3)" }}>
                    <div className="font-medium text-slate-900 text-xs mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {paper.ref}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mb-1">{paper.venue}</div>
                    <p className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {paper.desc}
                    </p>
                    <div className="mt-1">
                      <StatusBadge variant="rd" label={`Pertinence: ${paper.relevance}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avatar & TTS research */}
            <div className="border border-slate-200 rounded p-5">
              <div
                className="text-xs font-bold mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 50)" }}
              >
                DOMAINE B — Avatar & Synthèse Vocale
              </div>
              <div className="space-y-3">
                {[
                  {
                    ref: "VASA-1 (Microsoft, 2024)",
                    venue: "NeurIPS 2024",
                    desc: "Visages parlants photorealistic avec expressions nuancées. 40 FPS online, 512×512. Non commercialisé — risque de non-publication complète.",
                    relevance: "Très haute",
                  },
                  {
                    ref: "A²-LLM (2026)",
                    venue: "arXiv:2602.04913",
                    desc: "LLM audio-avatar end-to-end. Mouvements faciaux émotionnellement riches au-delà du lip-sync. Architecture 8B + 0.16B LoRA.",
                    relevance: "Très haute",
                  },
                  {
                    ref: "Hi-Reco (HKUST, 2025)",
                    venue: "Conférence",
                    desc: "Humain numérique complet : avatar 3D + parole expressive + dialogue grounded. Approche intégrée rare.",
                    relevance: "Haute",
                  },
                  {
                    ref: "Survey Talking Head (ACM, 2025)",
                    venue: "ACM Computing Surveys",
                    desc: "Revue complète des techniques de synthèse talking head. Trilemme temps réel / expressivité / qualité documenté.",
                    relevance: "Haute",
                  },
                  {
                    ref: "EmergentTTS-Eval (NeurIPS, 2025)",
                    venue: "NeurIPS 2025",
                    desc: "Benchmark pour contrôle de style complexe en TTS. Évalue 11Labs, Deepgram, OpenAI 4o-mini-TTS.",
                    relevance: "Haute",
                  },
                  {
                    ref: "PerTTS (2026)",
                    venue: "ResearchGate",
                    desc: "TTS spontané personnalisé et contrôlable zero-shot. Encodeur style de parole + encodeur prosodie locale.",
                    relevance: "Très haute",
                  },
                ].map((paper) => (
                  <div key={paper.ref} className="border-l-2 pl-3" style={{ borderColor: "oklch(0.72 0.18 50 / 0.3)" }}>
                    <div className="font-medium text-slate-900 text-xs mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {paper.ref}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mb-1">{paper.venue}</div>
                    <p className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {paper.desc}
                    </p>
                    <div className="mt-1">
                      <StatusBadge variant="rd" label={`Pertinence: ${paper.relevance}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Market & Business */}
        <section className="mb-16">
          <SectionHeader
            number="05"
            title="Enjeux Business & Opportunités de Marché"
            subtitle="Contexte économique et positionnement stratégique."
            accent="green"
          />

          <div className="overflow-x-auto mb-6">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Segment</th>
                  <th>Valeur 2025</th>
                  <th>Valeur cible</th>
                  <th>CAGR</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {marketOpportunity.map((m) => (
                  <tr key={m.segment}>
                    <td className="font-medium text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {m.segment}
                    </td>
                    <td>
                      <span className="text-sm font-bold font-mono" style={{ color: "oklch(0.72 0.18 200)" }}>
                        {m.value2025}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm font-mono text-slate-700">
                        {m.value2032 || m.value2029 || m.value2031 || m.value2026}
                      </span>
                    </td>
                    <td>
                      <span
                        className="text-sm font-bold font-mono"
                        style={{ color: "oklch(0.65 0.18 145)" }}
                      >
                        {m.cagr}
                      </span>
                    </td>
                    <td className="text-xs text-slate-400 font-mono">{m.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              {
                title: "Enjeu souveraineté",
                color: "oklch(0.72 0.18 200)",
                items: [
                  "Censure arbitraire des plateformes US (incident OpenAI/AVA)",
                  "RGPD et localisation des données en Europe",
                  "Dépendance aux APIs = fragilité et coût imprévisible",
                  "Infrastructure suisse (Exoscale) comme avantage compétitif",
                ],
              },
              {
                title: "Enjeu technologique",
                color: "oklch(0.72 0.18 50)",
                items: [
                  "Réduction 10–20× de la latence end-to-end",
                  "Mémoire conversationnelle sans explosion des coûts",
                  "Fidélité comportementale au-delà du lip-sync",
                  "Synchronisation multi-flux temps réel (<100ms)",
                ],
              },
              {
                title: "Enjeu marché",
                color: "oklch(0.65 0.18 145)",
                items: [
                  "Marché EdTech : 78% enseignants utilisent déjà l'IA",
                  "Demande forte pour personnalisation à l'échelle",
                  "Cinéma interactif : nouveau format narratif émergent",
                  "Formation corporate : ROI mesurable sur engagement",
                ],
              },
            ].map((section) => (
              <div key={section.title} className="border border-slate-200 rounded p-4">
                <div
                  className="text-xs font-bold mb-3 uppercase tracking-wider"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: section.color }}
                >
                  {section.title}
                </div>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div key={item} className="flex gap-2">
                      <span className="text-xs mt-0.5 shrink-0" style={{ color: section.color }}>·</span>
                      <span className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="callout-success">
            <p className="text-sm font-semibold text-slate-800 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Validité de l'intérêt pour la recherche
            </p>
            <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
              La combinaison unique que vise DigiDouble — conversation IA + avatar photorealistic + séquençage vidéo intelligent + contrôle narratif/pédagogique + souveraineté — n'existe dans aucune solution commerciale ou open-source actuelle. Les gaps identifiés (mémoire long-terme, fidélité comportementale, latence avatar) correspondent précisément aux frontières de la recherche académique actuelle, ce qui justifie pleinement une collaboration avec l'IDIAP dans le cadre d'Innosuisse.
            </p>
          </div>
        </section>

        {/* Technology Stack Recommendations */}
        <section className="mb-16">
          <SectionHeader
            number="06"
            title="Technologies Recommandées"
            subtitle="Stack cible pour l'architecture DigiDouble Phase 2."
            accent="cyan"
          />

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Couche</th>
                  <th>Technologie recommandée</th>
                  <th>Alternative</th>
                  <th>Latence cible</th>
                  <th>Souverain</th>
                  <th>Justification</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    layer: "ASR/STT",
                    primary: "Audiogami (Gamilab)",
                    alt: "Whisper local quantifié",
                    latency: "300ms",
                    sovereign: true,
                    reason: "Déjà opérationnel, hébergé en Suisse, HITL optionnel",
                  },
                  {
                    layer: "LLM Orchestration",
                    primary: "SLM distillé (Llama 3.1 8B quantifié)",
                    alt: "GPT-4o streaming (transition)",
                    latency: "200–400ms",
                    sovereign: true,
                    reason: "Distillation pour personnalité avatar. RAG pour contexte dynamique.",
                  },
                  {
                    layer: "Mémoire / RAG",
                    primary: "Mem0 + pgvector",
                    alt: "Qdrant + PostgreSQL",
                    latency: "50–100ms",
                    sovereign: true,
                    reason: "-90% tokens, architecture 3 couches. Déploiement self-hosted.",
                  },
                  {
                    layer: "TTS",
                    primary: "Chatterbox-Turbo / FishAudio S1-mini",
                    alt: "XTTS-v2 (multilingue)",
                    latency: "<200ms",
                    sovereign: true,
                    reason: "Open-source, clonage voix, contrôle prosodique. MIT/Apache 2.0.",
                  },
                  {
                    layer: "Avatar génération",
                    primary: "Architecture R&D (IDIAP + distillation)",
                    alt: "HeyGem OS (phase transition)",
                    latency: "<500ms (cible)",
                    sovereign: true,
                    reason: "Goulot principal. Nécessite R&D fondamentale. HeyGem OS en attendant.",
                  },
                  {
                    layer: "Streaming / Transport",
                    primary: "WebRTC + WebSocket",
                    alt: "HLS pour vidéo pré-enregistrée",
                    latency: "30–80ms",
                    sovereign: true,
                    reason: "Standard industrie pour temps réel. Expertise Memoways.",
                  },
                  {
                    layer: "Infrastructure GPU",
                    primary: "Exoscale (Suisse)",
                    alt: "OVH / Scaleway (EU)",
                    latency: "N/A",
                    sovereign: true,
                    reason: "Souveraineté données, RGPD, partenariat existant.",
                  },
                ].map((row) => (
                  <tr key={row.layer}>
                    <td className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {row.layer}
                    </td>
                    <td className="text-sm text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {row.primary}
                    </td>
                    <td className="text-xs text-slate-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {row.alt}
                    </td>
                    <td>
                      <span
                        className="text-xs font-bold font-mono"
                        style={{ color: "oklch(0.65 0.18 145)" }}
                      >
                        {row.latency}
                      </span>
                    </td>
                    <td>
                      <span style={{ color: row.sovereign ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>
                        {row.sovereign ? "✓" : "✗"}
                      </span>
                    </td>
                    <td className="text-xs text-slate-500 max-w-xs" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {row.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
