/*
 * TechStackDiagram — DigiDouble Research Portal
 * Visual: layered tech stack with latency targets, hover for justification
 * Design: horizontal layers, color-coded by status, hover tooltips
 */
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";

interface Layer {
  id: string;
  label: string;
  labelFr: string;
  tech: string;
  techFr: string;
  latency: string;
  status: "ok" | "rd" | "transition";
  sovereign: boolean;
  tooltip: string;
  tooltipFr: string;
}

const layers: Layer[] = [
  {
    id: "user",
    label: "User / Interface",
    labelFr: "Utilisateur / Interface",
    tech: "Web browser · WebRTC · WebSocket",
    techFr: "Navigateur web · WebRTC · WebSocket",
    latency: "30–80ms",
    status: "ok",
    sovereign: true,
    tooltip: "Standard real-time transport. Already optimized by Memoways over 14 years. WebRTC for audio/video, WebSocket for events.",
    tooltipFr: "Transport temps réel standard. Déjà optimisé par Memoways depuis 14 ans. WebRTC pour audio/vidéo, WebSocket pour les événements.",
  },
  {
    id: "avatar",
    label: "Avatar Generation",
    labelFr: "Génération Avatar",
    tech: "R&D IDIAP · HeyGem OS (transition) · Exoscale GPU",
    techFr: "R&D IDIAP · HeyGem OS (transition) · GPU Exoscale",
    latency: "<500ms (target)",
    status: "rd",
    sovereign: true,
    tooltip: "Main bottleneck. Currently 5–10s with HeyGem OS. IDIAP R&D target: <500ms via distillation + streaming diffusion + intelligent cache.",
    tooltipFr: "Goulot principal. Actuellement 5–10s avec HeyGem OS. Cible R&D IDIAP : <500ms via distillation + diffusion streaming + cache intelligent.",
  },
  {
    id: "tts",
    label: "TTS / Voice Synthesis",
    labelFr: "TTS / Synthèse Vocale",
    tech: "Chatterbox-Turbo · FishAudio S1-mini · XTTS-v2",
    techFr: "Chatterbox-Turbo · FishAudio S1-mini · XTTS-v2",
    latency: "<200ms",
    status: "ok",
    sovereign: true,
    tooltip: "Open-source, voice cloning from ~10s audio. MIT/Apache 2.0. Sovereign deployment on Exoscale. Multilingual FR/EN/DE/IT.",
    tooltipFr: "Open-source, clonage voix depuis ~10s audio. MIT/Apache 2.0. Déploiement souverain sur Exoscale. Multilingue FR/EN/DE/IT.",
  },
  {
    id: "memory",
    label: "Memory / RAG",
    labelFr: "Mémoire / RAG",
    tech: "Mem0 · pgvector · PostgreSQL",
    techFr: "Mem0 · pgvector · PostgreSQL",
    latency: "50–100ms",
    status: "ok",
    sovereign: true,
    tooltip: "3-layer architecture: Working (in-context) + Episodic (vector DB) + Semantic (PostgreSQL). −90% tokens vs naive approach.",
    tooltipFr: "Architecture 3 couches : Travail (in-context) + Épisodique (vector DB) + Sémantique (PostgreSQL). −90% tokens vs approche naïve.",
  },
  {
    id: "llm",
    label: "LLM Orchestration",
    labelFr: "Orchestration LLM",
    tech: "Llama 3.1 8B quantized · GPT-4o (transition) · Flowise",
    techFr: "Llama 3.1 8B quantifié · GPT-4o (transition) · Flowise",
    latency: "150–400ms",
    status: "transition",
    sovereign: true,
    tooltip: "Distilled SLM for avatar personality. RAG for dynamic context. Flowise for deterministic-organic orchestration. Transition from GPT-4o to local SLM.",
    tooltipFr: "SLM distillé pour personnalité avatar. RAG pour contexte dynamique. Flowise pour orchestration déterministe-organique. Transition de GPT-4o vers SLM local.",
  },
  {
    id: "asr",
    label: "ASR / Speech-to-Text",
    labelFr: "ASR / Reconnaissance vocale",
    tech: "Audiogami (Gamilab) · Whisper local",
    techFr: "Audiogami (Gamilab) · Whisper local",
    latency: "<300ms",
    status: "ok",
    sovereign: true,
    tooltip: "Audiogami already operational, Swiss-hosted, optional HITL. Whisper local as fallback. Both sovereign.",
    tooltipFr: "Audiogami déjà opérationnel, hébergé en Suisse, HITL optionnel. Whisper local en fallback. Les deux souverains.",
  },
];

const statusConfig = {
  ok: { label: "Operational", labelFr: "Opérationnel", color: "oklch(0.65 0.18 145)", bg: "oklch(0.97 0.05 145)" },
  rd: { label: "R&D Required", labelFr: "R&D requise", color: "oklch(0.60 0.20 25)", bg: "oklch(0.98 0.02 25)" },
  transition: { label: "In transition", labelFr: "En transition", color: "oklch(0.75 0.16 75)", bg: "oklch(0.97 0.04 75)" },
};

export default function TechStackDiagram() {
  const { lang } = useLang();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isFr = lang === "fr";

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex gap-4 mb-4 flex-wrap">
        {(Object.entries(statusConfig) as [keyof typeof statusConfig, typeof statusConfig[keyof typeof statusConfig]][]).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: cfg.color }} />
            <span className="text-xs text-slate-500 font-mono">{isFr ? cfg.labelFr : cfg.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono text-slate-400">🇨🇭</span>
          <span className="text-xs text-slate-500 font-mono">{isFr ? "Souverain (Suisse)" : "Sovereign (Swiss)"}</span>
        </div>
      </div>

      {/* Stack layers — bottom to top visually (user at top) */}
      <div className="space-y-2">
        {layers.map((layer) => {
          const cfg = statusConfig[layer.status];
          const isHovered = hoveredId === layer.id;
          return (
            <div
              key={layer.id}
              className="relative rounded border-l-4 cursor-default transition-all duration-200"
              style={{
                borderLeftColor: cfg.color,
                background: isHovered ? cfg.bg : "white",
                border: `1px solid ${isHovered ? cfg.color : "oklch(0.92 0.004 286.32)"}`,
                borderLeftWidth: "4px",
              }}
              onMouseEnter={() => setHoveredId(layer.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 text-base" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? layer.labelFr : layer.label}
                    </div>
                    <div className="text-sm text-slate-400 font-mono truncate">{isFr ? layer.techFr : layer.tech}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {layer.sovereign && <span className="text-xs font-mono text-slate-400">🇨🇭</span>}
                  <span className="text-sm font-bold font-mono" style={{ color: cfg.color }}>{layer.latency}</span>
                  <span className="text-sm font-mono px-2 py-1 rounded" style={{ color: cfg.color, background: cfg.bg }}>
                    {isFr ? cfg.labelFr : cfg.label}
                  </span>
                </div>
              </div>

              {/* Hover tooltip */}
              {isHovered && (
                <div className="px-4 pb-3 border-t" style={{ borderColor: `${cfg.color}30` }}>
                  <p className="text-sm text-slate-600 leading-relaxed pt-2" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {isFr ? layer.tooltipFr : layer.tooltip}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Total latency */}
      <div className="mt-4 flex items-center justify-between p-4 rounded border-2" style={{ borderColor: "oklch(0.65 0.18 145 / 0.4)", background: "oklch(0.97 0.05 145)" }}>
          <div className="text-base font-semibold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {isFr ? "Latence totale cible" : "Total target latency"}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400 font-mono line-through">6–12s</span>
          <svg width="20" height="10" viewBox="0 0 20 10"><line x1="0" y1="5" x2="14" y2="5" stroke="oklch(0.65 0.18 145)" strokeWidth="1.5" /><polygon points="14,2 20,5 14,8" fill="oklch(0.65 0.18 145)" /></svg>
          <span className="text-2xl font-bold font-mono" style={{ color: "oklch(0.45 0.18 145)" }}>&lt;2s</span>
        </div>
      </div>
    </div>
  );
}
