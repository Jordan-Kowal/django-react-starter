import { renderHook } from "@/tests/utils";
import { describe, test } from "vitest";
import { useShallow } from "zustand/react/shallow";
import { useLayoutStore } from "./useLayoutStore";

describe.sequential("stores/useLayoutStore", () => {
  test("initial state", ({ expect }) => {
    const { result } = renderHook(() =>
      useLayoutStore(
        useShallow((state) => ({
          showLayout: state.showLayout,
          siderCollapsed: state.siderCollapsed,
        })),
      ),
    );
    expect(result.current.showLayout).toBe(false);
    expect(result.current.siderCollapsed).toBe(false);
  });

  test("setShowLayout", ({ expect }) => {
    const { result, rerender } = renderHook(() =>
      useLayoutStore(
        useShallow((state) => ({
          showLayout: state.showLayout,
          setShowLayout: state.setShowLayout,
        })),
      ),
    );
    expect(result.current.showLayout).toBe(false);
    result.current.setShowLayout(true);
    rerender();
    expect(result.current.showLayout).toBe(true);
    result.current.setShowLayout(false);
    rerender();
    expect(result.current.showLayout).toBe(false);
  });

  test("toggleSider", ({ expect }) => {
    const { result, rerender } = renderHook(() =>
      useLayoutStore(
        useShallow((state) => ({
          siderCollapsed: state.siderCollapsed,
          toggleSider: state.toggleSider,
        })),
      ),
    );
    expect(result.current.siderCollapsed).toBe(false);
    result.current.toggleSider();
    rerender();
    expect(result.current.siderCollapsed).toBe(true);
    result.current.toggleSider();
    rerender();
    expect(result.current.siderCollapsed).toBe(false);
  });

  test("setSiderCollapsed", ({ expect }) => {
    const { result, rerender } = renderHook(() =>
      useLayoutStore(
        useShallow((state) => ({
          siderCollapsed: state.siderCollapsed,
          setSiderCollapsed: state.setSiderCollapsed,
        })),
      ),
    );
    expect(result.current.siderCollapsed).toBe(false);
    result.current.setSiderCollapsed(true);
    rerender();
    expect(result.current.siderCollapsed).toBe(true);
    result.current.setSiderCollapsed(false);
    rerender();
    expect(result.current.siderCollapsed).toBe(false);
  });
});
