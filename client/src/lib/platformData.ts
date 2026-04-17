// ============================================================
// platformData.ts — DigiDouble Research Portal
// Données centralisées pour les 10 plateformes d'avatars
// Sources : recherche directe mars 2026
// ============================================================

export interface PlatformData {
  id: string;
  name: string;
  tagline: string;
  homepageUrl: string;
  docsUrl: string;
  category: "commercial" | "open-source" | "research";
  model: string;
  latencyMs: number;        // TTFR/TTFA en ms
  costPerMin: number;       // $ par minute
  costPerMinNote: string;   // détail du calcul
  sovereigntyScore: number; // 1-5 (5 = totalement souverain)
  sovereigntyNote: string;
  qualityScore: number;     // 1-10
  protocol: string[];       // WebRTC, REST, WS, etc.

  // Customisation avatar
  customisation: {
    rag: boolean;
    ragDetail: string;
    behavior: boolean;
    behaviorDetail: string;
    bodyLanguage: boolean;
    bodyLanguageDetail: string;
    expressions: boolean;
    expressionsDetail: string;
    voice: boolean;
    voiceDetail: string;
    personaFineTuning: boolean;
    personaFineTuningDetail: string;
  };

  // Entraînement avatar
  training: {
    videoRequired: boolean;
    videoDuration: string;    // ex: "2 min", "30s", "1 image"
    videoResolution: string;
    videoFormat: string;
    bestPractices: string[];
    consentRequired: boolean;
    trainingTime: string;     // durée de traitement
  };

  // API
  api: {
    protocols: string[];
    sdks: string[];
    webhooks: boolean;
    concurrentSessions: string;
    rateLimits: string;
    keyFeatures: string[];
    constraints: string[];
  };

  // Pricing
  pricing: {
    model: string;
    tiers: { name: string; price: string; minutes: string; overage: string }[];
    freeTier: boolean;
    enterpriseCustom: boolean;
    hiddenCosts: string[];
  };

  // Contraintes
  constraints: string[];
  hosting: string;
  gdpr: boolean;
  onPremise: boolean;

  // Pertinence DigiDouble
  digiDoubleRelevance: string;
  digiDoubleScore: number; // 1-10
}

export const platforms: PlatformData[] = [
  {
    id: "heygen",
    name: "HeyGen LiveAvatar",
    tagline: "Modular real-time avatar with FULL/LITE modes",
    homepageUrl: "https://heygen.com",
    docsUrl: "https://docs.liveavatar.com/",
    category: "commercial",
    model: "LiveAvatar (GWM-based)",
    latencyMs: 400,
    costPerMin: 0.20,
    costPerMinNote: "$0.20/min (FULL mode) · $0.10/min (LITE mode) · overage $0.10/credit",
    sovereigntyScore: 1,
    sovereigntyNote: "AWS US-East only. No EU hosting. GDPR DPA available.",
    qualityScore: 9,
    protocol: ["WebRTC", "REST", "LiveKit"],

    customisation: {
      rag: true,
      ragDetail: "Via 'Links' field in Context: provide URLs to knowledge base articles. Avatar queries them in real-time.",
      behavior: true,
      behaviorDetail: "System prompt via 'Context' object. Defines role, tone, response limits. Supports opening text, push-to-talk or continuous mode.",
      bodyLanguage: false,
      bodyLanguageDetail: "Not programmable via API. Fixed by training video. Natural eye contact and head nods are model-generated.",
      expressions: false,
      expressionsDetail: "Automatic based on training. No per-expression API control.",
      voice: true,
      voiceDetail: "ElevenLabs Flash v2.5 integration. Controls: speed, stability, accent. 30+ languages.",
      personaFineTuning: true,
      personaFineTuningDetail: "Modular: separate Avatar ID (visual), Voice ID (audio), Context ID (personality). Same persona can run on different faces.",
    },

    training: {
      videoRequired: true,
      videoDuration: "2 minutes (1 take)",
      videoResolution: "1080p minimum",
      videoFormat: "MP4",
      bestPractices: [
        "15s listening segment (smiles, nods)",
        "90s natural speech on any topic",
        "15s stillness (eyes on camera, natural breathing)",
        "Uniform lighting, no shadows",
        "Silent environment, stable position",
        "Closed mouth pauses between sentences",
      ],
      consentRequired: true,
      trainingTime: "2–4 hours",
    },

    api: {
      protocols: ["REST", "WebRTC (LiveKit)", "WebSocket"],
      sdks: ["@heygen/liveavatar-web-sdk (NPM)", "Python (unofficial)"],
      webhooks: true,
      concurrentSessions: "Plan-dependent (Sandbox: unlimited test mode)",
      rateLimits: "1 min pre-reserved per session start",
      keyFeatures: [
        "FULL mode: HeyGen manages ASR + LLM + TTS + WebRTC",
        "LITE mode: developer brings own AI stack, HeyGen handles video only",
        "Sandbox mode for unlimited testing (no credit consumption)",
        "Session webhooks: READY, RUNNING, COMPLETED, FAILED",
      ],
      constraints: [
        "Old Interactive Avatar API sunset March 31 2026",
        "Old HeyGen API keys incompatible with LiveAvatar",
        "1-minute credit escrow per session start",
      ],
    },

    pricing: {
      model: "Monthly subscription + credits",
      tiers: [
        { name: "Free", price: "$0/mo", minutes: "~5 min (10 credits)", overage: "$0.10/credit" },
        { name: "Paid", price: "~$29/mo", minutes: "~500 min (1000 credits)", overage: "$0.10/credit" },
        { name: "Enterprise", price: "Custom", minutes: "Custom", overage: "Negotiated" },
      ],
      freeTier: true,
      enterpriseCustom: true,
      hiddenCosts: ["1-min credit escrow per session", "ElevenLabs voice costs billed separately"],
    },

    constraints: [
      "No body gesture API control",
      "Photo-only avatars no longer supported (video required)",
      "AWS US hosting only — no EU option",
      "Strict content moderation (no adult, political, hate content)",
      "API key system incompatible between HeyGen Studio and LiveAvatar",
    ],
    hosting: "AWS US-East-1",
    gdpr: true,
    onPremise: false,
    digiDoubleRelevance: "Excellent for LITE mode: DigiDouble keeps full control over ASR/LLM/TTS stack while HeyGen handles real-time video rendering. Industry-leading visual quality. Main limitation: US-only hosting.",
    digiDoubleScore: 8,
  },

  {
    id: "tavus",
    name: "Tavus (Phoenix-4 + Raven-1)",
    tagline: "Conversational Video Interface with full emotional intelligence stack — Raven-1 perception + Phoenix-4 rendering + Sparrow-1 turn-taking",
    homepageUrl: "https://www.tavus.io",
    docsUrl: "https://docs.tavus.io/api-reference/overview",
    category: "commercial",
    model: "Phoenix-4 + Raven-1 + Sparrow-1 (CVI Stack 2026)",
    latencyMs: 500,
    costPerMin: 0.32,
    costPerMinNote: "$0.32/min (Growth plan) · $0.37/min (Starter) · Free: 25 min total",
    sovereigntyScore: 1,
    sovereigntyNote: "AWS US. SOC2 Type II + HIPAA (Growth+). No EU hosting.",
    qualityScore: 10,
    protocol: ["WebRTC", "REST", "Daily SDK"],

    customisation: {
      rag: true,
      ragDetail: "Native RAG via Persona: provide document_ids or document_tags. Avatar queries knowledge base in real-time during conversation.",
      behavior: true,
      behaviorDetail: "Persona system_prompt + Objectives (guided conversational goals) + Guardrails (strict behavioral limits). 30+ languages.",
      bodyLanguage: true,
      bodyLanguageDetail: "Phoenix-4 (2026): generates full head, hair, eyes, pose and expression from scratch every frame — no pre-recorded video loops. Active listening: nods, tilts, microexpressions react to what the user says in real time.",
      expressions: true,
      expressionsDetail: "Phoenix-4 emotional intelligence: smooth transitions between emotional states, emergent microexpressions, no brute-force emotion. Raven-1 perception layer feeds emotional context to Phoenix-4 in real time (context freshness < 300ms).",
      voice: true,
      voiceDetail: "Tone and accent customisation. 30+ languages. Echo mode: drive avatar with external audio stream.",
      personaFineTuning: true,
      personaFineTuningDetail: "Objectives + Guardrails system allows fine-grained persona control. Text Respond mode for scripted interactions.",
    },

    training: {
      videoRequired: true,
      videoDuration: "2 minutes (1 min speech + 1 min neutral listening)",
      videoResolution: "1080p minimum, 4K recommended",
      videoFormat: "MP4 (H.264/AAC) or WebM, 25fps min",
      bestPractices: [
        "1 min continuous speech (clear articulation, teeth visible)",
        "1 min neutral listening (closed mouth, no expression)",
        "Waist-up, seated, ~1m from camera",
        "Diffuse lighting, static background",
        "Verbal consent declaration required",
      ],
      consentRequired: true,
      trainingTime: "4–5 hours",
    },

    api: {
      protocols: ["REST", "WebRTC (Daily)", "WebSocket"],
      sdks: ["JavaScript/React", "Python"],
      webhooks: true,
      concurrentSessions: "1 (Free) → 15+ (Growth) → unlimited (Enterprise)",
      rateLimits: "S3 pre-signed URLs required for training media",
      keyFeatures: [
        "Raven-1 (2026): multimodal perception — audio-visual fusion, tone + expression + gaze + posture → natural language output for LLMs. Context < 300ms stale. Audio perception < 100ms.",
        "Phoenix-4 (2026): fully generated face/hair/eyes/pose every frame — no video loops. Active listening behaviors. Smooth emotional transitions with microexpressions.",
        "Sparrow-1: turn-taking model for natural conversation flow",
        "Raven-1 tool calling: OpenAI-compatible schema, callbacks on user laughter, emotional thresholds, attention shifts",
        "Echo mode: lip-sync on external audio stream",
        "Text Respond: generate response from text input",
        "Cerebras chip integration for ultra-fast LLM inference",
        "Webhooks for training completion and conversation state",
      ],
      constraints: [
        "Dependency on Daily for WebRTC layer",
        "S3 pre-signed URLs required for media upload",
        "4–5h training time for custom replicas",
      ],
    },

    pricing: {
      model: "Monthly subscription + pay-as-you-go",
      tiers: [
        { name: "Free", price: "$0/mo", minutes: "25 min conversation", overage: "N/A" },
        { name: "Starter", price: "$59/mo", minutes: "100 min", overage: "$0.37/min" },
        { name: "Growth", price: "$397/mo", minutes: "1250 min", overage: "$0.32/min" },
        { name: "Enterprise", price: "Custom", minutes: "Custom", overage: "Negotiated" },
      ],
      freeTier: true,
      enterpriseCustom: true,
      hiddenCosts: ["Replica training: $40–$65 per extra training", "Video generation billed separately from conversation minutes"],
    },

    constraints: [
      "No manual control of specific hand/arm gestures",
      "4–5h training time for custom replicas",
      "High-quality video required (1080p min, 4K recommended)",
      "US hosting only",
      "SOC2/HIPAA only on Growth+ plans",
      "Mandatory verbal consent for personal replicas",
    ],
    hosting: "AWS US",
    gdpr: true,
    onPremise: false,
    digiDoubleRelevance: "As of April 2026, Tavus is the most advanced commercial platform for emotional intelligence in conversational video avatars. The Raven-1 + Phoenix-4 + Sparrow-1 stack is the reference architecture for DigiDouble's target capabilities. Raven-1's perception layer (audio-visual fusion, < 300ms context freshness) directly addresses DigiDouble Axis 3 (Contextual Awareness). Phoenix-4's fully-generated rendering (no video loops, active listening behaviors) sets the quality benchmark. Main limitations for DigiDouble: US-only hosting (GDPR sovereignty concern), high cost ($0.32/min), and no open-source equivalent available yet.",
    digiDoubleScore: 9,
  },

  {
    id: "synthesia",
    name: "Synthesia",
    tagline: "Enterprise video avatar platform — EU-hosted, async generation",
    homepageUrl: "https://www.synthesia.io",
    docsUrl: "https://docs.synthesia.io/reference/introduction",
    category: "commercial",
    model: "Expressive Avatars (Synthesia 3.0)",
    latencyMs: 60000, // async, minutes not ms
    costPerMin: 2.13,
    costPerMinNote: "~$2.13/min (Creator annual plan). Not real-time — async video generation.",
    sovereigntyScore: 4,
    sovereigntyNote: "AWS eu-west-1 (Ireland). ISO 27001, ISO 27701, SOC2 Type II. GDPR compliant. No on-premise.",
    qualityScore: 9,
    protocol: ["REST", "HTTPS"],

    customisation: {
      rag: true,
      ragDetail: "Copilot feature (rolling out) connects avatars to custom knowledge bases. Script-driven responses for structured content.",
      behavior: true,
      behaviorDetail: "Behavior via script text and tone. Expressive avatars auto-adapt gestures to sentiment. Gesture tags in script (e.g., nod).",
      bodyLanguage: true,
      bodyLanguageDetail: "Expressive Avatars auto-generate gestures and body language from text sentiment. No manual per-gesture API control.",
      expressions: true,
      expressionsDetail: "Automatic micro-expressions from text sentiment. New generation Expressive Avatars significantly more natural.",
      voice: true,
      voiceDetail: "Voice cloning in 30+ languages preserving accent and dialect. High-quality clone requires paid plan.",
      personaFineTuning: true,
      personaFineTuningDetail: "Personal Avatars capture unique visual and vocal identity. Script-driven persona consistency.",
    },

    training: {
      videoRequired: true,
      videoDuration: "5–10 minutes of speech footage",
      videoResolution: "1080p minimum, 4K recommended",
      videoFormat: "MP4 or MOV",
      bestPractices: [
        "Face camera throughout, uniform lighting",
        "Neutral stable background",
        "Avoid excessive head movements",
        "Natural expression, no exaggerated gestures",
        "Explicit consent phrase recorded",
      ],
      consentRequired: true,
      trainingTime: "Several hours",
    },

    api: {
      protocols: ["REST", "HTTPS"],
      sdks: ["JavaScript (unofficial)", "Python (unofficial)"],
      webhooks: true,
      concurrentSessions: "N/A — async generation",
      rateLimits: "API access only on Creator and Enterprise plans",
      keyFeatures: [
        "Create videos from scripts or templates",
        "Webhook notifications for video status",
        "Asset management API",
        "Video Agents (Synthesia 3.0 — real-time, in preview)",
      ],
      constraints: [
        "No native WebRTC real-time streaming (async only for now)",
        "API access locked to Creator+ plans",
        "Generation latency: minutes, not milliseconds",
        "Video Agents (real-time) still in preview",
      ],
    },

    pricing: {
      model: "Annual subscription per seat",
      tiers: [
        { name: "Starter", price: "$18/mo", minutes: "10 min/mo video", overage: "N/A" },
        { name: "Creator", price: "$64/mo", minutes: "30 min/mo video", overage: "~$2.13/min" },
        { name: "Enterprise", price: "Custom", minutes: "Custom", overage: "Negotiated" },
      ],
      freeTier: false,
      enterpriseCustom: true,
      hiddenCosts: ["Voice cloning requires paid plan", "API access only on Creator+"],
    },

    constraints: [
      "No real-time WebRTC streaming (async only — Video Agents in preview)",
      "No on-premise option",
      "Manual micro-expression control limited",
      "Strict content moderation (no deepfakes without consent)",
      "API locked to Creator+ plans",
    ],
    hosting: "AWS eu-west-1 (Ireland)",
    gdpr: true,
    onPremise: false,
    digiDoubleRelevance: "Best EU sovereignty option. Excellent visual quality. Currently limited for real-time DigiDouble use case (async only), but Synthesia 3.0 Video Agents (in preview) may change this. Ideal for pre-recorded educational content.",
    digiDoubleScore: 6,
  },

  {
    id: "simli",
    name: "Simli (Trinity-1)",
    tagline: "Ultra-low latency real-time avatar from a single image",
    homepageUrl: "https://www.simli.com/",
    docsUrl: "https://docs.simli.com/overview",
    category: "commercial",
    model: "Trinity-1 / Gaussian",
    latencyMs: 300,
    costPerMin: 0.009,
    costPerMinNote: "$0.009/min (Scale) · $0.01/min (Hobby) · $0.0095/min (Pro)",
    sovereigntyScore: 3,
    sovereigntyNote: "Norwegian company (Simli AS). EU jurisdiction. No explicit EU datacenter confirmed. No on-premise.",
    qualityScore: 7,
    protocol: ["WebRTC", "REST", "WebSocket", "LiveKit", "Pipecat"],

    customisation: {
      rag: true,
      ragDetail: "Via third-party LLM integration (OpenAI, Anthropic via Pipecat/LiveKit). Custom knowledge bases fed to the LLM layer. Simli handles Speech-to-Video only.",
      behavior: true,
      behaviorDetail: "Behavior defined by connected LLM prompt. Simli is a Speech-to-Video renderer — personality lives in the LLM layer.",
      bodyLanguage: false,
      bodyLanguageDetail: "Head movements and facial micro-expressions auto-generated. No complex hand/body gesture API.",
      expressions: true,
      expressionsDetail: "Realistic facial expressions and smooth animation via Trinity-1. Gaussian model for photorealistic face cloning.",
      voice: true,
      voiceDetail: "ElevenLabs integration for voice customisation (tone, accent, speed). Simli handles audio-to-video sync.",
      personaFineTuning: false,
      personaFineTuningDetail: "Persona lives in the LLM layer (external). Simli only handles visual rendering from audio input.",
    },

    training: {
      videoRequired: false,
      videoDuration: "Single high-quality image",
      videoResolution: "High-quality JPEG or PNG, front-facing",
      videoFormat: "JPEG / PNG (via /faces/trinity endpoint)",
      bestPractices: [
        "Front-facing photo, well-lit, neutral expression",
        "Closed mouth",
        "No obstructions (glasses, hair over face)",
        "Gaussian model: stricter quality requirements for photorealism",
      ],
      consentRequired: false,
      trainingTime: "Minutes to a few hours",
    },

    api: {
      protocols: ["REST", "WebRTC", "WebSocket", "LiveKit", "Pipecat"],
      sdks: ["JavaScript/TypeScript", "Python"],
      webhooks: false,
      concurrentSessions: "1 (Free) → 2 (Hobby) → 10 (Pro) → 50 (Scale)",
      rateLimits: "Avatar slots: 1 (Free) → 1 (Hobby) → 5 (Pro) → 30 (Scale)",
      keyFeatures: [
        "POST /compose/token — session token",
        "GET /compose/ice — ICE servers for WebRTC",
        "Native LiveKit and Pipecat integration",
        "Speech-to-Video pipeline: audio in → video out",
        "<300ms end-to-end latency",
      ],
      constraints: [
        "Manual WebRTC negotiation required for custom implementations",
        "No built-in LLM or TTS (bring your own)",
        "Avatar slots limited by plan",
        "No webhook support",
      ],
    },

    pricing: {
      model: "Monthly subscription + included minutes",
      tiers: [
        { name: "Free", price: "$0/mo", minutes: "50 min/mo", overage: "N/A" },
        { name: "Hobby", price: "$10/mo", minutes: "1000 min/mo", overage: "$0.01/min" },
        { name: "Pro", price: "$49/mo", minutes: "5500 min/mo", overage: "$0.0095/min" },
        { name: "Scale", price: "$249/mo", minutes: "27500 min/mo", overage: "$0.009/min" },
        { name: "Enterprise", price: "Custom", minutes: "Custom", overage: "Custom" },
      ],
      freeTier: true,
      enterpriseCustom: true,
      hiddenCosts: ["ElevenLabs TTS billed separately", "LLM API costs (OpenAI/Anthropic) billed separately"],
    },

    constraints: [
      "No body gesture API (head movements only)",
      "No built-in LLM or TTS — must integrate separately",
      "Avatar slots limited by plan tier",
      "No webhook support",
      "No on-premise option",
    ],
    hosting: "Cloud (Norwegian company, EU jurisdiction)",
    gdpr: true,
    onPremise: false,
    digiDoubleRelevance: "Best price/performance ratio for real-time video rendering. Ideal as a Speech-to-Video module in DigiDouble's modular pipeline. Ultra-low cost ($0.009/min) and <300ms latency. Limitation: no built-in AI stack — must integrate ASR/LLM/TTS separately.",
    digiDoubleScore: 9,
  },

  {
    id: "anam",
    name: "Anam.ai",
    tagline: "One-shot photorealistic avatar with native RAG and 180ms latency",
    homepageUrl: "https://anam.ai/",
    docsUrl: "https://anam.ai/docs/getting-started",
    category: "commercial",
    model: "Cara-3",
    latencyMs: 180,
    costPerMin: 0.12,
    costPerMinNote: "$0.12/min (Growth) · $0.11/min (Professional) · $0.16/min (Starter)",
    sovereigntyScore: 3,
    sovereigntyNote: "HIPAA + SOC-II certified. Zero Data Retention option for Enterprise. Cloud-based (AWS/GCP).",
    qualityScore: 8,
    protocol: ["WebRTC", "REST"],

    customisation: {
      rag: true,
      ragDetail: "Native RAG (beta): upload PDF, MD, TXT documents. Avatar queries knowledge base in real-time. Available on Explorer+ plans.",
      behavior: true,
      behaviorDetail: "Structured 5-block prompt: Personality, Environment, Tone, Objectives, Guardrails. Fine-grained response style and politeness control.",
      bodyLanguage: true,
      bodyLanguageDetail: "Cara-3 generates photorealistic body language and micro-movements dynamically based on conversation context. Not manually scriptable.",
      expressions: true,
      expressionsDetail: "Photorealistic facial expressions auto-generated from conversation context. High fidelity emotional range.",
      voice: true,
      voiceDetail: "Stability, clarity, speed adjustments. ElevenLabs integration for custom voice cloning (Professional+ plans only).",
      personaFineTuning: true,
      personaFineTuningDetail: "5-block structured prompt system enables deep persona definition. Session-level personality override available.",
    },

    training: {
      videoRequired: false,
      videoDuration: "Single image (One-Shot Avatar)",
      videoResolution: "High-quality photo, front-facing, neutral background",
      videoFormat: "JPEG / PNG",
      bestPractices: [
        "Front-facing, well-lit photo",
        "Neutral background",
        "No obstructions",
        "Or: text-to-avatar generation (no photo needed)",
        "Custom voice: ElevenLabs audio samples (few minutes)",
      ],
      consentRequired: false,
      trainingTime: "Under 2 minutes",
    },

    api: {
      protocols: ["REST", "WebRTC"],
      sdks: ["JavaScript/TypeScript", "Python"],
      webhooks: false,
      concurrentSessions: "Unlimited (Growth+)",
      rateLimits: "Session duration: 3–10 min (lower plans) → unlimited (Growth+)",
      keyFeatures: [
        "180ms median server latency",
        "25fps video output",
        "Custom LLM support (OpenAI-compatible endpoints or client-side)",
        "Voice activity detection: sensitivity and silence controls",
        "Multilingual support",
        "Tool calling support",
      ],
      constraints: [
        "RAG still in beta",
        "Session duration limited on lower plans",
        "Custom voice cloning requires Professional ($999/mo)",
        "No webhook support",
      ],
    },

    pricing: {
      model: "Monthly subscription + per-second overage",
      tiers: [
        { name: "Free", price: "$0/mo", minutes: "30 min", overage: "N/A" },
        { name: "Starter", price: "$12/mo", minutes: "50 min", overage: "$0.16/min" },
        { name: "Explorer", price: "$49/mo", minutes: "250 min", overage: "$0.14/min" },
        { name: "Growth", price: "$299/mo", minutes: "2000 min", overage: "$0.12/min" },
        { name: "Professional", price: "$999/mo", minutes: "5000 min", overage: "$0.11/min" },
        { name: "Enterprise", price: "Custom", minutes: "Unlimited", overage: "Custom" },
      ],
      freeTier: true,
      enterpriseCustom: true,
      hiddenCosts: ["Custom voice cloning: Professional plan only ($999/mo)", "RAG feature: Explorer+ only", "Watermark on Free and Starter plans"],
    },

    constraints: [
      "No manual control of specific gestures or posture",
      "RAG in beta — experimental",
      "Custom voice cloning requires $999/mo plan",
      "Session duration limited on lower tiers",
      "No on-premise standard option",
    ],
    hosting: "Cloud (AWS/GCP). Zero Data Retention option for Enterprise.",
    gdpr: true,
    onPremise: false,
    digiDoubleRelevance: "Fastest median latency (180ms) among commercial platforms. One-Shot avatar creation ideal for rapid prototyping. Native RAG (beta) and structured persona system align well with DigiDouble's educational use case. Limitation: custom voice requires expensive plan.",
    digiDoubleScore: 9,
  },

  {
    id: "did",
    name: "D-ID (Expressive V4)",
    tagline: "Enterprise AI agents with expressive avatars and native RAG",
    homepageUrl: "https://www.d-id.com",
    docsUrl: "https://docs.d-id.com/",
    category: "commercial",
    model: "D-ID Expressive V4",
    latencyMs: 450,
    costPerMin: 0.40,
    costPerMinNote: "$0.35–$0.45/min (Scale plan). 1 credit = 15s video → 4 credits/min.",
    sovereigntyScore: 1,
    sovereigntyNote: "Israeli company. AWS US-East-1. No EU hosting. GDPR principles respected but no EU datacenter.",
    qualityScore: 8,
    protocol: ["WebRTC", "REST"],

    customisation: {
      rag: true,
      ragDetail: "Native 'Knowledge' API: connect custom knowledge bases (PDF, text). Agent queries them in real-time during conversation.",
      behavior: true,
      behaviorDetail: "System prompt configuration for personality, tone, response style. Full agent persona definition.",
      bodyLanguage: true,
      bodyLanguageDetail: "V4 Expressive: adaptive body language generated to match voice inflection and emotional context. Natural posture.",
      expressions: true,
      expressionsDetail: "V4 Expressive: emotion and micro-expression control via sentiment tags (joy, seriousness, surprise).",
      voice: true,
      voiceDetail: "ElevenLabs + Microsoft Azure TTS partnerships. Hundreds of multilingual voices. Pitch, speed, accent control. Voice cloning available.",
      personaFineTuning: true,
      personaFineTuningDetail: "Full agent persona: system prompt + knowledge base + voice + visual identity. Consistent role maintenance throughout interaction.",
    },

    training: {
      videoRequired: true,
      videoDuration: "3–5 minutes (Premium+ avatars)",
      videoResolution: "1080p minimum at 30fps",
      videoFormat: "MP4 or MOV",
      bestPractices: [
        "Frontal uniform lighting, no shadows",
        "Neutral fixed background",
        "Stable camera at eye level",
        "Natural speech with pauses",
        "Avoid excessive head movements",
        "Clean audio recording (no background noise)",
        "No face occlusions (sunglasses, hands)",
      ],
      consentRequired: true,
      trainingTime: "Several hours",
    },

    api: {
      protocols: ["REST", "WebRTC"],
      sdks: ["JavaScript", "Python"],
      webhooks: true,
      concurrentSessions: "Plan-dependent",
      rateLimits: "BYO-S3 available on Pro+ plans",
      keyFeatures: [
        "Knowledge API for native RAG",
        "Agents API for full conversational agent management",
        "Expressive V4 emotion tags",
        "ElevenLabs + Azure TTS integration",
        "WebRTC real-time streaming",
      ],
      constraints: [
        "Expressive V4 requires specific credits (not all stock avatars)",
        "No on-premise standard option",
        "Data stored on D-ID infrastructure by default (BYO-S3 on Pro+)",
        "Celebrity face moderation",
      ],
    },

    pricing: {
      model: "Credit-based (1 credit = 15s video)",
      tiers: [
        { name: "Trial", price: "Free (14 days)", minutes: "Limited", overage: "N/A" },
        { name: "Build", price: "$18/mo", minutes: "32 min streaming", overage: "~$0.56/min" },
        { name: "Launch", price: "$40/mo", minutes: "90 min streaming", overage: "~$0.44/min" },
        { name: "Scale", price: "$158/mo", minutes: "400 min streaming", overage: "~$0.40/min" },
        { name: "Enterprise", price: "Custom", minutes: "Custom", overage: "Custom" },
      ],
      freeTier: true,
      enterpriseCustom: true,
      hiddenCosts: ["Expressive V4 credits premium", "BYO-S3 only on Pro+", "20–30% discount on annual commitment"],
    },

    constraints: [
      "No manual hand/arm gesture control",
      "US hosting only (AWS US-East-1)",
      "Expressive V4 not available on all stock avatars",
      "Celebrity face moderation",
      "No on-premise standard option",
    ],
    hosting: "AWS US-East-1",
    gdpr: true,
    onPremise: false,
    digiDoubleRelevance: "Strong native RAG and expressive emotion control make D-ID compelling for educational agents. V4 Expressive is a significant upgrade. Main limitation: US-only hosting and higher cost per minute vs. Simli/bitHuman.",
    digiDoubleScore: 7,
  },

  {
    id: "runway",
    name: "Runway Characters",
    tagline: "Zero-shot avatar from image with tool calling and RAG",
    homepageUrl: "https://runwayml.com/product/characters",
    docsUrl: "https://docs.dev.runwayml.com/characters/",
    category: "commercial",
    model: "GWM-1",
    latencyMs: 400,
    costPerMin: 0.21,
    costPerMinNote: "$0.21/min (2 credits per 6s + $0.02 init). 1 credit = $0.01.",
    sovereigntyScore: 1,
    sovereigntyNote: "AWS US. SOC2 Type II. GDPR/CCPA compliant. No EU hosting, no on-premise.",
    qualityScore: 8,
    protocol: ["WebRTC", "REST"],

    customisation: {
      rag: true,
      ragDetail: "Upload .txt files as knowledge base. Avatar queries them in real-time. Tool Calling enables external action triggers during conversation.",
      behavior: true,
      behaviorDetail: "Personality via system prompt (overridable per session). Voice style presets (professional, authoritative, etc.).",
      bodyLanguage: false,
      bodyLanguageDetail: "Fixed by reference image. Model generates natural body language but no granular API control.",
      expressions: true,
      expressionsDetail: "GWM-1 generates natural micro-expressions and facial movements. Not manually scriptable.",
      voice: true,
      voiceDetail: "Voice presets (Clara, Vincent, etc.) with style variations. No custom voice cloning via Characters API at launch.",
      personaFineTuning: true,
      personaFineTuningDetail: "System prompt overridable per session call. Tool Calling for external integrations. Starting script customisable.",
    },

    training: {
      videoRequired: false,
      videoDuration: "Single reference image",
      videoResolution: "1088×704px recommended, 16:9 ratio",
      videoFormat: "JPEG / PNG",
      bestPractices: [
        "Front-facing, well-lit, face centered",
        "No obstructions (sunglasses, hair over face)",
        "Works with human, stylized, or mascot images",
        "No audio samples needed for built-in voices",
      ],
      consentRequired: false,
      trainingTime: "Seconds (no training required)",
    },

    api: {
      protocols: ["REST", "WebRTC"],
      sdks: ["React SDK (official)", "Python SDK"],
      webhooks: true,
      concurrentSessions: "Plan-dependent",
      rateLimits: "Session max: 5 minutes. Pre-provisioning required (NOT_READY → READY state).",
      keyFeatures: [
        "Avatar ID management via REST",
        "Session lifecycle: NOT_READY → READY → RUNNING → COMPLETED/FAILED",
        "Dynamic personality override per session",
        "Tool Calling for external action triggers",
        "Webhooks: READY, RUNNING, COMPLETED, FAILED",
      ],
      constraints: [
        "5-minute maximum session duration",
        "Pre-provisioning required before WebRTC connection",
        "No custom voice cloning via Characters API",
        "US hosting only",
      ],
    },

    pricing: {
      model: "Credit-based (1 credit = $0.01)",
      tiers: [
        { name: "Pay-as-you-go", price: "Credits only", minutes: "~$0.21/min", overage: "N/A" },
        { name: "Standard", price: "~$12/mo", minutes: "Included credits", overage: "$0.21/min" },
        { name: "Pro", price: "~$28/mo", minutes: "More credits", overage: "$0.21/min" },
        { name: "Enterprise", price: "Custom", minutes: "Custom", overage: "Custom" },
      ],
      freeTier: false,
      enterpriseCustom: true,
      hiddenCosts: ["2 credits init per session ($0.02 fixed)", "Runway subscription may be required for advanced features"],
    },

    constraints: [
      "5-minute maximum session duration",
      "No custom voice cloning in Characters API",
      "No manual body gesture control",
      "US hosting only",
      "Pre-provisioning adds latency before session start",
    ],
    hosting: "AWS US",
    gdpr: true,
    onPremise: false,
    digiDoubleRelevance: "Tool Calling is a unique differentiator for interactive educational scenarios. Zero-shot from image is excellent for rapid prototyping. 5-min session limit is a significant constraint for DigiDouble's longer interaction scenarios.",
    digiDoubleScore: 7,
  },

  {
    id: "beyondpresence",
    name: "Beyond Presence (Genesis 2)",
    tagline: "250ms latency, German sovereignty, enterprise-grade RAG",
    homepageUrl: "https://www.beyondpresence.ai/",
    docsUrl: "https://docs.bey.dev/",
    category: "commercial",
    model: "Genesis 2",
    latencyMs: 250,
    costPerMin: 0.175,
    costPerMinNote: "$0.175/min (Starter, Managed Agent) · $0.0875/min (Speech-to-Video only)",
    sovereigntyScore: 4,
    sovereigntyNote: "Beyond Presence GmbH, Munich, Germany. GDPR compliant. Enterprise: isolated EU deployment available.",
    qualityScore: 8,
    protocol: ["WebRTC", "REST", "LiveKit", "WebSocket"],

    customisation: {
      rag: true,
      ragDetail: "Knowledge Base: upload domain-specific documents, FAQs, data. Agent queries in real-time. Enterprise-grade RAG.",
      behavior: true,
      behaviorDetail: "System Prompt for personality, tone, response style. Session parameters: greeting messages, duration limits.",
      bodyLanguage: true,
      bodyLanguageDetail: "Genesis 2: natural upper-body movements, authentic gestures inherited from training video. Professional library of default avatars.",
      expressions: true,
      expressionsDetail: "Genesis 2: wide emotional range, eye contact maintenance, micro-expressions. Significantly enhances user trust.",
      voice: true,
      voiceDetail: "Voice cloning during custom avatar training. High-quality voice capture from training video.",
      personaFineTuning: true,
      personaFineTuningDetail: "Full agent definition: system prompt + knowledge base + voice + visual identity. White-labeling on Growth+ plans.",
    },

    training: {
      videoRequired: true,
      videoDuration: "4–5 minutes (2 min minimum)",
      videoResolution: "1080p (720p minimum)",
      videoFormat: "MP4 or MOV",
      bestPractices: [
        "Static background with contrasting colors",
        "Consistent lighting, no face shadows",
        "Look directly at camera",
        "Speak clearly in complete sentences with 1–2s pauses",
        "Stable head position",
        "Hands below shoulders",
        "5 seconds stillness at start",
        "Written consent required",
      ],
      consentRequired: true,
      trainingTime: "Several hours",
    },

    api: {
      protocols: ["REST", "WebRTC (LiveKit)", "WebSocket"],
      sdks: ["TypeScript", "Python", "LiveKit Client SDK"],
      webhooks: true,
      concurrentSessions: "Plan-dependent (up to 50 req/request for listing)",
      rateLimits: "Max 30 min session (standard plans)",
      keyFeatures: [
        "POST /v1/calls → returns livekit_url + livekit_token",
        "250ms speech-to-video latency",
        "~1s end-to-end response time",
        "n8n webhook integration for workflow automation",
        "Enterprise: dedicated isolated deployments + SLA guarantees",
      ],
      constraints: [
        "30-minute max session on standard plans",
        "Long hair and beards produce poor rendering results",
        "White-labeling locked to Growth+ plans",
        "Some data may transfer internationally depending on service providers",
      ],
    },

    pricing: {
      model: "Subscription + credit consumption",
      tiers: [
        { name: "Starter", price: "$49/mo", minutes: "140 min (Managed Agent)", overage: "$0.35/min" },
        { name: "Growth", price: "$149/mo", minutes: "745 min (Managed Agent)", overage: "$0.20/min" },
        { name: "Scale", price: "$349/mo", minutes: "2000 min (Managed Agent)", overage: "$0.175/min" },
        { name: "Enterprise", price: "Custom", minutes: "Custom", overage: "Custom" },
      ],
      freeTier: false,
      enterpriseCustom: true,
      hiddenCosts: ["Speech-to-Video only: 50 credits/min (half the cost of Managed Agent)", "Isolated EU deployment: Enterprise only"],
    },

    constraints: [
      "Long hair and beards: poor rendering results",
      "No manual limb gesture control",
      "30-min max session on standard plans",
      "White-labeling: Growth+ only",
      "Written consent required for custom avatars",
    ],
    hosting: "Beyond Presence GmbH, Munich, Germany. Enterprise: isolated EU deployment.",
    gdpr: true,
    onPremise: true,
    digiDoubleRelevance: "Best combination of low latency (250ms), EU sovereignty (German company, GDPR), and enterprise RAG. Isolated EU deployment option is unique among commercial platforms. Ideal for DigiDouble's Swiss/European context requiring data sovereignty.",
    digiDoubleScore: 9,
  },

  {
    id: "bithuman",
    name: "bitHuman",
    tagline: "Edge-deployable avatar with gesture API and self-hosted option",
    homepageUrl: "https://bithuman.ai/",
    docsUrl: "https://docs.bithuman.ai/overview",
    category: "commercial",
    model: "Essence (CPU) / Expression (GPU)",
    latencyMs: 300,
    costPerMin: 0.05,
    costPerMinNote: "$0.01/min (Essence self-hosted CPU) · $0.05/min (Expression cloud) · $0.30/min (Expression cloud, low volume)",
    sovereigntyScore: 5,
    sovereigntyNote: "Full self-hosted option (on-premise, CPU or GPU). Total data sovereignty. No cloud dependency required.",
    qualityScore: 7,
    protocol: ["WebRTC", "REST", "LiveKit"],

    customisation: {
      rag: true,
      ragDetail: "Agent Context API: inject 'silent knowledge' (documents, data) into the avatar's context. CO-STAR framework for structured knowledge.",
      behavior: true,
      behaviorDetail: "CO-STAR framework: Context, Objective, Style, Tone, Audience, Response. Emotional tone (empathetic, calm). Structured response style.",
      bodyLanguage: true,
      bodyLanguageDetail: "Dynamics API: trigger specific gestures via keywords or API commands (hand signs, nods, laughs). Unique feature among commercial platforms.",
      expressions: true,
      expressionsDetail: "Real-time facial expressions at 25fps, synchronized with audio (lip-sync). Emotion-driven micro-expressions.",
      voice: true,
      voiceDetail: "Voice cloning via Voice Upload. OpenAI and ElevenLabs TTS integration. Custom voice persona.",
      personaFineTuning: true,
      personaFineTuningDetail: "CO-STAR prompt framework + Dynamics API for gesture triggers. Persona can include non-human characters (animals, illustrated characters).",
    },

    training: {
      videoRequired: false,
      videoDuration: "Image OR short video (max 30 seconds for Likeness)",
      videoResolution: "Image: <10MB, frontal neutral lighting. Video: single person, centered, minimal movement.",
      videoFormat: "Image: JPEG/PNG. Video: MP4 (max 30s)",
      bestPractices: [
        "Image: frontal, well-lit, neutral expression",
        "Video (Likeness): single person, centered, minimal movement",
        "Max 30 seconds video",
        "No complex gestures in training footage",
        "Expression model requires GPU for custom faces outside catalog",
      ],
      consentRequired: false,
      trainingTime: "Minutes",
    },

    api: {
      protocols: ["REST", "WebRTC", "LiveKit"],
      sdks: ["JavaScript/TypeScript", "Python"],
      webhooks: false,
      concurrentSessions: "Plan-dependent",
      rateLimits: "250 credits fixed cost for initial agent generation",
      keyFeatures: [
        "Dynamics API: gesture triggers via keywords or API",
        "CO-STAR framework for structured persona",
        "Self-hosted deployment (CPU or GPU)",
        "Edge deployment on ARM/x86 hardware",
        "Offline operation possible",
        "LiveKit integration for WebRTC streaming",
      ],
      constraints: [
        "Expression model (GPU) required for custom faces outside catalog",
        "LiveKit dependency for real-time streaming",
        "Manual memory persistence via context injection",
        "No webhook support",
      ],
    },

    pricing: {
      model: "Credit-based subscription",
      tiers: [
        { name: "Free", price: "$0/mo", minutes: "~99 min (Essence)", overage: "N/A" },
        { name: "Basic", price: "$10/mo", minutes: "700 credits", overage: "$0.01/min (Essence)" },
        { name: "Pro", price: "$25/mo", minutes: "2300 credits", overage: "$0.01/min (Essence)" },
        { name: "Creator", price: "$75/mo", minutes: "10000 credits", overage: "$0.01/min (Essence)" },
        { name: "Business", price: "$200/mo", minutes: "30000 credits", overage: "$0.01/min (Essence)" },
      ],
      freeTier: true,
      enterpriseCustom: true,
      hiddenCosts: ["250 credits fixed for agent generation", "Expression model (GPU): 4 credits/min vs 1 credit/min for Essence", "GPU hardware cost if self-hosted"],
    },

    constraints: [
      "Expression model requires GPU (higher cost)",
      "LiveKit dependency for streaming",
      "No webhook support",
      "Manual memory persistence required",
      "Body customisation limited vs. facial expressions",
    ],
    hosting: "Self-hosted (on-premise, CPU or GPU) OR cloud. Full sovereignty option.",
    gdpr: true,
    onPremise: true,
    digiDoubleRelevance: "Unique Dynamics API for gesture control is a key differentiator. Self-hosted CPU deployment enables total sovereignty and 10x cost reduction. Ideal for DigiDouble's Swiss sovereignty requirements. Limitation: Expression model requires GPU for custom faces.",
    digiDoubleScore: 8,
  },

  {
    id: "hedra",
    name: "Hedra (Character-2/3)",
    tagline: "Audio-driven avatar with superior expressivity and $0.05/min live option",
    homepageUrl: "https://www.hedra.com/",
    docsUrl: "https://api.hedra.com/web-app/redoc",
    category: "commercial",
    model: "Character-2 / Character-3",
    latencyMs: 500,
    costPerMin: 0.05,
    costPerMinNote: "$0.05/min (Hedra Live Avatars) · ~$0.40/min (Studio credits, Character-3: 360 credits/min)",
    sovereigntyScore: 1,
    sovereigntyNote: "US company. AWS US. GDPR principles respected. No EU hosting, no on-premise standard.",
    qualityScore: 8,
    protocol: ["WebRTC", "REST", "LiveKit"],

    customisation: {
      rag: true,
      ragDetail: "External knowledge base connection via API. Omnia API for enterprise brand consistency. Behavior driven by input prompt.",
      behavior: true,
      behaviorDetail: "Tone, personality via input prompt and voice selection. Omnia API for enterprise persona consistency.",
      bodyLanguage: true,
      bodyLanguageDetail: "Procedural AI-generated body language synchronized with audio. No manual gesture scripting.",
      expressions: true,
      expressionsDetail: "Character-2/3: dynamic micro-expressions auto-synchronized with audio. Superior emotional expressivity.",
      voice: true,
      voiceDetail: "Large voice library + voice cloning (audio sample: 30–60s WAV/MP3). Speed and emotion adjustments.",
      personaFineTuning: true,
      personaFineTuningDetail: "Omnia API for enterprise brand consistency. Persona via prompt + voice selection.",
    },

    training: {
      videoRequired: false,
      videoDuration: "Single image (One-shot animation)",
      videoResolution: "High-quality portrait, frontal, uniform lighting, neutral background",
      videoFormat: "JPEG / PNG",
      bestPractices: [
        "Front-facing portrait, uniform lighting",
        "Neutral background",
        "For voice cloning: 30–60s clean audio (WAV or MP3, no background noise)",
        "Enterprise: 2–5 min reference video for full character model",
      ],
      consentRequired: false,
      trainingTime: "Minutes (One-shot). Hours for enterprise full model.",
    },

    api: {
      protocols: ["REST", "WebRTC (LiveKit)", "HTTPS"],
      sdks: ["Node.js (GitHub)"],
      webhooks: false,
      concurrentSessions: "Plan-dependent",
      rateLimits: "10-minute max session. Credits don't roll over month-to-month.",
      keyFeatures: [
        "GET /public/models — list available models",
        "GET /public/voices — list voices",
        "POST /public/assets — create asset",
        "GET /public/generations/{id}/status — streaming_url in response",
        "Hedra Live Avatars: $0.05/min real-time mode",
        "Character-3: 6 credits/second (360 credits/min)",
      ],
      constraints: [
        "10-minute max session duration",
        "Credits don't roll over",
        "No webhook support",
        "US hosting only",
        "No on-premise standard option",
      ],
    },

    pricing: {
      model: "Subscription + credits",
      tiers: [
        { name: "Free", price: "$0/mo", minutes: "3 min/mo video", overage: "N/A" },
        { name: "Basic", price: "$15/mo", minutes: "1500 credits (~4 min Character-3)", overage: "~$0.40/min" },
        { name: "Creator", price: "$30/mo", minutes: "5400 credits (~15 min Character-3)", overage: "~$0.40/min" },
        { name: "Professional", price: "$75/mo", minutes: "14400 credits (~40 min Character-3)", overage: "~$0.40/min" },
        { name: "Live Avatars", price: "Usage-based", minutes: "$0.05/min", overage: "$0.05/min" },
      ],
      freeTier: true,
      enterpriseCustom: true,
      hiddenCosts: ["Credits don't roll over", "Character-3 consumes 6 credits/second (very fast consumption)", "Enterprise private deployment on request"],
    },

    constraints: [
      "10-minute max session duration",
      "Credits don't roll over month-to-month",
      "No manual gesture scripting",
      "US hosting only",
      "No on-premise standard option",
      "No webhook support",
    ],
    hosting: "AWS US",
    gdpr: true,
    onPremise: false,
    digiDoubleRelevance: "Lowest cost real-time option ($0.05/min via Live Avatars). Character-2/3 expressivity is excellent. One-shot from image enables rapid prototyping. Main limitations: US hosting, 10-min session cap, and no on-premise option.",
    digiDoubleScore: 7,
  },

  // ── LemonSlice ──────────────────────────────────────────────
  {
    id: "lemonslice",
    name: "LemonSlice (LS-2.1)",
    tagline: "20B Video DiT · Multi-style avatars (human + cartoon + mascot) · Real-time emotion triggering",
    homepageUrl: "https://lemonslice.com",
    docsUrl: "https://lemonslice.com/docs/overview/intro",
    category: "commercial",
    model: "LemonSlice-2.1 (20B Video Diffusion Transformer)",
    latencyMs: 3000,
    costPerMin: 0.21,
    costPerMinNote: "$0.21/min (Hosted API) · Self-Managed Pipeline: GPU cost only (~$0.03/min on A100)",
    sovereigntyScore: 2,
    sovereigntyNote: "US-hosted by default. Self-Managed Pipeline allows on-premise GPU deployment — sovereignty possible but requires infrastructure setup.",
    qualityScore: 8,
    protocol: ["REST", "WebSocket", "WebRTC (via Self-Managed Pipeline)"],

    customisation: {
      rag: false,
      ragDetail: "No native RAG. Knowledge base must be managed externally by the developer's LLM layer.",
      behavior: true,
      behaviorDetail: "System prompt passed to the integrated LLM layer. Developer can also bring their own LLM (BYOLLM) and control behavior entirely.",
      bodyLanguage: true,
      bodyLanguageDetail: "LS-2.1 generates full-body motion from audio. Gestures, head movements and posture are synthesised by the 20B DiT model — not pre-recorded loops.",
      expressions: true,
      expressionsDetail: "LS-2.1 Emotion API: trigger specific emotional states (joy, surprise, concern, neutral) via API call. Real-time emotion blending with smooth transitions. Context freshness < 500ms.",
      voice: true,
      voiceDetail: "Integrated TTS or BYOTTS (Bring Your Own TTS). Supports ElevenLabs, Cartesia, and custom audio streams. 20+ languages.",
      personaFineTuning: true,
      personaFineTuningDetail: "Avatar style is configurable at creation: photorealistic human, cartoon, mascot, animal, or stylised character — all from a single image or reference. Style is locked per avatar instance.",
    },

    training: {
      videoRequired: false,
      videoDuration: "1 image (zero-shot) or short video clip (optional for higher fidelity)",
      videoResolution: "512×512 minimum · 1024×1024 recommended",
      videoFormat: "JPEG, PNG, MP4",
      bestPractices: [
        "Single front-facing image with clear face/character visibility",
        "For cartoon/mascot: provide reference sheet with multiple angles if available",
        "Consistent lighting on reference image improves temporal coherence",
        "For photorealistic: neutral expression in reference yields best emotional range",
        "Optional: 30s reference video for improved lip-sync accuracy",
      ],
      consentRequired: true,
      trainingTime: "< 5 minutes (zero-shot) · 15–30 minutes (fine-tuned)",
    },

    api: {
      protocols: ["REST", "WebSocket", "WebRTC (Self-Managed Pipeline)"],
      sdks: ["JavaScript/TypeScript SDK", "Python SDK", "React component library"],
      webhooks: true,
      concurrentSessions: "Hosted: plan-dependent · Self-Managed: limited by GPU capacity",
      rateLimits: "Hosted API: 10 concurrent sessions (Growth) · Self-Managed: no limit",
      keyFeatures: [
        "LemonSlice-2 (Dec 2025): 20B Video DiT, 20 FPS on single A100 GPU — 10× efficiency vs LS-1",
        "LS-2.1 (Q1 2026): adds real-time emotion triggering + action API (wave, nod, point, etc.)",
        "UNIQUE: only commercial platform supporting cartoons, mascots, animals alongside photorealistic humans",
        "Zero-shot avatar creation from 1 image — no training video required",
        "Self-Managed Pipeline: deploy LS-2 on your own GPU infrastructure for full sovereignty",
        "BYOLLM + BYOTTS: bring your own LLM and TTS, LemonSlice handles only video rendering",
        "Emotion API: trigger joy, surprise, concern, neutral with configurable intensity (0.0–1.0)",
        "Action API: trigger gestures (wave, nod, point, shrug) via API call",
        "Temporal coherence: 20B DiT maintains identity across long sessions without drift",
        "Multi-character scenes: up to 3 avatars in a single session (beta)",
      ],
      constraints: [
        "Self-Managed Pipeline requires A100/H100 GPU (not consumer hardware)",
        "Hosted API: ~3s end-to-end latency (not suitable for sub-2s target without Self-Managed)",
        "No native RAG — developer must manage knowledge base externally",
        "Cartoon/mascot styles require style reference image for best results",
        "Multi-character beta: limited to 3 avatars, no cross-avatar interaction API yet",
      ],
    },

    pricing: {
      model: "Subscription + usage-based · Self-Managed: flat GPU fee",
      tiers: [
        { name: "Free", price: "$0/mo", minutes: "30 min/mo (hosted)", overage: "N/A" },
        { name: "Starter", price: "$49/mo", minutes: "200 min", overage: "$0.25/min" },
        { name: "Growth", price: "$199/mo", minutes: "950 min", overage: "$0.21/min" },
        { name: "Self-Managed", price: "$499/mo", minutes: "Unlimited (own GPU)", overage: "GPU cost only" },
        { name: "Enterprise", price: "Custom", minutes: "Custom", overage: "Negotiated" },
      ],
      freeTier: true,
      enterpriseCustom: true,
      hiddenCosts: [
        "Self-Managed requires A100/H100 GPU rental ($2–4/hr on cloud)",
        "BYOTTS costs billed separately by TTS provider",
        "Fine-tuning jobs billed per compute hour",
      ],
    },

    constraints: [
      "~3s hosted latency — above DigiDouble 2s target without Self-Managed Pipeline",
      "Self-Managed requires A100/H100 GPU (significant infrastructure investment)",
      "No native RAG integration",
      "US-hosted by default (Self-Managed enables sovereignty)",
      "Multi-character scenes limited to 3 avatars (beta)",
      "Cartoon/mascot style locked at avatar creation — cannot switch style mid-session",
    ],
    hosting: "US (hosted) · On-premise possible via Self-Managed Pipeline",
    gdpr: true,
    onPremise: true,
    digiDoubleRelevance: "Strategically relevant for DigiDouble's Emotional Toolbox and Character Design axes. UNIQUE capability: multi-style avatars (cartoons, mascots, animals) enable non-human pedagogical characters — a gap no other commercial platform covers. Self-Managed Pipeline aligns with DigiDouble's sovereignty requirement. Main challenge: ~3s hosted latency requires Self-Managed deployment to meet the 2s target. Strong candidate for Gamilab integration (gamified avatars).",
    digiDoubleScore: 8,
  },
];

// Helper: get platform by ID
export const getPlatform = (id: string): PlatformData | undefined =>
  platforms.find((p) => p.id === id);

// Pricing comparison table data
export const pricingComparison = platforms
  .filter((p) => p.costPerMin > 0)
  .sort((a, b) => a.costPerMin - b.costPerMin)
  .map((p) => ({
    id: p.id,
    name: p.name,
    costPerMin: p.costPerMin,
    costPerMinNote: p.costPerMinNote,
    sovereigntyScore: p.sovereigntyScore,
    latencyMs: p.latencyMs,
    onPremise: p.onPremise,
    freeTier: p.pricing.freeTier,
  }));
