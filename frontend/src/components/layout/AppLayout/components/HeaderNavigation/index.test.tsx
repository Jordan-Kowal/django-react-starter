import { routeConfig } from "@/routes";
import { mockNavigate, mockUseBreakpoint } from "@/tests/mocks";
import {
  expectApiCall,
  expectApiCallCount,
  getByTestId,
  render,
} from "@/tests/utils";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { sleep } from "jkscript";
import { describe, test } from "vitest";
import { HeaderNavigation } from "./index";

describe.concurrent(
  "components/layout/AppLayout/components/HeaderNavigation",
  () => {
    const getElements = (
      container: HTMLElement,
    ): {
      navigation: HTMLDivElement;
      profileIcon: HTMLElement;
      logoutIcon: HTMLElement;
    } => ({
      navigation: getByTestId<HTMLDivElement>(container, "header-navigation"),
      profileIcon: container.querySelector(
        ".anticon.anticon-user",
      ) as HTMLElement,
      logoutIcon: container.querySelector(
        ".anticon.anticon-logout",
      ) as HTMLElement,
    });

    test("should correctly render the navigation", async ({ expect }) => {
      const { container } = render(<HeaderNavigation />);

      await waitFor(() => {
        const { navigation, profileIcon, logoutIcon } = getElements(container);
        expect(navigation).toBeVisible();
        expect(profileIcon).toBeVisible();
        expect(logoutIcon).toBeVisible();
      });
    });

    test("should not render on very small screens", async ({ expect }) => {
      mockUseBreakpoint.mockImplementationOnce(() => ({ xs: true }));
      const { container } = render(<HeaderNavigation />);

      await waitFor(() => {
        const { navigation, profileIcon, logoutIcon } = getElements(container);
        expect(navigation).toBeNull();
        expect(profileIcon).toBeNull();
        expect(logoutIcon).toBeNull();
      });
    });

    test.sequential("should logout on icon click", async ({ expect }) => {
      const { container } = render(<HeaderNavigation />);

      await waitFor(() => {
        const { logoutIcon } = getElements(container);
        expect(logoutIcon).toBeVisible();
      });

      act(() => {
        const { logoutIcon } = getElements(container);
        fireEvent.click(logoutIcon);
      });

      await sleep(100);
      expectApiCallCount(expect, 1);
      expectApiCall(expect, {
        url: "/api/v1/auth/logout/",
        method: "POST",
        status: 204,
        response: null,
      });
    });

    test("should redirect to profile on icon click", async ({ expect }) => {
      const { container } = render(<HeaderNavigation />);

      await waitFor(() => {
        const { profileIcon } = getElements(container);
        expect(profileIcon).toBeVisible();
      });

      act(() => {
        const { profileIcon } = getElements(container);
        fireEvent.click(profileIcon);
      });

      expect(mockNavigate).toHaveBeenCalledWith(routeConfig.profile.path);
    });
  },
);
