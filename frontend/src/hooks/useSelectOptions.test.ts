import { renderHook } from "@/tests/utils";
import { describe, test } from "vitest";
import { useSelectOptions } from "./useSelectOptions";

describe.concurrent("hooks/useSelectOptions", () => {
  test("should return empty array if items is undefined", ({ expect }) => {
    const { result } = renderHook(() =>
      useSelectOptions(undefined, "id", "name"),
    );
    expect(result.current).toEqual([]);
  });

  test("should correctly build select options using the provided keys", ({
    expect,
  }) => {
    const items = [
      { id: 1, name: "One", alias: "First" },
      { id: 2, name: "Two", alias: "Second" },
    ];
    const { result } = renderHook(() => useSelectOptions(items, "id", "name"));
    expect(result.current).toEqual([
      { value: 1, label: "One" },
      { value: 2, label: "Two" },
    ]);

    const { result: result2 } = renderHook(() =>
      useSelectOptions(items, "id", "alias"),
    );

    expect(result2.current).toEqual([
      { value: 1, label: "First" },
      { value: 2, label: "Second" },
    ]);
  });
});
