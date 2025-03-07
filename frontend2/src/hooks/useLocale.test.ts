import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, type Locale } from "@/config/i18n";
import { renderHook } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { useLocale } from "./useLocale";

describe("useLocale", () => {
  describe("setLocaleFromStorage", () => {
    test("should use the default locale if no locale is stored", async ({
      expect,
    }) => {
      const { result } = renderHook(() => useLocale());
      const setLocaleFromStorage = result.current?.setLocaleFromStorage;
      // Starts as default
      await waitFor(() => {
        expect(result.current?.currentLocale).toBe(DEFAULT_LOCALE);
      });
      // Does nothing
      setLocaleFromStorage();
      await waitFor(() => {
        expect(result.current?.currentLocale).toBe(DEFAULT_LOCALE);
      });
    });

    test("should use stored locale if valid", async ({ expect }) => {
      const { result } = renderHook(() => useLocale());
      // Starts as default
      await waitFor(() => {
        expect(result.current?.currentLocale).toBe(DEFAULT_LOCALE);
      });
      // Should update
      localStorage.setItem(LOCALE_STORAGE_KEY, "fr");
      const { result: newResult } = renderHook(() => useLocale());
      const setLocaleFromStorage = newResult.current?.setLocaleFromStorage;
      setLocaleFromStorage();
      await waitFor(() => {
        expect(newResult.current?.currentLocale).toBe("fr");
      });
      expect(newResult.current?.currentLocale).not.toBe(DEFAULT_LOCALE);
    });
  });

  describe("setLocale", () => {
    test("should do nothing if invalid locale", async ({ expect }) => {
      const { result } = renderHook(() => useLocale());
      const setLocale = result.current?.setLocale;
      // Starts as default
      await waitFor(() => {
        expect(result.current?.currentLocale).toBe(DEFAULT_LOCALE);
      });
      // Does nothing
      setLocale("invalid-locale" as Locale);
      await waitFor(() => {
        expect(result.current?.currentLocale).toBe(DEFAULT_LOCALE);
      });
    });

    test("should set the locale", async ({ expect }) => {
      const { result } = renderHook(() => useLocale());
      const setLocale = result.current?.setLocale;
      // Starts as default
      await waitFor(() => {
        expect(result.current?.currentLocale).toBe(DEFAULT_LOCALE);
      });
      // Should update
      setLocale("fr");
      await waitFor(() => {
        expect(result.current?.currentLocale).toBe("fr");
      });
      expect(result.current?.currentLocale).not.toBe(DEFAULT_LOCALE);
    });
  });
});
