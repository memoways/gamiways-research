/*
 * InternalLink — navigates to an internal page and always scrolls to top
 * Usage: <InternalLink to="/research">Research Challenges</InternalLink>
 */
import { useLocation } from "wouter";

interface InternalLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export default function InternalLink({ to, children, className }: InternalLinkProps) {
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
      style={className ? undefined : { color: "oklch(0.55 0.18 200)" }}
    >
      {children}
    </a>
  );
}
