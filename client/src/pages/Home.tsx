/**
 * Home.tsx — GamiWays Research Portal
 * Redesigned: Executive summary + Voice & Avatar learnings + visual launcher
 * Tone: Institutional/academic intro + startup/product cards
 * Design: Technical Blueprint — Space Grotesk + Source Serif 4
 * i18n: EN / FR via LangContext
 */
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import { ArrowRight, Mic, Video, FlaskConical, Layers, BookOpen, BarChart3, Cpu, ChevronRight, Film, ExternalLink } from "lucide-react";
import { Link } from "wouter";

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
      category: isFr ? "The Project" : "The Project",
      title: isFr ? "GamiWays — Projet & Recherche" : "GamiWays — Project & Research",
      desc: isFr
        ? "Vision produit, architecture cible, défis techniques, opportunités identifiées et état de l'art."
        : "Product vision, target architecture, technical challenges, identified opportunities, and state of the art.",
      links: [
        { label: isFr ? "Le Projet" : "The Project", to: "/project" },
        { label: isFr ? "Défis Techniques" : "Technical Challenges", to: "/research" },
        { label: isFr ? "Architecture Cible" : "Target Architecture", to: "/research/architecture" },
        { label: isFr ? "Opportunités & Lacunes" : "Opportunities & Gaps", to: "/research/gaps" },
        { label: isFr ? "État de l'Art" : "State of the Art", to: "/research/academic" },
      ],
    },
    {
      icon: Mic,
      color: "oklch(0.55 0.20 200)",
      bg: "oklch(0.97 0.02 200)",
      border: "oklch(0.88 0.06 200)",
      category: isFr ? "Voice Pipeline" : "Voice Pipeline",
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
                {isFr ? "Gamilab × Memoways" : "Gamilab × Memoways"}
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
              <InternalLink to="/project" className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-5 py-2.5 transition-all hover:opacity-90" style={{ background: 'oklch(0.55 0.20 200)', fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
                {isFr ? "Découvrir le projet" : "Discover the project"}
                <ArrowRight size={14} />
              </InternalLink>
              <InternalLink to="/research" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-100 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
                {isFr ? "Défis Techniques" : "Technical Challenges"}
              </InternalLink>
            </div>
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
      <section className="border-b border-slate-200 py-12 bg-slate-50">
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

      {/* ── FOUNDING PROTOTYPES ──────────────────────────────────────────── */}
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
                  {isFr ? "Les origines concrètes de GamiWays" : "The concrete origins of GamiWays"}
                </p>
              </div>
            </div>
            <Link href="/project/prototypes">
              <span className="inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:opacity-70 cursor-pointer" style={{ color: "oklch(0.55 0.20 200)", fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Voir les deux prototypes" : "View both prototypes"}
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
              <div className="p-5">
                <p className="text-xs text-slate-600 leading-relaxed mb-4" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr
                    ? "L'utilisateur entre dans l'univers du film \"Où est Ava ?\" et parle en visioconférence avec Max, un personnage IA. Un Game Master orchestre l'expérience en temps réel via un pipeline STT→LLM→TTS enrichi par RAG."
                    : "The user enters the film universe \"Where is Ava?\" and speaks via video call with Max, an AI character. A Game Master orchestrates the experience in real time via an STT→LLM→TTS pipeline enriched by RAG."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <a href="https://proto1.parle-a-ava.com/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-colors hover:opacity-80"
                    style={{ background: "oklch(0.72 0.18 50)", color: "white" }}>
                    <ExternalLink size={10} />
                    {isFr ? "Tester" : "Try it"}
                  </a>
                  <Link href="/project/prototypes">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono cursor-pointer transition-colors hover:bg-slate-50"
                      style={{ borderColor: "oklch(0.72 0.18 50)40", color: "oklch(0.72 0.18 50)" }}>
                      {isFr ? "Détails techniques" : "Technical details"}
                      <ArrowRight size={10} />
                    </span>
                  </Link>
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
              <div className="p-5">
                <p className="text-xs text-slate-600 leading-relaxed mb-4" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr
                    ? "Peter guide des élèves de 12–18 ans dans la découverte de 6 indices sur la pollution plastique. Deux prototypes complémentaires : pipeline léger (25h, ~220 CHF) et orchestration Flowise complète (45h, ~160 CHF)."
                    : "Peter guides 12–18 year-old students in discovering 6 clues about plastic pollution. Two complementary prototypes: lightweight pipeline (25h, ~220 CHF) and full Flowise orchestration (45h, ~160 CHF)."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <a href="https://proto-dilemme2.edugami.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-colors hover:opacity-80"
                    style={{ background: "oklch(0.55 0.20 200)", color: "white" }}>
                    <ExternalLink size={10} />
                    {isFr ? "Tester (light)" : "Try (light)"}
                  </a>
                  <a href="https://dilemme-proto.replit.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono transition-colors hover:bg-slate-50"
                    style={{ borderColor: "oklch(0.55 0.20 200)40", color: "oklch(0.55 0.20 200)" }}>
                    <ExternalLink size={10} />
                    {isFr ? "Tester (Flowise)" : "Try (Flowise)"}
                  </a>
                  <Link href="/project/prototypes">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono cursor-pointer transition-colors hover:bg-slate-50"
                      style={{ borderColor: "oklch(0.55 0.20 200)40", color: "oklch(0.55 0.20 200)" }}>
                      {isFr ? "Détails techniques" : "Technical details"}
                      <ArrowRight size={10} />
                    </span>
                  </Link>
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

      {/* ── SECTION LAUNCHER ─────────────────────────────────────────────── */}
      <section className="py-14">
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

    </div>
  );
}
