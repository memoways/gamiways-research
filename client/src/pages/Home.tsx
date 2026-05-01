/**
 * Home.tsx — DigiDouble Research Portal
 * Redesigned: Executive summary + Voice & Avatar learnings + visual launcher
 * Tone: Institutional/academic intro + startup/product cards
 * Design: Technical Blueprint — Space Grotesk + Source Serif 4
 * i18n: EN / FR via LangContext
 */
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import { ArrowRight, Mic, Video, FlaskConical, Layers, BookOpen, BarChart3, Cpu, ChevronRight } from "lucide-react";

export default function Home() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  // ── KEY LEARNINGS — Voice ────────────────────────────────────────────────
  const voiceLearnings = isFr
    ? [
        { stat: "< 500ms", label: "TTFB cible pour TTS first audio", color: "oklch(0.65 0.18 200)" },
        { stat: "14+", label: "moteurs TTS évalués (cloud + open-source)", color: "oklch(0.55 0.20 200)" },
        { stat: "$0.003–$0.20", label: "coût par minute selon le moteur TTS", color: "oklch(0.72 0.18 200)" },
        { stat: "10", label: "moteurs STT évalués (cloud, open-source, souverain)", color: "oklch(0.60 0.18 200)" },
      ]
    : [
        { stat: "< 500ms", label: "TTFB target for TTS first audio", color: "oklch(0.65 0.18 200)" },
        { stat: "14+", label: "TTS engines evaluated (cloud + open-source)", color: "oklch(0.55 0.20 200)" },
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
      title: isFr ? "DigiDouble — Projet & Recherche" : "DigiDouble — Project & Research",
      desc: isFr
        ? "Vision produit, architecture cible, axes de recherche Innosuisse, gaps identifiés et assessment académique."
        : "Product vision, target architecture, Innosuisse research axes, identified gaps, and academic assessment.",
      links: [
        { label: isFr ? "Le Projet" : "The Project", to: "/project" },
        { label: isFr ? "Research Challenges" : "Research Challenges", to: "/research" },
        { label: isFr ? "Architecture Cible" : "Target Architecture", to: "/research/architecture" },
        { label: isFr ? "Research Gaps" : "Research Gaps", to: "/research/gaps" },
        { label: isFr ? "Assessment Académique" : "Academic Assessment", to: "/research/academic" },
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
        { label: isFr ? "Business & Marché" : "Business & Market", to: "/avatars/market" },
        { label: isFr ? "Comportement & Expressivité" : "Behavior & Expressiveness", to: "/research/behavior" },
        { label: "Emotional Toolbox", to: "/research/emotional" },
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
                {isFr ? "Projet Innosuisse — démarrage automne 2026" : "Innosuisse Project — starting autumn 2026"}
              </span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.04em" }}>
              DigiDouble
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-6" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? <>Un avatar conversationnel de toute personne, depuis ses archives vidéo existantes. <strong>Personnalisé, souverain, temps réel.</strong></>
                : <>A conversational avatar of any person, from their existing video archives. <strong>Personalized, sovereign, real-time.</strong></>
              }
            </p>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl mb-8" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Ce portail documente l'état de l'art, les gaps de recherche et les choix technologiques du projet DigiDouble. Il sert de référence pour les partenaires industriels, les évaluateurs Innosuisse et les chercheurs de l'IDIAP. Il fournit également des informations indépendantes sur les enjeux de la synthèse vocale et des avatars vidéo."
                : "This portal documents the state of the art, research gaps, and technology choices for the DigiDouble project. It serves as a reference for industrial partners, Innosuisse evaluators, and IDIAP researchers. It also provides independent information on voice synthesis and video avatar challenges."}
            </p>
            <div className="flex flex-wrap gap-3">
              <InternalLink to="/project" className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-5 py-2.5 transition-all hover:opacity-90" style={{ background: 'oklch(0.55 0.20 200)', fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
                {isFr ? "Découvrir le projet" : "Discover the project"}
                <ArrowRight size={14} />
              </InternalLink>
              <InternalLink to="/research" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-100 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
                {isFr ? "Research Challenges" : "Research Challenges"}
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
                  {isFr ? "Enjeux indépendants du projet DigiDouble" : "Challenges independent of the DigiDouble project"}
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
              ? "La section Voice Pipeline fournit une analyse indépendante de l'écosystème TTS/STT : comparatifs techniques, benchmarks de latence, modèles de coût et recommandations de stack. Ces informations sont utiles pour tout projet d'IA conversationnelle, au-delà de DigiDouble."
              : "The Voice Pipeline section provides an independent analysis of the TTS/STT ecosystem: technical comparisons, latency benchmarks, cost models, and stack recommendations. This information is useful for any conversational AI project, beyond DigiDouble."}
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
                  {isFr ? "Enjeux indépendants du projet DigiDouble" : "Challenges independent of the DigiDouble project"}
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
              ? "La section Video Avatars fournit une analyse indépendante de l'écosystème des avatars vidéo streaming : comparatifs de plateformes, simulateur de coûts interactif, enjeux business et marché. Ces informations sont utiles pour tout projet intégrant un avatar conversationnel."
              : "The Video Avatars section provides an independent analysis of the streaming video avatar ecosystem: platform comparisons, interactive cost simulator, business and market challenges. This information is useful for any project integrating a conversational avatar."}
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

      {/* ── FOOTER NOTE ──────────────────────────────────────────────────── */}
      <section className="border-t border-slate-200 py-8 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Layers size={14} className="text-slate-400" />
              <span className="text-xs text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {isFr ? "Memoways SA · Projet Innosuisse avec IDIAP · Démarrage automne 2026" : "Memoways SA · Innosuisse project with IDIAP · Starting autumn 2026"}
              </span>
            </div>
            <div className="flex gap-4">
              <InternalLink to="/research/gaps" className="text-xs text-slate-400 hover:text-slate-700 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
                {isFr ? "Research Gaps" : "Research Gaps"}
              </InternalLink>
              <InternalLink to="/avatars/pricing" className="text-xs text-slate-400 hover:text-slate-700 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
                {isFr ? "Simulateur de coûts" : "Cost simulator"}
              </InternalLink>
              <InternalLink to="/voice/pipeline" className="text-xs text-slate-400 hover:text-slate-700 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
                Pipeline
              </InternalLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
