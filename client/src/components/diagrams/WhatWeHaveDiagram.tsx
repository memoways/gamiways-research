/*
 * WhatWeHaveDiagram — DigiDouble pipeline overview
 * Design: HTML/CSS responsive (vertical on mobile, horizontal on desktop)
 * 3 zones:
 *   GREEN  = Available (Gamilab / Audiogami ASR)
 *   BLUE   = R&D Innosuisse + IDIAP (Memory, TTS, Avatar)
 *   YELLOW = R&D interne Memoways (Orchestration wrapping Memory+LLM+TTS, Multi-Stream Sync)
 * Output: EXPERIENCE (Pedagogical mode + Narrative mode) — Target <2s
 */
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";

const C = {
  available: { border: "#16a34a", bg: "#f0fdf4", text: "#15803d", badge: "#dcfce7" },
  innosuisse: { border: "#2563eb", bg: "#eff6ff", text: "#1d4ed8", badge: "#dbeafe" },
  memoways:   { border: "#d97706", bg: "#fffbeb", text: "#b45309", badge: "#fef3c7" },
  output:     { border: "#0891b2", bg: "#ecfeff", text: "#0e7490", badge: "#cffafe" },
  bottleneck: { border: "#dc2626", bg: "#fef2f2", text: "#b91c1c", badge: "#fee2e2" },
  neutral:    { border: "#cbd5e1", bg: "#f8fafc", text: "#334155", badge: "#f1f5f9" },
};

interface BlockDef {
  id: string;
  label: { en: string; fr: string };
  sub: { en: string; fr: string };
  axis?: { en: string; fr: string };
  zone: keyof typeof C;
  bottleneck?: boolean;
  tooltip: { en: string; fr: string };
}

const BLOCKS: BlockDef[] = [
  {
    id: "asr",
    label: { en: "Sovereign ASR", fr: "ASR Souverain" },
    sub: { en: "Audiogami · Swiss-hosted · Production", fr: "Audiogami · Hébergé CH · Production" },
    axis: { en: "Gamilab", fr: "Gamilab" },
    zone: "available",
    tooltip: {
      en: "Production-grade speech-to-text pipeline. Swiss-hosted, HITL optional, API + SDK. Available now.",
      fr: "Pipeline STT production. Hébergé en Suisse, HITL optionnel, API + SDK. Disponible maintenant.",
    },
  },
  {
    id: "memory",
    label: { en: "Memory", fr: "Mémoire" },
    sub: { en: "Long-term · 3-layer arch.", fr: "Long terme · Archi. 3 couches" },
    axis: { en: "Axis 1 · IDIAP", fr: "Axe 1 · IDIAP" },
    zone: "innosuisse",
    tooltip: {
      en: "Long-term conversational memory without token explosion. 3-layer architecture. Fundamental research — Innosuisse + IDIAP.",
      fr: "Mémoire conversationnelle longue durée sans explosion de tokens. Architecture 3 couches. Recherche fondamentale — Innosuisse + IDIAP.",
    },
  },
  {
    id: "llm",
    label: { en: "LLM / SLM", fr: "LLM / SLM" },
    sub: { en: "Generation · Sovereign", fr: "Génération · Souverain" },
    axis: { en: "Memoways R&D", fr: "R&D Memoways" },
    zone: "memoways",
    tooltip: {
      en: "Language model for response generation. External (GPT-4o, Mistral) or self-hosted SLM on Exoscale GPU. Optimization: Memoways internal R&D.",
      fr: "Modèle de langage pour la génération de réponses. Externe (GPT-4o, Mistral) ou SLM auto-hébergé sur GPU Exoscale. Optimisation : R&D interne Memoways.",
    },
  },
  {
    id: "tts",
    label: { en: "TTS", fr: "TTS" },
    sub: { en: "Expressive voice · <200ms", fr: "Voix expressive · <200ms" },
    axis: { en: "Axis 2a · IDIAP", fr: "Axe 2a · IDIAP" },
    zone: "innosuisse",
    tooltip: {
      en: "Personalized prosodic TTS: capture of individual prosodic fingerprint. Target: <200ms. Fundamental research — Innosuisse + IDIAP.",
      fr: "TTS prosodique personnalisé : capture de l'empreinte prosodique individuelle. Cible : <200ms. Recherche fondamentale — Innosuisse + IDIAP.",
    },
  },
  {
    id: "avatar",
    label: { en: "Avatar", fr: "Avatar" },
    sub: { en: "Real-time · Body language", fr: "Temps réel · Langage corporel" },
    axis: { en: "Axis 2b · IDIAP ⚠", fr: "Axe 2b · IDIAP ⚠" },
    zone: "innosuisse",
    bottleneck: true,
    tooltip: {
      en: "Real-time expressive avatar with body language. Critical bottleneck: 6–12s now → <500ms target. Fundamental research — Innosuisse + IDIAP.",
      fr: "Avatar expressif temps réel avec langage corporel. Goulot critique : 6–12s actuellement → cible <500ms. Recherche fondamentale — Innosuisse + IDIAP.",
    },
  },
  {
    id: "multistream",
    label: { en: "Multi-Stream Sync", fr: "Sync Multi-Stream" },
    sub: { en: "5 streams · <100ms · Node editor", fr: "5 flux · <100ms · Éditeur nœuds" },
    axis: { en: "Memoways · 14y expertise", fr: "Memoways · 14 ans d'expertise" },
    zone: "memoways",
    tooltip: {
      en: "Sync of 5 media streams (video, audio, subtitles, quiz, nav). Node editor for non-technical creators. 14 years of Memoways multimedia expertise.",
      fr: "Sync de 5 flux médias (vidéo, audio, sous-titres, quiz, nav). Éditeur de nœuds pour créateurs non-techniques. 14 ans d'expertise multimédia Memoways.",
    },
  },
];

function PipeBlock({ b, isFr, hovered, setHovered }: {
  b: BlockDef; isFr: boolean;
  hovered: string | null; setHovered: (id: string | null) => void;
}) {
  const isHov = hovered === b.id;
  const c = b.bottleneck ? C.bottleneck : C[b.zone];
  return (
    <button
      className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg text-left transition-all duration-150 w-full md:w-auto"
      style={{
        border: `1.5px solid ${c.border}`,
        background: isHov ? c.bg : "white",
        boxShadow: isHov ? `0 0 0 3px ${c.border}22` : "none",
        minWidth: "90px",
        maxWidth: "160px",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(b.id)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(b.id)}
      onBlur={() => setHovered(null)}
    >
      <span className="text-sm font-bold leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.text }}>
        {isFr ? b.label.fr : b.label.en}
      </span>
      <span className="text-[10px] leading-tight font-mono" style={{ color: "#64748b" }}>
        {isFr ? b.sub.fr : b.sub.en}
      </span>
      {b.axis && (
        <span className="text-[9px] font-mono font-bold mt-0.5" style={{ color: b.bottleneck ? C.bottleneck.text : c.border }}>
          {isFr ? b.axis.fr : b.axis.en}
        </span>
      )}
      {b.bottleneck && (
        <span className="text-[9px] font-mono font-bold" style={{ color: C.bottleneck.text }}>
          ⚠ 6–12s → &lt;500ms
        </span>
      )}
    </button>
  );
}

function Arrow({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <div className="flex justify-center py-0.5">
        <svg width="16" height="20" viewBox="0 0 16 20">
          <line x1="8" y1="1" x2="8" y2="15" stroke="#94a3b8" strokeWidth="1.5" />
          <polygon points="4,13 8,19 12,13" fill="#94a3b8" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center px-0.5 shrink-0">
      <svg width="22" height="14" viewBox="0 0 22 14">
        <line x1="1" y1="7" x2="16" y2="7" stroke="#94a3b8" strokeWidth="1.5" />
        <polygon points="14,3 21,7 14,11" fill="#94a3b8" />
      </svg>
    </div>
  );
}

export default function WhatWeHaveDiagram() {
  const { lang } = useLang();
  const isFr = lang === "fr";
  const [hovered, setHovered] = useState<string | null>(null);

  const hBlock = hovered ? BLOCKS.find((b) => b.id === hovered) : null;

  const latencyItems = [
    { label: "ASR+STT", value: "<300ms", zone: "available" as const },
    { label: isFr ? "Orchestration" : "Orchestration", value: "<200ms", zone: "memoways" as const },
    { label: "LLM/SLM", value: "<500ms", zone: "memoways" as const },
    { label: "TTS", value: "<200ms", zone: "innosuisse" as const },
    { label: isFr ? "Avatar (R&D)" : "Avatar (R&D)", value: "<500ms", zone: "bottleneck" as const },
    { label: isFr ? "Streaming" : "Streaming", value: "<300ms", zone: "memoways" as const },
    { label: "= Total", value: "<2s", zone: "output" as const, bold: true },
  ];

  return (
    <div className="w-full" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── LEGEND ── */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-5">
        {([
          { zone: "available" as const, en: "Available (Gamilab)", fr: "Disponible (Gamilab)" },
          { zone: "innosuisse" as const, en: "R&D · Innosuisse + IDIAP", fr: "R&D · Innosuisse + IDIAP" },
          { zone: "memoways" as const, en: "R&D · Memoways internal", fr: "R&D · Memoways interne" },
          { zone: "bottleneck" as const, en: "Critical bottleneck", fr: "Goulot critique" },
        ]).map(({ zone, en, fr }) => (
          <div key={zone} className="flex items-center gap-1.5 text-[10px] font-mono">
            <div className="w-3 h-3 rounded-sm border" style={{ borderColor: C[zone].border, background: C[zone].bg }} />
            <span style={{ color: C[zone].text }}>{isFr ? fr : en}</span>
          </div>
        ))}
      </div>

      {/* ── PIPELINE ── */}
      {/* Mobile: vertical stack | Desktop: horizontal row */}
      <div className="flex flex-col md:flex-row md:items-stretch md:flex-wrap gap-1 md:gap-0">

        {/* USER */}
        <div className="flex flex-col items-center justify-center px-3 py-3 rounded-lg border-2 self-center md:self-auto shrink-0"
          style={{ borderColor: C.neutral.border, background: C.neutral.bg, minWidth: "80px" }}>
          <span className="text-sm font-bold" style={{ color: C.neutral.text }}>USER</span>
          <span className="text-[10px] font-mono" style={{ color: "#94a3b8" }}>{isFr ? "Voix / Texte" : "Voice / Text"}</span>
        </div>

        {/* Mobile arrow */}
        <div className="md:hidden"><Arrow vertical /></div>
        {/* Desktop arrow */}
        <div className="hidden md:flex md:items-center"><Arrow /></div>

        {/* ASR — Available */}
        <PipeBlock b={BLOCKS[0]} isFr={isFr} hovered={hovered} setHovered={setHovered} />

        <div className="md:hidden"><Arrow vertical /></div>
        <div className="hidden md:flex md:items-center"><Arrow /></div>

        {/* ORCHESTRATION wrapper (Memoways R&D) containing Memory → LLM → TTS */}
        <div className="rounded-lg px-3 py-2.5 flex flex-col gap-2"
          style={{ border: `1.5px dashed ${C.memoways.border}`, background: C.memoways.badge + "88" }}>
          <div className="text-[9px] font-bold font-mono uppercase tracking-wider" style={{ color: C.memoways.text }}>
            {isFr ? "Orchestration — R&D Memoways (Axe 3)" : "Orchestration — Memoways R&D (Axis 3)"}
          </div>
          {/* Inner pipeline */}
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-0">
            <PipeBlock b={BLOCKS[1]} isFr={isFr} hovered={hovered} setHovered={setHovered} />
            <div className="md:hidden"><Arrow vertical /></div>
            <div className="hidden md:flex md:items-center"><Arrow /></div>
            <PipeBlock b={BLOCKS[2]} isFr={isFr} hovered={hovered} setHovered={setHovered} />
            <div className="md:hidden"><Arrow vertical /></div>
            <div className="hidden md:flex md:items-center"><Arrow /></div>
            <PipeBlock b={BLOCKS[3]} isFr={isFr} hovered={hovered} setHovered={setHovered} />
          </div>
        </div>

        <div className="md:hidden"><Arrow vertical /></div>
        <div className="hidden md:flex md:items-center"><Arrow /></div>

        {/* AVATAR — bottleneck */}
        <PipeBlock b={BLOCKS[4]} isFr={isFr} hovered={hovered} setHovered={setHovered} />

        <div className="md:hidden"><Arrow vertical /></div>
        <div className="hidden md:flex md:items-center"><Arrow /></div>

        {/* MULTI-STREAM — Memoways */}
        <PipeBlock b={BLOCKS[5]} isFr={isFr} hovered={hovered} setHovered={setHovered} />

        <div className="md:hidden"><Arrow vertical /></div>
        <div className="hidden md:flex md:items-center">
          <div className="flex items-center px-0.5 shrink-0">
            <svg width="22" height="14" viewBox="0 0 22 14">
              <line x1="1" y1="7" x2="16" y2="7" stroke={C.output.border} strokeWidth="2" />
              <polygon points="14,3 21,7 14,11" fill={C.output.border} />
            </svg>
          </div>
        </div>

        {/* EXPERIENCE OUTPUT */}
        <div className="flex flex-col gap-1.5 px-3 py-3 rounded-lg shrink-0 self-center md:self-auto"
          style={{ border: `2px solid ${C.output.border}`, background: C.output.bg, minWidth: "110px" }}>
          <span className="text-[9px] font-bold font-mono uppercase tracking-wider" style={{ color: C.output.text }}>
            {isFr ? "EXPÉRIENCE" : "EXPERIENCE"}
          </span>
          <span className="text-sm font-black" style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.output.text }}>
            {isFr ? "Cible <2s" : "Target <2s"}
          </span>
          <div className="flex flex-col gap-1 mt-1 border-t pt-1.5" style={{ borderColor: C.output.border + "44" }}>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm shrink-0" style={{ background: "#2563eb" }} />
              <span className="text-[10px] font-mono font-bold" style={{ color: "#1d4ed8" }}>Mode pédagogique</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm shrink-0" style={{ background: "#d97706" }} />
              <span className="text-[10px] font-mono font-bold" style={{ color: "#b45309" }}>Mode narratif</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TOOLTIP PANEL ── */}
      {hBlock && (
        <div className="mt-4 px-4 py-3 rounded-lg border text-xs leading-relaxed"
          style={{
            borderColor: hBlock.bottleneck ? C.bottleneck.border : C[hBlock.zone].border,
            background: hBlock.bottleneck ? C.bottleneck.bg : C[hBlock.zone].bg,
            color: "#334155",
            fontFamily: "'Source Serif 4', serif",
          }}>
          <span className="block font-bold font-mono text-[10px] uppercase tracking-wider mb-1"
            style={{ color: hBlock.bottleneck ? C.bottleneck.text : C[hBlock.zone].text }}>
            {isFr ? hBlock.label.fr : hBlock.label.en}
          </span>
          {isFr ? hBlock.tooltip.fr : hBlock.tooltip.en}
        </div>
      )}

      {/* ── LATENCY BUDGET BAR ── */}
      <div className="mt-5 border border-slate-200 rounded-lg p-3" style={{ background: "#f8fafc" }}>
        <div className="text-[9px] font-bold font-mono uppercase tracking-wider text-slate-400 mb-3 text-center">
          {isFr ? "BUDGET LATENCE CIBLE — TOTAL <2s" : "TARGET LATENCY BUDGET — TOTAL <2s"}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {latencyItems.map((item) => {
            const c = C[item.zone];
            return (
              <div key={item.label} className="flex flex-col items-center gap-0.5">
                <span className="text-xs font-bold font-mono px-2 py-1 rounded"
                  style={{
                    background: c.badge,
                    color: c.text,
                    border: `1px solid ${c.border}`,
                    fontWeight: (item as { bold?: boolean }).bold ? 900 : 700,
                  }}>
                  {item.value}
                </span>
                <span className="text-[9px] text-slate-400 font-mono">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
