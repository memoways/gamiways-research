/*
 * VideoPipelineDiagram — DigiDouble Research Portal
 *
 * Architecture: TWO INDEPENDENT STREAMS
 *
 * STREAM A — Source Material Analysis (offline, pre-processing)
 *   Video Archives → Frame Extraction → Semantic Analysis → Video Descriptor DB
 *   → Dynamic Video Playlist (updated in real-time during conversation)
 *   Two types of playback:
 *     - Illustrative videos: play alongside avatar (secondary stream, avatar keeps speaking)
 *     - Informative/interview videos: avatar pauses, video delivers spoken content
 *
 * STREAM B — Avatar Construction (training + inference)
 *   Training Video (single, never played) → Behavioral Fingerprint → Real-time Avatar
 *   Avatar speaks; pauses during informative videos
 *
 * OUTPUT: Dual stream — Real-time Avatar + Dynamic Video Playlist
 *
 * i18n: EN (default) / FR via useLang
 */
import { useLang } from "@/contexts/LangContext";

export default function VideoPipelineDiagram() {
  const { t } = useLang();
  const isFr = t("nav.home") === "Accueil";

  const L = {
    streamA: isFr ? "FLUX A — Analyse des Sources Vidéo" : "STREAM A — Source Video Analysis",
    streamADesc: isFr ? "Traitement offline · Pas un enjeu R&D majeur" : "Offline processing · Not a major R&D challenge",
    archives: isFr ? "Archives Vidéo\n(source material)" : "Video Archives\n(source material)",
    frameExtract: isFr ? "Extraction\nde frames" : "Frame\nExtraction",
    semanticAnalysis: isFr ? "Analyse\nSémantique" : "Semantic\nAnalysis",
    videoDB: isFr ? "Base de\nDescripteurs" : "Video\nDescriptor DB",
    playlist: isFr ? "Playlist Vidéo\nDynamique" : "Dynamic Video\nPlaylist",
    playlistDesc: isFr ? "Mise à jour en temps réel\nselon la conversation" : "Updated in real-time\nbased on conversation",
    illustrative: isFr ? "Vidéos Illustratives" : "Illustrative Videos",
    illustrativeDesc: isFr ? "Jouent en parallèle de l'avatar\n(stream secondaire)" : "Play alongside avatar\n(secondary stream)",
    informative: isFr ? "Vidéos Informatives\n/ Interview" : "Informative /\nInterview Videos",
    informativeDesc: isFr ? "L'avatar se tait\nla vidéo délivre le contenu" : "Avatar pauses\nvideo delivers spoken content",

    streamB: isFr ? "FLUX B — Construction de l'Avatar" : "STREAM B — Avatar Construction",
    streamBDesc: isFr ? "Entraînement offline + inférence temps réel · Enjeu R&D principal" : "Offline training + real-time inference · Main R&D challenge",
    trainingVideo: isFr ? "Vidéo\nd'Entraînement" : "Training\nVideo",
    trainingVideoNote: isFr ? "Unique · Jamais jouée\ndans l'expérience" : "Single · Never played\nin the experience",
    fingerprint: isFr ? "Empreinte\nComportementale" : "Behavioral\nFingerprint",
    fingerprintDesc: isFr ? "Micro-expressions\nGestes · Rythme\nProsodique" : "Micro-expressions\nGestures · Rhythm\nProsody",
    avatarModel: isFr ? "Modèle\nAvatar" : "Avatar\nModel",
    avatarModelDesc: isFr ? "Distillation diffusion\nCache intelligent\n<500ms cible" : "Diffusion distillation\nIntelligent cache\n<500ms target",
    realtimeAvatar: isFr ? "Avatar\nTemps Réel" : "Real-time\nAvatar",
    realtimeAvatarDesc: isFr ? "Parle · S'arrête pendant\nles vidéos informatives" : "Speaks · Pauses during\ninformative videos",

    output: isFr ? "SORTIE — Expérience Dual-Stream" : "OUTPUT — Dual-Stream Experience",
    outputDesc: isFr ? "Synchronisation multi-stream · <100ms · Expertise interne Memoways" : "Multi-stream sync · <100ms · Memoways internal expertise",
    mainStream: isFr ? "Stream Principal\nAvatar temps réel" : "Main Stream\nReal-time avatar",
    secondaryStream: isFr ? "Stream Secondaire\nPlaylist vidéo dynamique" : "Secondary Stream\nDynamic video playlist",
    syncNote: isFr ? "Orchestration intelligente : l'avatar cède la parole aux vidéos informatives\nLes vidéos illustratives jouent en insert sans interrompre l'avatar" : "Smart orchestration: avatar yields to informative videos\nIllustrative videos play as inserts without interrupting avatar",

    rdNote: isFr ? "⚠ Enjeu R&D (Axe 2b)" : "⚠ R&D Challenge (Axis 2b)",
    offlineNote: isFr ? "✓ Offline · Simple" : "✓ Offline · Simple",
    internalNote: isFr ? "✓ Expertise interne" : "✓ Internal expertise",
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 920 520" className="w-full" style={{ fontFamily: "'Space Grotesk', sans-serif", minWidth: 760 }}>

        {/* ─────────────────────────────────────────────────────────────────────
            STREAM A — Source Video Analysis (top half)
        ───────────────────────────────────────────────────────────────────── */}
        {/* Stream A background */}
        <rect x="10" y="10" width="580" height="195" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
        <text x="20" y="28" fontSize="7.5" fontWeight="700" letterSpacing="1" fill="#15803d" fontFamily="'JetBrains Mono', monospace">{L.streamA}</text>
        <text x="20" y="40" fontSize="6.5" fill="#4ade80" fontFamily="'JetBrains Mono', monospace">{L.streamADesc}</text>

        {/* Archives */}
        <rect x="20" y="50" width="90" height="65" rx="4" fill="white" stroke="#16a34a" strokeWidth="1.5" />
        <text x="65" y="75" textAnchor="middle" fontSize="8" fontWeight="700" fill="#15803d">{L.archives.split("\n")[0]}</text>
        <text x="65" y="87" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="'JetBrains Mono', monospace">{L.archives.split("\n")[1]}</text>
        <rect x="22" y="107" width="86" height="12" rx="2" fill="#dcfce7" />
        <text x="65" y="116" textAnchor="middle" fontSize="6" fill="#15803d" fontFamily="'JetBrains Mono', monospace">{L.offlineNote}</text>

        <line x1="110" y1="82" x2="130" y2="82" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#gArr)" />

        {/* Frame Extraction */}
        <rect x="130" y="50" width="90" height="65" rx="4" fill="white" stroke="#16a34a" strokeWidth="1.5" />
        <text x="175" y="75" textAnchor="middle" fontSize="8" fontWeight="700" fill="#15803d">{L.frameExtract.split("\n")[0]}</text>
        <text x="175" y="87" textAnchor="middle" fontSize="8" fontWeight="700" fill="#15803d">{L.frameExtract.split("\n")[1]}</text>
        <text x="175" y="105" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="'JetBrains Mono', monospace">JPEG · 1fps</text>

        <line x1="220" y1="82" x2="240" y2="82" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#gArr)" />

        {/* Semantic Analysis */}
        <rect x="240" y="50" width="90" height="65" rx="4" fill="white" stroke="#16a34a" strokeWidth="1.5" />
        <text x="285" y="72" textAnchor="middle" fontSize="8" fontWeight="700" fill="#15803d">{L.semanticAnalysis.split("\n")[0]}</text>
        <text x="285" y="84" textAnchor="middle" fontSize="8" fontWeight="700" fill="#15803d">{L.semanticAnalysis.split("\n")[1]}</text>
        <text x="285" y="100" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="'JetBrains Mono', monospace">CLIP · BLIP2</text>
        <text x="285" y="110" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="'JetBrains Mono', monospace">Tags · Embeddings</text>

        <line x1="330" y1="82" x2="350" y2="82" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#gArr)" />

        {/* Video Descriptor DB */}
        <rect x="350" y="50" width="90" height="65" rx="4" fill="white" stroke="#16a34a" strokeWidth="1.5" />
        <text x="395" y="72" textAnchor="middle" fontSize="8" fontWeight="700" fill="#15803d">{L.videoDB.split("\n")[0]}</text>
        <text x="395" y="84" textAnchor="middle" fontSize="8" fontWeight="700" fill="#15803d">{L.videoDB.split("\n")[1]}</text>
        <text x="395" y="100" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="'JetBrains Mono', monospace">Vector DB</text>
        <text x="395" y="110" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="'JetBrains Mono', monospace">Semantic search</text>

        <line x1="440" y1="82" x2="460" y2="82" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#gArr)" />

        {/* Dynamic Playlist */}
        <rect x="460" y="45" width="118" height="75" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="519" y="67" textAnchor="middle" fontSize="8" fontWeight="700" fill="#15803d">{L.playlist.split("\n")[0]}</text>
        <text x="519" y="79" textAnchor="middle" fontSize="8" fontWeight="700" fill="#15803d">{L.playlist.split("\n")[1]}</text>
        <text x="519" y="95" textAnchor="middle" fontSize="6.5" fill="#15803d" fontFamily="'JetBrains Mono', monospace">{L.playlistDesc.split("\n")[0]}</text>
        <text x="519" y="107" textAnchor="middle" fontSize="6.5" fill="#15803d" fontFamily="'JetBrains Mono', monospace">{L.playlistDesc.split("\n")[1]}</text>

        {/* Video types */}
        <rect x="20" y="135" width="255" height="60" rx="3" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
        <text x="28" y="150" fontSize="7.5" fontWeight="700" fill="#15803d">{L.illustrative}</text>
        <text x="28" y="163" fontSize="6.5" fill="#475569">{L.illustrativeDesc.split("\n")[0]}</text>
        <text x="28" y="175" fontSize="6.5" fill="#475569">{L.illustrativeDesc.split("\n")[1]}</text>
        <rect x="200" y="140" width="70" height="14" rx="2" fill="#bbf7d0" />
        <text x="235" y="150" textAnchor="middle" fontSize="6" fontWeight="700" fill="#15803d" fontFamily="'JetBrains Mono', monospace">Avatar speaks ✓</text>

        <rect x="285" y="135" width="295" height="60" rx="3" fill="#fef9c3" stroke="#fde047" strokeWidth="1" />
        <text x="293" y="150" fontSize="7.5" fontWeight="700" fill="#854d0e">{L.informative}</text>
        <text x="293" y="163" fontSize="6.5" fill="#475569">{L.informativeDesc.split("\n")[0]}</text>
        <text x="293" y="175" fontSize="6.5" fill="#475569">{L.informativeDesc.split("\n")[1]}</text>
        <rect x="490" y="140" width="80" height="14" rx="2" fill="#fef08a" />
        <text x="530" y="150" textAnchor="middle" fontSize="6" fontWeight="700" fill="#854d0e" fontFamily="'JetBrains Mono', monospace">Avatar pauses ⏸</text>

        {/* ─────────────────────────────────────────────────────────────────────
            STREAM B — Avatar Construction (bottom half)
        ───────────────────────────────────────────────────────────────────── */}
        {/* Stream B background */}
        <rect x="10" y="220" width="580" height="175" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="20" y="238" fontSize="7.5" fontWeight="700" letterSpacing="1" fill="#dc2626" fontFamily="'JetBrains Mono', monospace">{L.streamB}</text>
        <text x="20" y="250" fontSize="6.5" fill="#fca5a5" fontFamily="'JetBrains Mono', monospace">{L.streamBDesc}</text>

        {/* Training Video */}
        <rect x="20" y="260" width="100" height="80" rx="4" fill="white" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,3" />
        <text x="70" y="285" textAnchor="middle" fontSize="8" fontWeight="700" fill="#475569">{L.trainingVideo.split("\n")[0]}</text>
        <text x="70" y="297" textAnchor="middle" fontSize="8" fontWeight="700" fill="#475569">{L.trainingVideo.split("\n")[1]}</text>
        <text x="70" y="313" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">{L.trainingVideoNote.split("\n")[0]}</text>
        <text x="70" y="325" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">{L.trainingVideoNote.split("\n")[1]}</text>

        <line x1="120" y1="300" x2="145" y2="300" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#rArr)" />

        {/* Behavioral Fingerprint */}
        <rect x="145" y="260" width="100" height="80" rx="4" fill="white" stroke="#dc2626" strokeWidth="1.5" />
        <text x="195" y="280" textAnchor="middle" fontSize="8" fontWeight="700" fill="#dc2626">{L.fingerprint.split("\n")[0]}</text>
        <text x="195" y="292" textAnchor="middle" fontSize="8" fontWeight="700" fill="#dc2626">{L.fingerprint.split("\n")[1]}</text>
        {L.fingerprintDesc.split("\n").map((line, i) => (
          <text key={i} x="195" y={308 + i * 12} textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="'JetBrains Mono', monospace">{line}</text>
        ))}

        <line x1="245" y1="300" x2="270" y2="300" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#rArr)" />

        {/* Avatar Model */}
        <rect x="270" y="255" width="100" height="90" rx="4" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
        <text x="320" y="276" textAnchor="middle" fontSize="8" fontWeight="700" fill="#dc2626">{L.avatarModel.split("\n")[0]}</text>
        <text x="320" y="288" textAnchor="middle" fontSize="8" fontWeight="700" fill="#dc2626">{L.avatarModel.split("\n")[1]}</text>
        <rect x="278" y="295" width="84" height="12" rx="2" fill="#fee2e2" />
        <text x="320" y="304" textAnchor="middle" fontSize="6" fontWeight="700" fill="#dc2626" fontFamily="'JetBrains Mono', monospace">{L.rdNote}</text>
        {L.avatarModelDesc.split("\n").map((line, i) => (
          <text key={i} x="320" y={320 + i * 12} textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="'JetBrains Mono', monospace">{line}</text>
        ))}

        <line x1="370" y1="300" x2="395" y2="300" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#rArr)" />

        {/* Real-time Avatar */}
        <rect x="395" y="255" width="110" height="90" rx="4" fill="#eff6ff" stroke="#0891b2" strokeWidth="2" />
        <text x="450" y="276" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0891b2">{L.realtimeAvatar.split("\n")[0]}</text>
        <text x="450" y="288" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0891b2">{L.realtimeAvatar.split("\n")[1]}</text>
        {L.realtimeAvatarDesc.split("\n").map((line, i) => (
          <text key={i} x="450" y={306 + i * 13} textAnchor="middle" fontSize="6.5" fill="#475569" fontFamily="'JetBrains Mono', monospace">{line}</text>
        ))}

        {/* ─────────────────────────────────────────────────────────────────────
            OUTPUT — Dual-Stream Experience (right side)
        ───────────────────────────────────────────────────────────────────── */}
        {/* Arrows from both streams to output */}
        <line x1="578" y1="82" x2="620" y2="82" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#gArr)" />
        <line x1="505" y1="300" x2="620" y2="300" stroke="#0891b2" strokeWidth="1.5" markerEnd="url(#bArr)" />

        {/* Connector vertical line */}
        <line x1="640" y1="82" x2="640" y2="300" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,3" />

        {/* Output block */}
        <rect x="620" y="60" width="290" height="260" rx="6" fill="#f8fafc" stroke="#0891b2" strokeWidth="2" />
        <text x="765" y="80" textAnchor="middle" fontSize="7.5" fontWeight="700" letterSpacing="1" fill="#0891b2" fontFamily="'JetBrains Mono', monospace">{L.output}</text>
        <text x="765" y="93" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="'JetBrains Mono', monospace">{L.outputDesc}</text>

        {/* Main stream — Avatar */}
        <rect x="635" y="105" width="260" height="75" rx="4" fill="#eff6ff" stroke="#0891b2" strokeWidth="1.5" />
        <text x="765" y="125" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0891b2">{L.mainStream.split("\n")[0]}</text>
        <text x="765" y="138" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0891b2">{L.mainStream.split("\n")[1]}</text>
        <text x="765" y="154" textAnchor="middle" fontSize="6.5" fill="#475569" fontFamily="'JetBrains Mono', monospace">WebRTC · H.264 · &lt;100ms</text>
        <text x="765" y="166" textAnchor="middle" fontSize="6.5" fill="#475569" fontFamily="'JetBrains Mono', monospace">Pauses during informative videos</text>

        {/* Secondary stream — Playlist */}
        <rect x="635" y="192" width="260" height="75" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
        <text x="765" y="212" textAnchor="middle" fontSize="8" fontWeight="700" fill="#15803d">{L.secondaryStream.split("\n")[0]}</text>
        <text x="765" y="225" textAnchor="middle" fontSize="8" fontWeight="700" fill="#15803d">{L.secondaryStream.split("\n")[1]}</text>
        <text x="765" y="241" textAnchor="middle" fontSize="6.5" fill="#475569" fontFamily="'JetBrains Mono', monospace">Illustrative: insert alongside avatar</text>
        <text x="765" y="253" textAnchor="middle" fontSize="6.5" fill="#475569" fontFamily="'JetBrains Mono', monospace">Informative: full-screen, avatar pauses</text>

        {/* Sync note */}
        <rect x="635" y="280" width="260" height="30" rx="3" fill="#fefce8" stroke="#fde047" strokeWidth="1" />
        <text x="765" y="293" textAnchor="middle" fontSize="6.5" fill="#854d0e" fontFamily="'JetBrains Mono', monospace">{L.syncNote.split("\n")[0]}</text>
        <text x="765" y="305" textAnchor="middle" fontSize="6.5" fill="#854d0e" fontFamily="'JetBrains Mono', monospace">{L.syncNote.split("\n")[1]}</text>

        {/* ─────────────────────────────────────────────────────────────────────
            Axis labels
        ───────────────────────────────────────────────────────────────────── */}
        <rect x="10" y="405" width="580" height="30" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        <text x="295" y="418" textAnchor="middle" fontSize="7" fontWeight="700" fill="#64748b" fontFamily="'JetBrains Mono', monospace">
          {isFr ? "Axes de Recherche : Axe 2b (Avatar <500ms) · Axe 2a (TTS Expressif) · Axe 1 (Mémoire Conversationnelle)" : "Research Axes: Axis 2b (Avatar <500ms) · Axis 2a (Expressive TTS) · Axis 1 (Conversational Memory)"}
        </text>
        <text x="295" y="430" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
          {isFr ? "L'analyse des sources vidéo (Flux A) n'est PAS un enjeu de recherche — traitement offline standard" : "Source video analysis (Stream A) is NOT a research challenge — standard offline processing"}
        </text>

        {/* ─────────────────────────────────────────────────────────────────────
            Arrow markers
        ───────────────────────────────────────────────────────────────────── */}
        <defs>
          <marker id="gArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#16a34a" />
          </marker>
          <marker id="rArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" />
          </marker>
          <marker id="bArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#0891b2" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
