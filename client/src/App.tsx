import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation, Redirect } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { LangProvider } from "./contexts/LangContext";

// ── Core pages ─────────────────────────────────────────────────────────────
import Home from "./pages/Home";
import Project from "./pages/Project";
import Research from "./pages/Research";
import PlatformDetail from "./pages/PlatformDetail";
import TTSDetail from "@/pages/TTSDetail";
import PipelinePhase1 from "@/pages/PipelinePhase1";

/// ── GamiWays sub-pages ───────────────────────────────────────────────
import GamiWaysArchitecture from "@/pages/GamiWaysArchitecture";
import ProjectStatus from "@/pages/ProjectStatus";
import GamiWaysGaps from "@/pages/GamiWaysGaps";
import GamiWaysAcademic from "@/pages/GamiWaysAcademic";
import PrototypesOrigins from "@/pages/PrototypesOrigins";

// ── Voice Pipeline pages ───────────────────────────────────────────────────
import VoiceTTS from "@/pages/VoiceTTS";
import VoiceSTT from "@/pages/VoiceSTT";
import STTDetail from "@/pages/STTDetail";
import VoiceBenchmarks from "@/pages/VoiceBenchmarks";
import VoiceStack from "@/pages/VoiceStack";
import VoiceScoring from "@/pages/VoiceScoring";

// ── About pages ───────────────────────────────────────────────────────────
import About from "@/pages/About";
import Glossary from "@/pages/Glossary";

// ── Avatars pages ──────────────────────────────────────────────────────────
import AvatarsOverview from "@/pages/AvatarsOverview";
import AvatarsBehavior from "@/pages/AvatarsBehavior";
import PricingComparison from "@/pages/PricingComparison";

/** Remonte automatiquement en haut à chaque changement de route */
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <main className="pt-14">
        <Switch>
          {/* ── Home ──────────────────────────────────────────────────────── */}
          <Route path="/" component={Home} />

          {/* ── The Project ─────────────────────────────────────────────── */}
          <Route path="/project" component={Project} />
          <Route path="/project/status" component={ProjectStatus} />
          <Route path="/project/prototypes" component={PrototypesOrigins} />
          <Route path="/research" component={Research} />
          <Route path="/research/architecture" component={GamiWaysArchitecture} />
          <Route path="/research/gaps" component={GamiWaysGaps} />
          <Route path="/research/academic" component={GamiWaysAcademic} />
          {/* Avatar sub-pages also under /research for semantic grouping */}
          <Route path="/research/behavior" component={AvatarsBehavior} />

          {/* ── Voice Pipeline ────────────────────────────────────────────── */}
          <Route path="/voice/tts" component={VoiceTTS} />
          <Route path="/voice/stt" component={VoiceSTT} />
          <Route path="/voice/stt/:id" component={STTDetail} />
          <Route path="/voice/benchmarks" component={VoiceBenchmarks} />
          <Route path="/voice/stack" component={VoiceStack} />
          <Route path="/voice/pipeline" component={PipelinePhase1} />
          <Route path="/voice/scoring" component={VoiceScoring} />
          <Route path="/pipeline" component={PipelinePhase1} />
          <Route path="/tts/:id" component={TTSDetail} />

          {/* ── Video Avatars ─────────────────────────────────────────────── */}
          <Route path="/avatars" component={AvatarsOverview} />
          <Route path="/avatars/pricing" component={PricingComparison} />
          <Route path="/platform/:id" component={PlatformDetail} />

          {/* ── About & Glossary ──────────────────────────────────────────── */}
          <Route path="/about" component={About} />
          <Route path="/glossary" component={Glossary} />

          {/* ── Legacy redirects ──────────────────────────────────────────── */}
          <Route path="/state-of-art">
            <Redirect to="/avatars" />
          </Route>
          <Route path="/pricing">
            <Redirect to="/avatars/pricing" />
          </Route>

          {/* ── 404 ───────────────────────────────────────────────────────── */}
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </main>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LangProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LangProvider>
    </ErrorBoundary>
  );
}

export default App;
