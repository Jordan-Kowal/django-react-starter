import { renderHook } from "@/tests/utils";
import { describe, test, vi } from "vitest";
import { useFormSubmit } from "./useFormSubmit";

describe.concurrent("hooks/useFormSubmit", () => {
  test("should return a progress state and a function wrapper", async ({
    expect,
  }) => {
    const func = vi.fn();
    const { result } = renderHook(() => useFormSubmit(func));
    const [progress, submit] = result.current;
    expect(progress).toBe(false);
    expect(submit).toBeInstanceOf(Function);
    submit({});
    expect(func).toHaveBeenCalled();
  });
});
