/*
 * StatusBadge — semantic status tags
 */
type BadgeVariant = "available" | "gap" | "rd" | "target" | "internal" | "external";

interface StatusBadgeProps {
  variant: BadgeVariant;
  label?: string;
}

const variants: Record<BadgeVariant, { label: string; className: string }> = {
  available: {
    label: "AVAILABLE",
    className: "badge-available",
  },
  gap: {
    label: "GAP",
    className: "badge-gap",
  },
  rd: {
    label: "R&D",
    className: "badge-rd",
  },
  target: {
    label: "TARGET",
    className: "badge-target",
  },
  internal: {
    label: "INTERNAL",
    className: "bg-slate-100 text-slate-600 border border-slate-200",
  },
  external: {
    label: "EXTERNAL",
    className: "bg-purple-50 text-purple-700 border border-purple-200",
  },
};

export default function StatusBadge({ variant, label }: StatusBadgeProps) {
  const v = variants[variant];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${v.className}`}
      style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}
    >
      {label || v.label}
    </span>
  );
}
