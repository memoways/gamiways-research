/*
 * CostSimulator — DigiDouble Research Portal
 * Interactive cost simulator for streaming video avatar platforms
 * Design: Modernist Technical — monospace accents, clean grids
 * Slider: 30-minute increments from 30 to 3000 min/month
 */
import { useState, useMemo } from "react";
import { useLang } from "@/contexts/LangContext";
import { Link } from "wouter";
import { AlertTriangle, Info, CheckCircle, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

// ─── Simulator data (enriched per platform) ──────────────────────────────────
interface SimPlatform {
  id: string;
  name: string;
  color: string;
  // Base cost per minute (hosted / default)
  costPerMin: number;
  // Alternative cost (Self-Managed, LITE mode, etc.)
  altCostPerMin?: number;
  altCostLabel?: string;
  altCostLabelFr?: string;
  // Session cap in minutes (0 = no cap)
  sessionCapMin: number;
  sessionCapNote?: string;
  sessionCapNoteFr?: string;
  // Hidden costs added per minute (TTS, LLM if not included)
  hiddenCostPerMin: number;
  hiddenCostNote: string;
  hiddenCostNoteFr: string;
  // Fixed costs per month (subscription floor)
  monthlyFloor: number;
  monthlyFloorNote: string;
  monthlyFloorNoteFr: string;
  // Included minutes in base plan (before overage)
  includedMinutes: number;
  // Overage rate (may differ from base)
  overageRate: number;
  // Sovereignty / hosting note
  hostingNote: string;
  hostingNoteFr: string;
  // Unique specificities
  specs: string[];
  specsFr: string[];
  // Async (not real-time)
  isAsync: boolean;
  // On-premise available
  onPremise: boolean;
  // GDPR
  gdpr: boolean;
  // Latency ms
  latencyMs: number;
  // Use-case tags
  tags: string[];
  // Required subscription to access streaming avatar (0 = no subscription needed)
  subscriptionFee: number;
  subscriptionName: string;
  subscriptionNameFr: string;
  // Alternative mode subscription (e.g. Self-Managed plan)
  altSubscriptionFee?: number;
  altSubscriptionName?: string;
  altSubscriptionNameFr?: string;
}

const SIM_PLATFORMS: SimPlatform[] = [
  {
    id: "simli",
    name: "Simli (Trinity-1)",
    color: "#0891b2",
    costPerMin: 0.009,
    sessionCapMin: 0,
    hiddenCostPerMin: 0.013,
    hiddenCostNote: "Add ~$0.013/min for LLM (GPT-4o Mini) + TTS (ElevenLabs Turbo) — not included",
    hiddenCostNoteFr: "Ajouter ~$0.013/min pour LLM (GPT-4o Mini) + TTS (ElevenLabs Turbo) — non inclus",
    monthlyFloor: 0,
    monthlyFloorNote: "Free tier: 10 min/mo. Pay-as-you-go above.",
    monthlyFloorNoteFr: "Tier gratuit : 10 min/mois. PAYG au-delà.",
    includedMinutes: 10,
    overageRate: 0.009,
    hostingNote: "Norwegian company, EU jurisdiction. Not yet ISO 27001.",
    hostingNoteFr: "Entreprise norvégienne, juridiction UE. Pas encore ISO 27001.",
    specs: [
      "Video rendering only — you bring your own LLM + TTS",
      "WebRTC (LiveKit) transport — lowest latency in class (~300ms)",
      "Trinity-1: full-body avatar, not just head",
      "No session cap",
      "BYOLLM + BYOTTS required",
    ],
    specsFr: [
      "Rendu vidéo uniquement — vous apportez votre propre LLM + TTS",
      "Transport WebRTC (LiveKit) — latence la plus basse (~300ms)",
      "Trinity-1 : avatar corps entier, pas seulement la tête",
      "Pas de limite de session",
      "BYOLLM + BYOTTS requis",
    ],
    isAsync: false,
    onPremise: false,
    gdpr: true,
    latencyMs: 300,
    tags: ["video-only", "low-latency", "eu-gdpr", "byollm"],
    subscriptionFee: 0,
    subscriptionName: "No subscription — pay-as-you-go",
    subscriptionNameFr: "Pas d'abonnement — PAYG",
  },
  {
    id: "bithuman",
    name: "bitHuman (Essence)",
    color: "#7c3aed",
    costPerMin: 0.01,
    sessionCapMin: 0,
    hiddenCostPerMin: 0.013,
    hiddenCostNote: "Add ~$0.013/min for LLM + TTS — not included in Essence tier",
    hiddenCostNoteFr: "Ajouter ~$0.013/min pour LLM + TTS — non inclus dans le tier Essence",
    monthlyFloor: 0,
    monthlyFloorNote: "Free tier: 100 min/mo (Essence). Expression model: $0.05/min.",
    monthlyFloorNoteFr: "Tier gratuit : 100 min/mois (Essence). Modèle Expression : $0.05/min.",
    includedMinutes: 100,
    overageRate: 0.01,
    hostingNote: "Self-hosted on-premise (CPU or GPU) OR cloud. Full data sovereignty possible.",
    hostingNoteFr: "Auto-hébergé on-premise (CPU ou GPU) OU cloud. Souveraineté totale possible.",
    specs: [
      "UNIQUE: on-premise CPU deployment — no GPU required for Essence",
      "Full sovereignty: no data leaves your infrastructure",
      "100 free min/mo — best free tier for real-time avatars",
      "Expression model (GPU): $0.05/min — 5× more expressive",
      "250 credits fixed cost for agent generation",
    ],
    specsFr: [
      "UNIQUE : déploiement on-premise CPU — pas de GPU requis pour Essence",
      "Souveraineté totale : aucune donnée ne quitte votre infrastructure",
      "100 min gratuites/mois — meilleur tier gratuit pour avatars temps réel",
      "Modèle Expression (GPU) : $0.05/min — 5× plus expressif",
      "250 crédits fixes pour la génération d'agent",
    ],
    isAsync: false,
    onPremise: true,
    gdpr: true,
    latencyMs: 300,
    tags: ["sovereign", "low-latency", "eu-gdpr", "byollm"],
    subscriptionFee: 0,
    subscriptionName: "No subscription — free tier includes 100 min/mo",
    subscriptionNameFr: "Pas d'abonnement — tier gratuit inclut 100 min/mois",
  },
  {
    id: "hedra",
    name: "Hedra (Character-3)",
    color: "#d97706",
    costPerMin: 0.05,
    sessionCapMin: 10,
    sessionCapNote: "10-minute max session — sessions must be restarted after 10 min",
    sessionCapNoteFr: "Session max 10 min — les sessions doivent être relancées après 10 min",
    hiddenCostPerMin: 0,
    hiddenCostNote: "LLM + TTS included in agent mode",
    hiddenCostNoteFr: "LLM + TTS inclus en mode agent",
    monthlyFloor: 0,
    monthlyFloorNote: "Free tier available. Character-3 consumes 6 credits/sec (very fast).",
    monthlyFloorNoteFr: "Tier gratuit disponible. Character-3 consomme 6 crédits/sec (très rapide).",
    includedMinutes: 5,
    overageRate: 0.05,
    hostingNote: "AWS US only. No EU hosting.",
    hostingNoteFr: "AWS US uniquement. Pas d'hébergement EU.",
    specs: [
      "10-minute session cap — requires session restart logic in your app",
      "Character-3: 6 credits/sec consumption (fastest drain)",
      "One-shot avatar from single image",
      "LLM + TTS included — all-in-one agent",
      "Credits don't roll over month-to-month",
    ],
    specsFr: [
      "Limite de session 10 min — nécessite une logique de relance dans votre app",
      "Character-3 : consommation 6 crédits/sec (drain le plus rapide)",
      "Avatar depuis une seule photo",
      "LLM + TTS inclus — agent tout-en-un",
      "Les crédits ne sont pas reportés d'un mois à l'autre",
    ],
    isAsync: false,
    onPremise: false,
    gdpr: true,
    latencyMs: 500,
    tags: ["all-in-one", "multi-style", "low-cost"],
    subscriptionFee: 0,
    subscriptionName: "No subscription — credits-based, free tier available",
    subscriptionNameFr: "Pas d'abonnement — basé sur crédits, tier gratuit disponible",
  },
  {
    id: "anam",
    name: "Anam.ai (v3)",
    color: "#059669",
    costPerMin: 0.12,
    sessionCapMin: 0,
    hiddenCostPerMin: 0,
    hiddenCostNote: "LLM + TTS included in Managed Agent mode. RAG: Explorer+ only.",
    hiddenCostNoteFr: "LLM + TTS inclus en mode Managed Agent. RAG : Explorer+ uniquement.",
    monthlyFloor: 0,
    monthlyFloorNote: "Free tier: 30 min/mo. Starter: $69/mo (600 min). Explorer: $299/mo (2500 min).",
    monthlyFloorNoteFr: "Tier gratuit : 30 min/mois. Starter : $69/mois (600 min). Explorer : $299/mois (2500 min).",
    includedMinutes: 30,
    overageRate: 0.12,
    hostingNote: "Cloud (AWS/GCP). Zero Data Retention option for Enterprise. EU hosting available.",
    hostingNoteFr: "Cloud (AWS/GCP). Option Zero Data Retention pour Enterprise. Hébergement EU disponible.",
    specs: [
      "Best latency/cost balance: 180ms TTFR at $0.12/min",
      "RAG (knowledge base) available on Explorer+ ($299/mo)",
      "Custom voice cloning: Professional plan only ($999/mo)",
      "Watermark on Free and Starter plans",
      "LLM + TTS included — all-in-one agent",
    ],
    specsFr: [
      "Meilleur équilibre latence/coût : 180ms TTFR à $0.12/min",
      "RAG (base de connaissances) disponible sur Explorer+ ($299/mois)",
      "Clonage vocal personnalisé : plan Professional uniquement ($999/mois)",
      "Filigrane sur les plans Free et Starter",
      "LLM + TTS inclus — agent tout-en-un",
    ],
    isAsync: false,
    onPremise: false,
    gdpr: true,
    latencyMs: 180,
    tags: ["all-in-one", "low-latency", "eu-gdpr"],
    subscriptionFee: 69,
    subscriptionName: "Starter plan required ($69/mo) — includes 600 min",
    subscriptionNameFr: "Plan Starter requis ($69/mois) — inclut 600 min",
  },
  {
    id: "beyondpresence",
    name: "BeyondPresence",
    color: "#0284c7",
    costPerMin: 0.175,
    sessionCapMin: 0,
    hiddenCostPerMin: 0.013,
    hiddenCostNote: "A2V mode ($0.085/min) requires separate LLM + TTS. Managed Agent ($0.35/min) is all-in-one.",
    hiddenCostNoteFr: "Mode A2V ($0.085/min) nécessite LLM + TTS séparés. Managed Agent ($0.35/min) est tout-en-un.",
    monthlyFloor: 0,
    monthlyFloorNote: "No free tier. Enterprise pricing for isolated EU deployment.",
    monthlyFloorNoteFr: "Pas de tier gratuit. Tarification Enterprise pour déploiement EU isolé.",
    includedMinutes: 0,
    overageRate: 0.175,
    hostingNote: "Beyond Presence GmbH, Munich, Germany. Isolated EU deployment available (Enterprise).",
    hostingNoteFr: "Beyond Presence GmbH, Munich, Allemagne. Déploiement EU isolé disponible (Enterprise).",
    specs: [
      "1080p hyper-realistic — highest visual quality in class",
      "A2V mode: $0.085/min (video only) vs Managed Agent: $0.35/min (all-in-one)",
      "Genesis 2 announced: world's most advanced expressive real-time avatar",
      "EU-based company (Munich) — best sovereignty for European projects",
      "No free tier — enterprise-first pricing",
    ],
    specsFr: [
      "1080p hyper-réaliste — qualité visuelle la plus élevée de la catégorie",
      "Mode A2V : $0.085/min (vidéo seule) vs Managed Agent : $0.35/min (tout-en-un)",
      "Genesis 2 annoncé : modèle d'avatar expressif temps réel le plus avancé",
      "Entreprise EU (Munich) — meilleure souveraineté pour les projets européens",
      "Pas de tier gratuit — tarification enterprise-first",
    ],
    isAsync: false,
    onPremise: true,
    gdpr: true,
    latencyMs: 250,
    tags: ["sovereign", "low-latency", "eu-gdpr", "video-only"],
    subscriptionFee: 0,
    subscriptionName: "No subscription — enterprise pricing on request",
    subscriptionNameFr: "Pas d'abonnement — tarification enterprise sur demande",
  },
  {
    id: "heygen",
    name: "HeyGen LiveAvatar",
    color: "#64748b",
    costPerMin: 0.20,
    altCostPerMin: 0.10,
    altCostLabel: "LITE mode ($0.10/min)",
    altCostLabelFr: "Mode LITE ($0.10/min)",
    sessionCapMin: 0,
    hiddenCostPerMin: 0.013,
    hiddenCostNote: "ElevenLabs voice billed separately. 1-min credit escrow per session start.",
    hiddenCostNoteFr: "Voix ElevenLabs facturée séparément. Séquestre de 1 min de crédit par démarrage de session.",
    monthlyFloor: 0,
    monthlyFloorNote: "Free: ~5 min (10 credits). Paid: ~$29/mo (500 min). 1-min escrow per session.",
    monthlyFloorNoteFr: "Gratuit : ~5 min (10 crédits). Payant : ~$29/mois (500 min). Séquestre 1 min/session.",
    includedMinutes: 5,
    overageRate: 0.20,
    hostingNote: "AWS US-East-1 only. No EU hosting. GDPR DPA available.",
    hostingNoteFr: "AWS US-East-1 uniquement. Pas d'hébergement EU. DPA GDPR disponible.",
    specs: [
      "LITE mode ($0.10/min): DigiDouble controls ASR/LLM/TTS — HeyGen handles video only",
      "FULL mode ($0.20/min): all-in-one agent",
      "1-minute credit escrow per session start (billed even if session fails)",
      "Market leader — best documentation and ecosystem",
      "US hosting only — GDPR sovereignty concern",
    ],
    specsFr: [
      "Mode LITE ($0.10/min) : DigiDouble contrôle ASR/LLM/TTS — HeyGen gère uniquement la vidéo",
      "Mode FULL ($0.20/min) : agent tout-en-un",
      "Séquestre de 1 min de crédit par démarrage de session (facturé même si la session échoue)",
      "Leader du marché — meilleure documentation et écosystème",
      "Hébergement US uniquement — problème de souveraineté GDPR",
    ],
    isAsync: false,
    onPremise: false,
    gdpr: true,
    latencyMs: 400,
    tags: ["all-in-one", "video-only", "byollm"],
    subscriptionFee: 29,
    subscriptionName: "Creator plan required ($29/mo) — needed for LiveAvatar API access",
    subscriptionNameFr: "Plan Creator requis ($29/mois) — nécessaire pour accéder à l'API LiveAvatar",
  },
  {
    id: "runway",
    name: "Runway (Avatar API)",
    color: "#be185d",
    costPerMin: 0.21,
    sessionCapMin: 5,
    sessionCapNote: "5-minute maximum session duration — hard limit",
    sessionCapNoteFr: "Durée de session maximale de 5 minutes — limite stricte",
    hiddenCostPerMin: 0.013,
    hiddenCostNote: "$0.02 fixed init cost per session + LLM/TTS billed separately",
    hiddenCostNoteFr: "$0.02 de coût fixe d'initialisation par session + LLM/TTS facturés séparément",
    monthlyFloor: 0,
    monthlyFloorNote: "2 credits fixed per session init ($0.02). No subscription required.",
    monthlyFloorNoteFr: "2 crédits fixes par initialisation de session ($0.02). Pas d'abonnement requis.",
    includedMinutes: 0,
    overageRate: 0.21,
    hostingNote: "AWS US only.",
    hostingNoteFr: "AWS US uniquement.",
    specs: [
      "5-minute session cap — very restrictive for long interactions",
      "$0.02 fixed init cost per session (adds up with many short sessions)",
      "Video rendering only — BYOLLM + BYOTTS required",
      "Runway Gen-3 Alpha quality — cinematic style",
      "No subscription required — pure PAYG",
    ],
    specsFr: [
      "Limite de session 5 min — très restrictif pour les interactions longues",
      "$0.02 de coût fixe d'initialisation par session (s'accumule avec de nombreuses sessions courtes)",
      "Rendu vidéo uniquement — BYOLLM + BYOTTS requis",
      "Qualité Runway Gen-3 Alpha — style cinématographique",
      "Pas d'abonnement requis — PAYG pur",
    ],
    isAsync: false,
    onPremise: false,
    gdpr: false,
    latencyMs: 400,
    tags: ["video-only", "byollm", "cinematic"],
    subscriptionFee: 0,
    subscriptionName: "No subscription — pure pay-as-you-go",
    subscriptionNameFr: "Pas d'abonnement — PAYG pur",
  },
  {
    id: "lemonslice",
    name: "LemonSlice (LS-2.1)",
    color: "#c026d3",
    costPerMin: 0.21,
    altCostPerMin: 0.03,
    altCostLabel: "Self-Managed (~$0.03/min on A100)",
    altCostLabelFr: "Self-Managed (~$0.03/min sur A100)",
    sessionCapMin: 0,
    hiddenCostPerMin: 0,
    hiddenCostNote: "BYOLLM + BYOTTS optional. Integrated LLM/TTS available. Self-Managed: add GPU cost (~$2–4/hr A100).",
    hiddenCostNoteFr: "BYOLLM + BYOTTS optionnel. LLM/TTS intégré disponible. Self-Managed : ajouter coût GPU (~$2–4/h A100).",
    monthlyFloor: 0,
    monthlyFloorNote: "Free: 30 min/mo. Starter: $49/mo (200 min). Growth: $199/mo (950 min). Self-Managed: $499/mo (unlimited).",
    monthlyFloorNoteFr: "Gratuit : 30 min/mois. Starter : $49/mois (200 min). Growth : $199/mois (950 min). Self-Managed : $499/mois (illimité).",
    includedMinutes: 30,
    overageRate: 0.21,
    hostingNote: "US hosted by default. Self-Managed Pipeline: full on-premise sovereignty on your GPU.",
    hostingNoteFr: "Hébergement US par défaut. Self-Managed Pipeline : souveraineté on-premise totale sur votre GPU.",
    specs: [
      "UNIQUE: multi-style avatars — humans, cartoons, mascots, animals from 1 image",
      "Self-Managed Pipeline: ~$0.03/min on A100 GPU (7× cheaper than hosted)",
      "Emotion API: trigger joy/surprise/concern/neutral with intensity 0.0–1.0",
      "Action API: wave, nod, point, shrug via API call",
      "Hosted: ~3s latency. Self-Managed: ~500ms render latency",
    ],
    specsFr: [
      "UNIQUE : avatars multi-style — humains, cartoons, mascottes, animaux depuis 1 image",
      "Self-Managed Pipeline : ~$0.03/min sur GPU A100 (7× moins cher que hosted)",
      "Emotion API : déclencher joie/surprise/inquiétude/neutre avec intensité 0.0–1.0",
      "Action API : saluer, hocher, pointer, hausser les épaules via appel API",
      "Hosted : ~3s de latence. Self-Managed : ~500ms de latence de rendu",
    ],
    isAsync: false,
    onPremise: true,
    gdpr: true,
    latencyMs: 3000,
    tags: ["sovereign", "multi-style", "all-in-one", "byollm"],
    subscriptionFee: 0,
    subscriptionName: "Free tier (30 min/mo). Starter: $49/mo. Self-Managed: $499/mo",
    subscriptionNameFr: "Tier gratuit (30 min/mois). Starter : $49/mois. Self-Managed : $499/mois",
    altSubscriptionFee: 499,
    altSubscriptionName: "Self-Managed plan required ($499/mo) — unlimited GPU rendering",
    altSubscriptionNameFr: "Plan Self-Managed requis ($499/mois) — rendu GPU illimité",
  },
  {
    id: "did",
    name: "D-ID V4 (Visual Agents)",
    color: "#dc2626",
    costPerMin: 0.40,
    sessionCapMin: 0,
    hiddenCostPerMin: 0,
    hiddenCostNote: "LLM-connected agents included. BYO-S3 only on Pro+. 20–30% discount on annual.",
    hiddenCostNoteFr: "Agents LLM connectés inclus. BYO-S3 uniquement sur Pro+. 20–30% de réduction annuelle.",
    monthlyFloor: 0,
    monthlyFloorNote: "Free tier: limited. Expressive V4 credits premium applies.",
    monthlyFloorNoteFr: "Tier gratuit : limité. Supplément crédits V4 Expressif applicable.",
    includedMinutes: 5,
    overageRate: 0.40,
    hostingNote: "AWS US-East-1. VPC/on-prem option available (Enterprise).",
    hostingNoteFr: "AWS US-East-1. Option VPC/on-prem disponible (Enterprise).",
    specs: [
      "V4 (March 2026): diffusion-powered expressive delivery",
      "LLM-connected agents — no separate LLM needed",
      "VPC/on-prem option available (Enterprise)",
      "Expressive V4 credits cost premium vs standard",
      "20–30% discount on annual commitment",
    ],
    specsFr: [
      "V4 (mars 2026) : rendu expressif basé sur la diffusion",
      "Agents LLM connectés — pas de LLM séparé nécessaire",
      "Option VPC/on-prem disponible (Enterprise)",
      "Supplément de crédits V4 Expressif vs standard",
      "20–30% de réduction sur engagement annuel",
    ],
    isAsync: false,
    onPremise: true,
    gdpr: true,
    latencyMs: 450,
    tags: ["all-in-one", "sovereign"],
    subscriptionFee: 0,
    subscriptionName: "No subscription — free tier limited. Paid plans: Lite $19/mo, Pro $49/mo",
    subscriptionNameFr: "Pas d'abonnement — tier gratuit limité. Plans payants : Lite $19/mois, Pro $49/mois",
  },
  {
    id: "tavus",
    name: "Tavus (Phoenix-4 + Raven-1)",
    color: "#7c3aed",
    costPerMin: 0.32,
    sessionCapMin: 0,
    hiddenCostPerMin: 0,
    hiddenCostNote: "Replica training: $40–$65 per extra training. Video generation billed separately.",
    hiddenCostNoteFr: "Entraînement Replica : $40–$65 par entraînement supplémentaire. Génération vidéo facturée séparément.",
    monthlyFloor: 59,
    monthlyFloorNote: "Starter: $59/mo (100 min). Growth: $397/mo (1250 min). Free: 25 min total.",
    monthlyFloorNoteFr: "Starter : $59/mois (100 min). Growth : $397/mois (1250 min). Gratuit : 25 min au total.",
    includedMinutes: 100,
    overageRate: 0.32,
    hostingNote: "AWS US. SOC2 Type II + HIPAA (Growth+). No EU hosting.",
    hostingNoteFr: "AWS US. SOC2 Type II + HIPAA (Growth+). Pas d'hébergement EU.",
    specs: [
      "Most advanced emotional intelligence: Raven-1 perception + Phoenix-4 rendering",
      "Sparrow-1: active listening behaviors (nodding, micro-expressions) during user speech",
      "Replica training: $40–$65 per custom avatar",
      "Growth plan ($397/mo) required for HIPAA compliance",
      "US hosting only — GDPR sovereignty concern",
    ],
    specsFr: [
      "Intelligence émotionnelle la plus avancée : perception Raven-1 + rendu Phoenix-4",
      "Sparrow-1 : comportements d'écoute active (hochements, micro-expressions) pendant la parole",
      "Entraînement Replica : $40–$65 par avatar personnalisé",
      "Plan Growth ($397/mois) requis pour la conformité HIPAA",
      "Hébergement US uniquement — problème de souveraineté GDPR",
    ],
    isAsync: false,
    onPremise: false,
    gdpr: true,
    latencyMs: 500,
    tags: ["all-in-one", "emotional-ai"],
    subscriptionFee: 59,
    subscriptionName: "Starter plan required ($59/mo) — includes 100 min. Growth: $397/mo (1250 min)",
    subscriptionNameFr: "Plan Starter requis ($59/mois) — inclut 100 min. Growth : $397/mois (1250 min)",
  },
];

// ─── Cost calculation ─────────────────────────────────────────────────────────
// Fixed cost = subscription fee (required to access the platform)
function calcFixed(p: SimPlatform, useAlt: boolean): number {
  if (useAlt && p.altSubscriptionFee !== undefined) return p.altSubscriptionFee;
  return p.subscriptionFee;
}

// Variable cost = usage-based (per-minute billing above included minutes)
function calcVariable(p: SimPlatform, minutes: number, includeHidden: boolean, useAlt: boolean): number {
  const rate = useAlt && p.altCostPerMin !== undefined ? p.altCostPerMin : p.costPerMin;
  const hidden = includeHidden ? p.hiddenCostPerMin : 0;
  const sub = calcFixed(p, useAlt);
  // Minutes already included in the subscription plan
  const alreadyIncluded = sub > 0 ? p.includedMinutes : p.includedMinutes;
  const billable = Math.max(0, minutes - alreadyIncluded);
  return billable * (rate + hidden);
}

// Total cost = fixed + variable (with floor = subscription fee)
function calcCost(p: SimPlatform, minutes: number, includeHidden: boolean, useAlt: boolean): number {
  return calcFixed(p, useAlt) + calcVariable(p, minutes, includeHidden, useAlt);
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CostSimulator() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  const [minutes, setMinutes] = useState(300);
  const [includeHidden, setIncludeHidden] = useState(false);
  const [showAlt, setShowAlt] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const MAX_MINUTES = 3000;
  const STEP = 30;

  // Use-case filter definitions
  const USE_CASE_FILTERS = [
    {
      id: "all",
      label: isFr ? "Tous" : "All",
      labelFr: "Tous",
      desc: isFr ? "Toutes les plateformes temps réel" : "All real-time platforms",
      icon: "⚡",
      color: "bg-slate-900 text-white border-slate-900",
      colorInactive: "bg-white text-slate-600 border-slate-200 hover:border-slate-400",
    },
    {
      id: "video-only",
      label: isFr ? "Vidéo seule" : "Video-only",
      labelFr: "Vidéo seule",
      desc: isFr ? "Rendu vidéo uniquement — vous apportez votre LLM/TTS" : "Video rendering only — bring your own LLM/TTS",
      icon: "🎬",
      color: "bg-cyan-700 text-white border-cyan-700",
      colorInactive: "bg-white text-cyan-700 border-cyan-200 hover:border-cyan-400",
    },
    {
      id: "all-in-one",
      label: isFr ? "Tout-en-un" : "All-in-one",
      labelFr: "Tout-en-un",
      desc: isFr ? "LLM + TTS + vidéo intégrés — aucune dépendance externe" : "LLM + TTS + video integrated — no external dependency",
      icon: "🤖",
      color: "bg-emerald-700 text-white border-emerald-700",
      colorInactive: "bg-white text-emerald-700 border-emerald-200 hover:border-emerald-400",
    },
    {
      id: "sovereign",
      label: isFr ? "Souverain" : "Sovereign",
      labelFr: "Souverain",
      desc: isFr ? "On-premise ou EU — données sous contrôle total" : "On-premise or EU — full data control",
      icon: "🔒",
      color: "bg-indigo-700 text-white border-indigo-700",
      colorInactive: "bg-white text-indigo-700 border-indigo-200 hover:border-indigo-400",
    },
    {
      id: "low-latency",
      label: isFr ? "Basse latence" : "Low-latency",
      labelFr: "Basse latence",
      desc: isFr ? "TTFR < 400ms — optimal pour les interactions temps réel" : "TTFR < 400ms — optimal for real-time interactions",
      icon: "⚡",
      color: "bg-amber-600 text-white border-amber-600",
      colorInactive: "bg-white text-amber-600 border-amber-200 hover:border-amber-400",
    },
    {
      id: "eu-gdpr",
      label: isFr ? "EU / RGPD" : "EU / GDPR",
      labelFr: "EU / RGPD",
      desc: isFr ? "Hébergement EU ou juridiction européenne" : "EU hosting or European jurisdiction",
      icon: "🇪🇺",
      color: "bg-blue-700 text-white border-blue-700",
      colorInactive: "bg-white text-blue-700 border-blue-200 hover:border-blue-400",
    },
    {
      id: "multi-style",
      label: isFr ? "Multi-style" : "Multi-style",
      labelFr: "Multi-style",
      desc: isFr ? "Avatars non-humains : cartoons, mascottes, animaux" : "Non-human avatars: cartoons, mascots, animals",
      icon: "🎨",
      color: "bg-purple-700 text-white border-purple-700",
      colorInactive: "bg-white text-purple-700 border-purple-200 hover:border-purple-400",
    },
    {
      id: "emotional-ai",
      label: isFr ? "IA émotionnelle" : "Emotional AI",
      labelFr: "IA émotionnelle",
      desc: isFr ? "Perception et expression émotionnelle avancée" : "Advanced emotional perception and expression",
      icon: "💡",
      color: "bg-rose-700 text-white border-rose-700",
      colorInactive: "bg-white text-rose-700 border-rose-200 hover:border-rose-400",
    },
  ];

  const sorted = useMemo(() => {
    return [...SIM_PLATFORMS]
      .filter((p) => !p.isAsync)
      .filter((p) => activeFilter === "all" || p.tags.includes(activeFilter))
      .sort((a, b) => {
        const ca = calcCost(a, minutes, includeHidden, showAlt[a.id] ?? false);
        const cb = calcCost(b, minutes, includeHidden, showAlt[b.id] ?? false);
        return ca - cb;
      });
  }, [minutes, includeHidden, showAlt]);

  const maxCost = useMemo(() => {
    return Math.max(...sorted.map((p) => calcCost(p, minutes, includeHidden, showAlt[p.id] ?? false)));
  }, [sorted, minutes, includeHidden, showAlt]);

  const hasAnySubscription = useMemo(() => sorted.some((p) => p.subscriptionFee > 0), [sorted]);

  const toggleAlt = (id: string) => setShowAlt((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleExpand = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const fmt = (n: number) => n < 1 ? `$${n.toFixed(3)}` : `$${n.toFixed(2)}`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-slate-900 px-6 py-5">
        <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
          {isFr ? "Outil interactif" : "Interactive tool"}
        </p>
        <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {isFr ? "Simulateur de coûts — Streaming Avatar" : "Cost Simulator — Streaming Video Avatar"}
        </h2>
        <p className="text-sm text-slate-400">
          {isFr
            ? "Estimez votre facture mensuelle selon le volume de minutes d'interaction. Cas d'usage principal : avatar vidéo conversationnel temps réel."
            : "Estimate your monthly bill based on interaction volume. Main use case: real-time conversational video avatar."}
        </p>
      </div>

      {/* Slider */}
      <div className="px-6 py-6 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Volume mensuel d'interaction" : "Monthly interaction volume"}
          </label>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">{minutes}</span>
            <span className="text-sm text-slate-500 font-mono">{isFr ? "min/mois" : "min/mo"}</span>
          </div>
        </div>
        <input
          type="range"
          min={STEP}
          max={MAX_MINUTES}
          step={STEP}
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{ accentColor: "#0891b2" }}
        />
        <div className="flex justify-between text-xs text-slate-400 font-mono mt-1">
          <span>30 min</span>
          <span>500</span>
          <span>1000</span>
          <span>1500</span>
          <span>2000</span>
          <span>2500</span>
          <span>3000 min</span>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-2 mt-4">
          {[60, 300, 600, 1200, 2400].map((v) => (
            <button
              key={v}
              onClick={() => setMinutes(v)}
              className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
                minutes === v
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              {v} min
              <span className="text-slate-400 ml-1">
                ({isFr ? `~${Math.round(v / 60)}h/mois` : `~${Math.round(v / 60)}h/mo`})
              </span>
            </button>
          ))}
        </div>

        {/* Toggle hidden costs */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => setIncludeHidden(!includeHidden)}
            className={`relative w-10 h-5 rounded-full transition-colors ${includeHidden ? "bg-cyan-600" : "bg-slate-300"}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${includeHidden ? "translate-x-5" : ""}`} />
          </button>
          <span className="text-sm text-slate-600">
            {isFr
              ? "Inclure les coûts cachés estimés (LLM + TTS pour les plateformes sans LLM/TTS intégré)"
              : "Include estimated hidden costs (LLM + TTS for platforms without integrated LLM/TTS)"}
          </span>
        </div>

        {/* Use-case filters */}
        <div className="mt-5 pt-4 border-t border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
            {isFr ? "Filtrer par cas d'usage" : "Filter by use case"}
          </p>
          <div className="flex flex-wrap gap-2">
            {USE_CASE_FILTERS.map((f) => {
              const isActive = activeFilter === f.id;
              const matchCount = f.id === "all"
                ? SIM_PLATFORMS.filter((p) => !p.isAsync).length
                : SIM_PLATFORMS.filter((p) => !p.isAsync && p.tags.includes(f.id)).length;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  title={f.desc}
                  className={`flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-full border transition-all ${
                    isActive ? f.color : f.colorInactive
                  }`}
                >
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                  <span className={`ml-0.5 text-xs rounded-full px-1 ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
                  }`}>{matchCount}</span>
                </button>
              );
            })}
          </div>
          {activeFilter !== "all" && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-slate-500">
                {isFr ? "Filtre actif :" : "Active filter:"}
              </span>
              <span className="text-xs font-bold text-slate-700">
                {USE_CASE_FILTERS.find((f) => f.id === activeFilter)?.desc}
              </span>
              <button
                onClick={() => setActiveFilter("all")}
                className="text-xs text-slate-400 hover:text-slate-600 underline ml-1"
              >
                {isFr ? "Effacer" : "Clear"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results header with legend */}
      <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
          {isFr ? `${sorted.length} plateforme${sorted.length > 1 ? "s" : ""} — triées par coût total` : `${sorted.length} platform${sorted.length > 1 ? "s" : ""} — sorted by total cost`}
        </p>
        {hasAnySubscription && (
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-sm bg-slate-400" />
              <span className="text-slate-500">{isFr ? "Abonnement fixe" : "Fixed subscription"}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-sm bg-slate-700" />
              <span className="text-slate-500">{isFr ? "Usage variable" : "Variable usage"}</span>
            </span>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="divide-y divide-slate-100">
        {sorted.length === 0 && (
          <div className="px-6 py-10 text-center">
            <p className="text-slate-400 text-sm">
              {isFr ? "Aucune plateforme ne correspond à ce filtre." : "No platform matches this filter."}
            </p>
            <button onClick={() => setActiveFilter("all")} className="mt-2 text-xs text-cyan-600 underline">
              {isFr ? "Voir toutes les plateformes" : "Show all platforms"}
            </button>
          </div>
        )}
        {sorted.map((p, rank) => {
          const isAlt = showAlt[p.id] ?? false;
          const fixedCost = calcFixed(p, isAlt);
          const variableCost = calcVariable(p, minutes, includeHidden, isAlt);
          const cost = fixedCost + variableCost;
          const pct = maxCost > 0 ? (cost / maxCost) * 100 : 0;
          const fixedPct = maxCost > 0 ? (fixedCost / maxCost) * 100 : 0;
          const variablePct = maxCost > 0 ? (variableCost / maxCost) * 100 : 0;
          const isExpanded = expanded[p.id] ?? false;
          const hasSessionCap = p.sessionCapMin > 0;
          const sessionsPerMonth = hasSessionCap ? Math.ceil(minutes / p.sessionCapMin) : null;
          const hasSubscription = fixedCost > 0;

          return (
            <div key={p.id} className={`px-6 py-4 transition-colors ${rank === 0 ? "bg-emerald-50/40" : ""}`}>
              {/* Main row */}
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 ${
                  rank === 0 ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {rank + 1}
                </div>

                {/* Name + badges */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link href={`/platform/${p.id}`}>
                      <span className="text-sm font-bold text-slate-800 hover:underline cursor-pointer" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {p.name}
                      </span>
                    </Link>
                    {p.onPremise && (
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-700">
                        {isFr ? "On-premise" : "On-premise"}
                      </span>
                    )}
                    {hasSessionCap && (
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {isFr ? `Cap ${p.sessionCapMin}min` : `${p.sessionCapMin}min cap`}
                      </span>
                    )}
                    {p.altCostPerMin !== undefined && (
                      <button
                        onClick={() => toggleAlt(p.id)}
                        className={`text-xs font-mono px-2 py-0.5 rounded border transition-all ${
                          isAlt
                            ? "bg-purple-100 text-purple-700 border-purple-300"
                            : "bg-slate-100 text-slate-500 border-slate-200 hover:border-slate-400"
                        }`}
                      >
                        {isAlt
                          ? (isFr ? p.altCostLabelFr : p.altCostLabel)
                          : (isFr ? "Mode standard" : "Standard mode")}
                      </button>
                    )}
                  </div>

                  {/* Bar — segmented: fixed (slate) + variable (platform color) */}
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden flex">
                      {fixedPct > 0 && (
                        <div
                          className="h-full transition-all duration-300 flex-shrink-0"
                          style={{ width: `${Math.max(fixedPct, 1)}%`, background: "#94a3b8" }}
                          title={isFr ? `Abonnement fixe : ${fmt(fixedCost)}/mois` : `Fixed subscription: ${fmt(fixedCost)}/mo`}
                        />
                      )}
                      {variablePct > 0 && (
                        <div
                          className="h-full transition-all duration-300"
                          style={{ width: `${Math.max(variablePct, 1)}%`, background: p.color }}
                          title={isFr ? `Usage variable : ${fmt(variableCost)}/mois` : `Variable usage: ${fmt(variableCost)}/mo`}
                        />
                      )}
                      {fixedPct === 0 && variablePct === 0 && (
                        <div className="h-full w-1 rounded-full" style={{ background: p.color }} />
                      )}
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className="text-base font-bold font-mono" style={{ color: p.color }}>
                        {fmt(cost)}
                      </span>
                      <span className="text-xs text-slate-400 font-normal">/mo</span>
                    </div>
                  </div>

                  {/* Cost breakdown line */}
                  {hasSubscription && (
                    <div className="mt-1 flex items-center gap-3 text-xs font-mono">
                      <span className="flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-sm bg-slate-400" />
                        <span className="text-slate-500">{isFr ? "Fixe" : "Fixed"}: <strong className="text-slate-700">{fmt(fixedCost)}</strong></span>
                      </span>
                      <span className="text-slate-300">+</span>
                      <span className="flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-sm" style={{ background: p.color }} />
                        <span className="text-slate-500">{isFr ? "Variable" : "Variable"}: <strong className="text-slate-700">{fmt(variableCost)}</strong></span>
                      </span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {p.tags.map((tag) => {
                      const filterDef = USE_CASE_FILTERS.find((f) => f.id === tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => setActiveFilter(tag)}
                          title={filterDef?.desc}
                          className={`text-xs font-mono px-1.5 py-0.5 rounded border transition-all ${
                            activeFilter === tag
                              ? (filterDef?.color ?? "bg-slate-900 text-white border-slate-900")
                              : (filterDef?.colorInactive ?? "bg-white text-slate-500 border-slate-200 hover:border-slate-400")
                          }`}
                        >
                          {filterDef?.icon} {filterDef?.label ?? tag}
                        </button>
                      );
                    })}
                  </div>

                  {/* Rate detail */}
                  <div className="mt-1 text-xs text-slate-400 font-mono">
                    {isAlt && p.altCostPerMin !== undefined
                      ? `${isFr ? "Taux" : "Rate"}: $${p.altCostPerMin}/min · ${isFr ? "Inclus" : "Included"}: ${p.includedMinutes} min`
                      : `${isFr ? "Taux" : "Rate"}: $${p.costPerMin}/min · ${isFr ? "Inclus" : "Included"}: ${p.includedMinutes} min`
                    }
                    {sessionsPerMonth && (
                      <span className="ml-2 text-amber-600">
                        · {sessionsPerMonth} {isFr ? "sessions/mois (cap)" : "sessions/mo (cap)"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Expand button */}
                <button
                  onClick={() => toggleExpand(p.id)}
                  className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="mt-4 ml-11 space-y-3">
                  {/* Subscription plan info */}
                  <div className={`flex items-start gap-2 p-3 rounded-lg border ${
                    hasSubscription
                      ? "bg-slate-50 border-slate-200"
                      : "bg-emerald-50 border-emerald-200"
                  }`}>
                    <span className="text-base flex-shrink-0">{hasSubscription ? "💳" : "✅"}</span>
                    <div>
                      <p className="text-xs font-bold text-slate-700 mb-0.5">
                        {isFr ? "Plan d'abonnement requis" : "Required subscription plan"}
                      </p>
                      <p className="text-xs text-slate-600">
                        {isFr
                          ? (isAlt && p.altSubscriptionNameFr ? p.altSubscriptionNameFr : p.subscriptionNameFr)
                          : (isAlt && p.altSubscriptionName ? p.altSubscriptionName : p.subscriptionName)
                        }
                      </p>
                      {hasSubscription && (
                        <p className="text-xs text-slate-500 mt-1">
                          {isFr
                            ? `→ Coût fixe mensuel : ${fmt(fixedCost)} (indépendant du volume d'usage)`
                            : `→ Fixed monthly cost: ${fmt(fixedCost)} (regardless of usage volume)`
                          }
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Session cap warning */}
                  {hasSessionCap && (
                    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-amber-800 mb-0.5">
                          {isFr ? "Limite de session" : "Session cap"}
                        </p>
                        <p className="text-xs text-amber-700">
                          {isFr ? p.sessionCapNoteFr : p.sessionCapNote}
                        </p>
                        {sessionsPerMonth && (
                          <p className="text-xs text-amber-700 mt-1 font-mono">
                            {minutes} min ÷ {p.sessionCapMin} min/session = <strong>{sessionsPerMonth} {isFr ? "relances/mois" : "restarts/mo"}</strong>
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Hidden costs */}
                  {includeHidden && p.hiddenCostPerMin > 0 && (
                    <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-blue-800 mb-0.5">
                          {isFr ? "Coûts cachés inclus" : "Hidden costs included"}
                        </p>
                        <p className="text-xs text-blue-700">
                          {isFr ? p.hiddenCostNoteFr : p.hiddenCostNote}
                        </p>
                        <p className="text-xs text-blue-700 mt-1 font-mono">
                          +${p.hiddenCostPerMin}/min × {minutes} min = <strong>+{fmt(p.hiddenCostPerMin * minutes)}</strong>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Monthly floor */}
                  {p.monthlyFloor > 0 && (
                    <div className="flex items-start gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-slate-700 mb-0.5">
                          {isFr ? "Abonnement minimum" : "Subscription floor"}
                        </p>
                        <p className="text-xs text-slate-600">
                          {isFr ? p.monthlyFloorNoteFr : p.monthlyFloorNote}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Hosting */}
                  <div className="flex items-start gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${p.gdpr ? "text-emerald-500" : "text-slate-300"}`} />
                    <div>
                      <p className="text-xs font-bold text-slate-700 mb-0.5">
                        {isFr ? "Hébergement & souveraineté" : "Hosting & sovereignty"}
                      </p>
                      <p className="text-xs text-slate-600">
                        {isFr ? p.hostingNoteFr : p.hostingNote}
                      </p>
                    </div>
                  </div>

                  {/* Specificities */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-xs font-bold text-slate-700 mb-2">
                      {isFr ? "Spécificités clés" : "Key specificities"}
                    </p>
                    <ul className="space-y-1">
                      {(isFr ? p.specsFr : p.specs).map((spec, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Alt mode detail */}
                  {p.altCostPerMin !== undefined && (
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="text-xs font-bold text-purple-800 mb-1">
                        {isFr ? "Mode alternatif disponible" : "Alternative mode available"}
                      </p>
                      <p className="text-xs text-purple-700">
                        {isFr ? p.altCostLabelFr : p.altCostLabel}
                        {" — "}
                        {isFr ? "Coût estimé à ce volume" : "Estimated cost at this volume"}{" "}
                        <strong>{fmt(calcCost(p, minutes, includeHidden, true))}/mo</strong>
                      </p>
                    </div>
                  )}

                  {/* Link to full detail */}
                  <Link href={`/platform/${p.id}`}>
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-cyan-600 hover:text-cyan-800 underline cursor-pointer">
                      {isFr ? "Fiche complète →" : "Full details →"}
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
        <p className="text-xs text-slate-400 font-mono">
          {isFr
            ? "* Estimations basées sur les tarifs publics (avril 2026). Coûts réels peuvent varier selon le plan, les remises annuelles et les coûts d'infrastructure. LLM estimé à $0.002/min (GPT-4o Mini), TTS à $0.011/min (ElevenLabs Turbo v2.5)."
            : "* Estimates based on public pricing (April 2026). Actual costs may vary by plan, annual discounts, and infrastructure costs. LLM estimated at $0.002/min (GPT-4o Mini), TTS at $0.011/min (ElevenLabs Turbo v2.5)."}
        </p>
      </div>
    </div>
  );
}
