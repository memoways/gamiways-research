/*
 * Project — DigiDouble Research Portal
 * Design: schema-first, details in accordion/toggle
 * Sections: Platform (PlatformMode) → Gap (GapMatrix) → Competitive → Infrastructure
 * i18n: EN (default) / FR via LangContext
 */
import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle } from "lucide-react";
import ProductArchDiagram from "@/components/diagrams/ProductArchDiagram";
import GapMatrixDiagram from "@/components/diagrams/GapMatrixDiagram";
import RadarCompareDiagram from "@/components/diagrams/RadarCompareDiagram";
import StatusBadge from "@/components/StatusBadge";
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
    { criterion: isFr ? "Avatars temps réel" : "Real-time avatars", heygen: { value: "✓✓✓", level: 3 }, synthesia: { value: "✗", level: 0 }, flowise: { value: "✓ (OS)", level: 1 }, digidouble: { value: "✓✓✓ (R&D)", level: 3, rd: true } },
    { criterion: isFr ? "Langage corporel" : "Body language", heygen: { value: "✓", level: 1 }, synthesia: { value: "✗", level: 0 }, flowise: { value: "✗", level: 0 }, digidouble: { value: "✓✓✓ (R&D)", level: 3, rd: true } },
    { criterion: isFr ? "Sync multi-stream" : "Multi-stream sync", heygen: { value: "✗", level: 0 }, synthesia: { value: "✗", level: 0 }, flowise: { value: "✓", level: 2 }, digidouble: { value: "✓✓✓", level: 3, rd: false } },
    { criterion: isFr ? "Mémoire conversationnelle" : "Conversational memory", heygen: { value: "✗", level: 0 }, synthesia: { value: "✗", level: 0 }, flowise: { value: "✓", level: 2 }, digidouble: { value: "✓✓✓ (R&D)", level: 3, rd: true } },
    { criterion: isFr ? "Éditeur nœuds" : "Node editor", heygen: { value: "✗", level: 0 }, synthesia: { value: "✗", level: 0 }, flowise: { value: "✓ (tech)", level: 1 }, digidouble: { value: "✓✓✓", level: 3, rd: false } },
    { criterion: isFr ? "Souveraineté données" : "Data sovereignty", heygen: { value: "✗", level: 0 }, synthesia: { value: "✗", level: 0 }, flowise: { value: "✓ (self)", level: 2 }, digidouble: { value: "✓✓✓", level: 3, rd: false } },
    { criterion: isFr ? "Risque censure" : "Censorship risk", heygen: { value: isFr ? "Élevé" : "High", level: 0 }, synthesia: { value: isFr ? "Élevé" : "High", level: 0 }, flowise: { value: isFr ? "Élevé" : "High", level: 0 }, digidouble: { value: isFr ? "Nul (souverain)" : "None (sovereign)", level: 3, rd: false } },
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
    <div className="min-h-screen pt-16">
      {/* Page header */}
      <div className="border-b border-slate-200 py-10">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">01</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-mono text-slate-400">{isFr ? "Contexte & Vision" : "Context & Vision"}</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}>
            {isFr ? "Projet DigiDouble" : "DigiDouble Project"}
          </h1>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Collaboration entre Memoways (Genève, 14 ans d'expertise vidéo interactive) et Gamilab (startup voice-first AI, SDK Audiogami)."
              : "Collaboration between Memoways (Geneva, 14 years of interactive video expertise) and Gamilab (voice-first AI startup, Audiogami SDK)."}
          </p>
        </div>
      </div>

      <div className="container max-w-4xl py-14 space-y-20">

        {/* ── SECTION 1: PLATFORM ──────────────────────────────────────────── */}
        <section>
          <SectionDivider number="01" title="Product Vision — Two Modes, One Engine" titleFr="Vision Produit — Deux Modes, Un Moteur" isFr={isFr} />
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Edugami + Storygami, moteur partagé." : "Edugami + Storygami, shared engine."}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "Hover sur les composants du moteur pour les détails techniques. Les deux modes partagent la même infrastructure."
                : "Hover over engine components for technical details. Both modes share the same infrastructure."}
            </p>
          </div>
          <ProductArchDiagram />
          <Accordion label="Fundamental differentiation — why this is new" labelFr="Différenciation fondamentale — pourquoi c'est nouveau" isFr={isFr}>
            <div className="pt-3">
              <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? "DigiDouble crée un nouveau type d'outil de \"montage\" vidéo où le montage n'est plus temporel (timeline) mais spatial et conversationnel — nœuds + agents + streams synchronisés temps réel. Analogie : HeyGen/Synthesia = iMovie (simple, limité). Flowise + custom = Final Cut XML (puissant, complexe). DigiDouble = Final Cut Pro (puissant ET utilisable par des créateurs non-techniques)."
                  : "DigiDouble creates a new type of video \"editing\" tool where editing is no longer temporal (timeline) but spatial and conversational — nodes + agents + real-time synchronized streams. Analogy: HeyGen/Synthesia = iMovie (simple, limited). Flowise + custom = Final Cut XML (powerful, complex). DigiDouble = Final Cut Pro (powerful AND usable by non-technical creators)."}
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
              {isFr ? "Hover sur les cellules pour les détails." : "Hover over cells for details."}
            </p>
          </div>
          <GapMatrixDiagram />
        </section>

        {/* ── SECTION 3: COMPETITIVE TABLE ─────────────────────────────────── */}
        <section>
          <SectionDivider number="03" title="Competitive Comparison" titleFr="Comparaison Compétitive" isFr={isFr} />
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "HeyGen · Synthesia · Flowise vs DigiDouble" : "HeyGen · Synthesia · Flowise vs DigiDouble"}
            </h2>
          </div>

          {/* Radar */}
          <div className="border border-slate-200 rounded-lg p-5 bg-white mb-4">
            <RadarCompareDiagram />
          </div>

          {/* Detailed table in accordion */}
          <Accordion label="Detailed criterion-by-criterion comparison" labelFr="Comparaison détaillée critère par critère" isFr={isFr}>
            <div className="pt-3 overflow-x-auto">
              <table className="w-full border-collapse" style={{ minWidth: "520px" }}>
                <thead>
                  <tr>
                    <th className="text-left py-2 pr-4 text-xs font-mono text-slate-400 font-normal">{isFr ? "Critère" : "Criterion"}</th>
                    <th className="text-center py-2 px-2 text-xs font-mono text-slate-500 font-semibold">HeyGen</th>
                    <th className="text-center py-2 px-2 text-xs font-mono text-slate-500 font-semibold">Synthesia</th>
                    <th className="text-center py-2 px-2 text-xs font-mono text-slate-500 font-semibold">Flowise</th>
                    <th className="text-center py-2 px-2 text-xs font-mono font-bold" style={{ color: "oklch(0.45 0.18 200)" }}>DigiDouble</th>
                  </tr>
                </thead>
                <tbody>
                  {competitiveData.map((row) => (
                    <tr key={row.criterion} className="border-t border-slate-100">
                      <td className="py-2 pr-4 text-xs font-medium text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{row.criterion}</td>
                      {[row.heygen, row.synthesia, row.flowise, row.digidouble].map((cell, ci) => (
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

      </div>
    </div>
  );
}
