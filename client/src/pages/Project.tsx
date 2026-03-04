/*
 * Project — DigiDouble Research Portal
 * Page: Contexte & Vision du projet
 * Design: Technical Blueprint, sections numérotées, tableaux comparatifs
 */
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";
import { CheckCircle, AlertCircle } from "lucide-react";
import ProductArchDiagram from "@/components/diagrams/ProductArchDiagram";
import RadarCompareDiagram from "@/components/diagrams/RadarCompareDiagram";

const competitiveData = [
  {
    criterion: "Avatars temps réel",
    heygen: { value: "✓✓✓", level: 3 },
    synthesia: { value: "✗", level: 0 },
    flowise: { value: "✓ (OS)", level: 1 },
    digidouble: { value: "✓✓✓ (R&D)", level: 3, rd: true },
  },
  {
    criterion: "Langage corporel",
    heygen: { value: "✓", level: 1 },
    synthesia: { value: "✗", level: 0 },
    flowise: { value: "✗", level: 0 },
    digidouble: { value: "✓✓✓ (R&D)", level: 3, rd: true },
  },
  {
    criterion: "Sync multi-stream",
    heygen: { value: "✗", level: 0 },
    synthesia: { value: "✗", level: 0 },
    flowise: { value: "✓", level: 2 },
    digidouble: { value: "✓✓✓", level: 3 },
  },
  {
    criterion: "Mémoire conversationnelle",
    heygen: { value: "✗", level: 0 },
    synthesia: { value: "✗", level: 0 },
    flowise: { value: "✓", level: 2 },
    digidouble: { value: "✓✓✓ (R&D)", level: 3, rd: true },
  },
  {
    criterion: "Éditeur nœuds",
    heygen: { value: "✗", level: 0 },
    synthesia: { value: "✗", level: 0 },
    flowise: { value: "✓ (tech)", level: 1 },
    digidouble: { value: "✓✓✓", level: 3 },
  },
  {
    criterion: "Souveraineté données",
    heygen: { value: "✗", level: 0 },
    synthesia: { value: "✗", level: 0 },
    flowise: { value: "✓ (self)", level: 2 },
    digidouble: { value: "✓✓✓", level: 3 },
  },
  {
    criterion: "Risque censure",
    heygen: { value: "Élevé", level: 0 },
    synthesia: { value: "Élevé", level: 0 },
    flowise: { value: "Élevé", level: 0 },
    digidouble: { value: "Nul (souverain)", level: 3 },
  },
];

const projects = [
  {
    id: "P1",
    name: "Le Dilemme Plastique",
    type: "EdTech",
    period: "2023–présent",
    desc: "Outil éducatif sur la pollution plastique océanique. Les étudiants conversent avec un avatar IA 'Peter' qui guide à travers des sujets de sciences environnementales, affichant des clips documentaires et images pendant la conversation.",
    versions: [
      { v: "V1 (2023)", desc: "8 apps no-code, chemin linéaire déterministe → trop rigide" },
      { v: "V2 (2024)", desc: "Pivot IA générative (GPT-4 + Flowise + ElevenLabs) → conversation naturelle, mais latence 15–40s" },
      { v: "2025", desc: "Expert pédagogique Jérémy Argyriades (PhD physique) rejoint pour structurer les interactions" },
    ],
    learnings: [
      "Orchestration multi-services : fragile et lente",
      "Curation de contenu pour RAG : critique",
      "Latence et synchronisation : blocages UX primaires",
      "Flowise : outil le plus proche de la vision produit",
    ],
    validation: [
      { metric: "Enseignants interviewés", value: "11" },
      { metric: "Veulent expérimenter", value: "100%" },
      { metric: "Utilisent déjà l'IA", value: "78%" },
      { metric: "Veulent tester le proto", value: "78%" },
      { metric: "Satisfaction outils actuels", value: "6.9/10" },
    ],
    color: "oklch(0.72 0.18 200)",
  },
  {
    id: "P2",
    name: "Parle à AVA!",
    type: "Cinéma interactif",
    period: "2024–présent",
    desc: "Expérience narrative interactive permettant aux spectateurs de converser avec des personnages du film dystopique 'Où est AVA?' de Romed Wyder. Les spectateurs dialoguent avec des avatars photorealistic de personnages du film.",
    versions: [
      { v: "Incident censure", desc: "OpenAI a bloqué l'accès API pour mots-clés sensibles dans un contexte purement artistique → pivot vers open-source et infrastructure européenne" },
      { v: "Solution souveraine", desc: "Partenariat Exoscale (cloud GPU suisse), déploiement HeyGem open-source en Docker. Gain 30% performance avec Arch Linux vs Ubuntu." },
    ],
    learnings: [
      "Plateformes commerciales : censure arbitraire — infrastructure souveraine non-négociable",
      "Fine-tuning personnage : nécessite des milliers d'exemples de dialogue",
      "Latence temps réel : goulot d'étranglement critique",
      "Absence de langage corporel : artificialité perceptible",
    ],
    validation: [],
    color: "oklch(0.72 0.18 50)",
  },
];

const techStack = [
  { name: "Audiogami ASR→STT", status: "available", desc: "Pipeline production, API + SDK, hébergé en Suisse, HITL optionnel" },
  { name: "Partenariat Exoscale", status: "available", desc: "Cloud GPU suisse pour déploiement IA open-source souverain" },
  { name: "Deux prototypes fonctionnels", status: "available", desc: "Testés avec utilisateurs réels, retours documentés" },
  { name: "NocoDB self-hosted", status: "available", desc: "Base de données contenu avec métadonnées riches" },
  { name: "Expertise Flowise", status: "available", desc: "Orchestration multi-agents, intégration RAG" },
  { name: "Mémoire conversationnelle", status: "gap", desc: "Architecture pour sessions longue durée sans explosion tokens" },
  { name: "Avatar expressif temps réel", status: "gap", desc: "Génération <500ms avec langage corporel et cohérence comportementale" },
  { name: "TTS prosodique personnalisé", status: "gap", desc: "Capture de l'empreinte prosodique individuelle" },
];

function LevelDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            background: i <= level
              ? level === 3 ? "oklch(0.65 0.18 145)" : "oklch(0.72 0.18 200)"
              : "oklch(0.88 0.006 265)",
          }}
        />
      ))}
    </div>
  );
}

export default function Project() {
  return (
    <div className="min-h-screen pt-20">
      {/* Page header */}
      <div className="border-b border-slate-200 py-8">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">01</span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-mono text-slate-400">Contexte & Vision</span>
            </div>
            <h1
              className="text-3xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.025em" }}
            >
              Projet DigiDouble
            </h1>
            <p
              className="text-base text-slate-600 leading-relaxed"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              DigiDouble est une collaboration entre <strong>Memoways</strong> (Genève, 14 ans d'expertise en vidéo interactive) et <strong>Gamilab</strong> (startup voice-first AI, SDK Audiogami). Ce document présente le contexte, les projets fondateurs et le positionnement compétitif.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">

        {/* Projets fondateurs */}
        <section className="mb-16">
          <SectionHeader
            number="01"
            title="Projets Fondateurs"
            subtitle="Deux expériences de terrain qui ont défini les défis techniques et validé le marché."
            accent="cyan"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="border border-slate-200 rounded overflow-hidden">
                {/* Project header */}
                <div
                  className="px-5 py-4 border-b border-slate-200"
                  style={{ borderLeft: `4px solid ${proj.color}` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs font-bold"
                          style={{ fontFamily: "'JetBrains Mono', monospace", color: proj.color }}
                        >
                          {proj.id}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{proj.period}</span>
                      </div>
                      <h3
                        className="font-semibold text-slate-900"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {proj.name}
                      </h3>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded border"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: proj.color,
                        borderColor: `${proj.color}40`,
                        background: `${proj.color}0d`,
                      }}
                    >
                      {proj.type}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <p
                    className="text-sm text-slate-600 mb-4 leading-relaxed"
                    style={{ fontFamily: "'Source Serif 4', serif" }}
                  >
                    {proj.desc}
                  </p>

                  {/* Versions */}
                  <div className="mb-4">
                    <h4
                      className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Évolution technique
                    </h4>
                    <div className="space-y-2">
                      {proj.versions.map((v) => (
                        <div key={v.v} className="flex gap-3">
                          <span
                            className="text-xs font-bold shrink-0 mt-0.5"
                            style={{ fontFamily: "'JetBrains Mono', monospace", color: proj.color, minWidth: "80px" }}
                          >
                            {v.v}
                          </span>
                          <span className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {v.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learnings */}
                  <div className="mb-4">
                    <h4
                      className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Enseignements clés
                    </h4>
                    <div className="space-y-1">
                      {proj.learnings.map((l) => (
                        <div key={l} className="flex gap-2">
                          <span className="text-xs mt-0.5" style={{ color: "oklch(0.72 0.18 50)" }}>→</span>
                          <span className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {l}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Validation metrics */}
                  {proj.validation.length > 0 && (
                    <div>
                      <h4
                        className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        Validation marché
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {proj.validation.map((v) => (
                          <div
                            key={v.metric}
                            className="bg-slate-50 rounded p-2"
                          >
                            <div
                              className="text-base font-bold"
                              style={{ fontFamily: "'JetBrains Mono', monospace", color: proj.color }}
                            >
                              {v.value}
                            </div>
                            <div className="text-xs text-slate-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                              {v.metric}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vision produit */}
        <section className="mb-16">
          <SectionHeader
            number="02"
            title="Vision Produit — Deux Modes, Un Moteur"
            subtitle="DigiDouble sert deux marchés via un cœur technique partagé."
            accent="orange"
          />

          {/* Architecture diagram */}
          <div className="border border-slate-200 rounded p-4 bg-white mb-6">
            <ProductArchDiagram />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-slate-200 rounded p-5">
              <div
                className="text-xs font-bold mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 200)" }}
              >
                MODE 01
              </div>
              <h3
                className="text-lg font-semibold text-slate-900 mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Edugami — Mode Pédagogique
              </h3>
              <p
                className="text-xs text-slate-500 mb-3 font-mono"
              >
                "Lean Forward" — Engagement actif
              </p>
              <p
                className="text-sm text-slate-600 mb-4 leading-relaxed"
                style={{ fontFamily: "'Source Serif 4', serif" }}
              >
                Avatar comme tuteur/expert aux côtés d'une vidéo illustrative. Données factuelles affichées (liens, documents, statistiques). Validation des connaissances via mini-formulaires interactifs.
              </p>
              <div className="space-y-1">
                {["EdTech", "Patrimoine culturel", "Formation corporate"].map((m) => (
                  <div key={m} className="flex gap-2 items-center">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.72 0.18 200)" }} />
                    <span className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-200 rounded p-5">
              <div
                className="text-xs font-bold mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 50)" }}
              >
                MODE 02
              </div>
              <h3
                className="text-lg font-semibold text-slate-900 mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Storygami — Mode Narratif
              </h3>
              <p
                className="text-xs text-slate-500 mb-3 font-mono"
              >
                "Lean Back" — Immersion cinématographique
              </p>
              <p
                className="text-sm text-slate-600 mb-4 leading-relaxed"
                style={{ fontFamily: "'Source Serif 4', serif" }}
              >
                Avatar comme personnage dans une scène plein écran. Vidéo dominante avec séquences et transitions. Navigation vocale, UI minimale. Personnalité et réactions émotionnelles modélisées.
              </p>
              <div className="space-y-1">
                {["Cinéma", "Gaming", "Économie créative"].map((m) => (
                  <div key={m} className="flex gap-2 items-center">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.72 0.18 50)" }} />
                    <span className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="callout-info">
            <p
              className="text-sm font-semibold text-slate-800 mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Différenciation fondamentale
            </p>
            <p
              className="text-sm text-slate-700 leading-relaxed"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              DigiDouble crée un <strong>nouveau type d'outil de "montage" vidéo</strong> où le montage n'est plus temporel (timeline) mais <strong>spatial et conversationnel</strong> — nœuds + agents + streams synchronisés temps réel. Les créateurs configurent n'importe quel point du continuum entre pédagogie pure et immersion narrative pure.
            </p>
          </div>
        </section>

        {/* Positionnement compétitif */}
        <section className="mb-16">
          <SectionHeader
            number="03"
            title="Positionnement Compétitif"
            subtitle="Comparaison avec les solutions existantes sur les critères clés."
            accent="green"
          />

          <div className="overflow-x-auto mb-6">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>HeyGen</th>
                  <th>Synthesia</th>
                  <th>Flowise + Custom</th>
                  <th style={{ background: "oklch(0.45 0.18 200)" }}>DigiDouble</th>
                </tr>
              </thead>
              <tbody>
                {competitiveData.map((row) => (
                  <tr key={row.criterion}>
                    <td className="font-medium text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {row.criterion}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            color: row.heygen.level === 0 ? "oklch(0.60 0.20 25)" : "oklch(0.65 0.18 145)",
                          }}
                        >
                          {row.heygen.value}
                        </span>
                        <LevelDots level={row.heygen.level} />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            color: row.synthesia.level === 0 ? "oklch(0.60 0.20 25)" : "oklch(0.65 0.18 145)",
                          }}
                        >
                          {row.synthesia.value}
                        </span>
                        <LevelDots level={row.synthesia.level} />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            color: row.flowise.level === 0 ? "oklch(0.60 0.20 25)" : "oklch(0.65 0.18 145)",
                          }}
                        >
                          {row.flowise.value}
                        </span>
                        <LevelDots level={row.flowise.level} />
                      </div>
                    </td>
                    <td style={{ background: "oklch(0.72 0.18 200 / 0.04)" }}>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-semibold"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            color: row.digidouble.rd ? "oklch(0.45 0.18 200)" : "oklch(0.45 0.18 145)",
                          }}
                        >
                          {row.digidouble.value}
                        </span>
                        <LevelDots level={row.digidouble.level} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="callout-info">
            <p
              className="text-sm text-slate-700"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              <strong>Analogie :</strong> HeyGen/Synthesia = iMovie (simple, limité). Flowise + custom = Final Cut XML (puissant, complexe). <strong>DigiDouble = Final Cut Pro</strong> (puissant ET utilisable par des créateurs non-techniques).
            </p>
          </div>

          {/* Radar diagram */}
          <div className="mt-6">
            <h3
              className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Comparatif radar — Plateformes avatar
            </h3>
            <div className="border border-slate-200 rounded p-4 bg-white">
              <RadarCompareDiagram />
            </div>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="mb-16">
          <SectionHeader
            number="04"
            title="Infrastructure & Expertise Technique"
            subtitle="Ce qui est opérationnel aujourd'hui vs. ce qui nécessite de la R&D."
            accent="cyan"
          />

          <div className="grid sm:grid-cols-2 gap-3">
            {techStack.map((item) => (
              <div
                key={item.name}
                className="flex gap-3 p-4 border border-slate-200 rounded"
              >
                <div className="shrink-0 mt-0.5">
                  {item.status === "available" ? (
                    <CheckCircle size={16} style={{ color: "oklch(0.65 0.18 145)" }} />
                  ) : (
                    <AlertCircle size={16} style={{ color: "oklch(0.60 0.20 25)" }} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-sm font-semibold text-slate-900"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {item.name}
                    </span>
                    <StatusBadge variant={item.status === "available" ? "available" : "gap"} />
                  </div>
                  <p
                    className="text-xs text-slate-500 leading-relaxed"
                    style={{ fontFamily: "'Source Serif 4', serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
