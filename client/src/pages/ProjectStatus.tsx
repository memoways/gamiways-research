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

// Date de dernière synchronisation avec le repo — à mettre à jour manuellement à chaque sync
const LAST_SYNC_DATE = "2026-05-14";

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
      { id: "1.1", title: "Platform Setup", titleFr: "Mise en place plateforme", status: "done", desc: "Monorepo (pnpm + Turborepo), TypeScript strict, Docker Compose, CI baseline. Completed 2026-04-22.", descFr: "Monorepo (pnpm + Turborepo), TypeScript strict, Docker Compose, CI baseline. Terminé le 22 avril 2026." },
      { id: "1.2", title: "First LLM Loop + Observability", titleFr: "Boucle LLM initiale + Observabilité", status: "done", desc: "Provider abstraction layer, OpenAI/Anthropic/Mistral adapters, Langfuse integration, /v1/exchange, API-key auth, latency/token metrics. Completed 2026-04-22.", descFr: "Couche d'abstraction fournisseur, adaptateurs OpenAI/Anthropic/Mistral, intégration Langfuse, /v1/exchange, auth API-key, métriques latence/tokens. Terminé le 22 avril 2026." },
      { id: "2.1", title: "Avatar Agent v1", titleFr: "Agent Avatar v1", status: "done", desc: "Avatar domain model, persona prompt assembly, multi-turn conversation flow, message persistence, POST /v1/conversations/{id}/messages. Completed 2026-04-22.", descFr: "Modèle domaine avatar, assemblage prompt persona, flux conversation multi-tours, persistance messages, POST /v1/conversations/{id}/messages. Terminé le 22 avril 2026." },
      { id: "2.1b", title: "Avatar Agent v2 — Memory + RAG", titleFr: "Agent Avatar v2 — Mémoire + RAG", status: "done", desc: "Context-aware avatars: user persona injection, working memory, long-term facts, typed RAG retrieval (memory|world|media). Canonical shared DTO ownership. Completed 2026-05-13.", descFr: "Avatars conscients du contexte : injection persona utilisateur, mémoire de travail, faits long terme, retrieval RAG typé (memory|world|media). Propriété DTO partagée canonique. Terminé le 13 mai 2026." },
      { id: "2.2", title: "Scenario & Session Lifecycle", titleFr: "Cycle de vie Scénario & Session", status: "done", desc: "Scenarios, avatars, sessions, conversations, lifecycle APIs, explicit conversation model, session reset, avatar CRUD, scenario CRUD, compaction triggers. Completed 2026-04-22.", descFr: "Scénarios, avatars, sessions, conversations, APIs cycle de vie, modèle conversation explicite, reset session, CRUD avatar, CRUD scénario, déclencheurs compaction. Terminé le 22 avril 2026." },
      { id: "2.5", title: "Admin CRUD + Console Integration", titleFr: "CRUD Admin + Intégration Console", status: "done", desc: "Admin CRUD APIs, session admin tooling, inline scenario/avatar editing, operational reset tooling, console integration, conflict-safe deletes. Completed 2026-04-28.", descFr: "APIs CRUD admin, outils admin session, édition inline scénario/avatar, outils reset opérationnels, intégration console, suppressions sans conflit. Terminé le 28 avril 2026." },
      { id: "2.6", title: "GM Debug Panel v1", titleFr: "Panneau Debug GM v1", status: "done", desc: "GM event inspection, transition history, unlocked avatar inspection, GM notes, admin session inspection, safe observability APIs, event filtering. Completed 2026-04-28.", descFr: "Inspection événements GM, historique transitions, inspection avatars débloqués, notes GM, inspection session admin, APIs observabilité sécurisées, filtrage événements. Terminé le 28 avril 2026." },
      { id: "2.7", title: "Runtime Inspector v2", titleFr: "Inspecteur Runtime v2", status: "done", desc: "Unified runtime inspector, assembled context inspection, runtime metrics, memory inspection, SSE event integration, runtime admin actions (GM replay, memory refresh, memory clear). Completed 2026-05-07.", descFr: "Inspecteur runtime unifié, inspection contexte assemblé, métriques runtime, inspection mémoire, intégration événements SSE, actions admin runtime (replay GM, refresh mémoire, clear mémoire). Terminé le 07 mai 2026." },
      { id: "2.8", title: "Console Debugging Redesign", titleFr: "Refonte Console Debugging", status: "done", desc: "Unified debugging shell, memory evolution workspace, GM causality trace, turn profiler, persona-first flow, consolidated debug navigation, runtime visualization redesign. Completed 2026-05-07.", descFr: "Shell de débogage unifié, espace de travail évolution mémoire, trace causalité GM, profileur de tour, flux persona-first, navigation debug consolidée, refonte visualisation runtime. Terminé le 07 mai 2026." },
      { id: "3.1", title: "Health & Dependency Monitoring", titleFr: "Monitoring Santé & Dépendances", status: "done", desc: "Dependency probes, admin health endpoint, degraded-state reporting, Redis/Postgres/LLM checks, runtime dependency inspection. Completed 2026-04-30.", descFr: "Sondes de dépendances, endpoint santé admin, reporting état dégradé, vérifications Redis/Postgres/LLM, inspection dépendances runtime. Terminé le 30 avril 2026." },
      { id: "3.2", title: "Inspector Consolidation & Contract Cleanup", titleFr: "Consolidation Inspecteur & Nettoyage Contrats", status: "done", desc: "Inspector contract ownership cleanup, DTO canonicalization, backend route consolidation, console flow unification, duplicate DTO removal, inspector hardening tests. Completed 2026-05-10.", descFr: "Nettoyage propriété contrats inspecteur, canonicalisation DTO, consolidation routes backend, unification flux console, suppression DTO dupliqués, tests durcissement inspecteur. Terminé le 10 mai 2026." },
      { id: "4.1", title: "Async Game Master v1", titleFr: "Game Master Asynchrone v1", status: "done", desc: "Async GM orchestration, avatar unlock logic, routing decisions, GM directives, event-driven orchestration, AI Guided Discovery reference scenario, runtime GM observability. Completed 2026-04-29.", descFr: "Orchestration GM asynchrone, logique déverrouillage avatar, décisions de routage, directives GM, orchestration event-driven, scénario référence AI Guided Discovery, observabilité GM runtime. Terminé le 29 avril 2026." },
      { id: "4.2", title: "Memory Layer v1", titleFr: "Couche Mémoire v1", status: "done", desc: "User memory facts, fact extraction, long-term user memory, memory injection into prompts, memory admin APIs. Completed 2026-05-05.", descFr: "Faits mémoire utilisateur, extraction de faits, mémoire utilisateur long terme, injection mémoire dans prompts, APIs admin mémoire. Terminé le 05 mai 2026." },
      { id: "4.2b", title: "Memory System v2", titleFr: "Système Mémoire v2", status: "done", desc: "Layered memory contracts, working memory storage, async maintenance pipeline, working-memory repositories, avatar memory context assembly, memory inspection APIs, deterministic layered memory injection. Completed 2026-05-06.", descFr: "Contrats mémoire en couches, stockage mémoire de travail, pipeline maintenance asynchrone, dépôts working-memory, assemblage contexte mémoire avatar, APIs inspection mémoire, injection mémoire déterministe. Terminé le 06 mai 2026." },
      { id: "4.2c", title: "Episodic + Hydrated Memory System", titleFr: "Système Mémoire Épisodique + Hydraté", status: "done", desc: "Episodic persistence, hydration pipeline, deterministic memory selection, GM memory integration, memory observability, conversation working memory, hydration diagnostics, memory selection policies. Completed 2026-05-08.", descFr: "Persistance épisodique, pipeline d'hydratation, sélection mémoire déterministe, intégration mémoire GM, observabilité mémoire, mémoire de travail conversation, diagnostics hydratation, politiques sélection mémoire. Terminé le 08 mai 2026." },
      { id: "4.3", title: "Performance Baseline", titleFr: "Baseline Performance", status: "done", desc: "Turn metrics, GM metrics, latency tracking, token tracking, metrics aggregation, admin metrics endpoint, event-log timing persistence. Completed 2026-04-30.", descFr: "Métriques de tour, métriques GM, suivi latence, suivi tokens, agrégation métriques, endpoint métriques admin, persistance timing event-log. Terminé le 30 avril 2026." },
      { id: "4.4", title: "Multi-Avatar Navigation v1", titleFr: "Navigation Multi-Avatar v1", status: "done", desc: "Unlockable avatars, avatar switching, session-scoped unlock progression, avatar awareness, AI Guided Discovery scenario, availability APIs. Completed 2026-04-27.", descFr: "Avatars déverrouillables, changement d'avatar, progression déverrouillage scopée session, conscience avatar, scénario AI Guided Discovery, APIs disponibilité. Terminé le 27 avril 2026." },
      { id: "4.5", title: "Runtime State & SSE Events", titleFr: "État Runtime & Événements SSE", status: "done", desc: "Runtime state endpoint, SSE event streaming, async runtime events, processing state tracking, runtime pub/sub layer. Completed 2026-05-05.", descFr: "Endpoint état runtime, streaming événements SSE, événements runtime asynchrones, suivi état de traitement, couche pub/sub runtime. Terminé le 05 mai 2026." },
      { id: "5.1", title: "Knowledge Substrate — Ingestion & Retrieval", titleFr: "Substrat de Connaissance — Ingestion & Retrieval", status: "done", desc: "Canonical knowledge/retrieval contracts, persistence schema, typed ingestion lifecycle (queued→running→completed|failed), type-specific retrieval (memory|world|media), knowledge API endpoints, stack-e2e coverage. Completed 2026-05-11.", descFr: "Contrats connaissance/retrieval canoniques, schéma persistance, cycle de vie ingestion typé (queued→running→completed|failed), retrieval type-spécifique (memory|world|media), endpoints API knowledge, couverture stack-e2e. Terminé le 11 mai 2026." },
      { id: "5.2", title: "Context Engine v2", titleFr: "Moteur de Contexte v2", status: "done", desc: "Dedicated Context Engine module with explicit input/output/trace contracts, deterministic precedence policy, token-budget selection telemetry, machine-readable selection/trimming trace, conflict resolution for long-term facts and retrieval chunks. Completed 2026-05-11.", descFr: "Module Context Engine dédié avec contrats input/output/trace explicites, politique de précédence déterministe, télémétrie sélection budget-token, trace sélection/trimming lisible par machine, résolution conflits faits long terme et chunks retrieval. Terminé le 11 mai 2026." },
      { id: "5.5", title: "User Persona System", titleFr: "Système Persona Utilisateur", status: "done", desc: "User personas, persona persistence, avatar persona injection, GM persona injection, persona APIs (GET/PUT /v1/users/{userId}/persona). Completed 2026-05-02.", descFr: "Personas utilisateur, persistance persona, injection persona dans avatar, injection persona dans GM, APIs persona (GET/PUT /v1/users/{userId}/persona). Terminé le 02 mai 2026." },
      { id: "5.3", title: "UX Streaming Layer", titleFr: "Couche UX Streaming", status: "planned", desc: "WebSocket streaming, SSE fallback, progressive token delivery to frontend", descFr: "Streaming WebSocket, fallback SSE, livraison progressive des tokens vers le frontend" },
      { id: "5.4", title: "Guided Progression Engine", titleFr: "Moteur de Progression Guidée", status: "planned", desc: "Scenario objectives tracking, progression state machine, GM-driven narrative milestones", descFr: "Suivi objectifs scénario, machine à états de progression, jalons narratifs pilotés par GM" },
      { id: "6.1", title: "Scenario Builder", titleFr: "Constructeur de Scénarios", status: "planned", desc: "Scenario configuration UI, avatar assignment, knowledge source binding, objective definition", descFr: "UI configuration scénario, assignation avatars, liaison sources de connaissance, définition objectifs" },
      { id: "6.2", title: "Real Scenario Validation", titleFr: "Validation Scénario Réel", status: "planned", desc: "End-to-end test with a real use case (learning or storytelling), user feedback collection", descFr: "Test end-to-end avec un cas d'usage réel (learning ou storytelling), collecte feedback utilisateurs" },
      { id: "6.3", title: "Summer Prototype Delivery", titleFr: "Livraison Prototype d'Été", status: "planned", desc: "Functional prototype: text-based, back-office operational, one real scenario deployed", descFr: "Prototype fonctionnel : text-based, back-office opérationnel, un scénario réel déployé" },
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
          {/* Sync date + GitHub link */}
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono"
              style={{ borderColor: "oklch(0.65 0.18 145)40", background: "oklch(0.97 0.03 145)", color: "oklch(0.40 0.18 145)" }}
            >
              <CheckCircle2 size={12} />
              {isFr ? "Synced depuis repo" : "Synced from repo"}
              <span className="font-bold ml-0.5">{LAST_SYNC_DATE}</span>
            </div>
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
      </div>

      <div className="container max-w-4xl py-10 space-y-12">

        {/* Global progress */}
        <div className="p-6 border border-slate-200 rounded-lg bg-white space-y-5">

          {/* Global bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Progression globale — toutes phases" : "Overall Progress — all phases"}
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
            <div className="flex gap-6 mt-2">
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

          {/* Per-phase bars */}
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Détail par phase" : "Per-phase breakdown"}
            </span>
            {PHASES.map((phase) => {
              const pDone = phase.epics.filter((e) => e.status === "done").length;
              const pInProgress = phase.epics.filter((e) => e.status === "in-progress").length;
              const pTotal = phase.epics.length;
              const pPct = Math.round((pDone / pTotal) * 100);
              return (
                <div key={phase.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-black font-mono px-1.5 py-0.5 rounded"
                        style={{ color: phase.color, background: `${phase.color}15` }}
                      >
                        {isFr ? phase.titleFr : phase.title}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{phase.period}</span>
                    </div>
                    <span className="text-xs font-mono font-bold" style={{ color: phase.color }}>
                      {pDone}/{pTotal} · {pPct}%
                      {pInProgress > 0 && (
                        <span className="text-slate-400 font-normal ml-1">({pInProgress} {isFr ? "en cours" : "in progress"})</span>
                      )}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pPct}%`, background: phase.color }}
                    />
                  </div>
                </div>
              );
            })}
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
