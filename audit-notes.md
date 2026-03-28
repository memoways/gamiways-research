# Audit DigiDouble Research Portal — Contradictions & Répétitions

## PROBLÈMES IDENTIFIÉS

### 1. Research.tsx — Structure des axes incohérente
- Section 02 = "Axis 1 — Latency Budget"
- Section 03 = "Axis 1 — Conversational Memory"
- PROBLÈME: Deux sections portent le numéro "Axis 1". La latence ET la mémoire sont toutes deux dans l'Axe 1.
- CORRECTION: Clarifier que l'Axe 1 = Latence (bottleneck technique), et que la mémoire est un sous-problème de l'Axe 1 ou un Axe 1b séparé.

### 2. Research.tsx — Axe 2 sous-titré "Avatar Construction" mais inclut TTS
- AXE 2c = "TTS Expressif Personnalisé" — mais le TTS n'est pas de la construction d'avatar
- CORRECTION: Clarifier que l'Axe 2 = Comportement avatar (lip-sync, body language, TTS prosodique)

### 3. Research.tsx — Titre de page vs contenu
- Titre: "Fundamental Research Challenges" / "Deux axes primaires pour la collaboration IDIAP"
- Mais la page a 3 axes + architecture cible + partenariat
- CORRECTION: Mettre à jour le sous-titre pour refléter les 3 axes

### 4. Research.tsx — Latence mentionnée mais pas centrale
- La latence est dans une section "Axis 1 — Latency Budget" mais le contenu est surtout sur les approches techniques
- Le vrai problème UX (fluidité, naturalité, expérience utilisateur) n'est pas mis en avant
- CORRECTION: Recentrer sur l'impact UX de la latence, pas seulement les chiffres techniques

### 5. Research.tsx — Répétition avec Home.tsx
- Home.tsx a une section "3 Research Axes" avec ResearchAxesDiagram
- Research.tsx répète les mêmes axes avec plus de détails
- C'est normal (Home = overview, Research = détails) mais les descriptions doivent être cohérentes

### 6. Research.tsx — Répétition avec Project.tsx
- Project.tsx a un tableau compétitif (HeyGen, Synthesia, Flowise, DigiDouble)
- Research.tsx n'a pas de tableau compétitif — OK, pas de répétition directe

### 7. Research.tsx — Section "Partnership" hors scope
- La section 06 "IDIAP Partnership — Mutual Contributions" est plus "pitch" que "research challenges"
- Elle répète des infos déjà dans Project.tsx (tech stack, contributions)
- CORRECTION: Déplacer ou condenser cette section

### 8. Valeurs de latence — Cohérence à vérifier
- Home.tsx: "6–12 seconds of latency. The target: under 2 seconds."
- Research.tsx: "The bottleneck: avatar video generation (5–10s)" — INCOHÉRENCE avec 6-12s
- CORRECTION: Harmoniser sur 6-12s (extrapolé) partout

### 9. Research.tsx — Questions ouvertes répétées
- openQuestionsAvatar[0] = "Can we automatically extract an individual's gestural vocabulary..."
- avatarResearch[0].challenge = "Can we automatically extract an individual's gestural vocabulary..." — DOUBLON EXACT
- CORRECTION: Supprimer la répétition

## PLAN DE REFONTE Research.tsx

### Nouvelle structure proposée (centrée sur latence + UX):

1. **Header** — "The Latency Problem: Why Real-Time Matters for User Experience"
   - Sous-titre: 3 axes de recherche pour IDIAP
   
2. **Section 01 — Target Architecture** (garder, c'est le contexte)

3. **Section 02 — Axis 1: End-to-End Latency & UX Fluidity** (REFONTE MAJEURE)
   - Problème UX: pourquoi 6-12s brise l'expérience (uncanny valley temporel)
   - Budget latence par composant (ConversationFlowDiagram)
   - 4 approches techniques (distillation, cache, streaming, graceful degradation)
   - Métriques UX cibles (TTFR, TTFA, TTFB)
   - Hypothèse H1: "Un pipeline streaming LLM→TTS→Avatar peut atteindre <2s TTFR"

4. **Section 03 — Axis 1b: Conversational Memory & Personalization** (renommer)
   - Lien avec latence: la mémoire doit être rapide (pas de latence ajoutée)
   - Architecture 3 couches (MemoryArchDiagram)
   - Questions ouvertes

5. **Section 04 — Axis 2: Avatar Behavior & Expressiveness** (garder, simplifier)
   - VideoPipelineDiagram
   - 4 sous-axes (extraction, body language, TTS, optimisation)

6. **Section 05 — Axis 3: Orchestration Freedom** (garder)
   - OrchestrationDiagram

7. **Section 06 — Partnership** (condenser)
