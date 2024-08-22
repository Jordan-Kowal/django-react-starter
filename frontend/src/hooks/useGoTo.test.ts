import { routeConfig } from "@/routes";
import { mockNavigate } from "@/tests/mocks";
import { renderHook } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { useGoTo } from "./useGoTo";

describe.concurrent("hooks/useGoTo", () => {
  test("should return a function to navigate to the given route", async ({
    expect,
  }) => {
    // @ts-ignore
    const { result } = renderHook(() => useGoTo(routeConfig.profile));
    await waitFor(() => {
      result.current();
      expect(mockNavigate).toHaveBeenCalledWith(routeConfig.profile.path);
    });
  });
});
