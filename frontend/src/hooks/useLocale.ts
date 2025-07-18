import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, type Locale } from "@/config/i18n";
import { useLocalStorage } from "./useLocalStorage";

export type UseLocaleReturn = {
  currentLocale: Locale;
  initLocale: () => void;
  setLocale: (locale: Locale) => void;
};

export const useLocale = (): UseLocaleReturn => {
  const { i18n } = useTranslation();
  const currentLocale = useMemo(() => i18n.language, [i18n.language]) as Locale;
  const [storedLocale, updateStoredLocale] = useLocalStorage<Locale>(
    LOCALE_STORAGE_KEY,
    DEFAULT_LOCALE,
  );

  const setLocale = useCallback(
    (locale: Locale) => {
      updateStoredLocale(locale);
      i18n.changeLanguage(locale);
      dayjs.locale(locale);
    },
    [i18n, updateStoredLocale],
  );

  const initLocale = useCallback(() => {
    setLocale(storedLocale);
  }, [storedLocale, setLocale]);

  return useMemo(
    () => ({
      currentLocale,
      setLocale,
      initLocale,
    }),
    [currentLocale, setLocale, initLocale],
  );
};
