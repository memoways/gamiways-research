/**
 * AvatarsOverview.tsx — GamiWays Research Portal
 * Page: Streaming Video Avatars — extracted from StateOfArt section A
 * Design: Technical Blueprint, dense comparative tables
 * i18n: EN / FR via LangContext
 */
import { useState, useMemo } from "react";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import SectionHeader from "@/components/SectionHeader";
import { SolutionTableCell } from "@/components/SolutionBadge";
import { SOLUTION_LINKS } from "@/lib/solutionLinks";
import { Home, ChevronRight, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

function ScoreBar({ value, max = 10, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${(value / max) * 100}%`, background: color }} />
      </div>
      <span className="text-xs font-mono text-slate-500 w-4">{value}</span>
    </div>
  );
}

type AvatarTab = "commercial" | "opensource";
type SortDir = "asc" | "desc";
type CommKey = "name" | "realtime" | "bodyLanguage" | "conversation" | "latency" | "sovereignty" | "censorship";
type OpenKey = "name" | "type" | "latency" | "quality" | "deployment" | "license";

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ChevronsUpDown className="w-3 h-3 opacity-40" />;
  return dir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
}

export default function AvatarsOverview() {
  const [avatarTab, setAvatarTab] = useState<AvatarTab>("commercial");
  const [commSort, setCommSort] = useState<{ key: CommKey; dir: SortDir }>({ key: "name", dir: "asc" });
  const [openSort, setOpenSort] = useState<{ key: OpenKey; dir: SortDir }>({ key: "name", dir: "asc" });
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

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
      pricing: "~$0.35/min",
      censorship: isFr ? "Risque moyen" : "Medium risk",
      notes: isFr
        ? "V4 lancé 16 mars 2026. Diffusion-powered expressive delivery, consistent identity. Agents LLM connectés. Transport WebRTC (Janus). Option VPC/on-prem disponible."
        : "V4 launched March 16, 2026. Diffusion-powered expressive delivery, consistent identity. LLM-connected agents. WebRTC transport (Janus). VPC/on-prem option available.",
      strengths: isFr
        ? ["Agents LLM connectés", "Option VPC/on-prem", "Consistent identity V4", "Enterprise scale"]
        : ["LLM-connected agents", "VPC/on-prem option", "Consistent identity V4", "Enterprise scale"],
      weaknesses: isFr
        ? ["Pas de SDK haut niveau", "Coût élevé ($0.35/min)", "Pas de mémoire persistante", "Pas de souveraineté totale"]
        : ["No high-level SDK", "High cost ($0.35/min)", "No persistent memory", "No full sovereignty"],
      score: { quality: 7, latency: 6, cost: 4, sovereignty: 3, customisation: 6, pricing: 4 },
    },
    {
      name: isFr ? "BeyondPresence (Genesis 2)" : "BeyondPresence (Genesis 2)",
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
        ? "Fondé 2024. 1080p haute résolution. Genesis 2 annoncé. Transport WebRTC (LiveKit). Frameworks LiveKit + Pipecat."
        : "Founded 2024. 1080p high resolution. Genesis 2 announced. WebRTC transport (LiveKit). LiveKit + Pipecat frameworks.",
      strengths: isFr
        ? ["1080p haute résolution", "Hyper-réaliste", "Frameworks LiveKit/Pipecat", "Genesis 2 très prometteur"]
        : ["1080p high resolution", "Hyper-realistic", "LiveKit/Pipecat frameworks", "Genesis 2 very promising"],
      weaknesses: isFr
        ? ["Coût élevé Agent API", "Pas de mémoire persistante", "Pas de souveraineté", "Genesis 2 pas encore dispo"]
        : ["High Agent API cost", "No persistent memory", "No sovereignty", "Genesis 2 not yet available"],
      score: { quality: 9, latency: 8, cost: 3, sovereignty: 2, customisation: 5, pricing: 3 },
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
        ? "Lancé mars 2026. Avatar depuis une seule image (photorealistic, animé, mascotte). Basé sur GWM-1. Sessions max 5 min (dev) / 30 min (API). Knowledge base configurable."
        : "Launched March 2026. Avatar from a single image (photorealistic, animated, mascot). Powered by GWM-1. Sessions max 5 min (dev) / 30 min (API). Configurable knowledge base.",
      strengths: isFr
        ? ["Image unique → avatar", "WebRTC natif", "Knowledge base configurable", "Tout style visuel"]
        : ["Single image → avatar", "Native WebRTC", "Configurable knowledge base", "Any visual style"],
      weaknesses: isFr
        ? ["Session max 5–30 min", "Pas de mémoire persistante", "Pas de clonage vocal", "Pas de souveraineté"]
        : ["Max 5–30 min session", "No persistent memory", "No voice cloning", "No sovereignty"],
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
        ? "Fondé 2023, Y Combinator. Trinity-1 : Gaussian Splatting propriétaire, <300ms latence. Transport WebRTC (Daily) + WebSockets. Frameworks LiveKit + Pipecat."
        : "Founded 2023, Y Combinator. Trinity-1: proprietary Gaussian Splatting, <300ms latency. WebRTC (Daily) + WebSockets transport. LiveKit + Pipecat frameworks.",
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
      pricing: "~$0.18/min",
      censorship: isFr ? "Faible" : "Low",
      notes: isFr
        ? "Fondé 2023, ex-Synthesia. Focus intelligence émotionnelle. Transport WebRTC (Pion). Knowledge base, LLM custom, outils. Qualité très bonne."
        : "Founded 2023, ex-Synthesia. Focus emotional intelligence. WebRTC (Pion) transport. Knowledge base, custom LLM, tools. Very good quality.",
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
        ? ["Comportement d'écoute actif", "Contrôle émotionnel complet", "40 FPS @ 1080p", "Boucle perception-expression"]
        : ["Active listening behavior", "Full emotional control", "40 FPS @ 1080p", "Perception-expression loop"],
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
        ? "Fondé 2024 (ex-Infinity AI). $10.5M seed (YC + Matrix). Modèle LemonSlice-2 : 20B paramètres, 20 FPS, architecture causale autoregressive. LS-2.1 ajoute déclenchement d'émotions et d'actions temps réel. Support multi-style unique : humains, cartoons, mascottes, animaux."
        : "Founded 2024 (ex-Infinity AI). $10.5M seed (YC + Matrix). LemonSlice-2 model: 20B parameters, 20 FPS, causal autoregressive architecture. LS-2.1 adds real-time emotion and action triggering. Unique multi-style: humans, cartoons, mascots, animals.",
      strengths: isFr
        ? ["Multi-style unique (humains + cartoons + mascottes)", "Custom avatar depuis 1 photo", "Déclenchement émotions/actions temps réel", "Corps entier + gestes mains", "Self-Managed Pipeline"]
        : ["Unique multi-style (humans + cartoons + mascots)", "Custom avatar from 1 photo", "Real-time emotion/action triggering", "Full body + hand gestures", "Self-Managed Pipeline"],
      weaknesses: isFr
        ? ["Latence ~3s (hosted)", "Pas de souveraineté (cloud US)", "Pas de mémoire narrative", "Pas d'orchestration multi-agents"]
        : ["~3s latency (hosted)", "No sovereignty (US cloud)", "No narrative memory", "No multi-agent orchestration"],
      score: { quality: 8, latency: 5, cost: 7, sovereignty: 1, customisation: 9, pricing: 7 },
    },
  ];

  const openSourceSolutions = [
    { name: "HeyGem OS", linkKey: "heygem", type: "Avatar", latency: "5–15s", quality: isFr ? "Bonne" : "Good", deployment: "Docker (3 containers)", license: "Open Source", notes: isFr ? "Apache 2.0. Déploiement Docker 3 containers. Gain de performance significatif avec Arch Linux vs Ubuntu (jusqu'à 30%). Infrastructure GPU propre requise." : "Apache 2.0. Docker 3-container deployment. Significant performance gain with Arch Linux vs Ubuntu (up to 30%). Dedicated GPU infrastructure required." },
    { name: "SadTalker", linkKey: "sadtalker", type: "Talking Head", latency: "2–10s", quality: isFr ? "Bonne" : "Good", deployment: "Python/GPU", license: "MIT", notes: isFr ? "CVPR 2023. Coefficients 3D depuis audio." : "CVPR 2023. 3D coefficients from audio." },
    { name: "LivePortrait", type: isFr ? "Animation faciale" : "Facial animation", latency: "1–3s", quality: isFr ? "Très bonne" : "Very good", deployment: "Python/GPU", license: "MIT", notes: isFr ? "Animation haute fidélité depuis image unique." : "High-fidelity animation from single image." },
    { name: "Wav2Lip", linkKey: "wav2lip", type: "Lip-sync", latency: "500ms–2s", quality: isFr ? "Moyenne" : "Average", deployment: "Python/GPU", license: "MIT", notes: isFr ? "Lip-sync précis mais expressions limitées." : "Precise lip-sync but limited expressions." },
    { name: "VASA-1 (Microsoft)", type: "Talking Face", latency: "25ms/frame (40 FPS)", quality: isFr ? "Excellente" : "Excellent", deployment: isFr ? "Recherche (non publié)" : "Research (unpublished)", license: isFr ? "Recherche" : "Research", notes: isFr ? "512×512, 40 FPS online. Non commercialisé." : "512×512, 40 FPS online. Not commercialized." },
    { name: "AvatarForcing (arXiv 2603.14331)", type: isFr ? "Streaming diffusion 1-step" : "1-step streaming diffusion", latency: isFr ? "Temps réel" : "Real-time", quality: isFr ? "Très bonne" : "Very good", deployment: isFr ? "Recherche (HuggingFace)" : "Research (HuggingFace)", license: isFr ? "Recherche" : "Research", notes: isFr ? "Mars 2026. One-step streaming diffusion. Image unique + audio streaming. Directement pertinent pour l'Axe 1." : "March 2026. One-step streaming diffusion. Single image + streaming audio. Directly relevant for Axis 1." },
  ];

  const hasDetailPage = (linkKey: string) => ["heygen","tavus","synthesia","simli","anam","did","runway","beyond_presence","bithuman","hedra","lemon_slice"].includes(linkKey);
  const platformDetailId = (linkKey: string) => linkKey === "lemon_slice" ? "lemonslice" : linkKey;

  function toggleComm(key: CommKey) {
    setCommSort(prev => prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });
  }
  function toggleOpen(key: OpenKey) {
    setOpenSort(prev => prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });
  }

  const sortedComm = useMemo(() => [...commercialPlatforms].sort((a, b) => {
    const d = commSort.dir === "asc" ? 1 : -1;
    switch (commSort.key) {
      case "name":        return d * a.name.localeCompare(b.name);
      case "realtime":    return d * ((a.realtime ? 1 : 0) - (b.realtime ? 1 : 0));
      case "bodyLanguage":return d * a.bodyLanguage.localeCompare(b.bodyLanguage);
      case "conversation":return d * ((a.conversation ? 1 : 0) - (b.conversation ? 1 : 0));
      case "latency":     return d * a.latency.localeCompare(b.latency);
      case "sovereignty": return d * ((a.sovereignty ? 1 : 0) - (b.sovereignty ? 1 : 0));
      case "censorship":  return d * a.censorship.localeCompare(b.censorship);
      default: return 0;
    }
  }), [commercialPlatforms, commSort]);

  const sortedOpen = useMemo(() => [...openSourceSolutions].sort((a, b) => {
    const d = openSort.dir === "asc" ? 1 : -1;
    switch (openSort.key) {
      case "name":      return d * a.name.localeCompare(b.name);
      case "type":      return d * a.type.localeCompare(b.type);
      case "latency":   return d * a.latency.localeCompare(b.latency);
      case "quality":   return d * a.quality.localeCompare(b.quality);
      case "deployment":return d * a.deployment.localeCompare(b.deployment);
      case "license":   return d * a.license.localeCompare(b.license);
      default: return 0;
    }
  }), [openSourceSolutions, openSort]);

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader
          number="A"
          title={isFr ? "Avatars Vidéo Streaming" : "Streaming Video Avatars"}
          subtitle={isFr
            ? "Comparatif des plateformes d'avatars vidéo conversationnels (2025–2026). Évaluation neutre des solutions commerciales et open-source."
            : "Comparison of conversational video avatar platforms (2025–2026). Neutral evaluation of commercial and open-source solutions."}
          accent="cyan"
        />

        {/* Sub-tabs */}
        <div className="flex gap-1 mb-5 border-b border-slate-200">
          {(["commercial", "opensource"] as AvatarTab[]).map((tab) => (
            <button key={tab} onClick={() => setAvatarTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                avatarTab === tab ? "border-cyan-500 text-cyan-600" : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {tab === "commercial" ? (isFr ? "Commercial" : "Commercial") : "Open Source"}
            </button>
          ))}
        </div>

        {avatarTab === "commercial" && (
          <div>
            {/* Summary table */}
            <div className="overflow-x-auto mb-6">
              <p className="text-xs text-slate-400 mb-2 font-mono">{isFr ? "Cliquez sur un en-tête pour trier" : "Click a header to sort"}</p>
              <table className="data-table">
                <thead>
                  <tr>
                    {([
                      { key: "name" as CommKey, label: isFr ? "Plateforme" : "Platform" },
                      { key: "realtime" as CommKey, label: isFr ? "Temps réel" : "Real-time" },
                      { key: "bodyLanguage" as CommKey, label: isFr ? "Corps" : "Body" },
                      { key: "conversation" as CommKey, label: isFr ? "Conversation" : "Conversation" },
                      { key: "latency" as CommKey, label: isFr ? "Latence" : "Latency" },
                      { key: "sovereignty" as CommKey, label: isFr ? "Souveraineté" : "Sovereignty" },
                      { key: "censorship" as CommKey, label: isFr ? "Censure" : "Censorship" },
                    ] as const).map(({ key, label }) => (
                      <th key={key} className="cursor-pointer select-none" onClick={() => toggleComm(key)}>
                        <span className="inline-flex items-center gap-1">{label}<SortIcon active={commSort.key === key} dir={commSort.dir} /></span>
                      </th>
                    ))}
                    <th>{isFr ? "Liens" : "Links"}</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedComm.map((p) => (
                    <tr key={p.name}>
                      <td>
                        <div className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.name}</div>
                        <div className="text-xs text-slate-400">{p.category}</div>
                      </td>
                      <td><span style={{ color: p.realtime ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{p.realtime ? "✓" : "✗"}</span></td>
                      <td><span className="text-xs text-slate-600">{p.bodyLanguage}</span></td>
                      <td><span style={{ color: p.conversation ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{p.conversation ? "✓" : "✗"}</span></td>
                      <td><span className="text-xs font-mono text-slate-700">{p.latency}</span></td>
                      <td><span style={{ color: p.sovereignty ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{p.sovereignty ? "✓" : "✗"}</span></td>
                      <td>
                        <span className="text-xs" style={{
                          color: (p.censorship.includes("élevé") || p.censorship.includes("High") || p.censorship.includes("Élevé")) ? "oklch(0.60 0.20 25)"
                            : (p.censorship.includes("moyen") || p.censorship.includes("Medium")) ? "oklch(0.75 0.16 75)"
                            : "oklch(0.65 0.18 145)",
                        }}>{p.censorship}</span>
                      </td>
                      <td><SolutionTableCell solutionKey={p.linkKey || ""} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CTA Pricing */}
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border" style={{ background: 'oklch(0.97 0.01 240)', borderColor: 'oklch(0.88 0.04 240)' }}>
              <div>
                <p className="text-sm font-semibold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? 'Comparer les coûts réels $/minute' : 'Compare real costs $/minute'}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isFr ? 'Simulateur interactif + frais fixes + coûts variables' : 'Interactive simulator + fixed fees + variable costs'}
                </p>
              </div>
              <InternalLink
                to="/avatars/pricing"
                className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-5 py-2.5 transition-all hover:opacity-90 active:scale-95"
                style={{ background: 'oklch(0.55 0.20 200)', fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}
              >
                {isFr ? 'Voir le simulateur de coûts →' : 'View cost simulator →'}
              </InternalLink>
            </div>

            {/* Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {commercialPlatforms.map((p) => {
                const allText = [...(p.strengths || []), p.notes].join(' ').toLowerCase();
                const customTags: string[] = [];
                if (allText.includes('knowledge base') || allText.includes('rag')) customTags.push('RAG');
                if (allText.includes('emotion') || allText.includes('émot')) customTags.push(isFr ? 'Émotions' : 'Emotions');
                if (allText.includes('on-prem') || allText.includes('self-host')) customTags.push('On-premise');
                if (allText.includes('single image') || allText.includes('image unique') || allText.includes('1 photo')) customTags.push(isFr ? 'Avatar perso.' : 'Custom avatar');
                if (allText.includes('multi-style') || allText.includes('cartoon') || allText.includes('mascot')) customTags.push('Multi-style');

                return (
                  <div key={p.name} className="border border-slate-200 rounded-xl p-4 flex flex-col bg-white hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-900 text-sm flex items-center gap-1.5 flex-wrap" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {p.linkKey ? (
                            <a href={(SOLUTION_LINKS as any)[p.linkKey]?.homepage} target="_blank" rel="noopener noreferrer" className="hover:text-[#0891b2] transition-colors">{p.name}</a>
                          ) : p.name}
                          <SolutionTableCell solutionKey={p.linkKey || ""} />
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
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>{isFr ? "Qualité" : "Quality"}</span><span>{p.score.quality}/10</span></div>
                        <ScoreBar value={p.score.quality} color="oklch(0.72 0.18 200)" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>{isFr ? "Latence" : "Latency"}</span><span>{p.score.latency}/10</span></div>
                        <ScoreBar value={p.score.latency} color="oklch(0.65 0.18 145)" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>{isFr ? "Souveraineté" : "Sovereignty"}</span><span>{p.score.sovereignty}/10</span></div>
                        <ScoreBar value={p.score.sovereignty} color="oklch(0.72 0.18 50)" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed flex-1" style={{ fontFamily: "'Source Serif 4', serif" }}>{p.notes}</p>
                    {p.linkKey && hasDetailPage(p.linkKey) && (
                      <div className="mt-4">
                        <InternalLink
                          to={`/platform/${platformDetailId(p.linkKey)}`}
                          className="w-full flex items-center justify-center gap-2 text-sm font-semibold rounded-lg px-4 py-2.5 transition-all hover:opacity-90 active:scale-95"
                          style={{ background: 'oklch(0.20 0.04 240)', color: 'white', fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}
                        >
                          {isFr ? 'Fiche complète →' : 'Full details →'}
                        </InternalLink>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {avatarTab === "opensource" && (
          <div>
            <div className="overflow-x-auto mb-4">
              <p className="text-xs text-slate-400 mb-2 font-mono">{isFr ? "Cliquez sur un en-tête pour trier" : "Click a header to sort"}</p>
              <table className="data-table">
                <thead>
                  <tr>
                    {([
                      { key: "name" as OpenKey, label: isFr ? "Outil" : "Tool" },
                      { key: "type" as OpenKey, label: isFr ? "Type" : "Type" },
                      { key: "latency" as OpenKey, label: isFr ? "Latence typique" : "Typical latency" },
                      { key: "quality" as OpenKey, label: isFr ? "Qualité" : "Quality" },
                      { key: "deployment" as OpenKey, label: isFr ? "Déploiement" : "Deployment" },
                      { key: "license" as OpenKey, label: isFr ? "Licence" : "License" },
                    ] as const).map(({ key, label }) => (
                      <th key={key} className="cursor-pointer select-none" onClick={() => toggleOpen(key)}>
                        <span className="inline-flex items-center gap-1">{label}<SortIcon active={openSort.key === key} dir={openSort.dir} /></span>
                      </th>
                    ))}
                    <th>{isFr ? "Liens" : "Links"}</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOpen.map((s) => (
                    <tr key={s.name}>
                      <td>
                        <div className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {(s as any).linkKey && (SOLUTION_LINKS as any)[(s as any).linkKey]?.homepage ? (
                            <a href={(SOLUTION_LINKS as any)[(s as any).linkKey]!.homepage} target="_blank" rel="noopener noreferrer" className="hover:text-[#0891b2] transition-colors">{s.name}</a>
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
                      <td><span className="text-xs text-slate-600">{s.quality}</span></td>
                      <td><span className="text-xs text-slate-500 font-mono">{s.deployment}</span></td>
                      <td><span className="text-xs text-slate-500 font-mono">{s.license}</span></td>
                      <td><SolutionTableCell solutionKey={(s as any).linkKey || ""} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="callout-info">
              <p className="text-sm text-slate-700" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? <><strong>Note :</strong> Les solutions open-source permettent la souveraineté des données et l'absence de censure, au prix d'une infrastructure GPU propre et d'un investissement technique significatif. La question clé est de déterminer à quel stade du projet l'investissement en infrastructure se justifie par rapport à la vitesse d'itération offerte par les solutions cloud.</>
                  : <><strong>Note:</strong> Open-source solutions enable data sovereignty and freedom from censorship, at the cost of dedicated GPU infrastructure and significant technical investment. The key question is determining at what project stage the infrastructure investment is justified compared to the iteration speed offered by cloud solutions.</>
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
