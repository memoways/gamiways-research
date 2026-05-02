# DigiDouble Research Portal — Development Story

> **Status**: 🟢 En production — itérations continues
> **Creator**: Ulrich Daepp — Expert no-code & vibe coding, coach transformation numérique
> **Started**: 2026-03-04
> **Last Updated**: 2026-05-02

---

## Genesis Block

### The Friction

```
Le projet DigiDouble (candidature Innosuisse, démarrage automne 2026, partenariat IDIAP 
Research Institute) nécessitait une documentation solide des choix technologiques pour 
convaincre des évaluateurs académiques et des partenaires industriels.

Problème : les décisions technologiques dans le domaine des avatars conversationnels 
et des pipelines vocaux se prennent trop souvent sur la base de la latence et du coût 
seuls — en ignorant les enjeux stratégiques déterminants : souveraineté des données, 
risque de lock-in fournisseur, dynamiques de consolidation du marché, trajectoire 
open-source, conformité RGPD/nLPD suisse.

Il n'existait pas de portail de recherche indépendant, neutre et maintenu à jour 
qui combine benchmarks techniques, analyses stratégiques et outils de décision 
interactifs pour ce domaine spécifique.
```

### The Conviction

```
Ulrich est à l'intersection du no-code, du vibe coding et de la transformation 
numérique — une position unique pour construire rapidement un portail de recherche 
de qualité académique sans équipe de développement.

Le moment est critique : le marché des avatars vidéo conversationnels et des 
pipelines vocaux est en consolidation rapide (Deepgram $1.3B, AssemblyAI $158M 
en acquisition targets). Les décisions prises en 2026 engagent des projets pour 
3-5 ans. Un portail de veille stratégique construit maintenant a une valeur 
immédiate pour DigiDouble et une valeur générique pour tout projet similaire.
```

### Initial Vision

```
Créer un site compagnon du projet DigiDouble qui documente l'état de l'art, 
les gaps de recherche et les choix technologiques pour les partenaires industriels, 
les évaluateurs Innosuisse et les chercheurs de l'IDIAP. Le portail doit être 
utile à la fois pour DigiDouble et comme référence indépendante pour tout projet 
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
| GitHub | Versioning et sync |
| Manus hosting | Déploiement sur manus.space + domaine custom digidouble.edugami.app |

---

## Feature Chronicle

### 2026-03-04 — Site fondateur : 4 pages + diagrammes SVG 🔷

**Intent**: Créer le portail de recherche initial avec les 4 pages fondatrices et une identité visuelle forte.

**Prompt**:
```
Créer un site de recherche DigiDouble avec 4 pages (Accueil, Projet, Défis de Recherche, 
État de l'Art), design "Technical Blueprint" sobre avec couleurs vives, tableaux 
comparatifs, benchmarks de latence, analyse état de l'art.
```

**Tool**: Manus AI (webdev)

**Outcome**:
- Design "Technical Blueprint" : Space Grotesk + Source Serif 4 + JetBrains Mono, palette cyan/ambre/slate
- 6 diagrammes SVG inline : Pipeline conversationnel, Architecture mémoire 3 couches, Architecture produit, Radar comparatif, Benchmarks latence, Matrice gaps de recherche
- Toggle EN/FR dans la NavBar, toutes les pages traduites
- PDF technique DigiDouble (8 pages A4) généré via WeasyPrint et uploadé sur CDN

**Surprise**: Les diagrammes SVG inline se sont révélés beaucoup plus puissants que prévu — ils permettent le toggle EN/FR et la modale zoom sans dépendance externe.

**Friction**: La latence affichée (15-40s) était incorrecte — les tests partiels donnaient 6-12s. Correction sur tout le site.

**Resolution**: Audit systématique de toutes les occurrences de la valeur de latence.

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

### 2026-03-06 — Tavus Phoenix-4 deep dive 🔹

**Intent**: Documenter le nouveau modèle Tavus avec tableau comparatif officiel.

**Outcome**: Fiche deep dive complète avec architecture Gaussian Splatting implicite, boucle Raven-1, 6 inspirations pour DigiDouble.

**Time**: ~1h

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

### 2026-04-13 — Nettoyage Innosuisse + Emotional Toolbox 🔷

**Intent**: Préparer le dossier Innosuisse en corrigeant les références internes et en ajoutant la section Emotional Toolbox.

**Outcome**:
- Suppression complète des références "Edugami"/"Storygami" sur tout le site
- Section "Emotional Toolbox & Character Design" (3 cartes ET-1/ET-2/ET-3)
- Fichier `dossier_corrections.md` avec 7 corrections prioritisées

**Time**: ~2h

---

### 2026-04-17 — LemonSlice + CostSimulator 🔷

**Intent**: Intégrer LemonSlice (acteur émergent multi-style) et créer un simulateur de coûts interactif pour les avatars vidéo.

**Outcome**:
- CostSimulator : slider 30–3000 min/mo, 5 presets, toggle coûts cachés, 8 filtres use-case, barre coût segmentée fixe/variable
- LemonSlice (LS-2.1) : fiche complète, 7e axe "Multi-style" dans le radar, digiDoubleScore 8/10

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

**Intent**: Rendre le portail accessible aux non-experts avec un glossaire et améliorer la navigation entre les pages.

**Outcome**:
- Menu "About / À propos" avec page À propos et Glossaire (30 termes EN/FR, filtrables, recherche plein texte)
- Composant `GlossaryLink` : badge "?" dans les en-têtes de colonnes et sliders de toutes les pages techniques
- Navigation bidirectionnelle : "Voir dans les Benchmarks" depuis les fiches + "Fiche détail" depuis les tableaux
- Suppression de tous les préfixes lettre/numéro dans les titres de section
- Alignement complet titres pages ↔ labels menu (8 labels corrigés)

**Surprise**: La suppression des préfixes (A, B, C, G…) en modifiant uniquement `SectionHeader.tsx` a corrigé 14 pages en une seule modification — la puissance des composants centralisés.

**Time**: ~5h

---

### 2026-05-01 — Restructuration Voice Pipeline + VoiceScoring 2 colonnes 🔷

**Intent**: Améliorer l'UX de la page de scoring et réorganiser la logique STT→TTS.

**Outcome**:
- VoiceScoring : layout 2 colonnes sticky (panneau contrôle 1/3 + résultats 2/3), responsive dès tablet
- STT en premier dans les onglets, TTS en second
- VoiceSTT : suppression du préfixe et de la sous-navigation parasite
- Page Benchmarks : synthèse STT→TTS, suppression section modèles vidéo

**Friction**: Le layout sticky sur tablet provoquait une superposition des sliders — les `input[type=range]` se chevauchaient visuellement.

**Resolution**: Passage de `lg` à `md` pour le breakpoint + `overflow-y-auto` sur le panneau gauche + `sticky` uniquement sur `md:` et au-dessus.

**Time**: ~2h

---

### 2026-05-01-02 — Données benchmarks + AssemblyAI Voice Agent API 🔷

**Intent**: Mettre à jour les données avec les chiffres actuels (mai 2026) et intégrer les nouvelles APIs Voice Agent.

**Outcome**:
- Champs `dataUpdatedAt`, `dataUpdateNote`, `sources` dans toutes les entrées STT et TTS
- Section "Data Freshness" dans STTDetail et TTSDetail
- AssemblyAI Universal-3 Pro (lancement 29 avr. 2026) : $4.50/hr, turn detection sémantique+acoustique
- Deepgram Voice Agent API $4.50/hr, BYO LLM & TTS, EU endpoint
- Inworld Realtime API $0.015/min, clonage vocal natif (3 000 voix custom)
- Colonne "Voice Agent API" dans le tableau STT de VoiceBenchmarks
- Compteur page d'accueil : "3 STT architectures" → "10 moteurs STT"

**Surprise**: Inworld est 4× moins cher qu'OpenAI Realtime ($0.015/min vs $0.06/min) — une information stratégique majeure pour DigiDouble.

**Time**: ~4h

---

## Pivots & Breakages

### 2026-03-04 — Latence 15-40s → 6-12s

**What broke / What changed**: La valeur de latence affichée sur tout le site (15-40s) était incorrecte — les tests partiels donnaient 6-12s.

**Why**: Les premières estimations étaient basées sur des benchmarks génériques de diffusion vidéo, pas sur des tests réels de pipelines conversationnels.

**What you learned**:
- Toujours sourcer les chiffres de latence avec des conditions de test précises
- Un audit systématique de toutes les occurrences d'une valeur est nécessaire avant publication
- La correction d'une valeur incorrecte sur un site de recherche est plus coûteuse que de la valider en amont

**Emotional state**: Frustration initiale, puis soulagement — la correction a été l'occasion de recentrer Research Challenges sur les seuils cognitifs UX réels.

---

### 2026-04-29 — Boucle infinie dans le scoring par URL

**What broke / What changed**: L'implémentation initiale du partage de scoring par URL créait une boucle infinie : mise à jour des sliders → mise à jour des query params → re-render → mise à jour des sliders…

**Why**: Utilisation de `pushState` (qui déclenche un événement de navigation) au lieu de `replaceState` + absence de debounce.

**What you learned**:
- `replaceState` est la bonne approche pour la synchronisation URL sans navigation
- Les effets de bord entre React state et URL params nécessitent un debounce ou une référence de comparaison
- Tester la synchronisation bidirectionnelle dès le début, pas après avoir construit toute la logique

**Emotional state**: Classique "ça marche dans un sens mais pas dans l'autre" — résolu en 30 minutes une fois le problème bien posé.

---

### 2026-05-01 — Superposition des sliders sur tablet

**What broke / What changed**: Le layout 2 colonnes sticky sur tablet provoquait une superposition visuelle des `input[type=range]` — les sliders de différents critères se chevauchaient.

**Why**: Le breakpoint `lg` (1024px) était trop large pour les tablets (768-1023px) qui restaient en layout 1 colonne mais avec un panneau sticky qui débordait.

**What you learned**:
- Tester les layouts sticky sur les breakpoints intermédiaires (tablet = 768-1023px) dès la conception
- `overflow-y-auto` sur le panneau sticky est indispensable pour les contenus longs
- Les `input[type=range]` ont des comportements de z-index spécifiques à tester explicitement

**Emotional state**: Signalé par l'utilisateur avec capture d'écran — correction rapide une fois le problème visible.

---

## Pulse Checks

### 2026-05-02 — Pulse Check #1

**Energy level**: 8/10

**Current doubt**: La maintenance des données (benchmarks, prix, latences) va devenir un travail à part entière à mesure que le portail grandit. Comment automatiser ou structurer les mises à jour sans perdre la qualité éditoriale ?

**Current satisfaction**: Le portail est devenu une référence réelle — les fiches détail avec sources vérifiées et dates de mise à jour donnent une crédibilité que peu de sites comparatifs ont. La navigation bidirectionnelle (tableaux ↔ fiches ↔ benchmarks ↔ glossaire) crée une expérience cohérente.

**If you stopped now, what would you regret?**: Ne pas avoir créé le cadre de décision STT interactif (symétrique au Decision Framework TTS), et ne pas avoir documenté les 5 solutions STT/TTS restantes avec le même niveau de détail que les 5 premières.

**One word for how this feels**: **Momentum**

---

## Insights Vault

- **2026-03-04**: Les composants centralisés (SectionHeader, GlossaryLink, InternalLink) multiplient l'impact de chaque modification — une correction dans un composant corrige 14 pages simultanément.
- **2026-03-17**: Un portail de recherche neutre qui "ne recommande pas" mais "formule les questions à se poser" est plus durable qu'un portail qui donne des recommandations figées — l'état de l'art évolue trop vite.
- **2026-04-17**: Les filtres use-case (EU-GDPR, Sovereign, Low-latency) révèlent des informations stratégiques invisibles dans les benchmarks bruts — la valeur est dans la combinaison des critères, pas dans les chiffres isolés.
- **2026-04-29**: La séparation données/rendu (sttData.ts, ttsData.ts, strategicData.ts) est la décision architecturale la plus importante du projet — elle permet de mettre à jour 26 fiches sans toucher au code de rendu.
- **2026-05-02**: Vérifier les données sur les sites officiels (assemblyai.com, deepgram.com, inworld.ai) révèle systématiquement des informations absentes des benchmarks tiers — le prix Voice Agent API $0.015/min d'Inworld n'était documenté nulle part ailleurs.

---

## Artifact Links

| Date | Type | Link/Location | Note |
|------|------|---------------|------|
| 2026-05-02 | URL production | https://digidouble.edugami.app | Domaine custom actif |
| 2026-05-02 | URL Manus | https://digidouble-jcuda4rf.manus.space | URL Manus secondaire |
| 2026-03-05 | PDF | CDN Manus | PDF technique DigiDouble v3 (8 pages A4) |
| 2026-05-02 | Checkpoint | manus-webdev://1f5698d3 | Dernier checkpoint stable |

---

## Narrative Seeds

- "Un portail qui ne recommande pas mais qui formule les questions à se poser — c'est plus honnête et plus durable."
- "Inworld est 4× moins cher qu'OpenAI Realtime. Cette information était sur leur site. Personne ne l'avait mise dans un tableau comparatif."
- "La suppression des préfixes A, B, C, G dans les titres — une modification dans un composant, 14 pages corrigées. C'est ça, l'architecture."
- "Le scoring personnalisé avec partage par URL : l'utilisateur peut envoyer son classement DigiDouble Phase 2 à un collègue. Le portail devient un outil de collaboration."

---

## Story Synthesis Prompt

```
You are helping me write the genesis story of DigiDouble Research Portal.

Using the documented journey in this file, craft a compelling narrative following this structure:
1. Open with the Friction (make readers feel the problem viscerally)
2. Establish the Conviction (why this solution, why now, why you)
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
| 2026-05-02 | Cadre de décision STT interactif manquant (symétrique au Decision Framework TTS) | Moyen | Prochaine session |
| 2026-05-02 | 5 solutions STT/TTS restantes sans données vérifiées datées (Google, Azure, Voxtral, Chatterbox, Moshi) | Moyen | Session suivante |
| 2026-05-02 | Tooltip au survol du "?" (définition glossaire en overlay) non implémenté | Bas | Prochaine session |
| 2026-05-02 | Compteur TTS page d'accueil : "14+" → "16" non mis à jour | Bas | Prochaine session |

---

## Contrats de session (DBC)

### Dernière session — 2026-05-02

**Préconditions vérifiées au départ :**
- [x] Build passait au démarrage (0 erreur TypeScript)
- [x] Aucune branche ouverte non terminée
- [x] STORY.md lu et contexte compris
- [x] Open Windows revues

**Postconditions au départ :**
- [x] Build passe (0 erreur TypeScript, HMR propre)
- [x] Tout commité et pushé (checkpoint 1f5698d3)
- [x] STORY.md mis à jour
- [x] Open Windows mis à jour

---

## AI Instructions

```
STORY.md MAINTENANCE PROTOCOL — Pragmatic Edition

1. AFTER EACH FEATURE (Finish What You Start):
   - Add entry to "Feature Chronicle" immediately
   - 🔷 Major = new capability, significant UI change, integration, architecture shift
   - 🔹 Minor = bug fix, tweak, small improvement, logging enhancement
   - Verify feature is truly complete before marking done — no half-open features

2. ON ERRORS/PIVOTS (Crash Early):
   - Add entry to "Pivots & Breakages" immediately when discovered
   - Capture technical details AND emotional context
   - Document what was learned
   - If a broken window is found but NOT fixed this session → add to "Open Windows"

3. ON BROKEN WINDOWS (Tip 5):
   - Any known bug, tech debt, or undocumented TODO → "Open Windows" table
   - Never leave a broken window undocumented
   - At session start, review Open Windows and decide: fix now or document why not

4. EVERY 3-5 FEATURES:
   - Trigger Pulse Check: Ask creator ONE question from:
     * "How's your energy right now, 1-10?"
     * "What's your biggest doubt at this moment?"
     * "What's giving you satisfaction in this build?"
     * "If you had to stop now, what would you regret not finishing?"
     * "One word for how this project feels today?"
   - Record answer in "Pulse Checks" section
   - Update "Last Updated" date

5. ON INSIGHTS:
   - When creator expresses a learning, add to "Insights Vault" with date

6. ON ARTIFACTS:
   - When screenshots/links are shared, add to "Artifact Links"

7. AT SESSION START (DBC — préconditions):
   - Review "Contrats de session" — update checklist
   - Review "Open Windows" from last session
   - Confirm what was the last committed state (git log --oneline -5)

8. AT SESSION END (DBC — postconditions):
   - Update "Contrats de session" postconditions checklist
   - Update Open Windows table
   - Verify build passes before closing

9. ALWAYS:
   - Update "Last Updated" date at top of file after changes
   - Preserve exact technical details in Feature Chronicle
   - Don't sanitize failures or confusion—that's the learning gold
   - Include Time estimate for each feature for future planning

10. FORMAT:
   - Use ISO date format [YYYY-MM-DD] consistently
   - Include 🔷 (major) and 🔹 (minor) emojis for feature categorization
   - Maintain markdown structure for readability
   - Keep prose concise but specific—avoid fluff
```
