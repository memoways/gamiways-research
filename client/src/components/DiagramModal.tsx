/**
 * DiagramModal — GamiWays Research Portal
 * Wraps any diagram: shows a scaled preview (no scrollbar), click opens full-size modal with zoom/pan
 * Design: minimal chrome, keyboard-accessible (Escape to close), click outside to close
 */
import { useState, useRef, useCallback, useEffect } from "react";
import { ZoomIn, X, Maximize2 } from "lucide-react";

interface DiagramModalProps {
  children: React.ReactNode;
  title?: string;
}

export default function DiagramModal({ children, title }: DiagramModalProps) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale(s => Math.min(4, Math.max(0.5, s - e.deltaY * 0.001)));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, tx: translate.x, ty: translate.y };
  }, [translate]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging || !dragStart.current) return;
    setTranslate({
      x: dragStart.current.tx + (e.clientX - dragStart.current.x),
      y: dragStart.current.ty + (e.clientY - dragStart.current.y),
    });
  }, [dragging]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
    dragStart.current = null;
  }, []);

  const zoomIn = () => setScale(s => Math.min(4, s + 0.25));
  const zoomOut = () => setScale(s => Math.max(0.5, s - 0.25));
  const resetZoom = () => { setScale(1); setTranslate({ x: 0, y: 0 }); };

  return (
    <>
      {/* Preview wrapper — no overflow scroll, scales to fit, click to open */}
      <div
        className="relative group cursor-zoom-in"
        onClick={() => setOpen(true)}
        title={title ? `Click to expand: ${title}` : "Click to expand"}
      >
        {/* The diagram, clipped to fit without scrollbar */}
        <div
          className="w-full overflow-hidden rounded-lg border border-slate-200"
          style={{ maxHeight: "480px" }}
        >
          <div
            className="w-full"
            style={{
              transform: "scale(1)",
              transformOrigin: "top left",
              pointerEvents: "none", // prevent child hover states from interfering with click
            }}
          >
            {children}
          </div>
        </div>

        {/* Expand hint overlay */}
        <div className="absolute inset-0 flex items-end justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-semibold shadow-lg"
            style={{
              background: "oklch(0.15 0.01 240 / 0.85)",
              color: "white",
              backdropFilter: "blur(4px)",
            }}
          >
            <Maximize2 size={12} />
            <span>Click to expand</span>
          </div>
        </div>
      </div>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "oklch(0.08 0.01 240 / 0.92)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          {/* Toolbar */}
          <div
            className="absolute top-4 right-4 flex items-center gap-2 z-10"
          >
            {/* Zoom controls */}
            <div className="flex items-center gap-1 rounded px-2 py-1" style={{ background: "oklch(0.18 0.01 240)", border: "1px solid oklch(0.30 0.01 240)" }}>
              <button
                onClick={zoomOut}
                className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-700 transition-colors font-mono text-lg"
                title="Zoom out"
              >−</button>
              <button
                onClick={resetZoom}
                className="px-2 h-7 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-700 transition-colors font-mono text-xs"
                title="Reset zoom"
              >{Math.round(scale * 100)}%</button>
              <button
                onClick={zoomIn}
                className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-700 transition-colors font-mono text-lg"
                title="Zoom in"
              >+</button>
            </div>

            {/* Close */}
            <button
              onClick={handleClose}
              className="w-9 h-9 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-red-800 transition-colors"
              style={{ background: "oklch(0.18 0.01 240)", border: "1px solid oklch(0.30 0.01 240)" }}
              title="Close (Esc)"
            >
              <X size={16} />
            </button>
          </div>

          {/* Title */}
          {title && (
            <div className="absolute top-4 left-4 z-10">
              <span className="font-mono text-xs text-slate-400 px-3 py-1.5 rounded" style={{ background: "oklch(0.18 0.01 240)", border: "1px solid oklch(0.30 0.01 240)" }}>
                {title}
              </span>
            </div>
          )}

          {/* Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <span className="font-mono text-xs text-slate-500 px-3 py-1.5 rounded" style={{ background: "oklch(0.12 0.01 240 / 0.8)" }}>
              Scroll to zoom · Drag to pan · Esc to close
            </span>
          </div>

          {/* Zoomable / pannable content */}
          <div
            ref={contentRef}
            className="w-full h-full flex items-center justify-center overflow-hidden"
            style={{ cursor: dragging ? "grabbing" : "grab" }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                transformOrigin: "center center",
                transition: dragging ? "none" : "transform 0.1s ease",
                maxWidth: "90vw",
                maxHeight: "90vh",
                width: "90vw",
              }}
            >
              {/* White background for the diagram */}
              <div
                className="rounded-xl shadow-2xl"
                style={{ background: "white", padding: "24px" }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
