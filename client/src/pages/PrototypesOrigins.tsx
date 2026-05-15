/**
 * PrototypesOrigins — GamiWays Research Portal
 * Sub-page of /project — presents the two founding prototypes:
 *   - Parle à AVA! (Storygami) — interactive cinema
 *   - Le Dilemme Plastique (Edugami) — educational voice-first
 * Design: schema-first, inline Mermaid-style diagrams as SVG/JSX, links to Voice & Avatars sections
 * i18n: EN (default) / FR via LangContext
 */
import { useState } from "react";
import { ExternalLink, ArrowRight, Mic, Video, Clock, Zap, BookOpen, Film, ChevronDown, ChevronUp, DollarSign, User, Cpu, Database } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import { Link } from "wouter";

function SectionDivider({ number, title, titleFr, isFr }: { number: string; title: string; titleFr: string; isFr: boolean }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-xs font-mono text-slate-300 shrink-0">{number}</span>
      <div className="h-px flex-1 bg-slate-200" />
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 shrink-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {isFr ? titleFr : title}
      </span>
      <div className="h-px w-8 bg-slate-200" />
    </div>
  );
}

function Accordion({ label, labelFr, isFr, children }: { label: string; labelFr: string; isFr: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors rounded"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <span>{isFr ? labelFr : label}</span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-slate-100 bg-slate-50">
          {children}
        </div>
      )}
    </div>
  );
}

/** UX Flow diagram — vertical steps with icons, Project.tsx style */
function UXFlowDiagram({ steps, color }: { steps: { icon: React.ElementType; label: string; sub?: string }[]; color: string }) {
  return (
    <div className="relative">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-3">
          {/* Connector column */}
          <div className="flex flex-col items-center shrink-0" style={{ width: 32 }}>
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{ width: 32, height: 32, background: `${color}12`, border: `1.5px solid ${color}35` }}
            >
              <step.icon size={13} style={{ color }} />
            </div>
            {i < steps.length - 1 && (
              <div className="w-px" style={{ flex: 1, minHeight: 18, background: `${color}20` }} />
            )}
          </div>
          {/* Content */}
          <div className="pb-4 pt-1.5 flex-1">
            <div className="text-xs font-bold text-slate-800 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {step.label}
            </div>
            {step.sub && (
              <div className="text-[11px] text-slate-400 mt-0.5 leading-snug" style={{ fontFamily: "'Source Serif 4', serif" }}>{step.sub}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Architecture block diagram — layered boxes, Project.tsx style */
function ArchDiagram({ layers, color }: { layers: { title: string; items: { name: string; tech: string }[] }[]; color: string }) {
  return (
    <div className="space-y-2">
      {layers.map((layer, i) => (
        <div key={i} className="border border-slate-200 rounded overflow-hidden">
          {/* Layer header — accent left border like Project.tsx project cards */}
          <div
            className="px-4 py-2 flex items-center gap-2"
            style={{ borderLeft: `3px solid ${color}`, background: `${color}08` }}
          >
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {layer.title}
            </span>
          </div>
          {/* Items grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-slate-100">
            {layer.items.map((item, j) => (
              <div key={j} className="flex flex-col px-3 py-2.5 bg-white">
                <span className="text-xs font-semibold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.name}</span>
                <span className="text-[10px] text-slate-400 mt-0.5 font-mono">{item.tech}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Cost breakdown — tokens + tools */
function CostBreakdown({ items, total, color }: { items: { tool: string; usage: string; cost: string; tokens?: string }[]; total: string; color: string }) {
  return (
    <div className="rounded-lg border overflow-hidden" style={{ borderColor: `${color}25` }}>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: `${color}08`, borderBottom: `1px solid ${color}20` }}>
              <th className="text-left px-3 py-2 font-bold text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Outil / Service</th>
              <th className="text-left px-3 py-2 font-bold text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Usage</th>
              <th className="text-left px-3 py-2 font-bold text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Tokens / Volume</th>
              <th className="text-right px-3 py-2 font-bold text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Coût</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-3 py-2 font-mono font-bold" style={{ color, fontFamily: "'Space Grotesk', sans-serif" }}>{item.tool}</td>
                <td className="px-3 py-2 text-slate-600">{item.usage}</td>
                <td className="px-3 py-2 text-slate-400 font-mono">{item.tokens || "—"}</td>
                <td className="px-3 py-2 text-right font-mono font-bold text-slate-700">{item.cost}</td>
              </tr>
            ))}
            <tr className="border-t-2" style={{ borderColor: `${color}30`, background: `${color}06` }}>
              <td colSpan={3} className="px-3 py-2 font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Total développement</td>
              <td className="px-3 py-2 text-right font-mono font-black" style={{ color }}>{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Pipeline flow diagram — numbered horizontal steps, Project.tsx style */
function PipelineFlow({ steps, color }: { steps: { label: string; sub?: string }[]; color: string }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex items-stretch gap-0 min-w-max border border-slate-200 rounded overflow-hidden">
        {steps.map((step, i) => (
          <div key={i} className="flex items-stretch">
            {/* Step block */}
            <div
              className="flex flex-col justify-center px-3 py-3 text-center"
              style={{ background: i === 0 ? `${color}12` : i === steps.length - 1 ? `${color}18` : "white", minWidth: "88px", borderLeft: i > 0 ? "1px solid oklch(0.92 0.006 265)" : undefined }}
            >
              <span
                className="text-[10px] font-bold font-mono mb-0.5"
                style={{ color: "oklch(0.75 0.006 265)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-xs font-semibold text-slate-800 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.label}</span>
              {step.sub && (
                <span className="text-[10px] text-slate-400 mt-0.5 font-mono leading-tight">{step.sub}</span>
              )}
            </div>
            {/* Arrow divider */}
            {i < steps.length - 1 && (
              <div className="flex items-center justify-center w-5 shrink-0 bg-white border-l border-slate-100">
                <ArrowRight size={11} style={{ color: `${color}60` }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Latency bar chart — visual comparison */
function LatencyBar({ label, before, after, unit, color }: { label: string; before: number; after: number; unit: string; color: string }) {
  const max = before;
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{label}</span>
        <span className="text-xs font-mono text-slate-400">{before}{unit} → <span className="font-bold" style={{ color }}>{after}{unit}</span></span>
      </div>
      <div className="relative h-4 bg-slate-100 rounded overflow-hidden">
        <div className="absolute inset-0 h-full rounded" style={{ width: "100%", background: "oklch(0.88 0.006 265)" }} />
        <div className="absolute inset-0 h-full rounded transition-all duration-700" style={{ width: `${(after / max) * 100}%`, background: color }} />
      </div>
    </div>
  );
}

/** Metric card */
function MetricCard({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded p-3 text-center">
      <div className="text-xl font-black font-mono mb-0.5" style={{ color }}>{value}</div>
      <div className="text-xs text-slate-500 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{label}</div>
    </div>
  );
}

/** Cross-link card to Voice/Avatars sections */
function CrossLink({ href, icon: Icon, title, titleFr, desc, descFr, color, isFr }: {
  href: string; icon: React.ElementType; title: string; titleFr: string;
  desc: string; descFr: string; color: string; isFr: boolean;
}) {
  return (
    <Link href={href}>
      <div
        className="flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm"
        style={{ borderColor: `${color}30`, background: `${color}06` }}
      >
        <div className="shrink-0 mt-0.5 p-1.5 rounded" style={{ background: `${color}15` }}>
          <Icon size={14} style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-slate-900 mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? titleFr : title}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr ? descFr : desc}
          </p>
        </div>
        <ArrowRight size={13} className="shrink-0 mt-1" style={{ color: `${color}80` }} />
      </div>
    </Link>
  );
}

export default function PrototypesOrigins() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  const AVA_COLOR = "oklch(0.72 0.18 50)";
  const DILEMME_COLOR = "oklch(0.55 0.20 200)";

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="border-b border-slate-200 py-10">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">01</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-mono text-slate-400">{isFr ? "The Project" : "The Project"}</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-mono text-slate-400">{isFr ? "Prototypes Fondateurs" : "Founding Prototypes"}</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}>
            {isFr ? "Les origines concrètes de GamiWays" : "The concrete origins of GamiWays"}
          </h1>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl mb-5" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "GamiWays n'est pas né d'une idée abstraite. Il est la généralisation de deux prototypes fonctionnels, testés avec de vrais utilisateurs, qui ont chacun révélé les mêmes enjeux fondamentaux : latence, personnalisation de l'expérience, immersion et qualité vocale."
              : "GamiWays was not born from an abstract idea. It is the generalization of two functional prototypes, tested with real users, which each revealed the same fundamental challenges: latency, experience personalization, immersion and voice quality."}
          </p>
          {/* Two prototype badges */}
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono" style={{ borderColor: `${AVA_COLOR}40`, background: `${AVA_COLOR}0d`, color: AVA_COLOR }}>
              <Film size={12} />
              <span className="font-bold">Storygami</span>
              <span className="text-slate-400">·</span>
              <span>Parle à AVA!</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono" style={{ borderColor: `${DILEMME_COLOR}40`, background: `${DILEMME_COLOR}0d`, color: DILEMME_COLOR }}>
              <BookOpen size={12} />
              <span className="font-bold">Edugami</span>
              <span className="text-slate-400">·</span>
              <span>Le Dilemme Plastique</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl py-14 space-y-20">

        {/* ── INTRO: Why these two prototypes ──────────────────────────────── */}
        <section>
          <SectionDivider number="00" title="From Prototypes to Platform" titleFr="Des Prototypes à la Plateforme" isFr={isFr} />
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
                {isFr ? "Deux expériences, un moteur commun." : "Two experiences, one shared engine."}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-4" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? "Parle à AVA! et Le Dilemme Plastique sont deux expériences radicalement différentes en surface — l'une narrative et cinématique, l'autre pédagogique et scientifique. Pourtant, elles partagent exactement les mêmes défis techniques : pipeline STT→LLM→TTS, orchestration d'un agent conversationnel, gestion de la mémoire de session, latence perçue et qualité vocale en français."
                  : "Parle à AVA! and Le Dilemme Plastique are two radically different experiences on the surface — one narrative and cinematic, the other pedagogical and scientific. Yet they share exactly the same technical challenges: STT→LLM→TTS pipeline, conversational agent orchestration, session memory management, perceived latency and French voice quality."}
              </p>
              <p className="text-sm text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? "C'est cette convergence qui a donné naissance à GamiWays : une plateforme générique capable de porter à la fois l'expérience Storygami (cinéma interactif) et l'expérience Edugami (apprentissage guidé), en partageant le même moteur d'orchestration."
                  : "This convergence gave birth to GamiWays: a generic platform capable of supporting both the Storygami experience (interactive cinema) and the Edugami experience (guided learning), sharing the same orchestration engine."}
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: Zap, label: isFr ? "Latence & fluidité" : "Latency & fluidity", desc: isFr ? "Pipeline STT→LLM→TTS <2s" : "STT→LLM→TTS pipeline <2s" },
                { icon: Mic, label: isFr ? "Qualité vocale FR" : "French voice quality", desc: isFr ? "Naturalité, prosodie, immersion" : "Naturalness, prosody, immersion" },
                { icon: Clock, label: isFr ? "Mémoire de session" : "Session memory", desc: isFr ? "Continuité sans explosion tokens" : "Continuity without token explosion" },
                { icon: Video, label: isFr ? "Avatar expressif" : "Expressive avatar", desc: isFr ? "Synchronisation lip-sync + corps" : "Lip-sync + body language sync" },
              ].map((item) => (
                <div key={item.label} className="flex gap-2.5 p-3 border border-slate-200 rounded bg-white">
                  <item.icon size={14} className="shrink-0 mt-0.5" style={{ color: "oklch(0.55 0.20 200)" }} />
                  <div>
                    <div className="text-xs font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</div>
                    <div className="text-xs text-slate-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROTOTYPE 1: PARLE À AVA! ─────────────────────────────────────── */}
        <section>
          <SectionDivider number="01" title="Parle à AVA! — Storygami" titleFr="Parle à AVA! — Storygami" isFr={isFr} />

          {/* Header card */}
          <div className="border rounded-lg overflow-hidden mb-6" style={{ borderColor: `${AVA_COLOR}30` }}>
            <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4" style={{ background: `${AVA_COLOR}08`, borderBottom: `1px solid ${AVA_COLOR}20` }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Film size={16} style={{ color: AVA_COLOR }} />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider" style={{ color: AVA_COLOR }}>Storygami</span>
                  <span className="text-xs font-mono text-slate-400">·</span>
                  <span className="text-xs font-mono text-slate-400">{isFr ? "Cinéma interactif" : "Interactive cinema"}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
                  Parle à AVA!
                </h2>
                <p className="text-sm text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr ? "Prototype 1 — v0.20.1 — 32h de développement" : "Prototype 1 — v0.20.1 — 32h of development"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                <a
                  href="https://proto1.parle-a-ava.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-colors hover:opacity-80"
                  style={{ background: AVA_COLOR, color: "white" }}
                >
                  <ExternalLink size={11} />
                  {isFr ? "Tester le prototype" : "Try the prototype"}
                </a>
                <a
                  href="https://github.com/memoways/ava-proto1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono transition-colors hover:bg-slate-50"
                  style={{ borderColor: `${AVA_COLOR}40`, color: AVA_COLOR }}
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Concept */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Concept" : "Concept"}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr
                    ? "L'utilisateur entre dans l'univers du film dystopique \"Où est Ava ?\" de Romed Wyder et parle en visioconférence avec Max, un développeur de 28 ans dont la sœur Ava a disparu dans le contexte d'une pandémie mondiale. Un Game Master IA orchestre l'expérience en temps réel : il gère le niveau de confiance, déclenche des séquences vidéo et peut provoquer un game over. Le pipeline complet STT→LLM→TTS est enrichi par un système RAG qui ancre Max dans son univers narratif."
                    : "The user enters the dystopian film universe \"Where is Ava?\" by Romed Wyder and speaks via video call with Max, a 28-year-old developer whose sister Ava disappeared during a global pandemic. An AI Game Master orchestrates the experience in real time: it manages trust levels, triggers video sequences and can trigger a game over. The full STT→LLM→TTS pipeline is enriched by a RAG system that anchors Max in his narrative universe."}
                </p>
              </div>

              {/* UX Journey diagram */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Schéma 1 — Parcours utilisateur" : "Schema 1 — User journey"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <UXFlowDiagram color={AVA_COLOR} steps={[
                    { icon: Film, label: isFr ? "Arrivée sur l'app" : "App landing", sub: isFr ? "Onboarding A/B skippable" : "Skippable A/B onboarding" },
                    { icon: Video, label: isFr ? "Intro vidéo Gumlet" : "Gumlet video intro", sub: isFr ? "Cinématique + contexte" : "Cinematic + context" },
                    { icon: Mic, label: isFr ? "Appel entrant Max" : "Max incoming call", sub: isFr ? "Micro continu pause/resume" : "Continuous mic pause/resume" },
                    { icon: Zap, label: isFr ? "Conversation voice-to-voice" : "Voice-to-voice conversation", sub: isFr ? "Timer 10 min, Game Master actif" : "10 min timer, active Game Master" },
                    { icon: Video, label: isFr ? "Trigger vidéo" : "Video trigger", sub: isFr ? "Fade to black + contexte post-vidéo" : "Fade to black + post-video context" },
                    { icon: User, label: isFr ? "Gate de confiance" : "Trust gate", sub: isFr ? "Max propose Léo / Emma" : "Max introduces Léo / Emma" },
                    { icon: Database, label: isFr ? "Questionnaire final" : "Final questionnaire", sub: isFr ? "~50 champs, 8 blocs" : "~50 fields, 8 blocks" },
                  ]} />
                  <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? "Mécaniques Game Master" : "Game Master mechanics"}
                    </div>
                    {[
                      { label: "trust_delta", desc: isFr ? "Variation de confiance par tour" : "Trust variation per turn" },
                      { label: "trigger_video", desc: isFr ? "Déclenchement séquences vidéo" : "Video sequence trigger" },
                      { label: "game_over", desc: isFr ? "Insulte / hors-cadre / timeout" : "Insult / off-topic / timeout" },
                      { label: "gate", desc: isFr ? "Seuil de confiance atteint" : "Trust threshold reached" },
                      { label: "moderation", desc: isFr ? "Filtre contenu sensible" : "Sensitive content filter" },
                    ].map((m, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0" style={{ background: `${AVA_COLOR}15`, color: AVA_COLOR }}>{m.label}</span>
                        <span className="text-xs text-slate-500">{m.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Architecture diagram */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Schéma 2 — Architecture technique" : "Schema 2 — Technical architecture"}
                </h3>
                <ArchDiagram color={AVA_COLOR} layers={[
                  {
                    title: isFr ? "Interface (React + Lovable)" : "Interface (React + Lovable)",
                    items: [
                      { name: "Push-to-Talk", tech: "Web Audio API" },
                      { name: "Player vidéo", tech: "Gumlet iframe" },
                      { name: "Debug Panel", tech: "?debug URL" },
                      { name: "Admin /admin", tech: "Sessions + prompts" },
                    ]
                  },
                  {
                    title: isFr ? "Backend (Supabase Edge Functions)" : "Backend (Supabase Edge Functions)",
                    items: [
                      { name: "proxy-llm", tech: "OpenRouter" },
                      { name: "proxy-stt", tech: "Deepgram" },
                      { name: "proxy-tts", tech: "ElevenLabs" },
                      { name: "query-rag", tech: "pgvector HNSW" },
                      { name: "rewrite-query", tech: "Gemini Flash" },
                      { name: "summarize-session", tech: "LLM fire-and-forget" },
                    ]
                  },
                  {
                    title: isFr ? "IA & Données (Supabase PostgreSQL)" : "AI & Data (Supabase PostgreSQL)",
                    items: [
                      { name: "RAG", tech: "Voyage AI + pgvector" },
                      { name: "LLM", tech: "OpenRouter multi-modèles" },
                      { name: "Embeddings", tech: "voyage-3 + OpenAI" },
                      { name: "Mémoire", tech: "session_summaries" },
                    ]
                  },
                ]} />
              </div>

              {/* Pipeline diagram */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Schéma 3 — Pipeline conversationnel (8 étapes)" : "Schema 3 — Conversational pipeline (8 steps)"}
                </h3>
                <PipelineFlow
                  color={AVA_COLOR}
                  steps={[
                    { label: "Push-to-Talk", sub: "Deepgram" },
                    { label: "STT", sub: "Deepgram live" },
                    { label: "Query Rewrite", sub: "Gemini Flash" },
                    { label: "RAG", sub: "Voyage AI + pgvector" },
                    { label: "Game Master", sub: "LLM async" },
                    { label: "Max LLM", sub: "OpenRouter" },
                    { label: "Validator", sub: "Anti-hallucination" },
                    { label: "TTS", sub: "ElevenLabs" },
                  ]}
                />
                <p className="text-xs text-slate-400 mt-2 italic" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr
                    ? "Game Master et Max LLM sont parallélisés via Promise.all — gain de 2 à 5s par tour de conversation."
                    : "Game Master and Max LLM are parallelized via Promise.all — saving 2 to 5s per conversation turn."}
                </p>
              </div>

              {/* Metrics */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Métriques clés" : "Key metrics"}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <MetricCard value="v0.20.1" label={isFr ? "Version actuelle" : "Current version"} color={AVA_COLOR} />
                  <MetricCard value="21" label={isFr ? "Versions livrées" : "Versions delivered"} color={AVA_COLOR} />
                  <MetricCard value="32h" label={isFr ? "Temps de développement" : "Development time"} color={AVA_COLOR} />
                  <MetricCard value="8+" label={isFr ? "Modèles LLM supportés" : "LLM models supported"} color={AVA_COLOR} />
                </div>
              </div>

              {/* User journey */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Parcours utilisateur" : "User journey"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    isFr ? "Onboarding A/B" : "A/B Onboarding",
                    isFr ? "Intro vidéo Gumlet" : "Gumlet video intro",
                    isFr ? "Appel entrant Max" : "Max incoming call",
                    isFr ? "Conversation voice-to-voice" : "Voice-to-voice conversation",
                    isFr ? "Triggers vidéo dynamiques" : "Dynamic video triggers",
                    isFr ? "Gate de confiance" : "Trust gate",
                    isFr ? "Questionnaire ~50 champs" : "~50-field questionnaire",
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: `${AVA_COLOR}10`, color: AVA_COLOR, fontFamily: "'Space Grotesk', sans-serif" }}>
                        {step}
                      </span>
                      {i < 6 && <ArrowRight size={10} style={{ color: `${AVA_COLOR}50` }} />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools used — AVA */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Outils utilisés" : "Tools used"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { tool: "Lovable", role: isFr ? "Vibe coding principal — 17 sessions" : "Main vibe coding — 17 sessions" },
                    { tool: "Supabase", role: isFr ? "Edge Functions + PostgreSQL + pgvector" : "Edge Functions + PostgreSQL + pgvector" },
                    { tool: "OpenRouter", role: isFr ? "LLM multi-modèles (Qwen, Claude, GPT-5, Gemini, Grok)" : "Multi-model LLM (Qwen, Claude, GPT-5, Gemini, Grok)" },
                    { tool: "Deepgram", role: isFr ? "STT live nova-2 FR — Push-to-Talk" : "Live STT nova-2 FR — Push-to-Talk" },
                    { tool: "ElevenLabs", role: isFr ? "TTS eleven_multilingual_v2 — voix Max" : "TTS eleven_multilingual_v2 — Max voice" },
                    { tool: "Voyage AI", role: isFr ? "Embeddings voyage-3 + reranker rerank-2.5" : "voyage-3 embeddings + rerank-2.5" },
                    { tool: "PostHog", role: isFr ? "Analytics session recording" : "Session recording analytics" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col px-3 py-2 rounded border bg-white" style={{ borderColor: `${AVA_COLOR}20` }}>
                      <span className="text-xs font-bold" style={{ color: AVA_COLOR, fontFamily: "'Space Grotesk', sans-serif" }}>{item.tool}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5 max-w-[160px]">{item.role}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-3 p-3 rounded bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? "Temps de développement" : "Development time"}
                  </div>
                  <div className="text-sm font-black font-mono" style={{ color: AVA_COLOR }}>32h</div>
                  <div className="text-xs text-slate-400">—</div>
                  <div className="text-xs text-slate-500">
                    {isFr ? "Le suivi des coûts LLM est automatique via openRouterLLM.ts — tokens input/output + coût USD enregistrés par session dans le dashboard admin." : "LLM cost tracking is automatic via openRouterLLM.ts — input/output tokens + USD cost recorded per session in the admin dashboard."}
                  </div>
                </div>
              </div>

              {/* Key learnings accordion */}
              <Accordion label="Key technical learnings" labelFr="Enseignements techniques clés" isFr={isFr}>
                <div className="pt-3 space-y-2">
                  {[
                    {
                      en: "Vibe coding with Lovable: complete voice-to-voice prototype in ~2 days with a detailed PRD as initial prompt.",
                      fr: "Vibe coding avec Lovable : prototype voice-to-voice complet en ~2 jours avec un PRD détaillé comme prompt initial.",
                    },
                    {
                      en: "Supabase Edge Functions as API proxy: zero exposed keys client-side, ideal for production prototypes.",
                      fr: "Edge Functions Supabase comme proxy API : zéro clé exposée côté client, idéal pour les prototypes en production.",
                    },
                    {
                      en: "GM + Max parallelization via Promise.all: 2–5s latency reduction per turn — critical for voice-to-voice fluidity.",
                      fr: "Parallélisation GM + Max via Promise.all : réduction de 2 à 5s de latence par tour — critique pour la fluidité voice-to-voice.",
                    },
                    {
                      en: "Voyage rerank-2.5 after cosine retrieval: relevant chunk goes from 0.47 (cosine) to 0.81 (rerank) — significant quality gain.",
                      fr: "Voyage rerank-2.5 après retrieval cosinus : un chunk pertinent passe de 0.47 (cosine) à 0.81 (rerank) — gain de qualité significatif.",
                    },
                    {
                      en: "Query rewriting LLM before RAG: ambiguous queries like 'and you?' become autonomous queries based on history — major relevance improvement.",
                      fr: "Query rewriting LLM avant RAG : les requêtes ambiguës comme « et toi ? » deviennent des requêtes autonomes basées sur l'historique — impact majeur sur la pertinence.",
                    },
                    {
                      en: "Fail-open anti-hallucination validator (4s timeout): better to let a response through than silently block the experience.",
                      fr: "Validateur anti-hallucination fail-open (timeout 4s) : mieux vaut laisser passer une réponse que bloquer silencieusement l'expérience.",
                    },
                  ].map((l, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-xs shrink-0 mt-0.5" style={{ color: AVA_COLOR }}>→</span>
                      <span className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{isFr ? l.fr : l.en}</span>
                    </div>
                  ))}
                </div>
              </Accordion>

              {/* Cross-links */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Enjeux techniques → solutions documentées" : "Technical challenges → documented solutions"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <CrossLink
                    href="/voice/tts"
                    icon={Mic}
                    title="TTS & Voice Synthesis"
                    titleFr="TTS & Synthèse Vocale"
                    desc="ElevenLabs vs 15 alternatives — quality, latency, French naturalness. AVA uses ElevenLabs eleven_multilingual_v2."
                    descFr="ElevenLabs vs 15 alternatives — qualité, latence, naturalité française. AVA utilise ElevenLabs eleven_multilingual_v2."
                    color={AVA_COLOR}
                    isFr={isFr}
                  />
                  <CrossLink
                    href="/avatars"
                    icon={Video}
                    title="Streaming Video Avatars"
                    titleFr="Avatars Vidéo Streaming"
                    desc="Real-time avatar platforms — lip-sync, body language, latency. AVA's next step: photorealistic avatar of Max."
                    descFr="Plateformes d'avatars temps réel — lip-sync, langage corporel, latence. Prochaine étape d'AVA : avatar photoréaliste de Max."
                    color={AVA_COLOR}
                    isFr={isFr}
                  />
                  <CrossLink
                    href="/voice/benchmarks"
                    icon={Zap}
                    title="Audio Synthesis Benchmarks"
                    titleFr="Benchmarks Synthèse Audio"
                    desc="ELO rankings, TTFA, latency budgets — the metrics that define AVA's voice pipeline performance."
                    descFr="Classements ELO, TTFA, budgets latence — les métriques qui définissent la performance du pipeline vocal d'AVA."
                    color={AVA_COLOR}
                    isFr={isFr}
                  />
                  <CrossLink
                    href="/research/architecture"
                    icon={Zap}
                    title="Target Architecture"
                    titleFr="Architecture Cible"
                    desc="Context Engine v2, Memory System, Game Master — the GamiWays generalization of AVA's pipeline."
                    descFr="Context Engine v2, Memory System, Game Master — la généralisation GamiWays du pipeline d'AVA."
                    color={AVA_COLOR}
                    isFr={isFr}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROTOTYPE 2: LE DILEMME PLASTIQUE ────────────────────────────── */}
        <section>
          <SectionDivider number="02" title="Le Dilemme Plastique — Edugami" titleFr="Le Dilemme Plastique — Edugami" isFr={isFr} />

          {/* Header card */}
          <div className="border rounded-lg overflow-hidden mb-6" style={{ borderColor: `${DILEMME_COLOR}30` }}>
            <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4" style={{ background: `${DILEMME_COLOR}08`, borderBottom: `1px solid ${DILEMME_COLOR}20` }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={16} style={{ color: DILEMME_COLOR }} />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider" style={{ color: DILEMME_COLOR }}>Edugami</span>
                  <span className="text-xs font-mono text-slate-400">·</span>
                  <span className="text-xs font-mono text-slate-400">{isFr ? "Éducation voice-first" : "Voice-first education"}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
                  Le Dilemme Plastique
                </h2>
                <p className="text-sm text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr ? "2 prototypes — 70h de développement — ~380 CHF" : "2 prototypes — 70h of development — ~380 CHF"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                <a
                  href="https://proto-dilemme2.edugami.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-colors hover:opacity-80"
                  style={{ background: DILEMME_COLOR, color: "white" }}
                >
                  <ExternalLink size={11} />
                  {isFr ? "Prototype tutoriel" : "Tutorial prototype"}
                </a>
                <a
                  href="https://dilemme-proto.replit.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono transition-colors hover:bg-slate-50"
                  style={{ borderColor: `${DILEMME_COLOR}40`, color: DILEMME_COLOR }}
                >
                  <ExternalLink size={11} />
                  {isFr ? "Prototype Flowise" : "Flowise prototype"}
                </a>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Two sub-prototypes */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Deux approches, un même défi pédagogique" : "Two approaches, one pedagogical challenge"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Tutoriel Light */}
                  <div className="border border-slate-200 rounded-lg p-4 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold font-mono px-2 py-0.5 rounded" style={{ color: DILEMME_COLOR, background: `${DILEMME_COLOR}12` }}>Light / Tutoriel</span>
                      <span className="text-xs text-slate-400 font-mono">v2.6.0</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {isFr
                        ? "Peter guide des élèves de 12–18 ans dans l'analyse d'une image de la Place des Nations à Genève pour découvrir 6 indices cachés. Sessions ≤5 min, 24+ simultanées. Pipeline : Deepgram live → OpenAI Assistants API → ElevenLabs."
                        : "Peter guides 12–18 year-old students through the analysis of an image of the Place des Nations in Geneva to discover 6 hidden clues. Sessions ≤5 min, 24+ simultaneous. Pipeline: Deepgram live → OpenAI Assistants API → ElevenLabs."}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <MetricCard value="25h" label={isFr ? "Dev" : "Dev"} color={DILEMME_COLOR} />
                      <MetricCard value="~220 CHF" label={isFr ? "Coût" : "Cost"} color={DILEMME_COLOR} />
                    </div>
                  </div>
                  {/* Flowise */}
                  <div className="border border-slate-200 rounded-lg p-4 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold font-mono px-2 py-0.5 rounded" style={{ color: DILEMME_COLOR, background: `${DILEMME_COLOR}12` }}>Flowise / Complet</span>
                      <span className="text-xs text-slate-400 font-mono">live</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {isFr
                        ? "Interface split-screen : chat Peter (gauche) + panneau média (droite). Peter orchestré via Flowise (28 nœuds). Sessions 20–30 min, sans compte. Inclut vidéos, articles intégrés, persistance Postgres, console admin, analytics PostHog."
                        : "Split-screen interface: Peter chat (left) + media panel (right). Peter orchestrated via Flowise (28 nodes). 20–30 min sessions, no account. Includes videos, embedded articles, Postgres persistence, admin console, PostHog analytics."}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <MetricCard value="45h" label={isFr ? "Dev" : "Dev"} color={DILEMME_COLOR} />
                      <MetricCard value="~160 CHF" label={isFr ? "Coût" : "Cost"} color={DILEMME_COLOR} />
                    </div>
                  </div>
                </div>
              </div>

              {/* UX Journey — Dilemme */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Schéma 1 — Parcours pédagogique de l'élève" : "Schema 1 — Student pedagogical journey"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <UXFlowDiagram color={DILEMME_COLOR} steps={[
                    { icon: User, label: isFr ? "Écran titre" : "Title screen", sub: isFr ? "Entrée sans friction" : "Frictionless entry" },
                    { icon: Video, label: isFr ? "Vidéo d'introduction" : "Introduction video", sub: isFr ? "Playlist adaptative desktop/mobile" : "Adaptive desktop/mobile playlist" },
                    { icon: Cpu, label: isFr ? "Configuration" : "Configuration", sub: isFr ? "Prénom + déverrouillage audio + session" : "Name + audio unlock + session" },
                    { icon: Mic, label: isFr ? "Tutoriel conversationnel" : "Conversational tutorial", sub: isFr ? "Image analysée avec Peter, 6 indices, max 8 échanges" : "Image analyzed with Peter, 6 clues, max 8 exchanges" },
                    { icon: Zap, label: isFr ? "Jeu de reconstruction" : "Reconstruction game", sub: isFr ? "Drag-and-drop des indices trouvés" : "Drag-and-drop of found clues" },
                    { icon: BookOpen, label: isFr ? "Synthèse" : "Synthesis", sub: isFr ? "L'élève formule sa compréhension" : "Student formulates understanding" },
                    { icon: Database, label: isFr ? "Feedback + sauvegarde" : "Feedback + save", sub: isFr ? "PostgreSQL + Google Sheets + PostHog" : "PostgreSQL + Google Sheets + PostHog" },
                  ]} />
                  <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? "Logique pédagogique de Peter" : "Peter's pedagogical logic"}
                    </div>
                    {[
                      { label: isFr ? "Guidage socratique" : "Socratic guidance", desc: isFr ? "Questions ouvertes, jamais de réponses directes" : "Open questions, never direct answers" },
                      { label: isFr ? "Source de vérité serveur" : "Server-side truth", desc: isFr ? "additional_instructions OpenAI, pas l'historique" : "OpenAI additional_instructions, not history" },
                      { label: isFr ? "Prompt v3 versionné" : "Versioned prompt v3", desc: isFr ? "docs/prompts/peter-assistant.md" : "docs/prompts/peter-assistant.md" },
                      { label: isFr ? "Reprise instantanée" : "Instant resume", desc: isFr ? "Message pré-généré en 150–500ms" : "Pre-generated message in 150–500ms" },
                    ].map((m, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap" style={{ background: `${DILEMME_COLOR}15`, color: DILEMME_COLOR }}>{m.label}</span>
                        <span className="text-xs text-slate-500">{m.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Architecture diagram — Dilemme */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Schéma 2 — Architecture produit end-to-end" : "Schema 2 — End-to-end product architecture"}
                </h3>
                <ArchDiagram color={DILEMME_COLOR} layers={[
                  {
                    title: isFr ? "Interface élève (React + Vite)" : "Student interface (React + Vite)",
                    items: [
                      { name: "Chat Peter", tech: "shadcn/ui + Framer Motion" },
                      { name: "Panneau média", tech: "Gumlet / YouTube / WebView" },
                      { name: "Micro + waveform", tech: "Web Audio API + Canvas" },
                      { name: "Avatar élève", tech: "Grille de vignettes" },
                    ]
                  },
                  {
                    title: isFr ? "Backend (Express.js + Node)" : "Backend (Express.js + Node)",
                    items: [
                      { name: "Proxy Flowise SSE", tech: "Anti-JSON 3 couches" },
                      { name: "/api/tts", tech: "ElevenLabs + cache LRU" },
                      { name: "/api/transcribe", tech: "Whisper / Scribe" },
                      { name: "/api/sessions", tech: "PostgreSQL / Neon" },
                      { name: "/api/debug", tech: "Traces persistées" },
                    ]
                  },
                  {
                    title: isFr ? "Services IA (Flowise self-hosted)" : "AI Services (self-hosted Flowise)",
                    items: [
                      { name: "Flowise", tech: "28 nœuds, 15 chemin max" },
                      { name: "ElevenLabs", tech: "TTS + STT Scribe" },
                      { name: "OpenAI", tech: "GPT-4o Assistants API" },
                      { name: "Deepgram", tech: "Live transcription WS" },
                    ]
                  },
                  {
                    title: isFr ? "Données & Observabilité" : "Data & Observability",
                    items: [
                      { name: "PostgreSQL / Neon", tech: "Sessions + messages" },
                      { name: "PostHog", tech: "Analytics client + serveur" },
                      { name: "Google Sheets", tech: "Export via Replit Connectors" },
                      { name: "Rectify", tech: "Session recording" },
                    ]
                  },
                ]} />
              </div>

              {/* Pipeline diagram — Light */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Schéma 3 — Pipeline technique — Prototype Light" : "Schema 3 — Technical pipeline — Light prototype"}
                </h3>
                <PipelineFlow
                  color={DILEMME_COLOR}
                  steps={[
                    { label: "Micro élève", sub: "Web Audio API" },
                    { label: "STT live", sub: "Deepgram nova-2" },
                    { label: "STT final", sub: "OpenAI Whisper" },
                    { label: "Peter LLM", sub: "GPT-4o Assistants" },
                    { label: "Contexte jeu", sub: "additional_instructions" },
                    { label: "TTS", sub: "ElevenLabs" },
                    { label: "Reprise", sub: "pré-générée 150ms" },
                  ]}
                />
                <p className="text-xs text-slate-400 mt-2 italic" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr
                    ? "L'état du jeu (indices trouvés, numéro d'échange) est injecté via additional_instructions — jamais dans l'historique du thread. Source de vérité serveur."
                    : "Game state (found clues, exchange number) is injected via additional_instructions — never in the thread history. Server-side source of truth."}
                </p>
              </div>

              {/* Pipeline diagram — Flowise */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Schéma 4 — Pipeline technique — Prototype Flowise" : "Schema 4 — Technical pipeline — Flowise prototype"}
                </h3>
                <PipelineFlow
                  color={DILEMME_COLOR}
                  steps={[
                    { label: "STT", sub: "ElevenLabs Scribe" },
                    { label: "Flowise", sub: "28 nœuds" },
                    { label: "Peter LLM", sub: "GPT-4o" },
                    { label: "TTS phrase", sub: "ElevenLabs" },
                    { label: "Cache LRU", sub: "hit ~40ms" },
                    { label: "Panneau média", sub: "Gumlet / YouTube" },
                  ]}
                />
                <p className="text-xs text-slate-400 mt-2 italic" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr
                    ? "TTS par phrase + cache LRU : premier audio de bienvenue pré-warmé à ~40ms. Baseline 30s → objectif <8s après optimisations."
                    : "Per-sentence TTS + LRU cache: first welcome audio pre-warmed to ~40ms. Baseline 30s → target <8s after optimizations."}
                </p>
              </div>

              {/* Latency — measured values from repo changelogs only */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Optimisations de latence — valeurs mesurées" : "Latency optimisations — measured values"}
                </h3>
                <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                  {/* Only values explicitly marked as measured in CHANGELOG */}
                  <div className="space-y-2">
                    {[
                      {
                        label: isFr ? "TTS hit (cache LRU) — Light & Flowise" : "TTS hit (LRU cache) — Light & Flowise",
                        value: "~40 ms",
                        note: isFr ? "Mesuré en local (CHANGELOG v1.2.0 Light + Flowise)" : "Measured locally (CHANGELOG v1.2.0 Light + Flowise)",
                      },
                      {
                        label: isFr ? "TTS welcome pré-chauffé — Flowise" : "Pre-warmed welcome TTS — Flowise",
                        value: "2 569 ms → ~40 ms",
                        note: isFr ? "Mesuré au boot serveur — payé une fois pour tous les élèves (CHANGELOG Flowise)" : "Measured at server boot — paid once for all students (Flowise CHANGELOG)",
                      },
                      {
                        label: isFr ? "Reprise de session pré-générée — Light" : "Pre-generated session resume — Light",
                        value: "150–500 ms",
                        note: isFr ? "Au lieu de 3–5s — mesuré (CHANGELOG Light)" : "Instead of 3–5s — measured (Light CHANGELOG)",
                      },
                    ].map((item, i) => (
                      <div key={i} className="rounded border border-slate-200 bg-white px-3 py-2">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-xs font-medium text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</span>
                          <span className="text-xs font-bold font-mono" style={{ color: DILEMME_COLOR }}>{item.value}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 italic" style={{ fontFamily: "'Source Serif 4', serif" }}>{item.note}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 italic border-t border-slate-200 pt-3" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {isFr
                      ? "Les gains globaux (Phase 1 + 2 : -40 à -55% de latence totale) sont des estimations de conception documentées dans le CHANGELOG v1.2.0, non des mesures PostHog. Le dashboard de latence AVA (admin) collecte des données réelles par session mais aucune valeur agrégée n'est publiée dans le repo."
                      : "Overall gains (Phase 1 + 2: -40 to -55% total latency) are design estimates documented in CHANGELOG v1.2.0, not PostHog measurements. The AVA latency dashboard (admin) collects real per-session data but no aggregated values are published in the repo."}
                  </p>
                </div>
              </div>

              {/* Tools + costs — Dilemme (totaux Notion uniquement, pas d'estimations détaillées) */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Outils utilisés et coûts de développement" : "Tools used and development costs"}
                </h3>
                <div className="space-y-4">

                  {/* Light / Tutoriel — total Notion uniquement */}
                  <div className="border border-slate-200 rounded overflow-hidden">
                    <div className="px-4 py-2 flex items-center gap-2" style={{ borderLeft: `3px solid ${DILEMME_COLOR}`, background: `${DILEMME_COLOR}08` }}>
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: DILEMME_COLOR, fontFamily: "'Space Grotesk', sans-serif" }}>
                        {isFr ? "Prototype Light / Tutoriel" : "Light / Tutorial Prototype"}
                      </span>
                    </div>
                    <div className="p-4 flex flex-wrap gap-4 items-center">
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-xl font-black font-mono" style={{ color: DILEMME_COLOR }}>25h</div>
                          <div className="text-xs text-slate-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{isFr ? "Développement" : "Development"}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-black font-mono" style={{ color: DILEMME_COLOR }}>~220 CHF</div>
                          <div className="text-xs text-slate-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{isFr ? "Coût total" : "Total cost"}</div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                          {isFr
                            ? "Outils : Replit Agent (vibe coding + hébergement), Claude Code, OpenAI GPT-4o Assistants API + Whisper, ElevenLabs TTS."
                            : "Tools: Replit Agent (vibe coding + hosting), Claude Code, OpenAI GPT-4o Assistants API + Whisper, ElevenLabs TTS."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Flowise — données exactes Notion */}
                  <div className="rounded-lg border overflow-hidden" style={{ borderColor: `${DILEMME_COLOR}25` }}>
                    <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider" style={{ background: `${DILEMME_COLOR}10`, color: DILEMME_COLOR, fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? "Prototype Flowise / Complet — 45h — 160 CHF" : "Flowise / Full prototype — 45h — 160 CHF"}
                    </div>
                    <div className="flex flex-wrap gap-2 p-3">
                      {[
                        { tool: "Replit Agent", role: isFr ? "Développement principal + hébergement" : "Main development + hosting" },
                        { tool: "Flowise", role: isFr ? "Orchestration Peter — 28 nœuds (self-hosted Memoways)" : "Peter orchestration — 28 nodes (Memoways self-hosted)" },
                        { tool: "OpenAI", role: isFr ? "GPT-4o via Flowise — conversations Peter" : "GPT-4o via Flowise — Peter conversations" },
                        { tool: "ElevenLabs", role: isFr ? "TTS par phrase + STT Scribe (WER 2.11%)" : "Per-sentence TTS + Scribe STT (WER 2.11%)" },
                        { tool: "Deepgram", role: isFr ? "Transcription live non définitive (feedback visuel)" : "Non-final live transcription (visual feedback)" },
                        { tool: "PostHog + Rectify", role: isFr ? "Analytics produit + session recording" : "Product analytics + session recording" },
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col px-3 py-2 rounded border bg-white" style={{ borderColor: `${DILEMME_COLOR}20` }}>
                          <span className="text-xs font-bold" style={{ color: DILEMME_COLOR, fontFamily: "'Space Grotesk', sans-serif" }}>{item.tool}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5 max-w-[180px]">{item.role}</span>
                        </div>
                      ))}
                    </div>
                    <div className="px-3 pb-3">
                      <div className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-100">
                        <span className="text-xs font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Total</span>
                        <span className="text-sm font-black font-mono" style={{ color: DILEMME_COLOR }}>160 CHF</span>
                        <span className="text-xs text-slate-400">— 45h</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Key learnings accordion */}
              <Accordion label="Key technical learnings" labelFr="Enseignements techniques clés" isFr={isFr}>
                <div className="pt-3 space-y-2">
                  {[
                    {
                      en: "Never use AI conversation history as game state source of truth — inject state via additional_instructions (OpenAI) or equivalent.",
                      fr: "Ne jamais utiliser l'historique IA comme source de vérité d'un jeu — injecter l'état via additional_instructions (OpenAI) ou équivalent.",
                    },
                    {
                      en: "Instrument before interpreting: PostHog client + server dashboards revealed that perceived latency problems were actually UX problems (missing micro-feedback).",
                      fr: "Instrumenter avant d'interpréter : les dashboards PostHog client + serveur ont révélé que les problèmes de latence perçue étaient en réalité des problèmes UX (micro-feedbacks manquants).",
                    },
                    {
                      en: "ElevenLabs Scribe STT: WER 2.11% vs 6.45% for OpenAI Whisper on French — decisive quality difference for classroom use.",
                      fr: "ElevenLabs Scribe STT : WER 2.11% vs 6.45% pour OpenAI Whisper en français — différence de qualité décisive pour un usage en classe.",
                    },
                    {
                      en: "Flowise chatflow audit (28 nodes, longest path 15 nodes): complexity is the main latency bottleneck — simplification is a priority.",
                      fr: "Audit du chatflow Flowise (28 nœuds, chemin le plus long 15 nœuds) : la complexité est le principal goulot d'étranglement de latence — la simplification est une priorité.",
                    },
                    {
                      en: "Pre-generated resume message: 150–500ms instead of 3–7s for the return to session — perceived continuity is as important as real latency.",
                      fr: "Message de reprise pré-généré : 150–500ms au lieu de 3–7s pour le retour en session — la continuité perçue est aussi importante que la latence réelle.",
                    },
                  ].map((l, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-xs shrink-0 mt-0.5" style={{ color: DILEMME_COLOR }}>→</span>
                      <span className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{isFr ? l.fr : l.en}</span>
                    </div>
                  ))}
                </div>
              </Accordion>

              {/* Cross-links */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Enjeux techniques → solutions documentées" : "Technical challenges → documented solutions"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <CrossLink
                    href="/voice/stt"
                    icon={Mic}
                    title="STT / Speech-to-Text"
                    titleFr="STT / Reconnaissance Vocale"
                    desc="ElevenLabs Scribe vs Deepgram vs Whisper — WER, latency, French accuracy. Dilemme uses Scribe (WER 2.11%)."
                    descFr="ElevenLabs Scribe vs Deepgram vs Whisper — WER, latence, précision française. Dilemme utilise Scribe (WER 2.11%)."
                    color={DILEMME_COLOR}
                    isFr={isFr}
                  />
                  <CrossLink
                    href="/voice/tts"
                    icon={Mic}
                    title="TTS & Voice Synthesis"
                    titleFr="TTS & Synthèse Vocale"
                    desc="ElevenLabs eleven_multilingual_v2 — 1507ms avg vs 2373ms OpenAI. Cache LRU strategy for classroom use."
                    descFr="ElevenLabs eleven_multilingual_v2 — 1507ms moy vs 2373ms OpenAI. Stratégie cache LRU pour usage en classe."
                    color={DILEMME_COLOR}
                    isFr={isFr}
                  />
                  <CrossLink
                    href="/voice/pipeline"
                    icon={Zap}
                    title="Voice-to-Voice Pipeline"
                    titleFr="Pipeline Vocal Voice-to-Voice"
                    desc="Interactive V2V diagram — visualize the full pipeline latency budget as used in both Dilemme prototypes."
                    descFr="Diagramme V2V interactif — visualiser le budget latence complet du pipeline tel qu'utilisé dans les deux prototypes Dilemme."
                    color={DILEMME_COLOR}
                    isFr={isFr}
                  />
                  <CrossLink
                    href="/research/gaps"
                    icon={Zap}
                    title="Opportunities & Gaps"
                    titleFr="Opportunités & Lacunes"
                    desc="Flowise orchestration limits, LLM latency, STT accuracy on children's voices — gaps that GamiWays addresses."
                    descFr="Limites de l'orchestration Flowise, latence LLM, précision STT sur voix d'enfants — lacunes que GamiWays adresse."
                    color={DILEMME_COLOR}
                    isFr={isFr}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: CONVERGENCE → GAMIWAYS ───────────────────────────── */}
        <section>
          <SectionDivider number="03" title="Convergence → GamiWays" titleFr="Convergence → GamiWays" isFr={isFr} />
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Les mêmes défis, une seule réponse." : "The same challenges, one answer."}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Malgré des contextes d'usage radicalement différents, les deux prototypes ont convergé vers les mêmes besoins non satisfaits. Cette convergence est la justification technique et stratégique de GamiWays."
                : "Despite radically different use contexts, both prototypes converged on the same unmet needs. This convergence is the technical and strategic justification for GamiWays."}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{isFr ? "Défi" : "Challenge"}</th>
                  <th>{isFr ? "AVA (Storygami)" : "AVA (Storygami)"}</th>
                  <th>{isFr ? "Dilemme (Edugami)" : "Dilemme (Edugami)"}</th>
                  <th>{isFr ? "Solution GamiWays" : "GamiWays solution"}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    challenge: isFr ? "Latence pipeline" : "Pipeline latency",
                    ava: isFr ? "Parallélisation GM+Max, fail-open validator" : "GM+Max parallelization, fail-open validator",
                    dilemme: isFr ? "Cache LRU TTS, reprise pré-générée, Deepgram live" : "TTS LRU cache, pre-generated resume, Deepgram live",
                    gamiways: isFr ? "Runtime State + SSE, budget latence <2s par couche" : "Runtime State + SSE, <2s latency budget per layer",
                  },
                  {
                    challenge: isFr ? "Mémoire de session" : "Session memory",
                    ava: isFr ? "summarize-session (Faits/Sujets/Promesses, tous les 4 tours)" : "summarize-session (Facts/Topics/Promises, every 4 turns)",
                    dilemme: isFr ? "additional_instructions comme source de vérité" : "additional_instructions as source of truth",
                    gamiways: isFr ? "Memory System v2 — épisodique + sémantique + procédural" : "Memory System v2 — episodic + semantic + procedural",
                  },
                  {
                    challenge: isFr ? "Qualité vocale FR" : "French voice quality",
                    ava: isFr ? "ElevenLabs stability 0.6, speed 0.92 — preset 'Claire et articulé'" : "ElevenLabs stability 0.6, speed 0.92 — 'Clear & articulate' preset",
                    dilemme: isFr ? "ElevenLabs Scribe STT WER 2.11% — TTS eleven_multilingual_v2" : "ElevenLabs Scribe STT WER 2.11% — TTS eleven_multilingual_v2",
                    gamiways: isFr ? "Voice Pipeline documenté — 17 TTS + 10 STT comparés" : "Documented Voice Pipeline — 17 TTS + 10 STT compared",
                  },
                  {
                    challenge: isFr ? "Orchestration agent" : "Agent orchestration",
                    ava: isFr ? "Game Master autonome (trust, triggers, game over)" : "Autonomous Game Master (trust, triggers, game over)",
                    dilemme: isFr ? "Flowise 28 nœuds — complexité = goulot d'étranglement" : "Flowise 28 nodes — complexity = bottleneck",
                    gamiways: isFr ? "Context Engine v2 — 7 dimensions, Game Master headless" : "Context Engine v2 — 7 dimensions, headless Game Master",
                  },
                  {
                    challenge: isFr ? "Avatar expressif" : "Expressive avatar",
                    ava: isFr ? "Vidéo Gumlet + triggers dynamiques (R&D)" : "Gumlet video + dynamic triggers (R&D)",
                    dilemme: isFr ? "Avatar élève (vignette) — Peter sans avatar vidéo" : "Student avatar (thumbnail) — Peter without video avatar",
                    gamiways: isFr ? "Epic C.1 — Expressive Avatar Integration (Phase C)" : "Epic C.1 — Expressive Avatar Integration (Phase C)",
                  },
                  {
                    challenge: isFr ? "Souveraineté données" : "Data sovereignty",
                    ava: isFr ? "Supabase Edge Functions — clés côté serveur" : "Supabase Edge Functions — server-side keys",
                    dilemme: isFr ? "Replit + Neon Postgres — données en classe" : "Replit + Neon Postgres — classroom data",
                    gamiways: isFr ? "Architecture LLM-agnostic, Exoscale Swiss GPU cloud" : "LLM-agnostic architecture, Exoscale Swiss GPU cloud",
                  },
                ].map((row) => (
                  <tr key={row.challenge}>
                    <td className="font-semibold text-slate-800">{row.challenge}</td>
                    <td className="text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>{row.ava}</td>
                    <td className="text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>{row.dilemme}</td>
                    <td className="font-medium" style={{ color: "oklch(0.45 0.18 200)" }}>{row.gamiways}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA to project page */}
          <div className="mt-8 p-5 rounded-lg border" style={{ borderColor: "oklch(0.55 0.20 200)30", background: "oklch(0.97 0.02 200)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "De ces deux prototypes est né GamiWays." : "From these two prototypes, GamiWays was born."}
                </div>
                <p className="text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr
                    ? "Découvrez la vision produit, l'architecture cible et l'état d'avancement du Core Engine."
                    : "Discover the product vision, target architecture and Core Engine build status."}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/project">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-mono font-bold cursor-pointer transition-colors hover:opacity-80" style={{ background: "oklch(0.55 0.20 200)", color: "white" }}>
                    {isFr ? "Projet GamiWays" : "GamiWays Project"}
                    <ArrowRight size={12} />
                  </span>
                </Link>
                <Link href="/project/status">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded border text-xs font-mono cursor-pointer transition-colors hover:bg-white" style={{ borderColor: "oklch(0.55 0.20 200)40", color: "oklch(0.45 0.18 200)" }}>
                    {isFr ? "État d'avancement" : "Build Status"}
                    <ArrowRight size={12} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
