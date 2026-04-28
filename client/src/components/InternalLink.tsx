/*
 * InternalLink — navigates to an internal page and scrolls to top (or to anchor if hash present)
 * Uses wouter's navigate() for SPA routing (no full page reload, single history entry)
 * Usage: <InternalLink to="/research">Research Challenges</InternalLink>
 *        <InternalLink to="/voice/benchmarks#stt-deepgram-nova3">See in Benchmarks</InternalLink>
 */
import { useLocation } from "wouter";
import React from "react";

interface InternalLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  children: React.ReactNode;
}

export default function InternalLink({ to, children, className, style, ...rest }: InternalLinkProps) {
  const [, navigate] = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const hashIndex = to.indexOf("#");
    if (hashIndex !== -1) {
      const path = to.slice(0, hashIndex);
      const anchor = to.slice(hashIndex + 1);
      navigate(path);
      // After navigation, wait for the DOM to update then scroll to the anchor
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          // Briefly highlight the row
          el.classList.add("ring-2", "ring-cyan-400", "ring-inset");
          setTimeout(() => el.classList.remove("ring-2", "ring-cyan-400", "ring-inset"), 2000);
        }
      }, 120);
    } else {
      navigate(to);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={
        className ??
        "inline underline decoration-dotted underline-offset-2 cursor-pointer transition-colors hover:opacity-70"
      }
      style={style ?? (className ? undefined : { color: "oklch(0.55 0.18 200)" })}
      {...rest}
    >
      {children}
    </a>
  );
}
