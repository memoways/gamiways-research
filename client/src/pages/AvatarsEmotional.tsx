/**
 * AvatarsEmotional.tsx — GamiWays Research Portal
 * Page: Emotional Toolbox & Character Design (extracted from Research section 05b)
 * Context: GamiWays R&D
 * Design: Technical Blueprint
 * i18n: EN / FR via LangContext
 */
import { useState, useMemo } from "react";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import SectionHeader from "@/components/SectionHeader";
import { Home, ChevronRight, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

type SortDir = "asc" | "desc";
type EmotKey = "name" | "configurable" | "creator" | "realtime";

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ChevronsUpDown className="w-3 h-3 opacity-40" />;
  return dir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
}

export default function AvatarsEmotional() {
  const [sort, setSort] = useState<{ key: EmotKey; dir: SortDir }>({ key: "name", dir: "asc" });
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const emotionalItems = [
    {
      id: "ET1",
      title: isFr ? "Répertoire émotionnel" : "Emotional repertoire",
      desc: isFr
        ? "Définir un ensemble d'états émotionnels discrets et continus pour chaque personnage. Chaque état encode : expression faciale, prosodie vocale, cadence, posture, micro-comportements."
        : "Define a set of discrete and continuous emotional states per character. Each state encodes: facial expression, vocal prosody, cadence, posture, micro-behaviors.",
      color: "oklch(0.72 0.18 50)",
    },
    {
      id: "ET2",
      title: isFr ? "Transition & cohérence" : "Transition & coherence",
      desc: isFr
        ? "Les transitions entre états émotionnels doivent être fluides, cohérentes avec la personnalité, et ne pas créer de ruptures perceptibles dans l'expérience. Défi : éviter l'effet 'uncanny valley émotionnel'."
        : "Transitions between emotional states must be smooth, personality-consistent, and not create perceptible breaks in the experience. Challenge: avoiding the 'emotional uncanny valley' effect.",
      color: "oklch(0.65 0.18 145)",
    },
    {
      id: "ET3",
      title: isFr ? "Activation contextuelle" : "Contextual activation",
      desc: isFr
        ? "L'état émotionnel est activé par le contenu de la conversation, l'historique de l'interaction et les signaux de l'utilisateur (ton, rythme, contenu). Recherche : détection temps réel des signaux émotionnels entrants."
        : "Emotional state is activated by conversation content, interaction history, and user signals (tone, rhythm, content). Research: real-time detection of incoming emotional signals.",
      color: "oklch(0.60 0.20 25)",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader
          number="05b"
          title={isFr ? "Boîte à Outils Émotionnelle & Design de Personnage" : "Emotional Toolbox & Character Design"}
          subtitle={isFr
            ? "Conception émotionnelle grade cinéma pour avatars conversationnels. État de l'art, gaps et questions de conception."
            : "Cinema-grade emotional design for conversational avatars. State of the art, gaps, and design questions."}
          accent="orange"
        />

        {/* Intro */}
        <div className="mb-6 p-4 border border-slate-200 rounded-lg bg-white">
          <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Un avatar conversationnel ne se réduit pas à un visage qui parle. La fidélité comportementale exige une couche de conception émotionnelle explicite : définir, encoder et activer un répertoire d'états émotionnels cohérents avec la personnalité du personnage, son histoire et le contexte de l'interaction."
              : "A conversational avatar is not just a talking face. Behavioral fidelity requires an explicit emotional design layer: defining, encoding, and activating a repertoire of emotional states consistent with the character's personality, history, and interaction context."}
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {emotionalItems.map((item) => (
            <div key={item.id} className="border border-slate-200 rounded p-4 bg-white">
              <div className="text-xs font-bold mb-1 font-mono" style={{ color: item.color }}>
                ET-{item.id.slice(2)}
              </div>
              <h4 className="font-semibold text-slate-900 mb-2 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Differentiation callout */}
        <div className="border-l-4 pl-4 py-3 max-w-2xl bg-white rounded-r-lg border border-slate-200 mb-8" style={{ borderLeftColor: "oklch(0.72 0.18 50)" }}>
          <p className="text-xs font-semibold text-slate-700 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Dimension clé de différenciation" : "Key differentiation dimension"}
          </p>
          <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Aucune plateforme commerciale actuelle ne propose un système de conception émotionnelle explicite et configurable par le créateur. La plupart laissent le LLM décider implicitement de l'état émotionnel, sans contrôle ni cohérence garantie. La question est de déterminer si une boîte à outils émotionnelle inspirée des méthodes de direction d'acteurs est techniquement réalisable, et à quel coût de conception et d'implémentation."
              : "No current commercial platform offers an explicit, creator-configurable emotional design system. Most leave the LLM to implicitly decide emotional state, without guaranteed control or coherence. The question is whether an emotional toolbox inspired by actor direction methods is technically feasible, and at what design and implementation cost."}
          </p>
        </div>

        {/* Competitive landscape */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Paysage concurrentiel — Emotional AI" : "Competitive landscape — Emotional AI"}
          </h3>
          <div className="overflow-x-auto">
            <p className="text-xs text-slate-400 mb-2 font-mono">{isFr ? "Cliquez sur un en-tête pour trier" : "Click a header to sort"}</p>
            <table className="data-table">
              <thead>
                <tr>
                  {([
                    { key: "name" as EmotKey, label: isFr ? "Plateforme" : "Platform" },
                    { key: "configurable" as EmotKey, label: isFr ? "Émotions configurables" : "Configurable emotions" },
                    { key: "creator" as EmotKey, label: isFr ? "Contrôle créateur" : "Creator control" },
                    { key: "realtime" as EmotKey, label: isFr ? "Temps réel" : "Real-time" },
                  ] as const).map(({ key, label }) => (
                    <th key={key} className="cursor-pointer select-none" onClick={() => setSort(prev => prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" })}>
                      <span className="inline-flex items-center gap-1">{label}<SortIcon active={sort.key === key} dir={sort.dir} /></span>
                    </th>
                  ))}
                  <th>{isFr ? "Note" : "Note"}</th>
                </tr>
              </thead>
              <tbody>
                {useMemo(() => [
                  { name: "Tavus (Raven-1)", configurable: "✓ Partiel", creator: "✗ Implicite", realtime: "✓", note: isFr ? "Perception émotionnelle entrante (Raven-1), pas de toolbox créateur" : "Incoming emotional perception (Raven-1), no creator toolbox" },
                  { name: "LemonSlice (LS-2.1)", configurable: "✓ Partiel", creator: "✓ API", realtime: "✓", note: isFr ? "Emotion API + Action API, mais pas de design de répertoire" : "Emotion API + Action API, but no repertoire design" },
                  { name: "Anam", configurable: "✓ Partiel", creator: "✗ Implicite", realtime: "✓", note: isFr ? "Intelligence émotionnelle intégrée, non configurable" : "Built-in emotional intelligence, not configurable" },
                  { name: "HeyGen, Simli, D-ID", configurable: "✗", creator: "✗", realtime: "✓", note: isFr ? "Lip-sync uniquement, pas de couche émotionnelle" : "Lip-sync only, no emotional layer" },
                  { name: isFr ? "Système cible (hypothèse)" : "Target system (hypothesis)", configurable: "✓ Complet", creator: "✓ Toolbox", realtime: "✓", note: isFr ? "Répertoire + transitions + activation contextuelle + direction acteur — à valider" : "Repertoire + transitions + contextual activation + actor direction — to be validated" },
                ].sort((a, b) => {
                  const d = sort.dir === "asc" ? 1 : -1;
                  const av = (a as any)[sort.key] ?? "";
                  const bv = (b as any)[sort.key] ?? "";
                  return d * String(av).localeCompare(String(bv));
                }), [sort, isFr]).map((row) => (
                  <tr key={row.name}>
                    <td className="font-semibold text-sm text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{row.name}</td>
                    <td className="text-xs text-slate-600">{row.configurable}</td>
                    <td className="text-xs text-slate-600">{row.creator}</td>
                    <td className="text-xs text-slate-600">{row.realtime}</td>
                    <td className="text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-3">
          <InternalLink to="/research/behavior" className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-4 py-2 transition-all hover:opacity-90" style={{ background: 'oklch(0.55 0.20 200)', fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "← Axe 2 Comportement" : "← Axis 2 Behavior"}
          </InternalLink>
          <InternalLink to="/research" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "Research Challenges →" : "Research Challenges →"}
          </InternalLink>
          <InternalLink to="/avatars" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "Comparatif plateformes →" : "Platform comparison →"}
          </InternalLink>
        </div>
      </div>
    </div>
  );
}
