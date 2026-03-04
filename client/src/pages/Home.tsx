/*
 * Home — DigiDouble Research Portal
 * Design: Technical Blueprint, Space Grotesk, sections numérotées
 * Hero sobre avec résumé du projet, liens vers les sections clés
 */
import { Link } from "wouter";
import { ArrowRight, Cpu, Brain, Layers, Zap, BookOpen, BarChart2 } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

const quickLinks = [
  {
    href: "/project",
    icon: BookOpen,
    number: "01",
    title: "Contexte & Vision",
    desc: "Deux projets fondateurs, architecture produit, positionnement compétitif.",
    accent: "oklch(0.72 0.18 200)",
  },
  {
    href: "/research",
    icon: Brain,
    number: "02",
    title: "Défis de Recherche",
    desc: "Axes IDIAP : mémoire conversationnelle, avatar expressif, orchestration.",
    accent: "oklch(0.72 0.18 50)",
  },
  {
    href: "/state-of-art",
    icon: BarChart2,
    number: "03",
    title: "État de l'Art",
    desc: "Solutions existantes, benchmarks de latence, enjeux technologiques.",
    accent: "oklch(0.65 0.18 145)",
  },
];

const keyFacts = [
  { label: "Latence actuelle", value: "15–40s", unit: "par échange", variant: "gap" as const },
  { label: "Latence cible", value: "<2s", unit: "end-to-end", variant: "target" as const },
  { label: "Réduction requise", value: "10–20×", unit: "amélioration", variant: "rd" as const },
  { label: "Streams parallèles", value: "5", unit: "synchronisés", variant: "available" as const },
];

const researchAxes = [
  {
    id: "AX1",
    title: "Mémoire Conversationnelle",
    researcher: "Dr. Elena Epure",
    group: "Language & Information Technologies",
    challenge: "Cohérence sur sessions 1h+ sans explosion des tokens",
    color: "oklch(0.72 0.18 200)",
  },
  {
    id: "AX2",
    title: "Avatar Expressif & TTS",
    researcher: "Dr. Mathew Magimai-Doss",
    group: "Speech & Audio Processing",
    challenge: "Génération temps réel avec langage corporel et voix personnalisée",
    color: "oklch(0.72 0.18 50)",
  },
  {
    id: "AX3",
    title: "Orchestration Déterministe-Organique",
    researcher: "Équipe interne",
    group: "Architecture",
    challenge: "Équilibre contraintes narratives / liberté conversationnelle IA",
    color: "oklch(0.65 0.18 145)",
  },
  {
    id: "AX4",
    title: "Synchronisation Multi-Flux",
    researcher: "Memoways",
    group: "Ingénierie interne",
    challenge: "Coordination 5 streams <100ms désynchronisation",
    color: "oklch(0.5 0.015 265)",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-12 border-b border-slate-200">
        <div className="container">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-xs font-semibold tracking-widest text-slate-400 uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Research Portal
              </span>
              <span className="text-slate-200">·</span>
              <StatusBadge variant="rd" label="INNOSUISSE / IDIAP" />
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}
            >
              DigiDouble
            </h1>
            <p
              className="text-xl text-slate-600 mb-3 leading-relaxed max-w-3xl"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              Plateforme de création d'expériences conversationnelles interactives avec avatars vidéo — combinant dialogue IA temps réel, génération d'avatar photorealistic et séquençage cinématographique intelligent.
            </p>
            <p
              className="text-base text-slate-500 mb-8 max-w-2xl"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              Ce portail documente les défis de recherche fondamentale pour la collaboration Memoways × Gamilab × IDIAP, dans le cadre d'un projet Innosuisse.
            </p>

            {/* Key metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {keyFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="border border-slate-200 rounded p-3 bg-white"
                >
                  <div
                    className="text-2xl font-bold mb-0.5"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: fact.variant === "gap" ? "oklch(0.60 0.20 25)"
                        : fact.variant === "target" ? "oklch(0.65 0.18 145)"
                        : fact.variant === "rd" ? "oklch(0.72 0.18 200)"
                        : "oklch(0.45 0.18 145)",
                    }}
                  >
                    {fact.value}
                  </div>
                  <div className="text-xs text-slate-500 font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {fact.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {fact.unit}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/project"
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                style={{ background: "oklch(0.72 0.18 200)", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Découvrir le projet
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/state-of-art"
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold text-slate-700 border border-slate-300 bg-white no-underline hover:bg-slate-50 transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                État de l'art
                <BarChart2 size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick navigation */}
      <section className="py-12 border-b border-slate-200">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group border border-slate-200 rounded p-5 bg-white hover:border-slate-300 hover:shadow-sm transition-all no-underline"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center"
                      style={{ background: `${link.accent}18` }}
                    >
                      <Icon size={16} style={{ color: link.accent }} />
                    </div>
                    <span
                      className="text-xs font-bold"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: `${link.accent}60` }}
                    >
                      {link.number}
                    </span>
                  </div>
                  <h3
                    className="font-semibold text-slate-900 mb-1.5 group-hover:text-slate-700"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9375rem" }}
                  >
                    {link.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {link.desc}
                  </p>
                  <div
                    className="flex items-center gap-1 mt-3 text-xs font-medium"
                    style={{ color: link.accent, fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Lire
                    <ArrowRight size={12} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Research Axes Overview */}
      <section className="py-12 border-b border-slate-200">
        <div className="container">
          <div className="flex items-baseline gap-3 mb-6">
            <span
              className="text-3xl font-bold"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 200 / 0.2)" }}
            >
              00
            </span>
            <h2
              className="text-xl font-semibold text-slate-900"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
            >
              Axes de Recherche
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Axe</th>
                  <th>Défi</th>
                  <th>Chercheur</th>
                  <th>Groupe IDIAP</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {researchAxes.map((ax) => (
                  <tr key={ax.id}>
                    <td>
                      <span
                        className="font-bold text-xs"
                        style={{ fontFamily: "'JetBrains Mono', monospace", color: ax.color }}
                      >
                        {ax.id}
                      </span>
                      <div className="font-medium text-slate-900 mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {ax.title}
                      </div>
                    </td>
                    <td className="text-slate-600 max-w-xs" style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.875rem" }}>
                      {ax.challenge}
                    </td>
                    <td className="text-slate-700 font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem" }}>
                      {ax.researcher}
                    </td>
                    <td className="text-slate-500 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {ax.group}
                    </td>
                    <td>
                      {ax.id === "AX1" || ax.id === "AX2"
                        ? <StatusBadge variant="rd" label="PRIMAIRE" />
                        : ax.id === "AX3"
                        ? <StatusBadge variant="rd" label="SECONDAIRE" />
                        : <StatusBadge variant="internal" label="INTERNE" />
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* The Gap */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-baseline gap-3 mb-6">
              <span
                className="text-3xl font-bold"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.60 0.20 25 / 0.25)" }}
              >
                !!
              </span>
              <h2
                className="text-xl font-semibold text-slate-900"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
              >
                Le Problème en 30 Secondes
              </h2>
            </div>

            <div className="callout-danger mb-4">
              <p
                className="text-slate-800 font-medium mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Aucune solution existante ne combine :
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "Dialogue IA conversationnel temps réel",
                  "Génération d'avatar photorealistic",
                  "Séquençage vidéo intelligent",
                  "Contrôle narratif / pédagogique",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span style={{ color: "oklch(0.60 0.20 25)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", marginTop: "2px" }}>✗</span>
                    <span className="text-sm text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item}</span>
                  </div>
                ))}
              </div>
              <p
                className="text-sm text-slate-600 mt-3 italic"
                style={{ fontFamily: "'Source Serif 4', serif" }}
              >
                — dans une expérience coordonnée unique, souveraine et configurable par des créateurs non-techniques.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <div className="callout-success">
                <div className="flex items-center gap-1.5 mb-1">
                  <StatusBadge variant="available" />
                </div>
                <p className="text-xs text-slate-600 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Pipeline ASR→STT souverain (Audiogami) + expertise multi-stream (Memoways, 14 ans)
                </p>
              </div>
              <div className="callout-danger">
                <div className="flex items-center gap-1.5 mb-1">
                  <StatusBadge variant="gap" />
                </div>
                <p className="text-xs text-slate-600 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Orchestration, mémoire long-terme, synthèse avatar temps réel, TTS expressif personnalisé
                </p>
              </div>
              <div className="callout-info">
                <div className="flex items-center gap-1.5 mb-1">
                  <StatusBadge variant="rd" />
                </div>
                <p className="text-xs text-slate-600 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Recherche fondamentale IDIAP sur les axes 1 et 2, avec publications et datasets ouverts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
