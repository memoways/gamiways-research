/*
 * About.tsx — GamiWays Research Portal
 * Page: About this portal — purpose, editorial philosophy, structure
 * Design: Technical Blueprint
 * i18n: EN / FR via LangContext
 * Rebranded: Gamilab × Memoways — no Innosuisse/IDIAP references
 */
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import { BookOpen, Mic, Video, FlaskConical, BarChart2, Info, Users, Target, Layers } from "lucide-react";

export default function About() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-baseline gap-3 mb-2">
            <h2 className="text-2xl font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "À propos de ce portail" : "About this portal"}
            </h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr
              ? "GamiWays Research Portal — outil de veille technologique et de sélection de solutions, développé par Gamilab et Memoways."
              : "GamiWays Research Portal — a technology intelligence and solution selection tool, developed by Gamilab and Memoways."}
          </p>
          <div className="mt-3 h-px" style={{ background: "linear-gradient(to right, oklch(0.72 0.18 200), transparent)" }} />
        </div>

        {/* What is this portal */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Info size={16} style={{ color: "oklch(0.55 0.20 200)" }} />
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Qu'est-ce que ce portail ?" : "What is this portal?"}
            </h3>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Le GamiWays Research Portal est un outil de veille technologique concentrant l'expertise de Gamilab et Memoways sur les pipelines vocaux (STT, TTS) et les avatars vidéo conversationnels. Il documente l'état de l'art en 2025–2026, avec des benchmarks vérifiés, des analyses stratégiques et des outils de décision interactifs."
                : "The GamiWays Research Portal is a technology intelligence tool consolidating Gamilab and Memoways' expertise on voice pipelines (STT, TTS) and conversational video avatars. It documents the state of the art in 2025–2026, with verified benchmarks, strategic analyses, and interactive decision tools."}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Le portail couvre 10 moteurs STT, 16 moteurs TTS et 11+ plateformes d'avatars vidéo. Il est conçu pour aider à prendre des décisions technologiques éclairées — que ce soit pour un projet pilote client, une intégration produit, ou une évaluation stratégique de l'écosystème."
                : "The portal covers 10 STT engines, 16 TTS engines, and 11+ video avatar platforms. It is designed to support informed technology decisions — whether for a client pilot project, a product integration, or a strategic ecosystem assessment."}
            </p>
          </div>
        </section>

        {/* Who is it for */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Users size={16} style={{ color: "oklch(0.55 0.20 200)" }} />
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Pour qui ?" : "Who is it for?"}
            </h3>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: "🏢",
                  title: isFr ? "Clients Memoways" : "Memoways clients",
                  desc: isFr
                    ? "Organisations confrontées à des choix technologiques pour intégrer un avatar conversationnel ou une pipeline vocale dans leurs projets."
                    : "Organizations facing technology choices for integrating a conversational avatar or voice pipeline into their projects.",
                },
                {
                  icon: "🤝",
                  title: isFr ? "Partenaires technologiques" : "Technology partners",
                  desc: isFr
                    ? "Équipes techniques et partenaires qui souhaitent comprendre les choix d'architecture de Gamilab et les contraintes de performance cibles."
                    : "Technical teams and partners who want to understand Gamilab's architecture choices and target performance constraints.",
                },
                {
                  icon: "🔍",
                  title: isFr ? "Évaluateurs & experts" : "Evaluators & experts",
                  desc: isFr
                    ? "Toute structure confrontée aux mêmes questions — sélection de moteurs vocaux, évaluation d'avatars, arbitrage souveraineté vs performance vs coût."
                    : "Any organization facing the same questions — voice engine selection, avatar evaluation, sovereignty vs performance vs cost trade-offs.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-slate-50 rounded-lg p-4">
                  <div className="text-xl mb-2">{item.icon}</div>
                  <p className="text-xs font-bold text-slate-800 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Target size={16} style={{ color: "oklch(0.55 0.20 200)" }} />
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Objectifs du portail" : "Portal objectives"}
            </h3>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: "🎯",
                  title: isFr ? "Sélection technologique" : "Technology selection",
                  desc: isFr
                    ? "Identifier les bons moteurs vocaux et plateformes d'avatars selon les contraintes réelles : budget, souveraineté, latence, langues, intégration."
                    : "Identify the right voice engines and avatar platforms based on real constraints: budget, sovereignty, latency, languages, integration.",
                },
                {
                  icon: "📊",
                  title: isFr ? "Décision stratégique" : "Strategic decision support",
                  desc: isFr
                    ? "Fournir des données actualisées pour arbitrer entre options : cloud vs on-premise, open-source vs commercial, latence vs coût."
                    : "Provide up-to-date data to arbitrate between options: cloud vs on-premise, open-source vs commercial, latency vs cost.",
                },
                {
                  icon: "🏆",
                  title: isFr ? "Vitrine d'expertise" : "Expertise showcase",
                  desc: isFr
                    ? "Démontrer la profondeur d'expertise de Gamilab et Memoways dans les technologies d'avatars conversationnels — pour festivals, clients et partenaires."
                    : "Demonstrate the depth of Gamilab and Memoways' expertise in conversational avatar technologies — for festivals, clients, and partners.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-slate-50 rounded-lg p-4">
                  <div className="text-xl mb-2">{item.icon}</div>
                  <p className="text-xs font-bold text-slate-800 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial philosophy */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} style={{ color: "oklch(0.55 0.20 200)" }} />
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Philosophie éditoriale" : "Editorial philosophy"}
            </h3>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Ce portail ne recommande pas de solutions spécifiques. Il présente des options, des métriques vérifiées, des questions à se poser et des cadres de décision. L'objectif est d'aider les équipes à comprendre le paysage technologique et à prendre des décisions éclairées en fonction de leurs contraintes propres — souveraineté des données, budget, latence, expertise technique."
                : "This portal does not recommend specific solutions. It presents options, verified metrics, questions to ask, and decision frameworks. The goal is to help teams understand the technology landscape and make informed decisions based on their own constraints — data sovereignty, budget, latency, technical expertise."}
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-2">
              {[
                {
                  icon: "🎯",
                  title: isFr ? "Questions ouvertes" : "Open questions",
                  desc: isFr ? "Chaque section pose les vraies questions de décision, sans imposer de réponse." : "Each section asks the real decision questions, without imposing an answer.",
                },
                {
                  icon: "⚖️",
                  title: isFr ? "Neutralité fournisseur" : "Vendor neutrality",
                  desc: isFr ? "Aucun partenariat commercial avec les fournisseurs évalués. Les données sont issues de benchmarks publics et de tests indépendants." : "No commercial partnerships with evaluated vendors. Data comes from public benchmarks and independent tests.",
                },
                {
                  icon: "🔄",
                  title: isFr ? "Mise à jour continue" : "Continuous updates",
                  desc: isFr ? "Le marché évolue vite. Ce portail est mis à jour pour refléter les nouvelles sorties, les changements de prix et les nouveaux benchmarks." : "The market moves fast. This portal is updated to reflect new releases, pricing changes, and new benchmarks.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-slate-50 rounded-lg p-4">
                  <div className="text-xl mb-2">{item.icon}</div>
                  <p className="text-xs font-bold text-slate-800 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portal structure */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Layers size={16} style={{ color: "oklch(0.55 0.20 200)" }} />
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Structure du portail" : "Portal structure"}
            </h3>
          </div>
          <div className="space-y-3">
            {[
              {
                icon: FlaskConical,
                color: "oklch(0.55 0.20 200)",
                section: isFr ? "The Project" : "The Project",
                desc: isFr
                  ? "Vision produit de GamiWays, défis techniques, architecture cible, opportunités identifiées et état de l'art. Contexte de l'infrastructure conversationnelle Gamilab."
                  : "GamiWays product vision, technical challenges, target architecture, identified opportunities, and state of the art. Context of Gamilab's conversational infrastructure.",
                href: "/project",
              },
              {
                icon: Mic,
                color: "oklch(0.55 0.20 200)",
                section: isFr ? "Voice Pipeline" : "Voice Pipeline",
                desc: isFr
                  ? "Comparatifs STT (10 moteurs) et TTS (16 moteurs), benchmarks de synthèse audio, cadre de décision par couche, scoring personnalisé et diagramme pipeline V2V interactif."
                  : "STT (10 engines) and TTS (16 engines) comparisons, audio synthesis benchmarks, layer-by-layer decision framework, custom scoring, and interactive V2V pipeline diagram.",
                href: "/voice/stt",
              },
              {
                icon: Video,
                color: "oklch(0.72 0.18 50)",
                section: isFr ? "Video Avatars" : "Video Avatars",
                desc: isFr
                  ? "Comparatif de 11+ plateformes d'avatars vidéo streaming, simulateur de coûts interactif, enjeux business et marché, comportement & expressivité, boîte à outils émotionnelle."
                  : "Comparison of 11+ streaming video avatar platforms, interactive cost simulator, business & market challenges, behavior & expressiveness, emotional toolbox.",
                href: "/avatars",
              },
              {
                icon: BookOpen,
                color: "oklch(0.60 0.20 280)",
                section: isFr ? "À propos" : "About",
                desc: isFr
                  ? "Présentation du portail (cette page) et glossaire des 30+ termes techniques utilisés dans le portail."
                  : "Portal presentation (this page) and glossary of the 30+ technical terms used in the portal.",
                href: "/about",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.section} className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 hover:border-slate-300 transition-all">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: item.color + "18" }}>
                      <Icon size={15} style={{ color: item.color }} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.section}</span>
                      <InternalLink to={item.href} className="text-xs font-mono" style={{ color: item.color }}>
                        {isFr ? "Explorer →" : "Explore →"}
                      </InternalLink>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Partnership context */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <FlaskConical size={16} style={{ color: "oklch(0.55 0.20 200)" }} />
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Gamilab × Memoways" : "Gamilab × Memoways"}
            </h3>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <p className="text-sm text-slate-700 leading-relaxed mb-5" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Ce portail est le fruit du partenariat entre Gamilab et Memoways — deux structures complémentaires qui couvrent ensemble l'ensemble de la chaîne de valeur des avatars conversationnels : de l'infrastructure technologique aux projets clients."
                : "This portal is the result of the partnership between Gamilab and Memoways — two complementary organizations that together cover the entire value chain of conversational avatars: from technological infrastructure to client projects."}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  name: "Gamilab",
                  url: "https://gamilab.ch",
                  color: "oklch(0.55 0.20 200)",
                  role: isFr ? "Moteur technologique" : "Technology engine",
                  desc: isFr
                    ? "Développe l'infrastructure conversationnelle multi-avatars : SDK, API, pipeline STT→LLM→TTS→Avatar. Fournit la couche technique sur laquelle s'appuient les projets Memoways."
                    : "Develops the multi-avatar conversational infrastructure: SDK, API, STT→LLM→TTS→Avatar pipeline. Provides the technical layer on which Memoways projects are built.",
                },
                {
                  name: "Memoways",
                  url: "https://memoways.com",
                  color: "oklch(0.72 0.18 50)",
                  role: isFr ? "Agence de déploiement" : "Deployment agency",
                  desc: isFr
                    ? "Réalise les projets pilotes et les implémentations pour clients : conception, intégration, personnalisation et déploiement d'avatars conversationnels dans des contextes réels."
                    : "Delivers pilot projects and client implementations: design, integration, customization, and deployment of conversational avatars in real-world contexts.",
                },
              ].map((partner) => (
                <div key={partner.name} className="rounded-xl p-5 border" style={{ borderColor: partner.color + "40", background: partner.color + "08" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-black" style={{ fontFamily: "'Space Grotesk', sans-serif", color: partner.color }}>{partner.name}</span>
                    <a href={partner.url} target="_blank" rel="noopener noreferrer" className="text-xs font-mono" style={{ color: partner.color }}>
                      {partner.url.replace("https://", "")} →
                    </a>
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{partner.role}</p>
                  <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{partner.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid sm:grid-cols-3 gap-3">
              {[
                { label: isFr ? "Moteurs STT couverts" : "STT engines covered", value: "10" },
                { label: isFr ? "Moteurs TTS couverts" : "TTS engines covered", value: "16" },
                { label: isFr ? "Plateformes avatars" : "Avatar platforms", value: "11+" },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</p>
                  <p className="text-sm font-bold text-slate-800 font-mono">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA to glossary */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Vous ne connaissez pas un terme ?" : "Unfamiliar with a term?"}
            </p>
            <p className="text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Le glossaire explique les 30+ termes techniques utilisés dans ce portail : WER, TTFA, ELO, SSM, diarisation, souveraineté, lock-in, et bien d'autres."
                : "The glossary explains the 30+ technical terms used in this portal: WER, TTFA, ELO, SSM, diarization, sovereignty, lock-in, and many more."}
            </p>
          </div>
          <InternalLink
            to="/glossary"
            className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: "oklch(0.55 0.20 200)", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {isFr ? "Voir le glossaire →" : "View glossary →"}
          </InternalLink>
        </div>
      </div>
    </div>
  );
}
