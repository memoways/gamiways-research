# DigiDouble State of the Art — Research Notes March 2026

## NOUVEAUX COMPÉTITEURS IDENTIFIÉS

### 1. Simli (Trinity-1) — Infrastructure-first
- Fondé 2023, Y Combinator
- **Modèle**: Trinity-1, Gaussian Splatting propriétaire
- **Latence**: <300ms (sub-300ms)
- **Transport**: WebRTC (Daily infrastructure) + WebSockets
- **API**: Agent API + Audio-to-Video API
- **Custom avatars**: Single image
- **Frameworks**: LiveKit, Pipecat
- **Pricing**: $0.009/min (le moins cher du marché)
- **Qualité**: Bonne, mais bitrate bas
- **Philosophie**: "Face layer" pour AI agents, obsédé par la latence
- **Source**: Medium Jan 2026, LinkedIn Jan 2026, Verda Aug 2025

### 2. BeyondPresence (Genesis 2 à venir) — Hyper-réaliste
- Fondé 2024, spécialisé Managed Agents
- **Modèle**: Propriétaire, Vision propriétaire
- **Latence**: Bonne
- **Transport**: WebRTC (LiveKit)
- **API**: Agent API + Audio-to-Video API
- **Custom avatars**: Short video
- **Frameworks**: LiveKit, Pipecat
- **Pricing**: ~$0.085/min (A2V) / ~$0.35/min (Agent API)
- **Qualité**: Très bonne, 1080p haute résolution
- **Philosophie**: Avatars hyper-réalistes pour sales, HR, coaching
- **Note**: Genesis 2 annoncé (world's most advanced expressive real-time avatar model)
- **Source**: Medium Jan 2026, beyondpresence.ai

### 3. bitHuman — Edge Computing
- Fondé 2023, San Francisco
- **Modèle**: Essential (CPU/cloud) + Expressive (cloud only)
- **Latence**: Moyenne
- **Transport**: WebRTC (LiveKit)
- **API**: Agent API + Run Model Locally
- **Custom avatars**: Single image ou video
- **Frameworks**: LiveKit
- **Pricing**: ~$0.04/min cloud, $0.01/min self-hosted
- **Qualité**: Acceptable
- **Philosophie**: Déploiement edge/CPU, premier avatar CPU au monde
- **Source**: Medium Jan 2026, Yahoo Finance Aug 2025

### 4. Lemon Slice (ex-Infinity AI) — Wild Card créatif
- Rebranded 2024/2025
- **Modèle**: Diffusion Transformer propriétaire
- **Latence**: Moyenne
- **Transport**: WebRTC (Daily infrastructure)
- **API**: Agent API
- **Custom avatars**: Single photo
- **Pricing**: ~$0.21/min
- **Qualité**: Très bonne, multi-styles (réaliste, cartoon, etc.)
- **Philosophie**: Créativité et nouveauté visuelle, pas seulement photoréaliste
- **Source**: Medium Jan 2026

### 5. Hedra — Foundation Model pour personnages
- Fondé 2023, San Francisco
- **Modèle**: Propriétaire video + audio
- **Latence**: Lente
- **Transport**: WebRTC (LiveKit)
- **API**: Agent API
- **Custom avatars**: Single image
- **Pricing**: ~$0.07/min
- **Qualité**: Bonne mais résolution/bitrate bas
- **Source**: Medium Jan 2026

### 6. D-ID V4 (Expressive Visual Agents) — Lancé mars 2026
- Fondé 2017, Israël
- **V4**: Lancé 16 mars 2026 — "new benchmark for avatar fidelity and performance"
- **Modèle**: Diffusion-powered expressive delivery, consistent identity
- **Latence**: Lente (V3), V4 améliorée
- **Transport**: WebRTC (Janus)
- **API**: Agent API
- **Pricing**: ~$0.35/min
- **Qualité**: Bonne (V4 améliorée)
- **Note**: Pas de SDK, API bas niveau
- **Source**: PRNewswire Mars 2026, D-ID.com

### 7. Soul Machines — CGI Digital Brain
- Fondé 2016, Nouvelle-Zélande
- **Modèle**: CGI + Digital Brain technology (pas diffusion)
- **Latence**: Temps réel
- **Transport**: Non spécifié
- **Pricing**: Enterprise (non public)
- **Qualité**: Haute fidélité CGI
- **Focus**: Celebrity digital twins, enterprise, healthcare
- **Note**: Digital Workforce lancé sept 2025
- **Source**: Soul Machines, digitalhumans.com Jan 2026

### 8. UneeQ — CGI Enterprise Leader
- Fondé ~2010s, rebranded 2019
- **Modèle**: CGI 3D Unreal Engine + Synanim™
- **Latence**: Sub-1 second
- **Transport**: WebRTC (PixelStreaming)
- **Pricing**: $899+/mois (licence)
- **Qualité**: Très haute fidélité, pas uncanny valley
- **Note**: Gartner "cool digital human vendor" fév 2026
- **Source**: digitalhumans.com, G2

### 9. Inworld AI — TTS + Agent Runtime
- **Focus**: TTS #1 ranked, <200ms latency, voice cloning
- **Pricing**: $10/1M characters (TTS)
- **Note**: Repositionné sur TTS + Agent Runtime pour gaming/entertainment
- **Source**: inworld.ai, mars 2026

### 10. Convai — Gaming/VR avatars
- **Modèle**: NeuroSync lip-sync
- **Latence**: 8-10s en mars 2026 (problèmes signalés sur forum)
- **Transport**: WebRTC
- **Focus**: Unity/Unreal Engine, VR, gaming
- **Note**: Latence problématique signalée récemment
- **Source**: Convai forum mars 2026

## MISES À JOUR PLATEFORMES EXISTANTES

### HeyGen → LiveAvatar
- **IMPORTANT**: Interactive Avatar sunsetting March 31, 2026 → remplacé par LiveAvatar
- **Transport**: WebSockets ou WebRTC (LiveKit)
- **Pricing**: ~$0.10/min
- **Frameworks**: LiveKit, Pipecat, TEN
- **Note**: Pas de free API credits depuis fév 2026

### Tavus
- **Pricing confirmé**: $0.32/min
- **Transport**: WebRTC (Daily)
- **Memory**: Oui (multi-session)
- **Frameworks**: LiveKit, Pipecat
- **Note**: Adapte bien au low bandwidth

### Runway Characters
- Déjà intégré dans le site

## PAPIERS ACADÉMIQUES CLÉS 2025-2026

### AvatarForcing (arXiv 2603.14331, mars 2026)
- One-step streaming diffusion framework
- Local-Future Sliding-Window Denoising
- Single reference image + streaming audio
- Temps réel, long-form

### Avatar Forcing (arXiv 2601.00664, jan 2026)
- Diffusion forcing-based head avatar
- Interaction via audio-visual signals
- Cité 1 fois

### SoulX-FlashTalk (arXiv 2512.23379, déc 2025)
- 14B-parameter DiT
- Sub-second startup latency: 0.87s
- 32 FPS sur 8xH800
- Infinite streaming

### JoyAvatar-Flash (arXiv 2512.11423, jan 2026)
- Multi-GPU parallelization + streaming optimizations
- >30 FPS, temps réel

### The Latency Wall (arXiv 2601.15914, jan 2026)
- Benchmark emotion recognition pour avatars temps réel
- 7 émotions, trade-off qualité/latence

### Memory Augmented Routing (arXiv 2603.23013, mars 2026)
- Hybrid retrieval pour mémoire conversationnelle
- Turn-pairs storage

## DONNÉES MARCHÉ
- Digital Human Market: $66.98B en 2026 → $258.15B en 2030 (CAGR 40.1%)
- Virtual Humans Market: $5.50B en 2026 → $14B en 2033 (CAGR 14%)
- Coûts API: de $0.009/min (Simli) à $0.35/min (D-ID/BeyondPresence)

## OBSERVATIONS CLÉS POUR DIGIDOUBLE

1. **Latence**: La plupart des providers sont à "medium" latency. Simli (<300ms) et Runway (<500ms) sont les plus rapides. Tavus/Anam sont "good". D-ID est "slow".
2. **Mémoire persistante**: Seul Tavus mentionne explicitement la mémoire multi-session. Aucun autre provider ne l'offre vraiment.
3. **Souveraineté**: Aucun provider ne propose de déploiement on-premise sauf UneeQ (option VPC) et bitHuman (self-hosted). D-ID mentionne "Optional VPC and on-prem".
4. **Orchestration narrative**: Aucun provider n'a de système de playlist vidéo ou d'orchestration narrative (Storygami).
5. **Voice cloning**: Tavus, HeyGen et quelques autres. Pas Runway, pas Simli, pas D-ID.
6. **Pricing gap**: Simli ($0.009/min) vs D-ID ($0.35/min) = 39x différence.
7. **Transport dominant**: WebRTC via LiveKit ou Daily. Janus (D-ID) et Pion (Anam) moins courants.
