/**
 * GamiWaysArchitecture.tsx — GamiWays Research Portal
 * Page: Target Architecture — real stack from gami-digidouble-core repo
 * Context: GamiWays project — part of "The Project" menu
 * Design: Technical Blueprint — schema-first, layered architecture
 * i18n: EN / FR via LangContext
 */
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import SectionHeader from "@/components/SectionHeader";
import TargetArchDiagram from "@/components/diagrams/TargetArchDiagram";
import DiagramModal from "@/components/DiagramModal";

function SectionDivider({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-xs font-mono text-slate-300 shrink-0">{number}</span>
      <div className="h-px flex-1 bg-slate-200" />
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 shrink-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {title}
      </span>
      <div className="h-px w-8 bg-slate-200" />
    </div>
  );
}

function Accordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors rounded"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <span>{label}</span>
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

export default function GamiWaysArchitecture() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const layers = [
    {
      number: "01",
      name: "API Layer",
      tech: "Fastify",
      color: "oklch(0.55 0.20 200)",
      badge: "HTTP / WebSocket",
      desc: isFr
        ? "Point d'entrée unique du moteur. Expose les endpoints REST et WebSocket. Fastify est choisi pour ses performances natives (3× plus rapide qu'Express), son écosystème de plugins TypeScript-first, et sa gestion native du streaming SSE — critique pour les réponses LLM en temps réel."
        : "Single entry point of the engine. Exposes REST and WebSocket endpoints. Fastify is chosen for its native performance (3× faster than Express), TypeScript-first plugin ecosystem, and native SSE streaming support — critical for real-time LLM responses.",
      endpoints: [
        { method: "POST", path: "/v1/sessions", desc: isFr ? "Créer une session utilisateur dans un scénario" : "Create a user session in a scenario" },
        { method: "GET", path: "/v1/sessions", desc: isFr ? "Lister toutes les sessions" : "List all sessions" },
        { method: "POST", path: "/v1/sessions/:id/conversations", desc: isFr ? "Démarrer un épisode de dialogue avec un avatar" : "Start a dialogue episode with an avatar" },
        { method: "POST", path: "/v1/conversations/:id/messages", desc: isFr ? "Envoyer un message et recevoir la réponse avatar" : "Send a message and receive avatar response" },
        { method: "GET", path: "/v1/conversations/:id/history", desc: isFr ? "Récupérer l'historique de conversation" : "Retrieve conversation history" },
        { method: "POST", path: "/v1/sessions/:id/conversations/:cid/end", desc: isFr ? "Fermer explicitement une conversation (déclenche compaction mémoire)" : "Explicitly close a conversation (triggers memory compaction)" },
        { method: "POST", path: "/v1/sessions/:id/reset", desc: isFr ? "Réinitialiser une session" : "Reset a session" },
        { method: "GET", path: "/v1/sessions/:id/runtime-state", desc: isFr ? "Snapshot état runtime de la session" : "Runtime state snapshot of the session" },
        { method: "GET", path: "/v1/sessions/:id/events/stream", desc: isFr ? "Flux SSE des événements runtime asynchrones" : "SSE stream of async runtime events" },
        { method: "GET/PUT", path: "/v1/users/:id/persona", desc: isFr ? "Lire/écrire le persona utilisateur (injecté dans avatar + GM)" : "Read/write user persona (injected into avatar + GM)" },
        { method: "POST", path: "/v1/knowledge-sources", desc: isFr ? "Enregistrer une source de connaissance (PDF, MD, texte)" : "Register a knowledge source (PDF, MD, text)" },
        { method: "POST", path: "/v1/knowledge-sources/:id/ingest", desc: isFr ? "Déclencher l'ingestion (chunking + embeddings)" : "Trigger ingestion (chunking + embeddings)" },
        { method: "POST", path: "/v1/exchange", desc: isFr ? "Échange LLM brut sans session (debug / test)" : "Raw LLM exchange without session (debug / test)" },
        { method: "GET", path: "/v1/admin/sessions/:id/inspect", desc: isFr ? "Inspection complète de la session (mémoire, contexte, GM, métriques)" : "Full session inspection (memory, context, GM, metrics)" },
        { method: "POST", path: "/v1/admin/sessions/:id/gm/replay", desc: isFr ? "Rejouer le Game Master sur la session" : "Replay Game Master on the session" },
        { method: "POST", path: "/v1/admin/knowledge/retrieval", desc: isFr ? "Tester le retrieval RAG (debug)" : "Test RAG retrieval (debug)" },
      ],
    },
    {
      number: "02",
      name: "Application Layer",
      tech: isFr ? "Use Cases" : "Use Cases",
      color: "oklch(0.65 0.18 145)",
      badge: isFr ? "Orchestration" : "Orchestration",
      desc: isFr
        ? "Couche des cas d'usage métier : StartSession, SendMessage, ResumeSession, SwitchAvatar. Chaque use case orchestre les services du domaine sans connaître les détails d'infrastructure. Cette séparation garantit la testabilité et la maintenabilité à long terme."
        : "Business use case layer: StartSession, SendMessage, ResumeSession, SwitchAvatar. Each use case orchestrates domain services without knowing infrastructure details. This separation guarantees testability and long-term maintainability.",
      endpoints: [],
    },
    {
      number: "03",
      name: "Domain Layer",
      tech: isFr ? "Logique Métier" : "Business Logic",
      color: "oklch(0.72 0.18 50)",
      badge: isFr ? "Cœur du moteur" : "Engine Core",
      desc: isFr
        ? "Le cœur du moteur : Avatar (persona IA + assemblage prompt v2), Game Master (directeur asynchrone, 3 couches : Reasoning/Policy/Routing), Memory System (working memory + épisodique + faits long terme), Context Engine v2 (assemblage déterministe avec budget-token et trace lisible par machine), Knowledge Pipeline (ingestion PDF/MD/texte, chunking, embeddings, retrieval typé memory|world|media), User Persona (persistant, injecté dans avatar et GM). Aucune dépendance vers l'infrastructure."
        : "The engine core: Avatar (AI persona + v2 prompt assembly), Game Master (async director, 3 layers: Reasoning/Policy/Routing), Memory System (working memory + episodic + long-term facts), Context Engine v2 (deterministic assembly with token-budget and machine-readable trace), Knowledge Pipeline (PDF/MD/text ingestion, chunking, embeddings, typed retrieval memory|world|media), User Persona (persistent, injected into avatar and GM). No infrastructure dependency.",
      endpoints: [],
    },
    {
      number: "04",
      name: "Infrastructure Layer",
      tech: "PostgreSQL · Redis · Langfuse",
      color: "oklch(0.55 0.18 280)",
      badge: isFr ? "Persistance & Observabilité" : "Persistence & Observability",
      desc: isFr
        ? "Adaptateurs d'infrastructure : PostgreSQL + pgvector pour la persistance relationnelle et les embeddings RAG, Redis pour le cache de session et la mémoire de travail, Langfuse self-hosted pour l'observabilité LLM (traces, coûts, latences). Tous les adaptateurs sont interchangeables via interfaces."
        : "Infrastructure adapters: PostgreSQL + pgvector for relational persistence and RAG embeddings, Redis for session cache and working memory, Langfuse self-hosted for LLM observability (traces, costs, latencies). All adapters are swappable via interfaces.",
      endpoints: [],
    },
  ];

  const stackItems = [
    {
      category: isFr ? "Runtime & Monorepo" : "Runtime & Monorepo",
      items: [
        { name: "Node.js LTS + TypeScript strict", why: isFr ? "Typage strict end-to-end, écosystème LLM mature, streaming natif" : "End-to-end strict typing, mature LLM ecosystem, native streaming" },
        { name: "pnpm + Turborepo", why: isFr ? "Monorepo multi-packages avec cache de build incrémental — essentiel pour séparer core, back-office et futurs SDKs" : "Multi-package monorepo with incremental build cache — essential for separating core, back-office and future SDKs" },
      ],
      color: "oklch(0.55 0.20 200)",
    },
    {
      category: "API",
      items: [
        { name: "Fastify", why: isFr ? "3× plus rapide qu'Express, plugins TypeScript-first, SSE natif pour streaming LLM" : "3× faster than Express, TypeScript-first plugins, native SSE for LLM streaming" },
        { name: "WebSocket + SSE fallback", why: isFr ? "WebSocket pour streaming temps réel, SSE comme fallback compatible CDN/proxy" : "WebSocket for real-time streaming, SSE as CDN/proxy-compatible fallback" },
      ],
      color: "oklch(0.65 0.18 145)",
    },
    {
      category: isFr ? "Persistance" : "Persistence",
      items: [
        { name: "PostgreSQL + pgvector", why: isFr ? "Base relationnelle pour sessions/conversations + extension vectorielle pour embeddings RAG — une seule base, pas de service vectoriel séparé" : "Relational DB for sessions/conversations + vector extension for RAG embeddings — single DB, no separate vector service" },
        { name: "Redis", why: isFr ? "Cache de session et mémoire de travail (working memory) — accès sub-milliseconde pour les données chaudes de conversation" : "Session cache and working memory — sub-millisecond access for hot conversation data" },
      ],
      color: "oklch(0.72 0.18 50)",
    },
    {
      category: "LLM",
      items: [
        { name: "OpenAI / Anthropic / Mistral", why: isFr ? "Abstraction interne (ObservedLlmAdapter) — aucun lock-in fournisseur, switch en une ligne de config" : "Internal abstraction (ObservedLlmAdapter) — no vendor lock-in, switch with one config line" },
        { name: "Langfuse (self-hosted)", why: isFr ? "Observabilité LLM complète : traces, coûts par requête, latences, évaluation qualité — souveraineté totale des données" : "Full LLM observability: traces, per-request costs, latencies, quality evaluation — full data sovereignty" },
      ],
      color: "oklch(0.55 0.18 280)",
    },
    {
      category: isFr ? "Déploiement" : "Deployment",
      items: [
        { name: "Docker Compose", why: isFr ? "Stack complète reproductible en une commande — PostgreSQL, Redis, Langfuse, API core" : "Full reproducible stack in one command — PostgreSQL, Redis, Langfuse, API core" },
        { name: "Next.js (back-office)", why: isFr ? "Interface d'administration et d'inspection runtime — séparée du core pour ne pas coupler les cycles de déploiement" : "Administration and runtime inspection interface — separated from core to decouple deployment cycles" },
      ],
      color: "oklch(0.65 0.18 200)",
    },
  ];

  const memoryLayers = [
    {
      level: "L1",
      name: isFr ? "Mémoire de travail" : "Working Memory",
      store: "Redis",
      scope: isFr ? "Par conversation (éphémère)" : "Per conversation (ephemeral)",
      desc: isFr ? "Fenêtre de contexte active : messages récents, état GM, tokens disponibles. Accès sub-ms." : "Active context window: recent messages, GM state, available tokens. Sub-ms access.",
      color: "oklch(0.55 0.20 200)",
    },
    {
      level: "L2",
      name: isFr ? "Persistance épisodique" : "Episodic Persistence",
      store: "PostgreSQL",
      scope: isFr ? "Par session (durable)" : "Per session (durable)",
      desc: isFr ? "Résumés de conversation, faits extraits, progression dans le scénario. Hydratation au démarrage de session." : "Conversation summaries, extracted facts, scenario progression. Hydrated at session start.",
      color: "oklch(0.65 0.18 145)",
    },
    {
      level: "L3",
      name: isFr ? "Faits utilisateur long terme" : "Long-term User Facts",
      store: "PostgreSQL + pgvector",
      scope: isFr ? "Cross-sessions (permanent)" : "Cross-sessions (permanent)",
      desc: isFr ? "Profil utilisateur persistant : préférences, historique d'apprentissage, faits biographiques. Retrieval sémantique via pgvector." : "Persistent user profile: preferences, learning history, biographical facts. Semantic retrieval via pgvector.",
      color: "oklch(0.72 0.18 50)",
    },
  ];

  const cognitiveThresholds = [
    {
      ms: "<500ms",
      label: isFr ? "Fluidité perceptive" : "Perceptive fluidity",
      desc: isFr
        ? "Seuil de fluidité perceptive. L'utilisateur perçoit un léger délai mais l'interaction reste naturelle. Cible pour TTS first audio."
        : "Perceptive fluidity threshold. User perceives slight delay but interaction remains natural. Target for TTS first audio.",
      color: "oklch(0.65 0.18 145)",
      achievable: true,
    },
    {
      ms: "1s",
      label: isFr ? "Acceptable" : "Acceptable",
      desc: isFr
        ? "Seuil de confort conversationnel. Au-delà, l'utilisateur commence à anticiper l'attente. Cible pour TTFB (premier frame vidéo)."
        : "Conversational comfort threshold. Beyond this, users start anticipating the wait. Target for TTFB (first video frame).",
      color: "oklch(0.75 0.16 75)",
      achievable: true,
    },
    {
      ms: "2s",
      label: isFr ? "Limite naturelle" : "Natural limit",
      desc: isFr
        ? "Seuil de naturalité conversationnelle (Nielsen 1993). Au-delà, la conversation devient une série d'attentes. Cible TTFR GamiWays."
        : "Conversational naturalness threshold (Nielsen 1993). Beyond this, conversation becomes a series of waits. GamiWays TTFR target.",
      color: "oklch(0.75 0.16 75)",
      achievable: false,
    },
    {
      ms: "6–12s",
      label: isFr ? "Rupture d'engagement" : "Engagement break",
      desc: isFr
        ? "Latence actuelle des prototypes (HeyGem OS). L'utilisateur perd le fil, l'avatar cesse d'être une présence. C'est le problème à résoudre."
        : "Current prototype latency (HeyGem OS). User loses the thread, avatar stops being a presence. This is the problem to solve.",
      color: "oklch(0.60 0.20 25)",
      achievable: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16">

        {/* ── HEADER ── */}
        <div>
          <SectionHeader
            number="01"
            title={isFr ? "Architecture & Stack Technique" : "Architecture & Tech Stack"}
            subtitle={isFr
              ? "Architecture 4 couches du moteur GamiWays Core — stack réelle extraite du repo gami-digidouble-core. Chaque choix technologique est justifié par les contraintes de latence, souveraineté et maintenabilité."
              : "4-layer architecture of the GamiWays Core engine — real stack extracted from the gami-digidouble-core repo. Every technology choice is justified by latency, sovereignty and maintainability constraints."}
            accent="cyan"
          />
        </div>

        {/* ── SECTION A: 4 LAYERS ── */}
        <section>
          <SectionDivider number="A" title={isFr ? "Architecture 4 Couches" : "4-Layer Architecture"} />

          <div className="grid gap-4">
            {layers.map((layer) => (
              <div key={layer.number} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <div className="flex items-start gap-4 px-5 py-4 border-b border-slate-100" style={{ borderLeft: `4px solid ${layer.color}` }}>
                  <div className="shrink-0 mt-0.5">
                    <span className="text-xs font-black font-mono" style={{ color: layer.color }}>{layer.number}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{layer.name}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ color: layer.color, background: `${layer.color}15` }}>{layer.tech}</span>
                      <span className="text-xs text-slate-400 font-mono">{layer.badge}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{layer.desc}</p>
                  </div>
                </div>
                {layer.endpoints.length > 0 && (
                  <Accordion label={isFr ? `Voir les ${layer.endpoints.length} endpoints API →` : `View ${layer.endpoints.length} API endpoints →`}>
                    <div className="mt-3 space-y-2">
                      {layer.endpoints.map((ep) => (
                        <div key={ep.path} className="flex items-start gap-3">
                          <span className="shrink-0 text-xs font-black font-mono px-2 py-0.5 rounded" style={{ color: "oklch(0.55 0.20 200)", background: "oklch(0.96 0.02 200)" }}>{ep.method}</span>
                          <span className="text-xs font-mono text-slate-700 shrink-0">{ep.path}</span>
                          <span className="text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>{ep.desc}</span>
                        </div>
                      ))}
                    </div>
                  </Accordion>
                )}
              </div>
            ))}
          </div>

          {/* Architecture diagram */}
          <div className="mt-6">
            <DiagramModal title="Target Architecture — Available, R&D Gap, Internal">
              <TargetArchDiagram />
            </DiagramModal>
          </div>
        </section>

        {/* ── SECTION B: MEMORY SYSTEM ── */}
        <section>
          <SectionDivider number="B" title={isFr ? "Memory System — 3 Couches" : "Memory System — 3 Layers"} />
          <p className="text-sm text-slate-500 leading-relaxed max-w-3xl mb-6" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Le Memory System est l'une des innovations centrales du moteur. Il résout le problème de l'explosion de tokens dans les sessions longues en distribuant la mémoire sur 3 niveaux avec des politiques de sélection déterministes. L'hydratation remplace le replay de transcript — les mémoires épisodiques sont scopées par utilisateur + avatar + scénario."
              : "The Memory System is one of the engine's core innovations. It solves the token explosion problem in long sessions by distributing memory across 3 levels with deterministic selection policies. Hydration replaces transcript replay — episodic memories are scoped by user + avatar + scenario."}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {memoryLayers.map((ml) => (
              <div key={ml.level} className="bg-white border border-slate-200 rounded-lg p-4" style={{ borderTop: `3px solid ${ml.color}` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-black font-mono" style={{ color: ml.color }}>{ml.level}</span>
                  <span className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{ml.name}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{ml.store}</span>
                  <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">{ml.scope}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{ml.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION B2: CONTEXT ENGINE ── */}
        <section>
          <SectionDivider number="C" title={isFr ? "Context Engine v2 — Assemblage Déterministe" : "Context Engine v2 — Deterministic Assembly"} />
          <p className="text-sm text-slate-500 leading-relaxed max-w-3xl mb-5" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Le Context Engine v2 est le module central qui assemble le contexte de chaque tour de conversation. Il combine 7 dimensions en un payload déterministe, inspectable et testable. Chaque décision de sélection/trimming est tracée dans un format lisible par machine pour le débogage opérationnel."
              : "Context Engine v2 is the central module that assembles context for each conversation turn. It combines 7 dimensions into a deterministic, inspectable and testable payload. Every selection/trimming decision is traced in machine-readable format for operational debugging."}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-5">
            {[
              { label: isFr ? "Mémoire court terme" : "Short-term Memory", detail: isFr ? "2 derniers échanges" : "Last 2 exchanges", color: "oklch(0.55 0.20 200)" },
              { label: isFr ? "Mémoire de travail" : "Working Memory", detail: isFr ? "Résumé conversation actuelle" : "Current conversation summary", color: "oklch(0.65 0.18 145)" },
              { label: isFr ? "Faits long terme" : "Long-term Facts", detail: isFr ? "Profil utilisateur persistant" : "Persistent user profile", color: "oklch(0.72 0.18 50)" },
              { label: isFr ? "Config scénario" : "Scenario Config", detail: isFr ? "Objectifs, règles, avatars" : "Objectives, rules, avatars", color: "oklch(0.55 0.18 280)" },
              { label: isFr ? "Retrieval RAG" : "RAG Retrieval", detail: isFr ? "memory | world | media" : "memory | world | media", color: "oklch(0.60 0.20 25)" },
              { label: isFr ? "Directives GM" : "GM Directives", detail: isFr ? "Guidance asynchrone" : "Async guidance", color: "oklch(0.65 0.18 200)" },
              { label: isFr ? "Persona utilisateur" : "User Persona", detail: isFr ? "Rôle, style, préférences" : "Role, style, preferences", color: "oklch(0.72 0.18 145)" },
              { label: isFr ? "Budget-token" : "Token Budget", detail: isFr ? "Sélection déterministe" : "Deterministic selection", color: "oklch(0.55 0.15 265)" },
            ].map((dim) => (
              <div key={dim.label} className="bg-white border border-slate-200 rounded-lg p-3" style={{ borderLeft: `3px solid ${dim.color}` }}>
                <div className="text-xs font-bold text-slate-800 mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{dim.label}</div>
                <div className="text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>{dim.detail}</div>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-300 leading-relaxed">
            <div className="text-slate-500 mb-2">{isFr ? "# Flux de traitement d'un tour" : "# Turn processing flow"}</div>
            <div><span className="text-cyan-400">User message</span> <span className="text-slate-500">→</span> <span className="text-green-400">API validation</span> <span className="text-slate-500">→</span> <span className="text-yellow-400">Load session/scenario</span></div>
            <div className="ml-4"><span className="text-slate-500">→</span> <span className="text-orange-400">Context Engine</span> <span className="text-slate-500">(7 dimensions → bounded payload)</span></div>
            <div className="ml-4"><span className="text-slate-500">→</span> <span className="text-cyan-400">Avatar generates response</span> <span className="text-slate-500">(streamed)</span></div>
            <div className="ml-4"><span className="text-slate-500">→</span> <span className="text-green-400">Save messages</span></div>
            <div className="ml-4"><span className="text-slate-500">→ [async]</span> <span className="text-purple-400">GM review</span> <span className="text-slate-500">+</span> <span className="text-yellow-400">memory update</span> <span className="text-slate-500">+</span> <span className="text-slate-400">metrics</span></div>
          </div>
        </section>

        {/* ── SECTION B3: KNOWLEDGE PIPELINE ── */}
        <section>
          <SectionDivider number="D" title={isFr ? "Knowledge Pipeline — Ingestion & Retrieval" : "Knowledge Pipeline — Ingestion & Retrieval"} />
          <p className="text-sm text-slate-500 leading-relaxed max-w-3xl mb-5" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Le module Knowledge gère l'ingestion de documents (PDF, Markdown, texte), leur chunking, la génération d'embeddings et le retrieval sémantique via pgvector. Le retrieval est typé en 3 catégories distinctes injectées séparément dans le contexte."
              : "The Knowledge module handles document ingestion (PDF, Markdown, text), chunking, embedding generation and semantic retrieval via pgvector. Retrieval is typed into 3 distinct categories injected separately into context."}
          </p>
          <div className="grid gap-4 sm:grid-cols-3 mb-5">
            {[
              { type: "memory", label: isFr ? "Mémoire" : "Memory", desc: isFr ? "Connaissances liées à l'historique utilisateur et aux interactions passées" : "Knowledge linked to user history and past interactions", color: "oklch(0.55 0.20 200)" },
              { type: "world", label: isFr ? "Monde" : "World", desc: isFr ? "Connaissances du domaine, faits du scénario, contexte narratif" : "Domain knowledge, scenario facts, narrative context", color: "oklch(0.65 0.18 145)" },
              { type: "media", label: isFr ? "Média" : "Media", desc: isFr ? "Références médias, documents visuels, ressources multimédia (non-rendus en Phase A)" : "Media references, visual documents, multimedia resources (non-rendered in Phase A)", color: "oklch(0.72 0.18 50)" },
            ].map((rt) => (
              <div key={rt.type} className="bg-white border border-slate-200 rounded-lg p-4" style={{ borderTop: `3px solid ${rt.color}` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-black font-mono px-2 py-0.5 rounded" style={{ color: rt.color, background: `${rt.color}15` }}>{rt.type}</span>
                  <span className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{rt.label}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{rt.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-100 bg-slate-50">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{isFr ? "Cycle de vie d'ingestion" : "Ingestion lifecycle"}</span>
            </div>
            <div className="flex items-center gap-0 px-4 py-4 flex-wrap gap-y-2">
              {["queued", "running", "completed", "failed"].map((s, i, arr) => (
                <div key={s} className="flex items-center gap-2">
                  <span className={`text-xs font-mono px-2 py-1 rounded font-bold ${
                    s === "completed" ? "bg-green-50 text-green-700" :
                    s === "failed" ? "bg-red-50 text-red-700" :
                    s === "running" ? "bg-yellow-50 text-yellow-700" :
                    "bg-slate-100 text-slate-600"
                  }`}>{s}</span>
                  {i < arr.length - 1 && s !== "running" && <span className="text-slate-300 text-xs">→</span>}
                  {s === "running" && <span className="text-slate-300 text-xs">→</span>}
                </div>
              ))}
              <span className="text-xs text-slate-400 ml-2" style={{ fontFamily: "'Source Serif 4', serif" }}>{isFr ? "(avec retry sur failed)" : "(with retry on failed)"}</span>
            </div>
          </div>
        </section>

        {/* ── SECTION E: TECH STACK ── */}
        <section>
          <SectionDivider number="E" title={isFr ? "Stack Technique — Choix & Justifications" : "Tech Stack — Choices & Rationale"} />
          <p className="text-sm text-slate-500 leading-relaxed max-w-3xl mb-6" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Chaque choix technologique est motivé par des contraintes concrètes : latence <2s, souveraineté des données, absence de lock-in fournisseur, et maintenabilité à long terme par une petite équipe."
              : "Every technology choice is driven by concrete constraints: <2s latency, data sovereignty, no vendor lock-in, and long-term maintainability by a small team."}
          </p>
          <div className="space-y-4">
            {stackItems.map((cat) => (
              <div key={cat.category} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <div className="px-4 py-2 border-b border-slate-100" style={{ background: `${cat.color}08` }}>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cat.color, fontFamily: "'Space Grotesk', sans-serif" }}>{cat.category}</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {cat.items.map((item) => (
                    <div key={item.name} className="px-4 py-3 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                      <span className="shrink-0 text-xs font-bold font-mono text-slate-800 sm:w-56">{item.name}</span>
                      <span className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{item.why}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION F: LATENCY BUDGET ── */}
        <section>
          <SectionDivider number="F" title={isFr ? "Budget Latence — Seuils Cognitifs" : "Latency Budget — Cognitive Thresholds"} />

          <div className="mb-6 p-5 border-l-4 rounded-r-lg bg-white border border-slate-200" style={{ borderLeftColor: "oklch(0.60 0.20 25)" }}>
            <h2 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "La contrainte <2s structure tous les choix" : "The <2s constraint structures every choice"}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "La latence n'est pas qu'un problème technique — c'est un problème d'expérience. Au-delà de 2 secondes, l'utilisateur perd le fil, l'avatar cesse d'être une présence. L'objectif : <2s end-to-end, premier son dans les 500ms. C'est pourquoi Fastify, Redis et le streaming SSE sont non-négociables."
                : "Latency is not just a technical problem — it is an experience problem. Beyond 2 seconds, users lose their train of thought, the avatar stops being a presence. The goal: <2s end-to-end, first sound within 500ms. This is why Fastify, Redis and SSE streaming are non-negotiable."}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{isFr ? "Seuil" : "Threshold"}</th>
                  <th>{isFr ? "Qualification" : "Qualification"}</th>
                  <th>{isFr ? "Impact UX" : "UX Impact"}</th>
                  <th>{isFr ? "Statut" : "Status"}</th>
                </tr>
              </thead>
              <tbody>
                {cognitiveThresholds.map((th) => (
                  <tr key={th.ms}>
                    <td>
                      <span className="text-sm font-black font-mono" style={{ color: th.color }}>{th.ms}</span>
                    </td>
                    <td>
                      <span className="text-xs font-bold" style={{ color: th.color, fontFamily: "'Space Grotesk', sans-serif" }}>{th.label}</span>
                    </td>
                    <td className="text-xs text-slate-600 max-w-xs" style={{ fontFamily: "'Source Serif 4', serif" }}>{th.desc}</td>
                    <td>
                      {th.achievable
                        ? <span className="text-xs font-bold" style={{ color: "oklch(0.65 0.18 145)" }}>✓ {isFr ? "Cible" : "Target"}</span>
                        : (th.ms === "2s"
                            ? <span className="text-xs font-bold" style={{ color: "oklch(0.72 0.18 50)" }}>{isFr ? "Objectif R&D" : "R&D Goal"}</span>
                            : <span className="text-xs font-bold" style={{ color: "oklch(0.60 0.20 25)" }}>{isFr ? "Problème actuel" : "Current problem"}</span>)
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── NAVIGATION ── */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
          <InternalLink
            to="/research"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-4 py-2 transition-all hover:opacity-90"
            style={{ background: "oklch(0.55 0.20 200)", fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}
          >
            {isFr ? "← Défis Techniques" : "← Technical Challenges"}
          </InternalLink>
          <InternalLink
            to="/project/status"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-4 py-2 transition-all hover:opacity-90"
            style={{ background: "oklch(0.55 0.20 130)", fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}
          >
            {isFr ? "État d’avancement du Core →" : "Core Engine Build Status →"}
          </InternalLink>
          <InternalLink
            to="/voice/pipeline"
            className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all"
            style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}
          >
            {isFr ? "Pipeline Phase 1 →" : "Pipeline Phase 1 →"}
          </InternalLink>
          <a
            href="https://github.com/gami-lab/gami-digidouble-core"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <ExternalLink size={13} />
            {isFr ? "Repo GitHub →" : "GitHub Repo →"}
          </a>
        </div>

      </div>
    </div>
  );
}
