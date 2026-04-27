/*
 * Glossary.tsx — DigiDouble Research Portal
 * Page: Technical Glossary — all terms used across the portal
 * Design: Technical Blueprint, alphabetical accordion sections
 * i18n: EN / FR via LangContext
 */
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import { Home, ChevronRight, ChevronDown, ChevronUp, Search } from "lucide-react";

interface GlossaryTerm {
  term: string;
  termFr?: string;
  category: "voice" | "avatar" | "infra" | "business" | "metrics";
  definition: string;
  definitionFr: string;
  relatedTerms?: string[];
  seeAlso?: { label: string; labelFr: string; href: string };
}

const TERMS: GlossaryTerm[] = [
  // ── VOICE / AUDIO ──────────────────────────────────────────────────────────
  {
    term: "ASR",
    termFr: "ASR",
    category: "voice",
    definition: "Automatic Speech Recognition — the technology that converts spoken audio into text. Also called STT (Speech-to-Text). Modern ASR systems use deep learning models (Transformers, SSMs) trained on large multilingual corpora.",
    definitionFr: "Automatic Speech Recognition — technologie qui convertit la parole en texte. Aussi appelé STT (Speech-to-Text). Les systèmes ASR modernes utilisent des modèles de deep learning (Transformers, SSM) entraînés sur de grands corpus multilingues.",
    relatedTerms: ["STT", "WER", "Diarization"],
  },
  {
    term: "Diarization",
    termFr: "Diarisation",
    category: "voice",
    definition: "Speaker diarization is the process of partitioning an audio stream into segments according to the speaker identity — answering the question 'who spoke when'. Essential for multi-speaker transcription (meetings, interviews, call centers).",
    definitionFr: "La diarisation est le processus de segmentation d'un flux audio selon l'identité du locuteur — répondant à la question 'qui a parlé quand'. Essentielle pour la transcription multi-locuteurs (réunions, interviews, centres d'appels).",
    relatedTerms: ["STT", "ASR"],
  },
  {
    term: "ELO Score",
    termFr: "Score ELO",
    category: "metrics",
    definition: "A comparative ranking system borrowed from chess, used in TTS benchmarks to measure perceived audio quality. Models are compared in pairwise blind tests; winners gain ELO points. A higher ELO indicates consistently preferred voice quality. The TTS Arena (Hugging Face) is the main public ELO leaderboard for speech synthesis.",
    definitionFr: "Système de classement comparatif emprunté aux échecs, utilisé dans les benchmarks TTS pour mesurer la qualité audio perçue. Les modèles sont comparés en tests à l'aveugle par paires ; les gagnants gagnent des points ELO. Un ELO plus élevé indique une qualité vocale préférée de manière constante. Le TTS Arena (Hugging Face) est le principal classement ELO public pour la synthèse vocale.",
    relatedTerms: ["TTS", "TTFA", "MOS"],
    seeAlso: { label: "TTS Comparison", labelFr: "Comparatif TTS", href: "/voice/tts" },
  },
  {
    term: "End-to-End Speech Model",
    termFr: "Modèle de parole bout-en-bout",
    category: "voice",
    definition: "A single neural model that processes audio input and produces audio output directly, without separate STT → LLM → TTS stages. Examples: Ultravox, Moshi, OpenAI Realtime API. Advantages: lower latency, natural prosody transfer. Drawbacks: less modularity, harder to swap components.",
    definitionFr: "Un modèle neuronal unique qui traite l'entrée audio et produit directement une sortie audio, sans les étapes séparées STT → LLM → TTS. Exemples : Ultravox, Moshi, OpenAI Realtime API. Avantages : latence plus faible, transfert de prosodie naturel. Inconvénients : moins de modularité, composants plus difficiles à remplacer.",
    relatedTerms: ["STT", "TTS", "LLM", "Voice Pipeline"],
  },
  {
    term: "Full-Duplex",
    termFr: "Full-Duplex",
    category: "voice",
    definition: "A communication mode where both parties can speak and listen simultaneously, like a phone call. In voice AI, full-duplex systems can handle interruptions and overlapping speech in real time. Contrast with half-duplex (push-to-talk), where only one party speaks at a time.",
    definitionFr: "Mode de communication où les deux parties peuvent parler et écouter simultanément, comme lors d'un appel téléphonique. Dans l'IA vocale, les systèmes full-duplex peuvent gérer les interruptions et la parole simultanée en temps réel. Contraire du half-duplex (push-to-talk), où une seule partie parle à la fois.",
    relatedTerms: ["Streaming", "Voice Pipeline", "Latency"],
  },
  {
    term: "Lip-sync",
    termFr: "Synchronisation labiale",
    category: "avatar",
    definition: "The synchronization between the movement of a speaker's lips and the audio being played. In video avatar systems, lip-sync quality measures how accurately the avatar's mouth movements match the generated speech. Poor lip-sync is a major immersion-breaking factor in conversational avatars.",
    definitionFr: "La synchronisation entre le mouvement des lèvres d'un locuteur et l'audio joué. Dans les systèmes d'avatars vidéo, la qualité de la synchronisation labiale mesure la précision avec laquelle les mouvements de la bouche de l'avatar correspondent à la parole générée. Une mauvaise synchronisation labiale est un facteur majeur de rupture d'immersion dans les avatars conversationnels.",
    relatedTerms: ["Video Avatar", "Streaming Latency"],
    seeAlso: { label: "Video Avatars", labelFr: "Avatars Vidéo", href: "/avatars" },
  },
  {
    term: "LLM",
    termFr: "LLM",
    category: "voice",
    definition: "Large Language Model — a neural network trained on large text corpora to understand and generate natural language. In a voice pipeline, the LLM is the reasoning layer between STT (transcription) and TTS (synthesis). Examples: GPT-4o, Claude 3.5, Llama 3, Mistral.",
    definitionFr: "Large Language Model — réseau de neurones entraîné sur de grands corpus textuels pour comprendre et générer du langage naturel. Dans un pipeline vocal, le LLM est la couche de raisonnement entre le STT (transcription) et le TTS (synthèse). Exemples : GPT-4o, Claude 3.5, Llama 3, Mistral.",
    relatedTerms: ["Voice Pipeline", "STT", "TTS"],
  },
  {
    term: "MOS",
    termFr: "MOS",
    category: "metrics",
    definition: "Mean Opinion Score — a subjective audio quality metric where human listeners rate speech on a scale from 1 (bad) to 5 (excellent). MOS is the traditional benchmark for TTS quality evaluation. It has largely been complemented by ELO-based blind tests for comparative rankings.",
    definitionFr: "Mean Opinion Score — métrique de qualité audio subjective où des auditeurs humains évaluent la parole sur une échelle de 1 (mauvais) à 5 (excellent). Le MOS est le benchmark traditionnel pour l'évaluation de la qualité TTS. Il a largement été complété par les tests à l'aveugle basés sur l'ELO pour les classements comparatifs.",
    relatedTerms: ["ELO Score", "TTS"],
  },
  {
    term: "PII Redaction",
    termFr: "Rédaction PII",
    category: "voice",
    definition: "Personally Identifiable Information redaction — the automatic detection and removal or masking of sensitive personal data (names, phone numbers, credit card numbers, etc.) from transcribed text. Required for GDPR/nLPD compliance in many voice processing pipelines.",
    definitionFr: "Personally Identifiable Information redaction — détection et suppression ou masquage automatique des données personnelles sensibles (noms, numéros de téléphone, numéros de carte de crédit, etc.) dans le texte transcrit. Requis pour la conformité RGPD/nLPD dans de nombreux pipelines de traitement vocal.",
    relatedTerms: ["GDPR", "Sovereignty", "STT"],
  },
  {
    term: "Prosody",
    termFr: "Prosodie",
    category: "voice",
    definition: "The patterns of rhythm, stress, and intonation in speech. In TTS, prosody control determines how natural and expressive the synthesized voice sounds — including pitch variation, speaking rate, pauses, and emphasis. Advanced TTS systems allow fine-grained prosody control via markup (SSML) or emotion conditioning.",
    definitionFr: "Les schémas de rythme, d'accentuation et d'intonation dans la parole. En TTS, le contrôle de la prosodie détermine le naturel et l'expressivité de la voix synthétisée — incluant la variation de hauteur, le débit, les pauses et l'emphase. Les systèmes TTS avancés permettent un contrôle fin de la prosodie via des balises (SSML) ou un conditionnement émotionnel.",
    relatedTerms: ["TTS", "SSML", "ELO Score"],
  },
  {
    term: "SSML",
    termFr: "SSML",
    category: "voice",
    definition: "Speech Synthesis Markup Language — an XML-based markup language that provides a standard way to annotate text for speech synthesis. SSML tags control pronunciation, volume, pitch, rate, and pauses. Supported by most cloud TTS APIs (Google, Azure, Amazon Polly).",
    definitionFr: "Speech Synthesis Markup Language — langage de balisage basé sur XML qui fournit un moyen standard d'annoter du texte pour la synthèse vocale. Les balises SSML contrôlent la prononciation, le volume, la hauteur, le débit et les pauses. Pris en charge par la plupart des API TTS cloud (Google, Azure, Amazon Polly).",
    relatedTerms: ["TTS", "Prosody"],
  },
  {
    term: "SSM",
    termFr: "SSM",
    category: "voice",
    definition: "State Space Model — a class of neural architectures (e.g., Mamba, S4) that process sequences more efficiently than Transformers for long contexts. In TTS, SSM-based models like Cartesia Sonic achieve ultra-low latency (40ms TTFA) by avoiding the quadratic attention bottleneck.",
    definitionFr: "State Space Model — classe d'architectures neuronales (ex. Mamba, S4) qui traitent les séquences plus efficacement que les Transformers pour les longs contextes. En TTS, les modèles basés sur SSM comme Cartesia Sonic atteignent une latence ultra-faible (40ms TTFA) en évitant le goulot d'étranglement de l'attention quadratique.",
    relatedTerms: ["TTS", "TTFA", "Transformer"],
  },
  {
    term: "STT",
    termFr: "STT",
    category: "voice",
    definition: "Speech-to-Text — the conversion of spoken audio into written text. The first stage of a voice pipeline. Key metrics: WER (accuracy), TTFA (latency), language coverage, streaming support. Also called ASR (Automatic Speech Recognition).",
    definitionFr: "Speech-to-Text — conversion de la parole audio en texte écrit. Première étape d'un pipeline vocal. Métriques clés : WER (précision), TTFA (latence), couverture linguistique, support du streaming. Aussi appelé ASR (Automatic Speech Recognition).",
    relatedTerms: ["ASR", "WER", "TTFA", "Voice Pipeline"],
    seeAlso: { label: "STT Comparison", labelFr: "Comparatif STT", href: "/voice/stt" },
  },
  {
    term: "Streaming",
    termFr: "Streaming",
    category: "voice",
    definition: "In voice pipelines, streaming refers to the ability to process and transmit audio incrementally, without waiting for the full utterance to complete. Streaming STT returns partial transcripts in real time; streaming TTS starts playing audio before the full text is synthesized. Both are essential for low-latency conversational AI.",
    definitionFr: "Dans les pipelines vocaux, le streaming désigne la capacité à traiter et transmettre l'audio de manière incrémentale, sans attendre la fin de l'énoncé complet. Le STT en streaming retourne des transcriptions partielles en temps réel ; le TTS en streaming commence à jouer l'audio avant que le texte complet soit synthétisé. Les deux sont essentiels pour une IA conversationnelle à faible latence.",
    relatedTerms: ["TTFA", "Latency", "Full-Duplex"],
  },
  {
    term: "TTS",
    termFr: "TTS",
    category: "voice",
    definition: "Text-to-Speech — the conversion of written text into spoken audio. The final stage of a voice pipeline. Key metrics: TTFA (latency), ELO score (quality), voice cloning capability, price per minute, self-hostability.",
    definitionFr: "Text-to-Speech — conversion du texte écrit en audio parlé. Dernière étape d'un pipeline vocal. Métriques clés : TTFA (latence), score ELO (qualité), capacité de clonage vocal, prix par minute, possibilité d'auto-hébergement.",
    relatedTerms: ["TTFA", "ELO Score", "Voice Cloning", "Voice Pipeline"],
    seeAlso: { label: "TTS Comparison", labelFr: "Comparatif TTS", href: "/voice/tts" },
  },
  {
    term: "TTFA",
    termFr: "TTFA",
    category: "metrics",
    definition: "Time To First Audio — the latency between sending a text request to a TTS engine and receiving the first audio chunk. TTFA is the critical metric for conversational AI: values below 100ms feel instantaneous, 100–300ms is acceptable, above 500ms breaks conversational flow. For STT, TTFA measures the time from end of speech to first transcript token.",
    definitionFr: "Time To First Audio — la latence entre l'envoi d'une requête texte à un moteur TTS et la réception du premier chunk audio. Le TTFA est la métrique critique pour l'IA conversationnelle : les valeurs inférieures à 100ms semblent instantanées, 100–300ms est acceptable, au-dessus de 500ms rompt le flux conversationnel. Pour le STT, le TTFA mesure le temps entre la fin de la parole et le premier token de transcription.",
    relatedTerms: ["TTS", "STT", "Latency", "Streaming"],
    seeAlso: { label: "Audio Benchmarks", labelFr: "Benchmarks Audio", href: "/voice/benchmarks" },
  },
  {
    term: "Transformer",
    termFr: "Transformer",
    category: "voice",
    definition: "A neural network architecture based on self-attention mechanisms, introduced in 2017. Transformers are the foundation of most modern LLMs, STT models (Whisper), and TTS models. Their quadratic complexity with sequence length is a bottleneck for real-time audio processing, motivating alternatives like SSMs.",
    definitionFr: "Architecture de réseau de neurones basée sur des mécanismes d'auto-attention, introduite en 2017. Les Transformers sont la base de la plupart des LLM modernes, des modèles STT (Whisper) et TTS. Leur complexité quadratique avec la longueur de séquence est un goulot d'étranglement pour le traitement audio en temps réel, motivant des alternatives comme les SSM.",
    relatedTerms: ["SSM", "LLM", "STT", "TTS"],
  },
  {
    term: "Voice Cloning",
    termFr: "Clonage vocal",
    category: "voice",
    definition: "The ability to synthesize speech that mimics a specific person's voice characteristics (timbre, accent, prosody) from a short audio sample. Used for personalized avatars, dubbing, and accessibility. Raises significant ethical and consent issues. Key differentiator between TTS providers.",
    definitionFr: "La capacité à synthétiser de la parole qui imite les caractéristiques vocales d'une personne spécifique (timbre, accent, prosodie) à partir d'un court échantillon audio. Utilisé pour les avatars personnalisés, le doublage et l'accessibilité. Soulève d'importantes questions éthiques et de consentement. Différenciateur clé entre les fournisseurs TTS.",
    relatedTerms: ["TTS", "ELO Score"],
  },
  {
    term: "Voice Pipeline",
    termFr: "Pipeline vocal",
    category: "voice",
    definition: "The end-to-end chain of components that enables a conversational voice AI: STT (transcription) → LLM (reasoning/generation) → TTS (synthesis). Each stage adds latency; the total pipeline latency determines the perceived responsiveness of the system. Typical target for conversational AI: < 800–1000ms end-to-end.",
    definitionFr: "La chaîne bout-en-bout de composants qui permet une IA vocale conversationnelle : STT (transcription) → LLM (raisonnement/génération) → TTS (synthèse). Chaque étape ajoute de la latence ; la latence totale du pipeline détermine la réactivité perçue du système. Cible typique pour l'IA conversationnelle : < 800–1000ms bout-en-bout.",
    relatedTerms: ["STT", "TTS", "LLM", "TTFA", "Latency"],
    seeAlso: { label: "V2V Pipeline Diagram", labelFr: "Diagramme Pipeline V2V", href: "/voice/pipeline" },
  },
  {
    term: "WER",
    termFr: "WER",
    category: "metrics",
    definition: "Word Error Rate — the standard accuracy metric for STT systems. Calculated as (Substitutions + Deletions + Insertions) / Total Words. A WER of 5% means 5 words in 100 are incorrect. Lower is better. WER varies significantly by domain, accent, and noise level — a model with low WER on clean speech may perform poorly on spontaneous or accented speech.",
    definitionFr: "Word Error Rate — la métrique de précision standard pour les systèmes STT. Calculé comme (Substitutions + Suppressions + Insertions) / Total de mots. Un WER de 5% signifie que 5 mots sur 100 sont incorrects. Plus bas est meilleur. Le WER varie significativement selon le domaine, l'accent et le niveau de bruit — un modèle avec un WER faible sur de la parole propre peut mal performer sur de la parole spontanée ou accentuée.",
    relatedTerms: ["STT", "ASR", "TTFA"],
    seeAlso: { label: "STT Comparison", labelFr: "Comparatif STT", href: "/voice/stt" },
  },
  // ── INFRASTRUCTURE ─────────────────────────────────────────────────────────
  {
    term: "Cloud API",
    termFr: "API Cloud",
    category: "infra",
    definition: "A hosted service accessed over the internet via HTTP/WebSocket APIs. Cloud APIs for STT/TTS offer easy integration and no infrastructure management, but data leaves your environment. Examples: Deepgram, ElevenLabs, AssemblyAI, Google Cloud Speech.",
    definitionFr: "Un service hébergé accessible via Internet par des APIs HTTP/WebSocket. Les APIs cloud pour STT/TTS offrent une intégration facile et aucune gestion d'infrastructure, mais les données quittent votre environnement. Exemples : Deepgram, ElevenLabs, AssemblyAI, Google Cloud Speech.",
    relatedTerms: ["Self-Hosting", "Sovereignty", "Lock-in"],
  },
  {
    term: "GDPR",
    termFr: "RGPD",
    category: "infra",
    definition: "General Data Protection Regulation — the EU regulation governing personal data processing. For voice AI, GDPR requires explicit consent for voice data collection, data minimization, right to erasure, and restrictions on cross-border data transfers. Swiss equivalent: nLPD (new Federal Act on Data Protection).",
    definitionFr: "Règlement Général sur la Protection des Données — le règlement européen régissant le traitement des données personnelles. Pour l'IA vocale, le RGPD exige un consentement explicite pour la collecte de données vocales, la minimisation des données, le droit à l'effacement et des restrictions sur les transferts transfrontaliers de données. Équivalent suisse : nLPD (nouvelle Loi fédérale sur la protection des données).",
    relatedTerms: ["Sovereignty", "PII Redaction", "Self-Hosting"],
  },
  {
    term: "GPU",
    termFr: "GPU",
    category: "infra",
    definition: "Graphics Processing Unit — specialized hardware originally designed for graphics rendering, now widely used for deep learning inference and training. Running open-source STT/TTS models locally requires GPU resources. Key metrics: VRAM (model size), throughput (tokens/sec), cost per hour.",
    definitionFr: "Graphics Processing Unit — matériel spécialisé conçu à l'origine pour le rendu graphique, maintenant largement utilisé pour l'inférence et l'entraînement en deep learning. L'exécution locale de modèles STT/TTS open-source nécessite des ressources GPU. Métriques clés : VRAM (taille du modèle), débit (tokens/sec), coût par heure.",
    relatedTerms: ["Self-Hosting", "Inference"],
  },
  {
    term: "Inference",
    termFr: "Inférence",
    category: "infra",
    definition: "The process of running a trained neural model on new input data to produce predictions or outputs. In voice AI, inference refers to running STT or TTS models in real time. Inference latency and throughput are critical for conversational applications.",
    definitionFr: "Le processus d'exécution d'un modèle neuronal entraîné sur de nouvelles données d'entrée pour produire des prédictions ou des sorties. Dans l'IA vocale, l'inférence désigne l'exécution de modèles STT ou TTS en temps réel. La latence et le débit d'inférence sont critiques pour les applications conversationnelles.",
    relatedTerms: ["GPU", "Latency", "Self-Hosting"],
  },
  {
    term: "Latency",
    termFr: "Latence",
    category: "metrics",
    definition: "The delay between a request and its response. In voice pipelines, latency is the sum of STT processing time + LLM generation time + TTS synthesis time + network round-trip. Total end-to-end latency below 800ms is considered acceptable for natural conversation; below 500ms feels seamless.",
    definitionFr: "Le délai entre une requête et sa réponse. Dans les pipelines vocaux, la latence est la somme du temps de traitement STT + temps de génération LLM + temps de synthèse TTS + aller-retour réseau. Une latence totale bout-en-bout inférieure à 800ms est considérée acceptable pour une conversation naturelle ; inférieure à 500ms semble transparente.",
    relatedTerms: ["TTFA", "Voice Pipeline", "Streaming"],
    seeAlso: { label: "Audio Benchmarks", labelFr: "Benchmarks Audio", href: "/voice/benchmarks" },
  },
  {
    term: "On-Premise",
    termFr: "On-Premise",
    category: "infra",
    definition: "Deployment model where software runs on servers physically located within an organization's own data center or controlled environment. On-premise deployment maximizes data sovereignty and eliminates cloud dependency, but requires infrastructure management expertise and upfront hardware investment.",
    definitionFr: "Modèle de déploiement où le logiciel s'exécute sur des serveurs physiquement situés dans le propre centre de données ou l'environnement contrôlé d'une organisation. Le déploiement on-premise maximise la souveraineté des données et élimine la dépendance au cloud, mais nécessite une expertise en gestion d'infrastructure et un investissement matériel initial.",
    relatedTerms: ["Self-Hosting", "Sovereignty", "Cloud API"],
  },
  {
    term: "Self-Hosting",
    termFr: "Auto-hébergement",
    category: "infra",
    definition: "Running an open-source model or software on your own infrastructure (cloud VM, on-premise server, or edge device) rather than using a vendor's hosted API. Self-hosting gives full control over data, costs, and customization, but requires DevOps expertise and ongoing maintenance.",
    definitionFr: "Exécution d'un modèle open-source ou d'un logiciel sur votre propre infrastructure (VM cloud, serveur on-premise ou dispositif edge) plutôt que d'utiliser l'API hébergée d'un fournisseur. L'auto-hébergement donne un contrôle total sur les données, les coûts et la personnalisation, mais nécessite une expertise DevOps et une maintenance continue.",
    relatedTerms: ["On-Premise", "Sovereignty", "Open Source"],
  },
  {
    term: "Sovereignty",
    termFr: "Souveraineté",
    category: "infra",
    definition: "Data sovereignty refers to the principle that data is subject to the laws and governance structures of the country or jurisdiction where it is collected and processed. In voice AI, sovereignty means ensuring that voice data (often sensitive) does not leave a defined geographic or legal boundary. Self-hosted open-source models are the highest sovereignty option.",
    definitionFr: "La souveraineté des données désigne le principe selon lequel les données sont soumises aux lois et structures de gouvernance du pays ou de la juridiction où elles sont collectées et traitées. Dans l'IA vocale, la souveraineté signifie s'assurer que les données vocales (souvent sensibles) ne quittent pas une frontière géographique ou légale définie. Les modèles open-source auto-hébergés sont l'option de souveraineté maximale.",
    relatedTerms: ["GDPR", "Self-Hosting", "On-Premise", "PII Redaction"],
  },
  // ── BUSINESS ───────────────────────────────────────────────────────────────
  {
    term: "Build vs Buy",
    termFr: "Build vs Buy",
    category: "business",
    definition: "The strategic decision between building a capability in-house (open-source models, custom development) versus purchasing it as a service (cloud APIs, SaaS). Key factors: time-to-market, total cost of ownership, data sovereignty requirements, team expertise, and long-term vendor dependency risk.",
    definitionFr: "La décision stratégique entre construire une capacité en interne (modèles open-source, développement personnalisé) versus l'acheter comme service (APIs cloud, SaaS). Facteurs clés : délai de mise sur le marché, coût total de possession, exigences de souveraineté des données, expertise de l'équipe et risque de dépendance fournisseur à long terme.",
    relatedTerms: ["Lock-in", "Sovereignty", "Open Source"],
    seeAlso: { label: "Decision Framework", labelFr: "Cadre de Décision", href: "/voice/stack" },
  },
  {
    term: "Lock-in",
    termFr: "Lock-in",
    category: "business",
    definition: "Vendor lock-in occurs when switching costs (technical, contractual, or operational) make it difficult to change providers. In voice AI, lock-in risks include proprietary voice models (non-portable), platform-specific APIs, and data stored in vendor systems. Mitigation strategies: abstraction layers, open standards, and self-hostable alternatives.",
    definitionFr: "Le lock-in fournisseur se produit lorsque les coûts de changement (techniques, contractuels ou opérationnels) rendent difficile le changement de fournisseur. Dans l'IA vocale, les risques de lock-in incluent les modèles vocaux propriétaires (non portables), les APIs spécifiques à la plateforme et les données stockées dans les systèmes du fournisseur. Stratégies d'atténuation : couches d'abstraction, standards ouverts et alternatives auto-hébergeables.",
    relatedTerms: ["Build vs Buy", "Open Source", "Sovereignty"],
  },
  {
    term: "M&A",
    termFr: "M&A (Fusions-Acquisitions)",
    category: "business",
    definition: "Mergers and Acquisitions — corporate transactions where companies are combined or purchased. In the voice AI market, M&A activity is high: Deepgram ($1.3B valuation) and AssemblyAI ($158M) are considered acquisition targets. M&A can disrupt pricing, API availability, and data governance policies, making it a key risk factor in vendor selection.",
    definitionFr: "Fusions et Acquisitions — transactions d'entreprise où des sociétés sont combinées ou rachetées. Dans le marché de l'IA vocale, l'activité M&A est élevée : Deepgram (valorisation 1,3Md$) et AssemblyAI (158M$) sont considérés comme des cibles d'acquisition. Les M&A peuvent perturber les prix, la disponibilité des API et les politiques de gouvernance des données, en faisant un facteur de risque clé dans la sélection des fournisseurs.",
    relatedTerms: ["Lock-in", "Build vs Buy"],
  },
  {
    term: "Open Source",
    termFr: "Open Source",
    category: "business",
    definition: "Software whose source code is publicly available and can be freely used, modified, and distributed. In voice AI, open-source models (Whisper, Kokoro, Chatterbox) can be self-hosted for full data sovereignty. 'Open weights' refers to models whose trained parameters are public but whose training code or data may not be.",
    definitionFr: "Logiciel dont le code source est publiquement disponible et peut être librement utilisé, modifié et distribué. Dans l'IA vocale, les modèles open-source (Whisper, Kokoro, Chatterbox) peuvent être auto-hébergés pour une souveraineté totale des données. 'Open weights' désigne les modèles dont les paramètres entraînés sont publics mais dont le code d'entraînement ou les données peuvent ne pas l'être.",
    relatedTerms: ["Self-Hosting", "Sovereignty", "Build vs Buy"],
  },
  // ── AVATAR ─────────────────────────────────────────────────────────────────
  {
    term: "Digital Double",
    termFr: "Double Numérique",
    category: "avatar",
    definition: "A photorealistic AI-generated video avatar that replicates a specific person's appearance, voice, and behavioral patterns. The DigiDouble project aims to create conversational digital doubles from existing video archives, enabling real-time interaction with a person's digital replica.",
    definitionFr: "Un avatar vidéo généré par IA photoréaliste qui réplique l'apparence, la voix et les schémas comportementaux d'une personne spécifique. Le projet DigiDouble vise à créer des doubles numériques conversationnels à partir d'archives vidéo existantes, permettant une interaction en temps réel avec la réplique numérique d'une personne.",
    relatedTerms: ["Video Avatar", "Lip-sync", "Voice Cloning"],
    seeAlso: { label: "The Project", labelFr: "Le Projet", href: "/project" },
  },
  {
    term: "Streaming Latency",
    termFr: "Latence de streaming",
    category: "avatar",
    definition: "In video avatar systems, streaming latency is the delay between receiving audio input and displaying the corresponding animated video output. Measured in milliseconds. Values below 300ms are considered good for real-time interaction; above 1000ms creates a noticeable and disruptive lag.",
    definitionFr: "Dans les systèmes d'avatars vidéo, la latence de streaming est le délai entre la réception de l'entrée audio et l'affichage de la sortie vidéo animée correspondante. Mesurée en millisecondes. Les valeurs inférieures à 300ms sont considérées bonnes pour l'interaction en temps réel ; au-dessus de 1000ms crée un décalage perceptible et perturbateur.",
    relatedTerms: ["Lip-sync", "Video Avatar", "Latency"],
    seeAlso: { label: "Video Avatars", labelFr: "Avatars Vidéo", href: "/avatars" },
  },
  {
    term: "Video Avatar",
    termFr: "Avatar Vidéo",
    category: "avatar",
    definition: "An AI-generated animated video representation of a person, capable of speaking with synchronized lip movements. Streaming video avatars render in real time and can be driven by live audio. Key metrics: streaming latency, lip-sync quality, visual realism, cost per minute, and customization options.",
    definitionFr: "Une représentation vidéo animée générée par IA d'une personne, capable de parler avec des mouvements labiaux synchronisés. Les avatars vidéo en streaming se rendent en temps réel et peuvent être pilotés par de l'audio en direct. Métriques clés : latence de streaming, qualité de la synchronisation labiale, réalisme visuel, coût par minute et options de personnalisation.",
    relatedTerms: ["Digital Double", "Lip-sync", "Streaming Latency"],
    seeAlso: { label: "Video Avatars", labelFr: "Avatars Vidéo", href: "/avatars" },
  },
];

const CATEGORIES = [
  { id: "all", label: "All", labelFr: "Tous" },
  { id: "voice", label: "Voice / Audio", labelFr: "Voix / Audio" },
  { id: "metrics", label: "Metrics", labelFr: "Métriques" },
  { id: "infra", label: "Infrastructure", labelFr: "Infrastructure" },
  { id: "business", label: "Business", labelFr: "Business" },
  { id: "avatar", label: "Video Avatars", labelFr: "Avatars Vidéo" },
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  voice: "oklch(0.55 0.20 200)",
  metrics: "oklch(0.60 0.20 280)",
  infra: "oklch(0.55 0.18 145)",
  business: "oklch(0.60 0.20 25)",
  avatar: "oklch(0.60 0.18 50)",
};

export default function Glossary() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = TERMS.filter((term) => {
    const matchCat = activeCategory === "all" || term.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      term.term.toLowerCase().includes(q) ||
      (term.termFr && term.termFr.toLowerCase().includes(q)) ||
      (isFr ? term.definitionFr : term.definition).toLowerCase().includes(q);
    return matchCat && matchSearch;
  }).sort((a, b) => a.term.localeCompare(b.term));

  const catColor = CATEGORY_COLORS[activeCategory] || "oklch(0.45 0.15 200)";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100 sticky top-14 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-1 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <InternalLink to="/" className="text-slate-400 hover:text-slate-700 transition-colors" aria-label={isFr ? "Accueil" : "Home"}><Home size={12} /></InternalLink>
          <ChevronRight size={11} className="text-slate-300" />
          <InternalLink to="/about" className="text-slate-500 hover:text-slate-800 transition-colors">{isFr ? "À propos" : "About"}</InternalLink>
          <ChevronRight size={11} className="text-slate-300" />
          <span className="font-semibold" style={{ color: "oklch(0.45 0.15 200)" }}>{isFr ? "Glossaire" : "Glossary"}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-baseline gap-3 mb-2">
            <h2 className="text-2xl font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              {isFr ? "Glossaire des termes techniques" : "Technical Glossary"}
            </h2>
          </div>
          <p className="text-slate-500 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr
              ? `Définitions des ${TERMS.length} termes techniques utilisés dans ce portail — Voice Pipeline, Avatars Vidéo, métriques et infrastructure.`
              : `Definitions of the ${TERMS.length} technical terms used across this portal — Voice Pipeline, Video Avatars, metrics, and infrastructure.`}
          </p>
          <div className="mt-3 h-px" style={{ background: "linear-gradient(to right, oklch(0.72 0.18 200), transparent)" }} />
        </div>

        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isFr ? "Rechercher un terme…" : "Search a term…"}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-400 transition-all"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  activeCategory === cat.id
                    ? "border-current text-white"
                    : "border-slate-200 text-slate-500 bg-white hover:border-slate-300"
                }`}
                style={activeCategory === cat.id ? {
                  background: CATEGORY_COLORS[cat.id] || "oklch(0.45 0.15 200)",
                  borderColor: CATEGORY_COLORS[cat.id] || "oklch(0.45 0.15 200)",
                  fontFamily: "'Space Grotesk', sans-serif"
                } : { fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {isFr ? cat.labelFr : cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-slate-400 mb-4 font-mono">
          {filtered.length} {isFr ? "terme(s) affiché(s)" : "term(s) displayed"}
          {search && ` — "${search}"`}
        </p>

        {/* Terms list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Aucun terme trouvé pour cette recherche." : "No terms found for this search."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((term) => (
              <TermCard key={term.term} term={term} isFr={isFr} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TermCard({ term, isFr }: { term: GlossaryTerm; isFr: boolean }) {
  const [open, setOpen] = useState(false);
  const color = CATEGORY_COLORS[term.category];
  const catLabel = {
    voice: isFr ? "Voix / Audio" : "Voice / Audio",
    metrics: "Métriques / Metrics",
    infra: "Infrastructure",
    business: "Business",
    avatar: isFr ? "Avatars Vidéo" : "Video Avatars",
  }[term.category];

  const definition = isFr ? term.definitionFr : term.definition;
  const preview = definition.length > 120 ? definition.slice(0, 120) + "…" : definition;

  const slug = term.term.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <div id={slug} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-all scroll-mt-28">
      <button
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="mt-0.5 flex-shrink-0">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ background: color + "18", color, fontFamily: "'JetBrains Mono', monospace" }}
            >
              {catLabel}
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-bold text-slate-900 text-base" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {term.term}
              </span>
              {term.termFr && term.termFr !== term.term && (
                <span className="text-xs text-slate-400 font-mono">/ {term.termFr}</span>
              )}
            </div>
            {!open && (
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {preview}
              </p>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 mt-1">
          {open ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-700 leading-relaxed mb-4" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr ? term.definitionFr : term.definition}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {term.relatedTerms && term.relatedTerms.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-400 font-mono">{isFr ? "Voir aussi :" : "Related:"}</span>
                {term.relatedTerms.map((rt) => (
                  <span key={rt} className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">{rt}</span>
                ))}
              </div>
            )}
            {term.seeAlso && (
              <InternalLink
                to={term.seeAlso.href}
                className="ml-auto text-xs font-mono font-bold underline"
                style={{ color }}
              >
                {isFr ? term.seeAlso.labelFr : term.seeAlso.label} →
              </InternalLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
