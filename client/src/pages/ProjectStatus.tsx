/**
 * ProjectStatus.tsx — GamiWays Research Portal
 * Page: Core Engine Build Status — épics, phases, état d'avancement
 * Source: github.com/gami-lab/gami-digidouble-core
 * Design: schema-first, status badges, phase grouping
 * i18n: EN / FR via LangContext
 */
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import { CheckCircle2, Clock, Circle, ExternalLink, GitBranch } from "lucide-react";

type EpicStatus = "done" | "in-progress" | "planned";

interface Epic {
  id: string;
  title: string;
  titleFr: string;
  status: EpicStatus;
  desc: string;
  descFr: string;
}

interface Phase {
  id: string;
  title: string;
  titleFr: string;
  period: string;
  goal: string;
  goalFr: string;
  color: string;
  epics: Epic[];
}

const PHASES: Phase[] = [
  {
    id: "A",
    title: "Phase A — Minimal Core",
    titleFr: "Phase A — Minimal Core",
    period: "April → July 2026",
    goal: "Build and validate the fundamental loop: user input → context assembly → orchestrated avatar response → memory update. Deliver a usable back-office and text-based prototype.",
    goalFr: "Construire et valider la boucle fondamentale : entrée utilisateur → assemblage contexte → réponse avatar orchestrée → mise à jour mémoire. Livrer un back-office utilisable et un prototype text-based.",
    color: "oklch(0.55 0.20 200)",
    epics: [
      { id: "1.1", title: "Platform Setup", titleFr: "Mise en place plateforme", status: "done", desc: "Monorepo (pnpm + Turborepo), TypeScript strict, Docker Compose, CI baseline", descFr: "Monorepo (pnpm + Turborepo), TypeScript strict, Docker Compose, CI baseline" },
      { id: "1.2", title: "Initial LLM Loop", titleFr: "Boucle LLM initiale", status: "done", desc: "Direct provider SDKs, streaming abstraction, JSON enforcement, retry/timeout wrappers", descFr: "SDKs fournisseurs directs, abstraction streaming, JSON enforcement, wrappers retry/timeout" },
      { id: "2.1", title: "Conversation Lifecycle", titleFr: "Cycle de vie conversation", status: "done", desc: "Session + Conversation entities, message routing, exchange persistence", descFr: "Entités Session + Conversation, routage messages, persistance exchanges" },
      { id: "2.2", title: "Persistence Layer", titleFr: "Couche persistance", status: "done", desc: "PostgreSQL + pgvector schema, Redis session cache, ioredis client", descFr: "Schéma PostgreSQL + pgvector, cache session Redis, client ioredis" },
      { id: "2.3", title: "Manual Test Console", titleFr: "Console de test manuelle", status: "done", desc: "Back-office Next.js, session inspector, conversation replay, GM debug view", descFr: "Back-office Next.js, inspecteur session, replay conversation, vue debug GM" },
      { id: "2.4", title: "Admin Management", titleFr: "Gestion admin", status: "done", desc: "Scenario config CRUD, avatar management, API key auth", descFr: "CRUD config scénario, gestion avatars, auth API key" },
      { id: "2.5", title: "GM Debug View", titleFr: "Vue debug GM", status: "done", desc: "Game Master state inspector, directive log, async trigger trace", descFr: "Inspecteur état Game Master, log directives, trace triggers asynchrones" },
      { id: "2.6", title: "Runtime Inspector", titleFr: "Inspecteur runtime", status: "done", desc: "Session-level state visualization, memory snapshot, context assembly trace", descFr: "Visualisation état session, snapshot mémoire, trace assemblage contexte" },
      { id: "O1", title: "Health & Dependency Monitoring", titleFr: "Monitoring santé & dépendances", status: "done", desc: "Health endpoints, dependency checks (DB, Redis, LLM), structured logging", descFr: "Endpoints santé, vérification dépendances (DB, Redis, LLM), logging structuré" },
      { id: "4.1", title: "Async Game Master v1", titleFr: "Game Master asynchrone v1", status: "done", desc: "Director–Actor model, async trigger evaluation, GM directive injection into avatar flow", descFr: "Modèle Director–Actor, évaluation triggers asynchrones, injection directives GM dans flux avatar" },
      { id: "4.2c", title: "Memory System v3", titleFr: "Système mémoire v3", status: "done", desc: "Working memory (sliding window + cumulative summary), episodic persistence, long-term user facts, deterministic selection policy, memory hydration", descFr: "Mémoire de travail (fenêtre glissante + résumé cumulatif), persistance épisodique, faits utilisateur long terme, politique de sélection déterministe, hydratation mémoire" },
      { id: "4.3", title: "Performance Baseline", titleFr: "Baseline performance", status: "done", desc: "Latency measurement (TTFT, end-to-end), token accounting, cost tracking per session/scenario", descFr: "Mesure latence (TTFT, end-to-end), comptabilité tokens, suivi coût par session/scénario" },
      { id: "4.4", title: "Multi-Avatar Navigation v1", titleFr: "Navigation multi-avatar v1", status: "done", desc: "Avatar switching logic, GM-driven transitions, persona isolation per conversation", descFr: "Logique de changement d'avatar, transitions pilotées par GM, isolation persona par conversation" },
      { id: "CX-OBS", title: "LLM Observability Boundary", titleFr: "Frontière observabilité LLM", status: "done", desc: "ObservedLlmAdapter enforced across all call sites — Langfuse traces, latency, token counts, cost estimates, model metadata", descFr: "ObservedLlmAdapter appliqué sur tous les points d'appel — traces Langfuse, latence, tokens, coûts, métadonnées modèle" },
      { id: "5.1", title: "Knowledge System — Multi-layer", titleFr: "Système de connaissance multi-couches", status: "in-progress", desc: "Document ingestion (PDF, MD, text), chunking, embeddings, pgvector retrieval, context-aware filtering", descFr: "Ingestion documents (PDF, MD, texte), chunking, embeddings, retrieval pgvector, filtrage contextuel" },
      { id: "5.2", title: "Context Engine", titleFr: "Moteur de contexte", status: "planned", desc: "3-dimension context assembly: Memory + Experience/World + Knowledge. Deterministic injection policy.", descFr: "Assemblage contexte 3 dimensions : Mémoire + Expérience/Monde + Connaissance. Politique d'injection déterministe." },
      { id: "5.3", title: "UX Streaming Layer", titleFr: "Couche UX streaming", status: "planned", desc: "WebSocket streaming, SSE fallback, progressive token delivery to frontend", descFr: "Streaming WebSocket, fallback SSE, livraison progressive des tokens vers le frontend" },
      { id: "5.4", title: "Guided Progression Engine", titleFr: "Moteur de progression guidée", status: "planned", desc: "Scenario objectives tracking, progression state machine, GM-driven narrative milestones", descFr: "Suivi objectifs scénario, machine à états de progression, jalons narratifs pilotés par GM" },
      { id: "6.1", title: "Scenario Builder", titleFr: "Constructeur de scénarios", status: "planned", desc: "Scenario configuration UI, avatar assignment, knowledge source binding, objective definition", descFr: "UI configuration scénario, assignation avatars, liaison sources de connaissance, définition objectifs" },
      { id: "6.2", title: "Real Scenario Validation", titleFr: "Validation scénario réel", status: "planned", desc: "End-to-end test with a real use case (learning or storytelling), user feedback collection", descFr: "Test end-to-end avec un cas d'usage réel (learning ou storytelling), collecte feedback utilisateurs" },
      { id: "6.3", title: "Summer Prototype Delivery", titleFr: "Livraison prototype d'été", status: "planned", desc: "Functional prototype: text-based, back-office operational, one real scenario deployed", descFr: "Prototype fonctionnel : text-based, back-office opérationnel, un scénario réel déployé" },
    ],
  },
  {
    id: "B",
    title: "Phase B — Enhanced Experiences",
    titleFr: "Phase B — Expériences Enrichies",
    period: "TBD",
    goal: "Add voice input/output, multimedia triggers, multiple scenarios, richer memory systems, and a user-facing frontend.",
    goalFr: "Ajouter la voix (entrée/sortie), les déclencheurs multimédia, plusieurs scénarios, des systèmes de mémoire plus riches et un frontend utilisateur.",
    color: "oklch(0.65 0.18 145)",
    epics: [
      { id: "B.1", title: "Voice Integration (STT + TTS)", titleFr: "Intégration voix (STT + TTS)", status: "planned", desc: "STT pipeline (Deepgram / Whisper), TTS streaming (Cartesia / Inworld TTS-2), real-time audio delivery", descFr: "Pipeline STT (Deepgram / Whisper), TTS streaming (Cartesia / Inworld TTS-2), livraison audio temps réel" },
      { id: "B.2", title: "Multimedia Triggers", titleFr: "Déclencheurs multimédia", status: "planned", desc: "GM-driven media events: image display, video playback, document reveal during conversation", descFr: "Événements médias pilotés par GM : affichage image, lecture vidéo, révélation document pendant la conversation" },
      { id: "B.3", title: "User-Facing Frontend", titleFr: "Frontend utilisateur", status: "planned", desc: "Conversation UI, session history, progression visualization, multi-device support", descFr: "UI conversation, historique session, visualisation progression, support multi-device" },
    ],
  },
  {
    id: "C",
    title: "Phase C — Research & Scale Readiness",
    titleFr: "Phase C — Recherche & Préparation au Scale",
    period: "TBD",
    goal: "Prepare the platform for advanced integrations: expressive avatars, advanced persona systems, scaling, SDKs, and research partnerships.",
    goalFr: "Préparer la plateforme pour les intégrations avancées : avatars expressifs, systèmes de persona avancés, scaling, SDKs et partenariats de recherche.",
    color: "oklch(0.72 0.18 50)",
    epics: [
      { id: "C.1", title: "Expressive Avatar Integration", titleFr: "Intégration avatar expressif", status: "planned", desc: "Real-time video avatar binding, body language triggers, lip-sync coordination", descFr: "Liaison avatar vidéo temps réel, déclencheurs langage corporel, coordination lip-sync" },
      { id: "C.2", title: "Multi-tenancy & Security", titleFr: "Multi-tenancy & Sécurité", status: "planned", desc: "Tenant isolation, JWT auth, RBAC, data residency controls", descFr: "Isolation tenant, auth JWT, RBAC, contrôles résidence des données" },
      { id: "C.3", title: "SDK & API Productization", titleFr: "Productisation SDK & API", status: "planned", desc: "Public SDK, versioned API, developer documentation, integration examples", descFr: "SDK public, API versionnée, documentation développeur, exemples d'intégration" },
    ],
  },
];

function StatusIcon({ status }: { status: EpicStatus }) {
  if (status === "done") return <CheckCircle2 size={15} style={{ color: "oklch(0.65 0.18 145)" }} />;
  if (status === "in-progress") return <Clock size={15} style={{ color: "oklch(0.72 0.18 50)" }} />;
  return <Circle size={15} style={{ color: "oklch(0.70 0.01 265)" }} />;
}

function StatusBadge({ status, isFr }: { status: EpicStatus; isFr: boolean }) {
  const labels: Record<EpicStatus, { en: string; fr: string; color: string; bg: string }> = {
    done: { en: "Done", fr: "Terminé", color: "oklch(0.45 0.18 145)", bg: "oklch(0.96 0.04 145)" },
    "in-progress": { en: "In Progress", fr: "En cours", color: "oklch(0.50 0.18 50)", bg: "oklch(0.97 0.04 50)" },
    planned: { en: "Planned", fr: "Planifié", color: "oklch(0.50 0.01 265)", bg: "oklch(0.96 0.01 265)" },
  };
  const s = labels[status];
  return (
    <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ color: s.color, background: s.bg }}>
      {isFr ? s.fr : s.en}
    </span>
  );
}

export default function ProjectStatus() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  const allEpics = PHASES.flatMap((p) => p.epics);
  const doneCount = allEpics.filter((e) => e.status === "done").length;
  const inProgressCount = allEpics.filter((e) => e.status === "in-progress").length;
  const totalCount = allEpics.length;
  const progressPct = Math.round((doneCount / totalCount) * 100);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="border-b border-slate-200 py-10">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">05</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-mono text-slate-400">{isFr ? "The Project" : "The Project"}</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}>
            {isFr ? "État d'avancement du Core" : "Core Engine Build Status"}
          </h1>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl mb-4" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Suivi des épics de construction du moteur GamiWays Core — mis à jour manuellement depuis le repo de développement."
              : "Epic-level progress tracking for the GamiWays Core Engine build — manually synced from the development repository."}
          </p>
          {/* GitHub link */}
          <a
            href="https://github.com/gami-lab/gami-digidouble-core"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono transition-colors hover:bg-slate-50"
            style={{ borderColor: "oklch(0.72 0.18 200)40", color: "oklch(0.45 0.18 200)" }}
          >
            <GitBranch size={13} />
            gami-lab/gami-digidouble-core
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      <div className="container max-w-4xl py-10 space-y-12">

        {/* Global progress */}
        <div className="p-6 border border-slate-200 rounded-lg bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Progression globale — Phase A MVP" : "Overall Progress — Phase A MVP"}
            </span>
            <span className="text-sm font-mono font-bold" style={{ color: "oklch(0.55 0.20 200)" }}>
              {doneCount}/{totalCount} {isFr ? "épics" : "epics"} · {progressPct}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%`, background: "oklch(0.55 0.20 200)" }}
            />
          </div>
          <div className="flex gap-6 mt-3">
            {[
              { status: "done" as EpicStatus, count: doneCount, label: isFr ? "Terminés" : "Done" },
              { status: "in-progress" as EpicStatus, count: inProgressCount, label: isFr ? "En cours" : "In Progress" },
              { status: "planned" as EpicStatus, count: totalCount - doneCount - inProgressCount, label: isFr ? "Planifiés" : "Planned" },
            ].map(({ status, count, label }) => (
              <div key={status} className="flex items-center gap-2">
                <StatusIcon status={status} />
                <span className="text-xs text-slate-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="font-bold text-slate-700">{count}</span> {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Phases */}
        {PHASES.map((phase) => {
          const phaseDone = phase.epics.filter((e) => e.status === "done").length;
          const phaseTotal = phase.epics.length;
          return (
            <section key={phase.id}>
              {/* Phase header */}
              <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="text-xs font-black font-mono px-2 py-0.5 rounded"
                      style={{ color: phase.color, background: `${phase.color}15` }}
                    >
                      PHASE {phase.id}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{phase.period}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
                    {isFr ? phase.titleFr : phase.title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {isFr ? phase.goalFr : phase.goal}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-2xl font-black font-mono" style={{ color: phase.color }}>
                    {phaseDone}/{phaseTotal}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">{isFr ? "épics" : "epics"}</div>
                </div>
              </div>

              {/* Epics list */}
              <div className="space-y-2">
                {phase.epics.map((epic) => (
                  <div
                    key={epic.id}
                    className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg bg-white hover:border-slate-300 transition-colors"
                    style={epic.status === "done" ? { borderLeftColor: "oklch(0.65 0.18 145)", borderLeftWidth: "3px" } : {}}
                  >
                    <div className="shrink-0 mt-0.5">
                      <StatusIcon status={epic.status} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-mono text-slate-400">{epic.id}</span>
                        <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {isFr ? epic.titleFr : epic.title}
                        </span>
                        <StatusBadge status={epic.status} isFr={isFr} />
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                        {isFr ? epic.descFr : epic.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Footer note */}
        <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>
          <span className="font-semibold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Note éditoriale" : "Editorial note"}
          </span>
          {" — "}
          {isFr
            ? "Cette page est mise à jour manuellement depuis le repo de développement "
            : "This page is manually synced from the development repository "}
          <a
            href="https://github.com/gami-lab/gami-digidouble-core"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono hover:underline"
            style={{ color: "oklch(0.45 0.18 200)" }}
          >
            gami-lab/gami-digidouble-core <ExternalLink size={10} />
          </a>
          {isFr
            ? ". Elle reflète l'état réel du projet à la date de dernière mise à jour du portail."
            : ". It reflects the actual project state as of the portal's last update date."}
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-3 pt-2">
          <InternalLink
            to="/project"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-4 py-2 transition-all hover:opacity-90"
            style={{ background: "oklch(0.55 0.20 200)", fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}
          >
            {isFr ? "← Projet GamiWays" : "← GamiWays Project"}
          </InternalLink>
          <InternalLink
            to="/research/architecture"
            className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all"
            style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}
          >
            {isFr ? "Architecture Cible →" : "Target Architecture →"}
          </InternalLink>
        </div>
      </div>
    </div>
  );
}
