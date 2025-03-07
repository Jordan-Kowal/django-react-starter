import { useRouterStateMock } from "@/tests/mocks/globals";
import { renderHook } from "@/tests/utils";
import { describe, expect, it } from "vitest";
import { useCurrentRoute } from "./useCurrentRoute";

describe("useCurrentRoute", () => {
  it("should return the last route match", () => {
    useRouterStateMock.mockReturnValue({
      location: { pathname: "/test/path" },
      matches: [{ id: "route1" }, { id: "route2" }],
    });

    // Execute the hook
    const { result } = renderHook(() => useCurrentRoute());

    // Verify results
    expect(result.current).toEqual({ id: "route2" });
    expect(useRouterStateMock).toHaveBeenCalled();
  });

  it("should return undefined if no route matches", () => {
    useRouterStateMock.mockReturnValue({
      location: { pathname: "/test/path" },
      matches: [],
    });
    const { result } = renderHook(() => useCurrentRoute());
    expect(result.current).toBeUndefined;
    expect(useRouterStateMock).toHaveBeenCalled();
  });
});
