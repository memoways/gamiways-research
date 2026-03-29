/*
 * InternalLink — navigates to an internal page and always scrolls to top
 * Uses wouter's navigate() for SPA routing (no full page reload, single history entry)
 * Usage: <InternalLink to="/research">Research Challenges</InternalLink>
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
    navigate(to);
    window.scrollTo({ top: 0, behavior: "instant" });
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
