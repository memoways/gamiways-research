/*
 * NavBar — DigiDouble Research Portal
 * Redesigned: 3 dropdown menus (The Project / Voice Pipeline / Video Avatars)
 * Mobile: hamburger with grouped sections
 * Design: Space Grotesk, top fixed, minimal
 * i18n: EN/FR toggle, default EN
 */
import React from "react";
import { Link, useLocation } from "wouter";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, FlaskConical, Mic, Video } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

interface NavDropdownItem {
  href: string;
  label: string;
  labelFr: string;
  desc?: string;
  descFr?: string;
  highlight?: boolean; // marks interactive/featured items
  highlightColor?: string; // custom accent color for highlighted items
}

interface NavMenu {
  label: string;
  labelFr: string;
  icon: React.ElementType;
  color: string;
  activePrefix: string[];
  items: NavDropdownItem[];
}

const NAV_MENUS: NavMenu[] = [
  {
    label: "The Project",
    labelFr: "The Project",
    icon: FlaskConical,
    color: "oklch(0.55 0.20 200)",
    activePrefix: ["/project", "/research"],
    items: [
      { href: "/project", label: "The Project", labelFr: "Le Projet", desc: "Vision, positioning & roadmap", descFr: "Vision, positionnement & roadmap" },
      { href: "/research", label: "Research Challenges", labelFr: "Défis de Recherche", desc: "3 research axes & open questions", descFr: "3 axes de recherche & questions ouvertes" },
      { href: "/research/architecture", label: "Target Architecture", labelFr: "Architecture Cible", desc: "DigiDouble system design & latency budget", descFr: "Design système DigiDouble & budget latence" },
      { href: "/research/gaps", label: "Research Gaps", labelFr: "Gaps de Recherche", desc: "Identified gaps & opportunities", descFr: "Gaps identifiés & opportunités" },
      { href: "/research/academic", label: "Academic Assessment", labelFr: "Assessment Académique", desc: "Key papers 2023–2026", descFr: "Publications clés 2023–2026" },
    ],
  },
  {
    label: "Voice Pipeline",
    labelFr: "Voice Pipeline",
    icon: Mic,
    color: "oklch(0.55 0.20 200)",
    activePrefix: ["/voice"],
    items: [
      { href: "/voice/stt", label: "STT — Speech Recognition", labelFr: "STT — Reconnaissance Vocale", desc: "10 engines — cloud, on-premise & open-source", descFr: "10 moteurs — cloud, on-premise & open-source" },
      { href: "/voice/tts", label: "TTS — Speech Synthesis", labelFr: "TTS — Synthèse Vocale", desc: "16 engines compared", descFr: "16 moteurs comparés" },
      { href: "/voice/benchmarks", label: "Audio Synthesis Benchmarks", labelFr: "Benchmarks Synthèse Audio", desc: "STT → TTS — comparative synthesis & key metrics", descFr: "STT → TTS — synthèse comparative & métriques clés" },
      { href: "/voice/stack", label: "Decision Framework", labelFr: "Cadre de Décision", desc: "Layer-by-layer decision guide with simulator", descFr: "Guide de décision par couche avec simulateur" },
      { href: "/voice/scoring", label: "Custom Scoring", labelFr: "Scoring Personnalisé", desc: "Weight criteria, get your personalized tool ranking", descFr: "Pondérez les critères, obtenez votre classement personnalisé", highlight: true, highlightColor: "oklch(0.55 0.20 280)" },
      { href: "/voice/pipeline", label: "V2V Pipeline Diagram", labelFr: "Diagramme Pipeline V2V", desc: "Interactive V2V diagram — select components, visualize latency & cost", descFr: "Diagramme V2V interactif — composants, latence & coût", highlight: true, highlightColor: "oklch(0.55 0.20 200)" },
    ],
  },
  {
    label: "Video Avatars",
    labelFr: "Avatars Vidéo",
    icon: Video,
    color: "oklch(0.72 0.18 50)",
    activePrefix: ["/avatars", "/platform", "/research/behavior", "/research/emotional"],
    items: [
      { href: "/avatars", label: "Streaming Video Avatars", labelFr: "Avatars Vidéo Streaming", desc: "11+ streaming avatar platforms compared", descFr: "11+ plateformes d'avatars streaming comparées" },
      { href: "/avatars/pricing", label: "Cost Simulator", labelFr: "Simulateur de Coûts", desc: "Interactive pricing calculator — slider, filters, fixed vs variable costs", descFr: "Calculateur interactif — slider, filtres, coûts fixes vs variables", highlight: true, highlightColor: "oklch(0.60 0.18 50)" },
      { href: "/avatars/market", label: "Business & Market", labelFr: "Business & Marché", desc: "Business challenges & market opportunities", descFr: "Enjeux business & opportunités de marché" },
      { href: "/research/behavior", label: "Behavior & Expressiveness", labelFr: "Comportement & Expressivité", desc: "Axis 2 — behavioral fidelity & expressiveness", descFr: "Axe 2 — fidélité comportementale & expressivité" },
      { href: "/research/emotional", label: "Emotional Toolbox", labelFr: "Boîte à Outils Émotionnelle", desc: "Character & emotion design", descFr: "Design émotionnel & personnage" },
    ],
  },
];

function DropdownMenu({ menu, isFr, location, onClose }: { menu: NavMenu; isFr: boolean; location: string; onClose: () => void }) {
  const isActive = menu.activePrefix.some((p) => location.startsWith(p));
  const Icon = menu.icon;

  return (
    <div className="relative group">
      <button
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors duration-150 ${
          isActive
            ? "text-cyan-600 bg-cyan-50"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
        }`}
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <Icon size={13} />
        {isFr ? menu.labelFr : menu.label}
        <ChevronDown size={12} className="opacity-60 group-hover:opacity-100 transition-transform group-hover:rotate-180 duration-200" />
      </button>

      {/* Dropdown panel */}
      <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 overflow-hidden">
        <div className="p-1">
          {menu.items.map((item) => {
            const itemActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <React.Fragment key={item.href}>
              {/* Separator before highlighted items */}
              {item.highlight && menu.items.indexOf(item) > 0 && (
                <div className="mx-3 my-1 border-t border-slate-100" />
              )}
              <Link
                href={item.href}
                onClick={onClose}
                className={`flex flex-col px-3 py-2.5 rounded-lg transition-all no-underline ${
                  item.highlight
                    ? itemActive
                      ? "bg-opacity-20 border"
                      : "border hover:opacity-90"
                    : itemActive
                    ? "bg-slate-50"
                    : "hover:bg-slate-50"
                }`}
                style={item.highlight ? {
                  background: itemActive
                    ? `color-mix(in oklch, ${item.highlightColor} 15%, white)`
                    : `color-mix(in oklch, ${item.highlightColor} 8%, white)`,
                  borderColor: `color-mix(in oklch, ${item.highlightColor} 35%, white)`,
                } : undefined}
              >
                <span className="flex items-center gap-1.5 text-sm font-semibold leading-tight" style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: item.highlight ? item.highlightColor : (itemActive ? menu.color : undefined)
                }}>
                  {isFr ? item.labelFr : item.label}
                  {item.highlight && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{
                      background: `color-mix(in oklch, ${item.highlightColor} 20%, white)`,
                      color: item.highlightColor,
                      border: `1px solid color-mix(in oklch, ${item.highlightColor} 30%, white)`,
                      fontFamily: "'JetBrains Mono', monospace"
                    }}>Interactive</span>
                  )}
                </span>
                {(item.desc || item.descFr) && (
                  <span className="text-xs mt-0.5 leading-snug" style={{
                    fontFamily: "'Source Serif 4', serif",
                    color: item.highlight ? `color-mix(in oklch, ${item.highlightColor} 70%, #64748b)` : "#94a3b8"
                  }}>
                    {isFr ? item.descFr : item.desc}
                  </span>
                )}
              </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function NavBar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const { lang, setLang, t } = useLang();
  const isFr = lang === "fr";

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setExpandedMobile(null);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
      <div className="container">
        <div className="flex items-center justify-between h-14">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-sm flex items-center justify-center"
                style={{ background: "oklch(0.72 0.18 200)" }}>
                <span className="text-white font-bold text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>DD</span>
              </div>
              <span className="font-semibold text-slate-900 text-sm tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                DigiDouble
              </span>
            </div>
            <span className="hidden sm:inline text-xs font-mono text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">
              {t("nav.portal")}
            </span>
          </Link>

          {/* Desktop Nav — 3 dropdown menus */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_MENUS.map((menu) => (
              <DropdownMenu
                key={menu.label}
                menu={menu}
                isFr={isFr}
                location={location}
                onClose={() => {}}
              />
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div
              className="flex items-center gap-0 border border-slate-200 rounded overflow-hidden"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 text-xs font-bold transition-colors ${
                  lang === "en"
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-500 hover:bg-slate-50"
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLang("fr")}
                className={`px-2.5 py-1 text-xs font-bold transition-colors border-l border-slate-200 ${
                  lang === "fr"
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-500 hover:bg-slate-50"
                }`}
                aria-label="Passer en français"
              >
                FR
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-1.5 rounded text-slate-600 hover:bg-slate-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav — hamburger with grouped sections */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white max-h-[80vh] overflow-y-auto">
          <nav className="container py-2 flex flex-col gap-0.5">
            {/* Home link */}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors no-underline ${
                location === "/" ? "text-cyan-600 bg-cyan-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {isFr ? "Accueil" : "Home"}
            </Link>

            {/* Grouped menus */}
            {NAV_MENUS.map((menu) => {
              const Icon = menu.icon;
              const isExpanded = expandedMobile === menu.label;
              const isActive = menu.activePrefix.some((p) => location.startsWith(p));
              return (
                <div key={menu.label}>
                  <button
                    onClick={() => setExpandedMobile(isExpanded ? null : menu.label)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm font-medium transition-colors ${
                      isActive ? "text-cyan-600 bg-cyan-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={13} />
                      {isFr ? menu.labelFr : menu.label}
                    </span>
                    <ChevronDown size={12} className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                  </button>
                  {isExpanded && (
                    <div className="ml-4 mt-0.5 mb-1 border-l-2 border-slate-100 pl-3 flex flex-col gap-0.5">
                      {menu.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`px-2 py-1.5 rounded text-sm transition-colors no-underline ${
                            location === item.href || (item.href !== "/" && location.startsWith(item.href))
                              ? "text-cyan-600 font-semibold"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {isFr ? item.labelFr : item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
