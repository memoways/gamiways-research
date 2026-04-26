/**
 * StackDecisionSimulator.tsx — DigiDouble Research Portal
 * Simulateur de décision : wizard contextuel → recommandation de stack par couche
 * Design: Technical Blueprint — wizard steps, result cards, shareable URL
 * i18n: EN / FR via LangContext
 */
import { useState, useCallback } from "react";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import { ChevronRight, RotateCcw, Share2, Check, ExternalLink } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = "validation" | "production" | "scale";
type SovereigntyLevel = "low" | "medium" | "high";
type LatencyTarget = "relaxed" | "standard" | "realtime";
type BudgetLevel = "bootstrap" | "startup" | "enterprise";
type UseCase = "conversational" | "educational" | "corporate" | "regulated";

interface SimulatorAnswers {
  phase: Phase | null;
  sovereignty: SovereigntyLevel | null;
  latency: LatencyTarget | null;
  budget: BudgetLevel | null;
  useCase: UseCase | null;
}

interface LayerRecommendation {
  layer: string;
  layerFr: string;
  icon: string;
  option: string;
  optionFr: string;
  rationale: string;
  rationaleFr: string;
  maturity: "production" | "emerging" | "research";
  alternatives: string[];
  alternativesFr: string[];
  link?: string;
}

// ─── Decision engine ──────────────────────────────────────────────────────────
function computeRecommendations(answers: SimulatorAnswers): LayerRecommendation[] {
  const { phase, sovereignty, latency, budget, useCase } = answers;

  // STT layer
  const sttLayer: LayerRecommendation = (() => {
    if (sovereignty === "high" || useCase === "regulated") {
      return {
        layer: "ASR / STT", layerFr: "ASR / STT", icon: "🎙️",
        option: "Self-hosted Whisper (large-v3 or Faster-Whisper)",
        optionFr: "Whisper auto-hébergé (large-v3 ou Faster-Whisper)",
        rationale: "High sovereignty requirements mandate on-premise processing. Whisper large-v3 delivers competitive WER across European languages and can be fine-tuned on domain vocabulary. Faster-Whisper reduces GPU memory footprint by 4×.",
        rationaleFr: "Les exigences élevées de souveraineté imposent un traitement on-premise. Whisper large-v3 offre un WER compétitif sur les langues européennes et peut être fine-tuné sur le vocabulaire métier. Faster-Whisper réduit l'empreinte GPU de 4×.",
        maturity: "production",
        alternatives: ["Voxtral STT (Mistral, EU-hosted)", "Audiogami (Swiss hosting option)"],
        alternativesFr: ["Voxtral STT (Mistral, hébergement EU)", "Audiogami (option hébergement suisse)"],
        link: "/voice/stt/whisper-large-v3",
      };
    }
    if (phase === "validation" || budget === "bootstrap") {
      return {
        layer: "ASR / STT", layerFr: "ASR / STT", icon: "🎙️",
        option: "Deepgram Nova-3 (cloud API)",
        optionFr: "Deepgram Nova-3 (API cloud)",
        rationale: "For validation phases, Deepgram Nova-3 offers the best latency/quality ratio with a generous free tier. Real-time streaming, diarization, and PII redaction are available out of the box. Evaluate migration to self-hosted once volume justifies it.",
        rationaleFr: "En phase de validation, Deepgram Nova-3 offre le meilleur ratio latence/qualité avec un tier gratuit généreux. Streaming temps réel, diarisation et rédaction PII disponibles nativement. Évaluer la migration vers l'auto-hébergé une fois le volume justifié.",
        maturity: "production",
        alternatives: ["AssemblyAI Universal-2", "Azure Speech (EU region)"],
        alternativesFr: ["AssemblyAI Universal-2", "Azure Speech (région EU)"],
        link: "/voice/stt/deepgram-nova-3",
      };
    }
    if (latency === "realtime") {
      return {
        layer: "ASR / STT", layerFr: "ASR / STT", icon: "🎙️",
        option: "Deepgram Nova-3 or Inworld STT (streaming)",
        optionFr: "Deepgram Nova-3 ou Inworld STT (streaming)",
        rationale: "Real-time requirements demand streaming-capable STT with sub-300ms first-token latency. Deepgram and Inworld both offer WebSocket streaming. Evaluate Inworld only if already in their ecosystem — standalone pricing is high.",
        rationaleFr: "Les exigences temps réel demandent un STT capable de streaming avec latence premier token <300ms. Deepgram et Inworld proposent tous deux du streaming WebSocket. Évaluer Inworld uniquement si déjà dans leur écosystème — le prix standalone est élevé.",
        maturity: "production",
        alternatives: ["Faster-Whisper with streaming patch", "Voxtral STT"],
        alternativesFr: ["Faster-Whisper avec patch streaming", "Voxtral STT"],
        link: "/voice/stt/deepgram-nova-3",
      };
    }
    return {
      layer: "ASR / STT", layerFr: "ASR / STT", icon: "🎙️",
      option: "Deepgram Nova-3 or Azure Speech (EU)",
      optionFr: "Deepgram Nova-3 ou Azure Speech (EU)",
      rationale: "Standard production deployments benefit from managed cloud STT with EU data residency options. Azure Speech offers GDPR-compliant EU regions with enterprise SLAs. Deepgram provides better latency for conversational use cases.",
      rationaleFr: "Les déploiements production standard bénéficient d'un STT cloud géré avec options de résidence EU. Azure Speech offre des régions EU conformes RGPD avec SLAs entreprise. Deepgram offre une meilleure latence pour les cas d'usage conversationnels.",
      maturity: "production",
      alternatives: ["Whisper large-v3 (self-hosted)", "Voxtral STT"],
      alternativesFr: ["Whisper large-v3 (auto-hébergé)", "Voxtral STT"],
      link: "/voice/stt/deepgram-nova-3",
    };
  })();

  // TTS layer
  const ttsLayer: LayerRecommendation = (() => {
    if (latency === "realtime" && sovereignty !== "high") {
      return {
        layer: "TTS / Voice Synthesis", layerFr: "TTS / Synthèse Vocale", icon: "🔊",
        option: "Cartesia Sonic (streaming, <80ms TTFA)",
        optionFr: "Cartesia Sonic (streaming, <80ms TTFA)",
        rationale: "Cartesia Sonic delivers the lowest TTFA of any commercial TTS (sub-80ms) with high-quality streaming. Ideal for real-time conversational agents where latency is the primary constraint. Voice cloning available with reference audio.",
        rationaleFr: "Cartesia Sonic offre le TTFA le plus faible de tout TTS commercial (<80ms) avec un streaming haute qualité. Idéal pour les agents conversationnels temps réel où la latence est la contrainte principale. Clonage vocal disponible avec audio de référence.",
        maturity: "production",
        alternatives: ["ElevenLabs Flash v2.5", "Inworld TTS (streaming)"],
        alternativesFr: ["ElevenLabs Flash v2.5", "Inworld TTS (streaming)"],
        link: "/tts/cartesia",
      };
    }
    if (sovereignty === "high" || useCase === "regulated") {
      return {
        layer: "TTS / Voice Synthesis", layerFr: "TTS / Synthèse Vocale", icon: "🔊",
        option: "Kokoro-82M or Chatterbox-Turbo (self-hosted)",
        optionFr: "Kokoro-82M ou Chatterbox-Turbo (auto-hébergé)",
        rationale: "For sovereign deployments, Kokoro-82M (Apache 2.0, 82M params) offers excellent quality/compute ratio and runs on modest GPU hardware. Chatterbox-Turbo adds voice cloning with 3s reference audio. Both can be deployed on EU/CH infrastructure.",
        rationaleFr: "Pour les déploiements souverains, Kokoro-82M (Apache 2.0, 82M params) offre un excellent ratio qualité/calcul et tourne sur du hardware GPU modeste. Chatterbox-Turbo ajoute le clonage vocal avec 3s d'audio de référence. Les deux peuvent être déployés sur infrastructure EU/CH.",
        maturity: "emerging",
        alternatives: ["XTTS-v2 (Coqui, multilingual)", "Inworld TTS on-premise"],
        alternativesFr: ["XTTS-v2 (Coqui, multilingue)", "Inworld TTS on-premise"],
        link: "/tts/kokoro",
      };
    }
    if (useCase === "educational" || useCase === "conversational") {
      return {
        layer: "TTS / Voice Synthesis", layerFr: "TTS / Synthèse Vocale", icon: "🔊",
        option: "ElevenLabs Turbo v2.5 or Inworld TTS",
        optionFr: "ElevenLabs Turbo v2.5 ou Inworld TTS",
        rationale: "Educational and conversational agents benefit from high expressiveness and voice cloning. ElevenLabs leads on emotional range and multilingual quality. Inworld TTS is purpose-built for conversational AI with emotion control API. Evaluate both with real user samples.",
        rationaleFr: "Les agents éducatifs et conversationnels bénéficient d'une haute expressivité et du clonage vocal. ElevenLabs est leader sur la gamme émotionnelle et la qualité multilingue. Inworld TTS est conçu pour l'IA conversationnelle avec API de contrôle émotionnel. Évaluer les deux avec de vrais échantillons utilisateurs.",
        maturity: "production",
        alternatives: ["Cartesia Sonic", "PlayHT PlayDialog"],
        alternativesFr: ["Cartesia Sonic", "PlayHT PlayDialog"],
        link: "/tts/elevenlabs",
      };
    }
    return {
      layer: "TTS / Voice Synthesis", layerFr: "TTS / Synthèse Vocale", icon: "🔊",
      option: "ElevenLabs Turbo v2.5 or Cartesia Sonic",
      optionFr: "ElevenLabs Turbo v2.5 ou Cartesia Sonic",
      rationale: "For standard production deployments, ElevenLabs and Cartesia represent the current quality/latency frontier. ElevenLabs excels on expressiveness; Cartesia on latency. Run an A/B test with your actual use case scripts before committing.",
      rationaleFr: "Pour les déploiements production standard, ElevenLabs et Cartesia représentent la frontière qualité/latence actuelle. ElevenLabs excelle sur l'expressivité ; Cartesia sur la latence. Lancer un A/B test avec vos vrais scripts avant de vous engager.",
      maturity: "production",
      alternatives: ["Kokoro-82M (self-hosted)", "Inworld TTS"],
      alternativesFr: ["Kokoro-82M (auto-hébergé)", "Inworld TTS"],
      link: "/tts/elevenlabs",
    };
  })();

  // LLM layer
  const llmLayer: LayerRecommendation = (() => {
    if (sovereignty === "high" || useCase === "regulated") {
      return {
        layer: "LLM Orchestration", layerFr: "Orchestration LLM", icon: "🧠",
        option: "Mistral Small 3.1 or Llama 3.3 70B (self-hosted)",
        optionFr: "Mistral Small 3.1 ou Llama 3.3 70B (auto-hébergé)",
        rationale: "Sovereign LLM deployment on EU/CH infrastructure. Mistral Small 3.1 (24B) offers strong multilingual performance with Apache 2.0 license, deployable on 2× A100 or equivalent. Llama 3.3 70B provides higher reasoning capability at higher compute cost.",
        rationaleFr: "Déploiement LLM souverain sur infrastructure EU/CH. Mistral Small 3.1 (24B) offre de bonnes performances multilingues avec licence Apache 2.0, déployable sur 2× A100 ou équivalent. Llama 3.3 70B offre une meilleure capacité de raisonnement à coût calcul plus élevé.",
        maturity: "production",
        alternatives: ["Mistral Large (Mistral EU API)", "Qwen 2.5 72B (self-hosted)"],
        alternativesFr: ["Mistral Large (API Mistral EU)", "Qwen 2.5 72B (auto-hébergé)"],
      };
    }
    if (latency === "realtime") {
      return {
        layer: "LLM Orchestration", layerFr: "Orchestration LLM", icon: "🧠",
        option: "GPT-4o mini or Mistral Small (API, low TTFT)",
        optionFr: "GPT-4o mini ou Mistral Small (API, TTFT faible)",
        rationale: "Real-time pipelines require TTFT under 200ms. Smaller models (GPT-4o mini, Mistral Small) achieve this with acceptable quality for conversational tasks. Avoid frontier models (GPT-4o, Claude 3.5) in the hot path — use them for offline enrichment only.",
        rationaleFr: "Les pipelines temps réel requièrent un TTFT inférieur à 200ms. Les modèles plus petits (GPT-4o mini, Mistral Small) y parviennent avec une qualité acceptable pour les tâches conversationnelles. Éviter les modèles frontier (GPT-4o, Claude 3.5) dans le chemin chaud — les réserver à l'enrichissement offline.",
        maturity: "production",
        alternatives: ["Groq-hosted Llama 3.1 8B (ultra-low TTFT)", "Cerebras inference"],
        alternativesFr: ["Llama 3.1 8B sur Groq (TTFT ultra-faible)", "Inférence Cerebras"],
      };
    }
    if (phase === "validation" || budget === "bootstrap") {
      return {
        layer: "LLM Orchestration", layerFr: "Orchestration LLM", icon: "🧠",
        option: "GPT-4o or Claude 3.5 Sonnet (API)",
        optionFr: "GPT-4o ou Claude 3.5 Sonnet (API)",
        rationale: "For validation, frontier models minimize the risk of LLM quality being a confounding variable. Use GPT-4o or Claude 3.5 to validate the conversational experience, then optimize to smaller/cheaper models once the product hypotheses are confirmed.",
        rationaleFr: "En validation, les modèles frontier minimisent le risque que la qualité LLM soit une variable confondante. Utiliser GPT-4o ou Claude 3.5 pour valider l'expérience conversationnelle, puis optimiser vers des modèles plus petits/moins chers une fois les hypothèses produit confirmées.",
        maturity: "production",
        alternatives: ["Mistral Large (Mistral API)", "Gemini 1.5 Pro"],
        alternativesFr: ["Mistral Large (API Mistral)", "Gemini 1.5 Pro"],
      };
    }
    return {
      layer: "LLM Orchestration", layerFr: "Orchestration LLM", icon: "🧠",
      option: "GPT-4o mini + GPT-4o (tiered routing)",
      optionFr: "GPT-4o mini + GPT-4o (routage par niveau)",
      rationale: "Tiered routing: use GPT-4o mini for standard conversational turns (low latency, low cost), escalate to GPT-4o for complex reasoning or sensitive topics. This pattern reduces cost by 60–80% while preserving quality on edge cases.",
      rationaleFr: "Routage par niveau : utiliser GPT-4o mini pour les tours conversationnels standard (faible latence, faible coût), escalader vers GPT-4o pour le raisonnement complexe ou les sujets sensibles. Ce pattern réduit le coût de 60–80% tout en préservant la qualité sur les cas limites.",
      maturity: "production",
      alternatives: ["Mistral Large + Small (EU API)", "Claude 3.5 Haiku + Sonnet"],
      alternativesFr: ["Mistral Large + Small (API EU)", "Claude 3.5 Haiku + Sonnet"],
    };
  })();

  // Memory layer
  const memoryLayer: LayerRecommendation = (() => {
    if (useCase === "educational" || useCase === "conversational") {
      return {
        layer: "Conversational Memory", layerFr: "Mémoire Conversationnelle", icon: "🗃️",
        option: "Sliding window + vector store (pgvector or Qdrant)",
        optionFr: "Fenêtre glissante + vector store (pgvector ou Qdrant)",
        rationale: "Educational and conversational agents require persistent memory across sessions. A sliding window (last N turns) handles short-term context; a vector store enables semantic retrieval of past interactions. pgvector (PostgreSQL extension) minimizes infrastructure overhead.",
        rationaleFr: "Les agents éducatifs et conversationnels requièrent une mémoire persistante entre les sessions. Une fenêtre glissante (N derniers tours) gère le contexte court terme ; un vector store permet la récupération sémantique des interactions passées. pgvector (extension PostgreSQL) minimise la surcharge infrastructure.",
        maturity: "production",
        alternatives: ["Mem0 (managed memory API)", "LangChain ConversationBufferWindowMemory"],
        alternativesFr: ["Mem0 (API mémoire gérée)", "LangChain ConversationBufferWindowMemory"],
      };
    }
    if (sovereignty === "high") {
      return {
        layer: "Conversational Memory", layerFr: "Mémoire Conversationnelle", icon: "🗃️",
        option: "Self-hosted pgvector (PostgreSQL + pgvector)",
        optionFr: "pgvector auto-hébergé (PostgreSQL + pgvector)",
        rationale: "Sovereign memory requires all conversation data to remain on-premise. pgvector as a PostgreSQL extension is the lowest-overhead option — no additional service to manage. Combine with a summarization step to compress long conversation histories.",
        rationaleFr: "La mémoire souveraine requiert que toutes les données de conversation restent on-premise. pgvector comme extension PostgreSQL est l'option à plus faible surcharge — pas de service supplémentaire à gérer. Combiner avec une étape de résumé pour compresser les historiques longs.",
        maturity: "production",
        alternatives: ["Qdrant (self-hosted)", "Chroma (self-hosted)"],
        alternativesFr: ["Qdrant (auto-hébergé)", "Chroma (auto-hébergé)"],
      };
    }
    return {
      layer: "Conversational Memory", layerFr: "Mémoire Conversationnelle", icon: "🗃️",
      option: "Context window management + optional vector store",
      optionFr: "Gestion de fenêtre de contexte + vector store optionnel",
      rationale: "For most use cases, a well-structured context window (system prompt + last 10 turns + retrieved facts) is sufficient. Add a vector store only when conversation history exceeds context limits or when cross-session recall is required.",
      rationaleFr: "Pour la plupart des cas d'usage, une fenêtre de contexte bien structurée (system prompt + 10 derniers tours + faits récupérés) est suffisante. Ajouter un vector store uniquement quand l'historique dépasse les limites de contexte ou quand le rappel inter-sessions est requis.",
      maturity: "production",
      alternatives: ["Mem0 (managed)", "pgvector (self-hosted)"],
      alternativesFr: ["Mem0 (géré)", "pgvector (auto-hébergé)"],
    };
  })();

  // Streaming layer
  const streamingLayer: LayerRecommendation = (() => {
    if (latency === "realtime") {
      return {
        layer: "Streaming & Transport", layerFr: "Streaming & Transport", icon: "⚡",
        option: "WebRTC (LiveKit or Daily.co) + WebSocket LLM streaming",
        optionFr: "WebRTC (LiveKit ou Daily.co) + streaming LLM WebSocket",
        rationale: "Real-time voice requires WebRTC for audio transport (adaptive bitrate, jitter buffer, echo cancellation). LiveKit is the leading open-source WebRTC SFU with SDKs for all platforms. Combine with WebSocket streaming for LLM tokens to minimize end-to-end latency.",
        rationaleFr: "La voix temps réel requiert WebRTC pour le transport audio (débit adaptatif, tampon jitter, annulation d'écho). LiveKit est le SFU WebRTC open-source leader avec des SDKs pour toutes les plateformes. Combiner avec le streaming WebSocket pour les tokens LLM pour minimiser la latence end-to-end.",
        maturity: "production",
        alternatives: ["Daily.co (managed WebRTC)", "Agora (enterprise WebRTC)"],
        alternativesFr: ["Daily.co (WebRTC géré)", "Agora (WebRTC entreprise)"],
      };
    }
    return {
      layer: "Streaming & Transport", layerFr: "Streaming & Transport", icon: "⚡",
      option: "WebSocket + Server-Sent Events (SSE)",
      optionFr: "WebSocket + Server-Sent Events (SSE)",
      rationale: "For standard latency requirements, WebSocket for bidirectional audio/text and SSE for LLM token streaming provide a simpler architecture than full WebRTC. Suitable for web-based interfaces where browser WebSocket support is guaranteed.",
      rationaleFr: "Pour les exigences de latence standard, WebSocket pour l'audio/texte bidirectionnel et SSE pour le streaming de tokens LLM offrent une architecture plus simple que le WebRTC complet. Adapté aux interfaces web où le support WebSocket navigateur est garanti.",
      maturity: "production",
      alternatives: ["WebRTC (LiveKit) if latency degrades", "gRPC streaming for server-side pipelines"],
      alternativesFr: ["WebRTC (LiveKit) si la latence se dégrade", "gRPC streaming pour les pipelines côté serveur"],
    };
  })();

  // Infrastructure layer
  const infraLayer: LayerRecommendation = (() => {
    if (sovereignty === "high" || useCase === "regulated") {
      return {
        layer: "GPU Infrastructure", layerFr: "Infrastructure GPU", icon: "🖥️",
        option: "EU/CH sovereign cloud (Exoscale, Scaleway, Hetzner GPU)",
        optionFr: "Cloud souverain EU/CH (Exoscale, Scaleway, Hetzner GPU)",
        rationale: "Regulated and high-sovereignty deployments require EU/CH data residency. Exoscale (Swiss, ISO 27001) and Scaleway (French, GDPR-native) offer GPU instances with contractual data sovereignty. Hetzner provides cost-effective GPU at €2–4/h for A100-class hardware.",
        rationaleFr: "Les déploiements réglementés et haute souveraineté requièrent une résidence des données EU/CH. Exoscale (suisse, ISO 27001) et Scaleway (français, RGPD natif) offrent des instances GPU avec souveraineté des données contractuelle. Hetzner offre du GPU économique à 2–4€/h pour du hardware classe A100.",
        maturity: "production",
        alternatives: ["OVHcloud GPU (FR/DE)", "Azure EU regions (with data residency addendum)"],
        alternativesFr: ["OVHcloud GPU (FR/DE)", "Azure régions EU (avec avenant résidence données)"],
      };
    }
    if (phase === "validation" || budget === "bootstrap") {
      return {
        layer: "GPU Infrastructure", layerFr: "Infrastructure GPU", icon: "🖥️",
        option: "Serverless GPU (Modal, Replicate, RunPod)",
        optionFr: "GPU serverless (Modal, Replicate, RunPod)",
        rationale: "For validation phases, serverless GPU eliminates infrastructure management overhead. Modal and Replicate offer pay-per-second billing with cold start under 5s for most models. RunPod provides the lowest cost for persistent GPU rentals when usage is predictable.",
        rationaleFr: "En phase de validation, le GPU serverless élimine la surcharge de gestion d'infrastructure. Modal et Replicate offrent une facturation à la seconde avec démarrage à froid inférieur à 5s pour la plupart des modèles. RunPod offre le coût le plus bas pour les locations GPU persistantes quand l'usage est prévisible.",
        maturity: "production",
        alternatives: ["Google Colab Pro+ (prototyping only)", "Lambda Labs (reserved GPU)"],
        alternativesFr: ["Google Colab Pro+ (prototypage uniquement)", "Lambda Labs (GPU réservé)"],
      };
    }
    return {
      layer: "GPU Infrastructure", layerFr: "Infrastructure GPU", icon: "🖥️",
      option: "Managed cloud GPU (AWS, GCP, Azure) + auto-scaling",
      optionFr: "GPU cloud géré (AWS, GCP, Azure) + auto-scaling",
      rationale: "Production deployments benefit from managed GPU auto-scaling to handle traffic spikes without over-provisioning. AWS Inferentia2 and GCP TPUs offer cost-optimized inference for specific model families. Combine with spot instances for batch workloads.",
      rationaleFr: "Les déploiements production bénéficient de l'auto-scaling GPU géré pour gérer les pics de trafic sans sur-provisionner. AWS Inferentia2 et GCP TPUs offrent une inférence optimisée en coût pour des familles de modèles spécifiques. Combiner avec des instances spot pour les charges batch.",
      maturity: "production",
      alternatives: ["EU sovereign cloud (Exoscale, Scaleway)", "Bare metal GPU (OVH, Hetzner)"],
      alternativesFr: ["Cloud souverain EU (Exoscale, Scaleway)", "GPU bare metal (OVH, Hetzner)"],
    };
  })();

  return [sttLayer, ttsLayer, llmLayer, memoryLayer, streamingLayer, infraLayer];
}

// ─── Question definitions ─────────────────────────────────────────────────────
interface Question<T extends string> {
  id: string;
  label: string;
  labelFr: string;
  subtitle: string;
  subtitleFr: string;
  icon: string;
  options: { value: T; label: string; labelFr: string; desc: string; descFr: string; icon: string }[];
}

const QUESTIONS = {
  phase: {
    id: "phase", icon: "🚀",
    label: "Where is your project right now?",
    labelFr: "Où en est votre projet actuellement ?",
    subtitle: "This determines the trade-off between iteration speed and architectural solidity.",
    subtitleFr: "Cela détermine l'arbitrage entre vitesse d'itération et solidité architecturale.",
    options: [
      { value: "validation" as Phase, icon: "🧪", label: "Validation / MVP", labelFr: "Validation / MVP", desc: "Testing hypotheses, first users, speed matters most", descFr: "Test d'hypothèses, premiers utilisateurs, la vitesse prime" },
      { value: "production" as Phase, icon: "⚙️", label: "Production deployment", labelFr: "Déploiement production", desc: "Real users, reliability and cost start to matter", descFr: "Vrais utilisateurs, fiabilité et coût commencent à compter" },
      { value: "scale" as Phase, icon: "📈", label: "Scaling / Growth", labelFr: "Mise à l'échelle / Croissance", desc: "High volume, architecture decisions become structural", descFr: "Volume élevé, les décisions d'architecture deviennent structurelles" },
    ],
  } as Question<Phase>,

  sovereignty: {
    id: "sovereignty", icon: "🔒",
    label: "What level of data sovereignty is required?",
    labelFr: "Quel niveau de souveraineté des données est requis ?",
    subtitle: "Consider GDPR, Swiss nLPD, HIPAA, or contractual obligations with your users.",
    subtitleFr: "Considérer le RGPD, le nLPD suisse, HIPAA ou les obligations contractuelles envers vos utilisateurs.",
    options: [
      { value: "low" as SovereigntyLevel, icon: "🌐", label: "Standard (US cloud OK)", labelFr: "Standard (cloud US acceptable)", desc: "No specific data residency constraints", descFr: "Pas de contraintes spécifiques de résidence des données" },
      { value: "medium" as SovereigntyLevel, icon: "🇪🇺", label: "EU/CH data residency", labelFr: "Résidence données EU/CH", desc: "GDPR or nLPD compliance required, EU/CH hosting preferred", descFr: "Conformité RGPD ou nLPD requise, hébergement EU/CH préféré" },
      { value: "high" as SovereigntyLevel, icon: "🏛️", label: "Full sovereignty / regulated", labelFr: "Souveraineté totale / réglementé", desc: "On-premise or air-gapped, no data leaves your infrastructure", descFr: "On-premise ou air-gapped, aucune donnée ne quitte votre infrastructure" },
    ],
  } as Question<SovereigntyLevel>,

  latency: {
    id: "latency", icon: "⚡",
    label: "What is your target end-to-end latency?",
    labelFr: "Quelle est votre latence end-to-end cible ?",
    subtitle: "From user speech end to first audio byte of the response.",
    subtitleFr: "De la fin de la parole utilisateur au premier octet audio de la réponse.",
    options: [
      { value: "relaxed" as LatencyTarget, icon: "🐢", label: "Relaxed (> 2s acceptable)", labelFr: "Détendu (> 2s acceptable)", desc: "Async or turn-based interaction, not real-time conversation", descFr: "Interaction asynchrone ou par tours, pas de conversation temps réel" },
      { value: "standard" as LatencyTarget, icon: "🚶", label: "Standard (500ms–2s)", labelFr: "Standard (500ms–2s)", desc: "Conversational feel, slight delay acceptable", descFr: "Sensation conversationnelle, léger délai acceptable" },
      { value: "realtime" as LatencyTarget, icon: "⚡", label: "Real-time (< 500ms)", labelFr: "Temps réel (< 500ms)", desc: "Phone-call quality, interruption handling required", descFr: "Qualité appel téléphonique, gestion des interruptions requise" },
    ],
  } as Question<LatencyTarget>,

  budget: {
    id: "budget", icon: "💰",
    label: "What is your infrastructure budget profile?",
    labelFr: "Quel est votre profil de budget infrastructure ?",
    subtitle: "This shapes the build vs. buy decision for each layer.",
    subtitleFr: "Cela façonne la décision build vs. buy pour chaque couche.",
    options: [
      { value: "bootstrap" as BudgetLevel, icon: "🌱", label: "Bootstrap (< €500/mo)", labelFr: "Bootstrap (< 500€/mois)", desc: "Minimize fixed costs, pay-per-use APIs preferred", descFr: "Minimiser les coûts fixes, APIs pay-per-use préférées" },
      { value: "startup" as BudgetLevel, icon: "🚀", label: "Startup (€500–5k/mo)", labelFr: "Startup (500–5k€/mois)", desc: "Can invest in some infrastructure, optimize hot paths", descFr: "Peut investir dans quelques infrastructures, optimiser les chemins chauds" },
      { value: "enterprise" as BudgetLevel, icon: "🏢", label: "Enterprise (> €5k/mo)", labelFr: "Entreprise (> 5k€/mois)", desc: "Infrastructure investment justified by volume or sovereignty", descFr: "Investissement infrastructure justifié par le volume ou la souveraineté" },
    ],
  } as Question<BudgetLevel>,

  useCase: {
    id: "useCase", icon: "🎯",
    label: "What is your primary use case?",
    labelFr: "Quel est votre cas d'usage principal ?",
    subtitle: "This influences the quality/expressiveness requirements of each layer.",
    subtitleFr: "Cela influence les exigences de qualité/expressivité de chaque couche.",
    options: [
      { value: "conversational" as UseCase, icon: "💬", label: "Conversational AI agent", labelFr: "Agent IA conversationnel", desc: "General-purpose dialogue, customer service, assistant", descFr: "Dialogue général, service client, assistant" },
      { value: "educational" as UseCase, icon: "📚", label: "Educational / coaching", labelFr: "Éducatif / coaching", desc: "Tutoring, training, personalized learning experiences", descFr: "Tutorat, formation, expériences d'apprentissage personnalisées" },
      { value: "corporate" as UseCase, icon: "🏢", label: "Corporate / internal tool", labelFr: "Outil corporate / interne", desc: "HR, onboarding, knowledge management, internal assistant", descFr: "RH, onboarding, gestion des connaissances, assistant interne" },
      { value: "regulated" as UseCase, icon: "⚕️", label: "Regulated sector (health, finance, legal)", labelFr: "Secteur réglementé (santé, finance, juridique)", desc: "Strict compliance, audit trail, data residency mandatory", descFr: "Conformité stricte, piste d'audit, résidence des données obligatoire" },
    ],
  } as Question<UseCase>,
};

const QUESTION_ORDER: (keyof typeof QUESTIONS)[] = ["phase", "sovereignty", "latency", "budget", "useCase"];

// ─── Maturity colors ──────────────────────────────────────────────────────────
const maturityColors = {
  production: { bg: "oklch(0.93 0.06 145)", text: "oklch(0.35 0.12 145)", label: "Production", labelFr: "Production" },
  emerging:   { bg: "oklch(0.93 0.08 50)",  text: "oklch(0.40 0.14 50)",  label: "Emerging",   labelFr: "Émergent" },
  research:   { bg: "oklch(0.93 0.06 280)", text: "oklch(0.40 0.14 280)", label: "Research",   labelFr: "Recherche" },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function StackDecisionSimulator() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  const [answers, setAnswers] = useState<SimulatorAnswers>({
    phase: null, sovereignty: null, latency: null, budget: null, useCase: null,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentQuestionKey = QUESTION_ORDER[currentStep];
  const currentQuestion = QUESTIONS[currentQuestionKey];
  const totalSteps = QUESTION_ORDER.length;
  const answeredCount = Object.values(answers).filter(Boolean).length;

  const handleAnswer = useCallback(<T extends string>(key: keyof SimulatorAnswers, value: T) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (currentStep < totalSteps - 1) {
      setTimeout(() => setCurrentStep((s) => s + 1), 200);
    } else {
      setTimeout(() => setShowResults(true), 200);
    }
  }, [currentStep, totalSteps]);

  const handleReset = useCallback(() => {
    setAnswers({ phase: null, sovereignty: null, latency: null, budget: null, useCase: null });
    setCurrentStep(0);
    setShowResults(false);
  }, []);

  const handleCopyLink = useCallback(() => {
    const params = new URLSearchParams();
    if (answers.phase) params.set("phase", answers.phase);
    if (answers.sovereignty) params.set("sov", answers.sovereignty);
    if (answers.latency) params.set("lat", answers.latency);
    if (answers.budget) params.set("bud", answers.budget);
    if (answers.useCase) params.set("uc", answers.useCase);
    const url = `${window.location.origin}/voice/stack?${params.toString()}#simulator`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [answers]);

  const recommendations = showResults ? computeRecommendations(answers) : [];

  // Profile label
  const profileLabel = (() => {
    if (!showResults) return null;
    const parts: string[] = [];
    if (answers.phase) parts.push(isFr
      ? { validation: "MVP", production: "Production", scale: "Mise à l'échelle" }[answers.phase]
      : { validation: "MVP", production: "Production", scale: "Scale" }[answers.phase]);
    if (answers.sovereignty === "high") parts.push(isFr ? "Souverain" : "Sovereign");
    if (answers.latency === "realtime") parts.push(isFr ? "Temps réel" : "Real-time");
    if (answers.useCase === "regulated") parts.push(isFr ? "Réglementé" : "Regulated");
    return parts.join(" · ");
  })();

  return (
    <div id="simulator" className="rounded-2xl border border-violet-200 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-violet-100 flex items-center justify-between gap-4"
        style={{ background: "oklch(0.97 0.02 280)" }}>
        <div className="flex items-center gap-3">
          <span className="text-xl">🧭</span>
          <div>
            <h3 className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Simulateur de Décision Stack" : "Stack Decision Simulator"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr
                ? "5 questions sur votre contexte → recommandation par couche"
                : "5 questions about your context → per-layer recommendation"}
            </p>
          </div>
        </div>
        {(showResults || answeredCount > 0) && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {isFr ? "Recommencer" : "Reset"}
          </button>
        )}
      </div>

      {/* Progress bar */}
      {!showResults && (
        <div className="px-6 pt-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-slate-400">{currentStep + 1} / {totalSteps}</span>
            <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${((currentStep) / totalSteps) * 100}%`, background: "oklch(0.55 0.20 280)" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Question step */}
      {!showResults && (
        <div className="px-6 py-6">
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{currentQuestion.icon}</span>
              <h4 className="text-base font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? currentQuestion.labelFr : currentQuestion.label}
              </h4>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {isFr ? currentQuestion.subtitleFr : currentQuestion.subtitle}
            </p>
          </div>

          <div className="space-y-2">
            {currentQuestion.options.map((opt) => {
              const isSelected = answers[currentQuestionKey as keyof SimulatorAnswers] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(currentQuestionKey as keyof SimulatorAnswers, opt.value)}
                  className={`w-full text-left rounded-xl border px-4 py-3.5 transition-all duration-150 flex items-start gap-3 ${
                    isSelected
                      ? "border-violet-400 bg-violet-50"
                      : "border-slate-200 bg-slate-50 hover:border-violet-300 hover:bg-violet-50/50"
                  }`}
                >
                  <span className="text-xl shrink-0 mt-0.5">{opt.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {isFr ? opt.labelFr : opt.label}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-violet-600 shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {isFr ? opt.descFr : opt.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Step navigation */}
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep((s) => s - 1)}
              className="mt-4 text-xs text-slate-400 hover:text-slate-700 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              ← {isFr ? "Question précédente" : "Previous question"}
            </button>
          )}
        </div>
      )}

      {/* Results */}
      {showResults && (
        <div className="px-6 py-6">
          {/* Profile summary */}
          <div className="mb-6 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-violet-700 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Profil détecté" : "Detected profile"}
              </p>
              <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {profileLabel || (isFr ? "Profil personnalisé" : "Custom profile")}
              </p>
            </div>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors"
              style={copied
                ? { background: "oklch(0.93 0.06 145)", borderColor: "oklch(0.70 0.12 145)", color: "oklch(0.35 0.12 145)", fontFamily: "'Space Grotesk', sans-serif" }
                : { background: "white", borderColor: "oklch(0.80 0.10 280)", color: "oklch(0.45 0.15 280)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? (isFr ? "Copié !" : "Copied!") : (isFr ? "Partager" : "Share")}
            </button>
          </div>

          {/* Layer recommendations */}
          <div className="space-y-3">
            {recommendations.map((rec) => {
              const mc = maturityColors[rec.maturity];
              return (
                <div key={rec.layer} className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
                  {/* Layer header */}
                  <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-100 bg-white">
                    <span className="text-lg shrink-0">{rec.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {isFr ? rec.layerFr : rec.layer}
                        </span>
                        <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: mc.bg, color: mc.text }}>
                          {isFr ? mc.labelFr : mc.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {isFr ? rec.optionFr : rec.option}
                        </span>
                        {rec.link && (
                          <InternalLink to={rec.link} className="text-violet-500 hover:text-violet-700 transition-colors shrink-0">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </InternalLink>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Rationale + alternatives */}
                  <div className="px-4 py-3">
                    <p className="text-xs text-slate-600 leading-relaxed mb-2" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {isFr ? rec.rationaleFr : rec.rationale}
                    </p>
                    <div className="flex items-start gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-slate-400 shrink-0 mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {isFr ? "Alternatives :" : "Alternatives:"}
                      </span>
                      {(isFr ? rec.alternativesFr : rec.alternatives).map((alt) => (
                        <span key={alt} className="text-xs px-2 py-0.5 rounded-full border border-slate-200 text-slate-500 bg-white" style={{ fontFamily: "'Source Serif 4', serif" }}>
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA to scoring tool */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <InternalLink
              to="/voice/scoring"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              ★ {isFr ? "Affiner avec l'outil de scoring" : "Refine with scoring tool"}
              <ChevronRight className="w-4 h-4" />
            </InternalLink>
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <RotateCcw className="w-4 h-4" />
              {isFr ? "Modifier les réponses" : "Change answers"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
