# Restructuration DigiDouble — Todo

## Phase 1 — Pages Voice
- [ ] `/voice/tts` — extraire section B TTS de StateOfArt
- [ ] `/voice/stt` — extraire section C STT de StateOfArt
- [ ] `/voice/benchmarks` — extraire section D Latency Benchmarks de StateOfArt
- [ ] `/voice/stack` — extraire section H Recommended Tech Stack de StateOfArt
- [ ] `/voice/pipeline` — renommer /pipeline → /voice/pipeline (redirect)

## Phase 2 — Pages Avatars
- [ ] `/avatars` — extraire section A Avatars de StateOfArt
- [ ] `/avatars/pricing` — renommer /pricing → /avatars/pricing (redirect)
- [ ] `/avatars/market` — extraire section G Business & Market de StateOfArt
- [ ] `/avatars/behavior` — extraire section 04 Avatar Behavior de Research
- [ ] `/avatars/emotional` — extraire section 05b Emotional Toolbox de Research

## Phase 3 — Pages DigiDouble
- [ ] `/research/architecture` — extraire section 01 Architecture Cible de Research
- [ ] `/research/gaps` — extraire section E Research Gaps de StateOfArt
- [ ] `/research/academic` — extraire section F Academic Assessment de StateOfArt

## Phase 4 — Nouvelle Home
- [ ] Refaire Home : executive summary + learnings Voice & Avatars + lanceur visuel

## Phase 5 — NavBar + Routing
- [ ] Mettre à jour App.tsx avec toutes les nouvelles routes
- [ ] Créer NavBar avec 3 menus déroulants (The Project / Voice Pipeline / Video Avatars)
- [ ] Supprimer StateOfArt.tsx et sa route
- [ ] Mettre à jour tous les liens internes (Project, Research, PlatformDetail, TTSDetail, PipelinePhase1, PricingComparison, Footer)
