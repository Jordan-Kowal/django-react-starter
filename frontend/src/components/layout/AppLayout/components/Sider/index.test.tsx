import * as hooks from "@/hooks";
import { routeConfig } from "@/routes";
import { mockNavigate } from "@/tests/mocks";
import {
  expectApiCall,
  expectApiCallCount,
  getByTestId,
  render,
} from "@/tests/utils";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { sleep } from "jkscript";
import { describe, test, vi } from "vitest";
import { Sider } from "./index";

describe.concurrent("components/layout/AppLayout/components/Sider", () => {
  const getElements = (
    container: HTMLElement,
  ): {
    sider: HTMLDivElement;
  } => ({
    sider: getByTestId<HTMLDivElement>(container, "sider"),
  });

  test("should correctly render the menu", async ({ expect }) => {
    vi.spyOn(hooks, "useCurrentRoute").mockImplementationOnce(() => undefined);

    const { container } = render(<Sider />);

    await waitFor(() => {
      const { sider } = getElements(container);
      expect(sider).toBeVisible();
      expect(sider).toHaveTextContent("Homepage");
      expect(sider).toHaveTextContent("Profil");
      expect(sider).toHaveTextContent("Déconnexion");
    });
  });

  test("should redirect on menu click", async ({ expect }) => {
    const { container } = render(<Sider />);

    await waitFor(() => {
      const { sider } = getElements(container);
      expect(sider).toBeVisible();
    });
    act(() => {
      const profileIcon = container.querySelector(
        ".anticon.anticon-user",
      ) as HTMLElement;
      fireEvent.click(profileIcon);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(routeConfig.profile.path);
    });
  });

  test.sequential("should logout on icon click", async ({ expect }) => {
    const { container } = render(<Sider />);

    await waitFor(() => {
      const { sider } = getElements(container);
      expect(sider).toBeVisible();
    });

    act(() => {
      const logoutIcon = container.querySelector(
        ".anticon.anticon-logout",
      ) as HTMLElement;
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
});
