import { queryKeysBuilder } from "@/api/queryKeys";
import { useSelf } from "@/api/self";
import { SELF_MOCK } from "@/api/self/__mocks__/self";
import { renderHook } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useQueryUtils } from "./useQueryUtils";

describe.concurrent("hooks/useQueryUtils", () => {
  test("should return multiple utility functions", async () => {
    const { result } = renderHook(() => useQueryUtils());
    const { invalidateQueries, resetQueries, removeQueries } = result.current;
    expect(invalidateQueries).toBeInstanceOf(Function);
    expect(resetQueries).toBeInstanceOf(Function);
    expect(removeQueries).toBeInstanceOf(Function);
  });

  test.sequential("invalidateQueries should invalidate queries", async () => {
    const { result: selfResult } = renderHook(() => useSelf());
    const { result } = renderHook(() => useQueryUtils());
    const { invalidateQueries } = result.current;
    // Fetching the data
    expect(selfResult.current.isPending).toBeTruthy();
    await waitFor(() => {
      expect(selfResult.current.data).deep.eq(SELF_MOCK);
    });
    expect(selfResult.current.isPending).toBeFalsy();
    // By invalidating the query, the data is instantly re-fetched
    invalidateQueries(queryKeysBuilder.self());
    await waitFor(() => {
      expect(selfResult.current.data).deep.eq(SELF_MOCK);
    });
  });

  test.sequential("resetQueries should reset queries", async () => {
    const { result: selfResult, rerender } = renderHook(() => useSelf());
    const { result } = renderHook(() => useQueryUtils());
    const { resetQueries } = result.current;
    // Fetching the data
    expect(selfResult.current.isPending).toBeTruthy();
    await waitFor(() => {
      expect(selfResult.current.data).deep.eq(SELF_MOCK);
    });
    expect(selfResult.current.isPending).toBeFalsy();
    // Data is reset
    resetQueries(queryKeysBuilder.self());
    rerender();
    await waitFor(() => {
      expect(selfResult.current.data).to.eq(undefined);
    });
  });

  test.sequential("removeQueries should remove queries entirely", async () => {
    const { result: selfResult, rerender } = renderHook(() => useSelf());
    const { result } = renderHook(() => useQueryUtils());
    const { removeQueries } = result.current;
    // Fetching the data
    expect(selfResult.current.isPending).toBeTruthy();
    await waitFor(() => {
      expect(selfResult.current.data).deep.eq(SELF_MOCK);
    });
    expect(selfResult.current.isPending).toBeFalsy();
    // Data is removed
    removeQueries(queryKeysBuilder.self());
    rerender();
    await waitFor(() => {
      expect(selfResult.current.data).toBeUndefined();
    });
  });
});
