/**
 * Breadcrumb.tsx — DigiDouble Research Portal
 * Fil d'Ariane cliquable et contextuel, résolution automatique des segments de route
 * i18n: EN / FR via LangContext
 */
import { useLocation } from "wouter";
import InternalLink from "@/components/InternalLink";
import { useLang } from "@/contexts/LangContext";
import { getTTSData } from "@/lib/ttsData";
import { getSTTData } from "@/lib/sttData";
import { ChevronRight, Home } from "lucide-react";

// ── Route label map ─────────────────────────────────────────────────────────
// Each key is a path segment or full path, value is [labelEn, labelFr]
const ROUTE_LABELS: Record<string, [string, string]> = {
  // Top-level
  "/":           ["Home", "Accueil"],
  "/project":    ["The Project", "Le Projet"],
  "/research":   ["Research Challenges", "Défis de Recherche"],
  "/voice":      ["Voice Pipeline", "Pipeline Vocal"],
  "/avatars":    ["Streaming Video Avatars", "Avatars Vidéo Streaming"],
  "/tts":        ["TTS", "TTS"],
  "/platform":   ["Platform", "Plateforme"],

  // Voice sub-pages
  "/voice/tts":        ["TTS & Voice Synthesis", "TTS & Synthèse Vocale"],
  "/voice/stt":        ["STT / Speech-to-Text", "STT / Reconnaissance Vocale"],
  "/voice/benchmarks": ["Latency Benchmarks", "Benchmarks de Latence"],
  "/voice/stack":      ["Decision Framework", "Cadre de Décision"],
  "/voice/pipeline":   ["V2V Diagram", "Diagramme V2V"],
  "/voice/scoring":    ["Custom Scoring", "Scoring Personnalisé"],

  // Research sub-pages
  "/research/architecture": ["Architecture", "Architecture"],
  "/research/gaps":          ["Research Gaps", "Lacunes de Recherche"],
  "/research/academic":      ["Academic References", "Références Académiques"],
  "/research/behavior":      ["Behavior & Expressiveness", "Comportement & Expressivité"],
  "/research/emotional":     ["Emotional Toolbox", "Boîte à Outils Émotionnelle"],

  // Avatars sub-pages
  "/avatars/pricing": ["Cost Simulator", "Simulateur de Coûts"],
  "/avatars/market":  ["Business & Market", "Business & Marché"],
};

// ── Segment label map (for partial matches) ─────────────────────────────────
const SEGMENT_LABELS: Record<string, [string, string]> = {
  "voice":      ["Voice Pipeline", "Pipeline Vocal"],
  "tts":        ["TTS", "TTS"],
  "stt":        ["STT", "STT"],
  "benchmarks": ["Benchmarks", "Benchmarks"],
  "stack":      ["Decision Framework", "Cadre de Décision"],
  "pipeline":   ["V2V Diagram", "Diagramme V2V"],
  "scoring":    ["Custom Scoring", "Scoring Personnalisé"],
  "avatars":    ["Video Avatars", "Avatars Vidéo"],
  "pricing":    ["Cost Simulator", "Simulateur de Coûts"],
  "market":     ["Business & Market", "Business & Marché"],
  "project":    ["The Project", "Le Projet"],
  "research":   ["Research Challenges", "Défis de Recherche"],
  "architecture": ["Architecture", "Architecture"],
  "gaps":       ["Research Gaps", "Lacunes de Recherche"],
  "academic":   ["Academic References", "Références Académiques"],
  "behavior":   ["Behavior & Expressiveness", "Comportement & Expressivité"],
  "emotional":  ["Emotional Toolbox", "Boîte à Outils Émotionnelle"],
  "platform":   ["Platform", "Plateforme"],
};

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

function resolveDynamicLabel(segment: string, parentSegment: string, isFr: boolean): string {
  // Dynamic TTS tool: /tts/:id
  if (parentSegment === "tts") {
    const tool = getTTSData().find((t) => t.id === segment);
    if (tool) return tool.name;
  }
  // Dynamic STT tool: /voice/stt/:id
  if (parentSegment === "stt") {
    const tool = getSTTData().find((t) => t.id === segment);
    if (tool) return tool.name;
  }
  // Dynamic platform: /platform/:id
  if (parentSegment === "platform") {
    return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
  // Fallback: capitalize
  const labels = SEGMENT_LABELS[segment];
  if (labels) return isFr ? labels[1] : labels[0];
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildBreadcrumbs(pathname: string, isFr: boolean): BreadcrumbItem[] {
  // Always start with Home
  if (pathname === "/") return [];

  const crumbs: BreadcrumbItem[] = [];
  const segments = pathname.split("/").filter(Boolean);

  // Build cumulative paths
  let cumulativePath = "";
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i] as string;
    const prevSeg = (segments[i - 1] ?? "") as string;
    cumulativePath += "/" + seg;
    const isLast = i === segments.length - 1;

    // Try exact full path match first
    const exactLabels = ROUTE_LABELS[cumulativePath];
    let label: string;
    if (exactLabels) {
      label = isFr ? exactLabels[1] : exactLabels[0];
    } else {
      // Try dynamic resolution
      label = resolveDynamicLabel(seg, prevSeg, isFr);
    }

    crumbs.push({ label, path: cumulativePath, isLast });
  }

  return crumbs;
}

export default function Breadcrumb() {
  const [location] = useLocation();
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  // Don't show on home page
  if (location === "/" || location === "") return null;

  const crumbs = buildBreadcrumbs(location, isFr);
  if (crumbs.length === 0) return null;

  return (
    <nav
      aria-label={isFr ? "Fil d'Ariane" : "Breadcrumb"}
      className="bg-white border-b border-slate-100"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-1 flex-wrap text-xs">
        {/* Home icon */}
        <InternalLink
          to="/"
          className="flex items-center gap-1 text-slate-400 hover:text-slate-700 transition-colors shrink-0"
          aria-label={isFr ? "Accueil" : "Home"}
        >
          <Home size={12} />
        </InternalLink>

        {crumbs.map((crumb, idx) => (
          <span key={crumb.path} className="flex items-center gap-1">
            <ChevronRight size={11} className="text-slate-300 shrink-0" />
            {crumb.isLast ? (
              <span
                className="font-semibold truncate max-w-[200px]"
                style={{ color: "oklch(0.45 0.15 200)" }}
                aria-current="page"
              >
                {crumb.label}
              </span>
            ) : (
              <InternalLink
                to={crumb.path}
                className="text-slate-500 hover:text-slate-800 transition-colors truncate max-w-[160px]"
              >
                {crumb.label}
              </InternalLink>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
