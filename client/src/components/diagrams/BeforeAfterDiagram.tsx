/*
 * BeforeAfterDiagram — DigiDouble Research Portal
 * Visual: current pipeline (6–12s, red bottleneck) vs target (<2s, green)
 * Design: side-by-side, SVG inline, hover tooltips
 */
import { useState } from "react";

interface StepProps {
  label: string;
  sublabel: string;
  latency: string;
  isBottleneck?: boolean;
  color: string;
  tooltip: string;
}

function PipelineStep({ label, sublabel, latency, isBottleneck, color, tooltip }: StepProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative flex flex-col items-center cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="rounded border-2 px-3 py-2 text-center transition-all duration-200"
        style={{
          borderColor: isBottleneck ? "oklch(0.60 0.20 25)" : color,
          background: isBottleneck ? "oklch(0.98 0.02 25)" : hovered ? "oklch(0.97 0.01 200)" : "white",
          minWidth: "90px",
          boxShadow: hovered ? `0 2px 12px ${color}40` : "none",
        }}
      >
        <div className="text-xs font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: isBottleneck ? "oklch(0.60 0.20 25)" : color }}>
          {label}
        </div>
        <div className="text-xs text-slate-400 font-mono mt-0.5">{sublabel}</div>
        <div
          className="text-xs font-bold mt-1 font-mono"
          style={{ color: isBottleneck ? "oklch(0.60 0.20 25)" : "oklch(0.65 0.18 145)" }}
        >
          {latency}
        </div>
      </div>
      {/* Tooltip */}
      {hovered && (
        <div
          className="absolute bottom-full mb-2 z-20 rounded border border-slate-200 bg-white shadow-lg p-2 text-xs text-slate-600 w-44 text-left"
          style={{ fontFamily: "'Source Serif 4', serif" }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}

function Arrow({ bottleneck }: { bottleneck?: boolean }) {
  return (
    <div className="flex items-center px-1">
      <svg width="20" height="12" viewBox="0 0 20 12">
        <line x1="0" y1="6" x2="14" y2="6" stroke={bottleneck ? "oklch(0.60 0.20 25)" : "oklch(0.72 0.18 200)"} strokeWidth="1.5" />
        <polygon points="14,2 20,6 14,10" fill={bottleneck ? "oklch(0.60 0.20 25)" : "oklch(0.72 0.18 200)"} />
      </svg>
    </div>
  );
}

interface Props {
  lang?: "en" | "fr";
}

export default function BeforeAfterDiagram({ lang = "en" }: Props) {
  const isFr = lang === "fr";

  const beforeSteps: StepProps[] = [
    {
      label: "ASR/STT",
      sublabel: isFr ? "Transcription" : "Transcription",
      latency: "300–500ms",
      color: "oklch(0.72 0.18 200)",
      tooltip: isFr ? "Deepgram ou Whisper local. Déjà dans les cibles." : "Deepgram or local Whisper. Already within targets.",
    },
    {
      label: "LLM",
      sublabel: isFr ? "Génération" : "Generation",
      latency: "800ms–2s",
      color: "oklch(0.72 0.18 200)",
      tooltip: isFr ? "GPT-4o ou SLM local. Latence acceptable en streaming." : "GPT-4o or local SLM. Acceptable latency in streaming.",
    },
    {
      label: "TTS",
      sublabel: isFr ? "Synthèse vocale" : "Voice synthesis",
      latency: "200–500ms",
      color: "oklch(0.72 0.18 200)",
      tooltip: isFr ? "ElevenLabs ou XTTS-v2. Dans les cibles avec streaming." : "ElevenLabs or XTTS-v2. Within targets with streaming.",
    },
    {
      label: "Avatar",
      sublabel: isFr ? "Génération vidéo" : "Video generation",
      latency: "5–10s",
      isBottleneck: true,
      color: "oklch(0.60 0.20 25)",
      tooltip: isFr ? "⚠ GOULOT PRINCIPAL — HeyGem OS sur GPU. Diffusion frame-by-frame. C'est ici que la R&D est nécessaire." : "⚠ MAIN BOTTLENECK — HeyGem OS on GPU. Frame-by-frame diffusion. This is where R&D is needed.",
    },
    {
      label: "WebRTC",
      sublabel: isFr ? "Transport" : "Transport",
      latency: "30–80ms",
      color: "oklch(0.72 0.18 200)",
      tooltip: isFr ? "WebRTC + WebSocket. Déjà optimisé par Memoways." : "WebRTC + WebSocket. Already optimized by Memoways.",
    },
  ];

  const afterSteps: StepProps[] = [
    {
      label: "ASR/STT",
      sublabel: isFr ? "Streaming" : "Streaming",
      latency: "<200ms",
      color: "oklch(0.65 0.18 145)",
      tooltip: isFr ? "Audiogami (Gamilab) — hébergé en Suisse, HITL optionnel." : "Audiogami (Gamilab) — Swiss-hosted, optional HITL.",
    },
    {
      label: "SLM",
      sublabel: isFr ? "Distillé + RAG" : "Distilled + RAG",
      latency: "150–400ms",
      color: "oklch(0.65 0.18 145)",
      tooltip: isFr ? "Llama 3.1 8B quantifié + Mem0. Personnalité avatar distillée." : "Quantized Llama 3.1 8B + Mem0. Distilled avatar personality.",
    },
    {
      label: "TTS",
      sublabel: isFr ? "Streaming" : "Streaming",
      latency: "<200ms",
      color: "oklch(0.65 0.18 145)",
      tooltip: isFr ? "Chatterbox-Turbo ou FishAudio S1-mini. Open-source, souverain." : "Chatterbox-Turbo or FishAudio S1-mini. Open-source, sovereign.",
    },
    {
      label: "Avatar",
      sublabel: isFr ? "R&D IDIAP" : "IDIAP R&D",
      latency: "<500ms",
      color: "oklch(0.65 0.18 145)",
      tooltip: isFr ? "Architecture R&D : distillation + cache intelligent + dégradation gracieuse. Objectif de la collaboration IDIAP." : "R&D architecture: distillation + intelligent cache + graceful degradation. IDIAP collaboration goal.",
    },
    {
      label: "WebRTC",
      sublabel: isFr ? "Adaptatif" : "Adaptive",
      latency: "<50ms",
      color: "oklch(0.65 0.18 145)",
      tooltip: isFr ? "Protocole de synchronisation adaptatif multi-flux." : "Adaptive multi-stream synchronization protocol.",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-6">
        {/* BEFORE */}
        <div className="border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded" style={{ background: "oklch(0.98 0.02 25)", color: "oklch(0.60 0.20 25)" }}>
              {isFr ? "ÉTAT ACTUEL" : "CURRENT STATE"}
            </span>
            <span className="text-lg font-bold font-mono" style={{ color: "oklch(0.60 0.20 25)" }}>6–12s</span>
            <span className="text-xs text-slate-400 font-mono">{isFr ? "par échange" : "per exchange"}</span>
          </div>
          <div className="flex items-center flex-wrap gap-1">
            {beforeSteps.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <PipelineStep {...step} />
                {i < beforeSteps.length - 1 && <Arrow bottleneck={i === 2} />}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2">
            <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: "oklch(0.98 0.02 25)", color: "oklch(0.60 0.20 25)" }}>
              ⚠
            </span>
            <p className="text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Le goulot est la génération vidéo avatar (5–10s). Les autres composants sont déjà dans les cibles."
                : "The bottleneck is avatar video generation (5–10s). All other components are already within targets."}
            </p>
          </div>
        </div>

        {/* AFTER */}
        <div className="border-2 rounded-lg p-5" style={{ borderColor: "oklch(0.65 0.18 145 / 0.4)" }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded" style={{ background: "oklch(0.97 0.05 145)", color: "oklch(0.45 0.18 145)" }}>
              {isFr ? "CIBLE R&D" : "R&D TARGET"}
            </span>
            <span className="text-lg font-bold font-mono" style={{ color: "oklch(0.45 0.18 145)" }}>&lt;2s</span>
            <span className="text-xs text-slate-400 font-mono">{isFr ? "end-to-end" : "end-to-end"}</span>
          </div>
          <div className="flex items-center flex-wrap gap-1">
            {afterSteps.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <PipelineStep {...step} />
                {i < afterSteps.length - 1 && <Arrow />}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2">
            <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: "oklch(0.97 0.05 145)", color: "oklch(0.45 0.18 145)" }}>
              ✓
            </span>
            <p className="text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Réduction 6–10× via distillation avatar + pipeline streaming + cache intelligent."
                : "6–10× reduction via avatar distillation + streaming pipeline + intelligent cache."}
            </p>
          </div>
        </div>
      </div>

      {/* Reduction indicator */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-slate-200 bg-white">
          <span className="text-sm font-bold font-mono" style={{ color: "oklch(0.60 0.20 25)" }}>6–12s</span>
          <svg width="32" height="12" viewBox="0 0 32 12">
            <line x1="0" y1="6" x2="26" y2="6" stroke="oklch(0.72 0.18 200)" strokeWidth="1.5" />
            <polygon points="26,2 32,6 26,10" fill="oklch(0.72 0.18 200)" />
          </svg>
          <span className="text-sm font-bold font-mono" style={{ color: "oklch(0.45 0.18 145)" }}>&lt;2s</span>
          <span className="text-xs text-slate-400 font-mono ml-1">6–10×</span>
        </div>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
    </div>
  );
}
