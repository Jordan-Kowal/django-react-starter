import { useLayoutStore } from "@/stores";
import { mockUseBreakpoint } from "@/tests/mocks";
import { getByTestId, render, renderHook } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import { useShallow } from "zustand/react/shallow";
import { AppLayout } from "./index";

describe.concurrent("components/layout/AppLayout", () => {
  const getElements = (
    container: HTMLElement,
  ): {
    layout: HTMLDivElement;
    header: HTMLDivElement;
    headerNavigation: HTMLDivElement;
    footer: HTMLDivElement;
    sider: HTMLDivElement;
    content: HTMLDivElement;
  } => ({
    layout: getByTestId<HTMLDivElement>(container, "app-layout"),
    header: getByTestId<HTMLDivElement>(container, "header"),
    headerNavigation: getByTestId<HTMLDivElement>(
      container,
      "header-navigation",
    ),
    footer: getByTestId<HTMLDivElement>(container, "footer"),
    sider: getByTestId<HTMLDivElement>(container, "sider"),
    content: getByTestId<HTMLDivElement>(container, "content"),
  });

  test("should correctly render the app layout", async ({ expect }) => {
    const { container } = render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>,
    );

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.layout).toBeVisible();
      expect(elements.header).toBeVisible();
      expect(elements.headerNavigation).toBeVisible();
      expect(elements.footer).toBeVisible();
      expect(elements.sider).toBeVisible();
      expect(elements.content).toHaveTextContent("Content");
    });
  });

  test.sequential(
    "should collapse the sider if the screen is small",
    async ({ expect }) => {
      mockUseBreakpoint.mockImplementation(() => ({ lg: true }));

      const { result } = renderHook(() =>
        useLayoutStore(
          useShallow((state) => ({
            siderCollapsed: state.siderCollapsed,
            setShowLayout: state.setShowLayout,
          })),
        ),
      );

      const spy = vi.spyOn(result.current, "setShowLayout");

      await waitFor(() => {
        result.current.setShowLayout(true);
        expect(result.current.siderCollapsed).toBe(false);
      });

      const { container } = render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>,
      );

      await waitFor(() => {
        const elements = getElements(container);
        expect(elements.layout).toBeVisible();
        expect(spy).toHaveBeenCalledWith(true);
      });
    },
  );
});
