/*
 * StateOfArt — DigiDouble Research Portal
 * Page: State of the Art — Existing solutions, benchmarks, challenges
 * Design: Technical Blueprint, dense comparative tables, visual benchmarks
 * i18n: EN (default) / FR via LangContext
 */
import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";
import LatencyBenchmarkDiagram from "@/components/diagrams/LatencyBenchmarkDiagram";
import RadarCompareDiagram from "@/components/diagrams/RadarCompareDiagram";
import ResearchGapDiagram from "@/components/diagrams/ResearchGapDiagram";
import { useLang } from "@/contexts/LangContext";

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScoreBar({ value, max = 10, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="latency-bar flex-1" style={{ height: "4px" }}>
        <div className="latency-fill" style={{ width: `${(value / max) * 100}%`, background: color }} />
      </div>
      <span className="text-xs font-mono text-slate-500 w-4">{value}</span>
    </div>
  );
}

type TabKey = "commercial" | "opensource" | "tts";

export default function StateOfArt() {
  const [activeTab, setActiveTab] = useState<TabKey>("commercial");
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  // ─── Data (translated) ──────────────────────────────────────────────────────

  const commercialPlatforms = [
    {
      name: "HeyGen",
      category: isFr ? "Avatar commercial" : "Commercial avatar",
      realtime: true,
      bodyLanguage: isFr ? "Partiel" : "Partial",
      conversation: false,
      sovereignty: false,
      latency: "2–5s (streaming)",
      pricing: isFr ? "Élevé" : "High",
      censorship: isFr ? "Risque élevé" : "High risk",
      notes: isFr
        ? "Leader marché. Streaming temps réel. Censure contenu sensible. Pas de souveraineté données."
        : "Market leader. Real-time streaming. Sensitive content censorship. No data sovereignty.",
      strengths: isFr
        ? ["Qualité visuelle élevée", "API bien documentée", "Streaming temps réel"]
        : ["High visual quality", "Well-documented API", "Real-time streaming"],
      weaknesses: isFr
        ? ["Censure arbitraire", "Coût élevé à l'échelle", "Pas de mémoire conversationnelle", "Dépendance US"]
        : ["Arbitrary censorship", "High cost at scale", "No conversational memory", "US dependency"],
      score: { quality: 9, latency: 7, cost: 3, sovereignty: 1 },
    },
    {
      name: "Synthesia",
      category: isFr ? "Avatar corporate" : "Corporate avatar",
      realtime: false,
      bodyLanguage: isFr ? "Non" : "No",
      conversation: false,
      sovereignty: false,
      latency: isFr ? "Minutes (pré-rendu)" : "Minutes (pre-render)",
      pricing: isFr ? "Moyen-élevé" : "Medium-high",
      censorship: isFr ? "Risque élevé" : "High risk",
      notes: isFr
        ? "Focus corporate, pré-rendu uniquement. Pas de conversation temps réel. Haute qualité visuelle."
        : "Corporate focus, pre-render only. No real-time conversation. High visual quality.",
      strengths: isFr
        ? ["Interface créateur simple", "Qualité visuelle stable", "Nombreux avatars"]
        : ["Simple creator interface", "Stable visual quality", "Many avatars"],
      weaknesses: isFr
        ? ["Pas de temps réel", "Pas de conversation", "Censure", "Pas de personnalisation profonde"]
        : ["No real-time", "No conversation", "Censorship", "No deep personalization"],
      score: { quality: 8, latency: 1, cost: 5, sovereignty: 1 },
    },
    {
      name: "D-ID",
      category: isFr ? "Animation faciale" : "Facial animation",
      realtime: true,
      bodyLanguage: isFr ? "Non" : "No",
      conversation: false,
      sovereignty: false,
      latency: "500ms–2s",
      pricing: isFr ? "Moyen" : "Medium",
      censorship: isFr ? "Risque moyen" : "Medium risk",
      notes: isFr
        ? "Animation faciale depuis image statique. Lip-sync temps réel capable. Qualité inférieure à HeyGen."
        : "Facial animation from static image. Real-time lip-sync capable. Lower quality than HeyGen.",
      strengths: isFr
        ? ["API accessible", "Lip-sync temps réel", "Depuis image statique"]
        : ["Accessible API", "Real-time lip-sync", "From static image"],
      weaknesses: isFr
        ? ["Qualité inférieure", "Visage uniquement", "Pas de mémoire"]
        : ["Lower quality", "Face only", "No memory"],
      score: { quality: 6, latency: 7, cost: 6, sovereignty: 2 },
    },
    {
      name: "Beyond Presence (Genesis 2.0)",
      category: isFr ? "Avatar enterprise" : "Enterprise avatar",
      realtime: true,
      bodyLanguage: isFr ? "Partiel" : "Partial",
      conversation: false,
      sovereignty: false,
      latency: "<100ms",
      pricing: "Enterprise",
      censorship: isFr ? "Risque moyen" : "Medium risk",
      notes: isFr
        ? "Latence <100ms, hyper-réaliste. Streaming inference. Focus enterprise. Pas de contrôle narratif."
        : "<100ms latency, hyper-realistic. Streaming inference. Enterprise focus. No narrative control.",
      strengths: isFr
        ? ["<100ms latence", "Hyper-réaliste", "Streaming continu"]
        : ["<100ms latency", "Hyper-realistic", "Continuous streaming"],
      weaknesses: isFr
        ? ["Pas de contrôle narratif", "Coût enterprise", "Pas de souveraineté"]
        : ["No narrative control", "Enterprise cost", "No sovereignty"],
      score: { quality: 9, latency: 10, cost: 2, sovereignty: 2 },
    },
    {
      name: "NVIDIA ACE",
      category: isFr ? "Suite gaming" : "Gaming suite",
      realtime: true,
      bodyLanguage: isFr ? "Oui" : "Yes",
      conversation: true,
      sovereignty: false,
      latency: "<100ms",
      pricing: isFr ? "Infrastructure NVIDIA" : "NVIDIA Infrastructure",
      censorship: isFr ? "Faible" : "Low",
      notes: isFr
        ? "Suite complète (Riva ASR, Audio2Face, NeMo LLM). <100ms pour gaming. Nécessite infrastructure NVIDIA."
        : "Full suite (Riva ASR, Audio2Face, NeMo LLM). <100ms for gaming. Requires NVIDIA infrastructure.",
      strengths: isFr
        ? ["<100ms latence", "Suite complète", "Langage corporel", "Conversation"]
        : ["<100ms latency", "Full suite", "Body language", "Conversation"],
      weaknesses: isFr
        ? ["Lock-in NVIDIA", "Coût infrastructure", "Pas souverain", "Complexité déploiement"]
        : ["NVIDIA lock-in", "Infrastructure cost", "Not sovereign", "Deployment complexity"],
      score: { quality: 9, latency: 10, cost: 2, sovereignty: 3 },
    },
    {
      name: "Character.ai / TalkingMachines",
      category: "Entertainment",
      realtime: true,
      bodyLanguage: isFr ? "Partiel" : "Partial",
      conversation: true,
      sovereignty: false,
      latency: "1–3s",
      pricing: "B2C",
      censorship: isFr ? "Élevé" : "High",
      notes: isFr
        ? "Diffusion autorégressive pour vidéo temps réel (2025). Focus entertainment. Censure forte."
        : "Autoregressive diffusion for real-time video (2025). Entertainment focus. Strong censorship.",
      strengths: isFr
        ? ["Conversation intégrée", "Temps réel", "Large base utilisateurs"]
        : ["Integrated conversation", "Real-time", "Large user base"],
      weaknesses: isFr
        ? ["Censure très forte", "Pas de contrôle créateur", "Pas d'usage professionnel"]
        : ["Very strong censorship", "No creator control", "No professional use"],
      score: { quality: 7, latency: 6, cost: 7, sovereignty: 1 },
    },
  ];

  const openSourceSolutions = [
    {
      name: "HeyGem OS",
      type: "Avatar",
      latency: "5–15s",
      quality: isFr ? "Bonne" : "Good",
      deployment: "Docker (3 containers)",
      license: "Open Source",
      used: true,
      notes: isFr
        ? "Utilisé par DigiDouble sur Exoscale. Gain 30% perf avec Arch Linux vs Ubuntu."
        : "Used by DigiDouble on Exoscale. 30% perf gain with Arch Linux vs Ubuntu.",
    },
    {
      name: "SadTalker",
      type: "Talking Head",
      latency: "2–10s",
      quality: isFr ? "Bonne" : "Good",
      deployment: "Python/GPU",
      license: "MIT",
      used: false,
      notes: isFr
        ? "CVPR 2023. Coefficients 3D depuis audio. Bon rapport qualité/performance."
        : "CVPR 2023. 3D coefficients from audio. Good quality/performance ratio.",
    },
    {
      name: "LivePortrait",
      type: isFr ? "Animation faciale" : "Facial animation",
      latency: "1–3s",
      quality: isFr ? "Très bonne" : "Very good",
      deployment: "Python/GPU",
      license: "MIT",
      used: false,
      notes: isFr
        ? "Animation haute fidélité depuis image unique. Pas de génération audio."
        : "High-fidelity animation from single image. No audio generation.",
    },
    {
      name: "Wav2Lip",
      type: "Lip-sync",
      latency: "500ms–2s",
      quality: isFr ? "Moyenne" : "Average",
      deployment: "Python/GPU",
      license: "MIT",
      used: false,
      notes: isFr
        ? "Lip-sync précis mais expressions limitées. Visage uniquement."
        : "Precise lip-sync but limited expressions. Face only.",
    },
    {
      name: "VASA-1 (Microsoft)",
      type: "Talking Face",
      latency: "25ms/frame (40 FPS)",
      quality: isFr ? "Excellente" : "Excellent",
      deployment: isFr ? "Recherche (non publié)" : "Research (unpublished)",
      license: isFr ? "Recherche" : "Research",
      used: false,
      notes: isFr
        ? "512×512, 40 FPS online. Expressions nuancées. Non commercialisé."
        : "512×512, 40 FPS online. Nuanced expressions. Not commercialized.",
    },
    {
      name: "StreamAvatar",
      type: isFr ? "Diffusion streaming" : "Streaming diffusion",
      latency: "Streaming",
      quality: isFr ? "Très bonne" : "Very good",
      deployment: isFr ? "Recherche" : "Research",
      license: isFr ? "Recherche" : "Research",
      used: false,
      notes: isFr
        ? "Décembre 2025. Modèle one-shot, génération parole et écoute naturelle."
        : "December 2025. One-shot model, natural speech generation and listening.",
    },
  ];

  const ttsComparison = [
    {
      name: "ElevenLabs",
      type: isFr ? "Commercial" : "Commercial",
      latency: "~200ms TTFA",
      quality: isFr ? "Excellente" : "Excellent",
      cloning: isFr ? "Oui (court échantillon)" : "Yes (short sample)",
      prosody: isFr ? "Bonne" : "Good",
      multilingual: true,
      sovereignty: false,
      notes: isFr
        ? "Référence industrie. Clonage voix haute qualité. Coût élevé à l'échelle."
        : "Industry reference. High-quality voice cloning. High cost at scale.",
    },
    {
      name: "Inworld TTS",
      type: isFr ? "Commercial" : "Commercial",
      latency: "130–250ms P90",
      quality: isFr ? "Excellente" : "Excellent",
      cloning: isFr ? "Oui" : "Yes",
      prosody: isFr ? "Très bonne" : "Very good",
      multilingual: true,
      sovereignty: false,
      notes: isFr
        ? "ELO 1160 (Artificial Analysis 2026). Meilleur classement benchmarks indépendants."
        : "ELO 1160 (Artificial Analysis 2026). Top ranking in independent benchmarks.",
    },
    {
      name: "Cartesia",
      type: isFr ? "Commercial" : "Commercial",
      latency: "<100ms",
      quality: isFr ? "Très bonne" : "Very good",
      cloning: isFr ? "Oui" : "Yes",
      prosody: isFr ? "Bonne" : "Good",
      multilingual: true,
      sovereignty: false,
      notes: isFr
        ? "Très faible latence. Bon rapport qualité/vitesse pour agents vocaux."
        : "Very low latency. Good quality/speed ratio for voice agents.",
    },
    {
      name: "Kokoro (OS)",
      type: "Open Source",
      latency: "<100ms",
      quality: isFr ? "Bonne" : "Good",
      cloning: isFr ? "Non" : "No",
      prosody: isFr ? "Limitée" : "Limited",
      multilingual: false,
      sovereignty: true,
      notes: isFr
        ? "82M params, Apache 2.0. Très rapide, déploiement edge. Pas de clonage voix."
        : "82M params, Apache 2.0. Very fast, edge deployment. No voice cloning.",
    },
    {
      name: "XTTS-v2 (Coqui)",
      type: "Open Source",
      latency: "200–500ms",
      quality: isFr ? "Bonne" : "Good",
      cloning: isFr ? "Oui (6s audio)" : "Yes (6s audio)",
      prosody: isFr ? "Bonne" : "Good",
      multilingual: true,
      sovereignty: true,
      notes: isFr
        ? "Clonage voix depuis 6 secondes. Multilingue. Déploiement souverain possible."
        : "Voice cloning from 6 seconds. Multilingual. Sovereign deployment possible.",
    },
    {
      name: "FishAudio S1-mini",
      type: "Open Source",
      latency: "300–600ms",
      quality: isFr ? "Très bonne" : "Very good",
      cloning: isFr ? "Oui (~10s audio)" : "Yes (~10s audio)",
      prosody: isFr ? "Très bonne" : "Very good",
      multilingual: true,
      sovereignty: true,
      notes: isFr
        ? "0.5B params distillé. Expressif, contrôle émotion. 13 langues."
        : "0.5B distilled params. Expressive, emotion control. 13 languages.",
    },
    {
      name: "Chatterbox-Turbo",
      type: "Open Source",
      latency: "<200ms",
      quality: isFr ? "Très bonne" : "Very good",
      cloning: isFr ? "Oui" : "Yes",
      prosody: isFr ? "Bonne" : "Good",
      multilingual: false,
      sovereignty: true,
      notes: isFr
        ? "MIT. 350M params, 1-step decoder. Contrôle exagération émotionnelle. Benchmark favorable vs ElevenLabs."
        : "MIT. 350M params, 1-step decoder. Emotional exaggeration control. Favorable benchmark vs ElevenLabs.",
    },
  ];

  const latencyBenchmarks = [
    { component: isFr ? "ASR/STT (Deepgram low-latency)" : "ASR/STT (Deepgram low-latency)", best: 75, typical: 200, unit: "ms" },
    { component: isFr ? "ASR/STT (Whisper local)" : "ASR/STT (Whisper local)", best: 200, typical: 500, unit: "ms" },
    { component: isFr ? "LLM (GPT-4o streaming)" : "LLM (GPT-4o streaming)", best: 350, typical: 800, unit: "ms" },
    { component: isFr ? "LLM (SLM local quantifié)" : "LLM (quantized local SLM)", best: 150, typical: 400, unit: "ms" },
    { component: isFr ? "TTS (Cartesia streaming)" : "TTS (Cartesia streaming)", best: 80, typical: 150, unit: "ms" },
    { component: isFr ? "TTS (ElevenLabs streaming)" : "TTS (ElevenLabs streaming)", best: 180, typical: 250, unit: "ms" },
    { component: isFr ? "TTS (Kokoro local)" : "TTS (Kokoro local)", best: 60, typical: 120, unit: "ms" },
    { component: isFr ? "Avatar (Beyond Presence)" : "Avatar (Beyond Presence)", best: 80, typical: 100, unit: "ms" },
    { component: isFr ? "Avatar (HeyGen API)" : "Avatar (HeyGen API)", best: 3000, typical: 8000, unit: "ms" },
    { component: isFr ? "Avatar (HeyGem OS, GPU)" : "Avatar (HeyGem OS, GPU)", best: 2000, typical: 5000, unit: "ms" },
    { component: isFr ? "Réseau (WebRTC)" : "Network (WebRTC)", best: 30, typical: 80, unit: "ms" },
  ];

  const researchGaps = [
    {
      domain: isFr ? "Mémoire conversationnelle" : "Conversational memory",
      gap: isFr
        ? "Pas de solution production-grade pour sessions 1h+ sans explosion tokens"
        : "No production-grade solution for 1h+ sessions without token explosion",
      sota: isFr
        ? "Mem0 (-90% tokens, +26% précision) — mais pas validé pour avatars multi-sessions"
        : "Mem0 (-90% tokens, +26% accuracy) — but not validated for multi-session avatars",
      opportunity: isFr
        ? "Architecture 3 couches + distillation SLM spécifique à l'avatar"
        : "3-layer architecture + avatar-specific SLM distillation",
      urgency: isFr ? "Critique" : "Critical",
    },
    {
      domain: isFr ? "Fidélité comportementale avatar" : "Avatar behavioral fidelity",
      gap: isFr
        ? "Avatars 'talking heads' sans langage corporel — uncanny valley de familiarité"
        : "'Talking heads' avatars without body language — familiarity uncanny valley",
      sota: isFr
        ? "VASA-1 (Microsoft) : 40 FPS, expressions nuancées — non commercialisé"
        : "VASA-1 (Microsoft): 40 FPS, nuanced expressions — not commercialized",
      opportunity: isFr
        ? "Extraction comportementale depuis archives + génération corps cohérent"
        : "Behavioral extraction from archives + coherent body generation",
      urgency: isFr ? "Critique" : "Critical",
    },
    {
      domain: isFr ? "TTS prosodique personnalisé" : "Personalized prosodic TTS",
      gap: isFr
        ? "Cloner l'empreinte prosodique individuelle (rythme, emphase, pauses) reste difficile"
        : "Cloning individual prosodic fingerprint (rhythm, emphasis, pauses) remains difficult",
      sota: isFr
        ? "FishAudio S1 : timbre + style depuis ~10s — mais prosodie profonde non capturée"
        : "FishAudio S1: timbre + style from ~10s — but deep prosody not captured",
      opportunity: isFr
        ? "Modèles prosodiques individuels depuis archives vidéo existantes"
        : "Individual prosodic models from existing video archives",
      urgency: isFr ? "Élevée" : "High",
    },
    {
      domain: isFr ? "Latence avatar end-to-end" : "End-to-end avatar latency",
      gap: isFr
        ? "6–12s actuels vs <2s requis — goulot : génération vidéo avatar"
        : "Current 6–12s vs <2s required — bottleneck: avatar video generation",
      sota: isFr
        ? "Beyond Presence <100ms, NVIDIA ACE <100ms — mais infrastructure propriétaire"
        : "Beyond Presence <100ms, NVIDIA ACE <100ms — but proprietary infrastructure",
      opportunity: isFr
        ? "Distillation + cache intelligent + dégradation gracieuse sur GPU souverain"
        : "Distillation + intelligent cache + graceful degradation on sovereign GPU",
      urgency: isFr ? "Critique" : "Critical",
    },
    {
      domain: isFr ? "Orchestration déterministe-organique" : "Deterministic-organic orchestration",
      gap: isFr
        ? "Équilibre contraintes narratives / liberté IA conversationnelle non résolu"
        : "Balance between narrative constraints / conversational AI freedom unresolved",
      sota: isFr
        ? "Flowise + custom : possible mais fragile et technique"
        : "Flowise + custom: possible but fragile and technical",
      opportunity: isFr
        ? "Éditeur de nœuds avec degrés de liberté configurables (0–100%)"
        : "Node editor with configurable degrees of freedom (0–100%)",
      urgency: isFr ? "Élevée" : "High",
    },
    {
      domain: isFr ? "Synchronisation multi-flux" : "Multi-stream synchronization",
      gap: isFr
        ? "<100ms désynchronisation entre 5 streams parallèles en conditions réelles"
        : "<100ms desynchronization between 5 parallel streams in real conditions",
      sota: isFr
        ? "WebRTC + HLS + WebSocket — solutions partielles, pas de framework unifié"
        : "WebRTC + HLS + WebSocket — partial solutions, no unified framework",
      opportunity: isFr
        ? "Protocole de synchronisation adaptatif basé sur 14 ans d'expertise Memoways"
        : "Adaptive synchronization protocol based on 14 years of Memoways expertise",
      urgency: isFr ? "Moyenne" : "Medium",
    },
  ];

  const marketOpportunity = [
    { segment: "AI Avatar Market", value2025: "$0.80B", valueTarget: "$5.93B (2032)", cagr: "33.1%", source: "MarketsAndMarkets" },
    { segment: "Digital Human AI Avatars", value2025: "~$9.7B", valueTarget: "+$13.5B (2029)", cagr: "44%", source: "Technavio" },
    { segment: "Digital Human Market", value2025: "$7.96B", valueTarget: "$26.04B (2031)", cagr: "26.76%", source: "Mordor Intelligence" },
    { segment: "EdTech AI Avatars", value2025: isFr ? "Émergent" : "Emerging", valueTarget: isFr ? "Fort (2029)" : "Strong (2029)", cagr: "N/A", source: isFr ? "Secteur en formation" : "Forming sector" },
  ];

  const businessChallenges = [
    {
      title: isFr ? "Enjeu souveraineté" : "Sovereignty challenge",
      color: "oklch(0.72 0.18 200)",
      items: isFr
        ? [
            "Censure arbitraire des plateformes US (incident OpenAI/AVA)",
            "RGPD et localisation des données en Europe",
            "Dépendance aux APIs = fragilité et coût imprévisible",
            "Infrastructure suisse (Exoscale) comme avantage compétitif",
          ]
        : [
            "Arbitrary censorship by US platforms (OpenAI/AVA incident)",
            "GDPR and data localization in Europe",
            "API dependency = fragility and unpredictable cost",
            "Swiss infrastructure (Exoscale) as competitive advantage",
          ],
    },
    {
      title: isFr ? "Enjeu technologique" : "Technology challenge",
      color: "oklch(0.72 0.18 50)",
      items: isFr
        ? [
            "Réduction 6–10× de la latence end-to-end (estimé depuis tests partiels)",
            "Mémoire conversationnelle sans explosion des coûts",
            "Fidélité comportementale au-delà du lip-sync",
            "Synchronisation multi-flux temps réel (<100ms)",
          ]
        : [
            "6–10× reduction in end-to-end latency (extrapolated from partial tests)",
            "Conversational memory without cost explosion",
            "Behavioral fidelity beyond lip-sync",
            "Real-time multi-stream synchronization (<100ms)",
          ],
    },
    {
      title: isFr ? "Enjeu marché" : "Market challenge",
      color: "oklch(0.65 0.18 145)",
      items: isFr
        ? [
            "Marché EdTech : 78% enseignants utilisent déjà l'IA",
            "Demande forte pour personnalisation à l'échelle",
            "Cinéma interactif : nouveau format narratif émergent",
            "Formation corporate : ROI mesurable sur engagement",
          ]
        : [
            "EdTech market: 78% of teachers already use AI",
            "Strong demand for personalization at scale",
            "Interactive cinema: emerging new narrative format",
            "Corporate training: measurable ROI on engagement",
          ],
    },
  ];

  const techStackRows = [
    {
      layer: "ASR/STT",
      primary: "Audiogami (Gamilab)",
      alt: isFr ? "Whisper local quantifié" : "Quantized local Whisper",
      latency: "300ms",
      sovereign: true,
      reason: isFr ? "Déjà opérationnel, hébergé en Suisse, HITL optionnel" : "Already operational, Swiss-hosted, optional HITL",
    },
    {
      layer: "LLM Orchestration",
      primary: isFr ? "SLM distillé (Llama 3.1 8B quantifié)" : "Distilled SLM (quantized Llama 3.1 8B)",
      alt: isFr ? "GPT-4o streaming (transition)" : "GPT-4o streaming (transition)",
      latency: "200–400ms",
      sovereign: true,
      reason: isFr ? "Distillation pour personnalité avatar. RAG pour contexte dynamique." : "Distillation for avatar personality. RAG for dynamic context.",
    },
    {
      layer: isFr ? "Mémoire / RAG" : "Memory / RAG",
      primary: "Mem0 + pgvector",
      alt: "Qdrant + PostgreSQL",
      latency: "50–100ms",
      sovereign: true,
      reason: isFr ? "-90% tokens, architecture 3 couches. Déploiement self-hosted." : "-90% tokens, 3-layer architecture. Self-hosted deployment.",
    },
    {
      layer: "TTS",
      primary: "Chatterbox-Turbo / FishAudio S1-mini",
      alt: isFr ? "XTTS-v2 (multilingue)" : "XTTS-v2 (multilingual)",
      latency: "<200ms",
      sovereign: true,
      reason: isFr ? "Open-source, clonage voix, contrôle prosodique. MIT/Apache 2.0." : "Open-source, voice cloning, prosodic control. MIT/Apache 2.0.",
    },
    {
      layer: isFr ? "Avatar génération" : "Avatar generation",
      primary: isFr ? "Architecture R&D (IDIAP + distillation)" : "R&D Architecture (IDIAP + distillation)",
      alt: isFr ? "HeyGem OS (phase transition)" : "HeyGem OS (transition phase)",
      latency: "<500ms (cible)",
      sovereign: true,
      reason: isFr ? "Goulot principal. Nécessite R&D fondamentale. HeyGem OS en attendant." : "Main bottleneck. Requires fundamental R&D. HeyGem OS in the meantime.",
    },
    {
      layer: isFr ? "Streaming / Transport" : "Streaming / Transport",
      primary: "WebRTC + WebSocket",
      alt: isFr ? "HLS pour vidéo pré-enregistrée" : "HLS for pre-recorded video",
      latency: "30–80ms",
      sovereign: true,
      reason: isFr ? "Standard industrie pour temps réel. Expertise Memoways." : "Industry standard for real-time. Memoways expertise.",
    },
    {
      layer: isFr ? "Infrastructure GPU" : "GPU Infrastructure",
      primary: isFr ? "Exoscale (Suisse)" : "Exoscale (Switzerland)",
      alt: "OVH / Scaleway (EU)",
      latency: "N/A",
      sovereign: true,
      reason: isFr ? "Souveraineté données, RGPD, partenariat existant." : "Data sovereignty, GDPR, existing partnership.",
    },
  ];

  const memoryPapers = [
    {
      ref: "LoCoMo (Snap Research, 2024)",
      venue: "arXiv:2402.17753",
      desc: isFr
        ? "Benchmark machine-humain pour dialogues très long-terme. Pipeline de génération de dialogues de haute qualité. Référence pour l'évaluation."
        : "Human-machine benchmark for very long-term dialogues. High-quality dialogue generation pipeline. Reference for evaluation.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "LongMemEval (2024)",
      venue: "arXiv:2410.10813",
      desc: isFr
        ? "Benchmark pour capacités mémoire long-terme des assistants LLM. Ouvre la voie vers des assistants plus personnalisés."
        : "Benchmark for long-term memory capabilities of LLM assistants. Opens the path toward more personalized assistants.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "Mem0 (2025)",
      venue: "arXiv:2504.19413",
      desc: isFr
        ? "+26% précision, -91% latence, -90% tokens vs baseline. Mémoire structurée persistante pour agents IA."
        : "+26% accuracy, -91% latency, -90% tokens vs baseline. Persistent structured memory for AI agents.",
      relevance: isFr ? "Très haute" : "Very high",
    },
    {
      ref: "RAG-Driven Memory (IEEE, 2025)",
      venue: "IEEE Access",
      desc: isFr
        ? "Revue des architectures mémoire RAG pour LLM conversationnels. Synthèse des approches vector DB."
        : "Review of RAG memory architectures for conversational LLMs. Synthesis of vector DB approaches.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "Conversational Agents: From RAG to LTM",
      venue: "ACM, 2025",
      desc: isFr
        ? "Transition des approches RAG vers la mémoire long-terme. Gestion mémoire agentique via RL."
        : "Transition from RAG approaches to long-term memory. Agentic memory management via RL.",
      relevance: isFr ? "Haute" : "High",
    },
  ];

  const avatarPapers = [
    {
      ref: "VASA-1 (Microsoft, 2024)",
      venue: "NeurIPS 2024",
      desc: isFr
        ? "Visages parlants photorealistic avec expressions nuancées. 40 FPS online, 512×512. Non commercialisé — risque de non-publication complète."
        : "Photorealistic talking faces with nuanced expressions. 40 FPS online, 512×512. Not commercialized — risk of incomplete publication.",
      relevance: isFr ? "Très haute" : "Very high",
    },
    {
      ref: "A²-LLM (2026)",
      venue: "arXiv:2602.04913",
      desc: isFr
        ? "LLM audio-avatar end-to-end. Mouvements faciaux émotionnellement riches au-delà du lip-sync. Architecture 8B + 0.16B LoRA."
        : "End-to-end audio-avatar LLM. Emotionally rich facial movements beyond lip-sync. 8B + 0.16B LoRA architecture.",
      relevance: isFr ? "Très haute" : "Very high",
    },
    {
      ref: "Hi-Reco (HKUST, 2025)",
      venue: isFr ? "Conférence" : "Conference",
      desc: isFr
        ? "Humain numérique complet : avatar 3D + parole expressive + dialogue grounded. Approche intégrée rare."
        : "Complete digital human: 3D avatar + expressive speech + grounded dialogue. Rare integrated approach.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "Survey Talking Head (ACM, 2025)",
      venue: "ACM Computing Surveys",
      desc: isFr
        ? "Revue complète des techniques de synthèse talking head. Trilemme temps réel / expressivité / qualité documenté."
        : "Comprehensive review of talking head synthesis techniques. Real-time / expressiveness / quality trilemma documented.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "EmergentTTS-Eval (NeurIPS, 2025)",
      venue: "NeurIPS 2025",
      desc: isFr
        ? "Benchmark pour contrôle de style complexe en TTS. Évalue 11Labs, Deepgram, OpenAI 4o-mini-TTS."
        : "Benchmark for complex style control in TTS. Evaluates 11Labs, Deepgram, OpenAI 4o-mini-TTS.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "PerTTS (2026)",
      venue: "ResearchGate",
      desc: isFr
        ? "TTS spontané personnalisé et contrôlable zero-shot. Encodeur style de parole + encodeur prosodie locale."
        : "Personalized and controllable zero-shot spontaneous TTS. Speech style encoder + local prosody encoder.",
      relevance: isFr ? "Très haute" : "Very high",
    },
  ];

  const tabLabels: Record<TabKey, string> = {
    commercial: isFr ? "Plateformes commerciales" : "Commercial platforms",
    opensource: isFr ? "Solutions open-source" : "Open-source solutions",
    tts: isFr ? "TTS & Synthèse vocale" : "TTS & Voice synthesis",
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Page header */}
      <div className="border-b border-slate-200 py-8">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">03</span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-mono text-slate-400">
                {isFr ? "État de l'Art" : "State of the Art"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.025em" }}>
              {isFr ? "État de l'Art & Analyse Comparative" : "State of the Art & Comparative Analysis"}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Cartographie des solutions existantes, benchmarks de latence, gaps de recherche et enjeux technologiques dans les domaines de la génération d'avatars conversationnels, de la mémoire IA et de la synthèse vocale expressive."
                : "Mapping of existing solutions, latency benchmarks, research gaps, and technological challenges in conversational avatar generation, AI memory, and expressive voice synthesis."
              }
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">

        {/* Tool comparison */}
        <section className="mb-16">
          <SectionHeader
            number="01"
            title={isFr ? "Comparatif des Outils & Plateformes" : "Tools & Platforms Comparison"}
            subtitle={isFr ? "Évaluation des solutions existantes sur les critères clés pour DigiDouble." : "Evaluation of existing solutions on key criteria for DigiDouble."}
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
                {tabLabels[tab]}
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
                      <th>{isFr ? "Plateforme" : "Platform"}</th>
                      <th>{isFr ? "Temps réel" : "Real-time"}</th>
                      <th>{isFr ? "Corps" : "Body"}</th>
                      <th>{isFr ? "Conversation" : "Conversation"}</th>
                      <th>{isFr ? "Latence" : "Latency"}</th>
                      <th>{isFr ? "Souveraineté" : "Sovereignty"}</th>
                      <th>{isFr ? "Censure" : "Censorship"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commercialPlatforms.map((p) => (
                      <tr key={p.name}>
                        <td>
                          <div className="font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.name}</div>
                          <div className="text-xs text-slate-400 font-mono">{p.category}</div>
                        </td>
                        <td><span style={{ color: p.realtime ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{p.realtime ? "✓" : "✗"}</span></td>
                        <td><span className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.bodyLanguage}</span></td>
                        <td><span style={{ color: p.conversation ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{p.conversation ? "✓" : "✗"}</span></td>
                        <td><span className="text-xs font-mono text-slate-700">{p.latency}</span></td>
                        <td><span style={{ color: p.sovereignty ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{p.sovereignty ? "✓" : "✗"}</span></td>
                        <td>
                          <span className="text-xs" style={{
                            color: (p.censorship.includes("élevé") || p.censorship.includes("High") || p.censorship.includes("Élevé")) ? "oklch(0.60 0.20 25)"
                              : (p.censorship.includes("moyen") || p.censorship.includes("Medium")) ? "oklch(0.75 0.16 75)"
                              : "oklch(0.65 0.18 145)",
                            fontFamily: "'Space Grotesk', sans-serif",
                          }}>
                            {p.censorship}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {commercialPlatforms.map((p) => (
                  <div key={p.name} className="border border-slate-200 rounded p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.name}</div>
                        <div className="text-xs text-slate-400 font-mono">{p.pricing}</div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          <span>{isFr ? "Qualité" : "Quality"}</span><span>{p.score.quality}/10</span>
                        </div>
                        <ScoreBar value={p.score.quality} color="oklch(0.72 0.18 200)" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          <span>{isFr ? "Latence" : "Latency"}</span><span>{p.score.latency}/10</span>
                        </div>
                        <ScoreBar value={p.score.latency} color="oklch(0.65 0.18 145)" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          <span>{isFr ? "Coût/accessibilité" : "Cost/accessibility"}</span><span>{p.score.cost}/10</span>
                        </div>
                        <ScoreBar value={p.score.cost} color="oklch(0.75 0.16 75)" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          <span>{isFr ? "Souveraineté" : "Sovereignty"}</span><span>{p.score.sovereignty}/10</span>
                        </div>
                        <ScoreBar value={p.score.sovereignty} color="oklch(0.72 0.18 50)" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{p.notes}</p>
                  </div>
                ))}
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
                      <th>{isFr ? "Outil" : "Tool"}</th>
                      <th>{isFr ? "Type" : "Type"}</th>
                      <th>{isFr ? "Latence typique" : "Typical latency"}</th>
                      <th>{isFr ? "Qualité" : "Quality"}</th>
                      <th>{isFr ? "Déploiement" : "Deployment"}</th>
                      <th>{isFr ? "Licence" : "License"}</th>
                      <th>{isFr ? "Utilisé par DD" : "Used by DD"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openSourceSolutions.map((s) => (
                      <tr key={s.name}>
                        <td><div className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.name}</div></td>
                        <td><span className="text-xs text-slate-600 font-mono">{s.type}</span></td>
                        <td>
                          <span className="text-xs font-mono" style={{
                            color: s.latency.includes("25ms") || s.latency.includes("500ms") ? "oklch(0.65 0.18 145)"
                              : s.latency.includes("5–15s") || s.latency.includes("2–10s") ? "oklch(0.60 0.20 25)"
                              : "oklch(0.75 0.16 75)",
                          }}>{s.latency}</span>
                        </td>
                        <td><span className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.quality}</span></td>
                        <td><span className="text-xs text-slate-500 font-mono">{s.deployment}</span></td>
                        <td><span className="text-xs text-slate-500 font-mono">{s.license}</span></td>
                        <td>
                          {s.used
                            ? <StatusBadge variant="available" label={isFr ? "OUI" : "YES"} />
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
                  {isFr
                    ? <><strong>Note :</strong> Les solutions open-source permettent la souveraineté des données et l'absence de censure, au prix d'une infrastructure GPU propre et d'un investissement technique significatif. DigiDouble utilise HeyGem OS sur Exoscale (GPU suisse) avec un gain de 30% de performance via Arch Linux.</>
                    : <><strong>Note:</strong> Open-source solutions enable data sovereignty and freedom from censorship, at the cost of dedicated GPU infrastructure and significant technical investment. DigiDouble uses HeyGem OS on Exoscale (Swiss GPU) with a 30% performance gain via Arch Linux.</>
                  }
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
                      <th>{isFr ? "Modèle TTS" : "TTS Model"}</th>
                      <th>{isFr ? "Type" : "Type"}</th>
                      <th>{isFr ? "Latence TTFA" : "TTFA Latency"}</th>
                      <th>{isFr ? "Qualité" : "Quality"}</th>
                      <th>{isFr ? "Clonage voix" : "Voice cloning"}</th>
                      <th>{isFr ? "Prosodie" : "Prosody"}</th>
                      <th>{isFr ? "Multilingue" : "Multilingual"}</th>
                      <th>{isFr ? "Souverain" : "Sovereign"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ttsComparison.map((tts) => (
                      <tr key={tts.name}>
                        <td><div className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{tts.name}</div></td>
                        <td><StatusBadge variant={tts.type === "Commercial" ? "external" : "available"} label={tts.type} /></td>
                        <td>
                          <span className="text-xs font-mono" style={{
                            color: tts.latency.includes("<100") || tts.latency.includes("60") || tts.latency.includes("80") ? "oklch(0.65 0.18 145)"
                              : tts.latency.includes("200") || tts.latency.includes("130") ? "oklch(0.75 0.16 75)"
                              : "oklch(0.60 0.20 25)",
                          }}>{tts.latency}</span>
                        </td>
                        <td className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{tts.quality}</td>
                        <td className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{tts.cloning}</td>
                        <td className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{tts.prosody}</td>
                        <td><span style={{ color: tts.multilingual ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{tts.multilingual ? "✓" : "✗"}</span></td>
                        <td><span style={{ color: tts.sovereignty ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{tts.sovereignty ? "✓" : "✗"}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="callout-info">
                <p className="text-sm text-slate-700" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr
                    ? <><strong>Recommandation pour DigiDouble :</strong> Chatterbox-Turbo ou FishAudio S1-mini pour un déploiement souverain avec clonage voix. XTTS-v2 pour le multilingue (FR/EN/DE/IT). ElevenLabs comme référence de qualité pour les phases de validation.</>
                    : <><strong>Recommendation for DigiDouble:</strong> Chatterbox-Turbo or FishAudio S1-mini for sovereign deployment with voice cloning. XTTS-v2 for multilingual (FR/EN/DE/IT). ElevenLabs as quality reference for validation phases.</>
                  }
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Latency Benchmarks */}
        <section className="mb-16">
          <SectionHeader
            number="02"
            title={isFr ? "Benchmarks de Latence" : "Latency Benchmarks"}
            subtitle={isFr ? "État de l'art des performances par composant du pipeline conversationnel (2025–2026)." : "State-of-the-art performance by component of the conversational pipeline (2025–2026)."}
            accent="orange"
          />

          {/* Diagram first */}
          <div className="border border-slate-200 rounded-lg p-5 bg-white mb-6">
            <LatencyBenchmarkDiagram />
          </div>

          <div className="mb-4">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{isFr ? "Composant" : "Component"}</th>
                    <th>Best-case</th>
                    <th>{isFr ? "Typique" : "Typical"}</th>
                    <th>{isFr ? "Visualisation" : "Visualization"}</th>
                    <th>{isFr ? "Statut vs cible DigiDouble" : "Status vs DigiDouble target"}</th>
                  </tr>
                </thead>
                <tbody>
                  {latencyBenchmarks.map((b) => {
                    const target = b.component.includes("Avatar") ? 500 : b.component.includes("LLM") ? 500 : 300;
                    const isOnTarget = b.best <= target;
                    const maxDisplay = 10000;
                    return (
                      <tr key={b.component}>
                        <td className="text-sm font-medium text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{b.component}</td>
                        <td><span className="text-sm font-bold font-mono" style={{ color: isOnTarget ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{b.best}{b.unit}</span></td>
                        <td><span className="text-sm font-mono text-slate-500">{b.typical}{b.unit}</span></td>
                        <td className="w-40">
                          <div className="latency-bar">
                            <div className="latency-fill" style={{ width: `${Math.min((b.typical / maxDisplay) * 100, 100)}%`, background: isOnTarget ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }} />
                          </div>
                        </td>
                        <td>
                          {isOnTarget
                            ? <StatusBadge variant="available" label="OK" />
                            : <StatusBadge variant="gap" label={isFr ? "À RÉDUIRE" : "TO REDUCE"} />
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>



          <div className="callout-warning">
            <p className="text-sm font-semibold text-slate-800 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Analyse : le trilemme Qualité / Latence / Coût" : "Analysis: the Quality / Latency / Cost trilemma"}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? <>Il est impossible d'optimiser simultanément les trois dimensions avec les approches actuelles. Les plateformes à faible latence (&lt;100ms) comme Beyond Presence ou NVIDIA ACE nécessitent une infrastructure propriétaire coûteuse. Les solutions open-source souveraines restent à 2–15s. La recherche fondamentale est nécessaire pour trouver des architectures permettant de briser ce trilemme.</>
                : <>It is impossible to simultaneously optimize all three dimensions with current approaches. Low-latency platforms (&lt;100ms) like Beyond Presence or NVIDIA ACE require costly proprietary infrastructure. Sovereign open-source solutions remain at 2–15s. Fundamental research is needed to find architectures that break this trilemma.</>
              }
            </p>
          </div>
        </section>

        {/* Research Gaps */}
        <section className="mb-16">
          <SectionHeader
            number="03"
            title={isFr ? "Gaps de Recherche & Opportunités" : "Research Gaps & Opportunities"}
            subtitle={isFr ? "Ce qui manque, ce qui existe, et où DigiDouble peut contribuer." : "What is missing, what exists, and where DigiDouble can contribute."}
            accent="red"
          />

          {/* Diagrams first */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Matrice Urgence × Difficulté" : "Urgency × Difficulty Matrix"}
              </h3>
              <div className="border border-slate-200 rounded-lg p-4 bg-white">
                <ResearchGapDiagram />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Comparatif Radar" : "Radar Comparison"}
              </h3>
              <div className="border border-slate-200 rounded-lg p-4 bg-white">
                <RadarCompareDiagram />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{isFr ? "Domaine" : "Domain"}</th>
                  <th>{isFr ? "Gap identifié" : "Identified gap"}</th>
                  <th>{isFr ? "Meilleur SOTA actuel" : "Best current SOTA"}</th>
                  <th>{isFr ? "Opportunité DigiDouble" : "DigiDouble opportunity"}</th>
                  <th>{isFr ? "Urgence" : "Urgency"}</th>
                </tr>
              </thead>
              <tbody>
                {researchGaps.map((g) => (
                  <tr key={g.domain}>
                    <td className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{g.domain}</td>
                    <td className="text-xs text-slate-600 max-w-xs" style={{ fontFamily: "'Source Serif 4', serif" }}>{g.gap}</td>
                    <td className="text-xs text-slate-500 max-w-xs" style={{ fontFamily: "'Source Serif 4', serif" }}>{g.sota}</td>
                    <td className="text-xs max-w-xs" style={{ fontFamily: "'Source Serif 4', serif", color: "oklch(0.45 0.18 200)" }}>{g.opportunity}</td>
                    <td>
                      <StatusBadge
                        variant={(g.urgency === "Critique" || g.urgency === "Critical") ? "gap" : (g.urgency === "Élevée" || g.urgency === "High") ? "rd" : "target"}
                        label={g.urgency}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>

        {/* Research Assessment */}
        <section className="mb-16">
          <SectionHeader
            number="04"
            title={isFr ? "Assessment de la Recherche Académique" : "Academic Research Assessment"}
            subtitle={isFr ? "État des publications et travaux récents dans les domaines clés (2023–2026)." : "Status of publications and recent work in key domains (2023–2026)."}
            accent="cyan"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-slate-200 rounded p-5">
              <div className="text-xs font-bold mb-3" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 200)" }}>
                {isFr ? "DOMAINE A — Mémoire Conversationnelle" : "DOMAIN A — Conversational Memory"}
              </div>
              <div className="space-y-3">
                {memoryPapers.map((paper) => (
                  <div key={paper.ref} className="border-l-2 pl-3" style={{ borderColor: "oklch(0.72 0.18 200 / 0.3)" }}>
                    <div className="font-medium text-slate-900 text-xs mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{paper.ref}</div>
                    <div className="text-xs text-slate-400 font-mono mb-1">{paper.venue}</div>
                    <p className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{paper.desc}</p>
                    <div className="mt-1">
                      <StatusBadge variant="rd" label={`${isFr ? "Pertinence" : "Relevance"}: ${paper.relevance}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-200 rounded p-5">
              <div className="text-xs font-bold mb-3" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 50)" }}>
                {isFr ? "DOMAINE B — Avatar & Synthèse Vocale" : "DOMAIN B — Avatar & Voice Synthesis"}
              </div>
              <div className="space-y-3">
                {avatarPapers.map((paper) => (
                  <div key={paper.ref} className="border-l-2 pl-3" style={{ borderColor: "oklch(0.72 0.18 50 / 0.3)" }}>
                    <div className="font-medium text-slate-900 text-xs mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{paper.ref}</div>
                    <div className="text-xs text-slate-400 font-mono mb-1">{paper.venue}</div>
                    <p className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{paper.desc}</p>
                    <div className="mt-1">
                      <StatusBadge variant="rd" label={`${isFr ? "Pertinence" : "Relevance"}: ${paper.relevance}`} />
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
            title={isFr ? "Enjeux Business & Opportunités de Marché" : "Business Challenges & Market Opportunities"}
            subtitle={isFr ? "Contexte économique et positionnement stratégique." : "Economic context and strategic positioning."}
            accent="green"
          />

          <div className="overflow-x-auto mb-6">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{isFr ? "Segment" : "Segment"}</th>
                  <th>{isFr ? "Valeur 2025" : "2025 Value"}</th>
                  <th>{isFr ? "Valeur cible" : "Target value"}</th>
                  <th>CAGR</th>
                  <th>{isFr ? "Source" : "Source"}</th>
                </tr>
              </thead>
              <tbody>
                {marketOpportunity.map((m) => (
                  <tr key={m.segment}>
                    <td className="font-medium text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m.segment}</td>
                    <td><span className="text-sm font-bold font-mono" style={{ color: "oklch(0.72 0.18 200)" }}>{m.value2025}</span></td>
                    <td><span className="text-sm font-mono text-slate-700">{m.valueTarget}</span></td>
                    <td><span className="text-sm font-bold font-mono" style={{ color: "oklch(0.65 0.18 145)" }}>{m.cagr}</span></td>
                    <td className="text-xs text-slate-400 font-mono">{m.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {businessChallenges.map((section) => (
              <div key={section.title} className="border border-slate-200 rounded p-4">
                <div className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace", color: section.color }}>
                  {section.title}
                </div>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div key={item} className="flex gap-2">
                      <span className="text-xs mt-0.5 shrink-0" style={{ color: section.color }}>·</span>
                      <span className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="callout-success">
            <p className="text-sm font-semibold text-slate-800 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Validité de l'intérêt pour la recherche" : "Validity of research interest"}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? <>La combinaison unique que vise DigiDouble — conversation IA + avatar photorealistic + séquençage vidéo intelligent + contrôle narratif/pédagogique + souveraineté — n'existe dans aucune solution commerciale ou open-source actuelle. Les gaps identifiés (mémoire long-terme, fidélité comportementale, latence avatar) correspondent précisément aux frontières de la recherche académique actuelle, ce qui justifie pleinement une collaboration avec l'IDIAP dans le cadre d'Innosuisse.</>
                : <>The unique combination DigiDouble targets — AI conversation + photorealistic avatar + intelligent video sequencing + narrative/pedagogical control + sovereignty — does not exist in any current commercial or open-source solution. The identified gaps (long-term memory, behavioral fidelity, avatar latency) correspond precisely to the frontiers of current academic research, fully justifying a collaboration with IDIAP within the Innosuisse framework.</>
              }
            </p>
          </div>
        </section>

        {/* Technology Stack Recommendations */}
        <section className="mb-16">
          <SectionHeader
            number="06"
            title={isFr ? "Technologies Recommandées" : "Recommended Technologies"}
            subtitle={isFr ? "Stack cible pour l'architecture DigiDouble Phase 2." : "Target stack for DigiDouble Phase 2 architecture."}
            accent="cyan"
          />

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{isFr ? "Couche" : "Layer"}</th>
                  <th>{isFr ? "Technologie recommandée" : "Recommended technology"}</th>
                  <th>{isFr ? "Alternative" : "Alternative"}</th>
                  <th>{isFr ? "Latence cible" : "Target latency"}</th>
                  <th>{isFr ? "Souverain" : "Sovereign"}</th>
                  <th>{isFr ? "Justification" : "Justification"}</th>
                </tr>
              </thead>
              <tbody>
                {techStackRows.map((row) => (
                  <tr key={row.layer}>
                    <td className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{row.layer}</td>
                    <td className="text-sm text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{row.primary}</td>
                    <td className="text-xs text-slate-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{row.alt}</td>
                    <td><span className="text-xs font-bold font-mono" style={{ color: "oklch(0.65 0.18 145)" }}>{row.latency}</span></td>
                    <td><span style={{ color: row.sovereign ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{row.sovereign ? "✓" : "✗"}</span></td>
                    <td className="text-xs text-slate-500 max-w-xs" style={{ fontFamily: "'Source Serif 4', serif" }}>{row.reason}</td>
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
