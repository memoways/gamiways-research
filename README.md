# DigiDouble Research Portal

> **Site compagnon du projet de recherche DigiDouble** — état de l'art, benchmarks et analyses stratégiques des technologies de synthèse vocale (TTS/STT) et d'avatars vidéo conversationnels.

**URL de production :** [digidouble.edugami.app](https://digidouble.edugami.app)
**Version :** 0.9.0 — Mai 2026
**Statut :** 🟢 En production — itérations continues

---

## Contexte et raison d'être

Le projet **DigiDouble** est un programme de recherche fondamentale (candidature Innosuisse, démarrage automne 2026, en partenariat avec l'IDIAP Research Institute) dont l'objectif est de créer un avatar conversationnel photoréaliste de toute personne, à partir de ses archives vidéo existantes — personnalisé, souverain, temps réel.

Ce portail est né d'un constat simple : **les décisions technologiques dans ce domaine sont prises trop souvent sur la base de la latence et du coût seuls**, en ignorant les enjeux stratégiques déterminants — souveraineté des données, risque de lock-in fournisseur, dynamiques de consolidation du marché, trajectoire open-source, conformité RGPD/nLPD.

Le portail remplit trois fonctions complémentaires :

1. **Site compagnon du projet DigiDouble** — documenter les choix technologiques, les gaps de recherche et l'état de l'art pour les partenaires industriels, les évaluateurs Innosuisse et les chercheurs de l'IDIAP.
2. **Référence indépendante** — les chapitres *Voice Pipeline* et *Video Avatars* sont conçus pour être utiles à **tout projet** travaillant sur des pipelines vocaux ou des avatars vidéo, indépendamment de DigiDouble. Les analyses sont neutres, sourcées et maintenues à jour.
3. **Outil de décision** — au-delà de l'état de l'art, le portail propose des outils interactifs (scoring personnalisé, simulateur de décision par couche, simulateur de coûts avatars) pour aider les équipes à structurer leurs choix technologiques en fonction de leur contexte propre.

---

## Structure du portail

### The Project

Pages dédiées au projet DigiDouble :

| Route | Contenu |
| --- | --- |
| `/project` | Présentation du projet, objectifs de recherche, partenaires |
| `/research` | Vue d'ensemble des défis de recherche |
| `/research/architecture` | Architecture cible et contraintes techniques |
| `/research/gaps` | Gaps identifiés par rapport à l'état de l'art |
| `/research/academic` | Positionnement académique et références scientifiques |

### Voice Pipeline

Analyse indépendante des technologies de synthèse et reconnaissance vocale — utile pour tout projet de pipeline conversationnel :

| Route | Titre | Contenu |
|-------|-------|---------||
| `/voice/stt` | STT / Speech-to-Text | Comparatif de 10 moteurs STT/ASR (cloud, open-source, souverain) |
| `/voice/tts` | TTS & Voice Synthesis | Comparatif de 16 moteurs TTS (cloud, on-premise, open-source) |
| `/voice/benchmarks` | Audio Synthesis Benchmarks | Benchmarks latence, WER, ELO, coût, qualité STT→TTS |
| `/voice/stack` | Decision Framework | Cadre de décision par couche (STT → TTS → LLM → Mémoire → Streaming → Infrastructure) + simulateur interactif |
| `/voice/pipeline` | Voice-to-Voice Pipeline | Diagramme du pipeline Voice-to-Voice complet |
| `/voice/scoring` | Custom Voice Tool Ranking | Outil de scoring personnalisé avec pondération des critères, partage par URL |
| `/voice/stt/:id` | Fiche STT | Fiche détaillée par outil STT (benchmarks + analyse stratégique + sources datées) |
| `/tts/:id` | Fiche TTS | Fiche détaillée par outil TTS (benchmarks + analyse stratégique + sources datées) |

### Video Avatars

Analyse indépendante des technologies d'avatars vidéo conversationnels :

| Route | Titre | Contenu |
|-------|-------|---------||
| `/avatars` | Streaming Video Avatars | Comparatif des plateformes de streaming vidéo avatar |
| `/avatars/market` | Business & Market | Enjeux business et opportunités de marché (2025–2026) |
| `/avatars/pricing` | Cost Simulator | Simulateur de coûts comparatif (30–3000 min/mo, 8 filtres use-case) |
| `/avatars/behavior` | Axis 2 — Avatar Behavior & Expressiveness | Fidélité comportementale, langage corporel, TTS expressif |
| `/avatars/emotional` | Emotional Toolbox & Character Design | Design émotionnel cinématographique pour avatars conversationnels |
| `/platform/:id` | Fiche Plateforme | Fiche détaillée par plateforme avatar |

### About / À propos

| Route | Titre | Contenu |
|-------|-------|---------||
| `/about` | À propos du portail | Objectifs, philosophie éditoriale, structure, contexte DigiDouble |
| `/glossary` | Glossaire technique | 30 termes EN/FR (WER, TTFA, ELO, Diarisation, Souveraineté, Lock-in…) filtrables par catégorie |

---

## Outils interactifs

### Scoring personnalisé (`/voice/scoring`)

Permet de pondérer 7 critères TTS (qualité, latence, clonage vocal, expressivité, souveraineté, prix, multilingue) et 6 critères STT (précision, latence, multilingue, souveraineté, prix, streaming) pour obtenir un classement personnalisé des outils. Inclut des **presets de profils** (MVP, Souverain, Temps réel, Multilingue, DigiDouble Phase 2) et un **lien partageable** qui encode les poids dans l'URL.

### Simulateur de décision stack (`/voice/stack`)

Un wizard en 5 questions contextuelles (phase projet, souveraineté, latence cible, budget, cas d'usage) qui génère une recommandation par couche du pipeline avec justification, alternatives et liens vers les fiches outils. Le lien de partage encode les réponses dans l'URL.

---

## Couverture des outils

### TTS — 16 moteurs évalués

| Outil | Type | Infra |
| --- | --- | --- |
| ElevenLabs v3 | Cloud API | US |
| Cartesia Sonic 3 | Cloud API | US |
| Inworld TTS-1.5 | Cloud API | US |
| Hume AI Octave 2 | Cloud API | US |
| Fish Audio OpenAudio S1 | Cloud API | CN/US |
| Deepgram Aura 2 | Cloud API | US |
| Kokoro 82M v1.0 | Open-source | Self-hosted |
| Chatterbox (Resemble AI) | Open-source | Self-hosted |
| Orpheus 3B | Open-source | Self-hosted |
| Dia (Nari Labs) | Open-source | Self-hosted |
| Kyutai TTS 1.6B | Open-source | Self-hosted |
| Sesame CSM | Open-source | Self-hosted |
| Ultravox v0.5 | End-to-end | Self-hosted |
| Moshi (Kyutai) | End-to-end | Self-hosted |
| Voxtral TTS (Mistral) | Open-source | Self-hosted / EU |
| OpenAI Realtime API | Cloud API | US |

### STT — 10 moteurs évalués

| Outil | Type | Infra |
| --- | --- | --- |
| Deepgram Nova-3 | Cloud API | US + EU | ✓ $4.50/hr (Voice Agent API) |
| AssemblyAI Universal-3 Pro | Cloud API | US | ✓ $4.50/hr (Voice Agent API) |
| Google Speech-to-Text v2 | Cloud API | US |
| Azure Speech (Microsoft) | Cloud + On-premise | EU disponible |
| Whisper Large v3 (OpenAI) | Open-source | Self-hosted |
| faster-whisper (CTranslate2) | Open-source | Self-hosted |
| Whisper Turbo (OpenAI) | Open-source | Self-hosted |
| Audiogami (Gamilab) | Cloud API | CH |
| Voxtral ASR (Mistral) | Open-source | Self-hosted / EU |
| Inworld STT | Cloud API | US | ✓ $0.015/min (Realtime API) |

---

## Philosophie éditoriale

**Ce portail ne recommande pas.** Il documente, compare, et formule les questions à se poser. Les chapitres *Voice Pipeline* et *Video Avatars* sont délibérément neutres et génériques — ils posent les enjeux, les options, les tests à conduire, et les critères de décision, sans prescrire de choix pour un projet spécifique.

Cette approche repose sur trois convictions :

> **1. L'état de l'art évolue vite.** Une recommandation figée devient obsolète en quelques mois dans ce domaine. Un cadre de décision reste pertinent plus longtemps.

> **2. Le contexte prime sur le benchmark.** Un outil avec un WER de 3% peut être le mauvais choix si vos données audio sont soumises au RGPD et que le fournisseur est une cible d'acquisition. Le scoring personnalisé est là pour ça.

> **3. La souveraineté est un critère de premier ordre.** Pas une contrainte réglementaire accessoire. Les analyses stratégiques de chaque outil (lock-in, financement, trajectoire open-source, risque M&A) sont intégrées dans chaque fiche.

---

## Stack technique

| Couche | Technologie |
| --- | --- |
| Framework | React 19 + TypeScript |
| Routing | Wouter |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Typographie | Space Grotesk, Source Serif 4, JetBrains Mono |
| Build | Vite |
| Hébergement | Manus (manus.space) avec domaine custom |
| i18n | Contexte React maison (EN / FR) |

---

## Développement local

```bash
# Cloner le dépôt
git clone https://github.com/<org>/digidouble-research.git
cd digidouble-research

# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev
```

Le portail est accessible sur `http://localhost:3000`.

---

## Traçabilité des données

Chaque fiche outil affiche une section **Data Freshness** avec la date de mise à jour, une note sur les chiffres vérifiés, et des sources cliquables codées par couleur (violet = benchmark, vert = pricing, ambre = news, gris = docs).

## Architecture des données

Les données des outils sont centralisées dans des fichiers TypeScript séparés du code de rendu. Pour mettre à jour un outil ou en ajouter un nouveau, il suffit de modifier ces fichiers — les pages de comparaison et de scoring se mettent à jour automatiquement.

| Fichier | Contenu |
|---------|---------||
| `client/src/lib/ttsData.ts` | Benchmarks TTS : latence, coût, scores ELO, capacités, sources datées |
| `client/src/lib/sttData.ts` | Benchmarks STT : WER, latence, diarisation, streaming, Voice Agent API, sources datées |
| `client/src/lib/strategicData.ts` | Analyses stratégiques : souveraineté, lock-in, GTM, M&A, trajectoire open-source |
| `client/src/lib/platformData.ts` | Données plateformes avatars vidéo |
| `client/src/lib/pipelineData.ts` | Composants et stacks du pipeline Voice-to-Voice |

---

## Licence

Ce portail est un projet de recherche ouvert. Les données de benchmarks sont issues de sources publiques (papers, annonces officielles, tests indépendants) et sont référencées dans chaque fiche outil. Le code source est disponible sous licence MIT.

---

*Projet DigiDouble — Innosuisse candidature 2026 — en partenariat avec l'IDIAP Research Institute (Martigny, Suisse)*
