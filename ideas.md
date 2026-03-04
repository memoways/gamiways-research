# DigiDouble Research — Idées de design

## Contexte
Site destiné à des chercheurs (IDIAP, Innosuisse), ingénieurs et partenaires académiques.
Objectif : sobriété, lisibilité, densité d'information, crédibilité scientifique.
Pas de marketing, pas d'animations de blocs. Couleurs vives pour le caractère.

---

<response>
<probability>0.07</probability>
<text>

## Approche A — Terminal Scientifique

**Design Movement**: Brutalism fonctionnel + esthétique CLI/terminal
**Core Principles**:
- Grille asymétrique avec colonnes de largeurs inégales
- Typographie monospace pour les données techniques, sans-serif condensé pour les titres
- Hiérarchie par densité et contraste, pas par décoration
- Chaque élément justifie sa présence

**Color Philosophy**: Fond blanc cassé (#F5F4F0), texte quasi-noir (#1A1A1A), accent unique orange électrique (#FF4D00) pour les éléments critiques (chiffres, alertes, liens actifs). Vert terminal (#00C853) pour les statuts positifs. Pas de dégradés.

**Layout Paradigm**: Navigation latérale fixe étroite (icônes + labels courts). Contenu principal en deux colonnes asymétriques (70/30). Tableaux et code blocks omniprésents.

**Signature Elements**:
- Bordures gauches colorées pour les sections (style diff git)
- Badges de statut style terminal (`[AVAILABLE]`, `[R&D]`, `[GAP]`)
- Séparateurs horizontaux fins avec labels centrés

**Interaction Philosophy**: Hover = soulignement + changement couleur accent. Pas d'animations de translation. Focus visible et accessible.

**Animation**: Uniquement fade-in sur scroll (opacity 0→1, 200ms). Pas de transforms.

**Typography System**: JetBrains Mono (données/code) + DM Sans (corps) + Syne (titres display)

</text>
</response>

<response>
<probability>0.06</probability>
<text>

## Approche B — Documentation Technique Vivante

**Design Movement**: Design système de documentation (style Stripe Docs / Linear)
**Core Principles**:
- Navigation par ancres latérales, contenu scrollable
- Densité maximale sans surcharge cognitive
- Couleurs fonctionnelles : chaque couleur a une signification précise
- Tableaux comparatifs comme éléments de design à part entière

**Color Philosophy**: Fond blanc pur, texte #111827. Accent bleu électrique (#2563EB) pour liens et actions. Jaune ambre (#F59E0B) pour les avertissements/gaps. Rouge (#EF4444) pour les problèmes critiques. Vert (#10B981) pour les solutions disponibles.

**Layout Paradigm**: Sidebar gauche fixe (navigation), contenu central large (max 800px), sidebar droite optionnelle (table des matières). Inspiré de la documentation technique.

**Signature Elements**:
- Callout boxes colorées (style Notion/Obsidian mais plus technique)
- Tableaux avec en-têtes colorés par catégorie
- Timeline verticale pour l'évolution du projet

**Interaction Philosophy**: Navigation par ancres smooth. Highlight de la section active dans la sidebar. Tooltips sur les termes techniques.

**Animation**: Scroll-triggered highlights sur les sections. Transitions de page 150ms.

**Typography System**: IBM Plex Sans (corps + interface) + IBM Plex Mono (code/données) + Fraunces (titres display)

</text>
</response>

<response>
<probability>0.08</probability>
<text>

## Approche C — Ingénierie Structurée ← CHOISIE

**Design Movement**: Technical Blueprint — esthétique des documents de spécification d'ingénierie, des RFC et des papers académiques mis en page avec caractère.

**Core Principles**:
- Structure en sections numérotées comme un paper technique
- Grille stricte avec gouttières généreuses
- Couleurs vives comme marqueurs sémantiques, pas comme décoration
- Typographie à deux vitesses : display bold pour les titres, texte courant pour le contenu

**Color Philosophy**: Fond blanc (#FFFFFF), texte #0F172A (slate-950). Accent primaire : cyan électrique (#06B6D4) pour les éléments interactifs et titres de section. Accent secondaire : orange (#F97316) pour les alertes et points critiques. Vert (#22C55E) pour les éléments disponibles/positifs. Fond de code : #0F172A (dark). Pas de dégradés sauf très subtils sur les cards.

**Layout Paradigm**: Navigation top fixe avec ancres. Contenu en colonnes variables selon le type (pleine largeur pour tableaux, 2/3 pour texte, sidebar pour navigation secondaire). Sections délimitées par des lignes fines et numéros de section.

**Signature Elements**:
- Numéros de section en grand format (01, 02...) en couleur accent atténuée
- Tags de statut colorés : `AVAILABLE`, `R&D REQUIRED`, `GAP`, `TARGET`
- Tableaux comparatifs avec colonnes colorées par catégorie
- Blocs de code/données avec fond sombre

**Interaction Philosophy**: Hover sur les lignes de tableau = highlight discret. Navigation par ancres avec indicateur de position. Liens avec underline offset.

**Animation**: Aucune animation de bloc. Uniquement transitions CSS sur hover (150ms ease). Scroll behavior smooth.

**Typography System**: Space Grotesk (titres, interface) + Source Serif 4 (corps de texte long) + JetBrains Mono (données, code, benchmarks)

</text>
</response>

---

## Design retenu : Approche C — Ingénierie Structurée

Space Grotesk + Source Serif 4 + JetBrains Mono. Cyan électrique + orange + vert comme accents sémantiques sur fond blanc. Sections numérotées, tableaux denses, tags de statut. Sobre mais avec caractère.
