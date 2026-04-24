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
import ResearchAxesDiagram from "@/components/diagrams/ResearchAxesDiagram";
import ResearchGapDiagram from "@/components/diagrams/ResearchGapDiagram";
import DiagramModal from "@/components/DiagramModal";
import PositioningDiagram from "@/components/diagrams/PositioningDiagram";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import { SolutionTableCell } from "@/components/SolutionBadge";
import { SOLUTION_LINKS } from "@/lib/solutionLinks";
import { getTTSByCategory, type TTSData } from "@/lib/ttsData";
import { getSTTByCategory, type STTData } from "@/lib/sttData";

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

function TTSCard({ tts, isFr }: { tts: TTSData; isFr: boolean }) {
  const catColor = tts.category === "cloud-api" ? "oklch(0.72 0.18 200)" : tts.category === "open-source" ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 280)";
  const catLabel = tts.category === "cloud-api" ? "Cloud API" : tts.category === "open-source" ? "Open Source" : "Voice-to-Voice";
  const catLabelFr = tts.category === "cloud-api" ? "API Cloud" : tts.category === "open-source" ? "Open Source" : "Voix-\u00e0-Voix";
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded mb-1 inline-block" style={{ background: catColor + "22", color: catColor }}>
            {isFr ? catLabelFr : catLabel}
          </span>
          <h4 className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{tts.name}</h4>
          <p className="text-xs text-slate-400 mt-0.5 leading-snug" style={{ fontFamily: "'Source Serif 4', serif" }}>{tts.tagline}</p>
        </div>
      </div>
      {/* Score bars */}
      <div className="space-y-1.5">
        {[
          { label: isFr ? "Qualit\u00e9" : "Quality", value: tts.score.quality, color: "oklch(0.72 0.18 200)" },
          { label: isFr ? "Latence" : "Latency", value: tts.score.latency, color: "oklch(0.65 0.18 145)" },
          { label: isFr ? "Clonage" : "Cloning", value: tts.score.voiceCloning, color: "oklch(0.72 0.18 280)" },
          { label: isFr ? "Souverainet\u00e9" : "Sovereignty", value: tts.score.sovereignty, color: "oklch(0.72 0.18 25)" },
          { label: isFr ? "Prix" : "Pricing", value: tts.score.pricing, color: "oklch(0.65 0.18 145)" },
        ].map(({ label, value, color }) => (
          <div key={label}>
            <div className="flex justify-between text-xs text-slate-400 mb-0.5">
              <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{label}</span>
              <span className="font-mono">{value}/10</span>
            </div>
            <ScoreBar value={value} color={color} />
          </div>
        ))}
      </div>
      {/* Key specs */}
      <div className="flex flex-wrap gap-1.5">
        <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{tts.ttfaMs}ms TTFA</span>
        {tts.eloScore > 0 && <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-700">ELO {tts.eloScore}</span>}
        {tts.voiceCloning && <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">{isFr ? "Clonage" : "Cloning"}</span>}
        {tts.selfHostable && <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-700">{isFr ? "Souverain" : "Sovereign"}</span>}
        {tts.lipsyncData && <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-violet-50 text-violet-700">Lip-sync</span>}
      </div>
      {/* DigiDouble axis */}
      <div className="text-xs font-mono text-slate-400 border-t border-slate-100 pt-2">{tts.digiDoubleAxis}</div>
      {/* Link */}
      <InternalLink to={`/tts/${tts.id}`} className="mt-auto text-xs font-mono font-bold text-cyan-600 hover:text-cyan-800 underline">
        {isFr ? "Fiche d\u00e9taill\u00e9e \u2192" : "Full details \u2192"}
      </InternalLink>
    </div>
  );
}

type AvatarTab = "commercial" | "opensource";
type TTSTab = "commercial" | "opensource";
type STTTab = "commercial" | "opensource";

export default function StateOfArt() {
  const [avatarTab, setAvatarTab] = useState<AvatarTab>("commercial");
  const [ttsTab, setTtsTab] = useState<TTSTab>("commercial");
  const [sttTab, setSttTab] = useState<STTTab>("commercial");
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  // ─── Data (translated) ──────────────────────────────────────────────────────

  // ─── Updated March 2026: added Simli Trinity-1, BeyondPresence Genesis 2, bitHuman, Lemon Slice, Hedra, Anam, Soul Machines, UneeQ
  // ─── D-ID updated to V4 (launched March 16, 2026)
  const commercialPlatforms = [
    {
      name: "HeyGen",
      linkKey: "heygen",
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
      score: { quality: 9, latency: 7, cost: 3, sovereignty: 1, customisation: 7, pricing: 3 },
    },
    {
      name: "Synthesia",
      linkKey: "synthesia",
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
      score: { quality: 8, latency: 1, cost: 5, sovereignty: 1, customisation: 4, pricing: 5 },
    },
    {
      name: isFr ? "D-ID V4 (Visual Agents)" : "D-ID V4 (Visual Agents)",
      linkKey: "did",
      category: isFr ? "Animation faciale enterprise" : "Enterprise facial animation",
      realtime: true,
      bodyLanguage: isFr ? "Non" : "No",
      conversation: true,
      sovereignty: false,
      latency: isFr ? "Améliorée V4 (mars 2026)" : "Improved V4 (March 2026)",
      pricing: isFr ? "~$0.35/min" : "~$0.35/min",
      censorship: isFr ? "Risque moyen" : "Medium risk",
      notes: isFr
        ? "V4 lancé 16 mars 2026. Diffusion-powered expressive delivery, consistent identity. Agents LLM connectés. Transport WebRTC (Janus). Option VPC/on-prem disponible. Pas de SDK haut niveau."
        : "V4 launched March 16, 2026. Diffusion-powered expressive delivery, consistent identity. LLM-connected agents. WebRTC transport (Janus). VPC/on-prem option available. No high-level SDK.",
      strengths: isFr
        ? ["Agents LLM connectés", "Option VPC/on-prem", "Consistent identity V4", "Enterprise scale"]
        : ["LLM-connected agents", "VPC/on-prem option", "Consistent identity V4", "Enterprise scale"],
      weaknesses: isFr
        ? ["Pas de SDK haut niveau", "Coût élevé ($0.35/min)", "Pas de mémoire persistante", "Pas de souveraineté totale"]
        : ["No high-level SDK", "High cost ($0.35/min)", "No persistent memory", "No full sovereignty"],
      score: { quality: 7, latency: 6, cost: 4, sovereignty: 3, customisation: 6, pricing: 4 },
    },
    {
      name: isFr ? "BeyondPresence (Genesis 2 — bientôt)" : "BeyondPresence (Genesis 2 — coming)",
      linkKey: "beyond_presence",
      category: isFr ? "Avatar hyper-réaliste" : "Hyper-realistic avatar",
      realtime: true,
      bodyLanguage: isFr ? "Oui (tête)" : "Yes (head)",
      conversation: true,
      sovereignty: false,
      latency: isFr ? "Bonne (WebRTC LiveKit)" : "Good (WebRTC LiveKit)",
      pricing: isFr ? "~$0.085/min (A2V) / ~$0.35/min (Agent)" : "~$0.085/min (A2V) / ~$0.35/min (Agent)",
      censorship: isFr ? "Risque moyen" : "Medium risk",
      notes: isFr
        ? "Fondé 2024. 1080p haute résolution. Genesis 2 annoncé (world's most advanced expressive real-time avatar model). Transport WebRTC (LiveKit). Frameworks LiveKit + Pipecat. Focus sales, HR, coaching."
        : "Founded 2024. 1080p high resolution. Genesis 2 announced (world's most advanced expressive real-time avatar model). WebRTC transport (LiveKit). LiveKit + Pipecat frameworks. Focus sales, HR, coaching.",
      strengths: isFr
        ? ["1080p haute résolution", "Hyper-réaliste", "Frameworks LiveKit/Pipecat", "Genesis 2 très prometteur"]
        : ["1080p high resolution", "Hyper-realistic", "LiveKit/Pipecat frameworks", "Genesis 2 very promising"],
      weaknesses: isFr
        ? ["Coût élevé Agent API", "Pas de mémoire persistante", "Pas de souveraineté", "Genesis 2 pas encore dispo"]
        : ["High Agent API cost", "No persistent memory", "No sovereignty", "Genesis 2 not yet available"],
      score: { quality: 9, latency: 8, cost: 3, sovereignty: 2, customisation: 5, pricing: 3 },
    },
    {
      name: "NVIDIA ACE",
      linkKey: "nvidia_ace",
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
      score: { quality: 9, latency: 10, cost: 2, sovereignty: 3, customisation: 8, pricing: 2 },
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
      score: { quality: 7, latency: 6, cost: 7, sovereignty: 1, customisation: 2, pricing: 7 },
    },
    {
      name: "Runway Characters",
      linkKey: "runway",
      category: isFr ? "Avatar API temps réel" : "Real-time avatar API",
      realtime: true,
      bodyLanguage: isFr ? "Partiel (tête)" : "Partial (head)",
      conversation: true,
      sovereignty: false,
      latency: "<500ms (WebRTC)",
      pricing: isFr ? "~$0.20/min (API crédits)" : "~$0.20/min (API credits)",
      censorship: isFr ? "Faible" : "Low",
      notes: isFr
        ? "Lancé mars 2026. Avatar depuis une seule image (photorealistic, animé, mascotte). Basé sur GWM-1. Sessions max 5 min (dev) / 30 min (API). Lip-sync + eye movement + gestures. Knowledge base configurable. Pas de mémoire persistante ni de clonage vocal."
        : "Launched March 2026. Avatar from a single image (photorealistic, animated, mascot). Powered by GWM-1. Sessions max 5 min (dev) / 30 min (API). Lip-sync + eye movement + gestures. Configurable knowledge base. No persistent memory or voice cloning.",
      strengths: isFr
        ? ["Image unique → avatar (zero fine-tuning)", "WebRTC natif", "Knowledge base configurable", "API bien documentée", "Tout style visuel (réaliste, animé, mascotte)"]
        : ["Single image → avatar (zero fine-tuning)", "Native WebRTC", "Configurable knowledge base", "Well-documented API", "Any visual style (realistic, animated, mascot)"],
      weaknesses: isFr
        ? ["Session max 5–30 min", "Pas de mémoire persistante", "Pas de clonage vocal", "Pas de souveraineté", "$0.20/min = coût élevé à l'échelle", "Pas d'orchestration narrative"]
        : ["Max 5–30 min session", "No persistent memory", "No voice cloning", "No sovereignty", "$0.20/min = high cost at scale", "No narrative orchestration"],
      score: { quality: 8, latency: 9, cost: 4, sovereignty: 2, customisation: 6, pricing: 4 },
    },
    {
      name: "Simli (Trinity-1)",
      linkKey: "simli",
      category: isFr ? "Infrastructure avatar" : "Avatar infrastructure",
      realtime: true,
      bodyLanguage: isFr ? "Non" : "No",
      conversation: true,
      sovereignty: false,
      latency: "<300ms (WebRTC)",
      pricing: isFr ? "$0.009/min (le moins cher)" : "$0.009/min (cheapest)",
      censorship: isFr ? "Faible" : "Low",
      notes: isFr
        ? "Fondé 2023, Y Combinator. Trinity-1 : Gaussian Splatting propriétaire, <300ms latence. Transport WebRTC (Daily) + WebSockets. Frameworks LiveKit + Pipecat. Philosophie 'face layer' pour AI agents. Qualité bonne mais bitrate bas."
        : "Founded 2023, Y Combinator. Trinity-1: proprietary Gaussian Splatting, <300ms latency. WebRTC (Daily) + WebSockets transport. LiveKit + Pipecat frameworks. 'Face layer' philosophy for AI agents. Good quality but low bitrate.",
      strengths: isFr
        ? ["<300ms latence", "$0.009/min — 39× moins cher que D-ID", "Frameworks LiveKit/Pipecat", "Custom avatar depuis image unique"]
        : ["<300ms latency", "$0.009/min — 39× cheaper than D-ID", "LiveKit/Pipecat frameworks", "Custom avatar from single image"],
      weaknesses: isFr
        ? ["Bitrate bas", "Pas de mémoire persistante", "Pas de souveraineté", "Visage uniquement"]
        : ["Low bitrate", "No persistent memory", "No sovereignty", "Face only"],
      score: { quality: 6, latency: 9, cost: 9, sovereignty: 2, customisation: 7, pricing: 9 },
    },
    {
      name: "Anam",
      linkKey: "anam",
      category: isFr ? "Avatar émotionnel" : "Emotional avatar",
      realtime: true,
      bodyLanguage: isFr ? "Non" : "No",
      conversation: true,
      sovereignty: false,
      latency: isFr ? "Bonne (WebRTC Pion)" : "Good (WebRTC Pion)",
      pricing: isFr ? "~$0.18/min" : "~$0.18/min",
      censorship: isFr ? "Faible" : "Low",
      notes: isFr
        ? "Fondé 2023, ex-Synthesia (Caoimhe Murphy + Ben Carr). Focus intelligence émotionnelle. Transport WebRTC (Pion). Knowledge base, LLM custom, outils. Qualité très bonne, mais connexion instable sur faible bande passante."
        : "Founded 2023, ex-Synthesia (Caoimhe Murphy + Ben Carr). Focus emotional intelligence. WebRTC (Pion) transport. Knowledge base, custom LLM, tools. Very good quality, but unstable connection on low bandwidth.",
      strengths: isFr
        ? ["Très bonne qualité visuelle", "Intelligence émotionnelle", "Knowledge base + LLM custom", "Custom avatar depuis image unique"]
        : ["Very good visual quality", "Emotional intelligence", "Knowledge base + custom LLM", "Custom avatar from single image"],
      weaknesses: isFr
        ? ["Connexion instable faible bande passante", "Pas de mémoire persistante", "Pas de souveraineté", "Coût moyen-élevé"]
        : ["Unstable connection on low bandwidth", "No persistent memory", "No sovereignty", "Medium-high cost"],
      score: { quality: 8, latency: 7, cost: 4, sovereignty: 2, customisation: 6, pricing: 5 },
    },
    {
      name: "bitHuman",
      linkKey: "bithuman",
      category: isFr ? "Avatar edge/CPU" : "Edge/CPU avatar",
      realtime: true,
      bodyLanguage: isFr ? "Non" : "No",
      conversation: true,
      sovereignty: true,
      latency: isFr ? "Moyenne (WebRTC LiveKit)" : "Average (WebRTC LiveKit)",
      pricing: isFr ? "~$0.04/min cloud / $0.01/min self-hosted" : "~$0.04/min cloud / $0.01/min self-hosted",
      censorship: isFr ? "Faible" : "Low",
      notes: isFr
        ? "Fondé 2023, San Francisco. Premier avatar CPU au monde (déploiement local sans GPU). Modèles : Essential (CPU/cloud) + Expressive (cloud). Transport WebRTC (LiveKit). Souveraineté partielle via self-hosted."
        : "Founded 2023, San Francisco. World's first CPU avatar (local deployment without GPU). Models: Essential (CPU/cloud) + Expressive (cloud). WebRTC (LiveKit) transport. Partial sovereignty via self-hosted.",
      strengths: isFr
        ? ["Déploiement CPU sans GPU", "Self-hosted possible", "$0.01/min self-hosted", "Custom avatar depuis image"]
        : ["CPU deployment without GPU", "Self-hosted possible", "$0.01/min self-hosted", "Custom avatar from image"],
      weaknesses: isFr
        ? ["Qualité acceptable (pas excellente)", "Modèle Expressive cloud uniquement", "Latence moyenne"]
        : ["Acceptable quality (not excellent)", "Expressive model cloud-only", "Average latency"],
      score: { quality: 5, latency: 6, cost: 8, sovereignty: 6, customisation: 5, pricing: 8 },
    },
    {
      name: "Tavus Phoenix-4",
      linkKey: "tavus",
      category: isFr ? "Avatar comportemental" : "Behavioral avatar",
      realtime: true,
      bodyLanguage: isFr ? "Oui (tête complète)" : "Yes (full head)",
      conversation: true,
      sovereignty: false,
      latency: "40 FPS @ 1080p",
      pricing: isFr ? "API / Enterprise" : "API / Enterprise",
      censorship: isFr ? "Moyen" : "Medium",
      notes: isFr
        ? "Premier modèle avec comportement actif d'écoute, contrôle émotionnel complet et boucle perception-expression (Raven-1). Architecture diffusion causale + Gaussian Splatting implicite. Stack comportemental complet : Phoenix-4 + Sparrow-1 + Raven-1."
        : "First model with active listening behavior, full emotional control, and perception-expression loop (Raven-1). Causal diffusion + implicit Gaussian Splatting architecture. Full behavioral stack: Phoenix-4 + Sparrow-1 + Raven-1.",
      strengths: isFr
        ? ["Comportement d'écoute actif", "Contrôle émotionnel complet", "40 FPS @ 1080p", "Boucle perception-expression", "Gaussian Splatting implicite"]
        : ["Active listening behavior", "Full emotional control", "40 FPS @ 1080p", "Perception-expression loop", "Implicit Gaussian Splatting"],
      weaknesses: isFr
        ? ["Pas de mémoire persistante", "Pas de souveraineté", "Pas d'orchestration narrative", "Dépendance cloud Tavus"]
        : ["No persistent memory", "No sovereignty", "No narrative orchestration", "Tavus cloud dependency"],
      score: { quality: 10, latency: 10, cost: 3, sovereignty: 1, customisation: 7, pricing: 3 },
    },
    {
      name: "LemonSlice (LS-2.1)",
      linkKey: "lemon_slice",
      category: isFr ? "Avatar multi-style temps réel" : "Real-time multi-style avatar",
      realtime: true,
      bodyLanguage: isFr ? "Oui (corps entier)" : "Yes (full body)",
      conversation: true,
      sovereignty: false,
      latency: isFr ? "~3s (hosted) · 20 FPS" : "~3s (hosted) · 20 FPS",
      pricing: isFr ? "$0.21/min (hosted) · $7–200/mois" : "$0.21/min (hosted) · $7–200/mo",
      censorship: isFr ? "Faible" : "Low",
      notes: isFr
        ? "Fondé 2024 (ex-Infinity AI). $10.5M seed (YC + Matrix, déc. 2025). Modèle LemonSlice-2 : Video Diffusion Transformer 20B paramètres, 20 FPS sur GPU unique, architecture causale autoregressive, génération infinie sans accumulation d'erreurs. LS-2.1 ajoute déclenchement d'émotions et d'actions en temps réel. Support multi-style unique : humains photoréalistes, cartoons, mascottes, animaux. Custom avatar depuis une seule photo. Intégrations LiveKit, Pipecat. 3 modes déploiement : Widget, Hosted Pipeline, Self-Managed Pipeline. 30+ langues. Clonage vocal inclus. Transport WebRTC (Daily)."
        : "Founded 2024 (ex-Infinity AI). $10.5M seed (YC + Matrix, Dec 2025). LemonSlice-2 model: 20B-parameter Video Diffusion Transformer, 20 FPS on single GPU, causal autoregressive architecture, infinite generation with zero error accumulation. LS-2.1 adds real-time emotion and action triggering. Unique multi-style support: photorealistic humans, cartoons, mascots, animals. Custom avatar from single photo. LiveKit, Pipecat integrations. 3 deployment modes: Widget, Hosted Pipeline, Self-Managed Pipeline. 30+ languages. Voice cloning included. WebRTC (Daily) transport.",
      strengths: isFr
        ? ["Multi-style unique (humains + cartoons + mascottes)", "Custom avatar depuis 1 photo", "Déclenchement émotions/actions temps réel", "Corps entier + gestes mains", "$7/mois — entrée de gamme accessible", "Self-Managed Pipeline (couche avatar seule)"]
        : ["Unique multi-style (humans + cartoons + mascots)", "Custom avatar from 1 photo", "Real-time emotion/action triggering", "Full body + hand gestures", "$7/mo — accessible entry tier", "Self-Managed Pipeline (avatar layer only)"],
      weaknesses: isFr
        ? ["Latence ~3s (hosted) — plus lente que Simli/BeyondPresence", "Pas de souveraineté (cloud US)", "Pas de mémoire narrative", "Pas d'orchestration multi-agents", "Pas de déploiement on-premise", "Transport WebRTC instable en bande passante faible"]
        : ["~3s latency (hosted) — slower than Simli/BeyondPresence", "No sovereignty (US cloud)", "No narrative memory", "No multi-agent orchestration", "No on-premise deployment", "WebRTC transport unstable on low bandwidth"],
      score: { quality: 8, latency: 5, cost: 7, sovereignty: 1, customisation: 9, pricing: 7 },
    },
  ];

  const openSourceSolutions = [
    {
      name: "HeyGem OS",
      linkKey: "heygem",
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
      linkKey: "sadtalker",
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
      linkKey: "wav2lip",
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
    {
      name: "AvatarForcing (arXiv 2603.14331)",
      type: isFr ? "Streaming diffusion 1-step" : "1-step streaming diffusion",
      latency: isFr ? "Temps réel" : "Real-time",
      quality: isFr ? "Très bonne" : "Very good",
      deployment: isFr ? "Recherche (HuggingFace)" : "Research (HuggingFace)",
      license: isFr ? "Recherche" : "Research",
      used: false,
      notes: isFr
        ? "Mars 2026. One-step streaming diffusion, Local-Future Sliding-Window Denoising. Image unique + audio streaming. Long-form, temps réel. Directement pertinent pour l'Axe 1."
        : "March 2026. One-step streaming diffusion, Local-Future Sliding-Window Denoising. Single image + streaming audio. Long-form, real-time. Directly relevant for Axis 1.",
    },
    {
      name: "SoulX-FlashTalk (arXiv 2512.23379)",
      type: isFr ? "Diffusion streaming 14B" : "14B streaming diffusion",
      latency: "0.87s startup, 32 FPS",
      quality: isFr ? "Très bonne" : "Very good",
      deployment: isFr ? "Recherche (8xH800)" : "Research (8xH800)",
      license: isFr ? "Recherche" : "Research",
      used: false,
      notes: isFr
        ? "Déc 2025. 14B-parameter DiT. Sub-second startup latency (0.87s). 32 FPS sur 8xH800. Streaming infini bidirectionnel. Référence pour les benchmarks latence."
        : "Dec 2025. 14B-parameter DiT. Sub-second startup latency (0.87s). 32 FPS on 8xH800. Infinite bidirectional streaming. Reference for latency benchmarks.",
    },
  ];

  const cloudTTS = getTTSByCategory("cloud-api");
  const openTTS = getTTSByCategory("open-source");
  const cloudSTT = getSTTByCategory("cloud-api");
  const openSTT = getSTTByCategory("open-source");

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
    { segment: "AI Avatar Market", value2025: "$0.80B", valueTarget: "$5.93B (2032)", cagr: "33.1%", source: "MarketsAndMarkets", sourceUrl: "https://www.marketsandmarkets.com/Market-Reports/ai-avatars-market-156139465.html" },
    { segment: "Digital Human AI Avatars", value2025: "~$9.7B", valueTarget: "+$13.5B (2029)", cagr: "44%", source: "Technavio", sourceUrl: "https://www.technavio.com/report/digital-human-avatar-market-industry-analysis" },
    { segment: "Digital Human Market (2026)", value2025: "$66.98B", valueTarget: "$258.15B (2030)", cagr: "40.1%", source: "Grand View Research", sourceUrl: "https://www.grandviewresearch.com/industry-analysis/digital-avatar-market-report" },
    { segment: "Virtual Humans Market", value2025: "$43.3B", valueTarget: "$1,827B (2033)", cagr: "45.1%", source: "Allied Market Research", sourceUrl: "https://www.alliedmarketresearch.com/virtual-humans-market-A31847" },
    { segment: "EdTech AI Avatars", value2025: isFr ? "Émergent" : "Emerging", valueTarget: isFr ? "Fort (2029)" : "Strong (2029)", cagr: "N/A", source: isFr ? "Secteur en formation" : "Forming sector", sourceUrl: "" },
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
      primaryUrl: "https://audiogami.com",
      alt: isFr ? "Whisper local quantifié" : "Quantized local Whisper",
      altUrl: "https://github.com/openai/whisper",
      latency: "300ms",
      sovereign: true,
      reason: isFr ? "Déjà opérationnel, hébergé en Suisse, HITL optionnel" : "Already operational, Swiss-hosted, optional HITL",
      detail: isFr ? "SDK Gamilab. Modèle Whisper fine-tuné. Streaming chunked. WER <5% FR/EN." : "Gamilab SDK. Fine-tuned Whisper model. Chunked streaming. WER <5% FR/EN.",
    },
    {
      layer: "LLM Orchestration",
      primary: isFr ? "SLM distillé (Llama 3.1 8B quantifié)" : "Distilled SLM (quantized Llama 3.1 8B)",
      primaryUrl: "https://huggingface.co/meta-llama/Llama-3.1-8B",
      alt: isFr ? "GPT-4o streaming (transition)" : "GPT-4o streaming (transition)",
      altUrl: "https://platform.openai.com/docs/guides/streaming",
      latency: "200–400ms",
      sovereign: true,
      reason: isFr ? "Distillation pour personnalité avatar. RAG pour contexte dynamique." : "Distillation for avatar personality. RAG for dynamic context.",
      detail: isFr ? "Quantisation 4-bit (GGUF). Streaming token-by-token. LoRA fine-tuning pour persona. Latence TTFT <150ms." : "4-bit quantization (GGUF). Token-by-token streaming. LoRA fine-tuning for persona. TTFT latency <150ms.",
    },
    {
      layer: isFr ? "Mémoire / RAG" : "Memory / RAG",
      primary: "Mem0 + pgvector",
      primaryUrl: "https://github.com/mem0ai/mem0",
      alt: "Qdrant + PostgreSQL",
      altUrl: "https://qdrant.tech/documentation/",
      latency: "50–100ms",
      sovereign: true,
      reason: isFr ? "-90% tokens, architecture 3 couches. Déploiement self-hosted." : "-90% tokens, 3-layer architecture. Self-hosted deployment.",
      detail: isFr ? "3 couches : Working (session) + Episodic (faits) + Semantic (persona). Hybrid retrieval BM25 + dense. Self-hosted PostgreSQL + pgvector." : "3 layers: Working (session) + Episodic (facts) + Semantic (persona). Hybrid BM25 + dense retrieval. Self-hosted PostgreSQL + pgvector.",
    },
    {
      layer: "TTS",
      primary: "Chatterbox-Turbo / FishAudio S1-mini",
      primaryUrl: "https://github.com/resemble-ai/chatterbox",
      alt: isFr ? "XTTS-v2 (multilingue)" : "XTTS-v2 (multilingual)",
      altUrl: "https://github.com/coqui-ai/TTS",
      latency: "<200ms",
      sovereign: true,
      reason: isFr ? "Open-source, clonage voix, contrôle prosodique. MIT/Apache 2.0." : "Open-source, voice cloning, prosodic control. MIT/Apache 2.0.",
      detail: isFr ? "Chatterbox-Turbo : clonage 3s, TTFA <200ms, contrôle émotion. FishAudio S1-mini : 8 langues, streaming chunk. Licence MIT/Apache 2.0." : "Chatterbox-Turbo: 3s cloning, TTFA <200ms, emotion control. FishAudio S1-mini: 8 languages, chunk streaming. MIT/Apache 2.0 license.",
    },
    {
      layer: isFr ? "Avatar génération" : "Avatar generation",
      primary: isFr ? "Architecture R&D (distillation + streaming)" : "R&D Architecture (distillation + streaming)",
      primaryUrl: "https://arxiv.org/abs/2603.14331",
      alt: isFr ? "HeyGem OS (phase transition)" : "HeyGem OS (transition phase)",
      altUrl: "https://github.com/HeyGen-Official/HeyGem.ai",
      latency: "<500ms (cible)",
      sovereign: true,
      reason: isFr ? "Goulot principal. Nécessite R&D fondamentale. HeyGem OS en attendant." : "Main bottleneck. Requires fundamental R&D. HeyGem OS in the meantime.",
      detail: isFr ? "Cible : one-step diffusion streaming (AvatarForcing). Distillation modèle 14B → 1B. TTFB <500ms. HeyGem OS (Apache 2.0) en bridge. Axe R&D IDIAP." : "Target: one-step streaming diffusion (AvatarForcing). 14B → 1B model distillation. TTFB <500ms. HeyGem OS (Apache 2.0) as bridge. IDIAP R&D axis.",
    },
    {
      layer: isFr ? "Streaming / Transport" : "Streaming / Transport",
      primary: "WebRTC + WebSocket",
      primaryUrl: "https://livekit.io/docs",
      alt: isFr ? "HLS pour vidéo pré-enregistrée" : "HLS for pre-recorded video",
      altUrl: "https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API",
      latency: "30–80ms",
      sovereign: true,
      reason: isFr ? "Standard industrie pour temps réel. Expertise Memoways." : "Industry standard for real-time. Memoways expertise.",
      detail: isFr ? "LiveKit SFU self-hosted. 5 flux synchronisés (<100ms). Node Editor Memoways pour séquençage. Jitter buffer adaptatif." : "Self-hosted LiveKit SFU. 5 synchronized streams (<100ms). Memoways Node Editor for sequencing. Adaptive jitter buffer.",
    },
    {
      layer: isFr ? "Infrastructure GPU" : "GPU Infrastructure",
      primary: isFr ? "Exoscale (Suisse)" : "Exoscale (Switzerland)",
      primaryUrl: "https://www.exoscale.com/gpu/",
      alt: "OVH / Scaleway (EU)",
      altUrl: "https://www.ovhcloud.com/fr/public-cloud/gpu/",
      latency: "N/A",
      sovereign: true,
      reason: isFr ? "Souveraineté données, RGPD, partenariat existant." : "Data sovereignty, GDPR, existing partnership.",
      detail: isFr ? "GPU A100/H100. Datacenter Zurich/Genève. Conformité RGPD + LPD suisse. Partenariat Gamilab existant. Coût ~$2.5/h A100." : "A100/H100 GPU. Zurich/Geneva datacenter. GDPR + Swiss LPD compliant. Existing Gamilab partnership. Cost ~$2.5/h A100.",
    },
  ];

  const memoryPapers = [
    {
      ref: "LoCoMo (Snap Research, 2024)",
      venue: "arXiv:2402.17753",
      url: "https://arxiv.org/abs/2402.17753",
      desc: isFr
        ? "Benchmark machine-humain pour dialogues très long-terme. Pipeline de génération de dialogues de haute qualité. Référence pour l'évaluation."
        : "Human-machine benchmark for very long-term dialogues. High-quality dialogue generation pipeline. Reference for evaluation.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "LongMemEval (2024)",
      venue: "arXiv:2410.10813",
      url: "https://arxiv.org/abs/2410.10813",
      desc: isFr
        ? "Benchmark pour capacités mémoire long-terme des assistants LLM. Ouvre la voie vers des assistants plus personnalisés."
        : "Benchmark for long-term memory capabilities of LLM assistants. Opens the path toward more personalized assistants.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "Mem0 (2025)",
      venue: "arXiv:2504.19413",
      url: "https://arxiv.org/abs/2504.19413",
      desc: isFr
        ? "+26% précision, -91% latence, -90% tokens vs baseline. Mémoire structurée persistante pour agents IA."
        : "+26% accuracy, -91% latency, -90% tokens vs baseline. Persistent structured memory for AI agents.",
      relevance: isFr ? "Très haute" : "Very high",
    },
    {
      ref: "RAG-Driven Memory (IEEE, 2025)",
      venue: "IEEE Access",
      url: "https://ieeexplore.ieee.org/document/10856893",
      desc: isFr
        ? "Revue des architectures mémoire RAG pour LLM conversationnels. Synthèse des approches vector DB."
        : "Review of RAG memory architectures for conversational LLMs. Synthesis of vector DB approaches.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "Conversational Agents: From RAG to LTM",
      venue: "ACM, 2025",
      url: "https://dl.acm.org/doi/10.1145/3701716.3715561",
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
      url: "https://arxiv.org/abs/2404.10667",
      desc: isFr
        ? "Visages parlants photorealistic avec expressions nuancées. 40 FPS online, 512×512. Non commercialisé — risque de non-publication complète."
        : "Photorealistic talking faces with nuanced expressions. 40 FPS online, 512×512. Not commercialized — risk of incomplete publication.",
      relevance: isFr ? "Très haute" : "Very high",
    },
    {
      ref: "A²-LLM (2026)",
      venue: "arXiv:2602.04913",
      url: "https://arxiv.org/abs/2602.04913",
      desc: isFr
        ? "LLM audio-avatar end-to-end. Mouvements faciaux émotionnellement riches au-delà du lip-sync. Architecture 8B + 0.16B LoRA."
        : "End-to-end audio-avatar LLM. Emotionally rich facial movements beyond lip-sync. 8B + 0.16B LoRA architecture.",
      relevance: isFr ? "Très haute" : "Very high",
    },
    {
      ref: "Hi-Reco (HKUST, 2025)",
      venue: isFr ? "Conférence" : "Conference",
      url: "https://arxiv.org/abs/2503.18034",
      desc: isFr
        ? "Humain numérique complet : avatar 3D + parole expressive + dialogue grounded. Approche intégrée rare."
        : "Complete digital human: 3D avatar + expressive speech + grounded dialogue. Rare integrated approach.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "Survey Talking Head (ACM, 2025)",
      venue: "ACM Computing Surveys",
      url: "https://dl.acm.org/doi/10.1145/3706598",
      desc: isFr
        ? "Revue complète des techniques de synthèse talking head. Trilemme temps réel / expressivité / qualité documenté."
        : "Comprehensive review of talking head synthesis techniques. Real-time / expressiveness / quality trilemma documented.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "EmergentTTS-Eval (NeurIPS, 2025)",
      venue: "NeurIPS 2025",
      url: "https://arxiv.org/abs/2505.15372",
      desc: isFr
        ? "Benchmark pour contrôle de style complexe en TTS. Évalue 11Labs, Deepgram, OpenAI 4o-mini-TTS."
        : "Benchmark for complex style control in TTS. Evaluates 11Labs, Deepgram, OpenAI 4o-mini-TTS.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "PerTTS (2026)",
      venue: "ResearchGate",
      url: "https://www.researchgate.net/publication/398355114_PerTTS_Personalized_and_Controllable_Zero-shot_Spontaneous_Style_Text-to-Speech_Synthesis",
      desc: isFr
        ? "TTS spontané personnalisé et contrôlable zero-shot. Encodeur style de parole + encodeur prosodie locale."
        : "Personalized and controllable zero-shot spontaneous TTS. Speech style encoder + local prosody encoder.",
      relevance: isFr ? "Très haute" : "Very high",
    },
    {
      ref: "AvatarForcing (arXiv 2603.14331, mars 2026)",
      venue: "arXiv:2603.14331",
      url: "https://arxiv.org/abs/2603.14331",
      desc: isFr
        ? "One-step streaming diffusion pour avatars parlants. Local-Future Sliding-Window Denoising. Image unique + audio streaming → vidéo temps réel long-form. Directement applicable à l'Axe 1 (latence)."
        : "One-step streaming diffusion for talking avatars. Local-Future Sliding-Window Denoising. Single image + streaming audio → real-time long-form video. Directly applicable to Axis 1 (latency).",
      relevance: isFr ? "Très haute" : "Very high",
    },
    {
      ref: "SoulX-FlashTalk (arXiv 2512.23379, déc 2025)",
      venue: "arXiv:2512.23379",
      url: "https://arxiv.org/abs/2512.23379",
      desc: isFr
        ? "Premier modèle 14B à atteindre <1s startup latency (0.87s) avec 32 FPS sur 8xH800. Streaming infini audio-driven. Bidirectionnel. Référence pour l'Axe 1 (latence)."
        : "First 14B model to achieve <1s startup latency (0.87s) at 32 FPS on 8xH800. Infinite audio-driven streaming. Bidirectional. Reference for Axis 1 (latency).",
      relevance: isFr ? "Très haute" : "Very high",
    },
    {
      ref: "Avatar Forcing (arXiv 2601.00664, jan 2026)",
      venue: "arXiv:2601.00664",
      url: "https://arxiv.org/abs/2601.00664",
      desc: isFr
        ? "Diffusion forcing-based head avatar pour conversation naturelle. Interaction via signaux audio-visuels. Temps réel. Cité 1 fois en 3 mois."
        : "Diffusion forcing-based head avatar for natural conversation. Interaction via audio-visual signals. Real-time. Cited 1 time in 3 months.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "The Latency Wall (arXiv 2601.15914, jan 2026)",
      venue: "arXiv:2601.15914",
      url: "https://arxiv.org/abs/2601.15914",
      desc: isFr
        ? "Benchmark reconnaissance émotionnelle temps réel pour avatars virtuels. 7 émotions. Trade-off qualité/latence documenté. Référence pour l'Axe 2 (comportement avatar)."
        : "Real-time emotion recognition benchmark for virtual avatars. 7 emotions. Quality/latency trade-off documented. Reference for Axis 2 (avatar behavior).",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "Memory Augmented Routing (arXiv 2603.23013, mars 2026)",
      venue: "arXiv:2603.23013",
      url: "https://arxiv.org/abs/2603.23013",
      desc: isFr
        ? "Hybrid retrieval pour mémoire conversationnelle. Turn-pairs storage. Queries factuelles + contextuelles. Directement applicable à l'architecture mémoire 3 couches DigiDouble."
        : "Hybrid retrieval for conversational memory. Turn-pairs storage. Factual + contextual queries. Directly applicable to DigiDouble's 3-layer memory architecture.",
      relevance: isFr ? "Très haute" : "Very high",
    },
  ];

  const subTabLabels = {
    commercial: isFr ? "Commercial" : "Commercial",
    opensource: isFr ? "Open Source" : "Open Source",
  };

  return (
    <div className="min-h-screen">
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

          {/* ═══════════════════════════════════════════════════════════════
               SECTION A — STREAMING VIDEO AVATAR
          ═══════════════════════════════════════════════════════════════ */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ background: "oklch(0.55 0.20 200)", color: "white" }}>A</span>
              <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Avatars Vidéo Streaming" : "Streaming Video Avatars"}
              </h2>
            </div>
            {/* Sub-tabs */}
            <div className="flex gap-1 mb-5 border-b border-slate-200">
              {(["commercial", "opensource"] as AvatarTab[]).map((tab) => (
                <button key={tab} onClick={() => setAvatarTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                    avatarTab === tab ? "border-cyan-500 text-cyan-600" : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {subTabLabels[tab]}
                </button>
              ))}
            </div>

          {/* Commercial platforms */}
          {avatarTab === "commercial" && (
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
                      <th>{isFr ? "Liens" : "Links"}</th>
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
                        <td><SolutionTableCell solutionKey={(p as any).linkKey || ""} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CTA Pricing — bien visible au-dessus des cartes */}
              <div className="mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border" style={{ background: 'oklch(0.97 0.01 240)', borderColor: 'oklch(0.88 0.04 240)' }}>
                <div>
                  <p className="text-sm font-semibold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? 'Comparer les coûts réels $/minute' : 'Compare real costs $/minute'}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isFr ? 'Graphique interactif + tableau trié pour toutes les plateformes' : 'Interactive chart + sortable table for all platforms'}
                  </p>
                </div>
                <InternalLink
                  to="/avatars/pricing"
                  className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-5 py-2.5 transition-all hover:opacity-90 active:scale-95"
                  style={{ background: 'oklch(0.55 0.20 200)', fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}
                >
                  {isFr ? 'Voir la comparaison tarifaire →' : 'View pricing comparison →'}
                </InternalLink>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {commercialPlatforms.map((p) => {
                  const allText = [...((p as any).strengths || []), p.notes].join(' ').toLowerCase();
                  const customTags: string[] = [];
                  if (allText.includes('knowledge base') || allText.includes('rag')) customTags.push('RAG');
                  if (allText.includes('custom llm') || allText.includes('llm custom') || allText.includes('llm-connected') || allText.includes('lm-connected')) customTags.push('Custom LLM');
                  if (allText.includes('emotion') || allText.includes('émot')) customTags.push(isFr ? 'Émotions' : 'Emotions');
                  if (allText.includes('voice') || allText.includes('vocal') || allText.includes('voix')) customTags.push(isFr ? 'Voix' : 'Voice');
                  if (allText.includes('on-prem') || allText.includes('self-host') || allText.includes('souverain')) customTags.push('On-premise');
                  if (allText.includes('single image') || allText.includes('image unique')) customTags.push(isFr ? 'Avatar perso.' : 'Custom avatar');
                  if (allText.includes('behavior') || allText.includes('comportement') || allText.includes('listening')) customTags.push(isFr ? 'Comportement' : 'Behavior');
                  const hasDetailPage = (p as any).linkKey && ["heygen","tavus","synthesia","simli","anam","did","runway","beyond_presence","bithuman","hedra","lemon_slice"].includes((p as any).linkKey);
                  // Map linkKey → platformData id (when they differ)
                  const platformDetailId = (p as any).linkKey === "lemon_slice" ? "lemonslice" : (p as any).linkKey;
                  return (
                    <div key={p.name} className="border border-slate-200 rounded-xl p-4 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-slate-900 text-sm flex items-center gap-1.5 flex-wrap" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {(p as any).linkKey ? (
                              <a href={(SOLUTION_LINKS as any)[(p as any).linkKey]?.homepage} target="_blank" rel="noopener noreferrer" className="hover:text-[#0891b2] transition-colors">{p.name}</a>
                            ) : p.name}
                            <SolutionTableCell solutionKey={(p as any).linkKey || ""} />
                          </div>
                          <div className="mt-1 inline-flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ background: 'oklch(0.95 0.04 145)', color: 'oklch(0.35 0.14 145)' }}>
                            {p.pricing}
                          </div>
                        </div>
                      </div>
                      {customTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {customTags.map((tag) => (
                            <span key={tag} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'oklch(0.93 0.05 260)', color: 'oklch(0.35 0.15 260)', fontFamily: "'Space Grotesk', sans-serif" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
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
                            <span>{isFr ? "Customisation" : "Customisation"}</span><span>{(p.score as any).customisation ?? "—"}/10</span>
                          </div>
                          <ScoreBar value={(p.score as any).customisation ?? 0} color="oklch(0.60 0.18 280)" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-slate-500 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            <span>{isFr ? "Pricing (accessibilité)" : "Pricing (accessibility)"}</span><span>{(p.score as any).pricing ?? "—"}/10</span>
                          </div>
                          <ScoreBar value={(p.score as any).pricing ?? 0} color="oklch(0.55 0.18 145)" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-slate-500 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            <span>{isFr ? "Souveraineté" : "Sovereignty"}</span><span>{p.score.sovereignty}/10</span>
                          </div>
                          <ScoreBar value={p.score.sovereignty} color="oklch(0.72 0.18 50)" />
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed flex-1" style={{ fontFamily: "'Source Serif 4', serif" }}>{p.notes}</p>
                      {hasDetailPage && (
                        <div className="mt-4">
                          <InternalLink
                            to={`/platform/${platformDetailId}`}
                            className="w-full flex items-center justify-center gap-2 text-sm font-semibold rounded-lg px-4 py-2.5 transition-all hover:opacity-90 active:scale-95"
                            style={{ background: 'oklch(0.20 0.04 240)', color: 'white', fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}
                          >
                            {isFr ? 'Fiche compl\u00e8te : customisation, API, pricing \u2192' : 'Full details: customisation, API, pricing \u2192'}
                          </InternalLink>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}
          {/* Open source Avatar */}
          {avatarTab === "opensource" && (
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
                      <th>{isFr ? "Liens" : "Links"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openSourceSolutions.map((s) => (
                      <tr key={s.name}>
                        <td>
                          <div className="font-semibold text-slate-900 text-sm flex items-center gap-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {(s as any).linkKey && SOLUTION_LINKS[(s as any).linkKey]?.homepage ? (
                              <a href={SOLUTION_LINKS[(s as any).linkKey]!.homepage} target="_blank" rel="noopener noreferrer" className="hover:text-[#0891b2] transition-colors">{s.name}</a>
                            ) : s.name}
                          </div>
                        </td>
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
                        <td><SolutionTableCell solutionKey={(s as any).linkKey || ""} /></td>
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

              {/* Tavus Phoenix-4 deep dive */}
              <div className="mt-6 border-2 border-cyan-200 rounded-lg overflow-hidden">
                <div className="bg-cyan-50 px-5 py-3 flex items-center justify-between border-b border-cyan-200">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ background: "oklch(0.72 0.18 200)", color: "white" }}>KEY REFERENCE</span>
                    <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Tavus Phoenix-4 + Raven-1 — {isFr ? "Analyse approfondie (mise à jour avril 2026)" : "Deep Dive (updated April 2026)"}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <a href="https://www.tavus.io/post/raven-1-bringing-emotional-intelligence-to-artificial-intelligence" target="_blank" rel="noopener noreferrer"
                      className="text-xs font-mono text-cyan-600 hover:text-cyan-800 underline">
                      Raven-1 ↗
                    </a>
                    <a href="https://phoenix.tavuslabs.org/" target="_blank" rel="noopener noreferrer"
                      className="text-xs font-mono text-cyan-600 hover:text-cyan-800 underline">
                      Phoenix-4 demo ↗
                    </a>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-slate-600 leading-relaxed mb-5" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {isFr
                      ? "En avril 2026, Tavus a complété son stack CVI (Conversational Video Intelligence) avec le lancement de Raven-1, une couche de perception multimodale qui comprend non seulement ce que dit l'utilisateur, mais comment il le dit et ce que cela signifie. Combiné à Phoenix-4 (rendu comportemental temps réel, aucune boucle vidéo pré-enregistrée) et Sparrow-1 (gestion des tours de parole), Tavus définit désormais la référence commerciale la plus avancée pour les avatars conversationnels émotionnellement intelligents."
                      : "In April 2026, Tavus completed its CVI (Conversational Video Intelligence) stack with the launch of Raven-1, a multimodal perception layer that understands not just what the user says, but how they say it and what that combination actually means. Combined with Phoenix-4 (real-time behavioral rendering, no pre-recorded video loops) and Sparrow-1 (turn-taking), Tavus now defines the most advanced commercial reference for emotionally intelligent conversational avatars."
                    }
                  </p>

                  {/* Official comparison table */}
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? "Stack CVI Tavus 2026 — 3 modèles complémentaires" : "Tavus CVI Stack 2026 — 3 complementary models"}
                  </h4>
                  <div className="overflow-x-auto mb-5">
                    <table className="data-table text-xs">
                      <thead>
                        <tr>
                          <th>{isFr ? "Plateforme" : "Platform"}</th>
                          <th>{isFr ? "Temps réel" : "True Real-Time"}</th>
                          <th>{isFr ? "Tête complète" : "Full Head"}</th>
                          <th>{isFr ? "Contr. émotion" : "Emotion Control"}</th>
                          <th>{isFr ? "Écoute active" : "Active Listening"}</th>
                          <th>{isFr ? "Pose tête" : "Headpose"}</th>
                          <th>{isFr ? "Performance" : "Performance"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "Tavus Phoenix-4", rt: true, head: true, emo: true, listen: true, pose: true, perf: "40 FPS @ 1080p" },
                          { name: "Tavus Raven-1", rt: true, head: true, emo: true, listen: true, pose: true, perf: "Audio < 100ms · AV < 300ms" },
                          { name: "Tavus Sparrow-1", rt: true, head: false, emo: false, listen: true, pose: false, perf: "Turn-taking model" },
                          { name: "Anam CARA III", rt: true, head: true, emo: false, listen: false, pose: true, perf: "~25 FPS @ 480p" },
                          { name: "Runway Characters", rt: true, head: false, emo: false, listen: false, pose: false, perf: "<500ms WebRTC" },
                          { name: "HeyGen LiveAvatar", rt: true, head: false, emo: false, listen: false, pose: false, perf: "Not stated" },
                          { name: "Synthesia Video Agents", rt: false, head: false, emo: false, listen: false, pose: false, perf: "—" },
                        ].map((row) => (
                          <tr key={row.name} style={{ background: row.name === "Tavus Phoenix-4" ? "oklch(0.97 0.02 200)" : undefined }}>
                            <td><span className="font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{row.name}</span></td>
                            <td><span style={{ color: row.rt ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{row.rt ? "✓" : "✗"}</span></td>
                            <td><span style={{ color: row.head ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{row.head ? "✓" : "✗"}</span></td>
                            <td><span style={{ color: row.emo ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{row.emo ? "✓" : "✗"}</span></td>
                            <td><span style={{ color: row.listen ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{row.listen ? "✓" : "✗"}</span></td>
                            <td><span style={{ color: row.pose ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{row.pose ? "✓" : "✗"}</span></td>
                            <td><span className="font-mono text-xs text-slate-700">{row.perf}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Architecture highlights */}
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? "Architecture technique clé — Phoenix-4 + Raven-1" : "Key technical architecture — Phoenix-4 + Raven-1"}
                  </h4>
                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      {
                        label: isFr ? "Rendu" : "Rendering",
                        value: "3D Gaussian Splatting",
                        detail: isFr ? "Contrôle implicite (vs mesh explicite Phoenix-3). Plus flexible, moins rigide." : "Implicit control (vs explicit mesh Phoenix-3). More flexible, less rigid.",
                        color: "oklch(0.72 0.18 200)",
                      },
                      {
                        label: isFr ? "Animation" : "Animation",
                        value: isFr ? "Diffusion causale" : "Causal diffusion",
                        detail: isFr ? "DiffPoseTalk-inspired. Architecture causale pour inférence streaming temps réel sans sacrifier la qualité." : "DiffPoseTalk-inspired. Causal architecture for real-time streaming inference without quality sacrifice.",
                        color: "oklch(0.65 0.18 145)",
                      },
                      {
                        label: isFr ? "Émotions" : "Emotions",
                        value: isFr ? "Boucle perception-expression" : "Perception-expression loop",
                        detail: isFr ? "Raven-1 : fusion audio-visuelle (ton + expression + regard + posture) → sortie NL pour LLMs. Fraîcheur contexte < 300ms. Perception audio < 100ms. Tool calling OpenAI-compatible (callbacks sur rire, seuils émotionnels, changements d'attention)." : "Raven-1: audio-visual fusion (tone + expression + gaze + posture) → NL output for LLMs. Context freshness < 300ms. Audio perception < 100ms. OpenAI-compatible tool calling (callbacks on laughter, emotional thresholds, attention shifts).",
                        color: "oklch(0.72 0.18 50)",
                      },
                      {
                        label: isFr ? "Perception" : "Perception",
                        value: "Raven-1 Multimodal",
                        detail: isFr ? "Nouveau (avril 2026) : modèle de perception multimodale qui comprend ce que dit l'utilisateur, comment il le dit, et ce que cela signifie. Suivi temporel des états émotionnels et attentionnels tout au long de la conversation." : "New (April 2026): multimodal perception model that understands what the user says, how they say it, and what that combination means. Temporal tracking of emotional and attentional states throughout the conversation.",
                        color: "oklch(0.65 0.18 280)",
                      },
                    ].map((item) => (
                      <div key={item.label} className="border border-slate-200 rounded p-3">
                        <div className="text-xs font-bold mb-1" style={{ color: item.color, fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</div>
                        <div className="text-sm font-semibold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.value}</div>
                        <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{item.detail}</p>
                      </div>
                    ))}
                  </div>

                  {/* Inspirations for DigiDouble */}
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? "Ce que DigiDouble peut s'inspirer de Phoenix-4" : "What DigiDouble can learn from Phoenix-4"}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {[
                      {
                        axis: isFr ? "Axe 2b" : "Axis 2b",
                        title: isFr ? "Comportement d'écoute actif" : "Active listening behavior",
                        desc: isFr
                          ? "L'avatar DigiDouble doit animer en continu, pas seulement pendant la parole. Micro-expressions, mouvements de tête, clignements pendant les silences — c'est ce qui crée la \"présence\"."
                          : "DigiDouble's avatar must animate continuously, not just when speaking. Micro-expressions, head movements, blinks during silence — this is what creates \"presence\".",
                        color: "oklch(0.72 0.18 50)",
                      },
                      {
                        axis: isFr ? "Axe 2b" : "Axis 2b",
                        title: isFr ? "Gaussian Splatting implicite" : "Implicit Gaussian Splatting",
                        desc: isFr
                          ? "Contrôle implicite des Gaussians (vs mesh FLAME explicite) = plus de flexibilité pour l'expressivité. À évaluer pour remplacer HeyGem OS à terme."
                          : "Implicit Gaussian control (vs explicit FLAME mesh) = more flexibility for expressiveness. Worth evaluating to eventually replace HeyGem OS.",
                        color: "oklch(0.72 0.18 50)",
                      },
                      {
                        axis: isFr ? "Axe 1" : "Axis 1",
                        title: isFr ? "Distillation pour inférence temps réel" : "Distillation for real-time inference",
                        desc: isFr
                          ? "Phoenix-4 utilise la distillation + architecture causale pour maintenir 40 FPS sans sacrifier la qualité. Technique directement applicable à l'Axe 1 (latence) de DigiDouble."
                          : "Phoenix-4 uses distillation + causal architecture to maintain 40 FPS without quality sacrifice. Technique directly applicable to DigiDouble's Axis 1 (latency).",
                        color: "oklch(0.72 0.18 200)",
                      },
                      {
                        axis: isFr ? "Axe 3" : "Axis 3",
                        title: isFr ? "Directives LLM → contrôle émotionnel" : "LLM directives → emotional control",
                        desc: isFr
                          ? "Phoenix-4 accepte des directives LLM pour piloter les émotions de l'avatar. L'orchestrateur DigiDouble (Axe 3) pourrait utiliser ce mécanisme pour contrôler l'expression selon le contexte pédagogique."
                          : "Phoenix-4 accepts LLM directives to drive avatar emotions. DigiDouble's orchestrator (Axis 3) could use this mechanism to control expression based on pedagogical context.",
                        color: "oklch(0.65 0.18 145)",
                      },
                      {
                        axis: isFr ? "Axe 2a" : "Axis 2a",
                        title: isFr ? "Stack comportemental complet" : "Full behavioral stack",
                        desc: isFr
                          ? "Phoenix-4 + Sparrow-1 (timing) + Raven-1 (perception) = stack end-to-end. DigiDouble doit concevoir un stack équivalent souverain : ASR + LLM + TTS + Avatar + Perception émotionnelle."
                          : "Phoenix-4 + Sparrow-1 (timing) + Raven-1 (perception) = end-to-end stack. DigiDouble must design an equivalent sovereign stack: ASR + LLM + TTS + Avatar + Emotional perception.",
                        color: "oklch(0.72 0.18 50)",
                      },
                      {
                        axis: isFr ? "Différenciateur" : "Differentiator",
                        title: isFr ? "Ce que Phoenix-4 n'a pas" : "What Phoenix-4 doesn't have",
                        desc: isFr
                          ? "Mémoire persistante multi-sessions, souveraineté de déploiement, orchestration narrative (playlist vidéo dynamique), séquençage cinématographique (mode narratif). Ces 4 points sont les différenciateurs clés de DigiDouble."
                          : "Persistent multi-session memory, deployment sovereignty, narrative orchestration (dynamic video playlist), cinematographic sequencing (narrative mode). These 4 points are DigiDouble's key differentiators.",
                        color: "oklch(0.60 0.20 25)",
                      },
                    ].map((item) => (
                      <div key={item.title} className="border border-slate-200 rounded p-3 flex gap-3">
                        <div className="shrink-0">
                          <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: item.color + "22", color: item.color }}>{item.axis}</span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</div>
                          <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="callout-warning">
                    <p className="text-sm text-slate-700" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {isFr
                        ? <><strong>Conclusion (avril 2026) :</strong> Avec Raven-1 + Phoenix-4 + Sparrow-1, Tavus est désormais la plateforme commerciale la plus avancée pour les avatars conversationnels émotionnellement intelligents. Raven-1 adresse directement l'Axe 3 de DigiDouble (Contextual Awareness) avec sa perception audio-visuelle temps réel (&lt; 300ms). Phoenix-4 valide l'Axe 2 (Avatar) avec son rendu entièrement généré sans boucles vidéo. Les gaps restants — mémoire persistante, souveraineté RGPD, orchestration narrative, hébergement EU — confirment la valeur unique du projet DigiDouble.</>
                        : <><strong>Conclusion (April 2026):</strong> With Raven-1 + Phoenix-4 + Sparrow-1, Tavus is now the most advanced commercial platform for emotionally intelligent conversational avatars. Raven-1 directly addresses DigiDouble's Axis 3 (Contextual Awareness) with real-time audio-visual perception (&lt; 300ms). Phoenix-4 validates Axis 2 (Avatar) with fully generated rendering and no video loops. The remaining gaps — persistent memory, GDPR sovereignty, narrative orchestration, EU hosting — confirm DigiDouble's unique value proposition.</>
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Simli Trinity-1 deep dive */}
              <div className="mt-6 border-2 border-emerald-200 rounded-lg overflow-hidden">
                <div className="bg-emerald-50 px-5 py-3 flex items-center justify-between border-b border-emerald-200">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ background: "oklch(0.65 0.18 145)", color: "white" }}>LATENCY LEADER 2026</span>
                    <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Simli Trinity-1 — {isFr ? "Analyse approfondie" : "Deep Dive"}
                    </h3>
                  </div>
                  <a href="https://www.simli.com" target="_blank" rel="noopener noreferrer"
                    className="text-xs font-mono text-emerald-600 hover:text-emerald-800 underline">
                    simli.com ↗
                  </a>
                </div>
                <div className="p-5">
                  <p className="text-sm text-slate-600 leading-relaxed mb-5" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {isFr
                      ? "Simli est la startup 'infrastructure-first' de la génération 2023. Fondée par des anciens de Y Combinator, elle se positionne non pas comme un studio créatif mais comme la 'face layer' pour les AI agents. Son modèle Trinity-1 atteint <300ms de latence avec Gaussian Splatting propriétaire — et son pricing à $0.009/min est 39× moins cher que D-ID. C'est la référence pour le benchmark latence de l'Axe 1 DigiDouble."
                      : "Simli is the 'infrastructure-first' startup of the 2023 generation. Founded by Y Combinator alumni, it positions itself not as a creative studio but as the 'face layer' for AI agents. Its Trinity-1 model achieves <300ms latency with proprietary Gaussian Splatting — and its $0.009/min pricing is 39× cheaper than D-ID. It is the latency benchmark reference for DigiDouble Axis 1."
                    }
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      {
                        label: isFr ? "Latence" : "Latency",
                        value: "<300ms",
                        detail: isFr ? "Sub-300ms garanti. WebRTC (Daily infrastructure) + WebSockets. Le plus rapide du marché accessible." : "Sub-300ms guaranteed. WebRTC (Daily infrastructure) + WebSockets. Fastest on the accessible market.",
                        color: "oklch(0.65 0.18 145)",
                      },
                      {
                        label: "Pricing",
                        value: "$0.009/min",
                        detail: isFr ? "Le moins cher du marché. 39× moins cher que D-ID ($0.35/min). 22× moins cher que Runway ($0.20/min). Viable à l'échelle." : "Cheapest on the market. 39× cheaper than D-ID ($0.35/min). 22× cheaper than Runway ($0.20/min). Viable at scale.",
                        color: "oklch(0.75 0.16 75)",
                      },
                      {
                        label: isFr ? "Modèle" : "Model",
                        value: "Trinity-1",
                        detail: isFr ? "Gaussian Splatting propriétaire. Custom avatar depuis image unique. Frameworks LiveKit + Pipecat. Qualité bonne mais bitrate bas." : "Proprietary Gaussian Splatting. Custom avatar from single image. LiveKit + Pipecat frameworks. Good quality but low bitrate.",
                        color: "oklch(0.72 0.18 200)",
                      },
                    ].map((item) => (
                      <div key={item.label} className="border border-slate-200 rounded p-3">
                        <div className="text-xs font-bold mb-1" style={{ color: item.color, fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</div>
                        <div className="text-sm font-semibold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.value}</div>
                        <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{item.detail}</p>
                      </div>
                    ))}
                  </div>
                  <div className="callout-info">
                    <p className="text-sm text-slate-700" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {isFr
                        ? <><strong>Pertinence DigiDouble :</strong> Simli Trinity-1 est la référence de benchmark pour l'Axe 1 (latence). Son architecture Gaussian Splatting + WebRTC est une piste à évaluer pour remplacer HeyGem OS. Son pricing $0.009/min valide qu'un avatar temps réel à coût accessible est possible. Les gaps restants : pas de mémoire, pas de souveraineté, pas d'orchestration narrative — exactement les différenciateurs DigiDouble.</>
                        : <><strong>DigiDouble relevance:</strong> Simli Trinity-1 is the benchmark reference for Axis 1 (latency). Its Gaussian Splatting + WebRTC architecture is a path to evaluate for replacing HeyGem OS. Its $0.009/min pricing validates that real-time avatar at accessible cost is possible. Remaining gaps: no memory, no sovereignty, no narrative orchestration — exactly DigiDouble's differentiators.</>
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Runway Characters deep dive */}
              <div className="mt-6 border-2 border-orange-200 rounded-lg overflow-hidden">
                <div className="bg-orange-50 px-5 py-3 flex items-center justify-between border-b border-orange-200">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ background: "oklch(0.72 0.18 50)", color: "white" }}>NEW — MARCH 2026</span>
                    <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Runway Characters — {isFr ? "Analyse approfondie" : "Deep Dive"}
                    </h3>
                  </div>
                  <a href="https://runwayml.com/news/introducing-runway-characters" target="_blank" rel="noopener noreferrer"
                    className="text-xs font-mono text-orange-600 hover:text-orange-800 underline">
                    runwayml.com ↗
                  </a>
                </div>
                <div className="p-5">
                  <p className="text-sm text-slate-600 leading-relaxed mb-5" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {isFr
                      ? "Lancé le 10 mars 2026, Runway Characters est une API temps réel permettant de créer un avatar conversationnel depuis une seule image — sans fine-tuning. Basé sur GWM-1 (General World Model), il supporte tout style visuel (photorealistic, animé, mascotte). Le transport est WebRTC natif. C'est la solution la plus accessible du marché pour prototyper rapidement un avatar conversationnel."
                      : "Launched March 10, 2026, Runway Characters is a real-time API for creating a conversational avatar from a single image — no fine-tuning required. Powered by GWM-1 (General World Model), it supports any visual style (photorealistic, animated, mascot). Transport is native WebRTC. It is the most accessible solution on the market for rapidly prototyping a conversational avatar."
                    }
                  </p>

                  {/* Technical specs */}
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? "Spécifications techniques" : "Technical specifications"}
                  </h4>
                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      {
                        label: isFr ? "Transport" : "Transport",
                        value: "WebRTC natif",
                        detail: isFr ? "Sessions temps réel. Credentials one-time-consume. Lifecycle : NOT_READY → READY → RUNNING → COMPLETED." : "Real-time sessions. One-time-consume credentials. Lifecycle: NOT_READY → READY → RUNNING → COMPLETED.",
                        color: "oklch(0.72 0.18 50)",
                      },
                      {
                        label: isFr ? "Durée session" : "Session duration",
                        value: isFr ? "5 min (dev) / 30 min (API)" : "5 min (dev) / 30 min (API)",
                        detail: isFr ? "Limite stricte. Nécessite une nouvelle session après expiration. Problématique pour les expériences longues (mode narratif)." : "Hard limit. Requires new session after expiration. Problematic for long experiences (narrative mode).",
                        color: "oklch(0.60 0.20 25)",
                      },
                      {
                        label: isFr ? "Pricing" : "Pricing",
                        value: "2 credits / 6s",
                        detail: isFr ? "$0.01/crédit → ~$0.20/min. Plans : Free (125 cr.), Standard $15/mo (625 cr.), Pro $35/mo, Unlimited $95/mo. Coût élevé à l'échelle." : "$0.01/credit → ~$0.20/min. Plans: Free (125 cr.), Standard $15/mo (625 cr.), Pro $35/mo, Unlimited $95/mo. High cost at scale.",
                        color: "oklch(0.72 0.18 200)",
                      },
                    ].map((item) => (
                      <div key={item.label} className="border border-slate-200 rounded p-3">
                        <div className="text-xs font-bold mb-1" style={{ color: item.color, fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</div>
                        <div className="text-sm font-semibold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.value}</div>
                        <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{item.detail}</p>
                      </div>
                    ))}
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-5">
                    <div className="border border-green-200 rounded p-4">
                      <h4 className="text-xs font-bold text-green-700 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {isFr ? "Avantages" : "Strengths"}
                      </h4>
                      <ul className="space-y-1.5">
                        {(isFr
                          ? ["Image unique → avatar sans fine-tuning (n'importe quel style)", "WebRTC natif — latence <500ms", "Knowledge base configurable par avatar", "API simple et bien documentée (Node.js + Python)", "Voix presets expressives (Clara, Victoria, Vincent)", "Portail développeur avec preview et recordings"]
                          : ["Single image → avatar, no fine-tuning (any visual style)", "Native WebRTC — <500ms latency", "Per-avatar configurable knowledge base", "Simple, well-documented API (Node.js + Python)", "Expressive voice presets (Clara, Victoria, Vincent)", "Developer portal with preview and session recordings"]
                        ).map((s) => (
                          <li key={s} className="flex gap-2 text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>
                            <span style={{ color: "oklch(0.65 0.18 145)" }}>✓</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border border-red-200 rounded p-4">
                      <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {isFr ? "Inconvénients" : "Weaknesses"}
                      </h4>
                      <ul className="space-y-1.5">
                        {(isFr
                          ? ["Session max 5–30 min — problématique pour le mode narratif", "Pas de mémoire persistante multi-sessions", "Pas de clonage vocal (voix presets uniquement)", "Pas de contrôle émotionnel avancé (vs Tavus Phoenix-4)", "~$0.20/min = coût élevé à l'échelle", "Pas de souveraineté (cloud Runway US)", "Pas d'orchestration narrative ni de playlist vidéo"]
                          : ["Max 5–30 min session — problematic for narrative mode", "No persistent multi-session memory", "No voice cloning (presets only)", "No advanced emotional control (vs Tavus Phoenix-4)", "~$0.20/min = high cost at scale", "No sovereignty (Runway US cloud)", "No narrative orchestration or video playlist"]
                        ).map((w) => (
                          <li key={w} className="flex gap-2 text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>
                            <span style={{ color: "oklch(0.60 0.20 25)" }}>✗</span> {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Relevance for DigiDouble */}
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? "Pertinence pour DigiDouble" : "Relevance for DigiDouble"}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {[
                      {
                        axis: isFr ? "Prototypage" : "Prototyping",
                        title: isFr ? "Outil de référence pour tests rapides" : "Reference tool for rapid testing",
                        desc: isFr
                          ? "Runway Characters est idéal pour prototyper la mécanique conversationnelle de DigiDouble sans infrastructure GPU. Permet de valider les hypothèses H2 (mémoire) et H3 (comportement) avant d'investir en R&D."
                          : "Runway Characters is ideal for prototyping DigiDouble's conversational mechanics without GPU infrastructure. Enables validating hypotheses H2 (memory) and H3 (behavior) before R&D investment.",
                        color: "oklch(0.72 0.18 50)",
                      },
                      {
                        axis: isFr ? "Axe 1" : "Axis 1",
                        title: isFr ? "Benchmark latence WebRTC" : "WebRTC latency benchmark",
                        desc: isFr
                          ? "La latence <500ms de Runway Characters via WebRTC natif est un benchmark de référence pour l'Axe 1. DigiDouble doit atteindre des performances comparables avec une stack souveraine."
                          : "Runway Characters' <500ms latency via native WebRTC is a reference benchmark for Axis 1. DigiDouble must achieve comparable performance with a sovereign stack.",
                        color: "oklch(0.72 0.18 200)",
                      },
                      {
                        axis: isFr ? "Différenciateur" : "Differentiator",
                        title: isFr ? "Ce que Runway n'a pas" : "What Runway doesn't have",
                        desc: isFr
                          ? "Mémoire persistante, clonage vocal, souveraineté, orchestration narrative (mode narratif), playlist vidéo dynamique, sessions longues. Ces 6 points sont les différenciateurs clés de DigiDouble vs Runway Characters."
                          : "Persistent memory, voice cloning, sovereignty, narrative orchestration (narrative mode), dynamic video playlist, long sessions. These 6 points are DigiDouble's key differentiators vs Runway Characters.",
                        color: "oklch(0.60 0.20 25)",
                      },
                      {
                        axis: isFr ? "Axe 3" : "Axis 3",
                        title: isFr ? "Architecture API à étudier" : "API architecture worth studying",
                        desc: isFr
                          ? "Le modèle Avatar + Session + Knowledge Base de Runway est une architecture API propre à s'inspirer pour l'orchestrateur DigiDouble. La séparation Avatar (persistant) / Session (éphémère) est une bonne pratique."
                          : "Runway's Avatar + Session + Knowledge Base model is a clean API architecture worth studying for DigiDouble's orchestrator. The Avatar (persistent) / Session (ephemeral) separation is a best practice.",
                        color: "oklch(0.65 0.18 145)",
                      },
                    ].map((item) => (
                      <div key={item.title} className="border border-slate-200 rounded p-3 flex gap-3">
                        <div className="shrink-0">
                          <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: item.color + "22", color: item.color }}>{item.axis}</span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</div>
                          <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="callout-info">
                    <p className="text-sm text-slate-700" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {isFr
                        ? <><strong>Conclusion :</strong> Runway Characters est la solution la plus accessible pour prototyper rapidement un avatar conversationnel en mars 2026. Son modèle WebRTC natif et son API simple en font un excellent outil de validation. Cependant, ses limitations (session 5–30 min, pas de mémoire, pas de souveraineté, $0.20/min) confirment la nécessité d'une stack souveraine comme DigiDouble pour les usages professionnels à l'échelle.</>
                        : <><strong>Conclusion:</strong> Runway Characters is the most accessible solution for rapidly prototyping a conversational avatar in March 2026. Its native WebRTC model and simple API make it an excellent validation tool. However, its limitations (5–30 min session, no memory, no sovereignty, $0.20/min) confirm the need for a sovereign stack like DigiDouble for professional use at scale.</>
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          </div>{/* end avatarTab sections + section A */}

          {/* ═══════════════════════════════════════════════════════════════
               SECTION B — TTS & VOICE SYNTHESIS
          ═══════════════════════════════════════════════════════════════ */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ background: "oklch(0.55 0.20 280)", color: "white" }}>B</span>
              <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "TTS & Synthèse Vocale" : "TTS & Voice Synthesis"}
              </h2>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ background: "oklch(0.55 0.20 280)", color: "white" }}>MVP PHASE 1</span>
            </div>
            {/* Sub-tabs */}
            <div className="flex gap-1 mb-5 border-b border-slate-200">
              {(["commercial", "opensource"] as TTSTab[]).map((tab) => (
                <button key={tab} onClick={() => setTtsTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                    ttsTab === tab ? "border-violet-500 text-violet-600" : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {subTabLabels[tab]}
                </button>
              ))}
            </div>
            {ttsTab === "commercial" && (
            <div>
              {/* Context banner */}
              <div className="mb-6 bg-violet-50 border border-violet-200 rounded-lg px-5 py-4">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded mt-0.5" style={{ background: "oklch(0.55 0.20 280)", color: "white" }}>MVP PHASE 1</span>
                  <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {isFr
                      ? <><strong>Voice-to-Voice est le premier livrable de DigiDouble.</strong> Cette section couvre les APIs cloud TTS streaming (2025–2026) pour guider le choix d'architecture du pipeline vocal Phase 1.</>
                      : <><strong>Voice-to-Voice is DigiDouble's first deliverable.</strong> This section covers cloud streaming TTS APIs (2025–2026) to guide Phase 1 voice pipeline architecture decisions.</>
                    }
                  </p>
                </div>
              </div>
              {/* Tableau comparatif Cloud */}
              <div className="overflow-x-auto mb-6">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>{isFr ? "Solution" : "Solution"}</th>
                      <th>TTFA</th>
                      <th>ELO</th>
                      <th>{isFr ? "Clonage" : "Cloning"}</th>
                      <th>{isFr ? "Émotion" : "Emotion"}</th>
                      <th>{isFr ? "Multilingue" : "Multilingual"}</th>
                      <th>{isFr ? "Prix/1M" : "Price/1M"}</th>
                      <th>{isFr ? "Fiche" : "Detail"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cloudTTS.map((t: TTSData) => (
                      <tr key={t.id}>
                        <td>
                          <div className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.name}</div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">{t.digiDoubleAxis}</div>
                        </td>
                        <td><span className="text-xs font-mono" style={{ color: t.ttfaMs <= 100 ? "oklch(0.65 0.18 145)" : t.ttfaMs <= 250 ? "oklch(0.75 0.16 75)" : "oklch(0.60 0.20 25)" }}>{t.ttfaMs}ms</span></td>
                        <td><span className="text-xs font-mono text-slate-600">{t.eloScore > 0 ? t.eloScore : "—"}</span></td>
                        <td><span style={{ color: t.voiceCloning ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{t.voiceCloning ? "✓" : "✗"}</span></td>
                        <td><span style={{ color: t.emotionControl ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{t.emotionControl ? "✓" : "✗"}</span></td>
                        <td><span style={{ color: t.multilingual ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{t.multilingual ? `✓ ${t.languages}` : "✗"}</span></td>
                        <td><span className="text-xs font-mono text-slate-600">{t.pricePerMChar > 0 ? `$${t.pricePerMChar}` : isFr ? "Gratuit" : "Free"}</span></td>
                        <td><InternalLink to={`/tts/${t.id}`} className="text-xs font-mono text-violet-600 hover:text-violet-800 underline">{isFr ? "Voir →" : "View →"}</InternalLink></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {cloudTTS.map((t: TTSData) => (
                  <TTSCard key={t.id} tts={t} isFr={isFr} />
                ))}
              </div>
              {/* Architecture decision callout */}
              <div className="callout-warning">
                <p className="text-sm font-semibold text-slate-800 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Décision d'architecture Phase 1 : Cascade vs End-to-End" : "Phase 1 Architecture Decision: Cascade vs End-to-End"}
                </p>
                <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr
                    ? <>Le MVP Phase 1 doit choisir entre deux approches : <strong>(A) Pipeline en cascade</strong> (ASR → LLM → TTS, ex. Deepgram Nova-3 + Mistral + Cartesia/Kokoro) — plus contrôlable, clonage vocal possible, souveraineté totale possible, latence ~400–800ms ; ou <strong>(B) End-to-end V2V</strong> (Ultravox, Moshi) — latence ~100ms mais moins contrôlable, pas de clonage vocal. <strong>Recommandation DigiDouble :</strong> commencer par (A) avec Voxtral TTS (Mistral, mars 2026) + Deepgram Nova-3 pour valider la qualité conversationnelle, puis évaluer (B) pour l'optimisation latence en Phase 2.</>
                    : <>Phase 1 MVP must choose between two approaches: <strong>(A) Cascading pipeline</strong> (ASR → LLM → TTS, e.g. Deepgram Nova-3 + Mistral + Cartesia/Kokoro) — more controllable, voice cloning possible, full sovereignty possible, ~400–800ms latency; or <strong>(B) End-to-end V2V</strong> (Ultravox, Moshi) — ~100ms latency but less controllable, no voice cloning. <strong>DigiDouble recommendation:</strong> start with (A) using Voxtral TTS (Mistral, March 2026) + Deepgram Nova-3 to validate conversational quality, then evaluate (B) for latency optimization in Phase 2.</>
                  }
                </p>
                <div className="mt-4">
                  <InternalLink to="/voice/pipeline" className="cta-primary">
                    {isFr ? "→ Diagramme interactif du Pipeline Phase 1" : "→ Interactive Phase 1 Pipeline Diagram"}
                  </InternalLink>
                </div>
              </div>
            </div>
            )}
            {ttsTab === "opensource" && (
            <div>
              <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg px-5 py-4">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded mt-0.5" style={{ background: "oklch(0.65 0.18 145)", color: "white" }}>OPEN SOURCE</span>
                  <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {isFr
                      ? <><strong>Modèles open-source souverains</strong> (auto-hébergeables, GDPR-ready) — incluant les modèles Voice-to-Voice end-to-end (Ultravox, Moshi, Voxtral) qui éliminent le pipeline ASR+LLM+TTS.</>
                      : <><strong>Sovereign open-source models</strong> (self-hostable, GDPR-ready) — including end-to-end Voice-to-Voice models (Ultravox, Moshi, Voxtral) that eliminate the ASR+LLM+TTS pipeline.</>
                    }
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto mb-6">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>{isFr ? "Solution" : "Solution"}</th>
                      <th>TTFA</th>
                      <th>ELO</th>
                      <th>{isFr ? "Clonage" : "Cloning"}</th>
                      <th>{isFr ? "V2V" : "V2V"}</th>
                      <th>{isFr ? "Multilingue" : "Multilingual"}</th>
                      <th>{isFr ? "Licence" : "License"}</th>
                      <th>{isFr ? "Fiche" : "Detail"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openTTS.map((t: TTSData) => (
                      <tr key={t.id}>
                        <td>
                          <div className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.name}</div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">{t.digiDoubleAxis}</div>
                        </td>
                        <td><span className="text-xs font-mono" style={{ color: t.ttfaMs <= 100 ? "oklch(0.65 0.18 145)" : t.ttfaMs <= 250 ? "oklch(0.75 0.16 75)" : "oklch(0.60 0.20 25)" }}>{t.ttfaMs}ms</span></td>
                        <td><span className="text-xs font-mono text-slate-600">{t.eloScore > 0 ? t.eloScore : "—"}</span></td>
                        <td><span style={{ color: t.voiceCloning ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{t.voiceCloning ? "✓" : "✗"}</span></td>
                        <td><span style={{ color: (t as any).isV2V ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{(t as any).isV2V ? "✓" : "✗"}</span></td>
                        <td><span style={{ color: t.multilingual ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{t.multilingual ? `✓ ${t.languages}` : "✗"}</span></td>
                        <td><span className="text-xs font-mono text-slate-500">{t.license}</span></td>
                        <td><InternalLink to={`/tts/${t.id}`} className="text-xs font-mono text-emerald-600 hover:text-emerald-800 underline">{isFr ? "Voir →" : "View →"}</InternalLink></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {openTTS.map((t: TTSData) => (
                  <TTSCard key={t.id} tts={t} isFr={isFr} />
                ))}
              </div>
            </div>
            )}
          </div>{/* end section B */}

          {/* ═══════════════════════════════════════════════════════════════
               SECTION C — STT / SPEECH-TO-TEXT
          ═══════════════════════════════════════════════════════════════ */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ background: "oklch(0.55 0.20 50)", color: "white" }}>C</span>
              <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "STT / Reconnaissance Vocale" : "STT / Speech-to-Text"}
              </h2>
            </div>
            {/* Sub-tabs */}
            <div className="flex gap-1 mb-5 border-b border-slate-200">
              {(["commercial", "opensource"] as STTTab[]).map((tab) => (
                <button key={tab} onClick={() => setSttTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                    sttTab === tab ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {subTabLabels[tab]}
                </button>
              ))}
            </div>
            {sttTab === "commercial" && (
            <div>
              <div className="mb-4 bg-orange-50 border border-orange-200 rounded-lg px-5 py-3">
                <p className="text-sm text-slate-700" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr
                    ? <><strong>APIs STT cloud temps réel</strong> — Deepgram Nova-3 est la référence latence (75ms TTFA). Whisper large-v3 est le standard de qualité open-source. AssemblyAI Universal-2 domine le benchmark WER multilingue.</>
                    : <><strong>Real-time cloud STT APIs</strong> — Deepgram Nova-3 is the latency reference (75ms TTFA). Whisper large-v3 is the open-source quality standard. AssemblyAI Universal-2 leads the multilingual WER benchmark.</>
                  }
                </p>
              </div>
              <div className="overflow-x-auto mb-6">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>{isFr ? "Solution" : "Solution"}</th>
                      <th>TTFA</th>
                      <th>WER</th>
                      <th>{isFr ? "Streaming" : "Streaming"}</th>
                      <th>{isFr ? "Multilingue" : "Multilingual"}</th>
                      <th>{isFr ? "Diarisation" : "Diarization"}</th>
                      <th>{isFr ? "Prix/heure" : "Price/hr"}</th>
                      <th>{isFr ? "Souverain" : "Sovereign"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cloudSTT.map((s: STTData) => (
                      <tr key={s.id}>
                        <td>
                          <div className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.name}</div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">{s.digiDoubleAxis}</div>
                        </td>
                        <td><span className="text-xs font-mono" style={{ color: s.latencyMs <= 100 ? "oklch(0.65 0.18 145)" : s.latencyMs <= 250 ? "oklch(0.75 0.16 75)" : "oklch(0.60 0.20 25)" }}>{s.latencyMs}ms</span></td>
                        <td><span className="text-xs font-mono text-slate-600">{s.wer > 0 ? `${s.wer}%` : "—"}</span></td>
                        <td><span style={{ color: s.streaming ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{s.streaming ? "✓" : "✗"}</span></td>
                        <td><span className="text-xs text-slate-600">{s.languages > 0 ? `${s.languages} langs` : "—"}</span></td>
                        <td><span style={{ color: s.speakerDiarization ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{s.speakerDiarization ? "✓" : "✗"}</span></td>
                        <td><span className="text-xs font-mono text-slate-600">{s.pricePerHour > 0 ? `$${s.pricePerHour}/hr` : isFr ? "Gratuit" : "Free"}</span></td>
                        <td><span style={{ color: s.selfHostable ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{s.selfHostable ? "✓" : "✗"}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cloudSTT.map((s: STTData) => (
                  <div key={s.id} className="border border-slate-200 rounded-xl p-4">
                    <div className="font-semibold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.name}</div>
                    <div className="text-xs text-slate-400 font-mono mb-3">{s.digiDoubleAxis}</div>
                    <div className="space-y-2 mb-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Latency</span><span>{s.latencyMs}ms</span></div>
                        <ScoreBar value={s.score.latency} color="oklch(0.72 0.18 200)" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Accuracy</span><span>{s.wer > 0 ? `${s.wer}% WER` : "—"}</span></div>
                        <ScoreBar value={s.score.accuracy} color="oklch(0.65 0.18 145)" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>{isFr ? "Accessibilité prix" : "Price access"}</span><span>{s.score.pricing}/10</span></div>
                        <ScoreBar value={s.score.pricing} color="oklch(0.75 0.16 75)" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
            )}
            {sttTab === "opensource" && (
            <div>
              <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg px-5 py-3">
                <p className="text-sm text-slate-700" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr
                    ? <><strong>Modèles STT open-source</strong> — Whisper large-v3 reste la référence qualité. Whisper.cpp et faster-whisper permettent un déploiement souverain GPU/CPU. Parakeet-TDT-0.6B est le modèle le plus rapide (TTFA 60ms) pour les cas d'usage temps réel.</>
                    : <><strong>Open-source STT models</strong> — Whisper large-v3 remains the quality reference. Whisper.cpp and faster-whisper enable sovereign GPU/CPU deployment. Parakeet-TDT-0.6B is the fastest model (60ms TTFA) for real-time use cases.</>
                  }
                </p>
              </div>
              <div className="overflow-x-auto mb-6">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>{isFr ? "Solution" : "Solution"}</th>
                      <th>TTFA</th>
                      <th>WER</th>
                      <th>{isFr ? "Params" : "Params"}</th>
                      <th>{isFr ? "Streaming" : "Streaming"}</th>
                      <th>{isFr ? "Multilingue" : "Multilingual"}</th>
                      <th>{isFr ? "Licence" : "License"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openSTT.map((s: STTData) => (
                      <tr key={s.id}>
                        <td>
                          <div className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.name}</div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">{s.digiDoubleAxis}</div>
                        </td>
                        <td><span className="text-xs font-mono" style={{ color: s.latencyMs <= 100 ? "oklch(0.65 0.18 145)" : s.latencyMs <= 250 ? "oklch(0.75 0.16 75)" : "oklch(0.60 0.20 25)" }}>{s.latencyMs}ms</span></td>
                        <td><span className="text-xs font-mono text-slate-600">{s.wer > 0 ? `${s.wer}%` : "—"}</span></td>
                        <td><span className="text-xs font-mono text-slate-500">{s.params}</span></td>
                        <td><span style={{ color: s.streaming ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{s.streaming ? "✓" : "✗"}</span></td>
                        <td><span style={{ color: s.multilingual ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{s.multilingual ? `✓ ${s.languages} langs` : "✗"}</span></td>
                        <td><span className="text-xs font-mono text-slate-500">{s.license}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {openSTT.map((s: STTData) => (
                  <div key={s.id} className="border border-slate-200 rounded-xl p-4">
                    <div className="font-semibold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.name}</div>
                    <div className="text-xs text-slate-400 font-mono mb-3">{s.digiDoubleAxis} · {s.params}</div>
                    <div className="space-y-2 mb-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Latency</span><span>{s.latencyMs}ms</span></div>
                        <ScoreBar value={s.score.latency} color="oklch(0.72 0.18 200)" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Accuracy</span><span>{s.wer > 0 ? `${s.wer}% WER` : "—"}</span></div>
                        <ScoreBar value={s.score.accuracy} color="oklch(0.65 0.18 145)" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{s.description}</p>
                    <div className="mt-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "oklch(0.93 0.04 145)", color: "oklch(0.35 0.14 145)" }}>{s.license}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            )}
          </div>{/* end section C */}
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
          <DiagramModal title="Latency Benchmarks by Component (2025–2026)">
            <LatencyBenchmarkDiagram />
          </DiagramModal>

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
                ? <>Il est impossible d'optimiser simultanément les trois dimensions avec les approches actuelles. Les plateformes à faible latence (&lt;100ms) comme Beyond Presence ou NVIDIA ACE nécessitent une infrastructure propriétaire coûteuse. Les solutions open-source souveraines restent à 2–15s. La recherche fondamentale est nécessaire pour trouver des architectures permettant de briser ce trilemme.{" "}<InternalLink to="/research">Voir les défis de recherche →</InternalLink></>
                : <>It is impossible to simultaneously optimize all three dimensions with current approaches. Low-latency platforms (&lt;100ms) like Beyond Presence or NVIDIA ACE require costly proprietary infrastructure. Sovereign open-source solutions remain at 2–15s. Fundamental research is needed to find architectures that break this trilemma.{" "}<InternalLink to="/research">See Research Challenges →</InternalLink></>
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

          {/* Positioning diagram — full width */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Positionnement concurrentiel : Latence × Souveraineté" : "Competitive Positioning: Latency × Sovereignty"}
            </h3>
            <div className="border border-slate-200 rounded-lg p-5" style={{ background: "oklch(0.99 0.003 200)" }}>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? "Le gap DigiDouble est visible : les solutions rapides n'ont pas de souveraineté, les solutions souveraines ne sont pas rapides. La flèche pointillée matérialise l'objectif R&D Axe 1."
                  : "The DigiDouble gap is visible: fast solutions have no sovereignty, sovereign solutions are not fast. The dashed arrow materializes the Axis 1 R&D goal."}
              </p>
              <PositioningDiagram />
            </div>
          </div>

          {/* Urgency × Difficulty Matrix — full width, above research axes */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Matrice Urgence × Difficulté" : "Urgency × Difficulty Matrix"}
            </h3>
            <ResearchGapDiagram />
          </div>
          {/* 3 Research Axes — full width below */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "3 Axes de Recherche" : "3 Research Axes"}
            </h3>
            <ResearchAxesDiagram />
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
                    <div className="font-medium text-slate-900 text-xs mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {paper.url ? (
                        <a href={paper.url} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "oklch(0.50 0.18 200)" }}>{paper.ref}</a>
                      ) : paper.ref}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mb-1">
                      {paper.url ? (
                        <a href={paper.url} target="_blank" rel="noopener noreferrer" className="hover:underline opacity-70">{paper.venue} ↗</a>
                      ) : paper.venue}
                    </div>
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
                    <div className="font-medium text-slate-900 text-xs mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {paper.url ? (
                        <a href={paper.url} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "oklch(0.50 0.18 50)" }}>{paper.ref}</a>
                      ) : paper.ref}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mb-1">
                      {paper.url ? (
                        <a href={paper.url} target="_blank" rel="noopener noreferrer" className="hover:underline opacity-70">{paper.venue} ↗</a>
                      ) : paper.venue}
                    </div>
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
                    <td className="text-xs text-slate-400 font-mono">
                      {m.sourceUrl ? (
                        <a href={m.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "oklch(0.55 0.15 200)" }}>{m.source} ↗</a>
                      ) : m.source}
                    </td>
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
                ? <>La combinaison unique que vise DigiDouble — conversation IA + avatar photorealistic + séquençage vidéo intelligent + contrôle narratif/pédagogique + souveraineté — n'existe dans aucune solution commerciale ou open-source actuelle. Les gaps identifiés (mémoire long-terme, fidélité comportementale, latence avatar) correspondent précisément aux frontières de la recherche académique actuelle, ce qui justifie pleinement un programme de recherche fondamentale.</>
                : <>The unique combination DigiDouble targets — AI conversation + photorealistic avatar + intelligent video sequencing + narrative/pedagogical control + sovereignty — does not exist in any current commercial or open-source solution. The identified gaps (long-term memory, behavioral fidelity, avatar latency) correspond precisely to the frontiers of current academic research, fully justifying a fundamental research program.</>
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
                  <th>{isFr ? "Détails techniques" : "Technical details"}</th>
                </tr>
              </thead>
              <tbody>
                {techStackRows.map((row) => (
                  <tr key={row.layer}>
                    <td className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{row.layer}</td>
                    <td className="text-sm text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {row.primaryUrl ? (
                        <a href={row.primaryUrl} target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold" style={{ color: "oklch(0.45 0.18 200)" }}>{row.primary} ↗</a>
                      ) : row.primary}
                    </td>
                    <td className="text-xs text-slate-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {row.altUrl ? (
                        <a href={row.altUrl} target="_blank" rel="noopener noreferrer" className="hover:underline opacity-70">{row.alt} ↗</a>
                      ) : row.alt}
                    </td>
                    <td><span className="text-xs font-bold font-mono" style={{ color: "oklch(0.65 0.18 145)" }}>{row.latency}</span></td>
                    <td><span style={{ color: row.sovereign ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{row.sovereign ? "✓" : "✗"}</span></td>
                    <td className="text-xs text-slate-500 max-w-xs" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      <div className="text-slate-700 mb-1">{row.reason}</div>
                      {row.detail && <div className="text-slate-400 italic text-xs border-t border-slate-100 pt-1 mt-1">{row.detail}</div>}
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
