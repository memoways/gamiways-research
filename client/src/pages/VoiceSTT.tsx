/**
 * VoiceSTT.tsx — DigiDouble Research Portal
 * Page: STT / Speech-to-Text — extracted from StateOfArt section C
 * Design: Technical Blueprint, dense comparative tables
 * i18n: EN / FR via LangContext
 */
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import { getSTTByCategory, type STTData } from "@/lib/sttData";
import SectionHeader from "@/components/SectionHeader";

function ScoreBar({ value, max = 10, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="latency-bar flex-1" style={{ height: "4px" }}>
        <div className="latency-fill" style={{ width: `${(value / max) * 100}%`, background: color }} />
      </div>
      <span className="text-xs font-mono text-slate-500 w-4">{value}</span>
    </div>
  );
}

type STTTab = "commercial" | "opensource";

export default function VoiceSTT() {
  const [sttTab, setSttTab] = useState<STTTab>("commercial");
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const cloudSTT = getSTTByCategory("cloud-api");
  const openSTT = getSTTByCategory("open-source");

  const subTabLabels: Record<string, string> = {
    commercial: isFr ? "APIs Cloud" : "Cloud APIs",
    opensource: isFr ? "Open Source" : "Open Source",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sub-nav */}
      <div className="bg-white border-b border-slate-200 sticky top-14 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
          <span className="text-xs font-mono text-slate-400">{isFr ? "Voix" : "Voice"}</span>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {isFr ? "STT / Reconnaissance Vocale" : "STT / Speech-to-Text"}
          </span>
          <div className="ml-auto flex gap-2">
            <InternalLink to="/voice/tts" className="text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors">
              {isFr ? "→ TTS" : "→ TTS"}
            </InternalLink>
            <InternalLink to="/voice/pipeline" className="text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors">
              {isFr ? "→ Pipeline" : "→ Pipeline"}
            </InternalLink>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader
          number="C"
          title={isFr ? "STT / Reconnaissance Vocale" : "STT / Speech-to-Text"}
          subtitle={isFr
            ? "Comparatif des solutions de reconnaissance vocale pour le pipeline conversationnel DigiDouble (2025–2026)."
            : "Comparison of speech recognition solutions for the DigiDouble conversational pipeline (2025–2026)."}
          accent="orange"
        />

        {/* Sub-tabs */}
        <div className="flex gap-1 mb-5 border-b border-slate-200">
          {(["commercial", "opensource"] as STTTab[]).map((tab) => (
            <button key={tab} onClick={() => setSttTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                sttTab === tab ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {subTabLabels[tab]}
            </button>
          ))}
        </div>

        {sttTab === "commercial" && (
          <div>
            <div className="mb-4 bg-orange-50 border border-orange-200 rounded-lg px-5 py-3">
              <p className="text-sm text-slate-700" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? <><strong>APIs STT cloud temps réel</strong> — Deepgram Nova-3 est la référence latence (75ms TTFA). Whisper large-v3 est le standard de qualité open-source. AssemblyAI Universal-2 domine le benchmark WER multilingue.</>
                  : <><strong>Real-time cloud STT APIs</strong> — Deepgram Nova-3 is the latency reference (75ms TTFA). Whisper large-v3 is the open-source quality standard. AssemblyAI Universal-2 leads the multilingual WER benchmark.</>
                }
              </p>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{isFr ? "Solution" : "Solution"}</th>
                    <th>TTFA</th>
                    <th>WER</th>
                    <th>{isFr ? "Streaming" : "Streaming"}</th>
                    <th>{isFr ? "Multilingue" : "Multilingual"}</th>
                    <th>{isFr ? "Diarisation" : "Diarization"}</th>
                    <th>{isFr ? "Prix/heure" : "Price/hr"}</th>
                    <th>{isFr ? "Souverain" : "Sovereign"}</th>
                  </tr>
                </thead>
                <tbody>
                  {cloudSTT.map((s: STTData) => (
                    <tr key={s.id}>
                      <td>
                        <div className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.name}</div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">{s.digiDoubleAxis}</div>
                      </td>
                      <td><span className="text-xs font-mono" style={{ color: s.latencyMs <= 100 ? "oklch(0.65 0.18 145)" : s.latencyMs <= 250 ? "oklch(0.75 0.16 75)" : "oklch(0.60 0.20 25)" }}>{s.latencyMs}ms</span></td>
                      <td><span className="text-xs font-mono text-slate-600">{s.wer > 0 ? `${s.wer}%` : "—"}</span></td>
                      <td><span style={{ color: s.streaming ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{s.streaming ? "✓" : "✗"}</span></td>
                      <td><span className="text-xs text-slate-600">{s.languages > 0 ? `${s.languages} langs` : "—"}</span></td>
                      <td><span style={{ color: s.speakerDiarization ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{s.speakerDiarization ? "✓" : "✗"}</span></td>
                      <td><span className="text-xs font-mono text-slate-600">{s.pricePerHour > 0 ? `$${s.pricePerHour}/hr` : isFr ? "Gratuit" : "Free"}</span></td>
                      <td><span style={{ color: s.selfHostable ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{s.selfHostable ? "✓" : "✗"}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cloudSTT.map((s: STTData) => (
                <div key={s.id} className="border border-slate-200 rounded-xl p-4 bg-white hover:shadow-md transition-shadow">
                  <div className="font-semibold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.name}</div>
                  <div className="text-xs text-slate-400 font-mono mb-3">{s.digiDoubleAxis}</div>
                  <div className="space-y-2 mb-3">
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Latency</span><span>{s.latencyMs}ms</span></div>
                      <ScoreBar value={s.score.latency} color="oklch(0.72 0.18 200)" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Accuracy</span><span>{s.wer > 0 ? `${s.wer}% WER` : "—"}</span></div>
                      <ScoreBar value={s.score.accuracy} color="oklch(0.65 0.18 145)" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1"><span>{isFr ? "Accessibilité prix" : "Price access"}</span><span>{s.score.pricing}/10</span></div>
                      <ScoreBar value={s.score.pricing} color="oklch(0.75 0.16 75)" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {sttTab === "opensource" && (
          <div>
            <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg px-5 py-3">
              <p className="text-sm text-slate-700" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? <><strong>Modèles STT open-source</strong> — Whisper large-v3 reste la référence qualité. Whisper.cpp et faster-whisper permettent un déploiement souverain GPU/CPU. Parakeet-TDT-0.6B est le modèle le plus rapide (TTFA 60ms) pour les cas d'usage temps réel.</>
                  : <><strong>Open-source STT models</strong> — Whisper large-v3 remains the quality reference. Whisper.cpp and faster-whisper enable sovereign GPU/CPU deployment. Parakeet-TDT-0.6B is the fastest model (60ms TTFA) for real-time use cases.</>
                }
              </p>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{isFr ? "Solution" : "Solution"}</th>
                    <th>TTFA</th>
                    <th>WER</th>
                    <th>{isFr ? "Params" : "Params"}</th>
                    <th>{isFr ? "Streaming" : "Streaming"}</th>
                    <th>{isFr ? "Multilingue" : "Multilingual"}</th>
                    <th>{isFr ? "Licence" : "License"}</th>
                  </tr>
                </thead>
                <tbody>
                  {openSTT.map((s: STTData) => (
                    <tr key={s.id}>
                      <td>
                        <div className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.name}</div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">{s.digiDoubleAxis}</div>
                      </td>
                      <td><span className="text-xs font-mono" style={{ color: s.latencyMs <= 100 ? "oklch(0.65 0.18 145)" : s.latencyMs <= 250 ? "oklch(0.75 0.16 75)" : "oklch(0.60 0.20 25)" }}>{s.latencyMs}ms</span></td>
                      <td><span className="text-xs font-mono text-slate-600">{s.wer > 0 ? `${s.wer}%` : "—"}</span></td>
                      <td><span className="text-xs font-mono text-slate-500">{s.params}</span></td>
                      <td><span style={{ color: s.streaming ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{s.streaming ? "✓" : "✗"}</span></td>
                      <td><span style={{ color: s.multilingual ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{s.multilingual ? `✓ ${s.languages} langs` : "✗"}</span></td>
                      <td><span className="text-xs font-mono text-slate-500">{s.license}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {openSTT.map((s: STTData) => (
                <div key={s.id} className="border border-slate-200 rounded-xl p-4 bg-white hover:shadow-md transition-shadow">
                  <div className="font-semibold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.name}</div>
                  <div className="text-xs text-slate-400 font-mono mb-3">{s.digiDoubleAxis} · {s.params}</div>
                  <div className="space-y-2 mb-3">
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Latency</span><span>{s.latencyMs}ms</span></div>
                      <ScoreBar value={s.score.latency} color="oklch(0.72 0.18 200)" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Accuracy</span><span>{s.wer > 0 ? `${s.wer}% WER` : "—"}</span></div>
                      <ScoreBar value={s.score.accuracy} color="oklch(0.65 0.18 145)" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>{s.description}</p>
                  <div className="mt-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "oklch(0.93 0.04 145)", color: "oklch(0.35 0.14 145)" }}>{s.license}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
