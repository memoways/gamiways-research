/**
 * GamiWaysGaps.tsx — GamiWays Research Portal
 * Page: Research Gaps & Opportunities (extracted from StateOfArt section E)
 * Context: GamiWays project — part of "The Project" menu
 * Design: Technical Blueprint
 * i18n: EN / FR via LangContext
 */
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import SectionHeader from "@/components/SectionHeader";
import GapDiagram from "@/components/diagrams/GapDiagram";

export default function GamiWaysGaps() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const researchGaps = [
    {
      domain: isFr ? "Mémoire conversationnelle" : "Conversational memory",
      gap: isFr
        ? "Pas de solution production-grade pour sessions 1h+ sans explosion tokens"
        : "No production-grade solution for 1h+ sessions without token explosion",
      sota: isFr
        ? "Mem0 (-90% tokens, +26% précision) — mais pas validé pour avatars multi-sessions"
        : "Mem0 (-90% tokens, +26% accuracy) — but not validated for multi-session avatars",
      opportunity: isFr
        ? "Architecture 3 couches + distillation SLM spécifique à l'avatar"
        : "3-layer architecture + avatar-specific SLM distillation",
      urgency: isFr ? "Critique" : "Critical",
    },
    {
      domain: isFr ? "Fidélité comportementale avatar" : "Avatar behavioral fidelity",
      gap: isFr
        ? "Avatars 'talking heads' sans langage corporel — uncanny valley de familiarité"
        : "'Talking heads' avatars without body language — familiarity uncanny valley",
      sota: isFr
        ? "VASA-1 (Microsoft) : 40 FPS, expressions nuancées — non commercialisé"
        : "VASA-1 (Microsoft): 40 FPS, nuanced expressions — not commercialized",
      opportunity: isFr
        ? "Extraction comportementale depuis archives + génération corps cohérent"
        : "Behavioral extraction from archives + coherent body generation",
      urgency: isFr ? "Critique" : "Critical",
    },
    {
      domain: isFr ? "TTS prosodique personnalisé" : "Personalized prosodic TTS",
      gap: isFr
        ? "Cloner l'empreinte prosodique individuelle (rythme, emphase, pauses) reste difficile"
        : "Cloning individual prosodic fingerprint (rhythm, emphasis, pauses) remains difficult",
      sota: isFr
        ? "FishAudio S1 : timbre + style depuis ~10s — mais prosodie profonde non capturée"
        : "FishAudio S1: timbre + style from ~10s — but deep prosody not captured",
      opportunity: isFr
        ? "Modèles prosodiques individuels depuis archives vidéo existantes"
        : "Individual prosodic models from existing video archives",
      urgency: isFr ? "Élevée" : "High",
    },
    {
      domain: isFr ? "Latence avatar end-to-end" : "End-to-end avatar latency",
      gap: isFr
        ? "6–12s actuels vs <2s requis — goulot : génération vidéo avatar"
        : "Current 6–12s vs <2s required — bottleneck: avatar video generation",
      sota: isFr
        ? "Beyond Presence <100ms, NVIDIA ACE <100ms — mais infrastructure propriétaire"
        : "Beyond Presence <100ms, NVIDIA ACE <100ms — but proprietary infrastructure",
      opportunity: isFr
        ? "Distillation + cache intelligent + dégradation gracieuse sur GPU souverain"
        : "Distillation + intelligent cache + graceful degradation on sovereign GPU",
      urgency: isFr ? "Critique" : "Critical",
    },
    {
      domain: isFr ? "Orchestration déterministe-organique" : "Deterministic-organic orchestration",
      gap: isFr
        ? "Équilibre contraintes narratives / liberté IA conversationnelle non résolu"
        : "Balance between narrative constraints / conversational AI freedom unresolved",
      sota: isFr
        ? "Flowise + custom : possible mais fragile et technique"
        : "Flowise + custom: possible but fragile and technical",
      opportunity: isFr
        ? "Éditeur de nœuds avec degrés de liberté configurables (0–100%)"
        : "Node editor with configurable degrees of freedom (0–100%)",
      urgency: isFr ? "Élevée" : "High",
    },
    {
      domain: isFr ? "Synchronisation multi-flux" : "Multi-stream synchronization",
      gap: isFr
        ? "<100ms désynchronisation entre 5 streams parallèles en conditions réelles"
        : "<100ms desynchronization between 5 parallel streams in real conditions",
      sota: isFr
        ? "WebRTC + HLS + WebSocket — solutions partielles, pas de framework unifié"
        : "WebRTC + HLS + WebSocket — partial solutions, no unified framework",
      opportunity: isFr
        ? "Protocole de synchronisation adaptatif basé sur 14 ans d'expertise Memoways"
        : "Adaptive synchronization protocol based on 14 years of Memoways expertise",
      urgency: isFr ? "Moyenne" : "Medium",
    },
  ];

  const urgencyColor = (u: string) => {
    if (u === "Critical" || u === "Critique") return { bg: "#fee2e2", text: "#dc2626" };
    if (u === "High" || u === "Élevée") return { bg: "#fef3c7", text: "#d97706" };
    return { bg: "#f0fdf4", text: "#16a34a" };
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader
          number="05"
          title={isFr ? "Opportunités & Lacunes Techniques" : "Opportunities & Technical Gaps"}
          subtitle={isFr
            ? "Analyse des lacunes identifiées dans l'état de l'art et leur traduction en opportunités produit et business pour Gamilab et Memoways."
            : "Analysis of identified gaps in the state of the art and their translation into product and business opportunities for Gamilab and Memoways."}
          accent="red"
        />

        {/* Gap Diagram */}
        <div className="mb-8">
          <GapDiagram />
        </div>

        {/* Gaps table */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Analyse détaillée des gaps" : "Detailed gap analysis"}
          </h3>
          <div className="space-y-4">
            {researchGaps.map((g) => {
              const uc = urgencyColor(g.urgency);
              return (
                <div key={g.domain} className="border border-slate-200 rounded-lg p-4 bg-white">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {g.domain}
                    </h4>
                    <span className="text-xs font-bold px-2 py-0.5 rounded shrink-0" style={{ background: uc.bg, color: uc.text, fontFamily: "'JetBrains Mono', monospace" }}>
                      {g.urgency}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {isFr ? "Gap identifié" : "Identified gap"}
                      </span>
                      <p className="text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{g.gap}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {isFr ? "Meilleur état de l'art" : "Best state of the art"}
                      </span>
                      <p className="text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{g.sota}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {isFr ? "Opportunité GamiWays" : "GamiWays opportunity"}
                      </span>
                      <p className="text-slate-600 leading-relaxed font-medium" style={{ fontFamily: "'Source Serif 4', serif" }}>{g.opportunity}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-3">
          <InternalLink to="/project" className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-4 py-2 transition-all hover:opacity-90" style={{ background: 'oklch(0.55 0.20 200)', fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "← The Project" : "← The Project"}
          </InternalLink>
          <InternalLink to="/research/academic" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "Assessment Académique →" : "Academic Assessment →"}
          </InternalLink>
          <InternalLink to="/research" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "Défis Techniques →" : "Technical Challenges →"}
          </InternalLink>
        </div>
      </div>
    </div>
  );
}
