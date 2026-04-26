/**
 * VoiceStack.tsx — DigiDouble Research Portal
 * Page: Voice Stack — Cadre de décision par couche (sans recommandations arrêtées)
 * Design: Technical Blueprint — questions stratégiques, enjeux, critères de choix
 * i18n: EN / FR via LangContext
 */
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import SectionHeader from "@/components/SectionHeader";
import StackDecisionSimulator from "@/components/StackDecisionSimulator";
import { ChevronDown, ChevronUp, Home, ChevronRight } from "lucide-react";

interface LayerDecision {
  layer: string;
  layerFr: string;
  icon: string;
  stakes: string;
  stakesFr: string;
  questions: string[];
  questionsFr: string[];
  options: { label: string; pros: string; prosFr: string; cons: string; consFr: string; maturity: "production" | "emerging" | "research" }[];
  tests: string[];
  testsFr: string[];
}

const LAYERS: LayerDecision[] = [
  {
    layer: "ASR / STT",
    layerFr: "ASR / STT",
    icon: "🎙️",
    stakes: "The STT layer is the entry point of the pipeline. Transcription errors propagate and amplify through LLM and TTS. A 5% WER difference can make or break a conversational experience.",
    stakesFr: "La couche STT est le point d'entrée du pipeline. Les erreurs de transcription se propagent et s'amplifient dans le LLM et le TTS. Une différence de 5% de WER peut faire ou défaire une expérience conversationnelle.",
    questions: [
      "What languages and accents must be supported from day one? (Swiss German, regional French, technical vocabulary?)",
      "Is real-time streaming required, or is batch transcription sufficient for the use case?",
      "What is the acceptable WER threshold for the target domain — general conversation vs. specialized vocabulary?",
      "What are the data residency constraints? Can audio be sent to a US cloud provider?",
      "What is the expected audio volume per month, and how does the pricing model scale?",
      "Is speaker diarization or identification needed (multi-speaker scenarios)?",
    ],
    questionsFr: [
      "Quelles langues et accents doivent être supportés dès le premier jour ? (Suisse-allemand, français régional, vocabulaire technique ?)",
      "Le streaming temps réel est-il requis, ou la transcription par lot est-elle suffisante pour le cas d'usage ?",
      "Quel est le seuil de WER acceptable pour le domaine cible — conversation générale vs vocabulaire spécialisé ?",
      "Quelles sont les contraintes de résidence des données ? L'audio peut-il être envoyé à un fournisseur cloud US ?",
      "Quel est le volume audio mensuel attendu, et comment le modèle de prix évolue-t-il à l'échelle ?",
      "La diarisation ou l'identification du locuteur est-elle nécessaire (scénarios multi-locuteurs) ?",
    ],
    options: [
      { label: "Cloud API (Deepgram, AssemblyAI, Azure)", pros: "Fast integration, managed infrastructure, continuous model updates", prosFr: "Intégration rapide, infrastructure gérée, mises à jour continues", cons: "Data leaves your infrastructure, pricing scales with volume, vendor lock-in risk", consFr: "Données hors infrastructure, prix croissant avec le volume, risque de lock-in", maturity: "production" },
      { label: "Self-hosted Whisper variants", pros: "Full data sovereignty, predictable cost at scale, fine-tunable on domain vocabulary", prosFr: "Souveraineté totale, coût prévisible à l'échelle, fine-tunable sur vocabulaire métier", cons: "GPU infrastructure required, operational complexity, latency depends on hardware", consFr: "Infrastructure GPU requise, complexité opérationnelle, latence dépend du hardware", maturity: "production" },
      { label: "Specialized/fine-tuned models (Audiogami, Voxtral)", pros: "Domain-specific accuracy, potential Swiss/EU hosting, HITL workflows", prosFr: "Précision domaine-spécifique, hébergement potentiel CH/EU, workflows HITL", cons: "Smaller ecosystem, less community support, vendor concentration risk", consFr: "Écosystème plus restreint, moins de support communautaire, risque de concentration fournisseur", maturity: "emerging" },
    ],
    tests: [
      "Benchmark WER on a representative sample of your actual audio (not generic datasets)",
      "Measure real latency from audio-end to first token in your target infrastructure",
      "Test edge cases: background noise, accents, domain vocabulary, code-switching",
      "Evaluate streaming chunk size vs. latency trade-off for your UX requirements",
    ],
    testsFr: [
      "Benchmarker le WER sur un échantillon représentatif de vos audios réels (pas des datasets génériques)",
      "Mesurer la latence réelle de fin d'audio au premier token dans votre infrastructure cible",
      "Tester les cas limites : bruit de fond, accents, vocabulaire métier, code-switching",
      "Évaluer le compromis taille de chunk streaming / latence pour vos exigences UX",
    ],
  },
  {
    layer: "TTS / Voice Synthesis",
    layerFr: "TTS / Synthèse Vocale",
    icon: "🔊",
    stakes: "TTS is the most perceptible layer for end users. Voice quality, naturalness, and emotional expressiveness directly shape trust and engagement. Voice cloning raises both technical and ethical questions that must be addressed before production.",
    stakesFr: "Le TTS est la couche la plus perceptible pour les utilisateurs finaux. La qualité vocale, la naturalité et l'expressivité émotionnelle façonnent directement la confiance et l'engagement. Le clonage vocal soulève des questions techniques et éthiques qui doivent être adressées avant la production.",
    questions: [
      "Is voice cloning from a reference speaker required, or is a high-quality generic voice sufficient?",
      "What is the target TTFA (Time To First Audio)? Below 200ms requires streaming-capable TTS.",
      "What emotional range is needed — neutral information delivery vs. expressive conversational agent?",
      "What languages must be supported, and is prosody quality consistent across all of them?",
      "What are the consent and legal frameworks for voice cloning in your jurisdiction?",
      "Can the TTS layer be swapped without redesigning the pipeline (abstraction layer)?",
    ],
    questionsFr: [
      "Le clonage vocal à partir d'un locuteur de référence est-il requis, ou une voix générique de haute qualité suffit-elle ?",
      "Quel est le TTFA cible (Time To First Audio) ? En dessous de 200ms, un TTS capable de streaming est requis.",
      "Quelle gamme émotionnelle est nécessaire — livraison d'information neutre vs agent conversationnel expressif ?",
      "Quelles langues doivent être supportées, et la qualité de la prosodie est-elle cohérente dans toutes ?",
      "Quels sont les cadres de consentement et légaux pour le clonage vocal dans votre juridiction ?",
      "La couche TTS peut-elle être remplacée sans reconcevoir le pipeline (couche d'abstraction) ?",
    ],
    options: [
      { label: "Cloud TTS APIs (ElevenLabs, Cartesia, PlayHT)", pros: "State-of-the-art quality, voice cloning, fast iteration, no GPU required", prosFr: "Qualité état de l'art, clonage vocal, itération rapide, pas de GPU requis", cons: "Data sovereignty concerns, pricing at scale, API dependency, potential censorship", consFr: "Enjeux de souveraineté, prix à l'échelle, dépendance API, censure potentielle", maturity: "production" },
      { label: "Self-hosted open-source (Kokoro, Chatterbox, XTTS-v2)", pros: "Full control, no per-character cost, customizable prosody, sovereignty", prosFr: "Contrôle total, pas de coût par caractère, prosodie personnalisable, souveraineté", cons: "GPU required, quality gap vs. commercial for some languages, operational burden", consFr: "GPU requis, écart qualité vs commercial pour certaines langues, charge opérationnelle", maturity: "emerging" },
      { label: "End-to-end Voice-to-Voice (Ultravox, Moshi, Sesame)", pros: "Ultra-low latency (~100ms), natural turn-taking, no TTS/STT separation", prosFr: "Latence ultra-faible (~100ms), tours de parole naturels, pas de séparation TTS/STT", cons: "No voice cloning, less controllable output, harder to integrate with existing pipelines", consFr: "Pas de clonage vocal, sortie moins contrôlable, plus difficile à intégrer avec les pipelines existants", maturity: "emerging" },
    ],
    tests: [
      "A/B test voice quality with real target users — not just internal team evaluation",
      "Measure TTFA under realistic load conditions (concurrent requests, network latency)",
      "Test voice cloning with minimum viable reference audio (3s, 10s, 30s samples)",
      "Evaluate emotional expressiveness with your actual script samples, not demo content",
      "Stress-test streaming chunk delivery for lip-sync compatibility if avatar is used",
    ],
    testsFr: [
      "A/B tester la qualité vocale avec de vrais utilisateurs cibles — pas seulement l'équipe interne",
      "Mesurer le TTFA dans des conditions de charge réalistes (requêtes concurrentes, latence réseau)",
      "Tester le clonage vocal avec un audio de référence minimal viable (3s, 10s, 30s)",
      "Évaluer l'expressivité émotionnelle avec vos vrais scripts, pas le contenu de démo",
      "Stress-tester la livraison de chunks streaming pour la compatibilité lip-sync si un avatar est utilisé",
    ],
  },
  {
    layer: "LLM Orchestration",
    layerFr: "Orchestration LLM",
    icon: "🧠",
    stakes: "The LLM is the intelligence layer. Its latency (TTFT) is often the dominant factor in end-to-end pipeline latency. The choice between a large frontier model and a small specialized model involves trade-offs between capability, cost, latency, and sovereignty.",
    stakesFr: "Le LLM est la couche d'intelligence. Sa latence (TTFT) est souvent le facteur dominant dans la latence end-to-end du pipeline. Le choix entre un grand modèle frontier et un petit modèle spécialisé implique des compromis entre capacité, coût, latence et souveraineté.",
    questions: [
      "What is the acceptable TTFT (Time To First Token) for your conversational UX?",
      "Does the use case require long-context reasoning, or is a 4K context window sufficient?",
      "Can a smaller, fine-tuned model (SLM) match the quality of a frontier model for your specific domain?",
      "What persona consistency and behavioral constraints are required across long conversations?",
      "How is the system prompt structured to maintain persona without token bloat?",
      "What is the fallback strategy if the primary LLM provider has an outage?",
    ],
    questionsFr: [
      "Quel est le TTFT acceptable pour votre UX conversationnelle ?",
      "Le cas d'usage nécessite-t-il un raisonnement long contexte, ou une fenêtre de 4K tokens est-elle suffisante ?",
      "Un modèle plus petit et fine-tuné (SLM) peut-il égaler la qualité d'un modèle frontier pour votre domaine spécifique ?",
      "Quelle cohérence de persona et quelles contraintes comportementales sont requises sur de longues conversations ?",
      "Comment le system prompt est-il structuré pour maintenir la persona sans gonflement de tokens ?",
      "Quelle est la stratégie de fallback si le fournisseur LLM principal a une panne ?",
    ],
    options: [
      { label: "Frontier cloud models (GPT-4o, Claude 3.5, Gemini)", pros: "Best reasoning, large context, fast iteration, no infrastructure", prosFr: "Meilleur raisonnement, grand contexte, itération rapide, pas d'infrastructure", cons: "Highest cost at scale, data sovereignty, TTFT variable under load", consFr: "Coût le plus élevé à l'échelle, souveraineté des données, TTFT variable sous charge", maturity: "production" },
      { label: "Mid-size models (Mistral, Llama 3.1 70B, Qwen)", pros: "Good quality/cost ratio, EU-hosted options available, open weights", prosFr: "Bon rapport qualité/coût, options hébergées en UE disponibles, poids ouverts", cons: "Requires more prompt engineering, some capability gaps vs. frontier", consFr: "Nécessite plus de prompt engineering, quelques lacunes de capacité vs frontier", maturity: "production" },
      { label: "Small fine-tuned models (Llama 3.1 8B, Phi-3, Gemma)", pros: "Self-hostable, predictable cost, low latency, full sovereignty", prosFr: "Auto-hébergeable, coût prévisible, faible latence, souveraineté totale", cons: "Requires fine-tuning investment, limited complex reasoning, narrow domain", consFr: "Nécessite un investissement en fine-tuning, raisonnement complexe limité, domaine étroit", maturity: "emerging" },
    ],
    tests: [
      "Measure TTFT and token throughput under concurrent load in your target infrastructure",
      "Evaluate persona consistency over 20+ turn conversations with adversarial prompts",
      "Compare SLM fine-tuned on your domain vs. frontier model on your actual test cases",
      "Benchmark cost per conversation at projected scale (1k, 10k, 100k daily conversations)",
    ],
    testsFr: [
      "Mesurer le TTFT et le débit de tokens sous charge concurrente dans votre infrastructure cible",
      "Évaluer la cohérence de persona sur des conversations de 20+ tours avec des prompts adversariaux",
      "Comparer SLM fine-tuné sur votre domaine vs modèle frontier sur vos vrais cas de test",
      "Benchmarker le coût par conversation à l'échelle projetée (1k, 10k, 100k conversations/jour)",
    ],
  },
  {
    layer: "Memory / RAG",
    layerFr: "Mémoire / RAG",
    icon: "🗄️",
    stakes: "Memory architecture determines whether the avatar feels like it 'knows' the user over time. Without structured memory, every conversation starts from scratch. With poorly designed memory, context retrieval adds latency and can surface irrelevant or contradictory information.",
    stakesFr: "L'architecture mémoire détermine si l'avatar donne l'impression de 'connaître' l'utilisateur dans le temps. Sans mémoire structurée, chaque conversation repart de zéro. Avec une mémoire mal conçue, la récupération de contexte ajoute de la latence et peut remonter des informations non pertinentes ou contradictoires.",
    questions: [
      "What is the granularity of memory needed — session only, episodic facts, long-term persona?",
      "How is memory retrieval latency budgeted within the overall pipeline latency target?",
      "What is the strategy for memory conflicts (user says contradictory things across sessions)?",
      "How is sensitive personal data in memory handled from a GDPR/nLPD perspective?",
      "Is a vector database needed, or is a structured relational approach sufficient for the use case?",
      "What is the memory update strategy — real-time during conversation, or post-session batch?",
    ],
    questionsFr: [
      "Quelle est la granularité de mémoire nécessaire — session uniquement, faits épisodiques, persona long terme ?",
      "Comment la latence de récupération mémoire est-elle budgétée dans la latence totale du pipeline ?",
      "Quelle est la stratégie pour les conflits mémoire (l'utilisateur dit des choses contradictoires entre sessions) ?",
      "Comment les données personnelles sensibles en mémoire sont-elles gérées du point de vue RGPD/nLPD ?",
      "Une base de données vectorielle est-elle nécessaire, ou une approche relationnelle structurée suffit-elle ?",
      "Quelle est la stratégie de mise à jour mémoire — temps réel pendant la conversation, ou batch post-session ?",
    ],
    options: [
      { label: "Managed vector DBs (Pinecone, Weaviate Cloud)", pros: "Fast setup, managed infrastructure, good SDKs", prosFr: "Mise en place rapide, infrastructure gérée, bons SDKs", cons: "Data sovereignty, cost at scale, vendor lock-in", consFr: "Souveraineté des données, coût à l'échelle, lock-in fournisseur", maturity: "production" },
      { label: "Self-hosted (pgvector, Qdrant, Chroma)", pros: "Full sovereignty, predictable cost, integrates with existing DB", prosFr: "Souveraineté totale, coût prévisible, s'intègre avec la DB existante", cons: "Operational complexity, requires tuning for performance at scale", consFr: "Complexité opérationnelle, nécessite un tuning pour la performance à l'échelle", maturity: "production" },
      { label: "Memory frameworks (Mem0, Zep, LangMem)", pros: "Structured memory layers, automatic extraction, reduced token usage", prosFr: "Couches mémoire structurées, extraction automatique, réduction de l'usage de tokens", cons: "Adds dependency, extraction quality varies, newer ecosystem", consFr: "Ajoute une dépendance, qualité d'extraction variable, écosystème plus récent", maturity: "emerging" },
    ],
    tests: [
      "Measure retrieval latency at 10k, 100k, 1M stored memories",
      "Test memory relevance quality: does the right context surface for ambiguous queries?",
      "Evaluate memory conflict resolution with contradictory user statements across sessions",
      "Benchmark token savings from structured memory vs. full conversation history in context",
    ],
    testsFr: [
      "Mesurer la latence de récupération à 10k, 100k, 1M mémoires stockées",
      "Tester la qualité de pertinence mémoire : le bon contexte remonte-t-il pour des requêtes ambiguës ?",
      "Évaluer la résolution de conflits mémoire avec des déclarations contradictoires de l'utilisateur entre sessions",
      "Benchmarker les économies de tokens de la mémoire structurée vs l'historique complet de conversation en contexte",
    ],
  },
  {
    layer: "Streaming / Transport",
    layerFr: "Streaming / Transport",
    icon: "📡",
    stakes: "The transport layer determines the perceived responsiveness of the system. Buffering, jitter, and synchronization issues between audio and video streams are often the root cause of 'uncanny valley' effects in real-time avatar experiences.",
    stakesFr: "La couche transport détermine la réactivité perçue du système. Les problèmes de buffering, de gigue et de synchronisation entre flux audio et vidéo sont souvent la cause principale des effets de 'vallée de l'étrange' dans les expériences d'avatars temps réel.",
    questions: [
      "Is real-time bidirectional streaming required, or is a request-response model sufficient?",
      "What is the maximum acceptable end-to-end latency for your target use case and user population?",
      "How are audio and video streams synchronized — what is the acceptable lip-sync tolerance?",
      "What is the network quality of the target deployment environment (enterprise LAN vs. mobile)?",
      "How is the system designed to degrade gracefully under poor network conditions?",
      "What are the scaling requirements — concurrent sessions, geographic distribution?",
    ],
    questionsFr: [
      "Le streaming bidirectionnel temps réel est-il requis, ou un modèle requête-réponse est-il suffisant ?",
      "Quelle est la latence end-to-end maximale acceptable pour votre cas d'usage et votre population cible ?",
      "Comment les flux audio et vidéo sont-ils synchronisés — quelle est la tolérance acceptable de lip-sync ?",
      "Quelle est la qualité réseau de l'environnement de déploiement cible (LAN entreprise vs mobile) ?",
      "Comment le système est-il conçu pour dégrader gracieusement dans de mauvaises conditions réseau ?",
      "Quelles sont les exigences de mise à l'échelle — sessions concurrentes, distribution géographique ?",
    ],
    options: [
      { label: "WebRTC (LiveKit, Daily, Agora)", pros: "Industry standard for real-time, sub-100ms, browser-native, adaptive bitrate", prosFr: "Standard industrie pour le temps réel, <100ms, natif navigateur, débit adaptatif", cons: "Complex infrastructure (SFU/MCU), NAT traversal challenges, operational expertise needed", consFr: "Infrastructure complexe (SFU/MCU), défis NAT traversal, expertise opérationnelle requise", maturity: "production" },
      { label: "WebSocket + chunked streaming", pros: "Simpler architecture, works for audio-only or low-frequency video updates", prosFr: "Architecture plus simple, fonctionne pour audio seul ou mises à jour vidéo peu fréquentes", cons: "Higher latency than WebRTC, no adaptive bitrate, less suited for real-time video", consFr: "Latence plus élevée que WebRTC, pas de débit adaptatif, moins adapté pour la vidéo temps réel", maturity: "production" },
      { label: "HLS / DASH (pre-rendered segments)", pros: "Excellent quality, CDN-scalable, no real-time infrastructure", prosFr: "Excellente qualité, scalable via CDN, pas d'infrastructure temps réel", cons: "Not truly interactive, 5–30s latency, unsuitable for conversational use cases", consFr: "Pas vraiment interactif, latence 5–30s, inadapté aux cas d'usage conversationnels", maturity: "production" },
    ],
    tests: [
      "Measure end-to-end latency from user speech end to first avatar audio/video frame",
      "Test lip-sync quality under varying network conditions (100ms, 200ms, 500ms RTT)",
      "Load test with target concurrent session count in your deployment environment",
      "Evaluate graceful degradation: what happens at 50% packet loss?",
    ],
    testsFr: [
      "Mesurer la latence end-to-end de la fin de parole utilisateur au premier frame audio/vidéo avatar",
      "Tester la qualité du lip-sync dans des conditions réseau variables (100ms, 200ms, 500ms RTT)",
      "Test de charge avec le nombre de sessions concurrentes cibles dans votre environnement de déploiement",
      "Évaluer la dégradation gracieuse : que se passe-t-il à 50% de perte de paquets ?",
    ],
  },
  {
    layer: "GPU Infrastructure",
    layerFr: "Infrastructure GPU",
    icon: "⚙️",
    stakes: "Infrastructure choices have long-term cost and sovereignty implications. A decision made for MVP convenience (cloud API) may become a strategic liability at scale. Conversely, premature self-hosting can drain engineering resources before product-market fit is validated.",
    stakesFr: "Les choix d'infrastructure ont des implications à long terme sur le coût et la souveraineté. Une décision prise par commodité pour le MVP (API cloud) peut devenir un passif stratégique à l'échelle. Inversement, un auto-hébergement prématuré peut drainer les ressources d'ingénierie avant que le product-market fit soit validé.",
    questions: [
      "At what monthly GPU cost does self-hosting become cheaper than cloud APIs for your workload?",
      "What are the data residency requirements — does audio/video data need to stay in a specific country?",
      "What is the team's operational capacity to manage GPU infrastructure (DevOps, MLOps)?",
      "Is spot/preemptible GPU pricing viable for your workload, or is guaranteed availability required?",
      "What is the GPU memory requirement for the full model stack (STT + LLM + TTS + Avatar)?",
      "How does the infrastructure strategy evolve from MVP to production to scale?",
    ],
    questionsFr: [
      "À quel coût GPU mensuel l'auto-hébergement devient-il moins cher que les APIs cloud pour votre charge de travail ?",
      "Quelles sont les exigences de résidence des données — les données audio/vidéo doivent-elles rester dans un pays spécifique ?",
      "Quelle est la capacité opérationnelle de l'équipe pour gérer l'infrastructure GPU (DevOps, MLOps) ?",
      "Le prix spot/préemptif des GPU est-il viable pour votre charge de travail, ou une disponibilité garantie est-elle requise ?",
      "Quelle est la mémoire GPU requise pour la pile de modèles complète (STT + LLM + TTS + Avatar) ?",
      "Comment la stratégie d'infrastructure évolue-t-elle du MVP à la production puis à l'échelle ?",
    ],
    options: [
      { label: "Major cloud providers (AWS, GCP, Azure)", pros: "Global availability, managed services, fast scaling, mature tooling", prosFr: "Disponibilité mondiale, services gérés, mise à l'échelle rapide, outillage mature", cons: "US jurisdiction by default, highest cost at sustained load, data sovereignty risk", consFr: "Juridiction US par défaut, coût le plus élevé en charge soutenue, risque souveraineté", maturity: "production" },
      { label: "EU/CH cloud providers (Exoscale, OVH, Scaleway, Infomaniak)", pros: "GDPR/nLPD compliance, EU jurisdiction, competitive pricing for sustained workloads", prosFr: "Conformité RGPD/nLPD, juridiction UE, prix compétitif pour charges soutenues", cons: "Smaller GPU fleet, fewer managed ML services, less global coverage", consFr: "Parc GPU plus restreint, moins de services ML gérés, couverture mondiale moindre", maturity: "production" },
      { label: "On-premise / colocation", pros: "Maximum sovereignty, predictable cost at high utilization, no egress fees", prosFr: "Souveraineté maximale, coût prévisible à haute utilisation, pas de frais d'egress", cons: "High CapEx, long procurement cycles, requires dedicated ops team", consFr: "CapEx élevé, longs cycles d'approvisionnement, nécessite une équipe ops dédiée", maturity: "production" },
    ],
    tests: [
      "Model total cost of ownership (TCO) at 3 usage levels: MVP, 10k users/day, 100k users/day",
      "Benchmark inference throughput for your full model stack on candidate GPU types (A10, A100, H100)",
      "Test cold-start latency for model loading — relevant for spot instances and auto-scaling",
      "Evaluate data transfer costs between compute and storage in your target region",
    ],
    testsFr: [
      "Modéliser le coût total de possession (TCO) à 3 niveaux d'usage : MVP, 10k utilisateurs/jour, 100k utilisateurs/jour",
      "Benchmarker le débit d'inférence pour votre pile de modèles complète sur les types de GPU candidats (A10, A100, H100)",
      "Tester la latence de démarrage à froid pour le chargement des modèles — pertinent pour les instances spot et l'auto-scaling",
      "Évaluer les coûts de transfert de données entre calcul et stockage dans votre région cible",
    ],
  },
];

export default function VoiceStack() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);

  const maturityColors = {
    production: { bg: "oklch(0.95 0.05 145)", text: "oklch(0.40 0.18 145)", label: "Production-ready", labelFr: "Prêt pour production" },
    emerging: { bg: "oklch(0.95 0.08 50)", text: "oklch(0.50 0.18 50)", label: "Emerging", labelFr: "Émergent" },
    research: { bg: "oklch(0.95 0.06 280)", text: "oklch(0.45 0.18 280)", label: "Research", labelFr: "Recherche" },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100 sticky top-14 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-1 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <InternalLink to="/" className="text-slate-400 hover:text-slate-700 transition-colors" aria-label={isFr ? "Accueil" : "Home"}><Home size={12} /></InternalLink>
          <ChevronRight size={11} className="text-slate-300" />
          <InternalLink to="/voice/tts" className="text-slate-500 hover:text-slate-800 transition-colors">Voice Pipeline</InternalLink>
          <ChevronRight size={11} className="text-slate-300" />
          <span className="font-semibold" style={{ color: "oklch(0.45 0.15 200)" }}>{isFr ? "Cadre de Décision" : "Decision Framework"}</span>
          <div className="ml-auto flex gap-2">
            <InternalLink to="/voice/benchmarks" className="text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors">← Benchmarks</InternalLink>
            <InternalLink to="/voice/pipeline" className="text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors">→ V2V</InternalLink>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader
          number="H"
          title={isFr ? "Cadre de Décision par Couche" : "Layer Decision Framework"}
          subtitle={isFr
            ? "Pour chaque couche du pipeline vocal, les enjeux, les questions à se poser, les options disponibles et les tests à conduire avant de choisir."
            : "For each layer of the voice pipeline: the stakes, the questions to ask, the available options, and the tests to run before deciding."}
          accent="cyan"
        />

        {/* Framing note */}
        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? <>Ce cadre ne prescrit pas de choix technologiques. Il structure la <strong>réflexion</strong> nécessaire avant de s'engager sur une architecture. Les mêmes enjeux techniques (latence, souveraineté, coût) se posent différemment selon le contexte : un MVP de validation, un déploiement réglementé, ou une mise à l'échelle commerciale appellent des réponses distinctes. L'objectif est de poser les bonnes questions au bon moment — et de conduire les tests qui permettront de répondre par les faits.</>
              : <>This framework does not prescribe technology choices. It structures the <strong>thinking</strong> required before committing to an architecture. The same technical trade-offs (latency, sovereignty, cost) present differently depending on context: a validation MVP, a regulated deployment, or a commercial scale-up each call for distinct answers. The goal is to ask the right questions at the right time — and to run the tests that will let facts answer them.</>
            }
          </p>
        </div>

        {/* Decision Simulator */}
        <div className="mb-8">
          <StackDecisionSimulator />
        </div>

        {/* Layers */}
        <div className="space-y-4">
          {LAYERS.map((layer) => {
            const isOpen = expandedLayer === layer.layer;
            return (
              <div
                key={layer.layer}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Layer header — always visible */}
                <button
                  className="w-full px-6 py-5 flex items-start gap-4 text-left hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedLayer(isOpen ? null : layer.layer)}
                >
                  <span className="text-2xl shrink-0 mt-0.5">{layer.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {isFr ? layer.layerFr : layer.layer}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed line-clamp-2" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {isFr ? layer.stakesFr : layer.stakes}
                    </p>
                  </div>
                  <div className="shrink-0 mt-1">
                    {isOpen
                      ? <ChevronUp className="w-5 h-5 text-slate-400" />
                      : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="border-t border-slate-100 px-6 py-6 space-y-8">

                    {/* Stakes */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {isFr ? "Enjeux" : "Stakes"}
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                        {isFr ? layer.stakesFr : layer.stakes}
                      </p>
                    </div>

                    {/* Questions */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {isFr ? "Questions à se poser" : "Questions to ask"}
                      </h4>
                      <div className="space-y-2">
                        {(isFr ? layer.questionsFr : layer.questions).map((q, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="text-xs font-mono text-slate-300 mt-0.5 shrink-0 w-4">{i + 1}.</span>
                            <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{q}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Options */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {isFr ? "Options disponibles" : "Available options"}
                      </h4>
                      <div className="space-y-3">
                        {layer.options.map((opt) => {
                          const mc = maturityColors[opt.maturity];
                          return (
                            <div key={opt.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <span className="text-sm font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                  {opt.label}
                                </span>
                                <span className="text-xs font-mono px-2 py-0.5 rounded shrink-0" style={{ background: mc.bg, color: mc.text }}>
                                  {isFr ? mc.labelFr : mc.label}
                                </span>
                              </div>
                              <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                  <span className="text-xs font-semibold text-green-700 block mb-1">+ {isFr ? "Avantages" : "Pros"}</span>
                                  <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                                    {isFr ? opt.prosFr : opt.pros}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-xs font-semibold text-red-700 block mb-1">− {isFr ? "Limites" : "Cons"}</span>
                                  <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                                    {isFr ? opt.consFr : opt.cons}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tests */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {isFr ? "Tests à conduire avant de décider" : "Tests to run before deciding"}
                      </h4>
                      <div className="space-y-2">
                        {(isFr ? layer.testsFr : layer.tests).map((test, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="text-cyan-500 mt-0.5 shrink-0">▸</span>
                            <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{test}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Closing note on decision timing */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-900 overflow-hidden shadow-sm">
          <div className="px-6 py-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Sur le moment de décider" : "On the timing of decisions"}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  phase: isFr ? "Phase de validation" : "Validation phase",
                  desc: isFr ? "Privilégier la vitesse d'itération sur la souveraineté. Les APIs cloud permettent de valider les hypothèses produit sans infrastructure. Accepter la dette technique de la dépendance fournisseur." : "Prioritize iteration speed over sovereignty. Cloud APIs allow validating product hypotheses without infrastructure. Accept the technical debt of vendor dependency.",
                  color: "oklch(0.72 0.18 50)",
                },
                {
                  phase: isFr ? "Phase de production" : "Production phase",
                  desc: isFr ? "Arbitrer entre coût, souveraineté et complexité opérationnelle. C'est le moment de décider quelles couches méritent d'être internalisées, en fonction des données réelles de la phase de validation." : "Trade off between cost, sovereignty, and operational complexity. This is when to decide which layers deserve to be internalized, based on real data from the validation phase.",
                  color: "oklch(0.72 0.18 200)",
                },
                {
                  phase: isFr ? "Phase de mise à l'échelle" : "Scale phase",
                  desc: isFr ? "Les décisions d'architecture prises en phase de validation deviennent des contraintes structurelles. La migration d'une couche à l'échelle coûte 5 à 10× plus cher qu'une décision initiale bien posée." : "Architecture decisions made in the validation phase become structural constraints. Migrating a layer at scale costs 5–10× more than a well-considered initial decision.",
                  color: "oklch(0.72 0.18 280)",
                },
              ].map((item) => (
                <div key={item.phase}>
                  <div className="text-xs font-bold mb-2" style={{ color: item.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {item.phase}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Link to scoring tool */}
        <div className="mt-6 flex items-center justify-center">
          <InternalLink
            to="/voice/scoring"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100 transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ★ {isFr ? "Utiliser l'outil de scoring personnalisé pour pondérer vos critères" : "Use the custom scoring tool to weight your criteria"}
          </InternalLink>
        </div>

      </div>
    </div>
  );
}
