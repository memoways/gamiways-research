/*
 * GlossaryLink.tsx — DigiDouble Research Portal
 * Reusable inline link to a specific glossary term anchor.
 * Renders a small "?" badge next to a column header or label.
 * Usage: <GlossaryLink term="WER" /> or <GlossaryLink term="TTFA" label="TTFA" />
 */
import { Link } from "wouter";

interface GlossaryLinkProps {
  /** The term ID — must match the `id` attribute on the term card in Glossary.tsx */
  term: string;
  /** Optional visible label. Defaults to showing only the "?" badge. */
  label?: string;
  className?: string;
}

export default function GlossaryLink({ term, label, className = "" }: GlossaryLinkProps) {
  const slug = term.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return (
    <Link
      href={`/glossary#${slug}`}
      className={`inline-flex items-center gap-0.5 no-underline group ${className}`}
      title={`See glossary: ${term}`}
      onClick={(e) => e.stopPropagation()}
    >
      {label && (
        <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{label}</span>
      )}
      <span
        className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-[9px] font-bold leading-none transition-all group-hover:opacity-100 opacity-50"
        style={{
          background: "oklch(0.55 0.20 200 / 0.12)",
          color: "oklch(0.45 0.15 200)",
          fontFamily: "'JetBrains Mono', monospace",
          border: "1px solid oklch(0.55 0.20 200 / 0.25)",
        }}
      >
        ?
      </span>
    </Link>
  );
}
