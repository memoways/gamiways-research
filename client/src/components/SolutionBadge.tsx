import { ExternalLink, BookOpen } from "lucide-react";
import { SOLUTION_LINKS } from "@/lib/solutionLinks";

interface SolutionBadgeProps {
  solutionKey: string;
  /** Show only the name as a link (inline text style) */
  inline?: boolean;
  /** Show compact icon-only badges */
  compact?: boolean;
}

/**
 * SolutionBadge — renders homepage + API doc links for a given solution key.
 * Usage:
 *   <SolutionBadge solutionKey="tavus" />           → name + icon badges
 *   <SolutionBadge solutionKey="tavus" inline />    → linked name only
 *   <SolutionBadge solutionKey="tavus" compact />   → icon-only badges
 */
export function SolutionBadge({ solutionKey, inline = false, compact = false }: SolutionBadgeProps) {
  const solution = SOLUTION_LINKS[solutionKey];
  if (!solution) return null;

  if (inline) {
    return (
      <a
        href={solution.homepage}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-0.5 text-[#0891b2] hover:text-[#0e7490] underline decoration-dotted underline-offset-2 transition-colors"
      >
        {solution.name}
        <ExternalLink size={10} className="opacity-60 ml-0.5" />
      </a>
    );
  }

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1">
        <a
          href={solution.homepage}
          target="_blank"
          rel="noopener noreferrer"
          title={`${solution.name} — Homepage`}
          className="inline-flex items-center justify-center w-5 h-5 rounded bg-slate-100 hover:bg-cyan-50 text-slate-500 hover:text-[#0891b2] transition-colors border border-slate-200"
        >
          <ExternalLink size={10} />
        </a>
        {solution.apiDocs && (
          <a
            href={solution.apiDocs}
            target="_blank"
            rel="noopener noreferrer"
            title={`${solution.name} — API Documentation`}
            className="inline-flex items-center justify-center w-5 h-5 rounded bg-slate-100 hover:bg-purple-50 text-slate-500 hover:text-purple-600 transition-colors border border-slate-200"
          >
            <BookOpen size={10} />
          </a>
        )}
        {solution.github && !solution.apiDocs && (
          <a
            href={solution.github}
            target="_blank"
            rel="noopener noreferrer"
            title={`${solution.name} — GitHub`}
            className="inline-flex items-center justify-center w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors border border-slate-200"
          >
            <BookOpen size={10} />
          </a>
        )}
      </span>
    );
  }

  // Default: name + badges side by side
  return (
    <span className="inline-flex items-center gap-1.5 flex-wrap">
      <a
        href={solution.homepage}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-[#0891b2] hover:text-[#0e7490] underline decoration-dotted underline-offset-2 transition-colors"
      >
        {solution.name}
      </a>
      <span className="inline-flex items-center gap-0.5">
        <a
          href={solution.homepage}
          target="_blank"
          rel="noopener noreferrer"
          title="Homepage"
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-slate-100 hover:bg-cyan-50 text-slate-500 hover:text-[#0891b2] transition-colors border border-slate-200"
        >
          <ExternalLink size={9} />
          site
        </a>
        {solution.apiDocs && (
          <a
            href={solution.apiDocs}
            target="_blank"
            rel="noopener noreferrer"
            title="API Documentation"
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-slate-100 hover:bg-purple-50 text-slate-500 hover:text-purple-600 transition-colors border border-slate-200"
          >
            <BookOpen size={9} />
            api
          </a>
        )}
        {solution.github && !solution.apiDocs && (
          <a
            href={solution.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors border border-slate-200"
          >
            <BookOpen size={9} />
            github
          </a>
        )}
      </span>
    </span>
  );
}

/** Inline link cell for use inside table <td> elements */
export function SolutionTableCell({ solutionKey }: { solutionKey: string }) {
  const solution = SOLUTION_LINKS[solutionKey];
  if (!solution) return null;

  return (
    <span className="inline-flex items-center gap-1">
      <a
        href={solution.homepage}
        target="_blank"
        rel="noopener noreferrer"
        title={`${solution.name} — Homepage`}
        className="inline-flex items-center justify-center w-5 h-5 rounded bg-slate-100 hover:bg-cyan-50 text-slate-400 hover:text-[#0891b2] transition-colors border border-slate-200"
      >
        <ExternalLink size={10} />
      </a>
      {(solution.apiDocs || solution.github) && (
        <a
          href={solution.apiDocs || solution.github}
          target="_blank"
          rel="noopener noreferrer"
          title={solution.apiDocs ? `${solution.name} — API Docs` : `${solution.name} — GitHub`}
          className="inline-flex items-center justify-center w-5 h-5 rounded bg-slate-100 hover:bg-purple-50 text-slate-400 hover:text-purple-600 transition-colors border border-slate-200"
        >
          <BookOpen size={10} />
        </a>
      )}
    </span>
  );
}
