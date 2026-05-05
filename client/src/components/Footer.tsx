/*
 * Footer — GamiWays Research Portal
 * i18n: EN/FR via LangContext
 * Date is generated dynamically at build time — no manual update needed.
 */
import { useLang } from "@/contexts/LangContext";

// Dynamic date — auto-generated at build time, always current
const BUILD_DATE = new Date();

const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_FR = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];

const LAST_UPDATED    = `${BUILD_DATE.getDate()} ${MONTHS_EN[BUILD_DATE.getMonth()]} ${BUILD_DATE.getFullYear()}`;
const LAST_UPDATED_FR = `${BUILD_DATE.getDate()} ${MONTHS_FR[BUILD_DATE.getMonth()]} ${BUILD_DATE.getFullYear()}`;

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
                <span className="text-white font-bold" style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace" }}>GW</span>
              </div>
              <span className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                GamiWays {t("footer.portal")}
              </span>
            </div>
            <p className="text-xs text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <a href="https://memoways.com/" target="_blank" rel="noopener noreferrer"
                className="hover:text-slate-700 transition-colors underline underline-offset-2">Memoways</a>
              {" × "}
              <a href="https://gamilab.ch/" target="_blank" rel="noopener noreferrer"
                className="hover:text-slate-700 transition-colors underline underline-offset-2">Gamilab</a>
              {" — Geneva, Switzerland"}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-xs text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <span>{isFr ? "Portail de veille technologique" : "Technology Intelligence Portal"}</span>
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
