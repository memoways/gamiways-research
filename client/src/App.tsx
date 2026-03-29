import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { LangProvider } from "./contexts/LangContext";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Research from "./pages/Research";
import StateOfArt from "./pages/StateOfArt";
import PlatformDetail from "./pages/PlatformDetail";
import PricingComparison from "@/pages/PricingComparison";
import TTSDetail from "@/pages/TTSDetail";
import PipelinePhase1 from "@/pages/PipelinePhase1";

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
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/project" component={Project} />
        <Route path="/research" component={Research} />
        <Route path="/state-of-art" component={StateOfArt} />
        <Route path="/platform/:id" component={PlatformDetail} />
        <Route path="/pricing" component={PricingComparison} />
        <Route path="/tts/:id" component={TTSDetail} />
        <Route path="/pipeline" component={PipelinePhase1} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
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
