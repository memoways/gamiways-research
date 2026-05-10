# Changelog — GamiWays Research Portal

Toutes les modifications notables de ce projet sont documentées ici.

Format basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/) et [Semantic Versioning](https://semver.org/lang/fr/).

> **Note historique :** Ce projet a été initialement développé sous le nom *DigiDouble Research Portal* (mars–mai 2026), puis renommé **GamiWays Research Portal** en mai 2026 pour refléter le partenariat Gamilab × Memoways et son positionnement comme outil de sélection technologique et vitrine d'expertise.

---

## [Non publié]

### À venir
- Cadre de décision STT interactif (arbre de questions : budget, souveraineté, langues, streaming)
- Tooltip au survol du "?" dans les tableaux (définition glossaire en overlay)
- Mise à jour des fiches Google STT v2 et Azure Speech avec données 2026
- Filtre "Clonage vocal natif" dans le tableau TTS

---

## [1.0.0] — 2026-05-10

### Changé — Rebranding GamiWays
- **Renommage complet** : DigiDouble Research Portal → **GamiWays Research Portal**
- Suppression de toutes les mentions Innosuisse, IDIAP et DigiDouble dans les pages publiques
- Repositionnement éditorial : outil de sélection technologique et vitrine d'expertise Gamilab × Memoways
- Logo NavBar : "DD DigiDouble" → "GW GamiWays Research Portal"
- Footer : "GamiWays Research Portal — Gamilab × Memoways — Geneva, Switzerland" avec liens vers gamilab.ch et memoways.com
- URL de production : digidouble.edugami.app → **gamiways.memoways.com**
- Repo GitHub : memoways/digidouble-research → **memoways/gamiways-research**

### Ajouté
- **Page "Core Engine Build Status"** (`/project/status`) : tableau des 21 épics Phase A avec statut ✅/🔄/⏳, barre de progression globale (67%), lien vers le repo GitHub `gami-lab/gami-digidouble-core`
- **Sections "The Project" enrichies** : Vision & Principes directeurs (6 principes), Concepts Clés (Avatar/GM/Session/Memory/Context/Knowledge), Roadmap A/B/C avec état Phase A
- **Page Architecture réécrite** avec la stack technique réelle : 4 couches (Fastify → Use Cases → Domain → Infrastructure), Memory System v3 (Redis L1 / PostgreSQL L2 / pgvector L3), 6 endpoints API, justifications des choix technologiques

### Modifié
- **Harmonisation des largeurs** : toutes les pages passées à `max-w-6xl` (suppression de max-w-4xl, max-w-5xl, max-w-7xl)
- **Suppression des 19 sous-navs `sticky top-14`** : navigation secondaire en haut de page supprimée sur toutes les pages
- Pages Research Challenges et Research Gaps réécrites en angle défis techniques / objectifs produit / enjeux business
- Page About entièrement réécrite : outil de sélection, expertise Gamilab × Memoways, audience clients et partenaires

---

## [0.10.0] — 2026-05-10

### Ajouté
- **Tri sur toutes les colonnes** de toutes les tables du site (VoiceSTT, VoiceTTS, VoiceBenchmarks, AvatarsOverview, AvatarsEmotional, AvatarsMarket) — icônes ⇅/↑/↓, hover lisible (fond sombre + texte blanc)
- **Fiche détail Inworld TTS-2 enrichie** : bandeau amber "Research Preview", tableau de pricing par plan (On-Demand / Developer / Creator / Growth / Enterprise), badges compliance SOC2/GDPR/HIPAA/ZDR/BAA

### Modifié
- **Inworld TTS-2** (research preview, 5 mai 2026) : Voice Direction, Conversational Awareness, 100+ langues, Advanced Voice Design, tarif On-Demand $0.035/min, on-premise Enterprise uniquement, nouveaux partenaires (Cloudflare, DeepInfra, GMI Cloud, LiveKit, Stream, VoiceRun)
- Correctif hover : règle CSS `.data-table th.cursor-pointer:hover` pour maintenir fond sombre + texte blanc sur tous les en-têtes de colonnes triables

---

## [0.9.0] — 2026-05-02

### Ajouté
- **Colonne "Voice Agent API"** dans le tableau STT de VoiceBenchmarks : badge violet AssemblyAI ($4.50/hr), cyan Deepgram (via Pipecat) et Inworld (inclus)
- **Champ `voiceAgentApi`** dans l'interface `STTData` et dans les fiches Deepgram, AssemblyAI et Inworld
- **Fiche Deepgram Nova-3 enrichie** : Voice Agent API $4.50/hr, BYO LLM & TTS, EU endpoint, on-premise Enterprise, 7 sources vérifiées datées 2026-05-02
- **Fiche Inworld STT enrichie** : Realtime API $0.015/min (4× moins cher qu'OpenAI Realtime), clonage vocal natif confirmé (built-in + cloné + custom, jusqu'à 3 000 voix), RAG via function calling, on-premise Enterprise, ZDR disponible
- **Compteur page d'accueil** mis à jour : "3 STT architectures" → "10 moteurs STT évalués (cloud, open-source, souverain)"

### Modifié
- Fiche AssemblyAI : "Universal-2" → "Universal-3 Pro", Voice Agent API $4.50/hr (lancement 29 avr. 2026), turn detection sémantique+acoustique, barge-in natif, 18+ voix prédéfinies, RAG via tool calling JSON Schema
- Tableaux VoiceBenchmarks et VoiceSTT : "AssemblyAI Universal-2" → "AssemblyAI Universal-3 Pro"

---

## [0.8.0] — 2026-05-01

### Ajouté
- **Données benchmarks STT/TTS mises à jour** (avril–mai 2026) : champs `dataUpdatedAt`, `dataUpdateNote` et `sources` ajoutés à toutes les entrées de `sttData.ts` et `ttsData.ts`
- **Section "Data Freshness"** en bas de chaque fiche STTDetail et TTSDetail : badge de date (vert si renseigné, ambre si inconnu), note de mise à jour, boutons sources cliquables codés par couleur (violet = benchmark, vert = pricing, ambre = news, gris = docs)
- **Fiche AssemblyAI Voice Agent API** : données vérifiées sur assemblyai.com (29 avr. 2026), Universal-3 Pro Streaming (u3-rt-pro), pipeline STT+LLM+TTS à $4.50/hr, 7 sources
- Données ELO TTS validées sur Artificial Analysis (mai 2026) : Inworld TTS-1.5 Max ELO 1207 #1, Eleven v3 ELO 1145 #3, Sonic 3 ELO 1063 #8, Kokoro ELO 1059 #9

---

## [0.7.0] — 2026-05-01

### Ajouté
- **Menu "About / À propos"** dans la NavBar avec deux pages :
  - Page **À propos du portail** : objectifs, philosophie éditoriale, structure des 4 sections
  - Page **Glossaire technique** : 30 termes EN/FR (WER, TTFA, ELO, SSM, Diarisation, Souveraineté, Lock-in, GDPR, Voice Cloning, Lip-sync…), filtrables par catégorie, recherche plein texte, accordéon par terme
- **Composant `GlossaryLink`** : badge "?" cliquable qui ouvre le glossaire à l'ancre du terme — intégré dans les en-têtes de colonnes de VoiceSTT, VoiceTTS, VoiceBenchmarks et dans les sliders de VoiceScoring
- **Ancres `id`** sur chaque terme du Glossaire pour navigation directe
- **GlossaryLink dans STTDetail et TTSDetail** : métriques hero, scores comparatifs, capacités, conformité GDPR
- **Bouton "Voir dans les Benchmarks"** en bas de chaque fiche STT et TTS avec scroll automatique et highlight de la ligne cible (2s)
- **Bouton "Fiche détail"** dans la colonne Moteur des tableaux Benchmarks STT et TTS (icône FileText, badge cyan/ambre)
- **Composant `InternalLink`** mis à jour pour gérer les ancres hash avec scroll vers l'élément cible

### Modifié
- Suppression de **tous les préfixes lettre/numéro** (A, B, C, D, G, 01–06) dans les titres de section — modification centrale dans `SectionHeader.tsx`
- **Alignement complet titres pages ↔ labels menu** : 8 labels corrigés

---

## [0.6.0] — 2026-05-01

### Ajouté
- **Page "Voice Pipeline" restructurée** : STT avant TTS dans l'ordre de présentation
- **Page "Audio Synthesis Benchmarks"** (ex-Voice Latency Benchmarks) : synthèse STT → TTS, suppression de la section modèles vidéo

### Modifié
- **VoiceScoring — layout 2 colonnes** : panneau de contrôle sticky gauche 1/3 (presets + onglets STT/TTS + sliders), résultats droite 2/3 — responsive dès tablet (md = 768px)
- **Onglets VoiceScoring** : STT en premier (orange), TTS en second (violet)
- **VoiceSTT** : suppression du préfixe lettre dans le titre, suppression de la ligne de sous-navigation

### Corrigé
- Erreur de syntaxe dans `VoiceBenchmarks.tsx` (ternaire imbriqué)
- Erreur de syntaxe dans `VoiceScoring.tsx` (backtick manquant dans template literal className)

---

## [0.5.0] — 2026-04-29

### Ajouté
- **Analyses stratégiques complètes** pour 26 outils Voice Pipeline (16 TTS + 10 STT) dans `strategicData.ts` : infrastructure spectrum, moat, souveraineté, lock-in, build vs buy, GTM/funding, open-source threat, pricing trajectory, M&A signals
- **Composant `StrategicAnalysis.tsx`** intégré dans TTSDetail et STTDetail
- **Outil de scoring personnalisé** `/voice/scoring` : sliders de pondération 0–10 pour 7 critères TTS et 6 critères STT, 6 presets de profils (MVP, Souverain, Coût, Temps réel, Multilingue, GamiWays Phase 2), classement dynamique avec barres de score détaillées, badges stratégiques (souveraineté, lock-in)
- **Partage de scoring par URL** : mode + pondération dans les query params, restauration automatique à l'ouverture d'un lien partagé, feedback visuel "Lien copié !"
- **Fiches détail STT** (`/voice/stt/:id`) pour 10 moteurs STT : STTDetail.tsx avec métriques, architecture, capacités, analyse stratégique

### Modifié
- Restructuration en **3 menus déroulants** dans la NavBar (The Project / Voice Pipeline / Video Avatars)
- Mise en évidence des outils interactifs (Pipeline Phase 1, Cost Simulator) avec badge "Interactive" dans les menus

---

## [0.4.0] — 2026-04-17

### Ajouté
- **Simulateur de coûts interactif** (`CostSimulator.tsx`) : slider 30–3000 min/mo, 5 presets, toggle coûts cachés, classement dynamique, 8 filtres use-case (Video-only, All-in-one, Sovereign, Low-latency, EU-GDPR, Multi-style, Emotional AI)
- **LemonSlice (LS-2.1)** ajouté : fiche complète (modèle 20B DiT, Emotion API, Action API, BYOLLM/BYOTTS, Self-Managed Pipeline), pricing 5 tiers
- Données LemonSlice dans RadarCompareDiagram (7e axe "Multi-style"), LatencyBenchmarkDiagram et GapDiagram

### Modifié
- CostSimulator déplacé en premier dans la page (avant le tableau comparatif)
- Barre de coût segmentée : gris = fixe, couleur = variable, décomposition Fixe+Variable par ligne

---

## [0.3.0] — 2026-04-13

### Ajouté
- **Section "Emotional Toolbox & Character Design"** dans Research.tsx (3 cartes ET-1/ET-2/ET-3)
- Inworld STT (bloc ASR), Inworld TTS-1.5 Mini (bloc TTS) et stack "Inworld Single-Provider" dans `pipelineData.ts`
- Calculateur de coût/min et coût/heure dans le module sticky Latency & Cost du pipeline

### Modifié
- Suppression complète des références "Edugami"/"Storygami" — remplacées par "mode pédagogique"/"mode narratif"
- Date du footer rendue dynamique (`new Date()`)

---

## [0.2.0] — 2026-03-17

### Ajouté
- **Mise à jour complète mars 2026** : 5 nouveaux compétiteurs (Simli Trinity-1, Anam, bitHuman, D-ID V4, BeyondPresence Genesis 2), 6 nouveaux papiers académiques
- **Runway Characters** (lancé mars 2026) : fiche deep dive, specs techniques (WebRTC, $0.20/min)
- **Tavus Phoenix-4** : tableau comparatif officiel, architecture Gaussian Splatting implicite, boucle Raven-1
- **DiagramModal** : modale plein écran avec zoom, pan drag, reset, fermeture Esc — appliqué aux 12 diagrammes
- Research Challenges recentré sur latence UX : seuils cognitifs (100ms→6-12s), benchmark comparatif 11 solutions, métriques personnalisation PM1-PM4

### Modifié
- Tous les diagrammes SVG agrandis de 35%+ et bilingues EN/FR via `useLang()`
- Correction latence 15-40s → 6-12s sur l'ensemble du site

---

## [0.1.0] — 2026-03-04 — *DigiDouble Research Portal (nom initial)*

### Ajouté
- **Setup initial** : React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui + Wouter
- **4 pages fondatrices** : Accueil, Projet, Défis de Recherche, État de l'Art
- Design "Technical Blueprint" : Space Grotesk, Source Serif 4, JetBrains Mono, palette cyan/ambre/slate
- **6 diagrammes SVG inline** : Pipeline conversationnel, Architecture mémoire 3 couches, Architecture produit, Radar comparatif, Benchmarks latence, Matrice gaps de recherche
- Toggle EN/FR dans la NavBar, toutes les pages et données traduites
- Homepage 7 sections scrollables schéma-first, textes en accordéon/toggle

---

<!-- 
GUIDE RAPIDE:
- "Ajouté" pour les nouvelles fonctionnalités
- "Modifié" pour les changements de fonctionnalités existantes  
- "Déprécié" pour les fonctionnalités qui seront supprimées
- "Supprimé" pour les fonctionnalités supprimées
- "Corrigé" pour les corrections de bugs
- "Sécurité" pour les vulnérabilités corrigées

VERSIONING:
- 0.x.x = prototype/dev (phase DigiDouble)
- 1.0.0 = première release stable GamiWays (mai 2026)
- 1.x.0 = nouvelle fonctionnalité
- 1.x.x = correction de bug
-->
