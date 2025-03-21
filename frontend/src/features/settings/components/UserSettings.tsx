import { useDaisyUITheme } from "@/contexts";
import { useLocale } from "@/hooks";
import { Languages, SunMoon } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

export const UserSettings: React.FC = memo(() => {
  const { t } = useTranslation();
  const { currentLocale, setLocale } = useLocale();
  const { setTheme, isDarkMode } = useDaisyUITheme();

  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="flex gap-2 items-center justify-between">
        <span className="flex gap-2">
          <Languages /> {t("Language")}
        </span>
        <div className="join">
          <input
            className="join-item btn w-24"
            type="radio"
            name="locale"
            aria-label="Francais"
            checked={currentLocale === "fr"}
            onClick={() => setLocale("fr")}
          />
          <input
            className="join-item btn w-24"
            type="radio"
            name="locale"
            aria-label="English"
            checked={currentLocale === "en"}
            onClick={() => setLocale("en")}
          />
        </div>
      </div>
      <div className="flex gap-2 items-center justify-between">
        <span className="flex gap-2">
          <SunMoon /> {t("Color theme")}
        </span>
        <div className="join">
          <input
            className="join-item btn w-24"
            type="radio"
            name="theme"
            aria-label="Light"
            onClick={() => setTheme("pastel")}
            checked={!isDarkMode}
          />
          <input
            className="join-item btn w-24"
            type="radio"
            name="theme"
            aria-label="Dark"
            onClick={() => setTheme("coffee")}
            checked={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
});
