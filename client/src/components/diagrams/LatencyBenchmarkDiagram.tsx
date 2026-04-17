/*
 * LatencyBenchmarkDiagram — Latency benchmarks per component
 * i18n: EN (default) / FR via useLang
 * Size: +35% from original
 */
import { useLang } from "@/contexts/LangContext";

interface BenchmarkEntry {
  labelEn: string;
  labelFr: string;
  best: number;
  typical: number;
  target: number;
  unit: string;
  isBottleneck?: boolean;
}

const data: BenchmarkEntry[] = [
  { labelEn: "ASR/STT Deepgram",         labelFr: "ASR/STT Deepgram",         best: 75,   typical: 200,  target: 300, unit: "ms" },
  { labelEn: "ASR/STT Whisper local",     labelFr: "ASR/STT Whisper local",     best: 200,  typical: 500,  target: 300, unit: "ms" },
  { labelEn: "LLM GPT-4o streaming",      labelFr: "LLM GPT-4o streaming",      best: 350,  typical: 800,  target: 500, unit: "ms" },
  { labelEn: "LLM SLM local quantized",   labelFr: "LLM SLM local quantifié",   best: 150,  typical: 400,  target: 500, unit: "ms" },
  { labelEn: "TTS Cartesia streaming",    labelFr: "TTS Cartesia streaming",    best: 80,   typical: 150,  target: 200, unit: "ms" },
  { labelEn: "TTS ElevenLabs streaming",  labelFr: "TTS ElevenLabs streaming",  best: 180,  typical: 250,  target: 200, unit: "ms" },
  { labelEn: "TTS Kokoro local (OS)",     labelFr: "TTS Kokoro local (OS)",     best: 60,   typical: 120,  target: 200, unit: "ms" },
  { labelEn: "Avatar Beyond Presence",    labelFr: "Avatar Beyond Presence",    best: 80,   typical: 100,  target: 500, unit: "ms" },
  { labelEn: "Avatar HeyGen API",         labelFr: "Avatar HeyGen API",         best: 3000, typical: 8000, target: 500, unit: "ms", isBottleneck: true },
  { labelEn: "Avatar HeyGem OS (GPU)",    labelFr: "Avatar HeyGem OS (GPU)",    best: 2000, typical: 5000, target: 500, unit: "ms", isBottleneck: true },
  { labelEn: "Avatar LemonSlice (hosted)", labelFr: "Avatar LemonSlice (hosted)", best: 3000, typical: 4000, target: 500, unit: "ms", isBottleneck: true },
  { labelEn: "Network WebRTC",            labelFr: "Réseau WebRTC",             best: 30,   typical: 80,   target: 100, unit: "ms" },
];

const MAX_DISPLAY = 9000;

export default function LatencyBenchmarkDiagram() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  const ROW_H = 35;
  const LABEL_W = 243;
  const BAR_MAX_W = 513;
  const PAD_LEFT = 20;
  const PAD_TOP = 54;
  const SVG_W = PAD_LEFT + LABEL_W + BAR_MAX_W + 162;
  const SVG_H = PAD_TOP + data.length * ROW_H + 80;

  function barW(val: number) {
    return Math.min((val / MAX_DISPLAY) * BAR_MAX_W, BAR_MAX_W);
  }

  const targetLine = barW(2000);

  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {/* Title */}
        <text x={PAD_LEFT} y="24" fontSize="13" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
          {isFr ? "BENCHMARKS DE LATENCE PAR COMPOSANT (2025–2026)" : "LATENCY BENCHMARKS PER COMPONENT (2025–2026)"}
        </text>

        {/* Column headers */}
        <text x={PAD_LEFT + LABEL_W + 4} y="46" fontSize="12" fill="#64748b" fontFamily="'JetBrains Mono', monospace">0ms</text>
        <text x={PAD_LEFT + LABEL_W + barW(1000)} y="46" textAnchor="middle" fontSize="12" fill="#64748b" fontFamily="'JetBrains Mono', monospace">1s</text>
        <text x={PAD_LEFT + LABEL_W + barW(3000)} y="46" textAnchor="middle" fontSize="12" fill="#64748b" fontFamily="'JetBrains Mono', monospace">3s</text>
        <text x={PAD_LEFT + LABEL_W + barW(6000)} y="46" textAnchor="middle" fontSize="12" fill="#64748b" fontFamily="'JetBrains Mono', monospace">6s</text>
        <text x={PAD_LEFT + LABEL_W + barW(9000)} y="46" textAnchor="end" fontSize="12" fill="#64748b" fontFamily="'JetBrains Mono', monospace">9s</text>

        {/* Grid lines */}
        {[1000, 2000, 3000, 6000, 9000].map((ms) => (
          <line key={ms}
            x1={PAD_LEFT + LABEL_W + barW(ms)} y1={PAD_TOP - 5}
            x2={PAD_LEFT + LABEL_W + barW(ms)} y2={PAD_TOP + data.length * ROW_H}
            stroke="#f1f5f9" strokeWidth="1.5"
          />
        ))}

        {/* 2s target line */}
        <line
          x1={PAD_LEFT + LABEL_W + targetLine} y1={PAD_TOP - 5}
          x2={PAD_LEFT + LABEL_W + targetLine} y2={PAD_TOP + data.length * ROW_H + 14}
          stroke="#16a34a" strokeWidth="2" strokeDasharray="7,4"
        />
        <text x={PAD_LEFT + LABEL_W + targetLine + 5} y={PAD_TOP - 8}
          fontSize="12" fill="#16a34a" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
          {isFr ? "Cible 2s" : "Target 2s"}
        </text>

        {/* Rows */}
        {data.map((entry, i) => {
          const y = PAD_TOP + i * ROW_H;
          const onTarget = entry.best <= entry.target;
          const barColor = entry.isBottleneck ? "#dc2626" : onTarget ? "#16a34a" : "#d97706";
          const label = isFr ? entry.labelFr : entry.labelEn;

          return (
            <g key={entry.labelEn}>
              {i % 2 === 0 && (
                <rect x={PAD_LEFT} y={y} width={SVG_W - PAD_LEFT * 2} height={ROW_H} fill="#f8fafc" opacity="0.5" />
              )}
              <text x={PAD_LEFT + LABEL_W - 8} y={y + ROW_H / 2 + 5}
                textAnchor="end" fontSize="13"
                fill={entry.isBottleneck ? "#dc2626" : "#374151"}
                fontWeight={entry.isBottleneck ? "600" : "400"}>
                {label}
              </text>
              <rect x={PAD_LEFT + LABEL_W} y={y + 8} width={barW(entry.typical)} height={ROW_H - 16} rx={3} fill={barColor} opacity="0.2" />
              <rect x={PAD_LEFT + LABEL_W} y={y + 8} width={barW(entry.best)} height={ROW_H - 16} rx={3} fill={barColor} opacity="0.85" />
              <line
                x1={PAD_LEFT + LABEL_W + barW(entry.target)} y1={y + 5}
                x2={PAD_LEFT + LABEL_W + barW(entry.target)} y2={y + ROW_H - 5}
                stroke="#16a34a" strokeWidth="2" opacity="0.6"
              />
              <text x={PAD_LEFT + LABEL_W + barW(entry.typical) + 8} y={y + ROW_H / 2 + 5}
                fontSize="12" fill={entry.isBottleneck ? "#dc2626" : "#64748b"}
                fontFamily="'JetBrains Mono', monospace" fontWeight={entry.isBottleneck ? "700" : "400"}>
                {entry.best}–{entry.typical}{entry.unit}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${PAD_LEFT}, ${PAD_TOP + data.length * ROW_H + 26})`}>
          <rect x="0" y="0" width="16" height="11" rx="2" fill="#16a34a" opacity="0.85" />
          <text x="21" y="10" fontSize="12" fill="#64748b" fontFamily="'JetBrains Mono', monospace">
            {isFr ? "Best-case (foncé)" : "Best-case (dark)"}
          </text>
          <rect x="162" y="0" width="16" height="11" rx="2" fill="#16a34a" opacity="0.2" />
          <text x="183" y="10" fontSize="12" fill="#64748b" fontFamily="'JetBrains Mono', monospace">
            {isFr ? "Typique (clair)" : "Typical (light)"}
          </text>
          <line x1="324" y1="5" x2="340" y2="5" stroke="#16a34a" strokeWidth="2" />
          <text x="345" y="10" fontSize="12" fill="#16a34a" fontFamily="'JetBrains Mono', monospace">
            {isFr ? "Cible DigiDouble" : "DigiDouble Target"}
          </text>
          <rect x="500" y="0" width="16" height="11" rx="2" fill="#dc2626" opacity="0.85" />
          <text x="521" y="10" fontSize="12" fill="#dc2626" fontFamily="'JetBrains Mono', monospace">
            {isFr ? "Goulot d'étranglement" : "Bottleneck"}
          </text>
        </g>
      </svg>
    </div>
  );
}
