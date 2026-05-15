/*
 * MermaidDiagram — GamiWays Research Portal
 * Renders Mermaid diagrams with custom theming matching the portal design system
 * Design: Space Grotesk / Source Serif 4, slate palette, cyan/amber accents
 */
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Maximize2, X } from "lucide-react";

let mermaidInitialized = false;

function initMermaid() {
  if (mermaidInitialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    themeVariables: {
      primaryColor: "#e0f2fe",
      primaryTextColor: "#0f172a",
      primaryBorderColor: "#94a3b8",
      lineColor: "#64748b",
      secondaryColor: "#f1f5f9",
      tertiaryColor: "#f8fafc",
      background: "#ffffff",
      mainBkg: "#f8fafc",
      nodeBorder: "#94a3b8",
      clusterBkg: "#f1f5f9",
      titleColor: "#0f172a",
      edgeLabelBackground: "#ffffff",
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "13px",
    },
    flowchart: {
      curve: "basis",
      padding: 20,
      htmlLabels: true,
      useMaxWidth: true,
    },
    sequence: {
      useMaxWidth: true,
      boxMargin: 10,
      messageMargin: 40,
      mirrorActors: false,
    },
  });
  mermaidInitialized = true;
}

interface MermaidDiagramProps {
  chart: string;
  title?: string;
  description?: string;
  accentColor?: string;
}

let diagramCounter = 0;

export default function MermaidDiagram({ chart, title, description, accentColor = "oklch(0.55 0.20 200)" }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [expanded, setExpanded] = useState(false);
  const idRef = useRef(`mermaid-${++diagramCounter}-${Math.random().toString(36).slice(2, 7)}`);

  useEffect(() => {
    initMermaid();
    const id = idRef.current;
    mermaid.render(id, chart).then(({ svg: renderedSvg }) => {
      // Post-process SVG for better styling
      const styled = renderedSvg
        .replace(/font-family:[^;"]*/g, "font-family: 'Space Grotesk', sans-serif")
        .replace(/font-size:\s*\d+px/g, "font-size: 12px");
      setSvg(styled);
      setError("");
    }).catch((err) => {
      console.error("Mermaid render error:", err);
      setError("Diagram rendering error");
    });
  }, [chart]);

  const DiagramContent = () => (
    <div
      ref={containerRef}
      className="mermaid-container overflow-x-auto"
      style={{ maxWidth: "100%" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );

  return (
    <>
      <div
        className="rounded-xl border border-slate-200 overflow-hidden bg-white"
        style={{ borderLeft: `3px solid ${accentColor}` }}
      >
        {/* Header */}
        {(title || description) && (
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-start justify-between gap-3">
            <div>
              {title && (
                <h4 className="text-sm font-semibold text-slate-800 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {title}
                </h4>
              )}
              {description && (
                <p className="text-xs text-slate-400 mt-0.5 leading-snug" style={{ fontFamily: "'Source Serif 4', serif" }}>
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={() => setExpanded(true)}
              className="shrink-0 p-1.5 rounded hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              title="Expand diagram"
            >
              <Maximize2 size={14} />
            </button>
          </div>
        )}

        {/* Diagram */}
        <div className="p-5 bg-slate-50/50">
          {error ? (
            <div className="text-xs text-red-500 font-mono p-3 bg-red-50 rounded">{error}</div>
          ) : svg ? (
            <DiagramContent />
          ) : (
            <div className="flex items-center justify-center h-24 text-xs text-slate-400 font-mono animate-pulse">
              Rendering diagram…
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setExpanded(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                {title && <h3 className="font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h3>}
                {description && <p className="text-xs text-slate-400 mt-0.5" style={{ fontFamily: "'Source Serif 4', serif" }}>{description}</p>}
              </div>
              <button
                onClick={() => setExpanded(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-8 overflow-x-auto">
              {svg && <div dangerouslySetInnerHTML={{ __html: svg }} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
