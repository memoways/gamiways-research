/*
 * prototypeDiagrams.ts — GamiWays Research Portal
 * Mermaid diagram definitions extracted verbatim from Notion pages:
 * - AVA: https://www.notion.so/ulrichfischer/Prototype-1-AVA-31d511682fc380bd9e86ec7a419a4c65
 * - Dilemme Light: https://www.notion.so/ulrichfischer/Prototype-Dilemme-plastique-tutoriel-2eb511682fc3803c86edfa361f48b9d3
 * - Dilemme Flowise: https://www.notion.so/ulrichfischer/Prototype-Dilemme-Plastique-Flowise-2ec511682fc380efad0bdbabef626f47
 */

// ─── AVA DIAGRAMS ─────────────────────────────────────────────────────────────

export const AVA_UX_FLOW = `flowchart TD
    START(["🎬 Arrivée sur l'app"]) --> ONB["Onboarding skippable\\ncontexte + autorisation micro"]
    ONB --> AB{"A/B onboarding"}
    AB -->|"Variante A"| CO["Co-création\\nle joueur comprend son rôle"]
    AB -->|"Variante B"| NA["Narrateur omniscient\\ncadre imposé"]
    CO --> INTRO["📽️ Intro vidéo\\nplaceholder ou Gumlet"]
    NA --> INTRO
    INTRO --> CALL["📞 Appel entrant\\nMax contacte le joueur"]
    CALL --> CONV["🎙️ Conversation voice-to-voice\\ntimer 10 min"]
    CONV --> GM{"Game Master\\névalue chaque tour"}
    GM -->|"Thème narratif détecté"| TRIG["📺 Trigger vidéo\\nscène contextuelle"]
    GM -->|"Progression narrative"| NEXT["Tour suivant\\nMax répond"]
    TRIG --> NEXT
    NEXT --> CONV
    GM -->|"Fin timer ou game over"| END["🏁 Fin de session\\nrésumé narratif"]`;

export const AVA_PIPELINE = `flowchart LR
    U["Utilisateur\\nparle"] --> STT["STT Deepgram\\nWebSocket + VAD\\n~ instantané"]
    STT --> RW["Query rewrite\\ngemini-3-flash\\nbudget 250 ms"]
    RW --> RAG["RAG v2\\nVoyage + HNSW\\nbudget 250 ms"]
    RAG --> GMpre["GM pré-tour\\nbrief JSON\\nbudget 400 ms"]
    GMpre --> MAX["Réponse Max\\nOpenRouter LLM\\nbudget 800 ms"]
    MAX --> VAL["Validateur\\nanti-hallucination\\nbudget 500 ms"]
    VAL --> TTS["TTS ElevenLabs\\nstreaming\\nbudget 600 ms"]
    TTS --> AUDIO["Max parle\\nvoix custom"]
    AUDIO --> GMpost["GM post-tour\\ntrust / trigger / game state"]`;

export const AVA_GM_LOOP = `flowchart TB
    USER["Dernier message utilisateur\\n+ historique récent"] --> RAGCTX["Contexte RAG\\nallowed_facts, hypotheses,\\nforbidden_topics"]
    RAGCTX --> PRE["1. GM pré-tour\\nplanGameMasterTurn"]
    PRE --> BRIEF["Brief JSON\\nresponse_mode\\nopenness_level\\nreveal_budget\\nallowed_knowledge\\nblocked_assertions\\nstyle_instructions"]
    BRIEF --> MAX["2. Max génère\\nune réponse incarnée"]
    MAX --> VALID{"Validateur\\nanti-hallucination"}
    VALID -->|"OK"| TTS["TTS\\nréponse lue"]
    VALID -->|"Violation factuelle"| RETRY["Régénération prudente\\nmax 2 essais"]
    RETRY --> MAX
    TTS --> GMpost["3. GM post-tour\\nmise à jour game state\\ntrust / triggers / mémoire"]`;

export const AVA_DATA_SYNC = `flowchart LR
    subgraph NOTION["Notion — source éditoriale"]
        C["🐻 Caractères AVA\\nMax, Ava, Emma, Léo"]
        S["📦 Storyworld AVA\\nlieux, secrets, faits"]
        G["🎮 Gameplay AVA\\ngates, étapes, règles"]
        V["🎬 Vidéos AVA\\ntriggers, thèmes, contexte"]
    end
    C --> SYNC["sync-notion\\nEdge Function"]
    S --> SYNC
    G --> SYNC
    V --> SYNC
    SYNC --> DB["Supabase tables\\ncharacters, storyworld,\\ngameplay_steps, video_triggers"]
    SYNC --> EMB["Embeddings double-stack\\nVoyage voyage-3 1024 dim\\nOpenAI fallback 1536 dim"]
    EMB --> IDX["pgvector HNSW index\\nrecherche sémantique"]
    DB --> API["API runtime\\nquery-rag, proxy-llm,\\nproxy-tts, proxy-stt"]`;

// ─── DILEMME LIGHT DIAGRAMS ───────────────────────────────────────────────────

export const DILEMME_LIGHT_UX = `flowchart LR
    A["1. Élève\\narrive sur l'app"] --> B["2. Vidéo d'introduction\\nmise en contexte"]
    B --> C["3. Prénom + micro\\nsession créée"]
    C --> D["4. Tutoriel voice-first\\nconversation avec Peter"]
    D --> E["5. Découverte progressive\\n6 indices en max. 8 échanges"]
    E --> F["6. Jeu de reconstruction\\ndrag + click"]
    F --> G["7. Synthèse personnelle\\ntexte ou dictée vocale"]
    G --> H["8. Feedback\\nquestionnaire court"]
    H --> I["9. Données exploitables\\nPostHog + Google Sheets + PostgreSQL"]`;

export const DILEMME_LIGHT_GAME = `flowchart TD
    A["Image Place des Nations\\nscène riche en symboles"] --> B["6 indices cibles"]
    B --> B1["Déchets plastiques"]
    B --> B2["ADN"]
    B --> B3["Traité plastique"]
    B --> B4["Végétation"]
    B --> B5["Homme"]
    B --> B6["Femme"]
    C["Élève parle librement"] --> D["Whisper transcrit\\nDeepgram rassure en live"]
    D --> E["Détection variantes\\nex: génétique → ADN"]
    E --> F["Serveur calcule l'état réel\\ntrouvés / manquants / échange"]
    F --> G["Peter reçoit le CONTEXTE DU JEU\\nvia additional_instructions"]
    G --> H{"Tous les indices ?"}
    H -- "Non" --> I["Peter encourage\\nrelance"]
    H -- "Oui" --> J["Fin découverte\\njeu reconstruction"]`;

export const DILEMME_LIGHT_ARCH = `flowchart TD
    U["Élève\\nmobile / tablette / desktop"] --> FE["Frontend React + Wouter\\nSessionFlowContext"]
    FE --> MIC["Micro navigateur\\nMediaRecorder"]
    MIC --> STT["OpenAI Whisper\\ntranscription finale"]
    MIC --> DG["Deepgram WebSocket\\ntranscription live"]
    STT --> API["Backend Express\\nroutes API"]
    FE --> API
    API --> DB["PostgreSQL / Drizzle\\nsessions + messages + feedbacks"]
    API --> OAI["OpenAI Assistant Peter\\nGPT-4o"]
    DB --> STATE["État serveur\\nindices trouvés / manquants"]
    STATE --> CTX["additional_instructions\\nCONTEXTE DU JEU"]
    CTX --> OAI
    OAI --> TTS["ElevenLabs\\nvoix Peter"]
    TTS --> TOKEN["Token audio\\npregen / resume / playback"]
    TOKEN --> FE
    DB --> SHEETS["Google Sheets\\nanalyse simple"]
    FE --> PHC["PostHog client\\nusage + UX"]
    API --> PHS["PostHog serveur\\nerreurs + latence"]`;

// ─── DILEMME FLOWISE DIAGRAMS ─────────────────────────────────────────────────

export const DILEMME_FLOWISE_UX = `flowchart LR
    Eleve["Élève en classe"] --> Start["Démarrer l'aventure"]
    Start --> Session["Session anonyme"]
    Session --> Peter["Accueil par Peter"]
    Peter --> Intro["Vidéo ou média introductif"]
    Intro --> Dialogue["Dialogue guidé"]
    Dialogue --> Interaction{"Interaction"}
    Interaction --> Texte["Réponse texte"]
    Interaction --> Voix["Réponse vocale"]
    Interaction --> Progression["Choix, indices, thèmes"]
    Dialogue --> Media["Panneau média"]
    Media --> Videos["Vidéos Gumlet / YouTube"]
    Media --> Articles["Articles intégrés"]
    Dialogue --> Save["Conversation sauvegardée"]
    Save --> Teacher["Relecture enseignant"]`;

export const DILEMME_FLOWISE_ARCH = `flowchart TB
    subgraph UX["Interface élève - React"]
        Chat["Chat Peter"]
        Panel["Panneau média"]
        Mic["Micro + waveform"]
        Avatar["Avatar élève"]
    end
    subgraph API["Backend Express"]
        SSE["Proxy Flowise SSE"]
        TTS["/api/tts"]
        STT["/api/transcribe"]
        Sessions["/api/sessions"]
        Reader["/api/reader"]
        Debug["/api/debug"]
    end
    subgraph Services["Services IA et médias"]
        Flowise["Flowise"]
        Eleven["ElevenLabs TTS/STT"]
        Media["Gumlet / YouTube"]
        PostHog["PostHog"]
    end
    subgraph DB["PostgreSQL / Neon"]
        CS["conversation_sessions"]
        CM["conversation_messages"]
        FT["flowise_traces"]
        TT["tts_traces"]
    end
    UX --> API
    API --> Services
    API --> DB`;

export const DILEMME_FLOWISE_SEQUENCE = `sequenceDiagram
    participant Eleve as Élève
    participant UI as Interface React
    participant STT as ElevenLabs STT
    participant API as Backend Express
    participant Flowise as Flowise / Peter
    participant Cache as Cache LRU TTS
    participant TTS as ElevenLabs TTS
    Eleve->>UI: Parle dans le micro
    UI->>UI: Web Audio + waveform
    UI->>STT: Envoie audio
    STT-->>UI: Transcription texte
    UI->>API: Message élève
    API->>Flowise: Requête SSE
    Flowise-->>API: Tokens streamés
    API->>API: Accumulation + protection anti-JSON
    API-->>UI: Tokens + progress labels
    UI->>UI: Découpage par phrases
    UI->>Cache: Vérification cache TTS
    Cache-->>UI: Hit (~40ms) ou Miss
    UI->>TTS: Synthèse phrase (si miss)
    TTS-->>UI: Audio streamé
    UI->>Eleve: Voix Peter`;
