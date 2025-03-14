import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/config/i18n";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "./useLocalStorage";

const isValidLocale = (locale: any): locale is Locale => {
  return SUPPORTED_LOCALES.includes(locale as Locale);
};

export type UseLocaleReturn = {
  currentLocale: Locale;
  setLocale: (locale: string) => void;
  setLocaleFromStorage: () => void;
};

export const useLocale = (): UseLocaleReturn => {
  const { i18n } = useTranslation();
  const currentLocale = useMemo(() => i18n.language, [i18n.language]) as Locale;
  const [storedLocale, updateStoredLocale] =
    useLocalStorage<Locale>(LOCALE_STORAGE_KEY);

  const doUpdateLocale = useCallback(
    (locale: Locale) => {
      updateStoredLocale(locale);
      i18n.changeLanguage(locale);
      dayjs.locale(locale);
    },
    [i18n, updateStoredLocale],
  );

  const setLocale = useCallback(
    (locale: string) => {
      if (!isValidLocale(locale)) return;
      doUpdateLocale(locale as Locale);
    },
    [doUpdateLocale],
  );

  const setLocaleFromStorage = useCallback(() => {
    const safeLocale = isValidLocale(storedLocale)
      ? storedLocale
      : DEFAULT_LOCALE;
    doUpdateLocale(safeLocale);
  }, [storedLocale, doUpdateLocale]);

  return useMemo(
    () => ({
      currentLocale,
      setLocale,
      setLocaleFromStorage,
    }),
    [currentLocale, setLocale, setLocaleFromStorage],
  );
};
