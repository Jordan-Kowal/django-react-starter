import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useUpdateMetadata } from "./useUpdateMetadata";

describe("useUpdateMetadata", () => {
  beforeEach(() => {
    document.title = "Title";
    document.documentElement.lang = "fr";
  });

  it("should update document title based on route staticData", () => {
    const mockTitle = "Django React Starter";
    renderHook(() => useUpdateMetadata());
    expect(document.title).toBe(mockTitle);
  });

  it("should fallback to default title if route is not handlded", () => {
    document.title = "Initial Title";
    renderHook(() => useUpdateMetadata());
    expect(document.title).toBe("Django React Starter");
  });
});
