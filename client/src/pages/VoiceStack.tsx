/**
 * VoiceStack.tsx — DigiDouble Research Portal
 * Page: Recommended Technologies — extracted from StateOfArt section H
 * i18n: EN / FR via LangContext
 */
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import SectionHeader from "@/components/SectionHeader";

export default function VoiceStack() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const techStackRows = [
    {
      layer: "ASR/STT",
      primary: "Audiogami (Gamilab)",
      primaryUrl: "https://audiogami.com",
      alt: isFr ? "Whisper local quantifié" : "Quantized local Whisper",
      altUrl: "https://github.com/openai/whisper",
      latency: "300ms",
      sovereign: true,
      reason: isFr ? "Déjà opérationnel, hébergé en Suisse, HITL optionnel" : "Already operational, Swiss-hosted, optional HITL",
      detail: isFr ? "SDK Gamilab. Modèle Whisper fine-tuné. Streaming chunked. WER <5% FR/EN." : "Gamilab SDK. Fine-tuned Whisper model. Chunked streaming. WER <5% FR/EN.",
    },
    {
      layer: "LLM Orchestration",
      primary: isFr ? "SLM distillé (Llama 3.1 8B quantifié)" : "Distilled SLM (quantized Llama 3.1 8B)",
      primaryUrl: "https://huggingface.co/meta-llama/Llama-3.1-8B",
      alt: isFr ? "GPT-4o streaming (transition)" : "GPT-4o streaming (transition)",
      altUrl: "https://platform.openai.com/docs/guides/streaming",
      latency: "200–400ms",
      sovereign: true,
      reason: isFr ? "Distillation pour personnalité avatar. RAG pour contexte dynamique." : "Distillation for avatar personality. RAG for dynamic context.",
      detail: isFr ? "Quantisation 4-bit (GGUF). Streaming token-by-token. LoRA fine-tuning pour persona. Latence TTFT <150ms." : "4-bit quantization (GGUF). Token-by-token streaming. LoRA fine-tuning for persona. TTFT latency <150ms.",
    },
    {
      layer: isFr ? "Mémoire / RAG" : "Memory / RAG",
      primary: "Mem0 + pgvector",
      primaryUrl: "https://github.com/mem0ai/mem0",
      alt: "Qdrant + PostgreSQL",
      altUrl: "https://qdrant.tech/documentation/",
      latency: "50–100ms",
      sovereign: true,
      reason: isFr ? "-90% tokens, architecture 3 couches. Déploiement self-hosted." : "-90% tokens, 3-layer architecture. Self-hosted deployment.",
      detail: isFr ? "3 couches : Working (session) + Episodic (faits) + Semantic (persona). Hybrid retrieval BM25 + dense. Self-hosted PostgreSQL + pgvector." : "3 layers: Working (session) + Episodic (facts) + Semantic (persona). Hybrid BM25 + dense retrieval. Self-hosted PostgreSQL + pgvector.",
    },
    {
      layer: "TTS",
      primary: "Chatterbox-Turbo / FishAudio S1-mini",
      primaryUrl: "https://github.com/resemble-ai/chatterbox",
      alt: isFr ? "XTTS-v2 (multilingue)" : "XTTS-v2 (multilingual)",
      altUrl: "https://github.com/coqui-ai/TTS",
      latency: "<200ms",
      sovereign: true,
      reason: isFr ? "Open-source, clonage voix, contrôle prosodique. MIT/Apache 2.0." : "Open-source, voice cloning, prosodic control. MIT/Apache 2.0.",
      detail: isFr ? "Chatterbox-Turbo : clonage 3s, TTFA <200ms, contrôle émotion. FishAudio S1-mini : 8 langues, streaming chunk. Licence MIT/Apache 2.0." : "Chatterbox-Turbo: 3s cloning, TTFA <200ms, emotion control. FishAudio S1-mini: 8 languages, chunk streaming. MIT/Apache 2.0 license.",
    },
    {
      layer: isFr ? "Avatar génération" : "Avatar generation",
      primary: isFr ? "Architecture R&D (distillation + streaming)" : "R&D Architecture (distillation + streaming)",
      primaryUrl: "https://arxiv.org/abs/2603.14331",
      alt: isFr ? "HeyGem OS (phase transition)" : "HeyGem OS (transition phase)",
      altUrl: "https://github.com/HeyGen-Official/HeyGem.ai",
      latency: "<500ms (cible)",
      sovereign: true,
      reason: isFr ? "Goulot principal. Nécessite R&D fondamentale. HeyGem OS en attendant." : "Main bottleneck. Requires fundamental R&D. HeyGem OS in the meantime.",
      detail: isFr ? "Cible : one-step diffusion streaming (AvatarForcing). Distillation modèle 14B → 1B. TTFB <500ms. HeyGem OS (Apache 2.0) en bridge. Axe R&D IDIAP." : "Target: one-step streaming diffusion (AvatarForcing). 14B → 1B model distillation. TTFB <500ms. HeyGem OS (Apache 2.0) as bridge. IDIAP R&D axis.",
    },
    {
      layer: isFr ? "Streaming / Transport" : "Streaming / Transport",
      primary: "WebRTC + WebSocket",
      primaryUrl: "https://livekit.io/docs",
      alt: isFr ? "HLS pour vidéo pré-enregistrée" : "HLS for pre-recorded video",
      altUrl: "https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API",
      latency: "30–80ms",
      sovereign: true,
      reason: isFr ? "Standard industrie pour temps réel. Expertise Memoways." : "Industry standard for real-time. Memoways expertise.",
      detail: isFr ? "LiveKit SFU self-hosted. 5 flux synchronisés (<100ms). Node Editor Memoways pour séquençage. Jitter buffer adaptatif." : "Self-hosted LiveKit SFU. 5 synchronized streams (<100ms). Memoways Node Editor for sequencing. Adaptive jitter buffer.",
    },
    {
      layer: isFr ? "Infrastructure GPU" : "GPU Infrastructure",
      primary: isFr ? "Exoscale (Suisse)" : "Exoscale (Switzerland)",
      primaryUrl: "https://www.exoscale.com/gpu/",
      alt: "OVH / Scaleway (EU)",
      altUrl: "https://www.ovhcloud.com/fr/public-cloud/gpu/",
      latency: "N/A",
      sovereign: true,
      reason: isFr ? "Souveraineté données, RGPD, partenariat existant." : "Data sovereignty, GDPR, existing partnership.",
      detail: isFr ? "GPU A100/H100. Datacenter Zurich/Genève. Conformité RGPD + LPD suisse. Partenariat Gamilab existant. Coût ~$2.5/h A100." : "A100/H100 GPU. Zurich/Geneva datacenter. GDPR + Swiss LPD compliant. Existing Gamilab partnership. Cost ~$2.5/h A100.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sub-nav */}
      <div className="bg-white border-b border-slate-200 sticky top-14 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
          <span className="text-xs font-mono text-slate-400">{isFr ? "Voix" : "Voice"}</span>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "Technologies Recommandées" : "Recommended Technologies"}
          </span>
          <div className="ml-auto flex gap-2">
            <InternalLink to="/voice/benchmarks" className="text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors">← Benchmarks</InternalLink>
            <InternalLink to="/voice/pipeline" className="text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors">
              {isFr ? "→ Pipeline" : "→ Pipeline"}
            </InternalLink>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader
          number="H"
          title={isFr ? "Technologies Recommandées" : "Recommended Technologies"}
          subtitle={isFr
            ? "Stack cible pour l'architecture DigiDouble — spécifique aux besoins du projet (souveraineté, latence, personnalisation)."
            : "Target stack for the DigiDouble architecture — specific to project requirements (sovereignty, latency, personalization)."}
          accent="cyan"
        />

        <div className="callout-success mb-6">
          <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? <>Ce tableau présente le <strong>stack cible DigiDouble Phase 2</strong>, optimisé pour la souveraineté des données (infrastructure suisse), la latence end-to-end (&lt;2s cible) et la personnalisation profonde. Il est distinct des comparatifs Voice et Avatars qui restent neutres vis-à-vis du projet.</>
              : <>This table presents the <strong>DigiDouble Phase 2 target stack</strong>, optimized for data sovereignty (Swiss infrastructure), end-to-end latency (&lt;2s target) and deep personalization. It is distinct from the Voice and Avatar comparisons which remain project-neutral.</>
            }
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>{isFr ? "Couche" : "Layer"}</th>
                <th>{isFr ? "Technologie recommandée" : "Recommended technology"}</th>
                <th>{isFr ? "Alternative" : "Alternative"}</th>
                <th>{isFr ? "Latence cible" : "Target latency"}</th>
                <th>{isFr ? "Souverain" : "Sovereign"}</th>
                <th>{isFr ? "Détails techniques" : "Technical details"}</th>
              </tr>
            </thead>
            <tbody>
              {techStackRows.map((row) => (
                <tr key={row.layer}>
                  <td className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{row.layer}</td>
                  <td className="text-sm text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {row.primaryUrl ? (
                      <a href={row.primaryUrl} target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold" style={{ color: "oklch(0.45 0.18 200)" }}>{row.primary} ↗</a>
                    ) : row.primary}
                  </td>
                  <td className="text-xs text-slate-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {row.altUrl ? (
                      <a href={row.altUrl} target="_blank" rel="noopener noreferrer" className="hover:underline opacity-70">{row.alt} ↗</a>
                    ) : row.alt}
                  </td>
                  <td><span className="text-xs font-bold font-mono" style={{ color: "oklch(0.65 0.18 145)" }}>{row.latency}</span></td>
                  <td><span style={{ color: row.sovereign ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{row.sovereign ? "✓" : "✗"}</span></td>
                  <td className="text-xs text-slate-500 max-w-xs" style={{ fontFamily: "'Source Serif 4', serif" }}>
                    <div className="text-slate-700 mb-1">{row.reason}</div>
                    {row.detail && <div className="text-slate-400 italic text-xs border-t border-slate-100 pt-1 mt-1">{row.detail}</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
