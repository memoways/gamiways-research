/*
 * Footer — DigiDouble Research Portal
 * i18n: EN/FR via LangContext
 */
import { useLang } from "@/contexts/LangContext";

const LAST_UPDATED = "28 March 2026";
const LAST_UPDATED_FR = "28 mars 2026";

export default function Footer() {
  const { t, lang } = useLang();
  const isFr = lang === "fr";
  return (
    <footer className="border-t border-slate-200 mt-20">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-sm flex items-center justify-center"
                style={{ background: "oklch(0.72 0.18 200)" }}>
                <span className="text-white font-bold" style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace" }}>DD</span>
              </div>
              <span className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                DigiDouble {t("footer.portal")}
              </span>
            </div>
            <p className="text-xs text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Memoways × Gamilab — Geneva, Switzerland
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-xs text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <span>{t("footer.portal")}</span>
            <span className="hidden md:inline text-slate-200">|</span>
            <span>Project 2025–2028</span>
            <span className="hidden md:inline text-slate-200">|</span>
            <span>
              {isFr ? "Dernière mise à jour" : "Last updated"}{" "}
              <span className="text-slate-600 font-medium">{isFr ? LAST_UPDATED_FR : LAST_UPDATED}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
