/**
 * PipelinePhase1.tsx — DigiDouble Research Portal
 * Design: Technical documentation style — dark sidebar, monospace accents, structured data
 * Interactive voice pipeline diagram for Phase 1 MVP
 */

import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import {
  ChevronLeft,
  ChevronRight,
  Mic,
  Ear,
  Brain,
  Zap,
  Volume2,
  Radio,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Clock,
  DollarSign,
  Shield,
  Layers,
  GitBranch,
  Info,
} from "lucide-react";
import {
  cascadeBlocks,
  pipelineModes,
  recommendedStacks,
  v2vOptions,
  type PipelineBlock,
  type PipelineOption,
  type RecommendedStack,
} from "@/lib/pipelineData";

// ─── Block Icons ──────────────────────────────────────────────────────────────

const blockIcons: Record<string, React.FC<{ className?: string }>> = {
  input: Mic,
  asr: Ear,
  memory: Brain,
  llm: Zap,
  tts: Volume2,
  transport: Radio,
};

// ─── Tier Badge ───────────────────────────────────────────────────────────────

function TierBadge({ tier }: { tier: string }) {
  const styles: Record<string, string> = {
    recommended: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    alternative: "bg-amber-50 text-amber-700 border border-amber-200",
    research: "bg-purple-50 text-purple-700 border border-purple-200",
  };
  const labels: Record<string, string> = {
    recommended: "Recommandé",
    alternative: "Alternatif",
    research: "R&D",
  };
  return (
    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${styles[tier] || styles.alternative}`}>
      {labels[tier] || tier}
    </span>
  );
}

// ─── Deploy Badge ─────────────────────────────────────────────────────────────

function DeployBadge({ mode }: { mode: string }) {
  const styles: Record<string, string> = {
    cloud: "bg-blue-50 text-blue-700",
    local: "bg-slate-100 text-slate-700",
    hybrid: "bg-indigo-50 text-indigo-700",
  };
  const labels: Record<string, string> = {
    cloud: "Cloud",
    local: "Local",
    hybrid: "Hybride",
  };
  return (
    <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${styles[mode] || styles.cloud}`}>
      {labels[mode] || mode}
    </span>
  );
}

// ─── Latency Bar ──────────────────────────────────────────────────────────────

function LatencyBar({ best, typical, max = 1000 }: { best: number; typical: number; max?: number }) {
  const bestPct = Math.min((best / max) * 100, 100);
  const typicalPct = Math.min((typical / max) * 100, 100);
  return (
    <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full rounded-full opacity-40"
        style={{ width: `${typicalPct}%`, background: "oklch(0.55 0.20 200)" }}
      />
      <div
        className="absolute top-0 left-0 h-full rounded-full"
        style={{ width: `${bestPct}%`, background: "oklch(0.55 0.20 200)" }}
      />
    </div>
  );
}

// ─── Option Card ──────────────────────────────────────────────────────────────

function OptionCard({
  option,
  selected,
  onSelect,
  isFr,
}: {
  option: PipelineOption;
  selected: boolean;
  onSelect: () => void;
  isFr: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-lg border transition-all cursor-pointer ${
        selected
          ? "border-cyan-400 bg-cyan-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
      onClick={onSelect}
    >
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors ${
              selected ? "border-cyan-500 bg-cyan-500" : "border-slate-300"
            }`} />
            <span className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {option.name}
            </span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <TierBadge tier={option.tier} />
            <DeployBadge mode={option.deployMode} />
          </div>
        </div>

        {/* Latency + cost row */}
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span className="text-xs font-mono text-slate-600">
              {option.latencyBest}–{option.latencyTypical}ms
            </span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-slate-400" />
            <span className="text-xs font-mono text-slate-600">{option.costNote}</span>
          </div>
          {option.sovereign && (
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-emerald-600 font-mono">Souverain</span>
            </div>
          )}
        </div>

        <LatencyBar best={option.latencyBest} typical={option.latencyTypical} max={600} />

        {/* Notes */}
        <p className="text-xs text-slate-500 mt-2 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
          {option.notes}
        </p>

        {/* Expand toggle */}
        <button
          className="mt-2 text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
        >
          <Info className="w-3 h-3" />
          {expanded ? (isFr ? "Moins" : "Less") : (isFr ? "Pros/Cons" : "Pros/Cons")}
        </button>

        {expanded && (
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs font-bold text-emerald-700 mb-1">+ {isFr ? "Pour" : "Pros"}</p>
              {option.pros.map((p, i) => (
                <div key={i} className="flex items-start gap-1 mb-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-600">{p}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold text-red-600 mb-1">− {isFr ? "Contre" : "Cons"}</p>
              {option.cons.map((c, i) => (
                <div key={i} className="flex items-start gap-1 mb-0.5">
                  <XCircle className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-600">{c}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {option.ttsLink && (
        <div className="border-t border-slate-100 px-3 py-1.5">
          <InternalLink
            to={`/tts/${option.ttsLink}`}
            className="text-xs text-cyan-600 hover:text-cyan-800 font-mono transition-colors"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            Fiche détaillée →
          </InternalLink>
        </div>
      )}
    </div>
  );
}

// ─── Pipeline Block Panel ─────────────────────────────────────────────────────

function BlockPanel({
  block,
  selectedOption,
  onSelectOption,
  isFr,
  isActive,
  onActivate,
}: {
  block: PipelineBlock;
  selectedOption: string;
  onSelectOption: (id: string) => void;
  isFr: boolean;
  isActive: boolean;
  onActivate: () => void;
}) {
  const Icon = blockIcons[block.id] || Layers;
  const selected = block.options.find((o) => o.id === selectedOption);

  return (
    <div className={`rounded-xl border transition-all ${isActive ? "border-cyan-300 shadow-md" : "border-slate-200"}`}>
      {/* Block header */}
      <button
        className="w-full text-left p-4 flex items-center gap-3"
        onClick={onActivate}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: block.colorLight }}
        >
          <span style={{ color: block.color }}><Icon className="w-5 h-5" /></span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-mono text-slate-400">0{block.step + 1}</span>
            <span className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? block.labelFr : block.label}
            </span>
          </div>
          {selected && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-mono truncate">{selected.name}</span>
              <span className="text-xs font-mono text-slate-400">{selected.latencyBest}–{selected.latencyTypical}ms</span>
            </div>
          )}
        </div>
        <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${isActive ? "rotate-90" : ""}`} />
      </button>

      {/* Expanded options */}
      {isActive && (
        <div className="px-4 pb-4 border-t border-slate-100">
          <p className="text-xs text-slate-500 leading-relaxed mt-3 mb-3" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr ? block.descriptionFr : block.description}
          </p>
          <div className="space-y-2">
            {block.options.map((option) => (
              <OptionCard
                key={option.id}
                option={option}
                selected={selectedOption === option.id}
                onSelect={() => onSelectOption(option.id)}
                isFr={isFr}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Stack Card ───────────────────────────────────────────────────────────────

function StackCard({
  stack,
  isFr,
  onApply,
}: {
  stack: RecommendedStack;
  isFr: boolean;
  onApply: () => void;
}) {
  const priorityStyle: Record<string, string> = {
    primary: "border-cyan-300 bg-gradient-to-br from-slate-900 to-slate-800 text-white",
    secondary: "border-slate-200 bg-white",
    research: "border-purple-200 bg-purple-50",
  };

  const isLight = stack.priority !== "primary";

  return (
    <div className={`rounded-xl border p-5 ${priorityStyle[stack.priority]}`}>
      {stack.priority === "primary" && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500 text-white">
            {isFr ? "RECOMMANDÉ MVP" : "MVP RECOMMENDED"}
          </span>
        </div>
      )}

      <h3 className={`text-base font-bold mb-1 ${isLight ? "text-slate-900" : "text-white"}`}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {isFr ? stack.labelFr : stack.label}
      </h3>
      <p className={`text-xs mb-3 ${isLight ? "text-slate-500" : "text-slate-300"}`}
         style={{ fontFamily: "'Source Serif 4', serif" }}>
        {isFr ? stack.taglineFr : stack.tagline}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className={`rounded-lg p-2 text-center ${isLight ? "bg-slate-50" : "bg-slate-700/50"}`}>
          <div className={`text-xs mb-0.5 ${isLight ? "text-slate-400" : "text-slate-400"}`}>
            {isFr ? "Latence min" : "Best latency"}
          </div>
          <div className={`text-lg font-bold font-mono ${isLight ? "text-slate-900" : "text-cyan-400"}`}>
            {stack.totalLatencyBest}ms
          </div>
        </div>
        <div className={`rounded-lg p-2 text-center ${isLight ? "bg-slate-50" : "bg-slate-700/50"}`}>
          <div className={`text-xs mb-0.5 ${isLight ? "text-slate-400" : "text-slate-400"}`}>
            {isFr ? "Latence typ." : "Typical"}
          </div>
          <div className={`text-lg font-bold font-mono ${isLight ? "text-slate-900" : "text-white"}`}>
            {stack.totalLatencyTypical}ms
          </div>
        </div>
        <div className={`rounded-lg p-2 text-center ${isLight ? "bg-slate-50" : "bg-slate-700/50"}`}>
          <div className={`text-xs mb-0.5 ${isLight ? "text-slate-400" : "text-slate-400"}`}>
            {isFr ? "Coût/min" : "Cost/min"}
          </div>
          <div className={`text-lg font-bold font-mono ${isLight ? "text-slate-900" : "text-white"}`}>
            ${stack.costPerMin.toFixed(3)}
          </div>
        </div>
      </div>

      {/* Sovereignty */}
      <div className={`flex items-center gap-1.5 mb-3 text-xs ${isLight ? "text-slate-500" : "text-slate-300"}`}>
        <Shield className={`w-3.5 h-3.5 ${stack.sovereign ? "text-emerald-500" : "text-slate-400"}`} />
        {stack.sovereign
          ? (isFr ? "Souveraineté complète — déployable Exoscale/OVH" : "Full sovereignty — Exoscale/OVH deployable")
          : (isFr ? "Cloud US — acceptable pour prototype" : "US Cloud — acceptable for prototype")}
      </div>

      {/* Rationale */}
      <p className={`text-xs leading-relaxed mb-4 ${isLight ? "text-slate-500" : "text-slate-300"}`}
         style={{ fontFamily: "'Source Serif 4', serif" }}>
        {isFr ? stack.rationaleFr : stack.rationale}
      </p>

      <button
        onClick={onApply}
        className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${
          isLight
            ? "bg-slate-900 text-white hover:bg-slate-700"
            : "bg-cyan-500 text-white hover:bg-cyan-400"
        }`}
      >
        {isFr ? "Appliquer cette stack →" : "Apply this stack →"}
      </button>
    </div>
  );
}

// ─── Cumulative Latency Bar ───────────────────────────────────────────────────

function CumulativeLatency({
  blocks,
  selections,
  isFr,
}: {
  blocks: PipelineBlock[];
  selections: Record<string, string>;
  isFr: boolean;
}) {
  const blockColors = [
    "oklch(0.55 0.18 240)",
    "oklch(0.55 0.20 200)",
    "oklch(0.55 0.18 280)",
    "oklch(0.55 0.20 50)",
    "oklch(0.55 0.20 145)",
    "oklch(0.55 0.18 25)",
  ];

  let cumBest = 0;
  let cumTypical = 0;
  let cumCost = 0;
  const segments: { label: string; best: number; typical: number; color: string; cost: number }[] = [];

  blocks.forEach((block, i) => {
    const opt = block.options.find((o) => o.id === selections[block.id]);
    if (opt) {
      cumBest += opt.latencyBest;
      cumTypical += opt.latencyTypical;
      cumCost += opt.costPerMin || 0;
      segments.push({
        label: isFr ? block.labelFr : block.label,
        best: opt.latencyBest,
        typical: opt.latencyTypical,
        color: blockColors[i] || "oklch(0.55 0.18 200)",
        cost: opt.costPerMin || 0,
      });
    }
  });

  const totalMax = Math.max(cumTypical * 1.1, 2000);

  return (
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {isFr ? "Latence & Coût estimés" : "Estimated Latency & Cost"}
        </h3>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Latency */}
          <div className="text-right">
            <div className="text-xs text-slate-400">{isFr ? "Meilleur cas" : "Best case"}</div>
            <div className="text-xl font-bold font-mono text-emerald-600">{cumBest}ms</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">{isFr ? "Cas typique" : "Typical"}</div>
            <div className="text-xl font-bold font-mono text-slate-900">{cumTypical}ms</div>
          </div>
          {/* Divider */}
          <div className="w-px h-8 bg-slate-200 hidden sm:block" />
          {/* Cost */}
          <div className="text-right">
            <div className="text-xs text-slate-400">{isFr ? "Coût/min" : "Cost/min"}</div>
            <div className={`text-xl font-bold font-mono ${
              cumCost === 0 ? "text-emerald-600" :
              cumCost < 0.05 ? "text-emerald-600" :
              cumCost < 0.15 ? "text-amber-600" :
              "text-red-600"
            }`}>
              {cumCost === 0 ? "Free" : `$${cumCost.toFixed(3)}`}
            </div>
          </div>
          <div className={`text-right`}>
            <div className="text-xs text-slate-400">{isFr ? "Coût/heure" : "Cost/hour"}</div>
            <div className="text-sm font-bold font-mono text-slate-600">
              {cumCost === 0 ? "Free" : `$${(cumCost * 60).toFixed(2)}`}
            </div>
          </div>
          {/* Status badge */}
          <div className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono ${
            cumBest < 600 ? "bg-emerald-100 text-emerald-700" :
            cumBest < 1200 ? "bg-amber-100 text-amber-700" :
            "bg-red-100 text-red-700"
          }`}>
            {cumBest < 600 ? "✓ Cible <2s" : cumBest < 1200 ? "~ Acceptable" : "✗ Trop lent"}
          </div>
        </div>
      </div>

      {/* Target position as % of totalMax */}
      {(() => {
        const TARGET_MS = 2000;
        const targetPct = Math.min((TARGET_MS / totalMax) * 100, 100);
        const bestOver = cumBest > TARGET_MS;
        const typicalOver = cumTypical > TARGET_MS;

        return (
          <>
            {/* Stacked bar — best case */}
            <div className="mb-1">
              <div className="text-xs text-slate-400 mb-1 font-mono">{isFr ? "Meilleur cas" : "Best case"}</div>
              <div className="relative">
                <div className="flex h-5 rounded-full overflow-hidden bg-slate-100">
                  {segments.map((s, i) => (
                    <div
                      key={i}
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${(s.best / totalMax) * 100}%`,
                        background: s.color,
                        minWidth: s.best > 0 ? "2px" : "0",
                      }}
                      title={`${s.label}: ${s.best}ms`}
                    />
                  ))}
                </div>
                {/* 2000ms target line */}
                <div
                  className="absolute top-0 bottom-0 flex flex-col items-center pointer-events-none"
                  style={{ left: `${targetPct}%`, transform: "translateX(-50%)" }}
                >
                  <div className={`w-0.5 h-full ${bestOver ? "bg-red-500" : "bg-red-400"}`} />
                </div>
              </div>
            </div>

            {/* Stacked bar — typical */}
            <div className="mb-1">
              <div className="text-xs text-slate-400 mb-1 font-mono">{isFr ? "Cas typique" : "Typical"}</div>
              <div className="relative">
                <div className="flex h-5 rounded-full overflow-hidden bg-slate-100">
                  {segments.map((s, i) => (
                    <div
                      key={i}
                      className="h-full opacity-60 transition-all duration-300"
                      style={{
                        width: `${(s.typical / totalMax) * 100}%`,
                        background: s.color,
                        minWidth: s.typical > 0 ? "2px" : "0",
                      }}
                      title={`${s.label}: ${s.typical}ms`}
                    />
                  ))}
                </div>
                {/* 2000ms target line */}
                <div
                  className="absolute top-0 bottom-0 flex flex-col items-center pointer-events-none"
                  style={{ left: `${targetPct}%`, transform: "translateX(-50%)" }}
                >
                  <div className={`w-0.5 h-full ${typicalOver ? "bg-red-500" : "bg-red-400"}`} />
                </div>
              </div>
            </div>

            {/* Target label below bars */}
            <div className="relative mb-3" style={{ height: "18px" }}>
              <div
                className="absolute flex items-center gap-1 pointer-events-none"
                style={{
                  left: `${targetPct}%`,
                  transform: targetPct > 80 ? "translateX(-100%)" : "translateX(-50%)",
                  top: 0,
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                <span className="text-xs font-mono font-bold text-red-600 whitespace-nowrap">
                  {isFr ? "Cible 2s" : "2s target"}
                </span>
              </div>
            </div>
          </>
        );
      })()}

      {/* Legend — latency + cost breakdown */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: s.color }} />
            <span className="text-xs text-slate-500 font-mono">
              {s.label.split(" ")[0]}: {s.best}ms
              {s.cost > 0 && <span className="text-slate-400"> · ${s.cost.toFixed(3)}/min</span>}
              {s.cost === 0 && <span className="text-emerald-500"> · free</span>}
            </span>
          </div>
        ))}
      </div>
      {/* Cost bar */}
      {cumCost > 0 && (
        <div className="mb-3">
          <div className="text-xs text-slate-400 mb-1 font-mono">{isFr ? "Répartition du coût" : "Cost breakdown"}</div>
          <div className="flex h-3 rounded-full overflow-hidden bg-slate-100">
            {segments.filter(s => s.cost > 0).map((s, i) => (
              <div
                key={i}
                className="h-full transition-all duration-300"
                style={{
                  width: `${(s.cost / cumCost) * 100}%`,
                  background: s.color,
                  minWidth: "2px",
                }}
                title={`${s.label}: $${s.cost.toFixed(3)}/min (${Math.round((s.cost / cumCost) * 100)}%)`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
            {segments.filter(s => s.cost > 0).map((s, i) => (
              <span key={i} className="text-xs font-mono text-slate-400">
                <span style={{ color: s.color }}>■</span> {s.label.split(" ")[0]}: {Math.round((s.cost / cumCost) * 100)}%
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Target line annotation */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
        <p className="text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>
          {isFr
            ? "Cible DigiDouble Phase 1 : <2s bout-en-bout (pipeline vocal seul, hors génération avatar). La génération avatar ajoute 80–300ms (BeyondPresence) ou 3–8s (HeyGen)."
            : "DigiDouble Phase 1 target: <2s end-to-end (voice pipeline only, excluding avatar generation). Avatar generation adds 80–300ms (BeyondPresence) or 3–8s (HeyGen)."}
        </p>
      </div>
    </div>
  );
}

// ─── V2V Section ──────────────────────────────────────────────────────────────

function V2VSection({ isFr }: { isFr: boolean }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="bg-slate-900 rounded-xl p-6 text-white">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
          <GitBranch className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Alternative : Voix-à-Voix End-to-End" : "Alternative: End-to-End Voice-to-Voice"}
          </h3>
          <p className="text-sm text-slate-400" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Un seul modèle audio-in → audio-out. Latence minimale (150–350ms) mais pas de clonage vocal — non adapté au MVP Phase 1. À explorer pour l'Axe R&D 1 (H2 2026)."
              : "Single model audio-in → audio-out. Minimal latency (150–350ms) but no voice cloning — not suitable for Phase 1 MVP. To explore for R&D Axis 1 (H2 2026)."}
          </p>
        </div>
      </div>

      {/* Comparison callout */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="text-xs font-mono text-slate-400 mb-1">{isFr ? "Latence V2V" : "V2V Latency"}</div>
          <div className="text-2xl font-bold font-mono text-purple-400">150–350ms</div>
          <div className="text-xs text-slate-500 mt-1">{isFr ? "vs 505ms+ cascade" : "vs 505ms+ cascade"}</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="text-xs font-mono text-slate-400 mb-1">{isFr ? "Clonage vocal" : "Voice cloning"}</div>
          <div className="text-2xl font-bold font-mono text-red-400">{isFr ? "Non" : "No"}</div>
          <div className="text-xs text-slate-500 mt-1">{isFr ? "critique pour DigiDouble" : "critical for DigiDouble"}</div>
        </div>
      </div>

      {/* V2V options */}
      <div className="space-y-2">
        {v2vOptions.map((opt) => (
          <div key={opt.id} className="bg-slate-800 rounded-lg overflow-hidden">
            <button
              className="w-full text-left p-3 flex items-center gap-3"
              onClick={() => setExpanded(expanded === opt.id ? null : opt.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {opt.name}
                  </span>
                  <TierBadge tier={opt.tier} />
                  <DeployBadge mode={opt.deployMode} />
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-mono text-slate-400">{opt.latencyBest}–{opt.latencyTypical}ms</span>
                  <span className="text-xs font-mono text-slate-400">{opt.costNote}</span>
                  {opt.sovereign && <span className="text-xs text-emerald-400 font-mono">Souverain</span>}
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform flex-shrink-0 ${expanded === opt.id ? "rotate-90" : ""}`} />
            </button>

            {expanded === opt.id && (
              <div className="px-3 pb-3 border-t border-slate-700">
                <p className="text-xs text-slate-400 leading-relaxed mt-2 mb-2" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {opt.notes}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    {opt.pros.map((p, i) => (
                      <div key={i} className="flex items-start gap-1 mb-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-400">{p}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    {opt.cons.map((c, i) => (
                      <div key={i} className="flex items-start gap-1 mb-0.5">
                        <XCircle className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-400">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {opt.ttsLink && (
                  <InternalLink
                    to={`/tts/${opt.ttsLink}`}
                    className="inline-block mt-2 text-xs text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
                  >
                    Fiche détaillée →
                  </InternalLink>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PipelinePhase1() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  // Default selections: first recommended option per block
  const defaultSelections: Record<string, string> = {};
  cascadeBlocks.forEach((block) => {
    const rec = block.options.find((o) => o.tier === "recommended");
    defaultSelections[block.id] = rec?.id || block.options[0]?.id || "";
  });

  const [selections, setSelections] = useState<Record<string, string>>(defaultSelections);
  const [activeBlock, setActiveBlock] = useState<string>("asr");
  const [activeMode, setActiveMode] = useState<"cascade" | "v2v">("cascade");

  const applyStack = (stack: RecommendedStack) => {
    const newSel: Record<string, string> = { ...selections };
    stack.blocks.forEach(({ blockId, optionId }) => {
      newSel[blockId] = optionId;
    });
    setSelections(newSel);
    setActiveMode("cascade");
  };

  const cascadeMode = pipelineModes.find((m) => m.id === "cascade")!;
  const v2vMode = pipelineModes.find((m) => m.id === "v2v")!;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <InternalLink
            to="/state-of-art"
            className="cta-back"
          >
            <ChevronLeft className="w-4 h-4" />
            {isFr ? "Retour" : "Back"}
          </InternalLink>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-mono text-slate-500 hidden sm:block">
            {isFr ? "Phase 1 MVP" : "Phase 1 MVP"}
          </span>
          <span className="text-slate-300 hidden sm:block">/</span>
          <span className="text-sm font-semibold text-slate-900">
            {isFr ? "Pipeline Vocal" : "Voice Pipeline"}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Page title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-100 text-cyan-700 border border-cyan-200">
              PHASE 1 MVP
            </span>
            <span className="text-xs font-mono text-slate-400">
              {isFr ? "Architecture de référence" : "Reference architecture"}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Pipeline Vocal Voice-to-Voice" : "Voice-to-Voice Pipeline"}
          </h1>
          <p className="text-slate-500 max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Diagramme interactif du pipeline vocal complet pour le MVP DigiDouble Phase 1. Sélectionnez les composants de chaque bloc pour visualiser la latence cumulée et le coût estimé. Comparez l'approche Cascade (ASR → LLM → TTS) avec le Voice-to-Voice end-to-end."
              : "Interactive diagram of the complete voice pipeline for DigiDouble Phase 1 MVP. Select components for each block to visualize cumulative latency and estimated cost. Compare the Cascade approach (ASR → LLM → TTS) with end-to-end Voice-to-Voice."}
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveMode("cascade")}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
              activeMode === "cascade"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            <span className="font-mono text-xs mr-1.5">01</span>
            {isFr ? "Pipeline Cascade" : "Cascade Pipeline"}
          </button>
          <button
            onClick={() => setActiveMode("v2v")}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
              activeMode === "v2v"
                ? "bg-purple-700 text-white border-purple-700"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            <span className="font-mono text-xs mr-1.5">02</span>
            {isFr ? "Voix-à-Voix E2E" : "Voice-to-Voice E2E"}
          </button>
        </div>

        {activeMode === "cascade" && (
          <div>
            {/* ── STICKY LATENCY BAR — full width ── */}
            <div className="sticky top-14 z-20 mb-6">
              <CumulativeLatency blocks={cascadeBlocks} selections={selections} isFr={isFr} />
            </div>

            {/* ── SCROLLABLE CONTENT ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Left col: Pipeline flow + Block panels + Mode comparison */}
              <div className="lg:col-span-2 space-y-4">

                {/* Pipeline flow diagram */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <div className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider">
                    {isFr ? "Flux du pipeline" : "Pipeline flow"}
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {cascadeBlocks.map((block, i) => {
                      const Icon = blockIcons[block.id] || Layers;
                      const sel = block.options.find((o) => o.id === selections[block.id]);
                      return (
                        <div key={block.id} className="flex items-center gap-1">
                          <button
                            onClick={() => setActiveBlock(block.id)}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                              activeBlock === block.id
                                ? "border-cyan-400 bg-cyan-50 text-cyan-800"
                                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            <span style={{ color: block.color } as React.CSSProperties}><Icon className="w-3.5 h-3.5" /></span>
                            <span className="hidden sm:inline font-mono">{sel?.name.split(" ")[0] || block.label.split(" ")[0]}</span>
                            <span className="text-slate-400 font-mono">{sel?.latencyBest}ms</span>
                          </button>
                          {i < cascadeBlocks.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Block panels */}
                <div className="space-y-2">
                  {cascadeBlocks.map((block) => (
                    <BlockPanel
                      key={block.id}
                      block={block}
                      selectedOption={selections[block.id]}
                      onSelectOption={(id) => setSelections((prev) => ({ ...prev, [block.id]: id }))}
                      isFr={isFr}
                      isActive={activeBlock === block.id}
                      onActivate={() => setActiveBlock(activeBlock === block.id ? "" : block.id)}
                    />
                  ))}
                </div>

                {/* Mode comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[cascadeMode, v2vMode].map((mode) => (
                    <div key={mode.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: mode.color }} />
                        <span className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {isFr ? mode.labelFr : mode.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-3" style={{ fontFamily: "'Source Serif 4', serif" }}>
                        {isFr ? mode.taglineFr : mode.tagline}
                      </p>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-slate-50 rounded p-2 text-center">
                          <div className="text-xs text-slate-400">{isFr ? "Latence min" : "Best"}</div>
                          <div className="text-base font-bold font-mono text-slate-900">{mode.totalLatencyBest}ms</div>
                        </div>
                        <div className="bg-slate-50 rounded p-2 text-center">
                          <div className="text-xs text-slate-400">{isFr ? "Typique" : "Typical"}</div>
                          <div className="text-base font-bold font-mono text-slate-900">{mode.totalLatencyTypical}ms</div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                        {isFr ? mode.recommendationFr : mode.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right col: Stacks + Decision guide + TTS link */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? "Stacks recommandées" : "Recommended Stacks"}
                  </h2>
                  <p className="text-xs text-slate-500 mb-3" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {isFr
                      ? "Cliquez sur 'Appliquer' pour charger les composants dans le configurateur."
                      : "Click 'Apply' to load components into the configurator."}
                  </p>
                </div>

                {recommendedStacks.map((stack) => (
                  <StackCard
                    key={stack.id}
                    stack={stack}
                    isFr={isFr}
                    onApply={() => applyStack(stack)}
                  />
                ))}

                {/* Decision guide */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-amber-800 mb-1">
                        {isFr ? "Décision clé : clonage vocal" : "Key decision: voice cloning"}
                      </p>
                      <p className="text-xs text-amber-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                        {isFr
                          ? "Le clonage vocal est critique pour le persona DigiDouble. Options : Cartesia (cloud, 40ms), Chatterbox (local, 150ms, MIT), ElevenLabs (cloud, 75ms, $75/1M). La stack souveraine requiert Chatterbox + Kokoro en combinaison."
                          : "Voice cloning is critical for DigiDouble persona. Options: Cartesia (cloud, 40ms), Chatterbox (local, 150ms, MIT), ElevenLabs (cloud, 75ms, $75/1M). Sovereign stack requires Chatterbox + Kokoro combination."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Link to TTS state of art */}
                <div className="bg-slate-900 rounded-xl p-4 text-white">
                  <p className="text-xs font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? "Comparer toutes les solutions TTS" : "Compare all TTS solutions"}
                  </p>
                  <p className="text-xs text-slate-400 mb-3" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {isFr
                      ? "14 solutions TTS/V2V avec scores comparatifs sur 7 axes."
                      : "14 TTS/V2V solutions with comparative scores on 7 axes."}
                  </p>
                  <InternalLink
                    to="/state-of-art"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-medium transition-all"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    {isFr ? "État de l'Art TTS →" : "TTS State of the Art →"}
                  </InternalLink>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeMode === "v2v" && (
          <div className="max-w-3xl">
            <V2VSection isFr={isFr} />
            <div className="mt-6 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Quand passer au V2V ?" : "When to switch to V2V?"}
              </h3>
              <div className="space-y-2">
                {[
                  {
                    label: isFr ? "Phase 1 MVP (maintenant)" : "Phase 1 MVP (now)",
                    value: isFr ? "Pipeline Cascade — contrôle + clonage vocal" : "Cascade Pipeline — control + voice cloning",
                    ok: true,
                  },
                  {
                    label: isFr ? "Phase 2 R&D (H2 2026)" : "Phase 2 R&D (H2 2026)",
                    value: isFr ? "Évaluer Voxtral TTS + Ultravox pour latence <200ms" : "Evaluate Voxtral TTS + Ultravox for <200ms latency",
                    ok: true,
                  },
                  {
                    label: isFr ? "Production (2027+)" : "Production (2027+)",
                    value: isFr ? "V2V si clonage vocal disponible + qualité validée" : "V2V if voice cloning available + quality validated",
                    ok: false,
                  },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                    {row.ok
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      : <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />}
                    <div>
                      <div className="text-xs font-bold text-slate-700 font-mono">{row.label}</div>
                      <div className="text-xs text-slate-500">{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom navigation */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <InternalLink
            to="/state-of-art"
            className="cta-primary"
          >
            <ChevronLeft className="w-4 h-4" />
            {isFr ? "Retour à l'État de l'Art" : "Back to State of the Art"}
          </InternalLink>
          <InternalLink
            to="/research"
            className="cta-secondary"
          >
            {isFr ? "Défis de Recherche" : "Research Challenges"}
            <ChevronRight className="w-4 h-4" />
          </InternalLink>
        </div>
      </div>
    </div>
  );
}
