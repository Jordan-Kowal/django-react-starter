import { useLayoutStore } from "@/stores";
import { mockUseBreakpoint } from "@/tests/mocks";
import { getByTestId, render, renderHook } from "@/tests/utils";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { useShallow } from "zustand/react/shallow";
import { Header } from "./index";

describe.concurrent("components/layout/AppLayout/components/Header", () => {
  const getElements = (
    container: HTMLElement,
  ): {
    header: HTMLDivElement;
    navigation: HTMLElement;
    foldIcon: HTMLElement | null;
    unfoldIcon: HTMLElement | null;
    logo: HTMLDivElement | null;
  } => ({
    header: getByTestId<HTMLDivElement>(container, "header"),
    navigation: getByTestId<HTMLDivElement>(container, "header-navigation"),
    foldIcon: container.querySelector(".anticon.anticon-menu-fold"),
    unfoldIcon: container.querySelector(".anticon.anticon-menu-unfold"),
    logo: getByTestId<HTMLDivElement>(container, "header-logo"),
  });

  test("should correctly render the navigation", async ({ expect }) => {
    const { container } = render(<Header />);

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.header).toBeVisible();
      expect(elements.navigation).toBeVisible();
      expect(elements.foldIcon).toBeVisible();
      expect(elements.unfoldIcon).toBeNull();
      expect(elements.logo).toBeVisible();
    });
  });

  test.sequential("should hide icons on bigger screens", async ({ expect }) => {
    mockUseBreakpoint.mockImplementationOnce(() => ({ lg: true }));
    const { container } = render(<Header />);

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.header).toBeVisible();
      expect(elements.navigation).toBeVisible();
      expect(elements.foldIcon).toBeNull();
      expect(elements.unfoldIcon).toBeNull();
      expect(elements.logo).toBeNull();
    });
  });

  test("should toggle the menu on click", async ({ expect }) => {
    const { result } = renderHook(() =>
      useLayoutStore(
        useShallow((state) => ({
          siderCollapsed: state.siderCollapsed,
        })),
      ),
    );

    expect(result.current.siderCollapsed).toBe(false);

    const { container } = render(<Header />);

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.foldIcon).toBeVisible();
      expect(elements.unfoldIcon).toBeNull();
    });

    act(() => {
      const elements = getElements(container);
      fireEvent.click(elements.foldIcon!);
    });

    expect(result.current.siderCollapsed).toBe(true);

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.foldIcon).toBeNull();
      expect(elements.unfoldIcon).toBeVisible();
    });
  });
});
