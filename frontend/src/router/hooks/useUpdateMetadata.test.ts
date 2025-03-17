import { useLocale } from "@/hooks";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useUpdateMetadata } from "./useUpdateMetadata";

vi.mock("@/hooks", () => ({
  useCurrentRoute: vi.fn(),
  useLocale: vi.fn(() => ({
    currentLocale: "en",
    setLocale: vi.fn(),
    setLocaleFromStorage: vi.fn(),
  })),
}));

describe("useUpdateMetadata", () => {
  beforeEach(() => {
    document.title = "Title";
    document.documentElement.lang = "fr";
  });

  it("should update document title based on route staticData", () => {
    const mockTitle = "Django React Starter";
    vi.mocked(useLocale).mockReturnValue({ currentLocale: "en" } as any);
    renderHook(() => useUpdateMetadata());
    expect(document.title).toBe(mockTitle);
  });

  it("should not update document title when currentRoute is not available", () => {
    const initialTitle = "Initial Title";
    document.title = initialTitle;
    vi.mocked(useLocale).mockReturnValue({ currentLocale: "en" } as any);
    renderHook(() => useUpdateMetadata());
    expect(document.title).toBe(initialTitle);
  });
});
