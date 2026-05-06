/**
 * pipelineData.ts — GamiWays Research Portal
 * Data for the Phase 1 Voice Pipeline page
 * Architecture: Cascade (ASR → LLM → TTS) vs End-to-End Voice-to-Voice
 */

export type OptionTier = "recommended" | "alternative" | "research";
export type DeployMode = "cloud" | "local" | "hybrid";

export interface PipelineOption {
  id: string;
  name: string;
  tier: OptionTier;
  deployMode: DeployMode;
  latencyBest: number;   // ms
  latencyTypical: number; // ms
  costNote: string;
  costPerMin: number;    // USD/min (0 = free/self-hosted)
  sovereign: boolean;
  pros: string[];
  cons: string[];
  ttsLink?: string; // link to /tts/:id if applicable
  notes: string;
}

export interface PipelineBlock {
  id: string;
  step: number;
  label: string;
  labelFr: string;
  icon: string; // emoji or icon name
  color: string; // oklch
  colorLight: string;
  description: string;
  descriptionFr: string;
  options: PipelineOption[];
}

export interface PipelineMode {
  id: "cascade" | "v2v";
  label: string;
  labelFr: string;
  tagline: string;
  taglineFr: string;
  totalLatencyBest: number;
  totalLatencyTypical: number;
  pros: string[];
  prosFr: string[];
  cons: string[];
  consFr: string[];
  recommendation: string;
  recommendationFr: string;
  color: string;
}

// ─── Pipeline Modes ────────────────────────────────────────────────────────────

export const pipelineModes: PipelineMode[] = [
  {
    id: "cascade",
    label: "Cascade Pipeline",
    labelFr: "Pipeline Cascade",
    tagline: "ASR → LLM → TTS — modular, controllable, production-ready",
    taglineFr: "ASR → LLM → TTS — modulaire, contrôlable, prêt pour la production",
    totalLatencyBest: 505,
    totalLatencyTypical: 1150,
    pros: [
      "Full control over each component",
      "Swap any block independently",
      "Voice cloning via TTS layer",
      "Streaming token-by-token reduces perceived latency",
      "Mature tooling (Pipecat, LiveKit Agents)",
      "Easier debugging and observability",
    ],
    prosFr: [
      "Contrôle total sur chaque composant",
      "Remplacement indépendant de chaque bloc",
      "Clonage vocal via la couche TTS",
      "Streaming token par token réduit la latence perçue",
      "Outillage mature (Pipecat, LiveKit Agents)",
      "Débogage et observabilité facilités",
    ],
    cons: [
      "Cumulative latency (3 sequential steps)",
      "Prosody lost between LLM and TTS",
      "Requires orchestration layer",
      "More infrastructure to manage",
    ],
    consFr: [
      "Latence cumulative (3 étapes séquentielles)",
      "Prosodie perdue entre LLM et TTS",
      "Nécessite une couche d'orchestration",
      "Plus d'infrastructure à gérer",
    ],
    recommendation: "Recommended for MVP Phase 1. Best stack: Deepgram Nova-3 + GPT-4o streaming + Cartesia Sonic 3. Sovereign alternative: Whisper.cpp + Llama 3.1 8B + Kokoro 82M.",
    recommendationFr: "Recommandé pour le MVP Phase 1. Meilleure stack : Deepgram Nova-3 + GPT-4o streaming + Cartesia Sonic 3. Alternative souveraine : Whisper.cpp + Llama 3.1 8B + Kokoro 82M.",
    color: "oklch(0.55 0.20 200)",
  },
  {
    id: "v2v",
    label: "End-to-End Voice-to-Voice",
    labelFr: "Voix-à-Voix End-to-End",
    tagline: "Direct audio-in → audio-out — lowest latency, natural prosody",
    taglineFr: "Audio direct entrée → sortie — latence minimale, prosodie naturelle",
    totalLatencyBest: 150,
    totalLatencyTypical: 350,
    pros: [
      "Lowest possible latency (150–350ms)",
      "Natural prosody preserved end-to-end",
      "No text bottleneck",
      "Interruption handling built-in (Moshi)",
      "Simpler architecture (one model)",
    ],
    prosFr: [
      "Latence minimale possible (150–350ms)",
      "Prosodie naturelle préservée de bout en bout",
      "Pas de goulot d'étranglement texte",
      "Gestion des interruptions intégrée (Moshi)",
      "Architecture plus simple (un seul modèle)",
    ],
    cons: [
      "No voice cloning (critical for GamiWays)",
      "Limited control over content/persona",
      "Models still maturing (2025–2026)",
      "Harder to integrate RAG/memory",
      "Less predictable output",
    ],
    consFr: [
      "Pas de clonage vocal (critique pour GamiWays)",
      "Contrôle limité sur le contenu/persona",
      "Modèles encore en maturation (2025–2026)",
      "Intégration RAG/mémoire plus difficile",
      "Sortie moins prévisible",
    ],
    recommendation: "Recommended for R&D Axis 1 exploration (H2 2026). Not suitable for Phase 1 MVP due to lack of voice cloning. Monitor Voxtral TTS (Mistral) and Ultravox v0.5.",
    recommendationFr: "Recommandé pour l'exploration de l'Axe R&D 1 (H2 2026). Non adapté au MVP Phase 1 en raison de l'absence de clonage vocal. Surveiller Voxtral TTS (Mistral) et Ultravox v0.5.",
    color: "oklch(0.55 0.20 280)",
  },
];

// ─── Cascade Pipeline Blocks ───────────────────────────────────────────────────

export const cascadeBlocks: PipelineBlock[] = [
  {
    id: "input",
    step: 0,
    label: "User Audio Input",
    labelFr: "Entrée Audio Utilisateur",
    icon: "🎤",
    color: "oklch(0.55 0.18 240)",
    colorLight: "oklch(0.96 0.03 240)",
    description: "Raw audio captured via WebRTC (browser/mobile). VAD (Voice Activity Detection) triggers the pipeline. Target: <30ms capture + VAD.",
    descriptionFr: "Audio brut capturé via WebRTC (navigateur/mobile). La VAD (détection d'activité vocale) déclenche le pipeline. Cible : <30ms capture + VAD.",
    options: [
      {
        id: "webrtc-browser",
        name: "WebRTC Browser API",
        tier: "recommended",
        deployMode: "hybrid",
        latencyBest: 10,
        latencyTypical: 30,
        costNote: "Free (browser native)",
        costPerMin: 0,
        sovereign: true,
        pros: ["Universal browser support", "Sub-30ms capture", "Built-in echo cancellation"],
        cons: ["Variable quality across devices", "Requires HTTPS"],
        notes: "Standard for all web-based voice agents. Use MediaRecorder or AudioWorklet for streaming.",
      },
      {
        id: "silero-vad",
        name: "Silero VAD",
        tier: "recommended",
        deployMode: "local",
        latencyBest: 5,
        latencyTypical: 15,
        costNote: "Free (MIT license)",
        costPerMin: 0,
        sovereign: true,
        pros: ["<15ms detection", "Lightweight (1MB)", "Works in browser via ONNX"],
        cons: ["Requires ONNX runtime in browser"],
        notes: "Best-in-class open-source VAD. Used by Pipecat and LiveKit Agents.",
      },
    ],
  },
  {
    id: "asr",
    step: 1,
    label: "ASR / Speech-to-Text",
    labelFr: "ASR / Parole-vers-Texte",
    icon: "👂",
    color: "oklch(0.55 0.20 200)",
    colorLight: "oklch(0.96 0.04 200)",
    description: "Converts audio stream to text. Streaming ASR sends partial transcripts to reduce LLM Time-to-First-Token. Critical latency block.",
    descriptionFr: "Convertit le flux audio en texte. L'ASR en streaming envoie des transcriptions partielles pour réduire le Time-to-First-Token du LLM. Bloc de latence critique.",
    options: [
      {
        id: "deepgram-nova3",
        name: "Deepgram Nova-3",
        tier: "recommended",
        deployMode: "cloud",
        latencyBest: 75,
        latencyTypical: 200,
        costNote: "$0.0043/min streaming",
        costPerMin: 0.0043,
        sovereign: false,
        pros: ["75ms TTFT streaming", "Best accuracy on technical vocabulary", "Native streaming API", "Pipecat/LiveKit integration"],
        cons: ["Cloud only", "US data residency by default"],
        notes: "Industry reference for real-time ASR. Supports 30+ languages. Used by most voice agent frameworks.",
      },
      {
        id: "whisper-cpp",
        name: "Whisper.cpp (local)",
        tier: "alternative",
        deployMode: "local",
        latencyBest: 200,
        latencyTypical: 500,
        costNote: "Free (MIT)",
        costPerMin: 0,
        sovereign: true,
        pros: ["Full sovereignty", "No API cost", "GGML quantized models", "Swiss server deployable"],
        cons: ["200–500ms latency", "Requires GPU for real-time", "No native streaming"],
        notes: "Best sovereign option. Use faster-whisper with streaming VAD for near-real-time. Quantized small.en: ~200ms on CPU.",
      },
      {
        id: "assemblyai",
        name: "AssemblyAI Universal-2",
        tier: "alternative",
        deployMode: "cloud",
        latencyBest: 100,
        latencyTypical: 250,
        costNote: "$0.0065/min streaming",
        costPerMin: 0.0065,
        sovereign: false,
        pros: ["High accuracy", "Speaker diarization", "EU data residency available"],
        cons: ["More expensive than Deepgram", "Slower than Deepgram"],
        notes: "Good alternative with EU data residency option. Better for multi-speaker scenarios.",
      },
      {
        id: "inworld-stt",
        name: "Inworld STT",
        tier: "alternative",
        deployMode: "cloud",
        latencyBest: 80,
        latencyTypical: 180,
        costNote: "Included in Inworld platform (TTS + STT + Realtime API bundle)",
        costPerMin: 0.005,
        sovereign: true,
        pros: ["Semantic + acoustic VAD (reduces false triggers)", "Voice profiling (speaker identification)", "Native integration with Inworld TTS — no serialization overhead", "On-premise option (EU/India data residency)", "Single-provider pipeline: STT + LLM Router + TTS in one API"],
        cons: ["Less battle-tested than Deepgram Nova-3", "Pricing less transparent than Deepgram", "Fewer language options"],
        notes: "Key advantage: when combined with Inworld TTS and LLM Router, eliminates inter-component network hops. Semantic VAD reduces hallucination triggers. Use for Inworld Single-Provider stack.",
      },
    ],
  },
  {
    id: "memory",
    step: 2,
    label: "Memory & Context",
    labelFr: "Mémoire & Contexte",
    icon: "🧠",
    color: "oklch(0.55 0.18 280)",
    colorLight: "oklch(0.96 0.04 280)",
    description: "Retrieves relevant conversation history and persona context before LLM call. 3-layer architecture: working memory (last 10 turns), episodic (Mem0), semantic (vector DB).",
    descriptionFr: "Récupère l'historique de conversation et le contexte persona avant l'appel LLM. Architecture 3 couches : mémoire de travail (10 derniers tours), épisodique (Mem0), sémantique (base vectorielle).",
    options: [
      {
        id: "mem0",
        name: "Mem0 (structured memory)",
        tier: "recommended",
        deployMode: "hybrid",
        latencyBest: 20,
        latencyTypical: 50,
        costNote: "$0.002/memory op (cloud) or free (self-hosted)",
        costPerMin: 0.004,
        sovereign: true,
        pros: ["+26% accuracy vs baseline", "-91% tokens vs full history", "Self-hostable", "pgvector backend"],
        cons: ["Adds 20–50ms per turn", "Requires initial setup"],
        notes: "Research reference (arXiv:2504.19413). Reduces context by 90% while maintaining 95% coherence. Critical for GamiWays Axis 1.",
      },
      {
        id: "qdrant",
        name: "Qdrant (vector DB)",
        tier: "recommended",
        deployMode: "local",
        latencyBest: 5,
        latencyTypical: 20,
        costNote: "Free (Apache 2.0) or $25/mo cloud",
        costPerMin: 0,
        sovereign: true,
        pros: ["<20ms retrieval", "Self-hostable on Exoscale/OVH", "GDPR compliant", "Rust performance"],
        cons: ["Requires embedding model", "Infrastructure to manage"],
        notes: "Best sovereign vector DB for Swiss deployment. Pairs with Mem0 for semantic memory layer.",
      },
      {
        id: "sliding-window",
        name: "Sliding Window (MVP)",
        tier: "alternative",
        deployMode: "local",
        latencyBest: 1,
        latencyTypical: 5,
        costNote: "Free",
        costPerMin: 0,
        sovereign: true,
        pros: ["Zero latency", "No infrastructure", "Simple to implement"],
        cons: ["Limited to last N turns", "No long-term memory", "Context explosion over time"],
        notes: "Acceptable for MVP Phase 1 prototype. Replace with Mem0 before production.",
      },
    ],
  },
  {
    id: "llm",
    step: 3,
    label: "LLM / Dialogue Engine",
    labelFr: "LLM / Moteur de Dialogue",
    icon: "⚡",
    color: "oklch(0.55 0.20 50)",
    colorLight: "oklch(0.97 0.04 50)",
    description: "Generates response text with streaming output. First token latency (TTFT) is critical — streaming to TTS starts immediately. Persona, RAG context, and memory injected as system prompt.",
    descriptionFr: "Génère le texte de réponse avec sortie en streaming. La latence du premier token (TTFT) est critique — le streaming vers le TTS commence immédiatement. Persona, contexte RAG et mémoire injectés dans le prompt système.",
    options: [
      {
        id: "gpt4o-streaming",
        name: "GPT-4o (streaming)",
        tier: "recommended",
        deployMode: "cloud",
        latencyBest: 350,
        latencyTypical: 800,
        costNote: "$2.50/1M input + $10/1M output",
        costPerMin: 0.060,
        sovereign: false,
        pros: ["Best reasoning quality", "350ms TTFT streaming", "Function calling / tools", "128k context"],
        cons: ["US data residency", "Most expensive", "OpenAI dependency"],
        notes: "Reference quality for MVP validation. Use streaming mode to pipe tokens directly to TTS. Switch to GPT-4o-mini for cost reduction.",
      },
      {
        id: "llama31-8b",
        name: "Llama 3.1 8B (quantized)",
        tier: "alternative",
        deployMode: "local",
        latencyBest: 150,
        latencyTypical: 400,
        costNote: "Free (Meta license)",
        costPerMin: 0.008,
        sovereign: true,
        pros: ["150ms TTFT on GPU", "Full sovereignty", "Swiss server deployable", "No API cost at scale"],
        cons: ["Lower quality than GPT-4o", "Requires GPU (A10/A100)", "Fine-tuning needed for persona"],
        notes: "Best sovereign option for production. Q4_K_M quantization: ~5GB VRAM. Use with llama.cpp or vLLM for streaming.",
      },
      {
        id: "mistral-nemo",
        name: "Mistral Nemo 12B",
        tier: "alternative",
        deployMode: "hybrid",
        latencyBest: 200,
        latencyTypical: 500,
        costNote: "$0.15/1M tokens (Mistral API) or free self-hosted",
        costPerMin: 0.012,
        sovereign: true,
        pros: ["EU-based (French company)", "GDPR compliant", "Self-hostable", "Good multilingual"],
        cons: ["Slower than Llama 3.1 8B quantized", "Less tool-use capability"],
        notes: "Good EU-sovereign option. Mistral API has EU data residency. Voxtral (March 2026) adds native voice understanding.",
      },
    ],
  },
  {
    id: "tts",
    step: 4,
    label: "TTS / Voice Synthesis",
    labelFr: "TTS / Synthèse Vocale",
    icon: "🔊",
    color: "oklch(0.55 0.20 145)",
    colorLight: "oklch(0.96 0.04 145)",
    description: "Converts LLM text tokens to audio stream. Streaming TTS receives tokens as they arrive from LLM — first audio chunk plays before full response is generated. Voice cloning is critical for GamiWays persona.",
    descriptionFr: "Convertit les tokens texte du LLM en flux audio. Le TTS streaming reçoit les tokens au fur et à mesure du LLM — le premier chunk audio est joué avant que la réponse complète soit générée. Le clonage vocal est critique pour le persona GamiWays.",
    options: [
      {
        id: "cartesia-sonic3",
        name: "Cartesia Sonic 3",
        tier: "recommended",
        deployMode: "cloud",
        latencyBest: 40,
        latencyTypical: 80,
        costNote: "$46.7/1M chars ($0.0000467/char)",
        costPerMin: 0.014,
        sovereign: false,
        pros: ["40ms TTFA — fastest on market", "ELO 1054 quality", "Voice cloning (instant)", "State Space Model architecture", "WebSocket streaming"],
        cons: ["Cloud only", "US data residency", "No on-premise"],
        ttsLink: "cartesia",
        notes: "Recommended for MVP Phase 1 — best latency/quality ratio. State Space Model (not Transformer) enables sub-50ms inference. Pairs perfectly with Pipecat.",
      },
      {
        id: "kokoro-82m",
        name: "Kokoro 82M v1.0",
        tier: "alternative",
        deployMode: "local",
        latencyBest: 60,
        latencyTypical: 120,
        costNote: "Free (Apache 2.0)",
        costPerMin: 0.005,
        sovereign: true,
        pros: ["60ms TTFA on GPU", "ELO 1059 — highest open-source", "Full sovereignty", "Apache 2.0 license", "82M params — lightweight"],
        cons: ["No voice cloning (v1.0)", "Requires GPU for real-time", "Limited emotional range"],
        ttsLink: "kokoro",
        notes: "Best sovereign TTS for Phase 1. No voice cloning in v1.0 — combine with XTTS-v2 for cloning. Deployable on Exoscale GPU instance.",
      },
      {
        id: "chatterbox",
        name: "Chatterbox (Resemble AI)",
        tier: "alternative",
        deployMode: "local",
        latencyBest: 150,
        latencyTypical: 300,
        costNote: "Free (MIT license)",
        costPerMin: 0.005,
        sovereign: true,
        pros: ["Voice cloning (zero-shot)", "Beats ElevenLabs in blind tests (63.75%)", "MIT license", "Emotion control"],
        cons: ["150ms TTFA — slower than Cartesia/Kokoro", "Larger model (requires more VRAM)"],
        ttsLink: "chatterbox",
        notes: "Best open-source option WITH voice cloning. Critical for GamiWays persona. MIT license allows commercial use.",
      },
      {
        id: "inworld-tts15",
        name: "Inworld TTS-2 (research preview)",
        tier: "recommended",
        deployMode: "cloud",
        latencyBest: 120,
        latencyTypical: 200,
        costNote: "TTS-2 & 1.5 Max: $35/1M chars ($0.035/min) On-Demand. TTS-1.5 Mini: $25/1M ($0.025/min). Enterprise: as low as $10/1M.",
        costPerMin: 0.035,
        sovereign: true,
        pros: ["TTS 1.5 #1 Artificial Analysis Speech Arena (ahead of Google, ElevenLabs)", "TTS-2 : Voice Direction — natural language delivery instructions inline", "TTS-2 : Conversational Awareness — model hears prior audio turns", "TTS-2 : 100+ languages, one voice identity, mid-phrase switching", "Sub-200ms median TTFA (TTS alone)", "Viseme timestamps for avatar lip-sync", "On-premise on Enterprise (GDPR, HIPAA, ZDR, SOC2 Type II)", "Single-provider: STT + LLM Router + TTS in one platform"],
        cons: ["TTS-2 in research preview (not yet GA)", "On-premise restricted to Enterprise (custom pricing)", "TTS-2 On-Demand price = $0.035/min (3.5× TTS-1.5 Mini)"],
        ttsLink: "inworld_tts",
        notes: "TTS-2 (May 2026) is rebuilt for realtime conversation. Voice Direction and Conversational Awareness are key differentiators for avatar pipelines. Key advantage for GamiWays: when used with Inworld STT + LLM Router, eliminates inter-component network serialization. Viseme timestamps directly usable for avatar lip-sync. On-premise on Enterprise for sovereignty.",
      },
      {
        id: "elevenlabs-v3",
        name: "ElevenLabs v3 (Flash)",
        tier: "alternative",
        deployMode: "cloud",
        latencyBest: 75,
        latencyTypical: 200,
        costNote: "$75/1M chars (Flash v2.5)",
        costPerMin: 0.023,
        sovereign: false,
        pros: ["ELO 1108 — best quality", "380+ voices", "Best-in-class voice cloning", "Word-level timestamps for lip-sync"],
        cons: ["$75–206/1M chars — expensive", "Cloud only", "Not optimized for agents"],
        ttsLink: "elevenlabs",
        notes: "Use for quality validation benchmarks. Too expensive for production. Flash v2.5 at $75/1M is more viable than Multilingual v3 at $206/1M.",
      },
    ],
  },
  {
    id: "transport",
    step: 5,
    label: "Transport & Delivery",
    labelFr: "Transport & Diffusion",
    icon: "📡",
    color: "oklch(0.55 0.18 25)",
    colorLight: "oklch(0.97 0.03 25)",
    description: "Delivers audio stream to user with minimal jitter. WebRTC is standard for real-time voice. Orchestration frameworks (Pipecat, LiveKit Agents) handle the full pipeline coordination.",
    descriptionFr: "Diffuse le flux audio vers l'utilisateur avec un jitter minimal. WebRTC est le standard pour la voix temps réel. Les frameworks d'orchestration (Pipecat, LiveKit Agents) gèrent la coordination du pipeline complet.",
    options: [
      {
        id: "webrtc-pipecat",
        name: "WebRTC + Pipecat",
        tier: "recommended",
        deployMode: "hybrid",
        latencyBest: 30,
        latencyTypical: 80,
        costNote: "Free (BSD license)",
        costPerMin: 0,
        sovereign: true,
        pros: ["30–80ms network latency", "Full pipeline orchestration", "Deepgram + Cartesia + OpenAI integrations built-in", "Active community (Daily.co)"],
        cons: ["Python-based (not TypeScript)", "Learning curve"],
        notes: "Best framework for Phase 1 MVP. Handles ASR→LLM→TTS pipeline with streaming. Used by Simli, Anam, and most voice agent startups.",
      },
      {
        id: "livekit-agents",
        name: "LiveKit Agents",
        tier: "alternative",
        deployMode: "hybrid",
        latencyBest: 30,
        latencyTypical: 80,
        costNote: "Free (Apache 2.0)",
        costPerMin: 0,
        sovereign: true,
        pros: ["TypeScript + Python SDKs", "Used by BeyondPresence and bitHuman", "Scalable infrastructure", "Good documentation"],
        cons: ["More complex setup than Pipecat", "LiveKit Cloud for managed infra"],
        notes: "Better if TypeScript is preferred. LiveKit Cloud available on EU servers. Used by several GamiWays-comparable platforms.",
      },
    ],
  },
];

// ─── V2V Options ───────────────────────────────────────────────────────────────

export const v2vOptions: PipelineOption[] = [
  {
    id: "ultravox",
    name: "Ultravox v0.5 (Fixie AI)",
    tier: "recommended",
    deployMode: "local",
    latencyBest: 100,
    latencyTypical: 200,
    costNote: "Free (open weights)",
    costPerMin: 0.005,
    sovereign: true,
    pros: ["100ms TTFA", "Open weights (Apache 2.0)", "10 languages", "Pipecat integration", "Self-hostable"],
    cons: ["No voice cloning", "Limited emotional range", "8B params — requires GPU"],
    ttsLink: "ultravox",
    notes: "Best open V2V model for R&D exploration. Architecture: Llama 3.1 8B + audio encoder. Pipecat integration available.",
  },
  {
    id: "moshi",
    name: "Moshi (Kyutai)",
    tier: "research",
    deployMode: "local",
    latencyBest: 200,
    latencyTypical: 400,
    costNote: "Free (CC BY 4.0)",
    costPerMin: 0.005,
    sovereign: true,
    pros: ["Full-duplex (simultaneous speak/listen)", "French research lab (EU)", "Open weights", "Inner monologue architecture"],
    cons: ["200ms latency", "Limited languages (EN/FR)", "Experimental quality", "No voice cloning"],
    ttsLink: "moshi",
    notes: "Kyutai (Paris) research model. First full-duplex V2V. Important for interruption handling research. Not production-ready.",
  },
  {
    id: "voxtral",
    name: "Voxtral TTS (Mistral, Mar 2026)",
    tier: "research",
    deployMode: "cloud",
    latencyBest: 150,
    latencyTypical: 300,
    costNote: "API pricing TBD",
    costPerMin: 0.020,
    sovereign: true,
    pros: ["EU-sovereign (Mistral)", "9 languages", "Voice cloning (announced)", "GDPR compliant"],
    cons: ["Very new (March 2026)", "Limited documentation", "No production benchmarks yet"],
    ttsLink: "voxtral_tts",
    notes: "Most promising V2V for GamiWays: EU-sovereign + voice cloning announced. Monitor closely for H2 2026 evaluation.",
  },
  {
    id: "openai-realtime",
    name: "OpenAI Realtime API",
    tier: "alternative",
    deployMode: "cloud",
    latencyBest: 300,
    latencyTypical: 600,
    costNote: "$0.06/min audio in + $0.24/min audio out",
    costPerMin: 0.30,
    sovereign: false,
    pros: ["ELO 1106 quality", "50 languages", "Function calling", "Emotion control", "Production-ready"],
    cons: ["$0.30/min total — very expensive", "US data residency", "No sovereignty", "No voice cloning"],
    ttsLink: "openai_realtime",
    notes: "Quality reference benchmark. $0.30/min makes it 30× more expensive than Cascade stack. Not viable for GamiWays production.",
  },
];

// ─── Recommended Stacks ────────────────────────────────────────────────────────

export interface RecommendedStack {
  id: string;
  label: string;
  labelFr: string;
  tagline: string;
  taglineFr: string;
  priority: "primary" | "secondary" | "research";
  sovereign: boolean;
  totalLatencyBest: number;
  totalLatencyTypical: number;
  costPerMin: number;
  blocks: { blockId: string; optionId: string }[];
  color: string;
  rationale: string;
  rationaleFr: string;
}

export const recommendedStacks: RecommendedStack[] = [
  {
    id: "mvp-cloud",
    label: "MVP Cloud Stack",
    labelFr: "Stack MVP Cloud",
    tagline: "Fastest path to working prototype",
    taglineFr: "Chemin le plus rapide vers un prototype fonctionnel",
    priority: "primary",
    sovereign: false,
    totalLatencyBest: 505,
    totalLatencyTypical: 1130,
    costPerMin: 0.085,
    blocks: [
      { blockId: "input", optionId: "webrtc-browser" },
      { blockId: "asr", optionId: "deepgram-nova3" },
      { blockId: "memory", optionId: "sliding-window" },
      { blockId: "llm", optionId: "gpt4o-streaming" },
      { blockId: "tts", optionId: "cartesia-sonic3" },
      { blockId: "transport", optionId: "webrtc-pipecat" },
    ],
    color: "oklch(0.55 0.20 200)",
    rationale: "Optimal for Phase 1 MVP validation. Deepgram (75ms) + GPT-4o streaming (350ms) + Cartesia (40ms) + WebRTC (30ms) = ~505ms best-case. Voice cloning via Cartesia. No sovereignty — acceptable for prototype.",
    rationaleFr: "Optimal pour la validation du MVP Phase 1. Deepgram (75ms) + GPT-4o streaming (350ms) + Cartesia (40ms) + WebRTC (30ms) = ~505ms meilleur cas. Clonage vocal via Cartesia. Pas de souveraineté — acceptable pour le prototype.",
  },
  {
    id: "sovereign-stack",
    label: "Sovereign Stack",
    labelFr: "Stack Souveraine",
    tagline: "Full Swiss sovereignty — Exoscale/OVH deployment",
    taglineFr: "Souveraineté suisse complète — déploiement Exoscale/OVH",
    priority: "secondary",
    sovereign: true,
    totalLatencyBest: 710,
    totalLatencyTypical: 1620,
    costPerMin: 0.015,
    blocks: [
      { blockId: "input", optionId: "webrtc-browser" },
      { blockId: "asr", optionId: "whisper-cpp" },
      { blockId: "memory", optionId: "mem0" },
      { blockId: "llm", optionId: "llama31-8b" },
      { blockId: "tts", optionId: "chatterbox" },
      { blockId: "transport", optionId: "livekit-agents" },
    ],
    color: "oklch(0.55 0.18 145)",
    rationale: "Full sovereignty for Swiss/EU institutional partners. Whisper.cpp (200ms) + Llama 3.1 8B (150ms) + Chatterbox (150ms) + Mem0 (20ms) + WebRTC (30ms) = ~710ms best-case. Voice cloning via Chatterbox. Deployable on Exoscale Geneva.",
    rationaleFr: "Souveraineté complète pour les partenaires institutionnels suisses/UE. Whisper.cpp (200ms) + Llama 3.1 8B (150ms) + Chatterbox (150ms) + Mem0 (20ms) + WebRTC (30ms) = ~710ms meilleur cas. Clonage vocal via Chatterbox. Déployable sur Exoscale Genève.",
  },
  {
    id: "inworld-stack",
    label: "Inworld Single-Provider Stack",
    labelFr: "Stack Inworld Fournisseur Unique",
    tagline: "One provider: STT + LLM Router + TTS — no inter-component latency",
    taglineFr: "Un seul fournisseur : STT + LLM Router + TTS — sans latence inter-composants",
    priority: "primary",
    sovereign: true,
    totalLatencyBest: 490,
    totalLatencyTypical: 1050,
    costPerMin: 0.060,
    blocks: [
      { blockId: "input", optionId: "webrtc-browser" },
      { blockId: "asr", optionId: "inworld-stt" },
      { blockId: "memory", optionId: "mem0" },
      { blockId: "llm", optionId: "gpt4o-streaming" },
      { blockId: "tts", optionId: "inworld-tts15" },
      { blockId: "transport", optionId: "webrtc-pipecat" },
    ],
    color: "oklch(0.50 0.22 160)",
    rationale: "Key advantage: Inworld STT + LLM Router + TTS-2 share the same internal infrastructure — no inter-component network serialization. Estimated 30–50ms latency gain vs multi-provider cascade. TTS-2 adds Voice Direction (natural language delivery instructions) and Conversational Awareness (model hears prior turns) — key for avatar coherence. WebRTC (10ms) + Inworld STT (80ms) + Mem0 (20ms) + GPT-4o streaming (350ms) + Inworld TTS-2 (120ms) + WebRTC (30ms) = ~490ms best-case. On-premise on Enterprise for sovereignty. Voice cloning + viseme timestamps included.",
    rationaleFr: "Avantage clé : Inworld STT + LLM Router + TTS-2 partagent la même infrastructure interne — pas de sérialisation réseau inter-composants. Gain estimé de 30–50ms vs cascade multi-fournisseurs. TTS-2 ajoute Voice Direction (instructions de livraison en langage naturel) et Conversational Awareness (le modèle entend les tours précédents) — clé pour la cohérence avatar. WebRTC (10ms) + Inworld STT (80ms) + Mem0 (20ms) + GPT-4o streaming (350ms) + Inworld TTS-2 (120ms) + WebRTC (30ms) = ~490ms meilleur cas. On-premise sur Enterprise pour la souveraineté. Clonage vocal + timestamps visèmes inclus.",
  },
  {
    id: "hybrid-stack",
    label: "Hybrid Stack",
    labelFr: "Stack Hybride",
    tagline: "Best quality/sovereignty balance for production",
    taglineFr: "Meilleur équilibre qualité/souveraineté pour la production",
    priority: "secondary",
    sovereign: false,
    totalLatencyBest: 555,
    totalLatencyTypical: 1230,
    costPerMin: 0.030,
    blocks: [
      { blockId: "input", optionId: "webrtc-browser" },
      { blockId: "asr", optionId: "deepgram-nova3" },
      { blockId: "memory", optionId: "mem0" },
      { blockId: "llm", optionId: "mistral-nemo" },
      { blockId: "tts", optionId: "kokoro-82m" },
      { blockId: "transport", optionId: "webrtc-pipecat" },
    ],
    color: "oklch(0.55 0.18 25)",
    rationale: "EU-sovereign LLM (Mistral) + sovereign TTS (Kokoro) + best ASR (Deepgram) + Mem0 long-term memory. Deepgram (75ms) + Mistral Nemo (200ms) + Kokoro (60ms) + Mem0 (20ms) + WebRTC (30ms) = ~555ms best-case. No voice cloning — add Chatterbox for persona.",
    rationaleFr: "LLM EU-souverain (Mistral) + TTS souverain (Kokoro) + meilleur ASR (Deepgram) + mémoire long terme Mem0. Deepgram (75ms) + Mistral Nemo (200ms) + Kokoro (60ms) + Mem0 (20ms) + WebRTC (30ms) = ~555ms meilleur cas. Pas de clonage vocal — ajouter Chatterbox pour le persona.",
  },
];
