import { routeConfig } from "@/routes";
import { mockLocation } from "@/tests/mocks";
import { renderHook } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { useCurrentRoute } from "./useCurrentRoute";

describe.concurrent("hooks/useCurrentRoute", () => {
  test("should return undefined when no route matches", async ({ expect }) => {
    // @ts-ignore
    mockLocation.mockImplementationOnce(() => ({ pathname: "/unknown" }));
    const { result } = renderHook(() => useCurrentRoute());
    await waitFor(() => {
      expect(result.current).toBe(undefined);
    });
  });

  test("should return the current route when one matches", async ({
    expect,
  }) => {
    const { result } = renderHook(() => useCurrentRoute());
    await waitFor(() => {
      expect(result.current).toBe(routeConfig.home);
    });
  });
});
