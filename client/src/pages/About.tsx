/*
 * About.tsx — DigiDouble Research Portal
 * Page: About this portal — purpose, editorial philosophy, structure
 * Design: Technical Blueprint
 * i18n: EN / FR via LangContext
 */
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import { Home, ChevronRight, BookOpen, Mic, Video, FlaskConical, BarChart2, Info } from "lucide-react";

export default function About() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100 sticky top-14 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-1 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <InternalLink to="/" className="text-slate-400 hover:text-slate-700 transition-colors" aria-label={isFr ? "Accueil" : "Home"}><Home size={12} /></InternalLink>
          <ChevronRight size={11} className="text-slate-300" />
          <span className="font-semibold" style={{ color: "oklch(0.45 0.15 200)" }}>{isFr ? "À propos" : "About"}</span>
          <div className="ml-auto">
            <InternalLink to="/glossary" className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ background: "oklch(0.55 0.20 200 / 0.1)", color: "oklch(0.45 0.15 200)" }}>
              {isFr ? "→ Glossaire" : "→ Glossary"}
            </InternalLink>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-baseline gap-3 mb-2">
            <h2 className="text-2xl font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "À propos de ce portail" : "About this portal"}
            </h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr
              ? "DigiDouble Research Portal — un site de référence indépendant sur l'état de l'art des pipelines vocaux et des avatars vidéo conversationnels."
              : "DigiDouble Research Portal — an independent reference site on the state of the art in voice pipelines and conversational video avatars."}
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
                ? "Ce portail documente l'état de l'art des technologies de synthèse vocale (STT, TTS) et des avatars vidéo conversationnels en 2025–2026. Il a été créé dans le cadre du projet DigiDouble — un projet de recherche Innosuisse visant à créer un avatar conversationnel photoréaliste à partir d'archives vidéo existantes — mais son contenu est conçu pour être utile à tout projet impliquant ces technologies."
                : "This portal documents the state of the art in speech synthesis technologies (STT, TTS) and conversational video avatars in 2025–2026. It was created in the context of the DigiDouble project — an Innosuisse research project aiming to create a photorealistic conversational avatar from existing video archives — but its content is designed to be useful for any project involving these technologies."}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Le portail couvre 10 moteurs STT, 16 moteurs TTS et 11+ plateformes d'avatars vidéo, avec des benchmarks, des analyses stratégiques, des outils de décision interactifs et des cadres d'évaluation. Il est mis à jour régulièrement pour refléter l'évolution rapide du marché."
                : "The portal covers 10 STT engines, 16 TTS engines, and 11+ video avatar platforms, with benchmarks, strategic analyses, interactive decision tools, and evaluation frameworks. It is regularly updated to reflect the rapidly evolving market."}
            </p>
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
                ? "Ce portail ne recommande pas de solutions spécifiques. Il présente des options, des métriques, des questions à se poser et des cadres de décision. L'objectif est d'aider les équipes à comprendre le paysage technologique et à prendre des décisions éclairées en fonction de leurs contraintes propres — souveraineté des données, budget, latence, expertise technique."
                : "This portal does not recommend specific solutions. It presents options, metrics, questions to ask, and decision frameworks. The goal is to help teams understand the technology landscape and make informed decisions based on their own constraints — data sovereignty, budget, latency, technical expertise."}
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
                  desc: isFr ? "Aucun partenariat commercial. Les données sont issues de benchmarks publics et de tests indépendants." : "No commercial partnerships. Data comes from public benchmarks and independent tests.",
                },
                {
                  icon: "🔄",
                  title: isFr ? "Mise à jour continue" : "Continuous updates",
                  desc: isFr ? "Le marché évolue vite. Ce portail est mis à jour pour refléter les nouvelles sorties et les changements de prix." : "The market moves fast. This portal is updated to reflect new releases and pricing changes.",
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
            <BarChart2 size={16} style={{ color: "oklch(0.55 0.20 200)" }} />
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
                  ? "Contexte et vision du projet DigiDouble : objectifs, défis de recherche, architecture cible, gaps identifiés et état de l'art académique. Contenu spécifique au projet DigiDouble."
                  : "Context and vision of the DigiDouble project: objectives, research challenges, target architecture, identified gaps, and academic state of the art. DigiDouble-specific content.",
                href: "/project",
              },
              {
                icon: Mic,
                color: "oklch(0.55 0.20 200)",
                section: isFr ? "Voice Pipeline" : "Voice Pipeline",
                desc: isFr
                  ? "Comparatifs STT (10 moteurs) et TTS (16 moteurs), benchmarks de synthèse audio, cadre de décision par couche, scoring personnalisé et diagramme pipeline V2V interactif. Utile pour tout projet vocal, indépendamment de DigiDouble."
                  : "STT (10 engines) and TTS (16 engines) comparisons, audio synthesis benchmarks, layer-by-layer decision framework, custom scoring, and interactive V2V pipeline diagram. Useful for any voice project, independently of DigiDouble.",
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
                  ? "Présentation du portail (cette page) et glossaire des termes techniques utilisés dans le portail."
                  : "Portal presentation (this page) and glossary of technical terms used in the portal.",
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

        {/* Technical context */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <FlaskConical size={16} style={{ color: "oklch(0.55 0.20 200)" }} />
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Contexte technique" : "Technical context"}
            </h3>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <p className="text-sm text-slate-700 leading-relaxed mb-4" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Le projet DigiDouble est un projet de recherche Innosuisse mené par le laboratoire IDIAP (Institut de Recherche en Intelligence Artificielle Perceptive) en partenariat avec Memoways et Gamilab. L'objectif est de créer un avatar conversationnel photoréaliste d'une personne à partir de ses archives vidéo existantes, capable d'interagir en temps réel avec des utilisateurs."
                : "The DigiDouble project is an Innosuisse research project led by the IDIAP laboratory (Institute for Perceptual Artificial Intelligence) in partnership with Memoways and Gamilab. The goal is to create a photorealistic conversational avatar of a person from their existing video archives, capable of interacting in real time with users."}
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: isFr ? "Partenaire recherche" : "Research partner", value: "IDIAP" },
                { label: isFr ? "Partenaires industriels" : "Industry partners", value: "Memoways, Gamilab" },
                { label: isFr ? "Financement" : "Funding", value: "Innosuisse" },
                { label: isFr ? "Démarrage prévu" : "Expected start", value: isFr ? "Automne 2026" : "Autumn 2026" },
                { label: isFr ? "Moteurs STT couverts" : "STT engines covered", value: "10" },
                { label: isFr ? "Moteurs TTS couverts" : "TTS engines covered", value: "16" },
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
