# GamiWays Research Portal — Development Story

> **Status**: 🟢 En production — itérations continues
> **Creator**: Ulrich Daepp — Expert no-code & vibe coding, coach transformation numérique
> **Partnership**: Gamilab × Memoways — Geneva, Switzerland
> **Started**: 2026-03-04 (sous le nom DigiDouble Research Portal)
> **Renamed GamiWays**: 2026-05-10
> **Last Updated**: 2026-05-16

---

## Genesis Block

### The Friction

```
Le projet nécessitait une documentation solide des choix technologiques pour 
convaincre des partenaires industriels et des clients potentiels dans le domaine 
des avatars conversationnels.

Problème : les décisions technologiques dans ce domaine se prennent trop souvent 
sur la base de la latence et du coût seuls — en ignorant les enjeux stratégiques 
déterminants : souveraineté des données, risque de lock-in fournisseur, dynamiques 
de consolidation du marché, trajectoire open-source, conformité RGPD/nLPD suisse.

Il n'existait pas de portail de recherche indépendant, neutre et maintenu à jour 
qui combine benchmarks techniques, analyses stratégiques et outils de décision 
interactifs pour ce domaine spécifique.
```

### The Conviction

```
Ulrich est à l'intersection du no-code, du vibe coding et de la transformation 
numérique — une position unique pour construire rapidement un portail de recherche 
de qualité sans équipe de développement.

Le moment est critique : le marché des avatars vidéo conversationnels et des 
pipelines vocaux est en consolidation rapide (Deepgram $1.3B, AssemblyAI $158M 
en acquisition targets). Les décisions prises en 2026 engagent des projets pour 
3-5 ans. Un portail de veille stratégique construit maintenant a une valeur 
immédiate pour Gamilab et Memoways, et une valeur générique pour tout projet similaire.
```

### Initial Vision

```
Créer un portail qui documente l'état de l'art, les gaps techniques et les choix 
technologiques. Le portail doit être utile à la fois comme outil interne de 
sélection technologique et comme référence indépendante pour tout projet 
travaillant sur des pipelines vocaux ou des avatars vidéo.
```

### Target Human

```
Prénom: Marc, 45 ans, directeur technique dans une PME suisse
Contexte: Évalue des solutions d'avatars conversationnels pour son service client
Struggle: Noyé sous les benchmarks marketing des fournisseurs, incapable de 
  comparer objectivement 16 moteurs TTS ou 10 moteurs STT sur des critères 
  stratégiques (souveraineté, lock-in, trajectoire open-source)
Success: En 20 minutes, Marc comprend les enjeux stratégiques, identifie les 
  3 solutions pertinentes pour son contexte RGPD, et sait quelles questions 
  poser aux fournisseurs
How this helps: Tableaux comparatifs neutres + scoring personnalisé + 
  analyses stratégiques par outil + glossaire des termes techniques
```

### Tools Arsenal

| Outil | Rôle |
|-------|------|
| Manus AI | Agent principal — architecture, développement, recherche, rédaction |
| React 19 + TypeScript | Framework frontend |
| Tailwind CSS 4 + shadcn/ui | Système de design |
| Vite | Build et HMR |
| GitHub | Versioning et sync (memoways/gamiways-research) |
| Manus hosting | Déploiement sur manus.space + domaine custom |

---

## Feature Chronicle

### 2026-03-04 — Site fondateur : 4 pages + diagrammes SVG 🔷

**Intent**: Créer le portail de recherche initial avec les 4 pages fondatrices et une identité visuelle forte.

**Prompt**:
```
Créer un site de recherche avec 4 pages (Accueil, Projet, Défis de Recherche, 
État de l'Art), design "Technical Blueprint" sobre avec couleurs vives, tableaux 
comparatifs, benchmarks de latence, analyse état de l'art.
```

**Tool**: Manus AI (webdev)

**Outcome**:
- Design "Technical Blueprint" : Space Grotesk + Source Serif 4 + JetBrains Mono, palette cyan/ambre/slate
- 6 diagrammes SVG inline : Pipeline conversationnel, Architecture mémoire 3 couches, Architecture produit, Radar comparatif, Benchmarks latence, Matrice gaps de recherche
- Toggle EN/FR dans la NavBar, toutes les pages traduites

**Surprise**: Les diagrammes SVG inline se sont révélés beaucoup plus puissants que prévu — ils permettent le toggle EN/FR et la modale zoom sans dépendance externe.

**Friction**: La latence affichée (15-40s) était incorrecte — les tests partiels donnaient 6-12s. Correction sur tout le site.

**Time**: ~4h

---

### 2026-03-05 — DiagramModal + PDF v3 🔷

**Intent**: Rendre les diagrammes consultables en plein écran et enrichir le PDF technique.

**Outcome**:
- DiagramModal : zoom scroll/boutons, pan drag, reset, fermeture Esc — appliqué aux 12 diagrammes
- Tous les diagrammes agrandis de 35%+
- PDF v3 : 8 pages paysage A4, 5 nouveaux schémas

**Time**: ~2h

---

### 2026-03-17 — Mise à jour mars 2026 + Simli Trinity-1 🔷

**Intent**: Intégrer 5 nouveaux compétiteurs et 6 nouveaux papiers académiques.

**Outcome**:
- 5 nouveaux compétiteurs : Simli Trinity-1, Anam, bitHuman, D-ID V4, BeyondPresence Genesis 2
- Research Challenges recentré sur latence UX : seuils cognitifs (100ms→6-12s), benchmark comparatif 11 solutions
- Données marché actualisées : Grand View Research $66.98B

**Time**: ~3h

---

### 2026-04-02 — Inworld STT/TTS + calculateur de coût pipeline 🔷

**Intent**: Intégrer Inworld comme stack single-provider et ajouter un calculateur de coût en temps réel.

**Outcome**:
- Inworld STT, Inworld TTS-1.5 Mini et stack "Inworld Single-Provider" dans pipelineData.ts
- Calculateur de coût/min avec décomposition par bloc et barre de répartition

**Surprise**: La stack Inworld single-provider élimine la sérialisation réseau inter-composants — gain estimé 30-50ms, latence best-case 490ms.

**Time**: ~2h

---

### 2026-04-13 — Nettoyage références internes + Emotional Toolbox 🔷

**Intent**: Nettoyer les références internes obsolètes et ajouter la section Emotional Toolbox.

**Outcome**:
- Suppression complète des références "Edugami"/"Storygami" sur tout le site
- Section "Emotional Toolbox & Character Design" (3 cartes ET-1/ET-2/ET-3)

**Time**: ~2h

---

### 2026-04-17 — LemonSlice + CostSimulator 🔷

**Intent**: Intégrer LemonSlice (acteur émergent multi-style) et créer un simulateur de coûts interactif pour les avatars vidéo.

**Outcome**:
- CostSimulator : slider 30–3000 min/mo, 5 presets, toggle coûts cachés, 8 filtres use-case, barre coût segmentée fixe/variable
- LemonSlice (LS-2.1) : fiche complète, 7e axe "Multi-style" dans le radar

**Surprise**: Le filtre "EU-GDPR" révèle que seulement 4 plateformes sur 10 sont vraiment conformes — information stratégique majeure non visible dans les benchmarks habituels.

**Time**: ~4h

---

### 2026-04-29 — Analyses stratégiques + Scoring personnalisé 🔷

**Intent**: Ajouter une couche d'analyse stratégique pour chaque outil et un outil de scoring personnalisé.

**Outcome**:
- `strategicData.ts` : 26 fiches complètes (infrastructure spectrum, moat, souveraineté, lock-in, GTM/funding, M&A signals)
- VoiceScoring : sliders 0–10, 6 presets, classement dynamique, partage par URL
- STTDetail : fiches détail pour 10 moteurs STT
- Restructuration en 3 menus déroulants (The Project / Voice Pipeline / Video Avatars)

**Friction**: L'outil de scoring avec partage par URL a nécessité une synchronisation bidirectionnelle query params ↔ état React — plusieurs itérations pour éviter les boucles infinies.

**Resolution**: `replaceState` au lieu de `pushState` + debounce sur la mise à jour des params.

**Time**: ~6h

---

### 2026-05-01 — Menu About + Glossaire + Navigation bidirectionnelle 🔷

**Outcome**:
- Menu "About / À propos" avec page À propos et Glossaire (30 termes EN/FR, filtrables, recherche plein texte)
- Composant `GlossaryLink` : badge "?" dans les en-têtes de colonnes et sliders de toutes les pages techniques
- Navigation bidirectionnelle : "Voir dans les Benchmarks" depuis les fiches + "Fiche détail" depuis les tableaux
- Suppression de tous les préfixes lettre/numéro dans les titres de section

**Surprise**: La suppression des préfixes (A, B, C, G…) en modifiant uniquement `SectionHeader.tsx` a corrigé 14 pages en une seule modification — la puissance des composants centralisés.

**Time**: ~5h

---

### 2026-05-01-02 — Données benchmarks + AssemblyAI Voice Agent API 🔷

**Outcome**:
- Champs `dataUpdatedAt`, `dataUpdateNote`, `sources` dans toutes les entrées STT et TTS
- Section "Data Freshness" dans STTDetail et TTSDetail
- AssemblyAI Universal-3 Pro (lancement 29 avr. 2026) : $4.50/hr, turn detection sémantique+acoustique
- Deepgram Voice Agent API $4.50/hr, BYO LLM & TTS, EU endpoint
- Inworld Realtime API $0.015/min, clonage vocal natif (3 000 voix custom)
- Colonne "Voice Agent API" dans le tableau STT de VoiceBenchmarks

**Surprise**: Inworld est 4× moins cher qu'OpenAI Realtime ($0.015/min vs $0.06/min) — une information stratégique majeure visible sur leur site mais absente de tous les benchmarks tiers.

**Time**: ~4h

---

### 2026-05-10 — Inworld TTS-2 + Tri complet + Harmonisation 🔷

**Intent**: Intégrer les données Inworld TTS-2 (research preview), rendre toutes les tables triables, et harmoniser le format du portail.

**Outcome**:
- Inworld TTS-2 (research preview, 5 mai 2026) : Voice Direction, Conversational Awareness, 100+ langues, $0.035/min
- Tri sur toutes les colonnes de toutes les tables du site (6 pages, icônes ⇅/↑/↓, hover lisible)
- Harmonisation largeurs : toutes les pages à `max-w-6xl`
- Suppression des 19 sous-navs `sticky top-14`
- Fiche Inworld TTS-2 enrichie : bandeau "Research Preview", tableau pricing par plan, badges compliance

**Time**: ~3h

---

### 2026-05-10 — Rebranding GamiWays 🔶

**Intent**: Renommer le portail de DigiDouble Research Portal à GamiWays Research Portal, repositionner l'identité éditoriale.

**Why**: Le portail a évolué au-delà de son contexte initial. Il est maintenant un outil de sélection technologique et une vitrine d'expertise pour le partenariat Gamilab × Memoways — utilisé dans les démarches clients, partenaires et lors de présentations à des festivals et événements.

**Outcome**:
- Suppression de toutes les mentions Innosuisse, IDIAP et DigiDouble dans les pages publiques
- Logo, footer, titres, métadonnées : DigiDouble → GamiWays
- Page About entièrement réécrite : outil de sélection, expertise Gamilab × Memoways
- Pages Research Challenges et Gaps réécrites en angle défis techniques / objectifs produit / enjeux business
- Repo GitHub : memoways/digidouble-research → memoways/gamiways-research

**Emotional state**: Clarté — le portail avait dépassé son contexte d'origine. Le rebranding aligne le nom avec la réalité du projet.

**Time**: ~2h

---

### 2026-05-16 — Latences PostHog enrichies — sessions récentes + tendances pipeline 🔷

**Intent**: Extraire le maximum d'informations des 3 projets PostHog pour avoir une vue détaillée des latences, des blocages et des tendances — à la manière des dashboards de l'admin du jeu AVA.

**Prompt**:
```
Analyser le projet, voir pour améliorer la récupération des statistiques de 
latence de Posthog pour les 3 projets. Avoir les statistiques de latence des 
3 projets avec présentation similaire aux screenshots fournis — vue des tendances, 
des éléments / parties de la mécanique qui bloquent, avec pistes de solution.
```

**Tool**: Claude Code (claude-sonnet-4-6) — exploration MCP PostHog + implémentation

**Process**:
- Exploration MCP PostHog pour découvrir les events réels dans les 3 projets
- Dilemme Flowise : découverte de `flowise_stream_completed` avec la décomposition exacte Connect / Pré-TTFT / Stream — les données étaient là, non exploitées
- Dilemme Light : `voice_turn_complete` contient `recording_duration_ms`, `stt_latency_ms`, `exchange_index` — suffisant pour un breakdown par phase
- AVA : seulement des events jeu frontend — les latences pipeline (Query rewrite, RAG, LLM, Validator) visibles dans l'admin jeu viennent d'un système non encore connecté à ce projet PostHog

**Outcome**:
- 5 nouvelles procédures HogQL backend : sessions brutes, tendances par phase, erreurs
- Composants `SessionLatencyBar` et `TurnLatencyBar` : barres horizontales empilées proportionnelles, thème sombre
- Sections "Sessions récentes", "Tendances pipeline", "Erreurs & blocages" dans Flowise
- Sections "Tours récents", "Tendances par phase" dans Dilemme Light
- Tri et sélecteur de limite pour les listes de sessions/tours
- Vérification du routage PostHog → projets : aucun mélange

**Surprise**: `ttftMs - connectMs` = Pré-TTFT, `streamMs` = Stream — la décomposition du screenshot de l'admin était déjà encodée dans un seul event PostHog. Il suffisait de l'extraire.

**Friction**: Le projet AVA (137897) n'a que des events jeu frontend. Les latences pipeline (Query rewrite, RAG, LLM, Validator) doivent être gérées depuis un backend séparé et ne sont pas encore connectées à ce projet PostHog.

**Time**: ~1.5h

---

### 2026-05-10 — Section Projet enrichie depuis gami-digidouble-core 🔷

**Intent**: Mettre à jour la section "The Project" à partir du repo `gami-lab/gami-digidouble-core` qui documente l'architecture réelle du moteur.

**Outcome**:
- Page Architecture réécrite : 4 couches réelles (Fastify → Use Cases → Domain → Infrastructure), Memory System v3 (Redis/PostgreSQL/pgvector), 6 endpoints API, justifications des choix
- Nouvelles sections dans The Project : Vision & Principes, Concepts Clés, Roadmap A/B/C
- Nouvelle page "Core Engine Build Status" : 21 épics Phase A avec statut ✅/🔄/⏳, barre de progression 67%

**Surprise**: Le concept de Game Master (directeur asynchrone distinct de l'Avatar) est une innovation architecturale forte — il mérite d'être mis en avant dans les présentations clients.

**Time**: ~3h

---

## Pivots & Breakages

### 2026-03-04 — Latence 15-40s → 6-12s

**What broke**: La valeur de latence affichée sur tout le site (15-40s) était incorrecte — les tests partiels donnaient 6-12s.

**What you learned**: Toujours sourcer les chiffres de latence avec des conditions de test précises. Un audit systématique de toutes les occurrences d'une valeur est nécessaire avant publication.

---

### 2026-04-29 — Boucle infinie dans le scoring par URL

**What broke**: L'implémentation initiale du partage de scoring par URL créait une boucle infinie : mise à jour des sliders → mise à jour des query params → re-render → mise à jour des sliders…

**Resolution**: `replaceState` au lieu de `pushState` + debounce sur la mise à jour des params.

**What you learned**: Les effets de bord entre React state et URL params nécessitent un debounce ou une référence de comparaison. Tester la synchronisation bidirectionnelle dès le début.

---

### 2026-05-01 — Superposition des sliders sur tablet

**What broke**: Le layout 2 colonnes sticky sur tablet provoquait une superposition visuelle des `input[type=range]`.

**Resolution**: Passage de `lg` à `md` pour le breakpoint + `overflow-y-auto` sur le panneau sticky.

---

### 2026-05-10 — Hover illisible sur les en-têtes de colonnes triables

**What broke**: La classe Tailwind `hover:bg-slate-100` sur les `<th>` écrasait le fond sombre défini en CSS, rendant le texte blanc invisible sur fond clair.

**Resolution**: Règle CSS spécifique `.data-table th.cursor-pointer:hover` avec fond sombre forcé — le Tailwind hover retiré, la règle CSS prend le relais.

---

## Pulse Checks

### 2026-05-10 — Pulse Check #2

**Energy level**: 9/10

**Current doubt**: La maintenance des données (benchmarks, prix, latences) va devenir un travail à part entière. La connexion semi-automatique au repo `gami-digidouble-core` serait utile pour les mises à jour de la section Projet.

**Current satisfaction**: Le portail est devenu une référence réelle et une vitrine d'expertise crédible. Le rebranding GamiWays clarifie l'identité et le positionnement. La section Architecture avec la stack technique réelle (Fastify, pgvector, Redis, Langfuse) donne une crédibilité technique immédiate lors de présentations.

**If you stopped now, what would you regret?**: Ne pas avoir créé le cadre de décision STT interactif (symétrique au Decision Framework TTS).

**One word for how this feels**: **Cohérence**

---

### 2026-05-02 — Pulse Check #1

**Energy level**: 8/10

**Current satisfaction**: Le portail est devenu une référence réelle — les fiches détail avec sources vérifiées et dates de mise à jour donnent une crédibilité que peu de sites comparatifs ont. La navigation bidirectionnelle (tableaux ↔ fiches ↔ benchmarks ↔ glossaire) crée une expérience cohérente.

**One word for how this feels**: **Momentum**

---

## Insights Vault

- **2026-03-04**: Les composants centralisés (SectionHeader, GlossaryLink, InternalLink) multiplient l'impact de chaque modification — une correction dans un composant corrige 14 pages simultanément.
- **2026-03-17**: Un portail de recherche neutre qui "ne recommande pas" mais "formule les questions à se poser" est plus durable qu'un portail qui donne des recommandations figées — l'état de l'art évolue trop vite.
- **2026-04-17**: Les filtres use-case (EU-GDPR, Sovereign, Low-latency) révèlent des informations stratégiques invisibles dans les benchmarks bruts — la valeur est dans la combinaison des critères, pas dans les chiffres isolés.
- **2026-04-29**: La séparation données/rendu (sttData.ts, ttsData.ts, strategicData.ts) est la décision architecturale la plus importante du projet — elle permet de mettre à jour 26 fiches sans toucher au code de rendu.
- **2026-05-02**: Vérifier les données sur les sites officiels révèle systématiquement des informations absentes des benchmarks tiers — le prix Voice Agent API $0.015/min d'Inworld n'était documenté nulle part ailleurs.
- **2026-05-10**: Le rebranding n'est pas qu'un changement de nom — c'est une clarification de la proposition de valeur. GamiWays Research Portal dit exactement ce que c'est : un portail de recherche pour le projet GamiWays, pas un projet académique.

---

## Artifact Links

| Date | Type | Link/Location | Note |
|------|------|---------------|------|
| 2026-05-10 | URL production | gamiways.memoways.com | Domaine custom actif |
| 2026-05-10 | GitHub | github.com/memoways/gamiways-research | Repo renommé |
| 2026-05-10 | GitHub Core | github.com/gami-lab/gami-digidouble-core | Repo moteur Gamilab |
| 2026-05-10 | Checkpoint | manus-webdev://32fcc862 | Harmonisation + rebranding |

---

## Narrative Seeds

- "Un portail qui ne recommande pas mais qui formule les questions à se poser — c'est plus honnête et plus durable."
- "Inworld est 4× moins cher qu'OpenAI Realtime. Cette information était sur leur site. Personne ne l'avait mise dans un tableau comparatif."
- "La suppression des préfixes A, B, C, G dans les titres — une modification dans un composant, 14 pages corrigées. C'est ça, l'architecture."
- "Le rebranding de DigiDouble à GamiWays n'a pas changé le contenu — il a clarifié l'identité. Le portail était déjà ce qu'il devait être."
- "Le Game Master comme directeur asynchrone distinct de l'Avatar — c'est l'insight architectural qui différencie GamiWays de tous les autres projets d'avatars conversationnels."

---

## Story Synthesis Prompt

```
You are helping me write the genesis story of GamiWays Research Portal 
(formerly DigiDouble Research Portal).

Using the documented journey in this file, craft a compelling narrative following this structure:
1. Open with the Friction (make readers feel the problem viscerally)
2. Establish the Conviction (why this solution, why now, why Gamilab × Memoways)
3. Show the messy Process (failures, pivots, unexpected challenges)
4. Highlight key Progression moments (breakthroughs, things clicking into place)
5. Weave in Human moments (frustration → insight cycles, emotional journey)
6. Close with Durable Insights (what you learned that applies beyond this project)

Tone: Honest, specific, humble but confident. 
Length: Blog post (800-1200 words)
```

---

## Open Windows 🪟

| Date | Description | Impact | Plan de fix |
|------|-------------|--------|-------------|
| 2026-05-16 | AVA pipeline latency non connecté : les events Query rewrite / RAG / LLM / Validator ne sont pas dans PostHog projet 137897 | Haut | Connecter le backend AVA à PostHog |
| 2026-05-10 | Cadre de décision STT interactif manquant (symétrique au Decision Framework TTS) | Moyen | Prochaine session |
| 2026-05-10 | 5 solutions STT/TTS sans données vérifiées datées (Google, Azure, Voxtral, Chatterbox, Moshi) | Moyen | Session suivante |
| 2026-05-10 | Tooltip au survol du "?" (définition glossaire en overlay) non implémenté | Bas | Prochaine session |
| 2026-05-10 | Compteur TTS page d'accueil : "14+" → "16" non mis à jour | Bas | Prochaine session |
| 2026-05-10 | Connexion semi-automatique au repo gami-digidouble-core pour mises à jour Build Status | Bas | Moyen terme |

---

## Contrats de session (DBC)

### Session — 2026-05-16

**Préconditions vérifiées au départ :**
- [x] Build passait au démarrage
- [x] Branche main propre

**Postconditions au départ :**
- [x] 5 nouvelles procédures PostHog backend
- [x] Composants SessionLatencyBar + TurnLatencyBar
- [x] Sections Sessions récentes, Tendances pipeline, Erreurs & blocages (Flowise)
- [x] Sections Tours récents, Tendances par phase (Dilemme Light)
- [x] PR #1 mergée sur main
- [x] Routage PostHog → projets vérifié (aucun mélange)
- [x] STORY.md, CHANGELOG.md, README.md mis à jour

---

### Session — 2026-05-10

**Préconditions vérifiées au départ :**
- [x] Build passait au démarrage (0 erreur TypeScript)
- [x] Aucune branche ouverte non terminée
- [x] Open Windows revues

**Postconditions au départ :**
- [x] Build passe (0 erreur TypeScript, HMR propre)
- [x] Tout commité (checkpoint 32fcc862)
- [x] STORY.md mis à jour
- [x] Open Windows mis à jour
- [x] README, CHANGELOG, STORY rebrandés GamiWays
