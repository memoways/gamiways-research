/**
 * VoiceTTS.tsx — DigiDouble Research Portal
 * Page: TTS & Voice Synthesis — extracted from StateOfArt section B
 * Design: Technical Blueprint, dense comparative tables
 * i18n: EN / FR via LangContext
 */
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import { getTTSByCategory, type TTSData } from "@/lib/ttsData";
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

function TTSCard({ tts, isFr }: { tts: TTSData; isFr: boolean }) {
  const catColor = tts.category === "cloud-api" ? "oklch(0.72 0.18 200)" : tts.category === "open-source" ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 280)";
  const catLabel = tts.category === "cloud-api" ? "Cloud API" : tts.category === "open-source" ? "Open Source" : "Voice-to-Voice";
  const catLabelFr = tts.category === "cloud-api" ? "API Cloud" : tts.category === "open-source" ? "Open Source" : "Voix-à-Voix";
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded mb-1 inline-block" style={{ background: catColor + "22", color: catColor }}>
            {isFr ? catLabelFr : catLabel}
          </span>
          <h4 className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{tts.name}</h4>
          <p className="text-xs text-slate-400 mt-0.5 leading-snug" style={{ fontFamily: "'Source Serif 4', serif" }}>{tts.tagline}</p>
        </div>
      </div>
      <div className="space-y-1.5">
        {[
          { label: isFr ? "Qualité" : "Quality", value: tts.score.quality, color: "oklch(0.72 0.18 200)" },
          { label: isFr ? "Latence" : "Latency", value: tts.score.latency, color: "oklch(0.65 0.18 145)" },
          { label: isFr ? "Clonage" : "Cloning", value: tts.score.voiceCloning, color: "oklch(0.72 0.18 280)" },
          { label: isFr ? "Souveraineté" : "Sovereignty", value: tts.score.sovereignty, color: "oklch(0.72 0.18 25)" },
          { label: isFr ? "Prix" : "Pricing", value: tts.score.pricing, color: "oklch(0.65 0.18 145)" },
        ].map(({ label, value, color }) => (
          <div key={label}>
            <div className="flex justify-between text-xs text-slate-400 mb-0.5">
              <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{label}</span>
              <span className="font-mono">{value}/10</span>
            </div>
            <ScoreBar value={value} color={color} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{tts.ttfaMs}ms TTFA</span>
        {tts.eloScore > 0 && <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-700">ELO {tts.eloScore}</span>}
        {tts.voiceCloning && <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">{isFr ? "Clonage" : "Cloning"}</span>}
        {tts.selfHostable && <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-700">{isFr ? "Souverain" : "Sovereign"}</span>}
        {tts.lipsyncData && <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-violet-50 text-violet-700">Lip-sync</span>}
      </div>
      <div className="text-xs font-mono text-slate-400 border-t border-slate-100 pt-2">{tts.digiDoubleAxis}</div>
      <InternalLink to={`/tts/${tts.id}`} className="mt-auto text-xs font-mono font-bold text-cyan-600 hover:text-cyan-800 underline">
        {isFr ? "Fiche détaillée →" : "Full details →"}
      </InternalLink>
    </div>
  );
}

type TTSTab = "commercial" | "opensource";

export default function VoiceTTS() {
  const [ttsTab, setTtsTab] = useState<TTSTab>("commercial");
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const cloudTTS = getTTSByCategory("cloud-api");
  const openTTS = getTTSByCategory("open-source");

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
            {isFr ? "TTS & Synthèse Vocale" : "TTS & Voice Synthesis"}
          </span>
          <div className="ml-auto flex gap-2">
            <InternalLink to="/voice/stt" className="text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors">
              {isFr ? "→ STT" : "→ STT"}
            </InternalLink>
            <InternalLink to="/voice/pipeline" className="text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors">
              {isFr ? "→ Pipeline" : "→ Pipeline"}
            </InternalLink>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader
          number="B"
          title={isFr ? "TTS & Synthèse Vocale" : "TTS & Voice Synthesis"}
          subtitle={isFr
            ? "Comparatif des solutions de synthèse vocale pour le pipeline conversationnel DigiDouble (2025–2026)."
            : "Comparison of voice synthesis solutions for the DigiDouble conversational pipeline (2025–2026)."}
          accent="cyan"
        />

        {/* Strategic Framing Banner */}
        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 overflow-hidden">
          <div className="px-6 py-4 border-b border-amber-200 flex items-center gap-3">
            <span className="text-lg">🎯</span>
            <h3 className="text-sm font-bold uppercase tracking-widest text-amber-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isFr ? "Cadrage stratégique — Au-delà de la latence et du coût" : "Strategic Framing — Beyond Latency & Cost"}
            </h3>
          </div>
          <div className="px-6 py-5 grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-bold text-amber-700 mb-2 uppercase tracking-wider">
                {isFr ? "La vraie question" : "The Real Question"}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {isFr
                  ? "Choisir un TTS ne se résume pas à comparer des benchmarks. La vraie question est : quel niveau de souveraineté des données, de contrôle de l'infrastructure et de flexibilité de déploiement est nécessaire pour votre cas d'usage ?"
                  : "Choosing a TTS is not just about comparing benchmarks. The real question is: what level of data sovereignty, infrastructure control, and deployment flexibility does your use case require?"}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-amber-700 mb-2 uppercase tracking-wider">
                {isFr ? "Phase 1 vs Phase 2" : "Phase 1 vs Phase 2"}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {isFr
                  ? "Phase 1 (MVP) : privilégier la qualité et la vitesse de déploiement (ElevenLabs, Inworld, Cartesia). Phase 2 (production souveraine) : migrer vers on-premise ou open-source auto-hébergé (Inworld on-premise, Chatterbox, Kokoro)."
                  : "Phase 1 (MVP): prioritize quality and deployment speed (ElevenLabs, Inworld, Cartesia). Phase 2 (sovereign production): migrate to on-premise or self-hosted open-source (Inworld on-premise, Chatterbox, Kokoro)."}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-amber-700 mb-2 uppercase tracking-wider">
                {isFr ? "Signal marché 2026" : "2026 Market Signal"}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {isFr
                  ? "ElevenLabs (11Md$) va off-cloud. Inworld est ELO #1 à 75% moins cher. Chatterbox bat ElevenLabs en tests à l'aveugle. L'écart de qualité entre cloud et open-source se réduit rapidement."
                  : "ElevenLabs ($11B) is going off-cloud. Inworld is ELO #1 at 75% lower cost. Chatterbox beats ElevenLabs in blind tests. The quality gap between cloud and open-source is closing fast."}
              </p>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-amber-200 bg-amber-100/50">
            <p className="text-xs text-amber-700">
              <span className="font-bold">
                {isFr ? "Questions clés pour DigiDouble : " : "Key questions for DigiDouble: "}
              </span>
              {isFr
                ? "Quel est le niveau de sensibilité des données vocales traitées ? Quelle est la stratégie de sortie si le fournisseur augmente ses prix de 400% ? L'architecture permet-elle de migrer vers l'open-source sans refonte majeure ?"
                : "What is the sensitivity level of the voice data being processed? What is the exit strategy if the provider raises prices by 400%? Does the architecture allow migration to open-source without major rework?"}
            </p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex gap-1 mb-5 border-b border-slate-200">
          {(["commercial", "opensource"] as TTSTab[]).map((tab) => (
            <button key={tab} onClick={() => setTtsTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                ttsTab === tab ? "border-violet-500 text-violet-600" : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {subTabLabels[tab]}
            </button>
          ))}
        </div>

        {ttsTab === "commercial" && (
          <div>
            {/* Context banner */}
            <div className="mb-6 bg-violet-50 border border-violet-200 rounded-lg px-5 py-4">
              <div className="flex items-start gap-3">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded mt-0.5" style={{ background: "oklch(0.55 0.20 280)", color: "white" }}>MVP PHASE 1</span>
                <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr
                    ? <><strong>Voice-to-Voice est le premier livrable de DigiDouble.</strong> Cette section couvre les APIs cloud TTS streaming (2025–2026) pour guider le choix d'architecture du pipeline vocal Phase 1.</>
                    : <><strong>Voice-to-Voice is DigiDouble's first deliverable.</strong> This section covers cloud streaming TTS APIs (2025–2026) to guide Phase 1 voice pipeline architecture decisions.</>
                  }
                </p>
              </div>
            </div>
            {/* Tableau comparatif Cloud */}
            <div className="overflow-x-auto mb-6">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{isFr ? "Solution" : "Solution"}</th>
                    <th>TTFA</th>
                    <th>ELO</th>
                    <th>{isFr ? "Clonage" : "Cloning"}</th>
                    <th>{isFr ? "Émotion" : "Emotion"}</th>
                    <th>{isFr ? "Multilingue" : "Multilingual"}</th>
                    <th>{isFr ? "Prix/1M" : "Price/1M"}</th>
                    <th>{isFr ? "Fiche" : "Detail"}</th>
                  </tr>
                </thead>
                <tbody>
                  {cloudTTS.map((t: TTSData) => (
                    <tr key={t.id}>
                      <td>
                        <div className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.name}</div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">{t.digiDoubleAxis}</div>
                      </td>
                      <td><span className="text-xs font-mono" style={{ color: t.ttfaMs <= 100 ? "oklch(0.65 0.18 145)" : t.ttfaMs <= 250 ? "oklch(0.75 0.16 75)" : "oklch(0.60 0.20 25)" }}>{t.ttfaMs}ms</span></td>
                      <td><span className="text-xs font-mono text-slate-600">{t.eloScore > 0 ? t.eloScore : "—"}</span></td>
                      <td><span style={{ color: t.voiceCloning ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{t.voiceCloning ? "✓" : "✗"}</span></td>
                      <td><span style={{ color: t.emotionControl ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{t.emotionControl ? "✓" : "✗"}</span></td>
                      <td><span style={{ color: t.multilingual ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{t.multilingual ? `✓ ${t.languages}` : "✗"}</span></td>
                      <td><span className="text-xs font-mono text-slate-600">{t.pricePerMChar > 0 ? `$${t.pricePerMChar}` : isFr ? "Gratuit" : "Free"}</span></td>
                      <td><InternalLink to={`/tts/${t.id}`} className="text-xs font-mono text-violet-600 hover:text-violet-800 underline">{isFr ? "Voir →" : "View →"}</InternalLink></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {cloudTTS.map((t: TTSData) => (
                <TTSCard key={t.id} tts={t} isFr={isFr} />
              ))}
            </div>
            {/* Architecture decision callout */}
            <div className="callout-warning">
              <p className="text-sm font-semibold text-slate-800 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Décision d'architecture Phase 1 : Cascade vs End-to-End" : "Phase 1 Architecture Decision: Cascade vs End-to-End"}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? <>Le MVP Phase 1 doit choisir entre deux approches : <strong>(A) Pipeline en cascade</strong> (ASR → LLM → TTS, ex. Deepgram Nova-3 + Mistral + Cartesia/Kokoro) — plus contrôlable, clonage vocal possible, souveraineté totale possible, latence ~400–800ms ; ou <strong>(B) End-to-end V2V</strong> (Ultravox, Moshi) — latence ~100ms mais moins contrôlable, pas de clonage vocal. <strong>Recommandation DigiDouble :</strong> commencer par (A) avec Voxtral TTS (Mistral, mars 2026) + Deepgram Nova-3 pour valider la qualité conversationnelle, puis évaluer (B) pour l'optimisation latence en Phase 2.</>
                  : <>Phase 1 MVP must choose between two approaches: <strong>(A) Cascading pipeline</strong> (ASR → LLM → TTS, e.g. Deepgram Nova-3 + Mistral + Cartesia/Kokoro) — more controllable, voice cloning possible, full sovereignty possible, ~400–800ms latency; or <strong>(B) End-to-end V2V</strong> (Ultravox, Moshi) — ~100ms latency but less controllable, no voice cloning. <strong>DigiDouble recommendation:</strong> start with (A) using Voxtral TTS (Mistral, March 2026) + Deepgram Nova-3 to validate conversational quality, then evaluate (B) for latency optimization in Phase 2.</>
                }
              </p>
              <div className="mt-4">
                <InternalLink to="/voice/pipeline" className="cta-primary">
                  {isFr ? "→ Diagramme interactif du Pipeline Phase 1" : "→ Interactive Phase 1 Pipeline Diagram"}
                </InternalLink>
              </div>
            </div>
          </div>
        )}

        {ttsTab === "opensource" && (
          <div>
            <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg px-5 py-4">
              <div className="flex items-start gap-3">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded mt-0.5" style={{ background: "oklch(0.65 0.18 145)", color: "white" }}>OPEN SOURCE</span>
                <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {isFr
                    ? <><strong>Modèles open-source souverains</strong> (auto-hébergeables, GDPR-ready) — incluant les modèles Voice-to-Voice end-to-end (Ultravox, Moshi, Voxtral) qui éliminent le pipeline ASR+LLM+TTS.</>
                    : <><strong>Sovereign open-source models</strong> (self-hostable, GDPR-ready) — including end-to-end Voice-to-Voice models (Ultravox, Moshi, Voxtral) that eliminate the ASR+LLM+TTS pipeline.</>
                  }
                </p>
              </div>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{isFr ? "Solution" : "Solution"}</th>
                    <th>TTFA</th>
                    <th>ELO</th>
                    <th>{isFr ? "Clonage" : "Cloning"}</th>
                    <th>{isFr ? "V2V" : "V2V"}</th>
                    <th>{isFr ? "Multilingue" : "Multilingual"}</th>
                    <th>{isFr ? "Licence" : "License"}</th>
                    <th>{isFr ? "Fiche" : "Detail"}</th>
                  </tr>
                </thead>
                <tbody>
                  {openTTS.map((t: TTSData) => (
                    <tr key={t.id}>
                      <td>
                        <div className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.name}</div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">{t.digiDoubleAxis}</div>
                      </td>
                      <td><span className="text-xs font-mono" style={{ color: t.ttfaMs <= 100 ? "oklch(0.65 0.18 145)" : t.ttfaMs <= 250 ? "oklch(0.75 0.16 75)" : "oklch(0.60 0.20 25)" }}>{t.ttfaMs}ms</span></td>
                      <td><span className="text-xs font-mono text-slate-600">{t.eloScore > 0 ? t.eloScore : "—"}</span></td>
                      <td><span style={{ color: t.voiceCloning ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{t.voiceCloning ? "✓" : "✗"}</span></td>
                      <td><span style={{ color: (t as any).isV2V ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{(t as any).isV2V ? "✓" : "✗"}</span></td>
                      <td><span style={{ color: t.multilingual ? "oklch(0.65 0.18 145)" : "oklch(0.60 0.20 25)" }}>{t.multilingual ? `✓ ${t.languages}` : "✗"}</span></td>
                      <td><span className="text-xs font-mono text-slate-500">{t.license}</span></td>
                      <td><InternalLink to={`/tts/${t.id}`} className="text-xs font-mono text-emerald-600 hover:text-emerald-800 underline">{isFr ? "Voir →" : "View →"}</InternalLink></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {openTTS.map((t: TTSData) => (
                <TTSCard key={t.id} tts={t} isFr={isFr} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
