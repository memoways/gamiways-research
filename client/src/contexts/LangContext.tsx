/*
 * LangContext — i18n EN/FR for DigiDouble Research Portal
 * Default language: English (EN)
 * Toggle available in NavBar
 */
import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "fr";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

// ─── Translations ─────────────────────────────────────────────────────────────

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // NavBar
    "nav.home": "Home",
    "nav.project": "Project",
    "nav.research": "Research Challenges",
    "nav.stateofart": "State of the Art",
    "nav.portal": "Research Portal",

    // Footer
    "footer.collab": "A research collaboration between",
    "footer.innosuisse": "Innosuisse project",
    "footer.rights": "All rights reserved.",
    "footer.portal": "Research Portal",

    // StatusBadge labels
    "badge.available": "Available",
    "badge.gap": "Gap",
    "badge.rd": "R&D",
    "badge.target": "Target",

    // Home page
    "home.label": "RESEARCH PORTAL",
    "home.badge": "INNOSUISSE / IDIAP",
    "home.title": "DigiDouble",
    "home.tagline": "Platform for creating interactive conversational experiences with video avatars — combining real-time AI dialogue, photorealistic avatar generation, and intelligent cinematographic sequencing.",
    "home.desc": "This portal documents the fundamental research challenges for the Memoways × Gamilab × IDIAP collaboration, within an Innosuisse project.",
    "home.cta.project": "Discover the project",
    "home.cta.sota": "State of the Art",
    "home.metric.latency_current": "Current latency",
    "home.metric.latency_current_sub": "per exchange",
    "home.metric.latency_target": "Target latency",
    "home.metric.latency_target_sub": "end-to-end",
    "home.metric.reduction": "Reduction required",
    "home.metric.reduction_sub": "improvement",
    "home.metric.streams": "Parallel streams",
    "home.metric.streams_sub": "synchronized",
    "home.pipeline.title": "Conversational Pipeline",
    "home.pipeline.desc": "Each exchange passes through 6 stages — avatar generation is the main bottleneck (5–15s currently, target 500ms).",
    "home.gap.label": "THE GAP",
    "home.gap.title": "Why This Research?",
    "home.gap.body": "Current avatar platforms (HeyGen, Synthesia) produce high-quality video but with 15–40 second latency per exchange — incompatible with natural conversation. Real-time solutions (NVIDIA ACE, Beyond Presence) require proprietary infrastructure and do not allow behavioral personalization from existing archives. DigiDouble aims to bridge this gap: sovereign, open, personalized, and real-time.",
    "home.gap.challenge": "The fundamental challenge: achieve a 10–20× latency reduction while preserving behavioral fidelity of the specific person — a problem at the intersection of speech processing, computer vision, NLP, and systems engineering.",
    "home.nav.title": "Portal Navigation",
    "home.nav.01.title": "Context & Vision",
    "home.nav.01.desc": "Two founding projects, product architecture, competitive positioning.",
    "home.nav.02.title": "Research Challenges",
    "home.nav.02.desc": "IDIAP axes: conversational memory, expressive avatar, orchestration.",
    "home.nav.03.title": "State of the Art",
    "home.nav.03.desc": "Comparative analysis, benchmarks, research gaps, opportunities.",

    // Project page
    "project.label": "01 — CONTEXT & VISION",
    "project.title": "DigiDouble",
    "project.subtitle": "Interactive Conversational Experiences with Personalized Video Avatars",
    "project.intro": "DigiDouble is a platform for creating interactive conversational experiences with video avatars — combining real-time AI dialogue, photorealistic avatar generation, and intelligent cinematographic sequencing. The platform is designed for content creators, educators, and storytellers who want to create immersive experiences without requiring technical expertise.",
    "project.s1.number": "01",
    "project.s1.title": "Founding Projects",
    "project.s1.subtitle": "Two real use cases that define the product requirements.",
    "project.s2.number": "02",
    "project.s2.title": "Product Vision",
    "project.s2.subtitle": "DigiDouble serves two markets through a shared technical core.",
    "project.s3.number": "03",
    "project.s3.title": "Competitive Analysis",
    "project.s3.subtitle": "Positioning relative to existing solutions.",
    "project.s4.number": "04",
    "project.s4.title": "Technical Infrastructure",
    "project.s4.subtitle": "Sovereign architecture, Swiss-hosted, privacy by design.",
    "project.s5.number": "05",
    "project.s5.title": "Research Collaboration",
    "project.s5.subtitle": "Memoways × Gamilab × IDIAP — Innosuisse project.",
    "project.mode01": "MODE 01 — EDUGAMI",
    "project.mode01.title": "Pedagogical / \"Lean Forward\"",
    "project.mode01.desc": "Avatar tutor interacting with learners in a structured pedagogical environment. The user navigates through a knowledge graph, with the avatar guiding, questioning, and evaluating.",
    "project.mode01.control": "Pedagogical control: STRONG",
    "project.mode02": "MODE 02 — STORYGAMI",
    "project.mode02.title": "Narrative / \"Lean Back\"",
    "project.mode02.desc": "Avatar character in a full-screen immersive narrative experience. The user interacts with a fictional character who reacts, remembers, and evolves.",
    "project.mode02.control": "Narrative freedom: STRONG",
    "project.arch.title": "Architecture — Two Modes, One Shared Engine",
    "project.radar.title": "Radar Comparison — Avatar Platforms",
    "project.analogy": "Analogy: HeyGen/Synthesia = iMovie (simple, limited). Flowise + custom = Final Cut XML (powerful, complex). DigiDouble = Final Cut Pro (powerful AND usable by non-technical creators).",

    // Research page
    "research.label": "02 — RESEARCH CHALLENGES",
    "research.title": "Research Challenges",
    "research.subtitle": "Fundamental research axes for the IDIAP collaboration",
    "research.intro": "The DigiDouble project raises fundamental research questions at the intersection of several disciplines. These challenges are not mere engineering problems — they require advances in basic research to be solved. This document presents the three main axes identified in collaboration with IDIAP researchers.",
    "research.s1.number": "01",
    "research.s1.title": "End-to-End Latency",
    "research.s1.subtitle": "A 10–20× reduction is needed to achieve natural conversational flow.",
    "research.s2.number": "02",
    "research.s2.title": "Conversational Memory",
    "research.s2.subtitle": "Dr. Petr Motlicek · Speech & Audio Processing, IDIAP",
    "research.s3.number": "03",
    "research.s3.title": "Expressive Avatar & Behavioral Fidelity",
    "research.s3.subtitle": "Dr. Mathew Magimai-Doss · Speech & Audio Processing, IDIAP",
    "research.s4.number": "04",
    "research.s4.title": "Open Research Questions",
    "research.s4.subtitle": "Unresolved questions structuring the research program.",
    "research.s5.number": "05",
    "research.s5.title": "Mutual Contributions",
    "research.s5.subtitle": "What each partner brings to the collaboration.",
    "research.pipeline.title": "Conversational Pipeline",
    "research.seq.title": "Sequence Diagram — Target <2s",
    "research.mem.arch.title": "Memory Architecture — System View",
    "research.avatar.title": "Expressive Avatar Pipeline — Behavioral Extraction → Real-Time Generation",
    "research.current": "CURRENT STATE — 15–40 seconds",
    "research.target": "TARGET — <2 seconds",
    "research.h1": "H1: Streaming pipeline (LLM → TTS → Avatar) reduces latency by 60%",
    "research.h2": "H2: 3-layer memory reduces context window by 90% while maintaining 95% coherence",
    "research.h3": "H3: Behavioral extraction from 10min video achieves 80% fidelity",
    "research.h4": "H4: Deterministic-organic orchestration improves perceived naturalness by 40%",
    "research.mem.title": "Three-Layer Memory Model",
    "research.mem.gap.title": "The Conversational Memory Gap",
    "research.mem.gap.body": "An avatar must maintain coherence over long sessions (1h+) and multiple sessions over days or weeks. Naive approaches fail: keeping the full history in the LLM context is prohibitively expensive. Truncating history destroys continuity. The challenge: achieve the contextual richness of full history with the cost and speed of minimal context.",
    "research.avatar.gap.title": "The Behavioral Fidelity Gap",
    "research.avatar.gap.body": "Current systems (HeyGen, Synthesia) generate avatars that look like the person but do not behave like them. Micro-expressions, gestural vocabulary, posture, speech rhythm — all these behavioral markers are absent. The result: an uncanny valley of familiarity where users recognize the face but not the behavior.",
    "research.uncanny": "⚠ Uncanny valley of familiarity — users recognize the face but not the behavior → destruction of suspension of disbelief",

    // State of Art page
    "sota.label": "03 — STATE OF THE ART",
    "sota.title": "State of the Art",
    "sota.subtitle": "Existing solutions, benchmarks, research gaps, and technological challenges",
    "sota.intro": "This analysis covers the landscape of existing solutions in the fields relevant to DigiDouble: conversational avatar platforms, speech synthesis, conversational memory, and real-time orchestration. The goal is to identify where the state of the art stands, what is missing, and where fundamental research can make a difference.",
    "sota.s1.number": "01",
    "sota.s1.title": "Tools & Platforms Comparison",
    "sota.s1.subtitle": "Evaluation of existing solutions on key criteria for DigiDouble.",
    "sota.s2.number": "02",
    "sota.s2.title": "Latency Benchmarks",
    "sota.s2.subtitle": "State of the art performance by component of the conversational pipeline (2025–2026).",
    "sota.s3.number": "03",
    "sota.s3.title": "Research Gaps & Opportunities",
    "sota.s3.subtitle": "What is missing, what exists, and where DigiDouble can contribute.",
    "sota.s4.number": "04",
    "sota.s4.title": "Academic Research Assessment",
    "sota.s4.subtitle": "Key publications, research groups, and open questions.",
    "sota.s5.number": "05",
    "sota.s5.title": "Business Challenges & Market Opportunities",
    "sota.s5.subtitle": "Market context, business models, and strategic opportunities.",
    "sota.s6.number": "06",
    "sota.s6.title": "Recommended Technologies",
    "sota.s6.subtitle": "Recommended technology stack for DigiDouble.",
    "sota.tab.commercial": "Commercial Platforms",
    "sota.tab.opensource": "Open-Source Solutions",
    "sota.tab.tts": "TTS & Speech Synthesis",
    "sota.radar.title": "Radar View — Multi-Criteria Comparison",
    "sota.benchmark.title": "Latency Benchmarks by Component",
    "sota.gap.matrix.title": "Urgency × Difficulty Matrix",
    "sota.gap.radar.title": "Radar Comparison — Platforms",
    "sota.trilemma.title": "Analysis: the Quality / Latency / Cost trilemma",
    "sota.trilemma.body": "It is impossible to simultaneously optimize all three dimensions with current approaches. Low-latency platforms (<100ms) like Beyond Presence or NVIDIA ACE require expensive proprietary infrastructure. Sovereign open-source solutions remain at 2–15s. Fundamental research is needed to find architectures that break this trilemma.",
    "sota.validity.title": "Research Validity",
    "sota.validity.body": "The analysis confirms the scientific interest of the DigiDouble project. No existing solution combines all five required properties: real-time (<2s), behavioral personalization, sovereignty, conversational memory, and accessibility for non-technical creators. This combination represents a genuine research frontier.",
  },

  fr: {
    // NavBar
    "nav.home": "Accueil",
    "nav.project": "Projet",
    "nav.research": "Défis de recherche",
    "nav.stateofart": "État de l'art",
    "nav.portal": "Research Portal",

    // Footer
    "footer.collab": "Une collaboration de recherche entre",
    "footer.innosuisse": "Projet Innosuisse",
    "footer.rights": "Tous droits réservés.",
    "footer.portal": "Research Portal",

    // StatusBadge labels
    "badge.available": "Disponible",
    "badge.gap": "Gap",
    "badge.rd": "R&D",
    "badge.target": "Cible",

    // Home page
    "home.label": "RESEARCH PORTAL",
    "home.badge": "INNOSUISSE / IDIAP",
    "home.title": "DigiDouble",
    "home.tagline": "Plateforme de création d'expériences conversationnelles interactives avec avatars vidéo — combinant dialogue IA temps réel, génération d'avatar photorealistic et séquençage cinématographique intelligent.",
    "home.desc": "Ce portail documente les défis de recherche fondamentale pour la collaboration Memoways × Gamilab × IDIAP, dans le cadre d'un projet Innosuisse.",
    "home.cta.project": "Découvrir le projet",
    "home.cta.sota": "État de l'art",
    "home.metric.latency_current": "Latence actuelle",
    "home.metric.latency_current_sub": "par échange",
    "home.metric.latency_target": "Latence cible",
    "home.metric.latency_target_sub": "end-to-end",
    "home.metric.reduction": "Réduction requise",
    "home.metric.reduction_sub": "amélioration",
    "home.metric.streams": "Streams parallèles",
    "home.metric.streams_sub": "synchronisés",
    "home.pipeline.title": "Pipeline Conversationnel",
    "home.pipeline.desc": "Chaque échange passe par 6 étapes — la génération d'avatar est le goulot d'étranglement principal (5–15s actuellement, cible 500ms).",
    "home.gap.label": "LE GAP",
    "home.gap.title": "Pourquoi cette recherche ?",
    "home.gap.body": "Les plateformes d'avatars actuelles (HeyGen, Synthesia) produisent des vidéos de haute qualité mais avec 15–40 secondes de latence par échange — incompatible avec une conversation naturelle. Les solutions temps réel (NVIDIA ACE, Beyond Presence) nécessitent une infrastructure propriétaire et ne permettent pas la personnalisation comportementale depuis des archives existantes. DigiDouble vise à combler ce gap : souverain, ouvert, personnalisé, et temps réel.",
    "home.gap.challenge": "Le défi fondamental : atteindre une réduction de latence de 10–20× tout en préservant la fidélité comportementale de la personne spécifique — un problème à l'intersection du traitement de la parole, de la vision par ordinateur, du NLP et de l'ingénierie des systèmes.",
    "home.nav.title": "Navigation du portail",
    "home.nav.01.title": "Contexte & Vision",
    "home.nav.01.desc": "Deux projets fondateurs, architecture produit, positionnement compétitif.",
    "home.nav.02.title": "Défis de Recherche",
    "home.nav.02.desc": "Axes IDIAP : mémoire conversationnelle, avatar expressif, orchestration.",
    "home.nav.03.title": "État de l'Art",
    "home.nav.03.desc": "Analyse comparative, benchmarks, gaps de recherche, opportunités.",

    // Project page
    "project.label": "01 — CONTEXTE & VISION",
    "project.title": "DigiDouble",
    "project.subtitle": "Expériences Conversationnelles Interactives avec Avatars Vidéo Personnalisés",
    "project.intro": "DigiDouble est une plateforme de création d'expériences conversationnelles interactives avec avatars vidéo — combinant dialogue IA temps réel, génération d'avatar photorealistic et séquençage cinématographique intelligent. La plateforme est conçue pour les créateurs de contenu, éducateurs et conteurs qui souhaitent créer des expériences immersives sans nécessiter d'expertise technique.",
    "project.s1.number": "01",
    "project.s1.title": "Projets Fondateurs",
    "project.s1.subtitle": "Deux cas d'usage réels qui définissent les exigences produit.",
    "project.s2.number": "02",
    "project.s2.title": "Vision Produit",
    "project.s2.subtitle": "DigiDouble sert deux marchés via un cœur technique partagé.",
    "project.s3.number": "03",
    "project.s3.title": "Analyse Compétitive",
    "project.s3.subtitle": "Positionnement par rapport aux solutions existantes.",
    "project.s4.number": "04",
    "project.s4.title": "Infrastructure Technique",
    "project.s4.subtitle": "Architecture souveraine, hébergée en Suisse, privacy by design.",
    "project.s5.number": "05",
    "project.s5.title": "Collaboration de Recherche",
    "project.s5.subtitle": "Memoways × Gamilab × IDIAP — Projet Innosuisse.",
    "project.mode01": "MODE 01 — EDUGAMI",
    "project.mode01.title": "Pédagogique / \"Lean Forward\"",
    "project.mode01.desc": "Avatar tuteur interagissant avec des apprenants dans un environnement pédagogique structuré. L'utilisateur navigue dans un graphe de connaissances, avec l'avatar qui guide, questionne et évalue.",
    "project.mode01.control": "Contrôle pédagogique : FORT",
    "project.mode02": "MODE 02 — STORYGAMI",
    "project.mode02.title": "Narratif / \"Lean Back\"",
    "project.mode02.desc": "Avatar personnage dans une expérience narrative immersive plein écran. L'utilisateur interagit avec un personnage fictif qui réagit, se souvient et évolue.",
    "project.mode02.control": "Liberté narrative : FORTE",
    "project.arch.title": "Architecture — Deux Modes, Un Moteur Partagé",
    "project.radar.title": "Comparatif Radar — Plateformes Avatar",
    "project.analogy": "Analogie : HeyGen/Synthesia = iMovie (simple, limité). Flowise + custom = Final Cut XML (puissant, complexe). DigiDouble = Final Cut Pro (puissant ET utilisable par des créateurs non-techniques).",

    // Research page
    "research.label": "02 — DÉFIS DE RECHERCHE",
    "research.title": "Défis de Recherche",
    "research.subtitle": "Axes de recherche fondamentale pour la collaboration IDIAP",
    "research.intro": "Le projet DigiDouble soulève des questions de recherche fondamentale à l'intersection de plusieurs disciplines. Ces défis ne sont pas de simples problèmes d'ingénierie — ils nécessitent des avancées en recherche fondamentale pour être résolus. Ce document présente les trois axes principaux identifiés en collaboration avec les chercheurs de l'IDIAP.",
    "research.s1.number": "01",
    "research.s1.title": "Latence End-to-End",
    "research.s1.subtitle": "Une réduction de 10–20× est nécessaire pour atteindre un flux conversationnel naturel.",
    "research.s2.number": "02",
    "research.s2.title": "Mémoire Conversationnelle",
    "research.s2.subtitle": "Dr. Petr Motlicek · Speech & Audio Processing, IDIAP",
    "research.s3.number": "03",
    "research.s3.title": "Avatar Expressif & Fidélité Comportementale",
    "research.s3.subtitle": "Dr. Mathew Magimai-Doss · Speech & Audio Processing, IDIAP",
    "research.s4.number": "04",
    "research.s4.title": "Questions de Recherche Ouvertes",
    "research.s4.subtitle": "Questions non résolues structurant le programme de recherche.",
    "research.s5.number": "05",
    "research.s5.title": "Contributions Mutuelles",
    "research.s5.subtitle": "Ce que chaque partenaire apporte à la collaboration.",
    "research.pipeline.title": "Pipeline Conversationnel",
    "research.seq.title": "Diagramme de Séquence — Cible <2s",
    "research.mem.arch.title": "Architecture Mémoire — Vue Système",
    "research.avatar.title": "Pipeline Avatar Expressif — Extraction Comportementale → Génération Temps Réel",
    "research.current": "ÉTAT ACTUEL — 15–40 secondes",
    "research.target": "CIBLE — <2 secondes",
    "research.h1": "H1 : Le pipeline streaming (LLM → TTS → Avatar) réduit la latence de 60%",
    "research.h2": "H2 : La mémoire 3 couches réduit la fenêtre de contexte de 90% tout en maintenant 95% de cohérence",
    "research.h3": "H3 : L'extraction comportementale depuis 10min de vidéo atteint 80% de fidélité",
    "research.h4": "H4 : L'orchestration déterministe-organique améliore la naturalité perçue de 40%",
    "research.mem.title": "Modèle Mémoire à Trois Couches",
    "research.mem.gap.title": "Le Gap de Mémoire Conversationnelle",
    "research.mem.gap.body": "Un avatar doit maintenir la cohérence sur des sessions longues (1h+) et des sessions multiples sur des jours ou semaines. Les approches naïves échouent : garder l'historique complet dans le contexte LLM est prohibitivement coûteux. Tronquer l'historique détruit la continuité. Le défi : atteindre la richesse contextuelle de l'historique complet avec le coût et la vitesse d'un contexte minimal.",
    "research.avatar.gap.title": "Le Gap de Fidélité Comportementale",
    "research.avatar.gap.body": "Les systèmes actuels (HeyGen, Synthesia) génèrent des avatars qui ressemblent à la personne mais ne se comportent pas comme elle. Les micro-expressions, le vocabulaire gestuel, la posture, le rythme de parole — tous ces marqueurs comportementaux sont absents. Le résultat : une vallée de l'étrange de la familiarité où les utilisateurs reconnaissent le visage mais pas le comportement.",
    "research.uncanny": "⚠ Vallée de l'étrange de la familiarité — les utilisateurs reconnaissent le visage mais pas le comportement → destruction de la suspension d'incrédulité",

    // State of Art page
    "sota.label": "03 — ÉTAT DE L'ART",
    "sota.title": "État de l'Art",
    "sota.subtitle": "Solutions existantes, benchmarks, gaps de recherche et enjeux technologiques",
    "sota.intro": "Cette analyse couvre le paysage des solutions existantes dans les domaines pertinents pour DigiDouble : plateformes d'avatars conversationnels, synthèse vocale, mémoire conversationnelle, et orchestration temps réel. L'objectif est d'identifier où en est l'état de l'art, ce qui manque, et où la recherche fondamentale peut faire une différence.",
    "sota.s1.number": "01",
    "sota.s1.title": "Comparatif des Outils & Plateformes",
    "sota.s1.subtitle": "Évaluation des solutions existantes sur les critères clés pour DigiDouble.",
    "sota.s2.number": "02",
    "sota.s2.title": "Benchmarks de Latence",
    "sota.s2.subtitle": "État de l'art des performances par composant du pipeline conversationnel (2025–2026).",
    "sota.s3.number": "03",
    "sota.s3.title": "Gaps de Recherche & Opportunités",
    "sota.s3.subtitle": "Ce qui manque, ce qui existe, et où DigiDouble peut contribuer.",
    "sota.s4.number": "04",
    "sota.s4.title": "Assessment de la Recherche Académique",
    "sota.s4.subtitle": "Publications clés, groupes de recherche, et questions ouvertes.",
    "sota.s5.number": "05",
    "sota.s5.title": "Enjeux Business & Opportunités de Marché",
    "sota.s5.subtitle": "Contexte marché, modèles économiques, et opportunités stratégiques.",
    "sota.s6.number": "06",
    "sota.s6.title": "Technologies Recommandées",
    "sota.s6.subtitle": "Stack technologique recommandée pour DigiDouble.",
    "sota.tab.commercial": "Plateformes commerciales",
    "sota.tab.opensource": "Solutions open-source",
    "sota.tab.tts": "TTS & Synthèse vocale",
    "sota.radar.title": "Vue radar — Comparatif multi-critères",
    "sota.benchmark.title": "Benchmarks de Latence par Composant",
    "sota.gap.matrix.title": "Matrice Urgence × Difficulté",
    "sota.gap.radar.title": "Comparatif Radar — Plateformes",
    "sota.trilemma.title": "Analyse : le trilemme Qualité / Latence / Coût",
    "sota.trilemma.body": "Il est impossible d'optimiser simultanément les trois dimensions avec les approches actuelles. Les plateformes à faible latence (<100ms) comme Beyond Presence ou NVIDIA ACE nécessitent une infrastructure propriétaire coûteuse. Les solutions open-source souveraines restent à 2–15s. La recherche fondamentale est nécessaire pour trouver des architectures permettant de briser ce trilemme.",
    "sota.validity.title": "Validité de la Recherche",
    "sota.validity.body": "L'analyse confirme l'intérêt scientifique du projet DigiDouble. Aucune solution existante ne combine les cinq propriétés requises : temps réel (<2s), personnalisation comportementale, souveraineté, mémoire conversationnelle, et accessibilité pour des créateurs non-techniques. Cette combinaison représente une véritable frontière de recherche.",
  },
};

// ─── Provider ─────────────────────────────────────────────────────────────────

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  function t(key: string): string {
    return translations[lang][key] ?? translations["en"][key] ?? key;
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
