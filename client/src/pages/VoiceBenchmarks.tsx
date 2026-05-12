/**
 * VoiceBenchmarks.tsx — GamiWays Research Portal
 * Page: Audio Synthesis Benchmarks — STT → TTS comparative synthesis
 * Design: Technical Blueprint
 * i18n: EN / FR via LangContext
 */
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import InternalLink from "@/components/InternalLink";
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";
import GlossaryLink from "@/components/GlossaryLink";

// ─── STT DATA ─────────────────────────────────────────────────────────────────
const STT_BENCHMARKS = [
  { id: "deepgram-nova3",    name: "Deepgram Nova-3",             wer: 7.2,  ttfa: 75,  ttfaTyp: 200, priceMin: 0.0036, self: true,  streaming: true,  langs: 36,  notes: "Best latency cloud" },
  { id: "assemblyai",        name: "AssemblyAI Universal-3 Pro",   wer: 4.9,  ttfa: 150, ttfaTyp: 300, priceMin: 0.0062, self: false, streaming: true,  langs: 99,  notes: "Best WER cloud — Voice Agent API $4.50/hr" },
  { id: "google-stt",        name: "Google Speech-to-Text v2",    wer: 6.8,  ttfa: 200, ttfaTyp: 400, priceMin: 0.006,  self: false, streaming: true,  langs: 125, notes: "Largest language coverage" },
  { id: "azure-stt",         name: "Azure Speech (Microsoft)",    wer: 5.9,  ttfa: 180, ttfaTyp: 350, priceMin: 0.0167, self: true,  streaming: true,  langs: 100, notes: "EU on-premise available" },
  { id: "whisper-large-v3",  name: "Whisper Large v3",            wer: 2.7,  ttfa: 300, ttfaTyp: 800, priceMin: 0,      self: true,  streaming: false, langs: 99,  notes: "Best WER overall (open)" },
  { id: "faster-whisper",    name: "faster-whisper (CTranslate2)",wer: 2.7,  ttfa: 150, ttfaTyp: 300, priceMin: 0,      self: true,  streaming: true,  langs: 99,  notes: "Whisper quality + streaming" },
  { id: "whisper-turbo",     name: "Whisper Turbo",               wer: 3.0,  ttfa: 100, ttfaTyp: 200, priceMin: 0,      self: true,  streaming: true,  langs: 99,  notes: "Speed/quality balance" },
  { id: "audiogami",         name: "Audiogami (Gamilab)",         wer: 3.5,  ttfa: 200, ttfaTyp: 400, priceMin: 0,      self: true,  streaming: true,  langs: 5,   notes: "CH-hosted, FR/DE/Swiss-DE" },
  { id: "voxtral-asr",       name: "Voxtral ASR (Mistral)",       wer: 5.0,  ttfa: 120, ttfaTyp: 250, priceMin: 0.003,  self: true,  streaming: true,  langs: 30,  notes: "EU-sovereign, open-weights" },
  { id: "inworld-stt",       name: "Inworld STT",                 wer: 5.0,  ttfa: 92,  ttfaTyp: 150, priceMin: 0.006,  self: false, streaming: true,  langs: 20,  notes: "Voice agent optimized" },
];

// ─── TTS DATA ─────────────────────────────────────────────────────────────────
const TTS_BENCHMARKS = [
  { id: "cartesia",       name: "Cartesia Sonic 3",              ttfa: 40,  ttfaTyp: 90,   elo: 1054, priceMin: 0.047, self: false, notes: "Fastest TTFA (SSM arch)" },
  { id: "kokoro",         name: "Kokoro 82M v1.0",               ttfa: 60,  ttfaTyp: 120,  elo: 1059, priceMin: 0.0007,self: true,  notes: "Best open-source quality/cost" },
  { id: "elevenlabs",     name: "ElevenLabs v3",                 ttfa: 75,  ttfaTyp: 200,  elo: 1108, priceMin: 0.206, self: false, notes: "Top 3 quality, best cloning" },
  { id: "deepgram_aura",  name: "Deepgram Aura 2",               ttfa: 80,  ttfaTyp: 150,  elo: 0,    priceMin: 0.015, self: false, notes: "Voice agent optimized" },
  { id: "hume_octave",    name: "Hume AI Octave 2",              ttfa: 100, ttfaTyp: 200,  elo: 1046, priceMin: 0.0076,self: false, notes: "Emotion-aware TTS" },
  { id: "kyutai_tts",     name: "Kyutai TTS 1.6B",               ttfa: 100, ttfaTyp: 200,  elo: 0,    priceMin: 0,     self: true,  notes: "Open, multilingual" },
  { id: "ultravox",       name: "Ultravox v0.5",                 ttfa: 100, ttfaTyp: 300,  elo: 0,    priceMin: 0.05,  self: true,  notes: "End-to-end speech LLM" },
  { id: "inworld_tts",    name: "Inworld TTS-2",                 ttfa: 130, ttfaTyp: 250,  elo: 1160, priceMin: 0.035, self: true,  notes: "ELO #1, TTS-2 preview, Voice Direction, 100+ langs" },
  { id: "chatterbox",     name: "Chatterbox (Resemble AI)",      ttfa: 150, ttfaTyp: 300,  elo: 1050, priceMin: 0.04,  self: true,  notes: "Expressive open-source" },
  { id: "voxtral_tts",    name: "Voxtral TTS (Mistral)",         ttfa: 150, ttfaTyp: 300,  elo: 0,    priceMin: 0.02,  self: true,  notes: "EU-sovereign, open-weights" },
  { id: "fish_audio",     name: "Fish Audio OpenAudio S1",       ttfa: 200, ttfaTyp: 400,  elo: 1074, priceMin: 0.015, self: false, notes: "Best multilingual cloning" },
  { id: "moshi",          name: "Moshi (Kyutai)",                ttfa: 200, ttfaTyp: 500,  elo: 0,    priceMin: 0,     self: true,  notes: "Full-duplex end-to-end" },
  { id: "orpheus",        name: "Orpheus 3B",                    ttfa: 200, ttfaTyp: 500,  elo: 0,    priceMin: 0,     self: true,  notes: "Emotional open-source" },
  { id: "stepaudio_25",   name: "StepAudio 2.5 TTS (StepFun)",  ttfa: 200, ttfaTyp: 400,  elo: 1187, priceMin: 0.064, self: false, notes: "ELO #3, dual-level context, no GDPR (CN)" },
  { id: "openai_realtime",name: "OpenAI Realtime API",           ttfa: 300, ttfaTyp: 700,  elo: 1106, priceMin: 0.10,  self: false, notes: "Full-duplex, GPT-4o native" },
  { id: "dia",            name: "Dia (Nari Labs)",               ttfa: 300, ttfaTyp: 800,  elo: 0,    priceMin: 0,     self: true,  notes: "Multi-speaker dialogue" },
  { id: "sesame_csm",     name: "Sesame CSM",                    ttfa: 400, ttfaTyp: 1000, elo: 0,    priceMin: 0,     self: true,  notes: "Context-aware prosody" },
];

// ─── PIPELINE LATENCY BUDGETS ──────────────────────────────────────────────────
const PIPELINE_BUDGETS = [
  { profile: "Voice agent (cloud)",     stt: 150, llm: 600, tts: 120, network: 60,  total: 930,  color: "oklch(0.72 0.18 200)" },
  { profile: "Voice agent (hybrid)",    stt: 100, llm: 400, tts: 80,  network: 50,  total: 630,  color: "oklch(0.65 0.18 145)" },
  { profile: "Self-hosted sovereign",   stt: 200, llm: 350, tts: 100, network: 40,  total: 690,  color: "oklch(0.72 0.18 50)" },
  { profile: "End-to-end (Ultravox/Moshi)", stt: 0, llm: 0, tts: 300, network: 60, total: 360,  color: "oklch(0.60 0.20 280)" },
];

function SortIcon({ active, dir }: { active: boolean; dir: "asc" | "desc" }) {
  return active
    ? dir === "asc" ? <ChevronUp size={11} className="inline ml-0.5" /> : <ChevronDown size={11} className="inline ml-0.5" />
    : <span className="inline-block w-3" />;
}

export default function VoiceBenchmarks() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  type SttKey = "name" | "wer" | "ttfa" | "ttfaTyp" | "priceMin" | "langs" | "self" | "streaming" | "voiceAgent";
  type TtsKey = "name" | "ttfa" | "ttfaTyp" | "elo" | "priceMin" | "self";

  const STT_VOICE_AGENT_IDS = new Set(["assemblyai", "deepgram-nova3", "inworld-stt"]);

  const [sttSort, setSttSort] = useState<{ key: SttKey; dir: "asc" | "desc" }>({ key: "ttfa", dir: "asc" });
  const [ttsSort, setTtsSort] = useState<{ key: TtsKey; dir: "asc" | "desc" }>({ key: "ttfa", dir: "asc" });

  const sortedStt = [...STT_BENCHMARKS].sort((a, b) => {
    const dir = sttSort.dir === "asc" ? 1 : -1;
    switch (sttSort.key) {
      case "name":      return dir * a.name.localeCompare(b.name);
      case "wer":       return dir * (a.wer - b.wer);
      case "ttfa":      return dir * (a.ttfa - b.ttfa);
      case "ttfaTyp":   return dir * (a.ttfaTyp - b.ttfaTyp);
      case "priceMin":  return dir * (a.priceMin - b.priceMin);
      case "langs":     return dir * (a.langs - b.langs);
      case "self":      return dir * ((a.self ? 1 : 0) - (b.self ? 1 : 0));
      case "streaming": return dir * ((a.streaming ? 1 : 0) - (b.streaming ? 1 : 0));
      case "voiceAgent":return dir * ((STT_VOICE_AGENT_IDS.has(a.id) ? 1 : 0) - (STT_VOICE_AGENT_IDS.has(b.id) ? 1 : 0));
      default:          return 0;
    }
  });

  const sortedTts = [...TTS_BENCHMARKS].sort((a, b) => {
    const dir = ttsSort.dir === "asc" ? 1 : -1;
    switch (ttsSort.key) {
      case "name":    return dir * a.name.localeCompare(b.name);
      case "ttfa":    return dir * (a.ttfa - b.ttfa);
      case "ttfaTyp": return dir * (a.ttfaTyp - b.ttfaTyp);
      case "elo":     return dir * (a.elo - b.elo);
      case "priceMin":return dir * (a.priceMin - b.priceMin);
      case "self":    return dir * ((a.self ? 1 : 0) - (b.self ? 1 : 0));
      default:        return 0;
    }
  });

  function toggleStt(key: SttKey) {
    setSttSort(prev => prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });
  }

  function toggleTts(key: TtsKey) {
    setTtsSort(prev => prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });
  }

  const latencyColor = (ms: number, threshold: number) =>
    ms <= threshold ? "oklch(0.65 0.18 145)" : ms <= threshold * 2 ? "oklch(0.72 0.18 50)" : "oklch(0.60 0.20 25)";

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        <SectionHeader
          number="D"
          title={isFr ? "Benchmarks Synthèse Audio" : "Audio Synthesis Benchmarks"}
          subtitle={isFr
            ? "Synthèse comparative des 10 moteurs STT et 17 moteurs TTS évalués. Métriques clés, budgets de latence pipeline et enjeux de décision (2025–2026)."
            : "Comparative synthesis of 10 STT and 17 TTS engines evaluated. Key metrics, pipeline latency budgets, and decision stakes (2025–2026)."}
          accent="orange"
        />

        {/* ── PIPELINE LATENCY BUDGETS ── */}
        <section>
          <h2 className="text-base font-bold mb-1 uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.45 0.15 200)" }}>
            {isFr ? "Budgets de latence pipeline" : "Pipeline latency budgets"}
          </h2>
          <p className="text-sm text-slate-500 mb-4" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Décomposition de la latence end-to-end par profil d'architecture (STT + LLM + TTS + réseau). Cible conversationnelle : < 1 000 ms."
              : "End-to-end latency breakdown by architecture profile (STT + LLM + TTS + network). Conversational target: < 1,000 ms."}
          </p>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{isFr ? "Profil" : "Profile"}</th>
                  <th>STT</th>
                  <th>LLM</th>
                  <th>TTS</th>
                  <th>{isFr ? "Réseau" : "Network"}</th>
                  <th>{isFr ? "Total estimé" : "Estimated total"}</th>
                  <th>{isFr ? "Statut" : "Status"}</th>
                </tr>
              </thead>
              <tbody>
                {PIPELINE_BUDGETS.map((p) => (
                  <tr key={p.profile}>
                    <td className="font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif", color: p.color }}>{p.profile}</td>
                    <td><span className="font-mono text-sm">{p.stt > 0 ? `${p.stt}ms` : "—"}</span></td>
                    <td><span className="font-mono text-sm">{p.llm > 0 ? `${p.llm}ms` : "—"}</span></td>
                    <td><span className="font-mono text-sm">{p.tts}ms</span></td>
                    <td><span className="font-mono text-sm">{p.network}ms</span></td>
                    <td>
                      <span className="font-bold font-mono text-sm" style={{ color: latencyColor(p.total, 800) }}>{p.total}ms</span>
                    </td>
                    <td>
                      {p.total <= 800 ? (
                        <StatusBadge variant="available" label={isFr ? "CIBLE OK" : "TARGET OK"} />
                      ) : p.total <= 1200 ? (
                        <StatusBadge variant="rd" label={isFr ? "ACCEPTABLE" : "ACCEPTABLE"} />
                      ) : (
                        <StatusBadge variant="gap" label={isFr ? "À RÉDUIRE" : "TO REDUCE"} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {isFr ? "* Estimations best-case. Le profil end-to-end (Ultravox/Moshi) fusionne STT+LLM+TTS en un seul modèle." : "* Best-case estimates. End-to-end profile (Ultravox/Moshi) merges STT+LLM+TTS into a single model."}
          </p>
        </section>

        {/* ── STT BENCHMARKS ── */}
        <section>
          <h2 className="text-base font-bold mb-1 uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.45 0.15 200)" }}>
            {isFr ? "STT — Reconnaissance vocale (10 moteurs)" : "STT — Speech Recognition (10 engines)"}
          </h2>
          <p className="text-sm text-slate-500 mb-4" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Cliquez sur les en-têtes pour trier. WER = Word Error Rate (plus bas = meilleur). TTFA = Time to First Audio chunk (latence streaming)."
              : "Click headers to sort. WER = Word Error Rate (lower = better). TTFA = Time to First Audio chunk (streaming latency)."}
          </p>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="cursor-pointer select-none" onClick={() => toggleStt("name")}>
                    {isFr ? "Moteur" : "Engine"} <SortIcon active={sttSort.key === "name"} dir={sttSort.dir} />
                  </th>
                  <th className="cursor-pointer select-none" onClick={() => toggleStt("wer")}>
                    <span className="inline-flex items-center gap-1">WER % <GlossaryLink term="WER" /></span> <SortIcon active={sttSort.key === "wer"} dir={sttSort.dir} />
                  </th>
                  <th className="cursor-pointer select-none" onClick={() => toggleStt("ttfa")}>
                    <span className="inline-flex items-center gap-1">TTFA (ms) <GlossaryLink term="TTFA" /></span> <SortIcon active={sttSort.key === "ttfa"} dir={sttSort.dir} />
                  </th>
                  <th className="cursor-pointer select-none" onClick={() => toggleStt("ttfaTyp")}>
                    {isFr ? "Typ." : "Typical"} <SortIcon active={sttSort.key === "ttfaTyp"} dir={sttSort.dir} />
                  </th>
                  <th className="cursor-pointer select-none" onClick={() => toggleStt("priceMin")}>
                    $/min <SortIcon active={sttSort.key === "priceMin"} dir={sttSort.dir} />
                  </th>
                  <th className="cursor-pointer select-none" onClick={() => toggleStt("langs")}>
                    {isFr ? "Langues" : "Languages"} <SortIcon active={sttSort.key === "langs"} dir={sttSort.dir} />
                  </th>
                  <th className="cursor-pointer select-none" onClick={() => toggleStt("self")}>
                    <span className="inline-flex items-center gap-1">{isFr ? "Souveraineté" : "Sovereignty"} <GlossaryLink term="Sovereignty" /></span> <SortIcon active={sttSort.key === "self"} dir={sttSort.dir} />
                  </th>
                  <th className="cursor-pointer select-none" onClick={() => toggleStt("streaming")}>
                    <span className="inline-flex items-center gap-1">{isFr ? "Streaming" : "Streaming"} <GlossaryLink term="Streaming" /></span> <SortIcon active={sttSort.key === "streaming"} dir={sttSort.dir} />
                  </th>
                  <th>{isFr ? "Note" : "Note"}</th>
                  <th className="cursor-pointer select-none" onClick={() => toggleStt("voiceAgent")}>
                    {isFr ? "Agent vocal" : "Voice Agent"} <SortIcon active={sttSort.key === "voiceAgent"} dir={sttSort.dir} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedStt.map((s) => (
                  <tr key={s.id} id={`stt-${s.id}`} className="scroll-mt-28">
                    <td>
                      <div className="flex flex-col gap-1.5">
                        <span className="font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.25 0.05 220)" }}>{s.name}</span>
                        <InternalLink
                          to={`/voice/stt/${s.id}`}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border border-cyan-200 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition-colors w-fit"
                        >
                          <FileText className="w-3 h-3" />
                          {isFr ? "Fiche détail" : "Detail sheet"}
                        </InternalLink>
                      </div>
                    </td>
                    <td>
                      <span className="font-bold font-mono text-sm" style={{ color: latencyColor(s.wer, 4) }}>{s.wer}%</span>
                    </td>
                    <td>
                      <span className="font-bold font-mono text-sm" style={{ color: latencyColor(s.ttfa, 100) }}>{s.ttfa}ms</span>
                    </td>
                    <td><span className="font-mono text-xs text-slate-400">{s.ttfaTyp}ms</span></td>
                    <td>
                      <span className="font-mono text-sm" style={{ color: s.priceMin === 0 ? "oklch(0.65 0.18 145)" : undefined }}>
                        {s.priceMin === 0 ? isFr ? "Gratuit" : "Free" : `$${s.priceMin}`}
                      </span>
                    </td>
                    <td><span className="font-mono text-xs text-slate-600">{s.langs}</span></td>
                    <td>
                      {s.self
                        ? <StatusBadge variant="available" label={isFr ? "SELF-HOST" : "SELF-HOST"} />
                        : <StatusBadge variant="rd" label="CLOUD" />
                      }
                    </td>
                    <td>
                      {s.streaming
                        ? <StatusBadge variant="available" label="STREAM" />
                        : <StatusBadge variant="gap" label="BATCH" />
                      }
                    </td>
                    <td className="text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>{s.notes}</td>
                    <td>
                      {/* Voice Agent API — lookup from sttData */}
                      {s.id === "assemblyai" ? (
                        <a href="https://www.assemblyai.com/products/voice-agent-api" target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-violet-100 text-violet-700 border border-violet-200 hover:bg-violet-200 transition-colors whitespace-nowrap">
                          ✓ $4.50/hr
                        </a>
                      ) : s.id === "deepgram-nova3" ? (
                        <a href="https://developers.deepgram.com/docs/voice-agent" target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-cyan-100 text-cyan-700 border border-cyan-200 hover:bg-cyan-200 transition-colors whitespace-nowrap">
                          ✓ via Pipecat
                        </a>
                      ) : s.id === "inworld-stt" ? (
                        <a href="https://inworld.ai" target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-cyan-100 text-cyan-700 border border-cyan-200 hover:bg-cyan-200 transition-colors whitespace-nowrap">
                          ✓ inclus
                        </a>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── TTS BENCHMARKS ── */}
        <section>
          <h2 className="text-base font-bold mb-1 uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.45 0.15 200)" }}>
            {isFr ? "TTS — Synthèse vocale (17 moteurs)" : "TTS — Speech Synthesis (17 engines)"}
          </h2>
          <p className="text-sm text-slate-500 mb-4" style={{ fontFamily: "'Source Serif 4', serif" }}>
            {isFr
              ? "Cliquez sur les en-têtes pour trier. TTFA = Time to First Audio. ELO = score Artificial Analysis (0 = non évalué). Prix = coût par minute de parole générée."
              : "Click headers to sort. TTFA = Time to First Audio. ELO = Artificial Analysis score (0 = not evaluated). Price = cost per minute of generated speech."}
          </p>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="cursor-pointer select-none" onClick={() => toggleTts("name")}>
                    {isFr ? "Moteur" : "Engine"} <SortIcon active={ttsSort.key === "name"} dir={ttsSort.dir} />
                  </th>
                  <th className="cursor-pointer select-none" onClick={() => toggleTts("ttfa")}>
                    <span className="inline-flex items-center gap-1">TTFA (ms) <GlossaryLink term="TTFA" /></span> <SortIcon active={ttsSort.key === "ttfa"} dir={ttsSort.dir} />
                  </th>
                  <th className="cursor-pointer select-none" onClick={() => toggleTts("ttfaTyp")}>
                    {isFr ? "Typ." : "Typical"} <SortIcon active={ttsSort.key === "ttfaTyp"} dir={ttsSort.dir} />
                  </th>
                  <th className="cursor-pointer select-none" onClick={() => toggleTts("elo")}>
                    <span className="inline-flex items-center gap-1">ELO <GlossaryLink term="ELO Score" /></span> <SortIcon active={ttsSort.key === "elo"} dir={ttsSort.dir} />
                  </th>
                  <th className="cursor-pointer select-none" onClick={() => toggleTts("priceMin")}>
                    $/min <SortIcon active={ttsSort.key === "priceMin"} dir={ttsSort.dir} />
                  </th>
                  <th className="cursor-pointer select-none" onClick={() => toggleTts("self")}>
                    <span className="inline-flex items-center gap-1">{isFr ? "Souveraineté" : "Sovereignty"} <GlossaryLink term="Sovereignty" /></span> <SortIcon active={ttsSort.key === "self"} dir={ttsSort.dir} />
                  </th>
                  <th>{isFr ? "Note" : "Note"}</th>
                </tr>
              </thead>
              <tbody>
                {sortedTts.map((t) => (
                  <tr key={t.id} id={`tts-${t.id}`} className="scroll-mt-28">
                    <td>
                      <div className="flex flex-col gap-1.5">
                        <span className="font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.25 0.05 220)" }}>{t.name}</span>
                        <InternalLink
                          to={`/tts/${t.id}`}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors w-fit"
                        >
                          <FileText className="w-3 h-3" />
                          {isFr ? "Fiche détail" : "Detail sheet"}
                        </InternalLink>
                      </div>
                    </td>
                    <td>
                      <span className="font-bold font-mono text-sm" style={{ color: latencyColor(t.ttfa, 100) }}>{t.ttfa}ms</span>
                    </td>
                    <td><span className="font-mono text-xs text-slate-400">{t.ttfaTyp}ms</span></td>
                    <td>
                      {t.elo > 0
                        ? <span className="font-bold font-mono text-sm" style={{ color: t.elo >= 1100 ? "oklch(0.65 0.18 145)" : t.elo >= 1050 ? "oklch(0.72 0.18 50)" : undefined }}>{t.elo}</span>
                        : <span className="text-xs text-slate-300 font-mono">—</span>
                      }
                    </td>
                    <td>
                      <span className="font-mono text-sm" style={{ color: t.priceMin === 0 ? "oklch(0.65 0.18 145)" : undefined }}>
                        {t.priceMin === 0 ? isFr ? "Gratuit" : "Free" : `$${t.priceMin}`}
                      </span>
                    </td>
                    <td>
                      {t.self
                        ? <StatusBadge variant="available" label={isFr ? "SELF-HOST" : "SELF-HOST"} />
                        : <StatusBadge variant="rd" label="CLOUD" />
                      }
                    </td>
                    <td className="text-xs text-slate-500" style={{ fontFamily: "'Source Serif 4', serif" }}>{t.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── KEY INSIGHTS ── */}
        <section>
          <h2 className="text-base font-bold mb-4 uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.45 0.15 200)" }}>
            {isFr ? "Points clés de l'analyse" : "Key insights"}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="callout-warning">
              <p className="text-sm font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "Le trilemme Qualité / Latence / Coût" : "The Quality / Latency / Cost trilemma"}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? "Il est impossible d'optimiser simultanément les trois dimensions avec les approches actuelles. Cartesia = latence minimale mais qualité moyenne. Whisper = meilleur WER mais pas streaming-natif. Inworld TTS-2 = ELO #1 + Voice Direction + 100 langues mais cloud US (on-premise Enterprise uniquement). L'innovation continue de réduire les compromis mais ne les élimine pas encore."
                  : "It is impossible to simultaneously optimize all three dimensions with current approaches. Cartesia = minimum latency but average quality. Whisper = best WER but not streaming-native. Inworld TTS-2 = ELO #1 + Voice Direction + 100 languages but US cloud (on-premise Enterprise only). Innovation keeps reducing trade-offs but has not eliminated them yet."}
              </p>
            </div>
            <div className="callout-success">
              <p className="text-sm font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {isFr ? "La fenêtre open-source se referme vite" : "The open-source window is closing fast"}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? "En 2025, les modèles open-source (Whisper, Kokoro, Chatterbox) atteignent 80–90% de la qualité cloud à coût marginal nul. Mais les plateformes cloud investissent massivement : ElevenLabs ($180M), Deepgram ($1.3B valorisation), AssemblyAI ($158M). La parité qualité est probable d'ici 12–18 mois — dans les deux sens."
                  : "In 2025, open-source models (Whisper, Kokoro, Chatterbox) reach 80–90% of cloud quality at zero marginal cost. But cloud platforms are investing heavily: ElevenLabs ($180M), Deepgram ($1.3B valuation), AssemblyAI ($158M). Quality parity is likely within 12–18 months — in both directions."}
              </p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 bg-white">
              <p className="text-sm font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.55 0.20 200)" }}>
                {isFr ? "Souveraineté : le critère qui change tout" : "Sovereignty: the criterion that changes everything"}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? "7 des 10 moteurs STT cloud n'ont pas d'option on-premise. 9 des 17 moteurs TTS sont cloud-only. Pour un projet soumis au RGPD ou à la nLPD suisse, le choix se réduit à : Whisper/faster-whisper (STT), Kokoro/Chatterbox/Voxtral (TTS), Audiogami (STT CH-hosted). L'architecture doit être conçue pour switcher sans refactoring majeur."
                  : "7 of 10 cloud STT engines have no on-premise option. 9 of 17 TTS engines are cloud-only. For a project subject to GDPR or Swiss nLPD, the choice narrows to: Whisper/faster-whisper (STT), Kokoro/Chatterbox/Voxtral (TTS), Audiogami (CH-hosted STT). Architecture must be designed to switch without major refactoring."}
              </p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 bg-white">
              <p className="text-sm font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.55 0.20 280)" }}>
                {isFr ? "L'approche end-to-end : un pari sur l'avenir" : "The end-to-end approach: a bet on the future"}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                {isFr
                  ? "Ultravox, Moshi et OpenAI Realtime API fusionnent STT + LLM + TTS en un seul modèle, réduisant la latence totale à 300–400ms. Mais ces approches sacrifient la modularité, la contrôlabilité et la souveraineté. Elles sont pertinentes pour les cas d'usage temps réel pur, mais risquées pour les applications nécessitant un contrôle fin du contenu ou de la personnalité."
                  : "Ultravox, Moshi, and OpenAI Realtime API merge STT + LLM + TTS into a single model, reducing total latency to 300–400ms. But these approaches sacrifice modularity, controllability, and sovereignty. They are relevant for pure real-time use cases, but risky for applications requiring fine control of content or personality."}
              </p>
            </div>
          </div>
        </section>

        {/* ── NAVIGATION ── */}
        <div className="flex flex-wrap gap-3 pt-2">
          <InternalLink to="/voice/stt" className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-4 py-2 transition-all hover:opacity-90" style={{ background: "oklch(0.55 0.20 200)", fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "← Comparatif STT" : "← STT Comparison"}
          </InternalLink>
          <InternalLink to="/voice/tts" className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-4 py-2 transition-all hover:opacity-90" style={{ background: "oklch(0.55 0.20 200)", fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "← Comparatif TTS" : "← TTS Comparison"}
          </InternalLink>
          <InternalLink to="/voice/scoring" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "Scoring personnalisé →" : "Custom Scoring →"}
          </InternalLink>
          <InternalLink to="/voice/stack" className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" } as React.CSSProperties}>
            {isFr ? "Cadre de Décision →" : "Decision Framework →"}
          </InternalLink>
        </div>
      </div>
    </div>
  );
}
