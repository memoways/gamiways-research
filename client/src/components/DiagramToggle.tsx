/**
 * DiagramToggle — Collapsible diagram wrapper with type badges
 * Design: GamiWays style (Space Grotesk, Source Serif 4, slate palette)
 * Types: "technique" | "concept" | "expérience"
 */
import { useState } from "react";
import { ChevronDown, ChevronUp, Cpu, Lightbulb, Users } from "lucide-react";

type DiagramType = "technique" | "concept" | "experience";

interface DiagramToggleProps {
  title: string;
  titleFr?: string;
  summary: string;
  summaryFr?: string;
  types: DiagramType[];
  accentColor: string;
  isFr?: boolean;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const TYPE_CONFIG: Record<DiagramType, { label: string; labelFr: string; icon: React.ElementType; bg: string; text: string }> = {
  technique: {
    label: "Technical",
    labelFr: "Technique",
    icon: Cpu,
    bg: "oklch(0.95 0.03 220)",
    text: "oklch(0.40 0.15 220)",
  },
  concept: {
    label: "Concept",
    labelFr: "Concept",
    icon: Lightbulb,
    bg: "oklch(0.96 0.04 80)",
    text: "oklch(0.45 0.18 80)",
  },
  experience: {
    label: "UX",
    labelFr: "Expérience",
    icon: Users,
    bg: "oklch(0.95 0.04 150)",
    text: "oklch(0.40 0.16 150)",
  },
};

export default function DiagramToggle({
  title,
  titleFr,
  summary,
  summaryFr,
  types,
  accentColor,
  isFr = false,
  children,
  defaultOpen = false,
}: DiagramToggleProps) {
  const [open, setOpen] = useState(defaultOpen);
  const displayTitle = isFr && titleFr ? titleFr : title;
  const displaySummary = isFr && summaryFr ? summaryFr : summary;

  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
      {/* Header — always visible */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors group"
        aria-expanded={open}
      >
        {/* Accent bar */}
        <div className="shrink-0 w-0.5 self-stretch rounded-full mt-0.5" style={{ background: accentColor }} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Type badges */}
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            {types.map((type) => {
              const cfg = TYPE_CONFIG[type];
              const Icon = cfg.icon;
              return (
                <span
                  key={type}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wide"
                  style={{ background: cfg.bg, color: cfg.text }}
                >
                  <Icon size={9} />
                  {isFr ? cfg.labelFr : cfg.label}
                </span>
              );
            })}
          </div>

          {/* Title */}
          <div className="text-sm font-semibold text-slate-800 leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {displayTitle}
          </div>

          {/* Summary — always visible */}
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {displaySummary}
          </p>
        </div>

        {/* Toggle icon */}
        <div
          className="shrink-0 mt-0.5 rounded p-0.5 transition-colors"
          style={{ color: open ? accentColor : "oklch(0.60 0 0)" }}
        >
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Diagram content — collapsible */}
      {open && (
        <div className="border-t border-slate-100 px-4 pb-4 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}
