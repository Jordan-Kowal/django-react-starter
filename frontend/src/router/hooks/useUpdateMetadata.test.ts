import { useLocationMock } from "@/tests/mocks/globals";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, it, vi } from "vitest";
import { useUpdateMetadata } from "./useUpdateMetadata";

describe.concurrent("useUpdateMetadata", () => {
  beforeEach(() => {
    document.title = "Title";
    document.documentElement.lang = "fr";
  });

  it("should update document title based on route staticData", async ({
    expect,
  }) => {
    useLocationMock.mockImplementation(() => ["/settings", vi.fn()]);
    document.title = "Initial Title";
    renderHook(() => useUpdateMetadata());

    await waitFor(() => {
      expect(document.title).toBe("Settings");
    });
  });

  it("should fallback to default title if route is not handled", async ({
    expect,
  }) => {
    useLocationMock.mockImplementation(() => ["/unknown", vi.fn()]);
    document.title = "Initial Title";
    renderHook(() => useUpdateMetadata());

    await waitFor(() => {
      expect(document.title).toBe("Django React Starter");
    });
  });
});
