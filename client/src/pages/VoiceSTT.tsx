/**
 * VoiceSTT.tsx — GamiWays Research Portal
 * Page: STT / Speech-to-Text — extracted from StateOfArt section C
 * Design: Technical Blueprint, dense comparative tables
 * i18n: EN / FR via LangContext
 */
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import GlossaryLink from "@/components/GlossaryLink";
import { getSTTByCategory, type STTData } from "@/lib/sttData";
import SectionHeader from "@/components/SectionHeader";
import { Home, ChevronRight } from "lucide-react";

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
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100 sticky top-14 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-1 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <InternalLink to="/" className="text-slate-400 hover:text-slate-700 transition-colors" aria-label={isFr ? "Accueil" : "Home"}><Home size={12} /></InternalLink>
          <ChevronRight size={11} className="text-slate-300" />
          <InternalLink to="/voice/tts" className="text-slate-500 hover:text-slate-800 transition-colors">Voice Pipeline</InternalLink>
          <ChevronRight size={11} className="text-slate-300" />
          <span className="font-semibold" style={{ color: "oklch(0.45 0.15 200)" }}>{isFr ? "STT / Reconnaissance Vocale" : "STT / Speech-to-Text"}</span>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader
          number=""
          title={isFr ? "STT / Reconnaissance Vocale" : "STT / Speech-to-Text"}
          subtitle={isFr
            ? "Comparatif des solutions de reconnaissance vocale pour les pipelines conversationnels (2025–2026). Benchmarks, enjeux stratégiques et questions de décision."
            : "Comparison of speech recognition solutions for conversational pipelines (2025–2026). Benchmarks, strategic stakes, and decision questions."}
          accent="orange"
        />

        {/* Strategic Framing Banner */}
        <div className="mb-8 rounded-2xl border border-sky-200 bg-sky-50 overflow-hidden">
          <div className="px-6 py-4 border-b border-sky-200 flex items-center gap-3">
            <span className="text-lg">🎯</span>
            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Cadrage stratégique — STT : bien plus qu'un WER" : "Strategic Framing — STT: Much More Than a WER"}
            </h3>
          </div>
          <div className="px-6 py-5 grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-bold text-sky-700 mb-2 uppercase tracking-wider">
                {isFr ? "La vraie question" : "The Real Question"}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {isFr
                  ? "Le WER (Word Error Rate) ne dit pas tout. La vraie question est : où vos données vocales sont-elles traitées ? Qui y a accès ? Quelle est votre stratégie si le fournisseur augmente ses prix ou est acquis ?"
                  : "WER doesn't tell the whole story. The real question is: where is your voice data processed? Who has access to it? What is your strategy if the provider raises prices or gets acquired?"}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-sky-700 mb-2 uppercase tracking-wider">
                {isFr ? "Spectre d'infrastructure" : "Infrastructure Spectrum"}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {isFr
                  ? "Cloud-only (Google, AssemblyAI) → Cloud+VPC (Deepgram, Azure) → On-premise (Azure containers, Inworld) → Open-source auto-hébergé (Whisper, Voxtral). Chaque étape augmente la souveraineté et réduit le lock-in."
                  : "Cloud-only (Google, AssemblyAI) → Cloud+VPC (Deepgram, Azure) → On-premise (Azure containers, Inworld) → Self-hosted open-source (Whisper, Voxtral). Each step increases sovereignty and reduces lock-in."}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-sky-700 mb-2 uppercase tracking-wider">
                {isFr ? "Signal marché 2026" : "2026 Market Signal"}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {isFr
                  ? "Deepgram (1,3Md$) et AssemblyAI (158M$) sont des cibles d'acquisition. Voxtral et Whisper réduisent l'écart de qualité. Inworld STT augmente ses prix de 400%+. Le marché se consolide rapidement."
                  : "Deepgram ($1.3B) and AssemblyAI ($158M) are acquisition targets. Voxtral and Whisper are closing the quality gap. Inworld STT raised prices 400%+. The market is consolidating fast."}
              </p>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-sky-200 bg-sky-100/50">
            <p className="text-xs text-sky-700">
              <span className="font-bold">
                {isFr ? "Questions à se poser avant de choisir : " : "Questions to ask before choosing: "}
              </span>
              {isFr
                ? "Les données vocales de vos utilisateurs sont-elles soumises au RGPD ou au nLPD suisse ? Avez-vous besoin de la diarisation ou de la rédaction PII ? Votre architecture permet-elle de basculer vers un modèle auto-hébergé sans refonte majeure ? Quel est votre seuil de WER acceptable pour votre domaine spécifique ?"
                : "Is your users' voice data subject to GDPR or Swiss nLPD? Do you need diarization or PII redaction? Does your architecture allow switching to a self-hosted model without major rework? What is your acceptable WER threshold for your specific domain?"}
            </p>
          </div>
        </div>

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
                  ? <><strong>APIs STT cloud temps réel</strong> — Deepgram Nova-3 est la référence latence (75ms TTFA). Whisper large-v3 est le standard de qualité open-source. AssemblyAI Universal-3 Pro domine le benchmark WER multilingue — Voice Agent API $4.50/hr (lancement 29 avr. 2026).</>
                  : <><strong>Real-time cloud STT APIs</strong> — Deepgram Nova-3 is the latency reference (75ms TTFA). Whisper large-v3 is the open-source quality standard. AssemblyAI Universal-3 Pro leads the multilingual WER benchmark — Voice Agent API $4.50/hr (launched Apr 29, 2026).</>
                }
              </p>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{isFr ? "Solution" : "Solution"}</th>
                    <th><span className="inline-flex items-center gap-1">TTFA <GlossaryLink term="TTFA" /></span></th>
                    <th><span className="inline-flex items-center gap-1">WER <GlossaryLink term="WER" /></span></th>
                    <th><span className="inline-flex items-center gap-1">{isFr ? "Streaming" : "Streaming"} <GlossaryLink term="Streaming" /></span></th>
                    <th>{isFr ? "Multilingue" : "Multilingual"}</th>
                    <th><span className="inline-flex items-center gap-1">{isFr ? "Diarisation" : "Diarization"} <GlossaryLink term="Diarization" /></span></th>
                    <th>{isFr ? "Prix/heure" : "Price/hr"}</th>
                    <th><span className="inline-flex items-center gap-1">{isFr ? "Souverain" : "Sovereign"} <GlossaryLink term="Sovereignty" /></span></th>
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
                  <p className="text-xs text-slate-500 leading-relaxed mb-3" style={{ fontFamily: "'Source Serif 4', serif" }}>{s.description}</p>
                  <InternalLink
                    to={`/voice/stt/${s.id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-orange-700 hover:text-orange-900 border border-orange-200 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded transition-colors"
                  >
                    {isFr ? "Fiche complète →" : "Full details →"}
                  </InternalLink>
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
                    <th><span className="inline-flex items-center gap-1">TTFA <GlossaryLink term="TTFA" /></span></th>
                    <th><span className="inline-flex items-center gap-1">WER <GlossaryLink term="WER" /></span></th>
                    <th>{isFr ? "Params" : "Params"}</th>
                    <th><span className="inline-flex items-center gap-1">{isFr ? "Streaming" : "Streaming"} <GlossaryLink term="Streaming" /></span></th>
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
                  <p className="text-xs text-slate-500 leading-relaxed mb-3" style={{ fontFamily: "'Source Serif 4', serif" }}>{s.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "oklch(0.93 0.04 145)", color: "oklch(0.35 0.14 145)" }}>{s.license}</span>
                    <InternalLink
                      to={`/voice/stt/${s.id}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-900 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded transition-colors"
                    >
                      {isFr ? "Fiche complète →" : "Full details →"}
                    </InternalLink>
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
