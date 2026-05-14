/*
 * Project — GamiWays Research Portal
 * Design: schema-first, details in accordion/toggle
 * Sections: Platform (PlatformMode) → Gap (GapMatrix) → Competitive → Infrastructure
 * i18n: EN (default) / FR via LangContext
 */
import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle, ArrowRight, ExternalLink } from "lucide-react";
import ProductArchDiagram from "@/components/diagrams/ProductArchDiagram";
import GapMatrixDiagram from "@/components/diagrams/GapMatrixDiagram";
import RadarCompareDiagram from "@/components/diagrams/RadarCompareDiagram";
import DiagramModal from "@/components/DiagramModal";
import StatusBadge from "@/components/StatusBadge";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import { SolutionBadge } from "@/components/SolutionBadge";
import { SOLUTION_LINKS } from "@/lib/solutionLinks";

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

function Accordion({ label, labelFr, isFr, children }: { label: string; labelFr: string; isFr: boolean; children: React.ReactNode }) {
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
        <div className="px-4 pb-4 border-t border-slate-100 bg-slate-50">
          {children}
        </div>
      )}
    </div>
  );
}

function LevelDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-2 h-2 rounded-full" style={{
          background: i <= level
            ? level === 3 ? "oklch(0.65 0.18 145)" : "oklch(0.72 0.18 200)"
            : "oklch(0.88 0.006 265)",
        }} />
      ))}
    </div>
  );
}

export default function Project() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  const competitiveData = [
    { criterion: isFr ? "Avatars temps réel" : "Real-time avatars", heygen: { value: "✓✓✓", level: 3 }, synthesia: { value: "✗", level: 0 }, flowise: { value: "✓ (OS)", level: 1 }, gamiways: { value: "✓✓✓ (R&D)", level: 3, rd: true } },
    { criterion: isFr ? "Langage corporel" : "Body language", heygen: { value: "✓", level: 1 }, synthesia: { value: "✗", level: 0 }, flowise: { value: "✗", level: 0 }, gamiways: { value: "✓✓✓ (R&D)", level: 3, rd: true } },
    { criterion: isFr ? "Sync multi-stream" : "Multi-stream sync", heygen: { value: "✗", level: 0 }, synthesia: { value: "✗", level: 0 }, flowise: { value: "✓", level: 2 }, gamiways: { value: "✓✓✓", level: 3, rd: false } },
    { criterion: isFr ? "Mémoire conversationnelle" : "Conversational memory", heygen: { value: "✗", level: 0 }, synthesia: { value: "✗", level: 0 }, flowise: { value: "✓", level: 2 }, gamiways: { value: "✓✓✓ (R&D)", level: 3, rd: true } },
    { criterion: isFr ? "Éditeur nœuds" : "Node editor", heygen: { value: "✗", level: 0 }, synthesia: { value: "✗", level: 0 }, flowise: { value: "✓ (tech)", level: 1 }, gamiways: { value: "✓✓✓", level: 3, rd: false } },
    { criterion: isFr ? "Souveraineté données" : "Data sovereignty", heygen: { value: "✗", level: 0 }, synthesia: { value: "✗", level: 0 }, flowise: { value: "✓ (self)", level: 2 }, gamiways: { value: "✓✓✓", level: 3, rd: false } },
    { criterion: isFr ? "Risque censure" : "Censorship risk", heygen: { value: isFr ? "Élevé" : "High", level: 0 }, synthesia: { value: isFr ? "Élevé" : "High", level: 0 }, flowise: { value: isFr ? "Élevé" : "High", level: 0 }, gamiways: { value: isFr ? "Nul (souverain)" : "None (sovereign)", level: 3, rd: false } },
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

  const projects = [
    {
      id: "P1",
      name: "Le Dilemme Plastique",
      type: "EdTech",
      period: isFr ? "2023–présent" : "2023–present",
      color: "oklch(0.72 0.18 200)",
      desc: isFr
        ? "Outil éducatif sur la pollution plastique océanique. Les étudiants conversent avec un avatar IA 'Peter' qui guide à travers des sujets de sciences environnementales."
        : "Educational tool on ocean plastic pollution. Students converse with an AI avatar 'Peter' who guides them through environmental science topics.",
      versions: isFr
        ? [
            { v: "V1 (2023)", desc: "8 no-code apps, parcours linéaire déterministe → trop rigide" },
            { v: "V2 (2024)", desc: "Pivot vers IA générative (GPT-4 + Flowise + ElevenLabs) → conversation naturelle, mais 6–12s de latence" },
            { v: "2025", desc: "Expert pédagogique Jérémy Argyriades (PhD physique) rejoint pour structurer les interactions" },
          ]
        : [
            { v: "V1 (2023)", desc: "8 no-code apps, linear deterministic path → too rigid" },
            { v: "V2 (2024)", desc: "Pivot to generative AI (GPT-4 + Flowise + ElevenLabs) → natural conversation, but 6–12s latency" },
            { v: "2025", desc: "Pedagogical expert Jérémy Argyriades (PhD physics) joins to structure interactions" },
          ],
      learnings: isFr
        ? ["Orchestration multi-services : fragile et lente", "Curation de contenu pour RAG : critique", "Latence et synchronisation : blocages UX primaires", "Flowise : outil le plus proche de la vision produit"]
        : ["Multi-service orchestration: fragile and slow", "Content curation for RAG: critical", "Latency and synchronization: primary UX blockers", "Flowise: closest tool to the product vision"],
      validation: [
        { metric: isFr ? "Enseignants interviewés" : "Teachers interviewed", value: "11" },
        { metric: isFr ? "Veulent expérimenter" : "Want to experiment", value: "100%" },
        { metric: isFr ? "Utilisent déjà l'IA" : "Already use AI", value: "78%" },
        { metric: isFr ? "Satisfaction outils actuels" : "Current tool satisfaction", value: "6.9/10" },
      ],
    },
    {
      id: "P2",
      name: "Parle à AVA!",
      type: isFr ? "Cinéma interactif" : "Interactive Cinema",
      period: isFr ? "2024–présent" : "2024–present",
      color: "oklch(0.72 0.18 50)",
      desc: isFr
        ? "Expérience narrative interactive permettant aux spectateurs de converser avec des personnages du film dystopique 'Où est AVA?' de Romed Wyder. Avatars photorealistic de personnages du film."
        : "Interactive narrative experience allowing viewers to converse with characters from Romed Wyder's dystopian film 'Where is AVA?'. Photorealistic avatars of film characters.",
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
        ? ["Plateformes commerciales : censure arbitraire — infrastructure souveraine non-négociable", "Fine-tuning personnage : nécessite des milliers d'exemples de dialogue", "Latence temps réel : goulot d'étranglement critique", "Absence de langage corporel : artificialité perceptible"]
        : ["Commercial platforms: arbitrary censorship — sovereign infrastructure non-negotiable", "Character fine-tuning: requires thousands of dialogue examples", "Real-time latency: critical bottleneck", "Absence of body language: perceptible artificiality"],
      validation: [],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="border-b border-slate-200 py-10">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">01</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-mono text-slate-400">{isFr ? "Contexte & Vision" : "Context & Vision"}</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}>
            {isFr ? "Projet GamiWays" : "GamiWays Project"}
          </h1>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr ? (
              <>
                Collaboration entre{" "}
                <a href="https://memoways.com" target="_blank" rel="noopener noreferrer" className="text-[#0891b2] hover:underline">Memoways</a>
                {" "}(Genève, 14 ans d’expertise vidéo interactive) et{" "}
                <a href="https://gamilab.ch" target="_blank" rel="noopener noreferrer" className="text-[#0891b2] hover:underline">Gamilab</a>
                {" "}(startup voice-first AI, SDK Audiogami).
              </>
            ) : (
              <>
                Collaboration between{" "}
                <a href="https://memoways.com" target="_blank" rel="noopener noreferrer" className="text-[#0891b2] hover:underline">Memoways</a>
                {" "}(Geneva, 14 years of interactive video expertise) and{" "}
                <a href="https://gamilab.ch" target="_blank" rel="noopener noreferrer" className="text-[#0891b2] hover:underline">Gamilab</a>
                {" "}(voice-first AI startup, Audiogami SDK).
              </>
            )}
          </p>
          {/* Partnership badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono" style={{ borderColor: "oklch(0.72 0.18 200)40", background: "oklch(0.97 0.02 200)", color: "oklch(0.45 0.18 200)" }}>
            <span style={{ fontWeight: 700 }}>GamiWays Research Portal</span>
            <span className="text-slate-400">·</span>
            <span>Gamilab × Memoways</span>
            <span className="text-slate-400">·</span>
            <span>Geneva, Switzerland</span>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl py-14 space-y-20">

        {/* ── SECTION 1: PLATFORM ──────────────────────────────────────────── */}
        <section>
          <SectionDivider number="01" title="Product Vision — Two Modes, One Engine" titleFr="Vision Produit — Deux Modes, Un Moteur" isFr={isFr} />
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Mode pédagogique + Mode narratif, moteur partagé." : "Pedagogical mode + Narrative mode, shared engine."}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Hover sur les composants du moteur pour les détails techniques. Les deux modes partagent la même infrastructure."
                : "Hover over engine components for technical details. Both modes share the same infrastructure."}
            </p>
          </div>
          <DiagramModal title="Product Architecture — Pedagogical & Narrative modes">
            <ProductArchDiagram />
          </DiagramModal>
          <Accordion label="Fundamental differentiation — why this is new" labelFr="Différenciation fondamentale — pourquoi c'est nouveau" isFr={isFr}>
            <div className="pt-3">
              <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? "GamiWays crée un nouveau type d'outil de \"montage\" vidéo où le montage n'est plus temporel (timeline) mais spatial et conversationnel — nœuds + agents + streams synchronisés temps réel. Analogie : HeyGen/Synthesia = iMovie (simple, limité). Flowise + custom = Final Cut XML (puissant, complexe). GamiWays = Final Cut Pro (puissant ET utilisable par des créateurs non-techniques)."
                  : "GamiWays creates a new type of video \"editing\" tool where editing is no longer temporal (timeline) but spatial and conversational — nodes + agents + real-time synchronized streams. Analogy: HeyGen/Synthesia = iMovie (simple, limited). Flowise + custom = Final Cut XML (powerful, complex). GamiWays = Final Cut Pro (powerful AND usable by non-technical creators)."}
              </p>
            </div>
          </Accordion>
        </section>

        {/* ── SECTION 2: GAP MATRIX ────────────────────────────────────────── */}
        <section>
          <SectionDivider number="02" title="Competitive Gap" titleFr="Gap Compétitif" isFr={isFr} />
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Aucune solution ne combine les 5 critères." : "No solution combines all 5 criteria."}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? <>Hover sur les cellules pour les détails. Benchmarks latence complets dans l'<InternalLink to="/avatars">État de l'Art</InternalLink>.</>
                : <>Hover over cells for details. Full latency benchmarks in <InternalLink to="/avatars">State of the Art</InternalLink>.</>
              }
            </p>
          </div>
          <DiagramModal title="Competitive Gap Matrix">
            <GapMatrixDiagram />
          </DiagramModal>
        </section>

        {/* ── SECTION 3: COMPETITIVE TABLE ─────────────────────────────────── */}
        <section>
          <SectionDivider number="03" title="Competitive Comparison" titleFr="Comparaison Compétitive" isFr={isFr} />
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "HeyGen · Synthesia · Flowise vs GamiWays" : "HeyGen · Synthesia · Flowise vs GamiWays"}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? <>Comparaison sur 7 critères. Analyse complète des 11 solutions dans l'<InternalLink to="/avatars">État de l'Art</InternalLink>. Défis R&D détaillés dans les <InternalLink to="/research">Défis de Recherche</InternalLink>.</>
                : <>Comparison on 7 criteria. Full analysis of 11 solutions in <InternalLink to="/avatars">State of the Art</InternalLink>. R&D challenges detailed in <InternalLink to="/research">Research Challenges</InternalLink>.</>
              }
            </p>
          </div>

          {/* Radar */}
          <DiagramModal title="Radar Comparison — Platforms vs GamiWays Target">
            <RadarCompareDiagram />
          </DiagramModal>

          {/* Detailed table in accordion */}
          <Accordion label="Detailed criterion-by-criterion comparison" labelFr="Comparaison détaillée critère par critère" isFr={isFr}>
            <div className="pt-3 overflow-x-auto">
              <table className="w-full border-collapse" style={{ minWidth: "520px" }}>
                <thead>
                  <tr>
                    <th className="text-left py-2 pr-4 text-xs font-mono text-slate-400 font-normal">{isFr ? "Critère" : "Criterion"}</th>
                    <th className="text-center py-2 px-2 text-xs font-mono text-slate-500 font-semibold">
                      <a href={SOLUTION_LINKS.heygen.homepage} target="_blank" rel="noopener noreferrer" className="hover:text-[#0891b2] transition-colors">HeyGen</a>
                    </th>
                    <th className="text-center py-2 px-2 text-xs font-mono text-slate-500 font-semibold">
                      <a href={SOLUTION_LINKS.synthesia.homepage} target="_blank" rel="noopener noreferrer" className="hover:text-[#0891b2] transition-colors">Synthesia</a>
                    </th>
                    <th className="text-center py-2 px-2 text-xs font-mono text-slate-500 font-semibold">Flowise</th>
                    <th className="text-center py-2 px-2 text-xs font-mono font-bold" style={{ color: "oklch(0.45 0.18 200)" }}>GamiWays</th>
                  </tr>
                </thead>
                <tbody>
                  {competitiveData.map((row) => (
                    <tr key={row.criterion} className="border-t border-slate-100">
                      <td className="py-2 pr-4 text-xs font-medium text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{row.criterion}</td>
                      {[row.heygen, row.synthesia, row.flowise, row.gamiways].map((cell, ci) => (
                        <td key={ci} className="text-center py-2 px-2">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-xs font-mono" style={{ color: cell.level === 0 ? "oklch(0.60 0.20 25)" : ci === 3 ? "oklch(0.45 0.18 200)" : "oklch(0.65 0.18 145)" }}>
                              {cell.value}
                            </span>
                            <LevelDots level={cell.level} />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Accordion>
        </section>

        {/* ── SECTION 4: FOUNDING PROJECTS ─────────────────────────────────── */}
        <section>
          <SectionDivider number="04" title="Founding Projects" titleFr="Projets Fondateurs" isFr={isFr} />
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Deux prototypes validés avec utilisateurs réels." : "Two prototypes validated with real users."}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="border border-slate-200 rounded overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-200" style={{ borderLeft: `4px solid ${proj.color}` }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold font-mono" style={{ color: proj.color }}>{proj.id}</span>
                        <span className="text-xs text-slate-400 font-mono">{proj.period}</span>
                      </div>
                      <h3 className="font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{proj.name}</h3>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded border font-mono" style={{ color: proj.color, borderColor: `${proj.color}40`, background: `${proj.color}0d` }}>
                      {proj.type}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{proj.desc}</p>

                  {/* Validation metrics */}
                  {proj.validation.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {proj.validation.map((v) => (
                        <div key={v.metric} className="bg-slate-50 rounded p-2">
                          <div className="text-base font-bold font-mono" style={{ color: proj.color }}>{v.value}</div>
                          <div className="text-xs text-slate-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{v.metric}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technical evolution in accordion */}
                  <Accordion label="Technical evolution & key learnings" labelFr="Évolution technique & enseignements clés" isFr={isFr}>
                    <div className="pt-3 space-y-3">
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {isFr ? "Évolution" : "Evolution"}
                        </div>
                        {proj.versions.map((v) => (
                          <div key={v.v} className="flex gap-3 mb-1">
                            <span className="text-xs font-bold shrink-0 mt-0.5 font-mono" style={{ color: proj.color, minWidth: "90px" }}>{v.v}</span>
                            <span className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{v.desc}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-slate-200 pt-3">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {isFr ? "Enseignements" : "Learnings"}
                        </div>
                        {proj.learnings.map((l) => (
                          <div key={l} className="flex gap-2 mb-1">
                            <span className="text-xs mt-0.5" style={{ color: "oklch(0.72 0.18 50)" }}>→</span>
                            <span className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{l}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 5: INFRASTRUCTURE ────────────────────────────────────── */}
        <section>
          <SectionDivider number="05" title="Infrastructure & Technical Expertise" titleFr="Infrastructure & Expertise Technique" isFr={isFr} />
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Opérationnel aujourd'hui vs. R&D nécessaire." : "Operational today vs. R&D required."}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {techStack.map((item) => (
              <div key={item.name} className="flex gap-3 p-4 border border-slate-200 rounded">
                <div className="shrink-0 mt-0.5">
                  {item.status === "available"
                    ? <CheckCircle size={16} style={{ color: "oklch(0.65 0.18 145)" }} />
                    : <AlertCircle size={16} style={{ color: "oklch(0.60 0.20 25)" }} />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.name}</span>
                    <StatusBadge variant={item.status === "available" ? "available" : "gap"} />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 6: CORE ENGINE VISION ─────────────────────────────────── */}
        <section>
          <SectionDivider number="06" title="Core Engine — Vision & Principles" titleFr="Core Engine — Vision & Principes" isFr={isFr} />
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "De la livraison de contenu à l'orchestration d'expériences." : "From content delivery to interactive experience orchestration."}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl mb-6" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Le GamiWays Core est un moteur d'orchestration headless pour expériences interactives guidées. Il n'est pas une application — c'est une couche fondation réutilisable par de multiples produits : learning, storytelling, médiation culturelle, formation corporate."
                : "The GamiWays Core is a headless orchestration engine for guided interactive experiences. It is not an application — it is a foundation layer reusable across multiple products: learning, storytelling, cultural mediation, corporate training."}
            </p>
          </div>

          {/* Use cases */}
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              { icon: "📚", title: isFr ? "Learning" : "Learning", desc: isFr ? "Expériences pédagogiques adaptatives — l'avatar guide l'apprenant à travers des objectifs structurés, mémorise sa progression et adapte le contenu." : "Adaptive learning experiences — the avatar guides learners through structured objectives, remembers their progress and adapts content." },
              { icon: "🎭", title: isFr ? "Storytelling" : "Storytelling", desc: isFr ? "Narrations interactives où les personnages se souviennent, évoluent et répondent aux choix du spectateur — au-delà du dialogue linéaire." : "Interactive narratives where characters remember, evolve and respond to viewer choices — beyond linear dialogue." },
              { icon: "🏛️", title: isFr ? "Médiation culturelle" : "Cultural Mediation", desc: isFr ? "Guides virtuels pour musées, sites patrimoniaux et expositions — expériences riches en contexte, multilingues, souveraines." : "Virtual guides for museums, heritage sites and exhibitions — context-rich, multilingual, sovereign experiences." },
              { icon: "🏢", title: isFr ? "Formation corporate" : "Corporate Training", desc: isFr ? "Simulations de situations professionnelles avec avatars spécialisés — onboarding, compliance, soft skills, évaluation continue." : "Professional situation simulations with specialized avatars — onboarding, compliance, soft skills, continuous assessment." },
            ].map((uc) => (
              <div key={uc.title} className="flex gap-3 p-4 border border-slate-200 rounded-lg bg-white">
                <span className="text-xl shrink-0">{uc.icon}</span>
                <div>
                  <div className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{uc.title}</div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 6 Principles */}
          <div className="mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "6 principes directeurs" : "6 guiding principles"}
            </h3>
            <div className="space-y-2">
              {[
                { num: "01", title: isFr ? "Experience First" : "Experience First", desc: isFr ? "La technologie sert la conversation — jamais l'inverse. Chaque choix architectural est évalué à l'aune de l'expérience utilisateur finale." : "Technology serves the conversation — never the reverse. Every architectural choice is evaluated against the final user experience." },
                { num: "02", title: isFr ? "Orchestration over Generation" : "Orchestration over Generation", desc: isFr ? "Décider avant de générer. Le Game Master évalue le contexte global et guide l'expérience de façon asynchrone — la génération LLM est une conséquence, pas un point de départ." : "Decide before generating. The Game Master evaluates global context and guides the experience asynchronously — LLM generation is a consequence, not a starting point." },
                { num: "03", title: isFr ? "Context is the Product" : "Context is the Product", desc: isFr ? "Ce qu'on injecte dans le LLM définit ce qu'on reçoit. La gestion du contexte (mémoire, monde, connaissance) est le principal différenciateur technique." : "What we inject into the LLM defines what we receive. Context management (memory, world, knowledge) is the primary technical differentiator." },
                { num: "04", title: isFr ? "LLM-Agnostic Always" : "LLM-Agnostic Always", desc: isFr ? "Aucun lock-in fournisseur. Le Core peut basculer entre OpenAI, Anthropic, Mistral ou des modèles self-hosted sans changer la logique métier." : "No provider lock-in. The Core can switch between OpenAI, Anthropic, Mistral or self-hosted models without changing business logic." },
                { num: "05", title: isFr ? "Keep Core Small" : "Keep Core Small", desc: isFr ? "Le Core n'inclut pas l'UI, la voix, les avatars vidéo ni les outils d'authoring. Ces couches se construisent par-dessus — le Core reste minimal, focalisé, stable." : "The Core does not include UI, voice, video avatars or authoring tools. These layers build on top — the Core stays minimal, focused, stable." },
                { num: "06", title: isFr ? "Measure Everything That Matters" : "Measure Everything That Matters", desc: isFr ? "Latence, coût, tokens, qualité — mesurés depuis le premier jour. L'itération basée sur des preuves, pas sur des intuitions." : "Latency, cost, tokens, quality — measured from day one. Evidence-based iteration, not intuition." },
              ].map((p) => (
                <div key={p.num} className="flex gap-4 p-4 border border-slate-200 rounded-lg bg-white">
                  <span className="text-xs font-black font-mono shrink-0 mt-0.5" style={{ color: "oklch(0.55 0.20 200)" }}>{p.num}</span>
                  <div>
                    <div className="text-sm font-bold text-slate-900 mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.title}</div>
                    <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 7: KEY CONCEPTS ──────────────────────────────────────── */}
        <section>
          <SectionDivider number="07" title="Key Concepts" titleFr="Concepts Clés" isFr={isFr} />
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Avatar + Game Master : deux agents, une expérience." : "Avatar + Game Master: two agents, one experience."}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl mb-6" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Le Core est structuré autour de concepts précis qui définissent un vocabulaire commun entre Gamilab et Memoways."
                : "The Core is structured around precise concepts that define a shared vocabulary between Gamilab and Memoways."}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{isFr ? "Concept" : "Concept"}</th>
                  <th>{isFr ? "Rôle" : "Role"}</th>
                  <th>{isFr ? "Description" : "Description"}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { concept: "Avatar", role: isFr ? "Acteur conversationnel" : "Conversational actor", desc: isFr ? "Persona IA avec identité, personnalité, autonomie et mémoire propre. Surface d'interaction — pas le produit lui-même." : "AI persona with identity, personality, autonomy and its own memory. Interaction surface — not the product itself." },
                  { concept: "Game Master (GM)", role: isFr ? "Directeur asynchrone" : "Async director", desc: isFr ? "Comprend l'état global de l'expérience, guide de façon asynchrone via triggers et directives. Décide quand intervenir, changer d'avatar ou injecter une guidance." : "Understands global experience state, guides asynchronously via triggers and directives. Decides when to intervene, switch avatars or inject guidance." },
                  { concept: "Session", role: isFr ? "Conteneur durable" : "Durable container", desc: isFr ? "Conteneur pour un run utilisateur dans un scénario. Persiste entre les conversations, maintient l'état global de progression." : "Container for a user run within a scenario. Persists across conversations, maintains global progression state." },
                  { concept: "Conversation", role: isFr ? "Épisode de dialogue" : "Dialogue episode", desc: isFr ? "Épisode borné de dialogue avec un avatar dans une session. Chaque conversation a son propre contexte de fenêtre glissante." : "Bounded dialogue episode with one avatar within a session. Each conversation has its own sliding window context." },
                  { concept: "Scenario", role: isFr ? "Template d'expérience" : "Experience template", desc: isFr ? "Définit les objectifs, les avatars assignés, les sources de connaissance, les règles de progression et les conditions de fin." : "Defines objectives, assigned avatars, knowledge sources, progression rules and completion conditions." },
                  { concept: "Memory", role: isFr ? "Système 3 couches" : "3-layer system", desc: isFr ? "Working memory (fenêtre glissante + résumé cumulatif), persistance épisodique (résumés de session), faits utilisateur long terme. Politique de sélection déterministe." : "Working memory (sliding window + cumulative summary), episodic persistence (session summaries), long-term user facts. Deterministic selection policy." },
                  { concept: "Context Engine v2", role: isFr ? "Assembleur déterministe" : "Deterministic assembler", desc: isFr ? "Module dédié qui combine 7 dimensions (mémoire court terme, working memory, faits long terme, config scénario, retrieval RAG, directives GM, persona utilisateur) en un payload borné par budget-token. Chaque décision de sélection/trimming est tracée dans un format lisible par machine." : "Dedicated module combining 7 dimensions (short-term memory, working memory, long-term facts, scenario config, RAG retrieval, GM directives, user persona) into a token-budget-bounded payload. Every selection/trimming decision is traced in machine-readable format." },
                  { concept: "Knowledge Pipeline", role: isFr ? "RAG typé" : "Typed RAG", desc: isFr ? "Ingestion (PDF, MD, texte), chunking, embeddings pgvector, retrieval typé en 3 catégories : memory (historique utilisateur), world (connaissances du domaine), media (références multimédias). Cycle de vie : queued → running → completed | failed." : "Ingestion (PDF, MD, text), pgvector embeddings, retrieval typed into 3 categories: memory (user history), world (domain knowledge), media (multimedia references). Lifecycle: queued → running → completed | failed." },
                  { concept: "User Persona", role: isFr ? "Profil persistant" : "Persistent profile", desc: isFr ? "Profil utilisateur persistant (rôle, style, préférences, contexte) injecté automatiquement dans le prompt de l'avatar et dans le contexte du Game Master. APIs GET/PUT /v1/users/:id/persona." : "Persistent user profile (role, style, preferences, context) automatically injected into the avatar prompt and Game Master context. APIs GET/PUT /v1/users/:id/persona." },
                  { concept: "Runtime State", role: isFr ? "Snapshot observable" : "Observable snapshot", desc: isFr ? "Endpoint GET /v1/sessions/:id/runtime-state exposant l'état complet de la session : mémoire assemblée, directives GM actives, métriques de tour, état de traitement. Complété par un flux SSE d'événements asynchrones." : "GET /v1/sessions/:id/runtime-state endpoint exposing full session state: assembled memory, active GM directives, turn metrics, processing state. Complemented by an SSE stream of async events." },
                ].map((row) => (
                  <tr key={row.concept}>
                    <td><span className="font-bold text-xs font-mono" style={{ color: "oklch(0.45 0.18 200)" }}>{row.concept}</span></td>
                    <td><span className="text-xs font-semibold text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{row.role}</span></td>
                    <td className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── SECTION 8: ROADMAP ───────────────────────────────────────────── */}
        <section>
          <SectionDivider number="08" title="Build Roadmap" titleFr="Feuille de Route" isFr={isFr} />
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Trois phases, une vision." : "Three phases, one vision."}
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                phase: "A",
                title: isFr ? "Minimal Core" : "Minimal Core",
                period: "April → July 2026",
                status: isFr ? "En cours" : "In Progress",
                statusColor: "oklch(0.50 0.18 50)",
                statusBg: "oklch(0.97 0.04 50)",
                color: "oklch(0.55 0.20 200)",
                desc: isFr ? "Construire et valider la boucle fondamentale : entrée utilisateur → assemblage contexte → réponse avatar orchestrée → mise à jour mémoire. Back-office opérationnel. Prototype text-based avec un scénario réel." : "Build and validate the fundamental loop: user input → context assembly → orchestrated avatar response → memory update. Operational back-office. Text-based prototype with one real scenario.",
                items: isFr
                  ? ["Plateforme monorepo (pnpm + Turborepo)", "Boucle LLM avec abstraction fournisseur", "Game Master asynchrone v1 (Director–Actor)", "Memory System v3 (3 couches)", "Back-office Next.js + inspecteur runtime", "Observabilité LLM (Langfuse self-hosted)", "Prototype d'été avec scénario réel"]
                  : ["Monorepo platform (pnpm + Turborepo)", "LLM loop with provider abstraction", "Async Game Master v1 (Director–Actor)", "Memory System v3 (3 layers)", "Next.js back-office + runtime inspector", "LLM observability (Langfuse self-hosted)", "Summer prototype with real scenario"],
              },
              {
                phase: "B",
                title: isFr ? "Expériences Enrichies" : "Enhanced Experiences",
                period: "TBD",
                status: isFr ? "Planifié" : "Planned",
                statusColor: "oklch(0.50 0.01 265)",
                statusBg: "oklch(0.96 0.01 265)",
                color: "oklch(0.65 0.18 145)",
                desc: isFr ? "Ajouter la voix (STT + TTS streaming), les déclencheurs multimédia, plusieurs scénarios, des systèmes de mémoire plus riches et un frontend utilisateur." : "Add voice (STT + TTS streaming), multimedia triggers, multiple scenarios, richer memory systems, and a user-facing frontend.",
                items: isFr
                  ? ["Intégration STT (Deepgram / Whisper)", "TTS streaming (Cartesia / Inworld TTS-2)", "Déclencheurs multimédia pilotés par GM", "Frontend utilisateur avec historique de session", "Moteur de progression guidée"]
                  : ["STT integration (Deepgram / Whisper)", "TTS streaming (Cartesia / Inworld TTS-2)", "GM-driven multimedia triggers", "User frontend with session history", "Guided progression engine"],
              },
              {
                phase: "C",
                title: isFr ? "Recherche & Scale" : "Research & Scale Readiness",
                period: "TBD",
                status: isFr ? "Planifié" : "Planned",
                statusColor: "oklch(0.50 0.01 265)",
                statusBg: "oklch(0.96 0.01 265)",
                color: "oklch(0.72 0.18 50)",
                desc: isFr ? "Préparer la plateforme pour les intégrations avancées : avatars expressifs, multi-tenancy, scaling, SDKs et partenariats." : "Prepare the platform for advanced integrations: expressive avatars, multi-tenancy, scaling, SDKs and partnerships.",
                items: isFr
                  ? ["Intégration avatar vidéo expressif temps réel", "Multi-tenancy & sécurité (JWT, RBAC)", "SDK public & API versionnée", "Documentation développeur", "Partenariats de recherche"]
                  : ["Real-time expressive video avatar integration", "Multi-tenancy & security (JWT, RBAC)", "Public SDK & versioned API", "Developer documentation", "Research partnerships"],
              },
            ].map((ph) => (
              <div key={ph.phase} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <div className="px-5 py-4 border-b border-slate-200" style={{ borderLeft: `4px solid ${ph.color}` }}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black font-mono px-2 py-0.5 rounded" style={{ color: ph.color, background: `${ph.color}15` }}>PHASE {ph.phase}</span>
                      <span className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{ph.title}</span>
                      <span className="text-xs font-mono text-slate-400">{ph.period}</span>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ color: ph.statusColor, background: ph.statusBg }}>{ph.status}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{ph.desc}</p>
                </div>
                <div className="px-5 py-3">
                  <div className="flex flex-wrap gap-2">
                    {ph.items.map((item) => (
                      <span key={item} className="text-xs px-2 py-1 rounded border border-slate-200 text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Link to Project Status */}
          <div className="mt-6 p-4 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-slate-900 mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Suivi détaillé des épics" : "Detailed epic tracking"}
              </div>
              <p className="text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr ? "Tableau complet des épics avec statut ✅/🔄/⏳ — mis à jour depuis le repo de développement." : "Full epic table with ✅/🔄/⏳ status — synced from the development repository."}
              </p>
            </div>
            <InternalLink
              to="/project/status"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-4 py-2 transition-all hover:opacity-90"
              style={{ background: "oklch(0.55 0.20 200)", fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}
            >
              {isFr ? "Voir l'état d'avancement" : "View build status"}
              <ArrowRight size={14} />
            </InternalLink>
          </div>
        </section>

      </div>
    </div>
  );
}
