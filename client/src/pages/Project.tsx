/*
 * Project — DigiDouble Research Portal
 * Page: Context & Vision
 * Design: Technical Blueprint, numbered sections, comparative tables
 * i18n: EN (default) / FR via LangContext
 */
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";
import { CheckCircle, AlertCircle } from "lucide-react";
import ProductArchDiagram from "@/components/diagrams/ProductArchDiagram";
import RadarCompareDiagram from "@/components/diagrams/RadarCompareDiagram";
import { useLang } from "@/contexts/LangContext";

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
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const competitiveData = [
    {
      criterion: isFr ? "Avatars temps réel" : "Real-time avatars",
      heygen: { value: "✓✓✓", level: 3 },
      synthesia: { value: "✗", level: 0 },
      flowise: { value: "✓ (OS)", level: 1 },
      digidouble: { value: "✓✓✓ (R&D)", level: 3, rd: true },
    },
    {
      criterion: isFr ? "Langage corporel" : "Body language",
      heygen: { value: "✓", level: 1 },
      synthesia: { value: "✗", level: 0 },
      flowise: { value: "✗", level: 0 },
      digidouble: { value: "✓✓✓ (R&D)", level: 3, rd: true },
    },
    {
      criterion: isFr ? "Sync multi-stream" : "Multi-stream sync",
      heygen: { value: "✗", level: 0 },
      synthesia: { value: "✗", level: 0 },
      flowise: { value: "✓", level: 2 },
      digidouble: { value: "✓✓✓", level: 3 },
    },
    {
      criterion: isFr ? "Mémoire conversationnelle" : "Conversational memory",
      heygen: { value: "✗", level: 0 },
      synthesia: { value: "✗", level: 0 },
      flowise: { value: "✓", level: 2 },
      digidouble: { value: "✓✓✓ (R&D)", level: 3, rd: true },
    },
    {
      criterion: isFr ? "Éditeur nœuds" : "Node editor",
      heygen: { value: "✗", level: 0 },
      synthesia: { value: "✗", level: 0 },
      flowise: { value: "✓ (tech)", level: 1 },
      digidouble: { value: "✓✓✓", level: 3 },
    },
    {
      criterion: isFr ? "Souveraineté données" : "Data sovereignty",
      heygen: { value: "✗", level: 0 },
      synthesia: { value: "✗", level: 0 },
      flowise: { value: "✓ (self)", level: 2 },
      digidouble: { value: "✓✓✓", level: 3 },
    },
    {
      criterion: isFr ? "Risque censure" : "Censorship risk",
      heygen: { value: isFr ? "Élevé" : "High", level: 0 },
      synthesia: { value: isFr ? "Élevé" : "High", level: 0 },
      flowise: { value: isFr ? "Élevé" : "High", level: 0 },
      digidouble: { value: isFr ? "Nul (souverain)" : "None (sovereign)", level: 3 },
    },
  ];

  const projects = [
    {
      id: "P1",
      name: "Le Dilemme Plastique",
      type: "EdTech",
      period: isFr ? "2023–présent" : "2023–present",
      desc: isFr
        ? "Outil éducatif sur la pollution plastique océanique. Les étudiants conversent avec un avatar IA 'Peter' qui guide à travers des sujets de sciences environnementales, affichant des clips documentaires et images pendant la conversation."
        : "Educational tool on ocean plastic pollution. Students converse with an AI avatar 'Peter' who guides them through environmental science topics, displaying documentary clips and images during the conversation.",
      versions: isFr
        ? [
            { v: "V1 (2023)", desc: "8 no-code apps, linear deterministic path → too rigid" },
            { v: "V2 (2024)", desc: "Pivot to generative AI (GPT-4 + Flowise + ElevenLabs) → natural conversation, but 15–40s latency" },
            { v: "2025", desc: "Pedagogical expert Jérémy Argyriades (PhD physics) joins to structure interactions" },
          ]
        : [
            { v: "V1 (2023)", desc: "8 no-code apps, linear deterministic path → too rigid" },
            { v: "V2 (2024)", desc: "Pivot to generative AI (GPT-4 + Flowise + ElevenLabs) → natural conversation, but 15–40s latency" },
            { v: "2025", desc: "Pedagogical expert Jérémy Argyriades (PhD physics) joins to structure interactions" },
          ],
      learnings: isFr
        ? [
            "Orchestration multi-services : fragile et lente",
            "Curation de contenu pour RAG : critique",
            "Latence et synchronisation : blocages UX primaires",
            "Flowise : outil le plus proche de la vision produit",
          ]
        : [
            "Multi-service orchestration: fragile and slow",
            "Content curation for RAG: critical",
            "Latency and synchronization: primary UX blockers",
            "Flowise: closest tool to the product vision",
          ],
      validation: [
        { metric: isFr ? "Enseignants interviewés" : "Teachers interviewed", value: "11" },
        { metric: isFr ? "Veulent expérimenter" : "Want to experiment", value: "100%" },
        { metric: isFr ? "Utilisent déjà l'IA" : "Already use AI", value: "78%" },
        { metric: isFr ? "Veulent tester le proto" : "Want to test prototype", value: "78%" },
        { metric: isFr ? "Satisfaction outils actuels" : "Current tool satisfaction", value: "6.9/10" },
      ],
      color: "oklch(0.72 0.18 200)",
    },
    {
      id: "P2",
      name: "Parle à AVA!",
      type: isFr ? "Cinéma interactif" : "Interactive Cinema",
      period: isFr ? "2024–présent" : "2024–present",
      desc: isFr
        ? "Expérience narrative interactive permettant aux spectateurs de converser avec des personnages du film dystopique 'Où est AVA?' de Romed Wyder. Les spectateurs dialoguent avec des avatars photorealistic de personnages du film."
        : "Interactive narrative experience allowing viewers to converse with characters from Romed Wyder's dystopian film 'Where is AVA?'. Viewers dialogue with photorealistic avatars of film characters.",
      versions: isFr
        ? [
            { v: "Incident censure", desc: "OpenAI a bloqué l'accès API pour mots-clés sensibles dans un contexte purement artistique → pivot vers open-source et infrastructure européenne" },
            { v: "Solution souveraine", desc: "Partenariat Exoscale (cloud GPU suisse), déploiement HeyGem open-source en Docker. Gain 30% performance avec Arch Linux vs Ubuntu." },
          ]
        : [
            { v: "Censorship incident", desc: "OpenAI blocked API access for sensitive keywords in a purely artistic context → pivot to open-source and European infrastructure" },
            { v: "Sovereign solution", desc: "Exoscale partnership (Swiss GPU cloud), HeyGem open-source deployment in Docker. 30% performance gain with Arch Linux vs Ubuntu." },
          ],
      learnings: isFr
        ? [
            "Plateformes commerciales : censure arbitraire — infrastructure souveraine non-négociable",
            "Fine-tuning personnage : nécessite des milliers d'exemples de dialogue",
            "Latence temps réel : goulot d'étranglement critique",
            "Absence de langage corporel : artificialité perceptible",
          ]
        : [
            "Commercial platforms: arbitrary censorship — sovereign infrastructure non-negotiable",
            "Character fine-tuning: requires thousands of dialogue examples",
            "Real-time latency: critical bottleneck",
            "Absence of body language: perceptible artificiality",
          ],
      validation: [],
      color: "oklch(0.72 0.18 50)",
    },
  ];

  const techStack = [
    { name: "Audiogami ASR→STT", status: "available", desc: isFr ? "Pipeline production, API + SDK, hébergé en Suisse, HITL optionnel" : "Production pipeline, API + SDK, Swiss-hosted, optional HITL" },
    { name: isFr ? "Partenariat Exoscale" : "Exoscale Partnership", status: "available", desc: isFr ? "Cloud GPU suisse pour déploiement IA open-source souverain" : "Swiss GPU cloud for sovereign open-source AI deployment" },
    { name: isFr ? "Deux prototypes fonctionnels" : "Two functional prototypes", status: "available", desc: isFr ? "Testés avec utilisateurs réels, retours documentés" : "Tested with real users, documented feedback" },
    { name: "NocoDB self-hosted", status: "available", desc: isFr ? "Base de données contenu avec métadonnées riches" : "Content database with rich metadata" },
    { name: isFr ? "Expertise Flowise" : "Flowise Expertise", status: "available", desc: isFr ? "Orchestration multi-agents, intégration RAG" : "Multi-agent orchestration, RAG integration" },
    { name: isFr ? "Mémoire conversationnelle" : "Conversational memory", status: "gap", desc: isFr ? "Architecture pour sessions longue durée sans explosion tokens" : "Architecture for long-duration sessions without token explosion" },
    { name: isFr ? "Avatar expressif temps réel" : "Real-time expressive avatar", status: "gap", desc: isFr ? "Génération <500ms avec langage corporel et cohérence comportementale" : "Generation <500ms with body language and behavioral coherence" },
    { name: isFr ? "TTS prosodique personnalisé" : "Personalized prosodic TTS", status: "gap", desc: isFr ? "Capture de l'empreinte prosodique individuelle" : "Capture of individual prosodic fingerprint" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Page header */}
      <div className="border-b border-slate-200 py-8">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">01</span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-mono text-slate-400">{t("project.label")}</span>
            </div>
            <h1
              className="text-3xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.025em" }}
            >
              {isFr ? "Projet DigiDouble" : "DigiDouble Project"}
            </h1>
            <p
              className="text-base text-slate-600 leading-relaxed"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              {isFr
                ? <>DigiDouble est une collaboration entre <strong>Memoways</strong> (Genève, 14 ans d'expertise en vidéo interactive) et <strong>Gamilab</strong> (startup voice-first AI, SDK Audiogami). Ce document présente le contexte, les projets fondateurs et le positionnement compétitif.</>
                : <>DigiDouble is a collaboration between <strong>Memoways</strong> (Geneva, 14 years of interactive video expertise) and <strong>Gamilab</strong> (voice-first AI startup, Audiogami SDK). This document presents the context, founding projects, and competitive positioning.</>
              }
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">

        {/* Founding Projects */}
        <section className="mb-16">
          <SectionHeader
            number={t("project.s1.number")}
            title={t("project.s1.title")}
            subtitle={t("project.s1.subtitle")}
            accent="cyan"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="border border-slate-200 rounded overflow-hidden">
                <div
                  className="px-5 py-4 border-b border-slate-200"
                  style={{ borderLeft: `4px solid ${proj.color}` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: proj.color }}>
                          {proj.id}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{proj.period}</span>
                      </div>
                      <h3 className="font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {proj.name}
                      </h3>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded border"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: proj.color, borderColor: `${proj.color}40`, background: `${proj.color}0d` }}
                    >
                      {proj.type}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {proj.desc}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? "Évolution technique" : "Technical Evolution"}
                    </h4>
                    <div className="space-y-2">
                      {proj.versions.map((v) => (
                        <div key={v.v} className="flex gap-3">
                          <span className="text-xs font-bold shrink-0 mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace", color: proj.color, minWidth: "80px" }}>
                            {v.v}
                          </span>
                          <span className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {v.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {isFr ? "Enseignements clés" : "Key Learnings"}
                    </h4>
                    <div className="space-y-1">
                      {proj.learnings.map((l) => (
                        <div key={l} className="flex gap-2">
                          <span className="text-xs mt-0.5" style={{ color: "oklch(0.72 0.18 50)" }}>→</span>
                          <span className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{l}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {proj.validation.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {isFr ? "Validation marché" : "Market Validation"}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {proj.validation.map((v) => (
                          <div key={v.metric} className="bg-slate-50 rounded p-2">
                            <div className="text-base font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: proj.color }}>
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

        {/* Product Vision */}
        <section className="mb-16">
          <SectionHeader
            number={t("project.s2.number")}
            title={isFr ? "Vision Produit — Deux Modes, Un Moteur" : "Product Vision — Two Modes, One Engine"}
            subtitle={t("project.s2.subtitle")}
            accent="orange"
          />

          <div className="border border-slate-200 rounded p-4 bg-white mb-6">
            <ProductArchDiagram />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-slate-200 rounded p-5">
              <div className="text-xs font-bold mb-2" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 200)" }}>
                {t("project.mode01")}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Edugami — {isFr ? "Mode Pédagogique" : "Pedagogical Mode"}
              </h3>
              <p className="text-xs text-slate-500 mb-3 font-mono">
                {t("project.mode01.title")}
              </p>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? "Avatar comme tuteur/expert aux côtés d'une vidéo illustrative. Données factuelles affichées (liens, documents, statistiques). Validation des connaissances via mini-formulaires interactifs."
                  : "Avatar as tutor/expert alongside an illustrative video. Factual data displayed (links, documents, statistics). Knowledge validation via interactive mini-forms."
                }
              </p>
              <div className="space-y-1">
                {(isFr ? ["EdTech", "Patrimoine culturel", "Formation corporate"] : ["EdTech", "Cultural heritage", "Corporate training"]).map((m) => (
                  <div key={m} className="flex gap-2 items-center">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.72 0.18 200)" }} />
                    <span className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-200 rounded p-5">
              <div className="text-xs font-bold mb-2" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 50)" }}>
                {t("project.mode02")}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Storygami — {isFr ? "Mode Narratif" : "Narrative Mode"}
              </h3>
              <p className="text-xs text-slate-500 mb-3 font-mono">
                {t("project.mode02.title")}
              </p>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? "Avatar comme personnage dans une scène plein écran. Vidéo dominante avec séquences et transitions. Navigation vocale, UI minimale. Personnalité et réactions émotionnelles modélisées."
                  : "Avatar as character in a full-screen scene. Dominant video with sequences and transitions. Voice navigation, minimal UI. Personality and emotional reactions modeled."
                }
              </p>
              <div className="space-y-1">
                {(isFr ? ["Cinéma", "Gaming", "Économie créative"] : ["Cinema", "Gaming", "Creative economy"]).map((m) => (
                  <div key={m} className="flex gap-2 items-center">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.72 0.18 50)" }} />
                    <span className="text-xs text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="callout-info">
            <p className="text-sm font-semibold text-slate-800 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Différenciation fondamentale" : "Fundamental Differentiation"}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? <>DigiDouble crée un <strong>nouveau type d'outil de "montage" vidéo</strong> où le montage n'est plus temporel (timeline) mais <strong>spatial et conversationnel</strong> — nœuds + agents + streams synchronisés temps réel. Les créateurs configurent n'importe quel point du continuum entre pédagogie pure et immersion narrative pure.</>
                : <>DigiDouble creates a <strong>new type of video "editing" tool</strong> where editing is no longer temporal (timeline) but <strong>spatial and conversational</strong> — nodes + agents + real-time synchronized streams. Creators configure any point on the continuum between pure pedagogy and pure narrative immersion.</>
              }
            </p>
          </div>
        </section>

        {/* Competitive Positioning */}
        <section className="mb-16">
          <SectionHeader
            number={t("project.s3.number")}
            title={isFr ? "Positionnement Compétitif" : "Competitive Positioning"}
            subtitle={isFr ? "Comparaison avec les solutions existantes sur les critères clés." : "Comparison with existing solutions on key criteria."}
            accent="green"
          />

          <div className="overflow-x-auto mb-6">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{isFr ? "Critère" : "Criterion"}</th>
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
                        <span className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace", color: row.heygen.level === 0 ? "oklch(0.60 0.20 25)" : "oklch(0.65 0.18 145)" }}>
                          {row.heygen.value}
                        </span>
                        <LevelDots level={row.heygen.level} />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace", color: row.synthesia.level === 0 ? "oklch(0.60 0.20 25)" : "oklch(0.65 0.18 145)" }}>
                          {row.synthesia.value}
                        </span>
                        <LevelDots level={row.synthesia.level} />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace", color: row.flowise.level === 0 ? "oklch(0.60 0.20 25)" : "oklch(0.65 0.18 145)" }}>
                          {row.flowise.value}
                        </span>
                        <LevelDots level={row.flowise.level} />
                      </div>
                    </td>
                    <td style={{ background: "oklch(0.72 0.18 200 / 0.04)" }}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", color: row.digidouble.rd ? "oklch(0.45 0.18 200)" : "oklch(0.45 0.18 145)" }}>
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
            <p className="text-sm text-slate-700" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? <><strong>Analogie :</strong> HeyGen/Synthesia = iMovie (simple, limité). Flowise + custom = Final Cut XML (puissant, complexe). <strong>DigiDouble = Final Cut Pro</strong> (puissant ET utilisable par des créateurs non-techniques).</>
                : <><strong>Analogy:</strong> HeyGen/Synthesia = iMovie (simple, limited). Flowise + custom = Final Cut XML (powerful, complex). <strong>DigiDouble = Final Cut Pro</strong> (powerful AND usable by non-technical creators).</>
              }
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {t("project.radar.title")}
            </h3>
            <div className="border border-slate-200 rounded p-4 bg-white">
              <RadarCompareDiagram />
            </div>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="mb-16">
          <SectionHeader
            number={t("project.s4.number")}
            title={isFr ? "Infrastructure & Expertise Technique" : "Infrastructure & Technical Expertise"}
            subtitle={isFr ? "Ce qui est opérationnel aujourd'hui vs. ce qui nécessite de la R&D." : "What is operational today vs. what requires R&D."}
            accent="cyan"
          />

          <div className="grid sm:grid-cols-2 gap-3">
            {techStack.map((item) => (
              <div key={item.name} className="flex gap-3 p-4 border border-slate-200 rounded">
                <div className="shrink-0 mt-0.5">
                  {item.status === "available" ? (
                    <CheckCircle size={16} style={{ color: "oklch(0.65 0.18 145)" }} />
                  ) : (
                    <AlertCircle size={16} style={{ color: "oklch(0.60 0.20 25)" }} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {item.name}
                    </span>
                    <StatusBadge variant={item.status === "available" ? "available" : "gap"} />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
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
