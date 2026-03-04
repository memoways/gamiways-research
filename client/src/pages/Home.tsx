/*
 * Home — DigiDouble Research Portal
 * Design: Technical Blueprint, Space Grotesk, numbered sections
 * i18n: EN (default) / FR via LangContext
 */
import { Link } from "wouter";
import { ArrowRight, Brain, BookOpen, BarChart2 } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import PipelineDiagram from "@/components/diagrams/PipelineDiagram";
import { useLang } from "@/contexts/LangContext";

export default function Home() {
  const { t } = useLang();

  const quickLinks = [
    {
      href: "/project",
      icon: BookOpen,
      number: "01",
      title: t("home.nav.01.title"),
      desc: t("home.nav.01.desc"),
      accent: "oklch(0.72 0.18 200)",
    },
    {
      href: "/research",
      icon: Brain,
      number: "02",
      title: t("home.nav.02.title"),
      desc: t("home.nav.02.desc"),
      accent: "oklch(0.72 0.18 50)",
    },
    {
      href: "/state-of-art",
      icon: BarChart2,
      number: "03",
      title: t("home.nav.03.title"),
      desc: t("home.nav.03.desc"),
      accent: "oklch(0.65 0.18 145)",
    },
  ];

  const keyFacts = [
    { label: t("home.metric.latency_current"), value: "15–40s", unit: t("home.metric.latency_current_sub"), variant: "gap" as const },
    { label: t("home.metric.latency_target"), value: "<2s", unit: t("home.metric.latency_target_sub"), variant: "target" as const },
    { label: t("home.metric.reduction"), value: "10–20×", unit: t("home.metric.reduction_sub"), variant: "rd" as const },
    { label: t("home.metric.streams"), value: "5", unit: t("home.metric.streams_sub"), variant: "available" as const },
  ];

  const researchAxes = [
    {
      id: "AX1",
      title: t("research.s2.title"),
      researcher: "Dr. Elena Epure",
      group: "Language & Information Technologies",
      challenge: t("research.mem.gap.title"),
      color: "oklch(0.72 0.18 200)",
      statusLabel: "PRIMARY",
      statusVariant: "rd" as const,
    },
    {
      id: "AX2",
      title: t("research.s3.title"),
      researcher: "Dr. Mathew Magimai-Doss",
      group: "Speech & Audio Processing",
      challenge: t("research.avatar.gap.title"),
      color: "oklch(0.72 0.18 50)",
      statusLabel: "PRIMARY",
      statusVariant: "rd" as const,
    },
    {
      id: "AX3",
      title: "Deterministic-Organic Orchestration",
      researcher: "Internal team",
      group: "Architecture",
      challenge: "Balance narrative constraints / AI conversational freedom",
      color: "oklch(0.65 0.18 145)",
      statusLabel: "SECONDARY",
      statusVariant: "rd" as const,
    },
    {
      id: "AX4",
      title: "Multi-Stream Synchronization",
      researcher: "Memoways",
      group: "Internal Engineering",
      challenge: "Coordinate 5 streams <100ms desync",
      color: "oklch(0.5 0.015 265)",
      statusLabel: "INTERNAL",
      statusVariant: "internal" as const,
    },
  ];

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
                {t("home.label")}
              </span>
              <span className="text-slate-200">·</span>
              <StatusBadge variant="rd" label={t("home.badge")} />
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}
            >
              {t("home.title")}
            </h1>
            <p
              className="text-xl text-slate-600 mb-3 leading-relaxed max-w-3xl"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              {t("home.tagline")}
            </p>
            <p
              className="text-base text-slate-500 mb-8 max-w-2xl"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              {t("home.desc")}
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
                {t("home.cta.project")}
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/state-of-art"
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold text-slate-700 border border-slate-300 bg-white no-underline hover:bg-slate-50 transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {t("home.cta.sota")}
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
                    {t("nav.home") === "Accueil" ? "Lire" : "Read"}
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
              {t("nav.home") === "Accueil" ? "Axes de Recherche" : "Research Axes"}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t("nav.home") === "Accueil" ? "Axe" : "Axis"}</th>
                  <th>{t("nav.home") === "Accueil" ? "Défi" : "Challenge"}</th>
                  <th>{t("nav.home") === "Accueil" ? "Chercheur" : "Researcher"}</th>
                  <th>{t("nav.home") === "Accueil" ? "Groupe IDIAP" : "IDIAP Group"}</th>
                  <th>{t("nav.home") === "Accueil" ? "Statut" : "Status"}</th>
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
                      <StatusBadge variant={ax.statusVariant} label={ax.statusLabel} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pipeline Diagram */}
      <section className="py-12 border-b border-slate-200">
        <div className="container">
          <div className="flex items-baseline gap-3 mb-5">
            <span
              className="text-3xl font-bold"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 200 / 0.2)" }}
            >
              →
            </span>
            <div>
              <h2
                className="text-xl font-semibold text-slate-900"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
              >
                {t("home.pipeline.title")}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {t("home.pipeline.desc")}
              </p>
            </div>
          </div>
          <div className="border border-slate-200 rounded p-4 bg-white">
            <PipelineDiagram />
          </div>
        </div>
      </section>

      {/* The Gap */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-baseline gap-3 mb-6">
              <span
                className="text-xs font-bold tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.60 0.20 25)" }}
              >
                {t("home.gap.label")}
              </span>
            </div>
            <h2
              className="text-2xl font-semibold text-slate-900 mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
            >
              {t("home.gap.title")}
            </h2>
            <p
              className="text-base text-slate-600 leading-relaxed mb-4"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              {t("home.gap.body")}
            </p>
            <div className="border-l-2 pl-4 py-1" style={{ borderColor: "oklch(0.72 0.18 200)" }}>
              <p
                className="text-sm text-slate-500 leading-relaxed italic"
                style={{ fontFamily: "'Source Serif 4', serif" }}
              >
                {t("home.gap.challenge")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
