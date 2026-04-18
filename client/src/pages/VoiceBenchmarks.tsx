/**
 * VoiceBenchmarks.tsx — DigiDouble Research Portal
 * Page: Latency Benchmarks — extracted from StateOfArt section D
 * i18n: EN / FR via LangContext
 */
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import SectionHeader from "@/components/SectionHeader";
import LatencyBenchmarkDiagram from "@/components/diagrams/LatencyBenchmarkDiagram";
import DiagramModal from "@/components/DiagramModal";
import StatusBadge from "@/components/StatusBadge";

export default function VoiceBenchmarks() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const latencyBenchmarks = [
    { component: isFr ? "ASR/STT (Deepgram low-latency)" : "ASR/STT (Deepgram low-latency)", best: 75, typical: 200, unit: "ms" },
    { component: isFr ? "ASR/STT (Whisper local)" : "ASR/STT (Whisper local)", best: 200, typical: 500, unit: "ms" },
    { component: isFr ? "LLM (GPT-4o streaming)" : "LLM (GPT-4o streaming)", best: 350, typical: 800, unit: "ms" },
    { component: isFr ? "LLM (SLM local quantifié)" : "LLM (quantized local SLM)", best: 150, typical: 400, unit: "ms" },
    { component: isFr ? "TTS (Cartesia streaming)" : "TTS (Cartesia streaming)", best: 80, typical: 150, unit: "ms" },
    { component: isFr ? "TTS (ElevenLabs streaming)" : "TTS (ElevenLabs streaming)", best: 180, typical: 250, unit: "ms" },
    { component: isFr ? "TTS (Kokoro local)" : "TTS (Kokoro local)", best: 60, typical: 120, unit: "ms" },
    { component: isFr ? "Avatar (Beyond Presence)" : "Avatar (Beyond Presence)", best: 80, typical: 100, unit: "ms" },
    { component: isFr ? "Avatar (HeyGen API)" : "Avatar (HeyGen API)", best: 3000, typical: 8000, unit: "ms" },
    { component: isFr ? "Avatar (HeyGem OS, GPU)" : "Avatar (HeyGem OS, GPU)", best: 2000, typical: 5000, unit: "ms" },
    { component: isFr ? "Réseau (WebRTC)" : "Network (WebRTC)", best: 30, typical: 80, unit: "ms" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sub-nav */}
      <div className="bg-white border-b border-slate-200 sticky top-14 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
          <span className="text-xs font-mono text-slate-400">{isFr ? "Voix" : "Voice"}</span>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Benchmarks de Latence" : "Latency Benchmarks"}
          </span>
          <div className="ml-auto flex gap-2">
            <InternalLink to="/voice/tts" className="text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors">← TTS</InternalLink>
            <InternalLink to="/voice/stt" className="text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors">← STT</InternalLink>
            <InternalLink to="/voice/pipeline" className="text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors">
              {isFr ? "→ Pipeline" : "→ Pipeline"}
            </InternalLink>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader
          number="D"
          title={isFr ? "Benchmarks de Latence" : "Latency Benchmarks"}
          subtitle={isFr
            ? "État de l'art des performances par composant du pipeline conversationnel (2025–2026)."
            : "State-of-the-art performance by component of the conversational pipeline (2025–2026)."}
          accent="orange"
        />

        {/* Diagram */}
        <DiagramModal title="Latency Benchmarks by Component (2025–2026)">
          <LatencyBenchmarkDiagram />
        </DiagramModal>

        <div className="mb-4 mt-6">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{isFr ? "Composant" : "Component"}</th>
                  <th>Best-case</th>
                  <th>{isFr ? "Typique" : "Typical"}</th>
                  <th>{isFr ? "Visualisation" : "Visualization"}</th>
                  <th>{isFr ? "Statut vs cible DigiDouble" : "Status vs DigiDouble target"}</th>
                </tr>
              </thead>
              <tbody>
                {latencyBenchmarks.map((b) => {
                  const target = b.component.includes("Avatar") ? 500 : b.component.includes("LLM") ? 500 : 300;
                  const isOnTarget = b.best <= target;
                  const maxDisplay = 10000;
                  return (
                    <tr key={b.component}>
                      <td className="text-sm font-medium text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{b.component}</td>
                      <td><span className="text-sm font-bold font-mono" style={{ color: isOnTarget ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{b.best}{b.unit}</span></td>
                      <td><span className="text-sm font-mono text-slate-500">{b.typical}{b.unit}</span></td>
                      <td className="w-40">
                        <div className="latency-bar">
                          <div className="latency-fill" style={{ width: `${Math.min((b.typical / maxDisplay) * 100, 100)}%`, background: isOnTarget ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }} />
                        </div>
                      </td>
                      <td>
                        {isOnTarget
                          ? <StatusBadge variant="available" label="OK" />
                          : <StatusBadge variant="gap" label={isFr ? "À RÉDUIRE" : "TO REDUCE"} />
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="callout-warning mt-6">
          <p className="text-sm font-semibold text-slate-800 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Analyse : le trilemme Qualité / Latence / Coût" : "Analysis: the Quality / Latency / Cost trilemma"}
          </p>
          <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? <>Il est impossible d'optimiser simultanément les trois dimensions avec les approches actuelles. Les plateformes à faible latence (&lt;100ms) comme Beyond Presence ou NVIDIA ACE nécessitent une infrastructure propriétaire coûteuse. Les solutions open-source souveraines restent à 2–15s. La recherche fondamentale est nécessaire pour trouver des architectures permettant de briser ce trilemme.{" "}<InternalLink to="/research">Voir les défis de recherche →</InternalLink></>
              : <>It is impossible to simultaneously optimize all three dimensions with current approaches. Low-latency platforms (&lt;100ms) like Beyond Presence or NVIDIA ACE require costly proprietary infrastructure. Sovereign open-source solutions remain at 2–15s. Fundamental research is needed to find architectures that break this trilemma.{" "}<InternalLink to="/research">See Research Challenges →</InternalLink></>
            }
          </p>
        </div>
      </div>
    </div>
  );
}
