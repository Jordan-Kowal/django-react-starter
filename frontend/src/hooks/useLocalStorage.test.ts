import { beforeEach, describe, test } from "vitest";
import { LOCALE_STORAGE_KEY } from "@/config/i18n";
import { renderHook } from "@/tests/utils";
import { useLocalStorage } from "./useLocalStorage";

const TEMPORARY_KEY = "django-react-starter-test-temp";

describe.concurrent("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.removeItem(LOCALE_STORAGE_KEY);
  });

  test("should use the default value if no value is stored", ({ expect }) => {
    const { result } = renderHook(() =>
      useLocalStorage(TEMPORARY_KEY, "default"),
    );
    const [value] = result.current;
    expect(value).toBe("default");
  });

  test("should use the stored value", ({ expect }) => {
    localStorage.setItem(TEMPORARY_KEY, "stored");
    const { result } = renderHook(() =>
      useLocalStorage(TEMPORARY_KEY, "default"),
    );
    const [value] = result.current;
    expect(value).toBe("stored");
  });

  test("should correctly update the value", ({ expect }) => {
    localStorage.setItem(TEMPORARY_KEY, "stored");
    // Update the value
    const { result: resultOne } = renderHook(() =>
      useLocalStorage<string>(TEMPORARY_KEY, "default"),
    );
    const [_, setValue] = resultOne.current;
    setValue("updated");
    // Refetch the value
    const { result: resultTwo } = renderHook(() =>
      useLocalStorage(TEMPORARY_KEY, "default"),
    );
    const [value] = resultTwo.current;
    expect(value).toBe("updated");
  });
});
