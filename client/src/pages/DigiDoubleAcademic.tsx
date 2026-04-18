/**
 * DigiDoubleAcademic.tsx — DigiDouble Research Portal
 * Page: Academic Research Assessment (extracted from StateOfArt section F)
 * Context: DigiDouble project — part of "The Project" menu
 * Design: Technical Blueprint
 * i18n: EN / FR via LangContext
 */
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";

export default function DigiDoubleAcademic() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const memoryPapers = [
    {
      ref: "MemoryOS (NeurIPS, 2025)",
      venue: "NeurIPS 2025",
      url: "https://arxiv.org/abs/2506.06941",
      desc: isFr
        ? "Système d'exploitation mémoire pour agents IA personnalisés. Architecture 3 couches (STM, LTM, Knowledge). +37.6% précision vs baseline."
        : "Memory operating system for personalized AI agents. 3-layer architecture (STM, LTM, Knowledge). +37.6% accuracy vs baseline.",
      relevance: isFr ? "Très haute" : "Very high",
    },
    {
      ref: "LOCRET (ICLR, 2025)",
      venue: "ICLR 2025",
      url: "https://arxiv.org/abs/2410.01805",
      desc: isFr
        ? "Compression de contexte stateful pour inférence LLM. 128K tokens sans dégradation. Applicable à la mémoire de session longue."
        : "Stateful context compression for LLM inference. 128K tokens without degradation. Applicable to long session memory.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "LTM-Benchmark (arXiv, 2024)",
      venue: "arXiv:2410.10813",
      url: "https://arxiv.org/abs/2410.10813",
      desc: isFr
        ? "Benchmark pour capacités mémoire long-terme des assistants LLM. Ouvre la voie vers des assistants plus personnalisés."
        : "Benchmark for long-term memory capabilities of LLM assistants. Opens the path toward more personalized assistants.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "Mem0 (2025)",
      venue: "arXiv:2504.19413",
      url: "https://arxiv.org/abs/2504.19413",
      desc: isFr
        ? "+26% précision, -91% latence, -90% tokens vs baseline. Mémoire structurée persistante pour agents IA."
        : "+26% accuracy, -91% latency, -90% tokens vs baseline. Persistent structured memory for AI agents.",
      relevance: isFr ? "Très haute" : "Very high",
    },
    {
      ref: "RAG-Driven Memory (IEEE, 2025)",
      venue: "IEEE Access",
      url: "https://ieeexplore.ieee.org/document/10856893",
      desc: isFr
        ? "Revue des architectures mémoire RAG pour LLM conversationnels. Synthèse des approches vector DB."
        : "Review of RAG memory architectures for conversational LLMs. Synthesis of vector DB approaches.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "Conversational Agents: From RAG to LTM",
      venue: "ACM, 2025",
      url: "https://dl.acm.org/doi/10.1145/3701716.3715561",
      desc: isFr
        ? "Transition des approches RAG vers la mémoire long-terme. Gestion mémoire agentique via RL."
        : "Transition from RAG approaches to long-term memory. Agentic memory management via RL.",
      relevance: isFr ? "Haute" : "High",
    },
  ];

  const avatarPapers = [
    {
      ref: "VASA-1 (Microsoft, 2024)",
      venue: "NeurIPS 2024",
      url: "https://arxiv.org/abs/2404.10667",
      desc: isFr
        ? "Visages parlants photorealistic avec expressions nuancées. 40 FPS online, 512×512. Non commercialisé — risque de non-publication complète."
        : "Photorealistic talking faces with nuanced expressions. 40 FPS online, 512×512. Not commercialized — risk of incomplete publication.",
      relevance: isFr ? "Très haute" : "Very high",
    },
    {
      ref: "A²-LLM (2026)",
      venue: "arXiv:2602.04913",
      url: "https://arxiv.org/abs/2602.04913",
      desc: isFr
        ? "LLM audio-avatar end-to-end. Mouvements faciaux émotionnellement riches au-delà du lip-sync. Architecture 8B + 0.16B LoRA."
        : "End-to-end audio-avatar LLM. Emotionally rich facial movements beyond lip-sync. 8B + 0.16B LoRA architecture.",
      relevance: isFr ? "Très haute" : "Very high",
    },
    {
      ref: "Hi-Reco (HKUST, 2025)",
      venue: isFr ? "Conférence" : "Conference",
      url: "https://arxiv.org/abs/2503.18034",
      desc: isFr
        ? "Humain numérique complet : avatar 3D + parole expressive + dialogue grounded. Approche intégrée rare."
        : "Complete digital human: 3D avatar + expressive speech + grounded dialogue. Rare integrated approach.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "Survey Talking Head (ACM, 2025)",
      venue: "ACM Computing Surveys",
      url: "https://dl.acm.org/doi/10.1145/3706598",
      desc: isFr
        ? "Revue complète des techniques de synthèse talking head. Trilemme temps réel / expressivité / qualité documenté."
        : "Comprehensive review of talking head synthesis techniques. Real-time / expressiveness / quality trilemma documented.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "EmergentTTS-Eval (NeurIPS, 2025)",
      venue: "NeurIPS 2025",
      url: "https://arxiv.org/abs/2505.15372",
      desc: isFr
        ? "Benchmark pour contrôle de style complexe en TTS. Évalue 11Labs, Deepgram, OpenAI 4o-mini-TTS."
        : "Benchmark for complex style control in TTS. Evaluates 11Labs, Deepgram, OpenAI 4o-mini-TTS.",
      relevance: isFr ? "Haute" : "High",
    },
    {
      ref: "PerTTS (2026)",
      venue: "ResearchGate",
      url: "https://www.researchgate.net/publication/398355114_PerTTS_Personalized_and_Controllable_Zero-shot_Spontaneous_Style_Text-to-Speech_Synthesis",
      desc: isFr
        ? "TTS spontané personnalisé et contrôlable zero-shot. Encodeur style de parole + encodeur prosodie locale."
        : "Personalized and controllable zero-shot spontaneous TTS. Speech style encoder + local prosody encoder.",
      relevance: isFr ? "Très haute" : "Very high",
    },
    {
      ref: "AvatarForcing (arXiv 2603.14331, mars 2026)",
      venue: "arXiv:2603.14331",
      url: "https://arxiv.org/abs/2603.14331",
      desc: isFr
        ? "One-step streaming diffusion pour avatars parlants. Local-Future Sliding-Window Denoising. Image unique + audio streaming → vidéo temps réel long-form. Directement applicable à l'Axe 1 (latence)."
        : "One-step streaming diffusion for talking avatars. Local-Future Sliding-Window Denoising. Single image + streaming audio → real-time long-form video. Directly applicable to Axis 1 (latency).",
      relevance: isFr ? "Très haute" : "Very high",
    },
  ];

  const relevanceColor = (r: string) => {
    if (r.toLowerCase().includes("très") || r.toLowerCase().includes("very")) return "oklch(0.55 0.20 145)";
    if (r.toLowerCase().includes("haute") || r.toLowerCase().includes("high")) return "oklch(0.65 0.18 200)";
    return "oklch(0.60 0.10 200)";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sub-nav */}
      <div className="bg-white border-b border-slate-200 sticky top-14 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
          <InternalLink to="/project" className="text-xs font-mono text-slate-400 hover:text-slate-700 transition-colors">
            {isFr ? "← The Project" : "← The Project"}
          </InternalLink>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Assessment Académique" : "Academic Assessment"}
          </span>
          <div className="ml-auto flex gap-3">
            <InternalLink to="/research/gaps" className="text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors">
              {isFr ? "← Research Gaps" : "← Research Gaps"}
            </InternalLink>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader
          number="06"
          title={isFr ? "Assessment de la Recherche Académique" : "Academic Research Assessment"}
          subtitle={isFr
            ? "État des publications et travaux récents dans les domaines clés (2023–2026). Spécifique aux besoins du projet DigiDouble."
            : "Status of publications and recent work in key domains (2023–2026). Specific to the DigiDouble project needs."}
          accent="cyan"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Memory papers */}
          <div className="border border-slate-200 rounded-lg p-5 bg-white">
            <div className="text-xs font-bold mb-3" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 200)" }}>
              {isFr ? "DOMAINE A — Mémoire Conversationnelle" : "DOMAIN A — Conversational Memory"}
            </div>
            <div className="space-y-3">
              {memoryPapers.map((paper) => (
                <div key={paper.ref} className="border-l-2 pl-3" style={{ borderColor: "oklch(0.72 0.18 200 / 0.3)" }}>
                  <div className="font-medium text-slate-900 text-xs mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {paper.url ? (
                      <a href={paper.url} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "oklch(0.50 0.18 200)" }}>{paper.ref}</a>
                    ) : paper.ref}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mb-1">
                    {paper.url ? (
                      <a href={paper.url} target="_blank" rel="noopener noreferrer" className="hover:underline opacity-70">{paper.venue} ↗</a>
                    ) : paper.venue}
                  </div>
                  <p className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{paper.desc}</p>
                  <div className="mt-1">
                    <StatusBadge variant="rd" label={`${isFr ? "Pertinence" : "Relevance"}: ${paper.relevance}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Avatar papers */}
          <div className="border border-slate-200 rounded-lg p-5 bg-white">
            <div className="text-xs font-bold mb-3" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 50)" }}>
              {isFr ? "DOMAINE B — Avatar & Synthèse Vocale" : "DOMAIN B — Avatar & Voice Synthesis"}
            </div>
            <div className="space-y-3">
              {avatarPapers.map((paper) => (
                <div key={paper.ref} className="border-l-2 pl-3" style={{ borderColor: "oklch(0.72 0.18 50 / 0.3)" }}>
                  <div className="font-medium text-slate-900 text-xs mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {paper.url ? (
                      <a href={paper.url} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "oklch(0.50 0.18 50)" }}>{paper.ref}</a>
                    ) : paper.ref}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mb-1">
                    {paper.url ? (
                      <a href={paper.url} target="_blank" rel="noopener noreferrer" className="hover:underline opacity-70">{paper.venue} ↗</a>
                    ) : paper.venue}
                  </div>
                  <p className="text-xs text-slate-600" style={{ fontFamily: "'Source Serif 4', serif" }}>{paper.desc}</p>
                  <div className="mt-1">
                    <StatusBadge variant="rd" label={`${isFr ? "Pertinence" : "Relevance"}: ${paper.relevance}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary table */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Synthèse — Niveaux de maturité par domaine" : "Summary — Maturity levels by domain"}
          </h3>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{isFr ? "Domaine" : "Domain"}</th>
                  <th>{isFr ? "Maturité académique" : "Academic maturity"}</th>
                  <th>{isFr ? "Disponibilité commerciale" : "Commercial availability"}</th>
                  <th>{isFr ? "Gap DigiDouble" : "DigiDouble gap"}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    domain: isFr ? "Mémoire conversationnelle" : "Conversational memory",
                    academic: isFr ? "Haute (Mem0, MemoryOS)" : "High (Mem0, MemoryOS)",
                    commercial: isFr ? "Partielle (Mem0 API)" : "Partial (Mem0 API)",
                    gap: isFr ? "Intégration avatar multi-sessions" : "Multi-session avatar integration",
                  },
                  {
                    domain: isFr ? "Talking head / avatar" : "Talking head / avatar",
                    academic: isFr ? "Haute (VASA-1, A²-LLM)" : "High (VASA-1, A²-LLM)",
                    commercial: isFr ? "Partielle (HeyGen, Tavus)" : "Partial (HeyGen, Tavus)",
                    gap: isFr ? "Latence <500ms + corps complet" : "Latency <500ms + full body",
                  },
                  {
                    domain: isFr ? "TTS expressif personnalisé" : "Personalized expressive TTS",
                    academic: isFr ? "Haute (PerTTS, EmergentTTS)" : "High (PerTTS, EmergentTTS)",
                    commercial: isFr ? "Bonne (ElevenLabs, Cartesia)" : "Good (ElevenLabs, Cartesia)",
                    gap: isFr ? "Empreinte prosodique individuelle" : "Individual prosodic fingerprint",
                  },
                  {
                    domain: isFr ? "Orchestration conversationnelle" : "Conversational orchestration",
                    academic: isFr ? "Moyenne (SIGDIAL)" : "Medium (SIGDIAL)",
                    commercial: isFr ? "Faible (Flowise custom)" : "Low (Flowise custom)",
                    gap: isFr ? "Freedom spectrum configurable" : "Configurable freedom spectrum",
                  },
                ].map((row) => (
                  <tr key={row.domain}>
                    <td className="font-semibold text-sm text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{row.domain}</td>
                    <td className="text-xs text-slate-600">{row.academic}</td>
                    <td className="text-xs text-slate-600">{row.commercial}</td>
                    <td className="text-xs text-slate-500 italic" style={{ fontFamily: "'Source Serif 4', serif" }}>{row.gap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-3">
          <InternalLink to="/research/gaps" className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-4 py-2 transition-all hover:opacity-90" style={{ background: 'oklch(0.55 0.20 200)', fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "← Research Gaps" : "← Research Gaps"}
          </InternalLink>
          <InternalLink to="/project" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "The Project →" : "The Project →"}
          </InternalLink>
          <InternalLink to="/research" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "Research Challenges →" : "Research Challenges →"}
          </InternalLink>
        </div>
      </div>
    </div>
  );
}
