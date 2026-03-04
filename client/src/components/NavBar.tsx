/*
 * NavBar — DigiDouble Research Portal
 * Design: Space Grotesk, top fixed, minimal, with section indicators
 */
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/project", label: "Projet" },
  { href: "/research", label: "Défis de recherche" },
  { href: "/state-of-art", label: "État de l'art" },
];

export default function NavBar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

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
              Research Portal
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors duration-150 no-underline ${
                    isActive
                      ? "text-cyan-600 bg-cyan-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.idiap.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors no-underline"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span>IDIAP</span>
              <span className="text-slate-300">·</span>
              <span>Innosuisse</span>
            </a>

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

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="container py-2 flex flex-col gap-0.5">
            {navItems.map((item) => {
              const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors no-underline ${
                    isActive
                      ? "text-cyan-600 bg-cyan-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
