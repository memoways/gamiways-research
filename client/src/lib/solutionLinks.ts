// Centralized solution links — homepage + API documentation
// Used across StateOfArt, Research, Project pages

export interface SolutionLinks {
  name: string;
  homepage: string;
  apiDocs?: string;
  github?: string;
}

export const SOLUTION_LINKS: Record<string, SolutionLinks> = {
  // ── Commercial platforms ──────────────────────────────────────────────────
  heygen: {
    name: "HeyGen",
    homepage: "https://www.heygen.com",
    apiDocs: "https://docs.heygen.com/docs/quick-start",
  },
  tavus: {
    name: "Tavus",
    homepage: "https://www.tavus.io",
    apiDocs: "https://docs.tavus.io/sections/introduction",
  },
  runway: {
    name: "Runway Characters",
    homepage: "https://runwayml.com",
    apiDocs: "https://docs.dev.runwayml.com/characters/",
  },
  did: {
    name: "D-ID",
    homepage: "https://www.d-id.com",
    apiDocs: "https://docs.d-id.com/docs/quickstart",
  },
  synthesia: {
    name: "Synthesia",
    homepage: "https://www.synthesia.io",
    apiDocs: "https://docs.synthesia.io/reference/introduction",
  },
  nvidia_ace: {
    name: "NVIDIA ACE",
    homepage: "https://developer.nvidia.com/ace",
    apiDocs: "https://docs.nvidia.com/ace/overview/latest/index.html",
  },
  soul_machines: {
    name: "Soul Machines",
    homepage: "https://www.soulmachines.com",
    apiDocs: "https://docs.soulmachines.com/",
  },
  uneeq: {
    name: "UneeQ",
    homepage: "https://www.digitalhumans.com",
    apiDocs: "https://docs.uneeq.io/",
  },
  beyond_presence: {
    name: "BeyondPresence",
    homepage: "https://www.beyondpresence.ai",
    apiDocs: "https://docs.bey.dev/get-started",
  },
  anam: {
    name: "Anam.ai",
    homepage: "https://anam.ai",
    apiDocs: "https://anam.ai/docs/overview",
  },
  simli: {
    name: "Simli",
    homepage: "https://www.simli.com",
    apiDocs: "https://docs.simli.com/overview",
  },
  bithuman: {
    name: "bitHuman",
    homepage: "https://bithuman.ai",
    apiDocs: "https://docs.bithuman.ai/introduction",
  },
  hedra: {
    name: "Hedra",
    homepage: "https://www.hedra.com",
    apiDocs: "https://www.hedra.com/docs/pages/developer/getting_started/quickstart",
  },
  lemon_slice: {
    name: "Lemon Slice",
    homepage: "https://lemonslice.com",
    apiDocs: "https://lemonslice.com/docs",
  },
  convai: {
    name: "Convai",
    homepage: "https://convai.com",
    apiDocs: "https://docs.convai.com/",
  },
  inworld: {
    name: "Inworld AI",
    homepage: "https://inworld.ai",
    apiDocs: "https://docs.inworld.ai/introduction",
  },

  // ── Open-source solutions ─────────────────────────────────────────────────
  heygem: {
    name: "HeyGem",
    homepage: "https://github.com/duixcom/Duix.Heygem",
    github: "https://github.com/duixcom/Duix.Heygem",
  },
  musetalk: {
    name: "MuseTalk",
    homepage: "https://github.com/TMElyralab/MuseTalk",
    github: "https://github.com/TMElyralab/MuseTalk",
  },
  sadtalker: {
    name: "SadTalker",
    homepage: "https://github.com/OpenTalker/SadTalker",
    github: "https://github.com/OpenTalker/SadTalker",
  },
  wav2lip: {
    name: "Wav2Lip",
    homepage: "https://github.com/Rudrabha/Wav2Lip",
    github: "https://github.com/Rudrabha/Wav2Lip",
  },
  latentsync: {
    name: "LatentSync",
    homepage: "https://github.com/bytedance/LatentSync",
    github: "https://github.com/bytedance/LatentSync",
  },
  memo: {
    name: "MEMO",
    homepage: "https://github.com/memoavatar/memo",
    github: "https://github.com/memoavatar/memo",
  },
  hallo: {
    name: "Hallo",
    homepage: "https://github.com/fudan-generative-vision/hallo",
    github: "https://github.com/fudan-generative-vision/hallo",
  },

  // ── Infrastructure / ASR ─────────────────────────────────────────────────
  gamilab: {
    name: "Gamilab / Audiogami",
    homepage: "https://gamilab.com",
  },
  memoways: {
    name: "Memoways",
    homepage: "https://memoways.com",
  },
  exoscale: {
    name: "Exoscale",
    homepage: "https://www.exoscale.com",
    apiDocs: "https://community.exoscale.com/api/",
  },
  qdrant: {
    name: "Qdrant",
    homepage: "https://qdrant.tech",
    apiDocs: "https://api.qdrant.tech/",
  },
  idiap: {
    name: "IDIAP Research Institute",
    homepage: "https://www.idiap.ch",
  },
  innosuisse: {
    name: "Innosuisse",
    homepage: "https://www.innosuisse.admin.ch/fr/projet-dinnovation-avec-partenaire-de-mise-en-oeuvre",
  },
};

// Helper: render an external link badge (homepage + optional API docs)
// Returns an object with href values for use in JSX
export function getLinks(key: string): SolutionLinks | undefined {
  return SOLUTION_LINKS[key];
}
