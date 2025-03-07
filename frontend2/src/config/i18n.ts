import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../i18n/en.json";
import fr from "../../i18n/fr.json";

export type Locale = "en" | "fr";

export const DEFAULT_LOCALE: Locale = "en";
export const SUPPORTED_LOCALES: Locale[] = ["en", "fr"];
export const LOCALE_STORAGE_KEY = "django-react-starter-locale";

const resources: Record<Locale, { translation: Record<string, string> }> = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
