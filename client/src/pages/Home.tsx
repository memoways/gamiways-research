/**
 * Home.tsx — GamiWays Research Portal
 * Section order: Hero → Founding Prototypes → Core Engine → Explore the portal → Voice → Avatars
 * Design: Technical Blueprint — Space Grotesk + Source Serif 4
 * i18n: EN / FR via LangContext
 */
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import { Link } from "wouter";
import {
  ArrowRight, Mic, Video, FlaskConical, BookOpen, ChevronRight,
  Film, ExternalLink, Cpu, Zap, Clock, Layers
} from "lucide-react";

export default function Home() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  // ── KEY LEARNINGS — Voice ────────────────────────────────────────────────
  const voiceLearnings = isFr
    ? [
        { stat: "< 500ms", label: "TTFB cible pour TTS first audio", color: "oklch(0.65 0.18 200)" },
        { stat: "17", label: "moteurs TTS évalués (cloud + open-source)", color: "oklch(0.55 0.20 200)" },
        { stat: "$0.003–$0.20", label: "coût par minute selon le moteur TTS", color: "oklch(0.72 0.18 200)" },
        { stat: "10", label: "moteurs STT évalués (cloud, open-source, souverain)", color: "oklch(0.60 0.18 200)" },
      ]
    : [
        { stat: "< 500ms", label: "TTFB target for TTS first audio", color: "oklch(0.65 0.18 200)" },
        { stat: "17", label: "TTS engines evaluated (cloud + open-source)", color: "oklch(0.55 0.20 200)" },
        { stat: "$0.003–$0.20", label: "cost per minute depending on TTS engine", color: "oklch(0.72 0.18 200)" },
        { stat: "10", label: "STT engines evaluated (cloud, open-source, sovereign)", color: "oklch(0.60 0.18 200)" },
      ];

  // ── KEY LEARNINGS — Avatars ──────────────────────────────────────────────
  const avatarLearnings = isFr
    ? [
        { stat: "11+", label: "plateformes d'avatars vidéo comparées", color: "oklch(0.72 0.18 50)" },
        { stat: "< 300ms", label: "latence atteinte par Simli Trinity-1", color: "oklch(0.65 0.18 50)" },
        { stat: "$0.009–$0.35", label: "coût par minute selon la plateforme", color: "oklch(0.72 0.18 50)" },
        { stat: "1 seul", label: "acteur couvre le critère multi-style (LemonSlice)", color: "oklch(0.60 0.20 50)" },
      ]
    : [
        { stat: "11+", label: "video avatar platforms compared", color: "oklch(0.72 0.18 50)" },
        { stat: "< 300ms", label: "latency achieved by Simli Trinity-1", color: "oklch(0.65 0.18 50)" },
        { stat: "$0.009–$0.35", label: "cost per minute depending on platform", color: "oklch(0.72 0.18 50)" },
        { stat: "1 only", label: "actor covers multi-style criterion (LemonSlice)", color: "oklch(0.60 0.20 50)" },
      ];

  // ── SITE SECTIONS ────────────────────────────────────────────────────────
  const sections = [
    {
      icon: FlaskConical,
      color: "oklch(0.55 0.20 200)",
      bg: "oklch(0.97 0.02 200)",
      border: "oklch(0.88 0.06 200)",
      category: "The Project",
      title: isFr ? "GamiWays — Projet & Recherche" : "GamiWays — Project & Research",
      desc: isFr
        ? "Vision produit, architecture cible, défis techniques, opportunités identifiées et état de l'art."
        : "Product vision, target architecture, technical challenges, identified opportunities, and state of the art.",
      links: [
        { label: isFr ? "Le Projet" : "The Project", to: "/project" },
        { label: isFr ? "Prototypes Fondateurs" : "Founding Prototypes", to: "/project/prototypes" },
        { label: isFr ? "Défis Techniques" : "Technical Challenges", to: "/research" },
        { label: isFr ? "Architecture Cible" : "Target Architecture", to: "/research/architecture" },
        { label: isFr ? "État d'avancement" : "Build Status", to: "/project/status" },
      ],
    },
    {
      icon: Mic,
      color: "oklch(0.55 0.20 200)",
      bg: "oklch(0.97 0.02 200)",
      border: "oklch(0.88 0.06 200)",
      category: "Voice Pipeline",
      title: isFr ? "Synthèse & Reconnaissance Vocale" : "Speech Synthesis & Recognition",
      desc: isFr
        ? "Comparatif complet des moteurs TTS et STT, benchmarks de latence, stack recommandé et pipeline Phase 1."
        : "Complete comparison of TTS and STT engines, latency benchmarks, recommended stack, and Phase 1 pipeline.",
      links: [
        { label: "TTS", to: "/voice/tts" },
        { label: "STT", to: "/voice/stt" },
        { label: isFr ? "Benchmarks Latence" : "Latency Benchmarks", to: "/voice/benchmarks" },
        { label: isFr ? "Cadre de Décision" : "Decision Framework", to: "/voice/stack" },
        { label: isFr ? "Diagramme V2V" : "V2V Diagram", to: "/voice/pipeline" },
      ],
    },
    {
      icon: Video,
      color: "oklch(0.72 0.18 50)",
      bg: "oklch(0.98 0.02 50)",
      border: "oklch(0.90 0.06 50)",
      category: isFr ? "Video Avatars" : "Video Avatars",
      title: isFr ? "Avatars Vidéo Streaming" : "Streaming Video Avatars",
      desc: isFr
        ? "Comparatif des plateformes commerciales, simulateur de coûts, enjeux business, comportement et design émotionnel."
        : "Comparison of commercial platforms, cost simulator, business challenges, behavior, and emotional design.",
      links: [
        { label: isFr ? "Avatars Streaming" : "Streaming Avatars", to: "/avatars" },
        { label: isFr ? "Simulateur de Coûts" : "Cost Simulator", to: "/avatars/pricing" },
        { label: isFr ? "Comportement & Design Émotionnel" : "Behavior & Emotional Design", to: "/research/behavior" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="border-b border-slate-200 py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                {isFr ? "Portail de Recherche" : "Research Portal"}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "oklch(0.97 0.02 200)", color: "oklch(0.55 0.20 200)", fontFamily: "'JetBrains Mono', monospace" }}>
                Gamilab × Memoways
              </span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.04em" }}>
              GamiWays
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-6" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? <>Infrastructure conversationnelle multi-avatars. <strong>Modulaire, souveraine, temps réel.</strong></>
                : <>Multi-avatar conversational infrastructure. <strong>Modular, sovereign, real-time.</strong></>
              }
            </p>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl mb-8" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Ce portail concentre la veille technologique de Gamilab et Memoways sur les pipelines vocaux et les avatars vidéo. Il sert d'outil de sélection technologique, de support à la décision stratégique et de vitrine d'expertise pour clients et partenaires."
                : "This portal consolidates Gamilab and Memoways' technology intelligence on voice pipelines and video avatars. It serves as a technology selection tool, strategic decision support, and an expertise showcase for clients and partners."}
            </p>
            <div className="flex flex-wrap gap-3">
              <InternalLink to="/project/prototypes" className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-5 py-2.5 transition-all hover:opacity-90" style={{ background: "oklch(0.55 0.20 200)", fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
                {isFr ? "Voir les prototypes" : "See the prototypes"}
                <ArrowRight size={14} />
              </InternalLink>
              <InternalLink to="/project" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-100 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
                {isFr ? "Découvrir le projet" : "Discover the project"}
              </InternalLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDING PROTOTYPES ───────────────────────────────────────────── */}
      <section className="border-b border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.97 0.02 200)" }}>
                <FlaskConical size={16} style={{ color: "oklch(0.55 0.20 200)" }} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
                  {isFr ? "Prototypes Fondateurs" : "Founding Prototypes"}
                </h2>
                <p className="text-xs text-slate-400" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr ? "Les origines concrètes et testables de GamiWays" : "The concrete, testable origins of GamiWays"}
                </p>
              </div>
            </div>
            <Link href="/project/prototypes">
              <span className="inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:opacity-70 cursor-pointer" style={{ color: "oklch(0.55 0.20 200)", fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Détails techniques complets" : "Full technical details"}
                <ChevronRight size={12} />
              </span>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            {/* AVA card */}
            <div className="border rounded-xl overflow-hidden bg-white" style={{ borderColor: "oklch(0.72 0.18 50)30" }}>
              <div className="px-5 py-4 flex items-start justify-between gap-3" style={{ background: "oklch(0.72 0.18 50)08", borderBottom: "1px solid oklch(0.72 0.18 50)20" }}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Film size={13} style={{ color: "oklch(0.72 0.18 50)" }} />
                    <span className="text-xs font-bold font-mono uppercase tracking-wider" style={{ color: "oklch(0.72 0.18 50)" }}>Storygami</span>
                  </div>
                  <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Parle à AVA!</h3>
                </div>
                <span className="text-xs px-2 py-0.5 rounded border font-mono shrink-0" style={{ color: "oklch(0.72 0.18 50)", borderColor: "oklch(0.72 0.18 50)40", background: "oklch(0.72 0.18 50)0d" }}>
                  {isFr ? "Cinéma interactif" : "Interactive cinema"}
                </span>
              </div>
              {/* Screenshot AVA */}
              <div className="overflow-hidden" style={{ maxHeight: "140px" }}>
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/117184650/JCUDa4RfVRrK7WLqtd9JFw/ava-landing-screenshot_3718c6d1.webp"
                  alt="Parle à AVA! prototype screenshot"
                  className="w-full object-cover object-top"
                  style={{ borderBottom: "1px solid oklch(0.72 0.18 50)20" }}
                />
              </div>
              <div className="p-5">
                <p className="text-xs text-slate-600 leading-relaxed mb-4" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr
                    ? "L'utilisateur entre dans l'univers du film \"Où est Ava ?\" et parle en visioconférence avec Max, un personnage IA. Un Game Master orchestre l'expérience en temps réel via un pipeline STT→LLM→TTS enrichi par RAG."
                    : "The user enters the film universe \"Where is Ava?\" and speaks via video call with Max, an AI character. A Game Master orchestrates the experience in real time via an STT→LLM→TTS pipeline enriched by RAG."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/project/prototypes">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold cursor-pointer transition-colors hover:opacity-80"
                      style={{ background: "oklch(0.72 0.18 50)", color: "white" }}>
                      {isFr ? "Détails techniques" : "Technical details"}
                      <ArrowRight size={10} />
                    </span>
                  </Link>
                  <a href="https://proto1.parle-a-ava.com/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono transition-colors hover:bg-slate-50"
                    style={{ borderColor: "oklch(0.72 0.18 50)40", color: "oklch(0.72 0.18 50)" }}>
                    <ExternalLink size={10} />
                    {isFr ? "Tester" : "Try it"}
                  </a>
                </div>
              </div>
            </div>

            {/* Dilemme Plastique card */}
            <div className="border rounded-xl overflow-hidden bg-white" style={{ borderColor: "oklch(0.55 0.20 200)30" }}>
              <div className="px-5 py-4 flex items-start justify-between gap-3" style={{ background: "oklch(0.55 0.20 200)08", borderBottom: "1px solid oklch(0.55 0.20 200)20" }}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen size={13} style={{ color: "oklch(0.55 0.20 200)" }} />
                    <span className="text-xs font-bold font-mono uppercase tracking-wider" style={{ color: "oklch(0.55 0.20 200)" }}>Edugami</span>
                  </div>
                  <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Le Dilemme Plastique</h3>
                </div>
                <span className="text-xs px-2 py-0.5 rounded border font-mono shrink-0" style={{ color: "oklch(0.55 0.20 200)", borderColor: "oklch(0.55 0.20 200)40", background: "oklch(0.55 0.20 200)0d" }}>
                  {isFr ? "Éducation voice-first" : "Voice-first education"}
                </span>
              </div>
              {/* Screenshot Dilemme */}
              <div className="overflow-hidden" style={{ maxHeight: "140px" }}>
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/117184650/JCUDa4RfVRrK7WLqtd9JFw/dilemme-light-landing-screenshot_3343a943.webp"
                  alt="Le Dilemme Plastique prototype screenshot"
                  className="w-full object-cover object-top"
                  style={{ borderBottom: "1px solid oklch(0.55 0.20 200)20" }}
                />
              </div>
              <div className="p-5">
                <p className="text-xs text-slate-600 leading-relaxed mb-4" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr
                    ? "Peter guide des élèves de 12–18 ans dans la découverte de 6 indices sur la pollution plastique. Deux prototypes complémentaires : pipeline léger (25h, ~220 CHF) et orchestration Flowise complète (45h, ~160 CHF)."
                    : "Peter guides 12–18 year-old students in discovering 6 clues about plastic pollution. Two complementary prototypes: lightweight pipeline (25h, ~220 CHF) and full Flowise orchestration (45h, ~160 CHF)."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/project/prototypes">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold cursor-pointer transition-colors hover:opacity-80"
                      style={{ background: "oklch(0.55 0.20 200)", color: "white" }}>
                      {isFr ? "Détails techniques" : "Technical details"}
                      <ArrowRight size={10} />
                    </span>
                  </Link>
                  <a href="https://proto-dilemme2.edugami.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono transition-colors hover:bg-slate-50"
                    style={{ borderColor: "oklch(0.55 0.20 200)40", color: "oklch(0.55 0.20 200)" }}>
                    <ExternalLink size={10} />
                    {isFr ? "Tester (light)" : "Try (light)"}
                  </a>
                  <a href="https://dilemme-proto.replit.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono transition-colors hover:bg-slate-50"
                    style={{ borderColor: "oklch(0.55 0.20 200)40", color: "oklch(0.55 0.20 200)" }}>
                    <ExternalLink size={10} />
                    {isFr ? "Tester (Flowise)" : "Try (Flowise)"}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed max-w-3xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Ces deux prototypes ont révélé les mêmes défis fondamentaux — latence, mémoire de session, qualité vocale française, avatar expressif — et ont directement motivé la création du GamiWays Core Engine comme infrastructure générique."
              : "These two prototypes revealed the same fundamental challenges — latency, session memory, French voice quality, expressive avatar — and directly motivated the creation of the GamiWays Core Engine as a generic infrastructure."}
          </p>
        </div>
      </section>

      {/* ── CORE ENGINE ───────────────────────────────────────────────────── */}
      <section className="border-b border-slate-200 py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.55 0.20 200)15" }}>
                <Cpu size={16} style={{ color: "oklch(0.45 0.20 200)" }} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
                  {isFr ? "GamiWays Core Engine" : "GamiWays Core Engine"}
                </h2>
                <p className="text-xs text-slate-400" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr ? "En développement actif — Phase A · 21/24 épics complétés" : "Actively in development — Phase A · 21/24 epics completed"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/research/architecture">
                <span className="inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:opacity-70 cursor-pointer" style={{ color: "oklch(0.45 0.20 200)", fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "Architecture" : "Architecture"}
                  <ChevronRight size={12} />
                </span>
              </Link>
              <span className="text-slate-300">·</span>
              <Link href="/project/status">
                <span className="inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:opacity-70 cursor-pointer" style={{ color: "oklch(0.45 0.20 200)", fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isFr ? "État d'avancement" : "Build Status"}
                  <ChevronRight size={12} />
                </span>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Left: narrative */}
            <div className="md:col-span-2 space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? "Le GamiWays Core Engine est l'infrastructure commune développée à partir des enseignements des deux prototypes. C'est un moteur d'orchestration headless — il ne contient pas d'UI, de voix ni d'avatars — mais pose la fondation réutilisable sur laquelle Storygami et Edugami s'appuient."
                  : "The GamiWays Core Engine is the shared infrastructure developed from the learnings of both prototypes. It is a headless orchestration engine — it contains no UI, voice, or avatars — but lays the reusable foundation on which both Storygami and Edugami build."}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? "Son architecture repose sur trois piliers : un Context Engine v2 (7 dimensions de contexte injectées à chaque tour), un Memory System v2 (mémoire épisodique, sémantique et procédurale), et un Game Master asynchrone qui orchestre l'expérience sans bloquer le pipeline conversationnel."
                  : "Its architecture rests on three pillars: a Context Engine v2 (7 context dimensions injected at each turn), a Memory System v2 (episodic, semantic and procedural memory), and an asynchronous Game Master that orchestrates the experience without blocking the conversational pipeline."}
              </p>
              {/* Progress bar Phase A */}
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold font-mono" style={{ color: "oklch(0.45 0.20 200)", fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isFr ? "Phase A — Minimal Core" : "Phase A — Minimal Core"}
                  </span>
                  <span className="text-xs font-mono text-slate-500">21 / 24 {isFr ? "épics" : "epics"} · 87%</span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="absolute inset-0 h-full rounded-full" style={{ width: "87%", background: "oklch(0.55 0.20 200)" }} />
                </div>
                <p className="text-xs text-slate-400 mt-2" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr
                    ? "Context Engine v2, Memory System v2, User Persona, Runtime State & SSE — complétés en mai 2026."
                    : "Context Engine v2, Memory System v2, User Persona, Runtime State & SSE — completed May 2026."}
                </p>
              </div>
            </div>

            {/* Right: 3 pillars */}
            <div className="space-y-3">
              {[
                {
                  icon: Layers,
                  title: "Context Engine v2",
                  desc: isFr ? "7 dimensions de contexte — Avatar, GM, Session, World, Knowledge, User Persona, Runtime" : "7 context dimensions — Avatar, GM, Session, World, Knowledge, User Persona, Runtime",
                  href: "/research/architecture",
                },
                {
                  icon: Clock,
                  title: "Memory System v2",
                  desc: isFr ? "Mémoire épisodique + sémantique + procédurale. Sessions longue durée sans explosion tokens." : "Episodic + semantic + procedural memory. Long-duration sessions without token explosion.",
                  href: "/research/architecture",
                },
                {
                  icon: Zap,
                  title: "Game Master",
                  desc: isFr ? "Orchestrateur asynchrone — triggers, directives, changement d'avatar, game over. Décide avant de générer." : "Async orchestrator — triggers, directives, avatar switch, game over. Decides before generating.",
                  href: "/project",
                },
              ].map((pillar) => (
                <Link key={pillar.title} href={pillar.href}>
                  <div className="flex gap-3 p-3 border border-slate-200 rounded-lg bg-white cursor-pointer hover:shadow-sm transition-shadow">
                    <div className="shrink-0 mt-0.5 p-1.5 rounded" style={{ background: "oklch(0.55 0.20 200)12" }}>
                      <pillar.icon size={13} style={{ color: "oklch(0.45 0.20 200)" }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{pillar.title}</div>
                      <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{pillar.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Convergence strip */}
          <div className="rounded-lg border p-4 flex flex-col sm:flex-row sm:items-center gap-4" style={{ borderColor: "oklch(0.55 0.20 200)25", background: "oklch(0.97 0.02 200)" }}>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold font-mono px-2 py-1 rounded" style={{ color: "oklch(0.72 0.18 50)", background: "oklch(0.72 0.18 50)12" }}>AVA</span>
                <span className="text-xs text-slate-400">+</span>
                <span className="text-xs font-bold font-mono px-2 py-1 rounded" style={{ color: "oklch(0.55 0.20 200)", background: "oklch(0.55 0.20 200)12" }}>Dilemme</span>
                <ArrowRight size={12} style={{ color: "oklch(0.55 0.20 200)" }} />
                <span className="text-xs font-bold font-mono px-2 py-1 rounded" style={{ color: "white", background: "oklch(0.45 0.20 200)" }}>GamiWays Core</span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr ? "Un moteur commun pour Storygami et Edugami — et toutes les expériences à venir." : "One shared engine for Storygami and Edugami — and all future experiences."}
              </p>
            </div>
            <Link href="/project">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold cursor-pointer shrink-0 transition-colors hover:opacity-80" style={{ color: "oklch(0.45 0.20 200)" }}>
                {isFr ? "Vision produit" : "Product vision"}
                <ArrowRight size={11} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION LAUNCHER ─────────────────────────────────────────────── */}
      <section className="py-14 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
            {isFr ? "Explorer le portail" : "Explore the portal"}
          </h2>
          <p className="text-sm text-slate-500 mb-8 max-w-xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Trois sections indépendantes. Chacune peut être consultée seule ou en lien avec les autres."
              : "Three independent sections. Each can be consulted alone or in connection with the others."}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.category} className="border rounded-xl p-6 bg-white flex flex-col" style={{ borderColor: s.border }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                      <Icon size={18} style={{ color: s.color }} />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider" style={{ color: s.color }}>{s.category}</div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1" style={{ fontFamily: "'Source Serif 4', serif" }}>{s.desc}</p>
                  <ul className="space-y-1">
                    {s.links.map((link) => (
                      <li key={link.to}>
                        <InternalLink to={link.to} className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors group" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
                          <ChevronRight size={10} className="opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: s.color }} />
                          {link.label}
                        </InternalLink>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── KEY LEARNINGS — Voice ─────────────────────────────────────────── */}
      <section className="border-b border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.97 0.02 200)" }}>
                <Mic size={16} style={{ color: "oklch(0.55 0.20 200)" }} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
                  {isFr ? "Synthèse & Reconnaissance Vocale" : "Speech Synthesis & Recognition"}
                </h2>
                <p className="text-xs text-slate-400" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr ? "Veille technologique Gamilab × Memoways" : "Technology intelligence by Gamilab × Memoways"}
                </p>
              </div>
            </div>
            <InternalLink to="/voice/tts" className="inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:opacity-70" style={{ color: "oklch(0.55 0.20 200)", fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
              {isFr ? "Explorer la section Voice" : "Explore Voice section"}
              <ChevronRight size={12} />
            </InternalLink>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {voiceLearnings.map((l, i) => (
              <div key={i} className="border border-slate-200 rounded-lg p-4 bg-white">
                <div className="text-2xl font-black mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: l.color, letterSpacing: "-0.03em" }}>
                  {l.stat}
                </div>
                <p className="text-xs text-slate-500 leading-snug" style={{ fontFamily: "'Source Serif 4', serif" }}>{l.label}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 leading-relaxed max-w-3xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "La section Voice Pipeline fournit une analyse complète de l'écosystème TTS/STT : comparatifs techniques, benchmarks de latence, modèles de coût et recommandations de stack. Ces données permettent de sélectionner les bons moteurs vocaux selon les contraintes de budget, souveraineté et performance."
              : "The Voice Pipeline section provides a comprehensive analysis of the TTS/STT ecosystem: technical comparisons, latency benchmarks, cost models, and stack recommendations. This data enables selecting the right voice engines based on budget, sovereignty, and performance constraints."}
          </p>
        </div>
      </section>

      {/* ── KEY LEARNINGS — Avatars ───────────────────────────────────────── */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.98 0.02 50)" }}>
                <Video size={16} style={{ color: "oklch(0.72 0.18 50)" }} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
                  {isFr ? "Avatars Vidéo Streaming" : "Streaming Video Avatars"}
                </h2>
                <p className="text-xs text-slate-400" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr ? "Veille technologique Gamilab × Memoways" : "Technology intelligence by Gamilab × Memoways"}
                </p>
              </div>
            </div>
            <InternalLink to="/avatars" className="inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:opacity-70" style={{ color: "oklch(0.72 0.18 50)", fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
              {isFr ? "Explorer la section Avatars" : "Explore Avatars section"}
              <ChevronRight size={12} />
            </InternalLink>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {avatarLearnings.map((l, i) => (
              <div key={i} className="border border-slate-200 rounded-lg p-4 bg-white">
                <div className="text-2xl font-black mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: l.color, letterSpacing: "-0.03em" }}>
                  {l.stat}
                </div>
                <p className="text-xs text-slate-500 leading-snug" style={{ fontFamily: "'Source Serif 4', serif" }}>{l.label}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 leading-relaxed max-w-3xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "La section Video Avatars analyse l'écosystème des avatars vidéo streaming : comparatifs de plateformes, simulateur de coûts interactif, enjeux business et opportunités de marché. Un outil essentiel pour évaluer les options d'intégration d'un avatar conversationnel dans un projet client."
              : "The Video Avatars section analyzes the streaming video avatar ecosystem: platform comparisons, interactive cost simulator, business challenges, and market opportunities. An essential tool for evaluating avatar integration options in a client project."}
          </p>
        </div>
      </section>

    </div>
  );
}
