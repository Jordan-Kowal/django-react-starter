import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import enZod from "zod-i18n-map/locales/en/zod.json";
import frZod from "zod-i18n-map/locales/fr/zod.json";
import en from "../../i18n/en.json";
import fr from "../../i18n/fr.json";

export type Locale = "en" | "fr";

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "django-react-starter-locale";

const resources: Record<
  Locale,
  { translation: Record<string, string>; zod: any }
> = {
  en: {
    translation: en,
    zod: enZod,
  },
  fr: {
    translation: fr,
    zod: frZod,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE,
  interpolation: {
    escapeValue: false,
  },
});

z.setErrorMap(zodI18nMap);

export default i18n;
