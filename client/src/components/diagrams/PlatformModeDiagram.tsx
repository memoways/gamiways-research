/*
 * PlatformModeDiagram — GamiWays Research Portal
 * Visual: two product modes (Pedagogical / Narrative) sharing a common engine
 * Design: clear visual split, hover for details on each component
 */
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";

export default function PlatformModeDiagram() {
  const { lang } = useLang();
  const [hovered, setHovered] = useState<string | null>(null);
  const isFr = lang === "fr";

  const engineComponents = [
    {
      id: "asr",
      label: "ASR",
      sublabel: isFr ? "Reconnaissance vocale" : "Speech recognition",
      tooltip: isFr ? "Audiogami (Gamilab) — hébergé en Suisse" : "Audiogami (Gamilab) — Swiss-hosted",
      color: "oklch(0.72 0.18 200)",
    },
    {
      id: "llm",
      label: "LLM + RAG",
      sublabel: isFr ? "Orchestration IA" : "AI orchestration",
      tooltip: isFr ? "SLM distillé + Mem0 + Flowise. Personnalité avatar distillée." : "Distilled SLM + Mem0 + Flowise. Distilled avatar personality.",
      color: "oklch(0.72 0.18 200)",
    },
    {
      id: "memory",
      label: isFr ? "Mémoire" : "Memory",
      sublabel: "Mem0 + pgvector",
      tooltip: isFr ? "3 couches : contexte actif + épisodique + sémantique" : "3 layers: active context + episodic + semantic",
      color: "oklch(0.72 0.18 200)",
    },
    {
      id: "tts",
      label: "TTS",
      sublabel: isFr ? "Synthèse vocale" : "Voice synthesis",
      tooltip: isFr ? "Chatterbox-Turbo / FishAudio S1-mini — clonage voix souverain" : "Chatterbox-Turbo / FishAudio S1-mini — sovereign voice cloning",
      color: "oklch(0.72 0.18 200)",
    },
    {
      id: "avatar",
      label: "Avatar",
      sublabel: isFr ? "Génération vidéo" : "Video generation",
      tooltip: isFr ? "HeyGem OS → R&D. Goulot principal. GPU Exoscale (Suisse)." : "HeyGem OS → R&D. Main bottleneck. Exoscale GPU (Switzerland).",
      color: "oklch(0.60 0.20 25)",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-3 gap-6 items-start">

        {/* MODE 01 — PEDAGOGICAL */}
        <div className="border-2 rounded-lg p-6" style={{ borderColor: "oklch(0.72 0.18 200 / 0.5)" }}>
          <div className="text-sm font-bold font-mono mb-2" style={{ color: "oklch(0.72 0.18 200)" }}>MODE 01</div>
          <div className="font-bold text-slate-900 text-xl mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{isFr ? "Mode pédagogique" : "Pedagogical mode"}</div>
          <div className="text-xs text-slate-500 mb-3" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr ? "Pédagogique · \"Lean Forward\"" : "Pedagogical · \"Lean Forward\""}
          </div>

          <div className="space-y-3 mb-4">
            {[
              { icon: "📚", label: isFr ? "Graphe de connaissances" : "Knowledge graph" },
              { icon: "🎯", label: isFr ? "Évaluation adaptative" : "Adaptive assessment" },
              { icon: "🔒", label: isFr ? "Contrôle pédagogique fort" : "Strong pedagogical control" },
              { icon: "👤", label: isFr ? "Avatar tuteur personnalisé" : "Personalized tutor avatar" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-sm">{item.icon}</span>
                <span className="text-sm text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="text-xs font-mono px-2 py-1 rounded text-center" style={{ background: "oklch(0.97 0.02 200)", color: "oklch(0.45 0.18 200)" }}>
            {isFr ? "Liberté IA : 20–40%" : "AI freedom: 20–40%"}
          </div>
        </div>

        {/* SHARED ENGINE */}
        <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
          <div className="text-sm font-bold font-mono text-center mb-4 text-slate-500">
            {isFr ? "MOTEUR PARTAGÉ" : "SHARED ENGINE"}
          </div>

          <div className="space-y-3">
            {engineComponents.map((comp) => {
              const isHov = hovered === comp.id;
              return (
                <div
                  key={comp.id}
                  className="relative rounded border px-4 py-3 cursor-default transition-all duration-150"
                  style={{
                    borderColor: isHov ? comp.color : "oklch(0.92 0.004 286.32)",
                    background: isHov ? "white" : "white",
                    boxShadow: isHov ? `0 1px 8px ${comp.color}30` : "none",
                  }}
                  onMouseEnter={() => setHovered(comp.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: comp.color }}>
                        {comp.label}
                      </span>
                      <span className="text-sm text-slate-400 ml-2 font-mono">{comp.sublabel}</span>
                    </div>
                    {comp.id === "avatar" && (
                      <span className="text-sm font-mono px-2 py-0.5 rounded" style={{ background: "oklch(0.98 0.02 25)", color: "oklch(0.60 0.20 25)" }}>R&D</span>
                    )}
                  </div>
                  {isHov && (
                    <div className="mt-2 text-sm text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {comp.tooltip}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-center">
            <span className="text-sm font-mono text-slate-400">🇨🇭 {isFr ? "Exoscale · Souverain" : "Exoscale · Sovereign"}</span>
          </div>
        </div>

        {/* MODE 02 — NARRATIVE */}
        <div className="border-2 rounded-lg p-6" style={{ borderColor: "oklch(0.72 0.18 50 / 0.5)" }}>
          <div className="text-sm font-bold font-mono mb-2" style={{ color: "oklch(0.72 0.18 50)" }}>MODE 02</div>
          <div className="font-bold text-slate-900 text-xl mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{isFr ? "Mode narratif" : "Narrative mode"}</div>
          <div className="text-xs text-slate-500 mb-3" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr ? "Narratif · \"Lean Back\"" : "Narrative · \"Lean Back\""}
          </div>

          <div className="space-y-3 mb-4">
            {[
              { icon: "🎬", label: isFr ? "Séquençage cinématographique" : "Cinematic sequencing" },
              { icon: "🎭", label: isFr ? "Personnage fictif évolutif" : "Evolving fictional character" },
              { icon: "🔓", label: isFr ? "Liberté narrative forte" : "Strong narrative freedom" },
              { icon: "🎥", label: isFr ? "Vidéo plein écran immersive" : "Immersive full-screen video" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-sm">{item.icon}</span>
                <span className="text-sm text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="text-xs font-mono px-2 py-1 rounded text-center" style={{ background: "oklch(0.97 0.02 50)", color: "oklch(0.55 0.18 50)" }}>
            {isFr ? "Liberté IA : 60–80%" : "AI freedom: 60–80%"}
          </div>
        </div>
      </div>

      {/* Connection arrows */}
      <div className="flex items-center justify-center gap-2 mt-5">
        <div className="h-px flex-1 border-t border-dashed border-slate-300" />
        <span className="text-sm text-slate-400 font-mono px-2">
          {isFr ? "Même moteur, mêmes avatars, mêmes données" : "Same engine, same avatars, same data"}
        </span>
        <div className="h-px flex-1 border-t border-dashed border-slate-300" />
      </div>
    </div>
  );
}
