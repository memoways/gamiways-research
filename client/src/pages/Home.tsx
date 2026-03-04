/*
 * Home — DigiDouble Research Portal
 * Design: Technical Blueprint, schema-first, 7 scrollable sections
 * Sections: Hero → Problem (Before/After) → Platform → Research Axes → Gap Matrix → Tech Stack → Navigation
 * Details in accordion/toggle, diagrams first
 * i18n: EN (default) / FR via LangContext
 */
import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, ChevronUp, ArrowRight, BarChart2, BookOpen, Layers } from "lucide-react";
import BeforeAfterDiagram from "@/components/diagrams/BeforeAfterDiagram";
import ResearchAxesDiagram from "@/components/diagrams/ResearchAxesDiagram";
import TechStackDiagram from "@/components/diagrams/TechStackDiagram";
import GapMatrixDiagram from "@/components/diagrams/GapMatrixDiagram";
import PlatformModeDiagram from "@/components/diagrams/PlatformModeDiagram";
import { useLang } from "@/contexts/LangContext";

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

function ToggleBlock({ label, labelFr, children, isFr }: { label: string; labelFr: string; children: React.ReactNode; isFr: boolean }) {
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
        <div className="px-4 pb-4 border-t border-slate-100">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { lang, t } = useLang();
  const isFr = lang === "fr";

  return (
    <div className="min-h-screen pt-16">

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────────── */}
      <section className="border-b border-slate-200 py-14">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              {isFr ? "RESEARCH PORTAL" : "RESEARCH PORTAL"}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded border" style={{ borderColor: "oklch(0.72 0.18 200 / 0.4)", color: "oklch(0.45 0.18 200)", background: "oklch(0.97 0.02 200)" }}>
              INNOSUISSE / IDIAP
            </span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.04em" }}>
            DigiDouble
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-6" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Plateforme de création d'expériences conversationnelles interactives avec avatars vidéo — dialogue IA temps réel, génération d'avatar photorealistic, séquençage cinématographique intelligent."
              : "Platform for creating interactive conversational experiences with video avatars — real-time AI dialogue, photorealistic avatar generation, intelligent cinematographic sequencing."}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <Link href="/project">
              <button className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium text-white transition-colors" style={{ background: "oklch(0.45 0.18 200)", fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Découvrir le projet" : "Discover the project"}
                <ArrowRight size={14} />
              </button>
            </Link>
            <Link href="/state-of-art">
              <button className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium border border-slate-300 text-slate-600 hover:border-slate-400 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "État de l'art" : "State of the Art"}
                <BarChart2 size={14} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <div className="container max-w-4xl py-14 space-y-20">

        {/* ── SECTION 2: THE PROBLEM ──────────────────────────────────────────── */}
        <section>
          <SectionDivider number="01" title="The Problem" titleFr="Le Problème" isFr={isFr} />
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "6–12 secondes de latence. La cible : moins de 2 secondes." : "6–12 seconds of latency. The target: under 2 seconds."}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Chaque échange conversationnel avec un avatar vidéo prend actuellement 6 à 12 secondes. Le goulot est la génération vidéo. La recherche vise une réduction de 6 à 10×."
                : "Each conversational exchange with a video avatar currently takes 6 to 12 seconds. The bottleneck is video generation. Research targets a 6–10× reduction."}
            </p>
          </div>

          <BeforeAfterDiagram lang={lang} />

          <ToggleBlock label="Why is avatar generation the bottleneck?" labelFr="Pourquoi la génération avatar est le goulot ?" isFr={isFr}>
            <div className="pt-3 space-y-2">
              {(isFr ? [
                "La génération vidéo avatar repose sur des modèles de diffusion frame-by-frame — chaque frame est générée séquentiellement.",
                "Les modèles actuels (HeyGem OS) nécessitent 5–10 secondes sur GPU pour produire quelques secondes de vidéo.",
                "Les solutions commerciales rapides (<100ms) comme NVIDIA ACE ou Beyond Presence nécessitent une infrastructure propriétaire coûteuse.",
                "L'objectif R&D : distillation du modèle de diffusion + cache intelligent + dégradation gracieuse pour atteindre <500ms sur GPU souverain.",
              ] : [
                "Avatar video generation relies on frame-by-frame diffusion models — each frame is generated sequentially.",
                "Current models (HeyGem OS) require 5–10 seconds on GPU to produce a few seconds of video.",
                "Fast commercial solutions (<100ms) like NVIDIA ACE or Beyond Presence require costly proprietary infrastructure.",
                "R&D goal: diffusion model distillation + intelligent cache + graceful degradation to reach <500ms on sovereign GPU.",
              ]).map((item, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-xs shrink-0 mt-0.5" style={{ color: "oklch(0.60 0.20 25)" }}>·</span>
                  <span className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </ToggleBlock>
        </section>

        {/* ── SECTION 3: THE PLATFORM ─────────────────────────────────────────── */}
        <section>
          <SectionDivider number="02" title="The Platform" titleFr="La Plateforme" isFr={isFr} />
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Deux modes d'expérience, un moteur partagé." : "Two experience modes, one shared engine."}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "DigiDouble sert deux marchés (EdTech et cinéma interactif) via le même moteur technique. Hover sur les composants pour les détails."
                : "DigiDouble serves two markets (EdTech and interactive cinema) via the same technical engine. Hover over components for details."}
            </p>
          </div>

          <PlatformModeDiagram lang={lang} />

          <ToggleBlock label="Analogy: what DigiDouble is NOT" labelFr="Analogie : ce que DigiDouble n'est PAS" isFr={isFr}>
            <div className="pt-3">
              <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? "HeyGen/Synthesia = iMovie (simple, limité, pré-rendu). Flowise + custom = Final Cut XML (puissant mais complexe, réservé aux développeurs). DigiDouble = Final Cut Pro (puissant ET utilisable par des créateurs non-techniques, avec contrôle narratif et pédagogique)."
                  : "HeyGen/Synthesia = iMovie (simple, limited, pre-render). Flowise + custom = Final Cut XML (powerful but complex, developer-only). DigiDouble = Final Cut Pro (powerful AND usable by non-technical creators, with narrative and pedagogical control)."}
              </p>
            </div>
          </ToggleBlock>
        </section>

        {/* ── SECTION 4: RESEARCH AXES ────────────────────────────────────────── */}
        <section>
          <SectionDivider number="03" title="3 Research Axes" titleFr="3 Axes de Recherche" isFr={isFr} />
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Les défis fondamentaux pour l'IDIAP." : "The fundamental challenges for IDIAP."}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Ces trois axes ne sont pas des problèmes d'ingénierie — ils nécessitent des avancées en recherche fondamentale. Cliquer sur un axe pour les détails."
                : "These three axes are not engineering problems — they require advances in fundamental research. Click an axis for details."}
            </p>
          </div>

          <ResearchAxesDiagram lang={lang} />

          <ToggleBlock label="Why this is not just engineering" labelFr="Pourquoi ce n'est pas juste de l'ingénierie" isFr={isFr}>
            <div className="pt-3 space-y-2">
              {(isFr ? [
                "Latence : les architectures de diffusion actuelles sont fondamentalement séquentielles. Une réduction 10× nécessite de nouvelles approches de distillation et de génération conditionnelle.",
                "Mémoire : la gestion de la cohérence sur des sessions longues avec des avatars personnalisés est un problème ouvert — aucune solution production-grade n'existe.",
                "Fidélité comportementale : extraire et reproduire l'empreinte comportementale individuelle (micro-expressions, gestes, rythme) depuis des archives vidéo est un problème de recherche actif.",
              ] : [
                "Latency: current diffusion architectures are fundamentally sequential. A 10× reduction requires new distillation and conditional generation approaches.",
                "Memory: managing coherence over long sessions with personalized avatars is an open problem — no production-grade solution exists.",
                "Behavioral fidelity: extracting and reproducing individual behavioral fingerprints (micro-expressions, gestures, rhythm) from video archives is an active research problem.",
              ]).map((item, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-xs shrink-0 mt-0.5 font-bold font-mono" style={{ color: "oklch(0.72 0.18 200)" }}>0{i + 1}</span>
                  <span className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </ToggleBlock>
        </section>

        {/* ── SECTION 5: THE GAP ──────────────────────────────────────────────── */}
        <section>
          <SectionDivider number="04" title="The Gap" titleFr="Le Gap" isFr={isFr} />
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Aucune solution existante ne combine les 5 critères." : "No existing solution combines all 5 criteria."}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Hover sur les cellules pour les détails. DigiDouble (ligne du bas) cible les 5 critères — certains via R&D."
                : "Hover over cells for details. DigiDouble (bottom row) targets all 5 criteria — some via R&D."}
            </p>
          </div>

          <GapMatrixDiagram lang={lang} />

          <ToggleBlock label="Why this gap justifies fundamental research" labelFr="Pourquoi ce gap justifie la recherche fondamentale" isFr={isFr}>
            <div className="pt-3">
              <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? "La combinaison unique que vise DigiDouble — temps réel + fidélité comportementale + souveraineté + mémoire conversationnelle + contrôle narratif — n'existe dans aucune solution commerciale ou open-source actuelle. Les trois critères marqués R&D correspondent précisément aux frontières de la recherche académique actuelle (NeurIPS 2024, arXiv 2025–2026), ce qui justifie pleinement une collaboration avec l'IDIAP dans le cadre d'Innosuisse."
                  : "The unique combination DigiDouble targets — real-time + behavioral fidelity + sovereignty + conversational memory + narrative control — does not exist in any current commercial or open-source solution. The three R&D criteria correspond precisely to the frontiers of current academic research (NeurIPS 2024, arXiv 2025–2026), fully justifying a collaboration with IDIAP within the Innosuisse framework."}
              </p>
            </div>
          </ToggleBlock>
        </section>

        {/* ── SECTION 6: TECH STACK ───────────────────────────────────────────── */}
        <section>
          <SectionDivider number="05" title="Technology Stack" titleFr="Stack Technologique" isFr={isFr} />
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Architecture cible — souveraine, open-source, temps réel." : "Target architecture — sovereign, open-source, real-time."}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Hover sur chaque couche pour la justification technique. La couche Avatar est le seul composant nécessitant R&D fondamentale."
                : "Hover over each layer for technical justification. The Avatar layer is the only component requiring fundamental R&D."}
            </p>
          </div>

          <TechStackDiagram lang={lang} />
        </section>

        {/* ── SECTION 7: NAVIGATION ───────────────────────────────────────────── */}
        <section>
          <SectionDivider number="06" title="Portal Navigation" titleFr="Navigation du Portail" isFr={isFr} />
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                number: "01",
                icon: <BookOpen size={18} />,
                href: "/project",
                title: isFr ? "Contexte & Vision" : "Context & Vision",
                desc: isFr ? "Projets fondateurs, architecture produit, analyse compétitive." : "Founding projects, product architecture, competitive analysis.",
                color: "oklch(0.72 0.18 200)",
              },
              {
                number: "02",
                icon: <Layers size={18} />,
                href: "/research",
                title: isFr ? "Défis de Recherche" : "Research Challenges",
                desc: isFr ? "Axes IDIAP : latence, mémoire conversationnelle, avatar expressif." : "IDIAP axes: latency, conversational memory, expressive avatar.",
                color: "oklch(0.60 0.20 25)",
              },
              {
                number: "03",
                icon: <BarChart2 size={18} />,
                href: "/state-of-art",
                title: isFr ? "État de l'Art" : "State of the Art",
                desc: isFr ? "Comparatif outils, benchmarks latence, gaps de recherche, opportunités." : "Tool comparison, latency benchmarks, research gaps, opportunities.",
                color: "oklch(0.65 0.18 145)",
              },
            ].map((card) => (
              <Link key={card.href} href={card.href}>
                <div
                  className="border border-slate-200 rounded-lg p-5 hover:border-slate-300 hover:shadow-sm transition-all duration-150 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span style={{ color: card.color }}>{card.icon}</span>
                      <span className="text-xs font-mono text-slate-400">{card.number}</span>
                    </div>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </div>
                  <div className="font-bold text-slate-900 text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {card.title}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {card.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
