/*
 * SectionHeader — section titles, Technical Blueprint style
 */
interface SectionHeaderProps {
  number?: string; // kept for backward compatibility but no longer displayed
  title: string;
  subtitle?: string;
  accent?: "cyan" | "orange" | "green" | "red";
}

const accentColors = {
  cyan: "oklch(0.72 0.18 200)",
  orange: "oklch(0.72 0.18 50)",
  green: "oklch(0.65 0.18 145)",
  red: "oklch(0.60 0.20 25)",
};

export default function SectionHeader({ title, subtitle, accent = "cyan" }: SectionHeaderProps) {
  const color = accentColors[accent];
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-3 mb-2">
        <h2
          className="text-2xl font-semibold text-slate-900"
          style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-slate-500 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {subtitle}
        </p>
      )}
      <div
        className="mt-3 h-px"
        style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
      />
    </div>
  );
}
